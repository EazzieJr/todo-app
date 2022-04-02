import SavedList from "./SavedList";
import { Button, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Demo() {
  /* States */
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([{ text: "", important: false, id: Math.random() * 100 }]);
  const [value, setValue] = useLocalStorage([]);

  /* Effects */
  // Getting todo items from local storage on load
  useEffect(() => {
    getLocalTodos();
  }, []);

  // Saving todo to local storage on change of items in todo
  useEffect(() => {
    saveLocalTodos();
  }, [todos]);

  /* Functions */
  // A function to save todo to local storage
  const saveLocalTodos = () => {
    setValue(todos);
  };

  // A function to get todo items from local storage
  const getLocalTodos = () => {
    if (value === null) {
      setValue([]);
    } else {
      setTodos(value);
    }
  };

  // A function to add todo item on enter/click of add button
  const submitHandler = (e) => {
    e.preventDefault();
    setTodos([...todos, { text: inputText, important: false, id: Math.random() * 100 }]);
    setInputText("");
  };

  // A function to set input to input value while typing
  const inputTextHandler = (event) => {
    setInputText(event.target.value);
  };

  // A function to reorder list items on drag and drop
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // A function to handle drag and drop
  const dragEnd = (param) => {
    const { source, destination } = param;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(todos, source.index, destination.index);
      setTodos(items);
    }
  };

  // A map function to render list items
  const savedList = todos?.map((todo, index) => (
    <SavedList
      key={todo.id}
      text={todo.text}
      todo={todo}
      todos={todos}
      setTodos={setTodos}
      inputText={inputText}
      index={index}
    />
  ));



  return (
    <div className="form">
      <h1>TODO APP</h1>

      <form>
        <input type="text" className="todo-input" onChange={inputTextHandler} value={inputText} />
        <Button className="add-button" type="submit" onClick={submitHandler}>
          Add
        </Button>
      </form>

      <div className="saved-items">
        <h4>My tasks</h4>
        <DragDropContext onDragEnd={dragEnd}>
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {savedList}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Demo;
