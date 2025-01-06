import React from "react";
import { TodoItemProps } from "../model/TodoItemProps";
import { Swipeable } from "react-native-gesture-handler"; // Import Swipeable component
import { StyleSheet, Text, View,ImageBackground,  TouchableOpacity } from "react-native";

export default function TodoItem({ todo, toggleComplete, deleteTodo }: TodoItemProps) {
    const renderRightActions = () => (
      <View style={styles.deleteButton}>
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  
    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.todoItem}>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => toggleComplete(todo.id)}>
              <Text style={[styles.text, todo.completed && styles.completed]}>
                {todo.text}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Swipeable>
    );
  }
  
  const styles = StyleSheet.create({
    todoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
      borderRadius: 10,
      padding: 15,
      height: 60,
      backgroundColor: "white",
      shadowColor: "#000",
      elevation: 2,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1, 
      shadowRadius: 4,
    },
    textContainer: {
      flex: 1,
      justifyContent: "center",
    },
    text: {
      fontSize: 18,
      fontWeight: "600",
      color: "#333",
    },
    completed: {
      textDecorationLine: "line-through",
      color: "gray",
    },
    deleteButton: {
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      height: 60,
      width: 80, 
      borderRadius: 10,
    },
    deleteText: {
      color: "white",
      fontWeight: "bold",
    },
  });