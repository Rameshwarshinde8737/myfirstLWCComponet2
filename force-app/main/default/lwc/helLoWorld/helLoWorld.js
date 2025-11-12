import { LightningElement,api } from 'lwc';
export default class HelLoWorld extends LightningElement 
{
    fruits = ['Apple', 'Banana', 'Orange', 'Mango'];
    //private variable/Property
    welcomemessage;
    message = 'Welcome to Salesforce Org this is my first LWC component';


    //public
    @api __message='This is a public property';
}