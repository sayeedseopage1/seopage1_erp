"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_TimeLogTable_pages_TimeLogHistory_jsx"],{

/***/ "./resources/js/react/TimeLogTable/components/Button.jsx":
/*!***************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/Button.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["children", "type", "disabled", "className", "variant", "size", "onClick"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


var Button = function Button(_ref) {
  var children = _ref.children,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "button" : _ref$type,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'primary' : _ref$variant,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "sm" : _ref$size,
    onClick = _ref.onClick,
    props = _objectWithoutProperties(_ref, _excluded);
  var classes = "cnx__btn cnx__btn_".concat(variant, " ").concat(disabled ? 'cnx__btn_disabled' : '', " cnx__btn_").concat(size, " ").concat(className);
  var handleOnClick = function handleOnClick(e) {
    onClick && onClick(e);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", _objectSpread(_objectSpread({
    type: "button",
    className: classes,
    disabled: disabled,
    onClick: handleOnClick
  }, props), {}, {
    children: children
  }));
};
Button.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node).isRequired || (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired || (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array).isRequired,
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  variant: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf(['primary', 'secondary', 'tertiary', 'success']),
  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOf(['sm', 'md', 'lg']),
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
  href: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/EmptyTable.jsx":
/*!*******************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/EmptyTable.jsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var EmptyTable = function EmptyTable() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "d-flex flex-column align-items-center justify-content-center",
    style: {
      height: '30vh'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
        width: "130",
        height: "130",
        viewBox: "0 0 80 80",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("g", {
          fill: "none",
          fillRule: "evenodd",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
            d: "M0 0h80v80H0z"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("g", {
            stroke: "#CBCCCD",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              d: "M75 21.5V30M75 37v30.5a1.5 1.5 0 0 1-1.5 1.5h-67A1.5 1.5 0 0 1 5 67.5V41M5 36.264v-2.57M13 33h12M13 46h12M13 59h12"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("g", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
                d: "M34 33h12M34 46h12M34 59h12"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("g", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
                d: "M55 33h12M55 46h12M55 59h12"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
              fill: "#CBCCCD",
              d: "M6.5 12h67a1.5 1.5 0 0 1 1.5 1.5V22H5v-8.5A1.5 1.5 0 0 1 6.5 12z"
            })]
          })]
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "font-weight-bold",
      style: {
        color: '#CBCCCD'
      },
      children: "Data Not Available"
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmptyTable);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/MissedDayCount.jsx":
/*!***********************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/MissedDayCount.jsx ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TimeLogHistoryModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimeLogHistoryModal */ "./resources/js/react/TimeLogTable/components/TimeLogHistoryModal.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var MissedDayCount = function MissedDayCount(_ref) {
  var row = _ref.row;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var close = function close(e) {
    e.preventDefault();
    setIsOpen(false);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
      type: "button",
      "aria-level": "MissedDayCountModalToggleButton",
      onClick: function onClick() {
        return setIsOpen(true);
      },
      className: "px-2 font-weight-bold sp1_tlh_resolve_btn",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "",
        children: row === null || row === void 0 ? void 0 : row.missed_hours_count
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_TimeLogHistoryModal__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isOpen: isOpen,
      close: close,
      row: row
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MissedDayCount);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/Modal.jsx":
/*!**************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/Modal.jsx ***!
  \**************************************************************/
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
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
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
  children: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().node).isRequired,
  isOpen: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool).isRequired,
  className: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/TimeLogHistoryColumn.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TimeLogHistoryColumn.jsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TimeLogHistoryColumn: () => (/* binding */ TimeLogHistoryColumn)
/* harmony export */ });
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var _MissedDayCount__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MissedDayCount */ "./resources/js/react/TimeLogTable/components/MissedDayCount.jsx");
/* harmony import */ var _UserRender__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserRender */ "./resources/js/react/TimeLogTable/components/UserRender.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var TimeLogHistoryColumn = [{
  id: 'employee_id',
  header: 'Employee Name',
  className: '',
  sorted: false,
  sortAccessor: '',
  cell: function cell(row, className) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_UserRender__WEBPACK_IMPORTED_MODULE_2__["default"], {
      name: row === null || row === void 0 ? void 0 : row.employee_name,
      profileUrl: "/account/employees/".concat(row === null || row === void 0 ? void 0 : row.employee_id),
      image: row === null || row === void 0 ? void 0 : row.employee_image,
      role: row === null || row === void 0 ? void 0 : row.employee_roles,
      id: row === null || row === void 0 ? void 0 : row.employee_id
    });
  }
}, {
  id: 'ideal_tracked_hours',
  header: 'Ideal Tracked Hours',
  className: '',
  sorted: false,
  sortAccessor: '',
  cell: function cell(row) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
      children: [" ", (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_0__.convertTime)(row === null || row === void 0 ? void 0 : row.ideal_minutes), " "]
    });
  }
}, {
  id: 'actual_logged_hours',
  header: 'Actual Logged Hours',
  className: '',
  sorted: false,
  sortAccessor: '',
  cell: function cell(row) {
    var _row$total_minutes;
    var totalMinute = (_row$total_minutes = row === null || row === void 0 ? void 0 : row.total_minutes) !== null && _row$total_minutes !== void 0 ? _row$total_minutes : 0;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
      children: [" ", (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_0__.convertTime)(totalMinute), " "]
    });
  }
}, {
  id: 'missed_hours',
  header: 'Missed Hours',
  className: '',
  sorted: false,
  sortAccessor: '',
  cell: function cell(row) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
      children: [" ", (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_0__.convertTime)(row === null || row === void 0 ? void 0 : row.missed_hours), " "]
    });
  }
}, {
  id: 'missed_day_count',
  header: 'Missed Day Count',
  className: '',
  sorted: false,
  sortAccessor: '',
  cell: function cell(row) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_MissedDayCount__WEBPACK_IMPORTED_MODULE_1__["default"], {
      row: row
    });
  }
}];

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/TimeLogHistoryFilterBar.jsx":
/*!********************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TimeLogHistoryFilterBar.jsx ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TimeLogHistoryTableFilterBar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _JqueryDateRangePicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./JqueryDateRangePicker */ "./resources/js/react/TimeLogTable/components/JqueryDateRangePicker.jsx");
/* harmony import */ var _PersonFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PersonFilter */ "./resources/js/react/TimeLogTable/components/PersonFilter.jsx");
/* harmony import */ var _services_api_userSliceApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/api/userSliceApi */ "./resources/js/react/services/api/userSliceApi.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_usersSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/features/usersSlice */ "./resources/js/react/services/features/usersSlice.js");
/* harmony import */ var _FilterBarItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FilterBarItem */ "./resources/js/react/TimeLogTable/components/FilterBarItem.jsx");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











function TimeLogHistoryTableFilterBar(_ref) {
  var _window;
  var onFilter = _ref.onFilter;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)(function (s) {
      return s.users;
    }),
    users = _useSelector.users;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useDispatch)();
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    startDate = _React$useState2[0],
    setStartDate = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    endDate = _React$useState4[0],
    setEndDate = _React$useState4[1];

  // employee
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    selectedEmployeeId = _React$useState6[0],
    setSelectedEmployeeId = _React$useState6[1];
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    selectedEmployeeName = _React$useState8[0],
    setSelectedEmployeeName = _React$useState8[1];
  var logged_user = (_window = window) === null || _window === void 0 || (_window = _window.Laravel) === null || _window === void 0 ? void 0 : _window.user;
  var top_management = [1, 6, 4, 8].includes(Number(logged_user === null || logged_user === void 0 ? void 0 : logged_user.role_id));

  // fetch all users
  var _useLazyGetAllUsersQu = (0,_services_api_userSliceApi__WEBPACK_IMPORTED_MODULE_4__.useLazyGetAllUsersQuery)('', {
      skip: users.length
    }),
    _useLazyGetAllUsersQu2 = _slicedToArray(_useLazyGetAllUsersQu, 2),
    getAllUsers = _useLazyGetAllUsersQu2[0],
    userIsFetching = _useLazyGetAllUsersQu2[1].isFetching;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (!users.length && !userIsFetching) {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var res;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getAllUsers().unwrap();
            case 2:
              res = _context.sent;
              if (res) {
                dispatch((0,_services_features_usersSlice__WEBPACK_IMPORTED_MODULE_6__.setUsers)(res));
              }
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    }
  }, []);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (users !== null && users !== void 0 && users.length) {
      if (!top_management) {
        setSelectedEmployeeId(logged_user === null || logged_user === void 0 ? void 0 : logged_user.id);
      }
    }
  }, [users]);
  var content = null;

  // filter options
  var _selectedEmployeeId = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return selectedEmployeeId;
  }, [selectedEmployeeId]);
  var _startDate = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return startDate;
  }, [startDate]);
  var _endDate = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return endDate;
  }, [endDate]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
    if (_startDate && endDate) {
      onFilter({
        start_date: dayjs__WEBPACK_IMPORTED_MODULE_8___default()(_startDate).format('YYYY-MM-DD'),
        end_date: dayjs__WEBPACK_IMPORTED_MODULE_8___default()(_endDate).format('YYYY-MM-DD'),
        employee_id: _selectedEmployeeId,
        employee_name: selectedEmployeeName
      });
    }
  }, [_selectedEmployeeId, _startDate, _endDate]);
  var handleDateFilter = function handleDateFilter(s, e) {};
  var handleEmployeeFilter = function handleEmployeeFilter(e, data) {
    e.preventDefault();
    if (data) {
      setSelectedEmployeeName(data.name);
      setSelectedEmployeeId(data.id);
    } else {
      setSelectedEmployeeId(null);
      setSelectedEmployeeName(null);
    }
  };
  content = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    className: "d-flex flex-wrap bg-white p-1",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
      className: "border-right pr-1",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_JqueryDateRangePicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
        startDate: startDate,
        setStartDate: setStartDate,
        endDate: endDate,
        setEndDate: setEndDate,
        onApply: handleDateFilter
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_PersonFilter__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: "Employee",
      items: users ? _toConsumableArray(users === null || users === void 0 ? void 0 : users.filter(function (user) {
        if (top_management) {
          return user.role_id && Number(user.role_id) !== 4;
        } else {
          return user.id === logged_user.id;
        }
      })) : [],
      selected: selectedEmployeeId ? users === null || users === void 0 ? void 0 : users.find(function (u) {
        return Number(u.id) === selectedEmployeeId;
      }) : null,
      isLoading: userIsFetching,
      onSelect: handleEmployeeFilter,
      selectedAllButton: top_management
    })]
  });
  if (!content) {
    return null;
  }
  return /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(content, document.getElementById('timeLogTableFilterBar'));
}

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/TimeLogHistoryLoader.jsx":
/*!*****************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TimeLogHistoryLoader.jsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var PersonLoader = function PersonLoader() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "d-flex align-items-center",
    style: {
      gap: "10px"
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
      className: "sp1-item-center border rounded-circle",
      width: "36px",
      height: "36px"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h6", {
        className: "mb-2 f-14",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "130px"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "f-12 text-hover-underline",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          height: "10px",
          width: "80px"
        })
      })]
    })]
  });
};
var TimeLogHistoryLoader = function TimeLogHistoryLoader() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: lodash__WEBPACK_IMPORTED_MODULE_2___default().times(10, function (i) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
        className: "sp1_tlr_tr",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {
            width: "180px"
          }), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "180px"
          }), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "180px"
          }), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "180px"
          }), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "50px"
          }), " "]
        })]
      }, i);
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLogHistoryLoader);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/TimeLogHistoryModal.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TimeLogHistoryModal.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal */ "./resources/js/react/TimeLogTable/components/Modal.jsx");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button */ "./resources/js/react/TimeLogTable/components/Button.jsx");
/* harmony import */ var _single_task_components_Loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../single-task/components/Loader */ "./resources/js/react/single-task/components/Loader.jsx");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");









