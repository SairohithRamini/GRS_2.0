import { LightningElement, wire } from 'lwc';
import getSchemaList from '@salesforce/apex/SchemaListController.getSchemaList';

const columns = [
    { label: 'Country Code', fieldName: 'Country_Code__c', type: 'text' },
    { label: 'Description', fieldName: 'Description__c', type: 'text' },
    { label: 'End Date', fieldName: 'End_Date__c', type: 'text' },
    { label: 'GRS Business Unit', fieldName: 'GRS_Business_Unit__c', type: 'text' },
    { label: 'Schema Name', fieldName: 'Schema_Name__c', type: 'text' },
    { label: 'Start Date', fieldName: 'Start_Date__c', type: 'text' },
    { label: 'Type Schema', fieldName: 'Type_Schema__c', type: 'text' }
];

export default class Schemas extends LightningElement {
    schemaList;
    columns = columns;

    @wire(getSchemaList)
    wiredSchemaList({ error, data }) {
        if (data) {
            this.schemaList = data;
        } else if (error) {
            console.error(error);
        }
    }
}