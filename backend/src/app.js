const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');
const allowedOrigins = [
  'http://localhost:5173',
  'https://code-reviewer-y6mjhqryb-rohitlanjewar03s-projects.vercel.app'
];
const app = express();
app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use('/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});


module.exports = app;