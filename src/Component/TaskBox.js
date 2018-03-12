import React, { Component } from 'react';
//import $ from 'jquery';
import '../App.css';

class TaskBox extends React.Component {
  render () {
    return (
      <div className='app-component-box task-box'>
        <input className='task-input' type='text' placeholder={this.props.defaultText} ref={(input) => {this._taskText = input}} ></input>
        <button onClick = {this._requestAddTask.bind(this)} className='button'>Add To Do</button>
      </div>
    )
  }

  _requestAddTask() {
    this.props._addTask(this._taskText.value);
  }

}

export default TaskBox;
