import React, { Component } from 'react';
import '../App.css';

class TaskItem extends React.Component {
  _requestMarkTaskCompleted () {
    this.props._markTaskCompleted(this.props.id);
  }

  render () {
    return (
      <div className='app-component-box task-item-box'>
        <input type='checkbox' onClick = {this._requestMarkTaskCompleted.bind(this)} checked={this.props.completed} disabled={this.props.completed} ></input>
        <label className = {this.props.completed ? "task-item-label text-cross-over" : "task-item-label"}>{this.props.text}</label>
      </div>
    );
  }
}

export default TaskItem;
/*

*/
