const express = require('express');
const passport = require("passport");
const router = express.Router();
const chalk = require('chalk');

// function generateToken(req,res){
//     const accessToken = token.generateAccessToken(req.user.id);
//     res.render('authenticated.html',{
//         token:accessToken
//     })
// }


router.get("/auth/github", passport.authenticate("github", { scope: ["profile"] }), (req, res) => {
    console.log(chalk.red("Wasnt ment to run"));
})

router.get("/auth/github/dashboard", passport.authenticate("github", { failureRedirect: "http://localhost:3000/" }), (req, res) => {
    // console.log(chalk.green("checking user print"));
    // console.log(req.user);
    // console.log(chalk.magenta("githubid of user : ",req.user.githubId));
    // console.log(chalk.magenta("id of user : ",req.user.id));
    res.cookie("userid",req.user.githubId);
    
    // console.log(chalk.green("successfully callback"));
    res.redirect("http://localhost:3000/#/dashboard");
    //res.json({user:"hello"});
})
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;