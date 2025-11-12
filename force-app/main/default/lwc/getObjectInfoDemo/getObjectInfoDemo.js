import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { LightningElement,wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
export default class GetObjectInfoDemo extends LightningElement {
   accountinfo;
   accounterror;
   
    @wire(getObjectInfo,
        {
            objectApiName : ACCOUNT_OBJECT
})
outputFunction({ data, error }) {
    if (data) {
        this.accountinfo = data;
        this.accounterror=null;
        console.log('Account Info data',data);
    }
    else
    {
        this.accounterror = error;
        this.accountinfo=null;
        console.log('Account Info error',error);
    }
}
}