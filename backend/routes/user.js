const { Router } = require("express")
const User = require("../model/user")
const { upload } = require("../config/cloudinary")
const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, role, profile_pic } = req.body;
        const user = new User({ name, email, password, phone, role, profile_pic });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    try {
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
        const { name, email, password, phone, role } = req.body
        const profile_pic = req.file ? req.file.path : ''

        const user = await User.create({
            name,
            email,
            password,
            phone,
            role: role || 'user',
            profile_pic
        })
        return res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

const { OAuth2Client } = require('google-auth-library');
const { createTokenForUser } = require('../services/authincation');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, picture } = ticket.getPayload();
        
        // Find existing user
        let user = await User.findOne({ email });
        
        // Create user if they don't exist
        if (!user) {
            user = await User.create({
                name,
                email,
                profile_pic: picture,
                role: 'user',
                is_verified: true,
                password: '', // OAuth users don't need passwords by default
                phone: '' // Required field fallback handled by schema
            });
        }
        
        // Generate Token
        // Wait, the model uses User.matchPasswordAndGenerateToken which creates the token.
        // I need to generate it directly here. createTokenForUser is in services/authincation
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
        return res.status(401).json({ error: "Invalid Google token" });
    }
});

module.exports = router;

