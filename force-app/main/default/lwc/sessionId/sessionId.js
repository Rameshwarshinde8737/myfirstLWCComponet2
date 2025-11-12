import { LightningElement, api } from 'lwc';
    import getSessionIdFromVFPage from '@salesforce/apex/SessionIdController.getSessionIdFromVFPage';

    export default class sessionId extends LightningElement {
        sessionId;

        connectedCallback() {
            getSessionIdFromVFPage()
                .then(result => {
                    this.sessionId = result;
                    console.log('Session ID:', this.sessionId);
                })
                .catch(error => {
                    console.error('Error retrieving session ID:', error);
                });
        }
    }