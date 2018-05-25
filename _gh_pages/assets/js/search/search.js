(function() {
  var searchTerm = getQueryVariable('q');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('content');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'content': window.store[key].content
      });
    }

    var results = idx.search(searchTerm); // Get lunr to perform a search
    displaySearchResults(results, window.store); // We'll write this in the next section
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var str = '<span class="text-muted">' + results.length + ' found</span>';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];

        // Generate search result
        var urlSlugs = item.url.replace(/^\/|\/$/g, '').replace(/\//g, ',');

        str += '<li>' + '<h4>' + 
          '<a href="' + baseurl + item.url + '?q=' + encodeURIComponent(searchTerm) + '">' + item.title + '</a>' +
          '<span class="small"> (' + makeLink(urlSlugs.split(',')) + ')</span>' + '</h4>' + 
          '<p>' + shorten(item.content) + '</p>' + '</li>';
      }

      searchResults.innerHTML = str;
    } else {
      searchResults.innerHTML = '<span class="text-muted">No results found</span>';
    }
  }

  function shorten(content) {
    if (content.length < 400) {
      return content;
    } else {
      var str = '';
      var idx = content.indexOf('<mark>', 0);
      if (idx > 100) {
        str += '... ';
      }
      str += content.substring(idx - 100, idx + 300);
      if (idx + 300 < content.length) {
        str += ' ...';
      }
      return str;
    }
  }

  function makeLink(slugs) {
    var appendString = '';
    for (var i = 0; i < slugs.length; i++) {
      var url = baseurl + '/' + slugs.slice(0, i + 1).join('/');
      appendString += '<a class="text-muted" href="' + url + '">' + slugs[i] + '</a>/';
    }
    return appendString.replace(/^\/|\/$/g, ''); // Remove slashses at both sides end of the string
  }
})();