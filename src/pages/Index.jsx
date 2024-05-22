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
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

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

  const handleEditClick = (index, text) => {
    setEditIndex(index);
    setEditText(text);
  };

  const handleSaveClick = () => {
    const updatedTasks = tasks.map((task, i) =>
      i === editIndex ? { ...task, text: editText } : task
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditText("");
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
        <Button onClick={addTask} colorScheme="green">
          Add Task
        </Button>
      </HStack>
      <VStack spacing={4} align="stretch">
        {tasks.map((task, index) => (
          <HStack key={index} spacing={4}>
            {editIndex === index ? (
              <>
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <Button onClick={handleSaveClick} colorScheme="blue">
                  Save
                </Button>
              </>
            ) : (
              <>
                <Checkbox
                  isChecked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                <Text
                  as={task.completed ? "s" : ""}
                  flex="1"
                  textDecoration={task.completed ? "line-through" : "none"}
                >
                  {task.text}
                </Text>
                <IconButton
                  aria-label="Edit task"
                  icon={<FaEdit />}
                  colorScheme="yellow"
                  onClick={() => handleEditClick(index, task.text)}
                />
                <IconButton
                  aria-label="Delete task"
                  icon={<FaTrash />}
                  colorScheme="red"
                  onClick={() => deleteTask(index)}
                />
              </>
            )}
          </HStack>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;