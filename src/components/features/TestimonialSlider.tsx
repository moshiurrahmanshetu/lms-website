"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  course: string;
  avatar: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    course: "Full-Stack Development Bootcamp",
    avatar: "SC",
    rating: 5,
    text: "LMS Platform completely transformed my career. The courses are incredibly well-structured and the community support is unmatched. I went from knowing nothing about coding to landing my dream job at Google in just 8 months.",
  },
  {
    name: "Michael Rodriguez",
    role: "Data Scientist",
    course: "Data Science & Machine Learning",
    avatar: "MR",
    rating: 5,
    text: "The practical projects and real-world case studies made all the difference. I wasn't just learning theory – I was building actual skills that employers value. The mentorship program was invaluable.",
  },
  {
    name: "Emily Watson",
    role: "UX Designer",
    course: "UI/UX Design Masterclass",
    avatar: "EW",
    rating: 5,
    text: "The design thinking methodologies I learned here completely changed how I approach problems. The feedback from instructors and peers helped me refine my portfolio and land interviews at top tech companies.",
  },
  {
    name: "James Wilson",
    role: "Entrepreneur",
    course: "Entrepreneurship Fundamentals",
    avatar: "JW",
    rating: 5,
    text: "I built a startup that raised $2M in funding after completing this course. The business frameworks and networking opportunities were game-changers for my entrepreneurial journey.",
  },
  {
    name: "Lisa Park",
    role: "Research Scientist",
    course: "Advanced Machine Learning",
    avatar: "LP",
    rating: 5,
    text: "Published research paper in top AI conference thanks to the advanced concepts and hands-on projects. The instructors are world-class and always available for guidance.",
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  // Memoize testimonials to prevent unnecessary rerenders
  const memoizedTestimonials = useMemo(() => testimonials, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % memoizedTestimonials.length);
  }, [memoizedTestimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + memoizedTestimonials.length) % memoizedTestimonials.length);
  }, [memoizedTestimonials.length]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Autoplay
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, 7000);
      return () => clearInterval(interval);
    }
  }, [isPaused, nextSlide]);

  // Touch swipe support
  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -10000) {
      nextSlide();
    } else if (swipe > 10000) {
      prevSlide();
    }
  };

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <section className="section-py bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-h2 mb-4">What Our Students Say</h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of successful learners who transformed their careers
            </p>
          </div>

          {/* Slider */}
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 500, damping: 20 },
                    opacity: { duration: 0.25 },
                    scale: { duration: 0.25 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={handleDragEnd}
                  className="relative will-change-transform"
                  style={{ willChange: "transform, opacity" }}
                >
                  <Card 
                    variant="default" 
                    className="p-8 md:p-12 shadow-2xl border border-border/50 bg-glass-bg backdrop-blur-md hover:shadow-2xl hover:translate-y-0 hover:border-border/50"
                  >
                    <CardContent className="pt-6">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(memoizedTestimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-medium">
                        "{memoizedTestimonials[currentIndex].text}"
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
                          {memoizedTestimonials[currentIndex].avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">
                            {memoizedTestimonials[currentIndex].name}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {memoizedTestimonials[currentIndex].role} • {memoizedTestimonials[currentIndex].course}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2  -translate-x-1 md:-translate-x-14 bg-white/10 dark:bg-slate-800/95 backdrop-blur-md border-2 border-border shadow-xl hover:shadow-2xl hover:bg-white/20 dark:hover:bg-slate-700/95 hover:border-brand/50 transition-all duration-300 z-20"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2  translate-x-1 md:translate-x-14 bg-white/10 dark:bg-slate-800/95 backdrop-blur-md border-2 border-border shadow-xl hover:shadow-2xl hover:bg-white/20 dark:hover:bg-slate-700/95 hover:border-brand/50 transition-all duration-300 z-20"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {memoizedTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
