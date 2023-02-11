import { where } from "sequelize";
import { User } from "../models";



// Function gets user by id
export const getUserByID = async (req, res) => {
    try {
        let user_id = req.body.id; // Expects "id" in body of request

        const user = await User.findOne({ // Finds user with id = user_id
            where: {
                id: user_id
            }
        });
        res.status(200).json(user); // Returns user
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};


// Function gets user by display name
export const getUserByDisplayName = async (req, res) => {
    try {
        let display_name = req.body.display_name; // Expects "display_name" in body of request

        const user = await User.findOne({ // Finds user with display_name = display_name
            where: {
                display_name: display_name
            }
        });

        res.status(200).json(user); // Returns user
    } catch (error) {
        res.status(500).json(error); // Returns error
    }
};