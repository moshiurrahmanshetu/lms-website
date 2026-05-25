import React from "react";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ctaData } from "@/constants/homepage";

const CTA = () => {
  return (
    <Section size="xl" centered>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-dark p-12 md:p-16 text-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
          <Heading level="h2" size="display" className="text-brand-foreground">
            {ctaData.title}
          </Heading>
          <p className="text-xl text-brand-foreground/90 leading-relaxed">
            {ctaData.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="default" size="lg" className="text-brand hover:bg-white/90">
              {ctaData.primary}
            </Button>
            <Button variant="outline" size="lg" className="border-white text-brand-foreground hover:bg-white/10">
              {ctaData.secondary}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CTA;
