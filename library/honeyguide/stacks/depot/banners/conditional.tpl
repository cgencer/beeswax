{{!isa:CONDITIONAL}}
{{#items}}
	{{#isFull}}
		{{> item-l}}
	{{/isFull}}
	{{#isHalf}}
		{{> item-rh}}
	{{/isHalf}}
{{/items}}
