import crypto from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        max: 255
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        min: 1,
        max: 255
    },
    bio: {
        type: String,
    },
    gender: {
        type: String, 
        required: true,
        max: 6
    },
    languages: [
        {
            type: String, 
            max: 188
        }
    ],
    interests: [
        {
            type: String,
            required: true, 
            max: 96
        }
    ],
    // location: {
    //     type: {
    //       type: String, 
    //       enum: ['Point'], 
    //       required: true
    //     },
    //     coordinates: {
    //       type: [Number],
    //       required: true
    //     }
    // },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    },
    userProfileImage: {
        type: String
    }, 
    friendList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            default: []
        }
    ],
    hashed_password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    resetPasswordLink: {
        data: String,
        default: ""
    },
    salt: String
}, { timestamps: true });

userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password
    });


userSchema.methods = { 
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + "";
    },
    encryptPassword: function(password) {
        if(!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex")
        } catch(err) {
            return "";
        }
    },
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    }
}

const User = mongoose.model("User", userSchema);

export default User;