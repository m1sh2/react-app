import React from 'react';
import { render } from 'react-dom';
import { Menu } from './menu.jsx';
import { About } from './about.jsx';
import { Tasks } from './tasks.jsx';
import { Task } from './task.jsx';
import { NoMatch } from './no-match.jsx';
import { Router, Route, browserHistory } from 'react-router';



const App = React.createClass({
  render: function() {
    // console.log(this.props.children);
    let title = 'Home';
    let stats = '';

    if (this.props.children) {
      title = this.props.children.props.route.component.displayName;
    }

    if (title === 'Home') {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      const all = tasks.length;

      const bugsLength = tasks.filter(task => task.type === 'bug').length;
      const bugsLengthPerc = Math.round(bugsLength * 100 / all);
      
      const storiesLength = tasks.filter(task => task.type === 'story').length;
      const storiesLengthPerc = Math.round(storiesLength * 100 / all);
      
      const openLength = tasks.filter(task => task.open).length;
      const openLengthPerc = Math.round(openLength * 100 / all);
      
      const closeLength = tasks.filter(task => !task.open).length;
      const closeLengthPerc = Math.round(closeLength * 100 / all);

      stats = <div>
          <h2>Statistics, all: {all}</h2>
          <div className="row">
            <div className="col-md-3">
              <h3>Bugs: {bugsLength}</h3>
              <div className="progress">
                <div className="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" aria-valuenow={bugsLengthPerc} aria-valuemin="0" aria-valuemax="100" style={{width: bugsLengthPerc + '%'}}>
                  {bugsLengthPerc + '%'}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <h3>Stories: {storiesLength}</h3>
              <div className="progress">
                <div className="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow={storiesLengthPerc} aria-valuemin="0" aria-valuemax="100" style={{width: storiesLengthPerc + '%'}}>
                  {storiesLengthPerc + '%'}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <h3>Open: {openLength}</h3>
              <div className="progress">
                <div className="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow={openLengthPerc} aria-valuemin="0" aria-valuemax="100" style={{width: openLengthPerc + '%'}}>
                  {openLengthPerc + '%'}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <h3>Closed: {closeLength}</h3>
              <div className="progress">
                <div className="progress-bar progress-bar-warning progress-bar-striped active" role="progressbar" aria-valuenow={closeLengthPerc} aria-valuemin="0" aria-valuemax="100" style={{width: closeLengthPerc + '%'}}>
                  {closeLengthPerc + '%'}
                </div>
              </div>
            </div>
          </div>
        </div>;
    }

    return (
      <div>
        <Menu />
        <h1>{title}</h1>
        {this.props.children}
        {stats}
      </div>
    );
  }
});

render(
  <div>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/about" component={About}></Route>
        <Route path="/tasks" component={Tasks}>
          <Route path="/task/:taskId" component={Task}/>
        </Route>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </div>,
  $('#app')[0]
);