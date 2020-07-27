'use strinct';

$(function(){
  function Roop_opacity(){
    var baloon = $(".main_container");
    baloon.animate({opacity:'1'}, 3000);
    baloon.animate({opacity:'0.1'}, 3000, Roop_opacity);
  }
  Roop_opacity();
});

$(window).scroll(function(){
  footer_height = $('footer').height();
  if($(window).scrollTop() > footer_height){
    $('header').addClass('transform');   
  }
  else{
    $('header').removeClass('transform');   
  }
});