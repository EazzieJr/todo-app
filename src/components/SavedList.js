import React from "react";
import { ActionIcon } from "@mantine/core";
import { Draggable } from "react-beautiful-dnd";
import { GripVertical, Trash, ExclamationMark } from "tabler-icons-react";

const SavedList = ({ text, todo, todos, setTodos, index }) => {
  /* Functions */
  // A function to delete todo item
  const deleteTodo = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  // A function to toggle important status of todo item
  const toggleStatus = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            important: !item.important,
          };
        }
        return item;
      })
    );
  };

  // A function to set input to input value while typing
  const handleChange = (e) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            text: e.target.value,
          };
        }
        return item;
      })
    );
  };

  return (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <div
          className={`list-item ${todo.important ? "important" : ""}`}
          ref={provided.innerRef}
          mt="xs"
          {...provided.draggableProps}
        >
          <button className="grip" {...provided.dragHandleProps}>
            <GripVertical color="#5A5B72" size={18} />
          </button>

          <input type="text" value={text} onChange={handleChange} />

          <ActionIcon color="#0054a1" mr={10} variant="hover" onClick={toggleStatus}>
            <ExclamationMark size={16} />
          </ActionIcon>

          <ActionIcon color="red" variant="hover" onClick={deleteTodo}>
            <Trash size={16} />
          </ActionIcon>
        </div>
      )}
    </Draggable>
  );
};

export default SavedList;