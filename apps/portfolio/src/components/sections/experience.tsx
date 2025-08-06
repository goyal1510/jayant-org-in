"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building } from "lucide-react"

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    location: "Remote",
    period: "2023 - Present",
    description: "Leading development of enterprise-level web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.",
    technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"],
    achievements: [
      "Led a team of 5 developers to deliver a major e-commerce platform",
      "Improved application performance by 40% through optimization",
      "Implemented CI/CD pipelines reducing deployment time by 60%"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "Bangalore, India",
    period: "2021 - 2023",
    description: "Developed and maintained multiple web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality products.",
    technologies: ["React", "Express.js", "MongoDB", "Redis", "Jest", "Git"],
    achievements: [
      "Built 3 major applications from concept to deployment",
      "Reduced bug reports by 50% through improved testing",
      "Mentored 2 junior developers"
    ]
  },
  {
    title: "Frontend Developer",
    company: "StartupHub",
    location: "Mumbai, India",
    period: "2020 - 2021",
    description: "Focused on creating responsive and user-friendly interfaces. Worked closely with designers to implement pixel-perfect designs.",
    technologies: ["React", "JavaScript", "CSS3", "HTML5", "Figma"],
    achievements: [
      "Developed 5+ responsive web applications",
      "Improved user engagement by 35% through UI/UX improvements",
      "Collaborated with design team to create design system"
    ]
  }
]

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey in software development, showcasing growth and achievements.
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.title}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden">
                {/* Timeline connector */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-full w-0.5 h-8 bg-border" />
                )}
                
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-foreground">
                        {experience.title}
                      </CardTitle>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground font-medium">
                            {experience.company}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">
                            {experience.location}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">
                            {experience.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {experience.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <motion.li
                          key={achievementIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: achievementIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-2"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">
                      Bachelor of Technology in Computer Science
                    </h4>
                    <p className="text-muted-foreground">University of Technology</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>2016 - 2020</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Computer Science</Badge>
                  <Badge variant="outline">Software Engineering</Badge>
                  <Badge variant="outline">Data Structures</Badge>
                  <Badge variant="outline">Algorithms</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
} 