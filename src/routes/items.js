const {
  getUsers,
  getItem,
  addUser,
  deleteItem,
  patchItem
} = require("../controllers/items.js")

const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    date: { type: "string" }
  }
}

const User = {
  type: "object",
  properties: {
    name: { type: "string" },
    password: { type: "string" },
    email: { type: "string" }
  }
}

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        users: User
      }
    }
  },
  handler: getUsers
}

const getItemOpts = {
  schema: {
    response: {
      200: { body: Item }
    }
  },
  handler: getItem
}

const addUserOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "password", "email"],
      properties: {
        name: { type: "string" },
        password: { type: "string" },
        email: { type: "string" }
      }
    },
    response: {
      201: { body: User }
    }
  },
  handler: addUser
}
const delItemOpts = {
  schema: {
    response: {
      201: { body: Item }
    }
  },
  handler: deleteItem
}
const patchItemOpts = {
  schema: {
    response: {
      201: { body: Item }
    }
  },
  handler: patchItem
}

function itemRoutes(fastify, options, done) {
  fastify.get("/", getUsersOpts)
  fastify.get("/:id", getItemOpts)
  fastify.post("/", addUserOpts)
  fastify.delete("/:id", delItemOpts)
  fastify.patch("/:id", patchItemOpts)
  done()
}

module.exports = itemRoutes
