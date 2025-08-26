import express from "express";
import { sequelize } from "./models";
import dotenv from "dotenv";
import './middleware/auth';
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import passport from "passport";
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import surveyRoutes from './routes/survey';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3005;

app.use(helmet());
app.use(compression())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3008',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Import routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/surveys', surveyRoutes);


// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// 404 handler
app.use('/{*any}',(req, res, next) => {
  res.status(404).send({ error: 'Not Found' });
});

// Start the server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync({ alter: true }); // Use { force: true } for development only
    console.log('Database synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

startServer();

export default app;