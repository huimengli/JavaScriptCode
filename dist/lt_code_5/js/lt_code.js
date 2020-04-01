/**
 * @file 帮助文档
 * @author 楼听[修改日期:2018年8月24日]
 * @version demo-5
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

/**用来记录是否登录的参数 */
lt_code.variable.online = false;

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

//实时刷新参数
setInterval(function () {
    lt_code.variable.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
}, 50);

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





/**恶搞性质的代码 */
lt_code.zBadCode = {};

/**改变所有的图片 */
lt_code.zBadCode.changeAllImg = function () {
    var all_img = lt_code.getTage("img");
    for (var i = 0; i < all_img.length; i++) {
        all_img[i].setAttribute("src", lt_code.variable.images.headPortrait[0]);
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
    return !document.getElementById(idName) ? console.log("getId函数没有输入值!") : document.getElementById(idName);
};

/**
 * 读取class所代表的dom(重载+4)
 * @param {string} className 输入class的名字 
 * @param {number} few 输入要读取的class里面的第几个
 * @param {HTMLElement} dom_father 要读取的父类代号
 * @param {boolean} useFew 是否使用few参数(默认使用)
 * @return {HTMLElement|HTMLElement[]} dom|doms
 */
lt_code.getClass = function (className, few,dom_father,useFew) {
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
    } else if (return_value.length===0) {
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
            return_value = lt_code.getTage(name,dom_father);
        } else {
            if (exec_value[0] === "#.") {
                return_value = null;
            } else {
                value_read = name.replace(/\#?\.?/, "");
                if (exec_value[0] === "#") {
                    return_value = lt_code.getId(value_read);
                    console.log("getAll2函数读取id不需要输入few参数");
                } else if (exec_value[0] === ".") {
                    return_value = lt_code.getClass(value_read,null,dom_father,false);
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
    } else if (return_value.length===0) {
        console.log("没有此对象|此页面中没有使用此对象");
    } else if (return_value.length === 1) {
        return_value = return_value[0];
    } 

    return return_value;
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
                for (var i = 1; i < return_value.length-1; i++) {
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
    if (typeof(num)==="string") {
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
    return  parseInt(num,16);
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
            }, timer * 950);
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
        case 3: dom.style.transitionDuration = timer+"s";
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
    if (!dom) {
        console.log("moveBoxTo2函数报错:移动对象不存在!");
        return;
    }else if (dom.style.position === "static") {
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
            dom.style.top = toH + "px";
            setTimeout(function () {
                dom.style.transitionDuration = "";
            }, 1000);
            break;
        case 4:
            var toW = changeWidth;
            var toH = changeHeight;

            dom.style.transitionDuration = time + "s";
            dom.style.left = toW + "px";
            dom.style.top = toH + "px";
            setTimeout(function () {
                dom.style.transitionDuration = "";
            }, time*1000);
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
 * 制作一个三维旋转的框(重载+3)
 * @param {HTMLElement} dom 要进行三维旋转的对象
 * @param {number} changeSize 转角比例(百分比,不输入默认为10%)
 * @param {number} maxChange 最大旋转角(默认为6,输入最大值为12)
 * @param {number} doms 这是第几个三维旋转的框(不输入默认只有一个)
 */
lt_code.make3DBox = function (dom, changeSize, maxChange,doms) {
    if (dom) {
        /**储存旋转框内容的变量 */
        var dom_mean = dom.outerHTML;

        if (doms!==0) {
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
 * 旋转内部的物件(未完成)
 * @param {HTMLElement|HTMLCollection} dom 要被旋转的部件的父类
 * @param {number} trunDeg 旋转角
 * @param {string} child_name 子类的名称(类似getAll)
 * @param {number} type 旋转样式(1:转x轴;2:转y轴;3转z轴;默认转z轴)
 * @param {number} times 动画时间
 */
lt_code.make3DTrun_inner = function (dom, trunDeg,child_name, type,times) {
    /**存放子类的变量 */
    var dom_child = new Array();
    switch (arguments.length) {
        case 3:
            if (dom.length && dom.length > 1 && dom.innerHTML !== "") {
                //console.log(dom_child);
                for (var i = 0; i < dom.length; i++) {
                    dom[i].style.transformStyle = "preserve-3d";
                    dom[i].style.perspective = "1200px";
                    dom_child[i] = lt_code.getAll2(child_name,dom[i]);
                    //如果获取的是数组,则读取第一个
                    if (dom_child[i].length) {
                        dom_child[i] = dom_child[i][0];
                    }
                    dom_child[i].style.transform = !dom_child[i].style.transform ? "rotateZ(0deg)" : dom_child[i].style.transform;
                    dom_child[i].style.transitionDuration = "1s";
                    dom_child[i].style.transform = "rotateZ(" + trunDeg + "deg)";
                }
            } else {
                console.log("make3DTrun_inner函数暂时没有完成");
            }
            break;
        default:
            console.log("make3DTrun_inner函数暂时没有完成");

    }
};

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






/**用来存放图片的参数空间 */
lt_code.variable.images = {};

/**我本人最喜欢的头像(base64) */
lt_code.variable.images.headPortrait = new Array();

lt_code.variable.images.headPortrait[0] = "data:image/jpg;base64,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";

lt_code.variable.images.headPortrait[1] = "data:image/jpg;base64,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";







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

//废弃的图片代码(浪费资源)
!function () {
    ///**比较好看的背景图 */
    //lt_code.variable.images.backgroundImage = new Array();

    //document.head.innerHTML += "<script src='lt_code/js/img1.js'></script>";
}