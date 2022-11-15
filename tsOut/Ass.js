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
    /**内存空间 */
    var _memory;
    /**外抛对象 */
    var _exportList = [
        //寄存器对象
        "ax", "bx", "cx", "dx",
        "ah", "al", "bh", "bl", "ch", "cl", "dh", "dl",
        "sp", "bp", "si", "di",
        "ds", "es", "ss",
        //函数
        "mov", "add", "sub",
        //数据
        "memory",
    ];
    /**是否外抛 */
    var _isExport = false;
    //以下是函数
    /**
     * 加法(数字)
     * @param reg
     * @param num
     */
    var addNumber = function (reg, num) {
        if (typeof (num) == "number") {
            if ("IsREG" in reg) {
                if ("IsREG8" in reg) {
                    reg.copy((reg.valueOf() + num) % 0x100);
                }
                else if ("IsREG16" in reg) {
                    reg.copy((reg.valueOf() + num) % 0x10000);
                }
                else if ("IsREG32" in reg) {
                    reg.copy((reg.valueOf() + num) % 0x100000000);
                }
                else {
                    throw new AssError("Ass", "add", "参数reg非已有的寄存器!");
                }
            }
            else {
                throw new AssError("Ass", "add", "参数reg并非为寄存器!");
            }
        }
        else {
            throw new AssError("Ass", "add", "参数num不能为其他类型!");
        }
    };
    /**
     * 减法(数字)
     * @param reg
     * @param num
     */
    var subNumber = function (reg, num) {
        if (typeof (num) == "number") {
            if ("IsREG" in reg) {
                var temp = 0;
                if ("IsREG8" in reg) {
                    temp = (reg.valueOf() - num) % 0x100;
                    reg.copy(temp >= 0 ? temp : 0x100 + temp);
                }
                else if ("IsREG16" in reg) {
                    temp = (reg.valueOf() - num) % 0x10000;
                    reg.copy(temp >= 0 ? temp : 0x10000 + temp);
                }
                else if ("IsREG32" in reg) {
                    temp = (reg.valueOf() - num) % 0x100000000;
                    reg.copy(temp >= 0 ? temp : 0x100000000 + temp);
                }
                else {
                    throw new AssError("Ass", "add", "参数reg非已有的寄存器!");
                }
            }
            else {
                throw new AssError("Ass", "add", "参数reg并非为寄存器!");
            }
        }
        else {
            throw new AssError("Ass", "add", "参数num不能为其他类型!");
        }
    };
    /**
     * 加法(数字)
     * @param address 内存地址
     * @param num 加数
     * @param seg 段寄存器
     * @param ptr 指针
     */
    var addMemoryNumber = function (address, num, seg, ptr) {
        if (address.length == 1) {
            if (seg.IsSegment) {
                if (typeof (address[0]) == "number") {
                }
                else {
                    if (!address[0].IsIndex) {
                        throw new AssError("Ass", "add", "非指针对象不可出现在[]内!");
                    }
                }
                var temp = 0;
                switch (ptr) {
                    case "byte":
                        temp = Ass.prototype.getByte(seg, address[0]).toInt();
                        temp += num;
                        temp = temp % 0x100;
                        break;
                    case "word":
                        temp = Ass.prototype.getWord(seg, address[0]).toInt();
                        temp += num;
                        temp = temp % 0x10000;
                        break;
                    case "dword":
                        temp = Ass.prototype.getDword(seg, address[0]).toInt();
                        temp += num;
                        temp = temp % 0x100000000;
                        break;
                    default:
                        throw new AssError("Ass", "add", "参数ptr为不支持的指针类型!");
                }
                Ass.prototype.mov(address, temp, seg, ptr);
            }
            else if (ptr == void 0) {
                throw new AssError("Ass", "add", "参数ptr必须指定指针类型!");
            }
            else {
                throw new AssError("Ass", "add", "参数seg必须为段寄存器!");
            }
        }
        else {
            throw new AssError("Ass", "add", "参数a输入内存类型错误!");
        }
    };
    /**
     * 减法(数字)
     * @param address 内存地址
     * @param num 加数
     * @param seg 段寄存器
     * @param ptr 指针
     */
    var subMemoryNumber = function (address, num, seg, ptr) {
        if (address.length == 1) {
            if (seg.IsSegment) {
                if (typeof (address[0]) == "number") {
                }
                else {
                    if (!address[0].IsIndex) {
                        throw new AssError("Ass", "add", "非指针对象不可出现在[]内!");
                    }
                }
                var temp = 0;
                switch (ptr) {
                    case "byte":
                        temp = Ass.prototype.getByte(seg, address[0]).toInt();
                        temp -= num;
                        temp = temp % 0x100;
                        temp = temp >= 0 ? temp : temp + 0x100;
                        break;
                    case "word":
                        temp = Ass.prototype.getWord(seg, address[0]).toInt();
                        temp -= num;
                        temp = temp % 0x10000;
                        temp = temp >= 0 ? temp : temp + 0x10000;
                        break;
                    case "dword":
                        temp = Ass.prototype.getDword(seg, address[0]).toInt();
                        temp -= num;
                        temp = temp % 0x100000000;
                        temp = temp >= 0 ? temp : temp + 0x100000000;
                        break;
                    default:
                        throw new AssError("Ass", "add", "参数ptr为不支持的指针类型!");
                }
                Ass.prototype.mov(address, temp, seg, ptr);
            }
            else if (ptr == void 0) {
                throw new AssError("Ass", "add", "参数ptr必须指定指针类型!");
            }
            else {
                throw new AssError("Ass", "add", "参数seg必须为段寄存器!");
            }
        }
        else {
            throw new AssError("Ass", "add", "参数a输入内存类型错误!");
        }
    };
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
            else if (value == 0) {
                this.v0 = false;
                this.v1 = false;
                this.v2 = false;
                this.v3 = false;
                this.v4 = false;
                this.v5 = false;
                this.v6 = false;
                this.v7 = false;
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
        Object.defineProperty(byte.prototype, "length", {
            /**获取长度(防止报错) */
            get: function () {
                return 0;
            },
            enumerable: false,
            configurable: true
        });
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
        Object.defineProperty(reg8.prototype, "IsREG", {
            /**是否是寄存器 */
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg8.prototype, "value", {
            /**用于调试时查看数据*/
            get: function () {
                return this.valueOf();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * 转为中文
         * 实际上从reg16开始才能正真存储中文
         * 所以reg8实际上是存储英文字符用的
         */
        reg8.prototype.toChinese = function () {
            return String.fromCharCode(this.toInt());
        };
        /**
         * 从对象复制
         * @param source
         */
        reg8.prototype.copy = function (source) {
            if (typeof (source) == "string") {
                source = source.charCodeAt(0);
            }
            if (typeof (source) == "number") {
                if (source < 0 || source > 255) {
                    throw new AssError("reg8", "copy", "输入数据超过上限");
                }
                else {
                    var s = Math.floor(source);
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
            else if ("MAX" in source && "MIN" in source) {
                this.v7 = source.v7;
                this.v6 = source.v6;
                this.v5 = source.v5;
                this.v4 = source.v4;
                this.v3 = source.v3;
                this.v2 = source.v2;
                this.v1 = source.v1;
                this.v0 = source.v0;
            }
            else {
                throw new AssError("reg8", "copy", "输入数据类型错误");
            }
            return this;
        };
        /**克隆 */
        reg8.prototype.clone = function () {
            return new reg8().copy(this);
        };
        /**
         * 移动
         * 在某种意义上相当于Copy
         * @param b 对象或者指针
         * @param seg 段寄存器
         */
        reg8.prototype.mov = function (b, seg) {
            if (typeof (b) == "number" || ("MAX" in b && "IsREG" in b)) {
                if (b < 0 || b > 255) {
                    throw new AssError("reg8", "mov", "输入数据超过限制");
                }
                else {
                    this.copy(b);
                }
            }
            else {
                if (seg == void 0) {
                    throw new AssError("reg8", "mov", "参数seg没有内容,调用内存数据必须seg!");
                }
                else if (!seg.IsSegment) {
                    throw new AssError("reg8", "mov", "参数seg输入对象类型错误!");
                }
                else {
                    if (b.length == 1) {
                        try {
                            if (typeof (b[0]) == "number") {
                                this.copy(_memory[seg.toInt() * 16 + b[0]]);
                            }
                            else {
                                if (b[0].IsIndex) {
                                    this.copy(_memory[seg.toInt() * 16 + b[0].toInt()]);
                                }
                                else {
                                    throw new AssError("reg8", "mov", "参数b,[]内必须为指针对象!");
                                }
                            }
                        }
                        catch (e) {
                            if (/[\u4e00-\u9f5a]/.test(e.message)) {
                                throw e;
                            }
                            else {
                                throw new AssError("reg8", "mov", "内存超出上下文\n+错误内容:" + e);
                            }
                        }
                    }
                    else {
                        throw new AssError("reg8", "mov", "参数b输入对象类型错误!");
                    }
                }
            }
        };
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
                var index = 0;
                var temp = value.charCodeAt(index++);
                if (temp <= 255) {
                    temp *= Math.pow(2, 8);
                    temp += value.charCodeAt(index++);
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
            else if (value == 0) {
                this.l = new reg8(0);
                this.h = new reg8(0);
            }
            else {
                this.l = new reg8(value % 0x100);
                this.h = new reg8(Math.floor(value / 0x100));
            }
            this._isSegment = isSegment;
            this._isIndex = isIndex;
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
        Object.defineProperty(reg16.prototype, "IsREG16", {
            /**是否是16位寄存器 */
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg16.prototype, "IsREG", {
            /**是否是寄存器 */
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
        Object.defineProperty(reg16.prototype, "value", {
            /**用于调试时查看数据*/
            get: function () {
                return this.valueOf();
            },
            enumerable: false,
            configurable: true
        });
        /**转为整形 */
        reg16.prototype.toInt = function () {
            var ret = this.l.toInt();
            ret += (this.h.toInt() * Math.pow(2, 8));
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
        Object.defineProperty(reg16.prototype, "length", {
            /**获取长度 */
            get: function () {
                return 0;
            },
            enumerable: false,
            configurable: true
        });
        /**重载valueOf实现重载加减 */
        reg16.prototype.valueOf = function () {
            return this.toInt();
        };
        /**
         * 转为中文
         */
        reg16.prototype.toChinese = function () {
            return String.fromCharCode(this.toInt());
        };
        /**
         * 从对象复制
         * 不会复制对象状态
         * @param source
         */
        reg16.prototype.copy = function (source) {
            var value = 0;
            if (typeof (source) == "string") {
                var index = 0;
                var temp = source.charCodeAt(index++);
                if (temp <= 255) {
                    temp *= Math.pow(2, 8);
                    temp += source.charCodeAt(index++);
                }
                value = temp;
            }
            else if (typeof (source) == "number") {
                value = source;
            }
            else if ("IsREG" in source || "MAX" in source) {
                value = source.toInt();
            }
            else {
                throw new AssError("reg16", "copy", "输入数据类型错误!");
            }
            if (value < 0 || value > 65535) {
                throw new AssError("reg16", "constructor", "输入数据超过限制");
            }
            else {
                this.l = new reg8(value % 0x100);
                this.h = new reg8(Math.floor(value / 0x100));
            }
            return this;
        };
        /**
         * 克隆
         * 克隆会复制对象状态
         */
        reg16.prototype.clone = function () {
            var ret = new reg16();
            ret.copy(this);
            ret._isIndex = this.IsIndex;
            ret._isSegment = this.IsSegment;
            return ret;
        };
        /**
         * 移动
         * 在某种意义上相当于Copy
         * @param b 对象或者指针
         * @param seg 段寄存器
         */
        reg16.prototype.mov = function (b, seg) {
            if (typeof (b) == "number") {
                if (this.IsSegment) {
                    throw new AssError("reg16", "mov", "不能直接将数值赋值给段寄存器!");
                }
                else {
                    if (b < 0 || b > 65535) {
                        throw new AssError("reg16", "mov", "输入数据超过限制");
                    }
                    else {
                        this.l = new reg8(b % 0x100);
                        this.h = new reg8(Math.floor(b / 0x100));
                    }
                }
            }
            else if ("IsREG" in b) {
                if (b.IsREG16) {
                    this.copy(b);
                }
                else {
                    throw new AssError("reg16", "mov", "参数b输入数据类型错误!");
                }
            }
            else {
                if (seg == void 0) {
                    throw new AssError("reg16", "mov", "参数seg没有内容,调用内存数据必须seg!");
                }
                else if (!seg.IsSegment) {
                    throw new AssError("reg16", "mov", "参数seg输入对象类型错误!");
                }
                else {
                    if (this.IsSegment) {
                        throw new AssError("reg16", "mov", "不能直接将内存中的数据赋值给段寄存器!");
                    }
                    else {
                        if (b.length == 1) {
                            try {
                                if (typeof (b[0]) == "number") {
                                    this.l.copy(_memory[seg.toInt() * 16 + b[0]]);
                                    this.h.copy(_memory[seg.toInt() * 16 + b[0] + 1]);
                                }
                                else {
                                    if (b[0].IsIndex) {
                                        this.l.copy(_memory[seg.toInt() * 16 + b[0].toInt()]);
                                        this.h.copy(_memory[seg.toInt() * 16 + b[0].toInt() + 1]);
                                    }
                                    else {
                                        throw new AssError("reg16", "mov", "参数b,[]内必须为指针对象!");
                                    }
                                }
                            }
                            catch (e) {
                                throw new AssError("reg16", "mov", "调用的内存超出上下文!");
                            }
                        }
                        else {
                            throw new AssError("reg16", "mov", "参数b输入对象类型错误!");
                        }
                    }
                }
            }
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
                var index = 0;
                var temp = value.charCodeAt(index++);
                if (temp <= 255) {
                    temp *= Math.pow(2, 8);
                    temp += value.charCodeAt(index++);
                }
                if (temp <= 0xffff) {
                    temp *= index == 1 ? Math.pow(2, 16) : Math.pow(2, 8);
                    temp += value.charCodeAt(index++);
                }
                if (temp < 0xffffff) {
                    temp *= index == 1 ? Math.pow(2, 24) : index == 2 ? Math.pow(2, 16) : Math.pow(2, 8);
                    temp += value.charCodeAt(index++);
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
                this.l = new reg16(value % 0x10000);
                this.h = new reg16(Math.floor(value / Math.pow(2, 16)));
            }
            this._isSegment = isSegment;
            this._isIndex = isIndex;
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
        Object.defineProperty(reg32.prototype, "IsREG32", {
            /**是否是16位寄存器 */
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(reg32.prototype, "IsREG", {
            /**是否是寄存器 */
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
        Object.defineProperty(reg32.prototype, "value", {
            /**用于调试时查看数据*/
            get: function () {
                return this.valueOf();
            },
            enumerable: false,
            configurable: true
        });
        /**转为整形 */
        reg32.prototype.toInt = function () {
            var ret = this.l.toInt();
            ret += (this.h.toInt() * Math.pow(2, 16));
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
        Object.defineProperty(reg32.prototype, "length", {
            /**获取长度 */
            get: function () {
                return 0;
            },
            enumerable: false,
            configurable: true
        });
        /**重载valueOf实现重载加减 */
        reg32.prototype.valueOf = function () {
            return this.toInt();
        };
        /**
         * 转为中文
         */
        reg32.prototype.toChinese = function () {
            var ret = String.fromCharCode(this.h.toInt());
            ret += String.fromCharCode(this.l.toInt());
            return ret;
        };
        /**
         * 从对象复制
         * @param source
         */
        reg32.prototype.copy = function (source) {
            var value = 0;
            if (typeof (source) == "string") {
                var index = 0;
                var temp = source.charCodeAt(index++);
                if (temp <= 255) {
                    temp *= Math.pow(2, 8);
                    temp += source.charCodeAt(index++);
                }
                if (temp <= 0xffff) {
                    temp *= index == 1 ? Math.pow(2, 16) : Math.pow(2, 8);
                    temp += source.charCodeAt(index++);
                }
                if (temp < 0xffffff) {
                    temp *= index == 1 ? Math.pow(2, 24) : index == 2 ? Math.pow(2, 16) : Math.pow(2, 8);
                    temp += source.charCodeAt(index++);
                }
                value = temp;
            }
            else if (typeof (source) == "number") {
                value = source;
            }
            else {
                value = source.toInt();
            }
            if (value < 0 || value > 0xffffffff) {
                throw new AssError("reg32", "copy", "输入数据超过限制");
            }
            else {
                this.l.copy(value % 0x10000);
                this.h.copy(Math.floor(value / Math.pow(2, 16)));
            }
            return this;
        };
        /**
         * 克隆
         * 克隆会复制对象的状态
         */
        reg32.prototype.clone = function () {
            var ret = new reg32();
            ret.copy(this);
            ret._isIndex = this.IsIndex;
            ret._isSegment = this.IsSegment;
            return ret;
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
            _memory = new Uint8ClampedArray(line * 16);
        }
        Object.defineProperty(Ass.prototype, "memory", {
            //private _cs = new reg16();
            //private _ip = new reg16();
            /**内存空间*/
            get: function () {
                return _memory;
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
        Object.defineProperty(Ass.prototype, "ah", {
            //特殊变量
            get: function () {
                return this._ax.h;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "al", {
            get: function () {
                return this._ax.l;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "bh", {
            get: function () {
                return this._bx.h;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "bl", {
            get: function () {
                return this._bx.l;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "ch", {
            get: function () {
                return this._cx.h;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "cl", {
            get: function () {
                return this._cx.l;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "dh", {
            get: function () {
                return this._dx.h;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "dl", {
            get: function () {
                return this._dx.l;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "ExportList", {
            /**外抛列表*/
            get: function () {
                return _exportList;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Ass.prototype, "IsExport", {
            /**是否外抛*/
            get: function () {
                return _isExport;
            },
            enumerable: false,
            configurable: true
        });
        /**对象外抛 */
        Ass.prototype.export = function () {
            var _this = this;
            if (_isExport) {
                throw new AssError("Ass", "export", "对象已经全部外抛");
            }
            else {
                this.ExportList.forEach(function (e) {
                    window[e] = _this[e];
                });
                _isExport = true;
            }
        };
        /**关闭外抛 */
        Ass.prototype.close = function () {
            if (_isExport) {
                this.ExportList.forEach(function (e) {
                    window[e] = null;
                });
                _isExport = false;
            }
            else {
                throw new AssError("Ass", "close", "对象已经没有外抛");
            }
        };
        /**
         * 读取内存输入检测
         * @param a
         * @param b
         */
        Ass.prototype.getMemoryCheck = function (a, b) {
            if (a.IsREG16 || a.IsREG8) {
                a = a.toInt();
            }
            if (typeof (a) == "number") {
                if (b.IsREG16 || b.IsREG8) {
                    b = b.toInt();
                }
                if (typeof (b) == "number") {
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
            var ret = new reg8(this.memory[a * 16 + b]);
            return ret;
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
            return ret;
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
                throw new AssError("ass", "getDword", "获取地址超出内存上下文");
            }
            var ret = new reg32();
            ret.l.l = new reg8(this.memory[a * 16 + b]);
            ret.l.h = new reg8(this.memory[a * 16 + b + 1]);
            ret.h.l = new reg8(this.memory[a * 16 + b + 2]);
            ret.h.h = new reg8(this.memory[a * 16 + b + 3]);
            return ret;
        };
        /**
         * 移动
         * @param a
         * @param b
         * @param c
         */
        Ass.prototype.mov = function (a, b, c, ptr) {
            if (c === void 0) { c = this.ds; }
            if (a.length == 1) {
                if (typeof (a[0]) == "number" || a[0].IsIndex) {
                    if (c.IsSegment) {
                        if (typeof (b) == "number") {
                            try {
                                if (b < 0) {
                                    throw new AssError("Ass", "mov", "参数b不接受负数");
                                }
                                else if (ptr == void 0) {
                                    throw new AssError("Ass", "mov", "参数ptr没有输入指针类型");
                                }
                                else if (ptr == "byte") {
                                    if (b < 256) {
                                        this.memory[c.toInt() * 16 + a[0]] = b;
                                    }
                                    else {
                                        throw new AssError("Ass", "mov", "参数b超过指针指定的数据上限");
                                    }
                                }
                                else if (ptr == "word") {
                                    if (b < 65536) {
                                        b = new reg16(b);
                                        this.memory[c.toInt() * 16 + a[0]] = b.l.toInt();
                                        this.memory[c.toInt() * 16 + a[0] + 1] = b.h.toInt();
                                    }
                                    else {
                                        throw new AssError("Ass", "mov", "参数b超过指针指定的数据上限");
                                    }
                                }
                                else if (ptr == "dword") {
                                    if (b < 4294967296) {
                                        b = new reg32(b);
                                        this.memory[c.toInt() * 16 + a[0]] = b.l.l.toInt();
                                        this.memory[c.toInt() * 16 + a[0] + 1] = b.l.h.toInt();
                                        this.memory[c.toInt() * 16 + a[0] + 2] = b.h.l.toInt();
                                        this.memory[c.toInt() * 16 + a[0] + 3] = b.h.h.toInt();
                                    }
                                    else {
                                        throw new AssError("Ass", "mov", "参数b超过指针指定的数据上限");
                                    }
                                }
                            }
                            catch (e) {
                                if (/[\u4e00-\u9f5a]/.test(e.message)) {
                                    throw e;
                                }
                                else {
                                    throw new AssError("Ass", "mov", "内存超出上下文\n+错误内容:" + e);
                                }
                            }
                        }
                        else if ("IsREG" in b) {
                            try {
                                if ("IsREG8" in b) {
                                    this.memory[c.toInt() * 16 + a[0]] = b.toInt();
                                }
                                else if ("IsREG16" in b) {
                                    this.memory[c.toInt() * 16 + a[0]] = b.l.toInt();
                                    this.memory[c.toInt() * 16 + a[0] + 1] = b.h.toInt();
                                }
                                else if ("IsREG32" in b) {
                                    this.memory[c.toInt() * 16 + a[0]] = b.l.l.toInt();
                                    this.memory[c.toInt() * 16 + a[0] + 1] = b.l.h.toInt();
                                    this.memory[c.toInt() * 16 + a[0] + 2] = b.h.l.toInt();
                                    this.memory[c.toInt() * 16 + a[0] + 3] = b.h.h.toInt();
                                }
                                else {
                                    throw new AssError("Ass", "mov", "参数b输入数据类型错误!");
                                }
                            }
                            catch (e) {
                                throw new AssError("Ass", "mov", "内存超出上下文\n+错误内容:" + e);
                            }
                        }
                        else {
                            if (b.length == 1) {
                                if (typeof (b[0]) == "number") {
                                    try {
                                        if (ptr == "byte") {
                                            this.memory[c.toInt() * 16 + a[0]] = this.memory[c.toInt() * 16 + b[0]];
                                        }
                                        else if (ptr == "word") {
                                            this.memory[c.toInt() * 16 + a[0]] = this.memory[c.toInt() * 16 + b[0]];
                                            this.memory[c.toInt() * 16 + a[0] + 1] = this.memory[c.toInt() * 16 + b[0] + 1];
                                        }
                                        else if (ptr == "dword") {
                                            this.memory[c.toInt() * 16 + a[0]] = this.memory[c.toInt() * 16 + b[0]];
                                            this.memory[c.toInt() * 16 + a[0] + 1] = this.memory[c.toInt() * 16 + b[0] + 1];
                                            this.memory[c.toInt() * 16 + a[0] + 2] = this.memory[c.toInt() * 16 + b[0] + 2];
                                            this.memory[c.toInt() * 16 + a[0] + 3] = this.memory[c.toInt() * 16 + b[0] + 3];
                                        }
                                        else {
                                            throw new AssError("Ass", "mov", "参数ptr指针类型错误!");
                                        }
                                    }
                                    catch (e) {
                                        if (/[\u4e00-\u9f5a]/.test(e.message)) {
                                            throw e;
                                        }
                                        else {
                                            throw new AssError("Ass", "mov", "内存超出上下文\n+错误内容:" + e);
                                        }
                                    }
                                }
                                else if (b[0].IsIndex) {
                                    b[0] = b[0].toInt();
                                    try {
                                        if (ptr == "byte") {
                                            this.memory[c.toInt() * 16 + a[0]] = this.memory[c.toInt() * 16 + b[0]];
                                        }
                                        else if (ptr == "word") {
                                            this.memory[c.toInt() * 16 + a[0]] = this.memory[c.toInt() * 16 + b[0]];
                                            this.memory[c.toInt() * 16 + a[0] + 1] = this.memory[c.toInt() * 16 + b[0] + 1];
                                        }
                                        else if (ptr == "dword") {
                                            this.memory[c.toInt() * 16 + a[0]] = this.memory[c.toInt() * 16 + b[0]];
                                            this.memory[c.toInt() * 16 + a[0] + 1] = this.memory[c.toInt() * 16 + b[0] + 1];
                                            this.memory[c.toInt() * 16 + a[0] + 2] = this.memory[c.toInt() * 16 + b[0] + 2];
                                            this.memory[c.toInt() * 16 + a[0] + 3] = this.memory[c.toInt() * 16 + b[0] + 3];
                                        }
                                        else {
                                            throw new AssError("Ass", "mov", "参数ptr指针类型错误!");
                                        }
                                    }
                                    catch (e) {
                                        if (/[\u4e00-\u9f5a]/.test(e.message)) {
                                            throw e;
                                        }
                                        else {
                                            throw new AssError("Ass", "mov", "内存超出上下文\n+错误内容:" + e);
                                        }
                                    }
                                }
                                else {
                                    throw new AssError("Ass", "mov", "非指针对象不可出现在[]内!\n或参数b数据错误");
                                }
                            }
                            else {
                                throw new AssError("Ass", "mov", "参数b输入类型错误!");
                            }
                        }
                    }
                    else {
                        throw new AssError("Ass", "mov", "参数c不是段寄存器!");
                    }
                }
                else {
                    throw new AssError("Ass", "mov", "非指针对象不可出现在[]内!\n或参数a数据错误");
                }
            }
            else {
                if ("IsREG" in a) {
                    if ("IsREG16" in a) {
                        if (typeof (b) == "number") {
                            a.mov(b);
                        }
                        else if ("IsREG" in b) {
                            if ("IsREG16" in b) {
                                a.mov(b);
                            }
                            else {
                                throw new AssError("Ass", "mov", "参数b必须和a为同一种寄存器!");
                            }
                        }
                        else {
                            a.mov(b, c);
                        }
                    }
                    else if ("IsREG8" in a) {
                        if (typeof (b) == "number") {
                            a.mov(b);
                        }
                        else if ("IsREG" in b) {
                            if ("IsREG8" in b) {
                                a.mov(b);
                            }
                            else {
                                throw new AssError("Ass", "mov", "参数b必须和a为同一种寄存器!");
                            }
                        }
                        else {
                            a.mov(b, c);
                        }
                    }
                    else {
                        throw new AssError("Ass", "mov", "变量a输入类型错误!");
                    }
                }
            }
        };
        /**
         * 添加
         * @param a
         * @param b
         * @param c
         * @param ptr
         */
        Ass.prototype.add = function (a, b, c, ptr) {
            if (c === void 0) { c = this.ds; }
            if ("IsREG" in a) {
                if (typeof (b) == "number" || "IsREG" in b) {
                    addNumber(a, b.valueOf());
                }
                else if (b.length == 1) {
                    if (typeof (b[0]) == "number") {
                    }
                    else {
                        if (!b[0].IsIndex) {
                            throw new AssError("Ass", "add", "非指针对象不可出现在[]内!");
                        }
                    }
                    switch (ptr) {
                        case "byte":
                            addNumber(a, Ass.prototype.getByte(c, b[0]).toInt());
                            break;
                        case "word":
                            addNumber(a, Ass.prototype.getWord(c, b[0]).toInt());
                            break;
                        case "dword":
                            addNumber(a, Ass.prototype.getWord(c, b[0]).toInt());
                            break;
                        default:
                            throw new AssError("Ass", "add", "参数b输入类型错误!");
                    }
                }
                else {
                    throw new AssError("Ass", "add", "参数b输入类型错误!");
                }
            }
            else if (a.length == 1) {
                if (typeof (b) == "number" || "IsREG" in b) {
                    addMemoryNumber(a, b.valueOf(), c, ptr);
                }
                else if (b.length == 1) {
                    if (typeof (b[0]) == "number") {
                    }
                    else {
                        if (!b[0].IsIndex) {
                            throw new AssError("Ass", "add", "非指针对象不可出现在[]内!");
                        }
                    }
                    switch (ptr) {
                        case "byte":
                            addMemoryNumber(a, Ass.prototype.getByte(c, b[0]).toInt(), c, ptr);
                            break;
                        case "word":
                            addMemoryNumber(a, Ass.prototype.getWord(c, b[0]).toInt(), c, ptr);
                            break;
                        case "dword":
                            addMemoryNumber(a, Ass.prototype.getWord(c, b[0]).toInt(), c, ptr);
                            break;
                        default:
                            throw new AssError("Ass", "add", "参数b输入类型错误!");
                    }
                }
                else {
                    throw new AssError("Ass", "add", "参数b输入类型错误!");
                }
            }
            else {
                throw new AssError("Ass", "add", "参数a输入类型错误!");
            }
        };
        /**
         * 减少
         * @param a
         * @param b
         * @param c
         * @param ptr
         */
        Ass.prototype.sub = function (a, b, c, ptr) {
            if (c === void 0) { c = this.ds; }
            if ("IsREG" in a) {
                if (typeof (b) == "number" || "IsREG" in b) {
                    subNumber(a, b.valueOf());
                }
                else if (b.length == 1) {
                    if (typeof (b[0]) == "number") {
                    }
                    else {
                        if (!b[0].IsIndex) {
                            throw new AssError("Ass", "sub", "非指针对象不可出现在[]内!");
                        }
                    }
                    switch (ptr) {
                        case "byte":
                            subNumber(a, Ass.prototype.getByte(c, b[0]).toInt());
                            break;
                        case "word":
                            subNumber(a, Ass.prototype.getWord(c, b[0]).toInt());
                            break;
                        case "dword":
                            subNumber(a, Ass.prototype.getWord(c, b[0]).toInt());
                            break;
                        default:
                            throw new AssError("Ass", "sub", "参数b输入类型错误!");
                    }
                }
                else {
                    throw new AssError("Ass", "sub", "参数b输入类型错误!");
                }
            }
            else if (a.length == 1) {
                if (typeof (b) == "number" || "IsREG" in b) {
                    subMemoryNumber(a, b.valueOf(), c, ptr);
                }
                else if (b.length == 1) {
                    if (typeof (b[0]) == "number") {
                    }
                    else {
                        if (!b[0].IsIndex) {
                            throw new AssError("Ass", "sub", "非指针对象不可出现在[]内!");
                        }
                    }
                    switch (ptr) {
                        case "byte":
                            subMemoryNumber(a, Ass.prototype.getByte(c, b[0]).toInt(), c, ptr);
                            break;
                        case "word":
                            subMemoryNumber(a, Ass.prototype.getWord(c, b[0]).toInt(), c, ptr);
                            break;
                        case "dword":
                            subMemoryNumber(a, Ass.prototype.getWord(c, b[0]).toInt(), c, ptr);
                            break;
                        default:
                            throw new AssError("Ass", "sub", "参数b输入类型错误!");
                    }
                }
                else {
                    throw new AssError("Ass", "sub", "参数b输入类型错误!");
                }
            }
            else {
                throw new AssError("Ass", "sub", "参数a输入类型错误!");
            }
        };
        return Ass;
    }());
    Ass_1.Ass = Ass;
})(Ass || (Ass = {}));
