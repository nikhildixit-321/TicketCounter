process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const connectDB = require('./bd.js')
const { checkForAuthenticationCookie } = require('./middleware/auth.js');
const userRouter = require('./routes/user')
const appointmentRouter = require('./routes/appointment')
const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'https://ticket-counter-sigma.vercel.app',
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(checkForAuthenticationCookie('token')) // Uncommented and enabled globally

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/user', userRouter)
app.use('/appointment', appointmentRouter) // Added this line

app.get('/', (req, res) => {
  res.send("Welcome to the Ticket Counter API!")
})

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route Not Found' });
});

// Error Handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  console.error('ERROR:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

const startServer = async () => {
  try {
    console.log('Starting server initialization...');
    await connectDB();
    console.log('Database connected successfully');
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error('SERVER FATAL:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

startServer();


