// React
import React from 'react';
import ReactDOM from 'react-dom';

// HTTP client
import axios from 'axios';

// Styling
import './index.css';

// registerServiceWorker
import registerServiceWorker from './registerServiceWorker';

class Projects extends React.Component {
  state = {
    projects: [],
  };

  render() {
    return (
      <div>
        <h1>Projects</h1>
        {this.state.projects.map((project) => {
          return (
            <ul>
              <li>Project Name: {project.name}</li>
              <li>Project Description: {project.description}</li>
              <li>Project Id: {project.id}</li>
            </ul>
          );
        })};
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

ReactDOM.render(<Projects />, document.getElementById('root'));
registerServiceWorker();
