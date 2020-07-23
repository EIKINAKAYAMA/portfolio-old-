$(document).ready(function(){
  function Roop_opacity(){
    var baloon = $(".main_container");
    baloon.animate({opacity:'1'}, 5000);
    baloon.animate({opacity:'0.5'}, 5000, Roop_opacity);
  }
  Roop_opacity();
});