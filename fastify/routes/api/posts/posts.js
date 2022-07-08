"use strict"
let currentId = 1
const posts = [
  {
    id: currentId,
    name: "james",
    title: "post 1 from outer world"
  }
]

const postOptions = {
  schema: {
    body: {
      type: "object",
      required: ["name", "title"],
      properties: {
        name: { type: "string" },
        title: { type: "string" }
      }
    },
    response: {
      201: {
        type: "object",
        properties: {
          name: { type: "string" },
          title: { type: "string" }
        }
      }
    }
  }
}

/**
 * @param {import('fastify').FastifyInstance} fastify
 */

module.exports = async function (fastify, opts) {
  const createError = fastify.httpErrors.createError

  fastify.get("/", async function (request, reply) {
    reply.status(200).send(posts)
  })

  fastify.post("/", postOptions, async function (request, reply) {
    currentId++
    const { name, title } = request.body
    const newPost = { id: currentId, name, title }
    posts.push(newPost)
    reply.code(201)
    return newPost
  })

  fastify.get("/:id", async function (request, reply) {
    try {
      const post = posts.find(p => p.id === +request.params.id)
      if (!post) {
        return createError(404, "Post not found crénom...")
      }
      post.support = fastify.someSupport()
      post.date = fastify.dateIs()
      return post
    } catch (error) {
      throw new Error("Something went wrong...")
    }
  })
}
