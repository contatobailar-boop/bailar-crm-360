require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

// Rotas
const authRoutes       = require('./routes/auth');
const leadRoutes       = require('./routes/leads');
const dealRoutes       = require('./routes/deals');
const studentRoutes    = require('./routes/students');
const taskRoutes       = require('./routes/tasks');
const classRoutes      = require('./routes/classes');
const enrollmentRoutes = require('./routes/enrollments');
const attendanceRoutes = require('./routes/attendance');
const paymentRoutes    = require('./routes/payments');
const guardianRoutes   = require('./routes/guardians');
const ticketRoutes     = require('./routes/tickets');
const eventRoutes      = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Registro de rotas
app.use('/api/auth',        authRoutes);
app.use('/api/leads',       leadRoutes);
app.use('/api/deals',       dealRoutes);
app.use('/api/students',    studentRoutes);
app.use('/api/tasks',       taskRoutes);
app.use('/api/classes',     classRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/attendance',  attendanceRoutes);
app.use('/api/payments',    paymentRoutes);
app.use('/api/guardians',   guardianRoutes);
app.use('/api/tickets',     ticketRoutes);
app.use('/api/events',      eventRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, data: { app: 'Bailar CRM 360', timestamp: new Date().toISOString() }, message: 'API online' });
});

// Error handler global — deve ser o ÚLTIMO middleware
app.use(errorHandler);

// Start
app.listen(PORT, () => {
  console.log(`\n  Bailar CRM 360 API`);
  console.log(`  http://localhost:${PORT}\n`);
});
