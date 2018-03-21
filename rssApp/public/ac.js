var ac = {
  show:function(){
    $("body").append("<div class='overlay'> <div class='spinner'> &#x21bb; </div></div>");
  },
  hide:function(){
    $(".overlay").remove();
  }
}
