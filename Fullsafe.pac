// متغيرات عامة لتتبع الفشل
var failCount = 0;
var lastFailTime = 0;

// ===== إعداد MTU مناسب لـ PUBG =====
var MTU = 1380;

function FindProxyForURL(url, host) {
  // ===== إعدادات البروكسي =====
  var juicityLocalHost = "127.0.0.1";
  var juicityPort     = "1080";
  var ipHTTPS         = "212.34.5.14";
  var portHTTPS       = "1080";

  var PROXY_JUICITY = "SOCKS5 " + juicityLocalHost + ":" + juicityPort;
  var PROXY_HTTPS   = "HTTPS " + ipHTTPS + ":" + portHTTPS;

  var PROXY_CHAIN_GAMES  = PROXY_JUICITY + "; DIRECT";
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

  // ===== رينجات IP الأردنية =====
  var jordanIPRanges = [
    // Umniah
    ["82.212.64.0",  "255.255.192.0"],
    ["212.34.0.0",   "255.255.192.0"],
    // Zain
    ["46.32.0.0",    "255.252.0.0"],
    ["91.106.128.0", "255.255.128.0"],
    // Orange
    ["87.236.232.0", "255.255.248.0"],
    ["193.188.64.0", "255.255.192.0"],
    // Batelco
    ["89.148.0.0",   "255.255.0.0"],
    ["212.118.0.0",  "255.255.128.0"]
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
  function isJoTLD(h) { return h.toLowerCase().endsWith(".jo") || h.toLowerCase().endsWith(".jo."); }
  function matchesAnyDomain(h, arr) {
    h = h.toLowerCase();
    for (var i = 0; i < arr.length; i++) {
      if (dnsDomainIs(h, arr[i]) || shExpMatch(h, "*"+arr[i])) return true;
    }
    return false;
  }
  function isJordanIP(ip) {
    if (!ip) return false;
    for (var i = 0; i < jordanIPRanges.length; i++) {
      if (isInNet(ip, jordanIPRanges[i][0], jordanIPRanges[i][1])) return true;
    }
    return false;
  }

  // ===== Fail Counter =====
  var now = (new Date()).getTime();
  if (failCount >= 3) {
    if ((now - lastFailTime) < 10000) return "DIRECT";
    else failCount = 0;
  }

  // ===== قواعد محلية =====
  if (isPlainHost(host)) return "DIRECT";
  if (isJoTLD(host)) return "DIRECT";

  var resolved = dnsResolve(host);
  if (resolved && isPrivateIP(resolved)) return "DIRECT";

  // ===== ببجي =====
  if (matchesAnyDomain(host, pubgDomains)) {
    if (resolved && isJordanIP(resolved)) return "DIRECT; MTU=" + MTU;
    else return PROXY_CHAIN_GAMES + "; MTU=" + MTU;
  }

  // ===== باقي الترافيك =====
  return LOCAL_FIRST + "; MTU=" + MTU;
}

// محاكاة زيادة عداد الفشل
function reportProxyFail() {
  failCount++;
  lastFailTime = (new Date()).getTime();
}
