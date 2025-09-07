class SuccessResponse {
  constructor(message = 'Success', data = null, statusCode = 200) {
    this.success = true;
    this.message = message;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
    
    if (data !== null) {
      this.data = data;
    }
    
    // Add count if data is an array
    if (Array.isArray(data)) {
      this.count = data.length;
    }
  }

  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      ...(this.data !== undefined && { data: this.data }),
      ...(this.count !== undefined && { count: this.count }),
      timestamp: this.timestamp
    });
  }

  static ok(res, message = 'Success', data = null) {
    return new SuccessResponse(message, data, 200).send(res);
  }

  static created(res, message = 'Resource created successfully', data = null) {
    return new SuccessResponse(message, data, 201).send(res);
  }

  static deleteResource(res, message = 'Request Deletion Started', data = null) {
    return new SuccessResponse(message, data, 202).send(res);
  }

  static noContent(res, message = 'No content') {
    return new SuccessResponse(message, null, 204).send(res);
  }
}

export default SuccessResponse;
