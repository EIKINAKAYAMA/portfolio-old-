$(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const url = "https://api.instagram.com/oauth/access_token"
  const images_array = []

  //popup.jsで定義した関数の読み込み
  var buildpopupInstagram = window.hogeLib.buildpopupInstagram();

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

        const html = `<li>
                    <div class="image_box">
                      <img class="thumbnail" src="${res.data[0].media_url}" width="200px" height="200px">
                      <input class="disabled_checkbox" type="checkbox" checked />
                    <div>
                  </li>`

        $('.image_list').append(html); 
        
        fetch(res.data[0].media_url)
        .then(response => response.blob())
        .then(blob => new File([blob], "Instagram" + res.data[0].media_url + ".jpeg", { type: "image/jpeg" }))
        .then(file => {
          images_array[0] = file
        })

      })
      .fail(function () {
        console.log("NG")
      })
  .fail(function (jqXHR, status) {
      console.log("NG")
  })
    
    // もしURLにコードがある場合は、連携後のリダイレクト、ポップアップを表示する
    window.onload = function () {
      if (code != '') {
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
    
          $(".popup-content").remove();
          popup.classList.remove('is-show');
          $('.instagram-popup-inner').append(buildpopupInstagram)
    
          formData.append("gallery_categories[name][]", "Instagram")
          formData.append("category_images[0][images][]", images_array[0])
          console.log(images_array[0])
    
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
            })
            .fail(function () {
              alert('予期ない操作により保存が失敗しました。お手数ですが管理者に問い合わせて頂けますと幸いです。');
            })
        })
      }
    };

  
  })

  // //Instagram連携
  // $(document).on('click', '.InstagramAPI', function () {

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