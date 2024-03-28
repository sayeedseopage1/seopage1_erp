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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x233c0b=_0x5229;(function(_0x5c7b97,_0x3b433c){var _0x373b7a=_0x5229,_0x342a2e=_0x5c7b97();while(!![]){try{var _0x2206ae=-parseInt(_0x373b7a(0x193))/0x1+-parseInt(_0x373b7a(0x10a))/0x2+-parseInt(_0x373b7a(0x168))/0x3*(parseInt(_0x373b7a(0x100))/0x4)+-parseInt(_0x373b7a(0x142))/0x5+-parseInt(_0x373b7a(0x128))/0x6*(-parseInt(_0x373b7a(0x1d5))/0x7)+parseInt(_0x373b7a(0x12d))/0x8*(-parseInt(_0x373b7a(0xf7))/0x9)+-parseInt(_0x373b7a(0x1b5))/0xa*(-parseInt(_0x373b7a(0x19b))/0xb);if(_0x2206ae===_0x3b433c)break;else _0x342a2e['push'](_0x342a2e['shift']());}catch(_0x1a1839){_0x342a2e['push'](_0x342a2e['shift']());}}}(_0x5caa,0xf3943));function _0x5229(_0x58ece8,_0x3df43b){var _0x5caab5=_0x5caa();return _0x5229=function(_0x522968,_0xf55b7e){_0x522968=_0x522968-0xe5;var _0x5dce5a=_0x5caab5[_0x522968];return _0x5dce5a;},_0x5229(_0x58ece8,_0x3df43b);}var j=Object[_0x233c0b(0x13b)],H=Object[_0x233c0b(0xeb)],G=Object[_0x233c0b(0x194)],ee=Object['getOwnPropertyNames'],te=Object[_0x233c0b(0x13a)],ne=Object['prototype']['hasOwnProperty'],re=(_0x25ecd1,_0x134e51,_0x4e4561,_0x3d6fb5)=>{var _0x2712a5=_0x233c0b;if(_0x134e51&&typeof _0x134e51=='object'||typeof _0x134e51=='function'){for(let _0x1c1d2a of ee(_0x134e51))!ne[_0x2712a5(0x1a0)](_0x25ecd1,_0x1c1d2a)&&_0x1c1d2a!==_0x4e4561&&H(_0x25ecd1,_0x1c1d2a,{'get':()=>_0x134e51[_0x1c1d2a],'enumerable':!(_0x3d6fb5=G(_0x134e51,_0x1c1d2a))||_0x3d6fb5[_0x2712a5(0x12c)]});}return _0x25ecd1;},x=(_0x415e2c,_0x2e4200,_0x55f2e1)=>(_0x55f2e1=_0x415e2c!=null?j(te(_0x415e2c)):{},re(_0x2e4200||!_0x415e2c||!_0x415e2c[_0x233c0b(0x1bb)]?H(_0x55f2e1,'default',{'value':_0x415e2c,'enumerable':!0x0}):_0x55f2e1,_0x415e2c)),X=class{constructor(_0x32116b,_0x10e4ff,_0x8e3ddd,_0x3b4759,_0xe2ba93){var _0x515fa6=_0x233c0b;this[_0x515fa6(0x133)]=_0x32116b,this['host']=_0x10e4ff,this['port']=_0x8e3ddd,this[_0x515fa6(0x14b)]=_0x3b4759,this['dockerizedApp']=_0xe2ba93,this[_0x515fa6(0x136)]=!0x0,this[_0x515fa6(0x1d0)]=!0x0,this[_0x515fa6(0xee)]=!0x1,this[_0x515fa6(0x164)]=!0x1,this[_0x515fa6(0x102)]=_0x32116b[_0x515fa6(0xf3)]?.[_0x515fa6(0x18a)]?.['NEXT_RUNTIME']===_0x515fa6(0xe8),this[_0x515fa6(0x143)]=!this[_0x515fa6(0x133)][_0x515fa6(0xf3)]?.[_0x515fa6(0x157)]?.[_0x515fa6(0x145)]&&!this[_0x515fa6(0x102)],this[_0x515fa6(0x173)]=null,this[_0x515fa6(0x1d1)]=0x0,this[_0x515fa6(0x140)]=0x14,this[_0x515fa6(0x12b)]='https://tinyurl.com/37x8b79t',this['_sendErrorMessage']=(this[_0x515fa6(0x143)]?_0x515fa6(0x132):_0x515fa6(0x169))+this[_0x515fa6(0x12b)];}async['getWebSocketClass'](){var _0x498b84=_0x233c0b;if(this[_0x498b84(0x173)])return this['_WebSocketClass'];let _0x35697e;if(this[_0x498b84(0x143)]||this[_0x498b84(0x102)])_0x35697e=this[_0x498b84(0x133)][_0x498b84(0x19d)];else{if(this[_0x498b84(0x133)][_0x498b84(0xf3)]?.[_0x498b84(0x15a)])_0x35697e=this[_0x498b84(0x133)]['process']?.[_0x498b84(0x15a)];else try{let _0xc87db9=await import(_0x498b84(0x147));_0x35697e=(await import((await import('url'))[_0x498b84(0x120)](_0xc87db9[_0x498b84(0x1b4)](this[_0x498b84(0x14b)],_0x498b84(0xea)))[_0x498b84(0x18f)]()))[_0x498b84(0xfd)];}catch{try{_0x35697e=require(require(_0x498b84(0x147))[_0x498b84(0x1b4)](this['nodeModules'],'ws'));}catch{throw new Error('failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket');}}}return this[_0x498b84(0x173)]=_0x35697e,_0x35697e;}[_0x233c0b(0x11f)](){var _0x16202c=_0x233c0b;this[_0x16202c(0x164)]||this[_0x16202c(0xee)]||this['_connectAttemptCount']>=this[_0x16202c(0x140)]||(this[_0x16202c(0x1d0)]=!0x1,this[_0x16202c(0x164)]=!0x0,this[_0x16202c(0x1d1)]++,this[_0x16202c(0x1c8)]=new Promise((_0xb1e42b,_0x4a0a23)=>{var _0x161fa7=_0x16202c;this[_0x161fa7(0x178)]()[_0x161fa7(0x13c)](_0x5070b9=>{var _0x46c352=_0x161fa7;let _0x38146e=new _0x5070b9('ws://'+(!this[_0x46c352(0x143)]&&this[_0x46c352(0x137)]?_0x46c352(0x163):this[_0x46c352(0x17f)])+':'+this['port']);_0x38146e[_0x46c352(0xf1)]=()=>{var _0x249f3c=_0x46c352;this['_allowedToSend']=!0x1,this[_0x249f3c(0x171)](_0x38146e),this[_0x249f3c(0x112)](),_0x4a0a23(new Error(_0x249f3c(0x1a6)));},_0x38146e[_0x46c352(0x1c9)]=()=>{var _0x48356e=_0x46c352;this[_0x48356e(0x143)]||_0x38146e[_0x48356e(0x11b)]&&_0x38146e[_0x48356e(0x11b)][_0x48356e(0x19f)]&&_0x38146e[_0x48356e(0x11b)]['unref'](),_0xb1e42b(_0x38146e);},_0x38146e['onclose']=()=>{var _0x56b84f=_0x46c352;this[_0x56b84f(0x1d0)]=!0x0,this['_disposeWebsocket'](_0x38146e),this[_0x56b84f(0x112)]();},_0x38146e[_0x46c352(0x121)]=_0x71179c=>{var _0x3163fb=_0x46c352;try{_0x71179c&&_0x71179c['data']&&this[_0x3163fb(0x143)]&&JSON[_0x3163fb(0x1b6)](_0x71179c[_0x3163fb(0xe5)])[_0x3163fb(0x12f)]===_0x3163fb(0x1c0)&&this[_0x3163fb(0x133)][_0x3163fb(0x1ae)][_0x3163fb(0x1c0)]();}catch{}};})['then'](_0x10e4c8=>(this['_connected']=!0x0,this['_connecting']=!0x1,this['_allowedToConnectOnSend']=!0x1,this[_0x161fa7(0x136)]=!0x0,this['_connectAttemptCount']=0x0,_0x10e4c8))[_0x161fa7(0x17e)](_0x29b529=>(this[_0x161fa7(0xee)]=!0x1,this[_0x161fa7(0x164)]=!0x1,console[_0x161fa7(0x18c)](_0x161fa7(0xfe)+this[_0x161fa7(0x12b)]),_0x4a0a23(new Error(_0x161fa7(0x17b)+(_0x29b529&&_0x29b529[_0x161fa7(0x1b3)])))));}));}[_0x233c0b(0x171)](_0x1e7f9a){var _0x491e3f=_0x233c0b;this[_0x491e3f(0xee)]=!0x1,this[_0x491e3f(0x164)]=!0x1;try{_0x1e7f9a[_0x491e3f(0x176)]=null,_0x1e7f9a[_0x491e3f(0xf1)]=null,_0x1e7f9a[_0x491e3f(0x1c9)]=null;}catch{}try{_0x1e7f9a['readyState']<0x2&&_0x1e7f9a[_0x491e3f(0x104)]();}catch{}}[_0x233c0b(0x112)](){var _0x1573d5=_0x233c0b;clearTimeout(this[_0x1573d5(0x149)]),!(this[_0x1573d5(0x1d1)]>=this[_0x1573d5(0x140)])&&(this[_0x1573d5(0x149)]=setTimeout(()=>{var _0x3bbee2=_0x1573d5;this[_0x3bbee2(0xee)]||this[_0x3bbee2(0x164)]||(this[_0x3bbee2(0x11f)](),this[_0x3bbee2(0x1c8)]?.[_0x3bbee2(0x17e)](()=>this[_0x3bbee2(0x112)]()));},0x1f4),this['_reconnectTimeout'][_0x1573d5(0x19f)]&&this[_0x1573d5(0x149)]['unref']());}async[_0x233c0b(0xe9)](_0xd56093){var _0x178f02=_0x233c0b;try{if(!this[_0x178f02(0x136)])return;this[_0x178f02(0x1d0)]&&this[_0x178f02(0x11f)](),(await this[_0x178f02(0x1c8)])['send'](JSON[_0x178f02(0x184)](_0xd56093));}catch(_0x438cc1){console['warn'](this[_0x178f02(0x180)]+':\\x20'+(_0x438cc1&&_0x438cc1[_0x178f02(0x1b3)])),this[_0x178f02(0x136)]=!0x1,this['_attemptToReconnectShortly']();}}};function b(_0x4617b3,_0x226476,_0x11c70c,_0x2caf4b,_0x1872c7,_0x46a428){var _0x469a2a=_0x233c0b;let _0x51258a=_0x11c70c[_0x469a2a(0x10d)](',')[_0x469a2a(0xf4)](_0x1d2f87=>{var _0x327f53=_0x469a2a;try{_0x4617b3['_console_ninja_session']||((_0x1872c7===_0x327f53(0x153)||_0x1872c7===_0x327f53(0x127)||_0x1872c7===_0x327f53(0x16d)||_0x1872c7==='angular')&&(_0x1872c7+=!_0x4617b3['process']?.[_0x327f53(0x157)]?.[_0x327f53(0x145)]&&_0x4617b3[_0x327f53(0xf3)]?.[_0x327f53(0x18a)]?.[_0x327f53(0x1c4)]!==_0x327f53(0xe8)?_0x327f53(0x11d):_0x327f53(0x14d)),_0x4617b3['_console_ninja_session']={'id':+new Date(),'tool':_0x1872c7});let _0x4525fb=new X(_0x4617b3,_0x226476,_0x1d2f87,_0x2caf4b,_0x46a428);return _0x4525fb[_0x327f53(0xe9)]['bind'](_0x4525fb);}catch(_0x34e7f6){return console[_0x327f53(0x18c)](_0x327f53(0xec),_0x34e7f6&&_0x34e7f6['message']),()=>{};}});return _0x1893e2=>_0x51258a[_0x469a2a(0x16c)](_0xc29c57=>_0xc29c57(_0x1893e2));}function W(_0xaac0fc){var _0x471f6c=_0x233c0b;let _0x2ff97d=function(_0x4b9e41,_0xcaeac0){return _0xcaeac0-_0x4b9e41;},_0x14012e;if(_0xaac0fc[_0x471f6c(0x1b2)])_0x14012e=function(){var _0x30c84c=_0x471f6c;return _0xaac0fc[_0x30c84c(0x1b2)]['now']();};else{if(_0xaac0fc['process']&&_0xaac0fc[_0x471f6c(0xf3)][_0x471f6c(0x1a4)]&&_0xaac0fc[_0x471f6c(0xf3)]?.[_0x471f6c(0x18a)]?.[_0x471f6c(0x1c4)]!==_0x471f6c(0xe8))_0x14012e=function(){var _0x4a9a80=_0x471f6c;return _0xaac0fc[_0x4a9a80(0xf3)][_0x4a9a80(0x1a4)]();},_0x2ff97d=function(_0x3deef4,_0x35f0ce){return 0x3e8*(_0x35f0ce[0x0]-_0x3deef4[0x0])+(_0x35f0ce[0x1]-_0x3deef4[0x1])/0xf4240;};else try{let {performance:_0xeba562}=require(_0x471f6c(0x1b0));_0x14012e=function(){var _0x3a70e4=_0x471f6c;return _0xeba562[_0x3a70e4(0x124)]();};}catch{_0x14012e=function(){return+new Date();};}}return{'elapsed':_0x2ff97d,'timeStamp':_0x14012e,'now':()=>Date['now']()};}function J(_0x3731a1,_0x27da18,_0x373620){var _0x117754=_0x233c0b;if(_0x3731a1[_0x117754(0x130)]!==void 0x0)return _0x3731a1[_0x117754(0x130)];let _0x31bcd5=_0x3731a1[_0x117754(0xf3)]?.[_0x117754(0x157)]?.[_0x117754(0x145)]||_0x3731a1[_0x117754(0xf3)]?.[_0x117754(0x18a)]?.[_0x117754(0x1c4)]===_0x117754(0xe8);return _0x31bcd5&&_0x373620===_0x117754(0x10f)?_0x3731a1[_0x117754(0x130)]=!0x1:_0x3731a1[_0x117754(0x130)]=_0x31bcd5||!_0x27da18||_0x3731a1[_0x117754(0x1ae)]?.[_0x117754(0x195)]&&_0x27da18['includes'](_0x3731a1['location'][_0x117754(0x195)]),_0x3731a1[_0x117754(0x130)];}function _0x5caa(){var _0x298e70=['_reconnectTimeout','autoExpandPropertyCount','nodeModules','value','\\x20server','_addLoadNode','parent','getter','Error','expressionsToEvaluate','next.js','_propertyName','_p_name','time','versions','cappedProps','_addFunctionsNode','_WebSocket','substr','[object\\x20Set]','hits','number','1.0.0','match','bigint','_undefined','gateway.docker.internal','_connecting','resolveGetters','[object\\x20Map]','Buffer','1524HEFxWO','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_isMap','_addObjectProperty','forEach','astro','_isPrimitiveWrapperType',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.295\\\\node_modules\",'trace','_disposeWebsocket','_p_','_WebSocketClass','_isUndefined','prototype','onclose','_addProperty','getWebSocketClass','autoExpandMaxDepth','elapsed','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','_keyStrRegExp','_setNodeQueryPath','catch','host','_sendErrorMessage','_isArray','setter','set','stringify','isExpressionToEvaluate','depth','null','root_exp_id','_dateToString','env','toLowerCase','warn','stackTraceLimit','HTMLAllCollection','toString','indexOf','_type','_HTMLAllCollection','539817qTYRlo','getOwnPropertyDescriptor','hostname','timeStamp','_getOwnPropertyDescriptor','_additionalMetadata','constructor','_capIfString','1092410Bwgesg','console','WebSocket','reduceLimits','unref','call','disabledTrace','coverage','length','hrtime','unshift','logger\\x20websocket\\x20error','_isPrimitiveType','rootExpression','error','level','push','_setNodeExpressionPath','Number','location','_console_ninja_session','perf_hooks','_blacklistedProperty','performance','message','join','290kxWaGq','parse','_getOwnPropertySymbols','[object\\x20BigInt]','_setNodeLabel','POSITIVE_INFINITY','__es'+'Module','String','function','_Symbol','RegExp','reload','autoExpandLimit','symbol','strLength','NEXT_RUNTIME','unknown','autoExpand','_sortProps','_ws','onopen','_quotedRegExp','undefined','autoExpandPreviousObjects','NEGATIVE_INFINITY','disabledLog','valueOf','_allowedToConnectOnSend','_connectAttemptCount','elements','getOwnPropertySymbols','props','7EAqsuj','_isSet','data','serialize','noFunctions','edge','send','ws/index.js','defineProperty','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','negativeInfinity','_connected','','log','onerror','_treeNodePropertiesBeforeFullValue','process','map','boolean','_treeNodePropertiesAfterFullValue','1424637iyXjUa','_console_ninja','_property','_hasSymbolPropertyOnItsPath','expId','array','default','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','string','1500QxVEIX','49812','_inNextEdge','timeEnd','close','_cleanNode','127.0.0.1','_getOwnPropertyNames','allStrLength','positiveInfinity','2481346qvMkYl','replace','type','split','get','nuxt','Set','funcName','_attemptToReconnectShortly','current',':logPointId:','_hasSetOnItsPath','_setNodePermissions','index','date','pop','test','_socket','totalStrLength','\\x20browser','Map','_connectToHostNow','pathToFileURL','onmessage','root_exp','name','now','_setNodeExpandableState','_hasMapOnItsPath','remix','11811882tzGccr','capped','[object\\x20Array]','_webSocketErrorDocsLink','enumerable','56TLYvzT','count','method','_consoleNinjaAllowedToStart','concat','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','global','sortProps',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'_allowedToSend','dockerizedApp','object','_processTreeNodeResult','getPrototypeOf','create','then','_regExpToString','1711594953202','getOwnPropertyNames','_maxConnectAttemptCount','_isNegativeZero','3859485CBCRbO','_inBrowser','_setNodeId','node','_objectToString','path','...'];_0x5caa=function(){return _0x298e70;};return _0x5caa();}function Y(_0xa4e496,_0x3509a0,_0x3db20d,_0x1b1448){var _0x1ae233=_0x233c0b;_0xa4e496=_0xa4e496,_0x3509a0=_0x3509a0,_0x3db20d=_0x3db20d,_0x1b1448=_0x1b1448;let _0x26f8e4=W(_0xa4e496),_0x72b8a4=_0x26f8e4[_0x1ae233(0x17a)],_0x485233=_0x26f8e4[_0x1ae233(0x196)];class _0x16a434{constructor(){var _0x3a8f66=_0x1ae233;this[_0x3a8f66(0x17c)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this[_0x3a8f66(0x1ca)]=/'([^\\\\']|\\\\')*'/,this[_0x3a8f66(0x162)]=_0xa4e496[_0x3a8f66(0x1cb)],this['_HTMLAllCollection']=_0xa4e496[_0x3a8f66(0x18e)],this[_0x3a8f66(0x197)]=Object[_0x3a8f66(0x194)],this[_0x3a8f66(0x107)]=Object[_0x3a8f66(0x13f)],this['_Symbol']=_0xa4e496['Symbol'],this[_0x3a8f66(0x13d)]=RegExp[_0x3a8f66(0x175)][_0x3a8f66(0x18f)],this['_dateToString']=Date['prototype'][_0x3a8f66(0x18f)];}[_0x1ae233(0xe6)](_0x541c7c,_0x1a9c9b,_0x5819ee,_0x2a06d5){var _0x2da3a1=_0x1ae233,_0x5114e6=this,_0x317b85=_0x5819ee[_0x2da3a1(0x1c6)];function _0x51db6a(_0x413a11,_0x3d2992,_0x1c393d){var _0x3226cf=_0x2da3a1;_0x3d2992['type']=_0x3226cf(0x1c5),_0x3d2992[_0x3226cf(0x1a9)]=_0x413a11['message'],_0x1f687a=_0x1c393d[_0x3226cf(0x145)]['current'],_0x1c393d[_0x3226cf(0x145)][_0x3226cf(0x113)]=_0x3d2992,_0x5114e6[_0x3226cf(0xf2)](_0x3d2992,_0x1c393d);}try{_0x5819ee[_0x2da3a1(0x1aa)]++,_0x5819ee['autoExpand']&&_0x5819ee['autoExpandPreviousObjects']['push'](_0x1a9c9b);var _0x4cec0c,_0x556db7,_0x10c2b1,_0x37d394,_0x289351=[],_0x3c3d52=[],_0xe7722e,_0xc39bcf=this['_type'](_0x1a9c9b),_0x5d7f91=_0xc39bcf==='array',_0x154b80=!0x1,_0x4796f7=_0xc39bcf===_0x2da3a1(0x1bd),_0x16bc77=this['_isPrimitiveType'](_0xc39bcf),_0x2151f9=this['_isPrimitiveWrapperType'](_0xc39bcf),_0x2359e5=_0x16bc77||_0x2151f9,_0x51082f={},_0x2fcf7a=0x0,_0x362b97=!0x1,_0x1f687a,_0x43433f=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x5819ee['depth']){if(_0x5d7f91){if(_0x556db7=_0x1a9c9b['length'],_0x556db7>_0x5819ee[_0x2da3a1(0x1d2)]){for(_0x10c2b1=0x0,_0x37d394=_0x5819ee[_0x2da3a1(0x1d2)],_0x4cec0c=_0x10c2b1;_0x4cec0c<_0x37d394;_0x4cec0c++)_0x3c3d52[_0x2da3a1(0x1ab)](_0x5114e6[_0x2da3a1(0x177)](_0x289351,_0x1a9c9b,_0xc39bcf,_0x4cec0c,_0x5819ee));_0x541c7c['cappedElements']=!0x0;}else{for(_0x10c2b1=0x0,_0x37d394=_0x556db7,_0x4cec0c=_0x10c2b1;_0x4cec0c<_0x37d394;_0x4cec0c++)_0x3c3d52['push'](_0x5114e6[_0x2da3a1(0x177)](_0x289351,_0x1a9c9b,_0xc39bcf,_0x4cec0c,_0x5819ee));}_0x5819ee[_0x2da3a1(0x14a)]+=_0x3c3d52[_0x2da3a1(0x1a3)];}if(!(_0xc39bcf===_0x2da3a1(0x187)||_0xc39bcf===_0x2da3a1(0x1cb))&&!_0x16bc77&&_0xc39bcf!==_0x2da3a1(0x1bc)&&_0xc39bcf!==_0x2da3a1(0x167)&&_0xc39bcf!==_0x2da3a1(0x161)){var _0x8b2a84=_0x2a06d5[_0x2da3a1(0x1d4)]||_0x5819ee[_0x2da3a1(0x1d4)];if(this[_0x2da3a1(0x1d6)](_0x1a9c9b)?(_0x4cec0c=0x0,_0x1a9c9b[_0x2da3a1(0x16c)](function(_0x28f40f){var _0x51b426=_0x2da3a1;if(_0x2fcf7a++,_0x5819ee[_0x51b426(0x14a)]++,_0x2fcf7a>_0x8b2a84){_0x362b97=!0x0;return;}if(!_0x5819ee[_0x51b426(0x185)]&&_0x5819ee[_0x51b426(0x1c6)]&&_0x5819ee[_0x51b426(0x14a)]>_0x5819ee[_0x51b426(0x1c1)]){_0x362b97=!0x0;return;}_0x3c3d52[_0x51b426(0x1ab)](_0x5114e6[_0x51b426(0x177)](_0x289351,_0x1a9c9b,_0x51b426(0x110),_0x4cec0c++,_0x5819ee,function(_0x1800ef){return function(){return _0x1800ef;};}(_0x28f40f)));})):this[_0x2da3a1(0x16a)](_0x1a9c9b)&&_0x1a9c9b['forEach'](function(_0x278356,_0x2904ff){var _0x11050e=_0x2da3a1;if(_0x2fcf7a++,_0x5819ee['autoExpandPropertyCount']++,_0x2fcf7a>_0x8b2a84){_0x362b97=!0x0;return;}if(!_0x5819ee['isExpressionToEvaluate']&&_0x5819ee[_0x11050e(0x1c6)]&&_0x5819ee[_0x11050e(0x14a)]>_0x5819ee[_0x11050e(0x1c1)]){_0x362b97=!0x0;return;}var _0x3282cc=_0x2904ff[_0x11050e(0x18f)]();_0x3282cc[_0x11050e(0x1a3)]>0x64&&(_0x3282cc=_0x3282cc['slice'](0x0,0x64)+_0x11050e(0x148)),_0x3c3d52[_0x11050e(0x1ab)](_0x5114e6[_0x11050e(0x177)](_0x289351,_0x1a9c9b,_0x11050e(0x11e),_0x3282cc,_0x5819ee,function(_0x35f26a){return function(){return _0x35f26a;};}(_0x278356)));}),!_0x154b80){try{for(_0xe7722e in _0x1a9c9b)if(!(_0x5d7f91&&_0x43433f[_0x2da3a1(0x11a)](_0xe7722e))&&!this[_0x2da3a1(0x1b1)](_0x1a9c9b,_0xe7722e,_0x5819ee)){if(_0x2fcf7a++,_0x5819ee['autoExpandPropertyCount']++,_0x2fcf7a>_0x8b2a84){_0x362b97=!0x0;break;}if(!_0x5819ee[_0x2da3a1(0x185)]&&_0x5819ee[_0x2da3a1(0x1c6)]&&_0x5819ee[_0x2da3a1(0x14a)]>_0x5819ee['autoExpandLimit']){_0x362b97=!0x0;break;}_0x3c3d52['push'](_0x5114e6['_addObjectProperty'](_0x289351,_0x51082f,_0x1a9c9b,_0xc39bcf,_0xe7722e,_0x5819ee));}}catch{}if(_0x51082f['_p_length']=!0x0,_0x4796f7&&(_0x51082f[_0x2da3a1(0x155)]=!0x0),!_0x362b97){var _0x5dbed2=[][_0x2da3a1(0x131)](this[_0x2da3a1(0x107)](_0x1a9c9b))['concat'](this[_0x2da3a1(0x1b7)](_0x1a9c9b));for(_0x4cec0c=0x0,_0x556db7=_0x5dbed2[_0x2da3a1(0x1a3)];_0x4cec0c<_0x556db7;_0x4cec0c++)if(_0xe7722e=_0x5dbed2[_0x4cec0c],!(_0x5d7f91&&_0x43433f['test'](_0xe7722e[_0x2da3a1(0x18f)]()))&&!this[_0x2da3a1(0x1b1)](_0x1a9c9b,_0xe7722e,_0x5819ee)&&!_0x51082f[_0x2da3a1(0x172)+_0xe7722e[_0x2da3a1(0x18f)]()]){if(_0x2fcf7a++,_0x5819ee[_0x2da3a1(0x14a)]++,_0x2fcf7a>_0x8b2a84){_0x362b97=!0x0;break;}if(!_0x5819ee[_0x2da3a1(0x185)]&&_0x5819ee[_0x2da3a1(0x1c6)]&&_0x5819ee['autoExpandPropertyCount']>_0x5819ee[_0x2da3a1(0x1c1)]){_0x362b97=!0x0;break;}_0x3c3d52[_0x2da3a1(0x1ab)](_0x5114e6['_addObjectProperty'](_0x289351,_0x51082f,_0x1a9c9b,_0xc39bcf,_0xe7722e,_0x5819ee));}}}}}if(_0x541c7c[_0x2da3a1(0x10c)]=_0xc39bcf,_0x2359e5?(_0x541c7c['value']=_0x1a9c9b[_0x2da3a1(0x1cf)](),this[_0x2da3a1(0x19a)](_0xc39bcf,_0x541c7c,_0x5819ee,_0x2a06d5)):_0xc39bcf===_0x2da3a1(0x118)?_0x541c7c[_0x2da3a1(0x14c)]=this[_0x2da3a1(0x189)]['call'](_0x1a9c9b):_0xc39bcf===_0x2da3a1(0x161)?_0x541c7c['value']=_0x1a9c9b[_0x2da3a1(0x18f)]():_0xc39bcf===_0x2da3a1(0x1bf)?_0x541c7c[_0x2da3a1(0x14c)]=this[_0x2da3a1(0x13d)][_0x2da3a1(0x1a0)](_0x1a9c9b):_0xc39bcf===_0x2da3a1(0x1c2)&&this[_0x2da3a1(0x1be)]?_0x541c7c['value']=this[_0x2da3a1(0x1be)][_0x2da3a1(0x175)][_0x2da3a1(0x18f)][_0x2da3a1(0x1a0)](_0x1a9c9b):!_0x5819ee[_0x2da3a1(0x186)]&&!(_0xc39bcf==='null'||_0xc39bcf===_0x2da3a1(0x1cb))&&(delete _0x541c7c[_0x2da3a1(0x14c)],_0x541c7c[_0x2da3a1(0x129)]=!0x0),_0x362b97&&(_0x541c7c[_0x2da3a1(0x158)]=!0x0),_0x1f687a=_0x5819ee['node']['current'],_0x5819ee[_0x2da3a1(0x145)][_0x2da3a1(0x113)]=_0x541c7c,this[_0x2da3a1(0xf2)](_0x541c7c,_0x5819ee),_0x3c3d52[_0x2da3a1(0x1a3)]){for(_0x4cec0c=0x0,_0x556db7=_0x3c3d52[_0x2da3a1(0x1a3)];_0x4cec0c<_0x556db7;_0x4cec0c++)_0x3c3d52[_0x4cec0c](_0x4cec0c);}_0x289351[_0x2da3a1(0x1a3)]&&(_0x541c7c['props']=_0x289351);}catch(_0x4d1a8e){_0x51db6a(_0x4d1a8e,_0x541c7c,_0x5819ee);}return this['_additionalMetadata'](_0x1a9c9b,_0x541c7c),this[_0x2da3a1(0xf6)](_0x541c7c,_0x5819ee),_0x5819ee['node'][_0x2da3a1(0x113)]=_0x1f687a,_0x5819ee[_0x2da3a1(0x1aa)]--,_0x5819ee[_0x2da3a1(0x1c6)]=_0x317b85,_0x5819ee[_0x2da3a1(0x1c6)]&&_0x5819ee[_0x2da3a1(0x1cc)][_0x2da3a1(0x119)](),_0x541c7c;}[_0x1ae233(0x1b7)](_0x52c084){var _0x5f4fd2=_0x1ae233;return Object[_0x5f4fd2(0x1d3)]?Object[_0x5f4fd2(0x1d3)](_0x52c084):[];}[_0x1ae233(0x1d6)](_0x46579f){var _0x45cf41=_0x1ae233;return!!(_0x46579f&&_0xa4e496[_0x45cf41(0x110)]&&this[_0x45cf41(0x146)](_0x46579f)===_0x45cf41(0x15c)&&_0x46579f[_0x45cf41(0x16c)]);}[_0x1ae233(0x1b1)](_0x4a042d,_0x4b84e6,_0x20abb9){var _0x37ed97=_0x1ae233;return _0x20abb9[_0x37ed97(0xe7)]?typeof _0x4a042d[_0x4b84e6]==_0x37ed97(0x1bd):!0x1;}[_0x1ae233(0x191)](_0x5a503f){var _0xc6ba15=_0x1ae233,_0x28ff57='';return _0x28ff57=typeof _0x5a503f,_0x28ff57===_0xc6ba15(0x138)?this['_objectToString'](_0x5a503f)==='[object\\x20Array]'?_0x28ff57=_0xc6ba15(0xfc):this[_0xc6ba15(0x146)](_0x5a503f)==='[object\\x20Date]'?_0x28ff57='date':this['_objectToString'](_0x5a503f)===_0xc6ba15(0x1b8)?_0x28ff57='bigint':_0x5a503f===null?_0x28ff57=_0xc6ba15(0x187):_0x5a503f[_0xc6ba15(0x199)]&&(_0x28ff57=_0x5a503f[_0xc6ba15(0x199)][_0xc6ba15(0x123)]||_0x28ff57):_0x28ff57===_0xc6ba15(0x1cb)&&this[_0xc6ba15(0x192)]&&_0x5a503f instanceof this['_HTMLAllCollection']&&(_0x28ff57=_0xc6ba15(0x18e)),_0x28ff57;}[_0x1ae233(0x146)](_0x1b2e3c){var _0x330493=_0x1ae233;return Object[_0x330493(0x175)][_0x330493(0x18f)][_0x330493(0x1a0)](_0x1b2e3c);}[_0x1ae233(0x1a7)](_0x304f22){var _0x501b3c=_0x1ae233;return _0x304f22===_0x501b3c(0xf5)||_0x304f22===_0x501b3c(0xff)||_0x304f22===_0x501b3c(0x15e);}[_0x1ae233(0x16e)](_0x4f6811){var _0x193c4e=_0x1ae233;return _0x4f6811==='Boolean'||_0x4f6811===_0x193c4e(0x1bc)||_0x4f6811===_0x193c4e(0x1ad);}[_0x1ae233(0x177)](_0x4f9eb1,_0x44ee42,_0x3ce7a6,_0x161cc4,_0x17fc53,_0x80e010){var _0x78db84=this;return function(_0x3f83dc){var _0x4c2d04=_0x5229,_0x224c17=_0x17fc53[_0x4c2d04(0x145)][_0x4c2d04(0x113)],_0x59d5cb=_0x17fc53[_0x4c2d04(0x145)][_0x4c2d04(0x117)],_0x3222b2=_0x17fc53[_0x4c2d04(0x145)][_0x4c2d04(0x14f)];_0x17fc53[_0x4c2d04(0x145)][_0x4c2d04(0x14f)]=_0x224c17,_0x17fc53[_0x4c2d04(0x145)]['index']=typeof _0x161cc4==_0x4c2d04(0x15e)?_0x161cc4:_0x3f83dc,_0x4f9eb1[_0x4c2d04(0x1ab)](_0x78db84['_property'](_0x44ee42,_0x3ce7a6,_0x161cc4,_0x17fc53,_0x80e010)),_0x17fc53['node'][_0x4c2d04(0x14f)]=_0x3222b2,_0x17fc53[_0x4c2d04(0x145)]['index']=_0x59d5cb;};}[_0x1ae233(0x16b)](_0x563792,_0x5d4b5e,_0x22a80b,_0x5ab6d3,_0x3d1a30,_0x3c6b52,_0x52d22a){var _0x3a48b7=_0x1ae233,_0x31389c=this;return _0x5d4b5e[_0x3a48b7(0x172)+_0x3d1a30[_0x3a48b7(0x18f)]()]=!0x0,function(_0x685fb1){var _0x395161=_0x3a48b7,_0x297a51=_0x3c6b52[_0x395161(0x145)]['current'],_0x54e9b7=_0x3c6b52[_0x395161(0x145)]['index'],_0x53c760=_0x3c6b52['node'][_0x395161(0x14f)];_0x3c6b52[_0x395161(0x145)][_0x395161(0x14f)]=_0x297a51,_0x3c6b52[_0x395161(0x145)][_0x395161(0x117)]=_0x685fb1,_0x563792['push'](_0x31389c[_0x395161(0xf9)](_0x22a80b,_0x5ab6d3,_0x3d1a30,_0x3c6b52,_0x52d22a)),_0x3c6b52[_0x395161(0x145)]['parent']=_0x53c760,_0x3c6b52[_0x395161(0x145)][_0x395161(0x117)]=_0x54e9b7;};}['_property'](_0x10ea37,_0x5ab413,_0x5507f2,_0x1985bf,_0x25ed7c){var _0x38187a=_0x1ae233,_0x45ad86=this;_0x25ed7c||(_0x25ed7c=function(_0x1cf487,_0xc15883){return _0x1cf487[_0xc15883];});var _0x2ba207=_0x5507f2[_0x38187a(0x18f)](),_0x2481ba=_0x1985bf[_0x38187a(0x152)]||{},_0x32fad4=_0x1985bf[_0x38187a(0x186)],_0x56d363=_0x1985bf['isExpressionToEvaluate'];try{var _0x2ae279=this['_isMap'](_0x10ea37),_0x5d887a=_0x2ba207;_0x2ae279&&_0x5d887a[0x0]==='\\x27'&&(_0x5d887a=_0x5d887a['substr'](0x1,_0x5d887a['length']-0x2));var _0xf30432=_0x1985bf[_0x38187a(0x152)]=_0x2481ba[_0x38187a(0x172)+_0x5d887a];_0xf30432&&(_0x1985bf[_0x38187a(0x186)]=_0x1985bf['depth']+0x1),_0x1985bf[_0x38187a(0x185)]=!!_0xf30432;var _0xf60329=typeof _0x5507f2==_0x38187a(0x1c2),_0x590054={'name':_0xf60329||_0x2ae279?_0x2ba207:this['_propertyName'](_0x2ba207)};if(_0xf60329&&(_0x590054[_0x38187a(0x1c2)]=!0x0),!(_0x5ab413==='array'||_0x5ab413===_0x38187a(0x151))){var _0x20425b=this['_getOwnPropertyDescriptor'](_0x10ea37,_0x5507f2);if(_0x20425b&&(_0x20425b[_0x38187a(0x183)]&&(_0x590054[_0x38187a(0x182)]=!0x0),_0x20425b[_0x38187a(0x10e)]&&!_0xf30432&&!_0x1985bf[_0x38187a(0x165)]))return _0x590054[_0x38187a(0x150)]=!0x0,this[_0x38187a(0x139)](_0x590054,_0x1985bf),_0x590054;}var _0x9388dc;try{_0x9388dc=_0x25ed7c(_0x10ea37,_0x5507f2);}catch(_0x3ac625){return _0x590054={'name':_0x2ba207,'type':_0x38187a(0x1c5),'error':_0x3ac625['message']},this[_0x38187a(0x139)](_0x590054,_0x1985bf),_0x590054;}var _0x41281a=this[_0x38187a(0x191)](_0x9388dc),_0x2ef369=this['_isPrimitiveType'](_0x41281a);if(_0x590054[_0x38187a(0x10c)]=_0x41281a,_0x2ef369)this[_0x38187a(0x139)](_0x590054,_0x1985bf,_0x9388dc,function(){var _0x201721=_0x38187a;_0x590054['value']=_0x9388dc['valueOf'](),!_0xf30432&&_0x45ad86[_0x201721(0x19a)](_0x41281a,_0x590054,_0x1985bf,{});});else{var _0x2ae07b=_0x1985bf[_0x38187a(0x1c6)]&&_0x1985bf[_0x38187a(0x1aa)]<_0x1985bf[_0x38187a(0x179)]&&_0x1985bf['autoExpandPreviousObjects'][_0x38187a(0x190)](_0x9388dc)<0x0&&_0x41281a!=='function'&&_0x1985bf[_0x38187a(0x14a)]<_0x1985bf[_0x38187a(0x1c1)];_0x2ae07b||_0x1985bf[_0x38187a(0x1aa)]<_0x32fad4||_0xf30432?(this[_0x38187a(0xe6)](_0x590054,_0x9388dc,_0x1985bf,_0xf30432||{}),this[_0x38187a(0x198)](_0x9388dc,_0x590054)):this['_processTreeNodeResult'](_0x590054,_0x1985bf,_0x9388dc,function(){var _0x4aca38=_0x38187a;_0x41281a==='null'||_0x41281a===_0x4aca38(0x1cb)||(delete _0x590054[_0x4aca38(0x14c)],_0x590054[_0x4aca38(0x129)]=!0x0);});}return _0x590054;}finally{_0x1985bf[_0x38187a(0x152)]=_0x2481ba,_0x1985bf[_0x38187a(0x186)]=_0x32fad4,_0x1985bf['isExpressionToEvaluate']=_0x56d363;}}[_0x1ae233(0x19a)](_0x434bab,_0xffd0a5,_0x18d7b2,_0x4edc79){var _0x1a55ec=_0x1ae233,_0x4d0c98=_0x4edc79[_0x1a55ec(0x1c3)]||_0x18d7b2[_0x1a55ec(0x1c3)];if((_0x434bab==='string'||_0x434bab===_0x1a55ec(0x1bc))&&_0xffd0a5[_0x1a55ec(0x14c)]){let _0x5efdda=_0xffd0a5[_0x1a55ec(0x14c)]['length'];_0x18d7b2[_0x1a55ec(0x108)]+=_0x5efdda,_0x18d7b2[_0x1a55ec(0x108)]>_0x18d7b2[_0x1a55ec(0x11c)]?(_0xffd0a5[_0x1a55ec(0x129)]='',delete _0xffd0a5[_0x1a55ec(0x14c)]):_0x5efdda>_0x4d0c98&&(_0xffd0a5[_0x1a55ec(0x129)]=_0xffd0a5['value'][_0x1a55ec(0x15b)](0x0,_0x4d0c98),delete _0xffd0a5[_0x1a55ec(0x14c)]);}}[_0x1ae233(0x16a)](_0x291df1){var _0x49ee0d=_0x1ae233;return!!(_0x291df1&&_0xa4e496['Map']&&this['_objectToString'](_0x291df1)===_0x49ee0d(0x166)&&_0x291df1[_0x49ee0d(0x16c)]);}[_0x1ae233(0x154)](_0x45c346){var _0x4d40a7=_0x1ae233;if(_0x45c346[_0x4d40a7(0x160)](/^\\d+$/))return _0x45c346;var _0x5805a9;try{_0x5805a9=JSON['stringify'](''+_0x45c346);}catch{_0x5805a9='\\x22'+this[_0x4d40a7(0x146)](_0x45c346)+'\\x22';}return _0x5805a9['match'](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x5805a9=_0x5805a9[_0x4d40a7(0x15b)](0x1,_0x5805a9[_0x4d40a7(0x1a3)]-0x2):_0x5805a9=_0x5805a9['replace'](/'/g,'\\x5c\\x27')[_0x4d40a7(0x10b)](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x5805a9;}['_processTreeNodeResult'](_0x46ae37,_0x217d98,_0x48b11a,_0x4c01f7){var _0x2a67b6=_0x1ae233;this['_treeNodePropertiesBeforeFullValue'](_0x46ae37,_0x217d98),_0x4c01f7&&_0x4c01f7(),this[_0x2a67b6(0x198)](_0x48b11a,_0x46ae37),this[_0x2a67b6(0xf6)](_0x46ae37,_0x217d98);}[_0x1ae233(0xf2)](_0x28c479,_0x5984bb){var _0x430ef1=_0x1ae233;this[_0x430ef1(0x144)](_0x28c479,_0x5984bb),this[_0x430ef1(0x17d)](_0x28c479,_0x5984bb),this['_setNodeExpressionPath'](_0x28c479,_0x5984bb),this[_0x430ef1(0x116)](_0x28c479,_0x5984bb);}[_0x1ae233(0x144)](_0x2087b5,_0x6f377c){}[_0x1ae233(0x17d)](_0x375570,_0x3a048d){}['_setNodeLabel'](_0x4fa22f,_0x34d651){}[_0x1ae233(0x174)](_0x4f4769){var _0x502e6f=_0x1ae233;return _0x4f4769===this[_0x502e6f(0x162)];}[_0x1ae233(0xf6)](_0x49b75b,_0x266725){var _0x536ad7=_0x1ae233;this['_setNodeLabel'](_0x49b75b,_0x266725),this['_setNodeExpandableState'](_0x49b75b),_0x266725[_0x536ad7(0x134)]&&this[_0x536ad7(0x1c7)](_0x49b75b),this[_0x536ad7(0x159)](_0x49b75b,_0x266725),this[_0x536ad7(0x14e)](_0x49b75b,_0x266725),this[_0x536ad7(0x105)](_0x49b75b);}[_0x1ae233(0x198)](_0x55ff6e,_0x2c1593){var _0x2f124f=_0x1ae233;let _0x15c55c;try{_0xa4e496[_0x2f124f(0x19c)]&&(_0x15c55c=_0xa4e496[_0x2f124f(0x19c)][_0x2f124f(0x1a9)],_0xa4e496[_0x2f124f(0x19c)]['error']=function(){}),_0x55ff6e&&typeof _0x55ff6e['length']==_0x2f124f(0x15e)&&(_0x2c1593[_0x2f124f(0x1a3)]=_0x55ff6e[_0x2f124f(0x1a3)]);}catch{}finally{_0x15c55c&&(_0xa4e496[_0x2f124f(0x19c)][_0x2f124f(0x1a9)]=_0x15c55c);}if(_0x2c1593[_0x2f124f(0x10c)]==='number'||_0x2c1593[_0x2f124f(0x10c)]==='Number'){if(isNaN(_0x2c1593[_0x2f124f(0x14c)]))_0x2c1593['nan']=!0x0,delete _0x2c1593[_0x2f124f(0x14c)];else switch(_0x2c1593[_0x2f124f(0x14c)]){case Number[_0x2f124f(0x1ba)]:_0x2c1593[_0x2f124f(0x109)]=!0x0,delete _0x2c1593[_0x2f124f(0x14c)];break;case Number[_0x2f124f(0x1cd)]:_0x2c1593[_0x2f124f(0xed)]=!0x0,delete _0x2c1593[_0x2f124f(0x14c)];break;case 0x0:this[_0x2f124f(0x141)](_0x2c1593[_0x2f124f(0x14c)])&&(_0x2c1593['negativeZero']=!0x0);break;}}else _0x2c1593[_0x2f124f(0x10c)]===_0x2f124f(0x1bd)&&typeof _0x55ff6e[_0x2f124f(0x123)]=='string'&&_0x55ff6e[_0x2f124f(0x123)]&&_0x2c1593['name']&&_0x55ff6e[_0x2f124f(0x123)]!==_0x2c1593[_0x2f124f(0x123)]&&(_0x2c1593[_0x2f124f(0x111)]=_0x55ff6e['name']);}['_isNegativeZero'](_0x4218f8){return 0x1/_0x4218f8===Number['NEGATIVE_INFINITY'];}[_0x1ae233(0x1c7)](_0x27b736){var _0x58a95f=_0x1ae233;!_0x27b736[_0x58a95f(0x1d4)]||!_0x27b736[_0x58a95f(0x1d4)]['length']||_0x27b736[_0x58a95f(0x10c)]===_0x58a95f(0xfc)||_0x27b736['type']===_0x58a95f(0x11e)||_0x27b736[_0x58a95f(0x10c)]===_0x58a95f(0x110)||_0x27b736[_0x58a95f(0x1d4)]['sort'](function(_0x21b4a6,_0x243dca){var _0x5c3c5b=_0x58a95f,_0x537926=_0x21b4a6['name'][_0x5c3c5b(0x18b)](),_0x5691fc=_0x243dca[_0x5c3c5b(0x123)][_0x5c3c5b(0x18b)]();return _0x537926<_0x5691fc?-0x1:_0x537926>_0x5691fc?0x1:0x0;});}['_addFunctionsNode'](_0x27ac31,_0x5e3d6e){var _0x328b0a=_0x1ae233;if(!(_0x5e3d6e[_0x328b0a(0xe7)]||!_0x27ac31[_0x328b0a(0x1d4)]||!_0x27ac31[_0x328b0a(0x1d4)][_0x328b0a(0x1a3)])){for(var _0x569083=[],_0x5cd9e8=[],_0x82bc9a=0x0,_0x38f1f3=_0x27ac31[_0x328b0a(0x1d4)][_0x328b0a(0x1a3)];_0x82bc9a<_0x38f1f3;_0x82bc9a++){var _0x28ca59=_0x27ac31[_0x328b0a(0x1d4)][_0x82bc9a];_0x28ca59[_0x328b0a(0x10c)]===_0x328b0a(0x1bd)?_0x569083[_0x328b0a(0x1ab)](_0x28ca59):_0x5cd9e8[_0x328b0a(0x1ab)](_0x28ca59);}if(!(!_0x5cd9e8[_0x328b0a(0x1a3)]||_0x569083[_0x328b0a(0x1a3)]<=0x1)){_0x27ac31[_0x328b0a(0x1d4)]=_0x5cd9e8;var _0x433159={'functionsNode':!0x0,'props':_0x569083};this[_0x328b0a(0x144)](_0x433159,_0x5e3d6e),this[_0x328b0a(0x1b9)](_0x433159,_0x5e3d6e),this[_0x328b0a(0x125)](_0x433159),this[_0x328b0a(0x116)](_0x433159,_0x5e3d6e),_0x433159['id']+='\\x20f',_0x27ac31[_0x328b0a(0x1d4)][_0x328b0a(0x1a5)](_0x433159);}}}[_0x1ae233(0x14e)](_0x22a085,_0x4a5ad3){}[_0x1ae233(0x125)](_0x27d01e){}[_0x1ae233(0x181)](_0x1b0e41){var _0x4140d9=_0x1ae233;return Array['isArray'](_0x1b0e41)||typeof _0x1b0e41==_0x4140d9(0x138)&&this[_0x4140d9(0x146)](_0x1b0e41)===_0x4140d9(0x12a);}[_0x1ae233(0x116)](_0x90125b,_0x5a4d6b){}[_0x1ae233(0x105)](_0x4b56bd){var _0x24036d=_0x1ae233;delete _0x4b56bd[_0x24036d(0xfa)],delete _0x4b56bd[_0x24036d(0x115)],delete _0x4b56bd[_0x24036d(0x126)];}[_0x1ae233(0x1ac)](_0x3a0318,_0x28514e){}}let _0x5b787c=new _0x16a434(),_0x2e854a={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x356caa={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x4631eb(_0x68a0ce,_0x5cc760,_0xa4de36,_0x2f71ee,_0x5d33a2,_0x72b57){var _0x4a6964=_0x1ae233;let _0x79e5aa,_0x251e6f;try{_0x251e6f=_0x485233(),_0x79e5aa=_0x3db20d[_0x5cc760],!_0x79e5aa||_0x251e6f-_0x79e5aa['ts']>0x1f4&&_0x79e5aa[_0x4a6964(0x12e)]&&_0x79e5aa[_0x4a6964(0x156)]/_0x79e5aa['count']<0x64?(_0x3db20d[_0x5cc760]=_0x79e5aa={'count':0x0,'time':0x0,'ts':_0x251e6f},_0x3db20d[_0x4a6964(0x15d)]={}):_0x251e6f-_0x3db20d[_0x4a6964(0x15d)]['ts']>0x32&&_0x3db20d[_0x4a6964(0x15d)][_0x4a6964(0x12e)]&&_0x3db20d[_0x4a6964(0x15d)][_0x4a6964(0x156)]/_0x3db20d[_0x4a6964(0x15d)]['count']<0x64&&(_0x3db20d[_0x4a6964(0x15d)]={});let _0x41bbbb=[],_0x4640e6=_0x79e5aa[_0x4a6964(0x19e)]||_0x3db20d['hits'][_0x4a6964(0x19e)]?_0x356caa:_0x2e854a,_0x2a9096=_0x33e410=>{var _0x250948=_0x4a6964;let _0x2cec18={};return _0x2cec18[_0x250948(0x1d4)]=_0x33e410[_0x250948(0x1d4)],_0x2cec18[_0x250948(0x1d2)]=_0x33e410[_0x250948(0x1d2)],_0x2cec18['strLength']=_0x33e410['strLength'],_0x2cec18['totalStrLength']=_0x33e410[_0x250948(0x11c)],_0x2cec18['autoExpandLimit']=_0x33e410[_0x250948(0x1c1)],_0x2cec18[_0x250948(0x179)]=_0x33e410[_0x250948(0x179)],_0x2cec18['sortProps']=!0x1,_0x2cec18[_0x250948(0xe7)]=!_0x3509a0,_0x2cec18['depth']=0x1,_0x2cec18[_0x250948(0x1aa)]=0x0,_0x2cec18[_0x250948(0xfb)]=_0x250948(0x188),_0x2cec18[_0x250948(0x1a8)]=_0x250948(0x122),_0x2cec18['autoExpand']=!0x0,_0x2cec18['autoExpandPreviousObjects']=[],_0x2cec18['autoExpandPropertyCount']=0x0,_0x2cec18[_0x250948(0x165)]=!0x0,_0x2cec18[_0x250948(0x108)]=0x0,_0x2cec18[_0x250948(0x145)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x2cec18;};for(var _0x12d646=0x0;_0x12d646<_0x5d33a2[_0x4a6964(0x1a3)];_0x12d646++)_0x41bbbb[_0x4a6964(0x1ab)](_0x5b787c[_0x4a6964(0xe6)]({'timeNode':_0x68a0ce==='time'||void 0x0},_0x5d33a2[_0x12d646],_0x2a9096(_0x4640e6),{}));if(_0x68a0ce===_0x4a6964(0x170)){let _0x23b97c=Error[_0x4a6964(0x18d)];try{Error['stackTraceLimit']=0x1/0x0,_0x41bbbb[_0x4a6964(0x1ab)](_0x5b787c[_0x4a6964(0xe6)]({'stackNode':!0x0},new Error()['stack'],_0x2a9096(_0x4640e6),{'strLength':0x1/0x0}));}finally{Error['stackTraceLimit']=_0x23b97c;}}return{'method':'log','version':_0x1b1448,'args':[{'ts':_0xa4de36,'session':_0x2f71ee,'args':_0x41bbbb,'id':_0x5cc760,'context':_0x72b57}]};}catch(_0x36d517){return{'method':_0x4a6964(0xf0),'version':_0x1b1448,'args':[{'ts':_0xa4de36,'session':_0x2f71ee,'args':[{'type':_0x4a6964(0x1c5),'error':_0x36d517&&_0x36d517[_0x4a6964(0x1b3)]}],'id':_0x5cc760,'context':_0x72b57}]};}finally{try{if(_0x79e5aa&&_0x251e6f){let _0x4167ff=_0x485233();_0x79e5aa['count']++,_0x79e5aa['time']+=_0x72b8a4(_0x251e6f,_0x4167ff),_0x79e5aa['ts']=_0x4167ff,_0x3db20d[_0x4a6964(0x15d)]['count']++,_0x3db20d[_0x4a6964(0x15d)]['time']+=_0x72b8a4(_0x251e6f,_0x4167ff),_0x3db20d[_0x4a6964(0x15d)]['ts']=_0x4167ff,(_0x79e5aa[_0x4a6964(0x12e)]>0x32||_0x79e5aa[_0x4a6964(0x156)]>0x64)&&(_0x79e5aa[_0x4a6964(0x19e)]=!0x0),(_0x3db20d[_0x4a6964(0x15d)][_0x4a6964(0x12e)]>0x3e8||_0x3db20d[_0x4a6964(0x15d)][_0x4a6964(0x156)]>0x12c)&&(_0x3db20d['hits'][_0x4a6964(0x19e)]=!0x0);}}catch{}}}return _0x4631eb;}((_0x8bad76,_0x413478,_0xdf795,_0x3a0654,_0x7af2d,_0x53dbb7,_0xf68b6e,_0x1a1cef,_0x354cb3,_0x2df695)=>{var _0x201a53=_0x233c0b;if(_0x8bad76[_0x201a53(0xf8)])return _0x8bad76[_0x201a53(0xf8)];if(!J(_0x8bad76,_0x1a1cef,_0x7af2d))return _0x8bad76['_console_ninja']={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x8bad76[_0x201a53(0xf8)];let _0x1ae684=W(_0x8bad76),_0x571e40=_0x1ae684[_0x201a53(0x17a)],_0x425aa6=_0x1ae684[_0x201a53(0x196)],_0x4c85c3=_0x1ae684['now'],_0x28e6f3={'hits':{},'ts':{}},_0x5a5400=Y(_0x8bad76,_0x354cb3,_0x28e6f3,_0x53dbb7),_0x17366c=_0x393d7c=>{_0x28e6f3['ts'][_0x393d7c]=_0x425aa6();},_0x12426f=(_0x1e7184,_0xaf1197)=>{var _0x24f029=_0x201a53;let _0x442899=_0x28e6f3['ts'][_0xaf1197];if(delete _0x28e6f3['ts'][_0xaf1197],_0x442899){let _0x59834c=_0x571e40(_0x442899,_0x425aa6());_0x27ac39(_0x5a5400(_0x24f029(0x156),_0x1e7184,_0x4c85c3(),_0x558c58,[_0x59834c],_0xaf1197));}},_0x57aca8=_0x475894=>_0x18ebdb=>{var _0x23b48c=_0x201a53;try{_0x17366c(_0x18ebdb),_0x475894(_0x18ebdb);}finally{_0x8bad76[_0x23b48c(0x19c)]['time']=_0x475894;}},_0x75397e=_0x162fba=>_0x1a0c98=>{var _0x2968e4=_0x201a53;try{let [_0x18478c,_0x413616]=_0x1a0c98['split'](_0x2968e4(0x114));_0x12426f(_0x413616,_0x18478c),_0x162fba(_0x18478c);}finally{_0x8bad76[_0x2968e4(0x19c)]['timeEnd']=_0x162fba;}};_0x8bad76['_console_ninja']={'consoleLog':(_0x47216a,_0x2e2980)=>{var _0x2ddb5a=_0x201a53;_0x8bad76['console'][_0x2ddb5a(0xf0)][_0x2ddb5a(0x123)]!==_0x2ddb5a(0x1ce)&&_0x27ac39(_0x5a5400(_0x2ddb5a(0xf0),_0x47216a,_0x4c85c3(),_0x558c58,_0x2e2980));},'consoleTrace':(_0x347ab0,_0x199df5)=>{var _0x184961=_0x201a53;_0x8bad76[_0x184961(0x19c)][_0x184961(0xf0)]['name']!==_0x184961(0x1a1)&&_0x27ac39(_0x5a5400('trace',_0x347ab0,_0x4c85c3(),_0x558c58,_0x199df5));},'consoleTime':()=>{var _0x781fc9=_0x201a53;_0x8bad76[_0x781fc9(0x19c)][_0x781fc9(0x156)]=_0x57aca8(_0x8bad76[_0x781fc9(0x19c)]['time']);},'consoleTimeEnd':()=>{var _0x5574ae=_0x201a53;_0x8bad76[_0x5574ae(0x19c)]['timeEnd']=_0x75397e(_0x8bad76[_0x5574ae(0x19c)][_0x5574ae(0x103)]);},'autoLog':(_0xbb480d,_0xff3453)=>{_0x27ac39(_0x5a5400('log',_0xff3453,_0x4c85c3(),_0x558c58,[_0xbb480d]));},'autoLogMany':(_0x502a54,_0x5d6afd)=>{_0x27ac39(_0x5a5400('log',_0x502a54,_0x4c85c3(),_0x558c58,_0x5d6afd));},'autoTrace':(_0x468d21,_0x7fc0e2)=>{var _0x1c0013=_0x201a53;_0x27ac39(_0x5a5400(_0x1c0013(0x170),_0x7fc0e2,_0x4c85c3(),_0x558c58,[_0x468d21]));},'autoTraceMany':(_0x232632,_0x57e499)=>{_0x27ac39(_0x5a5400('trace',_0x232632,_0x4c85c3(),_0x558c58,_0x57e499));},'autoTime':(_0x4f1673,_0x24de5b,_0x5c5d49)=>{_0x17366c(_0x5c5d49);},'autoTimeEnd':(_0x905848,_0x67fd5b,_0x18fa9a)=>{_0x12426f(_0x67fd5b,_0x18fa9a);},'coverage':_0x98714f=>{var _0x109170=_0x201a53;_0x27ac39({'method':_0x109170(0x1a2),'version':_0x53dbb7,'args':[{'id':_0x98714f}]});}};let _0x27ac39=b(_0x8bad76,_0x413478,_0xdf795,_0x3a0654,_0x7af2d,_0x2df695),_0x558c58=_0x8bad76[_0x201a53(0x1af)];return _0x8bad76['_console_ninja'];})(globalThis,_0x233c0b(0x106),_0x233c0b(0x101),_0x233c0b(0x16f),'webpack',_0x233c0b(0x15f),_0x233c0b(0x13e),_0x233c0b(0x135),_0x233c0b(0xef),'');");
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