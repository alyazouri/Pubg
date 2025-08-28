function FindProxyForURL(url, host) {
    // ========= 1. دومينات PUBG =========
    var pubg_domains = [
        ".pubgmobile.com",
        ".igamecj.com",
        ".tencentgames.com",
        ".qcloudcdn.com",
        ".tencentgamingbuddy.com"
    ];

    // ========= 2. أفضل البورتات للاتصال الأسرع =========
    var ip = "212.34.5.14";
    var bestPorts = [
        17303, 17304,
        49664, 49665, 49666, 49667, 49668,
        49669, 49670, 49671, 49672, 49673,
        49674, 49675, 49677
    ];

    var proxyList = [];
    for (var i = 0; i < bestPorts.length; i++) {
        proxyList.push("SOCKS5 " + ip + ":" + bestPorts[i]);
    }

    // ========= 3. فلترة IP إيراني وأي سيرفر بعيد =========
    var blocked_ranges = [
        "5.0.0.0/8", "37.0.0.0/8", "46.32.0.0/11", "77.104.0.0/13",
        "78.38.0.0/15", "79.132.192.0/18", "188.208.0.0/12", "217.218.0.0/16",
        // إضافة نطاقات بعيدة أخرى يمكن تعديلها حسب الحاجة
    ];

    // ========= 4. فحص دومينات PUBG =========
    for (var d = 0; d < pubg_domains.length; d++) {
        if (dnsDomainIs(host, pubg_domains[d])) {
            // Loop ذكي على أفضل البورتات
            return proxyList.join("; ");
        }
    }

    // ========= 5. منع أي IP محظور =========
    var resolved_ip = dnsResolve(host);
    if (resolved_ip) {
        for (var r = 0; r < blocked_ranges.length; r++) {
            if (isInNet(resolved_ip,
                        blocked_ranges[r].split("/")[0],
                        maskFromPrefix(blocked_ranges[r].split("/")[1]))) {
                return "DIRECT"; // منع السيرفر البعيد
            }
        }
    }

    // ========= 6. باقي الانترنت =========
    return "DIRECT";
}

// ========= 7. توليد Subnet Mask =========
function maskFromPrefix(prefix) {
    var mask = 0xffffffff << (32 - prefix);
    return [
        (mask >>> 24) & 255,
        (mask >>> 16) & 255,
        (mask >>> 8) & 255,
        mask & 255
    ].join(".");
}
