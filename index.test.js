const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { calculateValue } = require('./index'); // Update the path accordingly
const { server } = require('./index');



describe('Check the existence and opertion of the server', () => {
  it('should return the expected response', async () => {
    const response = await request(server)
      .post('/test')
      .expect(200);
    expect(response.body).toBeDefined();
    expect(response.body).toBe("You're receiving a response!");
  });
})


// Mock data 
const mockData = {
  "model": "Civic",
  "year": 2014,
};

describe('calculateValue function and API endpoint', () => {
  it('#1 should return the given example of Civic 2014 equals 6614', async () => {
    const response = await request(server)
      .post('/calculateValue')
      .send({
        "model": "Civic",
        "year": 2014,
      })
      .expect(200);
      const expectedResult = ({
        "car_value": 6614
    })    
    expect(response.body).toEqual(expectedResult);
  });
  it('#2 should return a correct test case Toyota 2000 equals 11600', async () => {
    const response = await request(server)
      .post('/calculateValue')
      .send({
        "model": "Toyota",
        "year": 2000,
      })
      .expect(200);
      const expectedResult = ({
        "car_value": 11600
    })    
    expect(response.body).toEqual(expectedResult);
  });
  it('#3 should return the test case of model being numbers', async () => {
    const response = await request(server)
      .post('/calculateValue')
      .send({
        "model": "911",
        "year": 2000,
      })
      .expect(200);
      const expectedResult = ({
        "car_value": 2000
    })    
    expect(response.body).toEqual(expectedResult);
  });
  it('#4 it should return an error when using negative numbers', async () => {
    const response = await request(server)
      .post('/calculateValue')
      .send({
        "model": "Civic",
        "year": -900,
      })
      const expectedResult = ({
        "error": "there is an error"
    })    
    expect(response.body).toEqual(expectedResult);
  });
  it('#5 it should return an error when using the wrong data type', async () => {
    const response = await request(server)
      .post('/calculateValue')
      .send({
        "model": "Civic",
        "year": "Civic",
      })
      const expectedResult = ({
        "error": "there is an error"
    })    
    expect(response.body).toEqual(expectedResult);
  });
});

