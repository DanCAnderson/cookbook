import { getRecipes, getRecipeById } from "../controllers/recipe.js";
import express from 'express';
const router = express.Router();


// express router method to create route for getting all users
router.route('/').get(getRecipes);

// express router method to create route for getting users by id
router.route('/:id').get(getRecipeById);

export default router;