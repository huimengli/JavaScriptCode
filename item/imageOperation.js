/*
 * 虽然模块名为imageOperation(图片操作)
 * 但是使用的基础模块依旧是lt_code.image空间
 * 通过lt_code.init("IMGO")的方式加载
 */

/**图片模块中要使用的常量 */
lt_code.image.constant = {
    width: 1000,
    height: 750,
    lineWidth: 1,
    lineColor: "black",
    eachWidth: 450,
    eachHeight: 325,
    /** 箭头长度 */
    arrowLong: 5,
};

lt_code.image.constant.startX = (lt_code.image.constant.width / 2 - lt_code.image.constant.eachWidth) / 2;
lt_code.image.constant.startY = (lt_code.image.constant.height / 2 - lt_code.image.constant.eachHeight) / 2;

/**图片操作时使用的canvas对象 */
lt_code.image.canvas = lt_code.newDom("canvas", {
    width: lt_code.image.constant.width,
    height: lt_code.image.constant.height,
});

/**图片操作时使用的画布对象 */
lt_code.image.ctx = function () {
    lt_code.addChild(lt_code.image.canvas);
    return lt_code.getCtx(lt_code.image.canvas);
}();

/**
 * 绘制中心十字
 * @param {any} x
 * @param {any} y
 * @param {any} w
 * @param {any} c
 */
lt_code.image.drawCut = function (x, y, w, c) {
    var cas = this.canvas;
    var ctx = this.ctx;

    ctx.beginPath();

    ctx.moveTo(0, y);
    ctx.lineTo(cas.width, y);

    ctx.lineWidth = w;
    ctx.strokeStyle = c;

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(x, 0);
    ctx.lineTo(x, cas.height);

    ctx.lineWidth = w;
    ctx.strokeStyle = c;

    ctx.stroke();
}

/**
 * 绘制一条线
 * @param {lt_code.image.vector2} v1
 * @param {lt_code.image.vector2} v2
 * @param {number} w 线条宽度
 * @param {string} c 线条颜色
 */
lt_code.image.drawLine = function (v1, v2, w, c) {
    this.ctx.beginPath();

    this.ctx.moveTo(v1.x, v1.y);
    this.ctx.lineTo(v2.x, v2.y);

    this.ctx.lineWidth = w;
    this.ctx.strokeStyle = c;

    this.ctx.stroke();
}

/**
 * 绘制坐标轴
 * @param {lt_code.image.vector2} start
 * @param {lt_code.image.vector2} endX
 * @param {lt_code.image.vector2} endY
 */
lt_code.image.drawCoordinate = function (start, endX, endY) {
    var ctx = this.ctx;

    var w = this.constant.lineWidth;
    var c = this.constant.lineColor;

    //绘制主要线条
    this.drawLine(start, endX, w, c);
    this.drawLine(start, endY, w, c);

    //绘制箭头
    this.drawArrow(endX, this.direction.right, w, c);
    this.drawArrow(endY, this.direction.top, w, c);
}

/**方向(枚举类) */
lt_code.image.direction = Object.freeze({
    top: 0,
    right: 1,
    buttom: 2,
    left: 3,
});

/**
 * 获取枚举对象的值
 * @param {lt_code.image.direction} d
 */
lt_code.image.getEnumValue = function (d) {
    return Object.keys(lt_code.image.direction)[d];
};

/**
 * 绘制箭头
 * @param {lt_code.image.vector2} v
 * @param {lt_code.image.direction} d
 * @param {number} w
 * @param {string} c
 */
lt_code.image.drawArrow = function (v, d, w, c) {
    this.ctx.beginPath();
    var l = this.constant.arrowLong;

    switch (d) {
        case lt_code.image.direction.right:

            this.ctx.moveTo(v.x - l, v.y - l);
            this.ctx.lineTo(v.x, v.y);
            this.ctx.lineTo(v.x - l, v.y + l);

            break;
        case lt_code.image.direction.buttom:

            this.ctx.moveTo(v.x - l, v.y - l);
            this.ctx.lineTo(v.x, v.y);
            this.ctx.lineTo(v.x + l, v.y - l);

            break;
        case lt_code.image.direction.left:

            this.ctx.moveTo(v.x + l, v.y - l);
            this.ctx.lineTo(v.x, v.y);
            this.ctx.lineTo(v.x + l, v.y + l);

            break;
        case lt_code.image.direction.top:

            this.ctx.moveTo(v.x - l, v.y + l);
            this.ctx.lineTo(v.x, v.y);
            this.ctx.lineTo(v.x + l, v.y + l);

            break;
        default:
            console.error("错误输入!");
    }
    this.ctx.lineWidth = w;
    this.ctx.strokeStyle = c;

    this.ctx.stroke();
}



