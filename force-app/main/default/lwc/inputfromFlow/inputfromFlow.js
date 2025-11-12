import { LightningElement,api} from 'lwc';
import {FlowAttributeChangeEvent} from 'lightning/flowSupport';
export default class InputfromFlow extends LightningElement {
    @api inputName;
    changeHandler(event)
    {
        this.inputName = event.target.value;
        console.log('Input Name: ' + this.inputName);
        const navigateNextEvent = new FlowAttributeChangeEvent(
            "inputName",
            this.inputName
        );
        this.dispatchEvent(navigateNextEvent);
    }
}