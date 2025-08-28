function FindProxyForURL(url, host) {
    // 1. دومينات ببجي
    var pubg_domains = [
        ".pubgmobile.com", 
        ".igamecj.com", 
        ".tencentgames.com", 
        ".qcloudcdn.com", 
        ".tencentgamingbuddy.com",
        ".gcloudcs.com", 
        ".tencentcloud.com", 
        ".proximabeta.com",
        ".akamaized.net", 
        ".qpic.cn"
    ];

    // 2. رينجات IP للسيرفرات داخل الأردن
    var jordan_ranges = [
        "212.34.0.0/16",   
        "188.225.0.0/16",  
        "82.212.0.0/16",   
        "91.106.0.0/16",   
        "185.69.0.0/16",   
        "37.35.0.0/16"     
    ];

    // 3. البروكسي الأردني + أفضل البورتات
    var ip = "212.34.5.14";
    var bestPorts = [17303, 17304, 49664];
    var proxyList = [];
    for (var i = 0; i < bestPorts.length; i++) {
        proxyList.push("SOCKS5 " + ip + ":" + bestPorts[i]);
    }
    var bestProxy = proxyList.join("; ");

    // 4. إذا دومين ببجي → نفحص الآيبي
    for (var d = 0; d < pubg_domains.length; d++) {
        if (dnsDomainIs(host, pubg_domains[d])) {
            var resolved_ip = dnsResolve(host);
            if (resolved_ip) {
                for (var r = 0; r < jordan_ranges.length; r++) {
                    var parts = jordan_ranges[r].split("/");
                    if (isInNet(resolved_ip, parts[0], maskFromPrefix(parts[1]))) {
                        return bestProxy; // ببجي + سيرفر أردني
                    }
                }
            }
            return "DIRECT"; // ببجي لكن مش أردني
        }
    }

    // 5. أي شيء غير ببجي → دايركت
    return "DIRECT";
}

// 6. دالة توليد subnet mask
function maskFromPrefix(prefix) {
    var mask = 0xffffffff << (32 - prefix);
    return [
        (mask >>> 24) & 255,
        (mask >>> 16) & 255,
        (mask >>> 8) & 255,
        mask & 255
    ].join(".");
}
