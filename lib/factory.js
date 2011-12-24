
/*!
 * factory
 * JavaScript object factory
 * Copyright (c) 2011 Enrico Marino <enrico.marino@email.com>
 * MIT License
 */

 !(function (exports) {

  if (!Object.create) {
    Object.create = function (o) {
      function F () {}
      F.prototype = o;
      return new F();
    };
  }

  function factory (methods, statics, parent) {
    methods = methods || {};
    statics = statics || {};
    parent = parent || Object;

    function instance (props) {
      for (var prop in props) {
        this.prototype[prop] = props[prop];
      }
      return this;
    }

    function constructor (props) {
      for (var prop in props) {
        this[prop] = props[prop];
      }
      return this;
    }

    function extend (methods, statics) {
      return klass(methods, statics, this);
    }

    function inherits (parent) {
      this.parent = parent;
      this.prototype = Object.create(parent.prototype, {
        constructor: {
            value: this
          , enumerable: false
          , writable: true
          , configurable: true
        }
      });
    }

    var init = methods.init || function () {};

    init.implement = implement;
    init.instance = instance;
    init.constructor = constructor;

    inherits.call(init, parent);
    instance.call(init, methods);
    constructor.call(init, statics);

    return init;
  };

  exports.factory = factory;

  /**
   * Library version.
   */

  factory.version = '0.1.0';

 }(this));