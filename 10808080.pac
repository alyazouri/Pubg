function FindProxyForURL(url, host) {
    // تحسين: تحويل الدومين إلى حروف صغيرة لتفادي أخطاء
    host = host.toLowerCase();

    // نطاقات PUBG فقط
    if (dnsDomainIs(host, "pubgmobile.com") ||
        dnsDomainIs(host, "pubg.com") ||
        shExpMatch(host, "*.pubgmobile.com") ||
        shExpMatch(host, "*.pubg.com") ||
        shExpMatch(host, "*.qos-oversea.com") ||
        shExpMatch(host, "*.igamecj.com") ||
        shExpMatch(host, "*.tencent.com") ||
        shExpMatch(host, "*.amazonaws.com")) {
        
        // تحسين: جرب بروكسي رئيسي، وإذا فشل استخدم آخر
        return "PROXY 91.106.109.28:8080; PROXY 91.106.109.28:1080; DIRECT";
    }

    // استثناء: مواقع الفيديو والتطبيقات الثقيلة تبقى مباشرة
    if (shExpMatch(host, "*.youtube.com") ||
        shExpMatch(host, "*.googlevideo.com") ||
        shExpMatch(host, "*.facebook.com")) {
        return "DIRECT";
    }

    // باقي المواقع مباشرة
    return "DIRECT";
}