/**
 * 清空画布
 * @param {number} [x]
 * @param {number} [y]
 * @param {number} [w]
 * @param {number} [h]
 */
lt_code.image.clear = function (x, y, w, h) {
    x = x == null ? 0 : x;
    y = y == null ? 0 : y;
    w = w == null ? this.canvas.width : w;
    h = h == null ? this.canvas.height : h;
    this.ctx.clearRect(x, y, w, h);
}

/**卷积核 */
lt_code.image.convolutionKernel = class {

    /**
     * 构建一个卷积核
     * @param {number} x 行
     * @param {number} y 列
     * @param {number} [defaultValue] 默认值
     */
    constructor(x, y, defaultValue) {
        defaultValue = defaultValue ? defaultValue : 0;
        this.points = [];
        for (var i = 0; i < x; i++) {
            this.points.push([]);
            for (var j = 0; j < y; j++) {
                this.points[i].push(defaultValue);
            }
        }

    }

    /**
     * 设置卷积核某个点的值
     * @param {number} x 行
     * @param {number} y 列
     * @param {number} value 值
     */
    setPoint(x, y, value) {
        this.points[x][y] = value;
    }

    /**
     * 设置一行的值
     * @param {number} x 行
     * @param {number} value 值
     */
    setLine(x, value) {
        for (var i = 0; i < this.points[x].length; i++) {
            this.points[x][i] = value;
        }
    }

    /**
     * 设置一列的值
     * @param {number} y 列
     * @param {number} value 值
     */
    setList(y, value) {
        for (var i = 0; i < this.points.length; i++) {
            this.points[i][y] = value;
        }
    }

    /**
     * 设置全部的值
     * @param {number} value
     */
    setAll(value) {
        for (var i = 0; i < this.points.length; i++) {
            for (var j = 0; j < this.points[i].length; j++) {
                this.points[i][j] = value;
            }
        }
    }


}

