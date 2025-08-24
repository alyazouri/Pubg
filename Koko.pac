function FindProxyForURL(url, host) {
    var proxyList = [];

    // كلاسيك 10012–10039
    for (var p = 10012; p <= 10039; p++) {
        proxyList.push("PROXY 149.200.244.100:" + p);
    }

    // TDM / المستودع 14000–18000
    for (var p = 14000; p <= 18000; p++) {
        proxyList.push("PROXY 149.200.244.100:" + p);
    }

    // البحث و التجنيد 20000–20002
    for (var p = 20000; p <= 20002; p++) {
        proxyList.push("PROXY 149.200.244.100:" + p);
    }

    var proxy = proxyList.join("; ");

    // استثناء الفيديوهات
    if (shExpMatch(url, "*.mp4*") ||
        shExpMatch(url, "*.m3u8*") ||
        shExpMatch(url, "*.avi*") ||
        shExpMatch(url, "*.mov*") ||
        shExpMatch(url, "*.mkv*") ||
        shExpMatch(url, "*.flv*")) {
        return "DIRECT";
    }

    // استثناء YouTube
    if (dnsDomainIs(host, "youtube.com") ||
        dnsDomainIs(host, "www.youtube.com") ||
        dnsDomainIs(host, "ytimg.com") ||
        dnsDomainIs(host, "googlevideo.com")) {
        return "DIRECT";
    }

    // استثناء Twitter
    if (dnsDomainIs(host, "twitter.com") ||
        dnsDomainIs(host, "www.twitter.com") ||
        dnsDomainIs(host, "t.co")) {
        return "DIRECT";
    }

    // استثناء Gmail
    if (dnsDomainIs(host, "gmail.com") ||
        dnsDomainIs(host, "mail.google.com")) {
        return "DIRECT";
    }

    // باقي الإنترنت يروح عبر البورتات المحددة
    return proxy;
}
