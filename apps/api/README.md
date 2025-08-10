# BottleCRM API

Express.js API for BottleCRM with JWT authentication, Swagger documentation, and configurable request logging.

## Features

- **Google OAuth Authentication**: Secure Google Sign-In for mobile apps
- **Multi-tenant**: Organization-based data isolation using existing Prisma schema
- **Swagger Documentation**: Interactive API documentation at `/api-docs`
- **Request Logging**: Configurable input/output HTTP request logging
- **Security**: Helmet, CORS, rate limiting
- **Organization Access Control**: Ensures users can only access their organization's data

## Quick Start

1. The required environment variables are already added to your existing `.env` file.

2. **Generate a secure JWT secret** (required for production):
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL (if available)
openssl rand -hex 32

# Using online generator (for development only)
# Visit: https://generate-secret.vercel.app/32
```

3. Update your `.env` file with the generated secret:
```env
JWT_SECRET=your-generated-secret-key-here
```

4. Start the API server:
```bash
# Development with auto-reload
pnpm run api:dev

# Production
pnpm run api:start
```

5. Visit Swagger documentation:
```
http://localhost:3001/api-docs
```

## Authentication

1. **Google Login**: POST `/api/auth/google`
   - Request: `{ "idToken": "google-id-token-from-mobile-app" }`
   - Response: `{ "token": "jwt-token", "user": {...} }`

2. **Use Token**: Include in Authorization header:
   ```
   Authorization: Bearer <jwt-token>
   ```

3. **Select Organization**: Include organization ID in header:
   ```
   X-Organization-ID: <organization-id>
   ```

## API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth mobile login
- `GET /api/auth/me` - Get current user profile

### Leads
- `GET /api/leads` - Get organization leads (paginated)
- `GET /api/leads/:id` - Get lead by ID
- `POST /api/leads` - Create new lead

### Accounts
- `GET /api/accounts` - Get organization accounts
- `POST /api/accounts` - Create new account

### Contacts
- `GET /api/contacts` - Get organization contacts
- `POST /api/contacts` - Create new contact

### Opportunities
- `GET /api/opportunities` - Get organization opportunities
- `POST /api/opportunities` - Create new opportunity

## Configuration

### Environment Variables

- `API_PORT`: Server port (default: 3001)
- `JWT_SECRET`: Secret key for JWT tokens (required) - **Generate using the commands above**
- `JWT_EXPIRES_IN`: Token expiration time (default: 24h)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:5173)

### Logging Configuration

- `LOG_LEVEL`: Logging level (info, debug, error)
- `ENABLE_REQUEST_LOGGING`: Enable/disable request logging (true/false)
- `LOG_REQUEST_BODY`: Log request bodies (true/false)
- `LOG_RESPONSE_BODY`: Log response bodies (true/false)

### Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet**: Security headers
- **CORS**: Cross-origin request handling
- **JWT Validation**: Token verification on protected routes
- **Organization Isolation**: Users can only access their organization's data

## Data Access Control

All API endpoints enforce organization-based access control:

1. **Authentication Required**: All endpoints (except login) require valid JWT token
2. **Organization Header**: Protected endpoints require `X-Organization-ID` header
3. **Membership Validation**: User must be a member of the specified organization
4. **Data Filtering**: All database queries are filtered by organization ID

## Development

The API uses the same Prisma schema as the main SvelteKit application, ensuring data consistency and leveraging existing:

- Database models and relationships
- Organization-based multi-tenancy
- User role management (ADMIN/USER)
- Super admin access (@micropyramid.com domain)

## Testing with Swagger

Access the interactive API documentation at `http://localhost:3001/api-docs` to:

1. Test authentication endpoints
2. Explore available endpoints
3. Test API calls with different parameters
4. View request/response schemas