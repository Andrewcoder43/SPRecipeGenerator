import React from 'react';
import { useMealGenerator } from './useMealGenerator';
import { MealDisplay } from './MealDisplay';
import './App.css';

const MealGenerator = () => {
  const { meal, fetchMeal } = useMealGenerator();

  return (
    <div className="container">
      <div className="row text-center">
        <h3>Feeling hungry?</h3>
        <h5>Get a random solarpunk recipe by clicking below</h5>
        <button className="meal-generator-button" onClick={fetchMeal}>Generate Meal</button>
      </div>
      <div id="meal" className="row meal">
        {meal && <MealDisplay meal={meal} />}
      </div>
    </div>
  );
};

const App = () => <MealGenerator />;

export default App;