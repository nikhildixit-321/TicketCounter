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
        return res.cookie('token', token).json({ token })
    } catch (error) {
        return res.status(401).json({ error: "Incorrect email or password" })
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token').json({ message: "Logged out" })
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

module.exports = router;

