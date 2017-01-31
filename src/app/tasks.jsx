import React from 'react';
import { Link } from 'react-router';
import { Modal } from './modal.jsx';

export const Tasks = React.createClass({
  getInitialState: function() {
    return {
      isShowModal: false
    };
  },
  getDefaultProps: function() {
    return {
      modalData: {}
    }
  },
  getTypeClass: function(task) {
    let type = 'btn-info';

    switch(task.type) {
      case 'bug':
        type = 'btn-danger';
        break;
      
      default:
      case 'story':
        type = 'btn-info';
        break;
    }

    return type;
  },
  closeTask: function(e) {
    e.preventDefault();
    const id = parseInt($(e.target).attr('id'), 10);
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task_ => {
      if (+task_.id === +id) {
        task_.open = false;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.forceUpdate();
  },
  openTask: function(e) {
    e.preventDefault();
    const id = parseInt($(e.target).attr('id'), 10);
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task_ => {
      if (+task_.id === +id) {
        task_.open = true;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.forceUpdate();
  },
  getTasks: function() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    return tasks.map(task => {
      const url = '/task/' + task.id;
      let cls = 'btn navbar-btn ';
      let taskStyles = {};
      let taskActions = (
        <ul className="dropdown-menu">
          <li onClick={this.closeTask}>
            <a href="javascript:void(0)" id={task.id}>Close</a>
          </li>
          <li onClick={this.editTask}>
            <a href="javascript:void(0)" id={task.id}>Edit</a>
          </li>
        </ul>
      );

      if (!task.open) {
        taskStyles['text-decoration'] = 'line-through';
        taskActions = (
          <ul className="dropdown-menu">
            <li onClick={this.openTask}>
              <a href="javascript:void(0)" id={task.id}>Open</a>
            </li>
            <li onClick={this.editTask}>
              <a href="javascript:void(0)" id={task.id}>Edit</a>
            </li>
          </ul>
        );
        cls += ' btn-default';
      } else {
        cls += this.getTypeClass(task);
      }

      return (
        <div className="btn-group btn-group-justified btn-block" style={{
          position: 'relative'
        }}>
          <div className="btn-group" role="group" style={{width: '90%'}}>
            <Link to={url} className={cls} activeClassName="active" style={taskStyles}>
              {task.title}
            </Link>
          </div>
          <div className="btn-group" role="group" style={{width: '10%'}}>
            <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="caret"></span>
            </button>
            {taskActions}
          </div>
        </div>
      );
    });
  },
  onAddTask: function() {
    this.props.modalData = {
      fields: [
        {title: 'Title', name: 'title', type: 'text', required: true, value: ''},
        {title: 'Description', name: 'description', type: 'textarea', required: true, value: ''},
        {title: 'Type', name: 'type', type: 'select', items: ['bug', 'story'], value: 'bug'},
        {title: 'Open', name: 'open', type: 'select', items: ['open', 'close'], value: 'open'}
      ],
      submit: this.addTask,
      title: 'Add task'
    };

    this.setState({
      isShowModal: true
    });
  },
  getFormData: function(form) {
    let fields = {};
    $(form).find('input[type="text"], input[type="hidden"], textarea, select').each(function() {
      let value = $(this).val();
      if ($(this).attr('name') === 'open') {
        if (value === 'open') {
          value = true;
        } else {
          value = false;
        }
      }
      fields[$(this).attr('name')] = value;
    });
    return fields;
  },
  addTask: function(e) {
    e.preventDefault();
    const newTask = this.getFormData(e.target);
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let max = 0;

    tasks.forEach(task => {
      if (+task.id > max) {
        max = +task.id;
      }
    });

    newTask.id = max + 1;

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    this.setState({
      isShowModal: false
    });

    this.forceUpdate();
  },
  saveTask: function(e) {
    e.preventDefault();
    const newTask = this.getFormData(e.target);
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(task => {
      if (+task.id === +newTask.id) {
        for(let taskProp in task) {
          task[taskProp] = newTask[taskProp];
        }
        // task = Object.assign({}, newTask);
        console.log(+task.id, +newTask.id);
      }
    });
    console.log(tasks, newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    this.setState({
      isShowModal: false
    });

    this.forceUpdate();
  },
  editTask: function(e) {
    const id = parseInt($(e.target).attr('id'), 10);
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let task = tasks.filter(task_ => +task_.id === +id)[0];
    console.log(id);

    this.props.modalData = {
      fields: [
        {name: 'id', type: 'hidden', required: true, value: task.id},
        {title: 'Title', name: 'title', type: 'text', required: true, value: task.title},
        {title: 'Description', name: 'description', type: 'textarea', required: true, value: task.description},
        {title: 'Type', name: 'type', type: 'select', items: ['bug', 'story'], value: task.type},
        {title: 'Open', name: 'open', type: 'select', items: ['open', 'close'], value: task.open}
      ],
      submit: this.saveTask,
      title: 'Edit task'
    };

    this.setState({
      isShowModal: true
    });

    this.forceUpdate();
  },
  render: function() {
    return (
      <div>
        <button type="button" className="btn btn-success" aria-label="Add task" onClick={this.onAddTask}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add task
        </button>
        <div className="row">
          <div className="col-md-4">
            {this.getTasks()}
          </div>
          <div className="col-md-8">
            {this.props.children}
          </div>
        </div>
        <Modal isShow={this.state.isShowModal} data={this.props.modalData} />
      </div>
    );
  }
});