$(function () {
  // 編集画像のポップアップの挙動制御
  function popupImage() {
    var popup = document.getElementById('image-edit-popup');
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
        $("#popup-image").remove();
        popup.classList.remove('is-show');
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

  // カテゴリー削除画面の確認ポップアップ
  function popupConfirmDeleteCategory() {
    var popup = document.getElementById('confirm-delete-popup');
    if (!popup) return;
    var blackBg = document.getElementById('js-confirm-black-bg');
    var closeBtn = document.getElementById('js-confirm-close-btn');
    closeConfirmPopUp(blackBg);
    closeConfirmPopUp(closeBtn);
    function closeConfirmPopUp(elem) {
      if (!elem) return;
      elem.addEventListener('click', function () {
        $("#confirm-delete-Yes, #confirm-delete-No").remove()
        popup.classList.remove('is-show');
        $('.confirm-delete-popup-inner').append(buildConfirmDaleteCategory())
      });
    }
  }
  popupConfirmDeleteCategory();
  
  function buildConfirmDaleteCategory() {
    const html = `<div class="submit" id="confirm-delete-Yes">Yes</div>
                    <div class="submit" id="confirm-delete-No">No</div>`
    return html
  }

  // グローバル関数定義(各メインのjsファイルで呼び出す用)
  window.hogeLib = window.hogeLib || {};
  window.hogeLib.buildPopupImg = buildPopupImg;
  window.hogeLib.buildConfirmDaleteCategory = buildConfirmDaleteCategory;
  
})
