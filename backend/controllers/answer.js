import { where } from "sequelize";
import { Post, PostHistory } from "../models";



// Function answers question
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