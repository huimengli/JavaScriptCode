/**
 * @file 帮助文档
 * @author 楼听[修改日期:2018年8月14日]
 * @version demo-3
 */

//向head里面丢样式表
document.head.innerHTML += "<link href=\"lt_code/css/action.css\" rel=\"stylesheet\" /><!--js调用的css文件-->";

//向head里面丢一个特殊的style样式框
document.head.innerHTML += "<style id=\"lt_code_css\"></style>";

/**
 * 楼听自制的代码命名空间(伪)
 */
class lt_code { }






/**
 * lt_code中创建的变量 
 */
lt_code.variable = {};

/**
 * 用来使得moveTo函数能重复使用的变量
 */
lt_code.variable.users_moveTo = 0;

/**
 * 清空所有lt_code里面所定义的变量的函数
 * 并且清空lt_code_css这个专用的样式空间
 */
lt_code.clearAll = function () {
    lt_code.variable.users_moveTo = 0;
    lt_code.lt_css.innerHTML = "";
};














/**
 * 帮助文档产生的特殊的样式存放的空间
 */
lt_code.lt_css = document.getElementById("lt_code_css") ? document.getElementById("lt_code_css") : null;

/**
 * 获得id所代表的dom
 * @param {string} idName 输入id名
 * @return {HTMLElement} dom
 */
lt_code.getId = function (idName) {
    return !!document.getElementById(idName) ? document.getElementById(idName) : console.log("getId函数没有输入值!");
};

/**
 * 读取class所代表的dom(重载+2)
 * @param {string} className 输入class的名字 
 * @param {number} few 输入要读取的class里面的第几个
 * @return {HTMLElement|HTMLElement[]} dom|doms
 */
lt_code.getClass = function (className, few) {
    switch (arguments.length) {
        case 1: return document.getElementsByClassName(className);
        case 2: return document.getElementsByClassName(className)[few];
        default:
            if (arguments.length !== 0) {
                console.log("getClass函数输入错误!");
            } else {
                console.log("getClass函数没有输入值!");
            }
    }
};

/**
 * 读取所有标签所代表的dom(重载+4)
 * @param {string} tageName 输入标签名
 * @param {HTMLElement} dom 输入要读取的父元素(不输入默认全文档)
 * @param {number} few 输入要读取的tage里面的第几个(不输入默认返回数组)
 * @param {boolean} ISuseDom 是否使用dom参数(默认使用)
 * @return {HTMLElement|HTMLElement[]} dom|doms
 */
lt_code.getTage = function (tageName, dom, few, ISuseDom) {
    switch (arguments.length) {
        case 1:
            return document.getElementsByTagName(tageName);
        case 2:
            return dom.getElementsByTagName(tageName);
        case 3:
            return dom.getElementsByTagName(tageName)[few];
        case 4:
            if (ISuseDom) {
                return dom.getElementsByTagName(tageName)[few];
            } else {
                return document.getElementsByTagName(tageName)[few];
            }
        default:
            if (arguments.length !== 0) {
                console.log("getTage函数输入错误!");
            } else {
                console.log("getTage函数没有输入值!");
            }
    }
};

/**
 * 出现的函数(重载+2)(通过display和opacity来实现)
 * @param {HTMLElement} dom 代表要改变的物体的代号
 * @param {number} timer 动画进行的时间 
 */
lt_code.show = function (dom, timer) {
    switch (arguments.length) {
        case 1: dom.style.display = "block";
            break;
        case 2:
            dom.style.webkitAnimation = "change_opacity_open" + " " + timer + "s";
            dom.style.opacity = "1";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, timer * 1000);
            break;
        default:
            if (arguments.length !== 0) {
                console.log("show函数输入错误!");
            } else {
                console.log("show函数没有输入值!");
            }
    }
};

/**
 * 消失的函数(重载+3)(通过display和opacity来实现)
 * @param {HTMLElement} dom 代表要改变的物体的代号
 * @param {number} timer 动画进行的时间/延时的时间
 * @param {boolean} ISwate 是否延时消失
 */
lt_code.disappear = function (dom, timer, ISwate) {
    switch (arguments.length) {
        case 1: dom.style.display = "none";
            break;
        case 2: dom.style.webkitAnimation = "change_opacity_close" + " " + timer + "s";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, timer * 1000);
            break;
        case 3:
            if (typeof(ISwate) !== "boolean") {
                console.log("disappear函数ISwate参数输入参数出错!");
            } else {
                if (ISwate) {
                    dom.style.webkitAnimation = "change_opacity_close" + " " + timer + "s";
                    setTimeout(function () {
                        dom.style.display = "none";
                        dom.style.webkitAnimation = "";
                    }, timer * 1000);
                }
            }
            break;
        default:
            if (arguments.length !== 0) {
                console.log("disppear函数输入错误!");
            } else {
                console.log("disppear函数没有输入值!");
            }
    }
};

/**
 * 获取数字的函数(重载+2)
 * @param {string} text 输入要筛选的字符串
 * @param {number} types 选择不同的方式读取(1,2正则读取,4能读取负数)
 * @return {number} 返回数字
 */
lt_code.getNum = function (text, types) {
    switch (arguments.length) {
        case 1:
            return parseInt(text);
        case 2:
            if (types === 1) {
                return parseInt(text.replace(/[^0-9]/ig, ""));//移除所有非0-9的字符
            } else if (types === 2) {
                return parseInt(/^\D+(?=\d)/.exec(text));//暂不明白原理(无法使用)
            } else if (types === 3) {
                return parseInt(text.replace(/[^0-9]*/, ""));
            } else if (types === 4) {
                return parseInt(/-?[0-9]{1,}/i.exec(text));//读取一位到多位数字(可以读取负数)
            } else {
                console.log("getNum函数,type参数输入错误!");
            }
            break;
        default:
            if (arguments.length !== 0) {
                console.log("getNum函数输入错误!");
            } else {
                console.log("getNum函数没有输入值!");
            }
    }
};

/**
 * 改变高度的函数(重载+2)
 * @param {HTMLElement} dom 代表要改变的物体的代号
 * @param {number} from 开始的高度
 * @param {number} to 结束的高度
 * @param {number} timer 动画进行的时间(不输入默认1秒)
 */
lt_code.changeHeight = function (dom, from, to, timer) {
    if (!!this.lt_css) {
        this.lt_css.innerHTML =
            "@-webkit-keyframes change_height{" +
            "from{ height:" + from +
            "px;}" + "to{ height:" + to + "px;}}";
        switch (arguments.length) {
            case 3: dom.style.webkitAnimation =
                "change_height" + " " + "1s";
                dom.style.height = to + "px";
                setTimeout(function () {
                    dom.style.webkitAnimation = "";
                }, 1000);
                break;
            case 4: dom.style.webkitAnimation =
                "change_height" + " " + timer + "s";
                dom.style.height = to + "px";
                setTimeout(function () {
                    dom.style.webkitAnimation = "";
                }, timer * 1000);
                break;
            default: console.log("changeHeight函数输入的参数有误!");
        }
    } else {
        console.log("特殊style空间不存在");
    }
};

/**
 * 改变宽度的函数(重载+2)
 * @param {HTMLElement} dom 代表要改变的物体的代号
 * @param {number} from 开始的宽度
 * @param {number} to 结束的宽度
 * @param {number} timer 动画进行的时间(不输入默认1秒)
 */
lt_code.changeWidth = function (dom, from, to, timer) {
    if (!!this.lt_css) {
        this.lt_css.innerHTML =
            "@-webkit-keyframes change_width{" +
            "from{ width:" + from +
            "px;}" + "to{ width:" + to + "px;}}";
        switch (arguments.length) {
            case 3: dom.style.webkitAnimation =
                "change_width" + " " + "1s";
                dom.style.width = to + "px";
                setTimeout(function () {
                    dom.style.webkitAnimation = "";
                }, 1000);
                break;
            case 4: dom.style.webkitAnimation =
                "change_width" + " " + timer + "s";
                dom.style.width = to + "px";
                setTimeout(function () {
                    dom.style.webkitAnimation = "";
                }, timer * 1000);
                break;
            default: console.log("changeWidth函数输入的参数有误!");
        }
    } else {
        console.log("特殊style空间不存在");
    }
};

/**
 * 改变颜色的方法(重载+3)
 * @param {HTMLElement} dom 代表要改变物件的代号
 * @param {string} from 开始的颜色
 * @param {string} to 结束的颜色
 * @param {number} timer 动画进行的时间(不输入默认1秒)
 * @param {boolean} ISbackgroundColor 是否改变的是背景颜色(不输入默认否)
 */
lt_code.changeColor = function (dom, from, to, timer, ISbackgroundColor) {
    if (!!this.lt_css) {
        this.lt_css.innerHTML =
            "@-webkit-keyframes change_color{" +
            "from{ color:" + from +
            ";}" + "to{ color:" + to + ";}}" +
            "@-webkit-keyframes change_backgroundColor{" +
            "from{background-color:" + from +
            ";}" + "to{background-color:" + to + ";}}";
        switch (arguments.length) {
            case 3:
                dom.style.webkitAnimation = "change_color 1s";
                dom.style.color = to;
                setTimeout(function () {
                    dom.style.webkitAnimation = "";
                }, 1000);
                break;
            case 4:
                dom.style.webkitAnimation = "change_color" + " " + timer + "s";
                dom.style.color = to;
                setTimeout(function () {
                    dom.style.webkitAnimation = "";
                }, timer * 1000);
                break;
            case 5:
                if (!ISbackgroundColor) {
                    dom.style.webkitAnimation = "change_color" + " " + timer + "s";
                    dom.style.color = to;
                    setTimeout(function () {
                        dom.style.webkitAnimation = "";
                    }, timer * 1000);
                    break;
                } else {
                    dom.style.webkitAnimation = "change_backgroundColor" + " " + timer + "s";
                    dom.style.backgroundColor = to;
                    setTimeout(function () {
                        dom.style.webkitAnimation = "";
                    }, timer * 1000);
                }
                break;
            default:
                console.log("changeColor函数输入的参数有误!");
        }
    } else {
        console.log("特殊style空间不存在!");
    }
};

/**
 * 改变阴影的样式(重载+6)
 * @param {HTMLElement} dom 代表要改变物件的代号
 * @param {number} x 阴影的距离
 * @param {number} z 扩散的值(不输入默认5)
 * @param {string} colors 阴影的颜色(不输入默认为#888)
 * @param {number} types 阴影的方向(不输入默认右下)(1上,2右,3下,4左,5左上,6右上,7右下,8左下,9全方向)
 * @param {number} timer 不输入默认一秒
 * @param {boolean} ISinset 是否是内阴影/内发光(不输入默认否)
 */
