// import { LightningElement, api, track, wire } from 'lwc';
// import { getRecord } from 'lightning/uiRecordApi';
// import createContract from '@salesforce/apex/ContractController.createContract';
// import getAccountOptions from '@salesforce/apex/ContractController.getAccountOptions';

// const FIELDS = ['Account.Name'];

// export default class ContractCreation extends LightningElement {
//     @api selectedAccountId;
//     @track accountOptions = [];
//     @track selectedAccount;

//     @wire(getRecord, { recordId: '$selectedAccountId', fields: FIELDS })
//     wiredAccount({ error, data }) {
//         if (data) {
//             this.selectedAccount = { label: data.fields.Name.value, value: this.selectedAccountId };
//         } else if (error) {
//             // Handle error if any
//             console.error(error);
//         }
//     }

//     handleAccountChange(event) {
//         this.selectedAccountId = event.target.value;
//     }

//     handleCreateContract() {
//         if (this.selectedAccount) {
//             createContract({ accountId: this.selectedAccountId })
//                 .then(result => {
//                     // Handle the success of contract creation
//                     // event to notify the parent component about the contract creation
//                     const contractId = result.Id;
//                     this.dispatchEvent(new CustomEvent('contractcreated', { detail: contractId }));
//                 })
//                 .catch(error => {
//                     // Handle any errors
//                     console.error(error);
//                 });
//         }
//     }

//     connectedCallback() {
//         // Fetch the account options dynamically
//         // by calling an Apex controller method
//         getAccountOptions()
//             .then(result => {
//                 this.accountOptions = result.map(account => {
//                     return { label: account.Name, value: account.Id };
//                 });
//             })
//             .catch(error => {
//                 // Handle any errors
//                 console.error(error);
//             });
//     }
// }
import { LightningElement } from 'lwc';
import createContract from '@salesforce/apex/ContractController.createContract';

export default class ContractCreation extends LightningElement {
    selectedAccount;
    contractDetails;
    businessUnitDetails;
    wholesalerDetails;
  
    handleAccountForContract(event) {
        this.selectedAccount = event.detail;
    }
  
    handleContractDetailsChange(event) {
        this.contractDetails = event.target.value;
    }
  
    handleBusinessUnitDetailsChange(event) {
        this.businessUnitDetails = event.target.value;
    }
  
    handleWholesalerDetailsChange(event) {
        this.wholesalerDetails = event.target.value;
    }
  
    handleSubmit() {
        createContract({ 
            accountId: this.selectedAccount.Id, 
            contractDetails: this.contractDetails,
            businessUnitDetails: this.businessUnitDetails,
            wholesalerDetails: this.wholesalerDetails
        })
        .then(result => {
            console.log('Contract created with Id: ' + result);
        })
        .catch(error => {
            console.error('Error in creating contract', error.body.message);
        });
    }
}