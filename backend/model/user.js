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
    is_verified: { type: Boolean, default: false }, // Email/Phone verification
    
    // Status for Admin Approval (mostly for doctors)
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    
    // Location for proximity search
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] } // [longitude, latitude]
    },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },

    // Doctor Specific Fields
    speciality: { type: String, default: '' },
    degree: { type: String, default: '' },
    college: { type: String, default: '' },
    experience: { type: String, default: '' },
    regNumber: { type: String, default: '' },
    fees: { type: Number, default: 0 },
    availability: { type: String, default: '' }, // e.g. "Mon,Tue,Wed"
    about: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    
    // Documents (Cloudinary URLs)
    certificate: { type: String, default: '' },
    idProof: { type: String, default: '' },
    license: { type: String, default: '' },
    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

userSchema.index({ location: "2dsphere" });


userSchema.pre("save", async function () {
    const user = this;
    if (!user.isModified("password") || !user.password) return;
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');
    this.salt = salt;
    this.password = hashedPassword;
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
