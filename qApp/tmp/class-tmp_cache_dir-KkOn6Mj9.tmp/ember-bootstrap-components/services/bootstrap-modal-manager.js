define('ember-bootstrap-components/services/bootstrap-modal-manager', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Service.extend(Ember['default'].Evented, {
    allModals: Ember['default'].A(),
    modalVisible: false,
    observeModalVisibillity: Ember['default'].observer('allModals.@each.isVisible', 'allModals.[]', function() {
      this.set('modalVisible', this.get('allModals').isAny('isVisible', true));
    }),
    add: function(name, modalInstance) {
      var zindex;
      var _this = this;
      zindex = this.get('zindex');
      this.set('zindex', zindex + 2);
      modalInstance.set('zindex', zindex + 2);
      modalInstance.on('closed', function(e) {
        zindex = e.get('zindex');
        if (zindex === _this.get('zindex')) {
          _this.set('zindex', zindex - 2);
        }
        return _this.trigger('closed', e);
      });
      this.get('allModals').pushObject(modalInstance);
      return this.set(name, modalInstance);
    },
    register: function(name, modalInstance) {
      this.add(name, modalInstance);
      return modalInstance.appendTo(modalInstance.get('targetObject').namespace.rootElement);
    },
    remove: function(name) {
      var allModals = this.get('allModals');
      allModals.removeObject(this.get(name));
      return this.set(name, null);
    },
    close: function(name) {
      return this.get(name).close();
    },
    hide: function(name) {
      return this.get(name).hide();
    },
    show: function(name) {
      return this.get(name).show();
    },
    toggle: function(name) {
      return this.get(name).toggle();
    },
    confirm: function(controller, title, message, options, confirmButtonTitle, confirmButtonEvent, confirmButtonType, cancelButtonTitle, cancelButtonEvent, cancelButtonType) {
      var body, buttons;
      if (confirmButtonTitle == null) {
        confirmButtonTitle = "Confirm";
      }
      if (confirmButtonEvent == null) {
        confirmButtonEvent = "modalConfirmed";
      }
      if (confirmButtonType == null) {
        confirmButtonType = null;
      }
      if (cancelButtonTitle == null) {
        cancelButtonTitle = "Cancel";
      }
      if (cancelButtonEvent == null) {
        cancelButtonEvent = "modalCanceled";
      }
      if (cancelButtonType == null) {
        cancelButtonType = null;
      }
      body = Ember['default'].HTMLBars.compile(message || "Are you sure you would like to perform this action?");
      buttons = [
        Ember['default'].Object.create({
          defaultText: confirmButtonTitle,
          action: confirmButtonEvent,
          type: confirmButtonType,
          dismiss: 'modal'
        }), Ember['default'].Object.create({
          defaultText: cancelButtonTitle,
          action: cancelButtonEvent,
          type: cancelButtonType,
          dismiss: 'modal'
        })
      ];
      return this.open('confirm-modal', title || 'Confirmation required!', body, buttons, controller, options);
    },
    okModal: function(controller, title, message, options, okButtonTitle, okButtonEvent, okButtonType) {
      var body, buttons;
      if (okButtonTitle == null) {
        okButtonTitle = "OK";
      }
      if (okButtonEvent == null) {
        okButtonEvent = "okModal";
      }
      if (okButtonType == null) {
        okButtonType = null;
      }
      body = Ember['default'].HTMLBars.compile(message || "Are you sure you would like to perform this action?");
      buttons = [
        Ember['default'].Object.create({
          defaultText: okButtonTitle,
          action: okButtonEvent,
          type: okButtonType,
          dismiss: 'modal'
        })
      ];
      return this.open('ok-modal', title || 'Confirmation required!', body, buttons, controller, options);
    },
    openModal: function(modalView, options) {
      var instance, rootElement;
      if (options == null) {
        options = {};
      }
      rootElement = options.rootElement || '.ember-application';
      instance = modalView.create(options);
      return instance.appendTo(rootElement);
    },
    openManual: function(name, title, content, footerButtons, controller, options) {
      var view;
      view = Ember['default'].HTMLBars.compile(content || "Are you sure you would like to perform this action?");
      return this.open(name, title, view, footerButtons, controller, options);
    },
    open: function(name, title, view, footerButtons, controller, options) {
      var cl, modalComponent, rootElement, template;
      cl = void 0;
      modalComponent = void 0;
      template = void 0;
      if (options == null) {
        options = {};
      }
      if (options.fade == null) {
        options.fade = this.get("fade");
      }
      if (options.fullSizeButtons == null) {
        options.fullSizeButtons = this.get("fullSizeButtons");
      }
      if (options.targetObject == null) {
        options.targetObject = controller;
      }
      if (options.vertical == null) {
        options.vertical = this.get("vertical");
      }

      // If no controller
      var controllerMode = true;
      var container = null;
      if (Ember['default'].isNone(controller)) {
        controllerMode = false;
        container = this.get('container');
      }
      else {
        container = controller.get('container');
      }

      cl = container.lookup("component-lookup:main");
      modalComponent = cl.lookupFactory("bs-modal", container).create();

      modalComponent.setProperties({
        name: name,
        title: title,
        manual: true,
        footerButtons: footerButtons
      });
      modalComponent.setProperties(options);

      if (Ember['default'].typeOf(view) === "string") {
        template = container.lookup("template:" + view);
        Ember['default'].assert("Template " + view + " was specified for Modal but template could not be found.", template);
        if (template) {
          modalComponent.setProperties({
            body: Ember['default'].View.extend({
              template: template,
              controller: controller
            })
          });
        }
      } else if (Ember['default'].typeOf(view) === "class") {

        modalComponent.setProperties({
          compiledTemp: view.template,
          body: view,
          controller: controller
        });
      }
      else if (Ember['default'].typeOf(view) === 'object') {
        modalComponent.setProperties({
          compiledTemp: view,
          controller: controller
        });
      }

      if (controllerMode) {
        rootElement = controller.rootElement;
        if (typeof controller.rootElement === "undefined" && Ember['default'].isPresent(controller.namespace)) {
          rootElement = controller.namespace.rootElement;
        }
      }
      else {
        rootElement = "body";
      }

      return modalComponent.appendTo(rootElement);
    },
    fade: true,
    fullSizeButtons: false,
    vertical: false,
    zindex: 1000
  });

});