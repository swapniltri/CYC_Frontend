import { createSlice } from '@reduxjs/toolkit';
import { calculateNutrientsPerFood } from '../api/calculateNutrientsPerFood';

const foodSelectInitialState = {
    selectedFood: null,
    foodUnit: null,
    foodQuantity: 0,
    foodUnitArray: null,
    foodUnitAmountArray: null,
    foodCalculatedNutrients: null,
    foodDialogOpen: false,
    foodAddedToMeals: false,
    loading: false,
    error: null
}

const foodSelectSlice = createSlice({
    name: "foodSelect",
    initialState: foodSelectInitialState,
    reducers: {
        updateSelectedFood(state, action) {
            state.selectedFood = action.payload;
            state.foodUnit = action.payload.units[0].unit;
            state.foodQuantity = action.payload.units[0].amountOptions[0].toString();
            state.foodUnitArray = action.payload.units;
            state.foodUnitAmountArray = action.payload.units[0].amountOptions;
            state.foodDialogOpen = true;
        },
        deleteSelectedItem(state) {
            state.selectedFood = null;
            state.foodUnit = null;
            state.foodQuantity = 0;
            state.foodUnitAmountArray = null,
                state.foodCalculatedNutrients = null;
            state.foodDialogOpen = false;
            state.foodAddedToMeals = false;
        },
        updateFoodCalculatedNutrients(state, action) {
            state.foodCalculatedNutrients = action.payload;
        },
        updateUnitSelectInDialog(state, action) {
            const unitToFind = action.payload.unit;
            const unitFound = state.foodUnitArray.find((unit) => unit.unit.toString() === unitToFind.toString());
            state.foodUnit = unitFound.unit;
            state.foodQuantity = unitFound.amountOptions[0].toString();
            state.foodUnitAmountArray = unitFound.amountOptions;
        },
        updateUnitAmountSelectInDialog(state, action) {
            state.foodQuantity = action.payload.amount;
        },
        updateFoodAddedToMyMeals(state) {
            state.foodAddedToMeals = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(calculateNutrientsPerFood.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(calculateNutrientsPerFood.fulfilled, (state, action) => {
                state.loading = false;
                state.foodCalculatedNutrients = action.payload;
            })
            .addCase(calculateNutrientsPerFood.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const foodSelectActions = foodSelectSlice.actions;

export default foodSelectSlice;