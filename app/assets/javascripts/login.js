// Elements selectors
$(function () {
  'use strict';
  // const elm = {
  //   signUpButton: document.querySelector(".button-signup"),
  //   loginButton: document.querySelector(".button-login"),
  //   overlay: document.querySelector(".overlay"),
  //   logo: document.querySelector(".logo"),
  //   arrow: document.querySelector(".arrow"),
  //   registerForm: document.querySelector(".register-form"),
  //   loginForm: document.querySelector(".login-form")
  // };

  // // Properties object
  // const props = {
  //   right: "right: -550px;",
  //   left: "left: 5px;",
  //   opacity0: "opacity: 0;",
  //   opacity1: "opacity: 1;",
  //   trnsDelay: "transition-delay: 1s;",
  //   zIndex: "z-index: 6;",
  //   right0: "right: 0;",
  //   left0: "left: 0;",
  //   trnsDelay0: "transition-delay: 0s;",
  //   zIndex0: "z-index: 0;",
  //   leftM30: "left: -30px;"
  // };

  // // Elements array
  // const elms = [elm.signUpButton, elm.loginButton, elm.overlay, elm.logo, elm.arrow, elm.registerForm, elm.loginForm];

  // function transition(elements, props) {
  //   for (let i = 0; i < elements.length; i++) {
  //     elements[i].setAttribute("style", `${props[i]}`);
  //   }
  // }

  // $(document).on('click', '.button-signup', function () {
  //   const properties = [props.right, props.right, props.opacity0, props.right, props.left, `${props.opacity1} ${props.trnsDelay} ${props.zIndex}`, props.opacity0];

  //   transition(elms, properties);
  //   setTimeout(function () {
  //     window.location.href = "/users/sign_up"
  //   }, 2000);
  // })

  // $(document).on('click', '.button-login', function () {
  //   const properties = [props.right, props.right, props.opacity0, props.right, props.left, props.opacity0, `${props.opacity1} ${props.trnsDelay} ${props.zIndex}`];

  //   transition(elms, properties);
  // })

  // $(document).on('click', '.arrow', function () {
  //   const properties = [props.right0, props.right0, props.opacity1, props.right0, props.leftM30, `${props.opacity0} ${props.trnsDelay0} ${props.zIndex0}`, `${props.opacity0} ${props.trnsDelay0} ${props.zIndex0}`];

  //   transition(elms, properties);
  // })

  // password-inputの値とpattern属性を連動させる
  $('#signup-password').on('input', function () {
    $('#signup-password_confirmation').prop('pattern', $(this).val())
  });

})