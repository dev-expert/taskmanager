const express = require('express')
const app = express()

app.use(express.json())

//Use router middleware
const taskRouter = require("./routes/taskRoutes")
const userRouter = require("./routes/userRoutes")

app.use(taskRouter)
app.use(userRouter)

module.exports = app





