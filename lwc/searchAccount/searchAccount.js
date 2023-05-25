import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountSearch.getAccounts';
import searchAccounts from '@salesforce/apex/SearchController.searchAccounts';

export default class SearchAccount extends LightningElement {
    @track accountName = '';
    @track accountList = [];
    @track searchParams = {
        Name: '',
        TaxId: ''
    };
    @track accounts = [];
    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Tax ID', fieldName: 'Tax_Identification_Number__c' },
        { type: 'button', typeAttributes: { label: 'Select', name: 'select', variant: 'base' }}
    ];
    
    @wire(getAccounts, { actName: '$accountName' })
    retrieveAccounts({error, data}) {
        if(data) {
            this.accountList = data;
        } else if(error) {
            console.log('Error: ' + JSON.stringify(error));
        }
    }

    handleKeyChange(event) {
        this.accountName = event.target.value;
        this.searchParams.Name = this.accountName;
        this.handleSearch();
    }

    handleItemClick(event) {
        this.accountName = event.target.dataset.name;
    }

    get showAccountList() {
        return this.accountName && this.accountList && this.accountList.length > 0;
    }

    handleInputChange(event) {
        const field = event.target.dataset.field;
        this.searchParams[field] = event.target.value;
        console.log(`Input changed: ${field} = ${this.searchParams[field]}`);
    }

    handleSearch() {
        console.log('Search button clicked');
        console.log(`Search parameters: ${JSON.stringify(this.searchParams)}`);
        searchAccounts({ accountName: this.searchParams.Name, taxId: this.searchParams.TaxId })
            .then(result => {
                console.log(`Search results: ${JSON.stringify(result)}`);
                this.accounts = result;
            })
            .catch(error => {
                console.log('Error: ' + JSON.stringify(error));
            });
    }

    handleRowAction(event) {
        const selectedAccountId = event.detail.row.Id;
        const selectedAcc = this.accounts.find(acc => acc.Id === selectedAccountId);
        console.log('this.selectedAccountId >> '+selectedAccountId);
        console.log(JSON.stringify(selectedAcc));
        window.dispatchEvent(new CustomEvent('accountselected', { detail: selectedAcc }));
    }
}


