"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_employee-evaluation_pages_EmployeeEvaluation_jsx"],{

/***/ "./resources/js/react/employee-evaluation/components/Button.jsx":
/*!**********************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Button.jsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _button_module_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button.module.css */ "./resources/js/react/employee-evaluation/components/button.module.css");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loader */ "./resources/js/react/employee-evaluation/components/Loader.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["children", "type", "disabled", "className", "variant", "size", "onClick", "isLoading", "loaderTitle", "dataTip", "toolTipId", "dataTooltipHidden"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




/**
 * This is a button Component
 * props
 *  * variant ["primary", "secondary", "tertiary", "success", "danger"]
 */

var Button = function Button(_ref) {
  var children = _ref.children,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "submit" : _ref$type,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? "primary" : _ref$variant,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "sm" : _ref$size,
    onClick = _ref.onClick,
    _ref$isLoading = _ref.isLoading,
    isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
    _ref$loaderTitle = _ref.loaderTitle,
    loaderTitle = _ref$loaderTitle === void 0 ? "Loading..." : _ref$loaderTitle,
    dataTip = _ref.dataTip,
    toolTipId = _ref.toolTipId,
    dataTooltipHidden = _ref.dataTooltipHidden,
    props = _objectWithoutProperties(_ref, _excluded);
  var variantClass = {
    primary: _button_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].cnx__btn_primary,
    secondary: _button_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].cnx__btn_secondary,
    tertiary: _button_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].cnx__btn_tertiary,
    success: _button_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].cnx__btn_success,
    danger: _button_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].cnx__btn_danger
  };
  var sizeObject = {
    sm: _button_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].cnx__btn_sm,
    md: _button_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].cnx__btn_md,
    lg: _button_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].cnx__btn_lg
  };
  var classes = "".concat(_button_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].cnx__btn, " ").concat(variantClass[variant], " ").concat(disabled ? _button_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].cnx__btn_disabled : "", " ").concat(sizeObject[size], " ").concat(className);
  var handleOnClick = function handleOnClick(e) {
    onClick && onClick(e);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", _objectSpread(_objectSpread({
    "data-tooltip-id": toolTipId !== null && toolTipId !== void 0 ? toolTipId : "",
    "data-tooltip-content": dataTip !== null && dataTip !== void 0 ? dataTip : "",
    "data-tooltip-place": "top",
    "data-tooltip-hidden": dataTooltipHidden !== null && dataTooltipHidden !== void 0 ? dataTooltipHidden : true,
    type: type,
    style: {
      fontSize: "12px"
    },
    className: "".concat(classes, " ").concat(isLoading ? _button_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].cnx__btn_loading : ""),
    disabled: disabled || isLoading,
    onClick: disabled || isLoading ? null : handleOnClick
  }, props), {}, {
    children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Loader__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: loaderTitle,
      borderRightColor: "white"
    }) : children
  }));
};
Button.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().node).isRequired || (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string).isRequired || (prop_types__WEBPACK_IMPORTED_MODULE_3___default().array).isRequired,
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  variant: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(["primary", "secondary", "tertiary", "success", "danger"]),
  size: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOf(["sm", "md", "lg"]),
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func),
  href: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  isLoading: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  loaderTitle: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/EvaluationTableFilterBar.jsx":
/*!****************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/EvaluationTableFilterBar.jsx ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Table_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Table/ui */ "./resources/js/react/employee-evaluation/components/Table/ui.jsx");
/* harmony import */ var _global_Searchbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../global/Searchbox */ "./resources/js/react/global/Searchbox.jsx");
/* harmony import */ var _hooks_useUsers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useUsers */ "./resources/js/react/hooks/useUsers.jsx");
/* harmony import */ var _Table_JqueryDateRangePicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Table/JqueryDateRangePicker */ "./resources/js/react/employee-evaluation/components/Table/JqueryDateRangePicker.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var EvaluationTableFilterBar = function EvaluationTableFilterBar(_ref) {
  var setFilter = _ref.setFilter;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    startDate = _React$useState2[0],
    setStartDate = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    endDate = _React$useState4[0],
    setEndDate = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    search = _React$useState6[0],
    setSearch = _React$useState6[1];
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    sale = _React$useState8[0],
    setSale = _React$useState8[1];
  var searchText = react__WEBPACK_IMPORTED_MODULE_0___default().useDeferredValue(search);
  var _startData = react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(function () {
    return startDate;
  }, [startDate]);
  var _endData = react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(function () {
    return endDate;
  }, [endDate]);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    setFilter(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        start_date: _startData,
        end_date: _endData
      });
    });
  }, [_startData, _endData]);

  // search data
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    setFilter(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, {
        search: searchText
      });
    });
  }, [searchText]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "w-100 bg-white py-2",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
        justifyContent: "flex-start",
        className: "px-3",
        flexWrap: "wrap",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Table_JqueryDateRangePicker__WEBPACK_IMPORTED_MODULE_6__["default"], {
          startDate: startDate,
          setStartDate: setStartDate,
          endDate: endDate,
          setEndDate: setEndDate
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          style: {
            width: "256px"
          },
          className: "px-3 border-left",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Searchbox__WEBPACK_IMPORTED_MODULE_4__["default"], {
            value: search,
            onChange: setSearch
          })
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EvaluationTableFilterBar);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Loader.jsx":
/*!**********************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Loader.jsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");


var Loader = function Loader(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? "Loading..." : _ref$title,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "16px" : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "16px" : _ref$height,
    _ref$border = _ref.border,
    border = _ref$border === void 0 ? "0.14em solid rgba(0, 0, 0, .25)" : _ref$border,
    _ref$borderRightColor = _ref.borderRightColor,
    borderRightColor = _ref$borderRightColor === void 0 ? "transparent" : _ref$borderRightColor;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "d-flex align-items-center",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "spinner-border text-dark mr-2",
      role: "status",
      style: {
        width: width,
        height: height,
        border: border,
        borderRightColor: borderRightColor
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      children: title
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/RefreshButton.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/RefreshButton.jsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RefreshButton)
/* harmony export */ });
/* harmony import */ var _global_Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../global/Button */ "./resources/js/react/global/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["onClick", "isLoading"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


