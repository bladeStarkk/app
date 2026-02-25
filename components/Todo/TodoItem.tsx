import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TodoTask } from '../../types/todo';
import { Colors } from '../../constants/Colors';

interface TodoItemProps {
  task: TodoTask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.toggleButton}>
        <Ionicons
          name={task.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={task.isCompleted ? Colors.light.success : Colors.light.textSecondary}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={[styles.title, task.isCompleted && styles.completedTitle]}>
          {task.title}
        </Text>
        {task.dueDate && (
          <Text style={styles.dueDate}>
            Due: {task.dueDate.toLocaleDateString()}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color={Colors.light.danger} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  toggleButton: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: Colors.light.text,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: Colors.light.textSecondary,
  },
  dueDate: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  deleteButton: {
    padding: 4,
  },
});
