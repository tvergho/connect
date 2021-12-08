import { asyncToGenerator as _asyncToGenerator } from './_virtual/_rollupPluginBabelHelpers.js';
import _regeneratorRuntime from 'regenerator-runtime';
import { AppConfig, UserSession } from '@stacks/auth';
import { decodeToken } from 'jsontokens';
import { getStacksProvider } from './utils.esm.js';

var defaultAuthURL = "https://app.blockstack.org";
var version = "6.2.0";

if (typeof window !== "undefined") {
  window.__CONNECT_VERSION__ = version;
}

var isMobile = function isMobile() {
  var ua = navigator.userAgent;

  if (/android/i.test(ua)) {
    return true;
  }

  if (/iPad|iPhone|iPod/.test(ua)) {
    return true;
  }

  return /windows phone/i.test(ua);
};
var shouldUsePopup = function shouldUsePopup() {
  return !isMobile();
};
var getOrCreateUserSession = function getOrCreateUserSession(userSession) {
  if (!userSession) {
    var appConfig = new AppConfig(["store_write"], document.location.href);
    userSession = new UserSession({
      appConfig: appConfig
    });
  }

  return userSession;
};
var authenticate = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(authOptions) {
    var provider, _authOptions$redirect, redirectTo, manifestPath, onFinish, onCancel, _authOptions$sendToSi, sendToSignIn, _userSession, appDetails, userSession, transitKey, authRequest, authResponse, token, payload, authResponsePayload;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            provider = getStacksProvider();

            if (provider) {
              _context.next = 3;
              break;
            }

            throw new Error("Unable to authenticate without Hiro Wallet extension");

          case 3:
            _authOptions$redirect = authOptions.redirectTo, redirectTo = _authOptions$redirect === void 0 ? "/" : _authOptions$redirect, manifestPath = authOptions.manifestPath, onFinish = authOptions.onFinish, onCancel = authOptions.onCancel, _authOptions$sendToSi = authOptions.sendToSignIn, sendToSignIn = _authOptions$sendToSi === void 0 ? false : _authOptions$sendToSi, _userSession = authOptions.userSession, appDetails = authOptions.appDetails;
            userSession = getOrCreateUserSession(_userSession);

            if (userSession.isUserSignedIn()) {
              userSession.signUserOut();
            }

            transitKey = userSession.generateAndStoreTransitKey();
            authRequest = userSession.makeAuthRequest(transitKey, "" + document.location.origin + redirectTo, "" + document.location.origin + manifestPath, userSession.appConfig.scopes, void 0, void 0, {
              sendToSignIn: sendToSignIn,
              appDetails: appDetails,
              connectVersion: version
            });
            _context.prev = 8;
            _context.next = 11;
            return provider.authenticationRequest(authRequest);

          case 11:
            authResponse = _context.sent;
            _context.next = 14;
            return userSession.handlePendingSignIn(authResponse);

          case 14:
            token = decodeToken(authResponse);
            payload = token == null ? void 0 : token.payload;
            authResponsePayload = payload;
            onFinish == null ? void 0 : onFinish({
              authResponse: authResponse,
              authResponsePayload: authResponsePayload,
              userSession: userSession
            });
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](8);
            console.error("[Connect] Error during auth request", _context.t0);
            onCancel == null ? void 0 : onCancel();

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 20]]);
  }));

  return function authenticate(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getUserData = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(userSession) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userSession = getOrCreateUserSession(userSession);

            if (!userSession.isUserSignedIn()) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", userSession.loadUserData());

          case 3:
            if (!userSession.isSignInPending()) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", userSession.handlePendingSignIn());

          case 5:
            return _context2.abrupt("return", null);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUserData(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

export { authenticate, defaultAuthURL, getOrCreateUserSession, getUserData, isMobile, shouldUsePopup };
//# sourceMappingURL=auth.esm.js.map
