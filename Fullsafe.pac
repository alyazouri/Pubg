function FindProxyForURL(url, host) {
  // ===== إعدادات البروكسي =====
  var ip = "212.34.5.14";
  var portMain = "10081";
  var portBackup = "10000";

  var PROXY_CHAIN = "SOCKS5 " + ip + ":" + portMain + "; SOCKS5 " + ip + ":" + portBackup;
  var PROXY_FIRST = PROXY_CHAIN + "; DIRECT";
  var LOCAL_FIRST = "DIRECT; " + PROXY_CHAIN;

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

  // ===== قائمة إعلانات للحجب =====
  var adsDomains = [
    ".doubleclick.net",
    ".googlesyndication.com",
    ".adcolony.com",
    ".unityads.unity3d.com",
    ".applovin.com",
    ".ironsrc.com"
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

  // ===== Bypass محلي =====
  if (isPlainHost(host)) return "DIRECT";
  if (isJoTLD(host)) return "DIRECT";

  var resolved = dnsResolve(host);
  if (resolved && isPrivateIP(resolved)) return "DIRECT";

  // ===== حجب إعلانات =====
  if (matchesAnyDomain(host, adsDomains)) {
    return "DIRECT"; // لا يستخدم بروكسي ولا يحمل إعلانات
  }

  // ===== قواعد ببجي مع Time-based =====
  if (matchesAnyDomain(host, pubgDomains)) {
    var hour = (new Date()).getHours();
    if (hour >= 18 && hour <= 23) {
      return PROXY_FIRST; // وقت ضغط → أجبر ببجي عالبروكسي
    }
    return LOCAL_FIRST; // باقي اليوم → محلي أولاً
  }

  // ===== Regional Boost =====
  if (resolved) {
    if (shExpMatch(resolved, "185.*") || shExpMatch(resolved, "212.*")) {
      return LOCAL_FIRST; // آيبي قريب (شرق أوسط)
    }
  }

  // ===== ذكاء DNS =====
  if (resolved) {
    if (isInNet(resolved, "8.8.8.0", "255.255.255.0") ||
        isInNet(resolved, "1.1.1.0", "255.255.255.0")) {
      return PROXY_FIRST; // DNS عالمي → Proxy أسرع
    }
    return LOCAL_FIRST;
  }

  // ===== Fail-safe =====
  return LOCAL_FIRST;
}
