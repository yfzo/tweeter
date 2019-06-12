/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement (data) {
  let $tweet = $("<article>").addClass("tweet");
  const { user, content, created_at } = data;
  const { name, avatars, handle } = data.user;
  const date = new Date(created_at);

  const markup = `
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
  `
  return $tweet.append(markup);
}

function renderTweets (tweets) {
  for (tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#all-tweets').append($tweet);
  }
}

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


renderTweets(data);
