import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import { messageActions } from "../store/message-slice";

const calculateNutrientsPerFood = createAsyncThunk(
    'calculateNutrient/calculate',
    async (foodDetails, { dispatch, rejectWithValue }) => {
        try {
            if (!foodDetails) {
                dispatch(messageActions.showMessage({
                    title: "Calculate Nutrients",
                    message: "Please select valid Food Item.",
                    type: "info"
                }))
                return "";
            }

            const response = await api.get('api/calculateNutrients/calculate', {
                params: {
                    foodName: foodDetails.foodName,
                    foodUnit: foodDetails.foodUnit,
                    foodAmount: foodDetails.foodAmount
                }
            });

            return response.data;
        } catch (ex) {
            dispatch(messageActions.showMessage({
                title: "Calculate Nutrients",
                message: "Unable to calculate nutrients due to some error, " + ex.message,
                type: "error"
            }));
            return rejectWithValue(ex.message);
        }
    }
);

export { calculateNutrientsPerFood };