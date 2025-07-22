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

  var clientId = 0;

  const sendEvent = () => {
    clientId = parseInt(clientId) + 1;
    if (parseInt(clientId) === 5) clientId = 0;
    //const data = `data: ${new Date().toISOString()}\n\n`;
    var clientIs = '';
    switch(clientId) {
      case 0: {
        clientIs = 'Mike';
        break;
      }
      case 1: {
        clientIs = 'Krishna';
        break;
      }
      case 2: {
        clientIs = 'Rima';
        break;
      }
      case 3: {
        clientIs = 'Fatma';
        break;
      }
      case 4: {
        clientIs = 'Maha';
        break;
      }
    }
    const data = `data: ClientId-${clientIs}|${new Date().toISOString()}\n\n`;
    res.write(data);
  };

  const intervalId = setInterval(sendEvent, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
