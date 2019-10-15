import React from 'react';

import styled from 'styled-components';

import Todo from './Todo';

const ListTodos = ({ items, displayTodos, todoMethods }) => (
  <Wrapper >
    {items.map(item => {
      const onDisplay = e => {
        displayTodos(item.id);
      }
      
      return (
        <TodosWrapper>
          <TodoHeader>
            <Title>{item.title}</Title>
            <CloseButton onClick={onDisplay}>+</CloseButton>
          </TodoHeader>
          {item.display ? <Todo {...item} key={item.id} title={item.title} todo={item.id} items={item.todoItems} todoMethods={todoMethods} /> : ''}
        </TodosWrapper>)
    })}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%
`
const Title = styled.p`
  font-weight: 700;
  text-transform: uppercase;
  margin-right: auto;
`
const TodosWrapper = styled.div`
  margin: 30px auto;
  width: 500px;
  display: flex;
  flex-direction: column;
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
  cursor: pointer;
`

export default ListTodos;