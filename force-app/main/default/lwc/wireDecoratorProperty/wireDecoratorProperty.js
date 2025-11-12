import { LightningElement,wire } from 'lwc';
import getAccountData from "@salesforce/apex/AccountHelper.getAccountData";
const columns = [
    { label: 'Account ID', fieldName: 'ID' },
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'Phone', fieldName: 'Phone'}
    
];


export default class WireDecoratorProperty extends LightningElement {
    columns= columns;
    @wire (getAccountData)accounts;
    //accounts.data
    //accounts.error
}