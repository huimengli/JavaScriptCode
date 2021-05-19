lt_code.pseudoThreeD = {

    //以下为伪3D模块需要的部件

    /**
     * casvas画布
     * @return {HTMLCanvasElement}
     */
    cas: lt_code.newDom("canvas", {
        width: lt_code.variable.width,
        height: lt_code.variable.height,
        class: "pseudoThreeD",
        id:"pseudoThreeD",
    }),

    /**
     * ctx画布
     */
    ctx: lt_code.getCtx(lt_code.newDom("canvas")),

    //以下为固定参数

    /**
     * 景深
     * 此景深非彼景深
     * 这个参数表示场景最大深度
     */
    DOF: 0,

    /**
     * 坐标轴位置(默认为正中间)
     */
    AXISPOS: 8,

    /**
     * 场景数据最大值
     */
    MAXVALUE:30000,

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
        center:8,
    },

    //以下为模块类

    /**伪3D对象 */
    Tobject: class {
        /**
         * 构造函数
         * @param {number} x 
         * @param {number} y
         * @param {number} z
         * @param {number} ex 欧拉角
         * @param {number} ey 欧拉角
         * @param {number} ez 欧拉角
         * @param {number} sx 缩放比
         * @param {number} sy 缩放比
         * @param {number} sz 缩放比
         */
        constructor(x, y, z, ex, ey, ez, sx, sy, sz) {
            this.x = x?x:0;
            this.y = y?y:0;
            this.z = z?z:0;
            this.eulerAngleX = ex?ex:0;
            this.eulerAngleY = ey?ey:0;
            this.eulerAngleZ = ez?ez:0;
            this.scaleX = sx?sx:0;
            this.scaleY = sy?sy:0;
            this.scaleZ = sz?sz:0;
        }

        /**对象初始化 */
        init() {
            lt_code.pseudoThreeD.objects.push(this);
        }

        /**对象绘制 */
        draw() { }


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
            this.z = z?z:0;
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
            if (typeof(x)=="number") {
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
            /**景深 */
            var dof = lt_code.pseudoThreeD.DOF;
            /**坐标轴中心位置 */
            var aPos = lt_code.pseudoThreeD.AXISPOS;
            //如果超过景深直接显示超过上限
            if (this.z > lt_code.pseudoThreeD.MAXVALUE) {
                return lt_code.pseudoThreeD.vector2.Infinity();
            } else if (this.z ==0) {
                return new lt_code.pseudoThreeD.vector2(this.x, this.y);
            }

            /**深度百分比 */
            var deep = this.z;
            /**x轴是否负计算 */
            var XisF = false;
            /**y轴是否负计算 */
            var YisF = false;

            switch (aPos) {
                case lt_code.pseudoThreeD.axisPos.leftTop:
                    deep = this.z / dof;
                    XisF = false;
                    YisF = false;
                    break;
                case lt_code.pseudoThreeD.axisPos.top:
                    deep = this.z / this.MaxHeight();
                    XisF = this.x<this.MaxWidth()/2?true:false;
                    YisF = false;
                    break;
                case lt_code.pseudoThreeD.axisPos.rightTop:
                    deep = this.z / dof;
                    XisF = true;
                    YisF = false;
                    break;
                case lt_code.pseudoThreeD.axisPos.rigth:
                    deep = this.z / this.MaxWidth();
                    YisF = this.y < this.MaxHeight() / 2 ? true : false;
                    XisF = true;
                    break;
                case lt_code.pseudoThreeD.axisPos.rightBottom:
                    deep = this.z / dof;
                    XisF = true;
                    YisF = true;
                    break;
                case lt_code.pseudoThreeD.axisPos.bottom:
                    deep = this.z / this.MaxHeight();
                    XisF = this.z < this.MaxWidth() / 2 ? true: false;
                    YisF = true;
                    break;
                case lt_code.pseudoThreeD.axisPos.leftBottom:
                    deep = this.z / dof;
                    XisF = false;
                    YisF = true;
                    break;
                case lt_code.pseudoThreeD.axisPos.left:
                    deep = this.z / this.MaxWidth();
                    XisF = false;
                    YisF = this.y < this.MaxHeight() / 2 ? true : false;
                    break;
                case lt_code.pseudoThreeD.axisPos.center:
                    deep = this.z / (dof / 2);
                    XisF = this.x < this.MaxWidth() / 2 ? true : false;
                    YisF = this.y < this.MaxHeight() / 2 ? true : false;
                    break;
                default:
                    console.trace("模块中没有这个参数\n或者尚未写完!");
                    break;
            }
            /**初始x */
            var startX = deep * this.MaxWidth();
            /**初始y */
            var startY = deep * this.MaxHeight();
            /**横向偏移 */
            var width = XisF==false?(1 - deep) * this.x / this.MaxWidth():(deep-1)*this.x/this.MaxWidth();
            /**纵向偏移 */
            var height = YisF==false?(1 - deep) * this.y / this.MaxHeight():(deep-1)*this.y/this.MaxHeight();
            return new lt_code.pseudoThreeD.vector2(startX + width, startY + height);
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

    //以下为模块函数

    /**
     * 初始化
     * @param {number} [w] 场景宽度
     * @param {number} [h] 场景高度
     * @param {number} [df] 场景父类
     * @param {number} [dof] 景深
     */
    init: function (w,h,df,dof) {
        //重新定义画布宽高
        this.cas.width = w ? w : lt_code.variable.width;
        this.cas.height = h ? h : lt_code.variable.height;
        //重新定向ctx画布
        this.ctx = lt_code.getCtx(this.cas);
        //场景父类
        this.domFather = df ? df : document.body;
        //设定景深
        this.DOF = dof?dof:Math.sqrt(Math.pow(lt_code.variable.height,2)+Math.pow(lt_code.variable.width,2));
        //设定坐标轴位置
        this.AXISPOS = this.axisPos.center;
        lt_code.addChild(this.cas, this.domFather);
    },

    /**所有对象 */
    objects : [],
}

//以下为追加类

/**正方形对象类 */
lt_code.pseudoThreeD.SquareTobject = (x, y, z, ex, ey, ez, sx, sy, sz) => new lt_code.pseudoThreeD.Tobject(x, y, z, ex, ey, ez, sx, sy, sz);
//继承于空对象类
lt_code.pseudoThreeD.SquareTobject.prototype = lt_code.pseudoThreeD.Tobject.prototype;
//重写初始化
lt_code.pseudoThreeD.SquareTobject.prototype.init = function (d) {
    lt_code.pseudoThreeD.objects.push(this);
    /**正方形边长 */
    this.side = d;
    /**结构点 */
    this.points = [];
    d = d / 2;
    this.points.push(new lt_code.pseudoThreeD.vector3(-d, -d, -d));
    this.points.push(new lt_code.pseudoThreeD.vector3(-d, -d, d));
    this.points.push(new lt_code.pseudoThreeD.vector3(-d, d, -d));
    this.points.push(new lt_code.pseudoThreeD.vector3(-d, d, d));
    this.points.push(new lt_code.pseudoThreeD.vector3(d, -d, -d));
    this.points.push(new lt_code.pseudoThreeD.vector3(d, -d, d));
    this.points.push(new lt_code.pseudoThreeD.vector3(d, d, -d));
    this.points.push(new lt_code.pseudoThreeD.vector3(d, d, d));
}
//重写绘制
lt_code.pseudoThreeD.SquareTobject.prototype.draw = function (c, w) {
    console.log(this);
    for (var i = 0; i < this.points.length; i++) {
        var e = this.points[i];
        for (var j = i; j < this.points.length; j++) {
            var ctx = lt_code.pseudoThreeD.ctx;
            var v1 = e.toVector2(), v2 = this.points[j].toVector2();
            ctx.beginPath();
            ctx.moveTo(v1.x, v1.y);
            ctx.lineTo(v2, x, v2.y);
            ctx.strokeStyle = c ? c : "black";
            ctx.lineWidth = w ? w : 2;
            ctx.stroke();
            ctx.closePath();
        }
    };
}
