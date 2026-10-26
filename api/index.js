
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

if (!fs.existsSync(specPath)) {
  throw new Error(`OpenAPI file not found: ${specPath}`);
}

const openApiDocument = YAML.parse(
  fs.readFileSync(specPath, 'utf8')
);

app.get('/', (req, res) => {
  res.redirect('/api-docs/');
});

app.get('/openapi.yaml', (req, res) => {
  res.type('text/yaml').sendFile(specPath);
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument, {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      persistAuthorization: true
    }
  })
);

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

module.exports = app;
