import api from './api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { messageActions } from '../store/message-slice';
import { foodSearchActions } from '../store/foodSearch-slice';

const foodSearch = createAsyncThunk(
    'foodSearch/search',
    async (foodName, { dispatch, rejectWithValue }) => {
        try {
            if (!foodName) {
                dispatch(messageActions.showMessage({
                    title: "Food Search",
                    message: "Please enter Food Name.",
                    type: "info"
                }));
                return "";
            }
            dispatch(foodSearchActions.updateSearchedItem({
                searchedItem: foodName
            }));

            const response = await api.get('api/foodSearch/search', {
                params: { foodName: foodName }
            });

            return response.data;
        }
        catch (ex) {
            dispatch(messageActions.showMessage({
                title: "Food Search",
                message: "Food Search process failed, " + ex.message,
                type: "error"
            }));
            return rejectWithValue(ex.message);
        }
    }
);

export { foodSearch }

