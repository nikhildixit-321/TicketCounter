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

router.post('/signup', upload.single('image'), async (req, res) => {
    try {
        console.log("SIGNUP REQUEST:", req.body.email);
        console.log("PROFILE IMAGE STATUS:", req.file ? "Uploaded" : "No image provided");
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
        console.error("ERROR STACK:", error.stack);
        res.status(400).json({ error: error.message });
    }
});

router.post('/google', async (req, res) => {
    const { token, role, phone } = req.body;
    try {
        console.log("GOOGLE AUTH ATTEMPT:", token?.slice(0, 10) + "...");
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, picture } = ticket.getPayload();
        
        let user = await User.findOne({ email });
        if (!user) {
            // Generate a random string for password to avoid empty field in DB
            const placeholderPassword = Math.random().toString(36).slice(-10);
            user = await User.create({
                name, email, profile_pic: picture, 
                role: role || 'user', is_verified: true, 
                password: placeholderPassword, 
                phone: phone || '',
                status: (role === 'admin' || role === 'user') ? 'approved' : 'pending'
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

// Doctor Onboarding (Update professional details)
router.post('/onboard-doctor', upload.fields([
    { name: 'certificate', maxCount: 1 },
    { name: 'idProof', maxCount: 1 },
    { name: 'license', maxCount: 1 }
]), async (req, res) => {
    try {
        const { 
            email, speciality, degree, college, experience, regNumber, 
            adharNumber, clinicName, clinicTiming, fees, availability, 
            address, city, state,
            home_lat, home_long, clinic_lat, clinic_long 
        } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const updateData = {
            speciality, degree, college, experience, regNumber, 
            adharNumber, clinicName, clinicTiming, fees, availability, address, city, state,
            status: 'pending' // Reset to pending after update for admin review
        };

        // Update Home Location if provided
        if (home_lat && home_long) {
            updateData.location = {
                type: 'Point',
                coordinates: [parseFloat(home_long), parseFloat(home_lat)]
            };
        }

        // Update Clinic Location if provided
        if (clinic_lat && clinic_long) {
            updateData.clinicLocation = {
                type: 'Point',
                coordinates: [parseFloat(clinic_long), parseFloat(clinic_lat)]
            };
        }

        if (req.files['certificate']) {
            const result = await uploadToCloudinary(req.files['certificate'][0].buffer);
            updateData.certificate = result.secure_url;
        }
        if (req.files['idProof']) {
            const result = await uploadToCloudinary(req.files['idProof'][0].buffer);
            updateData.idProof = result.secure_url;
        }
        if (req.files['license']) {
            const result = await uploadToCloudinary(req.files['license'][0].buffer);
            updateData.license = result.secure_url;
        }

        const updatedUser = await User.findOneAndUpdate({ email }, updateData, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("ONBOARD ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Admin: Get pending doctors
router.get('/admin/pending-doctors', async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor', status: 'pending' });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin: Approve/Reject doctor
router.post('/admin/approve-doctor', async (req, res) => {
    try {
        const { userId, status } = req.body; // status: 'approved' or 'rejected'
        const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User: Get doctors (Approved only, with search and location support)
router.get('/all-doctors', async (req, res) => {
    try {
        const { speciality, search, long, lat } = req.query;
        let query = { role: 'doctor', status: 'approved' };
        
        if (speciality) query.speciality = speciality;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { speciality: { $regex: search, $options: 'i' } }
            ];
        }

        // If location is provided, sort by proximity
        if (long && lat) {
            query.location = {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(long), parseFloat(lat)] },
                    $maxDistance: 50000 // 50km radius
                }
            };
        }

        const doctors = await User.find(query).limit(20);
        res.json(doctors);
    } catch (error) {
        console.error("SEARCH ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Update location
router.post('/update-location', async (req, res) => {
    try {
        const { email, longitude, latitude, address } = req.body;
        const user = await User.findOneAndUpdate(
            { email },
            { 
                location: { 
                    type: 'Point', 
                    coordinates: [parseFloat(longitude), parseFloat(latitude)] 
                },
                address 
            },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
