import env from "dotenv";
env.config();
import { init } from "./server/index.js";
import cluster from "cluster";
import { } from './models/index.js';

if (cluster.isPrimary) {
    for (let i = 1; i <= process.env.CPU; i++) {
        cluster.fork();
    }
} else {
    init();
}

// require('dotenv').config(); // Load environment variables
// const express = require('express');
// const path = require('path');
// const routes = require('./routes'); // Assume you have a routes folder

// const app = express();
// const PORT = process.env.PORT || 4200;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve React frontend
// app.use(express.static(path.join( '../frontend/build')));

// // API routes
// app.use('/api', routes);

// // Fallback for React routing
// app.get('*', (req, res) => {
//   res.sendFile(path.join('../frontend/build/index.html'));
// });

// // Start the backend server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
