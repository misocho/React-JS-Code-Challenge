import React from 'react';

import styled from 'styled-components';

import TodoList from './TodoList';
import AddTodo from './AddTodo';
import FilterTodo from './FilterTodo';

const Todo = ({ items, todoMethods, todo }) => {
  return (
    <Wrapper >
   { console.log(items)}
      <AddTodo onAddTodo={todoMethods.createTodo} />
      <FilterTodo />
      <TodoList items={items} todo={todo} toggleComplete={todoMethods.toggleComplete} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 24px;
  cursor: pointer;
`




export default Todo;