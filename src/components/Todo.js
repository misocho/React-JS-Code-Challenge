import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import TodoList from './TodoList';
import AddTodo from './AddTodo';

const Todo = ({ items, filterCompleted, filterActive, filterAll, todoMethods, todo, filter }) => {
  const [filterCriteria, setFilterCriteria] = useState("all")
  const [itemsToBeDisplayed, setItems] = useState(items);
  useEffect(() => {
    const filterOutData = (items) => {
      return {
        completed: filter((item) => item.completed),
        active: filter((item) => !item.completed),
        all: items
      }[filterCriteria]
    }
    setItems(filterOutData(items))

  }, [filter, filterCriteria, items])
  const filterCompletedItems = () => {
    setFilterCriteria("completed")
  }
  const filterActiveItems = () => {
    setFilterCriteria("active")
  }
  const resolveAllItems = () => {
    setFilterCriteria("all")
  }

  return (
    <Wrapper >
      
      <AddTodo onAddTodo={todoMethods.createTodo} todo={todo} />
      <TodoList items={itemsToBeDisplayed} {...{ todo, filterActiveItems, filterCompletedItems, resolveAllItems, filterCriteria }} toggleComplete={todoMethods.toggleComplete} />
    </Wrapper>
  )
};


const Wrapper = styled.div`
  font-size: 24px;
  cursor: pointer;
`

export default Todo;