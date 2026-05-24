import React from "react";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { heroData } from "@/constants/homepage";

const Hero = () => {
  return (
    <Section size="xl" centered>
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-medium animate-fade-in">
          🚀 Start your learning journey today
        </div>

        {/* Heading */}
        <Heading level="h1" size="display" className="animate-slide-up">
          {heroData.title}
        </Heading>

        {/* Description */}
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-slide-up animation-delay-200">
          {heroData.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
          <Button variant="brand" size="lg">
            {heroData.cta.primary}
          </Button>
          <Button variant="outline" size="lg">
            {heroData.cta.secondary}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border animate-fade-in animation-delay-600">
          {heroData.stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add custom animations to globals.css */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </Section>
  );
};

export default Hero;
