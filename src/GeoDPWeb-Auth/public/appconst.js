/**
 * 系统静态变量
 */
var geodp = geodp || {};

( function () {
  geodp.appconst = geodp.appconst || {
    version: "1.1.5",
    userManagement: {
      defaultAdminUserName: "admin"
    },
    localization: {
      defaultLocalizationSourceName: "GeoDP"
    },
    authorization: {
      encrptedAuthTokenName: "enc_auth_token"
    },
    cookieName: {
      token: "Abp.AuthToken"
    },
    baseAPI: "/",
    baseURL: "/auth"
  };
} )();
