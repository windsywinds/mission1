const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


//check for sever/port?


//API1 tests for TDD
const { calculateValue } = require('./index'); 

//API does exist?

//does accept a str and int

//does not accept an int and string
//does not accept an int and int
//does not accept a str and str
//does not accept a str and str



//Function does exist?





describe('API Tests', () => {
  // Test for API1: /calculateValue
  describe('POST /calculateValue', () => {
    test('should calculate car value correctly', async () => {
      const response = await request(app)
        .post('/calculateValue')
        .send({ model: 'TestModel', year: 2022 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('car_value');
      expect(typeof response.body.car_value).toBe('number');
    });

    test('should handle invalid model type', async () => {
      const response = await request(app)
        .post('/calculateValue')
        .send({ model: 123, year: 2022 });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'there is an error');
    });

    // Add more test cases as needed
  });

  // Test for API2: Add your tests for API2 here

  afterAll((done) => {
    // Close the server after all tests
    app.close(done);
  });
});
