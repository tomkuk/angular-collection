/**
 * Angular Collection - The Collection module for AngularJS
 * @version v0.1.1 - 2013-03-30
 * @author Tomasz Kuklis
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('ngCollection', []).
  factory('$collection', ['$filter', function($filter) {

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16).substring(1);
    }

    function guid() {
      return s4() + s4() + '-' + s4() + '-' + s4() +
        '-' +s4() + '-' + s4() + s4() + s4();
    }

    function Collection(options) {
      options || (options = {});
      if (options.comparator !== void 0) this.comparator = options.comparator;
      this.idAttribute = options.idAttribute || this.idAttribute;
      this.current = null;
      this._reset();
      this.initialize.apply(this, arguments);
    }

    Collection.prototype = {

      idAttribute: 'id',

      initialize: function() { },

      add: function(obj, options) {
        options || (options = {});
        var id, sort, sortAttr, doSort, existing;
        sort = this.comparator && options.sort !== false;
        sortAttr = angular.isString(this.comparator) ? this.comparator : null;
        if (sort && !doSort) doSort = true;

        if (!obj[this.idAttribute]) {
          obj[this.idAttribute] = guid();
        }

        if (existing = this.get(obj)) {
          angular.extend(existing, obj);
        } else {
          id = obj[this.idAttribute];

          this.hash[id] = obj;
          this.array.push(obj);
          this.length += 1;
        }

        if (doSort) this.sort();

        return this;
      },

      sort: function() {
        if (angular.isString(this.comparator)) {
          this.array = $filter('orderBy')(this.array, this.comparator);
        }

        return this;
      },

      get: function(obj) {
        if (obj == null) return void 0;
        this._idAttr || (this._idAttr = this.idAttribute);
        return this.hash[obj.id || obj[this._idAttr] || obj];
      },

      update: function(obj) {
        var existing;
        existing = this.get(obj);
        if (existing) angular.extend(existing, obj);
        if (!existing) this.add(obj);
        return this;
      },

      remove: function(obj) {
        var index;
        delete this.hash[obj.id];
        index = this.array.indexOf(obj);
        this.array.splice(index, 1);
        this.length--;
        return this;
      },

      last: function() {
        return this.array[this.length-1];
      },

      at: function(index) {
        return this.array[index];
      },

      size: function() {
        return this.array.length;
      },

      all: function() {
        return this.array;
      },

      _reset: function() {
        this.length = 0;
        this.hash  = {};
        this.array = [];
      }
    }

    Collection.extend = function(protoProps) {
      var parent = this;
      var child;
      if (protoProps && protoProps.hasOwnProperty('constructor')) {
        child = protoProps.constructor;
      } else {
        child = function(){ return parent.apply(this, arguments); };
      }
      var Surrogate = function(){ this.constructor = child; };
      Surrogate.prototype = parent.prototype;
      child.prototype = new Surrogate;

      if (protoProps) angular.extend(child.prototype, protoProps);

      child.extend = parent.extend;

      child.getInstance = function(options) {
          return new child(options);
      };

      child._super = parent.prototype;

      return child;
    }

    Collection.getInstance = function(options) {
      return new Collection(options);
    }

    return Collection;
  }]);