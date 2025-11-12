import { LightningElement,wire} from 'lwc';
import getContactListForDataTable from '@salesforce/apex/contactController.getContactListForDataTable';
const columns = [
     { label: ' Account Name', fieldName:'accountLink' ,type:'url',typeAttributes: {label: {fieldName: 'accountName'}, target: '_blank'}},//to open in new tab 
    { label: 'Name', type:'customNameType',typeAttributes :{contactName:{fieldName:'Name'}} },
    { label: 'Title', fieldName: 'Title',cellAttributes: { class: { fieldName: 'titleColor' } } },//to change color of text
 { label: 'Picture',fieldName: 'Picture__c', type: 'customImage',typeAttributes: { pictureUrl: { fieldName: 'Picture__c' } },
cellAttributes:{alignment:"center"} },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    ];
export default class CustomStyleDataTable extends LightningElement {
contacts;
columns = columns;
    @wire(getContactListForDataTable)wiredContacts({data,error})
    {
        if(data)
        {
            //this.contacts=data;
            this.contacts=data.map(record =>{
                let accountLink="/"+record.AccountId;//
                let accountName=record.Account.Name;
                let titleColor="slds-text-color_success";
                let rankIcon=record.Rank__c>5 ? "utility:ribbon" : "";
                return {
                    ...record,
                    accountName: accountName,
                    accountLink: accountLink,
                    titleColor: titleColor,
                    rankIcon: rankIcon
                };
            })
            console.log(data);
        }
        else
        {
        console.error(error);
        }

    }
    
}