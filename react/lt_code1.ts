/**
 * 工具类模块
 * @author huimengli[2024年10月3日]
 */
const lt_code = {
  /**
   * 产生一个新节点
   * @param {ElementTagNameMap} domName 节点类型(string)
   * @param {object} [attr] 节点属性
   */
  newDom: function (domName, attr = {}) {
    /** 非节点属性 */
    let notAttr = ['innerText', 'innerHTML'];
    let a = document.createElement(domName);

    for (let i in attr) {
      if (i == 'style') {
        let styles = '';

        if (typeof attr[i] == 'object') {
          for (let j in attr[i]) {
            styles += j + ':' + attr[i][j] + ';';
          }
        } else {
          styles = attr[i];
        }
        a.setAttribute(i, styles);
      } else if (i == 'dataset') {
        if (typeof attr[i] == 'object') {
          for (let j in attr[i]) {
            a.dataset[j] = attr[i][j];
          }
        } else {
          a.dataset = attr[i];
        }
      } else {
        if (notAttr.indexOf(i) >= 0) {
          a[i] = attr[i];
        } else {
          a.setAttribute(i, attr[i]);
        }
      }
    }

    return a;
  },

  /**
   * MD5 加密
   * @param {String} string
   */
  md5: function (string) {
    function md5_RotateLeft(lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function md5_AddUnsigned(lX, lY) {
      let lX4, lY4, lX8, lY8, lResult;
      lX8 = lX & 0x80000000;
      lY8 = lY & 0x80000000;
      lX4 = lX & 0x40000000;
      lY4 = lY & 0x40000000;
      lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);

      if (lX4 & lY4) {
        return lResult ^ 0x80000000 ^ lX8 ^ lY8;
      }

      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
        } else {
          return lResult ^ 0x40000000 ^ lX8 ^ lY8;
        }
      } else {
        return lResult ^ lX8 ^ lY8;
      }
    }

    function md5_F(x, y, z) {
      return (x & y) | (~x & z);
    }

    function md5_G(x, y, z) {
      return (x & z) | (y & ~z);
    }

    function md5_H(x, y, z) {
      return x ^ y ^ z;
    }

    function md5_I(x, y, z) {
      return y ^ (x | ~z);
    }

    function md5_FF(a, b, c, d, x, s, ac) {
      a = md5_AddUnsigned(
        a,
        md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac),
      );

      return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }

    function md5_GG(a, b, c, d, x, s, ac) {
      a = md5_AddUnsigned(
        a,
        md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac),
      );

      return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }

    function md5_HH(a, b, c, d, x, s, ac) {
      a = md5_AddUnsigned(
        a,
        md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac),
      );

      return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }

    function md5_II(a, b, c, d, x, s, ac) {
      a = md5_AddUnsigned(
        a,
        md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac),
      );

      return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }

    function md5_ConvertToWordArray(string) {
      let lWordCount;
      let lMessageLength = string.length;
      let lNumberOfWords_temp1 = lMessageLength + 8;
      let lNumberOfWords_temp2 =
        (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
      let lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
      let lWordArray = Array(lNumberOfWords - 1);
      let lBytePosition = 0;
      let lByteCount = 0;

      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] =
          lWordArray[lWordCount] |
          (string.charCodeAt(lByteCount) << lBytePosition);
        lByteCount++;
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
      return lWordArray;
    }

    function md5_WordToHex(lValue) {
      let WordToHexValue = '',
        WordToHexValue_temp = '',
        lByte,
        lCount;

      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        WordToHexValue_temp = '0' + lByte.toString(16);
        WordToHexValue =
          WordToHexValue +
          WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
      }

      return WordToHexValue;
    }

    function md5_Utf8Encode(string) {
      string = string.replace(/\r\n/g, '\n');
      let utftext = '';

      for (let n = 0; n < string.length; n++) {
        let c = string.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
      }

      return utftext;
    }
    let x = [];
    let k, AA, BB, CC, DD, a, b, c, d;
    let S11 = 7,
      S12 = 12,
      S13 = 17,
      S14 = 22;
    let S21 = 5,
      S22 = 9,
      S23 = 14,
      S24 = 20;
    let S31 = 4,
      S32 = 11,
      S33 = 16,
      S34 = 23;
    let S41 = 6,
      S42 = 10,
      S43 = 15,
      S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xefcdab89;
    c = 0x98badcfe;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
      AA = a;
      BB = b;
      CC = c;
      DD = d;
      a = md5_FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
      d = md5_FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
      c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070db);
      b = md5_FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
      a = md5_FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
      d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
      c = md5_FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
      b = md5_FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
      a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
      d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
      c = md5_FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
      b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
      a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
      d = md5_FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
      c = md5_FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
      b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
      a = md5_GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
      d = md5_GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
      c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
      b = md5_GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
      a = md5_GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
      d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
      c = md5_GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
      b = md5_GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
      a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
      d = md5_GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
      c = md5_GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
      b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
      a = md5_GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
      d = md5_GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
      c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
      b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
      a = md5_HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
      d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
      c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
      b = md5_HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
      a = md5_HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
      d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
      c = md5_HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
      b = md5_HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
      a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
      d = md5_HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
      c = md5_HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
      b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
      a = md5_HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
      d = md5_HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
      c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
      b = md5_HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
      a = md5_II(a, b, c, d, x[k + 0], S41, 0xf4292244);
      d = md5_II(d, a, b, c, x[k + 7], S42, 0x432aff97);
      c = md5_II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
      b = md5_II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
      a = md5_II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
      d = md5_II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
      c = md5_II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
      b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
      a = md5_II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
      d = md5_II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
      c = md5_II(c, d, a, b, x[k + 6], S43, 0xa3014314);
      b = md5_II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
      a = md5_II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
      d = md5_II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
      c = md5_II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
      b = md5_II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
      a = md5_AddUnsigned(a, AA);
      b = md5_AddUnsigned(b, BB);
      c = md5_AddUnsigned(c, CC);
      d = md5_AddUnsigned(d, DD);
    }

    return (
      md5_WordToHex(a) +
      md5_WordToHex(b) +
      md5_WordToHex(c) +
      md5_WordToHex(d)
    ).toLowerCase();
  },

  /** sha256加密模块 */
  SHA256: {
    rotateRight: function (n, x) {
      return (x >>> n) | (x << (32 - n));
    },

    choice: function (x, y, z) {
      return (x & y) ^ (~x & z);
    },

    majority: function (x, y, z) {
      return (x & y) ^ (x & z) ^ (y & z);
    },
    sha256_Sigma0: function (x) {
      return (
        this.rotateRight(2, x) ^
        this.rotateRight(13, x) ^
        this.rotateRight(22, x)
      );
    },
    sha256_Sigma1: function (x) {
      return (
        this.rotateRight(6, x) ^
        this.rotateRight(11, x) ^
        this.rotateRight(25, x)
      );
    },
    sha256_sigma0: function (x) {
      return this.rotateRight(7, x) ^ this.rotateRight(18, x) ^ (x >>> 3);
    },
    sha256_sigma1: function (x) {
      return this.rotateRight(17, x) ^ this.rotateRight(19, x) ^ (x >>> 10);
    },
    sha256_expand: function (W, j) {
      return (W[j & 0x0f] +=
        this.sha256_sigma1(W[(j + 14) & 0x0f]) +
        W[(j + 9) & 0x0f] +
        this.sha256_sigma0(W[(j + 1) & 0x0f]));
    },

    /* Hash constant words K: */
    K256: [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
      0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
      0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
      0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
      0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
      0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
      0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
      0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
      0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
    ],

    /* global arrays */
    ihash: [],
    count: [],
    buffer: [],
    sha256_hex_digits: '0123456789ABCDEF',

    /* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters:
        overflow) */
    safe_add: function (x, y) {
      let lsw = (x & 0xffff) + (y & 0xffff);
      let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
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
      let a, b, c, d, e, f, g, h, T1, T2;
      let W = new Array(16);

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
      for (let i = 0; i < 16; i++)
        W[i] =
          this.buffer[(i << 2) + 3] |
          (this.buffer[(i << 2) + 2] << 8) |
          (this.buffer[(i << 2) + 1] << 16) |
          (this.buffer[i << 2] << 24);

      for (let j = 0; j < 64; j++) {
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
      let i,
        index,
        curpos = 0;
      /* Compute number of bytes mod 64 */
      index = (this.count[0] >> 3) & 0x3f;
      let remainder = inputLen & 0x3f;

      /* Update number of bits */
      if ((this.count[0] += inputLen << 3) < inputLen << 3) this.count[1]++;
      this.count[1] += inputLen >> 29;

      /* Transform as many times as possible */
      for (i = 0; i + 63 < inputLen; i += 64) {
        for (let j = index; j < 64; j++)
          this.buffer[j] = data.charCodeAt(curpos++);
        this.sha256_transform();
        index = 0;
      }

      /* Buffer remaining input */
      for (let k = 0; k < remainder; k++)
        this.buffer[k] = data.charCodeAt(curpos++);
    },

    /* Finish the computation by operations such as padding */
    sha256_final: function () {
      let index = (this.count[0] >> 3) & 0x3f;
      this.buffer[index++] = 0x80;

      if (index <= 56) {
        for (let i = index; i < 56; i++) this.buffer[i] = 0;
      } else {
        for (let i = index; i < 64; i++) this.buffer[i] = 0;
        this.sha256_transform();
        for (let i = 0; i < 56; i++) this.buffer[i] = 0;
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
      let j = 0;
      let output = new Array(32);

      for (let i = 0; i < 8; i++) {
        output[j++] = (this.ihash[i] >>> 24) & 0xff;
        output[j++] = (this.ihash[i] >>> 16) & 0xff;
        output[j++] = (this.ihash[i] >>> 8) & 0xff;
        output[j++] = this.ihash[i] & 0xff;
      }

      return output;
    },

    /* Get the internal hash as a hex string */
    sha256_encode_hex: function () {
      let output = '';

      for (let i = 0; i < 8; i++) {
        for (let j = 28; j >= 0; j -= 4)
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
     * (因为sha256几乎不可逆,所以decode功能写成和encode一样)
     * @param {object} data
     */
    decode: function (data) {
      data = data.toString();
      return this.sha256_digest(data);
    },

    /**
     * 加密成sha256
     * @param {object} data
     */
    encode: function (data) {
      data = data.toString();
      return this.sha256_digest(data);
    },

    /* test if the JS-interpreter is working properly */
    sha256_self_test: function () {
      return (
        this.sha256_digest('message digest') ==
        'f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650'
      );
    },
  },

  /**
   * cookie模块
   */
  cookie: {
    /**
     * 保存cookie
     * @param {string} cookieName 保存的cookie名称
     * @param {string} cookieValue 保存的cookie值
     * @param {number} [cookieDates] 保存的有效时间长度(默认7天)
     */
    saveCookie: function (cookieName, cookieValue, cookieDates = 7) {
      let d = new Date(
        new Date().getTime() +
          (cookieDates
            ? cookieDates * 1000 * 60 * 60 * 24
            : 7 * 1000 * 60 * 60 * 24),
      );
      // 由于base64编码中含有=符号导致cookie存储出错,因此这里使用八进制存储
      cookieValue = lt_code.RSA.project.encode(cookieValue);
      document.cookie =
        cookieName + '=' + cookieValue + ';expires=' + d.toUTCString();
    },

    /**
     * 获取cookie
     * @param {string} cookieName cookie名称
     */
    getCookie: function (cookieName) {
      let cookieStr = document.cookie;
      let arr = cookieStr.split('; ');
      let cookieValue = '';

      for (let i = 0; i < arr.length; i++) {
        let temp = arr[i].split('=');

        if (temp[0] == cookieName) {
          cookieValue = temp[1];
          break;
        }
      }
      cookieValue = lt_code.RSA.project.decode(cookieValue);
      return cookieValue;
    },

    /**
     * 删除cookie
     * @param {any} cookieName
     */
    removeCookie: function (cookieName) {
      document.cookie =
        encodeURIComponent(cookieName) +
        '=; expires =' +
        new Date(0).toUTCString();
    },

    /** 删除所有的cookie */
    clearAllCookie: function () {
      let keys = document.cookie.match(/[^ =;]+(?==)/g);

      if (keys) {
        for (let i = keys.length; i--; ) {
          document.cookie =
            keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString(); // 清除当前域名下的
          // document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的，例如 .m.ratingdog.cn
          // document.cookie = keys[i] + '=0;path=/;domain=ratingdog.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .ratingdog.cn
        }
      }
    },
  },

  /**
   * 非对称加密模块
   * (不完整)
   */
  RSA: {
    /** 计算计划 */
    project: {
      /** 密匙 */
      keys: {
        /** 短密匙(并不是密匙) */
        middleKey: {
          N: '4951760154835678088235319297',
          E: '618970019642690137449562111',
          D: '2803193270864617953997415754',
        },

        /** 短密匙1*/
        shotKey1: {
          N: '1153631',
          E: '1447',
          D: '1005847',
        },

        /** 短密匙2*/
        shotKey2: {
          N: '3604379',
          E: '2029',
          D: '3023845',
        },

        /** 非常短密匙*/
        veryShowKey: {
          N: '3599',
          E: '71',
          D: '3431',
        },
      },

      /** 八进制密匙 */
      _key: '12345678',

      /** 十六进制密钥 */
      _key16: '0123456789ABCDEF',

      /** base64密匙 */
      _64Key:
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

      /**
       * base64转8进制
       * @param {any} input
       */
      base64ToKey: function (input) {
        let index = 0;
        let ret = '';

        for (let i = 0; i < input.length; i++) {
          index = this._64Key.indexOf(input[i]);

          if (index == 64) {
            ret += '0';
          } else if (index == -1) {
            ret += input[i];
          } else {
            ret += this._key[Math.floor(index / 8)];
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
        let indexA = '';
        let indexB = '';
        let index = 0;
        let ret = '';

        for (let i = 0; i < input.length; i++) {
          indexA = input[i];

          if (indexA == '0') {
            ret += '=';
            continue;
          } else if (this._key.indexOf(indexA) == -1) {
            ret += indexA;
            continue;
          }
          i++;
          indexB = input[i];
          index = this._key.indexOf(indexA) * 8 + this._key.indexOf(indexB);
          // console.log(indexA+" "+indexB+" "+index);
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
    },
  },

  base64: {
    // private property
    _keyStr:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    /**
     * 加密
     * @param {string} input
     */
    encode: function (input) {
      let output = '';
      let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      let i = 0;
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
        output =
          output +
          this._keyStr.charAt(enc1) +
          this._keyStr.charAt(enc2) +
          this._keyStr.charAt(enc3) +
          this._keyStr.charAt(enc4);
      }

      return output;
    },

    /**
     * 解密
     * @param {string} input
     */
    decode: function (input) {
      let output = '';
      let chr1, chr2, chr3;
      let enc1, enc2, enc3, enc4;
      let i = 0;
      input = input.replace(/[^A-Za-z0-9+/=]/g, '');

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
      string = string.replace(/\r\n/g, '\n');
      let utftext = '';

      for (let n = 0; n < string.length; n++) {
        let c = string.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
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
      let utftext = '';

      for (let n = 0; n < string.length; n++) {
        let c = string.charCodeAt(n);

        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if (c > 127 && c < 2048) {
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
      let string = '';
      let i = 0;
      let c = 0,
        c1 = 0,
        c2 = 0,
        c3 = 0;

      while (i < utftext.length) {
        c = utftext.charCodeAt(i);

        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if (c > 191 && c < 224) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(
            ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63),
          );
          i += 3;
        }
      }

      return string;
    },
  },

  /**
   * 变量模块
   */
  variable: {
    /**
     * 生成新UUID
     * 标准32位
     * @param {any} [input] 输入
     */
    newUUID: function (input = null) {
      input = input ? input : new Date().getTime().toString();
      input = lt_code.md5(input);
      let sha = lt_code.SHA256.decode(input);
      let dex = '';
      let uuid = 'uuxxxuuy-1xxx-7xxx-yxxx-xxx0xxxy'.replace(
        /[uxy]/g,
        function (e, i) {
          return e == 'u'
            ? (function () {
                let ret = sha[2 * i];
                dex += ret;
                return ret;
              })()
            : e == 'x'
            ? (function () {
                let ret = input[i];
                dex += ret;
                return ret;
              })()
            : (function () {
                return lt_code.md5(dex)[i];
              })();
        },
      );
      return uuid;
    },

    /**
     * 浏览器信息
     * @returns
     */
    userAgent: () => navigator.userAgent,

    /**
     * 格式化年月日
     * @param date
     * @param fmt
     * @returns
     */
    formatDate: function (date, fmt) {
      return function (fmt) {
        let o = {
          'M+': this.getMonth() + 1, // 月份
          'd+': this.getDate(), // 日
          'h+': this.getHours(), // 小时
          'm+': this.getMinutes(), // 分
          's+': this.getSeconds(), // 秒
          'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
          S: this.getMilliseconds(), // 毫秒
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
  },

  /**
   * 测试功能
   */
  test: {
    /**
     * 直接读取上传的文件为base64
     * @param {HTMLInputElement} inputFile 上传结点
     */
    fileToBase: function (inputFile, done: (e) => void) {
      let oFReader = new FileReader();
      let ret;

      if (inputFile.value.length > 0) {
        let file = inputFile.files[0];
        oFReader.readAsDataURL(file);
      }

      oFReader.onloadend = function (e) {
        ret = e.target.result;
        done(ret);
      };
    },

    /**
     * base64转化为文件的函数
     * @param {string} data base64格式的字符串
     * @param {string} filename 新生成的文件的名称
     * @return {File} 返回文件
     */
    dataURLtoFile: function (data, filename) {
      let arr = data.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },

    /**
     * js下载文件到本地
     * @param {string} data base64流
     * @param {string} fileName 文件名
     */
    downFile: function (data, fileName) {
      let file = lt_code.test.dataURLtoFile(data, fileName);
      let blob = new Blob([file], { type: file.type });

      if ('msSaveOrOpenBlob' in navigator) {
        eval(`navigator.msSaveBlob(blob, fileName);`);
      } else {
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(link.href);
      }
    },
  },
  
  /**
   * 获取网页url传参
   * @param {string} [href] 网址
   */
  getUrlData: function (href) {
    href = href || window.location.href;
    let urlData = '{}';

    if (/\?/.test(href)) {
      href = /\?(.+)/.exec(href)[1];
      let leftAndRight = [...href.matchAll(/([^&=]+)=([^&=]+)&?/g)];
      // for (let i = 0; i < leftAndRight.length; i++) {
      //    let str = '{"' + leftAndRight[i][1] + '":"' + leftAndRight[i][2] + '"}';
      //    urlData.push(JSON.parse(str));
      // }
      urlData = '{';

      for (let i = 0; i < leftAndRight.length; i++) {
        urlData += '"' + leftAndRight[i][1] + '":"' + leftAndRight[i][2] + '"';

        if (i < leftAndRight.length - 1) {
          urlData += ',';
        }
      }
      urlData += '}';
    }

    return JSON.parse(urlData);
  },

  /**
   * 删除url中的参数(不跳转页面)
   * @param {string} [href] 网页网址
   * @param {string} [url] 新的网址
   */
  clearUrlData: function (href, url) {
    href = href || window.location.href;

    if (/\?/.test(href)) {
      href = href.slice(0, /\?/.exec(href).index);
      url = url || href;
      let state = { title: '', url: href };
      history.pushState(state, '', url);
    }
  },

  /**
   * 将对象转换成url参数
   * @param data
   */
  toUrlData: function (data) {
    let urlData = '';
    let index = 0;

    for (let key in data) {
      urlData += (index++ == 0 ? '?' : '&') + key + '=' + data[key];
    }

    return urlData;
  },

  /**
   * 防抖函数：在多次调用时，只执行最后一次触发的函数
   * @param func - 要执行的函数
   * @param wait - 延迟执行的时间（毫秒）
   * @returns 返回一个新的防抖处理后的函数
   */
  debounce: function (func: (...args: any[]) => void, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;

    return function executedFunction(...args: any[]) {
      // 定义稍后执行的函数，清除之前的定时器并执行传入的函数
      const later = () => {
        clearTimeout(timeout); // 清除定时器
        func(...args); // 执行传入的函数
      };

      // 清除之前的定时器并设置新的定时器
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * 节流函数：在规定的时间内，确保函数只会被触发一次
   * @param func - 要执行的函数
   * @param limit - 时间间隔（毫秒），函数在此时间间隔内最多执行一次
   * @returns 返回一个新的节流处理后的函数
   */
  throttle: function (func: (...args: any[]) => void, limit: number) {
    let lastFunc: ReturnType<typeof setTimeout>; // 上一次定时器的引用
    let lastRan: number; // 上次执行函数的时间戳

    return function executedFunction(...args: any[]) {
      const now = Date.now(); // 当前时间戳

      if (!lastRan) {
        // 如果是第一次调用，直接执行函数
        func(...args);
        lastRan = now;
      } else {
        // 清除之前的定时器
        clearTimeout(lastFunc);
        // 设置新的定时器，在剩余时间内触发
        lastFunc = setTimeout(() => {
          // 确保在 limit 时间后执行函数
          if (now - lastRan >= limit) {
            func(...args);
            lastRan = now; // 更新上次执行时间
          }
        }, limit - (now - lastRan));
      }
    };
  },


  /**
   * 版本号
   * @returns
   */
  Version: function () {
    return 'REACT_1';
  },
};

export default lt_code;
