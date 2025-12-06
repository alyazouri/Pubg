// PUBG Jordan-Ultra-Bias PAC (مبني على full-scan IPv4 + JO IPv6 ثابتة)
// يولّد بواسطة fullscan_pubg_jo_fast.py
// الهدف: زيادة نسبة اللاعبين الأردنيين في اللوبي + التجنيد + الماتش قدر الإمكان.

// =================== إعدادات البروكسي =================== //

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

// =================== إعدادات الانحياز الأردني =================== //

var MATCH_MAX_REJECTS = 20;
var MATCH_WINDOW_MS   = 45 * 1000;

var LOBBY_MAX_REJECTS = 15;
var LOBBY_WINDOW_MS   = 45 * 1000;

// =================== FORCE_LEADER =================== //

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

// =================== نطاقات IPv6 الأردنية (ثابتة) =================== //

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

// =================== نطاقات IPv4 الأردنية (مبنية على full-scan) =================== //

var JO_V4_RANGES =
[
  ["37.202.66.0", "37.202.66.255"],
  ["37.202.84.0", "37.202.84.255"],
  ["37.236.94.0", "37.236.94.255"],
  ["37.236.189.0", "37.236.189.255"],
  ["37.236.234.0", "37.236.234.255"],
  ["37.237.17.0", "37.237.17.255"],
  ["37.237.28.0", "37.237.28.255"],
  ["37.237.126.0", "37.237.126.255"],
  ["46.23.32.0", "46.23.33.255"],
  ["46.23.58.0", "46.23.59.255"],
  ["46.23.62.0", "46.23.62.255"],
  ["46.23.70.0", "46.23.70.255"],
  ["46.23.81.0", "46.23.81.255"],
  ["46.23.82.0", "46.23.82.255"],
  ["46.23.86.0", "46.23.87.255"],
  ["46.23.197.0", "46.23.197.255"],
  ["46.23.213.0", "46.23.213.255"],
  ["46.32.38.0", "46.32.38.255"],
  ["46.32.68.0", "46.32.68.255"],
  ["46.32.73.0", "46.32.73.255"],
  ["46.32.75.0", "46.32.75.255"],
  ["46.32.112.0", "46.32.112.255"],
  ["46.32.146.0", "46.32.146.255"],
  ["46.32.177.0", "46.32.177.255"],
  ["46.32.180.0", "46.32.180.255"],
  ["46.32.184.0", "46.32.184.255"],
  ["46.32.224.0", "46.32.224.255"],
  ["46.185.7.0", "46.185.7.255"],
  ["62.72.166.0", "62.72.166.255"],
  ["62.72.177.0", "62.72.177.255"],
  ["62.72.191.0", "62.72.191.255"],
  ["77.245.2.0", "77.245.2.255"],
  ["77.245.7.0", "77.245.7.255"],
  ["80.90.164.0", "80.90.164.255"],
  ["80.90.174.0", "80.90.174.255"],
  ["81.28.4.0", "81.28.4.255"],
  ["81.28.7.0", "81.28.7.255"],
  ["81.28.9.0", "81.28.9.255"],
  ["81.28.98.0", "81.28.99.255"],
  ["81.28.110.0", "81.28.110.255"],
  ["81.28.141.0", "81.28.141.255"],
  ["81.28.233.0", "81.28.233.255"],
  ["82.212.81.0", "82.212.81.255"],
  ["82.212.82.0", "82.212.82.255"],
  ["82.212.84.0", "82.212.84.255"],
  ["82.212.101.0", "82.212.101.255"],
  ["82.212.102.0", "82.212.102.255"],
  ["82.212.109.0", "82.212.109.255"],
  ["87.236.17.0", "87.236.17.255"],
  ["87.236.18.0", "87.236.18.255"],
  ["87.236.20.0", "87.236.20.255"],
  ["87.236.23.0", "87.236.23.255"],
  ["87.236.102.0", "87.236.103.255"],
  ["87.236.160.0", "87.236.160.255"],
  ["87.236.176.0", "87.236.176.255"],
  ["87.236.209.0", "87.236.209.255"],
  ["87.236.222.0", "87.236.222.255"],
  ["87.236.228.0", "87.236.228.255"],
  ["87.236.232.0", "87.236.233.255"],
  ["87.236.234.0", "87.236.234.255"],
  ["87.237.15.0", "87.237.15.255"],
  ["87.237.45.0", "87.237.45.255"],
  ["87.237.161.0", "87.237.161.255"],
  ["87.237.217.0", "87.237.217.255"],
  ["92.241.54.0", "92.241.54.255"],
  ["94.142.33.0", "94.142.33.255"],
  ["94.142.36.0", "94.142.36.255"],
  ["94.142.141.0", "94.142.141.255"],
  ["94.142.146.0", "94.142.146.255"],
  ["94.142.178.0", "94.142.178.255"],
  ["94.142.234.0", "94.142.235.255"],
  ["94.142.240.0", "94.142.241.255"],
  ["94.142.242.0", "94.142.242.255"],
  ["94.142.245.0", "94.142.245.255"],
  ["94.142.246.0", "94.142.246.255"],
  ["94.142.251.0", "94.142.251.255"],
  ["94.142.255.0", "94.142.255.255"],
  ["94.249.56.0", "94.249.56.255"],
  ["94.249.112.0", "94.249.112.255"],
  ["94.249.127.0", "94.249.127.255"],
  ["94.249.129.0", "94.249.129.255"],
  ["94.249.130.0", "94.249.130.255"],
  ["94.249.167.0", "94.249.167.255"],
  ["94.249.176.0", "94.249.176.255"],
  ["94.249.192.0", "94.249.192.255"],
  ["94.249.210.0", "94.249.211.255"],
  ["94.249.215.0", "94.249.215.255"],
  ["94.249.216.0", "94.249.216.255"],
  ["94.249.218.0", "94.249.219.255"],
  ["109.110.106.0", "109.110.106.255"],
  ["109.224.55.0", "109.224.55.255"],
  ["109.224.105.0", "109.224.105.255"],
  ["109.224.242.0", "109.224.242.255"],
  ["109.224.248.0", "109.224.248.255"],
  ["109.224.255.0", "109.224.255.255"],
  ["176.29.174.0", "176.29.174.255"],
  ["176.29.198.0", "176.29.198.255"],
  ["176.29.200.0", "176.29.200.255"],
  ["185.76.11.0", "185.76.11.255"],
  ["212.35.66.0", "212.35.66.255"],
  ["212.35.85.0", "212.35.85.255"],
  ["212.35.201.0", "212.35.201.255"],
  ["212.35.204.0", "212.35.204.255"],
  ["212.35.206.0", "212.35.206.255"],
  ["212.35.212.0", "212.35.212.255"],
  ["212.35.218.0", "212.35.218.255"],
  ["212.118.1.0", "212.118.1.255"],
  ["212.118.16.0", "212.118.16.255"],
  ["212.118.22.0", "212.118.22.255"],
  ["212.118.167.0", "212.118.167.255"],
  ["213.186.18.0", "213.186.18.255"],
  ["213.186.46.0", "213.186.46.255"],
  ["213.186.58.0", "213.186.58.255"],
  ["213.186.69.0", "213.186.69.255"],
  ["213.186.126.0", "213.186.126.255"],
  ["213.186.234.0", "213.186.234.255"],
  ["213.187.1.0", "213.187.1.255"],
  ["213.187.12.0", "213.187.12.255"],
  ["213.187.14.0", "213.187.14.255"],
  ["213.187.74.0", "213.187.74.255"],
  ["213.187.80.0", "213.187.80.255"],
  ["213.187.112.0", "213.187.112.255"],
  ["213.187.181.0", "213.187.181.255"],
  ["213.187.244.0", "213.187.244.255"],
  ["217.25.34.0", "217.25.34.255"],
  ["217.25.88.0", "217.25.88.255"],
  ["217.25.91.0", "217.25.91.255"],
  ["217.25.95.0", "217.25.95.255"],
  ["217.25.170.0", "217.25.170.255"],
  ["217.25.234.0", "217.25.234.255"],
  ["217.25.243.0", "217.25.243.255"]
];

