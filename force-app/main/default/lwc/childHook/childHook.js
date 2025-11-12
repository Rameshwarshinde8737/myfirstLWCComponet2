import { LightningElement } from 'lwc';

export default class ChildHook extends LightningElement {
    
    constructor()
{
    super();
console.log('ChildHook constructor called');
}
connectedCallback()
{
console.log('ChildHook connectedCallback called');
throw new Error('An error occurred in ChildHook'); // Simulating an error
}
renderedCallback()
{
console.log('ChildHook renderedCallback called');

}
errorCallback(error,stack)
{
    console.log('ChildHook errorCallback called');

}
disconnectedCallback()
{
    console.log('ChildHook disconnectedCallback called');
}

}