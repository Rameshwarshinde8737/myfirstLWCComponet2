import { LightningElement, track } from 'lwc';

export default class GetandSet extends LightningElement 
{
   @track localName = 'ram';
   /* get name()
    {
        return this.localName;
    }
    set name(value)
    {
        this.localName = value;
    }
    handleClick(event)
    {
        event.preventDefault();
        this.name = 'shyam'; // This will not work as 'name' is a
    }*/
   handleClick()
   {
    this.localName="sita";
   }
}