import { Container } from 'unstated'

const defaultState = {
  list: [
    {
      id: 1,
      title: 'First todo',
      display: false,
      filterCompleted: false,
      filterActive: false,
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
      display: false,
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

class TodosContainer extends Container {
  constructor(props) {
    super(props)

    this.state = this.readStorage()
  }

  readStorage() {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }

    return defaultState
  }

  syncStorage() {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }

  displayTodos = async id => {
    const todo = this.state.list.find(i => i.id === id);
    const display = !todo.dispay;
    await this.setState(state => {
      const list = state.list.map(todo => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          display
        }
      });
      
      return { list }
    });
    console.log('State list', this.state.list)
    this.syncStorage();
  }

  listTodos() {
    return this.state.list;
  }


  toggleComplete = async (todo, id) => {
    const currentTodo = this.state.list.find(i => i.id === todo);
    console.log('Current todo', currentTodo);
    const item = currentTodo.todoItems.find(i => i.id === id)
    const completed = !item.completed
    console.log('The item', item);

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state=>{
      const list = state.list.map(listItem=>{
        const updatedTodoList = listItem.todoItems.map(item=>(item.id===id?{...item,completed}:{...item}));
        return {
          ...listItem,
          todoItems:updatedTodoList,
        }
      })
      return{
        ...state,
        list,
      }
    });
  
    this.syncStorage()
  }

  createTodo = async text => {
    await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: state.list.length + 1
      }

      const list = state.list.concat(item)
      return { list }
    })

    this.syncStorage()
  }
}

export default TodosContainer
