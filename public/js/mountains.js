

$("#myBtn").click(function () {
  
  let name = document.getElementById("Name").innerHTML;
  let des = document.getElementById("des").innerHTML;
  let projects = document.getElementsByClassName("project");
  let intro = document.getElementsByClassName("intro").innerHTML;
  let skill = document.getElementsByClassName("skill");
  let skillDesc = document.getElementsByClassName("skillDesc");
  let projectDesc = document.getElementsByClassName("projectDesc");
  let contact = document.getElementById("ContactMsg").innerHTML;
  const Url = "/mountain/post";

  let projectCount = Object.keys(projects).length;
  let projectArray = [];
  for(var i = 0; i < projectCount; i++)
  {
    projectArray[i] = projects[i].innerHTML;
  }


  let projectDesCount = Object.keys(projectDesc).length;
  let projectDesArray = [];
  for(var i = 0; i < projectDesCount; i++)
  {
    projectDesArray[i]= projectDesc[i].innerHTML;
  }

  let skilCount = Object.keys(skill).length;
  let skillArray = [];
  for(var i = 0; i < skilCount; i++)
  {
    skillArray[i]= skill[i].innerHTML;
  }

  let skillDescCount = Object.keys(skillDesc).length;
  let skillDesArray = [];
  for(var i = 0; i < skillDescCount; i++)
  {
    skillDesArray[i] = skillDesc[i].innerHTML;
  }

  const data = {
    name: name,
    des: des,
    intro: intro,
    skill: skillArray,
    skilldesc: skillDesArray,
    contact:contact,
    projectCount: projectCount,
    project:projectArray,
    projectDesc: projectDesArray,
    projectDesCount: projectDesCount,
  };

  $.post(Url, data, function (data, status) {
    console.log("Post is done ");
  });

});


$('#addSkill').click(function () {

var elem = document.querySelector('.skillBtn');

// Create a copy of it
var clone = elem.cloneNode(true);
// Inject it into the DOM
elem.after(clone);
});

$('#deleteSkill').click(function(e) {
  var element = document.querySelector('.skillBtn');
  element.remove();
})

$('#addProject').click(function(e) {

  var elem = document.querySelector('.projectBtn');

  var clone = elem.cloneNode(true);
  elem.after(clone);

})

$('#deleteProject').click(function(e){
  var element = document.querySelector('.projectBtn');
  element.remove();
});