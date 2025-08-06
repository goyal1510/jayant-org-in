"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Code2, 
  Palette, 
  Database, 
  Settings,
  Code,
  Server,
  FileCode,
  FileText,
  GitBranch,
  Package
} from "lucide-react"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    skills: [
      { name: "React", level: 90, color: "bg-blue-500" },
      { name: "TypeScript", level: 85, color: "bg-blue-600" },
      { name: "Next.js", level: 88, color: "bg-black" },
      { name: "Tailwind CSS", level: 92, color: "bg-cyan-500" },
    ]
  },
  {
    title: "Backend Development",
    icon: Database,
    skills: [
      { name: "Node.js", level: 85, color: "bg-green-600" },
      { name: "Python", level: 80, color: "bg-yellow-600" },
      { name: "Express.js", level: 88, color: "bg-gray-600" },
      { name: "PostgreSQL", level: 75, color: "bg-blue-700" },
    ]
  },
  {
    title: "Tools & Technologies",
    icon: Settings,
    skills: [
      { name: "Git", level: 90, color: "bg-orange-600" },
      { name: "Docker", level: 70, color: "bg-blue-500" },
      { name: "AWS", level: 65, color: "bg-yellow-500" },
      { name: "CI/CD", level: 75, color: "bg-purple-600" },
    ]
  },
  {
    title: "Design & UX",
    icon: Palette,
    skills: [
      { name: "Figma", level: 80, color: "bg-purple-500" },
      { name: "Adobe XD", level: 75, color: "bg-pink-500" },
      { name: "Responsive Design", level: 95, color: "bg-green-500" },
      { name: "UI/UX Principles", level: 85, color: "bg-indigo-500" },
    ]
  }
]

const techIcons = [
  { icon: Code, name: "React", color: "text-blue-500" },
  { icon: Server, name: "Node.js", color: "text-green-600" },
  { icon: FileCode, name: "TypeScript", color: "text-blue-600" },
  { icon: FileText, name: "Python", color: "text-yellow-600" },
  { icon: GitBranch, name: "Git", color: "text-orange-600" },
  { icon: Package, name: "Docker", color: "text-blue-500" },
]

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        {/* Technology Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {techIcons.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="p-4 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors duration-200">
                <tech.icon className={`h-8 w-8 ${tech.color}`} />
              </div>
              <span className="text-sm text-muted-foreground">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <category.icon className="h-5 w-5 text-primary" />
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                          className={`h-2 rounded-full ${skill.color}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card>
            <CardHeader>
              <CardTitle>Additional Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "RESTful APIs",
                  "GraphQL",
                  "MongoDB",
                  "Redis",
                  "Jest",
                  "Cypress",
                  "Webpack",
                  "Vite",
                  "Agile/Scrum",
                  "JIRA",
                  "Postman",
                  "Swagger"
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
} 