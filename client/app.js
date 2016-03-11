var randomCompany = ["Prime Academy", "The Nerdery", "Code 42", "Target", "Rocket Fifty Five"];
var staff = {};
var maxFrontEndPoints = 60;
var maxClientPoints = 60;
var maxServerPoints = 60;

var clientLogicFilled = false;
var frontEndFilled = false;
var serverLogicFilled = false;

var positionFilled = 0;

var frontEndScrum = 0;
var clientsideScrum = 0;
var serverScrum = 0;

var sprintsArray = [];
var totalSprints = 0;


$(document).ready(function(){
  $('body').prepend('<button class="generate">Generate Project</button>');


  $('body').on('click', '.generate' , createProject);

  $('.projectContainer').on('click', 'button', assignStaff);
});

function createProject(){
  positionFilled = 0;
  clientLogicFilled = false;
  frontEndFilled = false;
  serverLogicFilled = false;
  frontEndScrum = randomFrontEndPoints();
  clientsideScrum = randomClientPoints();
  serverScrum = randomServerPoints()
  $('.projectContainer').empty();

  $('.projectContainer').append('<ul><h2>' + randomCompanyGenerator() + '</h2><li>Front-End Scrum Points: ' + frontEndScrum + '</li><li>Clientside Scrum Points: ' + clientsideScrum +'</li><li>Serverside Scrum Points: '+ serverScrum +'</li></ul>');
  $('.projectContainer').append('<button class="assignStaff">Assign Staff</button>');

}

var randomCompanyGenerator = function (){
    return randomCompany[randomNumber(0, randomCompany.length -1)];
}

function randomFrontEndPoints(){
  return randomNumber(10, maxFrontEndPoints);
}

function randomClientPoints(){
  return randomNumber(10, maxClientPoints);
}

function randomServerPoints(){
  return randomNumber(10, maxServerPoints);
}

function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}

function assignStaff(){
  $.ajax({
    type: 'GET',
    url: '/staff',
    success: function(data){
      staff.name = data.name;
      staff.skill = data.skill;
      staff.sprint = data.sprint;
      matchSkills(staff);
    }
  });
}

function matchSkills(staff){

    if (staff.skill == 'Clientside Logic' && clientLogicFilled == false){
        $('.projectContainer').append('<div class="clientside-container"></div>');
        $('.clientside-container').append('<h2>' + staff.name + '</h2>');
        $('.clientside-container').append('<p>Skill: ' + staff.skill + '</p>');
        $('.clientside-container').append('<p>Average Sprints: ' + staff.sprint + '</p>');
        $('.clientside-container').append('<p class="clientside-completion">Sprints till completion: ' + Math.ceil(clientsideScrum / staff.sprint) + '</p>');
        $('.clientside-completion').data('sprints', Math.ceil(clientsideScrum / staff.sprint));
        console.log($('.clientside-completion').data());

        sprintsArray.push($('.clientside-completion').data('sprints'));

        clientLogicFilled = true;
        console.log(staff.skill , "filled!");
        positionFilled++;
    }

    if (staff.skill == 'Front End' && frontEndFilled == false){
        $('.projectContainer').append('<div class="frontend-container"></div>');
        $('.frontend-container').append('<h2>' + staff.name + '</h2>');
        $('.frontend-container').append('<p>Skill: ' + staff.skill + '</p>');
        $('.frontend-container').append('<p>Average Sprints: ' + staff.sprint + '</p>');
        $('.frontend-container').append('<p class="frontend-completion">Sprints till completion: ' + Math.ceil(frontEndScrum / staff.sprint) + '</p>');
        $('.frontend-completion').data('sprints', Math.ceil(frontEndScrum / staff.sprint));
        sprintsArray.push($('.frontend-completion').data('sprints'));


        // $('.frontend-container').append('<p>''</p>');
        frontEndFilled = true;
        console.log(staff.skill , "filled!");
        positionFilled++;
      }
    if (staff.skill == 'Serverside Logic' && serverLogicFilled == false){
          $('.projectContainer').append('<div class="serverside-container"></div>');
          $('.serverside-container').append('<h2>' + staff.name + '</h2>');
          $('.serverside-container').append('<p>Skill: ' + staff.skill + '</p>');
          $('.serverside-container').append('<p>Average Sprints: ' + staff.sprint + '</p>');
          $('.serverside-container').append('<p class="serverside-completion">Sprints till completion: ' + Math.ceil(serverScrum / staff.sprint) + '</p>');
          $('.serverside-completion').data('sprints', Math.ceil(serverScrum / staff.sprint));
          sprintsArray.push($('.serverside-completion').data('sprints'));

          serverLogicFilled = true;
          console.log(staff.skill , "filled!");
          positionFilled++;
        }

      if(positionFilled < 3){
        staff = {};
        assignStaff();
      }

      if(positionFilled == 3){
        for (var i = 0; i < sprintsArray.length; i++) {
          totalSprints += sprintsArray[i];
        }
        $('.projectContainer').children('.assignStaff').after('<p>Weeks until completion: ' + Math.ceil((totalSprints / sprintsArray.length)) + '</p>');
        console.log(totalSprints);
        console.log(sprintsArray);
      }

}
