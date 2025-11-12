import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordEditFormDemo extends NavigationMixin(LightningElement) {
@api recordID;
@api objectApiName;
    fields={
    name:ACCOUNT_NAME_FIELD,
    industry:ACCOUNT_INDUSTRY_FIELD
};

handleSuccess(event)
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
errorHandler(event)
{
    console.log(event.detail);
    const customevent=new ShowToastEvent({
        title:"Error",
        message:event.detail.message,
        variant:"error"
    });
    this.dispatchEvent(customevent);
}
submitHandler(event)
{
   event.preventDefault();
    //check if industry is blank then populate the default insdustry as 'energy'
        const fields=event.detail.fields;
        if(!fields.Industry)
        {
            fields.Industry='Energy';
        }
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        
}
resetForm()
{
   let inputFileds= this.template.querySelectorAll('lightning-input-field');
    inputFileds.forEach((currItem)=>{
        currItem.reset();
    });
       
}
}