lt_code.changeBoxShadow = function (dom, x, z, colors, types, timer, ISinset) {
    if (!!this.lt_css) {
        switch (arguments.length) {
            case 2: this.lt_css.innerHTML =
                "@-webkit-keyframes change_boxShadow{" +
                "from{ box-shadow:0px 0px 0px #888;}" +
                "to{ box-shadow:" + x + "px " + x +
                "px " + "5px " + "#888" + ";}}";
                dom.style.webkitAnimation = "change_boxShadow 1s";
                dom.style.boxShadow = x + "px " + x + "px " + "5px " + "#888";
                setTimeout(function () {
                    dom.style.webkitAnimation = "";
                }, 1000);
                break;
            case 3: this.lt_css.innerHTML =
                "@-webkit-keyframes change_boxShadow{" +
                "from{ box-shadow:0px 0px 0px #888;}" +
                "to{ box-shadow:" + x + "px " + x +
                "px " + z + "px " + "#888" + ";}}";
                dom.style.webkitAnimation = "change_boxShadow 1s";
                dom.style.boxShadow = x + "px " + x + "px " + z + "px " + "#888";
                setTimeout(function () {
                    dom.style.webkitAnimation = "";
                }, 1000);
                break;
            case 4: this.lt_css.innerHTML =
                "@-webkit-keyframes change_boxShadow{" +
                "from{ box-shadow:0px 0px 0px " + colors + ";}" +
                "to{ box-shadow:" + x + "px " + x +
                "px " + z + "px " + colors + ";}}";
                dom.style.webkitAnimation = "change_boxShadow 1s";
                dom.style.boxShadow = x + "px " + x + "px " + z + "px " + colors;
                setTimeout(function () {
                    dom.style.webkitAnimation = "";
                }, 1000);
                break;
            case 5:
                var y = x;
                switch (types) {
                    case 1: x = 0; y = -y; break;
                    case 2: y = 0; break;
                    case 3: x = 0; break;
                    case 4: x = -x; y = 0; break;
                    case 5: x = -x; y = -y; break;
                    case 6: y = -y; break;
                    case 7: break;
                    case 8: x = -x; break;
                    case 9: this.lt_css.innerHTML =
                        "@-webkit-keyframes change_boxShadow{" +
                        "from{ box-shadow:0px 0px 0px " + colors + ";}" +
                        "to{ box-shadow:" + x + "px " + x +
                        "px " + z + "px " + colors + "," + -x + "px " + -x +
                        "px " + z + "px " + colors + "," + x + "px " + -x +
                        "px " + z + "px " + colors + "," + -x + "px " + x +
                        "px " + z + "px " + colors + ";}}";
                        break;
                    default:
                        console.log("changeBoxShadow函数,types值输入错误!");
                }
                if (types !== 9) {
                    this.lt_css.innerHTML =
                        "@-webkit-keyframes change_boxShadow{" +
                        "from{ box-shadow:0px 0px 0px " + colors + ";}" +
                        "to{ box-shadow:" + x + "px " + y +
                        "px " + z + "px " + colors + ";}}";
                    dom.style.webkitAnimation = "change_boxShadow 1s";
                    dom.style.boxShadow = x + "px " + y + "px " + z + "px " + colors;
                    setTimeout(function () {
                        dom.style.webkitAnimation = "";
                    }, 1000);
                } else {
                    dom.style.webkitAnimation = "change_boxShadow 1s";
                    dom.style.boxShadow = x + "px " + x +
                        "px " + z + "px " + colors + "," + -x + "px " + -x +
                        "px " + z + "px " + colors + "," + x + "px " + -x +
                        "px " + z + "px " + colors + "," + -x + "px " + x +
                        "px " + z + "px " + colors;
                    setTimeout(function () {
                        dom.style.webkitAnimation = "";
                    }, 1000);
                }
                break;
            case 6:
                var y = x;
                switch (types) {
                    case 1: x = 0; y = -y; break;
                    case 2: y = 0; break;
                    case 3: x = 0; break;
                    case 4: x = -x; y = 0; break;
                    case 5: x = -x; y = -y; break;
                    case 6: y = -y; break;
                    case 7: break;
                    case 8: x = -x; break;
                    case 9: this.lt_css.innerHTML =
                        "@-webkit-keyframes change_boxShadow{" +
                        "from{ box-shadow:0px 0px 0px " + colors + ";}" +
                        "to{ box-shadow:" + x + "px " + x +
                        "px " + z + "px " + colors + "," + -x + "px " + -x +
                        "px " + z + "px " + colors + "," + x + "px " + -x +
                        "px " + z + "px " + colors + "," + -x + "px " + x +
                        "px " + z + "px " + colors + ";}}";
                        break;
                    default:
                        console.log("changeBoxShadow函数,types值输入错误!");
                }
                if (types !== 9) {
                    this.lt_css.innerHTML =
                        "@-webkit-keyframes change_boxShadow{" +
                        "from{ box-shadow:0px 0px 0px " + colors + ";}" +
                        "to{ box-shadow:" + x + "px " + y +
                        "px " + z + "px " + colors + ";}}";
                    dom.style.webkitAnimation = "change_boxShadow " + timer + "s";
                    dom.style.boxShadow = x + "px " + y + "px " + z + "px " + colors;
                    setTimeout(function () {
                        dom.style.webkitAnimation = "";
                    }, timer * 1000);
                } else {
                    dom.style.webkitAnimation = "change_boxShadow " + timer + "s";
                    dom.style.boxShadow = x + "px " + x +
                        "px " + z + "px " + colors + "," + -x + "px " + -x +
                        "px " + z + "px " + colors + "," + x + "px " + -x +
                        "px " + z + "px " + colors + "," + -x + "px " + x +
                        "px " + z + "px " + colors;
                    setTimeout(function () {
                        dom.style.webkitAnimation = "";
                    }, timer * 1000);
                }
                break;
            case 7:
                if (ISinset) {
                    var y = x;
                    switch (types) {
                        case 1: x = 0; y = -y; break;
                        case 2: y = 0; break;
                        case 3: x = 0; break;
                        case 4: x = -x; y = 0; break;
                        case 5: x = -x; y = -y; break;
                        case 6: y = -y; break;
                        case 7: break;
                        case 8: x = -x; break;
                        case 9: this.lt_css.innerHTML =
                            "@-webkit-keyframes change_boxShadow{" +
                            "from{ box-shadow:0px 0px 0px " + colors + " inset;}" +
                            "to{ box-shadow:" + x + "px " + x +
                            "px " + z + "px " + colors + " inset," + -x + "px " + -x +
                            "px " + z + "px " + colors + " inset," + x + "px " + -x +
                            "px " + z + "px " + colors + " inset," + -x + "px " + x +
                            "px " + z + "px " + colors + " inset;}}";
                            break;
                        default:
                            console.log("changeBoxShadow函数,types值输入错误!");
                    }
                    if (types !== 9) {
                        this.lt_css.innerHTML =
                            "@-webkit-keyframes change_boxShadow{" +
                            "from{ box-shadow:0px 0px 0px " + colors + " inset;}" +
                            "to{ box-shadow:" + x + "px " + y +
                            "px " + z + "px " + colors + " inset;}}";
                        dom.style.webkitAnimation = "change_boxShadow " + timer + "s";
                        dom.style.boxShadow = x + "px " + y + "px " + z + "px " + colors + " inset";
                        setTimeout(function () {
                            dom.style.webkitAnimation = "";
                        }, timer * 1000);
                    } else {
                        dom.style.webkitAnimation = "change_boxShadow " + timer + "s";
                        dom.style.boxShadow = x + "px " + x +
                            "px " + z + "px " + colors + " inset," + -x + "px " + -x +
                            "px " + z + "px " + colors + " inset," + x + "px " + -x +
                            "px " + z + "px " + colors + " inset," + -x + "px " + x +
                            "px " + z + "px " + colors + " inset";
                        setTimeout(function () {
                            dom.style.webkitAnimation = "";
                        }, timer * 1000);
                    }
                } else {
                    var y = x;
                    switch (types) {
                        case 1: x = 0; y = -y; break;
                        case 2: y = 0; break;
                        case 3: x = 0; break;
                        case 4: x = -x; y = 0; break;
                        case 5: x = -x; y = -y; break;
                        case 6: y = -y; break;
                        case 7: break;
                        case 8: x = -x; break;
                        case 9: this.lt_css.innerHTML =
                            "@-webkit-keyframes change_boxShadow{" +
                            "from{ box-shadow:0px 0px 0px " + colors + ";}" +
                            "to{ box-shadow:" + x + "px " + x +
                            "px " + z + "px " + colors + "," + -x + "px " + -x +
                            "px " + z + "px " + colors + "," + x + "px " + -x +
                            "px " + z + "px " + colors + "," + -x + "px " + x +
                            "px " + z + "px " + colors + ";}}";
                            break;
                        default:
                            console.log("changeBoxShadow函数,types值输入错误!");
                    }
                    if (types !== 9) {
                        this.lt_css.innerHTML =
                            "@-webkit-keyframes change_boxShadow{" +
                            "from{ box-shadow:0px 0px 0px " + colors + ";}" +
                            "to{ box-shadow:" + x + "px " + y +
                            "px " + z + "px " + colors + ";}}";
                        dom.style.webkitAnimation = "change_boxShadow " + timer + "s";
                        dom.style.boxShadow = x + "px " + y + "px " + z + "px " + colors;
                        setTimeout(function () {
                            dom.style.webkitAnimation = "";
                        }, timer * 1000);
                    } else {
                        dom.style.webkitAnimation = "change_boxShadow " + timer + "s";
                        dom.style.boxShadow = x + "px " + x +
                            "px " + z + "px " + colors + "," + -x + "px " + -x +
                            "px " + z + "px " + colors + "," + x + "px " + -x +
                            "px " + z + "px " + colors + "," + -x + "px " + x +
                            "px " + z + "px " + colors;
                        setTimeout(function () {
                            dom.style.webkitAnimation = "";
                        }, timer * 1000);
                    }
                }
                break;
            default:
                console.log("changeBoxShadow函数参数输入错误！");
        }
    } else {
        console.log("特殊style空间不存在!");
    }
};

/**
 * 变大/变小函数(重载+3)
 * @param {HTMLElement} doms 代表要改变物件的代号
 * @param {number} from 开始的大小(文本输入字体大小,其他则输入宽度\高度)
 * @param {number} to 结束的大小(文本输入字体大小,其他则输入宽度\高度)
 * @param {number} timer 动画进行的时间(不输入默认为一秒)
 * @param {boolean} ISwidth 输入的是否是宽度(如果内容是文本会报错)
 */
lt_code.changeBigerSmaller = function (doms, from, to, timer, ISwidth) {
    if (!this.lt_css) {
        console.log("特殊style空间不存在!");
    } else {
        var value1 = /\s{0,}[\<]?/.exec(doms.innerHTML)[0];//从第一个字符开始读取,直到不是<或者\s为止
        value1 = value1.replace(/[^\<]?/ig, "");//移去上个字符串中的所有非<的字符
        if (!value1) {
            this.lt_css.innerHTML =
                "@-webkit-keyframes change_fontSize{" +
                "from{ font-size:" + from +
                "px;}" + "to{ font-size:" + to + "px;}}";
            switch (arguments.length) {
                case 3:
                    doms.style.webkitAnimation = "change_fontSize 1s";
                    doms.style.fontSize = to + "px";
                    setTimeout(function () {
                        doms.style.webkitAnimation = "";
                    }, 1000);
                    break;
                case 4:
                    doms.style.webkitAnimation = "change_fontSize " + timer + "s";
                    doms.style.fontSize = to + "px";
                    setTimeout(function () {
                        doms.style.webkitAnimation = "";
                    }, timer * 1000);
                    break;
                case 5: console.log("changeBigerSmaller函数在输入的doms内容里面没有立即读取到标签会判定为改变字号大小,无需输入第五个参数");
                    break;
                default:
                    console.log("changeBigerSmaller函数输入的参数出错!");
            }
        } else {
            switch (arguments.length) {
                case 3: this.changeWidth(doms, from, to); break;
                case 4: this.changeWidth(doms, from, to, timer); break;
                case 5: if (ISwidth) {
                    this.changeWidth(doms, from, to, timer);
                } else {
                    this.changeHeight(doms, from, to, timer);
                }
                    break;
                default: console.log("changeBigerSmaller函数输入的参数出错!");
            }
        }
    }
};

/**
 * 使得某个物体脱离原有的束缚,可以被鼠标拖动
 * @param {HTMLElement} dom 要附上可拖动属性的物体的代号
 */
lt_code.makeMoveBox = function (dom) {
    var e;//鼠标位置
    var offLeft;
    var offTop;

    //dom相关的属性
    var dom_left;
    var dom_top;
    dom.style.position = "absolute";//调整标签属性为绝对定位(为了移动)
    //改标签的内容无法被选中(排除干扰)
    dom.style.Mozusers_moveToelect = "none";
    dom.style.users_moveToelect = "none";

    //显示器\屏幕相关属性
    var scrollHeight = window.screen.availHeight;
    var scrollWidth = window.screen.availWidth;

    //物体最多能移动到什么程度
    var max_width = scrollWidth - dom.offsetWidth;
    var max_height = scrollHeight - dom.offsetHeight;

    ////排除干扰所做的特殊操作
    //var value1 = /\s{0,}[\<]?/.exec(dom.innerHTML)[0];//从第一个字符开始读取,直到不是<或者\s为止
    //if (!!value1) {
    //    dom.innerHTML += "<div style=\"width:" + dom.offsetWidth +
    //        "px;height:" + dom.offsetHeight + "px;z-index:" +
    //        (dom.style.zIndex + 1) + ";position:relative;top:0;left:0;\"></div>"
    //}

    //鼠标按下时方框跟随鼠标移动
    dom.onmousedown = function (e) {
        offLeft = dom.offsetLeft;
        offLeft = e.clientX - offLeft;
        offTop = dom.offsetTop;
        offTop = e.clientY - offTop;
        document.onmousemove = function (e) {
            e = event || document.body.event;
            var move_x = e.clientX - offLeft;
            move_x = move_x > max_width ? max_width : move_x;
            var move_y = e.clientY - offTop;
            move_y = move_y > max_height ? max_height : move_y;
            dom.style.left = (move_x > 0 ? move_x : 0) + "px";
            dom.style.top = (move_y > 0 ? move_y : 0) + "px";
        };
    };

    //鼠标松开时方框停留
    dom.onmouseup = function () {
        offTop = 0;
        offLeft = 0;
        document.onmousemove = function (e) {
            e = 0;
        };
    };

    //鼠标离开时方框停留
    dom.onmouseout = function () {
        offTop = 0;
        offLeft = 0;
        document.onmousemove = function (e) {
            e = 0;
        };
    };
};

/**
 * 移动某个物体的函数(重载+3)
 * @param {HTMLElement} dom 要被移动的物体的js代号
 * @param {number} changeWidth 水平移动的距离
 * @param {number} changeHeight 纵向移动的距离(不输入默认横向移动)
 * @param {number} time 移动动画进行的时间(不输入默认一秒)
 */
lt_code.moveBox = function (dom, changeWidth, changeHeight, time) {
    if (!this.lt_css) {
        console.log("特殊style样式空间不存在!");
        return;
    } else {
        if (dom.style.position === "static") {
            console.log("moveBox函数报错:此物件属性为static不能移动!");
            return;
        } else if (dom.style.position === "") {
            //dom.style.position = "absolute";
        }
    }
    switch (arguments.length) {
        case 2:
            var fromW = this.getNum(dom.style.left);
            fromW = !!fromW ? fromW : 0;
            var toW = fromW + changeWidth;

            this.lt_css.innerHTML =
                "@-webkit-keyframes change_left{" +
                "from{ left:" + fromW +
                "px;}" + "to{ left:" + toW + "px;}}";
            dom.style.webkitAnimation = "change_left 1s";
            dom.style.left = toW + "px";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, 1000);
            break;
        case 3:
            var fromW = this.getNum(dom.style.left);
            var fromH = this.getNum(dom.style.top);
            fromW = fromW ? fromW : 0;
            fromH = fromH ? fromH : 0;
            var toW = fromW + changeWidth;
            var toH = fromH + changeHeight;

            this.lt_css.innerHTML =
                "@-webkit-keyframes change_leftAndTop{" +
                "from{ left:" + fromW +
                "px;top:" + fromH + "px;}" + "to{ left:" + toW +
                "px;top:" + toH + "px;}}";
            dom.style.webkitAnimation = "change_leftAndTop 1s";
            dom.style.left = toW + "px";
            dom.style.top = toH + "px";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, 1000);
            break;
        case 4:
            var fromW = this.getNum(dom.style.left);
            var fromH = this.getNum(dom.style.top);
            fromW = fromW ? fromW : 0;
            fromH = fromH ? fromH : 0;
            var toW = fromW + changeWidth;
            var toH = fromH + changeHeight;

            this.lt_css.innerHTML =
                "@-webkit-keyframes change_leftAndTop{" +
                "from{ left:" + fromW +
                "px;top:" + fromH + "px;}" + "to{ left:" + toW +
                "px;top:" + toH + "px;}}";
            dom.style.webkitAnimation = "change_leftAndTop " + time + "s";
            dom.style.left = toW + "px";
            dom.style.top = toH + "px";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, time * 1000);
            break;
        default:
    }
};

/**
 * 某个物体移动到的函数(重载+3)(支持同时多个动画进行的函数)
 * @param {HTMLElement} dom 要被移动的物体的js代号
 * @param {number} changeWidth 水平移动到的坐标
 * @param {number} changeHeight 纵向移动到的坐标(不输入默认横向移动)
 * @param {number} time 移动动画进行的时间(不输入默认一秒)
 */
