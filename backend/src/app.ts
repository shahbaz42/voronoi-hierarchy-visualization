import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { ErrorHandler } from './utils';
import { employeeRouter } from './router';
import { connectToDatabase } from './database';
import { EmployeeRepository, Employee } from './database';

const app = express();

// Connecting Database
connectToDatabase().then(() => {
  console.log('Connected to MongoDB');
});

// rate limit
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // 60 requests
  })
);

// Logging and parsing
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server is running.');
})

// for AWS EB health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('ok');
});

// API router
app.use('/employees', employeeRouter);

// Error handling
app.use(ErrorHandler);

export default app;
