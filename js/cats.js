$(function() {
  $.ajax({
    url: "http://reddit.com/r/catgifs.json",
    dataType: "json",
    type: "get",
    success: function(r) {
      if(r.data.children.length > 0) {
        var $html;
        for(var i = 0; i < r.data.children.length; i++) {
          $html += "<img src='" + r.data.children[i].data.url + "'/>";
        }
        $('#cats').append($html);
        console.log($html);
      }
    }, 
    error: function() {

    }
  })

});
