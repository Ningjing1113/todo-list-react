import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends React.Component {
  render () {
    return (
      <div>
          {this._createTaskList()}
      </div>
    );
  }

  _createTaskList() {
    let _markTaskCompleted = this.props._markTaskCompleted;
    return this.props.tasks.map(task => {
        return (
          <TaskItem
            key={task.id}
            id={task.id}
            text={task.text}
            completed={task.completed}
            _markTaskCompleted = {_markTaskCompleted}/>
        );
    });
  }
}

export default TaskList;
