import api from "./api";
import index from "../store";
import { messageActions } from "../store/message-slice";
import { GetUserIdFromToken } from "../helper/GetUserIdFromToken";

const saveUserGoals = async (calorie, protein, fat, dispatch, action) => {
    const userId = GetUserIdFromToken(index.getState().authentication.accessToken);

    if (!userId) {
        dispatch(messageActions.showMessage({
            title: "User not found!",
            message: "User session got expired, please log in again.",
            type: "error"
        }));
        return;
    }

    try {
        const response = await api.post('/api/goals/saveUserGoal', {
            userId: userId,
            calories: calorie,
            protein: protein,
            fats: fat
        });

        if (response.status !== 200) {
            dispatch(messageActions.showMessage({
                title: action === "save" ? "Save User Goals" : "Update User Goals",
                message: action === "save" ? "Save user goals process failed, please try again." : "Update user goals process failed, please try again.",
                type: "error"
            }));
            return;
        }

        dispatch(messageActions.showMessage({
            title: action === "save" ? "Save User Goals" : "Update User Goals",
            message: action === "save" ? "User goals saved successfully." : "User goals updated successfully.",
            type: "success"
        }));

    } catch (error) {
        dispatch(messageActions.showMessage({
            title: action === "save" ? "Save User Goals" : "Update User Goals",
            message: action === "save" ? "Save user goals process failed, " + error.message : "Update user goals process failed, " + error.message,
            type: "error"
        }));
    }
}

const getUserGoals = async (dispatch) => {
    const userId = GetUserIdFromToken(index.getState().authentication.accessToken);

    if (userId) {
        try {
            const response = await api.get('/api/goals/getUserGoal');

            return response.data;
        } catch (error) {
            dispatch(messageActions.showMessage({
                title: "System Error!",
                message: "System error occurred, please try again later." + error.message,
                type: "error"
            }));
            return null;
        }
    }
}

export { saveUserGoals, getUserGoals };