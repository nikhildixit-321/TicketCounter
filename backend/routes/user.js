const { Router } = require("express")
const User = require("../model/user")
const { upload, uploadToCloudinary } = require("../config/cloudinary")
const { OAuth2Client } = require('google-auth-library');
const { createTokenForUser } = require('../services/authincation');

const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("SIGNIN REQUEST:", { email });
        const token = await User.matchPasswordAndGenerateToken(email, password);
        const user = await User.findOne({ email });
        
        const isProduction = process.env.NODE_ENV === 'production';
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };
        return res.cookie('token', token, cookieOptions).json({ token, user });
    } catch (error) {
        console.error("SIGNIN ERROR:", error.message);
        return res.status(401).json({ error: "Incorrect email or password" });
    }
});

router.get('/logout', (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production';
    res.clearCookie('token', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'strict',
    }).json({ message: "Logged out" });
});

router.post('/signup', upload.single('image'), async (req, res, next) => {
    try {
        console.log("SIGNUP REQUEST:", req.body.email);
        const { name, email, password, phone, role } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered!" });
        }

        let profile_pic = '';
        if (req.file) {
            console.log("Uploading image to Cloudinary...");
            const result = await uploadToCloudinary(req.file.buffer);
            profile_pic = result.secure_url;
        }
        
        const user = await User.create({ name, email, password, phone, role: role || 'user', profile_pic });
        return res.status(201).json(user);
    } catch (error) {
        console.error("SIGNUP FATAL ERROR:", error.message);
        res.status(400).json({ error: error.message });
    }
});

router.post('/google', async (req, res, next) => {
    const { token, role } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, picture } = ticket.getPayload();
        console.log("GOOGLE USER LOGGED IN:", email);
        
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name, email, profile_pic: picture, 
                role: role || 'user', is_verified: true, 
                password: '', phone: ''
            });
        }
        
        const authToken = createTokenForUser(user);
        const isProduction = process.env.NODE_ENV === 'production';
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
