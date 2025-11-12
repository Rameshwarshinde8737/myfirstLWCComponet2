import { LightningElement,api} from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
 export default class RecordViewFormDemo extends LightningElement {
    @api recordId;
    @api objectApiName;
    fieldobject={
      Name:NAME_FIELD,
      Industry:INDUSTRY_FIELD,
      Phone:PHONE_FIELD,
      Revenue:REVENUE_FIELD

    };
}