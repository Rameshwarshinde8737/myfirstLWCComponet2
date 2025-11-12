import { getObjectInfo, getPicklistValues, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import { LightningElement,wire,track} from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
export default class GetpicklistvaluesDemo extends LightningElement {
    value;  
    @wire(getObjectInfo,
    {
       objectApiName :ACCOUNT_OBJECT
    })
    accountinfo;
   @wire(getPicklistValues,
        {
                    recordTypeId: '$accountinfo.data.defaultRecordTypeId',
                    fieldApiName: ACCOUNT_INDUSTRY
        })
        industryPicklist;
    @wire(getPicklistValuesByRecordType,//need for multiple picklist values
        {
            objectApiName: ACCOUNT_OBJECT,
            recordTypeId: "$accountinfo.data.defaultRecordTypeId"
        } )
    accountInfopicklist;
     
//    accountInfofunction({data,error})
//         {
//             if(data)
//             {
//             console.log('Account picklist',data);            
//             }
//             else if(error)
//             {
//                console.log('Account error',error);
//             }
//         }   
    handleChange(event){
        this.value = event.target.value;
    }
}