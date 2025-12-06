// =========================================================
//  PUBG-JO-ULTRA-BIAS — FINAL
//  الهدف: زيادة احتمال اللاعبين الأردنيين في اللوبي / الماتش / التجنيد
//  كل شيء يمر عبر بروكسي أردني (ما عدا يوتيوب / شاهد).
// =========================================================

//------------- إعدادات البروكسي -------------//

var PROXY_CANDIDATES = [
  "91.106.109.12",
  "212.35.66.45"
];

var PROXY_WHITELIST = [
  "91.106.109.12",
  "212.35.66.45"
];

var FIXED_PORT = {
  LOBBY:          443,
  MATCH:          20001,
  RECRUIT_SEARCH: 443,
  UPDATES:        80,
  CDN:            80
};

var BLOCK_REPLY = "PROXY 0.0.0.0:0";

//------------- إعدادات الانحياز الأردني -------------//

// نرفض عدد معيّن من السيرفرات غير الأردنية قبل ما نسمح عشان ما يعلّق الماتش.
var MATCH_MAX_REJECTS = 20;
var MATCH_WINDOW_MS   = 45 * 1000;

var LOBBY_MAX_REJECTS = 15;
var LOBBY_WINDOW_MS   = 45 * 1000;

//------------- FORCE_LEADER -------------//

var FORCE_LEADER = true;

var LEADER_BLOCK_PATTERNS = [
  "*/quickjoin*", "*/quick_join*", "*/auto_match*", "*/autoMatch*",
  "*/invite/accept*", "*/invite/agree*",
  "*/teamfinder/*/join*", "*/teamfinder/join*",
  "*/team/join*", "*/squad/join*", "*/join_team*"
];

var LEADER_ALLOW_PATTERNS = [
  "*/team/create*", "*/team/code/*", "*/invite/send*", "*/publish*",
  "*/teamfinder/*/create*", "*/teamfinder/create*",
  "*/recruit/*/create*", "*/team/publish*"
];

//------------- نطاقات IPv6 الأردنية -------------//

var JO_V6_PREFIX = {
  LOBBY: [
    "2a03:b640::/32",
    "2a03:6b00::/29",
    "2a00:18d8::/29",
    "2a00:18d0::/29",
    "2a00:caa0::/32",
    "2001:32c0::/29",
    "2a00:4620::/32",
    "2a00:76e0::/32",
    "2a00:b860::/32"
  ],
  MATCH: [
    "2a03:b640::/32",
    "2a03:6b00::/29",
    "2a00:18d8::/29",
    "2a00:18d0::/29",
    "2a00:caa0::/32",
    "2001:32c0::/29",
    "2a00:4620::/32",
    "2a00:76e0::/32",
    "2a00:b860::/32"
  ],
  RECRUIT_SEARCH: [
    "2a03:b640::/32",
    "2a03:6b00::/29",
    "2a00:18d8::/29",
    "2a00:18d0::/29",
    "2a00:caa0::/32",
    "2001:32c0::/29",
    "2a00:4620::/32",
    "2a00:76e0::/32",
    "2a00:b860::/32"
  ],
  UPDATES: [
    "2a03:b640::/32",
    "2a03:6b00::/29",
    "2a00:18d8::/29",
    "2a00:18d0::/29",
    "2a00:caa0::/32",
    "2001:32c0::/29",
    "2a00:4620::/32",
    "2a00:76e0::/32",
    "2a00:b860::/32"
  ],
  CDN: [
    "2a03:b640::/32",
    "2a03:6b00::/29",
    "2a00:18d8::/29",
    "2a00:18d0::/29",
    "2a00:caa0::/32",
    "2001:32c0::/29",
    "2a00:4620::/32",
    "2a00:76e0::/32",
    "2a00:b860::/32"
  ]
};

//------------- نطاقات IPv4 الأردنية (رئيسية/تقريبية) -------------//

