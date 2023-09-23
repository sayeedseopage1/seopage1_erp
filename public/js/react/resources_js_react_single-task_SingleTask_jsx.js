"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_single-task_SingleTask_jsx"],{

/***/ "./resources/js/react/file-upload/FileUploader.jsx":
/*!*********************************************************!*\
  !*** ./resources/js/react/file-upload/FileUploader.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _file_upload_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-upload.css */ "./resources/js/react/file-upload/file-upload.css");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button */ "./resources/js/react/file-upload/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var _excluded = ["id", "deleteAble", "onRemove", "downloadAble", "downloadUrl", "fileType", "fileName", "previewUrl", "ext", "classname", "size"];
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var FileUploaderContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext();

// render icon
var RenderIcon = function RenderIcon(_ref) {
  var filename = _ref.filename,
    size = _ref.size;
  // get ext
  var arr = filename.split(".");
  var ext = arr[arr.length - 1];
  var _filename = (filename === null || filename === void 0 ? void 0 : filename.slice(0, 2)) + ".." + (filename === null || filename === void 0 ? void 0 : filename.slice(filename.length - (ext.length + 2), filename === null || filename === void 0 ? void 0 : filename.length));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "uploaded-file-preview",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: filename,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "__icon",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "currentColor",
        viewBox: "0 0 16 16",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
          d: "M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "uploaded-file-ext uploaded-file-ext-".concat(size),
        children: ext === null || ext === void 0 ? void 0 : ext.slice(0, 3)
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: "d-block uploaded-file-name uploaded-file-name-".concat(size),
      children: _filename
    })]
  });
};

// file input
var FileInput = function FileInput(_ref2) {
  var _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "" : _ref2$className;
  var _React$useContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FileUploaderContext),
    setFiles = _React$useContext.setFiles,
    previews = _React$useContext.previews,
    setPreviews = _React$useContext.setPreviews;
  var handleFileUpload = function handleFileUpload(e) {
    var uploadedFiles = e.target.files;
    setFiles(function (prev) {
      return [].concat(_toConsumableArray(prev), _toConsumableArray(uploadedFiles));
    });
    var filePreviews = [];
    var _loop = function _loop(i) {
      var reader = new FileReader();
      var file = uploadedFiles[i];
      reader.onload = function (event) {
        var arr = file.name.split(".");
        var ext = arr[arr.length - 1];
        filePreviews.push({
          name: file.name,
          type: file.type,
          preview: event.target.result,
          ext: ext
        });
        if (filePreviews.length === uploadedFiles.length) {
          setPreviews([].concat(_toConsumableArray(previews), filePreviews));
        }
      };
      reader.readAsDataURL(file);
    };
    for (var i = 0; i < uploadedFiles.length; i++) {
      _loop(i);
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "sp1_file_upload--input-wrapper ".concat(className),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
      type: "file",
      multiple: true,
      onChange: handleFileUpload,
      className: "sp1_file_upload--input"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
      className: "fa-solid fa-cloud-arrow-up"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      className: "mt-2",
      children: "Upload Files"
    })]
  });
};

// previews
var FilePreview = function FilePreview(_ref3) {
  var id = _ref3.id,
    _ref3$deleteAble = _ref3.deleteAble,
    deleteAble = _ref3$deleteAble === void 0 ? true : _ref3$deleteAble,
    onRemove = _ref3.onRemove,
    _ref3$downloadAble = _ref3.downloadAble,
    downloadAble = _ref3$downloadAble === void 0 ? true : _ref3$downloadAble,
    _ref3$downloadUrl = _ref3.downloadUrl,
    downloadUrl = _ref3$downloadUrl === void 0 ? "#" : _ref3$downloadUrl,
    _ref3$fileType = _ref3.fileType,
    fileType = _ref3$fileType === void 0 ? "" : _ref3$fileType,
    _ref3$fileName = _ref3.fileName,
    fileName = _ref3$fileName === void 0 ? "" : _ref3$fileName,
    _ref3$previewUrl = _ref3.previewUrl,
    previewUrl = _ref3$previewUrl === void 0 ? "" : _ref3$previewUrl,
    _ref3$ext = _ref3.ext,
    ext = _ref3$ext === void 0 ? "" : _ref3$ext,
    _ref3$classname = _ref3.classname,
    classname = _ref3$classname === void 0 ? "" : _ref3$classname,
    _ref3$size = _ref3.size,
    size = _ref3$size === void 0 ? "sm" : _ref3$size,
    props = _objectWithoutProperties(_ref3, _excluded);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
    href: downloadUrl,
    download: downloadAble,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", _objectSpread(_objectSpread({
      className: "sp1_file_upload--input-preview"
    }, props), {}, {
      children: [deleteAble && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
        type: "button",
        onClick: function onClick(e) {
          e.stopPropagation();
          onRemove(e, id);
        },
        className: "__remove--btn",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
          className: "fa-regular fa-trash-can"
        })
      }), fileType === "images" || fileType.startsWith('image/') ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
        src: previewUrl,
        alt: fileName,
        style: {
          width: "100%",
          height: "100%",
          maxWidth: "80px",
          maxHeight: "80px",
          objectFit: "fill"
        }
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(RenderIcon, {
        filename: fileName,
        size: size
      })]
    }))
  });
};

// uploaded file previews
var SelectedFilePreveiw = function SelectedFilePreveiw(_ref4) {
  var children = _ref4.children;
  var _React$useContext2 = react__WEBPACK_IMPORTED_MODULE_0__.useContext(FileUploaderContext),
    previews = _React$useContext2.previews,
    files = _React$useContext2.files,
    setFiles = _React$useContext2.setFiles,
    setPreviews = _React$useContext2.setPreviews;
  var onDelete = function onDelete(e, index) {
    // e.stopPropagation();
    var updatePreview = _toConsumableArray(previews);
    var updatedFiles = _toConsumableArray(files);
    updatedFiles.splice(index, 1);
    updatePreview.splice(index, 1);
    setFiles(updatedFiles);
    setPreviews(updatePreview);
  };
  return children({
    previews: previews,
    onDelete: onDelete
  });
};

// file uploader
var FileUploader = function FileUploader(_ref5) {
  var files = _ref5.files,
    setFiles = _ref5.setFiles,
    children = _ref5.children,
    _ref5$className = _ref5.className,
    className = _ref5$className === void 0 ? "" : _ref5$className;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(""),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    previews = _React$useState2[0],
    setPreviews = _React$useState2[1];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(FileUploaderContext.Provider, {
    value: {
      files: files,
      setFiles: setFiles,
      previews: previews,
      setPreviews: setPreviews
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "d-flex flex-wrap align-items-center ".concat(className),
      style: {
        gap: "10px"
      },
      children: children
    })
  });
};
FileUploader.Input = FileInput;
FileUploader.Preview = FilePreview;
FileUploader.SelectedFiles = SelectedFilePreveiw;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileUploader);

/***/ }),

/***/ "./resources/js/react/global/Rating.jsx":
/*!**********************************************!*\
  !*** ./resources/js/react/global/Rating.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var Rating = function Rating(_ref) {
  var rating = _ref.rating,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$iconClassName = _ref.iconClassName,
    iconClassName = _ref$iconClassName === void 0 ? '' : _ref$iconClassName;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: _toConsumableArray(Array(5)).map(function (r, idx) {
      return idx <= parseInt(rating) - 1 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i", {
        className: "fa-solid fa-star",
        style: {
          color: '#FFA500'
        }
      }, idx) : rating - parseInt(rating) > 0 && idx === parseInt(rating) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i", {
        className: "fa-solid fa-star-half-stroke",
        style: {
          color: '#FFA500'
        }
      }, idx) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i", {
        className: "fa-regular fa-star",
        style: {
          color: '#b9b9b9'
        }
      }, idx);
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rating);

/***/ }),

/***/ "./resources/js/react/hooks/useRevision.jsx":
/*!**************************************************!*\
  !*** ./resources/js/react/hooks/useRevision.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useRevision": () => (/* binding */ useRevision)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var useRevision = function useRevision() {
  // project menager acknowladgement options
  var getProjectManagerAcknowladgementOptions = function getProjectManagerAcknowladgementOptions() {
    var isAlreadyAccepted = false;
    if (isAlreadyAccepted) {
      return [];
    }
    return [{
      id: 'PLRx01',
      revision: "My instruction was incomplete/incorrect and I have to make some changes in the instruction now to make it right",
      isDeniable: false
    }, {
      id: 'PLRx02',
      revision: "The work done is aligned with my instruction, but after seeing it, I want to give some minor changes",
      isDeniable: false
    }, {
      id: 'PLRx3',
      revision: "The team lead/project coordinator’s delivered work doesn’t match my shared requirement",
      isDeniable: true
    }, {
      id: 'PLRx04',
      revision: "The instruction was followed, but the lead developer missed out some default/basic things or best practices which are not essential to write in instruction",
      isDeniable: true
    }];
  };

  // lead developer acknowladgement Options
  var getLeadDeveloperAcknowladgementOptions = function getLeadDeveloperAcknowladgementOptions() {
    var isAlreadyAccepted = false;
    // if alreayd accepted 
    if (isAlreadyAccepted) {
      return [];
    } else {
      return [{
        id: 'LDRx1',
        revision: "The concerned developer’s delivered work doesn’t match my shared requirement",
        isDeniable: true
      }, {
        id: 'LDRx2',
        revision: "My instruction was incomplete/incorrect and I have to make some changes in the instruction now to make it right.",
        isDeniable: false
      }, {
        id: 'LDRx3',
        revision: "The work done is aligned with my instruction but after seeing it, I want to give some minor changes.",
        isDeniable: false
      }, {
        id: 'LDRx4',
        revision: "The instruction was followed but the developer missed out on some default/basic things or best practices which are not essential to mention in instruction.",
        isDeniable: true
      }];
    }
  };
  return {
    getLeadDeveloperAcknowladgementOptions: getLeadDeveloperAcknowladgementOptions,
    getProjectManagerAcknowladgementOptions: getProjectManagerAcknowladgementOptions
  };
};

/***/ }),

/***/ "./resources/js/react/hooks/useSingleTask.jsx":
/*!****************************************************!*\
  !*** ./resources/js/react/hooks/useSingleTask.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useSingleTask": () => (/* binding */ useSingleTask)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/user-details */ "./resources/js/react/utils/user-details.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var useSingleTask = function useSingleTask() {
  var _window, _window$Laravel;
  var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_3__.User((_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user);

  /* ********************************** */
  /* ********* Get Task by task ID ********* */
  var _useLazyGetTaskDetail = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_2__.useLazyGetTaskDetailsQuery)(),
    _useLazyGetTaskDetail2 = _slicedToArray(_useLazyGetTaskDetail, 2),
    getTaskDetails = _useLazyGetTaskDetail2[0],
    taskDetailsIsFetching = _useLazyGetTaskDetail2[1].isFetching;
  var getTaskById = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(taskId) {
      var res, _res$parent_task_head, task;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return getTaskDetails("/".concat(taskId, "/json?mode=basic")).unwrap();
            case 3:
              res = _context.sent;
              if (!res) {
                _context.next = 7;
                break;
              }
              task = _objectSpread(_objectSpread({}, res.task), {}, {
                parent_task_action: res.parent_task_action,
                parent_task_title: ((_res$parent_task_head = res.parent_task_heading) === null || _res$parent_task_head === void 0 ? void 0 : _res$parent_task_head.heading) || null,
                working_environment: res.working_environment,
                working_environment_data: res.working_environment_data,
                pm_task_guideline: res.task_guideline,
                task_revisions: res.revisions,
                taskSubTask: res.Sub_Tasks
              });
              return _context.abrupt("return", task);
            case 7:
              _context.next = 12;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));
    return function getTaskById(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  /* *************************************************** */
  /* ********* Get Task submittion Information ********* */

  var _useLazyGetSubmittedT = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_2__.useLazyGetSubmittedTaskQuery)(),
    _useLazyGetSubmittedT2 = _slicedToArray(_useLazyGetSubmittedT, 2),
    getSubmittedTask = _useLazyGetSubmittedT2[0],
    submittionInfoIsFetching = _useLazyGetSubmittedT2[1].isFetching;

  // method
  var getSubmittionInfo = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(taskId) {
      var res, data;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return getSubmittedTask(taskId).unwrap();
            case 3:
              res = _context2.sent;
              if (!res) {
                _context2.next = 7;
                break;
              }
              data = lodash__WEBPACK_IMPORTED_MODULE_1___default().orderBy(res, ['task_id', 'submission_no'], ['desc', 'desc']);
              return _context2.abrupt("return", data);
            case 7:
              _context2.next = 12;
              break;
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));
    return function getSubmittionInfo(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  /* ********************************** */
  /* ********* Approved Task ********* */
  var _useApproveSubmittedT = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_2__.useApproveSubmittedTaskMutation)(),
    _useApproveSubmittedT2 = _slicedToArray(_useApproveSubmittedT, 2),
    approveSubmittedTask = _useApproveSubmittedT2[0],
    approveTaskLoadingStatus = _useApproveSubmittedT2[1].isLoading;

  // method
  var approveTask = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data, callback) {
      var res, Toast;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!data || lodash__WEBPACK_IMPORTED_MODULE_1___default().isEmpty(data))) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return");
            case 2:
              _context3.prev = 2;
              _context3.next = 5;
              return approveSubmittedTask(data).unwrap();
            case 5:
              res = _context3.sent;
              if (res) {
                callback && callback();
                Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true
                });
                Toast.fire({
                  icon: 'success',
                  title: 'Task Approved Successfully'
                });
              }
              _context3.next = 12;
              break;
            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](2);
              console.log(_context3.t0);
            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 9]]);
    }));
    return function approveTask(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();
  return {
    getTaskById: getTaskById,
    approveTask: approveTask,
    getSubmittionInfo: getSubmittionInfo,
    taskDetailsIsFetching: taskDetailsIsFetching,
    approveTaskLoadingStatus: approveTaskLoadingStatus,
    submittionInfoIsFetching: submittionInfoIsFetching
  };
};

/***/ }),

/***/ "./resources/js/react/single-task/SingleTask.jsx":
/*!*******************************************************!*\
  !*** ./resources/js/react/single-task/SingleTask.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Accordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Accordion */ "./resources/js/react/single-task/components/Accordion.jsx");
/* harmony import */ var _components_Guideline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Guideline */ "./resources/js/react/single-task/components/Guideline.jsx");
/* harmony import */ var _components_RevisionText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/RevisionText */ "./resources/js/react/single-task/components/RevisionText.jsx");
/* harmony import */ var _section_comments_CommentsSection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./section/comments/CommentsSection */ "./resources/js/react/single-task/section/comments/CommentsSection.jsx");
/* harmony import */ var _section_sub_task_SubTaskSection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./section/sub-task/SubTaskSection */ "./resources/js/react/single-task/section/sub-task/SubTaskSection.jsx");
/* harmony import */ var _section_notes_NoteSection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./section/notes/NoteSection */ "./resources/js/react/single-task/section/notes/NoteSection.jsx");
/* harmony import */ var _section_submitted_work_SubmittedWork__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./section/submitted-work/SubmittedWork */ "./resources/js/react/single-task/section/submitted-work/SubmittedWork.jsx");
/* harmony import */ var _section_time_logs_TimeLogSection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./section/time-logs/TimeLogSection */ "./resources/js/react/single-task/section/time-logs/TimeLogSection.jsx");
/* harmony import */ var _section_history_historySection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./section/history/historySection */ "./resources/js/react/single-task/section/history/historySection.jsx");
/* harmony import */ var _section_revisions_RevisionSection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./section/revisions/RevisionSection */ "./resources/js/react/single-task/section/revisions/RevisionSection.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _section_task_actions_TaskAction__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./section/task-actions/TaskAction */ "./resources/js/react/single-task/section/task-actions/TaskAction.jsx");
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/Loading */ "./resources/js/react/single-task/components/Loading.jsx");
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _components_loader_GenarelLoader__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/loader/GenarelLoader */ "./resources/js/react/single-task/components/loader/GenarelLoader.jsx");
/* harmony import */ var _components_PMGuideline__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/PMGuideline */ "./resources/js/react/single-task/components/PMGuideline.jsx");
/* harmony import */ var _global_Toaster__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../global/Toaster */ "./resources/js/react/global/Toaster.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



























var SingleTaskPage = function SingleTaskPage() {
  var _window, _window$Laravel, _task$assigneeTo, _task$assigneeTo2, _task$assigneeTo3, _task$assigneeTo4, _task$assigneeTo5, _task$assigneeTo6, _task$assigneeBy, _task$assigneeBy2, _task$assigneeBy3, _task$assigneeBy4, _task$assigneeBy5, _task$assigneeBy6, _task$category, _task$workEnvData, _task$workEnvData2, _task$workEnvData3, _task$workEnvData4, _task$workEnvData5, _$last;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_14__.useSelector)(function (s) {
      return s.subTask;
    }),
    Task = _useSelector.task;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_14__.useDispatch)();
  var params = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_24__.useParams)();
  var _useGetTaskDetailsQue = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_11__.useGetTaskDetailsQuery)("/".concat(params === null || params === void 0 ? void 0 : params.taskId, "/json?mode=basic"), {
      refetchOnMountOrArgChange: true
    }),
    data = _useGetTaskDetailsQue.data,
    isFetching = _useGetTaskDetailsQue.isFetching;
  var _useGetTaskStatusQuer = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_11__.useGetTaskStatusQuery)(params === null || params === void 0 ? void 0 : params.taskId),
    taskStatus = _useGetTaskStatusQuer.data;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (data) {
      var _data$parent_task_hea;
      var _task = _objectSpread(_objectSpread({}, data === null || data === void 0 ? void 0 : data.task), {}, {
        parent_task_title: (data === null || data === void 0 ? void 0 : (_data$parent_task_hea = data.parent_task_heading) === null || _data$parent_task_hea === void 0 ? void 0 : _data$parent_task_hea.heading) || null,
        parent_task_action: data === null || data === void 0 ? void 0 : data.parent_task_action,
        subtask: data === null || data === void 0 ? void 0 : data.subtasks,
        working_environment: data === null || data === void 0 ? void 0 : data.working_environment,
        working_environment_data: data === null || data === void 0 ? void 0 : data.working_environment_data,
        pm_task_guideline: data === null || data === void 0 ? void 0 : data.task_guideline,
        task_revisions: data === null || data === void 0 ? void 0 : data.revisions,
        taskSubTask: data === null || data === void 0 ? void 0 : data.Sub_Tasks
      });
      dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_15__.storeTask)(_task));
    }
  }, [data]);
  var loadingClass = isFetching ? "skeleton-loading" : "";
  var loggedUser = new _utils_user_details__WEBPACK_IMPORTED_MODULE_19__.User((_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user);
  var task = new _utils_single_task__WEBPACK_IMPORTED_MODULE_18__.SingleTask(Task);
  if (isFetching) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_components_Loading__WEBPACK_IMPORTED_MODULE_17__["default"], {
      isLoading: isFetching
    });
  }
  var _taskStatus = new _utils_single_task__WEBPACK_IMPORTED_MODULE_18__.BoardColumn(taskStatus);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
    className: "postion-relative",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
      className: "f-16 mb-3 ".concat(loadingClass),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("span", {
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("strong", {
          children: "Task: "
        }), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("a", {
        href: "/account/tasks/".concat(task === null || task === void 0 ? void 0 : task.id),
        children: task === null || task === void 0 ? void 0 : task.getSubtaskTitle()
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
      className: "row",
      children: [isFetching ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_components_loader_GenarelLoader__WEBPACK_IMPORTED_MODULE_20__["default"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
          className: "col-12 col-md-7 col-lg-8 mb-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
            className: "bg-white rounded-lg p-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_section_task_actions_TaskAction__WEBPACK_IMPORTED_MODULE_16__["default"], {
              task: task,
              status: taskStatus
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                className: "d-flex flex-column py-3",
                style: {
                  gap: '10px'
                },
                children: [(task === null || task === void 0 ? void 0 : task.isSubtask) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                  className: "sp1_st-list-item",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                    className: "sp1_st-list-item-head",
                    children: " Parent Task: "
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                    className: "sp1_st-list-item-value",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("a", {
                      href: "/account/tasks/".concat(task === null || task === void 0 ? void 0 : task.parentTaskId),
                      className: "text-dark text-hover-underline",
                      children: task === null || task === void 0 ? void 0 : task.parentTaskTitle
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                  className: "sp1_st-list-item",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                    className: "sp1_st-list-item-head",
                    children: "Project : "
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                    className: "sp1_st-list-item-value",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("span", {
                      className: "dot-color bg-danger mr-2"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("a", {
                      href: "/account/projects/".concat(task === null || task === void 0 ? void 0 : task.projectId),
                      className: "text-dark text-hover-underline",
                      children: task === null || task === void 0 ? void 0 : task.projectName
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                  className: "sp1_st-list-item",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                    className: "sp1_st-list-item-head",
                    children: ["Milestone :", " "]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                    className: "sp1_st-list-item-value",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("span", {
                      className: "dot-color bg-primary mr-2"
                    }), task === null || task === void 0 ? void 0 : task.milestoneTitle]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                  className: "sp1_st-list-item",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                    className: "sp1_st-list-item-head",
                    children: ["Assigned To :", " "]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                    className: "sp1_st-list-item-value",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                      style: {
                        width: "32px",
                        height: "32px"
                      },
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("img", {
                        src: task === null || task === void 0 ? void 0 : (_task$assigneeTo = task.assigneeTo) === null || _task$assigneeTo === void 0 ? void 0 : _task$assigneeTo.getAvatar(),
                        alt: task === null || task === void 0 ? void 0 : (_task$assigneeTo2 = task.assigneeTo) === null || _task$assigneeTo2 === void 0 ? void 0 : _task$assigneeTo2.getName(),
                        width: "32px",
                        height: "32px",
                        className: "rounded-circle"
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                      className: "ml-2",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("span", {
                        className: "d-block f-14 font-weight-bold",
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("a", {
                          href: task === null || task === void 0 ? void 0 : (_task$assigneeTo3 = task.assigneeTo) === null || _task$assigneeTo3 === void 0 ? void 0 : _task$assigneeTo3.getUserLink(),
                          className: "text-dark hover-underline",
                          children: task === null || task === void 0 ? void 0 : (_task$assigneeTo4 = task.assigneeTo) === null || _task$assigneeTo4 === void 0 ? void 0 : _task$assigneeTo4.getName()
                        }), Number(task === null || task === void 0 ? void 0 : (_task$assigneeTo5 = task.assigneeTo) === null || _task$assigneeTo5 === void 0 ? void 0 : _task$assigneeTo5.getId()) === Number(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.getId()) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("sup", {
                          className: "rounded-pill bg-dark text-white px-1 ml-1",
                          style: {
                            fontSize: "10px",
                            whiteSpace: 'nowrap'
                          },
                          children: "It's You"
                        })]
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("span", {
                        style: {
                          fontSize: "12px"
                        },
                        children: task === null || task === void 0 ? void 0 : (_task$assigneeTo6 = task.assigneeTo) === null || _task$assigneeTo6 === void 0 ? void 0 : _task$assigneeTo6.getDesignationName()
                      })]
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                  className: "sp1_st-list-item",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                    className: "sp1_st-list-item-head",
                    children: ["Assigned by:", " "]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                    className: "sp1_st-list-item-value",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                      style: {
                        width: "32px",
                        height: "32px"
                      },
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("img", {
                        src: task === null || task === void 0 ? void 0 : (_task$assigneeBy = task.assigneeBy) === null || _task$assigneeBy === void 0 ? void 0 : _task$assigneeBy.getAvatar(),
                        alt: task === null || task === void 0 ? void 0 : (_task$assigneeBy2 = task.assigneeBy) === null || _task$assigneeBy2 === void 0 ? void 0 : _task$assigneeBy2.getName(),
                        width: "32px",
                        height: "32px",
                        className: "rounded-circle"
                      })
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                      className: "ml-2",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("span", {
                        className: "d-block f-14 font-weight-bold",
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("a", {
                          href: task === null || task === void 0 ? void 0 : (_task$assigneeBy3 = task.assigneeBy) === null || _task$assigneeBy3 === void 0 ? void 0 : _task$assigneeBy3.getUserLink(),
                          className: "text-dark hover-underline",
                          children: task === null || task === void 0 ? void 0 : (_task$assigneeBy4 = task.assigneeBy) === null || _task$assigneeBy4 === void 0 ? void 0 : _task$assigneeBy4.getName()
                        }), Number(task === null || task === void 0 ? void 0 : (_task$assigneeBy5 = task.assigneeBy) === null || _task$assigneeBy5 === void 0 ? void 0 : _task$assigneeBy5.getId()) === Number(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.getId()) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("sup", {
                          className: "rounded-pill bg-dark text-white px-1",
                          style: {
                            fontSize: "10px"
                          },
                          children: "It's You"
                        })]
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("span", {
                        style: {
                          fontSize: "12px"
                        },
                        children: task === null || task === void 0 ? void 0 : (_task$assigneeBy6 = task.assigneeBy) === null || _task$assigneeBy6 === void 0 ? void 0 : _task$assigneeBy6.getDesignationName()
                      })]
                    })]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                  className: "sp1_st-list-item",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                    className: "sp1_st-list-item-head",
                    children: "Priority : "
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                    className: "sp1_st-list-item-value",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("span", {
                      className: "dot-color mr-2",
                      style: {
                        background: "rgba(252, 189, 1, 1)"
                      }
                    }), task === null || task === void 0 ? void 0 : task.priority]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                  className: "sp1_st-list-item",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                    className: "sp1_st-list-item-head",
                    children: ["Task Category :", " "]
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                    className: "sp1_st-list-item-value",
                    children: task === null || task === void 0 ? void 0 : (_task$category = task.category) === null || _task$category === void 0 ? void 0 : _task$category.name
                  })]
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
              className: "mt-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)(_components_Accordion__WEBPACK_IMPORTED_MODULE_1__["default"], {
                expendable: false,
                title: "General Guidelines",
                children: [(task === null || task === void 0 ? void 0 : task.hasProjectManagerGuideline) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_components_PMGuideline__WEBPACK_IMPORTED_MODULE_21__["default"], {
                  guideline: task === null || task === void 0 ? void 0 : task.PMTaskGuideline
                }), !lodash__WEBPACK_IMPORTED_MODULE_12___default().isEmpty(task === null || task === void 0 ? void 0 : task.workEnvData) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                  className: "sp1_task_card--sub-card",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                    className: "px-4 py-3",
                    style: {
                      background: '#F3F5F9'
                    },
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("h6", {
                      className: "mb-2",
                      children: "Working Environment"
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("hr", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
                      className: "row",
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                        className: "col-12 col-lg-6 col-xl-4 mb-2 word-break",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("span", {
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("strong", {
                            children: "Working/Staging Site's URL"
                          }), ": ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("br", {}), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("a", {
                            target: "__blank",
                            href: task === null || task === void 0 ? void 0 : (_task$workEnvData = task.workEnvData) === null || _task$workEnvData === void 0 ? void 0 : _task$workEnvData.site_url,
                            children: "View on new tab"
                          })]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                        className: "col-12 col-lg-6 col-xl-4 mb-2 word-break",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("span", {
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("strong", {
                            children: "Frontend Password"
                          }), ": ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("br", {}), " ", task === null || task === void 0 ? void 0 : (_task$workEnvData2 = task.workEnvData) === null || _task$workEnvData2 === void 0 ? void 0 : _task$workEnvData2.frontend_password]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                        className: "col-12 col-lg-6 col-xl-4 mb-2 word-break",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("span", {
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("strong", {
                            children: "Working/Staging Site's Login URL"
                          }), ": ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("br", {}), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("a", {
                            target: "__blank",
                            href: task === null || task === void 0 ? void 0 : (_task$workEnvData3 = task.workEnvData) === null || _task$workEnvData3 === void 0 ? void 0 : _task$workEnvData3.login_url,
                            children: "View on new tab"
                          }), " "]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                        className: "col-12 col-lg-6 col-xl-4 mb-2 word-break",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("span", {
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("strong", {
                            children: "Working/Staging Site's Username/Email"
                          }), ": ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("br", {}), " ", task === null || task === void 0 ? void 0 : (_task$workEnvData4 = task.workEnvData) === null || _task$workEnvData4 === void 0 ? void 0 : _task$workEnvData4.email]
                        })
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                        className: "col-12 col-lg-6 col-xl-4 mb-2 word-break",
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("span", {
                          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("strong", {
                            children: "Password"
                          }), ": ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("br", {}), " ", task === null || task === void 0 ? void 0 : (_task$workEnvData5 = task.workEnvData) === null || _task$workEnvData5 === void 0 ? void 0 : _task$workEnvData5.password]
                        })
                      })]
                    })]
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_components_Guideline__WEBPACK_IMPORTED_MODULE_2__["default"], {
                  text: task === null || task === void 0 ? void 0 : task.guidelines,
                  workEnv: task === null || task === void 0 ? void 0 : task.workEnvData
                })]
              }), lodash__WEBPACK_IMPORTED_MODULE_12___default().size(task === null || task === void 0 ? void 0 : task.revisions) > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_components_Accordion__WEBPACK_IMPORTED_MODULE_1__["default"], {
                title: (_$last = lodash__WEBPACK_IMPORTED_MODULE_12___default().last(task === null || task === void 0 ? void 0 : task.revisions)) === null || _$last === void 0 ? void 0 : _$last.revisionStatus,
                headingClass: "d-flex align-items-center justify-content-between",
                headingStyle: {
                  background: "rgba(227,62,79,1)",
                  color: "#fff"
                },
                children: lodash__WEBPACK_IMPORTED_MODULE_12___default().map(task === null || task === void 0 ? void 0 : task.revisions, function (revision, index) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_components_RevisionText__WEBPACK_IMPORTED_MODULE_3__["default"], {
                    index: index + 1,
                    date: dayjs__WEBPACK_IMPORTED_MODULE_13___default()(revision.createdAt).format('MMM DD, YYYY'),
                    time: dayjs__WEBPACK_IMPORTED_MODULE_13___default()(revision.createdAt).format('hh:mm a'),
                    text: (revision === null || revision === void 0 ? void 0 : revision.comment) || (revision === null || revision === void 0 ? void 0 : revision.devComment) || (revision === null || revision === void 0 ? void 0 : revision.pmComment),
                    revision: revision
                  }, revision === null || revision === void 0 ? void 0 : revision.id);
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_components_Accordion__WEBPACK_IMPORTED_MODULE_1__["default"], {
                expendable: false,
                title: "Task Descriptions",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_components_Guideline__WEBPACK_IMPORTED_MODULE_2__["default"], {
                  text: task === null || task === void 0 ? void 0 : task.description
                })
              })]
            })]
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
        className: "col-12 col-md-5 col-lg-4",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
          className: "d-flex flex-column",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
            className: "sp1_task_right_card mb-3",
            style: {
              maxHeight: "450px"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
              className: "d-flex align-items-center font-weight-bold border-bottom pl-2 pb-2 mb-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("span", {
                style: {
                  display: "block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "100%",
                  background: taskStatus === null || taskStatus === void 0 ? void 0 : taskStatus.label_color,
                  marginRight: "6px",
                  boxShadow: "0 0 10px rgba(0,0,0,.1)"
                }
              }), _taskStatus.getTaskStatusName(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.getRoleId(), task.isSubtask)]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
              className: "d-flex align-items-center mb-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                className: "",
                children: "Start Date: "
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                className: "d-flex align-items-center font-weight-bold pl-2 ".concat(loadingClass),
                children: task === null || task === void 0 ? void 0 : task.getStartDate("MMM DD, YYYY")
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
              className: "d-flex align-items-center mb-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                className: "",
                children: "Due Date: "
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                className: "d-flex align-items-center font-weight-bold pl-2 ".concat(loadingClass),
                children: task === null || task === void 0 ? void 0 : task.getDueDate("MMM DD, YYYY")
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
              className: "d-flex align-items-center mb-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                className: "",
                children: "Time Estimate: "
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                className: "d-flex align-items-center font-weight-bold pl-2 ".concat(loadingClass),
                children: task === null || task === void 0 ? void 0 : task.getEstimateTime()
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsxs)("div", {
              className: "d-flex align-items-center mb-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                className: "",
                children: "Total Hours Logged: "
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)("div", {
                className: "d-flex align-items-center font-weight-bold pl-2",
                children: (task === null || task === void 0 ? void 0 : task.totalTimeLog) || "--"
              })]
            })]
          }), task && (task === null || task === void 0 ? void 0 : task.id) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_section_submitted_work_SubmittedWork__WEBPACK_IMPORTED_MODULE_7__["default"], {
            task: task
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_section_sub_task_SubTaskSection__WEBPACK_IMPORTED_MODULE_5__["default"], {
            status: taskStatus
          }), task && (task === null || task === void 0 ? void 0 : task.id) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_section_comments_CommentsSection__WEBPACK_IMPORTED_MODULE_4__["default"], {
            task: task,
            isLoading: isFetching
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_section_notes_NoteSection__WEBPACK_IMPORTED_MODULE_6__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_section_time_logs_TimeLogSection__WEBPACK_IMPORTED_MODULE_8__["default"], {}), task && (task === null || task === void 0 ? void 0 : task.id) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_section_history_historySection__WEBPACK_IMPORTED_MODULE_9__["default"], {}), task && (task === null || task === void 0 ? void 0 : task.id) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_section_revisions_RevisionSection__WEBPACK_IMPORTED_MODULE_10__["default"], {
            task: task
          })]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_23__.jsx)(_global_Toaster__WEBPACK_IMPORTED_MODULE_22__["default"], {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SingleTaskPage);

/***/ }),

/***/ "./resources/js/react/single-task/components/Accordion.jsx":
/*!*****************************************************************!*\
  !*** ./resources/js/react/single-task/components/Accordion.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var Accordion = function Accordion(_ref) {
  var _ref$expendable = _ref.expendable,
    expendable = _ref$expendable === void 0 ? true : _ref$expendable,
    children = _ref.children,
    title = _ref.title,
    headingClass = _ref.headingClass,
    headingStyle = _ref.headingStyle;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    expend = _React$useState2[0],
    setExpend = _React$useState2[1];
  var toggle = function toggle() {
    setExpend(!expend);
  };
  var init = expendable ? 0 : 300;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "sp1_task_card mb-4",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "sp1_task_card--head ".concat(headingClass),
      onClick: function onClick() {
        return expendable ? toggle() : null;
      },
      style: _objectSpread(_objectSpread({}, headingStyle), {}, {
        cursor: expendable ? 'pointer' : 'default'
      }),
      children: [" ", title, expendable ? expend ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        className: "__icon",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("i", {
          className: "fa-solid fa-chevron-up"
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
        className: "__icon",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("i", {
          className: "fa-solid fa-chevron-down"
        })
      }) : null]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, {
      children: expendable ? expend && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div, {
        initial: {
          height: init
        },
        animate: {
          height: 800
        },
        exit: {
          height: 0
        },
        className: "sp1_task_card--body",
        children: children
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "sp1_task_card--body",
        children: children
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Accordion);

/***/ }),

/***/ "./resources/js/react/single-task/components/CustomModal.jsx":
/*!*******************************************************************!*\
  !*** ./resources/js/react/single-task/components/CustomModal.jsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_popper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-popper */ "./node_modules/react-popper/lib/esm/usePopper.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var CustomModal = function CustomModal(_ref) {
  var _ref$toggleRef = _ref.toggleRef,
    toggleRef = _ref$toggleRef === void 0 ? null : _ref$toggleRef,
    isOpen = _ref.isOpen,
    close = _ref.close,
    children = _ref.children;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    modalRef = _React$useState2[0],
    setModalRef = _React$useState2[1];
  var _usePopper = (0,react_popper__WEBPACK_IMPORTED_MODULE_3__.usePopper)(toggleRef, modalRef, {
      placement: 'left-start',
      modifiers: [{
        name: 'offset',
        options: {
          offset: [0, 0]
        }
      }]
    }),
    styles = _usePopper.styles,
    attributes = _usePopper.attributes;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", _objectSpread(_objectSpread({
    ref: setModalRef,
    style: _objectSpread(_objectSpread({}, styles.popper), {}, {
      pointerEvents: isOpen ? 'all' : 'none',
      zIndex: 99
    })
  }, attributes.popper), {}, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.AnimatePresence, {
      children: isOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_5__.motion.div, {
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        },
        exit: {
          opacity: 0
        },
        className: "",
        children: [children, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Shadow, {})]
      })
    })
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomModal);
var Shadow = function Shadow() {
  return /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    style: {
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 90,
      background: 'rgba(0,0,0,.1)'
    }
  }), document.querySelector('#sp1SingleTaskPageModal'));
};

/***/ }),

/***/ "./resources/js/react/single-task/components/DatePicker.jsx":
/*!******************************************************************!*\
  !*** ./resources/js/react/single-task/components/DatePicker.jsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var DatePicker = function DatePicker(_ref) {
  var data = _ref.data,
    setDate = _ref.setDate,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className;
  var handleTimePicker = function handleTimePicker() {
    if (window.$) {
      var $ = window.$;
      var moment = window.moment;
      $(function () {
        var start = moment().startOf("month");
        var end = moment().endOf("month");
        setDate(start.format());
        function cb(start, end) {
          setDate(start.format("YYYY-MM-DD"));
          $("#datePicker div.sp1__jquery_date_text").html(start.format("MMMM D, YYYY"));
        }
        $("#datePicker").daterangepicker({
          singleDatePicker: true
        }, cb);
        cb(start, end);
      });
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    handleTimePicker();
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    id: "datePicker",
    className: "sp1__jquery_date_picker ".concat(className),
    style: {
      position: "relative"
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "sp1__jquery_date_btn",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("i", {
        className: "fa-solid fa-calendar-days"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "sp1__jquery_date_text"
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DatePicker);

/***/ }),

/***/ "./resources/js/react/single-task/components/Dropdown.jsx":
/*!****************************************************************!*\
  !*** ./resources/js/react/single-task/components/Dropdown.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_popper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-popper */ "./node_modules/react-popper/lib/esm/usePopper.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var _excluded = ["children", "className", "onClick", "disabled"],
  _excluded2 = ["children", "className", "placement", "offset"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var DropdownContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext();
var DropdownProvider = function DropdownProvider(_ref) {
  var children = _ref.children;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isOpen = _React$useState2[0],
    setIsOpen = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    element = _React$useState4[0],
    setElement = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    reference = _React$useState6[0],
    setReference = _React$useState6[1];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(DropdownContext.Provider, {
    value: {
      element: element,
      setElement: setElement,
      reference: reference,
      setReference: setReference,
      isOpen: isOpen,
      setIsOpen: setIsOpen
    },
    children: children
  });
};

// dropdown hooks
var useDropdown = function useDropdown() {
  var context = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};

// dropdown item
var DropdownItem = function DropdownItem(_ref2) {
  var children = _ref2.children,
    className = _ref2.className,
    _onClick = _ref2.onClick,
    _ref2$disabled = _ref2.disabled,
    disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
    props = _objectWithoutProperties(_ref2, _excluded);
  var _useDropdown = useDropdown(),
    setIsOpen = _useDropdown.setIsOpen;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", _objectSpread(_objectSpread({
    onMouseUp: function onMouseUp() {
      return disabled ? null : setIsOpen(false);
    },
    onClick: function onClick(e) {
      return disabled ? null : _onClick ? _onClick(e) : null;
    },
    className: "cnx_dropdown__item ".concat(disabled ? 'cnx_dropdown__item_disabled}' : '', " ").concat(className)
  }, props), {}, {
    children: children
  }));
};
var DropdownToggle = function DropdownToggle(_ref3) {
  var children = _ref3.children,
    _ref3$icon = _ref3.icon,
    icon = _ref3$icon === void 0 ? true : _ref3$icon,
    className = _ref3.className;
  var _useDropdown2 = useDropdown(),
    setIsOpen = _useDropdown2.setIsOpen,
    isOpen = _useDropdown2.isOpen,
    setReference = _useDropdown2.setReference;
  var toggle = function toggle() {
    return setIsOpen(!isOpen);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    ref: setReference,
    className: "cnx_dropdown__toggle ".concat(className),
    onClick: toggle,
    children: [children, icon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
      className: "fas fa-caret-".concat(isOpen ? 'up' : 'down', " cnx_dropdown__toggle_icon")
    })]
  });
};

// dropdown menu
var DropdownMenu = function DropdownMenu(_ref4) {
  var children = _ref4.children,
    className = _ref4.className,
    _ref4$placement = _ref4.placement,
    placement = _ref4$placement === void 0 ? "bottom-start" : _ref4$placement,
    _ref4$offset = _ref4.offset,
    offset = _ref4$offset === void 0 ? [0, 3] : _ref4$offset,
    props = _objectWithoutProperties(_ref4, _excluded2);
  var _useDropdown3 = useDropdown(),
    reference = _useDropdown3.reference,
    setIsOpen = _useDropdown3.setIsOpen,
    isOpen = _useDropdown3.isOpen;
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    popperElement = _React$useState8[0],
    setPopperElement = _React$useState8[1];
  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_0__.useState(100),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    width = _React$useState10[0],
    setWidth = _React$useState10[1];

  // generate random id for dropdown menu
  var id = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return Math.random().toString(36).substr(2, 9);
  }, []);
  var DOM = document.getElementById(id);
  var _usePopper = (0,react_popper__WEBPACK_IMPORTED_MODULE_3__.usePopper)(reference, popperElement, {
      placement: placement,
      modifiers: [{
        name: 'offset',
        options: {
          offset: offset
        }
      }, {
        name: 'flip',
        options: {
          fallbackPlacements: ['bottom', 'left', 'right', 'top']
        }
      }]
    }),
    styles = _usePopper.styles,
    attributes = _usePopper.attributes;

  // min width
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (reference) {
      setWidth(reference.offsetWidth);
    }
  }, [reference]);

  // outside click

  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    var timeout;
    var handleClickOutside = function handleClickOutside(event) {
      if (popperElement && !popperElement.contains(event.target)) {
        setIsOpen(false);
        clearTimeout(timeout);
        window.removeEventListener('click', handleClickOutside);
      }
    };
    if (isOpen) {
      timeout = setTimeout(function () {
        window.addEventListener('click', handleClickOutside);
      }, 100);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }
    return function () {
      window.removeEventListener('click', handleClickOutside);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, popperElement]);

  // create element in html body
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    var el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
    setPopperElement(el);
    return function () {
      document.body.removeChild(el);
    };
  }, []);
  if (!DOM) {
    return null;
  }
  return /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_4__.AnimatePresence, {
    children: isOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(framer_motion__WEBPACK_IMPORTED_MODULE_5__.motion.div, _objectSpread(_objectSpread(_objectSpread({
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1
      },
      exit: {
        opacity: 0
      },
      className: "cnx_dropdown__menu ".concat(isOpen ? 'cnx_dropdown__menu_open' : '', " ").concat(className),
      ref: setPopperElement,
      style: _objectSpread(_objectSpread({}, styles.popper), {}, {
        minWidth: width
      })
    }, attributes.popper), props), {}, {
      children: children
    }))
  }), DOM);
};
var Dropdown = function Dropdown(_ref5) {
  var children = _ref5.children,
    _ref5$className = _ref5.className,
    className = _ref5$className === void 0 ? '' : _ref5$className;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "cnx_dropdown ".concat(className),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(DropdownProvider, {
      children: children
    })
  });
};
Dropdown.Item = DropdownItem;
Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dropdown);

// type

DropdownProvider.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node.isRequired)
};
DropdownItem.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node.isRequired),
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string)
};
DropdownToggle.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node.isRequired),
  icon: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string)
};
DropdownMenu.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node.isRequired) || prop_types__WEBPACK_IMPORTED_MODULE_6___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_6___default().node)).isRequired,
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
  placement: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
  offset: prop_types__WEBPACK_IMPORTED_MODULE_6___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_6___default().number))
};
Dropdown.propTypes = {
  className: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node.isRequired) || prop_types__WEBPACK_IMPORTED_MODULE_6___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_6___default().node)).isRequired
};

/***/ }),

/***/ "./resources/js/react/single-task/components/Guideline.jsx":
/*!*****************************************************************!*\
  !*** ./resources/js/react/single-task/components/Guideline.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useClickAway.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var Guideline = function Guideline(_ref) {
  var text = _ref.text,
    editorContainerClass = _ref.editorContainerClass,
    workEnv = _ref.workEnv;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    expend = _useState2[0],
    setExpend = _useState2[1];
  var isLong = (text === null || text === void 0 ? void 0 : text.length) > 400;
  var showText = isLong ? text.slice(0, 400) + '...' : text;
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var handleExpend = function handleExpend(e) {
    e.preventDefault();
    setExpend(!expend);
  };
  (0,react_use__WEBPACK_IMPORTED_MODULE_4__["default"])(ref, function () {
    setExpend(false);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "sp1_task_card--sub-card",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "sp1_ck_content sp1_guideline_text ".concat(editorContainerClass),
      dangerouslySetInnerHTML: {
        __html: showText
      }
    }), isLong ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
      href: "#",
      onClick: handleExpend,
      className: "",
      children: " Read full guideline "
    }) : '', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: "sp1_task_card--sub-card-modal",
      isOpen: expend,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        ref: ref,
        className: "sp1_task_card--sub-card-modal-content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "d-flex align-items-center justify-content-between __header",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
            onClick: function onClick() {
              return setExpend(false);
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
              className: "fa-solid fa-xmark"
            })
          })
        }), !lodash__WEBPACK_IMPORTED_MODULE_2___default().isEmpty(workEnv) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "sp1_task_card--sub-card m-4",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "px-4 py-3",
            style: {
              background: '#F3F5F9'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h6", {
              className: "mb-2",
              children: "Working Environment"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("hr", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              className: "row",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "col-12 col-lg-6 col-xl-4 mb-2 word-break",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
                    children: "Working/Staging Site's URL"
                  }), ": ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
                    target: "__blank",
                    href: workEnv === null || workEnv === void 0 ? void 0 : workEnv.site_url,
                    children: "View on new tab"
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "col-12 col-lg-6 col-xl-4 mb-2 word-break",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
                    children: "Frontend Password"
                  }), ": ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), " ", workEnv === null || workEnv === void 0 ? void 0 : workEnv.frontend_password]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "col-12 col-lg-6 col-xl-4 mb-2 word-break",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
                    children: "Working/Staging Site's Login URL"
                  }), ": ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
                    target: "__blank",
                    href: workEnv === null || workEnv === void 0 ? void 0 : workEnv.login_url,
                    children: "View on new tab"
                  }), " "]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "col-12 col-lg-6 col-xl-4 mb-2 word-break",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
                    children: "Working/Staging Site's Username/Email"
                  }), ": ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), " ", workEnv === null || workEnv === void 0 ? void 0 : workEnv.email]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "col-12 col-lg-6 col-xl-4 mb-2 word-break",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
                    children: "Password"
                  }), ": ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), " ", workEnv === null || workEnv === void 0 ? void 0 : workEnv.password]
                })
              })]
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "__content",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "sp1_ck_content word-break ".concat(editorContainerClass),
            dangerouslySetInnerHTML: {
              __html: text
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: " __footer",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
            className: "btn btn-sm py-1 btn-primary ml-auto",
            onClick: function onClick() {
              return setExpend(false);
            },
            children: "Close"
          })
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Guideline);

/***/ }),

/***/ "./resources/js/react/single-task/components/HistoryLoader.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/react/single-task/components/HistoryLoader.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-content-loader */ "./node_modules/react-content-loader/dist/react-content-loader.es.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var HistoryLoader = function HistoryLoader(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_content_loader__WEBPACK_IMPORTED_MODULE_2__["default"], _objectSpread(_objectSpread({
    speed: 2,
    width: 450,
    height: 45,
    viewBox: "0 0 450 45",
    backgroundColor: "#f3f3f3",
    foregroundColor: "#ecebeb"
  }, props), {}, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("rect", {
      x: "0",
      y: "0",
      rx: "0",
      ry: "0",
      width: "46",
      height: "48"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("rect", {
      x: "62",
      y: "29",
      rx: "0",
      ry: "0",
      width: "227",
      height: "12"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("rect", {
      x: "60",
      y: "5",
      rx: "0",
      ry: "0",
      width: "344",
      height: "12"
    })]
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HistoryLoader);

/***/ }),

/***/ "./resources/js/react/single-task/components/Modal.jsx":
/*!*************************************************************!*\
  !*** ./resources/js/react/single-task/components/Modal.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var Modal = function Modal(_ref) {
  var children = _ref.children,
    isOpen = _ref.isOpen,
    className = _ref.className;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isBrowser = _React$useState2[0],
    setIsBrowser = _React$useState2[1];
  // generate random id for dropdown menu
  var id = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return Math.random().toString(36).substr(2, 9);
  }, []);
  var DOM = document.getElementById(id);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    setIsBrowser(true);
    var el = document.createElement('div');
    el.id = id;
    document.body.appendChild(el);
    return function () {
      document.body.removeChild(el);
    };
  }, []);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (isOpen) {
      document.body.classList.add('cnx_body-overflow-hidden');
    } else {
      document.body.classList.remove('cnx_body-overflow-hidden');
    }
  }, [isOpen]);
  if (!DOM) return;
  var modalContent = isOpen ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "cnx_modal ".concat(className),
    children: children
  }) : null;
  if (isBrowser) {
    return /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(modalContent, DOM);
  } else {
    return null;
  }
};
Modal.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().node.isRequired),
  isOpen: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool.isRequired),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

/***/ }),

/***/ "./resources/js/react/single-task/components/PMGuideline.jsx":
/*!*******************************************************************!*\
  !*** ./resources/js/react/single-task/components/PMGuideline.jsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useCopyToClipboard.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var ColorItem = function ColorItem(_ref) {
  var color = _ref.color,
    desc = _ref.desc;
  var ref = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);
  var _useCopyToClipboard = (0,react_use__WEBPACK_IMPORTED_MODULE_3__["default"])(),
    _useCopyToClipboard2 = _slicedToArray(_useCopyToClipboard, 2),
    state = _useCopyToClipboard2[0],
    copyToClipboard = _useCopyToClipboard2[1];
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setIsShow = _useState2[1];
  var handleCopy = function handleCopy(text) {
    copyToClipboard(color);
    setIsShow(true);
    setTimeout(function () {
      setIsShow(false);
    }, 1000);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "position-relative px-2",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      onClick: function onClick() {
        return handleCopy(color);
      },
      className: "py-1 px-3 d-inline-block mr-2 text-white rounded",
      style: {
        background: color
      },
      children: !show ? color : state.value ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("span", {
        children: [" Copied ", state.value]
      }) : null
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "p-2 f-12",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        dangerouslySetInnerHTML: {
          __html: desc
        }
      })
    })]
  });
};
var PMGuideline = function PMGuideline(_ref2) {
  var guideline = _ref2.guideline;
  var colors = guideline === null || guideline === void 0 ? void 0 : guideline.color;
  var desginUrl = function desginUrl() {
    if (guideline !== null && guideline !== void 0 && guideline.design) {
      if ((guideline === null || guideline === void 0 ? void 0 : guideline.design) === 'XD/Figma') {
        var _guideline$xd_url, _guideline$xd_url2;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("a", {
          href: (_guideline$xd_url = guideline === null || guideline === void 0 ? void 0 : guideline.xd_url) !== null && _guideline$xd_url !== void 0 ? _guideline$xd_url : '#',
          children: [" ", (_guideline$xd_url2 = guideline === null || guideline === void 0 ? void 0 : guideline.xd_url) !== null && _guideline$xd_url2 !== void 0 ? _guideline$xd_url2 : '', " "]
        });
      } else if ((guideline === null || guideline === void 0 ? void 0 : guideline.design) === 'Photoshop') {
        var _guideline$drive_url, _guideline$drive_url2;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("a", {
          href: (_guideline$drive_url = guideline === null || guideline === void 0 ? void 0 : guideline.drive_url) !== null && _guideline$drive_url !== void 0 ? _guideline$drive_url : '#',
          children: [" ", (_guideline$drive_url2 = guideline === null || guideline === void 0 ? void 0 : guideline.drive_url) !== null && _guideline$drive_url2 !== void 0 ? _guideline$drive_url2 : '', " "]
        });
      } else if (lodash__WEBPACK_IMPORTED_MODULE_0___default().replace(guideline === null || guideline === void 0 ? void 0 : guideline.design, /\s/g, '') === "TheReferenceSiteThatHastoBeClone") {
        var ref = JSON.parse(guideline === null || guideline === void 0 ? void 0 : guideline.reference_link);
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ol", {
          style: {
            listStyle: 'numaric'
          },
          children: lodash__WEBPACK_IMPORTED_MODULE_0___default().size(ref) && lodash__WEBPACK_IMPORTED_MODULE_0___default().map(ref, function (r, i) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
              style: {
                listStyle: 'numaric'
              },
              children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("a", {
                href: r !== null && r !== void 0 ? r : '#',
                children: [" ", r !== null && r !== void 0 ? r : '', " "]
              }), " "]
            }, i + r);
          })
        });
      }
    }
  };
  console.log({
    guideline: guideline
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "px-3 py-3",
      style: {
        background: '#F7F8FA'
      },
      children: [(guideline === null || guideline === void 0 ? void 0 : guideline.theme_details) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "mb-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "mb-2 f-16",
          style: {
            color: '#878E97'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("strong", {
            children: "Theme Details: "
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("ul", {
          className: "pl-2 ml-0",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              className: "font-weight-bold",
              children: "Theme Name: "
            }), " ", guideline === null || guideline === void 0 ? void 0 : guideline.theme_name]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              className: "font-weight-bold",
              children: "Theme URL: "
            }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
              href: guideline === null || guideline === void 0 ? void 0 : guideline.theme_url,
              className: "hover-underline",
              children: guideline === null || guideline === void 0 ? void 0 : guideline.theme_url
            })]
          })]
        })]
      }), (guideline === null || guideline === void 0 ? void 0 : guideline.design_details) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "mb-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "mb-2 f-16",
          style: {
            color: '#878E97'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("strong", {
            children: "Design Details: "
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("ul", {
          className: "pl-2 ml-0",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              className: "font-weight-bold",
              children: "Desgin: "
            }), " ", guideline === null || guideline === void 0 ? void 0 : guideline.design]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              className: "font-weight-bold",
              children: "Reference URL: "
            }), " ", desginUrl()]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              className: "font-weight-bold",
              children: "Instruction:"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              style: {
                fontSize: '12px !important'
              },
              dangerouslySetInnerHTML: {
                __html: guideline === null || guideline === void 0 ? void 0 : guideline.instruction
              }
            })]
          })]
        })]
      }), (guideline === null || guideline === void 0 ? void 0 : guideline.color_schema) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "mb-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "mb-2 f-16",
          style: {
            color: '#878E97'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("strong", {
            children: "Color Schema: "
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("ul", {
          className: "pl-2 ml-0",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
            className: "d-flex flex-column",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              className: "font-weight-bold mr-2 mb-2",
              children: "Primary Color: "
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ColorItem, {
              color: guideline === null || guideline === void 0 ? void 0 : guideline.primary_color,
              desc: guideline === null || guideline === void 0 ? void 0 : guideline.primary_color_description
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
            className: "d-flex flex-column",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              className: "font-weight-bold mr-2 mb-2",
              children: "Secondary Color: "
            }), lodash__WEBPACK_IMPORTED_MODULE_0___default().map(lodash__WEBPACK_IMPORTED_MODULE_0___default().toArray(guideline === null || guideline === void 0 ? void 0 : guideline.color), function (color, i) {
              var _guideline$color_desc;
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(ColorItem, {
                color: color,
                desc: guideline === null || guideline === void 0 ? void 0 : (_guideline$color_desc = guideline.color_description) === null || _guideline$color_desc === void 0 ? void 0 : _guideline$color_desc[i]
              }, i + color);
            })]
          })]
        })]
      }), (guideline === null || guideline === void 0 ? void 0 : guideline.plugin_research) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "mb-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
          className: "mb-2 f-16",
          style: {
            color: '#878E97'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("strong", {
            children: "Plugin Research: "
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("ul", {
          className: "pl-2 ml-0",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              className: "font-weight-bold",
              children: "Plugin Name: "
            }), " ", guideline === null || guideline === void 0 ? void 0 : guideline.theme_name]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              className: "font-weight-bold",
              children: "Plugin URL: "
            }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
              href: guideline === null || guideline === void 0 ? void 0 : guideline.plugin_url,
              className: "hover-underline",
              children: guideline === null || guideline === void 0 ? void 0 : guideline.plugin_url
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
              className: "font-weight-bold",
              children: "Google Drive Link: "
            }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
              href: guideline === null || guideline === void 0 ? void 0 : guideline.google_drive_link,
              className: "hover-underline",
              children: guideline === null || guideline === void 0 ? void 0 : guideline.google_drive_link
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("li", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              className: "font-weight-bold mb-2",
              children: "Description: "
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                dangerouslySetInnerHTML: {
                  __html: guideline === null || guideline === void 0 ? void 0 : guideline.instruction_plugin
                }
              })
            })]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PMGuideline);

/***/ }),

/***/ "./resources/js/react/single-task/components/RevisionText.jsx":
/*!********************************************************************!*\
  !*** ./resources/js/react/single-task/components/RevisionText.jsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Insights_ui_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Insights/ui/Modal */ "./resources/js/react/Insights/ui/Modal.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useClickAway.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var RevisionText = function RevisionText(_ref) {
  var text = _ref.text,
    index = _ref.index,
    date = _ref.date,
    time = _ref.time,
    revision = _ref.revision;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    expend = _React$useState2[0],
    setExpend = _React$useState2[1];
  var ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  var isLong = (text === null || text === void 0 ? void 0 : text.length) > 800;
  var showText = isLong ? (text === null || text === void 0 ? void 0 : text.slice(0, 800)) + '...' : text;
  var toggleModal = function toggleModal(e) {
    e.preventDefault();
    setExpend(!expend);
  };
  (0,react_use__WEBPACK_IMPORTED_MODULE_4__["default"])(ref, function () {
    setExpend(false);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "sp1_task_card--sub-card",
    style: {
      minHeight: '110px'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "sp1_tc_sc-inx",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
        children: index
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
        className: "d-block",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
          children: "Date"
        }), " ", date, " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
        className: "d-block",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
          children: "Time"
        }), ": ", time]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "",
      children: [revision !== null && revision !== void 0 && revision.revisionAcknowledgement ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
        className: "d-block mb-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
          className: "font-weight-bold text-danger",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
            children: "Reason: "
          }), "  "]
        }), revision === null || revision === void 0 ? void 0 : revision.revisionAcknowledgement, " ", " ", revision !== null && revision !== void 0 && revision.isDeny ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "badge badge-danger",
          children: "Rejected By Developer"
        }) : null, revision !== null && revision !== void 0 && revision.isAccept ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "badge badge-success",
          children: "Accepted By Developer"
        }) : null]
      }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-weight-bold text-success",
          children: "Statement:"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "sp1_ck_content",
          style: {
            textIndent: '2rem'
          },
          dangerouslySetInnerHTML: {
            __html: showText
          }
        })]
      }), isLong ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        href: "#",
        className: "ml-2",
        onClick: toggleModal,
        children: "Read full guideline"
      }) : '', /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Insights_ui_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
        className: "sp1_task_card--sub-card-modal",
        isOpen: expend,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          ref: ref,
          className: "sp1_task_card--sub-card-modal-content",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "d-flex align-items-center justify-content-between __header",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
              onClick: function onClick() {
                return setExpend(false);
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
                className: "fa-solid fa-xmark"
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "__content",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              className: "sp1_tc_sc-inx",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
                children: index
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
                className: "d-block",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
                  children: "Date"
                }), " ", date, " "]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
                className: "d-block",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
                  children: "Time"
                }), ": ", time]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
                className: "d-block mb-2",
                children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                  className: "font-weight-bold text-danger",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
                    children: "Reason: "
                  })
                }), " ", revision === null || revision === void 0 ? void 0 : revision.revisionAcknowledgement]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
                className: "font-weight-bold text-success",
                children: "Commitment:"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "sp1_ck_content",
                style: {
                  textIndent: '2rem'
                },
                dangerouslySetInnerHTML: {
                  __html: text
                }
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: " __footer",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
              className: "btn btn-sm py-1 btn-primary ml-auto",
              onClick: function onClick() {
                return setExpend(false);
              },
              children: "Close"
            })
          })]
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RevisionText);

/***/ }),

/***/ "./resources/js/react/single-task/components/form/Input.jsx":
/*!******************************************************************!*\
  !*** ./resources/js/react/single-task/components/form/Input.jsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var _excluded = ["label", "id", "readOnly", "placeholder", "inputClass", "labelClass", "type", "className", "value", "defaultValue", "onChange", "error"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



var Input = function Input(_ref) {
  var label = _ref.label,
    id = _ref.id,
    _ref$readOnly = _ref.readOnly,
    readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
    _ref$inputClass = _ref.inputClass,
    inputClass = _ref$inputClass === void 0 ? '' : _ref$inputClass,
    _ref$labelClass = _ref.labelClass,
    labelClass = _ref$labelClass === void 0 ? '' : _ref$labelClass,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'text' : _ref$type,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    value = _ref.value,
    defaultValue = _ref.defaultValue,
    onChange = _ref.onChange,
    error = _ref.error,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "form-group my-3 w-100 ".concat(className),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("label", {
      htmlFor: id,
      className: "f-14 text-dark-gray mb-1 ".concat(labelClass),
      "data-label": "true",
      children: [label, rest.required && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("sup", {
        className: "f-14 mr-1",
        children: "*"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", _objectSpread({
      type: type,
      className: "form-control height-35 w-100 f-14 ".concat(inputClass),
      placeholder: placeholder,
      id: id,
      value: value,
      defaultValue: defaultValue,
      onChange: onChange,
      readOnly: readOnly
    }, rest)), error ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "",
      style: {
        color: 'red'
      },
      children: [" ", error, " "]
    }) : null]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Input);

/***/ }),

/***/ "./resources/js/react/single-task/components/loader/ArticleLoader.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/single-task/components/loader/ArticleLoader.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var ArticleLoader = function ArticleLoader() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "w-100",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_0__.Placeholder, {
      width: "100%",
      className: "mb-2"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_0__.Placeholder, {
      width: "100%",
      className: "mb-2"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_0__.Placeholder, {
      width: "30%",
      className: "mb-2"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_0__.Placeholder, {
      width: "100%",
      className: "mb-2"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_0__.Placeholder, {
      width: "100%",
      className: "mb-2"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_0__.Placeholder, {
      width: "50%",
      className: "mb-2"
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ArticleLoader);

/***/ }),

/***/ "./resources/js/react/single-task/components/loader/CommentLoader.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/single-task/components/loader/CommentLoader.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var InnerCommentLoader = function InnerCommentLoader() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "sp1_task_comment_send_box sp1_task_comment_replied pl-2 pb-2",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "__send-box flex-column align-items-start",
      style: {
        maxWidth: '100%'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "d-flex align-items-center",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "mr-2",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "rounded-circle",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_0__.Placeholder, {
              width: "32px",
              height: "32px",
              type: "circle",
              className: "rounded-circle"
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_0__.Placeholder, {
            width: "140px"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_0__.Placeholder, {
            width: "80px",
            height: "10px",
            className: "mt-2"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "__box __reply_text w-100 my-1 text-dark",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_0__.Placeholder, {
          width: "100%",
          className: "mb-2"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_0__.Placeholder, {
          width: "100%",
          className: "mb-2"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_0__.Placeholder, {
          width: "50%",
          className: "mb-2"
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InnerCommentLoader);

/***/ }),

/***/ "./resources/js/react/single-task/components/loader/GenarelLoader.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/single-task/components/loader/GenarelLoader.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var GenarelLoader = function GenarelLoader() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "row",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "col-12 col-xl-6 pb-3 pb-xl-0",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "d-flex flex-column",
        style: {
          gap: "10px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h6", {
          className: "",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "220px"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "sp1_st-list-item",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sp1_st-list-item-head",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
              width: "80px"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sp1_st-list-item-value",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
              width: "220px"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "sp1_st-list-item",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sp1_st-list-item-head",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
              width: "80px"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sp1_st-list-item-value",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
              width: "220px"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "sp1_st-list-item",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sp1_st-list-item-head",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
              width: "80px"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sp1_st-list-item-value",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
              width: "220px"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "sp1_st-list-item",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sp1_st-list-item-head",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
              width: "80px"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
            className: "sp1_st-list-item-value",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              style: {
                width: "32px",
                height: "32px"
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
                width: "32px",
                height: "32px",
                type: "circle",
                className: "rounded-circle"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
              className: "ml-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
                width: "130px"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
                width: "70px",
                height: "10px",
                className: "mt-2"
              })]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "sp1_st-list-item",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sp1_st-list-item-head",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
              width: "80px"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
            className: "sp1_st-list-item-value",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              style: {
                width: "32px",
                height: "32px"
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
                width: "32px",
                height: "32px",
                type: "circle",
                className: "rounded-circle"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
              className: "ml-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
                width: "130px"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
                width: "70px",
                height: "10px",
                className: "mt-2"
              })]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "sp1_st-list-item",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sp1_st-list-item-head",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
              width: "80px"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sp1_st-list-item-value",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
              width: "80px"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "sp1_st-list-item",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sp1_st-list-item-head",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
              width: "80px"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "sp1_st-list-item-value",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
              width: "100px"
            })
          })]
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GenarelLoader);

/***/ }),

/***/ "./resources/js/react/single-task/permissions.js":
/*!*******************************************************!*\
  !*** ./resources/js/react/single-task/permissions.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "approveButtonPermission": () => (/* binding */ approveButtonPermission),
/* harmony export */   "clientApproveConfirmationButtonPermission": () => (/* binding */ clientApproveConfirmationButtonPermission),
/* harmony export */   "markAsCompletedButtonPermission": () => (/* binding */ markAsCompletedButtonPermission),
/* harmony export */   "needRevisionPermision": () => (/* binding */ needRevisionPermision),
/* harmony export */   "revisionButtonPermission": () => (/* binding */ revisionButtonPermission),
/* harmony export */   "subTaskCreationPermision": () => (/* binding */ subTaskCreationPermision),
/* harmony export */   "submitForClientApproval": () => (/* binding */ submitForClientApproval),
/* harmony export */   "taskEditPermision": () => (/* binding */ taskEditPermision),
/* harmony export */   "timeControlPermision": () => (/* binding */ timeControlPermision)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/user-details */ "./resources/js/react/utils/user-details.js");



// permission for timer control
function timeControlPermision(_ref) {
  var task = _ref.task,
    status = _ref.status,
    loggedUser = _ref.loggedUser;
  var statusPermission = false;
  var assigneePermission = false;
  var statusId = status ? status.id : -1;
  var assignedUser = task === null || task === void 0 ? void 0 : task.assigneeTo;
  var _loggedUser = loggedUser;

  // if status id 2 or 3 show timer start button
  if ([2, 3].includes(Number(statusId))) {
    statusPermission = true;
  }

  // if task assign to 
  if (assignedUser.getId() === _loggedUser.getId()) {
    assigneePermission = true;
  }
  return statusPermission && assigneePermission && lodash__WEBPACK_IMPORTED_MODULE_0___default().size(task === null || task === void 0 ? void 0 : task.subtask) === 0;
}

// mark as completed button permission controller
function markAsCompletedButtonPermission(_ref2) {
  var task = _ref2.task,
    status = _ref2.status,
    loggedUser = _ref2.loggedUser;
  var statusPermission = false;
  var assigneePermission = false;
  var statusId = status ? status.id : -1;
  var assignedUser = task === null || task === void 0 ? void 0 : task.assigneeTo;
  var _loggedUser = new _utils_user_details__WEBPACK_IMPORTED_MODULE_1__.User(loggedUser);

  // if task assign to 
  if (assignedUser.getId() === _loggedUser.getId()) {
    assigneePermission = true;
    if ((_loggedUser === null || _loggedUser === void 0 ? void 0 : _loggedUser.getRoleId()) === 6) {
      if ([8].includes(Number(statusId))) {
        statusPermission = true;
      }
    } else {
      if ([2, 3].includes(Number(statusId))) {
        statusPermission = true;
      }
    }
  }
  return statusPermission && assigneePermission;
}

// approve button permission
function approveButtonPermission(_ref3) {
  var task = _ref3.task,
    status = _ref3.status,
    loggedUser = _ref3.loggedUser;
  var statusPermission = false;
  var assigneePermission = false;
  var statusId = status ? status.id : -1;
  var assignedUser = task === null || task === void 0 ? void 0 : task.assigneeBy;
  var _loggedUser = new _utils_user_details__WEBPACK_IMPORTED_MODULE_1__.User(loggedUser);

  // if status id 6 show timer start button
  if ([6].includes(Number(statusId))) {
    statusPermission = true;
  }

  // if task assign to 
  if (assignedUser.getId() === _loggedUser.getId()) {
    assigneePermission = true;
  } else if ((_loggedUser === null || _loggedUser === void 0 ? void 0 : _loggedUser.getRoleId()) === 1) {
    assigneePermission = true;
  }
  return statusPermission && assigneePermission;
}

// approve button permission
function needRevisionPermision(_ref4) {
  var task = _ref4.task,
    status = _ref4.status,
    loggedUser = _ref4.loggedUser;
  var statusPermission = false;
  var assigneePermission = false;
  var statusId = status ? status.id : -1;
  var assignedUser = task === null || task === void 0 ? void 0 : task.assigneeBy;
  var _loggedUser = new _utils_user_details__WEBPACK_IMPORTED_MODULE_1__.User(loggedUser);

  // if status id 6 show timer start button
  if ([6].includes(Number(statusId))) {
    statusPermission = true;
  }

  // if task assign to 
  if (assignedUser.getId() === _loggedUser.getId()) {
    assigneePermission = true;
  } else if ((_loggedUser === null || _loggedUser === void 0 ? void 0 : _loggedUser.getRoleId()) === 1) {
    assigneePermission = true;
  }
  return statusPermission && assigneePermission;
}

// revision button
function revisionButtonPermission(_ref5) {
  var task = _ref5.task,
    status = _ref5.status,
    loggedUser = _ref5.loggedUser;
  var statusPermission = false;
  var assigneePermission = false;
  var statusId = status ? status.id : -1;
  var assignedUser = task === null || task === void 0 ? void 0 : task.assigneeTo;
  var _loggedUser = loggedUser;
  //    console.log(statusId) 
  // if status id 6 show timer start button
  if ([1].includes(Number(statusId))) {
    statusPermission = true;
  }

  // if task assign to 
  if (assignedUser.getId() === _loggedUser.getId()) {
    assigneePermission = true;
  }
  return statusPermission && assigneePermission;
}

// submit for client approval button permission

function submitForClientApproval(_ref6) {
  var task = _ref6.task,
    status = _ref6.status,
    auth = _ref6.auth;
  var statusPermission = false;
  var assigneePermission = false;
  var statusId = status ? status.id : -1;
  var assignedUser = task === null || task === void 0 ? void 0 : task.assigneeBy;

  // if status id 6 show timer start button
  if ([8].includes(Number(statusId))) {
    statusPermission = true;
  }

  // if task assign to 
  if ((assignedUser === null || assignedUser === void 0 ? void 0 : assignedUser.getId()) === (auth === null || auth === void 0 ? void 0 : auth.getId()) && (auth === null || auth === void 0 ? void 0 : auth.getRoleId()) === 4 || (auth === null || auth === void 0 ? void 0 : auth.getRoleId()) === 1) {
    assigneePermission = true;
  }
  return statusPermission && assigneePermission;
}
function clientApproveConfirmationButtonPermission(_ref7) {
  var task = _ref7.task,
    status = _ref7.status,
    auth = _ref7.auth;
  var statusPermission = false;
  var assigneePermission = false;
  var statusId = status ? status.id : -1;
  var assignedUser = task === null || task === void 0 ? void 0 : task.assigneeBy;

  // if status id 6 show timer start button
  if ([9].includes(Number(statusId))) {
    statusPermission = true;
  }

  // if task assign to 
  if ((assignedUser === null || assignedUser === void 0 ? void 0 : assignedUser.getId()) === (auth === null || auth === void 0 ? void 0 : auth.getId()) && (auth === null || auth === void 0 ? void 0 : auth.getRoleId()) === 4 || (auth === null || auth === void 0 ? void 0 : auth.getRoleId()) === 1) {
    assigneePermission = true;
  }
  return statusPermission && assigneePermission;
}
function taskEditPermision(_ref8) {
  var task = _ref8.task,
    status = _ref8.status,
    auth = _ref8.auth;
  var statusPermission = false;
  var assigneePermission = false;
  var statusId = status ? status.id : -1;
  var assignedUser = task === null || task === void 0 ? void 0 : task.assigneeBy;

  // if status id 6 show timer start button
  if ([1, 2, 3].includes(Number(statusId))) {
    statusPermission = true;
  }

  // if task assign to 
  if ((assignedUser === null || assignedUser === void 0 ? void 0 : assignedUser.getId()) === (auth === null || auth === void 0 ? void 0 : auth.getId()) && (auth === null || auth === void 0 ? void 0 : auth.getRoleId()) === 4 || (auth === null || auth === void 0 ? void 0 : auth.getRoleId()) === 1) {
    assigneePermission = true;
  }
  return statusPermission && assigneePermission;
}

// sub task creation permission

function subTaskCreationPermision(_ref9) {
  var task = _ref9.task,
    status = _ref9.status,
    auth = _ref9.auth;
  var statusPermission = false;
  var assigneePermission = false;
  var statusId = status ? status.id : -1;
  var assignedUser = task === null || task === void 0 ? void 0 : task.assigneeTo;
  var assignedBy = task === null || task === void 0 ? void 0 : task.assignedBy;

  // if status id 6 show timer start button
  if ([1, 2, 3].includes(Number(statusId))) {
    statusPermission = true;
  }

  // if task assign to 
  if ((assignedUser === null || assignedUser === void 0 ? void 0 : assignedUser.getId()) === (auth === null || auth === void 0 ? void 0 : auth.getId()) || (assignedBy === null || assignedBy === void 0 ? void 0 : assignedBy.getId()) === (auth === null || auth === void 0 ? void 0 : auth.getId()) && lodash__WEBPACK_IMPORTED_MODULE_0___default().includes([5, 6, 9, 10], auth === null || auth === void 0 ? void 0 : auth.getRoleId()) || (auth === null || auth === void 0 ? void 0 : auth.getRoleId()) === 1) {
    assigneePermission = true;
  }
  return statusPermission && assigneePermission;
}

/***/ }),

/***/ "./resources/js/react/single-task/section/comments/Comment.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/react/single-task/section/comments/Comment.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _CommentPreview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CommentPreview */ "./resources/js/react/single-task/section/comments/CommentPreview.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var Comment = function Comment(_ref) {
  var comment = _ref.comment;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isOpen = _React$useState2[0],
    setIsOpen = _React$useState2[1];
  var user = comment !== null && comment !== void 0 && comment.user ? new _utils_user_details__WEBPACK_IMPORTED_MODULE_3__.User(comment.user) : null;

  // handle comment preview
  var previewComment = function previewComment(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "d-flex justify-content-between sp1_tark_right_item align-items-start pt-1 pb-2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "w-100 sp1_st_comment-view",
        style: {
          overflow: 'hidden'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
          className: "mb-0 pb-0",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
            href: user === null || user === void 0 ? void 0 : user.getUserLink(),
            className: "hover-underline text-primary",
            children: user === null || user === void 0 ? void 0 : user.getName()
          }), " add a comment"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
          className: "text-ellipsis d-flex align-items-center mb-0 pb-0",
          style: {
            color: '#AEAFB9'
          },
          children: (comment === null || comment === void 0 ? void 0 : comment.last_updated_at) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
            children: [dayjs__WEBPACK_IMPORTED_MODULE_4___default().unix(comment === null || comment === void 0 ? void 0 : comment.last_updated_at).format('MMM DD, YYYY '), " at \xA0", dayjs__WEBPACK_IMPORTED_MODULE_4___default().unix(comment === null || comment === void 0 ? void 0 : comment.last_updated_at).format('hh:mm a')]
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "d-flex align-items-center",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
          href: "#",
          className: "mr-2 py-2 sp1_task_righ_action_btn ".concat(isOpen ? 'text-primary' : ''),
          onClick: previewComment,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
            className: "fa-regular fa-eye"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("a", {
          href: "#",
          className: "mr-2 py-2 sp1_task_righ_action_btn",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
            className: "fa-regular fa-pen-to-square"
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
      Modal: true,
      className: "sp1_st_cnt_modal",
      isOpen: isOpen,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_CommentPreview__WEBPACK_IMPORTED_MODULE_2__["default"], {
        isOpen: isOpen,
        close: function close() {
          return setIsOpen(false);
        },
        comment: comment
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comment);

/***/ }),

/***/ "./resources/js/react/single-task/section/comments/CommentModal.jsx":
/*!**************************************************************************!*\
  !*** ./resources/js/react/single-task/section/comments/CommentModal.jsx ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CommentSendBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommentSendBox */ "./resources/js/react/single-task/section/comments/CommentSendBox.jsx");
/* harmony import */ var _components_CustomModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/CustomModal */ "./resources/js/react/single-task/components/CustomModal.jsx");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useWindowSize.js");
/* harmony import */ var _components_loader_CommentLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/loader/CommentLoader */ "./resources/js/react/single-task/components/loader/CommentLoader.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


// import InnerComment from './InnerComment';







var InnerComment = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.lazy(function () {
  return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./InnerComment */ "./resources/js/react/single-task/section/comments/InnerComment.jsx"));
});
var CommentModal = function CommentModal(_ref) {
  var _ref$toggleRef = _ref.toggleRef,
    toggleRef = _ref$toggleRef === void 0 ? null : _ref$toggleRef,
    isOpen = _ref.isOpen,
    close = _ref.close,
    task = _ref.task,
    _ref$comments = _ref.comments,
    comments = _ref$comments === void 0 ? [] : _ref$comments,
    onCommentPost = _ref.onCommentPost;
  var _useWindowSize = (0,react_use__WEBPACK_IMPORTED_MODULE_7__["default"])(),
    width = _useWindowSize.width;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: width > 1200 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_CustomModal__WEBPACK_IMPORTED_MODULE_2__["default"], {
      toggleRef: toggleRef,
      isOpen: isOpen,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "sp1_task_comment_modal",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "border-bottom pb-2 d-flex align-items-center",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
            "aria-label": "close-modal",
            className: "_close-modal ml-auto",
            onClick: close,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
              className: "fa-solid fa-xmark"
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "d-flex flex-column pt-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_CommentSendBox__WEBPACK_IMPORTED_MODULE_1__["default"], {
            onCommentPost: onCommentPost,
            task: task
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "sp1_task_comment_list mt-4",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "font-weight-bold pb-3",
              children: "Comments: "
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "sp1_task_comment_list_items",
              children: (comments === null || comments === void 0 ? void 0 : comments.length) > 0 && (comments === null || comments === void 0 ? void 0 : comments.map(function (comment) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
                    fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_loader_CommentLoader__WEBPACK_IMPORTED_MODULE_4__["default"], {}),
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(InnerComment, {
                      comment: comment
                    })
                  })
                }, comment.id);
              }))
            })]
          })]
        })]
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_3__["default"], {
        isOpen: isOpen,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "position-relative",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "sp1_task_comment_modal --small-device",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "border-bottom pb-2 d-flex align-items-center",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
                "aria-label": "close-modal",
                className: "_close-modal ml-auto",
                onClick: close,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                  className: "fa-solid fa-xmark"
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "d-flex flex-column pt-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_CommentSendBox__WEBPACK_IMPORTED_MODULE_1__["default"], {
                onCommentPost: onCommentPost,
                task: task
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "sp1_task_comment_list mt-4",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "font-weight-bold pb-3",
                  children: "Comments: "
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "sp1_task_comment_list_items",
                  children: (comments === null || comments === void 0 ? void 0 : comments.length) > 0 && (comments === null || comments === void 0 ? void 0 : comments.map(function (comment) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
                        fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_loader_CommentLoader__WEBPACK_IMPORTED_MODULE_4__["default"], {}),
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(InnerComment, {
                          comment: comment
                        })
                      })
                    }, comment.id);
                  }))
                })]
              })]
            })]
          })
        })
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentModal);

/***/ }),

/***/ "./resources/js/react/single-task/section/comments/CommentPreview.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/comments/CommentPreview.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _InnerComment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InnerComment */ "./resources/js/react/single-task/section/comments/InnerComment.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var CommentPreview = function CommentPreview(_ref) {
  var isOpen = _ref.isOpen,
    close = _ref.close,
    comment = _ref.comment;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    className: "sp1_st_comment_preview",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "sp1_st_comment_panel",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "border-bottom pb-2 d-flex align-items-center",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          "aria-label": "close-modal",
          className: "_close-modal",
          onClick: close,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "_comment_list mt-3",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_InnerComment__WEBPACK_IMPORTED_MODULE_2__["default"], {
          comment: comment
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentPreview);

/***/ }),

/***/ "./resources/js/react/single-task/section/comments/CommentSendBox.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/comments/CommentSendBox.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _file_upload_UploadFilesInLine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../file-upload/UploadFilesInLine */ "./resources/js/react/file-upload/UploadFilesInLine.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var CommentSendBox = function CommentSendBox(_ref) {
  var _window, _window$Laravel;
  var onCommentPost = _ref.onCommentPost,
    task = _ref.task;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    editMode = _React$useState2[0],
    setEditMode = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(''),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    comment = _React$useState4[0],
    setComment = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    files = _React$useState6[0],
    setFiles = _React$useState6[1];
  var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_6__.User((_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user);
  var _useStoreCommentMutat = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__.useStoreCommentMutation)(),
    _useStoreCommentMutat2 = _slicedToArray(_useStoreCommentMutat, 2),
    storeComment = _useStoreCommentMutat2[0],
    isLoading = _useStoreCommentMutat2[1].isLoading;
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var fd = new FormData();
    fd.append('comment', comment);
    fd.append('task_id', task === null || task === void 0 ? void 0 : task.id);
    fd.append('_token', document.querySelector("meta[name='csrf-token']").getAttribute("content"));
    Array.from(files).forEach(function (file) {
      fd.append('file[]', file);
    });
    storeComment({
      data: fd,
      task_id: task === null || task === void 0 ? void 0 : task.id
    }).unwrap().then(function (res) {
      setEditMode(false);
      setComment("");
      setFiles('');
      var comment = _objectSpread({}, res);
      comment.last_updated_at = dayjs__WEBPACK_IMPORTED_MODULE_7___default()(res === null || res === void 0 ? void 0 : res.last_updated_at).unix();
      onCommentPost(comment);
    })["catch"](function (err) {
      return console.log(err);
    });
  };
  var commentMode = function commentMode() {
    if (editMode) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "w-100",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "ck-editor-holder",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
            data: comment,
            onChange: handleEditorChange
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "mt-2",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h6", {
            children: "Attach Files"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_file_upload_UploadFilesInLine__WEBPACK_IMPORTED_MODULE_3__["default"], {
            files: files,
            setFiles: setFiles,
            uploadInputClass: "comment-file-upload",
            fileWrapperClass: "comment-uploaded-file"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "cursor-processing mr-2",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "spinner-border text-white",
              role: "status",
              style: {
                width: '18px',
                height: '18px'
              }
            }), "Processing..."]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "mr-2",
            onClick: handleSubmit,
            children: "Send"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            variant: "secondary",
            onClick: function onClick() {
              return setEditMode(false);
            },
            children: "Close"
          })]
        })]
      });
    }
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      onClick: function onClick() {
        return setEditMode(true);
      },
      className: "__box",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
        children: "Write a comment ..."
      })
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: "sp1_task_comment_send_box",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "__avatar rounded-circle mr-2",
        style: {
          width: '36px',
          height: '36px'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
          src: auth === null || auth === void 0 ? void 0 : auth.getAvatar(),
          alt: "sender_name",
          width: "36px",
          height: "36px",
          className: "rounded-circle"
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "__send-box",
      children: commentMode()
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentSendBox);

/***/ }),

/***/ "./resources/js/react/single-task/section/comments/CommentWritingModal.jsx":
/*!*********************************************************************************!*\
  !*** ./resources/js/react/single-task/section/comments/CommentWritingModal.jsx ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var CommentWritingModal = function CommentWritingModal(_ref) {
  var isOpen = _ref.isOpen,
    close = _ref.close;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isOpen: isOpen,
    className: "sp1_st_cnt_modal",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "sp1_st_comment_preview",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "sp1_st_comment_panel",
        style: {
          maxWidth: '60vw',
          minHeight: '50vh'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "border-bottom pb-2 d-flex",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            "aria-label": "close-modal",
            className: "_close-modal",
            onClick: close,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
              className: "fa-solid fa-xmark"
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "mt-3 w-100",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "sp1_st_write_comment-sendbox",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              style: {
                minWidth: '48px'
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                src: "/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png",
                alt: "",
                width: 48,
                height: 48,
                className: "rounded-circle"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "sp1_st_write_comment_editor",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_3__["default"], {})
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "py-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  children: ["Attach Files here (if need) ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
                    className: "fa-solid fa-paperclip ml-1 text-primary"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  className: "sp1_st_write_comment_editor_attach",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
                    className: "fa-solid fa-cloud-arrow-up"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    children: "Attach Files"
                  })]
                })]
              })]
            })]
          })
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentWritingModal);

/***/ }),

/***/ "./resources/js/react/single-task/section/comments/CommentsSection.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/comments/CommentsSection.jsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Comment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comment */ "./resources/js/react/single-task/section/comments/Comment.jsx");
/* harmony import */ var _CommentModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CommentModal */ "./resources/js/react/single-task/section/comments/CommentModal.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _CommentWritingModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CommentWritingModal */ "./resources/js/react/single-task/section/comments/CommentWritingModal.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var CommentSection = function CommentSection(_ref) {
  var task = _ref.task,
    isLoading = _ref.isLoading;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    comments = _React$useState2[0],
    setComments = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    modalIsOpen = _React$useState4[0],
    setModalIsOpen = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    openAddCommentModal = _React$useState6[0],
    setOpenAddCommentModal = _React$useState6[1];
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    modalToggleRef = _React$useState8[0],
    setModalToggleRef = _React$useState8[1];
  var toggleModalButton = function toggleModalButton() {
    return setModalIsOpen(!modalIsOpen);
  };
  var toggleAddCommentModal = function toggleAddCommentModal() {
    return setOpenAddCommentModal(!openAddCommentModal);
  };
  var closeAddCommentModal = function closeAddCommentModal() {
    return setOpenAddCommentModal(false);
  };
  var _useLazyGetTaskDetail = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__.useLazyGetTaskDetailsQuery)(),
    _useLazyGetTaskDetail2 = _slicedToArray(_useLazyGetTaskDetail, 2),
    getTaskDetails = _useLazyGetTaskDetail2[0],
    isFetching = _useLazyGetTaskDetail2[1].isFetching;

  // if task notes fetch completed store data into redux store
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (task && task.id) {
      getTaskDetails("/".concat(task === null || task === void 0 ? void 0 : task.id, "/json?mode=task_comment")).unwrap().then(function (res) {
        var r = lodash__WEBPACK_IMPORTED_MODULE_6___default().orderBy(_toConsumableArray(res), "id", "desc");
        setComments(r);
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, []);

  // on comment post
  var onCommentPost = function onCommentPost(comment) {
    var _comments = _toConsumableArray(comments);
    _comments.unshift(comment);
    setComments(_comments);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      className: "sp1_task_right_card mb-3",
      ref: setModalToggleRef,
      style: {
        zIndex: modalIsOpen ? '99' : ''
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_CommentModal__WEBPACK_IMPORTED_MODULE_2__["default"], {
        isOpen: modalIsOpen,
        toggleRef: modalToggleRef,
        comments: comments,
        task: task,
        close: function close() {
          return setModalIsOpen(false);
        },
        onCommentPost: onCommentPost
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
        "aria-label": "openCommentModalButton",
        className: "sp1_task_right_dl_toggle",
        onClick: toggleModalButton,
        style: {
          zIndex: modalIsOpen ? '110' : ''
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
          className: "fa-solid fa-circle-chevron-".concat(modalIsOpen ? 'right' : 'left'),
          style: {
            color: "#276fec"
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h6", {
          className: "f-16 mb-0",
          children: "Comment"
        }), (isLoading || isFetching) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "spinner-border text-dark ml-2 mr-auto",
          role: "status",
          style: {
            width: '16px',
            height: '16px',
            border: '0.14em solid rgba(0, 0, 0, .25)',
            borderRightColor: 'transparent'
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
          variant: "tertiary",
          className: "sp1_tark_add_item",
          "aria-label": "addButton",
          onClick: toggleModalButton,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
            className: "fa-solid fa-plus",
            style: {
              fontSize: '12px'
            }
          }), "Comment"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_CommentWritingModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
          isOpen: openAddCommentModal,
          close: closeAddCommentModal
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "sp1_task_right_card--body",
        children: !isFetching && !isLoading ? (comments === null || comments === void 0 ? void 0 : comments.length) > 0 ? comments === null || comments === void 0 ? void 0 : comments.map(function (comment) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Comment__WEBPACK_IMPORTED_MODULE_1__["default"], {
            comment: comment
          }, comment.id);
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "d-flex align-items-center justify-content-center",
          style: {
            color: '#B4BCC4',
            fontSize: '15px',
            textAlign: 'center',
            height: '100%',
            width: '100%'
          },
          children: "No Comment is Avaliable"
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "d-flex align-items-center justify-content-center",
          style: {
            color: '#5A6169',
            fontSize: '15px',
            textAlign: 'center',
            height: '100%',
            width: '100%'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
            className: "spinner-border text-dark ml-2",
            role: "status",
            style: {
              width: '16px',
              height: '16px',
              border: '0.14em solid rgba(0, 0, 0, .25)',
              borderRightColor: 'transparent',
              marginRight: '10px'
            }
          }), "Loading..."]
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentSection);

/***/ }),

/***/ "./resources/js/react/single-task/section/comments/InnerComment.jsx":
/*!**************************************************************************!*\
  !*** ./resources/js/react/single-task/section/comments/InnerComment.jsx ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var emoji_picker_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! emoji-picker-react */ "./node_modules/emoji-picker-react/dist/emoji-picker-react.esm.js");
/* harmony import */ var _components_Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Dropdown */ "./resources/js/react/single-task/components/Dropdown.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _file_upload_UploadFilesInLine__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../file-upload/UploadFilesInLine */ "./resources/js/react/file-upload/UploadFilesInLine.jsx");
/* harmony import */ var _file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../file-upload/FileUploader */ "./resources/js/react/file-upload/FileUploader.jsx");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












var InnerComment = function InnerComment(_ref) {
  var _comment$files_data;
  var comment = _ref.comment;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    showReplies = _React$useState2[0],
    setShowReplies = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    replyMode = _React$useState4[0],
    setReplyMode = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState(''),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    selectedEmoji = _React$useState6[0],
    setSelectedEmoji = _React$useState6[1];
  var user = comment !== null && comment !== void 0 && comment.user ? new _utils_user_details__WEBPACK_IMPORTED_MODULE_5__.User(comment.user) : null;
  var replies = comment === null || comment === void 0 ? void 0 : comment.replies;
  var handleReplyButtonClick = function handleReplyButtonClick(e) {
    e.preventDefault();
    setReplyMode(true);
  };

  // emoji selection control
  var handleEmojiSelect = function handleEmojiSelect(emojiData, event) {
    setSelectedEmoji(emojiData.unified);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
    className: "sp1_task_comment_send_box sp1_task_comment_replied pl-2 pb-2",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      className: "__send-box flex-column align-items-start",
      style: {
        maxWidth: '100%'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "d-flex align-items-center",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "mr-2",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
            className: "rounded-circle",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("img", {
              src: user === null || user === void 0 ? void 0 : user.getAvatar(),
              alt: user === null || user === void 0 ? void 0 : user.getName(),
              width: "32px",
              height: "32px",
              className: "rounded-circle"
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "sp1_comment",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span", {
            className: "sp1_comment_user--name",
            children: [user === null || user === void 0 ? void 0 : user.getName(), " (", user === null || user === void 0 ? void 0 : user.getDesignationName(), ")"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
            className: "sp1_comment_time",
            style: {
              color: '#888'
            },
            children: (comment === null || comment === void 0 ? void 0 : comment.last_updated_at) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
              children: [dayjs__WEBPACK_IMPORTED_MODULE_8___default().unix(comment === null || comment === void 0 ? void 0 : comment.last_updated_at).format('MMM DD, YYYY '), " at \xA0", dayjs__WEBPACK_IMPORTED_MODULE_8___default().unix(comment === null || comment === void 0 ? void 0 : comment.last_updated_at).format('hh:mm a')]
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "__box __reply_text w-100 my-1 text-dark",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "sp1_ck_content sp1_message--body",
          style: {
            overflow: 'hidden'
          },
          dangerouslySetInnerHTML: {
            __html: comment === null || comment === void 0 ? void 0 : comment.comment
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "files",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_7__["default"], {
          children: comment === null || comment === void 0 ? void 0 : (_comment$files_data = comment.files_data) === null || _comment$files_data === void 0 ? void 0 : _comment$files_data.map(function (file) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_7__["default"].Preview, {
              fileName: file === null || file === void 0 ? void 0 : file.name,
              downloadAble: true,
              deleteAble: false,
              downloadUrl: file === null || file === void 0 ? void 0 : file.url,
              previewUrl: file === null || file === void 0 ? void 0 : file.url,
              fileType: file === null || file === void 0 ? void 0 : file.icon,
              ext: ""
            }, file === null || file === void 0 ? void 0 : file.name);
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "sp1_task_comment_actions",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(_components_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"], {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Toggle, {
            icon: false,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("i", {
              className: "fa-regular fa-face-smile"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Menu, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(emoji_picker_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
              lazyLoadEmojis: true
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
          children: "\u2022"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("a", {
          href: "#",
          onClick: handleReplyButtonClick,
          children: "Reply"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
          children: "\u2022"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("a", {
          href: "#",
          children: "Delete"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
          children: "\u2022"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("a", {
          href: "#",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("i", {
            className: "fa-solid fa-paperclip"
          })
        }), (replies === null || replies === void 0 ? void 0 : replies.length) > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "replies_count",
          onClick: function onClick() {
            return setShowReplies(!showReplies);
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            className: "reply_auth_avatar",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("img", {
                src: "/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png",
                alt: "sender_name",
                width: "20px",
                height: "20px",
                className: "rounded-circle"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("img", {
                src: "/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png",
                alt: "sender_name",
                width: "20px",
                height: "20px",
                className: "rounded-circle ml-2"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("img", {
                src: "/user-uploads/avatar/40164f31bc7d575c7dbe99b24b408d75.png",
                alt: "sender_name",
                width: "20px",
                height: "20px",
                className: "rounded-circle ml-3"
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
            className: "ml-2",
            children: "3 replies"
          })]
        })]
      }), replyMode && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "mt-3 pl-3 w-100",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "w-100",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
            className: "ck-editor-holder",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {})
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            className: "mt-3 d-flex align-items-center",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
              className: "mr-2",
              children: "Reply"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
              variant: "secondary",
              onClick: function onClick() {
                return setReplyMode(false);
              },
              children: "Close"
            })]
          })]
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InnerComment);

/***/ }),

/***/ "./resources/js/react/single-task/section/history/Histories.jsx":
/*!**********************************************************************!*\
  !*** ./resources/js/react/single-task/section/history/Histories.jsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_CustomModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/CustomModal */ "./resources/js/react/single-task/components/CustomModal.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _InnerHistoryItemLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InnerHistoryItemLoader */ "./resources/js/react/single-task/section/history/InnerHistoryItemLoader.jsx");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useWindowSize.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var InnerHistoryItem = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_single-task_section_history_InnerHistoryItem_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ./InnerHistoryItem */ "./resources/js/react/single-task/section/history/InnerHistoryItem.jsx"));
});





var Histories = function Histories(_ref) {
  var isOpen = _ref.isOpen,
    close = _ref.close,
    toggle = _ref.toggle,
    _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data;
  var _useWindowSize = (0,react_use__WEBPACK_IMPORTED_MODULE_6__["default"])(),
    deviceWidth = _useWindowSize.width;
  var content = function content() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "sp1-subtask-form --modal-panel",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "sp1-subtask-form --modal-panel-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h6", {
          children: " History "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
          "aria-label": "close-modal",
          className: "_close-modal",
          onClick: close,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "sp1-subtask-form --modal-panel-body",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "mt-3",
          children: data ? data.map(function (d) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Suspense), {
                fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_InnerHistoryItemLoader__WEBPACK_IMPORTED_MODULE_3__["default"], {}),
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(InnerHistoryItem, {
                  history: d
                })
              })
            }, d.id);
          }) : null
        })
      })]
    });
  };
  if (deviceWidth > 1200) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_CustomModal__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isOpen: isOpen,
      toggleRef: toggle,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
        children: content()
      })
    });
  } else {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isOpen: isOpen,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
        children: content()
      })
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Histories);

/***/ }),

/***/ "./resources/js/react/single-task/section/history/InnerHistoryItemLoader.jsx":
/*!***********************************************************************************!*\
  !*** ./resources/js/react/single-task/section/history/InnerHistoryItemLoader.jsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var InnerHistoryItemLoader = function InnerHistoryItemLoader() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "d-flex align-items-center sp1_tark_right_item py-2",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
        width: 48,
        height: 48
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "px-3 w-100",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
        className: "mb-2"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {})]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InnerHistoryItemLoader);

/***/ }),

/***/ "./resources/js/react/single-task/section/history/historySection.jsx":
/*!***************************************************************************!*\
  !*** ./resources/js/react/single-task/section/history/historySection.jsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _Histories__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Histories */ "./resources/js/react/single-task/section/history/Histories.jsx");
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! swr */ "./node_modules/swr/core/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var HistoryItem = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_single-task_section_history_HistoryItem_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ./HistoryItem */ "./resources/js/react/single-task/section/history/HistoryItem.jsx"));
});








var fetcher = function fetcher(url) {
  return axios.get(url).then(function (res) {
    return res.data;
  });
};
var HistorySection = function HistorySection() {
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (s) {
      return s.subTask;
    }),
    task = _useSelector.task,
    histories = _useSelector.histories;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    modalRefButton = _React$useState2[0],
    setModalRefButton = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    isOpen = _React$useState4[0],
    setIsOpen = _React$useState4[1];
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  var _useSWR = (0,swr__WEBPACK_IMPORTED_MODULE_6__["default"])("/account/task/".concat(task.id, "/json?mode=task_history"), fetcher, {
      refreshInterval: 5000
    }),
    data = _useSWR.data,
    error = _useSWR.error,
    isFetching = _useSWR.isLoading;

  //fetch all task 
  // const [getTaskDetails, {isFetching}] = useLazyGetTaskDetailsQuery('', {
  //   skip: histories?.length
  // })

  //if task notes fetch completed store data into redux store
  //  React.useEffect(()=> {
  //   if(task && task.id){
  //     getTaskDetails(`/${task?.id}/json?mode=task_history`)
  //     .unwrap()
  //     .then(res => {
  //       if(res){
  //         dispatch(storeHistories(res));
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  //   } 
  // }, [task]); 

  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if (!isFetching && data) {
      dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_3__.storeHistories)(data));
    }
  }, [data, isFetching]);

  // control modal
  var toggle = function toggle() {
    return setIsOpen(!isOpen);
  };
  var close = function close() {
    return setIsOpen(false);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    className: "sp1_task_right_card mb-3",
    ref: setModalRefButton,
    style: {
      zIndex: isOpen ? 99 : ''
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      className: "d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
        className: "f-16",
        children: "History"
      }), isFetching && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "spinner-border text-dark ml-2 mr-auto",
        role: "status",
        style: {
          width: '16px',
          height: '16px',
          border: '0.14em solid rgba(0, 0, 0, .25)',
          borderRightColor: 'transparent'
        }
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
      "aria-label": "openCommentModalButton",
      className: "sp1_task_right_dl_toggle",
      onClick: toggle,
      style: {
        zIndex: isOpen ? '110' : ''
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
        className: "fa-solid fa-circle-chevron-".concat(isOpen ? 'right' : 'left'),
        style: {
          color: "#276fec"
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Histories__WEBPACK_IMPORTED_MODULE_5__["default"], {
      isOpen: isOpen,
      close: close,
      data: histories,
      toggle: modalRefButton
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "sp1_task_right_card--body",
      children: !isFetching ? histories ? histories.map(function (history) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
            fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
              className: "sp1_tark_right_item py-2 ",
              children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
            }),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(HistoryItem, {
              history: history
            })
          })
        }, history.id);
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "d-flex align-items-center justify-content-center",
        style: {
          color: '#B4BCC4',
          fontSize: '15px',
          textAlign: 'center',
          height: '100%',
          width: '100%'
        },
        children: "Empty History"
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "d-flex align-items-center justify-content-center",
        style: {
          color: '#5A6169',
          fontSize: '15px',
          textAlign: 'center',
          height: '100%',
          width: '100%'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "spinner-border text-dark ml-2",
          role: "status",
          style: {
            width: '16px',
            height: '16px',
            border: '0.14em solid rgba(0, 0, 0, .25)',
            borderRightColor: 'transparent',
            marginRight: '10px'
          }
        }), "Loading..."]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HistorySection);

/***/ }),

/***/ "./resources/js/react/single-task/section/notes/CreateNote.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/react/single-task/section/notes/CreateNote.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _file_upload_UploadFilesInLine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../file-upload/UploadFilesInLine */ "./resources/js/react/file-upload/UploadFilesInLine.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _components_form_Input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/form/Input */ "./resources/js/react/single-task/components/form/Input.jsx");
/* harmony import */ var _components_CustomModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/CustomModal */ "./resources/js/react/single-task/components/CustomModal.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useWindowSize.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














var CreateNote = function CreateNote(_ref) {
  var isOpen = _ref.isOpen,
    close = _ref.close,
    toggleRef = _ref.toggleRef;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)(function (s) {
      return s.subTask;
    }),
    task = _useSelector.task,
    notes = _useSelector.notes;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    files = _React$useState2[0],
    setFiles = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(''),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    title = _React$useState4[0],
    setTitle = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    errTitle = _React$useState6[0],
    setErrTitle = _React$useState6[1];
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState(''),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    note = _React$useState8[0],
    setNote = _React$useState8[1];
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useDispatch)();
  var _useWindowSize = (0,react_use__WEBPACK_IMPORTED_MODULE_12__["default"])(),
    deviceWidth = _useWindowSize.width;
  var _useCrateNoteMutation = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__.useCrateNoteMutation)(),
    _useCrateNoteMutation2 = _slicedToArray(_useCrateNoteMutation, 2),
    crateNote = _useCrateNoteMutation2[0],
    isLoading = _useCrateNoteMutation2[1].isLoading;

  // handle onchange
  var handleChange = function handleChange(e, setState) {
    e.preventDefault();
    var value = e.target.value;
    setState(value);
  };
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    if (!title) {
      setErrTitle('Title name required');
      return null;
    }
    var fd = new FormData();
    fd.append('title', title);
    fd.append('note', note);
    fd.append('taskId', task === null || task === void 0 ? void 0 : task.id);
    fd.append('_token', document.querySelector("meta[name='csrf-token']").getAttribute("content"));
    Array.from(files).forEach(function (file) {
      fd.append('file[]', file);
    });
    crateNote(fd).unwrap().then(function (res) {
      if ((res === null || res === void 0 ? void 0 : res.status) === 'success') {
        var _notes = _toConsumableArray(notes);
        _notes.push(res === null || res === void 0 ? void 0 : res.note);
        dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_7__.storeNotes)(_notes));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Data has been stored Successfully",
          showConfirmButton: false,
          timer: 2500
        });
        close();
      }
    })["catch"](function (err) {
      console.log(err);
    });
  };
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setNote(data);
  };
  var content = function content() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
      className: "sp1-subtask-form --modal-panel",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: "sp1-subtask-form --modal-panel-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("h6", {
          children: "Write Notes"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          "aria-label": "close-modal",
          className: "_close-modal",
          onClick: close,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        className: "sp1-subtask-form --modal-panel-body",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
          className: "py-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_8__["default"], {
            id: "title",
            label: "Title",
            type: "text",
            placeholder: "Enter a task title",
            name: "title",
            required: true,
            value: title,
            error: errTitle,
            onChange: function onChange(e) {
              return handleChange(e, setTitle);
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            className: "sp1_st_write_comment_editor",
            style: {
              minHeight: '100px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("h6", {
              className: "mb-3 f-14",
              style: {
                color: '#777'
              },
              children: "Write Note"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_3__["default"], {
              onChange: handleEditorChange
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            className: "mt-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("h6", {
              className: "mb-3 f-14",
              style: {
                color: '#777'
              },
              children: "Upload Files"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_file_upload_UploadFilesInLine__WEBPACK_IMPORTED_MODULE_4__["default"], {
              files: files,
              setFiles: setFiles
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
            className: "mt-5",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
              className: "d-flex align-items-center",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                variant: "secondary",
                className: "mr-2",
                onClick: close,
                children: "Cancel"
              }), !isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                onClick: handleSubmit,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("i", {
                  className: "fa-regular fa-paper-plane"
                }), "Keep as Notes"]
              }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                className: "cursor-processing",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                  className: "spinner-border text-white",
                  role: "status",
                  style: {
                    width: '18px',
                    height: '18px'
                  }
                }), "Processing..."]
              })]
            })
          })]
        })
      })]
    });
  };
  if (deviceWidth > 1200) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_CustomModal__WEBPACK_IMPORTED_MODULE_9__["default"], {
      isOpen: isOpen,
      toggleRef: toggleRef,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: content()
      })
    });
  } else {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_10__["default"], {
      isOpen: isOpen,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: content()
      })
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateNote);

/***/ }),

/***/ "./resources/js/react/single-task/section/notes/EditNote.jsx":
/*!*******************************************************************!*\
  !*** ./resources/js/react/single-task/section/notes/EditNote.jsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _file_upload_UploadFilesInLine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../file-upload/UploadFilesInLine */ "./resources/js/react/file-upload/UploadFilesInLine.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _components_form_Input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/form/Input */ "./resources/js/react/single-task/components/form/Input.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _components_CustomModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/CustomModal */ "./resources/js/react/single-task/components/CustomModal.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useWindowSize.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
















var EditNote = function EditNote(_ref) {
  var isOpen = _ref.isOpen,
    close = _ref.close,
    toggleRef = _ref.toggleRef;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)(function (s) {
      return s.subTask;
    }),
    task = _useSelector.task,
    notes = _useSelector.notes;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    files = _React$useState2[0],
    setFiles = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(''),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    title = _React$useState4[0],
    setTitle = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    errTitle = _React$useState6[0],
    setErrTitle = _React$useState6[1];
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState(''),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    note = _React$useState8[0],
    setNote = _React$useState8[1];
  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    attachedFiles = _React$useState10[0],
    setAttachedFiles = _React$useState10[1];
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useDispatch)();
  var _useWindowSize = (0,react_use__WEBPACK_IMPORTED_MODULE_12__["default"])(),
    deviceWidth = _useWindowSize.width;
  var _useSearchParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_13__.useSearchParams)(),
    _useSearchParams2 = _slicedToArray(_useSearchParams, 1),
    searchParams = _useSearchParams2[0];
  var noteId = searchParams.get('note');
  var type = searchParams.get('type');
  var _useUpdateNoteMutatio = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__.useUpdateNoteMutation)(),
    _useUpdateNoteMutatio2 = _slicedToArray(_useUpdateNoteMutatio, 2),
    updateNote = _useUpdateNoteMutatio2[0],
    isLoading = _useUpdateNoteMutatio2[1].isLoading;

  // fetch all task 
  var _useGetTaskDetailsQue = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__.useGetTaskDetailsQuery)("/".concat(noteId, "/json?mode=task_note_edit"), {
      skip: type ? type !== 'edit' || !noteId : true,
      refetchOnMountOrArgChange: true
    }),
    data = _useGetTaskDetailsQue.data,
    isFetching = _useGetTaskDetailsQue.isFetching;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    clearField();
    if (!isFetching && data) {
      setTitle(data === null || data === void 0 ? void 0 : data.title);
      setNote(data === null || data === void 0 ? void 0 : data.note);
      setAttachedFiles((data === null || data === void 0 ? void 0 : data.files) || []);
    }
  }, [data, noteId, isFetching]);
  var clearField = function clearField() {
    setTitle('');
    setNote('');
    setAttachedFiles([]);
  };
  var handleClose = function handleClose() {
    clearField();
    close();
  };

  // handle onchange
  var handleChange = function handleChange(e, setState) {
    e.preventDefault();
    var value = e.target.value;
    setState(value);
  };

  // handle submittion
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    if (!title) {
      setErrTitle('Title name required');
      return null;
    }
    var fd = new FormData();
    fd.append('title', title);
    fd.append('note', note);
    fd.append('taskId', task === null || task === void 0 ? void 0 : task.id);
    fd.append('_token', document.querySelector("meta[name='csrf-token']").getAttribute("content"));
    fd.append('_method', 'PUT');
    Array.from(files).forEach(function (file) {
      fd.append('file[]', file);
    });
    updateNote({
      data: fd,
      id: noteId
    }).unwrap().then(function (res) {
      if ((res === null || res === void 0 ? void 0 : res.status) === 'success') {
        var _notes2;
        var _notes = _toConsumableArray(notes);
        _notes = (_notes2 = _notes) === null || _notes2 === void 0 ? void 0 : _notes2.map(function (note) {
          var _res$note;
          if (Number(note === null || note === void 0 ? void 0 : note.id) === Number(res === null || res === void 0 ? void 0 : (_res$note = res.note) === null || _res$note === void 0 ? void 0 : _res$note.id)) {
            return res === null || res === void 0 ? void 0 : res.note;
          } else return note;
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res === null || res === void 0 ? void 0 : res.message,
          showConfirmButton: false,
          timer: 2500
        });
        dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_7__.storeNotes)(_notes));
        handleClose();
      }
    })["catch"](function (err) {
      console.log(err);
    });
  };

  // handle editor
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setNote(data);
  };

  // handle loading state
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (isLoading || isFetching) {
      document.getElementsByTagName('body')[0].style.cursor = 'progress';
    } else {
      document.getElementsByTagName('body')[0].style.cursor = 'default';
    }
  }, [isLoading, isFetching]);

  // handle uplaoded file delete request
  var _useDeleteNoteUploade = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__.useDeleteNoteUploadedFileMutation)(),
    _useDeleteNoteUploade2 = _slicedToArray(_useDeleteNoteUploade, 1),
    deleteNoteUploadedFile = _useDeleteNoteUploade2[0];
  var handleFileDelete = function handleFileDelete(e, file) {
    // delete
    deleteNoteUploadedFile(file === null || file === void 0 ? void 0 : file.id).unwrap();

    // delete form ui
    var previousFile = _toConsumableArray(attachedFiles);
    var index = previousFile === null || previousFile === void 0 ? void 0 : previousFile.indexOf(file);
    previousFile.splice(index, 1);
    setAttachedFiles(previousFile);
  };
  var content = function content() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
      className: "sp1-subtask-form --modal-panel",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: "sp1-subtask-form --modal-panel-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("h6", {
          children: ["Update Notes", isFetching && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
            className: "spinner-border text-dark ml-2",
            role: "status",
            style: {
              width: '16px',
              height: '16px',
              border: '0.14em solid rgba(0, 0, 0, .25)',
              borderRightColor: 'transparent'
            }
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          "aria-label": "close-modal",
          className: "_close-modal",
          onClick: handleClose,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: "sp1-subtask-form --modal-panel-body",
        children: [isFetching && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
          className: "w-100",
          style: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
          className: "py-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_8__["default"], {
            id: "title",
            label: "Title",
            type: "text",
            placeholder: "Enter a task title",
            name: "title",
            required: true,
            value: title,
            error: errTitle,
            onChange: function onChange(e) {
              return handleChange(e, setTitle);
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            className: "sp1_st_write_comment_editor pr-0",
            style: {
              minHeight: '100px'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("h6", {
              className: "mb-3 f-14",
              style: {
                color: '#777'
              },
              children: "Write Note"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_3__["default"], {
              data: note,
              onChange: handleEditorChange
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            className: "mt-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("h6", {
              className: "mb-3 f-14",
              style: {
                color: '#777'
              },
              children: "Upload Files"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_file_upload_UploadFilesInLine__WEBPACK_IMPORTED_MODULE_4__["default"], {
              files: files,
              setFiles: setFiles,
              previous: attachedFiles,
              onPreviousFileDelete: handleFileDelete
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
            className: "mt-5",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
              className: "d-flex align-items-center",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                variant: "secondary",
                className: "mr-2",
                onClick: handleClose,
                children: "Cancel"
              }), !isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                onClick: handleSubmit,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("i", {
                  className: "fa-regular fa-paper-plane"
                }), "Update"]
              }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                className: "cursor-processing",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
                  className: "spinner-border text-white",
                  role: "status",
                  style: {
                    width: '18px',
                    height: '18px'
                  }
                }), "Processing..."]
              })]
            })
          })]
        })]
      })]
    });
  };
  if (deviceWidth > 1200) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_CustomModal__WEBPACK_IMPORTED_MODULE_9__["default"], {
      isOpen: isOpen,
      toggleRef: toggleRef,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: content()
      })
    });
  } else {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_10__["default"], {
      isOpen: isOpen,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: content()
      })
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditNote);

/***/ }),

/***/ "./resources/js/react/single-task/section/notes/Note.jsx":
/*!***************************************************************!*\
  !*** ./resources/js/react/single-task/section/notes/Note.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var Note = function Note(_ref) {
  var note = _ref.note;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "d-flex align-items-center justify-content-between sp1_tark_right_item",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "w-100 text-ellipsis",
      children: (note === null || note === void 0 ? void 0 : note.title) || 'Untitled'
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "d-flex align-items-center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {
        to: "?note=".concat(note.id, "&type=view"),
        className: "mr-2 py-2 sp1_task_righ_action_btn",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i", {
          className: "fa-regular fa-eye"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {
        to: "?note=".concat(note.id, "&type=edit"),
        className: "mr-2 py-2 sp1_task_righ_action_btn",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i", {
          className: "fa-regular fa-pen-to-square"
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Note);

/***/ }),

/***/ "./resources/js/react/single-task/section/notes/NoteSection.jsx":
/*!**********************************************************************!*\
  !*** ./resources/js/react/single-task/section/notes/NoteSection.jsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Note */ "./resources/js/react/single-task/section/notes/Note.jsx");
/* harmony import */ var _CreateNote__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateNote */ "./resources/js/react/single-task/section/notes/CreateNote.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _EditNote__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EditNote */ "./resources/js/react/single-task/section/notes/EditNote.jsx");
/* harmony import */ var _NoteView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NoteView */ "./resources/js/react/single-task/section/notes/NoteView.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }













var NoteSection = function NoteSection() {
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)(function (s) {
      return s.subTask;
    }),
    task = _useSelector.task,
    notes = _useSelector.notes;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    mode = _React$useState2[0],
    setMode = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    modalRefButton = _React$useState4[0],
    setModalRefButton = _React$useState4[1];
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useNavigate)();
  var _useSearchParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useSearchParams)(),
    _useSearchParams2 = _slicedToArray(_useSearchParams, 1),
    searchParams = _useSearchParams2[0];
  var paramType = searchParams.get('type');

  // fetch all task 
  var _useLazyGetTaskDetail = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_6__.useLazyGetTaskDetailsQuery)('', {
      skip: notes === null || notes === void 0 ? void 0 : notes.length
    }),
    _useLazyGetTaskDetail2 = _slicedToArray(_useLazyGetTaskDetail, 2),
    getTaskDetails = _useLazyGetTaskDetail2[0],
    isFetching = _useLazyGetTaskDetail2[1].isFetching;

  // control mode 
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    var _mode = paramType ? paramType : '';
    setMode(_mode);
  }, [paramType]);

  // if task notes fetch completed store data into redux store
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if (task && task.id) {
      getTaskDetails("/".concat(task === null || task === void 0 ? void 0 : task.id, "/json?mode=task_note")).unwrap().then(function (res) {
        if (res) {
          dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_5__.storeNotes)(res));
        }
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, [task]);

  // close modal
  var close = function close(e) {
    navigate("/account/tasks/".concat(task.id));
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    className: "sp1_task_right_card mb-3",
    ref: setModalRefButton,
    style: {
      zIndex: mode ? '99' : ''
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      className: "d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
        className: "f-16",
        children: "Notes"
      }), isFetching && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "spinner-border text-dark ml-2 mr-auto",
        role: "status",
        style: {
          width: '16px',
          height: '16px',
          border: '0.14em solid rgba(0, 0, 0, .25)',
          borderRightColor: 'transparent'
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
        variant: "tertiary",
        className: "sp1_tark_add_item",
        "aria-label": "addButton",
        onClick: function onClick() {
          return navigate("?type=create");
        },
        children: mode === 'create' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("i", {
            className: "fa-solid fa-xmark",
            style: {
              fontSize: '12px'
            }
          }), " Close "]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.Fragment, {
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("i", {
            className: "fa-solid fa-plus",
            style: {
              fontSize: '12px'
            }
          }), " Note  "]
        })
      })]
    }), mode && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("button", {
      "aria-label": "openCommentModalButton",
      className: "sp1_task_right_dl_toggle",
      onClick: close,
      style: {
        zIndex: mode ? '110' : ''
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("i", {
        className: "fa-solid fa-circle-chevron-".concat(mode ? 'right' : 'left'),
        style: {
          color: "#276fec"
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_CreateNote__WEBPACK_IMPORTED_MODULE_2__["default"], {
      close: close,
      isOpen: mode === 'create',
      toggleRef: modalRefButton
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_EditNote__WEBPACK_IMPORTED_MODULE_7__["default"], {
      close: close,
      isOpen: mode === 'edit',
      toggleRef: modalRefButton
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_NoteView__WEBPACK_IMPORTED_MODULE_8__["default"], {
      close: close,
      isOpen: mode === 'view',
      toggleRef: modalRefButton
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
      className: "sp1_task_right_card--body",
      children: !isFetching ? (notes === null || notes === void 0 ? void 0 : notes.length) > 0 ? notes.map(function (note) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_Note__WEBPACK_IMPORTED_MODULE_1__["default"], {
          note: note
        }, note.id);
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "d-flex align-items-center justify-content-center",
        style: {
          color: '#B4BCC4',
          fontSize: '15px',
          textAlign: 'center',
          height: '100%',
          width: '100%'
        },
        children: "Empty Notes"
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "d-flex align-items-center justify-content-center",
        style: {
          color: '#5A6169',
          fontSize: '15px',
          textAlign: 'center',
          height: '100%',
          width: '100%'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "spinner-border text-dark ml-2",
          role: "status",
          style: {
            width: '16px',
            height: '16px',
            border: '0.14em solid rgba(0, 0, 0, .25)',
            borderRightColor: 'transparent',
            marginRight: '10px'
          }
        }), "Loading..."]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NoteSection);

/***/ }),

/***/ "./resources/js/react/single-task/section/notes/NoteView.jsx":
/*!*******************************************************************!*\
  !*** ./resources/js/react/single-task/section/notes/NoteView.jsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_CustomModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/CustomModal */ "./resources/js/react/single-task/components/CustomModal.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _file_upload_UploadFilesInLine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../file-upload/UploadFilesInLine */ "./resources/js/react/file-upload/UploadFilesInLine.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useWindowSize.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }













var NoteView = function NoteView(_ref) {
  var close = _ref.close,
    isOpen = _ref.isOpen,
    toggleRef = _ref.toggleRef;
  var _useSearchParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useSearchParams)(),
    _useSearchParams2 = _slicedToArray(_useSearchParams, 1),
    searchParams = _useSearchParams2[0];
  var noteId = searchParams.get('note');
  var type = searchParams.get('type');
  var _useWindowSize = (0,react_use__WEBPACK_IMPORTED_MODULE_9__["default"])(),
    deviceWidth = _useWindowSize.width;

  // fetch all task 
  var _useGetTaskDetailsQue = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__.useGetTaskDetailsQuery)("/".concat(noteId, "/json?mode=task_note_edit"), {
      skip: type ? type !== 'view' || !noteId : true,
      refetchOnMountOrArgChange: true
    }),
    data = _useGetTaskDetailsQue.data,
    isFetching = _useGetTaskDetailsQue.isFetching;
  var user = data ? new _utils_user_details__WEBPACK_IMPORTED_MODULE_4__.User(data.user) : null;
  var content = function content() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      className: "sp1-subtask-form --modal-panel",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "sp1-subtask-form --modal-panel-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h6", {
          children: "Notes"
        }), isFetching && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "spinner-border text-dark ml-2 mr-auto",
          role: "status",
          style: {
            width: '16px',
            height: '16px',
            border: '0.14em solid rgba(0, 0, 0, .25)',
            borderRightColor: 'transparent'
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          "aria-label": "close-modal",
          className: "_close-modal",
          onClick: close,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "sp1-subtask-form --modal-panel-body",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "py-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
            children: isFetching ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
              children: "Loading..."
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
                className: "d-flex align-items-center",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
                  className: "",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("img", {
                    src: user === null || user === void 0 ? void 0 : user.getAvatar(),
                    alt: "",
                    width: 40,
                    height: 40
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
                  className: "px-3",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h6", {
                    className: "mb-0",
                    children: user === null || user === void 0 ? void 0 : user.getName()
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
                    className: "",
                    style: {
                      color: '#A5ACB5'
                    },
                    children: user === null || user === void 0 ? void 0 : user.getDesignationName()
                  })]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
                className: "mt-4",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h6", {
                  className: "font-weight-bold",
                  children: data === null || data === void 0 ? void 0 : data.title
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
                  className: "sp1_ck_content mb-5",
                  dangerouslySetInnerHTML: {
                    __html: data === null || data === void 0 ? void 0 : data.note
                  }
                }), (data === null || data === void 0 ? void 0 : data.files) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_file_upload_UploadFilesInLine__WEBPACK_IMPORTED_MODULE_5__["default"], {
                  previous: data === null || data === void 0 ? void 0 : data.files,
                  mode: "preview"
                })]
              })]
            })
          })
        })
      })]
    });
  };
  if (deviceWidth > 1200) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_CustomModal__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isOpen: isOpen,
      toggleRef: toggleRef,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: content()
      })
    });
  } else {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_6__["default"], {
      isOpen: isOpen,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: content()
      })
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NoteView);

/***/ }),

/***/ "./resources/js/react/single-task/section/revisions/RevisionSection.jsx":
/*!******************************************************************************!*\
  !*** ./resources/js/react/single-task/section/revisions/RevisionSection.jsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_Rating__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../global/Rating */ "./resources/js/react/global/Rating.jsx");
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swr */ "./node_modules/swr/core/dist/index.mjs");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ViewComment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ViewComment */ "./resources/js/react/single-task/section/revisions/ViewComment.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var fetcher = function fetcher(url) {
  return axios__WEBPACK_IMPORTED_MODULE_3___default().get(url).then(function (res) {
    return res.data;
  });
};
var RevisionSection = function RevisionSection(_ref) {
  var task = _ref.task;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    toggleRef = _React$useState2[0],
    setToggleRef = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    isOpen = _React$useState4[0],
    setIsOpen = _React$useState4[1];
  var toggle = function toggle(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  var close = function close(e) {
    setIsOpen(false);
  };
  var _useSWR = (0,swr__WEBPACK_IMPORTED_MODULE_2__["default"])("/account/task/".concat(task.id, "/json?mode=task_approve"), fetcher),
    data = _useSWR.data,
    error = _useSWR.error,
    isLoading = _useSWR.isLoading;
  var cmt = data === null || data === void 0 ? void 0 : data.comment;
  var commentLength = (cmt === null || cmt === void 0 ? void 0 : cmt.length) > 250;
  var comment = commentLength ? cmt === null || cmt === void 0 ? void 0 : cmt.slice(0, 250) : cmt;
  comment = comment || "<span className='' style=\"color: #A7A9B2\">No Comment is Available</span>";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "sp1_task_right_card mb-3",
    ref: setToggleRef,
    style: {
      maxHeight: '450px'
    },
    children: [isOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
      "aria-label": "openCommentModalButton",
      className: "sp1_task_right_dl_toggle",
      onClick: toggle,
      style: {
        zIndex: isOpen ? '110' : ''
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
        className: "fa-solid fa-circle-chevron-".concat(isOpen ? 'right' : 'left'),
        style: {
          color: "#276fec"
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "f-16",
        children: "Task Review"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "d-flex align-items-center mb-2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "",
        style: {
          width: '150px'
        },
        children: "Deadline Meet : "
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "d-flex align-items-center",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Rating__WEBPACK_IMPORTED_MODULE_1__["default"], {
          rating: Number(data === null || data === void 0 ? void 0 : data.deadline_meet)
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "d-flex align-items-center mb-2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "",
        style: {
          width: '150px'
        },
        children: "Submission Quality: "
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "d-flex align-items-center",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Rating__WEBPACK_IMPORTED_MODULE_1__["default"], {
          rating: Number(data === null || data === void 0 ? void 0 : data.submission_quality)
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "d-flex align-items-center mb-2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "",
        style: {
          width: '150px'
        },
        children: "Req. Fullfillment: "
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "d-flex align-items-center",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Rating__WEBPACK_IMPORTED_MODULE_1__["default"], {
          rating: Number(data === null || data === void 0 ? void 0 : data.req_fullfillment)
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "d-flex align-items-center mb-2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "",
        style: {
          width: '150px'
        },
        children: "Overall Task Ratings: "
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "d-flex align-items-center",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Rating__WEBPACK_IMPORTED_MODULE_1__["default"], {
          rating: Number(data === null || data === void 0 ? void 0 : data.overall_tasks)
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "mb-2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "font-weight-bold d-block mb-1",
        children: "Comments:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        style: {
          color: '#777',
          fontSize: '13px'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "sp1_ck_content",
          dangerouslySetInnerHTML: {
            __html: comment
          }
        }), commentLength && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
          href: "#",
          onClick: toggle,
          children: "Read More"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ViewComment__WEBPACK_IMPORTED_MODULE_5__["default"], {
      isOpen: isOpen,
      toggleRef: toggleRef,
      close: close,
      comment: data === null || data === void 0 ? void 0 : data.comment
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RevisionSection);

/***/ }),

/***/ "./resources/js/react/single-task/section/revisions/ViewComment.jsx":
/*!**************************************************************************!*\
  !*** ./resources/js/react/single-task/section/revisions/ViewComment.jsx ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_CustomModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/CustomModal */ "./resources/js/react/single-task/components/CustomModal.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var ViewComment = function ViewComment(_ref) {
  var close = _ref.close,
    isOpen = _ref.isOpen,
    toggleRef = _ref.toggleRef,
    comment = _ref.comment;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_CustomModal__WEBPACK_IMPORTED_MODULE_2__["default"], {
    isOpen: isOpen,
    toggleRef: toggleRef,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "sp1-subtask-form --modal-panel",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "sp1-subtask-form --modal-panel-header",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          "aria-label": "close-modal",
          className: "_close-modal ml-auto",
          onClick: close,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "sp1-subtask-form --modal-panel-body",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "py-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {})
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewComment);

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/AssignedToSelection.jsx":
/*!*********************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/AssignedToSelection.jsx ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/combobox/combobox.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Loader */ "./resources/js/react/single-task/components/Loader.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var AssginedToSelection = function AssginedToSelection(_ref) {
  var selected = _ref.selected,
    onSelect = _ref.onSelect;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    query = _React$useState2[0],
    setQuery = _React$useState2[1];
  var params = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useParams)();
  var _useGetTaskDetailsQue = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_2__.useGetTaskDetailsQuery)("/".concat(params === null || params === void 0 ? void 0 : params.taskId, "/json?mode=employees")),
    employees = _useGetTaskDetailsQue.data,
    isFetching = _useGetTaskDetailsQue.isFetching;
  var filteredData = query === '' ? employees : employees === null || employees === void 0 ? void 0 : employees.filter(function (employee) {
    return employee === null || employee === void 0 ? void 0 : employee.name.toLowerCase().includes(query.toLowerCase());
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Combobox, {
    value: selected,
    onChange: onSelect,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "form-group position-relative my-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
        htmlFor: "",
        children: "Assigned To"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Combobox.Button, {
        className: "d-flex align-items-center w-100 sp1-selection-display-button",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Combobox.Input, {
          onChange: function onChange(e) {
            return setQuery(e.target.value);
          },
          placeholder: "--",
          displayValue: function displayValue(value) {
            return (value === null || value === void 0 ? void 0 : value.name) || '';
          },
          className: "form-control height-35 f-14 sp1-selection-display w-100"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "__icon",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
            className: "fa-solid fa-sort"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Combobox.Options, {
        className: "sp1-select-options",
        children: [isFetching && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "sp1-select-option-nodata",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Loader__WEBPACK_IMPORTED_MODULE_3__["default"], {})
        }), (filteredData === null || filteredData === void 0 ? void 0 : filteredData.length) === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "sp1-select-option-nodata",
          children: "Nothing found."
        }) : filteredData === null || filteredData === void 0 ? void 0 : filteredData.map(function (employee) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Combobox.Option, {
            className: function className(_ref2) {
              var active = _ref2.active;
              return "sp1-select-option ".concat(active ? 'active' : '');
            },
            value: employee,
            children: function children(_ref3) {
              var selected = _ref3.selected;
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "d-flex align-items-center",
                style: {
                  gap: '10px'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "rounded-circle",
                  style: {
                    width: '28px',
                    height: '28px',
                    overflow: 'hidden'
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                    src: employee === null || employee === void 0 ? void 0 : employee.image_url,
                    alt: employee === null || employee === void 0 ? void 0 : employee.name,
                    width: 100,
                    height: 100,
                    className: "rounded-circle",
                    style: {
                      width: '100%',
                      height: '100%',
                      objectFit: 'fill'
                    }
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                  className: "block truncate ".concat(selected ? 'font-medium' : 'font-normal'),
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    className: "mr-2",
                    children: employee === null || employee === void 0 ? void 0 : employee.name
                  }), (employee === null || employee === void 0 ? void 0 : employee.developer_status) === 1 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    className: "badge badge-warning",
                    children: "Working..."
                  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                    className: "badge badge-primary",
                    children: "Open to Work"
                  })]
                }), selected ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "ml-auto",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
                    className: "fa-solid fa-check"
                  })
                }) : null]
              });
            }
          }, employee === null || employee === void 0 ? void 0 : employee.id);
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssginedToSelection);

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/LeadConfirmationModal.jsx":
/*!***********************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/LeadConfirmationModal.jsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var LeadConfirmationModal = function LeadConfirmationModal(_ref) {
  var isOpen = _ref.isOpen,
    onConfirm = _ref.onConfirm;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    buttonVisible = _React$useState2[0],
    setButtonVisible = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(20),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    countDown = _React$useState4[0],
    setCountDown = _React$useState4[1];
  var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_3__.User(window.Laravel.user);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if (auth.getRoleId() && auth.getRoleId() === 6) {
      var count = countDown !== null && countDown !== void 0 ? countDown : 0;
      var timeIntervelId = setInterval(function () {
        setCountDown(count--);
      }, 1000);
      var timeOutId = setTimeout(function () {
        setButtonVisible(true);
        clearInterval(timeIntervelId);
      }, 22000);
      return function () {
        clearTimeout(timeOutId);
        clearInterval(timeIntervelId);
      };
    }
    return function () {
      return onConfirm();
    };
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isOpen: isOpen,
    className: "subtask-timer-confirmation--modal",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "subtask-timer-confirmation--panel",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "subtask-timer-confirmation--content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h4", {
          className: "mb-3",
          children: " Do You Understand The Following Things? "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("ol", {
          type: "A",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
            children: " Your teams job is not to decide what the look and feel of a website will be based on a few reference websites "
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
            children: "Your teams job is not to research a theme based on an instruction shared by the PM. "
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
            children: "Your teams job is not to research a plugin based on a problem shared by PM."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
            children: "Your teams job is not to choose the color scheme of a website."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
            children: "Your teams job is not to talk to the support for example the shopify support team, theme support, plugin support and any other support for any solution."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
            children: "Your teams job is not to create the training videos for the client after the completion of a project. "
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
            children: "You understand that all your teams hours have to be logged/tracked and you team mates will questioned if each of them doesn\u2019t log at least 7 hours for any reason."
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          children: "In general, anything that has to do with requirements define (of any sort) has to be done by the project manager. Your teams job is to execute the work based on the defined requirements.  "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          children: "If for any reason, project manager needs your help for any of those things, he will have to create a separate task for each of them and those tasks have to be authorized by the top management mandatorily."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          children: " Report immediately if you are asked to do any of these and if it was\u2019t authorized by top management. You should see a text like \u201CAuthorized by top management\u201D at the right side of the task title if it was authorized.In case, you don\u2019t report, the extra time taken for these will be considered as your lackings (as they will remain unaccountable) and you will receive negative performance score.\u201D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "d-flex align-items-center",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onClick: onConfirm,
            className: "ml-auto",
            disabled: !buttonVisible,
            children: ["Yes, I Fully Understand This ", !buttonVisible && "(".concat(countDown, ")")]
          })
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LeadConfirmationModal);

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/PreviewSubtask.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/PreviewSubtask.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preview_Genarel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preview/Genarel */ "./resources/js/react/single-task/section/sub-task/preview/Genarel.jsx");
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _preview_SubmittedWork__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./preview/SubmittedWork */ "./resources/js/react/single-task/section/sub-task/preview/SubmittedWork.jsx");
/* harmony import */ var _preview_TimeLog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./preview/TimeLog */ "./resources/js/react/single-task/section/sub-task/preview/TimeLog.jsx");
/* harmony import */ var _preview_TaskReview__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./preview/TaskReview */ "./resources/js/react/single-task/section/sub-task/preview/TaskReview.jsx");
/* harmony import */ var _preview_History__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./preview/History */ "./resources/js/react/single-task/section/sub-task/preview/History.jsx");
/* harmony import */ var _preview_Comments__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preview/Comments */ "./resources/js/react/single-task/section/sub-task/preview/Comments.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _hooks_useSingleTask__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../hooks/useSingleTask */ "./resources/js/react/hooks/useSingleTask.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














var PreviewSubtask = function PreviewSubtask(_ref) {
  var parentTask = _ref.parentTask,
    subTask = _ref.subTask;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    task = _React$useState2[0],
    setTask = _React$useState2[1];
  var taskID = subTask === null || subTask === void 0 ? void 0 : subTask.id;
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    submittedWork = _React$useState4[0],
    setSubmittedWork = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    timeLog = _React$useState6[0],
    setTimeLog = _React$useState6[1];
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    review = _React$useState8[0],
    setReview = _React$useState8[1];
  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    histories = _React$useState10[0],
    setHistories = _React$useState10[1];
  var _React$useState11 = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    comments = _React$useState12[0],
    setComments = _React$useState12[1];
  var _useSingleTask = (0,_hooks_useSingleTask__WEBPACK_IMPORTED_MODULE_10__.useSingleTask)(),
    getTaskById = _useSingleTask.getTaskById,
    getSubmittionInfo = _useSingleTask.getSubmittionInfo,
    taskDetailsIsFetching = _useSingleTask.taskDetailsIsFetching,
    submittionInfoIsFetching = _useSingleTask.submittionInfoIsFetching;
  var _useLazyGetTaskDetail = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__.useLazyGetTaskDetailsQuery)(),
    _useLazyGetTaskDetail2 = _slicedToArray(_useLazyGetTaskDetail, 2),
    getTaskDetails = _useLazyGetTaskDetail2[0],
    detailFetchingStateLoading = _useLazyGetTaskDetail2[1].isFetching;

  // fetch task details
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var task;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getTaskById(taskID);
            case 2:
              task = _context.sent;
              task = new _utils_single_task__WEBPACK_IMPORTED_MODULE_2__.SingleTask(task);
              setTask(task);
            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }, []);

  //   fetch submitted rtk api
  var fetchData = function fetchData(url, cb) {
    getTaskDetails("/".concat(task === null || task === void 0 ? void 0 : task.id, "/json?mode=").concat(url)).unwrap().then(function (res) {
      var d = lodash__WEBPACK_IMPORTED_MODULE_9___default().orderBy(res, 'id', 'desc');
      cb(d);
    })["catch"](function (err) {
      return console.error(err);
    });
  };

  // fetch submitted works when submitted tab clieked
  var fetchSubmittedWork = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
      var data;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              e.preventDefault();
              if (!(submittedWork.length === 0)) {
                _context2.next = 7;
                break;
              }
              _context2.next = 4;
              return getSubmittionInfo(taskID);
            case 4:
              data = _context2.sent;
              console.log({
                data: data
              });
              setSubmittedWork(_toConsumableArray(data));
            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function fetchSubmittedWork(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  // fetch timelog data on tab click
  var fetchTimeLogData = function fetchTimeLogData(e) {
    e.preventDefault();
    if (timeLog.length === 0) {
      fetchData("task_time_log", setTimeLog);
    }
  };

  // fetch review
  var fetchReviewData = function fetchReviewData(e) {
    e.preventDefault();
    fetchData("task_approve", setReview);
  };

  // fetch histories
  var fetchHistories = function fetchHistories(e) {
    e.preventDefault();
    fetchData("task_history", setHistories);
  };

  // fetch comments
  var fetchComments = function fetchComments(e) {
    e.preventDefault();
    fetchData("task_comment", setComments);
  };

  // on comment post
  var onCommentPost = function onCommentPost(comment) {
    var _comments = _toConsumableArray(comments);
    _comments.unshift(comment);
    setComments(_comments);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
      className: "nav flex-column nav-pills sp1-subtask-modal-sidebar",
      id: "v-pills-tab",
      role: "tablist",
      "aria-orientation": "vertical",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("a", {
        className: "nav-link active",
        id: "v-pills-general-tab",
        "data-toggle": "pill",
        href: "#v-pills-home",
        role: "tab",
        "aria-controls": "v-pills-home",
        "aria-selected": "true",
        children: "General"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("a", {
        className: "nav-link",
        id: "v-pills-submitted-work-tab",
        "data-toggle": "pill",
        href: "#v-pills-submitted-work",
        role: "tab",
        "aria-controls": "v-pills-submitted-work",
        "aria-selected": "false",
        onClick: fetchSubmittedWork,
        children: "Submitted Works"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("a", {
        className: "nav-link",
        id: "v-pills-comments-tab",
        "data-toggle": "pill",
        href: "#v-pills-comments",
        role: "tab",
        "aria-controls": "v-pills-comments",
        "aria-selected": "false",
        onClick: fetchComments,
        children: "Comment"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("a", {
        className: "nav-link",
        id: "v-pills-time-log-work-tab",
        "data-toggle": "pill",
        href: "#v-pills-time-log-work",
        role: "tab",
        "aria-controls": "v-pills-time-log-work",
        "aria-selected": "false",
        onClick: fetchTimeLogData,
        children: "Time Logs"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("a", {
        className: "nav-link",
        id: "v-pills-history-tab",
        "data-toggle": "pill",
        href: "#v-pills-history",
        role: "tab",
        "aria-controls": "v-pills-history",
        "aria-selected": "false",
        onClick: fetchHistories,
        children: "History"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("a", {
        className: "nav-link",
        id: "v-pills-task-review-work-tab",
        "data-toggle": "pill",
        href: "#v-pills-task-review-work",
        role: "tab",
        "aria-controls": "v-pills-task-review-work",
        "aria-selected": "false",
        onClick: fetchReviewData,
        children: "Task Review"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
      className: "tab-content p-3 sp1-subtask-modal-tab-content",
      id: "v-pills-tabContent",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        className: "tab-pane fade show active sp1_st_tab_panel",
        id: "v-pills-home",
        role: "tabpanel",
        "aria-labelledby": "v-pills-general-tab",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
          className: "mr-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_preview_Genarel__WEBPACK_IMPORTED_MODULE_1__["default"], {
            isFetching: taskDetailsIsFetching,
            taskID: taskID,
            task: task
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        className: "tab-pane fade",
        id: "v-pills-submitted-work",
        role: "tabpanel",
        "aria-labelledby": "v-pills-submitted-work-tab",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
          className: "mr-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_preview_SubmittedWork__WEBPACK_IMPORTED_MODULE_4__["default"], {
            task: task,
            submittedWork: submittedWork,
            loading: submittionInfoIsFetching
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        className: "tab-pane fade",
        id: "v-pills-comments",
        role: "tabpanel",
        "aria-labelledby": "v-pills-comments-tab",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_preview_Comments__WEBPACK_IMPORTED_MODULE_8__["default"], {
          task: task,
          comments: comments,
          onCommentPost: onCommentPost,
          isLoading: detailFetchingStateLoading
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        className: "tab-pane fade",
        id: "v-pills-time-log-work",
        role: "tabpanel",
        "aria-labelledby": "v-pills-time-log-work-tab",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
          className: "mr-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_preview_TimeLog__WEBPACK_IMPORTED_MODULE_5__["default"], {
            task: task,
            timeLog: timeLog,
            isLoading: detailFetchingStateLoading
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        className: "tab-pane fade",
        id: "v-pills-history",
        role: "tabpanel",
        "aria-labelledby": "v-pills-history-tab",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
          className: "mr-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_preview_History__WEBPACK_IMPORTED_MODULE_7__["default"], {
            histories: histories,
            isLoading: detailFetchingStateLoading
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
        className: "tab-pane fade",
        id: "v-pills-task-review-work",
        role: "tabpanel",
        "aria-labelledby": "v-pills-task-review-work-tab",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_preview_TaskReview__WEBPACK_IMPORTED_MODULE_6__["default"], {
          review: review,
          isLoading: detailFetchingStateLoading
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PreviewSubtask);

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/SubTask.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/SubTask.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _PreviewSubtask__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PreviewSubtask */ "./resources/js/react/single-task/section/sub-task/PreviewSubtask.jsx");
/* harmony import */ var _task_actions_approve_task_ApproveTask__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../task-actions/approve-task/ApproveTask */ "./resources/js/react/single-task/section/task-actions/approve-task/ApproveTask.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var SubTask = function SubTask(_ref) {
  var _window, _window$Laravel;
  var subTask = _ref.subTask,
    task = _ref.task,
    status = _ref.status,
    toggleEditForm = _ref.toggleEditForm;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_4__.User((_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user);
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    subtaskStaus = _useState4[0],
    setSubtaskStaus = _useState4[1];
  var _task = new _utils_single_task__WEBPACK_IMPORTED_MODULE_3__.SingleTask(task);
  var _useLazyCheckSubTaskT = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_2__.useLazyCheckSubTaskTimerQuery)(),
    _useLazyCheckSubTaskT2 = _slicedToArray(_useLazyCheckSubTaskT, 2),
    checkSubTaskTimer = _useLazyCheckSubTaskT2[0],
    isFetching = _useLazyCheckSubTaskT2[1].isFetching;
  var toggle = function toggle(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };
  var hasEditPermission = function hasEditPermission() {
    return Number(subTask === null || subTask === void 0 ? void 0 : subTask.added_by) === (auth === null || auth === void 0 ? void 0 : auth.getId()) && lodash__WEBPACK_IMPORTED_MODULE_0___default().includes([1, 2, 3], status === null || status === void 0 ? void 0 : status.id);
  };
  var onEdit = function onEdit(e) {
    e.preventDefault();
    checkSubTaskTimer(subTask === null || subTask === void 0 ? void 0 : subTask.id).unwrap().then(function (res) {
      if ((res === null || res === void 0 ? void 0 : res.status) === 200) {
        toggleEditForm(e, subTask === null || subTask === void 0 ? void 0 : subTask.id);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You cannot edit the task because timer is already running'
        });
      }
    });
  };
  var onModalEditButtonClick = function onModalEditButtonClick(e) {
    e.preventDefault();
    checkSubTaskTimer(subTask === null || subTask === void 0 ? void 0 : subTask.id).unwrap().then(function (res) {
      if ((res === null || res === void 0 ? void 0 : res.status) === 200) {
        window.location = "/account/tasks/".concat(subTask === null || subTask === void 0 ? void 0 : subTask.id, "/edit");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You cannot edit the task because timer is already running'
        });
      }
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    className: "d-flex align-items-center justify-content-between sp1_tark_right_item",
    style: {
      gap: "16px"
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
      className: "w-100 text-ellipsis",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        onClick: toggle,
        className: "hover-underline",
        style: {
          cursor: 'pointer'
        },
        children: subTask === null || subTask === void 0 ? void 0 : subTask.title
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      className: "d-flex align-items-center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        onClick: toggle,
        className: "mr-2 py-2 sp1_task_righ_action_btn",
        style: {
          cursor: 'pointer'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("i", {
          className: "fa-regular fa-eye"
        })
      }), hasEditPermission() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        onClick: onEdit,
        className: "mr-2 py-2 sp1_task_righ_action_btn",
        style: {
          cursor: 'pointer'
        },
        children: isFetching ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "spinner-border text-dark ml-2",
          role: "status",
          style: {
            width: "16px",
            height: "16px",
            border: "0.14em solid rgba(0, 0, 0, .25)",
            borderRightColor: "transparent"
          }
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("i", {
          className: "fa-regular fa-pen-to-square"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_6__["default"], {
        className: "sp1_subtask_offsetcanvas--modal",
        isOpen: isOpen,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "sp1_subtask_offsetcanvas ".concat(isOpen ? "open" : ""),
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
            className: "d-flex align-items-center justify-content-between p-2 sp1_subtask_offsetcanvas--bar",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
              className: "pl-3",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span", {
                className: "font-weight-bold f-16",
                children: ["Sub Task # ", subTask === null || subTask === void 0 ? void 0 : subTask.id, " :", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
                  className: "font-weight-normal",
                  children: subTask === null || subTask === void 0 ? void 0 : subTask.title
                }), " "]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
              className: "d-flex align-items-center ml-auto",
              children: [hasEditPermission() && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("a", {
                href: "#",
                onClick: onModalEditButtonClick,
                className: "border text-dark mr-2 py-1 px-2",
                children: isFetching ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
                  className: "spinner-border text-dark ml-2",
                  role: "status",
                  style: {
                    width: "16px",
                    height: "16px",
                    border: "0.14em solid rgba(0, 0, 0, .25)",
                    borderRightColor: "transparent"
                  }
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("i", {
                  className: "fa-regular fa-pen-to-square"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("a", {
                href: "/account/tasks/".concat(subTask === null || subTask === void 0 ? void 0 : subTask.id),
                target: "__blank",
                className: "border text-dark mr-2 py-1 px-2",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("i", {
                  className: "fa-solid fa-arrow-up-right-from-square"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
                onClick: function onClick() {
                  return setIsOpen(false);
                },
                className: "",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("i", {
                  className: "fa-solid fa-xmark"
                })
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
            className: "sp1_subtask_offsetcanvas--body",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_PreviewSubtask__WEBPACK_IMPORTED_MODULE_7__["default"], {
              parentTask: task,
              subTask: subTask
            })
          })]
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubTask);

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/SubTaskEditForm.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/SubTaskEditForm.jsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_form_Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/form/Input */ "./resources/js/react/single-task/components/form/Input.jsx");
/* harmony import */ var _TaskCategorySelectionBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TaskCategorySelectionBox */ "./resources/js/react/single-task/section/sub-task/TaskCategorySelectionBox.jsx");
/* harmony import */ var _AssignedToSelection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AssignedToSelection */ "./resources/js/react/single-task/section/sub-task/AssignedToSelection.jsx");
/* harmony import */ var _PrioritySelection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PrioritySelection */ "./resources/js/react/single-task/section/sub-task/PrioritySelection.jsx");
/* harmony import */ var _comments_DatePicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../comments/DatePicker */ "./resources/js/react/single-task/section/comments/DatePicker.jsx");
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _file_upload_UploadFilesInLine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../file-upload/UploadFilesInLine */ "./resources/js/react/file-upload/UploadFilesInLine.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _utils_dateController__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../utils/dateController */ "./resources/js/react/utils/dateController.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


















var dayjs = new _utils_dateController__WEBPACK_IMPORTED_MODULE_13__.CompareDate();
var SubtTaskEditForm = function SubtTaskEditForm(_ref) {
  var _required_error$title, _required_error$start, _required_error$start2, _required_error$due_d, _required_error$due_d2;
  var close = _ref.close,
    editId = _ref.editId;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_11__.useSelector)(function (s) {
      return s.subTask;
    }),
    task = _useSelector.task,
    subTask = _useSelector.subTask;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_11__.useDispatch)();

  //   form data
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    title = _useState2[0],
    setTitle = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    milestone = _useState4[0],
    setMilestone = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    parentTask = _useState6[0],
    setParentTask = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Date()),
    _useState8 = _slicedToArray(_useState7, 2),
    startDate = _useState8[0],
    setStateDate = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Date()),
    _useState10 = _slicedToArray(_useState9, 2),
    dueDate = _useState10[0],
    setDueDate = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState12 = _slicedToArray(_useState11, 2),
    project = _useState12[0],
    setProject = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState14 = _slicedToArray(_useState13, 2),
    taskCategory = _useState14[0],
    setTaskCategory = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState16 = _slicedToArray(_useState15, 2),
    assignedTo = _useState16[0],
    setAssignedTo = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState18 = _slicedToArray(_useState17, 2),
    taskObserver = _useState18[0],
    setTaskObserver = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState20 = _slicedToArray(_useState19, 2),
    description = _useState20[0],
    setDescription = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('To Do'),
    _useState22 = _slicedToArray(_useState21, 2),
    status = _useState22[0],
    setStatus = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('Medium'),
    _useState24 = _slicedToArray(_useState23, 2),
    priority = _useState24[0],
    setPriority = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState26 = _slicedToArray(_useState25, 2),
    estimateTimeHour = _useState26[0],
    setEstimateTimeHour = _useState26[1];
  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState28 = _slicedToArray(_useState27, 2),
    estimateTimeMin = _useState28[0],
    setEstimateTimeMin = _useState28[1];
  var _useState29 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState30 = _slicedToArray(_useState29, 2),
    attachedFiles = _useState30[0],
    setAttachedFiles = _useState30[1];
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    files = _React$useState2[0],
    setFiles = _React$useState2[1];
  var params = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_15__.useParams)();
  var _useEditSubtaskMutati = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_10__.useEditSubtaskMutation)(),
    _useEditSubtaskMutati2 = _slicedToArray(_useEditSubtaskMutati, 2),
    editSubtask = _useEditSubtaskMutati2[0],
    _useEditSubtaskMutati3 = _useEditSubtaskMutati2[1],
    isLoading = _useEditSubtaskMutati3.isLoading,
    error = _useEditSubtaskMutati3.error;
  var _useLazyGetTaskDetail = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_10__.useLazyGetTaskDetailsQuery)(),
    _useLazyGetTaskDetail2 = _slicedToArray(_useLazyGetTaskDetail, 2),
    getTaskDetails = _useLazyGetTaskDetail2[0],
    _useLazyGetTaskDetail3 = _useLazyGetTaskDetail2[1],
    edit = _useLazyGetTaskDetail3.data,
    editDataIsFetching = _useLazyGetTaskDetail3.isFetching;

  // find edited subtask
  var editSubTask = subTask.find(function (d) {
    return d.id === editId;
  });
  var _useGetTaskDetailsQue = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_10__.useGetTaskDetailsQuery)("/".concat(params === null || params === void 0 ? void 0 : params.taskId, "/json?mode=estimation_time")),
    estimation = _useGetTaskDetailsQue.data,
    isFetching = _useGetTaskDetailsQue.isFetching;
  var required_error = (error === null || error === void 0 ? void 0 : error.status) === 422 ? error === null || error === void 0 ? void 0 : error.data : null;

  // handle change
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    var formatedDate = function formatedDate(d) {
      var day = dayjs.dayjs(d).toDate();
      return day;
    };
    getTaskDetails("/".concat(editId, "/json?mode=sub_task_edit")).unwrap().then(function (res) {
      if (res) {
        var _res$users;
        var assigneeTo = res === null || res === void 0 ? void 0 : (_res$users = res.users) === null || _res$users === void 0 ? void 0 : _res$users[0];
        setTitle(res.heading);
        setMilestone(res.milestone_title);
        setParentTask(task === null || task === void 0 ? void 0 : task.heading);
        setStateDate(formatedDate(res.start_date));
        setDueDate(formatedDate(res.due_date));
        setProject(res.project_name);
        setTaskCategory(res.task_category);
        setAssignedTo(assigneeTo ? {
          id: assigneeTo === null || assigneeTo === void 0 ? void 0 : assigneeTo.id,
          name: assigneeTo === null || assigneeTo === void 0 ? void 0 : assigneeTo.name
        } : '');
        setDescription(res.description);
        setPriority(lodash__WEBPACK_IMPORTED_MODULE_9___default().startCase(res.priority));
        setEstimateTimeHour(res.estimate_hours);
        setEstimateTimeMin(res.estimate_minutes);
        setAttachedFiles(res.files);
      }
    })["catch"](function (err) {
      console.log(err);
    });
  }, [task, editId]);

  // handle onchange
  var handleChange = function handleChange(e, setState) {
    e.preventDefault();
    var value = e.target.value;
    setState(value);
  };

  // handle sumition
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var _startDate = dayjs.dayjs(startDate).format('DD-MM-YYYY');
    var _dueDate = dayjs.dayjs(dueDate).format('DD-MM-YYYY');
    var fd = new FormData();
    fd.append('milestone_id', task === null || task === void 0 ? void 0 : task.milestone_id);
    fd.append('task_id', task === null || task === void 0 ? void 0 : task.id);
    fd.append('title', title);
    fd.append('start_date', _startDate);
    fd.append('due_date', _dueDate);
    fd.append('project_id', task === null || task === void 0 ? void 0 : task.project_id);
    fd.append('task_category_id', taskCategory === null || taskCategory === void 0 ? void 0 : taskCategory.id);
    fd.append('user_id', assignedTo === null || assignedTo === void 0 ? void 0 : assignedTo.id);
    fd.append('description', description);
    fd.append('board_column_id', task === null || task === void 0 ? void 0 : task.board_column_id);
    fd.append('priority', lodash__WEBPACK_IMPORTED_MODULE_9___default().lowerCase(priority));
    fd.append('estimate_hours', estimateTimeHour);
    fd.append('estimate_minutes', estimateTimeMin);
    fd.append('image_url', null);
    fd.append('subTaskID', editSubTask === null || editSubTask === void 0 ? void 0 : editSubTask.subtask_id);
    fd.append('addedFiles', null);
    fd.append('_method', 'PUT');
    fd.append('_token', document.querySelector("meta[name='csrf-token']").getAttribute("content"));
    Array.from(files).forEach(function (file) {
      fd.append('file[]', file);
    });
    editSubtask({
      data: fd,
      id: editId
    }).unwrap().then(function (res) {
      if ((res === null || res === void 0 ? void 0 : res.status) === 'success') {
        var _subtask2;
        var _subtask = _toConsumableArray(subTask);
        _subtask = (_subtask2 = _subtask) === null || _subtask2 === void 0 ? void 0 : _subtask2.map(function (s) {
          var _res$sub_task;
          if (Number(s === null || s === void 0 ? void 0 : s.id) === Number(res === null || res === void 0 ? void 0 : (_res$sub_task = res.sub_task) === null || _res$sub_task === void 0 ? void 0 : _res$sub_task.id)) {
            return res === null || res === void 0 ? void 0 : res.sub_task;
          } else return s;
        });
        dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_12__.storeSubTasks)(_subtask));
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res === null || res === void 0 ? void 0 : res.message,
          showConfirmButton: false,
          timer: 2500
        });
        close();
      }
    })["catch"](function (err) {
      if ((err === null || err === void 0 ? void 0 : err.status) === 422) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Please fillup all required fields",
          showConfirmButton: true
        });
      }
    });
  };

  // handle uplaoded file delete request
  var _useDeleteUplaodedFil = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_10__.useDeleteUplaodedFileMutation)(),
    _useDeleteUplaodedFil2 = _slicedToArray(_useDeleteUplaodedFil, 1),
    deleteUplaodedFile = _useDeleteUplaodedFil2[0];
  var handleFileDelete = function handleFileDelete(e, file) {
    // delete
    deleteUplaodedFile(file === null || file === void 0 ? void 0 : file.id).unwrap();

    // delete form ui
    var previousFile = _toConsumableArray(attachedFiles);
    var index = previousFile === null || previousFile === void 0 ? void 0 : previousFile.indexOf(file);
    previousFile.splice(index, 1);
    setAttachedFiles(previousFile);
  };

  // handle loading state
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if (isLoading || editDataIsFetching) {
      document.getElementsByTagName('body')[0].style.cursor = 'progress';
    } else {
      document.getElementsByTagName('body')[0].style.cursor = 'default';
    }
  }, [isLoading, editDataIsFetching]);
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setDescription(data);
  };
  var estimateError = function estimateError(err) {
    var _err$estimate_hours, _err$estimate_minutes;
    var errText = '';
    var hoursErr = err === null || err === void 0 ? void 0 : (_err$estimate_hours = err.estimate_hours) === null || _err$estimate_hours === void 0 ? void 0 : _err$estimate_hours[0];
    var minErr = err === null || err === void 0 ? void 0 : (_err$estimate_minutes = err.estimate_minutes) === null || _err$estimate_minutes === void 0 ? void 0 : _err$estimate_minutes[0];
    if (hoursErr) errText += hoursErr;
    if (minErr) errText += minErr;
    return errText;
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
      className: "sp1-subtask-form --modal-panel",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
        className: "sp1-subtask-form --modal-panel-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("h6", {
          children: ["Edit Sub Task", editDataIsFetching && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "spinner-border text-dark ml-2",
            role: "status",
            style: {
              width: '16px',
              height: '16px',
              border: '0.14em solid rgba(0, 0, 0, .25)',
              borderRightColor: 'transparent'
            }
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          "aria-label": "close-modal",
          className: "_close-modal",
          onClick: close,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
        className: "sp1-subtask-form --modal-panel-body position-relative",
        children: [editDataIsFetching && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
          className: "w-100",
          style: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
          className: "sp1-subtask-form --form row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
              id: "title",
              label: "Title",
              type: "text",
              placeholder: "Enter a task title",
              name: "title",
              required: true,
              value: title,
              error: required_error === null || required_error === void 0 ? void 0 : (_required_error$title = required_error.title) === null || _required_error$title === void 0 ? void 0 : _required_error$title[0],
              onChange: function onChange(e) {
                return handleChange(e, setTitle);
              }
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("label", {
                className: "f-14 text-dark-gray mb-1",
                "data-label": "true",
                children: "Milestone"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("input", {
                className: "form-control height-35 f-14",
                readOnly: true,
                defaultValue: milestone
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("label", {
                className: "f-14 text-dark-gray mb-1",
                "data-label": "true",
                children: "Parent Task"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("input", {
                className: "form-control height-35 f-14",
                readOnly: true,
                defaultValue: parentTask
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("label", {
                className: "f-14 text-dark-gray mb-1",
                "data-label": "true",
                children: "Project"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("input", {
                className: "form-control height-35 f-14",
                readOnly: true,
                defaultValue: project
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("label", {
                htmlFor: "",
                children: ["Start Date ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("sup", {
                  className: "f-14",
                  children: "*"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                className: "form-control height-35 f-14",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_comments_DatePicker__WEBPACK_IMPORTED_MODULE_6__["default"], {
                  placeholderText: "Ex: ".concat(dayjs.dayjs().format('DD-MM-YYYY')),
                  minDate: dayjs.dayjs(task === null || task === void 0 ? void 0 : task.start_date).toDate(),
                  maxDate: dueDate || dayjs.dayjs(task === null || task === void 0 ? void 0 : task.due_date).toDate(),
                  date: startDate,
                  setDate: setStateDate
                })
              }), (required_error === null || required_error === void 0 ? void 0 : (_required_error$start = required_error.start_date) === null || _required_error$start === void 0 ? void 0 : _required_error$start[0]) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                style: {
                  color: 'red'
                },
                children: required_error === null || required_error === void 0 ? void 0 : (_required_error$start2 = required_error.start_date) === null || _required_error$start2 === void 0 ? void 0 : _required_error$start2[0]
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("label", {
                htmlFor: "",
                children: ["Due Date ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("sup", {
                  className: "f-14",
                  children: "*"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                className: "form-control height-35 f-14",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_comments_DatePicker__WEBPACK_IMPORTED_MODULE_6__["default"], {
                  placeholderText: "Ex: ".concat(dayjs.dayjs().format('DD-MM-YYYY')),
                  minDate: startDate || dayjs.dayjs(task === null || task === void 0 ? void 0 : task.start_date).toDate(),
                  maxDate: dayjs.dayjs(task === null || task === void 0 ? void 0 : task.due_date).toDate(),
                  date: dueDate,
                  setDate: setDueDate
                })
              }), (required_error === null || required_error === void 0 ? void 0 : (_required_error$due_d = required_error.due_date) === null || _required_error$due_d === void 0 ? void 0 : _required_error$due_d[0]) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                style: {
                  color: 'red'
                },
                children: required_error === null || required_error === void 0 ? void 0 : (_required_error$due_d2 = required_error.due_date) === null || _required_error$due_d2 === void 0 ? void 0 : _required_error$due_d2[0]
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_TaskCategorySelectionBox__WEBPACK_IMPORTED_MODULE_3__["default"], {
              selected: taskCategory,
              onSelect: setTaskCategory
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_AssignedToSelection__WEBPACK_IMPORTED_MODULE_4__["default"], {
              selected: assignedTo,
              onSelect: setAssignedTo
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_PrioritySelection__WEBPACK_IMPORTED_MODULE_5__["default"], {
              selected: priority,
              setSelected: setPriority
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("label", {
                htmlFor: "",
                className: "f-14 text-dark-gray",
                children: ["Set Estimate Time ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("sup", {
                  className: "f-14",
                  children: " * "
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
                className: "d-flex align-items-center",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("input", {
                  type: "Number",
                  className: "form-control height-35 f-14 mr-2",
                  value: estimateTimeHour,
                  onChange: function onChange(e) {
                    return handleChange(e, setEstimateTimeHour);
                  }
                }), " hrs", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("input", {
                  type: "Number",
                  className: "form-control height-35 f-14 mr-2 ml-2",
                  value: estimateTimeMin,
                  onChange: function onChange(e) {
                    return handleChange(e, setEstimateTimeMin);
                  }
                }), " min"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                style: {
                  color: 'red'
                },
                children: estimateError(required_error)
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
                style: {
                  color: 'red'
                },
                children: ["Estimation time can't exceed ", estimation === null || estimation === void 0 ? void 0 : estimation.hours_left, " hours ", estimation === null || estimation === void 0 ? void 0 : estimation.minutes_left, " minutes"]
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-12",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("label", {
                htmlFor: "",
                children: " Description "
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                className: "sp1_st_write_comment_editor",
                style: {
                  minHeight: '100px'
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_7__["default"], {
                  data: description,
                  onChange: handleEditorChange
                })
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-12",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_file_upload_UploadFilesInLine__WEBPACK_IMPORTED_MODULE_8__["default"], {
              onPreviousFileDelete: handleFileDelete,
              previous: attachedFiles,
              files: files,
              setFiles: setFiles
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "col-12 mt-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
              className: "d-flex align-items-center justify-content-end",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                variant: "secondary",
                className: "mr-2",
                onClick: close,
                children: "Cancel"
              }), !isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                onClick: handleSubmit,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("i", {
                  className: "fa-regular fa-paper-plane"
                }), "Update"]
              }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                className: "cursor-processing",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                  className: "spinner-border text-white",
                  role: "status",
                  style: {
                    width: '18px',
                    height: '18px'
                  }
                }), "Processing..."]
              })]
            })
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubtTaskEditForm);

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/SubTaskForm.jsx":
/*!*************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/SubTaskForm.jsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_form_Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/form/Input */ "./resources/js/react/single-task/components/form/Input.jsx");
/* harmony import */ var _TaskCategorySelectionBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TaskCategorySelectionBox */ "./resources/js/react/single-task/section/sub-task/TaskCategorySelectionBox.jsx");
/* harmony import */ var _AssignedToSelection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AssignedToSelection */ "./resources/js/react/single-task/section/sub-task/AssignedToSelection.jsx");
/* harmony import */ var _PrioritySelection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PrioritySelection */ "./resources/js/react/single-task/section/sub-task/PrioritySelection.jsx");
/* harmony import */ var _comments_DatePicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../comments/DatePicker */ "./resources/js/react/single-task/section/comments/DatePicker.jsx");
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _file_upload_UploadFilesInLine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../file-upload/UploadFilesInLine */ "./resources/js/react/file-upload/UploadFilesInLine.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _utils_dateController__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../utils/dateController */ "./resources/js/react/utils/dateController.js");
/* harmony import */ var _WorkingEnvironmentForm__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./WorkingEnvironmentForm */ "./resources/js/react/single-task/section/sub-task/WorkingEnvironmentForm.jsx");
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/listbox/listbox.js");
/* harmony import */ var _LeadConfirmationModal__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./LeadConfirmationModal */ "./resources/js/react/single-task/section/sub-task/LeadConfirmationModal.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
























var SubTaskForm = function SubTaskForm(_ref) {
  var _window, _window$Laravel, _required_error$title, _required_error$start, _required_error$start2, _required_error$due_d, _required_error$due_d2, _ref2, _ref5, _ref8, _required_error$page_, _required_error$page_2, _required_error$descr, _required_error$descr2;
  var close = _ref.close,
    _ref$isFirstSubtask = _ref.isFirstSubtask,
    isFirstSubtask = _ref$isFirstSubtask === void 0 ? ture : _ref$isFirstSubtask;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_11__.useSelector)(function (s) {
      return s.subTask;
    }),
    taskDetails = _useSelector.task,
    subTask = _useSelector.subTask,
    isWorkingEnvironmentSubmit = _useSelector.isWorkingEnvironmentSubmit;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_11__.useDispatch)();
  var dayjs = new _utils_dateController__WEBPACK_IMPORTED_MODULE_13__.CompareDate();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showEnvForm = _useState2[0],
    setShowEnvForm = _useState2[1];
  //   form data
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    title = _useState4[0],
    setTitle = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    milestone = _useState6[0],
    setMilestone = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    parentTask = _useState8[0],
    setParentTask = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    startDate = _useState10[0],
    setStateDate = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    dueDate = _useState12[0],
    setDueDate = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState14 = _slicedToArray(_useState13, 2),
    project = _useState14[0],
    setProject = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState16 = _slicedToArray(_useState15, 2),
    taskCategory = _useState16[0],
    setTaskCategory = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState18 = _slicedToArray(_useState17, 2),
    assignedTo = _useState18[0],
    setAssignedTo = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState20 = _slicedToArray(_useState19, 2),
    taskObserver = _useState20[0],
    setTaskObserver = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState22 = _slicedToArray(_useState21, 2),
    description = _useState22[0],
    setDescription = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("To Do"),
    _useState24 = _slicedToArray(_useState23, 2),
    status = _useState24[0],
    setStatus = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("Medium"),
    _useState26 = _slicedToArray(_useState25, 2),
    priority = _useState26[0],
    setPriority = _useState26[1];
  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState28 = _slicedToArray(_useState27, 2),
    estimateTimeHour = _useState28[0],
    setEstimateTimeHour = _useState28[1];
  var _useState29 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState30 = _slicedToArray(_useState29, 2),
    estimateTimeMin = _useState30[0],
    setEstimateTimeMin = _useState30[1];
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    files = _React$useState2[0],
    setFiles = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    pageType = _React$useState4[0],
    setPageType = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    pageTypeOthers = _React$useState6[0],
    setPageTypeOthers = _React$useState6[1];
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    pageName = _React$useState8[0],
    setPageName = _React$useState8[1];
  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    pageURL = _React$useState10[0],
    setPageURL = _React$useState10[1];
  var _React$useState11 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(0),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    numberOfPage = _React$useState12[0],
    setNumberOfPage = _React$useState12[1];
  var _React$useState13 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    existingDesignLink = _React$useState14[0],
    setExistingDesignLink = _React$useState14[1];
  var _React$useState15 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    pageTypePriority = _React$useState16[0],
    setPageTypePriority = _React$useState16[1];
  var _React$useState17 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    pageTypeName = _React$useState18[0],
    setPageTypeName = _React$useState18[1];
  var task = new _utils_single_task__WEBPACK_IMPORTED_MODULE_15__.SingleTask(taskDetails);
  var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_16__.User((_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user);
  var params = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_19__.useParams)();
  var _useCreateSubtaskMuta = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_10__.useCreateSubtaskMutation)(),
    _useCreateSubtaskMuta2 = _slicedToArray(_useCreateSubtaskMuta, 2),
    createSubtask = _useCreateSubtaskMuta2[0],
    _useCreateSubtaskMuta3 = _useCreateSubtaskMuta2[1],
    isLoading = _useCreateSubtaskMuta3.isLoading,
    error = _useCreateSubtaskMuta3.error;
  // const {  } = useGetTaskDetailsQuery(`/${task?.id}/json?mode=estimation_time`);
  var _useLazyGetTaskDetail = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_10__.useLazyGetTaskDetailsQuery)(),
    _useLazyGetTaskDetail2 = _slicedToArray(_useLazyGetTaskDetail, 2),
    getTaskDetails = _useLazyGetTaskDetail2[0],
    _useLazyGetTaskDetail3 = _useLazyGetTaskDetail2[1],
    estimation = _useLazyGetTaskDetail3.data,
    isFetching = _useLazyGetTaskDetail3.isFetching;
  var _React$useState19 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    showForm = _React$useState20[0],
    setShowForm = _React$useState20[1];
  var required_error = (error === null || error === void 0 ? void 0 : error.status) === 422 ? error === null || error === void 0 ? void 0 : error.data : null;
  // handle change
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    setMilestone(task === null || task === void 0 ? void 0 : task.milestoneTitle);
    setProject(task === null || task === void 0 ? void 0 : task.projectName);
    setParentTask(task === null || task === void 0 ? void 0 : task.title);
  }, [task]);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    getTaskDetails("/".concat(task === null || task === void 0 ? void 0 : task.id, "/json?mode=estimation_time")).unwrap();
  }, []);

  // handle onchange
  var handleChange = function handleChange(e, setState) {
    e.preventDefault();
    var value = e.target.value;
    setState(value);
  };

  // handle sumition
  var handleSubmit = function handleSubmit(e) {
    var _task$category, _task$boardColumn;
    e.preventDefault();
    var _startDate = dayjs.dayjs(startDate).format("DD-MM-YYYY");
    var _dueDate = dayjs.dayjs(dueDate).format("DD-MM-YYYY");
    var fd = new FormData();
    fd.append("milestone_id", task === null || task === void 0 ? void 0 : task.milestoneID);
    fd.append("task_id", task === null || task === void 0 ? void 0 : task.id);
    fd.append("title", title);
    fd.append("start_date", _startDate);
    fd.append("due_date", _dueDate);
    fd.append("project_id", task === null || task === void 0 ? void 0 : task.projectId);
    fd.append("task_category_id", task === null || task === void 0 ? void 0 : (_task$category = task.category) === null || _task$category === void 0 ? void 0 : _task$category.id);
    fd.append("user_id", assignedTo === null || assignedTo === void 0 ? void 0 : assignedTo.id);
    fd.append("description", description);
    fd.append("board_column_id", task === null || task === void 0 ? void 0 : (_task$boardColumn = task.boardColumn) === null || _task$boardColumn === void 0 ? void 0 : _task$boardColumn.id);
    fd.append("priority", lodash__WEBPACK_IMPORTED_MODULE_9___default().lowerCase(priority));
    fd.append("estimate_hours", estimateTimeHour);
    fd.append("estimate_minutes", estimateTimeMin);
    fd.append("image_url", null);
    fd.append("subTaskID", null);
    fd.append("addedFiles", null);
    fd.append('task_type', pageType !== null && pageType !== void 0 ? pageType : null);
    fd.append('page_type', pageTypePriority);
    fd.append('page_name', pageName);
    fd.append('page_url', pageURL);
    fd.append('task_type_other', pageTypeOthers);
    fd.append('page_type_name', pageTypeName);
    fd.append('number_of_pages', numberOfPage);
    fd.append('existing_design_link', existingDesignLink);
    fd.append("_token", document.querySelector("meta[name='csrf-token']").getAttribute("content"));
    Array.from(files).forEach(function (file) {
      fd.append("file[]", file);
    });
    createSubtask(fd).unwrap().then(function (res) {
      if ((res === null || res === void 0 ? void 0 : res.status) === "success") {
        var _res$sub_task, _res$sub_task2;
        var _subtask = [].concat(_toConsumableArray(subTask), [{
          id: res === null || res === void 0 ? void 0 : (_res$sub_task = res.sub_task) === null || _res$sub_task === void 0 ? void 0 : _res$sub_task.id,
          title: res === null || res === void 0 ? void 0 : (_res$sub_task2 = res.sub_task) === null || _res$sub_task2 === void 0 ? void 0 : _res$sub_task2.title
        }]);
        dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_12__.storeSubTasks)(_subtask));
        close();
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timer: 2500
        });
      }
    })["catch"](function (err) {
      if ((err === null || err === void 0 ? void 0 : err.status) === 422) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Please fillup all required fields",
          showConfirmButton: true
        });
      }
    });
  };
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if (isLoading) {
      document.getElementsByTagName("body")[0].style.cursor = "progress";
    } else {
      document.getElementsByTagName("body")[0].style.cursor = "default";
    }
  }, [isLoading]);

  // editor data handle
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setDescription(data);
  };
  var estimateError = function estimateError(err) {
    var _err$estimate_hours, _err$estimate_minutes;
    var errText = "";
    var hoursErr = err === null || err === void 0 ? void 0 : (_err$estimate_hours = err.estimate_hours) === null || _err$estimate_hours === void 0 ? void 0 : _err$estimate_hours[0];
    var minErr = err === null || err === void 0 ? void 0 : (_err$estimate_minutes = err.estimate_minutes) === null || _err$estimate_minutes === void 0 ? void 0 : _err$estimate_minutes[0];
    if (hoursErr) errText += hoursErr;
    if (minErr) errText += minErr;
    return errText;
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var showEnv = (task === null || task === void 0 ? void 0 : task.workingEnvironment) === 0 ? lodash__WEBPACK_IMPORTED_MODULE_9___default().size(task === null || task === void 0 ? void 0 : task.subtask) === 0 ? true : false : false;
    if (auth.getRoleId() === 6) {
      if (isWorkingEnvironmentSubmit === undefined) {
        dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_12__.setWorkingEnvironmentStatus)(showEnv));
      }
    }
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
      className: "sp1-subtask-form --modal-panel",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
        className: "sp1-subtask-form --modal-panel-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("h6", {
          children: isWorkingEnvironmentSubmit ? "Working Environment" : "Create Sub Task"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          "aria-label": "close-modal",
          className: "_close-modal",
          onClick: close,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
        className: "sp1-subtask-form --modal-panel-body sp1_subtask_form",
        children: [isWorkingEnvironmentSubmit && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_WorkingEnvironmentForm__WEBPACK_IMPORTED_MODULE_14__["default"], {
          task: task,
          onSubmit: function onSubmit() {
            return dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_12__.setWorkingEnvironmentStatus)(false));
          },
          close: function close() {
            return setShowEnvForm(false);
          }
        }), !isWorkingEnvironmentSubmit && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_LeadConfirmationModal__WEBPACK_IMPORTED_MODULE_17__["default"], {
          isOpen: !isWorkingEnvironmentSubmit && !showForm,
          onConfirm: function onConfirm() {
            return setShowForm(true);
          }
        }), !isWorkingEnvironmentSubmit && showForm && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
          className: "sp1-subtask-form --form row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
              id: "title",
              label: "Title",
              type: "text",
              placeholder: "Enter a task title",
              name: "title",
              required: true,
              value: title,
              error: required_error === null || required_error === void 0 ? void 0 : (_required_error$title = required_error.title) === null || _required_error$title === void 0 ? void 0 : _required_error$title[0],
              onChange: function onChange(e) {
                return handleChange(e, setTitle);
              }
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("label", {
                className: "f-14 text-dark-gray mb-1",
                "data-label": "true",
                children: "Milestone"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                className: "form-control height-35 f-14",
                readOnly: true,
                defaultValue: milestone
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("label", {
                className: "f-14 text-dark-gray mb-1",
                "data-label": "true",
                children: "Parent Task"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                className: "form-control height-35 f-14",
                readOnly: true,
                defaultValue: parentTask
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("label", {
                className: "f-14 text-dark-gray mb-1",
                "data-label": "true",
                children: "Project"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                className: "form-control height-35 f-14",
                readOnly: true,
                defaultValue: project
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("label", {
                htmlFor: "",
                children: ["Start Date ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("sup", {
                  className: "f-14",
                  children: "*"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                className: "form-control height-35 f-14",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_comments_DatePicker__WEBPACK_IMPORTED_MODULE_6__["default"], {
                  placeholderText: "Ex: ".concat(dayjs.dayjs().format("DD-MM-YYYY")),
                  minDate: dayjs.dayjs(task === null || task === void 0 ? void 0 : task.startDate).toDate(),
                  maxDate: dueDate || dayjs.dayjs(task === null || task === void 0 ? void 0 : task.dueDate).toDate(),
                  date: startDate,
                  setDate: setStateDate
                })
              }), (required_error === null || required_error === void 0 ? void 0 : (_required_error$start = required_error.start_date) === null || _required_error$start === void 0 ? void 0 : _required_error$start[0]) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                style: {
                  color: "red"
                },
                children: required_error === null || required_error === void 0 ? void 0 : (_required_error$start2 = required_error.start_date) === null || _required_error$start2 === void 0 ? void 0 : _required_error$start2[0]
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("label", {
                htmlFor: "",
                children: ["Due Date ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("sup", {
                  className: "f-14",
                  children: "*"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                className: "form-control height-35 f-14",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_comments_DatePicker__WEBPACK_IMPORTED_MODULE_6__["default"], {
                  placeholderText: "Ex: ".concat(dayjs.dayjs().format("DD-MM-YYYY")),
                  minDate: startDate || dayjs.dayjs(task === null || task === void 0 ? void 0 : task.startDate).toDate(),
                  maxDate: dayjs.dayjs(task === null || task === void 0 ? void 0 : task.dueDate).toDate(),
                  date: dueDate,
                  setDate: setDueDate
                })
              }), (required_error === null || required_error === void 0 ? void 0 : (_required_error$due_d = required_error.due_date) === null || _required_error$due_d === void 0 ? void 0 : _required_error$due_d[0]) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                style: {
                  color: "red"
                },
                children: required_error === null || required_error === void 0 ? void 0 : (_required_error$due_d2 = required_error.due_date) === null || _required_error$due_d2 === void 0 ? void 0 : _required_error$due_d2[0]
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_TaskCategorySelectionBox__WEBPACK_IMPORTED_MODULE_3__["default"], {
              selected: taskCategory,
              onSelect: setTaskCategory
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_AssignedToSelection__WEBPACK_IMPORTED_MODULE_4__["default"], {
              selected: assignedTo,
              onSelect: setAssignedTo
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_20__.Listbox, {
              value: pageType,
              onChange: setPageType,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                className: "form-group position-relative my-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("label", {
                  htmlFor: "",
                  children: [" Task Type ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("sup", {
                    children: "*"
                  }), " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_20__.Listbox.Button, {
                  className: " sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
                    className: "singleline-ellipsis pr-3",
                    children: pageType !== null && pageType !== void 0 ? pageType : "--"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                    className: "__icon",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
                      className: "fa-solid fa-sort"
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_20__.Listbox.Options, {
                  className: "sp1-select-options",
                  children: (_ref2 = ["New Page Design", "Cloning Existing Desgin", "Others"]) === null || _ref2 === void 0 ? void 0 : _ref2.map(function (s, i) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_20__.Listbox.Option, {
                      className: function className(_ref3) {
                        var active = _ref3.active;
                        return "sp1-select-option ".concat(active ? 'active' : '');
                      },
                      value: s,
                      children: function children(_ref4) {
                        var selected = _ref4.selected;
                        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
                          children: [s, selected ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
                            className: "fa-solid fa-check ml-2"
                          }) : '']
                        });
                      }
                    }, i);
                  })
                })]
              })
            })
          }), pageType === "New Page Design" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_20__.Listbox, {
              value: pageTypePriority,
              onChange: setPageTypePriority,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                className: "form-group position-relative my-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("label", {
                  htmlFor: "",
                  children: [" Page Type ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("sup", {
                    children: "*"
                  }), " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_20__.Listbox.Button, {
                  className: " sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
                    className: "singleline-ellipsis pr-3",
                    children: pageTypePriority !== null && pageTypePriority !== void 0 ? pageTypePriority : "--"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                    className: "__icon",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
                      className: "fa-solid fa-sort"
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_20__.Listbox.Options, {
                  className: "sp1-select-options",
                  children: (_ref5 = ["Primary Page Development", "Secondary Page Development"]) === null || _ref5 === void 0 ? void 0 : _ref5.map(function (s, i) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_20__.Listbox.Option, {
                      className: function className(_ref6) {
                        var active = _ref6.active;
                        return "sp1-select-option ".concat(active ? 'active' : '');
                      },
                      value: s,
                      children: function children(_ref7) {
                        var selected = _ref7.selected;
                        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
                          children: [s, selected ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
                            className: "fa-solid fa-check ml-2"
                          }) : '']
                        });
                      }
                    }, i);
                  })
                })]
              })
            })
          }) : null, pageType === "Others" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_20__.Listbox, {
              value: pageTypeOthers,
              onChange: setPageTypeOthers,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                className: "form-group position-relative my-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("label", {
                  htmlFor: "",
                  children: [" Others ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("sup", {
                    children: "*"
                  }), " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_20__.Listbox.Button, {
                  className: " sp1-selection-display-button form-control height-35 f-14 sp1-selection-display bg-white w-100",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
                    className: "singleline-ellipsis pr-3",
                    children: pageTypeOthers !== null && pageTypeOthers !== void 0 ? pageTypeOthers : "--"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                    className: "__icon",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
                      className: "fa-solid fa-sort"
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_20__.Listbox.Options, {
                  className: "sp1-select-options",
                  children: (_ref8 = ["Page Design Change", "Speed Optimization", "Fixing Issues/Bugs", "Responsiveness Issue Fixing/Making Something Responsive"]) === null || _ref8 === void 0 ? void 0 : _ref8.map(function (s, i) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_20__.Listbox.Option, {
                      className: function className(_ref9) {
                        var active = _ref9.active;
                        return "sp1-select-option ".concat(active ? 'active' : '');
                      },
                      value: s,
                      children: function children(_ref10) {
                        var selected = _ref10.selected;
                        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
                          children: [s, selected ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
                            className: "fa-solid fa-check ml-2"
                          }) : '']
                        });
                      }
                    }, i);
                  })
                })]
              })
            })
          }) : null, pageType ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: [pageType === "Cloning Existing Desgin" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
              className: "col-12 col-md-6",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
                id: "page_type_name",
                label: "Page type name",
                type: "text",
                placeholder: "Enter page type name...",
                name: "pageTypeName",
                required: true,
                value: pageTypeName,
                error: required_error === null || required_error === void 0 ? void 0 : (_required_error$page_ = required_error.page_type) === null || _required_error$page_ === void 0 ? void 0 : _required_error$page_[0],
                onChange: function onChange(e) {
                  return handleChange(e, setPageTypeName);
                }
              })
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                className: "col-12 col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
                  id: "page_name",
                  label: "Page Name",
                  type: "text",
                  placeholder: "Enter page name",
                  name: "page name",
                  required: true,
                  value: pageName,
                  onChange: function onChange(e) {
                    return handleChange(e, setPageName);
                  }
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                className: "col-12 col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
                  id: "page_url",
                  label: "Page URL",
                  type: "text",
                  placeholder: "Enter page url",
                  name: "page url",
                  required: true,
                  value: pageURL,
                  error: required_error === null || required_error === void 0 ? void 0 : (_required_error$page_2 = required_error.page_url) === null || _required_error$page_2 === void 0 ? void 0 : _required_error$page_2[0],
                  onChange: function onChange(e) {
                    return handleChange(e, setPageURL);
                  }
                })
              })]
            }), pageType === "Cloning Existing Desgin" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                className: "col-12 col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
                  id: "number_of_pages",
                  label: "Number of Pages",
                  type: "number",
                  placeholder: "--",
                  name: "number_of_pages",
                  required: true,
                  value: numberOfPage,
                  onChange: function onChange(e) {
                    return handleChange(e, setNumberOfPage);
                  }
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                className: "col-12 col-md-6",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_2__["default"], {
                  id: "exiting_project_url",
                  label: "Existing Design Link",
                  type: "Link",
                  placeholder: "--",
                  name: "exiting_project_url",
                  required: true,
                  value: existingDesignLink,
                  onChange: function onChange(e) {
                    return handleChange(e, setExistingDesignLink);
                  }
                })
              })]
            }) : null]
          }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_PrioritySelection__WEBPACK_IMPORTED_MODULE_5__["default"], {
              selected: priority,
              setSelected: setPriority
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 col-md-6",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("label", {
                htmlFor: "",
                className: "f-14 text-dark-gray",
                children: ["Set Estimate Time", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("sup", {
                  className: "f-14",
                  children: " * "
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                className: "d-flex align-items-center",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                  type: "Number",
                  className: "form-control height-35 f-14 mr-2",
                  value: estimateTimeHour,
                  onChange: function onChange(e) {
                    return handleChange(e, setEstimateTimeHour);
                  }
                }), " ", "hrs", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("input", {
                  type: "Number",
                  className: "form-control height-35 f-14 mr-2 ml-2",
                  value: estimateTimeMin,
                  onChange: function onChange(e) {
                    return handleChange(e, setEstimateTimeMin);
                  }
                }), " ", "min"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                style: {
                  color: "red"
                },
                children: estimateError(required_error)
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                style: {
                  color: "red"
                },
                children: ["Estimation time can't exceed ", estimation === null || estimation === void 0 ? void 0 : estimation.hours_left, " hours ", estimation === null || estimation === void 0 ? void 0 : estimation.minutes_left, " minutes"]
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
              className: "form-group my-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("label", {
                htmlFor: "",
                children: " Description "
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                className: "sp1_st_write_comment_editor",
                style: {
                  minHeight: "100px"
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_7__["default"], {
                  onChange: handleEditorChange
                })
              }), (required_error === null || required_error === void 0 ? void 0 : (_required_error$descr = required_error.description) === null || _required_error$descr === void 0 ? void 0 : _required_error$descr[0]) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
                className: "text-danger",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("small", {
                  children: [" ", required_error === null || required_error === void 0 ? void 0 : (_required_error$descr2 = required_error.description) === null || _required_error$descr2 === void 0 ? void 0 : _required_error$descr2[0], " "]
                })
              })]
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_file_upload_UploadFilesInLine__WEBPACK_IMPORTED_MODULE_8__["default"], {
              files: files,
              setFiles: setFiles
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "col-12 mt-3 pb-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
              className: "d-flex align-items-center justify-content-end",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                variant: "secondary",
                className: "mr-2",
                onClick: close,
                children: "Cancel"
              }), !isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                onClick: handleSubmit,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
                  className: "fa-regular fa-paper-plane"
                }), "Create"]
              }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                className: "cursor-processing",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
                  className: "spinner-border text-white",
                  role: "status",
                  style: {
                    width: "18px",
                    height: "18px"
                  }
                }), "Processing..."]
              })]
            })
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubTaskForm);

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/SubTaskSection.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/SubTaskSection.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SubTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SubTask */ "./resources/js/react/single-task/section/sub-task/SubTask.jsx");
/* harmony import */ var _SubTaskForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SubTaskForm */ "./resources/js/react/single-task/section/sub-task/SubTaskForm.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _SubTaskEditForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SubTaskEditForm */ "./resources/js/react/single-task/section/sub-task/SubTaskEditForm.jsx");
/* harmony import */ var _components_CustomModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/CustomModal */ "./resources/js/react/single-task/components/CustomModal.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useWindowSize.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _permissions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../permissions */ "./resources/js/react/single-task/permissions.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


















var SubTaskSection = function SubTaskSection(_ref) {
  var _window, _window$Laravel;
  var status = _ref.status;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)(function (s) {
      return s.subTask;
    }),
    task = _useSelector.task,
    subTask = _useSelector.subTask;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_15__.useNavigate)();
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    edit = _React$useState2[0],
    setEdit = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState("add"),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    formMode = _React$useState4[0],
    setFormMode = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    isTaskModalOpen = _React$useState6[0],
    setIsTaskModalOpen = _React$useState6[1];
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    subtaskModalToggleRef = _React$useState8[0],
    setSubtaskModalToggleRef = _React$useState8[1];
  var _useWindowSize = (0,react_use__WEBPACK_IMPORTED_MODULE_16__["default"])(),
    width = _useWindowSize.width;
  var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_11__.User((_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user);
  var toggleAddButton = function toggleAddButton() {
    return setIsTaskModalOpen(!isTaskModalOpen);
  };
  var closeAddModal = function closeAddModal() {
    setIsTaskModalOpen(false);
    setFormMode("add");
    navigate("/account/tasks/".concat(task === null || task === void 0 ? void 0 : task.id));
  };
  var toggleEditButton = function toggleEditButton(e) {
    setFormMode("edit");
    setIsTaskModalOpen(!isTaskModalOpen);
  };

  // edit modal form control
  var toggleEditForm = function toggleEditForm(e, id) {
    e.preventDefault();
    setEdit(id);
    setIsTaskModalOpen(true);
  };
  var closeEditForm = function closeEditForm() {
    setEdit(null);
    setIsTaskModalOpen(false);
  };

  // handle create new subtask
  var handleCreateSubTask = function handleCreateSubTask() {
    // if parent task has not already any subtask
    // show the Working Environment form
    // else create from
  };

  // edit modal form control end
  // const {
  //   data,
  //   isFetching
  // } = useGetTaskDetailsQuery(`/${task?.id}/json?mode=sub_task`, {
  //   skip: subTask?.length
  // });

  // fetch all task
  var _useLazyGetTaskDetail = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__.useLazyGetTaskDetailsQuery)("", {
      skip: subTask === null || subTask === void 0 ? void 0 : subTask.length
    }),
    _useLazyGetTaskDetail2 = _slicedToArray(_useLazyGetTaskDetail, 2),
    getTaskDetails = _useLazyGetTaskDetail2[0],
    isFetching = _useLazyGetTaskDetail2[1].isFetching;

  // if task notes fetch completed store data into redux store
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if (task && task.id) {
      getTaskDetails("/".concat(task === null || task === void 0 ? void 0 : task.id, "/json?mode=sub_task")).unwrap().then(function (res) {
        if (res) {
          dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_6__.storeSubTasks)(res));
        }
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, [task]);

  // React.useEffect(() => {
  //   if(!isFetching && data){
  //     dispatch(storeSubTasks(data));
  //   }
  // },[data])

  var Task = new _utils_single_task__WEBPACK_IMPORTED_MODULE_12__.SingleTask(task);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
    className: "sp1_task_right_card mb-3",
    ref: setSubtaskModalToggleRef,
    style: {
      zIndex: isTaskModalOpen ? "99" : ""
    },
    children: [width > 1200 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_CustomModal__WEBPACK_IMPORTED_MODULE_8__["default"], {
        toggleRef: subtaskModalToggleRef,
        isOpen: isTaskModalOpen,
        close: closeAddModal,
        formMode: formMode,
        children: !edit ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_SubTaskForm__WEBPACK_IMPORTED_MODULE_2__["default"], {
          close: closeAddModal,
          isFirstSubtask: !isFetching && subTask !== null && subTask !== void 0 && subTask.length ? true : false
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_SubTaskEditForm__WEBPACK_IMPORTED_MODULE_7__["default"], {
          close: closeEditForm,
          editId: edit
        })
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_9__["default"], {
        isOpen: isTaskModalOpen,
        children: !edit ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_SubTaskForm__WEBPACK_IMPORTED_MODULE_2__["default"], {
          close: closeAddModal,
          isFirstSubtask: !isFetching && subTask !== null && subTask !== void 0 && subTask.length ? true : false
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_SubTaskEditForm__WEBPACK_IMPORTED_MODULE_7__["default"], {
          close: closeEditForm,
          editId: edit
        })
      })
    }), isTaskModalOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("button", {
      "aria-label": "openCommentModalButton",
      className: "sp1_task_right_dl_toggle",
      onClick: toggleAddButton,
      style: {
        zIndex: isTaskModalOpen ? "110" : ""
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("i", {
        className: "fa-solid fa-circle-chevron-".concat(isTaskModalOpen ? "right" : "left"),
        style: {
          color: "#276fec"
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
      className: "d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
        className: "f-16",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("span", {
          children: "Sub Task"
        }), isFetching && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
          className: "spinner-border text-dark ml-2",
          role: "status",
          style: {
            width: "16px",
            height: "16px",
            border: "0.14em solid rgba(0, 0, 0, .25)",
            borderRightColor: "transparent"
          }
        })]
      }), (0,_permissions__WEBPACK_IMPORTED_MODULE_13__.subTaskCreationPermision)({
        task: Task,
        auth: auth,
        status: status
      }) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
        variant: "tertiary",
        className: "sp1_tark_add_item",
        "aria-label": "addButton",
        onClick: toggleAddButton,
        children: isTaskModalOpen ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("i", {
            className: "fa-solid fa-xmark",
            style: {
              fontSize: "12px"
            }
          }), " Close"]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("i", {
            className: "fa-solid fa-plus",
            style: {
              fontSize: "12px"
            }
          }), "  Sub Task"]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
      className: "sp1_task_right_card--body",
      children: !isFetching ? lodash__WEBPACK_IMPORTED_MODULE_10___default().size(subTask) !== 0 ? subTask === null || subTask === void 0 ? void 0 : subTask.map(function (sub) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_SubTask__WEBPACK_IMPORTED_MODULE_1__["default"], {
          subTask: sub,
          task: task,
          status: status,
          toggleEditForm: toggleEditForm
        }, sub.id);
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
        className: "d-flex align-items-center justify-content-center",
        style: {
          color: "#B4BCC4",
          fontSize: "15px",
          textAlign: "center",
          height: "100%",
          width: "100%"
        },
        children: "Sub Task is Not Available"
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
        className: "d-flex align-items-center justify-content-center",
        style: {
          color: "#5A6169",
          fontSize: "15px",
          textAlign: "center",
          height: "100%",
          width: "100%"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
          className: "spinner-border text-dark ml-2",
          role: "status",
          style: {
            width: "16px",
            height: "16px",
            border: "0.14em solid rgba(0, 0, 0, .25)",
            borderRightColor: "transparent",
            marginRight: "10px"
          }
        }), "Loading..."]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubTaskSection);

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/WorkingEnvironmentForm.jsx":
/*!************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/WorkingEnvironmentForm.jsx ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_form_Input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/form/Input */ "./resources/js/react/single-task/components/form/Input.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _components_SubmitButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/SubmitButton */ "./resources/js/react/single-task/components/SubmitButton.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var WorkingEnvironmentForm = function WorkingEnvironmentForm(_ref) {
  var task = _ref.task,
    onSubmit = _ref.onSubmit,
    close = _ref.close;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    siteUrl = _useState2[0],
    setSiteUrl = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    frontendPassword = _useState4[0],
    setFrontendPassword = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    loginUrl = _useState6[0],
    setLoginUrl = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    siteLoginCredentialUserNameOrEmail = _useState8[0],
    setSiteLoginCredentialUserNameOrEmail = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState10 = _slicedToArray(_useState9, 2),
    password = _useState10[0],
    setPassword = _useState10[1];
  var _useWorkingEnvironmen = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__.useWorkingEnvironmentMutation)(),
    _useWorkingEnvironmen2 = _slicedToArray(_useWorkingEnvironmen, 2),
    workingEnvironment = _useWorkingEnvironmen2[0],
    isLoading = _useWorkingEnvironmen2[1].isLoading;

  // handle input change
  var handleChange = function handleChange(e, setState) {
    e.preventDefault();
    setState(e.target.value);
  };
  var handleSubmit = function handleSubmit(e) {
    var data = {
      project_id: task === null || task === void 0 ? void 0 : task.projectId,
      site_url: siteUrl,
      login_url: loginUrl,
      email: siteLoginCredentialUserNameOrEmail,
      password: password,
      frontend_password: frontendPassword
    };
    workingEnvironment(data).unwrap().then(function (res) {
      close(), onSubmit();
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "sp1-subtask-form w-100 --form -row",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "col-12 lg:col-6",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_1__["default"], {
          id: "siteURL",
          label: "Working/Staging Site's URL",
          type: "text",
          placeholder: "Type Working/Staging Site's URL",
          name: "stie_url",
          required: true,
          value: siteUrl,
          onChange: function onChange(e) {
            return handleChange(e, setSiteUrl);
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "col-12 lg:col-6",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_1__["default"], {
          id: "frontendPassword",
          label: "Frontend Password",
          type: "text",
          placeholder: "Frontent Password",
          name: "frontend-end-password",
          required: true,
          value: frontendPassword,
          onChange: function onChange(e) {
            return handleChange(e, setFrontendPassword);
          }
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "col-12 col-md-4",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_1__["default"], {
          id: "loginUrl",
          label: "Working/Staging Site's Admin Panel URL",
          type: "text",
          placeholder: "Type Working/Staging Site's Admin Panel URL",
          name: "login_url",
          required: true,
          value: loginUrl,
          onChange: function onChange(e) {
            return handleChange(e, setLoginUrl);
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "col-12 col-md-5 h-100",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_1__["default"], {
          id: "siteLoginCredential",
          label: "Working/Staging Site's Admin Panel Username/Email",
          type: "text",
          placeholder: "Type Working/Staging Site's Admin Panel Username/Email",
          name: "site-login-credential",
          required: true,
          value: siteLoginCredentialUserNameOrEmail,
          onChange: function onChange(e) {
            return handleChange(e, setSiteLoginCredentialUserNameOrEmail);
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "col-12 col-md-3",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "h-100 d-md-flex align-items-end",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_form_Input__WEBPACK_IMPORTED_MODULE_1__["default"], {
            id: "password",
            label: "Password",
            type: "text",
            placeholder: "Password",
            name: "password",
            className: "mt-md-auto",
            required: true,
            value: password,
            onChange: function onChange(e) {
              return handleChange(e, setPassword);
            }
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "col-12 mt-3",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "d-flex align-items-center justify-content-end",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
          variant: "secondary",
          className: "mr-2",
          onClick: close,
          children: "Cancel"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components_SubmitButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
          onClick: handleSubmit,
          isLoading: isLoading,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
            className: "fa-regular fa-paper-plane"
          }), "Create"]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WorkingEnvironmentForm);

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/preview/Comments.jsx":
/*!******************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/preview/Comments.jsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Loader */ "./resources/js/react/single-task/components/Loader.jsx");
/* harmony import */ var _comments_CommentSendBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../comments/CommentSendBox */ "./resources/js/react/single-task/section/comments/CommentSendBox.jsx");
/* harmony import */ var _comments_InnerComment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../comments/InnerComment */ "./resources/js/react/single-task/section/comments/InnerComment.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var Comments = function Comments(_ref) {
  var task = _ref.task,
    comments = _ref.comments,
    onCommentPost = _ref.onCommentPost,
    isLoading = _ref.isLoading;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "d-flex flex-column",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_comments_CommentSendBox__WEBPACK_IMPORTED_MODULE_2__["default"], {
        task: task,
        onCommentPost: onCommentPost
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "sp1_task_comment_list mt-4",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "font-weight-bold pb-3",
          children: "Comments: "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "sp1_task_comment_list_items",
          children: [isLoading && (comments === null || comments === void 0 ? void 0 : comments.length) === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Loader__WEBPACK_IMPORTED_MODULE_1__["default"], {}), (comments === null || comments === void 0 ? void 0 : comments.length) > 0 && (comments === null || comments === void 0 ? void 0 : comments.map(function (comment) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_comments_InnerComment__WEBPACK_IMPORTED_MODULE_3__["default"], {
              comment: comment
            }, comment.id);
          }))]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comments);

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/preview/Genarel.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/preview/Genarel.jsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _components_Accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Accordion */ "./resources/js/react/single-task/components/Accordion.jsx");
/* harmony import */ var _components_Guideline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/Guideline */ "./resources/js/react/single-task/components/Guideline.jsx");
/* harmony import */ var _components_RevisionText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/RevisionText */ "./resources/js/react/single-task/components/RevisionText.jsx");
/* harmony import */ var _components_loader_GenarelLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/loader/GenarelLoader */ "./resources/js/react/single-task/components/loader/GenarelLoader.jsx");
/* harmony import */ var _components_loader_ArticleLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/loader/ArticleLoader */ "./resources/js/react/single-task/components/loader/ArticleLoader.jsx");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");










var Genarel = function Genarel(_ref) {
  var _window, _window$Laravel, _task$assigneeTo, _task$assigneeTo2, _task$assigneeTo3, _task$assigneeTo4, _task$assigneeTo5, _task$assigneeTo6, _task$assigneeBy, _task$assigneeBy2, _task$assigneeBy3, _task$assigneeBy4, _task$assigneeBy5, _task$assigneeBy6, _task$category, _task$boardColumn, _$last;
  var task = _ref.task,
    isFetching = _ref.isFetching;
  var loggedUser = new _utils_user_details__WEBPACK_IMPORTED_MODULE_1__.User((_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: "row",
    children: [isFetching ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_loader_GenarelLoader__WEBPACK_IMPORTED_MODULE_5__["default"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "col-12 col-xl-6 pb-3 pb-xl-0",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "d-flex flex-column",
          style: {
            gap: "10px"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("h6", {
            className: "",
            children: ["Task: ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
              target: "__blank",
              href: "/account/tasks/".concat(task === null || task === void 0 ? void 0 : task.id),
              className: "text-primary font-weight-normal",
              children: task === null || task === void 0 ? void 0 : task.getSubtaskTitle()
            })]
          }), (task === null || task === void 0 ? void 0 : task.isSubtask) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "sp1_st-list-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "sp1_st-list-item-head",
              children: "Parent Task :"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "sp1_st-list-item-value",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
                href: "/account/tasks/".concat(task === null || task === void 0 ? void 0 : task.parentTaskId),
                className: "text-dark text-hover-underline",
                children: task === null || task === void 0 ? void 0 : task.parentTaskTitle
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "sp1_st-list-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "sp1_st-list-item-head",
              children: "Project : "
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "sp1_st-list-item-value",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                className: "dot-color bg-danger mr-2"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
                href: "/account/projects/".concat(task === null || task === void 0 ? void 0 : task.projectId),
                className: "text-dark text-hover-underline",
                children: task === null || task === void 0 ? void 0 : task.projectName
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "sp1_st-list-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "sp1_st-list-item-head",
              children: ["Milestone :", " "]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "sp1_st-list-item-value",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                className: "dot-color bg-primary mr-2"
              }), task === null || task === void 0 ? void 0 : task.milestoneTitle]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "sp1_st-list-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "sp1_st-list-item-head",
              children: ["Assigned To :", " "]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "sp1_st-list-item-value",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                style: {
                  width: "32px",
                  height: "32px"
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
                  src: task === null || task === void 0 ? void 0 : (_task$assigneeTo = task.assigneeTo) === null || _task$assigneeTo === void 0 ? void 0 : _task$assigneeTo.getAvatar(),
                  alt: task === null || task === void 0 ? void 0 : (_task$assigneeTo2 = task.assigneeTo) === null || _task$assigneeTo2 === void 0 ? void 0 : _task$assigneeTo2.getName(),
                  width: "32px",
                  height: "32px",
                  className: "rounded-circle"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "ml-2",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span", {
                  className: "d-block f-14 font-weight-bold",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
                    href: task === null || task === void 0 ? void 0 : (_task$assigneeTo3 = task.assigneeTo) === null || _task$assigneeTo3 === void 0 ? void 0 : _task$assigneeTo3.getUserLink(),
                    className: "text-dark hover-underline",
                    children: task === null || task === void 0 ? void 0 : (_task$assigneeTo4 = task.assigneeTo) === null || _task$assigneeTo4 === void 0 ? void 0 : _task$assigneeTo4.getName()
                  }), Number(task === null || task === void 0 ? void 0 : (_task$assigneeTo5 = task.assigneeTo) === null || _task$assigneeTo5 === void 0 ? void 0 : _task$assigneeTo5.getId()) === Number(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.getId()) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("sup", {
                    className: "rounded-pill bg-dark text-white px-1",
                    style: {
                      fontSize: "10px"
                    },
                    children: [" ", "It's You", " "]
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                  style: {
                    fontSize: "12px"
                  },
                  children: task === null || task === void 0 ? void 0 : (_task$assigneeTo6 = task.assigneeTo) === null || _task$assigneeTo6 === void 0 ? void 0 : _task$assigneeTo6.getDesignationName()
                })]
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "sp1_st-list-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "sp1_st-list-item-head",
              children: ["Assigned by:", " "]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "sp1_st-list-item-value",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                style: {
                  width: "32px",
                  height: "32px"
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
                  src: task === null || task === void 0 ? void 0 : (_task$assigneeBy = task.assigneeBy) === null || _task$assigneeBy === void 0 ? void 0 : _task$assigneeBy.getAvatar(),
                  alt: task === null || task === void 0 ? void 0 : (_task$assigneeBy2 = task.assigneeBy) === null || _task$assigneeBy2 === void 0 ? void 0 : _task$assigneeBy2.getName(),
                  width: "32px",
                  height: "32px",
                  className: "rounded-circle"
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "ml-2",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span", {
                  className: "d-block f-14 font-weight-bold",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
                    href: task === null || task === void 0 ? void 0 : (_task$assigneeBy3 = task.assigneeBy) === null || _task$assigneeBy3 === void 0 ? void 0 : _task$assigneeBy3.getUserLink(),
                    className: "text-dark hover-underline",
                    children: task === null || task === void 0 ? void 0 : (_task$assigneeBy4 = task.assigneeBy) === null || _task$assigneeBy4 === void 0 ? void 0 : _task$assigneeBy4.getName()
                  }), Number(task === null || task === void 0 ? void 0 : (_task$assigneeBy5 = task.assigneeBy) === null || _task$assigneeBy5 === void 0 ? void 0 : _task$assigneeBy5.getId()) === Number(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.getId()) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("sup", {
                    className: "rounded-pill bg-dark text-white px-1",
                    style: {
                      fontSize: "10px"
                    },
                    children: "It's You"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                  style: {
                    fontSize: "12px"
                  },
                  children: task === null || task === void 0 ? void 0 : (_task$assigneeBy6 = task.assigneeBy) === null || _task$assigneeBy6 === void 0 ? void 0 : _task$assigneeBy6.getDesignationName()
                })]
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "sp1_st-list-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "sp1_st-list-item-head",
              children: "Priority : "
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "sp1_st-list-item-value",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                className: "dot-color mr-2",
                style: {
                  background: "rgba(252, 189, 1, 1)"
                }
              }), task === null || task === void 0 ? void 0 : task.priority]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "sp1_st-list-item",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "sp1_st-list-item-head",
              children: ["Task Category :", " "]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "sp1_st-list-item-value",
              children: task === null || task === void 0 ? void 0 : (_task$category = task.category) === null || _task$category === void 0 ? void 0 : _task$category.name
            })]
          })]
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      className: "col-12 col-xl-6 d-flex flex-column py-3 px-3",
      style: {
        gap: "10px",
        background: "#F0F2F6"
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "font-weight-bold d-block",
        children: " Status: "
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "d-flex align-items-center",
        style: {
          gap: "6px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "dot-color mr-2",
          style: {
            background: task === null || task === void 0 ? void 0 : (_task$boardColumn = task.boardColumn) === null || _task$boardColumn === void 0 ? void 0 : _task$boardColumn.labelColor
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          className: "font-weight-bold",
          children: task === null || task === void 0 ? void 0 : task.boardColumn.columnName
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "col-6 col-sm-5 col-md-3 col-xl-6",
          children: ["Start Date", " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "col-6 col-sm-7 col-md-9 col-xl-6",
          children: [": ", task === null || task === void 0 ? void 0 : task.getStartDate("MMM DD, YYYY")]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "col-6 col-sm-5 col-md-3 col-xl-6",
          children: ["Due Date", " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "col-6 col-sm-7 col-md-9 col-xl-6",
          children: [": ", task === null || task === void 0 ? void 0 : task.getDueDate("MMM DD, YYYY")]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "col-6 col-sm-5 col-md-3 col-xl-6",
          children: ["Time Estimate", " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "col-6 col-sm-7 col-md-9 col-xl-6",
          children: [": ", task === null || task === void 0 ? void 0 : task.getEstimateTime()]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "col-6 col-sm-5 col-md-3 col-xl-6",
          children: ["Total Hours Logged", " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "col-6 col-sm-7 col-md-9 col-xl-6",
          children: [": ", (task === null || task === void 0 ? void 0 : task.parentTaskTimeLog) || "--"]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      className: "col-12 border-top py-4 mt-4",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Accordion__WEBPACK_IMPORTED_MODULE_2__["default"], {
        expendable: false,
        title: "General Guidelines",
        children: isFetching ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_loader_ArticleLoader__WEBPACK_IMPORTED_MODULE_6__["default"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Guideline__WEBPACK_IMPORTED_MODULE_3__["default"], {
          text: task === null || task === void 0 ? void 0 : task.guidelines,
          editorContainerClass: "modal-guideline-editor-text"
        })
      }), _.size(task === null || task === void 0 ? void 0 : task.revisions) > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Accordion__WEBPACK_IMPORTED_MODULE_2__["default"], {
        title: (_$last = _.last(task === null || task === void 0 ? void 0 : task.revisions)) === null || _$last === void 0 ? void 0 : _$last.revisionStatus,
        headingClass: "d-flex align-items-center justify-content-between",
        headingStyle: {
          background: "rgba(227,62,79,1)",
          color: "#fff"
        },
        children: _.map(task === null || task === void 0 ? void 0 : task.revisions, function (revision, index) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_RevisionText__WEBPACK_IMPORTED_MODULE_4__["default"], {
            index: index + 1,
            date: dayjs__WEBPACK_IMPORTED_MODULE_7___default()(revision.createdAt).format('MMM DD, YYYY'),
            time: dayjs__WEBPACK_IMPORTED_MODULE_7___default()(revision.createdAt).format('hh:mm a'),
            text: revision === null || revision === void 0 ? void 0 : revision.comment
          }, revision.id);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Accordion__WEBPACK_IMPORTED_MODULE_2__["default"], {
        expendable: false,
        title: "Task Descriptions",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Guideline__WEBPACK_IMPORTED_MODULE_3__["default"], {
          text: task === null || task === void 0 ? void 0 : task.description
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Genarel);

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/preview/History.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/preview/History.jsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Loader */ "./resources/js/react/single-task/components/Loader.jsx");
/* harmony import */ var _components_HistoryLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/HistoryLoader */ "./resources/js/react/single-task/components/HistoryLoader.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var InnerHistoryItem = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_single-task_section_history_InnerHistoryItem_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ../../history/InnerHistoryItem */ "./resources/js/react/single-task/section/history/InnerHistoryItem.jsx"));
});
var History = function History(_ref) {
  var histories = _ref.histories,
    isLoading = _ref.isLoading;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h6", {
      className: "font-weight-bold",
      children: " Histories "
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "mt-3 px-2",
      children: [histories.length > 0 ? histories.map(function (d) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
            fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_HistoryLoader__WEBPACK_IMPORTED_MODULE_2__["default"], {}),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(InnerHistoryItem, {
              history: d
            })
          })
        }, d.id);
      }) : null, isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Loader__WEBPACK_IMPORTED_MODULE_1__["default"], {})]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (History);

// history loader

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/preview/SubmittedWork.jsx":
/*!***********************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/preview/SubmittedWork.jsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Loader */ "./resources/js/react/single-task/components/Loader.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var SubmittedWorkItem = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_single-task_section_sub-task_preview_SubmittedWorkItem_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ./SubmittedWorkItem */ "./resources/js/react/single-task/section/sub-task/preview/SubmittedWorkItem.jsx"));
});
var SubmittedWork = function SubmittedWork(_ref) {
  var task = _ref.task,
    submittedWork = _ref.submittedWork,
    loading = _ref.loading;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h6", {
      className: "font-weight-bold",
      children: "Submitted Work"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "d-flex flex-column h-100",
      style: {
        gap: '10px'
      },
      children: [loading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "mt-3",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_Loader__WEBPACK_IMPORTED_MODULE_1__["default"], {})
      }), submittedWork.length > 0 ? submittedWork.map(function (s) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
            fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
              className: "mt-3",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_Loader__WEBPACK_IMPORTED_MODULE_1__["default"], {})
            }),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(SubmittedWorkItem, {
              data: s,
              task: task
            })
          })
        }, s === null || s === void 0 ? void 0 : s.task_id);
      }) : null]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmittedWork);

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/preview/TaskReview.jsx":
/*!********************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/preview/TaskReview.jsx ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_Rating__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../global/Rating */ "./resources/js/react/global/Rating.jsx");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Loader */ "./resources/js/react/single-task/components/Loader.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var TaskReview = function TaskReview(_ref) {
  var review = _ref.review,
    isLoading = _ref.isLoading;
  var data = review;
  var comment = (data === null || data === void 0 ? void 0 : data.comment) || "<span className='' style=\"color: #A7A9B2\">No Comment is Available</span>";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "sp1_task_right_card mb-3",
    style: {
      maxHeight: '450px'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "f-16",
        children: "Task Review"
      })
    }), isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "d-flex align-items-center mb-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "",
          style: {
            width: '150px'
          },
          children: "Deadline Meet : "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "d-flex align-items-center",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Rating__WEBPACK_IMPORTED_MODULE_1__["default"], {
            rating: Number(data === null || data === void 0 ? void 0 : data.deadline_meet)
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "d-flex align-items-center mb-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "",
          style: {
            width: '150px'
          },
          children: "Submission Quality: "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "d-flex align-items-center",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Rating__WEBPACK_IMPORTED_MODULE_1__["default"], {
            rating: Number(data === null || data === void 0 ? void 0 : data.submission_quality)
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "d-flex align-items-center mb-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "",
          style: {
            width: '150px'
          },
          children: "Req. Fullfillment: "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "d-flex align-items-center",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Rating__WEBPACK_IMPORTED_MODULE_1__["default"], {
            rating: Number(data === null || data === void 0 ? void 0 : data.req_fullfillment)
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "d-flex align-items-center mb-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "",
          style: {
            width: '150px'
          },
          children: "Overall Task Ratings: "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "d-flex align-items-center",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Rating__WEBPACK_IMPORTED_MODULE_1__["default"], {
            rating: Number(data === null || data === void 0 ? void 0 : data.overall_tasks)
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "mb-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "font-weight-bold d-block mb-1",
          children: "Comments:"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          style: {
            color: '#777',
            fontSize: '13px'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "sp1_ck_content",
            dangerouslySetInnerHTML: {
              __html: comment
            }
          })
        })]
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskReview);

/***/ }),

/***/ "./resources/js/react/single-task/section/sub-task/preview/TimeLog.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/preview/TimeLog.jsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Loader */ "./resources/js/react/single-task/components/Loader.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var TimeLogContainer = function TimeLogContainer(_ref) {
  var task = _ref.task,
    timeLog = _ref.timeLog,
    isLoading = _ref.isLoading;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "sp1_modal_timelog_view",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h6", {
        children: " Session Logs "
      }), " "]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("table", {
        className: "sp1_subtask_log-tbl",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("thead", {
          className: "__thead",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("th", {
              children: "Employee"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("th", {
              children: "Start Time"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("th", {
              children: "End Time"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("th", {
              children: "Memo"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("th", {
              children: "Hours Logged"
            })]
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "sp1_modal_timelog_view-tbl-contanier",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("table", {
          className: "sp1_subtask_log-tbl",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tbody", {
            className: "__tbody",
            children: [timeLog ? timeLog.map(function (log) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(TableRow, {
                log: log
              }, log.id);
            }) : null, isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("tr", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
                className: "py-2 text-center",
                colSpan: 5,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {})
              })
            })]
          })
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLogContainer);
var TableRow = function TableRow(_ref2) {
  var log = _ref2.log;
  var timeLog = new _utils_single_task__WEBPACK_IMPORTED_MODULE_1__.TimeLog(log);
  var user = timeLog === null || timeLog === void 0 ? void 0 : timeLog.user;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
    className: "__tbody_tr",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
      className: "__tbody_td _tbody_td_employee",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
        src: user === null || user === void 0 ? void 0 : user.getAvatar(),
        alt: user === null || user === void 0 ? void 0 : user.getName()
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "px-2",
        children: user === null || user === void 0 ? void 0 : user.getName()
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
      className: "__tbody_td _tbody_td_start_time",
      children: [timeLog === null || timeLog === void 0 ? void 0 : timeLog.getStartTime(), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), timeLog === null || timeLog === void 0 ? void 0 : timeLog.getStartTime('hh:mm a')]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "__tbody_td _tbody_td_start_time _tbody_td_start_end",
      children: !(timeLog !== null && timeLog !== void 0 && timeLog.endTime) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "text-success font-weight-bold",
        children: "Active"
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
        children: [timeLog === null || timeLog === void 0 ? void 0 : timeLog.getEndTime(), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), timeLog === null || timeLog === void 0 ? void 0 : timeLog.getEndTime('hh:mm a')]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "__tbody_td _tbody_td_memo",
      children: timeLog === null || timeLog === void 0 ? void 0 : timeLog.memo
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "__tbody_td _tbody_td_hour_logged",
      children: timeLog === null || timeLog === void 0 ? void 0 : timeLog.hoursLogged
    })]
  });
};

/***/ }),

/***/ "./resources/js/react/single-task/section/submitted-work/InnerWorkItem.jsx":
/*!*********************************************************************************!*\
  !*** ./resources/js/react/single-task/section/submitted-work/InnerWorkItem.jsx ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var InnerWorkItem = function InnerWorkItem(_ref) {
  var data = _ref.data;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "d-flex align-items-center justify-content-between sp1_tark_right_item px-0 py-2",
    styte: {
      gap: "16px"
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("a", {
        className: "hover-underline text-primary",
        href: "/account/tasks/132?preview-type=modal&subtask=".concat(data === null || data === void 0 ? void 0 : data.task_id),
        children: ["Task#", data === null || data === void 0 ? void 0 : data.task_id]
      }), "(", data === null || data === void 0 ? void 0 : data.submission_no, ") submitted by ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        className: "hover-underline text-primary",
        href: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.user_id),
        children: data === null || data === void 0 ? void 0 : data.name
      }), " "]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      children: dayjs__WEBPACK_IMPORTED_MODULE_2___default()(data === null || data === void 0 ? void 0 : data.submission_date).format('MMM DD, YYYY')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "d-flex align-items-center",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Link, {
        to: "?submitted-work=".concat(data === null || data === void 0 ? void 0 : data.task_id).concat(data === null || data === void 0 ? void 0 : data.submission_no),
        className: "mr-2 py-2 sp1_task_righ_action_btn",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
          className: "fa-regular fa-eye"
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InnerWorkItem);

/***/ }),

/***/ "./resources/js/react/single-task/section/submitted-work/SubmitionView.jsx":
/*!*********************************************************************************!*\
  !*** ./resources/js/react/single-task/section/submitted-work/SubmitionView.jsx ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_CustomModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/CustomModal */ "./resources/js/react/single-task/components/CustomModal.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../file-upload/FileUploader */ "./resources/js/react/file-upload/FileUploader.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useWindowSize.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");










var SubmitionView = function SubmitionView(_ref) {
  var isOpen = _ref.isOpen,
    close = _ref.close,
    toggle = _ref.toggle,
    data = _ref.data,
    isLoading = _ref.isLoading;
  var links = _.compact(_.split(data === null || data === void 0 ? void 0 : data.links, ','));
  var attaches = _.compact(_.split(data === null || data === void 0 ? void 0 : data.attaches, ','));
  var _useWindowSize = (0,react_use__WEBPACK_IMPORTED_MODULE_8__["default"])(),
    deviceWidth = _useWindowSize.width;
  var content = function content() {
    var _data$name;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      className: "sp1-subtask-form --modal-panel --modal-submitted",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "sp1-subtask-form --modal-panel-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h6", {
            children: "Submitted Task "
          }), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
            className: "spinner-border text-dark ml-2",
            role: "status",
            style: {
              width: "16px",
              height: "16px",
              border: "0.14em solid rgba(0, 0, 0, .25)",
              borderRightColor: "transparent"
            }
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
          "aria-label": "close-modal",
          className: "_close-modal",
          onClick: close,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "sp1-subtask-form --modal-panel-body --modal-submitted-body",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "mt-3 d-flex flex-column",
          style: {
            gap: "10px"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              className: "fs-14 font-weight-bold d-block mb-3",
              style: {
                color: "#767581"
              },
              children: "Submitted By"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
              className: "d-flex align-items-center",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
                children: data !== null && data !== void 0 && data.image ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("img", {
                  src: "/user-uploads/avatar/".concat(data === null || data === void 0 ? void 0 : data.image),
                  alt: data === null || data === void 0 ? void 0 : data.name,
                  width: 32,
                  height: 32,
                  className: "rounded-circle"
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
                  className: "sp1-item-center rounded-circle border",
                  style: {
                    width: '32px',
                    height: '32px'
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
                    className: "font-weight-bold",
                    style: {
                      fontSize: '1.2rem'
                    },
                    children: data === null || data === void 0 ? void 0 : (_data$name = data.name) === null || _data$name === void 0 ? void 0 : _data$name.slice(0, 1)
                  })
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
                className: "d-flex flex-column px-2",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("a", {
                  className: "text-underline text-primary",
                  href: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.user_id),
                  style: {
                    color: "#767581"
                  },
                  children: [" ", data === null || data === void 0 ? void 0 : data.name, " "]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("span", {
                  className: "d-block",
                  style: {
                    color: "#767581"
                  },
                  children: [dayjs__WEBPACK_IMPORTED_MODULE_4___default()(data === null || data === void 0 ? void 0 : data.submission_date).format("MMM DD, YYYY"), " at ", dayjs__WEBPACK_IMPORTED_MODULE_4___default()(data === null || data === void 0 ? void 0 : data.submission_date).format("hh:mm a")]
                })]
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            className: "d-flex flex-column mt-3",
            style: {
              gap: "10px"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              className: "d-block fs-14 font-weight-bold",
              style: {
                color: "#767581"
              },
              children: " Links "
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("ul", {
              style: {
                listStyle: "unset",
                marginLeft: "30px"
              },
              children: links === null || links === void 0 ? void 0 : links.map(function (link, i) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("li", {
                  style: {
                    listStyle: "unset"
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("a", {
                    className: "hover-underline text-primary",
                    target: "_blank",
                    href: link,
                    children: [" ", link, " "]
                  })
                }, link + i);
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            className: "mt-2 mt-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              className: "d-block fs-12 font-weight-bold mb-2",
              style: {
                color: "#767581"
              },
              children: "Description"
            }), data !== null && data !== void 0 && data.text ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
              className: "sp1_ck_content",
              dangerouslySetInnerHTML: {
                __html: data === null || data === void 0 ? void 0 : data.text
              }
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              style: {
                color: "rgb(180, 188, 196)"
              },
              children: "No description is available"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            className: "mt-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              className: "d-block fs-12 font-weight-bold mb-2",
              style: {
                color: "#767581"
              },
              children: "Attached Files"
            }), _.size(attaches) > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_5__["default"], {
              children: _.map(attaches, function (file, index) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_5__["default"].Preview, {
                  fileName: file,
                  downloadAble: true,
                  deleteAble: false,
                  downloadUrl: "/storage/TaskSubmission/".concat(file),
                  previewUrl: "/storage/TaskSubmission/".concat(file),
                  fileType: _.includes(["png", "jpg", "jpeg", "gif", "svg"], _.last(_.split(file, '.'))) ? 'images' : 'others',
                  ext: ""
                }, "".concat(file, "_").concat(index));
              })
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              className: "",
              style: {
                color: "rgb(180, 188, 196)"
              },
              children: "No Attachment is available"
            })]
          })]
        })
      })]
    });
  };
  if (deviceWidth > 1200) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_CustomModal__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isOpen: isOpen,
      toggleRef: toggle,
      children: content()
    });
  } else {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_components_Modal__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isOpen: isOpen,
        children: [" ", content(), " "]
      })
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmitionView);

/***/ }),

/***/ "./resources/js/react/single-task/section/submitted-work/SubmittedModalView.jsx":
/*!**************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/submitted-work/SubmittedModalView.jsx ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_CustomModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/CustomModal */ "./resources/js/react/single-task/components/CustomModal.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _InnerWorkItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InnerWorkItem */ "./resources/js/react/single-task/section/submitted-work/InnerWorkItem.jsx");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useWindowSize.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








var SubmittedModalView = function SubmittedModalView(_ref) {
  var isOpen = _ref.isOpen,
    toggle = _ref.toggle,
    data = _ref.data,
    close = _ref.close,
    isLoading = _ref.isLoading;
  var _useWindowSize = (0,react_use__WEBPACK_IMPORTED_MODULE_6__["default"])(),
    deviceWidth = _useWindowSize.width;
  var content = function content() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "sp1-subtask-form --modal-panel --modal-submitted",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "sp1-subtask-form --modal-panel-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h6", {
            children: "Submitted Task "
          }), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "spinner-border text-dark ml-2",
            role: "status",
            style: {
              width: '16px',
              height: '16px',
              border: '0.14em solid rgba(0, 0, 0, .25)',
              borderRightColor: 'transparent'
            }
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
          "aria-label": "close-modal",
          className: "_close-modal",
          onClick: close,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "sp1-subtask-form --modal-panel-body px-0",
        children: data === null || data === void 0 ? void 0 : data.map(function (d) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_InnerWorkItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
            data: d
          }, "".concat(d.task_id, "_").concat(d.submission_no));
        })
      })]
    });
  };
  return deviceWidth > 1200 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components_CustomModal__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isOpen: isOpen,
      toggleRef: toggle,
      children: [" ", content(), " "]
    })
  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components_Modal__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isOpen: isOpen,
      children: [" ", content(), " "]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmittedModalView);

/***/ }),

/***/ "./resources/js/react/single-task/section/submitted-work/SubmittedWork.jsx":
/*!*********************************************************************************!*\
  !*** ./resources/js/react/single-task/section/submitted-work/SubmittedWork.jsx ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WorkItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WorkItem */ "./resources/js/react/single-task/section/submitted-work/WorkItem.jsx");
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swr */ "./node_modules/swr/core/dist/index.mjs");
/* harmony import */ var _SubmitionView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SubmitionView */ "./resources/js/react/single-task/section/submitted-work/SubmitionView.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _SubmittedModalView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SubmittedModalView */ "./resources/js/react/single-task/section/submitted-work/SubmittedModalView.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var fetcher = function fetcher(url) {
  return axios.get(url).then(function (res) {
    return res.data;
  });
};
var SubmittedWork = function SubmittedWork(_ref) {
  var task = _ref.task;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    modalRefButton = _React$useState2[0],
    setModalRefButton = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    isOpen = _React$useState4[0],
    setIsOpen = _React$useState4[1];
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();
  var location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useLocation)();
  var _useSWR = (0,swr__WEBPACK_IMPORTED_MODULE_2__["default"])("/account/tasks/get-task-submissions/".concat(task === null || task === void 0 ? void 0 : task.id), fetcher, {
      refreshInterval: 1000 * 3600
    }),
    data = _useSWR.data,
    error = _useSWR.error,
    isLoading = _useSWR.isLoading;
  var _useSearchParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useSearchParams)(),
    _useSearchParams2 = _slicedToArray(_useSearchParams, 1),
    searchParams = _useSearchParams2[0];
  var preview = searchParams.get('submitted-work');
  var modal = searchParams.get('view-modal');
  // control modal
  var toggle = function toggle(e) {
    e.preventDefault();
    if (preview || modal) {
      if (location.state && location.state.from) {
        navigate(location.state.from);
      } else {
        navigate("/account/tasks/".concat(task === null || task === void 0 ? void 0 : task.id));
      }
    } else {
      navigate("/account/tasks/".concat(task === null || task === void 0 ? void 0 : task.id, "?view-modal=submitted-work"));
    }
  };
  var close = function close() {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate("/account/tasks/".concat(task === null || task === void 0 ? void 0 : task.id));
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "sp1_task_right_card mb-3",
    ref: setModalRefButton,
    style: {
      zIndex: preview || modal === 'submitted-work' ? 99 : ''
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "f-16",
        children: "Submitted Works"
      }), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "spinner-border text-dark ml-2 mr-auto",
        role: "status",
        style: {
          width: '16px',
          height: '16px',
          border: '0.14em solid rgba(0, 0, 0, .25)',
          borderRightColor: 'transparent'
        }
      })]
    }), lodash__WEBPACK_IMPORTED_MODULE_5___default().size(data) > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
      "aria-label": "openCommentModalButton",
      className: "sp1_task_right_dl_toggle",
      onClick: toggle,
      style: {
        zIndex: preview || modal === 'submitted-work' ? '110' : ''
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
        className: "fa-solid fa-circle-chevron-".concat(preview || modal === 'submitted-work' ? 'right' : 'left'),
        style: {
          color: "#276fec"
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_SubmittedModalView__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isOpen: modal === 'submitted-work',
      toggle: modalRefButton,
      data: lodash__WEBPACK_IMPORTED_MODULE_5___default().orderBy(data, ['task_id', 'submission_no'], ['desc', 'desc']),
      close: close,
      isLoading: isLoading
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "sp1_task_right_card--body",
      children: lodash__WEBPACK_IMPORTED_MODULE_5___default().size(data) > 0 ? lodash__WEBPACK_IMPORTED_MODULE_5___default().map(lodash__WEBPACK_IMPORTED_MODULE_5___default().orderBy(data, ['task_id', 'submission_no'], ['desc', 'desc']), function (item) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_WorkItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
          data: item,
          toggle: toggle,
          close: close,
          isLoading: isLoading,
          modalRef: modalRefButton
        }, (item === null || item === void 0 ? void 0 : item.submission_date) + (item === null || item === void 0 ? void 0 : item.submission_no));
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "d-flex align-items-center justify-content-center",
        style: {
          color: "#B4BCC4",
          fontSize: "15px",
          textAlign: "center",
          height: "100%",
          width: "100%"
        },
        children: "No Submitted Work is Available"
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmittedWork);

/***/ }),

/***/ "./resources/js/react/single-task/section/submitted-work/WorkItem.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/submitted-work/WorkItem.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SubmitionView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SubmitionView */ "./resources/js/react/single-task/section/submitted-work/SubmitionView.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var WorkItem = function WorkItem(_ref) {
  var data = _ref.data,
    toggle = _ref.toggle,
    modalRef = _ref.modalRef,
    close = _ref.close,
    isLoading = _ref.isLoading;
  var _useSearchParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useSearchParams)(),
    _useSearchParams2 = _slicedToArray(_useSearchParams, 1),
    searchParams = _useSearchParams2[0];
  var previewId = searchParams.get('submitted-work') || 0;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "d-flex align-items-center justify-content-between sp1_tark_right_item",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("a", {
        className: "hover-underline text-primary",
        href: "/account/tasks/132?preview-type=modal&subtask=".concat(data === null || data === void 0 ? void 0 : data.task_id),
        children: [" Task#", data === null || data === void 0 ? void 0 : data.task_id, " "]
      }), "(", data === null || data === void 0 ? void 0 : data.submission_no, ") submitted by ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        className: "hover-underline text-primary",
        href: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.user_id),
        children: data === null || data === void 0 ? void 0 : data.name
      }), " "]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      children: dayjs__WEBPACK_IMPORTED_MODULE_2___default()(data === null || data === void 0 ? void 0 : data.submission_date).format('MMM DD, YYYY')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "d-flex align-items-center",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Link, {
        to: "?submitted-work=".concat(data === null || data === void 0 ? void 0 : data.task_id).concat(data === null || data === void 0 ? void 0 : data.submission_no),
        className: "mr-2 py-2 sp1_task_righ_action_btn",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
          className: "fa-regular fa-eye"
        })
      })
    }), Number(previewId) === Number("".concat(data === null || data === void 0 ? void 0 : data.task_id).concat(data === null || data === void 0 ? void 0 : data.submission_no)) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_SubmitionView__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isOpen: Number(previewId) === Number("".concat(data === null || data === void 0 ? void 0 : data.task_id).concat(data === null || data === void 0 ? void 0 : data.submission_no)),
      toggle: modalRef,
      data: data,
      close: close,
      isLoading: isLoading
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WorkItem);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/MarkAsComplete.jsx":
/*!********************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/MarkAsComplete.jsx ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../file-upload/FileUploader */ "./resources/js/react/file-upload/FileUploader.jsx");
/* harmony import */ var _ckeditor_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ckeditor/index */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_SubmitButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/SubmitButton */ "./resources/js/react/single-task/components/SubmitButton.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/Loader */ "./resources/js/react/single-task/components/Loader.jsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }















var MarkAsComplete = function MarkAsComplete(_ref) {
  var task = _ref.task,
    auth = _ref.auth;
  // form data
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_8__.useDispatch)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([""]),
    _useState2 = _slicedToArray(_useState, 2),
    links = _useState2[0],
    setLinks = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    linkErr = _useState4[0],
    setLinkErr = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    files = _useState6[0],
    setFiles = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    comment = _useState8[0],
    setComment = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    commentErr = _useState10[0],
    setCommentErr = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    _useState12 = _slicedToArray(_useState11, 2),
    showAlert = _useState12[0],
    setShowAlert = _useState12[1];
  var _useMarkAsCompleteMut = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__.useMarkAsCompleteMutation)(),
    _useMarkAsCompleteMut2 = _slicedToArray(_useMarkAsCompleteMut, 2),
    markAsComplete = _useMarkAsCompleteMut2[0],
    isSubmitting = _useMarkAsCompleteMut2[1].isLoading;
  var _useLazyCheckSubTaskS = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_5__.useLazyCheckSubTaskStateQuery)(),
    _useLazyCheckSubTaskS2 = _slicedToArray(_useLazyCheckSubTaskS, 2),
    checkSubTaskState = _useLazyCheckSubTaskS2[0],
    isFetching = _useLazyCheckSubTaskS2[1].isFetching;
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    markAsCompleteModaIsOpen = _useState14[0],
    setMarkAsCompleteModalIsOpen = _useState14[1];

  // toggle
  var toggle = function toggle() {
    if (auth.getRoleId() === 6) {
      checkSubTaskState(task === null || task === void 0 ? void 0 : task.id).unwrap().then(function (res) {
        if (res.status === 'true' || res.status === true) {
          var htmlContent = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
            className: "__tostar_modal",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("strong", {
              children: "You can't complete this task because you have some pending subtask?"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("ul", {
              className: "py-1",
              children: res.subtasks.map(function (el, idx) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("li", {
                  style: {
                    listStyle: 'unset',
                    fontSize: '13px'
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("a", {
                    href: "/accounts/tasks/".concat(el.id),
                    children: [idx + 1, ". ", el.heading]
                  }), " (", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("a", {
                    href: "/account/clients/".concat(el.clientId),
                    children: el.client_name
                  }), ")"]
                }, el.id);
              })
            })]
          });
          react_toastify__WEBPACK_IMPORTED_MODULE_11__.toast.warn(htmlContent, {
            position: 'top-center',
            icon: false
          });
        } else {
          setMarkAsCompleteModalIsOpen(!markAsCompleteModaIsOpen);
        }
      });
    } else {
      setMarkAsCompleteModalIsOpen(!markAsCompleteModaIsOpen);
    }
  };

  // close
  var close = function close() {
    setMarkAsCompleteModalIsOpen(false);
  };

  // handle editor change
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };

  // handle remove link
  var handleRemoveLink = function handleRemoveLink(e, index) {
    var _links = _toConsumableArray(links);
    _links.splice(index, 1);
    setLinks(_links);
  };

  // handle link change
  var handleOnLinkInputChange = function handleOnLinkInputChange(e, index) {
    var _links = _toConsumableArray(links);
    _links[index] = e.target.value, setLinks(_links);
  };

  // check validation
  var isValid = function isValid() {
    var valid = true;
    if (!lodash__WEBPACK_IMPORTED_MODULE_6___default().size(links) || links[0] === '') {
      setLinkErr('You must provide at least one link to your work');
      valid = false;
    }
    if (comment === '') {
      setCommentErr("Please describe what you've done !");
      valid = false;
    }
    return valid;
  };

  // handle submit 
  var handleSubmit = function handleSubmit(e) {
    var formData = new FormData();
    formData.append('text', comment);
    formData.append('user_id', auth === null || auth === void 0 ? void 0 : auth.getId());
    formData.append('task_id', task === null || task === void 0 ? void 0 : task.id);
    links.map(function (link) {
      return formData.append('link[]', link);
    });
    files === null || files === void 0 ? void 0 : files.map(function (file) {
      return formData.append('file[]', file);
    });
    formData.append('_token', document.querySelector("meta[name='csrf-token']").getAttribute("content"));
    if (isValid()) {
      markAsComplete(formData).unwrap().then(function (res) {
        var Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        Toast.fire({
          icon: 'success',
          title: 'Task submitted successfully'
        });
        close();
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
      variant: "tertiary",
      onClick: toggle,
      className: "d-flex align-items-center btn-outline-dark text-dark",
      children: [isFetching ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_Loader__WEBPACK_IMPORTED_MODULE_10__["default"], {
        title: "Processing..."
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("i", {
        className: "fa-solid fa-check"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("span", {
        className: "d-inline ml-1",
        children: [" ", isFetching ? '' : "Mark As Complete"]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isOpen: markAsCompleteModaIsOpen,
      className: "sp1_mark-as--modal",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
        className: "sp1_single_task--modal-panerl-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
          className: "sp1_mark-as--modal-panel",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
            className: "sp1_mark-as--modal-heading",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("h6", {
              className: "mb-0",
              children: "Submit Task"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
              "aria-label": "closeModal",
              onClick: close,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("i", {
                className: "fa-solid fa-xmark"
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
            className: "sp1_mark-as--modal-body px-3",
            style: {
              overflow: 'unset'
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("form", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                className: "form-group",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("label", {
                  htmlFor: "exampleFormControlInput1",
                  children: ["Submit Links What You've Done", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("sup", {
                    children: "*"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
                    className: "ml-2",
                    "data-toggle": "tooltip",
                    "data-placement": "top",
                    title: "Submit Links What You've Done",
                    "data-boundary": "window",
                    style: {
                      cursor: "pointer"
                    },
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("i", {
                      className: "fa-regular fa-circle-question"
                    })
                  })]
                }), links === null || links === void 0 ? void 0 : links.map(function (link, i) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                    className: "mark-as-compeleted-link mb-2",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("input", {
                      type: "text",
                      className: "form-control py-2",
                      id: "exampleFormControlInput1",
                      placeholder: "--",
                      value: link,
                      onChange: function onChange(e) {
                        return handleOnLinkInputChange(e, i);
                      }
                    }), (links === null || links === void 0 ? void 0 : links.length) > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("button", {
                      onClick: function onClick(e) {
                        return handleRemoveLink(e, i);
                      },
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("i", {
                        className: "fa-regular fa-trash-can"
                      })
                    })]
                  }, i);
                }), linkErr && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("small", {
                  id: "emailHelp",
                  "class": "form-text text-danger",
                  children: linkErr
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("button", {
                  className: "mt-2 d-flex align-items-center bg-transparent",
                  style: {
                    gap: "10px"
                  },
                  onClick: function onClick(e) {
                    e.preventDefault();
                    setLinks(function (prev) {
                      return [].concat(_toConsumableArray(prev), [""]);
                    });
                  },
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("i", {
                    className: "fa-solid fa-circle-plus"
                  }), "Add Another Link"]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                className: "form-group",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("label", {
                  htmlFor: "exampleFormControlInput1",
                  children: ["Attachments", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
                    className: "ml-2",
                    "data-toggle": "tooltip",
                    "data-placement": "top",
                    title: "Attachment",
                    "data-boundary": "window",
                    style: {
                      cursor: "pointer"
                    },
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("i", {
                      className: "fa-regular fa-circle-question"
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_3__["default"], {
                  files: files,
                  setFiles: setFiles,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_3__["default"].Input, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_3__["default"].SelectedFiles, {
                    children: function children(_ref2) {
                      var _Array$from;
                      var previews = _ref2.previews,
                        onDelete = _ref2.onDelete;
                      return (_Array$from = Array.from(previews)) === null || _Array$from === void 0 ? void 0 : _Array$from.map(function (p, i) {
                        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_3__["default"].Preview, {
                          id: i,
                          fileName: p.name,
                          previewUrl: p.preview,
                          fileType: p.type,
                          onRemove: onDelete
                        }, i);
                      });
                    }
                  })]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                className: "form-group",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("label", {
                  htmlFor: "exampleFormControlInput1",
                  style: {
                    maxWidth: '95%'
                  },
                  children: ["Mention clearly if anything asked in the instruction couldn't be done or if there is anything else your reporting boss should know while approving or rejecting this task", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("sup", {
                    children: "*"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("span", {
                    className: "ml-2",
                    "data-toggle": "tooltip",
                    "data-placement": "top",
                    title: "Describe What You've Done",
                    "data-boundary": "window",
                    style: {
                      cursor: "pointer"
                    },
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("i", {
                      className: "fa-regular fa-circle-question"
                    })
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div", {
                  className: "ck-editor-holder stop-timer-options",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_ckeditor_index__WEBPACK_IMPORTED_MODULE_4__["default"], {
                    onChange: handleEditorChange
                  })
                }), commentErr && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("small", {
                  id: "emailHelp",
                  "class": "form-text text-danger",
                  children: commentErr
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
                className: "mt-3 d-flex align-items-center",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                  variant: "tertiary",
                  className: "ml-auto mr-2",
                  onClick: close,
                  children: "Close"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_components_SubmitButton__WEBPACK_IMPORTED_MODULE_7__["default"], {
                  onClick: handleSubmit,
                  isLoading: isSubmitting,
                  title: "Submit"
                })]
              })]
            })
          })]
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MarkAsComplete);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/Revision/AssigneeRevisionToDev.jsx":
/*!************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/Revision/AssigneeRevisionToDev.jsx ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/listbox/listbox.js");
/* harmony import */ var react_icons_hi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-icons/hi */ "./node_modules/react-icons/hi/index.esm.js");
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_SubmitButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/SubmitButton */ "./resources/js/react/single-task/components/SubmitButton.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var options = [{
  id: 'LDRx10',
  revision: "I overlooked a few things while checking",
  isDeniable: true
}, {
  id: 'LDRx11',
  revision: "I couldn't understand a few things in the instruction",
  isDeniable: false
}];
var AssigneeRevisionToDev = function AssigneeRevisionToDev(_ref) {
  var _task$taskSubTask;
  var task = _ref.task,
    onBack = _ref.onBack,
    onSubmit = _ref.onSubmit,
    revision = _ref.revision,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? false : _ref$type,
    _ref$isSubmitting = _ref.isSubmitting,
    isSubmitting = _ref$isSubmitting === void 0 ? false : _ref$isSubmitting;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    reason = _useState2[0],
    setReason = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    reasonError = _useState4[0],
    setReasonError = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    comments = _useState6[0],
    setComments = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    commentError = _useState8[0],
    setCommentError = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    subtasks = _useState10[0],
    setSubtasks = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState12 = _slicedToArray(_useState11, 2),
    subtaskError = _useState12[0],
    setSubtaskError = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    isDeniable = _useState14[0],
    setIsDeniable = _useState14[1];

  // radio button change
  var handleChange = function handleChange(value) {
    setReason(value);
  };

  // editor change text
  var hanldeEditorTextChange = function hanldeEditorTextChange(e, editor, id) {
    var data = editor.getData();
    var _comments = _toConsumableArray(comments);
    var index = _comments === null || _comments === void 0 ? void 0 : _comments.findIndex(function (d) {
      return d.subtask_id === id;
    });
    if (index === -1) {
      var _reason$id;
      _comments.push({
        id: id,
        subtask_id: id,
        comment: data,
        acknowledgement_id: (_reason$id = reason === null || reason === void 0 ? void 0 : reason.id) !== null && _reason$id !== void 0 ? _reason$id : ''
      });
    } else {
      var _reason$id2;
      _comments[index] = {
        id: id,
        subtask_id: id,
        comment: data,
        acknowledgement_id: (_reason$id2 = reason === null || reason === void 0 ? void 0 : reason.id) !== null && _reason$id2 !== void 0 ? _reason$id2 : ''
      };
    }
    setComments(_toConsumableArray(_comments));
  };

  // validation
  var validate = function validate() {
    var errorCount = 0;
    if (reason === null && revision !== null && revision !== void 0 && revision.is_deniable && type) {
      errorCount++;
      setReasonError("You have to select a reason from below options");
    }
    if (lodash__WEBPACK_IMPORTED_MODULE_4___default().size(task === null || task === void 0 ? void 0 : task.subtask) > 0) {
      if (subtasks.length === 0) {
        errorCount++;
        setSubtaskError('You need to selecd at least one sub task to continue.');
      }
      if (comments.length === 0 || comments.length !== subtasks.length) {
        errorCount++;
        setCommentError(true);
      }
      comments === null || comments === void 0 ? void 0 : comments.map(function (comment) {
        if ((comment === null || comment === void 0 ? void 0 : comment.comment) === '') {
          errorCount++;
          setCommentError(true);
        }
      });
    }
    return errorCount === 0 ? true : false;
  };

  // handle submiton
  var handleSubmition = function handleSubmition(e) {
    var _reason$isDeniable;
    e.preventDefault();
    var data = {
      task_id: task === null || task === void 0 ? void 0 : task.id,
      reason: reason === null || reason === void 0 ? void 0 : reason.revision,
      comments: comments,
      is_deniable: (_reason$isDeniable = reason === null || reason === void 0 ? void 0 : reason.isDeniable) !== null && _reason$isDeniable !== void 0 ? _reason$isDeniable : false
    };
    if (validate()) {
      onSubmit(data);
    }
  };
  var onBackButtonClick = function onBackButtonClick(e) {
    e.preventDefault();
    onBack();
  };
  console.log({
    revision: revision,
    type: type
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("form", {
      action: "",
      children: [(revision === null || revision === void 0 ? void 0 : revision.is_deniable) !== 0 && type ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: ["Revision Acknowledgement", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("sup", {
            className: "f-16",
            children: "*"
          }), " :"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "px-3",
          children: lodash__WEBPACK_IMPORTED_MODULE_4___default().map(options, function (revision) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "form-check d-flex align-items-start mb-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
                className: "form-check-input mr-2",
                type: "radio",
                name: "exampleRadios",
                id: revision.id,
                required: true,
                onChange: function onChange() {
                  return handleChange(revision);
                },
                value: revision.revision,
                style: {
                  width: "16px",
                  height: "16px",
                  marginTop: "3px"
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
                className: "form-check-label",
                htmlFor: revision.id,
                style: {
                  marginBottom: "3px"
                },
                children: revision.revision
              })]
            }, revision.id);
          })
        }), reasonError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("small", {
          id: "emailHelp",
          className: "form-text text-danger",
          children: reasonError
        })]
      }) : null, (task === null || task === void 0 ? void 0 : (_task$taskSubTask = task.taskSubTask) === null || _task$taskSubTask === void 0 ? void 0 : _task$taskSubTask.length) > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: ["Select SubTask", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("sup", {
            className: "font-weight-bold f-16",
            children: "*"
          }), " :"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(SubtaskSelectionMenu, {
          task: task,
          subTasks: subtasks,
          setSubtasks: setSubtasks
        })]
      }), (subtasks === null || subtasks === void 0 ? void 0 : subtasks.length) > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: "Comment:"
        }), subtasks.map(function (s, i) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "form-group",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("label", {
                htmlFor: "",
                className: "font-weight-bold",
                children: [i + 1, ". Task: ", s === null || s === void 0 ? void 0 : s.title]
              }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("label", {
                className: "font-weight-bold",
                children: ["Write Your Revision", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("sup", {
                  className: "font-weight-bold f-16",
                  children: "*"
                }), ": "]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "ck-editor-holder",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_2__["default"], {
                  onChange: function onChange(e, editor) {
                    return hanldeEditorTextChange(e, editor, s === null || s === void 0 ? void 0 : s.subtask_id);
                  }
                })
              }), commentError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("small", {
                id: "emailHelp",
                className: "form-text text-danger",
                children: "You have to explain the revision in details, so that Developer can understand where they need to work."
              })]
            })
          }, s.subtask_id);
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "mt-3 mb-3 d-flex align-items-center",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(NextAndContinueButton, {
          onClick: handleSubmition,
          isLoading: isSubmitting
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssigneeRevisionToDev);
var NextAndContinueButton = function NextAndContinueButton(_ref2) {
  var onClick = _ref2.onClick,
    isLoading = _ref2.isLoading;
  if (!isLoading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: "ml-auto",
      onClick: onClick,
      children: " Continue"
    });
  } else {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: "cursor-processing ml-auto",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "spinner-border text-white mr-2",
        role: "status",
        style: {
          width: "18px",
          height: "18px"
        }
      }), "Processing..."]
    });
  }
};

// sub task selection menu
var SubtaskSelectionMenu = function SubtaskSelectionMenu(_ref3) {
  var _task$taskSubTask2, _task$taskSubTask3;
  var task = _ref3.task,
    subTasks = _ref3.subTasks,
    setSubtasks = _ref3.setSubtasks;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    className: "position-relative",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Listbox, {
      value: subTasks,
      onChange: setSubtasks,
      multiple: true,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Listbox.Button, {
        className: "position-relative w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
          className: "w-100 mr-auto text-left d-flex flex-wrap align-items-center",
          style: {
            gap: '6px'
          },
          children: (subTasks === null || subTasks === void 0 ? void 0 : subTasks.length) > 0 ? subTasks.map(function (s) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
              className: "badge badge-light",
              style: {
                fontSize: '13px'
              },
              children: [" ", s === null || s === void 0 ? void 0 : s.title, " "]
            }, s.subtask_id);
          }) : "Select Subtasks"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react_icons_hi__WEBPACK_IMPORTED_MODULE_7__.HiOutlineSelector, {})]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Listbox.Options, {
        className: "position-absolute bg-white p-2 shadow w-100",
        style: {
          zIndex: 10,
          maxHeight: "350px",
          overflowY: "auto"
        },
        children: (task === null || task === void 0 ? void 0 : (_task$taskSubTask2 = task.taskSubTask) === null || _task$taskSubTask2 === void 0 ? void 0 : _task$taskSubTask2.length) > 0 ? task === null || task === void 0 ? void 0 : (_task$taskSubTask3 = task.taskSubTask) === null || _task$taskSubTask3 === void 0 ? void 0 : _task$taskSubTask3.map(function (s) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_6__.Listbox.Option, {
            value: s,
            tabIndex: -1,
            className: function className(_ref4) {
              var active = _ref4.active;
              return active ? "task-selection-list-option active" : "task-selection-list-option";
            },
            children: function children(_ref5) {
              var selected = _ref5.selected;
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                  children: s.title
                }), selected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
                    className: "fa-solid fa-check"
                  })
                })]
              });
            }
          }, s.subtask_id);
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          children: "No Data Found"
        })
      })]
    })
  });
};

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/Revision/AssigneeToLeadFromClientRevision.jsx":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/Revision/AssigneeToLeadFromClientRevision.jsx ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _components_SubmitButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/SubmitButton */ "./resources/js/react/single-task/components/SubmitButton.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var projectManagerAcknowladgement = [{
  id: "CPRx01",
  title: 'Client added some additional requirements which was not part of the actual job scope',
  isDeniable: false
}, {
  id: 'PLRx12',
  title: 'I submitted the work without proper checking and overlooked the issues',
  isDeniable: true
}, {
  id: 'PLRx03',
  title: 'I couldnt understand clients expectation properly earlier',
  isDeniable: false
}, {
  id: 'PLRx04',
  title: 'I didnt understand the job properly as it’s very technical in nature and relied fully on technical team for success',
  isDeniable: false
}, {
  id: 'CPRx05',
  title: "The client didnt change his instruction but his interpretation of the original instruction now is weird and nobody could have interpreted it this way from his instruction",
  isDeniable: false,
  createDispute: true
}, {
  id: 'CPRx06',
  title: "The client is asking for some minor changes which he couldn’t specify until he saw the completed work and we can’t charge him for these",
  isDeniable: false
}, {
  id: 'SPRx01',
  title: "Sales person discussed something in a verbal meeting with the client and then forgot to document it when assigning",
  isDeniable: false,
  createDispute: false
}, {
  id: 'SPRx02',
  title: "Sales person couldn't define requirement properly and I also failed to define it after I took over",
  isDeniable: false,
  createDispute: false
}, {
  id: 'SPRx03',
  title: "Sales overpromised: This task is not doable to this extent or in this way and I informed management about it on day 1",
  isDeniable: false,
  createDispute: false
}];
var AssigneeToLeadFromClientRevision = function AssigneeToLeadFromClientRevision(_ref) {
  var close = _ref.close,
    onBack = _ref.onBack,
    onSubmit = _ref.onSubmit,
    task = _ref.task,
    auth = _ref.auth,
    isSubmitting = _ref.isSubmitting;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    reason = _useState2[0],
    setReason = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    reasonError = _useState4[0],
    setReasonError = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    comment = _useState6[0],
    setComment = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    commentError = _useState8[0],
    setCommentError = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    additionalPaid = _useState10[0],
    setAdditionalPaid = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState12 = _slicedToArray(_useState11, 2),
    additionalInfo = _useState12[0],
    setAdditionalInfo = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState14 = _slicedToArray(_useState13, 2),
    additionalAmount = _useState14[0],
    setAdditionalAmount = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState16 = _slicedToArray(_useState15, 2),
    additionalError = _useState16[0],
    setAdditionalError = _useState16[1];

  // radio button change
  var handleChange = function handleChange(e, reason) {
    setReason(reason);
    setAdditionalAmount(0);
    setAdditionalPaid('');
    setAdditionalInfo(null);
  };

  // on blur 
  var handleBlurEvent = function handleBlurEvent() {
    Swal.fire({
      title: 'Do you want to create a milestone?',
      // showDenyButton: true, 
      confirmButtonText: 'Yes'
      // denyButtonText: `No`,
    }).then(function (res) {
      if (res.isConfirmed) {
        window.open("/account/projects/".concat(task === null || task === void 0 ? void 0 : task.projectId, "?tab=milestones"), '_blank');
      }
    });
  };

  // additional payment 
  var hasAdditionalPayment = function hasAdditionalPayment(isPay) {
    setAdditionalPaid(function () {
      return isPay ? 'yes' : 'no';
    });
  };

  // editor change text 
  var hanldeEditorTextChange = function hanldeEditorTextChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };

  // validation
  var validate = function validate() {
    var errorCount = 0;
    if (comment === "") {
      errorCount++;
      setCommentError('You have to explain the revision in details, so that lead developer can understand where they need to work.');
    }
    if (!reason) {
      errorCount++;
      setReasonError('You have to select a reason from above options');
    }
    if (reason && (reason === null || reason === void 0 ? void 0 : reason.id) === 'CPRx01') {
      if (additionalPaid === 'yes' && additionalAmount === 0) {
        errorCount++;
        setAdditionalError('You have to provide amount');
      }
      if (additionalPaid === 'no' && !additionalInfo) {
        errorCount++;
        setAdditionalError('You have to select an option');
      }
    }
    return errorCount === 0;
  };

  // handle submiton
  var handleSubmition = function handleSubmition(e) {
    var _additionalInfo$info;
    e.preventDefault();
    var data = {
      acknowledgement_id: reason === null || reason === void 0 ? void 0 : reason.id,
      task_id: task === null || task === void 0 ? void 0 : task.id,
      user_id: auth === null || auth === void 0 ? void 0 : auth.id,
      is_deniable: reason === null || reason === void 0 ? void 0 : reason.isDeniable,
      revision_acknowledgement: reason === null || reason === void 0 ? void 0 : reason.title,
      comment: comment,
      additional_amount: Number(additionalAmount),
      additional_status: additionalPaid,
      additional_comment: (_additionalInfo$info = additionalInfo === null || additionalInfo === void 0 ? void 0 : additionalInfo.info) !== null && _additionalInfo$info !== void 0 ? _additionalInfo$info : '',
      dispute_create: (reason === null || reason === void 0 ? void 0 : reason.createDispute) || (additionalInfo === null || additionalInfo === void 0 ? void 0 : additionalInfo.disputeCreate) || false
    };
    if (validate()) {
      onSubmit(data);
    } else {
      console.log('Your forgot to fillup some requried fields');
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("form", {
      className: "px-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: ["Select Reason for Revision", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("sup", {
            className: "f-16",
            children: "*"
          }), " :"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "px-3",
          children: _.map(projectManagerAcknowladgement, function (option) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
              className: "form-check d-flex align-items-start mb-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
                className: "form-check-input mr-2",
                type: "radio",
                name: "exampleRadios",
                id: option.id,
                required: true,
                onChange: function onChange(e) {
                  return handleChange(e, option);
                },
                value: option.title,
                style: {
                  width: "16px",
                  height: "16px",
                  marginTop: "3px"
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
                className: "form-check-label",
                htmlFor: option.id,
                style: {
                  marginBottom: "3px"
                },
                children: option.title
              })]
            }, option.id);
          })
        }), reasonError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("small", {
          id: "emailHelp",
          className: "form-text text-danger",
          children: reasonError
        })]
      }), (reason === null || reason === void 0 ? void 0 : reason.id) === 'CPRx01' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
          htmlFor: "",
          className: "d-block font-weight-bold",
          children: ["Is the client paying additionally for these changes? ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("sup", {
            children: "*"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "d-block",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            className: "form-check form-check-inline",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
              className: "form-check-input",
              name: "milestone",
              type: "radio",
              id: "createMilestoneYes",
              value: "1",
              onChange: function onChange(e) {
                return hasAdditionalPayment(true);
              },
              style: {
                width: "16px",
                height: "16px",
                marginTop: "3px"
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
              htmlFor: "createMilestoneYes",
              className: "form-check-label",
              children: "Yes"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            className: "form-check form-check-inline",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
              className: "form-check-input",
              name: "milestone",
              type: "radio",
              id: "createMilestoneNo",
              value: "0",
              onChange: function onChange(e) {
                return hasAdditionalPayment(false);
              },
              style: {
                width: "16px",
                height: "16px",
                marginTop: "3px"
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
              htmlFor: "createMilestoneNo",
              className: "form-check-label",
              children: "No"
            })]
          })]
        })]
      }), additionalPaid === 'yes' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
          htmlFor: "",
          className: "d-block font-weight-bold",
          children: ["Amount? ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("sup", {
            children: "*"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "input-group",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
            className: "input-group-prepend",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
              className: "input-group-text",
              children: "$"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
            type: "number",
            onChange: function onChange(e) {
              return setAdditionalAmount(e.target.value);
            },
            className: "form-control",
            id: "inlineFormInputGroup",
            placeholder: "300",
            onBlur: handleBlurEvent
          })]
        })]
      }), additionalPaid === 'no' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
          htmlFor: "",
          className: "d-block font-weight-bold",
          children: ["Is the client paying additionally for these changes? ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("sup", {
            children: "*"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "d-block",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            className: "form-check mb-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
              name: "additionalInformation",
              className: "form-check-input",
              type: "radio",
              id: "additionalInformation1",
              onChange: function onChange(e) {
                return setAdditionalInfo({
                  info: e.target.value,
                  disputeCreate: false
                });
              },
              value: "Client changed his/her mind and he/she don't want to pay additional payment. We have to continue the task for client satisfaction",
              style: {
                width: "16px",
                height: "16px",
                marginTop: "3px"
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
              htmlFor: "additionalInformation1",
              className: "form-check-label",
              children: "Client changed his/her mind and he/she don't want to pay additional payment. We have to continue the task for client satisfaction"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            className: "form-check",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
              className: "form-check-input",
              name: "additionalInformation",
              type: "radio",
              id: "additionalInformation2",
              value: "The client is interpreting his original instruction in a very unusual way!",
              onChange: function onChange(e) {
                return setAdditionalInfo({
                  info: e.target.value,
                  disputeCreate: true
                });
              },
              style: {
                width: "16px",
                height: "16px",
                marginTop: "3px"
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("label", {
              htmlFor: "additionalInformation2",
              className: "form-check-label",
              children: "The client is interpreting his original instruction in a very unusual way!"
            })]
          })]
        })]
      }), additionalError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "mb-3",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("small", {
          id: "emailHelp",
          className: "form-text text-danger",
          children: additionalError
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: ["Explain or Comment", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("sup", {
            className: "f-16",
            children: "*"
          }), " :"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "ck-editor-holder",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
            onChange: hanldeEditorTextChange
          })
        }), commentError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("small", {
          id: "emailHelp",
          className: "form-text text-danger",
          children: commentError
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onClick: onBack,
            variant: "tertiary",
            className: "ml-auto mr-2",
            children: "Back"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_SubmitButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
            title: "Submit",
            onClick: handleSubmition,
            isLoading: isSubmitting
          })]
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssigneeToLeadFromClientRevision);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/Revision/ClientRevision.jsx":
/*!*****************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/Revision/ClientRevision.jsx ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _ClientRevisionForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ClientRevisionForm */ "./resources/js/react/single-task/section/task-actions/Revision/ClientRevisionForm.jsx");
/* harmony import */ var _AssigneeToLeadFromClientRevision__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AssigneeToLeadFromClientRevision */ "./resources/js/react/single-task/section/task-actions/Revision/AssigneeToLeadFromClientRevision.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var ClientRevision = function ClientRevision(_ref) {
  var task = _ref.task,
    auth = _ref.auth;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    revisionModal = _useState2[0],
    setRevisionModal = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('ASSINEE_TO_DEV'),
    _useState4 = _slicedToArray(_useState3, 2),
    show = _useState4[0],
    setShow = _useState4[1];
  var singleTask = task;

  // client revision data
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    clientComment = _useState6[0],
    setClientComment = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    clientAcknowledgement = _useState8[0],
    setClientAcknowladgement = _useState8[1];
  var _useStoreClientRevisi = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_6__.useStoreClientRevisionTaskMutation)(),
    _useStoreClientRevisi2 = _slicedToArray(_useStoreClientRevisi, 2),
    storeClientRevisionTask = _useStoreClientRevisi2[0],
    isLoading = _useStoreClientRevisi2[1].isLoading;
  var handleSubmit = function handleSubmit(data) {
    setClientAcknowladgement(data === null || data === void 0 ? void 0 : data.reason);
    setClientComment(data === null || data === void 0 ? void 0 : data.comment);
    setShow('ASSINEE_TO_DEV');
  };
  var close = function close() {
    setRevisionModal(false);
  };
  var handleSubmitToStore = function handleSubmitToStore(data) {
    var fData = _objectSpread(_objectSpread({}, data), {}, {
      project_id: task === null || task === void 0 ? void 0 : task.projectId
    });

    // show toster notification
    var showToster = function showToster() {
      var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      Toast.fire({
        icon: 'success',
        title: 'Task submitted for Revision successfully'
      });
    };
    storeClientRevisionTask(fData).unwrap().then(function (res) {
      return showToster();
    })["catch"](function (err) {
      return console.log(err);
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      variant: "tertiary",
      onClick: function onClick() {
        return setRevisionModal(true);
      },
      className: "d-flex align-items-center sp1-st-revision-btn sp1-st-revision-btn",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
        className: "fa-solid fa-plus-minus"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
        className: "d-inline ml-1",
        children: "Client Has Revision"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isOpen: revisionModal,
      className: "sp1_single_task--modal",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "sp1_single_task--modal-panerl-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "sp1_single_task--modal-panel w-100 pb-3",
          style: {
            maxWidth: "550px"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            className: "border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
              className: "font-weight-bold f-14",
              children: ["Task#", task === null || task === void 0 ? void 0 : task.id, " - Client Revision"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onClick: close,
              className: "",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
                className: "fa-solid fa-xmark"
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_AssigneeToLeadFromClientRevision__WEBPACK_IMPORTED_MODULE_5__["default"], {
            task: task,
            auth: auth,
            isSubmitting: isLoading,
            onSubmit: handleSubmitToStore,
            close: function close() {
              return setRevisionModal(false);
            },
            onBack: function onBack() {
              return setShow('CLIENT_REVISION');
            }
          })]
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClientRevision);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/Revision/ClientRevisionForm.jsx":
/*!*********************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/Revision/ClientRevisionForm.jsx ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_SubmitButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/SubmitButton */ "./resources/js/react/single-task/components/SubmitButton.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var ClientRevisionForm = function ClientRevisionForm(_ref) {
  var isOpen = _ref.isOpen,
    close = _ref.close,
    onSubmitForm = _ref.onSubmitForm,
    _ref$isSubmitting = _ref.isSubmitting,
    isSubmitting = _ref$isSubmitting === void 0 ? false : _ref$isSubmitting,
    task = _ref.task;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    reason = _useState2[0],
    setReason = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    reasonError = _useState4[0],
    setReasonError = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    comment = _useState6[0],
    setComment = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    commentError = _useState8[0],
    setCommentError = _useState8[1];

  // radio button change
  var handleChange = function handleChange(e) {
    setReason(e.target.value);
  };

  // editor change text 
  var hanldeEditorTextChange = function hanldeEditorTextChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };

  // validation
  var validate = function validate() {
    var errorCount = 0;
    if (comment === "") {
      console.log("open");
      errorCount++;
      setCommentError('You have to explain the revision in details, so that lead developer/developer can understand where they need to work.');
    }
    if (reason === '') {
      console.log('first');
      errorCount++;
      setReasonError('You have to select a reason from below options');
    }
    return errorCount === 0;
  };

  // handle submiton
  var handleSubmition = function handleSubmition(e) {
    e.preventDefault();
    var data = {
      task_id: task === null || task === void 0 ? void 0 : task.id,
      reason: reason,
      comment: comment
    };
    if (validate()) {
      onSubmitForm(data);
    } else {
      console.log('Your forgot to fillup some requried fields');
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("form", {
      className: "px-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: ["Select Reason for Revision", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
            className: "f-16",
            children: "*"
          }), " :"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "px-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "form-check d-flex align-items-start mb-2",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
              className: "form-check-input mr-2",
              type: "radio",
              name: "exampleRadios",
              id: "exampleRadios1",
              required: true,
              onChange: handleChange,
              value: "Client's Requirements Are Not Fulfilled As Per Instruction",
              style: {
                width: "16px",
                height: "16px",
                marginTop: "3px"
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              className: "form-check-label",
              htmlFor: "exampleRadios1",
              style: {
                marginBottom: "3px"
              },
              children: "Client's Requirements Are Not Fulfilled As Per Instruction"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "form-check d-flex align-items-start mb-2",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
              className: "form-check-input mr-2",
              type: "radio",
              name: "exampleRadios",
              id: "exampleRadios2",
              required: true,
              onChange: handleChange,
              value: "Client Has Changed Previous Requirements Instructions",
              style: {
                width: "16px",
                height: "16px",
                marginTop: "3px"
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              className: "form-check-label",
              htmlFor: "exampleRadios2",
              style: {
                marginBottom: "3px"
              },
              children: "Client Has Changed Previous Requirements Instructions"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "form-check d-flex align-items-start mb-2",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
              className: "form-check-input mr-2",
              type: "radio",
              name: "exampleRadios",
              id: "exampleRadios3",
              required: true,
              onChange: handleChange,
              value: "Client Has Added Some Additional Requirements Instructions",
              style: {
                width: "16px",
                height: "16px",
                marginTop: "3px"
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              className: "form-check-label mb-1",
              htmlFor: "exampleRadios3",
              style: {
                marginBottom: "3px"
              },
              children: "Client Has Added Some Additional Requirements Instructions"
            })]
          })]
        }), reasonError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("small", {
          id: "emailHelp",
          className: "form-text text-danger",
          children: reasonError
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: ["Enter exactly what client said about this revision", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
            className: "f-16",
            children: "*"
          }), " :"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "ck-editor-holder",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
            onChange: hanldeEditorTextChange
          })
        }), commentError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("small", {
          id: "emailHelp",
          className: "form-text text-danger",
          children: commentError
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onClick: close,
            variant: "tertiary",
            className: "ml-auto mr-2",
            children: "Close"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_SubmitButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
            onClick: handleSubmition,
            isLoading: isSubmitting,
            title: "Accept & Continue"
          })]
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClientRevisionForm);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/Revision/DenyAndContinue.jsx":
/*!******************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/Revision/DenyAndContinue.jsx ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_SubmitButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/SubmitButton */ "./resources/js/react/single-task/components/SubmitButton.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var denyOptions = function denyOptions(type) {
  switch (type) {
    case 'lead_dev':
      return [{
        id: 'deny1',
        title: 'The project manager added new things in the instruction which was not part of the original instruction'
      }, {
        id: 'deny2',
        title: 'The way the project manager is interpreting his original instruction now was not possible to understand from what his writing'
      }];
    case 'dev':
      return [{
        id: 'deny1',
        title: 'The lead developer added new things in the instruction which was not part of the original instruction'
      }, {
        id: 'deny2',
        title: 'The way the lead developer is interpreting his original instruction now was not possible to understand from what his writing'
      }];
    default:
      [];
  }
};
var DenyAndContinue = function DenyAndContinue(_ref) {
  var _window, _window$Laravel;
  var onSubmit = _ref.onSubmit,
    isSubmitting = _ref.isSubmitting,
    onBack = _ref.onBack,
    task = _ref.task;
  var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_4__.User((_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    reason = _useState2[0],
    setReason = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    reasonError = _useState4[0],
    setReasonError = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    comment = _useState6[0],
    setComment = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    commentError = _useState8[0],
    setCommentError = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    err = _useState10[0],
    setErr = _useState10[1];
  var handleEditorDataChange = function handleEditorDataChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };

  // radio button change
  var handleChange = function handleChange(e) {
    setReason(e.target.value);
  };

  // validation
  var validate = function validate() {
    var errorCount = 0;
    if (comment === "") {
      errorCount++;
      setCommentError('You have to explain the revision in details, so that lead developer/developer can understand where they need to work.');
    }
    if (reason === '') {
      errorCount++;
      setReasonError('You have to select a reason from above options');
    }
    return errorCount === 0;
  };
  var handleOnSubmit = function handleOnSubmit(e) {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        comment: comment,
        denyReason: reason
      });
    } else {
      setErr("You have to Explain Why Did You Deny!");
    }
  };
  var options = (auth === null || auth === void 0 ? void 0 : auth.getRoleId()) === 6 ? denyOptions('lead_dev') : denyOptions('dev');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("form", {
      action: "",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: ["Select reason for deny", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("sup", {
            className: "f-16",
            children: "*"
          }), " :"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "px-3",
          children: options.map(function (option) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "form-check d-flex align-items-start mb-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
                className: "form-check-input mr-2",
                type: "radio",
                name: "exampleRadios",
                id: option.id,
                required: true,
                onChange: handleChange,
                value: option.title,
                style: {
                  width: "16px",
                  height: "16px",
                  marginTop: "3px"
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
                className: "form-check-label",
                htmlFor: option.id,
                style: {
                  marginBottom: "3px"
                },
                children: option.title
              })]
            }, option.id);
          })
        }), reasonError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("small", {
          id: "emailHelp",
          className: "form-text text-danger",
          children: reasonError
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: ["Please Explain Why Did You Deny? ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("sup", {
            className: "f-16 text-red",
            children: "*"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "ck-editor-holder",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onChange: handleEditorDataChange
          })
        }), commentError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("small", {
          id: "emailHelp",
          className: "form-text text-danger",
          children: commentError
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "mt-3 d-flex align-items-center",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          onClick: onBack,
          variant: "tertiary",
          className: "ml-auto mr-2",
          children: "Back"
        }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: _.includes([4, 6], auth === null || auth === void 0 ? void 0 : auth.getRoleId()) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onClick: handleOnSubmit,
              children: "Next"
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_SubmitButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
              title: "Submit",
              isLoading: isSubmitting,
              onClick: handleOnSubmit
            })
          })
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
            className: "cursor-processing",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "spinner-border text-white",
              role: "status",
              style: {
                width: "18px",
                height: "18px"
              }
            }), " ", "Processing..."]
          })
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DenyAndContinue);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/Revision/DeveloperRevisionView.jsx":
/*!************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/Revision/DeveloperRevisionView.jsx ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _RevisionVeiw__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RevisionVeiw */ "./resources/js/react/single-task/section/task-actions/Revision/RevisionVeiw.jsx");
/* harmony import */ var _RevisionAcceptAndContinue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RevisionAcceptAndContinue */ "./resources/js/react/single-task/section/task-actions/Revision/RevisionAcceptAndContinue.jsx");
/* harmony import */ var _AssigneeRevisionToDev__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AssigneeRevisionToDev */ "./resources/js/react/single-task/section/task-actions/Revision/AssigneeRevisionToDev.jsx");
/* harmony import */ var _DenyAndContinue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DenyAndContinue */ "./resources/js/react/single-task/section/task-actions/Revision/DenyAndContinue.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var DeveloperRevisionView = function DeveloperRevisionView(_ref) {
  var _window, _window$Laravel;
  var task = _ref.task,
    close = _ref.close;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("REVISION"),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    accept = _useState4[0],
    setAccept = _useState4[1];
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_7__.useDispatch)();
  var _useGetRevisionDetail = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_6__.useGetRevisionDetailsQuery)(task === null || task === void 0 ? void 0 : task.id),
    revision = _useGetRevisionDetail.data,
    isFetchingRevision = _useGetRevisionDetail.isFetching;
  var _useRevisionAcceptOrD = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_6__.useRevisionAcceptOrDenyMutation)(),
    _useRevisionAcceptOrD2 = _slicedToArray(_useRevisionAcceptOrD, 2),
    revisionAcceptOrDeny = _useRevisionAcceptOrD2[0],
    isLoadingRevisionReview = _useRevisionAcceptOrD2[1].isLoading;
  var auth = (_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user;

  // handle Accept and continue submition
  var hanldeAcceptAndContinueSubmition = function hanldeAcceptAndContinueSubmition(data, type) {
    var _data$comment, _data$denyReason;
    var _data = {
      comment: (_data$comment = data === null || data === void 0 ? void 0 : data.comment) !== null && _data$comment !== void 0 ? _data$comment : '',
      deny_reason: (_data$denyReason = data === null || data === void 0 ? void 0 : data.denyReason) !== null && _data$denyReason !== void 0 ? _data$denyReason : '',
      task_id: task === null || task === void 0 ? void 0 : task.id,
      user_id: auth === null || auth === void 0 ? void 0 : auth.id,
      revision_id: revision === null || revision === void 0 ? void 0 : revision.id,
      mode: data !== null && data !== void 0 && data["continue"] ? 'continue' : accept
    };
    revisionAcceptOrDeny(_data).unwrap().then(function (res) {
      if (_.includes([4, 6], Number(auth === null || auth === void 0 ? void 0 : auth.role_id))) {
        setShow(type);
      } else {
        dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_8__.setTaskStatus)(res === null || res === void 0 ? void 0 : res.task_status));
        close();
      }
    })["catch"](function (err) {
      return console.log(err);
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      className: "sp1_single_task--modal-panel",
      style: {
        maxWidth: "550px"
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "font-weight-bold f-16",
          children: ["Task#", task === null || task === void 0 ? void 0 : task.id, ": ", " ", Number(auth === null || auth === void 0 ? void 0 : auth.role_id) === 6 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: show === "ASSINEE_TO_DEV" ? "Revision For Developer" : "Revision By Project Manager"
          }) : Number(auth === null || auth === void 0 ? void 0 : auth.role_id) === 4 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: show === "ASSINEE_TO_DEV" ? "Revision For Lead Developer" : "Revision By Project Manager"
          }) : "Revision By Lead Developer"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          onClick: close,
          className: "",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "px-3",
        children: [show === 'REVISION' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_RevisionVeiw__WEBPACK_IMPORTED_MODULE_2__["default"], {
          revision: revision,
          isLoading: isFetchingRevision,
          isContinue: isLoadingRevisionReview,
          onAccept: function onAccept() {
            setAccept('accept');
            setShow('ACCEPT_AND_CONTINUE');
          },
          onDeny: function onDeny() {
            setAccept("deny");
            setShow('DENY_AND_CONTINUE');
          },
          onContinue: function onContinue() {
            setAccept('continue');
            hanldeAcceptAndContinueSubmition({
              "continue": true
            }, '');
          }
        }), show === 'ACCEPT_AND_CONTINUE' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_RevisionAcceptAndContinue__WEBPACK_IMPORTED_MODULE_3__.RevisionAcceptAndContinue, {
          task: task,
          isSubmitting: isLoadingRevisionReview,
          onSubmit: function onSubmit(data) {
            return hanldeAcceptAndContinueSubmition(data, "ASSINEE_TO_DEV");
          },
          close: function close() {
            return setShow("REVISION");
          }
        }), show === "DENY_AND_CONTINUE" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_DenyAndContinue__WEBPACK_IMPORTED_MODULE_5__["default"], {
          task: task,
          onSubmit: function onSubmit(data) {
            return hanldeAcceptAndContinueSubmition(data, "DENY_ASSINEE_TO_DEV");
          },
          isSubmitting: isLoadingRevisionReview,
          onBack: function onBack() {
            return setShow("REVISION");
          }
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeveloperRevisionView);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/Revision/RevisionAcceptAndContinue.jsx":
/*!****************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/Revision/RevisionAcceptAndContinue.jsx ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AcceptAndContinueButton": () => (/* binding */ AcceptAndContinueButton),
/* harmony export */   "RevisionAcceptAndContinue": () => (/* binding */ RevisionAcceptAndContinue)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_SubmitButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/SubmitButton */ "./resources/js/react/single-task/components/SubmitButton.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






// button


var AcceptAndContinueButton = function AcceptAndContinueButton(_ref) {
  var isLoading = _ref.isLoading,
    onClick = _ref.onClick;
  if (!isLoading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
      onClick: onClick,
      children: "Accept & Continue"
    });
  } else {
    /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
        className: "cursor-processing",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "spinner-border text-white",
          role: "status",
          style: {
            width: "18px",
            height: "18px"
          }
        }), " ", "Processing..."]
      })
    });
  }
};

// component
var RevisionAcceptAndContinue = function RevisionAcceptAndContinue(_ref2) {
  var _window, _window$Laravel;
  var task = _ref2.task,
    revision = _ref2.revision,
    onSubmit = _ref2.onSubmit,
    close = _ref2.close,
    onNext = _ref2.onNext,
    _ref2$isSubmitting = _ref2.isSubmitting,
    isSubmitting = _ref2$isSubmitting === void 0 ? false : _ref2$isSubmitting;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    comment = _useState2[0],
    setComment = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    err = _useState4[0],
    setErr = _useState4[1];
  var handleEditorDataChange = function handleEditorDataChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };
  var handleOnSubmit = function handleOnSubmit(e) {
    e.preventDefault();
    if (comment !== '') {
      onSubmit({
        comment: comment
      });
    } else {
      setErr("You have to Explain Why & How Did This Happen!");
    }
  };
  var auth = (_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("form", {
      action: "",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: ["Please Explain Why & How Did This Happen?", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("sup", {
            className: "f-16 text-red",
            children: "*"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "ck-editor-holder",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_3__["default"], {
            onChange: handleEditorDataChange
          })
        }), err && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("small", {
          id: "emailHelp",
          className: "form-text text-danger",
          children: err
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onClick: close,
            variant: "tertiary",
            className: "ml-auto mr-2",
            children: "Back"
          }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: _.includes([4, 6], auth === null || auth === void 0 ? void 0 : auth.role_id) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
              onClick: handleOnSubmit,
              children: "Next"
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_SubmitButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
              title: "Submit",
              isLoading: isSubmitting,
              onClick: handleOnSubmit
            })
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
              className: "cursor-processing",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
                className: "spinner-border text-white",
                role: "status",
                style: {
                  width: "18px",
                  height: "18px"
                }
              }), " ", "Processing..."]
            })
          })]
        })]
      })
    })
  });
};

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/Revision/RevisionControl.jsx":
/*!******************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/Revision/RevisionControl.jsx ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _RevisionCreationModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RevisionCreationModal */ "./resources/js/react/single-task/section/task-actions/Revision/RevisionCreationModal.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var RevisionControl = function RevisionControl(_ref) {
  var task = _ref.task,
    auth = _ref.auth;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    revisionModal = _useState2[0],
    setRevisionModal = _useState2[1];
  var singleTask = new _utils_single_task__WEBPACK_IMPORTED_MODULE_3__.SingleTask(task);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      variant: "tertiary",
      onClick: function onClick() {
        return setRevisionModal(true);
      },
      className: "d-flex align-items-center sp1-st-revision-btn sp1-st-revision-btn",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
        className: "fa-solid fa-plus-minus"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
        className: "d-inline ml-1",
        children: "Need Revision"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isOpen: revisionModal,
      className: "sp1_single_task--modal",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "sp1_single_task--modal-panerl-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_RevisionCreationModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
          auth: auth,
          task: singleTask,
          close: function close() {
            return setRevisionModal(false);
          }
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RevisionControl);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/Revision/RevisionCreationModal.jsx":
/*!************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/Revision/RevisionCreationModal.jsx ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _components_SubmitButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/SubmitButton */ "./resources/js/react/single-task/components/SubmitButton.jsx");
/* harmony import */ var _hooks_useRevision__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../hooks/useRevision */ "./resources/js/react/hooks/useRevision.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var RevisionCreationModal = function RevisionCreationModal(_ref) {
  var close = _ref.close,
    task = _ref.task,
    auth = _ref.auth;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    reason = _useState2[0],
    setReason = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    reasonError = _useState4[0],
    setReasonError = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    comment = _useState6[0],
    setComment = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    commentError = _useState8[0],
    setCommentError = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    isDeniable = _useState10[0],
    setIsDeniable = _useState10[1];
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
  var _useRevision = (0,_hooks_useRevision__WEBPACK_IMPORTED_MODULE_7__.useRevision)(),
    getLeadDeveloperAcknowladgementOptions = _useRevision.getLeadDeveloperAcknowladgementOptions,
    getProjectManagerAcknowladgementOptions = _useRevision.getProjectManagerAcknowladgementOptions;
  var role = auth.getRoleId();
  var revisionOptions = role === 4 ? getProjectManagerAcknowladgementOptions() : getLeadDeveloperAcknowladgementOptions();
  var _useCreateRevisionMut = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__.useCreateRevisionMutation)(),
    _useCreateRevisionMut2 = _slicedToArray(_useCreateRevisionMut, 2),
    createRevision = _useCreateRevisionMut2[0],
    isLoading = _useCreateRevisionMut2[1].isLoading;

  // radio button change
  var handleChange = function handleChange(value) {
    setReason(value);
  };

  // editor change text 
  var hanldeEditorTextChange = function hanldeEditorTextChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };

  // validation
  var validate = function validate() {
    var errorCount = 0;
    if (comment === "") {
      errorCount++;
      setCommentError('You have to explain the revision in details, so that lead developer/developer can understand where they need to work.');
    }
    if (!reason) {
      errorCount++;
      setReasonError('You have to select a reason from above options');
    }
    return errorCount === 0;
  };

  // handle submiton
  var handleSubmition = function handleSubmition(e) {
    var _reason$revision, _reason$isDeniable;
    e.preventDefault();
    var data = {
      task_id: task === null || task === void 0 ? void 0 : task.id,
      user_id: auth === null || auth === void 0 ? void 0 : auth.id,
      revision_acknowledgement: (_reason$revision = reason === null || reason === void 0 ? void 0 : reason.revision) !== null && _reason$revision !== void 0 ? _reason$revision : '',
      acknowledgement_id: reason === null || reason === void 0 ? void 0 : reason.id,
      comment: comment,
      is_deniable: (_reason$isDeniable = reason === null || reason === void 0 ? void 0 : reason.isDeniable) !== null && _reason$isDeniable !== void 0 ? _reason$isDeniable : false
    };
    if (validate()) {
      createRevision(data).unwrap().then(function (res) {
        var Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        Toast.fire({
          icon: 'success',
          title: 'Task submitted for Revision successfully'
        });
        close();
      })["catch"](function (err) {
        return console.log(err);
      });
    } else {
      console.log('Your forgot to fillup some requried fields');
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      className: "sp1_single_task--modal-panel",
      style: {
        maxWidth: "550px"
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "font-weight-bold f-14",
          children: ["Revision - Task: ", task === null || task === void 0 ? void 0 : task.id, "#", (task === null || task === void 0 ? void 0 : task.title) || (task === null || task === void 0 ? void 0 : task.heading)]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
          onClick: close,
          className: "",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("form", {
        className: "px-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("label", {
            htmlFor: "",
            className: "font-weight-bold",
            children: ["Select Reason for Revision", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("sup", {
              className: "f-16",
              children: "*"
            }), " :"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "px-3",
            children: revisionOptions.map(function (option) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "form-check d-flex align-items-start mb-2",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("input", {
                  className: "form-check-input mr-2",
                  type: "radio",
                  name: "exampleRadios",
                  id: option.id,
                  required: true,
                  onChange: function onChange() {
                    return handleChange(option);
                  },
                  value: option.revision,
                  style: {
                    width: "16px",
                    height: "16px",
                    marginTop: "3px"
                  }
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                  className: "form-check-label",
                  htmlFor: option.id,
                  style: {
                    marginBottom: "3px"
                  },
                  children: option.revision
                })]
              }, option.id);
            })
          }), reasonError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("small", {
            id: "emailHelp",
            className: "form-text text-danger",
            children: reasonError
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("label", {
            htmlFor: "",
            className: "font-weight-bold",
            children: ["Explain or Comment", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("sup", {
              className: "f-16",
              children: "*"
            }), " :"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "ck-editor-holder",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onChange: hanldeEditorTextChange
            })
          }), commentError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("small", {
            id: "emailHelp",
            className: "form-text text-danger",
            children: commentError
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "mt-3 d-flex align-items-center",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
              onClick: close,
              variant: "tertiary",
              className: "ml-auto mr-2",
              children: "Close"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_SubmitButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
              title: "Submit",
              onClick: handleSubmition,
              isLoading: isLoading
            })]
          })
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RevisionCreationModal);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/Revision/RevisionVeiw.jsx":
/*!***************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/Revision/RevisionVeiw.jsx ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _RevisionAcceptAndContinue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RevisionAcceptAndContinue */ "./resources/js/react/single-task/section/task-actions/Revision/RevisionAcceptAndContinue.jsx");
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _components_SubmitButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/SubmitButton */ "./resources/js/react/single-task/components/SubmitButton.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








var RevisionVeiw = function RevisionVeiw(_ref) {
  var _window, _window$Laravel;
  var revision = _ref.revision,
    isLoading = _ref.isLoading,
    onAccept = _ref.onAccept,
    onDeny = _ref.onDeny,
    onContinue = _ref.onContinue,
    isContinue = _ref.isContinue;
  var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_4__.User((_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user);
  var comment = (auth === null || auth === void 0 ? void 0 : auth.getRoleId()) === 6 ? revision === null || revision === void 0 ? void 0 : revision.pm_comment : revision === null || revision === void 0 ? void 0 : revision.lead_comment;
  if (isLoading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
            width: "450px",
            className: "mb-2"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
            width: "100px",
            className: "mb-3"
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "st_revision_comment mb-4",
        children: isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
            width: "100%",
            className: "mb-2"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
            width: "100%",
            className: "mb-2"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
            width: "30%",
            className: "mb-2"
          })]
        })
      })]
    });
  } else if (!comment && !isLoading) {
    return null;
  } else {
    var _revision$revision_ac;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: [(revision === null || revision === void 0 ? void 0 : revision.revision_acknowledgement) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        children: !isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("p", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            className: "font-weight-bold text-danger f-16",
            children: "Reason: "
          }), (_revision$revision_ac = revision === null || revision === void 0 ? void 0 : revision.revision_acknowledgement) !== null && _revision$revision_ac !== void 0 ? _revision$revision_ac : revision === null || revision === void 0 ? void 0 : revision.revision_reason]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
            width: "450px",
            className: "mb-2"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
            width: "100px",
            className: "mb-3"
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "st_revision_comment",
        children: [!isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "sp1_ck_content",
          dangerouslySetInnerHTML: {
            __html: comment
          }
        }), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
            width: "100%",
            className: "mb-2"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
            width: "100%",
            className: "mb-2"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
            width: "30%",
            className: "mb-2"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "mt-4 mb-2 d-flex align-items-center",
        children: !isLoading && (revision !== null && revision !== void 0 && revision.is_deniable ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
            onClick: onDeny,
            variant: "tertiary",
            className: "ml-auto mr-2",
            children: "Deny & Continue"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_RevisionAcceptAndContinue__WEBPACK_IMPORTED_MODULE_2__.AcceptAndContinueButton, {
            onClick: onAccept,
            isLoading: false
          })]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "ml-auto",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_SubmitButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
              onClick: onContinue,
              variant: "primary",
              isLoading: isContinue,
              title: "Continue"
            })
          })
        }))
      })]
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RevisionVeiw);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/Revision/RevisionViewControl.jsx":
/*!**********************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/Revision/RevisionViewControl.jsx ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _RevisionViewModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RevisionViewModal */ "./resources/js/react/single-task/section/task-actions/Revision/RevisionViewModal.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _DeveloperRevisionView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DeveloperRevisionView */ "./resources/js/react/single-task/section/task-actions/Revision/DeveloperRevisionView.jsx");
/* harmony import */ var _permissions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../permissions */ "./resources/js/react/single-task/permissions.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var RevisionViewControl = function RevisionViewControl(_ref) {
  var task = _ref.task,
    auth = _ref.auth,
    status = _ref.status;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    revisionModal = _useState2[0],
    setRevisionModal = _useState2[1];
  var singleTask = task;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      variant: "tertiary",
      onClick: function onClick() {
        return setRevisionModal(true);
      },
      className: "d-flex align-items-center sp1-st-revision-btn --view-revision",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("i", {
        className: "fa-solid fa-plus-minus"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
        className: "d-inline ml-1",
        children: "Revision"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isOpen: revisionModal,
      className: "sp1_single_task--modal",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "sp1_single_task--modal-panerl-wrapper",
        children: lodash__WEBPACK_IMPORTED_MODULE_5___default().includes([6], auth === null || auth === void 0 ? void 0 : auth.getRoleId()) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_RevisionViewModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
          task: singleTask,
          close: function close() {
            return setRevisionModal(false);
          }
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_DeveloperRevisionView__WEBPACK_IMPORTED_MODULE_6__["default"], {
          task: task,
          close: function close() {
            return setRevisionModal(false);
          }
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RevisionViewControl);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/Revision/RevisionViewModal.jsx":
/*!********************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/Revision/RevisionViewModal.jsx ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _RevisionVeiw__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RevisionVeiw */ "./resources/js/react/single-task/section/task-actions/Revision/RevisionVeiw.jsx");
/* harmony import */ var _RevisionAcceptAndContinue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RevisionAcceptAndContinue */ "./resources/js/react/single-task/section/task-actions/Revision/RevisionAcceptAndContinue.jsx");
/* harmony import */ var _AssigneeRevisionToDev__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AssigneeRevisionToDev */ "./resources/js/react/single-task/section/task-actions/Revision/AssigneeRevisionToDev.jsx");
/* harmony import */ var _DenyAndContinue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DenyAndContinue */ "./resources/js/react/single-task/section/task-actions/Revision/DenyAndContinue.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












var RevisionViewModal = function RevisionViewModal(_ref) {
  var _window, _window$Laravel;
  var task = _ref.task,
    close = _ref.close;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("REVISION"),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    accept = _useState4[0],
    setAccept = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    comment = _useState6[0],
    setComment = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    denyReason = _useState8[0],
    setDenyReason = _useState8[1];
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_7__.useDispatch)();
  var _useGetRevisionDetail = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_6__.useGetRevisionDetailsQuery)(task === null || task === void 0 ? void 0 : task.id),
    revision = _useGetRevisionDetail.data,
    isFetching = _useGetRevisionDetail.isFetching;
  //   const [revisionAcceptOrDeny, {isLoading: isLoadingRevisionReview}] = useRevisionAcceptOrDenyMutation();
  var auth = (_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user;
  var _useRevisionAcceptOrD = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_6__.useRevisionAcceptOrDenyByLeadDeveloperMutation)(),
    _useRevisionAcceptOrD2 = _slicedToArray(_useRevisionAcceptOrD, 2),
    revisionAcceptOrDeny = _useRevisionAcceptOrD2[0],
    isLoadingRevisionReview = _useRevisionAcceptOrD2[1].isLoading;

  // handle Accept and continue submition
  var hanldeAcceptAndContinueSubmition = function hanldeAcceptAndContinueSubmition(data, type) {
    setComment(data);
    setShow(type);
  };

  // handle Accept and continue submition
  var hanldeDenyAndContinueSubmition = function hanldeDenyAndContinueSubmition(data, type) {
    setComment(data);
    setDenyReason(data === null || data === void 0 ? void 0 : data.denyReason);
    setShow(type);
  };
  var handleOnSubmit = function handleOnSubmit(data, type) {
    var _comment$comment, _data$reason, _data$is_deniable;
    var fdata = {
      comment: (_comment$comment = comment === null || comment === void 0 ? void 0 : comment.comment) !== null && _comment$comment !== void 0 ? _comment$comment : '',
      task_id: data === null || data === void 0 ? void 0 : data.task_id,
      project_id: task === null || task === void 0 ? void 0 : task.projectId,
      user_id: auth === null || auth === void 0 ? void 0 : auth.id,
      subTask: lodash__WEBPACK_IMPORTED_MODULE_9___default().map(data === null || data === void 0 ? void 0 : data.comments, function (comment) {
        return _objectSpread(_objectSpread({}, comment), {}, {
          is_deniable: data === null || data === void 0 ? void 0 : data.is_deniable
        });
      }),
      revision_acknowledgement: (_data$reason = data === null || data === void 0 ? void 0 : data.reason) !== null && _data$reason !== void 0 ? _data$reason : '',
      revision_id: revision === null || revision === void 0 ? void 0 : revision.id,
      mode: data !== null && data !== void 0 && data["continue"] ? 'continue' : accept,
      deny_reason: denyReason !== null && denyReason !== void 0 ? denyReason : '',
      is_deniable: (_data$is_deniable = data === null || data === void 0 ? void 0 : data.is_deniable) !== null && _data$is_deniable !== void 0 ? _data$is_deniable : false
    };
    var params = !(data !== null && data !== void 0 && data["continue"]) && accept === "deny" ? 'deny-continue' : 'accept-continue';
    revisionAcceptOrDeny({
      fdata: fdata,
      params: params
    }).unwrap().then(function (res) {
      close();
    })["catch"](function (err) {
      return console.log(err);
    });
  };
  var handleContinueButton = function handleContinueButton() {
    setAccept('continue');
    if (lodash__WEBPACK_IMPORTED_MODULE_9___default().size(revision === null || revision === void 0 ? void 0 : revision.taskSubTask) === 0) {
      setShow('DENY_ASSINEE_TO_DEV');
    } else {
      handleOnSubmit({
        "continue": true
      }, '');
    }
  };
  console.log({
    task: task
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
      className: "sp1_single_task--modal-panel",
      style: {
        maxWidth: "550px"
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
        className: "border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
          className: "font-weight-bold f-16",
          children: ["Task#", task === null || task === void 0 ? void 0 : task.id, ":", Number(auth === null || auth === void 0 ? void 0 : auth.role_id) === 6 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: show === "ASSINEE_TO_DEV" ? "Revision For Developer" : "Revision By Project Manager"
          }) : Number(auth === null || auth === void 0 ? void 0 : auth.role_id) === 4 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: show === "ASSINEE_TO_DEV" ? "Revision For Lead Developer" : "Revision By Project Manager"
          }) : "Revision By Lead Developer Manager"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          onClick: close,
          className: "",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
        className: "px-3",
        children: [show === 'REVISION' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_RevisionVeiw__WEBPACK_IMPORTED_MODULE_2__["default"], {
          revision: revision,
          isLoading: isFetching,
          isContinue: isLoadingRevisionReview,
          onAccept: function onAccept() {
            setAccept('accept');
            setShow('ACCEPT_AND_CONTINUE');
          },
          onDeny: function onDeny() {
            setAccept('deny');
            setShow('DENY_AND_CONTINUE');
          },
          onContinue: handleContinueButton
        }), show === 'ACCEPT_AND_CONTINUE' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_RevisionAcceptAndContinue__WEBPACK_IMPORTED_MODULE_3__.RevisionAcceptAndContinue, {
          task: task,
          isSubmitting: isLoadingRevisionReview,
          onSubmit: function onSubmit(data) {
            return hanldeAcceptAndContinueSubmition(data, "ASSINEE_TO_DEV");
          },
          close: function close() {
            return setShow("REVISION");
          }
        }), show === "ASSINEE_TO_DEV" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_AssigneeRevisionToDev__WEBPACK_IMPORTED_MODULE_4__["default"], {
          task: task,
          revision: revision,
          type: true,
          onSubmit: function onSubmit(data) {
            return handleOnSubmit(data, 'ASSINEE_TO_DEV');
          },
          isSubmitting: isLoadingRevisionReview,
          onBack: function onBack() {
            return setShow("ACCEPT_AND_CONTINUE");
          }
        }), show === "DENY_AND_CONTINUE" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_DenyAndContinue__WEBPACK_IMPORTED_MODULE_5__["default"], {
          task: task,
          onSubmit: function onSubmit(data) {
            return hanldeDenyAndContinueSubmition(data, "DENY_ASSINEE_TO_DEV");
          },
          isSubmitting: isLoadingRevisionReview,
          onBack: function onBack() {
            return setShow("REVISION");
          }
        }), lodash__WEBPACK_IMPORTED_MODULE_9___default().size(task === null || task === void 0 ? void 0 : task.taskSubTask) > 0 && show === "DENY_ASSINEE_TO_DEV" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_AssigneeRevisionToDev__WEBPACK_IMPORTED_MODULE_4__["default"], {
          task: task,
          revision: revision,
          type: false,
          onSubmit: function onSubmit(data) {
            return handleOnSubmit(data, 'DENY_ASSINEE_TO_DEV');
          },
          isSubmitting: isLoadingRevisionReview,
          onBack: function onBack() {
            return setShow("DENY_AND_CONTINUE");
          }
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RevisionViewModal);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/StartTimerConfirmationModal.jsx":
/*!*********************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/StartTimerConfirmationModal.jsx ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var StartTimerConfirmationModal = function StartTimerConfirmationModal(_ref) {
  var isOpen = _ref.isOpen,
    onConfirm = _ref.onConfirm;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    buttonVisible = _React$useState2[0],
    setButtonVisible = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(20),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    countDown = _React$useState4[0],
    setCountDown = _React$useState4[1];
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    var count = countDown !== null && countDown !== void 0 ? countDown : 0;
    var timeIntervelId = setInterval(function () {
      setCountDown(count--);
    }, 1000);
    var timeOutId = setTimeout(function () {
      setButtonVisible(true);
      clearInterval(timeIntervelId);
    }, 22000);
    return function () {
      clearTimeout(timeOutId);
      clearInterval(timeIntervelId);
    };
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isOpen: isOpen,
    className: "subtask-timer-confirmation--modal",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "subtask-timer-confirmation--panel",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "subtask-timer-confirmation--content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h4", {
          className: "mb-3",
          children: " Do You Understand The Following Things? "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("ol", {
          type: "A",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
            children: " Your job is not to decide what the look and feel of a website will be based on a few reference websites. "
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
            children: "Your job is not to research a theme based on an instruction shared by the PM."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
            children: "Your job is not to research a plugin based on a problem shared by PM."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
            children: "Your job is not to choose the color scheme of a website."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
            children: "Your job is not to talk to the support for example the Shopify support team, theme support, plugin support and any other support for any solution."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
            children: "Your job is not to create the training videos for the client after the completion of a project."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("li", {
            children: "You understand that all your hours have to be logged/tracked, and you will be questioned if you don\u2019t log at least 7 hours for any reason."
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
          children: "In general, anything that has to do with requirements define (of any sort) has to be done by the project manager. Your job is to execute the work based on the defined requirements. "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
          children: "If for any reason, project manager needs your help for any of those things, he will have to create a separate task for each of them and those tasks have to be authorized by the top management mandatorily. Report immediately if you are asked to do any of these and if it wasn\u2019t authorized by top management. You should see a text like \u201CAuthorized by top management\u201D on the right side of the task title if it was authorized."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
          children: " In case, you don\u2019t report, the extra time taken for these will be considered as your lacking (as they will remain unaccountable) and you will receive negative performance score.\u201D"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "d-flex align-items-center",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onClick: onConfirm,
            className: "ml-auto",
            disabled: !buttonVisible,
            children: ["Yes, I Fully Understand This ", !buttonVisible && "(".concat(countDown, ")")]
          })
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StartTimerConfirmationModal);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/StopTimerControl.jsx":
/*!**********************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/StopTimerControl.jsx ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _utils_dateController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/dateController */ "./resources/js/react/utils/dateController.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var StopTimerConfrimationPopUp = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_single-task_section_task-actions_stop-timer_StopTimerConfrimationPopUp_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ./stop-timer/StopTimerConfrimationPopUp */ "./resources/js/react/single-task/section/task-actions/stop-timer/StopTimerConfrimationPopUp.jsx"));
});
var dayjs = new _utils_dateController__WEBPACK_IMPORTED_MODULE_2__.CompareDate();
var StopTimerControl = function StopTimerControl(_ref) {
  var stopTimer = _ref.stopTimer,
    timerStopStatusIsLoading = _ref.timerStopStatusIsLoading;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    openStopButtonConfirmationButton = _React$useState2[0],
    setOpenStopButtonConfirmationButton = _React$useState2[1];

  // control stop timer button click
  var handleStopButtonOnClick = function handleStopButtonOnClick(e) {
    e.preventDefault();
    var currentTime = dayjs.dayjs(); // current time
    var targetTime = dayjs.dayjs().hour(16).minute(30); // 4:30
    var isOverTime = dayjs.dayjs(currentTime).isSameOrAfter(targetTime); // over 4:30 PM

    // stopTimer()
    // if(isOverTime){
    // if over 4:30 pm check if developer meet their daily target time
    setOpenStopButtonConfirmationButton(true);
    // }else{
    //     stopTimer();
    // }
  };

  var handleTemporarilyStopTimer = function handleTemporarilyStopTimer() {
    setOpenStopButtonConfirmationButton(false);
    stopTimer();
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [!timerStopStatusIsLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      variant: "tertiary",
      onClick: handleStopButtonOnClick,
      className: "d-flex align-items-center btn-outline-dark mr-2 text-dark",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
        className: "fa-solid fa-pause"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
        className: "d-inline ml-1",
        children: "Stop Timer"
      })]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: "cursor-processing mr-2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
        className: "spinner-border text-white",
        role: "status",
        style: {
          width: "18px",
          height: "18px"
        }
      }), "Stopping..."]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_3__["default"], {
        isOpen: openStopButtonConfirmationButton,
        className: "sp1_single_task--modal",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "sp1_single_task--modal-panerl-wrapper",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
            fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "sp1_single_task--modal-panel",
              children: "Loading..."
            }),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(StopTimerConfrimationPopUp, {
              handleTemporarilyStopTimer: handleTemporarilyStopTimer,
              close: function close() {
                return setOpenStopButtonConfirmationButton(false);
              }
            })
          })
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StopTimerControl);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/TaskAction.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/TaskAction.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _TimerControl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TimerControl */ "./resources/js/react/single-task/section/task-actions/TimerControl.jsx");
/* harmony import */ var _MarkAsComplete__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MarkAsComplete */ "./resources/js/react/single-task/section/task-actions/MarkAsComplete.jsx");
/* harmony import */ var _permissions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../permissions */ "./resources/js/react/single-task/permissions.js");
/* harmony import */ var _Revision_RevisionControl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Revision/RevisionControl */ "./resources/js/react/single-task/section/task-actions/Revision/RevisionControl.jsx");
/* harmony import */ var _Revision_RevisionViewControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Revision/RevisionViewControl */ "./resources/js/react/single-task/section/task-actions/Revision/RevisionViewControl.jsx");
/* harmony import */ var _approve_task_ApproveTask__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./approve-task/ApproveTask */ "./resources/js/react/single-task/section/task-actions/approve-task/ApproveTask.jsx");
/* harmony import */ var _time_extension_TimeExtension__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./time-extension/TimeExtension */ "./resources/js/react/single-task/section/task-actions/time-extension/TimeExtension.jsx");
/* harmony import */ var _client_approval_ClientApproval__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./client-approval/ClientApproval */ "./resources/js/react/single-task/section/task-actions/client-approval/ClientApproval.jsx");
/* harmony import */ var _report_Report__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./report/Report */ "./resources/js/react/single-task/section/task-actions/report/Report.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
















var TaskAction = function TaskAction(_ref) {
  var _window, _window$Laravel;
  var task = _ref.task,
    status = _ref.status;
  var loggedUser = new _utils_user_details__WEBPACK_IMPORTED_MODULE_11__.User((_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user);
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    timerStart = _React$useState2[0],
    setTimerStart = _React$useState2[1];
  var _useLazyCheckSubTaskT = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_13__.useLazyCheckSubTaskTimerQuery)(),
    _useLazyCheckSubTaskT2 = _slicedToArray(_useLazyCheckSubTaskT, 2),
    checkSubTaskTimer = _useLazyCheckSubTaskT2[0],
    isFetching = _useLazyCheckSubTaskT2[1].isFetching;
  var onModalEditButtonClick = function onModalEditButtonClick(e) {
    e.preventDefault();
    checkSubTaskTimer(task === null || task === void 0 ? void 0 : task.id).unwrap().then(function (res) {
      if ((res === null || res === void 0 ? void 0 : res.status) === 200) {
        window.location = "/account/tasks/".concat(task === null || task === void 0 ? void 0 : task.id, "/edit");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You cannot edit the task because timer is already running"
        });
      }
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
    className: "d-flex flex-wrap border-bottom pb-3 sp1_task_btn_group",
    style: {
      gap: "10px"
    },
    children: [(0,_permissions__WEBPACK_IMPORTED_MODULE_4__.timeControlPermision)({
      task: task,
      status: status,
      loggedUser: loggedUser
    }) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_TimerControl__WEBPACK_IMPORTED_MODULE_2__["default"], {
      task: task,
      timerStart: timerStart,
      setTimerStart: setTimerStart,
      auth: loggedUser
    }) : null, !timerStart && (0,_permissions__WEBPACK_IMPORTED_MODULE_4__.markAsCompletedButtonPermission)({
      task: task,
      status: status,
      loggedUser: loggedUser
    }) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_MarkAsComplete__WEBPACK_IMPORTED_MODULE_3__["default"], {
      task: task,
      auth: loggedUser
    }) : null, (0,_permissions__WEBPACK_IMPORTED_MODULE_4__.approveButtonPermission)({
      task: task,
      status: status,
      loggedUser: loggedUser
    }) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_approve_task_ApproveTask__WEBPACK_IMPORTED_MODULE_7__["default"], {
      task: task,
      status: status,
      auth: loggedUser
    }) : null, (0,_permissions__WEBPACK_IMPORTED_MODULE_4__.needRevisionPermision)({
      task: task,
      status: status,
      loggedUser: loggedUser
    }) ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_Revision_RevisionControl__WEBPACK_IMPORTED_MODULE_5__["default"], {
      task: task,
      auth: loggedUser
    }) : null, (0,_permissions__WEBPACK_IMPORTED_MODULE_4__.revisionButtonPermission)({
      task: task,
      status: status,
      loggedUser: loggedUser
    }) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_Revision_RevisionViewControl__WEBPACK_IMPORTED_MODULE_6__["default"], {
      task: task,
      status: status,
      auth: loggedUser
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_client_approval_ClientApproval__WEBPACK_IMPORTED_MODULE_9__["default"], {
      task: task,
      status: status,
      auth: loggedUser
    }), lodash__WEBPACK_IMPORTED_MODULE_12___default().includes([6, 5, 8, 10], loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.getRoleId()) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_report_Report__WEBPACK_IMPORTED_MODULE_10__["default"], {
      task: task
    }), (0,_permissions__WEBPACK_IMPORTED_MODULE_4__.taskEditPermision)({
      task: task,
      status: status,
      auth: loggedUser
    }) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("a", {
      href: "#",
      onClick: onModalEditButtonClick,
      className: "cnx__btn cnx__btn_sm cnx__btn_primary sp1_task-edit-button",
      children: [isFetching ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
        className: "spinner-border text-dark ml-2",
        role: "status",
        style: {
          width: "16px",
          height: "16px",
          border: "0.14em solid rgb(255, 255, 255)",
          borderRightColor: "transparent"
        }
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("i", {
        className: "fa-regular fa-pen-to-square"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("span", {
        className: "ml-1 mr-2",
        children: "Edit"
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskAction);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/TimerControl.jsx":
/*!******************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/TimerControl.jsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _StartTimerConfirmationModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StartTimerConfirmationModal */ "./resources/js/react/single-task/section/task-actions/StartTimerConfirmationModal.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _utils_dateController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/dateController */ "./resources/js/react/utils/dateController.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _StopTimerControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./StopTimerControl */ "./resources/js/react/single-task/section/task-actions/StopTimerControl.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _stop_timer_LessTrackTimerModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./stop-timer/LessTrackTimerModal */ "./resources/js/react/single-task/section/task-actions/stop-timer/LessTrackTimerModal.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












// component


var TimerControl = function TimerControl(_ref) {
  var _window, _window$Laravel, _task$ranningTimer;
  var task = _ref.task,
    timerStart = _ref.timerStart,
    setTimerStart = _ref.setTimerStart,
    auth = _ref.auth;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    timerId = _useState2[0],
    setTimerId = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    seconds = _useState4[0],
    setSeconds = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isOpenConfirmationModal = _useState6[0],
    setIsOpenConfirmationModal = _useState6[1];
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_7__.useDispatch)();
  var dayjs = new _utils_dateController__WEBPACK_IMPORTED_MODULE_4__.CompareDate();
  var loggedUser = new _utils_user_details__WEBPACK_IMPORTED_MODULE_10__.User((_window = window) === null || _window === void 0 ? void 0 : (_window$Laravel = _window.Laravel) === null || _window$Laravel === void 0 ? void 0 : _window$Laravel.user);
  var timerStatus = task === null || task === void 0 ? void 0 : (_task$ranningTimer = task.ranningTimer) === null || _task$ranningTimer === void 0 ? void 0 : _task$ranningTimer.status;
  var taskRunning = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return timerStatus;
  }, [timerStatus]);
  // check timer is already running
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (taskRunning === "running") {
      var _task$ranningTimer2, _task$ranningTimer3;
      var serverTime = task === null || task === void 0 ? void 0 : (_task$ranningTimer2 = task.ranningTimer) === null || _task$ranningTimer2 === void 0 ? void 0 : _task$ranningTimer2.time;
      var localTime = dayjs.dayjs().unix();
      var _timer = localTime - serverTime;
      setTimerStart(true);
      setSeconds(_timer);
      setTimerId(task === null || task === void 0 ? void 0 : (_task$ranningTimer3 = task.ranningTimer) === null || _task$ranningTimer3 === void 0 ? void 0 : _task$ranningTimer3.id);
    }
  }, [taskRunning]);

  //   timer control
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var interval = null;
    if (timerStart) {
      //   interval for timer
      interval = setInterval(function () {
        setSeconds(function (s) {
          return s + 1;
        });
      }, 1000);
    } else clearInterval(interval); // clear interval
    return function () {
      return clearInterval(interval);
    }; // clear interval
  }, [timerStart]);

  // time formating
  var timer = function timer() {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);

    // format
    var sec = s < 10 ? "0".concat(s) : s;
    var min = minutes < 10 ? "0".concat(minutes) : minutes;
    var hr = hours < 10 ? "0".concat(hours) : hours;
    return "".concat(hr, ":").concat(min, ":").concat(sec);
  };

  // tostar
  var Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true
  });

  /******** Start timer control *********/

  // timer start first timer : checking api
  var _useLazyGetTaskDetail = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__.useLazyGetTaskDetailsQuery)(),
    _useLazyGetTaskDetail2 = _slicedToArray(_useLazyGetTaskDetail, 2),
    startTimerFirstCheck = _useLazyGetTaskDetail2[0],
    startTimerFirstCheckIsFetching = _useLazyGetTaskDetail2[1].isFetching;

  // start timer api slice
  var _useStartTimerApiMuta = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__.useStartTimerApiMutation)(),
    _useStartTimerApiMuta2 = _slicedToArray(_useStartTimerApiMuta, 2),
    startTimerApi = _useStartTimerApiMuta2[0],
    timerStartStatusIsLoading = _useStartTimerApiMuta2[1].isLoading;

  // stop timer api slice
  var _useStopTimerApiMutat = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__.useStopTimerApiMutation)(),
    _useStopTimerApiMutat2 = _slicedToArray(_useStopTimerApiMutat, 2),
    stopTimerApi = _useStopTimerApiMutat2[0],
    timerStopStatusIsLoading = _useStopTimerApiMutat2[1].isLoading;

  // timer start control
  var startTimerControl = function startTimerControl() {
    var _window2, _window2$Laravel, _window2$Laravel$user;
    setIsOpenConfirmationModal(false);
    startTimerApi({
      task_id: task === null || task === void 0 ? void 0 : task.id,
      project_id: task === null || task === void 0 ? void 0 : task.projectId,
      memo: task === null || task === void 0 ? void 0 : task.title,
      user_id: (_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$Laravel = _window2.Laravel) === null || _window2$Laravel === void 0 ? void 0 : (_window2$Laravel$user = _window2$Laravel.user) === null || _window2$Laravel$user === void 0 ? void 0 : _window2$Laravel$user.id
    }).unwrap().then(function (res) {
      if ((res === null || res === void 0 ? void 0 : res.status) === "success" || (res === null || res === void 0 ? void 0 : res.status) === 200) {
        setTimerStart(true);
        setTimerId(res === null || res === void 0 ? void 0 : res.id);
        dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_8__.setTaskStatus)(res === null || res === void 0 ? void 0 : res.task_status));
        Toast.fire({
          icon: 'success',
          title: lodash__WEBPACK_IMPORTED_MODULE_5___default().startCase(res === null || res === void 0 ? void 0 : res.message)
        });
      } else {
        Toast.fire({
          icon: 'warning',
          title: lodash__WEBPACK_IMPORTED_MODULE_5___default().startCase(res === null || res === void 0 ? void 0 : res.message)
        });
      }
    })["catch"](function (err) {
      if (err.status === 400) {
        Swal.fire({
          title: "You have not meet last day's minimum hour count. Please share the reasons!",
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: "Close",
          icon: 'warning'
        }).then(function (result) {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            var _err$data;
            dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_8__.setLessTrackModal)({
              show: true,
              type: 'START_TIMER',
              date: dayjs.dayjs(err === null || err === void 0 ? void 0 : (_err$data = err.data) === null || _err$data === void 0 ? void 0 : _err$data.date).format("MMM DD, YYYY")
            }));
          }
        });
      }
    });
  };

  // start timer function
  var startTimer = function startTimer(e) {
    e.preventDefault();
    startTimerFirstCheck("/".concat(task === null || task === void 0 ? void 0 : task.id, "/json?mode=developer_first_task_check&project_id=").concat(task === null || task === void 0 ? void 0 : task.projectId)).unwrap().then(function (res) {
      if (res.is_first_task) {
        setIsOpenConfirmationModal(true);
      } else startTimerControl();
    });
  };

  /*********** End of Start Timer control ***************/

  // stop timer
  var stopTimer = function stopTimer() {
    stopTimerApi({
      timeId: timerId
    }).unwrap().then(function (res) {
      if ((res === null || res === void 0 ? void 0 : res.status) === "success" || (res === null || res === void 0 ? void 0 : res.status) === 200) {
        Toast.fire({
          icon: "success",
          title: lodash__WEBPACK_IMPORTED_MODULE_5___default().startCase(res === null || res === void 0 ? void 0 : res.message)
        });
        setTimerStart(false);
        setSeconds(0);
        timerId(null);
      } else {
        Toast.fire({
          icon: 'warning',
          title: lodash__WEBPACK_IMPORTED_MODULE_5___default().startCase(res === null || res === void 0 ? void 0 : res.message)
        });
      }
    });
  };
  var _useLazyGetUserTrackT = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__.useLazyGetUserTrackTimeQuery)(),
    _useLazyGetUserTrackT2 = _slicedToArray(_useLazyGetUserTrackT, 2),
    getUserTrackTime = _useLazyGetUserTrackT2[0],
    trackTimerFetcing = _useLazyGetUserTrackT2[1].isFetching;

  // handle stop timer 
  var handleStopTimer = function handleStopTimer() {
    // fetch data
    getUserTrackTime(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.getId()).unwrap().then(function (res) {
      if (res) {
        var currentTime = dayjs.dayjs(res.current_time);
        var target = currentTime.set('hour', 16).set('minute', 30).set('second', 0);
        var isSaturday = currentTime.day() === 6;
        if (isSaturday) {
          target = currentTime.set('hour', 12).set('minute', 30).set('second', 0);
        }
        var check = dayjs.dayjs(currentTime).isBefore(target);
        var isDev = lodash__WEBPACK_IMPORTED_MODULE_5___default().includes([5, 9, 10], Number(auth.getRoleId()));
        if (!check && isDev) {
          res.tracked_times < res.target_time ? dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_8__.setLessTrackModal)({
            show: true,
            type: 'STOP_TIMER',
            date: 'Today'
          })) : stopTimer();
        } else {
          stopTimer();
        }
      }
    })["catch"](function (err) {
      return console.log(err);
    });
  };

  // control loading states...
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (startTimerFirstCheckIsFetching || timerStartStatusIsLoading) {
      document.getElementsByTagName("body")[0].style.cursor = "progress";
    } else {
      document.getElementsByTagName("body")[0].style.cursor = "default";
    }
  }, [startTimerFirstCheckIsFetching, timerStartStatusIsLoading]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [!timerStart ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: [!timerStartStatusIsLoading && !startTimerFirstCheckIsFetching ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        variant: "tertiary",
        onClick: startTimer,
        className: "d-flex align-items-center btn-outline-dark text-dark",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("i", {
          className: "fa-solid fa-circle-play"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
          children: "Start Timer"
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        className: "cursor-processing mr-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
          className: "spinner-border text-white",
          role: "status",
          style: {
            width: "18px",
            height: "18px"
          }
        }), "Starting..."]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_StartTimerConfirmationModal__WEBPACK_IMPORTED_MODULE_2__["default"], {
        isOpen: isOpenConfirmationModal,
        onConfirm: startTimerControl
      })]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        variant: "tertiary",
        className: "d-flex align-items-center btn-outline-dark text-dark",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("i", {
          className: "fa-solid fa-stopwatch"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
          className: "d-inline ml-1",
          children: timer()
        })]
      }), trackTimerFetcing ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        className: "cursor-processing",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
          className: "spinner-border text-white",
          role: "status",
          style: {
            width: "18px",
            height: "18px"
          }
        }), "Processing..."]
      }) : !timerStopStatusIsLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        variant: "tertiary",
        onClick: handleStopTimer,
        className: "d-flex align-items-center btn-outline-dark text-dark",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("i", {
          className: "fa-solid fa-pause"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
          className: "d-inline ml-1",
          children: "Stop Timer"
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        className: "cursor-processing",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
          className: "spinner-border text-white",
          role: "status",
          style: {
            width: "18px",
            height: "18px"
          }
        }), "Stopping..."]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_stop_timer_LessTrackTimerModal__WEBPACK_IMPORTED_MODULE_9__["default"], {
      stopTimer: stopTimer,
      startTimer: startTimerControl
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimerControl);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/approve-task/ApproveTask.jsx":
/*!******************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/approve-task/ApproveTask.jsx ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _smastrom_react_rating__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @smastrom/react-rating */ "./node_modules/@smastrom/react-rating/dist/index.mjs");
/* harmony import */ var _smastrom_react_rating_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @smastrom/react-rating/style.css */ "./node_modules/@smastrom/react-rating/style.css");
/* harmony import */ var _ckeditor_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../ckeditor/index */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var react_icons_hi__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-icons/hi */ "./node_modules/react-icons/hi/index.esm.js");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _components_SubmitButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/SubmitButton */ "./resources/js/react/single-task/components/SubmitButton.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../file-upload/FileUploader */ "./resources/js/react/file-upload/FileUploader.jsx");
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var _hooks_useSingleTask__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../hooks/useSingleTask */ "./resources/js/react/hooks/useSingleTask.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


















var ApproveTask = function ApproveTask(_ref) {
  var task = _ref.task,
    status = _ref.status,
    auth = _ref.auth;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_8__.useDispatch)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showApproveForm = _useState2[0],
    setShowApproveForm = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    completedWithInDeadline = _useState4[0],
    setCompletedWithInDeadline = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    submittedStar = _useState6[0],
    setSubmittedStar = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    fullfilledStar = _useState8[0],
    setFullfilledStar = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    comment = _useState10[0],
    setComment = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    oldSubmittion = _useState12[0],
    setOldSubmittion = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState14 = _slicedToArray(_useState13, 2),
    latestSubmittion = _useState14[0],
    setLatestSubmittion = _useState14[1];
  var _useApproveSubmittedT = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_6__.useApproveSubmittedTaskMutation)(),
    _useApproveSubmittedT2 = _slicedToArray(_useApproveSubmittedT, 2),
    approveSubmittedTask = _useApproveSubmittedT2[0],
    isLoading = _useApproveSubmittedT2[1].isLoading;
  var _useGetSubmittedTaskQ = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_6__.useGetSubmittedTaskQuery)(task === null || task === void 0 ? void 0 : task.id),
    getSubmittedTask = _useGetSubmittedTaskQ.data,
    isFetching = _useGetSubmittedTaskQ.isFetching;
  var _useSingleTask = (0,_hooks_useSingleTask__WEBPACK_IMPORTED_MODULE_13__.useSingleTask)(),
    approveTask = _useSingleTask.approveTask,
    approveTaskLoadingStatus = _useSingleTask.approveTaskLoadingStatus;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (getSubmittedTask) {
      var data = _.sortBy(getSubmittedTask, ['submission_no']);
      var latest = _.last(data);
      var old = _.initial(data);
      setOldSubmittion(_toConsumableArray(old));
      setLatestSubmittion(latest);
    }
  }, [isFetching]);
  var close = function close(e) {
    e.preventDefault();
    setShowApproveForm(false);
  };

  // editor data 
  var onWriteOnEditor = function onWriteOnEditor(e, editor) {
    var data = editor.getData();
    setComment(data);
  };

  // submit 
  var handleOnSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var data, cb;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              data = {
                rating: completedWithInDeadline,
                rating2: submittedStar,
                rating3: fullfilledStar,
                comment: comment,
                task_id: task === null || task === void 0 ? void 0 : task.id,
                user_id: auth === null || auth === void 0 ? void 0 : auth.getId()
              };
              cb = function cb() {
                return setShowApproveForm(false);
              };
              _context.next = 5;
              return approveTask(data, cb);
            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function handleOnSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      variant: "success",
      onClick: function onClick() {
        return setShowApproveForm(true);
      },
      className: "d-flex align-items-center border-success",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("i", {
        className: "fa-solid fa-handshake-angle"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("span", {
        className: "d-inline ml-1",
        children: "Approve"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isOpen: showApproveForm,
      className: "sp1_single_task--modal w-100",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
        className: "sp1_single_task--modal-panerl-wrapper w-100",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
          className: "sp1_single_task--modal-panel w-100",
          style: {
            maxWidth: '600px',
            minWidth: '320px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
            className: "border-bottom pb-2 pl-3 pr-2 mb-3 d-flex align-items-center justify-content-between",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
              className: "font-weight-bold f-16",
              children: " Approve Task "
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onClick: close,
              className: "",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("i", {
                className: "fa-solid fa-xmark"
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
            className: "px-3",
            children: [_.size(oldSubmittion) > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
              className: "mb-3",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                className: "sp1_st--approve-card",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
                  className: "sp1_st--approve-card-header",
                  "data-toggle": "collapse",
                  href: "#oldSubmittedSuccess",
                  role: "button",
                  "aria-expanded": "false",
                  "aria-controls": "oldSubmittedSuccess",
                  children: ["Old Submitted Works (", _.size(oldSubmittion), ")", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("button", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(react_icons_hi__WEBPACK_IMPORTED_MODULE_15__.HiOutlineSelector, {})
                  })]
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                className: "collapse multi-collapse shadow-none",
                id: "oldSubmittedSuccess",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                  className: "card card-body",
                  children: _.size(oldSubmittion) > 0 ? _.map(oldSubmittion, function (task) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(SubmittedWorkCard, {
                      data: task,
                      isLoading: isFetching
                    }, "".concat(task.id, "_").concat(task === null || task === void 0 ? void 0 : task.submission_no));
                  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("span", {
                    children: "No Old Submittion!"
                  })
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(SubmittedWorkCard, {
              data: latestSubmittion,
              latest: true,
              isLoading: isFetching
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
            className: "mt-4 px-3",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("form", {
              action: "",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
                className: "form-group",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("label", {
                  htmlFor: "",
                  className: "font-weight-bold",
                  children: ["Is This Task Completed Within Deadline?", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("sup", {
                    className: "f-16",
                    children: "*"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                  className: "",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_smastrom_react_rating__WEBPACK_IMPORTED_MODULE_3__.Rating, {
                    style: {
                      maxWidth: 120
                    },
                    value: completedWithInDeadline,
                    onChange: setCompletedWithInDeadline,
                    radius: "small"
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
                className: "form-group",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("label", {
                  htmlFor: "",
                  className: "font-weight-bold",
                  children: ["How Beautifully The Task Is Submitted?", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("sup", {
                    className: "f-16",
                    children: "*"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                  className: "",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_smastrom_react_rating__WEBPACK_IMPORTED_MODULE_3__.Rating, {
                    style: {
                      maxWidth: 120
                    },
                    value: submittedStar,
                    onChange: setSubmittedStar,
                    radius: "small"
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
                className: "form-group",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("label", {
                  htmlFor: "",
                  className: "font-weight-bold",
                  children: ["How Perfectly The Task Requirements Are Fullfilled?", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("sup", {
                    className: "f-16",
                    children: "*"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                  className: "",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_smastrom_react_rating__WEBPACK_IMPORTED_MODULE_3__.Rating, {
                    style: {
                      maxWidth: 120
                    },
                    value: fullfilledStar,
                    onChange: setFullfilledStar,
                    radius: "small"
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
                className: "form-group",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("label", {
                  htmlFor: "",
                  className: "font-weight-bold",
                  children: ["Any Recommendations For Developer?", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("sup", {
                    className: "f-16",
                    children: "*"
                  })]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
                  className: "ck-editor-holder",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_ckeditor_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
                    onChange: onWriteOnEditor
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
                className: "mt-3 d-flex align-items-center",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                  onClick: close,
                  variant: "tertiary",
                  className: "ml-auto mr-2",
                  children: "Close"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_components_SubmitButton__WEBPACK_IMPORTED_MODULE_7__["default"], {
                  onClick: handleOnSubmit,
                  title: "Approve",
                  isLoading: approveTaskLoadingStatus
                })]
              })]
            })
          })]
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ApproveTask);

// Submitted work

var SubmittedWorkCard = function SubmittedWorkCard(_ref3) {
  var _data$text;
  var data = _ref3.data,
    _ref3$latest = _ref3.latest,
    latest = _ref3$latest === void 0 ? false : _ref3$latest,
    _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? "" : _ref3$className,
    style = _ref3.style,
    _ref3$isLoading = _ref3.isLoading,
    isLoading = _ref3$isLoading === void 0 ? false : _ref3$isLoading;
  var links = _.compact(_.split(data === null || data === void 0 ? void 0 : data.links, ','));
  var attaches = _.compact(_.split(data === null || data === void 0 ? void 0 : data.attaches, ','));
  if (isLoading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
      className: "sp1_st--approve-card mb-3 ".concat(className),
      style: style,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
        className: "sp1_st--approve-card-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_12__.Placeholder, {
          height: "14px",
          width: "80px",
          className: "mb-2"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_12__.Placeholder, {
          height: "14px",
          width: "50px",
          className: "mb-2"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
        className: "sp1_st--approve-card-body",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
          className: "mb-2",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_12__.Placeholder, {
            height: "14px",
            width: "80px",
            className: "mb-2"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
            className: "ml-2",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_12__.Placeholder, {
              height: "14px",
              width: "100%",
              className: "mb-2"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_12__.Placeholder, {
              height: "14px",
              width: "100%",
              className: "mb-2"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_12__.Placeholder, {
              height: "14px",
              width: "100%",
              className: "mb-2"
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
          className: "mb-2",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_12__.Placeholder, {
            height: "14px",
            width: "80px",
            className: "mb-2"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
            className: "ml-2",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_12__.Placeholder, {
              height: "14px",
              width: "100%",
              className: "mb-2"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_12__.Placeholder, {
              height: "14px",
              width: "100%",
              className: "mb-2"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_12__.Placeholder, {
              height: "14px",
              width: "50%",
              className: "mb-2"
            })]
          })]
        })]
      })]
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
    className: "sp1_st--approve-card mb-3 ".concat(className),
    style: style,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
      className: "sp1_st--approve-card-header",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("span", {
        children: [latest ? 'Latest' : "Old", " Submittion ", !latest && "(".concat(data === null || data === void 0 ? void 0 : data.submission_no, ")")]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("span", {
        children: dayjs__WEBPACK_IMPORTED_MODULE_10___default()(data === null || data === void 0 ? void 0 : data.submission_date).format('MMM DD, YYYY hh:mm a')
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
      className: "sp1_st--approve-card-body",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
        className: "mb-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
          className: "font-weight-bold f-12",
          style: {
            color: '#81868E'
          },
          children: " Links"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("ol", {
          style: {
            listStyle: 'unset'
          },
          children: _.map(links, function (link, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("li", {
              style: {
                listStyle: 'numaric'
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("a", {
                href: link,
                children: link
              })
            }, "".concat(link, "_").concat(index));
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
        className: "mb-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
          className: "font-weight-bold f-12",
          style: {
            color: '#81868E'
          },
          children: "Description"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("div", {
          className: "sp1_ck_content p-2",
          dangerouslySetInnerHTML: {
            __html: (_data$text = data === null || data === void 0 ? void 0 : data.text) !== null && _data$text !== void 0 ? _data$text : "<span style=\"color:rgb(180,188,196);\">Comment Not Available</span>"
          }
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxs)("div", {
        className: "mt-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("span", {
          className: "d-block f-12 font-weight-bold mb-2",
          style: {
            color: "#767581"
          },
          children: "Attached Files"
        }), _.size(attaches) > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_11__["default"], {
          children: _.map(attaches, function (file, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_11__["default"].Preview, {
              fileName: file,
              downloadAble: true,
              deleteAble: false,
              downloadUrl: "/storage/TaskSubmission/".concat(file),
              previewUrl: "/storage/TaskSubmission/".concat(file),
              fileType: _.includes(["png", "jpg", "jpeg", "gif", "svg"], _.last(_.split(file, '.'))) ? 'images' : 'others',
              ext: ""
            }, "".concat(file, "_").concat(index));
          })
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_14__.jsx)("span", {
          className: "px-2",
          style: {
            color: "rgb(180, 188, 196)"
          },
          children: "No Attachment is available"
        })]
      })]
    })]
  });
};

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/client-approval/ClientAcceptedTask.jsx":
/*!****************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/client-approval/ClientAcceptedTask.jsx ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _components_SubmitButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/SubmitButton */ "./resources/js/react/single-task/components/SubmitButton.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var ClientAcceptedTask = function ClientAcceptedTask(_ref) {
  var task = _ref.task;
  var _useConfirmClientAppr = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_2__.useConfirmClientApprovalMutation)(),
    _useConfirmClientAppr2 = _slicedToArray(_useConfirmClientAppr, 2),
    confirmClientApproval = _useConfirmClientAppr2[0],
    isLoading = _useConfirmClientAppr2[1].isLoading;
  var handleClick = function handleClick(e) {
    e.preventDefault();
    confirmClientApproval({
      task_id: task === null || task === void 0 ? void 0 : task.id
    }).unwrap();
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_components_SubmitButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
      onClick: handleClick,
      variant: "success",
      isLoading: isLoading,
      className: "d-flex align-items-center border-success",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
        className: "fa-solid fa-check"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
        className: "d-inline ml-1",
        children: "Client Has Accepted This Task"
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClientAcceptedTask);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/client-approval/ClientApproval.jsx":
/*!************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/client-approval/ClientApproval.jsx ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SubmitForClientApproval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SubmitForClientApproval */ "./resources/js/react/single-task/section/task-actions/client-approval/SubmitForClientApproval.jsx");
/* harmony import */ var _ClientAcceptedTask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ClientAcceptedTask */ "./resources/js/react/single-task/section/task-actions/client-approval/ClientAcceptedTask.jsx");
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _Revision_ClientRevision__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Revision/ClientRevision */ "./resources/js/react/single-task/section/task-actions/Revision/ClientRevision.jsx");
/* harmony import */ var _permissions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../permissions */ "./resources/js/react/single-task/permissions.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








var ClientApproval = function ClientApproval(_ref) {
  var task = _ref.task,
    status = _ref.status,
    auth = _ref.auth;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [(0,_permissions__WEBPACK_IMPORTED_MODULE_5__.submitForClientApproval)({
      task: task,
      status: status,
      auth: auth
    }) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_SubmitForClientApproval__WEBPACK_IMPORTED_MODULE_1__.SubmitForClientApproval, {
      task: task,
      auth: auth
    }), (0,_permissions__WEBPACK_IMPORTED_MODULE_5__.clientApproveConfirmationButtonPermission)({
      task: task,
      status: status,
      auth: auth
    }) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ClientAcceptedTask__WEBPACK_IMPORTED_MODULE_2__["default"], {
        task: task,
        auth: auth
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Revision_ClientRevision__WEBPACK_IMPORTED_MODULE_4__["default"], {
        task: task,
        auth: auth
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClientApproval);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/client-approval/SubmitForClientApproval.jsx":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/client-approval/SubmitForClientApproval.jsx ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubmitForClientApproval": () => (/* binding */ SubmitForClientApproval)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useClickAway.js");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/Loader */ "./resources/js/react/single-task/components/Loader.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var SubmitForClientApproval = function SubmitForClientApproval(_ref) {
  var task = _ref.task,
    auth = _ref.auth;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var closeModal = function closeModal() {
    return setIsOpen(false);
  };
  var openModal = function openModal() {
    return setIsOpen(true);
  };
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react_use__WEBPACK_IMPORTED_MODULE_6__["default"])(ref, closeModal);
  var _useSubmitForClientAp = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__.useSubmitForClientApprovalMutation)(),
    _useSubmitForClientAp2 = _slicedToArray(_useSubmitForClientAp, 2),
    submitForClientApproval = _useSubmitForClientAp2[0],
    isLoading = _useSubmitForClientAp2[1].isLoading;
  var handleOnSubmit = function handleOnSubmit() {
    submitForClientApproval({
      task_id: task === null || task === void 0 ? void 0 : task.id,
      user_id: auth === null || auth === void 0 ? void 0 : auth.getId()
    }).unwrap().then(function (res) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: 'Submitted Task For Client Approval Successfully',
        showConfirmButton: false,
        timer: 2500
      });
    })["catch"](function (err) {
      return console.log(err);
    })["finally"](function () {
      return closeModal();
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "cursor-processing cnx__btn cnx__btn_sm cnx__btn_primary",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "spinner-border text-white",
            role: "status",
            style: {
              width: "18px",
              height: "18px"
            }
          }), "Processing..."]
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        variant: "success",
        onClick: openModal,
        className: "d-flex align-items-center border-success",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
          className: "fa-solid fa-handshake-angle"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
          className: "d-inline ml-1",
          children: "Submit For Client Approval"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isOpen: isOpen,
      className: "sp1_single_task--modal",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "sp1_single_task--modal-panerl-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          ref: ref,
          className: "sp1_single_task--modal-panel position-absolute p-2 mb-3",
          style: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '250px'
          },
          children: [!isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "d-flex align-items-center border-bottom pb-1",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
              variant: "tertiary",
              onClick: closeModal,
              className: "ml-auto border-0",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
                className: "fa-solid fa-xmark"
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "d-flex flex-column align-items-center p-2",
            style: {
              gap: '10px'
            },
            children: [isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Loader__WEBPACK_IMPORTED_MODULE_4__["default"], {
                title: "Submitting..."
              })
            }), !isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
                src: "/img/warning.gif",
                alt: "",
                style: {
                  width: '50px',
                  height: '50px'
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                className: "d-flex flex-column aling-items-center",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h5", {
                  className: "d-block mb-3",
                  children: "Are You Sure?"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                  className: "d-flex align-items-center justify-content-center",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    onClick: handleOnSubmit,
                    className: "mr-2 py-0",
                    children: "Yes"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    variant: "tertiary",
                    onClick: closeModal,
                    className: "py-0",
                    children: "No"
                  })]
                })]
              })]
            })]
          })]
        })
      })
    })]
  });
};

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/report/Report.jsx":
/*!*******************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/report/Report.jsx ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/Loader */ "./resources/js/react/single-task/components/Loader.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var ReportForm = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./ReportForm */ "./resources/js/react/single-task/section/task-actions/report/ReportForm.jsx"));
});
var ReportControl = function ReportControl(_ref) {
  var task = _ref.task;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    reportModalOpen = _useState2[0],
    setReportModalOpen = _useState2[1];
  var close = function close() {
    return setReportModalOpen(false);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      variant: "tertiary",
      onClick: function onClick() {
        return setReportModalOpen(true);
      },
      className: "ml-auto d-flex align-items-center sp1-st-revision-btn --view-revision sp1_report_btn",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
        className: "fa-solid fa-flag"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
        className: "d-inline ml-1",
        children: "Report"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isOpen: reportModalOpen,
      className: "sp1_single_task--modal",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "sp1_single_task--modal-panerl-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "sp1_single_task--modal-panel task-report-form--modal-panel",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "font-weight-bold f-14",
              children: ["Task#", task === null || task === void 0 ? void 0 : task.id, " : Report"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onClick: close,
              className: "",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("i", {
                className: "fa-solid fa-xmark"
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
            fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "py-3 d-flex align-items-center justify-content-center",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Loader__WEBPACK_IMPORTED_MODULE_4__["default"], {})
            }),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(ReportForm, {
              task: task,
              close: close
            })
          })]
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReportControl);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/stop-timer/LessTrackTimerModal.jsx":
/*!************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/stop-timer/LessTrackTimerModal.jsx ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/Loader */ "./resources/js/react/single-task/components/Loader.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var StopTimerConfrimationPopUp = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.lazy(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_single-task_section_task-actions_stop-timer_StopTimerConfrimationPopUp_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ./StopTimerConfrimationPopUp */ "./resources/js/react/single-task/section/task-actions/stop-timer/StopTimerConfrimationPopUp.jsx"));
});
var LessTrackTimerModal = function LessTrackTimerModal(_ref) {
  var stopTimer = _ref.stopTimer,
    startTimer = _ref.startTimer;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (s) {
      return s.subTask;
    }),
    task = _useSelector.task,
    lessTrackModal = _useSelector.lessTrackModal,
    lessTrackModalFor = _useSelector.lessTrackModalFor;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  var close = function close() {
    dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_2__.setLessTrackModal)({
      show: false,
      type: ''
    }));
  };

  // temprarily stop timer now
  var stopTimerTemprorily = function stopTimerTemprorily() {
    if (lessTrackModalFor === 'STOP_TIMER') {
      stopTimer();
    }
    if (lessTrackModalFor === 'START_TIMER') {
      startTimer();
    }
    close();
  };
  // lessTrackModal
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isOpen: lessTrackModal,
    className: "sp1_single_task--modal",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "sp1_single_task--modal-panerl-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
        fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "sp1_single_task--modal-panel",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_components_Loader__WEBPACK_IMPORTED_MODULE_4__["default"], {})
        }),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(StopTimerConfrimationPopUp, {
          handleTemporarilyStopTimer: stopTimerTemprorily,
          close: close
        })
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LessTrackTimerModal);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/time-extension/RequestTimeExtension.jsx":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/time-extension/RequestTimeExtension.jsx ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_DatePicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/DatePicker */ "./resources/js/react/single-task/components/DatePicker.jsx");
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var RequestTimeExtension = function RequestTimeExtension(_ref) {
  var task = _ref.task,
    _ref$isSubmitting = _ref.isSubmitting,
    isSubmitting = _ref$isSubmitting === void 0 ? false : _ref$isSubmitting,
    onSubmit = _ref.onSubmit,
    close = _ref.close;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    _useState2 = _slicedToArray(_useState, 2),
    date = _useState2[0],
    setDate = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    comment = _useState4[0],
    setComment = _useState4[1];
  var hanldeEditorChange = function hanldeEditorChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };
  var handleSubmittion = function handleSubmittion(e) {
    e.preventDefault();
    var data = {
      task_id: task === null || task === void 0 ? void 0 : task.id,
      date: date,
      comment: comment
    };
    onSubmit(e, data);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "sp1_single_task--modal-panel",
      style: {
        maxWidth: "550px"
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "font-weight-bold f-14",
          children: ["Task # ", task === null || task === void 0 ? void 0 : task.id, ": Request for Time Extension"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          onClick: close,
          className: "",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("form", {
        className: "px-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
            htmlFor: "DateExtention",
            className: "font-weight-bold",
            children: "Extension Date"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_DatePicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
              date: date,
              setDate: setDate,
              className: "w-100 border"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
            htmlFor: "Explaination",
            className: "font-weight-bold",
            children: ["Explanation", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
              children: "*"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "ck-editor-holder",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_3__["default"], {
              onChange: hanldeEditorChange
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
            variant: "tertiary",
            className: "ml-auto mr-2",
            onClick: close,
            children: "Close"
          }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onClick: handleSubmittion,
              children: "Send Request"
            })
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
              className: "cursor-processing",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "spinner-border text-white",
                role: "status",
                style: {
                  width: "18px",
                  height: "18px"
                }
              }), " ", "Processing..."]
            })
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RequestTimeExtension);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/time-extension/ReviewTimeExtensionRequest.jsx":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/time-extension/ReviewTimeExtensionRequest.jsx ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_DatePicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/DatePicker */ "./resources/js/react/single-task/components/DatePicker.jsx");
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var ReviewTimeExtensionRequest = function ReviewTimeExtensionRequest(_ref) {
  var task = _ref.task,
    _ref$isSubmitting = _ref.isSubmitting,
    isSubmitting = _ref$isSubmitting === void 0 ? false : _ref$isSubmitting,
    onSubmit = _ref.onSubmit,
    close = _ref.close;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    _useState2 = _slicedToArray(_useState, 2),
    date = _useState2[0],
    setDate = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    hours = _useState4[0],
    setHours = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    minutes = _useState6[0],
    setMinutes = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    comment = _useState8[0],
    setComment = _useState8[1];
  var hanldeEditorChange = function hanldeEditorChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };
  var handleSubmittion = function handleSubmittion(e) {
    e.preventDefault();
    var data = {
      task_id: task === null || task === void 0 ? void 0 : task.id,
      date: date,
      comment: comment,
      hours: hours,
      minutes: minutes
    };
    onSubmit(e, data);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "sp1_single_task--modal-panel",
      style: {
        maxWidth: "550px"
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "font-weight-bold f-14",
          children: ["Task # ", task === null || task === void 0 ? void 0 : task.id, ": Request for Time Extension"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          onClick: close,
          className: "",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("form", {
        className: "px-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
            htmlFor: "DateExtention",
            className: "font-weight-bold",
            children: "Original Due Date & Time"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "row mx-0",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "col-6 px-1",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "sp1__jquery_date_picker position-relative w-100 border",
                style: {
                  background: '#f5f5f5',
                  cursor: 'not-allowed'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "sp1__jquery_date_btn",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
                    className: "fa-solid fa-calendar-days"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "sp1__jquery_date_text",
                  children: "July 13, 2023"
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "col-3 px-1",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "sp1__jquery_date_picker position-relative w-100 border",
                style: {
                  background: '#f5f5f5',
                  cursor: 'not-allowed'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "sp1__jquery_date_btn",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
                    className: "fa-solid fa-clock"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "sp1__jquery_date_text",
                  children: "04 hours"
                })]
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "col-3 px-1",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "sp1__jquery_date_picker position-relative w-100 border",
                style: {
                  background: '#f5f5f5',
                  cursor: 'not-allowed'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "sp1__jquery_date_btn",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
                    className: "fa-solid fa-clock"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "sp1__jquery_date_text",
                  children: "03 Mins"
                })]
              })
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
            htmlFor: "DateExtention",
            className: "font-weight-bold",
            children: ["Extension Date & Time", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
              children: "*"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "row mx-0",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "col-6 px-1",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                  children: "Date"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_DatePicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
                  date: date,
                  setDate: setDate,
                  className: "w-100 border"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "col-3 px-1",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                  children: "Hours"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "sp1__jquery_date_picker position-relative w-100 border p-0",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                    className: "sp1__jquery_date_text",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                      type: "number",
                      value: hours,
                      onChange: function onChange(e) {
                        return setHours(e.target.value);
                      },
                      className: "w-100 bg-transparent border-0 h-100 py-2 px-3"
                    })
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "col-3 px-1",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                  children: "Minutes"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "sp1__jquery_date_picker position-relative w-100 border p-0",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                    className: "sp1__jquery_date_text",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                      type: "number",
                      value: minutes,
                      onChange: function onChange(e) {
                        return setMinutes(e.target.value);
                      },
                      className: "w-100 bg-transparent border-0 h-100 py-2 px-3"
                    })
                  })
                })]
              })]
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
            htmlFor: "Explaination",
            className: "font-weight-bold",
            children: ["Explanation", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
              children: "*"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "ck-editor-holder",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_3__["default"], {
              onChange: hanldeEditorChange
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
            variant: "tertiary",
            className: "ml-auto mr-2",
            onClick: close,
            children: "Close"
          }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onClick: handleSubmittion,
              children: "Send Request"
            })
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
              className: "cursor-processing",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "spinner-border text-white",
                role: "status",
                style: {
                  width: "18px",
                  height: "18px"
                }
              }), " ", "Processing..."]
            })
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReviewTimeExtensionRequest);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/time-extension/TimeExtension.jsx":
/*!**********************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/time-extension/TimeExtension.jsx ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _RequestTimeExtension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RequestTimeExtension */ "./resources/js/react/single-task/section/task-actions/time-extension/RequestTimeExtension.jsx");
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var _ReviewTimeExtensionRequest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ReviewTimeExtensionRequest */ "./resources/js/react/single-task/section/task-actions/time-extension/ReviewTimeExtensionRequest.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var TimeExtension = function TimeExtension(_ref) {
  var task = _ref.task;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    timeExtensionModal = _useState2[0],
    setTimeExtensionModal = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('REQUEST_TIME_EXTENSION'),
    _useState4 = _slicedToArray(_useState3, 2),
    showFor = _useState4[0],
    setShowFor = _useState4[1];
  var singleTask = new _utils_single_task__WEBPACK_IMPORTED_MODULE_3__.SingleTask(task);

  // on submit a form
  var handleSubmittion = function handleSubmittion(e, data) {
    e.preventDefault();
    console.log(data);
  };
  var open = function open(type) {
    setTimeExtensionModal(true);
    setShowFor(type);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      variant: "tertiary",
      onClick: function onClick() {
        return open('REQUEST_TIME_EXTENSION');
      },
      className: "d-flex align-items-center btn-outline-dark text-dark",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
        className: "fa-regular fa-clock"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "d-inline ml-1",
        children: "Request Time Extension"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
      variant: "success",
      onClick: function onClick() {
        return open('REVIEW_TIME_EXTENSION');
      },
      className: "d-flex align-items-center border-success",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
        className: "fa-regular fa-clock"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "d-inline ml-1",
        children: "Time Extension Request"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isOpen: timeExtensionModal,
      className: "sp1_single_task--modal",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "sp1_single_task--modal-panerl-wrapper",
        children: [showFor === 'REQUEST_TIME_EXTENSION' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_RequestTimeExtension__WEBPACK_IMPORTED_MODULE_2__["default"], {
          task: singleTask,
          close: function close() {
            return setTimeExtensionModal(false);
          },
          onSubmit: handleSubmittion
        }), showFor === 'REVIEW_TIME_EXTENSION' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ReviewTimeExtensionRequest__WEBPACK_IMPORTED_MODULE_5__["default"], {
          task: singleTask,
          close: function close() {
            return setTimeExtensionModal(false);
          },
          onSubmit: handleSubmittion
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeExtension);

/***/ }),

/***/ "./resources/js/react/single-task/section/time-logs/InnerTableRow.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/time-logs/InnerTableRow.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var TableRow = function TableRow(_ref) {
  var log = _ref.log;
  var user = log !== null && log !== void 0 && log.user ? new _utils_user_details__WEBPACK_IMPORTED_MODULE_0__.User(log.user) : null;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("tr", {
    className: "__tbody_tr",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
      className: "__tbody_td _tbody_td_employee",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
        src: user === null || user === void 0 ? void 0 : user.getAvatar(),
        alt: user === null || user === void 0 ? void 0 : user.getName()
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "px-2",
        children: user === null || user === void 0 ? void 0 : user.getName()
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
      className: "__tbody_td _tbody_td_start_time",
      children: [dayjs__WEBPACK_IMPORTED_MODULE_1___default()(log === null || log === void 0 ? void 0 : log.start_time).format('MMM DD, YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_1___default()(log === null || log === void 0 ? void 0 : log.start_time).format('hh:mm a')]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
      className: "__tbody_td _tbody_td_start_time _tbody_td_start_end",
      children: log !== null && log !== void 0 && log.end_time ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
        children: [dayjs__WEBPACK_IMPORTED_MODULE_1___default()(log === null || log === void 0 ? void 0 : log.end_time).format('MMM DD, YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_1___default()(log === null || log === void 0 ? void 0 : log.start_time).format('hh:mm a')]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "text-success font-weight-bold",
        children: "Active"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
      className: "__tbody_td _tbody_td_memo",
      children: log === null || log === void 0 ? void 0 : log.memo
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
      className: "__tbody_td _tbody_td_hour_logged",
      children: log === null || log === void 0 ? void 0 : log.hours_logged
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableRow);

/***/ }),

/***/ "./resources/js/react/single-task/section/time-logs/TimeLogItemLoader.jsx":
/*!********************************************************************************!*\
  !*** ./resources/js/react/single-task/section/time-logs/TimeLogItemLoader.jsx ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }




var TimeLogItemLoader = function TimeLogItemLoader(_ref) {
  _objectDestructuringEmpty(_ref);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "d-flex align-items-center justify-content-between sp1_tark_right_item py-2",
    style: {
      gap: '10px',
      height: '30px'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "d-flex align-items-center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
        width: "24px",
        height: "24px",
        type: "circle",
        className: "mr-2"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "sp1_time_log_emplyee_name",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "100px"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
        height: "10px",
        width: "50px"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
        height: "10px",
        width: "50px"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
        height: "10px",
        width: "50px"
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLogItemLoader);

/***/ }),

/***/ "./resources/js/react/single-task/section/time-logs/TimeLogSection.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/react/single-task/section/time-logs/TimeLogSection.jsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TimeLogTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimeLogTable */ "./resources/js/react/single-task/section/time-logs/TimeLogTable.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/features/subTaskSlice */ "./resources/js/react/services/features/subTaskSlice.js");
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var _TimeLogItemLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TimeLogItemLoader */ "./resources/js/react/single-task/section/time-logs/TimeLogItemLoader.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TimeLogItem = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_single-task_section_time-logs_TimeLogItem_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ./TimeLogItem */ "./resources/js/react/single-task/section/time-logs/TimeLogItem.jsx"));
});









var fetcher = function fetcher(url) {
  return axios.get(url).then(function (res) {
    return res.data;
  });
};
var TimeLogSection = function TimeLogSection() {
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (s) {
      return s.subTask;
    }),
    task = _useSelector.task,
    timeLogs = _useSelector.timeLogs;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    modalRefButton = _React$useState2[0],
    setModalRefButton = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    isOpen = _React$useState4[0],
    setIsOpen = _React$useState4[1];
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();

  // get data
  // fetch all task 
  var _useLazyGetTaskDetail = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_3__.useLazyGetTaskDetailsQuery)('', {
      skip: timeLogs === null || timeLogs === void 0 ? void 0 : timeLogs.length
    }),
    _useLazyGetTaskDetail2 = _slicedToArray(_useLazyGetTaskDetail, 2),
    getTaskDetails = _useLazyGetTaskDetail2[0],
    isFetching = _useLazyGetTaskDetail2[1].isFetching;

  // if task notes fetch completed store data into redux store
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if (task && task.id) {
      getTaskDetails("/".concat(task === null || task === void 0 ? void 0 : task.id, "/json?mode=task_time_log")).unwrap().then(function (res) {
        if (res) {
          dispatch((0,_services_features_subTaskSlice__WEBPACK_IMPORTED_MODULE_4__.storeTimeLogs)(res));
        }
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, [task]);

  // control modal
  var toggle = function toggle() {
    return setIsOpen(!isOpen);
  };
  var close = function close() {
    return setIsOpen(false);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: "sp1_task_right_card mb-3",
    ref: setModalRefButton,
    style: {
      zIndex: isOpen ? '99' : ''
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      className: "d-flex border-bottom pb-2 align-items-center justify-content-between mb-2 font-weight-bold",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
        className: "f-16",
        children: "Session Logs"
      }), isFetching && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "spinner-border text-dark ml-2 mr-auto",
        role: "status",
        style: {
          width: '16px',
          height: '16px',
          border: '0.14em solid rgba(0, 0, 0, .25)',
          borderRightColor: 'transparent'
        }
      })]
    }), lodash__WEBPACK_IMPORTED_MODULE_7___default().size(timeLogs) > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("button", {
      "aria-label": "openCommentModalButton",
      className: "sp1_task_right_dl_toggle",
      onClick: toggle,
      style: {
        zIndex: isOpen ? 110 : ''
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("i", {
        className: "fa-solid fa-circle-chevron-".concat(isOpen ? 'right' : 'left'),
        style: {
          color: "#276fec"
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_TimeLogTable__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isOpen: isOpen,
      close: close,
      toggle: modalRefButton,
      data: timeLogs
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "sp1_task_right_card--body",
      children: lodash__WEBPACK_IMPORTED_MODULE_7___default().size(timeLogs) > 0 ? lodash__WEBPACK_IMPORTED_MODULE_7___default().map(timeLogs, function (log) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
            fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_TimeLogItemLoader__WEBPACK_IMPORTED_MODULE_6__["default"], {}),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(TimeLogItem, {
              log: log
            })
          })
        }, log.id);
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
        className: "d-flex align-items-center justify-content-center",
        style: {
          color: "#B4BCC4",
          fontSize: "15px",
          textAlign: "center",
          height: "100%",
          width: "100%"
        },
        children: "No Logged Session is Available"
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLogSection);

/***/ }),

/***/ "./resources/js/react/single-task/section/time-logs/TimeLogTable.jsx":
/*!***************************************************************************!*\
  !*** ./resources/js/react/single-task/section/time-logs/TimeLogTable.jsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_CustomModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/CustomModal */ "./resources/js/react/single-task/components/CustomModal.jsx");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Modal */ "./resources/js/react/single-task/components/Modal.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useWindowSize.js");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useClickAway.js");
/* harmony import */ var _InnerTableRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InnerTableRow */ "./resources/js/react/single-task/section/time-logs/InnerTableRow.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _global_Avatar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../global/Avatar */ "./resources/js/react/global/Avatar.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");












var Table = function Table(_ref) {
  var data = _ref.data;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("table", {
    className: "sp1_subtask_log-tbl",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("thead", {
      className: "__thead",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("tr", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("th", {
          children: "Employee"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("th", {
          children: "Start Time"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("th", {
          children: "End Time"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("th", {
          children: "Memo"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("th", {
          children: "Hours Logged"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("tbody", {
      className: "__tbody",
      children: data ? data.map(function (log) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_InnerTableRow__WEBPACK_IMPORTED_MODULE_3__["default"], {
          log: log
        }, log.id);
      }) : null
    })]
  });
};
var Card = function Card(_ref2) {
  var log = _ref2.log,
    className = _ref2.className;
  var user = new _utils_user_details__WEBPACK_IMPORTED_MODULE_6__.User(log.user);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    className: "border-bottom ".concat(className),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      className: "d-flex align-items-center",
      style: {
        gap: '10px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_global_Avatar__WEBPACK_IMPORTED_MODULE_5__["default"], {
        src: user === null || user === void 0 ? void 0 : user.getAvatar(),
        name: user === null || user === void 0 ? void 0 : user.getName(),
        alt: user === null || user === void 0 ? void 0 : user.getName(),
        type: "circle"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("h6", {
        children: user === null || user === void 0 ? void 0 : user.getName()
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      className: "d-flex flex-column flex-wrap ml-5",
      style: {
        gap: '4px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
          className: "font-weight-bold",
          children: "Memo:"
        }), " ", log === null || log === void 0 ? void 0 : log.memo]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
          className: "font-weight-bold",
          children: "Hours Logged:"
        }), " ", log === null || log === void 0 ? void 0 : log.hours_logged]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
          className: "font-weight-bold",
          children: "Start Time:"
        }), " ", dayjs__WEBPACK_IMPORTED_MODULE_7___default()(log === null || log === void 0 ? void 0 : log.start_time).format('MMM DD, YYYY hh:mm a'), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("span", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
          className: "font-weight-bold",
          children: "End Time:"
        }), " ", dayjs__WEBPACK_IMPORTED_MODULE_7___default()(log === null || log === void 0 ? void 0 : log.end_time).format('MMM DD, YYYY hh:mm a'), " "]
      })]
    })]
  });
};
var CardView = function CardView(_ref3) {
  var data = _ref3.data;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
    className: "d-flex flex-column",
    style: {
      gap: '10px'
    },
    children: lodash__WEBPACK_IMPORTED_MODULE_4___default().map(data, function (log) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(Card, {
        log: log,
        className: "w-100 py-2"
      }, log.id);
    })
  });
};
var TimeLogTable = function TimeLogTable(_ref4) {
  var isOpen = _ref4.isOpen,
    close = _ref4.close,
    toggle = _ref4.toggle,
    _ref4$data = _ref4.data,
    data = _ref4$data === void 0 ? [] : _ref4$data;
  var ref = react__WEBPACK_IMPORTED_MODULE_0___default().useRef(null);
  var _useWindowSize = (0,react_use__WEBPACK_IMPORTED_MODULE_10__["default"])(),
    deviceWidth = _useWindowSize.width;
  (0,react_use__WEBPACK_IMPORTED_MODULE_11__["default"])(ref, close);
  var content = function content() {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
      ref: ref,
      className: "sp1-subtask-form --modal-panel",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "sp1-subtask-form --modal-panel-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("h6", {
          children: "Session Logs"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_8__["default"], {
          "aria-label": "close-modal",
          className: "_close-modal",
          onClick: close,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
        className: "sp1-subtask-form --modal-panel-body",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "mt-3",
          children: deviceWidth > 800 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(Table, {
            data: data
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(CardView, {
            data: data
          })
        })
      })]
    });
  };
  if (deviceWidth > 1200) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_CustomModal__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isOpen: isOpen,
      toggleRef: toggle,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
        children: content()
      })
    });
  } else {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isOpen: isOpen,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
        children: content()
      })
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLogTable);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./resources/js/react/file-upload/file-upload.css":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./resources/js/react/file-upload/file-upload.css ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\r\n.upload-file-modal{ \r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.upload-file-modal .__panel{\r\n    width: 100%;\r\n    max-width: 60vw;\r\n    height: 100%;\r\n    max-height: 80vh;\r\n    min-height: 60vh;\r\n    background-color: #fff;\r\n    border-radius: 16px;\r\n    display: -moz-grid;\r\n    display: grid;\r\n    grid-template-rows: 48px 1fr;\r\n}\r\n\r\n\r\n.upload-file-modal .__panel .__navbar{\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 10px 16px 10px 24px;\r\n    border-bottom: 1px solid #f0f0f0;\r\n}\r\n\r\n.upload-file-modal .__panel .__navbar h5{\r\n    margin: 0;\r\n    font-weight: 600;\r\n    color: #777;\r\n}\r\n\r\n.file_upload_panel__body{\r\n    padding: 10px 24px;\r\n    overflow: hidden;\r\n    display: -moz-grid;\r\n    display: grid;\r\n    height: 100%;\r\n    grid-template-rows: 250px 1fr;\r\n    padding-bottom: 24px;\r\n}\r\n\r\n\r\n.file_upload_panel__body .__upload_new{\r\n    width: 100%;\r\n    height: 250px;\r\n    background: #f6f6f6;\r\n    border-radius: 10px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    flex-direction: column;\r\n    position: relative;\r\n}\r\n\r\n.file_upload_panel__body .__upload_new .fa-cloud-arrow-up{\r\n   font-size: 120px;\r\n   color: #c4c4c4;\r\n   display: block;\r\n}\r\n\r\n.file-upload-input{\r\n    width: 100%;\r\n    height: 100%;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 1;\r\n    opacity: 0;\r\n}\r\n\r\n.sp1-uploaded-files_list{\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 20px;\r\n    overflow-y: auto; \r\n    height: 100%;\r\n    padding-bottom: 24px;\r\n}\r\n\r\n\r\n.sp1-uploaded-files .__title{\r\n    font-weight: 600;\r\n    color: #777;\r\n    font-size: 16px;\r\n}\r\n\r\n\r\n.sp1_uploaded_file{\r\n    width: 100px;\r\n    height: 100px;\r\n    border-radius: 8px;\r\n    background: #f3f3f3;\r\n}\r\n.sp1-uploaded-files .__files_list{\r\n    display: flex;\r\n    align-items: center;\r\n    flex-wrap: wrap;\r\n    gap: 10px;\r\n}\r\n\r\n\r\n.sp1_file_upload--input-preview{\r\n    border: 1px solid rgba(0 0 0 / 10%);\r\n    padding: 6px 10px;\r\n    border-radius: 4px;\r\n    color: #777;\r\n    width: 100px;\r\n    height: 100px;\r\n    position: relative;\r\n    transition: background .4s ease-in-out;\r\n}\r\n\r\n\r\n.sp1_file_upload--input-preview:hover{\r\n    background: rgb(0 0 0 / 5%)\r\n}\r\n\r\n\r\n.sp1_file_upload--input-preview\r\n.uploaded-file-ext{\r\n    font-size: 14px;\r\n}\r\n\r\n.sp1_file_upload--input-preview\r\n.uploaded-file-ext-sm{\r\n    padding: 0px 4px; \r\n    bottom: 15px !important;\r\n}\r\n\r\n\r\n\r\n.sp1_file_upload--input-preview  .uploaded-file-name{\r\n    font-size: 14px; \r\n    margin-top: 0;\r\n}\r\n\r\n\r\n\r\n/* file uploader  */\r\n\r\n.sp1_file_upload--input-wrapper{\r\n    position: relative;\r\n    width: 100px;\r\n    height: 100px;\r\n    border-radius: 8px;\r\n    background: #f3f3f3;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n    color: rgba(77, 86, 105, 0.8);\r\n    cursor: pointer;\r\n}\r\n\r\n.sp1_file_upload--input-wrapper:hover{\r\n    color: rgba(14, 21, 36, 0.966) \r\n}\r\n\r\n.sp1_file_upload--input-wrapper i.fa-cloud-arrow-up{\r\n    font-size: 2.2rem;\r\n}\r\n\r\n.sp1_file_upload--input{\r\n    width: 100%;\r\n    height: 100%;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 1;\r\n    opacity: 0;\r\n}\r\n\r\n.sp1_file_upload--input-preview .__remove--btn{\r\n    position: absolute;\r\n    top: 3px;\r\n    right: 3px;\r\n    padding: 4px;\r\n    background-color: #ff401f;\r\n    color: #fff;\r\n    cursor: pointer;\r\n    border-color: #ff401f;\r\n    z-index: 2;\r\n}\r\n\r\n.sp1_file_upload--input-preview .__remove--btn i{ \r\n    -moz-user-select: none;\r\n    -webkit-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n/* end file uploader  */", "",{"version":3,"sources":["webpack://./resources/js/react/file-upload/file-upload.css"],"names":[],"mappings":";AACA;IACI,aAAa;IACb,mBAAmB;IACnB,uBAAuB;AAC3B;;AAEA;IACI,WAAW;IACX,eAAe;IACf,YAAY;IACZ,gBAAgB;IAChB,gBAAgB;IAChB,sBAAsB;IACtB,mBAAmB;IAEnB,kBAAkB;IAClB,aAAa;IACb,4BAA4B;AAChC;;;AAGA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,4BAA4B;IAC5B,gCAAgC;AACpC;;AAEA;IACI,SAAS;IACT,gBAAgB;IAChB,WAAW;AACf;;AAEA;IACI,kBAAkB;IAClB,gBAAgB;IAChB,kBAAkB;IAElB,aAAa;IACb,YAAY;IACZ,6BAA6B;IAC7B,oBAAoB;AACxB;;;AAGA;IACI,WAAW;IACX,aAAa;IACb,mBAAmB;IACnB,mBAAmB;IACnB,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IAEvB,sBAAsB;IACtB,kBAAkB;AACtB;;AAEA;GACG,gBAAgB;GAChB,cAAc;GACd,cAAc;AACjB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,MAAM;IACN,OAAO;IACP,UAAU;IACV,UAAU;AACd;;AAEA;IACI,aAAa;IAEb,sBAAsB;IACtB,SAAS;IACT,gBAAgB;IAChB,YAAY;IACZ,oBAAoB;AACxB;;;AAGA;IACI,gBAAgB;IAChB,WAAW;IACX,eAAe;AACnB;;;AAGA;IACI,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,mBAAmB;AACvB;AACA;IACI,aAAa;IACb,mBAAmB;IAEnB,eAAe;IACf,SAAS;AACb;;;AAGA;IACI,mCAAmC;IACnC,iBAAiB;IACjB,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,sCAAsC;AAC1C;;;AAGA;IACI;AACJ;;;AAGA;;IAEI,eAAe;AACnB;;AAEA;;IAEI,gBAAgB;IAChB,uBAAuB;AAC3B;;;;AAIA;IACI,eAAe;IACf,aAAa;AACjB;;;;AAIA,mBAAmB;;AAEnB;IACI,kBAAkB;IAClB,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,mBAAmB;IACnB,aAAa;IAEb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;IACvB,6BAA6B;IAC7B,eAAe;AACnB;;AAEA;IACI;AACJ;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,MAAM;IACN,OAAO;IACP,UAAU;IACV,UAAU;AACd;;AAEA;IACI,kBAAkB;IAClB,QAAQ;IACR,UAAU;IACV,YAAY;IACZ,yBAAyB;IACzB,WAAW;IACX,eAAe;IACf,qBAAqB;IACrB,UAAU;AACd;;AAEA;IACI,sBAAsB;IACtB,yBAAyB;IACzB,iBAAiB;AACrB;;AAEA,uBAAuB","sourcesContent":["\r\n.upload-file-modal{ \r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n}\r\n\r\n.upload-file-modal .__panel{\r\n    width: 100%;\r\n    max-width: 60vw;\r\n    height: 100%;\r\n    max-height: 80vh;\r\n    min-height: 60vh;\r\n    background-color: #fff;\r\n    border-radius: 16px;\r\n    display: -ms-grid;\r\n    display: -moz-grid;\r\n    display: grid;\r\n    grid-template-rows: 48px 1fr;\r\n}\r\n\r\n\r\n.upload-file-modal .__panel .__navbar{\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 10px 16px 10px 24px;\r\n    border-bottom: 1px solid #f0f0f0;\r\n}\r\n\r\n.upload-file-modal .__panel .__navbar h5{\r\n    margin: 0;\r\n    font-weight: 600;\r\n    color: #777;\r\n}\r\n\r\n.file_upload_panel__body{\r\n    padding: 10px 24px;\r\n    overflow: hidden;\r\n    display: -moz-grid;\r\n    display: -ms-grid;\r\n    display: grid;\r\n    height: 100%;\r\n    grid-template-rows: 250px 1fr;\r\n    padding-bottom: 24px;\r\n}\r\n\r\n\r\n.file_upload_panel__body .__upload_new{\r\n    width: 100%;\r\n    height: 250px;\r\n    background: #f6f6f6;\r\n    border-radius: 10px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    -ms-flex-direction: column;\r\n    flex-direction: column;\r\n    position: relative;\r\n}\r\n\r\n.file_upload_panel__body .__upload_new .fa-cloud-arrow-up{\r\n   font-size: 120px;\r\n   color: #c4c4c4;\r\n   display: block;\r\n}\r\n\r\n.file-upload-input{\r\n    width: 100%;\r\n    height: 100%;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 1;\r\n    opacity: 0;\r\n}\r\n\r\n.sp1-uploaded-files_list{\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n    flex-direction: column;\r\n    gap: 20px;\r\n    overflow-y: auto; \r\n    height: 100%;\r\n    padding-bottom: 24px;\r\n}\r\n\r\n\r\n.sp1-uploaded-files .__title{\r\n    font-weight: 600;\r\n    color: #777;\r\n    font-size: 16px;\r\n}\r\n\r\n\r\n.sp1_uploaded_file{\r\n    width: 100px;\r\n    height: 100px;\r\n    border-radius: 8px;\r\n    background: #f3f3f3;\r\n}\r\n.sp1-uploaded-files .__files_list{\r\n    display: flex;\r\n    align-items: center;\r\n    -ms-flex-wrap: wrap;\r\n    flex-wrap: wrap;\r\n    gap: 10px;\r\n}\r\n\r\n\r\n.sp1_file_upload--input-preview{\r\n    border: 1px solid rgba(0 0 0 / 10%);\r\n    padding: 6px 10px;\r\n    border-radius: 4px;\r\n    color: #777;\r\n    width: 100px;\r\n    height: 100px;\r\n    position: relative;\r\n    transition: background .4s ease-in-out;\r\n}\r\n\r\n\r\n.sp1_file_upload--input-preview:hover{\r\n    background: rgb(0 0 0 / 5%)\r\n}\r\n\r\n\r\n.sp1_file_upload--input-preview\r\n.uploaded-file-ext{\r\n    font-size: 14px;\r\n}\r\n\r\n.sp1_file_upload--input-preview\r\n.uploaded-file-ext-sm{\r\n    padding: 0px 4px; \r\n    bottom: 15px !important;\r\n}\r\n\r\n\r\n\r\n.sp1_file_upload--input-preview  .uploaded-file-name{\r\n    font-size: 14px; \r\n    margin-top: 0;\r\n}\r\n\r\n\r\n\r\n/* file uploader  */\r\n\r\n.sp1_file_upload--input-wrapper{\r\n    position: relative;\r\n    width: 100px;\r\n    height: 100px;\r\n    border-radius: 8px;\r\n    background: #f3f3f3;\r\n    display: flex;\r\n    -ms-flex-direction: column;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n    color: rgba(77, 86, 105, 0.8);\r\n    cursor: pointer;\r\n}\r\n\r\n.sp1_file_upload--input-wrapper:hover{\r\n    color: rgba(14, 21, 36, 0.966) \r\n}\r\n\r\n.sp1_file_upload--input-wrapper i.fa-cloud-arrow-up{\r\n    font-size: 2.2rem;\r\n}\r\n\r\n.sp1_file_upload--input{\r\n    width: 100%;\r\n    height: 100%;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 1;\r\n    opacity: 0;\r\n}\r\n\r\n.sp1_file_upload--input-preview .__remove--btn{\r\n    position: absolute;\r\n    top: 3px;\r\n    right: 3px;\r\n    padding: 4px;\r\n    background-color: #ff401f;\r\n    color: #fff;\r\n    cursor: pointer;\r\n    border-color: #ff401f;\r\n    z-index: 2;\r\n}\r\n\r\n.sp1_file_upload--input-preview .__remove--btn i{ \r\n    -moz-user-select: none;\r\n    -webkit-user-select: none;\r\n    user-select: none;\r\n}\r\n\r\n/* end file uploader  */"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./resources/js/react/file-upload/file-upload.css":
/*!********************************************************!*\
  !*** ./resources/js/react/file-upload/file-upload.css ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_file_upload_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./file-upload.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./resources/js/react/file-upload/file-upload.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_file_upload_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_file_upload_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);
//# sourceMappingURL=resources_js_react_single-task_SingleTask_jsx.js.map