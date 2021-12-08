'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('regenerator-runtime'));
var auth = require('@stacks/auth');
var jsontokens = require('jsontokens');
var transactions = require('@stacks/transactions');
var network = require('@stacks/network');
var loader = require('@stacks/connect-ui/loader');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function getStacksProvider() {
  return window.StacksProvider || window.BlockstackProvider;
}
function isStacksWalletInstalled() {
  return !!getStacksProvider();
}

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
    var appConfig = new auth.AppConfig(["store_write"], document.location.href);
    userSession = new auth.UserSession({
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
            token = jsontokens.decodeToken(authResponse);
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

(function (TransactionTypes2) {
  TransactionTypes2["ContractCall"] = "contract_call";
  TransactionTypes2["ContractDeploy"] = "smart_contract";
  TransactionTypes2["STXTransfer"] = "token_transfer";
})(exports.TransactionTypes || (exports.TransactionTypes = {}));

(function (ContractCallArgumentType2) {
  ContractCallArgumentType2["BUFFER"] = "buffer";
  ContractCallArgumentType2["UINT"] = "uint";
  ContractCallArgumentType2["INT"] = "int";
  ContractCallArgumentType2["PRINCIPAL"] = "principal";
  ContractCallArgumentType2["BOOL"] = "bool";
})(exports.ContractCallArgumentType || (exports.ContractCallArgumentType = {}));

var _excluded = ["functionArgs", "appDetails", "userSession"],
    _excluded2 = ["appDetails", "userSession"],
    _excluded3 = ["amount", "appDetails", "userSession"];

var getUserSession = function getUserSession(_userSession) {
  var userSession = _userSession;

  if (!userSession) {
    var appConfig = new auth.AppConfig(["store_write"], document.location.href);
    userSession = new auth.UserSession({
      appConfig: appConfig
    });
  }

  return userSession;
};

var getKeys = function getKeys(_userSession) {
  var userSession = getUserSession(_userSession);
  var privateKey = userSession.loadUserData().appPrivateKey;
  var publicKey = jsontokens.SECP256K1Client.derivePublicKey(privateKey);
  return {
    privateKey: privateKey,
    publicKey: publicKey
  };
};

function getStxAddress(options) {
  var _userSession$loadUser, _chainIdToKey;

  var stxAddress = options.stxAddress,
      userSession = options.userSession,
      network = options.network;
  if (stxAddress) return stxAddress;
  if (!userSession || !network) return void 0;
  var stxAddresses = userSession == null ? void 0 : (_userSession$loadUser = userSession.loadUserData().profile) == null ? void 0 : _userSession$loadUser.stxAddress;
  var chainIdToKey = (_chainIdToKey = {}, _chainIdToKey[transactions.ChainID.Mainnet] = "mainnet", _chainIdToKey[transactions.ChainID.Testnet] = "testnet", _chainIdToKey);
  var address = stxAddresses == null ? void 0 : stxAddresses[chainIdToKey[network.chainId]];
  return address;
}

function getDefaults(options) {
  var network$1 = options.network || new network.StacksTestnet();
  var userSession = getUserSession(options.userSession);

  var defaults = _extends({}, options, {
    network: network$1,
    userSession: userSession
  });

  return _extends({
    stxAddress: getStxAddress(defaults)
  }, defaults);
}

var signPayload = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(payload, privateKey) {
    var postConditions, tokenSigner;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            postConditions = payload.postConditions;

            if (postConditions && typeof postConditions[0] !== "string") {
              postConditions = postConditions.map(function (pc) {
                return transactions.serializePostCondition(pc).toString("hex");
              });
            }

            tokenSigner = new jsontokens.TokenSigner("ES256k", privateKey);
            return _context.abrupt("return", tokenSigner.signAsync(_extends({}, payload, {
              postConditions: postConditions
            })));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signPayload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var openTransactionPopup = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(_ref2) {
    var token, options, provider, txResponse, txRaw, txBuffer, stacksTransaction;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = _ref2.token, options = _ref2.options;
            provider = getStacksProvider();

            if (provider) {
              _context2.next = 4;
              break;
            }

            throw new Error("Hiro Wallet not installed.");

          case 4:
            _context2.prev = 4;
            _context2.next = 7;
            return provider.transactionRequest(token);

          case 7:
            txResponse = _context2.sent;
            txRaw = txResponse.txRaw;
            txBuffer = Buffer.from(txRaw.replace(/^0x/, ""), "hex");
            stacksTransaction = transactions.deserializeTransaction(new transactions.BufferReader(txBuffer));

            if (!("sponsored" in options && options.sponsored)) {
              _context2.next = 14;
              break;
            }

            options.onFinish == null ? void 0 : options.onFinish(_extends({}, txResponse, {
              stacksTransaction: stacksTransaction
            }));
            return _context2.abrupt("return");

          case 14:
            options.onFinish == null ? void 0 : options.onFinish(_extends({}, txResponse, {
              stacksTransaction: stacksTransaction
            }));
            _context2.next = 21;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](4);
            console.error("[Connect] Error during transaction request", _context2.t0);
            options.onCancel == null ? void 0 : options.onCancel();

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 17]]);
  }));

  return function openTransactionPopup(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var makeContractCallToken = /*#__PURE__*/function () {
  var _ref4 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(options) {
    var functionArgs, appDetails, userSession, _options, _getKeys, privateKey, publicKey, args, payload;

    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            functionArgs = options.functionArgs, appDetails = options.appDetails, userSession = options.userSession, _options = _objectWithoutPropertiesLoose(options, _excluded);
            _getKeys = getKeys(userSession), privateKey = _getKeys.privateKey, publicKey = _getKeys.publicKey;
            args = functionArgs.map(function (arg) {
              if (typeof arg === "string") {
                return arg;
              }

              return transactions.serializeCV(arg).toString("hex");
            });
            payload = _extends({}, _options, {
              functionArgs: args,
              txType: exports.TransactionTypes.ContractCall,
              publicKey: publicKey
            });

            if (appDetails) {
              payload.appDetails = appDetails;
            }

            return _context3.abrupt("return", signPayload(payload, privateKey));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function makeContractCallToken(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var makeContractDeployToken = /*#__PURE__*/function () {
  var _ref5 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(options) {
    var appDetails, userSession, _options, _getKeys2, privateKey, publicKey, payload;

    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            appDetails = options.appDetails, userSession = options.userSession, _options = _objectWithoutPropertiesLoose(options, _excluded2);
            _getKeys2 = getKeys(userSession), privateKey = _getKeys2.privateKey, publicKey = _getKeys2.publicKey;
            payload = _extends({}, _options, {
              publicKey: publicKey,
              txType: exports.TransactionTypes.ContractDeploy
            });

            if (appDetails) {
              payload.appDetails = appDetails;
            }

            return _context4.abrupt("return", signPayload(payload, privateKey));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function makeContractDeployToken(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
var makeSTXTransferToken = /*#__PURE__*/function () {
  var _ref6 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(options) {
    var amount, appDetails, userSession, _options, _getKeys3, privateKey, publicKey, payload;

    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            amount = options.amount, appDetails = options.appDetails, userSession = options.userSession, _options = _objectWithoutPropertiesLoose(options, _excluded3);
            _getKeys3 = getKeys(userSession), privateKey = _getKeys3.privateKey, publicKey = _getKeys3.publicKey;
            payload = _extends({}, _options, {
              amount: amount.toString(10),
              publicKey: publicKey,
              txType: exports.TransactionTypes.STXTransfer
            });

            if (appDetails) {
              payload.appDetails = appDetails;
            }

            return _context5.abrupt("return", signPayload(payload, privateKey));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function makeSTXTransferToken(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

function generateTokenAndOpenPopup(_x7, _x8) {
  return _generateTokenAndOpenPopup.apply(this, arguments);
}

function _generateTokenAndOpenPopup() {
  _generateTokenAndOpenPopup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(options, makeTokenFn) {
    var token;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return makeTokenFn(_extends({}, getDefaults(options), options));

          case 2:
            token = _context6.sent;
            return _context6.abrupt("return", openTransactionPopup({
              token: token,
              options: options
            }));

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _generateTokenAndOpenPopup.apply(this, arguments);
}

function openContractCall(options) {
  return generateTokenAndOpenPopup(options, makeContractCallToken);
}
function openContractDeploy(options) {
  return generateTokenAndOpenPopup(options, makeContractDeployToken);
}
function openSTXTransfer(options) {
  return generateTokenAndOpenPopup(options, makeSTXTransferToken);
}

var showConnect = function showConnect(authOptions) {
  if (getStacksProvider()) {
    void authenticate(authOptions);
    return;
  }

  if (typeof window !== void 0) {
    void loader.defineCustomElements(window);
    var element = document.createElement("connect-modal");
    element.authOptions = authOptions;
    document.body.appendChild(element);

    var handleEsc = function handleEsc(ev) {
      if (ev.key === "Escape") {
        document.removeEventListener("keydown", handleEsc);
        element.remove();
      }
    };

    document.addEventListener("keydown", handleEsc);
  }
};
var showBlockstackConnect = function showBlockstackConnect(authOptions) {
  return showConnect(authOptions);
};

Object.keys(auth).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return auth[k];
    }
  });
});
exports.authenticate = authenticate;
exports.defaultAuthURL = defaultAuthURL;
exports.getOrCreateUserSession = getOrCreateUserSession;
exports.getStacksProvider = getStacksProvider;
exports.getUserData = getUserData;
exports.isMobile = isMobile;
exports.isStacksWalletInstalled = isStacksWalletInstalled;
exports.makeContractCallToken = makeContractCallToken;
exports.makeContractDeployToken = makeContractDeployToken;
exports.makeSTXTransferToken = makeSTXTransferToken;
exports.openContractCall = openContractCall;
exports.openContractDeploy = openContractDeploy;
exports.openSTXTransfer = openSTXTransfer;
exports.shouldUsePopup = shouldUsePopup;
exports.showBlockstackConnect = showBlockstackConnect;
exports.showConnect = showConnect;
//# sourceMappingURL=connect.cjs.development.js.map
