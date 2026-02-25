import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';
import { useCalendarEvents } from '../../hooks/useCalenderEvents';
import { useTodos } from '../../hooks/useTodos';
import { CalendarView } from '../../components/Calender/CalenderView';
import { TodoList } from '../../components/Todo/TodoList';
import { Colors } from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { events, refreshEvents } = useCalendarEvents();
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [refreshing, setRefreshing] = useState(false);

  // Example: today's date
  const today = new Date();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    refreshEvents();
    setRefreshing(false);
  }, [refreshEvents]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.headerContainer}>
          <Text style={styles.greeting}>Good Morning, Felix</Text>
          <Text style={styles.date}>{today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <CalendarView 
            date={today} 
            events={events} 
            onEventPress={(event) => console.log('Event pressed:', event.title)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onAddTodo={addTodo}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  date: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
  },
});
