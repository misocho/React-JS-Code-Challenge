import React from 'react';

import styled from 'styled-components';

const FilterTodo = ({ filterCompleted, filterActive }) => {
  return (
    <Filter>
      <FilterTitle>Filter by</FilterTitle>
      <FilterOptions>
        <Completed>[{ filterCompleted ? 'x' : ' ' }] <Text> Completed </Text></Completed>
        <Active>[{ filterActive ? 'x' : ' '}] <Text> Active </Text></Active>
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

const Completed = styled.div`
  margin: auto 30px;
`
const Active = styled.div`
`

const Text = styled.p`
  font-weight: 400;
  display: inline;
  font-size: 12px;
`

export default FilterTodo;