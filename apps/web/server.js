import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { createLogger } from '../api/config/logger.js';
import { requestLogger } from '../api/middleware/requestLogger.js';
import { errorHandler } from '../api/middleware/errorHandler.js';
import authRoutes from '../api/routes/auth.js';
import dashboardRoutes from '../api/routes/dashboard.js';
import leadRoutes from '../api/routes/leads.js';
import accountRoutes from '../api/routes/accounts.js';
import contactRoutes from '../api/routes/contacts.js';
import opportunityRoutes from '../api/routes/opportunities.js';
import taskRoutes from '../api/routes/tasks.js';
import organizationRoutes from '../api/routes/organizations.js';

dotenv.config();

const app = express();
const logger = createLogger();
const PORT = process.env.PORT || 3001;

// Trust proxy setting for rate limiting
app.set('trust proxy', 1);

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BottleCRM API',
      version: '1.0.0',
      description: 'Multi-tenant CRM API with JWT authentication',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./api/routes/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(rateLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/leads', leadRoutes);
app.use('/accounts', accountRoutes);
app.use('/contacts', contactRoutes);
app.use('/opportunities', opportunityRoutes);
app.use('/tasks', taskRoutes);
app.use('/organizations', organizationRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`BottleCRM API server running on port ${PORT}`);
  logger.info(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;