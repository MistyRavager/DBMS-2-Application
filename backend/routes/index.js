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
router.post("/question/answer/:post_id", answerQuestion);
// Upvote an answer
router.post("/answer/upvote/:post_id", upvoteAnswer);
// Downvote an answer
router.post("/answer/downvote/:post_id", downvoteAnswer);



// Autocomplete tag
// Ex http://localhost:5002/autocomplete/tag/co/10
router.get("/autocomplete/tag/:tag_name/:limit", AutocompleteTag);
// Autocomplete user
// Ex http://localhost:5002/autocomplete/user/ge/10
router.get("/autocomplete/user/:display_name/:limit", AutocompleteUser);



// Get post by ID
router.get("/post/id/:post_id", getPostByID);
// Get post by user ID
router.get("/post/userid/:user_id", getPostByUserID);
// Get post by tag
router.get("/post/tag", getPostByTag);
// Get post by tags
router.get("/post/tags", getPostByTags);
// Edit post
router.put("/post/edit/:post_id", editPost);
// Delete post
router.delete("/post/delete/:post_id", deletePost);



// Upvote a question
router.post("/question/upvote/:post_id", upvoteQuestion);
// Downvote a question
router.post("/question/downvote/:post_id", downvoteQuestion);
// Close a question
router.put("/question/close/:post_id", closeQuestion);
// Create a question
router.post("/question/create", createQuestion);



// Get user by ID
router.get("/user/id/:id", getUserByID);
// Get user by display name
router.get("/user/name/:display_name", getUserByDisplayName);
// Create a user
router.post("/user/create", createUser);


export default router;