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
        None() {
            return new lt_code.pseudoThreeD.vector3(0, 0, 0);
        }

        /**坐标最大值(超过即不计算也不显示) */
        Infinity() {
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
            
            switch (aPos) {
                case lt_code.pseudoThreeD.axisPos.leftTop:
                    //var zTransform = 
                    break;
                default:
                    console.trace("模块中没有这个参数\n或者尚未写完!");
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
        None() {
            return new lt_code.pseudoThreeD.vector2(0, 0);
        }

        /**坐标最大值(超过即既不计算也不显示) */
        Infinity() {
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
        this.DOF = dof?dof:900;
        //设定坐标轴位置
        this.AXISPOS = this.axisPos.center;
        lt_code.addChild(this.cas, this.domFather);

    },

    
}