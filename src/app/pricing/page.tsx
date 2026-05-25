"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { staggerContainer, staggerItem } from "@/lib/animations/presets";
import { Check, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals getting started",
      monthlyPrice: 9,
      yearlyPrice: 90,
      features: [
        "Access to 50+ courses",
        "Basic certificates",
        "Community support",
        "Mobile app access",
      ],
      popular: false,
    },
    {
      name: "Pro",
      description: "Best for serious learners",
      monthlyPrice: 29,
      yearlyPrice: 279,
      features: [
        "Access to all 500+ courses",
        "Premium certificates",
        "Priority support",
        "Offline downloads",
        "Live workshops",
        "1-on-1 mentoring",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      monthlyPrice: 99,
      yearlyPrice: 950,
      features: [
        "Everything in Pro",
        "Custom learning paths",
        "Team analytics",
        "Dedicated account manager",
        "SSO integration",
        "Custom branding",
        "API access",
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate your billing.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. All payments are securely processed.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial on all plans. No credit card required to start your trial.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. You can cancel your subscription at any time with no questions asked. You'll retain access until the end of your billing period.",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="section-py">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <motion.h1 variants={staggerItem} className="text-h2">
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-lg text-muted-foreground"
            >
              Choose the perfect plan for your learning journey. No hidden fees, cancel anytime.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Toggle */}
      <section className="mb-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4"
          >
            <span className={`text-sm font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-16 h-8 rounded-full bg-muted p-1 transition-colors"
            >
              <motion.div
                className="absolute top-1 w-6 h-6 rounded-full bg-gradient-primary shadow-md"
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly <span className="text-brand-600 dark:text-brand-400">(Save 20%)</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-py">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {plans.map((plan, index) => (
              <motion.div key={plan.name} variants={staggerItem}>
                <Card
                  variant={plan.popular ? "glass" : "default"}
                  className={`relative ${
                    plan.popular
                      ? "border-2 border-primary shadow-2xl scale-105"
                      : "border border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-primary text-white text-xs font-medium px-4 py-1 rounded-full shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="text-center space-y-6">
                    <div>
                      <span className="text-5xl font-bold text-foreground">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                    </div>
                    <Button
                      variant={plan.popular ? "brand-gradient" : "outline"}
                      size="lg"
                      className="w-full"
                    >
                      Get Started
                    </Button>
                    <ul className="space-y-3 text-left">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <Check className="h-5 w-5 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="section-py bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 variants={staggerItem} className="text-h2 text-center mb-12">
              Compare Plans
            </motion.h2>
            <motion.div variants={staggerItem}>
              <Card variant="glass">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 px-4 text-foreground font-medium">Feature</th>
                          <th className="text-center py-4 px-4 text-foreground font-medium">Starter</th>
                          <th className="text-center py-4 px-4 text-primary font-medium">Pro</th>
                          <th className="text-center py-4 px-4 text-foreground font-medium">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { feature: "Courses", starter: "50+", pro: "500+", enterprise: "Unlimited" },
                          { feature: "Certificates", starter: "Basic", pro: "Premium", enterprise: "Custom" },
                          { feature: "Support", starter: "Community", pro: "Priority", enterprise: "Dedicated" },
                          { feature: "Mobile App", starter: "✓", pro: "✓", enterprise: "✓" },
                          { feature: "Offline Access", starter: "✗", pro: "✓", enterprise: "✓" },
                          { feature: "Live Workshops", starter: "✗", pro: "✓", enterprise: "✓" },
                          { feature: "API Access", starter: "✗", pro: "✗", enterprise: "✓" },
                          { feature: "Custom Branding", starter: "✗", pro: "✗", enterprise: "✓" },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-border/50 last:border-0">
                            <td className="py-4 px-4 text-foreground">{row.feature}</td>
                            <td className="py-4 px-4 text-center text-muted-foreground">{row.starter}</td>
                            <td className="py-4 px-4 text-center text-primary font-medium">{row.pro}</td>
                            <td className="py-4 px-4 text-center text-muted-foreground">{row.enterprise}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-py">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 variants={staggerItem} className="text-h2 text-center mb-12">
              Frequently Asked Questions
            </motion.h2>
            <motion.div variants={staggerItem} className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} variant="glass">
                  <CardContent className="p-6">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="font-medium text-foreground flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                        {faq.question}
                      </span>
                      <AnimatePresence mode="wait">
                        {openFaq === index ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </AnimatePresence>
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 text-muted-foreground">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-py">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={staggerItem}
              className="bg-gradient-primary rounded-3xl p-12 md:p-16 text-white text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join millions of learners and start your journey today with our free trial.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-brand-600 hover:bg-white/90"
              >
                Start Free Trial
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
