public with sharing class AccountHelper {
     //git Demo for Pull Request Mahendra sir please verify it
    @AuraEnabled(cacheable=true)// when we perform any dml in LWC then not used cacheable true
    public static list<account> getAccountData(String inputIndustry)
    {
       return [select Id,Name,Type,Phone from account WHERE Industry=:inputIndustry with security_enforced];
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getParentAccountData()
    {
        return [Select Id,Name,Industry FROM Account Where AnnualRevenue!=NULL WITH USER_MODE];
    }
    @AuraEnabled
    public static String updateTickerRecord(String recordId,String newTicker)
    {
        Account acc=new Account(Id=recordId,TickerSymbol=newTicker);
        try {
           update acc;
           return 'success';
        } catch (Exception ex) {
            return ex.getMessage();
        }
    }
       
}
