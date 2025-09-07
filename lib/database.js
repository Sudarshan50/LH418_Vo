import mongoose from 'mongoose';

class Database {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    try {
      const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lh408';
      
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(MONGODB_URI);
        this.isConnected = true;
        console.log('✅ Connected to MongoDB with Mongoose');
        console.log(`📦 Database: ${mongoose.connection.db.databaseName}`);
      }
      
      return mongoose.connection.db;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      this.isConnected = false;
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.isConnected) {
        await mongoose.disconnect();
        this.isConnected = false;
        console.log('📦 MongoDB connection closed');
      }
    } catch (error) {
      console.error('❌ Error closing MongoDB connection:', error);
      throw error;
    }
  }

  async ping() {
    try {
      if (!this.isConnected) {
        return false;
      }
      await mongoose.connection.db.admin().ping();
      return true;
    } catch (error) {
      console.error('❌ Database ping failed:', error);
      return false;
    }
  }

  getDb() {
    if (!this.isConnected) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return mongoose.connection.db;
  }

  isHealthy() {
    return this.isConnected && mongoose.connection.readyState === 1;
  }
}

// Create and export a singleton instance
const database = new Database();

export default database;
