import { useState, useCallback } from 'react';

const solarpunkKeywords = ['Vegetarian', 'Vegan', 'Salad', 'Healthy', 'Organic', 'Local'];

export const useMealGenerator = () => {
    const [meal, setMeal] = useState(null);

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
                    fetchMeal();
                }
            })
            .catch(error => console.error('Error fetching meal:', error));
    }, [isSolarpunkMeal]);

    return { meal, fetchMeal };
};

