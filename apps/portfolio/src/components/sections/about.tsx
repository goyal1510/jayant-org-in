"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { User, MapPin, Calendar, Mail, Github, Linkedin, Twitter } from "lucide-react"

const personalInfo = [
  { icon: User, label: "Name", value: "Jayant" },
  { icon: MapPin, label: "Location", value: "India" },
  { icon: Calendar, label: "Experience", value: "3+ Years" },
  { icon: Mail, label: "Email", value: "jayant@example.com" },
]

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
]

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know me better - my journey, passion, and what drives me to create amazing digital experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    Personal Information
                  </h3>
                  <div className="grid gap-4">
                    {personalInfo.map((info, index) => (
                      <motion.div
                        key={info.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-3"
                      >
                        <info.icon className="h-5 w-5 text-primary" />
                        <div>
                          <span className="text-sm text-muted-foreground">{info.label}:</span>
                          <span className="ml-2 text-foreground font-medium">{info.value}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">
                    Connect with me
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                My Journey
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I&apos;m a passionate Full Stack Developer with over 3 years of experience in creating 
                modern web applications. My journey in technology started with curiosity and has 
                evolved into a deep passion for building solutions that make a difference.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I specialize in React, Node.js, and modern web technologies. I believe in writing 
                clean, maintainable code and creating user experiences that are both beautiful and 
                functional. Every project I work on is an opportunity to learn and grow.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I&apos;m not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                What I Do
              </h4>
              <div className="grid gap-3">
                {[
                  "Full Stack Web Development",
                  "UI/UX Design & Implementation",
                  "API Development & Integration",
                  "Performance Optimization",
                  "Code Review & Mentoring",
                  "Technical Documentation"
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 