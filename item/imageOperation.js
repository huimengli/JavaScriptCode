/*
 * ��Ȼģ����ΪimageOperation(ͼƬ����)
 * ����ʹ�õĻ���ģ��������lt_code.image�ռ�
 * ͨ��lt_code.init("IMGO")�ķ�ʽ����
 */

/**ͼƬģ����Ҫʹ�õĳ��� */
lt_code.image.constant = {
    width: 1000,
    height: 750,
    lineWidth: 1,
    lineColor: "black",
    eachWidth: 450,
    eachHeight: 325,
    /** ��ͷ���� */
    arrowLong: 5,
};

lt_code.image.constant.startX = (lt_code.image.constant.width / 2 - lt_code.image.constant.eachWidth) / 2;
lt_code.image.constant.startY = (lt_code.image.constant.height / 2 - lt_code.image.constant.eachHeight) / 2;

/**ͼƬ����ʱʹ�õ�canvas���� */
lt_code.image.canvas = lt_code.newDom("canvas", {
    width: lt_code.image.constant.width,
    height: lt_code.image.constant.height,
});

/**ͼƬ����ʱʹ�õĻ������� */
lt_code.image.ctx = function () {
    lt_code.addChild(lt_code.image.canvas);
    return lt_code.getCtx(lt_code.image.canvas);
}();

/**
 * ��������ʮ��
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
 * ����һ����
 * @param {lt_code.image.vector2} v1
 * @param {lt_code.image.vector2} v2
 * @param {number} w �������
 * @param {string} c ������ɫ
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
 * ����������
 * @param {lt_code.image.vector2} start
 * @param {lt_code.image.vector2} endX
 * @param {lt_code.image.vector2} endY
 */
lt_code.image.drawCoordinate = function (start, endX, endY) {
    var ctx = this.ctx;

    var w = this.constant.lineWidth;
    var c = this.constant.lineColor;

    //������Ҫ����
    this.drawLine(start, endX, w, c);
    this.drawLine(start, endY, w, c);

    //���Ƽ�ͷ
    this.drawArrow(endX, this.direction.right, w, c);
    this.drawArrow(endY, this.direction.top, w, c);
}

/**����(ö����) */
lt_code.image.direction = Object.freeze({
    top: 0,
    right: 1,
    buttom: 2,
    left: 3,
});

/**
 * ��ȡö�ٶ����ֵ
 * @param {lt_code.image.direction} d
 */
lt_code.image.getEnumValue = function (d) {
    return Object.keys(lt_code.image.direction)[d];
};

