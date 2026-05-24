import React from "react";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { benefits } from "@/constants/homepage";

const LearningBenefits = () => {
  return (
    <Section size="lg" className="bg-secondary/30">
      <div className="text-center space-y-4 mb-12">
        <Heading level="h2" size="xl">
          Why Choose Our Platform?
        </Heading>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience a modern approach to learning with features designed for your success
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="group p-6 rounded-lg bg-card border border-border hover:border-brand/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {benefit.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-brand transition-colors">
              {benefit.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default LearningBenefits;
