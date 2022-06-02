// TODO アプリ起動時にcredentialsを読み込み、ssmからcognitoユーザープール情報を取得しておく
process.env.AWS_SDK_LOAD_CONFIG = true;
const AWS_SDK = require("aws-sdk");
const AWS_SSM = new AWS_SDK.SSM();

/**
 * AWS SystemManager ParameterStore取得
 * @param {*} parameter name
 * @returns parameter value
 */
 const getParameterValue = (parameter) => {
    const param = {
        Name: parameter,
        WithDecryption: true // 暗号化されていたら復号
    }

    return AWS_SSM.getParameter(param, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const response = JSON.parse(data);
            console.log(response);
            return response.Parameter.Value;
        }
    });
}

process.env.USER_POOL_ID = getParameterValue('reconomie-user-pool-id');
process.env.CLIENT_ID = getParameterValue('reconomie-client-id');
