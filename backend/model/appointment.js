const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true }, // Snapshots of user details
    docData: { type: Object, required: true },   // Snapshots of doc details
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    
    // Doctor's interaction
    prescription: { type: String, default: '' },
    notes: { type: String, default: '' },
    medicalHistory: { type: String, default: '' }
})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)
module.exports = appointmentModel
