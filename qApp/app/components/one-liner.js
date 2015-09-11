import Ember from 'ember';

console.log('oneliner component loaded.');
export default Ember.Component.extend({
    selectedCountry: null,
    currentCities: null,
    countries: [
        {
            name: 'United States',
            cities: ['Chicago', 'Miami']
        },
        {
            name: 'Brazil',
            cities: ['Sao Paulo', 'Rio de Janeiro']
        }
    ],
    selectedCountryChanged: function() {
    	this.set('currentCities', this.get('selectedCountry.cities'));
    }.observes('selectedCountry')
});