var TimeLogHIstoryModalTable = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().lazy(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_TimeLogTable_components_TimeLogHIstoryModalTable_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ./TimeLogHIstoryModalTable */ "./resources/js/react/TimeLogTable/components/TimeLogHIstoryModalTable.jsx"));
});
var TimeLogHistoryModal = function TimeLogHistoryModal(_ref) {
  var row = _ref.row,
    isOpen = _ref.isOpen,
    close = _ref.close;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)(function (s) {
      return s.timeLogHistory;
    }),
    filter = _useSelector.filter;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isOpen: isOpen,
    className: "sp1_single_task--modal",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "sp1_single_task--modal-panerl-wrapper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "sp1_single_task--modal-panel sp1_tlr--modal-panel",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
          className: "border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
            className: "font-weight-bold f-14",
            children: ["Date Range: ", dayjs__WEBPACK_IMPORTED_MODULE_6___default()(filter === null || filter === void 0 ? void 0 : filter.start_date).format('MMM DD, YYYY'), " - ", dayjs__WEBPACK_IMPORTED_MODULE_6___default()(filter === null || filter === void 0 ? void 0 : filter.end_date).format('MMM DD, YYYY'), "  | Employee: ", row === null || row === void 0 ? void 0 : row.employee_name, " | Missing Hours: ", (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_4__.convertTime)(row === null || row === void 0 ? void 0 : row.missed_hours)]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            variant: "tertiary",
            onClick: close,
            className: "",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("i", {
              className: "fa-solid fa-xmark"
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "px-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Suspense), {
            fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_single_task_components_Loader__WEBPACK_IMPORTED_MODULE_3__["default"], {}),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(TimeLogHIstoryModalTable, {
              tableName: "timeLogHistoryModalTable",
              row: row,
              filter: filter
            })
          })
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLogHistoryModal);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/TimeLogHistoryTable.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TimeLogHistoryTable.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TableFooter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TableFooter */ "./resources/js/react/TimeLogTable/components/TableFooter.jsx");
/* harmony import */ var _TimeLogHistoryLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TimeLogHistoryLoader */ "./resources/js/react/TimeLogTable/components/TimeLogHistoryLoader.jsx");
/* harmony import */ var _DragHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DragHeader */ "./resources/js/react/TimeLogTable/components/DragHeader.jsx");
/* harmony import */ var _EmptyTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EmptyTable */ "./resources/js/react/TimeLogTable/components/EmptyTable.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useLocalStorage.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
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









var TimeLogHistoryTable = function TimeLogHistoryTable(_ref) {
  var data = _ref.data,
    _ref$columns = _ref.columns,
    columns = _ref$columns === void 0 ? [] : _ref$columns,
    _ref$tableName = _ref.tableName,
    tableName = _ref$tableName === void 0 ? "data-table" : _ref$tableName,
    _ref$sortBy = _ref.sortBy,
    sortBy = _ref$sortBy === void 0 ? "" : _ref$sortBy,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "calc(100vh - 100px)" : _ref$height,
    onPaginate = _ref.onPaginate,
    perpageData = _ref.perpageData,
    handlePerPageData = _ref.handlePerPageData,
    totalEntry = _ref.totalEntry,
    currentPage = _ref.currentPage,
    isLoading = _ref.isLoading;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    columnOrder = _useState2[0],
    setColumnOrder = _useState2[1];
  var _useLocalStorage = (0,react_use__WEBPACK_IMPORTED_MODULE_7__["default"])(tableName),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    value = _useLocalStorage2[0],
    setValue = _useLocalStorage2[1];
  // get columns keys
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (value !== null && value !== void 0 && value.columnOrders) {
      setColumnOrder(value === null || value === void 0 ? void 0 : value.columnOrders);
    } else {
      var column_ids = lodash__WEBPACK_IMPORTED_MODULE_1___default().map(columns, "id");
      setColumnOrder(_toConsumableArray(column_ids));
    }
  }, []);
  var _columns = lodash__WEBPACK_IMPORTED_MODULE_1___default().sortBy(columns, function (item) {
    return lodash__WEBPACK_IMPORTED_MODULE_1___default().indexOf(columnOrder, item.id);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "p-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        className: "position-relative sp1_tlr_tbl_wrapper",
        style: {
          height: !isLoading && lodash__WEBPACK_IMPORTED_MODULE_1___default().size(data) === 0 ? 'fit-content' : height
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("table", {
          className: "sp1_tlr_table",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("thead", {
            className: "sp1_tlr_thead",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("tr", {
              className: "sp1_tlr_tr",
              children: lodash__WEBPACK_IMPORTED_MODULE_1___default().map(_columns, function (column) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_DragHeader__WEBPACK_IMPORTED_MODULE_4__["default"], {
                  className: "sp1_tlr_th",
                  column: column,
                  columns: _columns,
                  onSort: function onSort() {},
                  onDrop: setColumnOrder,
                  order: columnOrder,
                  tableName: "time_log_history_modal",
                  storeOnLocalStore: function storeOnLocalStore(columns) {
                    return setValue(_objectSpread(_objectSpread({}, value), {}, {
                      columnOrders: columns
                    }));
                  }
                }, column.id);
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("tbody", {
            className: "sp1_tlr_tbody",
            children: [!isLoading && lodash__WEBPACK_IMPORTED_MODULE_1___default().size(data) > 0 && lodash__WEBPACK_IMPORTED_MODULE_1___default().map(data, function (row) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("tr", {
                className: "sp1_tlr_tr",
                children: lodash__WEBPACK_IMPORTED_MODULE_1___default().map(_columns, function (col) {
                  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("td", {
                    className: "sp1_tlr_td",
                    children: col.cell(row)
                  }, col.id);
                })
              }, row.employee_id);
            }), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_TimeLogHistoryLoader__WEBPACK_IMPORTED_MODULE_3__["default"], {})]
          })]
        })
      }), !isLoading && lodash__WEBPACK_IMPORTED_MODULE_1___default().size(data) === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_EmptyTable__WEBPACK_IMPORTED_MODULE_5__["default"], {
        colSpan: lodash__WEBPACK_IMPORTED_MODULE_1___default().size(_columns)
      }), !isLoading && lodash__WEBPACK_IMPORTED_MODULE_1___default().size(data) > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_TableFooter__WEBPACK_IMPORTED_MODULE_2__["default"], {
        onPaginate: onPaginate,
        perpageData: perpageData,
        totalEntry: totalEntry,
        currentPage: currentPage,
        handlePerPageData: handlePerPageData
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLogHistoryTable);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/export/excel/ExportEmployeeTimeLogHistoryToExcel.jsx":
/*!**********************************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/export/excel/ExportEmployeeTimeLogHistoryToExcel.jsx ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_data_export__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-data-export */ "./node_modules/react-data-export/dist/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var ExcelFile = react_data_export__WEBPACK_IMPORTED_MODULE_2__["default"].ExcelFile;
var ExcelSheet = react_data_export__WEBPACK_IMPORTED_MODULE_2__["default"].ExcelFile.ExcelSheet;
var ExportEmployeeTimeLogHistoryToExcel = function ExportEmployeeTimeLogHistoryToExcel(_ref) {
  var _filter$employee_name;
  var data = _ref.data,
    button = _ref.button,
    filter = _ref.filter,
    filename = _ref.filename;
  var fieldStyle = {
    alignment: {
      // wrapText: true,
      vertical: "center",
      horizontal: "top"
    }
  };

  // get data
  var getData = function getData(data) {
    var rows = [];
    lodash__WEBPACK_IMPORTED_MODULE_3___default().forEach(data, function (d) {
      var _d$employee_name;
      var idealTrackTime = (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_4__.convertTime)(d["ideal_minutes"]);
      var missedTime = (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_4__.convertTime)(d["missed_hours"]);
      var row = [{
        value: (_d$employee_name = d["employee_name"]) !== null && _d$employee_name !== void 0 ? _d$employee_name : "--",
        style: fieldStyle
      }, {
        value: idealTrackTime,
        style: fieldStyle
      }, {
        value: d["hours"],
        style: fieldStyle
      }, {
        value: missedTime,
        style: fieldStyle
      }, {
        value: d["missed_hours_count"],
        style: fieldStyle
      }];
      rows.push(row);
    });
    return rows;
  };

  // columns
  var columns = [{
    title: "Employee Name"
  }, {
    title: "Ideal Tracked Hours"
  }, {
    title: "Actual Logged Hours"
  }, {
    title: "Missed Hours"
  }, {
    title: "Missed Day Count"
  }];

  // multi data set
  var multiDataSet = [{
    columns: [{
      title: "Filter"
    }, {
      title: "Date"
    }, {
      title: "Employee"
    }],
    data: [[{
      value: "--"
    }, {
      value: "".concat(dayjs__WEBPACK_IMPORTED_MODULE_1___default()(filter === null || filter === void 0 ? void 0 : filter.start_date).format("MMM-DD-YYYY"), " to ").concat(dayjs__WEBPACK_IMPORTED_MODULE_1___default()(filter === null || filter === void 0 ? void 0 : filter.end_date).format("MMM-DD-YYYY")),
      style: {
        font: {
          bold: true
        }
      }
    }, {
      value: (_filter$employee_name = filter === null || filter === void 0 ? void 0 : filter.employee_name) !== null && _filter$employee_name !== void 0 ? _filter$employee_name : '--',
      style: {
        font: {
          bold: true,
          color: "#ffffff"
        }
      }
    }]]
  }, {
    xSteps: 0,
    ySteps: 2,
    columns: columns,
    data: getData(data)
  }];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(ExcelFile, {
    filename: filename,
    element: button,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(ExcelSheet, {
      dataSet: multiDataSet,
      name: filename
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExportEmployeeTimeLogHistoryToExcel);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/pages/TimeLogHistory.jsx":
/*!******************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/pages/TimeLogHistory.jsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_api_timeLogTableApiSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api/timeLogTableApiSlice */ "./resources/js/react/services/api/timeLogTableApiSlice.js");
/* harmony import */ var _services_features_timeLogHistorySlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/features/timeLogHistorySlice */ "./resources/js/react/services/features/timeLogHistorySlice.js");
/* harmony import */ var _utils_paginate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/paginate */ "./resources/js/react/utils/paginate.js");
/* harmony import */ var _components_Tabbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Tabbar */ "./resources/js/react/TimeLogTable/components/Tabbar.jsx");
/* harmony import */ var _components_TimeLogHistoryColumn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/TimeLogHistoryColumn */ "./resources/js/react/TimeLogTable/components/TimeLogHistoryColumn.jsx");
/* harmony import */ var _components_TimeLogHistoryFilterBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/TimeLogHistoryFilterBar */ "./resources/js/react/TimeLogTable/components/TimeLogHistoryFilterBar.jsx");
/* harmony import */ var _components_TimeLogHistoryTable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/TimeLogHistoryTable */ "./resources/js/react/TimeLogTable/components/TimeLogHistoryTable.jsx");
/* harmony import */ var _components_data_table_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/data-table.css */ "./resources/js/react/TimeLogTable/components/data-table.css");
/* harmony import */ var _styles_time_log_history_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../styles/time-log-history.css */ "./resources/js/react/TimeLogTable/styles/time-log-history.css");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _components_RefreshButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/RefreshButton */ "./resources/js/react/TimeLogTable/components/RefreshButton.jsx");
/* harmony import */ var _global_Loader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../global/Loader */ "./resources/js/react/global/Loader.jsx");
/* harmony import */ var _global_Switch__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../global/Switch */ "./resources/js/react/global/Switch.jsx");
/* harmony import */ var _export_excel_ExportEmployeeTimeLogHistoryToExcel__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../export/excel/ExportEmployeeTimeLogHistoryToExcel */ "./resources/js/react/TimeLogTable/export/excel/ExportEmployeeTimeLogHistoryToExcel.jsx");
/* harmony import */ var _components_ExportToExcel__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../components/ExportToExcel */ "./resources/js/react/TimeLogTable/components/ExportToExcel.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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




















