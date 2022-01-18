import Fastify from "fastify"

const server = Fastify({ logger: true })

const fakeEntity = {
  id: '12345',
  name: "test name"
}

const getResponseTimeout = (timeout) => timeout || (Math.floor(Math.random() * 290) + 10)

const fakeResponse = async (timeout) => {
  const fakeTimeout = getResponseTimeout(timeout)
  console.log(fakeTimeout)
  await new Promise((resolve) => { setTimeout(() => { resolve('resolved') }, fakeTimeout) })

  return JSON.stringify(fakeEntity)
}


// Declare a route
server.get("/", async (request) => {
  return fakeResponse(request.query.timeout)
})

server.post("/", async (request) => {
  console.log(request.body)
  const timeout = request?.body?.timeout || 0

  return fakeResponse(timeout)
})

// Run the server!
const start = async () => {
  try {
    await server.listen(3000)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
