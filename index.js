//import express library and setup server
const express = require('express');
const bodyParser = require('body-parser');


const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


server.listen(8001, () => {
  console.log('Server started and listening on port 8001');
});

//Allow a test route and response to ensure connection and operation between testing and server
server.use('/test', (req, res) => {
  const testResponse = "You're receiving a response!";
  res.json(testResponse);
});



//Find the value of the car based on model and year for API1
function calculateValue(model, year) {
  //For loop to assign a value for each letter
    let total = 0;
    for (let i = 0; i < model.length; i++) {
      const charCode = model.charCodeAt(i);
      if (charCode >= 97 && charCode <= 122) {
        // Convert lowercase letters to 1-26
        total += charCode - 96;
      } else if (charCode >= 65 && charCode <= 90) {
        // Convert uppercase letters to 1-26
        total += charCode - 64;
      }
    }
    const carYear = year;
    //Multiple the carvalue by 100 and add the year
    return total * 100 + carYear;
};

//API1 to find value of car
server.post('/calculateValue', (req, res) => {
    const { model, year } = req.body;
    if (typeof model !== 'string' || typeof year !== 'number' || year < 0 ) {
      res.status(400).json({ error: "there is an error" });
    }
    try {
        const result = calculateValue(model, year);
        res.json({ car_value: result });
    } catch (error) {
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
  return count;
}

//API2 to convert claim history to risk rating
server.post('/calculateRisk', (req, res) => {
  const { claim_history } = req.body;
  try {
      const riskResult = calculateRisk(claim_history);
      res.json({ risk_rating: riskResult });
  } catch (error) {
      res.status(400).json({ error: "there is an error" });
  }
});





module.exports = { server, calculateValue, calculateRisk }; //Export server and functions for testing purposes
