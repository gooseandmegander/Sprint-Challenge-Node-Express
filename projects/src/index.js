// React and Router
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// HTTP client
import axios from 'axios';

// Components
import Project from './components/Project.js';

// Styling
import './index.css';

// registerServiceWorker
import registerServiceWorker from './registerServiceWorker';

class ProjectsList extends React.Component {
  state = {
    projects: [],
  };

  render() {
    return (
      <div>
        <h1>
          <Link to="/">Projects List</Link>
        </h1>
        {this.state.projects.map((project) => {
          return (
            <ul>
              <li key={`${project.name} ${project.id}`}>
                <Link to={`/${project.id}`}>{project.name}</Link>
              </li>
            </ul>
          );
        })};
        <hr />
        <Route exact path="/:id" component={Project} />
      </div>
    );
  } // end render

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/projects')
      .then((response) => {
        this.setState({
          projects: [...response.data],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
} // end Projects class

ReactDOM.render(
  <Router>
    <ProjectsList />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
