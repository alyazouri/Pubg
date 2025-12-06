// ===================================================
//  PUBG-JO-ULTRA PAC  (نسخة صارمة لزيادة الأردنيين)
// ===================================================

//---------------- إعدادات البروكسي ----------------//

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
  CDN:            80,
  GENERIC:        443
};

// 🔥 نخلي الماتش + التجنيد يكرهوا السيرفرات غير الأردنية
var STRICT_BLOCK_PUBG_NON_JO = true;

// السيرفر الأردني نفسه: نخليه DIRECT (بينغ أقل)
var USE_PROXY_FOR_JO = false;

//---------------- نطاقات IPv6 الأردنية ----------------//

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

//---------------- نطاقات IPv4 الأردنية من الفحص ----------------//

var JO_V4_RANGES = [
  ["46.32.96.0", "46.32.97.255"],
  ["46.32.98.0", "46.32.98.255"],
  ["46.32.100.0", "46.32.101.255"],
  ["46.32.102.0", "46.32.102.255"],
  ["46.32.198.0", "46.32.198.255"],
  ["46.32.200.0", "46.32.200.255"],
  ["46.32.208.0", "46.32.208.255"],

  ["82.212.67.0", "82.212.67.255"],
  ["82.212.68.0", "82.212.68.255"],
  ["82.212.70.0", "82.212.71.255"],
  ["82.212.72.0", "82.212.79.255"],
  ["82.212.80.0", "82.212.81.255"],
  ["82.212.82.0", "82.212.82.255"],
  ["82.212.84.0", "82.212.85.255"],
  ["82.212.86.0", "82.212.86.255"],
  ["82.212.89.0", "82.212.89.255"],
  ["82.212.90.0", "82.212.91.255"],
  ["82.212.92.0", "82.212.95.255"],
  ["82.212.98.0", "82.212.98.255"],
  ["82.212.100.0", "82.212.103.255"],
  ["82.212.106.0", "82.212.107.255"],
  ["82.212.108.0", "82.212.109.255"],
  ["82.212.111.0", "82.212.111.255"],
  ["82.212.112.0", "82.212.113.255"],
  ["82.212.115.0", "82.212.115.255"],
  ["82.212.116.0", "82.212.117.255"],
  ["82.212.118.0", "82.212.118.255"],
  ["82.212.121.0", "82.212.121.255"],
  ["82.212.122.0", "82.212.123.255"],
  ["82.212.124.0", "82.212.125.255"],
  ["82.212.126.0", "82.212.126.255"],

  ["87.236.72.0", "87.236.72.255"],
  ["87.236.232.0", "87.236.235.255"],

  ["94.142.32.0", "94.142.39.255"],
  ["94.142.40.0", "94.142.41.255"],
  ["94.142.42.0", "94.142.42.255"],
  ["94.142.45.0", "94.142.45.255"],
  ["94.142.51.0", "94.142.51.255"],
  ["94.142.53.0", "94.142.53.255"],
  ["94.142.63.0", "94.142.63.255"]
];

//---------------- استثناءات (يوتيوب / شاهد / نتفلكس / سوشال) ----------------//

var EXEMPT_DOMAINS = [
  "*.youtube.com", "youtube.com", "m.youtube.com",
  "youtu.be", "*.googlevideo.com", "*.ytimg.com",

  "shahid.mbc.net", "*.shahid.mbc.net",
  "shahid.net", "*.shahid.net",

  "netflix.com", "*.netflix.com",
  "nflxvideo.net", "*.nflxvideo.net",

  "instagram.com", "*.instagram.com",
  "facebook.com", "*.facebook.com",
  "tiktok.com", "*.tiktok.com",
  "snapchat.com", "*.snapchat.com",
  "telegram.org", "*.telegram.org",
  "t.me", "*.t.me"
];

