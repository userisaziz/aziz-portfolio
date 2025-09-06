import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import {
  Play,
  ExternalLink,
  Github,
  Eye,
  Code,
  Zap,
  Star,
  ArrowUpRight,
} from "lucide-react";
import projectsData from "@/data/projects.json";
import { Project, ProjectCategory } from "@/types";

const projects: Project[] = projectsData;

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const categories = [
    "all",
    "Web Application",
    "Mobile App",
    "VR/AR",
    "Developer Tools",
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-background to-muted/20"
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Featured Work</span>
            </div>

            <h2 className="font-bricolage text-4xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Project Showcase</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore my projects through interactive demos and detailed case
              studies showcasing real-world impact and technical excellence.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-12"
          >
            <div className="glass-card p-2 rounded-2xl">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      filter === category
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {category === "all" ? "All Projects" : category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className={`group cursor-pointer ${
                  project.featured ? "md:col-span-2 lg:col-span-2" : ""
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setSelectedProject(project)}
              >
                <div className="glass-card rounded-2xl overflow-hidden hover:shadow-elevated transition-all duration-500 h-full">
                  {/* Project Image/Video Container */}
                  <div className="relative aspect-video bg-muted/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />

                    {/* Hover Overlay */}
                    <div
                      className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
                        hoveredProject === project.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <div className="text-center space-y-4">
                        <div className="flex justify-center gap-3">
                          <button className="glass-card p-3 rounded-xl hover:shadow-elevated transition-all group">
                            <Play className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                          </button>
                          {project.liveUrl && (
                            <button className="glass-card p-3 rounded-xl hover:shadow-elevated transition-all group">
                              <ExternalLink className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                            </button>
                          )}
                          {project.githubUrl && (
                            <button className="glass-card p-3 rounded-xl hover:shadow-elevated transition-all group">
                              <Github className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                            </button>
                          )}
                        </div>
                        <span className="text-white font-medium">
                          View Details
                        </span>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-1 px-3 py-1 glass-card rounded-full">
                          <Star className="w-3 h-3 text-accent" />
                          <span className="text-xs font-medium">Featured</span>
                        </div>
                      </div>
                    )}

                    {/* Project Year */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 glass-card rounded-full text-xs font-medium">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="font-bricolage text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-muted/50 text-xs font-medium rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-muted/50 text-xs font-medium rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Performance
                        </div>
                        <div className="text-sm font-semibold">
                          {project.metrics.performance.split(" ")[0]}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Users
                        </div>
                        <div className="text-sm font-semibold">
                          {project.metrics.users.split(" ")[0]}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">
                          Impact
                        </div>
                        <div className="text-sm font-semibold">
                          {project.metrics.impact.split(" ")[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Projects Button */}
          <motion.div variants={itemVariants} className="text-center">
            <Link
              to="/projects"
              className="btn-hero ripple group inline-flex items-center gap-3"
            >
              <span className="text-white font-semibold">
                View All Projects
              </span>
              <ArrowUpRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="glass-card rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border/50 shadow-floating"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-8">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
              </div>
              
              {/* Modal Header */}
              <div className="relative flex justify-between items-start mb-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
                      {selectedProject.category}
                    </span>
                    <span className="px-3 py-1.5 glass-card text-sm font-medium rounded-full">
                      {selectedProject.year}
                    </span>
                  </div>
                  <h3 className="font-bricolage text-3xl lg:text-4xl font-bold mb-3 gradient-text">
                    {selectedProject.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="glass-card p-3 rounded-xl hover:shadow-elevated transition-all hover:rotate-90 ml-6 flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Case Study */}
              <div className="relative space-y-8">
                {/* Problem, Solution, Results Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass-card p-6 rounded-2xl border border-border/50 hover:shadow-elevated transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h4 className="font-bricolage text-lg font-bold">Problem</h4>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {selectedProject.caseStudy.problem}
                    </p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-2xl border border-border/50 hover:shadow-elevated transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h4 className="font-bricolage text-lg font-bold">Solution</h4>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {selectedProject.caseStudy.solution}
                    </p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-2xl border border-border/50 hover:shadow-elevated transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="font-bricolage text-lg font-bold">Results</h4>
                    </div>
                    <ul className="space-y-3">
                      {selectedProject.caseStudy.results.map((result, index) => (
                        <li key={index} className="text-muted-foreground text-sm flex items-start gap-3 leading-relaxed">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technologies Section */}
                <div className="glass-card p-6 rounded-2xl border border-border/50">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h4 className="font-bricolage text-lg font-bold">Technologies Used</h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={tech}
                        className="px-4 py-2 glass-card rounded-lg text-sm font-medium border border-border/30 hover:border-primary/30 hover:shadow-soft transition-all"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  {selectedProject.liveUrl && (
                    <button className="btn-hero flex items-center gap-3 group">
                      <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Live Demo</span>
                    </button>
                  )}
                  {selectedProject.githubUrl && (
                    <button className="glass-card px-6 py-3 rounded-xl font-medium hover:shadow-elevated transition-all flex items-center gap-3 border border-border/30 hover:border-primary/30 group">
                      <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>View Code</span>
                    </button>
                  )}
                  {selectedProject.videoUrl && (
                    <button className="glass-card px-6 py-3 rounded-xl font-medium hover:shadow-elevated transition-all flex items-center gap-3 border border-border/30 hover:border-accent/30 group">
                      <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Watch Demo</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;
