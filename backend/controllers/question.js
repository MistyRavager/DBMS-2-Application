import { where } from "sequelize";
import { Post, User, Vote } from "../models.js";

export const getQuestionByUserId = async (req, res) => {
    try {
        let user_id = req.params.user_id; // Expects "user_id" in params of request
        let sort_by = req.query.sort_by;
        let count = Number(req.query.limit);
        console.log(count);

        if (sort_by == null) {
            sort_by = "creation_date";
        }

        const post = await Post.findAll({ // Finds all posts with owner_user_id = user_id
            where: {
                owner_user_id: user_id,
                post_type_id: 1
            },
            order: [
                [sort_by, 'DESC']
            ],
            limit: count
        });

        res.status(200).json(post); // Returns posts
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};


// upvote question will also add to the upvote count of the upvoter, and increase reputation of owner of question by 5
export const upvoteQuestion = async (req, res) => {
    try {
        let post_id = req.params.post_id; // Expects "post_id" in body of request (post_id of question)
        let user_id = req.body.user_id; // Expects "user_id" in body of request (user_id of upvoter)

        const post = await Post.findOne({ // Find post
            where: {
                id: post_id 
            }
        });

        const owner = await User.findOne({ // Find owner of post
            where: {
                id: post.owner_user_id
            }
        });

        const user = await User.findOne({ // Find user
            where: {
                id: user_id
            }
        })

        if (post && owner) { // If both post and owner exist
            const vote = await Vote.create({ // Create a vote
                id: null, //ID is auto-incremented
                post_id: post_id,
                user_id: user_id,
                vote_type_id: 2, // 2 is upvote
                bounty_amount: null,
                creation_date: new Date()
            });

            const nuserU = await User.update({ // Update owner's reputation
                reputation: owner.reputation + 5,
            }, {
                where: {
                    id: owner.id
                }
            });

            const nuserU2 = await User.update({ // Update user's upvote count
                up_votes: user.up_votes + 1
            }, {
                where: {
                    id: user.id
                }
            });

            const nPostU = await Post.update({ // Update post's score
                score: post.score + 1,
                last_activity_date: new Date()
            }, {
                where: {
                    id: post.id
                }
            });

            res.status(200).json("Upvote Question");
        } else {
            res.status(404).json("Post or owner not found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


// downvote question will also add to the downvote count of the downvoter, and decrease reputation of owner of question by 2. It also decreases the reputation of the downvoter by 1
export const downvoteQuestion = async (req, res) => {
    try {
        let post_id = req.params.post_id; // Expects "post_id" in body of request (post_id of question)
        let user_id = req.body.user_id; // Expects "user_id" in body of request (user_id of downvoter)

        const post = await Post.findOne({ // Find post
            where: {
                id: post_id
            }
        });

        const owner = await User.findOne({ // Find owner of post
            where: {
                id: post.owner_user_id
            }
        });

        const user = await User.findOne({ // Find user
            where: {
                id: user_id
            }
        })


        if (post && owner) { // If both post and owner exist
            const vote = await Vote.create({ // Create a vote
                id: null, //ID is auto-incremented
                post_id: post_id,
                user_id: user_id,
                vote_type_id: 3, // 3 is downvote
                bounty_amount: null,
                creation_date: new Date()
            });

            const nuserU = await User.update({ // Update owner's reputation
                reputation: owner.reputation - 2, 
            }, {
                where: {
                    id: owner.id
                }
            });

            const nuserU2 = await User.update({ // Update user's downvote count and decrease reputation by 1
                down_votes: user.down_votes + 1,
                reputation: user.reputation - 1
            }, {
                where: {
                    id: user.id
                }
            });

            const nPostU = await Post.update({ // Update post's score
                score: post.score - 1,
                last_activity_date: new Date()
            }, {
                where: {
                    id: post.id
                }
            });


            res.status(200).json("question downvoted");
        } else {
            res.status(404).json("Post not found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


// Closes question
export const closeQuestion = async (req, res) => {
    try {
        let post_id = req.params.post_id; // Expects "post_id" in body of request

        const post = await Post.findOne({ // Finds post with post_id
            where: {
                id: post_id
            }
        });

        if (post) { // If post exists
            const npostU = await Post.update({ // Updates post with closed_date
                closed_date: new Date(),
                last_activity_date: new Date()
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
};   


// Creates a question
export const createQuestion = async (req, res) => {
    try {
        let owner_user_id = req.body.owner_user_id; // Expects "owner_user_id" in body of request
        let title = req.body.title; // Expects "title" in body of request
        let body = req.body.body; // Expects "body" in body of request
        let tags = req.body.tags; // Expects "tags" in body of request

        const user = await User.findOne({
            where: {
                id: owner_user_id
            }
        });

        if (user) { // If user exists
            const post = await Post.create({ // Creates a post
                id: null, // ID is auto-incremented
                owner_user_id: owner_user_id,
                last_editor_user_id: null, 
                post_type_id: 1, // 1 is question
                accepted_answer_id: null,
                score: 0,
                parent_id: null,
                view_count: 0, 
                answer_count: 0,
                comment_count: 0,
                owner_display_name: user.display_name,
                last_editor_display_name: null,
                title: title,
                tags: tags,
                content_license: "CC BY-SA 2.5",
                body: body,
                favorite_count: 0,
                creation_date: new Date(),
                community_owned_date: null,
                closed_date: null,
                last_edit_date: null,
                last_activity_date: new Date()
            });

            res.status(200).json("question created"); // If successful, returns "question closed" in a json
        } else { // If user does not exist
            res.status(404).json("User not found");
        }
    } catch (error) { 
        res.status(500).json(error);
    }
};


