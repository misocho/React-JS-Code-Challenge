import React from 'react';

import styled from 'styled-components';

const FilterTodo = ({ filterCompleted, isFilterActive, isFilterAll, isFilterCompleted, filterActive, filterAll, todo }) => {
  const onFilterActive = e => {
    filterActive(todo);
  }

  const onFilterCompleted = e => {
    filterCompleted(todo);
  }

  const onFilterAll = e => {
    filterAll(todo);
  }

  return (
    <Filter>
      <FilterTitle>Filter by</FilterTitle>
      <FilterOptions>
        <FilterOption onClick={onFilterAll}>[{isFilterAll ? 'x' : ' '}] <Text> Alls </Text></FilterOption>
        <FilterOption onClick={onFilterCompleted}>[{ isFilterCompleted ? 'x' : ' ' }] <Text> Completed </Text></FilterOption>
        <FilterOption onClick={onFilterActive}>[{isFilterActive ? 'x' : ' '}] <Text> Active </Text></FilterOption>
      </FilterOptions>
    </Filter>
  )
}

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

export default FilterTodo;