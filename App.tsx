import { Image, StyleSheet, Platform } from 'react-native';

import React, { useState, useEffect } from "react";
import { View, FlatList, TextInput, TouchableOpacity, Button, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import { TabBar } from 'react-native-tab-view';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoItem from './components/TodoItem';
import { Todo } from './model/Todo';
import { TabView, SceneMap } from 'react-native-tab-view';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0); // Tab index

  // Load todos from AsyncStorage
  useEffect(() => {
    const loadTodos = async () => {
      const savedTodos = await AsyncStorage.getItem("todos");
      if (savedTodos) setTodos(JSON.parse(savedTodos));
    };
    loadTodos();
  }, []);

  // Save todos to AsyncStorage
  useEffect(() => {
    const saveTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    };
    saveTodos();
  }, [todos]);

  const addTodo = () => {
    if (text.trim().length > 0) {
      setTodos([...todos, { id: Date.now().toString(), text, completed: false }]);
      setText("");
    }
  };

  const toggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const uncompletedTodos = todos.filter((todo) => !todo.completed);
  const [routes] = useState([
    { key: 'uncompleted', title: 'Uncompleted' },
    { key: 'completed', title: 'Completed' }
  ]);


  const renderScene = SceneMap({
    uncompleted: () => (
      <View key="1">
        <Text style={styles.sectionTitle}>Uncompleted Tasks</Text>
      <FlatList
        data={uncompletedTodos}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      </View>
    ),
    completed: () => (
      <View key="2">
      <Text style={styles.sectionTitle}>Completed Tasks</Text>
      <FlatList
        data={completedTodos}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      </View>
    ),
  });


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>


      
      <GestureHandlerRootView style={{ flex: 1 }}> {}
      <TabView 
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: 100 }} 
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={styles.tabBar} 
              indicatorStyle={styles.indicator} 
              activeColor="#1abc9c" 
              inactiveColor="#7f8c8d" 
            />
          )}
        />
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addButton: {
    backgroundColor: "#1abc9c",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 15,
  },
  tabBar: {
    backgroundColor: "#f7f8fa",
    elevation: 2, // Shadow for elevation effect
    borderBottomWidth: 1,
    borderBottomColor: "#bdc3c7", // Border for the bottom of the TabBar
  },

  indicator: {
    backgroundColor: "#1abc9c", // Color of the active tab indicator
    height: 3, // Height of the indicator line
  }
});