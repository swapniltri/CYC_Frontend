import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card, { CardContent } from '../../UI/Card.jsx';
import { linkNutrientInsight } from '../appliedcss/TrackCalorieCSS.js';

export default function NutritionInsight({ userData }) {
    return <div className="grid md:grid-cols-3 gap-6">
        <Card cssClasses="bg-[rgba(255,216,77,0.1)] border-[rgba(255,216,77,0.2)]">
            <CardContent>
                <h3 className="font-bold mb-2">Daily Goal Progress</h3>
                <p className="text-gray-700 mb-4">
                    You've consumed {(userData && userData.todaysIntake) ? userData.todaysIntake.calories : 0} out of {(userData && userData.dailyGoals) ? userData.dailyGoals.calories : 0} calories today.
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        {Math.round((((userData && userData.todaysIntake) ? userData.todaysIntake.calories : 0) / (userData && userData.dailyGoals) ? userData.dailyGoals.calories : 0) * 100)}% of daily goal
                    </span>
                    <Link href="#">
                        <button className={linkNutrientInsight}>
                            Add more <ArrowRight className="h-4 w-4 ml-1" />
                        </button>
                    </Link>
                </div>
            </CardContent>
        </Card>

        <Card cssClasses="bg-[rgba(26,94,99,0.05)] border-[rgba(26,94,99,0.1)]">
            <CardContent>
                <h3 className="font-bold mb-2">Protein Intake</h3>
                <p className="text-gray-700 mb-4">
                    You've consumed {(userData && userData.todaysIntake) ? userData.todaysIntake.protein : 0}g out of {(userData && userData.dailyGoals) ? userData.dailyGoals.protein : 0}g protein today.
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        {Math.round((((userData && userData.todaysIntake) ? userData.todaysIntake.protein : 0) / (userData && userData.dailyGoals) ? userData.dailyGoals.protein : 0) * 100)}% of daily goal
                    </span>
                    <Link href="/restaurants">
                        <button className={linkNutrientInsight}>
                            Find protein meals <ArrowRight className="h-4 w-4 ml-1" />
                        </button>
                    </Link>
                </div>
            </CardContent>
        </Card>

        <Card cssClasses="bg-gray-50 border-gray-200">
            <CardContent>
                <h3 className="font-bold mb-2">Nutrition Tips</h3>
                <p className="text-gray-700 mb-4">
                    Try to balance your macronutrients throughout the day for sustained energy and better recovery.
                </p>
                <Link href="#">
                    <button className={linkNutrientInsight}>
                        View more tips <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                </Link>
            </CardContent>
        </Card>
    </div>
}