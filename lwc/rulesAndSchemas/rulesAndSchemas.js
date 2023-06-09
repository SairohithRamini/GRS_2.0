import { LightningElement, wire, track } from 'lwc';
import getSchemas from '@salesforce/apex/SchemaController.getSchemas';
import { NavigationMixin } from 'lightning/navigation';

export default class LwcSample extends NavigationMixin(LightningElement) {
    @track labelOptions = [
        { label: 'Available', value: 'available' },
        { label: 'Custom', value: 'custom' }
    ];
    @track selectedLabel = 'available';
    @track showStandardSchema = true;
    @track showSpecialSchema = true;
    @track showRuleDetailPage = false;

    @track standardSchemas = [];
    @track specialSchemas = [];
    @track schemas = [];
    @track selectedRule = {};

    @wire(getSchemas)
    wiredSchemas({ error, data }) {
        if (data) {
            this.schemas = data;
            this.filterSchemas();
        } else if (error) {
            console.error(error);
            // Handle error
        }
    }

    filterSchemas() {
        this.standardSchemas = this.schemas.filter((schema) => schema.Type_Schema__c === 'Standard');
        this.specialSchemas = this.schemas.filter((schema) => schema.Type_Schema__c === 'Special');
    }

    get standardColumns() {
        return [
            { label: 'Schema Name', fieldName: 'Schema_Name__c' },
            { label: 'Business Unit', fieldName: 'GRS_Business_Unit__c' },
            { label: 'Schema Description', fieldName: 'Description__c' },
            { label: 'Country', fieldName: 'Country_Code__c' },
            { label: 'Start Date', fieldName: 'Start_Date__c' },
            { label: 'End Date', fieldName: 'End_Date__c' },
            {
                label: 'Details',
                type: 'button',
                typeAttributes: {
                    label: 'View Details',
                    name: 'view_details',
                    variant: 'base',
                    title: 'View Details',
                    onclick: this.handleViewDetailsClick.bind(this)
                    
                }
            }
        ];
    }

    get specialColumns() {
        return [
            { label: 'Schema Name', fieldName: 'Schema_Name__c' },
            { label: 'Business Unit', fieldName: 'GRS_Business_Unit__c' },
            { label: 'Schema Description', fieldName: 'Description__c' },
            { label: 'Country', fieldName: 'Country_Code__c' },
            { label: 'Start Date', fieldName: 'Start_Date__c' },
            { label: 'End Date', fieldName: 'End_Date__c' },
            {
                label: 'Details',
                type: 'button',
                typeAttributes: {
                    label: 'View Details',
                    name: 'view_details',
                    variant: 'base',
                    title: 'View Details',
                    onclick: this.handleViewDetailsClick.bind(this)
                }
            }
        ];
    }
    handleViewDetailsClick(event) {
        console.log('view details is clicked')
        const rowId = event.target.dataset.rowId;
        this.selectedRule = this.schemas.find((schema) => schema.Id === rowId);
        this.showRuleDetailPage = true;

        // Redirect to the rule details page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: rowId,
                objectApiName: 'Rules__c',
                actionName: 'view'
            }
        });
    }

    

    handleLabelChange(event) {
        this.selectedLabel = event.target.value;
        if (this.selectedLabel === 'available') {
            this.showStandardSchema = true;
            this.showSpecialSchema = true;
        } 
        else if (this.selectedLabel === 'custom') {
            this.showStandardSchema = false;
            this.showSpecialSchema = false;
        }
    }
}