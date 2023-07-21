const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connect } = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
dotenv.config();

// db connection
connectDB();

// rest object
const app = express();

//middleware00
app.use(express.json());
app.use(morgan('dev'));

//cors

app.get('/test', (req, res) => {
  res.send('Hello from the server!');
});

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

//routes
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/doctor', require('./routes/doctorRoutes'));

app.use(express.static(path.join('./client/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `server is running in ${process.env.Node_Mode} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
