import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import {
    heroSection, heroSectionDiv, heroSectionDiv1, heroSectionH1, heroSectionP, heroSectionDiv1_1,
    heroSectionDiv2, heroSectionDiv2_1, heroSectionDiv2_2
} from "./appliedcss/MainSectionCSS";

import Button from "../UI/Button";

export default function HeroSection() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/track-calories');
    }

    return <section className={heroSection}>
        <div className={heroSectionDiv}>
            <div className={heroSectionDiv1}>
                <h1 className={heroSectionH1}>
                    Fuel Your <span className="text-[#1a5e63]">Fitness</span> Journey
                </h1>
                <p className={heroSectionP}>
                    Discover healthier bites near you, we deliver them fresh to your door.
                </p>
                <div className={heroSectionDiv1_1}>
                    <Button variant="default" size="lg" cssClasses="!bg-[#1a5e63] order-button-hover">View Menu</Button>
                    <Button variant="outline" size="lg" cssClasses="group !border-[#1a5e63] !text-[#1a5e63] login-button-hover" onClick={handleClick}>Track Your Calorie</Button>
                </div>
            </div>
            <div className={heroSectionDiv2}>
                <div className={heroSectionDiv2_1}>
                    <img src="/placeholder.svg?height=800&width=600" alt="Healty meal Preparation" className="w-full h-full object-cover" />
                </div>
                <div className={heroSectionDiv2_2}>
                    <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-[#ffd84d] fill-[#ffd84d]" />
                        <span className="font-bold">4.9</span>
                        <span className="text-gray-500">(2.5k+ reviews)</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
}