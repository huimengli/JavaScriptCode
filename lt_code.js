/**
 * @file 帮助文档
 * @author 楼听[修改日期:2020年8月30日]
 * @version demo-16
 */

//向head里面丢一个特殊的style样式框
document.head.innerHTML += "<style id=\"lt_code_css\"></style>";

/**
 * 自制的代码
 * @param {...any} arg 输入参数
 */
var lt_code = function (...arg) {
    return lt_code.getAllType(arg, true);
}

/**关闭浏览器 */
lt_code.close = function () {
    window.close();
}

/**自制的类 */
lt_code.lt_dom = class {
    /**
     * 构造函数
     * @param {HTMLElement} dom 输入对象
     */
    constructor(dom) {
        /**内容对象 */
        this.dom = dom
    }

    /**
     * 获取子类
     * @param {number|string} [type] 获取方式
     * @return {HTMLCollection|HTMLElement}
     */
    child(type) {
        var all = this.dom.children;
        if (type == null) {
            return all;
        } else if (typeof (type) == "number") {
            return all[type];
        } else if (typeof (type) == "string") {
            return lt_code.getAll2(type, this.dom);
        } else {
            console.trace("参数输入错误");
        }
    }

    /**
     * 添加节点
     * @param {HTMLElement} dom 子节点
     */
    addChild(dom) {
        this.dom.appendChild(dom);
    }


};

/**
 * lt_code中创建的变量 
 */
lt_code.variable = {};

/**用来记录是否登录的参数 */
lt_code.variable.online = false;

/**lt_code的新名字 */
lt_code.variable.newName = "_";

/**随机值 */
lt_code.variable.random = (max, min, noF) => {
    var ret = 0;
    if (max) {
        if (min) {
            if (max < min) {
                ret = min;
            } else {
                ret = min + Math.random() * (max - min);
            }
        } else {
            ret = Math.random() * max;
        }
    } else {
        if (min) {
            ret = min + Math.random();
        } else {
            ret = Math.random();
        }
    }
    if (noF) {
        ret = lt_code.getNum(ret);
    }
    return ret;
};

/**
 * 添加子节点
 * @param {HTMLElement} dom 子节点
 * @param {HTMLElement} [domFather] 父节点
 */
lt_code.addChild = function (dom, domFather) {
    domFather = domFather ? domFather : lt_code.getAll();
    domFather.appendChild(dom);
};

/**
 * 删除子节点
 * @param {HTMLElement} dom 子节点
 * @param {HTMLElement} [domFather] 父节点
 */
lt_code.removeChild = function (dom, domFather) {
    domFather = domFather ? domFather : lt_code.getDomFather(dom);
    domFather.removeChild(dom);
};

/**网页的宽度 */
lt_code.variable.width = window.innerWidth;

/**网页的高度 */
lt_code.variable.height = window.innerHeight;

/**
 * 网页宽高是否改变
 * @return {boolean} 
 */
lt_code.variable.WHchange = function () {
    var oldW = lt_code.variable.width;
    var oldH = lt_code.variable.height;
    setInterval(function () {
        lt_code.variable.width = window.innerWidth;
        lt_code.variable.height = window.innerHeight;
        if (lt_code.variable.width != oldW || lt_code.variable.height != oldH) {
            oldW = lt_code.variable.width;
            oldH = lt_code.variable.height;
            lt_code.variable.WHchange = true;
        } else {
            lt_code.variable.WHchange = false;
        }
    }, 200);
    return false;
}();

/**
 * 网页的真正宽度
 */
lt_code.variable.Width = function () {
    var dir = document.getElementById("WidthAndHeight") ?
        function () {
            var ret = lt_code.getId("WidthAndHeight");
            ret.style.display = "block";
            return ret;
        }() :
        function () {
            var ret = lt_code.newDom("dir", {
                id: "WidthAndHeight", style: {
                    width: "100vw",
                    height: "100vh",
                    opacity: "0",
                    position: "fixed",
                    top: "0",
                    left: "0",
                }
            });
            lt_code.addChild(ret);
            return ret;
        }();
    var ret = dir.offsetWidth;
    dir.style.display = "none";
    return ret;
};

/**
 * 网页真正的高度
 */
lt_code.variable.Height = function () {
    var dir = document.getElementById("WidthAndHeight") ?
        function () {
            var ret = lt_code.getId("WidthAndHeight");
            ret.style.display = "block";
            return ret;
        }() :
        function () {
            var ret = lt_code.newDom("dir", {
                id: "WidthAndHeight", style: {
                    width: "100vw",
                    height: "100vh",
                    opacity: "0",
                    position: "fixed",
                    top: "0",
                    left: "0",
                }
            });
            lt_code.addChild(ret);
            return ret;
        }();
    var ret = dir.offsetHeight;
    dir.style.display = "none";
    return ret;
};

/**
 * 随机颜色
 * @param {number} [max] 颜色的最大值
 * @param {number} [min] 颜色的最小值
 * @return {string} 返回颜色
 */
lt_code.variable.roundColor = (max, min) => {
    var chat = 255;
    var r, g, b, return_value;
    if (!min && !max) {
        r = lt_code.variable.random() * 255 + 1;
        r = lt_code.getNum(r);
        g = lt_code.variable.random() * 255 + 1;
        g = lt_code.getNum(g);
        b = lt_code.variable.random() * 255 + 1;
        b = lt_code.getNum(b);
        return_value = "rgb(" + r + "," + g + "," + b + ")";
    } else if (min && !max) {
        chat -= min;
        r = lt_code.variable.random() * chat + min;
        r = lt_code.getNum(r);
        g = lt_code.variable.random() * chat + min;
        g = lt_code.getNum(g);
        b = lt_code.variable.random() * chat + min;
        b = lt_code.getNum(b);
        return_value = "rgb(" + r + "," + g + "," + b + ")";
    } else if (!min && max) {
        chat = max;
        min = 1;
        r = lt_code.variable.random() * chat + min;
        r = lt_code.getNum(r);
        g = lt_code.variable.random() * chat + min;
        g = lt_code.getNum(g);
        b = lt_code.variable.random() * chat + min;
        b = lt_code.getNum(b);
        return_value = "rgb(" + r + "," + g + "," + b + ")";
    } else {
        chat = max - min;
        r = lt_code.variable.random() * chat + min;
        r = lt_code.getNum(r);
        g = lt_code.variable.random() * chat + min;
        g = lt_code.getNum(g);
        b = lt_code.variable.random() * chat + min;
        b = lt_code.getNum(b);
        return_value = "rgb(" + r + "," + g + "," + b + ")";
    }
    return lt_code.color_change(return_value);
};

/**
 * 随机颜色(增加透明通道)
 * @param {number} max 颜色的最大值
 * @param {number} min 颜色的最小值
 * @param {number} alpha 透明度(没有则随机)
 * @return {string} 返回颜色
 */
lt_code.variable.roundRgba = (max, min, alpha) => {
    var chat = 255;
    var r, g, b, a, return_value;
    if (!min && !max && !alpha) {
        r = lt_code.variable.random() * 255 + 1;
        r = lt_code.getNum(r);
        g = lt_code.variable.random() * 255 + 1;
        g = lt_code.getNum(g);
        b = lt_code.variable.random() * 255 + 1;
        b = lt_code.getNum(b);
        a = Math.floor(lt_code.variable.random() * 10 + 1);
        a /= 10;
        return_value = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else if (min && !max && !alpha) {
        chat -= min;
        r = lt_code.variable.random() * chat + min;
        r = lt_code.getNum(r);
        g = lt_code.variable.random() * chat + min;
        g = lt_code.getNum(g);
        b = lt_code.variable.random() * chat + min;
        b = lt_code.getNum(b);
        a = Math.floor(lt_code.variable.random() * 10 + 1);
        a /= 10;
        return_value = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else if (!min && max && !alpha) {
        chat = max;
        min = 1;
        r = lt_code.variable.random() * chat + min;
        r = lt_code.getNum(r);
        g = lt_code.variable.random() * chat + min;
        g = lt_code.getNum(g);
        b = lt_code.variable.random() * chat + min;
        b = lt_code.getNum(b);
        a = Math.floor(lt_code.variable.random() * 10 + 1);
        a /= 10;
        return_value = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else if (min && max && !alpha) {
        chat = max - min;
        r = lt_code.variable.random() * chat + min;
        r = lt_code.getNum(r);
        g = lt_code.variable.random() * chat + min;
        g = lt_code.getNum(g);
        b = lt_code.variable.random() * chat + min;
        b = lt_code.getNum(b);
        a = Math.floor(lt_code.variable.random() * 10 + 1);
        a /= 10;
        return_value = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else if (!min && !max && alpha) {
        r = lt_code.variable.random() * 255 + 1;
        r = lt_code.getNum(r);
        g = lt_code.variable.random() * 255 + 1;
        g = lt_code.getNum(g);
        b = lt_code.variable.random() * 255 + 1;
        b = lt_code.getNum(b);
        a = alpha;
        return_value = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else if (min && !max && alpha) {
        chat -= min;
        r = lt_code.variable.random() * chat + min;
        r = lt_code.getNum(r);
        g = lt_code.variable.random() * chat + min;
        g = lt_code.getNum(g);
        b = lt_code.variable.random() * chat + min;
        b = lt_code.getNum(b);
        a = alpha;
        return_value = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else if (!min && max && alpha) {
        chat = max;
        min = 1;
        r = lt_code.variable.random() * chat + min;
        r = lt_code.getNum(r);
        g = lt_code.variable.random() * chat + min;
        g = lt_code.getNum(g);
        b = lt_code.variable.random() * chat + min;
        b = lt_code.getNum(b);
        a = alpha;
        return_value = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else {
        chat = max - min;
        r = lt_code.variable.random() * chat + min;
        r = lt_code.getNum(r);
        g = lt_code.variable.random() * chat + min;
        g = lt_code.getNum(g);
        b = lt_code.variable.random() * chat + min;
        b = lt_code.getNum(b);
        a = alpha;
        return_value = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }
    return return_value;
};

/**
 * 浏览器头部报文
 */
lt_code.variable.userAgent = () => window.navigator.userAgent;

/**
 * 浏览器信息
 */
lt_code.variable.browserInfo = function () {
    var is360 = false;
    var isIE = false;
    var isFirefox = false;
    var isChrome = false;
    var isEdge = false;
    var broName = 'Runing';
    var str = '';
    var strStart = 0;
    var strStop = 0;
    var arr = new Array();
    var temp = '';

    var userAgent = lt_code.variable.userAgent(); //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform

    /*alert(userAgent);*/

    //FireFox
    if (userAgent.indexOf('Firefox') != -1) {
        isFireFox = true;
        /*broName = 'FireFox浏览器';*/
        strStart = userAgent.indexOf('Firefox');
        temp = userAgent.substring(strStart);
        broName = temp.replace('/', ' 版本号')
    }

    //Edge
    if (userAgent.indexOf('Edge') != -1) {
        isEdge = true;
        /*broName = 'Edge浏览器';*/
        strStart = userAgent.indexOf('Edge');
        temp = userAgent.substring(strStart);
        broName = temp.replace('/', ' 版本号');
    }

    //IE浏览器
    if (userAgent.indexOf('NET') != -1 && userAgent.indexOf("rv") != -1) {
        isIE = true;
        /*broName = 'IE浏览器'; */
        strStart = userAgent.indexOf('rv');
        strStop = userAgent.indexOf(')');
        temp = userAgent.substring(strStart, strStop);
        broName = temp.replace('rv', 'IE').replace(':', ' 版本号');
    }

    //360极速模式可以区分360安全浏览器和360极速浏览器
    if (userAgent.indexOf('WOW') != -1 && userAgent.indexOf("NET") < 0 && userAgent.indexOf("Firefox") < 0) {
        if (navigator.javaEnabled()) {
            is360 = true;
            broName = '360安全浏览器-极速模式';
        } else {
            is360 = true;
            broName = '360极速浏览器-极速模式';
        }
    }

    //360兼容
    if (userAgent.indexOf('WOW') != -1 && userAgent.indexOf("NET") != -1 && userAgent.indexOf("MSIE") != -1 && userAgent.indexOf("rv") < 0) {
        is360 = true;
        broName = '360兼容模式';
    }

    //Chrome浏览器
    if (userAgent.indexOf('WOW') < 0 && userAgent.indexOf("Edge") < 0) {
        isChrome = true;
        /*broName = 'Chrome浏览器';*/
        strStart = userAgent.indexOf('Chrome');
        strStop = userAgent.indexOf(' Safari');
        temp = userAgent.substring(strStart, strStop);
        broName = temp.replace('/', ' 版本号');
    }

    return broName;
}();



/**
 * 字符串转utf-8
 * @param {any} s1
 */
lt_code.chineseToUtf8 = function (s1) {

    function Dec2Dig(n1) {
        var s = "";
        var n2 = 0;
        for (var i = 0; i < 4; i++) {
            n2 = Math.pow(2, 3 - i);
            if (n1 >= n2) {
                s += '1';
                n1 = n1 - n2;
            }
            else
                s += '0';

        }
        return s;

    }

    function Str2Hex(s) {
        var c = "";
        var n;
        var ss = "0123456789ABCDEF";
        var digS = "";
        for (var i = 0; i < s.length; i++) {
            c = s.charAt(i);
            n = ss.indexOf(c);
            digS += Dec2Dig(eval(n));

        }
        //return value;
        return digS;
    }

    function Hex2Utf8(s) {
        function Dig2Dec(s) {
            var retV = 0;
            if (s.length == 4) {
                for (var i = 0; i < 4; i++) {
                    retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
                }
                return retV;
            }
            return -1;
        }

        var retS = "";
        var tempS = "";
        var ss = "";
        if (s.length == 16) {
            tempS = "1110" + s.substring(0, 4);
            tempS += "10" + s.substring(4, 10);
            tempS += "10" + s.substring(10, 16);
            var sss = "0123456789ABCDEF";
            for (var i = 0; i < 3; i++) {
                retS += "%";
                ss = tempS.substring(i * 8, (eval(i) + 1) * 8);



                retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
                retS += sss.charAt(Dig2Dec(ss.substring(4, 8)));
            }
            return retS;
        }
        return "";
    }

    var s = escape(s1);
    var sa = s.split("%");
    var retV = "";
    if (sa[0] != "") {
        retV = sa[0];
    }
    for (var i = 1; i < sa.length; i++) {
        if (sa[i].substring(0, 1) == "u") {
            retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));

        }
        else retV += "%" + sa[i];
    }

    return retV;
};

/**
 * 产生一个新节点
 * @param {ElementTagNameMap} domName 节点类型(string)
 * @param {object} [attr] 节点属性
 */
lt_code.newDom = function (domName, attr) {
    var a = document.createElement(domName);
    for (var i in attr) {
        if (i == "style") {
            var styles = "";
            if (typeof (attr[i]) == "object") {
                for (var j in attr[i]) {
                    styles += j + ":" + attr[i][j] + ";";
                }
            } else {
                styles = attr[i];
            }
            a.setAttribute(i, styles);
        } else {
            a.setAttribute(i, attr[i]);
        }
    }
    return a;
};

/**
 * 获取画布对象
 * @param {HTMLCanvasElement} cas canvas画布
 * @param {String} [type] 获取类型
 * @returns {CanvasRenderingContext2D|WebGLRenderingContext}
 */
lt_code.getCtx = function (cas, type) {
    type = type == null ? "2d" : type;
    return cas.getContext(type);
}

/**
 * 获取结点确切位置数据
 * @param {HTMLElement} dom 结点
 */
lt_code.getClientRect = function (dom) {
    return dom.getClientRects()[0];
}

/**
 * 时间筛查
 * @param {Date} time
 */
lt_code.searchTime = function (time) {
    var cut = new Date().getTime() - time.getTime();
    var ret = null;
    if (cut < 60 * 1000 && cut > 0) {
        ret = "刚刚";
    } else if (cut < 60 * 60 * 1000) {
        ret = lt_code.getNum(cut / 1000 / 60) + "分钟前";
    } else if (cut < 24 * 60 * 60 * 1000) {
        ret = lt_code.getNum(cut / 1000 / 60 / 60) + "小时前";
    } else if (cut < 30 * 60 * 60 * 24 * 1000) {
        ret = lt_code.getNum(cut / 1000 / 60 / 60 / 24) + "天前";
    } else {
        ret = time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes();
    }
    return ret;
}

/**
 * utf-8转字符串(傻逼算法,这个算法有错误)
 * @param {any} szInput
 */
lt_code.utf8ToChinese = function (szInput) {
    var x, wch, wch1, wch2, uch = "", szRet = "";
    for (x = 0; x < szInput.length; x++) {
        if (szInput.charAt(x) == "%") {
            wch = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
            if (!wch) { break; }
            if (!(wch & 0x80)) {
                wch = wch;
            }
            else if (!(wch & 0x20)) {
                x++;
                wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
                wch = (wch & 0x1F) << 6;
                wch1 = wch1 & 0x3F;
                wch = wch + wch1;
            }
            else {
                x++;
                wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
                x++;
                wch2 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
                wch = (wch & 0x0F) << 12;
                wch1 = (wch1 & 0x3F) << 6;
                wch2 = (wch2 & 0x3F);
                wch = wch + wch1 + wch2;
            }
            szRet += String.fromCharCode(wch);
        }
        else {
            szRet += szInput.charAt(x);
        }
    }
    return (szRet);
}

/**
 * 获取网页url传参
 * @param {string} [href] 网址
 */
lt_code.getUrlData = function (href) {
    href = href || window.location.href;
    var urlData = "{}";
    if (/\?/.test(href)) {
        href = /\?(.+)/.exec(href)[1];
        var leftAndRight = [...href.matchAll(/([^&=]+)=([^&=]+)&?/g)];
        //for (var i = 0; i < leftAndRight.length; i++) {
        //    var str = '{"' + leftAndRight[i][1] + '":"' + leftAndRight[i][2] + '"}';
        //    urlData.push(JSON.parse(str));
        //}
        urlData = "{";
        for (var i = 0; i < leftAndRight.length; i++) {
            urlData +="\""+ leftAndRight[i][1] + "\":\"" + leftAndRight[i][2] + "\"";
            if (i<leftAndRight.length-1) {
                urlData += ",";
            }
        }
        urlData += "}";
    }
    return JSON.parse(urlData);
};

/**
 * 删除url中的参数(不跳转页面)
 * @param {string} [href] 网页网址
 * @param {string} [url] 新的网址
 */
lt_code.clearUrlData = function (href, url) {
    href = href || window.location.href;
    if (/\?/.test(href)) {
        href = href.slice(0, /\?/.exec(href).index);
        url = url || href;
        var state = { title: '', url: href };
        history.pushState(state, '', url);
    }
}

/**
 * 将内容拷贝到剪切板中
 * @param {string} value
 * @param {string} [valueName] 内容名称
 */
lt_code.setCopy = function (value,valueName) {
    var input = lt_code.newDom("input", {
        readonly: "readonly",
        value: value,
        type: "text",
        style: {
            width: "1px",
            height: "1px",
            position: "absolute",
            opacity:"0",
        },
    });
    lt_code.addChild(input);
    input.focus();
    input.setSelectionRange(0, -1);
    if (document.execCommand("Copy")) {
        alert("已将内容 " + (valueName == null ? value : valueName) + " 添加至剪切板");
    }
    lt_code.removeChild(input);
}

/**
 * 用来使得moveTo函数能重复使用的专有变量
 */
lt_code.variable.users_moveTo = 0;

/**用来给复数使用的通用变量 */
lt_code.variable.users = 1;

/**
 * 给其他函数调用并能被外界访问的鼠标高度
 */
lt_code.variable.scrollTop = 0;

/**实时刷新顶部的挂载 */
lt_code.top_run = setInterval(function () {
    lt_code.variable.scrollTop = document.body.scrollTop || document.documentElement.scrollTop || 0;
}, 20);

/**用来存放数字点阵字画的参数 */
lt_code.variable.digit =
    [
        [
            [0, 0, 1, 1, 1, 0, 0],
            [0, 1, 1, 0, 1, 1, 0],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [0, 1, 1, 0, 1, 1, 0],
            [0, 0, 1, 1, 1, 0, 0]
        ],//0
        [
            [0, 0, 0, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1]
        ],//1
        [
            [0, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],//2
        [
            [1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [0, 1, 1, 1, 1, 1, 0]
        ],//3
        [
            [0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 0],
            [0, 1, 1, 0, 1, 1, 0],
            [1, 1, 0, 0, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 1, 1, 1, 1]
        ],//4
        [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [0, 1, 1, 1, 1, 1, 0]
        ],//5
        [
            [0, 0, 0, 0, 1, 1, 0],
            [0, 0, 1, 1, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0],
            [1, 1, 0, 1, 1, 1, 0],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [0, 1, 1, 1, 1, 1, 0]
        ],//6
        [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 1, 1, 0, 0],
            [0, 0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0]
        ],//7
        [
            [0, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [0, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [0, 1, 1, 1, 1, 1, 0]
        ],//8
        [
            [0, 1, 1, 1, 1, 1, 0],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [0, 1, 1, 1, 0, 1, 1],
            [0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 1, 1, 0],
            [0, 0, 0, 1, 1, 0, 0],
            [0, 1, 1, 0, 0, 0, 0]
        ],//9
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]//:
    ];

/**用来存放匿名函数中的setInterval函数来被外界停止的参数变量 */
lt_code.variable.runer = new Array();

/**
 * 挂载增加
 * @param {number} num 挂载数字
 * @param {String} [name] 挂载注释
 */
lt_code.variable.addRun = function (num, name) {
    name = name ? name : "匿名事件";
    var newOne = { name: name, num: num };
    lt_code.variable.runer[lt_code.variable.runer.length] = newOne;
};

/**
 * 关闭挂载
 * @param {string} name 挂载名称
 */
lt_code.variable.delRun = function (name) {
    lt_code.variable.runer.forEach(function (e) {
        if (e.name == name) {
            clearInterval(e.num);
        }
    });
}

/**
 * 生成新UID
 * 33位(保留设计思路,但屏蔽此算法)
 * @param {string} [input] 输入
 */
lt_code.variable.newUID = function (input) {
    var d = new Date().getTime();
    input = !input ? "" : input.toString() ||
        lt_code.getNum(lt_code.variable.random(
            d)
        ).toString();
    input = lt_code.md5(input);
    input = [...input.matchAll(/[\d]/g)];
    input = function () {
        var ret = "";
        input.forEach(function (e) {
            ret += e[0];
        });
        return ret;
    }();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-yxxx0xxxy'.replace(/[xy]/g,
        function (c) {
            var r = lt_code.variable.random(1) < 0.5 ?
                (d + lt_code.variable.random(16)) % 16 | 0 :
                (input + lt_code.variable.random(16)) % 16 | 0;
            d = lt_code.getNum(d / 16);
            input = lt_code.getNum(input / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    return uuid;
};

/**
 * 生成新UUID
 * 标准32位
 * @param {any} [input] 输入
 */
lt_code.variable.newUUID = function (input) {
    input = input ? input : new Date().getTime().toString();
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
};

//屏蔽原有算法
lt_code.variable.newUID = lt_code.variable.newUUID;

/**
 * 清空所有lt_code里面所定义的变量的函数
 * 并且清空lt_code_css这个专用的样式空间
 * @param {number} types 输入1全部清空,并且停止所有挂载在runer上的setInterval函数
 */
lt_code.clearAll = function (types) {
    switch (arguments.length) {
        case 1:
            if (types === 1) {
                lt_code.variable.users_moveTo = 0;
                lt_code.variable.users = 1;
                for (var i in lt_code.variable.runer) {
                    clearInterval(lt_code.variable.runer[i].num);
                }
                lt_code.variable.runer = new Array();
                lt_code.lt_css.innerHTML = "";
            }
            break;
        default:
            lt_code.variable.users_moveTo = 0;
            lt_code.variable.users = 1;
            lt_code.variable.runer = new Array();
            lt_code.lt_css.innerHTML = "";
    }
};

/**用来存放正则的空间 */
lt_code.variable.regular = {};

/**获取一个汉字的正则 */
lt_code.variable.regular.getChinese = /^[\u4e00-\u9fa5]{1}/;

/**获取多个汉字的正则*/
lt_code.variable.regular.getChineseMore = /^[\u4e00-\u9fa5]+/;

/**读取邮箱的正则 */
lt_code.variable.regular.getEmall = /^[a-zA-Z0-9_\-]+\@[a-zA-Z0-9]+\.[a-z0-9]{2,6}/;

/**读取年月日的正则 */
lt_code.variable.regular.getYMD = /(\d{4}|\d{2})[\,|\-|\_|\/](1[0-2]|[0-9])[\,|\-|\_|\/]([0-2][0-9]|[0-3][0-1]|[0-9])/;

/**读取月份的正则 */
lt_code.variable.regular.getMounth = /1[0-2]|[0-9]/;

/**读取日期的正则(大月) */
lt_code.variable.regular.getDaty = /[0-2][0-9]|[0-3][0-1]|[0-9]/;




/**
 * 截取汉字的函数(重载+2)
 * @param {string} text 输入的字符串
 * @param {number|string} types 截取字符串的长度(默认截取一个)
 * @return {string} 返回字符串
 */
lt_code.getChinese = function (text, types) {
    /**用来返回返回值参数*/
    var value_return = "";
    switch (arguments.length) {
        case 1:
            value_return = lt_code.variable.regular.getChinese.exec(text)[0];
            return !value_return ? "没有找到汉字" : value_return;
        case 2:
            if (types === 0) {
                value_return = /^[\u4e00-\u9fa5]*/.exec(text)[0];
                return !value_return ? "没有找到汉字" : value_return;
            } else if (types === 1) {
                value_return = /^[\u4e00-\u9fa5]/.exec(text)[0];
                return !value_return ? "没有找到汉字" : value_return;
            } else if (types === "+") {
                value_return = /^[\u4e00-\u9fa5]+/.exec(text)[0];
                return !value_return ? "没有找到汉字" : value_return;
            } else if (types === "*") {
                value_return = /^[\u4e00-\u9fa5]*/.exec(text)[0];
                return !value_return ? "没有找到汉字" : value_return;
            } else {
                console.trace("getChinese函数暂时不支持该写法");

                return "";
            }
        default:
            console.trace("getChinese函数参数输入错误!");

            return "";
    }
};

/**
 * 获取对象的父类
 * @param {HTMLElement} dom 输入对象
 * @return {HTMLElement} 返回父类节点
 */
lt_code.getDomFather = function (dom) {
    return dom.parentNode;
};


/**恶搞性质的代码 */
lt_code.zBadCode = {};

/**
 * 改变所有的图片
 * @param {number} num 用哪张图片替换?
 */
lt_code.zBadCode.changeAllImg = function (num) {
    var all_img = lt_code.getTage("img");
    /**for函数使用的参数 */
    var i = 0;
    if (!num) {
        for (i = 0; i < all_img.length; i++) {
            all_img[i].setAttribute("src", lt_code.variable.images.headPortrait[0]);
        }
    } else if (num > lt_code.variable.images.headPortrait.length) {
        for (i = 0; i < all_img.length; i++) {
            all_img[i].setAttribute("src", lt_code.variable.images.headPortrait[lt_code.variable.images.headPortrait.length - 1]);
        }
    } else {
        for (i = 0; i < all_img.length; i++) {
            all_img[i].setAttribute("src", lt_code.variable.images.headPortrait[num]);
        }
    }
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
    var falseRet = () => {
        console.trace("getId函数没有输入值!");
        //console.trace(this);
        //console.trace(arguments.callee.caller.name);
    };
    return !document.getElementById(idName) ? falseRet() : document.getElementById(idName);
};

/**
 * 读取class所代表的dom(重载+4)
 * @param {string} className 输入class的名字 
 * @param {number} few 输入要读取的class里面的第几个
 * @param {HTMLElement} dom_father 要读取的父类代号
 * @param {boolean} useFew 是否使用few参数(默认使用)
 * @return {HTMLElement|HTMLElement[]} dom|doms
 */
lt_code.getClass = function (className, few, dom_father, useFew) {
    switch (arguments.length) {
        case 1: return document.getElementsByClassName(className);
        case 2: return document.getElementsByClassName(className)[few];
        case 3: return dom_father.getElementsByClassName(className)[few];
        case 4: if (useFew) {
            return dom_father.getElementsByClassName(className)[few];
        } else {
            return dom_father.getElementsByClassName(className);
        }
        default:
            if (arguments.length !== 0) {
                console.trace("getClass函数输入错误!");

            } else {
                console.trace("getClass函数没有输入值!");

            }
    }
};

/**
 * 读取所有标签所代表的dom(重载+4)
 * @param {string} tageName 输入标签名
 * @param {HTMLElement} dom_father 输入要读取的父元素(不输入默认全文档)
 * @param {number} few 输入要读取的tage里面的第几个(不输入默认返回数组)
 * @param {boolean} ISuseDom 是否使用dom参数(默认使用)
 * @return {HTMLElement|HTMLElement[]} dom|doms
 */
lt_code.getTage = function (tageName, dom_father, few, ISuseDom) {
    switch (arguments.length) {
        case 1:
            return document.getElementsByTagName(tageName);
        case 2:
            return dom_father.getElementsByTagName(tageName);
        case 3:
            return dom_father.getElementsByTagName(tageName)[few];
        case 4:
            if (ISuseDom) {
                return dom_father.getElementsByTagName(tageName)[few];
            } else {
                return document.getElementsByTagName(tageName)[few];
            }
        default:
            if (arguments.length !== 0) {
                console.trace("getTage函数输入错误!");

            } else {
                console.trace("getTage函数没有输入值!");

            }
    }
};

/**
 * 读取对象的函数(功能不强)(重载+4)(id:#)(class:.)
 * @param {string} name 输入的名称(可以是任何方式) 
 * @param {number} few 第几个
 * @param {HTMLElement} dom_father 父类名称
 * @param {boolean} useFew 是否使用few参数
 * @return {HTMLElement|HTMLCollection|void} 输出对象
 */
lt_code.getAll = function (name, few, dom_father, useFew) {
    /**读取对象的内容 */
    var value_read;
    /**正则读取到的数组 */
    var exec_value = new Array();
    /**用于返回的参数 */
    var return_value;
    if (arguments.length === 0) {
        return_value = document.body;
    } else if (arguments.length === 1) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read);
                }
            }
        }
    } else if (arguments.length === 2) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name, null, few, false);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                    console.trace("getAll函数读取id不需要输入few参数");

                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read, few);
                }
            }
        }
    } else if (arguments.length === 3) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name, dom_father, few);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                    console.trace("getAll函数读取id不需要输入few参数");

                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read, few, dom_father);
                }
            }
        }
    } else if (arguments.length === 4) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            if (useFew) {
                return_value = lt_code.getTage(name, dom_father, few);
            } else {
                return_value = lt_code.getTage(name, dom_father);
            }
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                    console.trace("getAll函数读取id不需要输入few参数");

                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read, few, dom_father);
                }
            }
        }
    } else {
        return_value = document.head;
    }

    if (return_value === null) {
        console.trace("getAll函数name参数输入错误!");

    } else if (return_value === undefined) {
        console.trace("本页面中没有找到此对象");

    } else if (return_value.length === 0) {
        console.trace("没有此对象|此页面中没有使用此对象");

    } else if (return_value.length === 1) {
        return_value = return_value[0];
    }

    return return_value;
};

/**
 * 读取对象的函数(稍微有些差别)(重载+4)(id:#)(class:.)
 * @param {string} name 输入的名称(可以是任何方式) 
 * @param {HTMLElement} dom_father 父类名称
 * @param {number} few 第几个
 * @param {boolean} useFather 是否使用dom_father参数
 * @return {HTMLElement|HTMLCollection|void} 输出对象
 */
lt_code.getAll2 = function (name, dom_father, few, useFather) {
    /**读取对象的内容 */
    var value_read;
    /**正则读取到的数组 */
    var exec_value = new Array();
    /**用于返回的参数 */
    var return_value;
    if (arguments.length === 0) {
        return_value = document.body;
    } else if (arguments.length === 1) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read);
                }
            }
        }
    } else if (arguments.length === 2) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name, dom_father);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                    console.trace("js不支持读取父类对象的子类id");

                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read, null, dom_father, false);
                }
            }
        }
    } else if (arguments.length === 3) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name, dom_father, few);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                    console.trace("getAll2函数读取id不需要输入few参数");

                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read, few, dom_father);
                }
            }
        }
    } else if (arguments.length === 4) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name, dom_father, few, useFather);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                    console.trace("getAll2函数读取id不需要输入few参数");

                } else if (exec_value[0] === ".") {
                    if (!useFather) {
                        return_value = lt_code.getClass(value_read, few);
                    } else {
                        return_value = lt_code.getClass(value_read, few, dom_father);
                    }
                }
            }
        }
    } else {
        return_value = document.head;
    }

    if (return_value === null) {
        console.trace("getAll2函数name参数输入错误!");

    } else if (return_value === undefined) {
        console.trace("本页面中没有找到此对象");

    } else if (return_value.length === 0) {
        console.trace("没有此对象|此页面中没有使用此对象");

    } else if (return_value.length === 1) {
        return_value = return_value[0];
    }

    return return_value;
};

/**
 * 读取对象的函数(增加一些功能)(重载+4)(id:#)(class:.)
 * @param {string} name 输入的名称(可以是任何方式) 
 * @param {number} few 第几个
 * @param {HTMLElement} dom_father 父类名称
 * @param {boolean} useFew 是否使用few参数
 * @return {HTMLElement|HTMLCollection|void|CSSStyleDeclaration} 输出对象
 */
