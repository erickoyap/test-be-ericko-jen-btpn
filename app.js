const userCtrl = require('./user-controller');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

// routing
app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('TODO: Add simple documentation here...');
    res.end();
});
app.get('/user', userCtrl.getAll);
app.get('/user/:id', userCtrl.get);
app.get('/user/identity/:id', userCtrl.getByIdentityNumber);
app.get('/user/account/:id', userCtrl.getByAccountNumber);
app.post('/user', userCtrl.add);
app.put('/user/:id', userCtrl.update);
app.delete('/user/:id', userCtrl.delete);


app.listen(port, function(){ console.log(`Listen on port ${port}!`); });