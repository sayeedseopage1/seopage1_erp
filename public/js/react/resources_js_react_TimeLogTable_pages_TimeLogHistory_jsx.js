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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x2e24ba=_0xee6b;(function(_0x291420,_0x3309cc){var _0x1fe65b=_0xee6b,_0x411fd0=_0x291420();while(!![]){try{var _0x171908=parseInt(_0x1fe65b(0x10b))/0x1*(-parseInt(_0x1fe65b(0x1ce))/0x2)+-parseInt(_0x1fe65b(0xf6))/0x3+-parseInt(_0x1fe65b(0x1c9))/0x4+-parseInt(_0x1fe65b(0x148))/0x5*(parseInt(_0x1fe65b(0x1b4))/0x6)+-parseInt(_0x1fe65b(0x19b))/0x7+parseInt(_0x1fe65b(0x1c3))/0x8*(-parseInt(_0x1fe65b(0x1af))/0x9)+parseInt(_0x1fe65b(0x199))/0xa;if(_0x171908===_0x3309cc)break;else _0x411fd0['push'](_0x411fd0['shift']());}catch(_0x1aead5){_0x411fd0['push'](_0x411fd0['shift']());}}}(_0x4901,0xcf2a9));var j=Object[_0x2e24ba(0x16b)],H=Object[_0x2e24ba(0x133)],G=Object['getOwnPropertyDescriptor'],ee=Object['getOwnPropertyNames'],te=Object[_0x2e24ba(0x1b7)],ne=Object[_0x2e24ba(0x12b)]['hasOwnProperty'],re=(_0x34cacc,_0x183fea,_0x26fbe8,_0x17bc14)=>{var _0x19ba86=_0x2e24ba;if(_0x183fea&&typeof _0x183fea==_0x19ba86(0x132)||typeof _0x183fea==_0x19ba86(0xeb)){for(let _0x4378ad of ee(_0x183fea))!ne['call'](_0x34cacc,_0x4378ad)&&_0x4378ad!==_0x26fbe8&&H(_0x34cacc,_0x4378ad,{'get':()=>_0x183fea[_0x4378ad],'enumerable':!(_0x17bc14=G(_0x183fea,_0x4378ad))||_0x17bc14['enumerable']});}return _0x34cacc;},x=(_0x45ace7,_0x5e9687,_0x27c883)=>(_0x27c883=_0x45ace7!=null?j(te(_0x45ace7)):{},re(_0x5e9687||!_0x45ace7||!_0x45ace7[_0x2e24ba(0x1c4)]?H(_0x27c883,_0x2e24ba(0x15e),{'value':_0x45ace7,'enumerable':!0x0}):_0x27c883,_0x45ace7)),X=class{constructor(_0x347f8e,_0x5188e9,_0x3a2bdc,_0x2d5934,_0x4985cf){var _0x2f1a91=_0x2e24ba;this[_0x2f1a91(0x187)]=_0x347f8e,this[_0x2f1a91(0x12c)]=_0x5188e9,this[_0x2f1a91(0x168)]=_0x3a2bdc,this[_0x2f1a91(0x10d)]=_0x2d5934,this[_0x2f1a91(0x191)]=_0x4985cf,this['_allowedToSend']=!0x0,this[_0x2f1a91(0x1a8)]=!0x0,this[_0x2f1a91(0x1d5)]=!0x1,this[_0x2f1a91(0x159)]=!0x1,this[_0x2f1a91(0x1d6)]=_0x347f8e[_0x2f1a91(0x11e)]?.['env']?.[_0x2f1a91(0x17f)]===_0x2f1a91(0x192),this[_0x2f1a91(0x149)]=!this[_0x2f1a91(0x187)][_0x2f1a91(0x11e)]?.[_0x2f1a91(0x12e)]?.['node']&&!this['_inNextEdge'],this[_0x2f1a91(0x141)]=null,this[_0x2f1a91(0x179)]=0x0,this['_maxConnectAttemptCount']=0x14,this['_webSocketErrorDocsLink']=_0x2f1a91(0x12f),this[_0x2f1a91(0xec)]=(this[_0x2f1a91(0x149)]?_0x2f1a91(0x1b1):_0x2f1a91(0xf3))+this[_0x2f1a91(0xef)];}async['getWebSocketClass'](){var _0x363037=_0x2e24ba;if(this[_0x363037(0x141)])return this[_0x363037(0x141)];let _0x35a1ae;if(this[_0x363037(0x149)]||this['_inNextEdge'])_0x35a1ae=this['global'][_0x363037(0x161)];else{if(this[_0x363037(0x187)]['process']?.[_0x363037(0x10f)])_0x35a1ae=this[_0x363037(0x187)][_0x363037(0x11e)]?.[_0x363037(0x10f)];else try{let _0x82e496=await import(_0x363037(0x1bf));_0x35a1ae=(await import((await import(_0x363037(0x183)))[_0x363037(0x167)](_0x82e496['join'](this[_0x363037(0x10d)],_0x363037(0x107)))[_0x363037(0x11c)]()))['default'];}catch{try{_0x35a1ae=require(require(_0x363037(0x1bf))['join'](this[_0x363037(0x10d)],'ws'));}catch{throw new Error('failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket');}}}return this[_0x363037(0x141)]=_0x35a1ae,_0x35a1ae;}[_0x2e24ba(0x16f)](){var _0x2aa3e0=_0x2e24ba;this[_0x2aa3e0(0x159)]||this[_0x2aa3e0(0x1d5)]||this['_connectAttemptCount']>=this[_0x2aa3e0(0x156)]||(this[_0x2aa3e0(0x1a8)]=!0x1,this[_0x2aa3e0(0x159)]=!0x0,this[_0x2aa3e0(0x179)]++,this[_0x2aa3e0(0x1cb)]=new Promise((_0x2ec6dd,_0x2cd7ce)=>{var _0x3abe6a=_0x2aa3e0;this[_0x3abe6a(0x1a9)]()[_0x3abe6a(0x15b)](_0x5be9fa=>{var _0x4f149b=_0x3abe6a;let _0x517bd4=new _0x5be9fa(_0x4f149b(0x19f)+(!this[_0x4f149b(0x149)]&&this[_0x4f149b(0x191)]?'gateway.docker.internal':this[_0x4f149b(0x12c)])+':'+this[_0x4f149b(0x168)]);_0x517bd4[_0x4f149b(0x1c8)]=()=>{var _0x3f42dc=_0x4f149b;this[_0x3f42dc(0x110)]=!0x1,this[_0x3f42dc(0x1bc)](_0x517bd4),this[_0x3f42dc(0x1ab)](),_0x2cd7ce(new Error('logger\\x20websocket\\x20error'));},_0x517bd4[_0x4f149b(0x13e)]=()=>{var _0x39de52=_0x4f149b;this[_0x39de52(0x149)]||_0x517bd4[_0x39de52(0x194)]&&_0x517bd4['_socket'][_0x39de52(0x157)]&&_0x517bd4[_0x39de52(0x194)]['unref'](),_0x2ec6dd(_0x517bd4);},_0x517bd4[_0x4f149b(0x16d)]=()=>{var _0x16e540=_0x4f149b;this[_0x16e540(0x1a8)]=!0x0,this[_0x16e540(0x1bc)](_0x517bd4),this['_attemptToReconnectShortly']();},_0x517bd4[_0x4f149b(0x1b3)]=_0x2a5496=>{var _0x12cb02=_0x4f149b;try{_0x2a5496&&_0x2a5496[_0x12cb02(0x106)]&&this['_inBrowser']&&JSON[_0x12cb02(0x181)](_0x2a5496[_0x12cb02(0x106)])[_0x12cb02(0x1cc)]===_0x12cb02(0x163)&&this['global']['location']['reload']();}catch{}};})['then'](_0x3ed227=>(this[_0x3abe6a(0x1d5)]=!0x0,this[_0x3abe6a(0x159)]=!0x1,this[_0x3abe6a(0x1a8)]=!0x1,this[_0x3abe6a(0x110)]=!0x0,this[_0x3abe6a(0x179)]=0x0,_0x3ed227))[_0x3abe6a(0x1a3)](_0x1080d3=>(this[_0x3abe6a(0x1d5)]=!0x1,this[_0x3abe6a(0x159)]=!0x1,console[_0x3abe6a(0x129)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x3abe6a(0xef)]),_0x2cd7ce(new Error('failed\\x20to\\x20connect\\x20to\\x20host:\\x20'+(_0x1080d3&&_0x1080d3[_0x3abe6a(0xf8)])))));}));}['_disposeWebsocket'](_0x22ae79){var _0x8a229=_0x2e24ba;this['_connected']=!0x1,this[_0x8a229(0x159)]=!0x1;try{_0x22ae79['onclose']=null,_0x22ae79[_0x8a229(0x1c8)]=null,_0x22ae79['onopen']=null;}catch{}try{_0x22ae79['readyState']<0x2&&_0x22ae79[_0x8a229(0x13b)]();}catch{}}[_0x2e24ba(0x1ab)](){var _0x47a306=_0x2e24ba;clearTimeout(this[_0x47a306(0x1b8)]),!(this[_0x47a306(0x179)]>=this[_0x47a306(0x156)])&&(this[_0x47a306(0x1b8)]=setTimeout(()=>{var _0x354400=_0x47a306;this['_connected']||this[_0x354400(0x159)]||(this[_0x354400(0x16f)](),this[_0x354400(0x1cb)]?.[_0x354400(0x1a3)](()=>this['_attemptToReconnectShortly']()));},0x1f4),this['_reconnectTimeout'][_0x47a306(0x157)]&&this[_0x47a306(0x1b8)][_0x47a306(0x157)]());}async[_0x2e24ba(0x1a1)](_0x5e5bc2){var _0x19ec6a=_0x2e24ba;try{if(!this[_0x19ec6a(0x110)])return;this[_0x19ec6a(0x1a8)]&&this[_0x19ec6a(0x16f)](),(await this[_0x19ec6a(0x1cb)])['send'](JSON['stringify'](_0x5e5bc2));}catch(_0x5694f1){console[_0x19ec6a(0x129)](this[_0x19ec6a(0xec)]+':\\x20'+(_0x5694f1&&_0x5694f1['message'])),this[_0x19ec6a(0x110)]=!0x1,this[_0x19ec6a(0x1ab)]();}}};function _0x4901(){var _0x1e4f10=['3065520uGpnsr','_sortProps','_ws','method','strLength','1492082ChbPjd','','elapsed','serialize','next.js','','Symbol','_connected','_inNextEdge','Map','_HTMLAllCollection','function','_sendErrorMessage','array','getOwnPropertySymbols','_webSocketErrorDocsLink','time','replace','totalStrLength','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','count','_console_ninja','1519746hoJGsM','location','message','_isSet','type','get','noFunctions','_hasSymbolPropertyOnItsPath','webpack','_property','call','string','_propertyName','_setNodeLabel','getOwnPropertyNames','angular','data','ws/index.js','stackTraceLimit','_consoleNinjaAllowedToStart','length','1sWrLui','constructor','nodeModules','name','_WebSocket','_allowedToSend','_getOwnPropertyDescriptor','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','_hasSetOnItsPath','timeStamp','_p_name','_blacklistedProperty','\\x20server','level','log','127.0.0.1','autoExpandMaxDepth','toString','hostname','process','[object\\x20Map]','Boolean','_addFunctionsNode','_setNodeExpandableState','cappedProps','49812','trace','node','_addProperty','expressionsToEvaluate','warn','reduceLimits','prototype','host','_isPrimitiveType','versions','https://tinyurl.com/37x8b79t','sortProps','_undefined','object','defineProperty','concat','cappedElements','value','bind','Buffer','toLowerCase','hits','close','boolean','number','onopen','performance','set','_WebSocketClass','negativeZero','disabledLog','autoExpandPreviousObjects','date','_console_ninja_session','slice','25DWzLAi','_inBrowser','_regExpToString','_isMap','astro','_setNodeId','[object\\x20Array]','funcName','_type','_addObjectProperty','valueOf','substr','console','_additionalMetadata','_maxConnectAttemptCount','unref','_cleanNode','_connecting','resolveGetters','then','disabledTrace','elements','default','_getOwnPropertyNames','_isUndefined','WebSocket','_numberRegExp','reload','unshift',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'isExpressionToEvaluate','pathToFileURL','port','_getOwnPropertySymbols','bigint','create','index','onclose','_processTreeNodeResult','_connectToHostNow','unknown','current','1711165101756','props','isArray','forEach','_setNodeExpressionPath','_p_','push','_connectAttemptCount','[object\\x20Date]','_isNegativeZero','test','_keyStrRegExp','_isArray','NEXT_RUNTIME','root_exp','parse','RegExp','url','\\x20browser','remix','parent','global','HTMLAllCollection','_quotedRegExp','_setNodePermissions','split','_Symbol','Error','expId','error','now','dockerizedApp','edge','_objectToString','_socket','nan','null','nuxt','timeEnd','65242850vxtNyG','_p_length','7997346RsfJyD','includes','match','autoExpandPropertyCount','ws://','_capIfString','send','autoExpand','catch','_addLoadNode','1.0.0',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.294\\\\node_modules\",'Number','_allowedToConnectOnSend','getWebSocketClass','_treeNodePropertiesAfterFullValue','_attemptToReconnectShortly','_isPrimitiveWrapperType','hrtime','depth','201321asifbp','allStrLength','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','_treeNodePropertiesBeforeFullValue','onmessage','1030734WLbPGD','_dateToString','capped','getPrototypeOf','_reconnectTimeout','_setNodeQueryPath','positiveInfinity','Set','_disposeWebsocket','undefined','setter','path','POSITIVE_INFINITY','autoExpandLimit','pop','592FQDstf','__es'+'Module','coverage','symbol','stringify','onerror'];_0x4901=function(){return _0x1e4f10;};return _0x4901();}function b(_0x2df425,_0x5d6bfb,_0x2d5268,_0x58abd3,_0x3c1d55,_0x2f6a2c){var _0x4766aa=_0x2e24ba;let _0x3a50a4=_0x2d5268['split'](',')['map'](_0x2ae089=>{var _0x5e91ba=_0xee6b;try{_0x2df425['_console_ninja_session']||((_0x3c1d55===_0x5e91ba(0x1d2)||_0x3c1d55===_0x5e91ba(0x185)||_0x3c1d55===_0x5e91ba(0x14c)||_0x3c1d55===_0x5e91ba(0x105))&&(_0x3c1d55+=!_0x2df425[_0x5e91ba(0x11e)]?.[_0x5e91ba(0x12e)]?.[_0x5e91ba(0x126)]&&_0x2df425[_0x5e91ba(0x11e)]?.['env']?.['NEXT_RUNTIME']!==_0x5e91ba(0x192)?_0x5e91ba(0x184):_0x5e91ba(0x117)),_0x2df425['_console_ninja_session']={'id':+new Date(),'tool':_0x3c1d55});let _0x33c8d2=new X(_0x2df425,_0x5d6bfb,_0x2ae089,_0x58abd3,_0x2f6a2c);return _0x33c8d2[_0x5e91ba(0x1a1)][_0x5e91ba(0x137)](_0x33c8d2);}catch(_0x3e1c86){return console[_0x5e91ba(0x129)](_0x5e91ba(0x112),_0x3e1c86&&_0x3e1c86[_0x5e91ba(0xf8)]),()=>{};}});return _0x4dece3=>_0x3a50a4[_0x4766aa(0x175)](_0x19522a=>_0x19522a(_0x4dece3));}function W(_0x39fa15){var _0x56ff98=_0x2e24ba;let _0x1d5635=function(_0x5b2e8e,_0x17da4d){return _0x17da4d-_0x5b2e8e;},_0x1967d2;if(_0x39fa15[_0x56ff98(0x13f)])_0x1967d2=function(){var _0x5b9982=_0x56ff98;return _0x39fa15[_0x5b9982(0x13f)][_0x5b9982(0x190)]();};else{if(_0x39fa15[_0x56ff98(0x11e)]&&_0x39fa15['process'][_0x56ff98(0x1ad)]&&_0x39fa15[_0x56ff98(0x11e)]?.['env']?.[_0x56ff98(0x17f)]!==_0x56ff98(0x192))_0x1967d2=function(){var _0x13fd6c=_0x56ff98;return _0x39fa15[_0x13fd6c(0x11e)]['hrtime']();},_0x1d5635=function(_0x691495,_0x16c68a){return 0x3e8*(_0x16c68a[0x0]-_0x691495[0x0])+(_0x16c68a[0x1]-_0x691495[0x1])/0xf4240;};else try{let {performance:_0x4d943e}=require('perf_hooks');_0x1967d2=function(){return _0x4d943e['now']();};}catch{_0x1967d2=function(){return+new Date();};}}return{'elapsed':_0x1d5635,'timeStamp':_0x1967d2,'now':()=>Date[_0x56ff98(0x190)]()};}function J(_0xa734b3,_0x2423b0,_0x532058){var _0x4cd007=_0x2e24ba;if(_0xa734b3[_0x4cd007(0x109)]!==void 0x0)return _0xa734b3['_consoleNinjaAllowedToStart'];let _0x17e52a=_0xa734b3[_0x4cd007(0x11e)]?.['versions']?.['node']||_0xa734b3[_0x4cd007(0x11e)]?.['env']?.[_0x4cd007(0x17f)]===_0x4cd007(0x192);return _0x17e52a&&_0x532058===_0x4cd007(0x197)?_0xa734b3[_0x4cd007(0x109)]=!0x1:_0xa734b3[_0x4cd007(0x109)]=_0x17e52a||!_0x2423b0||_0xa734b3[_0x4cd007(0xf7)]?.[_0x4cd007(0x11d)]&&_0x2423b0[_0x4cd007(0x19c)](_0xa734b3['location'][_0x4cd007(0x11d)]),_0xa734b3[_0x4cd007(0x109)];}function _0xee6b(_0x6fef8b,_0x2619fb){var _0x4901a=_0x4901();return _0xee6b=function(_0xee6b27,_0x3f29f2){_0xee6b27=_0xee6b27-0xea;var _0x47a327=_0x4901a[_0xee6b27];return _0x47a327;},_0xee6b(_0x6fef8b,_0x2619fb);}function Y(_0x461137,_0x2d3424,_0x14e307,_0x523118){var _0x3cc829=_0x2e24ba;_0x461137=_0x461137,_0x2d3424=_0x2d3424,_0x14e307=_0x14e307,_0x523118=_0x523118;let _0x38792b=W(_0x461137),_0x47dc2a=_0x38792b[_0x3cc829(0x1d0)],_0x302909=_0x38792b[_0x3cc829(0x114)];class _0x4f36eb{constructor(){var _0xccb24e=_0x3cc829;this[_0xccb24e(0x17d)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0xccb24e(0x162)]=/^(0|[1-9][0-9]*)$/,this[_0xccb24e(0x189)]=/'([^\\\\']|\\\\')*'/,this[_0xccb24e(0x131)]=_0x461137[_0xccb24e(0x1bd)],this[_0xccb24e(0xea)]=_0x461137[_0xccb24e(0x188)],this[_0xccb24e(0x111)]=Object['getOwnPropertyDescriptor'],this[_0xccb24e(0x15f)]=Object[_0xccb24e(0x104)],this[_0xccb24e(0x18c)]=_0x461137[_0xccb24e(0x1d4)],this[_0xccb24e(0x14a)]=RegExp['prototype'][_0xccb24e(0x11c)],this[_0xccb24e(0x1b5)]=Date[_0xccb24e(0x12b)][_0xccb24e(0x11c)];}[_0x3cc829(0x1d1)](_0x2f5e4c,_0x31cbba,_0x51fe4d,_0x559a9e){var _0x127775=_0x3cc829,_0x552cca=this,_0x1d4b9f=_0x51fe4d[_0x127775(0x1a2)];function _0x4ee347(_0x17afef,_0x324933,_0x470e3c){var _0x2b979c=_0x127775;_0x324933['type']=_0x2b979c(0x170),_0x324933['error']=_0x17afef[_0x2b979c(0xf8)],_0x3ec831=_0x470e3c[_0x2b979c(0x126)]['current'],_0x470e3c['node'][_0x2b979c(0x171)]=_0x324933,_0x552cca[_0x2b979c(0x1b2)](_0x324933,_0x470e3c);}try{_0x51fe4d[_0x127775(0x118)]++,_0x51fe4d['autoExpand']&&_0x51fe4d[_0x127775(0x144)][_0x127775(0x178)](_0x31cbba);var _0x35d448,_0x25330e,_0x57199d,_0x349cb8,_0x27b808=[],_0x36e963=[],_0x12c143,_0x502b2d=this['_type'](_0x31cbba),_0x2468d8=_0x502b2d===_0x127775(0xed),_0x231f3c=!0x1,_0x540b57=_0x502b2d===_0x127775(0xeb),_0xa5d0ca=this[_0x127775(0x12d)](_0x502b2d),_0x1f7b23=this[_0x127775(0x1ac)](_0x502b2d),_0x590bc0=_0xa5d0ca||_0x1f7b23,_0x5d228c={},_0x1676a7=0x0,_0x4384bf=!0x1,_0x3ec831,_0x2f31c7=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x51fe4d[_0x127775(0x1ae)]){if(_0x2468d8){if(_0x25330e=_0x31cbba[_0x127775(0x10a)],_0x25330e>_0x51fe4d['elements']){for(_0x57199d=0x0,_0x349cb8=_0x51fe4d['elements'],_0x35d448=_0x57199d;_0x35d448<_0x349cb8;_0x35d448++)_0x36e963[_0x127775(0x178)](_0x552cca[_0x127775(0x127)](_0x27b808,_0x31cbba,_0x502b2d,_0x35d448,_0x51fe4d));_0x2f5e4c[_0x127775(0x135)]=!0x0;}else{for(_0x57199d=0x0,_0x349cb8=_0x25330e,_0x35d448=_0x57199d;_0x35d448<_0x349cb8;_0x35d448++)_0x36e963[_0x127775(0x178)](_0x552cca['_addProperty'](_0x27b808,_0x31cbba,_0x502b2d,_0x35d448,_0x51fe4d));}_0x51fe4d[_0x127775(0x19e)]+=_0x36e963['length'];}if(!(_0x502b2d==='null'||_0x502b2d==='undefined')&&!_0xa5d0ca&&_0x502b2d!=='String'&&_0x502b2d!==_0x127775(0x138)&&_0x502b2d!=='bigint'){var _0x3b8006=_0x559a9e[_0x127775(0x173)]||_0x51fe4d[_0x127775(0x173)];if(this[_0x127775(0xf9)](_0x31cbba)?(_0x35d448=0x0,_0x31cbba[_0x127775(0x175)](function(_0x4207f4){var _0x54f7c3=_0x127775;if(_0x1676a7++,_0x51fe4d[_0x54f7c3(0x19e)]++,_0x1676a7>_0x3b8006){_0x4384bf=!0x0;return;}if(!_0x51fe4d[_0x54f7c3(0x166)]&&_0x51fe4d['autoExpand']&&_0x51fe4d[_0x54f7c3(0x19e)]>_0x51fe4d['autoExpandLimit']){_0x4384bf=!0x0;return;}_0x36e963[_0x54f7c3(0x178)](_0x552cca[_0x54f7c3(0x127)](_0x27b808,_0x31cbba,_0x54f7c3(0x1bb),_0x35d448++,_0x51fe4d,function(_0x4b3ee6){return function(){return _0x4b3ee6;};}(_0x4207f4)));})):this[_0x127775(0x14b)](_0x31cbba)&&_0x31cbba['forEach'](function(_0x254acc,_0x5ce972){var _0x122111=_0x127775;if(_0x1676a7++,_0x51fe4d['autoExpandPropertyCount']++,_0x1676a7>_0x3b8006){_0x4384bf=!0x0;return;}if(!_0x51fe4d['isExpressionToEvaluate']&&_0x51fe4d[_0x122111(0x1a2)]&&_0x51fe4d['autoExpandPropertyCount']>_0x51fe4d[_0x122111(0x1c1)]){_0x4384bf=!0x0;return;}var _0x507f63=_0x5ce972[_0x122111(0x11c)]();_0x507f63['length']>0x64&&(_0x507f63=_0x507f63[_0x122111(0x147)](0x0,0x64)+'...'),_0x36e963['push'](_0x552cca[_0x122111(0x127)](_0x27b808,_0x31cbba,_0x122111(0x1d7),_0x507f63,_0x51fe4d,function(_0x489c80){return function(){return _0x489c80;};}(_0x254acc)));}),!_0x231f3c){try{for(_0x12c143 in _0x31cbba)if(!(_0x2468d8&&_0x2f31c7[_0x127775(0x17c)](_0x12c143))&&!this['_blacklistedProperty'](_0x31cbba,_0x12c143,_0x51fe4d)){if(_0x1676a7++,_0x51fe4d[_0x127775(0x19e)]++,_0x1676a7>_0x3b8006){_0x4384bf=!0x0;break;}if(!_0x51fe4d['isExpressionToEvaluate']&&_0x51fe4d['autoExpand']&&_0x51fe4d['autoExpandPropertyCount']>_0x51fe4d[_0x127775(0x1c1)]){_0x4384bf=!0x0;break;}_0x36e963[_0x127775(0x178)](_0x552cca[_0x127775(0x151)](_0x27b808,_0x5d228c,_0x31cbba,_0x502b2d,_0x12c143,_0x51fe4d));}}catch{}if(_0x5d228c[_0x127775(0x19a)]=!0x0,_0x540b57&&(_0x5d228c[_0x127775(0x115)]=!0x0),!_0x4384bf){var _0xd14c5c=[][_0x127775(0x134)](this['_getOwnPropertyNames'](_0x31cbba))[_0x127775(0x134)](this[_0x127775(0x169)](_0x31cbba));for(_0x35d448=0x0,_0x25330e=_0xd14c5c[_0x127775(0x10a)];_0x35d448<_0x25330e;_0x35d448++)if(_0x12c143=_0xd14c5c[_0x35d448],!(_0x2468d8&&_0x2f31c7[_0x127775(0x17c)](_0x12c143[_0x127775(0x11c)]()))&&!this['_blacklistedProperty'](_0x31cbba,_0x12c143,_0x51fe4d)&&!_0x5d228c[_0x127775(0x177)+_0x12c143['toString']()]){if(_0x1676a7++,_0x51fe4d['autoExpandPropertyCount']++,_0x1676a7>_0x3b8006){_0x4384bf=!0x0;break;}if(!_0x51fe4d[_0x127775(0x166)]&&_0x51fe4d[_0x127775(0x1a2)]&&_0x51fe4d[_0x127775(0x19e)]>_0x51fe4d[_0x127775(0x1c1)]){_0x4384bf=!0x0;break;}_0x36e963[_0x127775(0x178)](_0x552cca[_0x127775(0x151)](_0x27b808,_0x5d228c,_0x31cbba,_0x502b2d,_0x12c143,_0x51fe4d));}}}}}if(_0x2f5e4c['type']=_0x502b2d,_0x590bc0?(_0x2f5e4c[_0x127775(0x136)]=_0x31cbba[_0x127775(0x152)](),this[_0x127775(0x1a0)](_0x502b2d,_0x2f5e4c,_0x51fe4d,_0x559a9e)):_0x502b2d===_0x127775(0x145)?_0x2f5e4c['value']=this[_0x127775(0x1b5)]['call'](_0x31cbba):_0x502b2d===_0x127775(0x16a)?_0x2f5e4c[_0x127775(0x136)]=_0x31cbba[_0x127775(0x11c)]():_0x502b2d===_0x127775(0x182)?_0x2f5e4c['value']=this[_0x127775(0x14a)][_0x127775(0x100)](_0x31cbba):_0x502b2d===_0x127775(0x1c6)&&this['_Symbol']?_0x2f5e4c[_0x127775(0x136)]=this[_0x127775(0x18c)][_0x127775(0x12b)][_0x127775(0x11c)][_0x127775(0x100)](_0x31cbba):!_0x51fe4d[_0x127775(0x1ae)]&&!(_0x502b2d===_0x127775(0x196)||_0x502b2d==='undefined')&&(delete _0x2f5e4c[_0x127775(0x136)],_0x2f5e4c['capped']=!0x0),_0x4384bf&&(_0x2f5e4c[_0x127775(0x123)]=!0x0),_0x3ec831=_0x51fe4d[_0x127775(0x126)][_0x127775(0x171)],_0x51fe4d[_0x127775(0x126)][_0x127775(0x171)]=_0x2f5e4c,this[_0x127775(0x1b2)](_0x2f5e4c,_0x51fe4d),_0x36e963[_0x127775(0x10a)]){for(_0x35d448=0x0,_0x25330e=_0x36e963['length'];_0x35d448<_0x25330e;_0x35d448++)_0x36e963[_0x35d448](_0x35d448);}_0x27b808['length']&&(_0x2f5e4c[_0x127775(0x173)]=_0x27b808);}catch(_0x311d90){_0x4ee347(_0x311d90,_0x2f5e4c,_0x51fe4d);}return this[_0x127775(0x155)](_0x31cbba,_0x2f5e4c),this['_treeNodePropertiesAfterFullValue'](_0x2f5e4c,_0x51fe4d),_0x51fe4d['node'][_0x127775(0x171)]=_0x3ec831,_0x51fe4d[_0x127775(0x118)]--,_0x51fe4d[_0x127775(0x1a2)]=_0x1d4b9f,_0x51fe4d[_0x127775(0x1a2)]&&_0x51fe4d['autoExpandPreviousObjects'][_0x127775(0x1c2)](),_0x2f5e4c;}[_0x3cc829(0x169)](_0x1a3d65){var _0x2171e6=_0x3cc829;return Object[_0x2171e6(0xee)]?Object[_0x2171e6(0xee)](_0x1a3d65):[];}[_0x3cc829(0xf9)](_0xdeaa20){var _0x5a8d78=_0x3cc829;return!!(_0xdeaa20&&_0x461137['Set']&&this[_0x5a8d78(0x193)](_0xdeaa20)==='[object\\x20Set]'&&_0xdeaa20[_0x5a8d78(0x175)]);}[_0x3cc829(0x116)](_0x531384,_0x204c91,_0x546d6b){var _0x50dcae=_0x3cc829;return _0x546d6b[_0x50dcae(0xfc)]?typeof _0x531384[_0x204c91]==_0x50dcae(0xeb):!0x1;}[_0x3cc829(0x150)](_0x304788){var _0x57c874=_0x3cc829,_0x5efb9e='';return _0x5efb9e=typeof _0x304788,_0x5efb9e===_0x57c874(0x132)?this[_0x57c874(0x193)](_0x304788)==='[object\\x20Array]'?_0x5efb9e=_0x57c874(0xed):this[_0x57c874(0x193)](_0x304788)===_0x57c874(0x17a)?_0x5efb9e=_0x57c874(0x145):this[_0x57c874(0x193)](_0x304788)==='[object\\x20BigInt]'?_0x5efb9e='bigint':_0x304788===null?_0x5efb9e=_0x57c874(0x196):_0x304788[_0x57c874(0x10c)]&&(_0x5efb9e=_0x304788['constructor'][_0x57c874(0x10e)]||_0x5efb9e):_0x5efb9e===_0x57c874(0x1bd)&&this[_0x57c874(0xea)]&&_0x304788 instanceof this[_0x57c874(0xea)]&&(_0x5efb9e=_0x57c874(0x188)),_0x5efb9e;}[_0x3cc829(0x193)](_0x2616e3){var _0x168627=_0x3cc829;return Object[_0x168627(0x12b)][_0x168627(0x11c)][_0x168627(0x100)](_0x2616e3);}[_0x3cc829(0x12d)](_0x4f003b){var _0x47785a=_0x3cc829;return _0x4f003b===_0x47785a(0x13c)||_0x4f003b===_0x47785a(0x101)||_0x4f003b==='number';}[_0x3cc829(0x1ac)](_0x580da9){var _0x5681ba=_0x3cc829;return _0x580da9===_0x5681ba(0x120)||_0x580da9==='String'||_0x580da9===_0x5681ba(0x1a7);}[_0x3cc829(0x127)](_0x31f0da,_0x565503,_0x46f7f0,_0x56dfee,_0xe36748,_0x38444d){var _0x590a36=this;return function(_0x280d8e){var _0x1f71e3=_0xee6b,_0x57346c=_0xe36748[_0x1f71e3(0x126)][_0x1f71e3(0x171)],_0x22ec13=_0xe36748['node'][_0x1f71e3(0x16c)],_0x3b5481=_0xe36748[_0x1f71e3(0x126)]['parent'];_0xe36748['node'][_0x1f71e3(0x186)]=_0x57346c,_0xe36748['node'][_0x1f71e3(0x16c)]=typeof _0x56dfee==_0x1f71e3(0x13d)?_0x56dfee:_0x280d8e,_0x31f0da['push'](_0x590a36[_0x1f71e3(0xff)](_0x565503,_0x46f7f0,_0x56dfee,_0xe36748,_0x38444d)),_0xe36748[_0x1f71e3(0x126)]['parent']=_0x3b5481,_0xe36748[_0x1f71e3(0x126)][_0x1f71e3(0x16c)]=_0x22ec13;};}[_0x3cc829(0x151)](_0x325751,_0x1dbd8e,_0x657241,_0x18a4b8,_0x467719,_0xeb9a16,_0x592c7c){var _0x16836a=_0x3cc829,_0x4026c8=this;return _0x1dbd8e[_0x16836a(0x177)+_0x467719[_0x16836a(0x11c)]()]=!0x0,function(_0x2950dc){var _0x58ae19=_0x16836a,_0x989e8a=_0xeb9a16[_0x58ae19(0x126)][_0x58ae19(0x171)],_0x5474cc=_0xeb9a16['node'][_0x58ae19(0x16c)],_0xfc0a3=_0xeb9a16[_0x58ae19(0x126)][_0x58ae19(0x186)];_0xeb9a16['node'][_0x58ae19(0x186)]=_0x989e8a,_0xeb9a16[_0x58ae19(0x126)][_0x58ae19(0x16c)]=_0x2950dc,_0x325751[_0x58ae19(0x178)](_0x4026c8['_property'](_0x657241,_0x18a4b8,_0x467719,_0xeb9a16,_0x592c7c)),_0xeb9a16['node'][_0x58ae19(0x186)]=_0xfc0a3,_0xeb9a16['node'][_0x58ae19(0x16c)]=_0x5474cc;};}[_0x3cc829(0xff)](_0x349198,_0x48f314,_0x35f105,_0x78d7c8,_0x3e2099){var _0x4625c3=_0x3cc829,_0x195c63=this;_0x3e2099||(_0x3e2099=function(_0x11bf2d,_0x5e5d8d){return _0x11bf2d[_0x5e5d8d];});var _0x393576=_0x35f105['toString'](),_0x3946be=_0x78d7c8[_0x4625c3(0x128)]||{},_0x466335=_0x78d7c8[_0x4625c3(0x1ae)],_0x49c369=_0x78d7c8[_0x4625c3(0x166)];try{var _0x3faaec=this[_0x4625c3(0x14b)](_0x349198),_0x2180ed=_0x393576;_0x3faaec&&_0x2180ed[0x0]==='\\x27'&&(_0x2180ed=_0x2180ed['substr'](0x1,_0x2180ed['length']-0x2));var _0x4dddc3=_0x78d7c8[_0x4625c3(0x128)]=_0x3946be[_0x4625c3(0x177)+_0x2180ed];_0x4dddc3&&(_0x78d7c8['depth']=_0x78d7c8['depth']+0x1),_0x78d7c8[_0x4625c3(0x166)]=!!_0x4dddc3;var _0x5bf324=typeof _0x35f105==_0x4625c3(0x1c6),_0x59621f={'name':_0x5bf324||_0x3faaec?_0x393576:this[_0x4625c3(0x102)](_0x393576)};if(_0x5bf324&&(_0x59621f[_0x4625c3(0x1c6)]=!0x0),!(_0x48f314===_0x4625c3(0xed)||_0x48f314===_0x4625c3(0x18d))){var _0x26baac=this[_0x4625c3(0x111)](_0x349198,_0x35f105);if(_0x26baac&&(_0x26baac[_0x4625c3(0x140)]&&(_0x59621f[_0x4625c3(0x1be)]=!0x0),_0x26baac[_0x4625c3(0xfb)]&&!_0x4dddc3&&!_0x78d7c8['resolveGetters']))return _0x59621f['getter']=!0x0,this[_0x4625c3(0x16e)](_0x59621f,_0x78d7c8),_0x59621f;}var _0xd0955d;try{_0xd0955d=_0x3e2099(_0x349198,_0x35f105);}catch(_0x12e5cb){return _0x59621f={'name':_0x393576,'type':'unknown','error':_0x12e5cb['message']},this['_processTreeNodeResult'](_0x59621f,_0x78d7c8),_0x59621f;}var _0x1bdcaa=this[_0x4625c3(0x150)](_0xd0955d),_0x14de9b=this[_0x4625c3(0x12d)](_0x1bdcaa);if(_0x59621f[_0x4625c3(0xfa)]=_0x1bdcaa,_0x14de9b)this['_processTreeNodeResult'](_0x59621f,_0x78d7c8,_0xd0955d,function(){var _0x436805=_0x4625c3;_0x59621f[_0x436805(0x136)]=_0xd0955d[_0x436805(0x152)](),!_0x4dddc3&&_0x195c63[_0x436805(0x1a0)](_0x1bdcaa,_0x59621f,_0x78d7c8,{});});else{var _0x3b8df8=_0x78d7c8['autoExpand']&&_0x78d7c8[_0x4625c3(0x118)]<_0x78d7c8[_0x4625c3(0x11b)]&&_0x78d7c8[_0x4625c3(0x144)]['indexOf'](_0xd0955d)<0x0&&_0x1bdcaa!==_0x4625c3(0xeb)&&_0x78d7c8[_0x4625c3(0x19e)]<_0x78d7c8[_0x4625c3(0x1c1)];_0x3b8df8||_0x78d7c8['level']<_0x466335||_0x4dddc3?(this[_0x4625c3(0x1d1)](_0x59621f,_0xd0955d,_0x78d7c8,_0x4dddc3||{}),this[_0x4625c3(0x155)](_0xd0955d,_0x59621f)):this[_0x4625c3(0x16e)](_0x59621f,_0x78d7c8,_0xd0955d,function(){var _0x283a30=_0x4625c3;_0x1bdcaa===_0x283a30(0x196)||_0x1bdcaa===_0x283a30(0x1bd)||(delete _0x59621f[_0x283a30(0x136)],_0x59621f[_0x283a30(0x1b6)]=!0x0);});}return _0x59621f;}finally{_0x78d7c8[_0x4625c3(0x128)]=_0x3946be,_0x78d7c8['depth']=_0x466335,_0x78d7c8[_0x4625c3(0x166)]=_0x49c369;}}[_0x3cc829(0x1a0)](_0x1cf7cd,_0x6facc,_0x4d5e8f,_0x20f5b3){var _0x26d586=_0x3cc829,_0x26934c=_0x20f5b3['strLength']||_0x4d5e8f[_0x26d586(0x1cd)];if((_0x1cf7cd===_0x26d586(0x101)||_0x1cf7cd==='String')&&_0x6facc[_0x26d586(0x136)]){let _0x476118=_0x6facc[_0x26d586(0x136)][_0x26d586(0x10a)];_0x4d5e8f['allStrLength']+=_0x476118,_0x4d5e8f[_0x26d586(0x1b0)]>_0x4d5e8f[_0x26d586(0xf2)]?(_0x6facc[_0x26d586(0x1b6)]='',delete _0x6facc[_0x26d586(0x136)]):_0x476118>_0x26934c&&(_0x6facc['capped']=_0x6facc[_0x26d586(0x136)][_0x26d586(0x153)](0x0,_0x26934c),delete _0x6facc[_0x26d586(0x136)]);}}[_0x3cc829(0x14b)](_0x3d2daf){var _0x11b8cd=_0x3cc829;return!!(_0x3d2daf&&_0x461137[_0x11b8cd(0x1d7)]&&this[_0x11b8cd(0x193)](_0x3d2daf)===_0x11b8cd(0x11f)&&_0x3d2daf[_0x11b8cd(0x175)]);}[_0x3cc829(0x102)](_0x4ac0de){var _0x5abdee=_0x3cc829;if(_0x4ac0de[_0x5abdee(0x19d)](/^\\d+$/))return _0x4ac0de;var _0x58f195;try{_0x58f195=JSON[_0x5abdee(0x1c7)](''+_0x4ac0de);}catch{_0x58f195='\\x22'+this[_0x5abdee(0x193)](_0x4ac0de)+'\\x22';}return _0x58f195[_0x5abdee(0x19d)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x58f195=_0x58f195[_0x5abdee(0x153)](0x1,_0x58f195[_0x5abdee(0x10a)]-0x2):_0x58f195=_0x58f195[_0x5abdee(0xf1)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')[_0x5abdee(0xf1)](/(^\"|\"$)/g,'\\x27'),_0x58f195;}[_0x3cc829(0x16e)](_0x312f31,_0x137a5b,_0x517468,_0x40abbc){var _0x28a2a1=_0x3cc829;this[_0x28a2a1(0x1b2)](_0x312f31,_0x137a5b),_0x40abbc&&_0x40abbc(),this[_0x28a2a1(0x155)](_0x517468,_0x312f31),this[_0x28a2a1(0x1aa)](_0x312f31,_0x137a5b);}[_0x3cc829(0x1b2)](_0x5d8c8f,_0x1f2158){var _0x46e47d=_0x3cc829;this[_0x46e47d(0x14d)](_0x5d8c8f,_0x1f2158),this['_setNodeQueryPath'](_0x5d8c8f,_0x1f2158),this[_0x46e47d(0x176)](_0x5d8c8f,_0x1f2158),this[_0x46e47d(0x18a)](_0x5d8c8f,_0x1f2158);}[_0x3cc829(0x14d)](_0x2027dd,_0x2cb5fd){}[_0x3cc829(0x1b9)](_0x519dfb,_0x4f71d2){}[_0x3cc829(0x103)](_0x49cbab,_0x292d9d){}[_0x3cc829(0x160)](_0x10123e){var _0x499d1b=_0x3cc829;return _0x10123e===this[_0x499d1b(0x131)];}[_0x3cc829(0x1aa)](_0x268815,_0x6a8ac5){var _0x40060a=_0x3cc829;this[_0x40060a(0x103)](_0x268815,_0x6a8ac5),this['_setNodeExpandableState'](_0x268815),_0x6a8ac5[_0x40060a(0x130)]&&this[_0x40060a(0x1ca)](_0x268815),this['_addFunctionsNode'](_0x268815,_0x6a8ac5),this[_0x40060a(0x1a4)](_0x268815,_0x6a8ac5),this[_0x40060a(0x158)](_0x268815);}[_0x3cc829(0x155)](_0x5bb24b,_0x192dcf){var _0x441d1e=_0x3cc829;let _0x46c981;try{_0x461137[_0x441d1e(0x154)]&&(_0x46c981=_0x461137['console'][_0x441d1e(0x18f)],_0x461137[_0x441d1e(0x154)][_0x441d1e(0x18f)]=function(){}),_0x5bb24b&&typeof _0x5bb24b[_0x441d1e(0x10a)]==_0x441d1e(0x13d)&&(_0x192dcf[_0x441d1e(0x10a)]=_0x5bb24b[_0x441d1e(0x10a)]);}catch{}finally{_0x46c981&&(_0x461137[_0x441d1e(0x154)][_0x441d1e(0x18f)]=_0x46c981);}if(_0x192dcf[_0x441d1e(0xfa)]===_0x441d1e(0x13d)||_0x192dcf[_0x441d1e(0xfa)]==='Number'){if(isNaN(_0x192dcf['value']))_0x192dcf[_0x441d1e(0x195)]=!0x0,delete _0x192dcf['value'];else switch(_0x192dcf[_0x441d1e(0x136)]){case Number[_0x441d1e(0x1c0)]:_0x192dcf[_0x441d1e(0x1ba)]=!0x0,delete _0x192dcf[_0x441d1e(0x136)];break;case Number['NEGATIVE_INFINITY']:_0x192dcf['negativeInfinity']=!0x0,delete _0x192dcf[_0x441d1e(0x136)];break;case 0x0:this['_isNegativeZero'](_0x192dcf['value'])&&(_0x192dcf[_0x441d1e(0x142)]=!0x0);break;}}else _0x192dcf[_0x441d1e(0xfa)]===_0x441d1e(0xeb)&&typeof _0x5bb24b[_0x441d1e(0x10e)]==_0x441d1e(0x101)&&_0x5bb24b[_0x441d1e(0x10e)]&&_0x192dcf[_0x441d1e(0x10e)]&&_0x5bb24b['name']!==_0x192dcf[_0x441d1e(0x10e)]&&(_0x192dcf[_0x441d1e(0x14f)]=_0x5bb24b[_0x441d1e(0x10e)]);}[_0x3cc829(0x17b)](_0x2230bb){return 0x1/_0x2230bb===Number['NEGATIVE_INFINITY'];}[_0x3cc829(0x1ca)](_0x3cde4e){var _0x2c9f5b=_0x3cc829;!_0x3cde4e[_0x2c9f5b(0x173)]||!_0x3cde4e[_0x2c9f5b(0x173)][_0x2c9f5b(0x10a)]||_0x3cde4e[_0x2c9f5b(0xfa)]===_0x2c9f5b(0xed)||_0x3cde4e[_0x2c9f5b(0xfa)]===_0x2c9f5b(0x1d7)||_0x3cde4e['type']===_0x2c9f5b(0x1bb)||_0x3cde4e['props']['sort'](function(_0x469659,_0x26a1fc){var _0x52f84b=_0x2c9f5b,_0x5c605d=_0x469659[_0x52f84b(0x10e)][_0x52f84b(0x139)](),_0x4583a9=_0x26a1fc[_0x52f84b(0x10e)]['toLowerCase']();return _0x5c605d<_0x4583a9?-0x1:_0x5c605d>_0x4583a9?0x1:0x0;});}[_0x3cc829(0x121)](_0x5864d8,_0x52b29b){var _0x4e8533=_0x3cc829;if(!(_0x52b29b['noFunctions']||!_0x5864d8[_0x4e8533(0x173)]||!_0x5864d8['props'][_0x4e8533(0x10a)])){for(var _0x54f167=[],_0x53602f=[],_0x4f628e=0x0,_0x533166=_0x5864d8['props'][_0x4e8533(0x10a)];_0x4f628e<_0x533166;_0x4f628e++){var _0x5f4bfb=_0x5864d8['props'][_0x4f628e];_0x5f4bfb[_0x4e8533(0xfa)]===_0x4e8533(0xeb)?_0x54f167[_0x4e8533(0x178)](_0x5f4bfb):_0x53602f[_0x4e8533(0x178)](_0x5f4bfb);}if(!(!_0x53602f[_0x4e8533(0x10a)]||_0x54f167[_0x4e8533(0x10a)]<=0x1)){_0x5864d8[_0x4e8533(0x173)]=_0x53602f;var _0x115cbb={'functionsNode':!0x0,'props':_0x54f167};this['_setNodeId'](_0x115cbb,_0x52b29b),this[_0x4e8533(0x103)](_0x115cbb,_0x52b29b),this['_setNodeExpandableState'](_0x115cbb),this[_0x4e8533(0x18a)](_0x115cbb,_0x52b29b),_0x115cbb['id']+='\\x20f',_0x5864d8['props'][_0x4e8533(0x164)](_0x115cbb);}}}[_0x3cc829(0x1a4)](_0x28d964,_0x19ca82){}[_0x3cc829(0x122)](_0x5c11e4){}[_0x3cc829(0x17e)](_0x27c359){var _0x4425fd=_0x3cc829;return Array[_0x4425fd(0x174)](_0x27c359)||typeof _0x27c359==_0x4425fd(0x132)&&this['_objectToString'](_0x27c359)===_0x4425fd(0x14e);}[_0x3cc829(0x18a)](_0x525784,_0x406210){}[_0x3cc829(0x158)](_0x2fcb02){var _0x2c2fa9=_0x3cc829;delete _0x2fcb02[_0x2c2fa9(0xfd)],delete _0x2fcb02[_0x2c2fa9(0x113)],delete _0x2fcb02['_hasMapOnItsPath'];}[_0x3cc829(0x176)](_0x5bdee7,_0x2a4b0f){}}let _0x567005=new _0x4f36eb(),_0x5e2a3a={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x476a0a={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x36b903(_0x3c0d51,_0x3af336,_0x3fec6,_0x333c2e,_0x46872c,_0x4dce46){var _0x291723=_0x3cc829;let _0x3346b3,_0x1a48be;try{_0x1a48be=_0x302909(),_0x3346b3=_0x14e307[_0x3af336],!_0x3346b3||_0x1a48be-_0x3346b3['ts']>0x1f4&&_0x3346b3[_0x291723(0xf4)]&&_0x3346b3[_0x291723(0xf0)]/_0x3346b3['count']<0x64?(_0x14e307[_0x3af336]=_0x3346b3={'count':0x0,'time':0x0,'ts':_0x1a48be},_0x14e307[_0x291723(0x13a)]={}):_0x1a48be-_0x14e307[_0x291723(0x13a)]['ts']>0x32&&_0x14e307[_0x291723(0x13a)][_0x291723(0xf4)]&&_0x14e307['hits'][_0x291723(0xf0)]/_0x14e307['hits']['count']<0x64&&(_0x14e307['hits']={});let _0x73d3d7=[],_0xc83ca8=_0x3346b3['reduceLimits']||_0x14e307[_0x291723(0x13a)][_0x291723(0x12a)]?_0x476a0a:_0x5e2a3a,_0x4dbd7f=_0x3d0b50=>{var _0x91dadb=_0x291723;let _0x37d8d6={};return _0x37d8d6[_0x91dadb(0x173)]=_0x3d0b50[_0x91dadb(0x173)],_0x37d8d6['elements']=_0x3d0b50[_0x91dadb(0x15d)],_0x37d8d6[_0x91dadb(0x1cd)]=_0x3d0b50[_0x91dadb(0x1cd)],_0x37d8d6[_0x91dadb(0xf2)]=_0x3d0b50[_0x91dadb(0xf2)],_0x37d8d6[_0x91dadb(0x1c1)]=_0x3d0b50[_0x91dadb(0x1c1)],_0x37d8d6['autoExpandMaxDepth']=_0x3d0b50[_0x91dadb(0x11b)],_0x37d8d6[_0x91dadb(0x130)]=!0x1,_0x37d8d6['noFunctions']=!_0x2d3424,_0x37d8d6[_0x91dadb(0x1ae)]=0x1,_0x37d8d6[_0x91dadb(0x118)]=0x0,_0x37d8d6[_0x91dadb(0x18e)]='root_exp_id',_0x37d8d6['rootExpression']=_0x91dadb(0x180),_0x37d8d6['autoExpand']=!0x0,_0x37d8d6['autoExpandPreviousObjects']=[],_0x37d8d6[_0x91dadb(0x19e)]=0x0,_0x37d8d6[_0x91dadb(0x15a)]=!0x0,_0x37d8d6[_0x91dadb(0x1b0)]=0x0,_0x37d8d6[_0x91dadb(0x126)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x37d8d6;};for(var _0x155d69=0x0;_0x155d69<_0x46872c['length'];_0x155d69++)_0x73d3d7[_0x291723(0x178)](_0x567005[_0x291723(0x1d1)]({'timeNode':_0x3c0d51===_0x291723(0xf0)||void 0x0},_0x46872c[_0x155d69],_0x4dbd7f(_0xc83ca8),{}));if(_0x3c0d51===_0x291723(0x125)){let _0x13f79b=Error[_0x291723(0x108)];try{Error[_0x291723(0x108)]=0x1/0x0,_0x73d3d7['push'](_0x567005[_0x291723(0x1d1)]({'stackNode':!0x0},new Error()['stack'],_0x4dbd7f(_0xc83ca8),{'strLength':0x1/0x0}));}finally{Error[_0x291723(0x108)]=_0x13f79b;}}return{'method':'log','version':_0x523118,'args':[{'ts':_0x3fec6,'session':_0x333c2e,'args':_0x73d3d7,'id':_0x3af336,'context':_0x4dce46}]};}catch(_0x2468fb){return{'method':_0x291723(0x119),'version':_0x523118,'args':[{'ts':_0x3fec6,'session':_0x333c2e,'args':[{'type':_0x291723(0x170),'error':_0x2468fb&&_0x2468fb[_0x291723(0xf8)]}],'id':_0x3af336,'context':_0x4dce46}]};}finally{try{if(_0x3346b3&&_0x1a48be){let _0x4a38be=_0x302909();_0x3346b3[_0x291723(0xf4)]++,_0x3346b3[_0x291723(0xf0)]+=_0x47dc2a(_0x1a48be,_0x4a38be),_0x3346b3['ts']=_0x4a38be,_0x14e307[_0x291723(0x13a)][_0x291723(0xf4)]++,_0x14e307[_0x291723(0x13a)][_0x291723(0xf0)]+=_0x47dc2a(_0x1a48be,_0x4a38be),_0x14e307['hits']['ts']=_0x4a38be,(_0x3346b3[_0x291723(0xf4)]>0x32||_0x3346b3[_0x291723(0xf0)]>0x64)&&(_0x3346b3['reduceLimits']=!0x0),(_0x14e307[_0x291723(0x13a)][_0x291723(0xf4)]>0x3e8||_0x14e307['hits'][_0x291723(0xf0)]>0x12c)&&(_0x14e307[_0x291723(0x13a)]['reduceLimits']=!0x0);}}catch{}}}return _0x36b903;}((_0x1047c9,_0x5d185e,_0x2b0195,_0x1c1fd4,_0x39bda9,_0x33ffcb,_0x1c933b,_0x1cbb24,_0x5d836d,_0x5f8774)=>{var _0x457f57=_0x2e24ba;if(_0x1047c9[_0x457f57(0xf5)])return _0x1047c9[_0x457f57(0xf5)];if(!J(_0x1047c9,_0x1cbb24,_0x39bda9))return _0x1047c9['_console_ninja']={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x1047c9[_0x457f57(0xf5)];let _0xc5f44f=W(_0x1047c9),_0x122f63=_0xc5f44f[_0x457f57(0x1d0)],_0xd4f231=_0xc5f44f[_0x457f57(0x114)],_0x570bdf=_0xc5f44f['now'],_0x2c8c53={'hits':{},'ts':{}},_0x9d4f87=Y(_0x1047c9,_0x5d836d,_0x2c8c53,_0x33ffcb),_0x3f827=_0x23f9c0=>{_0x2c8c53['ts'][_0x23f9c0]=_0xd4f231();},_0x14c7c4=(_0xb625a4,_0x5b98cb)=>{var _0x16fa38=_0x457f57;let _0x229763=_0x2c8c53['ts'][_0x5b98cb];if(delete _0x2c8c53['ts'][_0x5b98cb],_0x229763){let _0x2e2147=_0x122f63(_0x229763,_0xd4f231());_0x5f18e3(_0x9d4f87(_0x16fa38(0xf0),_0xb625a4,_0x570bdf(),_0x584fbc,[_0x2e2147],_0x5b98cb));}},_0x5cb24d=_0x3b849e=>_0x50a936=>{try{_0x3f827(_0x50a936),_0x3b849e(_0x50a936);}finally{_0x1047c9['console']['time']=_0x3b849e;}},_0x3b4846=_0x20dc8e=>_0x54b121=>{var _0x2b35b4=_0x457f57;try{let [_0x416120,_0x3cfe1c]=_0x54b121[_0x2b35b4(0x18b)](':logPointId:');_0x14c7c4(_0x3cfe1c,_0x416120),_0x20dc8e(_0x416120);}finally{_0x1047c9['console'][_0x2b35b4(0x198)]=_0x20dc8e;}};_0x1047c9[_0x457f57(0xf5)]={'consoleLog':(_0x42c67b,_0x121bea)=>{var _0x4a71ec=_0x457f57;_0x1047c9[_0x4a71ec(0x154)][_0x4a71ec(0x119)]['name']!==_0x4a71ec(0x143)&&_0x5f18e3(_0x9d4f87(_0x4a71ec(0x119),_0x42c67b,_0x570bdf(),_0x584fbc,_0x121bea));},'consoleTrace':(_0x2627b3,_0x57213a)=>{var _0x4916b6=_0x457f57;_0x1047c9['console'][_0x4916b6(0x119)][_0x4916b6(0x10e)]!==_0x4916b6(0x15c)&&_0x5f18e3(_0x9d4f87('trace',_0x2627b3,_0x570bdf(),_0x584fbc,_0x57213a));},'consoleTime':()=>{var _0x14d473=_0x457f57;_0x1047c9[_0x14d473(0x154)][_0x14d473(0xf0)]=_0x5cb24d(_0x1047c9['console']['time']);},'consoleTimeEnd':()=>{var _0x4e3e0a=_0x457f57;_0x1047c9[_0x4e3e0a(0x154)][_0x4e3e0a(0x198)]=_0x3b4846(_0x1047c9[_0x4e3e0a(0x154)][_0x4e3e0a(0x198)]);},'autoLog':(_0xb5e5ab,_0x2d450d)=>{var _0x536fd0=_0x457f57;_0x5f18e3(_0x9d4f87(_0x536fd0(0x119),_0x2d450d,_0x570bdf(),_0x584fbc,[_0xb5e5ab]));},'autoLogMany':(_0x435498,_0x14809f)=>{_0x5f18e3(_0x9d4f87('log',_0x435498,_0x570bdf(),_0x584fbc,_0x14809f));},'autoTrace':(_0x45455f,_0x4baf8e)=>{_0x5f18e3(_0x9d4f87('trace',_0x4baf8e,_0x570bdf(),_0x584fbc,[_0x45455f]));},'autoTraceMany':(_0x2a98a1,_0x589a24)=>{var _0x523188=_0x457f57;_0x5f18e3(_0x9d4f87(_0x523188(0x125),_0x2a98a1,_0x570bdf(),_0x584fbc,_0x589a24));},'autoTime':(_0x1c60c1,_0x25935b,_0x1d0eb5)=>{_0x3f827(_0x1d0eb5);},'autoTimeEnd':(_0x1bb886,_0x23d1c8,_0x4314f1)=>{_0x14c7c4(_0x23d1c8,_0x4314f1);},'coverage':_0x30f36e=>{var _0x309cf7=_0x457f57;_0x5f18e3({'method':_0x309cf7(0x1c5),'version':_0x33ffcb,'args':[{'id':_0x30f36e}]});}};let _0x5f18e3=b(_0x1047c9,_0x5d185e,_0x2b0195,_0x1c1fd4,_0x39bda9,_0x5f8774),_0x584fbc=_0x1047c9[_0x457f57(0x146)];return _0x1047c9['_console_ninja'];})(globalThis,_0x2e24ba(0x11a),_0x2e24ba(0x124),_0x2e24ba(0x1a6),_0x2e24ba(0xfe),_0x2e24ba(0x1a5),_0x2e24ba(0x172),_0x2e24ba(0x165),_0x2e24ba(0x1d3),_0x2e24ba(0x1cf));");
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