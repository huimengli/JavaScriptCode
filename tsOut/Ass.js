/// <reference path="../lt_code.js" />
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
/**汇编模块 */
var Ass;
(function (Ass_1) {
    /**汇编错误 */
    var AssError = /** @class */ (function (_super) {
        __extends(AssError, _super);
        /**
         * 构造函数
         * @param value 错误内容
         * @param typeName 错误类
         * @param funName 错误函数
         */
        function AssError(typeName, funName, value) {
            var message = "汇编模块错误\n";
            if (typeName != void 0) {
                message += "错误类: " + typeName + "\n";
            }
            if (funName != void 0) {
                message += "错误函数: " + funName + "\n";
            }
            message += "错误内容: " + (value ? value : "无");
            return _super.call(this, message) || this;
        }
        return AssError;
    }(Error));
    /**字节 */
    var byte = /** @class */ (function () {
        function byte(value) {
            if (value == void 0) {
                value = 0;
            }
            else if (typeof (value) == "string") {
                value = value.charCodeAt(0);
            }
            else if (typeof (value) == "number") {
            }
            else {
                throw new AssError("byte", "constructor", "输入内容类型错误");
            }
            if (value < 0 || value > 255) {
                throw new AssError("byte", "constructor", "输入数据超过限制");
            }
            else {
                var s = Math.floor(value);
                this.v7 = !!((s >> 0) % 2);
                this.v6 = !!((s >> 1) % 2);
                this.v5 = !!((s >> 2) % 2);
                this.v4 = !!((s >> 3) % 2);
                this.v3 = !!((s >> 4) % 2);
                this.v2 = !!((s >> 5) % 2);
                this.v1 = !!((s >> 6) % 2);
                this.v0 = !!((s >> 7) % 2);
            }
        }
        Object.defineProperty(byte.prototype, "v0", {
            get: function () {
                return this._v0;
            },
            set: function (value) {
                this._v0 = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(byte.prototype, "v1", {
            get: function () {
                return this._v1;
            },
            set: function (value) {
                this._v1 = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(byte.prototype, "v2", {
            get: function () {
                return this._v2;
            },
            set: function (value) {
                this._v2 = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(byte.prototype, "v3", {
            get: function () {
                return this._v3;
            },
            set: function (value) {
                this._v3 = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(byte.prototype, "v4", {
            get: function () {
                return this._v4;
            },
            set: function (value) {
                this._v4 = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(byte.prototype, "v5", {
            get: function () {
                return this._v5;
            },
            set: function (value) {
                this._v5 = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(byte.prototype, "v6", {
            get: function () {
                return this._v6;
            },
            set: function (value) {
                this._v6 = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(byte.prototype, "v7", {
            get: function () {
                return this._v7;
            },
            set: function (value) {
                this._v7 = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(byte.prototype, "MAX", {
            get: function () {
                return 255;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(byte.prototype, "MIN", {
            get: function () {
                return 0;
            },
            enumerable: false,
            configurable: true
        });
        /**转为整形 */
        byte.prototype.toInt = function () {
            var ret = this.v0 ? 128 : 0;
            ret += this.v1 ? 64 : 0;
            ret += this.v2 ? 32 : 0;
            ret += this.v3 ? 16 : 0;
            ret += this.v4 ? 8 : 0;
            ret += this.v5 ? 4 : 0;
            ret += this.v6 ? 2 : 0;
            ret += this.v7 ? 1 : 0;
            return ret;
        };
        ;
        /**转为二进制 */
        byte.prototype.toBinary = function () {
            var ret = this.v0 ? "1" : "0";
            ret += this.v1 ? "1" : "0";
            ret += this.v2 ? "1" : "0";
            ret += this.v3 ? "1" : "0";
            ret += this.v4 ? "1" : "0";
            ret += this.v5 ? "1" : "0";
            ret += this.v6 ? "1" : "0";
            ret += this.v7 ? "1" : "0";
            return ret;
        };
        /**
         * 转为字符串
         * @param {null|number} type 转换方式
         */
        byte.prototype.toString = function (type) {
            if (type == null) {
                return this.toInt().toString();
            }
            else if (typeof (type) == "number") {
                if (type == 2) {
                    return this.toBinary();
                }
                else if (type == 16) {
                    return lt_code.from10To16(this.toInt());
                }
                else {
                    return this.toInt().toString(type);
                }
            }
            else {
                throw new AssError("byte", "toString", "没有这种模式!");
            }
        };
        /**获取长度(防止报错) */
        byte.prototype.length = function () {
            return 0;
        };
        /**重载valueOf实现重载加减 */
        byte.prototype.valueOf = function () {
            return this.toInt();
        };
        return byte;
    }());
    Ass_1.byte = byte;
    /**8位寄存器 */
    var reg8 = /** @class */ (function (_super) {
        __extends(reg8, _super);
        function reg8() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(reg8.prototype, "IsREG8", {
            /**是否是8位寄存器 */
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg8.prototype, "IsREG16", {
            /**是否是16位寄存器 */
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        return reg8;
    }(byte));
    Ass_1.reg8 = reg8;
    /**16位寄存器 */
    var reg16 = /** @class */ (function () {
        /**
         * 构造函数
         * @param value
         * @param isSegment 是否是段寄存器
         */
        function reg16(value, isSegment, isIndex) {
            if (isSegment === void 0) { isSegment = false; }
            if (isIndex === void 0) { isIndex = false; }
            if (value == void 0) {
                value = 0;
            }
            else if (typeof (value) == "string") {
                var temp = value.charCodeAt(0);
                if (temp <= 255) {
                    temp += value.charCodeAt(1) << 8;
                }
                value = temp;
            }
            else if (typeof (value) == "number") {
            }
            else {
                throw new AssError("reg16", "constructor", "输入内容类型错误");
            }
            if (value < 0 || value > 65535) {
                throw new AssError("reg16", "constructor", "输入数据超过限制");
            }
            else {
                this.l = new reg8(value % (2 << 7));
                this.h = new reg8(value >> 8);
            }
        }
        Object.defineProperty(reg16.prototype, "l", {
            get: function () {
                return this._l;
            },
            /**低位 */
            set: function (value) {
                if (typeof (value) == "number" || typeof (value) == "string") {
                    this._l = new reg8(value);
                }
                else if (value.IsREG8) {
                    this._l = value;
                }
                else {
                    throw new AssError("reg16", "set", "低位赋值内容错误");
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg16.prototype, "h", {
            get: function () {
                return this._h;
            },
            /**高位 */
            set: function (value) {
                if (typeof (value) == "number" || typeof (value) == "string") {
                    this._h = new reg8(value);
                }
                else if (value.IsREG8) {
                    this._h = value;
                }
                else {
                    throw new AssError("reg16", "set", "高位赋值内容错误");
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg16.prototype, "IsREG8", {
            /**是否是8位寄存器 */
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg16.prototype, "IsREG16", {
            /**是否是16位寄存器 */
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg16.prototype, "IsSegment", {
            /**是否是段寄存器 */
            get: function () {
                return this._isSegment;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg16.prototype, "IsIndex", {
            /**是否是指针 */
            get: function () {
                return this._isIndex;
            },
            enumerable: false,
            configurable: true
        });
        /**转为整形 */
        reg16.prototype.toInt = function () {
            var ret = this.l.toInt();
            ret += (this.h.toInt() << 8);
            return ret;
        };
        /**转为二进制 */
        reg16.prototype.toBinary = function () {
            return this.h.toBinary() + this.l.toBinary();
        };
        /**
         * 转为字符串
         * @param {null|number} type 转换方式
         */
        reg16.prototype.toString = function (type) {
            if (type == null) {
                return this.toInt().toString();
            }
            else if (typeof (type) == "number") {
                if (type == 2) {
                    return this.toBinary();
                }
                else if (type == 16) {
                    return lt_code.from10To16(this.toInt());
                }
                else {
                    return this.toInt().toString(type);
                }
            }
            else {
                throw new AssError("reg16", "toString", "没有这种模式!");
            }
        };
        /**获取长度 */
        reg16.prototype.length = function () {
            return 0;
        };
        /**重载valueOf实现重载加减 */
        reg16.prototype.valueOf = function () {
            return this.toInt();
        };
        return reg16;
    }());
    Ass_1.reg16 = reg16;
    /**32位寄存器 */
    var reg32 = /** @class */ (function () {
        /**
         * 构造函数
         * @param value
         * @param isSegment 是否是段寄存器
         */
        function reg32(value, isSegment, isIndex) {
            if (isSegment === void 0) { isSegment = false; }
            if (isIndex === void 0) { isIndex = false; }
            if (value == void 0) {
                value = 0;
            }
            else if (typeof (value) == "string") {
                var temp = value.charCodeAt(0);
                if (temp <= 255) {
                    temp += value.charCodeAt(1) << 8;
                }
                if (temp <= 65535) {
                    temp += value.charCodeAt(2) << 16;
                }
                if (temp <= 1677215) {
                    temp += value.charCodeAt(2) << 24;
                }
                value = temp;
            }
            else if (typeof (value) == "number") {
            }
            else {
                throw new AssError("reg32", "constructor", "输入内容类型错误");
            }
            if (value < 0 || value > Math.pow(256, 4) - 1) {
                throw new AssError("reg32", "constructor", "输入数据超过限制");
            }
            else {
                this.l = new reg16(value % (2 << 15));
                this.h = new reg16(value >> 16);
            }
        }
        Object.defineProperty(reg32.prototype, "l", {
            get: function () {
                return this._l;
            },
            /**低位 */
            set: function (value) {
                if (typeof (value) == "number" || typeof (value) == "string") {
                    this._l = new reg16(value);
                }
                else if (value.IsREG16) {
                    this._l = value;
                }
                else {
                    throw new AssError("reg32", "set", "低位赋值内容错误");
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg32.prototype, "h", {
            get: function () {
                return this._h;
            },
            /**高位 */
            set: function (value) {
                if (typeof (value) == "number" || typeof (value) == "string") {
                    this._h = new reg16(value);
                }
                else if (value.IsREG16) {
                    this._h = value;
                }
                else {
                    throw new AssError("reg32", "set", "高位赋值内容错误");
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg32.prototype, "IsREG8", {
            /**是否是8位寄存器 */
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg32.prototype, "IsREG16", {
            /**是否是16位寄存器 */
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg32.prototype, "IsREG32", {
            /**是否是16位寄存器 */
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg32.prototype, "IsSegment", {
            /**是否是段寄存器 */
            get: function () {
                return this._isSegment;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg32.prototype, "IsIndex", {
            /**是否是指针 */
            get: function () {
                return this._isIndex;
            },
            enumerable: false,
            configurable: true
        });
        /**转为整形 */
        reg32.prototype.toInt = function () {
            var ret = this.l.toInt();
            ret += (this.h.toInt() << 16);
            return ret;
        };
        /**转为二进制 */
        reg32.prototype.toBinary = function () {
            return this.h.toBinary() + this.l.toBinary();
        };
        /**
         * 转为字符串
         * @param {null|number} type 转换方式
         */
        reg32.prototype.toString = function (type) {
            if (type == null) {
                return this.toInt().toString();
            }
            else if (typeof (type) == "number") {
                if (type == 2) {
                    return this.toBinary();
                }
                else if (type == 16) {
                    return lt_code.from10To16(this.toInt());
                }
                else {
                    return this.toInt().toString(type);
                }
            }
            else {
                throw new AssError("reg32", "toString", "没有这种模式!");
            }
        };
        /**获取长度 */
        reg32.prototype.length = function () {
            return 0;
        };
        /**重载valueOf实现重载加减 */
        reg32.prototype.valueOf = function () {
            return this.toInt();
        };
        return reg32;
    }());
    Ass_1.reg32 = reg32;
    /**模块 */
    var Ass = /** @class */ (function () {
        /**
         * 创建的内存空间大小
         * @param line 内存行数默认64
         */
        function Ass(line) {
            if (line === void 0) { line = 64; }
            this._ax = new reg16();
            this._bx = new reg16(null, false, true);
            this._cx = new reg16();
            this._dx = new reg16();
            this._sp = new reg16();
            this._bp = new reg16(null, false, true);
            this._si = new reg16(null, false, true);
            this._di = new reg16(null, false, true);
            this._ds = new reg16(null, true);
            this._es = new reg16(null, true);
            this._ss = new reg16(null, true);
            /**内存*/
            this._memory = new Uint8ClampedArray(line * 16);
        }
        Object.defineProperty(Ass.prototype, "memory", {
            /**内存空间*/
            get: function () {
                return this._memory;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "ax", {
            //可变量
            get: function () {
                return this._ax;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "bx", {
            get: function () {
                return this._bx;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "cx", {
            get: function () {
                return this._cx;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "dx", {
            get: function () {
                return this._dx;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "sp", {
            get: function () {
                return this._sp;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "bp", {
            get: function () {
                return this._bp;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "si", {
            get: function () {
                return this._si;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "di", {
            get: function () {
                return this._di;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "ds", {
            get: function () {
                return this._ds;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "es", {
            get: function () {
                return this._es;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "ss", {
            get: function () {
                return this._ss;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 读取内存输入检测
         * @param a
         * @param b
         */
        Ass.prototype.getMemoryCheck = function (a, b) {
            if (a.IsREG16 || a.IsREG8) {
                a = a.toInt();
            }
            else if (typeof (a) == "number") {
                if (b.IsREG16 || b.IsREG8) {
                    b = b.toInt();
                }
                else if (typeof (b) == "number") {
                    if (a * 16 + b > this.memory.length || a * 16 + b < 0) {
                        throw new AssError("ass", "getMemoryCheck", "获取地址超出内存上下文");
                    }
                    else {
                        return { a: a, b: b };
                    }
                }
                else {
                    throw new AssError("ass", "getMemoryCheck", "参数b输入类型错误!");
                }
            }
            else {
                throw new AssError("ass", "getMemoryCheck", "参数a输入类型错误!");
            }
        };
        /**
         * 获取字节
         * @param a 段寄存器
         * @param b 寄存器
         */
        Ass.prototype.getByte = function (a, b) {
            var check = this.getMemoryCheck(a, b);
            a = check.a;
            b = check.b;
            return this.memory[a * 16 + b];
        };
        /**
         * 获取字节
         * @param a 段寄存器
         * @param b 寄存器
         */
        Ass.prototype.getWord = function (a, b) {
            var check = this.getMemoryCheck(a, b);
            a = check.a;
            b = check.b;
            if (a * 16 + b + 1 > this.memory.length) {
                throw new AssError("ass", "getWord", "获取地址超出内存上下文");
            }
            var ret = new reg16();
            ret.l = new reg8(this.memory[a * 16 + b]);
            ret.h = new reg8(this.memory[a * 16 + b + 1]);
            return ret.toInt();
        };
        /**
         * 获取长字节
         * @param a
         * @param b
         */
        Ass.prototype.getDword = function (a, b) {
            var check = this.getMemoryCheck(a, b);
            a = check.a;
            b = check.b;
            if (a * 16 + b + 3 > this.memory.length) {
                throw new AssError("ass", "getWord", "获取地址超出内存上下文");
            }
            var ret = new reg16();
            ret.l = new reg8(this.memory[a * 16 + b]);
            ret.h = new reg8(this.memory[a * 16 + b + 1]);
            return ret.toInt();
        };
        /**
         * 移动
         * @param a
         * @param b
         * @param c
         */
        Ass.prototype.mov = function (a, b, c, d) {
            if (c === void 0) { c = this.ds; }
            if (a.length) {
                if (a[0]) {
                }
            }
            else {
                if (a.IsREG16) {
                }
                else if (a.IsREG8) {
                }
                else {
                    throw new AssError("Ass", "mov", "变量a输入类型错误!");
                }
            }
        };
        return Ass;
    }());
    Ass_1.Ass = Ass;
})(Ass || (Ass = {}));
