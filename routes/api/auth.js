const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check"); 

// @route getting api/auth
// @desc Test route
// @access Public

router.get("/", auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route Post api/auth
// @desc authenticate user 
// @access Public

router.post("/", [
    check("email", "Enter a valid email please").isEmail(),
    check("password", "Password is required").exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }


    const { email, password } = req.body;

    try{
        let user = await User.findOne({ email });
        if(!user){
            return res.send(400).json({errors: [{ msg: "Invalid Credentials" }]});
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if(!isMatched){
            return res.send(400).json({errors: [{ msg: "Invalid Credentials" }]});
        }

    
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get("jwtSecretToken"),
            { expiresIn: 3600000},
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
         )

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

module.exports = router;