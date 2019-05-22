var db = require('./database');

var header = {
  'Content-Type': 'application/json; charset=utf-8'
};

exports.getAll = function(req, res){
    db.getAllUsers()
        .then(function(result){
            writeOutput(res, result);
        })
        .catch(function(result){
            writeOutput(res, result);
        });
};

exports.get = function(req, res){
    db.getUser(req.params)
        .then(function(result){
            writeOutput(res, result);
        })
        .catch(function(result){
            writeOutput(res, result);
        });
};

exports.getByAccountNumber = function(req, res){
    db.getUser({accountNumber: req.params.id})
        .then(function(result){
            writeOutput(res, result);
        })
        .catch(function(result){
            writeOutput(res, result);
        });
};

exports.getByIdentityNumber = function(req, res){
    db.getUser({identityNumber: req.params.id})
        .then(function(result){
            writeOutput(res, result);
        })
        .catch(function(result){
            writeOutput(res, result);
        });
};

exports.delete = function(req, res){
    db.deleteUser(req.params.id)
        .then(function(result){
            writeOutput(res, result);
        })
        .catch(function(result){
            writeOutput(res, result);
        });
};

exports.add = function(req, res){
    db.addUser(req.body)
        .then(function(result){
            writeOutput(res, result);
        })
        .catch(function(result){
            writeOutput(res, result);
        });
};

exports.update = function(req, res){
    db.updateUser(req.params, req.body)
        .then(function(result){
            writeOutput(res, result);
        })
        .catch(function(result){
            writeOutput(res, result);
        });
};

function writeOutput(res, result){
    res.writeHead(200, header);
    res.write(JSON.stringify(result));
    res.end();
}