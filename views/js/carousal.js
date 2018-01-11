$(document).ready(function () {
  $("#myCarousel").carousel({interval:2000});

  $("#carouselPause_").click(function () {
      $("#myCarousel").carousel('pause');
      document.getElementById('carouselPlay_').style.display = "block";
      document.getElementById('carouselPause_').style.display = "none";
  });

  $("#carouselPlay_").click(function () {
      $("#myCarousel").carousel('cycle');
      document.getElementById('carouselPlay_').style.display = "none";
      document.getElementById('carouselPause_').style.display = "block";

  });

  document.getElementById('carouselPlay_').style.left = (150)-15-15+"px";
  document.getElementById('carouselPause_').style.left = (150)-15-15+"px";
});
