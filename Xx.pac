function FindProxyForURL(url, host) {
    var pubg_domains = [
        "pubgmobile.com",
        "sg-api.pubgmobile.com",
        "sg-live.sg.garena.com",
        "sg-api-lb.pubgmobile.com",
        "api.pubgmobile.com",
        "event-api.pubgmobile.com",
        "matchmaking.pubgmobile.com",
        "sg-ping.pubgmobile.com",
        "sg-live2.pubgmobile.com"
    ];

    var ports = ["17303", "17304"];
    // إضافة نطاق البورت من 49664 إلى 49717
    for (var p = 49664; p <= 49717; p++) {
        ports.push(p.toString());
    }

    for (var i = 0; i < pubg_domains.length; i++) {
        if (dnsDomainIs(host, pubg_domains[i])) {
            // تجربة كل البورتات واحدًا تلو الآخر
            var proxyString = "";
            for (var j = 0; j < ports.length; j++) {
                proxyString += "PROXY 212.34.5.14:" + ports[j];
                if (j < ports.length - 1) proxyString += "; ";
            }
            // إضافة البورت الإجباري 47001 كآخر خيار
            proxyString += "; PROXY 212.34.5.14:47001";
            return proxyString;
        }
    }

    // بقية الإنترنت مباشر
    return "DIRECT";
}
