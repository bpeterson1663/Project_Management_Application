var randomCompany = ["Sub Prime Academy", "The Nerdery", "Code 42", "Target", "Rocket Fifty-Five", "Brave New Media", "Wells Fargo", "3M"];
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
  $('.container').prepend('<button class="generate btn-info">Generate Project</button>');
  $('.container').on('click', '.generate' , createProject);
  $('.projectContainer').on('click', 'button', assignStaff);
});

function createProject(){
  sprintsArray = [];
  positionFilled = 0;
  clientLogicFilled = false;
  frontEndFilled = false;
  serverLogicFilled = false;
  frontEndScrum = randomFrontEndPoints();
  clientsideScrum = randomClientPoints();
  serverScrum = randomServerPoints();
  $('.projectContainer').empty();
  //var company = randomCompanyGenerator();
  //var frontEndPoints = randomFrontEndPoints();
  //var clientPoints = randomClientPoints();
  //var serverPoints = randomServerPoints();
  //$('.container').append('<div class="projectContainer"></div>');
  $('.projectContainer').append('<h1>' + randomCompanyGenerator() + '</h1>');
  $('.projectContainer').append('<div class="project-points"></div>');
  $('.project-points').append('<div class="frontend-points"></div>');
  $('.project-points').append('<div class="clientside-points"></div>');
  $('.project-points').append('<div class="serverside-points"></div>');
  $('.frontend-points').append('<p>' + frontEndScrum + '</p>');
  $('.frontend-points').append('<p>Front-End Scrum Points</p>');
  $('.clientside-points').append('<p>' + clientsideScrum + '</p>');
  $('.clientside-points').append('<p>Clientside Scrum Points</p>');
  $('.serverside-points').append('<p>' + serverScrum + '</p>');
  $('.serverside-points').append('<p>Serverside Scrum Points</p>');
  $('.projectContainer').append('<button class=" btn-danger assignStaff">Assign Staff</button>');
  $('.projectContainer').append('<div class="employees"></div>');

  $('.generate').delay(2000).slideUp();
  $('.assignStaff').delay(1500).slideDown();

}

var randomCompanyGenerator = function (){
    return randomCompany[randomNumber(0, randomCompany.length -1)];
};

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

  $('.generate').delay(2000).slideDown();

  $('.assignStaff').delay(2000).slideUp();


  // for (var i = 0; i < sprintsArray.length; i++) {
  //   totalSprints += sprintsArray[i];
  // }

  //$('.projectContainer').append('<p>Weeks until completion: ' + (totalSprints / sprintsArray.length) + '</p>');

  // console.log(totalSprints);
  // console.log(sprintsArray);
}

function matchSkills(staff){




    if (staff.skill == 'Clientside Logic' && clientLogicFilled === false){
      $('.employees').append('<div class="clientside-container"></div>');
      $('.clientside-container').append('<h2>' + staff.name + '</h2>');
      $('.clientside-container').append('<ul class="clientside metrics"></ul>');
      $('.clientside-container ul').append('<li><span class="bold">Skill:</span> ' + staff.skill + '</li>');
      $('.clientside-container ul').append('<li><span class="bold">Average Sprints:</span> ' + staff.sprint + '</li>');
      $('.clientside-container ul').append('<li id="clientside-completion"><span class="bold">Sprints till completion:</span> ' + Math.ceil(clientsideScrum / staff.sprint) + '</li>');
      $('#clientside-completion').data('sprints', Math.ceil(clientsideScrum / staff.sprint));

      sprintsArray.push($('#clientside-completion').data('sprints'));

      clientLogicFilled = true;
      console.log(staff.skill , "filled!");
      positionFilled++;
    }
    if (staff.skill == 'Front End' && frontEndFilled === false){
      $('.employees').append('<div class="frontend-container"></div>');
      $('.frontend-container').append('<h2>' + staff.name + '</h2>');
      $('.frontend-container').append('<ul class="frontend metrics"></ul>');
      $('.frontend-container ul').append('<li><span class="bold">Skill:</span> ' + staff.skill + '</li>');
      $('.frontend-container ul').append('<li><span class="bold">Average Sprints:</span> ' + staff.sprint + '</li>');
      $('.frontend-container ul').append('<li id="frontend-completion"><span class="bold">Sprints till completion:</span> ' + Math.ceil(frontEndScrum / staff.sprint) + '</li>');
      $('#frontend-completion').data('sprints', Math.ceil(frontEndScrum / staff.sprint));

      sprintsArray.push($('#frontend-completion').data('sprints'));

      frontEndFilled = true;
      console.log(staff.skill , "filled!");
      positionFilled++;
    }
    if (staff.skill == 'Serverside Logic' && serverLogicFilled === false){
      $('.employees').append('<div class="serverside-container"></div>');
      $('.serverside-container').append('<h2>' + staff.name + '</h2>');
      $('.serverside-container').append('<ul class="serverside metrics"></ul>');
      $('.serverside-container ul').append('<li><span class="bold">Skill:</span> ' + staff.skill + '</li>');
      $('.serverside-container ul').append('<li><span class="bold">Average Sprints:</span> ' + staff.sprint + '</li>');
      $('.serverside-container ul').append('<li id="serverside-completion"><span class="bold">Sprints till completion:</span> ' + Math.ceil(serverScrum / staff.sprint) + '</li>');
      $('#serverside-completion').data('sprints', Math.ceil(serverScrum / staff.sprint));
      sprintsArray.push($('#serverside-completion').data('sprints'));

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
    $('.projectContainer').children('.assignStaff').after('<p class="sprints-to-completion">Sprints until completion: ' + Math.max.apply(null, sprintsArray) + '</p>');
  }

    // console.log("i = " + i);
  // }
}
