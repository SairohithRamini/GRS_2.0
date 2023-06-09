public with sharing class ContractController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchString) {
        String searchKey = '%' + searchString + '%';
        return [SELECT Id, Name FROM Account WHERE Name LIKE :searchKey LIMIT 10];
    }
  
    @AuraEnabled
    public static Id createContract(Id accountId, Date Contract_Start_Date, Date Contract_End_Date, String Business_Unit) {
        Contract newContract = new Contract(
            AccountId = accountId,
            StartDate = Contract_Start_Date,
            Contract_End_Date__c = Contract_End_Date,
            Business_Unit__c  = Business_Unit
        );
        insert newContract;
        return newContract.Id;
    }
}