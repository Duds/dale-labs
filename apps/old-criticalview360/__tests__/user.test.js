const request = require('supertest');
const express = require('express');
const userRoutes = require('../server/routes/user');
const mongoose = require('mongoose');
const User = require('../server/models/user');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use('/api/user', userRoutes);

// Connect to a Test DB
beforeAll(async () => {
  const dbURI = 'mongodb://localhost:27017/testDB';
  await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Cleans up database between each test
afterEach(async () => {
  await User.deleteMany();
});

// Disconnect from the database
afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /register', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/user/register')
      .send({
        username: 'testuser',
        email: 'test@test.com',
        password: 'testpassword',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('User registered successfully.');
  });
});

describe('POST /login', () => {
  it('should login an existing user', async () => {
    const password = 'testpassword';
    const hashedPassword = await bcrypt.hash(password, 10);
    await new User({
      username: 'testuser',
      email: 'test@test.com',
      password: hashedPassword,
    }).save();

    const res = await request(app)
      .post('/api/user/login')
      .send({
        email: 'test@test.com',
        password: 'testpassword',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('User logged in successfully.');
  });
});
