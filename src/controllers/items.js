const prisma = require("../plugins/prisma")

const getUsers = async function (request, reply) {
  //const users = await this.mongo.db.collection("test").find({}).toArray()
  const users = await prisma.test.findMany()
  return users
}

const getUser = async function (request, reply) {
  const user = await this.mongo.db
    .collection("test")
    .find({ name: request.params.name })
    .toArray()
  return { user }
}

const addUser = async function (request, reply) {
  const { name, password, email } = request.body
  const user = { name, password, email }
  //await this.mongo.db.collection("test").insertOne(user)
  await prisma.test.create({ data: user })
  await prisma.$disconnect()
  reply.code(201).send({ body: user })
}

const deleteUser = async function (request, reply) {
  const ObjectId = this.mongo.ObjectId
  await this.mongo.db
    .collection("test")
    .deleteOne({ _id: new ObjectId(request.params.id) })
  console.log(reply)
  reply.send({ message: `Item:  has been deleted` })
}

const patchUser = function (request, reply) {
  const ObjectId = this.mongo.ObjectId
  const { name, password, email } = request.body
  const newItem = { _id: new ObjectId(request.params.id), name }
  reply.code(200).send({ body: newItem })
}

module.exports = { getUsers, getUser, addUser, deleteUser, patchUser }
