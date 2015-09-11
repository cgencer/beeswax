import Ember from 'ember';
console.log('oneliner loaded.');

export default Ember.Route.extend({
  model: function() {
    console.log('one-liner');
    console.log(queryRules);
    console.log(this.queryRules);

    var set = {};
    for(var key in queryRules) {
      set.push( App.QueryRule.create(queryRules[key]) );
    };

    set = [
        {
            name: 'United States',
            cities: ['Chicago', 'Miami']
        },
        {
            name: 'Brazil',
            cities: ['Sao Paulo', 'Rio de Janeiro']
        }
    ];
    return set;
  }
});
