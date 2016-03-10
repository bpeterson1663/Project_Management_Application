var randomCompany = ["Sub Prime Academy", "The Turdery", "Code Farty 2", "Target On Your Back", "Rocket Fitty Cent"];
var staff = {};
var maxFrontEndPoints = 60;
var maxClientPoints = 60;
var maxServerPoints = 60;
var clientLogicFilled = false;
var frontEndFilled = false;
var serverLogicFilled = false;
var positionFilled = 0;

$(document).ready(function(){
  $('body').prepend('<button class="generate">Generate Project</button>');


  $('body').on('click', '.generate' , createProject);

  $('.container').on('click', '.assignStaff', assignStaff);
});

function createProject(){
    $('.container').empty();
    //var company = randomCompanyGenerator();
    //var frontEndPoints = randomFrontEndPoints();
    //var clientPoints = randomClientPoints();
    //var serverPoints = randomServerPoints();
    $('.container').append('<div class="projectContainer"></div>');
    $('.projectContainer').append('<ul><li>'+randomCompanyGenerator()+'</li><li>'+randomFrontEndPoints()+'</li><li>'+randomClientPoints()+'</li><li>'+randomServerPoints()+'</li></ul>');
    $('ul').after('<button class="assignStaff">Assign Staff</button>');
}

function randomCompanyGenerator(){
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
  // var j = 0;
      while (positionFilled < 3){
        $.ajax({
          type: 'GET',
          url: '/staff',
          success: function(data){
            staff.name = data.name;
            staff.skill = data.skill;
            staff.sprint = data.sprint;
          }
        });
        matchSkills(staff);
        // j++;
      }
}

function matchSkills(staff){
  // for(var i = 0; i < 10 ; i++){
    if (staff.skill == 'Clientside Logic' && clientLogicFilled == false){
        $('.projectContainer').after('<div class="clientside-container"></div>');
        $('.clientside-container').append('<h2>' + staff.name + '</h2>');
        $('.clientside-container').append('<p>Skill: ' + staff.skill + '</p>');
        $('.clientside-container').append('<p>Average Sprints: ' + staff.sprint + '</p>');
        clientLogicFilled = true;
        console.log(staff.skill , "filled!");
        positionFilled++;
    }
    if (staff.skill == 'Front End' && frontEndFilled == false){
        $('.projectContainer').after('<div class="frontend-container"></div>');
        $('.frontend-container').append('<h2>' + staff.name + '</h2>');
        $('.frontend-container').append('<p>Skill: ' + staff.skill + '</p>');
        $('.frontend-container').append('<p>Average Sprints: ' + staff.sprint + '</p>');
        // $('.frontend-container').append('<p>''</p>');
        frontEndFilled = true;
        console.log(staff.skill , "filled!");
        positionFilled++;
      }
    if (staff.skill == 'Serverside Logic' && serverLogicFilled == false){
          $('.projectContainer').after('<div class="serverside-container"></div>');
          $('.serverside-container').append('<h2>' + staff.name + '</h2>');
          $('.serverside-container').append('<p>Skill: ' + staff.skill + '</p>');
          $('.serverside-container').append('<p>Average Sprints: ' + staff.sprint + '</p>');
          serverLogicFilled = true;
          console.log(staff.skill , "filled!");
          positionFilled++;
        }
    staff = {};
    // $.ajax({
    //   type: 'GET',
    //   url: '/staff',
    //   success: function(data){
    //     staff.name = data.name;
    //     staff.skill = data.skill;
    //     staff.sprint = data.sprint;
    //   }
    // });

    // console.log("i = " + i);
  // }
}