/**三阶卷积核 */
lt_code.image.convolutionKernel3 = class {

    /**
     * 构建一个三阶卷积核
     * @param {any} defaultValue
     */
    constructor(defaultValue) {
        defaultValue = defaultValue ? defaultValue : 0;
        this.points = [];
        this.imageData = new ImageData(1, 1);
        for (var i = 0; i < 3; i++) {
            this.points.push([]);
            for (var j = 0; j < 3; j++) {
                this.points[i].push(defaultValue);
            }
        }
        lt_code.image.drawCut(lt_code.image.constant.width / 2, lt_code.image.constant.height / 2, lt_code.image.constant.lineWidth, lt_code.image.constant.lineColor);
    }

    /**
     * 设置卷积核某个点的值
     * @param {number} x 行
     * @param {number} y 列
     * @param {number} value 值
     */
    setPoint(x, y, value) {
        this.points[x][y] = value;
    }

    /**
     * 设置一行的值
     * @param {number} x 行
     * @param {number} value 值
     */
    setLine(x, value) {
        for (var i = 0; i < this.points[x].length; i++) {
            this.points[x][i] = value;
        }
    }

    /**
     * 设置一列的值
     * @param {number} y 列
     * @param {number} value 值
     */
    setList(y, value) {
        for (var i = 0; i < this.points.length; i++) {
            this.points[i][y] = value;
        }
    }

    /**
     * 设置全部的值
     * @param {number} value 值
     */
    setAll(value) {
        for (var i = 0; i < this.points.length; i++) {
            for (var j = 0; j < this.points[i].length; j++) {
                this.points[i][j] = value;
            }
        }
    }

    /**
     * 输入一张图片
     * @param {ImageData|string|HTMLImageElement} img
     */
    imageInput(img) {
        this.img = img;
        /**canvas对象 */
        var cas = lt_code.image.canvas;
        /**画布 */
        var ctx = lt_code.image.ctx;
        /**宽度 */
        var eachw = lt_code.image.constant.eachWidth;
        /**高度 */
        var eachh = lt_code.image.constant.eachHeight;
        if (img instanceof ImageData) {
            console.error("imageData不能缩放,不能使用此格式")
            if (img.width / img.height > eachw / eachh) {
                /**缩放 */
                var scalc = img.width / eachw;
                var x = lt_code.image.constant.startX;
                var h = img.height / scalc;
                var y = (eachh - h) / 2;
                //ctx.putImageData(img,x,y,)
            } else {

            }
        }
        else if (img instanceof HTMLImageElement) {
            if (img.width / img.height > eachw / eachw) {
                var scalc = img.width / eachw;
                var x = lt_code.image.constant.startX;
                var h = img.height / scalc;
                var y = (eachh - h) / 2;
                ctx.drawImage(img, x, y, eachw, h);
            } else if (img.width / img.height < eachw / eachh) {
                var scalc = img.height / eachh;
                var y = lt_code.image.constant.startY;
                var w = img.width / scalc;
                var x = (eachw - w) / 2;
                ctx.drawImage(img, x, y, w, eachh);
            } else {
                ctx.drawImage(img, lt_code.image.constant.startX, lt_code.image.constant.startY, eachw, eachh);
            }
            this.imageData = this.getImageData();
        }
        else if (typeof (img) == "string") {
            var newImg = lt_code.newDom("img", {
                src: img,
            });
            //lt_code.addChild(newImg);
            newImg.onload = () => {
                this.imageInput(newImg);
            };
        }
    }

    /**坐标图输出(右上) */
    coordinateOut() {
        //lt_code.image.clear();
        var imageData = this.getImageData();
        var ctx = lt_code.image.ctx;
        /**模块常量 */
        var c = lt_code.image.constant;

        //放置图片
        ctx.putImageData(imageData, c.width / 2 + c.startX, c.startY);

        //绘制坐标轴
        lt_code.image.drawCoordinate(
            new lt_code.image.vector2(c.width / 2 + c.startX, c.startY + c.eachHeight),
            new lt_code.image.vector2(c.width / 2 + c.startX + c.eachWidth, c.startY + c.eachHeight),
            new lt_code.image.vector2(c.width / 2 + c.startX, c.startY)
        );

    }

    /**
     * 获取图片数据
     * @param x
     * @param y
     * @param w
     * @param h
     * @returns {ImageData}
     */
    getImageData(x, y, w, h) {
        x = x ? x : lt_code.image.constant.startX - 1;
        y = y ? y : lt_code.image.constant.startY - 1;
        w = w ? w : lt_code.image.constant.eachWidth + 2;
        h = h ? h : lt_code.image.constant.eachHeight + 2;
        return lt_code.image.ctx.getImageData(x, y, w, h);
    }

    /**使用卷积核对图片进行处理 */
    handleOut() {
        /**有多少行 */
        var line = this.imageData.width;
        /**有多少列 */
        var list = this.imageData.height;
        this.imageData = this.getImageData();
        var base = this;
        var ret = new ImageData(line-2, list-2);
        var temp = [];

        /**
         * 获取一个像素点的颜色
         * @param {any} x
         * @param {any} y
         * @param {any} defautValue
         */
        var getColor = (x, y, defautValue) => {
            defautValue = defautValue == NaN || defautValue == null ? 0 : defautValue;
            var ret = [];
            for (var i = x * list * 4 + y * 4; i < x * list * 4 + (y + 1) * 4; i++) {
                ret.push(this.imageData.data[i]||defautValue);
            }
            return ret;
        }

        /**
         * 设置一个像素点的颜色
         * @param {any} x
         * @param {any} y
         * @param {any} r
         * @param {any} g
         * @param {any} b
         * @param {any} a
         */
        var setColor = (x, y, r, g, b, a)=>{
            var i = x * ret.height * 4 + y * 4;
            ret.data[i++] = r;
            ret.data[i++] = g;
            ret.data[i++] = b;
            ret.data[i] = a;
        }

        //console.log(getColor(Math.floor(line/2), Math.floor(list/2)));

        for (var i = 0; i < line; i++) {
            for (var j = 0; j < list; j++) {
                //var p1 = getColor(i - 1, j - 1),
                //    p2 = getColor(i - 1, j),
                //    p3 = getColor(i - 1, j + 1),
                //    p4 = getColor(i, j - 1),
                //    p5 = getColor(i, j),
                //    p6 = getColor(i, j + 1),
                //    p7 = getColor(i + 1, j - 1),
                //    p8 = getColor(i + 1, j),
                //    p9 = getColor(i + 1, j + 1);

                //var r = function () {
                //    var ret = p1[0] * base.points[0][0];
                //    ret += p2[0] * base.points[0][1];
                //    ret += p3[0] * base.points[0][2];
                //    ret += p4[0] * base.points[1][0];
                //    ret += p5[0] * base.points[1][1];
                //    ret += p6[0] * base.points[1][2];
                //    ret += p7[0] * base.points[2][0];
                //    ret += p8[0] * base.points[2][1];
                //    ret += p9[0] * base.points[2][2];
                //    return Math.round(ret / 9);
                //}(), g = function () {
                //    var ret = p1[1] * base.points[0][0];
                //    ret += p2[1] * base.points[0][1];
                //    ret += p3[1] * base.points[0][2];
                //    ret += p4[1] * base.points[1][0];
                //    ret += p5[1] * base.points[1][1];
                //    ret += p6[1] * base.points[1][2];
                //    ret += p7[1] * base.points[2][0];
                //    ret += p8[1] * base.points[2][1];
                //    ret += p9[1] * base.points[2][2];
                //    return Math.round(ret / 9);
                //}(), b = function () {
                //    var ret = p1[2] * base.points[0][0];
                //    ret += p2[2] * base.points[0][1];
                //    ret += p3[2] * base.points[0][2];
                //    ret += p4[2] * base.points[1][0];
                //    ret += p5[2] * base.points[1][1];
                //    ret += p6[2] * base.points[1][2];
                //    ret += p7[2] * base.points[2][0];
                //    ret += p8[2] * base.points[2][1];
                //    ret += p9[2] * base.points[2][2];
                //    return Math.round(ret / 9);
                //}(), a = function () {
                //    var ret = p1[3] * base.points[0][0];
                //    ret += p2[3] * base.points[0][1];
                //    ret += p3[3] * base.points[0][2];
                //    ret += p4[3] * base.points[1][0];
                //    ret += p5[3] * base.points[1][1];
                //    ret += p6[3] * base.points[1][2];
                //    ret += p7[3] * base.points[2][0];
                //    ret += p8[3] * base.points[2][1];
                //    ret += p9[3] * base.points[2][2];
                //    return Math.round(ret / 9);
                //}();
                //if (i > 0 && j > 0 && i < line - 1&&j<list - 1) {
                    //var t = getColor(i, j);
                    //temp.push(t[0], t[1], t[2], t[3]);
                    var p1 = getColor(i - 1, j - 1),
                        p2 = getColor(i - 1, j),
                        p3 = getColor(i - 1, j + 1),
                        p4 = getColor(i, j - 1),
                        p5 = getColor(i, j),
                        p6 = getColor(i, j + 1),
                        p7 = getColor(i + 1, j - 1),
                        p8 = getColor(i + 1, j),
                        p9 = getColor(i + 1, j + 1);

                    var r = function () {
                        var ret = p1[0] * base.points[0][0];
                        ret += p2[0] * base.points[0][1];
                        ret += p3[0] * base.points[0][2];
                        ret += p4[0] * base.points[1][0];
                        ret += p5[0] * base.points[1][1];
                        ret += p6[0] * base.points[1][2];
                        ret += p7[0] * base.points[2][0];
                        ret += p8[0] * base.points[2][1];
                        ret += p9[0] * base.points[2][2];
                        return Math.round(ret / 9);
                    }(), g = function () {
                        var ret = p1[1] * base.points[0][0];
                        ret += p2[1] * base.points[0][1];
                        ret += p3[1] * base.points[0][2];
                        ret += p4[1] * base.points[1][0];
                        ret += p5[1] * base.points[1][1];
                        ret += p6[1] * base.points[1][2];
                        ret += p7[1] * base.points[2][0];
                        ret += p8[1] * base.points[2][1];
                        ret += p9[1] * base.points[2][2];
                        return Math.round(ret / 9);
                    }(), b = function () {
                        var ret = p1[2] * base.points[0][0];
                        ret += p2[2] * base.points[0][1];
                        ret += p3[2] * base.points[0][2];
                        ret += p4[2] * base.points[1][0];
                        ret += p5[2] * base.points[1][1];
                        ret += p6[2] * base.points[1][2];
                        ret += p7[2] * base.points[2][0];
                        ret += p8[2] * base.points[2][1];
                        ret += p9[2] * base.points[2][2];
                        return Math.round(ret / 9);
                    }(), a = function () {
                        var ret = p1[3] * base.points[0][0];
                        ret += p2[3] * base.points[0][1];
                        ret += p3[3] * base.points[0][2];
                        ret += p4[3] * base.points[1][0];
                        ret += p5[3] * base.points[1][1];
                        ret += p6[3] * base.points[1][2];
                        ret += p7[3] * base.points[2][0];
                        ret += p8[3] * base.points[2][1];
                        ret += p9[3] * base.points[2][2];
                        return Math.round(ret / 9);
                    }();
                    temp.push(r, g, b, a);
                    //temp.push(r, 0, 0, 255);
                    //temp.push(0, g, 0, 255);
                    //temp.push(0, 0, b, 255);
                    //temp.push(0, 0, 0, 255);
                    ////temp.push(0, 0, 0, 0);

                    //var t = getColor(i, j);
                    //temp.push(t[0], t[1], t[2], t[3]);
                //} else {
                    //var t = getColor(i, j);
                    //temp.push(t[0], t[1], t[2], t[3]);
                //    temp.push(0, 0, 0, 0);
                //}
                //setColor(i, j, t[0], t[1], t[2], t[3]);
                //temp.push(r, g, b, a);
                //console.log(r + " " + g + " " + b + " " + a);
                //break;
            }
        }
        console.log(temp);
        ret = new ImageData(new Uint8ClampedArray(temp), line, list);
        lt_code.image.ctx.putImageData(ret, lt_code.image.constant.startX, lt_code.image.constant.height / 2 + lt_code.image.constant.startY);
    }
}





