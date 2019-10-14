import React from 'react';

import styled from 'styled-components';

import Todo from './Todo';

const ListTodos = ({ items, displayTodos, todoMethods }) => (
  <Wrapper >
    {items.map(item => {
      const onDisplay = e => {
        displayTodos(item.id);
      }
      return <Todo key={item.id} title={item.title} todo={item.id} items={item.todoItems} onDisplay={onDisplay} todoMethods={todoMethods} />
    })}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default ListTodos;