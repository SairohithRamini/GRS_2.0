import { LightningElement, track } from 'lwc';
export default class ContractCreation extends LightningElement {
    @track selectedAccount;
    @track selectedContact;

    handleAccountNameChange(event) {
        // Handle the account name change event here
        const accountName = event.target.value;
        // Perform any necessary logic or actions based on the account name change
    }

    handleSelectedAccount(event) {
        // Handle the selected account event here
        const { accountId, accountName } = event.detail;
        // Perform any necessary logic or actions based on the selected account
        this.selectedAccount = { accountId, accountName };
    }

    handleSelectedContact(event) {
        // Handle the selected contact event here
        const { contactId, contactName } = event.detail;
        // Perform any necessary logic or actions based on the selected contact
        this.selectedContact = { contactId, contactName };
    }

    handleCreateContract(event) {
        // Handle the create contract event here
        const { account, contact } = event.detail;
        // Perform any necessary logic or actions to create a contract with the selected account and contact
    }

    handleAccountSelected(event){
        this.selectedAccount = event.detail;
        console.log('CCC '+JSON.stringify(this.selectedAccount));
    }
    handleContactSelected(event){
        this.selectedContact = event.detail;
        console.log('CCC '+JSON.stringify(this.selectedContact));
    }
}