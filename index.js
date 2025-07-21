const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors());

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  res.write('Hello Ram');

  const sendEvent = () => {
    const data = `data: ${new Date().toISOString()}\n\n`;
    res.write(data);
  };

  const intervalId = setInterval(sendEvent, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
