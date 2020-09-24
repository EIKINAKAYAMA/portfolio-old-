$(window).load(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const url = "https://api.instagram.com/oauth/access_token"

  $.ajax({
    url: url,
    type: "POST",
    dataType: 'json',
    data: {
      client_id: "1055133514921533",
      client_secret: "ab50aad83d0786954edc2d198ec40ccb",
      grant_type: "authorization_code",
      redirect_uri: "https://mylifefolio.com/",
      code: code
    }
  })
  .done(function(data) {
    console.log(data.access_token)
    console.log(data.user_id)
    var field = "caption,media_url,permalink"
    var userUrl = "https://graph.instagram.com/" + data.uer_id +"?fields="+ field+"&access_token=" + data.access_token
    $.ajax({
      type: 'GET',
      url: userUrl
    })
      .done(function (res) {
        console.log(res.data[0])
        const html = `<li><img src="${res.data[0].media_url}" width="100px" height="100px"></li>`
        $('#instagram-list').append(html);
      }) 
      .fail(function () {
        console.log("NG")
      })
  })
  .fail(function (jqXHR, status) {
    console.log("NG")
  })
});




// $(window).load(function () {
//   //facebook-jsonを取得して表示
//   var count = 0;
//   var limit = 10; //表示件数
//   var text = '';
//   var data;
//   var graph_api = 'https://graph.facebook.com/v8.0/';
//   var accessToken = 'EAAIsZCwOjpYEBAKNGG81OqRksB8jLnDAcvnNGSaIq3VEm8pZBqqpBSrsfIspM6rmFgj6LaL7mkZCoyw29Kd86KgWx4C2WJjAFLZAVT78Xb74FYU6XCWZBwIL4wp30IKGpm8dDaGg1xFFZBrxiOQRSrZAaX9x2yatdXAVYVtqk7qlAZDZD'; // アクセストークン
//   var businessID = '17841402010159822'; //グラフAPIエクスプローラで取得したinstagram_business_accountのID
//   var fields = 'media{caption,media_url,permalink,timestamp,username}';
//   var url = graph_api + businessID + '?fields=' + fields + "&access_token=" + accessToken;
//   $.ajax({
//     url: url
//   })
//     .done(function (res) {
//       data = res.media;
//       limit = 9;
//       count = 0;
//       $.each(data, function (index, val) {
//         $.each(val, function (i, elem) {
//           if (elem.media_url && count < limit) {
//             text1 = '<li><a href="' + elem.permalink + '" target="_blank">';
//             text2 = '<img src="' + elem.media_url + '">';
//             text3 = '</a></li>';
//             count++;
//             text = text + text1 + text2 + text3;
//           }
//         });
//       });
//       $('#instagram-list').html(text);
//     })
//     .fail(function (jqXHR, status) {
//       $('#instagram-list').html('<li>読み込みに失敗しました。</li>');
//     })
// });