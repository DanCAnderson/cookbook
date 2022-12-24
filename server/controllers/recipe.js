import Recipe from '../models/Recipe.js';
import asyncHandler from 'express-async-handler';

export const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({});
  res.json(recipes);
});

export const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
    res.status(404);
    throw new Error('Recipe not found');
  }
})