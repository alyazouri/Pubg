// ===================================================
//  PUBG-JO-ULTRA PAC — Adaptive Route (v3+
//  - يفضّل السيرفرات الأردنية (JO IPv4/IPv6)
//  - MATCH / RECRUIT_SEARCH: منطق متكيّف (Adaptive)
//    • في البداية: بلوك للسيرفرات غير الأردنية → PUBG تعيد البحث
//    • بعد عدد معين من المحاولات: يمرر via PROXY عشان ما تعلق
//  - الإنترنت العام: عبر البروكسي الأردني (مع استثناء يوتيوب/شاهد/نتفلكس/سوشال)
//  - النطاقات محدثة بكل ما استخرجناه (Orange / Zain / Umniah / JDC / Vtel + نطاقاتك القديمة).
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

// السيرفر الأردني نفسه: نخليه DIRECT (بينغ أقل)
var USE_PROXY_FOR_JO = false;

// إعدادات الـ Adaptive لكل طور
var ADAPTIVE_CFG = {
  MATCH: {
    blockTries: 3,
    proxyTries: 8,
    windowMs:  60000
  },
  RECRUIT_SEARCH: {
    blockTries: 2,
    proxyTries: 6,
    windowMs:  60000
  }
};

//---------------- نطاقات IPv6 الأردنية (كل اللي استخرجناهم) ----------------//

var JO_V6_PREFIX = {
  LOBBY: [
    // Orange
    "2a00:18d8::/29",
    "2a00:18d8:40::/44",
    "2a00:18d8:50::/44",
    "2a00:18d8:80::/44",
    "2a00:18d8:90::/44",
    "2a00:18d8:100::/44",
    "2a00:18d8:110::/44",

    // Zain / Batelco
    "2a03:b640::/32",

    // Umniah
    "2a03:6b00::/29",
    "2a05:7500::/29",
    "2a00:4620::/32",

    // GO / Batelco / Mada / JDC allocations اللي كنت تستخدمهم
    "2a00:18d0::/29",
    "2a00:caa0::/32",
    "2001:32c0::/29",
    "2a00:76e0::/32",
    "2a00:b860::/32",

    // JDC
    "2a01:9700::/29",

    // Vtel
    "2a01:1d0::/29",
    "2a0a:2740::/29",

    // Mauve (AS48821)
    "2a07:a40::/29"
  ],
  MATCH: [
    "2a00:18d8::/29",
    "2a00:18d8:40::/44",
    "2a00:18d8:50::/44",
    "2a00:18d8:80::/44",
    "2a00:18d8:90::/44",
    "2a00:18d8:100::/44",
    "2a00:18d8:110::/44",
    "2a03:b640::/32",
    "2a03:6b00::/29",
    "2a05:7500::/29",
    "2a00:4620::/32",
    "2a00:18d0::/29",
    "2a00:caa0::/32",
    "2001:32c0::/29",
    "2a00:76e0::/32",
    "2a00:b860::/32",
    "2a01:9700::/29",
    "2a01:1d0::/29",
    "2a0a:2740::/29",
    "2a07:a40::/29"
  ],
  RECRUIT_SEARCH: [
    "2a00:18d8::/29",
    "2a00:18d8:40::/44",
    "2a00:18d8:50::/44",
    "2a00:18d8:80::/44",
    "2a00:18d8:90::/44",
    "2a00:18d8:100::/44",
    "2a00:18d8:110::/44",
    "2a03:b640::/32",
    "2a03:6b00::/29",
    "2a05:7500::/29",
    "2a00:4620::/32",
    "2a00:18d0::/29",
    "2a00:caa0::/32",
    "2001:32c0::/29",
    "2a00:76e0::/32",
    "2a00:b860::/32",
    "2a01:9700::/29",
    "2a01:1d0::/29",
    "2a0a:2740::/29",
    "2a07:a40::/29"
  ],
  UPDATES: [
    "2a00:18d8::/29",
    "2a00:18d8:40::/44",
    "2a00:18d8:50::/44",
    "2a00:18d8:80::/44",
    "2a00:18d8:90::/44",
    "2a00:18d8:100::/44",
    "2a00:18d8:110::/44",
    "2a03:b640::/32",
    "2a03:6b00::/29",
    "2a05:7500::/29",
    "2a00:4620::/32",
    "2a00:18d0::/29",
    "2a00:caa0::/32",
    "2001:32c0::/29",
    "2a00:76e0::/32",
    "2a00:b860::/32",
    "2a01:9700::/29",
    "2a01:1d0::/29",
    "2a0a:2740::/29",
    "2a07:a40::/29"
  ],
  CDN: [
    "2a00:18d8::/29",
    "2a00:18d8:40::/44",
    "2a00:18d8:50::/44",
    "2a00:18d8:80::/44",
    "2a00:18d8:90::/44",
    "2a00:18d8:100::/44",
    "2a00:18d8:110::/44",
    "2a03:b640::/32",
    "2a03:6b00::/29",
    "2a05:7500::/29",
    "2a00:4620::/32",
    "2a00:18d0::/29",
    "2a00:caa0::/32",
    "2001:32c0::/29",
    "2a00:76e0::/32",
    "2a00:b860::/32",
    "2a01:9700::/29",
    "2a01:1d0::/29",
    "2a0a:2740::/29",
    "2a07:a40::/29"
  ]
};

