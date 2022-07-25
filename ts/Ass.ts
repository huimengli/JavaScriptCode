/// <reference path="../lt_code.js" />

/**汇编模块 */
namespace Ass {

	/**汇编错误 */
	class AssError extends Error {
		constructor(typeName?:string)
		constructor(typeName?: string, funName?:string)
		constructor(typeName?: string, funName?:string,value?:string)

		/**
		 * 构造函数
		 * @param value 错误内容
		 * @param typeName 错误类
		 * @param funName 错误函数
		 */
		constructor(typeName?: string, funName?: string,value?: string) {
			var message = "汇编模块错误\n";
			if (typeName != void 0) {
				message += "错误类: "+typeName+"\n";
			}
			if (funName!=void 0) {
				message += "错误函数: " + funName + "\n";
			}
			message += "错误内容: " + (value?value:"无");
			super(message);
		}
	}

	/**字节 */
	export class byte {
		private _v0: boolean;
		private _v1: boolean;
		private _v2: boolean;
		private _v3: boolean;
		private _v4: boolean;
		private _v5: boolean;
		private _v6: boolean;
		private _v7: boolean;

		public set v0(value) {
			this._v0 = value;
		}
		public get v0() {
			return this._v0;
		}
		public set v1(value) {
			this._v1 = value;
		}
		public get v1() {
			return this._v1;
		}
		public set v2(value) {
			this._v2 = value;
		}
		public get v2() {
			return this._v2;
		}
		public set v3(value) {
			this._v3 = value;
		}
		public get v3() {
			return this._v3;
		}
		public set v4(value) {
			this._v4 = value;
		}
		public get v4() {
			return this._v4;
		}
		public set v5(value) {
			this._v5 = value;
		}
		public get v5() {
			return this._v5;
		}
		public set v6(value) {
			this._v6 = value;
		}
		public get v6() {
			return this._v6;
		}
		public set v7(value) {
			this._v7 = value;
		}
		public get v7() {
			return this._v7;
		}

		public get MAX() {
			return 255;
		}

		public get MIN() {
			return 0;
		}

		constructor()
		constructor(num:number)
		constructor(str:string)

