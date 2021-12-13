import mongoose, {Model} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }
}, {
    timestamps: true
}
);

Schema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, process.env.JWT_PRIVATE_KEY);
};


Schema.statics.comparePassword = async ({ password }) => {

    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) return false;

    return true;

};

Schema.pre("save", function (next) {
    const user = this;

    // password is modified
    if (!user.isModified("password")) return next();

    const saltRounds = 8;

    // generate bcrypt salt
    bcrypt.genSalt(saltRounds, (error, salt) => {
        if (error) return next(error);

        // hash the password
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            // assigning hashed password
            user.password = hash;
            return next();
        });
    });
});

const User = mongoose.model(Schema, "user");




export default User;