lt_code.getAll3 = function (name, few, dom_father, useFew) {
    /**读取对象的内容 */
    var value_read;
    /**正则读取到的数组 */
    var exec_value = new Array();
    /**用于返回的参数 */
    var return_value;
    /**读取子类,父类,伪类选择器的正则 */
    var read_child = /\:\:|[\>\<\:]/;

    if (arguments.length === 0) {
        return_value = document.body;
    } else {
        if (!read_child.exec(name)) {
            if (arguments.length === 1) {
                exec_value = /\#?\.?/.exec(name);
                if (!exec_value || !exec_value[0]) {
                    return_value = lt_code.getTage(name);
                } else {
                    if (exec_value[0] === "#.") {
                        return_value = null;
                    } else {
                        value_read = name.replace(/\#?\.?/, "");
                        if (exec_value[0] === "#") {
                            return_value = lt_code.getId(value_read);
                        } else if (exec_value[0] === ".") {
                            return_value = lt_code.getClass(value_read);
                        }
                    }
                }
            } else if (arguments.length === 2) {
                exec_value = /\#?\.?/.exec(name);
                if (!exec_value || !exec_value[0]) {
                    return_value = lt_code.getTage(name, null, few, false);
                } else {
                    if (exec_value[0] === "#.") {
                        return_value = null;
                    } else {
                        value_read = name.replace(/\#?\.?/, "");
                        if (exec_value[0] === "#") {
                            return_value = lt_code.getId(value_read);
                            console.trace("getAll函数读取id不需要输入few参数");

                        } else if (exec_value[0] === ".") {
                            return_value = lt_code.getClass(value_read, few);
                        }
                    }
                }
            } else if (arguments.length === 3) {
                exec_value = /\#?\.?/.exec(name);
                if (!exec_value || !exec_value[0]) {
                    return_value = lt_code.getTage(name, dom_father, few);
                } else {
                    if (exec_value[0] === "#.") {
                        return_value = null;
                    } else {
                        value_read = name.replace(/\#?\.?/, "");
                        if (exec_value[0] === "#") {
                            return_value = lt_code.getId(value_read);
                            console.trace("getAll函数读取id不需要输入few参数");

                        } else if (exec_value[0] === ".") {
                            return_value = lt_code.getClass(value_read, few, dom_father);
                        }
                    }
                }
            } else if (arguments.length === 4) {
                exec_value = /\#?\.?/.exec(name);
                if (!exec_value || !exec_value[0]) {
                    if (useFew) {
                        return_value = lt_code.getTage(name, dom_father, few);
                    } else {
                        return_value = lt_code.getTage(name, dom_father);
                    }
                }
                else {
                    if (exec_value[0] === "#.") {
                        return_value = null;
                    } else {
                        value_read = name.replace(/\#?\.?/, "");
                        if (exec_value[0] === "#") {
                            return_value = lt_code.getId(value_read);
                            console.trace("getAll函数读取id不需要输入few参数");

                        } else if (exec_value[0] === ".") {
                            return_value = lt_code.getClass(value_read, few, dom_father);
                        }
                    }
                }
            } else {
                return_value = document.head;
            }
        } else {
            /**读取选择器的正则 */
            var read_select = new Array();
            read_select[0] = /([\.\#]?)([\w]+)?(\:\:|[\<\>\:])([\w]+)?([\<\>\:]+[\s\S]+)?/;
            read_select[1] = /([\.\#]?)([\w]+)?(\:\:|[\<\>\:])(.+)/;

            exec_value = read_select[1].exec(name);
            if (arguments.length === 1) {
                //获取父类
                if (exec_value[3] === "<") {
                    //单纯父类
                    if (!exec_value[4]) {
                        return_value = lt_code.getDomFather(
                            lt_code.getAll3(exec_value[1] + exec_value[2], 0)
                        );
                    }
                    //相邻对象
                    else {
                        return_value = lt_code.getAll3(exec_value[4], 0,
                            lt_code.getDomFather(
                                lt_code.getAll3(exec_value[1] + exec_value[2], 0)
                            )
                        );
                    }
                }
                //获取子类
                if (exec_value[3] === ">") {
                    //console.trace(exec_value[4]);
                    return_value = lt_code.getAll3(
                        exec_value[4], null,
                        lt_code.getAll3(exec_value[1] + exec_value[2], 0),
                        false
                    );
                }
                //获取伪类
                if (exec_value[3] === ":" || exec_value[3] === "::") {
                    return_value = document.defaultView.getComputedStyle(
                        lt_code.getAll3(exec_value[1] + exec_value[2], 0),
                        exec_value[3] + exec_value[4]
                    );
                }
            }
            if (arguments.length === 2) {
                //获取父类
                if (exec_value[3] === "<") {
                    //单纯父类
                    if (!exec_value[4]) {
                        return_value = lt_code.getDomFather(
                            lt_code.getAll3(exec_value[1] + exec_value[2], few)
                        );
                    }
                    //相邻对象
                    else {
                        return_value = lt_code.getAll3(exec_value[4], few,
                            lt_code.getDomFather(
                                lt_code.getAll3(exec_value[1] + exec_value[2], few)
                            ),
                            false
                        );
                    }
                }
                //获取子类
                if (exec_value[3] === ">") {
                    return_value = lt_code.getAll3(
                        exec_value[4], few,
                        lt_code.getAll3(exec_value[1] + exec_value[2], 0)
                    );
                }
                //获取伪类
                if (exec_value[3] === ":" || exec_value[3] === "::") {
                    return_value = document.defaultView.getComputedStyle(
                        lt_code.getAll3(exec_value[1] + exec_value[2], few),
                        exec_value[3] + exec_value[4]
                    );
                }
            }
            if (arguments.length === 3) {
                if (dom_father.item) {
                    dom_father = dom_father[0];
                }
                //获取子类
                if (exec_value[3] === ">") {
                    //console.trace(exec_value);
                    return_value = lt_code.getAll3(exec_value[4], few, dom_father);
                }
                //获取父类
                if (exec_value[3] === "<") {
                    //单纯父类
                    if (!exec_value[4]) {
                        return_value = lt_code.getDomFather(dom_father);
                    }
                    //获取同类
                    else {
                        return_value = lt_code.getAll3(
                            exec_value[4], few,
                            lt_code.getDomFather(dom_father)
                        );
                    }
                }
                //获取伪类
                if (exec_value[3] === ":" || exec_value[3] === "::") {
                    return_value = document.defaultView.getComputedStyle(
                        lt_code.getAll3(exec_value[4], few, dom_father)
                    );
                }
            }
            if (arguments.length === 4) {
                //console.trace(dom_father);
                if (dom_father.item) {
                    dom_father = dom_father[0];
                }
                //获取子类
                if (exec_value[3] === ">") {
                    return_value = lt_code.getAll3(exec_value[4], few,
                        lt_code.getAll3(exec_value[0] + exec_value[1], 0, dom_father)
                        , useFew);
                }
                //获取父类
                if (exec_value[3] === "<") {
                    //单纯父类
                    if (!exec_value[4]) {
                        return_value = lt_code.getDomFather(dom_father);
                    }
                    //获取同类
                    else {
                        return_value = lt_code.getAll3(
                            exec_value[4], few,
                            lt_code.getDomFather(dom_father),
                            useFew
                        );
                    }
                }
                //获取伪类
                if (exec_value[3] === ":" || exec_value[3] === "::") {
                    return_value = document.defaultView.getComputedStyle(
                        lt_code.getAll3(exec_value[4], few, dom_father)
                    );
                }
            }
            if (arguments.length > 4) {
                console.trace("getAll3选择子类函数暂时不支持其他参数");

            }
        }
    }

    if (return_value === null) {
        console.trace("getAll函数name参数输入错误!");

    } else if (return_value === undefined) {
        console.trace("本页面中没有找到此对象");

    } else if (return_value.length === 0) {
        console.trace("没有此对象|此页面中没有使用此对象");

    } else if (return_value.length === 1) {
        return_value = return_value[0];
    }

    return return_value;
};

/**
 * 读取对象的函数(未完成)
 * @param {string} htmldom 读取方式
 */
lt_code.getAll4 = function (htmldom) {
    var alldomtext = htmldom.split(" ");
    console.log(alldomtext);
    //var allDom = lt_code.getAll("*");
    var retdoms = [];
    var getText = /([^>\.#\{\}]*)(\{?[\d,]*\}?)([\.#]?[^>\.#\{\}]*)(\{?[\d,]*\}?)(>?)([^>\.#\{\}]*)(\{?[\d,]*\}?)([\.#]?[^>\.#\{\}]*)(\{?[\d,]*\}?)/
    for (var eachText in alldomtext) {
        var texts = getText.exec(eachText);
        console.log(texts);
        if (texts[5] == "") {
            if (texts[1] != "") {
                var allDom;
                if (texts[2] != "") {
                    allDom = document.getElementsByTagName(texts[1])[lt_code.getNum(texts[2])];
                }
                else {
                    allDom = document.getElementsByTagName(texts[1])[0];
                }
            }
        }
        else if (texts[5] == ">") {

        }
        else if (texts[5] == "<") {

        }
    }
};

/**
 * 分类取用
 * @param {any[]} arg
 * @param {boolean} useLtDom 是否使用lt_dom类
 */
lt_code.getAllType = function (arg, useLtDom) {
    /**返回值 */
    var ret;
    switch (arg.length) {
        case 1: ret = lt_code.getAll(arg[0]); break;
        case 2: ret = lt_code.getAll(arg[0], arg[1]); break;
        case 3: ret = lt_code.getAll(arg[0], arg[1], arg[2]); break;
        case 4: ret = lt_code.getAll(arg[0], arg[1], arg[2], arg[3]); break;
        case 5: switch (arg[4]) {
            case 1: ret = lt_code.getAll(arg[0], arg[1], arg[2], arg[3]); break;
            case 2: ret = lt_code.getAll2(arg[0], arg[1], arg[2], arg[3]); break;
            case 3: ret = lt_code.getAll3(arg[0], arg[1], arg[2], arg[3]); break;
            default: console.error("最后参数出错!");
        };
        default: console.error("参数数量出错!");
    }

    if (useLtDom) {
        if (ret.length) {
            ret = function () {
                var values = [];
                ret = Array.prototype.slice.call(ret);
                ret.forEach(function (e, i) {
                    values[i] = new lt_code.lt_dom(e);
                });
                return values;
            }();
        } else {
            ret = new lt_code.lt_dom(ret);
        }
    }
    return ret;
}


/**
 * 读取对象(输出动态数组)
 * @param {...any} arg
 * @returns {any[HTMLElement]|HTMLElement|void};
 */
lt_code.getAllToArray = function (...arg) {
    var ret;
    switch (arg.length) {
        case 1: ret = lt_code.getAll(arg[0]); break;
        case 2: ret = lt_code.getAll(arg[0], arg[1]); break;
        case 3: ret = lt_code.getAll(arg[0], arg[1], arg[2]); break;
        case 4: ret = lt_code.getAll(arg[0], arg[1], arg[2], arg[3]); break;
        case 5: switch (arg[4]) {
            case 1: ret = lt_code.getAll(arg[0], arg[1], arg[2], arg[3]); break;
            case 2: ret = lt_code.getAll2(arg[0], arg[1], arg[2], arg[3]); break;
            case 3: ret = lt_code.getAll3(arg[0], arg[1], arg[2], arg[3]); break;
            default: console.error("最后参数出错!");
        };
        default: console.error("参数数量出错!");
    }
    if (ret.length) {
        ret = Array.prototype.slice.call(ret);
    }
    return ret;
}

/**
 * 读取iframe内包含的window值(用于传值)
 * @param {string|HTMLIFrameElement} dom iframe框的id
 * @return {Window} 返回一个window(大概)
 */
lt_code.getIframeWindow = function (dom) {
    if (typeof (dom) == "string") {
        return lt_code.getAll(idName, 0).contentWindow;
    } else {
        return dom.contentWindow;
    }
};

/**
 * 获取iframe内部的对象
 * @param {HTMLElement} dom iframe对象
 * @param {string} name 要读取内部部件的名称
 * @return {HTMLElement|void} 返回对象
 */
lt_code.getIframe = function (dom, name) {
    var inner_value = dom.contentDocument.getElementsByTagName("body")[0];
    if (!inner_value) {
        console.trace("读取对象非iframe内联边框|没能读取到对象");

        return;
    }
    return lt_code.getAll2(name, inner_value);
};

/**
 * 获取json的长度
 * @param {JSON} json
 */
lt_code.getLength = function (json) {
    var ret = 0;
    for (var i in json) {
        ret++;
    }
    return ret;
};

/**
 * 读取的16进制(#xxx|#xxxxxx)的颜色值,转化为十进制(rgb())
 * 如果是十进制(rgb())的颜色值,则转化为16进制(#xxxxxx)
 * 如果读取的是(rgba()),则会进行暗色偏移(不推荐输入rgba())
 * @param {string} color 颜色的值(rgb()|#|rgba())
 * @return {string} 返回相对应的颜色
 */
lt_code.color_change = function (color) {
    /**返回值 */
    var return_value;
    /**读取颜色的数组 */
    var color_exec;
    /**颜色的正则 */
    var regular = /\#|[rgba]+/;
    /**储存正则之后每个量的数组 */
    var return_values = new Array();


    color_exec = regular.exec(color);

    if (!color_exec) {
        console.trace("color_change函数输入的颜色值不正确!");

    } else if (color_exec[0] === "#") {
        return_value = color.replace(/\#/, "");
        if (return_value.length === 3) {
            return_value = "rgb(" + (lt_code.from16To10(return_value[0]) * 16 +
                lt_code.from16To10(return_value[0])) + "," +
                (lt_code.from16To10(return_value[1]) * 16 +
                    lt_code.from16To10(return_value[1])) + "," +
                (lt_code.from16To10(return_value[2]) * 16 +
                    lt_code.from16To10(return_value[2])) + ")";
        } else if (return_value.length === 6) {
            return_value = "rgb(" + (lt_code.from16To10(return_value[0]) * 16 +
                lt_code.from16To10(return_value[1])) + "," +
                (lt_code.from16To10(return_value[2]) * 16 +
                    lt_code.from16To10(return_value[3])) + "," +
                (lt_code.from16To10(return_value[4]) * 16 +
                    lt_code.from16To10(return_value[5])) + ")";
        } else {
            console.trace("color_change函数#类颜色值输入位数不正确!");

            return_value = null;
        }
    } else if (color_exec[0] === "rgb") {
        return_value = /(\d+)\,(\d+)\,(\d+)/.exec(color);
        if (return_value.length === 4) {
            return_values = new Array();
            return_values[0] = "#";
            for (var i = 1; i < return_value.length; i++) {
                if (return_value[i] > 0 && return_value[i] < 256) {
                    return_values[i] = lt_code.getNum(return_value[i], 4);
                    return_values[i] = lt_code.from10To16(return_values[i]);
                } else {
                    console.trace("color_change函数rgb输入的第" + i + "个数值有误!");

                    return_values[i] = "00";
                }
            }
            for (var i = 1; i < return_values.length; i++) {
                return_values[i] = return_values[i].length === 1 ? "0" + return_values[i] : return_values[i];
            }
            return_value = return_values[0] + return_values[1] +
                return_values[2] + return_values[3];
        } else {
            console.trace("color_change函数,rgb()类颜色值输入错误");

            return_value = null;
        }
    } else if (color_exec[0] === "rgba") {
        return_value = /(\d+)\,(\d+)\,(\d+)\,(\d\.\d+|\d)/.exec(color);
        if (lt_code.getNum(return_value[4]) > 1) {
            console.trace("color_change函数rgba()类颜色输入alpha参数有误");

            return_value = null;
        } else {
            /**读取的透明值 */
            var alpha = lt_code.getNum(return_value[4] * 100) / 100;
            if (return_value.length === 5) {
                return_values = new Array();
                return_values[0] = "#";
                for (var i = 1; i < return_value.length - 1; i++) {
                    if (return_value[i] > 0 && return_value[i] < 256) {
                        //根据透明值减淡颜色
                        return_values[i] = lt_code.getNum(return_value[i], 4) * alpha;
                        return_values[i] = lt_code.getNum(return_values[i]);
                        return_values[i] = lt_code.from10To16(return_values[i]);
                    } else {
                        console.trace("color_change函数rgb输入的第" + i + "个数值有误!");

                        return_values[i] = "00";
                    }
                }
                for (var i = 1; i < return_values.length; i++) {
                    return_values[i] = return_values[i].length === 1 ? "0" + return_values[i] : return_values[i];
                }
                return_value = return_values[0] + return_values[1] +
                    return_values[2] + return_values[3];
            } else {
                console.trace("color_change函数,rgba()类颜色值输入值错误");

                return_value = null;
            }
        }
    }

    return return_value;
};

/**
 * 10进制转换为2进制
 * @param {number} num 输入的十进制的数值
 */
lt_code.from10To2 = function (num) {
    return num.toString(2);
};

/**
 * 二进制转换为十进制
 * @param {number} num
 */
lt_code.from2To10 = function (num) {
    return parseInt(num, 2);
}

/**
 * 10进制转换为16进制
 * @param {number|string} num 输入的十进制的数值
 * @returns {string} 返回的十六进制的数值
 */
lt_code.from10To16 = function (num) {
    if (typeof (num) === "string") {
        num = lt_code.getNum(num, 4);
    }
    return num.toString(16);
};

/**
 * 16进制转换为10进制
 * @param {string} num 输入的十进制的数值
 * @returns {number} 返回的十六进制的数值
 */
lt_code.from16To10 = function (num) {
    return parseInt(num, 16);
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
            dom.style.transitionDuration = timer + "s";
            dom.style.opacity = "1";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, timer * 1000);
            break;
        default:
            if (arguments.length !== 0) {
                console.trace("show函数输入错误!");
            } else {
                console.trace("show函数没有输入值!");
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
        case 2:
            dom.style.transitionDuration = timer + "s";
            dom.style.opacity = "0";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, timer * 950);
            break;
        case 3:
            if (typeof (ISwate) !== "boolean") {
                console.trace("disappear函数ISwate参数输入参数出错!");
            } else {
                if (ISwate) {
                    dom.style.transitionDuration = timer + "s";
                    dom.style.opacity = "0";
                    setTimeout(function () {
                        dom.style.display = "none";
                        dom.style.webkitAnimation = "";
                    }, timer * 950);
                }
            }
            break;
        default:
            if (arguments.length !== 0) {
                console.trace("disppear函数输入错误!");
            } else {
                console.trace("disppear函数没有输入值!");
            }
    }
};

/**
 * 获取数字的函数(重载+2)
 * @param {string} text 输入要筛选的字符串
 * @param {number} types 选择不同的方式读取(1,2正则读取,4能读取负数,5能读取小数)
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
                return parseInt(/^\D*(?=\d)/.exec(text));//暂不明白原理(无法使用)
            } else if (types === 3) {
                return parseInt(text.replace(/[^0-9]*/, ""));//移除一位非数字
            } else if (types === 4) {
                return parseInt(/-?[0-9]{1,}/i.exec(text));//读取一位到多位数字(可以读取负数)
            } else if (types === 5) {
                return parseFloat(/-?[\d]+\.?[\d]{0,}/.exec(text));//可以读取小数
            } else {
                console.trace("getNum函数,type参数输入错误!");
            }
            break;
        default:
            if (arguments.length !== 0) {
                console.trace("getNum函数输入错误!");
            } else {
                console.trace("getNum函数没有输入值!");
            }
    }
};

/**
 * 改变高度的函数(重载+2)(css自定义动画)
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
            default: console.trace("changeHeight函数输入的参数有误!");
        }
    } else {
        console.trace("特殊style空间不存在");
    }
};

/**
 * 改变高度的函数(重载+2)(css动画)
 * @param {HTMLElement} dom 代表要改变的物体的代号
 * @param {number} to 结束的高度
 * @param {number} timer 动画进行的时间(不输入默认1秒)
 */
lt_code.changeHeight2 = function (dom, to, timer) {
    switch (arguments.length) {
        case 2: dom.style.transitionDuration = "1s";
            dom.style.height = to + "px";
            setTimeout(function () {
                dom.style.transitionDuration = "";
            }, 1000);
            break;
        case 3: dom.style.transitionDuration = timer + "s";
            dom.style.height = to + "px";
            setTimeout(function () {
                dom.style.transitionDuration = "";
            }, timer * 1000);
            break;
        default: console.trace("changeHeight函数输入的参数有误!");
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
            default: console.trace("changeWidth函数输入的参数有误!");
        }
    } else {
        console.trace("特殊style空间不存在");
    }
};

/**
 * 改变宽度的函数(重载+2)(css动画)
 * @param {HTMLElement} dom 代表要改变的物体的代号
 * @param {number} to 结束的宽度
 * @param {number} timer 动画进行的时间(不输入默认1秒)
 */
lt_code.changeWidth2 = function (dom, to, timer) {
    switch (arguments.length) {
        case 2: dom.style.transitionDuration = "1s";
            dom.style.width = to + "px";
            setTimeout(function () {
                dom.style.transitionDuration = "";
            }, 1000);
            break;
        case 3: dom.style.transitionDuration = timer + "s";
            dom.style.width = to + "px";
            setTimeout(function () {
                dom.style.transitionDuration = "";
            }, timer * 1000);
            break;
        default: console.trace("changeWidth函数输入的参数有误!");
    }
};

/**
 * 改变宽度的函数(重载+2)(css动画,百分比)
 * @param {HTMLElement} dom 代表要改变的物体的代号
 * @param {number} to 结束的宽度(百分比)
 * @param {number} timer 动画进行的时间(不输入默认1秒)
 */
lt_code.changeWidth3 = function (dom, to, timer) {
    if (to > 100) {
        console.trace("changeWidth3警告:变动的百分比大于100%");
    }
    switch (arguments.length) {
        case 2: dom.style.transitionDuration = "1s";
            dom.style.width = to + "%";
            setTimeout(function () {
                dom.style.transitionDuration = "";
            }, 1000);
            break;
        case 3: dom.style.transitionDuration = timer + "s";
            dom.style.width = to + "%";
            setTimeout(function () {
                dom.style.transitionDuration = "";
            }, timer * 1000);
            break;
        default: console.trace("changeWidth函数输入的参数有误!");
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
                console.trace("changeColor函数输入的参数有误!");
        }
    } else {
        console.trace("特殊style空间不存在!");
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
                        console.trace("changeBoxShadow函数,types值输入错误!");
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
                        console.trace("changeBoxShadow函数,types值输入错误!");
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
                            console.trace("changeBoxShadow函数,types值输入错误!");
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
                            console.trace("changeBoxShadow函数,types值输入错误!");
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
                console.trace("changeBoxShadow函数参数输入错误！");
        }
    } else {
        console.trace("特殊style空间不存在!");
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
        console.trace("特殊style空间不存在!");
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
                case 5: console.trace("changeBigerSmaller函数在输入的doms内容里面没有立即读取到标签会判定为改变字号大小,无需输入第五个参数");
                    break;
                default:
                    console.trace("changeBigerSmaller函数输入的参数出错!");
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
                default: console.trace("changeBigerSmaller函数输入的参数出错!");
            }
        }
    }
};

/**
 * 使得某个物体脱离原有的束缚,可以被鼠标拖动
 * @param {HTMLElement} dom 要附上可拖动属性的物体的代号
 */
lt_code.makeMoveBox = function (dom) {
    var offLeft;
    var offTop;

    //dom相关的属性
    dom.style.position = "absolute";//调整标签属性为绝对定位(为了移动)
    //改标签的内容无法被选中(排除干扰)
    dom.style.Mozusers_moveToelect = "none";
    dom.style.users_moveToelect = "none";

    //显示器\屏幕相关属性
    var scrollHeight = window.screen.availHeight;
    var scrollWidth = window.screen.availWidth;

    //物体最多能移动到什么程度
    var max_width;
    var max_height;
    if (lt_code.getDomFather(dom) === lt_code.getAll()) {
        max_width = scrollWidth - dom.offsetWidth;
        max_height = scrollHeight - dom.offsetHeight;
    } else {
        max_width = lt_code.getDomFather(dom).offsetWidth - dom.offsetWidth;
        max_height = lt_code.getDomFather(dom).offsetHeight = dom.offsetHeight;
    }

    //鼠标按下时方框跟随鼠标移动
    dom.onmousedown = function (e) {
        offLeft = dom.offsetLeft;
        offLeft = e.clientX - offLeft;
        offTop = dom.offsetTop;
        offTop = e.clientY - offTop;
        if (lt_code.getDomFather(dom) === lt_code.getAll()) {
            max_width = scrollWidth - dom.offsetWidth;
            max_height = scrollHeight - dom.offsetHeight;
        } else {
            max_width = lt_code.getDomFather(dom).offsetWidth - dom.offsetWidth;
            max_height = lt_code.getDomFather(dom).offsetHeight = dom.offsetHeight;
        }
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
        console.trace("特殊style样式空间不存在!");
        return;
    } else {
        if (dom.style.position === "static") {
            console.trace("moveBox函数报错:此物件属性为static不能移动!");
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
        console.trace("特殊style样式空间不存在!");
        return;
    } else {
        if (dom.style.position === "static") {
            console.trace("moveBox函数报错:此物件属性为static不能移动!");
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
    if (!dom) {
        console.trace("moveBoxTo2函数报错:移动对象不存在!");
        return;
    } else if (dom.style.position === "static") {
        console.trace("moveBox函数报错:此物件属性为static不能移动!");
        return;
    } else if (dom.style.position === "") {
        //dom.style.position = "absolute";
    }

    switch (arguments.length) {
        case 2:
            var toW = changeWidth;

            dom.style.transitionDuration = "1s";
            dom.style.left = toW + "px";
            setTimeout(function () {
                dom.style.transitionDuration = "";
            }, 1000);
            break;
        case 3:
            var toW = changeWidth;
            var toH = changeHeight;

            dom.style.transitionDuration = "1s";
            dom.style.left = toW + "px";
            if (lt_code.moveBoxTo2.useBottom) {
                dom.style.bottom = toH + "px";
            } else {
                dom.style.top = toH + "px";
            }
            setTimeout(function () {
                dom.style.transitionDuration = "";
            }, 1000);
            break;
        case 4:
            var toW = changeWidth;
            var toH = changeHeight;

            dom.style.transitionDuration = time + "s";
            dom.style.left = toW + "px";
            if (lt_code.moveBoxTo2.useBottom) {
                dom.style.bottom = toH + "px";
            } else {
                dom.style.top = toH + "px";
            }
            setTimeout(function () {
                dom.style.transitionDuration = "";
            }, time * 1000);
            break;
        default:
            console.trace("moveBoxTo2函数参数输入出错!");
    }
};
//moveBoxTo2函数接口
/**使用bottom属性定位 */
lt_code.moveBoxTo2.useBottom = false;
//moveBoxTo2函数接口


/**
 * 渐变移动进入(重载+3)
 * @param {HTMLElement} dom 要被移动的物体的js代号
 * @param {number} changeWidth 水平移动的距离
 * @param {number} changeHeight 纵向移动的距离(不输入默认横向移动)
 * @param {number} time 移动动画进行的时间(不输入默认一秒)
 */
lt_code.moveBoxShow = function (dom, changeWidth, changeHeight, time) {
    if (!this.lt_css) {
        console.trace("特殊style样式空间不存在!");
        return;
    } else {
        if (dom.style.position === "static") {
            console.trace("moveBoxShow函数报错:此物件属性为static不能移动!");
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
            console.trace("moveBoxShow函数输入出错!");
    }
};

/**
 * 渐变移动消失(重载+4)
 * @param {HTMLElement} dom 要被移动的物体的js代号
 * @param {number} changeWidth 水平移动的距离
 * @param {number} changeHeight 纵向移动的距离(不输入默认横向移动)
 * @param {number} time 移动动画进行的时间(不输入默认一秒)
 * @param {boolean} ISdisappear 是否让物件完全消失(不输入默认否)
 */
lt_code.moveBoxDisappear = function (dom, changeWidth, changeHeight, time, ISdisappear) {
    if (!this.lt_css) {
        console.trace("特殊style样式空间不存在!");
        return;
    } else {
        if (dom.style.position === "static") {
            console.trace("moveBoxShow函数报错:此物件属性为static不能移动!");
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
            console.trace("moveBoxShow函数输入出错!");
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
        console.trace("moveBox函数报错:此物件属性为static不能移动!");
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
            console.trace("moveBox2函数输入错误!");
    }
};

/**
 * 让某个物体脱离原有的束缚,能被鼠标吸引(暂时没有用处,废弃)
 * @param {HTMLElement} dom 要附上吸引属性的物体的代号
 * @param {number} time 被吸引的速度(不输入默认1)
 */
lt_code.makeNestleMouse = function (dom, time) {
    if (arguments.length === 0) {
        console.trace("makeNestleMouse函数报错:没有输入值!");
        return;
    } else if (typeof (dom) !== "object") {
        console.trace("makeNestltMouse函数报错:输入的dom值出错!");
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
                console.trace("makeNestleMouse函数报错:鼠标没有在当前文档上!");
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
                        console.trace("makeNestleMouse函数出错:参数输入过多!");
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
                        console.trace(e);
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
            console.trace("makeMoveBox2函数输入参数出错!");
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

    //父类物件数据
    var clintRect = lt_code.getDomFather(dom).getClientRects()[0];

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
            boxShadow_x = dom_x - e.clientX + clintRect.left;
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
            boxShadow_x = dom_x - e.clientX + clintRect.left;
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
            boxShadow_x = dom_x - e.clientX + clintRect.left;
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
            console.trace("mouseBoxShadow函数输入参数出错!");
    }
};

/**
 * 制作一个三维旋转的框(重载+3)
 * @param {HTMLElement} dom 要进行三维旋转的对象
 * @param {number} changeSize 转角比例(百分比,不输入默认为10%)
 * @param {number} maxChange 最大旋转角(默认为6,输入最大值为12)
 * @param {number} doms 这是第几个三维旋转的框(不输入默认只有一个)
 */
lt_code.make3DBox = function (dom, changeSize, maxChange, doms) {
    if (dom) {
        /**储存旋转框内容的变量 */
        var dom_mean = dom.outerHTML;

        if (doms !== 0) {
            doms = doms ? doms : 1;
        }

        dom.id = !dom.id ? "dom" + doms : dom.id;

        /**储存原本标签的id */
        var dom_id = dom.id;

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

            //console.trace(e.clientX + " " + e.clientY);
            //console.trace(changeSize + " " + maxChange);

            /**元素最中间距离左边的宽度 */
            var child_left = child_dom.offsetLeft + child_dom.offsetWidth / 2;
            /**元素最中间距离上面的高度 */
            var child_top = child_dom.offsetTop + child_dom.offsetHeight / 2;

            /**旋转变量X */
            var change_X = e.clientX - child_left;
            /**旋转变量Y */
            var change_Y = e.clientY - child_top;

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

            //开始进行赋值计算
            child_dom.style.transform = "rotateX(" + -change_Y +
                "deg) rotateY(" + change_X + "deg)";
        };
    } else {
        console.trace("make3DBox函数参数输入错误!");
    }
};

/**
 * 暂时没有这个函数
 * @param {HTMLElement} dom 要成为3d照片的对象
 */
lt_code.make3DImg = function (dom) {

};

/**
 * 让部件能够在鼠标经过时旋转角度的函数(未完成)
 * @param {HTMLElement} dom 要被旋转的部件(只允许传入有id的)
 * @param {number} trunDeg 旋转角
 * @param {number} type 旋转样式(1:转x轴;2:转y轴;3转z轴;默认转y轴)
 */
lt_code.make3DImgTrun = function (dom, trunDeg, type) {
    if (dom.id.length === 0) {
        console.trace("make3DImgTrun函数没有找到对象的id");
    } else {
        switch (arguments.length) {
            case 2:
                var dom_mean = dom.innerHTML;
                var canChange_trun = true;
                var dom_id = dom.id;
                dom.innerHTML = "<div id =\"" + dom_id + "\"></div>";
                dom.setAttribute("id", "dom_father");
                dom = lt_code.getId("dom_father");
                var dom_child = lt_code.getId(dom_id);
                dom.style.transformStyle = "preserve-3d";
                dom.style.perspective = "1200px";
                dom_child.innerHTML = dom_mean;
                dom.onmouseover = function () {
                    if (canChange_trun) {
                        dom_child.style.transitionDuration = "1s";
                        dom_child.style.transform = "rotateY(" + trunDeg + "deg)";
                        canChange_trun = false;
                        setTimeout(function () {
                            canChange_trun = true;
                            dom_child.style.transitionDuration = "";
                        }, 950);
                    }
                };
                dom.onmouseout = function () {
                    if (canChange_trun) {
                        canChange_trun = false;
                        dom_child.style.transitionDuration = "1s";
                        dom_child.style.transform = "rotateY(" + 0 + "deg)";
                        setTimeout(function () {
                            canChange_trun = true;
                            dom_child.style.transitionDuration = "";
                        }, 950);
                    }
                };
                break;
            case 3:
                if (type === 2) {
                    var dom_mean = dom.innerHTML;
                    var canChange_trun = true;
                    var dom_id = dom.id;
                    dom.innerHTML = "<div id =\"" + dom_id + "\"></div>";
                    dom.setAttribute("id", "dom_father");
                    dom = lt_code.getId("dom_father");
                    var dom_child = lt_code.getId(dom_id);
                    dom.style.transformStyle = "preserve-3d";
                    dom.style.perspective = "1200px";
                    dom_child.innerHTML = dom_mean;
                    dom.onmouseover = function () {
                        if (canChange_trun) {
                            dom_child.style.transitionDuration = "1s";
                            dom_child.style.transform = "rotateY(" + trunDeg + "deg)";
                            canChange_trun = false;
                            setTimeout(function () {
                                canChange_trun = true;
                                dom_child.style.transitionDuration = "";
                            }, 950);
                        }
                    };
                    dom.onmouseout = function () {
                        if (canChange_trun) {
                            canChange_trun = false;
                            dom_child.style.transitionDuration = "1s";
                            dom_child.style.transform = "rotateY(" + 0 + "deg)";
                            setTimeout(function () {
                                canChange_trun = true;
                                dom_child.style.transitionDuration = "";
                            }, 950);
                        }
                    };
                } else if (type === 1) {
                    var dom_mean = dom.innerHTML;
                    var canChange_trun = true;
                    var dom_id = dom.id;
                    dom.innerHTML = "<div id =\"" + dom_id + "\"></div>";
                    dom.setAttribute("id", "dom_father");
                    dom = lt_code.getId("dom_father");
                    var dom_child = lt_code.getId(dom_id);
                    dom.style.transformStyle = "preserve-3d";
                    dom.style.perspective = "1200px";
                    dom_child.innerHTML = dom_mean;
                    dom.onmouseover = function () {
                        if (canChange_trun) {
                            dom_child.style.transitionDuration = "1s";
                            dom_child.style.transform = "rotateX(" + trunDeg + "deg)";
                            canChange_trun = false;
                            setTimeout(function () {
                                canChange_trun = true;
                                dom_child.style.transitionDuration = "";
                            }, 950);
                        }
                    };
                    dom.onmouseout = function () {
                        if (canChange_trun) {
                            canChange_trun = false;
                            dom_child.style.transitionDuration = "1s";
                            dom_child.style.transform = "rotateX(" + 0 + "deg)";
                            setTimeout(function () {
                                canChange_trun = true;
                                dom_child.style.transitionDuration = "";
                            }, 950);
                        }
                    };

                } else if (type === 3) {
                    var dom_mean = dom.innerHTML;
                    var canChange_trun = true;
                    var dom_id = dom.id;
                    dom.innerHTML = "<div id =\"" + dom_id + "\"></div>";
                    dom.setAttribute("id", "dom_father");
                    dom = lt_code.getId("dom_father");
                    var dom_child = lt_code.getId(dom_id);
                    dom.style.transformStyle = "preserve-3d";
                    dom.style.perspective = "1200px";
                    dom_child.innerHTML = dom_mean;
                    dom.onmouseover = function () {
                        if (canChange_trun) {
                            dom_child.style.transitionDuration = "1s";
                            dom_child.style.transform = "rotateZ(" + trunDeg + "deg)";
                            canChange_trun = false;
                            setTimeout(function () {
                                canChange_trun = true;
                                dom_child.style.transitionDuration = "";
                            }, 950);
                        }
                    };
                    dom.onmouseout = function () {
                        if (canChange_trun) {
                            canChange_trun = false;
                            dom_child.style.transitionDuration = "1s";
                            dom_child.style.transform = "rotateZ(" + 0 + "deg)";
                            setTimeout(function () {
                                canChange_trun = true;
                                dom_child.style.transitionDuration = "";
                            }, 950);
                        }
                    };
                } else {
                    console.trace("make3DImgTrun函数type参数输入错误!");
                }
                break;
            default:
                console.trace("make3DImgTrun函数输入参数出错!");
        }
    }
};

/**
 * 旋转内部的物件
 * @param {HTMLElement|HTMLCollection} dom 要被旋转的部件的父类
 * @param {number} trunDeg 旋转角
 * @param {string} child_name 子类的名称(类似getAll)
 * @param {number} type 旋转样式(1:转x轴;2:转y轴;3转z轴;默认转z轴)
 * @param {number} times 动画时间
 */
lt_code.make3DTrun_inner = function (dom, trunDeg, child_name, type, times) {
    /**存放子类的变量 */
    var dom_child = new Array();
    switch (arguments.length) {
        case 3:
            if (dom.length && dom.length > 1 && dom.innerHTML !== "") {
                //console.trace(dom_child);
                for (var i = 0; i < dom.length; i++) {
                    dom[i].style.transformStyle = "preserve-3d";
                    dom[i].style.perspective = "1200px";
                    dom_child[i] = lt_code.getAll2(child_name, dom[i]);
                    //如果获取的是数组,则读取第一个
                    if (dom_child[i].length) {
                        dom_child[i] = dom_child[i][0];
                    }
                    dom_child[i].style.transform = !dom_child[i].style.transform ? "rotateZ(0deg)" : dom_child[i].style.transform;
                    dom_child[i].style.transitionDuration = "1s";
                    dom_child[i].style.transform = "rotateZ(" + trunDeg + "deg)";
                }
            } else if (dom.innerHTML !== "" && !dom.length) {
                dom.style.transformStyle = "preserve-3d";
                dom.style.perspective = "1200px";
                dom_child[0] = lt_code.getAll2(child_name, dom);
                if (dom_child[0].length) {
                    dom_child[0] = dom_child[0][0];
                }
                dom_child[0].style.transform = !dom_child[0].style.transform ? "rotateZ(0deg)" : dom_child[0].style.transform;
                dom_child[0].style.transitionDuration = "1s";
                dom_child[0].style.transform = "rotateZ(" + trunDeg + "deg)";
            }
            break;
        case 4:
            if (dom.length && dom.length > 1 && dom.innerHTML !== "") {
                //console.trace(dom_child);
                for (var i = 0; i < dom.length; i++) {
                    dom[i].style.transformStyle = "preserve-3d";
                    dom[i].style.perspective = "1200px";
                    dom_child[i] = lt_code.getAll2(child_name, dom[i]);
                    //如果获取的是数组,则读取第一个
                    if (dom_child[i].length) {
                        dom_child[i] = dom_child[i][0];
                    }
                    dom_child[i].style.transform = !dom_child[i].style.transform ? "rotate(0deg)" : dom_child[i].style.transform;
                    dom_child[i].style.transitionDuration = "1s";
                    if (type === 3) {
                        dom_child[i].style.transform = "rotateZ(" + trunDeg + "deg)";
                    } else if (type === 2) {
                        dom_child[i].style.transform = "rotateY(" + trunDeg + "deg)";
                    } else if (type === 1) {
                        dom_child[i].style.transform = "rotateX(" + trunDeg + "deg)";
                    } else {
                        console.trace("make3DTrun_inner函数type参数输入错误!");
                    }
                }
            } else if (dom.innerHTML !== "" && !dom.length) {
                dom.style.transformStyle = "preserve-3d";
                dom.style.perspective = "1200px";
                dom_child[0] = lt_code.getAll2(child_name, dom);
                if (dom_child[0].length) {
                    dom_child[0] = dom_child[0][0];
                }
                dom_child[0].style.transform = !dom_child[0].style.transform ? "rotateZ(0deg)" : dom_child[0].style.transform;
                dom_child[0].style.transitionDuration = "1s";
                if (type === 3) {
                    dom_child[0].style.transform = "rotateZ(" + trunDeg + "deg)";
                } else if (type === 2) {
                    dom_child[0].style.transform = "rotateY(" + trunDeg + "deg)";
                } else if (type === 1) {
                    dom_child[0].style.transform = "rotateX(" + trunDeg + "deg)";
                } else {
                    console.trace("make3DTrun_inner函数type参数输入错误!");
                }
            }
            break;
        case 5:
            if (dom.length && dom.length > 1 && dom.innerHTML !== "") {
                //console.trace(dom_child);
                for (var i = 0; i < dom.length; i++) {
                    dom[i].style.transformStyle = "preserve-3d";
                    dom[i].style.perspective = "1200px";
                    dom_child[i] = lt_code.getAll2(child_name, dom[i]);
                    //如果获取的是数组,则读取第一个
                    if (dom_child[i].length) {
                        dom_child[i] = dom_child[i][0];
                    }
                    dom_child[i].style.transform = !dom_child[i].style.transform ? "rotate(0deg)" : dom_child[i].style.transform;
                    dom_child[i].style.transitionDuration = times + "s";
                    if (type === 3) {
                        dom_child[i].style.transform = "rotateZ(" + trunDeg + "deg)";
                    } else if (type === 2) {
                        dom_child[i].style.transform = "rotateY(" + trunDeg + "deg)";
                    } else if (type === 1) {
                        dom_child[i].style.transform = "rotateX(" + trunDeg + "deg)";
                    } else {
                        console.trace("make3DTrun_inner函数type参数输入错误!");
                    }
                }
            } else if (dom.innerHTML !== "" && !dom.length) {
                dom.style.transformStyle = "preserve-3d";
                dom.style.perspective = "1200px";
                dom_child[0] = lt_code.getAll2(child_name, dom);
                if (dom_child[0].length) {
                    dom_child[0] = dom_child[0][0];
                }
                dom_child[0].style.transform = !dom_child[0].style.transform ? "rotateZ(0deg)" : dom_child[0].style.transform;
                dom_child[0].style.transitionDuration = times + "s";
                if (type === 3) {
                    dom_child[0].style.transform = "rotateZ(" + trunDeg + "deg)";
                } else if (type === 2) {
                    dom_child[0].style.transform = "rotateY(" + trunDeg + "deg)";
                } else if (type === 1) {
                    dom_child[0].style.transform = "rotateX(" + trunDeg + "deg)";
                } else {
                    console.trace("make3DTrun_inner函数type参数输入错误!");
                }
            }
            break;
        default:
            console.trace("make3DTrun_inner函数参数输入错误!");

    }

    //重写清除函数
    lt_code.make3DTrun_inner.clearAll = function () {
        for (var i = 0; i < dom_child.length; i++) {
            dom_child[i].style.transitionDuration = "";
            dom_child[i].style.transform = "";
        }
    };
};
//make3DTrun_inner函数对外接口
/**清除所有旋转 */
lt_code.make3DTrun_inner.clearAll = function () { };
//make3DTrun_inner函数对外接口

/**
 * 往某个位置中炫彩时钟的函数
 * @param {HTMLElement} dom 对象目标
 */
lt_code.innerClock = function (dom) {
    if (!dom) {
        console.trace("innerClock函数对象不存在!");
    } else {
        dom.innerHTML += "<canvas id=\"clockCanvas\"></canvas>";
    }
    //设置全局变量
    /**canvas的高 */
    var WINDOW_HEIGHT = 768;//canvas 的高
    /**canvas的宽 */
    var WINDOW_WIDTH = 1024;//canvas 的宽
    /**group的半径 */
    var GROUP_R = 8;//group 的半径
    /**字符距离左边的距离 */
    var MARGIN_LEFT = 30;
    /**字符距离顶部的距离*/
    var MARGIN_TOP = 60;
    /**是否是时钟 */
    var ISCLOCK = true;
    /**倒计时几个小时 */
    var LOADTIME = 1;
    /**输入月份的时候需要减一,0即为一月 */
    var ENDTIME = new Date();
    var NOWDATE = new Date();
    /**定义电脑最多渲染多少个小球 */
    var MAXGROUP = 300;

    /**用来存放小球的空数组*/
    var balls = [];
    /**用来存放颜色的数组*/
    const colors = ["#33b5e5", "#09c", "#a6c", "#93c", "#9c0", "#690", "#fb3", "#f80", "#f80", "f44", "#c00"];
    //计算要ENDTIME的值
    ENDTIME.setTime(ENDTIME.getTime() + (LOADTIME > 0 ? LOADTIME : 1) * 3600 * 1000);
    //启动方法
    window.onload = function () {
        var canvas = document.getElementById("clockCanvas");
        var context = canvas.getContext("2d");

        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;

        //开始画图
        setInterval(function () {
            render(context, ISCLOCK);//绘制页面
            upDate();//更新参数(增加一个小球的函数)
        }, 50);
    };

    //更新函数
    function upDate() {

        //声明下一秒的变量
        var nextSeconds = getSeconds(new Date());

        var nextHour = parseInt(nextSeconds / 3600);
        var nextMinutes = parseInt((nextSeconds % 3600) / 60);
        nextSeconds = nextSeconds % 60;

        //console.trace("+"+nextSeconds);

        //获得之前的秒数的参数
        var curSeconds = getSeconds(NOWDATE);

        var curHour = parseInt(curSeconds / 3600);
        var curMinutes = parseInt((curSeconds % 3600) / 60);
        curSeconds = curSeconds % 60;

        //console.trace(nextSeconds-curSeconds);
        //console.trace(nextHour-curHour);

        if (NOWDATE !== new Date()) {
            //在这里加上小球更新的函数
            if ((parseInt(nextHour / 10) !== parseInt(curHour / 10))) {
                addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHour / 10));
            }
            if (parseInt(curHour % 10) !== parseInt(nextHour % 10)) {
                addBalls(MARGIN_LEFT + 8 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(curHour / 10));
            }
            if (parseInt(curMinutes / 10) !== parseInt(nextMinutes / 10)) {
                addBalls(MARGIN_LEFT + 19 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(curMinutes / 10));
            }
            if (parseInt(curMinutes % 10) !== parseInt(nextMinutes % 10)) {
                addBalls(MARGIN_LEFT + 27 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(curMinutes / 10));
            }
            if (parseInt(curSeconds / 10) !== parseInt(nextSeconds / 10)) {
                addBalls(MARGIN_LEFT + 38 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(curSeconds / 10));
            }
            if (parseInt(curSeconds % 10) !== parseInt(nextSeconds % 10)) {
                addBalls(MARGIN_LEFT + 46 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(curSeconds % 10));
            }

            NOWDATE = new Date();
        }

        upDateBalls();
    }

    //添加小球的函数
    function addBalls(x, y, num) {
        for (var i = 0; i < lt_code.variable.digit[num].length; i++) {
            for (var j = 0; j < lt_code.variable.digit[num][i].length; j++) {
                if (lt_code.variable.digit[num][i][j] === 1) {
                    var aBall = {
                        x: x + j * 2 * (GROUP_R + 1) + (GROUP_R + 1),
                        y: y + i * 2 * (GROUP_R + 1) + (GROUP_R + 1),
                        g: 1.5 + Math.random(),
                        vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                        vy: -5,
                        f: 0.8,
                        color: colors[Math.floor(Math.random() * colors.length)]
                    };
                    balls.push(aBall);

                }
            }
        }
    }

    //对已有的小球进行更新
    function upDateBalls() {
        for (var i = 0; i < balls.length; i++) {
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].vy += balls[i].g;

            //console.trace(i);
            //碰撞挡边检测
            if (balls[i].y >= WINDOW_HEIGHT - GROUP_R) {
                balls[i].y = WINDOW_HEIGHT - GROUP_R;
                balls[i].vy = -balls[i].vy * balls[i].f;
            }
        }

        //定义一个用来储存有效小球的数据
        var effective = 0;
        //对小球进行遍历,删去不留在画布中的小球以节省性能
        for (var i = 0; i < balls.length; i++) {
            if (balls[i].x + GROUP_R > 0 && balls[i].x - GROUP_R < WINDOW_WIDTH) {
                balls[effective++] = balls[i];
            }
        }
        //console.trace(effective);
        //开始维护
        while (balls.length > Math.min(MAXGROUP, effective)) {
            balls.pop();
        }
    }

    //绘制钟表的函数
    function render(cxt, clock) {
        //设定用来读取时间的变量
        var now = NOWDATE;//读取当前时间
        var times;
        var hour;
        var minutes;
        var seconds;

        var time;
        if (clock === true) {
            hour = now.getHours();
            minutes = now.getMinutes();
            seconds = now.getSeconds();
            time = fullString(hour) + ":" + fullString(minutes) + ":" + fullString(seconds);
        } else {
            times = change_time(now, ENDTIME);
            hour = Math.floor(times / 3600);
            minutes = Math.floor((times % 3600) / 60);
            seconds = Math.floor(times % 60);
            time = fullString(hour) + ":" + fullString(minutes) + ":" + fullString(seconds);
        }
        time_render(time, cxt);
    }

    //额外加上的0
    function fullString(num) {
        var str = num.toString();
        if (str.length < 2) {
            str = "0" + str;
        }
        return str;
    }

    //计算倒计时还有多少时间
    function change_time(time_now, time_end) {
        //console.trace(time_now + "" + time_end);
        var seconds;
        seconds = time_end.getTime() - time_now.getTime();
        seconds = Math.round(seconds / 1000);
        //console.trace(seconds);
        return seconds >= 0 ? seconds : 0;
    }

    //绘制时间的函数
    function time_render(time, cxt) {
        //绘画之前先清空画布
        cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

        //开始对canvas进行绘画
        var time_num = getNum(time);
        var hour = time_num / 10000;
        var minutes = (time_num % 10000) / 100;
        var seconds = time_num % 100;


        renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10), cxt);//在屏幕上打印小时的第一位
        renderDigit(MARGIN_LEFT + 8 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(hour % 10), cxt);//在屏幕上打印小时的第二位
        renderDigit(MARGIN_LEFT + 15 * 2 * (GROUP_R + 1), MARGIN_TOP, 10, cxt);//在屏幕上打印一个冒号
        renderDigit(MARGIN_LEFT + 19 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);//在屏幕上打印分钟的第一位
        renderDigit(MARGIN_LEFT + 27 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);//在屏幕上打印分钟的第二位
        renderDigit(MARGIN_LEFT + 34 * 2 * (GROUP_R + 1), MARGIN_TOP, 10, cxt);//在屏幕上打印一个冒号
        renderDigit(MARGIN_LEFT + 38 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);//在屏幕上打印秒钟的第一位
        renderDigit(MARGIN_LEFT + 46 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);//在屏幕上打印秒钟的第一位

        // //在这里加上小球更新的函数
        // if ((parseInt(nextHour / 10) !== parseInt(curHour / 10))) {
        //     addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHour / 10));
        // }
        // if (parseInt(curHour % 10) !== parseInt(nextHour % 10)) {
        //     addBalls(MARGIN_LEFT + 8 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(curHour / 10));
        // }
        // if (parseInt(curMinutes / 10) !== parseInt(nextMinutes / 10)) {
        //     addBalls(MARGIN_LEFT + 19 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        // }
        // if (parseInt(curMinutes % 10) !== parseInt(nextMinutes % 10)) {
        //     addBalls(MARGIN_LEFT + 27 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        // }
        // if (parseInt(curSeconds / 10) !== parseInt(nextSeconds / 10)) {
        //     addBalls(MARGIN_LEFT + 38 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        // }
        // if (parseInt(curSeconds % 10) !== parseInt(nextSeconds % 10)) {
        //     addBalls(MARGIN_LEFT + 46 * 2 * (GROUP_R + 1), MARGIN_TOP, parseInt(curSeconds % 10));
        // }

        //绘制小球
        for (var i = 0; i < balls.length; i++) {
            cxt.fillStyle = balls[i].color;
            cxt.beginPath();
            cxt.arc(balls[i].x, balls[i].y, GROUP_R, 0, 2 * Math.PI, true);
            cxt.closePath();

            cxt.fill();
        }
    }

    //从字符串中获得数字的函数
    function getNum(text) {
        return text.replace(/[^0-9]/ig, "");
    }

    //绘制一个数字的函数
    function renderDigit(x, y, num, cxt) {

        //给context设置一个颜色
        cxt.fillStyle = "rgb(0,102,153)";

        //开始遍历lt_code.variable.digit参数
        for (var i = 0; i < lt_code.variable.digit[num].length; i++) {
            for (var j = 0; j < lt_code.variable.digit[num][i].length; j++) {
                if (lt_code.variable.digit[num][i][j] === 1) {

                    //开始绘画小圆球(属性设置)
                    cxt.beginPath();
                    cxt.arc(x + j * 2 * (GROUP_R + 1) + (GROUP_R + 1), y + i * 2 * (GROUP_R + 1) + (GROUP_R + 1), GROUP_R, 0, 2 * Math.PI);
                    cxt.closePath();

                    //进行绘画
                    cxt.fill();
                }
            }
        }
    }

    //获得秒数的函数
    function getSeconds(time) {
        var times;
        times = time.getTime();
        times = Math.floor(times / 1000);
        return times;
    }


};

