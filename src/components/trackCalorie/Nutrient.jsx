import { useDispatch } from 'react-redux';

import { nutrientSelectionAction } from '../../store/nutrientSelection-slice.js';

export default function Nutrient({ nutrient, todaysIntake, dailyGoals, isSelected }) {
    const dispatch = useDispatch();
    const cssClass = isSelected === 1 ? "bg-[#1a5e63] text-white" : "bg-gray-100 hover:bg-gray-200"
    let cssClasses = "p-4 rounded-lg text-center cursor-pointer transition-colors " + cssClass;

    const getPercentage = () => {
        const percentage = (todaysIntake / dailyGoals) * 100;
        return Math.round(percentage);
    }

    function handleNutrientClick() {
        dispatch(nutrientSelectionAction.updateNutrientSelected(nutrient));
    }

    return <div className={cssClasses} onClick={handleNutrientClick}>
        <div className="text-sm font-medium mb-1">{nutrient}</div>
        <div className="text-xl font-bold">{getPercentage()}%</div>
        <div className="text-xs mt-1">
            {todaysIntake} / {dailyGoals}
        </div>
    </div>
}