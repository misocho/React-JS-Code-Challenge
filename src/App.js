import React from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import TodosContainer from './store'

import AddTodoList from './components/AddTodoList';
import ListTodos from './components/ListTodos';

function App() {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {todos => {
            const list = todos.listTodos()
            return (
              <TodosWrapper >
                <AddTodoList onAddTodoList={todos.createTodoList} />
                <ListTodos items={list} displayTodos={todos.displayTodos} getList={todos.getList} todoMethods={todos} />
              </TodosWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`
const TodosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
`

export default App