function RefreshButton(_ref) {
  var onClick = _ref.onClick,
    isLoading = _ref.isLoading,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_global_Button__WEBPACK_IMPORTED_MODULE_0__["default"], _objectSpread(_objectSpread({
    onClick: onClick,
    isLoading: isLoading,
    loaderTitle: "Refreshing..."
  }, rest), {}, {
    children: "Refresh"
  }));
}

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/ActionEvaluationRequiredRoundTable.jsx":
/*!********************************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/ActionEvaluationRequiredRoundTable.jsx ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../hooks/useAuth */ "./resources/js/react/hooks/useAuth.jsx");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Button */ "./resources/js/react/employee-evaluation/components/Button.jsx");
/* harmony import */ var _global_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../global/Switch */ "./resources/js/react/global/Switch.jsx");
/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-tooltip */ "./node_modules/react-tooltip/dist/react-tooltip.min.mjs");
/* harmony import */ var _zustand_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../zustand/store */ "./resources/js/react/zustand/store.js");
/* harmony import */ var _modal_EvaluationTaskListModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modal/EvaluationTaskListModal */ "./resources/js/react/employee-evaluation/components/modal/EvaluationTaskListModal.jsx");
/* harmony import */ var _modal_EvaluationRequiredRoundsTaskListModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../modal/EvaluationRequiredRoundsTaskListModal */ "./resources/js/react/employee-evaluation/components/modal/EvaluationRequiredRoundsTaskListModal.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var ActionEvaluationRequiredRoundTable = function ActionEvaluationRequiredRoundTable(_ref) {
  var data = _ref.data,
    round = _ref.round;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isEvaluationModal = _useState2[0],
    setIsEvaluationModal = _useState2[1];
  var _useEmployeeEvaluatio = (0,_zustand_store__WEBPACK_IMPORTED_MODULE_5__["default"])(),
    setEvaluationObject = _useEmployeeEvaluatio.setEvaluationObject;
  var location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.useLocation)();
  var userIdFromParam = new URLSearchParams(location.search).get("user_id");
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    // console.log("userIdFromParam:", userIdFromParam);
    // console.log("data.user_id:", data.user_id);
    if (userIdFromParam == data.user_id) {
      setIsEvaluationModal(true);
    }
  }, [userIdFromParam]);

  // console.log("is evaluation modal", isEvaluationModal);
  var auth = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_1__.useAuth)();
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    toolTipTeamLead = _React$useState2[0],
    setToolTipTeamLead = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    toolTipAdmin = _React$useState4[0],
    setToolTipAdmin = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0___default().useState("primary"),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    buttonVariant = _React$useState6[0],
    setButtonVariant = _React$useState6[1];
  var handleEvaluationClick = function handleEvaluationClick() {
    setIsEvaluationModal(function (prev) {
      return !prev;
    });
    setEvaluationObject(data);
  };
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if ((data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null) {
      setToolTipTeamLead("Currently being evaluated by ".concat(data === null || data === void 0 ? void 0 : data.added_by_name));
    }
  }, [data]);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if ((data === null || data === void 0 ? void 0 : data.team_lead_cmnt) === null) {
      setToolTipAdmin("Currently being Reviewed by Mohammad Sayeed Ullah");
    }
    if ((data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null) {
      setToolTipAdmin("Currently being evaluated by ".concat(data === null || data === void 0 ? void 0 : data.added_by_name));
    }
  }, [data]);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if ((data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) !== null) {
      setButtonVariant("success");
    } else if ((data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null) {
      setButtonVariant("primary");
    }
  }, [data]);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if ((data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) !== null) {
      setButtonVariant("success");
    } else if ((data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null) {
      setButtonVariant("primary");
    }
  }, [data]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      className: "mt-2 mb-2",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"], {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
          condition: auth.isHasRolePermission(6),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"], {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === null,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: function onClick() {
                  handleEvaluationClick();
                  setEvaluationObject(data);
                },
                variant: buttonVariant,
                children: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) !== null ? "Submitted" : "Evaluate"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "Accepted",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "success",
                children: "Accepted"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "Rejected",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "danger",
                children: "Rejected"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "One more week",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "tertiary",
                children: "Extended"
              })
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
          condition: auth.isHasRolePermission(8),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"], {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === null,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                disabled: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null,
                dataTip: toolTipTeamLead,
                toolTipId: "my-tooltip",
                dataTooltipHidden: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) !== null,
                children: (data === null || data === void 0 ? void 0 : data.ld_submission_status) === 0 ? "Evaluating" : (data === null || data === void 0 ? void 0 : data.team_lead_status) === 0 ? "Review" : "Reviewed"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "Accepted",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "success",
                children: "Accepted"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "Rejected",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "danger",
                children: "Rejected"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "One more week",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "tertiary",
                children: "Extended"
              })
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
          condition: auth.isHasRolePermission(1),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"], {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === null,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                dataTip: toolTipAdmin,
                toolTipId: "my-tooltip",
                dataTooltipHidden: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) !== null && (data === null || data === void 0 ? void 0 : data.team_lead_cmnt) !== null,
                onClick: handleEvaluationClick,
                disabled: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null || (data === null || data === void 0 ? void 0 : data.team_lead_cmnt) === null,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"], {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
                    condition: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null,
                    children: "Evaluating"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
                    condition: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) !== null && (data === null || data === void 0 ? void 0 : data.team_lead_cmnt) === null,
                    children: "Reviewing"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
                    condition: (data === null || data === void 0 ? void 0 : data.ld_submission_status) === 1 && (data === null || data === void 0 ? void 0 : data.team_lead_status) === 1,
                    children: "Authorize"
                  })]
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "Accepted",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "success",
                children: "Accepted"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "Rejected",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "danger",
                children: "Rejected"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "One more week",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "tertiary",
                children: "Extended"
              })
            })]
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_modal_EvaluationRequiredRoundsTaskListModal__WEBPACK_IMPORTED_MODULE_7__["default"], {
      round: round,
      singleEvaluation: data,
      setIsEvaluationModal: setIsEvaluationModal,
      isEvaluationModal: isEvaluationModal
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_tooltip__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
      id: "my-tooltip",
      style: {
        zIndex: 99999999999999
      }
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActionEvaluationRequiredRoundTable);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/ActionEvaluationTable.jsx":
/*!*******************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/ActionEvaluationTable.jsx ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../hooks/useAuth */ "./resources/js/react/hooks/useAuth.jsx");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Button */ "./resources/js/react/employee-evaluation/components/Button.jsx");
/* harmony import */ var _global_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../global/Switch */ "./resources/js/react/global/Switch.jsx");
/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-tooltip */ "./node_modules/react-tooltip/dist/react-tooltip.min.mjs");
/* harmony import */ var _zustand_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../zustand/store */ "./resources/js/react/zustand/store.js");
/* harmony import */ var _modal_EvaluationTaskListModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modal/EvaluationTaskListModal */ "./resources/js/react/employee-evaluation/components/modal/EvaluationTaskListModal.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var ActionEvaluationTable = function ActionEvaluationTable(_ref) {
  var data = _ref.data,
    table = _ref.table;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isEvaluationModal = _useState2[0],
    setIsEvaluationModal = _useState2[1];
  var _useEmployeeEvaluatio = (0,_zustand_store__WEBPACK_IMPORTED_MODULE_5__["default"])(),
    setEvaluationObject = _useEmployeeEvaluatio.setEvaluationObject;
  var location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useLocation)();
  var userIdFromParam = new URLSearchParams(location.search).get("user_id");
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    // console.log("userIdFromParam:", userIdFromParam);
    // console.log("data.user_id:", data.user_id);
    if (userIdFromParam == data.user_id) {
      setIsEvaluationModal(true);
    }
  }, [userIdFromParam]);

  // console.log("is evaluation modal", isEvaluationModal);
  var auth = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_1__.useAuth)();
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    toolTipTeamLead = _React$useState2[0],
    setToolTipTeamLead = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    toolTipAdmin = _React$useState4[0],
    setToolTipAdmin = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0___default().useState("primary"),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    buttonVariant = _React$useState6[0],
    setButtonVariant = _React$useState6[1];
  var handleEvaluationClick = function handleEvaluationClick() {
    setIsEvaluationModal(function (prev) {
      return !prev;
    });
    setEvaluationObject(data);
  };
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if ((data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null) {
      setToolTipTeamLead("Currently being evaluated by ".concat(data === null || data === void 0 ? void 0 : data.added_by_name));
    }
  }, [data]);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if ((data === null || data === void 0 ? void 0 : data.team_lead_cmnt) === null) {
      setToolTipAdmin("Currently being Reviewed by Mohammad Sayeed Ullah");
    }
    if ((data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null) {
      setToolTipAdmin("Currently being evaluated by ".concat(data === null || data === void 0 ? void 0 : data.added_by_name));
    }
  }, [data]);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if ((data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) !== null) {
      setButtonVariant("success");
    } else if ((data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null) {
      setButtonVariant("primary");
    }
  }, [data]);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if ((data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) !== null) {
      setButtonVariant("success");
    } else if ((data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null) {
      setButtonVariant("primary");
    }
  }, [data]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "mt-2 mb-2",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"], {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
          condition: auth.isHasRolePermission(6),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"], {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === null,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: function onClick() {
                  handleEvaluationClick();
                  setEvaluationObject(data);
                },
                variant: buttonVariant,
                children: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) !== null ? "Submitted" : "Evaluate"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "Accepted",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "success",
                children: "Accepted"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "Rejected",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "danger",
                children: "Rejected"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "One more week",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "tertiary",
                children: "Extended"
              })
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
          condition: auth.isHasRolePermission(8),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"], {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === null,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                disabled: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null,
                dataTip: toolTipTeamLead,
                toolTipId: "my-tooltip",
                dataTooltipHidden: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) !== null,
                children: (data === null || data === void 0 ? void 0 : data.ld_submission_status) === 0 ? "Evaluating" : (data === null || data === void 0 ? void 0 : data.team_lead_status) === 0 ? "Review" : "Reviewed"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "Accepted",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "success",
                children: "Accepted"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "Rejected",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "danger",
                children: "Rejected"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "One more week",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "tertiary",
                children: "Extended"
              })
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
          condition: auth.isHasRolePermission(1),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"], {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === null,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                dataTip: toolTipAdmin,
                toolTipId: "my-tooltip",
                dataTooltipHidden: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) !== null && (data === null || data === void 0 ? void 0 : data.team_lead_cmnt) !== null,
                onClick: handleEvaluationClick,
                disabled: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null || (data === null || data === void 0 ? void 0 : data.team_lead_cmnt) === null,
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"], {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
                    condition: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) === null,
                    children: "Evaluating"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
                    condition: (data === null || data === void 0 ? void 0 : data.lead_dev_avg_rating) !== null && (data === null || data === void 0 ? void 0 : data.team_lead_cmnt) === null,
                    children: "Reviewing"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
                    condition: (data === null || data === void 0 ? void 0 : data.ld_submission_status) === 1 && (data === null || data === void 0 ? void 0 : data.team_lead_status) === 1,
                    children: "Authorize"
                  })]
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "Accepted",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "success",
                children: "Accepted"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "Rejected",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "danger",
                children: "Rejected"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_3__["default"].Case, {
              condition: (data === null || data === void 0 ? void 0 : data.managements_decision) === "One more week",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleEvaluationClick,
                variant: "tertiary",
                children: "Extended"
              })
            })]
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_modal_EvaluationTaskListModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
      singleEvaluation: data,
      setIsEvaluationModal: setIsEvaluationModal,
      isEvaluationModal: isEvaluationModal
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_tooltip__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
      id: "my-tooltip",
      style: {
        zIndex: 99999999999999
      }
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActionEvaluationTable);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/AssignedTasksData.jsx":
/*!***************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/AssignedTasksData.jsx ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var _TaskModalComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TaskModalComponent */ "./resources/js/react/employee-evaluation/components/Table/TaskModalComponent.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var AssignedTasksData = function AssignedTasksData(_ref) {
  var data = _ref.data;
  var _useGetTaskListQuery = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__.useGetTaskListQuery)(data === null || data === void 0 ? void 0 : data.user_id),
    TaskList = _useGetTaskListQuery.data,
    isLoading = _useGetTaskListQuery.isLoading,
    isFetching = _useGetTaskListQuery.isFetching;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    latestRoundTasks = _useState2[0],
    setLatestRoundTasks = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (TaskList !== null && TaskList !== void 0 && TaskList.data) {
      // Find the latest round number
      var latestRound = Math.max.apply(Math, _toConsumableArray(TaskList.data.map(function (task) {
        return task.round;
      })));

      // Filter tasks that have the latest round
      var tasks = TaskList.data.filter(function (task) {
        return task.round === latestRound;
      });
      setLatestRoundTasks(tasks);
    }
  }, [TaskList]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_TaskModalComponent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    Tasks: latestRoundTasks,
    isLoading: isLoading,
    title: "Total task assigned",
    taskNumbers: latestRoundTasks === null || latestRoundTasks === void 0 ? void 0 : latestRoundTasks.length
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssignedTasksData);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/AssignedTasksDataRequiredRound.jsx":
/*!****************************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/AssignedTasksDataRequiredRound.jsx ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var _TaskModalComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TaskModalComponent */ "./resources/js/react/employee-evaluation/components/Table/TaskModalComponent.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var AssignedTasksDataRequiredRound = function AssignedTasksDataRequiredRound(_ref) {
  var data = _ref.data,
    round = _ref.round;
  var _useGetTaskListQuery = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__.useGetTaskListQuery)(data === null || data === void 0 ? void 0 : data.user_id),
    TaskList = _useGetTaskListQuery.data,
    isLoading = _useGetTaskListQuery.isLoading,
    isFetching = _useGetTaskListQuery.isFetching;
  var Tasks = TaskList === null || TaskList === void 0 ? void 0 : TaskList.data.filter(function (task) {
    return task.round === round;
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_TaskModalComponent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    Tasks: Tasks,
    isLoading: isLoading,
    title: "Total task assigned",
    taskNumbers: Tasks === null || Tasks === void 0 ? void 0 : Tasks.length
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AssignedTasksDataRequiredRound);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/AverageRating.jsx":
/*!***********************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/AverageRating.jsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../react/tasks/components/PrimaryPageAuthorization.module.css */ "./resources/js/react/tasks/components/PrimaryPageAuthorization.module.css");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/ratingHoverText */ "./resources/js/react/utils/ratingHoverText.js");
/* harmony import */ var _modal_RatingSectionStatic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modal/RatingSectionStatic */ "./resources/js/react/employee-evaluation/components/modal/RatingSectionStatic.jsx");
/* harmony import */ var _global_Card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../global/Card */ "./resources/js/react/global/Card.jsx");
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var AverageRating = function AverageRating(_ref) {
  var _totalAverage$toFixed, _totalAverage$toFixed2;
  var data = _ref.data;
  var _useGetTaskListQuery = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_6__.useGetTaskListQuery)(data === null || data === void 0 ? void 0 : data.user_id),
    TaskList = _useGetTaskListQuery.data,
    isLoading = _useGetTaskListQuery.isLoading,
    isFetching = _useGetTaskListQuery.isFetching;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    latestRoundTasks = _useState2[0],
    setLatestRoundTasks = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (TaskList !== null && TaskList !== void 0 && TaskList.data) {
      // Find the latest round number
      var latestRound = Math.max.apply(Math, _toConsumableArray(TaskList.data.map(function (task) {
        return task.round;
      })));

      // Filter tasks that have the latest round
      var tasks = TaskList.data.filter(function (task) {
        return task.round === latestRound && ![1, 2, 3].includes(task === null || task === void 0 ? void 0 : task.task_board_column_id);
      });
      setLatestRoundTasks(tasks);
    }
  }, [TaskList]);
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isRatingModalOpen = _useState4[0],
    setIsRatingModalOpen = _useState4[1];
  var calculateAverage = function calculateAverage(tasks, property) {
    if (!tasks || tasks.length === 0) return 0;
    var total = tasks.reduce(function (acc, task) {
      return acc + (Number(task[property]) || 0);
    }, 0);
    return (total / tasks.length).toFixed(2);
  };
  var qw_first_chance_avg = calculateAverage(latestRoundTasks, "qw_first_chance");
  var qw_first_revision_avg = calculateAverage(latestRoundTasks, "qw_first_revision");
  var qw_second_revision_avg = calculateAverage(latestRoundTasks, "qw_second_revision");
  var speed_of_work_avg = calculateAverage(latestRoundTasks, "speed_of_work");
  var understand_instruction_avg = calculateAverage(latestRoundTasks, "understand_instruction");
  var totalAverage = (Number(qw_first_chance_avg) + Number(qw_first_revision_avg) + Number(qw_second_revision_avg) + Number(speed_of_work_avg) + Number(understand_instruction_avg)) / 5;
  var formFields = [{
    label: "Quality of work (in the first chance)",
    value: qw_first_chance_avg,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.qw_first_chance
  }, {
    label: "Quality of work (After 1st revision)",
    value: qw_first_revision_avg,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.qw_first_revision
  }, {
    label: "Quality of work (After 2nd revision)",
    value: qw_second_revision_avg,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.qw_second_revision
  }, {
    label: "Speed of work",
    value: speed_of_work_avg,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.speed_of_work
  }, {
    label: "Ability to understand instruction",
    value: understand_instruction_avg,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.understand_instruction
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      onClick: function onClick() {
        return setIsRatingModalOpen(true);
      },
      className: "link_color",
      children: (_totalAverage$toFixed = totalAverage.toFixed(2)) !== null && _totalAverage$toFixed !== void 0 ? _totalAverage$toFixed : "N/A"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((react_modal__WEBPACK_IMPORTED_MODULE_2___default()), {
      style: {
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          margin: "auto auto",
          zIndex: 100
        },
        content: {
          borderRadius: "10px",
          height: "fit-content",
          maxHeight: "95vh",
          maxWidth: "500px",
          margin: "auto auto",
          border: "none",
          padding: "0px",
          overflowY: "auto"
        }
      },
      ariaHideApp: false,
      isOpen: isRatingModalOpen,
      onRequestClose: function onRequestClose() {
        return setIsRatingModalOpen(false);
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_global_Card__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].rating_card,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Card__WEBPACK_IMPORTED_MODULE_5__["default"].Head, {
          onClose: function onClose() {
            return setIsRatingModalOpen(false);
          },
          className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].card_head,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              children: "Lead Developer Average Rating"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("span", {
              children: [" ", "(".concat((_totalAverage$toFixed2 = totalAverage.toFixed(2)) !== null && _totalAverage$toFixed2 !== void 0 ? _totalAverage$toFixed2 : "N/A", ")")]
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Card__WEBPACK_IMPORTED_MODULE_5__["default"].Body, {
          className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].card_body,
          children: formFields.map(function (field, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_modal_RatingSectionStatic__WEBPACK_IMPORTED_MODULE_4__["default"], _objectSpread({}, field), index);
          })
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AverageRating);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/AverageRatingRequiredRound.jsx":
/*!************************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/AverageRatingRequiredRound.jsx ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../react/tasks/components/PrimaryPageAuthorization.module.css */ "./resources/js/react/tasks/components/PrimaryPageAuthorization.module.css");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/ratingHoverText */ "./resources/js/react/utils/ratingHoverText.js");
/* harmony import */ var _modal_RatingSectionStatic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modal/RatingSectionStatic */ "./resources/js/react/employee-evaluation/components/modal/RatingSectionStatic.jsx");
/* harmony import */ var _global_Card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../global/Card */ "./resources/js/react/global/Card.jsx");
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var AverageRatingRequiredRound = function AverageRatingRequiredRound(_ref) {
  var _totalAverage$toFixed, _totalAverage$toFixed2;
  var data = _ref.data,
    round = _ref.round;
  var _useGetTaskListQuery = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_6__.useGetTaskListQuery)(data === null || data === void 0 ? void 0 : data.user_id),
    TaskList = _useGetTaskListQuery.data,
    isLoading = _useGetTaskListQuery.isLoading,
    isFetching = _useGetTaskListQuery.isFetching;
  var Tasks = TaskList === null || TaskList === void 0 ? void 0 : TaskList.data.filter(function (task) {
    return task.round === round && task.submission_date !== null;
  });
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isRatingModalOpen = _useState2[0],
    setIsRatingModalOpen = _useState2[1];
  var calculateAverage = function calculateAverage(tasks, property) {
    if (!tasks || tasks.length === 0) return 0;
    var total = tasks.reduce(function (acc, task) {
      return acc + (Number(task[property]) || 0);
    }, 0);
    return (total / tasks.length).toFixed(2);
  };
  var qw_first_chance_avg = calculateAverage(Tasks, "qw_first_chance");
  var qw_first_revision_avg = calculateAverage(Tasks, "qw_first_revision");
  var qw_second_revision_avg = calculateAverage(Tasks, "qw_second_revision");
  var speed_of_work_avg = calculateAverage(Tasks, "speed_of_work");
  var understand_instruction_avg = calculateAverage(Tasks, "understand_instruction");
  var totalAverage = (Number(qw_first_chance_avg) + Number(qw_first_revision_avg) + Number(qw_second_revision_avg) + Number(speed_of_work_avg) + Number(understand_instruction_avg)) / 5;
  var formFields = [{
    label: "Quality of work (in the first chance)",
    value: qw_first_chance_avg,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.qw_first_chance
  }, {
    label: "Quality of work (After 1st revision)",
    value: qw_first_revision_avg,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.qw_first_revision
  }, {
    label: "Quality of work (After 2nd revision)",
    value: qw_second_revision_avg,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.qw_second_revision
  }, {
    label: "Speed of work",
    value: speed_of_work_avg,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.speed_of_work
  }, {
    label: "Ability to understand instruction",
    value: understand_instruction_avg,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.understand_instruction
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      onClick: function onClick() {
        return setIsRatingModalOpen(true);
      },
      className: "link_color",
      children: "".concat((_totalAverage$toFixed = totalAverage.toFixed(2)) !== null && _totalAverage$toFixed !== void 0 ? _totalAverage$toFixed : "N/A")
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((react_modal__WEBPACK_IMPORTED_MODULE_2___default()), {
      style: {
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          margin: "auto auto",
          zIndex: 100
        },
        content: {
          borderRadius: "10px",
          height: "fit-content",
          maxHeight: "95vh",
          maxWidth: "500px",
          margin: "auto auto",
          border: "none",
          padding: "0px",
          overflowY: "auto"
        }
      },
      isOpen: isRatingModalOpen,
      onRequestClose: function onRequestClose() {
        return setIsRatingModalOpen(false);
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_global_Card__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].rating_card,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Card__WEBPACK_IMPORTED_MODULE_5__["default"].Head, {
          onClose: function onClose() {
            return setIsRatingModalOpen(false);
          },
          className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].card_head,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              children: "Lead Developer Average Rating"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("span", {
              children: [" ", "(".concat((_totalAverage$toFixed2 = totalAverage.toFixed(2)) !== null && _totalAverage$toFixed2 !== void 0 ? _totalAverage$toFixed2 : "N/A", ")")]
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Card__WEBPACK_IMPORTED_MODULE_5__["default"].Body, {
          className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].card_body,
          children: formFields.map(function (field, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_modal_RatingSectionStatic__WEBPACK_IMPORTED_MODULE_4__["default"], _objectSpread({}, field), index);
          })
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AverageRatingRequiredRound);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/AverageRatingRevision.jsx":
/*!*******************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/AverageRatingRevision.jsx ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../react/tasks/components/PrimaryPageAuthorization.module.css */ "./resources/js/react/tasks/components/PrimaryPageAuthorization.module.css");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/ratingHoverText */ "./resources/js/react/utils/ratingHoverText.js");
/* harmony import */ var _modal_RatingSectionStatic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modal/RatingSectionStatic */ "./resources/js/react/employee-evaluation/components/modal/RatingSectionStatic.jsx");
/* harmony import */ var _global_Card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../global/Card */ "./resources/js/react/global/Card.jsx");
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var AverageRatingRevision = function AverageRatingRevision(_ref) {
  var data = _ref.data;
  var _useGetSingleTaskQuer = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_6__.useGetSingleTaskQuery)(data === null || data === void 0 ? void 0 : data.task_id),
    Task = _useGetSingleTaskQuer.data,
    isLoading = _useGetSingleTaskQuer.isLoading,
    isFetching = _useGetSingleTaskQuer.isFetching;
  var singleTask = Task === null || Task === void 0 ? void 0 : Task.data[0];
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isRatingModalOpen = _useState2[0],
    setIsRatingModalOpen = _useState2[1];

  // console.log("single task", singleTask);
  var formFields = [{
    label: "Quality of work (in the first chance)",
    value: singleTask === null || singleTask === void 0 ? void 0 : singleTask.qw_first_chance,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.qw_first_chance
  }, {
    label: "Quality of work (After 1st revision)",
    value: singleTask === null || singleTask === void 0 ? void 0 : singleTask.qw_first_revision,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.qw_first_revision
  }, {
    label: "Quality of work (After 2nd revision)",
    value: singleTask === null || singleTask === void 0 ? void 0 : singleTask.qw_second_revision,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.qw_second_revision
  }, {
    label: "Speed of work",
    value: singleTask === null || singleTask === void 0 ? void 0 : singleTask.speed_of_work,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.speed_of_work
  }, {
    label: "Ability to understand instruction",
    value: singleTask === null || singleTask === void 0 ? void 0 : singleTask.understand_instruction,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.understand_instruction
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      onClick: function onClick() {
        return setIsRatingModalOpen(true);
      },
      className: "link_color",
      children: singleTask === null || singleTask === void 0 ? void 0 : singleTask.avg_rating
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((react_modal__WEBPACK_IMPORTED_MODULE_2___default()), {
      style: {
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          margin: "auto auto",
          zIndex: 100
        },
        content: {
          borderRadius: "10px",
          height: "fit-content",
          maxHeight: "95vh",
          maxWidth: "500px",
          margin: "auto auto",
          border: "none",
          padding: "0px",
          overflowY: "auto"
        }
      },
      isOpen: isRatingModalOpen,
      onRequestClose: function onRequestClose() {
        return setIsRatingModalOpen(false);
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_global_Card__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].rating_card,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Card__WEBPACK_IMPORTED_MODULE_5__["default"].Head, {
          onClose: function onClose() {
            return setIsRatingModalOpen(false);
          },
          className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].card_head,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              children: "Lead Developer Average Rating"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("span", {
              children: [" ", "( ".concat(singleTask === null || singleTask === void 0 ? void 0 : singleTask.avg_rating, ")")]
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Card__WEBPACK_IMPORTED_MODULE_5__["default"].Body, {
          className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].card_body,
          children: formFields.map(function (field, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_modal_RatingSectionStatic__WEBPACK_IMPORTED_MODULE_4__["default"], _objectSpread({}, field), index);
          })
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AverageRatingRevision);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/AverageRatingSecondaryMetrics.jsx":
/*!***************************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/AverageRatingSecondaryMetrics.jsx ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../react/tasks/components/PrimaryPageAuthorization.module.css */ "./resources/js/react/tasks/components/PrimaryPageAuthorization.module.css");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/ratingHoverText */ "./resources/js/react/utils/ratingHoverText.js");
/* harmony import */ var _modal_RatingSectionStatic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modal/RatingSectionStatic */ "./resources/js/react/employee-evaluation/components/modal/RatingSectionStatic.jsx");
/* harmony import */ var _global_Card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../global/Card */ "./resources/js/react/global/Card.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var AverageRatingSecondaryMetrics = function AverageRatingSecondaryMetrics(_ref) {
  var data = _ref.data;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isRatingModalOpen = _useState2[0],
    setIsRatingModalOpen = _useState2[1];
  var formFields = [{
    label: "Communication",
    value: data === null || data === void 0 ? void 0 : data.communication,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.communication
  }, {
    label: "Professionalism",
    value: data === null || data === void 0 ? void 0 : data.professionalism,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.professionalism
  }, {
    label: "Ability to identify issues",
    value: data === null || data === void 0 ? void 0 : data.identiey_issues,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.identiey_issues
  }, {
    label: "Dedication",
    value: data === null || data === void 0 ? void 0 : data.dedication,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.dedication
  }, {
    label: "Obedience",
    value: data === null || data === void 0 ? void 0 : data.obedience,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_3__.ratingHoverText.obedience
  }];
  var averageRating = (Number(data === null || data === void 0 ? void 0 : data.communication) + Number(data === null || data === void 0 ? void 0 : data.professionalism) + Number(data === null || data === void 0 ? void 0 : data.identiey_issues) + Number(data === null || data === void 0 ? void 0 : data.dedication) + Number(data === null || data === void 0 ? void 0 : data.obedience)) / 5;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      onClick: function onClick() {
        return setIsRatingModalOpen(true);
      },
      className: "link_color",
      children: averageRating === null || averageRating === void 0 ? void 0 : averageRating.toFixed(2)
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)((react_modal__WEBPACK_IMPORTED_MODULE_2___default()), {
      style: {
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          margin: "auto auto",
          zIndex: 100
        },
        content: {
          borderRadius: "10px",
          height: "fit-content",
          maxHeight: "95vh",
          maxWidth: "500px",
          margin: "auto auto",
          border: "none",
          padding: "0px",
          overflowY: "auto"
        }
      },
      isOpen: isRatingModalOpen,
      onRequestClose: function onRequestClose() {
        return setIsRatingModalOpen(false);
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_global_Card__WEBPACK_IMPORTED_MODULE_5__["default"], {
        className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].rating_card,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Card__WEBPACK_IMPORTED_MODULE_5__["default"].Head, {
          onClose: function onClose() {
            return setIsRatingModalOpen(false);
          },
          className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].card_head,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              children: "Secondary Metrics Average Rating"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
              children: [" ", "( ".concat(averageRating === null || averageRating === void 0 ? void 0 : averageRating.toFixed(2), ")")]
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Card__WEBPACK_IMPORTED_MODULE_5__["default"].Body, {
          className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].card_body,
          children: formFields.map(function (field, index) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_modal_RatingSectionStatic__WEBPACK_IMPORTED_MODULE_4__["default"], _objectSpread({}, field), index);
          })
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AverageRatingSecondaryMetrics);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/CommentModal.jsx":
/*!**********************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/CommentModal.jsx ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_rx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/rx */ "./node_modules/react-icons/rx/index.esm.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../hooks/useAuth */ "./resources/js/react/hooks/useAuth.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
var _templateObject, _templateObject2, _templateObject3;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var CommentModal = function CommentModal(_ref) {
  var comment = _ref.comment;
  var auth = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_2__.useAuth)();
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    modalIsOpen = _useState2[0],
    setModalIsOpen = _useState2[1];
  var openModal = function openModal() {
    setModalIsOpen(true);
  };
  var closeModal = function closeModal() {
    setModalIsOpen(false);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "badge bg-info p-2 ",
        onClick: openModal,
        style: {
          cursor: "pointer",
          marginLeft: "50px",
          color: "white"
        },
        children: "View comment"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)((react_modal__WEBPACK_IMPORTED_MODULE_1___default()), {
        style: {
          overlay: {
            zIndex: 99999998,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            margin: "auto auto"
          },
          content: {
            zIndex: 99999999,
            height: "fit-content",
            maxHeight: "fit-content",
            maxWidth: "600px",
            margin: "auto auto",
            padding: "20px",
            borderRadius: "10px",
            border: "none",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
            blur: "5px"
          }
        },
        isOpen: modalIsOpen,
        onRequestClose: closeModal,
        contentLabel: "Team Lead Comment Modal",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "d-flex justify-content-end mb-2",
          style: {
            cursor: "pointer"
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            onClick: closeModal,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_icons_rx__WEBPACK_IMPORTED_MODULE_4__.RxCrossCircled, {
              size: "30px"
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(CommentContainer, {
          children: comment ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(CommentText, {
            dangerouslySetInnerHTML: {
              __html: comment
            }
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(NotProvidedText, {
            children: "No comment provided"
          })
        })]
      })]
    })
  });
};
// Styled components
var CommentContainer = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    width: 100%;\n    border: 1px solid #e0e0e0;\n    padding: 15px;\n    border-radius: 5px;\n    background-color: #f9f9f9;\n"])));
var CommentText = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    color: #333;\n    font-size: 14px;\n    line-height: 1.6;\n"])));
var NotProvidedText = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    color: #999;\n    font-style: italic;\n"])));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentModal);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/EvaluationRevisionTableColumnsWithTasks.jsx":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/EvaluationRevisionTableColumnsWithTasks.jsx ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EvaluationRevisionTableColumnsWithTasks: () => (/* binding */ EvaluationRevisionTableColumnsWithTasks)
/* harmony export */ });
/* harmony import */ var _react_latest_styles_revision_page_module_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../react-latest/styles/revision-page.module.css */ "./resources/js/react-latest/styles/revision-page.module.css");
/* harmony import */ var _react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../react-latest/ui/Popover */ "./resources/js/react-latest/ui/Popover.jsx");
/* harmony import */ var _AverageRatingRevision__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AverageRatingRevision */ "./resources/js/react/employee-evaluation/components/Table/AverageRatingRevision.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var EvaluationRevisionTableColumnsWithTasks = [{
  id: "task_heading",
  header: "Tasks",
  draggable: true,
  sortable: true,
  accessorFn: function accessorFn(row) {
    return row.task_heading;
  },
  cell: function cell(_ref) {
    var row = _ref.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_1__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_1__["default"].Button, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
          href: "/account/tasks/".concat(data === null || data === void 0 ? void 0 : data.task_id),
          className: "multiline-ellipsis",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            style: {
              color: "#3366CC"
            },
            children: data === null || data === void 0 ? void 0 : data.task_heading
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_1__["default"].Panel, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: _react_latest_styles_revision_page_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].revision_popover_panel,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
            href: "/account/tasks/".concat(data === null || data === void 0 ? void 0 : data.task_id),
            children: data === null || data === void 0 ? void 0 : data.task_heading
          })
        })
      })]
    });
  }
}, {
  id: "revision",
  header: "Revision",
  draggable: true,
  sortable: true,
  accessorFn: function accessorFn(row) {
    return row.pm_comment || row.lead_comment;
  },
  cell: function cell(_ref2) {
    var _text, _text2;
    var row = _ref2.row;
    var data = row.original;
    var text = data.pm_comment || data.lead_comment;
    text = (_text = text) === null || _text === void 0 ? void 0 : _text.replace(/<a/g, '<a class="word-break"');
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_1__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_1__["default"].Button, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "multiline-ellipsis",
          dangerouslySetInnerHTML: {
            __html: (_text2 = text) === null || _text2 === void 0 ? void 0 : _text2.slice(0, 200)
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_1__["default"].Panel, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: _react_latest_styles_revision_page_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].revision_popover_panel,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: text
            }
          })
        })
      })]
    });
  }
}, {
  id: "revision_reason",
  header: "Revision Reason",
  draggable: true,
  sortable: true,
  accessorFn: function accessorFn(row) {
    return row.revision_acknowledgement;
  },
  cell: function cell(row) {
    var text = row.getValue();
    if (!text) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      children: " -- "
    });
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_1__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_1__["default"].Button, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "multiline-ellipsis",
          dangerouslySetInnerHTML: {
            __html: text === null || text === void 0 ? void 0 : text.slice(0, 200)
          }
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_1__["default"].Panel, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: _react_latest_styles_revision_page_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].revision_popover_panel,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: text
            }
          })
        })
      })]
    });
  }
}, {
  id: "revision_provided_by",
  header: "Revision Provided By",
  draggable: true,
  sortable: true,
  cell: function cell(_ref3) {
    var row = _ref3.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_1__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_1__["default"].Button, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
          href: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.added_by),
          className: "text-primary",
          children: data === null || data === void 0 ? void 0 : data.added_by_name
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_1__["default"].Panel, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: _react_latest_styles_revision_page_module_css__WEBPACK_IMPORTED_MODULE_0__["default"].revision_popover_panel,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
            href: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.added_by),
            children: data === null || data === void 0 ? void 0 : data.added_by_name
          })
        })
      })]
    });
  }
}, {
  id: "task_id",
  header: "Average Rating",
  draggable: true,
  sortable: true,
  cell: function cell(_ref4) {
    var row = _ref4.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_AverageRatingRevision__WEBPACK_IMPORTED_MODULE_2__["default"], {
        data: data
      })
    });
  }
}];

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/EvaluationRoundHistoryColumns.jsx":
/*!***************************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/EvaluationRoundHistoryColumns.jsx ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EvaluationRoundHistoryTableColumns: () => (/* binding */ EvaluationRoundHistoryTableColumns)
/* harmony export */ });
/* harmony import */ var _CommentModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommentModal */ "./resources/js/react/employee-evaluation/components/Table/CommentModal.jsx");
/* harmony import */ var _AverageRatingSecondaryMetrics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AverageRatingSecondaryMetrics */ "./resources/js/react/employee-evaluation/components/Table/AverageRatingSecondaryMetrics.jsx");
/* harmony import */ var _AverageRating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AverageRating */ "./resources/js/react/employee-evaluation/components/Table/AverageRating.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _ActionEvaluationRequiredRoundTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ActionEvaluationRequiredRoundTable */ "./resources/js/react/employee-evaluation/components/Table/ActionEvaluationRequiredRoundTable.jsx");
/* harmony import */ var _AssignedTasksDataRequiredRound__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AssignedTasksDataRequiredRound */ "./resources/js/react/employee-evaluation/components/Table/AssignedTasksDataRequiredRound.jsx");
/* harmony import */ var _SubmittedTasksDataRequiredRound__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SubmittedTasksDataRequiredRound */ "./resources/js/react/employee-evaluation/components/Table/SubmittedTasksDataRequiredRound.jsx");
/* harmony import */ var _TotalMinRequiredRound__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TotalMinRequiredRound */ "./resources/js/react/employee-evaluation/components/Table/TotalMinRequiredRound.jsx");
/* harmony import */ var _modal_EvaluationRevisionModalRequiredRound__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../modal/EvaluationRevisionModalRequiredRound */ "./resources/js/react/employee-evaluation/components/modal/EvaluationRevisionModalRequiredRound.jsx");
/* harmony import */ var _AverageRatingRequiredRound__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AverageRatingRequiredRound */ "./resources/js/react/employee-evaluation/components/Table/AverageRatingRequiredRound.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");












