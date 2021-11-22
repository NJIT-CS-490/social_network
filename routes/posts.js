const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");


//create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});


//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("You updated the post");
    } else {
      res.status(403).json("You can only update your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("You deleted the post");
    } else {
      res.status(403).json("You can only delete your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//comment on post
router.post("/:id/comment", async (req, res) => {
  try{
    const user = await User.findById(req.body.userId);
    const post = await Post.findById(req.params.id);

    const comment = new Comment({
      by: user,
      post: post,
      text: req.body.text,
    });

    await comment.save();

    res.status(200).json("You have commented on the post");
  }catch(err){
    res.status(500).json(err);
  }

});

//get comment on post
router.get("/:id/comments", async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);

    const comments = await Comment.find({post})

    res.status(200).json(comments);
  }catch(err){
    res.status(500).json(err);
  }
});


//like or dislike post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("You liked the post");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("You disliked the post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//timeline of posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
});

//get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all user's posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//block posts
router.post("/:id/:postId/block", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const post = await Post.findById(req.params.postId)
    if(user.isAdmin){
      post.isBlocked = true
      post.save()
      res.status(200).json("You blocked the post")
    }
    // Else return something with code 403
  }
  catch (err){
    res.status(500).json(err)
  }
});

//unblock posts
router.post("/:id/:postId/unblock", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const post = await Post.findById(req.params.postId)
    if(user.isAdmin){
      post.isBlocked = false
      post.save()
      res.status(200).json("You unblocked the post")
    }
    // Else return something with code 403
  }
  catch (err){
    res.status(500).json(err)
  }
});


module.exports = router;