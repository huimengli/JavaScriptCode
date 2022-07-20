/// <reference path="../JavaScriptCode/lt_code.js" />
/// <reference path="../three.js/examples/js/loaders/FBXLoader.js" />
/// <reference path="../ts/SHA256.ts" />

import * as THREE from "../three.js/build/three";

/** 编译器模块 */
namespace IDE {

    /**fbx读取器 */
    var fbxLoader = new THREE.FBXLoader();

    /**用户错误 */
    export class UserError extends Error {
        constructor(message?: string);
        constructor(message?: string, id?: number);
        constructor(message?: string, id?: number, username?: string);

        constructor(message?: string, id?: number, username?: string) {
            if (arguments.length == 1) {
                super(message);
            } else if (arguments.length == 2) {
                super("\nID : " + id + "\n错误内容 : " + message);
            } else {
                super("\nID : " + id + "\n用户名 : " + username + "\n错误内容 : " + message);
            }
        }
    };

    /**IDE错误 */
    export class IDEError extends Error {

        /**
         * 构造函数
         * @param message
         * @param functionName
         * @param arg
         */
        constructor(message?: string, functionName?: string, ...arg: Array<string>) {
            var error = "IDE模块错误!\n";
            if (arguments.length > 1) {
                error += "错误内容: " + message.toString();
            }
            if (arguments.length > 2) {
                error += "错误函数: " + functionName.toString();
            }
            if (arguments.length > 3) {
                for (var i = 0; i < arg.length; i++) {
                    error += "错误参数" + i + ": " + arg[i].toString();
                }
            }
            super(error);
        }
    }

    /**最大值 */
    export const MAXVALUE = Infinity;

    /**精度*/
    const ACCURACY = 5;

    function getAccuracy(num: number): number;
    function getAccuracy(num: number, ACC: number): number;

    /**
     * 获取精度
     * @param {number} num
     * @param {number} [ACC] 精度
     */
    function getAccuracy(num: number, ACC?): number {
        ACC = ACC != null ? ACC : ACCURACY;
        var exp = "1";
        for (var i = 0; i < ACC; i++) {
            exp += "0";
        }
        var texp = Math.floor(parseInt(exp));
        num = num * texp;
        num = Math.floor(num);
        return num / texp;
    };

