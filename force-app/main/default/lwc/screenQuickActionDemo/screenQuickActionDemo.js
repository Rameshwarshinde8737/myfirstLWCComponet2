import { LightningElement, api } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';

export default class ScreenQuickActionDemo extends LightningElement {
    @api recordId;
    @api objectApiName;

    fields = {
        accountName: ACCOUNT_NAME,
        accountIndustry: ACCOUNT_INDUSTRY
    };

    closeModal() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleSuccess(event) {
        console.log('Record saved successfully', event.detail.id);

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Record Saved Successfully',
                variant: 'success'
            })
        );

        this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleError(event) {
        console.error('Error:', event.detail.message);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: event.detail.message,
                variant: 'error'
            })
        );
    }
}
