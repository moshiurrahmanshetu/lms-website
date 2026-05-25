"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { staggerContainer, staggerItem } from "@/lib/animations/presets";
import {
  Target,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Calendar,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 container px-4 py-20"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.h1 variants={staggerItem} className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-brand-600 via-violet-600 to-brand-600 bg-clip-text text-transparent">
                About LMS Platform
              </span>
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              Empowering learners worldwide with accessible, high-quality education through innovative technology and expert instruction.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="section-py">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={staggerItem} className="text-center mb-12">
              <h2 className="text-h2 mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                To democratize education by making world-class learning accessible to everyone, everywhere.
              </p>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { icon: Target, title: "Accessibility", desc: "Education for everyone, regardless of background or location" },
                { icon: BookOpen, title: "Quality", desc: "Curated courses from industry experts and top institutions" },
                { icon: Users, title: "Community", desc: "A supportive network of learners and instructors" },
              ].map((item, index) => (
                <Card key={index} variant="glass" className="text-center p-6">
                  <CardContent className="pt-6 space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Platform Story */}
      <section className="section-py bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={staggerItem} className="space-y-6">
              <h2 className="text-h2">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2020, LMS Platform started with a simple idea: education should be accessible, engaging, and effective. We noticed that traditional learning platforms were often expensive, inflexible, and lacking in personalization.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we've grown into a global platform serving millions of learners across 150+ countries. Our commitment to quality and innovation remains at the heart of everything we do.
              </p>
            </motion.div>
            <motion.div variants={staggerItem} className="relative">
              <div className="aspect-square bg-gradient-to-br from-brand-100 to-violet-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center">
                <BookOpen className="h-32 w-32 text-brand-600 dark:text-brand-400" />
              </div>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-brand-500/10 dark:bg-brand-500/20 rounded-full blur-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="section-py">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="text-h2 text-center mb-12">
              By The Numbers
            </motion.h2>
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { value: "5M+", label: "Learners" },
                { value: "500+", label: "Courses" },
                { value: "150+", label: "Countries" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-py bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="text-h2 text-center mb-12">
              Why Choose Us
            </motion.h2>
            <motion.div
              variants={staggerItem}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { icon: Award, title: "Expert Instructors", desc: "Learn from industry leaders and subject matter experts" },
                { icon: TrendingUp, title: "Practical Skills", desc: "Focus on real-world applications and hands-on learning" },
                { icon: Shield, title: "Verified Content", desc: "All courses are reviewed and quality-assured" },
                { icon: Zap, title: "Flexible Learning", desc: "Learn at your own pace, anytime, anywhere" },
                { icon: Globe, title: "Global Community", desc: "Connect with learners from around the world" },
                { icon: Calendar, title: "Lifetime Access", desc: "Once enrolled, access your courses forever" },
              ].map((item, index) => (
                <Card key={index} variant="glass" className="p-6">
                  <CardContent className="pt-6 space-y-4">
                    <item.icon className="h-8 w-8 text-brand-600 dark:text-brand-400" />
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
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
              Our Journey
            </motion.h2>
            <motion.div variants={staggerItem} className="space-y-8">
              {[
                { year: "2020", title: "Founded", desc: "LMS Platform launched with 50 courses" },
                { year: "2021", title: "Growth", desc: "Reached 100,000 learners globally" },
                { year: "2022", title: "Expansion", desc: "Added mobile app and live classes" },
                { year: "2023", title: "Innovation", desc: "Introduced AI-powered learning paths" },
                { year: "2024", title: "Milestone", desc: "Served 5 million learners worldwide" },
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                      {item.year.slice(-2)}
                    </div>
                    {index < 4 && <div className="w-0.5 h-full bg-border/50" />}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="section-py bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="text-h2 text-center mb-12">
              Meet Our Team
            </motion.h2>
            <motion.div
              variants={staggerItem}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { name: "Sarah Johnson", role: "CEO & Founder", desc: "Visionary leader with 15+ years in EdTech" },
                { name: "Michael Chen", role: "CTO", desc: "Tech innovator and systems architect" },
                { name: "Emily Rodriguez", role: "Head of Content", desc: "Curriculum expert and education specialist" },
              ].map((member, index) => (
                <Card key={index} variant="glass" className="text-center p-6">
                  <CardContent className="pt-6 space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-brand-100 to-violet-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                      <Users className="h-12 w-12 text-brand-600 dark:text-brand-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.desc}</p>
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
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={staggerItem}
              className="bg-gradient-primary rounded-3xl p-12 md:p-16 text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join millions of learners already transforming their careers with LMS Platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-brand-600 hover:bg-white/90">
                  Get Started Free
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
