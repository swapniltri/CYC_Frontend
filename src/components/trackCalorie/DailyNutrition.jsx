import { useSelector } from 'react-redux';
import { Target } from 'lucide-react';
import NutrientDonutChart from '../../UI/NutrientDonutChart.jsx';
import Nutrient from './Nutrient.jsx';
import Card, { CardContent } from '../../UI/Card.jsx';

export default function DailyNutrition({ userData }) {
    const { nutrientSelected } = useSelector(state => state.nutrientSelection);
    const nutrient = nutrientSelected.toLowerCase();

    function getPercentage() {
        if (!userData.todaysIntake) {
            return 0;
        }
        return Math.round((userData.todaysIntake[nutrient] / userData.dailyGoals[nutrient]) * 100)
    }

    return <div className="space-y-6 mb-8">
        <Card cssClasses="bg-white">
            <CardContent>
                <h2 className="text-xl font-bold mb-6">Today's Progress</h2>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {(!userData.dailyGoals || !userData.dailyGoals.calories) ?
                        <div className="w-full flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <div className="bg-[#ffd84d]/20 p-4 rounded-full mb-4">
                                <Target className="h-10 w-10 text-[#1a5e63]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1a5e63] mb-2">Set Your Goals First</h3>
                            <p className="text-gray-600 max-w-md mb-6">
                                To track your progress accurately, you need to define your daily calorie and macronutrient targets
                                first.
                            </p>
                        </div>
                        :
                        <>
                            <div className="flex-shrink-0 flex justify-center">
                                <NutrientDonutChart percentage={getPercentage()} nutrient={nutrient} />
                            </div>
                            <div className="flex-1 grid grid-cols-3 gap-3 w-full">
                                <Nutrient
                                    nutrient="Calories"
                                    todaysIntake={userData.todaysIntake ? userData.todaysIntake.calories : 0}
                                    dailyGoals={userData.dailyGoals.calories}
                                    isSelected={nutrient === "calories" ? 1 : 0}
                                />
                                <Nutrient
                                    nutrient="Protein"
                                    todaysIntake={userData.todaysIntake ? userData.todaysIntake.protein : 0}
                                    dailyGoals={userData.dailyGoals.protein}
                                    isSelected={nutrient === "protein" ? 1 : 0}
                                />
                                <Nutrient
                                    nutrient="Fats"
                                    todaysIntake={userData.todaysIntake ? userData.todaysIntake.fats : 0}
                                    dailyGoals={userData.dailyGoals.fats}
                                    isSelected={nutrient === "fats" ? 1 : 0}
                                />
                            </div>
                        </>
                    }
                </div>
            </CardContent>
        </Card>
    </div>
}