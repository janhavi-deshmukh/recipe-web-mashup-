// RecipeDetails.js
import "./RecipeDetails.css";
import React from "react";
import "./RecipeNutrition";
import RecipeNutrition from "./RecipeNutrition";

const RecipeDetails = ({ selectedRecipe, nutritionData, onClose }) => {
  return (
    <div className="recipe-information">
      <button onClick={onClose} className="back-button">
        Back to Recipe List
      </button>
      {selectedRecipe && (
        <div>
          <h1>{selectedRecipe.recipe.label}</h1>
          <div className="head">
            <div className="recipe-image">
              <img
                src={selectedRecipe.recipe.image}
                alt={selectedRecipe.recipe.label}
              />
            </div>

            <div className="health-labels">
              <h2 className="health-title">Health Labels:</h2>
              <div className="tags">
                {selectedRecipe.recipe.healthLabels.map((label, index) => (
                  <span key={index} className="tag">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p>
            <h2>Ingredients:</h2>
          </p>
          <ul className="ingredient-list">
            {selectedRecipe.recipe.ingredientLines.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          {nutritionData && (
            <RecipeNutrition totalNutrients={nutritionData.totalNutrients} />
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
