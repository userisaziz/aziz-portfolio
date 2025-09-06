import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Code, Heart, Sparkles } from "lucide-react";
import heroAvatar from "@/assets/hero-avatar.png";
import heroData from "@/data/hero.json";
import info from "@/data/hero";
import hero from "@/data/hero";

const HeroSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [typedText, setTypedText] = useState("");
  const fullText = heroData.typingText;

  useEffect(() => {
    if (inView) {
      let index = 0;
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 80);

      return () => clearInterval(timer);
    }
  }, [inView, fullText]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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

  const floatingCardVariants = {
    hidden: { scale: 0, rotate: -10 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 20,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-muted"
    >
      {/* Animated Particles Background */}
      <div className="particles-bg">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]"
        >
          {/* Left Column - Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">
                  Available for exciting projects
                </span>
              </div>

              <h1 className="font-bricolage text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block">Abdul Aziz</span>
                <span className="block gradient-text">Full Stack</span>
                <span className="block">Delveloper</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card p-6 rounded-2xl max-w-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-primary" />
                  <span className="text-sm font-space text-muted-foreground">
                    developer.js
                  </span>
                </div>
                <div className="font-space text-lg">
                  <span className="text-accent">const</span>{" "}
                  <span className="text-primary">passion</span>{" "}
                  <span className="text-muted-foreground">=</span>{" "}
                  <span className="text-emerald-500">"</span>
                  <span className="typing-text">
                    {typedText}
                    <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-blink" />
                  </span>
                </div>
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Passionate frontend developer from{" "}
                <span className="font-semibold text-primary">Bangalore</span>,
                crafting digital experiences that blend creativity with
                cutting-edge technology.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <button className="btn-hero ripple group flex items-center gap-3">
                <span className="text-white font-semibold">
                  Explore My Journey
                </span>
                <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
              </button>

              <button className="glass-card px-6 py-3 rounded-xl font-medium transition-all hover:shadow-elevated">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span>Say Hello</span>
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Column - 3D Avatar & Floating Cards */}
          <div className="relative">
            <motion.div variants={itemVariants} className="relative z-10">
              <div className="floating">
                <img
                  src={heroAvatar}
                  alt="Developer Avatar"
                  className="w-80 h-80 mx-auto rounded-full shadow-floating"
                />
              </div>
            </motion.div>

            {/* Floating Achievement Cards */}
            <motion.div
              variants={floatingCardVariants}
              className="absolute top-10 -left-10 glass-card p-4 rounded-2xl floating-delayed"
            >
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">
                  {hero.stats[0].value}
                </div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={floatingCardVariants}
              className="absolute top-1/2 -right-10 glass-card p-4 rounded-2xl floating"
            >
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">12</div>
                <div className="text-sm text-muted-foreground">
                  Projects Built
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={floatingCardVariants}
              className="absolute bottom-10 left-10 glass-card p-4 rounded-2xl floating-delayed"
            >
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">99%</div>
                <div className="text-sm text-muted-foreground">
                  Accessibility Score
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
              <div
                className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-accent/30 rounded-full blur-xl animate-pulse-glow"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Scroll to explore
          </span>
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-transparent rounded-full animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