/**回到顶部的函数 */
lt_code.scrollToTop = (function smoothscroll() {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
});

/**
 * input转为span函数
 * @param {string} beChouseName 被改变的input的类名
 * @param {string} bottomName 按钮的类名
 * @param {string} fatherName 存放对象父类的类名
 * @param {string} wardingName 存放报错的类名
 */
lt_code.inputToSpan = function (beChouseName, bottomName, fatherName, wardingName) {
    if (arguments.length < 3 || arguments.length > 4) {
        console.trace("input转为span函数输入参数出错!");
        return;
    }

    /**用来存放lt_basic内容的数组 */
    var lt_basic_neirong = lt_code.inputToSpan.neirong;

    if (arguments.length === 4) {
        var warding_box = lt_code.getAll(wardingName);
    }

    if (!Array.isArray(lt_basic_neirong)) {
        lt_basic_neirong = new Array();
    }

    /**用来被选择的数组 */
    var lt_basic = lt_code.getClass(beChouseName);
    console.trace(lt_basic);
    /**用来存放lt_basic代码的数组 */
    var lt_basic_value = new Array();
    for (var i = 0; i < lt_basic.length; i++) {
        lt_basic_value[i] = lt_basic[i].outerHTML;
    }
    /**按钮的代表 */
    var bottom_basic = lt_code.getClass(bottomName, 0);
    /**是否是文本输入状态 */
    var IStext = true;
    /**放置输入框的父类 */
    var lt_for_basic = lt_code.getClass(fatherName);
    /**用来储存span的数组 */
    var lt_span = new Array();

    /**读取一个中文字符的正则 */
    var chack_sex = /^[\u4e00-\u9fa5]{1}/;

    /**读取邮箱的正则 */
    var chack_emall = /^[^\W]+\@[^\W]+\.[^\W]{2,6}/;

    /**读取年龄的正则(0-159) */
    var chack_age = /[1][1-5][\d]|[\d][\d]|[\d]/;

    /**读取电话号码的正则 */
    var chack_phone = /[\d]{17}|[\d]{15}|[\d]{11}|[\d]{8}/;

    bottom_basic.onmousedown = function () {
        buttom_chick();
    };

    /**按钮按下的函数 */
    var buttom_chick = function () {
        if (IStext) {
            for (var i = 0; i < lt_for_basic.length; i++) {

                lt_basic_neirong[i] = !(lt_basic[0].value || lt_basic[0].innerText) ? lt_basic_neirong[i] : (lt_basic[0].value || lt_basic[0].innerText);
                lt_basic_neirong[i] = lt_basic_neirong[i] === "请输入内容" ? "" : lt_basic_neirong[i];
                lt_basic_neirong[i] = !lt_basic_neirong[i] ? "没有内容" : lt_basic_neirong[i];

                //判断性别
                if (i === lt_code.inputToSpan.sex && lt_code.inputToSpan.sex !== 0) {
                    if (lt_basic_neirong[i] !== "没有内容") {
                        lt_basic_neirong[i] = chack_sex.exec(lt_basic_neirong[i]);
                        if (!lt_basic_neirong[i]) {
                            lt_basic_neirong[i] = "没有内容";
                            alert("性别一栏没有输入中文!");
                        } else {
                            lt_basic_neirong[i] = lt_basic_neirong[i][0];
                            if (!(lt_basic_neirong[i] === "男" || lt_basic_neirong[i] === "女")) {
                                console.trace(lt_basic_neirong[i]);
                                lt_basic_neirong[i] = "没有内容";
                                alert("性别输入错误!");
                            }
                        }
                    }
                }

                //判断邮箱
                if (i === lt_code.inputToSpan.emall && lt_code.inputToSpan.emall !== 0) {
                    if (lt_basic_neirong[i] !== "没有内容") {
                        lt_basic_neirong[i] = chack_emall.exec(lt_basic_neirong[i]);
                        //console.trace(lt_basic_neirong[i]);
                        if (!lt_basic_neirong[i]) {
                            lt_basic_neirong[i] = "没有内容";
                            alert("邮箱输入出错!");
                        } else {
                            lt_basic_neirong[i] = lt_basic_neirong[i][0];
                        }
                    }
                }

                //判断年龄
                if (i === lt_code.inputToSpan.age && lt_code.inputToSpan.age !== 0) {
                    if (lt_basic_neirong[i] !== "没有内容") {
                        lt_basic_neirong[i] = chack_age.exec(lt_basic_neirong[i]);
                        if (!lt_basic_neirong[i]) {
                            lt_basic_neirong[i] = "没有内容";
                            alert("年龄输入出错!");
                        } else {
                            lt_basic_neirong[i] = lt_basic_neirong[i][0];
                        }
                    }
                }

                //判断电话号码
                if (i === lt_code.inputToSpan.phone && lt_code.inputToSpan.phone !== 0) {
                    if (lt_basic_neirong[i] !== "没有内容") {
                        lt_basic_neirong[i] = lt_basic_neirong[i].replace(/[\-]|[\.]|[\_]/ig, "");
                        lt_basic_neirong[i] = chack_phone.exec(lt_basic_neirong[i]);
                        if (!lt_basic_neirong[i]) {
                            lt_basic_neirong[i] = "没有内容";
                            alert("电话号码输入出错!");
                        } else {
                            lt_basic_neirong[i] = lt_basic_neirong[i][0];
                            /**轮询变量 */
                            var j;
                            /**用来存放内容的数组 */
                            var neirong = new Array();
                            if (lt_basic_neirong[i].length === 17) {
                                for (j = 0; j < lt_basic_neirong[i].length; j++) {
                                    neirong[j] = lt_basic_neirong[i][j];
                                }
                                neirong.splice(2, 0, "-");
                                neirong.splice(7, 0, "-");
                                lt_basic_neirong[i] = neirong.join("");
                            } else if (lt_basic_neirong[i].length === 15) {
                                for (j = 0; j < lt_basic_neirong[i].length; j++) {
                                    neirong[j] = lt_basic_neirong[i][j];
                                }
                                neirong.splice(4, 0, "-");
                                lt_basic_neirong[i] = neirong.join("");
                            }
                        }
                    }
                }

                lt_basic_value[i] = lt_basic[0].outerHTML;
                lt_for_basic[i].removeChild(lt_basic[0]);
                lt_for_basic[i].innerHTML +=
                    "<span class='get_from_basic lt_span'>" +
                    lt_basic_neirong[i] + "</span>";
            }
            lt_for_basic = lt_code.getClass(fatherName);
            lt_span = lt_code.getClass("get_from_basic");
            IStext = false;
        } else {
            for (var i = 0; i < lt_for_basic.length; i++) {
                lt_span[0] ? lt_for_basic[i].removeChild(lt_span[0]) : console.trace("lt_span[" + i + "]不存在");
                lt_basic_value[i] = !lt_basic_value[i] ? " " : lt_basic_value[i];
                lt_for_basic[i].innerHTML += lt_basic_value[i];
                lt_basic[i] = lt_code.getClass("lt_basic", i);
                lt_basic_neirong[i] = lt_basic_neirong[i] === "没有内容" ? "" : lt_basic_neirong[i];
                lt_basic_neirong[i] = !lt_basic_neirong[i] ? "请输入内容" : lt_basic_neirong[i];
                lt_basic[i].setAttribute("placeholder", lt_basic_neirong[i]);
                lt_basic[i].innerHTML = "";
                lt_basic[i].value = "";
            }
            IStext = true;
        }
        lt_code.inputToSpan.neirong = lt_basic_neirong;
    };

    //在页面加载的时候先读取一遍
    buttom_chick();
};
//input转为span函数接口
/**输入内容的数据数组 */
lt_code.inputToSpan.neirong = null;

/**邮箱是第几个参数?(默认3)(0为不判断) */
lt_code.inputToSpan.emall = 3;

/**性别检查是第几个参数(默认1)(0为不判断) */
lt_code.inputToSpan.sex = 1;

/**判断年龄是第几个参数(默认2)(0为不判断) */
lt_code.inputToSpan.age = 2;

/**判断电话号码是那个参数(默认不判断) */
lt_code.inputToSpan.phone = 0;
//input转为span函数接口






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
                console.trace("otherCanvasDotsLines函数并没有找到已经提供的canvas画布!");
                return;
            }
        }
    } else {
        console.trace("otherCanvasDotsLines函数参数输入错误!");
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
        }
        var mouseDot, mouseDotIndex;
        canvas.addEventListener('mouseenter', mouseDotEnter);
        canvas.addEventListener('mousemove', mouseDotMove);
        canvas.addEventListener('mouseleave', mouseDotLeave);
        function mouseDotEnter(e) {
            var tx = e.pageX,
                ty = e.pageY;
            dot.init(canvas, tx, ty, 1);
        }
        function mouseDotMove(e) {
            var tx = e.pageX,
                ty = e.pageY;
            if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {
                dot.mouseDot(tx, ty);
            }
        }
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
                // if (dotsArr[i].isMouseDot) console.trace('aaa')
                if (dotsArr[i]) dotsArr[i].update();
            }

            // 绘制连线
            for (var i = overNum; i < dotsNum; i++) {
                for (var j = i + 1; j < dotsNum; j++) {
                    // if (dotsArr[i].isMouseDot) console.trace('bbb')
                    // if (dotsArr[j].isMouseDot) console.trace('ccc')
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
                console.trace("otherCanvasDotsLines函数并没有找到已经提供的canvas画布!");
                return;
            }
        }
    } else {
        console.trace("otherCanvasDotsLines函数参数输入错误!");
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
        console.trace("fireText函数参数输入错误!");
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
            //console.trace("getFontSizeForWidth() 1  : ", copy.fontSize);
            context.font = copy.getFontString();
            var textWidth = context.measureText(string).width;

            //SOME DISAGREEMENT WHETHER THIS SHOOULD BE WITH && or ||
            if (textWidth < width) {
                while (context.measureText(string).width < width) {
                    copy.fontSize++;
                    context.font = copy.getFontString();
                    if (copy.fontSize > maxFontSize) {
                        console.trace("getFontSizeForWidth() max fontsize reached");
                        return null;
                    }
                }
            } else if (textWidth > width) {
                while (context.measureText(string).width > width) {
                    copy.fontSize--;
                    context.font = copy.getFontString();
                    if (copy.fontSize < 0) {
                        console.trace("getFontSizeForWidth() min fontsize reached");
                        return null;
                    }
                }
            }
            //console.trace("getFontSizeForWidth() 2  : ", copy.fontSize);
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

        //console.trace(particles.length);
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
 * 移动页面到某个坐标的代码
 * @param {number} y 目标纵坐标
 * @param {number} duration 时间*/
lt_code.scrollTo = function (y, duration) {
    duration = duration * 1000;
    var scrollTop = lt_code.variable.scrollTop;/*页面当前滚动距离*/
    //console.trace(scrollTop);
    var distance = y - scrollTop;/*结果大于0,说明目标在下方,小于0,说明目标在上方*/
    var scrollCount = duration / 10;/*10毫秒滚动一次,计算滚动次数*/
    var everyDistance = distance / scrollCount;/*滚动距离除以滚动次数计算每次滚动距离*/

    for (var index = 1; index <= scrollCount; index++) {/*循环设置scrollBy事件,在duration之内,完成滚动效果*/
        setTimeout(function () {
            window.scrollBy(0, everyDistance);
        }, 10 * index);
    }
};


/**
 * 回到顶部的函数(overflow:auto对象)
 * @param {HTMLElement} dom 对象
 * @param {number} timer 动画时间
 */
lt_code.scrollTop = function (dom, timer) {
    var now_scroll = $(dom).scrollTop();
    timer = timer * 1000 / 20;
    var every_scroll = now_scroll / timer;

    lt_code.scrollTop.run = setInterval(function () {
        $(dom).scrollTop(now_scroll - every_scroll);
        now_scroll = now_scroll - every_scroll;
        if (now_scroll <= 0) {
            clearInterval(lt_code.scrollTop.run);
            //console.trace("回到顶部");
        }
    }, 20);
};
//回到顶部的函数(overflow:auto对象)接口
/**scrollTop移动挂载 */
lt_code.scrollTop.run = null;
//回到顶部的函数(overflow:auto对象)接口




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
            console.trace("autoWidth函数输入参数出错!");
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
            console.trace("autoHeight函数输入参数出错!");
    }
};


/**
 * 简单的获得json字符串的函数
 * @param {string} str 输入字符串
 */
lt_code.getJson = function (str) {
    return /(\{.*\})/.exec(str)[1];
}


/**
 * 版本
 * 如果网页所有内容加载完成后
 * 还是没有图标则自动调用图标
 */
lt_code.Version = function () {
    //eval("console.log('lt_code部分代码由楼听提供');");
    //窗体启动时候运行的内容
    window.addEventListener("load", function () {
        var ico = document.getElementsByTagName("link");
        var have = false;
        for (var i in ico) {
            if (/icon/.test(i.type)) {
                have = true;
            }
        }
        if (!have) {
            lt_code.variable.setIcon(0);
        }

        !function () {
            if (document.getElementById("lt_code_globla_css")) {
                lt_code.removeChild(lt_code.getId("lt_code_globla_css"));
            }
            var lt_code_globla_css = lt_code.newDom("style", {
                id: "lt_code_globla_css",
                type: "text/css",
                rel: "stylesheet",
                style: {
                    display: "none",
                }
            });
            lt_code_globla_css.innerHTML = "*{margin:0;padding:0;border:0;}";
            lt_code.addChild(lt_code_globla_css, lt_code.getAll("head"));
        }();

        /**
         * 日期格式化
         * @param {any} fmt
         */
        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,                   //月份 
                "d+": this.getDate(),                        //日 
                "h+": this.getHours(),                       //小时 
                "m+": this.getMinutes(),                     //分 
                "s+": this.getSeconds(),                     //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds()                  //毫秒 
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }

        /**
         * 初始化一些特殊模块
         * @param {string} object 模块名称
         */
        lt_code.init = function (object) {
            var head = lt_code.getAll("head");
            switch (object) {
                //伪3D模块
                case "PTD":
                case "pseudoThreeD":
                    /**伪3D模块 */
                    var pseudoThreeD = lt_code.newDom("script", {
                        src: lt_code.variable.currentDir + "item/pseudoThreeD.js"
                    });
                    lt_code.addChild(pseudoThreeD, head);
                    break;
                //3D模块
                case "TD":
                case "threeD":
                    /**3D模块 */
                    var threeD = lt_code.newDom("script", {
                        src: lt_code.variable.currentDir + "item/threeD.js",
                    });
                    lt_code.addChild(threeD, head);
                    break;
                //图片操作模块
                case "IMGO":
                case "imageOperation":
                    var imageOperation = lt_code.newDom("script", {
                        src: lt_code.variable.currentDir + "item/imageOperation.js",
                    });
                    lt_code.addChild(imageOperation, head);
                    break;
                default:
                    console.trace("没有这个模块!");
                    console.log("已有模块:");
                    /**已有模块信息 */
                    var log = {
                        "伪3D模块":
                        {
                            "简写": "PTD",
                            "全称": "pseudoThreeD"
                        },
                        "3D模块":
                        {
                            "简称": "TD",
                            "全称": "threeD",
                        },
                        "图片操作模块":
                        {
                            "简称": "IMGO",
                            "全称": "imageOperation",
                        },
                    };
                    console.log(log);
            }
        }
    });

    return 16;
}();


/**计算性函数 */
lt_code.math = {};

/**
 * 求取数组中最小值
 * @param {number[]} numbers 数值
 * @return {number}
 */
lt_code.math.min = function (numbers) {
    var min = numbers[0];
    var i = 0;
    for (var j = 0; j < numbers.length; j++) {
        if (min > numbers[j]) {
            min = numbers[j];
            i = j;
        }
    }
    if (this != lt_code.math) {
        this.minIndex = i;
    }
    return min;
}

/**
 * 求取数组中最大值
 * @param {number[]} numbers 数值
 * @return {number}
 */
lt_code.math.max = function (numbers) {
    var max = numbers[0];
    var i = 0;
    for (var j = 0; j < numbers.length; j++) {
        if (max < numbers[j]) {
            max = numbers[j];
            i = j;
        }
    }
    if (this != lt_code.math) {
        this.maxIndex = i;
    }
    return max;
}

/**
 * 分割旋转切换图片
 * @param {HTMLDivElement} imgBox 图片盒子
 * @param {HTMLDivElement} imgLoadBox 预加载图片盒子
 * @param {number} cut 分割数
 * @param {number} count 图片数
 * @param {string} imgName 图片路径名+名字开头(不含数字)
 */
lt_code.trunGroupImg = function (imgBox, imgLoadBox, cut, count, imgName) {
    /**当前图片 */
    var nowImg = "";
    /**当前是第几张图 */
    var nowCount = 0;
    /**图片组 */
    var images = function () {
        var ret = new Array();
        for (var i = 0; i < count; i++) {
            ret.push(
                imgName + (i + 1) + ".jpg"
            );
        }
        return ret;
    }();

    nowImg = images[0];

    imgBox.style.position = "relative";

    /**旋转判定 */
    var runAround = 0;

    /**图片切片组 */
    var cutImgBox = function () {
        var arr = new Array();
        for (var i = 0; i < cut; i++) {
            var div = document.createElement("div");
            div.style.width = (imgBox.offsetWidth / cut * (cut - i)) + "px";
            div.style.height = (imgBox.offsetHeight / cut * (cut - i)) + "px";
            div.style.backgroundImage = "url(" + nowImg + ")";
            div.style.backgroundPositionX = "center";
            div.style.backgroundPositionY = "center";
            div.style.position = "absolute";
            div.style.top = imgBox.offsetHeight / cut * i / 2 + "px";
            div.style.left = imgBox.offsetWidth / cut * i / 2 + "px";
            div.style.transform = "rotateZ(0deg)";
            div.style.transitionDuration = "1s";
            div.style.borderRadius = (imgBox.offsetWidth / cut * (cut - i)) / 2 + "px";
            div.style.zIndex = i;
            imgBox.appendChild(div);
            arr.push(div);
        }
        return arr;
    }();

    var run = setInterval(function () {
        nowCount = nowCount >= count - 1 ? 0 : nowCount + 1;
        runAround = runAround > 6 ? 0 : runAround + 1;
        //console.trace(nowCount);
        nowImg = images[nowCount];
        changeImage();
    }, 5000);

    /**改变图片 */
    var changeImage = function () {
        cutImgBox.forEach(function (e, i) {
            if ((i + runAround) % 2 == 0) {
                e.style.transform = "rotateZ(360deg)";
            } else {
                e.style.transform = "rotateZ(-360deg)";
            }
            setTimeout(function () {
                e.style.backgroundImage = "url(" + nowImg + ")";
            }, 300);
        });
    }

    images.forEach(function (e) {
        var img = new Image();
        img.src = e;
        imgLoadBox.appendChild(img);
    })
    lt_code.trunGroupImg.runs.push(run);
    return run;
};
//分割旋转切换图片接口
/**挂载的分割切换旋转图片 */
lt_code.trunGroupImg.runs = [];
//分割旋转切换图片接口


/**
 * 加入小球
 * @param {HTMLElement} dom 加入背景对象
 */
lt_code.innerGroup = function (dom) {
    /**canvas对象*/
    var cas = document.createElement("canvas");
    /**ctx对象*/
    var ctx = cas.getContext("2d");
    /**球上限 */
    var max_group = lt_code.innerGroup.max_group || 300;

    //把cas图像加入内容
    dom.appendChild(cas);

    //设置canvas对象属性
    cas.width = window.innerWidth;
    cas.height = window.innerHeight;
    cas.style.position = "fixed";
    cas.style.zIndex = "-1";
    cas.style.top = "0";
    cas.style.left = "0";

    /**
     * 画圆的函数(实心)
     * @param {number} x 圆弧x轴
     * @param {number} y 圆弧y轴
     * @param {number} r 半径
     * @param {string} color 圆的颜色
     */
    var draw_arc2 = function (x, y, r, color) {
        //开始画画
        ctx.beginPath();
        //绘画颜色
        ctx.fillStyle = color;
        //弧线赋值
        ctx.arc(x, y, r, 0, Math.PI * 2);
        //绘制
        ctx.fill();
        //结束绘制
        ctx.closePath();
    };

    /**球*/
    var group = new Array();

    /**球的最大半径*/
    var max_r = 6;

    /**
     * 增加新球的函数
     * @param {number} x 横向坐标
     * @param {number} y 纵向坐标
     */
    var new_group = function (x, y) {
        var vx = Math.floor(Math.random() * 3) - 1.5;
        var vy = Math.floor(Math.random() * 3) - 1.5;
        /**构造一个新的球 */
        var new_group = {
            x: x,
            y: y,
            vx: vx === 0 ? 1 : vx,
            vy: vy === 0 ? 1 : vy,
            r: Math.floor(Math.random() * max_r) === 0 ? 1 : Math.floor(Math.random() * max_r),
            color: random_color()
        };
        group.unshift(new_group);
    };

    /**
     * 生成随机颜色
     * @return {string} 返回一个颜色值
     */
    var random_color = function () {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    };

    /**移动球的方法
     * @param {object} dom 物件对象
     */
    var move_way = function (dom) {
        dom.x = dom.x + dom.vx;
        dom.y = dom.y + dom.vy;
        draw_arc2(dom.x, dom.y, dom.r, dom.color);
        dom.vx = dom.x > cas.offsetWidth - dom.r ? -dom.vx : dom.vx;
        dom.vx = dom.x < dom.r ? -dom.vx : dom.vx;
        dom.vy = dom.y > cas.offsetHeight - dom.r ? -dom.vy : dom.vy;
        dom.vy = dom.y < dom.r ? -dom.vy : dom.vy;
    };

    //鼠标按下增加球
    cas.onmousedown = function (e) {
        e = e || window.event;
        new_group(e.clientX, e.clientY);
    };

    /**清空画布 */
    var clear_canvas = function () {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    /**增加球的挂载 */
    lt_code.innerGroup.run = setInterval(function () {
        if (group.length < max_group) {
            new_group(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }
        while (group.length > max_group) {
            group.pop();
        }
    }, 1000);

    /**移动挂载 */
    lt_code.innerGroup.run2 = setInterval(function () {
        clear_canvas();
        for (var i = 0; i < group.length; i++) {
            if (group[i]) {
                move_way(group[i]);
            }
        }
    }, 20);

    //重写增加新球的函数
    lt_code.innerGroup.new_group = function (x, y) {
        new_group(x, y);
    };
};
//加入小球的函数接口
/**innerGroup挂载1 */
lt_code.innerGroup.run = null;
/**innerGroup挂载2 */
lt_code.innerGroup.run2 = null;
/**小球上限 */
lt_code.innerGroup.max_group = null;
/**
 * 增加新球的函数
 * @param {number} x 球的横坐标
 * @param {number} y 球的纵坐标
 */
lt_code.innerGroup.new_group = function (x, y) { };
//加入小球的函数接口






/**
 * 尝试性代码
 */
lt_code.test = {};

/**
 * 重定向指向
 * @param {string} newName 新的名字
 */
lt_code.test.changeLtCode = function (newName) {
    newName = !newName ? "_" : newName;
    eval("window." + newName + " = lt_code");
    lt_code.variable.newName = newName;
    lt_code.test.changeLtCode.changeBack = function () {
        eval("window." + lt_code.variable.newName + " = null");
        lt_code.test.changeLtCode.changeBack = null;
    }
    //window._ = lt_code;
    //lt_code.test.changeLtCode.changeBack = function () {
    //    window._ = null;
    //    lt_code.test.changeLtCode.changeBack = null;
    //}
}



/**
 * 实验性fullpage(分页外面不能包裹任何内容)
 * 请用lt_for_page为分割页面的class名
 * 提供了:
 * 1.change_page函数来改变当前页面
 * 2.canUseMouseWheel接口(能否使用滚轮)
 * 3.now_page接口(当前为第几页)
 * @param {string[]} backgrounds 背景数组
 * @param {number} times 移动动画的播放时间
 * @param {HTMLElement} dom_father 父类框
 * @param {number} chackType 检查频率(输入0不检查)
 * @param {boolean} useDaohang 是否使用导航
 * @param {number} types 导航样式
 * @param {string[]} pageName 每个页面的名字
 */
lt_code.test.fullpage = function (backgrounds, times, dom_father, chackType, useDaohang, types, pageName) {
    //设定body没有滚动条
    document.body.style.overflow = "hidden";

    //向页面里面丢入通用的样式空间
    document.head.innerHTML += "<style id='lt_for_fullpage'>*{padding:0;border:0;margin:0;}</style>";

    //启动fullpage则停止访问鼠标滚轮高度
    clearInterval(lt_code.top_run);

    /**
     * fullpage专用样式表空间*/
    var pages_styles = lt_code.getId("lt_for_fullpage");

    //如果没有输入时间,则默认为一秒
    if (!times) {
        times = 1;
    }

    //如果没有输入dom_father,则修改body样式
    if (!dom_father) {
        lt_code.getAll().style.width = "0px";
        lt_code.getAll().style.height = "0px";
    } else {
        dom_father.style.width = "0px";
        dom_father.style.height = "0px";
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

    //backgrounds是否存在
    if (!backgrounds) {
        backgrounds = new Array();
    }

    /**
     * 读取窗口的高*/
    var height = window.innerHeight;
    /**
     * 读取窗口的宽*/
    var width = window.innerWidth;

    /**
     * 读取所有的目标对象*/
    var pages = lt_code.getAll(".lt_for_page");

    console.log(pages);

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

            dom_father = !dom_father ? lt_code.getAll() : dom_father;

            //设定不可超出宽高
            pages[0].style.overflow = "hidden";

            //对背景进行赋值
            if (backgrounds[i]) {
                pages[0].style.background = backgrounds[i];
            } else {
                pages[0].style.background = "";
            }

            //储存所有的页面
            useToPages[i] = pages[0].outerHTML;

            //删除该页面
            dom_father.removeChild(pages[0]);
        }


        //向body中丢入一个全新的div用来存放所有页面
        dom_father.innerHTML = "<div id=\"lt_for_all_pages\"></div>" + dom_father.innerHTML;

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

        //提供当前页面的值给外部
        lt_code.test.fullpage.now_page = page_number;

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
            //console.trace(lt_all_pages);

            //移动
            changeHeight(lt_all_pages, -change_height);

            //更新参数
            page_number = new_pages;

            //刷新提供给外部当前页
            lt_code.test.fullpage.now_page = page_number;
        };

        /**
         * 防止冲突把函数重写到外面
         * @param {HTMLElement} dom htmlElement对象
         * @param {number} num 移动的数值
         */
        var changeHeight = function (dom, num) {
            //console.trace("调用了" + dom + " " + num);
            lt_code.moveBoxTo2(dom, 0, num, times);
        };

        //已经在外部声明过一遍,在这里进行重载
        lt_code.test.fullpage.change_page = function (num) {
            if (canUseChange) {
                canUseChange = false;
                new_pages = num;
                turn_to();
                canUseChange = false;
                change_canUseChange();
            }
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
            if (lt_code.getNum(pages[0].style.height) !== height || lt_code.getNum(pages[0].style.width) !== width) {
                for (var i = 0; i < pages.length; i++) {
                    pages[i].style.height = height + "px";
                    pages[i].style.width = width + "px";
                }
            }
        };

        //检查相关
        if (chackType === 0) {
            lt_code.test.fullpage.run = NaN;
        } else {
            lt_code.test.fullpage.run = chackType ? setInterval(() => { chackWindow(); }, chackType * 50) : setInterval(() => { chackWindow(); }, 200);
        }

        /**
         * 鼠标滚轮事件
         * @param {Event} e 鼠标滚轮事件
         */
        window.onmousewheel = function (e) {
            //对e赋值
            e = e || window.event;
            chackWindow();
            if (e.wheelDelta && canUseChange && lt_code.test.fullpage.canUseMouseWheel) {
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

            //setInterval(function () { console.trace(canUseChange); }, 20);

            //判断是否使用导航
            if (useDaohang) {
                //innerDaohang();
            }
        };
    }
};

//以下是fullpage定义给外部的接口
/**能否使用滚轮 */
lt_code.test.fullpage.canUseMouseWheel = true;

/**
 * 专门给外界调用的,用来调整new_page的函数
 * @param {number} num 要改变的页面值
 */
lt_code.test.fullpage.change_page = function (num) { };//在外部声明

/**fullpage当前在第几页 */
lt_code.test.fullpage.now_page = NaN;

/**fullpage检查浏览器挂载 */
lt_code.test.fullpage.run = NaN;
//以上是fullpage定义给外部的接口

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
        console.trace(base64);
    };
};

/**
 * 直接读取上传的文件为base64
 * @param {HTMLInputElement} inputFile 上传结点
 */
