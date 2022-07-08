require("dotenv").config()
const dbURL = process.env.DATABASE_URL
const fastify = require("fastify")({
  logger: true
})

fastify.register(require("@fastify/swagger"), {
  routePrefix: "/doc",
  swagger: { info: { title: "Fastify API", version: "1.0.0" } },
  exposeRoute: true
})

fastify.register(require("@fastify/mongodb"), {
  url: dbURL,
  forceClose: true
})

fastify.register(require("./routes/items"), { prefix: "/items" })

const start = async () => {
  try {
    await fastify.listen({ port: 3001 })
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}
start()
