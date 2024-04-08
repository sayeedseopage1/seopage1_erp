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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x24ae32=_0xe1a3;function _0x47ba(){var _0x4d9a5e=['bind','_isSet','autoExpandMaxDepth','_type','ws/index.js','data','_inNextEdge','null','location','Set','_processTreeNodeResult','autoExpandPropertyCount','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','method','test','symbol','elapsed','unknown','next.js','_objectToString','_Symbol','getOwnPropertyDescriptor','onclose','global','setter','totalStrLength','send','prototype','edge','_getOwnPropertyNames','hasOwnProperty','includes','readyState','NEXT_RUNTIME','disabledTrace','_quotedRegExp','get','timeStamp','_webSocketErrorDocsLink','_disposeWebsocket','_addProperty','_setNodeId','_addObjectProperty','_console_ninja','_connectAttemptCount','webpack','_setNodePermissions','_isNegativeZero','gateway.docker.internal','203717gUxSbO','_setNodeLabel','onopen','_WebSocketClass','disabledLog','_connectToHostNow','join','_HTMLAllCollection','_allowedToConnectOnSend','hrtime','negativeZero',\"c:\\\\Users\\\\ahmed\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.297\\\\node_modules\",'','negativeInfinity','unshift','count','_treeNodePropertiesBeforeFullValue','[object\\x20Map]','port','_sendErrorMessage','type','4682442WbbGyT','current','_reconnectTimeout','287NLwPsb','parent','120968WxcRNU','hostname','_isMap','capped','valueOf','log','function','_addFunctionsNode','dockerizedApp','array','_getOwnPropertySymbols','funcName','process','name','stack','reload','angular','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','defineProperty','_sortProps','astro','getter','trace','bigint','pathToFileURL','_inBrowser','_connected','stringify','_propertyName','resolveGetters','replace','serialize','NEGATIVE_INFINITY','\\x20server','value','_isPrimitiveType','_dateToString','path','message','_ws','_setNodeExpandableState','_p_length','POSITIVE_INFINITY','allStrLength','_hasMapOnItsPath','error','call','env','toString','Map','_attemptToReconnectShortly','coverage','hits','14326697OpwenA','_isPrimitiveWrapperType','autoExpandLimit','nuxt','ws://','autoExpand','sortProps','now','node','_cleanNode','set','_socket','_blacklistedProperty','perf_hooks','6290InhSfe','autoExpandPreviousObjects','sort','time','substr','Number','timeEnd','WebSocket','strLength','length','props','1.0.0','cappedElements','_console_ninja_session','getOwnPropertyNames','forEach','getWebSocketClass','_treeNodePropertiesAfterFullValue','_isUndefined','1046TxPxjD','toLowerCase','then','_p_name','date','undefined','_addLoadNode','string','push','6404eXURFg','split','1395iTYYhf','HTMLAllCollection','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_allowedToSend','performance','_undefined','_additionalMetadata','object','RegExp','versions','_maxConnectAttemptCount','nan','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','warn','Error','getPrototypeOf','match','5109sYAtuQ','expressionsToEvaluate','_capIfString','_connecting','console','catch','number','_consoleNinjaAllowedToStart','slice','indexOf','constructor','noFunctions','level','unref','_property','','_setNodeExpressionPath','15048JnNmqV','127.0.0.1','concat','elements','_hasSymbolPropertyOnItsPath','__es'+'Module','depth','host','nodeModules','create','getOwnPropertySymbols','_numberRegExp','stackTraceLimit','boolean','_regExpToString','onerror','3745','_setNodeQueryPath','expId','logger\\x20websocket\\x20error','[object\\x20Array]','default','reduceLimits','index','String','isExpressionToEvaluate','_p_'];_0x47ba=function(){return _0x4d9a5e;};return _0x47ba();}(function(_0x13cea9,_0x4bbe7e){var _0x52657b=_0xe1a3,_0x4ab941=_0x13cea9();while(!![]){try{var _0x565148=parseInt(_0x52657b(0x112))/0x1+parseInt(_0x52657b(0x182))/0x2*(parseInt(_0x52657b(0x19e))/0x3)+parseInt(_0x52657b(0x18b))/0x4*(-parseInt(_0x52657b(0x18d))/0x5)+parseInt(_0x52657b(0x127))/0x6+-parseInt(_0x52657b(0x12a))/0x7*(parseInt(_0x52657b(0x12c))/0x8)+parseInt(_0x52657b(0x1af))/0x9*(parseInt(_0x52657b(0x16f))/0xa)+-parseInt(_0x52657b(0x161))/0xb;if(_0x565148===_0x4bbe7e)break;else _0x4ab941['push'](_0x4ab941['shift']());}catch(_0x421755){_0x4ab941['push'](_0x4ab941['shift']());}}}(_0x47ba,0x88166));var j=Object[_0x24ae32(0xcf)],H=Object[_0x24ae32(0x13e)],G=Object[_0x24ae32(0xf6)],ee=Object['getOwnPropertyNames'],te=Object[_0x24ae32(0x19c)],ne=Object[_0x24ae32(0xfc)][_0x24ae32(0xff)],re=(_0x4d3738,_0x236e14,_0x3098ae,_0x375e86)=>{var _0x2e9e42=_0x24ae32;if(_0x236e14&&typeof _0x236e14=='object'||typeof _0x236e14==_0x2e9e42(0x132)){for(let _0x20a893 of ee(_0x236e14))!ne['call'](_0x4d3738,_0x20a893)&&_0x20a893!==_0x3098ae&&H(_0x4d3738,_0x20a893,{'get':()=>_0x236e14[_0x20a893],'enumerable':!(_0x375e86=G(_0x236e14,_0x20a893))||_0x375e86['enumerable']});}return _0x4d3738;},x=(_0x4ceb6e,_0x1d4c6c,_0x157aca)=>(_0x157aca=_0x4ceb6e!=null?j(te(_0x4ceb6e)):{},re(_0x1d4c6c||!_0x4ceb6e||!_0x4ceb6e[_0x24ae32(0xcb)]?H(_0x157aca,_0x24ae32(0xdb),{'value':_0x4ceb6e,'enumerable':!0x0}):_0x157aca,_0x4ceb6e)),X=class{constructor(_0x259cec,_0x17e41c,_0x5f15f2,_0x5d1b89,_0x319187){var _0x2640a4=_0x24ae32;this[_0x2640a4(0xf8)]=_0x259cec,this[_0x2640a4(0xcd)]=_0x17e41c,this[_0x2640a4(0x124)]=_0x5f15f2,this[_0x2640a4(0xce)]=_0x5d1b89,this['dockerizedApp']=_0x319187,this[_0x2640a4(0x190)]=!0x0,this[_0x2640a4(0x11a)]=!0x0,this[_0x2640a4(0x146)]=!0x1,this[_0x2640a4(0x1a1)]=!0x1,this[_0x2640a4(0xe7)]=_0x259cec[_0x2640a4(0x138)]?.[_0x2640a4(0x15b)]?.[_0x2640a4(0x102)]==='edge',this['_inBrowser']=!this[_0x2640a4(0xf8)]['process']?.['versions']?.['node']&&!this['_inNextEdge'],this[_0x2640a4(0x115)]=null,this[_0x2640a4(0x10d)]=0x0,this[_0x2640a4(0x197)]=0x14,this[_0x2640a4(0x107)]='https://tinyurl.com/37x8b79t',this['_sendErrorMessage']=(this[_0x2640a4(0x145)]?_0x2640a4(0xed):_0x2640a4(0x18f))+this[_0x2640a4(0x107)];}async[_0x24ae32(0x17f)](){var _0x513466=_0x24ae32;if(this['_WebSocketClass'])return this[_0x513466(0x115)];let _0x547a9b;if(this['_inBrowser']||this[_0x513466(0xe7)])_0x547a9b=this[_0x513466(0xf8)][_0x513466(0x176)];else{if(this[_0x513466(0xf8)][_0x513466(0x138)]?.['_WebSocket'])_0x547a9b=this['global'][_0x513466(0x138)]?.['_WebSocket'];else try{let _0x133a32=await import(_0x513466(0x151));_0x547a9b=(await import((await import('url'))[_0x513466(0x144)](_0x133a32[_0x513466(0x118)](this['nodeModules'],_0x513466(0xe5)))['toString']()))[_0x513466(0xdb)];}catch{try{_0x547a9b=require(require(_0x513466(0x151))['join'](this['nodeModules'],'ws'));}catch{throw new Error('failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket');}}}return this[_0x513466(0x115)]=_0x547a9b,_0x547a9b;}[_0x24ae32(0x117)](){var _0x2c0ef5=_0x24ae32;this[_0x2c0ef5(0x1a1)]||this[_0x2c0ef5(0x146)]||this[_0x2c0ef5(0x10d)]>=this[_0x2c0ef5(0x197)]||(this[_0x2c0ef5(0x11a)]=!0x1,this[_0x2c0ef5(0x1a1)]=!0x0,this[_0x2c0ef5(0x10d)]++,this[_0x2c0ef5(0x153)]=new Promise((_0x44c1c5,_0x4c50ec)=>{var _0x4e7a9e=_0x2c0ef5;this['getWebSocketClass']()[_0x4e7a9e(0x184)](_0x1c0d89=>{var _0x18e890=_0x4e7a9e;let _0x534f30=new _0x1c0d89(_0x18e890(0x165)+(!this[_0x18e890(0x145)]&&this[_0x18e890(0x134)]?_0x18e890(0x111):this[_0x18e890(0xcd)])+':'+this['port']);_0x534f30['onerror']=()=>{var _0x29bc9f=_0x18e890;this['_allowedToSend']=!0x1,this[_0x29bc9f(0x108)](_0x534f30),this[_0x29bc9f(0x15e)](),_0x4c50ec(new Error(_0x29bc9f(0xd9)));},_0x534f30['onopen']=()=>{var _0x58424d=_0x18e890;this[_0x58424d(0x145)]||_0x534f30[_0x58424d(0x16c)]&&_0x534f30[_0x58424d(0x16c)][_0x58424d(0x1ab)]&&_0x534f30[_0x58424d(0x16c)][_0x58424d(0x1ab)](),_0x44c1c5(_0x534f30);},_0x534f30[_0x18e890(0xf7)]=()=>{var _0x136633=_0x18e890;this[_0x136633(0x11a)]=!0x0,this[_0x136633(0x108)](_0x534f30),this[_0x136633(0x15e)]();},_0x534f30['onmessage']=_0x1ca84d=>{var _0x397b0c=_0x18e890;try{_0x1ca84d&&_0x1ca84d[_0x397b0c(0xe6)]&&this[_0x397b0c(0x145)]&&JSON['parse'](_0x1ca84d[_0x397b0c(0xe6)])[_0x397b0c(0xee)]===_0x397b0c(0x13b)&&this[_0x397b0c(0xf8)][_0x397b0c(0xe9)][_0x397b0c(0x13b)]();}catch{}};})[_0x4e7a9e(0x184)](_0x481d4f=>(this['_connected']=!0x0,this[_0x4e7a9e(0x1a1)]=!0x1,this[_0x4e7a9e(0x11a)]=!0x1,this[_0x4e7a9e(0x190)]=!0x0,this[_0x4e7a9e(0x10d)]=0x0,_0x481d4f))[_0x4e7a9e(0x1a3)](_0x404cdc=>(this[_0x4e7a9e(0x146)]=!0x1,this['_connecting']=!0x1,console[_0x4e7a9e(0x19a)](_0x4e7a9e(0x199)+this[_0x4e7a9e(0x107)]),_0x4c50ec(new Error('failed\\x20to\\x20connect\\x20to\\x20host:\\x20'+(_0x404cdc&&_0x404cdc['message'])))));}));}[_0x24ae32(0x108)](_0x2e3168){var _0x17cffd=_0x24ae32;this['_connected']=!0x1,this[_0x17cffd(0x1a1)]=!0x1;try{_0x2e3168[_0x17cffd(0xf7)]=null,_0x2e3168[_0x17cffd(0xd5)]=null,_0x2e3168[_0x17cffd(0x114)]=null;}catch{}try{_0x2e3168[_0x17cffd(0x101)]<0x2&&_0x2e3168['close']();}catch{}}[_0x24ae32(0x15e)](){var _0xcfd15=_0x24ae32;clearTimeout(this['_reconnectTimeout']),!(this[_0xcfd15(0x10d)]>=this[_0xcfd15(0x197)])&&(this[_0xcfd15(0x129)]=setTimeout(()=>{var _0x6ff8c5=_0xcfd15;this['_connected']||this[_0x6ff8c5(0x1a1)]||(this['_connectToHostNow'](),this[_0x6ff8c5(0x153)]?.[_0x6ff8c5(0x1a3)](()=>this[_0x6ff8c5(0x15e)]()));},0x1f4),this['_reconnectTimeout'][_0xcfd15(0x1ab)]&&this[_0xcfd15(0x129)][_0xcfd15(0x1ab)]());}async[_0x24ae32(0xfb)](_0x51551d){var _0xe92bc5=_0x24ae32;try{if(!this[_0xe92bc5(0x190)])return;this[_0xe92bc5(0x11a)]&&this[_0xe92bc5(0x117)](),(await this[_0xe92bc5(0x153)])[_0xe92bc5(0xfb)](JSON[_0xe92bc5(0x147)](_0x51551d));}catch(_0x3b4c8c){console[_0xe92bc5(0x19a)](this[_0xe92bc5(0x125)]+':\\x20'+(_0x3b4c8c&&_0x3b4c8c['message'])),this[_0xe92bc5(0x190)]=!0x1,this[_0xe92bc5(0x15e)]();}}};function b(_0x2dcc3d,_0x1258f7,_0x28783a,_0x47a70c,_0x49f016,_0x585b74){var _0x4feb5e=_0x24ae32;let _0x4094ff=_0x28783a[_0x4feb5e(0x18c)](',')['map'](_0x398903=>{var _0x4ef02e=_0x4feb5e;try{_0x2dcc3d[_0x4ef02e(0x17c)]||((_0x49f016===_0x4ef02e(0xf3)||_0x49f016==='remix'||_0x49f016===_0x4ef02e(0x140)||_0x49f016===_0x4ef02e(0x13c))&&(_0x49f016+=!_0x2dcc3d[_0x4ef02e(0x138)]?.[_0x4ef02e(0x196)]?.[_0x4ef02e(0x169)]&&_0x2dcc3d[_0x4ef02e(0x138)]?.['env']?.['NEXT_RUNTIME']!==_0x4ef02e(0xfd)?'\\x20browser':_0x4ef02e(0x14d)),_0x2dcc3d[_0x4ef02e(0x17c)]={'id':+new Date(),'tool':_0x49f016});let _0x53ac87=new X(_0x2dcc3d,_0x1258f7,_0x398903,_0x47a70c,_0x585b74);return _0x53ac87[_0x4ef02e(0xfb)][_0x4ef02e(0xe1)](_0x53ac87);}catch(_0x3f7983){return console['warn'](_0x4ef02e(0x13d),_0x3f7983&&_0x3f7983[_0x4ef02e(0x152)]),()=>{};}});return _0x3f96b9=>_0x4094ff[_0x4feb5e(0x17e)](_0x537d76=>_0x537d76(_0x3f96b9));}function _0xe1a3(_0xab75e0,_0x53896b){var _0x47bab1=_0x47ba();return _0xe1a3=function(_0xe1a3e7,_0xd8e4f){_0xe1a3e7=_0xe1a3e7-0xca;var _0xf783d=_0x47bab1[_0xe1a3e7];return _0xf783d;},_0xe1a3(_0xab75e0,_0x53896b);}function W(_0x51ea05){var _0x292973=_0x24ae32;let _0x4c170d=function(_0x215ce1,_0xe9963b){return _0xe9963b-_0x215ce1;},_0x3e5eb9;if(_0x51ea05[_0x292973(0x191)])_0x3e5eb9=function(){var _0x4fd952=_0x292973;return _0x51ea05[_0x4fd952(0x191)][_0x4fd952(0x168)]();};else{if(_0x51ea05[_0x292973(0x138)]&&_0x51ea05[_0x292973(0x138)][_0x292973(0x11b)]&&_0x51ea05['process']?.['env']?.[_0x292973(0x102)]!==_0x292973(0xfd))_0x3e5eb9=function(){var _0x39f8d9=_0x292973;return _0x51ea05['process'][_0x39f8d9(0x11b)]();},_0x4c170d=function(_0x2273d6,_0x1c1932){return 0x3e8*(_0x1c1932[0x0]-_0x2273d6[0x0])+(_0x1c1932[0x1]-_0x2273d6[0x1])/0xf4240;};else try{let {performance:_0x10dace}=require(_0x292973(0x16e));_0x3e5eb9=function(){var _0xb586d7=_0x292973;return _0x10dace[_0xb586d7(0x168)]();};}catch{_0x3e5eb9=function(){return+new Date();};}}return{'elapsed':_0x4c170d,'timeStamp':_0x3e5eb9,'now':()=>Date['now']()};}function J(_0x4cdc41,_0x1eb45c,_0x32e2ae){var _0x2d39c3=_0x24ae32;if(_0x4cdc41[_0x2d39c3(0x1a5)]!==void 0x0)return _0x4cdc41[_0x2d39c3(0x1a5)];let _0x59979b=_0x4cdc41[_0x2d39c3(0x138)]?.[_0x2d39c3(0x196)]?.['node']||_0x4cdc41['process']?.[_0x2d39c3(0x15b)]?.[_0x2d39c3(0x102)]===_0x2d39c3(0xfd);return _0x59979b&&_0x32e2ae===_0x2d39c3(0x164)?_0x4cdc41[_0x2d39c3(0x1a5)]=!0x1:_0x4cdc41[_0x2d39c3(0x1a5)]=_0x59979b||!_0x1eb45c||_0x4cdc41[_0x2d39c3(0xe9)]?.[_0x2d39c3(0x12d)]&&_0x1eb45c[_0x2d39c3(0x100)](_0x4cdc41[_0x2d39c3(0xe9)][_0x2d39c3(0x12d)]),_0x4cdc41[_0x2d39c3(0x1a5)];}function Y(_0x269569,_0xb6c728,_0x309406,_0x583925){var _0x4ff05d=_0x24ae32;_0x269569=_0x269569,_0xb6c728=_0xb6c728,_0x309406=_0x309406,_0x583925=_0x583925;let _0x37f334=W(_0x269569),_0x50d7d1=_0x37f334[_0x4ff05d(0xf1)],_0x41cee5=_0x37f334[_0x4ff05d(0x106)];class _0x4bec75{constructor(){var _0x3f8b65=_0x4ff05d;this['_keyStrRegExp']=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x3f8b65(0xd1)]=/^(0|[1-9][0-9]*)$/,this[_0x3f8b65(0x104)]=/'([^\\\\']|\\\\')*'/,this[_0x3f8b65(0x192)]=_0x269569[_0x3f8b65(0x187)],this[_0x3f8b65(0x119)]=_0x269569[_0x3f8b65(0x18e)],this['_getOwnPropertyDescriptor']=Object[_0x3f8b65(0xf6)],this[_0x3f8b65(0xfe)]=Object[_0x3f8b65(0x17d)],this['_Symbol']=_0x269569['Symbol'],this['_regExpToString']=RegExp[_0x3f8b65(0xfc)]['toString'],this[_0x3f8b65(0x150)]=Date[_0x3f8b65(0xfc)]['toString'];}[_0x4ff05d(0x14b)](_0x3ac2d4,_0x4a4d37,_0x51a527,_0x3adf91){var _0xb164cb=_0x4ff05d,_0x3ebdcd=this,_0x9246a9=_0x51a527[_0xb164cb(0x166)];function _0x3b1f57(_0x4f1712,_0x3b8cad,_0x2f1b1c){var _0x494e5a=_0xb164cb;_0x3b8cad[_0x494e5a(0x126)]='unknown',_0x3b8cad['error']=_0x4f1712[_0x494e5a(0x152)],_0x21d03e=_0x2f1b1c[_0x494e5a(0x169)][_0x494e5a(0x128)],_0x2f1b1c['node']['current']=_0x3b8cad,_0x3ebdcd[_0x494e5a(0x122)](_0x3b8cad,_0x2f1b1c);}try{_0x51a527[_0xb164cb(0x1aa)]++,_0x51a527[_0xb164cb(0x166)]&&_0x51a527['autoExpandPreviousObjects']['push'](_0x4a4d37);var _0x24d749,_0x78e3cb,_0x5ccb05,_0x2e0a3c,_0x3d1eb8=[],_0x4f51de=[],_0x4cabfa,_0x22bc10=this[_0xb164cb(0xe4)](_0x4a4d37),_0x5420bc=_0x22bc10===_0xb164cb(0x135),_0x5dfa74=!0x1,_0x2ee57e=_0x22bc10===_0xb164cb(0x132),_0x4ab493=this[_0xb164cb(0x14f)](_0x22bc10),_0x3cb7f6=this[_0xb164cb(0x162)](_0x22bc10),_0x4a8e0f=_0x4ab493||_0x3cb7f6,_0x42d6f6={},_0xfab32f=0x0,_0x3830ac=!0x1,_0x21d03e,_0x36c761=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x51a527[_0xb164cb(0xcc)]){if(_0x5420bc){if(_0x78e3cb=_0x4a4d37[_0xb164cb(0x178)],_0x78e3cb>_0x51a527[_0xb164cb(0x1b2)]){for(_0x5ccb05=0x0,_0x2e0a3c=_0x51a527[_0xb164cb(0x1b2)],_0x24d749=_0x5ccb05;_0x24d749<_0x2e0a3c;_0x24d749++)_0x4f51de['push'](_0x3ebdcd['_addProperty'](_0x3d1eb8,_0x4a4d37,_0x22bc10,_0x24d749,_0x51a527));_0x3ac2d4[_0xb164cb(0x17b)]=!0x0;}else{for(_0x5ccb05=0x0,_0x2e0a3c=_0x78e3cb,_0x24d749=_0x5ccb05;_0x24d749<_0x2e0a3c;_0x24d749++)_0x4f51de[_0xb164cb(0x18a)](_0x3ebdcd['_addProperty'](_0x3d1eb8,_0x4a4d37,_0x22bc10,_0x24d749,_0x51a527));}_0x51a527[_0xb164cb(0xec)]+=_0x4f51de[_0xb164cb(0x178)];}if(!(_0x22bc10===_0xb164cb(0xe8)||_0x22bc10===_0xb164cb(0x187))&&!_0x4ab493&&_0x22bc10!==_0xb164cb(0xde)&&_0x22bc10!=='Buffer'&&_0x22bc10!=='bigint'){var _0x8450a5=_0x3adf91[_0xb164cb(0x179)]||_0x51a527[_0xb164cb(0x179)];if(this['_isSet'](_0x4a4d37)?(_0x24d749=0x0,_0x4a4d37[_0xb164cb(0x17e)](function(_0x368387){var _0x265c23=_0xb164cb;if(_0xfab32f++,_0x51a527['autoExpandPropertyCount']++,_0xfab32f>_0x8450a5){_0x3830ac=!0x0;return;}if(!_0x51a527[_0x265c23(0xdf)]&&_0x51a527[_0x265c23(0x166)]&&_0x51a527[_0x265c23(0xec)]>_0x51a527[_0x265c23(0x163)]){_0x3830ac=!0x0;return;}_0x4f51de[_0x265c23(0x18a)](_0x3ebdcd['_addProperty'](_0x3d1eb8,_0x4a4d37,_0x265c23(0xea),_0x24d749++,_0x51a527,function(_0x473455){return function(){return _0x473455;};}(_0x368387)));})):this[_0xb164cb(0x12e)](_0x4a4d37)&&_0x4a4d37[_0xb164cb(0x17e)](function(_0x26888d,_0x1fb8b2){var _0x53b543=_0xb164cb;if(_0xfab32f++,_0x51a527[_0x53b543(0xec)]++,_0xfab32f>_0x8450a5){_0x3830ac=!0x0;return;}if(!_0x51a527[_0x53b543(0xdf)]&&_0x51a527[_0x53b543(0x166)]&&_0x51a527[_0x53b543(0xec)]>_0x51a527[_0x53b543(0x163)]){_0x3830ac=!0x0;return;}var _0x41288f=_0x1fb8b2[_0x53b543(0x15c)]();_0x41288f[_0x53b543(0x178)]>0x64&&(_0x41288f=_0x41288f[_0x53b543(0x1a6)](0x0,0x64)+'...'),_0x4f51de[_0x53b543(0x18a)](_0x3ebdcd['_addProperty'](_0x3d1eb8,_0x4a4d37,_0x53b543(0x15d),_0x41288f,_0x51a527,function(_0x9d4cd6){return function(){return _0x9d4cd6;};}(_0x26888d)));}),!_0x5dfa74){try{for(_0x4cabfa in _0x4a4d37)if(!(_0x5420bc&&_0x36c761[_0xb164cb(0xef)](_0x4cabfa))&&!this[_0xb164cb(0x16d)](_0x4a4d37,_0x4cabfa,_0x51a527)){if(_0xfab32f++,_0x51a527[_0xb164cb(0xec)]++,_0xfab32f>_0x8450a5){_0x3830ac=!0x0;break;}if(!_0x51a527[_0xb164cb(0xdf)]&&_0x51a527[_0xb164cb(0x166)]&&_0x51a527[_0xb164cb(0xec)]>_0x51a527[_0xb164cb(0x163)]){_0x3830ac=!0x0;break;}_0x4f51de['push'](_0x3ebdcd['_addObjectProperty'](_0x3d1eb8,_0x42d6f6,_0x4a4d37,_0x22bc10,_0x4cabfa,_0x51a527));}}catch{}if(_0x42d6f6[_0xb164cb(0x155)]=!0x0,_0x2ee57e&&(_0x42d6f6[_0xb164cb(0x185)]=!0x0),!_0x3830ac){var _0x3a6f04=[][_0xb164cb(0x1b1)](this[_0xb164cb(0xfe)](_0x4a4d37))['concat'](this[_0xb164cb(0x136)](_0x4a4d37));for(_0x24d749=0x0,_0x78e3cb=_0x3a6f04[_0xb164cb(0x178)];_0x24d749<_0x78e3cb;_0x24d749++)if(_0x4cabfa=_0x3a6f04[_0x24d749],!(_0x5420bc&&_0x36c761[_0xb164cb(0xef)](_0x4cabfa[_0xb164cb(0x15c)]()))&&!this[_0xb164cb(0x16d)](_0x4a4d37,_0x4cabfa,_0x51a527)&&!_0x42d6f6['_p_'+_0x4cabfa[_0xb164cb(0x15c)]()]){if(_0xfab32f++,_0x51a527['autoExpandPropertyCount']++,_0xfab32f>_0x8450a5){_0x3830ac=!0x0;break;}if(!_0x51a527['isExpressionToEvaluate']&&_0x51a527[_0xb164cb(0x166)]&&_0x51a527[_0xb164cb(0xec)]>_0x51a527[_0xb164cb(0x163)]){_0x3830ac=!0x0;break;}_0x4f51de[_0xb164cb(0x18a)](_0x3ebdcd['_addObjectProperty'](_0x3d1eb8,_0x42d6f6,_0x4a4d37,_0x22bc10,_0x4cabfa,_0x51a527));}}}}}if(_0x3ac2d4[_0xb164cb(0x126)]=_0x22bc10,_0x4a8e0f?(_0x3ac2d4[_0xb164cb(0x14e)]=_0x4a4d37['valueOf'](),this[_0xb164cb(0x1a0)](_0x22bc10,_0x3ac2d4,_0x51a527,_0x3adf91)):_0x22bc10===_0xb164cb(0x186)?_0x3ac2d4[_0xb164cb(0x14e)]=this[_0xb164cb(0x150)][_0xb164cb(0x15a)](_0x4a4d37):_0x22bc10===_0xb164cb(0x143)?_0x3ac2d4[_0xb164cb(0x14e)]=_0x4a4d37['toString']():_0x22bc10===_0xb164cb(0x195)?_0x3ac2d4[_0xb164cb(0x14e)]=this[_0xb164cb(0xd4)][_0xb164cb(0x15a)](_0x4a4d37):_0x22bc10===_0xb164cb(0xf0)&&this[_0xb164cb(0xf5)]?_0x3ac2d4[_0xb164cb(0x14e)]=this['_Symbol'][_0xb164cb(0xfc)][_0xb164cb(0x15c)][_0xb164cb(0x15a)](_0x4a4d37):!_0x51a527[_0xb164cb(0xcc)]&&!(_0x22bc10==='null'||_0x22bc10===_0xb164cb(0x187))&&(delete _0x3ac2d4[_0xb164cb(0x14e)],_0x3ac2d4[_0xb164cb(0x12f)]=!0x0),_0x3830ac&&(_0x3ac2d4['cappedProps']=!0x0),_0x21d03e=_0x51a527['node'][_0xb164cb(0x128)],_0x51a527[_0xb164cb(0x169)][_0xb164cb(0x128)]=_0x3ac2d4,this[_0xb164cb(0x122)](_0x3ac2d4,_0x51a527),_0x4f51de[_0xb164cb(0x178)]){for(_0x24d749=0x0,_0x78e3cb=_0x4f51de[_0xb164cb(0x178)];_0x24d749<_0x78e3cb;_0x24d749++)_0x4f51de[_0x24d749](_0x24d749);}_0x3d1eb8[_0xb164cb(0x178)]&&(_0x3ac2d4[_0xb164cb(0x179)]=_0x3d1eb8);}catch(_0x29e7fc){_0x3b1f57(_0x29e7fc,_0x3ac2d4,_0x51a527);}return this[_0xb164cb(0x193)](_0x4a4d37,_0x3ac2d4),this[_0xb164cb(0x180)](_0x3ac2d4,_0x51a527),_0x51a527[_0xb164cb(0x169)][_0xb164cb(0x128)]=_0x21d03e,_0x51a527[_0xb164cb(0x1aa)]--,_0x51a527['autoExpand']=_0x9246a9,_0x51a527[_0xb164cb(0x166)]&&_0x51a527[_0xb164cb(0x170)]['pop'](),_0x3ac2d4;}['_getOwnPropertySymbols'](_0x1d7ad1){var _0x16fe03=_0x4ff05d;return Object['getOwnPropertySymbols']?Object[_0x16fe03(0xd0)](_0x1d7ad1):[];}[_0x4ff05d(0xe2)](_0x44560b){var _0x4e04b3=_0x4ff05d;return!!(_0x44560b&&_0x269569['Set']&&this['_objectToString'](_0x44560b)==='[object\\x20Set]'&&_0x44560b[_0x4e04b3(0x17e)]);}['_blacklistedProperty'](_0x36f520,_0x132978,_0x152c3c){var _0x16ccd1=_0x4ff05d;return _0x152c3c[_0x16ccd1(0x1a9)]?typeof _0x36f520[_0x132978]==_0x16ccd1(0x132):!0x1;}[_0x4ff05d(0xe4)](_0x50500e){var _0x842566=_0x4ff05d,_0x37f656='';return _0x37f656=typeof _0x50500e,_0x37f656===_0x842566(0x194)?this[_0x842566(0xf4)](_0x50500e)==='[object\\x20Array]'?_0x37f656=_0x842566(0x135):this[_0x842566(0xf4)](_0x50500e)==='[object\\x20Date]'?_0x37f656=_0x842566(0x186):this[_0x842566(0xf4)](_0x50500e)==='[object\\x20BigInt]'?_0x37f656=_0x842566(0x143):_0x50500e===null?_0x37f656=_0x842566(0xe8):_0x50500e[_0x842566(0x1a8)]&&(_0x37f656=_0x50500e[_0x842566(0x1a8)]['name']||_0x37f656):_0x37f656===_0x842566(0x187)&&this['_HTMLAllCollection']&&_0x50500e instanceof this[_0x842566(0x119)]&&(_0x37f656=_0x842566(0x18e)),_0x37f656;}['_objectToString'](_0x45dc58){var _0x41ebef=_0x4ff05d;return Object['prototype'][_0x41ebef(0x15c)]['call'](_0x45dc58);}[_0x4ff05d(0x14f)](_0xcfc0be){var _0x2a8ca4=_0x4ff05d;return _0xcfc0be===_0x2a8ca4(0xd3)||_0xcfc0be===_0x2a8ca4(0x189)||_0xcfc0be==='number';}['_isPrimitiveWrapperType'](_0x10c5f5){var _0x44359b=_0x4ff05d;return _0x10c5f5==='Boolean'||_0x10c5f5===_0x44359b(0xde)||_0x10c5f5===_0x44359b(0x174);}[_0x4ff05d(0x109)](_0x1dd1f9,_0x38aa69,_0x5f01b6,_0x255f5c,_0x2760ad,_0x562ad8){var _0x53308e=this;return function(_0xb79a60){var _0x9980df=_0xe1a3,_0x339b50=_0x2760ad[_0x9980df(0x169)][_0x9980df(0x128)],_0x4a5b55=_0x2760ad[_0x9980df(0x169)][_0x9980df(0xdd)],_0x28a58e=_0x2760ad[_0x9980df(0x169)][_0x9980df(0x12b)];_0x2760ad[_0x9980df(0x169)][_0x9980df(0x12b)]=_0x339b50,_0x2760ad['node'][_0x9980df(0xdd)]=typeof _0x255f5c=='number'?_0x255f5c:_0xb79a60,_0x1dd1f9[_0x9980df(0x18a)](_0x53308e[_0x9980df(0x1ac)](_0x38aa69,_0x5f01b6,_0x255f5c,_0x2760ad,_0x562ad8)),_0x2760ad[_0x9980df(0x169)][_0x9980df(0x12b)]=_0x28a58e,_0x2760ad['node'][_0x9980df(0xdd)]=_0x4a5b55;};}[_0x4ff05d(0x10b)](_0x4fc405,_0x8cf334,_0x56595e,_0x14108a,_0xbed4a,_0x459da6,_0x4c58e7){var _0x376bbd=_0x4ff05d,_0x22da77=this;return _0x8cf334[_0x376bbd(0xe0)+_0xbed4a[_0x376bbd(0x15c)]()]=!0x0,function(_0x2fef76){var _0x437d6a=_0x376bbd,_0x8e1756=_0x459da6[_0x437d6a(0x169)][_0x437d6a(0x128)],_0x1da2e3=_0x459da6[_0x437d6a(0x169)][_0x437d6a(0xdd)],_0x2e3aed=_0x459da6[_0x437d6a(0x169)][_0x437d6a(0x12b)];_0x459da6[_0x437d6a(0x169)][_0x437d6a(0x12b)]=_0x8e1756,_0x459da6[_0x437d6a(0x169)][_0x437d6a(0xdd)]=_0x2fef76,_0x4fc405['push'](_0x22da77[_0x437d6a(0x1ac)](_0x56595e,_0x14108a,_0xbed4a,_0x459da6,_0x4c58e7)),_0x459da6[_0x437d6a(0x169)][_0x437d6a(0x12b)]=_0x2e3aed,_0x459da6['node'][_0x437d6a(0xdd)]=_0x1da2e3;};}[_0x4ff05d(0x1ac)](_0x1da41f,_0x5119e8,_0x3ce2bc,_0x322d92,_0x15fd3a){var _0x49306f=_0x4ff05d,_0x187f22=this;_0x15fd3a||(_0x15fd3a=function(_0x2acb8d,_0x3b5007){return _0x2acb8d[_0x3b5007];});var _0x1c5a8b=_0x3ce2bc[_0x49306f(0x15c)](),_0x2059df=_0x322d92['expressionsToEvaluate']||{},_0x1cddee=_0x322d92[_0x49306f(0xcc)],_0x2f4613=_0x322d92[_0x49306f(0xdf)];try{var _0x256760=this[_0x49306f(0x12e)](_0x1da41f),_0x5464e8=_0x1c5a8b;_0x256760&&_0x5464e8[0x0]==='\\x27'&&(_0x5464e8=_0x5464e8[_0x49306f(0x173)](0x1,_0x5464e8['length']-0x2));var _0x21ea7f=_0x322d92[_0x49306f(0x19f)]=_0x2059df[_0x49306f(0xe0)+_0x5464e8];_0x21ea7f&&(_0x322d92[_0x49306f(0xcc)]=_0x322d92[_0x49306f(0xcc)]+0x1),_0x322d92[_0x49306f(0xdf)]=!!_0x21ea7f;var _0x57543e=typeof _0x3ce2bc==_0x49306f(0xf0),_0x3da362={'name':_0x57543e||_0x256760?_0x1c5a8b:this[_0x49306f(0x148)](_0x1c5a8b)};if(_0x57543e&&(_0x3da362[_0x49306f(0xf0)]=!0x0),!(_0x5119e8===_0x49306f(0x135)||_0x5119e8===_0x49306f(0x19b))){var _0x1a4702=this['_getOwnPropertyDescriptor'](_0x1da41f,_0x3ce2bc);if(_0x1a4702&&(_0x1a4702[_0x49306f(0x16b)]&&(_0x3da362[_0x49306f(0xf9)]=!0x0),_0x1a4702[_0x49306f(0x105)]&&!_0x21ea7f&&!_0x322d92[_0x49306f(0x149)]))return _0x3da362[_0x49306f(0x141)]=!0x0,this[_0x49306f(0xeb)](_0x3da362,_0x322d92),_0x3da362;}var _0x508291;try{_0x508291=_0x15fd3a(_0x1da41f,_0x3ce2bc);}catch(_0x290d66){return _0x3da362={'name':_0x1c5a8b,'type':'unknown','error':_0x290d66['message']},this[_0x49306f(0xeb)](_0x3da362,_0x322d92),_0x3da362;}var _0x1aa7dc=this[_0x49306f(0xe4)](_0x508291),_0x5bdfaa=this[_0x49306f(0x14f)](_0x1aa7dc);if(_0x3da362[_0x49306f(0x126)]=_0x1aa7dc,_0x5bdfaa)this[_0x49306f(0xeb)](_0x3da362,_0x322d92,_0x508291,function(){var _0x5e824a=_0x49306f;_0x3da362['value']=_0x508291[_0x5e824a(0x130)](),!_0x21ea7f&&_0x187f22[_0x5e824a(0x1a0)](_0x1aa7dc,_0x3da362,_0x322d92,{});});else{var _0x32c361=_0x322d92[_0x49306f(0x166)]&&_0x322d92[_0x49306f(0x1aa)]<_0x322d92[_0x49306f(0xe3)]&&_0x322d92[_0x49306f(0x170)][_0x49306f(0x1a7)](_0x508291)<0x0&&_0x1aa7dc!==_0x49306f(0x132)&&_0x322d92[_0x49306f(0xec)]<_0x322d92[_0x49306f(0x163)];_0x32c361||_0x322d92[_0x49306f(0x1aa)]<_0x1cddee||_0x21ea7f?(this[_0x49306f(0x14b)](_0x3da362,_0x508291,_0x322d92,_0x21ea7f||{}),this['_additionalMetadata'](_0x508291,_0x3da362)):this['_processTreeNodeResult'](_0x3da362,_0x322d92,_0x508291,function(){var _0x57c377=_0x49306f;_0x1aa7dc==='null'||_0x1aa7dc===_0x57c377(0x187)||(delete _0x3da362[_0x57c377(0x14e)],_0x3da362[_0x57c377(0x12f)]=!0x0);});}return _0x3da362;}finally{_0x322d92['expressionsToEvaluate']=_0x2059df,_0x322d92[_0x49306f(0xcc)]=_0x1cddee,_0x322d92[_0x49306f(0xdf)]=_0x2f4613;}}[_0x4ff05d(0x1a0)](_0x1f840b,_0x47afb5,_0x1bd95a,_0x411db7){var _0x3d88c7=_0x4ff05d,_0x5d3807=_0x411db7['strLength']||_0x1bd95a['strLength'];if((_0x1f840b===_0x3d88c7(0x189)||_0x1f840b==='String')&&_0x47afb5[_0x3d88c7(0x14e)]){let _0x9cbb4=_0x47afb5['value'][_0x3d88c7(0x178)];_0x1bd95a[_0x3d88c7(0x157)]+=_0x9cbb4,_0x1bd95a[_0x3d88c7(0x157)]>_0x1bd95a['totalStrLength']?(_0x47afb5[_0x3d88c7(0x12f)]='',delete _0x47afb5[_0x3d88c7(0x14e)]):_0x9cbb4>_0x5d3807&&(_0x47afb5[_0x3d88c7(0x12f)]=_0x47afb5[_0x3d88c7(0x14e)]['substr'](0x0,_0x5d3807),delete _0x47afb5['value']);}}['_isMap'](_0x22eda0){var _0x228921=_0x4ff05d;return!!(_0x22eda0&&_0x269569[_0x228921(0x15d)]&&this[_0x228921(0xf4)](_0x22eda0)===_0x228921(0x123)&&_0x22eda0[_0x228921(0x17e)]);}[_0x4ff05d(0x148)](_0x3ecb1a){var _0x3146de=_0x4ff05d;if(_0x3ecb1a[_0x3146de(0x19d)](/^\\d+$/))return _0x3ecb1a;var _0x28e676;try{_0x28e676=JSON[_0x3146de(0x147)](''+_0x3ecb1a);}catch{_0x28e676='\\x22'+this[_0x3146de(0xf4)](_0x3ecb1a)+'\\x22';}return _0x28e676[_0x3146de(0x19d)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x28e676=_0x28e676[_0x3146de(0x173)](0x1,_0x28e676[_0x3146de(0x178)]-0x2):_0x28e676=_0x28e676['replace'](/'/g,'\\x5c\\x27')[_0x3146de(0x14a)](/\\\\\"/g,'\\x22')[_0x3146de(0x14a)](/(^\"|\"$)/g,'\\x27'),_0x28e676;}[_0x4ff05d(0xeb)](_0x4ce195,_0x4122a6,_0x1d510f,_0x18ed5f){var _0x2ee252=_0x4ff05d;this['_treeNodePropertiesBeforeFullValue'](_0x4ce195,_0x4122a6),_0x18ed5f&&_0x18ed5f(),this['_additionalMetadata'](_0x1d510f,_0x4ce195),this[_0x2ee252(0x180)](_0x4ce195,_0x4122a6);}[_0x4ff05d(0x122)](_0x4309aa,_0x43ca8b){var _0x317ae6=_0x4ff05d;this[_0x317ae6(0x10a)](_0x4309aa,_0x43ca8b),this[_0x317ae6(0xd7)](_0x4309aa,_0x43ca8b),this[_0x317ae6(0x1ae)](_0x4309aa,_0x43ca8b),this[_0x317ae6(0x10f)](_0x4309aa,_0x43ca8b);}[_0x4ff05d(0x10a)](_0xa533dd,_0x4418e6){}[_0x4ff05d(0xd7)](_0x2f284d,_0xbe983c){}[_0x4ff05d(0x113)](_0x25f09c,_0x2a92c3){}[_0x4ff05d(0x181)](_0x54d912){var _0x1a4d36=_0x4ff05d;return _0x54d912===this[_0x1a4d36(0x192)];}[_0x4ff05d(0x180)](_0x401b38,_0x3bcc58){var _0x3e560b=_0x4ff05d;this[_0x3e560b(0x113)](_0x401b38,_0x3bcc58),this[_0x3e560b(0x154)](_0x401b38),_0x3bcc58[_0x3e560b(0x167)]&&this[_0x3e560b(0x13f)](_0x401b38),this['_addFunctionsNode'](_0x401b38,_0x3bcc58),this['_addLoadNode'](_0x401b38,_0x3bcc58),this[_0x3e560b(0x16a)](_0x401b38);}[_0x4ff05d(0x193)](_0x1a9892,_0x4eb3ac){var _0x445444=_0x4ff05d;let _0x1eac7b;try{_0x269569[_0x445444(0x1a2)]&&(_0x1eac7b=_0x269569[_0x445444(0x1a2)][_0x445444(0x159)],_0x269569[_0x445444(0x1a2)][_0x445444(0x159)]=function(){}),_0x1a9892&&typeof _0x1a9892[_0x445444(0x178)]==_0x445444(0x1a4)&&(_0x4eb3ac[_0x445444(0x178)]=_0x1a9892[_0x445444(0x178)]);}catch{}finally{_0x1eac7b&&(_0x269569[_0x445444(0x1a2)][_0x445444(0x159)]=_0x1eac7b);}if(_0x4eb3ac['type']===_0x445444(0x1a4)||_0x4eb3ac['type']==='Number'){if(isNaN(_0x4eb3ac['value']))_0x4eb3ac[_0x445444(0x198)]=!0x0,delete _0x4eb3ac[_0x445444(0x14e)];else switch(_0x4eb3ac[_0x445444(0x14e)]){case Number[_0x445444(0x156)]:_0x4eb3ac['positiveInfinity']=!0x0,delete _0x4eb3ac[_0x445444(0x14e)];break;case Number[_0x445444(0x14c)]:_0x4eb3ac[_0x445444(0x11f)]=!0x0,delete _0x4eb3ac['value'];break;case 0x0:this['_isNegativeZero'](_0x4eb3ac[_0x445444(0x14e)])&&(_0x4eb3ac[_0x445444(0x11c)]=!0x0);break;}}else _0x4eb3ac[_0x445444(0x126)]===_0x445444(0x132)&&typeof _0x1a9892[_0x445444(0x139)]==_0x445444(0x189)&&_0x1a9892['name']&&_0x4eb3ac[_0x445444(0x139)]&&_0x1a9892[_0x445444(0x139)]!==_0x4eb3ac[_0x445444(0x139)]&&(_0x4eb3ac[_0x445444(0x137)]=_0x1a9892['name']);}[_0x4ff05d(0x110)](_0x35fc99){var _0x2cdb7d=_0x4ff05d;return 0x1/_0x35fc99===Number[_0x2cdb7d(0x14c)];}[_0x4ff05d(0x13f)](_0x36a950){var _0x369f6e=_0x4ff05d;!_0x36a950['props']||!_0x36a950['props'][_0x369f6e(0x178)]||_0x36a950[_0x369f6e(0x126)]===_0x369f6e(0x135)||_0x36a950[_0x369f6e(0x126)]==='Map'||_0x36a950[_0x369f6e(0x126)]===_0x369f6e(0xea)||_0x36a950['props'][_0x369f6e(0x171)](function(_0x3f86f5,_0x311f76){var _0x236385=_0x369f6e,_0x35b404=_0x3f86f5[_0x236385(0x139)][_0x236385(0x183)](),_0x650156=_0x311f76[_0x236385(0x139)]['toLowerCase']();return _0x35b404<_0x650156?-0x1:_0x35b404>_0x650156?0x1:0x0;});}[_0x4ff05d(0x133)](_0x2f1ebc,_0x50105a){var _0xbfcd7d=_0x4ff05d;if(!(_0x50105a[_0xbfcd7d(0x1a9)]||!_0x2f1ebc[_0xbfcd7d(0x179)]||!_0x2f1ebc[_0xbfcd7d(0x179)]['length'])){for(var _0x253a6a=[],_0x2102b6=[],_0x2bb908=0x0,_0x546f89=_0x2f1ebc[_0xbfcd7d(0x179)][_0xbfcd7d(0x178)];_0x2bb908<_0x546f89;_0x2bb908++){var _0x1cbd3e=_0x2f1ebc['props'][_0x2bb908];_0x1cbd3e['type']==='function'?_0x253a6a[_0xbfcd7d(0x18a)](_0x1cbd3e):_0x2102b6[_0xbfcd7d(0x18a)](_0x1cbd3e);}if(!(!_0x2102b6['length']||_0x253a6a[_0xbfcd7d(0x178)]<=0x1)){_0x2f1ebc[_0xbfcd7d(0x179)]=_0x2102b6;var _0x1a40f3={'functionsNode':!0x0,'props':_0x253a6a};this['_setNodeId'](_0x1a40f3,_0x50105a),this[_0xbfcd7d(0x113)](_0x1a40f3,_0x50105a),this[_0xbfcd7d(0x154)](_0x1a40f3),this[_0xbfcd7d(0x10f)](_0x1a40f3,_0x50105a),_0x1a40f3['id']+='\\x20f',_0x2f1ebc[_0xbfcd7d(0x179)][_0xbfcd7d(0x120)](_0x1a40f3);}}}[_0x4ff05d(0x188)](_0x46e259,_0x47f4eb){}[_0x4ff05d(0x154)](_0x1d9f64){}['_isArray'](_0xda35a3){var _0x2a28dd=_0x4ff05d;return Array['isArray'](_0xda35a3)||typeof _0xda35a3=='object'&&this[_0x2a28dd(0xf4)](_0xda35a3)===_0x2a28dd(0xda);}[_0x4ff05d(0x10f)](_0x2ad62b,_0x3d8b5c){}['_cleanNode'](_0x125644){var _0x1573c2=_0x4ff05d;delete _0x125644[_0x1573c2(0xca)],delete _0x125644['_hasSetOnItsPath'],delete _0x125644[_0x1573c2(0x158)];}['_setNodeExpressionPath'](_0x23066f,_0x31c14e){}}let _0x530de9=new _0x4bec75(),_0x5bb14b={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x462f4d={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x5439d6(_0x453dfa,_0x415706,_0x2d7675,_0x22037c,_0x43ea92,_0x50f5f6){var _0x27b06c=_0x4ff05d;let _0x4f017d,_0x4782f7;try{_0x4782f7=_0x41cee5(),_0x4f017d=_0x309406[_0x415706],!_0x4f017d||_0x4782f7-_0x4f017d['ts']>0x1f4&&_0x4f017d[_0x27b06c(0x121)]&&_0x4f017d['time']/_0x4f017d[_0x27b06c(0x121)]<0x64?(_0x309406[_0x415706]=_0x4f017d={'count':0x0,'time':0x0,'ts':_0x4782f7},_0x309406['hits']={}):_0x4782f7-_0x309406['hits']['ts']>0x32&&_0x309406[_0x27b06c(0x160)][_0x27b06c(0x121)]&&_0x309406['hits']['time']/_0x309406['hits'][_0x27b06c(0x121)]<0x64&&(_0x309406[_0x27b06c(0x160)]={});let _0xe784a6=[],_0x375cac=_0x4f017d[_0x27b06c(0xdc)]||_0x309406['hits']['reduceLimits']?_0x462f4d:_0x5bb14b,_0x351b28=_0x59669e=>{var _0x5be152=_0x27b06c;let _0x21cc5c={};return _0x21cc5c['props']=_0x59669e[_0x5be152(0x179)],_0x21cc5c[_0x5be152(0x1b2)]=_0x59669e[_0x5be152(0x1b2)],_0x21cc5c['strLength']=_0x59669e[_0x5be152(0x177)],_0x21cc5c['totalStrLength']=_0x59669e[_0x5be152(0xfa)],_0x21cc5c[_0x5be152(0x163)]=_0x59669e[_0x5be152(0x163)],_0x21cc5c[_0x5be152(0xe3)]=_0x59669e[_0x5be152(0xe3)],_0x21cc5c[_0x5be152(0x167)]=!0x1,_0x21cc5c[_0x5be152(0x1a9)]=!_0xb6c728,_0x21cc5c[_0x5be152(0xcc)]=0x1,_0x21cc5c[_0x5be152(0x1aa)]=0x0,_0x21cc5c[_0x5be152(0xd8)]='root_exp_id',_0x21cc5c['rootExpression']='root_exp',_0x21cc5c[_0x5be152(0x166)]=!0x0,_0x21cc5c['autoExpandPreviousObjects']=[],_0x21cc5c[_0x5be152(0xec)]=0x0,_0x21cc5c['resolveGetters']=!0x0,_0x21cc5c[_0x5be152(0x157)]=0x0,_0x21cc5c[_0x5be152(0x169)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x21cc5c;};for(var _0x5659d5=0x0;_0x5659d5<_0x43ea92[_0x27b06c(0x178)];_0x5659d5++)_0xe784a6[_0x27b06c(0x18a)](_0x530de9[_0x27b06c(0x14b)]({'timeNode':_0x453dfa===_0x27b06c(0x172)||void 0x0},_0x43ea92[_0x5659d5],_0x351b28(_0x375cac),{}));if(_0x453dfa===_0x27b06c(0x142)){let _0x3d506b=Error[_0x27b06c(0xd2)];try{Error[_0x27b06c(0xd2)]=0x1/0x0,_0xe784a6['push'](_0x530de9['serialize']({'stackNode':!0x0},new Error()[_0x27b06c(0x13a)],_0x351b28(_0x375cac),{'strLength':0x1/0x0}));}finally{Error[_0x27b06c(0xd2)]=_0x3d506b;}}return{'method':_0x27b06c(0x131),'version':_0x583925,'args':[{'ts':_0x2d7675,'session':_0x22037c,'args':_0xe784a6,'id':_0x415706,'context':_0x50f5f6}]};}catch(_0x50b21c){return{'method':_0x27b06c(0x131),'version':_0x583925,'args':[{'ts':_0x2d7675,'session':_0x22037c,'args':[{'type':_0x27b06c(0xf2),'error':_0x50b21c&&_0x50b21c[_0x27b06c(0x152)]}],'id':_0x415706,'context':_0x50f5f6}]};}finally{try{if(_0x4f017d&&_0x4782f7){let _0x6e3f50=_0x41cee5();_0x4f017d[_0x27b06c(0x121)]++,_0x4f017d[_0x27b06c(0x172)]+=_0x50d7d1(_0x4782f7,_0x6e3f50),_0x4f017d['ts']=_0x6e3f50,_0x309406[_0x27b06c(0x160)][_0x27b06c(0x121)]++,_0x309406['hits'][_0x27b06c(0x172)]+=_0x50d7d1(_0x4782f7,_0x6e3f50),_0x309406[_0x27b06c(0x160)]['ts']=_0x6e3f50,(_0x4f017d[_0x27b06c(0x121)]>0x32||_0x4f017d[_0x27b06c(0x172)]>0x64)&&(_0x4f017d[_0x27b06c(0xdc)]=!0x0),(_0x309406['hits']['count']>0x3e8||_0x309406[_0x27b06c(0x160)][_0x27b06c(0x172)]>0x12c)&&(_0x309406[_0x27b06c(0x160)][_0x27b06c(0xdc)]=!0x0);}}catch{}}}return _0x5439d6;}((_0x436b2f,_0x5e9e68,_0x739f51,_0x200859,_0x5ade45,_0x3c0c4a,_0x2e9ef4,_0x52f7b9,_0x489bcc,_0x4b0904)=>{var _0x3eb34b=_0x24ae32;if(_0x436b2f['_console_ninja'])return _0x436b2f[_0x3eb34b(0x10c)];if(!J(_0x436b2f,_0x52f7b9,_0x5ade45))return _0x436b2f['_console_ninja']={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x436b2f['_console_ninja'];let _0x17ed1e=W(_0x436b2f),_0x5b8aae=_0x17ed1e[_0x3eb34b(0xf1)],_0x358f86=_0x17ed1e[_0x3eb34b(0x106)],_0x1db0c7=_0x17ed1e[_0x3eb34b(0x168)],_0x5edab2={'hits':{},'ts':{}},_0x2306a6=Y(_0x436b2f,_0x489bcc,_0x5edab2,_0x3c0c4a),_0x5c2099=_0x39c657=>{_0x5edab2['ts'][_0x39c657]=_0x358f86();},_0x3a97e3=(_0x231603,_0x32531e)=>{var _0x2a1511=_0x3eb34b;let _0x5019aa=_0x5edab2['ts'][_0x32531e];if(delete _0x5edab2['ts'][_0x32531e],_0x5019aa){let _0x26ffff=_0x5b8aae(_0x5019aa,_0x358f86());_0x482728(_0x2306a6(_0x2a1511(0x172),_0x231603,_0x1db0c7(),_0x109c4f,[_0x26ffff],_0x32531e));}},_0x160f42=_0x40a389=>_0x174f3e=>{var _0x581236=_0x3eb34b;try{_0x5c2099(_0x174f3e),_0x40a389(_0x174f3e);}finally{_0x436b2f[_0x581236(0x1a2)][_0x581236(0x172)]=_0x40a389;}},_0x46bc9a=_0x8b78e8=>_0x4c80fe=>{var _0x44e4b4=_0x3eb34b;try{let [_0x285c7c,_0x16c463]=_0x4c80fe[_0x44e4b4(0x18c)](':logPointId:');_0x3a97e3(_0x16c463,_0x285c7c),_0x8b78e8(_0x285c7c);}finally{_0x436b2f[_0x44e4b4(0x1a2)]['timeEnd']=_0x8b78e8;}};_0x436b2f[_0x3eb34b(0x10c)]={'consoleLog':(_0x1bc2ea,_0x3f3e00)=>{var _0x4b6724=_0x3eb34b;_0x436b2f['console'][_0x4b6724(0x131)]['name']!==_0x4b6724(0x116)&&_0x482728(_0x2306a6('log',_0x1bc2ea,_0x1db0c7(),_0x109c4f,_0x3f3e00));},'consoleTrace':(_0x1fa5f1,_0x122566)=>{var _0x122607=_0x3eb34b;_0x436b2f[_0x122607(0x1a2)][_0x122607(0x131)]['name']!==_0x122607(0x103)&&_0x482728(_0x2306a6(_0x122607(0x142),_0x1fa5f1,_0x1db0c7(),_0x109c4f,_0x122566));},'consoleTime':()=>{var _0x4d68d2=_0x3eb34b;_0x436b2f[_0x4d68d2(0x1a2)][_0x4d68d2(0x172)]=_0x160f42(_0x436b2f['console']['time']);},'consoleTimeEnd':()=>{var _0x3453b4=_0x3eb34b;_0x436b2f[_0x3453b4(0x1a2)][_0x3453b4(0x175)]=_0x46bc9a(_0x436b2f[_0x3453b4(0x1a2)][_0x3453b4(0x175)]);},'autoLog':(_0x449076,_0x2e7866)=>{var _0x5828ec=_0x3eb34b;_0x482728(_0x2306a6(_0x5828ec(0x131),_0x2e7866,_0x1db0c7(),_0x109c4f,[_0x449076]));},'autoLogMany':(_0x53314b,_0x42a9f5)=>{var _0x13e6ec=_0x3eb34b;_0x482728(_0x2306a6(_0x13e6ec(0x131),_0x53314b,_0x1db0c7(),_0x109c4f,_0x42a9f5));},'autoTrace':(_0x564590,_0x101283)=>{var _0x223bdf=_0x3eb34b;_0x482728(_0x2306a6(_0x223bdf(0x142),_0x101283,_0x1db0c7(),_0x109c4f,[_0x564590]));},'autoTraceMany':(_0x553423,_0x3690e0)=>{var _0x35ab7e=_0x3eb34b;_0x482728(_0x2306a6(_0x35ab7e(0x142),_0x553423,_0x1db0c7(),_0x109c4f,_0x3690e0));},'autoTime':(_0x2540cc,_0x2ad40f,_0x2cc138)=>{_0x5c2099(_0x2cc138);},'autoTimeEnd':(_0x30e6d3,_0x4c710,_0x38d515)=>{_0x3a97e3(_0x4c710,_0x38d515);},'coverage':_0x6611fa=>{var _0x55a654=_0x3eb34b;_0x482728({'method':_0x55a654(0x15f),'version':_0x3c0c4a,'args':[{'id':_0x6611fa}]});}};let _0x482728=b(_0x436b2f,_0x5e9e68,_0x739f51,_0x200859,_0x5ade45,_0x4b0904),_0x109c4f=_0x436b2f[_0x3eb34b(0x17c)];return _0x436b2f['_console_ninja'];})(globalThis,_0x24ae32(0x1b0),_0x24ae32(0xd6),_0x24ae32(0x11d),_0x24ae32(0x10e),_0x24ae32(0x17a),'1712570256879',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"Mahfuj\",\"192.168.0.4\",\"192.168.96.1\"],_0x24ae32(0x1ad),_0x24ae32(0x11e));");
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