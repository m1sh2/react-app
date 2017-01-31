import React from 'react';

export const Task = React.createClass({
  render: function() {
    const id = this.props.params.taskId;
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.filter(task_ => +task_.id === +id)[0];
    const title = task.title || '';
    const description = task.description || '';
    
    return (
      <div>
        <h2>{title}</h2>
        <article>
          {description}
        </article>
      </div>
    );
  }
});