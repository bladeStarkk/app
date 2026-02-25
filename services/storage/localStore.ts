import AsyncStorage from '@react-native-async-storage/async-storage';
import { TodoTask } from '../../types/todo';
import { CalendarEvent } from '../../types/calender';

const STORAGE_KEYS = {
  TODOS: '@productivity-app/todos',
  EVENTS: '@productivity-app/events',
};

// Helper: Revive Date objects from JSON strings
const dateReviver = (key: string, value: any) => {
  const dateKeys = ['createdAt', 'dueDate', 'startDate', 'endDate'];
  if (dateKeys.includes(key) && typeof value === 'string') {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  return value;
};

export const LocalStore = {
  // --- Todos ---
  async saveTodos(todos: TodoTask[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
    } catch (e) {
      console.error('Failed to save todos:', e);
    }
  },

  async loadTodos(): Promise<TodoTask[]> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEYS.TODOS);
      if (json) {
        return JSON.parse(json, dateReviver) as TodoTask[];
      }
    } catch (e) {
      console.error('Failed to load todos:', e);
    }
    return [];
  },

  // --- Calendar Events ---
  async saveEvents(events: CalendarEvent[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error('Failed to save events:', e);
    }
  },

  async loadEvents(): Promise<CalendarEvent[]> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEYS.EVENTS);
      if (json) {
        return JSON.parse(json, dateReviver) as CalendarEvent[];
      }
    } catch (e) {
      console.error('Failed to load events:', e);
    }
    return [];
  },

  // --- General ---
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.TODOS, STORAGE_KEYS.EVENTS]);
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
  },
};
