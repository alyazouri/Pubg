function FindProxyForURL(url, host) {
    var ip = "212.34.5.14";
    var portMain = "10081";   // البورت الرئيسي
    var portBackup = "10000"; // البورت الاحتياطي

    // دومينات ببجي الأساسية
    var pubg_domains = [
        ".pubgmobile.com",
        ".igamecj.com",
        ".tencentgames.com",
        ".qcloudcdn.com",
        ".tencentgamingbuddy.com",
        ".classicgame.pubgmobile.com",
        ".tdm.pubgmobile.com",
        ".recruit.pubgmobile.com",
        ".wow.pubgmobile.com"
    ];

    for (var d = 0; d < pubg_domains.length; d++) {
        if (dnsDomainIs(host, pubg_domains[d])) {
            return "SOCKS5 " + ip + ":" + portMain + "; SOCKS5 " + ip + ":" + portBackup;
        }
    }

    // باقي الانترنت على DIRECT
    return "DIRECT";
}
