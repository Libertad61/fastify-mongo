//const { v4: uuidv4 } = require("uuid")
//const fastify = require("fastify")

const getUsers = async function (request, reply) {
  const users = await this.mongo.db.collection("test").find({}).toArray()
  return users
}

const getItem = function (request, reply) {
  const id = request.params.id
  const item = items.find(item => item.id === id)
  item.date = new Date().toISOString()
  reply.send({ body: item })
}

const addUser = async function (request, reply) {
  const { name, password, email } = request.body
  const user = { name, password, email }
  await this.mongo.db.collection("test").insertOne(user)
  reply.code(201).send({ body: user })
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

module.exports = { getUsers, getItem, addUser, deleteItem, patchItem }