var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_3__.User(window.Laravel.user);
var EvaluationRoundHistoryTableColumns = [{
  id: "id",
  header: "Round No.",
  accessorKey: "id",
  cell: function cell(_ref) {
    var row = _ref.row;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
      children: ["Round-", row.index + 1]
    });
  }
}, {
  id: "total_task_assigned",
  header: "Total Task Assigned",
  accessorKey: "total_task_assigned",
  cell: function cell(_ref2) {
    var row = _ref2.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_AssignedTasksDataRequiredRound__WEBPACK_IMPORTED_MODULE_5__["default"], {
        data: data,
        round: row.index + 1
      })
    });
  }
}, {
  id: "total_task_submit",
  header: "Total Task Submitted",
  accessorKey: "total_task_submit",
  cell: function cell(_ref3) {
    var row = _ref3.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_SubmittedTasksDataRequiredRound__WEBPACK_IMPORTED_MODULE_6__["default"], {
        data: data,
        round: row.index + 1
      })
    });
  }
}, {
  id: "total_minutes",
  header: "Total Hours Tracked",
  accessorKey: "total_minutes",
  cell: function cell(_ref4) {
    var row = _ref4.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_TotalMinRequiredRound__WEBPACK_IMPORTED_MODULE_7__["default"], {
        data: data,
        round: row.index + 1
      })
    });
  }
}, {
  id: "total_revision",
  header: "Total Number of Revisions",
  accessorKey: "total_revision",
  cell: function cell(_ref5) {
    var row = _ref5.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_modal_EvaluationRevisionModalRequiredRound__WEBPACK_IMPORTED_MODULE_8__["default"], {
        data: data,
        round: row.index + 1
      })
    });
  }
}, {
  id: "lead_dev_avg_rating",
  header: "Lead Developer Average Rating",
  accessorKey: "lead_dev_avg_rating",
  cell: function cell(_ref6) {
    var row = _ref6.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_AverageRatingRequiredRound__WEBPACK_IMPORTED_MODULE_9__["default"], {
        data: data,
        round: row.index + 1
      })
    });
  }
}, {
  id: "communication",
  header: "Avg. ratings for secondary metrics",
  accessorKey: "communication",
  cell: function cell(_ref7) {
    var row = _ref7.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_AverageRatingSecondaryMetrics__WEBPACK_IMPORTED_MODULE_1__["default"], {
        data: data
      })
    });
  }
}, {
  id: "team_lead_cmnt",
  header: "Team Lead Comment",
  accessorKey: "team_lead_cmnt",
  cell: function cell(_ref8) {
    var row = _ref8.row;
    var data = row.original;
    if (auth.roleId !== 6) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_CommentModal__WEBPACK_IMPORTED_MODULE_0__["default"], {
        comment: data === null || data === void 0 ? void 0 : data.team_lead_cmnt
      });
    } else {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
        style: {
          marginLeft: "50px"
        },
        children: "N/A"
      });
    }
  }
}, {
  id: "managements_cmnt",
  header: "Managements Comment",
  accessorKey: "managements_cmnt",
  cell: function cell(_ref9) {
    var row = _ref9.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_CommentModal__WEBPACK_IMPORTED_MODULE_0__["default"], {
      comment: data === null || data === void 0 ? void 0 : data.managements_cmnt
    });
  }
}, {
  id: "accept_rejected",
  header: "Extended Date",
  accessorKey: "accept_rejected",
  cell: function cell(_ref10) {
    var row = _ref10.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("div", {
      children: (data === null || data === void 0 ? void 0 : data.accept_rejected) === "" ? "--" : data === null || data === void 0 ? void 0 : data.accept_rejected
    });
  }
}, {
  id: "action",
  header: "Status",
  accessorKey: "action",
  cell: function cell(_ref11) {
    var row = _ref11.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_ActionEvaluationRequiredRoundTable__WEBPACK_IMPORTED_MODULE_4__["default"], {
      data: data,
      round: row.index + 1
    });
  }
}];

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/EvaluationTable.jsx":
/*!*************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/EvaluationTable.jsx ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paginate.module.css */ "./resources/js/react/employee-evaluation/components/Table/paginate.module.css");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useLocalStorage.js");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/react-table/build/lib/index.mjs");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/table-core/build/lib/index.mjs");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-paginate */ "./node_modules/react-paginate/dist/react-paginate.js");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_paginate__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./resources/js/react/employee-evaluation/components/Table/ui.jsx");
/* harmony import */ var _TableHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TableHeader */ "./resources/js/react/employee-evaluation/components/Table/TableHeader.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var _global_EmptyTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../global/EmptyTable */ "./resources/js/react/global/EmptyTable.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






// ui component








var EvaluationTable = function EvaluationTable(_ref) {
  var _mainData$last_page;
  var data = _ref.data,
    mainData = _ref.mainData,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    isLoading = _ref.isLoading,
    isFetching = _ref.isFetching,
    onPageChange = _ref.onPageChange,
    sorting = _ref.sorting,
    tableName = _ref.tableName,
    setSorting = _ref.setSorting;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    tableData = _React$useState2[0],
    setTableData = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(columns),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    tableColumns = _React$useState4[0],
    setTableColumns = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState({
      pageIndex: 0,
      pageSize: 10
    }),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    _React$useState6$ = _React$useState6[0],
    pageIndex = _React$useState6$.pageIndex,
    pageSize = _React$useState6$.pageSize,
    setPagination = _React$useState6[1];
  var _useLocalStorage = (0,react_use__WEBPACK_IMPORTED_MODULE_9__["default"])(tableName),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    value = _useLocalStorage2[0],
    setValue = _useLocalStorage2[1];

  // on pagination
  var handlePageChange = function handlePageChange(_ref2) {
    var selected = _ref2.selected;
    var paginate = {
      pageIndex: selected,
      pageSize: pageSize
    };
    setPagination(_objectSpread(_objectSpread({}, paginate), {}, {
      pageIndex: 0
    }));
    onPageChange(paginate);
  };

  // handle page size change
  var handlePageSizeChange = function handlePageSizeChange(e) {
    e.preventDefault();
    var paginate = {
      pageIndex: pageIndex,
      pageSize: e.target.value
    };
    setPagination(_objectSpread(_objectSpread({}, paginate), {}, {
      pageIndex: 0
    }));
    onPageChange(paginate);
  };

  // columns order
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState(lodash__WEBPACK_IMPORTED_MODULE_5___default().map(columns, "id")),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    columnOrder = _React$useState8[0],
    setColumnOrder = _React$useState8[1];

  // if has table columns record on local store
  // organize column orders
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (value && value.columnOrder) {
      setColumnOrder(value.columnOrder);
    }
  }, []);

  // formate data

  // use effect
  // React.useEffect(() => {
  //     data ? setTableData(_.orderBy(data?.data, "desc")) : setTableData([]);
  // }, [data]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    data ? setTableData(lodash__WEBPACK_IMPORTED_MODULE_5___default().orderBy(data, "desc")) : setTableData([]);
  }, [data]);

  // pagination
  var pagination = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
  }, [pageIndex, pageSize]);

  // table instance
  var table = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.useReactTable)({
    data: tableData,
    columns: tableColumns,
    state: {
      sorting: sorting,
      pagination: pagination,
      tableName: tableName,
      columnOrder: columnOrder
    },
    // onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getCoreRowModel)(),
    getPaginationRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getPaginationRowModel)(),
    // getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getSortedRowModel)()
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableContainer, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Table, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_TableHeader__WEBPACK_IMPORTED_MODULE_4__["default"], {
            table: table,
            columns: tableColumns
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableBody, {
            children: [!isLoading && table.getRowModel().rows.map(function (row) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableRow, {
                children: row.getVisibleCells().map(function (cell) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableItem, {
                    children: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.flexRender)(cell.column.columnDef.cell, cell.getContext())
                  }, cell.id);
                })
              }, row.id);
            }), (isLoading || isFetching) && lodash__WEBPACK_IMPORTED_MODULE_5___default().times(pageSize, function (item) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableRow, {
                children: lodash__WEBPACK_IMPORTED_MODULE_5___default().times(tableColumns.length, function (col) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableItem, {
                    className: "py-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_6__.Placeholder, {})
                  }, col);
                })
              }, item);
            }), !isLoading && lodash__WEBPACK_IMPORTED_MODULE_5___default().size(tableData) === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableRow, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableItem, {
                colSpan: lodash__WEBPACK_IMPORTED_MODULE_5___default().size(tableColumns),
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_EmptyTable__WEBPACK_IMPORTED_MODULE_7__["default"], {})
              })
            })]
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableFooter, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
          children: ["Show", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Select, {
            value: pageSize,
            onChange: handlePageSizeChange,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "10",
              children: "10"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "20",
              children: "20"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "30",
              children: "30"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "50",
              children: "50"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "100",
              children: "100"
            })]
          }), "Entries"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span", {
            children: ["Showing ", mainData === null || mainData === void 0 ? void 0 : mainData.from, " to ", mainData === null || mainData === void 0 ? void 0 : mainData.to, " of", " ", mainData === null || mainData === void 0 ? void 0 : mainData.total, " entries"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react_paginate__WEBPACK_IMPORTED_MODULE_2___default()), {
            breakLabel: "...",
            onPageChange: handlePageChange,
            previousLabel: "Previous",
            nextLabel: "Next",
            pageRangeDisplayed: 3,
            marginPagesDisplayed: 1,
            pageCount: (_mainData$last_page = mainData === null || mainData === void 0 ? void 0 : mainData.last_page) !== null && _mainData$last_page !== void 0 ? _mainData$last_page : 1,
            renderOnZeroPageCount: null,
            containerClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].containerClassName,
            pageLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].pageLinkClassName,
            activeLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].activeLinkClassName,
            previousLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].pageLinkClassName,
            nextLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].pageLinkClassName
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EvaluationTable);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/EvaluationTableColumns.jsx":
/*!********************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/EvaluationTableColumns.jsx ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EvaluationTableColumns: () => (/* binding */ EvaluationTableColumns)
/* harmony export */ });
/* harmony import */ var _Person__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Person */ "./resources/js/react/employee-evaluation/components/Table/Person.jsx");
/* harmony import */ var _CommentModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommentModal */ "./resources/js/react/employee-evaluation/components/Table/CommentModal.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _utils_FormateDate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/FormateDate */ "./resources/js/react/utils/FormateDate.js");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var _ActionEvaluationTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ActionEvaluationTable */ "./resources/js/react/employee-evaluation/components/Table/ActionEvaluationTable.jsx");
/* harmony import */ var _AverageRatingSecondaryMetrics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AverageRatingSecondaryMetrics */ "./resources/js/react/employee-evaluation/components/Table/AverageRatingSecondaryMetrics.jsx");
/* harmony import */ var _AverageRating__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AverageRating */ "./resources/js/react/employee-evaluation/components/Table/AverageRating.jsx");
/* harmony import */ var _modal_EvaluationRevisionModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../modal/EvaluationRevisionModal */ "./resources/js/react/employee-evaluation/components/modal/EvaluationRevisionModal.jsx");
/* harmony import */ var _modal_EvaluationRoundHistoryModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../modal/EvaluationRoundHistoryModal */ "./resources/js/react/employee-evaluation/components/modal/EvaluationRoundHistoryModal.jsx");
/* harmony import */ var _AssignedTasksData__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./AssignedTasksData */ "./resources/js/react/employee-evaluation/components/Table/AssignedTasksData.jsx");
/* harmony import */ var _SubmittedTasksData__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SubmittedTasksData */ "./resources/js/react/employee-evaluation/components/Table/SubmittedTasksData.jsx");
/* harmony import */ var _TotalMin__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./TotalMin */ "./resources/js/react/employee-evaluation/components/Table/TotalMin.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");














var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_2__.User(window.Laravel.user);
var EvaluationTableColumns = [{
  id: "user_name",
  header: "Employee Name",
  accessorKey: "user_name",
  cell: function cell(_ref) {
    var row = _ref.row;
    var data = row.original;
    return data !== null && data !== void 0 && data.user_name ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_Person__WEBPACK_IMPORTED_MODULE_0__["default"], {
      url: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.user_id),
      name: data === null || data === void 0 ? void 0 : data.user_name,
      avatar: null
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
      style: {
        fontWeight: "bold",
        color: "gray"
      },
      children: "N/A"
    });
  }
}, {
  id: "role_name",
  header: "Role",
  accessorKey: "role_name",
  cell: function cell(_ref2) {
    var row = _ref2.row;
    var data = row.original;
    return data !== null && data !== void 0 && data.role_name ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
      children: data === null || data === void 0 ? void 0 : data.role_name
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
      children: "Trainee"
    });
  }
}, {
  id: "join_date",
  header: "Joining Date",
  accessorKey: "join_date",
  cell: function cell(_ref3) {
    var row = _ref3.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
      children: (0,_utils_FormateDate__WEBPACK_IMPORTED_MODULE_3__["default"])(data === null || data === void 0 ? void 0 : data.join_date)
    });
  }
}, {
  id: "first_task_assign_on",
  header: "First Task Assigned On",
  accessorKey: "first_task_assign_on",
  cell: function cell(_ref4) {
    var row = _ref4.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
      children: (0,_utils_FormateDate__WEBPACK_IMPORTED_MODULE_3__["default"])(data === null || data === void 0 ? void 0 : data.first_task_assign_on)
    });
  }
}, {
  id: "started_working_on",
  header: "Started Working On",
  accessorKey: "started_working_on",
  cell: function cell(_ref5) {
    var row = _ref5.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
      children: (0,_utils_FormateDate__WEBPACK_IMPORTED_MODULE_3__["default"])(data === null || data === void 0 ? void 0 : data.started_working_on)
    });
  }
}, {
  id: "round_requied",
  header: "Previous Round",
  accessorKey: "round_requied",
  cell: function cell(_ref6) {
    var row = _ref6.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_modal_EvaluationRoundHistoryModal__WEBPACK_IMPORTED_MODULE_9__["default"], {
      data: data
    });
  }
}, {
  id: "total_task_assigned",
  header: "Total Task Assigned",
  accessorKey: "total_task_assigned",
  cell: function cell(_ref7) {
    var row = _ref7.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_AssignedTasksData__WEBPACK_IMPORTED_MODULE_10__["default"], {
        data: data
      })
    });
  }
}, {
  id: "total_task_submit",
  header: "Total Task Submitted",
  accessorKey: "total_task_submit",
  cell: function cell(_ref8) {
    var row = _ref8.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_SubmittedTasksData__WEBPACK_IMPORTED_MODULE_11__["default"], {
        data: data
      })
    });
  }
}, {
  id: "total_minutes",
  header: "Total Hours Tracked",
  accessorKey: "total_minutes",
  cell: function cell(_ref9) {
    var row = _ref9.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_TotalMin__WEBPACK_IMPORTED_MODULE_12__["default"], {
        data: data
      })
    });
  }
}, {
  id: "total_revision",
  header: "Total Number of Revisions",
  accessorKey: "total_revision",
  cell: function cell(_ref10) {
    var row = _ref10.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_modal_EvaluationRevisionModal__WEBPACK_IMPORTED_MODULE_8__["default"], {
        data: data
      })
    });
  }
}, {
  id: "lead_dev_avg_rating",
  header: "Lead Developer Average Rating",
  accessorKey: "lead_dev_avg_rating",
  cell: function cell(_ref11) {
    var row = _ref11.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_AverageRating__WEBPACK_IMPORTED_MODULE_7__["default"], {
        data: data
      })
    });
  }
}, {
  id: "communication",
  header: "Avg. ratings for secondary metrics",
  accessorKey: "communication",
  cell: function cell(_ref12) {
    var row = _ref12.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_AverageRatingSecondaryMetrics__WEBPACK_IMPORTED_MODULE_6__["default"], {
        data: data
      })
    });
  }
}, {
  id: "team_lead_cmnt",
  header: "Team Lead Comment",
  accessorKey: "team_lead_cmnt",
  cell: function cell(_ref13) {
    var row = _ref13.row;
    var data = row.original;
    if (auth.roleId !== 6) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_CommentModal__WEBPACK_IMPORTED_MODULE_1__["default"], {
        comment: data === null || data === void 0 ? void 0 : data.team_lead_cmnt
      });
    } else {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
        style: {
          marginLeft: "50px"
        },
        children: "N/A"
      });
    }
  }
}, {
  id: "managements_cmnt",
  header: "Managements Comment",
  accessorKey: "managements_cmnt",
  cell: function cell(_ref14) {
    var row = _ref14.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_CommentModal__WEBPACK_IMPORTED_MODULE_1__["default"], {
      comment: data === null || data === void 0 ? void 0 : data.managements_cmnt
    });
  }
}, {
  id: "accept_rejected",
  header: "Accepted/Rejected Date",
  accessorKey: "accept_rejected",
  cell: function cell(_ref15) {
    var row = _ref15.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
      children: (data === null || data === void 0 ? void 0 : data.accept_rejected) === "" ? "--" : data === null || data === void 0 ? void 0 : data.accept_rejected
    });
  }
}, {
  id: "action",
  header: "Status",
  accessorKey: "action",
  cell: function cell(_ref16) {
    var row = _ref16.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_ActionEvaluationTable__WEBPACK_IMPORTED_MODULE_5__["default"], {
      data: data
    });
  }
}];

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/EvaluationTaskTable.jsx":
/*!*****************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/EvaluationTaskTable.jsx ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paginate.module.css */ "./resources/js/react/employee-evaluation/components/Table/paginate.module.css");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/react-table/build/lib/index.mjs");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/table-core/build/lib/index.mjs");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-paginate */ "./node_modules/react-paginate/dist/react-paginate.js");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_paginate__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./resources/js/react/employee-evaluation/components/Table/ui.jsx");
/* harmony import */ var _TableHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TableHeader */ "./resources/js/react/employee-evaluation/components/Table/TableHeader.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useLocalStorage.js");
/* harmony import */ var _global_EmptyTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../global/EmptyTable */ "./resources/js/react/global/EmptyTable.jsx");
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





// ui component









var EvaluationTaskTable = function EvaluationTaskTable(_ref) {
  var _data$last_page;
  var data = _ref.data,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    isLoading = _ref.isLoading,
    onPageChange = _ref.onPageChange,
    sorting = _ref.sorting,
    tableName = _ref.tableName,
    setSorting = _ref.setSorting;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    tableData = _React$useState2[0],
    setTableData = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(columns),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    tableColumns = _React$useState4[0],
    setTableColumns = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState({
      pageIndex: 0,
      pageSize: 10
    }),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    _React$useState6$ = _React$useState6[0],
    pageIndex = _React$useState6$.pageIndex,
    pageSize = _React$useState6$.pageSize,
    setPagination = _React$useState6[1];
  var _useLocalStorage = (0,react_use__WEBPACK_IMPORTED_MODULE_9__["default"])(tableName),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    value = _useLocalStorage2[0],
    setValue = _useLocalStorage2[1];

  // on pagination
  var handlePageChange = function handlePageChange(_ref2) {
    var selected = _ref2.selected;
    var paginate = {
      pageIndex: selected,
      pageSize: pageSize
    };
    setPagination(_objectSpread(_objectSpread({}, paginate), {}, {
      pageIndex: 0
    }));
    onPageChange(paginate);
  };

  // handle page size change
  var handlePageSizeChange = function handlePageSizeChange(e) {
    e.preventDefault();
    var paginate = {
      pageIndex: pageIndex,
      pageSize: e.target.value
    };
    setPagination(_objectSpread(_objectSpread({}, paginate), {}, {
      pageIndex: 0
    }));
    onPageChange(paginate);
  };

  // columns order
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState(lodash__WEBPACK_IMPORTED_MODULE_5___default().map(columns, "id")),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    columnOrder = _React$useState8[0],
    setColumnOrder = _React$useState8[1];

  // if has table columns record on local store
  // organize column orders
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (value && value.columnOrder) {
      setColumnOrder(value.columnOrder);
    }
  }, []);

  // formate data

  // use effect
  // React.useEffect(() => {
  //     data ? setTableData(_.orderBy(data?.data, "desc")) : setTableData([]);
  // }, [data]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    data ? setTableData(lodash__WEBPACK_IMPORTED_MODULE_5___default().orderBy(data, "desc")) : setTableData([]);
  }, [data]);

  // pagination
  var pagination = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
  }, [pageIndex, pageSize]);

  // table instance
  var table = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.useReactTable)({
    data: tableData,
    columns: tableColumns,
    state: {
      sorting: sorting,
      pagination: pagination,
      tableName: tableName,
      columnOrder: columnOrder
    },
    // onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getCoreRowModel)(),
    getPaginationRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getPaginationRowModel)(),
    // getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getSortedRowModel)()
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableContainer, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Table, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_TableHeader__WEBPACK_IMPORTED_MODULE_4__["default"], {
            table: table,
            columns: tableColumns
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableBody, {
            children: [!isLoading && table.getRowModel().rows.map(function (row) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableRow, {
                children: row.getVisibleCells().map(function (cell) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableItem, {
                    children: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.flexRender)(cell.column.columnDef.cell, cell.getContext())
                  }, cell.id);
                })
              }, row.id);
            }), isLoading && lodash__WEBPACK_IMPORTED_MODULE_5___default().times(pageSize, function (item) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableRow, {
                children: lodash__WEBPACK_IMPORTED_MODULE_5___default().times(tableColumns.length, function (col) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableItem, {
                    className: "py-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_7__.Placeholder, {})
                  }, col);
                })
              }, item);
            }), !isLoading && lodash__WEBPACK_IMPORTED_MODULE_5___default().size(tableData) === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableRow, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableItem, {
                colSpan: lodash__WEBPACK_IMPORTED_MODULE_5___default().size(tableColumns),
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_EmptyTable__WEBPACK_IMPORTED_MODULE_6__["default"], {})
              })
            })]
          })]
        })
      }), (data === null || data === void 0 ? void 0 : data.length) > 10 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableFooter, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
          children: ["Show", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Select, {
            value: pageSize,
            onChange: handlePageSizeChange,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "10",
              children: "10"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "20",
              children: "20"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "30",
              children: "30"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "50",
              children: "50"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "100",
              children: "100"
            })]
          }), "Entries"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span", {
            children: ["Showing ", data === null || data === void 0 ? void 0 : data.from, " to ", data === null || data === void 0 ? void 0 : data.to, " of", " ", data === null || data === void 0 ? void 0 : data.total, " entries"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react_paginate__WEBPACK_IMPORTED_MODULE_2___default()), {
            breakLabel: "...",
            onPageChange: handlePageChange,
            previousLabel: "Previous",
            nextLabel: "Next",
            pageRangeDisplayed: 3,
            marginPagesDisplayed: 1,
            pageCount: (_data$last_page = data === null || data === void 0 ? void 0 : data.last_page) !== null && _data$last_page !== void 0 ? _data$last_page : 1,
            renderOnZeroPageCount: null,
            containerClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].containerClassName,
            pageLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].pageLinkClassName,
            activeLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].activeLinkClassName,
            previousLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].pageLinkClassName,
            nextLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].pageLinkClassName
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EvaluationTaskTable);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/JqueryDateRangePicker.jsx":
/*!*******************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/JqueryDateRangePicker.jsx ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* eslint-disable react/prop-types */




