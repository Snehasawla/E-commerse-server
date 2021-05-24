const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator");

router.get("/", (req, res)=> res.send("User route"));

router.post("/", [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmpty(),
    check("password",
           "Please Password should have at least 5 characters").isLength({min: 5}),
], (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    res.send("User Post Router")
})

module.exports = router;