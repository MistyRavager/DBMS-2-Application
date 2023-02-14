import { where } from "sequelize";
import { Post, User, Vote } from "../models";




// upvote question will also add to the upvote count of the upvoter, and increase reputation of owner of question by 5
export const upvoteQuestion = async (req, res) => {
    try {
        let post_id = req.body.post_id; // Expects "post_id" in body of request (post_id of question)
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

            res.status(200).json("Upvote Question");
        } else {
            res.status(404).json("Post or owner not found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}


// downvote question will also add to the downvote count of the downvoter, and decrease reputation of owner of question by 2. It also decreases the reputation of the downvoter by 1
export const downvoteQuestion = async (req, res) => {
    try {
        let post_id = req.body.post_id; // Expects "post_id" in body of request (post_id of question)
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
                post_id: post_id,
                user_id: user_id,
                vote_type_id: 3 // 3 is downvote
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