lt_code.moveBoxTo = function (dom, changeWidth, changeHeight, time) {
    if (!this.lt_css) {
        console.log("特殊style样式空间不存在!");
        return;
    } else {
        if (dom.style.position === "static") {
            console.log("moveBox函数报错:此物件属性为static不能移动!");
            return;
        } else if (dom.style.position === "") {
            //dom.style.position = "absolute";
        }
    }
    switch (arguments.length) {
        case 2:
            var fromW = this.getNum(dom.style.left);
            fromW = !!fromW ? fromW : 0;
            var toW = changeWidth;

            this.lt_css.innerHTML +=
                "@-webkit-keyframes change_left" + this.variable.users_moveTo + "{" +
                "from{ left:" + fromW +
                "px;}" + "to{ left:" + toW + "px;}}";
            dom.style.webkitAnimation = "change_left" + this.variable.users_moveTo + " 1s";
            dom.style.left = toW + "px";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
                lt_code.clearAll();
            }, 1000);
            break;
        case 3:
            var fromW = this.getNum(dom.style.left);
            var fromH = this.getNum(dom.style.top);
            fromW = fromW ? fromW : 0;
            fromH = fromH ? fromH : 0;
            var toW = changeWidth;
            var toH = changeHeight;

            this.lt_css.innerHTML +=
                "@-webkit-keyframes change_leftAndTop" + this.variable.users_moveTo + "{" +
                "from{ left:" + fromW +
                "px;top:" + fromH + "px;}" + "to{ left:" + toW +
                "px;top:" + toH + "px;}}";
            dom.style.webkitAnimation = "change_leftAndTop" + this.variable.users_moveTo + " 1s";
            dom.style.left = toW + "px";
            dom.style.top = toH + "px";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
                lt_code.clearAll();
            }, 1000);
            break;
        case 4:
            var fromW = this.getNum(dom.style.left);
            var fromH = this.getNum(dom.style.top);
            fromW = fromW ? fromW : 0;
            fromH = fromH ? fromH : 0;
            var toW = changeWidth;
            var toH = changeHeight;

            this.lt_css.innerHTML +=
                "@-webkit-keyframes change_leftAndTop" + this.variable.users_moveTo + "{" +
                "from{ left:" + fromW +
                "px;top:" + fromH + "px;}" + "to{ left:" + toW +
                "px;top:" + toH + "px;}}";
            dom.style.webkitAnimation = "change_leftAndTop" + this.variable.users_moveTo + " " + time + "s";
            dom.style.left = toW + "px";
            dom.style.top = toH + "px";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
                lt_code.clearAll();
            }, time * 1000);
            break;
        default:
    }
    this.variable.users_moveTo++;
};

/**
 * 某个物体移动到的函数(重载+3)(改用css自带的函数,防止函数冲突)
 * @param {HTMLElement} dom 要被移动的物体的js代号
 * @param {number} changeWidth 水平移动到的坐标
 * @param {number} changeHeight 纵向移动到的坐标(不输入默认横向移动)
 * @param {number} time 移动动画进行的时间(不输入默认一秒)
 */
lt_code.moveBoxTo2 = function (dom, changeWidth, changeHeight, time) {
    if (dom.style.position === "static") {
        console.log("moveBox函数报错:此物件属性为static不能移动!");
        return;
    } else if (dom.style.position === "") {
        //dom.style.position = "absolute";
    }

    switch (arguments.length) {
        case 2:
            var toW = changeWidth;

            dom.style.transitionDuration = "1s";
            dom.style.left = toW + "px";
            break;
        case 3:
            var toW = changeWidth;
            var toH = changeHeight;

            dom.style.transitionDuration = "1s";
            dom.style.left = toW + "px";
            dom.style.top = toH + "px";
            break;
        case 4:
            var toW = changeWidth;
            var toH = changeHeight;

            dom.style.transitionDuration = time + "s";
            dom.style.left = toW + "px";
            dom.style.top = toH + "px";
            break;
        default:
            console.log("moveBoxTo2函数参数输入出错!");
    }
};

/**
 * 渐变移动进入(重载+3)
 * @param {HTMLElement} dom 要被移动的物体的js代号
 * @param {number} changeWidth 水平移动的距离
 * @param {number} changeHeight 纵向移动的距离(不输入默认横向移动)
 * @param {number} time 移动动画进行的时间(不输入默认一秒)
 */
lt_code.moveBoxShow = function (dom, changeWidth, changeHeight, time) {
    if (!this.lt_css) {
        console.log("特殊style样式空间不存在!");
        return;
    } else {
        if (dom.style.position === "static") {
            console.log("moveBoxShow函数报错:此物件属性为static不能移动!");
            return;
        } else if (dom.style.position === "") {
            //dom.style.position = "absolute";
        }
    }
    switch (arguments.length) {
        case 2:
            var fromW = this.getNum(dom.style.left);
            fromW = !!fromW ? fromW : 0;
            var toW = fromW + changeWidth;

            this.lt_css.innerHTML =
                "@-webkit-keyframes change_left{" +
                "from{ left:" + fromW +
                "px;opacity:0;}" + "to{ left:" + toW + "px;opacity:1;}}";
            dom.style.webkitAnimation = "change_left 1s";
            dom.style.left = toW + "px";
            dom.style.opacity = "1";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, 1000);
            break;
        case 3:
            var fromW = this.getNum(dom.style.left);
            var fromH = this.getNum(dom.style.top);
            fromW = fromW ? fromW : 0;
            fromH = fromH ? fromH : 0;
            var toW = fromW + changeWidth;
            var toH = fromH + changeHeight;

            this.lt_css.innerHTML =
                "@-webkit-keyframes change_leftAndTop{" +
                "from{ left:" + fromW +
                "px;top:" + fromH + "px;opacity:0;}" + "to{ left:" + toW +
                "px;top:" + toH + "px;opacity:1;}}";
            dom.style.webkitAnimation = "change_leftAndTop 1s";
            dom.style.left = toW + "px";
            dom.style.top = toH + "px";
            dom.style.opacity = "1";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, 1000);
            break;
        case 4:
            var fromW = this.getNum(dom.style.left);
            var fromH = this.getNum(dom.style.top);
            fromW = fromW ? fromW : 0;
            fromH = fromH ? fromH : 0;
            var toW = fromW + changeWidth;
            var toH = fromH + changeHeight;

            this.lt_css.innerHTML =
                "@-webkit-keyframes change_leftAndTop{" +
                "from{ left:" + fromW +
                "px;top:" + fromH + "px;opacity:0;}" + "to{ left:" + toW +
                "px;top:" + toH + "px;opacity:1;}}";
            dom.style.webkitAnimation = "change_leftAndTop " + time + "s";
            dom.style.left = toW + "px";
            dom.style.top = toH + "px";
            dom.style.opacity = "1";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, time * 1000);
            break;
        default:
            console.log("moveBoxShow函数输入出错!");
    }
};

/**
 * 渐变移动消失(重载+4)
 * @param {HTMLElement} dom 要被移动的物体的js代号
 * @param {number} changeWidth 水平移动的距离
 * @param {number} changeHeight 纵向移动的距离(不输入默认横向移动)
 * @param {number} time 移动动画进行的时间(不输入默认一秒)
 * @param {any} ISdisappear 是否让物件完全消失(不输入默认否)
 */
lt_code.moveBoxDisappear = function (dom, changeWidth, changeHeight, time, ISdisappear) {
    if (!this.lt_css) {
        console.log("特殊style样式空间不存在!");
        return;
    } else {
        if (dom.style.position === "static") {
            console.log("moveBoxShow函数报错:此物件属性为static不能移动!");
            return;
        } else if (dom.style.position === "") {
            //dom.style.position = "absolute";
        }
    }
    switch (arguments.length) {
        case 2:
            var fromW = this.getNum(dom.style.left);
            fromW = !!fromW ? fromW : 0;
            var toW = fromW + changeWidth;

            this.lt_css.innerHTML =
                "@-webkit-keyframes change_left{" +
                "from{ left:" + fromW +
                "px;opacity:1;}" + "to{ left:" + toW + "px;opacity:0;}}";
            dom.style.webkitAnimation = "change_left 1s";
            dom.style.left = toW + "px";
            dom.style.opacity = "0";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, 1000);
            break;
        case 3:
            var fromW = this.getNum(dom.style.left);
            var fromH = this.getNum(dom.style.top);
            fromW = fromW ? fromW : 0;
            fromH = fromH ? fromH : 0;
            var toW = fromW + changeWidth;
            var toH = fromH + changeHeight;

            this.lt_css.innerHTML =
                "@-webkit-keyframes change_leftAndTop{" +
                "from{ left:" + fromW +
                "px;top:" + fromH + "px;opacity:1;}" + "to{ left:" + toW +
                "px;top:" + toH + "px;opacity:0;}}";
            dom.style.webkitAnimation = "change_leftAndTop 1s";
            dom.style.left = toW + "px";
            dom.style.top = toH + "px";
            dom.style.opacity = "0";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, 1000);
            break;
        case 4:
            var fromW = this.getNum(dom.style.left);
            var fromH = this.getNum(dom.style.top);
            fromW = fromW ? fromW : 0;
            fromH = fromH ? fromH : 0;
            var toW = fromW + changeWidth;
            var toH = fromH + changeHeight;

            this.lt_css.innerHTML =
                "@-webkit-keyframes change_leftAndTop{" +
                "from{ left:" + fromW +
                "px;top:" + fromH + "px;opacity:1;}" + "to{ left:" + toW +
                "px;top:" + toH + "px;opacity:0;}}";
            dom.style.webkitAnimation = "change_leftAndTop " + time + "s";
            dom.style.left = toW + "px";
            dom.style.top = toH + "px";
            dom.style.opacity = "0";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, time * 1000);
            break;
        case 5:
            var fromW = this.getNum(dom.style.left);
            var fromH = this.getNum(dom.style.top);
            fromW = fromW ? fromW : 0;
            fromH = fromH ? fromH : 0;
            var toW = fromW + changeWidth;
            var toH = fromH + changeHeight;

            this.lt_css.innerHTML =
                "@-webkit-keyframes change_leftAndTop{" +
                "from{ left:" + fromW +
                "px;top:" + fromH + "px;opacity:1;}" + "to{ left:" + toW +
                "px;top:" + toH + "px;opacity:0;}}";
            dom.style.webkitAnimation = "change_leftAndTop " + time + "s";
            dom.style.left = toW + "px";
            dom.style.top = toH + "px";
            dom.style.opacity = "0";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
                if (ISdisappear) {
                    dom.style.display = "none";
                }
            }, time * 1000);
            break;
        default:
            console.log("moveBoxShow函数输入出错!");
    }
};

/**
 * 移动某个物体的函数(重载+3)(非线性)
 * @param {HTMLElement} dom 要被移动的物体的js代号
 * @param {number} changeWidth 水平移动的距离
 * @param {number} changeHeight 纵向移动的距离(不输入默认横向移动)
 * @param {number} time 移动动画进行的时间(不输入默认一秒)
 */
lt_code.moveBox2 = function (dom, changeWidth, changeHeight, time) {
    if (dom.style.position === "static") {
        console.log("moveBox函数报错:此物件属性为static不能移动!");
        return;
    } else if (dom.style.position === "") {
        dom.style.position = "absolute";
    }
    switch (arguments.length) {
        case 2:
            var fromW = this.getNum(dom.style.left);
            fromW = !!fromW ? fromW : 0;
            var toW = fromW + changeWidth;

            dom.style.left = toW + "px";
            dom.style.transition = "all 1s ease-out";
            setTimeout(function () {
                dom.style.transition = "";
            }, 1000);
            break;
        case 3:
            var fromW = this.getNum(dom.style.left);
            var fromH = this.getNum(dom.style.top);
            fromW = fromW ? fromW : 0;
            fromH = fromH ? fromH : 0;
            var toW = fromW + changeWidth;
            var toH = fromH + changeHeight;

            dom.style.left = toW + "px";
            dom.style.height = toH + "px";
            dom.style.transition = "all 1s ease-out";
            setTimeout(function () {
                dom.style.transition = "";
            }, 1000);
            break;
        case 4:
            var fromW = this.getNum(dom.style.left);
            var fromH = this.getNum(dom.style.top);
            fromW = fromW ? fromW : 0;
            fromH = fromH ? fromH : 0;
            var toW = fromW + changeWidth;
            var toH = fromH + changeHeight;

            dom.style.left = toW + "px";
            dom.style.height = toH + "px";
            dom.style.transition = "all " + time + "s ease-out";
            setTimeout(function () {
                dom.style.transition = "";
            }, time * 1000);
            break;
        default:
            console.log("moveBox2函数输入错误!");
    }
};

/**
 * 让某个物体脱离原有的束缚,能被鼠标吸引(暂时没有用处,废弃)
 * @param {HTMLElement} dom 要附上吸引属性的物体的代号
 * @param {number} time 被吸引的速度(不输入默认1)
 */
lt_code.makeNestleMouse = function (dom, time) {
    if (arguments.length === 0) {
        console.log("makeNestleMouse函数报错:没有输入值!");
        return;
    } else if (typeof (dom) !== "object") {
        console.log("makeNestltMouse函数报错:输入的dom值出错!");
        return;
    }

    dom.style.position = "absolute";

    var dom_width = this.getNum(dom.offsetWidth);
    var dom_height = this.getNum(dom.offsetHeight);
    var dom_left = this.getNum(dom.offsetLeft);
    var dom_top = this.getNum(dom.offsetTop);

    var ISonBody = false;
    document.body.onmouseover = function () {
        ISonBody = true;
    }
    document.body.onmouseout = function () {
        ISonBody = false;
    }
    setInterval(function () {
        if (ISonBody) {
            var e = event || window.event;
            if (!e) {
                console.log("makeNestleMouse函数报错:鼠标没有在当前文档上!");
            } else {
                switch (arguments.length) {
                    case 1:
                        if ((parseInt(dom.height / 2) + dom_top) !== e.clientY || (parseInt(dom.width / 2) + dom_left) !== e.clientX) {
                            dom.style.left = parseInt((e.clientX - parseInt(dom_width / 2) + dom_left) / 4);
                            dom.style.top = parseInt((e.clientY - parseInt(dom_height / 2) + dom_top) / 4);
                        }
                        break;
                    case 2:
                        if ((parseInt(dom.height / 2) + dom_top) !== e.clientY || (parseInt(dom.width / 2) + dom_left) !== e.clientX) {
                            dom.style.left = parseInt((e.clientX - parseInt(dom_width / 2) + dom_left) / 4);
                            dom.style.top = parseInt((e.clientY - parseInt(dom_height / 2) + dom_top) / 4);
                        }
                        break;
                    default:
                        console.log("makeNestleMouse函数出错:参数输入过多!");
                }
            }
        }
    }(time ? 1 : time) * 10);
};

