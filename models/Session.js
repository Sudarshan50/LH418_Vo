import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    sessionName: {
        type: String,
        required: true
    },
    structure: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['copying', 'sending', 'done'],
        required: true,
        default: 'copying',
    }
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

export default Session;