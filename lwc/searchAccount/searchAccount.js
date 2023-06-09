import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountSearch.getAccounts';

export default class SearchAccount extends LightningElement {
    @track accountName = '';
    @track accountList = [];
    @track selectedAccount = null;
    @track isButtonDisabled = true;
    @track selectedContact = null;

    @wire(getAccounts, { actName: '$accountName' })
    retrieveAccounts({error, data}) {
        if(data) {
            this.accountList = data;
            console.log('Retrieved Accounts: ', data);
        } else if(error) {
            console.error('Error: ' + JSON.stringify(error));
        }
    }

    handleKeyChange(event) {
        this.accountName = event.target.value;
        console.log('Account Name Entered: ', this.accountName);
        
    }

    handleItemClick(event) {
        const accountId = event.currentTarget.dataset.id;
        this.selectedAccount = this.accountList.find(account => account.Id === accountId);
        this.accountName = this.selectedAccount.Name;
    
        this.isButtonDisabled = !this.selectedAccount;
        console.log('Selected Account: ', this.selectedAccount);
        
        // Set the selectedContact only if the Contacts field is defined and has at least one record
        if (this.selectedAccount.Contacts && this.selectedAccount.Contacts.records.length > 0) {
            this.selectedContact = this.selectedAccount.Contacts.records[0];
            console.log('Selected Contact: ', this.selectedContact);
        } else {
            // If there's no contact, set selectedContact as undefined
            this.selectedContact = undefined;
            console.log('No contact found for this account');
        }
    
        // Dispatch the event with both account and contact details
        this.dispatchEvent(new CustomEvent('selected', {
            detail: { account: this.selectedAccount, contact: this.selectedContact }
        }));
        console.log('Dispatched selected event with selected account and contact');
    }
    

    get showAccountList() {
        return this.accountName && this.accountList && this.accountList.length > 0;
    }

    handleCreateContract() {
        console.log('Creating contract for selected account');
        const selectedEvent = new CustomEvent('selected', {
            detail: this.selectedAccount
        });
      
        // Dispatch the custom event
        this.dispatchEvent(selectedEvent);
        console.log('Dispatched selected event with selected account');
    }
}
   

// handleItemClick(event) {
//     const accountId = event.currentTarget.dataset.id;
//     this.selectedAccount = this.accountList.find(account => account.Id === accountId);
//     this.accountName = this.selectedAccount.Name;

//     // Assuming each Account has at least one Contact, select the first one
//     if (this.selectedAccount.Contacts && this.selectedAccount.Contacts.records.length > 0) {
//         this.selectedContact = this.selectedAccount.Contacts.records[0];
//     }

//     this.dispatchEvent(new CustomEvent('selected', {
//         detail: { account: this.selectedAccount, contact: this.selectedContact }
//     }));
// }