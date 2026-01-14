import { configureStore } from '@reduxjs/toolkit';
import { injectDispatch } from '../helper/ReduxDispatcher.js';
import foodSearchSlice from './foodSearch-slice.js';
import foodSelectSlice from './foodSelect-slice.js';
import nutrientSelectionSlice from './nutrientSelection-slice.js';
import messageSlice from './message-slice.js';
import authenticationSlice from './authentication-slice.js';
import calculateNutrientsSlice from './calculateNutrients-slice.js';
import userMealsTrackSlice from './usermealstrack-slice.js';

const store = configureStore({
    reducer: {
        foodSearch: foodSearchSlice.reducer,
        foodSelect: foodSelectSlice.reducer,
        nutrientSelection: nutrientSelectionSlice.reducer,
        showMessage: messageSlice.reducer,
        authentication: authenticationSlice.reducer,
        calculateNutrients: calculateNutrientsSlice.reducer,
        userMealsTrack: userMealsTrackSlice.reducer
    }
});

injectDispatch(store.dispatch);

export default store;