const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');

const app = express();

const specPath = path.join(
  __dirname,
  '..',
  'quickpay-openapi.yaml'
);

if (!fs.existsSync(specPath)) {
  throw new Error('OpenAPI YAML file not found');
}

const openApiDocument = YAML.parse(
  fs.readFileSync(specPath, 'utf8')
);

app.get('/', (req, res) => {
  res.redirect('/api-docs/');
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument)
);

app.get('/openapi.yaml', (req, res) => {
  res.type('text/yaml').sendFile(specPath);
});

module.exports = app;