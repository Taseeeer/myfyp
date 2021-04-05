const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");


// @route Post-req api/posts
// @desc create a post 
// @access Private

router.post("/", [auth, [
    check("text", "Text required bro").not().isEmpty(),
]],
async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }


    try{

        const user = await User.findById(req.user.id).select("-password");

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        });

        const post = await newPost.save();
        res.json(post);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server error ;P");
    }

});


// @route get-req api/posts
// @desc get a post 
// @access Private
router.get("/", auth, async (req, res) => {
    try{
        const posts = await Post.find().sort({ date: -1 });

        res.json(posts);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error XD");
    }
});


// @route get-req api/post/:id
// @desc get a post by id
// @access Private
router.get("/:id", auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({msg: "Post not found bro"});
        }

        res.json(post);
    }
    catch(err){
        console.error(err.message);
        
        if(!err.kind === "objectid"){
            return res.status(404).json({msg: "post not found bro"});
        }

        res.status(500).send("Server Error XD");
    }
});


// @route del api/posts/:id
// @desc del a post 
// @access Private
router.delete("/:id", auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);


        if(!post) {
            return res.status(404).json({msg: "Post not found"});
        }


        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "User not authorized"});
        }

        await post.remove();

        res.json({msg: "Post removed :D"});

    }
    catch(err){
        console.error(err.message);

        if(!err.kind === "objectid"){
            return res.status(404).json({msg: "post not found bro"});
        }

        res.status(500).send("Server Error XD");
    }
});


// @route PUT api/posts/like/:d
// @desc liking a post 
// @access Private

router.put("/like/:id", auth, async (req, res) => {
    try{

        const post = await Post.findById(req.params.id);

        //already like?
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: "Post like already bro"});
        }

        post.likes.unshift({user: req.user.id});
        await post.save();
        res.json(post.likes)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// @route PUT api/posts/unlike/:d
// @desc liking a post 
// @access Private

router.put("/unlike/:id", auth, async (req, res) => {
    try{

        const post = await Post.findById(req.params.id);

        //already like?
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg: "Post not yet liked bro"});
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);

        await post.save();
        res.json(post.likes);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// @route Post-req api/posts/comment/:id
// @desc comment a post 
// @access Private

router.post("/comment/:id", [auth, [
    check("text", "Text required bro").not().isEmpty(),
]],
async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }


    try{

        const user = await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        };

        post.comments.unshift(newComment);

        await post.save();
        res.json(post.comments);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server error ;P");
    }

});


// @route Delete-req api/posts/comment/:id/:comment_id
// @desc delete comment
// @access Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
    try{

       const post = await Post.findById(req.params.id);
        
       //pulling out comment
       const comment = post.comments.find(comment => comment.id === req.params.comment_id);

       if(!comment) {
           return res.status(404).json({msg: "Comment no exist sir :P "});
       };

       //same user made comment?
       if(comment.user.toString() !== req.user.id){
           return res.status(401).json({msg: "User not authorized"});
       };

       const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);

        await post.save();
        res.json(post.comments);


    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error :DD");
    }
});


module.exports = router;