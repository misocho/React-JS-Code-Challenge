import React from 'react'

import styled from 'styled-components'

import TodoItem from './TodoItem'

const TodoList = ({ todo, items, toggleComplete, resolveAllItems, filterCompletedItems, filterActiveItems, filterCriteria }) => {

  return (
    <Wrapper>
      <Filter>
        <FilterTitle>Filter by</FilterTitle>
        <FilterOptions>
          <FilterOption onClick={resolveAllItems}>[{filterCriteria==="all" && "x"}] <Text> All </Text></FilterOption>
          <FilterOption onClick={filterCompletedItems}>[{filterCriteria === "completed" && "x"}] <Text> Completed </Text></FilterOption>
          <FilterOption onClick={filterActiveItems}>[{filterCriteria === "active" && "x"}] <Text> Active </Text></FilterOption>
        </FilterOptions>
      </Filter>
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

const Filter = styled.div`
  display: flex;
`

const FilterTitle = styled.p`
`
const FilterOptions = styled.div`
  display: flex;
  margin: auto 20px;
`

const FilterOption = styled.div`
  margin: auto 30px;
`

const Text = styled.p`
  font-weight: 400;
  display: inline;
  font-size: 12px;
`


export default TodoList
