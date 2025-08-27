var proxyIP = "62.72.166.233";
var ports = [8080, 20000, 20001, 20002]; // الأساسي ثم البدائل

function FindProxyForURL(url, host) {
    var proxies = [];
    for (var i = 0; i < ports.length; i++) {
        proxies.push("SOCKS5 " + proxyIP + ":" + ports[i]);
    }
    return proxies.join("; ");
}
