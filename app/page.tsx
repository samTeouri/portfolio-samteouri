"use client"

import Link from "next/link"
import { Github, Mail, Linkedin, ExternalLink, ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection, AnimatedTitle } from "@/components/animated-section"
import { AnimatedList } from "@/components/animated-list"
import { HeroAnimation } from "@/components/hero-animation"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { ParallaxBackground } from "@/components/parallax-background"
import { ScrollProgress } from "@/components/scroll-progress"
import { GlassCard } from "@/components/glass-card"
import { ContactForm } from "@/components/contact-form"
import { useMobile } from "@/hooks/use-mobile"
import { SimpleBackgroundObjects } from "@/components/simple-background-objects"
import { ProjectIcon } from "@/components/project-icons"
import { FallingStarsOrLogos } from "@/components/falling-stars-logos"

export default function Home() {
  const containerRef = useRef(null)
  const isMobile = useMobile()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Disable parallax transforms on mobile
  const opacity = useTransform(scrollYProgress, [0, 0.2], isMobile ? [1, 1] : [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], isMobile ? [1, 1] : [1, 0.8])

  return (
    <div ref={containerRef} className="flex min-h-screen flex-col bg-black text-white">
      <ParallaxBackground />
      <SimpleBackgroundObjects />
      <ScrollProgress />

      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/50 glass backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: isMobile ? 0.3 : 0.5 }}
            className="font-bold text-lg sm:text-xl"
          >
            <span className="text-gradient glow-text">Samrou</span> TEOURI
          </motion.div>
          <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
            {["About", "Projects", "Skills", "Contact"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.2 : 0.3, delay: 0.1 * i }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="transition-colors animated-underline"
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
        <AnimatedSection id="about" className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center pt-0">
          <div className="absolute inset-0 bg-black -z-10">
            <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-cyan-950/50 via-black to-black"></div>
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent"></div>
          </div>
          <div className="container relative z-10">
            <FallingStarsOrLogos count={100} />
            <HeroAnimation />
            <AnimatedSection>
              <motion.div style={{ opacity, scale }} className="flex min-h-screen items-center justify-center">
                <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Hi, I'm <span className="text-gradient glow-text">Samrou TEOURI</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-zinc-400">
                    A passionate full-stack developer creating innovative web solutions
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Button
                      scrollToContact
                      className={`w-full sm:w-auto bg-gradient-to-r from-cyan-700 to-cyan-600 hover:from-cyan-600 hover:to-cyan-500 border-0 glow-cyan-sm hover:glow-cyan ${!isMobile ? "pulse-animation" : ""}`}
                    >
                      Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Link
                      href="https://cvdesignr.com/p/D0olpbKljrRmoVn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-zinc-800 hover:bg-zinc-900 hover:border-cyan-900 transition-all duration-300"
                      >
                        View Resume <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex gap-4 pt-4 justify-center md:justify-start">
                    {[
                      { icon: Github, href: "https://github.com/samTeouri" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/samrou-teouri/" },
                      { icon: Mail, href: "mailto:teourisamrou@gmail.com" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="transition-transform duration-200 hover:scale-110"
                      >
                        <Link
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-zinc-400 hover:text-cyan-500 transition-colors duration-300 flex items-center justify-center h-10 w-10 rounded-full hover:bg-cyan-950/20"
                        >
                          <item.icon className="h-6 w-6 micro-bounce micro-pulse micro-glow" />
                          <span className="sr-only">{item.icon.name}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              <ScrollIndicator />
            </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <section id="projects" className="py-24 sm:py-32 gradient-dark relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black"></div>
          </div>
          <div className="container">
            <AnimatedTitle>
              <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 text-center">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  My <span className="text-gradient glow-text">Projects</span>
                </h2>
                <p className="max-w-[700px] text-sm sm:text-base text-zinc-400 px-4 sm:px-0">
                  Check out some of my recent work and personal projects
                </p>
              </div>
            </AnimatedTitle>

            <AnimatedList className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <motion.div 
                  key={index} 
                  whileHover={isMobile ? {} : { y: -10, transition: { duration: 0.3 } }} 
                  className="h-full"
                >
                  <GlassCard glowEffect={!isMobile} hoverEffect={!isMobile} className="h-full">
                    <div className="aspect-video w-full bg-zinc-800/50 relative group rounded-md overflow-hidden mb-4 glass-card">
                      <ProjectIcon type={project.type} className="h-20 w-20" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                        <div className="flex gap-2">
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 border-zinc-700 bg-black/50 backdrop-blur-sm hover:border-cyan-600 hover:glow-cyan-sm"
                            >
                              <Github className="h-4 w-4 mr-2" /> View Code
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-zinc-400 text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="text-xs border-cyan-800/50 bg-cyan-950/30 text-cyan-400 hover:bg-cyan-900/30 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatedList>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 sm:py-32 relative border-t border-zinc-800/30">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-cyan-950/30 via-black to-black"></div>
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-zinc-950 to-black opacity-80"></div>
          <div className="container">
            <AnimatedTitle>
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  My <span className="text-gradient glow-text">Skills</span>
                </h2>
                <p className="max-w-[700px] text-zinc-400">Technologies and tools I work with</p>
              </div>
            </AnimatedTitle>

            <div className="grid grid-cols-2 gap-8 mt-12 sm:grid-cols-3 md:grid-cols-4">
              {skillCategories.map((category, index) => (
                <AnimatedSection key={index} delay={index * (isMobile ? 0.05 : 0.1)}>
                  <GlassCard className="h-full">
                    <h3 className="text-xl font-bold text-gradient mb-4">{category.name}</h3>
                    <ul className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.li
                          key={skillIndex}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: skillIndex * (isMobile ? 0.05 : 0.1), duration: isMobile ? 0.3 : 0.4 }}
                          viewport={{ once: true }}
                          whileHover={isMobile ? {} : { x: 5, color: "#00cccc", transition: { duration: 0.2 } }}
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-cyan-600" />
                          <span className="text-zinc-300">{skill}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </GlassCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 sm:py-32 relative border-t border-zinc-800/30">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-cyan-950/30 via-black to-black"></div>
          </div>
          <div className="container">
            <AnimatedTitle>
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Get In <span className="text-gradient glow-text">Touch</span>
                </h2>
                <p className="max-w-[700px] text-zinc-400">
                  Feel free to reach out for collaborations or just a friendly hello
                </p>
              </div>
            </AnimatedTitle>

            <div className="mx-auto mt-8 sm:mt-12 grid max-w-4xl gap-6 sm:gap-8 px-4 sm:px-6 md:px-0 md:grid-cols-2">
              <AnimatedSection delay={0.2}>
                <GlassCard glowEffect={!isMobile} className="h-full">
                  <h3 className="text-xl font-bold mb-4 sm:mb-6">Contact Information</h3>
                  <div className="space-y-3 sm:space-y-4">
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
                        whileHover={
                          isMobile
                            ? {}
                            : {
                                x: 5,
                                transition: { type: "spring", stiffness: 400, damping: 10 },
                              }
                        }
                      >
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-cyan-950/30 flex items-center justify-center glow-cyan-sm">
                          <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-500" />
                        </div>
                        <Link
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="hover:text-cyan-400 transition-colors text-sm sm:text-base truncate"
                        >
                          {item.text}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <GlassCard glowEffect={!isMobile}>
                  <ContactForm />
                </GlassCard>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 glass-dark py-4 sm:py-6">
        <div className="container flex flex-col items-center justify-between gap-3 sm:gap-4 md:flex-row px-4 sm:px-6">
          <p className="text-center text-xs sm:text-sm text-zinc-400 md:text-left">
            © {new Date().getFullYear()} Samrou TEOURI. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[
              { Icon: Github, href: "https://github.com/samTeouri" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/samrou-teouri/" },
              { Icon: Mail, href: "mailto:teourisamrou@gmail.com" },
            ].map(({ Icon, href }, i) => (
              <motion.div key={i} whileHover={isMobile ? {} : { y: -3, scale: 1.1 }}>
                <Link
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-zinc-400 hover:text-cyan-500 transition-colors duration-300"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 micro-bounce micro-pulse micro-glow" />
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

// Your actual projects with visual previews
const projects = [
  {
    title: "Eyes OTC API",
    description:
      "An API system for managing and responding to city incidents, providing efficient incident tracking and response coordination for municipal services.",
    technologies: ["Node.js", "Express", "REST API", "Database", "Incident Management"],
    githubUrl: "https://github.com/samTeouri/eyes-otc-api",
    image: "/placeholder.svg?height=300&width=500&text=API+Dashboard+%7C+Incident+Management+System",
    type: "API",
  },
  {
    title: "Barge Transport Simulator",
    description:
      "A sophisticated simulation system for barge transportation logistics and operations, optimizing routes and cargo management.",
    technologies: ["Python", "Simulation", "Data Analysis", "Logistics"],
    githubUrl: "https://github.com/samTeouri/barge-transport-simulator",
    image: "/placeholder.svg?height=300&width=500&text=Transport+Simulation+%7C+Logistics+Dashboard",
    type: "Simulation",
  },
  {
    title: "Othello AI",
    description:
      "An intelligent AI implementation for the classic Othello board game with advanced algorithms and strategic gameplay analysis.",
    technologies: ["Python", "AI/ML", "Game Theory", "Algorithms"],
    githubUrl: "https://github.com/samTeouri/othello-ai",
    image: "/placeholder.svg?height=300&width=500&text=Othello+Game+%7C+AI+Strategy+Board",
    type: "AI/Game",
  },
  {
    title: "CPL Mon Avenir",
    description:
      "A comprehensive web application for school management, handling student records, scheduling, administrative tasks, and academic planning.",
    technologies: ["Laravel", "PHP", "PostgreSQL", "Web Development", "School Management"],
    githubUrl: "https://github.com/samTeouri/CPLMonAvenir",
    image: "/placeholder.svg?height=300&width=500&text=School+Management+%7C+Student+Dashboard",
    type: "Web App",
  },
]

const skillCategories = [
  {
    name: "Frontend",
    skills: ["Vue.js", "Bootstrap", "Tailwind CSS", "JavaScript", "HTML/CSS"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "TypeScript", "Java", "Python", "Django", "REST APIs"],
  },
  {
    name: "Database",
    skills: ["MongoDB", "PostgreSQL", "Firebase", "MySQL"],
  },
  {
    name: "DevOps",
    skills: ["Docker", "Linux", "BASH", "Nginx", "Apache", "CI/CD"],
  },
]
