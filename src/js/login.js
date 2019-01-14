
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