import bcrypt from "bcryptjs";

// MODELS
import User from "../../database/user.js";

export const resetPassword = async (req, res, next) => {
    try{
        const userId = req.session.user._id;
        const newPassword = req.body.payload;

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({error: `Invalid request, please try again`});
        };

        // hash the password
        const salt = await bcrypt.genSalt(8);

        const hash = await bcrypt.hash(newPassword, salt);

        // update DB
        await User.findByIdAndUpdate(userId, {
            password: hash
        });

        return res.status(200).json({message: `Password reset was successful`});

    }catch (error){
        console.log({error});
        return res.status(500).json({error: "Internal server error"});
    }
}