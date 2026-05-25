"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { staggerContainer, staggerItem } from "@/lib/animations/presets";
import {
  Star,
  Play,
  TrendingUp,
  Award,
  Users,
  Target,
  Quote,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function SuccessStoriesPage() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      image: "SC",
      course: "Full-Stack Development Bootcamp",
      rating: 5,
      text: "LMS Platform completely transformed my career. The courses are incredibly well-structured and the community support is unmatched. I went from knowing nothing about coding to landing my dream job at Google in just 8 months.",
    },
    {
      name: "Michael Rodriguez",
      role: "Data Scientist at Amazon",
      image: "MR",
      course: "Data Science & Machine Learning",
      rating: 5,
      text: "The practical projects and real-world case studies made all the difference. I wasn't just learning theory – I was building actual skills that employers value. The mentorship program was invaluable.",
    },
    {
      name: "Emily Watson",
      role: "UX Designer at Apple",
      image: "EW",
      course: "UI/UX Design Masterclass",
      rating: 5,
      text: "The design thinking methodologies I learned here completely changed how I approach problems. The feedback from instructors and peers helped me refine my portfolio and land interviews at top tech companies.",
    },
  ];

  const careerOutcomes = [
    {
      before: "Junior Developer",
      after: "Senior Software Engineer",
      company: "Microsoft",
      salaryIncrease: "+150%",
      time: "18 months",
    },
    {
      before: "Marketing Associate",
      after: "Head of Marketing",
      company: "Spotify",
      salaryIncrease: "+200%",
      time: "24 months",
    },
    {
      before: "Data Analyst",
      after: "Principal Data Scientist",
      company: "Netflix",
      salaryIncrease: "+180%",
      time: "20 months",
    },
  ];

  const achievements = [
    {
      student: "James Wilson",
      achievement: "Built a startup that raised $2M in funding",
      course: "Entrepreneurship Fundamentals",
    },
    {
      student: "Lisa Park",
      achievement: "Published research paper in top AI conference",
      course: "Advanced Machine Learning",
    },
    {
      student: "David Kim",
      achievement: "Created app with 1M+ downloads",
      course: "Mobile App Development",
    },
  ];

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
                Success Stories
              </span>
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              Real stories from real learners who transformed their careers with LMS Platform
            </motion.p>
          </div>
        </motion.div>
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
            <motion.div variants={staggerItem} className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "15,000+", label: "Career Transitions" },
                { value: "$50M+", label: "Total Salary Increase" },
                { value: "95%", label: "Job Placement Rate" },
                { value: "150+", label: "Countries Represented" },
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

      {/* Student Testimonials */}
      <section className="section-py bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="text-h2 text-center mb-12">
              Student Testimonials
            </motion.h2>
            <motion.div
              variants={staggerItem}
              className="grid md:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <Card key={index} variant="glass" className="p-6">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                        {testimonial.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
                    <div className="text-sm text-brand-600 dark:text-brand-400 font-medium">
                      {testimonial.course}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="section-py">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="text-h2 text-center mb-12">
              Video Testimonials
            </motion.h2>
            <motion.div
              variants={staggerItem}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {[
                { name: "Alex Thompson", title: "From Retail to Tech", duration: "3:45" },
                { name: "Maria Garcia", title: "Career Pivot Success", duration: "4:12" },
              ].map((video, index) => (
                <Card key={index} variant="glass" className="overflow-hidden group">
                  <div className="aspect-video bg-gradient-to-br from-brand-100 to-violet-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center shadow-lg cursor-pointer"
                    >
                      <Play className="h-6 w-6 text-brand-600 dark:text-brand-400 ml-1" />
                    </motion.div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{video.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{video.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{video.duration}</span>
                      <Button variant="ghost" size="sm">
                        Watch <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="section-py bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="text-h2 text-center mb-12">
              Career Outcomes
            </motion.h2>
            <motion.div
              variants={staggerItem}
              className="grid md:grid-cols-3 gap-8"
            >
              {careerOutcomes.map((outcome, index) => (
                <Card key={index} variant="glass" className="p-6">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                      <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
                        {outcome.salaryIncrease}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                        <span className="text-sm text-muted-foreground line-through">
                          {outcome.before}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                        <span className="text-sm font-semibold text-foreground">
                          {outcome.after}
                        </span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{outcome.company}</span>
                        <span className="text-brand-600 dark:text-brand-400 font-medium">
                          {outcome.time}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Student Achievements */}
      <section className="section-py">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="text-h2 text-center mb-12">
              Student Achievements
            </motion.h2>
            <motion.div
              variants={staggerItem}
              className="grid md:grid-cols-3 gap-8"
            >
              {achievements.map((achievement, index) => (
                <Card key={index} variant="glass" className="p-6">
                  <CardContent className="pt-6 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white mb-4">
                      <Award className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{achievement.student}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {achievement.achievement}
                    </p>
                    <div className="text-sm text-brand-600 dark:text-brand-400 font-medium">
                      {achievement.course}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Community Showcase */}
      <section className="section-py bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={staggerItem} className="text-h2 text-center mb-12">
              Our Global Community
            </motion.h2>
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { icon: Users, label: "5M+ Learners", desc: "From 150+ countries" },
                { icon: Target, label: "500K+ Courses Completed", desc: "With 98% satisfaction" },
                { icon: Award, label: "50K+ Certificates", desc: "Issued to date" },
                { icon: Quote, label: "10K+ Reviews", desc: "4.9 average rating" },
              ].map((item, index) => (
                <Card key={index} variant="glass" className="text-center p-6">
                  <CardContent className="pt-6 space-y-4">
                    <item.icon className="h-8 w-8 text-brand-600 dark:text-brand-400 mx-auto" />
                    <h3 className="text-2xl font-bold text-foreground">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
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
                Be Our Next Success Story
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of learners who have transformed their careers with LMS Platform. Your success story starts here.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-brand-600 hover:bg-white/90"
              >
                Start Your Journey
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
