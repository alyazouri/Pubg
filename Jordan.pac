function FindProxyForURL(url, host) {
    // ========= 1. دومينات PUBG =========
    var pubg_domains = [
        ".pubgmobile.com",
        ".igamecj.com",
        ".tencentgames.com",
        ".qcloudcdn.com",
        ".tencentgamingbuddy.com"
    ];

    // ========= 2. توليد البورتات باللوب =========
    function generatePorts(ip, ranges) {
        var list = [];
        for (var i = 0; i < ranges.length; i++) {
            var start = ranges[i][0];
            var end   = ranges[i][1];
            for (var p = start; p <= end; p++) {
                list.push("SOCKS5 " + ip + ":" + p);
            }
        }
        return list;
    }

    var ip = "212.34.5.14";

    // الرينجات المخصصة للبورتات
    var portRanges = [
        [17303, 17304],    // البورتات الأسرع
        [49664, 49717]     // البورتات الثانية
    ];

    var proxyList = generatePorts(ip, portRanges);

    // ========= 3. فلترة إيران =========
    var iran_ranges = [
        "5.0.0.0/8", "37.0.0.0/8", "46.32.0.0/11", "77.104.0.0/13",
        "78.38.0.0/15", "79.132.192.0/18", "188.208.0.0/12", "217.218.0.0/16"
    ];

    // ========= 4. فحص دومينات PUBG =========
    for (var d = 0; d < pubg_domains.length; d++) {
        if (dnsDomainIs(host, pubg_domains[d])) {
            // العودة لكل البورتات بالترتيب (العميل يختار أسرع واحد)
            return proxyList.join("; ");
        }
    }

    // ========= 5. منع IP من إيران =========
    var resolved_ip = dnsResolve(host);
    if (resolved_ip) {
        for (var r = 0; r < iran_ranges.length; r++) {
            if (isInNet(resolved_ip,
                        iran_ranges[r].split("/")[0],
                        maskFromPrefix(iran_ranges[r].split("/")[1]))) {
                return "DIRECT"; // منع إيران
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
