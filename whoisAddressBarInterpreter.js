// automatic whois lookup
// type in to firefox address bar: "whois bob.com"
// this script converts from
// https://www.google.com/search?client=ubuntu&channel=fs&q=whois+bob.com&ie=utf-8&oe=utf-8
// to some other helpful information provider, preferably one that doesn't captcha or
// limit requests

var pattern="https://www.google.com/search?client=ubuntu&channel=fs&q=whois+*";

var whoisPrefix = "https://mxtoolbox.com/SuperTool.aspx?action=whois%3a";

function redirect(requestDetails) {
  var str = requestDetails.url;
  var domain = str.replace("https://www.google.com/search?client=ubuntu&channel=fs&q=whois+", "").replace("&ie=utf-8&oe=utf-8","");
  var newUrl = whoisPrefix + domain;
  return {
    redirectUrl: newUrl
  };
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls: [pattern], types: ["main_frame"]},
  ["blocking"]
);
