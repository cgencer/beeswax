import Ember from 'ember';
import _ from 'lodash/lodash';
//import DS from 'ember-data';

export default Ember.Mixin.create({
    isNewSerializerAPI: true,

    /**
     * [normalizeResponse description]
     * @param  {[type]} store             [description]
     * @param  {[type]} primaryModelClass [description]
     * @param  {[type]} payload           [description]
     * @param  {[type]} id                [description]
     * @param  {[type]} requestType       [description]
     * @return {[type]}                   [description]
     */
    normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {

        // The "payload" object is exactly like the one returned from
        // your API, nothing changed yet - do whatever you want to do.
        // In the below example I am deleting the "request_id" not to
        // pass this down to my serializers and generating errors
//        delete payload.request_id;

        // The below calls the "super", which will run the internal conversion
        // from the old format to the new JSONApi 2.0 standard. It will also
        // run all your transforms and other hooks that you have
        // Return the prepared object with relational data
        return this._super(store, primaryModelClass, payload, id, requestType);
    }
});