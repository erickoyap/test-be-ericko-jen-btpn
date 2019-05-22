const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'ericko';
const tableName = 'users';

exports.addUser = function(input){
    console.log("Adding new user");
    return new Promise(function(resolve, reject){
        mongo.connect(url, function(err, client){
            if (err){
                const output = {
                    message: 'Failed to add user.',
                    data: err
                };
                reject(output);
            }

            if (client){
                const db = client.db(dbName);
                const users = db.collection(tableName);
                users.insertOne({
                    id: input.id,
                    userName: input.userName,
                    accountNumber: input.accountNumber,
                    emailAddress: input.emailAddress,
                    identityNumber: input.identityNumber
                }, function (err, result) {
                    if (err){
                        const output = {
                            message: 'Failed to delete user.',
                            data: err
                        };
                        client.close();
                        reject(output);
                    }
                    else {
                        console.log("Successfully added user!");
                        client.close();

                        const output = {
                            message: 'Successfully added user!'
                        };
                        resolve(output);
                    }
                });
            }
        });
    });

};

exports.deleteUser = function(id){
    console.log("Deleting user...");

    return new Promise(function(resolve, reject){
        mongo.connect(url, function(err, client){
            if (err) {
                const output = {
                    message: 'Failed to delete user.',
                    data: err
                };
                reject(output);
            }

            if (client){
                const db = client.db(dbName);
                const users = db.collection(tableName);
                users.deleteOne({ id: id },
                    function(err, result){
                        if (err){
                            const output = {
                                message: 'Failed to delete user.',
                                data: err
                            };
                            client.close();
                            reject(output);
                        }
                        else {
                            console.log("Successfully deleted user.");
                            client.close();

                            if (result.deletedCount > 0){
                                const output = {
                                    message: 'Successfully deleted user.',
                                };
                                resolve(output);
                            }
                            else {
                                const output = {
                                    message: 'Failed to delete user, user not found!',
                                };
                                reject(output);
                            }

                        }
                    });
            }
        });
    });
};

exports.getAllUsers = function(){
    console.log("Getting all users...");
    return new Promise(function(resolve,reject) {
        mongo.connect(url, function(err,client){
            if (err){
                const output = {
                    message: 'Failed to get all users.',
                    data: err
                };
                reject(output);
            }

            if (client){
                const db = client.db(dbName);
                const users = db.collection(tableName);
                users.find().limit(10).toArray(function(err, result){
                    client.close();
                    if (err){
                        const output = {
                            message: 'Failed to get all users.',
                            data: err
                        };
                        reject(output);
                    }
                    else {
                        console.log("Successfully get all users!");

                        const output = {
                            message: 'Successfully get all users!',
                            data: result
                        };
                        resolve(output);
                    }
                });
            }
        });
    });

};

exports.getUser = function(query){
    console.log("Getting user...");
    return new Promise(function(resolve, reject){
        mongo.connect(url, function(err,client){
            if (err){
                const output = {
                    message: 'Failed to get user.',
                    data: err
                };
                reject(output);
            }
            if (client) {
                const db = client.db(dbName);
                const users = db.collection(tableName);
                users.findOne(query, function(err, result){
                    client.close();
                    if (err){
                        const output = {
                            message: 'Failed to get user.',
                            data: err
                        };
                        reject(output);
                    }
                    else {
                        console.log("Successfully getting user.");
                        const output = {
                            message: 'Successfully getting user!',
                            data: result
                        };
                        resolve(output);
                    }
                })
            }
        });
    });
};

exports.updateUser = function(query, newValue){
    console.log("Updating user...");
    return new Promise(function(resolve, reject){
        mongo.connect(url, function(err,client){
            if (err){
                const output = {
                    message: 'Failed to update user.',
                    data: err
                };
                reject(output);
            }
            if (client) {
                const db = client.db(dbName);
                const users = db.collection(tableName);
                const updateValues = {
                    $set: {
                        userName: newValue.userName,
                        accountNumber: newValue.accountNumber,
                        emailAddress: newValue.emailAddress,
                        identityNumber: newValue.identityNumber
                    }
                };

                const filteredQuery = {
                    id: query.id
                };

                users.updateOne(filteredQuery, updateValues, function(err, result) {
                    client.close();
                    if (err) {
                        const output = {
                            message: 'Failed to update user.',
                            data: err
                        };
                        reject(output);
                    }
                    else {
                        console.log("Successfully updated user.");
                        exports.getUser(filteredQuery).then(function(user){
                            const output = {
                                message: 'Successfully updated user.',
                                data: user.data
                            };
                            resolve(output);
                        });
                    }
                });
            }
        });
    });

};