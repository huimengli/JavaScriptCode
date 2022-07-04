/**
 * @file 给外部调用的API
 * @author 楼听[修改时间:2022年7月1日]
 * @version demo-1
 * @summary 本文件需要基于lt_code,THREE.js
 * 之后如果改进可以考虑取消掉对于THREE.js的依赖
 */

!function () {
    //这里设置内部使用的参数
    /**三位向量 */
    var Vector3 = THREE.Vector3;
    /**欧拉角 */
    var Euler = THREE.Euler;
    /**四元数 */
    var Quaternion = THREE.Quaternion;
    /**数学工具 */
    var MathUtils = THREE.MathUtils;
    /**四维矩阵 */
    var Matrix4 = THREE.Matrix4;

    //这里设置内部使用的变量
    /**四维矩阵 */
    var _matrix4 = new Matrix4();

    /**API端口错误 */
    lt_code.APIError = class {
        /**
         * 构造函数
         * @param {string} [name] API名称
         * @param {string} [message] 错误内容
         * @param {...string} [args] 错误的参数名称
         */
        constructor(name, message, ...args) {
            var value = "API端口错误!\n";
            value += "错误API : " + (name ? name : "未知") + " ;\n";
            value += "错误内容 : " + (message ? message : "无") + " ;\n";
            if (args.length <= 1) {
                value += "错误参数 : " + (args[0] ? args[0] : "无") + " ;\n";
            } else {
                for (var i = 0; i < args.length; i++) {
                    value += "错误参数" + i + " : " + (args[i] ? args[i] : "无") + " ;\n";
                }
            }
            return new Error(value);
        }
    };

    /**API端口 */
    lt_code.API = class {

        //最初版本保留
        ///**构建API */
        //constructor() {
        //    //这里是必须要完成的
        //    /**是否使用陀螺仪 */
        //    this.useGyroscope = false;
        //    /**是否使用加速度传感器 */
        //    this.useAccelerometer = false;
        //    /**是否使用方向传感器 */
        //    this.useOrientation = false;
        //    /**是否使用摄像头 */
        //    this.useVideoIn = false;

        //    //特殊对象
        //    /**是否使用GPS(暂时不考虑这个) */
        //    this.useGPS = false;

        //    //可以不完成的
        //    /**是否使用光敏传感器 */
        //    this.useLight = false;
        //    /**是否使用震动 */
        //    this.useShake = false;
        //}

        /**构建API */
        constructor() {
            if (window.THREE == void 0) {
                throw new lt_code.APIError("构建API", "API调用需要依赖于THREE.js");
            } else if (lt_code.Version < 17 || !lt_code.init) {
                throw new lt_code.APIError("构建API", "API调用需要依赖于lt_code.js,版本必须高于17且非压缩版本");
            }

            //这里是必须要完成的
            /**是否使用陀螺仪 */
            this.useGyroscope = false;
            /**是否使用加速度传感器 */
            this.useAccelerometer = false;
            /**是否使用方向传感器 */
            this.useOrientation = false;
            /**是否使用摄像头 */
            this.useVideoIn = false;

            //特殊对象
            /**是否使用GPS(暂时不考虑这个) */
            this.useGPS = false;

            //可以不完成的
            /**是否使用光敏传感器 */
            this.useLight = false;
            /**是否使用震动 */
            this.useShake = false;

            //以下是API的数据存储位置
            /**陀螺仪数据 */
            this.gyroscope = null;
            /**加速计数据 */
            this.accelerometer = null;
            /**方向传感器数据 */
            this.orientation = null;
            /**摄像头的数据流 */
            this.mediastream = null;

            /**gps定位 */
            this.gps = null;
        }

        //demo1版本不考虑必须以外的对象
        //以下是给外部调用的控制API的开关

        /**是否使用陀螺仪*/
        get UseGyroscope() {
            return !!this.useGyroscope;
        }

        set UseGyroscope(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt_code.APIError("启用或停止陀螺仪", "参数输入只允许Boolean或者留空", "UseGyroscope");
            }
            else {
                this.useGyroscope = value;
            }
        }

        /**是否使用加速度计*/
        get UseAccelerometer() {
            return !!this.useAccelerometer;
        }

        set UseAccelerometer(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt_code.APIError("启用或停止加速度计", "参数输入只允许Boolean或者留空", "UseAccelerometer");
            }
            else {
                this.useAccelerometer = value;
            }
        }

        /**是否使用方向传感器*/
        get UseOrientation() {
            return !!this.useOrientation;
        }

        set UseOrientation(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt_code.APIError("启用或停止方向传感器", "参数输入只允许Boolean或者留空", "UseOrientation");
            }
            else {
                this.useOrientation = value;
            }
        }

        /**是否使用摄像头*/
        get UseVideoIn() {
            return !!this.useVideoIn;
        }

        set UseVideoIn(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt_code.APIError("启用或停止摄像头", "参数输入只允许Boolean或者留空", "UseVideoIn");
            }
            else {
                this.useVideoIn = value;
            }
        }

        /**是否使用GPS*/
        get UseGPS() {
            return !!this.useGPS;
        }

        set UseGPS(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt_code.APIError("启用或停止GPS", "参数输入只允许Boolean或者留空", "UseGPS");
            }
            else {
                this.useGPS = value;
            }
        }

        //以下是提供给外部的传感器数据
        /**陀螺仪原始数据*/
        get Gyroscope() {
            if (this.UseGyroscope) {
                return this.gyroscope;
            } else {
                return null;
            }
        }
        /**陀螺仪四元数*/
        get GyroscopeQuaternion() {
            if (this.UseGyroscope) {
                var zee = new Vector3(0, 0, 1);
                var euler = new Euler();
                var q0 = new Quaternion();
                var q1 = new Quaternion(- Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // - PI/2 around the x-axis
                var ret = new Quaternion();
                var alphaOffset = 0;
                var orient = (window.orientation || 0) ? MathUtils.degToRad(window.orientation || 0) : 0; // O
                var alpha = this.gyroscope.z ? MathUtils.degToRad(this.gyroscope.z) + alphaOffset : 0; // Z
                var beta = this.gyroscope.x ? MathUtils.degToRad(this.gyroscope.x) : 0; // X'
                var gamma = this.gyroscope.y ? MathUtils.degToRad(this.gyroscope.y) : 0; // Y''
                euler.set(beta, alpha, - gamma, 'YXZ'); // 'ZXY' for the device, but 'YXZ' for us
                ret.setFromEuler(euler); // orient the device
                ret.multiply(q1); // camera looks out the back of the device, not the top
                ret.multiply(q0.setFromAxisAngle(zee, - orient)); // adjust for screen orientation
                return ret;
            } else {
                return null;
            }
        }
        /**陀螺仪欧拉角*/
        get GyroscopeEuler() {
            if (this.UseGyroscope) {
                var q = this.GyroscopeQuaternion;
                var ret = new Euler();
                _matrix4.makeRotationFromQuaternion(q);
                return ret.setFromRotationMatrix(_matrix4, "XYZ", true);
            } else {
                return null;
            }
        }

        /**加速度传感器数据*/
        get Accelerometer() {
            if (this.UseAccelerometer) {
                return this.accelerometer;
            } else {
                return null;
            }
        }
        /**方向传感器*/
        get Orientation() {
            if (this.UseOrientation) {
                return this.orientation;
            } else {
                return null;
            }
        }
        /**视频数据流*/
        get MediaStream() {
            if (this.UseVideoIn) {
                return this.mediastream;
            } else {
                return null;
            }
        }

        /**GPS数据*/
        get GPS() {
            if (this.UseGPS) {
                return this.gps;
            } else {
                return null;
            }
        }

        /**判断是否是IOS设备 */
        IsIOS() {
            var u = window.navigator.userAgent;
            return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        }

        /**获取IOS权限弹窗 */
        async IOSConfirm() {
            /**弹窗盒子 */
            var box = lt_code.newDom("div", {
                class: "forIOS",
                style: {
                    "width": "80vw",
                    "position": "fixed",
                    "left": "10vw",
                    "top": "34vh",
                    "background-color": "white",
                    "height": "26vh",
                    "font-size": "60px",
                    "border-radius": "20px",
                    "display": "flex",
                    "flex-direction": "column",
                    "justify-content": "space-around",
                    "align-items": "center",
                    "z-index": "1000",
                }
            });
            var value = lt_code.newDom("div", {
                class: "forIOS_value",
                style: {
                    "padding": "0 50px",
                    "font-size": "62px",
                },
                innerText: "是否允许此网站使用您手机的陀螺仪数据?"
            });
            var buttonsBox = lt_code.newDom("div", {
                class: "forIOS_button",
                style: {
                    "display": "flex",
                    "justify-content": "flex-end",
                    "width": "90%",
                },
            });
            var yesButton = lt_code.newDom("div", {
                class: "forIOS_Yes",
                style: {
                    padding: "0 40px",
                    color: "#3333ff",
                },
                innerText: "确认",
            });
            var noButton = lt_code.newDom("div", {
                class: "forIOS_No",
                style: {

                },
                innerText: "取消",
            });

            lt_code.addChild(yesButton, buttonsBox);
            lt_code.addChild(noButton, buttonsBox);

            lt_code.addChild(value, box);
            lt_code.addChild(buttonsBox, box);

            lt_code.addChild(box);

            var requestPermissionsIOS = () => {
                requestDeviceMotionIOS();
                requestDeviceOrientationIOS();
            };

            var requestDeviceMotionIOS = () => {
                if (typeof (DeviceMotionEvent).requestPermission === 'function') {
                    (DeviceMotionEvent).requestPermission().then(permissionState => {
                        if (permissionState === 'granted') {
                            window.addEventListener('devicemotion', (event) => {
                                this.accelerometer = {
                                    x: event.acceleration.x||0,
                                    y: event.acceleration.y||0,
                                    z: event.acceleration.z||0
                                };
                            });
                        }
                    }).catch((err) => {
                        alert(JSON.stringify(err));
                        alert("用户未允许权限");
                    });
                } else {
                    // handle regular non iOS 13+ devices
                }
            };

            // requesting device orientation permission
            var requestDeviceOrientationIOS = () => {
                if (typeof (DeviceOrientationEvent).requestPermission === 'function') {
                    (DeviceOrientationEvent).requestPermission().then(permissionState => {
                        if (permissionState === 'granted') {
                            window.addEventListener('deviceorientation', (event) => {
                                this.gyroscope = {
                                    x: event.beta||0,
                                    y: event.gamma||0,
                                    z: event.alpha||0
                                };
                                this.orientation = e.alpha;
                            });
                        }
                    }).catch((err) => {
                        alert(JSON.stringify(err));
                        alert("用户未允许权限");
                    });
                } else {
                    // handle regular non iOS 13+ devices
                }
            };

            var testClick = () => {
                requestPermissionsIOS();
            };

            return new Promise((resolve, reject) => {
                yesButton.onmousedown = function () {
                    testClick();
                    lt_code.removeChild(box);
                    resolve("用户给予权限");
                }
                noButton.onmousedown = function () {
                    lt_code.removeChild(box);
                    reject(new lt_code.APIError("获取IOS权限", "用户不给予权限"));
                }
            })
        }

        /**
         * API初始化
         * 在这个过程中,直接索要所有权限
         */
        async Init() {
            if (this.IsIOS()) {
                await this.IOSConfirm();
            } else {
                //陀螺仪权限
                window.addEventListener("deviceorientation", e => {
                    this.gyroscope = {
                        x: e.beta||0,
                        y: e.gamma||0,
                        z: e.alpha||0,
                    };
                    this.orientation = e.alpha;
                });
                //加速度权限
                window.addEventListener('devicemotion', (event) => {
                    this.accelerometer = {
                        x: event.acceleration.x||0,
                        y: event.acceleration.y||0,
                        z: event.acceleration.z||0
                    };
                });
            }
        }

        /**
         * API初始化GPS
         * @param {PositionCallback} callback 回调函数
         */
        GPSInit(callback) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition( position=>{
                    this.gps = position.coords;
                    if (callback) {
                        callback(this.GPS);
                    }
                }, function (err) {
                    var e = null;
                    switch (err.code) {
                        case 1:
                            e = new lt_code.APIError("GPS初始化", "位置服务被拒绝");
                        case 2:
                            e = new lt_code.APIError("GPS初始化", "无法获取到位置信息");
                        case 3:
                            e = new lt_code.APIError("GPS初始化", "获取信息超时");
                        default:
                            e = new lt_code.APIError("GPS初始化", "未知错误");
                    }
                    e.code = err.code;
                    throw e;
                }, {
                    enableHighAccuracy: true,
                    maximumAge: 1000
                });
            } else {
                throw new lt_code.APIError("GPS初始化", "浏览器不支持GPS定位");
            }
        }

        /**更新API调用 */
        Update() {

            //GPS数据就是需要不断调用才能获取的
            //但是如果不使用GPS即不调用
            if (this.UseGPS) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        this.gps = position.coords;
                    }, function (err) {
                        switch (err.code) {
                            case 1:
                                throw new lt_code.APIError("GPS初始化", "位置服务被拒绝");
                            case 2:
                                throw new lt_code.APIError("GPS初始化", "无法获取到位置信息");
                            case 3:
                                throw new lt_code.APIError("GPS初始化", "获取信息超时");
                            default:
                                throw new lt_code.APIError("GPS初始化", "未知错误");
                        }
                    }, {
                            enableHighAccuracy: true,
                            maximumAge: 1000
                        });
                } else {
                    throw new lt_code.APIError("GPS初始化", "浏览器不支持GPS定位");
                }
            }
        }
    };

}();
