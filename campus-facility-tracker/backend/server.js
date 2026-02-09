const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middleware/authMiddleware');
const complaintRoutes = require('./routes/complaintRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

app.get('/api/protected', verifyToken, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    });
});

app.get('/', (req, res) => {
    res.send("Campus Facility Issue Tracker API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});