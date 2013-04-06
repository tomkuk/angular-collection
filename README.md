## AngularCollection

[![Build Status](https://travis-ci.org/tomkuk/angular-collection.png?branch=master)](https://travis-ci.org/tomkuk/angular-collection)

![angular-collection.js](http://i46.tinypic.com/726m80.jpg)

## Description

AngularCollection is a collection module for AngularJS.

## Instalation

angular-collection is a [bower](https://github.com/twitter/bower) [component](http://sindresorhus.com/bower-components/) you should be able to install it by running:

`bower install angular-collection`

or if you already have a bower based project you can add angular-collection to your dependency list in `component.json`

```js
 "dependencies": {
    ...
    "angular-collection": "0.x.x"
    ...
  }
```

## API

+ add(obj, options)

+ get(obj | id)

+ update(obj)

+ remove(obj)

+ last()

+ at(index)

+ size()

##Usage

####Specify dependencies

```js
var app = angular.module('myApp', ['ngCollection']);
```

####Define new factory

```js
app.factory("TodoCollection", function($collection){
	var TodoCollection = $collection();

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

## Options

You can pass a single parameter to `getInstance` to specify additional options.

```js
var todos = TodoCollection.getInstance(options);
```
Currently the only options available are `idAttribute` and `comparator`.

```js
var todos = TodoCollection.getInstance({idAttribute: 'id', comparator: '-created_at'});
```

##License:
<pre>
The MIT License
</pre>
