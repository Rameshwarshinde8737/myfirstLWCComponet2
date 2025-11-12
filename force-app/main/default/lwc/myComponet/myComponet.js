import { LightningElement } from 'lwc';

export default class MyComponent extends LightningElement {
    message = 'Hello, Salesforce!';

    changeMessage() {
        this.message = 'You clicked the button!';
    }
}