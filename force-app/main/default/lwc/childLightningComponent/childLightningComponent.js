import { LightningElement, api } from 'lwc';

export default class ChildLightningComponent extends LightningElement {
    @api name;

    @api showMessage(greeting) {
        alert(greeting.toUpperCase());



    }

}