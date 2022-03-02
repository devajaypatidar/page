


$("#myBtn").click(function(){

    
let name = document.getElementById("name").innerHTML;
let skill = document.getElementById("skill").innerHTML;
let age = document.getElementById("age").innerHTML;
let course = document.getElementById("course").innerHTML;
let work = document.getElementById("work").innerHTML;
let educationYear = document.getElementsByClassName("eduacationyear");
let education = document.getElementbyClassName("education");
let educationDesc = document.getElementById("educationDesc");
let email = document.getElementById("email").innerHTML;
let phone = document.getElementById("phone").innerHTML;
let address = document.getElementById("address").innerHTML;

let educationCount = Object.keys(education).length;
let educationArray = [];
let educationDescArray = [];
let educationYearArray = [];
for(var i = 0; i < educationCount; i++)
{
    educationArray[i] = education[i].innerHTML;
    educationDescArray[i] = educationDesc[i].innerHTML;
    educationYearArray[i] = educationYear[i].innerHTML;
}

})


