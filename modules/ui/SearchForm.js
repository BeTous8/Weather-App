// Constructor - Get the form element
export class SearchForm {
    constructor(formId) {
        this.form = document.querySelector(formId);
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();

        const input = this.form.querySelector('#loc').value.trim();

        const searchEvent = new CustomEvent('citySearch', {
            detail: {cityName: input}
        });
        
        this.form.dispatchEvent(searchEvent);

        this.form.querySelector('#loc').value = '';
    }

}
