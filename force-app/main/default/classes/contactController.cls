public with sharing class contactController {
    @AuraEnabled(cacheable=true)
    public static list<contact> getContactList()
    {
        List<Contact>conList= [select Id,Name,Email,Phone,
        FirstName,PhotoUrl,LastName,Title from Contact WHERE PhotoUrl!=NULL with USER_MODE LIMIT 10];
    return conList;
   }
    @AuraEnabled(cacheable=true)
    public static list<contact> getContactListForDataTable()
    {
        List<Contact>conList= [select Id,Name,Title,Phone,
        Email,Picture__c,LastName,Rank__c,AccountId,Account.Name from Contact WHERE AccountId!=NULL with USER_MODE LIMIT 10];
    return conList;
   }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactbasedOnAccount(String accountId)
    {
        List<Contact> conList = [SELECT Id, Name, FirstName,Title, Phone, Email, Picture__c, LastName, Rank__c, AccountId, Account.Name,LeadSource FROM Contact 
                                WHERE AccountId = :accountId 
                                WITH USER_MODE 
                                LIMIT 10];
        return conList;

    }
}