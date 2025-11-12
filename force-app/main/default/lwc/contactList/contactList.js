import { LightningElement,wire} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/sendcontact__c';
import getContactList from '@salesforce/apex/contactController.getContactList';
//parent
export default class ContactList extends LightningElement {
    @wire(getContactList) contacts;
    @wire(MessageContext)
    messageContext;
    selectedContact;
    selectionHandler(event)
    {
        let selectedContactID=event.detail;//when we deal with custom event then use event.detail
        this.selectedContact= this.contacts.data.find((currItem)=>currItem.Id===selectedContactID);
        const payload = { lmsData: this.selectedContact};

        publish(this.messageContext, recordSelected, payload);
       
}
}