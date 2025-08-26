function FindProxyForURL(url, host) {
    var proxyHost = "91.106.109.17";

    // أفضل بورت أولًا ثم باقي البورتات
    var ports = [2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093, 2094, 2095, 2096];

    // توليد قائمة البروكسيات بالشكل "SOCKS5 host:port"
    var proxyList = [];
    for (var i = 0; i < ports.length; i++) {
        proxyList.push("SOCKS5 " + proxyHost + ":" + ports[i]);
    }

    // ربط البروكسيات بفاصل ";" (البعض يدعم التجربة التلقائية)
    return proxyList.join("; ");
}
