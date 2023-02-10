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

