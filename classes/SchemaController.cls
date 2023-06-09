public with sharing class SchemaController {
    @AuraEnabled(cacheable=true)
    public static List<Schemas__c> getSchemas() {
        return [SELECT Id, Schema_Name__c, Type_Schema__c, GRS_Business_Unit__c, Description__c, Country_Code__c, Start_Date__c, End_Date__c FROM Schemas__c];
    }
}