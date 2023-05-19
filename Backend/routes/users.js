const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update_user
router.put("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json("Account has been updated");
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account");
    }
});

//delete_user
router.delete("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account");
    }
});

//get_user
router.get("/", async (req, res)=>{
    const userId = req.query.userId;
    const username = req.query.username;
    try {    
        const user = userId ? await User.findById(userId) : await User.findOne({username: username});
        const {password, updatedAt, ...other} = user._doc; 
        res.status(200).json(other);
    } catch(err) {
        res.status(500).json(err);
    }
});

//get_friends
router.get("/friends/:userId", async (req, res)=>{
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId)=>{
                return User.findById(friendId);
            })
        );
        let friendlist = [];
        friends.map((friend)=>{
            const {_id, username, profilePicture} = friend;
            friendlist.push({_id, username, profilePicture});
        });
        res.status(200).json(friendlist);
    } catch(err) {
        res.status(500).json(err);
    }
})

//follow_user
router.put("/:id/follow", async (req, res)=>{
    if(req.body.userId !== req.params.id) {
        try {
            const otherUser = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!otherUser.followers.includes(req.body.userId)) {
                await otherUser.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {followings: req.params.id}});
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You already follow this user");
            }
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You cant follow yourself");
    }
});

//unfollow_user
router.put("/:id/unfollow", async (req, res)=>{
    if(req.body.userId !== req.params.id) {
        try {
            const otherUser = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(otherUser.followers.includes(req.body.userId)) {
                await otherUser.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {followings: req.params.id}});
                res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You dont follow this user");
            }
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You cant unfollow yourself");
    }
});


//search
router.get("/mysearch", async (req, res) => {
    try {
        const { q } = req.query;
        const users = User.find({username: {$regex: q}});
        res.json(users);
    } catch(err) {
        console.log(err);
    } 
    
});


module.exports = router