import { Link } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import Card, { CardContent } from '../../UI/Card.jsx';
import Badge from '../../UI/Badge.jsx';
import Button from '../../UI/Button.jsx';
import { deleteUserMeal } from '../../api/deleteUserMeal.js';
import { fetchNutritionSummary } from '../../api/fetchNutritionSummary.js';
import { messageActions } from '../../store/message-slice.js';

export default function TodaysMeal({ todayMeals }) {
    const dispatch = useDispatch();

    async function handleUserFoodDelete(foodId) {
        await deleteUserMeal(foodId, dispatch);
        dispatch(messageActions.showMessage({ title: 'Delete Meal', message: 'Meal Deleted Successfully', type: 'success' }));
        dispatch(fetchNutritionSummary());
    }

    return <Card cssClasses="bg-white mb-8">
        <CardContent>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Today's Meals</h2>
                <Link to="search">
                    <Button variant="outline" size="sm" cssClasses="text-[#1a5e63] !border-[#1a5e63] login-button-hover">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Food
                    </Button>
                </Link>
            </div>

            {(!todayMeals || todayMeals.length === 0) ? (
                <div className="text-center py-8 text-gray-500">
                    <p>No meals added today</p>
                    <Link to="search" className="text-[#1a5e63] hover:underline mt-2 inline-block">
                        Add your first meal
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {todayMeals.map((meal) => (
                        <div key={meal.id} className="flex items-center gap-4 p-3 rounded-lg border border-custom">
                            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                <img src={meal.image || "/placeholder.svg"} alt={meal.name} width={64} height={64} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-medium">{meal.name}</h3>
                                        <p className="text-sm text-gray-500">{meal.time}</p>
                                    </div>
                                    <button onClick={() => handleUserFoodDelete(meal.id)} className="text-red-500 hover:text-red-700">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="flex gap-2 mt-1">
                                    <Badge variant="outline" cssClasses="bg-gray-50">
                                        {meal.calories} cal
                                    </Badge>
                                    <Badge variant="outline" cssClasses="bg-gray-50">
                                        {meal.protein}g protein
                                    </Badge>
                                    <Badge variant="outline" cssClasses="bg-gray-50">
                                        {meal.fats}g fats
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </CardContent>
    </Card>
}