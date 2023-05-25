public with sharing class SearchController {
    @AuraEnabled(cacheable=true)
    public static List<Contract> searchContracts(String accountName, String status) {
        List<Contract> contracts = new List<Contract>();
        
        // Query the contracts based on the provided criteria
        String query = 'SELECT Id, Name, Status FROM Contract';
        
        if (!String.isEmpty(accountName)) {
            query += ' WHERE Account.Name LIKE \'%' + accountName + '%\'';
        }
        
        if (!String.isEmpty(status)) {
            if (query.contains('WHERE')) {
                query += ' AND Status = \'' + status + '\'';
            } else {
                query += ' WHERE Status = \'' + status + '\'';
            }
        }
        
        contracts = Database.query(query);
        
        return contracts;
    }
}