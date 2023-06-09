public with sharing class SchemaListController {
    @AuraEnabled(cacheable=true)
    public static List<Schemas__c> getSchemaList() {
        return [SELECT Country_Code__c, Description__c, End_Date__c, GRS_Business_Unit__c, Schema_Name__c, Start_Date__c, Type_Schema__c FROM Schemas__c];
    }
}