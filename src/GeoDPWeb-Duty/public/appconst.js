/**
 * 系统静态变量
 */
var geodp = geodp || {};

( function () {
  geodp.appconst = geodp.appconst || {
    version: "1.1.0",
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
    // baseAPI: "http://172.18.2.251:8012",
    // baseURL: "http://172.18.2.251:8010/duty",
    // authURL: "http://172.18.2.251:8010/auth",
    // fileURL: "http://172.18.2.251:8001"
    baseAPI: "http://cdyj-s00:8013",
    baseURL: "http://cdyj-s00:8010/duty",
    authURL: "http://cdyj-s00:8010/auth",
    fileURL: "http://cdyj-s00:8001"
  };
} )();