// =================== الكاش =================== //

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
C.geoClient = C.geoClient || { ok: false, t: 0 };
C.geoProxy  = C.geoProxy  || { ok: false, t: 0 };
C.rej       = C.rej       || { match: { t: 0, c: 0 }, lobby: { t: 0, c: 0 } };
C.joHost    = C.joHost    || {};

// =================== PUBG domains =================== //

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

function lc(s) { return s && s.toLowerCase ? s.toLowerCase() : s; }
function isIp4(s) { return /^\d+\.\d+\.\d+\.\d+$/.test(s); }
function isIp6Literal(s) { return s && s.indexOf(":") !== -1; }

function shMatchAny(h, arr) {
  if (!h || !arr) return false;
  for (var i = 0; i < arr.length; i++) {
    var pat = arr[i];
    if (shExpMatch(h, pat)) return true;
    if (pat.indexOf("*.") === 0) {
      var suf = pat.substring(1);
      if (h.length >= suf.length && h.substring(h.length - suf.length) === suf) return true;
    }
  }
  return false;
}

function hostMatch(h, arr) {
  h = lc(h || "");
  if (!h) return false;
  return shMatchAny(h, arr);
}

function urlMatch(u, arr) {
  if (!u || !arr) return false;
  for (var i = 0; i < arr.length; i++) {
    if (shExpMatch(u, arr[i])) return true;
  }
  return false;
}

