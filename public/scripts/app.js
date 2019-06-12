/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement (data) {
  //var $tweet = $("<article>").addClass("tweet");
  const { user, content, created_at } = data;
  const { name, avatars, handle } = data.user;
  const date = new Date(created_at);

  const markup = `
  <article class="tweet">
  <header>
    <img class="avatar" src="${avatars.small}">
    <h3 class="name">${name}</h3>
    <h5 class="handle">${handle}</h5>
  </header>
  <div class="tweet-body">${content.text}</div>
  <footer>
    <span>${date}</span>
    <div class=icons>
      <span class="iconify" data-icon="el:flag" data-inline="false"></span>
      <span class="iconify" data-icon="fa:retweet" data-inline="false"></span>
      <span class="iconify" data-icon="topcoat:like" data-inline="false"></span>
  </div>
  </footer>
  </article>
  `
  return $(markup);
}

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#all-tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.