import bcrypt from "bcryptjs";

// MODELS
import User from "../../database/user.js";

// CACHE
import {addDataToCache, getDataFromCache} from "../../database/cache.js";

export const resetPassword = async (req, res, next) => {
    try{
        const userId = req.body.userId;
        const {newPassword} = req.body.payload;
        const token = req.headers.authorization.slice(7);

        const user = await User.findById(`${userId}`);


        if(!user){
            return res.status(404).json({error: `Invalid request, please try again`});
        };

        const isTokenBlackListed = await getDataFromCache(`${user._id}`);

        if(isTokenBlackListed){
            return res.status(401).json({error: `Token expired`});
        };

        // hash the password
        const salt = await bcrypt.genSalt(8);

        const hash = await bcrypt.hash(newPassword, salt);

        // update DB
        await User.findByIdAndUpdate(userId, {
            password: hash
        });

        // blacklist token
        await addDataToCache(`${user._id}`, `${token}`);

        return res.status(200).json({message: `Password reset was successful`});

    }catch (error){
        console.log({error});
        return res.status(500).json({error: "Internal server error"});
    }
}