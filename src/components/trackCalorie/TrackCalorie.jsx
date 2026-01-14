import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Search, Target } from "lucide-react";
import { foodSearchButton, trackCalorieDiv1 } from "../appliedcss/TrackCalorieCSS";
import { fetchNutritionSummary } from "../../api/fetchNutritionSummary.js";

import DailyNutrition from "./DailyNutrition.jsx";
import TodaysMeal from "./TodaysMeal.jsx";
import NutritionHistory from "./NutritionHistory.jsx";
import NutritionInsight from "./NutritionInsight.jsx";
import Button from "../../UI/Button.jsx";

// const userData = {
//     dailyGoals: {
//         calories: 2500,
//         protein: 150,
//         fats: 80
//     },
//     todaysIntake: {
//         calories: 1850,
//         protein: 95,
//         fats: 62,
//     },
//     weeklyData: [
//         { day: "Mon", calories: 2100, protein: 120, fats: 70 },
//         { day: "Tue", calories: 1950, protein: 110, fats: 65 },
//         { day: "Wed", calories: 2300, protein: 135, fats: 75 },
//         { day: "Thu", calories: 1850, protein: 95, fats: 62 },
//         { day: "Fri", calories: 2200, protein: 125, fats: 72 },
//         { day: "Sat", calories: 2400, protein: 140, fats: 78 },
//         { day: "Sun", calories: 1900, protein: 105, fats: 64 }
//     ],
//     monthlyData: [
//         { week: "Week 1", calories: 2150, protein: 125, fats: 71 },
//         { week: "Week 2", calories: 2050, protein: 118, fats: 68 },
//         { week: "Week 3", calories: 2200, protein: 130, fats: 73 },
//         { week: "Week 4", calories: 2100, protein: 122, fats: 70 }
//     ],
//     todayMeals: [
//         {
//             id: "1",
//             name: "Chicken Power Bowl",
//             image: "/placeholder.svg?height=300&width=400&text=Chicken+Power+Bowl",
//             calories: 450,
//             protein: 35,
//             fats: 15,
//             time: "8:30 AM",
//         },
//         {
//             id: "2",
//             name: "Protein Berry Blast",
//             image: "/placeholder.svg?height=300&width=400&text=Protein+Berry+Blast",
//             calories: 280,
//             protein: 20,
//             fats: 8,
//             time: "11:00 AM",
//         },
//         {
//             id: "3",
//             name: "Salmon Superfood Bowl",
//             image: "/placeholder.svg?height=300&width=400&text=Salmon+Superfood+Bowl",
//             calories: 520,
//             protein: 32,
//             fats: 22,
//             time: "1:30 PM",
//         },
//         {
//             id: "4",
//             name: "Greek Yogurt with Berries",
//             image: "/placeholder.svg?height=300&width=400&text=Greek+Yogurt",
//             calories: 180,
//             protein: 15,
//             fats: 5,
//             time: "4:00 PM",
//         },
//         {
//             id: "5",
//             name: "Grilled Chicken Salad",
//             image: "/placeholder.svg?height=300&width=400&text=Grilled+Chicken+Salad",
//             calories: 420,
//             protein: 38,
//             fats: 12,
//             time: "7:00 PM",
//         },
//     ],
// };

export default function TrackCalorie() {
    const dispatch = useDispatch();
    const { dailyGoals, todaysIntake, weeklyData, monthlyData, todayMeals, loading, error } = useSelector(state => state.userMealsTrack);

    const userData = {
        dailyGoals,
        todaysIntake,
        weeklyData,
        monthlyData,
        todayMeals
    };

    useEffect(() => {
        dispatch(fetchNutritionSummary());
    }, [dispatch]);

    return <main className="flex-1 py-8">
        <div className="my-container">
            <div className={trackCalorieDiv1}>
                <div>
                    <h1 className="text-3xl font-bold">Nutrition Tracker</h1>
                    <p className="text-gray-600">Track your daily nutrition intake and progress</p>
                </div>
                <div className="flex gap-4">
                    <Link to="setGoals">
                        <Button variant="outline" size="default" cssClasses="!border-[#1a5e63] text-[#1a5e63] login-button-hover">
                            <Target className="h-4 w-4 mr-2" />
                            Set Goals
                        </Button>
                    </Link>
                    <Link to="search">
                        <Button variant="default" size="default" cssClasses="!bg-[#1a5e63] order-button-hover">
                            <Search className="h-4 w-4 mr-2" />
                            Search Food
                        </Button>
                    </Link>
                </div>
            </div>

            <DailyNutrition userData={userData} />
            <TodaysMeal todayMeals={userData.todayMeals} />
            <NutritionHistory userData={userData} />
            <NutritionInsight userData={userData} />
        </div>
    </main>
}