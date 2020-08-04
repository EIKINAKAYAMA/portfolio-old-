'use strinct';
{
  function amimation(designs) {

    // <desided first background image>
    let currentIndex = 0;
    const mainimage = document.getElementById('main');
    mainimage.src = designs[currentIndex].image;

    // <adapted thumbnails and create li under thumbanils>
    designs.forEach((design, index) => {
      const img = document.createElement('img');
      img.src = design.image;

      const li = document.createElement('li');
      if (index == currentIndex) {
        li.classList.add('current');
      }
      li.addEventListener('click', () => {
        mainimage.src = design.image;
        const thumbnails = document.querySelectorAll('.thumbnails > li');
        thumbnails[currentIndex].classList.remove('current');
        currentIndex = index;
        thumbnails[currentIndex].classList.add('current');
      });
      li.appendChild(img);
      document.querySelector('.thumbnails').appendChild(li);
    });

    // <adapted operational function for next>
    function operation_next() {
      let target = currentIndex + 1;
      if (target == designs.length) {
        target = 0;
      }
      document.querySelectorAll('.thumbnails > li')[target].click();
    }

    //For human push the next, if the slideshow is "movie", To stop slideshow. but if the slideshow is "stop", To go next slidesho
    const next = document.getElementById('next');
    next.addEventListener('click', () => {
      operation_next();
      stopSlideshow();
    });

    //For sistem push the next when the slideshow is moving, so this function doesn't need stopslideshow.
    const slidenext = document.getElementById('slidenext');
    slidenext.addEventListener('click', () => {
      operation_next();
    });

    // <adapted prev>
    const prev = document.getElementById('prev');
    prev.addEventListener('click', () => {
      let target = currentIndex - 1;
      if (target < 0) {
        target = designs.length - 1;
      }
      document.querySelectorAll('.thumbnails > li')[target].click();
      stopSlideshow();
    });

    let timeoutId;
    let isPlaying = false;

    // < play shildeshow>
    function playSlideshow() {
      slidenext.click();
      timeoutId = setTimeout(() => {
        playSlideshow();
      }, 1000);
    };


    // < stop shildeshow>
    function stopSlideshow() {
      if (isPlaying == true) {
        clearTimeout(timeoutId);
        play.textContent = 'Play';
        isPlaying = !isPlaying;
      } else {
        return;
      }
    }


    // <function of play button>
    const play = document.getElementById('play');
    play.addEventListener('click', () => {
      if (isPlaying == false) {
        playSlideshow();
        play.textContent = 'Pause';
        isPlaying = !isPlaying;
      } else {
        stopSlideshow();
      }
    });
  }

  $(function () {
    $.getJSON('designs')
      .done(function (designs) {
        amimation(designs);
      })
      .fail(function () {
        alert('error');
      })
  })
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