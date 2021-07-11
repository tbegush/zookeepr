const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');
const path = require('path');
const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

router.use(express.static('public'));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

router.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
