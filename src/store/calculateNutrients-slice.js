import { createSlice } from "@reduxjs/toolkit";

const calculateNutrientsInitialState = {
    previouslySetUpGoals: null,
    manualCalorieEntered: "",
    manualProteinEntered: "",
    manualFatEntered: "",
    currentWeight: "",
    currentHeight: "",
    targetWeight: "",
    age: "",
    gender: "",
    activityLevel: "",
    goal: "",
    calculatedGoals: null
};

const calculateNutrientsSlice = createSlice({
    name: 'calculateNutrients',
    initialState: calculateNutrientsInitialState,
    reducers: {
        setCurrentWeight(state, action) {
            state.currentWeight = action.payload;
        },
        setCurrentHeight(state, action) {
            state.currentHeight = action.payload;
        },
        setTargetWeight(state, action) {
            state.targetWeight = action.payload;
        },
        setAge(state, action) {
            state.age = action.payload;
        },
        setGender(state, action) {
            state.gender = action.payload;
        },
        setActivityLevel(state, action) {
            state.activityLevel = action.payload;
        },
        setGoal(state, action) {
            state.goal = action.payload;
        },
        setCalculatedNutritionGoals(state, action) {
            state.calculatedGoals = action.payload;
        },
        setManualCalorieEntered(state, action) {
            state.manualCalorieEntered = action.payload;
        },
        setManualProteinEntered(state, action) {
            state.manualProteinEntered = action.payload;
        },
        setManualFatEntered(state, action) {
            state.manualFatEntered = action.payload;
        },
        setPreviouslySetUpGoals(state, action) {
            state.previouslySetUpGoals = action.payload;
        },
        resetAll(state) {
            state.previouslySetUpGoals = null,
                state.manualCalorieEntered = "",
                state.manualProteinEntered = "",
                state.manualFatEntered = "",
                state.currentWeight = "",
                state.currentHeight = "",
                state.targetWeight = "",
                state.age = "",
                state.gender = "",
                state.activityLevel = "",
                state.goal = "",
                state.calculatedGoals = null
        }
    }
});

export const calculateNutrientsAction = calculateNutrientsSlice.actions;

export default calculateNutrientsSlice;