
// MODELS
import User from "../../database/user";

export const register = async (req, res) => {
    try{
        const userData = req.payload;

        const doesUserExist = await User.findOne({email: userData.email});

        if(doesUserExist){
            return res.status(404).json({error: `User with ${userData.email} already exist, please use a new email, or login with the same.`});
        }

        const registerUser = await User.create(userData);

        const token = registerUser.generateJwtToken();

        return res.status(201).json({message: "User registration Successful", token});

    }catch (error){
        console.log({error});
        return res.status(500).json({error: "Internal server error"});
    }
}