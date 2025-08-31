// ===== متغيرات عامة =====
var failCount = 0;
var lastFailTime = 0;

// ===== DNS مخصص =====
var customDNS = ["62.253.128.1","62.253.128.2","1.1.1.1","8.8.8.8"];

// ===== دومينات ببجي موسعة =====
var pubgDomains = [
  ".pubgmobile.com",".igamecj.com",".tencentgames.com",
  ".qcloudcdn.com",".tencentgamingbuddy.com",
  ".classicgame.pubgmobile.com",".tdm.pubgmobile.com",
  ".recruit.pubgmobile.com",".wow.pubgmobile.com",
  ".playermovement.pubgmobile.com",".repository.pubgmobile.com"
];

// ===== دومينات ثقيلة لتغيير MTU =====
var heavyDomains = [".qcloudcdn.com",".repository.pubgmobile.com"];

// ===== دومينات سريعة =====
var fastDomains = [".pubgmobile.com",".tdm.pubgmobile.com"];

// ===== Caching داخلي لنتائج DNS =====
var dnsCache = {};
function resolveCached(host){
  if(dnsCache[host]) return dnsCache[host];
  var ip = dnsResolve(host);
  if(ip) dnsCache[host] = ip;
  return ip;
}

// ===== MTU ديناميكي =====
function getMTU(host, ping){
  if(ping && ping > 100) return 1300; // تقليل MTU إذا البنق عالي
  for(var i=0;i<pubgDomains.length;i++){
    if(dnsDomainIs(host,pubgDomains[i])) return 1380;
  }
  for(var i=0;i<heavyDomains.length;i++){
    if(dnsDomainIs(host,heavyDomains[i])) return 1400;
  }
  return 1400;
}

// ===== Fail Counter مع Exponential Backoff =====
function getRetryDelay(failCount){
  return Math.min(30000,10000*Math.pow(2,failCount-3));
}

// ===== Logging داخلي =====
function logHost(host){
  // alert("Connecting to: "+host);
}

// ===== اختيار بروكسي حسب نوع الدومين =====
function selectProxy(host){
  var cityProxies = {
    "amman":"SOCKS5 212.34.5.14:1080"
  };
  for(var city in cityProxies){
    if(shExpMatch(host,"*"+city+"*")) return cityProxies[city]+"; UDP; MTU="+getMTU(host);
  }
  for(var i=0;i<heavyDomains.length;i++){
    if(dnsDomainIs(host,heavyDomains[i])) return "SOCKS5 212.34.5.14:1080; MTU=1400";
  }
  return "SOCKS5 212.34.5.14:1080; UDP; MTU="+getMTU(host);
}

// ===== Prefetch دوري =====
function prefetchPeriodic(hosts,interval){
  setInterval(function(){
    for(var i=0;i<hosts.length;i++){
      resolveCached(hosts[i]);
    }
  },interval);
}
prefetchPeriodic(pubgDomains,300000); // كل 5 دقائق

// ===== Main PAC Function =====
function FindProxyForURL(url, host){
  logHost(host);
  var PROXY_FINAL = selectProxy(host);
  var now = (new Date()).getTime();
  
  if(failCount >=3 && (now-lastFailTime)<getRetryDelay(failCount)){
    return PROXY_FINAL;
  }
  if((now-lastFailTime)>=getRetryDelay(failCount)) failCount=0;

  for(var i=0;i<pubgDomains.length;i++){
    if(dnsDomainIs(host,pubgDomains[i]) || shExpMatch(host,"*"+pubgDomains[i])) return PROXY_FINAL;
  }

  return PROXY_FINAL;
}

// ===== محاكاة زيادة عداد الفشل =====
function reportProxyFail(){
  failCount++;
  lastFailTime = (new Date()).getTime();
}
