public class AccountRelatedObj {

     @AuraEnabled
     public static List<Account> fetchAccount(String actName) {
     return [SELECT Id, Name, Tax_Identification_Number__c, Buying_Group__c, 
                ShippingAddress, BillingAddress FROM Account WHERE Name LIKE :('%' + actName + '%')];
    }

    @auraEnabled
    public static List<Contact> getContacts(String accountId) {
        List<Contact> conList=[SELECT Id,LastName,AccountId FROM Contact WHERE AccountId=:accountId LIMIT 10000];
        return conList;
    }
}