var JqueryDateRangePicker = function JqueryDateRangePicker(_ref) {
  var startDate = _ref.startDate,
    endDate = _ref.endDate,
    setStartDate = _ref.setStartDate,
    setEndDate = _ref.setEndDate;
  var handleTimePicker = function handleTimePicker() {
    if (window.$) {
      var $ = window.$;
      var moment = window.moment;
      // let today = moment().format('D');

      $(function () {
        var start = moment().subtract(365, "day");
        var end = moment();

        // if(today > 20){
        //     end = moment().add(1, 'months').date(20);
        // }else {
        //     end = moment().date(20);
        // }

        setStartDate(start.format());
        setEndDate(end.format());
        function cb(start, end) {
          setStartDate(start.format("YYYY-MM-DD"));
          setEndDate(end.format("YYYY-MM-DD"));
          $("#jqueryDatePicker div.sp1__jquery_date_text").html(start.format("MMM D, YYYY") + " to " + end.format("MMM D, YYYY"));
        }
        $("#jqueryDatePicker").daterangepicker({
          locale: {
            format: "MMM D, YYYY",
            customRangeLabel: "Custom Range",
            separator: " To ",
            applyLabel: "Apply",
            autoApply: true,
            cancelLabel: "Cancel",
            daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            firstDay: parseInt("1")
          },
          startDate: start,
          endDate: end,
          datePicker: true,
          ranges: {
            Today: [moment(), moment()],
            Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Last 7 Days": [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
            "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
            "This Year": [moment().startOf("year"), moment().endOf("year")],
            "Last Year": [moment().subtract(1, "year").startOf("year"), moment().subtract(1, "year").endOf("year")]
          }
        }, cb);
        cb(start, end);
      });
    }
  };
  react__WEBPACK_IMPORTED_MODULE_1__.useEffect(function () {
    handleTimePicker();
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    id: "jqueryDatePicker",
    className: "sp1__jquery_date_picker sp1_tasks_table_page __date-picker",
    style: {
      position: "relative"
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "sp1__jquery_date_btn",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
        className: "fa-solid fa-calendar-days"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "sp1__jquery_date_text"
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JqueryDateRangePicker);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/Person.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/Person.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var Person = function Person(_ref) {
  var avatar = _ref.avatar,
    url = _ref.url,
    name = _ref.name;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "d-flex align-items-center",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "",
      style: {
        width: "28px"
      },
      children: avatar ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        style: {
          width: "32px",
          height: "28px"
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
          src: "/user-uploads/avatar/".concat(avatar),
          alt: name,
          width: 24,
          height: 24,
          style: {
            width: "28px",
            height: "28px"
          },
          className: "rounded-circle"
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "sp1-item-center border rounded-circle",
        style: {
          width: "28px",
          height: "28px"
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          style: {
            fontSize: "1rem",
            fontWeight: "bold"
          },
          children: name === null || name === void 0 ? void 0 : name.slice(0, 1).toUpperCase()
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
      href: url,
      target: "_blank",
      className: "pl-2 link_color ",
      children: name
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Person);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/RoundHistoryTable.jsx":
/*!***************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/RoundHistoryTable.jsx ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paginate.module.css */ "./resources/js/react/employee-evaluation/components/Table/paginate.module.css");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/react-table/build/lib/index.mjs");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/table-core/build/lib/index.mjs");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-paginate */ "./node_modules/react-paginate/dist/react-paginate.js");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_paginate__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./resources/js/react/employee-evaluation/components/Table/ui.jsx");
/* harmony import */ var _TableHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TableHeader */ "./resources/js/react/employee-evaluation/components/Table/TableHeader.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useLocalStorage.js");
/* harmony import */ var _global_EmptyTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../global/EmptyTable */ "./resources/js/react/global/EmptyTable.jsx");
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





// ui component









var RoundHistoryTable = function RoundHistoryTable(_ref) {
  var _data$last_page;
  var data = _ref.data,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    isLoading = _ref.isLoading,
    onPageChange = _ref.onPageChange,
    sorting = _ref.sorting,
    tableName = _ref.tableName,
    setSorting = _ref.setSorting;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    tableData = _React$useState2[0],
    setTableData = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(columns),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    tableColumns = _React$useState4[0],
    setTableColumns = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState({
      pageIndex: 0,
      pageSize: 10
    }),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    _React$useState6$ = _React$useState6[0],
    pageIndex = _React$useState6$.pageIndex,
    pageSize = _React$useState6$.pageSize,
    setPagination = _React$useState6[1];
  var _useLocalStorage = (0,react_use__WEBPACK_IMPORTED_MODULE_9__["default"])(tableName),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    value = _useLocalStorage2[0],
    setValue = _useLocalStorage2[1];

  // on pagination
  var handlePageChange = function handlePageChange(_ref2) {
    var selected = _ref2.selected;
    var paginate = {
      pageIndex: selected,
      pageSize: pageSize
    };
    setPagination(_objectSpread(_objectSpread({}, paginate), {}, {
      pageIndex: 0
    }));
    onPageChange(paginate);
  };

  // handle page size change
  var handlePageSizeChange = function handlePageSizeChange(e) {
    e.preventDefault();
    var paginate = {
      pageIndex: pageIndex,
      pageSize: e.target.value
    };
    setPagination(_objectSpread(_objectSpread({}, paginate), {}, {
      pageIndex: 0
    }));
    onPageChange(paginate);
  };

  // columns order
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState(lodash__WEBPACK_IMPORTED_MODULE_5___default().map(columns, "id")),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    columnOrder = _React$useState8[0],
    setColumnOrder = _React$useState8[1];

  // if has table columns record on local store
  // organize column orders
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (value && value.columnOrder) {
      setColumnOrder(value.columnOrder);
    }
  }, []);

  // formate data

  // use effect
  // React.useEffect(() => {
  //     data ? setTableData(_.orderBy(data?.data, "desc")) : setTableData([]);
  // }, [data]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    data ? setTableData(lodash__WEBPACK_IMPORTED_MODULE_5___default().orderBy(data, "desc")) : setTableData([]);
  }, [data]);

  // pagination
  var pagination = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
  }, [pageIndex, pageSize]);

  // table instance
  var table = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.useReactTable)({
    data: tableData,
    columns: tableColumns,
    state: {
      sorting: sorting,
      pagination: pagination,
      tableName: tableName,
      columnOrder: columnOrder
    },
    // onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getCoreRowModel)(),
    getPaginationRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getPaginationRowModel)(),
    // getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getSortedRowModel)()
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableContainer, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Table, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_TableHeader__WEBPACK_IMPORTED_MODULE_4__["default"], {
            table: table,
            columns: tableColumns
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableBody, {
            children: [!isLoading && table.getRowModel().rows.map(function (row) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableRow, {
                children: row.getVisibleCells().map(function (cell) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableItem, {
                    children: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.flexRender)(cell.column.columnDef.cell, cell.getContext())
                  }, cell.id);
                })
              }, row.id);
            }), isLoading && lodash__WEBPACK_IMPORTED_MODULE_5___default().times(pageSize, function (item) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableRow, {
                children: lodash__WEBPACK_IMPORTED_MODULE_5___default().times(tableColumns.length, function (col) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableItem, {
                    className: "py-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_7__.Placeholder, {})
                  }, col);
                })
              }, item);
            }), !isLoading && lodash__WEBPACK_IMPORTED_MODULE_5___default().size(tableData) === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableRow, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableItem, {
                colSpan: lodash__WEBPACK_IMPORTED_MODULE_5___default().size(tableColumns),
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_EmptyTable__WEBPACK_IMPORTED_MODULE_6__["default"], {})
              })
            })]
          })]
        })
      }), (data === null || data === void 0 ? void 0 : data.length) > 10 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableFooter, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
          children: ["Show", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Select, {
            value: pageSize,
            onChange: handlePageSizeChange,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "10",
              children: "10"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "20",
              children: "20"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "30",
              children: "30"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "50",
              children: "50"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "100",
              children: "100"
            })]
          }), "Entries"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span", {
            children: ["Showing ", data === null || data === void 0 ? void 0 : data.from, " to ", data === null || data === void 0 ? void 0 : data.to, " of", " ", data === null || data === void 0 ? void 0 : data.total, " entries"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react_paginate__WEBPACK_IMPORTED_MODULE_2___default()), {
            breakLabel: "...",
            onPageChange: handlePageChange,
            previousLabel: "Previous",
            nextLabel: "Next",
            pageRangeDisplayed: 3,
            marginPagesDisplayed: 1,
            pageCount: (_data$last_page = data === null || data === void 0 ? void 0 : data.last_page) !== null && _data$last_page !== void 0 ? _data$last_page : 1,
            renderOnZeroPageCount: null,
            containerClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].containerClassName,
            pageLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].pageLinkClassName,
            activeLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].activeLinkClassName,
            previousLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].pageLinkClassName,
            nextLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].pageLinkClassName
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RoundHistoryTable);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/SubmittedTasksData.jsx":
/*!****************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/SubmittedTasksData.jsx ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var _TaskModalComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TaskModalComponent */ "./resources/js/react/employee-evaluation/components/Table/TaskModalComponent.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var SubmittedTasksData = function SubmittedTasksData(_ref) {
  var data = _ref.data;
  var _useGetTaskListQuery = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__.useGetTaskListQuery)(data === null || data === void 0 ? void 0 : data.user_id),
    TaskList = _useGetTaskListQuery.data,
    isLoading = _useGetTaskListQuery.isLoading,
    isFetching = _useGetTaskListQuery.isFetching;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    latestRoundTasks = _useState2[0],
    setLatestRoundTasks = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (TaskList !== null && TaskList !== void 0 && TaskList.data) {
      // Find the latest round number
      var latestRound = Math.max.apply(Math, _toConsumableArray(TaskList.data.map(function (task) {
        return task.round;
      })));

      // Filter tasks that have the latest round
      var tasks = TaskList === null || TaskList === void 0 ? void 0 : TaskList.data.filter(function (task) {
        return task.round === latestRound && task.submission_date !== null;
      });
      setLatestRoundTasks(tasks);
    }
  }, [TaskList]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_TaskModalComponent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    Tasks: latestRoundTasks,
    isLoading: isLoading,
    title: "Total task assigned",
    taskNumbers: latestRoundTasks === null || latestRoundTasks === void 0 ? void 0 : latestRoundTasks.length
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmittedTasksData);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/SubmittedTasksDataRequiredRound.jsx":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/SubmittedTasksDataRequiredRound.jsx ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var _TaskModalComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TaskModalComponent */ "./resources/js/react/employee-evaluation/components/Table/TaskModalComponent.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var SubmittedTasksDataRequiredRound = function SubmittedTasksDataRequiredRound(_ref) {
  var data = _ref.data,
    round = _ref.round;
  var _useGetTaskListQuery = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__.useGetTaskListQuery)(data === null || data === void 0 ? void 0 : data.user_id),
    TaskList = _useGetTaskListQuery.data,
    isLoading = _useGetTaskListQuery.isLoading,
    isFetching = _useGetTaskListQuery.isFetching;
  var Tasks = TaskList === null || TaskList === void 0 ? void 0 : TaskList.data.filter(function (item) {
    return item.submission_date !== null && item.round === round;
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_TaskModalComponent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    Tasks: Tasks,
    isLoading: isLoading,
    title: "Total task assigned",
    taskNumbers: Tasks === null || Tasks === void 0 ? void 0 : Tasks.length
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmittedTasksDataRequiredRound);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/TaskModalComponent.jsx":
/*!****************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/TaskModalComponent.jsx ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../react/tasks/components/PrimaryPageAuthorization.module.css */ "./resources/js/react/tasks/components/PrimaryPageAuthorization.module.css");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _global_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../global/Card */ "./resources/js/react/global/Card.jsx");
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var _TaskTableAssigned__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TaskTableAssigned */ "./resources/js/react/employee-evaluation/components/Table/TaskTableAssigned.jsx");
/* harmony import */ var _react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../react-latest/ui/Popover */ "./resources/js/react-latest/ui/Popover.jsx");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var TaskModalComponent = function TaskModalComponent(_ref) {
  var Tasks = _ref.Tasks,
    isLoading = _ref.isLoading,
    title = _ref.title,
    taskNumbers = _ref.taskNumbers;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    sorting = _useState4[0],
    setSorting = _useState4[1];
  var onPageChange = function onPageChange(paginate) {
    setPagination(paginate);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    onClick: function onClick() {
      return setIsOpen(true);
    },
    className: "link_color",
    children: [taskNumbers, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react_modal__WEBPACK_IMPORTED_MODULE_2___default()), {
      style: {
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          margin: "auto auto",
          zIndex: 100
        },
        content: {
          borderRadius: "10px",
          height: "fit-content",
          maxHeight: "95vh",
          maxWidth: "800px",
          margin: "auto auto",
          border: "none",
          padding: "0px",
          overflowY: "auto"
        }
      },
      isOpen: isOpen,
      onRequestClose: function onRequestClose() {
        return setIsOpen(false);
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_global_Card__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].taskList_card,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Card__WEBPACK_IMPORTED_MODULE_3__["default"].Head, {
          onClose: function onClose() {
            return setIsOpen(false);
          },
          className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].card_head,
          children: "Total task assigned"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Card__WEBPACK_IMPORTED_MODULE_3__["default"].Body, {
          className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].card_body,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_TaskTableAssigned__WEBPACK_IMPORTED_MODULE_5__["default"], {
            data: Tasks,
            columns: [].concat(TotalTaskAssignedColumns),
            isLoading: isLoading,
            onPageChange: onPageChange,
            sorting: sorting,
            tableName: "".concat(title, "Table"),
            setSorting: setSorting
          })
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskModalComponent);
var TotalTaskAssignedColumns = [{
  id: "task_name",
  header: "Task Name",
  accessorKey: "task_name",
  cell: function cell(_ref2) {
    var original = _ref2.row.original,
      className = _ref2.className;
    return original !== null && original !== void 0 && original.task_name ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      style: {
        minWidth: "10rem"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_6__["default"], {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_6__["default"].Button, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
            className: " singleline-ellipsis link_color",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
              className: "link_color",
              children: original === null || original === void 0 ? void 0 : original.task_name
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_react_latest_ui_Popover__WEBPACK_IMPORTED_MODULE_6__["default"].Panel, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "revision_popover_panel",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("a", {
              href: "/account/tasks/".concat(original === null || original === void 0 ? void 0 : original.task_id),
              className: "hover-underline",
              target: "_blank",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
                className: "link_color ",
                children: original === null || original === void 0 ? void 0 : original.task_name
              })
            })
          })
        })]
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
      children: "Not Available"
    });
  }
}, {
  id: "status",
  header: "Task Status",
  accessorKey: "task_board_column_name",
  cell: function cell(_ref3) {
    var _data$task_board_colu;
    var row = _ref3.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    // console.log('from independent task table column',data?.column_name);
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
      className: "badge text-white",
      style: {
        background: data === null || data === void 0 ? void 0 : data.task_board_column_color
      },
      children: (_data$task_board_colu = data === null || data === void 0 ? void 0 : data.task_board_column_name) !== null && _data$task_board_colu !== void 0 ? _data$task_board_colu : "--"
    });
  }
}, {
  id: "total_hours",
  header: "Total Hours Tracked",
  accessorKey: "total_hours",
  cell: function cell(_ref4) {
    var row = _ref4.row;
    var data = row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      style: {
        marginLeft: "50px"
      },
      children: (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_7__.convertTime)(data === null || data === void 0 ? void 0 : data.total_min)
    });
  }
}];

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/TaskTableAssigned.jsx":
/*!***************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/TaskTableAssigned.jsx ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paginate.module.css */ "./resources/js/react/employee-evaluation/components/Table/paginate.module.css");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/react-table/build/lib/index.mjs");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/table-core/build/lib/index.mjs");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-paginate */ "./node_modules/react-paginate/dist/react-paginate.js");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_paginate__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./resources/js/react/employee-evaluation/components/Table/ui.jsx");
/* harmony import */ var _TableHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TableHeader */ "./resources/js/react/employee-evaluation/components/Table/TableHeader.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useLocalStorage.js");
/* harmony import */ var _global_EmptyTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../global/EmptyTable */ "./resources/js/react/global/EmptyTable.jsx");
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





// ui component









var TaskTableAssigned = function TaskTableAssigned(_ref) {
  var _data$last_page;
  var data = _ref.data,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    isLoading = _ref.isLoading,
    onPageChange = _ref.onPageChange,
    sorting = _ref.sorting,
    tableName = _ref.tableName,
    setSorting = _ref.setSorting;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    tableData = _React$useState2[0],
    setTableData = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(columns),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    tableColumns = _React$useState4[0],
    setTableColumns = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState({
      pageIndex: 0,
      pageSize: 10
    }),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    _React$useState6$ = _React$useState6[0],
    pageIndex = _React$useState6$.pageIndex,
    pageSize = _React$useState6$.pageSize,
    setPagination = _React$useState6[1];
  var _useLocalStorage = (0,react_use__WEBPACK_IMPORTED_MODULE_9__["default"])(tableName),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    value = _useLocalStorage2[0],
    setValue = _useLocalStorage2[1];

  // on pagination
  var handlePageChange = function handlePageChange(_ref2) {
    var selected = _ref2.selected;
    var paginate = {
      pageIndex: selected,
      pageSize: pageSize
    };
    setPagination(_objectSpread(_objectSpread({}, paginate), {}, {
      pageIndex: 0
    }));
    onPageChange(paginate);
  };

  // handle page size change
  var handlePageSizeChange = function handlePageSizeChange(e) {
    e.preventDefault();
    var paginate = {
      pageIndex: pageIndex,
      pageSize: e.target.value
    };
    setPagination(_objectSpread(_objectSpread({}, paginate), {}, {
      pageIndex: 0
    }));
    onPageChange(paginate);
  };

  // columns order
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState(lodash__WEBPACK_IMPORTED_MODULE_5___default().map(columns, "id")),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    columnOrder = _React$useState8[0],
    setColumnOrder = _React$useState8[1];

  // if has table columns record on local store
  // organize column orders
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (value && value.columnOrder) {
      setColumnOrder(value.columnOrder);
    }
  }, []);

  // formate data

  // use effect
  // React.useEffect(() => {
  //     data ? setTableData(_.orderBy(data?.data, "desc")) : setTableData([]);
  // }, [data]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    data ? setTableData(lodash__WEBPACK_IMPORTED_MODULE_5___default().orderBy(data, "desc")) : setTableData([]);
  }, [data]);

  // pagination
  var pagination = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
  }, [pageIndex, pageSize]);

  // table instance
  var table = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.useReactTable)({
    data: tableData,
    columns: tableColumns,
    state: {
      sorting: sorting,
      pagination: pagination,
      tableName: tableName,
      columnOrder: columnOrder
    },
    // onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getCoreRowModel)(),
    getPaginationRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getPaginationRowModel)(),
    // getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_11__.getSortedRowModel)()
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableContainer, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Table, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_TableHeader__WEBPACK_IMPORTED_MODULE_4__["default"], {
            table: table,
            columns: tableColumns
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableBody, {
            children: [!isLoading && table.getRowModel().rows.map(function (row) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableRow, {
                children: row.getVisibleCells().map(function (cell) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableItem, {
                    children: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.flexRender)(cell.column.columnDef.cell, cell.getContext())
                  }, cell.id);
                })
              }, row.id);
            }), isLoading && lodash__WEBPACK_IMPORTED_MODULE_5___default().times(pageSize, function (item) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableRow, {
                children: lodash__WEBPACK_IMPORTED_MODULE_5___default().times(tableColumns.length, function (col) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableItem, {
                    className: "py-3",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_7__.Placeholder, {})
                  }, col);
                })
              }, item);
            }), !isLoading && lodash__WEBPACK_IMPORTED_MODULE_5___default().size(tableData) === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableRow, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableItem, {
                colSpan: lodash__WEBPACK_IMPORTED_MODULE_5___default().size(tableColumns),
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_EmptyTable__WEBPACK_IMPORTED_MODULE_6__["default"], {})
              })
            })]
          })]
        })
      }), (data === null || data === void 0 ? void 0 : data.length) > 10 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.TableFooter, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
          children: ["Show", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Select, {
            value: pageSize,
            onChange: handlePageSizeChange,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "10",
              children: "10"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "20",
              children: "20"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "30",
              children: "30"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "50",
              children: "50"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("option", {
              value: "100",
              children: "100"
            })]
          }), "Entries"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span", {
            children: ["Showing ", data === null || data === void 0 ? void 0 : data.from, " to ", data === null || data === void 0 ? void 0 : data.to, " of", " ", data === null || data === void 0 ? void 0 : data.total, " entries"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react_paginate__WEBPACK_IMPORTED_MODULE_2___default()), {
            breakLabel: "...",
            onPageChange: handlePageChange,
            previousLabel: "Previous",
            nextLabel: "Next",
            pageRangeDisplayed: 3,
            marginPagesDisplayed: 1,
            pageCount: (_data$last_page = data === null || data === void 0 ? void 0 : data.last_page) !== null && _data$last_page !== void 0 ? _data$last_page : 1,
            renderOnZeroPageCount: null,
            containerClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].containerClassName,
            pageLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].pageLinkClassName,
            activeLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].activeLinkClassName,
            previousLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].pageLinkClassName,
            nextLinkClassName: _paginate_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].pageLinkClassName
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskTableAssigned);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/TotalMin.jsx":
/*!******************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/TotalMin.jsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var TotalMin = function TotalMin(_ref) {
  var data = _ref.data;
  var _useGetTaskListQuery = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__.useGetTaskListQuery)(data === null || data === void 0 ? void 0 : data.user_id),
    TaskList = _useGetTaskListQuery.data,
    isLoading = _useGetTaskListQuery.isLoading,
    isFetching = _useGetTaskListQuery.isFetching;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    latestRoundTasks = _useState2[0],
    setLatestRoundTasks = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (TaskList !== null && TaskList !== void 0 && TaskList.data) {
      // Find the latest round number
      var latestRound = Math.max.apply(Math, _toConsumableArray(TaskList.data.map(function (task) {
        return task.round;
      })));

      // Filter tasks that have the latest round
      var tasks = TaskList.data.filter(function (task) {
        return task.round === latestRound;
      });
      setLatestRoundTasks(tasks);
    }
  }, [TaskList]);
  var TotalMin = latestRoundTasks.reduce(function (acc, item) {
    return acc + item.total_min;
  }, 0);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    children: (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_2__.convertTime)(TotalMin)
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TotalMin);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/Table/TotalMinRequiredRound.jsx":
/*!*******************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/Table/TotalMinRequiredRound.jsx ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




var TotalMinRequiredRound = function TotalMinRequiredRound(_ref) {
  var data = _ref.data,
    round = _ref.round;
  var _useGetTaskListQuery = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__.useGetTaskListQuery)(data === null || data === void 0 ? void 0 : data.user_id),
    TaskList = _useGetTaskListQuery.data,
    isLoading = _useGetTaskListQuery.isLoading,
    isFetching = _useGetTaskListQuery.isFetching;
  var TotalMin = TaskList === null || TaskList === void 0 ? void 0 : TaskList.data.filter(function (task) {
    return task.round === round;
  }).reduce(function (acc, item) {
    return acc + item.total_min;
  }, 0);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
    children: (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_2__.convertTime)(TotalMin)
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TotalMinRequiredRound);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/modal/EvaluationRequiredRoundsTaskListModal.jsx":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/modal/EvaluationRequiredRoundsTaskListModal.jsx ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EvaluationRating_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EvaluationRating.module.css */ "./resources/js/react/employee-evaluation/components/modal/EvaluationRating.module.css");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Table_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Table/ui */ "./resources/js/react/employee-evaluation/components/Table/ui.jsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ui/EvaluationModal */ "./resources/js/react/employee-evaluation/components/ui/EvaluationModal.jsx");
/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../hooks/useAuth */ "./resources/js/react/hooks/useAuth.jsx");
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Button.js");
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var _UI_comments_utils_FormatDate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../UI/comments/utils/FormatDate */ "./resources/js/react/UI/comments/utils/FormatDate.js");
/* harmony import */ var _Table_EvaluationTaskTableColumns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Table/EvaluationTaskTableColumns */ "./resources/js/react/employee-evaluation/components/Table/EvaluationTaskTableColumns.jsx");
/* harmony import */ var _Table_EvaluationTaskTable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Table/EvaluationTaskTable */ "./resources/js/react/employee-evaluation/components/Table/EvaluationTaskTable.jsx");
/* harmony import */ var _zustand_store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../zustand/store */ "./resources/js/react/zustand/store.js");
/* harmony import */ var _RatingSection__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./RatingSection */ "./resources/js/react/employee-evaluation/components/modal/RatingSection.jsx");
/* harmony import */ var _RatingSectionStatic__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./RatingSectionStatic */ "./resources/js/react/employee-evaluation/components/modal/RatingSectionStatic.jsx");
/* harmony import */ var _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../utils/ratingHoverText */ "./resources/js/react/utils/ratingHoverText.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





















