/**
 * 工具类
 * @author huimengli[2024年9月9日]
 */
var lt_code = {

  /**
   * 转为URL数据
   * @param {{}} dict 
   */
  toUrlData: function (dict) {
    var urlData = "";
    if (typeof (dict) == "object") {
      var index = 0;
      for (const key in dict) {
        if (index < 1) {
          urlData += `?${key}=${dict[key]}`;
        } else {
          urlData += `&${key}=${dict[key]}`;
        }

        //指针增加
        index++;
      }
    }
    return urlData;
  },

  /**
   * 10进制转换为2进制
   * @param {number} num 输入的十进制的数值
   */
  from10To2: function (num) {
    return num.toString(2);
  },

  /**
  * 二进制转换为十进制
  * @param {number} num
  */
  from2To10: function (num) {
    return parseInt(num, 2);
  },

  /**
  * 10进制转换为16进制
  * @param {number|string} num 输入的十进制的数值
  * @returns {string} 返回的十六进制的数值
  */
  from10To16: function (num) {
    if (typeof (num) === "string") {
        num = lt_code.getNum(num, 4);
    }
    return num.toString(16);
  },

  /**
  * 16进制转换为10进制
  * @param {string} num 输入的十进制的数值
  * @returns {number} 返回的十六进制的数值
  */
  from16To10: function (num) {
    return parseInt(num, 16);
  },

  /**
   * 返回二进制补码中的1位数
   * 指定的{@code int}值的表示。此功能是
   * 有时也称为<i>汉明计数</i>。
   * @param i 要对其位进行计数的值
   * @returns 二进制补码中的1位数
   * 指定的{@code int}值的表示。
   */
  bitCount(i){
    i = i - ((i >>> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
    i = (i + (i >>> 4)) & 0x0f0f0f0f;
    i = i + (i >>> 8);
    i = i + (i >>> 16);
    return i & 0x3f;
  },

  /**
   * 统计字节数组的汉明权重
   * <li>统计字节数组中1的个数</li>
   * @param {Array<number>} byteArray
   * @return
   */
  getHammingWeight(byteArray) {
    var count = 0;
    for (let b of byteArray) {
      // 将byte转换为无符号整数，并计算其汉明权重
      count += lt_code.bitCount(b & 0xFF);
    }
    return count;
  },

  /**
   * 变量模块
   */
  variable: {
    /**
     * 格式化年月日
     * @param date
     * @param fmt
     * @returns
     */
    formatDate: function (date, fmt) {
      return function (fmt) {
        let o = {
          'M+': this.getMonth() + 1, //月份
          'd+': this.getDate(), //日
          'h+': this.getHours(), //小时
          'm+': this.getMinutes(), //分
          's+': this.getSeconds(), //秒
          'q+': Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds(), //毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length),
          );
        }
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ('00' + o[k]).substr(('' + o[k]).length),
            );
          }
        }
        return fmt;
      }.bind(date)(fmt);
    },

    /**
     * 将输入的内容转为array
     * @param {any} input 输入
     */
    toArray: function (input) {
      return Array.prototype.slice.call(input);
    },

    /**
     * 将输入的内容转为反向array
     * @param {any} input 输入
     */
    toBackArray: function (input) {
      if (!Array.isArray(input)) {
        input = lt_code.variable.toArray(input);
      }
      var ret = [];
      for (var i = input.length - 1; i >= 0; i--) {
        ret.push(input[i]);
      }
      return ret;
    },

    /**
     * 补位
     * @param {number} input 输入
     * @param {number} num 补位长度
     * @param {string} complementValue 补位内容
     */
    complement: function (input, num, complementValue = "0") {
      const value = input.toString();
      if (value.length==num) {
        return value;
      }
      var temp = lt_code.variable.toBackArray(value);
      for (var i = 1; i <= num; i++) {
        if (i > temp.length) {
          temp.push(complementValue);
        }
      }
      input = lt_code.variable.toBackArray(temp);
      var ret = "";
      for (var i = 0; i < input.length; i++) {
        ret += input[i];
      }
      return ret;
    },
  },

  /**
   * 追加方法模块
   */
  addMethod: {
    /**
     * 向模块中添加方法
     */
    AddMethod: function () {
      //不重复添加
      if (!Array.prototype.add) {
        /**
         * 添加不重复的对象
         * @param {...any} item
         */
        Object.defineProperty(Array.prototype, "add", {
          value: function (...item) {
            for (var i = 0; i < item.length; i++) {
              if (this.indexOf(item[i]) >= 0) {
                continue;
              } else {
                this[this.length] = item[i];
              }
            }
            return this.length;
          },
          enumerable: false
        });
      }

      //删除对象,直接修改当前列表
      if (!Array.prototype.del) {
        /**
         * 删除对象
         * @param {...any} item
         */
        //Array.prototype.del = function (...item) {
        //    for (var i = 0; i < item.length; i++) {
        //        var index = this.indexOf(item[i]);
        //        if (index >= 0) {
        //            this.splice(index, 1);
        //        } else {
        //            continue;
        //        }
        //    }
        //};
        Object.defineProperty(Array.prototype, "del", {
          value: function (...item) {
              for (var i = 0; i < item.length; i++) {
                  var index = this.indexOf(item[i]);
                  if (index >= 0) {
                      this.splice(index, 1);
                  } else {
                      continue;
                  }
              }
          },
          enumerable: false
        });
      }

      //删除对象,不修改当前列表
      if (!Array.prototype.delete) {
        /**
         * 删除内容
         * @param {any} obj 要删除的对象
         * @param {any} [needAll] 是否全部删除
         */
        Object.defineProperty(Array.prototype, "delete", {
          value: function (obj, needAll) {
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
              return ret;
          },
          enumerable: false
        });
      }

      //删除一项,返回一个新列表
      if (!Array.prototype.remove) {
        /**
         * 删除一项
         * @param {number} index 索引
         * @param {number} [count] 项数
         */
        Object.defineProperty(Array.prototype, "remove", {
          value: function (index, count) {
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
          },
          enumerable: false
        });
      }

      //获取所有项
      if (!Array.prototype.indexsOf) {
        /**
         * 获取所有项
         * @param {object} item 其中一项
         */
        Object.defineProperty(Array.prototype, "indexsOf", {
          value: function (item) {
              var ret = [];
              this.forEach(function (e, i) {
                  if (e == item) {
                      ret.push(i);
                  }
              });
              return ret;
          },
          enumerable: false
        });
      }

      //快速排序
      if (!Array.prototype.quickSort) {
        /**
         * 快速排序
         * 从小到大
         */
        Object.defineProperty(Array.prototype, "quickSort", {
          value: function () {
            if (this.length <= 1) {
                return this;
            }

            // 创建一个新的数组来避免修改原始数组
            var arrayCopy = this.slice();
            var pivotIndex = Math.floor(arrayCopy.length / 2);
            var pivot = arrayCopy.splice(pivotIndex, 1)[0];

            var left = [];
            var right = [];

            for (var i = 0; i < arrayCopy.length; i++) {
                if (arrayCopy[i] < pivot) {
                    left.push(arrayCopy[i]);
                } else {
                    right.push(arrayCopy[i]);
                }
            }

            // 返回新的排序结果
            return left.quickSort().concat([pivot], right.quickSort());
          },
          enumerable: false
        });
      }

      //获取第一个元素
      if (!Array.prototype.first) {
        /**
         * 获取第一个元素
         */
        Object.defineProperty(Array.prototype, "first", {
          value: function (ignoreNull) {
              if (!ignoreNull || this.length === 0) {
                  return this.length > 0 ? this[0] : null;
              } else {
                  for (let i = 0; i < this.length; i++) {
                      if (this[i] !== null && this[i] !== undefined) {
                          return this[i];
                      }
                  }
                  return null; // 所有元素都是 null 或 undefined 时返回 null
              }
          },
          enumerable: false
        });
      }

      //随机列表数据然后返回
      if (!Array.prototype.random) {
        /**
         * 将整个列表随机化
         */
        Object.defineProperty(Array.prototype, "random", {
          value: function () {
              let arr = this.slice();  // 创建原数组的副本，避免修改原数组
              let length = arr.length;
              
              // Fisher-Yates Shuffle 算法
              for (let i = length - 1; i > 0; i--) {
                  let randomIndex = Math.floor(Math.random() * (i + 1));  // 随机生成索引
                  // 交换位置
                  [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]; 
              }
              
              return arr;  // 返回打乱后的新数组
          },
          enumerable: false
        });
      }

      /**判断字符串是否为null或者是空白字符串 */
      String.IsNullEmptyOrSpace = function (value) {
        if (value == undefined || value == null) {
          return true;
        } else if (typeof (value) == "string") {
          return value.IsNullEmptyOrSpace();
        } else {
          return false;
        }
      };

      /**判断字符串是否为null或者是空白字符串 */
      String.prototype.IsNullEmptyOrSpace = function () {
        return this == null || this == undefined || this == "" || this.trim() == "";
      };

      /**
       * 记录原本的toString方法
       * @returns {string}
       */
      Date.prototype.toBaseString = Date.prototype.toString;

      /**
       * 日期格式化
       * @param {any} [fmt]
       */
      Date.prototype.toString = function (fmt) {
        if (!fmt) {
          return this.toBaseString();
        }
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
      };

      /**
       * 两个列表取交集
       * @param {[]} arr1
       * @param {[]} arr2
       */
      Array.intersection = function (arr1, arr2) {
        try {
          //使用ES6
          const set = new Set(arr2);
          return arr1.filter(item => set.has(item));
        } catch (e) {
          //不支持ES6
          return arr1.filter(item => arr2.has(item));
        }
      };

      /**
       * 两个列表取交集
       */
      Object.defineProperty(Array.prototype, "intersection", {
        value: function (other) {
          return Array.intersection(this, other);
        },
        enumerable: false
      });

      /**
       * 并集
       * @param {[]} arr1
       * @param {[]} arr2
       */
      Array.union = function (arr1, arr2) {
        try {
          //使用ES6
          return [...new Set([...arr1, ...arr2])];
        } catch (e) {
          //不支持ES6
          var ret = [];
          arr1.forEach(t => ret.add(t));
          arr2.forEach(t => ret.add(t));
          return ret;
        }
      };

      /**
       * 并集
       */
      Object.defineProperty(Array.prototype, "union", {
        value: function (other) {
          return Array.union(this, other);
        },
        enumerable: false
      });

      /**
       * 差集
       * @param {[]} arr1
       * @param {[]} arr2
       */
      Array.difference = function (arr1, arr2) {
        try {
          //使用ES6
          var set = new Set(arr2);
          return arr1.filter(item => !set.includes(item));
        } catch (e) {
          //不支持ES6
          return arr1.filter(item => !arr2.includes(item));
        }
      };

      /**
       * 差集
       */
      Object.defineProperty(Array.prototype, "difference", {
        value: function (other) {
          return Array.difference(this, other);
        },
        enumerable: false
      });

      /**
       * 对称差
       * @param {[]} arr1
       * @param {[]} arr2
       */
      Array.symmetricDifference = function (arr1, arr2) {
        try {
          return [...difference(arr1, arr2), ...difference(arr2, arr1)];
        } catch (e) {
          return Array.difference(arr1, arr2).union(Array.difference(arr2, arr1));
        }
      };

      /**
       * 全部匹配
       * @param {RegExp} regex 正则表达式
       * @returns {Array}
       */
      var matchAll = function (regex) {
        if (!regex.flags) {
          return regex.exec(this);
        } else if (/g/.test(regex.flags)) {
          let ret = [];
          let match;
          while ((match = regex.exec(this)) !== null) {
            ret.push(match);
          }
          return ret;
        }
      };

      /**如果string没有matchAll则使用自己写的函数 */
      String.prototype.matchAll = String.prototype.matchAll ? String.prototype.matchAll : matchAll;

      if (!Array.prototype.toDict) {
        /**
         * 转为字典对象
         */
        Object.defineProperty(Array.prototype, "toDict", {
          value: function (getKey) {
            var ret = {};
            for (let i = 0; i < this.length; i++) {
              const item = this[i];
              if (getKey) {
                ret[getKey(item)] = item;
              } else {
                ret[i] = item;
              }
            }
            return ret;
          },
          enumerable: false
        });
      }
    },
  },

  /**base64加密模块 */
  base64: {

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


    /**
     * 将输入的内容用utf-8进行编码
     * 同时将\r\n转化为\n
     * @param {String} string
     */
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

    /**
     * 将输入的内容用utf-8进行编码
     * 同时取消将\r\n转化为\n
     * @param {String} string
     */
    _utf8_encodeNoChange: function (string) {
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
       * 获取一个以sha256生成的密匙
       * @param {String} input
       */
      getSHA256Key: function (input) {
        input = lt_code.SHA256.decode(input.toString());
        var temp = input,
          keys = "ABCDEF0123456789",
          count = 0,
          keyss = [],
          indexs = {};
        for (var i = 0; i < keys.length; i++) {
          var x = keys[i];
          count = temp.length;
          temp = temp.replaceAll(x, "");
          keyss.push(count - temp.length);
          indexs[x] = 0;
        }
        var key = {},
          key2 = this._keyStr.substring(0, 64);
        for (var i = 0; i < keyss.length; i++) {
          var x = key2.substring(0, keyss[i]);
          if (x.length == 0) {
            continue;
          }
          key2 = key2.replace(x, "");
          key[keys[i].toString()] = x;
        }
        var ret = "";
        for (var i = 0; i < input.length; i++) {
          var x = input[i].toString();
          ret += key[x][indexs[x]];
          indexs[x]++;
        }
        ret += "=";
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
       * 获取一个以sha256生成的密匙
       * @param {String} input
       */
      getSHA256Key: function (input) {
        input = lt_code.SHA256.decode(input.toString());
        var temp = input,
          keys = "ABCDEF0123456789",
          count = 0,
          keyss = [],
          indexs = {};
        for (var i = 0; i < keys.length; i++) {
          var x = keys[i];
          count = temp.length;
          temp = temp.replaceAll(x, "");
          keyss.push(count - temp.length);
          indexs[x] = 0;
        }
        var key = {},
          key2 = this._keyStr.substring(0, 64);
        for (var i = 0; i < keyss.length; i++) {
          var x = key2.substring(0, keyss[i]);
          if (x.length == 0) {
            continue;
          }
          key2 = key2.replace(x, "");
          key[keys[i].toString()] = x;
        }
        var ret = "";
        for (var i = 0; i < input.length; i++) {
          var x = input[i].toString();
          ret += key[x][indexs[x]];
          indexs[x]++;
        }
        ret += "=";
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
  },

  /**
   * 版本号
   */
  Version: function () {

    // 返回版本号
    return "WX_1";
  }(),
};

// 添加额外方法
lt_code.addMethod.AddMethod();

// 注册数据
module.exports = lt_code;
