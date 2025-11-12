import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class CustomModalForDataTable extends LightningElement {
   @api isDisplayMode=false;
   @api isEditMode=false;   
   @api recordInputId;
    get header()
    {
        if(this.isDisplayMode)
        {
            return 'display Contact Details';
        }
        else if(this.isEditMode)
        {
            return 'Edit Contact Details';
        }
        else return '';

    }
    closeModalhandler()
    {
        let mycustomEvent = new CustomEvent('closemodal');
        this.dispatchEvent(mycustomEvent);

    }
    successHandler()
    {
        this.showToast();
        this.closeModalhandler();

    }
    showToast() {
        const event = new ShowToastEvent({
            title: 'Success',
            message:
                'Record updated successfully',
            variant: 'success',});
        this.dispatchEvent(event);
    }
}