var EvaluationRequiredRoundsTaskListModal = function EvaluationRequiredRoundsTaskListModal(_ref) {
  var _singleEvaluation$com, _singleEvaluation$pro, _singleEvaluation$ide, _singleEvaluation$ded, _singleEvaluation$obe, _Number$toFixed, _Number;
  var round = _ref.round,
    isEvaluationModal = _ref.isEvaluationModal,
    setIsEvaluationModal = _ref.setIsEvaluationModal,
    singleEvaluation = _ref.singleEvaluation;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2___default().useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    dateExpired = _React$useState2[0],
    setDateExpired = _React$useState2[1];
  react__WEBPACK_IMPORTED_MODULE_2___default().useEffect(function () {
    setDateExpired(new Date(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.exp_date) < Date.now());
  }, [singleEvaluation]);
  // console.log(singleEvaluation?.user_name, dateExpired);

  var auth = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_6__.useAuth)();
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_2___default().useState(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.lead_dev_avg_rating),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    cumulativeAverage = _React$useState4[0],
    setCumulativeAverage = _React$useState4[1];
  var _useEmployeeEvaluatio = (0,_zustand_store__WEBPACK_IMPORTED_MODULE_12__["default"])(),
    evaluationObject = _useEmployeeEvaluatio.evaluationObject;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    teamLeadReview = _useState2[0],
    setTeamLeadReview = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    adminComment = _useState4[0],
    setAdminComment = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isAllTaskRated = _useState6[0],
    setIsAllTaskRated = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    sorting = _useState8[0],
    setSorting = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({
      communication: (_singleEvaluation$com = singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.communication) !== null && _singleEvaluation$com !== void 0 ? _singleEvaluation$com : 0,
      professionalism: (_singleEvaluation$pro = singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.professionalism) !== null && _singleEvaluation$pro !== void 0 ? _singleEvaluation$pro : 0,
      identiey_issues: (_singleEvaluation$ide = singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.identiey_issues) !== null && _singleEvaluation$ide !== void 0 ? _singleEvaluation$ide : 0,
      dedication: (_singleEvaluation$ded = singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.dedication) !== null && _singleEvaluation$ded !== void 0 ? _singleEvaluation$ded : 0,
      obedience: (_singleEvaluation$obe = singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.obedience) !== null && _singleEvaluation$obe !== void 0 ? _singleEvaluation$obe : 0
    }),
    _useState10 = _slicedToArray(_useState9, 2),
    formData = _useState10[0],
    setFormData = _useState10[1];
  var _useStoreTaskRatingFi = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useStoreTaskRatingFinalSubmissionMutation)(),
    _useStoreTaskRatingFi2 = _slicedToArray(_useStoreTaskRatingFi, 2),
    taskRatingFinalSubmission = _useStoreTaskRatingFi2[0],
    isLoadingLeadDevFinalSubmission = _useStoreTaskRatingFi2[1].isLoading;
  var _useStoreTeamLeadRevi = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useStoreTeamLeadReviewMutation)(),
    _useStoreTeamLeadRevi2 = _slicedToArray(_useStoreTeamLeadRevi, 2),
    teamLeadSubmission = _useStoreTeamLeadRevi2[0],
    isLoadingTeamLeadReview = _useStoreTeamLeadRevi2[1].isLoading;
  var _useStoreAdminRejecte = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useStoreAdminRejectedMutation)(),
    _useStoreAdminRejecte2 = _slicedToArray(_useStoreAdminRejecte, 2),
    adminRejection = _useStoreAdminRejecte2[0],
    isAdminRejecting = _useStoreAdminRejecte2[1].isLoading;
  var _useStoreAdminAuthori = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useStoreAdminAuthorizedMutation)(),
    _useStoreAdminAuthori2 = _slicedToArray(_useStoreAdminAuthori, 2),
    adminAuthorization = _useStoreAdminAuthori2[0],
    isLoadingAdminAuthorization = _useStoreAdminAuthori2[1].isLoading;
  var _useStoreAdminExtende = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useStoreAdminExtendedMutation)(),
    _useStoreAdminExtende2 = _slicedToArray(_useStoreAdminExtende, 2),
    adminExtended = _useStoreAdminExtende2[0],
    isLoadingAdminExtended = _useStoreAdminExtende2[1].isLoading;
  var _useGetTaskListQuery = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useGetTaskListQuery)(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.user_id),
    data = _useGetTaskListQuery.data,
    isLoading = _useGetTaskListQuery.isLoading,
    isFetching = _useGetTaskListQuery.isFetching;
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    tasksList = _useState12[0],
    setTaskList = _useState12[1];
  var Tasks = data === null || data === void 0 ? void 0 : data.data.filter(function (task) {
    return task.round === round;
  });
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    setTaskList(Tasks);
  }, [singleEvaluation]);

  // let tasksToRate = [];
  //to enable or disable button

  // set average rating and calculating if all tasks are rated to enable confirm submission for lead developer
  // useEffect(() => {
  //     if (data && data?.data) {
  //         const tasks = data?.data.filter((task) => task.round === round);
  //         //filter tasks to rate based on total_min and submission_date not null
  //         tasksToRate = tasks?.filter((task) => {
  //             return (
  //                 Number(task.total_min) < 60 && task.submission_date !== null
  //             );
  //         });
  //         //calculate average rating
  //         const cumulativeSum = tasksToRate?.reduce(
  //             (acc, cur) => acc + Number(cur.avg_rating),
  //             0
  //         );

  //         //set average rating
  //         const average = cumulativeSum / tasksToRate?.length;
  //         setCumulativeAverage(average);

  //         //checking if all tasks are rated using the length of tasksToRate array and the length of tasksToRate array filtered by lead_dev_cmnt not null
  //         const isAllTaskRated =
  //             tasksToRate?.length ===
  //             tasksToRate?.filter((task) => task.lead_dev_cmnt !== null)
  //                 .length;
  //         setIsAllTaskRated(isAllTaskRated);
  //     }
  // }, [tasksToRate]);

  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({
      pageIndex: 0,
      pageSize: 10
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    _useState14$ = _useState14[0],
    pageIndex = _useState14$.pageIndex,
    pageSize = _useState14$.pageSize,
    setPagination = _useState14[1];
  var confirmButtonDisabled = !isAllTaskRated || !dateExpired;
  var formFields = [{
    label: "Communication",
    value: formData.communication,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText.communication,
    onChange: function onChange(value) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        communication: value
      }));
    }
  }, {
    label: "Professionalism",
    value: formData.professionalism,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText.professionalism,
    onChange: function onChange(value) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        professionalism: value
      }));
    }
  }, {
    label: "Ability to identify issues",
    value: formData.identiey_issues,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText.identiey_issues,
    onChange: function onChange(value) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        identiey_issues: value
      }));
    }
  }, {
    label: "Dedication",
    value: formData.dedication,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText.dedication,
    onChange: function onChange(value) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        dedication: value
      }));
    }
  }, {
    label: "Obedience",
    value: formData.obedience,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText.obedience,
    onChange: function onChange(value) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        obedience: value
      }));
    }
  }];
  var onPageChange = function onPageChange(paginate) {
    setPagination(paginate);
  };
  var handleLeadDevFinalSubmission = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var requiredFields, emptyFields, errorMessage;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            requiredFields = [{
              key: "communication",
              label: "Communication"
            }, {
              key: "professionalism",
              label: "Professionalism"
            }, {
              key: "identiey_issues",
              label: "Ability to identify issues"
            }, {
              key: "dedication",
              label: "Dedication"
            }, {
              key: "obedience",
              label: "Obedience"
            }];
            emptyFields = requiredFields.filter(function (field) {
              return !formData[field.key];
            }).map(function (field) {
              return field.label;
            });
            if (!(emptyFields.length > 0)) {
              _context.next = 6;
              break;
            }
            errorMessage = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
                style: {
                  fontWeight: "bold"
                },
                children: [" ", "Please fill in the following fields:"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
                children: emptyFields.map(function (field, index) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("p", {
                    children: field
                  }, index);
                })
              })]
            });
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error(errorMessage);
            return _context.abrupt("return");
          case 6:
            _context.next = 8;
            return taskRatingFinalSubmission(_objectSpread(_objectSpread({}, formData), {}, {
              user_id: singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.user_id,
              confirm_submission: "lead_dev_submitted",
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            })).unwrap().then(function () {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Final Rating submission Successful!");
              setIsEvaluationModal(false);
            })["catch"](function (error) {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("Final submission failed. Please try again later.");
            });
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleLeadDevFinalSubmission() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleTeamLeadComment = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return teamLeadSubmission({
              team_lead_cmnt: teamLeadReview,
              user_id: singleEvaluation.user_id,
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            }).unwrap().then(function () {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Review submission Successful!");
              setIsEvaluationModal(false);
            })["catch"](function (error) {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("Review submission failed. Please try again later.");
            });
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function handleTeamLeadComment(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleAdminAuthorization = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return adminAuthorization({
              status: "authorize",
              user_id: singleEvaluation.user_id,
              managements_cmnt: adminComment,
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            }).unwrap().then(function () {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Employee Authorization Successful!");
              setIsEvaluationModal(false);
            })["catch"](function (error) {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("Employee Authorization failed. Please try again later.");
            });
          case 2:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function handleAdminAuthorization() {
      return _ref4.apply(this, arguments);
    };
  }();
  var handleAdminRejection = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(e) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return adminRejection({
              status: "reject",
              user_id: singleEvaluation.user_id,
              managements_cmnt: adminComment,
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            }).unwrap().then(function () {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Employee Rejection Successful!");
              setIsEvaluationModal(false);
            })["catch"](function (error) {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("Employee Rejection failed. Please try again later.");
            });
          case 2:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function handleAdminRejection(_x2) {
      return _ref5.apply(this, arguments);
    };
  }();
  var handleAdminExtention = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(e) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return adminExtended({
              user_id: singleEvaluation.user_id,
              managements_cmnt: adminComment,
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            }).unwrap().then(function () {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Employee Extension Successful!");
              setIsEvaluationModal(false);
            })["catch"](function (error) {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("Employee Extention failed. Please try again later.");
            });
          case 2:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function handleAdminExtention(_x3) {
      return _ref6.apply(this, arguments);
    };
  }();
  // console.log("taskLists", tasksList);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)((react_modal__WEBPACK_IMPORTED_MODULE_0___default()), {
    style: {
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        margin: "auto auto",
        zIndex: 100
      },
      content: {
        borderRadius: "10px",
        maxWidth: "100%",
        height: "fit-content",
        maxHeight: "100%",
        margin: "auto auto",
        padding: "10px",
        overflowY: "auto"
      }
    },
    ariaHideApp: false,
    isOpen: isEvaluationModal,
    onRequestClose: function onRequestClose() {
      return setIsEvaluationModal(false);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.TitleAndTableSection, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.EvalTableTitle, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
          children: "New Developer Evaluation:"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("span", {
          children: [" ", singleEvaluation.user_name]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("span", {
          className: "average_rating",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
            children: "Cumulative Average:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("span", {
            children: [" ", (_Number$toFixed = (_Number = Number(cumulativeAverage)) === null || _Number === void 0 ? void 0 : _Number.toFixed(2)) !== null && _Number$toFixed !== void 0 ? _Number$toFixed : 0]
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_Table_EvaluationTaskTable__WEBPACK_IMPORTED_MODULE_11__["default"], {
        data: tasksList,
        columns: _toConsumableArray(_Table_EvaluationTaskTableColumns__WEBPACK_IMPORTED_MODULE_10__.EvaluationTaskTableColumns),
        isLoading: isLoading,
        onPageChange: onPageChange,
        sorting: sorting,
        tableName: "Evaluation Task Table",
        setSorting: setSorting
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.RatingSectionLeadDev, {
      className: _EvaluationRating_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].rating_container_task_table,
      style: {
        marginLeft: "5%",
        marginRight: "5%"
      },
      children: [auth.roleId === 6 && ((evaluationObject === null || evaluationObject === void 0 ? void 0 : evaluationObject.ld_submission_status) === 0 ? formFields.map(function (field, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_RatingSection__WEBPACK_IMPORTED_MODULE_13__["default"], _objectSpread({}, field), index);
      }) : (evaluationObject === null || evaluationObject === void 0 ? void 0 : evaluationObject.ld_submission_status) === 1 && formFields.map(function (field, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_RatingSectionStatic__WEBPACK_IMPORTED_MODULE_14__["default"], _objectSpread({}, field), index);
      })), (auth.roleId === 8 || auth.roleId === 1) && formFields.map(function (field, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_RatingSectionStatic__WEBPACK_IMPORTED_MODULE_14__["default"], _objectSpread({}, field), index);
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.CommentTeamLeadSection, {
      children: [auth.roleId === 8 && singleEvaluation.team_lead_status === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.TeamLeadReviewTitle, {
          children: "Team Leader's Review"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.CommentBox, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_7__["default"], {
            placeholder: "Write your comment here",
            data: teamLeadReview,
            onChange: function onChange(e, editor) {
              var data = editor.getData();
              setTeamLeadReview(data);
            }
          })
        })]
      }), (auth.roleId === 8 || auth.roleId === 1) && singleEvaluation.team_lead_status === 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("section", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.SectionFlex, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.HorizontalLineLeftTL, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewTitleTL, {
            children: "Team Leader's Review"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.HorizontalLineRightTL, {})]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewContent, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: singleEvaluation.team_lead_cmnt
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewFooter, {
            children: ["By", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("a", {
              href: "/account/employees/".concat(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.team_lead_id),
              target: "_blank",
              children: singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.team_lead_name
            }), " ", "on", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
              children: (0,_UI_comments_utils_FormatDate__WEBPACK_IMPORTED_MODULE_9__["default"])(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.updated_at)
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.CommentAdminSection, {
      children: [auth.roleId === 1 && singleEvaluation.managements_decision === null && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("section", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.SectionFlex, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.HorizontalLineLeftA, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewTitleA, {
              children: "Top Management's Authorization"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.HorizontalLineRightA, {})]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.CommentContentA, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_7__["default"], {
              placeholder: "Write your comment here",
              data: adminComment,
              onChange: function onChange(e, editor) {
                var data = editor.getData();
                setAdminComment(data);
              }
            })
          })]
        })
      }), (auth.roleId === 1 || auth.roleId === 8 || auth.roleId === 6) && singleEvaluation.managements_decision !== null && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("section", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.SectionFlex, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.HorizontalLineLeftTL, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewTitleTL, {
            children: "Top Management's Authorization"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.HorizontalLineRightTL, {})]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewContent, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.managements_cmnt
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewFooter, {
            children: ["By", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("a", {
              href: "/account/employees/".concat(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.managements_id),
              target: "_blank",
              children: singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.managements_name
            }), " ", "on", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
              children: (0,_UI_comments_utils_FormatDate__WEBPACK_IMPORTED_MODULE_9__["default"])(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.managements_auth_at)
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.ButtonSection, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.FooterButtons, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__["default"], {
          onClick: function onClick() {
            return setIsEvaluationModal(false);
          },
          variant: "secondary",
          size: "md",
          children: "Close"
        }), auth.roleId === 6 && singleEvaluation.ld_submission_status !== 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__["default"], {
          onClick: handleLeadDevFinalSubmission,
          size: "md",
          className: "ml-2",
          disabled: confirmButtonDisabled,
          children: isLoadingLeadDevFinalSubmission ? "Submitting..." : "Confirm Submission"
        }), auth.roleId === 8 && singleEvaluation.team_lead_status === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__["default"], {
          onClick: handleTeamLeadComment,
          size: "md",
          className: "ml-2",
          disabled: isLoadingTeamLeadReview,
          children: isLoadingTeamLeadReview ? "Submitting..." : "Submit Review"
        }), auth.roleId === 1 && singleEvaluation.managements_decision === null && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__["default"], {
            onClick: handleAdminAuthorization,
            size: "md",
            className: "ml-2",
            disabled: isLoadingAdminAuthorization,
            children: isLoadingAdminAuthorization ? "Authorizing..." : "Authorize"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__["default"], {
            variant: "info",
            onClick: handleAdminExtention,
            size: "md",
            className: "ml-2",
            disabled: isLoadingAdminExtended,
            children: isLoadingAdminExtended ? "extending..." : "Continue this trial for 1 more week!"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__["default"], {
            variant: "danger",
            onClick: handleAdminRejection,
            size: "md",
            className: "ml-2",
            disabled: isAdminRejecting,
            children: isAdminRejecting ? "Rejecting..." : "Reject"
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EvaluationRequiredRoundsTaskListModal);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/modal/EvaluationRevisionModal.jsx":
/*!*********************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/modal/EvaluationRevisionModal.jsx ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RevisionModalBody__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RevisionModalBody */ "./resources/js/react/employee-evaluation/components/modal/RevisionModalBody.jsx");
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var _Table_EvaluationRevisionTableColumnsWithTasks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Table/EvaluationRevisionTableColumnsWithTasks */ "./resources/js/react/employee-evaluation/components/Table/EvaluationRevisionTableColumnsWithTasks.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var EvaluationRevisionModal = function EvaluationRevisionModal(_ref) {
  var _Revisions$length;
  var data = _ref.data;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isEvaluationRevisionModal = _React$useState2[0],
    setIsEvaluationRevisionModal = _React$useState2[1];
  var _useGetAllRevisionLis = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_2__.useGetAllRevisionListQuery)(data === null || data === void 0 ? void 0 : data.task_id),
    revisionData = _useGetAllRevisionLis.data,
    isLoading = _useGetAllRevisionLis.isLoading;
  var Revisions = revisionData === null || revisionData === void 0 ? void 0 : revisionData.data;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      onClick: function onClick() {
        return setIsEvaluationRevisionModal(true);
      },
      className: "link_color",
      children: (_Revisions$length = Revisions === null || Revisions === void 0 ? void 0 : Revisions.length) !== null && _Revisions$length !== void 0 ? _Revisions$length : "0"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_RevisionModalBody__WEBPACK_IMPORTED_MODULE_1__["default"], {
      revisions: Revisions,
      columns: _Table_EvaluationRevisionTableColumnsWithTasks__WEBPACK_IMPORTED_MODULE_3__.EvaluationRevisionTableColumnsWithTasks,
      isLoading: isLoading,
      isEvaluationRevisionModal: isEvaluationRevisionModal,
      setIsEvaluationRevisionModal: setIsEvaluationRevisionModal
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EvaluationRevisionModal);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/modal/EvaluationRevisionModalRequiredRound.jsx":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/modal/EvaluationRevisionModalRequiredRound.jsx ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RevisionModalBody__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RevisionModalBody */ "./resources/js/react/employee-evaluation/components/modal/RevisionModalBody.jsx");
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var _Table_EvaluationRevisionTableColumnsWithTasks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Table/EvaluationRevisionTableColumnsWithTasks */ "./resources/js/react/employee-evaluation/components/Table/EvaluationRevisionTableColumnsWithTasks.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var EvaluationRevisionModalRequiredRound = function EvaluationRevisionModalRequiredRound(_ref) {
  var _Revisions$length;
  var data = _ref.data;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isEvaluationRevisionModal = _React$useState2[0],
    setIsEvaluationRevisionModal = _React$useState2[1];
  var _useGetAllRevisionLis = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_2__.useGetAllRevisionListQuery)(data === null || data === void 0 ? void 0 : data.parent_task_id),
    revisionData = _useGetAllRevisionLis.data,
    isLoading = _useGetAllRevisionLis.isLoading;
  var Revisions = revisionData === null || revisionData === void 0 ? void 0 : revisionData.data;
  // console.log("revisions", Revisions);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      onClick: function onClick() {
        return setIsEvaluationRevisionModal(true);
      },
      className: "link_color",
      children: (_Revisions$length = Revisions === null || Revisions === void 0 ? void 0 : Revisions.length) !== null && _Revisions$length !== void 0 ? _Revisions$length : "0"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_RevisionModalBody__WEBPACK_IMPORTED_MODULE_1__["default"], {
      revisions: Revisions,
      columns: _Table_EvaluationRevisionTableColumnsWithTasks__WEBPACK_IMPORTED_MODULE_3__.EvaluationRevisionTableColumnsWithTasks,
      isLoading: isLoading,
      isEvaluationRevisionModal: isEvaluationRevisionModal,
      setIsEvaluationRevisionModal: setIsEvaluationRevisionModal
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EvaluationRevisionModalRequiredRound);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/modal/EvaluationRoundHistoryModal.jsx":
/*!*************************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/modal/EvaluationRoundHistoryModal.jsx ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _global_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../global/Card */ "./resources/js/react/global/Card.jsx");
/* harmony import */ var _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../react/tasks/components/PrimaryPageAuthorization.module.css */ "./resources/js/react/tasks/components/PrimaryPageAuthorization.module.css");
/* harmony import */ var _Table_RoundHistoryTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Table/RoundHistoryTable */ "./resources/js/react/employee-evaluation/components/Table/RoundHistoryTable.jsx");
/* harmony import */ var _Table_EvaluationRoundHistoryColumns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Table/EvaluationRoundHistoryColumns */ "./resources/js/react/employee-evaluation/components/Table/EvaluationRoundHistoryColumns.jsx");
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var EvaluationRoundHistoryModal = function EvaluationRoundHistoryModal(_ref) {
  var data = _ref.data;
  var _useGetEvaluationHist = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_6__.useGetEvaluationHistoryQuery)(data === null || data === void 0 ? void 0 : data.user_id),
    RoundHistory = _useGetEvaluationHist.data,
    isLoading = _useGetEvaluationHist.isLoading;
  var roundData = RoundHistory === null || RoundHistory === void 0 ? void 0 : RoundHistory.data;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    sorting = _useState2[0],
    setSorting = _useState2[1];
  var onPageChange = function onPageChange(paginate) {
    setPagination(paginate);
  };
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isOpen = _useState4[0],
    setIsOpen = _useState4[1];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("button", {
      style: {
        marginLeft: "30px",
        width: "100px",
        height: "40px",
        backgroundColor: "transparent"
      },
      className: "".concat((data === null || data === void 0 ? void 0 : data.round_requied) === 0 ? "" : "link_color"),
      onClick: function onClick() {
        return setIsOpen(true);
      },
      disabled: (data === null || data === void 0 ? void 0 : data.round_requied) === 0,
      children: data === null || data === void 0 ? void 0 : data.round_requied
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((react_modal__WEBPACK_IMPORTED_MODULE_1___default()), {
      style: {
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          margin: "auto auto",
          zIndex: 100
        },
        content: {
          borderRadius: "10px",
          height: "fit-content",
          maxHeight: "100%",
          margin: "auto auto",
          padding: "0px",
          overflowY: "auto",
          maxWidth: "75vw"
        }
      },
      isOpen: isOpen,
      onRequestClose: function onRequestClose() {
        return setIsOpen(false);
      },
      ariaHideApp: false,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_global_Card__WEBPACK_IMPORTED_MODULE_2__["default"], {
        className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].revision_card,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Card__WEBPACK_IMPORTED_MODULE_2__["default"].Head, {
          onClose: function onClose() {
            return setIsOpen(false);
          },
          className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].card_head,
          children: "Round history table"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_global_Card__WEBPACK_IMPORTED_MODULE_2__["default"].Body, {
          className: _react_tasks_components_PrimaryPageAuthorization_module_css__WEBPACK_IMPORTED_MODULE_3__["default"].card_body,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Table_RoundHistoryTable__WEBPACK_IMPORTED_MODULE_4__["default"], {
            data: roundData,
            columns: _toConsumableArray(_Table_EvaluationRoundHistoryColumns__WEBPACK_IMPORTED_MODULE_5__.EvaluationRoundHistoryTableColumns),
            isLoading: isLoading,
            onPageChange: onPageChange,
            sorting: sorting,
            tableName: "Revision Table",
            setSorting: setSorting
          })
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EvaluationRoundHistoryModal);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/modal/EvaluationTaskListModal.jsx":
/*!*********************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/modal/EvaluationTaskListModal.jsx ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EvaluationRating_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EvaluationRating.module.css */ "./resources/js/react/employee-evaluation/components/modal/EvaluationRating.module.css");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Table_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Table/ui */ "./resources/js/react/employee-evaluation/components/Table/ui.jsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ui/EvaluationModal */ "./resources/js/react/employee-evaluation/components/ui/EvaluationModal.jsx");
/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../hooks/useAuth */ "./resources/js/react/hooks/useAuth.jsx");
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Button.js");
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var _UI_comments_utils_FormatDate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../UI/comments/utils/FormatDate */ "./resources/js/react/UI/comments/utils/FormatDate.js");
/* harmony import */ var _Table_EvaluationTaskTableColumns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Table/EvaluationTaskTableColumns */ "./resources/js/react/employee-evaluation/components/Table/EvaluationTaskTableColumns.jsx");
/* harmony import */ var _Table_EvaluationTaskTable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Table/EvaluationTaskTable */ "./resources/js/react/employee-evaluation/components/Table/EvaluationTaskTable.jsx");
/* harmony import */ var _zustand_store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../zustand/store */ "./resources/js/react/zustand/store.js");
/* harmony import */ var _RatingSection__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./RatingSection */ "./resources/js/react/employee-evaluation/components/modal/RatingSection.jsx");
/* harmony import */ var _RatingSectionStatic__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./RatingSectionStatic */ "./resources/js/react/employee-evaluation/components/modal/RatingSectionStatic.jsx");
/* harmony import */ var _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../utils/ratingHoverText */ "./resources/js/react/utils/ratingHoverText.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





















