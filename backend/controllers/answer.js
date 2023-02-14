import { Sequelize, where } from "sequelize";
import { Post, PostHistory, User } from "../models";



// Function answers question
export const answerQuestion = async (req, res) => {
    try {
        let post_id = req.body.post_id; 
        let user_id = req.body.user_id; 
        let answer = req.body.answer; 

        const post = await Post.findOne({
            where: {
                id: post_id,
                post_type_id: 1
            }
        });

        if (post) {
            const user = await User.findOne({
                where: {
                    id: user_id,
                }
            });

            const postUpdate = await Post.update({
                last_activity_date: new Date(),
                answer_count: Sequelize.literal('answer_count + 1')
            }, {
                where: {
                    id: post_id
                }
            });

            const newPost = await Post.create({
                post_type_id: 2,
                parent_id: post_id,
                owner_user_id: user_id,
                owner_display_name: user.display_name,
                score: 0,
                view_count: 0,
                comment_count: 0,
                body: answer,
                content_license: "CC BY-SA 2.5",
                creation_date: new Date(),
                last_activity_date: new Date(),
                last_edit_date: new Date(),
                last_editor_user_id: user_id,
                last_editor_display_name: user.display_name,
                community_owned_date: null,
                closed_date: null,
                title: null,
                tags: null,
                favorite_count: null,
                accepted_answer_id: null
            });

            res.status(200).json("done");
        } else {
            res.status(404).json("Post not found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}