		constructor(value?: number | string) {
			if (value == void 0) {
				value = 0;
			} else if (typeof(value)=="string") {
				value = value.charCodeAt(0);
			} else if (typeof (value) == "number") {
				
			} else {
				throw new AssError("byte", "constructor", "输入内容类型错误");
			}

			if (value < 0 || value > 255) {
				throw new AssError("byte", "constructor", "输入数据超过限制");
			} else {
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

		/**转为整形 */
		toInt() {
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

		/**转为二进制 */
		toBinary() {
			var ret = this.v0 ? "1" : "0";
			ret += this.v1 ? "1" : "0";
			ret += this.v2 ? "1" : "0";
			ret += this.v3 ? "1" : "0";
			ret += this.v4 ? "1" : "0";
			ret += this.v5 ? "1" : "0";
			ret += this.v6 ? "1" : "0";
			ret += this.v7 ? "1" : "0";
			return ret;
		}

		/**
		 * 转为字符串
		 * @param {null|number} type 转换方式
		 */
		toString(type) {
			if (type == null) {
				return this.toInt().toString();
			} else if (typeof (type) == "number") {
				if (type == 2) {
					return this.toBinary();
				} else if (type == 16) {
					return lt_code.from10To16(this.toInt());
				} else {
					return this.toInt().toString(type);
				}
			} else {
				throw new AssError("byte", "toString", "没有这种模式!");
			}
		}

		/**获取长度(防止报错) */
		length() {
			return 0;
		}

		/**重载valueOf实现重载加减 */
		valueOf() {
			return this.toInt();
        }
	}

	/**8位寄存器 */
	export class reg8 extends byte {
		/**是否是8位寄存器 */
		public get IsREG8() {
			return true;
		}
		/**是否是16位寄存器 */
		public get IsREG16() {
			return false;
		}

		/**
		 * 转为中文
		 * 实际上从reg16开始才能正真存储中文
		 * 所以reg8实际上是存储英文字符用的
		 */
		toChinese() {
			return String.fromCharCode(this.toInt());
		}
	}

	/**16位寄存器 */
	export class reg16 {
		/**低位 */
		private _l: reg8;
		/**高位 */
		private _h: reg8;

		public get l() {
			return this._l;
		}
		/**低位 */
		public set l(value) {
			if (typeof(value)=="number"||typeof(value)=="string") {
				this._l = new reg8(value);
			} else if(value.IsREG8){
				this._l = value;
			} else {
				throw new AssError("reg16", "set", "低位赋值内容错误");
			}
		}
		public get h() {
			return this._h;
		}
		/**高位 */
		public set h(value) {
			if (typeof(value)=="number"||typeof(value)=="string") {
				this._h = new reg8(value);
			} else if(value.IsREG8) {
				this._h = value;
			} else {
				throw new AssError("reg16", "set", "高位赋值内容错误");
			}
		}
		/**是否是8位寄存器 */
		public get IsREG8() {
			return false;
		}
		/**是否是16位寄存器 */
		public get IsREG16() {
			return true;
		}

		/**是否是段寄存器 */
		protected _isSegment: boolean;

		/**是否是指针 */
		protected _isIndex: boolean;

		/**是否是段寄存器 */
		public get IsSegment() {
			return this._isSegment;
		}

		/**是否是指针 */
		public get IsIndex() {
			return this._isIndex;
        }

		constructor() 
		constructor(value:number) 
		constructor(value: string)
		constructor(value: string|number,isSegment?:boolean)
		constructor(value: string|number,isSegment?:boolean,isIndex?:boolean)

		/**
		 * 构造函数
		 * @param value
		 * @param isSegment 是否是段寄存器
		 */
		constructor(value?: number | string, isSegment=false,isIndex=false) {
			if (value == void 0) {
				value = 0;
			} else if (typeof(value)=="string") {
				var temp = value.charCodeAt(0);
				if (temp <= 255) {
					temp += value.charCodeAt(1) << 8;
				}
				value = temp;
			} else if (typeof (value) == "number") {

			} else {
				throw new AssError("reg16", "constructor", "输入内容类型错误");
			}

			if (value < 0 || value > 65535) {
				throw new AssError("reg16", "constructor", "输入数据超过限制");
			} else {
				this.l = new reg8(value % (2 << 7));
				this.h = new reg8(value >> 8);
			}
		}

		/**转为整形 */
		toInt() {
			var ret = this.l.toInt();
			ret += (this.h.toInt() << 8);
			return ret;
		}

		/**转为二进制 */
		toBinary() {
			return this.h.toBinary() + this.l.toBinary();
		}

		/**
		 * 转为字符串
		 * @param {null|number} type 转换方式
		 */
		toString(type) {
			if (type == null) {
				return this.toInt().toString();
			} else if (typeof (type) == "number") {
				if (type == 2) {
					return this.toBinary();
				} else if (type == 16) {
					return lt_code.from10To16(this.toInt());
				} else {
					return this.toInt().toString(type);
				}
			} else {
				throw new AssError("reg16", "toString", "没有这种模式!");
			}
		}

		/**获取长度 */
		length() {
			return 0;
		}

		/**重载valueOf实现重载加减 */
		valueOf() {
			return this.toInt();
		}

		/**
		 * 转为中文
		 */
		toChinese() {
			return String.fromCharCode(this.toInt());
		}
	}

	/**32位寄存器 */
	export class reg32 {
		/**低位 */
		private _l: reg16;
		/**高位 */
		private _h: reg16;

		public get l() {
			return this._l;
		}
		/**低位 */
		public set l(value) {
			if (typeof(value)=="number"||typeof(value)=="string") {
				this._l = new reg16(value);
			} else if(value.IsREG16){
				this._l = value;
			} else {
				throw new AssError("reg32", "set", "低位赋值内容错误");
			}
		}
		public get h() {
			return this._h;
		}
		/**高位 */
		public set h(value) {
			if (typeof(value)=="number"||typeof(value)=="string") {
				this._h = new reg16(value);
			} else if(value.IsREG16) {
				this._h = value;
			} else {
				throw new AssError("reg32", "set", "高位赋值内容错误");
			}
		}
		/**是否是8位寄存器 */
		public get IsREG8() {
			return false;
		}
		/**是否是16位寄存器 */
		public get IsREG16() {
			return false;
		}
		/**是否是16位寄存器 */
		public get IsREG32() {
			return true;
		}

		/**是否是段寄存器 */
		protected _isSegment: boolean;

		/**是否是指针 */
		protected _isIndex: boolean;

		/**是否是段寄存器 */
		public get IsSegment() {
			return this._isSegment;
		}

		/**是否是指针 */
		public get IsIndex() {
			return this._isIndex;
        }

		constructor() 
		constructor(value:number) 
		constructor(value: string)
		constructor(value: string|number,isSegment?:boolean)
		constructor(value: string|number,isSegment?:boolean,isIndex?:boolean)

		/**
		 * 构造函数
		 * @param value
		 * @param isSegment 是否是段寄存器
		 */
		constructor(value?: number | string, isSegment=false,isIndex=false) {
			if (value == void 0) {
				value = 0;
			} else if (typeof(value)=="string") {
				var temp = value.charCodeAt(0);
				if (temp <= 65535) {
					temp += value.charCodeAt(1) << 16;
				}
				value = temp;
			} else if (typeof (value) == "number") {

			} else {
				throw new AssError("reg32", "constructor", "输入内容类型错误");
			}

			if (value < 0 || value > Math.pow(256,4)-1) {
				throw new AssError("reg32", "constructor", "输入数据超过限制");
			} else {
				this.l = new reg16(value % (2 << 15));
				this.h = new reg16(value >> 16);
			}
		}

		/**转为整形 */
		toInt() {
			var ret = this.l.toInt();
			ret += (this.h.toInt() << 16);
			return ret;
		}

		/**转为二进制 */
		toBinary() {
			return this.h.toBinary() + this.l.toBinary();
		}

		/**
		 * 转为字符串
		 * @param {null|number} type 转换方式
		 */
		toString(type) {
			if (type == null) {
				return this.toInt().toString();
			} else if (typeof (type) == "number") {
				if (type == 2) {
					return this.toBinary();
				} else if (type == 16) {
					return lt_code.from10To16(this.toInt());
				} else {
					return this.toInt().toString(type);
				}
			} else {
				throw new AssError("reg32", "toString", "没有这种模式!");
			}
		}

		/**获取长度 */
		length() {
			return 0;
		}

		/**重载valueOf实现重载加减 */
		valueOf() {
			return this.toInt();
		}

		/**
		 * 转为中文
		 */
		toChinese() {
			var ret = String.fromCharCode(this.h.toInt());
			ret += String.fromCharCode(this.l.toInt());
			return ret;
		}
	}

	/**模块 */
	export class Ass {
		private _ax = new reg16();
		private _bx = new reg16(null, false, true);
		private _cx = new reg16();
		private _dx = new reg16();

		private _sp = new reg16();
		private _bp = new reg16(null, false, true);
		private _si = new reg16(null, false, true);
		private _di = new reg16(null, false, true);

		private _ds = new reg16(null, true);
		private _es = new reg16(null, true);
		private _ss = new reg16(null, true);
		//private _cs = new reg16();
		//private _ip = new reg16();

		/**内存空间 */
		private _memory: Uint8ClampedArray;

		/**内存空间*/
		public get memory() {
			return this._memory;
        }

		//可变量
		public get ax() {
			return this._ax;
		}
		public get bx() {
			return this._bx;
		}
		public get cx() {
			return this._cx;
		}
		public get dx() {
			return this._dx;
		}

		public get sp() {
			return this._sp;
		}
		public get bp() {
			return this._bp;
		}
		public get si() {
			return this._si;
		}
		public get di() {
			return this._di;
		}

		public get ds() {
			return this._ds;
		}
		public get es() {
			return this._es;
		}
		public get ss() {
			return this._ss;
		}

		/**
		 * 创建的内存空间大小
		 * @param line 内存行数默认64
		 */
		constructor(line=64) {
			/**内存*/
			this._memory = new Uint8ClampedArray(line * 16);
		}

		/**
		 * 读取内存输入检测
		 * @param a
		 * @param b
		 */
		getMemoryCheck(a, b) {
			if (a.IsREG16 || a.IsREG8) {
				a = a.toInt()
			} else if (typeof (a) == "number") {
				if (b.IsREG16 || b.IsREG8) {
					b = b.toInt()
				} else if (typeof (b) == "number") {
					if (a * 16 + b > this.memory.length || a * 16 + b < 0) {
						throw new AssError("ass","getMemoryCheck","获取地址超出内存上下文")
                    } else {
						return { a: a, b: b };
                    }
				} else {
					throw new AssError("ass", "getMemoryCheck", "参数b输入类型错误!");
				}
			} else {
				throw new AssError("ass", "getMemoryCheck", "参数a输入类型错误!");
			}
        }

		getByte(a: number, b: number);
		getByte(a: reg16, b: number);
		getByte(a: number, b: reg16);
		getByte(a: reg16, b: reg16);

		/**
		 * 获取字节
		 * @param a 段寄存器
		 * @param b 寄存器
		 */
		getByte(a: any, b: any) {
			var check = this.getMemoryCheck(a, b);
			a = check.a;
			b = check.b;

			return this.memory[a * 16 + b];
		}

		/**
		 * 获取字节
		 * @param a 段寄存器
		 * @param b 寄存器
		 */
		getWord(a: number|reg16|reg8, b: number|reg16|reg8) {
			var check = this.getMemoryCheck(a, b);
			a = check.a;
			b = check.b;
            if (a*16+b+1>this.memory.length) {
				throw new AssError("ass", "getWord", "获取地址超出内存上下文");
			}
			var ret = new reg16();
			ret.l = new reg8(this.memory[a * 16 + b]);
			ret.h = new reg8(this.memory[a * 16 + b + 1]);
			return ret.toInt();
		}

		/**
		 * 获取长字节
		 * @param a
		 * @param b
		 */
		getDword(a: number | reg16 | reg8, b: number | reg16 | reg8) {
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
			return ret.toInt();
		}

		mov(a: reg16, b: number): void;
		mov(a: reg16, b: reg16): void;
		mov(a: reg8, b: number): void;
		mov(a: reg8, b: reg8): void;
		mov(a: [reg16], b: reg8,c:reg16): void;
		mov(a: [reg16], b: reg16,c:reg16): void;
		mov(a: [reg16], b: [reg16],c:reg16): void;
		mov(a: [reg16], b: number,c:reg16,d:"byte"|"word"|"dword"): void;

		/**
		 * 移动
		 * @param a
		 * @param b
		 * @param c
		 */
		mov(a:any, b:any,c=this.ds,d?:"byte"|"word"|"dword") {
            if (a.length) {
                if (a[0]) {

                }
			} else {
                if (a.IsREG16) {

                } else if (a.IsREG8) {

                } else {
					throw new AssError("Ass", "mov", "变量a输入类型错误!");
                }
            }
        }
	}
	
}