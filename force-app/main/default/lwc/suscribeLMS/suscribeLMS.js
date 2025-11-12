import { LightningElement,wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/sendMessage__c';

export default class SuscribeLMS extends LightningElement {
    subscription = null;
    pubMesage="";
    @wire(MessageContext)
    messageContext;

     connectedCallback() {
        this.subscribeToMessageChannel();
    }
     subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                recordSelected,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }
    handleMessage(message) {
        this.pubMesage = message.lmsData;
    }
     disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
     unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }


}