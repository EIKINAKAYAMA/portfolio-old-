$(function () {

  //popup.jsで定義した関数の読み込み
  var buildConfirmDaleteCategory = window.hogeLib.buildConfirmDaleteCategory();

  // 新規カテゴリーの作成
  const buildCategory = (categoryIndex, index) => {
    const html = `<div class="category" data-index="${categoryIndex}">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    <div class = "category__name" data-index="${categoryIndex}">
                      <p>Name of Category :</p>
                      <label> 
                        <input type="text" class="category__name__text">
                      </label>
                    </div>

                    <div class = "upload-container">
                      <div class = "movie-box" >
                        <div class="js-file_group">
                          <label data-index="${index}" class="movie-upload">
                            <input type="file" class="js-file" style="visibility: hidden" accept="video/*">
                            <p class="icon"><i class="fas fa-camera fa-3x"></i></p>
                            <p>click</p>
                          </label>
                        </div>
                      </div>
                    </div>

                  </div>`;
    return html;
  }

  // 画像用のinputを生成する関数
  const buildFileField = (index) => {
    const html = `<label data-index="${index}" class="movie-upload">
                    <input type="file" class="js-file" style="visibility: hidden" accept="video/*">
                    <p class="icon"><i class="fas fa-camera fa-3x"></i></p>
                    <p>click</p>
                  </label>`;
    return html;
  }

  const buildMovie = (index, url) => {
    const html = `<div class="video">
                    <div class="preview" data-index="${index}">
                      <video data-index="${index}" src="${url}" width="300px" height="200px" controls muted playsinline>
                    </div>
                    <div data-index="${index}" class = "preview__change">
                      <label data-index="${index}" class="preview__change__upload">変更
                        <input type="file" class="js-file" style="visibility: hidden" accept="video/*">
                      </label>
                      <div class="preview__change__edit">編集</div>
                      <div class="preview__change__delete">削除</div>
                    </div>
                  </div>`;
    return html;
  }

  // 動画を管理するための配列を定義する。
  const categories_array = [[]]

  //category追加アクション
  $("#category_plus").on('click', function () {
    const categoryIndex = $(".category").last().data('index');
    $('.category').last().after(buildCategory(categoryIndex + 1, 0));
    categories_array.push([])
    $('.main').animate({ scrollTop: $("#movie").height() }, 'slow')
  });

  //新規アップロード時の実行内容（files_arrayはajax取得とform選択で取り方が違う為、統一化しない）
  function new_upload(categoryIndex, targetIndex, blobUrl) {
    $(`.category[data-index="${categoryIndex}"]`).find('.movie-upload').remove();
    // $('.image-upload').remove();
    $(`.category[data-index="${categoryIndex}"]`).find('.js-file_group').append(buildMovie(targetIndex, blobUrl));
    // $('.js-file_group').append(buildImg(targetIndex, blobUrl));
    targetIndex++;
    $(`.category[data-index="${categoryIndex}"]`).find('.js-file_group').append(buildFileField(targetIndex));
    return targetIndex
  }

  //編集時のデータ取得
  $(function () {
    if (document.URL.match(/edit/)) {
      $.getJSON('edit')
        .done(function (datas) {
          var categoryIndex = 0
          datas.forEach(function (data) {
            $(`.category[data-index="${categoryIndex}"]`).find('.category__name__text').val(`${data.name}`)
            for (targetIndex = 0; targetIndex < data.category_movies.length; targetIndex++) {
              let blobUrl = data.category_movies[targetIndex].video.url
              categories_array[categoryIndex][targetIndex] = "exist"
              new_upload(categoryIndex, targetIndex, blobUrl)
            }
            categoryIndex++
            if (categoryIndex != datas.length) {
              $('.category').last().after(buildCategory(categoryIndex, 0));
              categories_array.push([])
            }
          })
        })
        .fail(function () {
          alert('データが正しく取得出来ません。お手数ですが、管理者に問い合わせください。')
        })
    }
  })


  //ファイルアップロード
  $(document).on('change', '.js-file', function (e) {
    const categoryIndex = $(this).parents(".category").data('index');
    let targetIndex = $(this).parent().data('index');
    const files = e.target.files;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      const blobUrl = window.URL.createObjectURL(file);

      // ファイルサイズが50Mを越えた場合、許容しない
      if (50000000 < file.size) {
        alert("ファイルサイズが50Mを超えている為、対象の動画はアップロードができません。許容可能ファイルサイズの拡大については、”お知らせ”より対応状況を随時お知らせいたします。ご協力をお願いいたします。")
        return false;
      }
      categories_array[categoryIndex][targetIndex] = files[i]
      
      if (video = $(`.category[data-index="${categoryIndex}"]`).find(`video[data-index="${targetIndex}"]`)[0]) {
        video.setAttribute('src', blobUrl);
      } else {
        targetIndex = new_upload(categoryIndex, targetIndex, blobUrl)
      }
    }
    console.log(categories_array)
  });

  // 動画回転アクション
  $(document).on('click', '.preview__change__edit', function () {
    alert("動画をアプリ上でも編集可能な機能を対応中です。リリースまで今しばらくお待ちください。")
    // const categoryIndex = $(this).parents(".category").data('index');
    // const targetIndex = $(this).parent().data('index');
    // console.log(categoryIndex +"-" +targetIndex)
    // video = $(`.category[data-index="${categoryIndex}"]`).find(`video[data-index="${targetIndex}"]`)
    // function rotate_video(video, degree) {
    //   //スタイルを適用する関数を定義
    //   video.addClass("Rotate" + degree);
    // }
    // rotate_video(video, 90)
   })

  //動画削除アクション
  $(document).on('click', '.preview__change__delete', function () {
    const categoryIndex = $(this).parents(".category").data('index');
    const targetIndex = $(this).parent().data('index');
    $(`.category[data-index="${categoryIndex}"]`).find(`.preview[data-index="${targetIndex}"]`).parents(".video").remove();
    categories_array[categoryIndex][targetIndex] = "";
  });

  //カテゴリー削除アクション
  $(document).on('click', '.fa-trash', function () {
    // ポップアップの発生
    let categoryIndex = $(this).parents(".category").data('index');
    var popup = document.getElementById('confirm-delete-popup');
    if (!popup) return;
    popup.classList.add('is-show');

    $("#confirm-delete-Yes").on('click', function () {
      for (i = 0; i < categories_array[categoryIndex].length; i++) {
        categories_array[categoryIndex].splice(i, 1, "");
      }
      categories_array[categoryIndex].push("deleted_category");
      //子要素を全て削除
      $(`.category[data-index="${categoryIndex}"]`).empty();
      // 親要素はユーザーの後続操作対応に残しておくが、画面上からは隠す
      $(`.category[data-index="${categoryIndex}"]`).hide();
      popup.classList.remove('is-show');
    });
    $("#confirm-delete-No").click(function () {
      $("#confirm-delete-Yes, #confirm-delete-No").remove()
      popup.classList.remove('is-show');
      $('.confirm-delete-popup-inner').append(buildConfirmDaleteCategory)
      // delete categoryIndex;
    });
    console.log(categories_array)
  })

  //Loading アクション
  function dispLoading(msg) {
    // 引数なしの場合、メッセージは非表示。
    if (msg === undefined) msg = "";
    var innerMsg = "<span>" + msg + "</span>";
    if ($(".spinner").length == 0) {
      // メニュー以外の画面操作をロック
      $("body").append("<div id='nowLoading'></div>");
      // スピナー表示を追加
      $("body").append("<div class='spinner type1'>" + innerMsg + "</div>");
    }
  }
  //Lodingストップアクション
  function removeLoading() {
    $("#nowLoading").remove();
    $(".spinner").remove();
  }
  
  //ページのform送信アクション
  $(".new_item,.edit_item").on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    var status = ""

    // 写真が存在しないカテゴリーをチェック
    for (var i = 0; i < categories_array.length; i++) {
      files_tidy_array = $.grep(categories_array[i], function (e) {
        return e !== "";
      });
      if (files_tidy_array == "") {
        alert("動画のないカテゴリーがあります。")
        status = "NG"
        return false;
      }
    }

    //名前が空欄のカテゴリーをチェック
    var Input = document.getElementsByClassName
      ("category__name__text");
    // 写真が存在しないカテゴリーをチェック
    Array.prototype.forEach.call(Input, function (el) {
      if (el.value == "") {
        alert("名前がないカテゴリーがあります。")
        status = "NG"
        return false;
      }
    })

    console.log(status)
    //Loadingアクション
    if (status == "NG") {
      //意図しない値がないことをチェック済みなので、Loadingアクションを実行する
      return false;
    } else {
      dispLoading("prosessing...");
      for (var i = 0; i < categories_array.length; i++) {
        if ($(`.category__name[data-index="${i}"]`).length) {
          inputvalue = $(`.category[data-index="${i}"]`).find(`.category__name__text`).val();
          formData.append("movie_categories[name][]", inputvalue)
        } else {
          formData.append("movie_categories[name][]", "")
        }

        categories_array[i].forEach(function (file) {
          if (file != "deleted_category") {
            formData.append("category_movies[" + i + "][videos][]", file)
          }
        });
      }

      if ($(this).attr('class') == "new_item") {
        $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType: 'json',
          contentType: false,
          processData: false
        })
          .done(function (data) {
            alert('保存に成功しました！');
            location.reload();
          })
          .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert('予期ない操作により保存が失敗しました。お手数ですが管理者に問い合わせて頂けますと幸いです。');
            location.reload();
          })
          .always(function () {
            removeLoading();
            $(".submit").removeAttr("disabled")
          })
      } else if ($(this).attr('class') == "edit_item") {
        $.ajax({
          url: url,
          type: "PATCH",
          data: formData,
          dataType: 'json',
          contentType: false,
          processData: false
        })
          .done(function (data) {
            alert('編集に成功しました！');
            location.reload();
          })
          .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert('予期ない操作により保存が失敗しました。お手数ですが管理者に問い合わせて頂けますと幸いです。');
            location.reload();
          })
          .always(function () {
            removeLoading();
            $(".submit").removeAttr("disabled")
          })
      }
    }
  });
});