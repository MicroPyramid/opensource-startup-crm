export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  const originalSend = res.send;
  const originalJson = res.json;
  
  let responseBody = null;
  let requestBody = null;

  if (req.body && Object.keys(req.body).length > 0) {
    requestBody = { ...req.body };
    if (requestBody.password) requestBody.password = '[REDACTED]';
    if (requestBody.token) requestBody.token = '[REDACTED]';
  }

  res.send = function(body) {
    responseBody = body;
    return originalSend.call(this, body);
  };

  res.json = function(body) {
    responseBody = body;
    return originalJson.call(this, body);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;
    
    const logData = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      timestamp: new Date().toISOString(),
    };

    if (process.env.LOG_REQUEST_BODY === 'true' && requestBody) {
      logData.requestBody = requestBody;
    }

    if (process.env.LOG_RESPONSE_BODY === 'true' && responseBody) {
      try {
        logData.responseBody = typeof responseBody === 'string' ? JSON.parse(responseBody) : responseBody;
      } catch (e) {
        logData.responseBody = responseBody;
      }
    }

    if (req.user) {
      logData.userId = req.user.id;
      logData.userEmail = req.user.email;
    }

    if (req.organizationId) {
      logData.organizationId = req.organizationId;
    }

    console.log(`\n=== HTTP REQUEST LOG ===`);
    console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    
    if (requestBody) {
      console.log('REQUEST BODY:', JSON.stringify(requestBody, null, 2));
    }
    
    if (responseBody) {
      console.log('RESPONSE BODY:', JSON.stringify(responseBody, null, 2));
    }
    
    console.log('FULL LOG DATA:', JSON.stringify(logData, null, 2));
    console.log(`=== END LOG ===\n`);
  });

  next();
};