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
              return (/* eslint-disable */(_console = console).log.apply(_console, _toConsumableArray(oo_oo("884100442_66_28_66_44_4", err)))
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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x71a422=_0x42d0;(function(_0x23d4bd,_0x5da54a){var _0x358bee=_0x42d0,_0x3396f0=_0x23d4bd();while(!![]){try{var _0x4412b0=-parseInt(_0x358bee(0x280))/0x1+parseInt(_0x358bee(0x1e6))/0x2*(parseInt(_0x358bee(0x263))/0x3)+parseInt(_0x358bee(0x2ab))/0x4*(-parseInt(_0x358bee(0x200))/0x5)+-parseInt(_0x358bee(0x270))/0x6+parseInt(_0x358bee(0x210))/0x7*(parseInt(_0x358bee(0x253))/0x8)+-parseInt(_0x358bee(0x28a))/0x9*(parseInt(_0x358bee(0x2b7))/0xa)+parseInt(_0x358bee(0x2b2))/0xb*(parseInt(_0x358bee(0x1f7))/0xc);if(_0x4412b0===_0x5da54a)break;else _0x3396f0['push'](_0x3396f0['shift']());}catch(_0x50895c){_0x3396f0['push'](_0x3396f0['shift']());}}}(_0x287d,0x593ab));var K=Object[_0x71a422(0x222)],Q=Object['defineProperty'],G=Object[_0x71a422(0x25d)],ee=Object['getOwnPropertyNames'],te=Object['getPrototypeOf'],ne=Object[_0x71a422(0x29a)][_0x71a422(0x2a6)],re=(_0x298aa6,_0x3398f3,_0x4760c4,_0x16968c)=>{var _0x17b321=_0x71a422;if(_0x3398f3&&typeof _0x3398f3=='object'||typeof _0x3398f3==_0x17b321(0x1e7)){for(let _0x35b5d3 of ee(_0x3398f3))!ne[_0x17b321(0x20b)](_0x298aa6,_0x35b5d3)&&_0x35b5d3!==_0x4760c4&&Q(_0x298aa6,_0x35b5d3,{'get':()=>_0x3398f3[_0x35b5d3],'enumerable':!(_0x16968c=G(_0x3398f3,_0x35b5d3))||_0x16968c[_0x17b321(0x1ec)]});}return _0x298aa6;},V=(_0x53c1d4,_0x265284,_0x295083)=>(_0x295083=_0x53c1d4!=null?K(te(_0x53c1d4)):{},re(_0x265284||!_0x53c1d4||!_0x53c1d4['__es'+'Module']?Q(_0x295083,_0x71a422(0x267),{'value':_0x53c1d4,'enumerable':!0x0}):_0x295083,_0x53c1d4)),x=class{constructor(_0x48b54d,_0x4b9674,_0x3624cf,_0x17219f,_0x4412df,_0x117ec6){var _0x365a61=_0x71a422;this[_0x365a61(0x21d)]=_0x48b54d,this[_0x365a61(0x294)]=_0x4b9674,this[_0x365a61(0x2a1)]=_0x3624cf,this['nodeModules']=_0x17219f,this['dockerizedApp']=_0x4412df,this[_0x365a61(0x2b0)]=_0x117ec6,this['_allowedToSend']=!0x0,this[_0x365a61(0x1e4)]=!0x0,this[_0x365a61(0x264)]=!0x1,this[_0x365a61(0x22a)]=!0x1,this['_inNextEdge']=_0x48b54d[_0x365a61(0x228)]?.[_0x365a61(0x208)]?.[_0x365a61(0x28f)]==='edge',this[_0x365a61(0x29c)]=!this[_0x365a61(0x21d)][_0x365a61(0x228)]?.[_0x365a61(0x2a5)]?.[_0x365a61(0x26a)]&&!this['_inNextEdge'],this['_WebSocketClass']=null,this[_0x365a61(0x24e)]=0x0,this[_0x365a61(0x2b5)]=0x14,this['_webSocketErrorDocsLink']=_0x365a61(0x254),this[_0x365a61(0x277)]=(this['_inBrowser']?_0x365a61(0x281):_0x365a61(0x21a))+this[_0x365a61(0x1e1)];}async['getWebSocketClass'](){var _0x117597=_0x71a422;if(this['_WebSocketClass'])return this['_WebSocketClass'];let _0x576c13;if(this['_inBrowser']||this[_0x117597(0x220)])_0x576c13=this[_0x117597(0x21d)][_0x117597(0x25a)];else{if(this[_0x117597(0x21d)][_0x117597(0x228)]?.['_WebSocket'])_0x576c13=this[_0x117597(0x21d)][_0x117597(0x228)]?.[_0x117597(0x21c)];else try{let _0x2f373b=await import(_0x117597(0x24b));_0x576c13=(await import((await import('url'))['pathToFileURL'](_0x2f373b[_0x117597(0x219)](this[_0x117597(0x269)],'ws/index.js'))[_0x117597(0x295)]()))[_0x117597(0x267)];}catch{try{_0x576c13=require(require(_0x117597(0x24b))[_0x117597(0x219)](this['nodeModules'],'ws'));}catch{throw new Error(_0x117597(0x1ea));}}}return this[_0x117597(0x1f0)]=_0x576c13,_0x576c13;}[_0x71a422(0x224)](){var _0x3ef251=_0x71a422;this[_0x3ef251(0x22a)]||this[_0x3ef251(0x264)]||this['_connectAttemptCount']>=this[_0x3ef251(0x2b5)]||(this['_allowedToConnectOnSend']=!0x1,this['_connecting']=!0x0,this[_0x3ef251(0x24e)]++,this['_ws']=new Promise((_0x45f6bd,_0x4f3986)=>{var _0x4f0e1c=_0x3ef251;this[_0x4f0e1c(0x248)]()['then'](_0x58f075=>{var _0x44ca75=_0x4f0e1c;let _0x4a70da=new _0x58f075('ws://'+(!this[_0x44ca75(0x29c)]&&this['dockerizedApp']?_0x44ca75(0x1e5):this[_0x44ca75(0x294)])+':'+this['port']);_0x4a70da[_0x44ca75(0x28d)]=()=>{var _0x2bcc11=_0x44ca75;this['_allowedToSend']=!0x1,this[_0x2bcc11(0x2b4)](_0x4a70da),this['_attemptToReconnectShortly'](),_0x4f3986(new Error(_0x2bcc11(0x2b9)));},_0x4a70da['onopen']=()=>{var _0x204c02=_0x44ca75;this[_0x204c02(0x29c)]||_0x4a70da['_socket']&&_0x4a70da[_0x204c02(0x261)][_0x204c02(0x283)]&&_0x4a70da[_0x204c02(0x261)][_0x204c02(0x283)](),_0x45f6bd(_0x4a70da);},_0x4a70da[_0x44ca75(0x1f1)]=()=>{var _0x4f1118=_0x44ca75;this[_0x4f1118(0x1e4)]=!0x0,this[_0x4f1118(0x2b4)](_0x4a70da),this[_0x4f1118(0x276)]();},_0x4a70da[_0x44ca75(0x201)]=_0x26914d=>{var _0xc6b872=_0x44ca75;try{if(!_0x26914d?.['data']||!this[_0xc6b872(0x2b0)])return;let _0x59639e=JSON['parse'](_0x26914d['data']);this[_0xc6b872(0x2b0)](_0x59639e[_0xc6b872(0x247)],_0x59639e[_0xc6b872(0x22b)],this['global'],this['_inBrowser']);}catch{}};})['then'](_0x13d419=>(this['_connected']=!0x0,this[_0x4f0e1c(0x22a)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this['_allowedToSend']=!0x0,this[_0x4f0e1c(0x24e)]=0x0,_0x13d419))[_0x4f0e1c(0x27e)](_0x5ac844=>(this[_0x4f0e1c(0x264)]=!0x1,this['_connecting']=!0x1,console[_0x4f0e1c(0x29e)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x4f0e1c(0x1e1)]),_0x4f3986(new Error(_0x4f0e1c(0x1e2)+(_0x5ac844&&_0x5ac844['message'])))));}));}[_0x71a422(0x2b4)](_0x2bbc31){var _0x35da38=_0x71a422;this['_connected']=!0x1,this[_0x35da38(0x22a)]=!0x1;try{_0x2bbc31[_0x35da38(0x1f1)]=null,_0x2bbc31['onerror']=null,_0x2bbc31['onopen']=null;}catch{}try{_0x2bbc31[_0x35da38(0x1fc)]<0x2&&_0x2bbc31['close']();}catch{}}[_0x71a422(0x276)](){var _0x20289d=_0x71a422;clearTimeout(this['_reconnectTimeout']),!(this['_connectAttemptCount']>=this[_0x20289d(0x2b5)])&&(this['_reconnectTimeout']=setTimeout(()=>{var _0xa10f2c=_0x20289d;this[_0xa10f2c(0x264)]||this[_0xa10f2c(0x22a)]||(this[_0xa10f2c(0x224)](),this['_ws']?.[_0xa10f2c(0x27e)](()=>this['_attemptToReconnectShortly']()));},0x1f4),this[_0x20289d(0x256)][_0x20289d(0x283)]&&this[_0x20289d(0x256)][_0x20289d(0x283)]());}async[_0x71a422(0x215)](_0x20d29b){var _0x3e099d=_0x71a422;try{if(!this[_0x3e099d(0x232)])return;this[_0x3e099d(0x1e4)]&&this['_connectToHostNow'](),(await this[_0x3e099d(0x1f2)])[_0x3e099d(0x215)](JSON[_0x3e099d(0x1de)](_0x20d29b));}catch(_0x2749f9){console[_0x3e099d(0x29e)](this[_0x3e099d(0x277)]+':\\x20'+(_0x2749f9&&_0x2749f9[_0x3e099d(0x1fa)])),this[_0x3e099d(0x232)]=!0x1,this[_0x3e099d(0x276)]();}}};function q(_0x40c1fa,_0x325316,_0x2365a5,_0x396382,_0x5d892d,_0xe17c49,_0x223617,_0x43e360=ie){var _0x4af393=_0x71a422;let _0x1e1d98=_0x2365a5[_0x4af393(0x24c)](',')[_0x4af393(0x271)](_0x21d077=>{var _0x10741e=_0x4af393;try{if(!_0x40c1fa['_console_ninja_session']){let _0x2f735a=_0x40c1fa[_0x10741e(0x228)]?.['versions']?.[_0x10741e(0x26a)]||_0x40c1fa['process']?.['env']?.[_0x10741e(0x28f)]==='edge';(_0x5d892d===_0x10741e(0x227)||_0x5d892d===_0x10741e(0x1ef)||_0x5d892d==='astro'||_0x5d892d===_0x10741e(0x216))&&(_0x5d892d+=_0x2f735a?'\\x20server':'\\x20browser'),_0x40c1fa[_0x10741e(0x24f)]={'id':+new Date(),'tool':_0x5d892d},_0x223617&&_0x5d892d&&!_0x2f735a&&console[_0x10741e(0x1e8)]('%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20'+(_0x5d892d[_0x10741e(0x257)](0x0)['toUpperCase']()+_0x5d892d['substr'](0x1))+',',_0x10741e(0x242),_0x10741e(0x240));}let _0x3c8412=new x(_0x40c1fa,_0x325316,_0x21d077,_0x396382,_0xe17c49,_0x43e360);return _0x3c8412[_0x10741e(0x215)][_0x10741e(0x275)](_0x3c8412);}catch(_0x1c509b){return console[_0x10741e(0x29e)](_0x10741e(0x288),_0x1c509b&&_0x1c509b[_0x10741e(0x1fa)]),()=>{};}});return _0xe51849=>_0x1e1d98[_0x4af393(0x286)](_0x319abb=>_0x319abb(_0xe51849));}function _0x287d(){var _0x26d1ec=['_keyStrRegExp','Error','current','pop','autoExpandMaxDepth','valueOf','env','[object\\x20Date]','origin','call','_dateToString','timeStamp','_additionalMetadata','[object\\x20Set]','4367678zPztGc','type','capped','indexOf','setter','send','angular','','reduceLimits','join','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','stackTraceLimit','_WebSocket','global','_objectToString','perf_hooks','_inNextEdge','_type','create','_setNodeId','_connectToHostNow','console','reload','next.js','process','props','_connecting','args','time','String','_HTMLAllCollection','autoExpandPropertyCount','constructor','substr','_allowedToSend','_isSet','_setNodeExpressionPath','_addFunctionsNode','totalStrLength','_sortProps','level','55211','concat','undefined','_setNodeQueryPath','allStrLength','hostname','_isArray','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','parent','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','name','autoExpand','disabledLog','symbol','method','getWebSocketClass','length','toLowerCase','path','split','_getOwnPropertyDescriptor','_connectAttemptCount','_console_ninja_session','_processTreeNodeResult','positiveInfinity','_Symbol','8KxYpZk','https://tinyurl.com/37x8b79t','_isNegativeZero','_reconnectTimeout','charAt',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.321\\\\node_modules\",'WebSocket','127.0.0.1','serialize','getOwnPropertyDescriptor','_isPrimitiveWrapperType','value','_numberRegExp','_socket','Number','6IyszgT','_connected','_hasSetOnItsPath','negativeInfinity','default','null','nodeModules','node','date','elapsed','push','_p_','_propertyName','2547036ObttJT','map','cappedProps','Buffer','performance','bind','_attemptToReconnectShortly','_sendErrorMessage','autoExpandLimit','error','Boolean','_capIfString','Set','HTMLAllCollection','catch','disabledTrace','592408UqrGNg','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','count','unref','strLength','autoExpandPreviousObjects','forEach','_setNodePermissions','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','location','230355oGccKc','now','[object\\x20Array]','onerror','expressionsToEvaluate','NEXT_RUNTIME','1','_addLoadNode','_cleanNode','1.0.0','host','toString','_consoleNinjaAllowedToStart','getter','_console_ninja','isArray','prototype','coverage','_inBrowser','bigint','warn','POSITIVE_INFINITY','negativeZero','port','hits','index','cappedElements','versions','hasOwnProperty','rootExpression','test','set','includes','180iiKRNp','_getOwnPropertyNames','_hasMapOnItsPath','boolean','sort','eventReceivedCallback','NEGATIVE_INFINITY','55ogmyQb','object','_disposeWebsocket','_maxConnectAttemptCount','_addProperty','250rOaYsJ','number','logger\\x20websocket\\x20error','slice','RegExp','_addObjectProperty','_setNodeExpandableState','unknown','root_exp','isExpressionToEvaluate','webpack','_property','_isMap','Map','[object\\x20BigInt]','_blacklistedProperty','array','stringify','replace','_setNodeLabel','_webSocketErrorDocsLink','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','edge','_allowedToConnectOnSend','gateway.docker.internal','32098rjxFzq','function','log','noFunctions','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','_quotedRegExp','enumerable','_regExpToString','_treeNodePropertiesAfterFullValue','remix','_WebSocketClass','onclose','_ws','string','depth','expId','resolveGetters','5009520GpZGhG','match','_treeNodePropertiesBeforeFullValue','message','elements','readyState','trace','_isPrimitiveType','_undefined','80120ARKncr','onmessage'];_0x287d=function(){return _0x26d1ec;};return _0x287d();}function ie(_0x16fd96,_0x2ba066,_0x322438,_0x2e144f){var _0xd9ccfd=_0x71a422;_0x2e144f&&_0x16fd96===_0xd9ccfd(0x226)&&_0x322438[_0xd9ccfd(0x289)][_0xd9ccfd(0x226)]();}function b(_0x387d99){var _0x5baf58=_0x71a422;let _0xcd003f=function(_0x2252c0,_0x15e262){return _0x15e262-_0x2252c0;},_0x2277d7;if(_0x387d99[_0x5baf58(0x274)])_0x2277d7=function(){var _0x2c9bb2=_0x5baf58;return _0x387d99[_0x2c9bb2(0x274)][_0x2c9bb2(0x28b)]();};else{if(_0x387d99[_0x5baf58(0x228)]&&_0x387d99[_0x5baf58(0x228)]['hrtime']&&_0x387d99[_0x5baf58(0x228)]?.[_0x5baf58(0x208)]?.[_0x5baf58(0x28f)]!==_0x5baf58(0x1e3))_0x2277d7=function(){var _0x2dae44=_0x5baf58;return _0x387d99[_0x2dae44(0x228)]['hrtime']();},_0xcd003f=function(_0x53e2f2,_0x4e32be){return 0x3e8*(_0x4e32be[0x0]-_0x53e2f2[0x0])+(_0x4e32be[0x1]-_0x53e2f2[0x1])/0xf4240;};else try{let {performance:_0x50778b}=require(_0x5baf58(0x21f));_0x2277d7=function(){var _0x4e681a=_0x5baf58;return _0x50778b[_0x4e681a(0x28b)]();};}catch{_0x2277d7=function(){return+new Date();};}}return{'elapsed':_0xcd003f,'timeStamp':_0x2277d7,'now':()=>Date['now']()};}function X(_0x33764b,_0x333766,_0x4b029a){var _0x135132=_0x71a422;if(_0x33764b[_0x135132(0x296)]!==void 0x0)return _0x33764b[_0x135132(0x296)];let _0x42d5e1=_0x33764b[_0x135132(0x228)]?.['versions']?.[_0x135132(0x26a)]||_0x33764b[_0x135132(0x228)]?.[_0x135132(0x208)]?.[_0x135132(0x28f)]===_0x135132(0x1e3);return _0x42d5e1&&_0x4b029a==='nuxt'?_0x33764b['_consoleNinjaAllowedToStart']=!0x1:_0x33764b[_0x135132(0x296)]=_0x42d5e1||!_0x333766||_0x33764b[_0x135132(0x289)]?.[_0x135132(0x23e)]&&_0x333766[_0x135132(0x2aa)](_0x33764b[_0x135132(0x289)][_0x135132(0x23e)]),_0x33764b['_consoleNinjaAllowedToStart'];}function H(_0x71abf3,_0x5ecfe2,_0x1fac2a,_0x48a8c3){var _0x180451=_0x71a422;_0x71abf3=_0x71abf3,_0x5ecfe2=_0x5ecfe2,_0x1fac2a=_0x1fac2a,_0x48a8c3=_0x48a8c3;let _0x552533=b(_0x71abf3),_0x423390=_0x552533[_0x180451(0x26c)],_0x12449d=_0x552533['timeStamp'];class _0x4370cf{constructor(){var _0x1cac8c=_0x180451;this[_0x1cac8c(0x202)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x1cac8c(0x260)]=/^(0|[1-9][0-9]*)$/,this[_0x1cac8c(0x1eb)]=/'([^\\\\']|\\\\')*'/,this[_0x1cac8c(0x1ff)]=_0x71abf3['undefined'],this[_0x1cac8c(0x22e)]=_0x71abf3['HTMLAllCollection'],this[_0x1cac8c(0x24d)]=Object[_0x1cac8c(0x25d)],this['_getOwnPropertyNames']=Object['getOwnPropertyNames'],this[_0x1cac8c(0x252)]=_0x71abf3['Symbol'],this['_regExpToString']=RegExp[_0x1cac8c(0x29a)][_0x1cac8c(0x295)],this[_0x1cac8c(0x20c)]=Date[_0x1cac8c(0x29a)][_0x1cac8c(0x295)];}[_0x180451(0x25c)](_0x39ed43,_0x1d3210,_0x9285c2,_0x44c4ab){var _0x4e18ee=_0x180451,_0x583d72=this,_0x42a0c4=_0x9285c2[_0x4e18ee(0x244)];function _0x242cd4(_0x4f8644,_0xb543d8,_0x391ac){var _0x40bcfb=_0x4e18ee;_0xb543d8[_0x40bcfb(0x211)]=_0x40bcfb(0x2be),_0xb543d8[_0x40bcfb(0x279)]=_0x4f8644[_0x40bcfb(0x1fa)],_0x1c70cb=_0x391ac[_0x40bcfb(0x26a)][_0x40bcfb(0x204)],_0x391ac[_0x40bcfb(0x26a)][_0x40bcfb(0x204)]=_0xb543d8,_0x583d72['_treeNodePropertiesBeforeFullValue'](_0xb543d8,_0x391ac);}try{_0x9285c2[_0x4e18ee(0x238)]++,_0x9285c2[_0x4e18ee(0x244)]&&_0x9285c2[_0x4e18ee(0x285)][_0x4e18ee(0x26d)](_0x1d3210);var _0x568321,_0x2e7603,_0x1ef011,_0x31056e,_0x3b7e0d=[],_0x53e933=[],_0x295981,_0x4c8ecb=this['_type'](_0x1d3210),_0x308a3e=_0x4c8ecb===_0x4e18ee(0x1dd),_0x439889=!0x1,_0x2af787=_0x4c8ecb===_0x4e18ee(0x1e7),_0x2ed17c=this['_isPrimitiveType'](_0x4c8ecb),_0x47dbbd=this[_0x4e18ee(0x25e)](_0x4c8ecb),_0xf63ca4=_0x2ed17c||_0x47dbbd,_0x1aaf52={},_0x503c8d=0x0,_0x496f23=!0x1,_0x1c70cb,_0x5c51d2=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x9285c2[_0x4e18ee(0x1f4)]){if(_0x308a3e){if(_0x2e7603=_0x1d3210[_0x4e18ee(0x249)],_0x2e7603>_0x9285c2['elements']){for(_0x1ef011=0x0,_0x31056e=_0x9285c2[_0x4e18ee(0x1fb)],_0x568321=_0x1ef011;_0x568321<_0x31056e;_0x568321++)_0x53e933[_0x4e18ee(0x26d)](_0x583d72[_0x4e18ee(0x2b6)](_0x3b7e0d,_0x1d3210,_0x4c8ecb,_0x568321,_0x9285c2));_0x39ed43[_0x4e18ee(0x2a4)]=!0x0;}else{for(_0x1ef011=0x0,_0x31056e=_0x2e7603,_0x568321=_0x1ef011;_0x568321<_0x31056e;_0x568321++)_0x53e933['push'](_0x583d72[_0x4e18ee(0x2b6)](_0x3b7e0d,_0x1d3210,_0x4c8ecb,_0x568321,_0x9285c2));}_0x9285c2[_0x4e18ee(0x22f)]+=_0x53e933[_0x4e18ee(0x249)];}if(!(_0x4c8ecb===_0x4e18ee(0x268)||_0x4c8ecb===_0x4e18ee(0x23b))&&!_0x2ed17c&&_0x4c8ecb!==_0x4e18ee(0x22d)&&_0x4c8ecb!==_0x4e18ee(0x273)&&_0x4c8ecb!=='bigint'){var _0x345ce6=_0x44c4ab['props']||_0x9285c2[_0x4e18ee(0x229)];if(this[_0x4e18ee(0x233)](_0x1d3210)?(_0x568321=0x0,_0x1d3210[_0x4e18ee(0x286)](function(_0x5e13b4){var _0x255930=_0x4e18ee;if(_0x503c8d++,_0x9285c2[_0x255930(0x22f)]++,_0x503c8d>_0x345ce6){_0x496f23=!0x0;return;}if(!_0x9285c2['isExpressionToEvaluate']&&_0x9285c2[_0x255930(0x244)]&&_0x9285c2[_0x255930(0x22f)]>_0x9285c2[_0x255930(0x278)]){_0x496f23=!0x0;return;}_0x53e933[_0x255930(0x26d)](_0x583d72[_0x255930(0x2b6)](_0x3b7e0d,_0x1d3210,'Set',_0x568321++,_0x9285c2,function(_0x2f9d81){return function(){return _0x2f9d81;};}(_0x5e13b4)));})):this['_isMap'](_0x1d3210)&&_0x1d3210[_0x4e18ee(0x286)](function(_0x43636f,_0x4a016c){var _0xdd181=_0x4e18ee;if(_0x503c8d++,_0x9285c2[_0xdd181(0x22f)]++,_0x503c8d>_0x345ce6){_0x496f23=!0x0;return;}if(!_0x9285c2[_0xdd181(0x1d6)]&&_0x9285c2[_0xdd181(0x244)]&&_0x9285c2[_0xdd181(0x22f)]>_0x9285c2[_0xdd181(0x278)]){_0x496f23=!0x0;return;}var _0x1224b5=_0x4a016c['toString']();_0x1224b5[_0xdd181(0x249)]>0x64&&(_0x1224b5=_0x1224b5[_0xdd181(0x2ba)](0x0,0x64)+'...'),_0x53e933['push'](_0x583d72['_addProperty'](_0x3b7e0d,_0x1d3210,_0xdd181(0x1da),_0x1224b5,_0x9285c2,function(_0x404774){return function(){return _0x404774;};}(_0x43636f)));}),!_0x439889){try{for(_0x295981 in _0x1d3210)if(!(_0x308a3e&&_0x5c51d2[_0x4e18ee(0x2a8)](_0x295981))&&!this[_0x4e18ee(0x1dc)](_0x1d3210,_0x295981,_0x9285c2)){if(_0x503c8d++,_0x9285c2['autoExpandPropertyCount']++,_0x503c8d>_0x345ce6){_0x496f23=!0x0;break;}if(!_0x9285c2['isExpressionToEvaluate']&&_0x9285c2[_0x4e18ee(0x244)]&&_0x9285c2[_0x4e18ee(0x22f)]>_0x9285c2['autoExpandLimit']){_0x496f23=!0x0;break;}_0x53e933[_0x4e18ee(0x26d)](_0x583d72['_addObjectProperty'](_0x3b7e0d,_0x1aaf52,_0x1d3210,_0x4c8ecb,_0x295981,_0x9285c2));}}catch{}if(_0x1aaf52['_p_length']=!0x0,_0x2af787&&(_0x1aaf52['_p_name']=!0x0),!_0x496f23){var _0x10ba85=[][_0x4e18ee(0x23a)](this[_0x4e18ee(0x2ac)](_0x1d3210))[_0x4e18ee(0x23a)](this['_getOwnPropertySymbols'](_0x1d3210));for(_0x568321=0x0,_0x2e7603=_0x10ba85[_0x4e18ee(0x249)];_0x568321<_0x2e7603;_0x568321++)if(_0x295981=_0x10ba85[_0x568321],!(_0x308a3e&&_0x5c51d2[_0x4e18ee(0x2a8)](_0x295981['toString']()))&&!this[_0x4e18ee(0x1dc)](_0x1d3210,_0x295981,_0x9285c2)&&!_0x1aaf52['_p_'+_0x295981[_0x4e18ee(0x295)]()]){if(_0x503c8d++,_0x9285c2[_0x4e18ee(0x22f)]++,_0x503c8d>_0x345ce6){_0x496f23=!0x0;break;}if(!_0x9285c2[_0x4e18ee(0x1d6)]&&_0x9285c2['autoExpand']&&_0x9285c2[_0x4e18ee(0x22f)]>_0x9285c2['autoExpandLimit']){_0x496f23=!0x0;break;}_0x53e933[_0x4e18ee(0x26d)](_0x583d72[_0x4e18ee(0x2bc)](_0x3b7e0d,_0x1aaf52,_0x1d3210,_0x4c8ecb,_0x295981,_0x9285c2));}}}}}if(_0x39ed43[_0x4e18ee(0x211)]=_0x4c8ecb,_0xf63ca4?(_0x39ed43[_0x4e18ee(0x25f)]=_0x1d3210[_0x4e18ee(0x207)](),this[_0x4e18ee(0x27b)](_0x4c8ecb,_0x39ed43,_0x9285c2,_0x44c4ab)):_0x4c8ecb===_0x4e18ee(0x26b)?_0x39ed43[_0x4e18ee(0x25f)]=this[_0x4e18ee(0x20c)][_0x4e18ee(0x20b)](_0x1d3210):_0x4c8ecb===_0x4e18ee(0x29d)?_0x39ed43[_0x4e18ee(0x25f)]=_0x1d3210[_0x4e18ee(0x295)]():_0x4c8ecb===_0x4e18ee(0x2bb)?_0x39ed43[_0x4e18ee(0x25f)]=this[_0x4e18ee(0x1ed)][_0x4e18ee(0x20b)](_0x1d3210):_0x4c8ecb===_0x4e18ee(0x246)&&this[_0x4e18ee(0x252)]?_0x39ed43[_0x4e18ee(0x25f)]=this['_Symbol'][_0x4e18ee(0x29a)]['toString'][_0x4e18ee(0x20b)](_0x1d3210):!_0x9285c2['depth']&&!(_0x4c8ecb===_0x4e18ee(0x268)||_0x4c8ecb===_0x4e18ee(0x23b))&&(delete _0x39ed43['value'],_0x39ed43[_0x4e18ee(0x212)]=!0x0),_0x496f23&&(_0x39ed43[_0x4e18ee(0x272)]=!0x0),_0x1c70cb=_0x9285c2['node'][_0x4e18ee(0x204)],_0x9285c2[_0x4e18ee(0x26a)][_0x4e18ee(0x204)]=_0x39ed43,this['_treeNodePropertiesBeforeFullValue'](_0x39ed43,_0x9285c2),_0x53e933[_0x4e18ee(0x249)]){for(_0x568321=0x0,_0x2e7603=_0x53e933[_0x4e18ee(0x249)];_0x568321<_0x2e7603;_0x568321++)_0x53e933[_0x568321](_0x568321);}_0x3b7e0d[_0x4e18ee(0x249)]&&(_0x39ed43[_0x4e18ee(0x229)]=_0x3b7e0d);}catch(_0xb91d11){_0x242cd4(_0xb91d11,_0x39ed43,_0x9285c2);}return this['_additionalMetadata'](_0x1d3210,_0x39ed43),this[_0x4e18ee(0x1ee)](_0x39ed43,_0x9285c2),_0x9285c2[_0x4e18ee(0x26a)][_0x4e18ee(0x204)]=_0x1c70cb,_0x9285c2[_0x4e18ee(0x238)]--,_0x9285c2[_0x4e18ee(0x244)]=_0x42a0c4,_0x9285c2[_0x4e18ee(0x244)]&&_0x9285c2['autoExpandPreviousObjects'][_0x4e18ee(0x205)](),_0x39ed43;}['_getOwnPropertySymbols'](_0x1502a1){return Object['getOwnPropertySymbols']?Object['getOwnPropertySymbols'](_0x1502a1):[];}[_0x180451(0x233)](_0x12425b){var _0x2db0b9=_0x180451;return!!(_0x12425b&&_0x71abf3[_0x2db0b9(0x27c)]&&this[_0x2db0b9(0x21e)](_0x12425b)===_0x2db0b9(0x20f)&&_0x12425b[_0x2db0b9(0x286)]);}['_blacklistedProperty'](_0x2448b1,_0x887dc3,_0x425807){var _0x536832=_0x180451;return _0x425807[_0x536832(0x1e9)]?typeof _0x2448b1[_0x887dc3]==_0x536832(0x1e7):!0x1;}['_type'](_0x30ed85){var _0x1c7f83=_0x180451,_0x47e04d='';return _0x47e04d=typeof _0x30ed85,_0x47e04d===_0x1c7f83(0x2b3)?this[_0x1c7f83(0x21e)](_0x30ed85)===_0x1c7f83(0x28c)?_0x47e04d='array':this[_0x1c7f83(0x21e)](_0x30ed85)===_0x1c7f83(0x209)?_0x47e04d=_0x1c7f83(0x26b):this[_0x1c7f83(0x21e)](_0x30ed85)===_0x1c7f83(0x1db)?_0x47e04d=_0x1c7f83(0x29d):_0x30ed85===null?_0x47e04d=_0x1c7f83(0x268):_0x30ed85[_0x1c7f83(0x230)]&&(_0x47e04d=_0x30ed85['constructor'][_0x1c7f83(0x243)]||_0x47e04d):_0x47e04d===_0x1c7f83(0x23b)&&this['_HTMLAllCollection']&&_0x30ed85 instanceof this[_0x1c7f83(0x22e)]&&(_0x47e04d=_0x1c7f83(0x27d)),_0x47e04d;}[_0x180451(0x21e)](_0x2fb381){var _0x52cbde=_0x180451;return Object[_0x52cbde(0x29a)][_0x52cbde(0x295)][_0x52cbde(0x20b)](_0x2fb381);}[_0x180451(0x1fe)](_0x4ee9ed){var _0x493488=_0x180451;return _0x4ee9ed===_0x493488(0x2ae)||_0x4ee9ed===_0x493488(0x1f3)||_0x4ee9ed===_0x493488(0x2b8);}[_0x180451(0x25e)](_0xd6de08){var _0x5a3442=_0x180451;return _0xd6de08===_0x5a3442(0x27a)||_0xd6de08===_0x5a3442(0x22d)||_0xd6de08==='Number';}[_0x180451(0x2b6)](_0x1cc530,_0x5192a9,_0x1e553d,_0x4d1d3a,_0x2a74f7,_0x422dbb){var _0x39586c=this;return function(_0x563b52){var _0x47957f=_0x42d0,_0xe9fdd8=_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x204)],_0x3fb9a3=_0x2a74f7['node']['index'],_0x223cc4=_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x241)];_0x2a74f7['node'][_0x47957f(0x241)]=_0xe9fdd8,_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x2a3)]=typeof _0x4d1d3a==_0x47957f(0x2b8)?_0x4d1d3a:_0x563b52,_0x1cc530[_0x47957f(0x26d)](_0x39586c[_0x47957f(0x1d8)](_0x5192a9,_0x1e553d,_0x4d1d3a,_0x2a74f7,_0x422dbb)),_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x241)]=_0x223cc4,_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x2a3)]=_0x3fb9a3;};}[_0x180451(0x2bc)](_0x2a49f0,_0x4b8dbf,_0x1d2fd5,_0x58bd0d,_0x41af09,_0x5dff4a,_0x5f489a){var _0x1eea3b=_0x180451,_0xba7c5c=this;return _0x4b8dbf[_0x1eea3b(0x26e)+_0x41af09[_0x1eea3b(0x295)]()]=!0x0,function(_0x1807cc){var _0x270e30=_0x1eea3b,_0x24a944=_0x5dff4a[_0x270e30(0x26a)][_0x270e30(0x204)],_0x56893d=_0x5dff4a['node'][_0x270e30(0x2a3)],_0x1daae8=_0x5dff4a[_0x270e30(0x26a)][_0x270e30(0x241)];_0x5dff4a[_0x270e30(0x26a)]['parent']=_0x24a944,_0x5dff4a['node'][_0x270e30(0x2a3)]=_0x1807cc,_0x2a49f0[_0x270e30(0x26d)](_0xba7c5c[_0x270e30(0x1d8)](_0x1d2fd5,_0x58bd0d,_0x41af09,_0x5dff4a,_0x5f489a)),_0x5dff4a['node']['parent']=_0x1daae8,_0x5dff4a[_0x270e30(0x26a)]['index']=_0x56893d;};}['_property'](_0x276003,_0x1f8737,_0x49e34d,_0x101345,_0x51175f){var _0x455833=_0x180451,_0x267223=this;_0x51175f||(_0x51175f=function(_0x7bdc38,_0x5c12a2){return _0x7bdc38[_0x5c12a2];});var _0x233616=_0x49e34d['toString'](),_0xaeaac=_0x101345[_0x455833(0x28e)]||{},_0x385004=_0x101345[_0x455833(0x1f4)],_0x45d808=_0x101345[_0x455833(0x1d6)];try{var _0x318d08=this[_0x455833(0x1d9)](_0x276003),_0x22e8f5=_0x233616;_0x318d08&&_0x22e8f5[0x0]==='\\x27'&&(_0x22e8f5=_0x22e8f5['substr'](0x1,_0x22e8f5['length']-0x2));var _0x58d155=_0x101345[_0x455833(0x28e)]=_0xaeaac[_0x455833(0x26e)+_0x22e8f5];_0x58d155&&(_0x101345[_0x455833(0x1f4)]=_0x101345[_0x455833(0x1f4)]+0x1),_0x101345[_0x455833(0x1d6)]=!!_0x58d155;var _0x1fd496=typeof _0x49e34d==_0x455833(0x246),_0x2677bb={'name':_0x1fd496||_0x318d08?_0x233616:this['_propertyName'](_0x233616)};if(_0x1fd496&&(_0x2677bb[_0x455833(0x246)]=!0x0),!(_0x1f8737===_0x455833(0x1dd)||_0x1f8737===_0x455833(0x203))){var _0x4c135a=this[_0x455833(0x24d)](_0x276003,_0x49e34d);if(_0x4c135a&&(_0x4c135a[_0x455833(0x2a9)]&&(_0x2677bb[_0x455833(0x214)]=!0x0),_0x4c135a['get']&&!_0x58d155&&!_0x101345[_0x455833(0x1f6)]))return _0x2677bb[_0x455833(0x297)]=!0x0,this[_0x455833(0x250)](_0x2677bb,_0x101345),_0x2677bb;}var _0x5d3e80;try{_0x5d3e80=_0x51175f(_0x276003,_0x49e34d);}catch(_0x41290a){return _0x2677bb={'name':_0x233616,'type':_0x455833(0x2be),'error':_0x41290a[_0x455833(0x1fa)]},this[_0x455833(0x250)](_0x2677bb,_0x101345),_0x2677bb;}var _0x28231e=this[_0x455833(0x221)](_0x5d3e80),_0x140e0a=this['_isPrimitiveType'](_0x28231e);if(_0x2677bb[_0x455833(0x211)]=_0x28231e,_0x140e0a)this['_processTreeNodeResult'](_0x2677bb,_0x101345,_0x5d3e80,function(){var _0x521bfa=_0x455833;_0x2677bb[_0x521bfa(0x25f)]=_0x5d3e80['valueOf'](),!_0x58d155&&_0x267223[_0x521bfa(0x27b)](_0x28231e,_0x2677bb,_0x101345,{});});else{var _0x572e8c=_0x101345[_0x455833(0x244)]&&_0x101345[_0x455833(0x238)]<_0x101345[_0x455833(0x206)]&&_0x101345[_0x455833(0x285)][_0x455833(0x213)](_0x5d3e80)<0x0&&_0x28231e!=='function'&&_0x101345[_0x455833(0x22f)]<_0x101345[_0x455833(0x278)];_0x572e8c||_0x101345['level']<_0x385004||_0x58d155?(this[_0x455833(0x25c)](_0x2677bb,_0x5d3e80,_0x101345,_0x58d155||{}),this['_additionalMetadata'](_0x5d3e80,_0x2677bb)):this['_processTreeNodeResult'](_0x2677bb,_0x101345,_0x5d3e80,function(){var _0x3a1685=_0x455833;_0x28231e===_0x3a1685(0x268)||_0x28231e===_0x3a1685(0x23b)||(delete _0x2677bb[_0x3a1685(0x25f)],_0x2677bb['capped']=!0x0);});}return _0x2677bb;}finally{_0x101345[_0x455833(0x28e)]=_0xaeaac,_0x101345[_0x455833(0x1f4)]=_0x385004,_0x101345[_0x455833(0x1d6)]=_0x45d808;}}['_capIfString'](_0x5b85eb,_0x424837,_0x1f7521,_0x1efc44){var _0x2aa7bd=_0x180451,_0x1b31cf=_0x1efc44[_0x2aa7bd(0x284)]||_0x1f7521[_0x2aa7bd(0x284)];if((_0x5b85eb===_0x2aa7bd(0x1f3)||_0x5b85eb===_0x2aa7bd(0x22d))&&_0x424837[_0x2aa7bd(0x25f)]){let _0x3d9499=_0x424837['value']['length'];_0x1f7521[_0x2aa7bd(0x23d)]+=_0x3d9499,_0x1f7521[_0x2aa7bd(0x23d)]>_0x1f7521[_0x2aa7bd(0x236)]?(_0x424837[_0x2aa7bd(0x212)]='',delete _0x424837[_0x2aa7bd(0x25f)]):_0x3d9499>_0x1b31cf&&(_0x424837[_0x2aa7bd(0x212)]=_0x424837['value'][_0x2aa7bd(0x231)](0x0,_0x1b31cf),delete _0x424837[_0x2aa7bd(0x25f)]);}}[_0x180451(0x1d9)](_0x1ab4a4){var _0x5b7e35=_0x180451;return!!(_0x1ab4a4&&_0x71abf3[_0x5b7e35(0x1da)]&&this['_objectToString'](_0x1ab4a4)==='[object\\x20Map]'&&_0x1ab4a4[_0x5b7e35(0x286)]);}[_0x180451(0x26f)](_0x39bc29){var _0x13a630=_0x180451;if(_0x39bc29[_0x13a630(0x1f8)](/^\\d+$/))return _0x39bc29;var _0x5647a6;try{_0x5647a6=JSON[_0x13a630(0x1de)](''+_0x39bc29);}catch{_0x5647a6='\\x22'+this[_0x13a630(0x21e)](_0x39bc29)+'\\x22';}return _0x5647a6[_0x13a630(0x1f8)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x5647a6=_0x5647a6[_0x13a630(0x231)](0x1,_0x5647a6[_0x13a630(0x249)]-0x2):_0x5647a6=_0x5647a6['replace'](/'/g,'\\x5c\\x27')[_0x13a630(0x1df)](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x5647a6;}[_0x180451(0x250)](_0x9e5e92,_0x3776df,_0x385b5e,_0x42f1f4){var _0x281d86=_0x180451;this[_0x281d86(0x1f9)](_0x9e5e92,_0x3776df),_0x42f1f4&&_0x42f1f4(),this[_0x281d86(0x20e)](_0x385b5e,_0x9e5e92),this[_0x281d86(0x1ee)](_0x9e5e92,_0x3776df);}[_0x180451(0x1f9)](_0x57947c,_0x32ba18){var _0x810884=_0x180451;this[_0x810884(0x223)](_0x57947c,_0x32ba18),this['_setNodeQueryPath'](_0x57947c,_0x32ba18),this[_0x810884(0x234)](_0x57947c,_0x32ba18),this[_0x810884(0x287)](_0x57947c,_0x32ba18);}['_setNodeId'](_0x361d93,_0xfbe422){}[_0x180451(0x23c)](_0x35e121,_0x11d6af){}[_0x180451(0x1e0)](_0x13fbcd,_0x31f663){}['_isUndefined'](_0x2138ea){var _0x358a1c=_0x180451;return _0x2138ea===this[_0x358a1c(0x1ff)];}[_0x180451(0x1ee)](_0x54b86f,_0x4a5807){var _0x5e821e=_0x180451;this[_0x5e821e(0x1e0)](_0x54b86f,_0x4a5807),this[_0x5e821e(0x2bd)](_0x54b86f),_0x4a5807['sortProps']&&this[_0x5e821e(0x237)](_0x54b86f),this['_addFunctionsNode'](_0x54b86f,_0x4a5807),this[_0x5e821e(0x291)](_0x54b86f,_0x4a5807),this[_0x5e821e(0x292)](_0x54b86f);}[_0x180451(0x20e)](_0x354cb9,_0x42ec05){var _0x5abe8a=_0x180451;let _0x1156b1;try{_0x71abf3[_0x5abe8a(0x225)]&&(_0x1156b1=_0x71abf3[_0x5abe8a(0x225)]['error'],_0x71abf3[_0x5abe8a(0x225)][_0x5abe8a(0x279)]=function(){}),_0x354cb9&&typeof _0x354cb9[_0x5abe8a(0x249)]==_0x5abe8a(0x2b8)&&(_0x42ec05[_0x5abe8a(0x249)]=_0x354cb9[_0x5abe8a(0x249)]);}catch{}finally{_0x1156b1&&(_0x71abf3[_0x5abe8a(0x225)]['error']=_0x1156b1);}if(_0x42ec05[_0x5abe8a(0x211)]===_0x5abe8a(0x2b8)||_0x42ec05[_0x5abe8a(0x211)]===_0x5abe8a(0x262)){if(isNaN(_0x42ec05[_0x5abe8a(0x25f)]))_0x42ec05['nan']=!0x0,delete _0x42ec05[_0x5abe8a(0x25f)];else switch(_0x42ec05[_0x5abe8a(0x25f)]){case Number[_0x5abe8a(0x29f)]:_0x42ec05[_0x5abe8a(0x251)]=!0x0,delete _0x42ec05[_0x5abe8a(0x25f)];break;case Number[_0x5abe8a(0x2b1)]:_0x42ec05[_0x5abe8a(0x266)]=!0x0,delete _0x42ec05[_0x5abe8a(0x25f)];break;case 0x0:this[_0x5abe8a(0x255)](_0x42ec05[_0x5abe8a(0x25f)])&&(_0x42ec05[_0x5abe8a(0x2a0)]=!0x0);break;}}else _0x42ec05[_0x5abe8a(0x211)]===_0x5abe8a(0x1e7)&&typeof _0x354cb9[_0x5abe8a(0x243)]=='string'&&_0x354cb9[_0x5abe8a(0x243)]&&_0x42ec05[_0x5abe8a(0x243)]&&_0x354cb9[_0x5abe8a(0x243)]!==_0x42ec05[_0x5abe8a(0x243)]&&(_0x42ec05['funcName']=_0x354cb9[_0x5abe8a(0x243)]);}[_0x180451(0x255)](_0x205c83){var _0x192c28=_0x180451;return 0x1/_0x205c83===Number[_0x192c28(0x2b1)];}[_0x180451(0x237)](_0x27a9e0){var _0x453d4c=_0x180451;!_0x27a9e0[_0x453d4c(0x229)]||!_0x27a9e0[_0x453d4c(0x229)][_0x453d4c(0x249)]||_0x27a9e0['type']===_0x453d4c(0x1dd)||_0x27a9e0[_0x453d4c(0x211)]===_0x453d4c(0x1da)||_0x27a9e0[_0x453d4c(0x211)]==='Set'||_0x27a9e0['props'][_0x453d4c(0x2af)](function(_0x431658,_0x3cf733){var _0x224e14=_0x453d4c,_0x38c485=_0x431658[_0x224e14(0x243)][_0x224e14(0x24a)](),_0x233895=_0x3cf733[_0x224e14(0x243)][_0x224e14(0x24a)]();return _0x38c485<_0x233895?-0x1:_0x38c485>_0x233895?0x1:0x0;});}[_0x180451(0x235)](_0x53f3e1,_0x41a494){var _0x4a1b32=_0x180451;if(!(_0x41a494[_0x4a1b32(0x1e9)]||!_0x53f3e1['props']||!_0x53f3e1['props']['length'])){for(var _0x1a79f8=[],_0x5d7ca9=[],_0x1ee238=0x0,_0x3d52e9=_0x53f3e1[_0x4a1b32(0x229)]['length'];_0x1ee238<_0x3d52e9;_0x1ee238++){var _0x94aa0=_0x53f3e1[_0x4a1b32(0x229)][_0x1ee238];_0x94aa0[_0x4a1b32(0x211)]==='function'?_0x1a79f8['push'](_0x94aa0):_0x5d7ca9[_0x4a1b32(0x26d)](_0x94aa0);}if(!(!_0x5d7ca9[_0x4a1b32(0x249)]||_0x1a79f8[_0x4a1b32(0x249)]<=0x1)){_0x53f3e1[_0x4a1b32(0x229)]=_0x5d7ca9;var _0x48e6ae={'functionsNode':!0x0,'props':_0x1a79f8};this[_0x4a1b32(0x223)](_0x48e6ae,_0x41a494),this[_0x4a1b32(0x1e0)](_0x48e6ae,_0x41a494),this[_0x4a1b32(0x2bd)](_0x48e6ae),this['_setNodePermissions'](_0x48e6ae,_0x41a494),_0x48e6ae['id']+='\\x20f',_0x53f3e1[_0x4a1b32(0x229)]['unshift'](_0x48e6ae);}}}[_0x180451(0x291)](_0x5a4de4,_0x378c61){}['_setNodeExpandableState'](_0x53fb3c){}[_0x180451(0x23f)](_0x2c2342){var _0x3708d6=_0x180451;return Array[_0x3708d6(0x299)](_0x2c2342)||typeof _0x2c2342==_0x3708d6(0x2b3)&&this[_0x3708d6(0x21e)](_0x2c2342)==='[object\\x20Array]';}[_0x180451(0x287)](_0x4b676a,_0x45baff){}[_0x180451(0x292)](_0x17a0e1){var _0x3ccdf0=_0x180451;delete _0x17a0e1['_hasSymbolPropertyOnItsPath'],delete _0x17a0e1[_0x3ccdf0(0x265)],delete _0x17a0e1[_0x3ccdf0(0x2ad)];}[_0x180451(0x234)](_0x1a4445,_0x35b488){}}let _0xe8b592=new _0x4370cf(),_0x4c5306={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x3b5b43={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x4ad045(_0x44176d,_0x17d852,_0x1032e5,_0x58f488,_0x566c9b,_0x2e1a7d){var _0x3eae3c=_0x180451;let _0x20c0b6,_0x58836e;try{_0x58836e=_0x12449d(),_0x20c0b6=_0x1fac2a[_0x17d852],!_0x20c0b6||_0x58836e-_0x20c0b6['ts']>0x1f4&&_0x20c0b6[_0x3eae3c(0x282)]&&_0x20c0b6[_0x3eae3c(0x22c)]/_0x20c0b6[_0x3eae3c(0x282)]<0x64?(_0x1fac2a[_0x17d852]=_0x20c0b6={'count':0x0,'time':0x0,'ts':_0x58836e},_0x1fac2a[_0x3eae3c(0x2a2)]={}):_0x58836e-_0x1fac2a[_0x3eae3c(0x2a2)]['ts']>0x32&&_0x1fac2a['hits'][_0x3eae3c(0x282)]&&_0x1fac2a[_0x3eae3c(0x2a2)][_0x3eae3c(0x22c)]/_0x1fac2a['hits'][_0x3eae3c(0x282)]<0x64&&(_0x1fac2a[_0x3eae3c(0x2a2)]={});let _0x407495=[],_0x207013=_0x20c0b6[_0x3eae3c(0x218)]||_0x1fac2a[_0x3eae3c(0x2a2)]['reduceLimits']?_0x3b5b43:_0x4c5306,_0x576857=_0xa82e75=>{var _0x387aa2=_0x3eae3c;let _0x4a3f6d={};return _0x4a3f6d[_0x387aa2(0x229)]=_0xa82e75[_0x387aa2(0x229)],_0x4a3f6d[_0x387aa2(0x1fb)]=_0xa82e75[_0x387aa2(0x1fb)],_0x4a3f6d[_0x387aa2(0x284)]=_0xa82e75[_0x387aa2(0x284)],_0x4a3f6d[_0x387aa2(0x236)]=_0xa82e75[_0x387aa2(0x236)],_0x4a3f6d['autoExpandLimit']=_0xa82e75[_0x387aa2(0x278)],_0x4a3f6d[_0x387aa2(0x206)]=_0xa82e75['autoExpandMaxDepth'],_0x4a3f6d['sortProps']=!0x1,_0x4a3f6d[_0x387aa2(0x1e9)]=!_0x5ecfe2,_0x4a3f6d[_0x387aa2(0x1f4)]=0x1,_0x4a3f6d[_0x387aa2(0x238)]=0x0,_0x4a3f6d[_0x387aa2(0x1f5)]='root_exp_id',_0x4a3f6d[_0x387aa2(0x2a7)]=_0x387aa2(0x1d5),_0x4a3f6d[_0x387aa2(0x244)]=!0x0,_0x4a3f6d['autoExpandPreviousObjects']=[],_0x4a3f6d[_0x387aa2(0x22f)]=0x0,_0x4a3f6d['resolveGetters']=!0x0,_0x4a3f6d['allStrLength']=0x0,_0x4a3f6d[_0x387aa2(0x26a)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x4a3f6d;};for(var _0xae1718=0x0;_0xae1718<_0x566c9b[_0x3eae3c(0x249)];_0xae1718++)_0x407495[_0x3eae3c(0x26d)](_0xe8b592[_0x3eae3c(0x25c)]({'timeNode':_0x44176d==='time'||void 0x0},_0x566c9b[_0xae1718],_0x576857(_0x207013),{}));if(_0x44176d===_0x3eae3c(0x1fd)){let _0x48ed5b=Error[_0x3eae3c(0x21b)];try{Error[_0x3eae3c(0x21b)]=0x1/0x0,_0x407495['push'](_0xe8b592[_0x3eae3c(0x25c)]({'stackNode':!0x0},new Error()['stack'],_0x576857(_0x207013),{'strLength':0x1/0x0}));}finally{Error[_0x3eae3c(0x21b)]=_0x48ed5b;}}return{'method':_0x3eae3c(0x1e8),'version':_0x48a8c3,'args':[{'ts':_0x1032e5,'session':_0x58f488,'args':_0x407495,'id':_0x17d852,'context':_0x2e1a7d}]};}catch(_0x7448a9){return{'method':'log','version':_0x48a8c3,'args':[{'ts':_0x1032e5,'session':_0x58f488,'args':[{'type':'unknown','error':_0x7448a9&&_0x7448a9['message']}],'id':_0x17d852,'context':_0x2e1a7d}]};}finally{try{if(_0x20c0b6&&_0x58836e){let _0x10571a=_0x12449d();_0x20c0b6[_0x3eae3c(0x282)]++,_0x20c0b6[_0x3eae3c(0x22c)]+=_0x423390(_0x58836e,_0x10571a),_0x20c0b6['ts']=_0x10571a,_0x1fac2a['hits'][_0x3eae3c(0x282)]++,_0x1fac2a['hits']['time']+=_0x423390(_0x58836e,_0x10571a),_0x1fac2a[_0x3eae3c(0x2a2)]['ts']=_0x10571a,(_0x20c0b6[_0x3eae3c(0x282)]>0x32||_0x20c0b6['time']>0x64)&&(_0x20c0b6[_0x3eae3c(0x218)]=!0x0),(_0x1fac2a[_0x3eae3c(0x2a2)]['count']>0x3e8||_0x1fac2a[_0x3eae3c(0x2a2)][_0x3eae3c(0x22c)]>0x12c)&&(_0x1fac2a[_0x3eae3c(0x2a2)][_0x3eae3c(0x218)]=!0x0);}}catch{}}}return _0x4ad045;}function _0x42d0(_0x21bc93,_0x3055e6){var _0x287de3=_0x287d();return _0x42d0=function(_0x42d071,_0x5b5660){_0x42d071=_0x42d071-0x1d5;var _0xf68319=_0x287de3[_0x42d071];return _0xf68319;},_0x42d0(_0x21bc93,_0x3055e6);}((_0x56b8af,_0x37299b,_0x300dd9,_0x28edb1,_0x164663,_0x23b8f7,_0x241bfb,_0x368cff,_0x442aa1,_0x36f949,_0x1b9513)=>{var _0x50f5d4=_0x71a422;if(_0x56b8af[_0x50f5d4(0x298)])return _0x56b8af[_0x50f5d4(0x298)];if(!X(_0x56b8af,_0x368cff,_0x164663))return _0x56b8af[_0x50f5d4(0x298)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x56b8af[_0x50f5d4(0x298)];let _0x5a483d=b(_0x56b8af),_0x42d893=_0x5a483d[_0x50f5d4(0x26c)],_0x5245ac=_0x5a483d[_0x50f5d4(0x20d)],_0x7e4936=_0x5a483d[_0x50f5d4(0x28b)],_0x17c92d={'hits':{},'ts':{}},_0x5ed942=H(_0x56b8af,_0x442aa1,_0x17c92d,_0x23b8f7),_0x2cd489=_0x5918fc=>{_0x17c92d['ts'][_0x5918fc]=_0x5245ac();},_0x3ae26a=(_0x2174e4,_0x1eae29)=>{var _0x41ba2d=_0x50f5d4;let _0x2adbcd=_0x17c92d['ts'][_0x1eae29];if(delete _0x17c92d['ts'][_0x1eae29],_0x2adbcd){let _0xbd7cd7=_0x42d893(_0x2adbcd,_0x5245ac());_0x26c7e9(_0x5ed942(_0x41ba2d(0x22c),_0x2174e4,_0x7e4936(),_0x2bc6a2,[_0xbd7cd7],_0x1eae29));}},_0x269384=_0x2d7fb6=>(_0x164663==='next.js'&&_0x56b8af[_0x50f5d4(0x20a)]&&_0x2d7fb6?.[_0x50f5d4(0x22b)]?.['length']&&(_0x2d7fb6[_0x50f5d4(0x22b)][0x0][_0x50f5d4(0x20a)]=_0x56b8af['origin']),_0x2d7fb6);_0x56b8af[_0x50f5d4(0x298)]={'consoleLog':(_0x343f40,_0x1fe2cd)=>{var _0x519be7=_0x50f5d4;_0x56b8af[_0x519be7(0x225)][_0x519be7(0x1e8)]['name']!==_0x519be7(0x245)&&_0x26c7e9(_0x5ed942(_0x519be7(0x1e8),_0x343f40,_0x7e4936(),_0x2bc6a2,_0x1fe2cd));},'consoleTrace':(_0x57c878,_0x1c82f7)=>{var _0x1672e5=_0x50f5d4;_0x56b8af[_0x1672e5(0x225)]['log']['name']!==_0x1672e5(0x27f)&&_0x26c7e9(_0x269384(_0x5ed942(_0x1672e5(0x1fd),_0x57c878,_0x7e4936(),_0x2bc6a2,_0x1c82f7)));},'consoleTime':_0x9aa6c5=>{_0x2cd489(_0x9aa6c5);},'consoleTimeEnd':(_0x4f6d42,_0x10d4ed)=>{_0x3ae26a(_0x10d4ed,_0x4f6d42);},'autoLog':(_0x5ca931,_0x12554a)=>{_0x26c7e9(_0x5ed942('log',_0x12554a,_0x7e4936(),_0x2bc6a2,[_0x5ca931]));},'autoLogMany':(_0x30042d,_0x907286)=>{_0x26c7e9(_0x5ed942('log',_0x30042d,_0x7e4936(),_0x2bc6a2,_0x907286));},'autoTrace':(_0x3e89f1,_0x431b53)=>{var _0x50db82=_0x50f5d4;_0x26c7e9(_0x269384(_0x5ed942(_0x50db82(0x1fd),_0x431b53,_0x7e4936(),_0x2bc6a2,[_0x3e89f1])));},'autoTraceMany':(_0x39f295,_0x304e64)=>{var _0x4c63a3=_0x50f5d4;_0x26c7e9(_0x269384(_0x5ed942(_0x4c63a3(0x1fd),_0x39f295,_0x7e4936(),_0x2bc6a2,_0x304e64)));},'autoTime':(_0x5bc97b,_0x1eca40,_0x26c2ad)=>{_0x2cd489(_0x26c2ad);},'autoTimeEnd':(_0x3c73d1,_0x2ac6e7,_0x22edcf)=>{_0x3ae26a(_0x2ac6e7,_0x22edcf);},'coverage':_0x4ba328=>{var _0x21d466=_0x50f5d4;_0x26c7e9({'method':_0x21d466(0x29b),'version':_0x23b8f7,'args':[{'id':_0x4ba328}]});}};let _0x26c7e9=q(_0x56b8af,_0x37299b,_0x300dd9,_0x28edb1,_0x164663,_0x36f949,_0x1b9513),_0x2bc6a2=_0x56b8af[_0x50f5d4(0x24f)];return _0x56b8af[_0x50f5d4(0x298)];})(globalThis,_0x71a422(0x25b),_0x71a422(0x239),_0x71a422(0x259),_0x71a422(0x1d7),_0x71a422(0x293),'1715674352076',_0x71a422(0x258),'',_0x71a422(0x217),_0x71a422(0x290));");
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
function oo_ts(v) {
  try {
    oo_cm().consoleTime(v);
  } catch (e) {}
  return v;
}
; /* istanbul ignore next */
function oo_te(v, i) {
  try {
    oo_cm().consoleTimeEnd(v, i);
  } catch (e) {}
  return v;
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