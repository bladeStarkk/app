import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../../constants/Colors';
import { CalendarEvent } from '../../types/calender';
import { EventCard } from './EventCard';

interface CalendarViewProps {
  date: Date;
  events: CalendarEvent[];
  onEventPress?: (event: CalendarEvent) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ date, events, onEventPress }) => {
  const filteredEvents = events.filter(event => 
    event.startDate.getDate() === date.getDate() &&
    event.startDate.getMonth() === date.getMonth() &&
    event.startDate.getFullYear() === date.getFullYear()
  ).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
      </Text>
      
      {filteredEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No events for today</Text>
        </View>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard 
              event={item} 
              onPress={() => onEventPress?.(item)}
            />
          )}
          scrollEnabled={false} // Assuming this is nested in a ScrollView in the parent
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.light.background,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 8,
  },
  emptyText: {
    color: Colors.light.textSecondary,
    fontSize: 14,
  },
});
