import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
    accessToken: null,
    userId: null,
    isAuthenticated: "loading" // "loading", "authenticated", "unauthenticated"
};

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: authInitialState,
    reducers: {
        setCredentials(state, action) {
            const { accessToken, userId } = action.payload;
            state.accessToken = accessToken;
            state.userId = userId;
            state.isAuthenticated = "authenticated";
        },
        logout(state) {
            state.accessToken = null;
            state.userId = null;
            state.isAuthenticated = "unauthenticated";
        }
    }
});

export const authActions = authenticationSlice.actions;

export default authenticationSlice;