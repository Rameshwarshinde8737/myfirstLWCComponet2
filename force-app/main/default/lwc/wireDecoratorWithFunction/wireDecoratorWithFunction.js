import { LightningElement,wire } from 'lwc';
import getAccountData from "@salesforce/apex/AccountHelper.getAccountData";
const columns = [
    { label: 'Account ID', fieldName: 'ID' },
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'Phone', fieldName: 'Phone'}
    
];

export default class WireDecoratorWithFunction extends LightningElement {
    accounts;
    errors;
    columns=columns;

    @wire(getAccountData) accountFunction({data,error})
    {
        if(data)
        {
            console.log(data);
            let updatedAccounts=data.map(currItem => {
                let updatedObject={};
                if(!currItem.hasOwnProperty('Type')) 
                {
                    updatedObject={...currItem,Type:"Business"}

                }
                else
                {
                    updatedObject={...currItem};
                }
                return updatedObject;
               
        });
         console.log('updatedAccounts'+updatedAccounts);
                this.accounts=[...updatedAccounts];
                this.errors=null;
    }
        else if(error)
        {
            console.error(error);
            this.errors=error;
            this.accounts=null;
        }
    }

}