function FindProxyForURL(url, host) {
    var proxyIP = "62.72.166.233";
    var proxyPort = "8080";

    // كل الترافيك يمر عبر البروكسي مباشرة
    return "SOCKS5 " + proxyIP + ":" + proxyPort;
}
