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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x476a4e=_0xa699;(function(_0x3b4992,_0xd056db){var _0x2327c7=_0xa699,_0x17847a=_0x3b4992();while(!![]){try{var _0x135ce3=-parseInt(_0x2327c7(0xc9))/0x1*(parseInt(_0x2327c7(0x106))/0x2)+-parseInt(_0x2327c7(0x18b))/0x3*(parseInt(_0x2327c7(0x173))/0x4)+parseInt(_0x2327c7(0x19d))/0x5*(parseInt(_0x2327c7(0x169))/0x6)+parseInt(_0x2327c7(0x146))/0x7+-parseInt(_0x2327c7(0x19f))/0x8*(parseInt(_0x2327c7(0xbf))/0x9)+parseInt(_0x2327c7(0x13e))/0xa+-parseInt(_0x2327c7(0x17f))/0xb*(-parseInt(_0x2327c7(0xc6))/0xc);if(_0x135ce3===_0xd056db)break;else _0x17847a['push'](_0x17847a['shift']());}catch(_0x19aeb4){_0x17847a['push'](_0x17847a['shift']());}}}(_0x5576,0x6b792));function _0xa699(_0x359d27,_0x28b9b5){var _0x55760d=_0x5576();return _0xa699=function(_0xa699ac,_0x38b6d2){_0xa699ac=_0xa699ac-0xb9;var _0x8907cc=_0x55760d[_0xa699ac];return _0x8907cc;},_0xa699(_0x359d27,_0x28b9b5);}var K=Object['create'],Q=Object[_0x476a4e(0x126)],G=Object['getOwnPropertyDescriptor'],ee=Object[_0x476a4e(0x10e)],te=Object[_0x476a4e(0x1ae)],ne=Object['prototype'][_0x476a4e(0x15f)],re=(_0x4b5086,_0x2b4f9d,_0x474fd8,_0x4e3f86)=>{var _0xe15f71=_0x476a4e;if(_0x2b4f9d&&typeof _0x2b4f9d==_0xe15f71(0x11e)||typeof _0x2b4f9d==_0xe15f71(0x16b)){for(let _0x53a65b of ee(_0x2b4f9d))!ne[_0xe15f71(0x154)](_0x4b5086,_0x53a65b)&&_0x53a65b!==_0x474fd8&&Q(_0x4b5086,_0x53a65b,{'get':()=>_0x2b4f9d[_0x53a65b],'enumerable':!(_0x4e3f86=G(_0x2b4f9d,_0x53a65b))||_0x4e3f86['enumerable']});}return _0x4b5086;},V=(_0x203994,_0x1d2a5e,_0x147e99)=>(_0x147e99=_0x203994!=null?K(te(_0x203994)):{},re(_0x1d2a5e||!_0x203994||!_0x203994['__es'+'Module']?Q(_0x147e99,_0x476a4e(0x19a),{'value':_0x203994,'enumerable':!0x0}):_0x147e99,_0x203994)),x=class{constructor(_0x1d280f,_0x3b7f8e,_0x481cd0,_0x114a66,_0xfbb0b7,_0x2e8cb8){var _0x215e66=_0x476a4e;this['global']=_0x1d280f,this[_0x215e66(0x143)]=_0x3b7f8e,this[_0x215e66(0xd6)]=_0x481cd0,this[_0x215e66(0x128)]=_0x114a66,this[_0x215e66(0xc1)]=_0xfbb0b7,this[_0x215e66(0xd8)]=_0x2e8cb8,this['_allowedToSend']=!0x0,this[_0x215e66(0xd2)]=!0x0,this[_0x215e66(0x10d)]=!0x1,this[_0x215e66(0x135)]=!0x1,this[_0x215e66(0x151)]=_0x1d280f[_0x215e66(0x19e)]?.[_0x215e66(0x16c)]?.[_0x215e66(0x105)]===_0x215e66(0xd5),this[_0x215e66(0x140)]=!this['global'][_0x215e66(0x19e)]?.[_0x215e66(0x124)]?.[_0x215e66(0x12d)]&&!this[_0x215e66(0x151)],this['_WebSocketClass']=null,this[_0x215e66(0xf9)]=0x0,this[_0x215e66(0x18c)]=0x14,this['_webSocketErrorDocsLink']=_0x215e66(0xe0),this[_0x215e66(0x171)]=(this[_0x215e66(0x140)]?_0x215e66(0xc8):_0x215e66(0x118))+this[_0x215e66(0xd3)];}async[_0x476a4e(0x10a)](){var _0x408680=_0x476a4e;if(this['_WebSocketClass'])return this['_WebSocketClass'];let _0x4a3765;if(this['_inBrowser']||this[_0x408680(0x151)])_0x4a3765=this['global'][_0x408680(0xd9)];else{if(this[_0x408680(0xc5)][_0x408680(0x19e)]?.[_0x408680(0xb9)])_0x4a3765=this[_0x408680(0xc5)][_0x408680(0x19e)]?.['_WebSocket'];else try{let _0xbf96aa=await import(_0x408680(0xe4));_0x4a3765=(await import((await import(_0x408680(0x115)))[_0x408680(0x112)](_0xbf96aa[_0x408680(0x114)](this[_0x408680(0x128)],_0x408680(0x12e)))[_0x408680(0x160)]()))[_0x408680(0x19a)];}catch{try{_0x4a3765=require(require('path')[_0x408680(0x114)](this[_0x408680(0x128)],'ws'));}catch{throw new Error(_0x408680(0x18d));}}}return this[_0x408680(0xca)]=_0x4a3765,_0x4a3765;}[_0x476a4e(0x13b)](){var _0xd332c=_0x476a4e;this['_connecting']||this['_connected']||this[_0xd332c(0xf9)]>=this[_0xd332c(0x18c)]||(this[_0xd332c(0xd2)]=!0x1,this['_connecting']=!0x0,this[_0xd332c(0xf9)]++,this[_0xd332c(0x14d)]=new Promise((_0x1ac741,_0x502edd)=>{var _0x59430c=_0xd332c;this[_0x59430c(0x10a)]()['then'](_0x1c5536=>{var _0x14890b=_0x59430c;let _0x212335=new _0x1c5536(_0x14890b(0x129)+(!this['_inBrowser']&&this[_0x14890b(0xc1)]?'gateway.docker.internal':this[_0x14890b(0x143)])+':'+this[_0x14890b(0xd6)]);_0x212335[_0x14890b(0x17c)]=()=>{var _0xe79e11=_0x14890b;this['_allowedToSend']=!0x1,this['_disposeWebsocket'](_0x212335),this[_0xe79e11(0x194)](),_0x502edd(new Error('logger\\x20websocket\\x20error'));},_0x212335['onopen']=()=>{var _0x249b4b=_0x14890b;this['_inBrowser']||_0x212335['_socket']&&_0x212335['_socket'][_0x249b4b(0x147)]&&_0x212335[_0x249b4b(0xf3)]['unref'](),_0x1ac741(_0x212335);},_0x212335[_0x14890b(0xdf)]=()=>{var _0x30c6ce=_0x14890b;this[_0x30c6ce(0xd2)]=!0x0,this[_0x30c6ce(0x1a5)](_0x212335),this[_0x30c6ce(0x194)]();},_0x212335['onmessage']=_0x3a828c=>{var _0x4e5c1c=_0x14890b;try{if(!_0x3a828c?.[_0x4e5c1c(0x172)]||!this[_0x4e5c1c(0xd8)])return;let _0x517d2a=JSON[_0x4e5c1c(0xce)](_0x3a828c[_0x4e5c1c(0x172)]);this['eventReceivedCallback'](_0x517d2a['method'],_0x517d2a[_0x4e5c1c(0x18a)],this[_0x4e5c1c(0xc5)],this[_0x4e5c1c(0x140)]);}catch{}};})[_0x59430c(0x14a)](_0x1a87a5=>(this[_0x59430c(0x10d)]=!0x0,this[_0x59430c(0x135)]=!0x1,this[_0x59430c(0xd2)]=!0x1,this[_0x59430c(0x16a)]=!0x0,this[_0x59430c(0xf9)]=0x0,_0x1a87a5))[_0x59430c(0xe8)](_0x333961=>(this[_0x59430c(0x10d)]=!0x1,this[_0x59430c(0x135)]=!0x1,console[_0x59430c(0x1a3)](_0x59430c(0x109)+this['_webSocketErrorDocsLink']),_0x502edd(new Error(_0x59430c(0x144)+(_0x333961&&_0x333961['message'])))));}));}['_disposeWebsocket'](_0x13c25e){var _0x56164d=_0x476a4e;this['_connected']=!0x1,this['_connecting']=!0x1;try{_0x13c25e[_0x56164d(0xdf)]=null,_0x13c25e['onerror']=null,_0x13c25e[_0x56164d(0x174)]=null;}catch{}try{_0x13c25e[_0x56164d(0x133)]<0x2&&_0x13c25e['close']();}catch{}}[_0x476a4e(0x194)](){var _0x5866d1=_0x476a4e;clearTimeout(this['_reconnectTimeout']),!(this['_connectAttemptCount']>=this['_maxConnectAttemptCount'])&&(this[_0x5866d1(0x179)]=setTimeout(()=>{var _0x2c29ee=_0x5866d1;this[_0x2c29ee(0x10d)]||this[_0x2c29ee(0x135)]||(this[_0x2c29ee(0x13b)](),this[_0x2c29ee(0x14d)]?.[_0x2c29ee(0xe8)](()=>this[_0x2c29ee(0x194)]()));},0x1f4),this[_0x5866d1(0x179)][_0x5866d1(0x147)]&&this[_0x5866d1(0x179)]['unref']());}async[_0x476a4e(0x1a0)](_0x160d04){var _0x3fb52a=_0x476a4e;try{if(!this[_0x3fb52a(0x16a)])return;this[_0x3fb52a(0xd2)]&&this[_0x3fb52a(0x13b)](),(await this[_0x3fb52a(0x14d)])[_0x3fb52a(0x1a0)](JSON[_0x3fb52a(0x127)](_0x160d04));}catch(_0x319dcb){console[_0x3fb52a(0x1a3)](this[_0x3fb52a(0x171)]+':\\x20'+(_0x319dcb&&_0x319dcb[_0x3fb52a(0x17a)])),this[_0x3fb52a(0x16a)]=!0x1,this[_0x3fb52a(0x194)]();}}};function _0x5576(){var _0x36302e=['failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','unshift','_isPrimitiveWrapperType','1714701098898','_getOwnPropertyNames','stack','pop','_attemptToReconnectShortly','depth','prototype','_setNodeLabel','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','test','default','valueOf','_addFunctionsNode','10340IECeIv','process','24ZVIiJk','send','date','getOwnPropertyDescriptor','warn','totalStrLength','_disposeWebsocket','_isMap','log','_HTMLAllCollection','_hasSetOnItsPath','_isNegativeZero','webpack','reload','_setNodeQueryPath','getPrototypeOf','_getOwnPropertySymbols','performance','_WebSocket','set','Boolean','_getOwnPropertyDescriptor','stackTraceLimit','_propertyName','1583514sWkMRg','allStrLength','dockerizedApp','sort','_keyStrRegExp','capped','global','10668hjrgnR','\\x20server','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','85546FRhnMq','_WebSocketClass','Buffer','_addObjectProperty','error','parse','unknown','_p_','\\x20browser','_allowedToConnectOnSend','_webSocketErrorDocsLink','_additionalMetadata','edge','port','_setNodePermissions','eventReceivedCallback','WebSocket','astro','positiveInfinity','_treeNodePropertiesBeforeFullValue','setter','_processTreeNodeResult','onclose','https://tinyurl.com/37x8b79t','_isUndefined','getOwnPropertySymbols','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','path','concat','number','_dateToString','catch','_property','elements','autoExpandMaxDepth','time','array','negativeZero','_undefined','map',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'bind','_socket','string','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','type','Error','_hasSymbolPropertyOnItsPath','_connectAttemptCount','[object\\x20Set]','strLength','count','get','_isPrimitiveType','NEGATIVE_INFINITY','substr','match','bigint','index','Set','NEXT_RUNTIME','4jNWkUq','disabledLog','','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','getWebSocketClass','cappedProps','_setNodeId','_connected','getOwnPropertyNames','_sortProps','root_exp_id','_addLoadNode','pathToFileURL','_consoleNinjaAllowedToStart','join','url','_setNodeExpandableState','_quotedRegExp','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_treeNodePropertiesAfterFullValue','parent','push','[object\\x20BigInt]','_addProperty','object','autoExpandPreviousObjects','negativeInfinity','constructor','_hasMapOnItsPath','null','versions','cappedElements','defineProperty','stringify','nodeModules','ws://','1.0.0','indexOf','nan','node','ws/index.js','perf_hooks','_isSet','_cleanNode','_isArray','readyState','autoExpand','_connecting','nuxt','isExpressionToEvaluate','autoExpandPropertyCount','remix','trace','_connectToHostNow','_console_ninja','replace','2769810RcpLOO','toLowerCase','_inBrowser','Map','HTMLAllCollection','host','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','name','1237236EQbJiM','unref','reduceLimits','includes','then','forEach','_regExpToString','_ws','expressionsToEvaluate','undefined','timeStamp','_inNextEdge','_Symbol','now','call','angular','value','autoExpandLimit','console','origin','location','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','length','current','elapsed','hasOwnProperty','toString','_setNodeExpressionPath','_numberRegExp','toUpperCase','_objectToString','expId','Number','noFunctions','next.js','186NcLbgE','_allowedToSend','function','env','resolveGetters','String','_blacklistedProperty','1','_sendErrorMessage','data','164giAwgI','onopen','[object\\x20Date]','boolean','getter','_p_length','_reconnectTimeout','message','symbol','onerror','Symbol','hits','10417xLalqp','slice','level','_type','charAt','_capIfString','_console_ninja_session','props','serialize','[object\\x20Map]','...','args','16140nlQbbJ','_maxConnectAttemptCount'];_0x5576=function(){return _0x36302e;};return _0x5576();}function q(_0x5f1796,_0x1e2f36,_0x4bc9ce,_0x3961f6,_0x1fbaaa,_0x4415a2,_0x4e75bd,_0x4b19a7=ie){var _0x408592=_0x476a4e;let _0x5ec332=_0x4bc9ce['split'](',')[_0x408592(0xf0)](_0x379d58=>{var _0x3c2f8f=_0x408592;try{if(!_0x5f1796[_0x3c2f8f(0x185)]){let _0x23a576=_0x5f1796[_0x3c2f8f(0x19e)]?.[_0x3c2f8f(0x124)]?.[_0x3c2f8f(0x12d)]||_0x5f1796[_0x3c2f8f(0x19e)]?.['env']?.[_0x3c2f8f(0x105)]===_0x3c2f8f(0xd5);(_0x1fbaaa===_0x3c2f8f(0x168)||_0x1fbaaa===_0x3c2f8f(0x139)||_0x1fbaaa===_0x3c2f8f(0xda)||_0x1fbaaa===_0x3c2f8f(0x155))&&(_0x1fbaaa+=_0x23a576?_0x3c2f8f(0xc7):_0x3c2f8f(0xd1)),_0x5f1796[_0x3c2f8f(0x185)]={'id':+new Date(),'tool':_0x1fbaaa},_0x4e75bd&&_0x1fbaaa&&!_0x23a576&&console['log'](_0x3c2f8f(0xf5)+(_0x1fbaaa[_0x3c2f8f(0x183)](0x0)[_0x3c2f8f(0x163)]()+_0x1fbaaa[_0x3c2f8f(0x100)](0x1))+',',_0x3c2f8f(0xe3),_0x3c2f8f(0x15b));}let _0x24aee7=new x(_0x5f1796,_0x1e2f36,_0x379d58,_0x3961f6,_0x4415a2,_0x4b19a7);return _0x24aee7[_0x3c2f8f(0x1a0)][_0x3c2f8f(0xf2)](_0x24aee7);}catch(_0x343a64){return console['warn'](_0x3c2f8f(0x198),_0x343a64&&_0x343a64[_0x3c2f8f(0x17a)]),()=>{};}});return _0x36aab7=>_0x5ec332['forEach'](_0x173e37=>_0x173e37(_0x36aab7));}function ie(_0x1456b8,_0x1fae56,_0xcebdcf,_0x27961e){var _0x493eb4=_0x476a4e;_0x27961e&&_0x1456b8===_0x493eb4(0x1ac)&&_0xcebdcf[_0x493eb4(0x15a)][_0x493eb4(0x1ac)]();}function b(_0x5d48f0){var _0x14f2a4=_0x476a4e;let _0x2802fe=function(_0x423458,_0x259163){return _0x259163-_0x423458;},_0x2593e4;if(_0x5d48f0['performance'])_0x2593e4=function(){var _0x8fd9ae=_0xa699;return _0x5d48f0[_0x8fd9ae(0x1b0)][_0x8fd9ae(0x153)]();};else{if(_0x5d48f0[_0x14f2a4(0x19e)]&&_0x5d48f0[_0x14f2a4(0x19e)]['hrtime']&&_0x5d48f0[_0x14f2a4(0x19e)]?.[_0x14f2a4(0x16c)]?.['NEXT_RUNTIME']!==_0x14f2a4(0xd5))_0x2593e4=function(){var _0x281d1b=_0x14f2a4;return _0x5d48f0[_0x281d1b(0x19e)]['hrtime']();},_0x2802fe=function(_0x1df3a8,_0x4cd203){return 0x3e8*(_0x4cd203[0x0]-_0x1df3a8[0x0])+(_0x4cd203[0x1]-_0x1df3a8[0x1])/0xf4240;};else try{let {performance:_0x966063}=require(_0x14f2a4(0x12f));_0x2593e4=function(){var _0x224b58=_0x14f2a4;return _0x966063[_0x224b58(0x153)]();};}catch{_0x2593e4=function(){return+new Date();};}}return{'elapsed':_0x2802fe,'timeStamp':_0x2593e4,'now':()=>Date['now']()};}function X(_0xb1344c,_0x5cfeca,_0x523676){var _0x4051bb=_0x476a4e;if(_0xb1344c[_0x4051bb(0x113)]!==void 0x0)return _0xb1344c[_0x4051bb(0x113)];let _0x323ca1=_0xb1344c['process']?.[_0x4051bb(0x124)]?.[_0x4051bb(0x12d)]||_0xb1344c[_0x4051bb(0x19e)]?.[_0x4051bb(0x16c)]?.[_0x4051bb(0x105)]===_0x4051bb(0xd5);return _0x323ca1&&_0x523676===_0x4051bb(0x136)?_0xb1344c['_consoleNinjaAllowedToStart']=!0x1:_0xb1344c[_0x4051bb(0x113)]=_0x323ca1||!_0x5cfeca||_0xb1344c['location']?.['hostname']&&_0x5cfeca[_0x4051bb(0x149)](_0xb1344c[_0x4051bb(0x15a)]['hostname']),_0xb1344c[_0x4051bb(0x113)];}function H(_0xf58fe9,_0x44d944,_0x40faa6,_0x237232){var _0x152c35=_0x476a4e;_0xf58fe9=_0xf58fe9,_0x44d944=_0x44d944,_0x40faa6=_0x40faa6,_0x237232=_0x237232;let _0x46c351=b(_0xf58fe9),_0x550e7d=_0x46c351[_0x152c35(0x15e)],_0x1c8ce1=_0x46c351[_0x152c35(0x150)];class _0x47cb83{constructor(){var _0x3569b8=_0x152c35;this[_0x3569b8(0xc3)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x3569b8(0x162)]=/^(0|[1-9][0-9]*)$/,this[_0x3569b8(0x117)]=/'([^\\\\']|\\\\')*'/,this[_0x3569b8(0xef)]=_0xf58fe9[_0x3569b8(0x14f)],this['_HTMLAllCollection']=_0xf58fe9[_0x3569b8(0x142)],this[_0x3569b8(0xbc)]=Object[_0x3569b8(0x1a2)],this[_0x3569b8(0x191)]=Object[_0x3569b8(0x10e)],this[_0x3569b8(0x152)]=_0xf58fe9[_0x3569b8(0x17d)],this['_regExpToString']=RegExp[_0x3569b8(0x196)]['toString'],this[_0x3569b8(0xe7)]=Date[_0x3569b8(0x196)]['toString'];}[_0x152c35(0x187)](_0x331e1b,_0x2efdfc,_0x3e1d3a,_0x34b2b5){var _0xe7dc17=_0x152c35,_0x4f51c4=this,_0x1701da=_0x3e1d3a[_0xe7dc17(0x134)];function _0x84356e(_0x3e2a0c,_0x1c33a9,_0x1f5095){var _0x5add09=_0xe7dc17;_0x1c33a9[_0x5add09(0xf6)]=_0x5add09(0xcf),_0x1c33a9['error']=_0x3e2a0c['message'],_0x40c72d=_0x1f5095[_0x5add09(0x12d)]['current'],_0x1f5095[_0x5add09(0x12d)][_0x5add09(0x15d)]=_0x1c33a9,_0x4f51c4[_0x5add09(0xdc)](_0x1c33a9,_0x1f5095);}try{_0x3e1d3a[_0xe7dc17(0x181)]++,_0x3e1d3a[_0xe7dc17(0x134)]&&_0x3e1d3a[_0xe7dc17(0x11f)][_0xe7dc17(0x11b)](_0x2efdfc);var _0x92cdb6,_0x2292ba,_0x1ac894,_0x2bdc07,_0x33d315=[],_0x5e4743=[],_0x4f610d,_0x4ab00d=this[_0xe7dc17(0x182)](_0x2efdfc),_0x461801=_0x4ab00d===_0xe7dc17(0xed),_0x4a1a87=!0x1,_0x41099a=_0x4ab00d===_0xe7dc17(0x16b),_0x40c3f6=this[_0xe7dc17(0xfe)](_0x4ab00d),_0x346cec=this['_isPrimitiveWrapperType'](_0x4ab00d),_0x2c4421=_0x40c3f6||_0x346cec,_0xf10ae3={},_0x3439bc=0x0,_0x5513f7=!0x1,_0x40c72d,_0x5a0733=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x3e1d3a[_0xe7dc17(0x195)]){if(_0x461801){if(_0x2292ba=_0x2efdfc[_0xe7dc17(0x15c)],_0x2292ba>_0x3e1d3a[_0xe7dc17(0xea)]){for(_0x1ac894=0x0,_0x2bdc07=_0x3e1d3a[_0xe7dc17(0xea)],_0x92cdb6=_0x1ac894;_0x92cdb6<_0x2bdc07;_0x92cdb6++)_0x5e4743[_0xe7dc17(0x11b)](_0x4f51c4[_0xe7dc17(0x11d)](_0x33d315,_0x2efdfc,_0x4ab00d,_0x92cdb6,_0x3e1d3a));_0x331e1b[_0xe7dc17(0x125)]=!0x0;}else{for(_0x1ac894=0x0,_0x2bdc07=_0x2292ba,_0x92cdb6=_0x1ac894;_0x92cdb6<_0x2bdc07;_0x92cdb6++)_0x5e4743[_0xe7dc17(0x11b)](_0x4f51c4[_0xe7dc17(0x11d)](_0x33d315,_0x2efdfc,_0x4ab00d,_0x92cdb6,_0x3e1d3a));}_0x3e1d3a[_0xe7dc17(0x138)]+=_0x5e4743[_0xe7dc17(0x15c)];}if(!(_0x4ab00d===_0xe7dc17(0x123)||_0x4ab00d===_0xe7dc17(0x14f))&&!_0x40c3f6&&_0x4ab00d!=='String'&&_0x4ab00d!==_0xe7dc17(0xcb)&&_0x4ab00d!=='bigint'){var _0x14e05b=_0x34b2b5[_0xe7dc17(0x186)]||_0x3e1d3a[_0xe7dc17(0x186)];if(this[_0xe7dc17(0x130)](_0x2efdfc)?(_0x92cdb6=0x0,_0x2efdfc[_0xe7dc17(0x14b)](function(_0x58e2b9){var _0x4a4099=_0xe7dc17;if(_0x3439bc++,_0x3e1d3a[_0x4a4099(0x138)]++,_0x3439bc>_0x14e05b){_0x5513f7=!0x0;return;}if(!_0x3e1d3a['isExpressionToEvaluate']&&_0x3e1d3a[_0x4a4099(0x134)]&&_0x3e1d3a[_0x4a4099(0x138)]>_0x3e1d3a[_0x4a4099(0x157)]){_0x5513f7=!0x0;return;}_0x5e4743[_0x4a4099(0x11b)](_0x4f51c4['_addProperty'](_0x33d315,_0x2efdfc,'Set',_0x92cdb6++,_0x3e1d3a,function(_0x4a4c58){return function(){return _0x4a4c58;};}(_0x58e2b9)));})):this['_isMap'](_0x2efdfc)&&_0x2efdfc['forEach'](function(_0x355797,_0x169860){var _0x22f686=_0xe7dc17;if(_0x3439bc++,_0x3e1d3a[_0x22f686(0x138)]++,_0x3439bc>_0x14e05b){_0x5513f7=!0x0;return;}if(!_0x3e1d3a[_0x22f686(0x137)]&&_0x3e1d3a[_0x22f686(0x134)]&&_0x3e1d3a[_0x22f686(0x138)]>_0x3e1d3a[_0x22f686(0x157)]){_0x5513f7=!0x0;return;}var _0x25bdc2=_0x169860['toString']();_0x25bdc2['length']>0x64&&(_0x25bdc2=_0x25bdc2[_0x22f686(0x180)](0x0,0x64)+_0x22f686(0x189)),_0x5e4743[_0x22f686(0x11b)](_0x4f51c4['_addProperty'](_0x33d315,_0x2efdfc,'Map',_0x25bdc2,_0x3e1d3a,function(_0x59e0ce){return function(){return _0x59e0ce;};}(_0x355797)));}),!_0x4a1a87){try{for(_0x4f610d in _0x2efdfc)if(!(_0x461801&&_0x5a0733['test'](_0x4f610d))&&!this['_blacklistedProperty'](_0x2efdfc,_0x4f610d,_0x3e1d3a)){if(_0x3439bc++,_0x3e1d3a[_0xe7dc17(0x138)]++,_0x3439bc>_0x14e05b){_0x5513f7=!0x0;break;}if(!_0x3e1d3a[_0xe7dc17(0x137)]&&_0x3e1d3a[_0xe7dc17(0x134)]&&_0x3e1d3a[_0xe7dc17(0x138)]>_0x3e1d3a[_0xe7dc17(0x157)]){_0x5513f7=!0x0;break;}_0x5e4743[_0xe7dc17(0x11b)](_0x4f51c4['_addObjectProperty'](_0x33d315,_0xf10ae3,_0x2efdfc,_0x4ab00d,_0x4f610d,_0x3e1d3a));}}catch{}if(_0xf10ae3[_0xe7dc17(0x178)]=!0x0,_0x41099a&&(_0xf10ae3['_p_name']=!0x0),!_0x5513f7){var _0xc03b=[][_0xe7dc17(0xe5)](this[_0xe7dc17(0x191)](_0x2efdfc))['concat'](this[_0xe7dc17(0x1af)](_0x2efdfc));for(_0x92cdb6=0x0,_0x2292ba=_0xc03b[_0xe7dc17(0x15c)];_0x92cdb6<_0x2292ba;_0x92cdb6++)if(_0x4f610d=_0xc03b[_0x92cdb6],!(_0x461801&&_0x5a0733[_0xe7dc17(0x199)](_0x4f610d['toString']()))&&!this[_0xe7dc17(0x16f)](_0x2efdfc,_0x4f610d,_0x3e1d3a)&&!_0xf10ae3[_0xe7dc17(0xd0)+_0x4f610d[_0xe7dc17(0x160)]()]){if(_0x3439bc++,_0x3e1d3a[_0xe7dc17(0x138)]++,_0x3439bc>_0x14e05b){_0x5513f7=!0x0;break;}if(!_0x3e1d3a[_0xe7dc17(0x137)]&&_0x3e1d3a['autoExpand']&&_0x3e1d3a[_0xe7dc17(0x138)]>_0x3e1d3a[_0xe7dc17(0x157)]){_0x5513f7=!0x0;break;}_0x5e4743[_0xe7dc17(0x11b)](_0x4f51c4[_0xe7dc17(0xcc)](_0x33d315,_0xf10ae3,_0x2efdfc,_0x4ab00d,_0x4f610d,_0x3e1d3a));}}}}}if(_0x331e1b[_0xe7dc17(0xf6)]=_0x4ab00d,_0x2c4421?(_0x331e1b['value']=_0x2efdfc[_0xe7dc17(0x19b)](),this['_capIfString'](_0x4ab00d,_0x331e1b,_0x3e1d3a,_0x34b2b5)):_0x4ab00d==='date'?_0x331e1b[_0xe7dc17(0x156)]=this[_0xe7dc17(0xe7)]['call'](_0x2efdfc):_0x4ab00d===_0xe7dc17(0x102)?_0x331e1b[_0xe7dc17(0x156)]=_0x2efdfc['toString']():_0x4ab00d==='RegExp'?_0x331e1b['value']=this[_0xe7dc17(0x14c)]['call'](_0x2efdfc):_0x4ab00d==='symbol'&&this[_0xe7dc17(0x152)]?_0x331e1b[_0xe7dc17(0x156)]=this['_Symbol']['prototype']['toString'][_0xe7dc17(0x154)](_0x2efdfc):!_0x3e1d3a[_0xe7dc17(0x195)]&&!(_0x4ab00d===_0xe7dc17(0x123)||_0x4ab00d===_0xe7dc17(0x14f))&&(delete _0x331e1b['value'],_0x331e1b[_0xe7dc17(0xc4)]=!0x0),_0x5513f7&&(_0x331e1b[_0xe7dc17(0x10b)]=!0x0),_0x40c72d=_0x3e1d3a[_0xe7dc17(0x12d)]['current'],_0x3e1d3a[_0xe7dc17(0x12d)]['current']=_0x331e1b,this['_treeNodePropertiesBeforeFullValue'](_0x331e1b,_0x3e1d3a),_0x5e4743[_0xe7dc17(0x15c)]){for(_0x92cdb6=0x0,_0x2292ba=_0x5e4743[_0xe7dc17(0x15c)];_0x92cdb6<_0x2292ba;_0x92cdb6++)_0x5e4743[_0x92cdb6](_0x92cdb6);}_0x33d315[_0xe7dc17(0x15c)]&&(_0x331e1b[_0xe7dc17(0x186)]=_0x33d315);}catch(_0x35442b){_0x84356e(_0x35442b,_0x331e1b,_0x3e1d3a);}return this[_0xe7dc17(0xd4)](_0x2efdfc,_0x331e1b),this[_0xe7dc17(0x119)](_0x331e1b,_0x3e1d3a),_0x3e1d3a['node'][_0xe7dc17(0x15d)]=_0x40c72d,_0x3e1d3a[_0xe7dc17(0x181)]--,_0x3e1d3a[_0xe7dc17(0x134)]=_0x1701da,_0x3e1d3a['autoExpand']&&_0x3e1d3a[_0xe7dc17(0x11f)][_0xe7dc17(0x193)](),_0x331e1b;}['_getOwnPropertySymbols'](_0x4dd6f0){var _0x50cf0c=_0x152c35;return Object[_0x50cf0c(0xe2)]?Object[_0x50cf0c(0xe2)](_0x4dd6f0):[];}[_0x152c35(0x130)](_0x54fdf2){var _0x9f2575=_0x152c35;return!!(_0x54fdf2&&_0xf58fe9[_0x9f2575(0x104)]&&this[_0x9f2575(0x164)](_0x54fdf2)===_0x9f2575(0xfa)&&_0x54fdf2['forEach']);}[_0x152c35(0x16f)](_0x20ad65,_0x485ba3,_0x1a51ef){var _0x3b6c95=_0x152c35;return _0x1a51ef[_0x3b6c95(0x167)]?typeof _0x20ad65[_0x485ba3]==_0x3b6c95(0x16b):!0x1;}[_0x152c35(0x182)](_0x28cc5f){var _0x89c041=_0x152c35,_0x1db1db='';return _0x1db1db=typeof _0x28cc5f,_0x1db1db==='object'?this['_objectToString'](_0x28cc5f)==='[object\\x20Array]'?_0x1db1db=_0x89c041(0xed):this[_0x89c041(0x164)](_0x28cc5f)===_0x89c041(0x175)?_0x1db1db=_0x89c041(0x1a1):this[_0x89c041(0x164)](_0x28cc5f)===_0x89c041(0x11c)?_0x1db1db=_0x89c041(0x102):_0x28cc5f===null?_0x1db1db=_0x89c041(0x123):_0x28cc5f['constructor']&&(_0x1db1db=_0x28cc5f[_0x89c041(0x121)][_0x89c041(0x145)]||_0x1db1db):_0x1db1db==='undefined'&&this[_0x89c041(0x1a8)]&&_0x28cc5f instanceof this[_0x89c041(0x1a8)]&&(_0x1db1db=_0x89c041(0x142)),_0x1db1db;}['_objectToString'](_0x1f8d2a){var _0x23c30c=_0x152c35;return Object[_0x23c30c(0x196)][_0x23c30c(0x160)][_0x23c30c(0x154)](_0x1f8d2a);}[_0x152c35(0xfe)](_0xf24c9c){var _0x4f827a=_0x152c35;return _0xf24c9c===_0x4f827a(0x176)||_0xf24c9c===_0x4f827a(0xf4)||_0xf24c9c==='number';}[_0x152c35(0x18f)](_0x456edc){var _0x180683=_0x152c35;return _0x456edc===_0x180683(0xbb)||_0x456edc===_0x180683(0x16e)||_0x456edc===_0x180683(0x166);}[_0x152c35(0x11d)](_0x2d2c5a,_0x48a209,_0x2ef3ba,_0x283198,_0x25abf7,_0x2edeea){var _0x2635db=this;return function(_0x5c29ba){var _0x3dcbef=_0xa699,_0x1be8bf=_0x25abf7[_0x3dcbef(0x12d)][_0x3dcbef(0x15d)],_0x209bf2=_0x25abf7[_0x3dcbef(0x12d)][_0x3dcbef(0x103)],_0x49557f=_0x25abf7[_0x3dcbef(0x12d)][_0x3dcbef(0x11a)];_0x25abf7[_0x3dcbef(0x12d)][_0x3dcbef(0x11a)]=_0x1be8bf,_0x25abf7[_0x3dcbef(0x12d)][_0x3dcbef(0x103)]=typeof _0x283198==_0x3dcbef(0xe6)?_0x283198:_0x5c29ba,_0x2d2c5a[_0x3dcbef(0x11b)](_0x2635db[_0x3dcbef(0xe9)](_0x48a209,_0x2ef3ba,_0x283198,_0x25abf7,_0x2edeea)),_0x25abf7[_0x3dcbef(0x12d)]['parent']=_0x49557f,_0x25abf7[_0x3dcbef(0x12d)]['index']=_0x209bf2;};}[_0x152c35(0xcc)](_0x537aa3,_0x2ca720,_0x117d6d,_0x217102,_0x4333be,_0x1bb95e,_0x404ef1){var _0x4ed53b=_0x152c35,_0x5a6bff=this;return _0x2ca720[_0x4ed53b(0xd0)+_0x4333be[_0x4ed53b(0x160)]()]=!0x0,function(_0x408da5){var _0xcc72fd=_0x4ed53b,_0x4725ca=_0x1bb95e[_0xcc72fd(0x12d)]['current'],_0x4a075b=_0x1bb95e[_0xcc72fd(0x12d)][_0xcc72fd(0x103)],_0x41a6ab=_0x1bb95e['node'][_0xcc72fd(0x11a)];_0x1bb95e[_0xcc72fd(0x12d)][_0xcc72fd(0x11a)]=_0x4725ca,_0x1bb95e['node'][_0xcc72fd(0x103)]=_0x408da5,_0x537aa3[_0xcc72fd(0x11b)](_0x5a6bff['_property'](_0x117d6d,_0x217102,_0x4333be,_0x1bb95e,_0x404ef1)),_0x1bb95e[_0xcc72fd(0x12d)][_0xcc72fd(0x11a)]=_0x41a6ab,_0x1bb95e[_0xcc72fd(0x12d)][_0xcc72fd(0x103)]=_0x4a075b;};}[_0x152c35(0xe9)](_0xa28037,_0xd17f30,_0x3a32cb,_0x48b2b4,_0x219f40){var _0x51f21c=_0x152c35,_0x103deb=this;_0x219f40||(_0x219f40=function(_0x25ff1d,_0x1c63d1){return _0x25ff1d[_0x1c63d1];});var _0x14339a=_0x3a32cb['toString'](),_0x574b7f=_0x48b2b4[_0x51f21c(0x14e)]||{},_0x42b94d=_0x48b2b4[_0x51f21c(0x195)],_0x2ba6ce=_0x48b2b4[_0x51f21c(0x137)];try{var _0x37bd0c=this[_0x51f21c(0x1a6)](_0xa28037),_0x106e18=_0x14339a;_0x37bd0c&&_0x106e18[0x0]==='\\x27'&&(_0x106e18=_0x106e18['substr'](0x1,_0x106e18[_0x51f21c(0x15c)]-0x2));var _0x144852=_0x48b2b4[_0x51f21c(0x14e)]=_0x574b7f[_0x51f21c(0xd0)+_0x106e18];_0x144852&&(_0x48b2b4[_0x51f21c(0x195)]=_0x48b2b4[_0x51f21c(0x195)]+0x1),_0x48b2b4[_0x51f21c(0x137)]=!!_0x144852;var _0x518bed=typeof _0x3a32cb==_0x51f21c(0x17b),_0x509971={'name':_0x518bed||_0x37bd0c?_0x14339a:this[_0x51f21c(0xbe)](_0x14339a)};if(_0x518bed&&(_0x509971[_0x51f21c(0x17b)]=!0x0),!(_0xd17f30===_0x51f21c(0xed)||_0xd17f30===_0x51f21c(0xf7))){var _0x54f0e5=this['_getOwnPropertyDescriptor'](_0xa28037,_0x3a32cb);if(_0x54f0e5&&(_0x54f0e5[_0x51f21c(0xba)]&&(_0x509971[_0x51f21c(0xdd)]=!0x0),_0x54f0e5[_0x51f21c(0xfd)]&&!_0x144852&&!_0x48b2b4[_0x51f21c(0x16d)]))return _0x509971[_0x51f21c(0x177)]=!0x0,this[_0x51f21c(0xde)](_0x509971,_0x48b2b4),_0x509971;}var _0x3189b4;try{_0x3189b4=_0x219f40(_0xa28037,_0x3a32cb);}catch(_0x16d48d){return _0x509971={'name':_0x14339a,'type':'unknown','error':_0x16d48d[_0x51f21c(0x17a)]},this[_0x51f21c(0xde)](_0x509971,_0x48b2b4),_0x509971;}var _0x31d7ec=this[_0x51f21c(0x182)](_0x3189b4),_0x4673ea=this[_0x51f21c(0xfe)](_0x31d7ec);if(_0x509971[_0x51f21c(0xf6)]=_0x31d7ec,_0x4673ea)this[_0x51f21c(0xde)](_0x509971,_0x48b2b4,_0x3189b4,function(){var _0x241107=_0x51f21c;_0x509971['value']=_0x3189b4[_0x241107(0x19b)](),!_0x144852&&_0x103deb[_0x241107(0x184)](_0x31d7ec,_0x509971,_0x48b2b4,{});});else{var _0x386a36=_0x48b2b4['autoExpand']&&_0x48b2b4[_0x51f21c(0x181)]<_0x48b2b4['autoExpandMaxDepth']&&_0x48b2b4['autoExpandPreviousObjects'][_0x51f21c(0x12b)](_0x3189b4)<0x0&&_0x31d7ec!==_0x51f21c(0x16b)&&_0x48b2b4['autoExpandPropertyCount']<_0x48b2b4['autoExpandLimit'];_0x386a36||_0x48b2b4[_0x51f21c(0x181)]<_0x42b94d||_0x144852?(this[_0x51f21c(0x187)](_0x509971,_0x3189b4,_0x48b2b4,_0x144852||{}),this['_additionalMetadata'](_0x3189b4,_0x509971)):this[_0x51f21c(0xde)](_0x509971,_0x48b2b4,_0x3189b4,function(){var _0x4638de=_0x51f21c;_0x31d7ec===_0x4638de(0x123)||_0x31d7ec===_0x4638de(0x14f)||(delete _0x509971[_0x4638de(0x156)],_0x509971[_0x4638de(0xc4)]=!0x0);});}return _0x509971;}finally{_0x48b2b4[_0x51f21c(0x14e)]=_0x574b7f,_0x48b2b4[_0x51f21c(0x195)]=_0x42b94d,_0x48b2b4[_0x51f21c(0x137)]=_0x2ba6ce;}}[_0x152c35(0x184)](_0x551443,_0xc88e19,_0x2d62e7,_0x1d9b82){var _0x303e52=_0x152c35,_0x263618=_0x1d9b82[_0x303e52(0xfb)]||_0x2d62e7['strLength'];if((_0x551443===_0x303e52(0xf4)||_0x551443==='String')&&_0xc88e19[_0x303e52(0x156)]){let _0x461510=_0xc88e19[_0x303e52(0x156)]['length'];_0x2d62e7[_0x303e52(0xc0)]+=_0x461510,_0x2d62e7['allStrLength']>_0x2d62e7[_0x303e52(0x1a4)]?(_0xc88e19[_0x303e52(0xc4)]='',delete _0xc88e19['value']):_0x461510>_0x263618&&(_0xc88e19[_0x303e52(0xc4)]=_0xc88e19['value'][_0x303e52(0x100)](0x0,_0x263618),delete _0xc88e19[_0x303e52(0x156)]);}}['_isMap'](_0x2316da){var _0xe04921=_0x152c35;return!!(_0x2316da&&_0xf58fe9[_0xe04921(0x141)]&&this[_0xe04921(0x164)](_0x2316da)===_0xe04921(0x188)&&_0x2316da[_0xe04921(0x14b)]);}[_0x152c35(0xbe)](_0x16f2d3){var _0x2d288a=_0x152c35;if(_0x16f2d3[_0x2d288a(0x101)](/^\\d+$/))return _0x16f2d3;var _0x235534;try{_0x235534=JSON[_0x2d288a(0x127)](''+_0x16f2d3);}catch{_0x235534='\\x22'+this[_0x2d288a(0x164)](_0x16f2d3)+'\\x22';}return _0x235534['match'](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x235534=_0x235534[_0x2d288a(0x100)](0x1,_0x235534['length']-0x2):_0x235534=_0x235534[_0x2d288a(0x13d)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')[_0x2d288a(0x13d)](/(^\"|\"$)/g,'\\x27'),_0x235534;}[_0x152c35(0xde)](_0x4b60a8,_0xa0061b,_0x5c776a,_0x55e1eb){var _0x6b4c33=_0x152c35;this['_treeNodePropertiesBeforeFullValue'](_0x4b60a8,_0xa0061b),_0x55e1eb&&_0x55e1eb(),this[_0x6b4c33(0xd4)](_0x5c776a,_0x4b60a8),this['_treeNodePropertiesAfterFullValue'](_0x4b60a8,_0xa0061b);}[_0x152c35(0xdc)](_0x456b9a,_0x3d0986){var _0x453bd1=_0x152c35;this[_0x453bd1(0x10c)](_0x456b9a,_0x3d0986),this[_0x453bd1(0x1ad)](_0x456b9a,_0x3d0986),this[_0x453bd1(0x161)](_0x456b9a,_0x3d0986),this[_0x453bd1(0xd7)](_0x456b9a,_0x3d0986);}[_0x152c35(0x10c)](_0x53ba0b,_0xdeac0f){}[_0x152c35(0x1ad)](_0x5f3b60,_0x37b010){}[_0x152c35(0x197)](_0x50269e,_0x401f62){}[_0x152c35(0xe1)](_0x3eb07c){var _0x4f1a37=_0x152c35;return _0x3eb07c===this[_0x4f1a37(0xef)];}[_0x152c35(0x119)](_0x382197,_0x52fbdc){var _0x3d0ecf=_0x152c35;this[_0x3d0ecf(0x197)](_0x382197,_0x52fbdc),this[_0x3d0ecf(0x116)](_0x382197),_0x52fbdc['sortProps']&&this['_sortProps'](_0x382197),this[_0x3d0ecf(0x19c)](_0x382197,_0x52fbdc),this['_addLoadNode'](_0x382197,_0x52fbdc),this[_0x3d0ecf(0x131)](_0x382197);}[_0x152c35(0xd4)](_0x26de71,_0x3e8773){var _0x8e5bcd=_0x152c35;let _0x14d771;try{_0xf58fe9[_0x8e5bcd(0x158)]&&(_0x14d771=_0xf58fe9[_0x8e5bcd(0x158)]['error'],_0xf58fe9[_0x8e5bcd(0x158)][_0x8e5bcd(0xcd)]=function(){}),_0x26de71&&typeof _0x26de71[_0x8e5bcd(0x15c)]=='number'&&(_0x3e8773[_0x8e5bcd(0x15c)]=_0x26de71[_0x8e5bcd(0x15c)]);}catch{}finally{_0x14d771&&(_0xf58fe9[_0x8e5bcd(0x158)][_0x8e5bcd(0xcd)]=_0x14d771);}if(_0x3e8773['type']===_0x8e5bcd(0xe6)||_0x3e8773[_0x8e5bcd(0xf6)]==='Number'){if(isNaN(_0x3e8773[_0x8e5bcd(0x156)]))_0x3e8773[_0x8e5bcd(0x12c)]=!0x0,delete _0x3e8773['value'];else switch(_0x3e8773[_0x8e5bcd(0x156)]){case Number['POSITIVE_INFINITY']:_0x3e8773[_0x8e5bcd(0xdb)]=!0x0,delete _0x3e8773[_0x8e5bcd(0x156)];break;case Number[_0x8e5bcd(0xff)]:_0x3e8773[_0x8e5bcd(0x120)]=!0x0,delete _0x3e8773[_0x8e5bcd(0x156)];break;case 0x0:this[_0x8e5bcd(0x1aa)](_0x3e8773[_0x8e5bcd(0x156)])&&(_0x3e8773[_0x8e5bcd(0xee)]=!0x0);break;}}else _0x3e8773[_0x8e5bcd(0xf6)]===_0x8e5bcd(0x16b)&&typeof _0x26de71[_0x8e5bcd(0x145)]==_0x8e5bcd(0xf4)&&_0x26de71[_0x8e5bcd(0x145)]&&_0x3e8773[_0x8e5bcd(0x145)]&&_0x26de71['name']!==_0x3e8773['name']&&(_0x3e8773['funcName']=_0x26de71[_0x8e5bcd(0x145)]);}[_0x152c35(0x1aa)](_0x4c8aa0){var _0x7d4f2c=_0x152c35;return 0x1/_0x4c8aa0===Number[_0x7d4f2c(0xff)];}[_0x152c35(0x10f)](_0x15e714){var _0x122705=_0x152c35;!_0x15e714[_0x122705(0x186)]||!_0x15e714[_0x122705(0x186)][_0x122705(0x15c)]||_0x15e714['type']===_0x122705(0xed)||_0x15e714[_0x122705(0xf6)]==='Map'||_0x15e714[_0x122705(0xf6)]===_0x122705(0x104)||_0x15e714[_0x122705(0x186)][_0x122705(0xc2)](function(_0xae23c2,_0x3b0111){var _0x3afb32=_0x122705,_0x468bbb=_0xae23c2[_0x3afb32(0x145)][_0x3afb32(0x13f)](),_0x282a29=_0x3b0111[_0x3afb32(0x145)][_0x3afb32(0x13f)]();return _0x468bbb<_0x282a29?-0x1:_0x468bbb>_0x282a29?0x1:0x0;});}[_0x152c35(0x19c)](_0x1ba91d,_0x3da676){var _0x7bef64=_0x152c35;if(!(_0x3da676[_0x7bef64(0x167)]||!_0x1ba91d['props']||!_0x1ba91d[_0x7bef64(0x186)][_0x7bef64(0x15c)])){for(var _0x29ff4e=[],_0x533ad1=[],_0x928b11=0x0,_0x43e85e=_0x1ba91d['props'][_0x7bef64(0x15c)];_0x928b11<_0x43e85e;_0x928b11++){var _0x7f7e8b=_0x1ba91d[_0x7bef64(0x186)][_0x928b11];_0x7f7e8b['type']===_0x7bef64(0x16b)?_0x29ff4e[_0x7bef64(0x11b)](_0x7f7e8b):_0x533ad1[_0x7bef64(0x11b)](_0x7f7e8b);}if(!(!_0x533ad1['length']||_0x29ff4e['length']<=0x1)){_0x1ba91d[_0x7bef64(0x186)]=_0x533ad1;var _0x4aee18={'functionsNode':!0x0,'props':_0x29ff4e};this[_0x7bef64(0x10c)](_0x4aee18,_0x3da676),this[_0x7bef64(0x197)](_0x4aee18,_0x3da676),this[_0x7bef64(0x116)](_0x4aee18),this['_setNodePermissions'](_0x4aee18,_0x3da676),_0x4aee18['id']+='\\x20f',_0x1ba91d[_0x7bef64(0x186)][_0x7bef64(0x18e)](_0x4aee18);}}}[_0x152c35(0x111)](_0x369f19,_0x5464f4){}['_setNodeExpandableState'](_0x4e353f){}[_0x152c35(0x132)](_0x11f5bf){var _0x3d71f0=_0x152c35;return Array['isArray'](_0x11f5bf)||typeof _0x11f5bf==_0x3d71f0(0x11e)&&this[_0x3d71f0(0x164)](_0x11f5bf)==='[object\\x20Array]';}[_0x152c35(0xd7)](_0x5bc4db,_0x372fd1){}[_0x152c35(0x131)](_0x4847dc){var _0x36dc53=_0x152c35;delete _0x4847dc[_0x36dc53(0xf8)],delete _0x4847dc[_0x36dc53(0x1a9)],delete _0x4847dc[_0x36dc53(0x122)];}[_0x152c35(0x161)](_0x257e1b,_0x2f8537){}}let _0x3005ae=new _0x47cb83(),_0xce2a27={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x3a0eae={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x383570(_0x56abb4,_0x2cd45b,_0x11fe35,_0x540062,_0x190e1f,_0x5c79a2){var _0x1dbf2a=_0x152c35;let _0x475d8f,_0x1175b7;try{_0x1175b7=_0x1c8ce1(),_0x475d8f=_0x40faa6[_0x2cd45b],!_0x475d8f||_0x1175b7-_0x475d8f['ts']>0x1f4&&_0x475d8f['count']&&_0x475d8f[_0x1dbf2a(0xec)]/_0x475d8f[_0x1dbf2a(0xfc)]<0x64?(_0x40faa6[_0x2cd45b]=_0x475d8f={'count':0x0,'time':0x0,'ts':_0x1175b7},_0x40faa6[_0x1dbf2a(0x17e)]={}):_0x1175b7-_0x40faa6[_0x1dbf2a(0x17e)]['ts']>0x32&&_0x40faa6[_0x1dbf2a(0x17e)][_0x1dbf2a(0xfc)]&&_0x40faa6[_0x1dbf2a(0x17e)]['time']/_0x40faa6['hits'][_0x1dbf2a(0xfc)]<0x64&&(_0x40faa6['hits']={});let _0x33a871=[],_0x943eec=_0x475d8f[_0x1dbf2a(0x148)]||_0x40faa6['hits'][_0x1dbf2a(0x148)]?_0x3a0eae:_0xce2a27,_0x2039dd=_0x2186a5=>{var _0x4ee016=_0x1dbf2a;let _0x20f701={};return _0x20f701[_0x4ee016(0x186)]=_0x2186a5[_0x4ee016(0x186)],_0x20f701[_0x4ee016(0xea)]=_0x2186a5[_0x4ee016(0xea)],_0x20f701[_0x4ee016(0xfb)]=_0x2186a5[_0x4ee016(0xfb)],_0x20f701[_0x4ee016(0x1a4)]=_0x2186a5[_0x4ee016(0x1a4)],_0x20f701[_0x4ee016(0x157)]=_0x2186a5[_0x4ee016(0x157)],_0x20f701['autoExpandMaxDepth']=_0x2186a5[_0x4ee016(0xeb)],_0x20f701['sortProps']=!0x1,_0x20f701[_0x4ee016(0x167)]=!_0x44d944,_0x20f701[_0x4ee016(0x195)]=0x1,_0x20f701[_0x4ee016(0x181)]=0x0,_0x20f701[_0x4ee016(0x165)]=_0x4ee016(0x110),_0x20f701['rootExpression']='root_exp',_0x20f701['autoExpand']=!0x0,_0x20f701['autoExpandPreviousObjects']=[],_0x20f701[_0x4ee016(0x138)]=0x0,_0x20f701['resolveGetters']=!0x0,_0x20f701[_0x4ee016(0xc0)]=0x0,_0x20f701[_0x4ee016(0x12d)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x20f701;};for(var _0x5c221e=0x0;_0x5c221e<_0x190e1f[_0x1dbf2a(0x15c)];_0x5c221e++)_0x33a871[_0x1dbf2a(0x11b)](_0x3005ae[_0x1dbf2a(0x187)]({'timeNode':_0x56abb4===_0x1dbf2a(0xec)||void 0x0},_0x190e1f[_0x5c221e],_0x2039dd(_0x943eec),{}));if(_0x56abb4===_0x1dbf2a(0x13a)){let _0x355e67=Error['stackTraceLimit'];try{Error[_0x1dbf2a(0xbd)]=0x1/0x0,_0x33a871[_0x1dbf2a(0x11b)](_0x3005ae[_0x1dbf2a(0x187)]({'stackNode':!0x0},new Error()[_0x1dbf2a(0x192)],_0x2039dd(_0x943eec),{'strLength':0x1/0x0}));}finally{Error[_0x1dbf2a(0xbd)]=_0x355e67;}}return{'method':_0x1dbf2a(0x1a7),'version':_0x237232,'args':[{'ts':_0x11fe35,'session':_0x540062,'args':_0x33a871,'id':_0x2cd45b,'context':_0x5c79a2}]};}catch(_0x46af4e){return{'method':_0x1dbf2a(0x1a7),'version':_0x237232,'args':[{'ts':_0x11fe35,'session':_0x540062,'args':[{'type':_0x1dbf2a(0xcf),'error':_0x46af4e&&_0x46af4e[_0x1dbf2a(0x17a)]}],'id':_0x2cd45b,'context':_0x5c79a2}]};}finally{try{if(_0x475d8f&&_0x1175b7){let _0x2e07d2=_0x1c8ce1();_0x475d8f[_0x1dbf2a(0xfc)]++,_0x475d8f[_0x1dbf2a(0xec)]+=_0x550e7d(_0x1175b7,_0x2e07d2),_0x475d8f['ts']=_0x2e07d2,_0x40faa6[_0x1dbf2a(0x17e)][_0x1dbf2a(0xfc)]++,_0x40faa6[_0x1dbf2a(0x17e)][_0x1dbf2a(0xec)]+=_0x550e7d(_0x1175b7,_0x2e07d2),_0x40faa6['hits']['ts']=_0x2e07d2,(_0x475d8f[_0x1dbf2a(0xfc)]>0x32||_0x475d8f[_0x1dbf2a(0xec)]>0x64)&&(_0x475d8f[_0x1dbf2a(0x148)]=!0x0),(_0x40faa6['hits'][_0x1dbf2a(0xfc)]>0x3e8||_0x40faa6[_0x1dbf2a(0x17e)]['time']>0x12c)&&(_0x40faa6['hits'][_0x1dbf2a(0x148)]=!0x0);}}catch{}}}return _0x383570;}((_0x5f3f47,_0xa77727,_0x565a59,_0x1846b1,_0xa65fff,_0x2db2ce,_0x1a2525,_0x4eba9f,_0x41adda,_0x55df61,_0x1ac434)=>{var _0x142687=_0x476a4e;if(_0x5f3f47[_0x142687(0x13c)])return _0x5f3f47[_0x142687(0x13c)];if(!X(_0x5f3f47,_0x4eba9f,_0xa65fff))return _0x5f3f47[_0x142687(0x13c)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x5f3f47[_0x142687(0x13c)];let _0xf80f9a=b(_0x5f3f47),_0x5a1745=_0xf80f9a[_0x142687(0x15e)],_0x11a439=_0xf80f9a['timeStamp'],_0x4ca943=_0xf80f9a[_0x142687(0x153)],_0x57fbf8={'hits':{},'ts':{}},_0xf10ad5=H(_0x5f3f47,_0x41adda,_0x57fbf8,_0x2db2ce),_0x12c810=_0x1b693b=>{_0x57fbf8['ts'][_0x1b693b]=_0x11a439();},_0x75a32f=(_0x46220d,_0x4a8aba)=>{var _0x2f6f9e=_0x142687;let _0x695bb2=_0x57fbf8['ts'][_0x4a8aba];if(delete _0x57fbf8['ts'][_0x4a8aba],_0x695bb2){let _0x5d423f=_0x5a1745(_0x695bb2,_0x11a439());_0x204d0a(_0xf10ad5(_0x2f6f9e(0xec),_0x46220d,_0x4ca943(),_0x2fc2b8,[_0x5d423f],_0x4a8aba));}},_0x1beb03=_0x2f41f5=>(_0xa65fff===_0x142687(0x168)&&_0x5f3f47[_0x142687(0x159)]&&_0x2f41f5?.[_0x142687(0x18a)]?.[_0x142687(0x15c)]&&(_0x2f41f5['args'][0x0][_0x142687(0x159)]=_0x5f3f47[_0x142687(0x159)]),_0x2f41f5);_0x5f3f47['_console_ninja']={'consoleLog':(_0x23a305,_0x1c15d3)=>{var _0x56f9e6=_0x142687;_0x5f3f47[_0x56f9e6(0x158)][_0x56f9e6(0x1a7)]['name']!==_0x56f9e6(0x107)&&_0x204d0a(_0xf10ad5(_0x56f9e6(0x1a7),_0x23a305,_0x4ca943(),_0x2fc2b8,_0x1c15d3));},'consoleTrace':(_0x2bcc3b,_0x139980)=>{var _0x174978=_0x142687;_0x5f3f47['console'][_0x174978(0x1a7)]['name']!=='disabledTrace'&&_0x204d0a(_0x1beb03(_0xf10ad5(_0x174978(0x13a),_0x2bcc3b,_0x4ca943(),_0x2fc2b8,_0x139980)));},'consoleTime':_0x170d2b=>{_0x12c810(_0x170d2b);},'consoleTimeEnd':(_0x547d67,_0xae1ee5)=>{_0x75a32f(_0xae1ee5,_0x547d67);},'autoLog':(_0x2ff22c,_0x151de3)=>{var _0x572064=_0x142687;_0x204d0a(_0xf10ad5(_0x572064(0x1a7),_0x151de3,_0x4ca943(),_0x2fc2b8,[_0x2ff22c]));},'autoLogMany':(_0x39c28e,_0x3b38c6)=>{_0x204d0a(_0xf10ad5('log',_0x39c28e,_0x4ca943(),_0x2fc2b8,_0x3b38c6));},'autoTrace':(_0x209faf,_0x124a94)=>{var _0x2a94fe=_0x142687;_0x204d0a(_0x1beb03(_0xf10ad5(_0x2a94fe(0x13a),_0x124a94,_0x4ca943(),_0x2fc2b8,[_0x209faf])));},'autoTraceMany':(_0x51284a,_0x46d6f5)=>{_0x204d0a(_0x1beb03(_0xf10ad5('trace',_0x51284a,_0x4ca943(),_0x2fc2b8,_0x46d6f5)));},'autoTime':(_0x5b80d5,_0x3ea049,_0x4cf351)=>{_0x12c810(_0x4cf351);},'autoTimeEnd':(_0x5e8965,_0x335251,_0x52935c)=>{_0x75a32f(_0x335251,_0x52935c);},'coverage':_0x414851=>{_0x204d0a({'method':'coverage','version':_0x2db2ce,'args':[{'id':_0x414851}]});}};let _0x204d0a=q(_0x5f3f47,_0xa77727,_0x565a59,_0x1846b1,_0xa65fff,_0x55df61,_0x1ac434),_0x2fc2b8=_0x5f3f47[_0x142687(0x185)];return _0x5f3f47[_0x142687(0x13c)];})(globalThis,'127.0.0.1','49887',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.317\\\\node_modules\",_0x476a4e(0x1ab),_0x476a4e(0x12a),_0x476a4e(0x190),_0x476a4e(0xf1),'',_0x476a4e(0x108),_0x476a4e(0x170));");
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