
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 9000;

const specPath = path.join(__dirname, 'quickpay-openapi.yaml');
const openApiDocument = YAML.parse(
  fs.readFileSync(specPath, 'utf8')
);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument)
);

app.get('/openapi.yaml', (req, res) => {
  res.sendFile(specPath);
});

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.listen(PORT, () => {
  console.log(`QuickPay Swagger: http://localhost:${PORT}`);
  console.log(`OpenAPI YAML: http://localhost:${PORT}/openapi.yaml`);
});
