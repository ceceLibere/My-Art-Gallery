$(function(){
// Floating Contact Widget Trigger
$(".amg-floating-icon").on("mouseenter", function(){
    $(this).closest(".amg-floating-contact-wrap").addClass("hover")
  });
  $(".amg-floating-contact-wrap").on("mouseleave", function(){
    $(this).removeClass("hover");
  });

  $(".logo").click(function(){
    if ($(".nav-top").hasClass("open")) {
      $(".nav-top").removeClass("open");
    } else {
      $(".nav-top").addClass("open");
    }
  });
  
});