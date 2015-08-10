/*global Ember, Todos */
module.exports = (function($, _, s, honeyPot) {
    'use strict';

    var App = exports.honeyPot.App;
    App.Router.map(function() {
        this.resource('query', {
            path: '/'
        })
    });

    /*
        DS.RESTAdapter.registerTransform('array', {
            serialize: function(value) {
                if (Em.typeOf(value) === 'array') {
                    return value;
                } else {
                    return [];
                }
            },
            deserialize: function(value) {
                return value;
            }
        });

        App.Filter = DS.Model.extend({
            type: DS.attr('string', {
                key: 'type'
            }),
            values: DS.attr('string', {
                key: 'values'
            }),
            required: DS.attr('boolean', {
                key: 'required'
            }),
            label: DS.attr('string', {
                key: 'label'
            }),
            related: DS.attr('string', {
                key: 'related'
            })
        });

        App.Filters = DS.Model.extend({
            filters: DS.hasMany(filter, {
                embedded: true
            })
        });

        App.FilterAdapter = DS.FixtureAdapter.extend();
    */
})(jQuery, _, s, honeyPot)