lt_code.test.fileToBase = function (inputFile) {
    //console.trace(inputFile);
    lt_code.test.fileToBase.getReturn = function () { };
    var oFReader = new FileReader();
    var ret;
    if (inputFile.value.length > 0) {
        var file = inputFile.files[0];
        //console.trace(file);
        oFReader.readAsDataURL(file);
    }
    oFReader.onloadend = function (e) {
        ret = e.target.result;
        lt_code.test.fileToBase.getReturn = function () {
            return ret;
        }
    }
    return ret;
};
//fileToBase函数接口
lt_code.test.fileToBase.getReturn = function () { };
//fileToBase函数接口

/**
 * 直接读取文件内容
 * @param {HTMLInputElement} inputFile 上传结点
 */
lt_code.test.readFile = function (inputFile) {
    /**H5自带读取器 */
    var reader = new FileReader();
    var ret = "";
    if (inputFile.value.length > 0) {
        var file = inputFile.files[0];
        reader.readAsText(file);
    }
    reader.onloadend = function (e) {
        ret = e.target.result;
        lt_code.test.readFile.getReturn = function () {
            return ret;
        }
    }
    return ret;
};
//readFile函数接口
lt_code.test.readFile.getReturn = function () { return ""; };
//readFile函数接口

/**
 * 尝试制作纯代码轮播的函数
 * 提供的接口请在使用此代码之前使用
 * 提供了:
 * 1.run用来停止循环的参数
 * 2.direction是否为纵向(默认横向)
 * 3.each_width/each_height每项宽高(防止无法读取)
 * 4.timer轮播动画进行的时间(默认一秒)
 * 5.waitTime轮播间隔时间(默认三秒)
 * 6.moveTo外部调用的移动函数
 * 7.useOnMouseStop是否使用鼠标停滞功能(默认是)
 * 8.useOnMouseStop是否使用鼠标停滞功能(默认是)
 * 9.useMouseWheel使用鼠标滚轮切换图片(默认否)
 * 10.nowPage现在是第几页
 * 11.moveToPage移动到固定页面的函数
 * @param {string} className 存放每项轮播内容的类名(".xxx")
 * @param {HTMLElement} dom_father 类存放的框架的对象
 */
lt_code.test.lunbo = function (className, dom_father) {
    /**用于轮询的变量 */
    var i = 0;

    //纠错判断
    if (arguments.length !== 2) {
        console.trace("lunbo函数参数输入出错");
        return;
    } else if (!(/\./.exec(className))) {
        console.trace("lunbo函数className参数输入错误!请使用css方式输入!");
        return;
    }

    /**存放所有的轮播项 */
    var all_lunbo = lt_code.getAll(className);
    //all_lunbo = Array.prototype.slice.call(all_lunbo);

    //纠错判断
    if (!all_lunbo.length) {
        console.trace("lunbo函数className参数输入出错!");
        return;
    } else if (dom_father.length && !dom_father) {
        console.trace("lunbo函数dom_father参数输入错误!");
        return;
    }

    /**存放每一项内容的数组 */
    var each_lunbo = new Array();
    /**存放每一项的宽度 */
    var each_width = all_lunbo[0].offsetWidth;
    /**存放每一项的高度 */
    var each_height = all_lunbo[0].offsetHeight;
    /**轮播总计有多少项 */
    var lunbo_cont = all_lunbo.length;
    /**是否向左移动 */
    var IsLeft = false;
    /**是否向上移动 */
    var IsTop = false;
    /**移动动画播放的时间 */
    var timer = lt_code.test.lunbo.timer;
    /**是否能移动 */
    var canMove = true;
    /**最左边/顶部的是当前的第几个 */
    var theFirst = 0;
    /**鼠标是否在轮播上 */
    var mouseOn = false;


    //防止无法读取到宽高
    each_width = lt_code.test.lunbo.each_width || each_width;
    each_height = lt_code.test.lunbo.each_height || each_height;

    //读取并移除所有项目
    for (i = 0; i < lunbo_cont; i++) {
        //读取所有项,并存放在变量里面
        each_lunbo[i] = all_lunbo[0].outerHTML;
        //从父类里面移除所有项目
        dom_father.removeChild(all_lunbo[0]);
    }

    //父类赋值
    dom_father.style.position = "relative";
    dom_father.style.overflow = "hidden";

    //向父类里面丢入用于移动的框
    dom_father.innerHTML += "<div class=\"test_lunbo\"></div>";

    /**用于移动的框*/
    var move_box = lt_code.getAll(".test_lunbo");

    //移动框赋值
    move_box.style.position = "absolute";
    if (lt_code.test.lunbo.direction) {
        //移动框高度赋值
        move_box.style.height = each_height * lunbo_cont + "px";
        //移动框宽度赋值
        move_box.style.width = each_width + "px";
        //向上移动留出移动空隙
        move_box.style.top = -each_height + "px";
    } else {
        //移动框高度赋值
        move_box.style.height = each_height + "px";
        //移动框宽度赋值
        move_box.style.width = each_width * lunbo_cont + "px";
        //向左移动留出移动空隙
        move_box.style.left = -each_width + "px";
    }

    //向移动框内重新写入部件
    for (i = 0; i < lunbo_cont; i++) {
        move_box.innerHTML += each_lunbo[i];
    }

    /**高速移动的函数 */
    var mover_fast = function () {
        /**快速移动的时间 */
        var fast_time = timer / 3;
        //时间变量纠错
        fast_time = lt_code.getNum(fast_time * 10) / 10;

        if (canMove) {
            canMove = false;
            if (lt_code.test.lunbo.direction) {
                if (IsTop) {
                    lt_code.moveBoxTo2(move_box, 0, -each_height * 2, fast_time);
                    theFirst++;
                } else {
                    lt_code.moveBoxTo2(move_box, 0, 0, fast_time);
                    theFirst--;
                }
            } else {
                if (IsLeft) {
                    lt_code.moveBoxTo2(move_box, -each_width * 2, 0, fast_time);
                    theFirst++;
                } else {
                    lt_code.moveBoxTo2(move_box, 0, 0, fast_time);
                    theFirst--;
                }
            }
            //检查
            theFirst = chack_the_number(theFirst);
            //删除
            if (lt_code.test.lunbo.direction) {
                if (IsTop) {
                    delete_lunbo_fast(chack_the_number(theFirst));
                } else {
                    delete_lunbo_fast(chack_the_number(theFirst));
                }
            } else {
                if (IsLeft) {
                    delete_lunbo_fast(chack_the_number(theFirst));
                } else {
                    delete_lunbo_fast(chack_the_number(theFirst));
                }
            }
            //现在是第几页
            lt_code.test.lunbo.nowPage = theFirst;
            //延时
            setTimeout(function () {
                canMove = true;
            }, fast_time * 1000 + 20);
        }
    };

    /**移动的函数 */
    var mover = function () {
        if (canMove) {
            canMove = false;
            if (lt_code.test.lunbo.direction) {
                if (IsTop) {
                    lt_code.moveBoxTo2(move_box, 0, -each_height * 2, timer);
                    theFirst++;
                } else {
                    lt_code.moveBoxTo2(move_box, 0, 0, timer);
                    theFirst--;
                }
            } else {
                if (IsLeft) {
                    lt_code.moveBoxTo2(move_box, -each_width * 2, 0, timer);
                    theFirst++;
                } else {
                    lt_code.moveBoxTo2(move_box, 0, 0, timer);
                    theFirst--;
                }
            }
            //检查
            theFirst = chack_the_number(theFirst);
            //删除
            if (lt_code.test.lunbo.direction) {
                if (IsTop) {
                    delete_lunbo(chack_the_number(theFirst));
                } else {
                    delete_lunbo(chack_the_number(theFirst));
                }
            } else {
                if (IsLeft) {
                    delete_lunbo(chack_the_number(theFirst));
                } else {
                    delete_lunbo(chack_the_number(theFirst));
                }
            }
            //现在是第几页
            lt_code.test.lunbo.nowPage = theFirst;
            //延时
            setTimeout(function () {
                canMove = true;
            }, timer * 1000 + 20);
        }
    };

    /**
     * 删除并更新每一项的函数
     * @param {number} num 删除的项
     */
    var delete_lunbo = function (num) {
        //console.trace(all_lunbo);
        setTimeout(function () {
            //console.trace(move_box);
            if (IsLeft && !lt_code.test.lunbo.direction || lt_code.test.lunbo.direction && IsTop) {
                move_box.removeChild(all_lunbo[0]);
                move_box.innerHTML += each_lunbo[num];
            } else if (!IsLeft && !lt_code.test.lunbo.direction || lt_code.test.lunbo.direction && !IsTop) {
                move_box.removeChild(all_lunbo[lunbo_cont - 1]);
                move_box.innerHTML = each_lunbo[num] + move_box.innerHTML;
            }
            update_lunbo();
            //move_box框更新
            if (lt_code.test.lunbo.direction) {
                move_box.style.top = -each_height + "px";
            } else {
                move_box.style.left = -each_width + "px";
            }
        }, timer * 1000);
    };

    /**
     * 快速删除并更新每一项的函数
     * @param {number} num 删除的项
     */
    var delete_lunbo_fast = function (num) {
        var fast_time = timer / 3;
        fast_time = lt_code.getNum(fast_time * 10) / 10;
        //console.trace(all_lunbo);
        setTimeout(function () {
            //console.trace(move_box);
            if (IsLeft && !lt_code.test.lunbo.direction || lt_code.test.lunbo.direction && IsTop) {
                move_box.removeChild(all_lunbo[0]);
                move_box.innerHTML += each_lunbo[num];
            } else if (!IsLeft && !lt_code.test.lunbo.direction || lt_code.test.lunbo.direction && !IsTop) {
                move_box.removeChild(all_lunbo[lunbo_cont - 1]);
                move_box.innerHTML = each_lunbo[num] + move_box.innerHTML;
            }
            update_lunbo();
            //move_box框更新
            if (lt_code.test.lunbo.direction) {
                move_box.style.top = -each_height + "px";
            } else {
                move_box.style.left = -each_width + "px";
            }
        }, fast_time * 1000);
    };

    /**
     * 检查是否超过边界的函数
     * @param {number} num 要检查的值
     * @return {number} 返回已经检查完的值
     */
    var chack_the_number = function (num) {
        num = num >= lunbo_cont ? num - lunbo_cont : num;
        num = num < 0 ? num + lunbo_cont : num;
        return num;
    };

    /**向左移动几次的函数
     * @param {number} num 移动几次
     * */
    var trun_left = function (num) {
        IsLeft = true;
        var run = setInterval(function () {
            num = num - 1;
            if (num < 0) {
                clearInterval(run);
            }
            mover();
        }, timer * 1000 + 20);
    };

    /**向右移动几次的函数
     * @param {number} num 移动几次
     * */
    var trun_right = function (num) {
        IsLeft = false;
        var run = setInterval(function () {
            num = num - 1;
            if (num < 0) {
                clearInterval(run);
            }
            mover();
        }, timer * 1000 + 20);
    };

    /**向左移动几次的函数
     * @param {number} num 移动几次
     * */
    var trun_top = function (num) {
        IsTop = true;
        var run = setInterval(function () {
            num = num - 1;
            if (num < 0) {
                clearInterval(run);
            }
            mover();
        }, timer * 1000 + 20);
    };

    /**向右移动几次的函数
     * @param {number} num 移动几次
     * */
    var trun_bottom = function (num) {
        IsTop = false;
        var run = setInterval(function () {
            num = num - 1;
            if (num < 0) {
                clearInterval(run);
            }
            mover();
        }, timer * 1000 + 20);
    };

    //重写给外部的移动函数
    lt_code.test.lunbo.moveTo = function (num, way) {
        if (lt_code.test.lunbo.direction) {
            if (way === "top") {
                trun_top(num);
            } else if (way === "bottom") {
                trun_bottom(num);
            } else {
                console.trace("lunbo.moveTo函数way参数输入错误!");
            }
        } else {
            if (way === "left") {
                trun_left(num);
            } else if (way === "right") {
                trun_right(num);
            } else {
                console.trace("lunbo.moveTo函数way参数输入错误!");
            }
        }
    };

    /**重置all_lunbo参数的函数 */
    var update_lunbo = function () {
        all_lunbo = lt_code.getAll(className);
        each_width = lt_code.test.lunbo.each_width || all_lunbo[0].offsetWidth;
        each_height = lt_code.test.lunbo.each_height || all_lunbo[0].offsetHeight;
    };

    /**重置all_lunbo参数以及each_lunbo参数的函数 */
    var update_lunbo2 = function () {
        all_lunbo = lt_code.getAll(className);
        each_width = lt_code.test.lunbo.each_width || all_lunbo[0].offsetWidth;
        each_height = lt_code.test.lunbo.each_height || all_lunbo[0].offsetHeight;
        for (var i = 0; i < all_lunbo.length; i++) {
            all_lunbo[i].style.width = each_width + "px";
            all_lunbo[i].style.height = each_height + "px";
        }
        for (var i = 0; i < each_lunbo.length; i++) {
            each_lunbo[i] = all_lunbo[i].outerHTML;
        }
        //console.log(each_lunbo);
    };

    //重新读取all_lunbo
    update_lunbo();

    //检查轮播等待时间(是否比动画时间短)
    lt_code.test.lunbo.waitTime =
        lt_code.test.lunbo.waitTime < lt_code.test.lunbo.timer ?
            lt_code.test.lunbo.timer : lt_code.test.lunbo.waitTime;

    /**读取等待的时间 */
    var waitTime = lt_code.test.lunbo.waitTime;

    //特殊挂载
    lt_code.test.lunbo.run = setInterval(function () {
        if (!mouseOn) {
            mover();
        }
    }, waitTime * 1000);



    /**第二类鼠标在物件上的特殊函数 */
    var mouse_on1 = function () {
        clearInterval(lt_code.test.lunbo.run);
        lt_code.test.lunbo.run = new Array();
    };

    /**第二类鼠标在物件上特殊挂载函数(废弃,太浪费性能) */
    var mouse_on2 = function () {
        if (mouseOn) {
            for (i = 0; i < lt_code.test.lunbo.run.length; i++) {
                clearInterval(lt_code.test.lunbo.run[i]);
            }
        } else {
            lt_code.test.lunbo.run[lt_code.test.lunbo.run.length] = setInterval(function () {
                mover();
            }, waitTime * 1000);
            for (i = 0; i < lt_code.test.lunbo.run.length; i++) {
                clearInterval(lt_code.test.lunbo.run[i]);
            }
        }
        if (lt_code.test.lunbo.run.length > 20) {
            lt_code.test.lunbo.run.splice(1, 19);
        }
    };


    /**
     * 单纯的快速移动函数
     * @param {number} num 移动几次
     */
    var moves = function (num) {
        /**快速移动的时间 */
        var fast_time = timer / 3;
        //快速移动时间纠错
        fast_time = lt_code.getNum(fast_time * 10) / 10;
        /**每次移动的函数 */
        var move_each = function () {
            num--;
            if (num < 0) {
                clearInterval(run);
            }
            mover_fast();
        };

        if (num > 0) {
            /**挂载 */
            var run = setInterval(function () {
                move_each();
            }, fast_time * 1000);
        }
    };

    //重写鼠标停留停止的函数2(使用window.onmousemove)
    lt_code.test.lunbo.useOnMouseStop2 = function (box) {
        lt_code.test.lunbo.useOnMouseStop = false;
        /**盒子距离左边的距离 */
        var box_left = box.offsetLeft;
        /**盒子距离右边的距离 */
        var box_top = box.offsetTop;
        /**盒子的高度 */
        var box_Height = box.offsetHeight;
        /**盒子的宽度 */
        var box_Width = box.offsetWidth;

        //mouse_on1();

        window.onmousemove = function (e) {
            e = e || window.event;
            if (e &&
                e.clientX > box_left &&
                e.clientX < (box_left + box_Width) &&
                e.clientY < box_top &&
                e.clientY < (box_top + box_Height)
            ) {
                mouseOn = true;
                //mouse_on2();
            } else {
                mouseOn = false;
                //mouse_on2();
            }
        };
    };

    //使用鼠标停留
    if (lt_code.test.lunbo.useOnMouseStop) {
        dom_father.onmouseover = function () {
            mouseOn = true;
        };
        dom_father.onmouseout = function () {
            mouseOn = false;
        };
    }

    //使用鼠标滚轮切换图片
    if (lt_code.test.lunbo.useMouseWheel) {
        //lt_code.getAll().style.overflow = "hidden";
        dom_father.onmousewheel = function (e) {
            //对e赋值
            e = e || window.event;
            if (e.wheelDelta && canMove && lt_code.test.lunbo.useMouseWheel) {
                lt_code.test.lunbo.useMouseWheel = false;
                if (lt_code.getNum(e.wheelDelta, 4) > 0) {
                    if (lt_code.test.lunbo.direction) {
                        trun_top(1);
                    } else {
                        trun_left(1);
                    }
                } else {
                    if (lt_code.test.lunbo.direction) {
                        trun_bottom(1);
                    } else {
                        trun_right(1);
                    }
                }
                //鼠标延时(禁止连滚)
                setTimeout(function () {
                    lt_code.test.lunbo.useMouseWheel = true;
                }, timer * 1000);
            }

        };
    }

    //重写移动到固定页面的函数
    lt_code.test.lunbo.moveToPage = function (num) {
        //检查num参数是否超出限制
        if (num >= lunbo_cont || num < 0) {
            console.trace("lunbo模块中的moveToPage函数参数输入超出上限/下限!");
            return;
        }

        /**输入的数字距离顶部(左边)的距离 */
        var TLnum;
        /**输入的数字距离底部(右边)的距离 */
        var RBnum;

        /**检查的函数
         * @return {number} 返回需要移动的量
         */
        var chacks = function () {
            /**检查距离左侧的距离的函数 */
            var chacks_left = function () {
                TLnum = theFirst - lunbo_cont;
                TLnum = num - TLnum;
            };

            /**检查距离顶侧的距离的函数 */
            var chacks_top = function () {
                TLnum = theFirst - lunbo_cont;
                TLnum = num - TLnum;
            };

            /**检查距离底侧的距离的函数 */
            var chacks_bottom = function () {
                RBnum = theFirst + lunbo_cont;
                RBnum = RBnum - num;
            };

            /**检查距离右侧的距离的函数 */
            var chacks_right = function () {
                RBnum = theFirst + lunbo_cont;
                RBnum = RBnum - num;
            };

            /**选择方向的函数 */
            var chouse_way = function () {
                /**取绝对值的函数(消减超量)
                 * @param {number} a 输入要取绝对值的数
                 * @return {number} 返回绝对值
                 */
                var abs = function (a) {
                    if (a < 0) {
                        a = -a;
                    }
                    a = a > lunbo_cont ? a - lunbo_cont : a;
                    return a;
                };

                //取绝对值
                RBnum = abs(RBnum);
                TLnum = abs(TLnum);

                //判断方向
                if (TLnum < RBnum) {
                    if (lt_code.test.lunbo.direction) {
                        IsTop = true;
                    } else {
                        IsLeft = true;
                    }
                } else if (TLnum > RBnum) {
                    if (lt_code.test.lunbo.direction) {
                        IsTop = false;
                    } else {
                        IsLeft = false;
                    }
                }
            };

            /**返回值函数
             * @return {number} 返回移动量
             */
            var return_num = function () {
                /**返回值 */
                var return_value;
                if (lt_code.test.lunbo.direction) {
                    if (IsTop) {
                        return_value = TLnum;
                    } else {
                        return_value = RBnum;
                    }
                } else {
                    if (IsLeft) {
                        return_value = TLnum;
                    } else {
                        return_value = RBnum;
                    }
                }
                return return_value;
            };

            //判断方向
            if (lt_code.test.lunbo.direction) {
                chacks_top();
                chacks_bottom();
            } else {
                chacks_left();
                chacks_right();
            }
            chouse_way();
            //console.trace(return_num());
            return return_num() === 4 ? 0 : return_num();
        };


        //进行移动
        moves(chacks());
    };

    //重写改变宽高
    lt_code.test.lunbo.changeEachWH = function (w, h) {
        lt_code.test.lunbo.each_height = h;
        lt_code.test.lunbo.each_width = w;
        update_lunbo2();
        if (lt_code.test.lunbo.direction) {
            //移动框高度赋值
            move_box.style.height = each_height * lunbo_cont + "px";
            //移动框宽度赋值
            move_box.style.width = each_width + "px";
            //向上移动留出移动空隙
            move_box.style.top = -each_height + "px";
        } else {
            //移动框高度赋值
            move_box.style.height = each_height + "px";
            //移动框宽度赋值
            move_box.style.width = each_width * lunbo_cont + "px";
            //向左移动留出移动空隙
            move_box.style.left = -each_width + "px";
        }
    }
};

//以下是lt_code.test.lunbo的接口
/**lunbo函数专用挂载 */
lt_code.test.lunbo.run = null;

/**是否是纵向(默认为横向) */
lt_code.test.lunbo.direction = false;

/**轮播每一项的宽度(防止读取不到) */
lt_code.test.lunbo.each_width = null;

/**轮播每一项的高度(防止读取不到) */
lt_code.test.lunbo.each_height = null;

/**轮播动画每次播放的时间(默认1s) */
lt_code.test.lunbo.timer = 1;

/**轮播间隔时间(默认3s) */
lt_code.test.lunbo.waitTime = 3;

/**
 * 定义给外部的,移动到那一片的函数接口
 * @param {number} num 移动到第几片
 * @param {string} way 移动的方向("top,bottom,left,right")
 */
lt_code.test.lunbo.moveTo = function (num, way) { };

/**鼠标在的时候是否停止(默认是) */
lt_code.test.lunbo.useOnMouseStop = true;

/**
 * 鼠标在大框上的时候是否停止2(默认否)
 * (使用window.onmousemove,可能造成影响)
 * @param {HTMLElement} box 大框
 * */
lt_code.test.lunbo.useOnMouseStop2 = function (box) { };

/**使用鼠标滚轮切换图片(默认否) */
lt_code.test.lunbo.useMouseWheel = false;

/**现在是第几页 */
lt_code.test.lunbo.nowPage = 0;

/**
 * 移动到固定页面的函数
 * @param {number} num 固定页面数
 */
lt_code.test.lunbo.moveToPage = function (num) { };

/**
 * 改变每项宽高(不建议使用)
 * 1.可能会导致轮播出错
 * 2.可能会导致当前页码参数出错
 * @param {number} w 宽度
 * @param {number} h 高度
 */
lt_code.test.lunbo.changeEachWH = function (w, h) {

}
//以上是lt_code.test.lunbo的接口

/**
 * 定义给外部的,移动到那一片的函数接口
 * @param {number} num 移动到第几片
 * @param {string} way 移动的方向("top,bottom,left,right")
 */
lt_code.test.lunbo.moveTo = function (num, way) { };

/**鼠标在的时候是否停止(默认是) */
lt_code.test.lunbo.useOnMouseStop = true;

/**
 * 鼠标在大框上的时候是否停止2(默认否)
 * (使用window.onmousemove,可能造成影响)
 * @param {HTMLElement} box 大框
 * */
lt_code.test.lunbo.useOnMouseStop2 = function (box) { };

/**使用鼠标滚轮切换图片(默认否) */
lt_code.test.lunbo.useMouseWheel = false;

/**现在是第几页 */
lt_code.test.lunbo.nowPage = 0;

/**
 * 移动到固定页面的函数
 * @param {number} num 固定页面数
 */
lt_code.test.lunbo.moveToPage = function (num) { };
//以上是lt_code.test.lunbo的接口


/**
 * 中心定位(放大)的函数(未完成)
 * @param {string} className 要被放大的物体的类名
 * @param {number} minWH 最小宽高
 * @param {number} maxWH 最大宽高
 */
lt_code.test.middleBiger = function (className, minWH, maxWH) {
    /**给轮询用的变量 */
    var i;
    /**xy轴偏移量 */
    var tran_xy = (maxWH - minWH) / 2;
    /**动画进行的时间 */
    var timer = lt_code.test.middleBiger.times;
    //纠错
    if (arguments.length !== 3) {
        console.trace("middleBiger函数参数输入错误!");
        return;
    }

    /**获取要变动的框 */
    var change_box = lt_code.getAll("." + className);

    //框架赋值
    if (change_box.length) {
        for (i = 0; i < change_box.length; i++) {
            change_box[i].style.transitionDuration = timer + "s";
            change_box[i].style.transform = "translate(" + tran_xy + "px," + tran_xy + "px)";
        }
    } else {
        change_box.style.transitionDuration = timer + "s";
        change_box.style.transform = "translate(" + tran_xy + "px," + tran_xy + "px)";
    }

    //useChange参数判断
    lt_code.test.middleBiger.useChange = lt_code.test.middleBiger.useChange > 3 ? 0 : lt_code.test.middleBiger.useChange;
    lt_code.test.middleBiger.useChange = lt_code.test.middleBiger.useChange < 0 ? 0 : lt_code.test.middleBiger.useChange;

    //动画判断
    if (lt_code.test.middleBiger.useChange) {
        /**等待的时间 */
        var waitTime = lt_code.test.middleBiger.waitTime;
        if (lt_code.test.middleBiger.useChange === 1) {
            if (waitTime <= timer * 2) {
                waitTime = timer * 2 + 0.05;
            }
            lt_code.test.middleBiger.run = setInterval(function () {
                biger();
                setTimeout(function () {
                    smaller();
                }, timer * 1000);
            }, waitTime * 1000);
        } else if (lt_code.test.middleBiger.useChange === 2) {
            if (waitTime <= timer) {
                waitTime = timer + 0.05;
            }
            lt_code.test.middleBiger.run = setInterval(function () {
                biger();
                setTimeout(function () {
                    smaller2();
                }, timer * 1000);
            }, waitTime * 1000);
        } else if (lt_code.test.middleBiger.useChange === 3) {
            if (waitTime <= timer) {
                waitTime = timer + 0.05;
            }
            lt_code.test.middleBiger.run = setInterval(function () {
                smaller();
                setTimeout(function () {
                    biger2();
                }, timer * 1000);
            }, waitTime * 1000);
        }
    }

    /**变小的函数 */
    var smaller = function () {
        if (change_box.length) {
            for (i = 0; i < change_box.length; i++) {
                change_box[i].style.transitionDuration = timer + "s";
                change_box[i].style.width = minWH + "px";
                change_box[i].style.height = minWH + "px";
                change_box[i].style.transform = "translate(" + tran_xy + "px," + tran_xy + "px)";
            }
        } else {
            change_box.style.transitionDuration = timer + "s";
            change_box.style.height = minWH + "px";
            change_box.style.width = minWH + "px";
            change_box.style.transform = "translate(" + tran_xy + "px," + tran_xy + "px)";
        }
    };

    /**变大的函数 */
    var biger = function () {
        if (change_box.length) {
            for (i = 0; i < change_box.length; i++) {
                change_box[i].style.transitionDuration = timer + "s";
                change_box[i].style.width = maxWH + "px";
                change_box[i].style.height = maxWH + "px";
                change_box[i].style.transform = "translate(0px,0px)";
            }
        } else {
            change_box.style.transitionDuration = timer + "s";
            change_box.style.width = maxWH + "px";
            change_box.style.height = maxWH + "px";
            change_box.style.transform = "translate(0px,0px)";
        }
    };

    /**变小的函数(无动画) */
    var smaller2 = function () {
        if (change_box.length) {
            for (i = 0; i < change_box.length; i++) {
                change_box[i].style.transitionDuration = "";
                change_box[i].style.width = minWH + "px";
                change_box[i].style.height = minWH + "px";
                change_box[i].style.transform = "translate(" + tran_xy + "px," + tran_xy + "px)";
            }
        } else {
            change_box.style.transitionDuration = "";
            change_box.style.height = minWH + "px";
            change_box.style.width = minWH + "px";
            change_box.style.transform = "translate(" + tran_xy + "px," + tran_xy + "px)";
        }
    };

    /**变大的函数(无动画) */
    var biger2 = function () {
        if (change_box.length) {
            for (i = 0; i < change_box.length; i++) {
                change_box[i].style.transitionDuration = "";
                change_box[i].style.width = maxWH + "px";
                change_box[i].style.height = maxWH + "px";
                change_box[i].style.transform = "translate(0px,0px)";
            }
        } else {
            change_box.style.transitionDuration = "";
            change_box.style.width = maxWH + "px";
            change_box.style.height = maxWH + "px";
            change_box.style.transform = "translate(0px,0px)";
        }
    };



    lt_code.test.middleBiger.biger = function () {
        biger();
    };
    lt_code.test.middleBiger.smaller = function () {
        smaller();
    };
};
//middleBiger函数的接口
/**动画进行的时间(默认一秒) */
lt_code.test.middleBiger.times = 1;

/**是否进行放大动画(0:无动画,1:放大缩小,2:单纯放大,3单纯缩小 */
lt_code.test.middleBiger.useChange = 0;

/**专用挂载 */
lt_code.test.middleBiger.run = null;

/**两次轮播间隔时间 */
lt_code.test.middleBiger.waitTime = 2;

/**变大的函数 */
lt_code.test.middleBiger.biger = null;

/**变小的函数 */
lt_code.test.middleBiger.smaller = null;
//middleBiger函数的接口

/**
 * 裁切图片的函数
 * @param {HTMLElement} img 预览的对象
 * @param {HTMLElement} img2 输出的对象
 * @param {HTMLElement} input 上传按钮
 */
lt_code.test.cutImages = function (img, img2, input) {
    //文件上传完成
    input.onchange = function () {
        //双画布清理
        clear_1();
        //读取图片转化为base64数据流
        read_img(this);

    };

    if (typeof FileReader === "undefined") {
        alert("无法使用预览!");
        //直接退出
        return;
    } else {
        /**
         * 读取上传文件的base64编码
         * @param {File} obj 上传图片
         */
        var read_img = function (obj) {
            var file = obj.files[0];

            //console.trace(obj); 
            //console.trace(file);
            console.trace("图片大小为: " + file.size + " byte");  //file.size 单位为byte

            if (file.size > 5242880) {
                console.trace("图片过大!");
                return;
            }

            var reader = new FileReader();

            //读取文件过程方法
            reader.onloadstart = function (e) {
                console.trace("开始读取....");
            };
            reader.onprogress = function (e) {
                console.trace("正在读取中....");
            };
            reader.onabort = function (e) {
                console.trace("中断读取....");
            };
            reader.onerror = function (e) {
                console.trace("读取异常....");
            };
            reader.onload = function (e) {
                console.trace("成功读取....");
                //或者 img.src = this.result;  //e.target == this
                img.src = e.target.result;
                img_data = e.target.result;
            };

            reader.readAsDataURL(file);
        };
    }

    /**用于裁切的canvas */
    var cas2 = document.createElement("canvas");

    //cas2赋值
    cas2.width = 300;
    cas2.height = 300;
    cas2.style.opacity = "0";
    cas2.style.position = "absolute";
    cas2.style.top = "0";

    /**导出裁切后的图片数据 */
    var img_data = null;

    /**用于传出数据的变量 */
    var return_data = null;

    /**剪切图片的框 */
    var chack_box = document.createElement("div");
    //框赋值
    chack_box.id = "chack_box";
    chack_box.style.border = "2px solid blue";
    chack_box.style.position = "absolute";
    chack_box.style.top = img.offsetTop + "px";
    chack_box.style.left = img.offsetLeft + "px";
    chack_box.style.width = "100px";
    chack_box.style.height = "100px";

    //加入裁切框
    lt_code.getDomFather(img).appendChild(chack_box);
    lt_code.getDomFather(img).style.overflow = "hidden";

    //让框能被鼠标拖动
    lt_code.makeMoveBox(chack_box);

    //鼠标放大裁切框
    chack_box.onmousewheel = function (e) {
        e = e || window.event;
        var change_delta = e.wheelDelta / 120;
        //console.trace(change_delta);
        chack_box.style.width = (/[\d]+/.exec(chack_box.style.width) - change_delta) + "px";
        chack_box.style.width = (/-?[\d]+/.exec(chack_box.style.width) > img.offsetWidth ? img.offsetWidth : /-?[\d]+/.exec(chack_box.style.width)) + "px";
        chack_box.style.height = (/[\d]+/.exec(chack_box.style.height) - change_delta) + "px";
        chack_box.style.height = (/-?[\d]+/.exec(chack_box.style.height) > img.offsetHeight ? img.offsetHeight : /-?[\d]+/.exec(chack_box.style.height)) + "px";
    };

    /**第二个ctx对象 */
    var ctx2 = cas2.getContext("2d");

    /**清理第二画布的函数 */
    var clear_2 = function () {
        ctx2.clearRect(0, 0, cas2.offsetWidth, cas2.offsetHeight);
        img2.src = "";
    };

    /**清理第一画布的函数 */
    var clear_1 = function () {
        clear_2();
        img.src = "";
    };

    /**裁切函数 */
    var input_chick = function () {
        //console.trace("开始裁切");
        clear_2();

        var else_img = document.createElement("img");
        else_img.style.opacity = 0;
        else_img.id = "else_img";
        else_img.src = img_data;
        lt_code.getAll().appendChild(else_img);
        //console.trace(lt_code.getAll("#else_img"));
        var img_width = lt_code.getAll("#else_img").offsetWidth;
        img_width = img_width / 170;
        var img_height = lt_code.getAll("#else_img").offsetHeight;
        img_height = img_height / 170;
        lt_code.getAll().removeChild(lt_code.getAll("#else_img"));

        ctx2.drawImage(img,
            chack_box.offsetLeft * img_width,
            chack_box.offsetTop * img_height,
            chack_box.offsetWidth * img_width,
            chack_box.offsetHeight * img_height,
            0,
            0,
            300,
            300);

        var a = {
            img: img,
            1: chack_box.offsetLeft * img_width,
            2: chack_box.offsetTop * img_height,
            3: chack_box.offsetWidth * img_width,
            4: chack_box.offsetHeight * img_height,
            5: 0,
            6: 0,
            7: 300,
            8: 300,
            9: img_width,
            10: img_height
        };

        //console.trace(a);

        //读取base64码
        img_data = cas2.toDataURL();

        //输出图片
        img2.src = img_data;

        //输出变量赋值
        return_data = img_data;

        //重新读取src
        img_data = img.src;
    };

    //重写清除上传图片的函数
    lt_code.test.cutImages.clearAll = function () {
        clear_1();
    };

    //重写返回函数
    lt_code.test.cutImages.getReturn = function () {
        return return_data;
    };

    //重写裁切函数
    lt_code.test.cutImages.cutImages = function () {
        lt_code.getAll().appendChild(cas2);
        input_chick();
    };
};
//cutImages函数接口
/**
 * 获取裁切完的图片的函数
 * @return {string} 返回base64编码
 */
lt_code.test.cutImages.getReturn = function () { return ""; };
/**清除上传的图片 */
lt_code.test.cutImages.clearAll = function () { };
/**裁切图片 */
lt_code.test.cutImages.cutImages = function () { };
//cutImages函数接口

/**
 * 获取input上传图片
 * @param {HTMLInputElement} input 输入框
 * @param {HTMLCanvasElement} cas 输出框
 */
lt_code.test.getImgInput = function (input, cas) {
    var img_data = "";
    var img = document.createElement("img");
    //文件上传完成
    input.onchange = function () {
        //读取图片转化为base64数据流
        read_img(this);
    };

    if (typeof FileReader === "undefined") {
        alert("无法使用预览!");
        //直接退出
        return;
    } else {
        var type = arguments.length;

        if (type === 2) {
            var ctx = cas.getContext("2d");
        }
        /**
         * 读取上传文件的base64编码
         * @param {File} obj 上传图片
         */
        var read_img = function (obj) {
            var file = obj.files[0];

            //console.trace(obj); 
            //console.trace(file);
            console.trace("图片大小为: " + file.size + " byte");  //file.size 单位为byte

            if (file.size > 5242880) {
                console.trace("图片过大!");
                return;
            }

            var reader = new FileReader();

            //读取文件过程方法
            reader.onloadstart = function (e) {
                console.trace("开始读取....");
            };
            reader.onprogress = function (e) {
                console.trace("正在读取中....");
            };
            reader.onabort = function (e) {
                console.trace("中断读取....");
            };
            reader.onerror = function (e) {
                console.trace("读取异常....");
            };
            reader.onload = function (e) {
                console.trace("成功读取....");
                //console.trace(type);
                if (type === 1) {
                    img_data = e.target.result;
                } else if (type === 2) {
                    img.src = e.target.result;
                    img_data = e.target.result;
                    setTimeout(function () {
                        ctx.clearRect(0, 0, cas.offsetWidth, cas.offsetHeight);
                        ctx.drawImage(img, 0, 0);
                    }, 200);
                }
            };

            reader.readAsDataURL(file);
        };
    }
    lt_code.test.getImgInput.getReturn = function () {
        return img_data;
    };

    lt_code.test.getImgInput.getImage = function () {
        img.src = img_data;
        return img;
    }
}
//获取input上传图片接口
/**获取input上传的图片的内容 */
lt_code.test.getImgInput.getReturn = function () {
    return "";
}
/**获取上传的图片结点
 * @returns {HTMLImageElement}*/
lt_code.test.getImgInput.getImage = function () {
    return document.createElement("img");
}
//获取input上传图片接口

/**
 * base64转化为文件的函数
 * @param {string} data base64格式的字符串
 * @param {string} filename 新生成的文件的名称
 * @return {File} 返回文件
 */
lt_code.test.dataURLtoFile = function (data, filename) {
    var arr = data.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

/**
 * js下载文件到本地
 * @param {string} data base64流
 * @param {string} fileName 文件名
 */
lt_code.test.downFile = function (data, fileName) {
    var file = lt_code.test.dataURLtoFile(data, fileName);
    var blob = new Blob([file], { type: file.type });
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName);
    } else {
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(link.href);
    }
};

/**
 * 尝试挂载函数
 * @param {Array|HTMLAllCollection} doms 对象
 * @param {string} e 触发事件
 * @param {Function} fuc 函数(函数不能有参数！！！)
 */
lt_code.test.on = function (doms, e, fuc) {
    lt_code.test.on._time = "a" + Date.now();
    lt_code.test.on._doms = doms;
    //暂时废弃
    !function () {
        ///**函数的变量正则 */
        //var fuc_arg = /function[\ ]*\((.*)\)/.exec(fuc.toString());
        ///**输入函数的变量 */
        //var fuc_value = fuc_arg[1];
        ///**函数的变量个数并获取所有的输入变量 */
        //var fuc_arg_length = function () {
        //    var ret = 0;
        //    if (!fuc_value) {
        //        ret = 0;
        //    } else if (!/,/.test(fuc_value)) {
        //        ret = 1;
        //    } else {
        //        while (/,/.test(fuc_value)) {
        //            lt_code.test.on.args[lt_code.test.on.args.length] =
        //                /(.+),/.exec(fuc_arg)[1];
        //            fuc_value = fuc_value.replace(/(.+),/, "");
        //            ret++;
        //        }
        //        ret++;
        //        lt_code.test.on.args[lt_code.test.on.args.length] = fuc_value;
        //    }
        //    return ret;
        //}();
    }();
    console.trace(doms);
    eval("var " + lt_code.test.on._time + " = lt_code.test.on._doms;");
    lt_code.test.on._doms = null;
    for (var i = 0; i < doms.length; i++) {
        eval(lt_code.test.on._time + "[" + i + "]." + e + " = " + fuc);
    }
}
//给挂载函数的接口
/**暂时使用的变量名 */
lt_code.test.on._time = null;
/**暂时使用对象 */
lt_code.test.on._doms = null;
///**挂载函数的变量组 */
//lt_code.test.on.args = [];
//给挂载函数的接口

