import api from "./api";
import { messageActions } from "../store/message-slice";

const deleteUserMeal = (id, dispatch) => {
    try {
        return api.delete(`/api/calculateNutrients/foods/${id}`)
    } catch (e) {
        dispatch(messageActions.showMessage({ title: 'Delete Meal', message: 'Some error Occured, ' + error.message, type: 'error' }));
    }
}

export { deleteUserMeal };