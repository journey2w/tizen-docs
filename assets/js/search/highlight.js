(function() {
  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
    return '';
  }

  $.fn.mark = function(exp) {
    return this.each(function() {
      var regHtml = new RegExp('\>([^\<]+)\<', 'g');
      var regExp = new RegExp(exp, 'gi');

      // Extract text outside html brackets
      this.innerHTML = this.innerHTML.replace(regHtml, function(html) { 
        // Mark text and add an anchor
        return html.replace(regExp, function(keyword) { 
          return '<mark>' + keyword + '</mark>' 
        })
      });
    });
  }

  $(document).ready(function() {
    // Mark keywords
    var qs = getQueryVariable('q').split(" ");
    qs.forEach(function(q) {
      if (q.length > 0) {
        $("main").mark(q);
      }
    });

    // Scroll down to first mark
    if ($("mark").offset()) {
      $(window).scrollTop($("mark:first").offset().top - 50);
    }
  });
})();