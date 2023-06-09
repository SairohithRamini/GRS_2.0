import { LightningElement, track } from 'lwc';
import fetchAccount from '@salesforce/apex/AccountRelatedObj.fetchAccount';
import fetchContact from '@salesforce/apex/AccountRelatedObj.getContacts';

export default class SelectAccounts extends LightningElement {
    @track acc = [];
    @track con = [];
    @track error;
    @track accountName = '';
    @track selectedAccountId = '';
    @track selectedContactId = '';

    @track accSelected = false;
    @track account;
    @track contact;

    handleKeyChange(event) {
        this.accountName = event.target.value;
        console.log('Search Term: ', this.accountName);
        fetchAccount({ actName: this.accountName })
        .then(result => {
            this.acc = result.map(acc => ({ label: acc.Name, value: acc.Id }));
            console.log('Fetched Accounts: ', this.acc);
        })
        .catch(error => {
            this.error = error;
            console.error('Error fetching Accounts: ', error);
        });
    }
    
    handleAccountClick(event) {
        this.selectedAccountId = event.currentTarget.dataset.id;
        this.selectedAccount = this.acc.find(acc => acc.value === this.selectedAccountId);
        this.accountName = this.selectedAccount.label;
        this.acc = []; // Clear the account list
    
        // Dispatch selected account details
        const selectedAccountEvent = new CustomEvent('selectedaccount', {
            detail: {
                accountId: this.selectedAccountId,
                accountName: this.accountName
            },
            bubbles: true
        });
        this.dispatchEvent(selectedAccountEvent);
        console.log('Dispatched selected Account details.');
        this.fetchContact();
    }
    
    
    handleContactChange(event) {
        this.selectedContactId = event.detail.value;
        console.log('Selected Contact ID: ', this.selectedContactId);
    
        // Dispatch selected contact details
        const selectedContactEvent = new CustomEvent('selectedcontact', {
            detail: {
                contactId: this.selectedContactId,
                contactName: this.con.find(con => con.value === this.selectedContactId).label
            },
            bubbles: true
        });
        this.dispatchEvent(selectedContactEvent);
        console.log('Dispatched selected Contact details.', selectedContactEvent);
    }
    
    fetchContact(){
        fetchContact({accountId: this.selectedAccountId})
        .then(result => {
            this.con = result.map(con => ({ label: con.LastName, value: con.Id }));
            this.con.unshift({ label: '--Select Contact--', value: '' });
            this.selectedContactId = '';
            console.log('Fetched Contacts: ', this.con);
        })
        .catch(error =>{
            this.error = error;
            console.error('Error fetching Contacts: ', error);
        });
    }

    handleCreateContract() {
        // Fetch the selected account and contact
        let selectedAccount = this.selectedAccount;
        let selectedContact = this.selectedContact;
    
        // If no contact is selected
        if (!selectedContact || !selectedContact) {
            console.error('No account or contact selected. Please select both before creating a contract.');
            return;
        }
    
        // Dispatch the createcontract event with the selected account and contact
        const contractEvent = new CustomEvent('createcontract', {
            detail: {
                account: selectedAccount,
                contact: selectedContact
            },
            bubbles: true
        });
        this.dispatchEvent(contractEvent);
        console.log('Dispatched createContract event.');
    }
    
    get showAccountList() {
        return this.accountName && this.acc && this.acc.length > 0;
    }
    //Search components call back methods
    handleAccSelected(event){
        this.account = event.detail;
        this.contWhereClause = ' where accountid=\'' + this.account.Id +'\'';        
        this.accSelected = true;  
        console.log('SAC '+JSON.stringify(this.account));

        const accountselectedEvent = new CustomEvent('accountselected', { detail: this.account });
        this.dispatchEvent(accountselectedEvent);
    }
    handleContSelected(event){
        this.contact = event.detail;
        console.log('SAC '+JSON.stringify(this.contact));  
        const contactselectedEvent = new CustomEvent('contactselected', { detail: this.contact });
        this.dispatchEvent(contactselectedEvent);
    }
}
