import { createSlice } from "@reduxjs/toolkit";
import { fetchNutritionSummary } from "../api/fetchNutritionSummary";

const userMealsTrackInitialState = {
    dailyGoals: null,
    todaysIntake: null,
    weeklyData: null,
    monthlyData: null,
    todayMeals: null,
    loading: false,
    error: null
}

const userMealsTrackSlice = createSlice({
    name: "userMealsTrack",
    initialState: userMealsTrackInitialState,
    reducers: {
        updateUserDailyGoals(state, action) {
            state.dailyGoals = action.payload;
        },
        clearUserMealsTrackData(state) {
            state.dailyGoals = null;
            state.todaysIntake = null;
            state.weeklyData = null;
            state.monthlyData = null;
            state.todayMeals = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNutritionSummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNutritionSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.dailyGoals = action.payload.dailyGoals;
                state.todaysIntake = action.payload.todaysIntake;
                state.weeklyData = action.payload.weeklyData;
                state.monthlyData = action.payload.monthlyData;
                state.todayMeals = action.payload.todayMeals;
            })
            .addCase(fetchNutritionSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const userMealsTrackActions = userMealsTrackSlice.actions;

export default userMealsTrackSlice;