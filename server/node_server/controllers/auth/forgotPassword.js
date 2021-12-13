
// MODELS
import User from "../../database/user.js";

// VALIDATION
import {forgotPassoword} from "../../validation/auth.js";

export const forgotPassword = async (req, res) => {

    const {error} = forgotPassoword.validate(req.body.payload);
    if(error) {
        return res.status(500).json({error: error.details[0].message});
    }

    try{
        const userData = req.body.payload;

        const user = await User.findOne({email: userData.email});

        if(!user){
            return res.status(404).json({error: `User with ${userData.email} does not exist.`});
        }

        // send mail


        return res.status(200).json({message: `A password reset email has been sent to ${user.email}, please check your inbox.`});

    }catch (error){
        console.log({error});
        return res.status(500).json({error: "Internal server error"});
    }
}