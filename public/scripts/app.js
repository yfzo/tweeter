/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const SLIDE_DELAY = 200;

$(document).ready(function() {
  const $submitTweet = $('#tweet-form');
  $submitTweet.on('submit', function(event) {
    event.preventDefault();
    
      //toggle compose button
      const $composeButton = $('#compose-btn');
      const $newTweet = $('.new-tweet');
      const $newTweetTextBox = $('.new-tweet textarea');
      
      $composeButton.on('click', function() {
        $newTweet.slideToggle(SLIDE_DELAY, () => {
          $newTweetTextBox.focus();
        });
      })

    const inputData = $submitTweet.serialize();
    const tweetLength = $('#tweet-form textarea').val().length;
    const $errorMessage = $('.error-message');

    if ($errorMessage.text()) {
      $errorMessage.slideUp(SLIDE_DELAY);
    }

    if (tweetLength <= 0) {
      $errorMessage.slideDown(SLIDE_DELAY, () => {
        $errorMessage.text('Tweet is empty!');
        $newTweetTextBox.addClass("error");
      });
    } else if (tweetLength > 140) {
      $errorMessage.slideDown(SLIDE_DELAY, () => {
        $errorMessage.text('Tweet is over 140 characters!');
        $newTweetTextBox.addClass('error');
      });
    } else {
      createTweet(inputData);
      $newTweetTextBox.removeClass('error');
      $newTweetTextBox.val('');
    }
  })

  loadTweets();
});

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(data) {
  let $tweet = $("<article>").addClass("tweet");
  const { user, content, created_at } = data;
  const { name, avatars, handle } = data.user;
  const date = new Date(created_at);
  const safeHTML = escape(content.text);

  const markup = `
  <header>
    <img class="avatar" src="${avatars.small}">
    <h3 class="name">${name}</h3>
    <h5 class="handle">${handle}</h5>
  </header>
  <div class="tweet-body">${safeHTML}</div>
  <footer>
    <span>${date}</span>
    <div class=icons>
      <span class="iconify" data-icon="el:flag" data-inline="false"></span>
      <span class="iconify" data-icon="fa:retweet" data-inline="false"></span>
      <span class="iconify" data-icon="topcoat:like" data-inline="false"></span>
  </div>
  </footer>
  `
  return $tweet.append(markup);
}

function renderTweets(tweets) {
  for (tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#all-tweets').prepend($tweet);
  }
}

function loadTweets() {
  $.ajax({
    method: 'GET',
    url: '/tweets',
    dataType: 'JSON',
    error: (res, status, message) => {
      console.log('err: ', message);
    }
  })
  .success( res => {
    $('#all-tweets').empty();
    renderTweets(res);
  })
}

function createTweet(inputData) {
  $.ajax({
    method: 'POST',
    url: '/tweets',
    data: inputData,
    error: (res, status, message) => {
      console.log('err: ', message);
    }
  })
  .done(() => {
    loadTweets();
  })
}