/**
 * 尝试挂载函数（有参尝试）(暂时废弃)
 * @param {string} doms 对象的名称
 * @param {string} e 触发事件
 * @param {Function} fuc 函数
 */
lt_code.test.on2 = function (doms, e, fuc) {
    lt_code.test.on2._time = "_" + Date.now();
    lt_code.test.on2._doms = lt_code.getAll(doms);
    eval("var " + lt_code.test.on2._time + " = lt_code.test.on2._doms;");
    lt_code.test.on2._doms = null;
    for (var i = 0; i < doms.length; i++) {
        eval(lt_code.test.on2._time + "[" + i + "]." + e + " = " + fuc);
    }
}
//给挂载函数的接口
/**暂时使用的变量名 */
lt_code.test.on2._time = null;
/**暂时使用对象 */
lt_code.test.on2._doms = null;
///**挂载函数的变量组 */
//lt_code.test.on2.args = [];
//给挂载函数的接口

/**
 * 把一位字符转为中文字符
 * @param {string} s 需要转化的一位字符
 */
lt_code.test.oneTextToChinese = function (s) {
    var ret = s;
    if (/[a-z]/.test(ret)) {
        ret = lt_code.test.oneTextToChinese.retlist[lt_code.test.oneTextToChinese.getlist.search(s)];
    } else if (/[A-Z]/.test(ret)) {
        ret = lt_code.test.oneTextToChinese.retList[lt_code.test.oneTextToChinese.getList.search(s)];
    } else if (/[\d]/.test(ret)) {
        ret = this.oneTextToChinese.numlist[this.oneTextToChinese.numList.search(s)];
    } else if (s == "-") {
        ret = "—";
    }
    return ret;
}

//转化字符的外部内容
lt_code.test.oneTextToChinese.retlist = "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ";
lt_code.test.oneTextToChinese.numlist = "０１２３４５６７８９";
lt_code.test.oneTextToChinese.retList = "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ";
lt_code.test.oneTextToChinese.getlist = "abcdefghijklmnopqrstuvwxyz";
lt_code.test.oneTextToChinese.numList = "0123456789";
lt_code.test.oneTextToChinese.getList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//转化字符的外部内容

/**
 * 把一位中文字符转化为正常字符
 * @param {any} s 需要转化一位中文字符
 */
lt_code.test.oneChineseToText = function (s) {
    var ret = s;
    if (/[ａ-ｚ]/.test(ret)) {
        ret = lt_code.test.oneTextToChinese.getlist[lt_code.test.oneTextToChinese.retlist.search(s)];
    } else if (/[Ａ-Ｚ]/.test(ret)) {
        ret = lt_code.test.oneTextToChinese.getList[lt_code.test.oneTextToChinese.retList.search(s)];
    } else if (/[０-９]/.test(ret)) {
        ret = lt_code.test.oneTextToChinese.numList[lt_code.test.oneTextToChinese.numlist.search(s)];
    } else if (s == "—") {
        ret = "-";
    }
    return ret;
}

/**
 * 把字符串转化为全中文
 * @param {string} str 字符串
 */
lt_code.test.textToChinese = function (str) {
    var ret = "";
    //解码出错...所以修改这个函数
    //str = Array.prototype.slice.call(str);
    //str.forEach(function (e) {
    //    ret += lt_code.test.oneTextToChinese(e);
    //});
    for (var i = 0; i < str.length; i++) {
        ret += lt_code.test.oneTextToChinese(str[i]);
    }
    return ret;
};

/**
 * 把中文字符串转化为普通字符串
 * @param {string} str 中文字符串
 */
lt_code.test.chineseToText = function (str) {
    var ret = "";
    //这个方式不行会因为(")字符导致失败
    //str = Array.prototype.slice.call(str);
    //str.forEach(function (e) {
    //    ret += lt_code.test.oneChineseToText(e);
    //});
    for (var i = 0; i < str.length; i++) {
        ret += lt_code.test.oneChineseToText(str[i]);
    }
    return ret;
};

/**操作cookie的模块 */
lt_code.cookie = function () {
    return document.cookie;
};

/**
 * 保存cookie
 * @param {string} cookieName 保存的cookie名称
 * @param {string} cookieValue 保存的cookie值
 * @param {number} [cookieDates] 保存的有效时间长度(默认7天)
 */
lt_code.cookie.saveCookie = function (cookieName, cookieValue, cookieDates) {
    var d = new Date(new Date().getTime() + (cookieDates ? cookieDates * 1000 * 60 * 60 * 24 : 7 * 1000 * 60 * 60 * 24));
    //由于base64编码中含有=符号导致cookie存储出错,因此这里使用八进制存储
    cookieValue = lt_code.RSA.project.encode(cookieValue);
    document.cookie = cookieName + "=" + cookieValue + ";expires=" +
        d.toUTCString();
}

/**
 * 获取cookie
 * @param {string} cookieName cookie名称
 */
lt_code.cookie.getCookie = function (cookieName) {
    var cookieStr = document.cookie;
    var arr = cookieStr.split("; ");
    var cookieValue = "";
    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].split("=");
        if (temp[0] == cookieName) {
            cookieValue = temp[1];
            break;
        }
    }
    cookieValue = lt_code.RSA.project.decode(cookieValue);
    return cookieValue;
}


/**
 * 删除cookie
 * @param {any} cookieName
 */
lt_code.cookie.removeCookie = function (cookieName) {
    document.cookie = encodeURIComponent(cookieName) + "=; expires =" + new Date(0).toUTCString();
}

/**删除所有的cookie */
lt_code.cookie.clearAllCookie = function () {
    var keys = document.cookie.match(/[^ =;]+(?==)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的
            //document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的，例如 .m.ratingdog.cn
            //document.cookie = keys[i] + '=0;path=/;domain=ratingdog.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .ratingdog.cn
        }
    }
};

/**操作内联边框的模块(还有bug尚未修改完成) */
lt_code.iframe = {};

/**网页的内联边框对象 */
lt_code.iframe.iframe = null;

/**网页的内联边框window */
lt_code.iframe.window = null;

/**网页内联边框的document */
lt_code.iframe.document = null;

/**获取内联边框的window */
lt_code.iframe.getWindow = function () {
    if (this.iframe !== null) {
        this.window = lt_code.getIframeWindow(this.iframe);
        return this.window;
    } else {
        console.trace("iframe模块内没有设置内联对象");
    }
}

/**获取内联边框的document */
lt_code.iframe.getDocument = function () {
    if (this.iframe !== null) {
        if (this.window !== null) {
            try {
                this.document = this.window.parent.document;
                return this.document;
            } catch (e) {
                console.trace("内联页面没有内容");
                console.log(e);
            }
        } else {
            console.trace("iframe模块没有获取到windows");
        }
    } else {
        console.trace("iframe模块内没有设置内联对象");
    }
}

/**
 * iframe模块初始化
 * @param {HTMLIFrameElement|String} iframeDom 内联边框对象
 */
lt_code.iframe.init = function (iframeDom) {
    if (typeof (iframeDom) == "string") {
        console.trace("不建议使用这种方法");
        this.iframe = lt_code.getAll(iframeDom, 0);
    } else {
        this.iframe = iframeDom;
    }
    this.getWindow();
    this.getDocument();
}

/**
 * 检查模块是否初始化
 * @return {boolean}
 */
lt_code.iframe.isInit = function () {
    return !!(this.iframe && this.window && this.document);
}

/**
 * 获得id所代表的dom
 * @param {string} idName 输入id名
 * @return {HTMLElement}
 */
lt_code.iframe.getId = function (idName) {
    if (!this.isInit()) {
        return console.error("iframe模块没有初始化");
    }
    var falseRet = () => {
        console.trace("getId函数没有输入值!");
        //console.trace(this);
        //console.trace(arguments.callee.caller.name);
    };
    return !this.document.getElementById(idName) ? falseRet() : this.document.getElementById(idName);
};

/**
 * 读取class所代表的dom(重载+4)
 * @param {string} className 输入class的名字 
 * @param {number} few 输入要读取的class里面的第几个
 * @param {HTMLElement} dom_father 要读取的父类代号
 * @param {boolean} useFew 是否使用few参数(默认使用)
 * @return {HTMLElement|HTMLElement[]} dom|doms
 */
lt_code.iframe.getClass = function (className, few, dom_father, useFew) {
    switch (arguments.length) {
        case 1: return this.document.getElementsByClassName(className);
        case 2: return this.document.getElementsByClassName(className)[few];
        case 3: return dom_father.getElementsByClassName(className)[few];
        case 4: if (useFew) {
            return dom_father.getElementsByClassName(className)[few];
        } else {
            return dom_father.getElementsByClassName(className);
        }
        default:
            if (arguments.length !== 0) {
                console.trace("getClass函数输入错误!");

            } else {
                console.trace("getClass函数没有输入值!");

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
lt_code.iframe.getTage = function (tageName, dom, few, ISuseDom) {
    switch (arguments.length) {
        case 1:
            return this.document.getElementsByTagName(tageName);
        case 2:
            return dom.getElementsByTagName(tageName);
        case 3:
            return dom.getElementsByTagName(tageName)[few];
        case 4:
            if (ISuseDom) {
                return dom.getElementsByTagName(tageName)[few];
            } else {
                return this.document.getElementsByTagName(tageName)[few];
            }
        default:
            if (arguments.length !== 0) {
                console.trace("getTage函数输入错误!");

            } else {
                console.trace("getTage函数没有输入值!");

            }
    }
};

/**
 * 读取对象的函数(功能不强)(重载+4)(id:#)(class:.)
 * @param {string} name 输入的名称(可以是任何方式) 
 * @param {number} few 第几个
 * @param {HTMLElement} dom_father 父类名称
 * @param {boolean} useFew 是否使用few参数
 * @return {HTMLElement|HTMLCollection|void} 输出对象
 */
lt_code.iframe.getAll = function (name, few, dom_father, useFew) {
    /**读取对象的内容 */
    var value_read;
    /**正则读取到的数组 */
    var exec_value = new Array();
    /**用于返回的参数 */
    var return_value;
    if (arguments.length === 0) {
        return_value = this.document.body;
    } else if (arguments.length === 1) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read);
                }
            }
        }
    } else if (arguments.length === 2) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name, null, few, false);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                    console.trace("getAll函数读取id不需要输入few参数");

                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read, few);
                }
            }
        }
    } else if (arguments.length === 3) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name, dom_father, few);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                    console.trace("getAll函数读取id不需要输入few参数");

                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read, few, dom_father);
                }
            }
        }
    } else if (arguments.length === 4) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            if (useFew) {
                return_value = lt_code.getTage(name, dom_father, few);
            } else {
                return_value = lt_code.getTage(name, dom_father);
            }
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                    console.trace("getAll函数读取id不需要输入few参数");

                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read, few, dom_father);
                }
            }
        }
    } else {
        return_value = this.document.head;
    }

    if (return_value === null) {
        console.trace("getAll函数name参数输入错误!");

    } else if (return_value === undefined) {
        console.trace("本页面中没有找到此对象");

    } else if (return_value.length === 0) {
        console.trace("没有此对象|此页面中没有使用此对象");

    } else if (return_value.length === 1) {
        return_value = return_value[0];
    }

    return return_value;
};

/**
 * 读取对象的函数(稍微有些差别)(重载+4)(id:#)(class:.)
 * @param {string} name 输入的名称(可以是任何方式) 
 * @param {HTMLElement} dom_father 父类名称
 * @param {number} few 第几个
 * @param {boolean} useFather 是否使用dom_father参数
 * @return {HTMLElement|HTMLCollection|void} 输出对象
 */
lt_code.iframe.getAll2 = function (name, dom_father, few, useFather) {
    /**读取对象的内容 */
    var value_read;
    /**正则读取到的数组 */
    var exec_value = new Array();
    /**用于返回的参数 */
    var return_value;
    if (arguments.length === 0) {
        return_value = this.document.body;
    } else if (arguments.length === 1) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read);
                }
            }
        }
    } else if (arguments.length === 2) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name, dom_father);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                    console.trace("js不支持读取父类对象的子类id");

                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read, null, dom_father, false);
                }
            }
        }
    } else if (arguments.length === 3) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name, dom_father, few);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                    console.trace("getAll2函数读取id不需要输入few参数");

                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read, few, dom_father);
                }
            }
        }
    } else if (arguments.length === 4) {
        exec_value = /\#?\.?/.exec(name);
        if (!exec_value || !exec_value[0]) {
            return_value = lt_code.getTage(name, dom_father, few, useFather);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                    console.trace("getAll2函数读取id不需要输入few参数");

                } else if (exec_value[0] === ".") {
                    if (!useFather) {
                        return_value = lt_code.getClass(value_read, few);
                    } else {
                        return_value = lt_code.getClass(value_read, few, dom_father);
                    }
                }
            }
        }
    } else {
        return_value = this.document.head;
    }

    if (return_value === null) {
        console.trace("getAll2函数name参数输入错误!");

    } else if (return_value === undefined) {
        console.trace("本页面中没有找到此对象");

    } else if (return_value.length === 0) {
        console.trace("没有此对象|此页面中没有使用此对象");

    } else if (return_value.length === 1) {
        return_value = return_value[0];
    }

    return return_value;
};

/**
 * 读取对象的函数(增加一些功能)(重载+4)(id:#)(class:.)
 * @param {string} name 输入的名称(可以是任何方式) 
 * @param {number} few 第几个
 * @param {HTMLElement} dom_father 父类名称
 * @param {boolean} useFew 是否使用few参数
 * @return {HTMLElement|HTMLCollection|void|CSSStyleDeclaration} 输出对象
 */
lt_code.iframe.getAll3 = function (name, few, dom_father, useFew) {
    /**读取对象的内容 */
    var value_read;
    /**正则读取到的数组 */
    var exec_value = new Array();
    /**用于返回的参数 */
    var return_value;
    /**读取子类,父类,伪类选择器的正则 */
    var read_child = /\:\:|[\>\<\:]/;

    if (arguments.length === 0) {
        return_value = this.document.body;
    } else {
        if (!read_child.exec(name)) {
            if (arguments.length === 1) {
                exec_value = /\#?\.?/.exec(name);
                if (!exec_value || !exec_value[0]) {
                    return_value = lt_code.getTage(name);
                } else {
                    if (exec_value[0] === "#.") {
                        return_value = null;
                    } else {
                        value_read = name.replace(/\#?\.?/, "");
                        if (exec_value[0] === "#") {
                            return_value = lt_code.getId(value_read);
                        } else if (exec_value[0] === ".") {
                            return_value = lt_code.getClass(value_read);
                        }
                    }
                }
            } else if (arguments.length === 2) {
                exec_value = /\#?\.?/.exec(name);
                if (!exec_value || !exec_value[0]) {
                    return_value = lt_code.getTage(name, null, few, false);
                } else {
                    if (exec_value[0] === "#.") {
                        return_value = null;
                    } else {
                        value_read = name.replace(/\#?\.?/, "");
                        if (exec_value[0] === "#") {
                            return_value = lt_code.getId(value_read);
                            console.trace("getAll函数读取id不需要输入few参数");

                        } else if (exec_value[0] === ".") {
                            return_value = lt_code.getClass(value_read, few);
                        }
                    }
                }
            } else if (arguments.length === 3) {
                exec_value = /\#?\.?/.exec(name);
                if (!exec_value || !exec_value[0]) {
                    return_value = lt_code.getTage(name, dom_father, few);
                } else {
                    if (exec_value[0] === "#.") {
                        return_value = null;
                    } else {
                        value_read = name.replace(/\#?\.?/, "");
                        if (exec_value[0] === "#") {
                            return_value = lt_code.getId(value_read);
                            console.trace("getAll函数读取id不需要输入few参数");

                        } else if (exec_value[0] === ".") {
                            return_value = lt_code.getClass(value_read, few, dom_father);
                        }
                    }
                }
            } else if (arguments.length === 4) {
                exec_value = /\#?\.?/.exec(name);
                if (!exec_value || !exec_value[0]) {
                    if (useFew) {
                        return_value = lt_code.getTage(name, dom_father, few);
                    } else {
                        return_value = lt_code.getTage(name, dom_father);
                    }
                }
                else {
                    if (exec_value[0] === "#.") {
                        return_value = null;
                    } else {
                        value_read = name.replace(/\#?\.?/, "");
                        if (exec_value[0] === "#") {
                            return_value = lt_code.getId(value_read);
                            console.trace("getAll函数读取id不需要输入few参数");

                        } else if (exec_value[0] === ".") {
                            return_value = lt_code.getClass(value_read, few, dom_father);
                        }
                    }
                }
            } else {
                return_value = this.document.head;
            }
        } else {
            /**读取选择器的正则 */
            var read_select = new Array();
            read_select[0] = /([\.\#]?)([\w]+)?(\:\:|[\<\>\:])([\w]+)?([\<\>\:]+[\s\S]+)?/;
            read_select[1] = /([\.\#]?)([\w]+)?(\:\:|[\<\>\:])(.+)/;

            exec_value = read_select[1].exec(name);
            if (arguments.length === 1) {
                //获取父类
                if (exec_value[3] === "<") {
                    //单纯父类
                    if (!exec_value[4]) {
                        return_value = lt_code.getDomFather(
                            lt_code.getAll3(exec_value[1] + exec_value[2], 0)
                        );
                    }
                    //相邻对象
                    else {
                        return_value = lt_code.getAll3(exec_value[4], 0,
                            lt_code.getDomFather(
                                lt_code.getAll3(exec_value[1] + exec_value[2], 0)
                            )
                        );
                    }
                }
                //获取子类
                if (exec_value[3] === ">") {
                    //console.trace(exec_value[4]);
                    return_value = lt_code.getAll3(
                        exec_value[4], null,
                        lt_code.getAll3(exec_value[1] + exec_value[2], 0),
                        false
                    );
                }
                //获取伪类
                if (exec_value[3] === ":" || exec_value[3] === "::") {
                    return_value = this.document.defaultView.getComputedStyle(
                        lt_code.getAll3(exec_value[1] + exec_value[2], 0),
                        exec_value[3] + exec_value[4]
                    );
                }
            }
            if (arguments.length === 2) {
                //获取父类
                if (exec_value[3] === "<") {
                    //单纯父类
                    if (!exec_value[4]) {
                        return_value = lt_code.getDomFather(
                            lt_code.getAll3(exec_value[1] + exec_value[2], few)
                        );
                    }
                    //相邻对象
                    else {
                        return_value = lt_code.getAll3(exec_value[4], few,
                            lt_code.getDomFather(
                                lt_code.getAll3(exec_value[1] + exec_value[2], few)
                            ),
                            false
                        );
                    }
                }
                //获取子类
                if (exec_value[3] === ">") {
                    return_value = lt_code.getAll3(
                        exec_value[4], few,
                        lt_code.getAll3(exec_value[1] + exec_value[2], 0)
                    );
                }
                //获取伪类
                if (exec_value[3] === ":" || exec_value[3] === "::") {
                    return_value = this.document.defaultView.getComputedStyle(
                        lt_code.getAll3(exec_value[1] + exec_value[2], few),
                        exec_value[3] + exec_value[4]
                    );
                }
            }
            if (arguments.length === 3) {
                if (dom_father.item) {
                    dom_father = dom_father[0];
                }
                //获取子类
                if (exec_value[3] === ">") {
                    //console.trace(exec_value);
                    return_value = lt_code.getAll3(exec_value[4], few, dom_father);
                }
                //获取父类
                if (exec_value[3] === "<") {
                    //单纯父类
                    if (!exec_value[4]) {
                        return_value = lt_code.getDomFather(dom_father);
                    }
                    //获取同类
                    else {
                        return_value = lt_code.getAll3(
                            exec_value[4], few,
                            lt_code.getDomFather(dom_father)
                        );
                    }
                }
                //获取伪类
                if (exec_value[3] === ":" || exec_value[3] === "::") {
                    return_value = this.document.defaultView.getComputedStyle(
                        lt_code.getAll3(exec_value[4], few, dom_father)
                    );
                }
            }
            if (arguments.length === 4) {
                //console.trace(dom_father);
                if (dom_father.item) {
                    dom_father = dom_father[0];
                }
                //获取子类
                if (exec_value[3] === ">") {
                    return_value = lt_code.getAll3(exec_value[4], few,
                        lt_code.getAll3(exec_value[0] + exec_value[1], 0, dom_father)
                        , useFew);
                }
                //获取父类
                if (exec_value[3] === "<") {
                    //单纯父类
                    if (!exec_value[4]) {
                        return_value = lt_code.getDomFather(dom_father);
                    }
                    //获取同类
                    else {
                        return_value = lt_code.getAll3(
                            exec_value[4], few,
                            lt_code.getDomFather(dom_father),
                            useFew
                        );
                    }
                }
                //获取伪类
                if (exec_value[3] === ":" || exec_value[3] === "::") {
                    return_value = this.document.defaultView.getComputedStyle(
                        lt_code.getAll3(exec_value[4], few, dom_father)
                    );
                }
            }
            if (arguments.length > 4) {
                console.trace("getAll3选择子类函数暂时不支持其他参数");

            }
        }
    }

    if (return_value === null) {
        console.trace("getAll函数name参数输入错误!");

    } else if (return_value === undefined) {
        console.trace("本页面中没有找到此对象");

    } else if (return_value.length === 0) {
        console.trace("没有此对象|此页面中没有使用此对象");

    } else if (return_value.length === 1) {
        return_value = return_value[0];
    }

    return return_value;
};

/**
 * 分类取用
 * @param {any[]} arg
 * @param {boolean} useLtDom 是否使用lt_dom类
 */
lt_code.iframe.getAllType = function (arg, useLtDom) {
    /**返回值 */
    var ret;
    switch (arg.length) {
        case 1: ret = lt_code.getAll(arg[0]); break;
        case 2: ret = lt_code.getAll(arg[0], arg[1]); break;
        case 3: ret = lt_code.getAll(arg[0], arg[1], arg[2]); break;
        case 4: ret = lt_code.getAll(arg[0], arg[1], arg[2], arg[3]); break;
        case 5: switch (arg[4]) {
            case 1: ret = lt_code.getAll(arg[0], arg[1], arg[2], arg[3]); break;
            case 2: ret = lt_code.getAll2(arg[0], arg[1], arg[2], arg[3]); break;
            case 3: ret = lt_code.getAll3(arg[0], arg[1], arg[2], arg[3]); break;
            default: console.error("最后参数出错!");
        };
        default: console.error("参数数量出错!");
    }

    if (useLtDom) {
        if (ret.length) {
            ret = function () {
                var values = [];
                ret = Array.prototype.slice.call(ret);
                ret.forEach(function (e, i) {
                    values[i] = new lt_code.lt_dom(e);
                });
                return values;
            }();
        } else {
            ret = new lt_code.lt_dom(ret);
        }
    }
    return ret;
}


/**
 * 读取对象(输出动态数组)
 * @param {...any} arg
 * @returns {any[HTMLElement]|HTMLElement|void};
 */
lt_code.iframe.getAllToArray = function (...arg) {
    var ret;
    switch (arg.length) {
        case 1: ret = lt_code.getAll(arg[0]); break;
        case 2: ret = lt_code.getAll(arg[0], arg[1]); break;
        case 3: ret = lt_code.getAll(arg[0], arg[1], arg[2]); break;
        case 4: ret = lt_code.getAll(arg[0], arg[1], arg[2], arg[3]); break;
        case 5: switch (arg[4]) {
            case 1: ret = lt_code.getAll(arg[0], arg[1], arg[2], arg[3]); break;
            case 2: ret = lt_code.getAll2(arg[0], arg[1], arg[2], arg[3]); break;
            case 3: ret = lt_code.getAll3(arg[0], arg[1], arg[2], arg[3]); break;
            default: console.error("最后参数出错!");
        };
        default: console.error("参数数量出错!");
    }
    if (ret.length) {
        ret = Array.prototype.slice.call(ret);
    }
    return ret;
}

/**
 * 读取iframe内包含的window值(用于传值)
 * @param {string} idName iframe框的id
 * @return {Window} 返回一个window(大概)
 */
lt_code.iframe.getIframeWindow = function (idName) {
    return lt_code.getId(idName).contentWindow;
};

/**
 * 获取iframe内部的对象
 * @param {HTMLElement} dom iframe对象
 * @param {string} name 要读取内部部件的名称
 * @return {HTMLElement|void} 返回对象
 */
lt_code.iframe.getIframe = function (dom, name) {
    var inner_value = dom.contentDocument.getElementsByTagName("body")[0];
    if (!inner_value) {
        console.trace("读取对象非iframe内联边框|没能读取到对象");

        return;
    }
    return lt_code.getAll2(name, inner_value);
};


/**图像操作模块 */
lt_code.image = {};

/**用于计算进制转换用的十进制数组 */
lt_code.image.num10 = [];

/**用于计算进制转换用的十六进制数组 */
lt_code.image.num16 = [];

/**图像操作模块初始化 */
lt_code.image.init = function () {
    this.num10 = [];
    this.num16 = [];
    for (var i = 0; i < 256; i++) {
        this.num10.push(i);
        this.num16.push(lt_code.from10To16(i));
    }
};

/**
 * 用于处理两位数以内的16进制转10进制的函数
 * (不推荐使用,处理速度没有lt_code.from16To10函数快)
 * @param {string} num
 * @return {number}
 */
lt_code.image.from16To10 = function (num) {
    return this.num10[this.num16.indexOf(num)];
};

/**
 * 用于处理256以下的10进制转16进制的函数
 * (建议使用,处理速度比lt_code.from10To16函数快)
 * @param {number} num
 * @return {String}
 */
lt_code.image.from10To16 = function (num) {
    return this.num16[this.num10.indexOf(num)];
};

/**
 * rgb色彩转hsv色彩
 * @param {string} color rgb颜色
 */
lt_code.image.fromRGBToHSV = function (color) {
    color = color.length > 7 ? color : lt_code.color_change(color);
    var RGB = /(\d+),(\d+),(\d+)/.exec(color);
    var R = RGB[1], G = RGB[2], B = RGB[3];
    var Max = Math.max(R, G, B), Min = Math.min(R, G, B);
    var V = Max, S = (Max - Min) / Max;
    S = !S ? 0 : S;
    var H = R == Max ? (G - B) / (Max - Min) * 60 :
        G == Max ? 120 + (B - R) / (Max - Min) * 60 :
            B == Max ? 240 + (R - G) / (Max - Min) * 60 :
                console.error("color数据错误!");
    H = H < 0 ? H + 360 : !H ? 0 : H;
    H = lt_code.getNum(H * 1000) / 1000, S = lt_code.getNum(S * 1000) / 1000;
    return "hsv(" + H.toString() + "," + S.toString() + "," + V.toString() + ")";
};

/**
 * hsv色彩转rgb色彩
 * @param {string} color hsv颜色
 */
lt_code.image.fromHSVToRGB = function (color) {
    var HSV = /hsv/.test(color) ? /([\d\.]+),([\d\.]+),(\d+)/.exec(color) : console.error("输入颜色错误!");
    var h = HSV[1], s = HSV[2], v = HSV[3], r, g, b;
    if (s == 0) {
        r = v, g = v, b = v;
    } else {
        h /= 60;
        var i = lt_code.getNum(h), f = h - i;
        var a = v * (1 - s), b = v * (1 - s * f), c = v * (1 - s * (1 - f));
        switch (i) {
            case 0: r = v; g = c; b = a; break;
            case 1: r = b; g = v; b = a; break;
            case 2: r = a; g = v; b = c; break;
            case 3: r = a; g = b; b = v; break;
            case 4: r = c; g = a; b = v; break;
            case 5: r = v; g = a; b = b; break;
            default:
                console.error("数据错误!");
        }
        r = lt_code.getNum(r), g = lt_code.getNum(g), b = lt_code.getNum(b);
    }
    return "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
};



/**base64加密模块 */
lt_code.base64 = {

    // private property  
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    /**
     * 加密
     * @param {string} input
     */
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    /**
     * 解密
     * @param {string} input
     */
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._utf8_decode(output);
        return output;
    },

    // private method for UTF-8 encoding  
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    },

    // private method for UTF-8 decoding  
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    },

    /** 原生js自带的base64（也不支持中文） */
    base64: {
        /**
         * 解码
         * @param {string} input
         */
        decode: function (input) {
            return window.atob(input);
        },

        /**
         * 编码
         * @param {string} input
         */
        encode: function (input) {
            return window.btoa(input);
        }
    },

    /** 我自己写的加密玩意(虽然支持中文但是最好不要) */
    else: {
        /** 匙A */
        _keyA: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

        /** 匙a */
        _keya: "abcdefghijklmnopqrstuvwxyz",

        /** 匙B */
        _keyB: "0123456789ABCDEF",

        /**
         * 加密?
         * @param {number} time
         * @param {string} input
         */
        setCode: function (time, input) {
            time = time.toString();
            var count = time.length;
            var ret = "";
            for (var i = 0; i < input.length; i++) {
                ret += this.setCodeOne(
                    lt_code.getNum(time[(count - 1) - (i % count)]),
                    input[i]
                );
            }
            return ret;
        },

        /**
         * 加密一位
         * @param {number} numOne
         * @param {String} inputOne
         */
        setCodeOne: function (numOne, inputOne) {
            numOne = !numOne ? 1 : numOne;
            inputOne = inputOne.charCodeAt(0);
            var ret = numOne * inputOne;
            var first = lt_code.getNum(ret / 26);
            var last = lt_code.getNum(ret % 26);
            first = this.numToTextA(first);
            last = this.numToTexta(last);
            return first + last;
        },

        /**
         * 数字转字符
         * @param {number} num
         */
        numToTextA: function (num) {
            var ret = "";
            while (num > 25) {
                ret += this._keyA[25];
                num -= 25;
            }
            ret += this._keyA[num];
            return ret;
        },

        /**
         * 数字转字符
         * @param {number} num
         */
        numToTexta: function (num) {
            var ret = "";
            while (num > 25) {
                ret += this._keya[25];
                num -= 25;
            }
            ret += this._keya[num];
            return ret;
        },

        /**
         * 解密
         * @param {number} time
         * @param {string} value
         */
        getCode: function (time, value) {
            time = time.toString();
            var count = time.length;
            var ret = [...value.matchAll(/[A-Z]+[a-z]+/g)];
            var values = [];
            ret.forEach(function (e) {
                values.push(e[0]);
            });
            //console.log(ret);
            ret = "";
            values.forEach(function (e, i) {
                ret += String.fromCharCode(
                    lt_code.base64.else.getCodeOne(
                        lt_code.getNum(time[count - 1 - i % count]),
                        e
                    ));
            });
            return ret;
        },

        /**
         * 解密一位
         * @param {number} numOne
         * @param {string} valueOne
         */
        getCodeOne: function (numOne, valueOne) {
            numOne = !numOne ? 1 : numOne;
            var first = /[A-Z]+/.exec(valueOne)[0];
            var last = /[a-z]+/.exec(valueOne)[0];
            first = lt_code.getNum(this.textToNumA(first));
            last = lt_code.getNum(this.textToNuma(last));
            var ret = (first * this._keyA.length + last) / numOne;
            return lt_code.getNum(ret);
        },

        /**
         * 字符转数字
         * @param {string} str
         */
        textToNumA: function (str) {
            var ret = 0;
            for (var i = 0; i < str.length; i++) {
                ret += this._keyA.indexOf(str[i]);
            }
            if (this !== lt_code.base64.else) {
                ret = ret / this;
            }
            return ret;
        },

        /**
         * 字符转数字
         * @param {string} str
         */
        textToNuma: function (str) {
            var ret = 0;
            for (var i = 0; i < str.length; i++) {
                ret += this._keya.indexOf(str[i]);
            }
            if (this !== lt_code.base64.else) {
                ret = ret / this;
            }
            return ret;
        },
    },

    /** 
     * 还是我自己写的玩意,改了几个函数
     * 不过这个加密中文占用的文字量少
     */
    chinese: {
        /** 匙A */
        _keyA: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

        /** 匙a */
        _keya: "abcdefghijklmnopqrstuvwxyz",

        /** 匙B */
        _keyB: "0123456789ABCDEF",

        /**
         * 加密?
         * @param {number} time
         * @param {string} input
         */
        setCode: function (time, input) {
            time = time.toString();
            var count = time.length;
            var ret = "";
            for (var i = 0; i < input.length; i++) {
                ret += this.setCodeOne(
                    lt_code.getNum(time[(count - 1) - (i % count)]),
                    input[i]
                );
            }
            return ret;
        },

        /**
         * 加密一位
         * @param {number} numOne
         * @param {String} inputOne
         */
        setCodeOne: function (numOne, inputOne) {
            numOne = !numOne ? 1 : numOne;
            inputOne = inputOne.charCodeAt(0);
            var ret = numOne * inputOne;
            var first = lt_code.getNum(ret / 26);
            var last = lt_code.getNum(ret % 26);
            first = this.numToTextA(first);
            last = this.numToTexta(last);
            return first + last;
        },

        /**
         * 数字转字符
         * @param {number} num
         */
        numToTextA: function (num) {
            var ret = "";
            var theNum = 0;
            if (num > 25) {
                ret += this._keyA[25];
                num -= 25;
            }
            while (num > 25) {
                theNum++;
                num -= 25;
            }
            if (theNum > 0) {
                ret += theNum.toString();
            }
            ret += this._keyA[num];
            return ret;
        },

        /**
         * 数字转字符
         * @param {number} num
         */
        numToTexta: function (num) {
            var ret = "";
            while (num > 25) {
                ret += this._keya[25];
                num -= 25;
            }
            ret += this._keya[num];
            return ret;
        },

        /**
         * 解密
         * @param {number} time
         * @param {string} value
         */
        getCode: function (time, value) {
            time = time.toString();
            var count = time.length;
            var ret = [...value.matchAll(/[A-Z\d]+[a-z]+/g)];
            var values = [];
            ret.forEach(function (e) {
                values.push(e[0]);
            });
            ret = "";
            values.forEach(function (e, i) {
                ret += String.fromCharCode(
                    lt_code.base64.chinese.getCodeOne(
                        lt_code.getNum(time[count - 1 - i % count]),
                        e
                    ));
            });
            return ret;
        },

        /**
         * 解密一位
         * @param {number} numOne
         * @param {string} valueOne
         */
        getCodeOne: function (numOne, valueOne) {
            numOne = !numOne ? 1 : numOne;
            var first = /[A-Z\d]+/.exec(valueOne)[0];
            var last = /[a-z]+/.exec(valueOne)[0];
            first = lt_code.getNum(this.textToNumA(first));
            last = lt_code.getNum(this.textToNuma(last));
            var ret = (first * this._keyA.length + last) / numOne;
            return lt_code.getNum(ret);
        },

        /**
         * 字符转数字
         * @param {string} str
         */
        textToNumA: function (str) {
            var ret = 0;
            var strs = /([A-Z]?)([\d]*)([A-Z])/.exec(str);
            if (strs[1]) {
                ret += this._keyA.indexOf(strs[1]);
                if (strs[2]) {
                    ret = 25 * (lt_code.getNum(strs[2]) + 1);
                }
            }
            ret += this._keyA.indexOf(strs[3]);
            return ret;
        },

        /**
         * 字符转数字
         * @param {string} str
         */
        textToNuma: function (str) {
            var ret = 0;
            for (var i = 0; i < str.length; i++) {
                ret += this._keya.indexOf(str[i]);
            }
            return ret;
        },
    },

    /** 变种base64 */
    base64change: {

        //key  
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        /**产生一个随机的key */
        getKey: function () {
            var ret = "";
            var all = Array.prototype.slice.call(this._keyStr.slice(0, 62));
            while (all.length > 0) {
                var oneKey = all[lt_code.variable.random(all.length, null, true)];
                ret += oneKey;
                all = all.delete(oneKey);
            }
            ret += "+/=";
            return ret;
        },

        /**
         * 加密
         * @param {string} input
         * @param {string} [key]
         */
        encode: function (input, key) {
            key = key ? key : this._keyStr;
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = this._utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    key.charAt(enc1) + key.charAt(enc2) +
                    key.charAt(enc3) + key.charAt(enc4);
            }
            return output;
        },

        /**
         * 解密
         * @param {string} input
         * @param {string} [key]
         */
        decode: function (input, key) {
            key = key ? key : this._keyStr;
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = key.indexOf(input.charAt(i++));
                enc2 = key.indexOf(input.charAt(i++));
                enc3 = key.indexOf(input.charAt(i++));
                enc4 = key.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = this._utf8_decode(output);
            return output;
        },

        // private method for UTF-8 encoding  
        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }
            return utftext;
        },

        // private method for UTF-8 decoding  
        _utf8_decode: function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        },

    },

    /** 转码 */
    change: {

        //key  
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        /**产生一个随机的key */
        getKey: function () {
            var ret = "";
            var all = Array.prototype.slice.call(this._keyStr.slice(0, 62));
            while (all.length > 0) {
                var oneKey = all[lt_code.variable.random(all.length, null, true)];
                ret += oneKey;
                all = all.delete(oneKey);
            }
            ret += "+/=";
            return ret;
        },

        /**
         * 全码解码
         * @param {string} input
         * @param {string} key
         */
        decode: function (input, key) {
            input = input.split(",");
            var ret = input[0] + ",";
            for (var i = 0; i < input[1].length; i++) {
                ret += this._keyStr[key.indexOf(input[1][i])];
            }
            return ret;
        },

        /**
         * 全码转码
         * @param {string} input
         * @param {string} key
         */
        encode: function (input, key) {
            input = input.split(",");
            var ret = input[0] + ",";
            for (var i = 0; i < input[1].length; i++) {
                ret += key[this._keyStr.indexOf(input[1][i])];
            }
            return ret;
        },

        /**
         * 部分转码
         * @param {String} input
         */
        setCode: function (input, key) {
            let ret = "";
            for (var i = 0; i < input.length; i++) {
                ret += key[this._keyStr.indexOf(input[i])];
            }
            return ret;
        },

        /**
         * 部分解码
         * @param {String} input
         */
        getCode: function (input, key) {
            let ret = "";
            for (var i = 0; i < input.length; i++) {
                ret += this._keyStr[key.indexOf(input[i])];
            }
            return ret;
        },
    },

    /** 
     * 转码为图片
     * 如果没有意外千万别用这个算法...
     */
    imageRGBA: {

        /** 加密 */
        encode : function (input) {
            var ret = [];
            var i = 0;
            var newImage = new Uint8ClampedArray();
            input = lt_code.base64._utf8_encode(input);
            for (var i = 0; i < input.length; i++) {
                ret.push(input.charCodeAt(i));
            }
            var count = Math.ceil(ret.length / 4);
            for (var i = ret.length; i < count*4; i++) {
                ret[i] = 255;
            }
            count = Math.ceil(Math.sqrt(ret.length / 4));
            console.log(count);
            for (var i = ret.length; i < count*count*4; i++) {
                ret[i] = 255;
            }
            newImage = new Uint8ClampedArray(ret);
            newImage = new ImageData(newImage, count, count);
            console.log(newImage);
            var newCas = lt_code.newDom("canvas",{
                width: count,
                height: count
            });
            lt_code.addChild(newCas);
            var newCtx = lt_code.getCtx(newCas);
            newCtx.putImageData(newImage, 0, 0);
            newImage = newCas.toDataURL();
            lt_code.removeChild(newCas);
            return newImage;
        },

        /**
         * 解密
         * @param {any} input
         */
        decode: function (input) {
            var newImage = lt_code.newDom("img", {
                src: input,
            });
            var count = newImage.width != newImage.height ? console.error("输入的图片数据错误!") : newImage.width;
            var newCas = lt_code.newDom("canvas", {
                width: count,
                height: count,
            });
            lt_code.addChild(newCas);
            var newCtx = lt_code.getCtx(newCas);
            newCtx.drawImage(newImage, 0, 0);
            var imageData = newCtx.getImageData(0, 0, count, count);
            console.log(imageData);
            imageData = imageData.data;
            var ret = "";
            for (var i = 0; i < imageData.length; i++) {
                if (imageData[i] == 255) {
                    break;
                }
                ret += String.fromCharCode(imageData[i]);
            }
            ret = lt_code.base64._utf8_decode(ret);
            return ret;
        }
    },

    /**
     * 转码为图片
     * (这个算法如果图片不压缩是可以使用的)
     */
    imageRGB: {

        /**
         * 加密
         * @param {any} input
         */
        encode: function (input) {
            var ret = [];
            var j = 0;
            var newImage = [];
            input = lt_code.base64._utf8_encode(input);
            for (var i = 0; i < input.length; i++) {
                ret.push(input.charCodeAt(i));
            }
            var count = Math.ceil(ret.length / 3);
            for (var i = 0; i < count * 4; i++) {
                if (i % 4 == 3) {
                    newImage.push(255);
                } else {
                    newImage.push(ret[j++] ? ret[j - 1] : 255);
                }
            }
            ret = newImage;
            count = Math.ceil(Math.sqrt(ret.length / 4));
            for (var i = ret.length; i < count * count * 4; i++) {
                ret[i] = 255;
            }
            newImage = new Uint8ClampedArray(ret);
            newImage = new ImageData(newImage, count, count);
            var newCas = lt_code.newDom("canvas", {
                width: count,
                height: count
            });
            lt_code.addChild(newCas);
            var newCtx = lt_code.getCtx(newCas);
            newCtx.putImageData(newImage, 0, 0);
            newImage = newCas.toDataURL();
            lt_code.removeChild(newCas);
            return newImage;
        },

        /**
         * 解码
         * @param {any} input
         */
        decode: function (input) {
            var newImage = new Image();
            newImage.src = input;
            var count = newImage.width != newImage.height ? console.error("输入的图片数据错误!") : newImage.width;
            newImage.width = count;
            newImage.height = count;
            var newCas = lt_code.newDom("canvas", {
                width: count,
                height: count,
            });
            lt_code.addChild(newCas);
            var newCtx = lt_code.getCtx(newCas);
            newCtx.drawImage(newImage, 0, 0);
            lt_code.addChild(newCas);
            var imageData = newCtx.getImageData(0, 0, count, count);
            lt_code.removeChild(newCas);
            imageData = imageData.data;
            var ret = [];
            for (var i = 0; i < imageData.length; i++) {
                if (i % 4 == 3) {
                    continue;
                }
                ret.push(imageData[i]);
            }
            imageData = ret;
            ret = [];
            for (var i = 0; i < imageData.length; i++) {
                if (imageData[i] == 255) {
                    break;
                }
                ret += String.fromCharCode(imageData[i]);
            }
            ret = lt_code.base64._utf8_decode(ret);
            return ret;
        }
    },
};

/**sha256加密模块 */
lt_code.SHA256 = {

    rotateRight: function (n, x) {
        return ((x >>> n) | (x << (32 - n)));
    },

    choice: function (x, y, z) {
        return ((x & y) ^ (~x & z));
    },

    majority: function (x, y, z) {
        return ((x & y) ^ (x & z) ^ (y & z));
    },
    sha256_Sigma0: function (x) {
        return (this.rotateRight(2, x) ^ this.rotateRight(13, x) ^ this.rotateRight(22, x));
    },
    sha256_Sigma1: function (x) {
        return (this.rotateRight(6, x) ^ this.rotateRight(11, x) ^ this.rotateRight(25, x));
    },
    sha256_sigma0: function (x) {
        return (this.rotateRight(7, x) ^ this.rotateRight(18, x) ^ (x >>> 3));
    },
    sha256_sigma1: function (x) {
        return (this.rotateRight(17, x) ^ this.rotateRight(19, x) ^ (x >>> 10));
    },
    sha256_expand: function (W, j) {
        return (W[j & 0x0f] += this.sha256_sigma1(W[(j + 14) & 0x0f]) + W[(j + 9) & 0x0f] +
            this.sha256_sigma0(W[(j + 1) & 0x0f]));
    },

    /* Hash constant words K: */
    K256: new Array(
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
        0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
        0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
        0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
        0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
        0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
        0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
        0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
        0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ),

    /* global arrays */
    ihash: [],
    count: [],
    buffer: [],
    sha256_hex_digits: "0123456789ABCDEF",

    /* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters: 
    overflow) */
    safe_add: function (x, y) {
        var lsw = (x & 0xffff) + (y & 0xffff);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
    },

    /* Initialise the SHA256 computation */
    sha256_init: function () {
        this.ihash = new Array(8);
        this.count = new Array(2);
        this.buffer = new Array(64);
        this.count[0] = this.count[1] = 0;
        this.ihash[0] = 0x6a09e667;
        this.ihash[1] = 0xbb67ae85;
        this.ihash[2] = 0x3c6ef372;
        this.ihash[3] = 0xa54ff53a;
        this.ihash[4] = 0x510e527f;
        this.ihash[5] = 0x9b05688c;
        this.ihash[6] = 0x1f83d9ab;
        this.ihash[7] = 0x5be0cd19;
    },

    /* Transform a 512-bit message block */
    sha256_transform: function () {
        var a, b, c, d, e, f, g, h, T1, T2;
        var W = new Array(16);

        /* Initialize registers with the previous intermediate value */
        a = this.ihash[0];
        b = this.ihash[1];
        c = this.ihash[2];
        d = this.ihash[3];
        e = this.ihash[4];
        f = this.ihash[5];
        g = this.ihash[6];
        h = this.ihash[7];

        /* make 32-bit words */
        for (var i = 0; i < 16; i++)
            W[i] = ((this.buffer[(i << 2) + 3]) | (this.buffer[(i << 2) + 2] << 8) | (this.buffer[(i << 2) + 1]
                << 16) | (this.buffer[i << 2] << 24));

        for (var j = 0; j < 64; j++) {
            T1 = h + this.sha256_Sigma1(e) + this.choice(e, f, g) + this.K256[j];
            if (j < 16) T1 += W[j];
            else T1 += this.sha256_expand(W, j);
            T2 = this.sha256_Sigma0(a) + this.majority(a, b, c);
            h = g;
            g = f;
            f = e;
            e = this.safe_add(d, T1);
            d = c;
            c = b;
            b = a;
            a = this.safe_add(T1, T2);
        }

        /* Compute the current intermediate hash value */
        this.ihash[0] += a;
        this.ihash[1] += b;
        this.ihash[2] += c;
        this.ihash[3] += d;
        this.ihash[4] += e;
        this.ihash[5] += f;
        this.ihash[6] += g;
        this.ihash[7] += h;
    },

    /* Read the next chunk of data and update the SHA256 computation */
    sha256_update: function (data, inputLen) {
        var i, index, curpos = 0;
        /* Compute number of bytes mod 64 */
        index = ((this.count[0] >> 3) & 0x3f);
        var remainder = (inputLen & 0x3f);

        /* Update number of bits */
        if ((this.count[0] += (inputLen << 3)) < (inputLen << 3)) count[1]++;
        this.count[1] += (inputLen >> 29);

        /* Transform as many times as possible */
        for (i = 0; i + 63 < inputLen; i += 64) {
            for (var j = index; j < 64; j++)
                buffer[j] = data.charCodeAt(curpos++);
            this.sha256_transform();
            index = 0;
        }

        /* Buffer remaining input */
        for (var j = 0; j < remainder; j++)
            this.buffer[j] = data.charCodeAt(curpos++);
    },

    /* Finish the computation by operations such as padding */
    sha256_final: function () {
        var index = ((this.count[0] >> 3) & 0x3f);
        this.buffer[index++] = 0x80;
        if (index <= 56) {
            for (var i = index; i < 56; i++)
                this.buffer[i] = 0;
        } else {
            for (var i = index; i < 64; i++)
                this.buffer[i] = 0;
            this.sha256_transform();
            for (var i = 0; i < 56; i++)
                this.buffer[i] = 0;
        }
        this.buffer[56] = (this.count[1] >>> 24) & 0xff;
        this.buffer[57] = (this.count[1] >>> 16) & 0xff;
        this.buffer[58] = (this.count[1] >>> 8) & 0xff;
        this.buffer[59] = this.count[1] & 0xff;
        this.buffer[60] = (this.count[0] >>> 24) & 0xff;
        this.buffer[61] = (this.count[0] >>> 16) & 0xff;
        this.buffer[62] = (this.count[0] >>> 8) & 0xff;
        this.buffer[63] = this.count[0] & 0xff;
        this.sha256_transform();
    },

    /* Split the internal hash values into an array of bytes */
    sha256_encode_bytes: function () {
        var j = 0;
        var output = new Array(32);
        for (var i = 0; i < 8; i++) {
            output[j++] = ((this.ihash[i] >>> 24) & 0xff);
            output[j++] = ((this.ihash[i] >>> 16) & 0xff);
            output[j++] = ((this.ihash[i] >>> 8) & 0xff);
            output[j++] = (this.ihash[i] & 0xff);
        }
        return output;
    },

    /* Get the internal hash as a hex string */
    sha256_encode_hex: function () {
        var output = new String();
        for (var i = 0; i < 8; i++) {
            for (var j = 28; j >= 0; j -= 4)
                output += this.sha256_hex_digits.charAt((this.ihash[i] >>> j) & 0x0f);
        }
        return output;
    },

    /* Main function: returns a hex string representing the SHA256 value of the 
    given data */
    sha256_digest: function (data) {
        this.sha256_init();
        this.sha256_update(data, data.length);
        this.sha256_final();
        return this.sha256_encode_hex();
    },

    /**
     * 加密成sha256
     * @param {object} data
     */
    decode: function (data) {
        data = data.toString();
        return this.sha256_digest(data);
    },

    /* test if the JS-interpreter is working properly */
    sha256_self_test: function () {
        return this.sha256_digest("message digest") ==
            "f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650";
    },
};

/**7bit压缩算法(传输差,可读性差) */
lt_code.bit7 = {

    /**
     * 压缩
     * @param {string} input
     */
    encode: function (input) {
        /**指针 */
        var index = 0;
        /**返回值 */
        var ret = "";
        while (index + 8 < input.length) {
            /**压缩单元 */
            var codeOne = input.slice(index, index + 8);
            ret += this._encodeOne(codeOne);
            index += 8;
        }
        ret += this._encodeOne(input.slice(index));
        return ret;
    },

    /**
     * 压缩一个单元
     * @param {string} inputOne
     */
    _encodeOne: function (inputOne) {
        /**返回值 */
        var ret = "";
        /**输出值 */
        var out = "";
        for (var i = 0; i < 8; i++) {
            /**一位编码 */
            var code = lt_code.from10To2(inputOne.charCodeAt(i)).toString();
            code = this._complement(code);
            out += code;
        }
        for (var i = 0; i < 7; i++) {
            /**一位编码 */
            var code = out.slice(i * 8, (i + 1) * 8);
            ret += String.fromCharCode(lt_code.from2To10(lt_code.getNum(code)));
        }
        return ret;
    },

    /**
     * 补位
     * @param {String} input 输入
     */
    _complement: function (input) {
        /**差值 */
        var c = 6 - input.length;
        /**返回值 */
        var ret = "";
        for (var i = 0; i < c; i++) {
            ret += "0";
        }
        ret += input;
        return ret;
    },

    /**
     * 解压(没写)
     * @param {any} input
     */
    decode: function (input) {

    }
}

/**
 * 获取变量值为value值的变量变量名
 * @param {object} value 变量值
 * @return {string} 变量名
 */
lt_code.test.getNameOfValue = function (value) {
    for (var k in window) {
        if (window[k] === value) {
            return k.toString();
        }
    }
};

/**
 * 把动态数组转字符串
 * @param {Array} list
 */
lt_code.test.listToStr = function (list) {
    ret = "";
    for (var i = 0; i < list.length; i++) {
        ret += i + ":" + lt_code.base64.encode(list[i].toString()) + ";";
    }
    return ret;
};

/**
 * 把字符串转为动态数组
 * @param str
 */
lt_code.test.strToList = function (str) {
    ret = [];
    all = [...str.matchAll(/([^:;]*):([^:;]*);/g)];
    for (var i = 0; i < all.length; i++) {
        ret[i] = lt_code.base64.decode(all[i][2]);
    }
    return ret;
}



/**用来存放图片的参数空间 */
lt_code.variable.images = {};



/**
 * MD5 加密
 * @param {String} string
 */
lt_code.md5 = function (string) {
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function md5_AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    function md5_F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    function md5_G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    function md5_H(x, y, z) {
        return (x ^ y ^ z);
    }
    function md5_I(x, y, z) {
        return (y ^ (x | (~z)));
    }
    function md5_FF(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_GG(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_HH(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_II(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };
    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    function md5_WordToHex(lValue) {
        var WordToHexValue = "",
            WordToHexValue_temp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };
    function md5_Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
    var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
    var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
    var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = md5_AddUnsigned(a, AA);
        b = md5_AddUnsigned(b, BB);
        c = md5_AddUnsigned(c, CC);
        d = md5_AddUnsigned(d, DD);
    }
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
}


/**
 * 重写用于控制台读取内容用的函数
 * 例如:
 * lt_code.innerConsole = function (str) {
 *     eval("console.trace(" + str + ")");
 * };
 */
lt_code.innerConsole = null;

/**
 * 三维云标签(尚未完成) 
 */
lt_code.test.threeDimensionalCloud = function () {
    //主要变量
    /**所有标签 */
    var tagEle;

    /**标签盒 */
    var paper = lt_code.getAll(".tagBall");

    /**集散程度 */
    var RADIUS = 300;

    /**景深 */
    var fallLength = 500;

    /**标签对象数组 */
    var tags = [];

    var angleX = Math.PI / 500;

    var angleY = Math.PI / 500;

    /**标签盒一半的宽度 */
    var CX = paper.offsetWidth / 2;

    /**标签盒一半的高度 */
    var CY = paper.offsetHeight / 2;

    var EX = paper.offsetLeft + lt_code.getAll().scrollLeft + document.documentElement.scrollLeft;

    var EY = paper.offsetTop + lt_code.getAll().scrollTop + document.documentElement.scrollTop;

    /**运动挂载 */
    var run = null;

    /**初始化 */
    innit = function () {
        tagEle = lt_code.getAll(".tag");
        tags = [];
        for (var i = 0; i < tagEle.length; i++) {
            var a, b;
            var k = (2 * (i + 1) - 1) / tagEle.length - 1;
            var a = Math.acos(k);
            var b = a * Math.sqrt(tagEle.length * Math.PI);
            var x = RADIUS * Math.sin(a) * Math.cos(b);
            var y = RADIUS * Math.sin(a) * Math.sin(b);
            var z = RADIUS * Math.cos(a);
            var t = new tag(tagEle[i], x, y, z);
            tagEle[i].style.color = lt_code.variable.roundColor(155);
            tags.push(t);
            t.move();
        }
    };

    lt_code.innerConsole = function (str) {
        eval("console.trace(" + str + ")");
    };

    /**
     * 每一个
     * @param {Array} callback
     */
    Array.prototype.forEach = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback.call(this[i]);
        }
    };

    /**旋转x轴 */
    var rotateX = () => {
        var cos = Math.cos(angleX);
        var sin = Math.sin(angleX);
        tags.forEach(function () {
            var y1 = this.y * cos - this.z * sin;
            var z1 = this.z * cos + this.y * sin;
            this.y = y1;
            this.z = z1;
        });
    };

    /**旋转y轴 */
    var rotateY = () => {
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);
        tags.forEach(function () {
            var x1 = this.x * cos - this.z * sin;
            var z1 = this.z * cos + this.x * sin;
            this.x = x1;
            this.z = z1;
        });
    };

    /**
     * 标签
     */
    class tag {
        /**
         * 构造函数
         * @param {HTMLElement} ele 标签对象
         * @param {number} x 标签x值
         * @param {number} y 标签y值
         * @param {number} z 标签z值
         */
        constructor(ele, x, y, z) {
            /**标签对象 */
            this.ele = ele;
            this.x = x;
            this.y = y;
            this.z = z;
        };

        /**移动函数 */
        move() {
            var scale = fallLength / (fallLength - this.z);
            var alpha = (this.z + RADIUS) / (2 * RADIUS);
            this.ele.style.fontSize = 15 * scale + "px";
            this.ele.style.opacity = alpha + 0.5;
            this.ele.style.filter = "alpha(opacity = " + (alpha + 0.5) * 100 + ")";
            this.ele.style.zIndex = parseInt(scale * 100);
            this.ele.style.left = this.x + CX - this.ele.offsetWidth / 2 + "px";
            this.ele.style.top = this.y + CY - this.ele.offsetHeight / 2 + "px";
        };
    };

    if ("addEventListener" in window) {
        paper.addEventListener("mousemove", function (event) {
            event = event || window.event;
            var x = event.clientX - EX - CX;
            //由于是在fullpage的第二页,所以需要加上一个屏幕的高度
            var y = event.clientY - EY - CY + window.innerHeight;
            angleY = x * 0.0001;
            angleX = y * 0.0001;
        });
    } else {
        paper.attachEvent("onmousemove", function (event) {
            event = event || window.event;
            var x = event.clientX - EX - CX;
            var y = event.clientY - EY - CY + window.innerHeight;
            angleY = x * 0.0001;
            angleX = y * 0.0001;
        });
    }

    //开始运行
    //innit();
    //run = setInterval(() => {
    //    rotateX();
    //    rotateY();
    //    tags.forEach(function () {
    //        this.move();
    //    });
    //}, 17);

    //减缓浏览器压力负载
    lt_code.getAll().addEventListener("mousewheel", function () {
        downPower();
    });
    lt_code.getAll().addEventListener("mousedown", function () {
        downPower();
    });
    paper.addEventListener("mouseenter", function () {
        downPower();
    });

    downPower = function () {
        setTimeout(() => {
            if (lt_code.test.fullpage.now_page === 1) {
                clearInterval(run);
                run = setInterval(() => {
                    rotateX();
                    rotateY();
                    tags.forEach(function () {
                        this.move();
                    });
                }, 17);
            } else {
                clearInterval(run);
            }
        }, 100);
    };

    //downPower();
}


