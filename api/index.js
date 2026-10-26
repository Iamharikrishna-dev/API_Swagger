const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');

const app = express();

const specPath = path.join(
  process.cwd(),
  'quickpay-openapi.yaml'
);

const openApiDocument = YAML.parse(
  fs.readFileSync(specPath, 'utf8')
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.get('/openapi.yaml', (req, res) => {
  res.type('text/yaml').sendFile(specPath);
});

app.get('/', (req, res) => {
  res.redirect('/api-docs/');
});

module.exports = app;