    /**
     * 获取UUID
     * @param input
     */
    function newUUID(input) {
        input = input ? input : new Date().getTime().toString();
        input = MD5(input);
        var sha = lt_code.SHA256.decode(input);
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
                return MD5(dex)[i];
            }();
        });
        return uuid;
    };

    function MD5(str: any) {
        if (typeof (str) !== "string") {
            str = str.toString();
        }
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
        function md5_ConvertToWordArray(str) {
            var lWordCount;
            var lMessageLength = str.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
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
        function md5_Utf8Encode(str: string) {
            str = str.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < str.length; n++) {
                var c = str.charCodeAt(n);
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
        str = md5_Utf8Encode(str);
        x = md5_ConvertToWordArray(str);
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
    }

    /**三位向量 */
    export class vector3 {

        /** x轴向量*/
        public x: number;
        /** y轴向量*/
        public y: number;
        /** z轴向量*/
        public z: number;

        /**
         * 构建
         * @param {number} x
         * @param {number} y
         * @param {number} [z]
         */
        constructor(x?: number, y?: number, z?: number) {
            this.x = x == void 0 ? 0 : x;
            this.y = y == void 0 ? 0 : y;
            this.z = z == void 0 ? 0 : z;
        }

        //以下是特殊参数

        /**坐标中心点 */
        static None() {
            return new vector3(0, 0, 0);
        }

        /**坐标最大值(超过即不计算也不显示) */
        static Infinity() {
            var max = MAXVALUE;
            return new vector3(max, max, max);
        }

        /**z轴轴向 */
        static forward() {
            return new vector3(0, 0, 1);
        }

        /**z轴反轴向 */
        static back() {
            return new vector3(0, 0, -1);
        }

        /**x轴轴向 */
        static right() {
            return new vector3(1, 0, 0);
        }

        /**x轴反轴向 */
        static left() {
            return new vector3(-1, 0, 0);
        }

        /**y轴轴向 */
        static down() {
            return new vector3(0, 1, 0);
        }

        /**y轴反轴向 */
        static up() {
            return new vector3(0, -1, 0);
        }

        /**全单位量 */
        static One() {
            return new vector3(1, 1, 1);
        }

        //以下是赋值
        /**
         * 赋值
         * @param x
         * @param y
         * @param z
         */
        set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        //以下是坐标计算函数

        /**
         * 获取两个坐标的中间值
         * @param {vector3} v1
         * @param {vector3} v2
         */
        static getCenter(v1, v2) {
            var center = vector3.None();
            center.x = (v1.x + v2.x) / 2;
            center.y = (v1.y + v2.y) / 2;
            center.z = (v1.z + v2.z) / 2;
            return center;
        }

        //以下是功能性函数

        /**
         * 坐标变换
         * @param {number|vector3} x
         * @param {number} [y]
         * @param {number} [z]
         */
        transform(x, y, z) {
            if (typeof (x) == "number") {
                this.x += x;
                this.y += y;
                this.z += z;
            } else {
                this.x += x.x;
                this.y += x.y;
                this.z += x.z;
            }
        }

        /**
         * 坐标旋转
         * @param {any} c 中心点
         * @param {number|vector3} x
         * @param {number} y
         * @param {number} z
         */
        rotate(c, x, y, z) {
            var rotate = vector3.None();
            var ret = new vector3(this.x, this.y, this.z);
            if (typeof (x) == "number") {
                rotate.x = x;
                rotate.y = y;
                rotate.z = z;
            } else {
                rotate.x = x.x;
                rotate.y = x.y;
                rotate.z = x.z;
            }
            var l1, l2, l3;
            l1 = getAccuracy(Math.sqrt(ret.x * ret.x + ret.y * ret.y));
            //先转z轴
            ret.x = l1 * Math.sin(rotate.z / 360 * Math.PI * 2);
            ret.y = l1 * Math.cos(rotate.z / 360 * Math.PI * 2);
            //console.log(ret);
            l2 = getAccuracy(Math.sqrt(ret.z * ret.z + ret.y * ret.y));
            //再转x轴
            ret.y = l2 * Math.sin(rotate.x / 360 * Math.PI * 2);
            ret.z = l2 * Math.cos(rotate.x / 360 * Math.PI * 2);
            //console.log(ret);
            l3 = getAccuracy(Math.sqrt(ret.x * ret.x + ret.z * ret.z));
            //最后转y轴
            ret.z = l3 * Math.sin(rotate.y / 360 * Math.PI * 2);
            ret.x = l3 * Math.cos(rotate.y / 360 * Math.PI * 2);
            //console.log(ret);
            return ret;
        }

        /**
         * 获取坐标差值
         * @param {lt_code.variable.vector3} another 另一个坐标
         */
        getDifference(another) {
            var ret = vector3.None();
            ret.x = this.x - another.x;
            ret.y = this.y - another.y;
            ret.z = this.z - another.z;
            return ret;
        }

        /**
         * 获取两个向量之间的夹角
         * @param {vector3} v1
         * @param {vector3} v2
         */
        static getAngle(v1, v2) {
            `
            若向量用坐标表示，a = (x1, y1, z1), b = (x2, y2, z2) ，则，a.b = (x1x2 + y1y2 + z1z2) 。

            | a|=√(x1 ^ 2 + y1 ^ 2 + z1 ^ 2) ，| b|=√(x2 ^ 2 + y2 ^ 2 + z2 ^ 2) 。

            将这些代人公式(Ⅰ), 得到：

            cos = (x1x2 + y1y2 + z1z2) / [√(x1 ^ 2 + y1 ^ 2 + z1 ^ 2) *√(x2 ^ 2 + y2 ^ 2 + z2 ^ 2)]。

            上述公式是以空间三维坐标给出的，令坐标中的z = 0,
            则得平面向量的计算公式。两个向量夹角的取值范围是：[0, π]。

            夹角为锐角时，cosθ > 0；夹角为钝角时, cosθ < 0。
            `
            var nul = vector3.None();
            if (v1 == nul || v2 == nul) {
                return NaN;
            } else {
                var c = v1.x, d = v1.y, e = v1.z;
                var f = v2.x, g = v2.y, h = v2.z;
                var s = (c * f) + (d * g) + (e * h);
                var p = (c * c) + (d * d) + (e * e);
                var t = Math.sqrt(p);
                var m = (g * g) + (f * f) + (h * h);
                var r = Math.sqrt(m);
                var u = s / (t * r)
                var inv = Math.acos(u) * 360 / (Math.PI * 2);
                return getAccuracy(inv, 2);
            }
        }

        /**获取向量的绝对值 */
        getAbs() {
            return new vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
        }

        /**获取向量的长度 */
        getLength() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }

        /**克隆对象 */
        clone() {
            return new vector3(this.x, this.y, this.z);
        }

        /**
         * 从v复制
         * @param v
         */
        copy(v) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
        }

        /**重载转为字符串 */
        toString() {
            var ret = {
                x: this.x,
                y: this.y,
                z: this.z,
            };
            return JSON.stringify(ret);
        }

        /**转为THREE的三维向量 */
        toTHREE() {
            return new THREE.Vector3(
                this.x,
                this.y,
                this.z
            );
        }

        /**转为THREE的欧拉角 */
        toEULER() {
            return new THREE.Euler(
                this.x / 180 * Math.PI,
                this.y / 180 * Math.PI,
                this.z / 180 * Math.PI,
                "XYZ"
            );
        }

        /**
         * 从角度读取
         * @param e
         */
        fromEULER(e:THREE.Euler) {
            this.x = e.x / Math.PI * 180;
            this.y = e.y / Math.PI * 180;
            this.z = e.z / Math.PI * 180;
        }

        //用于遍历
        *[Symbol.iterator]() {
            yield this.x;
            yield this.y;
            yield this.z;
        }
    }

    /**二维向量*/
    export class vector2 {

        /** x轴向量 */
        public x: number;

        /** y轴向量 */
        public y: number;

        /**
         * 构造
         * @param {number} x
         * @param {number} y
         */
        constructor(x?: number, y?: number) {
            this.x = x == void 0 ? 0 : x;
            this.y = y == void 0 ? 0 : y;
        }

        //以下是特殊坐标点

        /**坐标中心点 */
        static None() {
            return new IDE.vector2(0, 0);
        }

        /**坐标最大值(超过即既不计算也不显示) */
        static Infinity() {
            var max = IDE.MAXVALUE;
            return new IDE.vector2(max, max);
        }

        /**x轴轴向 */
        static right() {
            return new IDE.vector2(1, 0);
        }

        /**x轴反轴向 */
        static left() {
            return new IDE.vector2(-1, 0);
        }

        /**y轴轴向 */
        static down() {
            return new IDE.vector2(0, 1);
        }

        /**y轴反轴向 */
        static up() {
            return new IDE.vector2(0, -1);
        }

        /**全单位量 */
        static One() {
            return new IDE.vector2(1, 1);
        }

        //以下是坐标计算函数

        /**
         * 获取两个坐标的中间值
         * @param {IDE.vector2} v1
         * @param {IDE.vector2} v2
         */
        static getCenter(v1, v2) {
            var center = IDE.vector2.None();
            center.x = (v1.x + v2.x) / 2;
            center.y = (v1.y + v2.y) / 2;
            return center;
        }

        //以下为功能函数
        /**
         * 坐标变换
         * @param {number|IDE.vector2} x
         * @param {number} [y]
         */
        transform(x, y) {
            if (typeof (x) == "number") {
                this.x += x;
                this.y += y;
            } else {
                this.x += x.x;
                this.y += x.y;
            }
        }

        /**
         * 旋转(二维坐标点应该只能根据一个z轴旋转)
         * @param {any} c 中心点(尚未完成)
         * @param {number} z 
         */
        rotate(c, z) {
            var l = Math.sqrt(this.x * this.x + this.y * this.y);
            var ret = new IDE.vector2(this.x, this.y);
            ret.x = Math.sin(z / 360 * Math.PI * 2) * l;
            ret.y = Math.cos(z / 360 * Math.PI * 2) * l;
            return ret;
        }

        /**重载转为字符串 */
        toString() {
            var ret = {
                x: this.x,
                y: this.y,
            };
            return JSON.stringify(ret);
        }

        /**克隆对象 */
        clone() {
            return new vector2(this.x, this.y);
        }

        /**
         * 从v复制
         * @param v
         */
        copy(v) {
            this.x = v.x;
            this.y = v.y;
        }

        //用于遍历
        *[Symbol.iterator]() {
            yield this.x;
            yield this.y;
        }
    }

    /**四元数 */
    export class Quaternion {
        public x: number;
        public y: number;
        public z: number;
        public w: number;

        constructor();
        constructor(x: number, y: number, z: number, w: number);

        /**
         * 构造函数
         * @param x
         * @param y
         * @param z
         * @param w
         */
        constructor(x?: number, y?: number, z?: number, w?: number) {
            this.x = x == void 0 ? 0 : x;
            this.y = y == void 0 ? 0 : y;
            this.z = z == void 0 ? 0 : z;
            this.w = w == void 0 ? 1 : w;
        }


    }

    /** 变换类 */
    export class Transform {
        /** 真实的位置值 */
        protected position: vector3;
        /**绝对旋转角度 */
        protected eulerAngles: vector3;
        /**缩放值 */
        protected scale: vector3;
        /**父节点坐标 */
        protected localPosition: vector3;
        /**父节点旋转角度 */
        protected localEulerAngles: vector3;
        /**父节点缩放值 */
        protected localScale: vector3;
        /**最终父节点 */
        protected root: Transform;
        /**父节点 */
        protected parent: Transform;
        /**子节点 */
        protected childrens: Transform[];
        /**旋转值(四元素)*/
        protected rotation: Quaternion;
        /**反向挂载*/
        protected ideobject: IDEObject;

        /**绝对坐标值 */
        public set Position(pos: vector3) {
            this.position = pos;
            if (this.IDEObject.ThreeObject) {
                this.IDEObject.ThreeObject.position.copy(pos.toTHREE());
            }
        }
        public get Position() {
            return this.position;
        }

        /** 绝对旋转角度 */
        public set EularAngles(angles: vector3) {
            this.eulerAngles = angles;
            if (this.IDEObject.ThreeObject) {
                this.IDEObject.ThreeObject.setRotationFromEuler(angles.toEULER());
            }
        }
        public get EularAngles() {
            return this.eulerAngles;
        }

        /**绝对缩放值*/
        public set Scale(scale: vector3) {
            this.scale = scale;
            if (this.IDEObject.ThreeObject) {
                this.IDEObject.ThreeObject.scale.copy(scale.toTHREE());
            }
        }
        public get Scale() {
            return this.scale;
        }

        /**获取父节点*/
        public get Parent() {
            return this.parent;
        }

        /**获取最终节点*/
        public get Root() {
            return this.root;
        }

        /**获取当前反向挂载的对象*/
        public get IDEObject() {
            return this.ideobject;
        }

        constructor(IDEObject: IDEObject);
        constructor(IDEObject: IDEObject, position: vector3);
        constructor(IDEObject: IDEObject, position: vector3, eulerAngles: vector3);
        constructor(IDEObject: IDEObject, position: vector3, eulerAngles: vector3, scale: vector3);
        constructor(IDEObject: IDEObject, position: vector3, eulerAngles: vector3, scale: vector3, obj: any);

        /**
         * 构造函数
         * @param position
         * @param eulerAngles
         * @param scale
         * @param obj
         */
        constructor(IDEObject: IDEObject, position?, eulerAngles?, scale?, obj?) {
            this.ideobject = IDEObject;
            position = position ? position : vector3.None();
            eulerAngles = eulerAngles ? eulerAngles : vector3.None();
            scale = scale ? scale : vector3.One();
            this.position = position;
            this.eulerAngles = eulerAngles;
            this.scale = scale;
            if (obj) {
                this.localPosition = obj.transform.position;
                this.localEulerAngles = obj.transform.eulerAngles;
                this.localScale = obj.transform.scale;
                this.root = obj;
                this.parent = obj.transform;
            } else {
                this.localPosition = vector3.None();
                this.localEulerAngles = vector3.None();
                this.localScale = vector3.One();
                this.root = null;
                this.parent = null;
            }
        }

        /**
         * 设置父节点
         * @param {Transform} parent
         */
        SetParent(parent:Transform) {
            this.parent = parent;
            if (parent.Root) {
                this.root = parent.root;
            } else {
                this.root = parent;
            }
            parent.childrens.push(this);
        }

        /**
         * 添加子物件
         * @param t
         */
        add(t: Transform) {
            t.SetParent(this);
            if (t.IDEObject.ThreeObject&&this.IDEObject.ThreeObject) {
                t.IDEObject.ThreeObject.add(this.IDEObject.ThreeObject);
            }
        }

        /**
         * 添加子物体
         * @param t
         */
        attach(t: Transform) {
            t.SetParent(this);
            if (t.IDEObject.ThreeObject && this.IDEObject.ThreeObject) {
                t.IDEObject.ThreeObject.attach(this.IDEObject.ThreeObject);
            }
        }

        /**
         * 移动
         * @param {any} x
         * @param {any} y
         * @param {any} z
         */
        TranslateXYZ(x?:number, y?:number, z?:number) {
            this.Position.transform(x ? x : 0, y ? y : 0, z ? z : 0);
            if (this.IDEObject.ThreeObject) {
                this.IDEObject.ThreeObject.position.copy(this.Position);
            }
        }

        /**
         * 移动
         * @param x
         */
        TranslateX(x) {
            this.TranslateXYZ(x, 0, 0);
        }

        /**
         * 移动
         * @param y
         */
        TranslateY(y) {
            this.TranslateXYZ(0, y, 0);
        }

        /**
         * 移动
         * @param z
         */
        TranslateZ(z) {
            this.TranslateXYZ(0, 0, z);
        }

        //完全是引用的函数
        /**
         * 将对象转向
         * (未完成)
         * @param v
         */
        LookAt(v: vector3) {
            if (this.IDEObject.ThreeObject == void 0) {
                throw new IDEError(this.IDEObject.Type + "没有子体THREE对象", "LookAt");
            } else {
                this.IDEObject.ThreeObject.lookAt(v.x, v.y, v.z);
            }
        }
    }

    /**用户类 */
    export class User {
        /**用户id*/
        public id: number;
        /**用户名称*/
        public name: string;
        /**这里应该存的不是用户的原始数据*/
        protected password: string;
        /**这里保存的是用户创建的最初信息的签名*/
        protected readonly sha: string;
        /**用户识别码*/
        protected md5: string;
        /**用户是否删除*/
        protected delete: boolean;

        /**所有的用户*/
        public static Users: Array<User> = [];

        public get MD5() {
            return this.md5;
        }
        public set MD5(value: string) {
            this.md5 = this.GetMD5();
        }
        /**用户最初的创建信息签名*/
        public get SHA() {
            return this.sha;
        }
        /**用户密码*/
        public get PassWord() {
            return lt_code.SHA256.decode(this.password);
        }
        public set PassWord(value: string) {
            this.password = lt_code.SHA256.decode(value);
        }

        constructor(name: string, password: string);
        constructor(name: string, password: string, id: number);
        constructor(name: string, password: string, id: number, sha: string);

        /**
         * 构造函数
         * @param name
         * @param id
         * @param md5
         */
        constructor(name: string, password: string, id?: number, sha?: string) {
            this.name = name;
            this.id = id ? id : User.Count() + 10000000;
            this.md5 = "";
            this.password = /[^0-9A-F]/.test(password) || password.length != 64 ? function () {
                throw new UserError("密码格式错误!", id, name);
                //return "";
            }() : password;
            //this.sha = sha ? sha : this.GetSHA256();
            this.sha = sha ? /[^0-9A-F]/.test(password) || sha.length != 64 ? function () {
                throw new UserError("初始校检值录入错误!", id, name);
            }() : sha : this.GetSHA256();

            //将创建的用户添加进入用户表
            User.Users.push(this);
        }
        /**当前用户数量 */
        public static Count() {
            var ret = 0;
            return ret;
        }
        /**转为MD5校检字符串 */
        public ToStringForMD5() {
            var ret = {
                id: this.id,
                name: this.name,
                password: this.password,
                sha: this.sha,
            };
            return JSON.stringify(ret);
        }
        /**获取MD5校检值 */
        public GetMD5() {
            return MD5(this.ToStringForMD5());
        }
        /**更新MD5校检值 */
        public UpdateMD5() {
            var md5 = this.GetMD5();
            this.md5 = md5;
            return md5;
        }
        /**获取初始校检值 */
        public GetSHA256() {
            var ret = {
                id: this.id,
                name: this.name,
                password: this.password
            };
            return lt_code.SHA256.decode(JSON.stringify(ret));
        }

    }

    /**操作 */
    export enum Operation {
        /**创建对象 */
        Create = 0,

    }

    /**编译器对象 */
    export class IDEObject {
        /**所有者(创建者) */
        public Owner: string;
        /**创建时间 */
        public CreateTime: number;
        /**操作者列表 */
        public Users: Array<string>;
        /**操作时间表 */
        public OperationTimes: Array<number>;
        /**操作内容表 */
        public Operations: Array<Operation>;
        /**对象名称 */
        public Name: string;
        /**是否显示*/
        protected Active: boolean;
        /**是否删除 */
        public Delete: number;
        /**three.js的对象*/
        public ThreeObject: THREE.Group;
        /**变换体对象 */
        public Transform: Transform;
        /**材质对象*/
        public Material: THREE.MeshLambertMaterial|THREE.MeshBasicMaterial;
        /**对象唯一识别码*/
        protected readonly uuid: string;
        /**当前对象类型*/
        protected type: string;

        /**对象唯一识别码*/
        get UUID() {
            return this.uuid;
        }

        /**是否是IDE对象*/
        get IsIDEObject() {
            return true;
        }

        /**获取类型 */
        get Type() {
            return this.type;
        }

        constructor(userMD5: string);
        constructor(userMD5: string, createTime: number, name: string);
        constructor(userMD5: string, createTime: number, name: string, Material: THREE.MeshBasicMaterial|THREE.MeshLambertMaterial);

        /**
         * 构造函数
         * @param userMD5
         * @param createTime
         * @param name
         */
        constructor(userMD5, createTime?, name?, Material?) {
            createTime = createTime ? createTime : new Date().getTime();
            name = name ? name : "IDEObject";
            this.Owner = userMD5;
            this.CreateTime = createTime;
            this.Users = [];
            this.Users.push(userMD5);
            this.OperationTimes = [];
            this.OperationTimes.push(createTime);
            this.Operations = [];
            this.Operations.push(Operation.Create);
            this.Name = name;
            this.Delete = 0;
            this.Active = true;
            this.ThreeObject = null;
            this.uuid = newUUID(new Date().getTime());
            this.Transform = new Transform(this);
            this.Material = Material ? Material : new THREE.MeshBasicMaterial({ color: "#eee", side: THREE.DoubleSide });
            this.type = "IDEObject";
        }

        /**初始化 */
        init() {

        }

        /**
         * 转为THREE.js的对象 
         * @param callback
         * @callback THREE.Group
         */
        toTHREE(callback?:Function) {
            var ret = new THREE.Group();
            ret.position.copy(this.Transform.Position.toTHREE());
            ret.setRotationFromEuler(this.Transform.EularAngles.toEULER());
            ret.scale.copy(this.Transform.Scale.toTHREE());
            if (this.Transform.Parent && this.Transform.Parent.IDEObject.ThreeObject) {
                this.Transform.Parent.IDEObject.ThreeObject.add(ret);
            }
            if (callback) {
                callback(ret);
            }
            return ret;
        }

        /**刷新THREE.js对象 */
        UpdateTHREE() {
            if (this.ThreeObject == void 0) {
                this.ThreeObject = this.toTHREE();
            } else {
                this.ThreeObject.position.copy(this.Transform.Position.toTHREE());
                this.ThreeObject.setRotationFromEuler(this.Transform.EularAngles.toEULER());
                this.ThreeObject.scale.copy(this.Transform.Scale.toTHREE());
            }
        }
    }

    /**圆形平面类 */
    export class CircularPlane extends IDEObject {
        /**半径 */
        public radius: number;
        /** 边数 */
        public sides: number;
        /** 开始角度 */
        public startAngle: number;
        /**颜色 */
        public color: string;

        constructor(userMD5: string)
        constructor(userMD5:string,radius:number)
        constructor(userMD5:string,radius:number,sides:number)
        constructor(userMD5:string,radius:number,sides:number,startAngle:number)
        constructor(userMD5:string,radius:number,sides:number,startAngle:number,color?:string,createTime?:number,name?:string)

        /**
         * 构造函数
         * @param userMD5
         * @param radius
         * @param sides
         * @param startAngle
         */
        constructor(userMD5: string, radius?: number, sides?: number, startAngle?: number,color?:string,createTime?:number,name?:string) {
            super(userMD5, createTime, name);
            this.radius = radius ? radius : 1;
            this.sides = sides && sides < 3 ? 3 : sides;
            this.startAngle = startAngle ? startAngle : 0;
            this.color = color ? color : "white";
            this.Material = new THREE.MeshBasicMaterial({ color: this.color });
            this.type = "CircularPlane";
        }

        /**
         * 重写转为THREE.js的对象
         * @param callback
         */
        override toTHREE(callback?:Function) {
            var ret = super.toTHREE();

            /**平面 */
            var plane = new THREE.CircleGeometry(this.radius, this.sides, this.startAngle);
            var mesh = new THREE.Mesh(plane, this.Material);

            ret.add(mesh);

            if (callback) {
                callback(ret);
            }

            return ret;
        }
    }

    /**平面类 */
    export class Plane extends IDEObject {
        /**宽度 */
        protected width: number;
        /**长度*/
        protected height: number;
        /**颜色*/
        protected color: string;

        constructor(userMD5:string)
        constructor(userMD5:string,width?:number,height?:number)
        constructor(userMD5:string,width?:number,height?:number,color?:string)
        constructor(userMD5: string, width?: number, height?: number, color?: string, createTime?: number, name?: string)

        /**
         * 构造函数
         * @param userMD5
         * @param width
         * @param height
         * @param color
         * @param createTime
         * @param name
         */
        constructor(userMD5: string, width?: number, height?: number, color?: string, createTime?: number, name?: string) {
            super(userMD5, createTime, name);
            this.width = width ? width : 1;
            this.height = height ? height : 1;
            this.color = color ? color : "white";
            this.Material = new THREE.MeshBasicMaterial({ color: this.color });
            this.type = "Plane";
        }

        /**
         * 重写转为THREE对象
         * @param callback
         */
        override toTHREE(callback?:Function) {
            var ret = super.toTHREE();

            /**平面 */
            var plane = new THREE.PlaneGeometry(this.width, this.height);
            var mesh = new THREE.Mesh(plane, this.Material);

            ret.add(mesh);

            if (callback) {
                callback(ret);
            }

            return ret;
        }
    }

    /**图片类 */
    export class Image extends Plane {
        /**图片链接 */
        public _src: string;

        public get src() {
            return this._src;
        }

        public set src(value) {
            this._src = value;
            var Texture = new THREE.TextureLoader().load(value);
            Texture.wrapS = THREE.RepeatWrapping;
            Texture.wrapT = THREE.RepeatWrapping;

            this.Material = new THREE.MeshLambertMaterial({
                map: Texture,
                side: THREE.DoubleSide,
                color: "white"
            });

            if (this.ThreeObject) {
                this.ThreeObject.children.forEach((e: THREE.Mesh) => {
                    e.material = this.Material;
                });
            }
        }

        constructor(userMD5: string, src: string);
        constructor(userMD5: string, src: string,width:number,height:number);
        constructor(userMD5: string, src: string,width:number,height:number,createTime:number,name:string);

        /**
         * 构造函数(尚未完成)
         * @param userMD5
         * @param src
         * @param createTime
         * @param name
         */
        constructor(userMD5: string, src: string,width?:number,height?:number, createTime?, name?) {
            super(userMD5, width, height, null, createTime, name);
            this._src = src;

            var Texture = new THREE.TextureLoader().load(this._src);
            Texture.wrapS = THREE.RepeatWrapping;
            Texture.wrapT = THREE.RepeatWrapping;

            this.Material = new THREE.MeshLambertMaterial({
                map: Texture,
                side: THREE.DoubleSide,
                color: "white"
            });

            this.type = "Image";
        }
    }

    /**视频类 */
    export class Video extends Plane {
        /**视频地址或者视频流*/
        public src: string|MediaStream;
        /**本地挂载的video节点对象*/
        private video: HTMLVideoElement;

        constructor(userMD5: string, src: string|MediaStream);
        constructor(userMD5: string, src: string | MediaStream, width: number, height: number);
        constructor(userMD5: string, src: string | MediaStream, width: number, height: number, createTime: number, name: string);

        /**
         * 构造函数
         * @param userMD5
         * @param src
         * @param width
         * @param height
         * @param createTime
         * @param name
         */
        constructor(userMD5: string, src: string|MediaStream, width=16, height=9, createTime?: number, name?: string) {
            super(userMD5, width, height, null, createTime, name);
            this.src = src;
            this.video = document.createElement("video");

            if (this.src==void 0) {
                this.Material = new THREE.MeshBasicMaterial({ color: "black" });
            } else {
                if (typeof(this.src)=="string") {
                    this.video.src = this.src;
                } else {
                    this.video.srcObject = this.src;
                }
                var texture = new THREE.VideoTexture(this.video);
                //对纹理进行滤波
                texture.minFilter = THREE.LinearFilter;
                //对纹理压缩
                texture.format = THREE.RGBAFormat;
                this.Material = new THREE.MeshBasicMaterial({ map: texture });
            }
            this.type = "Video";
        }

        //播放
        play() {
            this.video.play();
        }

        //暂停
        stop() {
            this.video.pause();
        }
    }

    /**从外部读取的对象 */
    export class ReadObject extends IDEObject {
        /**文件地址*/
        protected _src: string;

        get src() {
            return this._src;
        }
        /**文件地址*/
        set src(value) {
            this._src = value;
        }

        constructor(userMD5: string, src: string);
        constructor(userMD5: string, src: string,createTime:number,name:string);
        constructor(userMD5: string, src: string, createTime: number, name: string, Material: THREE.MeshBasicMaterial | THREE.MeshLambertMaterial);

        /**
         * 构造函数
         * @param userMD5
         * @param src
         * @param createTime
         * @param name
         * @param Material
         */
        constructor(userMD5: string, src: string, createTime?: number, name?: string, Material?: THREE.MeshBasicMaterial | THREE.MeshLambertMaterial) {
            super(userMD5, createTime, name, Material);
            this._src = src;
            this.type = "ReadObject";
        }

        /**取消回调,使用await和async实现异步 */
        async ToTHREE() {
            var ret = new THREE.Group();
            ret.position.copy(this.Transform.Position.toTHREE());
            ret.setRotationFromEuler(this.Transform.EularAngles.toEULER());
            ret.scale.copy(this.Transform.Scale.toTHREE());
            if (this.Transform.Parent && this.Transform.Parent.IDEObject.ThreeObject) {
                this.Transform.Parent.IDEObject.ThreeObject.add(ret);
            }
            return ret;
        }

        /**重写刷新THREE.js对象 */
        override UpdateTHREE() {
            if (this.ThreeObject==void 0) {
                this.toTHREE(obj => {
                    this.ThreeObject = obj;
                });
            } else {
                this.ThreeObject.position.copy(this.Transform.Position.toTHREE());
                this.ThreeObject.setRotationFromEuler(this.Transform.EularAngles.toEULER());
                this.ThreeObject.scale.copy(this.Transform.Scale.toTHREE());
            }
        }
    }

    /**FBX对象 */
    export class FBXObject extends ReadObject {
        constructor(userMD5: string, src: string);
        constructor(userMD5: string, src: string, createTime: number, name: string);
        constructor(userMD5: string, src: string, createTime: number, name: string, Material: THREE.MeshBasicMaterial | THREE.MeshLambertMaterial);

        /**
         * 构造函数
         * @param userMD5
         * @param src
         * @param createTime
         * @param name
         * @param Material
         */
        constructor(userMD5: string, src: string, createTime?: number, name?: string, Material?: THREE.MeshBasicMaterial | THREE.MeshLambertMaterial) {
            super(userMD5,src, createTime, name, Material);
            this.type = "FBXObject";
        }

        /**
         * 重写无回调转为THREE
         * @param callback
         */
        override async ToTHREE() {
            var ret = await super.ToTHREE();

            await new Promise((resolve, reason) => {
                try {
                    if (this.src !== void 0) {
                        fbxLoader.load(this.src, function (loadGroup: THREE.Group) {
                            loadGroup.children.forEach(function (e: THREE.Mesh) {
                                loadGroup.remove(e);
                                ret.add(e);
                            });
                            resolve("loaddown");
                        });
                    }
                } catch (e) {
                    reason(new IDEError("加载错误!", "ToTHREE", e));
                }
            });

            return ret;
        }

        /**
         * 重写转为THREE
         * @param callback
         */
        override toTHREE(callback?: Function) {
            var ret = super.toTHREE();

            fbxLoader.load(this.src, function (loadGroup: THREE.Group) {
                loadGroup.children.forEach(function (e: THREE.Mesh) {
                    loadGroup.remove(e);
                    ret.add(e);
                });
                if (callback) {
                    callback(ret);
                }
            });

            return ret;
        }
    }

    //重写THREE的添加和移除
    //使IDEObject可以被直接添加进入场景
    void function overrideTHREE() {
        //内部用到的对象
        const _m1$1 = new THREE.Matrix4();
        const _addedEvent = {
            type: 'added'
        };
        const _removedEvent = {
            type: 'removed'
        };

        THREE.Object3D.prototype.add = function (object: any, ...args: any[]) {
            if (arguments.length > 1) {
                for (var i = 0; i < arguments.length; i++) {
                    this.add(arguments[i]);
                }

                return this;
            } else {
                if (object.IsIDEObject) {
                    if (object.ThreeObject == void 0) {
                        object.UpdateTHREE();
                    }
                    return this.add(object.ThreeObject);
                } else {
                    if (object === this) {
                        console.error('THREE.Object3D.add: object can\'t be added as a child of itself.', object);
                        return this;
                    }

                    if (object && object.isObject3D) {
                        if (object.parent !== null) {
                            object.parent.remove(object);
                        }

                        object.parent = this;
                        this.children.push(object);
                        object.dispatchEvent(_addedEvent);
                    } else {
                        console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', object);
                    }

                    return this;
                }
            }
        };

        THREE.Object3D.prototype.attach = function (object: any) {
            if (object.IsIDEObject) {
                if (object.ThreeObject == void 0) {
                    object.UpdateTHREE();
                }
                return this.attach(object.ThreeObject);
            } else {
                this.updateWorldMatrix(true, false);

                _m1$1.copy(this.matrixWorld).invert();

                if (object.parent !== null) {
                    object.parent.updateWorldMatrix(true, false);

                    _m1$1.multiply(object.parent.matrixWorld);
                }

                object.applyMatrix4(_m1$1);
                this.add(object);
                object.updateWorldMatrix(false, true);
                return this;
            }
        };

        THREE.Object3D.prototype.remove = function (object: any, ...args: any[]) {
            if (arguments.length > 1) {
                for (var i = 0; i < arguments.length; i++) {
                    this.remove(arguments[i]);
                }

                return this;
            } else {
                if (object.IsIDEObject) {
                    if (object.ThreeObject == void 0) {
                        object.UpdateTHREE();
                    }
                    return this.remove(object.ThreeObject);
                } else {
                    const index = this.children.indexOf(object);

                    if (index !== -1) {
                        object.parent = null;
                        this.children.splice(index, 1);
                        object.dispatchEvent(_removedEvent);
                    }

                    return this;
                }
            }
        };

    }();
}