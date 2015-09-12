import Ember from 'ember';

export default Ember.Component.extend({
    selectedFilter: null,
    selectedCompare: null,
    selectedValue: null,
    currentValues: null,
    queryRules: [
        {
            id: 'post_type',
            className: 'choices',
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
            values: [],
            inputValues: "[0-9]*",
            required: false,
            name: "ID",
            related: null,
            order: 2
        },
        {
        	id: 'posts_per_page',
            className: 'regexp',
            values: [],
            inputValues: "[0-9]*",
            required: false,
            name: "Pagination count",
            related: null
        },
        {
        	id: 'post_parent',
            className: 'regexp',
            values: [],
            inputValues: "[0-9]*",
            required: false,
            name: "Parent ID",
            related: null
        },
        {
        	id: 'orderby',
            className: 'choices',
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
            values: [{name: 'ASC'}, {name: 'DESC'}],
            required: false,
            name: "order",
            related: "orderby"
        },
        {
        	id: 'offset',
            className: 'regexp',
            values: [],
            inputValues: "[0-9]*",
            required: false,
            name: "offset",
            related: "posts_per_page"
        },
        {
        	id: 'paged',
            className: 'regexp',
            values: [],
            inputValues: "[0-9]*",
            required: false,
            name: "paged",
            related: "posts_per_page"
        },
        {
        	id: 'page',
            className: 'regexp',
            values: [],
            inputValues: "[0-9]*",
            required: false,
            name: "page",
            related: "posts_per_page"
        },
        {
        	id: 'ignore_sticky_posts',
            className: 'choices',
            values: [{name: 'true'}, {name: 'false'}],
            required: false,
            name: "Ignore sticky posts",
            related: null
        },
        {
        	id: 'year',
            className: 'regexp',
            values: [],
            inputValues: "[0-9]{4}",
            required: false,
            name: "Date: year",
  
            related: null
        },
        {
        	id: 'monthnum',
            className: 'choices',
            values: [],
            inputValues: "[1,2,3,4,5,6,7,8,9,10,11,12]+",
            required: false,
            name: "Date: month",
            related: "year"
        },
        {
        	id: 'w',
            className: 'regexp',
            values: [],
            inputValues: "[0-9]{2}",
            required: false,
            name: "Date: week",
            related: null
        },
        {
        	id: 'day',
            className: 'regexp',
            values: [],
            inputValues: "[0-9]{2}",
            required: false,
            name: "Date: day",
            related: "year"
        }
    ],

    actions: {
    	selectedAnItem: function(info, id) {
    		if(undefined==info.id){info.id=info.name;}
    		console.log('@oneliner:'+info.id);
    		if(undefined != info.values){
    			if(0==info.values.length){
    			// replace secondary dropdown with input fiels
	    		}else{
			    	this.set('selected'+id, info);
			    	this.set('currentValues', info.values);
    			}	
    		}
		},
    }
});