/**
 * 使得某个物体脱离原有的束缚,可以被鼠标拖动(新增参数)(专项优化:体积超过屏幕的移动方式改变;前提:输入第二参数)
 * @param {HTMLElement} dom 要附上可拖动属性的物体的代号
 * @param {boolean} IsOnlyLeft 是否只能横向移动(true只能横向, false能纵向, 不输入默认全方向)
 */
lt_code.makeMoveBox2 = function (dom, IsOnlyLeft) {
    switch (arguments.length) {
        case 1: lt_code.makeMoveBox(dom);
            break;
        case 2:
            if (IsOnlyLeft) {
                var e;//鼠标位置
                var offLeft;

                //dom相关的属性
                var dom_left;
                dom.style.position = "absolute";//调整标签属性为绝对定位(为了移动)

                //显示器\屏幕相关属性
                var scrollWidth = window.screen.availWidth;

                //物体最多能移动到什么程度
                var max_width = scrollWidth - dom.offsetWidth;

                //鼠标按下时方框跟随鼠标移动
                dom.onmousedown = function (e) {
                    offLeft = dom.offsetLeft;
                    offLeft = e.clientX - offLeft;
                    document.onmousemove = function (e) {
                        e = event || document.event;
                        console.log(e);
                        var move_x = e.clientX - offLeft;
                        if (max_width < 0) {
                            move_x = move_x < max_width ? max_width : move_x;
                            dom.style.left = (move_x < 0 ? move_x : 0) + "px";
                        } else {
                            move_x = move_x > max_width ? max_width : move_x;
                            dom.style.left = (move_x > 0 ? move_x : 0) + "px";
                        }
                    };
                };

                //鼠标松开时方框停留
                dom.onmouseup = function () {
                    offLeft = 0;
                    document.onmousemove = function (e) {
                        e = 0;
                    };
                };

                //鼠标离开时方框停留
                dom.onmouseout = function () {
                    offLeft = 0;
                    document.onmousemove = function (e) {
                        e = 0;
                    };
                };
            } else {
                var e;//鼠标位置
                var offTop;

                //dom相关的属性
                var dom_top;
                dom.style.position = "absolute";//调整标签属性为绝对定位(为了移动)

                //显示器\屏幕相关属性
                var scrollHeight = window.screen.availHeight;

                //物体最多能移动到什么程度
                var max_height = scrollHeight - dom.offsetHeight;

                //鼠标按下时方框跟随鼠标移动
                dom.onmousedown = function (e) {
                    offTop = dom.offsetTop;
                    offTop = e.clientY - offTop;
                    document.onmousemove = function (e) {
                        e = event || document.body.event;
                        var move_y = e.clientY - offTop;
                        if (max_height < 0) {
                            move_y = move_y < max_height ? max_height : move_y;
                            dom.style.left = (move_y < 0 ? move_y : 0) + "px";
                        } else {
                            move_y = move_y > max_height ? max_height : move_y;
                            dom.style.left = (move_y > 0 ? move_y : 0) + "px";
                        }
                    };
                };

                //鼠标松开时方框停留
                dom.onmouseup = function () {
                    offTop = 0;
                    document.onmousemove = function (e) {
                        e = 0;
                    };
                };

                //鼠标离开时方框停留
                dom.onmouseout = function () {
                    offTop = 0;
                    document.onmousemove = function (e) {
                        e = 0;
                    };
                };
            }
            break;
        default:
            console.log("makeMoveBox2函数输入参数出错!");
    }
};

/**
 * 鼠标为光源(改变物体阴影)
 * @param {HTMLElement} dom 被改变阴影的对象
 * @param {event} e 鼠标参数
 * @param {string} colors 阴影的颜色
 * @param {number} boxShadow_z 阴影的偏移量(不输入默认5)
 * @param {number} moves 偏移量(输入百分比,默认10%)
 */
lt_code.mouseBoxShadow = function (dom, e, colors, boxShadow_z, moves) {
    //读取屏幕卷掉的高度
    var t = document.body.scrollTop || document.documentElement.scrollTop;

    switch (arguments.length) {
        case 3:

            //阴影的距离
            var boxShadow_x;
            var boxShadow_y;

            //定义阴影偏离和最大偏移量
            boxShadow_z = 5;
            moves = 0.1;

            //读取物件的中心位置
            var dom_x = dom.offsetLeft + dom.offsetWidth / 2;
            var dom_y = dom.offsetTop + dom.offsetHeight / 2;

            //计算阴影的距离
            boxShadow_x = dom_x - e.clientX;
            boxShadow_y = dom_y - e.clientY - t;

            //偏移计算
            boxShadow_x = boxShadow_x * moves;
            boxShadow_y = boxShadow_y * moves;

            //超出上限计算
            boxShadow_x = (parseInt((boxShadow_x > boxShadow_z ? boxShadow_z : boxShadow_x) * 100)) / 100;
            boxShadow_y = (parseInt((boxShadow_y > boxShadow_z ? boxShadow_z : boxShadow_y) * 100)) / 100;
            boxShadow_x = (parseInt((boxShadow_x < -boxShadow_z ? -boxShadow_z : boxShadow_x) * 100)) / 100;
            boxShadow_y = (parseInt((boxShadow_y < -boxShadow_z ? -boxShadow_z : boxShadow_y) * 100)) / 100;

            //赋值
            dom.style.boxShadow = boxShadow_x + "px " + boxShadow_y + "px " + boxShadow_z + "px " + colors;
            break;
        case 4:
            //阴影的距离
            var boxShadow_x;
            var boxShadow_y;

            //定义阴影偏离
            moves = 0.1;

            //读取物件的中心位置
            var dom_x = dom.offsetLeft + dom.offsetWidth / 2;
            var dom_y = dom.offsetTop + dom.offsetHeight / 2;

            //计算阴影的距离
            boxShadow_x = dom_x - e.clientX;
            boxShadow_y = dom_y - e.clientY - t;

            //偏移计算
            boxShadow_x = boxShadow_x * moves;
            boxShadow_y = boxShadow_y * moves;

            //超出上限计算
            boxShadow_x = (parseInt((boxShadow_x > boxShadow_z ? boxShadow_z : boxShadow_x) * 100)) / 100;
            boxShadow_y = (parseInt((boxShadow_y > boxShadow_z ? boxShadow_z : boxShadow_y) * 100)) / 100;
            boxShadow_x = (parseInt((boxShadow_x < -boxShadow_z ? -boxShadow_z : boxShadow_x) * 100)) / 100;
            boxShadow_y = (parseInt((boxShadow_y < -boxShadow_z ? -boxShadow_z : boxShadow_y) * 100)) / 100;

            //赋值
            dom.style.boxShadow = boxShadow_x + "px " + boxShadow_y + "px " + boxShadow_z + "px " + colors;
            break;
        case 5:

            //阴影的距离
            var boxShadow_x;
            var boxShadow_y;

            //moves计算
            moves = moves / 100;

            //读取物件的中心位置
            var dom_x = dom.offsetLeft + dom.offsetWidth / 2;
            var dom_y = dom.offsetTop + dom.offsetHeight / 2;

            //计算阴影的距离
            boxShadow_x = dom_x - e.clientX;
            boxShadow_y = dom_y - e.clientY - t;

            //偏移计算
            boxShadow_x = boxShadow_x * moves;
            boxShadow_y = boxShadow_y * moves;

            //超出上限计算
            boxShadow_x = (boxShadow_x > boxShadow_z ? boxShadow_z : boxShadow_x);
            boxShadow_y = (boxShadow_y > boxShadow_z ? boxShadow_z : boxShadow_y);
            boxShadow_x = (parseInt((boxShadow_x < -boxShadow_z ? -boxShadow_z : boxShadow_x) * 100)) / 100;
            boxShadow_y = (parseInt((boxShadow_y < -boxShadow_z ? -boxShadow_z : boxShadow_y) * 100)) / 100;

            //赋值
            dom.style.boxShadow = boxShadow_x + "px " + boxShadow_y + "px " + boxShadow_z + "px " + colors;
            break;
        default:
            console.log("mouseBoxShadow函数输入参数出错!");
    }
};

/**
 * 制作一个三维旋转的框(重载+3)(暂时不能使用)
 * @param {HTMLElement} dom 要进行三维旋转的对象
 * @param {number} changeSize 转角比例(百分比,不输入默认为10%)
 * @param {number} maxChange 最大旋转角(默认为6,输入最大值为12)
 * @param {number} doms 这是第几个三维旋转的框(不输入默认只有一个)
 */
lt_code.make3DBox = function (dom, changeSize, maxChange,doms) {
    if (dom) {
        /**储存旋转框内容的变量 */
        var dom_mean = dom.outerHTML;

        /**储存原本标签的id */
        var dom_id = dom.id;

        doms = doms ? doms : 1;

        //改变参数
        dom.setAttribute("id", "dom_father" + doms);
        dom = lt_code.getId("dom_father" + doms);

        //重写框架
        dom.innerHTML = dom_mean;

        //更新父标签参数
        dom.style.transformStyle = "preserve-3d";//3d大框
        dom.style.perspective = "1200px";//视觉距离(眼睛到屏幕的距离)

        /**再次读取出的子元素 */
        var child_dom = lt_code.getId(dom_id);

        //判断转角比例是否存在(并且计算为百分比)
        changeSize = !changeSize ? 0.1 : changeSize / 100;

        //判断最大转角是否存在
        maxChange = !maxChange ? 6 : (maxChange > 12 ? 12 : (maxChange < 0 ? 0 : maxChange));

        /**
         * 读取鼠标参数,并进行子元素旋转调整
         * @param {Event} e 鼠标参数
         */
        dom.onmousemove = function (e) {
            e = e || window.event;

            //console.log(e.clientX + " " + e.clientY);
            //console.log(changeSize + " " + maxChange);

            /**元素最中间距离左边的宽度 */
            var child_left = child_dom.offsetLeft + child_dom.offsetWidth / 2;
            /**元素最中间距离上面的高度 */
            var child_top = child_dom.offsetTop + child_dom.offsetHeight / 2;

            /**旋转变量X */
            var change_X = e.clientX - child_left;
            /**旋转变量Y */
            var change_Y = e.clientY - child_top;

            console.log(change_X + " " + change_Y);


            //计算转角
            change_X = change_X * changeSize;
            change_Y = change_Y * changeSize;
            change_X = change_X > maxChange ? maxChange : change_X;
            change_Y = change_Y > maxChange ? maxChange : change_Y;
            change_X = change_X < -maxChange ? -maxChange : change_X;
            change_Y = change_Y < -maxChange ? -maxChange : change_Y;

            //去除转角浮点后2位以后的数字
            change_X = parseInt(change_X * 100) / 100;
            change_Y = parseInt(change_Y * 100) / 100;

            console.log(change_X + " " + change_Y);

            //开始进行赋值计算
            child_dom.style.transform = "rotateX(" + change_X +
                ") rotateY(" + change_Y + ")";
        };
    } else {
        console.log("make3DBox函数参数输入错误!");
    }
};

/**
 * 暂时没有这个函数
 * @param {HTMLElement} dom 要成为3d照片的对象
 */
lt_code.make3DImg = function (dom) {

};



/**
 * 专门存放别人的代码
 */
lt_code.other = {};

/**
 * canvas画点线链接的图(重载+2)
 * @param {HTMLElement} dom 加入部分的代号(不写默认加入body)
 */
