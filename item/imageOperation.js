/*
 * 虽然模块名为imageOperation(图片操作)
 * 但是使用的基础模块依旧是lt_code.image空间
 * 通过lt_code.init("IMGO")的方式加载
 */

/**图片操作时使用的canvas对象 */
lt_code.image.canvas = lt_code.newDom("canvas", {
    width: 1000,
    height: 750,
});

/**图片操作时使用的画布对象 */
lt_code.image.ctx = function () {
    lt_code.addChild(lt_code.image.canvas);
    return lt_code.getCtx(lt_code.image.canvas);
}();

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
                this.points.push(defaultValue);
            }
        }

    }
}
