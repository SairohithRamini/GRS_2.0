import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = ['Account.Name', 'Account.Phone'];  // add more fields as necessary

export default class AccountDetails extends LightningElement {
    @api accountId;

    connectedCallback() {
        // Listen for accountselected event
        window.addEventListener('accountselected', event => {
            this.accountId = event.detail;
            console.log('accountselected event received, accountId:', this.accountId);  // new console.log() statement
        });
    }

    disconnectedCallback() {
        // Clean up listener
        window.removeEventListener('accountselected');
    }

    @wire(getRecord, { recordId: '$accountId', fields: FIELDS })
    account;

    renderedCallback() {
        if(this.account && this.account.data) {
            console.log('Account Details:', JSON.stringify(this.account.data));  // new console.log() statement
        }
        else if (this.account && this.account.error) {
            console.log('Error fetching account:', JSON.stringify(this.account.error));  // new console.log() statement
        }
    }
}