lt_code.other.CanvasDotsLines = function (dom) {
    if (arguments.length === 0) {
        document.body.innerHTML += "<canvas id=\"canvas\"></canvas>";
    } else if (arguments.length === 1) {
        if (typeof (dom) === "object") {
            dom.innerHTML += "<canvas id=\"canvas\"></canvas>";
        } else {
            if (this.getTage("canvas").length === 0) {
                console.log("otherCanvasDotsLines函数并没有找到已经提供的canvas画布!");
                return;
            }
        }
    } else {
        console.log("otherCanvasDotsLines函数参数输入错误!");
        return;
    }
    var Dots = function (speed, alpha) {
        // 画布相关
        this.canvas;
        this.ctx;

        // 绘制点相关
        this.x;
        this.y;
        this.r;
        this.a = alpha && alpha > 0 && alpha <= 1 ? alpha : .8;

        // 移动相关
        this.speed = speed && speed > 0 ? speed : 2;
        this.sx;
        this.sy;
        this.isMouseDot = 0;
    };

    Dots.prototype = {
        // 初始化点的方法 x/y为可选参数 为生成点的位置 不传则随机生成
        init: function (canvas, x, y, isMouseDot) {
            this.canvas = canvas;
            this.ctx = this.canvas.getContext('2d');

            this.x = x * 2 || Math.random() * this.canvas.width;
            this.y = y * 2 || Math.random() * this.canvas.height;
            this.r = Math.random() * 6; // 随机生成 <6 的半径值

            if (isMouseDot) this.isMouseDot = 1;

            // 随机确定点的移动速度与方向 速度值在 [-this.speed, this.speed) 之间 提高数值可加快速度
            this.sx = isMouseDot ? 0 : Math.random() * this.speed * 2 - this.speed;
            this.sy = isMouseDot ? 0 : Math.random() * this.speed * 2 - this.speed;

            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgba(255,255,255,' + this.a + ')';
            this.ctx.fill();
            this.ctx.closePath();
        },

        // 更新点位置
        update: function () {
            if (this.isMouseDot) return;

            this.x = this.x + this.sx;
            this.y = this.y + this.sy;

            // 点超出canvas范围时另其"重生"
            if (this.x < 0 || this.x > this.canvas.width) {
                this.init(this.canvas);
            }
            if (this.y < 0 || this.y > this.canvas.height) {
                this.init(this.canvas);
            }

            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgba(255,255,255,' + this.a + ')';
            this.ctx.fill();
            this.ctx.closePath();
        },

        // 跟踪鼠标的点的位置更新 x/y为鼠标位置
        mouseDot: function (x, y) {
            this.x = x * 2;
            this.y = y * 2;
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgba(255,255,255,' + this.a + ')';
            this.ctx.fill();
            this.ctx.closePath();
        }
    };

    function Wonder(opts) {

        var part = document.querySelector(opts.el),
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),

            partStyle = window.getComputedStyle(part, null),
            width = parseInt(partStyle.width),
            height = parseInt(partStyle.height),
            area = width * height, // canvas区域面积
            cssText = 'width: ' + width + 'px; height: ' + height + 'px;';

        canvas.setAttribute('style', cssText);
        canvas.width = (width * 2).toString();
        canvas.height = (height * 2).toString();

        part.appendChild(canvas);

        var dotsArr = [],
            dotsNum = opts.dotsNumber || parseInt(area / 10000),
            maxDotsNum = dotsNum * 2,
            overNum = 0, // 超出最大数量的点的数量
            dotsDistance = opts.lineMaxLength || 250; // 点之间产生连线的最大距离

        //生成点
        for (var i = 0; i < dotsNum; i++) {
            var dot = new Dots(opts.speed, opts.dotsAlpha);
            if (i < dotsNum - 1) {
                dot.init(canvas);
            } else {
                dot.init(canvas, 0, 0, 1);
            }
            dotsArr.push(dot);
        }

        //鼠标事件
        var clickWithNew = opts.clickWithDotsNumber || 5;
        document.addEventListener('click', createDot);
        function createDot(e) {
            var tx = e.pageX,
                ty = e.pageY;
            if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {

                for (var i = 0; i < clickWithNew; i++) {
                    var dot = new Dots(opts.speed, opts.dotsAlpha);
                    dotsArr.push(dot);
                    dotsNum += 1;
                    dot.init(canvas, tx, ty);
                }
            }
        };
        var mouseDot, mouseDotIndex;
        canvas.addEventListener('mouseenter', mouseDotEnter);
        canvas.addEventListener('mousemove', mouseDotMove);
        canvas.addEventListener('mouseleave', mouseDotLeave);
        function mouseDotEnter(e) {
            var tx = e.pageX,
                ty = e.pageY;
            dot.init(canvas, tx, ty, 1);
        };
        function mouseDotMove(e) {
            var tx = e.pageX,
                ty = e.pageY;
            if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {
                dot.mouseDot(tx, ty);
            }
        };
        function mouseDotLeave(e) {
            dot.init(canvas);
        }

        //动画与连线
        var requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame;
        requestAnimFrame(animateUpdate); // 兼容不同浏览器的requestAnimationFrame

        function animateUpdate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空canvas中原有的内容

            // 更新点的位置 数量超出最大值时舍弃旧的点
            if (dotsNum > maxDotsNum) {
                overNum = dotsNum - maxDotsNum;
            }

            for (var i = overNum; i < dotsNum; i++) {
                // if (dotsArr[i].isMouseDot) console.log('aaa')
                if (dotsArr[i]) dotsArr[i].update();
            }

            // 绘制连线
            for (var i = overNum; i < dotsNum; i++) {
                for (var j = i + 1; j < dotsNum; j++) {
                    // if (dotsArr[i].isMouseDot) console.log('bbb')
                    // if (dotsArr[j].isMouseDot) console.log('ccc')
                    var tx = dotsArr[i].x - dotsArr[j].x,
                        ty = dotsArr[i].y - dotsArr[j].y,
                        s = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
                    if (s < dotsDistance) {
                        ctx.beginPath();
                        ctx.moveTo(dotsArr[i].x, dotsArr[i].y);
                        ctx.lineTo(dotsArr[j].x, dotsArr[j].y);
                        ctx.strokeStyle = 'rgba(255,255,255,' + (dotsDistance - s) / dotsDistance + ')';
                        ctx.strokeWidth = 1;
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }

            requestAnimFrame(animateUpdate);
        }
    }


    var Main = function () {

        var dotsArr = [],
            dotsNum = 0,
            maxDotsNum = 0,
            overNum = 0, // 超出最大数量的点的数量
            dotsDistance = 250, // 点之间产生连线的最大距离

            canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),

            width = parseInt(document.documentElement.clientWidth),
            height = parseInt(window.screen.availHeight),
            area = width * height, // canvas区域面积
            cssText = 'width: ' + width + 'px; height: ' + height + 'px;position:absolute;z-index:-1;top:0;left:0';

        // 设置背景和canvas的宽高
        canvas.setAttribute('style', cssText);
        canvas.width = (width * 2).toString();
        canvas.height = (height * 2).toString();

        // 更具canvas面积动态确定初始化点的数量和最大数量
        dotsNum = parseInt(area / 6000);
        maxDotsNum = dotsNum * 2;

        //生成点
        for (var i = 0; i < dotsNum; i++) {
            var dot = new Dots();
            dotsArr.push(dot);
            dot.init(canvas);
        }

        //鼠标事件
        document.addEventListener('click', createDot);
        function createDot(e) {
            var tx = e.pageX,
                ty = e.pageY;
            if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {

                for (var i = 0; i < 5; i++) {
                    var dot = new Dots();
                    dotsArr.push(dot);
                    dotsNum += 1;
                    dot.init(canvas, tx, ty);
                }
            }
        };
        document.addEventListener('mousemove', moveDot);
        function moveDot(e) {

            var tx = e.pageX,
                ty = e.pageY;
            if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {
                dot.mouseDot(tx, ty);
            }
        };

        //动画与连线
        var requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame;
        requestAnimFrame(animateUpdate); // 兼容不同浏览器的requestAnimationFrame

        function animateUpdate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空canvas中原有的内容

            // 更新点的位置 数量超出最大值时舍弃旧的点
            if (dotsNum > maxDotsNum) {
                overNum = dotsNum - maxDotsNum;
            }

            for (var i = overNum; i < dotsNum; i++) {
                dotsArr[i].update();
            }

            // 绘制连线
            for (var i = overNum; i < dotsNum; i++) {
                for (var j = i + 1; j < dotsNum; j++) {
                    var tx = dotsArr[i].x - dotsArr[j].x,
                        ty = dotsArr[i].y - dotsArr[j].y,
                        s = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
                    if (s < dotsDistance) {
                        ctx.beginPath();
                        ctx.moveTo(dotsArr[i].x, dotsArr[i].y);
                        ctx.lineTo(dotsArr[j].x, dotsArr[j].y);
                        ctx.strokeStyle = 'rgba(255,255,255,' + (dotsDistance - s) / dotsDistance + ')';
                        ctx.strokeWidth = 1;
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }

            requestAnimFrame(animateUpdate);
        }
    }();
};

/**
 * canvas的三维点阵球图案(重载+2)(暂时还不能用)
 * @param {HTMLElement} dom 加入部分的代号(不写默认加入body)
 */
lt_code.other.CanvasBall = function (dom) {
    if (arguments.length === 0) {
        if (document.body.getElementsByTagName("canvas").length < 1) {
            document.body.innerHTML += "<canvas id=\"cas\"></canvas>";
            document.body.innerHTML += "<div id=\"stop_button\"></div>";
        }
    } else if (arguments.length === 1) {
        if (typeof (dom) === "object") {
            if (lt_code.getTage("canvas", dom).length < 1) {
                dom.innerHTML += "<canvas id=\"cas\"></canvas>";
                dom.innerHTML += "<div id=\"stop_button\"></div>";
            }
        } else {
            if (this.getTage("canvas").length === 0) {
                console.log("otherCanvasDotsLines函数并没有找到已经提供的canvas画布!");
                return;
            }
        }
    } else {
        console.log("otherCanvasDotsLines函数参数输入错误!");
        return;
    }
    var canvas = document.getElementById("cas"),
        ctx = canvas.getContext("2d"),
        vpx = canvas.width / 2,
        vpy = canvas.height / 2,
        Radius = 150,
        balls = [],
        angleX = Math.PI / 100,
        angleY = Math.PI / 100,
        button = lt_code.getId("stop_button");

    window.addEventListener("mousemove", function (event) {
        var x = event.clientX - canvas.offsetLeft - vpx - document.body.scrollLeft - document.documentElement.scrollLeft;
        var y = event.clientY - canvas.offsetTop - vpy - document.body.scrollTop - document.documentElement.scrollTop;
        angleY = -x * 0.0001;
        angleX = -y * 0.0001;
    });

    var Animation = function () {
        this.init();
    };
    Animation.prototype = {
        isrunning: false,
        init: function () {
            balls = [];
            var num = 500;
            for (var i = 0; i <= num; i++) {
                var k = -1 + (2 * (i + 1) - 1) / num;
                var a = Math.acos(k);
                var b = a * Math.sqrt(num * Math.PI);
                var x = Radius * Math.sin(a) * Math.cos(b);
                var y = Radius * Math.sin(a) * Math.sin(b);
                var z = Radius * Math.cos(a);
                var b = new ball(x, y, z, 1.5);
                balls.push(b);
                b.paint();
            }
        },
        start: function () {
            this.isrunning = true;
            animate();
        },
        stop: function () {
            this.isrunning = false;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rotateX();
        rotateY();
        balls.sort(function (a, b) {
            return b.z - a.z;
        })
        for (var i = 0; i < balls.length; i++) {
            balls[i].paint();
        }
        if (animation.isrunning) {
            if ("requestAnimationFrame" in window) {
                requestAnimationFrame(animate);
            }
            else if ("webkitRequestAnimationFrame" in window) {
                webkitRequestAnimationFrame(animate);
            }
            else if ("msRequestAnimationFrame" in window) {
                msRequestAnimationFrame(animate);
            }
            else if ("mozRequestAnimationFrame" in window) {
                mozRequestAnimationFrame(animate);
            }
        }
    }

    function rotateX() {
        var cos = Math.cos(angleX);
        var sin = Math.sin(angleX);
        for (var i = 0; i < balls.length; i++) {
            var y1 = balls[i].y * cos - balls[i].z * sin;
            var z1 = balls[i].z * cos + balls[i].y * sin;
            balls[i].y = y1;
            balls[i].z = z1;
        }
    }

    function rotateY() {
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);
        for (var i = 0; i < balls.length; i++) {
            var x1 = balls[i].x * cos - balls[i].z * sin;
            var z1 = balls[i].z * cos + balls[i].x * sin;
            balls[i].x = x1;
            balls[i].z = z1;
        }
    }

    var ball = function (x, y, z, r) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
        this.width = 2 * r;
    }

    ball.prototype = {
        paint: function () {
            var fl = 450 //焦距
            ctx.save();
            ctx.beginPath();
            var scale = fl / (fl - this.z);
            var alpha = (this.z + Radius) / (2 * Radius);
            ctx.arc(vpx + this.x, vpy + this.y, this.r * scale, 0, 2 * Math.PI, true);
            ctx.fillStyle = "rgba(255,255,255," + (alpha + 0.5) + ")"
            ctx.fill();
            ctx.restore();
        }
    }

    var animation = new Animation();
    animation.start();

    if (!!button) {
        button.onclick = function () {
            this.innerText === "开始" ? this.innerText = "停止" : this.innerText = "开始";
            this.innerText === "开始" ? animation.stop() : animation.start();
            ;
        }
    }
};

/**
 * 浮游粒子动画
 * @param {HTMLElement} dom_father 是否存放到某个位置(不输入默认为body)
 */
