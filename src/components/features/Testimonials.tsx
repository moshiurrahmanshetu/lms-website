import React from "react";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/constants/homepage";

const Testimonials = () => {
  return (
    <Section size="lg" className="bg-secondary/30">
      <div className="text-center space-y-4 mb-12">
        <Heading level="h2" size="xl">
          What Our Learners Say
        </Heading>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of satisfied learners who have transformed their careers
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} variant="elevated" className="group hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 hover-glow">
            <CardContent className="p-6 space-y-4">
              {/* Rating */}
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 group-hover:scale-110 transition-transform duration-300">⭐</span>
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed italic group-hover:text-foreground transition-colors duration-300">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground group-hover:text-brand transition-colors duration-300">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;
