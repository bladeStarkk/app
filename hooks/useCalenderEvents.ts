import { useState, useEffect } from 'react';
import { CalendarEvent } from '../types/calender';
import { LocalStore } from '../services/storage/localStore';

export const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from storage on mount
  useEffect(() => {
    const loadData = async () => {
      const stored = await LocalStore.loadEvents();
      if (stored && stored.length > 0) {
        setEvents(stored);
      } else {
        // Default mock data only if storage is empty
        setEvents([
          {
            id: '1',
            title: 'Morning Meeting',
            description: 'Discuss project roadmap',
            startDate: new Date(new Date().setHours(9, 0, 0, 0)),
            endDate: new Date(new Date().setHours(10, 0, 0, 0)),
            location: 'Zoom',
          },
          {
            id: '2',
            title: 'Lunch with Client',
            startDate: new Date(new Date().setHours(12, 30, 0, 0)),
            endDate: new Date(new Date().setHours(13, 30, 0, 0)),
            location: 'Downtown Cafe',
            color: '#FF9500',
          },
        ]);
      }
      setLoaded(true);
    };
    loadData();
  }, []);

  // Save changes to storage
  useEffect(() => {
    if (loaded) {
      LocalStore.saveEvents(events);
    }
  }, [events, loaded]);

  const addEvent = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  const refreshEvents = () => {
    // Logic to fetch events again
    console.log('Refreshing events...');
  };

  return { events, refreshEvents, addEvent };
};