lt_code.other.PBoids = function (dom_father) {

    if (arguments.length === 0) {
        //document.body.style.backgroundColor = "black";
        document.body.style.overflow = "hidden";
        dom_father.innerHTML += "<canvas></canvas>";
        document.body.innerHTML += "<p id=\"pbods\">Click near Boids to disperse group.</p>";
    } else {
        //dom_father.style.backgroundColor = "black";
        dom_father.style.overflow = "hidden";
        dom_father.innerHTML += "<canvas></canvas>";
        dom_father.innerHTML += "<p id=\"pbods\">Click near Boids to disperse group.</p>";
    }
    document.head.innerHTML += "<style>#pbods{position: absolute;  bottom: 1em;  width: 100%;  color: rgba(255, 255, 255, 0.25);  text-align: center; pointer-events: none;  transition: opacity 1s ease-in-out;}canvas{z-index:-1}</style>";

    // start particle simulation
    simulate(
        '2d', {
            init: function () {

                this.spray(150, function () {
                    return [
                        null,
                        null,
                        Vector.create(
                            this.width * Math.random(),
                            this.height * Math.random()
                        ),
                        Vector.random(1),
                        .75 + (Math.random() * .5),
                        100 * Math.random(), [
                            this.behavior.cohesion(),
                            this.behavior.alignment(),
                            this.behavior.separation(),

                            this.behavior.limit(1 + Math.random()),

                            this.behavior.wrap(5),
                            this.behavior.move()
                        ]
                    ]
                });

            },
            tick: function () {

            },
            beforePaint: function () {
                this.clear();
            },
            paint: function (particle) {

                var p = particle.position;
                var v = particle.velocity;
                var s = particle.stimulated || 0;
                var l = particle.life;

                this.paint.circle(p.x, p.y, v.magnitudeSquared, 'hsla(' + v.angle + ',100%,50%,1)');

            },
            afterPaint: function () {
                // nothing
            },
            action: function (x, y) {

                // disperse if near
                this.particles.forEach(function (p) {

                    if (Vector.distanceSquared(p.position, {
                        x: x,
                        y: y
                    }) < 4000) {
                        p.velocity.randomize(100);
                        p.position.x += p.velocity.x;
                        p.position.y += p.velocity.y;
                    }

                });

            }
        }
    );

    setTimeout(() => {
        document.querySelector('p').style.opacity = 0;
    }, 3000);



    // "simulate" particle simulation logic
    /**
     * Constants
     */
    PI_2 = Math.PI / 2;
    PI_180 = Math.PI / 180;

    /**
     * Random
     */
    var Random = {
        between: function (min, max) {
            return min + (Math.random() * (max - min));
        }
    }


    function Vector(x, y) {
        this._x = x || 0;
        this._y = y || 0;
    }

    Vector.create = function (x, y) {
        return new Vector(x, y);
    };

    Vector.add = function (a, b) {
        return new Vector(a.x + b.x, a.y + b.y);
    };

    Vector.subtract = function (a, b) {
        return new Vector(a.x - b.x, a.y - b.y);
    };

    Vector.random = function (range) {
        var v = new Vector();
        v.randomize(range);
        return v;
    };

    Vector.distanceSquared = function (a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return dx * dx + dy * dy;
    };

    Vector.distance = function (a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    Vector.prototype = {
        get x() {
            return this._x;
        },
        get y() {
            return this._y;
        },
        set x(value) {
            this._x = value;
        },
        set y(value) {
            this._y = value;
        },
        get magnitudeSquared() {
            return this._x * this._x + this._y * this._y;
        },
        get magnitude() {
            return Math.sqrt(this.magnitudeSquared);
        },
        get angle() {
            return Math.atan2(this._y, this._x) * 180 / Math.PI;
        },
        clone: function () {
            return new Vector(this._x, this._y);
        },
        add: function (v) {
            this._x += v.x;
            this._y += v.y;
        },
        subtract: function (v) {
            this._x -= v.x;
            this._y -= v.y;
        },
        multiply: function (value) {
            this._x *= value;
            this._y *= value;
        },
        divide: function (value) {
            this._x /= value;
            this._y /= value;
        },
        normalize: function () {
            var magnitude = this.magnitude;
            if (magnitude > 0) {
                this.divide(magnitude);
            }
        },
        limit: function (treshold) {
            if (this.magnitude > treshold) {
                this.normalize();
                this.multiply(treshold);
            }
        },
        randomize: function (amount) {
            amount = amount || 1;
            this._x = amount * 2 * (-.5 + Math.random());
            this._y = amount * 2 * (-.5 + Math.random());
        },
        rotate: function (degrees) {
            var magnitude = this.magnitude;
            var angle = ((Math.atan2(this._x, this._y) * PI_HALF) + degrees) * PI_180;
            this._x = magnitude * Math.cos(angle);
            this._y = magnitude * Math.sin(angle);
        },
        flip: function () {
            var temp = this._y;
            this._y = this._x;
            this._x = temp;
        },
        invert: function () {
            this._x = -this._x;
            this._y = -this._y;
        },
        toString: function () {
            return this._x + ', ' + this._y;
        }
    };


    function Particle(id, group, position, velocity, size, life, behavior) {

        this._id = id || 'default';
        this._group = group || 'default';

        this._position = position || new Vector();
        this._velocity = velocity || new Vector();
        this._size = size || 1;
        this._life = Math.round(life || 0);

        this._behavior = behavior || [];

    }

    Particle.prototype = {
        get id() {
            return this._id;
        },
        get group() {
            return this._group;
        },
        get life() {
            return this._life;
        },
        get size() {
            return this._size;
        },
        set size(size) {
            this._size = size;
        },
        get position() {
            return this._position;
        },
        get velocity() {
            return this._velocity;
        },
        update: function (stage) {

            this._life++;

            var i = 0;
            var l = this._behavior.length;

            for (; i < l; i++) {
                this._behavior[i].call(stage, this);
            }

        },
        toString: function () {
            return 'Particle(' + this._id + ') ' + this._life + ' pos: ' + this._position + ' vec: ' + this._velocity;
        }
    };

    // setup DOM
    function simulate(dimensions, options) {

        // private vars
        var particles = [];
        var destroyed = [];
        var update = update || function () { };
        var stage = stage || function () { };
        var canvas;
        var context;

        if (!options) {
            console.error('"options" object must be defined');
            return;
        }

        if (!options.init) {
            console.error('"init" function must be defined');
            return;
        }

        if (!options.paint) {
            console.error('"paint" function must be defined');
            return;
        }

        if (!options.tick) {
            options.tick = function () { };
        }

        if (!options.beforePaint) {
            options.beforePaint = function () { };
        }

        if (!options.afterPaint) {
            options.afterPaint = function () { };
        }

        if (!options.action) {
            options.action = function () { };
        }

        if (document.readyState === 'interactive') {
            setup();
        } else {
            document.addEventListener('DOMContentLoaded', setup);
        }

        // resizes canvas to fit window dimensions
        function fitCanvas() {
            canvas.width = document.body.clientWidth
            canvas.height = document.body.clientHeight;
        }

        // create canvas for drawing
        function setup() {

            // create
            //canvas = document.createElement('canvas');
            //document.body.appendChild(canvas);
            canvas = lt_code.getTage('canvas', dom_father, 0);

            // correct canvas size on window resize
            window.addEventListener('resize', fitCanvas);

            // go
            go();
        }

        // canvas has been attached, let's go!
        function go() {

            // set initial canvas size
            fitCanvas();

            // get context for drawing
            context = canvas.getContext(dimensions);

            // simulation update loop
            function act() {

                // update particle states
                var i = 0;
                var l = particles.length;
                var p;
                for (; i < l; i++) {
                    particles[i].update(this);
                }

                // clean destroyed particles
                while (p = destroyed.pop()) {

                    do {

                        // has not been found in destroyed array?
                        if (p !== particles[i]) {
                            continue;
                        }

                        // remove particle
                        particles.splice(i, 1);

                    } while (i-- >= 0)
                }

                // repaint context
                options.beforePaint.call(this);

                // repaint particles
                i = 0;
                l = particles.length;
                for (; i < l; i++) {
                    options.paint.call(this, particles[i]);
                }

                // after particles have been painted
                options.afterPaint.call(this);
            }

            function tick() {

                // call update method, this allows for inserting particles later on
                options.tick.call(this);

                // update particles here
                act();

                // on to the next frame
                window.requestAnimationFrame(tick);

            }

            /**
             * API
             **/
            function clear() {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }

            function destroy(particle) {
                destroyed.push(particle);
            }

            function add(id, group, position, velocity, size, life, behavior) {
                particles.push(new Particle(id, group, position, velocity, size, life, behavior));
            }

            function spray(amount, config) {
                var i = 0;
                for (; i < amount; i++) {
                    add.apply(this, config());
                }
            }

            function debug(particle) {
                this.paint.circle(
                    particle.position.x,
                    particle.position.y,
                    particle.size,
                    'rgba(255,0,0,.75)'
                );
                context.beginPath();
                context.moveTo(particle.position.x, particle.position.y);
                context.lineTo(particle.position.x + (particle.velocity.x * 10), particle.position.y + (particle.velocity.y * 10));
                context.strokeStyle = 'rgba(255,0,0,.1)';
                context.stroke();
                context.closePath();
            }

            this.clear = clear;
            this.destroy = destroy;
            this.add = add;
            this.spray = spray;
            this.debug = debug;

            this.paint = {
                circle: function (x, y, size, color) {
                    context.beginPath();
                    context.arc(x, y, size, 0, 2 * Math.PI, false);
                    context.fillStyle = color;
                    context.fill();
                },
                square: function (x, y, size, color) {
                    context.beginPath();
                    context.rect(x - (size * .5), y - (size * .5), size, size);
                    context.fillStyle = color;
                    context.fill();
                }
            };

            this.behavior = {
                cohesion: function (range, speed) {
                    range = Math.pow(range || 100, 2);
                    speed = speed || .001;
                    return function (particle) {

                        var center = new Vector();
                        var i = 0;
                        var l = particles.length;
                        var count = 0;

                        if (l <= 1) {
                            return;
                        }

                        for (; i < l; i++) {

                            // don't use self in group
                            if (particles[i] === particle || Vector.distanceSquared(particles[i].position, particle.position) > range) {
                                continue;
                            }

                            center.add(Vector.subtract(particles[i].position, particle.position));
                            count++;
                        }

                        if (count > 0) {

                            center.divide(count);

                            center.normalize();
                            center.multiply(particle.velocity.magnitude);

                            center.multiply(.05);
                        }

                        particle.velocity.add(center);

                    }
                },
                separation: function (distance) {

                    distance = Math.pow(distance || 25, 2);

                    return function (particle) {

                        var heading = new Vector();
                        var i = 0;
                        var l = particles.length;
                        var count = 0;
                        var diff;

                        if (l <= 1) {
                            return;
                        }

                        for (; i < l; i++) {

                            // don't use self in group
                            if (particles[i] === particle || Vector.distanceSquared(particles[i].position, particle.position) > distance) {
                                continue;
                            }

                            // stay away from neighbours
                            diff = Vector.subtract(particle.position, particles[i].position);
                            diff.normalize();

                            heading.add(diff);
                            count++;
                        }

                        if (count > 0) {

                            // get average
                            heading.divide(count);

                            // make same length as current velocity (so particle won't speed up)
                            heading.normalize();
                            heading.multiply(particle.velocity.magnitude);

                            // limit force to make particle movement smoother
                            heading.limit(.1);
                        }

                        particle.velocity.add(heading);

                    }
                },
                alignment: function (range) {
                    range = Math.pow(range || 100, 2);
                    return function (particle) {

                        var i = 0;
                        var l = particles.length;
                        var count = 0;
                        var heading = new Vector();

                        if (l <= 1) {
                            return;
                        }

                        for (; i < l; i++) {

                            // don't use self in group also don't align when out of range
                            if (particles[i] === particle || Vector.distanceSquared(particles[i].position, particle.position) > range) {
                                continue;
                            }

                            heading.add(particles[i].velocity);
                            count++;
                        }

                        if (count > 0) {

                            heading.divide(count);
                            heading.normalize();
                            heading.multiply(particle.velocity.magnitude);

                            // limit
                            heading.multiply(.1);

                        }

                        particle.velocity.add(heading);

                    }
                },
                move: function () {
                    return function (particle) {
                        particle.position.add(particle.velocity);

                        // handle collisions?

                    }
                },
                eat: function (food) {
                    food = food || [];
                    return function (particle) {

                        var i = 0;
                        var l = particles.length;
                        var prey;

                        for (; i < l; i++) {

                            prey = particles[i];

                            // can't eat itself, also, needs to be tasty
                            if (prey === particle || food.indexOf(prey.group) === -1) {
                                continue;
                            }

                            // calculate force vector
                            if (Vector.distanceSquared(particle.position, neighbour.position) < 2 && particle.size >= neighbour.size) {
                                particle.size += neighbour.size;
                                destroy(neighbour);
                            }

                        }
                    }
                },
                force: function (x, y) {
                    return function (particle) {
                        particle.velocity.x += x;
                        particle.velocity.y += y;
                    }
                },
                limit: function (treshold) {
                    return function (particle) {
                        particle.velocity.limit(treshold);
                    }
                },
                attract: function (forceMultiplier, groups) {
                    forceMultiplier = forceMultiplier || 1;
                    groups = groups || [];
                    return function (particle) {

                        // attract other particles
                        var totalForce = new Vector(0, 0);
                        var force = new Vector(0, 0);
                        var i = 0;
                        var l = particles.length;
                        var distance;
                        var pull;
                        var attractor;
                        var grouping = groups.length;

                        for (; i < l; i++) {

                            attractor = particles[i];

                            // can't be attracted by itself or mismatched groups
                            if (attractor === particle || (grouping && groups.indexOf(attractor.group) === -1)) {
                                continue;
                            }

                            // calculate force vector
                            force.x = attractor.position.x - particle.position.x;
                            force.y = attractor.position.y - particle.position.y;
                            distance = force.magnitude;
                            force.normalize();

                            // the bigger the attractor the more force
                            force.multiply(attractor.size / distance);

                            totalForce.add(force);
                        }

                        totalForce.multiply(forceMultiplier);

                        particle.velocity.add(totalForce);
                    }
                },
                wrap: function (margin) {
                    return function (particle) {

                        // move around when particle reaches edge of screen
                        var position = particle.position;
                        var radius = particle.size * .5;

                        if (position.x + radius > canvas.width + margin) {
                            position.x = radius;
                        }

                        if (position.y + radius > canvas.height + margin) {
                            position.y = radius;
                        }

                        if (position.x - radius < -margin) {
                            position.x = canvas.width - radius;
                        }

                        if (position.y - radius < -margin) {
                            position.y = canvas.height - radius;
                        }

                    }
                },
                reflect: function (particle) {

                    return function () {

                        // bounce from edges
                        var position = particle.position;
                        var velocity = particle.velocity;
                        var radius = particle.size * .5;

                        if (position.x + radius > canvas.width) {
                            velocity.x = -velocity.x;
                        }

                        if (position.y + radius > canvas.height) {
                            velocity.y = -velocity.y;
                        }

                        if (position.x - radius < 0) {
                            velocity.x = -velocity.x;
                        }

                        if (position.y - radius < 0) {
                            velocity.y = -velocity.y;
                        }
                    }

                },
                edge: function (action) {
                    return function (particle) {

                        var position = particle.position;
                        var velocity = particle.velocity;
                        var radius = particle.size * .5;

                        if (position.x + radius > canvas.width) {
                            action(particle);
                        }

                        if (position.y + radius > canvas.height) {
                            action(particle);
                        }

                        if (position.x - radius < 0) {
                            action(particle);
                        }

                        if (position.y - radius < 0) {
                            action(particle);
                        }
                    }
                }
            };

            // public
            Object.defineProperties(this, {
                'particles': {
                    get: function () {
                        return particles;
                    }
                },
                'width': {
                    get: function () {
                        return canvas.width;
                    }
                },
                'height': {
                    get: function () {
                        return canvas.height;
                    }
                },
                'context': {
                    get: function () {
                        return context;
                    }
                }
            });

            // call init method so the scene can be setup
            options.init.call(this);

            // start ticking
            tick();

            // start listening to events
            var self = this;
            document.addEventListener('click', function (e) {
                options.action.call(self, e.pageX, e.pageY);
            });

        }

    }
};

/**
 * 火焰文字特效(重载+2)(不能使用)
 * @param {HTMLElement} dom_father 是否存放到某个位置(不输入默认为body)
 * @param {string} text 文字内容(不输入默认为skari)
 */
lt_code.other.fireText = function (dom_father, text) {
    if (arguments.length === 0) {
        document.body.innerHTML += "<div id=\"canvasContainer\"></div>";
    } else if (arguments.length === 1) {
        dom_father.innerHTML += '<div id="canvasContainer"></div>';
    } else if (arguments.length === 2) {
        dom_father.innerHTML += '<div id="canvasContainer"></div>';
        changeText2();
    } else {
        console.log("fireText函数参数输入错误!");
        return;
    }

    if (arguments.length === 0) {
        document.head.innerHTML += "<style>#canvasContainer{margin: 0px;width: 100 %;height: 100 %;}</style>";
    }

    // Hack by Spite

    function bargs(_fn) {
        var args = [];
        for (var n = 1; n < arguments.length; n++)
            args.push(arguments[n]);
        return function () { return _fn.apply(this, args); };
    }


    (function (window) {

        var Sakri = window.Sakri || {};
        window.Sakri = window.Sakri || Sakri;

        Sakri.MathUtil = {};

        //return number between 1 and 0
        Sakri.MathUtil.normalize = function (value, minimum, maximum) {
            return (value - minimum) / (maximum - minimum);
        };

        //map normalized number to values
        Sakri.MathUtil.interpolate = function (normValue, minimum, maximum) {
            return minimum + (maximum - minimum) * normValue;
        };

        //map a value from one set to another
        Sakri.MathUtil.map = function (value, min1, max1, min2, max2) {
            return Sakri.MathUtil.interpolate(Sakri.MathUtil.normalize(value, min1, max1), min2, max2);
        };


        Sakri.MathUtil.hexToRgb = function (hex) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        Sakri.MathUtil.getRandomNumberInRange = function (min, max) {
            return min + Math.random() * (max - min);
        };

        Sakri.MathUtil.getRandomIntegerInRange = function (min, max) {
            return Math.round(Sakri.MathUtil.getRandomNumberInRange(min, max));
        };


    }(window));


    //has a dependency on Sakri.MathUtil

    (function (window) {

        var Sakri = window.Sakri || {};
        window.Sakri = window.Sakri || Sakri;

        Sakri.Geom = {};

        //=========================================================
        //========================::POINT::=======================
        //=========================================================

        Sakri.Geom.Point = function (x, y) {
            this.x = isNaN(x) ? 0 : x;
            this.y = isNaN(y) ? 0 : y;
        };

        Sakri.Geom.Point.prototype.clone = function () {
            return new Sakri.Geom.Point(this.x, this.y);
        };

        Sakri.Geom.Point.prototype.update = function (x, y) {
            this.x = isNaN(x) ? this.x : x;
            this.y = isNaN(y) ? this.y : y;
        };


        //=========================================================
        //=====================::RECTANGLE::=====================
        //=========================================================

        Sakri.Geom.Rectangle = function (x, y, width, height) {
            this.update(x, y, width, height);
        };

        Sakri.Geom.Rectangle.prototype.update = function (x, y, width, height) {
            this.x = isNaN(x) ? 0 : x;
            this.y = isNaN(y) ? 0 : y;
            this.width = isNaN(width) ? 0 : width;
            this.height = isNaN(height) ? 0 : height;
        };

        Sakri.Geom.Rectangle.prototype.getRight = function () {
            return this.x + this.width;
        };

        Sakri.Geom.Rectangle.prototype.getBottom = function () {
            return this.y + this.height;
        };

        Sakri.Geom.Rectangle.prototype.getCenter = function () {
            return new Sakri.Geom.Point(this.getCenterX(), this.getCenterY());
        };

        Sakri.Geom.Rectangle.prototype.getCenterX = function () {
            return this.x + this.width / 2;
        };

        Sakri.Geom.Rectangle.prototype.getCenterY = function () {
            return this.y + this.height / 2;
        };

        Sakri.Geom.Rectangle.prototype.containsPoint = function (x, y) {
            return x >= this.x && y >= this.y && x <= this.getRight() && y <= this.getBottom();
        };


        Sakri.Geom.Rectangle.prototype.clone = function () {
            return new Sakri.Geom.Rectangle(this.x, this.y, this.width, this.height);
        };

        Sakri.Geom.Rectangle.prototype.toString = function () {
            return "Rectangle{x:" + this.x + " , y:" + this.y + " , width:" + this.width + " , height:" + this.height + "}";
        };


    }(window));



    /**
         * Created by sakri on 27-1-14.
         * has a dependecy on Sakri.Geom
         * has a dependecy on Sakri.BitmapUtil
         */

    (function (window) {

        var Sakri = window.Sakri || {};
        window.Sakri = window.Sakri || Sakri;

        Sakri.CanvasTextUtil = {};

        //returns the biggest font size that best fits into given width
        Sakri.CanvasTextUtil.getFontSizeForWidth = function (string, fontProps, width, canvas, fillStyle, maxFontSize) {
            if (!canvas) {
                canvas = document.createElement("canvas");
            }
            if (!fillStyle) {
                fillStyle = "#000000";
            }
            if (isNaN(maxFontSize)) {
                maxFontSize = 500;
            }
            var context = canvas.getContext('2d');
            context.font = fontProps.getFontString();
            context.textBaseline = "top";

            var copy = fontProps.clone();
            //console.log("getFontSizeForWidth() 1  : ", copy.fontSize);
            context.font = copy.getFontString();
            var textWidth = context.measureText(string).width;

            //SOME DISAGREEMENT WHETHER THIS SHOOULD BE WITH && or ||
            if (textWidth < width) {
                while (context.measureText(string).width < width) {
                    copy.fontSize++;
                    context.font = copy.getFontString();
                    if (copy.fontSize > maxFontSize) {
                        console.log("getFontSizeForWidth() max fontsize reached");
                        return null;
                    }
                }
            } else if (textWidth > width) {
                while (context.measureText(string).width > width) {
                    copy.fontSize--;
                    context.font = copy.getFontString();
                    if (copy.fontSize < 0) {
                        console.log("getFontSizeForWidth() min fontsize reached");
                        return null;
                    }
                }
            }
            //console.log("getFontSizeForWidth() 2  : ", copy.fontSize);
            return copy.fontSize;
        };


        //====================================================================================================
        //================::CANVAS TEXT PROPERTIES::=========================================
        //===============================================================

        Sakri.CanvasTextProperties = function (fontWeight, fontStyle, fontSize, fontFace) {
            this.setFontWeight(fontWeight);
            this.setFontStyle(fontStyle);
            this.setFontSize(fontSize);
            this.fontFace = fontFace ? fontFace : "sans-serif";
        };

        Sakri.CanvasTextProperties.NORMAL = "normal";
        Sakri.CanvasTextProperties.BOLD = "bold";
        Sakri.CanvasTextProperties.BOLDER = "bolder";
        Sakri.CanvasTextProperties.LIGHTER = "lighter";

        Sakri.CanvasTextProperties.ITALIC = "italic";
        Sakri.CanvasTextProperties.OBLIQUE = "oblique";


        Sakri.CanvasTextProperties.prototype.setFontWeight = function (fontWeight) {
            switch (fontWeight) {
                case Sakri.CanvasTextProperties.NORMAL:
                case Sakri.CanvasTextProperties.BOLD:
                case Sakri.CanvasTextProperties.BOLDER:
                case Sakri.CanvasTextProperties.LIGHTER:
                    this.fontWeight = fontWeight;
                    break;
                default:
                    this.fontWeight = Sakri.CanvasTextProperties.NORMAL;
            }
        };

        Sakri.CanvasTextProperties.prototype.setFontStyle = function (fontStyle) {
            switch (fontStyle) {
                case Sakri.CanvasTextProperties.NORMAL:
                case Sakri.CanvasTextProperties.ITALIC:
                case Sakri.CanvasTextProperties.OBLIQUE:
                    this.fontStyle = fontStyle;
                    break;
                default:
                    this.fontStyle = Sakri.CanvasTextProperties.NORMAL;
            }
        };

        Sakri.CanvasTextProperties.prototype.setFontSize = function (fontSize) {
            if (fontSize && fontSize.indexOf && fontSize.indexOf("px") > -1) {
                var size = fontSize.split("px")[0];
                fontProperites.fontSize = isNaN(size) ? 24 : size;//24 is just an arbitrary number
                return;
            }
            this.fontSize = isNaN(fontSize) ? 24 : fontSize;//24 is just an arbitrary number
        };

        Sakri.CanvasTextProperties.prototype.clone = function () {
            return new Sakri.CanvasTextProperties(this.fontWeight, this.fontStyle, this.fontSize, this.fontFace);
        };

        Sakri.CanvasTextProperties.prototype.getFontString = function () {
            return this.fontWeight + " " + this.fontStyle + " " + this.fontSize + "px " + this.fontFace;
        };

    }(window));


    window.requestAnimationFrame =
        window.__requestAnimationFrame ||
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        (function () {
            return function (callback, element) {
                var lastTime = element.__lastTime;
                if (lastTime === undefined) {
                    lastTime = 0;
                }
                var currTime = Date.now();
                var timeToCall = Math.max(1, 33 - (currTime - lastTime));
                window.setTimeout(callback, timeToCall);
                element.__lastTime = currTime + timeToCall;
            };
        })();

    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            init();
        }
    }, 10);

    //===========================
    //general properties for demo set up
    //===========================

    var canvas;
    var context;
    var canvasContainer;
    var htmlBounds;
    var bounds;
    var minimumStageWidth = 250;
    var minimumStageHeight = 250;
    var maxStageWidth = 1000;
    var maxStageHeight = 600;
    var resizeTimeoutId = -1;
    var stats;

    function init() {
        canvasContainer = document.getElementById("canvasContainer");
        window.onresize = resizeHandler;
        commitResize();
    }

    function getWidth(element) { return Math.max(element.scrollWidth, element.offsetWidth, element.clientWidth); }
    function getHeight(element) { return Math.max(element.scrollHeight, element.offsetHeight, element.clientHeight); }

    //avoid running resize scripts repeatedly if a browser window is being resized by dragging
    function resizeHandler() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        clearTimeout(resizeTimeoutId);
        clearTimeoutsAndIntervals();
        resizeTimeoutId = setTimeout(commitResize, 300);
    }

    function commitResize() {
        if (canvas) {
            canvasContainer.removeChild(canvas);
        }
        canvas = document.createElement('canvas');
        canvas.style.position = "absolute";
        context = canvas.getContext("2d");
        canvasContainer.appendChild(canvas);

        htmlBounds = new Sakri.Geom.Rectangle(0, 0, getWidth(canvasContainer), getHeight(canvasContainer));
        if (htmlBounds.width >= maxStageWidth) {
            canvas.width = maxStageWidth;
            canvas.style.left = htmlBounds.getCenterX() - (maxStageWidth / 2) + "px";
        } else {
            canvas.width = htmlBounds.width;
            canvas.style.left = "0px";
        }
        if (htmlBounds.height > maxStageHeight) {
            canvas.height = maxStageHeight;
            canvas.style.top = htmlBounds.getCenterY() - (maxStageHeight / 2) + "px";
        } else {
            canvas.height = htmlBounds.height;
            canvas.style.top = "0px";
        }
        bounds = new Sakri.Geom.Rectangle(0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (bounds.width < minimumStageWidth || bounds.height < minimumStageHeight) {
            stageTooSmallHandler();
            return;
        }

        var textInputSpan = document.getElementById("textInputSpan");
        textInputSpan.style.top = htmlBounds.getCenterY() + (bounds.height / 2) + 20 + "px";
        textInputSpan.style.left = (htmlBounds.getCenterX() - getWidth(textInputSpan) / 2) + "px";

        startDemo();
    }

    function stageTooSmallHandler() {
        var warning = "Sorry, bigger screen required :(";
        context.font = "bold normal 24px sans-serif";
        context.fillText(warning, bounds.getCenterX() - context.measureText(warning).width / 2, bounds.getCenterY() - 12);
    }




    //===========================
    //Demo specific properties
    //===========================

    var animating = false;
    var particles = [];
    var numParticles = 4000;
    var currentText = "SAKRI";
    var fontRect;
    var fontProperties = new Sakri.CanvasTextProperties(Sakri.CanvasTextProperties.BOLD, null, 100);
    var animator;
    var particleSource = new Sakri.Geom.Point();;
    var particleSourceStart = new Sakri.Geom.Point();
    var particleSourceTarget = new Sakri.Geom.Point();

    var redParticles = ["#fe7a51", "#fdd039", "#fd3141"];
    var greenParticles = ["#dbffa6", "#fcf8fd", "#99de5e"];
    var pinkParticles = ["#fef4f7", "#f2a0c0", "#fb3c78"];
    var yellowParticles = ["#fdfbd5", "#fff124", "#f4990e"];
    var blueParticles = ["#9ca2df", "#222a6d", "#333b8d"];

    var particleColorSets = [redParticles, greenParticles, pinkParticles, yellowParticles, blueParticles];
    var particleColorIndex = 0;

    var renderParticleFunction;
    var renderBounds;
    var particleCountOptions = [2000, 4000, 6000, 8000, 10000, 15000, 20000];
    var pixelParticleCountOptions = [10000, 40000, 60000, 80000, 100000, 150000];

    function clearTimeoutsAndIntervals() {
        animating = false;
    }

    function startDemo() {

        fontRect = new Sakri.Geom.Rectangle(Math.floor(bounds.x + bounds.width * .2), 0, Math.floor(bounds.width - bounds.width * .4), bounds.height);
        fontProperties.fontSize = 100;
        fontProperties.fontSize = Sakri.CanvasTextUtil.getFontSizeForWidth(currentText, fontProperties, fontRect.width, canvas);
        fontRect.y = Math.floor(bounds.getCenterY() - fontProperties.fontSize / 2);
        fontRect.height = fontProperties.fontSize;
        renderBounds = fontRect.clone();
        renderBounds.x -= Math.floor(canvas.width * .1);
        renderBounds.width += Math.floor(canvas.width * .2);
        renderBounds.y -= Math.floor(fontProperties.fontSize * .5);
        renderBounds.height += Math.floor(fontProperties.fontSize * .6);
        context.font = fontProperties.getFontString();

        createParticles();
        context.globalAlpha = globalAlpha;
        animating = true;
        loop();
    }


    function loop() {
        if (!animating) {
            return;
        }
        stats.tick();
        renderParticles();
        window.requestAnimationFrame(loop, canvas);
    }


    function createParticles() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText(currentText, fontRect.x, fontRect.y);
        var imageData = context.getImageData(fontRect.x, fontRect.y, fontRect.width, fontRect.height);
        var data = imageData.data;
        var length = data.length;
        var rowWidth = fontRect.width * 4;
        var i, y, x;

        particles = [];
        for (i = 0; i < length; i += 4) {
            if (data[i + 3] > 0) {
                y = Math.floor(i / rowWidth);
                x = fontRect.x + (i - y * rowWidth) / 4;
                particles.push(x);//x
                particles.push(fontRect.y + y);//y
                particles.push(x);//xOrigin
                particles.push(fontRect.y + y);//yOrigin
            }
        }

        //console.log(particles.length);
        context.clearRect(0, 0, canvas.width, canvas.height);

        //pre calculate random numbers used for particle movement
        xDirections = [];
        yDirections = [];
        for (i = 0; i < directionCount; i++) {
            xDirections[i] = -7 + Math.random() * 14;
            yDirections[i] = Math.random() * - 5;
        }
    }


    var xDirections, yDirections;
    //fidget with these to manipulate effect
    var globalAlpha = .11; //amount of trails or tracers
    var xWind = 0; //all particles x is effected by this
    var threshold = 60; //if a pixels red component is less than this, return particle to it's original position
    var amountRed = 25; //amount of red added to a pixel occupied by a particle
    var amountGreen = 12; //amount of green added to a pixel occupied by a particle
    var amountBlue = 1; //amount of blue added to a pixel occupied by a particle
    var directionCount = 100; //number of random pre-calculated x and y directions

    function renderParticles() {
        //fill renderBounds area with a transparent black, and render a nearly black text
        context.fillStyle = "#000000";
        context.fillRect(renderBounds.x, renderBounds.y, renderBounds.width, renderBounds.height);
        context.fillStyle = "#010000";
        context.fillText(currentText, fontRect.x, fontRect.y);

        var randomRed = amountRed - 5 + Math.random() * 10;
        var randomGreen = amountGreen - 2 + Math.random() * 4;

        var imageData = context.getImageData(renderBounds.x, renderBounds.y, renderBounds.width, renderBounds.height);
        var data = imageData.data;
        var rowWidth = imageData.width * 4;
        var index, i, length = particles.length;
        var d = Math.floor(Math.random() * 30);
        xWind += (-.5 + Math.random());//move randomly left or right
        xWind = Math.min(xWind, 1.5);//clamp to a maximum wind
        xWind = Math.max(xWind, -1.5);//clamp to a minimum wind
        for (i = 0; i < length; i += 4, d++) {

            particles[i] += (xDirections[d % directionCount] + xWind);
            particles[i + 1] += yDirections[d % directionCount];

            index = Math.round(particles[i] - renderBounds.x) * 4 + Math.round(particles[i + 1] - renderBounds.y) * rowWidth;

            data[index] += randomRed;
            data[index + 1] += randomGreen;
            data[index + 2] += amountBlue;

            //if pixels red component is below set threshold, return particle to orgin
            if (data[index] < threshold) {
                particles[i] = particles[i + 2];
                particles[i + 1] = particles[i + 3];
            }
        }
        context.putImageData(imageData, renderBounds.x, renderBounds.y);
    }



    var maxCharacters = 10;

    function changeText() {
        var textInput = document.getElementById("textInput");
        if (textInput.value && textInput.text !== "") {
            if (textInput.value.length > maxCharacters) {
                alert("Sorry, there is only room for " + maxCharacters + " characters. Try a shorter name.");
                return;
            }
            if (textInput.value.indexOf(" ") > -1) {
                alert("Sorry, no support for spaces right now :(");
                return;
            }
            currentText = textInput.value;
            clearTimeoutsAndIntervals();
            animating = false;
            setTimeout(commitResize, 100);
        }
    }

    function changeText2() {
        if (text !== "") {
            if (text.length > maxCharacters) {
                alert("Sorry, there is only room for " + maxCharacters + " characters. Try a shorter name.");
                return;
            }
            if (text.indexOf(" ") > -1) {
                alert("Sorry, no support for spaces right now :(");
                return;
            }
            currentText = text;
            clearTimeoutsAndIntervals();
            animating = false;
            setTimeout(commitResize, 100);
        }
    }

    function changeSettings() {
        clearTimeoutsAndIntervals();
        animating = false;
        setTimeout(commitResize, 100);
    }

    function setParticleNumberOptions(values) {
        var selector = document.getElementById("particlesSelect");
        if (selector.options.length > 0 && parseInt(selector.options[0].value) === values[0]) {
            return;
        }
        while (selector.options.length) {
            selector.remove(selector.options.length - 1);
        }
        for (var i = 0; i < values.length; i++) {
            selector.options[i] = new Option(values[i], values[i], i === 0, i === 0);
        }
    }
};







