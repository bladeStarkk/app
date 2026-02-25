import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TodoItem } from './TodoItem';
import { AddTaskModal } from './AddTaskModal';
import { TodoTask } from '../../types/todo';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface TodoListProps {
  todos: TodoTask[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onAddTodo: (title: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onDeleteTodo, onAddTodo }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const activeTodos = todos.filter(t => !t.isCompleted);
  const completedTodos = todos.filter(t => t.isCompleted);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={onAddTodo}
      />

      {todos.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No tasks yet. Add one!</Text>
        </View>
      ) : (
        <View>
          {activeTodos.map(todo => (
            <TodoItem
              key={todo.id}
              task={todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
            />
          ))}
          
          {completedTodos.length > 0 && (
            <View style={styles.completedSection}>
              <Text style={styles.completedHeader}>Completed</Text>
              {completedTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  task={todo}
                  onToggle={onToggleTodo}
                  onDelete={onDeleteTodo}
                />
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  addButton: {
    backgroundColor: Colors.light.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.light.textSecondary,
    fontSize: 16,
  },
  completedSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 10,
  },
  completedHeader: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 10,
    fontWeight: '600',
  },
});
