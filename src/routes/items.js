const {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  patchUser
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

const getUserOpts = {
  handler: getUser
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
const delUserOpts = {
  schema: {
    response: {
      201: { body: Item }
    }
  },
  handler: deleteUser
}
const patchUserOpts = {
  schema: {
    response: {
      201: { body: Item }
    }
  },
  handler: patchUser
}

function itemRoutes(fastify, options, done) {
  fastify.get("/", getUsersOpts)
  fastify.get("/:name", getUserOpts)
  fastify.post("/", addUserOpts)
  fastify.delete("/:id", delUserOpts)
  fastify.patch("/:id", patchUserOpts)
  done()
}

module.exports = itemRoutes