var EvaluationTaskListModal = function EvaluationTaskListModal(_ref) {
  var _singleEvaluation$com, _singleEvaluation$pro, _singleEvaluation$ide, _singleEvaluation$ded, _singleEvaluation$obe, _Number$toFixed, _Number;
  var isEvaluationModal = _ref.isEvaluationModal,
    setIsEvaluationModal = _ref.setIsEvaluationModal,
    singleEvaluation = _ref.singleEvaluation;
  var _useGetEvaluationHist = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useGetEvaluationHistoryQuery)(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.user_id),
    RoundHistory = _useGetEvaluationHist.data;
  var roundNumber = RoundHistory === null || RoundHistory === void 0 ? void 0 : RoundHistory.data.length;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2___default().useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    dateExpired = _React$useState2[0],
    setDateExpired = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_2___default().useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    latestRound = _React$useState4[0],
    setLatestRound = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_2___default().useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    confirmButtonDisabled = _React$useState6[0],
    setConfirmButtonDisabled = _React$useState6[1];
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_2___default().useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    isPreviousTasks = _React$useState8[0],
    setIsPreviousTasks = _React$useState8[1];
  var auth = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_6__.useAuth)();
  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_2___default().useState(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.lead_dev_avg_rating),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    cumulativeAverage = _React$useState10[0],
    setCumulativeAverage = _React$useState10[1];
  var _useEmployeeEvaluatio = (0,_zustand_store__WEBPACK_IMPORTED_MODULE_12__["default"])(),
    evaluationObject = _useEmployeeEvaluatio.evaluationObject;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    latestRoundTasks = _useState2[0],
    setLatestRoundTasks = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    teamLeadReview = _useState4[0],
    setTeamLeadReview = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    adminComment = _useState6[0],
    setAdminComment = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    isAllTaskRated = _useState8[0],
    setIsAllTaskRated = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    sorting = _useState10[0],
    setSorting = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({
      communication: (_singleEvaluation$com = singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.communication) !== null && _singleEvaluation$com !== void 0 ? _singleEvaluation$com : 0,
      professionalism: (_singleEvaluation$pro = singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.professionalism) !== null && _singleEvaluation$pro !== void 0 ? _singleEvaluation$pro : 0,
      identiey_issues: (_singleEvaluation$ide = singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.identiey_issues) !== null && _singleEvaluation$ide !== void 0 ? _singleEvaluation$ide : 0,
      dedication: (_singleEvaluation$ded = singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.dedication) !== null && _singleEvaluation$ded !== void 0 ? _singleEvaluation$ded : 0,
      obedience: (_singleEvaluation$obe = singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.obedience) !== null && _singleEvaluation$obe !== void 0 ? _singleEvaluation$obe : 0
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    formData = _useState12[0],
    setFormData = _useState12[1];
  var _useStoreTaskRatingFi = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useStoreTaskRatingFinalSubmissionMutation)(),
    _useStoreTaskRatingFi2 = _slicedToArray(_useStoreTaskRatingFi, 2),
    taskRatingFinalSubmission = _useStoreTaskRatingFi2[0],
    isLoadingLeadDevFinalSubmission = _useStoreTaskRatingFi2[1].isLoading;
  var _useStoreTeamLeadRevi = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useStoreTeamLeadReviewMutation)(),
    _useStoreTeamLeadRevi2 = _slicedToArray(_useStoreTeamLeadRevi, 2),
    teamLeadSubmission = _useStoreTeamLeadRevi2[0],
    isLoadingTeamLeadReview = _useStoreTeamLeadRevi2[1].isLoading;
  var _useStoreAdminRejecte = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useStoreAdminRejectedMutation)(),
    _useStoreAdminRejecte2 = _slicedToArray(_useStoreAdminRejecte, 2),
    adminRejection = _useStoreAdminRejecte2[0],
    isAdminRejecting = _useStoreAdminRejecte2[1].isLoading;
  var _useStoreAdminAuthori = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useStoreAdminAuthorizedMutation)(),
    _useStoreAdminAuthori2 = _slicedToArray(_useStoreAdminAuthori, 2),
    adminAuthorization = _useStoreAdminAuthori2[0],
    isLoadingAdminAuthorization = _useStoreAdminAuthori2[1].isLoading;
  var _useStoreAdminExtende = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useStoreAdminExtendedMutation)(),
    _useStoreAdminExtende2 = _slicedToArray(_useStoreAdminExtende, 2),
    adminExtended = _useStoreAdminExtende2[0],
    isLoadingAdminExtended = _useStoreAdminExtende2[1].isLoading;
  var _useGetTaskListQuery = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useGetTaskListQuery)(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.user_id),
    data = _useGetTaskListQuery.data,
    isLoading = _useGetTaskListQuery.isLoading,
    isFetching = _useGetTaskListQuery.isFetching;
  var _useGetEvaluationHist2 = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_8__.useGetEvaluationHistoryQuery)(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.user_id),
    historyData = _useGetEvaluationHist2.data;
  react__WEBPACK_IMPORTED_MODULE_2___default().useEffect(function () {
    setDateExpired(new Date(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.exp_date) < Date.now());
  }, [singleEvaluation]);
  react__WEBPACK_IMPORTED_MODULE_2___default().useEffect(function () {
    if (data !== null && data !== void 0 && data.data) {
      var _latestRound = Math.max.apply(Math, _toConsumableArray(data.data.map(function (task) {
        return task.round;
      })));
      setLatestRound(_latestRound);
      var tasks = data.data.filter(function (task) {
        return task.round === _latestRound;
      });
      setLatestRoundTasks(tasks);
    }
  }, [data]);
  react__WEBPACK_IMPORTED_MODULE_2___default().useEffect(function () {
    if (latestRoundTasks.length > 0) {
      var tasksToRate = latestRoundTasks.filter(function (task) {
        return ![1, 2, 3].includes(task === null || task === void 0 ? void 0 : task.task_board_column_id);
      });
      var cumulativeSum = tasksToRate.reduce(function (acc, cur) {
        var _cur$avg_rating;
        return acc + Number((_cur$avg_rating = cur.avg_rating) !== null && _cur$avg_rating !== void 0 ? _cur$avg_rating : 0);
      }, 0);
      console.log("tasks to rate", tasksToRate);
      var average = cumulativeSum / tasksToRate.length;
      setCumulativeAverage(average);
      var _isAllTaskRated = tasksToRate.length === tasksToRate.filter(function (task) {
        return task.lead_dev_cmnt !== null;
      }).length;
      setIsAllTaskRated(_isAllTaskRated);
    }
  }, [latestRoundTasks]);
  react__WEBPACK_IMPORTED_MODULE_2___default().useEffect(function () {
    setConfirmButtonDisabled(!isAllTaskRated || !dateExpired || isPreviousTasks);
  }, [isAllTaskRated, dateExpired, isPreviousTasks]);
  react__WEBPACK_IMPORTED_MODULE_2___default().useEffect(function () {
    if (historyData !== null && historyData !== void 0 && historyData.data && latestRound) {
      if (historyData.data.length > 0 && latestRound === historyData.data.length) {
        setIsPreviousTasks(true);
      }
    }
  }, [historyData, latestRound, data]);
  var formFields = [{
    label: "Communication",
    value: formData.communication,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText.communication,
    onChange: function onChange(value) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        communication: value
      }));
    }
  }, {
    label: "Professionalism",
    value: formData.professionalism,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText.professionalism,
    onChange: function onChange(value) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        professionalism: value
      }));
    }
  }, {
    label: "Ability to identify issues",
    value: formData.identiey_issues,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText.identiey_issues,
    onChange: function onChange(value) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        identiey_issues: value
      }));
    }
  }, {
    label: "Dedication",
    value: formData.dedication,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText.dedication,
    onChange: function onChange(value) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        dedication: value
      }));
    }
  }, {
    label: "Obedience",
    value: formData.obedience,
    hoverText: _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === null || _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText === void 0 ? void 0 : _utils_ratingHoverText__WEBPACK_IMPORTED_MODULE_15__.ratingHoverText.obedience,
    onChange: function onChange(value) {
      return setFormData(_objectSpread(_objectSpread({}, formData), {}, {
        obedience: value
      }));
    }
  }];
  var onPageChange = function onPageChange(paginate) {
    setPagination(paginate);
  };
  var handleLeadDevFinalSubmission = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var requiredFields, emptyFields, errorMessage;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            requiredFields = [{
              key: "communication",
              label: "Communication"
            }, {
              key: "professionalism",
              label: "Professionalism"
            }, {
              key: "identiey_issues",
              label: "Ability to identify issues"
            }, {
              key: "dedication",
              label: "Dedication"
            }, {
              key: "obedience",
              label: "Obedience"
            }];
            emptyFields = requiredFields.filter(function (field) {
              return !formData[field.key];
            }).map(function (field) {
              return field.label;
            });
            if (!(emptyFields.length > 0)) {
              _context.next = 6;
              break;
            }
            errorMessage = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
                style: {
                  fontWeight: "bold"
                },
                children: [" ", "Please fill in the following fields:"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
                children: emptyFields.map(function (field, index) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("p", {
                    children: field
                  }, index);
                })
              })]
            });
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error(errorMessage);
            return _context.abrupt("return");
          case 6:
            _context.next = 8;
            return taskRatingFinalSubmission(_objectSpread(_objectSpread({}, formData), {}, {
              user_id: singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.user_id,
              confirm_submission: "lead_dev_submitted",
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            })).unwrap().then(function () {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Final Rating submission Successful!");
              setIsEvaluationModal(false);
            })["catch"](function (error) {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("Final submission failed. Please try again later.");
            });
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleLeadDevFinalSubmission() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleTeamLeadComment = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
      var errorMessage;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(teamLeadReview === "")) {
              _context2.next = 4;
              break;
            }
            errorMessage = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
                style: {
                  fontWeight: "bold"
                },
                children: [" ", "Please fill in the following fields:"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
                children: "Team Leader's Review"
              })]
            });
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error(errorMessage);
            return _context2.abrupt("return");
          case 4:
            _context2.next = 6;
            return teamLeadSubmission({
              team_lead_cmnt: teamLeadReview,
              user_id: singleEvaluation.user_id,
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            }).unwrap().then(function () {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Review submission Successful!");
              setIsEvaluationModal(false);
            })["catch"](function (error) {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("Review submission failed. Please try again later.");
            });
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function handleTeamLeadComment(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleAdminAuthorization = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var errorMessage;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!(adminComment === "")) {
              _context3.next = 4;
              break;
            }
            errorMessage = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
                style: {
                  fontWeight: "bold"
                },
                children: [" ", "Please fill in the following fields:"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
                children: "Top Management's Authorization"
              })]
            });
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error(errorMessage);
            return _context3.abrupt("return");
          case 4:
            _context3.next = 6;
            return adminAuthorization({
              status: "authorize",
              user_id: singleEvaluation.user_id,
              managements_cmnt: adminComment,
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            }).unwrap().then(function () {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Employee Authorization Successful!");
              setIsEvaluationModal(false);
            })["catch"](function (error) {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("Employee Authorization failed. Please try again later.");
            });
          case 6:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function handleAdminAuthorization() {
      return _ref4.apply(this, arguments);
    };
  }();
  var handleAdminRejection = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(e) {
      var errorMessage;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            if (!(adminComment === "")) {
              _context4.next = 4;
              break;
            }
            errorMessage = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
                style: {
                  fontWeight: "bold"
                },
                children: [" ", "Please fill in the following fields:"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
                children: "Top Management's Authorization"
              })]
            });
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error(errorMessage);
            return _context4.abrupt("return");
          case 4:
            _context4.next = 6;
            return adminRejection({
              status: "reject",
              user_id: singleEvaluation.user_id,
              managements_cmnt: adminComment,
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            }).unwrap().then(function () {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Employee Rejection Successful!");
              setIsEvaluationModal(false);
            })["catch"](function (error) {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("Employee Rejection failed. Please try again later.");
            });
          case 6:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function handleAdminRejection(_x2) {
      return _ref5.apply(this, arguments);
    };
  }();
  var handleAdminExtention = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(e) {
      var errorMessage;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            if (!(adminComment === "")) {
              _context5.next = 4;
              break;
            }
            errorMessage = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
                style: {
                  fontWeight: "bold"
                },
                children: [" ", "Please fill in the following fields:"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
                children: "Top Management's Authorization"
              })]
            });
            react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error(errorMessage);
            return _context5.abrupt("return");
          case 4:
            _context5.next = 6;
            return adminExtended({
              user_id: singleEvaluation.user_id,
              managements_cmnt: adminComment,
              task_id: singleEvaluation.task_id,
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            }).unwrap().then(function () {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success("Employee Extension Successful!");
              setIsEvaluationModal(false);
            })["catch"](function (error) {
              react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error("Employee Extention failed. Please try again later.");
            });
          case 6:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function handleAdminExtention(_x3) {
      return _ref6.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)((react_modal__WEBPACK_IMPORTED_MODULE_0___default()), {
    style: {
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        margin: "auto auto",
        zIndex: 100
      },
      content: {
        borderRadius: "10px",
        maxWidth: "100%",
        height: "fit-content",
        maxHeight: "100%",
        margin: "auto auto",
        padding: "10px",
        overflowY: "auto"
      }
    },
    ariaHideApp: false,
    isOpen: isEvaluationModal,
    onRequestClose: function onRequestClose() {
      return setIsEvaluationModal(false);
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.TitleAndTableSection, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.EvalTableTitle, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
          children: "New Developer Evaluation:"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("span", {
          children: [" ", singleEvaluation.user_name]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("span", {
          className: "average_rating",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
            children: "Cumulative Average:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("span", {
            children: [" ", (_Number$toFixed = (_Number = Number(cumulativeAverage)) === null || _Number === void 0 ? void 0 : _Number.toFixed(2)) !== null && _Number$toFixed !== void 0 ? _Number$toFixed : 0, console.log("cumulative avg", cumulativeAverage)]
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_Table_EvaluationTaskTable__WEBPACK_IMPORTED_MODULE_11__["default"], {
        data: latestRoundTasks,
        columns: _toConsumableArray(_Table_EvaluationTaskTableColumns__WEBPACK_IMPORTED_MODULE_10__.EvaluationTaskTableColumns),
        isLoading: isLoading,
        onPageChange: onPageChange,
        sorting: sorting,
        tableName: "Evaluation Task Table",
        setSorting: setSorting
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.RatingSectionLeadDev, {
      className: _EvaluationRating_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].rating_container_task_table,
      style: {
        marginLeft: "5%",
        marginRight: "5%"
      },
      children: [auth.roleId === 6 && ((evaluationObject === null || evaluationObject === void 0 ? void 0 : evaluationObject.ld_submission_status) === 0 && !isPreviousTasks ? formFields.map(function (field, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_RatingSection__WEBPACK_IMPORTED_MODULE_13__["default"], _objectSpread({}, field), index);
      }) : (evaluationObject === null || evaluationObject === void 0 ? void 0 : evaluationObject.ld_submission_status) === 1 && formFields.map(function (field, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_RatingSectionStatic__WEBPACK_IMPORTED_MODULE_14__["default"], _objectSpread({}, field), index);
      })), (auth.roleId === 8 && (singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.ld_submission_status) === 1 || auth.roleId === 1 && (singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.ld_submission_status) === 1) && formFields.map(function (field, index) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_RatingSectionStatic__WEBPACK_IMPORTED_MODULE_14__["default"], _objectSpread({}, field), index);
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.CommentTeamLeadSection, {
      children: [auth.roleId === 8 && singleEvaluation.team_lead_status === 0 && singleEvaluation.ld_submission_status === 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.TeamLeadReviewTitle, {
          children: "Team Leader's Review"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.CommentBox, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_7__["default"], {
            placeholder: "Write your comment here",
            data: teamLeadReview,
            onChange: function onChange(e, editor) {
              var data = editor.getData();
              setTeamLeadReview(data);
            }
          })
        })]
      }), (auth.roleId === 8 || auth.roleId === 1) && singleEvaluation.team_lead_status === 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("section", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.SectionFlex, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.HorizontalLineLeftTL, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewTitleTL, {
            children: "Team Leader's Review"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.HorizontalLineRightTL, {})]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewContent, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: singleEvaluation.team_lead_cmnt
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewFooter, {
            children: ["By", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("a", {
              href: "/account/employees/".concat(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.team_lead_id),
              target: "_blank",
              children: singleEvaluation.team_lead_name
            }), " ", "on", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
              children: (0,_UI_comments_utils_FormatDate__WEBPACK_IMPORTED_MODULE_9__["default"])(singleEvaluation.updated_at)
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.CommentAdminSection, {
      children: [auth.roleId === 1 && singleEvaluation.managements_decision === null && singleEvaluation.team_lead_status === 1 && singleEvaluation.ld_submission_status === 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("section", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.SectionFlex, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.HorizontalLineLeftA, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewTitleA, {
              children: "Top Management's Authorization"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.HorizontalLineRightA, {})]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.CommentContentA, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_7__["default"], {
              placeholder: "Write your comment here",
              data: adminComment,
              onChange: function onChange(e, editor) {
                var data = editor.getData();
                setAdminComment(data);
              }
            })
          })]
        })
      }), (auth.roleId === 1 || auth.roleId === 8 || auth.roleId === 6) && singleEvaluation.managements_decision !== null && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("section", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.SectionFlex, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.HorizontalLineLeftTL, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewTitleTL, {
            children: "Top Management's Authorization"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.HorizontalLineRightTL, {})]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewContent, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
            dangerouslySetInnerHTML: {
              __html: singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.managements_cmnt
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_ui_EvaluationModal__WEBPACK_IMPORTED_MODULE_5__.ReviewFooter, {
            children: ["By", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("a", {
              href: "/account/employees/".concat(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.managements_id),
              target: "_blank",
              children: singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.managements_name
            }), " ", "on", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
              children: (0,_UI_comments_utils_FormatDate__WEBPACK_IMPORTED_MODULE_9__["default"])(singleEvaluation === null || singleEvaluation === void 0 ? void 0 : singleEvaluation.managements_auth_at)
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.ButtonSection, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.FooterButtons, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__["default"], {
          onClick: function onClick() {
            return setIsEvaluationModal(false);
          },
          variant: "secondary",
          size: "md",
          children: "Close"
        }), auth.roleId === 6 && singleEvaluation.ld_submission_status !== 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__["default"], {
          onClick: handleLeadDevFinalSubmission,
          size: "md",
          className: "ml-2",
          disabled: confirmButtonDisabled,
          children: isLoadingLeadDevFinalSubmission ? "Submitting..." : "Confirm Submission"
        }), auth.roleId === 8 && singleEvaluation.team_lead_status === 0 && singleEvaluation.ld_submission_status === 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__["default"], {
          onClick: handleTeamLeadComment,
          size: "md",
          className: "ml-2",
          disabled: isLoadingTeamLeadReview,
          children: isLoadingTeamLeadReview ? "Submitting..." : "Submit Review"
        }), auth.roleId === 1 && singleEvaluation.managements_decision === null && singleEvaluation.team_lead_status === 1 && singleEvaluation.ld_submission_status === 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(_Table_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__["default"], {
            onClick: handleAdminAuthorization,
            size: "md",
            className: "ml-2",
            disabled: isLoadingAdminAuthorization,
            children: isLoadingAdminAuthorization ? "Authorizing..." : "Authorize"
          }), roundNumber === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__["default"], {
            variant: "info",
            onClick: handleAdminExtention,
            size: "md",
            className: "ml-2",
            disabled: isLoadingAdminExtended,
            children: isLoadingAdminExtended ? "extending..." : "Continue this trial for 1 more week!"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_17__["default"], {
            variant: "danger",
            onClick: handleAdminRejection,
            size: "md",
            className: "ml-2",
            disabled: isAdminRejecting,
            children: isAdminRejecting ? "Rejecting..." : "Reject"
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EvaluationTaskListModal);

/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/ui/EvaluationModal.jsx":
/*!**********************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/ui/EvaluationModal.jsx ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommentBox: () => (/* binding */ CommentBox),
/* harmony export */   CommentContentA: () => (/* binding */ CommentContentA),
/* harmony export */   HorizontalLineLeftA: () => (/* binding */ HorizontalLineLeftA),
/* harmony export */   HorizontalLineLeftTL: () => (/* binding */ HorizontalLineLeftTL),
/* harmony export */   HorizontalLineRightA: () => (/* binding */ HorizontalLineRightA),
/* harmony export */   HorizontalLineRightTL: () => (/* binding */ HorizontalLineRightTL),
/* harmony export */   ReviewContent: () => (/* binding */ ReviewContent),
/* harmony export */   ReviewFooter: () => (/* binding */ ReviewFooter),
/* harmony export */   ReviewTitleA: () => (/* binding */ ReviewTitleA),
/* harmony export */   ReviewTitleTL: () => (/* binding */ ReviewTitleTL),
/* harmony export */   SectionFlex: () => (/* binding */ SectionFlex),
/* harmony export */   TeamLeadReviewTitle: () => (/* binding */ TeamLeadReviewTitle)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TeamLeadReviewTitle = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    margin-top: 30px;\n    font-weight: bold;\n"])));
var CommentBox = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    border: 2px solid rgba(0, 0, 0, 0.2);\n    margin-bottom: 20px;\n    margin-top: 10px;\n"])));
var SectionFlex = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: center;\n    margin-top: 30px;\n"])));
var HorizontalLineLeftTL = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    height: 3px;\n    background-color: #1492e6;\n    width: 45%;\n"])));
var HorizontalLineRightTL = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    height: 3px;\n    background-color: #1492e6;\n    width: 45%;\n"])));
var ReviewTitleTL = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    font-weight: bold;\n    padding: 8px 0;\n    width: 10%;\n    text-align: center;\n"])));
var ReviewContent = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    height: auto;\n    position: relative;\n    width: 100%;\n    padding: 10px;\n    padding-bottom: 40px;\n    border: 2px solid grey;\n"])));
var ReviewFooter = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n    position: absolute;\n    bottom: 10px;\n    right: 10px;\n    padding: 3px;\n    border: 1px solid grey;\n"])));
var HorizontalLineLeftA = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n    height: 3px;\n    background-color: #1492e6;\n    width: 43%;\n"])));
var HorizontalLineRightA = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n    height: 3px;\n    background-color: #1492e6;\n    width: 43%;\n"])));
var ReviewTitleA = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n    font-weight: bold;\n    padding: 8px 0;\n    width: 14%;\n    text-align: center;\n"])));
var CommentContentA = styled_components__WEBPACK_IMPORTED_MODULE_0__["default"].div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n    border: 2px solid rgba(0, 0, 0, 0.2);\n    margin-bottom: 20px;\n    margin-top: 10px;\n"])));

