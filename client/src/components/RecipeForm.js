import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeForm = () => {

  const navigate = useNavigate();

  let test = {
    ingredientGroups: 
      [{
        heading: 'i-group',
        ingredients: [{ quantity: 1, measurement: 'cup', text: 'test ingredient'}]
      }],
    directionsGroups: [{ heading: 'test d-group', steps: ['direction 1', 'direction 2']}]
  }

  const sendRecipe = (e) => {
    e.preventDefault();
    console.log(e.target.elements.title.value);
    axios.post('/api/recipes', {
      //'title': e.target.elements.title.value,
      title: 'test 1',
      'ingredientGroups': test.ingredientGroups,
      'directionsGroups': test.directionsGroups
    })
    .then( () => {
      navigate('/recipes')
    })
    .catch( (err) => {
      console.log(err);
    })
  }

  return (
    <form onSubmit={sendRecipe}>
      <input
        name="title"
        placeholder="Recipe name"
      />
      <div className="ingredients-group">
        <input name="ingredients.0.heading" placeholder="Ingredients, Group 1"/>
        <div className="ingredient-row">
          <input name="ingredients.0.0.name" placeholder="Ingredient 1" />
          <input type="number" name="ingredients.0.0.quantity" placeholder="1" />
          <select name="ingredients.0.0.measurement">
            <option value="tsp">tsp</option>
            <option value="Tbsp">Tbsp</option>
            <option value="ml">ml</option>
          </select>
        </div>
      </div>
      <div className="directions-group">
        <input name="directions.0.heading" placeholder="Instructions, Group 1" />
        <input name="directions.0.0" placeholder="Step 1" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default RecipeForm;