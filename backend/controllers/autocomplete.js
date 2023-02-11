import { Sequelize, where } from "sequelize";
import { Tag, User } from "../models";



// Function autocompletes tag (returns json with tag)
export const AutocompleteTag = async (req, res) => {
    try {
        let tag_name = req.body.tag_name; // Expects "tag_name" in body of request

        const tag = await Tag.findAll({ // Finds all tags with tag_name in tags (Looks for the tag_name as a substring in tags)
            where: {
                tag_name: {
                    [Sequelize.Op.like]: "%" + tag_name + "%" 
                }
            }
        });

        res.status(200).json(tag); // Returns tags
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};


// Function autocompletes user (returns json with user)
export const AutocompleteUser = async (req, res) => {
    try {
        let display_name = req.body.display_name; // Expects "display_name" in body of request

        const user = await User.findAll({ // Finds all users with display_name in display_name (Looks for the display_name as a substring in display_name)
            where: {
                display_name: {
                    [Sequelize.Op.like]: "%" + display_name + "%"
                }
            }
        });

        res.status(200).json(user); // Returns users
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};