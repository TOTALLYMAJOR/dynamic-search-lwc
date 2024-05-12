import { LightningElement, track, api } from 'lwc';
import fetchResults from '@salesforce/apex/DynamicSearchController.fetchResults';

export default class DynamicSearchLWC extends LightningElement {
    @api objectName = 'Account'; // Default object
    @api searchField = 'Name'; // Default fielda    @track results;
    @track error;

    handleSearchChange(event) {
        const searchQuery = event.target.value;
        if (searchQuery) {
            fetchResults({ objectName: this.objectName, searchQuery, searchField: this.searchField })
                .then(result => {
                    this.results = result.map(record => ({
                        id: record.Id,
                        value: record[this.searchField],
                        url: '/lightning/r/' + this.objectName + '/' + record.Id + '/view'
                    }));
                    this.error = undefined;
                })
                .catch(error => {
                    this.error = error.body.message;
                    this.results = undefined;
                });
        } else {
            this.results = undefined;
        }
    }
}
