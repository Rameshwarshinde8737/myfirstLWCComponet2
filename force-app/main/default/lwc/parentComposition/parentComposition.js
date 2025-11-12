import { LightningElement } from 'lwc';

export default class ParentComposition extends LightningElement {

    firechildHandler()
    {
        console.log(' event handled in parent component-at child level');
    }
    firechildDivHandler()
    {
        console.log('event handled in parent component -at div level');
    }
}