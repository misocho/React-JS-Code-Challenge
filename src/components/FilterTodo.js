import React from 'react';

import styled from 'styled-components';

const FilterTodo = ({ resolveAllItems, filterCriteria, filterActiveItems, filterCompletedItems }) => {

  return (
    <Filter>
      <FilterTitle>Filter by</FilterTitle>
      <FilterOptions>
        <FilterOption onClick={resolveAllItems}>[{filterCriteria === "all" && "x"}] <Text> All </Text></FilterOption>
        <FilterOption onClick={filterCompletedItems}>[{filterCriteria === "completed" && "x"}] <Text> Completed </Text></FilterOption>
        <FilterOption onClick={filterActiveItems}>[{filterCriteria === "active" && "x"}] <Text> Active </Text></FilterOption>
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