const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'))
});

let port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(__dirname);
	console.log(`Listening Port ${port}.`);
});
