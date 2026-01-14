import { useDispatch } from "react-redux";
import { nutrientSelectionAction } from "../../store/nutrientSelection-slice";

export default function NutrientHistoryTab({ nutrition, isSelected }) {
    const dispatch = useDispatch();

    let cssClass = "p-3 rounded-lg text-center cursor-pointer transition-colors";

    if (isSelected) {
        cssClass += " bg-[#1a5e63] text-white"
    } else {
        cssClass += " bg-gray-100 hover:bg-gray-200";
    }

    function handleNutrientTabClick() {
        dispatch(nutrientSelectionAction.updateNutrientInChart(nutrition.toLowerCase()));
    }

    return <div className={cssClass} onClick={handleNutrientTabClick}>
        <div className="font-medium">{nutrition}</div>
    </div>
}