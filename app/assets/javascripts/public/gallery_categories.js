'use strinct';
{ 
  const carouselModule = (() => {
    return {
      configure: () => {
        const mySwiper1 = new Swiper('.mainSwiper', {
          effect: 'coverflow',
          direction: 'horizontal', // スライダーの方向を指定（'horizontal' or 'vertical'）
          slidesPerView: 1, //同時に表示するスライド枚数
          loop: true,
          mousewheel: {
            invert: false,
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
          },
          //非同期通信・リロード時再読み込み
          observer: true,
          observeParents: true
        });
        
        const mySwiper2 = new Swiper('.thumbnail', {
          mousewheel: {
            invert: false,
          },
          freeMode: true, //手で自由に動かせる
          effect: 'coverflow', //coverflowデザイン
          slidesPerView: 5, //一つの画面で何枚表示するか
          centeredSlides: true,//選んだ画像が真ん中にくる
          // autoplay: {
          //   delay: 3000, //play速度
          //   stopOnLastSlide: false, //loopさせるかどうか
          //   disableOnInteraction: true, //途中で動かしたらplaystop
          //   reverseDirection: false
          // },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          slideToClickedSlide: true,
          controller: {
            control: mySwiper1,
            inverse: false,
            by: 'slide'
          },
          spaceBetween: 100,
          //非同期通信・リロード時再読み込み
          observer: true,
          observeParents: true
        });
        mySwiper1.controller.control = mySwiper2;
      }
    }
  })()

  carouselModule.configure()

  // ajax通信時のカテゴリーリストの作成
  const buildCategory = (category, CategoryIndex) => {
    const html = `<li class="category_name" data-index="${CategoryIndex}">${category.name}</li>`;
    return html;
  }

  function buildSwiper(){
    const html = `<div class="swiper-container mainSwiper">
                    <div class="swiper-wrapper">
                    </div>
                    <div class="swiper-pagination"></div>
                  </div>

                  <div class="swiper-container thumbnail">
                    <div class="swiper-wrapper">
                    </div>
                    <div class="swiper-button-prev"></div>
	                  <div class="swiper-button-next"></div>
                  </div>`
    return html;
  }
  
  const buildSwiperslide = (image) => {
    const html = `<div class="swiper-slide" style="background-image:url(${image})"></div>`;
    return html;
  }

  //表示選択対象となるデータ（カテゴリーの一種）に対してHTMLを作成
  function animation(data) {
    // thumbanilsの画像を配置
    let category_images = data.category_images
    category_images.forEach((img) => {
      const html = buildSwiperslide(img.image.url)
      $(".swiper-wrapper").append(html)
    })
  }

  var gallery_categories = []
  var currentCategoryIndex = 0

  // データのJSON取得
  $(function () {
    $.getJSON('gallery_categories')
      .done(function (datas) {
        animation(datas[currentCategoryIndex]);
        datas.forEach(function (data, CategoryIndex) {
          gallery_categories.push(data)
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
    $("#gallery").prepend(html);
    carouselModule.configure()
    animation(gallery_categories[targetIndex])
    });
  }
  