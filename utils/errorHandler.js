import ErrorResponse from './ErrorResponse.js';

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error Stack:', err.stack);
  console.error('Error Details:', {
    message: err.message,
    statusCode: err.statusCode || 500,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // MongoDB CastError (Invalid ObjectId)
  if (err.name === 'CastError') {
    const message = 'Invalid resource ID format';
    error = ErrorResponse.badRequest(message);
  }

  // MongoDB Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    error = ErrorResponse.conflict(message);
  }

  // MongoDB Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = ErrorResponse.badRequest(message);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = ErrorResponse.unauthorized(message);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token has expired';
    error = ErrorResponse.unauthorized(message);
  }

  // MongoDB Connection Error
  if (err.name === 'MongoNetworkError' || err.name === 'MongooseServerSelectionError') {
    const message = 'Database connection error';
    error = ErrorResponse.serviceUnavailable(message);
  }

  // Rate Limiting Error
  if (err.status === 429) {
    const message = 'Too many requests, please try again later';
    error = ErrorResponse.tooManyRequests(message);
  }

  // Handle ErrorResponse instances
  if (error instanceof ErrorResponse) {
    return error.send(res);
  }

  // Default error response
  const defaultError = ErrorResponse.internalServer();
  return defaultError.send(res);
};

export default errorHandler;
