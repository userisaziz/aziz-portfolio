import React, { useState, useMemo, useCallback } from "react";
import { Calendar, MapPin, Play, TrendingUp, Users, Code2 } from "lucide-react";
import { useInView } from "react-intersection-observer";

// Types
interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  impact: string;
  videoUrl?: string;
}

interface WorkExperienceProps {
  experiences: Experience[];
}

// Sub-components
const TimelineNavigation = React.memo(
  ({
    experiences,
    activeExperience,
    setActiveExperience,
  }: {
    experiences: Experience[];
    activeExperience: string;
    setActiveExperience: (id: string) => void;
  }) => (
    <div className="sticky top-24">
      <div className="relative">
        {/* Timeline line - positioned to align with dot centers */}
        <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent" />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative cursor-pointer transition-all duration-300 ${
                activeExperience === exp.id ? "scale-105" : ""
              }`}
              onClick={() => setActiveExperience(exp.id)}
            >
              {/* Timeline dot - centered at left-0 */}
              <div
                className={`absolute left-0 top-3 w-6 h-6 rounded-full border-4 transition-all duration-300 z-10 ${
                  activeExperience === exp.id
                    ? "bg-primary border-primary shadow-md scale-125"
                    : "bg-background border-muted-foreground/30"
                }`}
              />

              {/* Content card */}
              <div
                className={`ml-12 glass-card p-6 rounded-2xl transition-all duration-300 hover:shadow-lg ${
                  activeExperience === exp.id
                    ? "ring-2 ring-primary/20 shadow-md"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">
                    {exp.period}
                  </span>
                </div>

                <h3 className="font-bricolage text-xl font-bold mb-1">
                  {exp.role}
                </h3>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{exp.company}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span className="text-sm">{exp.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
);

TimelineNavigation.displayName = "TimelineNavigation";

const ExperienceDetail = React.memo(
  ({ experience }: { experience: Experience }) => (
    <div className="space-y-8 animate-fade-in">
      <div className="glass-card p-8 rounded-3xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-bricolage text-3xl font-bold mb-2">
              {experience.role}
            </h3>
            <p className="text-xl text-muted-foreground mb-4">
              {experience.company} • {experience.period}
            </p>
            <p className="text-lg leading-relaxed">{experience.description}</p>
          </div>

          {experience.videoUrl && (
            <button className="glass-card p-4 rounded-xl hover:shadow-md transition-all group">
              <Play className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </button>
          )}
        </div>

        <div className="glass-card p-4 rounded-2xl bg-primary/5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-semibold">Impact</span>
          </div>
          <p className="text-muted-foreground">{experience.impact}</p>
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-accent" />
          <h4 className="font-bricolage text-xl font-bold">Key Achievements</h4>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {experience.achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{achievement}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl">
        <div className="flex items-center gap-2 mb-6">
          <Code2 className="w-5 h-5 text-primary" />
          <h4 className="font-bricolage text-xl font-bold">
            Technologies Used
          </h4>
        </div>

        <div className="flex flex-wrap gap-3">
          {experience.technologies.map((tech, index) => (
            <span
              key={tech}
              className="px-4 py-2 glass-card rounded-lg text-sm font-medium hover:shadow-md transition-all cursor-default animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
);

ExperienceDetail.displayName = "ExperienceDetail";

const SectionHeader = React.memo(() => (
  <div className="text-center mb-16 animate-fade-in">
    <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
      <TrendingUp className="w-4 h-4 text-accent" />
      <span className="text-sm font-medium">Career Journey</span>
    </div>

    <h2 className="font-bricolage text-4xl lg:text-6xl font-bold mb-6">
      <span className="gradient-text">Experience Timeline</span>
    </h2>

    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
      Explore my professional journey through an interactive timeline showcasing
      growth, achievements, and the technologies that shaped my career.
    </p>
  </div>
));

SectionHeader.displayName = "SectionHeader";

const WorkExperience = ({ experiences }: WorkExperienceProps) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeExperience, setActiveExperience] = useState(experiences[0].id);

  const activeExperienceData = useMemo(
    () => experiences.find((exp) => exp.id === activeExperience),
    [experiences, activeExperience]
  );

  const handleSetActiveExperience = useCallback((id: string) => {
    setActiveExperience(id);
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-muted/30 to-background"
    >
      <div className="container mx-auto px-6">
        <SectionHeader />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <TimelineNavigation
                experiences={experiences}
                activeExperience={activeExperience}
                setActiveExperience={handleSetActiveExperience}
              />
            </div>

            <div className="lg:col-span-2">
              {activeExperienceData && (
                <ExperienceDetail experience={activeExperienceData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Default export with mock data import
const WorkExperienceWithData = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  React.useEffect(() => {
    import("@/data/experiences.json")
      .then((data) => {
        setExperiences(data.default);
      })
      .catch(() => {
        setExperiences([]);
      });
  }, []);

  if (experiences.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-pulse">Loading experiences...</div>
        </div>
      </section>
    );
  }

  return <WorkExperience experiences={experiences} />;
};

export default React.memo(WorkExperienceWithData);
