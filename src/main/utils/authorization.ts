import { env } from 'process';

/**
 * ユーザー認証util
 */
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// declare var USER_POOL_ID: string;
// declare var CLIENT_ID: string;

/* cognito ユーザープール情報 */
const poolData = {
    UserPoolId: env.USER_POOL_ID,
    ClientId: env.CLIENT_ID
};
/* ユーザー情報 */
let cognitoUser: any;

/* 認証処理レスポンス */
type AuthorizationResponse = {
    result: boolean,
    message: string
}

/**
 * cognitoユーザー認証
 * @param userId 
 * @param password 
 * @param onSuccess 
 * @param onFailure 
 * @param onChangePassword 
 */
export const authorizeUser = async (userId: string, password: string, onSuccess: any, onFailure: any, onChangePassword: any) => {
    console.log(poolData);
    cognitoUser = new AmazonCognitoIdentity.CognitoUser(
        {
            Username: userId,
            Pool: new AmazonCognitoIdentity.CognitoUserPool(poolData)
        }
    );
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        {
            Username: userId,
            Password: password,
        }
    );

    // cognitoユーザー認証
    await cognitoUser.authenticateUser(authenticationDetails, {
        // 認証OK
        onSuccess: function () {
            onSuccess();
        },
        // 初回ログイン時は初期パスワードでログインさせる
        newPasswordRequired: function (userAttributes: any) {
            delete userAttributes.email_verified;
            cognitoUser.completeNewPasswordChallenge(password, {}, {
                onSuccess: function () { },
                onFailure: function () { },
            });
            onChangePassword();
        },
        // 認証NG
        onFailure: function (error: any) {
            console.error(error);
            onFailure();
        },
    });
}

/**
 * パスワード変更
 * @param oldPassword 
 * @param newPassword 
 * @param onChangePassword
 */
export const changePassword = async (oldPassword: string, newPassword: string, onChangePassword: any) => {
    await cognitoUser.changePassword(oldPassword, newPassword, {
        onSuccess: function () { },
        onFailure: function () { }
    });
    onChangePassword();
}
