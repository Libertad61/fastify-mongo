let items = require("../data/items.js")
const { v4: uuidv4 } = require("uuid")

const getItems = function (request, reply) {
  items.forEach(item => {
    item.date = new Date().toLocaleTimeString("fr")
  })
  reply.send(items)
}

const getItem = function (request, reply) {
  const id = request.params.id
  const item = items.find(item => item.id === id)
  item.date = new Date().toISOString()
  reply.send({ body: item })
}

const addItem = function (request, reply) {
  const { name } = request.body
  const id = uuidv4()
  const item = { id, name, date: new Date().toISOString() }
  items.push(item)
  reply.code(201).send({ body: item })
}

const deleteItem = function (request, reply) {
  const { id } = request.params
  items = items.filter(item => item.id !== id)
  reply.send({ items, message: `Item: ${id} has been deleted` })
}

const patchItem = function (request, reply) {
  const { id } = request.params
  const { name } = request.body
  const newItem = { id, name, date: new Date().toLocaleTimeString("fr") }
  items.find(item => item.id === id).name = name
  reply.code(200).send({ body: newItem })
}

module.exports = { getItems, getItem, addItem, deleteItem, patchItem }
