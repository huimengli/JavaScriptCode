/*
 * ��Ȼģ����ΪimageOperation(ͼƬ����)
 * ����ʹ�õĻ���ģ��������lt_code.image�ռ�
 * ͨ��lt_code.init("IMGO")�ķ�ʽ����
 */

/**ͼƬ����ʱʹ�õ�canvas���� */
lt_code.image.canvas = lt_code.newDom("canvas", {
    width: 1000,
    height: 750,
});

/**ͼƬ����ʱʹ�õĻ������� */
lt_code.image.ctx = function () {
    lt_code.addChild(lt_code.image.canvas);
    return lt_code.getCtx(lt_code.image.canvas);
}();

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
                this.points.push(defaultValue);
            }
        }

    }
}
