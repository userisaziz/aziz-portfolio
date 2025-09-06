import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Brain, Code, Zap, Star } from "lucide-react";

const skillsData = [
  { year: "2020", React: 65, TypeScript: 40, WebGL: 20, "Design Systems": 30, GraphQL: 25 },
  { year: "2021", React: 80, TypeScript: 70, WebGL: 45, "Design Systems": 60, GraphQL: 50 },
  { year: "2022", React: 90, TypeScript: 85, WebGL: 70, "Design Systems": 80, GraphQL: 75 },
  { year: "2023", React: 95, TypeScript: 92, WebGL: 85, "Design Systems": 90, GraphQL: 88 },
  { year: "2024", React: 98, TypeScript: 95, WebGL: 92, "Design Systems": 95, GraphQL: 92 },
];

const radarData = [
  { skill: "Frontend", current: 95, target: 98 },
  { skill: "Backend", current: 78, target: 85 },
  { skill: "Design", current: 85, target: 90 },
  { skill: "3D/WebGL", current: 88, target: 95 },
  { skill: "DevOps", current: 72, target: 80 },
  { skill: "Mobile", current: 65, target: 75 },
];

const certifications = [
  { name: "AWS Certified Developer", year: "2023", level: "Professional" },
  { name: "React Advanced Patterns", year: "2023", level: "Expert" },
  { name: "Three.js Fundamentals", year: "2022", level: "Advanced" },
  { name: "TypeScript Deep Dive", year: "2022", level: "Expert" },
];

const learningGoals = [
  { skill: "WebAssembly", progress: 65, target: "Q2 2024" },
  { skill: "Rust", progress: 40, target: "Q3 2024" },
  { skill: "Machine Learning", progress: 30, target: "Q4 2024" },
  { skill: "Blockchain", progress: 25, target: "Q1 2025" },
];

export function SkillsGrowthSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeView, setActiveView] = useState<'timeline' | 'radar' | 'goals'>('timeline');

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
        type: 'spring' as const,
        stiffness: 100,
      } as const,
    },
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* View Toggle */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="flex justify-center">
              <div className="glass-card p-2 rounded-2xl">
                <div className="flex gap-2">
                  {[
                    { id: 'timeline', label: 'Timeline', icon: TrendingUp },
                    { id: 'radar', label: 'Skills Map', icon: Zap },
                    { id: 'goals', label: 'Learning Goals', icon: Star },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveView(id as any)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                        activeView === id
                          ? 'bg-primary text-primary-foreground shadow-soft'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <div className="space-y-12">
            {/* Skills Timeline */}
            {activeView === 'timeline' && (
              <motion.div variants={itemVariants} className="space-y-8">
                {/* Certifications */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.name}
                      variants={itemVariants}
                      className="glass-card p-6 rounded-2xl hover:shadow-elevated transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary">{cert.year}</Badge>
                      </div>
                      <h3 className="font-bricolage font-bold mb-2">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">{cert.level}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Skills Radar */}
            {activeView === 'radar' && (
              <motion.div variants={itemVariants}>
                <Card className="glass-card border-0 shadow-elevated">
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Current vs Target Skills
                    </CardTitle>
                    <CardDescription>
                      A comprehensive view of my skill portfolio and growth targets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="hsl(var(--border))" />
                          <PolarAngleAxis 
                            dataKey="skill" 
                            tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                          />
                          <PolarRadiusAxis 
                            angle={90} 
                            domain={[0, 100]}
                            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <Radar
                            name="Current"
                            dataKey="current"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                          <Radar
                            name="Target"
                            dataKey="target"
                            stroke="hsl(var(--accent))"
                            fill="hsl(var(--accent))"
                            fillOpacity={0.1}
                            strokeWidth={2}
                            strokeDasharray="5 5"
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                              boxShadow: 'var(--shadow-elevated)',
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Learning Goals */}
            {activeView === 'goals' && (
              <motion.div variants={itemVariants} className="space-y-6">
                <Card className="glass-card border-0 shadow-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" />
                      Current Learning Goals
                    </CardTitle>
                    <CardDescription>
                      Expanding horizons with emerging technologies
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {learningGoals.map((goal, index) => (
                      <div key={goal.skill} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bricolage font-bold">{goal.skill}</h3>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Target: {goal.target}</span>
                            <Badge variant="outline">{goal.progress}%</Badge>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            className="bg-gradient-primary h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${goal.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Fun Learning Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="glass-card border-0 shadow-elevated text-center">
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold gradient-text mb-2">150+</div>
                      <div className="text-sm text-muted-foreground">Hours Learning</div>
                      <div className="text-xs text-muted-foreground mt-1">This Year</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card border-0 shadow-elevated text-center">
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold gradient-text mb-2">12</div>
                      <div className="text-sm text-muted-foreground">Courses Completed</div>
                      <div className="text-xs text-muted-foreground mt-1">2024</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card border-0 shadow-elevated text-center">
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold gradient-text mb-2">4</div>
                      <div className="text-sm text-muted-foreground">New Technologies</div>
                      <div className="text-xs text-muted-foreground mt-1">In Progress</div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}