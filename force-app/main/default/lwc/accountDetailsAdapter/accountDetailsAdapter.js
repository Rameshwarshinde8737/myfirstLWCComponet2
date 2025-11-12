import { LightningElement ,wire,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getParentAccountData from '@salesforce/apex/AccountHelper.getParentAccountData';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_ID from '@salesforce/schema/Account.Id';
import ACCOUNT_PARENT from '@salesforce/schema/Account.ParentId';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_SLA_EXPIRY_DT from '@salesforce/schema/Account.SLA_Expiration_Date__c';
import ACCOUNT_DESCRIPTON from '@salesforce/schema/Account.Description';
import ACCOUNT_SLA_TYPE from '@salesforce/schema/Account.SLA_Type__c';
import ACCOUNT_NO_OF_LOCATION from '@salesforce/schema/Account.Number_of_Locations__c';
import { createRecord, getRecord,getFieldValue, updateRecord, deleteRecord} from 'lightning/uiRecordApi';
const fieldsToLoad=[ACCOUNT_PARENT,ACCOUNT_NAME,ACCOUNT_SLA_EXPIRY_DT,ACCOUNT_DESCRIPTON,ACCOUNT_SLA_TYPE,ACCOUNT_NO_OF_LOCATION];
export default class AccountDetailsAdapter extends NavigationMixin(LightningElement) {
    parentoptions=[];
    selParentAcc="";
    selnoOfLocations="1";
    selAccName="";
    selExpDate=null;
    selSlaType="";
    selDescription="";
    @api recordId;
    @wire(getRecord,
        
        { 
            recordId:"$recordId",
            fields: fieldsToLoad 
        })wiredgetRecord_Function({data,error})
        {
            if(data){
            this.selParentAcc=getFieldValue(data,ACCOUNT_PARENT);
            this.selAccName=getFieldValue(data,ACCOUNT_NAME);
            this.selExpDate=getFieldValue(data,ACCOUNT_SLA_EXPIRY_DT);
            this.selSlaType=getFieldValue(data,ACCOUNT_SLA_TYPE);
            this.selnoOfLocations=getFieldValue(data,ACCOUNT_NO_OF_LOCATION);
            this.selDescription=getFieldValue(data,ACCOUNT_DESCRIPTON);
            }
            else if(error)
            {
                console.log("Error Message Durin retrieval",error);
            }
        }
    @wire(getParentAccountData)wired_getParentAccountData({data,error})
    {
        this.parentoptions=[];

    if(data)
    {
    this.parentoptions=data.map((currItem)=>({
            label:currItem.Name,
            value:currItem.Id,
            }));
    }
    else if(error)
    {
        console.log("Error while getting parent record",error);
    }
    }
    @wire(getObjectInfo,{
        objectApiName:ACCOUNT_OBJECT
    })accountobjectInfo;
    
    @wire(getPicklistValues,{
        recordTypeId:"$accountobjectInfo.data.defaultRecordTypeId",
        fieldApiName:ACCOUNT_SLA_TYPE
    })slapickList;
    handleChange(event)
    {
        let{name,value}=event.target;
        if(name==='parentAcc')
        {
        this.selParentAcc=value;
        }
        if(name==='accname')
        {
        this.selAccName=value;
        }
        if(name==='slaexpdt')
        {
        this.selExpDate=value;
        }
        if(name==='slatype')
        {
        this.selSlaType=value;
        }
        if(name==='noOfLocations')
        {
        this.selnoOfLocations=value;
        }
        if(name==='description')
        {
        this.selDescription=value;
        }

    }
    saveRecord()
    {
        if(this.validateInput()){
            let inputfelds={};

            inputfelds[ACCOUNT_PARENT.fieldApiName]=this.selParentAcc;
            inputfelds[ACCOUNT_NAME.fieldApiName]=this.selAccName;
            inputfelds[ACCOUNT_SLA_EXPIRY_DT.fieldApiName]=this.selExpDate;
            inputfelds[ACCOUNT_SLA_TYPE.fieldApiName]=this.selSlaType;
            inputfelds[ACCOUNT_NO_OF_LOCATION.fieldApiName]=this.selnoOfLocations;
            inputfelds[ACCOUNT_DESCRIPTON.fieldApiName]=this.selDescription;
        if(this.recordId)
        {
            //update operation
            inputfelds[ACCOUNT_ID.fieldApiName]=this.recordId;
            let recordInput={
                fields:inputfelds
            };
            updateRecord(recordInput).then((result)=>{
                console.log("Record Updated",result);
                this.showToast();
                
            })
            .catch((error)=>{
                console.log("Record Updated failed",error);
            });
            
            }

        
        else
        {
            let recordInput={
                apiName:ACCOUNT_OBJECT.objectApiName,
                fields:inputfelds};
                    
            createRecord(recordInput)
            .then((result)=>{
                console.log("Record Created",result);
                let pageRef={
                        type:"standard__recordPage",
                        attributes:{
                            recordId:result.id,
                            objectApiName:ACCOUNT_OBJECT.objectApiName,
                            actionName:"view"
                        }
                    };
                    this[NavigationMixin.Navigate](pageRef);

                }).catch((error)=>{
                console.log("Error while creating record",error);
            });
        }
            
        }
        else{
            console.log("Inputs are not valid");
        }

    }

    validateInput()
    {
        let fields=Array.from(this.template.querySelectorAll(".validateme"));
        let isValid=fields.every((currItem)=>currItem.checkValidity());
        return isValid;
    }
    get formTitle()
    {
        if(this.recordId)
        {
            return "Edit Account";
        }
        else
        {
            return "Create Account";
        }
    }
    get isDeleteAvailable()
    {
        if(this.recordId)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    showToast()
    {
        let event=new ShowToastEvent({
            title:"Success",
            message:"Record Updated Sucessfully",
            variant:"success"
    });
    this.dispatchEvent(event);
}
deletehandler()
{
    deleteRecord(this.recordId).then(()=>{
         this.recordId = null; //does not have a result it is void type 
        console.log("Record Deleted Successfully");
        let pageRef=
        // Navigates to account list with the filter set to Recent.
{
    type: 'standard__objectPage',
    attributes: {
        objectApiName: ACCOUNT_OBJECT.objectApiName,
        actionName: 'list'
    },
    state: {
        filterName: 'Recent'
    }
    
};              
this[NavigationMixin.Navigate](pageRef);
    
}).catch((error)=>{
    console.log("Error while deleting record",error);
});
}
}