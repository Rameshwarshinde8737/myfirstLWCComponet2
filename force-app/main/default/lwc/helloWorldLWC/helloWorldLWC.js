import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Phone', fieldName: 'Phone' }
];

export default class HelloWorldLWC extends LightningElement {
    columns = COLUMNS;
    @track accounts;
    @track error;

    @wire(getAccounts)
    wiredAccounts({ data, error }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
            console.log('✅ Accounts loaded:', data);
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
            console.error('❌ Error loading accounts:', error);
        }
    }
}
