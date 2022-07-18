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
            get: function () {
                return true;
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
         */
        function reg16(value) {
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
        Object.defineProperty(reg16.prototype, "IsREG16", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        /**转为整形 */
        reg16.prototype.toInt = function () {
            var ret = this.l.toInt();
            ret += (this.h.toInt() << 7);
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
        return reg16;
    }());
    Ass_1.reg16 = reg16;
    /**模块 */
    var Ass = /** @class */ (function () {
        function Ass() {
            this._ax = new reg16();
            this._bx = new reg16();
            this._cx = new reg16();
            this._dx = new reg16();
        }
        return Ass;
    }());
    Ass_1.Ass = Ass;
})(Ass || (Ass = {}));
