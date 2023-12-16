const UserDB = require('../model/model');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Request body is empty." });
    }

    const user = new UserDB({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender
    });

    user.save()
        .then(data => {
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({ message: "Error occurred in creating operation." });
        });
};

exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        UserDB.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "User not found with id " + id });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id " + id });
            });
    } else {
        UserDB.find()
            .then(users => {
                res.send(users);
            })
            .catch(err => {
                res.status(500).send({ message: "Error occurred while retrieving user information." });
            });
    }
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can't be empty." });
    }

    const id = req.params.id;
    UserDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user with id ${id}. User not found!` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating user information." });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    UserDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete user with id ${id}. User not found!` });
            } else {
                res.send({ message: "User deleted successfully!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error deleting user." });
        });
};
