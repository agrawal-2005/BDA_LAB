function checkPassword(){
    var password=document.getElementById("password").value
    var confirm=document.getElementById("confirm").value
    if (password!=confirm){
        alert("Password do not match")
    }
}