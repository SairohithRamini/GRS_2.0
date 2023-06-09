import { LightningElement, track, api } from 'lwc';
import searchAccounts from '@salesforce/apex/SearchController.searchAccounts';
import searchRecords  from '@salesforce/apex/SearchController.searchRecords';
export default class AccountSearchComponent extends LightningElement {
    searchParams = {
        Name: '',
        TaxId: ''
    };
    @api showSearchButton=false;
    @api displayLable;
    @api objectName;
    @api whereClause;

    @track showRecords = false;
    @track searchResults = [];
    selectedAccountId = '';
    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Tax ID', fieldName: 'Tax_Identification_Number__c' },
        { type: 'button', typeAttributes: { label: 'Select', name: 'select', variant: 'base' }}
    ];

    connectedCallback(){
        if(this.objectName != undefined && this.objectName === 'Contact' && this.whereClause!=undefined){
            console.log(this.objectName + ' ' + this.objectName + ' ' + this.whereClause);
            this.callSearchQuery('');
        }
    }
    handleInputChange(event) {
        const field = event.target.dataset.field;
        this.searchParams[field] = event.target.value;
        console.log(`Input changed: ${field} = ${this.searchParams[field]}`);
    }
    /*
    handleSearch() {
        console.log('Search button clicked');
        console.log(`Search parameters: ${JSON.stringify(this.searchParams)}`);
        searchAccounts({ accountName: this.searchParams.Name, taxId: this.searchParams.TaxId })
            .then(result => {
                console.log(`Search results: ${JSON.stringify(result)}`);
                this.searchResults = result;
                this.showRecords = true;
            })
            .catch(error => {
                console.log('Error: ' + JSON.stringify(error));
                this.showRecords = true;
            });
    }*/

    handleSearch() {
        console.log(`Search parameters: ${JSON.stringify(this.searchParams)}`);
        this.callSearchQuery(this.searchParams.Name);
        /*
        searchRecords({ objectName:this.objectName, searchString: this.searchParams.Name, whereClause: this.whereClause})
            .then(result => {
                console.log(`Search results: ${JSON.stringify(result)}`);
                this.searchResults = result;
                this.showRecords = true;
            })
            .catch(error => {
                console.log('Error: ' + JSON.stringify(error));
                this.showRecords = true;
            });*/
    }
    callSearchQuery(searchText){
        searchRecords({ objectName:this.objectName, searchString: searchText, whereClause: this.whereClause})
            .then(result => {
                console.log(this.objectName);
                console.log(`Search results: ${JSON.stringify(result)}`);
                this.searchResults = result;
                this.showRecords = true;
            })
            .catch(error => {
                console.log('Error: ' + JSON.stringify(error));
                this.showRecords = true;
            });
    }
    handleRecSelection(event) {
        let recId = event.currentTarget.dataset.id;
        var selectedRec = this.searchResults.find(rec => rec.Id===recId);
        console.log(JSON.stringify(selectedRec));
        //window.dispatchEvent(new CustomEvent('recordselected', { detail: selectedRec }));
        const recordselectedEvnt = new CustomEvent('recordselected', { detail: selectedRec });
        this.dispatchEvent(recordselectedEvnt);

        this.showRecords = false;

    }
}
