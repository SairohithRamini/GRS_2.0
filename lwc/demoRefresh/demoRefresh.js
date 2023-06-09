import { LightningElement } from 'lwc';
import { registerRefreshContainer, unregisterRefreshContainer } from 'lightning/refresh';

export default class RefreshDemo extends LightningElement {
  connectedCallback() {
    // Register the component as a refresh container
    registerRefreshContainer(this);
  }

  disconnectedCallback() {
    // Unregister the component as a refresh container
    unregisterRefreshContainer(this);
  }

  handleRefresh() {
    // Perform any necessary refresh operations
    console.log('Refreshing data...');
  }
}