// express
const express = require('express');
const router = express.Router();

// database
const projectsDb = require('../data/helpers/projectModel.js');

// Endpoints for /api/projects

// get
router.get('/', (req, res) => {
  projectsDb
    .get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'Cannot retrieve Projects' });
    });
});

// get with id param
router.get('/:id', (req, res) => {
  const { id } = req.params;

  projectsDb
    .get(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: `Cannot retrieve Project with given ID ${id}` });
    });
});

// post
router.post('/', (req, res) => {
  //   const { name, description, completed } = req.body;
  const project = req.body;

  // validation

  projectsDb
    .insert(project)
    .then((newProject) => {
      res.status(200).json(newProject);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'Cannot create new project' });
    });
});

// delete
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  projectsDb
    .remove(id)
    .then((response) => {
      res.status(200).json('Project deleted successfully.');
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: `Cannot delete project with ID ${id}` });
    });
});

// put
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  // validation

  projectsDb
    .update(id, changes)
    .then((updatedProject) => {
      res.status(200).json('Project updated successfully.');
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: `Cannot update project with ID ${id}` });
    });
});

module.exports = router;
