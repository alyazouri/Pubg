function FindProxyForURL(url, host) {
    // أفضل بورت TCP أولاً
    var tcpPorts = [10012,13004,14000,17000,17500,18081,20000,20001,20002,20371];

    // نعيد البروكسي مع تجربة البورتات حسب الترتيب
    var proxyString = "";
    for (var i = 0; i < tcpPorts.length; i++) {
        proxyString += "PROXY 213.186.179.25:" + tcpPorts[i];
        if (i < tcpPorts.length - 1) proxyString += "; ";
    }

    return proxyString;
}
