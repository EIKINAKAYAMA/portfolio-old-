$(function () {
  // 画像のポップアップの挙動制御
  function popupImage() {
    var popup = document.getElementById('js-popup');
    if (!popup) return;

    var blackBg = document.getElementById('js-black-bg');
    var closeBtn = document.getElementById('js-close-btn');
  
    closePopUp(blackBg);
    closePopUp(closeBtn);
    function closePopUp(elem) {
      if (!elem) return;
      elem.addEventListener('click', function () {
        $('.croppie-container').remove();
        $('#edit-field').remove();
        popup.classList.toggle('is-show');
        $('.popup-inner').append(buildPopupImg())
      });
    }
  }
  popupImage();

  function buildPopupImg() {
    const html = `<div id="edit-field">
                    <div id="Rotate-Left" class="popup-edit-button">Rotate-Left</div>
                    <div id="Rotate-Right" class="popup-edit-button">Rotate-Reft</div>
                    <div id="Save" class="popup-edit-button">Save</div>
                  </div>
                  <img id="popup-image" class="popup-image"width="500px" height="500px">` 
    return html
  }

  // 新規カテゴリーの作成
  const buildCategory = (categoryIndex, index) => {
    const html = `<div class="category" data-index="${categoryIndex}">
                    <div class = "category__name" data-index="${categoryIndex}">
                      <p>Name of Category :</p>
                      <label> 
                        <input type="text" class="category__name__text" name="gallery_categories[name][]">
                      </label>
                    </div>

                    <div class = "upload-container">
                      <div class = "image-box" >
                        <div class="js-file_group">
                          <label data-index="${index}" class="image-upload">
                            <input type="file" class="js-file" multiple="multiple" style="visibility: hidden">
                            <p><i class="fas fa-camera fa-3x"></i></p>
                            <p>Drag and Drop<br>or click</p>
                            </label>
                        </div>
                      </div>
                    </div>

                  </div>`;
    return html;
  }

  // 画像用のinputを生成する関数
  const buildFileField = (index) => {
    const html = `<label data-index="${index}" class="image-upload">
                    <input type="file" class="js-file" multiple="multiple" style="visibility: hidden">
                    <p><i class="fas fa-camera fa-3x"></i></p>
                    <p>Drag and Drop<br>or click</p>
                  </label>`;
    return html;
  }

  const buildImg = (index, url) => {
    const html = `<div class="preview" data-index="${index}">
                    <img data-index="${index}" src="${url}" width="150px" height="100px">
                    <div data-index="${index}" class = "preview__change">
                      <label data-index="${index}" class="preview__change__upload">変更
                        <input type="file" class="js-file" style="visibility: hidden">
                      </label>
                      <div class="preview__change__edit">編集</div>
                      <div class="preview__change__delete">削除</div>
                    </div>
                  </div>`;
    return html;
  }

  // 画像を管理するための配列を定義する。
  const categories_array = [[]]
  
  //category追加アクション
  $("#category_plus").on('click', function () {
    const categoryIndex = $(".category").last().data('index');
    $('.category').last().after(buildCategory(categoryIndex + 1, 0));
    categories_array.push([])
    $('.main').animate({ scrollTop: $("#gallery").height() }, 'slow')
  });

  //新規アップロード時の実行内容（files_arrayはajax取得とform選択で取り方が違う為、統一化しない）
  function new_upload(categoryIndex, targetIndex, blobUrl) {
    $(`.category[data-index="${categoryIndex}"]`).find('.image-upload').remove();
    // $('.image-upload').remove();
    $(`.category[data-index="${categoryIndex}"]`).find('.js-file_group').append(buildImg(targetIndex, blobUrl));
    // $('.js-file_group').append(buildImg(targetIndex, blobUrl));
    targetIndex++;
    $(`.category[data-index="${categoryIndex}"]`).find('.js-file_group').append(buildFileField(targetIndex));
    return targetIndex;
  }

  //newアクション時には実行させないようにする必要あり
  $(function () {
    if (document.URL.match(/edit/)) {
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
          alert('データが正しく取得出来ません。お手数ですが、管理者に問い合わせください。')
        })
    }
  })

  //ドラックアンドドロップ
  $(document).on("dragenter dragover", function (e) {
    e.stopPropagation();
    e.preventDefault();
    this.style.background = "#ff3399";
  }, false);

  $(document).on("dragleave", function (e) {
    e.stopPropagation();
    e.preventDefault();
    this.style.background = "#ffffff";
  }, false);

  $(document).on("drop", function (e) {
    e.stopPropagation();
    e.preventDefault();
  });

  $("#image-box").on("drop", function (e) {
    var targetIndex = files_array.length
    e.preventDefault();
    const files = e.originalEvent.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      const blobUrl = window.URL.createObjectURL(file);
      categories_array[categoryIndex][targetIndex] = files[i]
      if (img = $(`.category[data-index="${categoryIndex}"]`).find(`img[data-index="${targetIndex}"]`)[0]) {
        img.setAttribute('src', blobUrl);
      } else {
        targetIndex = new_upload(categoryIndex, targetIndex, blobUrl)
      }
    }
  });

  //ファイルアップロード
  $(document).on('change', '.js-file', function (e) {
    const categoryIndex = $(this).parents(".category").data('index');
    let targetIndex = $(this).parent().data('index');
    const files = e.target.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      const blobUrl = window.URL.createObjectURL(file);
      categories_array[categoryIndex][targetIndex] = files[i]

      if (img = $(`.category[data-index="${categoryIndex}"]`).find(`img[data-index="${targetIndex}"]`)[0]) {
        img.setAttribute('src', blobUrl);
      } else {
        targetIndex = new_upload(categoryIndex, targetIndex, blobUrl)
      }
    }
  });

  
  //画像編集アクション
  $(document).on('click', '.preview__change__edit', function () {
    // 対象の画像をポップアップに挿入
    var categoryIndex = $(this).parents(".category").data('index');
    var targetIndex = $(this).parent().data('index');
    var el = document.getElementById('popup-image');
    img = $(`.category[data-index="${categoryIndex}"]`).find(`img[data-index="${targetIndex}"]`)
    el.setAttribute('src', img.attr("src"))
    el.setAttribute('id', categoryIndex + "-" + targetIndex)
    
    // ポップアップの発生
    var popup = document.getElementById('js-popup');
    if (!popup) return;
    popup.classList.toggle('is-show');
    
    $(".popup-image").croppie('destroy').removeAttr('src');
    // Crop = $("#" + categoryIndex + "-" + targetIndex).croppie({
      vanilla = $(".popup-image").croppie({
        viewport: { width: 100, height: 100 },
        boundary: { width: 300, height: 300 },
        showZoomer: false,
        enableOrientation: true,
        url: img.attr("src")
    })

    $('#Rotate-Left').on('click', function () {
      vanilla.croppie('rotate', parseInt($(this).data('deg')));
    })
    
    $("#Rotate-Right").click(function () {
      vanilla.croppie('rotate', parseInt($(this).data('deg')));
    });
    
    $('#Save').on('click', function () {
      vanilla.croppie('result', 'blob').then(function (blob) {
        //同一名ファイルは上書きされない、トリミング後の画像名をユニーク化する為、タイムスタンプを付与
        var now = new Date();
        file = new File(
          [blob],
          "file:Category[" +
          categoryIndex +
          "]-Target[" +
          targetIndex +
          "]" +
          now.getFullYear() +
          (now.getMonth()+1) +
          now.getDate() +
          now.getHours() +
          now.getMinutes() +
          now.getSeconds() +
          ".jpeg", { type: "image/jpeg" })
          var blobUrl = window.URL.createObjectURL(blob);
          //ファイルの名前、型を指定
          categories_array[categoryIndex][targetIndex] = file
          img.attr('src', blobUrl)
        });
        $('.croppie-container').remove();
        $('#edit-field').remove();
        popup.classList.toggle('is-show');
        $('.popup-inner').append(buildPopupImg())
      });
    });
 
    //画像削除アクション
    $(document).on('click', '.preview__change__delete', function () {
      const categoryIndex = $(this).parents(".category").data('index');
      const targetIndex = $(this).parent().data('index');
      $(`.category[data-index="${categoryIndex}"]`).find(`label[data-index="${targetIndex}"]`).remove();
      $(`.category[data-index="${categoryIndex}"]`).find(`.preview[data-index="${targetIndex}"]`).remove();
      categories_array[categoryIndex][targetIndex] = "";
    }); 
    
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
  $('.new_item, .edit_item').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    //Loadingアクション
    dispLoading("prosessing...");

    for (var i = 0; i < categories_array.length; i++) {
      categories_array[i].forEach(function (file) {
        formData.append("category_images["+ i +"][images][]", file)
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
        .done(function () {
          alert('出品に成功しました！');
        })
        .fail(function () {
          alert('出品に失敗しました！');
        })
        .always(function () {
          removeLoading();
          $(".form_submit").removeAtter("disabled")
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
        .done(function () {
          alert('出品に成功しました！');
        })
        .fail(function () {
          alert('出品に失敗しました！');
        })
        .always(function () {
          removeLoading();
          $(".submit").removeAttr("disabled")
        }) 
    }
  });
});