lt_code.threeD = {
    tag3DModel: class {
        /**
         * 构造函数
         * @param {boolean} bIsTextured 是否使用纹理
         * @param {tMaterialInfo} tMatInfoVec 材质信息
         * @param {t3DObject} t3DObjVec 模型中对象信息
         */
        constructor(bIsTextured, tMatInfoVec, t3DObjVec) {
            /**是否使用纹理 */
            this.bIsTextured = bIsTextured;
            /**材质信息 */
            this.tMatInfoVec = tMatInfoVec;
            /**模型中对象信息 */
            this.t3DObjVec = t3DObjVec;
        }
    },

    /**材质信息类*/
    tagMaterialInfo: class {
        /**
         * 构建函数
         * @param {string} name 纹理名称
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
            /**纹理名称 */
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

    /**对象信息结构体*/
    tag3DObject: class {
        /**
         * 构建函数
         * @param {number} nMaterialID 纹理ID
         * @param {boolean} bHasTexture 是否具有纹理映射
         * @param {boolean} bHasNormal 是否具有法线
         * @param {Vector3} PosVerts 对象的顶点
         * @param {Vector3} Normals 对象的法向量
         * @param {TexCoord} Texcoords 纹理UV坐标
         * @param {unsigned short} Indexes 对象的顶点索引
         * @param {unsigned int} nNumIndexes 索引数目
         * @param {GLuint} nPosVBO
         * @param {GLuint} nNormVBO
         * @param {GLuint} nTexcoordVBO
         * @param {GLuint} nIndexVBO
         */
        constructor(nMaterialID, bHasTexture, bHasNormal, PosVerts, Normals, Texcoords, Indexes, nNumIndexes, nPosVBO, nNormVBO, nTexcoordVBO, nIndexVBO) {
            /**纹理ID */
            this.nMaterialID = nMaterialID;
            /**是否具有纹理映射 */
            this.bHasTexture = bHasTexture;
            /**是否具有法线 */
            this.bHasNormal = bHasNormal;
            /**对象的顶点 */
            this.PosVerts = PosVerts;
            /**对象的法向量 */
            this.Normals = Normals;
            /**纹理UV坐标 */
            this.Texcoords = Texcoords;
            /**对象顶点索引 */
            this.Indexes = Indexes;
            /**索引数目 */
            this.nNumIndexes = nNumIndexes;
            this.nPosVBO = nPosVBO;
            this.nNormVBO = nNormVBO;
            this.nTexcoordVBO = nTexcoordVBO;
            this.nIndexVBO = this.nIndexVBO;
        }
    },
};