export const calculateNutrientsHelper = (unit, qty, selectedFood) => {
    let calories, protein, fats;

    if (unit === "serving") {
        calories = selectedFood.nutrients.calories.perServing * qty
        protein = selectedFood.nutrients.protein.perServing * qty
        fats = selectedFood.nutrients.fats.perServing * qty
    } else if (unit === "g") {
        calories = (selectedFood.nutrients.calories.per100g / 100) * qty
        protein = (selectedFood.nutrients.protein.per100g / 100) * qty
        fats = (selectedFood.nutrients.fats.per100g / 100) * qty
    } else if (unit === "oz") {
        // Convert oz to g (1 oz ≈ 28.35g) then calculate
        const grams = qty * 28.35
        calories = (selectedFood.nutrients.calories.per100g / 100) * grams
        protein = (selectedFood.nutrients.protein.per100g / 100) * grams
        fats = (selectedFood.nutrients.fats.per100g / 100) * grams
    } else if (unit === "cup") {
        // Approximate cup conversions (varies by food)
        calories = selectedFood.nutrients.calories.perServing * qty
        protein = selectedFood.nutrients.protein.perServing * qty
        fats = selectedFood.nutrients.fats.perServing * qty
    } else if (unit === "whole" || unit === "half" || unit === "fillet" || unit === "handful") {
        calories = selectedFood.nutrients.calories.perServing * qty
        protein = selectedFood.nutrients.protein.perServing * qty
        fats = selectedFood.nutrients.fats.perServing * qty
    }

    calories = calories.toFixed(2);
    protein = protein.toFixed(2);
    fats = fats.toFixed(2);

    return { calories, protein, fats };
}