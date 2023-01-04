import { getRecipes, getRecipeById, postRecipe } from "../controllers/recipe.js";
import express from 'express';
const router = express.Router();


router.route('/').get(getRecipes);

router.route('/').post(postRecipe);

router.route('/:id').get(getRecipeById);

export default router;