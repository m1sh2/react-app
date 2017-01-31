import React from 'react';
import { Link } from 'react-router';

export const Menu = React.createClass({
  getItems: function() {
    const items = [
      {title: 'About', url: '/about'},
      {title: 'Tasks', url: '/tasks', items: [
        {title: 'Task 123', url: '/123'}
      ]}
    ];
    return items.map(item => {
      return (
          <Link to={item.url} className="btn btn-default navbar-btn" activeClassName="active">{item.title}</Link>
      )
    });
  },
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">ReactApp</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              { this.getItems() }
          </div>
        </div>
      </nav>
    );
  }
});