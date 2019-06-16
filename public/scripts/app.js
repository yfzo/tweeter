/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const SLIDE_DELAY = 200;

$(document).ready(function() {
  //toggle compose button
  const $composeButton = $('#compose-btn');
  const $newTweet = $('.new-tweet');
  const $newTweetTextBox = $('.new-tweet textarea');

  $newTweet.slideToggle(SLIDE_DELAY);
  
  $composeButton.on('click', function() {
    $newTweet.slideToggle(SLIDE_DELAY, () => {
      $newTweetTextBox.focus();
    });
  })

  //handles new tweet submissions
  const $tweetForm = $('#tweet-form');

  $tweetForm.on('submit', function() {
    event.preventDefault();
    const inputData = $tweetForm.serialize();

    validateTweet(inputData, $newTweetTextBox);
  })

  loadTweets();
});


//helper functions

//escapes unsafe characters (prevents cross-site scripting)
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(data) {
  let $tweet = $("<article>").addClass("tweet");
  const { user, content, created_at } = data;
  const { name, avatars, handle } = data.user;
  const safeHTML = escape(content.text);
  const timeAgo = calculateTimeAgo(created_at);

  const markup = `
  <header>
    <img class="avatar" src="${avatars.small}">
    <h3 class="name">${name}</h3>
    <h5 class="handle">${handle}</h5>
  </header>
  <div class="tweet-body">${safeHTML}</div>
  <footer>
    <span>${timeAgo}</span>
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

//handles how tweet error messages are displayed
function displayError($errorMessage, $newTweetTextBox, message) {
  $errorMessage.slideDown(SLIDE_DELAY, () => {
    $errorMessage.text(message);
    $newTweetTextBox.addClass("error");
  });
}

function validateTweet(inputData, $newTweetTextBox) {
  const tweetLength = $('#tweet-form textarea').val().length;
  const $errorMessage = $('.error-message');

  if ($errorMessage.text()) {
    $errorMessage.slideUp(SLIDE_DELAY);
  }

  //validates tweet upon submission and resets compose new tweet box if successful
  if (tweetLength <= 0) {
    let message = 'Tweet is empty!';
    displayError($errorMessage, $newTweetTextBox, message);
  } else if (tweetLength > 140) {
    let message = 'Tweet is over 140 characters!';
    displayError($errorMessage, $newTweetTextBox, message);
  } else {
    createTweet(inputData);
    $newTweetTextBox.removeClass('error');
    $newTweetTextBox.val('');
    $('.counter').text('140');
  }
}

function calculateTimeAgo(createdAt) {
  let currentTime = Date.now();

  let millisecondsAgo = currentTime - createdAt;
  let secondsAgo = millisecondsAgo / 1000;
  let minutesAgo = secondsAgo / 60;
  let daysAgo = minutesAgo / (60 * 24);

  if (daysAgo >= 1) {
    if (daysAgo < 2) return `${Math.trunc(daysAgo)} day ago`;
      else return `${Math.trunc(daysAgo)} days ago`;
  } else if (minutesAgo >= 60) {
    return `${Math.trunc(minutesAgo / 60)} hours ago`;
  } else if (secondsAgo >= 60) {
    return `${Math.trunc(secondsAgo / 60)} minutes ago`;
  } else {
    return `${Math.trunc(secondsAgo)} seconds ago`;
  }
}