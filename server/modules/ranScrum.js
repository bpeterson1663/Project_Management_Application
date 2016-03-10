var maxScrum = 9;

var randomScrum = function(){
  return randomNumber(1, maxScrum);
};

function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
};

module.exports = randomScrum;
