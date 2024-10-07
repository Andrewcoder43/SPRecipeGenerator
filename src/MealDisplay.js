// components/MealDisplay.js
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
            {/* ... (rest of the meal display JSX) ... */}
        </div>
    );
};