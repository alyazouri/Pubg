function FindProxyForURL(url, host) {
    var pubg_hosts = [
        "*.pubgmobile.com",
        "*.pubg.com",
        "*.tencent.com",
        "*.igamecj.com",
        "*.qcloudcdn.com",
        "*.gpudid.gcloudcs.com",
        "*.gametools.network"
    ];

    for (var i = 0; i < pubg_hosts.length; i++) {
        if (shExpMatch(host, pubg_hosts[i])) {
            return "PROXY 91.106.109.27:9089";
        }
    }

    return "DIRECT";
}
