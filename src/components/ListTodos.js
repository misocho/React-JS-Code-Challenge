import React, { useState } from 'react';

import styled from 'styled-components';

import Todo from './Todo';

const ListTodos = ({ items, todoMethods }) => {
  return (
    <Wrapper >
      {items.map(item => <ListTodoContainer {...{ item, todoMethods }} key={item.id}/>)}
    </Wrapper>
  )
}


const ListTodoContainer = ({item, todoMethods}) => {
  const [displayList, setDisplayList] = useState(false)
  const onDisplay = e => {
    setDisplayList(display => !display)
  }

  return (
    <TodosWrapper>
      <TodoHeader onClick={onDisplay}>
        <Title>{item.title}</Title>
        <CloseButton display={displayList.toString()}>+</CloseButton>
      </TodoHeader>
      {displayList && <Todo {...item} title={item.title} todo={item.id} filter={todoMethods.filter(item.id)} items={item.todoItems} todoMethods={todoMethods} />}
    </TodosWrapper>)
}

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
  width: 100%;
  display: flex;
  flex-direction: column;
`
const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`

const CloseButton = styled.p`
  font-weight: 700;
  font-size: 24px;
  transform: ${props => props.display === "true" ? 'rotate(40deg)' : 'rotate(0deg)'};
  margin-left: auto;
`

export default ListTodos;