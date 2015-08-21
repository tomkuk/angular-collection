## AngularCollection

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/tomkuk/angular-collection)
[![npm version](https://img.shields.io/npm/v/angular-collection.svg?style=flat-square)](https://www.npmjs.com/package/angular-collection)
[![Bower version](https://badge.fury.io/bo/angular-collection.svg)](http://badge.fury.io/bo/angular-collection)
[![npm downloads](https://img.shields.io/npm/dm/angular-collection.svg?style=flat-square)](https://www.npmjs.com/package/angular-collection)
[![License](https://img.shields.io/github/license/blackxored/whos_dated_who.svg)](http://www.opensource.org/licenses/MIT)

[![Build Status](https://travis-ci.org/tomkuk/angular-collection.png?branch=master)](https://travis-ci.org/tomkuk/angular-collection)
[![Code Climate](https://img.shields.io/codeclimate/github/tomkuk/angular-collection.svg?style=flat-square)](https://codeclimate.com/github/tomkuk/angular-collection)
[![Test Coverage](https://codeclimate.com/github/tomkuk/angular-collection/badges/coverage.svg)](https://codeclimate.com/github/tomkuk/angular-collection/coverage)
[![Dependency Status](https://img.shields.io/david/tomkuk/angular-collection.svg?style=flat-square)](https://david-dm.org/tomkuk/angular-collection)
[![devDependency Status](https://img.shields.io/david/dev/tomkuk/angular-collection.svg?style=flat-square)](https://david-dm.org/tomkuk/angular-collection#info=devDependencies)


![angular-collection.js](http://i46.tinypic.com/726m80.jpg)

## Description

AngularCollection is a collection module for AngularJS.

## Installation

angular-collection is a [bower](https://github.com/twitter/bower) [component](http://sindresorhus.com/bower-components/) you should be able to install it by running:

`bower install angular-collection`

or if you already have a bower based project you can add angular-collection to your dependency list in `bower.json`

```js
 "dependencies": {
    ...
    "angular-collection": "0.x.x"
    ...
  }
```

## API

+ add(obj, options)

+ addAll(array, options)

+ sort()

+ get(obj | id)

+ update(obj)

+ remove(obj)

+ removeAll()

+ last()

+ at(index)

+ size()

+ all()

##Usage

####Specify dependencies

```js
var app = angular.module('myApp', ['ngCollection']);
```

####Define new factory

```js
app.factory("TodoCollection", function($collection){
	var TodoCollection = $collection;

	return TodoCollection;
})
```

####Get collection instance

```js
var todos = TodoCollection.getInstance();
```

####Add new records

`_id` property will be generated and attached to each new record.

```js
todos.add({ title: "todo1" });
todos.add({ title: "todo2" });
todos.add({ title: "todo0" }, {index: 0});
```

###Get a single record

Get a record from the collection, specified by an id or by passing in a record.

```js
	var todo = todos.get(10);
```

####Update a single record

If a record is already in the collection, its attributes will be merged.

```js
	todos.update({ id: 1, title: 'todos3' });
```

####Remove a record from the collection

```js
	todos.remove({ id: 1, title: 'todos3' });
```

####Get a single record, spcified by index

```js
	todos.at(1);
```

####Sort records as they are added to collection

Sort the collection by title descending each time you call add()

```js
	var todos = $collection.getInstance({comparator: "-title"});
	todos.add({ title: "todo1" });		// performs sort
	todos.add({ title: "todo2" });		// performs sort
```

####Sort records on demand

Sorts the collection by title descending but only when sort() is called

```js
	var todos = $collection.getInstance();
	todos.add({ title: "todo1" });
	todos.add({ title: "todo2" });
	todos.sort('-title');			// performs sort
```

## Options

You can pass a single parameter to `getInstance` to specify additional options.

```js
var todos = TodoCollection.getInstance(options);
```
Currently the only options available are `idAttribute` and `comparator`.

```js
var todos = TodoCollection.getInstance({idAttribute: 'id', comparator: '-created_at'});
```

##Contributors:

* [@tomkuk](http://github.com/tomkuk)
* [@mkuklis](http://github.com/mkuklis)
* [@falsetto](http://github.com/falsetto)
* [@jseppi](https://github.com/jseppi)
* [@PascalPrecht](https://github.com/PascalPrecht)
* [@warnerandy](https://github.com/warnerandy)
* [@ajoslin](https://github.com/ajoslin)
* [@damrbaby](https://github.com/damrbaby)
* [@failpunk](https://github.com/failpunk)


##License:
<pre>
The MIT License
</pre>