/***/ }),

/***/ "./resources/js/react/employee-evaluation/pages/EmployeeEvaluation.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/pages/EmployeeEvaluation.jsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/api/EvaluationApiSlice */ "./resources/js/react/services/api/EvaluationApiSlice.js");
/* harmony import */ var _EmployeeEvaluation_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EmployeeEvaluation.module.css */ "./resources/js/react/employee-evaluation/pages/EmployeeEvaluation.module.css");
/* harmony import */ var _components_EvaluationTableFilterBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/EvaluationTableFilterBar */ "./resources/js/react/employee-evaluation/components/EvaluationTableFilterBar.jsx");
/* harmony import */ var _components_Table_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Table/ui */ "./resources/js/react/employee-evaluation/components/Table/ui.jsx");
/* harmony import */ var _components_RefreshButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/RefreshButton */ "./resources/js/react/employee-evaluation/components/RefreshButton.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _global_Card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../global/Card */ "./resources/js/react/global/Card.jsx");
/* harmony import */ var _components_Table_EvaluationTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Table/EvaluationTable */ "./resources/js/react/employee-evaluation/components/Table/EvaluationTable.jsx");
/* harmony import */ var _components_Table_EvaluationTableColumns__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Table/EvaluationTableColumns */ "./resources/js/react/employee-evaluation/components/Table/EvaluationTableColumns.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }














