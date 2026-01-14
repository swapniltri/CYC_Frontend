import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Calculator, User, Scale, TrendingUp } from 'lucide-react';

import { Tabs, TabsList, TabsContent, TabsTrigger } from '../../UI/Tabs.jsx';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../UI/Card.jsx';
import { Select, SelectGroup, SelectValue, SelectTrigger, SelectScrollUpButton, SelectScrollDownButton, SelectContent, SelectItem } from '../../UI/Select.jsx';
import { RadioGroup, RadioGroupItem } from '../../UI/RadioGroup.jsx';
import { Label } from '../../UI/Label.jsx';
import Input from '../../UI/Input.jsx';
import Button from '../../UI/Button.jsx';
import { calculateNutrientsAction } from '../../store/calculateNutrients-slice.js';
import { calculateNutritionGoals } from '../../helper/CalculateNutritionGoalsHelper.js';
import { messageActions } from '../../store/message-slice.js'
import { saveUserGoals, getUserGoals } from '../../api/userGoals.js';

export default function SetGoals() {
    const dispatch = useDispatch();
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const { previouslySetUpGoals, manualCalorieEntered, manualProteinEntered, manualFatEntered, currentWeight, currentHeight, targetWeight, age, gender, activityLevel, goal, calculatedGoals } = useSelector(state => state.calculateNutrients);

    useEffect(() => {
        const fetchUserGoals = async () => {
            const data = await getUserGoals(dispatch);

            if (data) {
                dispatch(calculateNutrientsAction.setPreviouslySetUpGoals({
                    calories: data.calories,
                    protein: data.protein,
                    fats: data.fats
                }));
                dispatch(calculateNutrientsAction.setManualCalorieEntered(data.calories));
                dispatch(calculateNutrientsAction.setManualProteinEntered(data.protein));
                dispatch(calculateNutrientsAction.setManualFatEntered(data.fats));
            } else {
                dispatch(calculateNutrientsAction.setPreviouslySetUpGoals({
                    calories: null,
                    protein: null,
                    fats: null
                }));
                dispatch(calculateNutrientsAction.setManualCalorieEntered(null));
                dispatch(calculateNutrientsAction.setManualProteinEntered(null));
                dispatch(calculateNutrientsAction.setManualFatEntered(null));
            }
        }

        fetchUserGoals();
    }, [refreshTrigger]);

    function handleAgeChange(age) {
        dispatch(calculateNutrientsAction.setAge(age));
    }

    function handleGenderChange(gender) {
        dispatch(calculateNutrientsAction.setGender(gender));
    }

    function handleCurrentWeightChange(currWeight) {
        dispatch(calculateNutrientsAction.setCurrentWeight(currWeight));
    }

    function handleHeightChange(height) {
        dispatch(calculateNutrientsAction.setCurrentHeight(height));
    }

    function handleTargetWeightChange(targetWeight) {
        dispatch(calculateNutrientsAction.setTargetWeight(targetWeight));
    }

    function handleActivityChange(activity) {
        dispatch(calculateNutrientsAction.setActivityLevel(activity));
    }

    function handleGoalChange(goal) {
        dispatch(calculateNutrientsAction.setGoal(goal));
    }

    function handleManualCalorieChange(calorie) {
        dispatch(calculateNutrientsAction.setManualCalorieEntered(calorie));
    }

    function handleManualProteinChange(protein) {
        dispatch(calculateNutrientsAction.setManualProteinEntered(protein));
    }

    function handleManualFatChange(fat) {
        dispatch(calculateNutrientsAction.setManualFatEntered(fat));
    }

    function handleCalculateNutritionGoals() {
        const calculatedNutritionGoals = calculateNutritionGoals(currentWeight, currentHeight, targetWeight, age, gender, activityLevel, goal, dispatch);
        dispatch(calculateNutrientsAction.setCalculatedNutritionGoals(calculatedNutritionGoals));
        dispatch(messageActions.showMessage({
            title: 'Goals Calculated!',
            message: 'Your personalized nutrition goals have been calculated based on your metrics.',
            type: 'success'
        }));
    }

    function handleSaveManualGoals() {
        if (!manualCalorieEntered || !manualProteinEntered || !manualFatEntered || manualCalorieEntered === "" || manualProteinEntered === "" || manualFatEntered === "") {
            dispatch(messageActions.showMessage({
                title: 'Missing Values!',
                message: 'Please enter all nutrition values.',
                type: 'error'
            }));
        }
        const caloriesNum = Number.parseInt(manualCalorieEntered);
        const proteinNum = Number.parseInt(manualProteinEntered);
        const fatsNum = Number.parseInt(manualFatEntered);

        if (caloriesNum < 1000 || caloriesNum > 5000) {
            dispatch(messageActions.showMessage({
                title: 'Unusual Calorie Goal!',
                message: 'Your calorie goal seems unusual. Please double-check.',
                type: 'error'
            }));
            return
        }

        saveUserGoals(caloriesNum, proteinNum, fatsNum, dispatch, previouslySetUpGoals?.calories ? "update" : "save");
    }

    function resetAllValues() {
        dispatch(calculateNutrientsAction.resetAll());
    }

    function handleSaveCalculatedGoals() {
        const caloriesNum = Number.parseInt(calculatedGoals.calories);
        const proteinNum = Number.parseInt(calculatedGoals.protein);
        const fatsNum = Number.parseInt(calculatedGoals.fats);

        if (caloriesNum < 1000 || caloriesNum > 5000) {
            dispatch(messageActions.showMessage({
                title: 'Unusual Calorie Goal!',
                message: 'Your calorie goal seems unusual. Please double-check.',
                type: 'error'
            }));
            return
        }

        saveUserGoals(caloriesNum, proteinNum, fatsNum, dispatch, previouslySetUpGoals?.calories ? "update" : "save");
        setTimeout(() => {
            setRefreshTrigger(prev => !prev);
        }, 1000);
    }

    // if (!previouslySetUpGoals) {
    //     return <div>Loading...</div>
    // }

    return <main className="flex-1 py-8">
        <div className="my-container max-w-4xl">
            <Link
                to="/track-calories"
                onClick={resetAllValues}
                className="inline-flex items-center text-[#1a5e63] hover:underline mb-6"
            >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Nutrition Tracker
            </Link>

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Set Your Nutrition Goals</h1>
                <p className="text-gray-600">
                    Define your daily nutrition targets to fuel your fitness journey effectively
                </p>
            </div>

            <Tabs defaultValue="manual" className="w-full">
                <TabsList cssClasses="!grid !w-full !grid-cols-2 !mb-8">
                    <TabsTrigger value="manual" cssClasses="!flex !items-center !gap-2">
                        <Target className="h-4 w-4" />
                        Set Manual Goals
                    </TabsTrigger>
                    <TabsTrigger value="calculate" cssClasses="!flex !items-center !gap-2">
                        <Calculator className="h-4 w-4" />
                        Calculate Goals
                    </TabsTrigger>
                </TabsList>

                {/* Manual Goal Tab */}
                <TabsContent value="manual">
                    <Card>
                        <CardHeader>
                            <CardTitle cssClasses="!flex !items-center !gap-2">
                                <Target className="h-5 w-5 text-[#1a5e63]" />
                                Set Your Daily Nutrition Goals
                            </CardTitle>
                            <p className="text-gray-600">If you already know your target macros, enter them directly below.</p>
                        </CardHeader>
                        <CardContent cssClasses="!space-y-6">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="calories" cssClasses="!flex !items-center !gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#1a5e63]"></div>
                                        Daily Calories
                                    </Label>
                                    <Input
                                        id="calories"
                                        type="number"
                                        placeholder="2000"
                                        cssClasses="!text-center !text-lg !font-semibold"
                                        value={!manualCalorieEntered ? "" : manualCalorieEntered}
                                        onChange={(e) => handleManualCalorieChange(e.target.value)}
                                    />
                                    <p className="text-xs text-gray-500 text-center">Recommended: 1500-3000</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="protein" cssClasses="!flex !items-center !gap-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                        Daily Protein (g)
                                    </Label>
                                    <Input
                                        id="protein"
                                        type="number"
                                        placeholder="150"
                                        cssClasses="!text-center !text-lg !font-semibold"
                                        value={!manualProteinEntered ? "" : manualProteinEntered}
                                        onChange={(e) => handleManualProteinChange(e.target.value)}
                                    />
                                    <p className="text-xs text-gray-500 text-center">Recommended: 1.6-2.2g per kg</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="fats" cssClasses="!flex !items-center !gap-2">
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        Daily Fats (g)
                                    </Label>
                                    <Input
                                        id="fats"
                                        type="number"
                                        placeholder="70"
                                        cssClasses="!text-center !text-lg !font-semibold"
                                        value={!manualFatEntered ? "" : manualFatEntered}
                                        onChange={(e) => handleManualFatChange(e.target.value)}
                                    />
                                    <p className="text-xs text-gray-500 text-center">Recommended: 20-35% of calories</p>
                                </div>
                            </div>
                            <div className="bg-[#ffd84d]/10 p-4 rounded-lg border border-[#ffd84d]/20">
                                <h4 className="font-semibold text-[#1a5e63] mb-2">Quick Guidelines:</h4>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>
                                        • <strong>Protein:</strong> 1.6-2.2g per kg body weight for active individuals
                                    </li>
                                    <li>
                                        • <strong>Fats:</strong> 20-35% of total daily calories
                                    </li>
                                    <li>
                                        • <strong>Carbs:</strong> Fill remaining calories after protein and fat
                                    </li>
                                </ul>
                            </div>
                            <Button
                                variant="default"
                                size="default"
                                cssClasses="w-full !bg-[#1a5e63] order-button-hover"
                                onClick={handleSaveManualGoals}
                            >
                                {previouslySetUpGoals?.calories ? "Update My Goals" : "Save My Goals"}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Calculate User Goal Tab */}
                <TabsContent value="calculate">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle cssClasses="!flex !items-center !gap-2">
                                    <User className="h-5 w-5 text-[#1a5e63]" />
                                    Personal Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent cssClasses="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label>Age</Label>
                                        <Input
                                            type="number"
                                            placeholder="25"
                                            value={age}
                                            onChange={(e) => handleAgeChange(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>Gender</Label>
                                        <Select
                                            value={gender}
                                            onValueChange={(value) => handleGenderChange(value)}
                                        >
                                            <SelectTrigger cssClasses="!w-full">
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle cssClasses="!flex !items-center !gap-2">
                                    <Scale className="h-5 w-5 text-[#1a5e63]" />
                                    Body Metrics
                                </CardTitle>
                            </CardHeader>
                            <CardContent cssClasses="space-y-4">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Label>Current Weight (kg)</Label>
                                        <Input
                                            type="number"
                                            placeholder="70"
                                            value={currentWeight}
                                            onChange={(e) => handleCurrentWeightChange(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>Height (cm)</Label>
                                        <Input
                                            type="number"
                                            placeholder="175"
                                            value={currentHeight}
                                            onChange={(e) => handleHeightChange(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>Target Weight (kg)</Label>
                                        <Input
                                            type="number"
                                            placeholder="65"
                                            value={targetWeight}
                                            onChange={(e) => handleTargetWeightChange(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle cssClasses="!flex !items-center !gap-2">
                                    <TrendingUp className="h-5 w-5 text-[#1a5e63]" />
                                    Activity & Goals
                                </CardTitle>
                            </CardHeader>
                            <CardContent cssClasses="!space-y-6 !pt-0">
                                <div className="flex flex-col gap-4">
                                    <Label cssClasses="font-medium">Activity Level</Label>
                                    <RadioGroup
                                        value={activityLevel}
                                        onValueChange={(value) => handleActivityChange(value)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="sedentary" id="sedentary" />
                                            <Label htmlFor="sedentary" cssClasses="cursor-pointer">
                                                <div>
                                                    <div className="font-medium">Sedentary</div>
                                                    <div className="text-sm text-gray-500">Little to no exercise</div>
                                                </div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="light" id="light" />
                                            <Label htmlFor="light" cssClasses="cursor-pointer">
                                                <div>
                                                    <div className="font-medium">Light Activity</div>
                                                    <div className="text-sm text-gray-500">Light exercise 1-3 days/week</div>
                                                </div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="moderate" id="moderate" />
                                            <Label htmlFor="moderate" cssClasses="cursor-pointer">
                                                <div>
                                                    <div className="font-medium">Moderate Activity</div>
                                                    <div className="text-sm text-gray-500">Moderate exercise 3-5 days/week</div>
                                                </div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="active" id="active" />
                                            <Label htmlFor="active" cssClasses="cursor-pointer">
                                                <div>
                                                    <div className="font-medium">Very Active</div>
                                                    <div className="text-sm text-gray-500">Hard exercise 6-7 days/week</div>
                                                </div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="very-active" id="very-active" />
                                            <Label htmlFor="very-active" cssClasses="cursor-pointer">
                                                <div>
                                                    <div className="font-medium">Extremely Active</div>
                                                    <div className="text-sm text-gray-500">Very hard exercise, physical job</div>
                                                </div>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Label cssClasses="font-medium">Primary Goal</Label>
                                    <RadioGroup
                                        value={goal}
                                        onValueChange={(value) => handleGoalChange(value)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="lose" id="lose" />
                                            <Label htmlFor="lose" cssClasses="cursor-pointer">
                                                <div>
                                                    <div className="font-medium">Lose Weight</div>
                                                    <div className="text-sm text-gray-500">Create a calorie deficit</div>
                                                </div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="gain" id="gain" />
                                            <Label htmlFor="gain" cssClasses="cursor-pointer">
                                                <div>
                                                    <div className="font-medium">Gain Weight/Muscle</div>
                                                    <div className="text-sm text-gray-500">Create a calorie surplus</div>
                                                </div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="maintain" id="maintain" />
                                            <Label htmlFor="maintain" cssClasses="cursor-pointer">
                                                <div>
                                                    <div className="font-medium">Maintain Weight</div>
                                                    <div className="text-sm text-gray-500">Eat at maintenance calories</div>
                                                </div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="recomp" id="recomp" />
                                            <Label htmlFor="recomp" cssClasses="cursor-pointer">
                                                <div>
                                                    <div className="font-medium">Body Recomposition</div>
                                                    <div className="text-sm text-gray-500">Lose fat while gaining muscle</div>
                                                </div>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </CardContent>
                        </Card>

                        <Button
                            variant="default"
                            size="default"
                            cssClasses="w-full !bg-[#1a5e63] order-button-hover"
                            onClick={handleCalculateNutritionGoals}
                        >
                            <Calculator className="h-4 w-4 mr-2" />
                            Calculate My Nutrition Goals
                        </Button>

                        {calculatedGoals &&
                            <Card cssClasses="!border-[#1a5e63]/20 !bg-[#1a5e63]/5">
                                <CardHeader>
                                    <CardTitle cssClasses="!text-[#1a5e63]">Your Calculated Nutrition Goals</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                                        <div className="text-center p-4 bg-white rounded-lg border border-custom">
                                            <div className="text-2xl font-bold text-[#1a5e63]">{calculatedGoals.calories}</div>
                                            <div className="text-sm text-gray-600">Calories</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-lg border border-custom">
                                            <div className="text-2xl font-bold text-blue-600">{calculatedGoals.protein}g</div>
                                            <div className="text-sm text-gray-600">Protein</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-lg border border-custom">
                                            <div className="text-2xl font-bold text-yellow-600">{calculatedGoals.fats}g</div>
                                            <div className="text-sm text-gray-600">Fats</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-lg border border-custom">
                                            <div className="text-2xl font-bold text-green-600">{calculatedGoals.carbs}g</div>
                                            <div className="text-sm text-gray-600">Carbs</div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="default"
                                        size="default"
                                        cssClasses="w-full !bg-[#1a5e63] order-button-hover"
                                        onClick={handleSaveCalculatedGoals}
                                    >
                                        {previouslySetUpGoals?.calories ? "Update My Goals" : "Save My Goals"}
                                    </Button>
                                </CardContent>
                            </Card>
                        }
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </main>
}