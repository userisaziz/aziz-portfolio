import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Phone,
  MapPin,
  Coffee,
  Github,
  Linkedin,
  Twitter,
  Send,
  User,
  MessageSquare,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import contact from "@/data/contact";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Product Manager",
    company: "TechNova Solutions",
    content:
      "Working with this developer has been exceptional. Their attention to detail and innovative solutions consistently exceed expectations.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    role: "CTO",
    company: "StartupCo",
    content:
      "Incredible technical skills and great communication. Delivered our complex dashboard ahead of schedule with excellent performance.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
  },
  {
    id: "3",
    name: "Sarah Williams",
    role: "Designer",
    company: "DesignStudio",
    content:
      "Perfect collaboration between design and development. Brings creative ideas to life with pixel-perfect precision.",
    avatar: "/api/placeholder/40/40",
    rating: 5,
  },
];

const ContactSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });

    // Show success message
    alert("Message sent successfully! 🚀");
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

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

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-background via-muted/20 to-background"
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
              <Coffee className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Let's Connect</span>
            </div>

            <h2 className="font-bricolage text-4xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Bangalore Contact</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Based in the Silicon Valley of India. Let's meet for chai and
              discuss your next amazing project over some delicious South Indian
              coffee!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left Panel - Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="space-y-8">
                {/* Contact Info */}
                <div className="glass-card p-8 rounded-3xl">
                  <h3 className="font-bricolage text-2xl font-bold mb-6">
                    Get In Touch
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Email
                        </div>
                        <div className="font-medium">{contact.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Phone
                        </div>
                        <div className="font-medium">{contact.phoneNumber}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Location
                        </div>
                        <div className="font-medium">{contact.address}</div>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex gap-4">
                      {[
                        { icon: Github, href: "#", label: "GitHub" },
                        { icon: Linkedin, href: "#", label: "LinkedIn" },
                        { icon: Twitter, href: "#", label: "Twitter" },
                      ].map(({ icon: Icon, href, label }) => (
                        <a
                          key={label}
                          href={href}
                          className="w-12 h-12 glass-card rounded-xl flex items-center justify-center hover:shadow-elevated transition-all group"
                          aria-label={label}
                        >
                          <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="glass-card p-8 rounded-3xl">
                  <h3 className="font-bricolage text-xl font-bold mb-6">
                    Send a Message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full pl-12 pr-4 py-4 glass-card rounded-xl border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                          required
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="w-full pl-12 pr-4 py-4 glass-card rounded-xl border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                          required
                        />
                      </div>

                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                        <textarea
                          placeholder="Tell me about your project..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                          className="w-full pl-12 pr-4 py-4 glass-card rounded-xl border-0 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-hero ripple group flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span className="text-white font-semibold">
                            Send Message
                          </span>
                          <Send className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Testimonials */}
                <div className="glass-card p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bricolage text-xl font-bold">
                      What Colleagues Say
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={prevTestimonial}
                        className="w-8 h-8 glass-card rounded-lg flex items-center justify-center hover:shadow-elevated transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextTestimonial}
                        className="w-8 h-8 glass-card rounded-lg flex items-center justify-center hover:shadow-elevated transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="relative overflow-hidden">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex gap-1">
                        {[
                          ...Array(testimonials[currentTestimonial].rating),
                        ].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-accent fill-current"
                          />
                        ))}
                      </div>

                      <p className="text-muted-foreground italic">
                        "{testimonials[currentTestimonial].content}"
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {testimonials[currentTestimonial].name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">
                            {testimonials[currentTestimonial].name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {testimonials[currentTestimonial].role} at{" "}
                            {testimonials[currentTestimonial].company}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Interactive Map */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="font-bricolage text-2xl font-bold mb-4">
                    Find Me in <span className="gradient-text">Bangalore</span>
                  </h3>
                  <p className="text-muted-foreground">
                    Explore my favorite tech spots and meetup locations in
                    India's Silicon Valley
                  </p>
                </div>

                {/* Import BangaloreMap component here */}
                <div className="glass-card p-8 rounded-3xl">
                  <div className="relative bg-muted/20 rounded-2xl h-96 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />

                    {/* Map Pins */}
                    <div className="absolute top-1/4 left-1/3 group cursor-pointer">
                      <div className="w-4 h-4 bg-primary rounded-full shadow-lg animate-pulse-glow" />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 glass-card px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <span className="text-sm font-medium">
                          Koramangala Tech Hub
                        </span>
                      </div>
                    </div>

                    <div className="absolute top-1/2 right-1/3 group cursor-pointer">
                      <div
                        className="w-4 h-4 bg-accent rounded-full shadow-lg animate-pulse-glow"
                        style={{ animationDelay: "0.5s" }}
                      />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 glass-card px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <span className="text-sm font-medium">
                          Cubbon Park Meetups
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-1/4 left-1/2 group cursor-pointer">
                      <div
                        className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg animate-pulse-glow"
                        style={{ animationDelay: "1s" }}
                      />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 glass-card px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <span className="text-sm font-medium">
                          Best Chai Spot
                        </span>
                      </div>
                    </div>

                    {/* Animated Auto-rickshaw */}
                    <div className="absolute bottom-8 left-8 animate-bounce">
                      🛺
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center mx-auto">
                          <MapPin className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bricolage text-lg font-bold">
                            Interactive Map Coming Soon
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            Explore Bangalore's tech scene with custom 3D pins
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Local Flair */}
                  <div className="mt-6 p-4 glass-card rounded-2xl bg-accent/5">
                    <div className="flex items-center gap-3">
                      <Coffee className="w-6 h-6 text-accent" />
                      <div>
                        <h4 className="font-bricolage font-bold">
                          Ping me at Caffeine Nagar!
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Perfect spot for tech discussions over authentic
                          filter coffee ☕
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Local Touch - Auto Rickshaw Animation */}
                <div className="text-center p-8 glass-card rounded-3xl">
                  <div className="text-6xl mb-4">🛺</div>
                  <p className="text-muted-foreground">
                    "Best way to navigate Bangalore? Always keep an
                    auto-rickshaw driver's number handy!"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
