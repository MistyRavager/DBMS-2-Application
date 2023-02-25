import express from "express";

// Import all the controllers
import {
    answerQuestion,
    upvoteAnswer,
    downvoteAnswer,
    getAnswerByUserId,
    getAnswerByQuestionId
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
    createQuestion,
    getQuestionByUserId
} from "../controllers/question.js"
import {
    getUserByID,
    getUserByDisplayName,
    createUser
} from "../controllers/user.js"

const router = express.Router();


// Get answer by user ID
// Ex http://127.0.0.1:5002/answer/userid/4?sort_by=score&limit=3
// By default sorts by creation date and returns 10 answers
router.get("/answer/userid/:user_id", getAnswerByUserId);
// Get answer by question ID
// Ex http://127.0.0.1:5002/answer/questionid/4?sort_by=score
// By default sorts by score
router.get("/answer/questionid/:question_id", getAnswerByQuestionId);
// Answer a question
router.post("/question/answer/:post_id", answerQuestion); // Tested
// Upvote an answer
router.post("/answer/upvote/:post_id", upvoteAnswer); // Tested
// Downvote an answer
router.post("/answer/downvote/:post_id", downvoteAnswer); // Tested



// Autocomplete tag
// Ex http://localhost:5002/autocomplete/tag/co/10
router.get("/autocomplete/tag/:tag_name/:limit", AutocompleteTag); // Tested
// Autocomplete user
// Ex http://localhost:5002/autocomplete/user/ge/10
router.get("/autocomplete/user/:display_name/:limit", AutocompleteUser); // Tested



// Get post by ID
router.get("/post/id/:post_id", getPostByID); // Tested
// Get post by user ID
router.get("/post/userid/:user_id", getPostByUserID); // Tested
// Get post by tag
router.get("/post/tag", getPostByTag); // Tested
// Get post by tags
router.get("/post/tags", getPostByTags); // Tested
// Edit post
router.put("/post/edit/:post_id", editPost); // Tested
// Delete post
router.delete("/post/delete/:post_id", deletePost); // Tested


// Get question by user ID and sort by creation_date or score
// Ex http://127.0.0.1:5002/question/userid/4?sort_by=score&limit=3
// By default sorts by creation date and returns 10 answers
router.get("/question/userid/:user_id", getQuestionByUserId); // Tested
// Upvote a question
router.post("/question/upvote/:post_id", upvoteQuestion); // Tested
// Downvote a question
router.post("/question/downvote/:post_id", downvoteQuestion); // Tested
// Create a question
router.post("/question/create", createQuestion); // Tested
// Close a question
router.put("/question/close/:post_id", closeQuestion); 



// Get user by ID
router.get("/user/id/:id", getUserByID); // Tested
// Get user by display name
router.get("/user/name/:display_name", getUserByDisplayName); // Tested
// Create a user
router.post("/user/create", createUser); // Tested


export default router;