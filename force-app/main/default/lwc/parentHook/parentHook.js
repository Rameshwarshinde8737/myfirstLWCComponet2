import { LightningElement } from 'lwc';

export default class ParentHook extends LightningElement {
    displayChild=false;
constructor()
{
    super();
  console.log('ParentHook constructor called');
}
connectedCallback()
{
console.log('ParentHook connectedCallback called');
}
renderedCallback()
{
console.log('ParentHook renderedCallback called');
}
errorCallback(error,stack)
{
    console.log('ParentHook errorCallback called');
    console.error("error",error);
    console.error("stack",stack);
}
disconnectedCallback()
{
    console.log('ParentHook disconnectedCallback called');
}
changeHandler(event) {
    this.displayChild=event.target.checked;
}
}