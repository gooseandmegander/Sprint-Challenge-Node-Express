// express
const router = require('express').Router();

// database
const projectsDb = require('../../data/helpers/projectModel.js');

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

// getProjectActions with projectId param
router.get('/:projectId/actions', (req, res) => {
  const { projectId } = req.params;

  projectsDb
    .getProjectActions(projectId)
    .then((projectActions) => {
      if (projectActions.length > 0) {
        res.status(200).json(projectActions);
      } else {
        res.status(404).json({
          message: `No Project Actions found with projectId ${projectId}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: `Cannot retrieve Project Actions for project with ID ${projectId}`,
      });
    });
});

// get with id param
router.get('/:id', (req, res) => {
  const { id } = req.params;

  projectsDb
    .get(id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({
          message: `The project with the given ID ${id} is not found`,
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: `Cannot retrieve Project with given ID ${id}` });
    });
});

// post
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const project = req.body;

  // validation
  if (!name || !description) {
    res.status(400).json({
      errorMessage:
        'Please provide a name, description, and project completion status',
    });
  }
  if (name.length > 128 || description.length > 128) {
    res.status(400).json({
      message: 'Name and description must be less than 128 characters',
    });
  }

  projectsDb
    .insert(project)
    .then((newProject) => {
      res.status(201).json(newProject);
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
  const { name, description } = req.body;
  const { id } = req.params;
  const changes = req.body;

  // validation
  if (!name || !description) {
    res.status(400).json({
      errorMessage:
        'Please provide a name, description, and project completion status',
    });
  }
  if (name.length > 128 || description.length > 128) {
    res.status(400).json({
      message: 'Name and description must be less than 128 characters',
    });
  }

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
