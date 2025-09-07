import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format']
  }
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

// Create the model
const User = mongoose.model('User', userSchema);

export default User;
