public class CreateContractController {
    @AuraEnabled
    public static void createContract(String accountId, String contactId, Date startDate, Boolean emailStatement, Boolean signatory) {
        Contract newContract = new Contract();
        newContract.AccountId = accountId;
        //newContract.ContactId = contactId;
        newContract.StartDate = startDate;
        //newContract.EndDate = endDate;
        newContract.Email_Statement__c = emailStatement;
        newContract.Signatory__c = signatory;
        
        try {
            insert newContract;
        } catch (Exception ex) {
            // Handle any exceptions or errors
            throw new AuraHandledException('Error creating contract: ' + ex.getMessage());
        }
    }
}