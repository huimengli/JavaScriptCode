/**
 * @file 帮助文档
 * @author 楼听[修改日期:2018年8月24日]
 * @version demo-6
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

/**回到顶部的函数 */
lt_code.scrollToTop = (function smoothscroll() {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
});







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
 * 实验性fullpage(分页外面不能包裹任何内容)
 * 请用lt_for_page为分割页面的class名
 * 提供了:
 * 1.change_page函数来改变当前页面
 * 2.canUseMouseWheel接口(能否使用滚轮)
 * 3.now_page接口(当前为第几页)
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
//以上是fullpage定义给外部的接口

/**
 * 尝试把图片储存为base64
 * @param {string} imgUrl 图片路径
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
 * @param {string} className 存放每项轮播内容的类名(".xxx")
 * @param {HTMLElement} dom_father 类存放的框架的对象
 */
lt_code.test.lunbo = function (className, dom_father) {
    /**用于轮询的变量 */
    var i = 0;

    if (arguments.length !== 2) {
        console.log("lunbo函数参数输入出错");
        return;
    } else if (!(/\./.exec(className))) {
        console.log("lunbo函数className参数输入错误!请使用css方式输入!");
        return;
    }

    /**存放所有的轮播项 */
    var all_lunbo = lt_code.getAll(className);
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
    dom_father.innerHTML += "<div id=\"test_lunbo\"></div>";

    /**用于移动的框*/
    var move_box = lt_code.getAll("#test_lunbo");

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
            if (IsLeft && !lt_code.test.lunbo.direction||lt_code.test.lunbo.direction&&IsTop) {
                move_box.removeChild(all_lunbo[0]);
                move_box.innerHTML += each_lunbo[num];
            } else if (!IsLeft && !lt_code.test.lunbo.direction || lt_code.test.lunbo.direction && !IsTop) {
                move_box.removeChild(all_lunbo[lunbo_cont-1]);
                move_box.innerHTML = each_lunbo[num] + move_box.innerHTML;
            }
            update_lunbo();
            //move_box框更新
            if (lt_code.test.lunbo.direction) {
                move_box.style.top = -each_height+"px";
            } else {
                move_box.style.left = -each_width+"px";
            }
        }, timer*1000);
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
            mover();
            if (num<0) {
                clearInterval(run);
            }
        }, timer * 1000 + 20);
    };

    /**向右移动几次的函数
     * @param {number} num 移动几次
     * */
    var trun_right = function (num) {
        IsLeft = false;
        var run = setInterval(function () {
            num = num - 1;
            mover();
            if (num < 0) {
                clearInterval(run);
            }
        }, timer * 1000 + 20);
    };

    /**向左移动几次的函数
     * @param {number} num 移动几次
     * */
    var trun_top = function (num) {
        IsTop = true;
        var run = setInterval(function () {
            num = num - 1;
            mover();
            if (num < 0) {
                clearInterval(run);
            }
        }, timer * 1000 + 20);
    };

    /**向右移动几次的函数
     * @param {number} num 移动几次
     * */
    var trun_bottom = function (num) {
        IsTop = false;
        var run = setInterval(function () {
            num = num - 1;
            mover();
            if (num < 0) {
                clearInterval(run);
            }
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
    };

    //重新读取all_lunbo
    update_lunbo();

    //检查轮播等待时间(是否比动画时间短)
    lt_code.test.lunbo.waitTime = lt_code.test.lunbo.waitTime < lt_code.test.lunbo.timer ? lt_code.test.lunbo.test : lt_code.test.lunbo.waitTime;

    //轮播挂载
    lt_code.test.lunbo.run = setInterval(function () {
        if (!mouseOn) {
            mover();
            console.log(each_lunbo);
        }
    }, lt_code.test.lunbo.waitTime * 1000 + 50);

    //使用鼠标停留
    if (lt_code.test.lunbo.useOnMouseStop) {
        dom_father.onmouseover = function () {
            mouseOn = true;
        };
        dom_father.onmouseout = function () {
            mouseOn = false;
        };
    }

    // if (lt_code.test.lunbo.useMouseWheel){
    //     dom_father.onmousewheel = function (e) {
    //         e = e|| window.event;
    //
    //         if (e.wheelDelta && canUseChange && lt_code.test.fullpage.canUseMouseWheel) {
    //             if (lt_code.getNum(e.wheelDelta, 4) > 0) {
    //                 if(lt_code.test.lunbo.direction){
    //                     if (IsTop){
    //                         trun_top();
    //                     }else{
    //                         trun_bottom();
    //                     }
    //                 }else{
    //                     if (IsLeft){
    //                         trun_left();
    //                     } else{
    //                         trun_bottom();
    //                     }
    //                 }
    //             } else {
    //                 if(lt_code.test.lunbo.direction){
    //                     if{
    //                         trun
    //                     }
    //                 }
    //             }
    //             canUseChange = false;
    //             //重置canUseChange参数
    //             change_canUseChange();
    //         }
    //     };
    // }
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

/**是否使用鼠标滚轮*/
lt_code.test.lunbo.useMouseWheel = false;
//以上是lt_code.test.lunbo的接口




/**用来存放图片的参数空间 */
lt_code.variable.images = {};

/**我本人最喜欢的头像(base64) */
lt_code.variable.images.headPortrait = new Array();

lt_code.variable.images.headPortrait[0] = "data:image/jpg;base64,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";

lt_code.variable.images.headPortrait[1] = "data:image/jpg;base64,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";

lt_code.variable.images.headPortrait[2] = "data:image/png;base64,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";






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
};