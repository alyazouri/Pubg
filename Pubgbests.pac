function FindProxyForURL(url, host) {
    host = host.toLowerCase();

    // نطاقات وخدمات PUBG الكاملة
    if (
        dnsDomainIs(host, "pubgmobile.com") ||
        dnsDomainIs(host, "pubg.com") ||
        shExpMatch(host, "*.pubgmobile.com") ||
        shExpMatch(host, "*.pubg.com") ||
        shExpMatch(host, "*.qos-oversea.com") ||
        shExpMatch(host, "*.igamecj.com") ||
        shExpMatch(host, "*.tencent.com") ||
        shExpMatch(host, "*.qcloudcdn.com") ||
        shExpMatch(host, "*.cloudfront.net") ||
        shExpMatch(host, "*.akamaized.net") ||
        shExpMatch(host, "*.amazonaws.com") ||
        shExpMatch(host, "*.googleapis.com") ||
        shExpMatch(host, "*.gstatic.com") ||
        shExpMatch(host, "*.facebook.com") ||
        shExpMatch(host, "*.graph.facebook.com") ||
        shExpMatch(host, "*.line.me") ||
        shExpMatch(host, "*.gameflier.com") ||
        shExpMatch(host, "*.midasbuy.com") ||
        shExpMatch(host, "*.cdn-go.cn") ||
        shExpMatch(host, "*.cdn.pubgmobile.com")
    ) {
        return "PROXY 91.106.109.28:8080; PROXY 91.106.109.28:443; PROXY 91.106.109.28:80; DIRECT";
    }

    // كل المواقع الأخرى: ممنوعة
    return "PROXY 127.0.0.1:9";
}
