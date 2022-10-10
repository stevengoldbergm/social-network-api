// Require express, db, and routes
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set port and app
const PORT = 3001; // This app isn't being deployed. PORT set to static 3001
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server for ${process.cwd()} running on port ${PORT}`);
    });
});