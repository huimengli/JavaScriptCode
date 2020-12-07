lt_code.threeD = {
    tag3DModel: class {
        /**
         * ���캯��
         * @param {boolean} bIsTextured �Ƿ�ʹ������
         * @param {tMaterialInfo} tMatInfoVec ������Ϣ
         * @param {t3DObject} t3DObjVec ģ���ж�����Ϣ
         */
        constructor(bIsTextured, tMatInfoVec, t3DObjVec) {
            /**�Ƿ�ʹ������ */
            this.bIsTextured = bIsTextured;
            /**������Ϣ */
            this.tMatInfoVec = tMatInfoVec;
            /**ģ���ж�����Ϣ */
            this.t3DObjVec = t3DObjVec;
        }
    },

    /**������Ϣ��*/
    tagMaterialInfo: class {
        /**
         * ��������
         * @param {string} name ��������
         * @param {GLfloat} crAmbient
         * @param {GLfloat} crDiffuse
         * @param {GLfloat} crSpecular
         * @param {GLfloat} fShiness
         * @param {GLuint} nDiffuseMap
         * @param {GLuint} nSpecularMap
         * @param {GLuint} nBumpMap
         * @param {GLuint} TexObjDiffuseMap
         * @param {GLuint} TexObjSpecularMap
         * @param {GLuint} TexObjBumpMap
         */
        constructor(name, crAmbient, crDiffuse, crSpecular, fShiness, nDiffuseMap, nSpecularMap, nBumpMap, TexObjDiffuseMap, TexObjSpecularMap, TexObjBumpMap) {
            /**�������� */
            this.strname = name;
            this.crAmbient = crAmbient;
            this.crDiffuse = crDiffuse;
            this.crSpecular = crSpecular;
            this.fShiness = fShiness;
            this.nDiffuseMap = nDiffuseMap;
            this.nSpecularMap = nSpecularMap;
            this.nBumpMap = nBumpMap;
            this.TexObjDiffuseMap = TexObjDiffuseMap;
            this.TexObjSpecularMap = TexObjSpecularMap;
            this.TexObjBumpMap = TexObjBumpMap;
        }
    },

    /**������Ϣ�ṹ��*/
    tag3DObject: class {
        /**
         * ��������
         * @param {number} nMaterialID ����ID
         * @param {boolean} bHasTexture �Ƿ��������ӳ��
         * @param {boolean} bHasNormal �Ƿ���з���
         * @param {Vector3} PosVerts ����Ķ���
         * @param {Vector3} Normals ����ķ�����
         * @param {TexCoord} Texcoords ����UV����
         * @param {unsigned short} Indexes ����Ķ�������
         * @param {unsigned int} nNumIndexes ������Ŀ
         * @param {GLuint} nPosVBO
         * @param {GLuint} nNormVBO
         * @param {GLuint} nTexcoordVBO
         * @param {GLuint} nIndexVBO
         */
        constructor(nMaterialID, bHasTexture, bHasNormal, PosVerts, Normals, Texcoords, Indexes, nNumIndexes, nPosVBO, nNormVBO, nTexcoordVBO, nIndexVBO) {
            /**����ID */
            this.nMaterialID = nMaterialID;
            /**�Ƿ��������ӳ�� */
            this.bHasTexture = bHasTexture;
            /**�Ƿ���з��� */
            this.bHasNormal = bHasNormal;
            /**����Ķ��� */
            this.PosVerts = PosVerts;
            /**����ķ����� */
            this.Normals = Normals;
            /**����UV���� */
            this.Texcoords = Texcoords;
            /**���󶥵����� */
            this.Indexes = Indexes;
            /**������Ŀ */
            this.nNumIndexes = nNumIndexes;
            this.nPosVBO = nPosVBO;
            this.nNormVBO = nNormVBO;
            this.nTexcoordVBO = nTexcoordVBO;
            this.nIndexVBO = this.nIndexVBO;
        }
    },
};