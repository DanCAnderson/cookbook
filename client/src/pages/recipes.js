import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const getData = async () => {
    const res = await axios.get('/api/recipes');
    setRecipes(res.data);
  };

  useEffect(() => {
    getData()
  }, []);

  return (
    <div>
      {recipes.map(r => <h4 key={r._id}>title : {r.title}</h4>)}
    </div>
  )
}

export default Recipes;