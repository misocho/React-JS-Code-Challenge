import React from 'react';

import styled from 'styled-components';

import TodoList from './TodoList';
import AddTodo from './AddTodo';
import FilterTodo from './FilterTodo';

const Todo = ({ items, filterCompleted, filterActive, todoMethods, todo }) => {
  console.log('Checks filter states', filterActive, filterCompleted);
  return (
    <Wrapper >
      <AddTodo onAddTodo={todoMethods.createTodo} />
      <FilterTodo filterActive={todoMethods.filterActive} isFilterActive={filterActive} isFilterCompleted={filterCompleted} filterCompleted={todoMethods.filterCompleted} todo={todo}/>
      <TodoList items={items} todo={todo} toggleComplete={todoMethods.toggleComplete} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 24px;
  cursor: pointer;
`




export default Todo;