var JO_V4_RANGES = [
  ["46.32.0.0",   "46.32.255.255"],
  ["46.185.0.0",  "46.185.255.255"],
  ["82.212.64.0", "82.212.127.255"],
  ["87.236.0.0",  "87.236.255.255"],
  ["87.237.0.0",  "87.237.255.255"],
  ["94.142.0.0",  "94.142.255.255"],
  ["109.110.0.0", "109.110.255.255"],
  ["109.224.0.0", "109.224.255.255"],
  ["188.123.160.0","188.123.191.255"],

  ["37.236.0.0",  "37.236.255.255"],
  ["37.237.0.0",  "37.237.255.255"],
  ["81.28.0.0",   "81.28.255.255"],
  ["212.118.0.0", "212.118.255.255"],
  ["94.249.0.0",  "94.249.255.255"],

  ["176.29.0.0",  "176.29.255.255"],
  ["95.172.192.0","95.172.223.255"],
  ["92.241.32.0", "92.241.63.255"],
  ["109.107.224.0","109.107.255.255"],
  ["212.35.0.0",  "212.35.255.255"],

  ["46.23.0.0",   "46.23.255.255"],
  ["46.248.192.0","46.248.223.255"],
  ["178.238.176.0","178.238.191.255"],

  ["217.25.0.0",  "217.25.255.255"],
  ["213.186.0.0", "213.186.255.255"],
  ["213.187.0.0", "213.187.255.255"],
  ["185.80.104.0","185.80.107.255"],
  ["185.140.248.0","185.140.251.255"],
  ["185.110.52.0","185.110.55.255"],
  ["185.88.176.0","185.88.179.255"],
  ["185.76.8.0",  "185.76.11.255"],

  ["80.90.160.0", "80.90.175.255"],
  ["77.245.0.0",  "77.245.15.255"],
  ["5.45.128.0",  "5.45.143.255"],
  ["37.17.192.0", "37.17.207.255"],
  ["37.123.64.0", "37.123.95.255"],
  ["37.202.64.0", "37.202.127.255"],
  ["37.220.112.0","37.220.127.255"],
  ["46.23.112.0", "46.23.127.255"],
  ["46.32.96.0",  "46.32.127.255"],
  ["62.72.160.0", "62.72.191.255"],
  ["79.134.128.0","79.134.159.255"],
  ["79.173.192.0","79.173.255.255"],
  ["81.21.0.0",   "81.21.15.255"],
  ["85.159.216.0","85.159.223.255"]
];

//------------- الكاش -------------//

var DNS_TTL_MS          = 20 * 1000;
var PROXY_STICKY_TTL_MS = 60 * 1000;
var GEO_TTL_MS          = 60 * 60 * 1000;
var JO_STICKY_TTL_MS    = 10 * 60 * 1000;

var FAST_DNS_HOSTS = [
  "*.pubgmobile.com", "*.pubgmobile.net", "*.proximabeta.com", "*.igamecj.com",
  "*.gcloud.qq.com", "gpubgm.com"
];

// استثناء يوتيوب / شاهد
var EXEMPT_DOMAINS = [
  "*.youtube.com",
  "youtube.com",
  "m.youtube.com",
  "youtu.be",
  "*.googlevideo.com",
  "*.ytimg.com",
  "*.youtube-nocookie.com",
  "*.yt3.ggpht.com",
  "shahid.mbc.net",
  "*.shahid.mbc.net",
  "shahid.net",
  "*.shahid.net"
];

var EXEMPT_URL_PATTERNS = [
  "*://*.youtube.com/*",
  "*://youtube.com/*",
  "*://m.youtube.com/*",
  "*://youtu.be/*",
  "*://*.googlevideo.com/*",
  "*://*.shahid.mbc.net/*",
  "*://shahid.mbc.net/*",
  "*://*.shahid.net/*",
  "*://shahid.net/*"
];

var _root = (typeof globalThis !== "undefined" ? globalThis : this);
if (!_root._PAC_HARDCACHE) _root._PAC_HARDCACHE = {};
var C = _root._PAC_HARDCACHE;

C.dns       = C.dns       || {};
C.proxyPick = C.proxyPick || { host: null, t: 0 };
C.rej       = C.rej       || { match: { t: 0, c: 0 }, lobby: { t: 0, c: 0 } };
C.joHost    = C.joHost    || {};

//------------- PUBG domains -------------//

var PUBG_DOMAINS = {
  LOBBY:          ["*.pubgmobile.com", "*.pubgmobile.net", "*.proximabeta.com", "*.igamecj.com"],
  MATCH:          ["*.gcloud.qq.com", "gpubgm.com"],
  RECRUIT_SEARCH: ["match.igamecj.com", "match.proximabeta.com", "teamfinder.igamecj.com", "teamfinder.proximabeta.com"],
  UPDATES:        ["cdn.pubgmobile.com", "updates.pubgmobile.com", "patch.igamecj.com", "hotfix.proximabeta.com", "dlied1.qq.com", "dlied2.qq.com", "gpubgm.com"],
  CDN:            ["cdn.igamecj.com", "cdn.proximabeta.com", "cdn.tencentgames.com", "*.qcloudcdn.com", "*.cloudfront.net", "*.edgesuite.net"]
};

