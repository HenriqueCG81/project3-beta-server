const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connect } = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
// rest object
const app = express();
dotenv.config();
require('./config')(app);
// db connection
connectDB();

//middleware00
app.use(express.json());
app.use(morgan('dev'));

//cors

app.get('/test', (req, res) => {
  res.send('Hello from the server!');
});

//routes

app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/doctor', require('./routes/doctorRoutes'));

//port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `server is running in ${process.env.Node_Mode} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
