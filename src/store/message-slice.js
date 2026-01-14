import { createSlice } from '@reduxjs/toolkit';

const messageInitialState = {
    title: null,
    message: null,
    type: null,
    isVisible: false
}

const messageSlice = createSlice({
    name: "message",
    initialState: messageInitialState,
    reducers: {
        showMessage(state, action) {
            state.title = action.payload.title;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        hideMessage(state) {
            state.title = null;
            state.message = null;
            state.type = null;
            state.isVisible = false;
        },
        toggleIsVisible(state, action) {
            state.isVisible = action.payload;
        }
    }
});

export const messageActions = messageSlice.actions;

export default messageSlice;