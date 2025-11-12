import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
export default class NavigationDemo extends NavigationMixin(LightningElement) {

    navigateToHome()
    {
        let pageref={
        type: 'standard__namedPage',
        attributes: {
        pageName: 'home'
    }
};
this[NavigationMixin.Navigate](pageref);
    }

    navAccListnavigateToHome()
    {
        let pageref=// Navigates to account list with the filter set to Recent.
{
    type: 'standard__objectPage',
    attributes: {
        objectApiName: 'Account',
        actionName: 'list'
    },
    state: {
        filterName: 'Recent'
  }
};
this[NavigationMixin.Navigate](pageref);

    }
    createNewAccountnavigateToHome()
    {
        let pageref=
        // Navigates to a new account page using these default field values:
//{
//    Name: 'Salesforce, #1=CRM',
//    OwnerId: '005XXXXXXXXXXXXXXX',
//    AccountNumber: 'ACXXXX',
//    NumberOfEmployees: 35000,
//    CustomCheckbox__c: true
//}
{
    type: 'standard__objectPage',
    attributes: {
        objectApiName: 'Account',
        actionName: 'new'
    }
    
};
this[NavigationMixin.Navigate](pageref);

    }
    createNewAccountDefaultvaluenavigateToHome()
    {
       const defaultValues = encodeDefaultFieldValues(
        {
            Name: 'Salesforce, #1=CRM',
            Phone: '7879648737'
           
        }
       );

        let pageref={
       type: 'standard__objectPage',
    attributes: {
        objectApiName: 'Account',
        actionName: 'new'
    },
    state: {
        defaultFieldValues : defaultValues
      
    }
};   
this[NavigationMixin.Navigate](pageref);
    
}
editAccountHandler()
{
    let pageref=
    {
    type: 'standard__recordPage',
    attributes: {
        recordId:"001S800000ZLal9IAD",
        objectApiName: 'Account',
        actionName: 'clone'
    }
    

};
this[NavigationMixin.Navigate](pageref);


}
}