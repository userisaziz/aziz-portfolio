import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, MapPin, Users, Calendar, Navigation } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MapLocation {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  type: 'tech-hub' | 'meetup' | 'coffee' | 'home';
  icon: string;
  details: {
    address: string;
    timing?: string;
    speciality?: string;
  };
}

const bangaloreLocations: MapLocation[] = [
  {
    id: 'koramangala',
    name: 'Koramangala Tech Hub',
    description: 'Heart of Bangalore\'s startup ecosystem - where innovation thrives',
    coordinates: [77.6409, 12.9352],
    type: 'tech-hub',
    icon: '💻',
    details: {
      address: 'Koramangala, Bangalore',
      speciality: 'Startup Hub',
      timing: 'Always buzzing',
    },
  },
  {
    id: 'cubbon-park',
    name: 'Cubbon Park Meetups',
    description: 'Regular meetup spot for React Bangalore and tech communities',
    coordinates: [77.5946, 12.9716],
    type: 'meetup',
    icon: '👥',
    details: {
      address: 'Cubbon Park, MG Road, Bangalore',
      timing: 'Weekends 10 AM - 6 PM',
      speciality: 'Tech Meetups & Networking',
    },
  },
  {
    id: 'chai-spot',
    name: 'Best Chai Spot 🛺',
    description: 'Authentic roadside chai for those long coding sessions',
    coordinates: [77.6033, 12.9352],
    type: 'coffee',
    icon: '🍵',
    details: {
      address: 'HSR Layout, Bangalore',
      timing: '6 AM - 11 PM',
      speciality: 'Authentic Street Chai',
    },
  },
  {
    id: 'caffeine-nagar',
    name: 'Caffeine Nagar',
    description: 'Perfect spot for tech discussions over authentic filter coffee ☕',
    coordinates: [77.6387, 12.9698],
    type: 'coffee',
    icon: '☕',
    details: {
      address: 'Indiranagar, Bangalore',
      timing: '7 AM - 11 PM',
      speciality: 'Filter Coffee & Tech Talks',
    },
  },
];

export function BangaloreMap() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'tech-hub': return <MapPin className="w-4 h-4" />;
      case 'meetup': return <Users className="w-4 h-4" />;
      case 'coffee': return <Coffee className="w-4 h-4" />;
      case 'home': return <Navigation className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-card border-0 shadow-elevated overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Find Me in Bangalore
              </CardTitle>
              <CardDescription>
                Explore my favorite tech spots and meetup locations in India's Silicon Valley
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-96 bg-muted/20 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124423.7871531434!2d77.49346484333093!3d12.953945614161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1704729600000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bangalore Map"
                />
                
                {/* Overlay pins */}
                <div className="absolute top-4 left-4 glass-card p-3 rounded-xl">
                  <h3 className="font-bricolage font-bold text-sm mb-1">🗺️ My Bangalore</h3>
                  <p className="text-xs text-muted-foreground">Tech spots & hangouts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Details */}
        <div className="space-y-4">
          <Card className="glass-card border-0 shadow-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Bangalore Highlights</CardTitle>
              <CardDescription>
                My favorite spots in the city
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {bangaloreLocations.map((location) => (
                <motion.div
                  key={location.id}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedLocation?.id === location.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-accent/50'
                  }`}
                  onClick={() => setSelectedLocation(location)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{location.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bricolage font-bold text-sm">
                          {location.name}
                        </h3>
                        {getLocationIcon(location.type)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {location.description}
                      </p>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          📍 {location.details.address}
                        </p>
                        {location.details.timing && (
                          <p className="text-xs text-muted-foreground">
                            🕒 {location.details.timing}
                          </p>
                        )}
                        {location.details.speciality && (
                          <Badge variant="secondary" className="text-xs">
                            {location.details.speciality}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Local Fun Facts */}
          <Card className="glass-card border-0 shadow-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Bangalore Vibes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span>🛺</span>
                <span>Best transport: Auto-rickshaw</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>☕</span>
                <span>Coffee culture capital</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>🌦️</span>
                <span>Perfect weather year-round</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>🏢</span>
                <span>15,000+ tech companies</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>🍵</span>
                <span>Ping me at Caffeine Nagar!</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}