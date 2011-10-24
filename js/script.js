$(function() {
  addSubscribeHandler();

  if ($('body').attr('id') == 'home') {
    addDateHighlighter('.events', 'events');
    addDateHighlighter('.techtalks', 'speakers');
  }
});

function addSubscribeHandler() {
  $('.subscribe').submit(function(e) {
    $('.subscribe [type="submit"]').attr('disabled', 'disabled');

    var url = 'http://cgi.stanford.edu/group/acm/cgi-bin/email_signup_all.php';

    $.ajax(url, {
      dataType: "jsonp",
      data: {
        email: $('.subscribe [name="email"]').val()
      }
    }).success(function(e) {
      $('.subscribe').slideUp(function() {
        $('.subscribe')
          .empty()
          .html('<h2 style="color: green;">Success! Click the link in your email to confirm.</h2>')
          .slideDown();
      });

    }).error(function(e) {
      alert('There was an error and you were NOT subscribed to the mailing list. If you\'re feeling kind, send an email to the ACM officers list (acm-officers@lists.stanford.edu) or Feross (feross@feross.org) and let us know so we can fix it.');

      $('.subscribe [type="submit"]')
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
function addDateHighlighter(selector, pastType) {
  var DAY = 1000 * 60 * 60 * 24;
  var currentYear = (new Date(Date.now())).getFullYear();

  var isPast = false;
  var numOld = 0;
  var seenH1 = false;
  $(selector).children().each(function(i, e) {
    var $e = $(e);
    if ($e.is('h1')) {
        if (seenH1) {
            return false; // we're looking at future quarter events; always show those.
        }
        seenH1 = true;
    }
    if ($e.is('h2')) {
      isPast = false;
      var date = Date.parse($e.text() + ', ' + currentYear);
      if (date < Date.now() - DAY) {
        $e.addClass('old'); // mark DATE as old
        isPast = true;
      }
    } else {
      if (isPast) {
        $e.addClass('old'); // mark EVENT as old
        numOld += 1;
      }
    }
  });

  if (numOld > 0) {
      var $oldMsg = $('<div class="oldMsg">' + numOld + ' past ' + pastType + '</div>');
      $oldMsg.click(function(e) {
          $(selector).find('.old').fadeIn();
          $(selector).find('.oldMsg').remove();
      });
      $(selector).find('h1').first().after($oldMsg);
  }

}