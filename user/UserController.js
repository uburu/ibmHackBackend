var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('./User');

// CREATES A NEW USER
router.post('/', function (req, res) {
    console.log(req.body);
    User.create({
            name : req.body.name,
            email : req.body.email,
            // work : req.body.work,
            // specialty: req.body.specialty,
            password : req.body.password
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// RETURNS API info
router.get('/api', function (req, res) {
    res.status(200).send("Hi api is here");
});

// GETS A SINGLE USER FROM THE DATABASE
router.post('/session', function (req, res) {
    User.findOne({ name: req.body.name }, 'name email work specialty').lean().exec(function (err, user) {
        if (err){ 
            console.log("err")
            return res.status(500).send("There was a problem finding the user.");
        }
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send({user_id: user._id});
    });
});

// router.post('/session', function(req, res) {
//     console.log("sess ",req.body)
//     User.findOne({ name: req.body.name }, function(user) {
//         console.log("in sess ",user)
//         if (user && user.authenticate(req.body.password)) {
//         req.session.id = user.id;
//         res.status(200).send(req.session.id);
//         res.redirect('/');
//         } else {
//         // TODO: Show error
//         res.status(404).send("not found")
//         }
//     }); 
// });

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    User.findById(req.params.id, 'name email work specialty').lean().exec(function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        console.log(user.name, user.email, user.password, user);
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});



router.get('/session/new', function(req, res) {
    res.render('session/new.jade', {
        locals: { user: new User() }
    });
});

// router.post('/session', function(req, res) {
//     console.log("sess ",req.body)
//     User.findOne({ name: req.body.name }, function(user) {
//         console.log("in sess ",user)
//         if (user && user.authenticate(req.body.password)) {
//         req.session.id = user.id;
//         res.status(200).send(req.session.id);
//         res.redirect('/');
//         } else {
//         // TODO: Show error
//         res.status(404).send("not found")
//         }
//     }); 
// });

function loadUser(req, res, next) {
    if (req.session.id) {
        User.findById(req.session.id, function(user) {
            if (user) {
                req.currentUser = user;
                next();
            } else {
                res.redirect('/session/new');
            }
        });
    } else {
        res.redirect('/session/new');
    }
}

router.delete('/session', loadUser, function(req, res) {
    if (req.session) {
        req.session.destroy(function() {});
    }
    res.redirect('/session/new');
});

module.exports = router;
