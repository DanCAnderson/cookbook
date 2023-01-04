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
});

export const postRecipe = asyncHandler(async (req, res) => {

  //const { error } = validateRecipe(req.body);
  //if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    console.log("creating recipe...");
    let recipe = await Recipe.create({
      title: req.body.title,
      ingredientGroups: req.body.ingredientGroups,
      directionsGroups: req.body.directionsGroups,
      //user: req.user.id,
    });
    console.log("created recipe", recipe);
    //recipe = await recipe.populate('user').execPopulate();

    res.status(200).json({ message: recipe.toJSON() });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});