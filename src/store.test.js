import TodosContainer from './store';

import './setupTests';
import expectExport from 'expect';

const defaultState = {
  list: [
    {
      id: 1,
      title: 'First todo',
      todoItems: [
        {
          id: 1,
          completed: false,
          text: 'Read README'
        },
        {
          id: 2,
          completed: false,
          text: 'Add one todo'
        },
        {
          id: 3,
          completed: false,
          text: 'Add filters'
        },
        {
          id: 4,
          completed: false,
          text: 'Add multiple lists'
        },
        {
          id: 5,
          completed: false,
          text: 'Optional: add tests'
        }
      ]
    },
    {
      id: 2,
      title: 'Second todo',
      todoItems: [
        {
          id: 6,
          completed: false,
          text: 'Create github repo'
        },
        {
          id: 7,
          completed: false,
          text: 'Go though source code'
        },
        {
          id: 8,
          completed: false,
          text: 'Add list todos'
        },
        {
          id: 9,
          completed: false,
          text: 'Add filter todos'
        }
      ]
    }
  ]
}

const todos = new TodosContainer();

it('readStorage', () => {
  const localStorage = todos.readStorage();
  expectExport(localStorage).toEqual(defaultState);
});

it('toggleComplete', async () => {
  const todoId = 1;
  const todoItemId = 2;
  await todos.toggleComplete(todoId, todoItemId)
  const todoList = todos.readStorage();
  const todo = todoList.list.find(({id}) => id === todoId);
  const completedTodo = todo.todoItems.find(i => i.id === todoItemId);
  expect(completedTodo.completed).toEqual(true);
});

it('createTodoList', async () => {
  const title = 'Test todo list';
  await todos.createTodoList(title);
  const todoList = todos.readStorage();
  expect(todoList.list.length).toEqual(3)
});

it('createTodo', async () => {
  const todoId = 2;
  const text = 'New test todo';
  await todos.createTodo(text, todoId);
  const todoList = todos.readStorage();
  const todo = todoList.list.find(({id}) => id === todoId);
  expect(todo.todoItems.length).toEqual(5);
});

it('filter', () => {
  const todoId = 1;
  const criteria = (item) => item.completed;
  const filteredCompleted = todos.filter(todoId)(criteria);
  expect(filteredCompleted).toEqual([{
    id: 2,
    completed: true,
    text: 'Add one todo'
  }]);
});