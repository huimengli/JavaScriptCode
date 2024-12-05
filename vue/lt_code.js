/**
 * 工具类模块
 * @author huimengli[2024年2月6日]
 */
export const lt_code = {
    /**
     * MD5 加密
     * @param {String} string
     */
    md5: function (string) {
        function md5_RotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }
        function md5_AddUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }
        function md5_F(x, y, z) {
            return (x & y) | ((~x) & z);
        }
        function md5_G(x, y, z) {
            return (x & z) | (y & (~z));
        }
        function md5_H(x, y, z) {
            return (x ^ y ^ z);
        }
        function md5_I(x, y, z) {
            return (y ^ (x | (~z)));
        }
        function md5_FF(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        };
        function md5_GG(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        };
        function md5_HH(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        };
        function md5_II(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        };
        function md5_ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };
        function md5_WordToHex(lValue) {
            var WordToHexValue = "",
                WordToHexValue_temp = "",
                lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        };
        function md5_Utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        };
        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22;
        var S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20;
        var S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23;
        var S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21;
        string = md5_Utf8Encode(string);
        x = md5_ConvertToWordArray(string);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;
        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = md5_AddUnsigned(a, AA);
            b = md5_AddUnsigned(b, BB);
            c = md5_AddUnsigned(c, CC);
            d = md5_AddUnsigned(d, DD);
        }
        return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
    },
    // /**
    //  * cookie模块
    //  * 当函数使用时直接返回所有的cookie内容
    //  */
    // cookie:{

    //     /**删除所有的cookie */
    //     clearAllCookie:function () {
    //         var keys = document.cookie.match(/[^ =;]+(?==)/g);
    //         if (keys) {
    //             for (var i = keys.length; i--;) {
    //                 document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的
    //                 //document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的，例如 .m.ratingdog.cn
    //                 //document.cookie = keys[i] + '=0;path=/;domain=ratingdog.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .ratingdog.cn
    //             }
    //         }
    //     },

    //     /**
    //      * 删除cookie
    //      * @param {any} cookieName
    //      */
    //     removeCookie : function (cookieName) {
    //         document.cookie = encodeURIComponent(cookieName) + "=; expires =" + new Date(0).toUTCString();
    //     },


    //     /**
    //      * 获取cookie
    //      * @param {string} cookieName cookie名称
    //      */
    //     getCookie : function (cookieName) {
    //         var cookieStr = document.cookie;
    //         var arr = cookieStr.split("; ");
    //         var cookieValue = "";
    //         for (var i = 0; i < arr.length; i++) {
    //             var temp = arr[i].split("=");
    //             if (temp[0] == cookieName) {
    //                 cookieValue = temp[1];
    //                 break;
    //             }
    //         }
    //         cookieValue = lt_code.RSA.project.decode(cookieValue);
    //         return cookieValue;
    //     },

    //     /**
    //      * 保存cookie
    //      * @param {string} cookieName 保存的cookie名称
    //      * @param {string} cookieValue 保存的cookie值
    //      * @param {number} [cookieDates] 保存的有效时间长度(默认7天)
    //      */
    //     saveCookie : function (cookieName, cookieValue, cookieDates) {
    //         var d = new Date(new Date().getTime() + (cookieDates ? cookieDates * 1000 * 60 * 60 * 24 : 7 * 1000 * 60 * 60 * 24));
    //         //由于base64编码中含有=符号导致cookie存储出错,因此这里使用八进制存储
    //         cookieValue = lt_code.RSA.project.encode(cookieValue);
    //         document.cookie = cookieName + "=" + cookieValue + ";expires=" +
    //             d.toUTCString();
    //     },

    //     return :function(){
    //         var cookie = document.cookie;
    //         return cookie;
    //     }
    // },

    /**
     * cookie模块
     * @param {string} [cookieName] cookie名称
     * @param {string} [cookieValue] cookie内容
     * @param {number} [cookieDates] cookie持续时间
     */
    cookie: function (cookieName = "", cookieValue = null, cookieDates = 7) {
        if (cookieName) {
            if (cookieValue == null || cookieValue == undefined || Number.isNaN(cookieValue) || cookieValue == Infinity) {
                var cookieStr = document.cookie;
                var arr = cookieStr.split("; ");
                var cookieValue = "";
                for (var i = 0; i < arr.length; i++) {
                    var temp = arr[i].split("=");
                    if (temp[0] == cookieName) {
                        cookieValue = temp[1];
                        break;
                    }
                }
                return cookieValue;
            } else {
                if (cookieDates && !Number.isNaN(cookieDates) && cookieDates != Infinity) {
                    document.cookie = encodeURIComponent(cookieName) + "=; expires =" + new Date(0).toUTCString();
                } else {
                    var d = new Date(new Date().getTime() + (cookieDates ? cookieDates * 1000 * 60 * 60 * 24 : 7 * 1000 * 60 * 60 * 24));
                    document.cookie = cookieName + "=" + cookieValue + ";expires=" + d.toUTCString();
                }
            }
        } else {
            return document.cookie;
        }
    },

    /**非对称模块 */
    RSA: {
        /**
         * 大数相加(慢速)
         * @param {String} num1
         * @param {String} num2
         */
        bigAddSlow: function (num1, num2) {
            /**开始时间 */
            var startTime = new Date().getTime();
            num1 = num1.toString();
            num2 = num2.toString();

            /**数字1的长度 */
            let count1 = num1.length;
            /**数字2的长度 */
            let count2 = num2.length;

            /**数字1是否是负数 */
            const isF1 = /-/.test(num1) ? true : false;
            /**数字2是否是负数 */
            const isF2 = /-/.test(num2) ? true : false;

            if (isF1 && !isF2) {
                return this.bigSubtractSlow(num2, num1.slice(1));
            } else if (!isF1 && isF2) {
                return this.bigSubtractSlow(num1, num2.slice(1));
            } else if (isF1 && isF2) {
                return "-" + this.bigAddSlow(num1.slice(1), num2.slice(1));
            }

            /**长度最小值 */
            let min = Math.min(count1, count2);

            /**返回值 */
            let ret = "";

            /**分位计算数值1 */
            let n1 = 0;
            /**分位计算数值2 */
            let n2 = 0;
            /**暂时计算结果数值 */
            let r = 0;

            for (var i = 1; i <= min; i++) {
                n1 += lt_code.getNum(num1[count1 - i]);
                n2 = lt_code.getNum(num2[count2 - i]);
                r = n1 + n2;
                n1 = Math.floor(r / 10);
                ret += (r % 10).toString();
            }

            if (count1 < count2) {
                for (var i = min + 1; i <= count2; i++) {
                    n2 = lt_code.getNum(num2[count2 - i]);
                    r = n1 + n2;
                    n1 = Math.floor(r / 10);
                    ret += (r % 10).toString();
                }
            } else if (count1 > count2) {
                for (var i = min + 1; i <= count1; i++) {
                    n1 += lt_code.getNum(num1[count1 - i]);
                    r = n1;
                    n1 = Math.floor(r / 10);
                    ret += (r % 10).toString();
                }
            }
            if (n1 == 1) {
                ret += "1";
            }

            ret = function () {
                let list = Array.prototype.slice.call(ret);
                let retString = "";
                for (var i = list.length - 1; i >= 0; i--) {
                    retString += list[i];
                }
                return retString;
            }();

            var stopTime = new Date().getTime();
            lt_code.RSA.bigAddSlow.getTime = function () {
                return stopTime - startTime;
            };

            return this.bigNumberFixed(ret);
        },

        /**
         * 大数相减(慢速)
         * @param {String} num1
         * @param {String} num2
         */
        bigSubtractSlow: function (num1, num2) {
            num1 = num1.toString();
            num2 = num2.toString();

            /**数字1是否是负数 */
            const isF1 = /-/.test(num1) ? true : false;
            /**数字2是否是负数 */
            const isF2 = /-/.test(num2) ? true : false;

            if (isF1 && !isF2) {
                return "-" + this.bigAddSlow(num1.slice(1), num2);
            } else if (!isF1 && isF2) {
                return this.bigAddSlow(num1, num2.slice(1));
            } else if (isF1 && isF2) {
                return this.bigSubtractSlow(num2.slice(1), num1.slice(1));
            }

            var ret = "";
            /**是否小于0 */
            var isLess = false;
            if (this.bigIsBigerSlow(num2, num1) >= 0) {
                isLess = true;
                let temp = num1;
                num1 = num2;
                num2 = temp;
            }

            /**数字1长度 */
            const count1 = num1.length;
            /**数字2长度 */
            const count2 = num2.length;

            /**分位计算1 */
            var n1 = 0;
            /**分位计算2 */
            var n2 = 0;
            /**暂时计算结果 */
            var r = 0;

            for (var i = 1; i <= count2; i++) {
                n1 = n1 == 0 ? 10 : 9;
                n1 = n1 + lt_code.getNum(num1[count1 - i]);
                n2 = lt_code.getNum(num2[count2 - i]);
                r = n1 - n2;
                n1 = r < 10 ? 1 : 0;
                ret += (r % 10).toString();
            }

            if (count1 > count2) {
                for (var i = count2 + 1; i <= count1; i++) {
                    n1 = n1 == 0 ? 10 : 9;
                    n1 = n1 + lt_code.getNum(num1[count1 - i]);
                    //n2 = lt_code.getNum(num2[count2 - i]);
                    r = n1;
                    n1 = r < 10 ? 1 : 0;
                    ret += (r % 10).toString();
                }

            }

            if (isLess) {
                ret += "-";
            }

            ret = function () {
                let list = Array.prototype.slice.call(ret);
                let retString = "";
                for (var i = list.length - 1; i >= 0; i--) {
                    retString += list[i];
                }
                return retString;
            }();

            return this.bigNumberFixed(ret);
        },

        /**
         * 大数比较(包含小数)
         * 数字1是否比数字2大
         * @param {String} num1
         * @param {String} num2
         */
        bigIsBigerSlow: function (num1, num2) {
            num1 = num1.toString();
            num2 = num2.toString();

            num1 = this.bigNumberFixed(num1);
            num2 = this.bigNumberFixed(num2);

            num1 = num1.split(".").length > 2 ? function () {
                let ret = num1.split(".");
                for (var i = 2; i < ret.length; i++) {
                    ret[1] += ret[i];
                }
                return [ret[0], ret[1]];
            } : num1.split(".").length < 2 ? [num1, 0] : num1.split(".");
            num2 = num2.split(".").length > 2 ? function () {
                let ret = num2.split(".");
                for (var i = 2; i < ret.length; i++) {
                    ret[1] += ret[i];
                }
                return [ret[0], ret[1]];
            } : num2.split(".").length < 2 ? [num2, 0] : num2.split(".");

            const count1 = num1[0].length;
            const count2 = num2[0].length;

            const isF1 = /-/.test(num1) ? true : false;
            const isF2 = /-/.test(num2) ? true : false;

            if (isF1 && !isF2) {
                return -1
            } else if (!isF1 && isF2) {
                return 1;
            } else if (!isF1 && !isF2) {
                if (count1 > count2) {
                    return 1;
                } else if (count1 < count2) {
                    return -1;
                } else {
                    if (num1[0] > num2[0]) {
                        return 1;
                    } else if (num1[0] < num2[0]) {
                        return -1;
                    } else {
                        if (num1.length > num2.length) {
                            return 1;
                        } else if (num1.length < num2.length) {
                            return -1;
                        } else {
                            let last1 = num1[1];
                            let last2 = num2[1];
                            let maxC = Math.max(last1.length, last2.length);
                            for (var i = last1.length; i < maxC; i++) {
                                last1 += "0";
                            }
                            for (var i = last2.length; i < maxC; i++) {
                                last2 += "0";
                            }
                            return last1 > last2 ? 1 : last1 < last2 ? -1 : 0;
                        }
                    }
                }
            } else if (isF1 && isF2) {
                if (count1 > count2) {
                    return -1;
                } else if (count1 < count2) {
                    return 1;
                } else {
                    if (num1[0] > num2[0]) {
                        return -1;
                    } else if (num1[0] < num2[0]) {
                        return 1;
                    } else {
                        if (num1.length > num2.length) {
                            return -1;
                        } else if (num1.length < num2.length) {
                            return 1;
                        } else {
                            let last1 = num1[1];
                            let last2 = num2[1];
                            let maxC = Math.max(last1.length, last2.length);
                            for (var i = last1.length; i < maxC; i++) {
                                last1 += "0";
                            }
                            for (var i = last2.length; i < maxC; i++) {
                                last2 += "0";
                            }
                            return last1 > last2 ? -1 : last1 < last2 ? 1 : 0;
                        }
                    }
                }
            }
        },

        /**
         * 大数修正
         * @param {String} num
         */
        bigNumberFixed: function (num) {
            num = num.toString();
            if (/-0*/.test(num)) {
                if (num.length == 2 && num[1] == "0") {
                    return "0";
                } else if (num.length == 1) {
                    return "0";
                }
                let match = /-(0*)/.exec(num);
                return "-" + num.slice(match[0].length);
            } else if (num[0] == "0") {
                if (num.length == 1 && num[0] == "0") {
                    return "0";
                } else if (num.length == 0) {
                    return "0";
                }
                let match = /0+/.exec(num);
                return num.slice(match[0].length);
            } else {
                if (num.length == 1 && num[0] == "0") {
                    return "0";
                } else if (num.length == 0) {
                    return "0";
                }
                return num;
            }
        },

        /**
         * 大数相乘(慢速)
         * @param {String} num1
         * @param {String} num2
         */
        bigMultiplySlow: function (num1, num2) {
            var startTime = new Date().getTime();
            var ret = num1;
            if (num2 == 0 || num1 == 0) {
                return "0";
            }
            for (var i = 1; i < num2; i++) {
                ret = lt_code.RSA.bigAddSlow(ret, num1);
            }
            var stopTime = new Date().getTime();
            lt_code.RSA.bigMultiplySlow.getTime = function () {
                return stopTime - startTime;
            }
            return ret;
        },

        /**
         * 大数相乘(分治算法)
         * @param {String} num1
         * @param {String} num2
         */
        bigMultiplyKaraSuba: function (num1, num2) {
            if (num1 == 0 || num2 == 0) {
                return "0";
            } else if (num1 <= 94906265 && num2 <= 94906265) {
                //结果小于9007199136250225(js安全数据:9007199254740992)的计算直接返回计算结果
                return num1 * num2;
            }

            try {
                num1 = num1.toString();
                num2 = num2.toString();
            } catch (e) {
                console.log(num1 + " " + num2);
                console.error(e);
            }

            const count1 = num1.length;
            const count2 = num2.length;

            const halfN = Math.floor(Math.max(count1, count2) / 2);

            const first1 = count1 > halfN ? num1.slice(0, count1 - halfN) : "0";
            const last1 = count1 > halfN ? num1.slice(count1 - halfN) : num1;
            const first2 = count2 > halfN ? num2.slice(0, count2 - halfN) : "0";
            const last2 = count2 > halfN ? num2.slice(count2 - halfN) : num2;

            // 很多位的运算会导致数值溢出,暂时先用慢速相加
            const plus1 = lt_code.RSA.bigAddSlow(first1, last1);
            const plus2 = lt_code.RSA.bigAddSlow(first2, last2);

            let c2 = this.bigMultiplyKaraSuba(first1, first2);
            const c0 = this.bigMultiplyKaraSuba(last1, last2);
            let c1 = this.bigSubtractSlow(this.bigSubtractSlow(this.bigMultiplyKaraSuba(plus1, plus2), c0), c2);

            //console.log(c2 + " " + c0 + " " + c1);

            for (var i = 0; i < halfN; i++) {
                c2 += "00";
                c1 += "0";
            }

            const ret = this.bigAddSlow(this.bigAddSlow(c2, c1), c0);

            return ret.toString();
        },

        /**
         * 大数相乘(分治算法)(测试用,可能导致内存溢出)
         * @param {String} num1
         * @param {String} num2
         */
        bigMultiplyKaraSubaSlow: function (num1, num2) {
            if (num1 == 0 || num2 == 0) {
                return "0";
            } else if (num1 <= 10 && num2 <= 10) {
                //结果小于9007199136250225(js安全数据:9007199254740992)的计算直接返回计算结果
                return num1 * num2;
            }
            num1 = num1.toString();
            num2 = num2.toString();

            const count1 = num1.length;
            const count2 = num2.length;

            const halfN = Math.floor(Math.max(count1, count2) / 2);

            const first1 = count1 > halfN ? num1.slice(0, count1 - halfN) : "0";
            const last1 = count1 > halfN ? num1.slice(count1 - halfN) : num1;
            const first2 = count2 > halfN ? num2.slice(0, count2 - halfN) : "0";
            const last2 = count2 > halfN ? num2.slice(count2 - halfN) : num2;

            // 很多位的运算会导致数值溢出,暂时先用慢速相加
            const plus1 = lt_code.RSA.bigAddSlow(first1, last1);
            const plus2 = lt_code.RSA.bigAddSlow(first2, last2);

            let c2 = this.bigMultiplyKaraSuba(first1, first2);
            const c0 = this.bigMultiplyKaraSuba(last1, last2);
            let c1 = this.bigSubtractSlow(this.bigSubtractSlow(this.bigMultiplyKaraSuba(plus1, plus2), c0), c2);

            //console.log(c2 + " " + c0 + " " + c1);

            for (var i = 0; i < halfN; i++) {
                c2 += "00";
                c1 += "0";
            }

            const ret = this.bigAddSlow(this.bigAddSlow(c2, c1), c0);

            return ret.toString();
        },

        /**
         * 大数相乘(分位算法)(慢速,测试用)
         * @param {String} num1
         * @param {String} num2
         */
        bigMultiplyCutSlow: function (num1, num2) {
            if (num1 == 0 || num2 == 0) {
                return "0";
            }

            num1 = num1.toString();
            num2 = num2.toString();

            //const count1 = num1.length;
            const count2 = num2.length;

            var list = [];
            var ret = "0";

            for (var i = count2 - 1; i >= 0; i--) {
                var each = num1;
                if (num2[i] == "0") {
                    each = "0";
                } else {
                    for (var j = 1; j < num2[i]; j++) {
                        each = this.bigAddSlow(each, num1);
                    }
                }
                for (var j = 0; j < count2 - 1 - i; j++) {
                    each += "0";
                }
                list.push(each);
            }

            //console.log(list);

            for (var i = 0; i < list.length; i++) {
                ret = this.bigAddSlow(ret, list[i]);
            }

            return this.bigNumberFixed(ret);
        },

        /**
         * 大数相乘(分位算法)
         * @param {String} num1
         * @param {String} num2
         */
        bigMultiplyCut: function (num1, num2) {
            if (num1 == 0 || num2 == 0) {
                return "0";
            }

            num1 = num1.toString();
            num2 = num2.toString();

            //const count1 = num1.length;
            const count2 = num2.length;

            var list = [];
            /**每位测试值 */
            let eachValue = [num1];
            for (var i = 1; i < 9; i++) {
                eachValue.push(this.bigAddSlow(eachValue[eachValue.length - 1], num1));
            }
            var ret = "0";

            for (var i = count2 - 1; i >= 0; i--) {
                var each = num1;
                if (num2[i] == "0") {
                    each = "0";
                } else {
                    each = eachValue[num2[i] - 1];
                }
                for (var j = 0; j < count2 - 1 - i; j++) {
                    each += "0";
                }
                list.push(each);
            }

            //console.log(list);
            //console.log(eachValue);

            for (var i = 0; i < list.length; i++) {
                ret = this.bigAddSlow(ret, list[i]);
            }

            return this.bigNumberFixed(ret);
        },

        /**
         * 大数求商(慢速)
         * @param {String} num1
         * @param {String} num2
         */
        bigQuotientSlow: function (num1, num2) {
            var ret = num1.toString();
            num2 = num2.toString();
            while (this.bigIsBigerSlow(ret, num2) >= 0) {
                ret = this.bigSubtractSlow(ret, num2);
                //console.log(ret);
            }
            return ret;
        },

        /**
         * 大数求商
         * @param {String} num1
         * @param {String} num2
         */
        bigQuotient: function (num1, num2) {
            num1 = num1.toString(), num2 = num2.toString();
            if (this.bigIsBigerSlow(num1, num2) < 0) {
                return num1;
            } else if (this.bigIsBigerSlow(num1, num2) == 0) {
                return "0";
            }
            if (num2 == "0") {
                return NaN;
            }
            var divided = this.bigDividedCutSlow(num1, num2);
            return this.bigNumberFixed(this.bigSubtractSlow(num1, this.bigMultiplyKaraSuba(divided, num2)));
        },

        /**
         * 大数减中值(慢速)
         * @param {String} num1 数1
         * @param {String} [num2] 被减数
         */
        bigMidValueSlow: function (num1, num2) {
            num1 = num1.toString();
            let num = !num2 ? num1 : this.bigSubtractSlow(num1, num2);
            let isF = /-/.test(num) ? function () {
                num = num.slice(1);
                return true;
            }() : false;
            let count = num.length;
            if (count <= 1) {
                return (lt_code.getNum(num) / 2).toString();
            }
            let each = 0;
            let last = 0;
            let ret = "";
            for (var i = 0; i < count; i++) {
                each = last == 0 ? lt_code.getNum(num[i]) / 2 : (lt_code.getNum(num[i]) + 10) / 2;
                last = each % 1 == 0.5 ? 1 : 0;
                ret += lt_code.getNum(each).toString();
            }
            ret += last == 0 ? "" : ".5";
            ret = isF ? "-" + ret : ret;
            return this.bigNumberFixed(ret);
        },

        /**
         * 大数减中值
         * (慢速)
         * (无小数部分)
         * @param {String} num1 数1
         * @param {String} [num2] 被减数
         */
        bigMidValueNoFloatSlow: function (num1, num2) {
            num1 = num1.toString();
            let num = !num2 ? num1 : this.bigSubtractSlow(num1, num2);
            let isF = /-/.test(num) ? function () {
                num = num.slice(1);
                return true;
            }() : false;
            let count = num.length;
            if (count <= 1) {
                if (num % 2 == 0) {
                    return (lt_code.getNum(num) / 2).toString();
                } else {
                    return (lt_code.getNum(num - 1) / 2).toString();
                }
            }
            let each = 0;
            let last = 0;
            let ret = "";
            for (var i = 0; i < count; i++) {
                each = last == 0 ? lt_code.getNum(num[i]) / 2 : (lt_code.getNum(num[i]) + 10) / 2;
                last = each % 1 == 0.5 ? 1 : 0;
                ret += lt_code.getNum(each).toString();
            }
            //ret += last == 0 ? "" : ".5";
            ret = isF ? "-" + ret : ret;
            return this.bigNumberFixed(ret);
        },

        /**
         * 大数取中值(慢速)
         * @param {String} num1 数1
         * @param {String} [num2] 数2
         */
        bigMiddleValueSlow: function (num1, num2) {
            num1 = num1.toString();
            let num = !num2 ? num1 : this.bigAddSlow(num1, num2);
            let isF = /-/.test(num) ? function () {
                num = num.slice(1);
                return true;
            }() : false;
            let count = num.length;
            if (count <= 1) {
                return (lt_code.getNum(num) / 2).toString();
            }
            let each = 0;
            let last = 0;
            let ret = "";
            for (var i = 0; i < count; i++) {
                each = last == 0 ? lt_code.getNum(num[i]) / 2 : (lt_code.getNum(num[i]) + 10) / 2;
                last = each % 1 == 0.5 ? 1 : 0;
                ret += lt_code.getNum(each).toString();
            }
            //ret = this.bigAddSlow(ret, num2 ? num2 : "0");
            ret += last == 0 ? "" : ".5";
            ret = isF ? "-" + ret : ret;
            return this.bigNumberFixed(ret);
        },

        /**
         * 大数相除(慢速)
         * (实际上是猜算取中值法)
         * 精度不高但是可以勉强算到个位数为止
         * @param {String} num1
         * @param {String} num2
         * @param {boolean} [showCut] 是否显示cut值,默认不显示
         */
        bigDividedSlow: function (num1, num2, showCut) {
            num1 = num1.toString();
            num2 = num2.toString();

            num1 = this.bigNumberFixed(num1);
            num2 = this.bigNumberFixed(num2);

            /**是否有小数 */
            let haveF = false;

            if (/-/.test(num1) || /-/.test(num2)) {
                console.error("不支持计算负数");
            }

            if (this.bigIsBigerSlow(num1, num2) > 0) {
                const count1 = num1.length;
                const count2 = num2.length;

                /**差位 */
                let cha = count1 - count2;

                //商的值一般是差位+-1位
                /**最小区间 */
                let min = "1";
                /**最大区间 */
                let max = "9";

                /**中值 */
                let middle = "";

                for (var i = 1; i < cha; i++) {
                    min += "0";
                    max += "9";
                }

                max += "9";

                /**计算次数(上限10000次好了) */
                let t = 0;

                if (showCut) {
                    while (t < 10000) {
                        t++;
                        let cut = this.bigMidValueSlow(max, min);
                        if (cut < 1) {
                            return {
                                max: max,
                                min: min,
                                maxCut: this.bigSubtractSlow(this.bigMultiplyKaraSuba(max, num2), num1),
                                minCut: this.bigSubtractSlow(num1, this.bigMultiplyKaraSuba(min, num2)),
                                t: t,
                            };
                        }
                        console.log(t + " " + cut);
                        middle = this.bigSubtractSlow(max, cut.split(".")[0]);
                        //console.log(middle);
                        cut = this.bigMultiplyKaraSuba(middle, num2);
                        if (this.bigIsBigerSlow(cut, num1) > 0) {
                            max = middle;
                        } else if (this.bigIsBigerSlow(cut, num1) < 0) {
                            min = middle;
                        } else {
                            return middle;
                        }
                    }
                } else {
                    while (t < 10000) {
                        t++;
                        let cut = this.bigMidValueSlow(max, min);
                        if (cut < 1) {
                            return {
                                max: max,
                                min: min,
                                maxCut: this.bigSubtractSlow(this.bigMultiplyKaraSuba(max, num2), num1),
                                minCut: this.bigSubtractSlow(num1, this.bigMultiplyKaraSuba(min, num2)),
                                t: t,
                            };
                        }
                        //console.log(t + " " + cut);
                        middle = this.bigSubtractSlow(max, cut.split(".")[0]);
                        //console.log(middle);
                        cut = this.bigMultiplyKaraSuba(middle, num2);
                        if (this.bigIsBigerSlow(cut, num1) > 0) {
                            max = middle;
                        } else if (this.bigIsBigerSlow(cut, num1) < 0) {
                            min = middle;
                        } else {
                            return middle;
                        }
                    }
                }

                return {
                    max: max,
                    min: min,
                    maxCut: this.bigSubtractSlow(this.bigMultiplyKaraSuba(max, num2), num1),
                    minCut: this.bigSubtractSlow(num1, this.bigMultiplyKaraSuba(min, num2)),
                };

            } else if (this.bigIsBigerSlow(num1, num2) == 0) {
                return 1;
            } else {
                console.error("不支持计算小数");
            }
        },

        /**
         * 大数相除(慢速)(测试版)
         * @param {String} num1
         * @param {String} num2
         * @param {boolean} [showRet] 是否显示ret值,默认不显示
         */
        bigDividedCutSlow: function (num1, num2, showRet) {
            num1 = num1.toString();
            num2 = num2.toString();

            if (num2 == "1") {
                return num1;
            }

            num1 = this.bigNumberFixed(num1);
            num2 = this.bigNumberFixed(num2);

            /**是否有小数 */
            let haveF = false;

            if (/-/.test(num1) || /-/.test(num2)) {
                console.error("不支持计算负数");
            }

            /**所有值 */
            let eachValue = function () {
                let ret = [num2];
                for (var i = 1; i < 9; i++) {
                    ret.push(this.bigAddSlow(ret[ret.length - 1], num2));
                }
                return ret;
            }.bind(this)();

            //console.log(eachValue);

            if (this.bigIsBigerSlow(num1, num2) > 0) {
                const count1 = num1.length;
                const count2 = num2.length;

                /**差位 */
                let cha = count1 - count2;

                /**每位值 */
                let each;
                /**是否直接跳位 */
                let next = false;
                /**残存数据 */
                let num = num1;
                /**返回值 */
                let ret = "0";

                if (showRet) {
                    console.log(eachValue);
                    for (var i = cha; i >= 0; i--) {
                        next = false;
                        for (var j = eachValue.length - 1; j >= 0; j--) {
                            each = eachValue[j];
                            for (var k = 0; k < i; k++) {
                                each += "0";
                            }
                            if (this.bigIsBigerSlow(each, num) > 0) {
                                next = false;
                            } else {
                                next = true;
                                num = this.bigSubtractSlow(num, each);
                                ret += (j + 1).toString();
                                break;
                            }
                        }
                        if (next) {

                        } else {
                            ret += "0";
                        }
                        console.log(ret);
                    }
                } else {
                    for (var i = cha; i >= 0; i--) {
                        next = false;
                        for (var j = eachValue.length - 1; j >= 0; j--) {
                            each = eachValue[j];
                            for (var k = 0; k < i; k++) {
                                each += "0";
                            }
                            if (this.bigIsBigerSlow(each, num) > 0) {
                                next = false;
                            } else {
                                next = true;
                                num = this.bigSubtractSlow(num, each);
                                ret += (j + 1).toString();
                                break;
                            }
                        }
                        if (next) {

                        } else {
                            ret += "0";
                        }
                    }
                }

                return this.bigNumberFixed(ret);
            } else {
                //暂不支持小数除法
                return "0";
            }
        },

        /**
         * 大数相除(慢速)(显示差值)
         * @param {String} num1
         * @param {String} num2
         * @param {boolean} [showRet] 是否显示ret值,默认不显示
         */
        bigDividedCutSlowShow: function (num1, num2, showRet) {
            num1 = num1.toString();
            num2 = num2.toString();

            num1 = this.bigNumberFixed(num1);
            num2 = this.bigNumberFixed(num2);

            /**是否有小数 */
            let haveF = false;

            if (/-/.test(num1) || /-/.test(num2)) {
                console.error("不支持计算负数");
            }

            /**所有值 */
            let eachValue = function () {
                let ret = [num2];
                for (var i = 1; i < 9; i++) {
                    ret.push(this.bigAddSlow(ret[ret.length - 1], num2));
                }
                return ret;
            }.bind(this)();

            //console.log(eachValue);

            if (this.bigIsBigerSlow(num1, num2) > 0) {
                const count1 = num1.length;
                const count2 = num2.length;

                /**差位 */
                let cha = count1 - count2;

                /**每位值 */
                let each;
                /**是否直接跳位 */
                let next = false;
                /**残存数据 */
                let num = num1;
                /**返回值 */
                let ret = "0";

                if (showRet) {
                    console.log(eachValue);
                    for (var i = cha; i >= 0; i--) {
                        next = false;
                        for (var j = eachValue.length - 1; j >= 0; j--) {
                            each = eachValue[j];
                            for (var k = 0; k < i; k++) {
                                each += "0";
                            }
                            if (this.bigIsBigerSlow(each, num) > 0) {
                                next = false;
                            } else {
                                next = true;
                                num = this.bigSubtractSlow(num, each);
                                ret += (j + 1).toString();
                                break;
                            }
                        }
                        if (next) {

                        } else {
                            ret += "0";
                        }
                        console.log(ret);
                    }
                } else {
                    for (var i = cha; i >= 0; i--) {
                        next = false;
                        for (var j = eachValue.length - 1; j >= 0; j--) {
                            each = eachValue[j];
                            for (var k = 0; k < i; k++) {
                                each += "0";
                            }
                            if (this.bigIsBigerSlow(each, num) > 0) {
                                next = false;
                            } else {
                                next = true;
                                num = this.bigSubtractSlow(num, each);
                                ret += (j + 1).toString();
                                break;
                            }
                        }
                        if (next) {

                        } else {
                            ret += "0";
                        }
                    }
                }

                if (this.bigIsBigerSlow(this.bigMultiplyCut(ret, num2), num1) == "0") {
                    return this.bigNumberFixed(ret);
                } else {
                    ret = this.bigNumberFixed(ret);
                    let max = this.bigAddSlow(ret, 1);
                    return {
                        max: max,
                        min: ret,
                        maxCut: this.bigSubtractSlow(this.bigMultiplyKaraSuba(max, num2), num1),
                        minCut: this.bigSubtractSlow(num1, this.bigMultiplyKaraSuba(ret, num2)),
                    };
                }
            } else {
                //暂不支持小数除法
                return "0";
            }
        },

        /**
         * 大数求随机数
         * @param {String} num
         */
        bigRandom: function (num) {
            num = num.toString();
            var key = Math.random();
            key = Math.floor(key * 10000000000000000);
            console.log(key);
            var ret = this.bigMultiplyKaraSuba(num, key);
            return this.bigNumberFixed(ret.slice(0, num.length));
        },

        /**
         * 大数开根号
         * @param {String} num
         * @param {boolean} [showCut] 是否显示切割值
         */
        bigSqrtSlow: function (num, showCut) {
            num = num.toString();

            let count = num.length;

            let min = "1";
            let max = "3";

            if (count % 2 == 1) {
                for (var i = 1; i <= Math.floor(count / 2); i++) {
                    min += "0";
                    max += "3";
                }
            } else {
                for (var i = 1; i < Math.floor(count / 2); i++) {
                    min += "0";
                    max += "3";
                }
            }

            console.log(min + " " + max);

            let t = 0;
            let center;
            let cut;

            if (showCut) {
                while (t < 10000) {
                    t++;
                    if (this.bigMultiplyKaraSuba(min, min) == num) {
                        return min;
                    } else {
                        cut = this.bigSubtractSlow(max, min);
                        if (cut <= 1) {
                            return {
                                max: max,
                                min: min,
                                maxCut: this.bigSubtractSlow(this.bigMultiplyKaraSuba(max, max), num),
                                minCut: this.bigSubtractSlow(num, this.bigMultiplyKaraSuba(min, min)),
                                t: t,
                            };
                        }
                        console.log(t + " " + cut);
                        center = this.bigMiddleValueSlow(max, min).split(".")[0];
                        //console.log(center);
                        cut = this.bigSubtractSlow(this.bigMultiplyKaraSuba(center, center), num);
                        if (this.bigIsBigerSlow(cut, 0) <= 0) {
                            min = center;
                        } else {
                            max = center;
                        }
                    }
                }
            } else {
                while (t < 10000) {
                    t++;
                    if (this.bigMultiplyKaraSuba(min, min) == num) {
                        return min;
                    } else {
                        cut = this.bigSubtractSlow(max, min);
                        if (cut <= 1) {
                            return {
                                max: max,
                                min: min,
                                maxCut: this.bigSubtractSlow(this.bigMultiplyKaraSuba(max, max), num),
                                minCut: this.bigSubtractSlow(num, this.bigMultiplyKaraSuba(min, min)),
                                t: t,
                            };
                        }
                        center = this.bigMiddleValueSlow(max, min).split(".")[0];
                        //console.log(center);
                        cut = this.bigSubtractSlow(this.bigMultiplyKaraSuba(center, center), num);
                        if (this.bigIsBigerSlow(cut, 0) <= 0) {
                            min = center;
                        } else {
                            max = center;
                        }
                    }
                }
            }
        },

        /**
         * 大数乘方(慢速)
         * @param {string} num
         * @param {number} exp
         */
        bigPowerSlow: function (num, exp) {
            if (exp == 0) {
                return "1";
            } else {
                num = num.toString();
            }
            let ret = num;
            for (var i = 1; i < exp; i++) {
                ret = this.bigMultiplyKaraSuba(ret, num);
            }
            return this.bigNumberFixed(ret);
        },

        /**
         * 大数乘方(快速)
         * @param {string} num
         * @param {number} exp
         */
        bigPower: function (num, exp) {
            if (exp == 0) {
                return "1";
            } else {
                num = num.toString();
                exp--;
            }
            let ret = num;
            for (; exp; exp /= 2) {
                exp = Math.floor(exp);
                //console.log(exp);
                if (exp & 1) {
                    ret = this.bigMultiplyKaraSuba(ret, num);
                }
                num = this.bigMultiplyKaraSuba(num, num);
            }
            return ret;
        },

        /**
         * 大数乘方(测试)
         * @param {any} num
         * @param {any} exp
         */
        bigPowerTest: function (num, exp) {

        },

        /**
         * 大数乘方求商(测试)
         * @param {any} num1
         * @param {any} exp
         * @param {any} num2
         */
        bigPowerAndQuotient: function (num1, exp, num2) {
            num1 = num1.toString();
            exp = exp.toString();
            num2 = num2.toString();

            /* 算法原理:
            ab % k = (a%k) * (b%k) % k
            所以，假设大数b是1234567
            那么a^b % k = (a^1234560 % k) * (a^7 % k) % k = ((a^123456 % k)^10 % k) * (a^7 % k) % k
            */

            /**结果堆 */
            var rets = [];

            /**乘幂结果堆 */
            var list = [];

            /**商结果堆 */
            var Qlist = [];

            /**返回值 */
            var ret = "";

            list.push("1");
            list.push(num1);

            Qlist.push("1");
            Qlist.push(this.bigQuotient(num1, num2));

            for (var i = 1; i < 10; i++) {
                list.push(this.bigMultiplyKaraSuba(list[list.length - 1], num1));
                Qlist.push(this.bigQuotient(list[list.length - 1], num2));
            }

            //console.log(list);
            //console.log(Qlist);

            for (var i = exp.length - 1; i >= 0; i--) {
                let each = "";
                let ix = exp.length - i;
                each = Qlist[exp[i]];
                for (var j = 1; j < ix; j++) {
                    each = this.bigPowerAndQuotientSlow(each, 10, num2);
                }
                rets.push(each);
            }

            ret = rets[0];

            for (var i = 1; i < rets.length; i++) {
                ret = this.bigMultiplyKaraSuba(ret, rets[i]);
            }

            return this.bigQuotient(ret, num2);
        },

        /**
         * 大数乘方求商(慢速)
         * @param {any} num1
         * @param {any} exp
         * @param {any} num2
         */
        bigPowerAndQuotientSlow: function (num1, exp, num2) {
            return this.bigQuotient(this.bigPower(num1, exp), num2);
        },

        /**
         * 大数阶乘
         * @param {any} num 乘数
         */
        bigFactorial: function (num) {
            if (num == "0" || num == "1") {
                return '1';
            }
            num = num.toString();
            ret = num;
            for (var i = num - 1; i > 1; i--) {
                ret = this.bigMultiplyKaraSuba(ret, i);
            }
            return ret.toString();
        },

        /**
         * 素数合集
         */
        numbers: [
            31,
            61,
            89,
            107,
            127,
            521,
            607,
            1279,
            2203,
            2281,
            3217,
            4253,
            4423,
            9689,
            9941,
            11213,
            19937,
        ],

        /**计算计划 */
        project: {
            /**密匙 */
            keys: {

                /**短密匙(并不是密匙) */
                middleKey: {
                    N: "4951760154835678088235319297",
                    E: "618970019642690137449562111",
                    D: "2803193270864617953997415754",
                },

                /**短密匙1*/
                shotKey1: {
                    N: "1153631",
                    E: "1447",
                    D: "1005847",
                },

                /**短密匙2*/
                shotKey2: {
                    N: "3604379",
                    E: "2029",
                    D: "3023845",
                },

                /**非常短密匙*/
                veryShowKey: {
                    N: "3599",
                    E: "71",
                    D: "3431",
                },
            },

            /**八进制密匙 */
            _key: "12345678",

            /**十六进制密钥 */
            _key16: "0123456789ABCDEF",

            /**base64密匙 */
            _64Key: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            /**
             * base64转8进制
             * @param {any} input
             */
            base64ToKey: function (input) {
                let index = "0";
                let ret = "";
                for (var i = 0; i < input.length; i++) {
                    index = this._64Key.indexOf(input[i]);
                    if (index == 64) {
                        ret += "0";
                    } else if (index == -1) {
                        ret += input[i];
                    } else {
                        ret += this._key[Math.floor(index / 8)]
                        ret += this._key[index % 8];
                    }
                }
                return ret;
            },

            /**
             * 8进制转base64
             * @param {any} input
             */
            keyToBase64: function (input) {
                let indexA = "";
                let indexB = "";
                let index = 0;
                let ret = "";
                for (var i = 0; i < input.length; i++) {
                    indexA = input[i];
                    if (indexA == "0") {
                        ret += "=";
                        continue;
                    } else if (this._key.indexOf(indexA) == -1) {
                        ret += indexA;
                        continue;
                    }
                    i++;
                    indexB = input[i];
                    index = this._key.indexOf(indexA) * 8 + this._key.indexOf(indexB);
                    //console.log(indexA+" "+indexB+" "+index);
                    ret += this._64Key[index];
                }
                return ret;
            },

            /**
             * 转码为八进制
             * @param {any} input
             */
            encode: function (input) {
                return this.base64ToKey(lt_code.base64.encode(input.toString()));
            },

            /**
             * 八进制解码
             * @param {any} input
             */
            decode: function (input) {
                return lt_code.base64.decode(this.keyToBase64(input.toString()));
            },

            /**
             * RSA加密
             * @param {any} input
             * @param {{K:String,E:String,D:String}} key key至少包含N,E,D三个参数
             */
            setCode: function (input, key) {
                key = key ? key : console.error("参数错误!");
                input = lt_code.base64.encode(input.toString());
                let ret = this.base64ToKey(input).toString();
                let rets = [];
                for (var i = 0; i < ret.length - 1; i++) {
                    rets.push(ret[i++] + ret[i]);
                }
                if (ret.length & 1) {
                    rets.push(ret[ret.length - 1]);
                }
                //console.log(rets);
                ret = "";
                for (var i = 0; i < rets.length - 1; i++) {
                    //ret += lt_code.RSA.bigQuotient(lt_code.RSA.bigPower(rets[i], this.keys.veryShowKey.E), this.keys.veryShowKey.N)+",";
                    ret += lt_code.RSA.bigPowerAndQuotient(rets[i], key.E, key.N) + ",";
                }
                ret += lt_code.RSA.bigPowerAndQuotient(rets[rets.length - 1], key.E, key.N);
                //console.log(ret);
                return lt_code.base64.encode(ret);
            },

            /**
             * 非常短的密匙加密
             * @param {any} input
             */
            veryShotKeySetCode: function (input) {
                input = lt_code.base64.encode(input.toString());
                let ret = this.base64ToKey(input).toString();
                let rets = [];
                for (var i = 0; i < ret.length - 1; i++) {
                    rets.push(ret[i++] + ret[i]);
                }
                if (ret.length & 1) {
                    rets.push(ret[ret.length - 1]);
                }
                console.log(rets);
                ret = "";
                for (var i = 0; i < rets.length - 1; i++) {
                    //ret += lt_code.RSA.bigQuotient(lt_code.RSA.bigPower(rets[i], this.keys.veryShowKey.E), this.keys.veryShowKey.N)+",";
                    ret += lt_code.RSA.bigPowerAndQuotient(rets[i], this.keys.veryShowKey.E, this.keys.veryShowKey.N) + ",";
                }
                ret += lt_code.RSA.bigPowerAndQuotient(rets[rets.length - 1], this.keys.veryShowKey.E, this.keys.veryShowKey.N);
                console.log(ret);
                return lt_code.base64.encode(ret);
            },

            /**
             * RSA解密
             * @param {any} input
             * @param {{K:String,E:String,D:String}} key key至少包含N,E,D三个参数
             */
            getCode: function (input, key) {
                input = lt_code.base64.decode(input.toString());
                let rets = input.split(",");
                let ret = "";
                //console.log(rets);
                for (var i = 0; i < rets.length; i++) {
                    //ret += lt_code.RSA.bigQuotient(lt_code.RSA.bigPower(rets[i], this.keys.veryShowKey.D), this.keys.veryShowKey.N);
                    ret += lt_code.RSA.bigPowerAndQuotient(rets[i], key.D, key.N);
                }
                //console.log(ret);
                ret = lt_code.base64.decode(this.keyToBase64(ret));
                return (ret[ret.length - 1]) && /[\s\n\0]/.test(ret[ret.length - 1]) ? ret.slice(0, ret.length - 1) : ret;
            },

            /**
             * 非常短的密匙解密
             * @param {any} input
             */
            veryShotKeyGetCode: function (input) {
                input = lt_code.base64.decode(input.toString());
                let rets = input.split(",");
                let ret = "";
                console.log(rets);
                for (var i = 0; i < rets.length; i++) {
                    //ret += lt_code.RSA.bigQuotient(lt_code.RSA.bigPower(rets[i], this.keys.veryShowKey.D), this.keys.veryShowKey.N);
                    ret += lt_code.RSA.bigPowerAndQuotient(rets[i], this.keys.veryShowKey.D, this.keys.veryShowKey.N);
                }
                console.log(ret);
                ret = lt_code.base64.decode(this.keyToBase64(ret));
                return ret.slice(0, ret.length - 1);
            },
        },

        /**
         * 获取密匙
         */
        getKey: function (num1, num2, num3) {
            var time = new Date();
            let P = num1 ? num1 : this.getPrime(this.numbers[0]);
            //let P = this.numbers[lt_code.variable.random(this.numbers.length, 0, true)];
            let Q = num2 ? num2 : this.getPrime(this.numbers[1]);
            //let Q = this.numbers[lt_code.variable.random(this.numbers.length, 0, true)];

            console.log("P : " + P + "\nQ : " + Q);

            let N = this.bigMultiplyCut(P, Q);

            let O = this.bigMultiplyCut(this.bigSubtractSlow(P, 1), this.bigSubtractSlow(Q, 1));

            let E = num3 ? num3 : this.getPrime(this.numbers[2]);

            console.log("N : " + N + "\nO : " + O + "\nE : " + E);

            /**私密匙 */
            let D = this.bigRandom(O);
            //let K = this.bigRandom(E);
            let answer = null;
            //防止内存溢出
            //var wm = new WeakMap();

            let i = 0;

            //while (answer != 1&&i<30000) {
            //    i++;
            //    answer = this.bigMultiplyKaraSuba(D, E);
            //    answer = this.bigQuotient(answer, O);
            //    console.log(i+" "+ answer);
            //    D = /*this.bigRandom(O)*/ this.bigAddSlow(D,1);
            //}
            //if (i<29999) {
            //    D = this.bigSubtractSlow(D, 1);

            //    console.log("D : " + D + "\nE : " + E + "\nN : " + N + "\nO : " + O);
            //    //console.error("d参数生成有错误!!!")
            //    //let message = `计算私钥D
            //    //    E * D % φ(N) = 1
            //    //    3 * D  % 20 = 1   `;
            //    //console.error(message);
            //    return D;
            //} else {
            //    console.log(new Date(new Date().getTime() - time.getTime()).getTime());
            //}

            while (true) {
                i++;
                answer = this.bigQuotient(this.bigAddSlow(this.bigMultiplyKaraSuba(i, O), 1), E);
                if (answer == 0) {
                    break;
                } else {
                    // console.log(answer);
                }
            }
            D = this.bigDividedCutSlow(this.bigAddSlow(this.bigMultiplyKaraSuba(i, O), 1), E);
            console.log("D : " + D + "\nE : " + E + "\nN : " + N + "\nO : " + O);
            return D;
        },

        getKey2: function (p, q) {

        },

        /**
         * n是否为素数(未完成)
         * @param {any} n
         */
        isPrime: function (n) {
            if (this.bigIsBigerSlow(n, 2) < 0) {
                return false;
            } else if (n == 2) {
                return true;
            } else if (/./.test(this.bigMidValueSlow(n))) {
                return false;
            }

        },

        /**
         * n是否为素数
         * @param {any} n
         */
        isPrime2: function (n) {
            /**
             * 高精度
             * @param {any} a
             * @param {any} b
             * @param {any} mod
             */
            var mul = (a, b, mod) => {
                a = this.bigQuotient(a, mod);
                b = this.bigQuotient(b, mod);
                var c = this.bigDividedCutSlow(this.bigMultiplyKaraSuba(a, b), mod);
                var ret = this.bigSubtractSlow(this.bigMultiplyKaraSuba(a, b), this.bigMultiplyKaraSuba(c, mod))
                return this.bigQuotient(this.bigAddSlow(this.bigQuotient(ret, mod), mod), mod);
            };

            /**
             * 快速幂
             * @param {any} x
             * @param {any} n
             * @param {any} mod
             */
            var pow_mod = (x, n, mod) => {
                var res = 1;
                while (n != "0") {
                    if (n & 1)
                        res = mul(res, x, mod);
                    x = mul(x, x, mod);
                    n = this.bigMidValueNoFloatSlow(n);
                }
                return this.bigQuotient(this.bigAddSlow(res, mod), mod);
            };

            var Miller_Rabbin = (a, n) => {

                //把n-1 转化为(2^r)*d
                var s = this.bigSubtractSlow(n, 1),
                    r = 0;
                while ((s & 1) == 0) {
                    s = this.bigMidValueNoFloatSlow(s);
                    r++;
                }

                //算出2^d 存在k里面
                var k = pow_mod(a, s, n);

                //二次探测 看变化过程中是不是等于1 或者n-1;
                if (k == 1) {
                    return true;
                } else {
                    for (var i = 0; i < r; i++) {
                        k = this.bigPowerAndQuotient(k, 2, n);
                        if (k == n - 1) {
                            return true;
                        }
                    }
                }
                return false;
            };

            var prime = [2, 3, 5, 7, 11, 13, 17, 19];
            for (var i = 0; i < prime.length; i++) {
                if (n == prime[i]) {
                    return true;
                }
                if (Miller_Rabbin(prime[i], n) == false) {
                    return false;//未通过探测 返回假
                }
            }
            return true;//通过探测 返回真
        },

        /**测试取中值是用那种算法快*/
        testMidValueAndDiv2: function () {
            var a = "1000000000000000000000000000000000000000000000000000000000000000";
            const count = 1000;
            var list = [];
            var ans1 = [], ans2 = [];
            for (var i = 0; i < count; i++) {
                list.push(this.bigRandom(a));
            }
            var time = new Date().getTime();
            for (var i = 0; i < list.length; i++) {
                ans1.push(this.bigDividedCutSlow(list[i], 2));
            }
            var time2 = new Date().getTime();
            for (var i = 0; i < list.length; i++) {
                ans2.push(this.bigMidValueSlow(list[i]));
            }
            var time3 = new Date().getTime();
            return {
                ans1: ans1,
                ans2: ans2,
                time1: time2 - time,
                time2: time3 - time2
            };
        },

        /**
         * 测试互质(未知错误,或者是数据错误)
         * 辗转相除法
         * @param {any} num1
         * @param {any} num2
         */
        testMutualityA: function (num1, num2) {
            num1 = num1.toString();
            num2 = num2.toString();
            if (this.bigIsBigerSlow(num1, num2) < 0) {
                let temp = num1;
                num1 = num2;
                num2 = temp;
            }
            if (num1 == 1 || num2 == 1) {
                return true;
            }
            while (true) {
                let t = this.bigQuotient(num1, num2);
                console.log(t);
                if (t == "0") {
                    break;
                } else {
                    num1 = num2;
                    num2 = t;
                }
            }
            if (this.bigIsBigerSlow(num2, 1) > 0) {
                console.log(num1 + " " + num2);
                return false;
            } else {
                console.log(num1 + " " + num2);
                return true;
            }
        },

        /**
         * 测试互质(别用,傻逼算法)
         * 更相减损法
         * @param {any} num1
         * @param {any} num2
         */
        testMutualityB: function (num1, num2) {
            num1 = num1.toString();
            num2 = num2.toString();
            if (this.bigIsBigerSlow(num1, num2) < 0) {
                let temp = num1;
                num1 = num2;
                num2 = temp;
            }
            if (num1 == 1 || num2 == 1) {
                return true;
            }
            while (true) {
                let t = this.bigSubtractSlow(num1, num2);
                console.log(t);
                if (this.bigIsBigerSlow(t, num2) == 0) {
                    break;
                } else {
                    if (this.bigIsBigerSlow(t, num2) > 0) {
                        num1 = t;
                    } else {
                        num1 = num2;
                        num2 = t;
                    }
                }
            }
            if (this.bigIsBigerSlow(num2, 1) > 0) {
                console.log(num1 + " " + num2);
                return false;
            } else {
                console.log(num1 + " " + num2);
                return true;
            }
        },

        /**
         * 测试互质
         * 辗转相除法(另一种)
         * @param {any} num1
         * @param {any} num2
         */
        testMutualityC: function (num1, num2) {
            num1 = num1.toString();
            num2 = num2.toString();
            if (this.bigIsBigerSlow(num1, num2) < 0) {
                let temp = num1;
                num1 = num2;
                num2 = temp;
            }
            return this.bigQuotient(num1, num2) == 0 ? num2 : this.testMutualityC(num2, this.bigQuotient(num1, num2));
        },

        /**
         * 测试相加计算速度
         * @param {number} count 计算项数
         */
        testAdd: function (count) {
            /**开始时间 */
            let startTime = new Date().getTime();
            let num1 = lt_code.variable.random(10, 0, true);
            let num2 = lt_code.variable.random(10, 0, true);

            for (var i = 0; i < 9 * count; i++) {
                ansewer = num1 + num2;
            }
            let stopTime1 = new Date().getTime();
            let time1 = stopTime1 - startTime;
            startTime = stopTime1;

            num1 = lt_code.variable.random(1000000000, 0, true);
            num2 = lt_code.variable.random(1000000000, 0, true);
            for (var i = 0; i < count; i++) {
                ansewer = num1 + num2;
            }
            let stopTime2 = new Date().getTime();
            let time2 = stopTime2 - startTime;
            console.log(time1 + " " + time2);
            return time1 < time2 ? "小位数计算快" : "大位数计算快";
        },

        /**
         * 测试相乘计算速度
         * @param {number} count 计算项数
         */
        testMultiply: function (count) {
            /**开始时间 */
            let startTime = new Date().getTime();
            let num1 = lt_code.variable.random(10, 0, true);
            let num2 = lt_code.variable.random(10, 0, true);
            let ansewer = 0;

            for (var i = 0; i < 9 * count; i++) {
                ansewer = num1 * num2;
            }
            let stopTime1 = new Date().getTime();
            let time1 = stopTime1 - startTime;
            startTime = stopTime1;

            num1 = lt_code.variable.random(1000000000, 0, true);
            num2 = lt_code.variable.random(1000000000, 0, true);
            for (var i = 0; i < count; i++) {
                ansewer = num1 * num2;
            }
            let stopTime2 = new Date().getTime();
            let time2 = stopTime2 - startTime;
            console.log(time1 + " " + time2);
            return time1 < time2 ? "小位数计算快" : "大位数计算快";
        },

        /**
         * 测试分治算法计算速度
         * @param {number} count 两项乘数位数
         */
        testKaraSubaTime: function (count) {
            var num1 = "";
            for (var i = 1; i <= count; i++) {
                num1 += (i % 10).toString();
            }
            var startTime = new Date().getTime();
            var ret = this.bigMultiplyKaraSuba(num1, num1);
            var stopTime = new Date().getTime();
            return (stopTime - startTime).toString() + "ms answer:" + ret + " count:" + ret.length;
        },

        /**
         * 测试分割算法(测试版)计算速度
         * @param {number} count 两项乘数位数
         */
        testCutSlowTime: function (count) {
            var num1 = "";
            for (var i = 1; i <= count; i++) {
                num1 += (i % 10).toString();
            }
            var startTime = new Date().getTime();
            var ret = this.bigMultiplyCutSlow(num1, num1);
            var stopTime = new Date().getTime();
            return (stopTime - startTime).toString() + "ms answer:" + ret + " count:" + ret.length;
        },

        /**
         * 测试分割算法计算速度
         * @param {number} count 两项乘数位数
         */
        testCutTime: function (count) {
            var num1 = "";
            for (var i = 1; i <= count; i++) {
                num1 += (i % 10).toString();
            }
            var startTime = new Date().getTime();
            var ret = this.bigMultiplyCut(num1, num1);
            var stopTime = new Date().getTime();
            return (stopTime - startTime).toString() + "ms answer:" + ret + " count:" + ret.length;
        },

        /**
         * 测试相除
         * @param {number} count
         */
        testDivided: function (count) {
            var a = "";
            for (var i = 0; i < count; i++) {
                a += (i % 10).toString();
            }
            var b = this.bigAddSlow(a, 1);
            var c = this.bigMultiplyKaraSuba(a, b);
            console.log(a + " " + b + " " + c);
            var startTime = new Date().getTime();
            var q = this.bigDividedSlow(c, a, true);
            var stopTime = new Date().getTime();
            return q + " " + b + " " + this.bigIsBigerSlow(q, b).toString() + " " + (stopTime - startTime).toString();
        },

        /**
         * 测试相除
         * @param {number} count
         */
        testDividedCut: function (count) {
            var a = "";
            for (var i = 0; i < count; i++) {
                a += (i % 10).toString();
            }
            var b = this.bigAddSlow(a, 1);
            var c = this.bigMultiplyKaraSuba(a, b);
            console.log(a + " " + b + " " + c);
            var startTime = new Date().getTime();
            var q = this.bigDividedCutSlow(c, a, true);
            var stopTime = new Date().getTime();
            return q + " " + b + " " + this.bigIsBigerSlow(q, b).toString() + " " + (stopTime - startTime).toString() + "ms";
        },

        /**
         * 获取素数(获取已知素数用)
         * @param {number} count 叠成方次数
         */
        getPrime: function (count) {
            var ret = "2";
            for (var i = 1; i < count; i++) {
                ret = this.bigAddSlow(ret, ret);
            }
            return this.bigNumberFixed(this.bigSubtractSlow(ret, 1));
        }
    },

    /**
     * 变量模块
     */
    variable: {
        /**
         * 运行挂载池
         */
        runer: [],

        /**
         * 加载事件池
         */
        onload: [],

        /**
         * 窗体是否已经加载完成
         */
        isOnload: false,

        /**
         * 
         * @param {number} num 挂载ID
         * @param {string} [name] 挂载名称
         */
        addRun: function (num, name) {
            name = name ? name : "匿名事件";
            var newOne = { name: name, num: num };
            lt_code.variable.runer[lt_code.variable.runer.length] = newOne;
        },

        /**
         * 关闭挂载
         * @param {string} name 挂载名称
         */
        delRun: function (name) {
            lt_code.variable.runer.forEach(function (e) {
                if (e.name == name) {
                    clearInterval(e.num);
                }
            });
        },

        /**
         * 对对象进行深拷贝，可以指定深度
         * @param {any} obj 要拷贝的对象
         * @param {number} [deep=-1] 深度限制，默认为 -1，表示无限深度
         * @returns {any} 深拷贝的对象
         */
        copy: function (obj, deep = -1) {
            var ret;
            if (Array.isArray(obj)) {
                ret = [];
            } else {
                ret = {};
            }
            for (var k in obj) {
                // 当 deep 不为 0 时，继续递归；deep 为 0 时，停止递归
                if (typeof obj[k] === 'object' && obj[k] !== null && deep !== 0) {
                    ret[k] = this.copy(obj[k], deep - 1);
                } else {
                    ret[k] = obj[k];
                }
            }
            return ret;
        },

        /**
         * 生成新UUID
         * 标准32位
         * @param {any} [input] 输入
         */
        newUUID: function (input) {
            input = input ? input : new Date().getTime().toString();
            input = lt_code.md5(input);
            var sha = lt_code.SHA256.encode(input);
            var dex = "";
            var uuid = 'uuxxxuuy-1xxx-7xxx-yxxx-xxx0xxxy'.replace(/[uxy]/g, function (e, i) {
                return e == "u" ? function () {
                    var ret = sha[2 * i];
                    dex += ret;
                    return ret;
                }() : e == "x" ? function () {
                    var ret = input[i];
                    dex += ret;
                    return ret;
                }() : function () {
                    return lt_code.md5(dex)[i];
                }();
            });
            return uuid;
        },

        /**
         * 添加启动事件
         * @param {*} func 
         * @param {*} name 
         */
        addLoad: function (func, name = "匿名启动事件") {
            if (!!func) {
                var newOne = { name: name, function: func };
                lt_code.variable.onload.push(newOne);
            }
        }
    },

    /**sha256加密模块 */
    SHA256: {

        rotateRight: function (n, x) {
            return ((x >>> n) | (x << (32 - n)));
        },

        choice: function (x, y, z) {
            return ((x & y) ^ (~x & z));
        },

        majority: function (x, y, z) {
            return ((x & y) ^ (x & z) ^ (y & z));
        },
        sha256_Sigma0: function (x) {
            return (this.rotateRight(2, x) ^ this.rotateRight(13, x) ^ this.rotateRight(22, x));
        },
        sha256_Sigma1: function (x) {
            return (this.rotateRight(6, x) ^ this.rotateRight(11, x) ^ this.rotateRight(25, x));
        },
        sha256_sigma0: function (x) {
            return (this.rotateRight(7, x) ^ this.rotateRight(18, x) ^ (x >>> 3));
        },
        sha256_sigma1: function (x) {
            return (this.rotateRight(17, x) ^ this.rotateRight(19, x) ^ (x >>> 10));
        },
        sha256_expand: function (W, j) {
            return (W[j & 0x0f] += this.sha256_sigma1(W[(j + 14) & 0x0f]) + W[(j + 9) & 0x0f] +
                this.sha256_sigma0(W[(j + 1) & 0x0f]));
        },

        /* Hash constant words K: */
        K256: new Array(
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
            0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
            0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
            0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
            0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
            0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
            0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
            0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
            0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ),

        /* global arrays */
        ihash: [],
        count: [],
        buffer: [],
        sha256_hex_digits: "0123456789ABCDEF",

        /* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters: 
        overflow) */
        safe_add: function (x, y) {
            var lsw = (x & 0xffff) + (y & 0xffff);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xffff);
        },

        /* Initialise the SHA256 computation */
        sha256_init: function () {
            this.ihash = new Array(8);
            this.count = new Array(2);
            this.buffer = new Array(64);
            this.count[0] = this.count[1] = 0;
            this.ihash[0] = 0x6a09e667;
            this.ihash[1] = 0xbb67ae85;
            this.ihash[2] = 0x3c6ef372;
            this.ihash[3] = 0xa54ff53a;
            this.ihash[4] = 0x510e527f;
            this.ihash[5] = 0x9b05688c;
            this.ihash[6] = 0x1f83d9ab;
            this.ihash[7] = 0x5be0cd19;
        },

        /* Transform a 512-bit message block */
        sha256_transform: function () {
            var a, b, c, d, e, f, g, h, T1, T2;
            var W = new Array(16);

            /* Initialize registers with the previous intermediate value */
            a = this.ihash[0];
            b = this.ihash[1];
            c = this.ihash[2];
            d = this.ihash[3];
            e = this.ihash[4];
            f = this.ihash[5];
            g = this.ihash[6];
            h = this.ihash[7];

            /* make 32-bit words */
            for (var i = 0; i < 16; i++)
                W[i] = ((this.buffer[(i << 2) + 3]) | (this.buffer[(i << 2) + 2] << 8) | (this.buffer[(i << 2) + 1]
                    << 16) | (this.buffer[i << 2] << 24));

            for (var j = 0; j < 64; j++) {
                T1 = h + this.sha256_Sigma1(e) + this.choice(e, f, g) + this.K256[j];
                if (j < 16) T1 += W[j];
                else T1 += this.sha256_expand(W, j);
                T2 = this.sha256_Sigma0(a) + this.majority(a, b, c);
                h = g;
                g = f;
                f = e;
                e = this.safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = this.safe_add(T1, T2);
            }

            /* Compute the current intermediate hash value */
            this.ihash[0] += a;
            this.ihash[1] += b;
            this.ihash[2] += c;
            this.ihash[3] += d;
            this.ihash[4] += e;
            this.ihash[5] += f;
            this.ihash[6] += g;
            this.ihash[7] += h;
        },

        /* Read the next chunk of data and update the SHA256 computation */
        sha256_update: function (data, inputLen) {
            var i, index, curpos = 0;
            /* Compute number of bytes mod 64 */
            index = ((this.count[0] >> 3) & 0x3f);
            var remainder = (inputLen & 0x3f);

            /* Update number of bits */
            if ((this.count[0] += (inputLen << 3)) < (inputLen << 3)) count[1]++;
            this.count[1] += (inputLen >> 29);

            /* Transform as many times as possible */
            for (i = 0; i + 63 < inputLen; i += 64) {
                for (var j = index; j < 64; j++)
                    buffer[j] = data.charCodeAt(curpos++);
                this.sha256_transform();
                index = 0;
            }

            /* Buffer remaining input */
            for (var j = 0; j < remainder; j++)
                this.buffer[j] = data.charCodeAt(curpos++);
        },

        /* Finish the computation by operations such as padding */
        sha256_final: function () {
            var index = ((this.count[0] >> 3) & 0x3f);
            this.buffer[index++] = 0x80;
            if (index <= 56) {
                for (var i = index; i < 56; i++)
                    this.buffer[i] = 0;
            } else {
                for (var i = index; i < 64; i++)
                    this.buffer[i] = 0;
                this.sha256_transform();
                for (var i = 0; i < 56; i++)
                    this.buffer[i] = 0;
            }
            this.buffer[56] = (this.count[1] >>> 24) & 0xff;
            this.buffer[57] = (this.count[1] >>> 16) & 0xff;
            this.buffer[58] = (this.count[1] >>> 8) & 0xff;
            this.buffer[59] = this.count[1] & 0xff;
            this.buffer[60] = (this.count[0] >>> 24) & 0xff;
            this.buffer[61] = (this.count[0] >>> 16) & 0xff;
            this.buffer[62] = (this.count[0] >>> 8) & 0xff;
            this.buffer[63] = this.count[0] & 0xff;
            this.sha256_transform();
        },

        /* Split the internal hash values into an array of bytes */
        sha256_encode_bytes: function () {
            var j = 0;
            var output = new Array(32);
            for (var i = 0; i < 8; i++) {
                output[j++] = ((this.ihash[i] >>> 24) & 0xff);
                output[j++] = ((this.ihash[i] >>> 16) & 0xff);
                output[j++] = ((this.ihash[i] >>> 8) & 0xff);
                output[j++] = (this.ihash[i] & 0xff);
            }
            return output;
        },

        /* Get the internal hash as a hex string */
        sha256_encode_hex: function () {
            var output = "";
            for (var i = 0; i < 8; i++) {
                for (var j = 28; j >= 0; j -= 4)
                    output += this.sha256_hex_digits.charAt((this.ihash[i] >>> j) & 0x0f);
            }
            return output;
        },

        /* Main function: returns a hex string representing the SHA256 value of the 
        given data */
        sha256_digest: function (data) {
            this.sha256_init();
            this.sha256_update(data, data.length);
            this.sha256_final();
            return this.sha256_encode_hex();
        },

        /**
         * 加密成sha256
         * (因为sha256几乎不可逆,所以decode功能写成和encode一样)
         * @param {object} data
         */
        decode: function (data) {
            data = data.toString();
            return this.sha256_digest(data);
        },

        /**
         * 加密成sha256
         * @param {object} data
         */
        encode: function (data) {
            data = data.toString();
            return this.sha256_digest(data);
        },

        /* test if the JS-interpreter is working properly */
        sha256_self_test: function () {
            return this.sha256_digest("message digest") ==
                "f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650";
        },
    },

    /**
     * 追加方法模块
     */
    addMethod: {
        /**
         * 向模块中添加方法
         */
        AddMethod: function () {
            if (!Array.prototype.add) {
                /**
                 * 添加不重复的对象
                 * @param {...any} item
                 */
                Object.defineProperty(Array.prototype, "add", {
                    value: function (...item) {
                        for (var i = 0; i < item.length; i++) {
                            if (this.indexOf(item[i]) >= 0) {
                                continue;
                            } else {
                                this[this.length] = item[i];
                            }
                        }
                        return this.length;
                    },
                    enumerable: false
                });
            }

            /**判断字符串是否为null或者是空白字符串 */
            String.IsNullEmptyOrSpace = function (value) {
                if (value == undefined || value == null) {
                    return true;
                } else if (typeof (value) == "string") {
                    return value.IsNullEmptyOrSpace();
                } else {
                    return false;
                }
            };

            /**判断字符串是否为null或者是空白字符串 */
            String.prototype.IsNullEmptyOrSpace = function () {
                return this == null || this == undefined || this == "" || this.trim() == "";
            };

            /**
             * 记录原本的toString方法
             * @returns {string}
             */
            Date.prototype.toBaseString = Date.prototype.toString;

            /**
             * 日期格式化
             * @param {any} [fmt]
             */
            Date.prototype.toString = function (fmt) {
                if (!fmt) {
                    return this.toBaseString();
                }
                var o = {
                    "M+": this.getMonth() + 1,                   //月份
                    "d+": this.getDate(),                        //日
                    "h+": this.getHours(),                       //小时
                    "m+": this.getMinutes(),                     //分
                    "s+": this.getSeconds(),                     //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds()                  //毫秒
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
                return fmt;
            };

            /**
             * 两个列表取交集
             * @param {[]} arr1
             * @param {[]} arr2
             */
            Array.intersection = function (arr1, arr2) {
                try {
                    //使用ES6
                    const set = new Set(arr2);
                    return arr1.filter(item => set.has(item));
                } catch (e) {
                    //不支持ES6
                    return arr1.filter(item => arr2.has(item));
                }
            };

            /**
             * 两个列表取交集
             */
            Object.defineProperty(Array.prototype, "intersection", {
                value: function (other) {
                    return Array.intersection(this, other);
                },
                enumerable: false
            });

            /**
             * 并集
             * @param {[]} arr1
             * @param {[]} arr2
             */
            Array.union = function (arr1, arr2) {
                try {
                    //使用ES6
                    return [...new Set([...arr1, ...arr2])];
                } catch (e) {
                    //不支持ES6
                    var ret = [];
                    arr1.forEach(t => ret.add(t));
                    arr2.forEach(t => ret.add(t));
                    return ret;
                }
            };

            /**
             * 并集
             */
            Object.defineProperty(Array.prototype, "union", {
                value: function (other) {
                    return Array.union(this, other);
                },
                enumerable: false
            });

            /**
             * 差集
             * @param {[]} arr1
             * @param {[]} arr2
             */
            Array.difference = function (arr1, arr2) {
                try {
                    //使用ES6
                    var set = new Set(arr2);
                    return arr1.filter(item => !set.includes(item));
                } catch (e) {
                    //不支持ES6
                    return arr1.filter(item => !arr2.includes(item));
                }
            };

            /**
             * 差集
             */
            Object.defineProperty(Array.prototype, "difference", {
                value: function (other) {
                    return Array.difference(this, other);
                },
                enumerable: false
            });

            /**
             * 对称差
             * @param {[]} arr1
             * @param {[]} arr2
             */
            Array.symmetricDifference = function (arr1, arr2) {
                try {
                    return [...difference(arr1, arr2), ...difference(arr2, arr1)];
                } catch (e) {
                    return Array.difference(arr1, arr2).union(Array.difference(arr2, arr1));
                }
            };

            /**
             * 全部匹配
             * @param {RegExp} regex 正则表达式
             * @returns {Array}
             */
            var matchAll = function (regex) {
                if (!regex.flags) {
                    return regex.exec(this);
                } else if (/g/.test(regex.flags)) {
                    let ret = [];
                    let match;
                    while ((match = regex.exec(this)) !== null) {
                        ret.push(match);
                    }
                    return ret;
                }
            };

            /**如果string没有matchAll则使用自己写的函数 */
            String.prototype.matchAll = String.prototype.matchAll ? String.prototype.matchAll : matchAll;

            /**显示localStorage使用了多少存储空间 */
            localStorage.__proto__.show = function () {
                var total = unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
                console.log("localStorage已经使用了 " + Math.floor(total / 1024) + "KB 的空间");
            };
        },
    },

    /**
     * 获得id所代表的dom
     * @param {string} idName 输入id名
     * @return {HTMLElement} dom
     */
    getId: function (idName) {
        var falseRet = () => {
            console.trace("getId函数没有输入值!");
            //console.trace(this);
            //console.trace(arguments.callee.caller.name);
        };
        return !document.getElementById(idName) ? falseRet() : document.getElementById(idName);
    },

    /**
     * 读取class所代表的dom(重载+4)
     * @param {string} className 输入class的名字 
     * @param {number} few 输入要读取的class里面的第几个
     * @param {HTMLElement} dom_father 要读取的父类代号
     * @param {boolean} useFew 是否使用few参数(默认使用)
     * @return {HTMLElement|HTMLElement[]} dom|doms
     */
    getClass: function (className, few, dom_father, useFew) {
        switch (arguments.length) {
            case 1: return document.getElementsByClassName(className);
            case 2: return document.getElementsByClassName(className)[few];
            case 3: return dom_father.getElementsByClassName(className)[few];
            case 4: if (useFew) {
                return dom_father.getElementsByClassName(className)[few];
            } else {
                return dom_father.getElementsByClassName(className);
            }
            default:
                if (arguments.length !== 0) {
                    console.trace("getClass函数输入错误!");

                } else {
                    console.trace("getClass函数没有输入值!");

                }
        }
    },

    /**
     * 读取所有标签所代表的dom(重载+4)
     * @param {string} tageName 输入标签名
     * @param {HTMLElement} dom_father 输入要读取的父元素(不输入默认全文档)
     * @param {number} few 输入要读取的tage里面的第几个(不输入默认返回数组)
     * @param {boolean} ISuseDom 是否使用dom参数(默认使用)
     * @return {HTMLElement|HTMLElement[]} dom|doms
     */
    getTage: function (tageName, dom_father, few, ISuseDom) {
        switch (arguments.length) {
            case 1:
                return document.getElementsByTagName(tageName);
            case 2:
                return dom_father.getElementsByTagName(tageName);
            case 3:
                return dom_father.getElementsByTagName(tageName)[few];
            case 4:
                if (ISuseDom) {
                    return dom_father.getElementsByTagName(tageName)[few];
                } else {
                    return document.getElementsByTagName(tageName)[few];
                }
            default:
                if (arguments.length !== 0) {
                    console.trace("getTage函数输入错误!");

                } else {
                    console.trace("getTage函数没有输入值!");

                }
        }
    },

    /**
     * 读取对象的函数(功能不强)(重载+4)(id:#)(class:.)
     * @param {string} name 输入的名称(可以是任何方式) 
     * @param {number} few 第几个
     * @param {HTMLElement} dom_father 父类名称
     * @param {boolean} useFew 是否使用few参数
     * @return {HTMLElement|HTMLCollection|void} 输出对象
     */
    getAll: function (name, few, dom_father, useFew) {
        /**读取对象的内容 */
        var value_read;
        /**正则读取到的数组 */
        var exec_value = new Array();
        /**用于返回的参数 */
        var return_value;
        if (arguments.length === 0) {
            return_value = document.body;
        } else if (arguments.length === 1) {
            exec_value = /\#?\.?/.exec(name);
            if (!exec_value || !exec_value[0]) {
                return_value = lt_code.getTage(name);
            } else {
                if (exec_value[0] === "#.") {
                    return_value = null;
                } else {
                    value_read = name.replace(/\#?\.?/, "");
                    if (exec_value[0] === "#") {
                        return_value = lt_code.getId(value_read);
                    } else if (exec_value[0] === ".") {
                        return_value = lt_code.getClass(value_read);
                    }
                }
            }
        } else if (arguments.length === 2) {
            exec_value = /\#?\.?/.exec(name);
            if (!exec_value || !exec_value[0]) {
                return_value = lt_code.getTage(name, null, few, false);
            } else {
                if (exec_value[0] === "#.") {
                    return_value = null;
                } else {
                    value_read = name.replace(/\#?\.?/, "");
                    if (exec_value[0] === "#") {
                        return_value = lt_code.getId(value_read);
                        console.trace("getAll函数读取id不需要输入few参数");

                    } else if (exec_value[0] === ".") {
                        return_value = lt_code.getClass(value_read, few);
                    }
                }
            }
        } else if (arguments.length === 3) {
            exec_value = /\#?\.?/.exec(name);
            if (!exec_value || !exec_value[0]) {
                return_value = lt_code.getTage(name, dom_father, few);
            } else {
                if (exec_value[0] === "#.") {
                    return_value = null;
                } else {
                    value_read = name.replace(/\#?\.?/, "");
                    if (exec_value[0] === "#") {
                        return_value = lt_code.getId(value_read);
                        console.trace("getAll函数读取id不需要输入few参数");

                    } else if (exec_value[0] === ".") {
                        return_value = lt_code.getClass(value_read, few, dom_father);
                    }
                }
            }
        } else if (arguments.length === 4) {
            exec_value = /\#?\.?/.exec(name);
            if (!exec_value || !exec_value[0]) {
                if (useFew) {
                    return_value = lt_code.getTage(name, dom_father, few);
                } else {
                    return_value = lt_code.getTage(name, dom_father);
                }
            } else {
                if (exec_value[0] === "#.") {
                    return_value = null;
                } else {
                    value_read = name.replace(/\#?\.?/, "");
                    if (exec_value[0] === "#") {
                        return_value = lt_code.getId(value_read);
                        console.trace("getAll函数读取id不需要输入few参数");

                    } else if (exec_value[0] === ".") {
                        return_value = lt_code.getClass(value_read, few, dom_father);
                    }
                }
            }
        } else {
            return_value = document.head;
        }

        if (return_value === null) {
            console.trace("getAll函数name参数输入错误!");

        } else if (return_value === undefined) {
            console.trace("本页面中没有找到此对象");

        } else if (return_value.length === 0) {
            console.trace("没有此对象|此页面中没有使用此对象");

        } else if (return_value.length === 1) {
            return_value = return_value[0];
        }

        return return_value;
    },

    /**
     * 读取对象的函数(稍微有些差别)(重载+4)(id:#)(class:.)
     * @param {string} name 输入的名称(可以是任何方式) 
     * @param {HTMLElement} dom_father 父类名称
     * @param {number} few 第几个
     * @param {boolean} useFather 是否使用dom_father参数
     * @return {HTMLElement|HTMLCollection|void} 输出对象
     */
    getAll2: function (name, dom_father, few, useFather) {
        /**读取对象的内容 */
        var value_read;
        /**正则读取到的数组 */
        var exec_value = new Array();
        /**用于返回的参数 */
        var return_value;
        if (arguments.length === 0) {
            return_value = document.body;
        } else if (arguments.length === 1) {
            exec_value = /\#?\.?/.exec(name);
            if (!exec_value || !exec_value[0]) {
                return_value = lt_code.getTage(name);
            } else {
                if (exec_value[0] === "#.") {
                    return_value = null;
                } else {
                    value_read = name.replace(/\#?\.?/, "");
                    if (exec_value[0] === "#") {
                        return_value = lt_code.getId(value_read);
                    } else if (exec_value[0] === ".") {
                        return_value = lt_code.getClass(value_read);
                    }
                }
            }
        } else if (arguments.length === 2) {
            exec_value = /\#?\.?/.exec(name);
            if (!exec_value || !exec_value[0]) {
                return_value = lt_code.getTage(name, dom_father);
            } else {
                if (exec_value[0] === "#.") {
                    return_value = null;
                } else {
                    value_read = name.replace(/\#?\.?/, "");
                    if (exec_value[0] === "#") {
                        return_value = lt_code.getId(value_read);
                        console.trace("js不支持读取父类对象的子类id");

                    } else if (exec_value[0] === ".") {
                        return_value = lt_code.getClass(value_read, null, dom_father, false);
                    }
                }
            }
        } else if (arguments.length === 3) {
            exec_value = /\#?\.?/.exec(name);
            if (!exec_value || !exec_value[0]) {
                return_value = lt_code.getTage(name, dom_father, few);
            } else {
                if (exec_value[0] === "#.") {
                    return_value = null;
                } else {
                    value_read = name.replace(/\#?\.?/, "");
                    if (exec_value[0] === "#") {
                        return_value = lt_code.getId(value_read);
                        console.trace("getAll2函数读取id不需要输入few参数");

                    } else if (exec_value[0] === ".") {
                        return_value = lt_code.getClass(value_read, few, dom_father);
                    }
                }
            }
        } else if (arguments.length === 4) {
            exec_value = /\#?\.?/.exec(name);
            if (!exec_value || !exec_value[0]) {
                return_value = lt_code.getTage(name, dom_father, few, useFather);
            } else {
                if (exec_value[0] === "#.") {
                    return_value = null;
                } else {
                    value_read = name.replace(/\#?\.?/, "");
                    if (exec_value[0] === "#") {
                        return_value = lt_code.getId(value_read);
                        console.trace("getAll2函数读取id不需要输入few参数");

                    } else if (exec_value[0] === ".") {
                        if (!useFather) {
                            return_value = lt_code.getClass(value_read, few);
                        } else {
                            return_value = lt_code.getClass(value_read, few, dom_father);
                        }
                    }
                }
            }
        } else {
            return_value = document.head;
        }

        if (return_value === null) {
            console.trace("getAll2函数name参数输入错误!");

        } else if (return_value === undefined) {
            console.trace("本页面中没有找到此对象");

        } else if (return_value.length === 0) {
            console.trace("没有此对象|此页面中没有使用此对象");

        } else if (return_value.length === 1) {
            return_value = return_value[0];
        }

        return return_value;
    },

    /**
     * 读取对象的函数(功能增强)(id:#)(class:.)
     * [domName][.className]>[domName]+[#ID]^[.className]<null
     * domName   标签名称,类似于:div,span,p...
     * className 类名称,类似于:.box,.hide
     * ID        标签ID,类似于:#name,#password
     * >         选取子代
     * <         选取父代(<后必须带有内容,可以填null或其他任何内容)
     * 如果非必须,最好不要用+^,可能会产生不可预料的结果
     * +         追加筛选
     * ^         减少筛选
     * @example
     * [domName].[className]>[domName]+#[ID]^[.className]<null
     * @param {String} htmldom 读取方式
     * @returns {HTMLElement[]}
     */
    getAll6: function (htmldom) {
        // 筛选修正
        htmldom = htmldom.replace(" ", "+");
        /** 读取所用的正则 */
        var read = /([><\+\^]?)([#\.]?)([^#\.<>\+\^\ ]+)([\S\s]*)/;
        /**读取到的所有结果 */
        var matchs = read.exec(htmldom);
        //读取到的结果
        var rets = [];
        //开始读取
        while (matchs != null) {
            if (matchs[1] == "") {//没有要求计算祖/子辈,没有添加或者减少
                if (matchs[2] == "") {//要求根据tag查照,因为tag不会重复,所以不用计算筛选
                    rets = Array.prototype.slice.call(document.getElementsByTagName(matchs[3]));
                } else if (matchs[2] == "#") {
                    if (rets.length == 0) {
                        var idElement = document.getElementById(matchs[3]);
                        if (idElement) {
                            rets.push(idElement); // 如果找到元素，将其放入数组
                        }
                    } else {
                        rets = function () {
                            var ret = [];
                            for (var i = 0; i < rets.length; i++) {
                                if (rets[i].id == matchs[3]) {
                                    ret.add(rets[i]);
                                }
                            }
                            return ret;
                        }();
                    }
                } else if (matchs[2] == ".") {
                    if (rets.length == 0) {
                        rets = Array.prototype.slice.call(document.getElementsByClassName(matchs[3]));
                    } else {
                        rets = function () {
                            var ret = [];
                            for (var i = 0; i < rets.length; i++) {
                                if (rets[i].classList.indexOf(matchs[3]) >= 0) {
                                    ret.add(rets[i]);
                                }
                            }
                            return ret;
                        }();
                    }
                }
            } else if (matchs[1] == "<") {//计算祖辈
                if (rets.length == 0) {
                    return document.body;
                } else {
                    rets = function () {
                        var ret = [];
                        for (var i = 0; i < rets.length; i++) {
                            ret.add(lt_code.getDomFather(rets[i]));
                        }
                        return ret;
                    }();
                }
            } else if (matchs[1] == ">") {//计算子辈
                if (rets.length == 0) {//没有父辈
                    if (matchs[2] == "") {//要求根据tag查照
                        rets = Array.prototype.slice.call(document.getElementsByTagName(matchs[3]));
                    } else if (matchs[2] == "#") {
                        rets = Array.prototype.slice.call(document.getElementById(matchs[3]));
                    } else if (matchs[2] == ".") {
                        rets = Array.prototype.slice.call(document.getElementsByClassName(matchs[3]));
                    }
                } else {
                    if (matchs[2] == "") {//要求根据tag查照
                        rets = function () {
                            var ret = [];
                            for (var i = 0; i < rets.length; i++) {
                                var tempArray = Array.prototype.slice.call(rets[i].getElementsByTagName(matchs[3]));
                                ret.add.apply(ret, tempArray);
                            }
                            return ret;
                        }();
                    } else if (matchs[2] == "#") {
                        rets = function () {
                            var ret = [];
                            for (var i = 0; i < rets.length; i++) {
                                var tempArray = Array.prototype.slice.call(rets[i].getElementById(matchs[3]));
                                ret.add.apply(ret, tempArray);
                            }
                            return ret;
                        }();
                    } else if (matchs[2] == ".") {
                        rets = function () {
                            var ret = [];
                            for (var i = 0; i < rets.length; i++) {
                                var tempArray = Array.prototype.slice.call(rets[i].getElementsByClassName(matchs[3]));
                                ret.add.apply(ret, tempArray);
                            }
                            return ret;
                        }();
                    }
                }
            } else if (matchs[1] == "+") {//计算添加
                if (matchs[2] == "") {//要求根据tag查照
                    rets.add.apply(rets, Array.prototype.slice.call(document.getElementsByTagName(matchs[3])));
                } else if (matchs[2] == "#") {
                    rets.add.apply(rets, Array.prototype.slice.call(document.getElementById(matchs[3])));
                } else if (matchs[2] == ".") {
                    rets.add.apply(rets, Array.prototype.slice.call(document.getElementsByClassName(matchs[3])));
                }
            } else if (matchs[1] == "^") {//计算减少
                if (matchs[2] == "") {//要求根据tag查照
                    rets.del.apply(rets, Array.prototype.slice.call(document.getElementsByTagName(matchs[3])));
                } else if (matchs[2] == "#") {
                    rets.del.apply(rets, Array.prototype.slice.call(document.getElementById(matchs[3])));
                } else if (matchs[2] == ".") {
                    rets.del.apply(rets, Array.prototype.slice.call(document.getElementsByClassName(matchs[3])));
                }
            }
            //结束一轮查找
            matchs = read.exec(matchs[4]);
        }
        return rets;
    },

    /**
     * 获取对象的父类
     * @param {HTMLElement} dom 输入对象
     * @param {number} times 向上查找几次
     * @return {HTMLElement} 返回父类节点
     */
    getDomFather: function (dom, times = 1) {
        var ret = dom;
        for (var i = 0; i < times; i++) {
            ret = ret.parentNode;
        }
        return ret;
    },

    /**
     * 获取画布对象
     * @param {HTMLCanvasElement} cas canvas画布
     * @param {String} [type] 获取类型
     * @returns {CanvasRenderingContext2D|WebGLRenderingContext}
     */
    getCtx: function (cas, type) {
        type = type == null ? "2d" : type;
        return cas.getContext(type);
    },

    /**
     * 产生一个新节点
     * @param {ElementTagNameMap} domName 节点类型(string)
     * @param {object} [attr] 节点属性
     */
    newDom: function (domName, attr) {
        /**非节点属性 */
        var notAttr = ["innerText", "innerHTML"];
        var a = document.createElement(domName);
        for (var i in attr) {
            if (i == "style") {
                var styles = "";
                if (typeof (attr[i]) == "object") {
                    for (var j in attr[i]) {
                        styles += j + ":" + attr[i][j] + ";";
                    }
                } else {
                    styles = attr[i];
                }
                a.setAttribute(i, styles);
            } else if (i == "dataset") {
                if (typeof (attr[i] == "object")) {
                    for (var j in attr[i]) {
                        a.dataset[j] = attr[i][j];
                    }
                } else {
                    a.dataset = attr[i];
                }
            } else {
                if (notAttr.indexOf(i) >= 0) {
                    a[i] = attr[i];
                } else {
                    a.setAttribute(i, attr[i]);
                }
            }
        }
        return a;
    },

    /**
     * 添加子节点
     * @param {HTMLElement} dom 子节点
     * @param {HTMLElement} [domFather] 父节点
     */
    addChild: function (dom, domFather) {
        domFather = domFather ? domFather : lt_code.getAll();
        domFather.appendChild(dom);
    },

    /**
     * 删除子节点
     * @param {HTMLElement} dom 子节点
     * @param {HTMLElement} [domFather] 父节点
     */
    removeChild: function (dom, domFather) {
        domFather = domFather ? domFather : lt_code.getDomFather(dom);
        domFather.removeChild(dom);
    },

    /**
     * 获取网页url传参
     * @param {string} [href] 网址
     */
    getUrlData: function (href) {
        href = href || window.location.href;
        var urlData = "{}";
        if (/\?/.test(href)) {
            href = /\?(.+)/.exec(href)[1];
            var leftAndRight = [...href.matchAll(/([^&=]+)=([^&=]+)&?/g)];
            //for (var i = 0; i < leftAndRight.length; i++) {
            //    var str = '{"' + leftAndRight[i][1] + '":"' + leftAndRight[i][2] + '"}';
            //    urlData.push(JSON.parse(str));
            //}
            urlData = "{";
            for (var i = 0; i < leftAndRight.length; i++) {
                urlData += "\"" + leftAndRight[i][1] + "\":\"" + leftAndRight[i][2] + "\"";
                if (i < leftAndRight.length - 1) {
                    urlData += ",";
                }
            }
            urlData += "}";
        }
        return JSON.parse(urlData);
    },

    /**
     * 删除url中的参数(不跳转页面)
     * @param {string} [href] 网页网址
     * @param {string} [url] 新的网址
     */
    clearUrlData: function (href, url) {
        href = href || window.location.href;
        if (/\?/.test(href)) {
            href = href.slice(0, /\?/.exec(href).index);
            url = url || href;
            var state = { title: '', url: href };
            history.pushState(state, '', url);
        }
    },

    /**测试模块 */
    test: {
        /**
         * 直接读取上传文件为base64
         * @param {HTMLInputElement} inputFile 上传文件的HTML输入元素
         * @returns {Promise<string>} 返回一个Promise对象，该对象解析为base64编码的字符串
         * @example
         * lt_code.test.fileToBase64(event.target)
         * .then(base64 => {
         *     console.log('Base64:', base64);
         * })
         * .catch(error => {
         *     console.error('错误:', error);
         * });
         */
        fileToBase2: function (inputFile) {
            return new Promise((resolve, reject) => {
                // 检查是否选择了文件
                if (inputFile.files.length === 0) {
                    reject(new Error('未选择文件'));
                    return;
                }

                var oFReader = new FileReader();
                var file = inputFile.files[0];

                // 文件读取完成后触发的事件
                oFReader.onloadend = function (e) {
                    resolve(e.target.result);
                };

                // 文件读取出错时触发的事件
                oFReader.onerror = function (e) {
                    reject(new Error('读取文件时出错'));
                };

                // 以DataURL的形式读取文件内容
                oFReader.readAsDataURL(file);
            });
        },
    },

    /**
     * 版本号
     */
    Version: function () {

        // 窗体启动时运行的内容
        window.addEventListener("load", function () {
            // 添加额外方法
            lt_code.addMethod.AddMethod();

            // 定义特殊字段
            Object.defineProperty(lt_code, "onload", {
                // 设置onload属性,对其进行赋值的时候将函数添加进入启动函数
                set: function (func) {
                    if (lt_code.variable.isOnload) {
                        // 延迟启动?
                        setTimeout(func, 100);
                    }
                    lt_code.variable.addLoad(func);
                },
                // 读取这个属性的时候显示所有的启动函数
                get: function () {
                    return lt_code.variable.onload;
                }
            });

            //加载meta声明文件
            !function () {
                var meta = lt_code.getTage("meta");
                if (meta.length == 0) {
                    var t = lt_code.newDom("meta", {
                        "http-equiv": "content-type",
                        context: "text/html;charset=UTF-8"
                    });
                    //lt_code.addChild(t, lt_code.getAll("head"));
                    console.log("页面中没有meta标记,显示utf-8文件可能会出现中文乱码\n请在head标签中添加:\n" + t.outerHTML);
                }
            }();

            //执行额外的onload函数
            !function () {
                lt_code.variable.isOnload = true;
                lt_code.variable.onload.forEach(load => {
                    try {
                        load.function();
                    } catch (e) {
                        console.error(e);
                    }
                });
            }();

            // 挂到windows
            window.lt_code = lt_code;
        });

        // 返回版本号
        return "VUE_1";
    }(),

    /**
     * 等待节点加载完后才会执行
     * @param {string} search 搜索代码,这里会直接调用 {@link lt_code.getAll6} 方法
     * @param {function} func 执行功能,这里的this会指向搜索结果,不支持()=>{}
     * @param {number} timewait 等待时间
     */
    afterload: function (search, func, timewait = 300) {
        var collection = lt_code.getAll6(search);
        if (collection.length == 0) {
            setTimeout(function () {
                lt_code.afterload(search, func, timewait);
            }, timewait);
        } else {
            func.bind(collection)();
        }
    },

    /**base64处理模块 */
    base64: {

        // private property  
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        /**
         * 加密
         * @param {string} input
         */
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = this._utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        },

        /**
         * 解密
         * @param {string} input
         */
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = this._utf8_decode(output);
            return output;
        },


        /**
         * 将输入的内容用utf-8进行编码
         * 同时将\r\n转化为\n
         * @param {String} string
         */
        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        },

        /**
         * 将输入的内容用utf-8进行编码
         * 同时取消将\r\n转化为\n
         * @param {String} string
         */
        _utf8_encodeNoChange: function (string) {
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        },

        // private method for UTF-8 decoding  
        _utf8_decode: function (utftext) {
            var string = "";
            var i = 0;
            var c = 0, c1 = 0, c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        },

        /** 
         * 还是我自己写的玩意,改了几个函数
         * 不过这个加密中文占用的文字量少
         */
        chinese: {
            /** 匙A */
            _keyA: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

            /** 匙a */
            _keya: "abcdefghijklmnopqrstuvwxyz",

            /** 匙B */
            _keyB: "0123456789ABCDEF",

            /**
             * 加密?
             * @param {number} time
             * @param {string} input
             */
            setCode: function (time, input) {
                time = time.toString();
                var count = time.length;
                var ret = "";
                for (var i = 0; i < input.length; i++) {
                    ret += this.setCodeOne(
                        lt_code.getNum(time[(count - 1) - (i % count)]),
                        input[i]
                    );
                }
                return ret;
            },

            /**
             * 加密一位
             * @param {number} numOne
             * @param {String} inputOne
             */
            setCodeOne: function (numOne, inputOne) {
                numOne = !numOne ? 1 : numOne;
                inputOne = inputOne.charCodeAt(0);
                var ret = numOne * inputOne;
                var first = lt_code.getNum(ret / 26);
                var last = lt_code.getNum(ret % 26);
                first = this.numToTextA(first);
                last = this.numToTexta(last);
                return first + last;
            },

            /**
             * 数字转字符
             * @param {number} num
             */
            numToTextA: function (num) {
                var ret = "";
                var theNum = 0;
                if (num > 25) {
                    ret += this._keyA[25];
                    num -= 25;
                }
                while (num > 25) {
                    theNum++;
                    num -= 25;
                }
                if (theNum > 0) {
                    ret += theNum.toString();
                }
                ret += this._keyA[num];
                return ret;
            },

            /**
             * 数字转字符
             * @param {number} num
             */
            numToTexta: function (num) {
                var ret = "";
                while (num > 25) {
                    ret += this._keya[25];
                    num -= 25;
                }
                ret += this._keya[num];
                return ret;
            },

            /**
             * 解密
             * @param {number} time
             * @param {string} value
             */
            getCode: function (time, value) {
                time = time.toString();
                var count = time.length;
                var ret = [...value.matchAll(/[A-Z\d]+[a-z]+/g)];
                var values = [];
                ret.forEach(function (e) {
                    values.push(e[0]);
                });
                ret = "";
                values.forEach(function (e, i) {
                    ret += String.fromCharCode(
                        lt_code.base64.chinese.getCodeOne(
                            lt_code.getNum(time[count - 1 - i % count]),
                            e
                        ));
                });
                return ret;
            },

            /**
             * 解密一位
             * @param {number} numOne
             * @param {string} valueOne
             */
            getCodeOne: function (numOne, valueOne) {
                numOne = !numOne ? 1 : numOne;
                var first = /[A-Z\d]+/.exec(valueOne)[0];
                var last = /[a-z]+/.exec(valueOne)[0];
                first = lt_code.getNum(this.textToNumA(first));
                last = lt_code.getNum(this.textToNuma(last));
                var ret = (first * this._keyA.length + last) / numOne;
                return lt_code.getNum(ret);
            },

            /**
             * 字符转数字
             * @param {string} str
             */
            textToNumA: function (str) {
                var ret = 0;
                var strs = /([A-Z]?)([\d]*)([A-Z])/.exec(str);
                if (strs[1]) {
                    ret += this._keyA.indexOf(strs[1]);
                    if (strs[2]) {
                        ret = 25 * (lt_code.getNum(strs[2]) + 1);
                    }
                }
                ret += this._keyA.indexOf(strs[3]);
                return ret;
            },

            /**
             * 字符转数字
             * @param {string} str
             */
            textToNuma: function (str) {
                var ret = 0;
                for (var i = 0; i < str.length; i++) {
                    ret += this._keya.indexOf(str[i]);
                }
                return ret;
            },
        },

        /** 变种base64 */
        base64change: {

            //key  
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            /**产生一个随机的key */
            getKey: function () {
                var ret = "";
                var all = Array.prototype.slice.call(this._keyStr.slice(0, 62));
                while (all.length > 0) {
                    var oneKey = all[lt_code.variable.random(all.length, null, true)];
                    ret += oneKey;
                    all = all.delete(oneKey);
                }
                ret += "+/=";
                return ret;
            },

            /**
             * 获取一个以sha256生成的密匙
             * @param {String} input
             */
            getSHA256Key: function (input) {
                input = lt_code.SHA256.decode(input.toString());
                var temp = input,
                    keys = "ABCDEF0123456789",
                    count = 0,
                    keyss = [],
                    indexs = {};
                for (var i = 0; i < keys.length; i++) {
                    var x = keys[i];
                    count = temp.length;
                    temp = temp.replaceAll(x, "");
                    keyss.push(count - temp.length);
                    indexs[x] = 0;
                }
                var key = {},
                    key2 = this._keyStr.substring(0, 64);
                for (var i = 0; i < keyss.length; i++) {
                    var x = key2.substring(0, keyss[i]);
                    if (x.length == 0) {
                        continue;
                    }
                    key2 = key2.replace(x, "");
                    key[keys[i].toString()] = x;
                }
                var ret = "";
                for (var i = 0; i < input.length; i++) {
                    var x = input[i].toString();
                    ret += key[x][indexs[x]];
                    indexs[x]++;
                }
                ret += "=";
                return ret;
            },

            /**
             * 加密
             * @param {string} input
             * @param {string} [key]
             */
            encode: function (input, key) {
                key = key ? key : this._keyStr;
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = this._utf8_encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output +
                        key.charAt(enc1) + key.charAt(enc2) +
                        key.charAt(enc3) + key.charAt(enc4);
                }
                return output;
            },

            /**
             * 解密
             * @param {string} input
             * @param {string} [key]
             */
            decode: function (input, key) {
                key = key ? key : this._keyStr;
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (i < input.length) {
                    enc1 = key.indexOf(input.charAt(i++));
                    enc2 = key.indexOf(input.charAt(i++));
                    enc3 = key.indexOf(input.charAt(i++));
                    enc4 = key.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                output = this._utf8_decode(output);
                return output;
            },

            // private method for UTF-8 encoding  
            _utf8_encode: function (string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }
                return utftext;
            },

            // private method for UTF-8 decoding  
            _utf8_decode: function (utftext) {
                var string = "";
                var i = 0;
                var c = c1 = c2 = 0;
                while (i < utftext.length) {
                    c = utftext.charCodeAt(i);
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if ((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    } else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }
                return string;
            },

        },

        /** 转码 */
        change: {

            //key  
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            /**产生一个随机的key */
            getKey: function () {
                var ret = "";
                var all = Array.prototype.slice.call(this._keyStr.slice(0, 62));
                while (all.length > 0) {
                    var oneKey = all[lt_code.variable.random(all.length, null, true)];
                    ret += oneKey;
                    all = all.delete(oneKey);
                }
                ret += "+/=";
                return ret;
            },

            /**
             * 获取一个以sha256生成的密匙
             * @param {String} input
             */
            getSHA256Key: function (input) {
                input = lt_code.SHA256.decode(input.toString());
                var temp = input,
                    keys = "ABCDEF0123456789",
                    count = 0,
                    keyss = [],
                    indexs = {};
                for (var i = 0; i < keys.length; i++) {
                    var x = keys[i];
                    count = temp.length;
                    temp = temp.replaceAll(x, "");
                    keyss.push(count - temp.length);
                    indexs[x] = 0;
                }
                var key = {},
                    key2 = this._keyStr.substring(0, 64);
                for (var i = 0; i < keyss.length; i++) {
                    var x = key2.substring(0, keyss[i]);
                    if (x.length == 0) {
                        continue;
                    }
                    key2 = key2.replace(x, "");
                    key[keys[i].toString()] = x;
                }
                var ret = "";
                for (var i = 0; i < input.length; i++) {
                    var x = input[i].toString();
                    ret += key[x][indexs[x]];
                    indexs[x]++;
                }
                ret += "=";
                return ret;
            },

            /**
             * 全码解码
             * @param {string} input
             * @param {string} key
             */
            decode: function (input, key) {
                input = input.split(",");
                var ret = input[0] + ",";
                for (var i = 0; i < input[1].length; i++) {
                    ret += this._keyStr[key.indexOf(input[1][i])];
                }
                return ret;
            },

            /**
             * 全码转码
             * @param {string} input
             * @param {string} key
             */
            encode: function (input, key) {
                input = input.split(",");
                var ret = input[0] + ",";
                for (var i = 0; i < input[1].length; i++) {
                    ret += key[this._keyStr.indexOf(input[1][i])];
                }
                return ret;
            },

            /**
             * 部分转码
             * @param {String} input
             */
            setCode: function (input, key) {
                let ret = "";
                for (var i = 0; i < input.length; i++) {
                    ret += key[this._keyStr.indexOf(input[i])];
                }
                return ret;
            },

            /**
             * 部分解码
             * @param {String} input
             */
            getCode: function (input, key) {
                let ret = "";
                for (var i = 0; i < input.length; i++) {
                    ret += this._keyStr[key.indexOf(input[i])];
                }
                return ret;
            },
        },

        /**
         * 转码为图片
         * (这个算法如果图片不压缩是可以使用的)
         */
        imageRGB: {

            /**
             * 加密
             * @param {any} input
             */
            encode: function (input) {
                var ret = [];
                var j = 0;
                var newImage = [];
                input = lt_code.base64._utf8_encode(input);
                for (var i = 0; i < input.length; i++) {
                    ret.push(input.charCodeAt(i));
                }
                var count = Math.ceil(ret.length / 3);
                for (var i = 0; i < count * 4; i++) {
                    if (i % 4 == 3) {
                        newImage.push(255);
                    } else {
                        newImage.push(ret[j++] ? ret[j - 1] : 255);
                    }
                }
                ret = newImage;
                count = Math.ceil(Math.sqrt(ret.length / 4));
                for (var i = ret.length; i < count * count * 4; i++) {
                    ret[i] = 255;
                }
                newImage = new Uint8ClampedArray(ret);
                newImage = new ImageData(newImage, count, count);
                var newCas = lt_code.newDom("canvas", {
                    width: count,
                    height: count
                });
                lt_code.addChild(newCas);
                var newCtx = lt_code.getCtx(newCas);
                newCtx.putImageData(newImage, 0, 0);
                newImage = newCas.toDataURL();
                lt_code.removeChild(newCas);
                return newImage;
            },

            /**
             * 解码
             * @param {any} input
             */
            decode: function (input) {
                var newImage = new Image();
                newImage.src = input;
                var count = newImage.width != newImage.height ? console.error("输入的图片数据错误!") : newImage.width;
                newImage.width = count;
                newImage.height = count;
                var newCas = lt_code.newDom("canvas", {
                    width: count,
                    height: count,
                });
                lt_code.addChild(newCas);
                var newCtx = lt_code.getCtx(newCas);
                newCtx.drawImage(newImage, 0, 0);
                lt_code.addChild(newCas);
                var imageData = newCtx.getImageData(0, 0, count, count);
                lt_code.removeChild(newCas);
                imageData = imageData.data;
                var ret = [];
                for (var i = 0; i < imageData.length; i++) {
                    if (i % 4 == 3) {
                        continue;
                    }
                    ret.push(imageData[i]);
                }
                imageData = ret;
                ret = [];
                for (var i = 0; i < imageData.length; i++) {
                    if (imageData[i] == 255) {
                        break;
                    }
                    ret += String.fromCharCode(imageData[i]);
                }
                ret = lt_code.base64._utf8_decode(ret);
                return ret;
            }
        },
    },
};