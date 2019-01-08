$(document).ready(() => {
  let backToTop = $('#back-to-top');

  backToTop.on('click', event => {
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
    return false;
  });
});
