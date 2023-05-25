// import { LightningElement, track, wire } from 'lwc';
// import searchContracts from '@salesforce/apex/SearchController.searchContracts';
// import { NavigationMixin } from 'lightning/navigation';

// export default class ContractSearchComponent extends NavigationMixin(LightningElement) {
//     @track accountName = '';
//     @track selectedStatus = '';
//     @track showTable = false;
//     @track contractData = [];

//     handleAccountNameChange(event) {
//         this.accountName = event.target.value;
//     }

//     handleStatusChange(event) {
//         this.selectedStatus = event.target.value;
//     }

//     handleSearch() {
//         searchContracts({ accountName: this.accountName, status: this.selectedStatus })
//             .then(result => {
//                 this.contractData = result;
//                 this.showTable = true;
//             })
//             .catch(error => {
//                 // Handle any errors
//                 console.error(error);
//             });
//     }

// handleCreateNew() {
// //navigate to the standard New Contract record page
// this[NavigationMixin.Navigate]({
//     type: 'standard__component',
//     attributes: {
//         componentName: 'c__contractCreation'
//     }
// });
// }

//     get statusOptions() {
//         return [
//             { label: 'Active', value: 'Active' },
//             { label: 'Inactive', value: 'Inactive' },
//             { label: 'Draft', value: 'Draft' }

//         ];
//     }

//     get columns() {
//         return [
//             { type: 'checkbox', fieldName: 'selected', label: '', editable: true },
//             { label: 'Account Name', fieldName: 'AccountId' },
//             { label: 'Status', fieldName: 'Status' }
//         ];
//     }
// }

import { LightningElement, track } from 'lwc';

export default class ContractSearchComponent extends LightningElement {
    @track selectedAcc;

    handleAccountSelected(event) {
        this.selectedAcc = event.detail;
    }
}