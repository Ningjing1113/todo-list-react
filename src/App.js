import React, { Component } from 'react';
import TaskList from './Component/TaskList';
import TaskBox from './Component/TaskBox';
import $ from 'jquery';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
  }

  componentWillMount() {
    // this._resetTaskList();
    this._getInitList();
  }

  render() {
    return (
      <div className="App">
        <TaskBox _addTask = {this._addTask.bind(this)} defaultText = {"  Add a to do..."}/>
        <TaskList tasks = {this.state.tasks} _markTaskCompleted = {this._markTaskCompleted.bind(this)}/>
      </div>
    );
  }

  _getInitList() {
      $.ajax({
        method: 'GET',
        url: 'http://quip-todos.herokuapp.com/get_todos?email=example@gmail.com',
        success: (response) => {
          this.setState({tasks: response});
        }
      });
    }

    _markTaskCompleted(taskId) {
      taskId = parseInt(taskId);
      $.ajax({
        method: 'POST',
        url: 'http://quip-todos.herokuapp.com/mark_completed',
        contentType: 'application/x-www-form-urlencoded',
        data: `email=example@gamil.com&id=${taskId}&completed=true`,
        success: (response) => {
          /*
            the mark_completed api returns id as a string
            convert it to integer to keep it in consistent with the get_todos api
          */
          if (typeof response.id === "string") {
            response.id = parseInt(response.id);
          }

          let tasks = this.state.tasks.slice(0),
          index = tasks.findIndex( x => { return x.id === taskId });
          tasks.splice(index, 1, response);
          this.setState({
            tasks: tasks
          });

        },
        error: (queryObj, status, error) => {
          alert( `${status}: ${error}`);
        }
      });
    }

    _addTask(taskText) {
      $.ajax({
        method: 'POST',
        url: 'http://quip-todos.herokuapp.com/add_todo',
        contentType: 'application/x-www-form-urlencoded',
        data: `email=example@gamil.com&text=${taskText}`,
        success: (response) => {
            let tasks = this.state.tasks;
            this.setState({
              tasks: [response].concat(tasks)
            });
        },
        error: (queryObj, status, error) => {
          alert( `${status}: ${error}`);
        }
      });
    }

    _resetTaskList() {
      $.ajax({
        method: 'POST',
        url: 'http://quip-todos.herokuapp.com/reset',
        contentType: 'application/x-www-form-urlencoded',
        data: `{'email': example@gamil.com}`,
        success: (response) => {},
        error: (queryObj, status, error) => {
          alert( `${status}: ${error}`);
        }
      });
    }
}

export default App;
