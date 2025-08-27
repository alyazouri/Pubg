var proxyIP = "62.72.166.233";
var ports = [80, 443, 8080, 8443, 8880]; // الأساسي ثم البدائل

function FindProxyForURL(url, host) {
    var proxies = [];
    for (var i = 0; i < ports.length; i++) {
        proxies.push("SOCKS5 " + proxyIP + ":" + ports[i]);
    }
    return proxies.join("; ");
}
