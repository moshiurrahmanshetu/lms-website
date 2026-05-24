import Hero from "@/components/features/Hero";
import FeaturedCourses from "@/components/features/FeaturedCourses";
import LearningBenefits from "@/components/features/LearningBenefits";
import LiveClasses from "@/components/features/LiveClasses";
import Testimonials from "@/components/features/Testimonials";
import CTA from "@/components/features/CTA";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedCourses />
      <LearningBenefits />
      <LiveClasses />
      <Testimonials />
      <CTA />
    </div>
  );
}
