import { api, LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from "lightning/navigation";
export default class RecordFormDemo extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;
    fieldList=[NAME_FIELD,INDUSTRY_FIELD,PHONE_FIELD];
    showToast() {
        const event = new ShowToastEvent({
            title: 'sucess',
            variant: 'success',
            
            // message:
            message:'Record inserted sucessfully'
        });
         this.dispatchEvent(event);
}
navigationToRecordPage(event)
{
   // console.log("Event details",event.detail);
    let pageref={
        type: 'standard__recordPage',
         attributes:{
             recordId:event.detail.id,
             objectApiName:this.objectApiName,
             actionName:"view"
    }
};
this[NavigationMixin.Navigate](pageref);
 }
}