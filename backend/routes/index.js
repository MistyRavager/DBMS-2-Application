import express from "express";

// Import all the controllers
import {
    answerQuestion,
    upvoteAnswer,
    downvoteAnswer
} from "../controllers/answer.js"
import {
    AutocompleteTag,
    AutocompleteUser
} from "../controllers/autocomplete.js"
import {
    getPostByID,
    getPostByUserID,
    getPostByTag,
    getPostByTags,
    editPost,
    deletePost
} from "../controllers/post.js"
import {
    upvoteQuestion,
    downvoteQuestion,
    closeQuestion,
    createQuestion
} from "../controllers/question.js"
import {
    getUserByID,
    getUserByDisplayName,
    createUser
} from "../controllers/user.js"

const router = express.Router();



// Answer a question
router.post("/question/answer", answerQuestion);
// Upvote an answer
router.post("/answer/upvote", upvoteAnswer);
// Downvote an answer
router.post("/answer/downvote", downvoteAnswer);



// Autocomplete tag
router.get("/autocomplete/tag", AutocompleteTag);
// Autocomplete user
router.get("/autocomplete/user", AutocompleteUser);



// Get post by ID
router.get("/post/id", getPostByID);
// Get post by user ID
router.get("/post/userid", getPostByUserID);
// Get post by tag
router.get("/post/tag", getPostByTag);
// Get post by tags
router.get("/post/tags", getPostByTags);
// Edit post
router.put("/post/edit", editPost);
// Delete post
router.delete("/post/delete", deletePost);



// Upvote a question
router.post("/question/upvote", upvoteQuestion);
// Downvote a question
router.post("/question/downvote", downvoteQuestion);
// Close a question
router.put("/question/close", closeQuestion);
// Create a question
router.post("/question/create", createQuestion);



// Get user by ID
router.get("/user/id", getUserByID);
// Get user by display name
router.get("/user/displayname", getUserByDisplayName);
// Create a user
router.post("/user/create", createUser);


export default router;