/**我本人最喜欢的头像(base64) */
lt_code.variable.images.headPortrait = new Array();

/**网页要用到的图标 */
lt_code.variable.images.icons = {};

/**
 * 设置网页的图标
 * @param {any} [num]
 */
lt_code.variable.setIcon = function (num) {
    num = !num ? 0 : num >= lt_code.variable.images.icons.length ? lt_code.variable.images.icons.length - 1 : num < 0 ? 0 : num;
    var link = lt_code.newDom("link", {
        type: 'image/x-icon',
        rel: 'shortcut icon',
        href: lt_code.variable.images.icons[num],
    });
    lt_code.addChild(link, lt_code.getAll("head"));
};

/**
 * 获取文件当前路径
 * @return {string}
 */
lt_code.variable.currentSrc = function () {
    return document.currentScript.src;
}();

/**当前文件所在文件夹 */
lt_code.variable.currentDir = lt_code.variable.currentSrc.slice(0, this.length - 10);

/**
 * 补位
 * @param {number} input 输入
 * @param {number} input 补位长度
 */
lt_code.variable.complement = function (input, num) {
    var temp = lt_code.variable.toBackArray(input.toString());
    for (var i = 1; i <= num; i++) {
        if (i > temp.length) {
            temp.push("0");
        }
    }
    input = lt_code.variable.toBackArray(temp);
    var ret = "";
    for (var i = 0; i < input.length; i++) {
        ret += input[i];
    }
    return ret;
}

/**
 * 将输入的内容转为array
 * @param {any} input 输入
 */
lt_code.variable.toArray = function (input) {
    return Array.prototype.slice.call(input);
}

/**
 * 将输入的内容转为反向array
 * @param {any} input 输入
 */
