import React from 'react';

import styled from 'styled-components';

import TodoList from './TodoList';
import AddTodo from './AddTodo';
import FilterTodo from './FilterTodo';

const Todo = ({ title, onDisplay, items, todoMethods, todo }) => {
  return (
    <Wrapper onClick={onDisplay}>
      <TodoHeader>
        <Title>{title}</Title>
        <CloseButton>+</CloseButton>
      </TodoHeader>
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

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

const Title = styled.p`
  font-weight: 700;
  text-transform: uppercase;
  margin-right: auto;
`
const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const CloseButton = styled.p`
  font-weight: 700;
  font-size: 24px;
  transform: rotate(40deg);
  margin-left: auto;
`

export default Todo;