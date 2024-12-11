import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const TodoItem = ({ item, onDelete, onEdit, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      onEdit(item.id, editText); // Сохраняем изменения
    }
    setIsEditing(!isEditing); // Переключаем режим редактирования
  };

  return (
    <TouchableOpacity
      onPress={() => onToggleComplete(item.id)}
      style={[styles.todoItem, item.isCompleted && styles.completed]}
    >
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editText}
          onChangeText={setEditText}
          placeholder="Редактировать задачу"
        />
      ) : (
        <Text style={[styles.todoText, item.isCompleted && styles.completedText]}>
          {item.text}
        </Text>
      )}
      <View style={styles.buttons}>
        <Button title={isEditing ? 'Сохранить' : 'Редактировать'} onPress={handleEdit} />
        <Button title="Удалить" onPress={() => onDelete(item.id)} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    gap: 5,
  },
  completed: {
    backgroundColor: '#d4edda',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
});

export default TodoItem;
