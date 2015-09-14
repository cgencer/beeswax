import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend(Ember.Evented, {
    selectedFilter: null,
    selectedCompare: null,
    selectedValue: null,
    currentValues: null,
    selFil: false,
    queryRules: [
        {
            id: 'post_type',
            className: 'choices',
            type: 'array',
            values: [
            	{name: "post"}, {name: "page"}, {name: "page"}
			],
            required: true,
            name: "Content Type",
            related: null,
            order: 0
        },
        {
        	id: 'post_status',
            className: 'choices',
            type: 'array',
            values: [
            	{name: 'publish'}, {name: 'pending'}, {name: 'private'}, {name: 'future'}, {name: 'trash'}, {name: 'any'}
            ],
            required: false,
            name: "Status",
            related: null,
            order: 1
        },
        {
        	id: 'page_id',
            className: 'regexp',
            type: 'regexp',
            values: null,
            inputValues: "[0-9]*",
            required: false,
            name: "ID",
            related: null,
            order: 2
        },
        {
        	id: 'posts_per_page',
            className: 'regexp',
            type: 'regexp',
            values: null,
            inputValues: "[0-9]*",
            required: false,
            name: "Pagination count",
            related: null
        },
        {
        	id: 'post_parent',
            className: 'regexp',
            type: 'regexp',
            values: null,
            inputValues: "[0-9]*",
            required: false,
            name: "Parent ID",
            related: null
        },
        {
        	id: 'orderby',
            className: 'choices',
            type: 'array',
            values: [
            	{name: 'none'}, {name: 'ID'}, {name: 'author'}, {name: 'title'}, {name: 'name'}, {name: 'type'}, {name: 'date'}, {name: 'modified'}, {name: 'parent'}, {name: 'rand'}, {name: 'comment_count'}, {name: 'menu_order'}, {name: 'meta_value'}, {name: 'meta_value_num'}, {name: 'post__in'}
            ],
            required: false,
            name: "order by",
            related: null
        },
        {
        	id: 'order',
            className: 'choices',
            type: 'array',
            values: [{name: 'ASC'}, {name: 'DESC'}],
            required: false,
            name: "order",
            related: "orderby"
        },
        {
        	id: 'offset',
            className: 'regexp',
            type: 'regexp',
            values: null,
            inputValues: "[0-9]*",
            required: false,
            name: "offset",
            related: "posts_per_page"
        },
        {
        	id: 'paged',
            className: 'regexp',
            type: 'regexp',
            values: null,
            inputValues: "[0-9]*",
            required: false,
            name: "paged",
            related: "posts_per_page"
        },
        {
        	id: 'page',
            className: 'regexp',
            type: 'regexp',
            values: null,
            inputValues: "[0-9]*",
            required: false,
            name: "page",
            related: "posts_per_page"
        },
        {
        	id: 'ignore_sticky_posts',
            className: 'choices',
            type: 'array',
            values: [{name: 'true'}, {name: 'false'}],
            required: false,
            name: "Ignore sticky posts",
            related: null
        },
        {
        	id: 'year',
            className: 'regexp',
            type: 'regexp',
            values: null,
            inputValues: "[0-9]{4}",
            required: false,
            name: "Date: year",
  
            related: null
        },
        {
        	id: 'monthnum',
            className: 'regexp',
            type: 'regexp',
            values: null,
            inputValues: "[1,2,3,4,5,6,7,8,9,10,11,12]+",
            required: false,
            name: "Date: month",
            related: "year"
        },
        {
        	id: 'w',
            className: 'regexp',
            type: 'regexp',
            values: null,
            inputValues: "[0-9]{2}",
            required: false,
            name: "Date: week",
            related: null
        },
        {
        	id: 'day',
            className: 'regexp',
            type: 'regexp',
            values: null,
            inputValues: "[0-9]{2}",
            required: false,
            name: "Date: day",
            related: "year"
        }
    ],
    comparison: [
    	{
    		name: '<',
    	},
    	{
    		name: '=',
    	},
    	{
    		name: '>',
    	}
    ],

//	didInsertElement: function() {
//		this.globalEvents.on('oneliner:bar', this, 'bar');
//	},
	bar: function(data) {
		console.log('oneliner answering... ');
    		if('Filter' === data.id) {
    			console.log('it was the first menu');
   			}else if('Value' === data.id) {
    			console.log('it was the second menu');    				
   			}		
	},
    actions: {
    	selectedAnItem: function(info, dropdownId) {
    		info.id = _.isUndefined(info.id) ? info.name : info.id;
/*
    		if('Filter'===id) {
				if(!_.isUndefined(selectedValue){
					// now call refresh restapi
				}
   			}else if('Value'===id) {	
				if(!_.isUndefined(selectedFilter){
					// now call refresh restapi
				}				
   			}
*/

			if('array' === info.type && 'Filter' === dropdownId) {
				if(!_.isUndefined(info.values) && 0 < info.values.length) {
					this.set('currentValues', info.values);
				}
			}else if('regexp' === info.type){
				// change the 3rt dropdown into an input box
//				console.log($(this.get('element')));
			}    	

    		this.set('selected'+dropdownId, info);

		},
    }
});
