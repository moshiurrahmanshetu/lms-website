"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { heroData } from "@/constants/homepage";
import { fadeUp, fadeIn, staggerContainer, staggerItem } from "@/lib/animations/presets";
import { BookOpen, Users, Award, Clock, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
     
      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-400/30 dark:from-brand-600/20 to-violet-400/30 dark:to-violet-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-violet-400/30 dark:from-violet-600/20 to-brand-400/30 dark:to-brand-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "10s", animationDelay: "2s" }} />
      </div>

      {/* Subtle Grid Pattern - Light Mode */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-50 dark:opacity-0 z-0" />
      
      {/* Subtle Grid Pattern - Dark Mode */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4755690f_1px,transparent_1px),linear-gradient(to_bottom,#4755690f_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 dark:opacity-20 z-0" />

      {/* Large Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/20 rounded-full blur-3xl animate-pulse z-0" style={{ animationDuration: "6s" }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-3xl animate-pulse z-0" style={{ animationDuration: "8s", animationDelay: "1s" }} />
      
      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 container px-4 py-20"
      >
        <div className="max-w-6xl mx-auto text-center space-y-16">
          {/* Badge */}
          <motion.div variants={staggerItem} className="inline-flex">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-border/50 shadow-lg hover:shadow-xl transition-shadow">
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
          <motion.div variants={staggerItem} className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-brand-600 via-violet-600 to-brand-600 bg-clip-text text-transparent animate-gradient bg-300% bg-[length:200%_auto]">
                Master New Skills
              </span>
              <br />
              <span className="text-foreground">With Expert-Led Courses</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            {heroData.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="brand-gradient" 
              size="lg" 
              className="shadow-xl shadow-brand-500/30 hover:shadow-2xl hover:shadow-brand-500/40 transition-all duration-300 text-lg px-8"
            >
              {heroData.cta.primary}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-2 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 text-lg px-8"
            >
              {heroData.cta.secondary}
            </Button>
          </motion.div>

          {/* Floating Stats Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
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
                whileHover={{ y: -12, transition: { duration: 0.3, ease: "easeOut" } }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-2xl blur-sm" />
                <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border border-border/50 rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <stat.icon className="h-7 w-7 text-brand-600 dark:text-brand-400 mb-3" />
                  <div className="text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Floating Elements with Glow */}
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-24 h-24 bg-brand-500/25 dark:bg-brand-500/35 rounded-full blur-2xl z-5"
      />
      <motion.div
        animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-10 w-40 h-40 bg-violet-500/25 dark:bg-violet-500/35 rounded-full blur-2xl z-5"
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-brand-400/20 dark:bg-brand-600/25 rounded-full blur-xl z-5"
      />
      <motion.div
        animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 w-20 h-20 bg-violet-400/20 dark:bg-violet-600/25 rounded-full blur-xl z-5"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/5 right-1/3 w-12 h-12 bg-brand-500/30 dark:bg-brand-500/40 rounded-full blur-lg z-5"
      />
    </section>
  );
};

export default Hero;
