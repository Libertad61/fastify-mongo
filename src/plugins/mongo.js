"use strict"

const fp = require("fastify-plugin")
const fastify = require("fastify")
const url = process.env.DATABASE_URL

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/mongodb"), {
    url: url,
    forceClose: true
  })
})
