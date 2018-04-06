// express
const express = require('express');
const router = express.Router();

// database
const actionsDb = require('../data/helpers/actionModel.js');

// Endpoints for /api/actions

// get
router.get('/', (req, res) => {
  actionsDb
    .get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'Cannot retrieve Actions' });
    });
});

// get with id param
router.get('/:id', (req, res) => {
  const { id } = req.params;

  actionsDb
    .get(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: `Cannot retrieve Action with given ID ${id}` });
    });
});

// post
router.post('/', (req, res) => {
  //   const { notes, description, completed, project_id } = req.body;
  const action = req.body;
  console.log(action);

  // validation

  actionsDb
    .insert(action)
    .then((newAction) => {
      res.status(200).json(newAction);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'Cannot create new action' });
    });
});

// delete
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  actionsDb
    .remove(id)
    .then((response) => {
      res.status(200).json('Action deleted successfully.');
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: `Cannot delete action with ID ${id}` });
    });
});

// put
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  // validation

  actionsDb
    .update(id, changes)
    .then((updatedAction) => {
      res.status(200).json('Action updated successfully.');
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: `Cannot update action with ID ${id}` });
    });
});

module.exports = router;
