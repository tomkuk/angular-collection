/* global beforeEach, it, describe, chai, inject */
'use strict'

var expect = chai.expect

describe('collection', function () {
  var $collection, Todos, otherTodos, a, b, c, d, e

  beforeEach(module('ngCollection'))
  beforeEach(inject(function ($injector) {
    $collection = $injector.get('$collection')
    a = {id: 1, label: 'a'}
    b = {id: 2, label: 'b'}
    c = {id: 3, label: 'c'}
    d = {id: 4, label: 'd', item: {id: 2}}
    e = {id: 5, label: 'e', item: {id: 2}}
    Todos = $collection.getInstance()
    otherTodos = $collection.getInstance()
    otherTodos.add(a)
    otherTodos.add(b)
  }))

  it('should build collection', function () {
    expect(Todos).to.be.a('object')
    expect(Todos.array).to.be
    expect(Todos.array).to.be.a('array')
    expect(Todos.array).to.be.empty
    expect(Todos.hash).to.be
    expect(Todos.hash).to.be.a('object')
    expect(Todos.array).to.be.empty
  })

  describe('#add', function () {
    it('should add record', function () {
      Todos.add(a)
      Todos.add(b)

      expect(Todos.length).to.equal(2)

      expect(Todos.array[0])
        .to.equal(a)
        .to.have.property('label')
        .and.to.equal('a')
      expect(Todos.hash[2]).to.equal(b)
    })

    it('should add record without id', function () {
      Todos.add({label: 'aa'})

      expect(Todos.length).to.equal(1)

      expect(Todos.array[0])
        .to.have.property('id')
      expect(Todos.array[0])
        .and.to.have.property('label')
        .and.to.equal('aa')
    })

    it('should add update existed record', function () {
      Todos.add(a)
      Todos.add({id: 1, label: 'aa'})

      expect(Todos.length).to.equal(1)

      expect(Todos.array[0])
        .to.have.property('label')
        .and.to.equal('aa')
      expect(Todos.hash[1])
        .to.have.property('label')
        .and.to.equal('aa')
    })

    it('should add record at specified index', function () {
      Todos.add(a)
      Todos.add(b)
      Todos.add(c, {index: 0})

      expect(Todos.length).to.equal(3)
      expect(Todos.array[0])
        .to.equal(c)
        .to.have.property('label')
        .and.to.equal('c')
      expect(Todos.hash[3]).to.equal(c)

      Todos.add(d, {index: 1})

      expect(Todos.length).to.equal(4)
      expect(Todos.array[1])
        .to.equal(d)
        .to.have.property('label')
        .and.to.equal('d')
      expect(Todos.hash[4]).to.equal(d)
    })
  })

  describe('#addAll', function () {
    it('should add multiple records', function () {
      Todos.addAll([a, b, c, d])

      expect(Todos.length).to.equal(4)

      expect(Todos.array[0])
        .to.equal(a)
        .to.have.property('label')
        .and.to.equal('a')
      expect(Todos.hash[2]).to.equal(b)

      expect(Todos.array[1])
        .to.equal(b)
        .to.have.property('label')
        .and.to.equal('b')
      expect(Todos.array[2])
        .to.equal(c)
        .to.have.property('label')
        .and.to.equal('c')
      expect(Todos.array[3])
        .to.equal(d)
        .to.have.property('label')
        .and.to.equal('d')
    })

    it('should add multiple records without ids', function () {
      Todos.addAll([{label: 'aa'}, {label: 'bb'}])

      expect(Todos.length).to.equal(2)

      expect(Todos.array[0])
        .to.have.property('id')
      expect(Todos.array[0])
        .and.to.have.property('label')
        .and.to.equal('aa')

      expect(Todos.array[1])
        .to.have.property('id')
      expect(Todos.array[1])
        .and.to.have.property('label')
        .and.to.equal('bb')
    })
  })

  describe('#get', function () {
    it('should return record by id', function () {
      var todo = otherTodos.get(a.id)

      expect(todo)
        .to.have.property('label')
        .and.to.equal('a')
    })

    it('should return record by given object', function () {
      var todo = otherTodos.get(b)

      expect(todo)
        .to.have.property('label')
        .and.to.equal('b')
    })

    it('should return void 0 for null', function () {
      var todo = otherTodos.get()

      expect(todo).to.equal(void 0)
    })
  })

  describe('#find', function () {
    it('should return record by the given string structure', function () {
      Todos.add(a)
      Todos.add(b)
      Todos.add(c)
      Todos.add(d)

      var todo = Todos.find('id', 1)
      var todoSub = Todos.find('item.id', 2)

      expect(todo)
        .to.have.property('label')
        .and.to.equal('a')
      expect(todoSub)
        .to.have.property('label')
        .and.to.equal('d')
    })

    it('should return void 0 for no match', function () {
      var todo = otherTodos.find('a.b.c.d', 1234)

      expect(todo).to.equal(void 0)
    })

    it('should use have an options third option', function () {

      var todo = otherTodos.find('id', '1', true)
      var none = otherTodos.find('id', '1')

      expect(todo).to.have.property('label')
        .and.to.equal('a')

      expect(none).to.equal(void 0)

    })

    it('should use a compare function', function () {
      var todos = otherTodos.find(function (obj) {
        return obj.id === 1
      })

      expect(todos).to.have.property('label')
        .and.to.equal('a')

    })
  })

  describe('#where', function () {
    it('should return all records by the given string structure', function () {
      Todos.add(a)
      Todos.add(b)
      Todos.add(c)
      Todos.add(d)
      Todos.add(e)

      var todoSub = Todos.where('item.id', 2)

      expect(todoSub.length)
        .and.to.equal(2)
    })

  })

  describe('#update', function () {
    it('should update existed record', function () {
      otherTodos.update({id: 1, label: 'aa'})

      expect(otherTodos.get(1))
        .to.have.property('label')
        .and.to.equal('aa')
    })

    it('should add non existed record', function () {
      otherTodos.update({id: 3, label: 'c'})

      expect(otherTodos.get(3))
        .to.have.property('label')
        .and.to.equal('c')
    })

    it('should add non existed record without id', function () {
      otherTodos.update({label: 'c'})

      expect(otherTodos.length).to.equal(3)
    })
  })

  describe('#last', function () {
    it('should returns last element', function () {
      var todo = otherTodos.last()
      expect(todo).to.equal(b)
    })
  })

  describe('#sort', function () {
    it('should sort collection by given string comparator', function () {
      var sortedTodos = $collection.getInstance({comparator: '-label'})
      sortedTodos.add(a)
      sortedTodos.add(c)
      sortedTodos.add(b)

      expect(sortedTodos.last()).to.equal(a)
    })

    it('should sort collection by given comparator', function () {
      var sortedTodos = $collection.getInstance({comparator: 'label'})
      sortedTodos.add(a)
      sortedTodos.add(c)
      sortedTodos.add(b)

      expect(sortedTodos.last()).to.equal(c)
    })

    it('should sort collection on demand by directly passing the comparator', function () {
      var unsortedTodos = $collection.getInstance()
      unsortedTodos.add(a)
      unsortedTodos.add(c)
      unsortedTodos.add(b)
      unsortedTodos.sort('label')

      expect(unsortedTodos.last()).to.equal(c)
    })

    it('should sort collection by given comparator after #addAll', function () {
      var sortedTodos = $collection.getInstance({comparator: 'label'})
      sortedTodos.addAll([a, c, b])

      expect(sortedTodos.last()).to.equal(c)
    })
  })

  describe('#remove', function () {
    it('should remove given object', function () {
      var length = otherTodos.length
      otherTodos.remove(a)
      expect(otherTodos.length).to.equal(length - 1)
      expect(otherTodos.get(a)).to.be.an('undefined')
    })

    it('should not remove non-contained object', function () {
      var length = otherTodos.length
      otherTodos.remove(c)
      expect(otherTodos.length).to.equal(length)
      expect(otherTodos.get(b)).to.equal(b)
    })
  })

  describe('#removeAll', function () {
    it('should remove all objects', function () {
      otherTodos.removeAll()
      expect(otherTodos.length).to.equal(0)
      expect(otherTodos.get(a)).to.be.an('undefined')
      expect(otherTodos.get(b)).to.be.an('undefined')
    })
  })

  describe('#at', function () {
    it('should return object from given index', function () {
      expect(otherTodos.at(0)).to.equal(a)
      expect(otherTodos.at(1)).to.equal(b)
      expect(otherTodos.at(2)).to.be.an('undefined')
    })
  })

  describe('#size', function () {
    it('should return the number of items', function () {
      expect(otherTodos.size()).to.equal(2)
    })
  })

  describe('#initialize', function () {
    it('should allow to extend', function () {
      var ExtendCollection = $collection.extend({
        initialize: function () {
          this.label = 'label'
        }
      })

      var coll = ExtendCollection.getInstance()
      expect(coll.label).to.equal('label')
    })
  })

  describe('#all', function () {
    it('should return all items', function () {
      expect(otherTodos.all()).to.contain(a)
      expect(otherTodos.all()).to.contain(b)
      expect(otherTodos.all()).to.equal(otherTodos.array)
    })
  })
})
