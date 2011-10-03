$(function() {
  addSubscribeHandler();

  if ($('body').attr('id') == 'home') {
    addDateHighlighter();
  }
});

function addSubscribeHandler() {
  $('footer .subscribe').submit(function(e) {
    $('footer .subscribe [type="submit"]').attr('disabled', 'disabled');

    var url = 'http://cgi.stanford.edu/group/acm/cgi-bin/email_signup_all.php';

    $.ajax(url, {
      dataType: "jsonp",
      data: {
        email: $('footer .subscribe [name="email"]').val()
      }
    }).success(function(e) {
      $('footer .subscribe').slideUp(function() {
        $('footer .subscribe')
          .empty()
          .html('<h2 style="color: green;">Success! Click the link in your email to confirm.</h2>')
          .slideDown();
      });

    }).error(function(e) {
      alert('There was an error and you were NOT subscribed to the mailing list. If you\'re feeling kind, send an email to the ACM officers list (acm-officers@lists.stanford.edu) or Feross (feross@feross.org) and let us know so we can fix it.');

      $('footer .subscribe [type="submit"]')
        .removeAttr('disabled');
    });

    e.preventDefault();
    e.stopPropagation();
    return false;
  });
}

/**
 * Makes past events (on the homepage) dim, so that we can keep them
 * there, but make them stand out less.
 */
function addDateHighlighter() {
  var DAY = 1000 * 60 * 60 * 24;
  var currentYear = (new Date(Date.now())).getFullYear();

  var isPast = false;
  $('.half h2, .half div').each(function(i, e) {
    var $e = $(e);
    if ($e.is('h2')) {
      isPast = false;
      var date = Date.parse($e.text() + ', ' + currentYear);
      if (date < Date.now() - DAY) {
        $e.addClass('old');
        isPast = true;
      }
    } else {
      if (isPast) {
        $e.addClass('old');
      }
    }
  });
}