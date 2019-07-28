// automatic whois lookup
// type in to firefox address bar: "whois bob.com"
// this script converts from
// https://www.google.com/search?client=ubuntu&channel=fs&q=whois+bob.com&ie=utf-8&oe=utf-8
// to
// https://whois.icann.org/en/lookup?name=bob.com

var pattern="https://www.google.com/search?client=ubuntu&channel=fs&q=whois+*";

function redirect(requestDetails) {
  console.log("Loading: " + requestDetails.url);
  var str = requestDetails.url;
  var domain = str.replace("https://www.google.com/search?client=ubuntu&channel=fs&q=whois+", "").replace("&ie=utf-8&oe=utf-8","");
  console.log("Domain: " + domain);
  var newUrl = "https://whois.icann.org/en/lookup?name=" + domain;
  console.log("New URL: " + newUrl);
  return {
    redirectUrl: newUrl
  };
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls: [pattern], types: ["main_frame"]},
  ["blocking"]
);