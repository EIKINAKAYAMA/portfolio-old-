$(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const url = "https://api.instagram.com/oauth/access_token"
  const instagram_array = []
  
  //popup.jsで定義した関数の読み込み
  var buildpopupInstagram = window.hogeLib.buildpopupInstagram();
  
  // 連携したInstagram画像の表示
  const buildImg = (image, index, index2) => {
    const html = `<li>
                    <div class="image_box" data-index="${index}-${index2}">
                      <img class="thumbnail" src="${image}" width="200px" height="200px" data-index="${index}-${index2}">
                      <input class="disabled_checkbox" type="checkbox" checked />
                    </div>
                  </li>`
    return html
  }

  // 連携したInstagram動画の表示
  const buildVideo = (video, index, index2) => {
    const html = `<li>
                    <div class="image_box" data-index="${index}-${index2}">
                      <video class="thumbnail" src="${video}" width="200px" height="200px" data-index="${index}-${index2}" muted autoplay playinline loop></video>
                      <input class="disabled_checkbox" type="checkbox" checked />
                    </div>
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
    var field = "caption,media_type,media_url,permalink,thumnail_url,timestamp,username,children{media_type, media_url,thumbnail_url}"
    var userUrl = "https://graph.instagram.com/me/media?fields="+ field+"&access_token=" + data.access_token
    $.ajax({
      type: 'GET',
      url: userUrl
    })
      .done(function (res) {
        console.log(res)
        res.data.forEach(function (instagram, index) {
          instagram_array[index] = []
          
          //madia_typeがIMAGEの場合
          if (instagram.media_type == "IMAGE") {
            var url = new URLSearchParams(instagram.media_url).get('oe');
            $('.image_list').append(buildImg(instagram.media_url, index, 0));
            fetch(instagram.media_url)
              .then(response => response.blob())
              .then(blob => new File([blob], "Instagram" + url + ".jpeg", { type: "image/jpeg" }))
              .then(file => {
                instagram_array[index][0] = file
              })

            //media_typeがVIDEOの場合
          } else if (instagram.media_type == "VIDEO") {

            var url = new URLSearchParams(instagram.media_url).get('oe');
            $('.image_list').append(buildVideo(instagram.media_url, index, 0));
            fetch(instagram.media_url)
              .then(response => response.blob())
              .then(blob => new File([blob], "Instagram" + url + ".mov", { type: "video/mov" }))
              .then(file => {
                instagram_array[index][0] = file
              })
            //media_typeがCAROUSEL_ALUBUMの場合
          } else if (instagram.media_type == "CAROUSEL_ALBUM") {
            instagram.children.data.forEach(function (children, index2) {
              var url = new URLSearchParams(children.media_url).get('oe');
              if (children.media_type == "IMAGE") {
                $('.image_list').append(buildImg(children.media_url, index, index2));
                fetch(children.media_url)
                  .then(response => response.blob())
                  .then(blob => new File([blob], "Instagram" + url + ".jpeg", { type: "image/jpeg" }))
                  .then(file => {
                    instagram_array[index][index2] = file
                  })
              } else if (children.media_type == "VIDEO") {
                $('.image_list').append(buildVideo(children.media_url, index, index2));
                fetch(children.media_url)
                  .then(response => response.blob())
                  .then(blob => new File([blob], "Instagram" + url + ".mov", { type: "video/mov" }))
                  .then(file => {
                    instagram_array[index][index2] = file
                  })
                  
              } else {
                alert("想定外のデータが検出されました。管理者にお問い合わせください。")
              }
            })
            //想定外のmedia_typeの場合(InstagramのAPIの仕様が変わった場合等)
          } else {
            alert("想定外のデータが検出されました。管理者にお問い合わせください。")
          }
            
        })

        console.log(instagram_array)
        // ポップアップの発生
        var popup = document.getElementById('instagram-popup');
        if (!popup) return;
        popup.classList.add('is-show');

        // 画像がクリックされた時の処理です。
        $('.thumbnail').on('click', function () {
          if (!$(this).is('.checked')) {
            $(this).addClass('checked');
          } else {
            $(this).removeClass('checked')
          }
        })

        // 対象ユーザーのギャラリーページに保存する
        $('#instagram-save').on('click', function () {
          var GalleryFormData = new FormData();
          var MovieFormData = new FormData();
          var ImgCount = 0;
          var VideoCount = 0;

          GalleryFormData.append("gallery_categories[name][]", "Instagram")
          MovieFormData.append("movie_categories[name][]", "Instagram")

          for (var i = 0; i < instagram_array.length; i++) {
            for (var j = 0; j < instagram_array[i].length; j++){
              //画像が検索された場合
              if ($(`.image_box[data-index="${i}-${j}"]`).has("img")) {
                //もしチェックされていればformDataに追加
                if ($(`img[data-index="${i}-${j}"]`).hasClass("checked")) {
                  GalleryFormData.append("category_images[0][images][]", instagram_array[i][j])
                  console.log(instagram_array[i][j])
                  ImgCount++;
                }
              // 動画が検索された場合
              } else if ($(`.image_box[data-index="${i}-${j}"]`).has("video")) {
                console.log(instagram_array[i][j])
                if ($(`video[data-index="${i}-${j}"]`).hasClass("checked")) {
                  MovieFormData.append("category_movies[0][videos][]", instagram_array[i][j])
                  console.log(instagram_array[i][j])
                  VideoCount++;
                }
              } else {
                console.log("対象なし")
              }
                
            }
          }
          
          if (ImgCount == 0 && VideoCount == 0) {
            alert("保存する画像,または動画を選択して下さい");
            return false;
          // 画像のみの場合
          } else if(VideoCount == 0){
            $.ajax({
              url: "/admin/users/" + gon.user_id_digest + "/gallery_categories",
              type: "POST",
              data: GalleryFormData,
              dataType: 'json',
              contentType: false,
              processData: false
            })
              .done(function () {
                alert('選択された画像の保存に成功しました！');
                $(".popup-content").remove();
                popup.classList.remove('is-show');
                $('.instagram-popup-inner').append(buildpopupInstagram)
                // window.location = gon.new_admin_user_gallery_category_path
              })
              .fail(function () {
                alert('予期ない操作により保存が失敗しました。お手数ですが管理者に問い合わせて頂けますと幸いです。');
              })
          //動画のみの場合
          } else if (ImgCount == 0) {
            $.ajax({
              url: "/admin/users/" + gon.user_id_digest + "/movie_categories",
              type: "POST",
              data: MovieFormData,
              dataType: 'json',
              contentType: false,
              processData: false
            })
              .done(function () {
                alert('選択された動画の保存に成功しました！');
                $(".popup-content").remove();
                popup.classList.remove('is-show');
                $('.instagram-popup-inner').append(buildpopupInstagram)
                // window.location = gon.new_admin_user_movie_category_path
              })
              .fail(function () {
                alert('予期ない操作により保存が失敗しました。お手数ですが管理者に問い合わせて頂けますと幸いです。');
              })
          //動画かつ画像の場合
          } else {
            $.ajax({
              url: "/admin/users/" + gon.user_id_digest + "/gallery_categories",
              type: "POST",
              data: GalleryFormData,
              dataType: 'json',
              contentType: false,
              processData: false
            })
              .done(function () {
                $.ajax({
                  url: "/admin/users/" + gon.user_id_digest + "/movie_categories",
                  type: "POST",
                  data: MovieFormData,
                  dataType: 'json',
                  contentType: false,
                  processData: false
                })
                  .done(function () {
                    alert('選択された画像、動画の保存に成功しました！');
                    $(".popup-content").remove();
                    popup.classList.remove('is-show');
                    $('.instagram-popup-inner').append(buildpopupInstagram)
                    // window.location = gon.new_admin_user_gallery_category_path
                  })
                  .fail(function () {
                    alert('予期ない操作により保存が失敗しました。お手数ですが管理者に問い合わせて頂けますと幸いです。');
                  })
                
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
});