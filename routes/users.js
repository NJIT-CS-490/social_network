// This file was edited by several members of the team
// Jefferson added code for creating new users

const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Your account has been updated");
        }catch(err){
            return res.status(500).json(err);
        }
    } else{
        return res.status(403).json("You can only update your account");
    }
});

//delete user
router.delete("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Your account has been deleted");
        }catch(err){
            return res.status(500).json(err);
        }
    } else{
        return res.status(403).json("You can only delete your account");
    }
});

//get a user
router.get("/", async (req, res)=>{
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId 
            ? await User.findById(userId) 
            : await User.findOne({ username: username });
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err)
    }
});

//get all users
router.get("/allusers", async (req, res)=>{
  try{
    const allUsers = await User.find({});
    let userList = []
    allUsers.map((user) => {
      const { _id, username, profilePicture } = user;
      userList.push({_id, username, profilePicture });
    });
    res.status(200).json(userList);
    }catch(err){
    res.status(500).json(err)
  };
});

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.following.map((friendId) => {
          return User.findById(friendId);
        })
      )
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });

/*
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });
*/

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//Add a user: Jefferson
router.post("/", async (req, res) => {
  if(req.body.userId === req.params.id || req.body.isAdmin){
    if(req.body.password){
        try{
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }catch(err){
            return res.status(500).json(err);
        }
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("Your account has been updated");
    }catch(err){
        return res.status(500).json(err);
    }
} else{
    return res.status(403).json("You can only update your account");
}
});

//unfollow
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

//block
router.put("/:id/block", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (user.followers.includes(req.body.userId) || req.body.isAdmin) {
        user.blockedUser.push(req.body.userId)
        res.status(200).json("user has been blocked");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant block yourself");
  }
});

module.exports = router