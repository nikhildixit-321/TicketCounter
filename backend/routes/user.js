const { Router } = require("express")
const User = require("../model/user")
const { upload, uploadToCloudinary } = require("../config/cloudinary")
const { OAuth2Client } = require('google-auth-library');
const { createTokenForUser } = require('../services/authincation');

const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    try {
        console.log("SIGNIN REQUEST:", { email });
        const token = await User.matchPasswordAndGenerateToken(email, password)
        const isProduction = process.env.NODE_ENV === 'production'
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };
        return res.cookie('token', token, cookieOptions).json({ token })
    } catch (error) {
        console.error("SIGNIN ERROR:", error.message);
        return res.status(401).json({ error: "Incorrect email or password" })
    }
})

router.get('/logout', (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production'
    res.clearCookie('token', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'strict',
    }).json({ message: "Logged out" })
})

router.post('/signup', upload.single('image'), async (req, res) => {
    try {
        console.log("SIGNUP REQUEST:", req.body);
        console.log("IMAGE FILE:", req.file ? "Present" : "Not present");
        
        const { name, email, password, phone, role } = req.body
        let profile_pic = '';
        
        if (req.file) {
            console.log("Uploading image to Cloudinary...");
            // Upload to Cloudinary
            const result = await uploadToCloudinary(req.file.buffer);
            profile_pic = result.secure_url;
            console.log("Image uploaded:", profile_pic);
        }
        
        const user = await User.create({ name, email, password, phone, role: role || 'user', profile_pic })
        return res.status(201).json(user)
    } catch (error) {
        console.error("SIGNUP ERROR:", error.message);
        console.error("Full error:", error);
        res.status(400).json({ error: error.message });
    }
})

router.post('/google', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log("GOOGLE VERIFIED PAYLOAD:", payload.email);
        
        const { name, email, picture } = payload;
        
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name, email, profile_pic: picture, role: 'user', is_verified: true, password: '', phone: ''
            });
        }
        
        const authToken = createTokenForUser(user);
        const isProduction = process.env.NODE_ENV === 'production'
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };
        return res.cookie('token', authToken, cookieOptions).json({ token: authToken, user });
    } catch (error) {
        console.error("GOOGLE AUTH ERROR:", error.message);
        return res.status(401).json({ error: "Invalid Google token" });
    }
});

module.exports = router;
