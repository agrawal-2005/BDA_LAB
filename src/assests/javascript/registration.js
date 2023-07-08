// Toggle the form content when the button is clicked
var coll = document.getElementsByClassName("collapsible");
for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

function confirmConference(){
  var popup=document.getElementById("popup");
  var conference=document.getElementById("conference");
  var date=document.getElementById("date");
  var platform=document.getElementById("platform-name");
  document.getElementById("val-0").innerHTML="Conference";
  document.getElementById("val-1").innerHTML="Conference: "+conference.value;
  document.getElementById("val-2").innerHTML="Date: "+date.value;
  document.getElementById("val-3").innerHTML="Platform: "+platform.value;
  var blurBack=document.getElementById("toBlur");
    blurBack.classList.toggle("blur")
    popup.style.display="block";

  popup.style.display="block";
}


function confirmProject(){
  var popup=document.getElementById("popup");
  var project_topic=document.getElementById("project-topic");
  var project_lead=document.getElementById("project-lead");
  var project_faculty=document.getElementById("project-faculty");
  var project_domain=document.getElementById("project-domain");
  
  document.getElementById("val-0").innerHTML="Project";
  document.getElementById("val-1").innerHTML="Project Topic: "+project_topic.value;
  document.getElementById("val-2").innerHTML="Project Lead: "+project_lead.value;
  document.getElementById("val-3").innerHTML="Project Faculty: "+project_faculty.value;
  document.getElementById("val-4").innerHTML="Project Domain: "+project_domain.value;

  var blurBack=document.getElementById("toBlur");
  blurBack.classList.toggle("blur")
  popup.style.display="block";
  

  popup.style.display="block";

}
function confirmCoauthor(){
  var popup=document.getElementById("popup");
  var coauthor_name=document.getElementById("coauthor-name");
  var coauthor_email=document.getElementById("coauthor-email");
  var project_id=document.getElementById("project-id");
  document.getElementById("val-0").innerHTML="Coauthor";
  document.getElementById("val-1").innerHTML="Coauthor name: "+coauthor_name.value;
  document.getElementById("val-2").innerHTML="Coauthor email: "+coauthor_email.value;
  document.getElementById("val-3").innerHTML="Project ID: "+project_id.value;

  var blurBack=document.getElementById("toBlur");
    blurBack.classList.toggle("blur")
    popup.style.display="block";


popup.style.display="block";

}

function closeForm(){
  var popup=document.getElementById("popup");

  var blurBack=document.getElementById("toBlur");
    blurBack.classList.toggle("blur")
    popup.style.display="block";
  popup.style.display="none";
}
function submitForm(){
  var val=document.getElementById("val-0").innerHTML;
  if(val==="Conference"){
    console.log("true")
    document.getElementById("conference-form").submit();
  }
  if (val==="Project"){
    document.getElementById("project-form").submit();
    console.log("true")
  }
  if (val==="Coauthor"){
    document.getElementById("instructor-form").submit();
    console.log("true")
  }
  if (val==="PHD"){
    document.getElementById("PHD-form").submit();
  }
  if (val==="Mtech"){
    document.getElementById("Mtech-form").submit();
  }
  if (val==="Btech"){
    document.getElementById("Btech-form").submit();
  }
}