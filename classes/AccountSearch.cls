public with sharing class AccountSearch {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String actName){
        String keyString = '%' + actName + '%';
        return [SELECT Id, Name, Tax_Identification_Number__c, Buying_Group__c, 
                ShippingAddress, BillingAddress FROM Account WHERE Name LIKE :keyString];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accountId) {
        return [SELECT Id, Name, Email, Phone FROM Contact WHERE AccountId = :accountId];
    }
}