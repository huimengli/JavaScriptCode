/**
 * @file 帮助文档
 * @author 楼听[修改日期:2018年4月13日]
 * @version demo-11
 * 不再继续使用动作css作为辅助代码
 */

//向head里面丢一个特殊的style样式框
document.head.innerHTML += "<style id=\"lt_code_css\"></style>";

/**
 * 自制的代码
 */
class lt_code { };






/**
 * lt_code中创建的变量 
 */
lt_code.variable = {};

/**用来记录是否登录的参数 */
lt_code.variable.online = false;

/**随机值 */
lt_code.variable.random = () => {
    return Math.random();
};

/**
 * 随机颜色
 * @param {number} max 颜色的最大值
 * @param {number} min 颜色的最小值
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
    } else if (!min&&max) {
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
lt_code.variable.roundRgba = (max, min,alpha) => {
    var chat = 255;
    var r, g, b,a, return_value;
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
    } else if (min && !max&&!alpha) {
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
    } else if (!min && max&&!alpha) {
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
    } else if(min&&max&&!alpha){
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
    } else if (!min&&!max&&alpha) {
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
    lt_code.getAll().style.overflow === "hidden" ? clearInterval(lt_code.top_run) : lt_code.top_run;
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
                for (var i = 0; i < lt_code.variable.runer.length; i++) {
                    clearInterval(lt_code.variable.runer[i]);
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
                console.log("getChinese函数暂时不支持该写法");
                
                return "";
            }
        default:
            console.log("getChinese函数参数输入错误!");
            
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
    var falseRet =  ()=> {
        console.log("getId函数没有输入值!");
        //console.log(this);
        //console.log(arguments.callee.caller.name);
    };
    return !document.getElementById(idName) ?falseRet() : document.getElementById(idName);
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
                    console.log("getAll函数读取id不需要输入few参数");
                    
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
                    console.log("getAll函数读取id不需要输入few参数");
                    
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
                    console.log("getAll函数读取id不需要输入few参数");
                    
                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read, few, dom_father);
                }
            }
        }
    } else {
        return_value = document.head;
    }

    if (return_value === null) {
        console.log("getAll函数name参数输入错误!");
        
    } else if (return_value === undefined) {
        console.log("本页面中没有找到此对象");
        
    } else if (return_value.length === 0) {
        console.log("没有此对象|此页面中没有使用此对象");
        
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
                    console.log("js不支持读取父类对象的子类id");
                    
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
                    console.log("getAll2函数读取id不需要输入few参数");
                    
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
                    console.log("getAll2函数读取id不需要输入few参数");
                    
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
        console.log("getAll2函数name参数输入错误!");
        
    } else if (return_value === undefined) {
        console.log("本页面中没有找到此对象");
        
    } else if (return_value.length === 0) {
        console.log("没有此对象|此页面中没有使用此对象");
        
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
                            console.log("getAll函数读取id不需要输入few参数");
                            
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
                            console.log("getAll函数读取id不需要输入few参数");
                            
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
                            console.log("getAll函数读取id不需要输入few参数");
                            
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
            if (arguments.length ===1) {
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
                    //console.log(exec_value[4]);
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
                    //console.log(exec_value);
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
                if (exec_value[3]===":"||exec_value[3]==="::") {
                    return_value = document.defaultView.getComputedStyle(
                        lt_code.getAll3(exec_value[4], few, dom_father)
                    );
                }
            }
            if (arguments.length === 4) {
                //console.log(dom_father);
                if (dom_father.item) {
                    dom_father = dom_father[0];
                }
                //获取子类
                if (exec_value[3] === ">") {
                    return_value = lt_code.getAll3(exec_value[4], few,
                        lt_code.getAll3(exec_value[0]+exec_value[1],0,dom_father)
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
                if (exec_value[3]===":"||exec_value[3]==="::") {
                    return_value = document.defaultView.getComputedStyle(
                        lt_code.getAll3(exec_value[4], few, dom_father)
                    );
                }
            }
            if(arguments.length>4){
                console.log("getAll3选择子类函数暂时不支持其他参数");
                
            }
        }
    }

    if (return_value === null) {
        console.log("getAll函数name参数输入错误!");
        
    } else if (return_value === undefined) {
        console.log("本页面中没有找到此对象");
        
    } else if (return_value.length === 0) {
        console.log("没有此对象|此页面中没有使用此对象");
        
    } else if (return_value.length === 1) {
        return_value = return_value[0];
    }

    return return_value;
};

/**
 * 读取iframe内包含的window值(用于传值)
 * @param {string} idName iframe框的id
 * @return {Window} 返回一个window(大概)
 */
