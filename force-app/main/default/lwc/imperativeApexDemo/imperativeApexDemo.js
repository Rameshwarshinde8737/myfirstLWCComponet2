import { LightningElement,wire } from 'lwc';
import getAccountData from '@salesforce/apex/AccountHelper.getAccountData';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class ImperativeApexDemo extends LightningElement {
    data=[];    
    options=[];
    columns=[
        {label:'Account Name',fieldName:'Name'},
        {label:'Account Type',fieldName:'Type'},
        {label:'Account Phone',fieldName:'Phone'}
    ];
    selectedIndustry;
   @wire(getObjectInfo,
    {
        objectApiName:ACCOUNT_OBJECT
    }
   )accountInfo;
    @wire(getPicklistValues,
        {
            recordTypeId:"$accountInfo.data.defaultRecordTypeId",
            fieldApiName:ACCOUNT_INDUSTRY
        }
    )industryPickList;
    loadAccount()
    {
        getAccountData({inputIndustry : this.selectedIndustry}).then(result=> {
            console.log('Account Records',result);
            this.data=result;
        }).catch(error => {
            console.log('Error while loading account records',error);
        });
        
    }
    handleChange(event)
    {
        this.selectedIndustry=event.target.value;
    }
}