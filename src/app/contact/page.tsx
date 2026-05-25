"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { staggerContainer, staggerItem } from "@/lib/animations/presets";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send,
  ExternalLink,
} from "lucide-react";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How can I contact support?",
      answer: "You can reach our support team 24/7 via email at support@lmsplatform.com or through the contact form below. We typically respond within 24 hours.",
    },
    {
      question: "Do you offer phone support?",
      answer: "Yes, our Pro and Enterprise plan members have access to phone support. Starter plan members can contact us via email or live chat.",
    },
    {
      question: "What are your support hours?",
      answer: "Our live chat and email support are available 24/7. Phone support is available Monday through Friday, 9 AM to 6 PM EST.",
    },
    {
      question: "How do I request a refund?",
      answer: "Refund requests can be made within 30 days of purchase. Contact our support team with your order details, and we'll process your request promptly.",
    },
  ];

  const supportCards = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "24/7",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      available: "24/7",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      action: "Call Now",
      available: "Mon-Fri 9AM-6PM",
    },
  ];

  const socialLinks = [
    { name: "Twitter", icon: "𝕏", url: "#" },
    { name: "LinkedIn", icon: "in", url: "#" },
    { name: "GitHub", icon: "⌘", url: "#" },
    { name: "Discord", icon: "◆", url: "#" },
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
              Get in Touch
            </motion.h1>
            <motion.p
              variants={staggerItem}
              className="text-lg text-muted-foreground"
            >
              Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Support Cards */}
      <section className="section-py">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {supportCards.map((card, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card variant="glass" className="p-6 group hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white">
                      <card.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">{card.available}</span>
                      <Button variant="ghost" size="sm" className="group-hover:bg-accent">
                        {card.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-py bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12"
          >
            {/* Contact Form */}
            <motion.div variants={staggerItem}>
              <Card variant="glass" className="p-8">
                <CardContent className="pt-6 space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Send us a message</h2>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">First Name</label>
                        <input
                          type="text"
                          placeholder="John"
                          className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Last Name</label>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Subject</label>
                      <select className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                        <option>General Inquiry</option>
                        <option>Technical Support</option>
                        <option>Billing Question</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Message</label>
                      <textarea
                        rows={5}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                      />
                    </div>
                    <Button variant="brand-gradient" size="lg" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={staggerItem} className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Contact Information</h2>
              
              <Card variant="glass" className="p-6">
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white flex-shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">support@lmsplatform.com</p>
                      <p className="text-muted-foreground">sales@lmsplatform.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white flex-shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Office</h3>
                      <p className="text-muted-foreground">123 Learning Street</p>
                      <p className="text-muted-foreground">San Francisco, CA 94102</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white flex-shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Support Hours</h3>
                      <p className="text-muted-foreground">24/7 Email & Live Chat</p>
                      <p className="text-muted-foreground">Phone: Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card variant="glass" className="p-6">
                <CardContent className="pt-6 space-y-4">
                  <h3 className="font-medium text-foreground">Follow Us</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-lg bg-muted hover:bg-accent flex items-center justify-center transition-colors"
                      >
                        <span className="text-foreground font-medium">{social.icon}</span>
                      </motion.a>
                    ))}
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
    </main>
  );
}
