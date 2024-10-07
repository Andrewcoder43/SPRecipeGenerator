// App.js
import React, { useEffect } from 'react';
import { useMealGenerator } from './useMealGenerator';
import { MealDisplay } from './MealDisplay';
import './App.css';

const MealGenerator = () => {
  const { meal, isLoading, fetchMeal } = useMealGenerator();

  return (
    <div className="container">
      <div className="row text-center">
        <h3>Feeling hungry?</h3>
        <h5>Get a random solarpunk recipe by clicking below</h5>
        <button 
          className="meal-generator-button" 
          onClick={fetchMeal}
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Generate Meal'}
        </button>
      </div>
      <div id="meal" className="row meal">
        {isLoading && <p>Looking for a solarpunk meal...</p>}
        {!isLoading && meal && <MealDisplay meal={meal} />}
        {!isLoading && !meal && <p>No solarpunk meal found. Try again!</p>}
      </div>
    </div>
  );
};

const App = () => <MealGenerator />;

export default App;