/**
 * 这里的代码最好少用(大量使用会导致帧数下降)
 */
lt_code.littleUse = {};

/**
 * 使得某个物体能自动调整宽度
 * @param {HTMLElement} dom 要调整的物体
 * @param {number} widths 宽度占比(百分比!)
 * @param {number} timer 刷新速度(不输入默认5,最快1)
 * @param {HTMLElement} dom_father 不输入则默认父级元素为body
 */
lt_code.littleUse.autoWidth = function (dom, widths, timer, dom_father) {
    switch (arguments.length) {
        case 2: setInterval(function () {
            dom.style.width = parseInt(document.body.offsetWidth * widths / 100) + "px";
        }, 50);
            break;
        case 3: setInterval(function () {
            dom.style.width = parseInt(document.body.offsetWidth * widths / 100) + "px";
        }, (timer < 1 ? 1 : timer) * 10);
            break;
        case 4: setInterval(function () {
            dom.style.width = parseInt(dom_father.offsetWidth * widths / 100) + "px";
        }, (timer < 1 ? 1 : timer) * 10);
            break;
        default:
            console.log("autoWidth函数输入参数出错!");
    }
};


/**
 * 使得某个物体能自动调整高度(虽然有这个函数但不怎么推荐使用)
 * @param {HTMLElement} dom 要调整的物体
 * @param {number} heights 高度占比(百分比!)
 * @param {number} timer 刷新速度(不输入默认5,最快1)
 * @param {HTMLElement} dom_father 不输入则默认父级元素为body
 */
