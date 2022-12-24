import mongoose from 'mongoose';

const ingredientsSchema = mongoose.Schema({
  heading: String,
  ingredients: [{
    quantity: Number,
    measurement: String,
    text: String
  }]
});

const directionsSchema = mongoose.Schema({
  heading: String,
  steps: [String]
});

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ingredientGroups: [ingredientsSchema],
  directionsGroups: [directionsSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
