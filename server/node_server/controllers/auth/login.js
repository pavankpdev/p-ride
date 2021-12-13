
// MODELS
import User from "../../database/user.js";

// VALIDATION
import {loginValidation} from "../../validation/auth.js";

export const login = async (req, res) => {

    const {error} = loginValidation.validate(req.body.payload);
    if(error) {
        return res.status(500).json({error: error.details[0].message});
    }

    try{
        const userData = req.body.payload;

        const user = await User.findOne({email: userData.email});

        if(!user){
            return res.status(404).json({error: `User with ${userData.email} does not exist`});
        }

        const doesPasswordsMatch = await User.comparePassword(userData);

        if(!doesPasswordsMatch){
            return res.status(401).json({error: "Invalid password!"});
        }

        const token = user.generateJwtToken();

        return res.status(200).json({message: "Login Successful", token});

    }catch (error){
        console.log({error});
        return res.status(500).json({error: "Internal server error"});
    }
}