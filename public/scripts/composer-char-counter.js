$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    let textLength = $(this).val().length;
    let charAvailable = 140 - textLength;
    let $counter = $(this).parent().children(".counter");

    if (charAvailable < 0) {
      $counter.addClass("over-limit");
    } else {
      $counter.removeClass("over-limit");
    }

    $counter.text(function() {
      return charAvailable;
    })
  })
});