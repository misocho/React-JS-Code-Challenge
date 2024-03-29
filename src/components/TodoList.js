import React from 'react'

import styled from 'styled-components'

import TodoItem from './TodoItem';
import FilterTodo from './FilterTodo'


const TodoList = ({ todo, items, toggleComplete, resolveAllItems, filterCompletedItems, filterActiveItems, filterCriteria }) => {

  return (
    <Wrapper>
      <FilterTodo {...{ resolveAllItems, filterCriteria, filterActiveItems, filterCompletedItems }}/>
      {items.map(item => {
        const onComplete = e => {
          toggleComplete(todo, item.id)
        }
        return <TodoItem key={item.id} {...item}  onComplete={onComplete} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default TodoList
