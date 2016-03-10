var randomFirstNameArray = ['Enrique','Hank','Biz','Brady','Reverie'];
var randomLastNameArray = ['Stinker','Trumpeter','Poofer', 'The Destroyer','Tooter'];

var randomName = function(){
  return randomFirstNameArray[randomNumber(0,randomFirstNameArray.length - 1)] + " " + randomLastNameArray[randomNumber(0,randomLastNameArray.length - 1)];
};

function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}

module.exports = randomName;
