/**
 * @file ���ⲿ���õ�API
 * @author ¥��[�޸�ʱ��:2022��7��1��]
 * @version demo-1
 * @summary ���ļ���Ҫ����lt_code,THREE.js
 * ֮������Ľ����Կ���ȡ��������THREE.js������
 */

!function () {
    //���������ڲ�ʹ�õĲ���
    /**��λ���� */
    var Vector3 = THREE.Vector3;
    /**ŷ���� */
    var Euler = THREE.Euler;
    /**��Ԫ�� */
    var Quaternion = THREE.Quaternion;
    /**��ѧ���� */
    var MathUtils = THREE.MathUtils;
    /**��ά���� */
    var Matrix4 = THREE.Matrix4;

    //���������ڲ�ʹ�õı���
    /**��ά���� */
    var _matrix4 = new Matrix4();

    /**API�˿ڴ��� */
    lt_code.APIError = class {
        /**
         * ���캯��
         * @param {string} [name] API����
         * @param {string} [message] ��������
         * @param {...string} [args] ����Ĳ�������
         */
        constructor(name, message, ...args) {
            var value = "API�˿ڴ���!\n";
            value += "����API : " + (name ? name : "δ֪") + " ;\n";
            value += "�������� : " + (message ? message : "��") + " ;\n";
            if (args.length <= 1) {
                value += "������� : " + (args[0] ? args[0] : "��") + " ;\n";
            } else {
                for (var i = 0; i < args.length; i++) {
                    value += "�������" + i + " : " + (args[i] ? args[i] : "��") + " ;\n";
                }
            }
            return new Error(value);
        }
    };

    /**API�˿� */
    lt_code.API = class {

        //����汾����
        ///**����API */
        //constructor() {
        //    //�����Ǳ���Ҫ��ɵ�
        //    /**�Ƿ�ʹ�������� */
        //    this.useGyroscope = false;
        //    /**�Ƿ�ʹ�ü��ٶȴ����� */
        //    this.useAccelerometer = false;
        //    /**�Ƿ�ʹ�÷��򴫸��� */
        //    this.useOrientation = false;
        //    /**�Ƿ�ʹ������ͷ */
        //    this.useVideoIn = false;

        //    //�������
        //    /**�Ƿ�ʹ��GPS(��ʱ���������) */
        //    this.useGPS = false;

        //    //���Բ���ɵ�
        //    /**�Ƿ�ʹ�ù��������� */
        //    this.useLight = false;
        //    /**�Ƿ�ʹ���� */
        //    this.useShake = false;
        //}

        /**����API */
        constructor() {
            if (window.THREE == void 0) {
                throw new lt_code.APIError("����API", "API������Ҫ������THREE.js");
            } else if (lt_code.Version < 17 || !lt_code.init) {
                throw new lt_code.APIError("����API", "API������Ҫ������lt_code.js,�汾�������17�ҷ�ѹ���汾");
            }

            //�����Ǳ���Ҫ��ɵ�
            /**�Ƿ�ʹ�������� */
            this.useGyroscope = false;
            /**�Ƿ�ʹ�ü��ٶȴ����� */
            this.useAccelerometer = false;
            /**�Ƿ�ʹ�÷��򴫸��� */
            this.useOrientation = false;
            /**�Ƿ�ʹ������ͷ */
            this.useVideoIn = false;

            //�������
            /**�Ƿ�ʹ��GPS(��ʱ���������) */
            this.useGPS = false;

            //���Բ���ɵ�
            /**�Ƿ�ʹ�ù��������� */
            this.useLight = false;
            /**�Ƿ�ʹ���� */
            this.useShake = false;

            //������API�����ݴ洢λ��
            /**���������� */
            this.gyroscope = null;
            /**���ټ����� */
            this.accelerometer = null;
            /**���򴫸������� */
            this.orientation = null;
            /**����ͷ�������� */
            this.mediastream = null;
        }

        //demo1�汾�����Ǳ�������Ķ���
        //�����Ǹ��ⲿ���õĿ���API�Ŀ���

        /**�Ƿ�ʹ��������*/
        get UseGyroscope() {
            return !!this.useGyroscope;
        }

        set UseGyroscope(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt_code.APIError("���û�ֹͣ������", "��������ֻ����Boolean��������", "UseGyroscope");
            }
            else {
                this.useGyroscope = value;
            }
        }

        /**�Ƿ�ʹ�ü��ٶȼ�*/
        get UseAccelerometer() {
            return !!this.useAccelerometer;
        }

        set UseAccelerometer(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt_code.APIError("���û�ֹͣ���ٶȼ�", "��������ֻ����Boolean��������", "UseAccelerometer");
            }
            else {
                this.useAccelerometer = value;
            }
        }

        /**�Ƿ�ʹ�÷��򴫸���*/
        get UseOrientation() {
            return !!this.useOrientation;
        }

        set UseOrientation(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt_code.APIError("���û�ֹͣ���򴫸���", "��������ֻ����Boolean��������", "UseOrientation");
            }
            else {
                this.useOrientation = value;
            }
        }

        /**�Ƿ�ʹ������ͷ*/
        get UseVideoIn() {
            return !!this.useVideoIn;
        }

        set UseVideoIn(value) {
            if (typeof (value) !== "boolean" || value == void 0) {
                throw new lt_code.APIError("���û�ֹͣ����ͷ", "��������ֻ����Boolean��������", "UseVideoIn");
            }
            else {
                this.useVideoIn = value;
            }
        }

        //�������ṩ���ⲿ�Ĵ���������
        /**������ԭʼ����*/
        get Gyroscope() {
            if (this.UseGyroscope) {
                return this.gyroscope;
            } else {
                return null;
            }
        }
        /**��������Ԫ��*/
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
        /**������ŷ����*/
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

        /**���ٶȴ���������*/
        get Accelerometer() {
            if (this.UseAccelerometer) {
                return this.accelerometer;
            } else {
                return null;
            }
        }
        /**���򴫸���*/
        get Orientation() {
            if (this.UseOrientation) {
                return this.orientation;
            } else {
                return null;
            }
        }
        /**��Ƶ������*/
        get MediaStream() {
            if (this.UseVideoIn) {
                return this.mediastream;
            } else {
                return null;
            }
        }

        /**�ж��Ƿ���IOS�豸 */
        IsIOS() {
            var u = window.navigator.userAgent;
            return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        }

        /**��ȡIOSȨ�޵��� */
        async IOSConfirm() {
            /**�������� */
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
                innerText: "�Ƿ��������վʹ�����ֻ�������������?"
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
                innerText: "ȷ��",
            });
            var noButton = lt_code.newDom("div", {
                class: "forIOS_No",
                style: {

                },
                innerText: "ȡ��",
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
                        alert("�û�δ����Ȩ��");
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
                        alert("�û�δ����Ȩ��");
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
                    resolve("�û�����Ȩ��");
                }
                noButton.onmousedown = function () {
                    lt_code.removeChild(box);
                    reject(new lt_code.APIError("��ȡIOSȨ��", "�û�������Ȩ��"));
                }
            })
        }

        /**
         * API��ʼ��
         * �����������,ֱ����Ҫ����Ȩ��
         */
        async Init() {
            if (this.IsIOS()) {
                await this.IOSConfirm();
            } else {
                //������Ȩ��
                window.addEventListener("deviceorientation", e => {
                    this.gyroscope = {
                        x: e.beta||0,
                        y: e.gamma||0,
                        z: e.alpha||0,
                    };
                    this.orientation = e.alpha;
                });
                //���ٶ�Ȩ��
                window.addEventListener('devicemotion', (event) => {
                    this.accelerometer = {
                        x: event.acceleration.x||0,
                        y: event.acceleration.y||0,
                        z: event.acceleration.z||0
                    };
                });
            }
        }

        /**����API���� */
        Update() {

        }
    };

}();
