const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check"); 

const Profile = require("../../models/Profile");
const User = require("../../models/User");


// @route getting api/profile/me
// @desc Test route
// @access Private

router.get("/me", auth, async (req, res) => {
    try{

        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]); 

        if(!profile){
            return res.status(400).json({ msg: "No profile found for this user"});
        }

        res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route post api/profile
// @desc create or update the profile 
// @access Private
router.post("/", [auth, [
    check("status", "Status required sir").not().isEmpty(),
    check("skills", "Skills required").not().isEmpty(),
]] , async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        facebook,
        twitter,
        instagram,
    } = req.body;

    //building profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
        profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    //social stuff object
    profileFields.social = {};
    if(facebook) profileFields.social.facebook = facebook;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;

    try{
        let profile = await Profile.findOne({ user: req.user.id });
        if(profile){
            //lets update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, {$set: profileFields}, { new: true });
            
            return res.json(profile);
        }
        //if no profile lets create one
        profile = new Profile(profileFields);
        
        await profile.save();
        res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route get api/profile
// @desc get all profiles
// @access Private

router.get("/", async (req, res) => {

    try{

        const profiles = await Profile.find().populate("user", ["name", "avatar"]);
        res.json(profiles);

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});


// @route get api/profile/user/:user_id
// @desc get profiles by user id
// @access Public 

router.get("/user/:user_id", async (req, res) => {

    try{

        const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "avatar"]);
        
        if(!profile) return res.status(400).json({ msg: "Profile not found"}); 
        
        res.json(profile);
        
    }catch(err){
        console.error(err.message);
        if(err.kind === "ObjectId"){
            return res.status(400).json({ msg: "Profile not found"}); 
        }
        res.status(500).send("Server Error");
    }

});


// @route Delete api/profile
// @desc delete profiles, user and posts 
// @access Public 

router.delete("/", auth, async (req, res) => {

    try{
        //for removing profile
        await Profile.findOneAndRemove({ user: req.user.id });
       
        //for removing a user
        await User.findOneAndRemove({ _id: req.user.id });
        
        res.json({msg: "User is removed"});
        
    }catch(err){
        console.error(err.message);
        if(err.kind == "ObjectId"){
            return res.status(400).json({ msg: "Profile not found"}); 
        }
        res.status(500).send("Server Error");
    }

});

// @route PUT api/profile/experience
// @desc delete profiles, user and posts 
// @access Public
router.put("/experience", [auth, [
    check("title", "Title required").not().isEmpty(),
    check("company", "Company required").not().isEmpty(),
    check("from", "From data required").not().isEmpty(),
]], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        
        return res.status(400).json({errors: errors.array()});
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,

    } = req.body;

    const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try{

        const profile = await Profile.findOne({user: req.user.id});

        profile.experience.unshift(newExperience);
        await profile.save();

        res.json(profile);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error spotted");
    }

});

// @route DEL api/profile/experience/:exp_id
// @desc delete exp from profile 
// @access Private

router.delete("/experience/:exp_id", auth, async (req, res) => {

    try{

        const profile = await Profile.findOne({user: req.user.id});
        
        //we need to get index from removal
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id); //expid in params
        profile.experience.splice(removeIndex, 1);

        await profile.save();
        res.json(profile); 

    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error XD");
    }

});




// @route PUT api/profile/edu
// @desc  add edu 
// @access Public
router.put("/education", [auth, [
    check("school", "School required").not().isEmpty(),
    check("degree", "Degree required bro").not().isEmpty(),
    check("fieldofstudy", "Field required mate").not().isEmpty(),
    check("from", "From data required").not().isEmpty(),
]], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        
        return res.status(400).json({errors: errors.array()});
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,

    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,       
        from,
        to,
        current,
        description
    };

    try{

        const profile = await Profile.findOne({user: req.user.id});

        profile.education.unshift(newEdu);
        await profile.save();

        res.json(profile);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error spotted");
    }

});

// @route DEL api/profile/education/:exp_id
// @desc delete edu from profile 
// @access Private

router.delete("/education/:edu_id", auth, async (req, res) => {

    try{

        const profile = await Profile.findOne({user: req.user.id});
        
        //we need to get index from removal
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id); //expid in params
        profile.education.splice(removeIndex, 1);

        await profile.save();
        res.json(profile); 

    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error XD");
    }

});




module.exports = router;