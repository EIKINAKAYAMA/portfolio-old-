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

// $(function(){
//   var num = -1;
//   function slideshow_timer(design){
//     var designs_last_src = design[design.length -1].image;
//     var designs_src = $('#main').attr('src');
//     if (designs_src == designs_last_src){
//         num = 0;
//       }
//       else {
//         num ++;
//       }
//     $('#main').attr('src', design[num].image)
//     setTimeout(function(){
//       slideshow_timer(design);
//     },3000);
//   }
//   $(function(){
//     $.getJSON('designs')
//     .done(function(designs){
//       slideshow_timer(data);
//     })
//     .fail(function(){
//       alert('error');
//     })
//   })
// })