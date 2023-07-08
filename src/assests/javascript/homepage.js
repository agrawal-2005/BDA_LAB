function openLogin(){
    var popup=document.getElementById("popup");
    var blurBack=document.getElementById("toBlur");
    blurBack.classList.toggle("blur")
    popup.classList.remove("scale-out-center")
    popup.classList.toggle("scale-in-center")
    
    popup.style.display="block";
    
  }

  function closeLogin(){
    var popup=document.getElementById("popup");
    var blurBack=document.getElementById("toBlur");
    blurBack.classList.toggle("blur")
    popup.classList.toggle("scale-in-center")
    popup.classList.toggle("scale-out-center")
    //popup.classList.toggle("scale-out-center")
    //popup.style.display="none";
  }

  function submitLogin(){
    document.getElementById("login-form").submit();
  }