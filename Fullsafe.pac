// ===== متغيرات عامة =====
var failCount = 0;
var lastFailTime = 0;
var MTU = 1380;

function FindProxyForURL(url, host) {
  var juicityLocalHost = "127.0.0.1";
  var juicityPort     = "1080";
  var mainProxyIP     = "212.34.5.14";  // البروكسي النهائي الإجباري
  var mainProxyPort   = "1080";

  var PROXY_JUICITY = "SOCKS5 " + juicityLocalHost + ":" + juicityPort;
  var PROXY_FINAL   = "HTTPS " + mainProxyIP + ":" + mainProxyPort;

  var PROXY_CHAIN_GAMES  = PROXY_JUICITY + "; " + PROXY_FINAL;
  var PROXY_CHAIN_NORMAL = PROXY_FINAL + "; DIRECT";
  var LOCAL_FIRST = "DIRECT; " + PROXY_CHAIN_NORMAL;

  // دومينات ببجي
  var pubgDomains = [
    ".pubgmobile.com",
    ".igamecj.com",
    ".tencentgames.com",
    ".qcloudcdn.com",
    ".tencentgamingbuddy.com"
  ];

  // رينجات أردنية دقيقة بدون تكرار لكل مزود
  var jordanIPRanges = [
    ["82.212.64.0",  "255.255.192.0"],  // عمان
    ["212.34.0.0",   "255.255.192.0"],  // عمان
    ["91.106.128.0","255.255.128.0"],   // الزرقاء
    ["46.32.0.0",   "255.252.0.0"],     // إربد
    ["87.236.232.0","255.255.248.0"],   // مادبا، مرج الحمام
    ["193.188.64.0","255.255.192.0"],   // جرش، الأغوار
    ["89.148.0.0",  "255.255.0.0"],     // عجلون
    ["212.118.0.0", "255.255.128.0"],   // معان
    ["188.247.0.0", "255.255.0.0"],     // العقبة
    ["185.40.0.0",  "255.255.128.0"],   // الكرك
    ["185.41.0.0",  "255.255.128.0"],   // دابوق
    ["185.42.0.0",  "255.255.128.0"],   // الكرسي
    ["185.43.0.0",  "255.255.128.0"],   // مرج الحمام
    ["185.44.0.0",  "255.255.128.0"],   // الأغوار
    ["185.45.0.0",  "255.255.128.0"],   // عمان الشرقية
    ["185.46.0.0",  "255.255.128.0"],   // عمان الغربية
    ["185.47.0.0",  "255.255.128.0"]    // ماركا
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
  function isJoTLD(h) { return h.toLowerCase().endsWith(".jo"); }
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
  if (failCount >= 3 && (now - lastFailTime) < 10000) return PROXY_FINAL + "; MTU=" + MTU;
  if ((now - lastFailTime) >= 10000) failCount = 0;

  if (isPlainHost(host) || isJoTLD(host)) return PROXY_FINAL + "; MTU=" + MTU;

  var resolved = dnsResolve(host);
  if (resolved && isPrivateIP(resolved)) return PROXY_FINAL + "; MTU=" + MTU;

  // ===== ببجي =====
  if (matchesAnyDomain(host, pubgDomains)) {
    if (resolved && isJordanIP(resolved)) return "DIRECT; MTU=" + MTU;
    else return PROXY_CHAIN_GAMES + "; MTU=" + MTU;
  }

  // ===== باقي الترافيك → إجبارياً على البروكسي النهائي =====
  return LOCAL_FIRST + "; " + PROXY_FINAL + "; MTU=" + MTU;
}

// ===== محاكاة زيادة عداد الفشل =====
function reportProxyFail() {
  failCount++;
  lastFailTime = (new Date()).getTime();
}
