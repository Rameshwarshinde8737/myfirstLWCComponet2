import { LightningElement, track } from 'lwc';

export default class Accounts extends LightningElement 
{
contactRecord={};
 @track options = [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
            ];  
    
    handlerChange(event) 
     {
        event.preventDefault();
        let element = event.target;
        let value = element.value;
        let name=element.name; //field api name 
        this.contactRecord[name] = value; //set the value in the contactRecord object

       
     }
    handleClick(event) 
    {
        event.preventDefault();
    }
    handleclickAccount(evt)
    {
        evt.preventDefault();
        let button=evt.target;
        console.log(JSON.stringify(this.contactRecord));// to convert object into JSON
    }
}