//import express library and setup server
const express = require('express');
const bodyParser = require('body-parser');
const server = express();


server.use(bodyParser.json());

server.listen(8001, () => {
  console.log('Server started and listening on port 8001');
});

//Allow a test route and response to ensure connection and operation between testing and server
server.use('/test', (req, res) => { //.use to allow both post and get
  const testResponse = "You're receiving a response!";
  res.json(testResponse);
});



//Find the value of the car based on model and year for API1
function calculateValue(model, year) {
  //Convert model to lowercase
  const carModel = model.toLowerCase(); 
  //For loop to assign a value for each letter    
    let modelValue = 0;
    for (let i = 0; i < carModel.length; i++) {
      const charCode = carModel.charCodeAt(i);
      if (charCode >= 97 && charCode <= 122) {
        modelValue += charCode - 96;
      } 
    }
    //Multiply the alphanumeric total by 100 and add the year to find carValue
    return modelValue * 100 + year;
};

//API1 to find value of car
server.post('/calculateValue', (req, res) => {
    const {model, year} = req.body;
    if (typeof model !== 'string' || typeof year !== 'number' || year < 0 ) {
      res.status(400).json({ error: "there is an error" });
    }
    try {
        const carValue = calculateValue(model, year);
        res.json({ car_value: carValue });
    } 
    catch (error) {
        res.status(400).json({ error: "there is an error" });
    }
});

//Find the risk rating from the users input for API2
function calculateRisk(input) {
  //List an array of words to use as triggers
  const triggerWords = ['collide', 'crash', 'scratch', 'bump', 'smash'];
  let count = 0;
  // Split the user input into words
  const words = input.split(' ');
  //For loop to check word list against the triggers and add a count for each
  for (const word of words) {
      if (triggerWords.some(trigger => word.toLowerCase().includes(trigger.toLowerCase()))) {
          count++;
      }
  }
  //Check that the rating returned will be atleast 1, and no more than 5
  if (count <= 0 ) {
    count++ }
  if (count >= 6 ) {
      count = 5
  }  
    return count 

}

//API2 to convert claim history to risk rating
server.post('/calculateRisk', (req, res) => {
  const { claim_history } = req.body;
  if (typeof claim_history !== 'string' ) {
    res.status(400).json({ error: "there is an error" });
  }
  try {
      const riskResult = calculateRisk(claim_history);
      res.json({ risk_rating: riskResult });
  } 
  catch (error) {
      res.status(400).json({ error: "there is an error" });
  }
});

//Find the yearly and monthly premium for API3
function createQuote(value, risk) {
  const yearly = value * risk / 100;
  const monthly = yearly / 12;
  const result = ({
    "monthly_premium": monthly,
    "yearly_premium": yearly,
  })
  return result;
}

//API3 to convert car_value and risk_rating to quote
server.post('/createQuote', (req, res) => {
  const value = req.body.car_value;
  const risk = req.body.risk_rating;
  if (typeof value !== 'number' || typeof risk !== 'number') {
    res.status(400).json({ error: "there is an error" }); }
  try {
    const premium = createQuote(value, risk)
    res.json(premium)
  }
  catch (error) {
    res.status(400).json({ error: "there is an error" });
}
})



module.exports = { server, calculateValue, calculateRisk, createQuote }; //Export server and functions for testing purposes
