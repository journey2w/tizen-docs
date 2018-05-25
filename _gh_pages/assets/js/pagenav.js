(function() {
  $(document).ready(function() {
    // Ensure called late most
    $(document).ready(function() {
      var hasH2 = $("h2").length > 0;
      var hasH3 = $("h3").length > 0;

      if (hasH2 || hasH3) {
        $("#pagenav-table").addClass("show");

        $("h2,h3").each(function(index) {
          var sub = hasH2 && $(this).prop("tagName") == "H3";
          var s = anchorItem(index + 1, $(this).text(), sub);

          $("#pagenav-index").append(s);
        });
      }
    });
  })

  function anchorItem(index, name, sub) {
    return '<li class="anchor-list__item"><a class="' + (sub? "sub-item" : "") + '" href="#' +
      slugify(name) + '" tabindex="' + index + '">' + name +
      '</a></li>';
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^\w -]+/g,'').replace(/ +/g,'-');
  }
})();