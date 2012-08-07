var _, _nest, _kv;
_ = require('underscore');
_nest = require('underscore.nested');
/**
 * @namespace Functions for key-value pairs serialization (aka, www-form-encoding) of objects
 */
_kv = {
  /**
   * Transforms an object to a string of URL-encoded KV-pairs (aka "www-form-encoding").
   * 
   * Note:
   * - All values end up as a string, implying all type information is lost.
   * - Both keys and values are URL-encoded once.
   * 
   * @param {Object} object The object to be serialized.
   * @param {String} [item_delim='&'] String delimiting each pair.
   * @param {String} [kv_delim='='] String delimiting key from value.
   * @returns {String} Serialized and encoded KV-pairs.
   */
  toKV: function(object, item_delim, kv_delim){
    item_delim == null && (item_delim = '&');
    kv_delim == null && (kv_delim = '=');
    return _.reduce(object, function(acc, v, k){
      if (k) {
        acc.push(encodeURIComponent(k) + kv_delim + encodeURIComponent(v));
      }
      return acc;
    }, []).join(item_delim);
  }
  /**
   * Restores an object from a string of URL-encoded KV-pairs (aka "www-form-encoding").
   * 
   * Note:
   * - All resulting values will be strings as all type information is lost.
   * - Both keys and values will be URL-decoded once.
   * 
   * @param {String} string String of serialized KV-pairs.
   * @param {String} [item_delim='&'] String delimiting each pair.
   * @param {String} [kv_delim='='] String delimiting key from value.
   * @returns {Object} Deserialized object containing the KV-pairs.
   */,
  fromKV: function(string, item_delim, kv_delim){
    item_delim == null && (item_delim = '&');
    kv_delim == null && (kv_delim = '=');
    return _.reduce(string.split(item_delim), function(acc, pair){
      var idx, k, v, __ref;
      idx = pair.indexOf(kv_delim);
      if (idx !== -1) {
        __ref = [pair.slice(0, idx), pair.slice(idx + 1)], k = __ref[0], v = __ref[1];
      } else {
        __ref = [pair, ''], k = __ref[0], v = __ref[1];
      }
      if (k) {
        acc[decodeURIComponent(k)] = decodeURIComponent(v);
      }
      return acc;
    }, {});
  }
  /**
   * Copies and flattens a tree of sub-objects into namespaced keys on the target object, such
   * that `{ "foo":{ "bar":1 } }` becomes `{ "foo.bar":1 }`.
   * 
   * @param {Object} source Object to collapse.
   * @param {Object} [target={}] Target of the collapsed keys.
   * @param {String} [prefix=''] Prefix applied to copied keys.
   * @returns {Object} The collapsed object.
   */,
  collapseObject: function(source, target, prefix){
    target == null && (target = {});
    prefix == null && (prefix = '');
    if (prefix) {
      prefix += '.';
    }
    _.each(source, function(v, k){
      if (_nest.isPlainObject(v)) {
        return _kv.collapseObject(v, parent, prefix + k);
      } else {
        return parent[prefix + k] = v;
      }
    });
    return parent;
  }
  /**
   * Inverse of `_.collapseObject()` -- copies all keys onto the target object, expanding any
   * dot-namespaced keys found, such that `{ "foo.bar":1 }` becomes `{ "foo":{ "bar":1 }}`.
   * 
   * @param {Object} source Collapsed source object.
   * @param {Object} [target={}] Target of the uncollapsed keys.
   * @returns {Object} The uncollapsed object -- either `target` or a new object.
   */,
  uncollapseObject: function(source, target){
    target == null && (target = {});
    return _.reduce(source, function(acc, v, k){
      _nest.setNested(acc, k, v, {
        ensure: true
      });
      return acc;
    }, target);
  }
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = _kv;
} else if (typeof exports != 'undefined' && exports !== null) {
  __import(exports, _kv);
} else if (typeof window != 'undefined' && window !== null) {
  window.UnderscoreKV = _kv;
}
function __import(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
