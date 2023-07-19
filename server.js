const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connect } = require('mongoose');
const connectDB = require('./config/db');

dotenv.config();

// db connection
connectDB();

// rest object
const app = express();

//middleware00
app.use(express.json());
app.use(morgan('dev'));
require('./config')(app);

//routes
app.get('/test', (req, res) => {
  res.send('hello world');
});
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
