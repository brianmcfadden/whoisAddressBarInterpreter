// automatic whois lookup
// type in to firefox address bar: "whois bob.com"
// this script converts from
// https://www.google.com/search?client=ubuntu&channel=fs&q=whois+bob.com&ie=utf-8&oe=utf-8
// to some other helpful information provider, preferably one that doesn't captcha or
// limit requests
//
// and it does pings, now, too..

var pattern="https://www.google.com/search?client=*&q=whois+*";
var anotherPattern="https://www.google.com/search?client=*&q=ping+*";

var whoisPrefix = "https://mxtoolbox.com/SuperTool.aspx?action=whois%3a";
var pingPrefix = "https://www.ultratools.com/tools/pingResult?hostName=";

function redirect(requestDetails) {
  var str = requestDetails.url;
  var newUrl;
  if (str.match(/whois/g)) {
    var domain = str.replace(/https:\/\/www.google.com\/search\?client=.*&q=whois\+/, "").replace(/&ie=.*$/,"");
    newUrl = whoisPrefix + domain;
  } else if (str.match(/ping/g)) {
    var address = str.replace(/https:\/\/www.google.com\/search\?client=.*&q=ping\+/, "").replace(/&ie=.*$/,"");
    newUrl = pingPrefix + address;
  }
  return {
    redirectUrl: newUrl
  };
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls: [pattern, anotherPattern], types: ["main_frame"]},
  ["blocking"]
);
