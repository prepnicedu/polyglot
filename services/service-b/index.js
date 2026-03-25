// # ./services/service-b/index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3002;

app.get('/', (req, res) => {
  res.send('Hello from Service B! (Port 3002)');
});

app.listen(port, () => console.log(`Service B listening on port ${port}`));