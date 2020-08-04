{ 
  //set background-image
  function setbackground(designs){
    $("main").css("background-image", `url(${designs[0].image})`)
  }
  
  $(function(){
    $.getJSON('profiles')
    .done(function(designs){
      setbackground(designs);
    })
    .fail(function(){
      alert('error');
    })
  })

  //edit ripples efferct
  $(document).ready(function() {
    $('main').ripples({ //波紋をつけたい要素の指定
    resolution: 700, //波紋の広がりの速度（値が大きいほど遅くなる。）
    dropRadius: 10, //波紋の大きさ（値が大きいほど大きくなる。）
    perturbance: 0.1 //波紋による屈折量（値が大きいほどブレる。）
    });
  });
}
