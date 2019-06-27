/**
 * 系统静态变量
 */
var geodp = geodp || {};

(function() {
  geodp.appconst = geodp.appconst || {
    version: "1.0.1",
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
    GEODP_BASE_API: "http://172.18.2.251:8012",
    GEODP_BASE_URL: "http://172.18.2.251:8010/auth/"
  };
})();
