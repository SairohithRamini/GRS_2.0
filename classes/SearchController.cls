public with sharing class SearchController {
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String accountName, String taxId) {
        String nameCondition = '';
        String taxIdCondition = '';

        if(String.isNotBlank(accountName)) {
            nameCondition = 'Name LIKE \'%' + String.escapeSingleQuotes(accountName) + '%\' ';
        }
        if(String.isNotBlank(taxId)) {
            taxIdCondition = 'Tax_Identification_Number__c LIKE \'%' + String.escapeSingleQuotes(taxId) + '%\'';
        }
        String query = 'SELECT Id, Name, Tax_Identification_Number__c FROM Account';        
        if(String.isNotBlank(nameCondition) || String.isNotBlank(taxIdCondition)) {
            query += ' WHERE ' + nameCondition;
            if(String.isNotBlank(nameCondition) && String.isNotBlank(taxIdCondition)) {
                query += ' AND ' + taxIdCondition;
            } else if(String.isNotBlank(taxIdCondition)) {
                query += ' WHERE ' + taxIdCondition;
            }
        }
        return Database.query(query);
    }
    //
    @AuraEnabled(cacheable=true)
    public static List<Object> searchRecords(String objectName, String searchString, String whereClause) {
        List<Object> results;
        String nameCondition = '';
        try{
            String query = 'SELECT Id, Name ';
            results = new List<String>();
            if(objectName=='Account'){
                 query = query + ' ,ShippingAddress, BillingAddress ';
                nameCondition = 'Name LIKE \'%' + String.escapeSingleQuotes(searchString) + '%\' ';
                query = query + ' from Account where ' + nameCondition;
            }else{
                // contacts
                query = query + ' ,firstName, lastName from Contact ';
                if(whereClause!=null){
                    query = query + whereClause;
                }
            }
            // results.add(query);
            return Database.query(query);
        }catch(Exception ex){
            System.debug(ex);
            
            results.add(ex.getCause());
        }
        return results;
    }
}