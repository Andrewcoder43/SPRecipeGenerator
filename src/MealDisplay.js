import React from 'react';

export const MealDisplay = ({ meal }) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  return (
    <div className="row">
      <div className="col-sm-5">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="img-fluid" />
      </div>
      <div className="col-sm-7">
        <h4>{meal.strMeal}</h4>
        <p><strong>Category:</strong> {meal.strCategory}</p>
        <p><strong>Area:</strong> {meal.strArea}</p>
        <h5>Ingredients:</h5>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="col-12">
        <h5>Instructions:</h5>
        <p>{meal.strInstructions}</p>
      </div>
    </div>
  );
};