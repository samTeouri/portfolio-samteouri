"use client"

import Link from "next/link"
import { Github, Mail, Linkedin, ExternalLink, ArrowRight, ChevronDown } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  return (
    <div ref={containerRef} className="flex min-h-screen flex-col bg-black text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/50 glass backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl"
          >
            <span className="text-gradient glow-text">Samrou</span> TEOURI
          </motion.div>
          <nav className="flex items-center gap-6 text-sm">
            {["About", "Projects", "Skills", "Contact"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="transition-colors hover:text-red-600 animated-underline"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="about" className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
          <div className="absolute inset-0 bg-black -z-10">
            <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-red-950/50 via-black to-black"></div>
          </div>
          <div className="container relative z-10">
            <motion.div className="flex flex-col items-center gap-8 md:flex-row md:gap-16" style={{ opacity, scale }}>
              <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                <motion.h1
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  Hi, I'm <span className="text-gradient glow-text">Samrou TEOURI</span>
                </motion.h1>
                <motion.p
                  className="text-xl text-zinc-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  A passionate full-stack developer creating innovative web solutions
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 border-0 glow-red-sm hover:glow-red pulse-animation">
                    Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-zinc-800 hover:bg-zinc-900 hover:border-red-900 transition-all duration-300 bg-transparent"
                  >
                    View Resume <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div
                  className="flex gap-4 pt-4 justify-center md:justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {[
                    { icon: Github, href: "https://github.com/samTeouri" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/samrou-teouri/" },
                    { icon: Mail, href: "mailto:teourisamrou@gmail.com" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <Link
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-zinc-400 hover:text-red-500 transition-colors duration-300 flex items-center justify-center h-10 w-10 rounded-full hover:bg-red-950/20"
                      >
                        <item.icon className="h-6 w-6" />
                        <span className="sr-only">{item.icon.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <motion.div
                className="w-full md:w-1/2 max-w-[300px] mx-auto md:max-w-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <div className="aspect-square rounded-full gradient-red-to-black p-1 glow-red">
                  <div className="h-full w-full rounded-full bg-zinc-900/50 glass-dark p-4">
                    <div className="h-full w-full rounded-full bg-zinc-800/50 glass flex items-center justify-center text-6xl font-bold">
                      ST
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <p className="text-sm text-zinc-400 mb-2">Scroll to explore</p>
              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
                className="p-2 rounded-full bg-red-950/20 glass-dark glow-red-sm"
              >
                <ChevronDown className="h-6 w-6 text-red-600" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 gradient-dark relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black"></div>
          </div>
          <div className="container">
            <motion.div
              className="flex flex-col items-center justify-center gap-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                My <span className="text-gradient glow-text">Projects</span>
              </h2>
              <p className="max-w-[700px] text-zinc-400">Check out some of my recent work and personal projects</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="h-full"
                >
                  <div className="glass-card rounded-lg p-6 transition-all duration-300 glow-red-sm hover:glow-red hover:-translate-y-1 h-full">
                    <div className="aspect-video w-full bg-zinc-800/50 relative group rounded-md overflow-hidden mb-4 glass-card">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                        <div className="flex gap-2">
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 border-zinc-700 bg-black/50 backdrop-blur-sm hover:border-red-600 hover:glow-red-sm"
                            >
                              <Github className="h-4 w-4 mr-2" /> Code
                            </Button>
                          </Link>
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="h-8 bg-red-600 hover:bg-red-700 glow-red-sm">
                              <ExternalLink className="h-4 w-4 mr-2" /> Live
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-zinc-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="border-red-800/50 bg-red-950/30 text-red-400 hover:bg-red-900/30 transition-colors text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 relative border-t border-zinc-800/30">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-zinc-950 to-black opacity-80"></div>
          <div className="container">
            <motion.div
              className="flex flex-col items-center justify-center gap-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                My <span className="text-gradient glow-text">Skills</span>
              </h2>
              <p className="max-w-[700px] text-zinc-400">Technologies and tools I work with</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-8 mt-12 sm:grid-cols-3 md:grid-cols-4">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <div className="glass-card rounded-lg p-4 sm:p-6 transition-all duration-300 h-full">
                    <h3 className="text-xl font-bold text-gradient mb-4">{category.name}</h3>
                    <ul className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.li
                          key={skillIndex}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: skillIndex * 0.1, duration: 0.4 }}
                          viewport={{ once: true }}
                          whileHover={{ x: 5, color: "#dc2626", transition: { duration: 0.2 } }}
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                          <span className="text-zinc-300">{skill}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 relative border-t border-zinc-800/30">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-red-950/30 via-black to-black"></div>
          </div>
          <div className="container">
            <motion.div
              className="flex flex-col items-center justify-center gap-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get In <span className="text-gradient glow-text">Touch</span>
              </h2>
              <p className="max-w-[700px] text-zinc-400">
                Feel free to reach out for collaborations or just a friendly hello
              </p>
            </motion.div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="glass-card rounded-lg p-6 transition-all duration-300 glow-red-sm h-full">
                  <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Mail, text: "teourisamrou@gmail.com", href: "mailto:teourisamrou@gmail.com" },
                      {
                        icon: Linkedin,
                        text: "linkedin.com/in/samrou-teouri",
                        href: "https://www.linkedin.com/in/samrou-teouri/",
                      },
                      { icon: Github, text: "github.com/samTeouri", href: "https://github.com/samTeouri" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        whileHover={{
                          x: 5,
                          transition: { type: "spring", stiffness: 400, damping: 10 },
                        }}
                      >
                        <div className="h-10 w-10 rounded-full bg-red-950/30 flex items-center justify-center glow-red-sm">
                          <item.icon className="h-5 w-5 text-red-500" />
                        </div>
                        <Link
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="hover:text-red-400 transition-colors"
                        >
                          {item.text}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="glass-card rounded-lg p-6 transition-all duration-300 glow-red-sm">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <input
                          id="name"
                          className="w-full rounded-md border border-zinc-800 bg-zinc-950/50 glass-dark px-3 py-2 text-sm transition-all focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 focus:glow-red-sm"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full rounded-md border border-zinc-800 bg-zinc-950/50 glass-dark px-3 py-2 text-sm transition-all focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 focus:glow-red-sm"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="w-full rounded-md border border-zinc-800 bg-zinc-950/50 glass-dark px-3 py-2 text-sm transition-all focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 focus:glow-red-sm"
                        rows={4}
                        placeholder="Your message..."
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 border-0 w-full glow-red-sm hover:glow-red"
                      >
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 glass-dark py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-zinc-400 md:text-left">
            © {new Date().getFullYear()} Samrou TEOURI. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[
              { Icon: Github, href: "https://github.com/samTeouri" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/samrou-teouri/" },
              { Icon: Mail, href: "mailto:teourisamrou@gmail.com" },
            ].map(({ Icon, href }, i) => (
              <motion.div key={i} whileHover={{ y: -3, scale: 1.1 }}>
                <Link
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-zinc-400 hover:text-red-500 transition-colors duration-300"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{Icon.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample projects data
const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/samTeouri/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    image: "/placeholder.svg?height=300&width=500&text=E-Commerce+Platform",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["Vue.js", "Express", "MongoDB", "Socket.io", "Vuetify"],
    githubUrl: "https://github.com/samTeouri/task-manager",
    liveUrl: "https://taskmanager-demo.vercel.app",
    image: "/placeholder.svg?height=300&width=500&text=Task+Management+App",
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities with beautiful visualizations.",
    technologies: ["JavaScript", "Chart.js", "OpenWeather API", "CSS3"],
    githubUrl: "https://github.com/samTeouri/weather-dashboard",
    liveUrl: "https://weather-dashboard-demo.vercel.app",
    image: "/placeholder.svg?height=300&width=500&text=Weather+Dashboard",
  },
]

const skillCategories = [
  {
    name: "Frontend",
    skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "Python", "Django", "REST APIs"],
  },
  {
    name: "Database",
    skills: ["PostgreSQL", "MongoDB", "Firebase", "MySQL"],
  },
  {
    name: "Tools",
    skills: ["Git", "Docker", "AWS", "Vercel", "Figma"],
  },
]
