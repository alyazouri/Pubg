// متغيرات عامة لتتبع الفشل
var failCount = 0;
var lastFailTime = 0;

// ===== إعداد MTU مناسب لـ PUBG =====
var MTU = 1380;  // قيمة مناسبة لتجنب مشاكل تجزئة UDP

function FindProxyForURL(url, host) {
  // ===== إعدادات البروكسي =====
  var tuicLocalHost = "127.0.0.1";
  var tuicPort     = "1080";  // حيث يستمع TUIC client
  var ipHTTPS      = "212.34.5.14";
  var portHTTPS    = "10000"; // لباقي الترافيك العادي

  var PROXY_TUIC   = "SOCKS5 " + tuicLocalHost + ":" + tuicPort;
  var PROXY_HTTPS  = "HTTPS " + ipHTTPS + ":" + portHTTPS;

  var PROXY_CHAIN_GAMES = PROXY_TUIC + "; DIRECT";
  var PROXY_CHAIN_NORMAL = PROXY_HTTPS + "; DIRECT";

  var LOCAL_FIRST = "DIRECT; " + PROXY_CHAIN_NORMAL;

  // ===== دومينات ببجي =====
  var pubgDomains = [
    ".pubgmobile.com",
    ".igamecj.com",
    ".tencentgames.com",
    ".qcloudcdn.com",
    ".tencentgamingbuddy.com",
    ".classicgame.pubgmobile.com",
    ".tdm.pubgmobile.com",
    ".recruit.pubgmobile.com",
    ".wow.pubgmobile.com"
  ];

  // ===== أدوات مساعدة =====
  function isPlainHost(h){ return (h && h.indexOf('.') === -1); }
  function isPrivateIP(ip) {
    return isInNet(ip, "10.0.0.0", "255.0.0.0") ||
           isInNet(ip, "172.16.0.0", "255.240.0.0") ||
           isInNet(ip, "192.168.0.0", "255.255.0.0") ||
           isInNet(ip, "127.0.0.0", "255.0.0.0") ||
           isInNet(ip, "100.64.0.0", "255.192.0.0");
  }
  function isJoTLD(h) {
    var lh = h.toLowerCase();
    return (lh.endsWith(".jo") || lh.endsWith(".jo."));
  }
  function matchesAnyDomain(h, arr) {
    h = h.toLowerCase();
    for (var i = 0; i < arr.length; i++) {
      var d = arr[i].toLowerCase();
      if (dnsDomainIs(h, d) || shExpMatch(h, "*"+d)) return true;
    }
    return false;
  }

  // ===== Fail Counter Logic =====
  var now = (new Date()).getTime();
  if (failCount >= 3) {
    if ((now - lastFailTime) < 10000) {
      // لو البروكسي وقع 3 مرات ولسه ما مر 10 ثواني → عطّل البروكسي
      return "DIRECT";
    } else {
      // رجع البروكسي بعد 10 ثواني
      failCount = 0;
    }
  }

  // ===== قواعد محلية =====
  if (isPlainHost(host)) return "DIRECT";
  if (isJoTLD(host)) return "DIRECT";

  var resolved = dnsResolve(host);
  if (resolved && isPrivateIP(resolved)) return "DIRECT";

  // ===== ببجي (Proxy-first دائماً مع TUIC client) =====
  if (matchesAnyDomain(host, pubgDomains)) {
    return PROXY_CHAIN_GAMES + "; MTU=" + MTU;
  }

  // ===== باقي الترافيك Local-first مع HTTPS =====
  return LOCAL_FIRST + "; MTU=" + MTU;
}

// محاكاة زيادة عداد الفشل
function reportProxyFail() {
  failCount++;
  lastFailTime = (new Date()).getTime();
}
