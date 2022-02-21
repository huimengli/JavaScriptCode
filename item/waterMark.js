/**
 * ˮӡ��ˮӡģ��
 * ԭ�����ģ�������lt_code.image�ռ���
 * ������ʹ�õ���ģ��lt_code.watermark�ռ�
 * ͨ��lt_code.init("WM")�ķ�ʽ����
 */

/**ˮӡģ�� */
lt_code.watermark = {};
/**
 * ԭͼ�����
 */
lt_code.watermark.input = lt_code.newDom("input", {
    type: "file",
});

/**���ɶ�ά���canvas */
lt_code.watermark.codeCanvas = lt_code.newDom("canvas", {
    width: 32,
    height: 32,
    style: {
        zoom: 10,
        border: "1px solid #999",
    },
});

lt_code.watermark.codeCtx = lt_code.getCtx(lt_code.watermark.codeCanvas);

/**����rgb��ycc����ת�� */
lt_code.watermark.testRGBandYCC = function () {
    var count = 256 * 256 * 256;
    var allResult = new Uint8ClampedArray(count);
    var index = 0, rgb;
    for (var x = 0; x < 256; x++) {
        for (var y = 0; y < 256; y++) {
            for (var z = 0; z < 256; z++) {
                var rgb = "rgb(" + x + "," + y + "," + z + ")";
                allResult[index++] = lt_code.image.fromYCbCrToRGB(lt_code.image.fromRGBToYCbCr(rgb)) == rgb ? 0 : 1;
            }
        }
    }
    return allResult;
};

/**����rgb��hsv����ת�� */
lt_code.watermark.testRGBandHSV = function () {
    var count = 256 * 256 * 256;
    var allResult = new Uint8ClampedArray(count);
    var index = 0, rgb;
    for (var x = 0; x < 256; x++) {
        for (var y = 0; y < 256; y++) {
            for (var z = 0; z < 256; z++) {
                var rgb = "rgb(" + x + "," + y + "," + z + ")";
                allResult[index++] = lt_code.image.fromHSVToRGB(lt_code.image.fromRGBToHSV(rgb)) == rgb ? 0 : 1;
            }
        }
    }
    return allResult;
};

/**
 * ģ���ʼ�� 
 * @param {HTMLElement} [domFather] ���ڵ� 
 */
lt_code.watermark.init = function (domFather) {
    domFather = domFather ? domFather : lt_code.getAll();
    lt_code.addChild(this.input, domFather);
    lt_code.addChild(this.codeCanvas, domFather);
};

/**�ֽ� */
lt_code.watermark.byte = class {
    /**
     * ��ʼ��
     * @param {number|string} s
     */
    constructor(s) {
        if (typeof(s)=="string") {
            s = parseInt(s);
            if (s!=0&&!s) {
                console.error("�����������!");
            }
        }
        if (typeof (s) == "number") {
            if (s > this.MaxValue() || s < this.MinValue()) {
                console.error("����������Χ!")
            } else {
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
    }

    /**���ֵ */
    MaxValue() {
        return 255;
    }

    /**��Сֵ */
    MinValue() {
        return 0;
    }

    /**תΪ���� */
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

    /**תΪ������ */
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
     * תΪ�ַ���
     * @param {null|number} type ת����ʽ
     */
    toString(type) {
        if (type == null) {
            return this.toInt().toString();
        } else if (typeof(type) == "number") {
            if (type == 2) {
                return this.toBinary();
            } else {
                return this.toInt().toString(type);
            }
        } else {
            console.error("��ʱû������ת����ʽ!");
        }
    }
}

/**׷��ģ�� */
lt_code.watermark.addMothed = function () {

    /**���ַ���תΪ�ֽڴ� */
    String.prototype.toByte = function () {
        var ret = [];
        var temp = lt_code.base64._utf8_encode(this);
        temp = Array.prototype.slice.call(temp);
        temp.forEach(function (e) {
            ret.push(new lt_code.watermark.byte(e.charCodeAt()));
        });
        return ret;
    };

    /**�ֽڴ����� */
    String.prototype.byteLenght = function () {
        return this.toByte().length;
    }

    /**���ַ���ȫ��תΪ������ */
    String.prototype.toBinarys = function () {
        var ret = "";
        var temp = this.toByte();
        temp.forEach(function (e) {
            ret+=e.toBinary();
        });
        return ret;
    }

    /**
     * �������ַ���תΪ������
     * @param {number} start ��ʼ
     * @param {number} count ����
     * @param {number} [end] ����
     */
    String.prototype.toBinary = function (start, count,end) {
        var ret = "";
        var temp = this.toByte();
        for (var i = start; i < end==null?start+count:end; i++) {
            ret += e.toBinary();
        }
        return ret;
    }

    /**
     * �޸�һ���ֽ�
     * @param {lt_code.watermark.byte} byte һ���ֽ�
     * @param {number} index �ֽ�����
     */
    Uint8ClampedArray.prototype.chengeByte = function (index,byte) {
        this[index] = byte.toInt();
    }

    /**
     * ��Uint8ClampedArrayתΪarray
     * @param {Uint8ClampedArray} uArr
     */
    Array.prototype.fromUint8ClampedArray = function (uArr) {
        var ret = [];
        for (var i = 0; i < uArr.length; i++) {
            ret.push(new lt_code.watermark.byte(uArr[i]));
        }
        return ret;
    }

    /**
     * ��Ӷ���
     * @param {object|Array} obj
     */
    Array.prototype.add = function (obj) {
        if (obj.length!=0&&!obj.length) {
            this.push(obj);
        } else {
            for (var i = 0; i < obj.length; i++) {
                this.add(obj[i]);
            }
        }
    }
}();


