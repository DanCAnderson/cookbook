import connectDB from './server/config/db.js'
import userRoutes from './server/routes/user.js'
import express from 'express'
import dotenv  from 'dotenv'

//dotenv config
dotenv.config()

//connect database
console.log(process.env.DB);
connectDB(process.env.DB)

const app = express()

//Creating API for user
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))