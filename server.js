const express = require(`express`)
const app = express()
const PORT = 3000

app.use(express.json())

// Express.js logging middleware
app.use(require(`morgan`)(`dev`))

app.get(`/`, (req, res, next) => {
  res.send(`Welcome to the jukebox-mini API`)
})

app.use(`/users`, require(`./API/users`))

app.use((req, res, next) => {
  next({ stauts: 404, message: `Endpoint does not exist` })
})

app.use((e, req, res, next) => {
  console.log(e);
  res.status(e.status ?? 500).json(e.message ?? `Something went wrong`)
})

app.listen(PORT, () => {
  console.log(`You are now listening on port ${PORT}`)
})