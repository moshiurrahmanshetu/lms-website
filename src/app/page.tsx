import Hero from "@/components/features/Hero";
import FeaturedCourses from "@/components/features/FeaturedCourses";
import TestimonialSlider from "@/components/features/TestimonialSlider";
import CTA from "@/components/features/CTA";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedCourses />
      <TestimonialSlider />
      <CTA />
    </div>
  );
}
