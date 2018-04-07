// express
const router = require('express').Router();

// database
const actionsDb = require('../../data/helpers/actionModel.js');

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
      if (action) {
        res.status(200).json(action);
      } else {
        res
          .status(404)
          .json({ message: `The action with the given ID ${id} is not found` });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: `Cannot retrieve Action with given ID ${id}` });
    });
});

// post
router.post('/', (req, res) => {
  const { description, project_id } = req.body;
  const action = req.body;

  // validation
  if (!description || !project_id) {
    res
      .status(400)
      .json({ errorMessage: `Please provide a description and project ID.` });
  }
  if (description.length > 128) {
    res.status(400).json({
      errorMessage: `The description cannot be longer than 128 characters.`,
    });
  }

  //  !! how to do validation for project_id?

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
  const { description, project_id } = req.body;
  const { id } = req.params;
  const changes = req.body;

  // validation
  if (!description || !project_id) {
    res
      .status(400)
      .json({ errorMessage: `Please provide a description and project ID.` });
  }
  if (description.length > 128) {
    res.status(400).json({
      errorMessage: `The description cannot be longer than 128 characters.`,
    });
  }

  //  !! how to do validation for project_id?

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
