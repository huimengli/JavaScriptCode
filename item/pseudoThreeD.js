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
    ISINIT:false,

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
            if (x==null) {
                Tx = 0, Ty = 0, Tz = 0, TeulerAngleX = 0, TeulerAngleY = 0, TeulerAngleZ = 0, TscaleX = 0, TscaleY = 0, TscaleZ = 0;
            } else if (typeof(x)=="number") {
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
                Tobjct:this,
                parent:null,
                position: new lt_code.pseudoThreeD.vector3(Tx, Ty, Tz),
                eulerAngle: new lt_code.pseudoThreeD.vector3(TeulerAngleX, TeulerAngleY, TeulerAngleZ),
                scale: new lt_code.pseudoThreeD.vector3(TscaleX, TscaleY, TscaleZ),
                child:[],
            };
            this.activity = true;
            /**定位点 */
            this.points = [];
            /**物体的唯一识别ID */
            this.UUID = lt_code.pseudoThreeD.newUUID();
            //将物体添加的到根目录中
            lt_code.pseudoThreeD.objects.push(this);
        }

        /**
         * 设置位置
         * @param {number|lt_code.pseudoThreeD.vector3} x
         * @param {number} y
         * @param {number} z
         */
        setPosition(x, y, z) {
            var Tx, Ty, Tz;
            if (typeof(x)=="number") {
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
            this.points.forEach(function (e) {
                e.transform(pos);
            })
        }

        /**
         * 设置欧拉角
         * @param {number|lt_code.pseudoThreeD.vector3} ex
         * @param {number} ey
         * @param {number} ez
         */
        setEulerAngle(ex,ey, ez) {
            var TeulerAngleX, TeulerAngleY, TeulerAngleZ;
            if (typeof(ex)=="number") {
                TeulerAngleX = ex;
                TeulerAngleY = ey;
                TeulerAngleZ = ez;
            } else {
                TeulerAngleX = ex.x;
                TeulerAngleY = ex.y;
                TeulerAngleZ = ex.z;
            }
            this.transform.eulerAngle = new lt_code.pseudoThreeD.vector3(TeulerAngleX, TeulerAngleY, TeulerAngleZ);
        }

        /**
         * 设置缩放比
         * @param {number|lt_code.pseudoThreeD.vector3} sx
         * @param {number} sy
         * @param {number} sz
         */
        setScale(sx, sy, sz) {
            var TscaleX, TscaleY, TscaleZ;
            if (typeof(sx)=="number") {
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

    //以下为衍生类

    /**立方体类 */
    cubeTobject : class {
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

            l = l == null && l <= 0.00001 ? 0.00001 : l;
            w = w == null ? l : w;
            h = h == null ? l : h;

            ret.points.push(new lt_code.pseudoThreeD.vector3(l / 2, w / 2, -h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(l / 2, -w / 2, -h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(-l / 2, -w / 2, -h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(-l / 2, w / 2, -h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(l / 2, w / 2, h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(l / 2, -w / 2, h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(-l / 2, -w / 2, h / 2));
            ret.points.push(new lt_code.pseudoThreeD.vector3(-l / 2, w / 2, h / 2));

            //继承(但不继承函数)
            this.Tobject = ret;
            this.UUID = ret.UUID;
            this.activity = ret.activity;
            this.transform = ret.transform;
        }

        /**
         * 绘制图形...
         * (算法错误,只是暂时使用和演示,应根据线面方式绘制三维图像)
         * (算法尚未修改)
         * @param {number} w 线条宽度
         * @param {color} c 线条颜色
         */
        drawObject(w,c) {
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
            var drawLine = function (x, y,w,c) {
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
        this.objects = [];
        /**模块是否已经初始化 */
        this.ISINIT = true;
    },

    /**
     * 获取精度
     * @param {number} num
     */
    getAccuracy: function (num) {
        var exp = "1";
        for (var i = 0; i < this.ACCURACY; i++) {
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
        var dex;
        var uuid = 'uuxxxuuy-1xxx-7xxx-yxxx-xxx0xxxy'.replace(/[uxy]/g, function (e, i) {
            return e == "u" ? function () {
                var ret = sha[i];
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
        x = x ? y:0;
        y = y ? y : 0;
        w = w ? w : lt_code.pseudoThreeD.cas.width;
        h = h ? h : lt_code.pseudoThreeD.cas.height;
        lt_code.pseudoThreeD.ctx.clearRect(x, y, w, h);
    }
};

//以下是追加类

///**
// * 新建立方体
// * @param {number} l 长
// * @param {number} w 宽
// * @param {number} h 高
// * @param {number|lt_code.pseudoThreeD.vector3} x
// * @param {number|lt_code.pseudoThreeD.vector3} y
// * @param {number|lt_code.pseudoThreeD.vector3} z
// * @param {number} ex 欧拉角
// * @param {number} ey 欧拉角
// * @param {number} ez 欧拉角
// * @param {number} sx 缩放比
// * @param {number} sy 缩放比
// * @param {number} sz 缩放比
// */
//lt_code.pseudoThreeD.cubeTobject = function (l,w,h,x, y, z, ex, ey, ez, sx, sy, sz) {
//    var ret = new lt_code.pseudoThreeD.Tobject(x, y, z, ex, ey, ez, sx, sy, sz);

//    l = l == null && l <= 0.00001 ? 0.00001 : l;
//    w = w == null ? l : w;
//    h = h == null ? l : h;

//    ret.points.push(new lt_code.pseudoThreeD.vector3(l / 2, w / 2, -h / 2));
//    ret.points.push(new lt_code.pseudoThreeD.vector3(l / 2, -w / 2, -h / 2));
//    ret.points.push(new lt_code.pseudoThreeD.vector3(-l / 2, -w / 2, -h / 2));
//    ret.points.push(new lt_code.pseudoThreeD.vector3(-l / 2, w / 2, -h / 2));
//    ret.points.push(new lt_code.pseudoThreeD.vector3(l / 2, w / 2, h / 2));
//    ret.points.push(new lt_code.pseudoThreeD.vector3(l / 2, -w / 2, h / 2));
//    ret.points.push(new lt_code.pseudoThreeD.vector3(-l / 2, -w / 2, h / 2));
//    ret.points.push(new lt_code.pseudoThreeD.vector3(-l / 2, w / 2, h / 2));

//    return ret;
//}
