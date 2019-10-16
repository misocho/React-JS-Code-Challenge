import { Container } from "unstated";

const defaultState = {
  list: [
    {
      id: 1,
      title: "First todo",
      display: false,
      filterCompleted: false,
      filterAll: true,
      filterActive: false,
      todoItems: [
        {
          id: 1,
          completed: false,
          text: "Read README"
        },
        {
          id: 2,
          completed: false,
          text: "Add one todo"
        },
        {
          id: 3,
          completed: false,
          text: "Add filters"
        },
        {
          id: 4,
          completed: false,
          text: "Add multiple lists"
        },
        {
          id: 5,
          completed: false,
          text: "Optional: add tests"
        }
      ]
    },
    {
      id: 2,
      title: "Second todo",
      display: false,
      todoItems: [
        {
          id: 6,
          completed: false,
          text: "Create github repo"
        },
        {
          id: 7,
          completed: false,
          text: "Go though source code"
        },
        {
          id: 8,
          completed: false,
          text: "Add list todos"
        },
        {
          id: 9,
          completed: false,
          text: "Add filter todos"
        }
      ]
    }
  ]
};

class TodosContainer extends Container {
  constructor(props) {
    super(props);

    this.state = this.readStorage();
  }

  readStorage() {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem("appState");
      if (state) {
        return JSON.parse(state);
      }
    }

    return defaultState;
  }

  syncStorage() {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state);
      window.localStorage.setItem("appState", state);
    }
  }

  displayTodos = async id => {
    const todo = this.state.list.find(i => i.id === id);
    const display = !todo.display;
    await this.setState(state => {
      const list = state.list.map(todo => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          display
        };
      });

      return { list };
    });
    this.syncStorage();
  };

  listTodos() {
    return this.state.list;
  }

  toggleComplete = async (todo, id) => {
    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(({ list }) => ({
      list: list.map(listItem =>
        listItem.id === todo
          ? {
              ...listItem,
              todoItems: listItem.todoItems.map(t =>
                t.id === id ? { ...t, completed: !t.completed } : t
              )
            }
          : listItem
      )
    }));
    this.syncStorage();
  };

  createTodo = async (text, todo) => {
    const defaultState = this.readStorage();
    const getTodo = defaultState.list.find(({ id }) => id === todo);
    const item = {
      completed: false,
      text,
      id: getTodo.todoItems.length + 1
    };

    await this.setState(state => ({
      list: state.list.map(listItem => {
        return listItem.id === todo
          ? { ...listItem, todoItems: listItem.todoItems.concat(item) }
          : listItem;
      })
    }));
    this.syncStorage();
  };

  createTodoList = async text => {
    const defaultState = JSON.parse(localStorage.getItem("appState"));

    const todoList = {
      id: defaultState.list.length + 1,
      title: text,
      display: false,
      filterCompleted: false,
      filterActive: false,
      todoItems: []
    };
    await this.setState(state => ({
      list: state.list.concat(todoList)
    }));
    this.syncStorage();
  };

  filterAll = async id => {
    const defaultState = JSON.parse(localStorage.getItem("appState"));
    const defaultTodo = defaultState.list.find(i => i.id === id);
    const currentTodo = this.state.list.find(i => i.id === id);
    const filterAll = !currentTodo.filterAll;

    if (currentTodo.filterCompleted) {
      currentTodo.filterCompleted = false;
    }
    if (currentTodo.filterActive) {
      currentTodo.filterActive = false;
    }
    await this.setState(state => {
      const list = state.list.map(todo => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          filterAll
        };
      });
      return { list };
    });

    const todos = defaultTodo.todoItems;
    this.updateStateByFilter(id, { todos });
  };

  filterActive = async id => {
    const defaultState = JSON.parse(localStorage.getItem("appState"));
    const defaultTodo = defaultState.list.find(i => i.id === id);
    const currentTodo = this.state.list.find(i => i.id === id);
    const filterActive = !currentTodo.filterActive;
    if (currentTodo.filterCompleted) {
      currentTodo.filterCompleted = false;
    }
    if (currentTodo.filterAll) {
      currentTodo.filterAll = false;
    }
    await this.setState(state => {
      const list = state.list.map(todo => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          filterActive
        };
      });
      return { list };
    });

    const todos = filterActive
      ? defaultTodo.todoItems.filter(i => i.completed === false)
      : defaultTodo.todoItems;
    console.log(defaultTodo);
    this.updateStateByFilter(id, { todos });
  };

  filter = todoId => criteria => {
    const { list } = this.readStorage()
    const { todoItems } = list.find(({ id }) => id === todoId)
    return todoItems.filter(criteria)
  }

  filterCompleted = async id => {
    const defaultState = JSON.parse(localStorage.getItem("appState"));
    const defaultTodo = defaultState.list.find(i => i.id === id);
    const currentTodo = this.state.list.find(i => i.id === id);
    const filterCompleted = !currentTodo.filterCompleted;
    if (currentTodo.filterActive) {
      currentTodo.filterActive = false;
    }
    if (currentTodo.filterAll) {
      currentTodo.filterAll = false;
    }
    await this.setState(state => {
      const list = state.list.map(todo => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          filterCompleted
        };
      });
      return { list };
    });

    const todos = filterCompleted
      ? defaultTodo.todoItems.filter(i => i.completed === true)
      : defaultTodo.todoItems;
    this.updateStateByFilter(id, { todos });
  };

  updateStateByFilter = async (id, { todos }) => {
    await this.setState(state => {
      const list = state.list.map(listItem => {
        if (listItem.id !== id) return { ...listItem };
        return {
          ...listItem,
          todoItems: todos
        };
      });
      return { list };
    });
  };
}

export default TodosContainer;
