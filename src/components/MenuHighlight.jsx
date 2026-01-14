import Button from "../UI/Button";
import { viewFullMenuButton, addToCartButton } from "./appliedcss/MainSectionCSS";

export default function MenuHighlight() {
    return <section className="py-16 bg-[#f8f9fa]">
        <div className="my-container">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Popular <span className="text-[#1a5e63]">Meals</span>
                </h2>
                <Button variant="outline" size="default" cssClasses="mt-4 md:mt-0 !border-[#1a5e63] !text-[#1a5e63] login-button-hover" >View Full Menu</Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                        name: "Protein Power Bowl",
                        description: "Grilled chicken, quinoa, avocado, and vegetables with our signature sauce.",
                        calories: 450,
                        protein: 35,
                        price: 12.99,
                    },
                    {
                        name: "Muscle Builder Plate",
                        description: "Grass-fed steak, sweet potatoes, and steamed broccoli with herbs.",
                        calories: 520,
                        protein: 42,
                        price: 14.99,
                    },
                    {
                        name: "Lean Green Machine",
                        description: "Plant-based protein with a mix of superfoods and our tahini dressing.",
                        calories: 380,
                        protein: 25,
                        price: 11.99,
                    },
                ].map((meal, index) => (
                    <div
                        key={index}
                        className="bg-white border border-custom rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="h-48 relative">
                            <img src="/placeholder.svg?height=400&width=600" alt={meal.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{meal.name}</h3>
                            <p className="text-gray-600 mb-4">{meal.description}</p>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex gap-4">
                                    <span className="text-sm">{meal.calories} cal</span>
                                    <span className="text-sm">{meal.protein}g protein</span>
                                </div>
                                <span className="font-bold">${meal.price}</span>
                            </div>
                            <Button variant="default" size="default" cssClasses="w-full !bg-[#1a5e63] order-button-hover">Add to Cart</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
}