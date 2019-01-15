
  $("input").focus(function() {
    $(this).prev(".placeholder").addClass("active");

  })
  
  $(".send").focus(function() {
    $("input[type=submit]").addClass("active");

  })
  
  $("#submit").click(function() {
    $("#submit").addClass("active");
    $("#wrapper").addClass("active");
  })
  
  
  function check(form)
{
 
 if(form.userid.value == "admin@hotmail.se" && form.pswrd.value == "admin")
  {
    window.open('app.html')
  }
 else
 {
   alert("Your username or password is incorrect.")
  }
}