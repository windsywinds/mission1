const request = require('supertest');
const { calculateValue, calculateRisk, createQuote, server } = require('./index'); 



//Tests for server existence/operation
describe('Check the existence and operation of the server', () => {
  it('should return the expected response from the server if operational', async () => {
    const response = await request(server)
      .post('/test')
      .expect(200);
    expect(response.body).toBe("You're receiving a response!");
  });
  it('should return the expected response from the server if path not found', async () => {
    const response = await request(server)  
    .post('/incorrectpath')
      .expect(404);
      expect(response.status).toBe(404);
  });
})


//API 1 tests
describe('Check API1 and the calculateValue function against test cases', () => {
  it('calculateValue should exist and be a function', () => {
    expect(calculateValue).toBeDefined(); //Checks it is a defined value/type - is boolean
    expect(typeof calculateValue).toBe('function'); //Checked it is a function
  });
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
  it('#4 should return an error when using negative numbers', async () => {
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
  it('#5 should return an error when using the wrong data type', async () => {
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


//API2 tests
describe('Check API2 and the calculateRisk function against test cases', () => {
  it('calculateRisk should exist and be a function', () => {
    expect(calculateRisk).toBeDefined(); //Checks it is a defined value/type - is boolean
    expect(typeof calculateRisk).toBe('function'); //Checked it is a function
  });
  it('#1 should return the given example resulting in 3', async () => {
    const response = await request(server)
      .post('/calculateRisk')
      .send({ 
        "claim_history": "My only claim was a crash into my house's garage door that left a scratch on my car.  There are no other crashes." 
    })
      .expect(200);
      const expectedResult = ({
        "risk_rating": 3
    })    
    expect(response.body).toEqual(expectedResult);
  });
  it('#2 should identify all 5 trigger words', async () => {
    const response = await request(server)
      .post('/calculateRisk')
      .send({ 
        "claim_history": "collide crash scratch bump smash" 
    })
      .expect(200);
      const expectedResult = ({
        "risk_rating": 5
    })    
    expect(response.body).toEqual(expectedResult);
  });
  it('#3 should return a 1 when no triggers are met', async () => {
    const response = await request(server)
      .post('/calculateRisk')
      .send({ 
        "claim_history": "I have no history of fault" 
    })
      .expect(200);
      const expectedResult = ({
        "risk_rating": 1
    })    
    expect(response.body).toEqual(expectedResult);
  });
  it('#4 should return a 5 as the maximum rating', async () => {
    const response = await request(server)
      .post('/calculateRisk')
      .send({ 
        "claim_history": "bump crash bump crash bump crash bump crash" 
    })
      .expect(200);
      const expectedResult = ({
        "risk_rating": 5
    })    
    expect(response.body).toEqual(expectedResult);
  });  
  it('#5 should return a 5 as the maximum rating', async () => {
    const response = await request(server)
      .post('/calculateRisk')
      .send({ 
        "claim_history": "zzbuzzmpzz, zzcrzzshzz" 
    })
      .expect(200);
      const expectedResult = ({
        "risk_rating": 1
    })    
    expect(response.body).toEqual(expectedResult);
  });
  it('#6 should return an error if wrong data type', async () => {
    const response = await request(server)
      .post('/calculateRisk')
      .send({ 
        "claim_history": 5 
    })
      .expect(400);
      const expectedResult = ({ error: "there is an error" })    
    expect(response.body).toEqual(expectedResult);
  }); 
  it('#5 should identify conjugations of trigger words', async () => {
    const response = await request(server)
      .post('/calculateRisk')
      .send({ 
        "claim_history": "collides, crashes, scratches, bumps, smashes" 
    })
      .expect(200);
      const expectedResult = ({
        "risk_rating": 5
    })    
    expect(response.body).toEqual(expectedResult);
  });
});

