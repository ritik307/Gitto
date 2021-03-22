const express = require("express");
const router = express.Router();
const chalk = require("chalk");

const userData = require("../models/User");

router.get("/",(req,res)=>{
    userData.find({})
    .then((data)=>{
        console.log("sending data from /: ",data);
        res.json(data);
    })
    .catch((err)=>{
        console.log("error while fetching all users data",err);
    })
})
//return current-user
router.get("/current_user",(req,res)=>{
    console.log(chalk.cyan("current_user called"));
    res.send(req.user);
})

router.get("/:userid", (req, res) => {
    const userid = req.params.userid;
    console.log(userid);
    userData.findOne({ githubId: userid }, (err, user) => {
        if (user) {
            console.log(chalk.green("user data sent successfully from server"));
            console.log(user);
            res.json(user);
        } else {
            console.log(chalk.red("user dosent exist", err));
        }
    })
})
router.get("/:userid/update", (req, res) => {
    const data = req.body.values;
    console.log(chalk.magenta("recieved data to update", req.params.userid));
    console.log(data);
    userData.findOneAndUpdate({ githubId: req.params.userid }, { new: true }, (err, user) => {
        if (user) {
            user.bio = data.bio;
            user.technology = data.languages;
            user.pinnedrepos.push(data.repositries1);
            if (data.repositries2 != null) {
                user.pinnedrepos.push(data.repositries2);
            }
            if (data.repositries3) {
                user.pinnedrepos.push(data.repositries3);
            }
            user.gist = data.gist;
            user.save();
            console.log(chalk.magenta("data updated successfully on server"));
            res.json({ message: "Data updated" });
        }
        else {
            console.log(chalk.red("error", err));
        }
    });
})

module.exports = router;

