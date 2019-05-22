const userCtrl = require('./user-controller');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());

// routing
app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`Created by Ericko Yaputro. See the documentation on POSTMAN collection included in the code.
        <br><br>[GET] Get All User: <br>"/user"
        <br><br>[GET] Get One User: <br>"/user/:id"
        <br><br>[GET] Get One User By Identity: <br>"/user/identity/:id"
        <br><br>[GET] Get One User By Account: <br>"/user/account/:id"
        <br><br>[POST] Add User: <br>"/user"
        <br><br>[PUT] Update User: <br>"/user/:id"
        <br><br>[DELETE] Delete User: <br>"/user/:id"
    `);
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