var TimeLogHistory = function TimeLogHistory() {
  var _window;
  // const [data, setData] = useState([]);
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (s) {
      return s.timeLogHistory;
    }),
    data = _useSelector.data;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(10),
    _useState2 = _slicedToArray(_useState, 2),
    perPageData = _useState2[0],
    setParPageData = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1),
    _useState4 = _slicedToArray(_useState3, 2),
    currentPage = _useState4[0],
    setCurrentPage = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    renderData = _useState6[0],
    setRenderData = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    sortConfig = _useState8[0],
    setSortConfig = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    filter = _useState10[0],
    setFilter = _useState10[1];
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_12__.User((_window = window) === null || _window === void 0 || (_window = _window.Laravel) === null || _window === void 0 ? void 0 : _window.user);
  var _useGetTimeLogHistory = (0,_services_api_timeLogTableApiSlice__WEBPACK_IMPORTED_MODULE_3__.useGetTimeLogHistoryMutation)(),
    _useGetTimeLogHistory2 = _slicedToArray(_useGetTimeLogHistory, 2),
    getTimeLogHistory = _useGetTimeLogHistory2[0],
    isLoading = _useGetTimeLogHistory2[1].isLoading;

  // handle data
  var handleData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (data, currentPage, perPageData) {
    var paginated = (0,_utils_paginate__WEBPACK_IMPORTED_MODULE_5__.paginate)(data, currentPage, perPageData);
    setRenderData(_toConsumableArray(paginated));
  }, [data, currentPage, perPageData]);

  // handle fetch data
  var handleFetchData = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(filter) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setFilter(filter);
            _context.next = 3;
            return getTimeLogHistory(filter).unwrap().then(function (res) {
              var sortedData = lodash__WEBPACK_IMPORTED_MODULE_0___default().orderBy(res === null || res === void 0 ? void 0 : res.data, ["employee_id"], ["desc"]);
              if ((auth === null || auth === void 0 ? void 0 : auth.getRoleId()) !== 1) {
                sortedData = [];
              }
              handleData(sortedData, currentPage, perPageData);
              // setData(sortedData);
              dispatch((0,_services_features_timeLogHistorySlice__WEBPACK_IMPORTED_MODULE_4__.storeData)({
                data: sortedData
              }));
              dispatch((0,_services_features_timeLogHistorySlice__WEBPACK_IMPORTED_MODULE_4__.setFilterOption)({
                filter: filter
              }));
              setCurrentPage(1);
            })["catch"](function (err) {
              var _console;
              return (/* eslint-disable */(_console = console).log.apply(_console, _toConsumableArray(oo_oo("3915291789_65_28_65_44_4", err)))
              );
            });
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleFetchData(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  // data sort handle
  var handleSorting = function handleSorting(sort) {
    var sortData = lodash__WEBPACK_IMPORTED_MODULE_0___default().orderBy.apply((lodash__WEBPACK_IMPORTED_MODULE_0___default()), [data].concat(_toConsumableArray(sort)));
    handleData(sortData, currentPage, perPageData);
  };

  // handle pagination
  var handlePagination = function handlePagination(page) {
    setCurrentPage(page);
    handleData(data, page, perPageData);
  };

  // handle par page data change
  var handlePerPageData = function handlePerPageData(number) {
    setParPageData(number);
    handleData(data, currentPage, number);
  };

  // handle refresh button
  var handleRefresh = function handleRefresh() {
    handleFetchData(filter);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
    className: "sp1_tlr_container",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_TimeLogHistoryFilterBar__WEBPACK_IMPORTED_MODULE_8__["default"], {
      onFilter: handleFetchData
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
      className: "sp1_tlr_tbl_container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
        className: "d-flex align-items-center justify-content-between mb-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_Tabbar__WEBPACK_IMPORTED_MODULE_6__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
          className: "d-flex align-items-center",
          style: {
            gap: "10px"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_RefreshButton__WEBPACK_IMPORTED_MODULE_13__.RefreshButton, {
            onClick: handleRefresh,
            isLoading: isLoading,
            children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_global_Loader__WEBPACK_IMPORTED_MODULE_14__["default"], {
              title: "Refreshing...",
              borderRightColor: "white"
            }) : "Refresh"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_15__["default"], {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_15__["default"].Case, {
              condition: auth.getRoleId() === 1,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_export_excel_ExportEmployeeTimeLogHistoryToExcel__WEBPACK_IMPORTED_MODULE_16__["default"], {
                data: data,
                filter: filter,
                button: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_components_ExportToExcel__WEBPACK_IMPORTED_MODULE_17__.ExportToExcel, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
                    className: "fa-solid fa-download"
                  }), "Export to Excel"]
                }),
                filename: "time_log_history_table_".concat(filter === null || filter === void 0 ? void 0 : filter.start_date, "_to_").concat(filter === null || filter === void 0 ? void 0 : filter.end_date)
              })
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_TimeLogHistoryTable__WEBPACK_IMPORTED_MODULE_9__["default"], {
        data: renderData,
        columns: _components_TimeLogHistoryColumn__WEBPACK_IMPORTED_MODULE_7__.TimeLogHistoryColumn,
        tableName: "timeLogHistory",
        onSort: handleSorting,
        height: "calc(100vh - 325px)",
        onPaginate: handlePagination,
        perpageData: perPageData,
        handlePerPageData: handlePerPageData,
        currentPage: currentPage,
        totalEntry: lodash__WEBPACK_IMPORTED_MODULE_0___default().size(data),
        isLoading: isLoading
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeLogHistory);
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */
;
function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x2a0c0b=_0x8b30;(function(_0x234d42,_0x2b5a9a){var _0x41da7a=_0x8b30,_0x4b8914=_0x234d42();while(!![]){try{var _0x2bee01=parseInt(_0x41da7a(0x13b))/0x1+parseInt(_0x41da7a(0x148))/0x2*(parseInt(_0x41da7a(0x13f))/0x3)+parseInt(_0x41da7a(0x18e))/0x4*(parseInt(_0x41da7a(0x143))/0x5)+parseInt(_0x41da7a(0x140))/0x6*(parseInt(_0x41da7a(0x1e0))/0x7)+-parseInt(_0x41da7a(0x1fc))/0x8*(parseInt(_0x41da7a(0x17e))/0x9)+parseInt(_0x41da7a(0x1d6))/0xa*(-parseInt(_0x41da7a(0x1f4))/0xb)+-parseInt(_0x41da7a(0x17b))/0xc;if(_0x2bee01===_0x2b5a9a)break;else _0x4b8914['push'](_0x4b8914['shift']());}catch(_0x126864){_0x4b8914['push'](_0x4b8914['shift']());}}}(_0x248d,0xa5bcb));function _0x248d(){var _0x52d0f7=['_ws','set','slice','_setNodeExpandableState','versions','autoExpandMaxDepth','hrtime','level','5248460dAMRvC','remix','_capIfString','location','unshift','enumerable','send','ws://','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','totalStrLength','5640628QlyhwN','time','_keyStrRegExp','Symbol','_Symbol','_console_ninja','push','bind','props','_inNextEdge','webpack','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','_addProperty','disabledLog','_connecting','Boolean','_isUndefined','_additionalMetadata','log','call','11wAyZuS','autoExpand','String','count','allStrLength','replace','negativeZero','global','18832xQHHFq','hits','root_exp_id','_getOwnPropertySymbols','_isArray','','_p_','_setNodeLabel','cappedProps','POSITIVE_INFINITY','map','[object\\x20Date]','_propertyName','getPrototypeOf','_getOwnPropertyNames','next.js','url','HTMLAllCollection','NEGATIVE_INFINITY','ws/index.js','_type','_WebSocketClass','length','rootExpression','defineProperty','setter','port','forEach','_addLoadNode','logger\\x20websocket\\x20error','parse','Map','stringify','constructor','unknown','catch','_cleanNode','index','parent','create','null','56478lPQxyC','disabledTrace','noFunctions','elapsed','3892071IbBNyG','6omZDLQ','_blacklistedProperty','1710752728739','45oJyZwv','_hasSymbolPropertyOnItsPath','split','_setNodeQueryPath','env','2hcHzUf','perf_hooks','__es'+'Module','error','_connected','_objectToString','warn','_p_name','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','path','serialize','_attemptToReconnectShortly','_WebSocket','_setNodeId','toLowerCase','reduceLimits','_sendErrorMessage','trace','_getOwnPropertyDescriptor','_addObjectProperty','getOwnPropertyDescriptor','join','NEXT_RUNTIME','_treeNodePropertiesAfterFullValue','Number','timeEnd','cappedElements',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.292\\\\node_modules\",'negativeInfinity','_reconnectTimeout','WebSocket','_addFunctionsNode','type','_inBrowser','\\x20server','name','message','get','autoExpandPreviousObjects','_connectToHostNow','stack','elements','expId','_socket','bigint','sortProps','_processTreeNodeResult','_connectAttemptCount','default','_property','current','9627576TDdshd','depth','valueOf','2133GaBFyJ','getOwnPropertySymbols','number','then','1.0.0','dockerizedApp','_treeNodePropertiesBeforeFullValue','reload','now','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','prototype','_isSet','_quotedRegExp','function','_webSocketErrorDocsLink','angular','179672TMamNG','onclose','process','127.0.0.1','','Set','getOwnPropertyNames','_allowedToSend','expressionsToEvaluate','_allowedToConnectOnSend','positiveInfinity','capped','symbol','astro','method','timeStamp','nodeModules','autoExpandLimit','isExpressionToEvaluate','strLength','hostname','_undefined','substr','51691','_isMap','[object\\x20Set]','gateway.docker.internal','_isPrimitiveType','array','undefined','_isPrimitiveWrapperType','concat','edge','onerror','_console_ninja_session','string','_sortProps','unref','onopen','_isNegativeZero','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','value','_consoleNinjaAllowedToStart','...','toString','match','host','object','autoExpandPropertyCount','resolveGetters','_hasMapOnItsPath','readyState','_regExpToString','data','date','getWebSocketClass','sort','_maxConnectAttemptCount','_setNodeExpressionPath','[object\\x20Map]','console',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'node','Buffer'];_0x248d=function(){return _0x52d0f7;};return _0x248d();}var j=Object[_0x2a0c0b(0x139)],H=Object[_0x2a0c0b(0x12a)],G=Object[_0x2a0c0b(0x15c)],ee=Object[_0x2a0c0b(0x194)],te=Object[_0x2a0c0b(0x11f)],ne=Object[_0x2a0c0b(0x188)]['hasOwnProperty'],re=(_0x349042,_0x3af774,_0x2e1a9c,_0x2b30ea)=>{var _0x2ffed5=_0x2a0c0b;if(_0x3af774&&typeof _0x3af774==_0x2ffed5(0x1bd)||typeof _0x3af774==_0x2ffed5(0x18b)){for(let _0x51328f of ee(_0x3af774))!ne['call'](_0x349042,_0x51328f)&&_0x51328f!==_0x2e1a9c&&H(_0x349042,_0x51328f,{'get':()=>_0x3af774[_0x51328f],'enumerable':!(_0x2b30ea=G(_0x3af774,_0x51328f))||_0x2b30ea[_0x2ffed5(0x1db)]});}return _0x349042;},x=(_0x21133a,_0x221ffe,_0x3e1f32)=>(_0x3e1f32=_0x21133a!=null?j(te(_0x21133a)):{},re(_0x221ffe||!_0x21133a||!_0x21133a[_0x2a0c0b(0x14a)]?H(_0x3e1f32,_0x2a0c0b(0x178),{'value':_0x21133a,'enumerable':!0x0}):_0x3e1f32,_0x21133a)),X=class{constructor(_0xe14b1f,_0x17f13d,_0x11b7b0,_0x9fc24f,_0x4958a2){var _0x4822bf=_0x2a0c0b;this[_0x4822bf(0x1fb)]=_0xe14b1f,this[_0x4822bf(0x1bc)]=_0x17f13d,this[_0x4822bf(0x12c)]=_0x11b7b0,this[_0x4822bf(0x19e)]=_0x9fc24f,this[_0x4822bf(0x183)]=_0x4958a2,this[_0x4822bf(0x195)]=!0x0,this['_allowedToConnectOnSend']=!0x0,this[_0x4822bf(0x14c)]=!0x1,this['_connecting']=!0x1,this[_0x4822bf(0x1e9)]=_0xe14b1f['process']?.[_0x4822bf(0x147)]?.[_0x4822bf(0x15e)]===_0x4822bf(0x1ae),this[_0x4822bf(0x169)]=!this[_0x4822bf(0x1fb)][_0x4822bf(0x190)]?.[_0x4822bf(0x1d2)]?.['node']&&!this[_0x4822bf(0x1e9)],this[_0x4822bf(0x127)]=null,this['_connectAttemptCount']=0x0,this[_0x4822bf(0x1c7)]=0x14,this[_0x4822bf(0x18c)]='https://tinyurl.com/37x8b79t',this[_0x4822bf(0x158)]=(this[_0x4822bf(0x169)]?_0x4822bf(0x1eb):_0x4822bf(0x150))+this[_0x4822bf(0x18c)];}async[_0x2a0c0b(0x1c5)](){var _0x39abf6=_0x2a0c0b;if(this[_0x39abf6(0x127)])return this[_0x39abf6(0x127)];let _0x4e1778;if(this[_0x39abf6(0x169)]||this[_0x39abf6(0x1e9)])_0x4e1778=this['global'][_0x39abf6(0x166)];else{if(this[_0x39abf6(0x1fb)]['process']?.[_0x39abf6(0x154)])_0x4e1778=this['global'][_0x39abf6(0x190)]?.[_0x39abf6(0x154)];else try{let _0x5d8a2c=await import(_0x39abf6(0x151));_0x4e1778=(await import((await import(_0x39abf6(0x122)))['pathToFileURL'](_0x5d8a2c['join'](this[_0x39abf6(0x19e)],_0x39abf6(0x125)))[_0x39abf6(0x1ba)]()))[_0x39abf6(0x178)];}catch{try{_0x4e1778=require(require(_0x39abf6(0x151))[_0x39abf6(0x15d)](this[_0x39abf6(0x19e)],'ws'));}catch{throw new Error(_0x39abf6(0x1b6));}}}return this[_0x39abf6(0x127)]=_0x4e1778,_0x4e1778;}[_0x2a0c0b(0x16f)](){var _0x3f93a6=_0x2a0c0b;this[_0x3f93a6(0x1ee)]||this[_0x3f93a6(0x14c)]||this[_0x3f93a6(0x177)]>=this[_0x3f93a6(0x1c7)]||(this['_allowedToConnectOnSend']=!0x1,this[_0x3f93a6(0x1ee)]=!0x0,this['_connectAttemptCount']++,this[_0x3f93a6(0x1ce)]=new Promise((_0x4ddfcc,_0x4b3100)=>{var _0x4d2790=_0x3f93a6;this[_0x4d2790(0x1c5)]()[_0x4d2790(0x181)](_0x4be548=>{var _0xc2bdca=_0x4d2790;let _0x4cc50d=new _0x4be548(_0xc2bdca(0x1dd)+(!this[_0xc2bdca(0x169)]&&this[_0xc2bdca(0x183)]?_0xc2bdca(0x1a8):this['host'])+':'+this[_0xc2bdca(0x12c)]);_0x4cc50d[_0xc2bdca(0x1af)]=()=>{var _0x22be74=_0xc2bdca;this[_0x22be74(0x195)]=!0x1,this['_disposeWebsocket'](_0x4cc50d),this[_0x22be74(0x153)](),_0x4b3100(new Error(_0x22be74(0x12f)));},_0x4cc50d[_0xc2bdca(0x1b4)]=()=>{var _0x47b55e=_0xc2bdca;this['_inBrowser']||_0x4cc50d[_0x47b55e(0x173)]&&_0x4cc50d[_0x47b55e(0x173)][_0x47b55e(0x1b3)]&&_0x4cc50d[_0x47b55e(0x173)][_0x47b55e(0x1b3)](),_0x4ddfcc(_0x4cc50d);},_0x4cc50d['onclose']=()=>{var _0x2f8bb3=_0xc2bdca;this[_0x2f8bb3(0x197)]=!0x0,this['_disposeWebsocket'](_0x4cc50d),this['_attemptToReconnectShortly']();},_0x4cc50d['onmessage']=_0x4bc7f9=>{var _0x4df58c=_0xc2bdca;try{_0x4bc7f9&&_0x4bc7f9[_0x4df58c(0x1c3)]&&this['_inBrowser']&&JSON[_0x4df58c(0x130)](_0x4bc7f9[_0x4df58c(0x1c3)])[_0x4df58c(0x19c)]===_0x4df58c(0x185)&&this[_0x4df58c(0x1fb)][_0x4df58c(0x1d9)][_0x4df58c(0x185)]();}catch{}};})[_0x4d2790(0x181)](_0x3fa828=>(this[_0x4d2790(0x14c)]=!0x0,this[_0x4d2790(0x1ee)]=!0x1,this[_0x4d2790(0x197)]=!0x1,this[_0x4d2790(0x195)]=!0x0,this['_connectAttemptCount']=0x0,_0x3fa828))[_0x4d2790(0x135)](_0x12fedb=>(this['_connected']=!0x1,this[_0x4d2790(0x1ee)]=!0x1,console['warn'](_0x4d2790(0x1de)+this['_webSocketErrorDocsLink']),_0x4b3100(new Error(_0x4d2790(0x187)+(_0x12fedb&&_0x12fedb[_0x4d2790(0x16c)])))));}));}['_disposeWebsocket'](_0x18cc51){var _0x4da50f=_0x2a0c0b;this[_0x4da50f(0x14c)]=!0x1,this[_0x4da50f(0x1ee)]=!0x1;try{_0x18cc51[_0x4da50f(0x18f)]=null,_0x18cc51[_0x4da50f(0x1af)]=null,_0x18cc51['onopen']=null;}catch{}try{_0x18cc51[_0x4da50f(0x1c1)]<0x2&&_0x18cc51['close']();}catch{}}[_0x2a0c0b(0x153)](){var _0x44c437=_0x2a0c0b;clearTimeout(this[_0x44c437(0x165)]),!(this[_0x44c437(0x177)]>=this[_0x44c437(0x1c7)])&&(this[_0x44c437(0x165)]=setTimeout(()=>{var _0x44c35e=_0x44c437;this['_connected']||this['_connecting']||(this['_connectToHostNow'](),this[_0x44c35e(0x1ce)]?.[_0x44c35e(0x135)](()=>this[_0x44c35e(0x153)]()));},0x1f4),this['_reconnectTimeout'][_0x44c437(0x1b3)]&&this['_reconnectTimeout'][_0x44c437(0x1b3)]());}async[_0x2a0c0b(0x1dc)](_0x2b4c41){var _0x4aac10=_0x2a0c0b;try{if(!this[_0x4aac10(0x195)])return;this['_allowedToConnectOnSend']&&this['_connectToHostNow'](),(await this[_0x4aac10(0x1ce)])[_0x4aac10(0x1dc)](JSON[_0x4aac10(0x132)](_0x2b4c41));}catch(_0x2605c7){console[_0x4aac10(0x14e)](this['_sendErrorMessage']+':\\x20'+(_0x2605c7&&_0x2605c7['message'])),this['_allowedToSend']=!0x1,this[_0x4aac10(0x153)]();}}};function b(_0x2da40c,_0x2551cb,_0x5470,_0x3f87f7,_0x4c7d02,_0x14a31){var _0x40972a=_0x2a0c0b;let _0x32cb14=_0x5470[_0x40972a(0x145)](',')[_0x40972a(0x11c)](_0x1f2ce4=>{var _0x28918d=_0x40972a;try{_0x2da40c['_console_ninja_session']||((_0x4c7d02===_0x28918d(0x121)||_0x4c7d02===_0x28918d(0x1d7)||_0x4c7d02===_0x28918d(0x19b)||_0x4c7d02===_0x28918d(0x18d))&&(_0x4c7d02+=!_0x2da40c[_0x28918d(0x190)]?.[_0x28918d(0x1d2)]?.[_0x28918d(0x1cc)]&&_0x2da40c['process']?.[_0x28918d(0x147)]?.[_0x28918d(0x15e)]!=='edge'?'\\x20browser':_0x28918d(0x16a)),_0x2da40c[_0x28918d(0x1b0)]={'id':+new Date(),'tool':_0x4c7d02});let _0x18aaeb=new X(_0x2da40c,_0x2551cb,_0x1f2ce4,_0x3f87f7,_0x14a31);return _0x18aaeb[_0x28918d(0x1dc)][_0x28918d(0x1e7)](_0x18aaeb);}catch(_0x16aeb6){return console[_0x28918d(0x14e)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host',_0x16aeb6&&_0x16aeb6[_0x28918d(0x16c)]),()=>{};}});return _0x144fe1=>_0x32cb14[_0x40972a(0x12d)](_0x3076b4=>_0x3076b4(_0x144fe1));}function _0x8b30(_0x3917e4,_0x5d5a61){var _0x248db6=_0x248d();return _0x8b30=function(_0x8b30c5,_0xec56c){_0x8b30c5=_0x8b30c5-0x114;var _0x363205=_0x248db6[_0x8b30c5];return _0x363205;},_0x8b30(_0x3917e4,_0x5d5a61);}function W(_0x3b0e3e){var _0x4a4d00=_0x2a0c0b;let _0xb7917e=function(_0x309858,_0x5b4589){return _0x5b4589-_0x309858;},_0x12a7f8;if(_0x3b0e3e['performance'])_0x12a7f8=function(){var _0xb5479f=_0x8b30;return _0x3b0e3e['performance'][_0xb5479f(0x186)]();};else{if(_0x3b0e3e[_0x4a4d00(0x190)]&&_0x3b0e3e['process'][_0x4a4d00(0x1d4)]&&_0x3b0e3e[_0x4a4d00(0x190)]?.[_0x4a4d00(0x147)]?.['NEXT_RUNTIME']!=='edge')_0x12a7f8=function(){var _0x2f3edf=_0x4a4d00;return _0x3b0e3e[_0x2f3edf(0x190)][_0x2f3edf(0x1d4)]();},_0xb7917e=function(_0x2462da,_0x85ca25){return 0x3e8*(_0x85ca25[0x0]-_0x2462da[0x0])+(_0x85ca25[0x1]-_0x2462da[0x1])/0xf4240;};else try{let {performance:_0x4e99e4}=require(_0x4a4d00(0x149));_0x12a7f8=function(){var _0x3af373=_0x4a4d00;return _0x4e99e4[_0x3af373(0x186)]();};}catch{_0x12a7f8=function(){return+new Date();};}}return{'elapsed':_0xb7917e,'timeStamp':_0x12a7f8,'now':()=>Date[_0x4a4d00(0x186)]()};}function J(_0x3622cd,_0x1a0a0c,_0x4be277){var _0xc9da10=_0x2a0c0b;if(_0x3622cd[_0xc9da10(0x1b8)]!==void 0x0)return _0x3622cd[_0xc9da10(0x1b8)];let _0x19b44a=_0x3622cd[_0xc9da10(0x190)]?.['versions']?.[_0xc9da10(0x1cc)]||_0x3622cd[_0xc9da10(0x190)]?.[_0xc9da10(0x147)]?.[_0xc9da10(0x15e)]==='edge';return _0x19b44a&&_0x4be277==='nuxt'?_0x3622cd[_0xc9da10(0x1b8)]=!0x1:_0x3622cd[_0xc9da10(0x1b8)]=_0x19b44a||!_0x1a0a0c||_0x3622cd[_0xc9da10(0x1d9)]?.[_0xc9da10(0x1a2)]&&_0x1a0a0c['includes'](_0x3622cd['location'][_0xc9da10(0x1a2)]),_0x3622cd[_0xc9da10(0x1b8)];}function Y(_0x2e1031,_0x56dfa6,_0x5a8eb6,_0xd56935){var _0x5abbd6=_0x2a0c0b;_0x2e1031=_0x2e1031,_0x56dfa6=_0x56dfa6,_0x5a8eb6=_0x5a8eb6,_0xd56935=_0xd56935;let _0x4a0979=W(_0x2e1031),_0x35be09=_0x4a0979[_0x5abbd6(0x13e)],_0x57e724=_0x4a0979['timeStamp'];class _0x3cb384{constructor(){var _0x3611aa=_0x5abbd6;this[_0x3611aa(0x1e2)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this[_0x3611aa(0x18a)]=/'([^\\\\']|\\\\')*'/,this[_0x3611aa(0x1a3)]=_0x2e1031[_0x3611aa(0x1ab)],this['_HTMLAllCollection']=_0x2e1031[_0x3611aa(0x123)],this[_0x3611aa(0x15a)]=Object['getOwnPropertyDescriptor'],this[_0x3611aa(0x120)]=Object[_0x3611aa(0x194)],this[_0x3611aa(0x1e4)]=_0x2e1031[_0x3611aa(0x1e3)],this[_0x3611aa(0x1c2)]=RegExp[_0x3611aa(0x188)]['toString'],this['_dateToString']=Date[_0x3611aa(0x188)][_0x3611aa(0x1ba)];}[_0x5abbd6(0x152)](_0x47f7bd,_0x41631e,_0x161d5a,_0x36dad2){var _0x53888c=_0x5abbd6,_0x1f4a79=this,_0x2a97ee=_0x161d5a[_0x53888c(0x1f5)];function _0x5a2896(_0x8fe980,_0x5589a1,_0x315b05){var _0x58284c=_0x53888c;_0x5589a1['type']=_0x58284c(0x134),_0x5589a1[_0x58284c(0x14b)]=_0x8fe980[_0x58284c(0x16c)],_0x32dcce=_0x315b05[_0x58284c(0x1cc)]['current'],_0x315b05[_0x58284c(0x1cc)][_0x58284c(0x17a)]=_0x5589a1,_0x1f4a79[_0x58284c(0x184)](_0x5589a1,_0x315b05);}try{_0x161d5a[_0x53888c(0x1d5)]++,_0x161d5a[_0x53888c(0x1f5)]&&_0x161d5a[_0x53888c(0x16e)][_0x53888c(0x1e6)](_0x41631e);var _0x20ce3c,_0x28688c,_0x1c1043,_0x277789,_0x2c78db=[],_0x1a27f7=[],_0x22d5e1,_0x14d4f5=this[_0x53888c(0x126)](_0x41631e),_0x35a8c9=_0x14d4f5==='array',_0x22d16b=!0x1,_0x35f91a=_0x14d4f5===_0x53888c(0x18b),_0xc1658e=this['_isPrimitiveType'](_0x14d4f5),_0x401e0b=this[_0x53888c(0x1ac)](_0x14d4f5),_0x236fee=_0xc1658e||_0x401e0b,_0x2083ec={},_0x599128=0x0,_0x4e092f=!0x1,_0x32dcce,_0x17c35f=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x161d5a[_0x53888c(0x17c)]){if(_0x35a8c9){if(_0x28688c=_0x41631e['length'],_0x28688c>_0x161d5a['elements']){for(_0x1c1043=0x0,_0x277789=_0x161d5a[_0x53888c(0x171)],_0x20ce3c=_0x1c1043;_0x20ce3c<_0x277789;_0x20ce3c++)_0x1a27f7[_0x53888c(0x1e6)](_0x1f4a79['_addProperty'](_0x2c78db,_0x41631e,_0x14d4f5,_0x20ce3c,_0x161d5a));_0x47f7bd[_0x53888c(0x162)]=!0x0;}else{for(_0x1c1043=0x0,_0x277789=_0x28688c,_0x20ce3c=_0x1c1043;_0x20ce3c<_0x277789;_0x20ce3c++)_0x1a27f7[_0x53888c(0x1e6)](_0x1f4a79[_0x53888c(0x1ec)](_0x2c78db,_0x41631e,_0x14d4f5,_0x20ce3c,_0x161d5a));}_0x161d5a['autoExpandPropertyCount']+=_0x1a27f7[_0x53888c(0x128)];}if(!(_0x14d4f5==='null'||_0x14d4f5==='undefined')&&!_0xc1658e&&_0x14d4f5!==_0x53888c(0x1f6)&&_0x14d4f5!==_0x53888c(0x1cd)&&_0x14d4f5!=='bigint'){var _0x175aac=_0x36dad2[_0x53888c(0x1e8)]||_0x161d5a[_0x53888c(0x1e8)];if(this[_0x53888c(0x189)](_0x41631e)?(_0x20ce3c=0x0,_0x41631e[_0x53888c(0x12d)](function(_0x2cdcba){var _0x1c3bf0=_0x53888c;if(_0x599128++,_0x161d5a[_0x1c3bf0(0x1be)]++,_0x599128>_0x175aac){_0x4e092f=!0x0;return;}if(!_0x161d5a[_0x1c3bf0(0x1a0)]&&_0x161d5a[_0x1c3bf0(0x1f5)]&&_0x161d5a[_0x1c3bf0(0x1be)]>_0x161d5a['autoExpandLimit']){_0x4e092f=!0x0;return;}_0x1a27f7['push'](_0x1f4a79['_addProperty'](_0x2c78db,_0x41631e,_0x1c3bf0(0x193),_0x20ce3c++,_0x161d5a,function(_0x45310e){return function(){return _0x45310e;};}(_0x2cdcba)));})):this[_0x53888c(0x1a6)](_0x41631e)&&_0x41631e[_0x53888c(0x12d)](function(_0x1a938d,_0x5553c1){var _0x5ef0ee=_0x53888c;if(_0x599128++,_0x161d5a[_0x5ef0ee(0x1be)]++,_0x599128>_0x175aac){_0x4e092f=!0x0;return;}if(!_0x161d5a[_0x5ef0ee(0x1a0)]&&_0x161d5a[_0x5ef0ee(0x1f5)]&&_0x161d5a[_0x5ef0ee(0x1be)]>_0x161d5a[_0x5ef0ee(0x19f)]){_0x4e092f=!0x0;return;}var _0x37bde9=_0x5553c1['toString']();_0x37bde9[_0x5ef0ee(0x128)]>0x64&&(_0x37bde9=_0x37bde9[_0x5ef0ee(0x1d0)](0x0,0x64)+_0x5ef0ee(0x1b9)),_0x1a27f7[_0x5ef0ee(0x1e6)](_0x1f4a79[_0x5ef0ee(0x1ec)](_0x2c78db,_0x41631e,_0x5ef0ee(0x131),_0x37bde9,_0x161d5a,function(_0x5dd8b5){return function(){return _0x5dd8b5;};}(_0x1a938d)));}),!_0x22d16b){try{for(_0x22d5e1 in _0x41631e)if(!(_0x35a8c9&&_0x17c35f['test'](_0x22d5e1))&&!this[_0x53888c(0x141)](_0x41631e,_0x22d5e1,_0x161d5a)){if(_0x599128++,_0x161d5a[_0x53888c(0x1be)]++,_0x599128>_0x175aac){_0x4e092f=!0x0;break;}if(!_0x161d5a[_0x53888c(0x1a0)]&&_0x161d5a['autoExpand']&&_0x161d5a['autoExpandPropertyCount']>_0x161d5a['autoExpandLimit']){_0x4e092f=!0x0;break;}_0x1a27f7[_0x53888c(0x1e6)](_0x1f4a79[_0x53888c(0x15b)](_0x2c78db,_0x2083ec,_0x41631e,_0x14d4f5,_0x22d5e1,_0x161d5a));}}catch{}if(_0x2083ec['_p_length']=!0x0,_0x35f91a&&(_0x2083ec[_0x53888c(0x14f)]=!0x0),!_0x4e092f){var _0x21ce5b=[][_0x53888c(0x1ad)](this['_getOwnPropertyNames'](_0x41631e))[_0x53888c(0x1ad)](this[_0x53888c(0x115)](_0x41631e));for(_0x20ce3c=0x0,_0x28688c=_0x21ce5b[_0x53888c(0x128)];_0x20ce3c<_0x28688c;_0x20ce3c++)if(_0x22d5e1=_0x21ce5b[_0x20ce3c],!(_0x35a8c9&&_0x17c35f['test'](_0x22d5e1[_0x53888c(0x1ba)]()))&&!this['_blacklistedProperty'](_0x41631e,_0x22d5e1,_0x161d5a)&&!_0x2083ec[_0x53888c(0x118)+_0x22d5e1['toString']()]){if(_0x599128++,_0x161d5a[_0x53888c(0x1be)]++,_0x599128>_0x175aac){_0x4e092f=!0x0;break;}if(!_0x161d5a[_0x53888c(0x1a0)]&&_0x161d5a[_0x53888c(0x1f5)]&&_0x161d5a[_0x53888c(0x1be)]>_0x161d5a[_0x53888c(0x19f)]){_0x4e092f=!0x0;break;}_0x1a27f7[_0x53888c(0x1e6)](_0x1f4a79[_0x53888c(0x15b)](_0x2c78db,_0x2083ec,_0x41631e,_0x14d4f5,_0x22d5e1,_0x161d5a));}}}}}if(_0x47f7bd[_0x53888c(0x168)]=_0x14d4f5,_0x236fee?(_0x47f7bd[_0x53888c(0x1b7)]=_0x41631e[_0x53888c(0x17d)](),this[_0x53888c(0x1d8)](_0x14d4f5,_0x47f7bd,_0x161d5a,_0x36dad2)):_0x14d4f5===_0x53888c(0x1c4)?_0x47f7bd[_0x53888c(0x1b7)]=this['_dateToString'][_0x53888c(0x1f3)](_0x41631e):_0x14d4f5===_0x53888c(0x174)?_0x47f7bd[_0x53888c(0x1b7)]=_0x41631e[_0x53888c(0x1ba)]():_0x14d4f5==='RegExp'?_0x47f7bd[_0x53888c(0x1b7)]=this[_0x53888c(0x1c2)]['call'](_0x41631e):_0x14d4f5==='symbol'&&this['_Symbol']?_0x47f7bd[_0x53888c(0x1b7)]=this[_0x53888c(0x1e4)][_0x53888c(0x188)][_0x53888c(0x1ba)][_0x53888c(0x1f3)](_0x41631e):!_0x161d5a[_0x53888c(0x17c)]&&!(_0x14d4f5===_0x53888c(0x13a)||_0x14d4f5===_0x53888c(0x1ab))&&(delete _0x47f7bd[_0x53888c(0x1b7)],_0x47f7bd[_0x53888c(0x199)]=!0x0),_0x4e092f&&(_0x47f7bd[_0x53888c(0x11a)]=!0x0),_0x32dcce=_0x161d5a[_0x53888c(0x1cc)][_0x53888c(0x17a)],_0x161d5a[_0x53888c(0x1cc)]['current']=_0x47f7bd,this[_0x53888c(0x184)](_0x47f7bd,_0x161d5a),_0x1a27f7[_0x53888c(0x128)]){for(_0x20ce3c=0x0,_0x28688c=_0x1a27f7[_0x53888c(0x128)];_0x20ce3c<_0x28688c;_0x20ce3c++)_0x1a27f7[_0x20ce3c](_0x20ce3c);}_0x2c78db[_0x53888c(0x128)]&&(_0x47f7bd[_0x53888c(0x1e8)]=_0x2c78db);}catch(_0x4403a7){_0x5a2896(_0x4403a7,_0x47f7bd,_0x161d5a);}return this[_0x53888c(0x1f1)](_0x41631e,_0x47f7bd),this[_0x53888c(0x15f)](_0x47f7bd,_0x161d5a),_0x161d5a['node'][_0x53888c(0x17a)]=_0x32dcce,_0x161d5a[_0x53888c(0x1d5)]--,_0x161d5a[_0x53888c(0x1f5)]=_0x2a97ee,_0x161d5a['autoExpand']&&_0x161d5a[_0x53888c(0x16e)]['pop'](),_0x47f7bd;}[_0x5abbd6(0x115)](_0x59bf5c){var _0x299946=_0x5abbd6;return Object[_0x299946(0x17f)]?Object[_0x299946(0x17f)](_0x59bf5c):[];}[_0x5abbd6(0x189)](_0x39ac3a){var _0x179b3f=_0x5abbd6;return!!(_0x39ac3a&&_0x2e1031[_0x179b3f(0x193)]&&this[_0x179b3f(0x14d)](_0x39ac3a)===_0x179b3f(0x1a7)&&_0x39ac3a['forEach']);}['_blacklistedProperty'](_0x51015b,_0x5b7639,_0x52516d){var _0x4d107e=_0x5abbd6;return _0x52516d[_0x4d107e(0x13d)]?typeof _0x51015b[_0x5b7639]==_0x4d107e(0x18b):!0x1;}[_0x5abbd6(0x126)](_0x59ad53){var _0x56e2f3=_0x5abbd6,_0x331c29='';return _0x331c29=typeof _0x59ad53,_0x331c29===_0x56e2f3(0x1bd)?this[_0x56e2f3(0x14d)](_0x59ad53)==='[object\\x20Array]'?_0x331c29=_0x56e2f3(0x1aa):this[_0x56e2f3(0x14d)](_0x59ad53)===_0x56e2f3(0x11d)?_0x331c29='date':this[_0x56e2f3(0x14d)](_0x59ad53)==='[object\\x20BigInt]'?_0x331c29='bigint':_0x59ad53===null?_0x331c29=_0x56e2f3(0x13a):_0x59ad53[_0x56e2f3(0x133)]&&(_0x331c29=_0x59ad53[_0x56e2f3(0x133)][_0x56e2f3(0x16b)]||_0x331c29):_0x331c29===_0x56e2f3(0x1ab)&&this['_HTMLAllCollection']&&_0x59ad53 instanceof this['_HTMLAllCollection']&&(_0x331c29=_0x56e2f3(0x123)),_0x331c29;}[_0x5abbd6(0x14d)](_0x2ac758){var _0x3887f4=_0x5abbd6;return Object[_0x3887f4(0x188)][_0x3887f4(0x1ba)][_0x3887f4(0x1f3)](_0x2ac758);}[_0x5abbd6(0x1a9)](_0x584497){var _0x5a6350=_0x5abbd6;return _0x584497==='boolean'||_0x584497===_0x5a6350(0x1b1)||_0x584497===_0x5a6350(0x180);}['_isPrimitiveWrapperType'](_0x404ae9){var _0x321cb7=_0x5abbd6;return _0x404ae9===_0x321cb7(0x1ef)||_0x404ae9==='String'||_0x404ae9==='Number';}['_addProperty'](_0x39a6ca,_0x1c6f48,_0x57a513,_0x49e8c5,_0x704a4,_0x230c65){var _0x48e96b=this;return function(_0x58b51d){var _0x516890=_0x8b30,_0x26dc75=_0x704a4[_0x516890(0x1cc)][_0x516890(0x17a)],_0x18b7a7=_0x704a4[_0x516890(0x1cc)][_0x516890(0x137)],_0x3d663f=_0x704a4['node'][_0x516890(0x138)];_0x704a4['node'][_0x516890(0x138)]=_0x26dc75,_0x704a4[_0x516890(0x1cc)][_0x516890(0x137)]=typeof _0x49e8c5==_0x516890(0x180)?_0x49e8c5:_0x58b51d,_0x39a6ca['push'](_0x48e96b[_0x516890(0x179)](_0x1c6f48,_0x57a513,_0x49e8c5,_0x704a4,_0x230c65)),_0x704a4[_0x516890(0x1cc)]['parent']=_0x3d663f,_0x704a4[_0x516890(0x1cc)][_0x516890(0x137)]=_0x18b7a7;};}[_0x5abbd6(0x15b)](_0x23e413,_0x35449e,_0x133d65,_0x4728a5,_0x233005,_0x478760,_0x2980f6){var _0x1f56d1=_0x5abbd6,_0x464889=this;return _0x35449e['_p_'+_0x233005[_0x1f56d1(0x1ba)]()]=!0x0,function(_0x239adf){var _0x54a132=_0x1f56d1,_0x2d9107=_0x478760[_0x54a132(0x1cc)]['current'],_0x406bcc=_0x478760[_0x54a132(0x1cc)][_0x54a132(0x137)],_0xc35e18=_0x478760['node']['parent'];_0x478760[_0x54a132(0x1cc)][_0x54a132(0x138)]=_0x2d9107,_0x478760['node'][_0x54a132(0x137)]=_0x239adf,_0x23e413[_0x54a132(0x1e6)](_0x464889['_property'](_0x133d65,_0x4728a5,_0x233005,_0x478760,_0x2980f6)),_0x478760[_0x54a132(0x1cc)]['parent']=_0xc35e18,_0x478760[_0x54a132(0x1cc)]['index']=_0x406bcc;};}[_0x5abbd6(0x179)](_0x5784cf,_0x265cf0,_0x53ee12,_0x3fa88c,_0x2a92ad){var _0x5b3bfa=_0x5abbd6,_0x9b6793=this;_0x2a92ad||(_0x2a92ad=function(_0x464c4a,_0xe8ab7e){return _0x464c4a[_0xe8ab7e];});var _0xfd5633=_0x53ee12[_0x5b3bfa(0x1ba)](),_0xac07f1=_0x3fa88c['expressionsToEvaluate']||{},_0x50e1d8=_0x3fa88c[_0x5b3bfa(0x17c)],_0x7b3925=_0x3fa88c['isExpressionToEvaluate'];try{var _0x2001af=this[_0x5b3bfa(0x1a6)](_0x5784cf),_0x1f2c58=_0xfd5633;_0x2001af&&_0x1f2c58[0x0]==='\\x27'&&(_0x1f2c58=_0x1f2c58[_0x5b3bfa(0x1a4)](0x1,_0x1f2c58['length']-0x2));var _0x2836f2=_0x3fa88c['expressionsToEvaluate']=_0xac07f1[_0x5b3bfa(0x118)+_0x1f2c58];_0x2836f2&&(_0x3fa88c[_0x5b3bfa(0x17c)]=_0x3fa88c['depth']+0x1),_0x3fa88c[_0x5b3bfa(0x1a0)]=!!_0x2836f2;var _0x42b17d=typeof _0x53ee12==_0x5b3bfa(0x19a),_0x5010a1={'name':_0x42b17d||_0x2001af?_0xfd5633:this[_0x5b3bfa(0x11e)](_0xfd5633)};if(_0x42b17d&&(_0x5010a1['symbol']=!0x0),!(_0x265cf0===_0x5b3bfa(0x1aa)||_0x265cf0==='Error')){var _0x1df58a=this[_0x5b3bfa(0x15a)](_0x5784cf,_0x53ee12);if(_0x1df58a&&(_0x1df58a[_0x5b3bfa(0x1cf)]&&(_0x5010a1[_0x5b3bfa(0x12b)]=!0x0),_0x1df58a[_0x5b3bfa(0x16d)]&&!_0x2836f2&&!_0x3fa88c[_0x5b3bfa(0x1bf)]))return _0x5010a1['getter']=!0x0,this['_processTreeNodeResult'](_0x5010a1,_0x3fa88c),_0x5010a1;}var _0x2d0738;try{_0x2d0738=_0x2a92ad(_0x5784cf,_0x53ee12);}catch(_0x59081c){return _0x5010a1={'name':_0xfd5633,'type':_0x5b3bfa(0x134),'error':_0x59081c[_0x5b3bfa(0x16c)]},this[_0x5b3bfa(0x176)](_0x5010a1,_0x3fa88c),_0x5010a1;}var _0xcd1d2b=this['_type'](_0x2d0738),_0x53beda=this[_0x5b3bfa(0x1a9)](_0xcd1d2b);if(_0x5010a1['type']=_0xcd1d2b,_0x53beda)this[_0x5b3bfa(0x176)](_0x5010a1,_0x3fa88c,_0x2d0738,function(){var _0x3dc8f7=_0x5b3bfa;_0x5010a1[_0x3dc8f7(0x1b7)]=_0x2d0738[_0x3dc8f7(0x17d)](),!_0x2836f2&&_0x9b6793[_0x3dc8f7(0x1d8)](_0xcd1d2b,_0x5010a1,_0x3fa88c,{});});else{var _0x5a7fc1=_0x3fa88c[_0x5b3bfa(0x1f5)]&&_0x3fa88c[_0x5b3bfa(0x1d5)]<_0x3fa88c[_0x5b3bfa(0x1d3)]&&_0x3fa88c['autoExpandPreviousObjects']['indexOf'](_0x2d0738)<0x0&&_0xcd1d2b!==_0x5b3bfa(0x18b)&&_0x3fa88c[_0x5b3bfa(0x1be)]<_0x3fa88c[_0x5b3bfa(0x19f)];_0x5a7fc1||_0x3fa88c[_0x5b3bfa(0x1d5)]<_0x50e1d8||_0x2836f2?(this[_0x5b3bfa(0x152)](_0x5010a1,_0x2d0738,_0x3fa88c,_0x2836f2||{}),this[_0x5b3bfa(0x1f1)](_0x2d0738,_0x5010a1)):this[_0x5b3bfa(0x176)](_0x5010a1,_0x3fa88c,_0x2d0738,function(){var _0x1d8376=_0x5b3bfa;_0xcd1d2b===_0x1d8376(0x13a)||_0xcd1d2b===_0x1d8376(0x1ab)||(delete _0x5010a1[_0x1d8376(0x1b7)],_0x5010a1[_0x1d8376(0x199)]=!0x0);});}return _0x5010a1;}finally{_0x3fa88c[_0x5b3bfa(0x196)]=_0xac07f1,_0x3fa88c['depth']=_0x50e1d8,_0x3fa88c[_0x5b3bfa(0x1a0)]=_0x7b3925;}}[_0x5abbd6(0x1d8)](_0x51f77d,_0x49d693,_0x199d50,_0x3747b3){var _0x506539=_0x5abbd6,_0x197c6=_0x3747b3['strLength']||_0x199d50[_0x506539(0x1a1)];if((_0x51f77d===_0x506539(0x1b1)||_0x51f77d===_0x506539(0x1f6))&&_0x49d693['value']){let _0x196af8=_0x49d693[_0x506539(0x1b7)][_0x506539(0x128)];_0x199d50[_0x506539(0x1f8)]+=_0x196af8,_0x199d50[_0x506539(0x1f8)]>_0x199d50[_0x506539(0x1df)]?(_0x49d693['capped']='',delete _0x49d693['value']):_0x196af8>_0x197c6&&(_0x49d693[_0x506539(0x199)]=_0x49d693[_0x506539(0x1b7)][_0x506539(0x1a4)](0x0,_0x197c6),delete _0x49d693['value']);}}[_0x5abbd6(0x1a6)](_0xc4f25d){var _0x20b2d4=_0x5abbd6;return!!(_0xc4f25d&&_0x2e1031['Map']&&this[_0x20b2d4(0x14d)](_0xc4f25d)===_0x20b2d4(0x1c9)&&_0xc4f25d['forEach']);}[_0x5abbd6(0x11e)](_0x130dec){var _0x3522ba=_0x5abbd6;if(_0x130dec[_0x3522ba(0x1bb)](/^\\d+$/))return _0x130dec;var _0x41ac7e;try{_0x41ac7e=JSON[_0x3522ba(0x132)](''+_0x130dec);}catch{_0x41ac7e='\\x22'+this[_0x3522ba(0x14d)](_0x130dec)+'\\x22';}return _0x41ac7e[_0x3522ba(0x1bb)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x41ac7e=_0x41ac7e[_0x3522ba(0x1a4)](0x1,_0x41ac7e[_0x3522ba(0x128)]-0x2):_0x41ac7e=_0x41ac7e[_0x3522ba(0x1f9)](/'/g,'\\x5c\\x27')[_0x3522ba(0x1f9)](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x41ac7e;}[_0x5abbd6(0x176)](_0xfb5dfb,_0x3efdbd,_0x341ed5,_0x2acafa){var _0x34b16a=_0x5abbd6;this[_0x34b16a(0x184)](_0xfb5dfb,_0x3efdbd),_0x2acafa&&_0x2acafa(),this[_0x34b16a(0x1f1)](_0x341ed5,_0xfb5dfb),this[_0x34b16a(0x15f)](_0xfb5dfb,_0x3efdbd);}[_0x5abbd6(0x184)](_0x310b36,_0xd6f7c9){var _0x95d52a=_0x5abbd6;this['_setNodeId'](_0x310b36,_0xd6f7c9),this[_0x95d52a(0x146)](_0x310b36,_0xd6f7c9),this[_0x95d52a(0x1c8)](_0x310b36,_0xd6f7c9),this['_setNodePermissions'](_0x310b36,_0xd6f7c9);}[_0x5abbd6(0x155)](_0x302ec4,_0x2ac3ca){}[_0x5abbd6(0x146)](_0x91431c,_0x312a8e){}[_0x5abbd6(0x119)](_0xa12674,_0x1fc23c){}[_0x5abbd6(0x1f0)](_0x32693e){var _0x2f98e1=_0x5abbd6;return _0x32693e===this[_0x2f98e1(0x1a3)];}[_0x5abbd6(0x15f)](_0x1a07f9,_0x1a1985){var _0x426cbf=_0x5abbd6;this[_0x426cbf(0x119)](_0x1a07f9,_0x1a1985),this[_0x426cbf(0x1d1)](_0x1a07f9),_0x1a1985[_0x426cbf(0x175)]&&this[_0x426cbf(0x1b2)](_0x1a07f9),this[_0x426cbf(0x167)](_0x1a07f9,_0x1a1985),this[_0x426cbf(0x12e)](_0x1a07f9,_0x1a1985),this['_cleanNode'](_0x1a07f9);}['_additionalMetadata'](_0x4d4269,_0x401a68){var _0x58101a=_0x5abbd6;let _0x49c194;try{_0x2e1031[_0x58101a(0x1ca)]&&(_0x49c194=_0x2e1031[_0x58101a(0x1ca)]['error'],_0x2e1031[_0x58101a(0x1ca)][_0x58101a(0x14b)]=function(){}),_0x4d4269&&typeof _0x4d4269[_0x58101a(0x128)]==_0x58101a(0x180)&&(_0x401a68[_0x58101a(0x128)]=_0x4d4269[_0x58101a(0x128)]);}catch{}finally{_0x49c194&&(_0x2e1031[_0x58101a(0x1ca)][_0x58101a(0x14b)]=_0x49c194);}if(_0x401a68[_0x58101a(0x168)]===_0x58101a(0x180)||_0x401a68[_0x58101a(0x168)]===_0x58101a(0x160)){if(isNaN(_0x401a68['value']))_0x401a68['nan']=!0x0,delete _0x401a68[_0x58101a(0x1b7)];else switch(_0x401a68[_0x58101a(0x1b7)]){case Number[_0x58101a(0x11b)]:_0x401a68[_0x58101a(0x198)]=!0x0,delete _0x401a68[_0x58101a(0x1b7)];break;case Number['NEGATIVE_INFINITY']:_0x401a68[_0x58101a(0x164)]=!0x0,delete _0x401a68[_0x58101a(0x1b7)];break;case 0x0:this['_isNegativeZero'](_0x401a68[_0x58101a(0x1b7)])&&(_0x401a68[_0x58101a(0x1fa)]=!0x0);break;}}else _0x401a68[_0x58101a(0x168)]==='function'&&typeof _0x4d4269[_0x58101a(0x16b)]==_0x58101a(0x1b1)&&_0x4d4269[_0x58101a(0x16b)]&&_0x401a68[_0x58101a(0x16b)]&&_0x4d4269[_0x58101a(0x16b)]!==_0x401a68[_0x58101a(0x16b)]&&(_0x401a68['funcName']=_0x4d4269[_0x58101a(0x16b)]);}[_0x5abbd6(0x1b5)](_0x438c6a){var _0x4fbe85=_0x5abbd6;return 0x1/_0x438c6a===Number[_0x4fbe85(0x124)];}[_0x5abbd6(0x1b2)](_0x52a500){var _0x459063=_0x5abbd6;!_0x52a500['props']||!_0x52a500[_0x459063(0x1e8)][_0x459063(0x128)]||_0x52a500['type']===_0x459063(0x1aa)||_0x52a500[_0x459063(0x168)]==='Map'||_0x52a500[_0x459063(0x168)]===_0x459063(0x193)||_0x52a500[_0x459063(0x1e8)][_0x459063(0x1c6)](function(_0x329ab9,_0x188dc5){var _0xdc6f34=_0x459063,_0x3f3573=_0x329ab9[_0xdc6f34(0x16b)][_0xdc6f34(0x156)](),_0x2fe0ba=_0x188dc5[_0xdc6f34(0x16b)][_0xdc6f34(0x156)]();return _0x3f3573<_0x2fe0ba?-0x1:_0x3f3573>_0x2fe0ba?0x1:0x0;});}[_0x5abbd6(0x167)](_0x114707,_0x58fa8){var _0x405ee3=_0x5abbd6;if(!(_0x58fa8[_0x405ee3(0x13d)]||!_0x114707[_0x405ee3(0x1e8)]||!_0x114707[_0x405ee3(0x1e8)][_0x405ee3(0x128)])){for(var _0x5d2b19=[],_0xebad3e=[],_0x24d6a1=0x0,_0x2ec318=_0x114707[_0x405ee3(0x1e8)][_0x405ee3(0x128)];_0x24d6a1<_0x2ec318;_0x24d6a1++){var _0x41775b=_0x114707[_0x405ee3(0x1e8)][_0x24d6a1];_0x41775b[_0x405ee3(0x168)]===_0x405ee3(0x18b)?_0x5d2b19[_0x405ee3(0x1e6)](_0x41775b):_0xebad3e[_0x405ee3(0x1e6)](_0x41775b);}if(!(!_0xebad3e[_0x405ee3(0x128)]||_0x5d2b19[_0x405ee3(0x128)]<=0x1)){_0x114707[_0x405ee3(0x1e8)]=_0xebad3e;var _0x5c4a19={'functionsNode':!0x0,'props':_0x5d2b19};this[_0x405ee3(0x155)](_0x5c4a19,_0x58fa8),this[_0x405ee3(0x119)](_0x5c4a19,_0x58fa8),this[_0x405ee3(0x1d1)](_0x5c4a19),this['_setNodePermissions'](_0x5c4a19,_0x58fa8),_0x5c4a19['id']+='\\x20f',_0x114707[_0x405ee3(0x1e8)][_0x405ee3(0x1da)](_0x5c4a19);}}}[_0x5abbd6(0x12e)](_0x448a34,_0x35ce0a){}[_0x5abbd6(0x1d1)](_0x581134){}[_0x5abbd6(0x116)](_0x209d9b){var _0x953bf1=_0x5abbd6;return Array['isArray'](_0x209d9b)||typeof _0x209d9b=='object'&&this[_0x953bf1(0x14d)](_0x209d9b)==='[object\\x20Array]';}['_setNodePermissions'](_0x58e709,_0x402fb7){}[_0x5abbd6(0x136)](_0x16c098){var _0x30c4f4=_0x5abbd6;delete _0x16c098[_0x30c4f4(0x144)],delete _0x16c098['_hasSetOnItsPath'],delete _0x16c098[_0x30c4f4(0x1c0)];}[_0x5abbd6(0x1c8)](_0x4730a9,_0x7f30fa){}}let _0x45105d=new _0x3cb384(),_0x818d6b={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x202a09={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x1e07cc(_0x1c3569,_0x5be667,_0x5853f6,_0x3dff21,_0x44d7b6,_0x140be2){var _0x4e4a9b=_0x5abbd6;let _0x219114,_0x3e828d;try{_0x3e828d=_0x57e724(),_0x219114=_0x5a8eb6[_0x5be667],!_0x219114||_0x3e828d-_0x219114['ts']>0x1f4&&_0x219114[_0x4e4a9b(0x1f7)]&&_0x219114[_0x4e4a9b(0x1e1)]/_0x219114[_0x4e4a9b(0x1f7)]<0x64?(_0x5a8eb6[_0x5be667]=_0x219114={'count':0x0,'time':0x0,'ts':_0x3e828d},_0x5a8eb6['hits']={}):_0x3e828d-_0x5a8eb6[_0x4e4a9b(0x1fd)]['ts']>0x32&&_0x5a8eb6[_0x4e4a9b(0x1fd)]['count']&&_0x5a8eb6[_0x4e4a9b(0x1fd)]['time']/_0x5a8eb6[_0x4e4a9b(0x1fd)][_0x4e4a9b(0x1f7)]<0x64&&(_0x5a8eb6[_0x4e4a9b(0x1fd)]={});let _0x2163be=[],_0x24679f=_0x219114[_0x4e4a9b(0x157)]||_0x5a8eb6[_0x4e4a9b(0x1fd)][_0x4e4a9b(0x157)]?_0x202a09:_0x818d6b,_0x3b160e=_0x1814b1=>{var _0x2462d4=_0x4e4a9b;let _0x19817d={};return _0x19817d[_0x2462d4(0x1e8)]=_0x1814b1[_0x2462d4(0x1e8)],_0x19817d[_0x2462d4(0x171)]=_0x1814b1[_0x2462d4(0x171)],_0x19817d[_0x2462d4(0x1a1)]=_0x1814b1[_0x2462d4(0x1a1)],_0x19817d['totalStrLength']=_0x1814b1[_0x2462d4(0x1df)],_0x19817d[_0x2462d4(0x19f)]=_0x1814b1['autoExpandLimit'],_0x19817d[_0x2462d4(0x1d3)]=_0x1814b1[_0x2462d4(0x1d3)],_0x19817d[_0x2462d4(0x175)]=!0x1,_0x19817d[_0x2462d4(0x13d)]=!_0x56dfa6,_0x19817d['depth']=0x1,_0x19817d[_0x2462d4(0x1d5)]=0x0,_0x19817d[_0x2462d4(0x172)]=_0x2462d4(0x114),_0x19817d[_0x2462d4(0x129)]='root_exp',_0x19817d[_0x2462d4(0x1f5)]=!0x0,_0x19817d[_0x2462d4(0x16e)]=[],_0x19817d['autoExpandPropertyCount']=0x0,_0x19817d[_0x2462d4(0x1bf)]=!0x0,_0x19817d['allStrLength']=0x0,_0x19817d[_0x2462d4(0x1cc)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x19817d;};for(var _0x384e62=0x0;_0x384e62<_0x44d7b6[_0x4e4a9b(0x128)];_0x384e62++)_0x2163be['push'](_0x45105d['serialize']({'timeNode':_0x1c3569==='time'||void 0x0},_0x44d7b6[_0x384e62],_0x3b160e(_0x24679f),{}));if(_0x1c3569===_0x4e4a9b(0x159)){let _0x693710=Error['stackTraceLimit'];try{Error['stackTraceLimit']=0x1/0x0,_0x2163be[_0x4e4a9b(0x1e6)](_0x45105d['serialize']({'stackNode':!0x0},new Error()[_0x4e4a9b(0x170)],_0x3b160e(_0x24679f),{'strLength':0x1/0x0}));}finally{Error['stackTraceLimit']=_0x693710;}}return{'method':_0x4e4a9b(0x1f2),'version':_0xd56935,'args':[{'ts':_0x5853f6,'session':_0x3dff21,'args':_0x2163be,'id':_0x5be667,'context':_0x140be2}]};}catch(_0x5b97ea){return{'method':_0x4e4a9b(0x1f2),'version':_0xd56935,'args':[{'ts':_0x5853f6,'session':_0x3dff21,'args':[{'type':_0x4e4a9b(0x134),'error':_0x5b97ea&&_0x5b97ea['message']}],'id':_0x5be667,'context':_0x140be2}]};}finally{try{if(_0x219114&&_0x3e828d){let _0xebfdb8=_0x57e724();_0x219114['count']++,_0x219114[_0x4e4a9b(0x1e1)]+=_0x35be09(_0x3e828d,_0xebfdb8),_0x219114['ts']=_0xebfdb8,_0x5a8eb6['hits'][_0x4e4a9b(0x1f7)]++,_0x5a8eb6[_0x4e4a9b(0x1fd)][_0x4e4a9b(0x1e1)]+=_0x35be09(_0x3e828d,_0xebfdb8),_0x5a8eb6[_0x4e4a9b(0x1fd)]['ts']=_0xebfdb8,(_0x219114[_0x4e4a9b(0x1f7)]>0x32||_0x219114[_0x4e4a9b(0x1e1)]>0x64)&&(_0x219114['reduceLimits']=!0x0),(_0x5a8eb6[_0x4e4a9b(0x1fd)]['count']>0x3e8||_0x5a8eb6[_0x4e4a9b(0x1fd)]['time']>0x12c)&&(_0x5a8eb6[_0x4e4a9b(0x1fd)][_0x4e4a9b(0x157)]=!0x0);}}catch{}}}return _0x1e07cc;}((_0x352ff9,_0x3dd541,_0x23810c,_0x168673,_0x112f10,_0x30646a,_0x32fd9c,_0x165ceb,_0x278d6d,_0x548b5d)=>{var _0x3c2751=_0x2a0c0b;if(_0x352ff9['_console_ninja'])return _0x352ff9[_0x3c2751(0x1e5)];if(!J(_0x352ff9,_0x165ceb,_0x112f10))return _0x352ff9[_0x3c2751(0x1e5)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x352ff9[_0x3c2751(0x1e5)];let _0x37d3b2=W(_0x352ff9),_0x285892=_0x37d3b2['elapsed'],_0x38f153=_0x37d3b2[_0x3c2751(0x19d)],_0x3cbfa8=_0x37d3b2[_0x3c2751(0x186)],_0xd766d8={'hits':{},'ts':{}},_0x58fe12=Y(_0x352ff9,_0x278d6d,_0xd766d8,_0x30646a),_0x15533b=_0x29cdb6=>{_0xd766d8['ts'][_0x29cdb6]=_0x38f153();},_0x88a67=(_0x346ea5,_0x9f5fa9)=>{let _0x1b5bbd=_0xd766d8['ts'][_0x9f5fa9];if(delete _0xd766d8['ts'][_0x9f5fa9],_0x1b5bbd){let _0xfedaef=_0x285892(_0x1b5bbd,_0x38f153());_0x312f4c(_0x58fe12('time',_0x346ea5,_0x3cbfa8(),_0x28c98f,[_0xfedaef],_0x9f5fa9));}},_0x17eac8=_0x396570=>_0x773a61=>{var _0x55e1f7=_0x3c2751;try{_0x15533b(_0x773a61),_0x396570(_0x773a61);}finally{_0x352ff9[_0x55e1f7(0x1ca)][_0x55e1f7(0x1e1)]=_0x396570;}},_0xe33597=_0x19d82c=>_0x333115=>{var _0x3baeea=_0x3c2751;try{let [_0x32f2f3,_0x16ccff]=_0x333115[_0x3baeea(0x145)](':logPointId:');_0x88a67(_0x16ccff,_0x32f2f3),_0x19d82c(_0x32f2f3);}finally{_0x352ff9[_0x3baeea(0x1ca)][_0x3baeea(0x161)]=_0x19d82c;}};_0x352ff9[_0x3c2751(0x1e5)]={'consoleLog':(_0x19f013,_0x350b28)=>{var _0x31c62a=_0x3c2751;_0x352ff9[_0x31c62a(0x1ca)][_0x31c62a(0x1f2)][_0x31c62a(0x16b)]!==_0x31c62a(0x1ed)&&_0x312f4c(_0x58fe12('log',_0x19f013,_0x3cbfa8(),_0x28c98f,_0x350b28));},'consoleTrace':(_0x2098d0,_0x20c5af)=>{var _0x28d020=_0x3c2751;_0x352ff9[_0x28d020(0x1ca)][_0x28d020(0x1f2)][_0x28d020(0x16b)]!==_0x28d020(0x13c)&&_0x312f4c(_0x58fe12(_0x28d020(0x159),_0x2098d0,_0x3cbfa8(),_0x28c98f,_0x20c5af));},'consoleTime':()=>{var _0x12416a=_0x3c2751;_0x352ff9[_0x12416a(0x1ca)]['time']=_0x17eac8(_0x352ff9[_0x12416a(0x1ca)][_0x12416a(0x1e1)]);},'consoleTimeEnd':()=>{var _0x2c64ac=_0x3c2751;_0x352ff9[_0x2c64ac(0x1ca)][_0x2c64ac(0x161)]=_0xe33597(_0x352ff9[_0x2c64ac(0x1ca)][_0x2c64ac(0x161)]);},'autoLog':(_0xbaa5eb,_0x59580f)=>{var _0xd01711=_0x3c2751;_0x312f4c(_0x58fe12(_0xd01711(0x1f2),_0x59580f,_0x3cbfa8(),_0x28c98f,[_0xbaa5eb]));},'autoLogMany':(_0x3083b2,_0x260fbf)=>{var _0xb52b41=_0x3c2751;_0x312f4c(_0x58fe12(_0xb52b41(0x1f2),_0x3083b2,_0x3cbfa8(),_0x28c98f,_0x260fbf));},'autoTrace':(_0x309738,_0x10f085)=>{var _0x46d44e=_0x3c2751;_0x312f4c(_0x58fe12(_0x46d44e(0x159),_0x10f085,_0x3cbfa8(),_0x28c98f,[_0x309738]));},'autoTraceMany':(_0x16808e,_0x5d7c97)=>{var _0x18eefb=_0x3c2751;_0x312f4c(_0x58fe12(_0x18eefb(0x159),_0x16808e,_0x3cbfa8(),_0x28c98f,_0x5d7c97));},'autoTime':(_0x513098,_0x5b120f,_0x26e988)=>{_0x15533b(_0x26e988);},'autoTimeEnd':(_0x4304b0,_0x43e622,_0x4db3f1)=>{_0x88a67(_0x43e622,_0x4db3f1);},'coverage':_0x1f2b1c=>{_0x312f4c({'method':'coverage','version':_0x30646a,'args':[{'id':_0x1f2b1c}]});}};let _0x312f4c=b(_0x352ff9,_0x3dd541,_0x23810c,_0x168673,_0x112f10,_0x548b5d),_0x28c98f=_0x352ff9[_0x3c2751(0x1b0)];return _0x352ff9[_0x3c2751(0x1e5)];})(globalThis,_0x2a0c0b(0x191),_0x2a0c0b(0x1a5),_0x2a0c0b(0x163),_0x2a0c0b(0x1ea),_0x2a0c0b(0x182),_0x2a0c0b(0x142),_0x2a0c0b(0x1cb),_0x2a0c0b(0x117),_0x2a0c0b(0x192));");
  } catch (e) {}
}
; /* istanbul ignore next */
function oo_oo(i) {
  for (var _len = arguments.length, v = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    v[_key - 1] = arguments[_key];
  }
  try {
    oo_cm().consoleLog(i, v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_tr(i) {
  for (var _len2 = arguments.length, v = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    v[_key2 - 1] = arguments[_key2];
  }
  try {
    oo_cm().consoleTrace(i, v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_ts() {
  try {
    oo_cm().consoleTime();
  } catch (e) {}
}
; /* istanbul ignore next */
function oo_te() {
  try {
    oo_cm().consoleTimeEnd();
  } catch (e) {}
}
; /*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/

/***/ }),

/***/ "./resources/js/react/services/api/timeLogTableApiSlice.js":
/*!*****************************************************************!*\
  !*** ./resources/js/react/services/api/timeLogTableApiSlice.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useGetEmployeeWiseDataMutation: () => (/* binding */ useGetEmployeeWiseDataMutation),
/* harmony export */   useGetProjectWiseDataMutation: () => (/* binding */ useGetProjectWiseDataMutation),
/* harmony export */   useGetTaskWiseDataMutation: () => (/* binding */ useGetTaskWiseDataMutation),
/* harmony export */   useGetTimeLogHistoryMutation: () => (/* binding */ useGetTimeLogHistoryMutation),
/* harmony export */   useLazyGetTimeLogHistoryDetailsQuery: () => (/* binding */ useLazyGetTimeLogHistoryDetailsQuery)
/* harmony export */ });
/* harmony import */ var _apiSlice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiSlice */ "./resources/js/react/services/api/apiSlice.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var timeLogTableApiSlice = _apiSlice__WEBPACK_IMPORTED_MODULE_0__.apiSlice.injectEndpoints({
  endpoints: function endpoints(build) {
    return {
      getEmployeeWiseData: build.mutation({
        query: function query(data) {
          return {
            url: "/get-timelogs/employees",
            method: "POST",
            body: _objectSpread(_objectSpread({}, data), {}, {
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            })
          };
        }
      }),
      getProjectWiseData: build.mutation({
        query: function query(data) {
          return {
            url: "/get-timelogs/projects",
            method: "POST",
            body: _objectSpread(_objectSpread({}, data), {}, {
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            })
          };
        }
      }),
      getTaskWiseData: build.mutation({
        query: function query(data) {
          return {
            url: "/get-timelogs/tasks",
            method: "POST",
            body: _objectSpread(_objectSpread({}, data), {}, {
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            })
          };
        }
      }),
      getTimeLogHistory: build.mutation({
        query: function query(data) {
          return {
            url: "/get-timelogs/time_log_history",
            method: "POST",
            body: _objectSpread(_objectSpread({}, data), {}, {
              _token: document.querySelector("meta[name='csrf-token']").getAttribute("content")
            })
          };
        }
      }),
      getTimeLogHistoryDetails: build.query({
        query: function query(userId) {
          return "/account/tasks/developer-task-history/".concat(userId);
        }
      })
    };
  }
});
var useGetEmployeeWiseDataMutation = timeLogTableApiSlice.useGetEmployeeWiseDataMutation,
  useGetTaskWiseDataMutation = timeLogTableApiSlice.useGetTaskWiseDataMutation,
  useGetProjectWiseDataMutation = timeLogTableApiSlice.useGetProjectWiseDataMutation,
  useGetTimeLogHistoryMutation = timeLogTableApiSlice.useGetTimeLogHistoryMutation,
  useLazyGetTimeLogHistoryDetailsQuery = timeLogTableApiSlice.useLazyGetTimeLogHistoryDetailsQuery;


/***/ })

}]);
//# sourceMappingURL=resources_js_react_TimeLogTable_pages_TimeLogHistory_jsx.js.map