lt_code.getIframeWindow = function (idName) {
    return lt_code.getId(idName).contentWindow;
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
        console.log("读取对象非iframe内联边框|没能读取到对象");
        
        return;
    }
    return lt_code.getAll2(name, inner_value);
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
        console.log("color_change函数输入的颜色值不正确!");
        
    } else if (color_exec[0] === "#") {
        return_value = color.replace(/\#/, "");
        if (return_value.length === 3) {
            return_value = "rgb(" + (lt_code.form16To10(return_value[0]) * 16 +
                lt_code.form16To10(return_value[0])) + "," +
                (lt_code.form16To10(return_value[1]) * 16 +
                    lt_code.form16To10(return_value[1])) + "," +
                (lt_code.form16To10(return_value[2]) * 16 +
                    lt_code.form16To10(return_value[2])) + ")";
        } else if (return_value.length === 6) {
            return_value = "rgb(" + (lt_code.form16To10(return_value[0]) * 16 +
                lt_code.form16To10(return_value[1])) + "," +
                (lt_code.form16To10(return_value[2]) * 16 +
                    lt_code.form16To10(return_value[3])) + "," +
                (lt_code.form16To10(return_value[4]) * 16 +
                    lt_code.form16To10(return_value[5])) + ")";
        } else {
            console.log("color_change函数#类颜色值输入位数不正确!");
            
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
                    return_values[i] = lt_code.form10To16(return_values[i]);
                } else {
                    console.log("color_change函数rgb输入的第" + i + "个数值有误!");
                    
                    return_values[i] = "00";
                }
            }
            for (var i = 1; i < return_values.length; i++) {
                return_values[i] = return_values[i].length === 1 ? "0" + return_values[i] : return_values[i];
            }
            return_value = return_values[0] + return_values[1] +
                return_values[2] + return_values[3];
        } else {
            console.log("color_change函数,rgb()类颜色值输入错误");
            
            return_value = null;
        }
    } else if (color_exec[0] === "rgba") {
        return_value = /(\d+)\,(\d+)\,(\d+)\,(\d\.\d+|\d)/.exec(color);
        if (lt_code.getNum(return_value[4]) > 1) {
            console.log("color_change函数rgba()类颜色输入alpha参数有误");
            
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
                        return_values[i] = lt_code.form10To16(return_values[i]);
                    } else {
                        console.log("color_change函数rgb输入的第" + i + "个数值有误!");
                        
                        return_values[i] = "00";
                    }
                }
                for (var i = 1; i < return_values.length; i++) {
                    return_values[i] = return_values[i].length === 1 ? "0" + return_values[i] : return_values[i];
                }
                return_value = return_values[0] + return_values[1] +
                    return_values[2] + return_values[3];
            } else {
                console.log("color_change函数,rgba()类颜色值输入值错误");
                
                return_value = null;
            }
        }
    }

    return return_value;
};

/**
 * 10进制转换为16进制
 * @param {number|string} num 输入的十进制的数值
 * @returns {string} 返回的十六进制的数值
 */
