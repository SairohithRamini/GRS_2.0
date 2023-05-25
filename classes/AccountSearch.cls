public with sharing class AccountSearch {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String actName){
        String keyString = '%' + actName + '%';
        return [SELECT Id, Name FROM Account WHERE Name LIKE :keyString];
    }
}
