const { getItems, getItem, addItem } = require("../controllers/items.js")

const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    date: { type: "string" }
  }
}

const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item
      }
    }
  },
  handler: getItems
}

const getItemOpts = {
  schema: {
    response: {
      200: { body: Item }
    }
  },
  handler: getItem
}

const postItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" }
      }
    },
    response: {
      201: { body: Item }
    }
  },
  handler: addItem
}

function itemRoutes(fastify, options, done) {
  fastify.get("/", getItemsOpts)
  fastify.get("/:id", getItemOpts)
  fastify.post("/", postItemOpts)
  done()
}

module.exports = itemRoutes
