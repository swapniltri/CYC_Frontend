import { useSelector, useDispatch } from "react-redux";

import Card, { CardContent } from "../../UI/Card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../UI/Select.jsx';
import BarGraph from "./BarGraph.jsx";
import NutrientHistoryTab from "./NutrientHistoryTab.jsx";
import { nutrientSelectionAction } from "../../store/nutrientSelection-slice.js";

export default function NutritionHistory({ userData }) {
    const dispatch = useDispatch();
    const { nutrientChart } = useSelector(state => state.nutrientSelection);

    const nutrientTab = nutrientChart.nutrientInChart.toLowerCase();
    const showData = (nutrientChart.timeRange === "weekly" ? userData.weeklyData : userData.monthlyData);

    function handleTimeRangeChange(value) {
        dispatch(nutrientSelectionAction.updateChartTimeRange(value));
    }

    return <Card cssClasses="bg-white mb-8">
        <CardContent>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Nutrition History</h2>
                <Select value={nutrientChart.timeRange} onValueChange={(value) => handleTimeRangeChange(value)} >
                    <SelectTrigger cssClasses="w-32">
                        <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="h-64 mb-6 mt-6">
                <BarGraph data={showData} timeRange={nutrientChart.timeRange} nutrientTab={nutrientTab} />
            </div>

            <div className="grid grid-cols-3 gap-2">
                <NutrientHistoryTab nutrition="Calories" isSelected={nutrientTab === "calories" ? true : false} />
                <NutrientHistoryTab nutrition="Protein" isSelected={nutrientTab === "protein" ? true : false} />
                <NutrientHistoryTab nutrition="Fats" isSelected={nutrientTab === "fats" ? true : false} />
            </div>
        </CardContent>
    </Card>
}