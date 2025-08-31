// ===== متغيرات عامة =====
var failCount = {};
var lastFailTime = {};

// ===== دومينات ببجي موسعة =====
var pubgDomains = [
  ".pubgmobile.com",".igamecj.com",".tencentgames.com",
  ".qcloudcdn.com",".tencentgamingbuddy.com",
  ".classicgame.pubgmobile.com",".tdm.pubgmobile.com",
  ".recruit.pubgmobile.com",".wow.pubgmobile.com",
  ".playermovement.pubgmobile.com",".repository.pubgmobile.com"
];

// ===== دومينات ثقيلة =====
var heavyDomains = [".qcloudcdn.com",".repository.pubgmobile.com"];

// ===== DNS Caching داخلي =====
var dnsCache = {};
function resolveCached(host){
  if(dnsCache[host]) return dnsCache[host];
  var ip = dnsResolve(host);
  if(ip) dnsCache[host] = ip;
  return ip;
}

// ===== Helper: حساب delay ديناميكي لكل بروكسي =====
function getRetryDelay(ip){
  var count = failCount[ip] || 0;
  return Math.min(30000, 10000*Math.pow(2, count-3));
}

// ===== تسجيل الفشل لبروكسي محدد =====
function reportProxyFail(ip){
  failCount[ip] = (failCount[ip] || 0) + 1;
  lastFailTime[ip] = (new Date()).getTime();
}

// ===== اختيار البروكسي حسب نوع الموقع =====
function selectProxy(host){
  var proxies = [
    "212.34.5.14:17303",
    "212.34.5.14:17304",
    "213.186.179.25:8000"
  ];

  var finalList = [];
  for(var i=0;i<proxies.length;i++){
    var ipPort = proxies[i];
    var now = (new Date()).getTime();
    var lastFail = lastFailTime[ipPort] || 0;
    if(!failCount[ipPort]) failCount[ipPort] = 0;

    if((now - lastFail) >= getRetryDelay(ipPort)){
      finalList.push("SOCKS5 "+ipPort);
      finalList.push("SOCKS4 "+ipPort); // fallback
    }
  }

  // دومينات ثقيلة → إجبار البورت الأول أولاً
  for(var i=0;i<heavyDomains.length;i++){
    if(dnsDomainIs(host,heavyDomains[i])){
      return ["SOCKS5 212.34.5.14:17303","SOCKS4 212.34.5.14:17303","SOCKS5 213.186.179.25:8000","SOCKS4 213.186.179.25:8000"].join("; ");
    }
  }

  // دومينات PUBG → بورت 17303 أولاً
  for(var i=0;i<pubgDomains.length;i++){
    if(dnsDomainIs(host,pubgDomains[i]) || shExpMatch(host,"*"+pubgDomains[i])){
      return ["SOCKS5 212.34.5.14:17303","SOCKS4 212.34.5.14:17303","SOCKS5 212.34.5.14:17304","SOCKS4 212.34.5.14:17304","SOCKS5 213.186.179.25:8000","SOCKS4 213.186.179.25:8000"].join("; ");
    }
  }

  // كل المواقع الأخرى → البروكسيات المتاحة حسب الفشل
  return finalList.join("; ");
}

// ===== Main PAC Function =====
function FindProxyForURL(url, host){
  return selectProxy(host); // كل الإنترنت يمر عبر البروكسي، لا DIRECT
}
