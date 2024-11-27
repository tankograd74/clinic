
; /* Start:"a:4:{s:4:"full";s:29:"/js/counter.js?8(351)000-00-00";s:6:"source";s:14:"/js/counter.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
let start_t = performance.now();

function send_data_to_controller(data_string = '') {
    let xhr = new XMLHttpRequest();

    let url = document.location.protocol + '//' + document.location.hostname + '/includes/counter.php';

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send('data_json=' + data_string);
}


function Fingerprint(hasher) {
    var nativeForEach = Array.prototype.forEach;
    var nativeMap = Array.prototype.map;
    this.each = function (obj, iterator, context) {
        if (obj === null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (iterator.call(context, obj[i], i, obj) === {}) return;
            }
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (iterator.call(context, obj[key], key, obj) === {}) return;
                }
            }
        }
    };
    this.map = function (obj, iterator, context) {
        var results = [];
        if (obj === null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        this.each(obj, function (value, index, list) {
            results[results.length] = iterator.call(context, value, index, list);
        });
        return results;
    };

    if (hasher) {
        this.hasher = hasher;
    }
}

Fingerprint.prototype = {

    get: function () {
        keys = [];
        keys.push(navigator.userAgent);
        keys.push([screen.height, screen.width, screen.colorDepth].join('x'));
        keys.push(new Date().getTimezoneOffset());

        //platform
        if (navigator.platform) {
            keys.push(navigator.platform);
        } else {
            keys.push('unknown');
        }

        //device memory
        if (navigator.deviceMemory) {
            keys.push(navigator.deviceMemory);
        } else {
            keys.push('unknown');
        }

        //processors
        if (navigator.hardwareConcurrency) {
            keys.push(navigator.hardwareConcurrency);
        } else {
            keys.push('unknown');
        }

        //maxTouchPoints
        let maxTouchPoints = 0;
        if (typeof navigator.maxTouchPoints !== "undefined") {
            maxTouchPoints = navigator.maxTouchPoints;
        } else if (typeof navigator.msMaxTouchPoints !== "undefined") {
            maxTouchPoints = navigator.msMaxTouchPoints;
        }
        keys.push(maxTouchPoints);

        //devicePixelRation
        let pixel_ratio = window.devicePixelRatio || '';
        keys.push(pixel_ratio);

        //language
        let language = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || '';
        keys.push(language);

        try {
            keys.push(!!window.sessionStorage);
        } catch(e) {
            return keys.push(true);
        }

        try {
            keys.push(!!window.localStorage);
        } catch(e) {
            return keys.push(true);
        }

        var pluginsString = this.map(navigator.plugins, function (p) {
            var mimeTypes = this.map(p, function (mt) {
                return [mt.type, mt.suffixes].join('~');
            }).join(',');
            return [p.name, p.description, mimeTypes].join('::');
        }, this).join(';');
        keys.push(pluginsString);
        if (this.hasher) {
            return this.hasher(keys.join('###'), 31);
        } else {
            return this.murmurhash3_32_gc(keys.join('###'), 31);
        }
    },


    murmurhash3_32_gc: function (key, seed) {
        var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

        remainder = key.length & 3; // key.length % 4
        bytes = key.length - remainder;
        h1 = seed;
        c1 = 0xcc9e2d51;
        c2 = 0x1b873593;
        i = 0;

        while (i < bytes) {
            k1 =
                ((key.charCodeAt(i) & 0xff)) |
                ((key.charCodeAt(++i) & 0xff) << 8) |
                ((key.charCodeAt(++i) & 0xff) << 16) |
                ((key.charCodeAt(++i) & 0xff) << 24);
            ++i;

            k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

            h1 ^= k1;
            h1 = (h1 << 13) | (h1 >>> 19);
            h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
            h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
        }

        k1 = 0;

        switch (remainder) {
            case 3:
                k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
                break;
            case 2:
                k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
                break;
            case 1:
                k1 ^= (key.charCodeAt(i) & 0xff);

                k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
                k1 = (k1 << 15) | (k1 >>> 17);
                k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
                h1 ^= k1;
             
        }

        h1 ^= key.length;

        h1 ^= h1 >>> 16;
        h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
        h1 ^= h1 >>> 13;
        h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
        h1 ^= h1 >>> 16;

        return h1 >>> 0;
    }
}


let s_obj = {
    'hash': new Fingerprint().get(),
    'useragent': navigator.userAgent,
    'referrer': document.referrer,
    'url': document.location.href,
    'process_time' : Math.ceil(performance.now() - start_t)
};

let enc_data = encodeURIComponent(JSON.stringify(s_obj));
send_data_to_controller(enc_data);
/* End */
;; /* /js/counter.js?8(351)000-00-00*/
