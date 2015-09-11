import Ember from 'ember';

console.log('oneliner component loaded.');
export default Ember.Component.extend({
    selectedFilter: null,
    selectedFilterValue: null,
    currentValues: null,
    queryRules: [
        {
            id: 'post_type',
            className: 'choices',
            values: ['post', 'page', 'any'],
            required: true,
            name: "Content Type",
            related: null,
            order: 0
        },
        {
        	id: 'post_status',
            className: 'choices',
            values: ['publish', 'pending', 'private', 'future', 'trash', 'any'],
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
            values: ['none', 'ID', 'author', 'title', 'name', 'type', 'date', 'modified', 'parent', 'rand', 'comment_count', 'menu_order', 'meta_value', 'meta_value_num', 'post__in'],
            required: false,
            name: "order by",
            related: null
        },
        {
        	id: 'order',
            className: 'choices',
            values: ['ASC', 'DESC'],
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
            values: ['true', 'false'],
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
    selectedFilterChanged: function() {
    	var proxy = this.get('selectedFilter.values');
    	this.set('currentValues', proxy);
    	console.log(this.get('queryRules'));
    }.observes('selectedFilter')
});
