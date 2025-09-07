import express from 'express';
import User from '../models/User.js';
import { SuccessResponse, ErrorResponse, asyncHandler } from '../utils/index.js';

const router = express.Router();

// GET /api/users - Get all users
router.get('/', asyncHandler(async (req, res) => {
  const users = await User.findAll();
  return SuccessResponse.ok(res, 'Users retrieved successfully', users);
}));

// GET /api/users/:id - Get user by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  return SuccessResponse.ok(res, 'User retrieved successfully', user);
}));

// POST /api/users - Create a new user
router.post('/', asyncHandler(async (req, res) => {
  const newUser = await User.create(req.body);
  return SuccessResponse.created(res, 'User created successfully', newUser);
}));

// PUT /api/users/:id - Update user
router.put('/:id', asyncHandler(async (req, res) => {
  const updatedUser = await User.update(req.params.id, req.body);
  return SuccessResponse.ok(res, 'User updated successfully', updatedUser);
}));

// DELETE /api/users/:id - Delete user
router.delete('/:id', asyncHandler(async (req, res) => {
  await User.delete(req.params.id);
  return SuccessResponse.ok(res, 'User deleted successfully');
}));

// GET /api/users/stats/count - Get user count
router.get('/stats/count', asyncHandler(async (req, res) => {
  const count = await User.count();
  return SuccessResponse.ok(res, 'User count retrieved successfully', { count });
}));

export default router;
