import { createSlice } from '@reduxjs/toolkit';

const nutrientSelectionInitialState = {
    nutrientSelected: "calories",
    nutrientChart: {
        timeRange: "weekly",
        nutrientInChart: "calories"
    }
};

const nutrientSelectionSlice = createSlice({
    name: "nutrientSelectionSlice",
    initialState: nutrientSelectionInitialState,
    reducers: {
        updateNutrientSelected(state, action) {
            state.nutrientSelected = action.payload;
        },
        updateChartTimeRange(state, action) {
            state.nutrientChart.timeRange = action.payload;
        },
        updateNutrientInChart(state, action) {
            state.nutrientChart.nutrientInChart = action.payload;
        }
    }
});

export const nutrientSelectionAction = nutrientSelectionSlice.actions;

export default nutrientSelectionSlice;