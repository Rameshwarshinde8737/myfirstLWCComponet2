import { LightningElement,api,wire } from 'lwc';
import ACCOUNT_NAME from "@salesforce/schema/Account.Name"
import ACCOUNT_REVENUE from "@salesforce/schema/Account.AnnualRevenue"
import { getFieldDisplayValue, getFieldValue, getRecord } from 'lightning/uiRecordApi';
export default class GetRecordUi extends LightningElement {

    @api recordId;
    accname;
    accrevenue;
    @wire(getRecord,{
        recordId: '$recordId',
        fields: [ACCOUNT_NAME, ACCOUNT_REVENUE]
    })
    outputFunction({data, error}) {
        if(data) {
            console.log('Data: ', data);
           // this.accname = data.fields.Name.value;// to stop this manual traversing we use getFieldValue method
           this.accname=getFieldValue(data, ACCOUNT_NAME);
            //this.accrevenue = data.fields.AnnualRevenue.value;
            //this.accrevenue=getFieldValue(data, ACCOUNT_REVENUE);
          //this.accname= getFieldDisplayValue(data, ACCOUNT_NAME);//we dont have display value
           this.accrevenue=getFieldDisplayValue(data, ACCOUNT_REVENUE);
        } else if(error) {
            console.error('Error: ', error);
        }
    }

}