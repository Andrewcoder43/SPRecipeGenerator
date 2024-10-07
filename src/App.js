import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const MealGenerator = () => {
  const [meal, setMeal] = useState(null);

  // Define solarpunk keywords outside the function to avoid recreating on each render
  const solarpunkKeywords = ['Vegetarian', 'Vegan', 'Salad', 'Healthy', 'Organic', 'Local'];

  // Use useCallback to memoize functions that are passed to child components or used in useEffect
  const isSolarpunkMeal = useCallback((meal) => {
    const category = meal.strCategory || '';
    const tags = meal.strTags ? meal.strTags.split(',') : [];
    const area = meal.strArea || '';

    return solarpunkKeywords.some(keyword => 
      category.includes(keyword) || tags.includes(keyword) || area.includes(keyword)
    );
  }, []);

  const fetchMeal = useCallback(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(res => res.json())
      .then(res => {
        const fetchedMeal = res.meals[0];
        if (isSolarpunkMeal(fetchedMeal)) {
          setMeal(fetchedMeal);
        } else {
          fetchMeal(); // Fetch another meal if it doesn't fit the solarpunk theme
        }
      })
      .catch(error => console.error('Error fetching meal:', error));
  }, [isSolarpunkMeal]);

  useEffect(() => {
    const get_meal_btn = document.getElementById('get_meal');
    get_meal_btn.addEventListener('click', fetchMeal);
    return () => {
      get_meal_btn.removeEventListener('click', fetchMeal);
    };
  }, [fetchMeal]);

  // Move createMeal outside the component to avoid recreating on each render
  const createMeal = (meal) => {
    const ingredients = [];
    // Extract ingredients and measurements
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
      } else {
        break;
      }
    }

    return (
      <div className="row">
        <div className="columns five">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          {meal.strCategory && <p><strong>Category:</strong> {meal.strCategory}</p>}
          {meal.strArea && <p><strong>Area:</strong> {meal.strArea}</p>}
          {meal.strTags && <p><strong>Tags:</strong> {meal.strTags.split(',').join(', ')}</p>}
          <h5>Ingredients:</h5>
          <ul>
            {ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
          </ul>
        </div>
        <div className="columns seven">
          <h4>{meal.strMeal}</h4>
          <p>{meal.strInstructions}</p>
        </div>
        {meal.strYoutube && (
          <div className="row">
            <h5>Video Recipe</h5>
            <div className="videoWrapper">
              <iframe
                width="420"
                height="315"
                src={`https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row text-center">
        <h3>Feeling hungry?</h3>
        <h5>Get a random solarpunk recipe by clicking below</h5>
        <button className="meal-generator-button" id="get_meal">Generate Meal</button>
      </div>
      <div id="meal" className="row meal">
        {meal && createMeal(meal)}
      </div>
    </div>
  );
  };
  
  const App = () => (
    <MealGenerator />
  );
  
  export default App;