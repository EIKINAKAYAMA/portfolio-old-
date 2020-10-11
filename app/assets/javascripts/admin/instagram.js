$(window).load(function () {
  $(document).on('click', '.InstagramAPI', function () {
    window.location.href = "https://api.instagram.com/oauth/authorize?client_id=" + gon.instagram_client_id + "&redirect_uri=" + "https://mylifefolio.com/" + "&scope=user_profile,user_media&response_type=code"
  })
  
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const url = "https://api.instagram.com/oauth/access_token"

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
        var formData = new FormData();
        console.log(res.data[0])
        const html = `<li><img src="${res.data[0].media_url}" width="100px" height="100px"></li>`
        $('#instagram-list').append(html);

        fetch(res.data[0].media_url)
          .then(response => response.blob())
          .then(blob => new File([blob], "Instagram" + res + ".jpeg", { type: "image/jpeg" }))
          .then(file => {
            formData.append("gallery_categories[name][]", "Instagram")
            formData.append("category_images[0][images][]", file)
          })
        
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
            location.reload();
          })
          .fail(function () {
            alert('予期ない操作により保存が失敗しました。お手数ですが管理者に問い合わせて頂けますと幸いです。');
          })
      }) 
      .fail(function () {
        console.log("NG")
      })
  })
  .fail(function (jqXHR, status) {
    console.log("NG")
  })
});