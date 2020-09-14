
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
  }

  $('.button').click(function (e) {
    e.preventDefault();
    url = "gallery_categories"
    $(this).fadeOut(3000); //ボタンのフェードアウトを3秒間掛けて実施
    $('p').css('opacity', '1');//CSSでセットしたopacity変更を４秒間かけて実施
    playVid(); //設定したビデオを実施

    //上記と並行してフェードアウト４秒+２秒間の画面固定＝6秒後に画面遷移を実施
    setTimeout(function () {
      window.location = url;
    }, 6000);
    
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

