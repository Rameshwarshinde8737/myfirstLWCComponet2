import { LightningElement,wire} from 'lwc';
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import CONTACT_NAME_FIELD from "@salesforce/schema/Contact.Name";
import {getRecords} from 'lightning/uiRecordApi';
export default class GetRecordsDemo extends LightningElement {
outputs;
errors;
@wire(getRecords,{
    
    records:[
        {
            recordIds:["001S800000YjzhZIAR","001S800000ZLalDIAT"],
            fields:[ACCOUNT_NAME_FIELD]
        },
        {
            recordIds:["003S800000WfBzaIAF"],
            fields:[CONTACT_NAME_FIELD]
        }

    ]
})
outputFunction({data,error})
{
    if(data)
    {
        console.log('Data: ', data);
        this.outputs=data;
        this.errors=null;
    }
    else if(error)
    {
        console.log('Error: ', error);
        this.errors=error;
        this.outputs=null;
    }
}

}