var URL_PATTERNS = {
  LOBBY:          ["*/account/login*", "*/client/version*", "*/status/heartbeat*", "*/presence/*", "*/friends/*"],
  MATCH:          ["*/matchmaking/*", "*/mms/*", "*/game/start*", "*/game/join*", "*/report/battle*"],
  RECRUIT_SEARCH: ["*/teamfinder/*", "*/clan/*", "*/social/*", "*/search/*", "*/recruit/*", "*/recruit/search*", "*/team/invite*", "*/clan/join*"],
  UPDATES:        ["*/patch*", "*/hotfix*", "*/update*", "*/download*", "*/assets/*", "*/assetbundle*", "*/obb*"],
  CDN:            ["*/cdn/*", "*/static/*", "*/media/*"]
};

//------------- دوال مساعدة -------------//

function lc(s){return s && s.toLowerCase ? s.toLowerCase() : s;}
function isIp4(s){return /^\\d+\\.\\d+\\.\\d+\\.\\d+$/.test(s);}
function isIp6Literal(s){return s && s.indexOf(":") !== -1;}

function shMatchAny(h, arr){
  if(!h || !arr) return false;
  for(var i=0;i<arr.length;i++){
    var pat = arr[i];
    if(shExpMatch(h, pat)) return true;
    if(pat.indexOf("*.") === 0){
      var suf = pat.substring(1);
      if(h.length >= suf.length && h.substring(h.length - suf.length) === suf) return true;
    }
  }
  return false;
}

function hostMatch(h, arr){
  h = lc(h || "");
  if(!h) return false;
  return shMatchAny(h, arr);
}

function urlMatch(u, arr){
  if(!u || !arr) return false;
  for(var i=0;i<arr.length;i++){
    if(shExpMatch(u, arr[i])) return true;
  }
  return false;
}

function dnsCached(h){
  if(!h) return "";
  if(isIp4(h) || isIp6Literal(h)) return h;

  var now = (new Date()).getTime();
  var isFast = hostMatch(h, FAST_DNS_HOSTS);
  var ttl = isFast ? 0 : DNS_TTL_MS;

  var entry = C.dns[h];
  if(entry && ttl > 0 && (now - entry.t) < ttl){
    return entry.ip;
  }

  var ip = dnsResolve(h);
  if(!ip) return "";

  if(!isFast){
    C.dns[h] = { ip: ip, t: now };
  }
  return ip;
}

// IPv4 Jordan check
function ip4ToInt(ip){
  var p = ip.split(".");
  if(p.length !== 4) return 0;
  return (parseInt(p[0],10)<<24)|(parseInt(p[1],10)<<16)|(parseInt(p[2],10)<<8)|parseInt(p[3],10);
}

function isJordanIPv4(ip){
  if(!isIp4(ip)) return false;
  var v = ip4ToInt(ip);
  for(var i=0;i<JO_V4_RANGES.length;i++){
    var r = JO_V4_RANGES[i];
    var s = ip4ToInt(r[0]);
    var e = ip4ToInt(r[1]);
    if(v>=s && v<=e) return true;
  }
  return false;
}

// IPv6 Jordan check
function ip6HasPrefix(ip, prefix){
  var base = prefix.split("/")[0];
  base = base.replace("::", ":");
  if(ip.length < base.length) return false;
  return ip.substring(0, base.length) === base;
}

function isJordanIPv6(ip, phase){
  if(!ip || ip.indexOf(":") === -1) return false;
  var list = JO_V6_PREFIX[phase] || [];
  for(var i=0;i<list.length;i++){
    if(ip6HasPrefix(ip, list[i])) return true;
  }
  return false;
}

// عدّاد الرفض
function canRejectPhase(phase){
  var now = (new Date()).getTime();
  var slot, maxR, win;

  if(phase==="MATCH"){
    slot = C.rej.match;
    maxR = MATCH_MAX_REJECTS;
    win  = MATCH_WINDOW_MS;
  }else if(phase==="LOBBY"){
    slot = C.rej.lobby;
    maxR = LOBBY_MAX_REJECTS;
    win  = LOBBY_WINDOW_MS;
  }else{
    return false;
  }

  if(!slot.t || (now - slot.t) > win){
    slot.t = now;
    slot.c = 0;
  }

  if(slot.c < maxR){
    slot.c++;
    return true;
  }
  return false;
}