lt_code.littleUse.autoHeight = function (dom, heights, timer, dom_father) {
    switch (arguments.length) {
        case 2: setInterval(function () {
            dom.style.height = parseInt(document.body.offsetheight * heights / 100) + "px";
        }, 50);
            break;
        case 3: setInterval(function () {
            dom.style.height = parseInt(document.body.offsetheight * heights / 100) + "px";
        }, (timer < 1 ? 1 : timer) * 10);
            break;
        case 4: setInterval(function () {
            dom.style.height = parseInt(dom_father.offsetheight * heights / 100) + "px";
        }, (timer < 1 ? 1 : timer) * 10);
            break;
        default:
            console.log("autoHeight函数输入参数出错!");
    }
};


/**
 * 尝试性代码
 */
lt_code.test = {};

/**
 * 实验性fullpage
 * 请用lt_for_page为分割页面的class名
 * @param {string[]} colors 背景颜色数组
 * @param {number} times 移动动画的播放时间
 * @param {boolean} useDaohang 是否使用导航
 * @param {number} types 导航样式
 * @param {string[]} pageName 每个页面的名字
 */
lt_code.test.fullpage = function (colors, times, useDaohang, types, pageName) {
    //设定body没有滚动条
    document.body.style.overflow = "hidden";

    //向页面里面丢入通用的样式空间
    document.head.innerHTML += "<style id='lt_for_fullpage'>*{padding:0;border:0;margin:0;}</style>";

    /**
     * fullpage专用样式表空间*/
    var pages_styles = lt_code.getId("lt_for_fullpage");

    //如果没有输入时间,则默认为一秒
    if (!times) {
        times = 1;
    }

    /**
     * 当前页面的页数
     * */
    var page_number = 0;

    /**
     * 接下来要翻到那一页
     * */
    var new_pages = 0;

    /**
     * 是否能进行翻页移动*/
    var canUseChange = false;

    //colors是否存在
    if (!colors) {
        colors = new Array();
    }

    /**
     * 读取窗口的高*/
    var height = window.innerHeight;
    /**
     * 读取窗口的宽*/
    var width = window.innerWidth;

    /**
     * 读取所有的目标对象*/
    var pages = lt_code.getClass("lt_for_page");

    //是否存在pages
    if (pages.length !== 0) {
        /**
         * 新建一个字符串数组用来储存所有page*/
        var useToPages = new Array();

        /**
         * 定义一个变量来存放pages的长度*/
        var pages_long = pages.length;

        //轮询每个page
        for (var i = 0; i < pages_long; i++) {
            //宽高赋值
            pages[0].style.width = width + "px";
            pages[0].style.height = height + "px";

            //设定不可超出宽高
            pages[0].style.overflow = "hidden";

            //对背景颜色进行赋值
            if (colors[i]) {
                pages[0].style.backgroundColor = colors[i];
            } else {
                pages[0].style.backgroundColor = "";
            }

            //储存所有的页面
            useToPages[i] = pages[0].outerHTML;

            //删除该页面
            document.body.removeChild(pages[0]);
        }

        //向body中丢入一个全新的div用来存放所有页面
        document.body.innerHTML = "<div id=\"lt_for_all_pages\"></div>" + document.body.innerHTML;

        /**
         * 读取特殊div空间
         */
        var lt_all_pages = lt_code.getId("lt_for_all_pages");

        //设置这个空间的属性
        lt_all_pages.style.width = width;
        lt_all_pages.style.height = height * pages_long;
        lt_all_pages.style.position = "absolute";
        lt_all_pages.style.top = 0;
        lt_all_pages.style.zIndex = -1;

        //向大空间注入所有页面
        for (var i = 0; i < useToPages.length; i++) {
            lt_all_pages.innerHTML += useToPages[i];
        }

        //重置pages
        pages = lt_code.getClass("lt_for_page");

        /**
         * 向上翻页的函数
         */
        var turn_up = function () {
            new_pages = page_number - 1;
            chackNewPage();
            turn_to();
        };

        /**
         * 延时启动canUseChange参数*/
        var change_canUseChange = function () {
            setTimeout(function () {
                canUseChange = true;
            }, times * 1000);
        };

        /**
         * 向下翻页的函数
         * */
        var turn_down = function () {
            new_pages = page_number + 1;
            chackNewPage();
            turn_to();
        };

        /**
         * 页面跳转的动画函数
         */
        var turn_to = function () {
            /**
             * 要移动到的高度*/
            var change_height = new_pages * height;
            //console.log(lt_all_pages);

            //移动
            changeHeight(lt_all_pages, -change_height);

            //更新参数
            page_number = new_pages;

        };

        /**
         * 防止冲突把函数重写到外面
         * @param {HTMLElement} dom htmlElement对象
         * @param {number} num 移动的数值
         */
        var changeHeight = function (dom, num) {
            //console.log("调用了" + dom + " " + num);
            lt_code.moveBoxTo2(dom, 0, num, times);
        };

        /**
         * 专门给外界调用的,用来调整new_page的函数
         * @param {number} num 要改变的页面值
         */
        lt_code.test.fullpage.change_page = function (num) {
            new_pages = num;
            turn_to();
            canUseChange = false;
            change_canUseChange();
        };

        /**
         * 检查newPage参数的函数*/
        var chackNewPage = function () {
            if (new_pages >= pages.length) {
                new_pages = pages.length - 1;
                canUseChange = true;
                //alert("已经翻到最后一页!");
            } else if (new_pages < 0) {
                new_pages = 0;
                canUseChange = true;
                //alert("已经翻到第一面!");
            }
        };

        /**
         * 检查当前的窗体宽高*/
        var chackWindow = function () {
            height = window.innerHeight;
            width = window.innerWidth;

            for (var i = 0; i < pages.length; i++) {
                pages[i].style.height = height + "px";
                pages[i].style.width = width + "px";
            }
        };

        /**
         * 鼠标滚轮事件
         * @param {Event} e 鼠标滚轮事件
         */
        window.onmousewheel = function (e) {
            //对e赋值
            e = e || window.event;
            chackWindow();
            if (e.wheelDelta && canUseChange) {
                if (lt_code.getNum(e.wheelDelta, 4) > 0) {
                    turn_up();
                } else {
                    turn_down();
                }
                canUseChange = false;
                //重置canUseChange参数
                change_canUseChange();
            }
        };

        /**
         * 丢导航栏函数
         * (暂时不能使用,会导致代码冲突)*/
        var innerDaohang = function () {
            document.body.innerHTML += "<div id='lt_for_pages_daohang'></div>";
            /**
             * 导航栏参数*/
            var lt_daohang_box = lt_code.getId("lt_for_pages_daohang");

            //判断导航样式是否存在(不存在则使用默认样式1)
            types = !types ? 1 : types;

            if (types === 1) {
                //设定导航栏样式框
                lt_daohang_box.style.width = "330px";
                lt_daohang_box.style.height = height + "px";
                lt_daohang_box.style.position = "absolute";
                lt_daohang_box.style.left = "-270px";

                //先丢入一个ul
                lt_daohang_box.innerHTML += "<ul id='lt_daohang_ul'></ul>";

                var lt_daohang_ul = lt_code.getId("lt_daohang_ul");

                //向导航栏里面丢导航
                for (var i = 0; i < pages.length; i++) {
                    lt_daohang_ul.innerHTML +=
                        "<li><a href='javascript:;' onclick=" +
                        "lt_code.test.fullpage.change_page(" +
                        i + ") class=\"lt_for_change_page\"></a></li>";
                }

                /**
                 * 读取每个导航按钮*/
                var each_daohang = lt_code.getClass("lt_for_change_page");

                //向专用样式空间中丢入导航按钮的样式
                pages_styles.innerHTML += "#lt_daohang_ul{list-style-type:none;border-right:1px solid #888;}" +
                    "#lt_daohang_ul li{width:80%;padding:10px;margin-top:10px;height:20px;border-radius:10px 0 0 10px;float:right;background-color:white;}" +
                    ".lt_for_change_page{text-decoration:none;color:black;float:right;}";

                //检查pageName是否存在
                pageName = !pageName ? new Array() : pageName;

                //轮询每个按钮丢入页面名称
                for (var i = 0; i < each_daohang.length; i++) {
                    each_daohang[i].innerHTML += "<b>" +
                        (!pageName[i] ? "第" + (i + 1) + "页" : pageName[i]) + "</b>";
                }
            }
        };

        /**
         * 窗体初始化*/
        window.onload = function () {
            //重置canUseChange参数    
            change_canUseChange();

            //setInterval(function () { console.log(canUseChange); }, 20);

            //判断是否使用导航
            if (useDaohang) {
                //innerDaohang();
            }
        };
    }
};

/**
 * 尝试把图片储存为base64
 * @param {sting} imgUrl 图片路径
 */
lt_code.test.imgToBase = function (imgUrl) {
    /**图片路径 */
    var img = imgUrl;

    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
        var dataURL = canvas.toDataURL("image/" + ext);
        return dataURL;
    }

    var image = new Image();
    image.src = img;
    image.onload = function () {
        var base64 = getBase64Image(image);
        console.log(base64);
    };
};




/*
 * 以下是废弃的代码
 * (并不一定永远不用)
 */

//废弃的重载代码
!function () {
    /*
bindMethod(lt_code.getClass, "find", function () {
    console.log(0);
});
bindMethod(lt_code.getClass, "find", function () {
    console.log(1);
});
bindMethod(lt_code.getClass, "find", function () {
    console.log(2);
});
function bindMethod(obj, name, fn) {
    var old = obj[name];//每个方法都会存在一个格子的old对象,产生了闭包
    obj[name] = function () {
        if (fn.length === arguments.length) {
            //这里的fn.length是方法定义参数的个数
            //和argunments.length传入的个数是两回事
            return fn.apply(this, arguments);
            //返回匿名函数,执行
        } else {
            return old.apply(this, arguments);
            //返回数组的方法,再次向上进行查找
        }
    }
}
lt_code.getClass.find();
lt_code.getClass.find(1);
lt_code.getClass.find(1, 2);
lt_code.getClass.find(1, 2,3);
*/

};
