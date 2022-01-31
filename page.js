$(function() {
  currentSlot();
});

$(document).on("click", "#show-copied-content", function() {
  chrome.storage.local.get(["current"], function(current) {
    chrome.storage.local.get([current.current], function(content) {
      $("#copied-content").html(`<p>${content[current.current] || "<em>None</em>"}</p>`)
      $("#copied-content, #hide-copied-content").show();
      $("#show-copied-content").hide();
    });
  });
});

$(document).on("click", "#hide-copied-content", function() {
  $("#copied-content, #hide-copied-content").hide();
  $("#show-copied-content").show();
});

$(document).on("click", ".tab", function() {
  $(".tab").removeClass("active");
  $(".tab-content").removeClass("active-content");
  $("#" + $(this).data("tab")).addClass("active-content");
  $(this).addClass("active");
});

$(document).on("click", ".char-circle:not(.active-char-circle)", function() {
  chrome.storage.local.set({["current"]: $(this).html()});
  currentSlot();
});

function currentSlot() {
  chrome.storage.local.get(["current"], function(current) {
    var curr = current.current;
    $("#show-copied-content").html(`Show Slot ${curr} Content`);
    $("#hide-copied-content").html(`Hide`);
    $(".char-circle").each(function() {
      $(this).removeClass("active-char-circle");
      if ($(this).html() == current.current) {
        $(this).addClass("active-char-circle");
      }
    });
  });
  $("#copied-content, #hide-copied-content").hide();
  $("#show-copied-content").show();
}
