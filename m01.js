function calculateRisk(input) {
  const triggerWords = ['collide', 'crash', 'scratch', 'bump', 'smash']; // Add your trigger words here
  let count = 0;
  // Split the user input into words
  const words = input.split(' ');
  //For loop to check word list against the triggers
  for (const word of words) {
      if (triggerWords.includes(word.toLowerCase())) {
          count++;
      }
  }
  return count;
}


const inputText = "hello crash I am here crash crash crash";
const riskRating = calculateRisk(inputText);
console.log(`Risk Rating: ${riskRating}`);