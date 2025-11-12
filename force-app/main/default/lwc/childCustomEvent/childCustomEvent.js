import { LightningElement } from 'lwc';

export default class ChildCustomEvent extends LightningElement {
    clickButtonHandler()
    {
        //1.creation of custom event
        let mycustomevent=new CustomEvent('displaymsg');
        //2.dispatch the custom event
        this.dispatchEvent(mycustomevent);

    }

}