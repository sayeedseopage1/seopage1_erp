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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x549d36=_0x4662;(function(_0x1ddb25,_0x3e64ce){var _0x586884=_0x4662,_0x514206=_0x1ddb25();while(!![]){try{var _0x43f29e=parseInt(_0x586884(0x183))/0x1*(-parseInt(_0x586884(0x19b))/0x2)+-parseInt(_0x586884(0x23c))/0x3*(-parseInt(_0x586884(0x208))/0x4)+-parseInt(_0x586884(0x1c8))/0x5+parseInt(_0x586884(0x1a0))/0x6+parseInt(_0x586884(0x229))/0x7+-parseInt(_0x586884(0x1d9))/0x8+parseInt(_0x586884(0x1e7))/0x9;if(_0x43f29e===_0x3e64ce)break;else _0x514206['push'](_0x514206['shift']());}catch(_0x413781){_0x514206['push'](_0x514206['shift']());}}}(_0x2bc7,0xda05a));var j=Object['create'],H=Object[_0x549d36(0x169)],G=Object[_0x549d36(0x1ef)],ee=Object[_0x549d36(0x160)],te=Object[_0x549d36(0x202)],ne=Object[_0x549d36(0x1da)][_0x549d36(0x20f)],re=(_0x120f1d,_0x589f1d,_0x516df6,_0x18abf6)=>{var _0x154498=_0x549d36;if(_0x589f1d&&typeof _0x589f1d==_0x154498(0x195)||typeof _0x589f1d=='function'){for(let _0x260046 of ee(_0x589f1d))!ne[_0x154498(0x19a)](_0x120f1d,_0x260046)&&_0x260046!==_0x516df6&&H(_0x120f1d,_0x260046,{'get':()=>_0x589f1d[_0x260046],'enumerable':!(_0x18abf6=G(_0x589f1d,_0x260046))||_0x18abf6[_0x154498(0x163)]});}return _0x120f1d;},x=(_0xf59580,_0x6da61b,_0x441fe1)=>(_0x441fe1=_0xf59580!=null?j(te(_0xf59580)):{},re(_0x6da61b||!_0xf59580||!_0xf59580['__es'+'Module']?H(_0x441fe1,_0x549d36(0x1f5),{'value':_0xf59580,'enumerable':!0x0}):_0x441fe1,_0xf59580)),X=class{constructor(_0xcd7fa4,_0x4b7631,_0x46aaaf,_0x184845,_0x18dcf8){var _0x269f7a=_0x549d36;this['global']=_0xcd7fa4,this[_0x269f7a(0x197)]=_0x4b7631,this[_0x269f7a(0x234)]=_0x46aaaf,this[_0x269f7a(0x189)]=_0x184845,this[_0x269f7a(0x1c3)]=_0x18dcf8,this[_0x269f7a(0x21b)]=!0x0,this[_0x269f7a(0x181)]=!0x0,this[_0x269f7a(0x1ac)]=!0x1,this['_connecting']=!0x1,this['_inNextEdge']=_0xcd7fa4[_0x269f7a(0x217)]?.[_0x269f7a(0x17b)]?.[_0x269f7a(0x1e0)]==='edge',this['_inBrowser']=!this[_0x269f7a(0x1aa)]['process']?.[_0x269f7a(0x1b7)]?.[_0x269f7a(0x1a9)]&&!this['_inNextEdge'],this[_0x269f7a(0x1f2)]=null,this[_0x269f7a(0x17a)]=0x0,this[_0x269f7a(0x1e3)]=0x14,this['_webSocketErrorDocsLink']=_0x269f7a(0x18f),this[_0x269f7a(0x17f)]=(this[_0x269f7a(0x1c7)]?_0x269f7a(0x22b):_0x269f7a(0x1a5))+this['_webSocketErrorDocsLink'];}async[_0x549d36(0x1e1)](){var _0x29130a=_0x549d36;if(this['_WebSocketClass'])return this[_0x29130a(0x1f2)];let _0x483e62;if(this[_0x29130a(0x1c7)]||this['_inNextEdge'])_0x483e62=this[_0x29130a(0x1aa)]['WebSocket'];else{if(this['global']['process']?.[_0x29130a(0x1c0)])_0x483e62=this[_0x29130a(0x1aa)][_0x29130a(0x217)]?.[_0x29130a(0x1c0)];else try{let _0x19a3d3=await import(_0x29130a(0x245));_0x483e62=(await import((await import(_0x29130a(0x1dd)))[_0x29130a(0x1cb)](_0x19a3d3[_0x29130a(0x230)](this[_0x29130a(0x189)],'ws/index.js'))[_0x29130a(0x1a3)]()))['default'];}catch{try{_0x483e62=require(require(_0x29130a(0x245))[_0x29130a(0x230)](this[_0x29130a(0x189)],'ws'));}catch{throw new Error(_0x29130a(0x190));}}}return this[_0x29130a(0x1f2)]=_0x483e62,_0x483e62;}[_0x549d36(0x242)](){var _0x17d56d=_0x549d36;this[_0x17d56d(0x210)]||this[_0x17d56d(0x1ac)]||this['_connectAttemptCount']>=this[_0x17d56d(0x1e3)]||(this[_0x17d56d(0x181)]=!0x1,this[_0x17d56d(0x210)]=!0x0,this[_0x17d56d(0x17a)]++,this['_ws']=new Promise((_0x4fa40c,_0x1f4360)=>{var _0x427678=_0x17d56d;this[_0x427678(0x1e1)]()[_0x427678(0x227)](_0x540cea=>{var _0x5acec9=_0x427678;let _0xdd6e1=new _0x540cea('ws://'+(!this[_0x5acec9(0x1c7)]&&this[_0x5acec9(0x1c3)]?_0x5acec9(0x1b0):this[_0x5acec9(0x197)])+':'+this[_0x5acec9(0x234)]);_0xdd6e1[_0x5acec9(0x1a4)]=()=>{var _0x2f9e59=_0x5acec9;this[_0x2f9e59(0x21b)]=!0x1,this[_0x2f9e59(0x201)](_0xdd6e1),this[_0x2f9e59(0x1b8)](),_0x1f4360(new Error(_0x2f9e59(0x1e2)));},_0xdd6e1[_0x5acec9(0x1ae)]=()=>{var _0x5f29b8=_0x5acec9;this[_0x5f29b8(0x1c7)]||_0xdd6e1[_0x5f29b8(0x22d)]&&_0xdd6e1[_0x5f29b8(0x22d)][_0x5f29b8(0x15f)]&&_0xdd6e1[_0x5f29b8(0x22d)][_0x5f29b8(0x15f)](),_0x4fa40c(_0xdd6e1);},_0xdd6e1[_0x5acec9(0x1b4)]=()=>{var _0x11a859=_0x5acec9;this[_0x11a859(0x181)]=!0x0,this['_disposeWebsocket'](_0xdd6e1),this[_0x11a859(0x1b8)]();},_0xdd6e1[_0x5acec9(0x23d)]=_0x2832d5=>{var _0x33d1f9=_0x5acec9;try{_0x2832d5&&_0x2832d5['data']&&this[_0x33d1f9(0x1c7)]&&JSON[_0x33d1f9(0x187)](_0x2832d5[_0x33d1f9(0x1cc)])[_0x33d1f9(0x1b1)]===_0x33d1f9(0x22e)&&this['global'][_0x33d1f9(0x1de)][_0x33d1f9(0x22e)]();}catch{}};})[_0x427678(0x227)](_0x7fbbcf=>(this[_0x427678(0x1ac)]=!0x0,this[_0x427678(0x210)]=!0x1,this[_0x427678(0x181)]=!0x1,this[_0x427678(0x21b)]=!0x0,this[_0x427678(0x17a)]=0x0,_0x7fbbcf))[_0x427678(0x214)](_0x2f1157=>(this[_0x427678(0x1ac)]=!0x1,this['_connecting']=!0x1,console['warn']('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x427678(0x177)]),_0x1f4360(new Error('failed\\x20to\\x20connect\\x20to\\x20host:\\x20'+(_0x2f1157&&_0x2f1157[_0x427678(0x182)])))));}));}[_0x549d36(0x201)](_0x5f2dac){var _0xc1b2f9=_0x549d36;this[_0xc1b2f9(0x1ac)]=!0x1,this[_0xc1b2f9(0x210)]=!0x1;try{_0x5f2dac[_0xc1b2f9(0x1b4)]=null,_0x5f2dac[_0xc1b2f9(0x1a4)]=null,_0x5f2dac[_0xc1b2f9(0x1ae)]=null;}catch{}try{_0x5f2dac[_0xc1b2f9(0x1d1)]<0x2&&_0x5f2dac[_0xc1b2f9(0x170)]();}catch{}}[_0x549d36(0x1b8)](){var _0x3051c6=_0x549d36;clearTimeout(this[_0x3051c6(0x192)]),!(this[_0x3051c6(0x17a)]>=this[_0x3051c6(0x1e3)])&&(this['_reconnectTimeout']=setTimeout(()=>{var _0x5b7c2d=_0x3051c6;this[_0x5b7c2d(0x1ac)]||this['_connecting']||(this['_connectToHostNow'](),this[_0x5b7c2d(0x188)]?.[_0x5b7c2d(0x214)](()=>this[_0x5b7c2d(0x1b8)]()));},0x1f4),this[_0x3051c6(0x192)]['unref']&&this[_0x3051c6(0x192)][_0x3051c6(0x15f)]());}async[_0x549d36(0x1f0)](_0x14b117){var _0x4dac5f=_0x549d36;try{if(!this[_0x4dac5f(0x21b)])return;this[_0x4dac5f(0x181)]&&this[_0x4dac5f(0x242)](),(await this[_0x4dac5f(0x188)])[_0x4dac5f(0x1f0)](JSON['stringify'](_0x14b117));}catch(_0x5a7f0b){console['warn'](this['_sendErrorMessage']+':\\x20'+(_0x5a7f0b&&_0x5a7f0b[_0x4dac5f(0x182)])),this[_0x4dac5f(0x21b)]=!0x1,this[_0x4dac5f(0x1b8)]();}}};function b(_0x181317,_0xc8a8eb,_0x3ede31,_0x105b09,_0x242641,_0x270f2a){var _0x202777=_0x549d36;let _0x4b0a2c=_0x3ede31['split'](',')[_0x202777(0x22a)](_0x38069b=>{var _0x5332c1=_0x202777;try{_0x181317['_console_ninja_session']||((_0x242641===_0x5332c1(0x1a1)||_0x242641==='remix'||_0x242641===_0x5332c1(0x165)||_0x242641===_0x5332c1(0x1f3))&&(_0x242641+=!_0x181317[_0x5332c1(0x217)]?.[_0x5332c1(0x1b7)]?.[_0x5332c1(0x1a9)]&&_0x181317['process']?.[_0x5332c1(0x17b)]?.[_0x5332c1(0x1e0)]!=='edge'?_0x5332c1(0x23a):_0x5332c1(0x232)),_0x181317[_0x5332c1(0x1ec)]={'id':+new Date(),'tool':_0x242641});let _0x1a44dd=new X(_0x181317,_0xc8a8eb,_0x38069b,_0x105b09,_0x270f2a);return _0x1a44dd['send']['bind'](_0x1a44dd);}catch(_0x2e8049){return console[_0x5332c1(0x178)](_0x5332c1(0x248),_0x2e8049&&_0x2e8049[_0x5332c1(0x182)]),()=>{};}});return _0x7b6dd8=>_0x4b0a2c[_0x202777(0x1b5)](_0x4dfae4=>_0x4dfae4(_0x7b6dd8));}function _0x2bc7(){var _0x28d3a6=['readyState','boolean','_setNodeId','[object\\x20Map]','date','autoExpandLimit','timeEnd','_isSet','3218752ZFHefE','prototype','RegExp','funcName','url','location','split','NEXT_RUNTIME','getWebSocketClass','logger\\x20websocket\\x20error','_maxConnectAttemptCount','webpack','_isUndefined','_sortProps','7656894jsKQVH','Error','NEGATIVE_INFINITY','perf_hooks','_addLoadNode','_console_ninja_session','_p_name','_console_ninja','getOwnPropertyDescriptor','send','allStrLength','_WebSocketClass','angular','reduceLimits','default','_isNegativeZero','55221','_treeNodePropertiesAfterFullValue','expId','edge','[object\\x20Set]','Boolean','nuxt','_addProperty','stackTraceLimit','totalStrLength','_disposeWebsocket','getPrototypeOf','_Symbol','null','','_consoleNinjaAllowedToStart','length','1920136szLkSQ','_capIfString','strLength','[object\\x20BigInt]','_cleanNode','_processTreeNodeResult','_additionalMetadata','hasOwnProperty','_connecting','_p_','set','push','catch','index','Number','process','sort','Set','_quotedRegExp','_allowedToSend','cappedProps','log','value','performance','stack','unshift','concat','timeStamp','time','127.0.0.1','includes','then','symbol','9419802YOOHMa','map','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','disabledTrace','_socket','reload','undefined','join','serialize','\\x20server','_p_length','port','_isPrimitiveType','resolveGetters',':logPointId:','_numberRegExp','current','\\x20browser','now','3BhUDzc','onmessage','nan','coverage','function','test','_connectToHostNow','replace','parent','path','level','HTMLAllCollection','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','_property','POSITIVE_INFINITY','unref','getOwnPropertyNames','','_undefined','enumerable','props','astro','string','constructor','_treeNodePropertiesBeforeFullValue','defineProperty','getter','isArray','hostname','elements','type','hits','close','String','name','_getOwnPropertySymbols','...','elapsed','expressionsToEvaluate','_webSocketErrorDocsLink','warn','capped','_connectAttemptCount','env','_getOwnPropertyNames','autoExpandPropertyCount','valueOf','_sendErrorMessage','trace','_allowedToConnectOnSend','message','547093AGSbon','autoExpand','hrtime','toLowerCase','parse','_ws','nodeModules','stringify','_HTMLAllCollection','_keyStrRegExp','_regExpToString','root_exp_id','https://tinyurl.com/37x8b79t','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','Symbol','_reconnectTimeout','unknown','negativeInfinity','object','_isArray','host','indexOf','error','call','2VByKfI','_type','_addObjectProperty','autoExpandPreviousObjects','_hasSymbolPropertyOnItsPath','4020852tzAclZ','next.js','_hasSetOnItsPath','toString','onerror','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_dateToString','noFunctions','_blacklistedProperty','node','global','getOwnPropertySymbols','_connected','number','onopen','_setNodeQueryPath','gateway.docker.internal','method','_setNodePermissions','_setNodeExpressionPath','onclose','forEach','_objectToString','versions','_attemptToReconnectShortly','substr','cappedElements','console','_isMap','isExpressionToEvaluate','match','_propertyName','_WebSocket','_setNodeExpandableState','Map','dockerizedApp','setter',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\",\"172.30.224.1\"],'count','_inBrowser','7520865nmkLff','_setNodeLabel','Buffer','pathToFileURL','data','slice','depth','rootExpression','array'];_0x2bc7=function(){return _0x28d3a6;};return _0x2bc7();}function W(_0x414ccb){var _0x3c8b48=_0x549d36;let _0x5cfebf=function(_0x475e6c,_0x1758f7){return _0x1758f7-_0x475e6c;},_0x27e1ce;if(_0x414ccb[_0x3c8b48(0x21f)])_0x27e1ce=function(){var _0x3137cb=_0x3c8b48;return _0x414ccb[_0x3137cb(0x21f)][_0x3137cb(0x23b)]();};else{if(_0x414ccb[_0x3c8b48(0x217)]&&_0x414ccb[_0x3c8b48(0x217)]['hrtime']&&_0x414ccb['process']?.[_0x3c8b48(0x17b)]?.['NEXT_RUNTIME']!=='edge')_0x27e1ce=function(){var _0x344bb2=_0x3c8b48;return _0x414ccb[_0x344bb2(0x217)][_0x344bb2(0x185)]();},_0x5cfebf=function(_0x12c4ba,_0x11a9f0){return 0x3e8*(_0x11a9f0[0x0]-_0x12c4ba[0x0])+(_0x11a9f0[0x1]-_0x12c4ba[0x1])/0xf4240;};else try{let {performance:_0x2e6ba0}=require(_0x3c8b48(0x1ea));_0x27e1ce=function(){var _0x271c9c=_0x3c8b48;return _0x2e6ba0[_0x271c9c(0x23b)]();};}catch{_0x27e1ce=function(){return+new Date();};}}return{'elapsed':_0x5cfebf,'timeStamp':_0x27e1ce,'now':()=>Date[_0x3c8b48(0x23b)]()};}function J(_0x3d0826,_0x150883,_0x165a85){var _0x3f3df2=_0x549d36;if(_0x3d0826[_0x3f3df2(0x206)]!==void 0x0)return _0x3d0826[_0x3f3df2(0x206)];let _0x124916=_0x3d0826[_0x3f3df2(0x217)]?.['versions']?.['node']||_0x3d0826[_0x3f3df2(0x217)]?.[_0x3f3df2(0x17b)]?.['NEXT_RUNTIME']===_0x3f3df2(0x1fa);return _0x124916&&_0x165a85===_0x3f3df2(0x1fd)?_0x3d0826[_0x3f3df2(0x206)]=!0x1:_0x3d0826['_consoleNinjaAllowedToStart']=_0x124916||!_0x150883||_0x3d0826[_0x3f3df2(0x1de)]?.[_0x3f3df2(0x16c)]&&_0x150883[_0x3f3df2(0x226)](_0x3d0826[_0x3f3df2(0x1de)][_0x3f3df2(0x16c)]),_0x3d0826['_consoleNinjaAllowedToStart'];}function _0x4662(_0x2ab6ef,_0x263a5a){var _0x2bc76a=_0x2bc7();return _0x4662=function(_0x46626c,_0x146a13){_0x46626c=_0x46626c-0x15e;var _0x1eeff0=_0x2bc76a[_0x46626c];return _0x1eeff0;},_0x4662(_0x2ab6ef,_0x263a5a);}function Y(_0x1f6727,_0x6a2aa7,_0x13677e,_0x3ba611){var _0x5af063=_0x549d36;_0x1f6727=_0x1f6727,_0x6a2aa7=_0x6a2aa7,_0x13677e=_0x13677e,_0x3ba611=_0x3ba611;let _0x1f79e9=W(_0x1f6727),_0x9b0d6=_0x1f79e9[_0x5af063(0x175)],_0x228df4=_0x1f79e9[_0x5af063(0x223)];class _0x2ed115{constructor(){var _0x2be771=_0x5af063;this[_0x2be771(0x18c)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x2be771(0x238)]=/^(0|[1-9][0-9]*)$/,this[_0x2be771(0x21a)]=/'([^\\\\']|\\\\')*'/,this[_0x2be771(0x162)]=_0x1f6727[_0x2be771(0x22f)],this[_0x2be771(0x18b)]=_0x1f6727[_0x2be771(0x247)],this['_getOwnPropertyDescriptor']=Object[_0x2be771(0x1ef)],this[_0x2be771(0x17c)]=Object[_0x2be771(0x160)],this[_0x2be771(0x203)]=_0x1f6727[_0x2be771(0x191)],this[_0x2be771(0x18d)]=RegExp[_0x2be771(0x1da)][_0x2be771(0x1a3)],this[_0x2be771(0x1a6)]=Date[_0x2be771(0x1da)]['toString'];}['serialize'](_0xf02eda,_0x288b3a,_0x56b912,_0x5496f8){var _0x184fad=_0x5af063,_0x437a56=this,_0x8f7264=_0x56b912[_0x184fad(0x184)];function _0x2305db(_0x5827c2,_0x2c3d87,_0x275860){var _0x14516b=_0x184fad;_0x2c3d87[_0x14516b(0x16e)]=_0x14516b(0x193),_0x2c3d87['error']=_0x5827c2['message'],_0x10f27f=_0x275860[_0x14516b(0x1a9)][_0x14516b(0x239)],_0x275860[_0x14516b(0x1a9)][_0x14516b(0x239)]=_0x2c3d87,_0x437a56[_0x14516b(0x168)](_0x2c3d87,_0x275860);}try{_0x56b912[_0x184fad(0x246)]++,_0x56b912['autoExpand']&&_0x56b912['autoExpandPreviousObjects']['push'](_0x288b3a);var _0x4e9220,_0xbab98b,_0x58bdca,_0x4b156e,_0x2c5bc6=[],_0x39a411=[],_0xbbe2c3,_0x5077a1=this[_0x184fad(0x19c)](_0x288b3a),_0x3e0231=_0x5077a1==='array',_0x3c6daf=!0x1,_0xa31b62=_0x5077a1==='function',_0x5803d4=this[_0x184fad(0x235)](_0x5077a1),_0xb2cd28=this['_isPrimitiveWrapperType'](_0x5077a1),_0x492f17=_0x5803d4||_0xb2cd28,_0x527883={},_0x25ec78=0x0,_0x4951dc=!0x1,_0x10f27f,_0x57691d=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x56b912[_0x184fad(0x1ce)]){if(_0x3e0231){if(_0xbab98b=_0x288b3a[_0x184fad(0x207)],_0xbab98b>_0x56b912[_0x184fad(0x16d)]){for(_0x58bdca=0x0,_0x4b156e=_0x56b912[_0x184fad(0x16d)],_0x4e9220=_0x58bdca;_0x4e9220<_0x4b156e;_0x4e9220++)_0x39a411[_0x184fad(0x213)](_0x437a56['_addProperty'](_0x2c5bc6,_0x288b3a,_0x5077a1,_0x4e9220,_0x56b912));_0xf02eda[_0x184fad(0x1ba)]=!0x0;}else{for(_0x58bdca=0x0,_0x4b156e=_0xbab98b,_0x4e9220=_0x58bdca;_0x4e9220<_0x4b156e;_0x4e9220++)_0x39a411[_0x184fad(0x213)](_0x437a56[_0x184fad(0x1fe)](_0x2c5bc6,_0x288b3a,_0x5077a1,_0x4e9220,_0x56b912));}_0x56b912[_0x184fad(0x17d)]+=_0x39a411[_0x184fad(0x207)];}if(!(_0x5077a1===_0x184fad(0x204)||_0x5077a1===_0x184fad(0x22f))&&!_0x5803d4&&_0x5077a1!=='String'&&_0x5077a1!==_0x184fad(0x1ca)&&_0x5077a1!=='bigint'){var _0x15cae6=_0x5496f8[_0x184fad(0x164)]||_0x56b912['props'];if(this[_0x184fad(0x1d8)](_0x288b3a)?(_0x4e9220=0x0,_0x288b3a['forEach'](function(_0x328ab5){var _0x4d2b35=_0x184fad;if(_0x25ec78++,_0x56b912['autoExpandPropertyCount']++,_0x25ec78>_0x15cae6){_0x4951dc=!0x0;return;}if(!_0x56b912[_0x4d2b35(0x1bd)]&&_0x56b912[_0x4d2b35(0x184)]&&_0x56b912[_0x4d2b35(0x17d)]>_0x56b912[_0x4d2b35(0x1d6)]){_0x4951dc=!0x0;return;}_0x39a411[_0x4d2b35(0x213)](_0x437a56['_addProperty'](_0x2c5bc6,_0x288b3a,_0x4d2b35(0x219),_0x4e9220++,_0x56b912,function(_0x254597){return function(){return _0x254597;};}(_0x328ab5)));})):this[_0x184fad(0x1bc)](_0x288b3a)&&_0x288b3a[_0x184fad(0x1b5)](function(_0x192591,_0x37b0da){var _0x5affed=_0x184fad;if(_0x25ec78++,_0x56b912[_0x5affed(0x17d)]++,_0x25ec78>_0x15cae6){_0x4951dc=!0x0;return;}if(!_0x56b912[_0x5affed(0x1bd)]&&_0x56b912[_0x5affed(0x184)]&&_0x56b912['autoExpandPropertyCount']>_0x56b912['autoExpandLimit']){_0x4951dc=!0x0;return;}var _0x11390b=_0x37b0da[_0x5affed(0x1a3)]();_0x11390b[_0x5affed(0x207)]>0x64&&(_0x11390b=_0x11390b[_0x5affed(0x1cd)](0x0,0x64)+_0x5affed(0x174)),_0x39a411[_0x5affed(0x213)](_0x437a56[_0x5affed(0x1fe)](_0x2c5bc6,_0x288b3a,_0x5affed(0x1c2),_0x11390b,_0x56b912,function(_0x3881be){return function(){return _0x3881be;};}(_0x192591)));}),!_0x3c6daf){try{for(_0xbbe2c3 in _0x288b3a)if(!(_0x3e0231&&_0x57691d[_0x184fad(0x241)](_0xbbe2c3))&&!this[_0x184fad(0x1a8)](_0x288b3a,_0xbbe2c3,_0x56b912)){if(_0x25ec78++,_0x56b912[_0x184fad(0x17d)]++,_0x25ec78>_0x15cae6){_0x4951dc=!0x0;break;}if(!_0x56b912[_0x184fad(0x1bd)]&&_0x56b912[_0x184fad(0x184)]&&_0x56b912['autoExpandPropertyCount']>_0x56b912[_0x184fad(0x1d6)]){_0x4951dc=!0x0;break;}_0x39a411[_0x184fad(0x213)](_0x437a56[_0x184fad(0x19d)](_0x2c5bc6,_0x527883,_0x288b3a,_0x5077a1,_0xbbe2c3,_0x56b912));}}catch{}if(_0x527883[_0x184fad(0x233)]=!0x0,_0xa31b62&&(_0x527883[_0x184fad(0x1ed)]=!0x0),!_0x4951dc){var _0x4b7102=[]['concat'](this[_0x184fad(0x17c)](_0x288b3a))[_0x184fad(0x222)](this[_0x184fad(0x173)](_0x288b3a));for(_0x4e9220=0x0,_0xbab98b=_0x4b7102[_0x184fad(0x207)];_0x4e9220<_0xbab98b;_0x4e9220++)if(_0xbbe2c3=_0x4b7102[_0x4e9220],!(_0x3e0231&&_0x57691d[_0x184fad(0x241)](_0xbbe2c3[_0x184fad(0x1a3)]()))&&!this[_0x184fad(0x1a8)](_0x288b3a,_0xbbe2c3,_0x56b912)&&!_0x527883[_0x184fad(0x211)+_0xbbe2c3[_0x184fad(0x1a3)]()]){if(_0x25ec78++,_0x56b912[_0x184fad(0x17d)]++,_0x25ec78>_0x15cae6){_0x4951dc=!0x0;break;}if(!_0x56b912[_0x184fad(0x1bd)]&&_0x56b912[_0x184fad(0x184)]&&_0x56b912[_0x184fad(0x17d)]>_0x56b912[_0x184fad(0x1d6)]){_0x4951dc=!0x0;break;}_0x39a411[_0x184fad(0x213)](_0x437a56[_0x184fad(0x19d)](_0x2c5bc6,_0x527883,_0x288b3a,_0x5077a1,_0xbbe2c3,_0x56b912));}}}}}if(_0xf02eda['type']=_0x5077a1,_0x492f17?(_0xf02eda[_0x184fad(0x21e)]=_0x288b3a[_0x184fad(0x17e)](),this[_0x184fad(0x209)](_0x5077a1,_0xf02eda,_0x56b912,_0x5496f8)):_0x5077a1===_0x184fad(0x1d5)?_0xf02eda[_0x184fad(0x21e)]=this[_0x184fad(0x1a6)][_0x184fad(0x19a)](_0x288b3a):_0x5077a1==='bigint'?_0xf02eda['value']=_0x288b3a['toString']():_0x5077a1===_0x184fad(0x1db)?_0xf02eda[_0x184fad(0x21e)]=this[_0x184fad(0x18d)][_0x184fad(0x19a)](_0x288b3a):_0x5077a1==='symbol'&&this['_Symbol']?_0xf02eda['value']=this['_Symbol'][_0x184fad(0x1da)][_0x184fad(0x1a3)][_0x184fad(0x19a)](_0x288b3a):!_0x56b912[_0x184fad(0x1ce)]&&!(_0x5077a1===_0x184fad(0x204)||_0x5077a1===_0x184fad(0x22f))&&(delete _0xf02eda[_0x184fad(0x21e)],_0xf02eda[_0x184fad(0x179)]=!0x0),_0x4951dc&&(_0xf02eda[_0x184fad(0x21c)]=!0x0),_0x10f27f=_0x56b912[_0x184fad(0x1a9)][_0x184fad(0x239)],_0x56b912['node'][_0x184fad(0x239)]=_0xf02eda,this[_0x184fad(0x168)](_0xf02eda,_0x56b912),_0x39a411[_0x184fad(0x207)]){for(_0x4e9220=0x0,_0xbab98b=_0x39a411[_0x184fad(0x207)];_0x4e9220<_0xbab98b;_0x4e9220++)_0x39a411[_0x4e9220](_0x4e9220);}_0x2c5bc6[_0x184fad(0x207)]&&(_0xf02eda['props']=_0x2c5bc6);}catch(_0x2d88e4){_0x2305db(_0x2d88e4,_0xf02eda,_0x56b912);}return this[_0x184fad(0x20e)](_0x288b3a,_0xf02eda),this[_0x184fad(0x1f8)](_0xf02eda,_0x56b912),_0x56b912[_0x184fad(0x1a9)][_0x184fad(0x239)]=_0x10f27f,_0x56b912[_0x184fad(0x246)]--,_0x56b912[_0x184fad(0x184)]=_0x8f7264,_0x56b912[_0x184fad(0x184)]&&_0x56b912['autoExpandPreviousObjects']['pop'](),_0xf02eda;}[_0x5af063(0x173)](_0x142573){var _0x2dc2fd=_0x5af063;return Object[_0x2dc2fd(0x1ab)]?Object[_0x2dc2fd(0x1ab)](_0x142573):[];}[_0x5af063(0x1d8)](_0x54ee1b){var _0x8d9f13=_0x5af063;return!!(_0x54ee1b&&_0x1f6727[_0x8d9f13(0x219)]&&this[_0x8d9f13(0x1b6)](_0x54ee1b)===_0x8d9f13(0x1fb)&&_0x54ee1b[_0x8d9f13(0x1b5)]);}['_blacklistedProperty'](_0x4513b0,_0x4d6aa5,_0x319429){var _0x818b6d=_0x5af063;return _0x319429[_0x818b6d(0x1a7)]?typeof _0x4513b0[_0x4d6aa5]=='function':!0x1;}[_0x5af063(0x19c)](_0xc03506){var _0x2839b2=_0x5af063,_0x724e1c='';return _0x724e1c=typeof _0xc03506,_0x724e1c===_0x2839b2(0x195)?this[_0x2839b2(0x1b6)](_0xc03506)==='[object\\x20Array]'?_0x724e1c=_0x2839b2(0x1d0):this[_0x2839b2(0x1b6)](_0xc03506)==='[object\\x20Date]'?_0x724e1c=_0x2839b2(0x1d5):this['_objectToString'](_0xc03506)===_0x2839b2(0x20b)?_0x724e1c='bigint':_0xc03506===null?_0x724e1c=_0x2839b2(0x204):_0xc03506[_0x2839b2(0x167)]&&(_0x724e1c=_0xc03506[_0x2839b2(0x167)][_0x2839b2(0x172)]||_0x724e1c):_0x724e1c===_0x2839b2(0x22f)&&this[_0x2839b2(0x18b)]&&_0xc03506 instanceof this[_0x2839b2(0x18b)]&&(_0x724e1c=_0x2839b2(0x247)),_0x724e1c;}[_0x5af063(0x1b6)](_0x1d68c7){var _0x591b0b=_0x5af063;return Object['prototype'][_0x591b0b(0x1a3)][_0x591b0b(0x19a)](_0x1d68c7);}[_0x5af063(0x235)](_0x1ea4aa){var _0x10fdf2=_0x5af063;return _0x1ea4aa===_0x10fdf2(0x1d2)||_0x1ea4aa===_0x10fdf2(0x166)||_0x1ea4aa==='number';}['_isPrimitiveWrapperType'](_0x5cc1bb){var _0x4927ee=_0x5af063;return _0x5cc1bb===_0x4927ee(0x1fc)||_0x5cc1bb==='String'||_0x5cc1bb===_0x4927ee(0x216);}[_0x5af063(0x1fe)](_0x7e31e0,_0x3c4f94,_0x5007a9,_0x459087,_0x4d27be,_0x29729a){var _0x520995=this;return function(_0x231492){var _0x116a3c=_0x4662,_0xa5d8b3=_0x4d27be[_0x116a3c(0x1a9)][_0x116a3c(0x239)],_0x2fb003=_0x4d27be['node'][_0x116a3c(0x215)],_0xa480cd=_0x4d27be[_0x116a3c(0x1a9)][_0x116a3c(0x244)];_0x4d27be[_0x116a3c(0x1a9)]['parent']=_0xa5d8b3,_0x4d27be['node'][_0x116a3c(0x215)]=typeof _0x459087==_0x116a3c(0x1ad)?_0x459087:_0x231492,_0x7e31e0[_0x116a3c(0x213)](_0x520995[_0x116a3c(0x249)](_0x3c4f94,_0x5007a9,_0x459087,_0x4d27be,_0x29729a)),_0x4d27be[_0x116a3c(0x1a9)][_0x116a3c(0x244)]=_0xa480cd,_0x4d27be[_0x116a3c(0x1a9)]['index']=_0x2fb003;};}[_0x5af063(0x19d)](_0x422353,_0x13ec9c,_0x47fc19,_0x324bd1,_0x14dd54,_0x2f1d38,_0x5d7bbe){var _0x36e143=_0x5af063,_0x299d8a=this;return _0x13ec9c[_0x36e143(0x211)+_0x14dd54[_0x36e143(0x1a3)]()]=!0x0,function(_0x42a8d7){var _0x4bdb94=_0x36e143,_0x337560=_0x2f1d38['node'][_0x4bdb94(0x239)],_0x5572a6=_0x2f1d38[_0x4bdb94(0x1a9)][_0x4bdb94(0x215)],_0x53a13e=_0x2f1d38[_0x4bdb94(0x1a9)][_0x4bdb94(0x244)];_0x2f1d38[_0x4bdb94(0x1a9)]['parent']=_0x337560,_0x2f1d38['node'][_0x4bdb94(0x215)]=_0x42a8d7,_0x422353[_0x4bdb94(0x213)](_0x299d8a[_0x4bdb94(0x249)](_0x47fc19,_0x324bd1,_0x14dd54,_0x2f1d38,_0x5d7bbe)),_0x2f1d38['node'][_0x4bdb94(0x244)]=_0x53a13e,_0x2f1d38[_0x4bdb94(0x1a9)]['index']=_0x5572a6;};}[_0x5af063(0x249)](_0x4c77d3,_0x51bcb8,_0x1c18a2,_0xed89a3,_0x1923e8){var _0x10ecbd=_0x5af063,_0x26d093=this;_0x1923e8||(_0x1923e8=function(_0x3da88c,_0xdf9ef9){return _0x3da88c[_0xdf9ef9];});var _0x148fad=_0x1c18a2[_0x10ecbd(0x1a3)](),_0x274b51=_0xed89a3[_0x10ecbd(0x176)]||{},_0xecbb1a=_0xed89a3[_0x10ecbd(0x1ce)],_0x53beba=_0xed89a3[_0x10ecbd(0x1bd)];try{var _0x1ed549=this[_0x10ecbd(0x1bc)](_0x4c77d3),_0x145053=_0x148fad;_0x1ed549&&_0x145053[0x0]==='\\x27'&&(_0x145053=_0x145053[_0x10ecbd(0x1b9)](0x1,_0x145053[_0x10ecbd(0x207)]-0x2));var _0x2254f6=_0xed89a3[_0x10ecbd(0x176)]=_0x274b51[_0x10ecbd(0x211)+_0x145053];_0x2254f6&&(_0xed89a3[_0x10ecbd(0x1ce)]=_0xed89a3[_0x10ecbd(0x1ce)]+0x1),_0xed89a3[_0x10ecbd(0x1bd)]=!!_0x2254f6;var _0x1f4614=typeof _0x1c18a2==_0x10ecbd(0x228),_0x9a7a9d={'name':_0x1f4614||_0x1ed549?_0x148fad:this['_propertyName'](_0x148fad)};if(_0x1f4614&&(_0x9a7a9d['symbol']=!0x0),!(_0x51bcb8==='array'||_0x51bcb8===_0x10ecbd(0x1e8))){var _0x5bb0c4=this['_getOwnPropertyDescriptor'](_0x4c77d3,_0x1c18a2);if(_0x5bb0c4&&(_0x5bb0c4[_0x10ecbd(0x212)]&&(_0x9a7a9d[_0x10ecbd(0x1c4)]=!0x0),_0x5bb0c4['get']&&!_0x2254f6&&!_0xed89a3[_0x10ecbd(0x236)]))return _0x9a7a9d[_0x10ecbd(0x16a)]=!0x0,this[_0x10ecbd(0x20d)](_0x9a7a9d,_0xed89a3),_0x9a7a9d;}var _0x4d686e;try{_0x4d686e=_0x1923e8(_0x4c77d3,_0x1c18a2);}catch(_0x1790bc){return _0x9a7a9d={'name':_0x148fad,'type':'unknown','error':_0x1790bc[_0x10ecbd(0x182)]},this[_0x10ecbd(0x20d)](_0x9a7a9d,_0xed89a3),_0x9a7a9d;}var _0x584511=this[_0x10ecbd(0x19c)](_0x4d686e),_0x4d4015=this[_0x10ecbd(0x235)](_0x584511);if(_0x9a7a9d['type']=_0x584511,_0x4d4015)this[_0x10ecbd(0x20d)](_0x9a7a9d,_0xed89a3,_0x4d686e,function(){var _0x41822b=_0x10ecbd;_0x9a7a9d[_0x41822b(0x21e)]=_0x4d686e['valueOf'](),!_0x2254f6&&_0x26d093[_0x41822b(0x209)](_0x584511,_0x9a7a9d,_0xed89a3,{});});else{var _0x23ba5f=_0xed89a3[_0x10ecbd(0x184)]&&_0xed89a3[_0x10ecbd(0x246)]<_0xed89a3['autoExpandMaxDepth']&&_0xed89a3['autoExpandPreviousObjects'][_0x10ecbd(0x198)](_0x4d686e)<0x0&&_0x584511!=='function'&&_0xed89a3[_0x10ecbd(0x17d)]<_0xed89a3[_0x10ecbd(0x1d6)];_0x23ba5f||_0xed89a3['level']<_0xecbb1a||_0x2254f6?(this[_0x10ecbd(0x231)](_0x9a7a9d,_0x4d686e,_0xed89a3,_0x2254f6||{}),this[_0x10ecbd(0x20e)](_0x4d686e,_0x9a7a9d)):this[_0x10ecbd(0x20d)](_0x9a7a9d,_0xed89a3,_0x4d686e,function(){var _0x5c5c95=_0x10ecbd;_0x584511===_0x5c5c95(0x204)||_0x584511===_0x5c5c95(0x22f)||(delete _0x9a7a9d['value'],_0x9a7a9d['capped']=!0x0);});}return _0x9a7a9d;}finally{_0xed89a3[_0x10ecbd(0x176)]=_0x274b51,_0xed89a3[_0x10ecbd(0x1ce)]=_0xecbb1a,_0xed89a3[_0x10ecbd(0x1bd)]=_0x53beba;}}[_0x5af063(0x209)](_0x4453a8,_0x3e7b4a,_0xb630fa,_0x3f9558){var _0x5a2672=_0x5af063,_0x214d4a=_0x3f9558['strLength']||_0xb630fa[_0x5a2672(0x20a)];if((_0x4453a8===_0x5a2672(0x166)||_0x4453a8===_0x5a2672(0x171))&&_0x3e7b4a[_0x5a2672(0x21e)]){let _0x1fea08=_0x3e7b4a[_0x5a2672(0x21e)][_0x5a2672(0x207)];_0xb630fa[_0x5a2672(0x1f1)]+=_0x1fea08,_0xb630fa[_0x5a2672(0x1f1)]>_0xb630fa[_0x5a2672(0x200)]?(_0x3e7b4a[_0x5a2672(0x179)]='',delete _0x3e7b4a[_0x5a2672(0x21e)]):_0x1fea08>_0x214d4a&&(_0x3e7b4a[_0x5a2672(0x179)]=_0x3e7b4a[_0x5a2672(0x21e)]['substr'](0x0,_0x214d4a),delete _0x3e7b4a[_0x5a2672(0x21e)]);}}[_0x5af063(0x1bc)](_0x1f9995){var _0x5710fc=_0x5af063;return!!(_0x1f9995&&_0x1f6727['Map']&&this[_0x5710fc(0x1b6)](_0x1f9995)===_0x5710fc(0x1d4)&&_0x1f9995[_0x5710fc(0x1b5)]);}[_0x5af063(0x1bf)](_0x3c69c3){var _0x16c749=_0x5af063;if(_0x3c69c3['match'](/^\\d+$/))return _0x3c69c3;var _0x4b2469;try{_0x4b2469=JSON[_0x16c749(0x18a)](''+_0x3c69c3);}catch{_0x4b2469='\\x22'+this[_0x16c749(0x1b6)](_0x3c69c3)+'\\x22';}return _0x4b2469[_0x16c749(0x1be)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x4b2469=_0x4b2469['substr'](0x1,_0x4b2469[_0x16c749(0x207)]-0x2):_0x4b2469=_0x4b2469[_0x16c749(0x243)](/'/g,'\\x5c\\x27')[_0x16c749(0x243)](/\\\\\"/g,'\\x22')[_0x16c749(0x243)](/(^\"|\"$)/g,'\\x27'),_0x4b2469;}[_0x5af063(0x20d)](_0x136533,_0x13377b,_0x3feb8a,_0x449c52){var _0x1a9440=_0x5af063;this[_0x1a9440(0x168)](_0x136533,_0x13377b),_0x449c52&&_0x449c52(),this['_additionalMetadata'](_0x3feb8a,_0x136533),this['_treeNodePropertiesAfterFullValue'](_0x136533,_0x13377b);}[_0x5af063(0x168)](_0x1f3ba1,_0x5cf79a){var _0x33121d=_0x5af063;this['_setNodeId'](_0x1f3ba1,_0x5cf79a),this['_setNodeQueryPath'](_0x1f3ba1,_0x5cf79a),this['_setNodeExpressionPath'](_0x1f3ba1,_0x5cf79a),this[_0x33121d(0x1b2)](_0x1f3ba1,_0x5cf79a);}[_0x5af063(0x1d3)](_0x7b442f,_0x2734dd){}[_0x5af063(0x1af)](_0x212be5,_0x15c572){}[_0x5af063(0x1c9)](_0xc805b2,_0x5d04af){}[_0x5af063(0x1e5)](_0x23e2bd){return _0x23e2bd===this['_undefined'];}[_0x5af063(0x1f8)](_0x3a98d7,_0x2ce624){var _0x4bfd69=_0x5af063;this[_0x4bfd69(0x1c9)](_0x3a98d7,_0x2ce624),this[_0x4bfd69(0x1c1)](_0x3a98d7),_0x2ce624['sortProps']&&this[_0x4bfd69(0x1e6)](_0x3a98d7),this['_addFunctionsNode'](_0x3a98d7,_0x2ce624),this[_0x4bfd69(0x1eb)](_0x3a98d7,_0x2ce624),this[_0x4bfd69(0x20c)](_0x3a98d7);}['_additionalMetadata'](_0x57a3d6,_0x4ef3c3){var _0x2078c2=_0x5af063;let _0x565fc8;try{_0x1f6727[_0x2078c2(0x1bb)]&&(_0x565fc8=_0x1f6727[_0x2078c2(0x1bb)][_0x2078c2(0x199)],_0x1f6727['console']['error']=function(){}),_0x57a3d6&&typeof _0x57a3d6[_0x2078c2(0x207)]==_0x2078c2(0x1ad)&&(_0x4ef3c3['length']=_0x57a3d6[_0x2078c2(0x207)]);}catch{}finally{_0x565fc8&&(_0x1f6727[_0x2078c2(0x1bb)][_0x2078c2(0x199)]=_0x565fc8);}if(_0x4ef3c3[_0x2078c2(0x16e)]==='number'||_0x4ef3c3['type']===_0x2078c2(0x216)){if(isNaN(_0x4ef3c3[_0x2078c2(0x21e)]))_0x4ef3c3[_0x2078c2(0x23e)]=!0x0,delete _0x4ef3c3[_0x2078c2(0x21e)];else switch(_0x4ef3c3['value']){case Number[_0x2078c2(0x15e)]:_0x4ef3c3['positiveInfinity']=!0x0,delete _0x4ef3c3['value'];break;case Number[_0x2078c2(0x1e9)]:_0x4ef3c3[_0x2078c2(0x194)]=!0x0,delete _0x4ef3c3[_0x2078c2(0x21e)];break;case 0x0:this[_0x2078c2(0x1f6)](_0x4ef3c3['value'])&&(_0x4ef3c3['negativeZero']=!0x0);break;}}else _0x4ef3c3[_0x2078c2(0x16e)]===_0x2078c2(0x240)&&typeof _0x57a3d6['name']==_0x2078c2(0x166)&&_0x57a3d6[_0x2078c2(0x172)]&&_0x4ef3c3[_0x2078c2(0x172)]&&_0x57a3d6[_0x2078c2(0x172)]!==_0x4ef3c3[_0x2078c2(0x172)]&&(_0x4ef3c3[_0x2078c2(0x1dc)]=_0x57a3d6[_0x2078c2(0x172)]);}[_0x5af063(0x1f6)](_0x4dc4ff){var _0x6bca7e=_0x5af063;return 0x1/_0x4dc4ff===Number[_0x6bca7e(0x1e9)];}['_sortProps'](_0x2680c5){var _0x966ef2=_0x5af063;!_0x2680c5[_0x966ef2(0x164)]||!_0x2680c5[_0x966ef2(0x164)][_0x966ef2(0x207)]||_0x2680c5[_0x966ef2(0x16e)]===_0x966ef2(0x1d0)||_0x2680c5[_0x966ef2(0x16e)]===_0x966ef2(0x1c2)||_0x2680c5['type']===_0x966ef2(0x219)||_0x2680c5[_0x966ef2(0x164)][_0x966ef2(0x218)](function(_0x3011df,_0x9f912){var _0x24dc37=_0x966ef2,_0x156c54=_0x3011df[_0x24dc37(0x172)]['toLowerCase'](),_0x40c8fa=_0x9f912[_0x24dc37(0x172)][_0x24dc37(0x186)]();return _0x156c54<_0x40c8fa?-0x1:_0x156c54>_0x40c8fa?0x1:0x0;});}['_addFunctionsNode'](_0x65417c,_0x262232){var _0x41b6f8=_0x5af063;if(!(_0x262232['noFunctions']||!_0x65417c['props']||!_0x65417c[_0x41b6f8(0x164)][_0x41b6f8(0x207)])){for(var _0x2a257b=[],_0x3d7a05=[],_0x293f53=0x0,_0xca3b18=_0x65417c[_0x41b6f8(0x164)]['length'];_0x293f53<_0xca3b18;_0x293f53++){var _0x12b9c4=_0x65417c[_0x41b6f8(0x164)][_0x293f53];_0x12b9c4[_0x41b6f8(0x16e)]==='function'?_0x2a257b[_0x41b6f8(0x213)](_0x12b9c4):_0x3d7a05[_0x41b6f8(0x213)](_0x12b9c4);}if(!(!_0x3d7a05[_0x41b6f8(0x207)]||_0x2a257b[_0x41b6f8(0x207)]<=0x1)){_0x65417c[_0x41b6f8(0x164)]=_0x3d7a05;var _0x289400={'functionsNode':!0x0,'props':_0x2a257b};this['_setNodeId'](_0x289400,_0x262232),this['_setNodeLabel'](_0x289400,_0x262232),this[_0x41b6f8(0x1c1)](_0x289400),this['_setNodePermissions'](_0x289400,_0x262232),_0x289400['id']+='\\x20f',_0x65417c['props'][_0x41b6f8(0x221)](_0x289400);}}}[_0x5af063(0x1eb)](_0x4d715f,_0x220d3c){}[_0x5af063(0x1c1)](_0x16f99c){}[_0x5af063(0x196)](_0xc38c21){var _0x7e78b7=_0x5af063;return Array[_0x7e78b7(0x16b)](_0xc38c21)||typeof _0xc38c21==_0x7e78b7(0x195)&&this[_0x7e78b7(0x1b6)](_0xc38c21)==='[object\\x20Array]';}[_0x5af063(0x1b2)](_0x4100e0,_0x8a5b3f){}[_0x5af063(0x20c)](_0x16da5c){var _0x2698a6=_0x5af063;delete _0x16da5c[_0x2698a6(0x19f)],delete _0x16da5c[_0x2698a6(0x1a2)],delete _0x16da5c['_hasMapOnItsPath'];}[_0x5af063(0x1b3)](_0x168392,_0x4cdfa5){}}let _0x58b25a=new _0x2ed115(),_0x1e2069={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x482273={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x1b64e7(_0x358f3e,_0x2b1c5e,_0x2ef411,_0x2c6c7d,_0x2355d5,_0xe8098b){var _0x1ee9e4=_0x5af063;let _0x447a87,_0x2ec6fe;try{_0x2ec6fe=_0x228df4(),_0x447a87=_0x13677e[_0x2b1c5e],!_0x447a87||_0x2ec6fe-_0x447a87['ts']>0x1f4&&_0x447a87[_0x1ee9e4(0x1c6)]&&_0x447a87[_0x1ee9e4(0x224)]/_0x447a87[_0x1ee9e4(0x1c6)]<0x64?(_0x13677e[_0x2b1c5e]=_0x447a87={'count':0x0,'time':0x0,'ts':_0x2ec6fe},_0x13677e[_0x1ee9e4(0x16f)]={}):_0x2ec6fe-_0x13677e[_0x1ee9e4(0x16f)]['ts']>0x32&&_0x13677e[_0x1ee9e4(0x16f)][_0x1ee9e4(0x1c6)]&&_0x13677e[_0x1ee9e4(0x16f)][_0x1ee9e4(0x224)]/_0x13677e[_0x1ee9e4(0x16f)]['count']<0x64&&(_0x13677e[_0x1ee9e4(0x16f)]={});let _0x4abbc1=[],_0x3c22ff=_0x447a87[_0x1ee9e4(0x1f4)]||_0x13677e[_0x1ee9e4(0x16f)][_0x1ee9e4(0x1f4)]?_0x482273:_0x1e2069,_0x2e1a0a=_0x31586c=>{var _0x133c96=_0x1ee9e4;let _0x37eb23={};return _0x37eb23[_0x133c96(0x164)]=_0x31586c[_0x133c96(0x164)],_0x37eb23[_0x133c96(0x16d)]=_0x31586c[_0x133c96(0x16d)],_0x37eb23['strLength']=_0x31586c[_0x133c96(0x20a)],_0x37eb23[_0x133c96(0x200)]=_0x31586c[_0x133c96(0x200)],_0x37eb23[_0x133c96(0x1d6)]=_0x31586c[_0x133c96(0x1d6)],_0x37eb23['autoExpandMaxDepth']=_0x31586c['autoExpandMaxDepth'],_0x37eb23['sortProps']=!0x1,_0x37eb23['noFunctions']=!_0x6a2aa7,_0x37eb23[_0x133c96(0x1ce)]=0x1,_0x37eb23[_0x133c96(0x246)]=0x0,_0x37eb23[_0x133c96(0x1f9)]=_0x133c96(0x18e),_0x37eb23[_0x133c96(0x1cf)]='root_exp',_0x37eb23['autoExpand']=!0x0,_0x37eb23[_0x133c96(0x19e)]=[],_0x37eb23[_0x133c96(0x17d)]=0x0,_0x37eb23[_0x133c96(0x236)]=!0x0,_0x37eb23[_0x133c96(0x1f1)]=0x0,_0x37eb23[_0x133c96(0x1a9)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x37eb23;};for(var _0x4e099a=0x0;_0x4e099a<_0x2355d5[_0x1ee9e4(0x207)];_0x4e099a++)_0x4abbc1[_0x1ee9e4(0x213)](_0x58b25a['serialize']({'timeNode':_0x358f3e===_0x1ee9e4(0x224)||void 0x0},_0x2355d5[_0x4e099a],_0x2e1a0a(_0x3c22ff),{}));if(_0x358f3e==='trace'){let _0x54ef3f=Error[_0x1ee9e4(0x1ff)];try{Error[_0x1ee9e4(0x1ff)]=0x1/0x0,_0x4abbc1[_0x1ee9e4(0x213)](_0x58b25a[_0x1ee9e4(0x231)]({'stackNode':!0x0},new Error()[_0x1ee9e4(0x220)],_0x2e1a0a(_0x3c22ff),{'strLength':0x1/0x0}));}finally{Error[_0x1ee9e4(0x1ff)]=_0x54ef3f;}}return{'method':_0x1ee9e4(0x21d),'version':_0x3ba611,'args':[{'ts':_0x2ef411,'session':_0x2c6c7d,'args':_0x4abbc1,'id':_0x2b1c5e,'context':_0xe8098b}]};}catch(_0x3ae9ad){return{'method':'log','version':_0x3ba611,'args':[{'ts':_0x2ef411,'session':_0x2c6c7d,'args':[{'type':_0x1ee9e4(0x193),'error':_0x3ae9ad&&_0x3ae9ad[_0x1ee9e4(0x182)]}],'id':_0x2b1c5e,'context':_0xe8098b}]};}finally{try{if(_0x447a87&&_0x2ec6fe){let _0x18c234=_0x228df4();_0x447a87[_0x1ee9e4(0x1c6)]++,_0x447a87[_0x1ee9e4(0x224)]+=_0x9b0d6(_0x2ec6fe,_0x18c234),_0x447a87['ts']=_0x18c234,_0x13677e[_0x1ee9e4(0x16f)]['count']++,_0x13677e[_0x1ee9e4(0x16f)][_0x1ee9e4(0x224)]+=_0x9b0d6(_0x2ec6fe,_0x18c234),_0x13677e[_0x1ee9e4(0x16f)]['ts']=_0x18c234,(_0x447a87[_0x1ee9e4(0x1c6)]>0x32||_0x447a87[_0x1ee9e4(0x224)]>0x64)&&(_0x447a87[_0x1ee9e4(0x1f4)]=!0x0),(_0x13677e[_0x1ee9e4(0x16f)][_0x1ee9e4(0x1c6)]>0x3e8||_0x13677e[_0x1ee9e4(0x16f)][_0x1ee9e4(0x224)]>0x12c)&&(_0x13677e[_0x1ee9e4(0x16f)][_0x1ee9e4(0x1f4)]=!0x0);}}catch{}}}return _0x1b64e7;}((_0x31bb6e,_0x2d9556,_0x4dead3,_0x3b0283,_0x4c9494,_0x3f24eb,_0x5cd1de,_0x1bc888,_0x2d94e2,_0x14b22a)=>{var _0x1e9d92=_0x549d36;if(_0x31bb6e[_0x1e9d92(0x1ee)])return _0x31bb6e[_0x1e9d92(0x1ee)];if(!J(_0x31bb6e,_0x1bc888,_0x4c9494))return _0x31bb6e['_console_ninja']={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x31bb6e[_0x1e9d92(0x1ee)];let _0x26bb29=W(_0x31bb6e),_0xbbfdd0=_0x26bb29['elapsed'],_0x49cd0a=_0x26bb29[_0x1e9d92(0x223)],_0x31ad1c=_0x26bb29[_0x1e9d92(0x23b)],_0x2d25ad={'hits':{},'ts':{}},_0x336418=Y(_0x31bb6e,_0x2d94e2,_0x2d25ad,_0x3f24eb),_0x3c3358=_0x31ee18=>{_0x2d25ad['ts'][_0x31ee18]=_0x49cd0a();},_0x54bb98=(_0x2645ae,_0x1421a8)=>{let _0x20fd96=_0x2d25ad['ts'][_0x1421a8];if(delete _0x2d25ad['ts'][_0x1421a8],_0x20fd96){let _0x3e717e=_0xbbfdd0(_0x20fd96,_0x49cd0a());_0xbfa3dc(_0x336418('time',_0x2645ae,_0x31ad1c(),_0xf14f39,[_0x3e717e],_0x1421a8));}},_0x37441e=_0x4e131a=>_0x376385=>{var _0x150efb=_0x1e9d92;try{_0x3c3358(_0x376385),_0x4e131a(_0x376385);}finally{_0x31bb6e[_0x150efb(0x1bb)]['time']=_0x4e131a;}},_0x235981=_0x4b6c9d=>_0x1a1c95=>{var _0x411dfc=_0x1e9d92;try{let [_0x5a4756,_0x10ada]=_0x1a1c95[_0x411dfc(0x1df)](_0x411dfc(0x237));_0x54bb98(_0x10ada,_0x5a4756),_0x4b6c9d(_0x5a4756);}finally{_0x31bb6e[_0x411dfc(0x1bb)][_0x411dfc(0x1d7)]=_0x4b6c9d;}};_0x31bb6e[_0x1e9d92(0x1ee)]={'consoleLog':(_0x28823e,_0x561e08)=>{var _0x1fc52b=_0x1e9d92;_0x31bb6e[_0x1fc52b(0x1bb)]['log']['name']!=='disabledLog'&&_0xbfa3dc(_0x336418(_0x1fc52b(0x21d),_0x28823e,_0x31ad1c(),_0xf14f39,_0x561e08));},'consoleTrace':(_0x57a04d,_0x1fa011)=>{var _0x2a636c=_0x1e9d92;_0x31bb6e['console'][_0x2a636c(0x21d)][_0x2a636c(0x172)]!==_0x2a636c(0x22c)&&_0xbfa3dc(_0x336418(_0x2a636c(0x180),_0x57a04d,_0x31ad1c(),_0xf14f39,_0x1fa011));},'consoleTime':()=>{var _0x512d47=_0x1e9d92;_0x31bb6e[_0x512d47(0x1bb)][_0x512d47(0x224)]=_0x37441e(_0x31bb6e[_0x512d47(0x1bb)]['time']);},'consoleTimeEnd':()=>{var _0x49c317=_0x1e9d92;_0x31bb6e['console'][_0x49c317(0x1d7)]=_0x235981(_0x31bb6e[_0x49c317(0x1bb)][_0x49c317(0x1d7)]);},'autoLog':(_0x5adb04,_0x315ecc)=>{var _0x1fe94c=_0x1e9d92;_0xbfa3dc(_0x336418(_0x1fe94c(0x21d),_0x315ecc,_0x31ad1c(),_0xf14f39,[_0x5adb04]));},'autoLogMany':(_0x4bd873,_0x5d566c)=>{var _0x43091f=_0x1e9d92;_0xbfa3dc(_0x336418(_0x43091f(0x21d),_0x4bd873,_0x31ad1c(),_0xf14f39,_0x5d566c));},'autoTrace':(_0x3ebc28,_0x429234)=>{_0xbfa3dc(_0x336418('trace',_0x429234,_0x31ad1c(),_0xf14f39,[_0x3ebc28]));},'autoTraceMany':(_0x16e9c8,_0x104612)=>{var _0x2adf6d=_0x1e9d92;_0xbfa3dc(_0x336418(_0x2adf6d(0x180),_0x16e9c8,_0x31ad1c(),_0xf14f39,_0x104612));},'autoTime':(_0x5c2782,_0x6a1db7,_0x19234f)=>{_0x3c3358(_0x19234f);},'autoTimeEnd':(_0x742404,_0x2f4835,_0x2a1937)=>{_0x54bb98(_0x2f4835,_0x2a1937);},'coverage':_0x2b26bf=>{var _0x464c51=_0x1e9d92;_0xbfa3dc({'method':_0x464c51(0x23f),'version':_0x3f24eb,'args':[{'id':_0x2b26bf}]});}};let _0xbfa3dc=b(_0x31bb6e,_0x2d9556,_0x4dead3,_0x3b0283,_0x4c9494,_0x14b22a),_0xf14f39=_0x31bb6e['_console_ninja_session'];return _0x31bb6e[_0x1e9d92(0x1ee)];})(globalThis,_0x549d36(0x225),_0x549d36(0x1f7),\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.288\\\\node_modules\",_0x549d36(0x1e4),'1.0.0','1708774869019',_0x549d36(0x1c5),_0x549d36(0x205),_0x549d36(0x161));");
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