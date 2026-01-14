import { useDispatch } from "react-redux";

import Badge from "../../UI/Badge";
import { foodSelectActions } from '../../store/foodSelect-slice';

export default function FoodCard({ food }) {
    const dispatch = useDispatch();

    function handleFoodClick() {
        dispatch(foodSelectActions.updateSelectedFood(food));
    }

    return <div
        key={food.id}
        className="bg-white rounded-lg border border-custom overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        onClick={handleFoodClick}
    >
        <div className="h-32 relative">
            <img src={food.image || "/placeholder.svg"} alt={food.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-3">
            <h3 className="font-medium">{food.name}</h3>
            {food.category.map((category) => (
                <Badge key={category} variant="outline" cssClasses="mt-1 text-xs">
                    {category}
                </Badge>
            ))}
        </div>
    </div>
}