var EmployeeEvaluation = function EmployeeEvaluation() {
  var _sorting$, _sorting$2;
  var _useSearchParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useSearchParams)(),
    _useSearchParams2 = _slicedToArray(_useSearchParams, 2),
    searchParams = _useSearchParams2[0],
    setSearchParams = _useSearchParams2[1];
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      pageIndex: 0,
      pageSize: 10
    }),
    _useState2 = _slicedToArray(_useState, 2),
    _useState2$ = _useState2[0],
    pageIndex = _useState2$.pageIndex,
    pageSize = _useState2$.pageSize,
    setPagination = _useState2[1];
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState({}),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    filter = _React$useState2[0],
    setFilter = _React$useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    sorting = _useState4[0],
    setSorting = _useState4[1];

  // make query string
  var queryString = function queryString(object) {
    var queryObject = lodash__WEBPACK_IMPORTED_MODULE_6___default().pickBy(object, Boolean);
    return new URLSearchParams(queryObject).toString();
  };
  var _useGetEvaluationList = (0,_services_api_EvaluationApiSlice__WEBPACK_IMPORTED_MODULE_1__.useGetEvaluationListQuery)(queryString(_objectSpread({
      page: pageIndex + 1,
      limit: pageSize,
      sort_by: (_sorting$ = sorting[0]) === null || _sorting$ === void 0 ? void 0 : _sorting$.id,
      sort_type: (_sorting$2 = sorting[0]) !== null && _sorting$2 !== void 0 && _sorting$2.desc ? "desc" : "asc"
    }, filter)), {
      refetchOnMountOrArgChange: true,
      skip: !(filter !== null && filter !== void 0 && filter.start_date)
    }),
    data = _useGetEvaluationList.data,
    isLoading = _useGetEvaluationList.isLoading,
    isFetching = _useGetEvaluationList.isFetching,
    refetch = _useGetEvaluationList.refetch;
  var mainData = data === null || data === void 0 ? void 0 : data.data;
  var Evaluations = data === null || data === void 0 ? void 0 : data.data.data;
  var getData = function getData(type) {
    var _data = lodash__WEBPACK_IMPORTED_MODULE_6___default().orderBy(Evaluations, "managements_decision", "asc");
    switch (type) {
      case "all":
        return _data;
      case "pending":
        return lodash__WEBPACK_IMPORTED_MODULE_6___default().filter(_data, function (d) {
          return d.managements_decision === null;
        });
      case "denied":
        return lodash__WEBPACK_IMPORTED_MODULE_6___default().filter(_data, function (d) {
          return d.managements_decision === "Rejected";
        });
      case "authorized":
        return lodash__WEBPACK_IMPORTED_MODULE_6___default().filter(_data, function (d) {
          return d.managements_decision === "Accepted";
        });
      default:
        return _data;
    }
  };
  var _data = {
    all: getData(null),
    pending: getData("pending"),
    denied: getData("denied"),
    authorized: getData("authorized")
  };
  var tableData = function tableData(type) {
    if (type) {
      return lodash__WEBPACK_IMPORTED_MODULE_6___default().orderBy(_data[type], ["authorization_status", "updated_at"], ["asc", "desc"]);
    } else return [];
  };
  var onPageChange = function onPageChange(paginate) {
    setPagination(paginate);
  };

  // console.log("filter data", filter);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_EvaluationTableFilterBar__WEBPACK_IMPORTED_MODULE_3__["default"], {
      setFilter: setFilter
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_global_Card__WEBPACK_IMPORTED_MODULE_7__["default"], {
      className: _EmployeeEvaluation_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].card,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(_components_Table_ui__WEBPACK_IMPORTED_MODULE_4__.Flex, {
        justifyContent: "space-between",
        marginBottom: "10px",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(Tabs, {
          data: _data
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_RefreshButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
          onClick: function onClick() {
            refetch();
          },
          isLoading: isFetching,
          className: "font-weight-normal"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_Table_EvaluationTable__WEBPACK_IMPORTED_MODULE_8__["default"], {
        data: tableData(searchParams.get("show")),
        mainData: mainData,
        columns: _toConsumableArray(_components_Table_EvaluationTableColumns__WEBPACK_IMPORTED_MODULE_9__.EvaluationTableColumns),
        isLoading: isLoading,
        isFetching: isFetching,
        onPageChange: onPageChange,
        sorting: sorting,
        tableName: "Evaluation Table",
        setSorting: setSorting
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmployeeEvaluation);
var Tabs = function Tabs(props) {
  var _useSearchParams3 = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useSearchParams)(),
    _useSearchParams4 = _slicedToArray(_useSearchParams3, 2),
    searchParams = _useSearchParams4[0],
    setSearchParams = _useSearchParams4[1];
  var data = props.data;
  // useEffect(() => {
  //     setSearchParams({ show: "pending" });
  // }, []);

  var handleRouteChange = function handleRouteChange(e, params) {
    e.preventDefault();

    // Create a new URLSearchParams object with the new parameters
    var newSearchParams = new URLSearchParams();

    // Set new parameters
    for (var _i = 0, _Object$entries = Object.entries(params); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      newSearchParams.set(key, value);
    }

    // Update the searchParams state with the new URLSearchParams object
    setSearchParams(newSearchParams);
  };
  var badge = function badge(type) {
    return lodash__WEBPACK_IMPORTED_MODULE_6___default().size(data[type]);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("ul", {
    className: _EmployeeEvaluation_module_css__WEBPACK_IMPORTED_MODULE_2__["default"].tabs,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("li", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Link, {
        to: "#",
        "data-type": "pending",
        onClick: function onClick(e) {
          return handleRouteChange(e, {
            show: "pending"
          });
        },
        "data-active": searchParams.get("show") === "pending",
        children: ["Pending", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
          className: "badge badge-light",
          children: badge("pending")
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("li", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Link, {
        to: "#",
        "data-type": "authorized",
        onClick: function onClick(e) {
          return handleRouteChange(e, {
            show: "authorized"
          });
        },
        "data-active": searchParams.get("show") === "authorized",
        children: ["Accepted", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
          className: "badge badge-light",
          children: badge("authorized")
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("li", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Link, {
        to: "#",
        "data-type": "denied",
        onClick: function onClick(e) {
          return handleRouteChange(e, {
            show: "denied"
          });
        },
        "data-active": searchParams.get("show") === "denied",
        children: ["Denied", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
          className: "badge badge-light",
          children: badge("denied")
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("li", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Link, {
        to: "#",
        "data-type": "all",
        onClick: function onClick(e) {
          return handleRouteChange(e, {
            show: "all"
          });
        },
        "data-active": searchParams.get("show") === "all",
        children: ["All", " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)("span", {
          className: "badge badge-light",
          children: badge("all")
        })]
      })
    })]
  });
};

/***/ }),

/***/ "./resources/js/react/utils/FormateDate.js":
/*!*************************************************!*\
  !*** ./resources/js/react/utils/FormateDate.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function FormatDate(isoDate) {
  if (isoDate) {
    var dateObject = new Date(isoDate);
    var day = dateObject.getDate();
    var month = dateObject.toLocaleString("en-US", {
      month: "long"
    });
    var year = dateObject.getFullYear();
    var hour = addLeadingZero(dateObject.getHours());
    var minute = addLeadingZero(dateObject.getMinutes());
    var second = addLeadingZero(dateObject.getSeconds());

    // Determine if it's AM or PM
    var meridiem = hour >= 12 ? "PM" : "AM";

    // Convert hour to 12-hour format
    hour = hour % 12 || 12;
    var formattedDate = "".concat(month, " ").concat(day, ", ").concat(year, ", ").concat(hour, ":").concat(minute, ":").concat(second, " ").concat(meridiem);
    return formattedDate;
  } else {
    return null;
  }
}

// Function to add leading zeros
var addLeadingZero = function addLeadingZero(value) {
  return value < 10 ? "0" + value : value;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormatDate);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./resources/js/react/employee-evaluation/components/button.module.css":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./resources/js/react/employee-evaluation/components/button.module.css ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".pFLMy1LBwIcau24\\+YArj5Q\\=\\= {\r\n    display: inline-block;\r\n    padding: 10px 20px;\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n    -webkit-text-decoration: none;\r\n    text-decoration: none;\r\n    transition: all 0.3s ease;\r\n    border: 1px solid #1967f8;\r\n    border-radius: 4px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 6px;\r\n    white-space: nowrap;\r\n}\r\n\r\n.pFLMy1LBwIcau24\\+YArj5Q\\=\\=:disabled{\r\n    cursor: not-allowed !important;\r\n    opacity: 0.6;\r\n}\r\n\r\n.pFLMy1LBwIcau24\\+YArj5Q\\=\\= > ._1UDieRaXtrJiZjEi7CwkFw\\=\\= {\r\n    font-size: 18px;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.pFLMy1LBwIcau24\\+YArj5Q\\=\\=:hover {\r\n    cursor: pointer;\r\n    background-color: rgba(0, 0, 0, 0.8);\r\n    border-color: rgba(0, 0, 0, 0.8);\r\n}\r\n\r\n/* button veriant */\r\n\r\n/* primary */\r\n\r\n.M0FQTM0k3AAwFYHKZeehtg\\=\\= {\r\n    background-color: #1967f8;\r\n    border-color: #1967f8;\r\n    color: #fff;\r\n}\r\n\r\n.M0FQTM0k3AAwFYHKZeehtg\\=\\=:hover {\r\n    background-color: rgba(0, 0, 0, 0.8);\r\n    border-color: rgba(0, 0, 0, 0.8);\r\n}\r\n\r\n.M0FQTM0k3AAwFYHKZeehtg\\=\\= > ._1UDieRaXtrJiZjEi7CwkFw\\=\\= {\r\n    color: #fff;\r\n}\r\n\r\n.M0FQTM0k3AAwFYHKZeehtg\\=\\=.UZ-XDiqryTDGGd8x9-tvdA\\=\\={\r\n    background-color: #1967f8 !important;\r\n    border-color: #1967f8 !important;\r\n    color: #fff !important;\r\n}\r\n\r\n/* secondary */\r\n\r\n.IyrDKIN\\+wNPXDpWeuDyfLQ\\=\\=,\r\n.IyrDKIN\\+wNPXDpWeuDyfLQ\\=\\=.UZ-XDiqryTDGGd8x9-tvdA\\=\\={\r\n    background-color: #e4e4e4;\r\n    border-color: #e4e4e4;\r\n    color: #000;\r\n}\r\n\r\n.IyrDKIN\\+wNPXDpWeuDyfLQ\\=\\=:hover {\r\n    background-color: rgba(0, 0, 0, 0.8);\r\n    color: #fff;\r\n    border-color: rgba(0, 0, 0, 0.8);\r\n}\r\n\r\n.IyrDKIN\\+wNPXDpWeuDyfLQ\\=\\= > ._1UDieRaXtrJiZjEi7CwkFw\\=\\= {\r\n    color: #000;\r\n}\r\n\r\n/* tertiary */\r\n\r\n.PCKFP1rGgfjZmHB23ZOWEA\\=\\=,\r\n.PCKFP1rGgfjZmHB23ZOWEA\\=\\=.PCKFP1rGgfjZmHB23ZOWEA\\=\\= { \r\n    background-color: #fff;\r\n    border-color: #dadada;\r\n    color: #383838;\r\n}\r\n\r\n.PCKFP1rGgfjZmHB23ZOWEA\\=\\=:hover {\r\n    background-color: #f1f1f1;\r\n    border-color: #dadada;\r\n}\r\n\r\n/* success */\r\n\r\n.Jt41m4X3qqQZayeDcfq8iA\\=\\=,\r\n.Jt41m4X3qqQZayeDcfq8iA\\=\\=.PCKFP1rGgfjZmHB23ZOWEA\\=\\= {\r\n    background-color: #01a545;\r\n    border-color: #01a545;\r\n    color: #fff;\r\n}\r\n\r\n.Jt41m4X3qqQZayeDcfq8iA\\=\\=:hover {\r\n    background-color: #018839;\r\n    border-color: #018839;\r\n}\r\n\r\n.PCKFP1rGgfjZmHB23ZOWEA\\=\\= > ._1UDieRaXtrJiZjEi7CwkFw\\=\\= {\r\n    color: #383838;\r\n}\r\n\r\n/* danger */\r\n\r\n.-HCxh21RI5\\+2Gww2kYoCCg\\=\\=,\r\n.-HCxh21RI5\\+2Gww2kYoCCg\\=\\=.PCKFP1rGgfjZmHB23ZOWEA\\=\\= {\r\n    background-color: #ff3838;\r\n    border-color: #ff3838;\r\n    color: #fff;\r\n}\r\n\r\n.-HCxh21RI5\\+2Gww2kYoCCg\\=\\=:hover {\r\n    background-color: #e63232;\r\n    border-color: #e63232;\r\n}\r\n\r\n.-HCxh21RI5\\+2Gww2kYoCCg\\=\\= > ._1UDieRaXtrJiZjEi7CwkFw\\=\\= {\r\n    color: #fff;\r\n}\r\n\r\n/* button sizes */\r\n\r\n.wd6WGbqGWFo7BqYyhIG5Sw\\=\\=, \r\n.wd6WGbqGWFo7BqYyhIG5Sw\\=\\=.UZ-XDiqryTDGGd8x9-tvdA\\=\\= {\r\n    padding: 15px 30px !important;\r\n    font-size: 18px !important;\r\n}\r\n\r\n.wd6WGbqGWFo7BqYyhIG5Sw\\=\\= > ._1UDieRaXtrJiZjEi7CwkFw\\=\\= {\r\n    font-size: 20px !important;\r\n}\r\n\r\n.tAPFOOeVocy4G-98L365TA\\=\\=,\r\n.tAPFOOeVocy4G-98L365TA\\=\\=.UZ-XDiqryTDGGd8x9-tvdA\\=\\= {\r\n    padding: 10px 20px !important;\r\n    font-size: 16px !important;\r\n}\r\n\r\n.tAPFOOeVocy4G-98L365TA\\=\\= > ._1UDieRaXtrJiZjEi7CwkFw\\=\\= {\r\n    font-size: 16px !important;\r\n}\r\n\r\n.H\\+JdDpK5TfuwctVIkrAd9Q\\=\\=,\r\n.H\\+JdDpK5TfuwctVIkrAd9Q\\=\\=.UZ-XDiqryTDGGd8x9-tvdA\\=\\= {\r\n    padding: 5px 10px !important;\r\n    font-size: 14px !important;\r\n}\r\n\r\n.H\\+JdDpK5TfuwctVIkrAd9Q\\=\\= > ._1UDieRaXtrJiZjEi7CwkFw\\=\\= {\r\n    font-size: 14px !important;\r\n}\r\n\r\n/* disable */\r\n\r\n/* .cnx__btn_disabled.cnx__btn_disabled {\r\n    background-color: #e4e4e4;\r\n    border-color: #e4e4e4;\r\n    color: #000;\r\n    cursor: not-allowed;\r\n}\r\n\r\n.cnx__btn_success.cnx__btn_disabled.cnx__btn_disabled {\r\n    background-color: #3e9763;\r\n    border-color: #01a545;\r\n    color: #fff;\r\n    cursor: not-allowed;\r\n    opacity: 0.5;\r\n}*/\r\n\r\n.wViVH1Q-GONC4Qmr5-b2pQ\\=\\={\r\n    cursor: progress !important;\r\n    opacity: 0.9 !important;\r\n} \r\n", "",{"version":3,"sources":["webpack://./resources/js/react/employee-evaluation/components/button.module.css"],"names":[],"mappings":"AAAA;IACI,qBAAqB;IACrB,kBAAkB;IAClB,eAAe;IACf,gBAAgB;IAChB,6BAA6B;IAC7B,qBAAqB;IACrB,yBAAyB;IACzB,yBAAyB;IACzB,kBAAkB;IAClB,aAAa;IACb,mBAAmB;IACnB,QAAQ;IACR,mBAAmB;AACvB;;AAEA;IACI,8BAA8B;IAC9B,YAAY;AAChB;;AAEA;IACI,eAAe;IACf,UAAU;IACV,SAAS;AACb;;AAEA;IACI,eAAe;IACf,oCAAoC;IACpC,gCAAgC;AACpC;;AAEA,mBAAmB;;AAEnB,YAAY;;AAEZ;IACI,yBAAyB;IACzB,qBAAqB;IACrB,WAAW;AACf;;AAEA;IACI,oCAAoC;IACpC,gCAAgC;AACpC;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,oCAAoC;IACpC,gCAAgC;IAChC,sBAAsB;AAC1B;;AAEA,cAAc;;AAEd;;IAEI,yBAAyB;IACzB,qBAAqB;IACrB,WAAW;AACf;;AAEA;IACI,oCAAoC;IACpC,WAAW;IACX,gCAAgC;AACpC;;AAEA;IACI,WAAW;AACf;;AAEA,aAAa;;AAEb;;IAEI,sBAAsB;IACtB,qBAAqB;IACrB,cAAc;AAClB;;AAEA;IACI,yBAAyB;IACzB,qBAAqB;AACzB;;AAEA,YAAY;;AAEZ;;IAEI,yBAAyB;IACzB,qBAAqB;IACrB,WAAW;AACf;;AAEA;IACI,yBAAyB;IACzB,qBAAqB;AACzB;;AAEA;IACI,cAAc;AAClB;;AAEA,WAAW;;AAEX;;IAEI,yBAAyB;IACzB,qBAAqB;IACrB,WAAW;AACf;;AAEA;IACI,yBAAyB;IACzB,qBAAqB;AACzB;;AAEA;IACI,WAAW;AACf;;AAEA,iBAAiB;;AAEjB;;IAEI,6BAA6B;IAC7B,0BAA0B;AAC9B;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;;IAEI,6BAA6B;IAC7B,0BAA0B;AAC9B;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;;IAEI,4BAA4B;IAC5B,0BAA0B;AAC9B;;AAEA;IACI,0BAA0B;AAC9B;;AAEA,YAAY;;AAEZ;;;;;;;;;;;;;EAaE;;AAEF;IACI,2BAA2B;IAC3B,uBAAuB;AAC3B","sourcesContent":[".cnx__btn {\r\n    display: inline-block;\r\n    padding: 10px 20px;\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n    -webkit-text-decoration: none;\r\n    text-decoration: none;\r\n    transition: all 0.3s ease;\r\n    border: 1px solid #1967f8;\r\n    border-radius: 4px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 6px;\r\n    white-space: nowrap;\r\n}\r\n\r\n.cnx__btn:disabled{\r\n    cursor: not-allowed !important;\r\n    opacity: 0.6;\r\n}\r\n\r\n.cnx__btn > .cnx__btn_icon {\r\n    font-size: 18px;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\n.cnx__btn:hover {\r\n    cursor: pointer;\r\n    background-color: rgba(0, 0, 0, 0.8);\r\n    border-color: rgba(0, 0, 0, 0.8);\r\n}\r\n\r\n/* button veriant */\r\n\r\n/* primary */\r\n\r\n.cnx__btn_primary {\r\n    background-color: #1967f8;\r\n    border-color: #1967f8;\r\n    color: #fff;\r\n}\r\n\r\n.cnx__btn_primary:hover {\r\n    background-color: rgba(0, 0, 0, 0.8);\r\n    border-color: rgba(0, 0, 0, 0.8);\r\n}\r\n\r\n.cnx__btn_primary > .cnx__btn_icon {\r\n    color: #fff;\r\n}\r\n\r\n.cnx__btn_primary.cnx__btn_disabled{\r\n    background-color: #1967f8 !important;\r\n    border-color: #1967f8 !important;\r\n    color: #fff !important;\r\n}\r\n\r\n/* secondary */\r\n\r\n.cnx__btn_secondary,\r\n.cnx__btn_secondary.cnx__btn_disabled{\r\n    background-color: #e4e4e4;\r\n    border-color: #e4e4e4;\r\n    color: #000;\r\n}\r\n\r\n.cnx__btn_secondary:hover {\r\n    background-color: rgba(0, 0, 0, 0.8);\r\n    color: #fff;\r\n    border-color: rgba(0, 0, 0, 0.8);\r\n}\r\n\r\n.cnx__btn_secondary > .cnx__btn_icon {\r\n    color: #000;\r\n}\r\n\r\n/* tertiary */\r\n\r\n.cnx__btn_tertiary,\r\n.cnx__btn_tertiary.cnx__btn_tertiary { \r\n    background-color: #fff;\r\n    border-color: #dadada;\r\n    color: #383838;\r\n}\r\n\r\n.cnx__btn_tertiary:hover {\r\n    background-color: #f1f1f1;\r\n    border-color: #dadada;\r\n}\r\n\r\n/* success */\r\n\r\n.cnx__btn_success,\r\n.cnx__btn_success.cnx__btn_tertiary {\r\n    background-color: #01a545;\r\n    border-color: #01a545;\r\n    color: #fff;\r\n}\r\n\r\n.cnx__btn_success:hover {\r\n    background-color: #018839;\r\n    border-color: #018839;\r\n}\r\n\r\n.cnx__btn_tertiary > .cnx__btn_icon {\r\n    color: #383838;\r\n}\r\n\r\n/* danger */\r\n\r\n.cnx__btn_danger,\r\n.cnx__btn_danger.cnx__btn_tertiary {\r\n    background-color: #ff3838;\r\n    border-color: #ff3838;\r\n    color: #fff;\r\n}\r\n\r\n.cnx__btn_danger:hover {\r\n    background-color: #e63232;\r\n    border-color: #e63232;\r\n}\r\n\r\n.cnx__btn_danger > .cnx__btn_icon {\r\n    color: #fff;\r\n}\r\n\r\n/* button sizes */\r\n\r\n.cnx__btn_lg, \r\n.cnx__btn_lg.cnx__btn_disabled {\r\n    padding: 15px 30px !important;\r\n    font-size: 18px !important;\r\n}\r\n\r\n.cnx__btn_lg > .cnx__btn_icon {\r\n    font-size: 20px !important;\r\n}\r\n\r\n.cnx__btn_md,\r\n.cnx__btn_md.cnx__btn_disabled {\r\n    padding: 10px 20px !important;\r\n    font-size: 16px !important;\r\n}\r\n\r\n.cnx__btn_md > .cnx__btn_icon {\r\n    font-size: 16px !important;\r\n}\r\n\r\n.cnx__btn_sm,\r\n.cnx__btn_sm.cnx__btn_disabled {\r\n    padding: 5px 10px !important;\r\n    font-size: 14px !important;\r\n}\r\n\r\n.cnx__btn_sm > .cnx__btn_icon {\r\n    font-size: 14px !important;\r\n}\r\n\r\n/* disable */\r\n\r\n/* .cnx__btn_disabled.cnx__btn_disabled {\r\n    background-color: #e4e4e4;\r\n    border-color: #e4e4e4;\r\n    color: #000;\r\n    cursor: not-allowed;\r\n}\r\n\r\n.cnx__btn_success.cnx__btn_disabled.cnx__btn_disabled {\r\n    background-color: #3e9763;\r\n    border-color: #01a545;\r\n    color: #fff;\r\n    cursor: not-allowed;\r\n    opacity: 0.5;\r\n}*/\r\n\r\n.cnx__btn_loading{\r\n    cursor: progress !important;\r\n    opacity: 0.9 !important;\r\n} \r\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"cnx__btn": "pFLMy1LBwIcau24+YArj5Q==",
	"cnx__btn_icon": "_1UDieRaXtrJiZjEi7CwkFw==",
	"cnx__btn_primary": "M0FQTM0k3AAwFYHKZeehtg==",
	"cnx__btn_disabled": "UZ-XDiqryTDGGd8x9-tvdA==",
	"cnx__btn_secondary": "IyrDKIN+wNPXDpWeuDyfLQ==",
	"cnx__btn_tertiary": "PCKFP1rGgfjZmHB23ZOWEA==",
	"cnx__btn_success": "Jt41m4X3qqQZayeDcfq8iA==",
	"cnx__btn_danger": "-HCxh21RI5+2Gww2kYoCCg==",
	"cnx__btn_lg": "wd6WGbqGWFo7BqYyhIG5Sw==",
	"cnx__btn_md": "tAPFOOeVocy4G-98L365TA==",
	"cnx__btn_sm": "H+JdDpK5TfuwctVIkrAd9Q==",
	"cnx__btn_loading": "wViVH1Q-GONC4Qmr5-b2pQ=="
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./resources/js/react/employee-evaluation/pages/EmployeeEvaluation.module.css":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./resources/js/react/employee-evaluation/pages/EmployeeEvaluation.module.css ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".pXBWuE-u9ZPA-6lVzSpnKQ\\=\\={\r\n \r\n                    border-radius: 10px;\r\n                    padding: 20px;\r\n                    margin: 10px;\r\n                    background-color: white;\r\n                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\r\n               \r\n}\r\n.rwuau9zL4g2tby\\+YegJ8yg\\=\\={\r\n                    background-color: white;\r\n                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\r\n                    max-width: 700px;\r\n}\r\n.M6\\+nFizFL82i8eOBr8pN5g\\=\\={\r\n                    background-color: white;\r\n                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\r\n                    max-width: 1200px;\r\n}\r\n.TfK5H8jfkwMQcy8\\+B7o4xQ\\=\\={\r\n                    background-color: white;\r\n                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\r\n                    max-width: 800px;\r\n}\r\n\r\n.p7yDk9jz-Y63SfEOkwlZRg\\=\\={\r\n  width: 600px;\r\n\r\n  box-shadow: 0 0 10px rgb(0 0 0 / 15%)\r\n}\r\n\r\n@media only screen and (max-width: 1200px){\r\n  /* .card{\r\n      width: 95vw;\r\n  } */\r\n\r\n  .p7yDk9jz-Y63SfEOkwlZRg\\=\\={\r\n      width: 600px;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 756px){\r\n  .p7yDk9jz-Y63SfEOkwlZRg\\=\\={\r\n      width: 95vw;\r\n  }\r\n}\r\n\r\n.jH2N\\+P5\\+ujyj4jLa4x5eBQ\\=\\={\r\n  max-height: 80vh;\r\n  overflow-y: auto;\r\n  padding-right: 16px;;\r\n}\r\n\r\n\r\n.cKVcS5\\+lAmIF1BsjkIQFtw\\=\\={\r\n  font-family: Inter;\r\n  font-weight: 500;\r\n}\r\n\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a {\r\n  padding: 3px 10px;\r\n  border-radius: 4px;\r\n  font-weight: 500;\r\n  font-size: 14px;\r\n  transition: all 0.2s ease-in-out;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n}\r\n\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a span.SY4v7ZS2NGq52LLq8fCLlA\\=\\={\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: 1px solid rgb(0 0 0 / 15%);\r\n}\r\n\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a[data-type='all'] {\r\n  background-color: #e9f8fa;\r\n  color: #24b8cf;\r\n}\r\n\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a[data-type='all']:hover,\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a[data-type='all'][data-active=\"true\"]{\r\n color: #e9f8fa !important;\r\n background-color: #24b8cf;\r\n}\r\n\r\n\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a[data-type='pending'] {\r\n  background-color:rgb(255, 238, 219);\r\n  color:rgb(255, 145, 20);\r\n}\r\n\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a[data-type='pending']:hover,\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a[data-type='pending'][data-active=\"true\"]{\r\n  color:rgb(255, 248, 240) !important;\r\n  background-color:rgb(255, 145, 20);\r\n}\r\n\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a[data-type='authorized'] {\r\n  color: #119911;\r\n  background-color: #e7f5e7;\r\n}\r\n\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a[data-type='authorized']:hover,\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a[data-type='authorized'][data-active=\"true\"]{\r\n  background-color: #119911;\r\n  color: #e7f5e7 !important;\r\n}\r\n\r\n\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a[data-type='denied'] {\r\n  color: rgb(240, 51, 44);\r\n  background-color: rgb(250, 221, 220);\r\n}\r\n\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a[data-type='denied']:hover,\r\n.vTM6B2AJyM5MXNr0Ys6RrA\\=\\= li a[data-type='denied'][data-active=\"true\"] {\r\n  background-color: rgb(240, 51, 44);\r\n  color: rgb(255, 250, 249) !important;\r\n}\r\n\r\n._8EYzHito-OP1cFVXEzYWZQ\\=\\={\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n}\r\n\r\n.CYn3DgvHQkU-rKB-SCLlLA\\=\\={\r\n  display: -moz-grid;\r\n  display: grid;\r\n  grid-template-columns: 180px 1fr;\r\n  gap: 1rem;\r\n}\r\n\r\n.CYn3DgvHQkU-rKB-SCLlLA\\=\\= div[data-type = 'label']{\r\n  font-weight: 500;\r\n  position: relative;\r\n}\r\n\r\n.CYn3DgvHQkU-rKB-SCLlLA\\=\\= div[data-type = 'label']::after{\r\n  content: ':';\r\n  position: absolute;\r\n  right: 0;\r\n}\r\n\r\n.CYn3DgvHQkU-rKB-SCLlLA\\=\\= div[data-type = 'data']{\r\n  color: #161616;\r\n  font-size: 400;\r\n}\r\n\r\n.CYn3DgvHQkU-rKB-SCLlLA\\=\\= div[data-type = 'data'] a {\r\n  color: #161616;\r\n}\r\n\r\n.CYn3DgvHQkU-rKB-SCLlLA\\=\\= div[data-type = 'data'] a:hover {\r\n  color: #161616;\r\n  text-decoration: underline;\r\n}\r\n\r\n.U42VPMt02tQraheZGI1qwQ\\=\\={\r\n  margin-top: -15px;\r\n  background-color: #F1F3F6;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n}", "",{"version":3,"sources":["webpack://./resources/js/react/employee-evaluation/pages/EmployeeEvaluation.module.css"],"names":[],"mappings":"AAAA;;oBAEoB,mBAAmB;oBACnB,aAAa;oBACb,YAAY;oBACZ,uBAAuB;oBACvB,2CAA2C;;AAE/D;AACA;oBACoB,uBAAuB;oBACvB,2CAA2C;oBAC3C,gBAAgB;AACpC;AACA;oBACoB,uBAAuB;oBACvB,2CAA2C;oBAC3C,iBAAiB;AACrC;AACA;oBACoB,uBAAuB;oBACvB,2CAA2C;oBAC3C,gBAAgB;AACpC;;AAEA;EACE,YAAY;;EAEZ;AACF;;AAEA;EACE;;KAEG;;EAEH;MACI,YAAY;EAChB;AACF;;AAEA;EACE;MACI,WAAW;EACf;AACF;;AAEA;EACE,gBAAgB;EAChB,gBAAgB;EAChB,mBAAmB;AACrB;;;AAGA;EACE,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,SAAS;EACT,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;EACf,gCAAgC;EAChC,aAAa;EACb,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,kCAAkC;AACpC;;AAEA;EACE,yBAAyB;EACzB,cAAc;AAChB;;AAEA;;CAEC,yBAAyB;CACzB,yBAAyB;AAC1B;;;AAGA;EACE,mCAAmC;EACnC,uBAAuB;AACzB;;AAEA;;EAEE,mCAAmC;EACnC,kCAAkC;AACpC;;AAEA;EACE,cAAc;EACd,yBAAyB;AAC3B;;AAEA;;EAEE,yBAAyB;EACzB,yBAAyB;AAC3B;;;AAGA;EACE,uBAAuB;EACvB,oCAAoC;AACtC;;AAEA;;EAEE,kCAAkC;EAClC,oCAAoC;AACtC;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EAEE,kBAAkB;EAClB,aAAa;EACb,gCAAgC;EAChC,SAAS;AACX;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,cAAc;EACd,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,0BAA0B;AAC5B;;AAEA;EACE,iBAAiB;EACjB,yBAAyB;EACzB,aAAa;EACb,kBAAkB;AACpB","sourcesContent":[".card{\r\n \r\n                    border-radius: 10px;\r\n                    padding: 20px;\r\n                    margin: 10px;\r\n                    background-color: white;\r\n                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\r\n               \r\n}\r\n.rating_card{\r\n                    background-color: white;\r\n                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\r\n                    max-width: 700px;\r\n}\r\n.taskList_card{\r\n                    background-color: white;\r\n                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\r\n                    max-width: 1200px;\r\n}\r\n.revision_card{\r\n                    background-color: white;\r\n                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\r\n                    max-width: 800px;\r\n}\r\n\r\n.card_auth_form{\r\n  width: 600px;\r\n\r\n  box-shadow: 0 0 10px rgb(0 0 0 / 15%)\r\n}\r\n\r\n@media only screen and (max-width: 1200px){\r\n  /* .card{\r\n      width: 95vw;\r\n  } */\r\n\r\n  .card_auth_form{\r\n      width: 600px;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 756px){\r\n  .card_auth_form{\r\n      width: 95vw;\r\n  }\r\n}\r\n\r\n.card_body{\r\n  max-height: 80vh;\r\n  overflow-y: auto;\r\n  padding-right: 16px;;\r\n}\r\n\r\n\r\n.approval_button{\r\n  font-family: Inter;\r\n  font-weight: 500;\r\n}\r\n\r\n.tabs {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.tabs li a {\r\n  padding: 3px 10px;\r\n  border-radius: 4px;\r\n  font-weight: 500;\r\n  font-size: 14px;\r\n  transition: all 0.2s ease-in-out;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n}\r\n\r\n.tabs li a span.badge{\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  border: 1px solid rgb(0 0 0 / 15%);\r\n}\r\n\r\n.tabs li a[data-type='all'] {\r\n  background-color: #e9f8fa;\r\n  color: #24b8cf;\r\n}\r\n\r\n.tabs li a[data-type='all']:hover,\r\n.tabs li a[data-type='all'][data-active=\"true\"]{\r\n color: #e9f8fa !important;\r\n background-color: #24b8cf;\r\n}\r\n\r\n\r\n.tabs li a[data-type='pending'] {\r\n  background-color:rgb(255, 238, 219);\r\n  color:rgb(255, 145, 20);\r\n}\r\n\r\n.tabs li a[data-type='pending']:hover,\r\n.tabs li a[data-type='pending'][data-active=\"true\"]{\r\n  color:rgb(255, 248, 240) !important;\r\n  background-color:rgb(255, 145, 20);\r\n}\r\n\r\n.tabs li a[data-type='authorized'] {\r\n  color: #119911;\r\n  background-color: #e7f5e7;\r\n}\r\n\r\n.tabs li a[data-type='authorized']:hover,\r\n.tabs li a[data-type='authorized'][data-active=\"true\"]{\r\n  background-color: #119911;\r\n  color: #e7f5e7 !important;\r\n}\r\n\r\n\r\n.tabs li a[data-type='denied'] {\r\n  color: rgb(240, 51, 44);\r\n  background-color: rgb(250, 221, 220);\r\n}\r\n\r\n.tabs li a[data-type='denied']:hover,\r\n.tabs li a[data-type='denied'][data-active=\"true\"] {\r\n  background-color: rgb(240, 51, 44);\r\n  color: rgb(255, 250, 249) !important;\r\n}\r\n\r\n.items{\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n}\r\n\r\n.item{\r\n  display: -ms-grid;\r\n  display: -moz-grid;\r\n  display: grid;\r\n  grid-template-columns: 180px 1fr;\r\n  gap: 1rem;\r\n}\r\n\r\n.item div[data-type = 'label']{\r\n  font-weight: 500;\r\n  position: relative;\r\n}\r\n\r\n.item div[data-type = 'label']::after{\r\n  content: ':';\r\n  position: absolute;\r\n  right: 0;\r\n}\r\n\r\n.item div[data-type = 'data']{\r\n  color: #161616;\r\n  font-size: 400;\r\n}\r\n\r\n.item div[data-type = 'data'] a {\r\n  color: #161616;\r\n}\r\n\r\n.item div[data-type = 'data'] a:hover {\r\n  color: #161616;\r\n  text-decoration: underline;\r\n}\r\n\r\n.description{\r\n  margin-top: -15px;\r\n  background-color: #F1F3F6;\r\n  padding: 10px;\r\n  border-radius: 4px;\r\n}"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"card": "pXBWuE-u9ZPA-6lVzSpnKQ==",
	"rating_card": "rwuau9zL4g2tby+YegJ8yg==",
	"taskList_card": "M6+nFizFL82i8eOBr8pN5g==",
	"revision_card": "TfK5H8jfkwMQcy8+B7o4xQ==",
	"card_auth_form": "p7yDk9jz-Y63SfEOkwlZRg==",
	"card_body": "jH2N+P5+ujyj4jLa4x5eBQ==",
	"approval_button": "cKVcS5+lAmIF1BsjkIQFtw==",
	"tabs": "vTM6B2AJyM5MXNr0Ys6RrA==",
	"badge": "SY4v7ZS2NGq52LLq8fCLlA==",
	"items": "_8EYzHito-OP1cFVXEzYWZQ==",
	"item": "CYn3DgvHQkU-rKB-SCLlLA==",
	"description": "U42VPMt02tQraheZGI1qwQ=="
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./resources/js/react/employee-evaluation/components/button.module.css":
/*!*****************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/components/button.module.css ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_button_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./button.module.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./resources/js/react/employee-evaluation/components/button.module.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_button_module_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_button_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/react/employee-evaluation/pages/EmployeeEvaluation.module.css":
/*!************************************************************************************!*\
  !*** ./resources/js/react/employee-evaluation/pages/EmployeeEvaluation.module.css ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_EmployeeEvaluation_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./EmployeeEvaluation.module.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[8].oneOf[1].use[2]!./resources/js/react/employee-evaluation/pages/EmployeeEvaluation.module.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_EmployeeEvaluation_module_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_1_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_8_oneOf_1_use_2_EmployeeEvaluation_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);
//# sourceMappingURL=resources_js_react_employee-evaluation_pages_EmployeeEvaluation_jsx.js.map