/**
 * ���Ƽ�ͷ
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
            console.error("��������!");
    }
    this.ctx.lineWidth = w;
    this.ctx.strokeStyle = c;

    this.ctx.stroke();
}



/**
 * ��ջ���
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

/**����� */
lt_code.image.convolutionKernel = class {

    /**
     * ����һ�������
     * @param {number} x ��
     * @param {number} y ��
     * @param {number} [defaultValue] Ĭ��ֵ
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
     * ���þ����ĳ�����ֵ
     * @param {number} x ��
     * @param {number} y ��
     * @param {number} value ֵ
     */
    setPoint(x, y, value) {
        this.points[x][y] = value;
    }

    /**
     * ����һ�е�ֵ
     * @param {number} x ��
     * @param {number} value ֵ
     */
    setLine(x, value) {
        for (var i = 0; i < this.points[x].length; i++) {
            this.points[x][i] = value;
        }
    }

    /**
     * ����һ�е�ֵ
     * @param {number} y ��
     * @param {number} value ֵ
     */
    setList(y, value) {
        for (var i = 0; i < this.points.length; i++) {
            this.points[i][y] = value;
        }
    }

    /**
     * ����ȫ����ֵ
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

/**���׾���� */
lt_code.image.convolutionKernel3 = class {

    /**
     * ����һ�����׾����
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
     * ���þ����ĳ�����ֵ
     * @param {number} x ��
     * @param {number} y ��
     * @param {number} value ֵ
     */
    setPoint(x, y, value) {
        this.points[x][y] = value;
    }

    /**
     * ����һ�е�ֵ
     * @param {number} x ��
     * @param {number} value ֵ
     */
    setLine(x, value) {
        for (var i = 0; i < this.points[x].length; i++) {
            this.points[x][i] = value;
        }
    }

    /**
     * ����һ�е�ֵ
     * @param {number} y ��
     * @param {number} value ֵ
     */
    setList(y, value) {
        for (var i = 0; i < this.points.length; i++) {
            this.points[i][y] = value;
        }
    }

    /**
     * ����ȫ����ֵ
     * @param {number} value ֵ
     */
    setAll(value) {
        for (var i = 0; i < this.points.length; i++) {
            for (var j = 0; j < this.points[i].length; j++) {
                this.points[i][j] = value;
            }
        }
    }

    /**
     * ����һ��ͼƬ
     * @param {ImageData|string|HTMLImageElement} img
     */
    imageInput(img) {
        this.img = img;
        /**canvas���� */
        var cas = lt_code.image.canvas;
        /**���� */
        var ctx = lt_code.image.ctx;
        /**��� */
        var eachw = lt_code.image.constant.eachWidth;
        /**�߶� */
        var eachh = lt_code.image.constant.eachHeight;
        if (img instanceof ImageData) {
            console.error("imageData��������,����ʹ�ô˸�ʽ")
            if (img.width / img.height > eachw / eachh) {
                /**���� */
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

    /**����ͼ���(����) */
    coordinateOut() {
        //lt_code.image.clear();
        var imageData = this.getImageData();
        var ctx = lt_code.image.ctx;
        /**ģ�鳣�� */
        var c = lt_code.image.constant;

        //����ͼƬ
        ctx.putImageData(imageData, c.width / 2 + c.startX, c.startY);

        //����������
        lt_code.image.drawCoordinate(
            new lt_code.image.vector2(c.width / 2 + c.startX, c.startY + c.eachHeight),
            new lt_code.image.vector2(c.width / 2 + c.startX + c.eachWidth, c.startY + c.eachHeight),
            new lt_code.image.vector2(c.width / 2 + c.startX, c.startY)
        );

    }

    /**
     * ��ȡͼƬ����
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

    /**ʹ�þ���˶�ͼƬ���д��� */
    handleOut() {
        /**�ж����� */
        var line = this.imageData.width;
        /**�ж����� */
        var list = this.imageData.height;
        this.imageData = this.getImageData();
        var base = this;
        var ret = new ImageData(line-2, list-2);
        var temp = [];

        /**
         * ��ȡһ�����ص����ɫ
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
         * ����һ�����ص����ɫ
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





/**��ά����*/
lt_code.image.vector2 = class {
    /**
     * ����
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    //���������������

    /**�������ĵ� */
    static None() {
        return new lt_code.image.vector2(0, 0);
    }

    /**�������ֵ(�������Ȳ�����Ҳ����ʾ) */
    static Infinity() {
        var max = lt_code.image.MAXVALUE;
        return new lt_code.image.vector2(max, max);
    }

    /**x������ */
    static right() {
        return new lt_code.image.vector2(1, 0);
    }

    /**x�ᷴ���� */
    static left() {
        return new lt_code.image.vector2(-1, 0);
    }

    /**y������ */
    static down() {
        return new lt_code.image.vector2(0, 1);
    }

    /**y�ᷴ���� */
    static up() {
        return new lt_code.image.vector2(0, -1);
    }

    /**ȫ��λ�� */
    static One() {
        return new lt_code.image.vector2(1, 1);
    }

    //������������㺯��

    /**
     * ��ȡ����������м�ֵ
     * @param {lt_code.image.vector2} v1
     * @param {lt_code.image.vector2} v2
     */
    static getCenter(v1, v2) {
        var center = lt_code.image.vector2.None();
        center.x = (v1.x + v2.x) / 2;
        center.y = (v1.y + v2.y) / 2;
        return center;
    }

    /**��������� */
    MaxWidth() { return lt_code.image.cas.width };
    /**�������߶� */
    MaxHeight() { return lt_code.image.cas.height };

    //����Ϊ���ܺ���
    /**
     * ����任
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
     * ��ת(��ά�����Ӧ��ֻ�ܸ���һ��z����ת)
     * @param {any} c ���ĵ�(��δ���)
     * @param {number} z 
     */
    rotate(c, z) {
        var l = Math.sqrt(this.x * this.x + this.y * this.y);
        var ret = new lt_code.image.vector2(this.x, this.y);
        ret.x = Math.sin(z / 360 * Math.PI * 2) * l;
        ret.y = Math.cos(z / 360 * Math.PI * 2) * l;
        return ret;
    }

    /**����תΪ�ַ��� */
    toString() {
        var ret = {
            x: this.x,
            y: this.y,
        };
        return JSON.stringify(ret);
    }
};

