
const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const expressSession = require('express-session');
const bodyParser = require('body-parser');

const connection = mongoose.createConnection('mongodb://localhost/translationFun');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: {type: String, required: true }
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
    secret: String('secret'),
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
    res.status(200).json({token: req.headers.token});
});

/*app.get('/rest/1.0/user/:id', function (req, res) {
    res.send('Hello World!');
});

app.get('/rest/1.0/user/:id/translation', function (req, res) {
    res.send('Hello World!');
});

app.post('/rest/1.0/user/:id/translation', function (req, res) {
    res.send('Hello World!');
});

app.get('/rest/1.0/dashboard', function (req, res) {
    res.send('Hello World!');
});*/


app.listen(8010, () => {
    console.log('Lächerbar translator backend listening on port 3000!');
});