lt_code.variable.toBackArray = function (input) {
    if (!Array.isArray(input)) {
        input = lt_code.variable.toArray(input);
    }
    var ret = [];
    for (var i = input.length - 1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
}

/**非对称模块 */
lt_code.RSA = {
    /**
     * 大数相加(慢速)
     * @param {String} num1
     * @param {String} num2
     */
    bigAddSlow: function (num1, num2) {
        /**开始时间 */
        var startTime = new Date().getTime();
        num1 = num1.toString();
        num2 = num2.toString();

        /**数字1的长度 */
        let count1 = num1.length;
        /**数字2的长度 */
        let count2 = num2.length;

        /**数字1是否是负数 */
        const isF1 = /-/.test(num1) ? true : false;
        /**数字2是否是负数 */
        const isF2 = /-/.test(num2) ? true : false;

        if (isF1 && !isF2) {
            return this.bigSubtractSlow(num2, num1.slice(1));
        } else if (!isF1 && isF2) {
            return this.bigSubtractSlow(num1, num2.slice(1));
        } else if (isF1 && isF2) {
            return "-" + this.bigAddSlow(num1.slice(1), num2.slice(1));
        }

        /**长度最小值 */
        let min = Math.min(count1, count2);

        /**返回值 */
        let ret = "";

        /**分位计算数值1 */
        let n1 = 0;
        /**分位计算数值2 */
        let n2 = 0;
        /**暂时计算结果数值 */
        let r = 0;

        for (var i = 1; i <= min; i++) {
            n1 += lt_code.getNum(num1[count1 - i]);
            n2 = lt_code.getNum(num2[count2 - i]);
            r = n1 + n2;
            n1 = Math.floor(r / 10);
            ret += (r % 10).toString();
        }

        if (count1 < count2) {
            for (var i = min + 1; i <= count2; i++) {
                n2 = lt_code.getNum(num2[count2 - i]);
                r = n1 + n2;
                n1 = Math.floor(r / 10);
                ret += (r % 10).toString();
            }
        } else if (count1 > count2) {
            for (var i = min + 1; i <= count1; i++) {
                n1 += lt_code.getNum(num1[count1 - i]);
                r = n1;
                n1 = Math.floor(r / 10);
                ret += (r % 10).toString();
            }
        }
        if (n1 == 1) {
            ret += "1";
        }

        ret = function () {
            let list = Array.prototype.slice.call(ret);
            let retString = "";
            for (var i = list.length - 1; i >= 0; i--) {
                retString += list[i];
            }
            return retString;
        }();

        var stopTime = new Date().getTime();
        lt_code.RSA.bigAddSlow.getTime = function () {
            return stopTime - startTime;
        };

        return this.bigNumberFixed(ret);
    },

    /**
     * 大数相减(慢速)
     * @param {String} num1
     * @param {String} num2
     */
    bigSubtractSlow: function (num1, num2) {
        num1 = num1.toString();
        num2 = num2.toString();

        /**数字1是否是负数 */
        const isF1 = /-/.test(num1) ? true : false;
        /**数字2是否是负数 */
        const isF2 = /-/.test(num2) ? true : false;

        if (isF1 && !isF2) {
            return "-" + this.bigAddSlow(num1.slice(1), num2);
        } else if (!isF1 && isF2) {
            return this.bigAddSlow(num1, num2.slice(1));
        } else if (isF1 && isF2) {
            return this.bigSubtractSlow(num2.slice(1), num1.slice(1));
        }

        var ret = "";
        /**是否小于0 */
        var isLess = false;
        if (this.bigIsBigerSlow(num2, num1) >= 0) {
            isLess = true;
            let temp = num1;
            num1 = num2;
            num2 = temp;
        }

        /**数字1长度 */
        const count1 = num1.length;
        /**数字2长度 */
        const count2 = num2.length;

        /**分位计算1 */
        var n1 = 0;
        /**分位计算2 */
        var n2 = 0;
        /**暂时计算结果 */
        var r = 0;

        for (var i = 1; i <= count2; i++) {
            n1 = n1 == 0 ? 10 : 9;
            n1 = n1 + lt_code.getNum(num1[count1 - i]);
            n2 = lt_code.getNum(num2[count2 - i]);
            r = n1 - n2;
            n1 = r < 10 ? 1 : 0;
            ret += (r % 10).toString();
        }

        if (count1 > count2) {
            for (var i = count2 + 1; i <= count1; i++) {
                n1 = n1 == 0 ? 10 : 9;
                n1 = n1 + lt_code.getNum(num1[count1 - i]);
                //n2 = lt_code.getNum(num2[count2 - i]);
                r = n1;
                n1 = r < 10 ? 1 : 0;
                ret += (r % 10).toString();
            }

        }

        if (isLess) {
            ret += "-";
        }

        ret = function () {
            let list = Array.prototype.slice.call(ret);
            let retString = "";
            for (var i = list.length - 1; i >= 0; i--) {
                retString += list[i];
            }
            return retString;
        }();

        return this.bigNumberFixed(ret);
    },

    /**
     * 大数比较(包含小数)
     * 数字1是否比数字2大
     * @param {String} num1
     * @param {String} num2
     */
    bigIsBigerSlow: function (num1, num2) {
        num1 = num1.toString();
        num2 = num2.toString();

        num1 = this.bigNumberFixed(num1);
        num2 = this.bigNumberFixed(num2);

        num1 = num1.split(".").length > 2 ? function () {
            let ret = num1.split(".");
            for (var i = 2; i < ret.length; i++) {
                ret[1] += ret[i];
            }
            return [ret[0], ret[1]];
        } : num1.split(".").length < 2 ? [num1, 0] : num1.split(".");
        num2 = num2.split(".").length > 2 ? function () {
            let ret = num2.split(".");
            for (var i = 2; i < ret.length; i++) {
                ret[1] += ret[i];
            }
            return [ret[0], ret[1]];
        } : num2.split(".").length < 2 ? [num2, 0] : num2.split(".");

        const count1 = num1[0].length;
        const count2 = num2[0].length;

        const isF1 = /-/.test(num1) ? true : false;
        const isF2 = /-/.test(num2) ? true : false;

        if (isF1 && !isF2) {
            return -1
        } else if (!isF1 && isF2) {
            return 1;
        } else if (!isF1 && !isF2) {
            if (count1 > count2) {
                return 1;
            } else if (count1 < count2) {
                return -1;
            } else {
                if (num1[0] > num2[0]) {
                    return 1;
                } else if (num1[0] < num2[0]) {
                    return -1;
                } else {
                    if (num1.length > num2.length) {
                        return 1;
                    } else if (num1.length < num2.length) {
                        return -1;
                    } else {
                        let last1 = num1[1];
                        let last2 = num2[1];
                        let maxC = Math.max(last1.length, last2.length);
                        for (var i = last1.length; i < maxC; i++) {
                            last1 += "0";
                        }
                        for (var i = last2.length; i < maxC; i++) {
                            last2 += "0";
                        }
                        return last1 > last2 ? 1 : last1 < last2 ? -1 : 0;
                    }
                }
            }
        } else if (isF1 && isF2) {
            if (count1 > count2) {
                return -1;
            } else if (count1 < count2) {
                return 1;
            } else {
                if (num1[0] > num2[0]) {
                    return -1;
                } else if (num1[0] < num2[0]) {
                    return 1;
                } else {
                    if (num1.length > num2.length) {
                        return -1;
                    } else if (num1.length < num2.length) {
                        return 1;
                    } else {
                        let last1 = num1[1];
                        let last2 = num2[1];
                        let maxC = Math.max(last1.length, last2.length);
                        for (var i = last1.length; i < maxC; i++) {
                            last1 += "0";
                        }
                        for (var i = last2.length; i < maxC; i++) {
                            last2 += "0";
                        }
                        return last1 > last2 ? -1 : last1 < last2 ? 1 : 0;
                    }
                }
            }
        }
    },

    /**
     * 大数修正
     * @param {String} num
     */
    bigNumberFixed: function (num) {
        num = num.toString();
        if (/-0*/.test(num)) {
            if (num.length == 2 && num[1] == "0") {
                return "0";
            } else if (num.length == 1) {
                return "0";
            }
            let match = /-(0*)/.exec(num);
            return "-" + num.slice(match[0].length);
        } else if (num[0] == "0") {
            if (num.length == 1 && num[0] == "0") {
                return "0";
            } else if (num.length == 0) {
                return "0";
            }
            let match = /0+/.exec(num);
            return num.slice(match[0].length);
        } else {
            if (num.length == 1 && num[0] == "0") {
                return "0";
            } else if (num.length == 0) {
                return "0";
            }
            return num;
        }
    },

    /**
     * 大数相乘(慢速)
     * @param {String} num1
     * @param {String} num2
     */
    bigMultiplySlow: function (num1, num2) {
        var startTime = new Date().getTime();
        var ret = num1;
        if (num2 == 0 || num1 == 0) {
            return "0";
        }
        for (var i = 1; i < num2; i++) {
            ret = lt_code.RSA.bigAddSlow(ret, num1);
        }
        var stopTime = new Date().getTime();
        lt_code.RSA.bigMultiplySlow.getTime = function () {
            return stopTime - startTime;
        }
        return ret;
    },

    /**
     * 大数相乘(分治算法)
     * @param {String} num1
     * @param {String} num2
     */
    bigMultiplyKaraSuba: function (num1, num2) {
        if (num1 == 0 || num2 == 0) {
            return "0";
        } else if (num1 <= 94906265 && num2 <= 94906265) {
            //结果小于9007199136250225(js安全数据:9007199254740992)的计算直接返回计算结果
            return num1 * num2;
        }

        try {
            num1 = num1.toString();
            num2 = num2.toString();
        } catch (e) {
            console.log(num1 + " " + num2);
            console.error(e);
        }

        const count1 = num1.length;
        const count2 = num2.length;

        const halfN = Math.floor(Math.max(count1, count2) / 2);

        const first1 = count1 > halfN ? num1.slice(0, count1 - halfN) : "0";
        const last1 = count1 > halfN ? num1.slice(count1 - halfN) : num1;
        const first2 = count2 > halfN ? num2.slice(0, count2 - halfN) : "0";
        const last2 = count2 > halfN ? num2.slice(count2 - halfN) : num2;

        // 很多位的运算会导致数值溢出,暂时先用慢速相加
        const plus1 = lt_code.RSA.bigAddSlow(first1, last1);
        const plus2 = lt_code.RSA.bigAddSlow(first2, last2);

        let c2 = this.bigMultiplyKaraSuba(first1, first2);
        const c0 = this.bigMultiplyKaraSuba(last1, last2);
        let c1 = this.bigSubtractSlow(this.bigSubtractSlow(this.bigMultiplyKaraSuba(plus1, plus2), c0), c2);

        //console.log(c2 + " " + c0 + " " + c1);

        for (var i = 0; i < halfN; i++) {
            c2 += "00";
            c1 += "0";
        }

        const ret = this.bigAddSlow(this.bigAddSlow(c2, c1), c0);

        return ret.toString();
    },

    /**
     * 大数相乘(分治算法)(测试用,可能导致内存溢出)
     * @param {String} num1
     * @param {String} num2
     */
    bigMultiplyKaraSubaSlow: function (num1, num2) {
        if (num1 == 0 || num2 == 0) {
            return "0";
        } else if (num1 <= 10 && num2 <= 10) {
            //结果小于9007199136250225(js安全数据:9007199254740992)的计算直接返回计算结果
            return num1 * num2;
        }
        num1 = num1.toString();
        num2 = num2.toString();

        const count1 = num1.length;
        const count2 = num2.length;

        const halfN = Math.floor(Math.max(count1, count2) / 2);

        const first1 = count1 > halfN ? num1.slice(0, count1 - halfN) : "0";
        const last1 = count1 > halfN ? num1.slice(count1 - halfN) : num1;
        const first2 = count2 > halfN ? num2.slice(0, count2 - halfN) : "0";
        const last2 = count2 > halfN ? num2.slice(count2 - halfN) : num2;

        // 很多位的运算会导致数值溢出,暂时先用慢速相加
        const plus1 = lt_code.RSA.bigAddSlow(first1, last1);
        const plus2 = lt_code.RSA.bigAddSlow(first2, last2);

        let c2 = this.bigMultiplyKaraSuba(first1, first2);
        const c0 = this.bigMultiplyKaraSuba(last1, last2);
        let c1 = this.bigSubtractSlow(this.bigSubtractSlow(this.bigMultiplyKaraSuba(plus1, plus2), c0), c2);

        //console.log(c2 + " " + c0 + " " + c1);

        for (var i = 0; i < halfN; i++) {
            c2 += "00";
            c1 += "0";
        }

        const ret = this.bigAddSlow(this.bigAddSlow(c2, c1), c0);

        return ret.toString();
    },

    /**
     * 大数相乘(分位算法)(慢速,测试用)
     * @param {String} num1
     * @param {String} num2
     */
    bigMultiplyCutSlow: function (num1, num2) {
        if (num1 == 0 || num2 == 0) {
            return "0";
        }

        num1 = num1.toString();
        num2 = num2.toString();

        //const count1 = num1.length;
        const count2 = num2.length;

        var list = [];
        var ret = "0";

        for (var i = count2 - 1; i >= 0; i--) {
            var each = num1;
            if (num2[i] == "0") {
                each = "0";
            } else {
                for (var j = 1; j < num2[i]; j++) {
                    each = this.bigAddSlow(each, num1);
                }
            }
            for (var j = 0; j < count2 - 1 - i; j++) {
                each += "0";
            }
            list.push(each);
        }

        //console.log(list);

        for (var i = 0; i < list.length; i++) {
            ret = this.bigAddSlow(ret, list[i]);
        }

        return this.bigNumberFixed(ret);
    },

    /**
     * 大数相乘(分位算法)
     * @param {String} num1
     * @param {String} num2
     */
    bigMultiplyCut: function (num1, num2) {
        if (num1 == 0 || num2 == 0) {
            return "0";
        }

        num1 = num1.toString();
        num2 = num2.toString();

        //const count1 = num1.length;
        const count2 = num2.length;

        var list = [];
        /**每位测试值 */
        let eachValue = [num1];
        for (var i = 1; i < 9; i++) {
            eachValue.push(this.bigAddSlow(eachValue[eachValue.length - 1], num1));
        }
        var ret = "0";

        for (var i = count2 - 1; i >= 0; i--) {
            var each = num1;
            if (num2[i] == "0") {
                each = "0";
            } else {
                each = eachValue[num2[i] - 1];
            }
            for (var j = 0; j < count2 - 1 - i; j++) {
                each += "0";
            }
            list.push(each);
        }

        //console.log(list);
        //console.log(eachValue);

        for (var i = 0; i < list.length; i++) {
            ret = this.bigAddSlow(ret, list[i]);
        }

        return this.bigNumberFixed(ret);
    },

    /**
     * 大数求商(慢速)
     * @param {String} num1
     * @param {String} num2
     */
    bigQuotientSlow: function (num1, num2) {
        var ret = num1.toString();
        num2 = num2.toString();
        while (this.bigIsBigerSlow(ret, num2) >= 0) {
            ret = this.bigSubtractSlow(ret, num2);
            //console.log(ret);
        }
        return ret;
    },

    /**
     * 大数求商
     * @param {String} num1
     * @param {String} num2
     */
    bigQuotient: function (num1, num2) {
        num1 = num1.toString(), num2 = num2.toString();
        if (this.bigIsBigerSlow(num1, num2) < 0) {
            return num1;
        } else if (this.bigIsBigerSlow(num1, num2) == 0) {
            return "0";
        }
        if (num2 == "0") {
            return NaN;
        }
        var divided = this.bigDividedCutSlow(num1, num2);
        return this.bigNumberFixed(this.bigSubtractSlow(num1, this.bigMultiplyKaraSuba(divided, num2)));
    },

    /**
     * 大数减中值(慢速)
     * @param {String} num1 数1
     * @param {String} [num2] 被减数
     */
    bigMidValueSlow: function (num1, num2) {
        num1 = num1.toString();
        let num = !num2 ? num1 : this.bigSubtractSlow(num1, num2);
        let isF = /-/.test(num) ? function () {
            num = num.slice(1);
            return true;
        }() : false;
        let count = num.length;
        if (count <= 1) {
            return (lt_code.getNum(num) / 2).toString();
        }
        let each = 0;
        let last = 0;
        let ret = "";
        for (var i = 0; i < count; i++) {
            each = last == 0 ? lt_code.getNum(num[i]) / 2 : (lt_code.getNum(num[i]) + 10) / 2;
            last = each % 1 == 0.5 ? 1 : 0;
            ret += lt_code.getNum(each).toString();
        }
        ret += last == 0 ? "" : ".5";
        ret = isF ? "-" + ret : ret;
        return this.bigNumberFixed(ret);
    },

    /**
     * 大数取中值(慢速)
     * @param {String} num1 数1
     * @param {String} [num2] 数2
     */
    bigMiddleValueSlow: function (num1, num2) {
        num1 = num1.toString();
        let num = !num2 ? num1 : this.bigAddSlow(num1, num2);
        let isF = /-/.test(num) ? function () {
            num = num.slice(1);
            return true;
        }() : false;
        let count = num.length;
        if (count <= 1) {
            return (lt_code.getNum(num) / 2).toString();
        }
        let each = 0;
        let last = 0;
        let ret = "";
        for (var i = 0; i < count; i++) {
            each = last == 0 ? lt_code.getNum(num[i]) / 2 : (lt_code.getNum(num[i]) + 10) / 2;
            last = each % 1 == 0.5 ? 1 : 0;
            ret += lt_code.getNum(each).toString();
        }
        //ret = this.bigAddSlow(ret, num2 ? num2 : "0");
        ret += last == 0 ? "" : ".5";
        ret = isF ? "-" + ret : ret;
        return this.bigNumberFixed(ret);
    },

    /**
     * 大数相除(慢速)
     * (实际上是猜算取中值法)
     * 精度不高但是可以勉强算到个位数为止
     * @param {String} num1
     * @param {String} num2
     * @param {boolean} [showCut] 是否显示cut值,默认不显示
     */
    bigDividedSlow: function (num1, num2, showCut) {
        num1 = num1.toString();
        num2 = num2.toString();

        num1 = this.bigNumberFixed(num1);
        num2 = this.bigNumberFixed(num2);

        /**是否有小数 */
        let haveF = false;

        if (/-/.test(num1) || /-/.test(num2)) {
            console.error("不支持计算负数");
        }

        if (this.bigIsBigerSlow(num1, num2) > 0) {
            const count1 = num1.length;
            const count2 = num2.length;

            /**差位 */
            let cha = count1 - count2;

            //商的值一般是差位+-1位
            /**最小区间 */
            let min = "1";
            /**最大区间 */
            let max = "9";

            /**中值 */
            let middle = "";

            for (var i = 1; i < cha; i++) {
                min += "0";
                max += "9";
            }

            max += "9";

            /**计算次数(上限10000次好了) */
            let t = 0;

            if (showCut) {
                while (t < 10000) {
                    t++;
                    let cut = this.bigMidValueSlow(max, min);
                    if (cut < 1) {
                        return {
                            max: max,
                            min: min,
                            maxCut: this.bigSubtractSlow(this.bigMultiplyKaraSuba(max, num2), num1),
                            minCut: this.bigSubtractSlow(num1, this.bigMultiplyKaraSuba(min, num2)),
                            t: t,
                        };
                    }
                    console.log(t + " " + cut);
                    middle = this.bigSubtractSlow(max, cut.split(".")[0]);
                    //console.log(middle);
                    cut = this.bigMultiplyKaraSuba(middle, num2);
                    if (this.bigIsBigerSlow(cut, num1) > 0) {
                        max = middle;
                    } else if (this.bigIsBigerSlow(cut, num1) < 0) {
                        min = middle;
                    } else {
                        return middle;
                    }
                }
            } else {
                while (t < 10000) {
                    t++;
                    let cut = this.bigMidValueSlow(max, min);
                    if (cut < 1) {
                        return {
                            max: max,
                            min: min,
                            maxCut: this.bigSubtractSlow(this.bigMultiplyKaraSuba(max, num2), num1),
                            minCut: this.bigSubtractSlow(num1, this.bigMultiplyKaraSuba(min, num2)),
                            t: t,
                        };
                    }
                    //console.log(t + " " + cut);
                    middle = this.bigSubtractSlow(max, cut.split(".")[0]);
                    //console.log(middle);
                    cut = this.bigMultiplyKaraSuba(middle, num2);
                    if (this.bigIsBigerSlow(cut, num1) > 0) {
                        max = middle;
                    } else if (this.bigIsBigerSlow(cut, num1) < 0) {
                        min = middle;
                    } else {
                        return middle;
                    }
                }
            }

            return {
                max: max,
                min: min,
                maxCut: this.bigSubtractSlow(this.bigMultiplyKaraSuba(max, num2), num1),
                minCut: this.bigSubtractSlow(num1, this.bigMultiplyKaraSuba(min, num2)),
            };

        } else if (this.bigIsBigerSlow(num1, num2) == 0) {
            return 1;
        } else {
            console.error("不支持计算小数");
        }
    },

    /**
     * 大数相除(慢速)(测试版)
     * @param {String} num1
     * @param {String} num2
     * @param {boolean} [showRet] 是否显示ret值,默认不显示
     */
    bigDividedCutSlow: function (num1, num2, showRet) {
        num1 = num1.toString();
        num2 = num2.toString();

        if (num2 == "1") {
            return num1;
        }

        num1 = this.bigNumberFixed(num1);
        num2 = this.bigNumberFixed(num2);

        /**是否有小数 */
        let haveF = false;

        if (/-/.test(num1) || /-/.test(num2)) {
            console.error("不支持计算负数");
        }

        /**所有值 */
        let eachValue = function () {
            let ret = [num2];
            for (var i = 1; i < 9; i++) {
                ret.push(this.bigAddSlow(ret[ret.length - 1], num2));
            }
            return ret;
        }.bind(this)();

        //console.log(eachValue);

        if (this.bigIsBigerSlow(num1, num2) > 0) {
            const count1 = num1.length;
            const count2 = num2.length;

            /**差位 */
            let cha = count1 - count2;

            /**每位值 */
            let each;
            /**是否直接跳位 */
            let next = false;
            /**残存数据 */
            let num = num1;
            /**返回值 */
            let ret = "0";

            if (showRet) {
                console.log(eachValue);
                for (var i = cha; i >= 0; i--) {
                    next = false;
                    for (var j = eachValue.length - 1; j >= 0; j--) {
                        each = eachValue[j];
                        for (var k = 0; k < i; k++) {
                            each += "0";
                        }
                        if (this.bigIsBigerSlow(each, num) > 0) {
                            next = false;
                        } else {
                            next = true;
                            num = this.bigSubtractSlow(num, each);
                            ret += (j + 1).toString();
                            break;
                        }
                    }
                    if (next) {

                    } else {
                        ret += "0";
                    }
                    console.log(ret);
                }
            } else {
                for (var i = cha; i >= 0; i--) {
                    next = false;
                    for (var j = eachValue.length - 1; j >= 0; j--) {
                        each = eachValue[j];
                        for (var k = 0; k < i; k++) {
                            each += "0";
                        }
                        if (this.bigIsBigerSlow(each, num) > 0) {
                            next = false;
                        } else {
                            next = true;
                            num = this.bigSubtractSlow(num, each);
                            ret += (j + 1).toString();
                            break;
                        }
                    }
                    if (next) {

                    } else {
                        ret += "0";
                    }
                }
            }

            return this.bigNumberFixed(ret);
        } else {
            //暂不支持小数除法
            return "0";
        }
    },

    /**
     * 大数相除(慢速)(显示差值)
     * @param {String} num1
     * @param {String} num2
     * @param {boolean} [showRet] 是否显示ret值,默认不显示
     */
    bigDividedCutSlowShow: function (num1, num2, showRet) {
        num1 = num1.toString();
        num2 = num2.toString();

        num1 = this.bigNumberFixed(num1);
        num2 = this.bigNumberFixed(num2);

        /**是否有小数 */
        let haveF = false;

        if (/-/.test(num1) || /-/.test(num2)) {
            console.error("不支持计算负数");
        }

        /**所有值 */
        let eachValue = function () {
            let ret = [num2];
            for (var i = 1; i < 9; i++) {
                ret.push(this.bigAddSlow(ret[ret.length - 1], num2));
            }
            return ret;
        }.bind(this)();

        //console.log(eachValue);

        if (this.bigIsBigerSlow(num1, num2) > 0) {
            const count1 = num1.length;
            const count2 = num2.length;

            /**差位 */
            let cha = count1 - count2;

            /**每位值 */
            let each;
            /**是否直接跳位 */
            let next = false;
            /**残存数据 */
            let num = num1;
            /**返回值 */
            let ret = "0";

            if (showRet) {
                console.log(eachValue);
                for (var i = cha; i >= 0; i--) {
                    next = false;
                    for (var j = eachValue.length - 1; j >= 0; j--) {
                        each = eachValue[j];
                        for (var k = 0; k < i; k++) {
                            each += "0";
                        }
                        if (this.bigIsBigerSlow(each, num) > 0) {
                            next = false;
                        } else {
                            next = true;
                            num = this.bigSubtractSlow(num, each);
                            ret += (j + 1).toString();
                            break;
                        }
                    }
                    if (next) {

                    } else {
                        ret += "0";
                    }
                    console.log(ret);
                }
            } else {
                for (var i = cha; i >= 0; i--) {
                    next = false;
                    for (var j = eachValue.length - 1; j >= 0; j--) {
                        each = eachValue[j];
                        for (var k = 0; k < i; k++) {
                            each += "0";
                        }
                        if (this.bigIsBigerSlow(each, num) > 0) {
                            next = false;
                        } else {
                            next = true;
                            num = this.bigSubtractSlow(num, each);
                            ret += (j + 1).toString();
                            break;
                        }
                    }
                    if (next) {

                    } else {
                        ret += "0";
                    }
                }
            }

            if (this.bigIsBigerSlow(this.bigMultiplyCut(ret, num2), num1) == "0") {
                return this.bigNumberFixed(ret);
            } else {
                ret = this.bigNumberFixed(ret);
                let max = this.bigAddSlow(ret, 1);
                return {
                    max: max,
                    min: ret,
                    maxCut: this.bigSubtractSlow(this.bigMultiplyKaraSuba(max, num2), num1),
                    minCut: this.bigSubtractSlow(num1, this.bigMultiplyKaraSuba(ret, num2)),
                };
            }
        } else {
            //暂不支持小数除法
            return "0";
        }
    },

    /**
     * 大数求随机数
     * @param {String} num
     */
    bigRandom: function (num) {
        num = num.toString();
        var key = Math.random();
        key = Math.floor(key * 10000000000000000);
        console.log(key);
        var ret = this.bigMultiplyKaraSuba(num, key);
        return this.bigNumberFixed(ret.slice(0, num.length));
    },

    /**
     * 大数开根号
     * @param {String} num
     * @param {boolean} [showCut] 是否显示切割值
     */
    bigSqrtSlow: function (num, showCut) {
        num = num.toString();

        let count = num.length;

        let min = "1";
        let max = "3";

        if (count % 2 == 1) {
            for (var i = 1; i <= Math.floor(count / 2); i++) {
                min += "0";
                max += "3";
            }
        } else {
            for (var i = 1; i < Math.floor(count / 2); i++) {
                min += "0";
                max += "3";
            }
        }

        console.log(min + " " + max);

        let t = 0;
        let center;
        let cut;

        if (showCut) {
            while (t < 10000) {
                t++;
                if (this.bigMultiplyKaraSuba(min, min) == num) {
                    return min;
                } else {
                    cut = this.bigSubtractSlow(max, min);
                    if (cut <= 1) {
                        return {
                            max: max,
                            min: min,
                            maxCut: this.bigSubtractSlow(this.bigMultiplyKaraSuba(max, max), num),
                            minCut: this.bigSubtractSlow(num, this.bigMultiplyKaraSuba(min, min)),
                            t: t,
                        };
                    }
                    console.log(t + " " + cut);
                    center = this.bigMiddleValueSlow(max, min).split(".")[0];
                    //console.log(center);
                    cut = this.bigSubtractSlow(this.bigMultiplyKaraSuba(center, center), num);
                    if (this.bigIsBigerSlow(cut, 0) <= 0) {
                        min = center;
                    } else {
                        max = center;
                    }
                }
            }
        } else {
            while (t < 10000) {
                t++;
                if (this.bigMultiplyKaraSuba(min, min) == num) {
                    return min;
                } else {
                    cut = this.bigSubtractSlow(max, min);
                    if (cut <= 1) {
                        return {
                            max: max,
                            min: min,
                            maxCut: this.bigSubtractSlow(this.bigMultiplyKaraSuba(max, max), num),
                            minCut: this.bigSubtractSlow(num, this.bigMultiplyKaraSuba(min, min)),
                            t: t,
                        };
                    }
                    center = this.bigMiddleValueSlow(max, min).split(".")[0];
                    //console.log(center);
                    cut = this.bigSubtractSlow(this.bigMultiplyKaraSuba(center, center), num);
                    if (this.bigIsBigerSlow(cut, 0) <= 0) {
                        min = center;
                    } else {
                        max = center;
                    }
                }
            }
        }
    },

    /**
     * 大数乘方(慢速)
     * @param {string} num
     * @param {number} exp
     */
    bigPowerSlow: function (num, exp) {
        if (exp == 0) {
            return "1";
        } else {
            num = num.toString();
        }
        let ret = num;
        for (var i = 1; i < exp; i++) {
            ret = this.bigMultiplyKaraSuba(ret, num);
        }
        return this.bigNumberFixed(ret);
    },
    
    /**
     * 大数乘方(快速)
     * @param {string} num
     * @param {number} exp
     */
    bigPower: function (num, exp) {
        if (exp == 0) {
            return "1";
        } else {
            num = num.toString();
            exp--;
        }
        let ret = num;
        for (;exp; exp/=2) {
            exp = Math.floor(exp);
            //console.log(exp);
            if (exp & 1) {
                ret = this.bigMultiplyKaraSuba(ret, num);
            }
            num = this.bigMultiplyKaraSuba(num, num);
        }
        return ret;
    },

    /**
     * 大数乘方(测试)
     * @param {any} num
     * @param {any} exp
     */
    bigPowerTest: function (num, exp) {

    },

    /**
     * 大数乘方求商(测试)
     * @param {any} num1
     * @param {any} exp
     * @param {any} num2
     */
    bigPowerAndQuotient: function (num1, exp, num2) {
        num1 = num1.toString();
        exp = exp.toString();
        num2 = num2.toString();

        /* 算法原理:
        ab % k = (a%k) * (b%k) % k
        所以，假设大数b是1234567
        那么a^b % k = (a^1234560 % k) * (a^7 % k) % k = ((a^123456 % k)^10 % k) * (a^7 % k) % k
        */

        /**结果堆 */
        var rets = [];

        /**乘幂结果堆 */
        var list = [];

        /**商结果堆 */
        var Qlist = [];

        /**返回值 */
        var ret = "";

        list.push("1");
        list.push(num1);

        Qlist.push("1");
        Qlist.push(this.bigQuotient(num1, num2));

        for (var i = 1; i < 10; i++) {
            list.push(this.bigMultiplyKaraSuba(list[list.length - 1], num1));
            Qlist.push(this.bigQuotient(list[list.length - 1], num2));
        }

        //console.log(list);
        //console.log(Qlist);

        for (var i = exp.length - 1; i >= 0; i--) {
            let each = "";
            let ix = exp.length - i;
            each = Qlist[exp[i]];
            for (var j = 1; j < ix; j++) {
                each = this.bigPowerAndQuotientSlow(each,10,num2);
            }
            rets.push(each);
        }

        ret = rets[0];

        for (var i = 1; i < rets.length; i++) {
            ret = this.bigMultiplyKaraSuba(ret, rets[i]);
        }

        return this.bigQuotient(ret, num2);
    },

    /**
     * 大数乘方求商(慢速)
     * @param {any} num1
     * @param {any} exp
     * @param {any} num2
     */
    bigPowerAndQuotientSlow: function (num1, exp, num2) {
        return this.bigQuotient(this.bigPower(num1, exp), num2);
    },

    /**
     * 大数阶乘
     * @param {any} num 乘数
     */
    bigFactorial: function (num) {
        if (num=="0" || num=="1") {
            return '1';
        }
        num = num.toString();
        ret = num;
        for (var i = num - 1; i > 1; i--) {
            ret = this.bigMultiplyKaraSuba(ret, i);
        }
        return ret.toString();
    },

    /** 
     * 素数合集 
     */
    numbers: [
        31,
        61,
        89,
        107,
        127,
        521,
        607,
        1279,
        2203,
        2281,
        3217,
        4253,
        4423,
        9689,
        9941,
        11213,
        //19937,
    ],

    /**计算计划 */
    project: {
        /**密匙 */
        keys: {

            /**短密匙(并不是密匙) */
            middleKey: {
                N: "4951760154835678088235319297",
                E: "618970019642690137449562111",
                D: "2803193270864617953997415754",
            },

            /**短密匙1*/
            shotKey1: {
                N: "1153631",
                E: "1447",
                D: "1005847",
            },

            /**短密匙2*/
            shotKey2: {
                N: "3604379",
                E: "2029",
                D: "3023845",
            },

            /**非常短密匙*/
            veryShowKey: {
                N: "3599",
                E: "71",
                D: "3431",
            },
        },

        /**八进制密匙 */
        _key: "12345678",

        /**base64密匙 */
        _64Key: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        /**
         * base64转8进制
         * @param {any} input
         */
        base64ToKey: function (input) {
            let index = "0";
            let ret = "";
            for (var i = 0; i < input.length; i++) {
                index = this._64Key.indexOf(input[i]);
                if (index == 64) {
                    ret += "0";
                } else if (index == -1) {
                    ret += input[i];
                } else {
                    ret += this._key[Math.floor(index / 8)]
                    ret += this._key[index % 8];
                }
            }
            return ret;
        },

        /**
         * 8进制转base64
         * @param {any} input
         */
        keyToBase64: function (input) {
            let indexA = "";
            let indexB = "";
            let index = 0;
            let ret = "";
            for (var i = 0; i < input.length; i++) {
                indexA = input[i];
                if (indexA == "0") {
                    ret += "=";
                    continue;
                } else if (this._key.indexOf(indexA) == -1) {
                    ret += indexA;
                    continue;
                }
                i++;
                indexB = input[i];
                index = this._key.indexOf(indexA) * 8 + this._key.indexOf(indexB);
                //console.log(indexA+" "+indexB+" "+index);
                ret += this._64Key[index];
            }
            return ret;
        },

        /**
         * 转码为八进制
         * @param {any} input
         */
        encode: function (input) {
            return this.base64ToKey(lt_code.base64.encode(input.toString()));
        },

        /**
         * 八进制解码
         * @param {any} input
         */
        decode: function (input) {
            return lt_code.base64.decode(this.keyToBase64(input.toString()));
        },

        /**
         * RSA加密
         * @param {any} input
         * @param {{K:String,E:String,D:String}} key key至少包含N,E,D三个参数
         */
        setCode: function (input, key) {
            key = key ? key :console.error("参数错误!");
            input = lt_code.base64.encode(input.toString());
            let ret = this.base64ToKey(input).toString();
            let rets = [];
            for (var i = 0; i < ret.length - 1; i++) {
                rets.push(ret[i++] + ret[i]);
            }
            if (ret.length & 1) {
                rets.push(ret[ret.length - 1]);
            }
            //console.log(rets);
            ret = "";
            for (var i = 0; i < rets.length - 1; i++) {
                //ret += lt_code.RSA.bigQuotient(lt_code.RSA.bigPower(rets[i], this.keys.veryShowKey.E), this.keys.veryShowKey.N)+",";
                ret += lt_code.RSA.bigPowerAndQuotient(rets[i], key.E, key.N) + ",";
            }
            ret += lt_code.RSA.bigPowerAndQuotient(rets[rets.length - 1], key.E, key.N);
            //console.log(ret);
            return lt_code.base64.encode(ret);
        },

        /**
         * 非常短的密匙加密
         * @param {any} input
         */
        veryShotKeySetCode: function (input) {
            input = lt_code.base64.encode(input.toString());
            let ret = this.base64ToKey(input).toString();
            let rets = [];
            for (var i = 0; i < ret.length-1; i++) {
                rets.push(ret[i++] + ret[i]);
            }
            if (ret.length&1) {
                rets.push(ret[ret.length - 1]);
            }
            console.log(rets);
            ret = "";
            for (var i = 0; i < rets.length-1; i++) {
                //ret += lt_code.RSA.bigQuotient(lt_code.RSA.bigPower(rets[i], this.keys.veryShowKey.E), this.keys.veryShowKey.N)+",";
                ret += lt_code.RSA.bigPowerAndQuotient(rets[i], this.keys.veryShowKey.E, this.keys.veryShowKey.N) + ",";
            }
            ret += lt_code.RSA.bigPowerAndQuotient(rets[rets.length - 1], this.keys.veryShowKey.E, this.keys.veryShowKey.N);
            console.log(ret);
            return lt_code.base64.encode(ret);
        },

        /**
         * RSA解密
         * @param {any} input
         * @param {{K:String,E:String,D:String}} key key至少包含N,E,D三个参数
         */
        getCode: function (input,key) {
            input = lt_code.base64.decode(input.toString());
            let rets = input.split(",");
            let ret = "";
            //console.log(rets);
            for (var i = 0; i < rets.length; i++) {
                //ret += lt_code.RSA.bigQuotient(lt_code.RSA.bigPower(rets[i], this.keys.veryShowKey.D), this.keys.veryShowKey.N);
                ret += lt_code.RSA.bigPowerAndQuotient(rets[i], key.D, key.N);
            }
            //console.log(ret);
            ret = lt_code.base64.decode(this.keyToBase64(ret));
            return (ret[ret.length - 1])&&/[\s\n\0]/.test(ret[ret.length-1]) ? ret.slice(0, ret.length - 1) : ret;
        },

        /**
         * 非常短的密匙解密
         * @param {any} input
         */
        veryShotKeyGetCode: function (input) {
            input = lt_code.base64.decode(input.toString());
            let rets = input.split(",");
            let ret = "";
            console.log(rets);
            for (var i = 0; i < rets.length; i++) {
                //ret += lt_code.RSA.bigQuotient(lt_code.RSA.bigPower(rets[i], this.keys.veryShowKey.D), this.keys.veryShowKey.N);
                ret += lt_code.RSA.bigPowerAndQuotient(rets[i], this.keys.veryShowKey.D, this.keys.veryShowKey.N);
            }
            console.log(ret);
            ret = lt_code.base64.decode(this.keyToBase64(ret));
            return ret.slice(0,ret.length-1);
        },
    },

    /**
     * 获取密匙
     */
    getKey: function (num1, num2, num3) {
        var time = new Date();
        let P = num1 ? num1 : this.getPrime(this.numbers[0]);
        //let P = this.numbers[lt_code.variable.random(this.numbers.length, 0, true)];  
        let Q = num2 ? num2 : this.getPrime(this.numbers[1]);
        //let Q = this.numbers[lt_code.variable.random(this.numbers.length, 0, true)];

        console.log("P : " + P + "\nQ : " + Q);

        let N = this.bigMultiplyCut(P, Q);

        let O = this.bigMultiplyCut(this.bigSubtractSlow(P,1), this.bigSubtractSlow(Q, 1));

        let E = num3 ? num3 : this.getPrime(this.numbers[2]);

        console.log("N : " + N + "\nO : " + O + "\nE : " + E);

        /**私密匙 */
        let D = this.bigRandom(O);
        //let K = this.bigRandom(E);
        let answer = null;
        //防止内存溢出
        //var wm = new WeakMap();

        let i = 0;

        //while (answer != 1&&i<30000) {
        //    i++;
        //    answer = this.bigMultiplyKaraSuba(D, E);
        //    answer = this.bigQuotient(answer, O);
        //    console.log(i+" "+ answer);
        //    D = /*this.bigRandom(O)*/ this.bigAddSlow(D,1);
        //}
        //if (i<29999) {
        //    D = this.bigSubtractSlow(D, 1);

        //    console.log("D : " + D + "\nE : " + E + "\nN : " + N + "\nO : " + O);
        //    //console.error("d参数生成有错误!!!")
        //    //let message = `计算私钥D
        //    //    E * D % φ(N) = 1
        //    //    3 * D  % 20 = 1   `;
        //    //console.error(message);
        //    return D;
        //} else {
        //    console.log(new Date(new Date().getTime() - time.getTime()).getTime());
        //}

        while (true) {
            i++;
            answer = this.bigQuotient(this.bigAddSlow(this.bigMultiplyKaraSuba(i, O), 1), E);   
            if (answer == 0) {
                break;
            } else {
               // console.log(answer);
            }
        }
        D = this.bigDividedCutSlow(this.bigAddSlow(this.bigMultiplyKaraSuba(i, O), 1), E);
        console.log("D : " + D + "\nE : " + E + "\nN : " + N + "\nO : " + O);
        return D;
    },

    /**
     * n是否为素数(未完成)
     * @param {any} n
     */
    isPrime: function (n) {
        if (this.bigIsBigerSlow(n, 2) < 0) {
            return false;
        } else if (n == 2) {
            return true;
        } else if (/./.test(this.bigMidValueSlow(n))) {
            return false;
        }

    },

    /**
     * 测试互质(未知错误,或者是数据错误)
     * 辗转相除法
     * @param {any} num1
     * @param {any} num2
     */
    testMutualityA: function (num1, num2) {
        num1 = num1.toString();
        num2 = num2.toString();
        if (this.bigIsBigerSlow(num1, num2) < 0) {
            let temp = num1;
            num1 = num2;
            num2 = temp;
        }
        if (num1 == 1 || num2 == 1) {
            return true;
        }
        while (true) {
            let t = this.bigQuotient(num1, num2);
            console.log(t);
            if (t == "0") {
                break;
            } else {
                num1 = num2;
                num2 = t;
            }
        }
        if (this.bigIsBigerSlow(num2, 1) > 0) {
            console.log(num1 + " " + num2);
            return false;
        } else {
            console.log(num1 + " " + num2);
            return true;
        }
    },

    /**
     * 测试互质(别用,傻逼算法)
     * 更相减损法
     * @param {any} num1
     * @param {any} num2
     */
    testMutualityB: function (num1, num2) {
        num1 = num1.toString();
        num2 = num2.toString();
        if (this.bigIsBigerSlow(num1, num2) < 0) {
            let temp = num1;
            num1 = num2;
            num2 = temp;
        }
        if (num1 == 1 || num2 == 1) {
            return true;
        }
        while (true) {
            let t = this.bigSubtractSlow(num1, num2);
            console.log(t);
            if (this.bigIsBigerSlow(t, num2) == 0) {
                break;
            } else {
                if (this.bigIsBigerSlow(t, num2) > 0) {
                    num1 = t;
                } else {
                    num1 = num2;
                    num2 = t;
                }
            }
        }
        if (this.bigIsBigerSlow(num2, 1) > 0) {
            console.log(num1 + " " + num2);
            return false;
        } else {
            console.log(num1 + " " + num2);
            return true;
        }
    },

    /**
     * 测试互质
     * 辗转相除法(另一种)
     * @param {any} num1
     * @param {any} num2
     */
    testMutualityC: function (num1, num2) {
        num1 = num1.toString();
        num2 = num2.toString();
        if (this.bigIsBigerSlow(num1, num2) < 0) {
            let temp = num1;
            num1 = num2;
            num2 = temp;
        }
        return this.bigQuotient(num1, num2) == 0 ? num2 : this.testMutualityC(num2, this.bigQuotient(num1, num2));
    },

    /**
     * 测试相加计算速度
     * @param {number} count 计算项数
     */
    testAdd: function (count) {
        /**开始时间 */
        let startTime = new Date().getTime();
        let num1 = lt_code.variable.random(10, 0, true);
        let num2 = lt_code.variable.random(10, 0, true);

        for (var i = 0; i < 9 * count; i++) {
            ansewer = num1 + num2;
        }
        let stopTime1 = new Date().getTime();
        let time1 = stopTime1 - startTime;
        startTime = stopTime1;

        num1 = lt_code.variable.random(1000000000, 0, true);
        num2 = lt_code.variable.random(1000000000, 0, true);
        for (var i = 0; i < count; i++) {
            ansewer = num1 + num2;
        }
        let stopTime2 = new Date().getTime();
        let time2 = stopTime2 - startTime;
        console.log(time1 + " " + time2);
        return time1 < time2 ? "小位数计算快" : "大位数计算快";
    },

    /**
     * 测试相乘计算速度
     * @param {number} count 计算项数
     */
    testMultiply: function (count) {
        /**开始时间 */
        let startTime = new Date().getTime();
        let num1 = lt_code.variable.random(10, 0, true);
        let num2 = lt_code.variable.random(10, 0, true);
        let ansewer = 0;

        for (var i = 0; i < 9 * count; i++) {
            ansewer = num1 * num2;
        }
        let stopTime1 = new Date().getTime();
        let time1 = stopTime1 - startTime;
        startTime = stopTime1;

        num1 = lt_code.variable.random(1000000000, 0, true);
        num2 = lt_code.variable.random(1000000000, 0, true);
        for (var i = 0; i < count; i++) {
            ansewer = num1 * num2;
        }
        let stopTime2 = new Date().getTime();
        let time2 = stopTime2 - startTime;
        console.log(time1 + " " + time2);
        return time1 < time2 ? "小位数计算快" : "大位数计算快";
    },

    /**
     * 测试分治算法计算速度
     * @param {number} count 两项乘数位数
     */
    testKaraSubaTime: function (count) {
        var num1 = "";
        for (var i = 1; i <= count; i++) {
            num1 += (i % 10).toString();
        }
        var startTime = new Date().getTime();
        var ret = this.bigMultiplyKaraSuba(num1, num1);
        var stopTime = new Date().getTime();
        return (stopTime - startTime).toString() + "ms answer:" + ret + " count:" + ret.length;
    },

    /**
     * 测试分割算法(测试版)计算速度
     * @param {number} count 两项乘数位数
     */
    testCutSlowTime: function (count) {
        var num1 = "";
        for (var i = 1; i <= count; i++) {
            num1 += (i % 10).toString();
        }
        var startTime = new Date().getTime();
        var ret = this.bigMultiplyCutSlow(num1, num1);
        var stopTime = new Date().getTime();
        return (stopTime - startTime).toString() + "ms answer:" + ret + " count:" + ret.length;
    },

    /**
     * 测试分割算法计算速度
     * @param {number} count 两项乘数位数
     */
    testCutTime: function (count) {
        var num1 = "";
        for (var i = 1; i <= count; i++) {
            num1 += (i % 10).toString();
        }
        var startTime = new Date().getTime();
        var ret = this.bigMultiplyCut(num1, num1);
        var stopTime = new Date().getTime();
        return (stopTime - startTime).toString() + "ms answer:" + ret + " count:" + ret.length;
    },

    /**
     * 测试相除
     * @param {number} count
     */
    testDivided: function (count) {
        var a = "";
        for (var i = 0; i < count; i++) {
            a += (i % 10).toString();
        }
        var b = this.bigAddSlow(a, 1);
        var c = this.bigMultiplyKaraSuba(a, b);
        console.log(a + " " + b + " " + c);
        var startTime = new Date().getTime();
        var q = this.bigDividedSlow(c, a, true);
        var stopTime = new Date().getTime();
        return q + " " + b + " " + this.bigIsBigerSlow(q, b).toString() + " " + (stopTime - startTime).toString();
    },

    /**
     * 测试相除
     * @param {number} count
     */
    testDividedCut: function (count) {
        var a = "";
        for (var i = 0; i < count; i++) {
            a += (i % 10).toString();
        }
        var b = this.bigAddSlow(a, 1);
        var c = this.bigMultiplyKaraSuba(a, b);
        console.log(a + " " + b + " " + c);
        var startTime = new Date().getTime();
        var q = this.bigDividedCutSlow(c, a, true);
        var stopTime = new Date().getTime();
        return q + " " + b + " " + this.bigIsBigerSlow(q, b).toString() + " " + (stopTime - startTime).toString() + "ms";
    },

    /**
     * 获取素数(获取已知素数用)
     * @param {number} count 叠成方次数
     */
    getPrime: function (count) {
        var ret = "2";
        for (var i = 1; i < count; i++) {
            ret = this.bigAddSlow(ret, ret);
        }
        return this.bigNumberFixed(this.bigSubtractSlow(ret, 1));
    }
};

/**3D模块 */
//lt_code.threeD = {};

/**追加方法模块 */
lt_code.addMethod = {};

/**向模块中添加方法 */
lt_code.addMethod.AddMethod = function () {
    /**
     * 删除一项
     * @param {number} index 索引
     * @param {number} [count] 项数
     */
    Array.prototype.remove = function (index, count) {
        var ret = [];
        count = count == null || count == 0 ? 1 : count;
        this.forEach(function (e, i) {
            if (i < index) {
                ret.push(e);
            } else if (i >= index + count) {
                ret.push(e);
            }
        });
        return ret;
    };

    /**
     * 删除内容
     * @param {any} obj 要删除的对象
     * @param {any} [needAll] 是否全部删除
     */
    Array.prototype.delete = function (obj, needAll) {
        var ret = [];
        var base = this;
        if (Array.isArray(obj) === false) {
            if (!needAll) {
                var i = -1;
                base.forEach(function (e, j) {
                    if (obj === e && i < 0) {
                        i = j;
                    } else {
                        ret.push(e);
                    }
                });
            } else {
                base.forEach(function (e) {
                    if (obj !== e) {
                        ret.push(e);
                    }
                });
            }
        }
        //这里有bug
        //else {
        //    if (!needAll) {
        //        obj.forEach(function (e) {
        //            ret = ret.delete(e, false);
        //        });
        //    } else {
        //        obj.forEach(function (e) {
        //            ret = ret.delete(e, true);
        //        });
        //    }
        //}
        return ret;
    };

    /**
     * 随机取出一个数据
     */
    Array.prototype.randomOne = function () {
        let item = Math.random() * this.length;
        item = Math.floor(item);
        let ret = this[item];
        return ret;
    };

    /**
     * 将整个列表随机化
     */
    Array.prototype.random = function () {
        let list = this;
        let ret = [];
        let count = this.length;
        let item;
        for (let i = 0; i < count; i++) {
            item = list.randomOne();
            list = list.delete(item);
            ret.push(item);
        }
        return ret;
    };

    /**
     * 获取所有项
     * @param {object} item 其中一项
     */
    Array.prototype.indexsOf = function (item) {
        var ret = [];
        this.forEach(function (e, i) {
            if (e == item) {
                ret.push(i);
            }
        });
        return ret;
    };

    /**
     * 顺序排列
     * @param {boolean} isMinToMax 是否从小到大排列
     */
    Array.prototype.order = function (isMinToMax) {
        var ret = [];
        var list = this;
        const count = this.length;
        if (isMinToMax) {
            do {
                let min = Math.min.apply(null, list);
                for (let i = 0; i < list.indexsOf(min).length; i++) {
                    ret.push(min);
                }
                list = list.delete(min, true);
                //console.log(list);
            } while (list.length);
        } else {
            while (list.length > 0) {
                let max = Math.max.apply(null, list);
                for (let i = 0; i < list.indexsOf(max).length; i++) {
                    ret.push(max);
                }
                list = list.delete(max, true);
                //console.log(list);
            }
        }
        return ret;
    };

    /**
     * 全部匹配
     * @param {RegExp} regex 正则表达式
     * @returns {Array}
     */
    var matchAll =  function (regex) {
        if (!regex.flags) {
            return regex.exec(this);
        } else if (/g/.test(regex.flags)) {
            let ret = [];
            let match;
            while ((match = regex.exec(this))!==null) {
                ret.push(match);
            }
            return ret;
        }
    };

    /**如果string没有matchAll则使用自己写的函数 */
    String.prototype.matchAll = String.prototype.matchAll ? String.prototype.matchAll : matchAll;
}();

//加载图标
!function () {
    lt_code.variable.images.icons[0] = "data:image/x-icon;base64,AAABAAEAQEAAAAEAIAAoQgAAFgAAACgAAABAAAAAgAAAAAEAIAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAD////////////////////////////////////////////////////////////////+/v//9vX2/77A0v/GzN//x8/e/8HG3P+9uMj/kYCC/2FHS/9YPEL/UzdA/083Pv95ZGz/fGdw/3xpdf91YWn/fGVy/52Rm/+3s8H/1dbi/52QmP9ZQk7/vre7/5uRlf9dRlD/PyQt/0ElLv89JC7/PyQt/0AnL//QzM7//P39/+Dc3P9AKS7/a1Vi/2dRX/9YQUj/Lxkd/xwGCP8fCAv/PSYt/4N1fP/BvcD/4N/e//n6+f/n5ev/1dPb/+rp7f/Fw9b/+Pr7//7+/v/////////////////////////////////////////////////////////////////+/v7//v7+//b19v++v8//xcvg/8XL3v+9vtj/ycXT//X39v/a2Nn/3tjd/8S8wf/Qys3/2NbX/5aQlv+HdoX/b1Rf/3JWZP9vVmL/ubC4/5qSmv92Ymv/TzdB/25bY//W0tT/3t3f/7qytv9zYmj/Qygx/0ImL/9CJS7/gXN4//z8/P/49/f/blth/1lDS/8mEBL/JRUW/0EuM/88Jin/VkdJ/6aho//k4uP/+Pr5/+7v8v/ExND/2tnf//r5+v/8/Pz/ycfY//Dx9P/+/v3//v7+/////////////////////////////v7+//7+/v///////////////////////v7+//79/v/29vf/v77P/8TL3//Fyt7/vL7Z/8PB0P/u7O3/6OXn/+jn6f/8/P3//f39//r9+/+ppKj/hXaF/2BDUP9fQU7/XDxK/1Q2Qv9JLzn/Qycy/0ktOP9MLjj/ZE9W/+Pg4f/l5Oj/3uHi/4x8gf9AJS7/QyYv/1Y+Rv/u6+3/+/v7/4Rwd/9oU17/RC80/zchI/9mVVr/zMfJ//j4+P/7/f3/+/v8/9nY3f+/vcv/5ebr//3+/f/9/f3//f78/9XU4v/j4+v//v79//7+/v////////////////////////////7+/v/+/v7////////////////////////////+/v7/+vr6/7++z//EyuD/xMne/7y+2v+/u9L/5ePm/+He4f/7+/v//v7+//7+/v/8/v7/7e7u/39veP9bPEn/WjtH/08yPf9NMT3/TzZC/0IpMf9DJzH/TTA6/1IzPf+ThYn/6enr//Dx8v/r6uv/aVhf/0QlLv9AJSz/w72+//z8/P+HeHv/ZExT/3NaYf9lS1L/inZ9//Pz9P/9/f3/8vPy/8O/xv/HyNL/6Ovu//r+/f/+//7//v7+//z+/f/k5O3/1dTg//3+/f/+/f7//////////////////////////////////////////////////////////////////v7+//z9/P+6ucn/xcng/8XK3v+9wNr/u7fP/9zb4f/k4+j//f39//3+/v/9/f3//P39//j5+P+8tbn/f290/2ZTXP9jSlf/ZEhW/1c+Sv9TPkv/TTpE/zMbIP9OMDn/UzlE/9fR1P/5+vr//Pz8/9bW2v9SPUP/RiYt/5eJi//8/f3/npKU/zYdIf9iS07/cVhc/21VW//g3uD/7Ors/8C/xf/U1eH/6Ofr//39/v/8//7////+///////9/v7/7/D0/8zL2v/8/vv//v3+/////////////////////////////////////////////////////////////v7+//7+/v/+/vz/vLzJ/8DE3P/GzN//xMre/7m3zv/Z1dz/6Ons//v9/f/8/v7/9vf4/9PS0/+wqbD/t663/7exvP/GyND/koeS/1E4Q/9INED/nJSx/5WPpv9QO0X/Rykz/zcdJP9oV13/+Pf5//v9/f/5/Pz/ua6w/0cpL/9uWVz/+vv7/7m0tf87HyL/WTw//2ZPUf98Z2z/r6ms/8O+w//m6e//3+Ho//z7/P/+/v7////+/////v/////////+//f3+v/GxNT//Pz+//7+/v////////////////////////////////////////////////////////////7+/v/+/v7//f79/83O1v+6vdf/w8jd/8XL4P+4udH/1tTZ/+3u8P/09vb/5+rs/9nc4P/f3t//+vn5//39/f/19PX/1tLa/6+ms/9SO0b/emh//5iNqP+ck67/eWl9/1Q2QP9mVGX/bF9t/9jX3f/7/fz//P7+//f39/9/b3L/VDg9/+7t7f/q6en/c2Bi/4VvcP+LdnP/iXl6/4l+gP/t7u//3eDp//X3+f/9/f3//v7+/////v////7//////////v/7+/3/xcPX//v8/P/+/v7////////////////////////////////////////////////////////////+/v7//v7+//39/f/j5On/tLXS/8LH3P/Fyt//urzW/87L0//QydD/3Nrc//b29//9/v7//f39//7+/v/+/v7//f39//3+/f/6+/r/5ubq/8C3xP+ViJn/in+W/5SGoP92Z3X/lY6p/62ryf+5uc7/9/n4//7+/v/+/f3/6Obm/15IS//Y09T//Pz8/66hoP95XV7/nY6N/7Gpqv/W1NT/6+7y/+Pl6//6/fz//v7+/////////////////////////////v7+/8fF2f/5+fz//v7+/////////////////////////////////////////////////////////////v7+//7+/v/+/v7/9ff3/7i50f/Dx9//xMvg/6iku/+1srn/7+7v//39/f/9/v3//P39//D3/f/m8fz/4ev7//D2+//9/v3//v7+//7+/v/9/f3/9PX3/83L1/+jnrD/mZSs/56Zsv+jobz/op+7/9vY2v/9/f3//f7+//v9/f+4sbL/u7O0//Dv7//i3t//2dbW//X09P++vLv/9/j4/9fZ3//x8vX//v7+/////////////////////////////v7+//7+/f/Kydn/9fX5//7+/v////////////////////////////////////////////////////////////7+/v/+/v7//v7+//39/f/Mzdr/v8La/6uouf/b2d3/+/v7//7+/v/+/v7//f37/+Tn9/+90/n/tc36/6rF+f/I2/b//f79//7+/v/+/v7//v7+//3+/v/8/f3/9PT4/87P2v+npbv/m5et/5+ar/+vqrP//v7+//7+/v/9/v7/7e7u/7q1tv/l5ub/1dHT/+Dh5//m5uf/zsnL//X29v/R0dL//Pv9//////////////////////////////////7+/v/+/v3/zs7d//Ly9f/+/v7///////////////////////////////////////////////////////7+/v/+/v7//f79//j7+//b3eL/s7DC/6Wbrf/w8PH//v7+//7+/v///////v7+//z8/f/G0u//rcT4/67G9f+3y/L/6e77//7+/v/+/v7//////////////////v7+//39/f/8/v3/6uvv/62qtv+TiZj/l4yZ//r6+v/+/v7///////39/f/g3t7/6+zs/7Ous/+rp7L/oJyf/+jo6P/q7Oz/4+Li//z9/f/+/v7////////////////////////////+/v7//v7+/9LS3v/v7/T//v7+///////////////////////////////////////////////////////+/v7//f79/+7t8P++vc7/vsHU/6agrP/w8fL//P79//7+/v////////////7+/v/8/f3/9fn8//D1/P/z9/v/+vz8//39/P/+/v/////////////////////////////+/v7//v3+//3+/f/29fb/sKqz/4R1gf/o5uf//v/+///////+/v7/+fr6/+/w8P+4sbP/zs7Y/6qipv/z9vX/5OTk//b4+P/+/v7//v7+/////////////////////////////v7+//3+/v/X1+P/7O3y//7+/v////////////////////////////////////////////7+/v/+/v7//f7+//Pz9f+6u87/xcnh/6urvf/q6uz//P39//3+/v/+/v7//v7+///////+/v7//P39//r7/P/8/fz//f78//7+/f/+/v7///////////////////////////////////////7+/v/+/v7//f39//T3+P+roqv/1dLU//7+/f/+/v7//v7+//39/f/z9fX/sKuu/8XByP+8trb/9Pj3/8nExf/z9vb//f7+//7+/v/////////////////////////////////9/v7/2trm/+nq7v/+/v7////////////////////////////////////////////+/v7//P79//j4+P+zsrz/yc7j/73B1//Bvsn//f39//7+/v/+/////P7+//7+/v/+/v7/+vv+/+70/P/r8/z/9fn9//39/f///////////////////////////////////////////////////////v7+//7+/v/6/fz/6+rt/9vY3v/+/v7//v7+//7+/v/9/f3/+Pb4/66nrP/OytH/29jZ/9/f4f+sprD/x8XG//v9/f/+/v7//////////////////////////////////v7+/9na5v/l5er//v7+/////////////////////////////////////////////v7+//3+/f/Ry9D/uLbJ/8nQ5v+prcT/6efq//39/f/7/f3//f79//3+/v/+/v7//P39/+Hs+f/N3vn/z978/+Xu+//9/P7//v7+//7+/v///////////////////////v7+//7+/v/9/f3//P7+//7+/v/+/v7/+/38//P39//f4en//v3+//7+/v/+/v7//f39//j2+P+2srb/zcvP//Dv7/+9uLz/t7fI/52Wmv/l5uX/+vv7//7+/v/+/v7//v7+//7+/v////////////7+/v/Z2eX/4OHl//7+/v/////////////////////////////////+/v7//v7+//7+/v/08/T/q6Sz/8XL3v/CyuL/srTH//b6+v/y9/v/8Pf6//v7+//+/v7//v7+//r8/f/R4PX/x9n5/8nY+v/g6/r//Pv+//7+/v/+/v7///////7+/v/+/v7//v7+//n8/v/2+fz/8/j6//X6+//4/Pz/+v79//r9/P/0+Pn/3N/n//39/f/+/v7///////z8/f/08vT/saut/8fAwv/c3d3/v8HJ/7m7yf+0sbv/wcDE/9zd4P/n5uj/8PDw//r6+v/+/v7///////7+/v/9/v3/2djk/+Dh5v/+/v7//////////////////////////////////v7+//7+/v/8/v3/zMjP/7Csw/+srsT/2t3n/7u80f/Q2eX/w8nW/8jQ0//l5eD//f38//7+/v/6/P3/zNz3/8XY+f/O3/n/5e/9//v9/f/+/v7//v7+//7+/v/+/v7//v7+//39/f/z9/j/09jY/97m5P/X3tz/5urq//b5+v/6/Pz/8/j5/9fb5f/9/Pz//f39//7+/v/7/Pz/5+fn/8jHx//FvL3/xsPF/8LC0P++v87/urjF/7mzvf+ioqf/2Nja/+bn6v/f3+H/3d7f/+7w8P/9/v7//f79/9bX4v/k4+f//v7+////////////////////////////////////////////7u/v/6umuP+hnLL/5+bt/9LX4/+mp7j/sa+9/9XW2//x9O3/7e/p//b38//9/f3/+/z9/+Dp+v/Y5vr/4e38//D3/v/9/P3//v7+//7+/v/+/v7//v79//39/f/7/Pn/9Pnx//D17v/x9u7/1M3J/8G+s//V4tz/5Ozw/+z0+v/W3+j/+fr7//z8/P/+/v7/+fv6/93e3v/Pz9D/39/h/6ugo/+5uMH/ubm//7q4vP+1tLb/trW4/6CYmf/DwcP/6+zt//X4+f/Y2tz/7Ovs//39/f/T0d7/7Ojs//7+/v/////////////////////////////////+/v7//v7+/7y6wP+em67/4uDk/9/f4v+sprD/0MrN/8fBwf/p6N3/wriS/8a+lv/i39P/+fr5//39/f/7+v7/9ff9//n6/P/6/P3//v3+//7+/v/+/v7//v79//3+/P/29/P/4N6//9/Ztf/c2r3/293D/+fm1//o6+b/t7q3/8HS3v/L3O3/1uPy//f5+v/7+/v//f7+//X4+P/V09T/2dna/+bo7P+7ubb/rKWk/7e1tf+4trX/s7Go/7i0s/+vrLD/w7++/8bCxP/u8PH/+vv7/9XT1f/29/j/z8vX//Lw8//+/v7//v7+/////////////////////////////v79/+/t7/+clqX/0M7V//Lw9P/Hwsn/19XW/+Lh3P/g3tP/0suv/8rBk//Qypr/zsqv//Pz6f/+/f7//P39//n7+//3+fn/+vz8//r6/f/4+/z/9/v7//r9/f/3+Pr/1NPC/9PNr//Ovo3/yr6V/8fAn/+8rIj/4+bb/6eisP+utND/t8vp/8jX7//y9vr/+Pn6//z8/P/y9fj/zszN/9jX1v/X2t//19vf/76+vv+8vr7/v7y7/7Wxp/+popf/vb++/7i1t//c2Nj/y8nL//f5+v/y8vL/1NfZ/8rGz//4+Pn//v7+//3+/f/9/v7//v7+/////////////v7+//3+/f+8tb3/qqa4/+3v9P/O0Nb/8vT1//f49//T0c3/x7up/5F7V//Ju37/19ig/8K4jv/r6t7//f3+/+bj4/+tqbD/3OLp/9vd6P/Dwsz/2dvh/7/Axv/r7fP/1dHQ/6eXef/U0q3/0MiD/8e+e//d2q3/gGNC/6OShf/S1+P/mpu//67F6/+st9r/7fH2//j5+v/8/Pz/7/P2/8C8vf/Y2tn/ycrO/8rNy//Gycr/y8/S/8XCw/+/vLT/rKSS/62ooP/DxMj/yMO//+Hg4P/X2dv//P39/+Di5v+4s73/+vr5//7+/v/29fX//P7+//7+/v////////////7+/v/4+Pj/lYqc/87O1//b3OX/2drf//v9/f/j4eH/29fU/3lhTP+EYzv/sJZa/6KSZP+dh1z/6ufb//X19v/DvsD/xcjU/8vJ1/+7t8D/7+/w//r8/P++vb//3N/k/6GUkP99Ykj/yL+F/7ihWv+ahUr/zMJ9/5yDV/9bQTT/0NHU/77F5P+sveb/naXI/+ju8v/29/n/+vv7/+ru8v+7trX/19ja/7++uv/HyMH/y8vI/66jlv+Wgmv/rZmD/6OPe/+WhXP/zM7M/8S/v//t7u7/zMnL//Py9f/5+Pr/vbvA//z8+//+/v7/vLa6//r5+v/9/v7//f7+//7+/v/+/v7/5ePl/5eLov/i4+r/x8fQ//f39v/7/Pz/o5uf/4Z0cv8uEAv/Tysc/2BBKP9cQDD/f2FI/+Lc1f/X0tT/1dPY/9bZ5f/Bvcj/9fX2//39/f/6+vr/mZCS/8C6uf9pVE7/RyIa/2tKLP9kRif/XEc4/2JEKP9QLx//OB0U/5yPkP+fmaj/yM/l/7i7zP/m7PH/8/b5/+/09f/e5uv/s62s/8DCv/++u7X/uLKt/5uJf/+ZgGb/r558/7Kjgf+8spj/o5R2/7awpv/N0NL/09LR/+zs7f/V0dP/+vz9/+Tk5v/8/P3//////+vs7P/V09T//Pv7//7+/v/+/v7//f39/8S/wv+7ucj/2dvl/9LP2P/9/fz/7Ovt/5yUpv+AdHn/KBEO/zUaFv8+HBX/RSQd/7Onn//w8fH/z83P/9DO2f/JytL/9PT0//7+/v/9/v3/8vT2/5WNkv+ajo3/YUpI/y8REP8rDAj/LAwI/ywNDP8+GxT/VDsx/z0jHf9lTVD/g3N//8fK2v+vr7//5erx//H0+P/i6u7/09jb/7u2uP/Gycr/ta6q/0ovK/9IKiP/Sigf/6OTdP+0qYH/sKeH/6qae/+jkH//ycrF/8K/vP/19/f/z8vL/+/v7v/7+/v//v7+///////n5Of/9fX1/+zq6//9/fz//f3+//3+/P+uq7T/0dTh/8jH0v/x8fP//f39/7Kttf9tXnL/iYCH/xwHCP8cCAj/OSUn/5uXo//s8fX/1dbd/9HP2P/Kx9f/29re//39/f/+//3/+/37/+bm6/+ys7//qKKs/00xOf86Hhv/MhUR/y0OD/8gAwT/Kw4L/0suKf86ICL/RC41/3BpeP/EzNv/rK+9/+fr9P/n7PL/4Ofr/83R0f+fkY3/pJGF/2pKPf9LKiD/VzQn/1QwI/9mRTX/ZEE0/1w6K/9fPS3/eV5O/7+9q/+2rZv/4d3b//Hv7v/Fvrf//fz8//z+/P/+/v7/samu//r7+//u7vP/5eTq//79/f/9/vz/r663/9LY5f/T09v//fz8//z7/P+qqr//mJOo/2NWX/8oERL/STRF/6ijs//R2+v/7/X5/8TH1v/Pz9j/wb/J//r6+v/+/v7//P38//n7+v/y8/b/ycjQ/9DT3v9xYnL/XkdR/00vMf9BIiX/TDQz/2xUWf95Z3L/fneG/6Gdr/+6vdD/w8rc/6utu//l6vL/4+ju/97k6f/Fxcb/inpv/4xoVf95VkT/VTEo/2E7Lf9vSDX/cEk2/105Kf9bOSn/ZUIx/2FBL/9sUkT/f11L/8W9tP/8+/r/t7Cq/+/w7v/8/f3//////8K8wP/b2uD/+fz8/9PR4P/39/n/+/v8/7m3wP/Y2+b/6Ojs//7+/P/2+fr/xMnf/9LW5P+Dd4n/k4mT/8vK1f/v9ff/0Nvs/+Lp9f/Fytn/vrzH/+Xk5//+/f7//f39//j6+v/7/f3/+Pr7/8fI0f/k7PT/wsbW/4h+lP9eSFP/XUhN/42Ckf+joLX/npyt/7y9xf/Iys//6O3y/+Ps9P+2ucP/4efw/9/l6//a4OP/trOv/5B7af+Scln/noJj/5mAZ/+Fb1//jXNd/62fjP+ypoz/rp51/7yqiP+/sY//Z00+/2pJN/+ilIb/9Pb0/8nEwP/n5uX//f7+//7+/v/3+Pr/v7zJ//j3+P/l5ez/5+bw//b19//Bvcj/3+Do//T19f/9/fv/8vT4/8jO4v/a3+z/3uHq//r9/f/6/Pz/7PD2/8/a7//Q1uv/0NTg/8rI0//7/Pz//f39//n7+//4+vr/+/39//Hz8//Dx8//5vD3/9fe6P+oprz/vrzK/9rb6P/k6fH/zNDe/6iktP/Mzdb/+vv7//X4+//h6PP/u7vE/97l7P/d4+j/09jZ/6ifmf+ZgGj/oYFj/6+acf/GxZ3/1NLC/8W+ov/Bv6L/ycWm/8S2j/+7qoL/tJ55/2xLOv9oRTX/mYBn/+fl4P/Oysb/7uzr//7+/v/+/v7//P79/9rZ4f/W0t7/+Pj4/9bW5v/s7O7/zsrV/+nr8P/7/fz//f78/+zu9P/O0+D/4OHs//j6+//7/fz/+vz8/+Hk7P/I0eb/wMXd/+Xq7f/x8vb/+/z8//v8/P/3+vr/9/n6//v9/v/i4+T/2dzj/+vw+P/r8Pb/wsLP/8bG1P/f5/H/3eXv/66su/+6ucb/+/v8//7+/v/0+Pn/2N/q/725wP/c4+j/2d/k/9HU1v+0qZz/qpt//7Sefv+/tIf/j39l/2pJOf96YUj/q6B1/7+5kv+9rn//uqd4/760kv99WUP/RSMc/5+Lbv/Nx7//zMnD//T29f/+/f7//v7+//7+/v/7+vz/vrrH//b19//X2OP/4eTs/+Hi6f/s7/P//f39//39/f/m6fL/3N/p//X2+f/5+/v/+vz8//n7+//X1d//xcre/7y90//4+Pr/+/z8//n7+//4+/r/9Pn6//D1+P/y9vn/1tTZ/+Lo7v/u7/n/7vL5/+Tn7/+5tsX/2eLu/8jO2f+2s7//8fP3//3+/P/9/f3/5/Dy/9Xb4v/Av8j/2N/m/9TY4P/S19b/rqOU/457aP+Mdl3/g25U/1EwIv+CY0n/vLeI/8nEmv+/uIr/vbSB/8O2i//At5v/Z0o1/zcTD/+BbVv/yMO8/8nHwP/6+vr//v3+//7+/v/+/v7//v78/+Ti5//Rztn/5ubs/9DQ3//m6ez/8/T2//39/f/9/f3/5Ofw/+rs9P/6+/v/+Pr7//n8/P/7/Pz/ysnT/8PF3f/Dwdb/+/v8//r6+v/5+/v/9vj6//L0+v/w9Pn/8fX5/9HS3P/p8PX/7vH5/+3x9//w9fj/s7G+/9Xe7P+5usX/8/P2//z+/f/9/vz/+/v8/+ft9f/V1dz/wcXN/9Tc4v/U2d3/wL66/0otJf9GIhz/RCAY/0snHf9XNSf/lH5d/8C8hv/Bvo//kXpV/62Taf+liGb/a0s6/0EdFv9uUz//iXhh/87HvP/Jxbz//f39//3+/f/7/P3//v7+//7+/v/7+/v/ysnU//Dx9P/h4eT/5ufs//b3+P/9/f3//P38/+Xp8P/w9Pj/+vv7//L09f/w8vT/7/T2/8K8yv+trsT/uLfH//f6+v/2+vr/8/j4//D19//w9Pr/6u70/+nt8//U1eL/5u7z/+3x+f/u8vf/8vb5/7W0wP/Mzt3/vrvF//38/v/+/v7//f79//P2+f/e5O//wsDL/9DR2f/X2uD/urm5/0UpJP9LKR7/UC0i/0snHP8/HBT/RyYe/3lhRP/CvIj/wrmJ/6OKaP+gg1v/km9P/3FPO/9PKR//alND/7Wtmf/NyL3/zMi9//7+/v/8/v3/8fP0///////+/v7//f39/+Xm6//e3eb/+/38/9zd5f/4+Pv/+v39//38/f/p7PH/9ff5//r8/P/5+/v/9/v7//T5+P/JxtL/ubvU/9TW4//3+vv/7/X2//H29//s8fX/7/L6/+vv9P/g4+z/ycrY/9/h7f/a3OT/2dzh/9ve4/+xrbz/ub3P/9zd4v/+/v7/+/3+/+nu8v/V3Ob/ytHc/8nN1v/W2OH/0dXZ/4t9ev9JJRz/a0g4/4FgSf9bNSf/Tioe/1s5Kv9tTzn/xLiI/761iv9nRzP/elc//599W/+AYEf/Tysf/1I3Lf+4sKL/xbyz/9nWzf/7/f3/+vz8/9re4/////////////7+/v/8/Pv/zszT//r8/P/Ky9P/+fn7//r8/P/8/f3/7e/0//j5+//6/Pz/+fv7//f6+v/0+Pj/ztDZ/72/2//f4uz/9Pf4/+js8//r8PX/7fD5/+/z+P/v9Pj/7PP3/+7x9f/x9fn/7vD5/+vx+f/w9fv/xMPR/77B0P/z9Pb//f7+/+7y9f/U2Ob/zdLf/8bL2P++wcn/sK2x/1Q8PP88HRn/c04+/66ZdP+6q37/j21T/3NKOP9dOir/aEUy/7Wgc/+5q4L/c1E5/2hDMP+SbU//k3BR/1kwJv9CIBn/samb/66llv/t6uL//P39//Hy8f/Dwr3////////////+/v7/+/v7/9za4v/3+Pr/7O3v//j6+v/7/Pz/+/z8/+7x9P/5+vv//Pz8//n7/P/3+vv/8/f4/9TW4P+7vdj/5Ojv/+7x9P/x9Pj/4+jx/+7y+v/w9Pn/8PT5/+vx9//x9Pj/9fj8/+/y+//q8vn/7/H5/8jJ1P/Gydf/+fv7//v9/f/b4er/ztPk/8TI2f/M0t//tLK4/0MtLP9dQz//m5CD/2FFNP+AYUr/imtP/5V2Vv99VDz/VDIj/1s2J/+dgl3/r5hs/5JyUf95Vjz/f1lD/5RwVP9/W0P/ORUP/5qOgf+ekX//9ff0//z9/f/Szcn/ycXA/////////////v7+//Lz9v/U0tr/vrnD//X19f/7+/v//f39//v9/f/u8vX/+fv8//r8/P/4+vv/9/n6//L2+P/Z3OT/urzV/+vs9P/x9Pj/8vb4/+To8v/v8vr/8PP7/+/1+v/p7/X/9fb5//b6+//v8vj/7vL6/+zw9//Lzdv/y83Z//z8/f/5/P3/wsTQ/3xsd/9uV1//blhe/2JJSv9uXVr/ubqx/8C+sP9sTT7/e09A/39XQ/+af1//mnxb/3dZPv9PKx7/bEw4/6qPZf+TcFL/gFpD/2pDMP+MZkv/knBQ/1w4J/92YVn/pJmH//j7+v/6+/v/tKuo/+/t7P////////////7+/v/u7/L/2dnh/7e1zP/d3eT//P39//7+/v/7/P3/8PP2//r7/P/6/Pz/+Pr7//f5+v/y9vj/4eTs/7m71P/q6/P/9vf5/+ju9P/o6/b/8PL6//Dz+//v9Pn/6O/1//f4+v/1+fn/8PP5/+7y+f/s7/f/zc/e/9DR3P/8/fz/8O/1/2pWYf9aOj//UDI0/0kqK/9vX2D/rqmp/4qAe/+/uqz/loBp/4tsUf+HZ07/Xjkr/2A+L/+cgFz/kXJV/2NALv9nRDH/XTYm/2I8K/9pQzD/d1M+/4FcRf9tSDX/WTwv/8O5q//8+/v/6+7t/8C7vP/8/v3////////////+/v7/7/Dz/9vc5//KyeD/t7HF//T19f/9/f3/+/38//L19//7/Pz/+/z8//n7+//4+vr/9fb5/+nr8/+8vNb/5urw//j5+//k6vL/6+/4//H0+v/w9Pn/8fT6/+vu9f/3+vn/9fn5/+/z+f/s8fn/6/D2/83S4P/d3eX/+fr7/7/Azv9HMDj/RSgt/0kpLv9mUFP/mo6R/2VSTv9KNC7/s62c/5uJcf+him3/a0o2/0AeFv8+Gxf/SSgc/4dgSP+Zdlb/hWBG/3BINf9OKB3/RB8X/z8cE/84Fg//MA4J/1IyKP/h3db//fz8/9DOz//p5uf//v7+/////////////v7+//Dx9v/T1+f/ycna/83H0P/Mxs3//P79//v9/f/z9/j/+/z8//z8/P/6+/v/+Pr5//X3+f/v8vj/vb7Y/+fr8f/4+/v/5Ojx/+7z+f/w9fn/7/T4//H0+//q7vP/9vr6//X4+f/t8fj/6/D3/+vv9v/O0+L/4+To/9LT4/+rqcD/PCUt/zEZHv9IKy//XUdI/2ZPT/9wWVT/Tzgv/7Svnv+zq5T/eF9P/0QgGP88GBT/QB8W/1E2J/99aE3/l3ta/3BOOf9cOCj/Yz4t/2pGNP9yVUP/fGRQ/3peS/+Remz/8/f2//r8/P+8u7v/+vn5//7+/v////////////7+/v/6+/z/z9Hj/8C90v/u7/D/sqm0//r9/f/8/v3/8/f4//z8/f/8/Pz//Pz8//r7+v/3+fr/9Pf4/8C/2P/t7vX/+Pv7/+bp8v/w9Pv/7/X5/+70+f/x9Pz/7fD1//X5+v/z9/j/6O72/+bu9f/m7fX/y8ze/7680/+4u9b/qKfB/zMeI/8oExT/Nxsd/004Of9tV1b/cVtX/5SJgP+3uKn/ubif/25VRv9GIhv/PhoT/4x7Z//GwqL/v7qS/19AMf85FhD/NxQP/zMSC/9GIxn/UC4k/4FhS/+BY1L/vrSw//n7+//w7+//wcHB//7+/v/////////////////+/v7//f39/+3s9P+zscf/+Pn7/7Wut//19fb//f7+//X3+f/8/f3//v7+//z8/P/8/Pv/+vr7//j5+v/HyN3/7/L1//f6+//p7PT/8vT7//L2+v/y9fn/8fb6/+/09//1+fr/8fb4/+Tq9f/g5vL/1dro/62pxf+rq8n/q6zI/6ikvf8yHiT/JA8R/0s0OP+GdXn/emVm/5+Ukv+xrqf/uLSn/7Gpl/9OMin/OBcT/4h1Yv/CwqH/xMGb/5+Pbv82FA7/NBIM/zoZEP8vDAn/ORgO/0snHP9jPC//hm1i//Pz8v/7/Pv/0NDQ/+Dg4P/9/v7//v7+/////////////v7+//39/f/8/P3/yMfY//Dz9//Mxsz/397j//39/v/3+fr/+/v8//7+/v/9/f3//Pz8//v7/P/5+/v/z9Dk/+/x9P/4+vr/7PD1//X4+//2+fr/9/n6//X4+f/2+vr/9fn7/+7z9//f5/H/yc/l/7G00v+HfJH/jYSZ/5GHnv9aS1z/LBYY/0kzOP9+bnj/jYOK/52Vl/+rp6n/sK2p/7Oto/9wXVH/OhkW/1Y9Nv+/vaL/wsCc/7q6jf+VgGP/QR4a/4NnS/+bgWH/NhUQ/zgWEP9RLSP/VDMr/87Gwf/4+/z/9vn4/7Kur//4+Pj//v7+//7+/v///////////////////////v7+//Dv9//a2+z/6+rt/8TCyv/7+/z/+fv7//v7+//+/v7//v7+//39/f/9/f3/+/z8/9nZ5v/u7fL/+Pr6//D09v/4+vv/+Pr7//j6+//3+fr/+Pv7//b6+//r8ff/3eXx/77D3v+urs7/YU1d/3NcbP+HeJH/dWBx/1MyPf9yWmb/gXF7/2ZQVv+LgIj/rKmw/6mlo/+Vg33/PR4b/0UmIv+knZH/v7+o/728nP+qn4D/UjEl/4JiT/+dgWD/rZVv/3JYRP91U0P/Sycf/4l1cf/1+fj/+vv7/+fk5P/GwML//P39//7+/v////////////////////////////7+/v/7/fv/29/r/+rt8v/Fv8z/+/r7//z8/P/7+/v//v7+//7+/v/9/f3//f39//v8/P/l5Ov/6ent//n6+f/z9vj/+vv7//v7+//6+vv/+fr6//n7+//3+fv/6/D4/9La6/+3utX/lIym/19FVP9nT13/bFZm/2lSXv9SNj//QiYv/1E5Qv9iUFj/hXmE/6eirP+moqP/VkFA/04vK/+NenT/v7yx/7u7qf+4tZv/lHpg/1IuJf9kRTT/d1pD/6KJaf+qlnX/oodq/4ltX//h3t7/+vv7//v8/P/U1tb/6uzt//z9/f/9/v7//////////////////////////////v///P78//X4+//W2OX/3Nzm/+jo7f/9/f3//Pz8//39/f/9/f3//f39//39/f/8/Pv/8PHz/+Hh6P/5+/r/9Pb4//v7+//9/f3//f39//z8/P/6+/v/+Pn7/+nu9//U2uv/mpep/2xXaf9gQlH/YkhW/3Zdbf91XGz/XEBM/1o/S/9iUmL/o5+0/6mjtf+noK//e2xx/y8TE/9RMS3/oJWV/7y4s/+5t6v/qZmG/3pZR/9UNCr/PBoY/1s5MP9vTT7/cFFB/3FXR/+8s6v/9/v6//z8/P/4+vr/y8zN//n6+//9/v7//v////////////////////////////////////7+/v/9/vz/7u/1/9Xa6P/X2eP/+/z7//r7/P/7/f3//v7+//39/f/8/Pz//P37//r7+v/i4uj/+Pn7//X2+v/6+vr//v7+//7+/v/9/f3/+vv8//n5+f/f5fD/1drq/4F4h/9lS1v/XUJQ/2dQXf99aHn/jXuN/4Buev9zXnD/i3uQ/4t5jv+HeYj/cmJs/0wxM/88HSD/TC0s/5qOlP+5tbj/srGn/49yZP9vT0H/Zks9/zwdGf93W0z/cE9D/1MzLP+GdnL/9fX1//r8/P/8/f3/5+nq/9nY2//9/f7////////////////////////////////////////////+/v7//f79//39/P/h5e//ycnf/+Hj6v/4+vv/+Pr7//7+/v/+/v7//f39//z9/P/7/Pv/6uvu//X4+v/29vv/+vr6//7+/v/+/v7//Pz8//r7+//3+fn/4OXy/9DV4f+HfI3/b1dn/1k7Sf+DcHz/jX2N/4R3hf9rXGr/hXmK/zQfJP96ZG7/gnN+/5WJlv9vWl7/YEhM/1U4OP+hlqD/tbO7/5yIgf+DZFz/ZEM+/4lwYf9TNSz/iGxc/2JCOP+Yh37/7uvq//z9/P/9/v7/+vz8/9DR1f/y8fP//v7+/////////////////////////////////////////////v7+//7+/v/+/v7/+/z9/9XW5/+sqMD/6Ons//L09f/+/v7///////7+/v/9/f3/+/z9//Lz9//v8vf/9vj6//r7+//+/v7//v7+//z8/P/7+/v/+fv8/+Ln8//V2+j/koqb/19GVf9GKzb/WkdQ/000QP9+dof/sbXQ/4qBlP9GLTb/f218/49+kP+OfYv/ZUpR/2dNUf9QNDb/d2ds/5uPj/+Fa2f/hWlk/2RFQf9+Zlz/lX5y/3BTTP99Y1//5eHf//v8/P/+/v7//f39/+zs7v/LzdD//P39//7+/v////////////////////////////////////////////////////////////7+/v/4+vv/v7zP/6qfsP/u7/L/+/v9//3+/v////////////7+/f/5+/v/7fD0//f5+v/8/Pz//v7+//7+/v/7+/v/+/z8//v9/f/s8ff/3OXy/7mxvv8/KS//NBwi/1dJUP+bl6f/v8Pc/5SKnP+VjJz/tbnL/2pZZv+clqz/qKK2/4l5hP9aQkv/WkNI/0csL/+Gbm7/ZUpK/41yb/+Hb2r/fWhh/4t0bf9yWlj/1M/N//39/f/9/f3//v7+//n4+P+3tb3/7u7y//39/f/+/v7////////////////////////////////////////////////////////////+/v7//v79//b29/+ro7P/t7TA//Dx9f/+/v7//v7+///////+/v7/+/39/+rt8v/29vr//f39//7+/v/+/v7//f39//z8/P/7/f3/8/j7/9rh7P9qVWP/Ry44/1Q9SP+1t8X/xcff/6qitf97b33/xcbe/6yqv/+clKb/c2Fx/8XJ2f+/w9X/h3qK/11ETP80HBz/QSop/zceIP9nT07/i3dz/497eP+Hdnb/w729//z9/P/+/v7//v7+//v7+//Lys7/0M/V//v7/P/9/Pz//v7+/////////////////////////////////////////////////////////////v7+//7+/v/+/v7/8PLz/6CUpf+zsML/+vv8//7+/v///////v7+//39/f/q6vD/7u73//z8/P/+/v7///////7+/v/7/Pz//P7+/+3x9//Z3er/ZExZ/1c9Sv+tp7P/xcvg/7y6zP9xX27/w8fX/7m81/+ZkqT/iXyN/29da/+Ujpr/v8HT/5yTp/9dSlT/OiEm/ycSEv8mDhD/OiIi/419gv+HeH7/uLGz//v7+//+/v7//v7+//39/f/m5ub/4eHi//z7/P/8/Pz//f39//7+/v////////////////////////////////////////////////////////////7+/v/+/v7//v7+//79/f/x7vD/mouZ/8O8xf/5/Pz//f3+//z+/v/9/f3/9vf5/+Hl7v/5+/v//f79//39/f/8/P3/+/v8//z9/v/m7PT/3eHu/3xtfP9dQU7/rqy3/9DX6f+vrL3/XFFa/8nS4/++v9r/loye/3toeP9hS1j/W0tV/4mBk/+WjKL/i3+N/zwjKf8tFhn/YUxR/045P/9HMjj/q6Sp//v7+//9/v7//P39//v7+//a2tr/9PT0//7+/v/+/v7//v7+//7+/v/+/v7////////////////////////////////////////////////////////////////////////////+/v7//v3+//Dw8v+Wi5f/ppyp/+3v8f/9/f3//f79//z8/P/r7vT/8fb5//f5+v/5+vr/9/n7//n7/P/5+fz/5Ovz/9/k8f+7u8r/Si46/2NRWf/L0+X/vL3X/1RJU//DxNj/sq/F/5eOn/9zZHP/e2+A/zIeIP9YRlH/koaa/5WLoP86JSr/KBIS/yYQEP9eTlL/opme//f3+P/+/v7//f7+//f5+f/g4OD/8PDw//39/f/+/v7///////////////////////////////////////////////////////////////////////////////////////////////////////7+/v/9/f3/9vX3/5+Unf9uYGz/wr3B//n6+v/6+/v/9vn5/+Tq7//t8fb/9vr7//X5+v/1+Pn/9Pf6/+bt9P/f5fD/y8vW/0EpM/9BJS//o5+s/8PK4v+BeIL/joiY/5CInf+qprj/qKW8/3xvhP84ISj/bllm/4BvgP+Zk6r/RzQ7/yIMDv8bBwj/hn1///j4+P/9/f3//f39/+vr6//e3t7/9fb4//j4+f/9/f3//v7+///////////////////////////////////////////////////////////////////////////////////////////////////////+/v7///////7+/v/7/Pz/2NPV/2JSV/9sX2P/wby9/+zr7f/Y2uL/29zl//f6+v/4+fv/9vj6//P2/P/o7fP/0tTg/6Gapf9AKDT/QSMw/1tJU/+6v8//l5Kg/0EyOv9/c4f/i4CX/5SLpP9RPUj/Qysy/3Faa/+JfY3/jIGW/0svOv8zHSH/g3l7//T29//9/fz/+fj5/97d3//a2tv/+vv7//f7+//5+/v//f39//7+/v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v7//v7+//z9/f/19PT/ta+y/1JESv9KMj3/cVpm/3prdf+hlZz/h3+C/4Z/gf9uY2f/UkJI/zwnLv81HCP/NBwj/zsgKf9ROET/YlRe/6ilsP80KC7/TjlF/3Rlef9cT1v/KRIa/2FNXf+GeZD/j4Wc/35se/9jTFv/n5We//X29v/9/v7/8O/x/9bS3f/o5+r//f39//39/f/9/v7//v7+//7+/v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v7//v7+//39/f/n5uv/qaCk/15NU/82ICj/LhQY/ycQEf8hDBL/JA8S/y4aHf9FMj7/SzlF/2lVZP9EKDP/Ri44/1E+RP9yZnH/Khwh/3pvgf+iobr/kYui/5mTsP+kn7v/oaK5/4Z6jP9vWGf/samx//j3+P/7/fz/4+Tn/93c4P/5+fv//f39//7+/v/+/v7//v7+/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v7+//7+/v/+/v7//P39/+3w8v/q5+z/2dbY/5OHjv9cTFX/TTdD/3Jea/+Id4b/gW+F/4t8k/+ThZ3/UDVB/1Q6R/81HSX/OSYx/0IsNv8+Ji7/a1tx/5yUsf+Vj6n/npm0/5uSp/91aHX/x8DF//v7/P/39/j/4+Ln/+zt7//9/fz//v79//7+/v/+/v7//v7+/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v7+//7+/v/9/f3/8fDy/9nY3f/x8fL/9ff3/+Xi5P+7s7//koWY/31sfv97ZXr/loul/5aNq/+Pgpv/c2V2/25ba/9uW2z/aVVj/2RSYv9sW23/h3qR/5+Xsv+knKn/6OXo//j3+f/s6+3/6+rs//r6+v/+/v7///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/v/+/v7//v7+//39/f/39/j/ysbR/8G9x//k3+X/7uvv/+3s8P/l4un/ysPP/7Gotf+mn7f/m5ev/6KasP+Zj6P/kYeZ/5KKmP+sp7f/wLrL/9bR3P/l5er/6uvs/+Tk5P/o6Oj/+Pj4//39/f/+/v7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v7//v7+//7+/v/+/v7//v79//z8/f/Y1dv/qJ+t/5+Xo/+elKH/ppuo/6mhqv+4srr/wr7D/8zLzf/d2t3/3Nvd/9bV1v/X1dj/4d/g/+Hf4P/b2Nr/3tzd/+vq6//4+Pj/+/v7//7+/v/+/v7//v7+/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v7+//7+/v/+/v7//v79//z8/f/6/Pz/+vv8//n6+//6+Pr/9vP1/+ro6v/l5eX/5+fn/+jo6P/m5ef/6Ofp//Py9P/49/j//Pz8//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/v/+/v7//f/+//7+/v/+/v7//v7+//7+/v/+/v7//f7+//3+/v/+/////v////3+/v/9/v7//f7+//7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v7+//7+/v/+/v7//v7+//7+/v/+/v7////////////+/v7//v7+////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
}()

//加载图片
!function () {
    var headportrait = lt_code.newDom("script", {
        src: lt_code.variable.currentDir + "images/headPortrait.js",
    });
    lt_code.addChild(headportrait, lt_code.getAll("head"));
}();
