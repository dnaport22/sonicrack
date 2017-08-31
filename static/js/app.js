$(document).ready(function() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    $("#left_box").hide();
    $("#right_box").hide();
  }else{
    $('#id_delegate_file').hide();
    $('#id_supplier_file').hide();
  }
  cancelEvent = function(event) {
    event.preventDefault();
    event.stopPropagation();
  };
  leftHandler = function(event) {
    $('#id_delegate_file').prop('files', event.dataTransfer.files);
    $('#left_card').removeClass("grey");
    $('#left_card').addClass("blue");
    cancelEvent(event);
  };
  rightHandler = function(event) {
    $('#id_supplier_file').prop('files', event.dataTransfer.files);
    $('#right_card').removeClass("grey");
    $('#right_card').addClass("blue");
    cancelEvent(event);
  };

  right_box.ondragover = cancelEvent;
  right_box.ondragenter = cancelEvent;
  right_box.ondrop = rightHandler;
  left_box.ondragover = cancelEvent;
  left_box.ondragenter = cancelEvent;
  left_box.ondrop = leftHandler;
});