lt_code.form10To16 = function (num) {
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
lt_code.form16To10 = function (num) {
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
        case 2:
            dom.style.transitionDuration = timer + "s";
            dom.style.opacity = "0";
            setTimeout(function () {
                dom.style.webkitAnimation = "";
            }, timer * 950);
            break;
        case 3:
            if (typeof (ISwate) !== "boolean") {
                console.log("disappear函数ISwate参数输入参数出错!");
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
                console.log("disppear函数输入错误!");
            } else {
                console.log("disppear函数没有输入值!");
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
                return parseInt(/-?[\d]+\.?[\d]{0,}/.exec(text));//可以读取小数
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
            default: console.log("changeHeight函数输入的参数有误!");
        }
    } else {
        console.log("特殊style空间不存在");
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
        default: console.log("changeHeight函数输入的参数有误!");
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
        default: console.log("changeWidth函数输入的参数有误!");
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
        console.log("changeWidth3警告:变动的百分比大于100%");
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
        default: console.log("changeWidth函数输入的参数有误!");
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
    if (!dom) {
        console.log("moveBoxTo2函数报错:移动对象不存在!");
        return;
    } else if (dom.style.position === "static") {
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
            console.log("moveBoxTo2函数参数输入出错!");
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
 * @param {boolean} ISdisappear 是否让物件完全消失(不输入默认否)
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
 * 让部件能够在鼠标经过时旋转角度的函数(未完成)
 * @param {HTMLElement} dom 要被旋转的部件(只允许传入有id的)
 * @param {number} trunDeg 旋转角
 * @param {number} type 旋转样式(1:转x轴;2:转y轴;3转z轴;默认转y轴)
 */
lt_code.make3DImgTrun = function (dom, trunDeg, type) {
    if (dom.id.length === 0) {
        console.log("make3DImgTrun函数没有找到对象的id");
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
                    console.log("make3DImgTrun函数type参数输入错误!");
                }
                break;
            default:
                console.log("make3DImgTrun函数输入参数出错!");
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
                //console.log(dom_child);
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
                //console.log(dom_child);
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
                        console.log("make3DTrun_inner函数type参数输入错误!");
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
                    console.log("make3DTrun_inner函数type参数输入错误!");
                }
            }
            break;
        case 5:
            if (dom.length && dom.length > 1 && dom.innerHTML !== "") {
                //console.log(dom_child);
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
                        console.log("make3DTrun_inner函数type参数输入错误!");
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
                    console.log("make3DTrun_inner函数type参数输入错误!");
                }
            }
            break;
        default:
            console.log("make3DTrun_inner函数参数输入错误!");

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
        console.log("innerClock函数对象不存在!");
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

        //console.log("+"+nextSeconds);

        //获得之前的秒数的参数
        var curSeconds = getSeconds(NOWDATE);

        var curHour = parseInt(curSeconds / 3600);
        var curMinutes = parseInt((curSeconds % 3600) / 60);
        curSeconds = curSeconds % 60;

        //console.log(nextSeconds-curSeconds);
        //console.log(nextHour-curHour);

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

            //console.log(i);
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
        //console.log(effective);
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
        //console.log(time_now + "" + time_end);
        var seconds;
        seconds = time_end.getTime() - time_now.getTime();
        seconds = Math.round(seconds / 1000);
        //console.log(seconds);
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
        console.log("input转为span函数输入参数出错!");
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
    console.log(lt_basic);
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
                                console.log(lt_basic_neirong[i]);
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
                        //console.log(lt_basic_neirong[i]);
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
                lt_span[0] ? lt_for_basic[i].removeChild(lt_span[0]) : console.log("lt_span[" + i + "]不存在");
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
 * 移动页面到某个坐标的代码
 * @param {number} y 目标纵坐标
 * @param {number} duration 时间*/
lt_code.scrollTo = function (y, duration) {
    duration = duration * 1000;
    var scrollTop = lt_code.variable.scrollTop;/*页面当前滚动距离*/
    //console.log(scrollTop);
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
        if (now_scroll<=0) {
            clearInterval(lt_code.scrollTop.run);
            //console.log("回到顶部");
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
 * 简单的获得json字符串的函数
 * @param {string} str 输入字符串
 */
lt_code.getJson = function (str) {
    return /(\{.*\})/.exec(str)[1];
}





/**和网页无关的计算性函数 */
lt_code.math = {};

/**
 * 计算线性方程的函数
 * @param {string|string[]} funs 输入的方程式
 * @returns {string|string[]} 返回的值
 */
lt_code.math.lineFunc = function (funs) {
    /**总函数返回值 */
    var retrun_val = null;
    /**读取函数计算式的正则 */
    var read_funs = /([\d]*[xyz]*)([\+\-\*\/])([\d]*[xyz]*)\=([\d]*[xyz]*)/;

    /**读取xyz变量的正则 */
    var read_xyz = /[xyz]/;

    if (!Array.isArray(funs)) {
        /**读取函数数组 */
        var func = read_funs.exec(funs);
        console.log(func);
        /**函数的第一项 */
        var a1 = func[1];
        /**函数的计算符号 */
        var jisuan = func[2];
        /**函数的第二项 */
        var a2 = func[3];
        /**函数的第三项 */
        var a3 = func[4];

        /**未知数1 */
        var a1_var = read_xyz_fun(a1);
        /**未知数2 */
        var a2_var = read_xyz_fun(a2);
        /**未知数3 */
        var a3_var = read_xyz_fun(a3);

        //检查是否只有一个未知数
        if (!chack_three_var(a1_var, a2_var, a3_var)) {
            retrun_val = "";
        } else {
            retrun_val = "";
        }
    }



    /**
     * 读取xyz变量的函数
     * @param {string} str 函数的某一项
     * @returns {null|string} 返回值
     */
    var read_xyz_fun = function (str) {
        var return_value = read_xyz.exec(str);
        if (!return_value) {
            return null;
        } else {
            return return_value[0];
        }
    };

    /**
     * 检查项是否相同或者为null
     * @param {string} x 第一项
     * @param {string} y 第二项
     * @param {string} z 第三项
     * @return {boolean} 返回值
     */
    var chack_three_var = function (x, y, z) {
        /**返回值 */
        var retrun_value;

        //第一种情况,全都不为null
        if (x && y && z) {
            if (z !== x || z !== y || y !== x) {
                retrun_value = false;
            } else {
                retrun_value = true;
            }
        }

        //第二种情况
        //(最后那个为null)
        if (x && y && !z) {
            if (x !== y) {
                retrun_value = true;
            } else {
                retrun_value = false;
            }
        }
        //(中间那个为null)
        if (x && !y && z) {
            if (x !== z) {
                retrun_value = false;
            } else {
                retrun_value = true;
            }
        }
        //(第一个为null)
        if (!x && y && z) {
            if (y !== z) {
                retrun_value = false;
            } else {
                retrun_value = true;
            }
        }

        //第三种情况
        if ((!x && !y && z) || (!x && y && !z) || (x && !y && !z)) {
            retrun_value = true;
        }

        return retrun_value;
    };

    //返回返回值
    return retrun_val;
};


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
lt_code.test.fullpage = function (backgrounds, times, dom_father,chackType, useDaohang, types, pageName) {
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
            //console.log(lt_all_pages);

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
            //console.log("调用了" + dom + " " + num);
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
            if (lt_code.getNum(pages[0].style.height)!==height||lt_code.getNum(pages[0].style.width)!==width) {
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

            //setInterval(function () { console.log(canUseChange); }, 20);

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
        console.log(base64);
    };
};

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
        console.log("lunbo函数参数输入出错");
        return;
    } else if (!(/\./.exec(className))) {
        console.log("lunbo函数className参数输入错误!请使用css方式输入!");
        return;
    }

    /**存放所有的轮播项 */
    var all_lunbo = lt_code.getAll(className);

    //纠错判断
    if (!all_lunbo.length) {
        console.log("lunbo函数className参数输入出错!");
        return;
    } else if (dom_father.length && !dom_father) {
        console.log("lunbo函数dom_father参数输入错误!");
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
        //console.log(all_lunbo);
        setTimeout(function () {
            //console.log(move_box);
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
        //console.log(all_lunbo);
        setTimeout(function () {
            //console.log(move_box);
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
                console.log("lunbo.moveTo函数way参数输入错误!");
            }
        } else {
            if (way === "left") {
                trun_left(num);
            } else if (way === "right") {
                trun_right(num);
            } else {
                console.log("lunbo.moveTo函数way参数输入错误!");
            }
        }
    };

    /**重置all_lunbo参数的函数 */
    var update_lunbo = function () {
        all_lunbo = lt_code.getAll(className);
        each_width = lt_code.test.lunbo.each_width || all_lunbo[0].offsetWidth;
        each_height = lt_code.test.lunbo.each_height || all_lunbo[0].offsetHeight;
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
            console.log("lunbo模块中的moveToPage函数参数输入超出上限/下限!");
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
            //console.log(return_num());
            return return_num() === 4 ? 0 : return_num();
        };


        //进行移动
        moves(chacks());
    };
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
        console.log("middleBiger函数参数输入错误!");
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

            //console.log(obj); 
            //console.log(file);
            console.log("图片大小为: " + file.size+" byte");  //file.size 单位为byte

            if (file.size > 5242880) {
                console.log("图片过大!");
                return;
            }

            var reader = new FileReader();
            
            //读取文件过程方法
            reader.onloadstart = function (e) {
                console.log("开始读取....");
            };
            reader.onprogress = function (e) {
                console.log("正在读取中....");
            };
            reader.onabort = function (e) {
                console.log("中断读取....");
            };
            reader.onerror = function (e) {
                console.log("读取异常....");
            };
            reader.onload = function (e) {
                console.log("成功读取....");
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
        //console.log(change_delta);
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
        //console.log("开始裁切");
        clear_2();

        var else_img = document.createElement("img");
        else_img.style.opacity = 0;
        else_img.id = "else_img";
        else_img.src = img_data;
        lt_code.getAll().appendChild(else_img);
        //console.log(lt_code.getAll("#else_img"));
        var img_width = lt_code.getAll("#else_img").offsetWidth;
        img_width = img_width / 170;
        var img_height = lt_code.getAll("#else_img").offsetHeight;
        img_height = img_height / 170;
        lt_code.getAll().removeChild(lt_code.getAll("#else_img"));

        ctx2.drawImage(img,
            chack_box.offsetLeft*img_width,
            chack_box.offsetTop*img_height,
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
            10:img_height
        };
        
        //console.log(a);

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
    var blob = new Blob([lt_code.test.dataURLtoFile(data, fileName)], { type: /data\:(image\/[\w]+)\;base64/.exec(data)[1   ] });
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
    lt_code.test.on._time = "_"+Date.now();
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
    console.log(doms);
    eval("var " + lt_code.test.on._time + " = lt_code.test.on._doms;");
    lt_code.test.on._doms = null;
    for (var i = 0; i < doms.length; i++) {
        eval(lt_code.test.on._time+"[" + i + "]." + e + " = " + fuc);
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
 * 获取变量值为value值的变量变量名
 * @param {object} value 变量值
 * @return {string} 变量名
 */
lt_code.getNameOfValue = function (value) {
    for (var k in window) {
        if (window[k] == 1) {
            return k.toString();
        }
    }
}

/**重写用于控制台读取内容用的函数
 * 例如:
 * lt_code.innerConsole = function (str) {
 *     eval("console.log(" + str + ")");
 * };
 */
lt_code.innerConsole = null;

