import { LightningElement,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import Type from '@salesforce/schema/Account.Type';
export default class HeaderLessQuickActionDemo extends NavigationMixin(LightningElement) 
{
    @api invoke()
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',  
                actionName: 'home'

        }
    });
    }
}