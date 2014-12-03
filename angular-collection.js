/**
 * Angular Collection - The Collection module for AngularJS
 * @version v0.5.1 - 2014-12-03
 * @author Tomasz Kuklis
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(window, angular, undefined) {
'use strict';

angular.module('ngCollection', []).
  factory('$collection', ['$filter','$parse', function($filter,$parse) {

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16).substring(1);
    }

    function guid() {
      return s4() + s4() + '-' + s4() + '-' + s4() +
        '-' +s4() + '-' + s4() + s4() + s4();
    }

    function checkValue(item, compareFn){
      return compareFn(item);
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
        var id, sort, existing, index;
        sort = options.sort !== false;

        if (options.index !== void 0) {
          index = options.index;
        } else {
          index = this.array.length;
        }

        if (!obj[this.idAttribute]) {
          obj[this.idAttribute] = guid();
        }

        if (existing = this.get(obj)) {
          angular.extend(existing, obj);
        } else {
          id = obj[this.idAttribute];

          this.hash[id] = obj;
          this.array.splice(index, 0, obj);
          this.length += 1;
        }

        if (sort) this.sort();

        return this;
      },

      addAll: function(objArr, options) {
        options || (options = {});
        var sort = options.sort !== false;

        for (var i = 0; i < objArr.length; i++) {
          var obj = objArr[i];
          this.add(obj, angular.extend(options, { sort: false }));
        }

        if (sort) this.sort();

        return this;
      },

      sort: function(comparator) {
        var comparator = comparator || this.comparator;

        if (comparator) {
          this.array = $filter('orderBy')(this.array, comparator);
        }

        return this;
      },

      get: function(obj) {
        if (obj == null) return void 0;
        return this.hash[obj[this.idAttribute] || obj];
      },

      find: function(expr, value, deepCompare){
        var compareFn = expr;
        if (typeof expr === 'string'){
          var parse = $parse(expr);
          compareFn = function(item){
            if (deepCompare){
              return parse(item) == value;
            }
            else{
              return parse(item) === value;
            }
          }
          compareFn.prototype.value = value;
          compareFn.prototype.deepCompare = deepCompare;
        }
        //loop over all the items in the array
        for (var i = 0; i < this.array.length; i++){
          if(checkValue(this.array[i], compareFn)){
            return this.array[i];
          }

        }
        //if nothing matches return void
        return void 0;
      },

      where: function(expr, value, deepCompare){

        var results = [];

        var compareFn = expr;
        if (typeof expr === 'string'){
          var parse = $parse(expr);
            compareFn = function(item){
              if (deepCompare){
                return parse(item) == value;
              }
              else{
                return parse(item) === value;
              }
            }
            compareFn.prototype.value = value;
            compareFn.prototype.deepCompare = deepCompare;
        }

        //loop over all the items in the array
        for (var i = 0; i < this.array.length; i++){
          if(checkValue(this.array[i], compareFn)){
            results.push(this.array[i]);
          }
        }
        //if nothing matches return void
        return results;
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
        index = this.array.indexOf(obj)
        if (index === -1) {
          return this
        }
        delete this.hash[obj[this.idAttribute]];
        this.array.splice(index, 1);
        this.length--;
        return this;
      },

      removeAll: function() {
        for (var i = this.array.length - 1; i >= 0; i--) {
          this.remove(this.at(i));
        }

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
    };

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
      child.getInstance = Collection.getInstance;
      child._super = parent.prototype;

      return child;
    };

    Collection.getInstance = function(options) {
      return new this(options);
    };

    return Collection;
  }]);
})(window, window.angular);
