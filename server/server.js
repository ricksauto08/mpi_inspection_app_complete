
const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;
const DATA_FILE = path.join(__dirname, '../data/mpis.json');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/reports', (req, res) => {
  res.json(readData());
});

app.post('/api/submit', (req, res) => {
  const newEntry = { ...req.body, timestamp: new Date().toISOString() };
  const data = readData();
  data.push(newEntry);
  writeData(data);
  io.emit('update', newEntry);
  res.status(200).send({ status: 'success' });
});

io.on('connection', (socket) => {
  console.log('Client connected');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
