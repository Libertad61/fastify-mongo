const items = require("../data/items.js")
const { v4: uuidv4 } = require("uuid")

const getItems = function (request, reply) {
  items.forEach(item => {
    item.date = new Date().toISOString()
  })
  reply.send(items)
}

const getItem = function (request, reply) {
  const id = +request.params.id
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

module.exports = { getItems, getItem, addItem }
