function insert_active_to_gnb() {
  var path = window.location.href.split("#")[0];
  $('#navbar ul li').each(function(i, e) {
    var a = $(e).find("a");
    if( a.length == 0 ) return;
    var h = a[0].href.split("#")[0];
    if( h == path || h == path.substring(0, h.length) ) {
      $(e).addClass("active");
    }
  });
}

function insert_active_to_lnb() {
  var side_menu = $(".side-menu");
  if( side_menu.length == 0 ) return;

  var path = window.location.href.split("#")[0];
  $(".side-menu li").each(function(i, e) {
    if( $(e).find('li').length > 0 ) return;

    var a = $(e).find("a");
    if( a.length == 0 ) return;
    var h = a[0].href.split("#")[0];

    if( h == path || h == path.substring(0, h.length) ) {
      $(e).addClass("active");
      $(e).parents("li").addClass("active").addClass("open");
    }
  });
}

function logout(logout_url) {
  var url = logout_url + "?return_url=" + encodeURI(window.location.href);
  window.location.href = url;
  return false;
}

function httpGetAsync(theUrl, callback)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous 
  xmlHttp.send(null);
}

function side_menu_toggle() {                                                               

  var li = $(this).closest('li');                                                           

  if( li.hasClass('open') ) {
    li.removeClass('open');                                                                 
    li.find(".child_menu").slideUp();                                                       
  } else {                                                                                  
    li.addClass('open');                                                                    
    li.find(".child_menu").slideDown();                                                     
  }                                                                                         
}      

/*
function side_menu_toggle() {
  var chev_down = $(this).find(".fa-chevron-down");
  if( chev_down.length > 0 ) {
    chev_down.removeClass('fa-chevron-down');
    chev_down.addClass('fa-chevron-up');
    $(this).find(".child_menu").slideDown();
  } else {
    var chev_up = $(this).find(".fa-chevron-up");
    if( chev_up.length > 0 ) {
      chev_up.removeClass('fa-chevron-up');
      chev_up.addClass('fa-chevron-down');
      $(this).find(".child_menu").slideUp();
    }
  }
}
*/

function register_hover_change_image() {
  $('.hover-change-image').mouseover(function() {
    $(this).attr('src', $(this).data('hover-src'));
  });

  $('.hover-change-image').mouseout(function() {
    $(this).attr('src', $(this).data('normal-src'));
  });
}

function register_gnb_search_btn() {
  $('#gnb_search_btn').click(function() {
    $('#gnb_search_box').fadeIn(500);
    $('#gnb_search_box > input').focus();
  });

  $('#gnb_search_box > input').blur(function() {
    $('#gnb_search_box').fadeOut(500);
  });
}

function make_docs_toc() {
    /* In case of index page, no #toc */
    if (window.location.href == 'https://docs.tizen.org/') {
        return;
    }

    $('#toc').width($('#toc').parents().width());
    $('#toc').toc({
        elemtClass: 'toc',
        ulClass: 'nav',
        //heading: 'Table of Contents'
        heading: 'In this article'
    });

    $('body').scrollspy({
        target: '#toc',
        offset: $('#headerNav').outerHeight(true) + 40
    });

    setTimeout(function() {
        var $sideBar = $('#toc');
        $sideBar.affix({
            offset: {
                top: function() {
                    var offsetTop = $sideBar.offset().top,
                        sideBarMargin = parseInt($sideBar.children(0).css('margin-top'), 10),
                        navOuterHeight = $('#headerNav').height();
                    return (this.top = offsetTop - navOuterHeight - sideBarMargin);
                },
                bottom: function() {
                    return (this.bottom = $('footer').outerHeight(true));
                }
            }
        });
    }, 100);
}

$(document).ready(function() {
  insert_active_to_gnb();
  insert_active_to_lnb();

  $(".side-menu > li > a").click(side_menu_toggle);

  /* register_hover_change_image(); */
  register_gnb_search_btn();

  make_docs_toc();
});
