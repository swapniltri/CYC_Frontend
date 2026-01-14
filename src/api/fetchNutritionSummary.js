import api from './api';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchNutritionSummary = createAsyncThunk(
    'fetchNutritionSummary/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/userData/getUserLatestData');
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export { fetchNutritionSummary };