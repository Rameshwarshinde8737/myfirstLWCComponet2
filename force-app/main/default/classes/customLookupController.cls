public with sharing class customLookupController {
    @AuraEnabled(cacheable=true)
    public static List<sObject> searchRecords(String ObjectApiName, String Searchkey)
    {
        List<sObject> sObjectList=new List<SObject>();
        if(String.isNotBlank(Searchkey))
        {
            String key='%'+Searchkey+'%';
            String queryString = 'SELECT Id, Name FROM ' + ObjectApiName + ' WHERE Name LIKE :key';
            sObjectList = Database.query(queryString,AccessLevel.USER_MODE);

        }
        return sObjectList;
    }
   
}