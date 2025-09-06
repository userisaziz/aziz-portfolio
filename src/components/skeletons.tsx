import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ProjectCardSkeletonProps {
  featured?: boolean;
}

export const ProjectCardSkeleton: React.FC<ProjectCardSkeletonProps> = ({ featured = false }) => {
  return (
    <div className={`glass-card rounded-2xl overflow-hidden h-full ${featured ? 'md:col-span-2 lg:col-span-2' : ''}`}>
      {/* Image skeleton */}
      <Skeleton className="aspect-video bg-muted/20" />
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Category badge */}
        <Skeleton className="h-5 w-20 rounded-full" />
        
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Tech stack */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-6 w-14 rounded" />
        </div>
        
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
          <div className="text-center space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
          <div className="text-center space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSectionSkeleton: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Header skeleton */}
        <div className="text-center mb-16 space-y-6">
          <Skeleton className="h-8 w-32 mx-auto rounded-full" />
          <Skeleton className="h-12 w-80 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Filter skeleton */}
        <div className="flex justify-center mb-12">
          <div className="glass-card p-2 rounded-2xl">
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-24 rounded-xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Projects grid skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          <ProjectCardSkeleton featured />
          {Array.from({ length: 5 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>

        {/* View all button skeleton */}
        <div className="text-center">
          <Skeleton className="h-12 w-48 mx-auto rounded-2xl" />
        </div>
      </div>
    </section>
  );
};

export const ContactSectionSkeleton: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Header skeleton */}
        <div className="text-center mb-16 space-y-6">
          <Skeleton className="h-8 w-32 mx-auto rounded-full" />
          <Skeleton className="h-12 w-80 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info skeleton */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-8 rounded-3xl space-y-6">
              <Skeleton className="h-8 w-40" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Contact form skeleton */}
            <div className="glass-card p-8 rounded-3xl space-y-6">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-4">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>
          </div>

          {/* Right panel skeleton */}
          <div className="lg:col-span-3 space-y-8">
            <div className="glass-card p-8 rounded-3xl space-y-6">
              <Skeleton className="h-8 w-40" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};