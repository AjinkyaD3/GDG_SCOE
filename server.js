const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blogRoutes');
const adminRoutes = require('./routes/adminRoutes');
require('dotenv').config();
const app = express();
const port = 3000;

const db = process.env.DB;  // Get the connection string from the environment variable

// let dbstring = String(db);
// mongoose.connect(dbstring, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
