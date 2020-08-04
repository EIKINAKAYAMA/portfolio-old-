'use strinct';
{
  // setting animation of bgSwitcher

  function animation(designs) {
    // creating pictures array
    var array = [];
    for (let i = 0; i < designs.length; i++){
      array.push(designs[i].image);
    }

    //insert array tp bgSwithcer by desided format
    $('.bg-slider').bgSwitcher({
      // set background pictures
      images: [] = array,

      // interval of slide pictures 1000=1second
      interval: 3000,
      
      // loop or not loop true = loop false = not loop
      loop: true,

      // do shuffle or not true=do false=don't
      shuffle: true,

      // kind of effect {fade,blind,clip,slide,drop,hide}
      effect: "fade",

      // effect time
      duration: 2000, 

      // easing off effect {linear, swing}
      easing: "swing"
    });

  };

  //movie
  var vid = document.getElementById("myVideo");

  function playVid() {
    vid.play();
    vid.style.mixBlendMode = "difference";
    $('#filter').css("mix-blend-mode", "difference")
    $('#filter').css("opacity", "1")
    // $('.bg-slider').css("mix-blend-mode", "multiply")
  }

  $('.button').click(function () {
    $(this).fadeOut(4000);

    setTimeout(function () {
      playVid();
    }, 800);

    // setTimeout(function () {
    //   $('h1,.container_inner img,a').css('opacity','1');
    //   $('p').css('opacity','.6');
    // }, 1700);
  });

  $(function(){
    $.getJSON('designs')
    .done(function(designs){
      animation(designs);
    })
    .fail(function(){
      alert('error');
    })
  })

}

