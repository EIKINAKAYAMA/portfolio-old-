$(function () {
  const buildCategory = (categoryIndex, index) => {
    const html = `<div class="category" data-index="${categoryIndex}">
                    <div class = "category__name" data-index="${categoryIndex}">
                      <label> 
                        <input type="text" class="category__name__text" name="movie_categories[name][]">
                      </label>
                    </div>

                    <div class = "upload-container">
                      <div class = "movie-box" >
                        <div class="js-file_group">
                          <label data-index="${index}" class="movie-upload">
                            <input type="file" class="js-file" multiple="multiple" style="visibility: hidden">
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
                    <input type="file" class="js-file" style="visibility: hidden">
                  </label>`;
    return html;
  }

  const buildMovie = (index, url) => {
    const html = `<div class="preview" data-index="${index}">
                    <video data-index="${index}" src="${url}" width="200px" height="200px" controls muted playsinline>
                    <div data-index="${index}" class = "preview__change">
                      <label data-index="${index}" class="preview__change__upload">変更
                        <input type="file" class="js-file" style="visibility: hidden">
                      </label>
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

  //newアクション時には実行させないようにする必要あり
  $(function () {
    $.getJSON('edit')
      .done(function (datas) {
        var categoryIndex = 0
        datas.forEach(function (data) {
          $(`.category[data-index="${categoryIndex}"]`).find('.category__name__text').val(`${data.name}`)
          for (targetIndex = 0; targetIndex < data.category_images.length; targetIndex++) {
            let blobUrl = data.category_images[targetIndex].image.url
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
        console.log("NG")
      })
  })


  //ファイルアップロード
  $(document).on('change', '.js-file', function (e) {
    const categoryIndex = $(this).parents(".category").data('index');
    let targetIndex = $(this).parent().data('index');
    const files = e.target.files;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      const blobUrl = window.URL.createObjectURL(file);
      categories_array[categoryIndex][targetIndex] = files[i]

      if (video = $(`.category[data-index="${categoryIndex}"]`).find(`video[data-index="${targetIndex}"]`)[0]) {
        video.setAttribute('src', blobUrl);
      } else {
        targetIndex = new_upload(categoryIndex, targetIndex, blobUrl)
      }
    }
    console.log(categories_array)
  });

  //画像削除アクション
  $(document).on('click', '.preview__change__delete', function () {
    const categoryIndex = $(this).parents(".category").data('index');
    const targetIndex = $(this).parent().data('index');
    $(`.category[data-index="${categoryIndex}"]`).find(`label[data-index="${targetIndex}"]`).remove();
    $(`.category[data-index="${categoryIndex}"]`).find(`.preview[data-index="${targetIndex}"]`).remove();
    categories_array[categoryIndex][targetIndex] = "";
  });

  //ページのform送信アクション
  $('.new_item, .edit_item').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    // 配列の中の空白を削除した綺麗な配列を新規に作成
    // files_tidy_array = $.grep(files_array, function (e) {
    //   return e !== "";
    // });
    for (var i = 0; i < categories_array.length; i++) {
      categories_array[i].forEach(function (file) {
        formData.append("category_images[" + i + "][images][]", file)
      });
    }

    if ($(this).attr('class') == "new_item") {
      console.log("new")
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false
      })
        .done(function (data) {
          alert('出品に成功しました！');
        })
        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
          alert('出品に失敗しました！');
        })
        .always(function () {
          $(".form_submit").removeAtter("disabled")
        })
    } else if ($(this).attr('class') == "edit_item") {
      console.log("edit")
      $.ajax({
        url: url,
        type: "PATCH",
        data: formData,
        dataType: 'json',
        contentType: false,
        processData: false
      })
        .done(function (data) {
          alert('出品に成功しました！');
        })
        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
          alert('出品に失敗しました！');
        })
        .always(function () {
          $(".submit").removeAttr("disabled")
        })
    }
  });
});