class ErrorResponse extends Error {
  constructor(message = 'Internal Server Error', statusCode = 500, isOperational = true) {
    super(message);
    
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    this.success = false;
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  send(res) {
    const response = {
      success: false,
      error: {
        message: this.message,
        statusCode: this.statusCode,
        timestamp: this.timestamp
      }
    };

    // Add stack trace in development
    if (process.env.NODE_ENV === 'development') {
      response.error.stack = this.stack;
    }

    return res.status(this.statusCode).json(response);
  }

  // Static methods for common HTTP errors
  static badRequest(message = 'Bad Request') {
    return new ErrorResponse(message, 400);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ErrorResponse(message, 401);
  }

  static forbidden(message = 'Forbidden') {
    return new ErrorResponse(message, 403);
  }

  static notFound(message = 'Resource not found') {
    return new ErrorResponse(message, 404);
  }

  static conflict(message = 'Conflict') {
    return new ErrorResponse(message, 409);
  }

  static unprocessableEntity(message = 'Unprocessable Entity') {
    return new ErrorResponse(message, 422);
  }

  static tooManyRequests(message = 'Too Many Requests') {
    return new ErrorResponse(message, 429);
  }

  static internalServer(message = 'Internal Server Error') {
    return new ErrorResponse(message, 500);
  }

  static notImplemented(message = 'Not Implemented') {
    return new ErrorResponse(message, 501);
  }

  static badGateway(message = 'Bad Gateway') {
    return new ErrorResponse(message, 502);
  }

  static serviceUnavailable(message = 'Service Unavailable') {
    return new ErrorResponse(message, 503);
  }
}

export default ErrorResponse;
