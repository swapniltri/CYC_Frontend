import api from "./api";
import { GetUserDateTimeInfo } from "../helper/GetUserDateTimeInfo";
import { foodSelectActions } from "../store/foodSelect-slice";
import { messageActions } from "../store/message-slice";

const addToMyMeal = async (foodDetails, nutrientsToBeAdded, dispatch) => {
    const { timeStampUtc, timeZone } = GetUserDateTimeInfo();

    try {
        const payload = {
            searchedFoodName: foodDetails.searchedFoodName,
            foodName: foodDetails.foodName,
            foodUnit: foodDetails.foodUnit,
            foodAmount: foodDetails.foodAmount,
            eatenAt: timeStampUtc,
            timeZone: timeZone,
            calories: nutrientsToBeAdded.calories,
            protein: nutrientsToBeAdded.protein,
            fats: nutrientsToBeAdded.fats
        };

        await api.post('/api/calculateNutrients/addToMyMeal', payload);

        dispatch(foodSelectActions.updateFoodAddedToMyMeals());

    } catch (ex) {
        dispatch(messageActions.showMessage({ title: 'Save Meal', message: 'Some error Occured, ' + error.message, type: 'error' }));
    }

}

export { addToMyMeal }