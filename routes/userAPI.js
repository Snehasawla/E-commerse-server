const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { validationResult, check } = require("express-validator");
const User = require("../models/User");

router.get("/", (req, res)=> res.send("User route"));

router.post("/", [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password",
           "Please Password should have at least 5 characters").isLength({min: 5}),
], 
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        console.log(req.body);
        const {name, email, password} = req.body
        let user =await User.findOne({email: email}); 
        if(user){
            return res
                   .status(400)
                   .json({msg: "User already exists"})
        }
        console.log(req.body);
        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.save();
        res.send("Users route")
    } catch (error) {
       console.error(error)   
       res.status(500).send("server Error");
    }
    res.send("User Post Router")
})

module.exports = router;