// اختيار بروكسي
function pickProxyHost(){
  var now = (new Date()).getTime();

  if(C.proxyPick.host && (now - C.proxyPick.t) < PROXY_STICKY_TTL_MS){
    return C.proxyPick.host;
  }

  var list = [];
  for(var i=0;i<PROXY_CANDIDATES.length;i++){
    var h = PROXY_CANDIDATES[i];
    if(PROXY_WHITELIST.indexOf(h)!==-1) list.push(h);
  }
  if(list.length===0) list = PROXY_CANDIDATES.slice();

  var idx = Math.floor(Math.random()*list.length);
  var chosen = list[idx];
  C.proxyPick.host = chosen;
  C.proxyPick.t    = now;
  return chosen;
}

function buildProxyForPhase(phase){
  var host = pickProxyHost();
  var port = FIXED_PORT[phase] || FIXED_PORT.LOBBY || 443;
  return "PROXY "+host+":"+port;
}

// تحديد المرحلة
function detectPhase(url, host){
  host = lc(host || "");
  url  = url || "";

  if(hostMatch(host, PUBG_DOMAINS.RECRUIT_SEARCH) || urlMatch(url, URL_PATTERNS.RECRUIT_SEARCH)){return "RECRUIT_SEARCH";}
  if(hostMatch(host, PUBG_DOMAINS.MATCH)          || urlMatch(url, URL_PATTERNS.MATCH))         {return "MATCH";}
  if(hostMatch(host, PUBG_DOMAINS.LOBBY)          || urlMatch(url, URL_PATTERNS.LOBBY))         {return "LOBBY";}
  if(hostMatch(host, PUBG_DOMAINS.UPDATES)        || urlMatch(url, URL_PATTERNS.UPDATES))       {return "UPDATES";}
  if(hostMatch(host, PUBG_DOMAINS.CDN)            || urlMatch(url, URL_PATTERNS.CDN))           {return "CDN";}
  return "GENERIC";
}

// sticky per-host
function getJordanSticky(host){
  var now = (new Date()).getTime();
  var e = C.joHost[host];
  if(e && (now - e.t) < JO_STICKY_TTL_MS) return e.isJo;
  return null;
}

function setJordanSticky(host, isJo){
  var now = (new Date()).getTime();
  C.joHost[host] = { isJo:isJo, t:now };
}

// FORCE_LEADER
function checkForceLeader(url){
  if(!FORCE_LEADER) return null;
  if(urlMatch(url, LEADER_ALLOW_PATTERNS)) return null;
  if(urlMatch(url, LEADER_BLOCK_PATTERNS)) return BLOCK_REPLY;
  return null;
}

//------------- FindProxyForURL -------------//

function FindProxyForURL(url, host){
  host = lc(host || "");
  url  = url || "";

  // استثناء يوتيوب / شاهد
  if(hostMatch(host, EXEMPT_DOMAINS) || urlMatch(url, EXEMPT_URL_PATTERNS)){
    return "DIRECT";
  }

  // FORCE_LEADER
  var leaderDecision = checkForceLeader(url);
  if(leaderDecision !== null){
    return leaderDecision;
  }

  var phase = detectPhase(url, host);

  var ip = dnsCached(host);
  var isJo = false;

  if(ip){
    if(isIp4(ip)){
      isJo = isJordanIPv4(ip);
    }else if(isIp6Literal(ip)){
      isJo = isJordanIPv6(ip, phase);
    }
  }

  var sticky = getJordanSticky(host);
  if(sticky !== null){
    isJo = sticky;
  }else if(ip){
    setJordanSticky(host, isJo);
  }

  if(phase==="LOBBY" || phase==="MATCH" || phase==="RECRUIT_SEARCH" || phase==="UPDATES" || phase==="CDN"){

    // التجنيد: Ultra-Strict — أي سيرفر تجنيد غير أردني → بلوك نهائي
    if(!isJo && phase==="RECRUIT_SEARCH"){
      return BLOCK_REPLY;
    }

    // MATCH: نرفض سيرفرات غير أردنية لحد حد معيّن
    if(!isJo && phase==="MATCH"){
      if(canRejectPhase("MATCH")){
        return BLOCK_REPLY;
      }
    }

    // LOBBY: نرفض شوية لحد ما نلاقي أردني، بعدين نسمح عشان ما يعلّق
    if(!isJo && phase==="LOBBY"){
      if(canRejectPhase("LOBBY")){
        return BLOCK_REPLY;
      }
    }

    return buildProxyForPhase(phase);
  }

  // باقي الترافيك → عبر بروكسي أردني برضه
  return buildProxyForPhase("LOBBY");
}
