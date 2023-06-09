import { LightningElement, wire, api } from 'lwc';

export default class AccountDetails extends LightningElement {
    @api account;
    @api contact;
    handleAccountSelection(event) {
        this.selectedAccountId = event.detail.accountId;
        console.log('Received selected account: ', this.selectedAccountId);
    }

    handleContactSelection(event) {
        this.selectedContactId = event.detail.contactId;
        console.log('Received selected contact: ', this.selectedContactId);
    }
}