var EXEMPT_URL_PATTERNS = [
  "*://*.youtube.com/*", "*://youtube.com/*", "*://m.youtube.com/*",
  "*://youtu.be/*", "*://*.googlevideo.com/*", "*://*.ytimg.com/*",
  "*://*.shahid.mbc.net/*", "*://shahid.mbc.net/*",
  "*://*.shahid.net/*", "*://shahid.net/*",
  "*://*.netflix.com/*", "*://netflix.com/*",
  "*://*.instagram.com/*", "*://instagram.com/*",
  "*://*.facebook.com/*", "*://facebook.com/*",
  "*://*.tiktok.com/*", "*://tiktok.com/*",
  "*://*.snapchat.com/*", "*://snapchat.com/*",
  "*://*.telegram.org/*", "*://telegram.org/*", "*://t.me/*"
];

//---------------- دومينات PUBG وأنماط URL ----------------//

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

//---------------- كاش DNS وإعدادات ----------------//

var DNS_TTL_MS          = 20000;
var PROXY_STICKY_TTL_MS = 60000;

var FAST_DNS_HOSTS = [
  "*.pubgmobile.com", "*.pubgmobile.net", "*.proximabeta.com", "*.igamecj.com",
  "*.gcloud.qq.com", "gpubgm.com"
];

var _root = (typeof globalThis !== "undefined" ? globalThis : this);
if (!_root._PAC_HARDCACHE) _root._PAC_HARDCACHE = {};
var C = _root._PAC_HARDCACHE;

C.dns       = C.dns       || {};
C.proxyPick = C.proxyPick || { host: null, t: 0 };

function lc(s){ return s && s.toLowerCase ? s.toLowerCase() : s; }
function isIp4(s){ return /^\d+\.\d+\.\d+\.\d+$/.test(s); }
function isIp6Literal(s){ return s && s.indexOf(":") !== -1; }

function shMatchAny(h, arr){
  if (!h || !arr) return false;
  for (var i = 0; i < arr.length; i++){
    var pat = arr[i];
    if (shExpMatch(h, pat)) return true;
    if (pat.indexOf("*.") === 0){
      var suf = pat.substring(1);
      if (h.length >= suf.length && h.substring(h.length - suf.length) === suf) return true;
    }
  }
  return false;
}

function hostMatch(h, arr){
  h = lc(h || "");
  if (!h) return false;
  return shMatchAny(h, arr);
}

function urlMatch(u, arr){
  if (!u || !arr) return false;
  for (var i = 0; i < arr.length; i++){
    if (shExpMatch(u, arr[i])) return true;
  }
  return false;
}

function dnsCached(h){
  if (!h) return "";
  if (isIp4(h) || isIp6Literal(h)) return h;

  var now = (new Date()).getTime();
  var isFast = hostMatch(h, FAST_DNS_HOSTS);
  var ttl = isFast ? 0 : DNS_TTL_MS;

  var e = C.dns[h];
  if (e && ttl > 0 && (now - e.t) < ttl){
    return e.ip;
  }

  var ip = dnsResolve(h);
  if (!ip) return "";
  if (!isFast){
    C.dns[h] = { ip: ip, t: now };
  }
  return ip;
}

//---------------- فحص IPv4 ضمن JO_V4_RANGES ----------------//

function ip4ToInt(ip){
  var p = ip.split(".");
  if (p.length !== 4) return 0;
  return (parseInt(p[0],10)<<24)|(parseInt(p[1],10)<<16)|(parseInt(p[2],10)<<8)|parseInt(p[3],10);
}

function isJordanIPv4(ip){
  if (!isIp4(ip)) return false;
  var v = ip4ToInt(ip);
  for (var i = 0; i < JO_V4_RANGES.length; i++){
    var r = JO_V4_RANGES[i];
    var s = ip4ToInt(r[0]);
    var e = ip4ToInt(r[1]);
    if (v >= s && v <= e) return true;
  }
  return false;
}

//---------------- فحص IPv6 ضمن JO_V6_PREFIX ----------------//

function ip6HasPrefix(ip, prefix){
  var base = prefix.split("/")[0];
  base = base.replace("::", ":");
  if (ip.length < base.length) return false;
  return ip.substring(0, base.length) === base;
}

function isJordanIPv6(ip, phase){
  if (!ip || ip.indexOf(":") === -1) return false;
  var list = JO_V6_PREFIX[phase] || [];
  for (var i = 0; i < list.length; i++){
    if (ip6HasPrefix(ip, list[i])) return true;
  }
  return false;
}

