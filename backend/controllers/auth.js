import { where } from "sequelize";
import { Credential } from "../models.js";


// Function takes user_id and password, and checks if present in 'credentials' database
export const authenticateUser = async (user_id, password) => {
    try {
        let res = await Credential.findOne({ // Find user_id and password in 'credentials' database
            where: {
                user_name: user_id,
                password: password
            }
        });

        if (res) { // If user_id and password are present in 'credentials' database, return true
            return true;
        } else {
            return false; // Else return false
        }
    } catch (error) {
        return false;
    }
};