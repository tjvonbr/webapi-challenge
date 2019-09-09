const express = require('express');

// Import Data
const ProjectData = require('../helpers/projectModel.js');
const ActionData = require('../helpers/actionModel.js');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
  ProjectData.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was a problem fetching the projects." })
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  ProjectData.get(id)
    then(project => {
      if (project) {
        res.status(200).json(project)
      } else {
        res.status(404).json({ error: "A project with this ID does not exist." })
      }
    });
  });

router.post('/', (req, res) => {
  const project = req.body;

  ProjectData.insert(project)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was a problem posting this project." })
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  ProjectData.get(id)
    .then(post => {
      if (post) {
        ProjectData.update(id, { name, description })
          .then(updated => {
            res.status(200).json(updated)
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error editing this project." })
          })
      } else {
        res.status(404).json({ error: "No post with this ID exists." })
      }
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  ProjectData.get(id)
    .then(project => {
      if (project) {
        ProjectData.remove(id)
          .then(removed => {
            res.status(200).json(removed)
          })
          .catch(err => {
            res.status(500).json({ error: "There was an error deleting this project." })
          })
      } else {
        res.status(404).json({ error: "No post with this ID exists." })
      }
    })
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params;

  ProjectData.get(id)
    .then(project => {
      if (project) {
        ProjectData.getProjectActions(project.id)
          .then(actions => {
            res.status(200).json(actions)
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was a problem fetching these actions." })
          })
      } else {
        res.status(404).json({ error: "No project with this ID exists." })
      }
    });
});

module.exports = router;