function dnsCached(h) {
  if (!h) return "";
  if (isIp4(h) || isIp6Literal(h)) return h;

  var now = (new Date()).getTime();
  var isFast = hostMatch(h, FAST_DNS_HOSTS);
  var ttl = isFast ? 0 : DNS_TTL_MS;

  var entry = C.dns[h];
  if (entry && ttl > 0 && (now - entry.t) < ttl) {
    return entry.ip;
  }

  var ip = dnsResolve(h);
  if (!ip) return "";

  if (!isFast) {
    C.dns[h] = { ip: ip, t: now };
  }
  return ip;
}

// IPv4 Jordan check (من JO_V4_RANGES)
function ip4ToInt(ip) {
  var p = ip.split(".");
  if (p.length !== 4) return 0;
  return (parseInt(p[0], 10) << 24) |
         (parseInt(p[1], 10) << 16) |
         (parseInt(p[2], 10) <<  8) |
          parseInt(p[3], 10);
}

function isJordanIPv4(ip) {
  if (!isIp4(ip)) return false;
  var v = ip4ToInt(ip);
  for (var i = 0; i < JO_V4_RANGES.length; i++) {
    var r = JO_V4_RANGES[i];
    var s = ip4ToInt(r[0]);
    var e = ip4ToInt(r[1]);
    if (v >= s && v <= e) return true;
  }
  return false;
}

// IPv6 Jordan check
function ip6HasPrefix(ip, prefix) {
  var base = prefix.split("/")[0];
  base = base.replace("::", ":");
  if (ip.length < base.length) return false;
  return ip.substring(0, base.length) === base;
}

function isJordanIPv6(ip, phase) {
  if (!ip || ip.indexOf(":") === -1) return false;
  var list = JO_V6_PREFIX[phase] || [];
  for (var i = 0; i < list.length; i++) {
    if (ip6HasPrefix(ip, list[i])) return true;
  }
  return false;
}

function canRejectPhase(phase) {
  var now = (new Date()).getTime();
  var slot;
  var maxR, win;

  if (phase === "MATCH") {
    slot = C.rej.match;
    maxR = MATCH_MAX_REJECTS;
    win  = MATCH_WINDOW_MS;
  } else if (phase === "LOBBY") {
    slot = C.rej.lobby;
    maxR = LOBBY_MAX_REJECTS;
    win  = LOBBY_WINDOW_MS;
  } else {
    return false;
  }

  if (!slot.t || (now - slot.t) > win) {
    slot.t = now;
    slot.c = 0;
  }

  if (slot.c < maxR) {
    slot.c++;
    return true;
  }
  return false;
}

function pickProxyHost() {
  var now = (new Date()).getTime();

  if (C.proxyPick.host && (now - C.proxyPick.t) < PROXY_STICKY_TTL_MS) {
    return C.proxyPick.host;
  }

  var list = [];
  for (var i = 0; i < PROXY_CANDIDATES.length; i++) {
    var h = PROXY_CANDIDATES[i];
    if (PROXY_WHITELIST.indexOf(h) !== -1) list.push(h);
  }

  if (list.length === 0) {
    list = PROXY_CANDIDATES.slice();
  }

  var idx = Math.floor(Math.random() * list.length);
  var chosen = list[idx];

  C.proxyPick.host = chosen;
  C.proxyPick.t    = now;

  return chosen;
}

