$(window).load(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  console.log(code)

  const client_id = '1055133514921533'
  const client_secret = ''
  const redirect_url = 'https://mylifefolio.com/'

  var url = "https://api.instagram.com/oauth/access_token \ -F client_id=" + client_id + "\ -F client_secret=" + client_secret + "\ -F grant_type=authorization_code \ -F redirect_uri=" + redirect_url + "\ -F code=" + code

  $.ajax({
    url: url,
    type: "POST"
  })
  .done(function(data) {
    console.log(data)
    // var fields = 'media{caption,media_url,permalink,timestamp,username}';
    // $.ajax({
    //   url: url,
    //   type: "POST",
    // })
    //   .done(function (res) {
    //     console.log("OK")
    //     $('#instagram-list').html(text);
    //   })
    //   .fail(function (jqXHR, status) {
    //     $('#instagram-list').html('<li>読み込みに失敗しました。</li>');
    //   })
  })
  .fail(function (jqXHR, status) {
    // console.log("NG")
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