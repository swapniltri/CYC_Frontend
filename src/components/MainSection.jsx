import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import MenuHighlight from "./MenuHighlight";

export default function MainSection() {
    return <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <MenuHighlight />
    </main>
}