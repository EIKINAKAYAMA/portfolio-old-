$(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const url = "https://api.instagram.com/oauth/access_token"
  const images_array = []
  
  //popup.jsで定義した関数の読み込み
  var buildpopupInstagram = window.hogeLib.buildpopupInstagram();
  
  // 連携したInstagram画像の表示
  const buildImg = (image, index) => {
    const html = `<li>
                    <div class="image_box">
                      <img class="thumbnail" src="${image}" width="200px" height="200px" data-index="${index}">
                      <input class="disabled_checkbox" type="checkbox" checked />
                    <div>
                  </li>`
    return html
  }

  $(document).on('click', '.InstagramAPI', function () {
    window.location.href = "https://api.instagram.com/oauth/authorize?client_id=" + gon.instagram_client_id + "&redirect_uri=" + "https://mylifefolio.com/" + "&scope=user_profile,user_media&response_type=code"
  })

  $.ajax({
    url: url,
    type: "POST",
    dataType: 'json',
    data: {
      client_id: gon.instagram_client_id,
      client_secret: gon.instagram_client_secret,
      grant_type: "authorization_code",
      redirect_uri: "https://mylifefolio.com/",
      code: code
    }
  })
  .done(function(data) {
    var field = "caption,media_url,permalink,timestamp,username"
    var userUrl = "https://graph.instagram.com/me/media?fields="+ field+"&access_token=" + data.access_token
    $.ajax({
      type: 'GET',
      url: userUrl
    })
      .done(function (res) {
        res.data.forEach(function (image, index) { 
          if (image.media_url.match(/video/)) { 

          } else {
            $('.image_list').append(buildImg(image.media_url, index)); 
            fetch(image.media_url)
            .then(response => response.blob())
            .then(blob => new File([blob], "Instagram" + image.media_url + ".jpeg", { type: "image/jpeg" }))
            .then(file => {
              images_array[index] = file
            })
          }
        })

        // ポップアップの発生
        var popup = document.getElementById('instagram-popup');
        if (!popup) return;
        popup.classList.add('is-show');

        // 画像がクリックされた時の処理です。
        $('img.thumbnail').on('click', function () {
          if (!$(this).is('.checked')) {
            $(this).addClass('checked');
          } else {
            $(this).removeClass('checked')
          }
        })

        // 対象ユーザーのギャラリーページに保存する
        $('#instagram-save').on('click', function () {
          var formData = new FormData();
          var count = 0;

          console.log(images_array)

          for (var i = 0; i < images_array.length; i++) {
            if ($(`img[data-index="${i}"]`).hasClass("checked")) {
              formData.append("category_images[0][images][]", images_array[i])
              count++;
            }
          }
          
          if (count == 0) {
            alert("保存ずる画像を選択して下さい");
            return false;
          } else {
            formData.append("gallery_categories[name][]", "Instagram")

            $.ajax({
              url: "/admin/users/" + gon.user_id_digest + "/gallery_categories",
              type: "POST",
              data: formData,
              dataType: 'json',
              contentType: false,
              processData: false
            })
              .done(function () {
                alert('保存に成功しました！');
                $(".popup-content").remove();
                popup.classList.remove('is-show');
                $('.instagram-popup-inner').append(buildpopupInstagram)
              })
              .fail(function () {
                alert('予期ない操作により保存が失敗しました。お手数ですが管理者に問い合わせて頂けますと幸いです。');
              })
          }
            
        })       

      })
      .fail(function () {
        console.log("NG")
      })
      .fail(function (jqXHR, status) {
          console.log("NG")
      })  
  })

  // //Instagram連携(LOCAL用)
  // $(document).on('click', '.InstagramAPI', function () {
  //   // ポップアップの発生
  //     var popup = document.getElementById('instagram-popup');
  //     if (!popup) return;
  //     popup.classList.add('is-show');

  //   const html = `<li>
  //                   <div class="image_box">
  //                     <img class="thumbnail" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRAPapDXFzPv3sYGmw-6NjNsFmO3HjB_pmLGA&usqp=CAU" width="200px" height="200px">
  //                     <input class="disabled_checkbox" type="checkbox" checked />
  //                   <div>
  //                 </li>`

  //   $('.image_list').append(html); 
    
  //   // 画像がクリックされた時の処理です。
  //   $('img.thumbnail').on('click', function () {
  //     if (!$(this).is('.checked')) {
  //       $(this).addClass('checked');
  //     } else {
  //       $(this).removeClass('checked')
  //     }
  //   })
    
  //   //クリックされている画像を保存する
  //   $("#instagram-save").click(function () {
  //     $(".popup-content").remove();
  //     popup.classList.remove('is-show');
  //     $('.instagram-popup-inner').append(buildpopupInstagram)
  //   })
  // });
  
});