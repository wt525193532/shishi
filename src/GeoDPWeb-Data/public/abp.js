﻿var abp = abp || {};
( function () {
  /* Application paths *****************************************/

  //Current application root path (including virtual directory if exists).
  abp.appPath = abp.appPath || "/";
  abp.pageLoadTime = new Date();

  //Converts given path to absolute path using abp.appPath variable.
  abp.toAbsAppPath = function ( path ) {
    if ( path.indexOf( "/" ) == 0 ) {
      path = path.substring( 1 );
    }

    return abp.appPath + path;
  };

  /* SESSION */

  abp.session = abp.session || {};

  /* LOCALIZATION ***********************************************/
  //Implements Localization API that simplifies usage of localization scripts generated by Abp.

  abp.localization = abp.localization || {};

  abp.localization.languages = [];

  abp.localization.currentLanguage = {};

  abp.localization.sources = [];

  abp.localization.values = {};

  abp.localization.localize = function ( key, sourceName ) {
    sourceName = sourceName || abp.localization.defaultSourceName;

    var source = abp.localization.values[sourceName];

    if ( !source ) {
      abp.log.warn( "Could not find localization source: " + sourceName );
      return key;
    }

    var value = source[key];
    if ( value == undefined ) {
      return key;
    }

    var copiedArguments = Array.prototype.slice.call( arguments, 0 );
    copiedArguments.splice( 1, 1 );
    copiedArguments[0] = value;

    return abp.utils.formatString.apply( this, copiedArguments );
  };

  abp.localization.getSource = function ( sourceName ) {
    return function ( key ) {
      var copiedArguments = Array.prototype.slice.call( arguments, 0 );
      copiedArguments.splice( 1, 0, sourceName );
      return abp.localization.localize.apply( this, copiedArguments );
    };
  };

  abp.localization.isCurrentCulture = function ( name ) {
    return (
      abp.localization.currentCulture &&
      abp.localization.currentCulture.name &&
      abp.localization.currentCulture.name.indexOf( name ) == 0
    );
  };

  abp.localization.defaultSourceName = undefined;
  abp.localization.abpWeb = abp.localization.getSource( "AbpWeb" );

  /* AUTHORIZATION **********************************************/
  //Implements Authorization API that simplifies usage of authorization scripts generated by Abp.

  abp.auth = abp.auth || {};

  abp.auth.allPermissions = abp.auth.allPermissions || {};

  abp.auth.grantedPermissions = abp.auth.grantedPermissions || {};

  abp.auth.isGranted = function ( permissionName ) {
    return (
      abp.auth.allPermissions[permissionName] != undefined &&
      abp.auth.grantedPermissions[permissionName] != undefined
    );
  };

  abp.auth.isAnyGranted = function () {
    if ( !arguments || arguments.length <= 0 ) {
      return true;
    }

    for ( var i = 0; i < arguments.length; i++ ) {
      if ( abp.auth.isGranted( arguments[i] ) ) {
        return true;
      }
    }

    return false;
  };

  abp.auth.areAllGranted = function () {
    if ( !arguments || arguments.length <= 0 ) {
      return true;
    }

    for ( var i = 0; i < arguments.length; i++ ) {
      if ( !abp.auth.isGranted( arguments[i] ) ) {
        return false;
      }
    }

    return true;
  };

  abp.auth.tokenCookieName = "Abp.AuthToken";

  abp.auth.setToken = function ( authToken, expireDate ) {
    abp.utils.setCookieValue(
      abp.auth.tokenCookieName,
      authToken,
      expireDate,
      abp.appPath,
      abp.domain
    );
  };

  abp.auth.getToken = function () {
    return abp.utils.getCookieValue( abp.auth.tokenCookieName );
  };

  abp.auth.clearToken = function () {
    abp.auth.setToken();
  };

  /* SETTINGS **************************************************/
  //Implements Settings API that simplifies usage of setting scripts generated by Abp.

  abp.setting = abp.setting || {};

  abp.setting.values = abp.setting.values || {};

  abp.setting.get = function ( name ) {
    return abp.setting.values[name];
  };

  abp.setting.getBoolean = function ( name ) {
    var value = abp.setting.get( name );
    return value == "true" || value == "True";
  };

  abp.setting.getInt = function ( name ) {
    return parseInt( abp.setting.values[name] );
  };

  /* REALTIME NOTIFICATIONS ************************************/

  abp.notifications = abp.notifications || {};

  abp.notifications.severity = {
    INFO: 0,
    SUCCESS: 1,
    WARN: 2,
    ERROR: 3,
    FATAL: 4
  };

  abp.notifications.userNotificationState = {
    UNREAD: 0,
    READ: 1
  };

  abp.notifications.getUserNotificationStateAsString = function (
    userNotificationState
  ) {
    switch ( userNotificationState ) {
      case abp.notifications.userNotificationState.READ:
        return "READ";
      case abp.notifications.userNotificationState.UNREAD:
        return "UNREAD";
      default:
        abp.log.warn(
          "Unknown user notification state value: " + userNotificationState
        );
        return "?";
    }
  };

  abp.notifications.getUiNotifyFuncBySeverity = function ( severity ) {
    switch ( severity ) {
      case abp.notifications.severity.SUCCESS:
        return abp.notify.success;
      case abp.notifications.severity.WARN:
        return abp.notify.warn;
      case abp.notifications.severity.ERROR:
        return abp.notify.error;
      case abp.notifications.severity.FATAL:
        return abp.notify.error;
      case abp.notifications.severity.INFO:
      default:
        return abp.notify.info;
    }
  };

  abp.notifications.messageFormatters = {};

  abp.notifications.messageFormatters[
    "Abp.Notifications.MessageNotificationData"
  ] = function ( userNotification ) {
    return (
      userNotification.notification.data.message ||
      userNotification.notification.data.properties.Message
    );
  };

  abp.notifications.messageFormatters[
    "Abp.Notifications.LocalizableMessageNotificationData"
  ] = function ( userNotification ) {
    var message =
      userNotification.notification.data.message ||
      userNotification.notification.data.properties.Message;
    var localizedMessage = abp.localization.localize(
      message.name,
      message.sourceName
    );

    if ( userNotification.notification.data.properties ) {
      var properties = Object.keys(
        userNotification.notification.data.properties
      );
      for ( var i = 0; i < properties.length; i++ ) {
        localizedMessage = localizedMessage.replace(
          "{" + properties[i] + "}",
          userNotification.notification.data.properties[properties[i]]
        );
      }
    }

    return localizedMessage;
  };

  abp.notifications.getFormattedMessageFromUserNotification = function (
    userNotification
  ) {
    var formatter =
      abp.notifications.messageFormatters[
      userNotification.notification.data.type
      ];
    if ( !formatter ) {
      abp.log.warn(
        "No message formatter defined for given data type: " +
        userNotification.notification.data.type
      );
      return "?";
    }

    if ( !abp.utils.isFunction( formatter ) ) {
      abp.log.warn(
        "Message formatter should be a function! It is invalid for data type: " +
        userNotification.notification.data.type
      );
      return "?";
    }

    return formatter( userNotification );
  };

  abp.notifications.showUiNotifyForUserNotification = function (
    userNotification,
    options
  ) {
    var message = abp.notifications.getFormattedMessageFromUserNotification(
      userNotification
    );
    var uiNotifyFunc = abp.notifications.getUiNotifyFuncBySeverity(
      userNotification.notification.severity
    );
    uiNotifyFunc( message, undefined, options );
  };

  /* NOTIFICATION *********************************************/
  //Defines Notification API, not implements it

  abp.notify = abp.notify || {};

  abp.notify.success = function ( message, title, options ) {
    abp.log.warn( "abp.notify.success is not implemented!" );
  };

  abp.notify.info = function ( message, title, options ) {
    abp.log.warn( "abp.notify.info is not implemented!" );
  };

  abp.notify.warn = function ( message, title, options ) {
    abp.log.warn( "abp.notify.warn is not implemented!" );
  };

  abp.notify.error = function ( message, title, options ) {
    abp.log.warn( "abp.notify.error is not implemented!" );
  };

  /* MESSAGE **************************************************/
  //Defines Message API, not implements it

  abp.message = abp.message || {};

  var showMessage = function ( message, title ) {
    alert( ( title || "" ) + " " + message );
  };

  abp.message.info = function ( message, title ) {
    abp.log.warn( "abp.message.info is not implemented!" );
    return showMessage( message, title );
  };

  abp.message.success = function ( message, title ) {
    abp.log.warn( "abp.message.success is not implemented!" );
    return showMessage( message, title );
  };

  abp.message.warn = function ( message, title ) {
    abp.log.warn( "abp.message.warn is not implemented!" );
    return showMessage( message, title );
  };

  abp.message.error = function ( message, title ) {
    abp.log.warn( "abp.message.error is not implemented!" );
    return showMessage( message, title );
  };

  abp.message.confirm = function ( message, titleOrCallback, callback ) {
    abp.log.warn( "abp.message.confirm is not implemented!" );

    if ( titleOrCallback && !( typeof titleOrCallback == "string" ) ) {
      callback = titleOrCallback;
    }

    var result = confirm( message );
    callback && callback( result );
  };

  /* UTILS ***************************************************/

  abp.utils = abp.utils || {};

  /* Creates a name namespace.
   *  Example:
   *  var taskService = abp.utils.createNamespace(abp, 'services.task');
   *  taskService will be equal to abp.services.task
   *  first argument (root) must be defined first
   ************************************************************/
  abp.utils.createNamespace = function ( root, ns ) {
    var parts = ns.split( "." );
    for ( var i = 0; i < parts.length; i++ ) {
      if ( typeof root[parts[i]] == "undefined" ) {
        root[parts[i]] = {};
      }

      root = root[parts[i]];
    }

    return root;
  };

  /* Find and replaces a string (search) to another string (replacement) in
   *  given string (str).
   *  Example:
   *  abp.utils.replaceAll('This is a test string', 'is', 'X') = 'ThX X a test string'
   ************************************************************/
  abp.utils.replaceAll = function ( str, search, replacement ) {
    var fix = search.replace( /[.*+?^${}()|[\]\\]/g, "\\$&" );
    return str.replace( new RegExp( fix, "g" ), replacement );
  };

  /* Formats a string just like string.format in C#.
   *  Example:
   *  abp.utils.formatString('Hello {0}','Tuana') = 'Hello Tuana'
   ************************************************************/
  abp.utils.formatString = function () {
    if ( arguments.length < 1 ) {
      return null;
    }

    var str = arguments[0];

    for ( var i = 1; i < arguments.length; i++ ) {
      var placeHolder = "{" + ( i - 1 ) + "}";
      str = abp.utils.replaceAll( str, placeHolder, arguments[i] );
    }

    return str;
  };

  abp.utils.toPascalCase = function ( str ) {
    if ( !str || !str.length ) {
      return str;
    }

    if ( str.length === 1 ) {
      return str.charAt( 0 ).toUpperCase();
    }

    return str.charAt( 0 ).toUpperCase() + str.substr( 1 );
  };

  abp.utils.toCamelCase = function ( str ) {
    if ( !str || !str.length ) {
      return str;
    }

    if ( str.length === 1 ) {
      return str.charAt( 0 ).toLowerCase();
    }

    return str.charAt( 0 ).toLowerCase() + str.substr( 1 );
  };

  abp.utils.truncateString = function ( str, maxLength ) {
    if ( !str || !str.length || str.length <= maxLength ) {
      return str;
    }

    return str.substr( 0, maxLength );
  };

  abp.utils.truncateStringWithPostfix = function ( str, maxLength, postfix ) {
    postfix = postfix || "...";

    if ( !str || !str.length || str.length <= maxLength ) {
      return str;
    }

    if ( maxLength <= postfix.length ) {
      return postfix.substr( 0, maxLength );
    }

    return str.substr( 0, maxLength - postfix.length ) + postfix;
  };

  /**
   * parameterInfos should be an array of { name, value } objects
   * where name is query string parameter name and value is it's value.
   * includeQuestionMark is true by default.
   */
  abp.utils.buildQueryString = function ( parameterInfos, includeQuestionMark ) {
    if ( includeQuestionMark === undefined ) {
      includeQuestionMark = true;
    }

    var qs = "";

    function addSeperator () {
      if ( !qs.length ) {
        if ( includeQuestionMark ) {
          qs = qs + "?";
        }
      } else {
        qs = qs + "&";
      }
    }

    for ( var i = 0; i < parameterInfos.length; ++i ) {
      var parameterInfo = parameterInfos[i];
      if ( parameterInfo.value === undefined ) {
        continue;
      }

      if ( parameterInfo.value === null ) {
        parameterInfo.value = "";
      }

      addSeperator();

      if (
        parameterInfo.value.toJSON &&
        typeof parameterInfo.value.toJSON === "function"
      ) {
        qs =
          qs +
          parameterInfo.name +
          "=" +
          encodeURIComponent( parameterInfo.value.toJSON() );
      } else if (
        Array.isArray( parameterInfo.value ) &&
        parameterInfo.value.length
      ) {
        for ( var j = 0; j < parameterInfo.value.length; j++ ) {
          if ( j > 0 ) {
            addSeperator();
          }

          qs =
            qs +
            parameterInfo.name +
            "[" +
            j +
            "]=" +
            encodeURIComponent( parameterInfo.value[j] );
        }
      } else {
        qs =
          qs +
          parameterInfo.name +
          "=" +
          encodeURIComponent( parameterInfo.value );
      }
    }

    return qs;
  };

  /**
   * Sets a cookie value for given key.
   * This is a simple implementation created to be used by ABP.
   * Please use a complete cookie library if you need.
   * @param {string} key
   * @param {string} value
   * @param {Date} expireDate (optional). If not specified the cookie will expire at the end of session.
   * @param {string} path (optional)
   */
  abp.utils.setCookieValue = function ( key, value, expireDate, path, domain ) {
    var cookieValue = encodeURIComponent( key ) + "=";

    if ( value ) {
      cookieValue = cookieValue + encodeURIComponent( value );
    }

    if ( expireDate ) {
      cookieValue = cookieValue + "; expires=" + expireDate.toUTCString();
    }

    if ( path ) {
      cookieValue = cookieValue + "; path=" + path;
    }

    if ( domain ) {
      cookieValue = cookieValue + "; domain=" + domain;
    }

    document.cookie = cookieValue;
  };

  /**
   * Gets a cookie with given key.
   * This is a simple implementation created to be used by ABP.
   * Please use a complete cookie library if you need.
   * @param {string} key
   * @returns {string} Cookie value or null
   */
  abp.utils.getCookieValue = function ( key ) {
    var equalities = document.cookie.split( "; " );
    for ( var i = 0; i < equalities.length; i++ ) {
      if ( !equalities[i] ) {
        continue;
      }

      var splitted = equalities[i].split( "=" );
      if ( splitted.length != 2 ) {
        continue;
      }

      if ( decodeURIComponent( splitted[0] ) === key ) {
        return decodeURIComponent( splitted[1] || "" );
      }
    }

    return null;
  };

  /**
   * Deletes cookie for given key.
   * This is a simple implementation created to be used by ABP.
   * Please use a complete cookie library if you need.
   * @param {string} key
   * @param {string} path (optional)
   */
  abp.utils.deleteCookie = function ( key, path ) {
    var cookieValue = encodeURIComponent( key ) + "=";

    cookieValue =
      cookieValue +
      "; expires=" +
      new Date( new Date().getTime() - 86400000 ).toUTCString();

    if ( path ) {
      cookieValue = cookieValue + "; path=" + path;
    }

    document.cookie = cookieValue;
  };

  /**
   * Gets the domain of given url
   * @param {string} url
   * @returns {string}
   */
  abp.utils.getDomain = function ( url ) {
    var domainRegex = /(https?:){0,1}\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;
    var matches = domainRegex.exec( url );
    return matches && matches[2] ? matches[2] : "";
  };
  /**
   * 判断是否是数组
   * @param {Array}
   * @returns {Boolean}
   */
  // abp.utils._isArray = value => {
  //   if (Array.prototype.isArray) {
  //     return Array.isArray(value);
  //   } else {
  //     return Object.prototype.toString.call(value) === "[object Array]";
  //   }
  // };
  /* SECURITY ***************************************/
  abp.security = abp.security || {};
  abp.security.antiForgery = abp.security.antiForgery || {};

  abp.security.antiForgery.tokenCookieName = "XSRF-TOKEN";
  abp.security.antiForgery.tokenHeaderName = "X-XSRF-TOKEN";

  abp.security.antiForgery.getToken = function () {
    return abp.utils.getCookieValue( abp.security.antiForgery.tokenCookieName );
  };

  abp.security.antiForgery.shouldSendToken = function ( settings ) {
    if ( settings.crossDomain === undefined || settings.crossDomain === null ) {
      return (
        abp.utils.getDomain( location.href ) === abp.utils.getDomain( settings.url )
      );
    }

    return !settings.crossDomain;
  };
} )();
