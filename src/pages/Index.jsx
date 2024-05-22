import { useState } from "react";
import {
  Container,
  Heading,
  Input,
  Button,
  VStack,
  HStack,
  Checkbox,
  IconButton,
  Text,
  Box,
} from "@chakra-ui/react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const saveEditing = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editingText } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <Container maxW="container.md" py={10}>
      <Heading mb={6} textAlign="center">
        Procrastination List
      </Heading>
      <HStack mb={4}>
        <Input
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button onClick={addTask} colorScheme="purple">
          Add Task
        </Button>
      </HStack>
      <VStack spacing={4} align="stretch">
        {tasks.map((task, index) => (
          <HStack key={index} spacing={4}>
            <Checkbox
              isChecked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            {editingIndex === index ? (
              <Input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                flex="1"
              />
            ) : (
              <Text
                as={task.completed ? "s" : ""}
                flex="1"
                textDecoration={task.completed ? "line-through" : "none"}
              >
                {task.text}
              </Text>
            )}
            {editingIndex === index ? (
              <IconButton
                aria-label="Save task"
                icon={<FaSave />}
                colorScheme="green"
                onClick={() => saveEditing(index)}
              />
            ) : (
              <IconButton
                aria-label="Edit task"
                icon={<FaEdit />}
                colorScheme="blue"
                onClick={() => startEditing(index)}
              />
            )}
            <IconButton
              aria-label="Delete task"
              icon={<FaTrash />}
              colorScheme="red"
              onClick={() => deleteTask(index)}
            />
          </HStack>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;