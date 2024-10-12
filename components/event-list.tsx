"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Fetch events from API
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to mock data if API call fails
        const mockEvents: Event[] = [
          { id: '1', title: 'Tech Conference 2024', date: '2024-06-15', location: 'San Francisco, CA' },
          { id: '2', title: 'Music Festival', date: '2024-07-20', location: 'Austin, TX' },
          { id: '3', title: 'Food & Wine Expo', date: '2024-08-10', location: 'New York, NY' },
        ];
        setEvents(mockEvents);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
              <p className="text-sm text-muted-foreground mb-4">{event.location}</p>
              <Button asChild>
                <Link href={`/events/${event.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}