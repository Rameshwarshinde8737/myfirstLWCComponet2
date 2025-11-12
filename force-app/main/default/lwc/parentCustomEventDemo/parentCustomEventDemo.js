import { LightningElement } from 'lwc';
export default class ParentCustomEventDemo extends LightningElement {
    displaymMessage=false;
    displayMessageHandler()
    {
        this.displaymMessage=true;
    }
}