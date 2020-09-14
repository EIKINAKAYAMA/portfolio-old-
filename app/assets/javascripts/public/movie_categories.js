'use strinct';
{
  const carouselModule = (() => {
    return {
      configure: () => {
        const mySwiper1 = new Swiper('.mainSwiper', {
          direction: 'vertical', // スライダーの方向を指定（'horizontal' or 'vertical'）
          slidesPerView: 1, //同時に表示するスライド枚数
          mousewheel: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          on: {
            //スライダー遷移時（ドキュメント内の全動画を一時停止にする）
            transitionStart: function () {

              var videos = document.querySelectorAll('video');
              Array.prototype.forEach.call(videos, function (video) {
                video.pause();
              });
            },
            //スライダー遷移完了後（アクティブスライドの動画を再生する）
            transitionEnd: function () {
              var activeIndex = this.activeIndex;
              var activeSlide = document.getElementsByClassName('swiper-slide')[activeIndex];
              var activeSlideVideo = activeSlide.getElementsByTagName('video')[0];
              activeSlideVideo.play();
            },
          },
          // 非同期通信・リロード時再読み込み
          observer: true,
          observeParents: true
        });
      }
    }
  })()

  carouselModule.configure()

  // ajax通信時のカテゴリーリストの作成
  const buildCategory = (category, CategoryIndex) => {
    const html = `<li class="category_name" data-index="${CategoryIndex}">${category.name}</li>`;
    return html;
  }

  function buildSwiper() {
    const html = `<div class="swiper-container mainSwiper">
                    <div class="swiper-wrapper">
                    </div>
                    <div class="swiper-pagination"></div>
                  </div>`
    return html;
  }

  const buildSwiperslide = (video) => {
    const html = `<div class="swiper-slide">
                    <video src="${video}"></video>
                  </div>`;
    return html;
  }

  //表示選択対象となるデータ（カテゴリーの一種）に対してHTMLを作成
  function animation(data) {
    // thumbanilsの画像を配置
    let category_movies = data.category_movies
    category_movies.forEach((video) => {
      const html = buildSwiperslide(video.video.url)
      $(".swiper-wrapper").append(html)
    })
  }

  var movie_categories = []
  var currentCategoryIndex = 0

  // データのJSON取得
  $(function () {
    $.getJSON('movie_categories')
      .done(function (datas) {
        animation(datas[currentCategoryIndex]);
        datas.forEach(function (data, CategoryIndex) {
          movie_categories.push(data)
          $('#categories').append(buildCategory(data, CategoryIndex));
        })
      })
      .fail(function () {
        alert('error');
      })
  })


  $(document).on('click', '.category_name', function () {
    const targetIndex = $(this).data('index');
    const html = buildSwiper();
    currentCategoryIndex = targetIndex;
    $(".swiper-container").remove();
    $("#movie").prepend(html);
    carouselModule.configure()
    animation(movie_categories[targetIndex])
  });
}