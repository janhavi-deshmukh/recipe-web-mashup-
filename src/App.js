// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import RecipeDetails from './pages/RecipeDetails';
import axios from 'axios';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);

  const RECIPE_APP_ID = process.env.REACT_APP_RECIPE_APP_ID;
  const RECIPE_APP_KEY = process.env.REACT_APP_RECIPE_APP_KEY;
  const NUTRITION_APP_ID = process.env.REACT_APP_NUTRITION_APP_ID;
  const NUTRITION_APP_KEY = process.env.REACT_APP_NUTRITION_APP_KEY;

  const RECIPE_API_ENDPOINT = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${RECIPE_APP_ID}&app_key=${RECIPE_APP_KEY}`;
  

  const searchRecipes = async () => {
    try {
      const response = await fetch(RECIPE_API_ENDPOINT);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRecipes(data.hits);
      } else {
        console.error('Error fetching recipes');
      }
    } catch (error) {
      console.error('Error fetching recipes', error);
    }
  };

  // const fetchNutrition = async (recipe) => {
  //   try {
  //     const response = await fetch(NUTRITION_API_ENDPOINT, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         title: recipe.recipe.label,
  //         ingr: recipe.recipe.ingredientLines,
  //       }),
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       setNutritionData(data);
  //     } else {
  //       console.error('Error fetching nutrition data');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching nutrition data', error);
  //   }
  // };

  const fetchNutrition = async (recipe) => {
    if (recipe && recipe.recipe) {
      const NUTRITION_API_ENDPOINT = `/api/external-data`;
      try {
        const ingredientLines = recipe.recipe.ingredientLines; // Ensure this is correctly set
        console.log(ingredientLines)
        if (ingredientLines && Array.isArray(ingredientLines) && ingredientLines.length > 0) {
          const response = await axios.get(
            `https://api.edamam.com/api/nutrition-data?app_id=${process.env.REACT_APP_NUTRITION_APP_ID}&app_key=${process.env.REACT_APP_NUTRITION_APP_KEY}&nutrition-type=cooking&ingr=${ingredientLines.join(',')}`,
            
          );
          const data = response.data;
          console.log(data);
          // const response = await fetch(NUTRITION_API_ENDPOINT, {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     title: recipe.recipe.label,
          //     ingr: ingredientLines, // Correctly set as an array of ingredient lines
          //   }),
          // });
          
          if (response.status === 200) {
            const data = response.data;
            setNutritionData(data);
          } else {
            console.error('Error fetching nutrition data');
          }
        } else {
          console.error('Ingredient lines are missing or not in the correct format.');
        }
      } catch (error) {
        console.error('Error fetching nutrition data', error);
      }
    } else {
      console.error('Recipe object is undefined or missing the "recipe" property.');
    }
  };
  
  

  useEffect(() => {
    if (selectedRecipe) {
      console.log('Selected recipe:', selectedRecipe);
      fetchNutrition(selectedRecipe);
    }
  }, [selectedRecipe]);
  

  const openRecipeDetails = (recipe) => {
    console.log('Opening recipe details:', recipe);
    setSelectedRecipe(recipe);
  };

  // Function to close the recipe details page
  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="App">
      <header className="hero">
        <div className="overlay">
          <h1>Discover Delicious Recipes</h1>
          <span>Search for your favorite recipes and explore their nutrition details.</span>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for recipes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={searchRecipes}>Search</button>
          </div>
        </div>
      </header>
      <div className="recipe-list">
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.recipe.uri}>
              <button
                className="recipe-button"
                onClick={() => openRecipeDetails(recipe)}
              >
                <div className="recipe-image-app">
                  <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                </div>
                <p className="recipe-label">{recipe.recipe.label}</p>
                <div className='info'>
                <p className="recipe-info">Calories: {Math.round(recipe.recipe.calories)} </p>
                <p className="recipe-info">Ingredients: {recipe.recipe.ingredientLines.length}</p>
                </div>
                
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedRecipe && (
        <RecipeDetails
          selectedRecipe={selectedRecipe}
          nutritionData={nutritionData}
          onClose={closeRecipeDetails}
        />
      )}

      
    </div>
  );
};

export default App;
