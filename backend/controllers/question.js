import { where } from "sequelize";
import { Post, User, Vote } from "../models";




// upvote question will also upvote the owner of the question
export const upvoteQuestion = async (req, res) => {
    try {
        let post_id = req.body.post_id;
        let user_id = req.body.user_id;

        const post = await Post.findOne({
            where: {
                id: post_id
            }
        });

        const owner = await User.findOne({
            where: {
                id: post.owner_user_id
            }
        });

        if (post && owner) {
            const vote = await Vote.create({
                post_id: post_id,
                user_id: user_id,
                vote_type_id: 2
            });

            const nuserU = await User.update({
                reputation: owner.reputation + 10,
            }, {
                where: {
                    id: owner.id
                }
            });

            res.status(200).json("Upvote Question");
        } else {
            res.status(404).json("Post not found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


// downvote question will also downvote the owner of the question
export const downvoteQuestion = async (req, res) => {
    try {
        let post_id = req.body.post_id;
        let user_id = req.body.user_id;

        const post = await Post.findOne({
            where: {
                id: post_id
            }
        });

        const owner = await User.findOne({
            where: {
                id: post.owner_user_id
            }
        });

        if (post && owner) {
            const vote = await Vote.create({
                post_id: post_id,
                user_id: user_id,
                vote_type_id: 1
            });

            const nuserU = await User.update({
                reputation: owner.reputation - 2,
            }, {
                where: {
                    id: owner.id
                }
            });

            res.status(200).json("question downvoted");
        } else {
            res.status(404).json("Post not found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


// Closes question
export const closeQuestion = async (req, res) => {
    try {
        let post_id = req.body.post_id; // Expects "post_id" in body of request

        const post = await Post.findOne({ // Finds post with post_id
            where: {
                id: post_id
            }
        });

        if (post) { // If post exists
            const npostU = await Post.update({ // Updates post with closed_date
                closed_date: new Date()
            }, {
                where: {
                    id: post_id
                }
            });

            res.status(200).json("question closed"); // If successful, returns "question closed" in a json
        } else {
            res.status(404).json("Post not found"); // If unsuccessful, returns "Post not found" in a json
        }
    } catch (error) { 
        res.status(500).json(error);
    }
}   