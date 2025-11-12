import { LightningElement, track } from 'lwc';

export default class NestedObjectPrivateProperty extends LightningElement 
{

   @track myDetails={fname:'ram',lname:'shinde'};

   handleClick(event)
   {
    this.myDetails.fname = 'sita';
   }
}