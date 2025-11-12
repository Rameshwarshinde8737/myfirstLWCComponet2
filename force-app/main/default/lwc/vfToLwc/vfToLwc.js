import { LightningElement, wire, track } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import VFToLWCChannel from '@salesforce/messageChannel/VFToLWCChannel__c';

export default class VfToLwc extends LightningElement {
    @track receivedMessage = '';

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        subscribe(this.messageContext, VFToLWCChannel, (message) => {
            this.receivedMessage = message.messageText;
            console.log("📩 LWC received message:", message.messageText);
        });
    }
}
