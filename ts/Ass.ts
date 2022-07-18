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
	}

	/**8位寄存器 */
	export class reg8 extends byte {
		public get IsREG8() {
			return true;
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

		public get IsREG16() {
			return true;
		}

		constructor() 
		constructor(value:number) 
		constructor(value: string)

		/**
		 * 构造函数
		 * @param value
		 */
		constructor(value?: number | string) {
			if (value == void 0) {
				value = 0;
			} else if (typeof(value)=="string") {
				var temp = value.charCodeAt(0);
				if (temp <= 255) {
					temp += value.charCodeAt(1) << 8;
				}
				value = temp;
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
			ret += (this.h.toInt() << 7);
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


	}

	/**模块 */
	export class Ass {
		private _ax = new reg16();
		private _bx = new reg16();
		private _cx = new reg16();
		private _dx = new reg16();

		private _sp = new reg16();
		private _bp = new reg16();
		private _si = new reg16();
		private _di = new reg16();

		private _ds = new reg16();
		private _es = new reg16();
		private _ss = new reg16();
		//private _cs = new reg16();
		//private _ip = new reg16();

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
		 * 移动
		 * @param a
		 * @param b
		 * @param c
		 */
		mov(a:reg16|reg8|[reg16]|[number], b:reg16|reg8|[reg16]|[number],c=this.ds) {

        }
	}
	
}