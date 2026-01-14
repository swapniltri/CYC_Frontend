import { ArrowLeft, Search, Clock, Check, Plus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../../UI/Input.jsx';
import Button from '../../UI/Button.jsx';
import FoodCard from './FoodCard.jsx';
import {
    Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter,
    DialogTitle, DialogDescription
} from '../../UI/Dialog.jsx';
import {
    Select, SelectGroup, SelectValue, SelectTrigger, SelectScrollUpButton, SelectScrollDownButton, SelectContent, SelectItem
} from '../../UI/Select.jsx';
import { foodSearchActions } from '../../store/foodSearch-slice.js';
import { foodSelectActions } from '../../store/foodSelect-slice.js';
import { foodSearch } from '../../api/foodSearch.js';
import { calculateNutrientsPerFood } from '../../api/calculateNutrientsPerFood.js';
import { addToMyMeal } from '../../api/addToMyMeal.js';

// Sample food database
const foodDatabase = [
    {
        id: "1",
        name: "Chicken Breast",
        image: "https://www.edamam.com/food-img/da5/da510379d3650787338ca16fb69f4c94.jpg",
        category: ["Protein"],
        nutrients: {
            calories: { per100g: 165, perServing: 275 },
            protein: { per100g: 31, perServing: 52 },
            fats: { per100g: 3.6, perServing: 6 },
        },
        units: [{
            unit: "g",
            amountOptions: [100, 200, 300]
        }],
        popular: true,
    },
    {
        id: "2",
        name: "Brown Rice",
        image: "https://www.edamam.com/food-img/9e6/9e6d4be8790db75855b4e971b0cad269.jpg",
        category: ["Carbs"],
        nutrients: {
            calories: { per100g: 112, perServing: 218 },
            protein: { per100g: 2.6, perServing: 5 },
            fats: { per100g: 0.9, perServing: 1.8 },
        },
        units: [{
            unit: "g",
            amountOptions: [100, 200, 300]
        }],
        popular: true,
    },
    {
        id: "3",
        name: "Avocado",
        image: "https://www.edamam.com/food-img/984/984a707ea8e9c6bf5f6498970a9e6d9d.jpg",
        category: ["Fats"],
        nutrients: {
            calories: { per100g: 160, perServing: 240 },
            protein: { per100g: 2, perServing: 3 },
            fats: { per100g: 15, perServing: 22 },
        },
        units: [{
            unit: "g",
            amountOptions: [100, 200, 300]
        }],
        popular: true,
    },
    {
        id: "4",
        name: "Salmon",
        image: "https://www.edamam.com/food-img/9a0/9a0f38422e9f21dcedbc2dca0d8209ac.jpg",
        category: ["Protein"],
        nutrients: {
            calories: { per100g: 208, perServing: 367 },
            protein: { per100g: 20, perServing: 35 },
            fats: { per100g: 13, perServing: 23 },
        },
        units: [{
            unit: "g",
            amountOptions: [100, 200, 300]
        }],
        popular: true,
    },
    {
        id: "5",
        name: "Sweet Potato",
        image: "https://www.edamam.com/food-img/b66/b660e3d37b4ea9d58cb98e8ea73933b6.jpg",
        category: ["Carbs"],
        nutrients: {
            calories: { per100g: 86, perServing: 180 },
            protein: { per100g: 1.6, perServing: 3.3 },
            fats: { per100g: 0.1, perServing: 0.2 },
        },
        units: [{
            unit: "g",
            amountOptions: [100, 200, 300]
        }],
        popular: true,
    },
    {
        id: "6",
        name: "Greek Yogurt",
        image: "https://www.edamam.com/food-img/689/6891387401f579242e7303ce8ec00e18.jpg",
        category: ["Protein"],
        nutrients: {
            calories: { per100g: 59, perServing: 147 },
            protein: { per100g: 10, perServing: 25 },
            fats: { per100g: 0.4, perServing: 1 },
        },
        units: [{
            unit: "g",
            amountOptions: [100, 200, 300]
        }],
        popular: true,
    },
    {
        id: "7",
        name: "Quinoa",
        image: "https://www.edamam.com/food-img/b62/b622239a214b3bd9f63c8e93e6e9cde6.jpg",
        category: ["Carbs"],
        nutrients: {
            calories: { per100g: 120, perServing: 222 },
            protein: { per100g: 4.4, perServing: 8.1 },
            fats: { per100g: 1.9, perServing: 3.5 },
        },
        units: ["g", "cup", "serving"],
        popular: false,
    },
    {
        id: "8",
        name: "Almonds",
        image: "https://www.edamam.com/food-img/6c2/6c2dc21adf11afc4c8d390ee2f651e56.jpg",
        category: ["Fats"],
        nutrients: {
            calories: { per100g: 579, perServing: 162 },
            protein: { per100g: 21, perServing: 6 },
            fats: { per100g: 49, perServing: 14 },
        },
        units: [{
            unit: "g",
            amountOptions: [100, 200, 300]
        }],
        popular: true,
    },
    {
        id: "9",
        name: "Broccoli",
        image: "https://www.edamam.com/food-img/3e4/3e47317a3dd54dc911b9c44122285df1.jpg",
        category: ["Vegetables"],
        nutrients: {
            calories: { per100g: 34, perServing: 55 },
            protein: { per100g: 2.8, perServing: 4.5 },
            fats: { per100g: 0.4, perServing: 0.6 },
        },
        units: ["g", "cup", "serving"],
        popular: false,
    },
    {
        id: "10",
        name: "Eggs",
        image: "https://www.edamam.com/food-img/a7e/a7ec7c337cb47c6550b3b118e357f077.jpg",
        category: ["Protein"],
        nutrients: {
            calories: { per100g: 155, perServing: 78 },
            protein: { per100g: 13, perServing: 6.5 },
            fats: { per100g: 11, perServing: 5.5 },
        },
        units: [{
            unit: "g",
            amountOptions: [100, 200, 300]
        }],
        popular: true,
    },
];

const recentSearches = ["Chicken", "Protein", "Rice", "Avocado"];

export default function FoodSearch() {
    const dispatch = useDispatch();
    const { searchedItem: searchQuery, searchResult, loading, error } = useSelector(state => state.foodSearch);
    const { selectedFood, foodUnit, foodQuantity, foodUnitAmountArray, foodCalculatedNutrients, foodDialogOpen, foodAddedToMeals } = useSelector(state => state.foodSelect);

    function setSearchQuery(e) {
        dispatch(foodSearchActions.updateSearchedItem({ searchedItem: e }));
    }

    function handleFoodDialogClose() {
        dispatch(foodSelectActions.deleteSelectedItem());
    }

    function calculateNutrients() {
        if (!selectedFood) return;

        const foodDetails = {
            foodName: selectedFood.name,
            foodUnit: foodUnit,
            foodAmount: foodQuantity
        };

        dispatch(calculateNutrientsPerFood(foodDetails));
    }

    function handleSearchFood() {
        dispatch(foodSearch(searchQuery));
    }

    function handleUnitChangeInDialog(value) {
        dispatch(foodSelectActions.updateUnitSelectInDialog({ unit: value }));
    }

    function handleQuantityChangeInDialog(value) {
        dispatch(foodSelectActions.updateUnitAmountSelectInDialog({ amount: value }));
    }

    function handleAddToMyMealClick() {
        const foodDetails = {
            searchedFoodName: searchQuery,
            foodName: selectedFood.name,
            foodUnit: foodUnit,
            foodAmount: foodQuantity,

        }

        const nutrientsToBeAdded = {
            calories: foodCalculatedNutrients.calories,
            protein: foodCalculatedNutrients.protein,
            fats: foodCalculatedNutrients.fats
        }

        addToMyMeal(foodDetails, nutrientsToBeAdded, dispatch);
    }

    function clearSearchedItem() {
        dispatch(foodSearchActions.clearSearchResult());
    }

    return <main className="flex-1 py-8">
        <div className="my-container max-w-4xl">
            <Link
                to="/track-calories"
                onClick={clearSearchedItem}
                className="inline-flex items-center text-[#1a5e63] hover:underline mb-6">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Nutrition Tracker
            </Link>

            <h1 className="text-3xl font-bold mb-8">Food Search</h1>

            {/* Search Bar */}
            <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                    placeholder="Search for food items..."
                    cssClasses="pl-10 pr-12 border-gray-200 focus-visible:ring-[#1a5e63]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                    variant="default"
                    size="default"
                    cssClasses="absolute right-0 top-1/2 -translate-y-1/2 !bg-[#1a5e63] hover:!bg-[#0f4a4e] !px-6 !py-1 !rounded-l-none !border-l-0 !w-20"
                    onClick={handleSearchFood}
                >
                    Search
                </Button>
            </div>

            {/* Recent Searches */}
            {/* {searchQuery === "" && (
                <> */}
            <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Recent Searches</h2>
                <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            cssClasses="!rounded-full"
                            onClick={() => { }}
                        >
                            <Clock className="h-3 w-3 mr-1" />
                            {search}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Popular Foods */}
            {loading && <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>}

            {!loading && searchResult.length === 0 &&
                <div>
                    <h2 className="text-lg font-bold mb-4">Popular Foods</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {foodDatabase.filter((food) => food.popular).map((food) => (
                            <FoodCard key={food.id} food={food} />
                        ))}
                    </div>
                </div>
            }

            {!loading && searchResult.length > 0 &&
                <div>
                    <h2 className="text-lg font-bold mb-4">Popular Foods</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {searchResult.map((food) => (
                            <FoodCard key={food.id} food={food} />
                        ))}
                    </div>
                </div>
            }

            {error && <p className="text-red-500">{error}</p>}

            {/* </>
            )} */}

            {/* {searchQuery !== "" && (
                <div>
                    <h2 className="text-lg font-bold mb-4">
                        {searchResult.length > 0 ? `Search Results (${searchResult.length})` : "No results found"}
                    </h2>

                    {searchResult.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {searchResult.map((food) => (
                                <FoodCard key={food.id} food={food} />
                            ))}
                        </div>
                    )}
                </div>
            )} */}

            {/* Food Detail Dialog */}
            <Dialog open={foodDialogOpen} onOpenChange={handleFoodDialogClose} >
                <DialogContent cssClasses="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{selectedFood?.name || 'Food Details'}</DialogTitle>
                    </DialogHeader>

                    {selectedFood && (
                        <div className="space-y-4">
                            <div className="h-48 relative rounded-md overflow-hidden">
                                <img
                                    src={selectedFood.image || "/placeholder.svg"}
                                    alt={selectedFood.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Measurement</label>
                                    <Select value={foodUnit} onValueChange={(value) => handleUnitChangeInDialog(value)}>
                                        <SelectTrigger cssClasses="w-full">
                                            <SelectValue placeholder="Select unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {selectedFood.units.map((unit) => (
                                                <SelectItem key={unit.unit} value={unit.unit}>
                                                    {unit.unit}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Quantity</label>
                                    <Select value={foodQuantity} onValueChange={(value) => handleQuantityChangeInDialog(value)}>
                                        <SelectTrigger cssClasses="w-full">
                                            <SelectValue placeholder="Select quantity" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {foodUnitAmountArray.map((qty) => (
                                                <SelectItem key={qty} value={qty.toString()}>
                                                    {qty}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Button onClick={calculateNutrients} cssClasses="w-full !bg-[#1a5e63] order-button-hover">
                                Calculate Nutrients
                            </Button>

                            {foodCalculatedNutrients && (
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="font-medium mb-2">Nutrition Information</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="bg-white p-2 rounded border border-custom text-center">
                                            <div className="text-sm text-gray-500">Calories</div>
                                            <div className="font-bold">{foodCalculatedNutrients.calories}</div>
                                        </div>
                                        <div className="bg-white p-2 rounded border border-custom text-center">
                                            <div className="text-sm text-gray-500">Protein</div>
                                            <div className="font-bold">{foodCalculatedNutrients.protein}g</div>
                                        </div>
                                        <div className="bg-white p-2 rounded border border-custom text-center">
                                            <div className="text-sm text-gray-500">Fats</div>
                                            <div className="font-bold">{foodCalculatedNutrients.fats}g</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <DialogFooter>
                                {foodCalculatedNutrients && (
                                    <Button onClick={handleAddToMyMealClick} cssClasses="w-full !bg-[#1a5e63] order-button-hover" disabled={foodAddedToMeals}>
                                        {foodAddedToMeals ? (
                                            <>
                                                <Check className="h-4 w-4 mr-2" />
                                                Added to Meals
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add to My Meals
                                            </>
                                        )}
                                    </Button>
                                )}
                            </DialogFooter>

                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    </main>
}