/**二维向量*/
lt_code.image.vector2 = class {
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
        return new lt_code.image.vector2(0, 0);
    }

    /**坐标最大值(超过即既不计算也不显示) */
    static Infinity() {
        var max = lt_code.image.MAXVALUE;
        return new lt_code.image.vector2(max, max);
    }

    /**x轴轴向 */
    static right() {
        return new lt_code.image.vector2(1, 0);
    }

    /**x轴反轴向 */
    static left() {
        return new lt_code.image.vector2(-1, 0);
    }

    /**y轴轴向 */
    static down() {
        return new lt_code.image.vector2(0, 1);
    }

    /**y轴反轴向 */
    static up() {
        return new lt_code.image.vector2(0, -1);
    }

    /**全单位量 */
    static One() {
        return new lt_code.image.vector2(1, 1);
    }

    //以下是坐标计算函数

    /**
     * 获取两个坐标的中间值
     * @param {lt_code.image.vector2} v1
     * @param {lt_code.image.vector2} v2
     */
    static getCenter(v1, v2) {
        var center = lt_code.image.vector2.None();
        center.x = (v1.x + v2.x) / 2;
        center.y = (v1.y + v2.y) / 2;
        return center;
    }

    /**场景最大宽度 */
    MaxWidth() { return lt_code.image.cas.width };
    /**场景最大高度 */
    MaxHeight() { return lt_code.image.cas.height };

    //以下为功能函数
    /**
     * 坐标变换
     * @param {number|lt_code.image.vector2} x
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
        var ret = new lt_code.image.vector2(this.x, this.y);
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
};

