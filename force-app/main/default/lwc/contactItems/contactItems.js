import { LightningElement,api} from 'lwc';

export default class ContactItems extends LightningElement {
    @api contact;
    clickHandler(event)
    {
        //prevent the anchor element from navigation
        event.preventDefault();

        //1.creation of custom event
        const selectionevent=new CustomEvent('selection',{
            detail:this.contact.Id
        });
        //2.dispatch the custom event
        this.dispatchEvent(selectionevent);
    }
}