//---------------- اختيار البروكسي ----------------//

function pickProxyHost(){
  var now = (new Date()).getTime();
  if (C.proxyPick.host && (now - C.proxyPick.t) < PROXY_STICKY_TTL_MS){
    return C.proxyPick.host;
  }

  var list = [];
  for (var i = 0; i < PROXY_CANDIDATES.length; i++){
    var h = PROXY_CANDIDATES[i];
    if (PROXY_WHITELIST.indexOf(h) !== -1) list.push(h);
  }
  if (list.length === 0) list = PROXY_CANDIDATES.slice();

  var idx = Math.floor(Math.random() * list.length);
  var chosen = list[idx];

  C.proxyPick.host = chosen;
  C.proxyPick.t    = now;
  return chosen;
}

function buildProxyForPhase(phase){
  var host = pickProxyHost();
  var port = FIXED_PORT[phase] || FIXED_PORT.GENERIC || 443;
  return "PROXY " + host + ":" + port + "; PROXY 212.35.66.45:" + port;
}

//---------------- تحديد المرحلة ----------------//

function detectPhase(url, host){
  host = lc(host || "");
  url  = url || "";

  if (hostMatch(host, PUBG_DOMAINS.RECRUIT_SEARCH) || urlMatch(url, URL_PATTERNS.RECRUIT_SEARCH)) return "RECRUIT_SEARCH";
  if (hostMatch(host, PUBG_DOMAINS.MATCH)          || urlMatch(url, URL_PATTERNS.MATCH))         return "MATCH";
  if (hostMatch(host, PUBG_DOMAINS.LOBBY)          || urlMatch(url, URL_PATTERNS.LOBBY))         return "LOBBY";
  if (hostMatch(host, PUBG_DOMAINS.UPDATES)        || urlMatch(url, URL_PATTERNS.UPDATES))       return "UPDATES";
  if (hostMatch(host, PUBG_DOMAINS.CDN)            || urlMatch(url, URL_PATTERNS.CDN))           return "CDN";

  return "GENERIC";
}

//---------------- الدالة الرئيسية ----------------//

function FindProxyForURL(url, host){
  host = lc(host || "");
  url  = url || "";

  // 1) استثناءات (يوتيوب / شاهد / نتفلكس / سوشال)
  if (hostMatch(host, EXEMPT_DOMAINS) || urlMatch(url, EXEMPT_URL_PATTERNS)){
    return "DIRECT";
  }

  // 2) تحديد المرحلة
  var phase = detectPhase(url, host);

  // 3) غير PUBG → يمشي عبر البروكسي الأردني
  if (phase === "GENERIC"){
    return buildProxyForPhase("GENERIC");
  }

  // 4) PUBG: نحاول نعرف هل السيرفر أردني
  var ip = dnsCached(host);
  if (!ip){
    return buildProxyForPhase(phase);
  }

  var isJo = false;
  if (isIp4(ip)){
    isJo = isJordanIPv4(ip);
  } else if (isIp6Literal(ip)){
    isJo = isJordanIPv6(ip, phase);
  }

  // 5) منطق الماتش + التجنيد (ألترا ستريكت)
  if (phase === "MATCH" || phase === "RECRUIT_SEARCH"){
    if (isJo){
      // سيرفر أردني فعلي
      return USE_PROXY_FOR_JO ? buildProxyForPhase(phase) : "DIRECT";
    } else {
      // أي سيرفر مش أردني → نحاول نخنقه
      if (STRICT_BLOCK_PUBG_NON_JO){
        // بلوك كامل عشان اللعبة تعيد البحث
        return "PROXY 0.0.0.0:0";
      } else {
        return buildProxyForPhase(phase);
      }
    }
  }

  // 6) اللوبي
  if (phase === "LOBBY"){
    if (isJo){
      return USE_PROXY_FOR_JO ? buildProxyForPhase("LOBBY") : "DIRECT";
    } else {
      return buildProxyForPhase("LOBBY");
    }
  }

  // 7) التحديثات/CDN → نخليها DIRECT عشان التحميل
  if (phase === "UPDATES" || phase === "CDN"){
    return "DIRECT";
  }

  return "DIRECT";
}
