// import { LightningElement, wire } from 'lwc';
// import getAccounts from '@salesforce/apex/ContractController.getAccounts';

// export default class SearchComponent extends LightningElement {
//     accounts;
//     columns = [
//         { label: 'Account Name', fieldName: 'Name' },
//         { label: 'Record Type', fieldName: 'RecordType'},
//         { label: 'Tax Identification Number', fieldName: 'Tax_Identification_Number__c'}
//         // include additional fields as required
//     ];
  
//     handleSearchChange(event) {
//         getAccounts({ searchString: event.target.value })
//             .then(result => {
//                 this.accounts = result;
//             })
//             .catch(error => {
//                 console.error('Error in getting accounts', error.body.message);
//             });
//     }
// }

import { LightningElement, track } from 'lwc';
import searchAccounts from '@salesforce/apex/SearchController.searchAccounts';

export default class AccountSearchComponent extends LightningElement {
    searchParams = {
        Name: '',
        TaxId: ''
    };
    @track accounts = [];
    selectedAccountId = '';
    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Tax ID', fieldName: 'Tax_Identification_Number__c' },
        { type: 'button', typeAttributes: { label: 'Select', name: 'select', variant: 'base' }}
    ];
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
        this.selectedAccountId = event.detail.row.Id;
        var selectedAcc = this.accounts.find(acc => acc.Id===this.selectedAccountId);
        console.log('this.selectedAccountId >> '+this.selectedAccountId);
        console.log(JSON.stringify(selectedAcc));
        window.dispatchEvent(new CustomEvent('accountselected', { detail: selectedAcc }));
        /*
        const actionName = event.detail.action.name;
        if (actionName === 'select') {
            this.selectedAccountId = event.detail.row.Id;
            this.dispatchEvent(new CustomEvent('accountselected', { detail: this.selectedAccountId }));
        }*/
    }
}
