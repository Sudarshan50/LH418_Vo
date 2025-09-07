import User from './UserModel.js';
import { ErrorResponse } from '../utils/index.js';

class UserService {
  async findAll() {
    try {
      return await User.find({});
    } catch (error) {
      console.error('Error finding users:', error);
      throw ErrorResponse.internalServer('Failed to retrieve users');
    }
  }

  async findById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw ErrorResponse.notFound('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      if (error.name === 'CastError') {
        throw ErrorResponse.badRequest('Invalid user ID format');
      }
      console.error('Error finding user by ID:', error);
      throw ErrorResponse.internalServer('Failed to retrieve user');
    }
  }

  async findByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw ErrorResponse.internalServer('Failed to find user by email');
    }
  }

  async create(userData) {
    try {
      const { name, email } = userData;
      
      if (!name || !email) {
        throw ErrorResponse.badRequest('Name and email are required');
      }

      const user = new User({ name, email });
      return await user.save();
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      if (error.code === 11000) {
        throw ErrorResponse.conflict('User with this email already exists');
      }
      if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(e => e.message).join(', ');
        throw ErrorResponse.badRequest(message);
      }
      console.error('Error creating user:', error);
      throw ErrorResponse.internalServer('Failed to create user');
    }
  }

  async update(id, updateData) {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!user) {
        throw ErrorResponse.notFound('User not found');
      }
      
      return user;
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      if (error.name === 'CastError') {
        throw ErrorResponse.badRequest('Invalid user ID format');
      }
      if (error.code === 11000) {
        throw ErrorResponse.conflict('Email already exists');
      }
      if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(e => e.message).join(', ');
        throw ErrorResponse.badRequest(message);
      }
      console.error('Error updating user:', error);
      throw ErrorResponse.internalServer('Failed to update user');
    }
  }

  async delete(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      
      if (!user) {
        throw ErrorResponse.notFound('User not found');
      }
      
      return { deletedCount: 1 };
    } catch (error) {
      if (error instanceof ErrorResponse) {
        throw error;
      }
      if (error.name === 'CastError') {
        throw ErrorResponse.badRequest('Invalid user ID format');
      }
      console.error('Error deleting user:', error);
      throw ErrorResponse.internalServer('Failed to delete user');
    }
  }

  async count() {
    try {
      return await User.countDocuments();
    } catch (error) {
      console.error('Error counting users:', error);
      throw ErrorResponse.internalServer('Failed to count users');
    }
  }
}

export default new UserService();
