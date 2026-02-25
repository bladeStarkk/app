import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CalendarEvent } from '../../types/calender';
import { Colors } from '../../constants/Colors';

interface EventCardProps {
  event: CalendarEvent;
  onPress?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, { borderLeftColor: event.color || Colors.light.primary }]}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(event.startDate)}</Text>
        <Text style={styles.durationText}>
          {Math.round((event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60))} min
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{event.title}</Text>
        {event.location && <Text style={styles.location}>{event.location}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 8, // Changed to number
    marginBottom: 10,
    padding: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timeContainer: {
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  durationText: {
    fontSize: 10,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
});
