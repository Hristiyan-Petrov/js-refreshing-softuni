export default class Home extends HTMLElement {
    
    // Lifecycle hook - trigger when attached to DOM 
    connectedCallback() {
        this.innerHTML = 'In home component';
    }
}