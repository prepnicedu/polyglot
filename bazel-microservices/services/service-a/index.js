const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello from Service A! (Port 3001)');
});

app.listen(port, () => console.log(`Service A listening on port ${port}`));