//---------------- نطاقات IPv4 الأردنية (كل اللي استخرجناهم + القديم) ----------------//
// ملاحظة: الآن النطاقات بصيغة CIDR، وتم تعديل isJordanIPv4 ليتعامل معها.

var JO_V4_RANGES = [
  // AS8697 – Orange / JTC
  "212.34.0.0/19",
  "213.139.32.0/19",
  "2.17.24.0/22",
  "149.200.255.0/24",
  "37.202.64.0/18",
  "94.249.48.0/24",
  "185.98.220.0/22",
  "80.10.64.0/20",

  // Zain – AS48832
  "188.247.64.0/19",

  // Umniah – AS198799 / AS9038
  "85.159.216.0/21",
  "185.80.104.0/22",
  "178.238.176.0/20",
  "141.105.56.0/21",
  "37.44.32.0/21",
  "37.152.0.0/21",
  "5.45.128.0/20",
  "185.19.112.0/22",

  // JDC – AS8376
  "92.253.8.0/21",
  "86.108.28.0/22",
  "86.108.48.0/22",
  "86.108.60.0/22",
  "94.249.84.0/22",

  // VTEL / مزودين ثانويين
  "81.21.0.0/20",
  "62.72.160.0/19",
  "109.237.192.0/20",
  "178.20.184.0/21",
  "176.57.48.0/20",
  "176.241.64.0/21",
  "185.51.212.0/22",
  "185.193.176.0/22",

  // AS48821 – Mauve
  "45.159.32.0/22",
  "185.138.52.0/22",

  // AS42637 – LAN CONNECT
  "86.106.133.0/24",

  // AS50717 – Fortis / others
  "91.229.202.0/23",
  "195.191.250.0/23",

  // النطاقات القديمة اللي كنت حاطهم (46.32 / 82.212 / 87.236 / 94.142 ...)
  "46.32.96.0/23",
  "46.32.98.0/24",
  "46.32.100.0/23",
  "46.32.102.0/24",
  "46.32.198.0/24",
  "46.32.200.0/24",
  "46.32.208.0/24",

  "82.212.67.0/24",
  "82.212.68.0/24",
  "82.212.70.0/23",
  "82.212.72.0/21",
  "82.212.80.0/23",
  "82.212.82.0/24",
  "82.212.84.0/23",
  "82.212.86.0/24",
  "82.212.89.0/24",
  "82.212.90.0/23",
  "82.212.92.0/22",
  "82.212.98.0/24",
  "82.212.100.0/22",
  "82.212.106.0/23",
  "82.212.108.0/23",
  "82.212.111.0/24",
  "82.212.112.0/23",
  "82.212.115.0/24",
  "82.212.116.0/23",
  "82.212.118.0/24",
  "82.212.121.0/24",
  "82.212.122.0/23",
  "82.212.124.0/23",
  "82.212.126.0/24",

  "87.236.72.0/24",
  "87.236.232.0/22",

  "94.142.32.0/21",
  "94.142.40.0/23",
  "94.142.42.0/24",
  "94.142.45.0/24",
  "94.142.51.0/24",
  "94.142.53.0/24",
  "94.142.63.0/24"
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
C.adaptive  = C.adaptive  || {
  MATCH:          { tries: 0, joHits: 0, lastReset: 0 },
  RECRUIT_SEARCH: { tries: 0, joHits: 0, lastReset: 0 }
};

//---------------- دوال مساعدة ----------------//

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

// IPv4 → int (unsigned)
function ip4ToInt(ip){
  var p = ip.split(".");
  if (p.length !== 4) return 0;
  var n = ( (parseInt(p[0],10)<<24) >>> 0 ) |
          ( (parseInt(p[1],10)<<16) >>> 0 ) |
          ( (parseInt(p[2],10)<<8)  >>> 0 ) |
          (  parseInt(p[3],10)      >>> 0 );
  return n >>> 0;
}

// فحص IP داخل CIDR
function cidr4Contains(cidr, ip){
  var parts = cidr.split("/");
  if (parts.length !== 2) return false;
  var net = parts[0];
  var len = parseInt(parts[1],10);
  if (isNaN(len) || len < 0 || len > 32) return false;

  var mask = len === 0 ? 0 : (~0 << (32 - len)) >>> 0;
  var ipInt  = ip4ToInt(ip);
  var netInt = ip4ToInt(net);
  return (ipInt & mask) === (netInt & mask);
}

function isJordanIPv4(ip){
  if (!isIp4(ip)) return false;
  for (var i = 0; i < JO_V4_RANGES.length; i++){
    if (cidr4Contains(JO_V4_RANGES[i], ip)) return true;
  }
  return false;
}

// IPv6 prefix check (تقريبية لكن كافية للمسارات المزودة)
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

// اختيار البروكسي وتثبيته شوي
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

// تحديد المرحلة (LOBBY / MATCH / RECRUIT / UPDATES / CDN / GENERIC)
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

//---------------- منطق Adaptive للماتش / التجنيد ----------------//

function adaptiveDecision(phase, isJo){
  var now = (new Date()).getTime();
  var cfg = ADAPTIVE_CFG[phase];
  if (!cfg) {
    return isJo
      ? (USE_PROXY_FOR_JO ? buildProxyForPhase(phase) : "DIRECT")
      : buildProxyForPhase(phase);
  }

  var st = C.adaptive[phase];
  if (!st){
    st = { tries: 0, joHits: 0, lastReset: now };
    C.adaptive[phase] = st;
  }

  if ((now - st.lastReset) > cfg.windowMs){
    st.tries = 0;
    st.joHits = 0;
    st.lastReset = now;
  }

  if (isJo){
    st.joHits++;
    st.tries = 0;
    st.lastReset = now;
    return USE_PROXY_FOR_JO ? buildProxyForPhase(phase) : "DIRECT";
  } else {
    st.tries++;
    st.lastReset = now;

    if (st.tries <= cfg.blockTries){
      return "PROXY 0.0.0.0:0";
    } else if (st.tries <= cfg.proxyTries){
      return buildProxyForPhase(phase);
    } else {
      return buildProxyForPhase(phase);
    }
  }
}

//---------------- الدالة الرئيسية ----------------//

function FindProxyForURL(url, host){
  host = lc(host || "");
  url  = url || "";

  // 1) استثناءات يوتيوب / شاهد / نتفلكس / سوشال → DIRECT
  if (hostMatch(host, EXEMPT_DOMAINS) || urlMatch(url, EXEMPT_URL_PATTERNS)){
    return "DIRECT";
  }

  // 2) تحديد المرحلة
  var phase = detectPhase(url, host);

  // 3) غير PUBG → كله عبر البروكسي الأردني
  if (phase === "GENERIC"){
    return buildProxyForPhase("GENERIC");
  }

  // 4) UPDATES / CDN → نخليها DIRECT عشان التحميل
  if (phase === "UPDATES" || phase === "CDN"){
    return "DIRECT";
  }

  // 5) للـ PUBG (LOBBY / MATCH / RECRUIT): نجرب نعرف هل السيرفر أردني
  var ip = dnsCached(host);
  if (!ip){
    if (phase === "MATCH" || phase === "RECRUIT_SEARCH"){
      return adaptiveDecision(phase, false);
    }
    if (phase === "LOBBY"){
      return buildProxyForPhase("LOBBY");
    }
    return buildProxyForPhase("GENERIC");
  }

  var isJo = false;
  if (isIp4(ip)){
    isJo = isJordanIPv4(ip);
  } else if (isIp6Literal(ip)){
    isJo = isJordanIPv6(ip, phase);
  }

  if (phase === "MATCH" || phase === "RECRUIT_SEARCH"){
    return adaptiveDecision(phase, isJo);
  }

  if (phase === "LOBBY"){
    if (isJo){
      return USE_PROXY_FOR_JO ? buildProxyForPhase("LOBBY") : "DIRECT";
    } else {
      return buildProxyForPhase("LOBBY");
    }
  }

  return buildProxyForPhase("GENERIC");
}
