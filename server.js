import connectDB from './server/config/db.js'

import express from 'express'
import bodyParser from 'body-parser'
import dotenv  from 'dotenv'

import userRoutes from './server/routes/user.js'
import recipeRoutes from './server/routes/recipe.js'

//dotenv config
dotenv.config()

//connect database
connectDB(process.env.DB);

const app = express();

app.use(bodyParser.json());

//Creating API for user
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

const PORT = process.env.PORT || 5000;

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`));