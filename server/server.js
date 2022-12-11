import * as dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import workourRoutes from './routes/workouts.js'

dotenv.config()
mongoose.set('strictQuery', true);
const port = process.env.PORT

// express app
const app = express();

// middleware
app.use(express.json())
app.use(cors())

app.use(( req, res, next) => {
  console.log(req.path, req.method)
  next();
})

// routes
app.use('/api/workouts', workourRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(port, () => {
      console.log(`Connected to DB and litening on port: ${port}`)
    });
  })
  .catch((err) => console.log(err))

