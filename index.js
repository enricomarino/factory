
/**
 * factory
 * JavaScript object factory
 * 
 * @copyright 2013 Enrico Marino
 * @license MIT
 */

/**
 * Expose `factory`
 */

module.exports = factory;

/**
 * factory
 * 
 * @param {Object} methods methods
 * @param {Object} statics statics
 * @param {Function} parent parent
 * @return {Function} factory
 * @api public
 */
 
function factory (methods, statics, parent) {
  var methods = methods || {};
  var statics = statics || {};
  var parent = parent || Object;
  var f = methods.init || function () {};
  
  f.prototype = Object.create(parent.prototype);
  f.prototype.constructor = f;
  
  f.prototype.extends = function (methods, statics) {
    return factory(methods, statics, f);
  };

  Object.keys(methods).forEach(function (method) {
    f.prototype[method] = methods[method];  
  });
  
  Object.keys(statics).forEach(function (method) {
    f[method] = statics[method];  
  });

  return init;
}
