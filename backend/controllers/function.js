import { Sequelize, where } from "sequelize";
import {
    User,
    Post,
    PostLink,
    PostHistory,
    Comment,
    Vote,
    Badge,
    Tag
} from "../models.js";

export const getUserByID = async (req, res) => {
    try {
        let user_id = req.body.id;

        const user = await User.findOne({
            where: {
                id: user_id
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getUserByDisplayName = async (req, res) => {
    try {
        let display_name = req.body.display_name;

        const user = await User.findOne({
            where: {
                display_name: display_name
            }
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const AutocompleteUser = async (req, res) => {
    try {
        let display_name = req.body.display_name;

        const user = await User.findAll({
            where: {
                display_name: {
                    [Sequelize.Op.like]: "%" + display_name + "%"
                }
            }
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const AutocompleteTag = async (req, res) => {
    try {
        let tag_name = req.body.tag_name;

        const tag = await Tag.findAll({
            where: {
                tag_name: {
                    [Sequelize.Op.like]: "%" + tag_name + "%"
                }
            }
        });

        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const answerQuestion = async (req, res) => {
    try {
        let post_id = req.body.post_id;
        let user_id = req.body.user_id;
        let answer = req.body.answer;

        const post = await Post.findOne({
            where: {
                id: post_id
            }
        });

        if (post) {
            const postHistory = await PostHistory.create({
                post_id: post_id,
                user_id: user_id,
                comment: answer
            });
            res.status(200).json(postHistory);
        } else {
            res.status(404).json("Post not found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPostByID = async (req, res) => {
    try {
        let post_id = req.body.post_id;

        const post = await Post.findOne({
            where: {
                id: post_id
            }
        });

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPostByUserID = async (req, res) => {
    try {
        let user_id = req.body.user_id;

        const post = await Post.findAll({
            where: {
                owner_user_id: user_id
            }
        });

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPostByTag = async (req, res) => {
    try {
        let tag_name = req.body.tag_name;

        const post = await Post.findAll({
            where: {
                tags: {
                    [Sequelize.Op.like]: "%" + tag_name + "%"
                }
            }
        });

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
}

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
                up_vote: owner.up_vote + 1
            }, {
                where: {
                    id: owner.id
                }
            });

            res.status(200).json(vote);
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
                reputation: owner.reputation - 10,
                up_vote: owner.up_vote - 1
            }, {
                where: {
                    id: owner.id
                }
            });

            res.status(200).json(vote);
        } else {
            res.status(404).json("Post not found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}