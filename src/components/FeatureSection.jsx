import { Clock } from "lucide-react"

export default function FeatureSection() {
    return <section className="py-16 bg-white">
        <div className="my-container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why <span className="text-[#1a5e63]">CYC</span> Is Different
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-[#f8f9fa] p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="h-12 w-12 bg-[#ffd84d]/20 rounded-full flex items-center justify-center mb-4">
                        <svg
                            className="h-6 w-6 text-[#1a5e63]"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.5 6.5H17.5V17.5H6.5V6.5Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4 11H1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4 8H2"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4 14H2"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4 17H1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 11H23"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 8H22"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 14H22"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 17H23"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Fitness-Focused</h3>
                    <p className="text-gray-600">
                        All meals are designed with optimal macronutrient ratios to support your fitness goals.
                    </p>
                </div>
                <div className="bg-[#f8f9fa] p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="h-12 w-12 bg-[#ffd84d]/20 rounded-full flex items-center justify-center mb-4">
                        <svg
                            className="h-6 w-6 text-[#1a5e63]"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 2V4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 20V22"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4 12H2"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M22 12H20"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M19.7778 4.22266L17.5558 6.25424"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M4.22217 4.22266L6.44418 6.25424"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6.44434 17.5557L4.22211 19.7779"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M19.7778 19.7773L17.5558 17.5551"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Track your Calorie</h3>
                    <p className="text-gray-600">
                        Monitor your daily calorie intake with our built-in tracking system to stay on top of your fitness
                        goals.
                    </p>
                </div>
                <div className="bg-[#f8f9fa] p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="h-12 w-12 bg-[#ffd84d]/20 rounded-full flex items-center justify-center mb-4">
                        <Clock className="h-6 w-6 text-[#1a5e63]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Convenient Delivery</h3>
                    <p className="text-gray-600">
                        Fresh meals delivered on your schedule, saving you time for what matters most.
                    </p>
                </div>
            </div>
        </div>
    </section>
}