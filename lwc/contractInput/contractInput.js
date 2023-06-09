import { LightningElement, track } from 'lwc';

export default class ContractInput extends LightningElement {
    @track contractStartDate;
    @track contractEndDate;
    @track emailCheckbox;
    @track signatoryCheckbox;
    @track wholesalerAccount;

    handleInputChange(event) {
        this[event.target.name] = event.target.value;
    }
    handleNext() {
        const contractDetailsEvent = new CustomEvent('contractdetails', {
            detail: {
                startDate: this.contractStartDate,
                endDate: this.contractEndDate,
                emailCheckbox: this.emailCheckbox,
                signatoryCheckbox: this.signatoryCheckbox,
                account: this.selectedAccount
            }
        });
        this.dispatchEvent(contractDetailsEvent);
    }
}