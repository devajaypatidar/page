


$("#darkBtn").click(function () {

    const Url = "/dark/post";
    let name = document.getElementById("name").innerHTML;
    let skill = document.getElementById("skill").innerHTML;
    let age = document.getElementById("age").innerHTML;
    let course = document.getElementById("course").innerHTML;
    let work = document.getElementById("work").innerHTML;
    let educationYear = document.getElementsByClassName("year");
    let education = document.getElementsByClassName("ed");
    let educationDesc = document.getElementsByClassName("edDesc");
    let email = document.getElementById("email").innerHTML;
    let phone = document.getElementById("phone").innerHTML;
    let address = document.getElementById("address").innerHTML;
    let language = document.getElementById("language").innerHTML;
    let exp = document.getElementById("exp").innerHTML;
    let projectCompleted = document.getElementById("projectNumber").innerHTML;

    let projectname = document.getElementsByClassName("projectname");
    let projectDesc = document.getElementsByClassName("projectDesc");
    let projectCount = Object.keys(projectname).length;
    let projectArray = [];
    let projectDescArray = [];


    let educationCount = Object.keys(education).length;
    let educationArray = [];
    let educationDescArray = [];
    let educationYearArray = [];
    for (var i = 0; i < educationCount; i++) {
        educationArray[i] = education[i].innerHTML;
        educationDescArray[i] = educationDesc[i].innerHTML;
        educationYearArray[i] = educationYear[i].innerHTML;
    }

    for (var i = 0; i < projectCount; i++) {
        projectArray[i] = projectname[i].innerHTML;
        projectDescArray[i] = projectDesc[i].innerHTML;
    }


    const data = {

        name: name,
        skill: skill,
        age: age,
        course: course,
        work: work,
        email: email,
        phone: phone,
        address: address,
        language: language,
        exp: exp,
        projectCompleted: projectCompleted,
        project: projectArray,
        projectDesc: projectDescArray,
        education: educationArray,
        educationDesc: educationDescArray,
        educationYear: educationYearArray,


    };

    console.log(data);


    $.post(Url, data, function (data, status) {
        console.log("Post is done ");
    });


});



$('#addEducation').click(function () {

    var elem = document.querySelector('.addEducationBox');
  
    // Create a copy of it
    var clone = elem.cloneNode(true);
    // Inject it into the DOM
    elem.after(clone);
   
  });



  $('#deleteEducation').click(function (e) {
    var element = document.querySelector('.addEducationBox');
    element.remove();
  })
  


  $('#addProject').click(function () {

    var elem = document.querySelector('.addProject');
  
    // Create a copy of it
    var clone = elem.cloneNode(true);
    // Inject it into the DOM
    elem.after(clone);
   
  });



  $('#deleteProject').click(function (e) {
    var element = document.querySelector('.addProject');
    element.remove();
  })
  