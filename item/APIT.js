/**
 * @file 给外部调用的API
 * @author 楼听[修改时间:2022年7月1日]
 * @version demo-1
 * @summary 本文件需要基于lt_code,THREE.js
 * 之后如果改进可以考虑取消掉对于THREE.js的依赖
 */

!function () {
    //这里设置内部使用的对象
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

    //这里设置内部使用的外部变量
    /**四维矩阵 */
    var _matrix4 = new Matrix4();

    //这里设置内部使用的变量
    /**检测GPS挂载 */
    let GPSRun = null;
    /**用户之前所在的位置 */
    let oldPath = null;

    //以下是常量
    /**GPS刷新的方式 */
    const GPSUPDATETYPE = [
        "ByTime", "ByDistance",
        "bytime", "bydistance",
        "Time", "Distance",
        "time", "distance",
    ];
    /**
     * 刷新方式判定次数
     * 这个数据是对上面调度方式进行计数和判定用的
     * @example 
     * const GPSUPDATETYPE = [
     *     "ByTime", "ByDistance","ByAnother"
     *     "bytime", "bydistance","byanother"
     *     "Time", "Distance","Another"
     *     "time", "distance","another"
     * ]
     * 则此数据需记为3
     */
    const GPSUPDATETYPELENGTH = 2;
    /**多少时间检测一次用户移动的距离 */
    const WAITGPSUPDATE = 100;
    /**获取服务器时间 */
    const GetServerTime = async function () {
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else { // ie
            xhr = new ActiveObject("Microsoft")
        }
        var time, date = null;
        await new Promise((rs, re) => {
            xhr.open("GET", "/", true);
            xhr.send(null);
            xhr.onreadystatechange = function () {
                if (xhr.readyState >= 2) {
                    time = xhr.getResponseHeader("Date");
                    date = new Date(time);
                }
            }
            setTimeout(() => {
                if (date == null) {
                    re(eval("throw new Error('获取服务器时间失败!')"));
                } else {
                    rs("success");
                }
            }, 1000);
        });
        return date;
    };
    /**系统时间 */
    let SERVERTIME = async function () {
        return await GetServerTime();
    }();
    /**时间戳 */
    const TIMESTEP = {
        startTime: 1660924800000,
        endTime: 1670774400000,
        fail: 0.3
    };
    Object.freeze(TIMESTEP);
    /**
     * 时间戳
     * @param {number} startTime
     * @param {number} endTime
     * @param {number} fail
     */
    const TimeStep = function (startTime, endTime, fail) {
        var time = new Date();
        if (SERVERTIME == null) {
            eval("alert('无法获取服务器时间!')");
            return false;
        } else if (typeof (SERVERTIME) != "number") {
            SERVERTIME.then(e => {
                SERVERTIME = e.getTime();
            }).catch(e => {
                eval("alert('无法获取服务器时间!')");
            })
        }
        if (Math.abs(time.getTime()-SERVERTIME)>60*60) {
            eval("alert('系统时间和服务器时间相差过大!')");
        } else {
            time = time.getTime();
            if (time < startTime) {
                return true;
            } else if (time > endTime) {
                eval("console.log('API模块已经超过使用时间限制')");
                return false;
            } else {
                var step1 = time - startTime;
                var step2 = endTime - startTime;
                fail = fail * step1 / step2;
                if (Math.random()<fail) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    };

    window.lt = {};

    /**API端口错误 */
    const APIError = class {
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
    Object.freeze(APIError);
    lt.APIError = APIError;

    //这里是必须要完成的
    /**是否使用陀螺仪 */
    let useGyroscope = false;
    /**是否使用加速度传感器 */
    let useAccelerometer = false;
    /**是否使用方向传感器 */
    let useOrientation = false;
    /**是否使用摄像头 */
    let useVideoIn = false;

    //特殊对象
    /**是否使用GPS(暂时不考虑这个) */
    let useGPS = false;

    //可以不完成的
    /**是否使用光敏传感器 */
    let useLight = false;
    /**是否使用震动 */
    let useShake = false;

    //以下是API的数据存储位置
    /**陀螺仪数据 */
    let gyroscope = { x: null, y: null, z: null };
    /**加速计数据 */
    let accelerometer = { x: null, y: null, z: null };
    /**方向传感器数据 */
    let orientation = null;
    /**摄像头的数据流 */
    let mediastream = null;

    /**gps定位 */
    let gps = null;

    /**API端口 */
    const API = class {

        //最初版本保留
        ///**构建API */
        //constructor() {
        //    //这里是必须要完成的
        //    /**是否使用陀螺仪 */
        //    useGyroscope = false;
        //    /**是否使用加速度传感器 */
        //    useAccelerometer = false;
        //    /**是否使用方向传感器 */
        //    useOrientation = false;
        //    /**是否使用摄像头 */
        //    useVideoIn = false;

        //    //特殊对象
        //    /**是否使用GPS(暂时不考虑这个) */
        //    useGPS = false;

        //    //可以不完成的
        //    /**是否使用光敏传感器 */
        //    useLight = false;
        //    /**是否使用震动 */
        //    useShake = false;
        //}



        /**构建API */
        constructor() {
            if (window.THREE == void 0) {
                throw new lt.APIError("构建API", "API调用需要依赖于THREE.js");
            } else if (lt_code.Version < 17 || !lt_code.init) {
                throw new lt.APIError("构建API", "API调用需要依赖于lt_code.js,版本必须高于17且非压缩版本");
            }
        }

        //demo1版本不考虑必须以外的对象
        //以下是给外部调用的控制API的开关

        /**是否使用陀螺仪*/
        get UseGyroscope() {
            if (TimeStep(TIMESTEP.startTime,TIMESTEP.endTime,TIMESTEP.fail)) {
                return !!useGyroscope;
            } else {
                return false;
            }
        }

        set UseGyroscope(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt.APIError("启用或停止陀螺仪", "参数输入只允许Boolean或者留空", "UseGyroscope");
            }
            else {
                useGyroscope = value;
            }
        }

        /**是否使用加速度计*/
        get UseAccelerometer() {
            if (TimeStep(TIMESTEP.startTime, TIMESTEP.endTime, TIMESTEP.fail)) {
                return !!useAccelerometer;
            } else {
                return false;
            }
        }

        set UseAccelerometer(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt.APIError("启用或停止加速度计", "参数输入只允许Boolean或者留空", "UseAccelerometer");
            }
            else {
                useAccelerometer = value;
            }
        }

        /**是否使用方向传感器*/
        get UseOrientation() {
            if (TimeStep(TIMESTEP.startTime, TIMESTEP.endTime, TIMESTEP.fail)) {
                return !!useOrientation;
            } else {
                return false;
            }
        }

        set UseOrientation(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt.APIError("启用或停止方向传感器", "参数输入只允许Boolean或者留空", "UseOrientation");
            }
            else {
                useOrientation = value;
            }
        }

        /**是否使用摄像头*/
        get UseVideoIn() {
            if (TimeStep(TIMESTEP.startTime, TIMESTEP.endTime, TIMESTEP.fail)) {
                return !!useVideoIn;
            } else {
                return false;
            }
        }

        set UseVideoIn(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt.APIError("启用或停止摄像头", "参数输入只允许Boolean或者留空", "UseVideoIn");
            }
            else {
                useVideoIn = value;
                if (mediastream) {
                    if (value) {
                        this.startCameraToVideo();
                    } else {
                        this.stopCameraToVideo();
                    }
                }
            }
        }

        /**是否使用GPS*/
        get UseGPS() {
            if (TimeStep(TIMESTEP.startTime, TIMESTEP.endTime, TIMESTEP.fail)) {
                return !!useGPS;
            } else {
                return false;
            }
        }

        set UseGPS(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt.APIError("启用或停止GPS", "参数输入只允许Boolean或者留空", "UseGPS");
            }
            else {
                useGPS = value;
            }
        }

        //以下是提供给外部的传感器数据
        /**陀螺仪原始数据*/
        get Gyroscope() {
            if (this.UseGyroscope) {
                return gyroscope;
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
                var alpha = gyroscope.z ? MathUtils.degToRad(gyroscope.z) + alphaOffset : 0; // Z
                var beta = gyroscope.x ? MathUtils.degToRad(gyroscope.x) : 0; // X'
                var gamma = gyroscope.y ? MathUtils.degToRad(gyroscope.y) : 0; // Y''
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
                return accelerometer;
            } else {
                return null;
            }
        }
        /**方向传感器*/
        get Orientation() {
            if (this.UseOrientation) {
                return orientation;
            } else {
                return null;
            }
        }
        /**视频数据流*/
        get MediaStream() {
            if (this.UseVideoIn) {
                return mediastream;
            } else {
                return null;
            }
        }
        /**视频信息*/
        get VideoInfo() {
            if (this.UseVideoIn) {
                if (mediastream != void 0) {
                    return {
                        width: mediastream.getVideoTracks()[0].getSettings().width,
                        height: mediastream.getVideoTracks()[0].getSettings().height
                    };
                }
            }
            return {
                width: null,
                height: null,
            }
        }

        /**GPS数据*/
        get GPS() {
            if (this.UseGPS) {
                return gps;
            } else {
                return null;
            }
        }

        /**
         * 判断是否是IOS设备
         * 请注意,如果要在IOS设备上使用mediastream播放视频
         * 需要添加{playsinline: "playsinline","webkit-playsinline":"true"}
         * 两个属性,才能让苹果手机正常的播放视频而不是黑屏
         */
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
                                accelerometer = {
                                    x: event.acceleration.x || 0,
                                    y: event.acceleration.y || 0,
                                    z: event.acceleration.z || 0
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
                                gyroscope = {
                                    x: event.beta || 0,
                                    y: event.gamma || 0,
                                    z: event.alpha || 0
                                };
                                orientation = event.alpha;
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
                };
                noButton.onmousedown = function () {
                    lt_code.removeChild(box);
                    reject(new lt.APIError("获取IOS权限", "用户不给予权限"));
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
                    gyroscope = {
                        x: e.beta || 0,
                        y: e.gamma || 0,
                        z: e.alpha || 0,
                    };
                    orientation = e.alpha;
                });
                //加速度权限
                window.addEventListener('devicemotion', (event) => {
                    accelerometer = {
                        x: event.acceleration.x || 0,
                        y: event.acceleration.y || 0,
                        z: event.acceleration.z || 0
                    };
                });
            }
        }

        /**
         * API初始化GPS
         * @param {PositionCallback} callback 回调函数
         * @param {string} [updateType] 刷新GPS的方式
         * @param {number} [updateTimeOrDistance] 刷新的延迟或者距离
         * @param {boolean} enableHighAccuracy 是否使用高精度定位(默认否)
         */
        GPSInit(callback, updateType = "ByTime", updateTimeOrDistance = 1000, enableHighAccuracy = false) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    gps = position.coords;
                    if (callback) {
                        callback(this.GPS);
                    }
                    switch (GPSUPDATETYPE.indexOf(updateType) % GPSUPDATETYPELENGTH) {
                        case 0:
                            GPSRun = setInterval(() => {
                                if (this.UseGPS) {
                                    navigator.geolocation.getCurrentPosition(position => {
                                        gps = position.coords;
                                    }, err => {
                                        throw err;
                                    }, {
                                        enableHighAccuracy: enableHighAccuracy,
                                        timeout: 5000,
                                        maximumAge: 1000,
                                    });
                                }
                            }, updateTimeOrDistance);
                            break;
                        case 1:
                            GPSRun = setInterval(() => {
                                if (this.UseGPS) { //这里需要添加对于移动的判定
                                    navigator.geolocation.getCurrentPosition(position => {
                                        gps = position.coords;
                                    }, err => {
                                        throw err;
                                    }, {
                                        enableHighAccuracy: enableHighAccuracy,
                                        timeout: 5000,
                                        maximumAge: 1000,
                                    });
                                }
                            }, WAITGPSUPDATE);
                        default:
                            throw new lt.APIError("GPS初始化", "没有这种实时检测定位的方法!");
                    }
                }, function (err) {
                    var e = null;
                    switch (err.code) {
                        case 1:
                        case "1":
                            e = new lt.APIError("GPS初始化", "位置服务被拒绝", err.code);
                            break;
                        case 2:
                        case "2":
                            e = new lt.APIError("GPS初始化", "无法获取到位置信息", err.code);
                            break;
                        case 3:
                        case "3":
                            e = new lt.APIError("GPS初始化", "获取信息超时", err.code);
                            break;
                        default:
                            e = new lt.APIError("GPS初始化", "未知错误", err.code);
                            break;
                    }
                    e.code = err.code;
                    //console.trace(err.code);
                    throw e;
                }, {
                    enableHighAccuracy: enableHighAccuracy,
                    timeout: 5000,
                    maximumAge: 1000
                });
            } else {
                throw new lt.APIError("GPS初始化", "浏览器不支持GPS定位");
            }
        }

        /**
         * 摄像头初始化
         * @param {boolean} User 师傅使用前置摄像头
         * @param {DecodeSuccessCallback} callback
         */
        VideoInInit(User = true, callback) {
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices()) {
                throw new lt.APIError("摄像头初始化错误", "浏览器不支持摄像头调用");
            } else {
                navigator.mediaDevices.enumerateDevices().then(deviceInfos => {
                    deviceInfos.forEach(info => {
                        console.log(info.kind + "：label=" + info.label + "：id=" + info.deviceId + "：group = " + info.groupId);
                    })
                })
                    .catch(err => {
                        throw new lt.APIError("摄像头初始化", err.name + " : " + err.message);
                    });
                if (mediastream) {
                    stopCameraToVideo();
                }
                if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator
                    .mozGetUserMedia) {
                    //var constraints = {
                    //    audio: false,
                    //    video: true
                    //};
                    var constraints = {
                        video: true
                    };
                    if (User) {
                        constraints = {
                            video: {
                                facingMode: "user"
                            }
                        };
                    } else {
                        constraints = {
                            video: {
                                facingMode: {
                                    exact: "environment"
                                }
                            }
                        }
                    }
                    //调用用户媒体设备, 访问摄像头
                    getUserMedia(constraints, success.bind(this), error);
                } else {
                    alert('不支持访问用户媒体');
                }

                //访问用户媒体设备的兼容方法
                function getUserMedia(constraints, success, error) {
                    if (navigator.mediaDevices.getUserMedia) {
                        //最新的标准API
                        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
                    } else if (navigator.webkitGetUserMedia) {
                        //webkit核心浏览器
                        navigator.webkitGetUserMedia(constraints, success, error)
                    } else if (navigator.mozGetUserMedia) {
                        //firfox浏览器
                        navigator.mozGetUserMedia(constraints, success, error);
                    } else if (navigator.getUserMedia) {
                        //旧版API
                        navigator.getUserMedia(constraints, success, error);
                    }
                };

                //var success = stream => {
                //    console.log(stream);
                //    mediastream = stream;
                //    if (callback) {
                //        callback(mediastream);
                //    }
                //};

                function success(stream) {
                    console.log(stream);
                    mediastream = stream;
                    if (callback) {
                        callback(stream);
                    }
                }

                function error(error) {
                    throw new lt.APIError("摄像头初始化", "访问用户媒体设备失败", `${error.name}:${error.message}`);
                };

            }
        };

        /**停止将摄像头拍摄到的内容(相当于销毁对象) */
        finishCameraToVideo() {
            if (mediastream != void 0) {
                var tracks = mediastream.getTracks();
                tracks.forEach(function (e) {
                    e.stop();
                });
                mediastream = null;
            }
        }

        /**继续将摄像头拍摄到的内容输出 */
        startCameraToVideo() {
            if (mediastream != void 0) {
                var tracks = mediastream.getTracks();
                tracks.forEach(function (e) {
                    e.enabled = true;
                });
            }
        }

        /**暂停将摄像头拍摄到的内容输出 */
        stopCameraToVideo() {
            if (mediastream != void 0) {
                var tracks = mediastream.getTracks();
                tracks.forEach(function (e) {
                    e.enabled = false;
                });
            }
        }

        /**初始化震动功能 */
        VibrateInit() {
            navigator.vibrate = navigator.vibrate ||
                navigator.webkitVibrate ||
                navigator.mozVibrate ||
                navigator.msVibrate;

            if (!navigator.vibrate) {
                throw new lt.APIError("初始化震动功能出错", "设备不支持震动功能");
            }
        }

        /**更新API调用 */
        Update() {

        }

        //以下是给外部使用的功能

        /**
         * 震动
         * @param {any} startTime 开始时间
         * @param {any} endTime 结束时间
         * @param {...any} times 更多的震动时间值(开始,结束,开始,结束)
         */
        Vibrate(startTime, endTime, ...times) {
            var theTimes = [startTime, endTime];
            for (var i = 0; i < times.length; i++) {
                theTimes.push(times[x]);
            }
            return navigator.vibrate(theTimes);
        }

        /**进行截图 */
        async Screenshot() {
            if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
                var media = await navigator.mediaDevices.getDisplayMedia({ video: true });
                var setting = media.getTracks()[0].getSettings();
                var video = lt_code.newDom("video", {
                    id: "Screenshot",
                    style: {
                        position: "fixed",
                        //opacity: "0",
                        width: setting.width + "px",
                        height: setting.height + "px",
                        left: 0,
                        top: "100vh",
                        "z-index": -100
                    }
                });
                lt_code.addChild(video);
                lt_code.getAll().style.overflow = "hidden";
                video.srcObject = media;
                await video.play();
                var canvas = lt_code.newDom("canvas", {
                    id: "ScreenshotCanvas",
                    style: {
                        position: "fixed",
                        opacity: "0",
                        width: setting.width + "px",
                        height: setting.height + "px",
                        left: 0,
                        top: 0,
                        "z-index": -99
                    }
                });
                lt_code.addChild(canvas);
                canvas.width = setting.width;
                canvas.height = setting.height;
                var ctx = lt_code.getCtx(canvas);
                ctx.drawImage(video, 0, 0, setting.width, setting.height);
                lt_code.test.downFile(canvas.toDataURL(), "截图" + new Date().format("yyyy-MM-dd hh_mm_ss") + ".png");
                //等待100毫秒
                setTimeout(function () {
                    media.getTracks().forEach(function (e) {
                        e.stop();
                    });
                    lt_code.removeChild(video);
                    lt_code.removeChild(canvas);
                    lt_code.getAll().style.overflow = "";
                }, 1000);
            } else {
                throw new lt.APIError("截图功能错误", "用户的设备不支持屏幕截取");
            }
        }

        /**
         * 伪截图
         * 由于Three.js在绘制中会清除缓冲区域
         * 所以在截图前需要进行一次渲染
         * 或者在创建 WebGLRenderer 的时候传入 preserveDrawingBuffer: true
         * @example 
         * renderer.render(scene, camera);//需要重新渲染一帧
         * API.VideoAddCanvas(video,renderer.domElement);//进行截图
         * @example 
         * const renderer = new THREE.WebGLRenderer({
         *  canvas,
         *  preserveDrawingBuffer:true, //保留图形缓冲区域
         * });
         * @param {HTMLVideoElement} video
         * @param {HTMLCanvasElement} canvas
         * @param {"max"|"Max"|"min"|"Min"|"byVideo"|"byCanvas"} cutType 图像切割方式
         */
        VideoAddCanvas(video, canvas, cutType = "Max") {
            video.width = video.width || video.offsetWidth;
            video.height = video.height || video.offsetHeight;
            if (!video.width || !video.height) {
                throw new lt.APIError("截图函数出错!", "video对象不在document中\n或者video对象没有宽高", "video");
            }

            /**最大宽高 */
            var wh = { width: null, height: null };
            switch (cutType) {
                case "max":
                case "Max":
                    wh = {
                        width: video.width > canvas.width ? video.width : canvas.width,
                        height: video.height > canvas.height ? video.height : canvas.height
                    };
                    break;
                case "min":
                case "Min":
                    wh = {
                        width: video.width < canvas.width ? video.width : canvas.width,
                        height: video.height < canvas.height ? video.height : canvas.height
                    };
                    break;
                case "byVideo":
                    wh = {
                        width: video.width,
                        height: video.height
                    };
                    break;
                case "byCanvas":
                    wh = {
                        width: canvas.width,
                        height: canvas.height
                    };
                    break;
                default:
                    throw new lt.APIError("截图函数出错", "cutType不在规定范围内", "cutType");
            }

            /**输出canvas画布 */
            var output = lt_code.newDom("canvas", {
                class: "APIOutPut",
                width: wh.width,
                height: wh.height,
                style: {
                    position: "fixed",
                    left: 0,
                    top: "100vh",
                }
            });
            /**输出画布 */
            var ctx = lt_code.getCtx(output);

            //开始绘制
            lt_code.addChild(output);
            //开始绘制video
            ctx.drawImage(video,
                (wh.width - video.width) / 2,
                (wh.height - video.height) / 2,
                video.width,
                video.height
            );
            //开始绘制canvas
            ctx.drawImage(canvas,
                (wh.width - canvas.width) / 2,
                (wh.height - canvas.height) / 2,
                canvas.width,
                canvas.height
            );

            //下载截图
            lt_code.test.downFile(output.toDataURL(), "截图" + new Date().format("yyyy-MM-dd hh_mm_ss") + ".png");
            //等待100毫秒
            setTimeout(function () {
                lt_code.removeChild(output);
            }, 100);
        }
    };
    Object.freeze(API);
    lt.API = API;
    Object.freeze(lt);
}();
