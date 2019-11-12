const express = require('express');
const path = require('path');
const app = express();

let port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(__dirname); // eslint-disable-line no-console
    console.log('Listening Port ' + port); // eslint-disable-line no-console
});

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'));
  })