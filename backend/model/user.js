const mongoose = require('mongoose')
const { createHmac, randomBytes } = require('crypto')
const { createTokenForUser } = require('../services/authincation')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for OAuth users
    salt: { type: String },
    phone: { type: String, default: '' },
    role: { type: String, enum: ['user', 'doctor', 'admin'], default: 'user' },
    profile_pic: { type: String, default: '' },
    is_verified: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})


userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password") || !user.password) return next();
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');
    this.salt = salt;
    this.password = hashedPassword;
    next();
});

userSchema.statics.matchPasswordAndGenerateToken = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('user not found');
    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvideHash = createHmac('sha256', salt)
        .update(password)
        .digest('hex');
    if (hashedPassword != userProvideHash) throw new Error('Incorrect password');
    const token = createTokenForUser(user);
    return token;
};
const User = mongoose.model('User', userSchema)
module.exports = User
