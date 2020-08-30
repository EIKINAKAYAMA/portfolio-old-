'use strinct';
{
  const mainimage = document.getElementById('main');
  var currentCategoryIndex = 0;
  var currentImageIndex = 0;
  const gallery_categories = []

  // ajax通信時のカテゴリーリストの作成
  const buildCategory = (category, CategoryIndex) => {
    const html = `<li class="category_name" data-index="${CategoryIndex}">${category.name}</li>`;
    return html;
  }

  //表示選択対象となるデータ（カテゴリーの一種）に対してHTMLを作成
  function animation(data) {
    var currentImageIndex = 0;
    mainimage.src = data.category_images[currentImageIndex].image.url;

    // thumbanilsの画像を配置
    let category_images = data.category_images
    category_images.forEach((image, index) => {
      const img = document.createElement('img');
      img.src = image.image.url;
      const li = document.createElement('li');
      if (index == currentImageIndex) {
        li.setAttribute('id', 'current');
      }
      li.appendChild(img);
      document.querySelector('#thumbnails').appendChild(li);
    })
  }
  
  // thumbnails内の画像をダイレクトにクリックした時の挙動
  $('#thumbnails').on('click', 'li', function () {
    var thumbnails = document.querySelectorAll('#thumbnails > li')
    var targetIndex = $('#thumbnails li').index(this);
    thumbnails[currentImageIndex].removeAttribute("id");
    currentImageIndex = targetIndex;
    thumbnails[currentImageIndex].setAttribute('id', 'current');
    mainimage.src = thumbnails[currentImageIndex].firstChild.getAttribute("src");
  });

  //手動の進むを押した時の挙動
  function operation_next() {
    var thumbnails = document.querySelectorAll('#thumbnails > li')
    var currentthumbnail = document.getElementById("current");
    currentImageIndex = [].slice.call(thumbnails).indexOf(currentthumbnail);
    var target = currentImageIndex + 1;
    if (target == gallery_categories[currentCategoryIndex].category_images.length) {
      target = 0;
    }
    // thumbnails内の次の画像をダイレクトにクリックした時の挙動として扱う
    document.querySelectorAll('#thumbnails > li')[target].click();
  }

  // nextを押された時に、スライドショーを止める動きと、手動の進むを押した時の挙動を実行
  const next = document.getElementById('next')
  next.onclick = function next() {
    operation_next();
    stopSlideshow();
  };

  //  スライドショー実行中の挙動として、手動の進むを押した時の挙動を実行
  const slidenext = document.getElementById('slidenext');
  slidenext.onclick = function sildenext(){
    operation_next();
  };

  //nextを押された時に、スライドショーを止める動きと、前に戻るの挙動を実行
  const prev = document.getElementById('prev');
  prev.onclick = function prev() {
    var thumbnails = document.querySelectorAll('#thumbnails > li')
    var currentthumbnail = document.getElementById("current");
    currentImageIndex = [].slice.call(thumbnails).indexOf(currentthumbnail);
    let target = currentImageIndex - 1;
    if (target < 0) {
      target = gallery_categories[currentCategoryIndex].category_images.length - 1;
    }
    document.querySelectorAll('#thumbnails > li')[target].click();
    stopSlideshow();
  };
  
  let timeoutId;
  let isPlaying = false;
  
  function ScrollWindow() {
    var thumbnails = document.getElementById("thumbnails");
    var currentthumbnail = document.getElementById("current");
    // currentImageIndex = [].slice.call(thumbnails).indexOf(currentthumbnail);
    // var AllScrollWidth = $("#thumbnails li")[0].scrollWidth + 5
    // if (currentImageIndex == 4) {
    //   thumbnails.scrollRight
    // } else {
    //   thumbnails.scrollLeft += AllScrollWidth
    // }
    var rect = currentthumbnail.getBoundingClientRect();
    var elemleft = rect.left + thumbnails.pageXOffset;
    thumbnails.scrollLeft = elemleft;
  }

  // スライドショーの実行処理
  function playSlideshow() {
    ScrollWindow()
    slidenext.click();
    timeoutId = setTimeout(() => {
      playSlideshow();
    }, 1000);
  };


  // スライドショーの停止処理
  function stopSlideshow() {
    if (isPlaying == true) {
      clearTimeout(timeoutId);
      play.textContent = 'Play';
      isPlaying = !isPlaying;
    } else {
      return;
    }
  }


  // スライドショーのボタンがクリックされた時の表示と処理の分岐
  const play = document.getElementById('play');
  play.onclick = function plya(){
    if (isPlaying == false) {
      playSlideshow();
      play.textContent = 'Pause';
      isPlaying = !isPlaying;
    } else {
      stopSlideshow();
    }
  };
  

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
    var li = document.getElementById('thumbnails')
    // もしスライドショー実行中なら処理を止める
    if (isPlaying == true) {
      play.click()
    }
    while (li.firstChild) {
      li.removeChild(li.firstChild);
    }
    currentCategoryIndex = targetIndex;
    animation(gallery_categories[targetIndex])
    });
  }
  
// $(function(){
//   $('.single-item').slick({
  //     accessibility: true,
  //     autoplay: true,
//     autoplaySpeed: 1000,
//     dots: true,
//     fade: true,
//   });
// });