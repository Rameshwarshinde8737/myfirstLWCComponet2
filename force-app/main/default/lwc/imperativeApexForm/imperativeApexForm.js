import { LightningElement,api,wire } from 'lwc';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_TICKER from '@salesforce/schema/Account.TickerSymbol';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import updateTickerRecord from '@salesforce/apex/AccountHelper.updateTickerRecord';
export default class ImperativeApexForm extends LightningElement {
    @api recordId;
    accname="";
    accticker=""; 

   @wire(getRecord, 
    { 
        recordId: "$recordId", 
        fields: [ACCOUNT_NAME,ACCOUNT_TICKER]
    })outputFunction({data,error})
    {
        if(data)
        {
        console.log('Data',data);
        this.accname= getFieldValue(data,ACCOUNT_NAME);
        this.accticker=getFieldValue(data,ACCOUNT_TICKER);
        
       
        }
        else if(error)
        {
            console.log('Error',error);
        }
    }
    changeHandler(event)
    {
        this.accticker=event.target.value;
    }
   updateTicker()
   {
    updateTickerRecord(
        {
            newTicker:this.accticker,
            recordId:this.recordId
        })
        .then((result)=>{
            console.log('Update Ticker Record',result);
            notifyRecordUpdateAvailable([{recordId: this.recordId}]);
        })
        .catch((error)=>{
            console.log('Error while updating ticker',error);
        });
    }
}