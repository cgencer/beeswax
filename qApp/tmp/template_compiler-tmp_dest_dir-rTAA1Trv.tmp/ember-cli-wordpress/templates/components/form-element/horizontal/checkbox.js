export default Ember.HTMLBars.template((function() {
  return {
    isHTMLBars: true,
    blockParams: 0,
    cachedFragment: null,
    hasRendered: false,
    build: function build(dom) {
      var el0 = dom.createElement("div");
      var el1 = dom.createTextNode("\n    ");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","checkbox");
      var el2 = dom.createTextNode("\n        ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("label");
      var el3 = dom.createTextNode("\n            ");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode(" ");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n        ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n    ");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    render: function render(context, env, contextualElement) {
      var dom = env.dom;
      var hooks = env.hooks, get = hooks.get, concat = hooks.concat, attribute = hooks.attribute, inline = hooks.inline, content = hooks.content;
      dom.detectNamespace(contextualElement);
      var fragment;
      if (env.useFragmentCache && dom.canClone) {
        if (this.cachedFragment === null) {
          fragment = this.build(dom);
          if (this.hasRendered) {
            this.cachedFragment = fragment;
          } else {
            this.hasRendered = true;
          }
        }
        if (this.cachedFragment) {
          fragment = dom.cloneNode(this.cachedFragment, true);
        }
      } else {
        fragment = this.build(dom);
      }
      var element0 = fragment;
      var element1 = dom.childAt(element0, [1, 1]);
      var attrMorph0 = dom.createAttrMorph(element0, 'class');
      var morph0 = dom.createMorphAt(element1,0,1);
      var morph1 = dom.createMorphAt(element1,1,2);
      var morph2 = dom.createMorphAt(element0,2,3);
      attribute(env, attrMorph0, element0, "class", concat(env, [get(env, context, "horizontalInputGridClass"), " ", get(env, context, "horizontalInputOffsetGridClass")]));
      inline(env, morph0, context, "input", [], {"name": get(env, context, "name"), "type": "checkbox", "checked": get(env, context, "value")});
      content(env, morph1, context, "label");
      inline(env, morph2, context, "partial", ["components/form-element/errors"], {});
      return fragment;
    }
  };
}()));