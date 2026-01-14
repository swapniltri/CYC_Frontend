import { messageActions } from '../store/message-slice.js';

export const calculateNutritionGoals = (currentWeight, currentHeight, targetWeight, age, gender, activityLevel, goal, dispatch) => {

    if (!currentWeight || !currentHeight || !targetWeight || !age || !gender || !activityLevel || !goal) {

        dispatch(messageActions.showMessage({
            title: 'Missing Information',
            message: 'Please fill in all required fields.',
            type: 'error'
        }));

        return null
    }

    const weight = Number.parseFloat(currentWeight);
    const height = Number.parseFloat(currentHeight);
    const target = Number.parseFloat(targetWeight);
    const userAge = Number.parseInt(age);

    // Calculate BMR(Basal Metabolic Rate)
    const bmr = calculateBMR(weight, height, userAge, gender);

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * getActivityMultiplier(activityLevel);

    let calories = tdee
    let proteinPerKg = 1.6 // Default protein per kg body weight
    let fatPercentage = 0.25 // 25% of calories from fat

    // Adjust based on goal
    switch (goal) {
        case "lose":
            calories = tdee - 500 // 500 calorie deficit for ~1lb/week loss
            proteinPerKg = 2.0 // Higher protein for muscle preservation
            fatPercentage = 0.25
            break
        case "gain":
            calories = tdee + 300 // 300 calorie surplus for lean gains
            proteinPerKg = 1.8 // Higher protein for muscle building
            fatPercentage = 0.25
            break
        case "maintain":
            calories = tdee
            proteinPerKg = 1.6
            fatPercentage = 0.25
            break
        case "recomp":
            calories = tdee // Maintenance calories for body recomposition
            proteinPerKg = 2.2 // High protein for recomposition
            fatPercentage = 0.25
            break
    }

    // Calculate macros
    const protein = Math.round(weight * proteinPerKg)
    const fats = Math.round((calories * fatPercentage) / 9) // 9 calories per gram of fat
    const carbs = Math.round((calories - protein * 4 - fats * 9) / 4) // Remaining calories from carbs

    return {
        calories: Math.round(calories),
        protein,
        fats,
        carbs,
    }

}

const calculateBMR = (weight, height, age, gender) => {
    if (gender === "male") {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
}

const getActivityMultiplier = (level) => {
    switch (level) {
        case "sedentary":
            return 1.2
        case "light":
            return 1.375
        case "moderate":
            return 1.55
        case "active":
            return 1.725
        case "very-active":
            return 1.9
        default:
            return 1.2
    }
}