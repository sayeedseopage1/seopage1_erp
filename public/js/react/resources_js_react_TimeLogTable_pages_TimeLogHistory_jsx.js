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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';function _0x3c8e(){var _0x5eeb9b=['enumerable','data','_connected','_dateToString','node','_console_ninja','stringify','setter','_p_name','close','versions','1','2246YTkSzy','unknown','Map','logger\\x20websocket\\x20error','replace','_isSet','message','default','_webSocketErrorDocsLink','[object\\x20Date]','isExpressionToEvaluate','_setNodePermissions','index','1235','name','hits','undefined','expId','array','_addLoadNode','_p_','forEach','disabledTrace','push','_reconnectTimeout','location','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','_console_ninja_session','trace','_hasMapOnItsPath','\\x20browser','nodeModules','Number','1720421561076','Buffer','process','warn','origin','_property','_treeNodePropertiesBeforeFullValue','cappedElements','Boolean','_getOwnPropertyDescriptor','allStrLength','send','edge','_setNodeExpandableState','substr','_isArray','_socket','4049394rDwCpX','1598338DyRbTf','perf_hooks','bind','null','port','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','autoExpandPropertyCount','_connectToHostNow','autoExpand','[object\\x20Map]','1.0.0','_connecting','expressionsToEvaluate','[object\\x20Set]','getOwnPropertyDescriptor','_isNegativeZero','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','_processTreeNodeResult','62877710gpOMMo','type','valueOf','args','angular','now','_disposeWebsocket',\"c:\\\\Users\\\\User\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.328\\\\node_modules\",'_consoleNinjaAllowedToStart','_type','noFunctions','_isPrimitiveWrapperType','_cleanNode','5TLFOxY','log','props','onerror','_sendErrorMessage','dockerizedApp','_objectToString','_ws','cappedProps','time','eventReceivedCallback','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','positiveInfinity','Error','object','bigint','4313468GWUqUW','_keyStrRegExp','webpack','toString','onopen','value','_isUndefined','_WebSocketClass','reload','stack','length','depth','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','strLength','concat','includes','root_exp_id','hasOwnProperty','toLowerCase','gateway.docker.internal','_setNodeLabel','host','_getOwnPropertySymbols','nuxt','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','Set','_blacklistedProperty','_allowedToSend','5056956DiHpNd','prototype','_addObjectProperty','_setNodeId','onmessage','get','remix','join','url','date','_hasSymbolPropertyOnItsPath','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','_isMap','_numberRegExp','create','reduceLimits','_allowedToConnectOnSend','_sortProps','String','timeStamp','parse','console','nan','onclose','_capIfString','then','capped','WebSocket','_maxConnectAttemptCount','call','string','current','elapsed','performance','_attemptToReconnectShortly','rootExpression','autoExpandLimit','elements','number','_getOwnPropertyNames','autoExpandMaxDepth','9477TCaZxo','coverage','parent','_inNextEdge','_hasSetOnItsPath','10744kSmWZW','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','getOwnPropertySymbols','charAt','NEXT_RUNTIME','global','_treeNodePropertiesAfterFullValue','POSITIVE_INFINITY','getWebSocketClass','_undefined','[object\\x20Array]','sortProps','resolveGetters','_Symbol','_regExpToString','match','autoExpandPreviousObjects','stackTraceLimit','root_exp','unref','map','_WebSocket','env','__es'+'Module','_addProperty','127.0.0.1','boolean','getter','symbol','catch','function','count','_setNodeQueryPath','isArray','hostname','indexOf','set','...','negativeZero','negativeInfinity','disabledLog','_connectAttemptCount','_additionalMetadata','sort','serialize','path','test','NEGATIVE_INFINITY','https://tinyurl.com/37x8b79t','toUpperCase','totalStrLength','level','_isPrimitiveType','313HzvltY','_inBrowser','error','defineProperty','readyState','_HTMLAllCollection'];_0x3c8e=function(){return _0x5eeb9b;};return _0x3c8e();}var _0x10c22d=_0x1805;(function(_0x32a14e,_0x1fd815){var _0x45803d=_0x1805,_0x2a2af1=_0x32a14e();while(!![]){try{var _0x460fb4=-parseInt(_0x45803d(0x134))/0x1*(parseInt(_0x45803d(0x146))/0x2)+-parseInt(_0x45803d(0x1c4))/0x3+-parseInt(_0x45803d(0x1a8))/0x4+parseInt(_0x45803d(0x198))/0x5*(-parseInt(_0x45803d(0x178))/0x6)+-parseInt(_0x45803d(0x179))/0x7+-parseInt(_0x45803d(0xff))/0x8*(parseInt(_0x45803d(0xfa))/0x9)+parseInt(_0x45803d(0x18b))/0xa;if(_0x460fb4===_0x1fd815)break;else _0x2a2af1['push'](_0x2a2af1['shift']());}catch(_0x4f9400){_0x2a2af1['push'](_0x2a2af1['shift']());}}}(_0x3c8e,0xd0b39));var K=Object[_0x10c22d(0x1d2)],Q=Object[_0x10c22d(0x137)],G=Object[_0x10c22d(0x187)],ee=Object['getOwnPropertyNames'],te=Object['getPrototypeOf'],ne=Object[_0x10c22d(0x1c5)][_0x10c22d(0x1b9)],re=(_0x2a6a41,_0x1b92ce,_0x5d8ee7,_0x1151bc)=>{var _0x543deb=_0x10c22d;if(_0x1b92ce&&typeof _0x1b92ce==_0x543deb(0x1a6)||typeof _0x1b92ce==_0x543deb(0x11d)){for(let _0x3fd2f3 of ee(_0x1b92ce))!ne[_0x543deb(0x1e1)](_0x2a6a41,_0x3fd2f3)&&_0x3fd2f3!==_0x5d8ee7&&Q(_0x2a6a41,_0x3fd2f3,{'get':()=>_0x1b92ce[_0x3fd2f3],'enumerable':!(_0x1151bc=G(_0x1b92ce,_0x3fd2f3))||_0x1151bc[_0x543deb(0x13a)]});}return _0x2a6a41;},V=(_0x3393bc,_0x44aabf,_0x2f13a6)=>(_0x2f13a6=_0x3393bc!=null?K(te(_0x3393bc)):{},re(_0x44aabf||!_0x3393bc||!_0x3393bc[_0x10c22d(0x116)]?Q(_0x2f13a6,_0x10c22d(0x14d),{'value':_0x3393bc,'enumerable':!0x0}):_0x2f13a6,_0x3393bc)),x=class{constructor(_0x3a7b88,_0x8b2068,_0x59912a,_0x1466bf,_0x2a4aaa,_0x15f176){var _0x202f8b=_0x10c22d,_0xbedb22,_0x54de73,_0x1d020d,_0x1db0a9;this[_0x202f8b(0x104)]=_0x3a7b88,this[_0x202f8b(0x1bd)]=_0x8b2068,this[_0x202f8b(0x17d)]=_0x59912a,this['nodeModules']=_0x1466bf,this[_0x202f8b(0x19d)]=_0x2a4aaa,this['eventReceivedCallback']=_0x15f176,this['_allowedToSend']=!0x0,this[_0x202f8b(0x1d4)]=!0x0,this[_0x202f8b(0x13c)]=!0x1,this['_connecting']=!0x1,this['_inNextEdge']=((_0x54de73=(_0xbedb22=_0x3a7b88[_0x202f8b(0x169)])==null?void 0x0:_0xbedb22[_0x202f8b(0x115)])==null?void 0x0:_0x54de73[_0x202f8b(0x103)])==='edge',this['_inBrowser']=!((_0x1db0a9=(_0x1d020d=this[_0x202f8b(0x104)]['process'])==null?void 0x0:_0x1d020d[_0x202f8b(0x144)])!=null&&_0x1db0a9[_0x202f8b(0x13e)])&&!this[_0x202f8b(0xfd)],this[_0x202f8b(0x1af)]=null,this[_0x202f8b(0x128)]=0x0,this[_0x202f8b(0x1e0)]=0x14,this[_0x202f8b(0x14e)]=_0x202f8b(0x12f),this[_0x202f8b(0x19c)]=(this['_inBrowser']?'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20':_0x202f8b(0x1b4))+this['_webSocketErrorDocsLink'];}async[_0x10c22d(0x107)](){var _0x3d023b=_0x10c22d,_0x5b1226,_0x9b2c5d;if(this[_0x3d023b(0x1af)])return this['_WebSocketClass'];let _0x2a0e08;if(this[_0x3d023b(0x135)]||this[_0x3d023b(0xfd)])_0x2a0e08=this[_0x3d023b(0x104)][_0x3d023b(0x1df)];else{if((_0x5b1226=this['global'][_0x3d023b(0x169)])!=null&&_0x5b1226[_0x3d023b(0x114)])_0x2a0e08=(_0x9b2c5d=this['global'][_0x3d023b(0x169)])==null?void 0x0:_0x9b2c5d[_0x3d023b(0x114)];else try{let _0x49ad2c=await import(_0x3d023b(0x12c));_0x2a0e08=(await import((await import(_0x3d023b(0x1cc)))['pathToFileURL'](_0x49ad2c[_0x3d023b(0x1cb)](this['nodeModules'],'ws/index.js'))[_0x3d023b(0x1ab)]()))['default'];}catch{try{_0x2a0e08=require(require(_0x3d023b(0x12c))['join'](this[_0x3d023b(0x165)],'ws'));}catch{throw new Error(_0x3d023b(0x160));}}}return this[_0x3d023b(0x1af)]=_0x2a0e08,_0x2a0e08;}[_0x10c22d(0x180)](){var _0x341fa9=_0x10c22d;this['_connecting']||this[_0x341fa9(0x13c)]||this[_0x341fa9(0x128)]>=this[_0x341fa9(0x1e0)]||(this[_0x341fa9(0x1d4)]=!0x1,this[_0x341fa9(0x184)]=!0x0,this[_0x341fa9(0x128)]++,this['_ws']=new Promise((_0x114229,_0x2d84e0)=>{var _0x4010ee=_0x341fa9;this[_0x4010ee(0x107)]()['then'](_0x3ec4ce=>{var _0x40a740=_0x4010ee;let _0x5357be=new _0x3ec4ce('ws://'+(!this[_0x40a740(0x135)]&&this['dockerizedApp']?_0x40a740(0x1bb):this[_0x40a740(0x1bd)])+':'+this[_0x40a740(0x17d)]);_0x5357be[_0x40a740(0x19b)]=()=>{var _0x3159e2=_0x40a740;this[_0x3159e2(0x1c3)]=!0x1,this['_disposeWebsocket'](_0x5357be),this[_0x3159e2(0x1e6)](),_0x2d84e0(new Error(_0x3159e2(0x149)));},_0x5357be[_0x40a740(0x1ac)]=()=>{var _0x3c5554=_0x40a740;this[_0x3c5554(0x135)]||_0x5357be[_0x3c5554(0x177)]&&_0x5357be[_0x3c5554(0x177)][_0x3c5554(0x112)]&&_0x5357be[_0x3c5554(0x177)][_0x3c5554(0x112)](),_0x114229(_0x5357be);},_0x5357be[_0x40a740(0x1db)]=()=>{var _0x56e9a1=_0x40a740;this[_0x56e9a1(0x1d4)]=!0x0,this[_0x56e9a1(0x191)](_0x5357be),this[_0x56e9a1(0x1e6)]();},_0x5357be[_0x40a740(0x1c8)]=_0x34598b=>{var _0xa75ca0=_0x40a740;try{if(!(_0x34598b!=null&&_0x34598b[_0xa75ca0(0x13b)])||!this['eventReceivedCallback'])return;let _0x47fbce=JSON[_0xa75ca0(0x1d8)](_0x34598b[_0xa75ca0(0x13b)]);this[_0xa75ca0(0x1a2)](_0x47fbce['method'],_0x47fbce[_0xa75ca0(0x18e)],this[_0xa75ca0(0x104)],this[_0xa75ca0(0x135)]);}catch{}};})[_0x4010ee(0x1dd)](_0x302eda=>(this['_connected']=!0x0,this[_0x4010ee(0x184)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this['_allowedToSend']=!0x0,this[_0x4010ee(0x128)]=0x0,_0x302eda))[_0x4010ee(0x11c)](_0xe61e54=>(this[_0x4010ee(0x13c)]=!0x1,this['_connecting']=!0x1,console['warn'](_0x4010ee(0x17e)+this['_webSocketErrorDocsLink']),_0x2d84e0(new Error(_0x4010ee(0x1cf)+(_0xe61e54&&_0xe61e54[_0x4010ee(0x14c)])))));}));}[_0x10c22d(0x191)](_0x380045){var _0x5e6394=_0x10c22d;this[_0x5e6394(0x13c)]=!0x1,this[_0x5e6394(0x184)]=!0x1;try{_0x380045[_0x5e6394(0x1db)]=null,_0x380045[_0x5e6394(0x19b)]=null,_0x380045[_0x5e6394(0x1ac)]=null;}catch{}try{_0x380045[_0x5e6394(0x138)]<0x2&&_0x380045[_0x5e6394(0x143)]();}catch{}}[_0x10c22d(0x1e6)](){var _0x1f46e4=_0x10c22d;clearTimeout(this[_0x1f46e4(0x15e)]),!(this[_0x1f46e4(0x128)]>=this['_maxConnectAttemptCount'])&&(this['_reconnectTimeout']=setTimeout(()=>{var _0x17606b=_0x1f46e4,_0x37f12a;this[_0x17606b(0x13c)]||this[_0x17606b(0x184)]||(this[_0x17606b(0x180)](),(_0x37f12a=this[_0x17606b(0x19f)])==null||_0x37f12a[_0x17606b(0x11c)](()=>this[_0x17606b(0x1e6)]()));},0x1f4),this[_0x1f46e4(0x15e)][_0x1f46e4(0x112)]&&this['_reconnectTimeout']['unref']());}async[_0x10c22d(0x172)](_0x277bff){var _0x2f2b3b=_0x10c22d;try{if(!this[_0x2f2b3b(0x1c3)])return;this[_0x2f2b3b(0x1d4)]&&this[_0x2f2b3b(0x180)](),(await this[_0x2f2b3b(0x19f)])[_0x2f2b3b(0x172)](JSON[_0x2f2b3b(0x140)](_0x277bff));}catch(_0x35bbd1){console['warn'](this[_0x2f2b3b(0x19c)]+':\\x20'+(_0x35bbd1&&_0x35bbd1[_0x2f2b3b(0x14c)])),this[_0x2f2b3b(0x1c3)]=!0x1,this[_0x2f2b3b(0x1e6)]();}}};function q(_0x1ff642,_0x2f4032,_0x2369ed,_0x4496ce,_0x346955,_0x56f140,_0x153f83,_0x3feba7=ie){var _0x39bbb5=_0x10c22d;let _0x319a61=_0x2369ed['split'](',')[_0x39bbb5(0x113)](_0x3aa21f=>{var _0x239ca4=_0x39bbb5,_0x279977,_0x44d7d6,_0x455e14,_0x3b4519;try{if(!_0x1ff642[_0x239ca4(0x161)]){let _0x19b69c=((_0x44d7d6=(_0x279977=_0x1ff642['process'])==null?void 0x0:_0x279977['versions'])==null?void 0x0:_0x44d7d6[_0x239ca4(0x13e)])||((_0x3b4519=(_0x455e14=_0x1ff642[_0x239ca4(0x169)])==null?void 0x0:_0x455e14['env'])==null?void 0x0:_0x3b4519[_0x239ca4(0x103)])==='edge';(_0x346955==='next.js'||_0x346955===_0x239ca4(0x1ca)||_0x346955==='astro'||_0x346955===_0x239ca4(0x18f))&&(_0x346955+=_0x19b69c?'\\x20server':_0x239ca4(0x164)),_0x1ff642[_0x239ca4(0x161)]={'id':+new Date(),'tool':_0x346955},_0x153f83&&_0x346955&&!_0x19b69c&&console['log'](_0x239ca4(0x189)+(_0x346955[_0x239ca4(0x102)](0x0)[_0x239ca4(0x130)]()+_0x346955[_0x239ca4(0x175)](0x1))+',',_0x239ca4(0x100),_0x239ca4(0x1c0));}let _0x47def7=new x(_0x1ff642,_0x2f4032,_0x3aa21f,_0x4496ce,_0x56f140,_0x3feba7);return _0x47def7[_0x239ca4(0x172)][_0x239ca4(0x17b)](_0x47def7);}catch(_0x127f96){return console[_0x239ca4(0x16a)](_0x239ca4(0x1a3),_0x127f96&&_0x127f96[_0x239ca4(0x14c)]),()=>{};}});return _0x42bcef=>_0x319a61[_0x39bbb5(0x15b)](_0x1df573=>_0x1df573(_0x42bcef));}function ie(_0x4f6759,_0x16b305,_0x2d8f0f,_0x1c9f76){var _0x2787da=_0x10c22d;_0x1c9f76&&_0x4f6759===_0x2787da(0x1b0)&&_0x2d8f0f[_0x2787da(0x15f)][_0x2787da(0x1b0)]();}function b(_0x53a834){var _0x338573=_0x10c22d,_0x2b52b3,_0x312871;let _0x27c463=function(_0x451910,_0x355ecc){return _0x355ecc-_0x451910;},_0x241bb1;if(_0x53a834[_0x338573(0x1e5)])_0x241bb1=function(){var _0x25dfa6=_0x338573;return _0x53a834[_0x25dfa6(0x1e5)][_0x25dfa6(0x190)]();};else{if(_0x53a834[_0x338573(0x169)]&&_0x53a834[_0x338573(0x169)]['hrtime']&&((_0x312871=(_0x2b52b3=_0x53a834[_0x338573(0x169)])==null?void 0x0:_0x2b52b3[_0x338573(0x115)])==null?void 0x0:_0x312871[_0x338573(0x103)])!==_0x338573(0x173))_0x241bb1=function(){var _0x29a8d7=_0x338573;return _0x53a834[_0x29a8d7(0x169)]['hrtime']();},_0x27c463=function(_0x403ce6,_0x5d18ee){return 0x3e8*(_0x5d18ee[0x0]-_0x403ce6[0x0])+(_0x5d18ee[0x1]-_0x403ce6[0x1])/0xf4240;};else try{let {performance:_0x20aa35}=require(_0x338573(0x17a));_0x241bb1=function(){return _0x20aa35['now']();};}catch{_0x241bb1=function(){return+new Date();};}}return{'elapsed':_0x27c463,'timeStamp':_0x241bb1,'now':()=>Date['now']()};}function X(_0x141aef,_0x11387a,_0x3d28c8){var _0x390496=_0x10c22d,_0x650777,_0x37c7c1,_0x378534,_0x2e7f0c,_0x408d44;if(_0x141aef[_0x390496(0x193)]!==void 0x0)return _0x141aef[_0x390496(0x193)];let _0xfb5e0e=((_0x37c7c1=(_0x650777=_0x141aef[_0x390496(0x169)])==null?void 0x0:_0x650777[_0x390496(0x144)])==null?void 0x0:_0x37c7c1[_0x390496(0x13e)])||((_0x2e7f0c=(_0x378534=_0x141aef[_0x390496(0x169)])==null?void 0x0:_0x378534[_0x390496(0x115)])==null?void 0x0:_0x2e7f0c['NEXT_RUNTIME'])===_0x390496(0x173);return _0xfb5e0e&&_0x3d28c8===_0x390496(0x1bf)?_0x141aef[_0x390496(0x193)]=!0x1:_0x141aef[_0x390496(0x193)]=_0xfb5e0e||!_0x11387a||((_0x408d44=_0x141aef[_0x390496(0x15f)])==null?void 0x0:_0x408d44[_0x390496(0x121)])&&_0x11387a[_0x390496(0x1b7)](_0x141aef[_0x390496(0x15f)][_0x390496(0x121)]),_0x141aef['_consoleNinjaAllowedToStart'];}function H(_0x3426ce,_0x5778aa,_0x47b4a3,_0x12d0f9){var _0x31b1af=_0x10c22d;_0x3426ce=_0x3426ce,_0x5778aa=_0x5778aa,_0x47b4a3=_0x47b4a3,_0x12d0f9=_0x12d0f9;let _0x152038=b(_0x3426ce),_0x454b9c=_0x152038[_0x31b1af(0x1e4)],_0x27c00b=_0x152038['timeStamp'];class _0x47b72c{constructor(){var _0x5a7b11=_0x31b1af;this[_0x5a7b11(0x1a9)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x5a7b11(0x1d1)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0x5a7b11(0x108)]=_0x3426ce[_0x5a7b11(0x156)],this[_0x5a7b11(0x139)]=_0x3426ce['HTMLAllCollection'],this['_getOwnPropertyDescriptor']=Object[_0x5a7b11(0x187)],this['_getOwnPropertyNames']=Object['getOwnPropertyNames'],this[_0x5a7b11(0x10c)]=_0x3426ce['Symbol'],this['_regExpToString']=RegExp[_0x5a7b11(0x1c5)][_0x5a7b11(0x1ab)],this[_0x5a7b11(0x13d)]=Date[_0x5a7b11(0x1c5)]['toString'];}['serialize'](_0x110f7d,_0x2398ab,_0x10d048,_0x189694){var _0x39a5ed=_0x31b1af,_0x217d3a=this,_0x1b94db=_0x10d048[_0x39a5ed(0x181)];function _0x320e61(_0x506279,_0x1aee1b,_0x2f71b6){var _0x2e76cb=_0x39a5ed;_0x1aee1b[_0x2e76cb(0x18c)]=_0x2e76cb(0x147),_0x1aee1b[_0x2e76cb(0x136)]=_0x506279[_0x2e76cb(0x14c)],_0x5dafc9=_0x2f71b6['node'][_0x2e76cb(0x1e3)],_0x2f71b6[_0x2e76cb(0x13e)][_0x2e76cb(0x1e3)]=_0x1aee1b,_0x217d3a[_0x2e76cb(0x16d)](_0x1aee1b,_0x2f71b6);}try{_0x10d048['level']++,_0x10d048[_0x39a5ed(0x181)]&&_0x10d048['autoExpandPreviousObjects'][_0x39a5ed(0x15d)](_0x2398ab);var _0x45f9f6,_0x1551bc,_0x54fea1,_0x776ec8,_0x406967=[],_0x536934=[],_0x25372d,_0x4c0119=this[_0x39a5ed(0x194)](_0x2398ab),_0x1eaf82=_0x4c0119===_0x39a5ed(0x158),_0x17c26c=!0x1,_0x20a2dd=_0x4c0119===_0x39a5ed(0x11d),_0x5f4307=this[_0x39a5ed(0x133)](_0x4c0119),_0x2e1c61=this['_isPrimitiveWrapperType'](_0x4c0119),_0x3d4bd8=_0x5f4307||_0x2e1c61,_0x30d389={},_0x211ffb=0x0,_0x36976c=!0x1,_0x5dafc9,_0x407aea=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x10d048[_0x39a5ed(0x1b3)]){if(_0x1eaf82){if(_0x1551bc=_0x2398ab[_0x39a5ed(0x1b2)],_0x1551bc>_0x10d048[_0x39a5ed(0x1e9)]){for(_0x54fea1=0x0,_0x776ec8=_0x10d048[_0x39a5ed(0x1e9)],_0x45f9f6=_0x54fea1;_0x45f9f6<_0x776ec8;_0x45f9f6++)_0x536934[_0x39a5ed(0x15d)](_0x217d3a[_0x39a5ed(0x117)](_0x406967,_0x2398ab,_0x4c0119,_0x45f9f6,_0x10d048));_0x110f7d[_0x39a5ed(0x16e)]=!0x0;}else{for(_0x54fea1=0x0,_0x776ec8=_0x1551bc,_0x45f9f6=_0x54fea1;_0x45f9f6<_0x776ec8;_0x45f9f6++)_0x536934['push'](_0x217d3a['_addProperty'](_0x406967,_0x2398ab,_0x4c0119,_0x45f9f6,_0x10d048));}_0x10d048[_0x39a5ed(0x17f)]+=_0x536934[_0x39a5ed(0x1b2)];}if(!(_0x4c0119===_0x39a5ed(0x17c)||_0x4c0119===_0x39a5ed(0x156))&&!_0x5f4307&&_0x4c0119!==_0x39a5ed(0x1d6)&&_0x4c0119!==_0x39a5ed(0x168)&&_0x4c0119!==_0x39a5ed(0x1a7)){var _0x4d1499=_0x189694[_0x39a5ed(0x19a)]||_0x10d048[_0x39a5ed(0x19a)];if(this[_0x39a5ed(0x14b)](_0x2398ab)?(_0x45f9f6=0x0,_0x2398ab[_0x39a5ed(0x15b)](function(_0x330a53){var _0x4e0751=_0x39a5ed;if(_0x211ffb++,_0x10d048[_0x4e0751(0x17f)]++,_0x211ffb>_0x4d1499){_0x36976c=!0x0;return;}if(!_0x10d048['isExpressionToEvaluate']&&_0x10d048[_0x4e0751(0x181)]&&_0x10d048[_0x4e0751(0x17f)]>_0x10d048['autoExpandLimit']){_0x36976c=!0x0;return;}_0x536934[_0x4e0751(0x15d)](_0x217d3a[_0x4e0751(0x117)](_0x406967,_0x2398ab,_0x4e0751(0x1c1),_0x45f9f6++,_0x10d048,function(_0x23f77c){return function(){return _0x23f77c;};}(_0x330a53)));})):this[_0x39a5ed(0x1d0)](_0x2398ab)&&_0x2398ab['forEach'](function(_0x53cd87,_0x53a22a){var _0x41cf05=_0x39a5ed;if(_0x211ffb++,_0x10d048[_0x41cf05(0x17f)]++,_0x211ffb>_0x4d1499){_0x36976c=!0x0;return;}if(!_0x10d048['isExpressionToEvaluate']&&_0x10d048[_0x41cf05(0x181)]&&_0x10d048[_0x41cf05(0x17f)]>_0x10d048['autoExpandLimit']){_0x36976c=!0x0;return;}var _0x4bd6ab=_0x53a22a[_0x41cf05(0x1ab)]();_0x4bd6ab[_0x41cf05(0x1b2)]>0x64&&(_0x4bd6ab=_0x4bd6ab['slice'](0x0,0x64)+_0x41cf05(0x124)),_0x536934[_0x41cf05(0x15d)](_0x217d3a[_0x41cf05(0x117)](_0x406967,_0x2398ab,'Map',_0x4bd6ab,_0x10d048,function(_0xd47d84){return function(){return _0xd47d84;};}(_0x53cd87)));}),!_0x17c26c){try{for(_0x25372d in _0x2398ab)if(!(_0x1eaf82&&_0x407aea[_0x39a5ed(0x12d)](_0x25372d))&&!this[_0x39a5ed(0x1c2)](_0x2398ab,_0x25372d,_0x10d048)){if(_0x211ffb++,_0x10d048[_0x39a5ed(0x17f)]++,_0x211ffb>_0x4d1499){_0x36976c=!0x0;break;}if(!_0x10d048['isExpressionToEvaluate']&&_0x10d048[_0x39a5ed(0x181)]&&_0x10d048['autoExpandPropertyCount']>_0x10d048[_0x39a5ed(0x1e8)]){_0x36976c=!0x0;break;}_0x536934[_0x39a5ed(0x15d)](_0x217d3a['_addObjectProperty'](_0x406967,_0x30d389,_0x2398ab,_0x4c0119,_0x25372d,_0x10d048));}}catch{}if(_0x30d389['_p_length']=!0x0,_0x20a2dd&&(_0x30d389[_0x39a5ed(0x142)]=!0x0),!_0x36976c){var _0x41effa=[]['concat'](this[_0x39a5ed(0xf8)](_0x2398ab))[_0x39a5ed(0x1b6)](this[_0x39a5ed(0x1be)](_0x2398ab));for(_0x45f9f6=0x0,_0x1551bc=_0x41effa['length'];_0x45f9f6<_0x1551bc;_0x45f9f6++)if(_0x25372d=_0x41effa[_0x45f9f6],!(_0x1eaf82&&_0x407aea[_0x39a5ed(0x12d)](_0x25372d[_0x39a5ed(0x1ab)]()))&&!this[_0x39a5ed(0x1c2)](_0x2398ab,_0x25372d,_0x10d048)&&!_0x30d389[_0x39a5ed(0x15a)+_0x25372d[_0x39a5ed(0x1ab)]()]){if(_0x211ffb++,_0x10d048[_0x39a5ed(0x17f)]++,_0x211ffb>_0x4d1499){_0x36976c=!0x0;break;}if(!_0x10d048[_0x39a5ed(0x150)]&&_0x10d048['autoExpand']&&_0x10d048[_0x39a5ed(0x17f)]>_0x10d048[_0x39a5ed(0x1e8)]){_0x36976c=!0x0;break;}_0x536934[_0x39a5ed(0x15d)](_0x217d3a[_0x39a5ed(0x1c6)](_0x406967,_0x30d389,_0x2398ab,_0x4c0119,_0x25372d,_0x10d048));}}}}}if(_0x110f7d[_0x39a5ed(0x18c)]=_0x4c0119,_0x3d4bd8?(_0x110f7d[_0x39a5ed(0x1ad)]=_0x2398ab[_0x39a5ed(0x18d)](),this[_0x39a5ed(0x1dc)](_0x4c0119,_0x110f7d,_0x10d048,_0x189694)):_0x4c0119===_0x39a5ed(0x1cd)?_0x110f7d[_0x39a5ed(0x1ad)]=this[_0x39a5ed(0x13d)][_0x39a5ed(0x1e1)](_0x2398ab):_0x4c0119===_0x39a5ed(0x1a7)?_0x110f7d[_0x39a5ed(0x1ad)]=_0x2398ab['toString']():_0x4c0119==='RegExp'?_0x110f7d[_0x39a5ed(0x1ad)]=this[_0x39a5ed(0x10d)][_0x39a5ed(0x1e1)](_0x2398ab):_0x4c0119==='symbol'&&this[_0x39a5ed(0x10c)]?_0x110f7d[_0x39a5ed(0x1ad)]=this[_0x39a5ed(0x10c)][_0x39a5ed(0x1c5)][_0x39a5ed(0x1ab)][_0x39a5ed(0x1e1)](_0x2398ab):!_0x10d048[_0x39a5ed(0x1b3)]&&!(_0x4c0119===_0x39a5ed(0x17c)||_0x4c0119===_0x39a5ed(0x156))&&(delete _0x110f7d[_0x39a5ed(0x1ad)],_0x110f7d[_0x39a5ed(0x1de)]=!0x0),_0x36976c&&(_0x110f7d[_0x39a5ed(0x1a0)]=!0x0),_0x5dafc9=_0x10d048[_0x39a5ed(0x13e)]['current'],_0x10d048[_0x39a5ed(0x13e)]['current']=_0x110f7d,this[_0x39a5ed(0x16d)](_0x110f7d,_0x10d048),_0x536934[_0x39a5ed(0x1b2)]){for(_0x45f9f6=0x0,_0x1551bc=_0x536934[_0x39a5ed(0x1b2)];_0x45f9f6<_0x1551bc;_0x45f9f6++)_0x536934[_0x45f9f6](_0x45f9f6);}_0x406967[_0x39a5ed(0x1b2)]&&(_0x110f7d[_0x39a5ed(0x19a)]=_0x406967);}catch(_0x2c1ea6){_0x320e61(_0x2c1ea6,_0x110f7d,_0x10d048);}return this[_0x39a5ed(0x129)](_0x2398ab,_0x110f7d),this[_0x39a5ed(0x105)](_0x110f7d,_0x10d048),_0x10d048[_0x39a5ed(0x13e)][_0x39a5ed(0x1e3)]=_0x5dafc9,_0x10d048[_0x39a5ed(0x132)]--,_0x10d048[_0x39a5ed(0x181)]=_0x1b94db,_0x10d048['autoExpand']&&_0x10d048[_0x39a5ed(0x10f)]['pop'](),_0x110f7d;}[_0x31b1af(0x1be)](_0xd4f5d8){var _0x5c9f82=_0x31b1af;return Object[_0x5c9f82(0x101)]?Object[_0x5c9f82(0x101)](_0xd4f5d8):[];}[_0x31b1af(0x14b)](_0x3cfa3d){var _0xb5004d=_0x31b1af;return!!(_0x3cfa3d&&_0x3426ce[_0xb5004d(0x1c1)]&&this[_0xb5004d(0x19e)](_0x3cfa3d)===_0xb5004d(0x186)&&_0x3cfa3d[_0xb5004d(0x15b)]);}[_0x31b1af(0x1c2)](_0x4a78fe,_0x4e5f2b,_0x20a046){var _0x411ee8=_0x31b1af;return _0x20a046[_0x411ee8(0x195)]?typeof _0x4a78fe[_0x4e5f2b]=='function':!0x1;}[_0x31b1af(0x194)](_0xd7ce82){var _0x2221d4=_0x31b1af,_0x4690ac='';return _0x4690ac=typeof _0xd7ce82,_0x4690ac===_0x2221d4(0x1a6)?this[_0x2221d4(0x19e)](_0xd7ce82)===_0x2221d4(0x109)?_0x4690ac=_0x2221d4(0x158):this[_0x2221d4(0x19e)](_0xd7ce82)===_0x2221d4(0x14f)?_0x4690ac=_0x2221d4(0x1cd):this[_0x2221d4(0x19e)](_0xd7ce82)==='[object\\x20BigInt]'?_0x4690ac='bigint':_0xd7ce82===null?_0x4690ac=_0x2221d4(0x17c):_0xd7ce82['constructor']&&(_0x4690ac=_0xd7ce82['constructor'][_0x2221d4(0x154)]||_0x4690ac):_0x4690ac==='undefined'&&this[_0x2221d4(0x139)]&&_0xd7ce82 instanceof this[_0x2221d4(0x139)]&&(_0x4690ac='HTMLAllCollection'),_0x4690ac;}[_0x31b1af(0x19e)](_0x2318eb){var _0x13ffd6=_0x31b1af;return Object[_0x13ffd6(0x1c5)][_0x13ffd6(0x1ab)][_0x13ffd6(0x1e1)](_0x2318eb);}[_0x31b1af(0x133)](_0x493467){var _0x15d855=_0x31b1af;return _0x493467===_0x15d855(0x119)||_0x493467===_0x15d855(0x1e2)||_0x493467===_0x15d855(0xf7);}[_0x31b1af(0x196)](_0xe0822){var _0x3c7245=_0x31b1af;return _0xe0822===_0x3c7245(0x16f)||_0xe0822===_0x3c7245(0x1d6)||_0xe0822===_0x3c7245(0x166);}[_0x31b1af(0x117)](_0x4d8bf5,_0x47c5db,_0x4b8ee1,_0x2e3f76,_0x8a2ac9,_0x444dff){var _0x4bf700=this;return function(_0xfe5354){var _0x3005ea=_0x1805,_0xc3cb89=_0x8a2ac9[_0x3005ea(0x13e)][_0x3005ea(0x1e3)],_0x44d37e=_0x8a2ac9['node'][_0x3005ea(0x152)],_0xb8a1e4=_0x8a2ac9[_0x3005ea(0x13e)][_0x3005ea(0xfc)];_0x8a2ac9[_0x3005ea(0x13e)][_0x3005ea(0xfc)]=_0xc3cb89,_0x8a2ac9['node'][_0x3005ea(0x152)]=typeof _0x2e3f76=='number'?_0x2e3f76:_0xfe5354,_0x4d8bf5['push'](_0x4bf700[_0x3005ea(0x16c)](_0x47c5db,_0x4b8ee1,_0x2e3f76,_0x8a2ac9,_0x444dff)),_0x8a2ac9['node'][_0x3005ea(0xfc)]=_0xb8a1e4,_0x8a2ac9[_0x3005ea(0x13e)][_0x3005ea(0x152)]=_0x44d37e;};}[_0x31b1af(0x1c6)](_0x5be1bf,_0xeb08bb,_0x1c6b63,_0xc24dfe,_0x1a5ca0,_0x37720b,_0x5c3867){var _0x212bd0=_0x31b1af,_0x272b60=this;return _0xeb08bb[_0x212bd0(0x15a)+_0x1a5ca0[_0x212bd0(0x1ab)]()]=!0x0,function(_0x39a661){var _0x477e4c=_0x212bd0,_0x58f8a3=_0x37720b[_0x477e4c(0x13e)]['current'],_0x25069a=_0x37720b['node'][_0x477e4c(0x152)],_0x4435b3=_0x37720b[_0x477e4c(0x13e)]['parent'];_0x37720b[_0x477e4c(0x13e)][_0x477e4c(0xfc)]=_0x58f8a3,_0x37720b[_0x477e4c(0x13e)][_0x477e4c(0x152)]=_0x39a661,_0x5be1bf['push'](_0x272b60[_0x477e4c(0x16c)](_0x1c6b63,_0xc24dfe,_0x1a5ca0,_0x37720b,_0x5c3867)),_0x37720b[_0x477e4c(0x13e)][_0x477e4c(0xfc)]=_0x4435b3,_0x37720b[_0x477e4c(0x13e)]['index']=_0x25069a;};}[_0x31b1af(0x16c)](_0x1ee2b0,_0x18d148,_0xa70f4b,_0x29faef,_0x1ab228){var _0x24a159=_0x31b1af,_0x482694=this;_0x1ab228||(_0x1ab228=function(_0x326f7a,_0x5a2692){return _0x326f7a[_0x5a2692];});var _0x463946=_0xa70f4b['toString'](),_0x55f0ff=_0x29faef['expressionsToEvaluate']||{},_0x59f140=_0x29faef[_0x24a159(0x1b3)],_0x37661b=_0x29faef[_0x24a159(0x150)];try{var _0x5de697=this[_0x24a159(0x1d0)](_0x1ee2b0),_0x4bb10=_0x463946;_0x5de697&&_0x4bb10[0x0]==='\\x27'&&(_0x4bb10=_0x4bb10[_0x24a159(0x175)](0x1,_0x4bb10[_0x24a159(0x1b2)]-0x2));var _0x5d6e15=_0x29faef[_0x24a159(0x185)]=_0x55f0ff[_0x24a159(0x15a)+_0x4bb10];_0x5d6e15&&(_0x29faef['depth']=_0x29faef['depth']+0x1),_0x29faef['isExpressionToEvaluate']=!!_0x5d6e15;var _0x7749d4=typeof _0xa70f4b=='symbol',_0x6fc64b={'name':_0x7749d4||_0x5de697?_0x463946:this['_propertyName'](_0x463946)};if(_0x7749d4&&(_0x6fc64b[_0x24a159(0x11b)]=!0x0),!(_0x18d148===_0x24a159(0x158)||_0x18d148===_0x24a159(0x1a5))){var _0x124367=this[_0x24a159(0x170)](_0x1ee2b0,_0xa70f4b);if(_0x124367&&(_0x124367[_0x24a159(0x123)]&&(_0x6fc64b[_0x24a159(0x141)]=!0x0),_0x124367[_0x24a159(0x1c9)]&&!_0x5d6e15&&!_0x29faef[_0x24a159(0x10b)]))return _0x6fc64b[_0x24a159(0x11a)]=!0x0,this[_0x24a159(0x18a)](_0x6fc64b,_0x29faef),_0x6fc64b;}var _0x427fbb;try{_0x427fbb=_0x1ab228(_0x1ee2b0,_0xa70f4b);}catch(_0x1d39d2){return _0x6fc64b={'name':_0x463946,'type':_0x24a159(0x147),'error':_0x1d39d2[_0x24a159(0x14c)]},this['_processTreeNodeResult'](_0x6fc64b,_0x29faef),_0x6fc64b;}var _0xd196f8=this[_0x24a159(0x194)](_0x427fbb),_0x56e361=this[_0x24a159(0x133)](_0xd196f8);if(_0x6fc64b[_0x24a159(0x18c)]=_0xd196f8,_0x56e361)this['_processTreeNodeResult'](_0x6fc64b,_0x29faef,_0x427fbb,function(){var _0x11ad14=_0x24a159;_0x6fc64b[_0x11ad14(0x1ad)]=_0x427fbb[_0x11ad14(0x18d)](),!_0x5d6e15&&_0x482694[_0x11ad14(0x1dc)](_0xd196f8,_0x6fc64b,_0x29faef,{});});else{var _0x145347=_0x29faef['autoExpand']&&_0x29faef[_0x24a159(0x132)]<_0x29faef[_0x24a159(0xf9)]&&_0x29faef[_0x24a159(0x10f)][_0x24a159(0x122)](_0x427fbb)<0x0&&_0xd196f8!==_0x24a159(0x11d)&&_0x29faef['autoExpandPropertyCount']<_0x29faef[_0x24a159(0x1e8)];_0x145347||_0x29faef[_0x24a159(0x132)]<_0x59f140||_0x5d6e15?(this[_0x24a159(0x12b)](_0x6fc64b,_0x427fbb,_0x29faef,_0x5d6e15||{}),this[_0x24a159(0x129)](_0x427fbb,_0x6fc64b)):this[_0x24a159(0x18a)](_0x6fc64b,_0x29faef,_0x427fbb,function(){var _0x4b2e10=_0x24a159;_0xd196f8===_0x4b2e10(0x17c)||_0xd196f8==='undefined'||(delete _0x6fc64b[_0x4b2e10(0x1ad)],_0x6fc64b[_0x4b2e10(0x1de)]=!0x0);});}return _0x6fc64b;}finally{_0x29faef[_0x24a159(0x185)]=_0x55f0ff,_0x29faef['depth']=_0x59f140,_0x29faef[_0x24a159(0x150)]=_0x37661b;}}[_0x31b1af(0x1dc)](_0x30e5fa,_0xfd0e81,_0x5d2d99,_0x2802c1){var _0x440d14=_0x31b1af,_0x11ad12=_0x2802c1[_0x440d14(0x1b5)]||_0x5d2d99[_0x440d14(0x1b5)];if((_0x30e5fa==='string'||_0x30e5fa===_0x440d14(0x1d6))&&_0xfd0e81[_0x440d14(0x1ad)]){let _0x264d67=_0xfd0e81['value'][_0x440d14(0x1b2)];_0x5d2d99[_0x440d14(0x171)]+=_0x264d67,_0x5d2d99[_0x440d14(0x171)]>_0x5d2d99[_0x440d14(0x131)]?(_0xfd0e81[_0x440d14(0x1de)]='',delete _0xfd0e81[_0x440d14(0x1ad)]):_0x264d67>_0x11ad12&&(_0xfd0e81[_0x440d14(0x1de)]=_0xfd0e81[_0x440d14(0x1ad)][_0x440d14(0x175)](0x0,_0x11ad12),delete _0xfd0e81[_0x440d14(0x1ad)]);}}['_isMap'](_0x3efb7b){var _0x2a88c4=_0x31b1af;return!!(_0x3efb7b&&_0x3426ce[_0x2a88c4(0x148)]&&this[_0x2a88c4(0x19e)](_0x3efb7b)===_0x2a88c4(0x182)&&_0x3efb7b[_0x2a88c4(0x15b)]);}['_propertyName'](_0x521367){var _0x1756b3=_0x31b1af;if(_0x521367[_0x1756b3(0x10e)](/^\\d+$/))return _0x521367;var _0x12e9b8;try{_0x12e9b8=JSON[_0x1756b3(0x140)](''+_0x521367);}catch{_0x12e9b8='\\x22'+this[_0x1756b3(0x19e)](_0x521367)+'\\x22';}return _0x12e9b8['match'](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x12e9b8=_0x12e9b8[_0x1756b3(0x175)](0x1,_0x12e9b8[_0x1756b3(0x1b2)]-0x2):_0x12e9b8=_0x12e9b8[_0x1756b3(0x14a)](/'/g,'\\x5c\\x27')[_0x1756b3(0x14a)](/\\\\\"/g,'\\x22')[_0x1756b3(0x14a)](/(^\"|\"$)/g,'\\x27'),_0x12e9b8;}[_0x31b1af(0x18a)](_0x2a17b7,_0x1fdc41,_0x16e150,_0x3df533){var _0x40924b=_0x31b1af;this['_treeNodePropertiesBeforeFullValue'](_0x2a17b7,_0x1fdc41),_0x3df533&&_0x3df533(),this[_0x40924b(0x129)](_0x16e150,_0x2a17b7),this['_treeNodePropertiesAfterFullValue'](_0x2a17b7,_0x1fdc41);}['_treeNodePropertiesBeforeFullValue'](_0x5d6459,_0x1697fb){var _0xba03e4=_0x31b1af;this[_0xba03e4(0x1c7)](_0x5d6459,_0x1697fb),this[_0xba03e4(0x11f)](_0x5d6459,_0x1697fb),this['_setNodeExpressionPath'](_0x5d6459,_0x1697fb),this[_0xba03e4(0x151)](_0x5d6459,_0x1697fb);}['_setNodeId'](_0x50a65d,_0x2f87f8){}['_setNodeQueryPath'](_0x24470f,_0x50e4c0){}[_0x31b1af(0x1bc)](_0x466aca,_0x5930e3){}[_0x31b1af(0x1ae)](_0x1ed5e8){return _0x1ed5e8===this['_undefined'];}[_0x31b1af(0x105)](_0x4d0da0,_0x21a710){var _0x159cee=_0x31b1af;this['_setNodeLabel'](_0x4d0da0,_0x21a710),this['_setNodeExpandableState'](_0x4d0da0),_0x21a710[_0x159cee(0x10a)]&&this[_0x159cee(0x1d5)](_0x4d0da0),this['_addFunctionsNode'](_0x4d0da0,_0x21a710),this[_0x159cee(0x159)](_0x4d0da0,_0x21a710),this[_0x159cee(0x197)](_0x4d0da0);}[_0x31b1af(0x129)](_0x5e326d,_0x18f38a){var _0x47e188=_0x31b1af;let _0x4b755e;try{_0x3426ce[_0x47e188(0x1d9)]&&(_0x4b755e=_0x3426ce[_0x47e188(0x1d9)][_0x47e188(0x136)],_0x3426ce[_0x47e188(0x1d9)][_0x47e188(0x136)]=function(){}),_0x5e326d&&typeof _0x5e326d[_0x47e188(0x1b2)]==_0x47e188(0xf7)&&(_0x18f38a[_0x47e188(0x1b2)]=_0x5e326d[_0x47e188(0x1b2)]);}catch{}finally{_0x4b755e&&(_0x3426ce[_0x47e188(0x1d9)][_0x47e188(0x136)]=_0x4b755e);}if(_0x18f38a[_0x47e188(0x18c)]===_0x47e188(0xf7)||_0x18f38a[_0x47e188(0x18c)]===_0x47e188(0x166)){if(isNaN(_0x18f38a[_0x47e188(0x1ad)]))_0x18f38a[_0x47e188(0x1da)]=!0x0,delete _0x18f38a[_0x47e188(0x1ad)];else switch(_0x18f38a['value']){case Number[_0x47e188(0x106)]:_0x18f38a[_0x47e188(0x1a4)]=!0x0,delete _0x18f38a['value'];break;case Number[_0x47e188(0x12e)]:_0x18f38a[_0x47e188(0x126)]=!0x0,delete _0x18f38a[_0x47e188(0x1ad)];break;case 0x0:this[_0x47e188(0x188)](_0x18f38a[_0x47e188(0x1ad)])&&(_0x18f38a[_0x47e188(0x125)]=!0x0);break;}}else _0x18f38a['type']===_0x47e188(0x11d)&&typeof _0x5e326d[_0x47e188(0x154)]==_0x47e188(0x1e2)&&_0x5e326d[_0x47e188(0x154)]&&_0x18f38a[_0x47e188(0x154)]&&_0x5e326d[_0x47e188(0x154)]!==_0x18f38a[_0x47e188(0x154)]&&(_0x18f38a['funcName']=_0x5e326d[_0x47e188(0x154)]);}[_0x31b1af(0x188)](_0x344e46){var _0x4e840d=_0x31b1af;return 0x1/_0x344e46===Number[_0x4e840d(0x12e)];}[_0x31b1af(0x1d5)](_0x2e5c89){var _0x592a8e=_0x31b1af;!_0x2e5c89[_0x592a8e(0x19a)]||!_0x2e5c89[_0x592a8e(0x19a)][_0x592a8e(0x1b2)]||_0x2e5c89[_0x592a8e(0x18c)]===_0x592a8e(0x158)||_0x2e5c89[_0x592a8e(0x18c)]===_0x592a8e(0x148)||_0x2e5c89[_0x592a8e(0x18c)]===_0x592a8e(0x1c1)||_0x2e5c89[_0x592a8e(0x19a)][_0x592a8e(0x12a)](function(_0x41396a,_0x3695dd){var _0x1cc1af=_0x592a8e,_0x5ebfc6=_0x41396a[_0x1cc1af(0x154)][_0x1cc1af(0x1ba)](),_0x17eaa1=_0x3695dd[_0x1cc1af(0x154)][_0x1cc1af(0x1ba)]();return _0x5ebfc6<_0x17eaa1?-0x1:_0x5ebfc6>_0x17eaa1?0x1:0x0;});}['_addFunctionsNode'](_0x4dfa47,_0x272493){var _0x535228=_0x31b1af;if(!(_0x272493['noFunctions']||!_0x4dfa47[_0x535228(0x19a)]||!_0x4dfa47[_0x535228(0x19a)][_0x535228(0x1b2)])){for(var _0x407f8c=[],_0x39ed19=[],_0x828b4f=0x0,_0x247b5d=_0x4dfa47['props']['length'];_0x828b4f<_0x247b5d;_0x828b4f++){var _0x24feb0=_0x4dfa47['props'][_0x828b4f];_0x24feb0[_0x535228(0x18c)]===_0x535228(0x11d)?_0x407f8c[_0x535228(0x15d)](_0x24feb0):_0x39ed19[_0x535228(0x15d)](_0x24feb0);}if(!(!_0x39ed19[_0x535228(0x1b2)]||_0x407f8c[_0x535228(0x1b2)]<=0x1)){_0x4dfa47[_0x535228(0x19a)]=_0x39ed19;var _0x5f2cbc={'functionsNode':!0x0,'props':_0x407f8c};this[_0x535228(0x1c7)](_0x5f2cbc,_0x272493),this[_0x535228(0x1bc)](_0x5f2cbc,_0x272493),this[_0x535228(0x174)](_0x5f2cbc),this['_setNodePermissions'](_0x5f2cbc,_0x272493),_0x5f2cbc['id']+='\\x20f',_0x4dfa47[_0x535228(0x19a)]['unshift'](_0x5f2cbc);}}}[_0x31b1af(0x159)](_0x9cbe5c,_0x2bd6a3){}[_0x31b1af(0x174)](_0x465a6c){}[_0x31b1af(0x176)](_0x285444){var _0x277b78=_0x31b1af;return Array[_0x277b78(0x120)](_0x285444)||typeof _0x285444==_0x277b78(0x1a6)&&this['_objectToString'](_0x285444)===_0x277b78(0x109);}[_0x31b1af(0x151)](_0x3619ca,_0x4b7d27){}[_0x31b1af(0x197)](_0x403239){var _0x2e55ea=_0x31b1af;delete _0x403239[_0x2e55ea(0x1ce)],delete _0x403239[_0x2e55ea(0xfe)],delete _0x403239[_0x2e55ea(0x163)];}['_setNodeExpressionPath'](_0x453723,_0xaada07){}}let _0x18ccc4=new _0x47b72c(),_0x1dceca={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x1f3b36={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x6abbc5(_0x176395,_0xcbe616,_0x2c48c4,_0x5d9fe0,_0x4abf5c,_0x235907){var _0x3dd1f7=_0x31b1af;let _0x4ab57b,_0x106dfb;try{_0x106dfb=_0x27c00b(),_0x4ab57b=_0x47b4a3[_0xcbe616],!_0x4ab57b||_0x106dfb-_0x4ab57b['ts']>0x1f4&&_0x4ab57b[_0x3dd1f7(0x11e)]&&_0x4ab57b[_0x3dd1f7(0x1a1)]/_0x4ab57b[_0x3dd1f7(0x11e)]<0x64?(_0x47b4a3[_0xcbe616]=_0x4ab57b={'count':0x0,'time':0x0,'ts':_0x106dfb},_0x47b4a3[_0x3dd1f7(0x155)]={}):_0x106dfb-_0x47b4a3['hits']['ts']>0x32&&_0x47b4a3[_0x3dd1f7(0x155)][_0x3dd1f7(0x11e)]&&_0x47b4a3['hits']['time']/_0x47b4a3[_0x3dd1f7(0x155)]['count']<0x64&&(_0x47b4a3[_0x3dd1f7(0x155)]={});let _0x41a9c0=[],_0x47217a=_0x4ab57b[_0x3dd1f7(0x1d3)]||_0x47b4a3[_0x3dd1f7(0x155)][_0x3dd1f7(0x1d3)]?_0x1f3b36:_0x1dceca,_0x812597=_0x5b9e41=>{var _0x38d60a=_0x3dd1f7;let _0x12f7c6={};return _0x12f7c6[_0x38d60a(0x19a)]=_0x5b9e41['props'],_0x12f7c6['elements']=_0x5b9e41[_0x38d60a(0x1e9)],_0x12f7c6[_0x38d60a(0x1b5)]=_0x5b9e41[_0x38d60a(0x1b5)],_0x12f7c6[_0x38d60a(0x131)]=_0x5b9e41[_0x38d60a(0x131)],_0x12f7c6[_0x38d60a(0x1e8)]=_0x5b9e41['autoExpandLimit'],_0x12f7c6[_0x38d60a(0xf9)]=_0x5b9e41[_0x38d60a(0xf9)],_0x12f7c6[_0x38d60a(0x10a)]=!0x1,_0x12f7c6[_0x38d60a(0x195)]=!_0x5778aa,_0x12f7c6[_0x38d60a(0x1b3)]=0x1,_0x12f7c6[_0x38d60a(0x132)]=0x0,_0x12f7c6[_0x38d60a(0x157)]=_0x38d60a(0x1b8),_0x12f7c6[_0x38d60a(0x1e7)]=_0x38d60a(0x111),_0x12f7c6['autoExpand']=!0x0,_0x12f7c6[_0x38d60a(0x10f)]=[],_0x12f7c6[_0x38d60a(0x17f)]=0x0,_0x12f7c6[_0x38d60a(0x10b)]=!0x0,_0x12f7c6[_0x38d60a(0x171)]=0x0,_0x12f7c6[_0x38d60a(0x13e)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x12f7c6;};for(var _0x2a0618=0x0;_0x2a0618<_0x4abf5c['length'];_0x2a0618++)_0x41a9c0['push'](_0x18ccc4[_0x3dd1f7(0x12b)]({'timeNode':_0x176395===_0x3dd1f7(0x1a1)||void 0x0},_0x4abf5c[_0x2a0618],_0x812597(_0x47217a),{}));if(_0x176395===_0x3dd1f7(0x162)){let _0x20c74d=Error[_0x3dd1f7(0x110)];try{Error[_0x3dd1f7(0x110)]=0x1/0x0,_0x41a9c0[_0x3dd1f7(0x15d)](_0x18ccc4['serialize']({'stackNode':!0x0},new Error()[_0x3dd1f7(0x1b1)],_0x812597(_0x47217a),{'strLength':0x1/0x0}));}finally{Error[_0x3dd1f7(0x110)]=_0x20c74d;}}return{'method':_0x3dd1f7(0x199),'version':_0x12d0f9,'args':[{'ts':_0x2c48c4,'session':_0x5d9fe0,'args':_0x41a9c0,'id':_0xcbe616,'context':_0x235907}]};}catch(_0x4d9b1d){return{'method':_0x3dd1f7(0x199),'version':_0x12d0f9,'args':[{'ts':_0x2c48c4,'session':_0x5d9fe0,'args':[{'type':_0x3dd1f7(0x147),'error':_0x4d9b1d&&_0x4d9b1d['message']}],'id':_0xcbe616,'context':_0x235907}]};}finally{try{if(_0x4ab57b&&_0x106dfb){let _0x555fcf=_0x27c00b();_0x4ab57b['count']++,_0x4ab57b[_0x3dd1f7(0x1a1)]+=_0x454b9c(_0x106dfb,_0x555fcf),_0x4ab57b['ts']=_0x555fcf,_0x47b4a3['hits'][_0x3dd1f7(0x11e)]++,_0x47b4a3[_0x3dd1f7(0x155)][_0x3dd1f7(0x1a1)]+=_0x454b9c(_0x106dfb,_0x555fcf),_0x47b4a3['hits']['ts']=_0x555fcf,(_0x4ab57b[_0x3dd1f7(0x11e)]>0x32||_0x4ab57b['time']>0x64)&&(_0x4ab57b['reduceLimits']=!0x0),(_0x47b4a3[_0x3dd1f7(0x155)][_0x3dd1f7(0x11e)]>0x3e8||_0x47b4a3['hits'][_0x3dd1f7(0x1a1)]>0x12c)&&(_0x47b4a3[_0x3dd1f7(0x155)][_0x3dd1f7(0x1d3)]=!0x0);}}catch{}}}return _0x6abbc5;}function _0x1805(_0x28250a,_0x14b480){var _0x3c8e4d=_0x3c8e();return _0x1805=function(_0x1805c9,_0xca968){_0x1805c9=_0x1805c9-0xf7;var _0x1cddad=_0x3c8e4d[_0x1805c9];return _0x1cddad;},_0x1805(_0x28250a,_0x14b480);}((_0x46169b,_0x5858f9,_0x56773d,_0x2d6e27,_0x293c90,_0x157139,_0xaf8b4f,_0x2c90f5,_0x24e7cc,_0x59fff1,_0x288f47)=>{var _0x87c4ad=_0x10c22d;if(_0x46169b[_0x87c4ad(0x13f)])return _0x46169b[_0x87c4ad(0x13f)];if(!X(_0x46169b,_0x2c90f5,_0x293c90))return _0x46169b[_0x87c4ad(0x13f)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x46169b[_0x87c4ad(0x13f)];let _0x2018cd=b(_0x46169b),_0x555629=_0x2018cd[_0x87c4ad(0x1e4)],_0xa0970=_0x2018cd[_0x87c4ad(0x1d7)],_0x39fe2e=_0x2018cd[_0x87c4ad(0x190)],_0x281350={'hits':{},'ts':{}},_0x1a6de8=H(_0x46169b,_0x24e7cc,_0x281350,_0x157139),_0x203ffb=_0x41f599=>{_0x281350['ts'][_0x41f599]=_0xa0970();},_0x1ad595=(_0x55aabd,_0x289b76)=>{var _0x48d315=_0x87c4ad;let _0x2be956=_0x281350['ts'][_0x289b76];if(delete _0x281350['ts'][_0x289b76],_0x2be956){let _0x323c4f=_0x555629(_0x2be956,_0xa0970());_0x2239dd(_0x1a6de8(_0x48d315(0x1a1),_0x55aabd,_0x39fe2e(),_0x3b944d,[_0x323c4f],_0x289b76));}},_0x406fd7=_0xcd69d8=>{var _0x5391aa=_0x87c4ad,_0x1df9bb;return _0x293c90==='next.js'&&_0x46169b['origin']&&((_0x1df9bb=_0xcd69d8==null?void 0x0:_0xcd69d8[_0x5391aa(0x18e)])==null?void 0x0:_0x1df9bb[_0x5391aa(0x1b2)])&&(_0xcd69d8['args'][0x0][_0x5391aa(0x16b)]=_0x46169b[_0x5391aa(0x16b)]),_0xcd69d8;};_0x46169b[_0x87c4ad(0x13f)]={'consoleLog':(_0x1ea7a4,_0x57464a)=>{var _0x7e49=_0x87c4ad;_0x46169b['console'][_0x7e49(0x199)][_0x7e49(0x154)]!==_0x7e49(0x127)&&_0x2239dd(_0x1a6de8('log',_0x1ea7a4,_0x39fe2e(),_0x3b944d,_0x57464a));},'consoleTrace':(_0x4bf400,_0x257ddb)=>{var _0x3534bf=_0x87c4ad;_0x46169b[_0x3534bf(0x1d9)][_0x3534bf(0x199)]['name']!==_0x3534bf(0x15c)&&_0x2239dd(_0x406fd7(_0x1a6de8(_0x3534bf(0x162),_0x4bf400,_0x39fe2e(),_0x3b944d,_0x257ddb)));},'consoleTime':_0x4d767f=>{_0x203ffb(_0x4d767f);},'consoleTimeEnd':(_0x546502,_0x422124)=>{_0x1ad595(_0x422124,_0x546502);},'autoLog':(_0x21b850,_0x21e9e9)=>{_0x2239dd(_0x1a6de8('log',_0x21e9e9,_0x39fe2e(),_0x3b944d,[_0x21b850]));},'autoLogMany':(_0x4090e4,_0x3e59ea)=>{_0x2239dd(_0x1a6de8('log',_0x4090e4,_0x39fe2e(),_0x3b944d,_0x3e59ea));},'autoTrace':(_0x299872,_0x289f3c)=>{_0x2239dd(_0x406fd7(_0x1a6de8('trace',_0x289f3c,_0x39fe2e(),_0x3b944d,[_0x299872])));},'autoTraceMany':(_0x3b4c0a,_0x1d149e)=>{var _0x255af6=_0x87c4ad;_0x2239dd(_0x406fd7(_0x1a6de8(_0x255af6(0x162),_0x3b4c0a,_0x39fe2e(),_0x3b944d,_0x1d149e)));},'autoTime':(_0x2a3eda,_0x44af2f,_0x3aa9ae)=>{_0x203ffb(_0x3aa9ae);},'autoTimeEnd':(_0x251585,_0x1b87a1,_0x21ade7)=>{_0x1ad595(_0x1b87a1,_0x21ade7);},'coverage':_0x5af090=>{var _0x2aed32=_0x87c4ad;_0x2239dd({'method':_0x2aed32(0xfb),'version':_0x157139,'args':[{'id':_0x5af090}]});}};let _0x2239dd=q(_0x46169b,_0x5858f9,_0x56773d,_0x2d6e27,_0x293c90,_0x59fff1,_0x288f47),_0x3b944d=_0x46169b[_0x87c4ad(0x161)];return _0x46169b[_0x87c4ad(0x13f)];})(globalThis,_0x10c22d(0x118),_0x10c22d(0x153),_0x10c22d(0x192),_0x10c22d(0x1aa),_0x10c22d(0x183),_0x10c22d(0x167),[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-061\",\"172.27.27.79\"],'','',_0x10c22d(0x145));");
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