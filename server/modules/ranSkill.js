var skills = ['Clientside Logic','Front End', 'Serverside Logic'];

var randomSkills = function(){
  return skills[randomNumber(0, skills.length - 1)];
};

function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}

module.exports = randomSkills;
