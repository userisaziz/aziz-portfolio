import React, { useEffect, lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SEO from "@/components/SEO";

// Lazy load components that are below the fold
const WorkExperience = lazy(() => import("@/components/WorkExperience"));
const SkillsGrowthSection = lazy(() => import("@/components/SkillsGrowthSection").then(module => ({ default: module.SkillsGrowthSection })));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

// Lightweight loading component
const SectionLoader = () => (
  <div className="flex justify-center py-12">
    <div className="glass-card p-6 rounded-xl">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
    </div>
  </div>
);

const Index = () => {
  useEffect(() => {
    // Console Easter Egg
    console.log(`
    🚀 Welcome to the developer console!
    
    Want to collaborate? Try: hire()
    
    const developer = {
      name: "Creative Developer",
      location: "Bangalore, India",
      passion: "Crafting interfaces humans ♥️",
      specialties: ["React", "TypeScript", "WebGL", "Design Systems"],
      status: "Available for exciting projects"
    };
    
    console.log(developer);
    `);

    // Define hire function globally
    (window as any).hire = () => {
      console.log(`
      🎉 Excellent choice! Let's build something amazing together.
      
      📧 Email: hello@developer.dev
      📱 Phone: +91 98765 43210
      🌍 Location: Koramangala, Bangalore
      
      Looking forward to hearing about your project!
      `);
    };

    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <SEO
        title="Abdul Aziz Portfolio - Frontend Developer | Bangalore"
        description="Abdul Aziz - Frontend Developer & Designer from Bangalore crafting exceptional digital experiences with React, TypeScript, and cutting-edge web technologies."
        keywords={['Frontend Developer', 'React Developer', 'TypeScript', 'UI/UX Developer', 'Web Developer', 'Bangalore', 'Portfolio', 'JavaScript', 'CSS', 'HTML']}
        url="/"
      />
      <Header />

      {/* Main Content */}
      <main className="pt-20">
        <HeroSection />
        
        <Suspense fallback={<SectionLoader />}>
          <WorkExperience />
        </Suspense>
        
        {/* <Suspense fallback={<SectionLoader />}>
          <SkillsGrowthSection />
        </Suspense> */}
        
        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-muted/50 to-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-muted-foreground">Handcrafted with</span>
              <span className="text-primary">☕</span>
              <span className="text-muted-foreground">in Bangalore</span>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 Creative Developer</span>
              <span>•</span>
              <span>Built with React + TypeScript</span>
              <span>•</span>
              <span>Designed for humans</span>
            </div>

            {/* Now Coding Widget */}
            <div className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">
                Currently building: AI-powered dashboard with Three.js
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
