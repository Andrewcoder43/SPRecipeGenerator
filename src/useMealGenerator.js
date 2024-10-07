// hooks/useMealGenerator.js
import { useState, useCallback } from 'react';

const solarpunkKeywords = ['Vegetarian', 'Vegan', 'Salad', 'Healthy', 'Organic', 'Local'];

export const useMealGenerator = () => {
    const [meal, setMeal] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const isSolarpunkMeal = useCallback((meal) => {
        const category = meal.strCategory || '';
        const tags = meal.strTags ? meal.strTags.split(',') : [];
        const area = meal.strArea || '';

        return solarpunkKeywords.some(keyword =>
            category.toLowerCase().includes(keyword.toLowerCase()) ||
            tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase())) ||
            area.toLowerCase().includes(keyword.toLowerCase())
        );
    }, []);

    const fetchMeal = useCallback(async () => {
        setIsLoading(true);
        setMeal(null);

        const maxAttempts = 5;
        let attempts = 0;

        while (attempts < maxAttempts) {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                const data = await response.json();
                const fetchedMeal = data.meals[0];

                if (isSolarpunkMeal(fetchedMeal)) {
                    setMeal(fetchedMeal);
                    break;
                }

                attempts++;
            } catch (error) {
                console.error('Error fetching meal:', error);
                break;
            }
        }

        setIsLoading(false);
    }, [isSolarpunkMeal]);

    return { meal, isLoading, fetchMeal };
};