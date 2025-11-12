import { LightningElement } from 'lwc';

export default class GrandParentComposition extends LightningElement 
{
    firechildHandler()
    {
        console.log('event handled in Grand parent component-at child level');
    }
}