import { LightningElement, wire } from 'lwc';
import { publish, subscribe, unsubscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/MyMessageChannel__c';

export default class LmsExample extends LightningElement {
    subscription = null;
    receivedMessage = ''; // <-- property to display on UI

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        // Subscribe to the message channel
        this.subscription = subscribe(
            this.messageContext,
            SAMPLEMC,
            (message) => this.handleMessage(message),
            { scope: APPLICATION_SCOPE }
        );
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        // Display message on UI
        this.receivedMessage = message?.message || 'No message received';
        console.log('LWC received:', this.receivedMessage);
    }

    sendMessage() {
        // Publish message to VF or other components
        publish(this.messageContext, SAMPLEMC, { message: 'Hello from LWC!' });
    }
}
