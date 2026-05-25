"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { heroData } from "@/constants/homepage";
import { fadeUp, fadeIn, staggerContainer, staggerItem } from "@/lib/animations/presets";
import { BookOpen, Users, Award, Clock } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 container px-4 py-20"
      >
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Badge */}
          <motion.div variants={staggerItem} className="inline-flex">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-border/50 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
              </span>
              <span className="text-sm font-medium text-foreground">
                🚀 Start your learning journey today
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={staggerItem} className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-brand-600 via-violet-600 to-brand-600 bg-clip-text text-transparent animate-gradient">
                Master New Skills
              </span>
              <br />
              <span className="text-foreground">With Expert-Led Courses</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            {heroData.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="brand-gradient" size="lg" className="shadow-lg shadow-brand-500/25">
              {heroData.cta.primary}
            </Button>
            <Button variant="outline" size="lg" className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              {heroData.cta.secondary}
            </Button>
          </motion.div>

          {/* Floating Stats Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12"
          >
            {[
              { icon: BookOpen, value: "500+", label: "Courses" },
              { icon: Users, value: "50K+", label: "Students" },
              { icon: Award, value: "98%", label: "Success Rate" },
              { icon: Clock, value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl" />
                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-lg">
                  <stat.icon className="h-6 w-6 text-brand-600 mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-20 h-20 bg-brand-500/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-10 w-32 h-32 bg-violet-500/10 rounded-full blur-xl"
      />
    </section>
  );
};

export default Hero;
