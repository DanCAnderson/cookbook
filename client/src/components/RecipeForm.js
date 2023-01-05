import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, FieldArray } from 'formik';

const IngredientGroup = () => {
  return (
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
  )
}

const DirectionsGroup = () => {
  return (
    <div className="directions-group">
      <input name="directions.0.heading" placeholder="Instructions, Group 1" />
      <input name="directions.0.0" placeholder="Step 1" />
    </div>
  )
}

const RecipeForm = () => {

  const [ counter, incCounter ] = useState(0);
  //incrementing counter will re-render component, as formik doesn't seem to supply helper functions for nested arrays/objects
  //should find smarter way
  //maybe flatten data so that ingredientGroups are available within 'values'?
  const navigate = useNavigate();

  const initialValues = {
    title: 'title',
    ingredientGroups: 
      [{
        heading: 'i-group',
        ingredients: [{ quantity: 1, measurement: 'cup', text: 'test ingredient'}]
      }],
    directionsGroups: [{ heading: 'test d-group', steps: ['direction 1', 'direction 2']}]
  }

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

    const ing = [];
      //ingredientGroups.forEach( (group, index) => {
      
    //})

    axios.post('/api/recipes', {
      'title': e.target.elements.title.value,
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
    <div>
    <Formik
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
    >
       {({ values }) => (
        <Form>
          <Field
            name="title"
            placeholder="Recipe name"
          />
          <FieldArray name="ingredientGroups">
            {( {insert, remove, push} ) => (
              <div className="ingredients-group">
                { values.ingredientGroups.map( (group, index) => { return (
                  <div>
                    <Field name={`ingredients.${index}.heading`} placeholder="Ingredients, Group index"/>
                    { group.ingredients && group.ingredients.map( ( line, j ) => {
                      return (<div className="ingredient-row">
                        <Field name={`ingredients.${index}[0].name`} placeholder="Ingredient 1" />
                        <Field type="number" name={`ingredients.${index}[0].quantity`} placeholder="1" />
                        <Field component="select" name={`ingredients.${index}[0].measurement`}>
                          <option value="tsp">tsp</option>
                          <option value="Tbsp">Tbsp</option>
                          <option value="ml">ml</option>
                        </Field>
                      </div>)
                   }
                  )}
                    <button 
                      type="button" 
                      onClick={ () => {
                        group.ingredients.push({quantity: "1", measurement: "", text: ""});
                        incCounter(counter + 1);} //Increment state to re-render component, seems hackish
                      }
                    >+ Ingredient</button>
                  </div>)
                })}
                <button type ='button' onClick={() => push({})}>Add Ingredient Group</button>
              </div>
            )}
          </FieldArray>

          <DirectionsGroup />
          <input type="submit" value="Submit" />
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default RecipeForm;