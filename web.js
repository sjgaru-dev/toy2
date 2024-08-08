import path from 'path';

import express from 'express';

const app = express();
const PORT = 8001;

app.use(express.static(path.join('build')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/faq', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/curriculum', function (req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
