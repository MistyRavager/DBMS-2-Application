import { Sequelize, where } from "sequelize";
import { Post } from "../models";




// Function gets post by post id
export const getPostByID = async (req, res) => {
    try {
        let post_id = req.body.post_id; // Expects "post_id" in body of request

        const post = await Post.findOne({ // Finds posts with id = post_id
            where: {
                id: post_id
            }
        });

        res.status(200).json(post); // Returns post
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
}


// Function gets post by user id
export const getPostByUserID = async (req, res) => {
    try {
        let user_id = req.body.user_id; // Expects "user_id" in body of request

        const post = await Post.findAll({ // Finds all posts with owner_user_id = user_id
            where: {
                owner_user_id: user_id 
            }
        });

        res.status(200).json(post); // Returns posts
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
}


// Function gets post by tag
export const getPostByTag = async (req, res) => {
    try {
        let tag_name = req.body.tag_name; // Expects "tag_name" in body of request

        const post = await Post.findAll({ // Finds all posts with tag_name in tags (Looks for the tag_name as a substring in tags)
            where: {
                tags: {
                    [Sequelize.Op.like]: "%" + tag_name + "%"
                }
            }
        });

        res.status(200).json(post); // Returns posts
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
}





