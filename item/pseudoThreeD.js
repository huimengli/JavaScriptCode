/**伪3D模块 */
lt_code.pseudoThreeD = {

    //以下为伪3D模块需要的部件

    /**算法信息 */
    message: function () {
        var message = `
算法核心很简单
由于景深和观测点的缘故,因此三维物体在被观测时候,是可以显示为二维画面的
只需要根据z值改变对象在xy轴的偏移量,即可在视觉上显示为三维画面.
由于实现正中为最终偏移点,因此所有的物体都应该想着屏幕最中点进行偏移
(基于地平线原理)

//如何调用该算法:
window.onload = function(){
	lt_code.init("PTD");
    lt_code.variable.addRun(setInterval(function () {
        if (lt_code.pseudoThreeD) {
            lt_code.variable.delRun("PTD初始化");
            lt_code.pseudoThreeD.init();
        }
    }, 20), "PTD初始化");
};
`;
        console.log(message);
    },

    /**
     * casvas画布
     * @return {HTMLCanvasElement}
     */
    cas: lt_code.newDom("canvas", {
        width: lt_code.variable.width,
        height: lt_code.variable.height,
        class: "pseudoThreeD",
        id: "pseudoThreeD",
    }),

    /**
     * ctx画布
     */
    ctx: lt_code.getCtx(lt_code.newDom("canvas")),

    //以下为固定参数

    /**
     * 景深
     * 此景深非彼景深
     * 这个参数表示场景显示最大深度
     */
    DOF: 0,

    /**
     * 坐标轴位置(默认为正中间)
     */
    AXISPOS: 8,

    /**
     * 场景数据最大值
     */
    MAXVALUE: 3000,

    /**精度*/
    ACCURACY: 5,

    /**是否初始化*/
    ISINIT: false,

    /**固定参数 */
    DEFAULT: {
        WIDTH: {
            POINT: 0.3,
            LINE: 0.3,
        },
        COLOR: {
            POINT: "red",
            LINE: "black",
            SURFACE: "#999",
        }
    },

    //以下为枚举类

    /**坐标轴位置*/
    axisPos: {
        /**坐标左上角*/
        leftTop: 0,
        /**坐标上中间*/
        top: 1,
        /**坐标右上角*/
        rightTop: 2,
        /**坐标右中间*/
        rigth: 3,
        /**坐标右下角*/
        rightBottom: 4,
        /**坐标下中间*/
        bottom: 5,
        /**坐标左下角*/
        leftBottom: 6,
        /**坐标左中间*/
        left: 7,
        /**坐标正中间*/
        center: 8,
    },

    //以下为模块类

    /**伪3D对象 */
    Tobject: class {
        /**
         * 构造函数
         * @param {number|lt_code.pseudoThreeD.vector3} x 
         * @param {number|lt_code.pseudoThreeD.vector3} y
         * @param {number|lt_code.pseudoThreeD.vector3} z
         * @param {number} ex 欧拉角
         * @param {number} ey 欧拉角
         * @param {number} ez 欧拉角
         * @param {number} sx 缩放比
         * @param {number} sy 缩放比
         * @param {number} sz 缩放比
         */
        constructor(x, y, z, ex, ey, ez, sx, sy, sz) {
            var Tx, Ty, Tz, TeulerAngleX, TeulerAngleY, TeulerAngleZ, TscaleX, TscaleY, TscaleZ;
            if (x == null) {
                Tx = 0, Ty = 0, Tz = 0, TeulerAngleX = 0, TeulerAngleY = 0, TeulerAngleZ = 0, TscaleX = 1, TscaleY = 1, TscaleZ = 1;
            } else if (typeof (x) == "number") {
                Tx = x;
                Ty = y;
                Tz = z;
                TeulerAngleX = ex;
                TeulerAngleY = ey;
                TeulerAngleZ = ez;
                TscaleX = sx;
                TscaleY = sy;
                TscaleZ = sz;
            } else {
                Tx = x.x;
                Ty = x.y;
                Tz = x.z;
                TeulerAngleX = y.x;
                TeulerAngleY = y.y;
                TeulerAngleZ = y.z;
                TscaleX = z.x;
                TscaleY = z.y;
                TscaleZ = z.z;
            }
            this.Tobject = this;
            this.transform = {
                Tobjct: this,
                parent: null,
                position: new lt_code.pseudoThreeD.vector3(Tx, Ty, Tz),
                eulerAngle: new lt_code.pseudoThreeD.vector3(TeulerAngleX, TeulerAngleY, TeulerAngleZ),
                scale: new lt_code.pseudoThreeD.vector3(TscaleX, TscaleY, TscaleZ),
                child: [],
            };
            this.activity = true;
            /**定位点 */
            this.points = [];
            /**所有线 */
            this.lines = [];
            /**所有面 */
            this.surface = [];
            /**物体的唯一识别ID */
            this.UUID = lt_code.pseudoThreeD.newUUID();
            /**物体对象 */
            this.type = "Tobject";
            /**物体的根 */
            this.base = null;
            //将物体添加的到根目录中
            //lt_code.pseudoThreeD.objects.push(this);
            lt_code.pseudoThreeD.objects[this.UUID] = this;
        }

        /**
         * 设置位置
         * @param {number|lt_code.pseudoThreeD.vector3} x
         * @param {number} y
         * @param {number} z
         */
        setPosition(x, y, z) {
            var Tx, Ty, Tz;
            if (typeof (x) == "number") {
                Tx = x;
                Ty = y;
                Tz = z;
            } else {
                Tx = x.x;
                Ty = x.y;
                Tz = x.z;
            }
            var pos = new lt_code.pseudoThreeD.vector3(Tx, Ty, Tz);
            this.transform.position = pos;
            //移动点
            this.points.forEach(function (e) {
                e.transform(pos);
            });
            //移动线
            this.lines.forEach(function (e) {
                e.setPosition(x, y, z);
            });
            //移动面
            this.surface.forEach(function (e) {
                e.setPosition(x, y, z);
            });
        }

        /**
         * 设置欧拉角
         * @param {number|lt_code.pseudoThreeD.vector3} ex
         * @param {number} ey
         * @param {number} ez
         */
        setEulerAngle(ex, ey, ez) {
            var TeulerAngleX, TeulerAngleY, TeulerAngleZ;
            if (typeof (ex) == "number") {
                TeulerAngleX = ex;
                TeulerAngleY = ey;
                TeulerAngleZ = ez;
            } else {
                TeulerAngleX = ex.x;
                TeulerAngleY = ex.y;
                TeulerAngleZ = ex.z;
            }
            this.transform.eulerAngle = new lt_code.pseudoThreeD.vector3(TeulerAngleX, TeulerAngleY, TeulerAngleZ);
            this.lines.forEach(function (e) {
                e.setEulerAngle(this.transform.eulerAngle);
            }.bind(this));
            this.surface.forEach(function (e) {
                e.setEulerAngle(this.transform.eulerAngle);
            }.bind(this));
        }

        /**
         * 设置缩放比
         * @param {number|lt_code.pseudoThreeD.vector3} sx
         * @param {number} sy
         * @param {number} sz
         */
        setScale(sx, sy, sz) {
            var TscaleX, TscaleY, TscaleZ;
            if (typeof (sx) == "number") {
                TscaleX = sx;
                TscaleY = sy;
                TscaleZ = sz;
            } else {
                TscaleX = sx.x;
                TscaleY = sx.y;
                TscaleZ = sx.z;
            }
            this.transform.scale = new lt_code.pseudoThreeD.vector3(TscaleX, TscaleY, TscaleZ);
        }

        /**
         * 设置父类
         * @param {any} Tobj
         */
        setParent(Tobj) {

        }

        /**绘制物体 */
        drawObject() {

        }
    },

    /**三维向量 */
    vector3: class {
        /**
         * 构建
         * @param {number} x
         * @param {number} y
         * @param {number} [z]
         */
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z ? z : 0;
        }

        //以下是特殊参数

        /**坐标中心点 */
        static None() {
            return new lt_code.pseudoThreeD.vector3(0, 0, 0);
        }

        /**坐标最大值(超过即不计算也不显示) */
        static Infinity() {
            var max = lt_code.pseudoThreeD.MAXVALUE;
            return new lt_code.pseudoThreeD.vector3(max, max, max);
        }

        /**z轴轴向 */
        static forward() {
            return new lt_code.pseudoThreeD.vector3(0, 0, 1);
        }

        /**z轴反轴向 */
        static back() {
            return new lt_code.pseudoThreeD.vector3(0, 0, -1);
        }

        /**x轴轴向 */
        static right() {
            return new lt_code.pseudoThreeD.vector3(1, 0, 0);
        }

        /**x轴反轴向 */
        static left() {
            return new lt_code.pseudoThreeD.vector3(-1, 0, 0);
        }

        /**y轴轴向 */
        static down() {
            return new lt_code.pseudoThreeD.vector3(0, 1, 0);
        }

        /**y轴反轴向 */
        static up() {
            return new lt_code.pseudoThreeD.vector3(0, -1, 0);
        }

        /**全单位量 */
        static One() {
            return new lt_code.pseudoThreeD.vector3(1, 1, 1);
        }

        
        //以下是坐标计算函数

        /**
         * 获取两个坐标的中间值
         * @param {lt_code.pseudoThreeD.vector3} v1
         * @param {lt_code.pseudoThreeD.vector3} v2
         */
        static getCenter(v1, v2) {
            var center = lt_code.pseudoThreeD.vector3.None();
            center.x = (v1.x + v2.x) / 2;
            center.y = (v1.y + v2.y) / 2;
            center.z = (v1.z + v2.z) / 2;
            return center;
        }

        /**场景最大宽度 */
        MaxWidth() { return lt_code.pseudoThreeD.cas.width };
        /**场景最大高度 */
        MaxHeight() { return lt_code.pseudoThreeD.cas.height };

        //以下是功能性函数

        /**
         * 坐标变换
         * @param {number|lt_code.pseudoThreeD.vector3} x
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
         * @param {number|lt_code.pseudoThreeD.vector3} x
         * @param {number} y
         * @param {number} z
         */
        rotate(c, x, y, z) {
            var rotate = lt_code.pseudoThreeD.vector3.None();
            var ret = new lt_code.pseudoThreeD.vector3(this.x, this.y, this.z);
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
            l1 = lt_code.pseudoThreeD.getAccuracy(Math.sqrt(ret.x * ret.x + ret.y * ret.y));
            //先转z轴
            ret.x = l1 * Math.sin(rotate.z / 360 * Math.PI * 2);
            ret.y = l1 * Math.cos(rotate.z / 360 * Math.PI * 2);
            //console.log(ret);
            l2 = lt_code.pseudoThreeD.getAccuracy(Math.sqrt(ret.z * ret.z + ret.y * ret.y));
            //再转x轴
            ret.y = l2 * Math.sin(rotate.x / 360 * Math.PI * 2);
            ret.z = l2 * Math.cos(rotate.x / 360 * Math.PI * 2);
            //console.log(ret);
            l3 = lt_code.pseudoThreeD.getAccuracy(Math.sqrt(ret.x * ret.x + ret.z * ret.z));
            //最后转y轴
            ret.z = l3 * Math.sin(rotate.y / 360 * Math.PI * 2);
            ret.x = l3 * Math.cos(rotate.y / 360 * Math.PI * 2);
            console.log(ret);
            return ret;
        }

        /**
         * 获取坐标差值
         * @param {lt_code.variable.vector3} another 另一个坐标
         */
        getDifference(another) {
            var ret = lt_code.variable.vector3.None();
            ret.x = this.x - another.x;
            ret.y = this.y - another.y;
            ret.z = this.z - another.z;
            return ret;
        }

        /**
         * 获取坐标角度
         * (尚未写完...)
         * @param {any} center
         */
        get3DAngle(center) {

        }

        /**
         * 获取两个向量之间的夹角
         * @param {lt_code.pseudoThreeD.vector3} v1
         * @param {lt_code.pseudoThreeD.vector3} v2
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
            var nul = lt_code.pseudoThreeD.vector3.None();
            if (v1==nul||v2==nul) {
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
                return lt_code.pseudoThreeD.getAccuracy(inv,2);
            }
        }

        /**获取向量的绝对值 */
        getAbs() {
            return new lt_code.pseudoThreeD(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
        }

        /**获取向量的长度 */
        getLength() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }

        /**
         * 转换成二维向量
         * 伪3D模块最重要的一个函数
         * 基于景深和坐标中心值计算出偏移位置
         */
        toVector2() {
            /**坐标轴中心位置 */
            var aPos = lt_code.pseudoThreeD.AXISPOS;
            //如果超过景深直接显示超过上限
            if (this.z > lt_code.pseudoThreeD.MAXVALUE) {
                return lt_code.pseudoThreeD.vector2.Infinity();
            }

            /**屏幕中心点 */
            var center;
            /**景深 */
            var dof = lt_code.pseudoThreeD.DOF;

            switch (aPos) {
                case lt_code.pseudoThreeD.axisPos.leftTop:
                    center = new lt_code.pseudoThreeD.vector2(this.MaxWidth() / 2, -this.MaxHeight() / 2);
                    break;
                case lt_code.pseudoThreeD.axisPos.top:
                    center = new lt_code.pseudoThreeD.vector2(0, -this.MaxHeight() / 2);
                    break;
                case lt_code.pseudoThreeD.axisPos.rightTop:
                    center = new lt_code.pseudoThreeD.vector2(-this.MaxWidth() / 2, -this.MaxHeight() / 2);
                    break;
                case lt_code.pseudoThreeD.axisPos.rigth:
                    center = new lt_code.pseudoThreeD.vector2(-this.MaxWidth() / 2, 0);
                    break;
                case lt_code.pseudoThreeD.axisPos.rightBottom:
                    center = new lt_code.pseudoThreeD.vector2(-this.MaxWidth() / 2, this.MaxHeight() / 2);
                    break;
                case lt_code.pseudoThreeD.axisPos.bottom:
                    center = new lt_code.pseudoThreeD.vector2(0, -this.MaxHeight() / 2);
                    break;
                case lt_code.pseudoThreeD.axisPos.leftBottom:
                    center = new lt_code.pseudoThreeD.vector2(this.MaxWidth() / 2, this.MaxHeight() / 2);
                    break;
                case lt_code.pseudoThreeD.axisPos.left:
                    center = new lt_code.pseudoThreeD.vector2(this.MaxWidth() / 2, 0);
                    break;
                case lt_code.pseudoThreeD.axisPos.center:
                    center = new lt_code.pseudoThreeD.vector2.None();
                    break;
                default:
                    console.trace("模块中没有这个参数\n或者尚未写完!");
            }
            if (this.z) {
                /**深度百分比 */
                var deep = this.z / dof;
                /**初始x */
                var startX = (1 - deep) * (this.x);
                /**初始y */
                var startY = (1 - deep) * (this.y);
                /**横向偏移 */
                var width = center.x + startX;
                /**纵向偏移 */
                var height = center.y + startY;
                return new lt_code.pseudoThreeD.vector2(width, height);
            } else {
                return new lt_code.pseudoThreeD.vector2(center.x + this.x, center.y + this.y);
            }
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
    },

    /**二维向量*/
    vector2: class {
        /**
         * 构造
         * @param {number} x
         * @param {number} y
         */
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        //以下是特殊坐标点

        /**坐标中心点 */
        static None() {
            return new lt_code.pseudoThreeD.vector2(0, 0);
        }

        /**坐标最大值(超过即既不计算也不显示) */
        static Infinity() {
            var max = lt_code.pseudoThreeD.MAXVALUE;
            return new lt_code.pseudoThreeD.vector2(max, max);
        }

        /**x轴轴向 */
        static right() {
            return new lt_code.pseudoThreeD.vector2(1, 0);
        }

        /**x轴反轴向 */
        static left() {
            return new lt_code.pseudoThreeD.vector2(-1, 0);
        }

        /**y轴轴向 */
        static down() {
            return new lt_code.pseudoThreeD.vector2(0, 1);
        }

        /**y轴反轴向 */
        static up() {
            return new lt_code.pseudoThreeD.vector2(0, -1);
        }

        /**全单位量 */
        static One() {
            return new lt_code.pseudoThreeD.vector2(1, 1);
        }

        //以下是坐标计算函数

        /**
         * 获取两个坐标的中间值
         * @param {lt_code.pseudoThreeD.vector2} v1
         * @param {lt_code.pseudoThreeD.vector2} v2
         */
        static getCenter(v1, v2) {
            var center = lt_code.pseudoThreeD.vector2.None();
            center.x = (v1.x + v2.x) / 2;
            center.y = (v1.y + v2.y) / 2;
            return center;
        }

        /**场景最大宽度 */
        MaxWidth() { return lt_code.pseudoThreeD.cas.width };
        /**场景最大高度 */
        MaxHeight() { return lt_code.pseudoThreeD.cas.height };

        //以下为功能函数
        /**
         * 坐标变换
         * @param {number|lt_code.pseudoThreeD.vector2} x
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
            var ret = new lt_code.pseudoThreeD.vector2(this.x, this.y);
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
    },

    /*
     * 还需要创建
     * 1.线条类
     * 2.面类
     * 面类分为两种,分别是三角面和多点面
     * 但是由于所有的多角面都可以用多个三角面显示
     * 但是记录所有数据等等,因此需要一个更加优秀的UUID生成模块
     * (前提是现在的UUID生成模块有问题)
     */

    /**
     * 线条类
     * (线条类可以做的比较简单,但是之后可能需要修改)
     */
    Tline: class {
        /**
         * 构造函数
         * @param {uuid} n 父类UUID
         * @param {number} w 线条宽度
         * @param {color} c 线条颜色
         * @param {number|lt_code.pseudoThreeD.vector3} x0
         * @param {number|lt_code.pseudoThreeD.vector3} y0
         * @param {number} z0
         * @param {number} x1
         * @param {number} y1
         * @param {number} z1
         */
        constructor(n, w, c, x0, y0, z0, x1, y1, z1) {
            /**父类UUID */
            this.n = n;
            this.w = w;
            this.c = c;
            this.points = [];
            this.eulerAngle = lt_code.pseudoThreeD.vector3.None();
            this.scale = new lt_code.pseudoThreeD.vector3(1, 1, 1);
            var p1, p2;
            if (typeof (x0) == "number") {
                p1 = new lt_code.pseudoThreeD.vector3(x0, y0, z0);
                p2 = new lt_code.pseudoThreeD.vector3(x1, y1, z1);
            } else {
                p1 = new lt_code.pseudoThreeD.vector3(x0.x, x0.y, x0.z);
                p2 = new lt_code.pseudoThreeD.vector3(y0.x, y0.y, y0.z);
            }
            this.points.push(p1, p2);
            this.UUID = lt_code.pseudoThreeD.newUUID(this.toString());
            //记录
            lt_code.pseudoThreeD.lines[this.UUID] = this;
        }

        /**
         * 设置颜色
         * @param {color} c
         */
        setColor(c) {
            this.c = c;
        }

        /**
         * 设置宽度
         * @param {number} w 
         */
        setWidth(w) {
            this.w = w;
        }

        /**获取中点 */
        getCenter() {
            return lt_code.pseudoThreeD.vector3.getCenter(this.points[0], this.points[1]);
        }

        /**
         * 设置位置
         * @param {number|lt_code.pseudoThreeD.vector3} x
         * @param {number} y
         * @param {number} z
         */
        setPosition(x, y, z) {
            var Tx, Ty, Tz;
            if (typeof (x) == "number") {
                Tx = x;
                Ty = y;
                Tz = z;
            } else {
                Tx = x.x;
                Ty = x.y;
                Tz = x.z;
            }
            var pos = new lt_code.pseudoThreeD.vector3(Tx, Ty, Tz);
            this.points.forEach(function (e) {
                e.transform(pos);
            });
        }

        /**
         * 设置欧拉角
         * @param {number|lt_code.pseudoThreeD.vector3} ex
         * @param {number} ey
         * @param {number} ez
         */
        setEulerAngle(ex, ey, ez) {
            var TeulerAngleX, TeulerAngleY, TeulerAngleZ;
            if (typeof (ex) == "number") {
                TeulerAngleX = ex;
                TeulerAngleY = ey;
                TeulerAngleZ = ez;
            } else {
                TeulerAngleX = ex.x;
                TeulerAngleY = ex.y;
                TeulerAngleZ = ex.z;
            }
            this.eulerAngle = new lt_code.pseudoThreeD.vector3(TeulerAngleX, TeulerAngleY, TeulerAngleZ);
        }


        /**
         * 绘制线条
         * @param w 线条宽度
         * @param c 线条颜色
         */
        drawObject(w, c) {
            /**获取画布 */
            var ctx = lt_code.pseudoThreeD.ctx;

            //开始绘制
            ctx.beginPath();
            var p1 = this.points[0].rotate(null, this.eulerAngle).toVector2();
            var p2 = this.points[1].rotate(null, this.eulerAngle).toVector2();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = c ? c : this.c;
            ctx.lineWidth = w ? w : this.w;
            ctx.stroke();
            ctx.closePath();
        }

        /**重载转为字符串 */
        toString() {
            var ret = {
                "n": this.n,
                "c": this.c,
                "w": this.w,
                "points": [this.points[0].toString(), this.points[1].toString()],
            };
            return JSON.stringify(ret);
        }
    },

    /**
     * 面类
     */
    Tsurface: class {
        /**
         * 构造函数
         * @param {any} c
         * @param {uuid} n 父类UUID
         * @param {...any} arg
         */
        constructor(n, c, ...arg) {
            this.n = n;
            this.c = c;
            this.points = [];
            this.eulerAngle = lt_code.pseudoThreeD.vector3.None();
            this.scale = new lt_code.pseudoThreeD.vector3(1, 1, 1);
            if (arg.length % 3 == 0 && typeof (arg[0]) == "number") {
                for (var i = 0; i < arg.length; i++) {
                    var p = new lt_code.pseudoThreeD.vector3(arg[i], arg[++i], arg[++i]);
                    console.log(p);
                    this.points.push(p);
                }
            } else {
                for (var i = 0; i < arg.length; i++) {
                    var p = new lt_code.pseudoThreeD.vector3(arg[i].x, arg[i].y, arg[i].z);
                    this.points.push(p);
                }
            }
            this.UUID = lt_code.pseudoThreeD.newUUID(this.toString());
            //记录
            lt_code.pseudoThreeD.surface[this.UUID] = this;
        }

        /**
         * 设置颜色
         * @param {color} c
         */
        setColor(c) {
            this.c = c;
        }

        /**
         * 设置位置
         * @param {number|lt_code.pseudoThreeD.vector3} x
         * @param {number} y
         * @param {number} z
         */
        setPosition(x, y, z) {
            var Tx, Ty, Tz;
            if (typeof (x) == "number") {
                Tx = x;
                Ty = y;
                Tz = z;
            } else {
                Tx = x.x;
                Ty = x.y;
                Tz = x.z;
            }
            var pos = new lt_code.pseudoThreeD.vector3(Tx, Ty, Tz);
            this.points.forEach(function (e) {
                e.transform(pos);
            });
        }

        /**
         * 设置欧拉角
         * @param {number|lt_code.pseudoThreeD.vector3} ex
         * @param {number} ey
         * @param {number} ez
         */
        setEulerAngle(ex, ey, ez) {
            var TeulerAngleX, TeulerAngleY, TeulerAngleZ;
            if (typeof (ex) == "number") {
                TeulerAngleX = ex;
                TeulerAngleY = ey;
                TeulerAngleZ = ez;
            } else {
                TeulerAngleX = ex.x;
                TeulerAngleY = ex.y;
                TeulerAngleZ = ex.z;
            }
            this.eulerAngle = new lt_code.pseudoThreeD.vector3(TeulerAngleX, TeulerAngleY, TeulerAngleZ);
        }


        /**绘制 */
        drawObject(c) {
            /**画布 */
            var ctx = lt_code.pseudoThreeD.ctx;

            //开始绘制
            ctx.beginPath();
            var start = this.points[0].rotate(null, this.eulerAngle).toVector2();
            ctx.moveTo(start.x, start.y);
            for (var i = 1; i < this.points.length; i++) {
                var p = this.points[i].rotate(null, this.eulerAngle).toVector2();
                ctx.lineTo(p.x, p.y);
            }
            ctx.closePath();
            ctx.fillStyle = c ? c : this.c;
            ctx.fill();
        }

        /**重载为字符串 */
        toString() {
            var ret = {
                "n": this.n,
                "c": this.c,
                "points": [],
            };
            for (var i = 0; i < this.points.length; i++) {
                ret["points"].push(this.points[i].toString());
            }
            return JSON.stringify(ret);
        }
    },

    //以下为衍生类

    /**立方体类 */
    cubeTobject: class {
        /**
         * 新建立方体
         * @param {number} l 长
         * @param {number} w 宽
         * @param {number} h 高
         * @param {number|lt_code.pseudoThreeD.vector3} x
         * @param {number|lt_code.pseudoThreeD.vector3} y
         * @param {number|lt_code.pseudoThreeD.vector3} z
         * @param {number} ex 欧拉角
         * @param {number} ey 欧拉角
         * @param {number} ez 欧拉角
         * @param {number} sx 缩放比
         * @param {number} sy 缩放比
         * @param {number} sz 缩放比
         */
        constructor(l, w, h, x, y, z, ex, ey, ez, sx, sy, sz) {
            var ret = new lt_code.pseudoThreeD.Tobject(x, y, z, ex, ey, ez, sx, sy, sz);

            //设置状态
            ret.type = "cubeTobject";
            ret.base = this;

            l = l == null && l <= 0.00001 ? 0.00001 : l;
            w = w == null ? l : w;
            h = h == null ? l : h;

            //设置点
            ret.points.push(new lt_code.pseudoThreeD.vector3(l / 2, w / 2, -h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(l / 2, -w / 2, -h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(-l / 2, -w / 2, -h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(-l / 2, w / 2, -h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(l / 2, w / 2, h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(l / 2, -w / 2, h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(-l / 2, -w / 2, h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(-l / 2, w / 2, h / 2));

            //设置线
            ret.lines.push(new lt_code.pseudoThreeD.Tline(ret.UUID, lt_code.pseudoThreeD.DEFAULT.WIDTH.LINE, lt_code.pseudoThreeD.DEFAULT.COLOR.LINE, ret.points[0], ret.points[1]));
            ret.lines.push(new lt_code.pseudoThreeD.Tline(ret.UUID, lt_code.pseudoThreeD.DEFAULT.WIDTH.LINE, lt_code.pseudoThreeD.DEFAULT.COLOR.LINE, ret.points[2], ret.points[1]));
            ret.lines.push(new lt_code.pseudoThreeD.Tline(ret.UUID, lt_code.pseudoThreeD.DEFAULT.WIDTH.LINE, lt_code.pseudoThreeD.DEFAULT.COLOR.LINE, ret.points[2], ret.points[3]));
            ret.lines.push(new lt_code.pseudoThreeD.Tline(ret.UUID, lt_code.pseudoThreeD.DEFAULT.WIDTH.LINE, lt_code.pseudoThreeD.DEFAULT.COLOR.LINE, ret.points[3], ret.points[0]));
            ret.lines.push(new lt_code.pseudoThreeD.Tline(ret.UUID, lt_code.pseudoThreeD.DEFAULT.WIDTH.LINE, lt_code.pseudoThreeD.DEFAULT.COLOR.LINE, ret.points[0], ret.points[4]));
            ret.lines.push(new lt_code.pseudoThreeD.Tline(ret.UUID, lt_code.pseudoThreeD.DEFAULT.WIDTH.LINE, lt_code.pseudoThreeD.DEFAULT.COLOR.LINE, ret.points[5], ret.points[1]));
            ret.lines.push(new lt_code.pseudoThreeD.Tline(ret.UUID, lt_code.pseudoThreeD.DEFAULT.WIDTH.LINE, lt_code.pseudoThreeD.DEFAULT.COLOR.LINE, ret.points[2], ret.points[6]));
            ret.lines.push(new lt_code.pseudoThreeD.Tline(ret.UUID, lt_code.pseudoThreeD.DEFAULT.WIDTH.LINE, lt_code.pseudoThreeD.DEFAULT.COLOR.LINE, ret.points[3], ret.points[7]));
            ret.lines.push(new lt_code.pseudoThreeD.Tline(ret.UUID, lt_code.pseudoThreeD.DEFAULT.WIDTH.LINE, lt_code.pseudoThreeD.DEFAULT.COLOR.LINE, ret.points[4], ret.points[5]));
            ret.lines.push(new lt_code.pseudoThreeD.Tline(ret.UUID, lt_code.pseudoThreeD.DEFAULT.WIDTH.LINE, lt_code.pseudoThreeD.DEFAULT.COLOR.LINE, ret.points[5], ret.points[6]));
            ret.lines.push(new lt_code.pseudoThreeD.Tline(ret.UUID, lt_code.pseudoThreeD.DEFAULT.WIDTH.LINE, lt_code.pseudoThreeD.DEFAULT.COLOR.LINE, ret.points[6], ret.points[7]));
            ret.lines.push(new lt_code.pseudoThreeD.Tline(ret.UUID, lt_code.pseudoThreeD.DEFAULT.WIDTH.LINE, lt_code.pseudoThreeD.DEFAULT.COLOR.LINE, ret.points[7], ret.points[4]));

            //设置面
            ret.surface.push(new lt_code.pseudoThreeD.Tsurface(ret.UUID, lt_code.pseudoThreeD.DEFAULT.COLOR.SURFACE, ret.points[0], ret.points[1], ret.points[2], ret.points[3]));
            ret.surface.push(new lt_code.pseudoThreeD.Tsurface(ret.UUID, lt_code.pseudoThreeD.DEFAULT.COLOR.SURFACE, ret.points[0], ret.points[1], ret.points[5], ret.points[4]));
            ret.surface.push(new lt_code.pseudoThreeD.Tsurface(ret.UUID, lt_code.pseudoThreeD.DEFAULT.COLOR.SURFACE, ret.points[1], ret.points[2], ret.points[6], ret.points[5]));
            ret.surface.push(new lt_code.pseudoThreeD.Tsurface(ret.UUID, lt_code.pseudoThreeD.DEFAULT.COLOR.SURFACE, ret.points[2], ret.points[3], ret.points[7], ret.points[6]));
            ret.surface.push(new lt_code.pseudoThreeD.Tsurface(ret.UUID, lt_code.pseudoThreeD.DEFAULT.COLOR.SURFACE, ret.points[3], ret.points[0], ret.points[4], ret.points[7]));
            ret.surface.push(new lt_code.pseudoThreeD.Tsurface(ret.UUID, lt_code.pseudoThreeD.DEFAULT.COLOR.SURFACE, ret.points[4], ret.points[5], ret.points[6], ret.points[7]));

            //继承(但不继承函数)
            this.Tobject = ret;
            this.UUID = ret.UUID;
            this.activity = ret.activity;
            this.transform = ret.transform;
        }

        /**
         * 绘制图形...
         * (算法错误,只是暂时使用和演示,应根据线面方式绘制三维图像)
         * (算法正在修改)
         * @param {number} w 线条宽度
         * @param {color} c 线条颜色
         */
        drawObject(w, c) {
            /**获取画布 */
            var ctx = lt_code.pseudoThreeD.ctx;

            for (var i = 0; i < this.Tobject.surface.length; i++) {
                this.Tobject.surface[i].drawObject(c);
            }

            for (var i = 0; i < this.Tobject.lines.length; i++) {
                this.Tobject.lines[i].drawObject(w, c);
            }
        }

        /**
         * 老的错误的绘制图像方案
         * (测试用)
         * @param {any} w
         * @param {any} c
         */
        drawObject2(w, c) {
            /**获取所有点 */
            var points = this.Tobject.points;
            /**获取画布 */
            var ctx = lt_code.pseudoThreeD.ctx;

            /**
             * 绘制线条
             * @param {any} x
             * @param {any} y
             * @param {any} w
             * @param {any} c
             */
            var drawLine = function (x, y, w, c) {
                console.log(x.toString(), y.toString());
                ctx.beginPath();

                ctx.moveTo(x.x, x.y);
                ctx.lineTo(y.x, y.y);

                ctx.lineWidth = w;
                ctx.strokeStyle = c;

                ctx.stroke();

                ctx.closePath();
            }

            for (var i = 0; i < points.length; i++) {
                for (var j = i; j < points.length; j++) {
                    drawLine(points[i].toVector2(), points[j].toVector2(), w, c);
                }
            }
        }
    },

    //以下为模块函数

    /**
     * 初始化
     * @param {number} [w] 场景宽度
     * @param {number} [h] 场景高度
     * @param {number} [df] 场景父类
     * @param {number} [dof] 景深
     */
    init: function (w, h, df, dof) {
        //重新定义画布宽高
        this.cas.width = w ? w : lt_code.variable.width;
        this.cas.height = h ? h : lt_code.variable.height;
        /**重新定向ctx画布*/
        this.ctx = lt_code.getCtx(this.cas);
        /**场景父类*/
        this.domFather = df ? df : document.body;
        /**设定景深*/
        this.DOF = dof ? dof : 900;
        /**设定坐标轴位置*/
        this.AXISPOS = this.axisPos.leftBottom;
        lt_code.addChild(this.cas, this.domFather);
        /**整个模块所有的对象*/
        this.objects = {};
        /**整个模块所有的线 */
        this.lines = {};
        /**整个模块所有的面 */
        this.surface = {};
        /**模块是否已经初始化 */
        this.ISINIT = true;
    },

    /**
     * 获取精度
     * @param {number} num
     * @param {number} [ACC] 精度
     */
    getAccuracy: function (num, ACC) {
        ACC = ACC!=null ? ACC : this.ACCURACY;
        var exp = "1";
        for (var i = 0; i < ACC; i++) {
            exp += "0";
        }
        exp = lt_code.getNum(exp);
        num = num * exp;
        num = Math.floor(num);
        return num / exp;
    },

    /**
     * 获取UUID
     * @param {string} input
     */
    newUUID: function (input) {
        var time = new Date().getTime();
        input = input ? input : time.toString();
        input = lt_code.md5(input);
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
                return lt_code.md5(dex)[i];
            }();
        });
        return uuid;
    },

    /**
     * 清除屏幕
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    clear: function (x, y, w, h) {
        x = x ? y : 0;
        y = y ? y : 0;
        w = w ? w : lt_code.pseudoThreeD.cas.width;
        h = h ? h : lt_code.pseudoThreeD.cas.height;
        lt_code.pseudoThreeD.ctx.clearRect(x, y, w, h);
    },

    /**
     * 绘制点
     * @param {number} r 点绘制半径
     * @param {color} c 点颜色
     * @param {number|lt_code.pseudoThreeD.vector3} x 
     * @param {number} y
     * @param {number} z
     */
    drawPoint: function (r, c, x, y, z) {
        var p;
        if (typeof (x) == "number") {
            p = new lt_code.pseudoThreeD.vector3(x, y, z);
        } else {
            p = new lt_code.pseudoThreeD.vector3(x.x, x.y, x.z);
        }
        p = p.toVector2();
        this.ctx.beginPath();
        lt_code.pseudoThreeD.ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        this.ctx.fillStyle = c;
        this.ctx.fill();
    },

    /**
     * 绘制线条
     * @param {any} x
     * @param {any} y
     * @param {any} w 线条宽度
     * @param {any} c 线条颜色
     */
    drawLine: function (w, c, x, y, x1, y1) {
        lt_code.pseudoThreeD.ctx.beginPath();

        if (typeof (x) != "number") {
            lt_code.pseudoThreeD.ctx.moveTo(x.x, x.y);
            lt_code.pseudoThreeD.ctx.lineTo(y.x, y.y);
        } else {
            lt_code.pseudoThreeD.ctx.moveTo(x, y);
            lt_code.pseudoThreeD.ctx.lineTo(x1, y1);
        }

        lt_code.pseudoThreeD.ctx.lineWidth = w;
        lt_code.pseudoThreeD.ctx.strokeStyle = c;

        lt_code.pseudoThreeD.ctx.stroke();

        lt_code.pseudoThreeD.ctx.closePath();
    },

};

//以下是追加类
