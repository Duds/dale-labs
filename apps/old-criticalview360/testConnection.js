const mongoose = require('mongoose');

mongoose.connect('mongodb://Admin:P9g3xv1991!@localhost/CriticalView360', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(error => console.error('Connection error', error));
