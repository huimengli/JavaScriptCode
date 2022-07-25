"use strict";
//import * as THREE from "../../Flask1/Flask1/Flask1/static/three.js/build/three.js"
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../lt_code.js" />
///// <reference path="../../../flask1/static/three.js/examples/js/loaders/FBXLoader.js" />
/// <reference path="../../Flask1/Flask1/Flask1/static/three.js/examples/js/loaders/FBXLoader.js" />
/// <reference path="../ts/SHA256.ts" />
var THREE = require("../../Flask1/Flask1/Flask1/static/three.js/build/three");
/** 编译器模块 */
var IDE;
(function (IDE) {
    /**fbx读取器 */
    var fbxLoader = new THREE.FBXLoader();
    /**用户错误 */
    var UserError = /** @class */ (function (_super) {
        __extends(UserError, _super);
        function UserError(message, id, username) {
            var _this = this;
            if (arguments.length == 1) {
                _this = _super.call(this, message) || this;
            }
            else if (arguments.length == 2) {
                _this = _super.call(this, "\nID : " + id + "\n错误内容 : " + message) || this;
            }
            else {
                _this = _super.call(this, "\nID : " + id + "\n用户名 : " + username + "\n错误内容 : " + message) || this;
            }
            return _this;
        }
        return UserError;
    }(Error));
    IDE.UserError = UserError;
    ;
    /**IDE错误 */
    var IDEError = /** @class */ (function (_super) {
        __extends(IDEError, _super);
        /**
         * 构造函数
         * @param message
         * @param functionName
         * @param arg
         */
        function IDEError(message, functionName) {
            var arg = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                arg[_i - 2] = arguments[_i];
            }
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
            return _super.call(this, error) || this;
        }
        return IDEError;
    }(Error));
    IDE.IDEError = IDEError;
    /**最大值 */
    IDE.MAXVALUE = Infinity;
    /**精度*/
    var ACCURACY = 5;
    /**
     * 获取精度
     * @param {number} num
     * @param {number} [ACC] 精度
     */
    function getAccuracy(num, ACC) {
        ACC = ACC != null ? ACC : ACCURACY;
        var exp = "1";
        for (var i = 0; i < ACC; i++) {
            exp += "0";
        }
        var texp = Math.floor(parseInt(exp));
        num = num * texp;
        num = Math.floor(num);
        return num / texp;
    }
    ;
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
    }
    ;
    function MD5(str) {
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
                }
                else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            }
            else {
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
        }
        ;
        function md5_GG(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        }
        ;
        function md5_HH(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        }
        ;
        function md5_II(a, b, c, d, x, s, ac) {
            a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
            return md5_AddUnsigned(md5_RotateLeft(a, s), b);
        }
        ;
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
        }
        ;
        function md5_WordToHex(lValue) {
            var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        }
        ;
        function md5_Utf8Encode(str) {
            str = str.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < str.length; n++) {
                var c = str.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        }
        ;
        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
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
    var vector3 = /** @class */ (function () {
        /**
         * 构建
         * @param {number} x
         * @param {number} y
         * @param {number} [z]
         */
        function vector3(x, y, z) {
            this.x = x == void 0 ? 0 : x;
            this.y = y == void 0 ? 0 : y;
            this.z = z == void 0 ? 0 : z;
        }
        //以下是特殊参数
        /**坐标中心点 */
        vector3.None = function () {
            return new vector3(0, 0, 0);
        };
        /**坐标最大值(超过即不计算也不显示) */
        vector3.Infinity = function () {
            var max = IDE.MAXVALUE;
            return new vector3(max, max, max);
        };
        /**z轴轴向 */
        vector3.forward = function () {
            return new vector3(0, 0, 1);
        };
        /**z轴反轴向 */
        vector3.back = function () {
            return new vector3(0, 0, -1);
        };
        /**x轴轴向 */
        vector3.right = function () {
            return new vector3(1, 0, 0);
        };
        /**x轴反轴向 */
        vector3.left = function () {
            return new vector3(-1, 0, 0);
        };
        /**y轴轴向 */
        vector3.down = function () {
            return new vector3(0, 1, 0);
        };
        /**y轴反轴向 */
        vector3.up = function () {
            return new vector3(0, -1, 0);
        };
        /**全单位量 */
        vector3.One = function () {
            return new vector3(1, 1, 1);
        };
        //以下是赋值
        /**
         * 赋值
         * @param x
         * @param y
         * @param z
         */
        vector3.prototype.set = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        };
        //以下是坐标计算函数
        /**
         * 获取两个坐标的中间值
         * @param {vector3} v1
         * @param {vector3} v2
         */
        vector3.getCenter = function (v1, v2) {
            var center = vector3.None();
            center.x = (v1.x + v2.x) / 2;
            center.y = (v1.y + v2.y) / 2;
            center.z = (v1.z + v2.z) / 2;
            return center;
        };
        //以下是功能性函数
        /**
         * 坐标变换
         * @param {number|vector3} x
         * @param {number} [y]
         * @param {number} [z]
         */
        vector3.prototype.transform = function (x, y, z) {
            if (typeof (x) == "number") {
                this.x += x;
                this.y += y;
                this.z += z;
            }
            else {
                this.x += x.x;
                this.y += x.y;
                this.z += x.z;
            }
        };
        /**
         * 坐标旋转
         * @param {any} c 中心点
         * @param {number|vector3} x
         * @param {number} y
         * @param {number} z
         */
        vector3.prototype.rotate = function (c, x, y, z) {
            var rotate = vector3.None();
            var ret = new vector3(this.x, this.y, this.z);
            if (typeof (x) == "number") {
                rotate.x = x;
                rotate.y = y;
                rotate.z = z;
            }
            else {
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
        };
        /**
         * 获取坐标差值
         * @param {lt_code.variable.vector3} another 另一个坐标
         */
        vector3.prototype.getDifference = function (another) {
            var ret = vector3.None();
            ret.x = this.x - another.x;
            ret.y = this.y - another.y;
            ret.z = this.z - another.z;
            return ret;
        };
        /**
         * 获取两个向量之间的夹角
         * @param {vector3} v1
         * @param {vector3} v2
         */
        vector3.getAngle = function (v1, v2) {
            "\n            \u82E5\u5411\u91CF\u7528\u5750\u6807\u8868\u793A\uFF0Ca = (x1, y1, z1), b = (x2, y2, z2) \uFF0C\u5219\uFF0Ca.b = (x1x2 + y1y2 + z1z2) \u3002\n\n            | a|=\u221A(x1 ^ 2 + y1 ^ 2 + z1 ^ 2) \uFF0C| b|=\u221A(x2 ^ 2 + y2 ^ 2 + z2 ^ 2) \u3002\n\n            \u5C06\u8FD9\u4E9B\u4EE3\u4EBA\u516C\u5F0F(\u2160), \u5F97\u5230\uFF1A\n\n            cos = (x1x2 + y1y2 + z1z2) / [\u221A(x1 ^ 2 + y1 ^ 2 + z1 ^ 2) *\u221A(x2 ^ 2 + y2 ^ 2 + z2 ^ 2)]\u3002\n\n            \u4E0A\u8FF0\u516C\u5F0F\u662F\u4EE5\u7A7A\u95F4\u4E09\u7EF4\u5750\u6807\u7ED9\u51FA\u7684\uFF0C\u4EE4\u5750\u6807\u4E2D\u7684z = 0,\n            \u5219\u5F97\u5E73\u9762\u5411\u91CF\u7684\u8BA1\u7B97\u516C\u5F0F\u3002\u4E24\u4E2A\u5411\u91CF\u5939\u89D2\u7684\u53D6\u503C\u8303\u56F4\u662F\uFF1A[0, \u03C0]\u3002\n\n            \u5939\u89D2\u4E3A\u9510\u89D2\u65F6\uFF0Ccos\u03B8 > 0\uFF1B\u5939\u89D2\u4E3A\u949D\u89D2\u65F6, cos\u03B8 < 0\u3002\n            ";
            var nul = vector3.None();
            if (v1 == nul || v2 == nul) {
                return NaN;
            }
            else {
                var c = v1.x, d = v1.y, e = v1.z;
                var f = v2.x, g = v2.y, h = v2.z;
                var s = (c * f) + (d * g) + (e * h);
                var p = (c * c) + (d * d) + (e * e);
                var t = Math.sqrt(p);
                var m = (g * g) + (f * f) + (h * h);
                var r = Math.sqrt(m);
                var u = s / (t * r);
                var inv = Math.acos(u) * 360 / (Math.PI * 2);
                return getAccuracy(inv, 2);
            }
        };
        /**获取向量的绝对值 */
        vector3.prototype.getAbs = function () {
            return new vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
        };
        /**获取向量的长度 */
        vector3.prototype.getLength = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        };
        /**克隆对象 */
        vector3.prototype.clone = function () {
            return new vector3(this.x, this.y, this.z);
        };
        /**
         * 从v复制
         * @param v
         */
        vector3.prototype.copy = function (v) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
        };
        /**重载转为字符串 */
        vector3.prototype.toString = function () {
            var ret = {
                x: this.x,
                y: this.y,
                z: this.z,
            };
            return JSON.stringify(ret);
        };
        /**转为THREE的三维向量 */
        vector3.prototype.toTHREE = function () {
            return new THREE.Vector3(this.x, this.y, this.z);
        };
        /**转为THREE的欧拉角 */
        vector3.prototype.toEULER = function () {
            return new THREE.Euler(this.x / 180 * Math.PI, this.y / 180 * Math.PI, this.z / 180 * Math.PI, "XYZ");
        };
        /**
         * 从角度读取
         * @param e
         */
        vector3.prototype.fromEULER = function (e) {
            this.x = e.x / Math.PI * 180;
            this.y = e.y / Math.PI * 180;
            this.z = e.z / Math.PI * 180;
        };
        //用于遍历
        vector3.prototype[Symbol.iterator] = function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.x];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.y];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.z];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        };
        return vector3;
    }());
    IDE.vector3 = vector3;
    /**二维向量*/
    var vector2 = /** @class */ (function () {
        /**
         * 构造
         * @param {number} x
         * @param {number} y
         */
        function vector2(x, y) {
            this.x = x == void 0 ? 0 : x;
            this.y = y == void 0 ? 0 : y;
        }
        //以下是特殊坐标点
        /**坐标中心点 */
        vector2.None = function () {
            return new IDE.vector2(0, 0);
        };
        /**坐标最大值(超过即既不计算也不显示) */
        vector2.Infinity = function () {
            var max = IDE.MAXVALUE;
            return new IDE.vector2(max, max);
        };
        /**x轴轴向 */
        vector2.right = function () {
            return new IDE.vector2(1, 0);
        };
        /**x轴反轴向 */
        vector2.left = function () {
            return new IDE.vector2(-1, 0);
        };
        /**y轴轴向 */
        vector2.down = function () {
            return new IDE.vector2(0, 1);
        };
        /**y轴反轴向 */
        vector2.up = function () {
            return new IDE.vector2(0, -1);
        };
        /**全单位量 */
        vector2.One = function () {
            return new IDE.vector2(1, 1);
        };
        //以下是坐标计算函数
        /**
         * 获取两个坐标的中间值
         * @param {IDE.vector2} v1
         * @param {IDE.vector2} v2
         */
        vector2.getCenter = function (v1, v2) {
            var center = IDE.vector2.None();
            center.x = (v1.x + v2.x) / 2;
            center.y = (v1.y + v2.y) / 2;
            return center;
        };
        //以下为功能函数
        /**
         * 坐标变换
         * @param {number|IDE.vector2} x
         * @param {number} [y]
         */
        vector2.prototype.transform = function (x, y) {
            if (typeof (x) == "number") {
                this.x += x;
                this.y += y;
            }
            else {
                this.x += x.x;
                this.y += x.y;
            }
        };
        /**
         * 旋转(二维坐标点应该只能根据一个z轴旋转)
         * @param {any} c 中心点(尚未完成)
         * @param {number} z
         */
        vector2.prototype.rotate = function (c, z) {
            var l = Math.sqrt(this.x * this.x + this.y * this.y);
            var ret = new IDE.vector2(this.x, this.y);
            ret.x = Math.sin(z / 360 * Math.PI * 2) * l;
            ret.y = Math.cos(z / 360 * Math.PI * 2) * l;
            return ret;
        };
        /**重载转为字符串 */
        vector2.prototype.toString = function () {
            var ret = {
                x: this.x,
                y: this.y,
            };
            return JSON.stringify(ret);
        };
        /**克隆对象 */
        vector2.prototype.clone = function () {
            return new vector2(this.x, this.y);
        };
        /**
         * 从v复制
         * @param v
         */
        vector2.prototype.copy = function (v) {
            this.x = v.x;
            this.y = v.y;
        };
        //用于遍历
        vector2.prototype[Symbol.iterator] = function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.x];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.y];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        };
        return vector2;
    }());
    IDE.vector2 = vector2;
    /**四元数 */
    var Quaternion = /** @class */ (function () {
        /**
         * 构造函数
         * @param x
         * @param y
         * @param z
         * @param w
         */
        function Quaternion(x, y, z, w) {
            this.x = x == void 0 ? 0 : x;
            this.y = y == void 0 ? 0 : y;
            this.z = z == void 0 ? 0 : z;
            this.w = w == void 0 ? 1 : w;
        }
        return Quaternion;
    }());
    IDE.Quaternion = Quaternion;
    /** 变换类 */
    var Transform = /** @class */ (function () {
        /**
         * 构造函数
         * @param position
         * @param eulerAngles
         * @param scale
         * @param obj
         */
        function Transform(IDEObject, position, eulerAngles, scale, obj) {
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
            }
            else {
                this.localPosition = vector3.None();
                this.localEulerAngles = vector3.None();
                this.localScale = vector3.One();
                this.root = null;
                this.parent = null;
            }
        }
        Object.defineProperty(Transform.prototype, "Position", {
            get: function () {
                return this.position;
            },
            /**绝对坐标值 */
            set: function (pos) {
                this.position = pos;
                if (this.IDEObject.ThreeObject) {
                    this.IDEObject.ThreeObject.position.copy(pos.toTHREE());
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "EularAngles", {
            get: function () {
                return this.eulerAngles;
            },
            /** 绝对旋转角度 */
            set: function (angles) {
                this.eulerAngles = angles;
                if (this.IDEObject.ThreeObject) {
                    this.IDEObject.ThreeObject.setRotationFromEuler(angles.toEULER());
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "Scale", {
            get: function () {
                return this.scale;
            },
            /**绝对缩放值*/
            set: function (scale) {
                this.scale = scale;
                if (this.IDEObject.ThreeObject) {
                    this.IDEObject.ThreeObject.scale.copy(scale.toTHREE());
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "Parent", {
            /**获取父节点*/
            get: function () {
                return this.parent;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "Root", {
            /**获取最终节点*/
            get: function () {
                return this.root;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "IDEObject", {
            /**获取当前反向挂载的对象*/
            get: function () {
                return this.ideobject;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 设置父节点
         * @param {Transform} parent
         */
        Transform.prototype.SetParent = function (parent) {
            this.parent = parent;
            if (parent.Root) {
                this.root = parent.root;
            }
            else {
                this.root = parent;
            }
            parent.childrens.push(this);
        };
        /**
         * 添加子物件
         * @param t
         */
        Transform.prototype.add = function (t) {
            t.SetParent(this);
            if (t.IDEObject.ThreeObject && this.IDEObject.ThreeObject) {
                t.IDEObject.ThreeObject.add(this.IDEObject.ThreeObject);
            }
        };
        /**
         * 添加子物体
         * @param t
         */
        Transform.prototype.attach = function (t) {
            t.SetParent(this);
            if (t.IDEObject.ThreeObject && this.IDEObject.ThreeObject) {
                t.IDEObject.ThreeObject.attach(this.IDEObject.ThreeObject);
            }
        };
        /**
         * 移动
         * @param {any} x
         * @param {any} y
         * @param {any} z
         */
        Transform.prototype.TranslateXYZ = function (x, y, z) {
            this.Position.transform(x ? x : 0, y ? y : 0, z ? z : 0);
            if (this.IDEObject.ThreeObject) {
                this.IDEObject.ThreeObject.position.copy(this.Position);
            }
        };
        /**
         * 移动
         * @param x
         */
        Transform.prototype.TranslateX = function (x) {
            this.TranslateXYZ(x, 0, 0);
        };
        /**
         * 移动
         * @param y
         */
        Transform.prototype.TranslateY = function (y) {
            this.TranslateXYZ(0, y, 0);
        };
        /**
         * 移动
         * @param z
         */
        Transform.prototype.TranslateZ = function (z) {
            this.TranslateXYZ(0, 0, z);
        };
        //完全是引用的函数
        /**
         * 将对象转向
         * (未完成)
         * @param v
         */
        Transform.prototype.LookAt = function (v) {
            if (this.IDEObject.ThreeObject == void 0) {
                throw new IDEError(this.IDEObject.Type + "没有子体THREE对象", "LookAt");
            }
            else {
                this.IDEObject.ThreeObject.lookAt(v.x, v.y, v.z);
            }
        };
        return Transform;
    }());
    IDE.Transform = Transform;
    /**用户类 */
    var User = /** @class */ (function () {
        /**
         * 构造函数
         * @param name
         * @param id
         * @param md5
         */
        function User(name, password, id, sha) {
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
        Object.defineProperty(User.prototype, "MD5", {
            get: function () {
                return this.md5;
            },
            set: function (value) {
                this.md5 = this.GetMD5();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User.prototype, "SHA", {
            /**用户最初的创建信息签名*/
            get: function () {
                return this.sha;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(User.prototype, "PassWord", {
            /**用户密码*/
            get: function () {
                return lt_code.SHA256.decode(this.password);
            },
            set: function (value) {
                this.password = lt_code.SHA256.decode(value);
            },
            enumerable: false,
            configurable: true
        });
        /**当前用户数量 */
        User.Count = function () {
            var ret = 0;
            return ret;
        };
        /**转为MD5校检字符串 */
        User.prototype.ToStringForMD5 = function () {
            var ret = {
                id: this.id,
                name: this.name,
                password: this.password,
                sha: this.sha,
            };
            return JSON.stringify(ret);
        };
        /**获取MD5校检值 */
        User.prototype.GetMD5 = function () {
            return MD5(this.ToStringForMD5());
        };
        /**更新MD5校检值 */
        User.prototype.UpdateMD5 = function () {
            var md5 = this.GetMD5();
            this.md5 = md5;
            return md5;
        };
        /**获取初始校检值 */
        User.prototype.GetSHA256 = function () {
            var ret = {
                id: this.id,
                name: this.name,
                password: this.password
            };
            return lt_code.SHA256.decode(JSON.stringify(ret));
        };
        /**所有的用户*/
        User.Users = [];
        return User;
    }());
    IDE.User = User;
    /**操作 */
    var Operation;
    (function (Operation) {
        /**创建对象 */
        Operation[Operation["Create"] = 0] = "Create";
    })(Operation = IDE.Operation || (IDE.Operation = {}));
    /**编译器对象 */
    var IDEObject = /** @class */ (function () {
        /**
         * 构造函数
         * @param userMD5
         * @param createTime
         * @param name
         */
        function IDEObject(userMD5, createTime, name, Material) {
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
        Object.defineProperty(IDEObject.prototype, "UUID", {
            /**对象唯一识别码*/
            get: function () {
                return this.uuid;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IDEObject.prototype, "IsIDEObject", {
            /**是否是IDE对象*/
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(IDEObject.prototype, "Type", {
            /**获取类型 */
            get: function () {
                return this.type;
            },
            enumerable: false,
            configurable: true
        });
        /**初始化 */
        IDEObject.prototype.init = function () {
        };
        /**
         * 转为THREE.js的对象
         * @param callback
         * @callback THREE.Group
         */
        IDEObject.prototype.toTHREE = function (callback) {
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
        };
        /**刷新THREE.js对象 */
        IDEObject.prototype.UpdateTHREE = function () {
            if (this.ThreeObject == void 0) {
                this.ThreeObject = this.toTHREE();
            }
            else {
                this.ThreeObject.position.copy(this.Transform.Position.toTHREE());
                this.ThreeObject.setRotationFromEuler(this.Transform.EularAngles.toEULER());
                this.ThreeObject.scale.copy(this.Transform.Scale.toTHREE());
            }
        };
        return IDEObject;
    }());
    IDE.IDEObject = IDEObject;
    /**圆形平面类 */
    var CircularPlane = /** @class */ (function (_super) {
        __extends(CircularPlane, _super);
        /**
         * 构造函数
         * @param userMD5
         * @param radius
         * @param sides
         * @param startAngle
         */
        function CircularPlane(userMD5, radius, sides, startAngle, color, createTime, name) {
            var _this = _super.call(this, userMD5, createTime, name) || this;
            _this.radius = radius ? radius : 1;
            _this.sides = sides && sides < 3 ? 3 : sides;
            _this.startAngle = startAngle ? startAngle : 0;
            _this.color = color ? color : "white";
            _this.Material = new THREE.MeshBasicMaterial({ color: _this.color });
            _this.type = "CircularPlane";
            return _this;
        }
        /**
         * 重写转为THREE.js的对象
         * @param callback
         */
        CircularPlane.prototype.toTHREE = function (callback) {
            var ret = _super.prototype.toTHREE.call(this);
            /**平面 */
            var plane = new THREE.CircleGeometry(this.radius, this.sides, this.startAngle);
            var mesh = new THREE.Mesh(plane, this.Material);
            ret.add(mesh);
            if (callback) {
                callback(ret);
            }
            return ret;
        };
        return CircularPlane;
    }(IDEObject));
    IDE.CircularPlane = CircularPlane;
    /**平面类 */
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        /**
         * 构造函数
         * @param userMD5
         * @param width
         * @param height
         * @param color
         * @param createTime
         * @param name
         */
        function Plane(userMD5, width, height, color, createTime, name) {
            var _this = _super.call(this, userMD5, createTime, name) || this;
            _this.width = width ? width : 1;
            _this.height = height ? height : 1;
            _this.color = color ? color : "white";
            _this.Material = new THREE.MeshBasicMaterial({ color: _this.color });
            _this.type = "Plane";
            return _this;
        }
        /**
         * 重写转为THREE对象
         * @param callback
         */
        Plane.prototype.toTHREE = function (callback) {
            var ret = _super.prototype.toTHREE.call(this);
            /**平面 */
            var plane = new THREE.PlaneGeometry(this.width, this.height);
            var mesh = new THREE.Mesh(plane, this.Material);
            ret.add(mesh);
            if (callback) {
                callback(ret);
            }
            return ret;
        };
        return Plane;
    }(IDEObject));
    IDE.Plane = Plane;
    /**图片类 */
    var Image = /** @class */ (function (_super) {
        __extends(Image, _super);
        /**
         * 构造函数(尚未完成)
         * @param userMD5
         * @param src
         * @param createTime
         * @param name
         */
        function Image(userMD5, src, width, height, createTime, name) {
            var _this = _super.call(this, userMD5, width, height, null, createTime, name) || this;
            _this._src = src;
            var Texture = new THREE.TextureLoader().load(_this._src);
            Texture.wrapS = THREE.RepeatWrapping;
            Texture.wrapT = THREE.RepeatWrapping;
            _this.Material = new THREE.MeshLambertMaterial({
                map: Texture,
                side: THREE.DoubleSide,
                color: "white"
            });
            _this.type = "Image";
            return _this;
        }
        Object.defineProperty(Image.prototype, "src", {
            get: function () {
                return this._src;
            },
            set: function (value) {
                var _this = this;
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
                    this.ThreeObject.children.forEach(function (e) {
                        e.material = _this.Material;
                    });
                }
            },
            enumerable: false,
            configurable: true
        });
        return Image;
    }(Plane));
    IDE.Image = Image;
    /**视频类 */
    var Video = /** @class */ (function (_super) {
        __extends(Video, _super);
        /**
         * 构造函数
         * @param userMD5
         * @param src
         * @param width
         * @param height
         * @param createTime
         * @param name
         */
        function Video(userMD5, src, width, height, createTime, name) {
            if (width === void 0) { width = 16; }
            if (height === void 0) { height = 9; }
            var _this = _super.call(this, userMD5, width, height, null, createTime, name) || this;
            _this.src = src;
            _this.video = document.createElement("video");
            if (_this.src == void 0) {
                _this.Material = new THREE.MeshBasicMaterial({ color: "black" });
            }
            else {
                if (typeof (_this.src) == "string") {
                    _this.video.src = _this.src;
                }
                else {
                    _this.video.srcObject = _this.src;
                }
                var texture = new THREE.VideoTexture(_this.video);
                //对纹理进行滤波
                texture.minFilter = THREE.LinearFilter;
                //对纹理压缩
                texture.format = THREE.RGBAFormat;
                _this.Material = new THREE.MeshBasicMaterial({ map: texture });
            }
            _this.type = "Video";
            return _this;
        }
        //播放
        Video.prototype.play = function () {
            this.video.play();
        };
        //暂停
        Video.prototype.stop = function () {
            this.video.pause();
        };
        return Video;
    }(Plane));
    IDE.Video = Video;
    /**从外部读取的对象 */
    var ReadObject = /** @class */ (function (_super) {
        __extends(ReadObject, _super);
        /**
         * 构造函数
         * @param userMD5
         * @param src
         * @param createTime
         * @param name
         * @param Material
         */
        function ReadObject(userMD5, src, createTime, name, Material) {
            var _this = _super.call(this, userMD5, createTime, name, Material) || this;
            _this._src = src;
            _this.type = "ReadObject";
            return _this;
        }
        Object.defineProperty(ReadObject.prototype, "src", {
            get: function () {
                return this._src;
            },
            /**文件地址*/
            set: function (value) {
                this._src = value;
            },
            enumerable: false,
            configurable: true
        });
        /**取消回调,使用await和async实现异步 */
        ReadObject.prototype.ToTHREE = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                return __generator(this, function (_a) {
                    ret = new THREE.Group();
                    ret.position.copy(this.Transform.Position.toTHREE());
                    ret.setRotationFromEuler(this.Transform.EularAngles.toEULER());
                    ret.scale.copy(this.Transform.Scale.toTHREE());
                    if (this.Transform.Parent && this.Transform.Parent.IDEObject.ThreeObject) {
                        this.Transform.Parent.IDEObject.ThreeObject.add(ret);
                    }
                    return [2 /*return*/, ret];
                });
            });
        };
        /**重写刷新THREE.js对象 */
        ReadObject.prototype.UpdateTHREE = function () {
            var _this = this;
            if (this.ThreeObject == void 0) {
                this.toTHREE(function (obj) {
                    _this.ThreeObject = obj;
                });
            }
            else {
                this.ThreeObject.position.copy(this.Transform.Position.toTHREE());
                this.ThreeObject.setRotationFromEuler(this.Transform.EularAngles.toEULER());
                this.ThreeObject.scale.copy(this.Transform.Scale.toTHREE());
            }
        };
        return ReadObject;
    }(IDEObject));
    IDE.ReadObject = ReadObject;
    /**FBX对象 */
    var FBXObject = /** @class */ (function (_super) {
        __extends(FBXObject, _super);
        /**
         * 构造函数
         * @param userMD5
         * @param src
         * @param createTime
         * @param name
         * @param Material
         */
        function FBXObject(userMD5, src, createTime, name, Material) {
            var _this = _super.call(this, userMD5, src, createTime, name, Material) || this;
            _this.type = "FBXObject";
            return _this;
        }
        /**
         * 重写无回调转为THREE
         * @param callback
         */
        FBXObject.prototype.ToTHREE = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ret;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.ToTHREE.call(this)];
                        case 1:
                            ret = _a.sent();
                            return [4 /*yield*/, new Promise(function (resolve, reason) {
                                    try {
                                        if (_this.src !== void 0) {
                                            fbxLoader.load(_this.src, function (loadGroup) {
                                                loadGroup.children.forEach(function (e) {
                                                    loadGroup.remove(e);
                                                    ret.add(e);
                                                });
                                                resolve("loaddown");
                                            });
                                        }
                                    }
                                    catch (e) {
                                        reason(new IDEError("加载错误!", "ToTHREE", e));
                                    }
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, ret];
                    }
                });
            });
        };
        /**
         * 重写转为THREE
         * @param callback
         */
        FBXObject.prototype.toTHREE = function (callback) {
            var ret = _super.prototype.toTHREE.call(this);
            fbxLoader.load(this.src, function (loadGroup) {
                loadGroup.children.forEach(function (e) {
                    loadGroup.remove(e);
                    ret.add(e);
                });
                if (callback) {
                    callback(ret);
                }
            });
            return ret;
        };
        return FBXObject;
    }(ReadObject));
    IDE.FBXObject = FBXObject;
    //重写THREE的添加和移除
    //使IDEObject可以被直接添加进入场景
    void function overrideTHREE() {
        //内部用到的对象
        var _m1$1 = new THREE.Matrix4();
        var _addedEvent = {
            type: 'added'
        };
        var _removedEvent = {
            type: 'removed'
        };
        THREE.Object3D.prototype.add = function (object) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (arguments.length > 1) {
                for (var i = 0; i < arguments.length; i++) {
                    this.add(arguments[i]);
                }
                return this;
            }
            else {
                if (object.IsIDEObject) {
                    if (object.ThreeObject == void 0) {
                        object.UpdateTHREE();
                    }
                    return this.add(object.ThreeObject);
                }
                else {
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
                    }
                    else {
                        console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', object);
                    }
                    return this;
                }
            }
        };
        THREE.Object3D.prototype.attach = function (object) {
            if (object.IsIDEObject) {
                if (object.ThreeObject == void 0) {
                    object.UpdateTHREE();
                }
                return this.attach(object.ThreeObject);
            }
            else {
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
        THREE.Object3D.prototype.remove = function (object) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (arguments.length > 1) {
                for (var i = 0; i < arguments.length; i++) {
                    this.remove(arguments[i]);
                }
                return this;
            }
            else {
                if (object.IsIDEObject) {
                    if (object.ThreeObject == void 0) {
                        object.UpdateTHREE();
                    }
                    return this.remove(object.ThreeObject);
                }
                else {
                    var index = this.children.indexOf(object);
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
})(IDE || (IDE = {}));
