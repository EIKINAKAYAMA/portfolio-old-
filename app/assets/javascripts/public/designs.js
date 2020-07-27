'use strinct';

$(function(){
  var num = -1;
  function slideshow_timer(design){
    var designs_last_src = design[design.length -1].image;
    var designs_src = $('#main').attr('src');
    if (designs_src == designs_last_src){
        num = 0;
      }
      else {
        num ++;
      }
    $('#main').attr('src', design[num].image)
    setTimeout(function(){
      slideshow_timer(design);
    },3000);
  }
  $(function(){
    $.getJSON('designs')
    .done(function(data){
      slideshow_timer(data);
    })
    .fail(function(){
      alert('error');
    })
  })
})