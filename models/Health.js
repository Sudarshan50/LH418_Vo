import mongoose from 'mongoose';

const healthStatusEnum = ['Healthy', 'Destroy'];

const HealthSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: healthStatusEnum,
        required: true,
        default: 'Healthy'
    }
}, { timestamps: true });

export default mongoose.model('Health', HealthSchema);