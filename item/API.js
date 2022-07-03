/**
 * @file ���ⲿ���õ�API
 * @author ¥��[�޸�ʱ��:2022��7��1��]
 * @version demo-1
 * @summary ���ļ���Ҫ����lt_code,THREE.js
 * ֮������Ľ����Կ���ȡ��������THREE.js������
 */

/**API�˿ڴ��� */
lt_code.APIError = class {
    /**
     * ���캯��
     * @param {string} [name] API����
     * @param {string} [message] ��������
     * @param {...string} [args] ����Ĳ�������
     */
    constructor(name,message,...args) {
        var value = "API�˿ڴ���!\n";
        value += "����API : " + (name ? name : "δ֪") + " ;\n";
        value += "�������� : " + (message ? message : "��") + " ;\n";
        if (args.length<=1) {
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
        } else if (lt_code.Version<17||!lt_code.init) {
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
    /**����������*/
    get Gyroscope() {
        if (this.UseGyroscope) {
            return this.gyroscope;
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
                            this.accelerometer = event.acceleration;
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
                                x: event.beta,
                                y: event.gamma,
                                z: event.alpha
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
            window.addEventListener("deviceorientation", e => {
                this.gyroscope = {
                    x: e.beta,
                    y: e.gamma,
                    z: e.alpha,
                };
                this.orientation = e.alpha;

            });
            window.addEventListener('devicemotion', (event) => {
                this.accelerometer = event.acceleration;
            });
        }
    }

    /**����API���� */
    Update() {

    }
};

