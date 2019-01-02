var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

// Root Route
router.get("/", function(req, res){
    res.render("landing");
});

// Register route
router.get("/register", function(req, res){
    res.render("register");
});

// Register logic route
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

// Show login form
router.get("/login", function(req, res){
    res.render("login");
});
// Handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// Logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have successfully logged out.");
    res. redirect("/campgrounds");
});

module.exports = router;