const express = require('express');
const mongoose = require('mongoose');

const app = express();

var dbUrl = process.env.MONGODB_URI;
if (!dbUrl) {
  dbUrl = 'mongodb://localhost/afmanagementAPI';
}
console.log(dbUrl);
mongoose.connect(dbUrl, {
  useNewUrlParser: true
});

const port = process.env.PORT || 3000;
const Configuration = require('./models/configurationModel');
const configurationRouter = require('./routes/configurationRouter')(Configuration);
const Application = require('./models/applicationModel');
const applicationRouter = require('./routes/applicationRouter')(Application);

require('./middleware/appMiddleware')(app);

app.use('/api', configurationRouter);
app.use('/api', applicationRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
