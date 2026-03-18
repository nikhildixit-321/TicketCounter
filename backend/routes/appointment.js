const { Router } = require("express")
const User = require("../model/user")
const Appointment = require("../model/appointment")

const router = Router();

// API to book appointment
router.post('/book', async (req, res) => {
    try {
        const { userId, doctorId, slotDate, slotTime } = req.body;
        const docData = await User.findById(doctorId).select('-password -salt');
        const userData = await User.findById(userId).select('-password -salt');

        const appointmentData = {
            userId, doctorId, slotDate, slotTime,
            userData, docData,
            amount: docData.fees,
            date: Date.now()
        }
        const newAppointment = new Appointment(appointmentData)
        await newAppointment.save()
        res.json({ success: true, message: "Appointment Booked" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// API to get appointments for a doctor
router.get('/doctor-appointments', async (req, res) => {
    try {
        const { doctorId } = req.query;
        const appointments = await Appointment.find({ doctorId }).populate('userId');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// API to update prescription/notes
router.post('/update-report', async (req, res) => {
    try {
        const { appointmentId, prescription, notes } = req.body;
        await Appointment.findByIdAndUpdate(appointmentId, { prescription, notes, isCompleted: true });
        res.json({ success: true, message: "Report Updated" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// API to get patient history for a doctor
router.get('/patient-history', async (req, res) => {
    try {
        const { userId } = req.query;
        const history = await Appointment.find({ userId, isCompleted: true }).populate('doctorId', 'name speciality');
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router;
