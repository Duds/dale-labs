const mongoose = require('mongoose');

mongoose.connect('mongodb://Admin:P9g3xv1991!@localhost:27017/CriticalView360', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));
