import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddItem from "../add-item";

import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch"),
    ],
    term: '',
    filter: 'all' //active, done, all
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      id: this.maxId++,
      done: false,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  onToggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.onToggleProperty(todoData, id, "done"),
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.onToggleProperty(todoData, id, "important"),
      };
    });
  };

  search(text, arr) {
    if (text === '') {
      return arr;
    }
    return (
      arr.filter((item) => {
        return item.label.toLowerCase().indexOf(text.toLowerCase()) >= 0;
      })
    )
  };

  onSearchInput = (text) => {
    this.setState({
      term: text
    })
  }

  filter(arr, filter) {
    switch (filter) {
      case 'all':
        return arr;
      case 'active':
        return arr.filter((item) => !item.done);
      case 'done':
        return arr.filter((item) => item.done);
    }
  }

  onToggleFilter = (filter) => {
    this.setState({
      filter
    })
  }

  render() {
    const { todoData, term, filter } = this.state;
    const todoCount = todoData.filter((el) => el.done === false).length;
    const doneCount = todoData.length - todoCount;
    const filteredData = this.filter(todoData, filter)
    const visibleData = this.search(term, filteredData);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchInput={this.onSearchInput} />
          <ItemStatusFilter onFilterChange={this.onToggleFilter} filter={filter} />
        </div>

        <TodoList
          todos={visibleData}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <AddItem addItem={this.addItem} />
      </div>
    );
  }
}
