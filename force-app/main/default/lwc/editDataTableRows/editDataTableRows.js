import { LightningElement,api,wire} from 'lwc';
import getContactbasedOnAccount from '@salesforce/apex/contactController.getContactbasedOnAccount';
import { deleteRecord, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import LEAD_SOURCE_FIELD from '@salesforce/schema/Contact.LeadSource';
const ACTIONS=[
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },  
    
];
const DEFAULT_ACTION=[
    {
        label:'ALL',
        checked:true,
        name:'all'
    }
        
];
const columns=[
    { label: 'First Name', fieldName: 'FirstName', editable:true,hideDefaultActions:true}, 
    { label: 'Last Name', fieldName: 'LastName', editable:true,hideDefaultActions:true},
    { label: 'Title', fieldName: 'Title' ,editable:true,hideDefaultActions:true},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' ,editable:true,hideDefaultActions:true},
    { label: 'Email', fieldName: 'Email', type: 'email',editable:true ,hideDefaultActions:true},
    {label: 'Lead Source', fieldName: 'LeadSource', type: 'customPicklist', editable:true, typeAttributes: {
        options: { fieldName: 'pickListOptions' },
        value: { fieldName: 'LeadSource' },
        context: { fieldName: 'Id' }
    },
    hideDefaultActions:true,
    actions:DEFAULT_ACTION
},

    
];
export default class EditDataTableRows extends LightningElement 
{
@api recordId; // Assuming you have a recordId to filter cts based on account
contactData=[];
columns=columns;
draftValues=[]; // To hold draft values for editing 
contactRefreshProperty; // To hold the property for refreshing contacts
leadSourceOption=[]; // To hold the picklist options for Lead Source
viewMode=false;
editMode=false;
showModal=false;
selectedRecordId;
contactAllData=[]; // To hold all contact data
loadActoinCompleted=false; // To control the loading of the table
LeadSourceAction=[]; // To hold the actions for Lead Source picklist
@wire(getContactbasedOnAccount,{
        accountId: '$recordId',
        pickList:"$leadSourceOption"
    })
   
    getContactOputput(result)
    {
        this.contactRefreshProperty = result; // Store the wire property for refreshing
        if(result.data)
    {
         //this.contactData=result.data;
        this.contactData= result.data.map((currItem) =>{ 
            let pickListOptions=this.leadSourceOption;
            return {
                ...currItem,
                pickListOptions: pickListOptions,
            };
        });
        this.contactAllData=[...this.contactData]; // Store all contact data
    }
        else if(result.error)
    {
         console.error('Error fetching contacts:', result.error);

    }
    }
     @wire(getObjectInfo,{
        objectApiName: CONTACT_OBJECT
    })objectInfo;

    @wire(getPicklistValues,{
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName:LEAD_SOURCE_FIELD
    })wirePickList({data,error})
    {
        if(data)
        {
            this.leadSourceOption=data.values;
            this.LeadSourceAction=[];
            data.values.forEach(currItem =>
            {
                this.LeadSourceAction.push({
                    label: currItem.label,
                    checked: false,
                    name: currItem.value
                });

            }
            );
            this.columns.forEach((currItem) => {
                if (currItem.fieldName === 'LeadSource') {
                    currItem.actions = [...currItem.actions, ...this.LeadSourceAction];
                }
            });
            this.loadActoinCompleted=true; // Set to true after loading actions


        }
        else if(error)
        {
            console.error('Error fetching picklist values:', error);
        }

    }
    async saveHandler(event)
    {
        //updaterecord or Apex call to save the edited records
        //access the draft values from the event
        let records = event.detail.draftValues;//return array of modified records
        let updateRecordArray = records.map(currItem => {
            let fieldInput={...currItem};
return { fields: fieldInput };
});
    this.draftValues = []; // Clear draft values after saving
    let updateRecordsArrayPromise=updateRecordArray.map((currItem)=> 
        updateRecord(currItem));
    await Promise.all(updateRecordsArrayPromise); // Process the array of records
    const event1 = new ShowToastEvent({
            title: 'Success',
            message:'Records updated successfully', 
            variant: 'success' 
    }); 
       
    this.dispatchEvent(event1);
    await refreshApex(this.contactRefreshProperty); // Refresh the contacts data
}
    rowActionHandler(event)
    {
        let actionName = event.detail.action.name;
        let row = event.detail.row;
        this.selectedRecordId  = row.Id; // Store the record Id for the modal
        this.viewMode=false;
        this.editMode=false;
        this.showModal=false;
       if(actionName === 'edit')
        {
            this.editMode=true;
            this.showModal=true;

        }
        else if(actionName === 'delete')
        {
            this.deleteHandler();
        }
        else if(actionName === 'view')
        {
            this.viewMode=true;
           this.showModal=true;
        }
    }
   async deleteHandler(){
        //deleteRecordAdapter or Apex call to delete the record
        await deleteRecord(this.selectedRecordId);
        const event = new ShowToastEvent({
            title: 'Success',
            message:
                'Record deleted successfully',
            variant: 'success',});
        this.dispatchEvent(event);
        await refreshApex(this.contactRefreshProperty); // Refresh the contacts data

    }
    async closeModal(event){
        this.showModal=false;
        if(this.editMode)
        {
             await refreshApex(this.contactRefreshProperty); // Refresh the contacts data
        }
    }
    headerActionHandler(event) {
        let actionName = event.detail.action.name;
        const colDef=event.detail.columnDefinition;
        const cols=this.columns;
        console.log('Acton Name:', actionName);
        console.log('Column Definition:', colDef);
        if (actionName === 'all') {
            // Handle the "All" action
            this.contactData = [...this.contactAllData]; // Reset to all contact data
        }
        else
        {
            this.contactData = this.contactAllData.filter(currItem =>
                actionName === currItem['LeadSource']
            ); // Filter contacts based on the selected Lead Source
     }

    cols.find((currItem) => currItem.fieldName==='LeadSource').actions.forEach((currItem) => {
            if(currItem.name===actionName)
                {
                    currItem.checked=true;
                } // Update the checked state of the actions
            else
                {
                    currItem.checked=false;
                }
        }
        );
        this.columns = [...cols]; // Update the columns to reflect the changes
        
    }
    get displayData() {
        // Check if the data is loaded and the action is completed
       if(this.contactData && this.loadActoinCompleted===true) {
            return true;
        }
        return false;
        
    }

}