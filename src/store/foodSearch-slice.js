import { createSlice } from '@reduxjs/toolkit';
import { foodSearch } from '../api/foodSearch.js';

const foodSearchInitialState = {
    searchedItem: "",
    searchResult: [],
    loading: false,
    error: null
}

const foodSearchSlice = createSlice({
    name: "foodSearch",
    initialState: foodSearchInitialState,
    reducers: {
        updateSearchedItem(state, action) {
            state.searchedItem = action.payload.searchedItem;
        },
        clearSearchResult(state) {
            state.searchedItem = "";
            state.searchResult = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(foodSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(foodSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResult = action.payload;
            })
            .addCase(foodSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const foodSearchActions = foodSearchSlice.actions;

export default foodSearchSlice;