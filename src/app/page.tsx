import Hero from "@/components/features/Hero";
import FeaturedCourses from "@/components/features/FeaturedCourses";
import TestimonialSlider from "@/components/features/TestimonialSlider";
import CTA from "@/components/features/CTA";
import { getFeaturedCourses } from "@/lib/queries/course-queries";

export default async function Home() {
  const featuredCourses = await getFeaturedCourses();

  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedCourses courses={featuredCourses} />
      <TestimonialSlider />
      <CTA />
    </div>
  );
}
