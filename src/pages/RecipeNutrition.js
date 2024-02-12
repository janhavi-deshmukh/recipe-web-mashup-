/* RecipeNutrition.js */

import React from 'react';
import './RecipeNutrition.css';

const RecipeNutrition = ({ totalNutrients }) => {
  return (
    <div className="nutrition">
      <h2>Nutrition Data:</h2>
      <div className="nutrient-bars">
        {Object.keys(totalNutrients).map((nutrientKey) => (
          <div key={nutrientKey} className="nutrient-bar">
            <div className="bar-container">
              <span className="nutrient-name">{nutrientKey}:</span>
              <span className="nutrient-quantity">
                {totalNutrients[nutrientKey].quantity.toFixed(2)} {totalNutrients[nutrientKey].unit}
              </span>
            </div>
            <div className="bar">
              <div
                className="bar-fill"
                style={{
                  width: `${(totalNutrients[nutrientKey].quantity / totalNutrients[nutrientKey].daily * 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeNutrition;
