
const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const expressSession = require('express-session');
const bodyParser = require('body-parser');

const secret = 'secret';
const authenticate = expressJwt({secret : secret});

const uuidv1 = require('uuid/v1');

const connection = mongoose.createConnection('mongodb://localhost/translationFun');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: {type: String, required: true },
    translations: { type: Array, reqired: false },
});
UserSchema.plugin(passportLocalMongoose);

const userModel = connection.model("User", UserSchema);

passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: String(secret),
}));
app.use(passport.initialize());


app.use("/", express.static(__dirname + "/../frontend/dist"));

app.post('/rest/1.0/user/register', function (req, res) {
    const user = new userModel({
        email: req.body.email,
        username: req.body.username
    });
    userModel.register(user, req.body.password, (err, account) => {
        if (err) {
            res.status(400);
            res.json({ error: err.message });
            return;
        }
        const savedUser = {
            _id: account._id,
            username: account.username,
        };
        res.json(savedUser);
    });
});

app.post('/rest/1.0/user/password', function (req, res) {
    res.send('Hello World!');
});

app.post('/rest/1.0/user/login', passport.authenticate("local", { session: false }), (req, res, next) => {
    req.headers.token = jwt.sign({
        id: req.user._id,
        roleId: req.user.roleId
    }, 'secret', {
        expiresIn: 7200,
    });
    next();
}, (req, res) => {
    res.status(200).json({token: req.headers.token, uid: req.user._id});
});

app.get('/rest/1.0/user/:id', authenticate, function (req, res) {
    userModel.findOne({ username: req.params.id })
        .then(user => {
            res.status(200);
            res.json(user);
        });
});

app.get('/rest/1.0/user/:id/translation', authenticate, function (req, res) {
    userModel.findOne({ username: req.params.id })
        .then(user => {
            if (String(user._id) === String(req.user.id)) {
                res.status(200);
                res.json(user.translations);
            } else {
                res.status(403);
                res.send('You are not allowed to see this information.');
            }
        });
});

app.post('/rest/1.0/user/:id/translation', authenticate, function (req, res) {

    userModel.findOne({ _id: req.params.id })
        .then(user => {
            if (user) {
                const translation = {
                    id: uuidv1(),
                    text: req.body.text,
                    translation: req.body.translation,
                    sourceLanguage: req.body.sourceLanguage,
                    destinationLanguage: req.body.destinationLanguage,
                    chain: req.body.chain,
                    published: req.body.published ? req.body.published : false,
                    ratings: {},
                    rating: req.body.rating,
                };
                translation.ratings[req.params.id] = req.body.rating;

                if (!user.translations) {
                    user.translations = [];
                }
                user.translations.push(translation);
                user.save();
                res.status(200);
                res.json(translation);
            } else {
                res.status(403);
                res.send('You are not allowed to see this information.');
            }
        });
});

app.patch('/rest/1.0/user/:id/translation/:tid', authenticate, function (req, res) {
    userModel.findOne({ _id: req.params.id })
        .then(user => {
            if (user) {
                const map = new Map(user.translations.map(el => [el.id, el]));
                let translation = map.get(req.params.tid);
                translation = Object.assign(translation, req.body);
                user.translations.pop();
                user.translations.push(translation);
                user.save();
                res.status(200);
                res.json(user);
            } else {
                res.status(403);
                res.send('You are not allowed to see this information.');
            }
        });
});

app.get('/rest/1.0/dashboard', function (req, res) {
    userModel.find().then(users => {
        const translations = [];
        users.forEach(user => {
            user.translations.forEach(translation => {
                if (translation.published) {
                    translation.uid = user._id;
                    translations.push(translation);
                }
            });
        });
        res.json(translations);
    });
});


app.listen(8010, () => {
    console.log('Lächerbar translator backend listening on port 8010!');
});