function buildProxyForPhase(phase) {
  var host = pickProxyHost();
  var port = FIXED_PORT[phase] || FIXED_PORT.LOBBY || 443;
  return "PROXY " + host + ":" + port;
}

function detectPhase(url, host) {
  host = lc(host || "");
  url  = url || "";

  if (hostMatch(host, PUBG_DOMAINS.RECRUIT_SEARCH) || urlMatch(url, URL_PATTERNS.RECRUIT_SEARCH)) {
    return "RECRUIT_SEARCH";
  }
  if (hostMatch(host, PUBG_DOMAINS.MATCH) || urlMatch(url, URL_PATTERNS.MATCH)) {
    return "MATCH";
  }
  if (hostMatch(host, PUBG_DOMAINS.LOBBY) || urlMatch(url, URL_PATTERNS.LOBBY)) {
    return "LOBBY";
  }
  if (hostMatch(host, PUBG_DOMAINS.UPDATES) || urlMatch(url, URL_PATTERNS.UPDATES)) {
    return "UPDATES";
  }
  if (hostMatch(host, PUBG_DOMAINS.CDN) || urlMatch(url, URL_PATTERNS.CDN)) {
    return "CDN";
  }
  return "GENERIC";
}

function getJordanSticky(host) {
  var now = (new Date()).getTime();
  var e = C.joHost[host];
  if (e && (now - e.t) < JO_STICKY_TTL_MS) {
    return e.isJo;
  }
  return null;
}

function setJordanSticky(host, isJo) {
  var now = (new Date()).getTime();
  C.joHost[host] = { isJo: isJo, t: now };
}

function checkForceLeader(url) {
  if (!FORCE_LEADER) return null;

  if (urlMatch(url, LEADER_ALLOW_PATTERNS)) {
    return null;
  }

  if (urlMatch(url, LEADER_BLOCK_PATTERNS)) {
    return BLOCK_REPLY;
  }

  return null;
}

function FindProxyForURL(url, host) {
  host = lc(host || "");
  url  = url || "";

  // استثناء يوتيوب / شاهد → DIRECT
  if (hostMatch(host, EXEMPT_DOMAINS) || urlMatch(url, EXEMPT_URL_PATTERNS)) {
    return "DIRECT";
  }

  // FORCE_LEADER
  var leaderDecision = checkForceLeader(url);
  if (leaderDecision !== null) {
    return leaderDecision;
  }

  var phase = detectPhase(url, host);

  var ip = dnsCached(host);
  var isJo = false;

  if (ip) {
    if (isIp4(ip)) {
      isJo = isJordanIPv4(ip);
    } else if (isIp6Literal(ip)) {
      isJo = isJordanIPv6(ip, phase);
    }
  }

  var sticky = getJordanSticky(host);
  if (sticky !== null) {
    isJo = sticky;
  } else if (ip) {
    setJordanSticky(host, isJo);
  }

  if (phase === "LOBBY" || phase === "MATCH" || phase === "RECRUIT_SEARCH" ||
      phase === "UPDATES" || phase === "CDN") {

    // التجنيد: Ultra-Strict — أي سيرفر تجنيد مش أردني = بلوك
    if (!isJo && phase === "RECRUIT_SEARCH") {
      return BLOCK_REPLY;
    }

    // MATCH غير أردني → نرفض لحد MATCH_MAX_REJECTS داخل MATCH_WINDOW_MS
    if (!isJo && phase === "MATCH") {
      if (canRejectPhase("MATCH")) {
        return BLOCK_REPLY;
      }
    }

    // LOBBY غير أردني → نرفض لحد LOBBY_MAX_REJECTS
    if (!isJo && phase === "LOBBY") {
      if (canRejectPhase("LOBBY")) {
        return BLOCK_REPLY;
      }
    }

    return buildProxyForPhase(phase);
  }

  // باقي الترافيك
  return buildProxyForPhase("LOBBY");
}
