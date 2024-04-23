const express = require('express');
const db = require("./Models");
const cors = require('cors')
require("dotenv").config();
const todoRoutes = require('./routes/todoRoutes');

// Setting up your port
const PORT = process.env.PORT || 8080;

// Assigning the variable app to express
const app = express();
app.use(cors({
  origin: ['*', 'http://localhost:4200']
}));
// Middleware
app.use(express.json({ limit: "10kb" })); // JSON parsing with limit
app.use(express.urlencoded({ extended: false })); // URL encoded parsing

// Synchronizing the database
db.sequelize.sync().then(() => {
  console.log("Database has been synced");
});

// Routes for the user API
app.use('/api/todo', todoRoutes);

// Listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
