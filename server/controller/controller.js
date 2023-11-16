var UserDB = require('../model/model');

/// Create and save a new user
exports.create = (req, res) => {
    // Check if the request body is empty
    if (!req.body) {
        return res.status(400).send({ message: "Request body is empty." });
    }
    
    // Create a new user

    const user = new UserDB({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender
    });

    // Save the new user
    user.save()
        .then(data => {
            //res.send(data);
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred in creating operation"
            });
        });
}

// retrieve and return user
exports.find=(req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        UserDB.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message:"Not found user with id"+ id})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retirieving user with id"+ id})
        })
    }else{
    UserDB.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message : err.message || "Error Occurred while retrieving info"})
    })
}
}

// update new user by id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can't be empty" });
    }
    const id = req.params.id;
    UserDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" });
        });
}

// delete user
exports.delete = (req, res) => {
    const id = req.params.id;
    UserDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete user with ${id}. Maybe user not found!` });
            } else {
                res.send({
                     message: "User deleted successfully!" 
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                 message: "Error deleting user" 
                });
        });
}