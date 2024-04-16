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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';function _0x83ce(){var _0x378968=['array','_getOwnPropertyNames','getOwnPropertySymbols','depth','join','angular','root_exp','url','autoExpandPreviousObjects','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','remix','onmessage','...','_setNodeExpandableState','_addLoadNode','https://tinyurl.com/37x8b79t','_getOwnPropertySymbols','warn','__es'+'Module','data','Symbol','hrtime','global','_hasMapOnItsPath','disabledLog','getter','Buffer','153qJxjFp','_allowedToConnectOnSend','_numberRegExp','error','_additionalMetadata','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_isUndefined','args','483416xVPZnZ','autoExpand','nan','function','match','unknown','value','_hasSymbolPropertyOnItsPath','allStrLength','pathToFileURL','6672445CPIhcm','getWebSocketClass','symbol','versions','3724035SLdipr','autoExpandLimit','onopen','path','unref','[object\\x20Array]','valueOf','pop','constructor','bind','_webSocketErrorDocsLink','_console_ninja_session','undefined','HTMLAllCollection','boolean','[object\\x20Set]','timeEnd','noFunctions','trace','_inBrowser','49980','POSITIVE_INFINITY','serialize','split','totalStrLength','_attemptToReconnectShortly','826808noKaoL','cappedProps','stringify','send','NEGATIVE_INFINITY','_HTMLAllCollection','_undefined','default','edge','name','_console_ninja','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','9267pUXNhy','time','_keyStrRegExp','parent','setter',':logPointId:','Number','_reconnectTimeout','_connectAttemptCount','[object\\x20Date]','_connecting','level','sortProps','next.js','WebSocket','_addFunctionsNode','autoExpandPropertyCount','date','1045912HbQNaY','create','port','bigint','isExpressionToEvaluate','ws://','_p_name','cappedElements','capped','astro','_property','_hasSetOnItsPath','_sendErrorMessage','origin','test','onclose','root_exp_id','prototype','hasOwnProperty','_ws','process','env','getOwnPropertyNames','onerror','gateway.docker.internal','_treeNodePropertiesAfterFullValue','current','_disposeWebsocket','nuxt','Set','unshift','type','log','node','RegExp','replace','_type','_objectToString','stack','10647984sUaATH','1.0.0','_addObjectProperty','_setNodeLabel','string','stackTraceLimit','_consoleNinjaAllowedToStart','forEach','_addProperty','negativeInfinity','performance','catch','String','_setNodePermissions','get','autoExpandMaxDepth','toString','nodeModules','1713233777746','_setNodeExpressionPath','Error','getOwnPropertyDescriptor','_WebSocketClass','[object\\x20Map]','_p_length','elapsed','indexOf','_getOwnPropertyDescriptor','host','_isMap','734xvAgYw','_connectToHostNow','strLength','object','webpack','substr','null','_treeNodePropertiesBeforeFullValue','length','_isPrimitiveType','_maxConnectAttemptCount','push','_isPrimitiveWrapperType','message','coverage','positiveInfinity','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','resolveGetters','127.0.0.1','expressionsToEvaluate','getPrototypeOf','NEXT_RUNTIME','_inNextEdge','_Symbol','_propertyName','reduceLimits','then','negativeZero','_dateToString','Map','_setNodeId','isArray','timeStamp','now','_capIfString','reload','number','','_WebSocket','hits','count','location','ws/index.js','console','props','_processTreeNodeResult','_isSet','call','_blacklistedProperty','_isArray','_connected','_allowedToSend','funcName','toLowerCase','index','disabledTrace','_regExpToString','elements','dockerizedApp','logger\\x20websocket\\x20error','_p_','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','_socket','slice','_sortProps'];_0x83ce=function(){return _0x378968;};return _0x83ce();}var _0x125cef=_0x37ec;(function(_0x1bfac7,_0x39888f){var _0x339719=_0x37ec,_0x577a2d=_0x1bfac7();while(!![]){try{var _0x5ef73d=parseInt(_0x339719(0xe0))/0x1+parseInt(_0x339719(0x143))/0x2*(-parseInt(_0x339719(0xec))/0x3)+-parseInt(_0x339719(0xfe))/0x4+parseInt(_0x339719(0xc2))/0x5+parseInt(_0x339719(0x125))/0x6+-parseInt(_0x339719(0xc6))/0x7+parseInt(_0x339719(0xb8))/0x8*(-parseInt(_0x339719(0xb0))/0x9);if(_0x5ef73d===_0x39888f)break;else _0x577a2d['push'](_0x577a2d['shift']());}catch(_0x337818){_0x577a2d['push'](_0x577a2d['shift']());}}}(_0x83ce,0xefa34));function _0x37ec(_0x4f78ff,_0xdb301){var _0x83ceec=_0x83ce();return _0x37ec=function(_0x37eccb,_0x386d16){_0x37eccb=_0x37eccb-0x69;var _0x4fc63c=_0x83ceec[_0x37eccb];return _0x4fc63c;},_0x37ec(_0x4f78ff,_0xdb301);}var j=Object[_0x125cef(0xff)],x=Object['defineProperty'],G=Object[_0x125cef(0x13a)],ee=Object[_0x125cef(0x114)],te=Object[_0x125cef(0x157)],ne=Object[_0x125cef(0x10f)][_0x125cef(0x110)],re=(_0x275c6a,_0x1bf42c,_0x1e8e0f,_0x211c7e)=>{var _0x278d69=_0x125cef;if(_0x1bf42c&&typeof _0x1bf42c==_0x278d69(0x146)||typeof _0x1bf42c=='function'){for(let _0x2bbe86 of ee(_0x1bf42c))!ne[_0x278d69(0x83)](_0x275c6a,_0x2bbe86)&&_0x2bbe86!==_0x1e8e0f&&x(_0x275c6a,_0x2bbe86,{'get':()=>_0x1bf42c[_0x2bbe86],'enumerable':!(_0x211c7e=G(_0x1bf42c,_0x2bbe86))||_0x211c7e['enumerable']});}return _0x275c6a;},H=(_0x3139fc,_0x3c826e,_0x40bcba)=>(_0x40bcba=_0x3139fc!=null?j(te(_0x3139fc)):{},re(_0x3c826e||!_0x3139fc||!_0x3139fc[_0x125cef(0xa7)]?x(_0x40bcba,_0x125cef(0xe7),{'value':_0x3139fc,'enumerable':!0x0}):_0x40bcba,_0x3139fc)),q=class{constructor(_0x29ca21,_0x430f24,_0x53d7e9,_0x840822,_0x25b636){var _0x2d9398=_0x125cef;this[_0x2d9398(0xab)]=_0x29ca21,this[_0x2d9398(0x141)]=_0x430f24,this[_0x2d9398(0x100)]=_0x53d7e9,this[_0x2d9398(0x136)]=_0x840822,this['dockerizedApp']=_0x25b636,this[_0x2d9398(0x87)]=!0x0,this['_allowedToConnectOnSend']=!0x0,this[_0x2d9398(0x86)]=!0x1,this['_connecting']=!0x1,this[_0x2d9398(0x6a)]=_0x29ca21['process']?.['env']?.[_0x2d9398(0x69)]===_0x2d9398(0xe8),this[_0x2d9398(0xd9)]=!this[_0x2d9398(0xab)][_0x2d9398(0x112)]?.[_0x2d9398(0xc5)]?.['node']&&!this[_0x2d9398(0x6a)],this[_0x2d9398(0x13b)]=null,this[_0x2d9398(0xf4)]=0x0,this[_0x2d9398(0x14d)]=0x14,this[_0x2d9398(0xd0)]=_0x2d9398(0xa4),this[_0x2d9398(0x10a)]=(this[_0x2d9398(0xd9)]?_0x2d9398(0x9e):_0x2d9398(0xb5))+this[_0x2d9398(0xd0)];}async[_0x125cef(0xc3)](){var _0x2d53e8=_0x125cef;if(this[_0x2d53e8(0x13b)])return this[_0x2d53e8(0x13b)];let _0x44de9b;if(this['_inBrowser']||this[_0x2d53e8(0x6a)])_0x44de9b=this[_0x2d53e8(0xab)][_0x2d53e8(0xfa)];else{if(this['global']['process']?.[_0x2d53e8(0x7a)])_0x44de9b=this[_0x2d53e8(0xab)][_0x2d53e8(0x112)]?.[_0x2d53e8(0x7a)];else try{let _0x3e9056=await import(_0x2d53e8(0xc9));_0x44de9b=(await import((await import(_0x2d53e8(0x9c)))[_0x2d53e8(0xc1)](_0x3e9056[_0x2d53e8(0x99)](this[_0x2d53e8(0x136)],_0x2d53e8(0x7e)))[_0x2d53e8(0x135)]()))[_0x2d53e8(0xe7)];}catch{try{_0x44de9b=require(require(_0x2d53e8(0xc9))[_0x2d53e8(0x99)](this[_0x2d53e8(0x136)],'ws'));}catch{throw new Error(_0x2d53e8(0xeb));}}}return this[_0x2d53e8(0x13b)]=_0x44de9b,_0x44de9b;}[_0x125cef(0x144)](){var _0x22d646=_0x125cef;this['_connecting']||this[_0x22d646(0x86)]||this[_0x22d646(0xf4)]>=this[_0x22d646(0x14d)]||(this[_0x22d646(0xb1)]=!0x1,this[_0x22d646(0xf6)]=!0x0,this[_0x22d646(0xf4)]++,this[_0x22d646(0x111)]=new Promise((_0x287a4e,_0x345281)=>{var _0x4570be=_0x22d646;this[_0x4570be(0xc3)]()[_0x4570be(0x6e)](_0x3a7040=>{var _0x4bdfdc=_0x4570be;let _0x56243b=new _0x3a7040(_0x4bdfdc(0x103)+(!this['_inBrowser']&&this[_0x4bdfdc(0x8e)]?_0x4bdfdc(0x116):this[_0x4bdfdc(0x141)])+':'+this['port']);_0x56243b[_0x4bdfdc(0x115)]=()=>{var _0x35c67f=_0x4bdfdc;this[_0x35c67f(0x87)]=!0x1,this[_0x35c67f(0x119)](_0x56243b),this['_attemptToReconnectShortly'](),_0x345281(new Error(_0x35c67f(0x8f)));},_0x56243b['onopen']=()=>{var _0x11ce20=_0x4bdfdc;this[_0x11ce20(0xd9)]||_0x56243b[_0x11ce20(0x92)]&&_0x56243b[_0x11ce20(0x92)]['unref']&&_0x56243b[_0x11ce20(0x92)][_0x11ce20(0xca)](),_0x287a4e(_0x56243b);},_0x56243b[_0x4bdfdc(0x10d)]=()=>{var _0x57a3d1=_0x4bdfdc;this['_allowedToConnectOnSend']=!0x0,this[_0x57a3d1(0x119)](_0x56243b),this[_0x57a3d1(0xdf)]();},_0x56243b[_0x4bdfdc(0xa0)]=_0x5aae17=>{var _0x51f001=_0x4bdfdc;try{_0x5aae17&&_0x5aae17['data']&&this['_inBrowser']&&JSON['parse'](_0x5aae17[_0x51f001(0xa8)])['method']===_0x51f001(0x77)&&this['global'][_0x51f001(0x7d)][_0x51f001(0x77)]();}catch{}};})[_0x4570be(0x6e)](_0x1eea31=>(this[_0x4570be(0x86)]=!0x0,this[_0x4570be(0xf6)]=!0x1,this[_0x4570be(0xb1)]=!0x1,this[_0x4570be(0x87)]=!0x0,this[_0x4570be(0xf4)]=0x0,_0x1eea31))[_0x4570be(0x130)](_0x316441=>(this[_0x4570be(0x86)]=!0x1,this['_connecting']=!0x1,console[_0x4570be(0xa6)](_0x4570be(0x91)+this[_0x4570be(0xd0)]),_0x345281(new Error('failed\\x20to\\x20connect\\x20to\\x20host:\\x20'+(_0x316441&&_0x316441[_0x4570be(0x150)])))));}));}[_0x125cef(0x119)](_0x272f7d){var _0x391483=_0x125cef;this[_0x391483(0x86)]=!0x1,this[_0x391483(0xf6)]=!0x1;try{_0x272f7d['onclose']=null,_0x272f7d[_0x391483(0x115)]=null,_0x272f7d[_0x391483(0xc8)]=null;}catch{}try{_0x272f7d['readyState']<0x2&&_0x272f7d['close']();}catch{}}[_0x125cef(0xdf)](){var _0x30bec1=_0x125cef;clearTimeout(this['_reconnectTimeout']),!(this['_connectAttemptCount']>=this[_0x30bec1(0x14d)])&&(this[_0x30bec1(0xf3)]=setTimeout(()=>{var _0x574df1=_0x30bec1;this['_connected']||this[_0x574df1(0xf6)]||(this[_0x574df1(0x144)](),this[_0x574df1(0x111)]?.['catch'](()=>this['_attemptToReconnectShortly']()));},0x1f4),this['_reconnectTimeout'][_0x30bec1(0xca)]&&this[_0x30bec1(0xf3)][_0x30bec1(0xca)]());}async[_0x125cef(0xe3)](_0x146e0b){var _0x12aa43=_0x125cef;try{if(!this[_0x12aa43(0x87)])return;this[_0x12aa43(0xb1)]&&this[_0x12aa43(0x144)](),(await this[_0x12aa43(0x111)])[_0x12aa43(0xe3)](JSON[_0x12aa43(0xe2)](_0x146e0b));}catch(_0x4578c6){console['warn'](this[_0x12aa43(0x10a)]+':\\x20'+(_0x4578c6&&_0x4578c6[_0x12aa43(0x150)])),this['_allowedToSend']=!0x1,this['_attemptToReconnectShortly']();}}};function X(_0xfdd2ec,_0x11f478,_0x491c8a,_0x159541,_0x34c206,_0x50d147){var _0x90b5dd=_0x125cef;let _0x3e51dd=_0x491c8a[_0x90b5dd(0xdd)](',')['map'](_0x2a20be=>{var _0x3c02d3=_0x90b5dd;try{_0xfdd2ec[_0x3c02d3(0xd1)]||((_0x34c206===_0x3c02d3(0xf9)||_0x34c206===_0x3c02d3(0x9f)||_0x34c206===_0x3c02d3(0x107)||_0x34c206===_0x3c02d3(0x9a))&&(_0x34c206+=!_0xfdd2ec[_0x3c02d3(0x112)]?.[_0x3c02d3(0xc5)]?.[_0x3c02d3(0x11f)]&&_0xfdd2ec[_0x3c02d3(0x112)]?.[_0x3c02d3(0x113)]?.[_0x3c02d3(0x69)]!=='edge'?'\\x20browser':'\\x20server'),_0xfdd2ec[_0x3c02d3(0xd1)]={'id':+new Date(),'tool':_0x34c206});let _0x1307ef=new q(_0xfdd2ec,_0x11f478,_0x2a20be,_0x159541,_0x50d147);return _0x1307ef[_0x3c02d3(0xe3)][_0x3c02d3(0xcf)](_0x1307ef);}catch(_0x9dcf70){return console[_0x3c02d3(0xa6)](_0x3c02d3(0x153),_0x9dcf70&&_0x9dcf70[_0x3c02d3(0x150)]),()=>{};}});return _0x381b1e=>_0x3e51dd[_0x90b5dd(0x12c)](_0x14b34d=>_0x14b34d(_0x381b1e));}function W(_0x5af9c0){var _0x47d535=_0x125cef;let _0x13ee24=function(_0xbe210d,_0x110418){return _0x110418-_0xbe210d;},_0x14a603;if(_0x5af9c0[_0x47d535(0x12f)])_0x14a603=function(){var _0x3eeb01=_0x47d535;return _0x5af9c0[_0x3eeb01(0x12f)]['now']();};else{if(_0x5af9c0[_0x47d535(0x112)]&&_0x5af9c0[_0x47d535(0x112)][_0x47d535(0xaa)]&&_0x5af9c0[_0x47d535(0x112)]?.[_0x47d535(0x113)]?.['NEXT_RUNTIME']!==_0x47d535(0xe8))_0x14a603=function(){var _0x38c34f=_0x47d535;return _0x5af9c0[_0x38c34f(0x112)]['hrtime']();},_0x13ee24=function(_0x23c07f,_0x14c52f){return 0x3e8*(_0x14c52f[0x0]-_0x23c07f[0x0])+(_0x14c52f[0x1]-_0x23c07f[0x1])/0xf4240;};else try{let {performance:_0x1b82df}=require('perf_hooks');_0x14a603=function(){return _0x1b82df['now']();};}catch{_0x14a603=function(){return+new Date();};}}return{'elapsed':_0x13ee24,'timeStamp':_0x14a603,'now':()=>Date[_0x47d535(0x75)]()};}function J(_0x3bc922,_0x508609,_0x2542ce){var _0x167add=_0x125cef;if(_0x3bc922['_consoleNinjaAllowedToStart']!==void 0x0)return _0x3bc922['_consoleNinjaAllowedToStart'];let _0x52d008=_0x3bc922[_0x167add(0x112)]?.[_0x167add(0xc5)]?.[_0x167add(0x11f)]||_0x3bc922['process']?.[_0x167add(0x113)]?.[_0x167add(0x69)]===_0x167add(0xe8);return _0x52d008&&_0x2542ce===_0x167add(0x11a)?_0x3bc922['_consoleNinjaAllowedToStart']=!0x1:_0x3bc922[_0x167add(0x12b)]=_0x52d008||!_0x508609||_0x3bc922[_0x167add(0x7d)]?.['hostname']&&_0x508609['includes'](_0x3bc922[_0x167add(0x7d)]['hostname']),_0x3bc922[_0x167add(0x12b)];}function Y(_0x3c2606,_0x3997e6,_0x8cb16c,_0x471469){var _0x2f92c7=_0x125cef;_0x3c2606=_0x3c2606,_0x3997e6=_0x3997e6,_0x8cb16c=_0x8cb16c,_0x471469=_0x471469;let _0x595bbf=W(_0x3c2606),_0x3e3eab=_0x595bbf['elapsed'],_0x17725e=_0x595bbf['timeStamp'];class _0x17945c{constructor(){var _0x5ae4d5=_0x37ec;this[_0x5ae4d5(0xee)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x5ae4d5(0xb2)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0x5ae4d5(0xe6)]=_0x3c2606[_0x5ae4d5(0xd2)],this[_0x5ae4d5(0xe5)]=_0x3c2606[_0x5ae4d5(0xd3)],this[_0x5ae4d5(0x140)]=Object[_0x5ae4d5(0x13a)],this[_0x5ae4d5(0x96)]=Object[_0x5ae4d5(0x114)],this['_Symbol']=_0x3c2606[_0x5ae4d5(0xa9)],this[_0x5ae4d5(0x8c)]=RegExp[_0x5ae4d5(0x10f)][_0x5ae4d5(0x135)],this[_0x5ae4d5(0x70)]=Date[_0x5ae4d5(0x10f)][_0x5ae4d5(0x135)];}[_0x2f92c7(0xdc)](_0x3a9d8c,_0x31eb1e,_0x430528,_0x548e03){var _0xc51393=_0x2f92c7,_0x726e0f=this,_0x545b3b=_0x430528['autoExpand'];function _0x50258c(_0x5bd120,_0x248de1,_0xd93833){var _0x359cfa=_0x37ec;_0x248de1[_0x359cfa(0x11d)]=_0x359cfa(0xbd),_0x248de1[_0x359cfa(0xb3)]=_0x5bd120[_0x359cfa(0x150)],_0x3fbd8e=_0xd93833[_0x359cfa(0x11f)][_0x359cfa(0x118)],_0xd93833[_0x359cfa(0x11f)][_0x359cfa(0x118)]=_0x248de1,_0x726e0f[_0x359cfa(0x14a)](_0x248de1,_0xd93833);}try{_0x430528[_0xc51393(0xf7)]++,_0x430528['autoExpand']&&_0x430528[_0xc51393(0x9d)][_0xc51393(0x14e)](_0x31eb1e);var _0x561af6,_0x33b8ce,_0x4fac74,_0x154e97,_0x196f6f=[],_0x519fed=[],_0x563c3e,_0x4159cf=this[_0xc51393(0x122)](_0x31eb1e),_0xfb2023=_0x4159cf==='array',_0x4b4d89=!0x1,_0x39d1ff=_0x4159cf===_0xc51393(0xbb),_0x35f149=this[_0xc51393(0x14c)](_0x4159cf),_0x3c8d0d=this[_0xc51393(0x14f)](_0x4159cf),_0x2d8c99=_0x35f149||_0x3c8d0d,_0x6491f0={},_0x570ac6=0x0,_0x369f39=!0x1,_0x3fbd8e,_0x20f38f=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x430528[_0xc51393(0x98)]){if(_0xfb2023){if(_0x33b8ce=_0x31eb1e['length'],_0x33b8ce>_0x430528[_0xc51393(0x8d)]){for(_0x4fac74=0x0,_0x154e97=_0x430528[_0xc51393(0x8d)],_0x561af6=_0x4fac74;_0x561af6<_0x154e97;_0x561af6++)_0x519fed[_0xc51393(0x14e)](_0x726e0f[_0xc51393(0x12d)](_0x196f6f,_0x31eb1e,_0x4159cf,_0x561af6,_0x430528));_0x3a9d8c[_0xc51393(0x105)]=!0x0;}else{for(_0x4fac74=0x0,_0x154e97=_0x33b8ce,_0x561af6=_0x4fac74;_0x561af6<_0x154e97;_0x561af6++)_0x519fed[_0xc51393(0x14e)](_0x726e0f['_addProperty'](_0x196f6f,_0x31eb1e,_0x4159cf,_0x561af6,_0x430528));}_0x430528[_0xc51393(0xfc)]+=_0x519fed[_0xc51393(0x14b)];}if(!(_0x4159cf===_0xc51393(0x149)||_0x4159cf===_0xc51393(0xd2))&&!_0x35f149&&_0x4159cf!==_0xc51393(0x131)&&_0x4159cf!==_0xc51393(0xaf)&&_0x4159cf!==_0xc51393(0x101)){var _0x419e6e=_0x548e03['props']||_0x430528[_0xc51393(0x80)];if(this[_0xc51393(0x82)](_0x31eb1e)?(_0x561af6=0x0,_0x31eb1e[_0xc51393(0x12c)](function(_0x107e3f){var _0x2c8248=_0xc51393;if(_0x570ac6++,_0x430528[_0x2c8248(0xfc)]++,_0x570ac6>_0x419e6e){_0x369f39=!0x0;return;}if(!_0x430528[_0x2c8248(0x102)]&&_0x430528[_0x2c8248(0xb9)]&&_0x430528['autoExpandPropertyCount']>_0x430528[_0x2c8248(0xc7)]){_0x369f39=!0x0;return;}_0x519fed['push'](_0x726e0f[_0x2c8248(0x12d)](_0x196f6f,_0x31eb1e,_0x2c8248(0x11b),_0x561af6++,_0x430528,function(_0x4f7d14){return function(){return _0x4f7d14;};}(_0x107e3f)));})):this[_0xc51393(0x142)](_0x31eb1e)&&_0x31eb1e['forEach'](function(_0x37f2a0,_0x3ba162){var _0x5b6ffc=_0xc51393;if(_0x570ac6++,_0x430528[_0x5b6ffc(0xfc)]++,_0x570ac6>_0x419e6e){_0x369f39=!0x0;return;}if(!_0x430528[_0x5b6ffc(0x102)]&&_0x430528[_0x5b6ffc(0xb9)]&&_0x430528[_0x5b6ffc(0xfc)]>_0x430528[_0x5b6ffc(0xc7)]){_0x369f39=!0x0;return;}var _0x2ded62=_0x3ba162[_0x5b6ffc(0x135)]();_0x2ded62[_0x5b6ffc(0x14b)]>0x64&&(_0x2ded62=_0x2ded62[_0x5b6ffc(0x93)](0x0,0x64)+_0x5b6ffc(0xa1)),_0x519fed[_0x5b6ffc(0x14e)](_0x726e0f[_0x5b6ffc(0x12d)](_0x196f6f,_0x31eb1e,_0x5b6ffc(0x71),_0x2ded62,_0x430528,function(_0x1740fd){return function(){return _0x1740fd;};}(_0x37f2a0)));}),!_0x4b4d89){try{for(_0x563c3e in _0x31eb1e)if(!(_0xfb2023&&_0x20f38f[_0xc51393(0x10c)](_0x563c3e))&&!this[_0xc51393(0x84)](_0x31eb1e,_0x563c3e,_0x430528)){if(_0x570ac6++,_0x430528[_0xc51393(0xfc)]++,_0x570ac6>_0x419e6e){_0x369f39=!0x0;break;}if(!_0x430528[_0xc51393(0x102)]&&_0x430528[_0xc51393(0xb9)]&&_0x430528[_0xc51393(0xfc)]>_0x430528[_0xc51393(0xc7)]){_0x369f39=!0x0;break;}_0x519fed[_0xc51393(0x14e)](_0x726e0f[_0xc51393(0x127)](_0x196f6f,_0x6491f0,_0x31eb1e,_0x4159cf,_0x563c3e,_0x430528));}}catch{}if(_0x6491f0[_0xc51393(0x13d)]=!0x0,_0x39d1ff&&(_0x6491f0[_0xc51393(0x104)]=!0x0),!_0x369f39){var _0x4ab585=[]['concat'](this[_0xc51393(0x96)](_0x31eb1e))['concat'](this[_0xc51393(0xa5)](_0x31eb1e));for(_0x561af6=0x0,_0x33b8ce=_0x4ab585[_0xc51393(0x14b)];_0x561af6<_0x33b8ce;_0x561af6++)if(_0x563c3e=_0x4ab585[_0x561af6],!(_0xfb2023&&_0x20f38f[_0xc51393(0x10c)](_0x563c3e[_0xc51393(0x135)]()))&&!this[_0xc51393(0x84)](_0x31eb1e,_0x563c3e,_0x430528)&&!_0x6491f0['_p_'+_0x563c3e[_0xc51393(0x135)]()]){if(_0x570ac6++,_0x430528[_0xc51393(0xfc)]++,_0x570ac6>_0x419e6e){_0x369f39=!0x0;break;}if(!_0x430528['isExpressionToEvaluate']&&_0x430528['autoExpand']&&_0x430528['autoExpandPropertyCount']>_0x430528[_0xc51393(0xc7)]){_0x369f39=!0x0;break;}_0x519fed['push'](_0x726e0f[_0xc51393(0x127)](_0x196f6f,_0x6491f0,_0x31eb1e,_0x4159cf,_0x563c3e,_0x430528));}}}}}if(_0x3a9d8c[_0xc51393(0x11d)]=_0x4159cf,_0x2d8c99?(_0x3a9d8c[_0xc51393(0xbe)]=_0x31eb1e[_0xc51393(0xcc)](),this[_0xc51393(0x76)](_0x4159cf,_0x3a9d8c,_0x430528,_0x548e03)):_0x4159cf===_0xc51393(0xfd)?_0x3a9d8c[_0xc51393(0xbe)]=this[_0xc51393(0x70)]['call'](_0x31eb1e):_0x4159cf===_0xc51393(0x101)?_0x3a9d8c[_0xc51393(0xbe)]=_0x31eb1e[_0xc51393(0x135)]():_0x4159cf===_0xc51393(0x120)?_0x3a9d8c['value']=this['_regExpToString'][_0xc51393(0x83)](_0x31eb1e):_0x4159cf==='symbol'&&this[_0xc51393(0x6b)]?_0x3a9d8c[_0xc51393(0xbe)]=this[_0xc51393(0x6b)][_0xc51393(0x10f)][_0xc51393(0x135)]['call'](_0x31eb1e):!_0x430528[_0xc51393(0x98)]&&!(_0x4159cf==='null'||_0x4159cf==='undefined')&&(delete _0x3a9d8c[_0xc51393(0xbe)],_0x3a9d8c[_0xc51393(0x106)]=!0x0),_0x369f39&&(_0x3a9d8c[_0xc51393(0xe1)]=!0x0),_0x3fbd8e=_0x430528['node']['current'],_0x430528[_0xc51393(0x11f)]['current']=_0x3a9d8c,this[_0xc51393(0x14a)](_0x3a9d8c,_0x430528),_0x519fed[_0xc51393(0x14b)]){for(_0x561af6=0x0,_0x33b8ce=_0x519fed[_0xc51393(0x14b)];_0x561af6<_0x33b8ce;_0x561af6++)_0x519fed[_0x561af6](_0x561af6);}_0x196f6f['length']&&(_0x3a9d8c['props']=_0x196f6f);}catch(_0x4d57e0){_0x50258c(_0x4d57e0,_0x3a9d8c,_0x430528);}return this[_0xc51393(0xb4)](_0x31eb1e,_0x3a9d8c),this['_treeNodePropertiesAfterFullValue'](_0x3a9d8c,_0x430528),_0x430528['node'][_0xc51393(0x118)]=_0x3fbd8e,_0x430528[_0xc51393(0xf7)]--,_0x430528[_0xc51393(0xb9)]=_0x545b3b,_0x430528[_0xc51393(0xb9)]&&_0x430528[_0xc51393(0x9d)][_0xc51393(0xcd)](),_0x3a9d8c;}[_0x2f92c7(0xa5)](_0x44a6c5){var _0x15b82e=_0x2f92c7;return Object['getOwnPropertySymbols']?Object[_0x15b82e(0x97)](_0x44a6c5):[];}[_0x2f92c7(0x82)](_0xf1f9e9){var _0x53b42a=_0x2f92c7;return!!(_0xf1f9e9&&_0x3c2606[_0x53b42a(0x11b)]&&this[_0x53b42a(0x123)](_0xf1f9e9)===_0x53b42a(0xd5)&&_0xf1f9e9[_0x53b42a(0x12c)]);}[_0x2f92c7(0x84)](_0x58f8d4,_0x5ed6b6,_0x3894ac){var _0x14ddb3=_0x2f92c7;return _0x3894ac[_0x14ddb3(0xd7)]?typeof _0x58f8d4[_0x5ed6b6]=='function':!0x1;}[_0x2f92c7(0x122)](_0x21fe9e){var _0x184768=_0x2f92c7,_0x29cf5c='';return _0x29cf5c=typeof _0x21fe9e,_0x29cf5c===_0x184768(0x146)?this[_0x184768(0x123)](_0x21fe9e)===_0x184768(0xcb)?_0x29cf5c=_0x184768(0x95):this[_0x184768(0x123)](_0x21fe9e)===_0x184768(0xf5)?_0x29cf5c='date':this[_0x184768(0x123)](_0x21fe9e)==='[object\\x20BigInt]'?_0x29cf5c=_0x184768(0x101):_0x21fe9e===null?_0x29cf5c=_0x184768(0x149):_0x21fe9e[_0x184768(0xce)]&&(_0x29cf5c=_0x21fe9e['constructor'][_0x184768(0xe9)]||_0x29cf5c):_0x29cf5c===_0x184768(0xd2)&&this['_HTMLAllCollection']&&_0x21fe9e instanceof this[_0x184768(0xe5)]&&(_0x29cf5c=_0x184768(0xd3)),_0x29cf5c;}[_0x2f92c7(0x123)](_0x256060){var _0x22d15f=_0x2f92c7;return Object[_0x22d15f(0x10f)]['toString'][_0x22d15f(0x83)](_0x256060);}[_0x2f92c7(0x14c)](_0x518492){var _0x5e4ec7=_0x2f92c7;return _0x518492===_0x5e4ec7(0xd4)||_0x518492===_0x5e4ec7(0x129)||_0x518492==='number';}['_isPrimitiveWrapperType'](_0x2914b5){var _0xf58d14=_0x2f92c7;return _0x2914b5==='Boolean'||_0x2914b5===_0xf58d14(0x131)||_0x2914b5==='Number';}[_0x2f92c7(0x12d)](_0x32f712,_0x41f5df,_0x8874d,_0x18c487,_0x110b5d,_0x2a47a2){var _0x56f131=this;return function(_0x36ba93){var _0x4528b9=_0x37ec,_0x5200c9=_0x110b5d[_0x4528b9(0x11f)]['current'],_0x1b58ab=_0x110b5d['node']['index'],_0x195ed8=_0x110b5d[_0x4528b9(0x11f)][_0x4528b9(0xef)];_0x110b5d[_0x4528b9(0x11f)][_0x4528b9(0xef)]=_0x5200c9,_0x110b5d['node'][_0x4528b9(0x8a)]=typeof _0x18c487==_0x4528b9(0x78)?_0x18c487:_0x36ba93,_0x32f712[_0x4528b9(0x14e)](_0x56f131[_0x4528b9(0x108)](_0x41f5df,_0x8874d,_0x18c487,_0x110b5d,_0x2a47a2)),_0x110b5d[_0x4528b9(0x11f)]['parent']=_0x195ed8,_0x110b5d[_0x4528b9(0x11f)][_0x4528b9(0x8a)]=_0x1b58ab;};}['_addObjectProperty'](_0x3648a8,_0x4fe39f,_0x35ddb3,_0x242e18,_0x21ec3d,_0x5e64fd,_0x3c0fb9){var _0x475bb0=_0x2f92c7,_0x23639f=this;return _0x4fe39f[_0x475bb0(0x90)+_0x21ec3d[_0x475bb0(0x135)]()]=!0x0,function(_0x5d9643){var _0x25c4bf=_0x475bb0,_0x5f50e4=_0x5e64fd['node']['current'],_0x4d6eb0=_0x5e64fd[_0x25c4bf(0x11f)]['index'],_0x15a371=_0x5e64fd['node'][_0x25c4bf(0xef)];_0x5e64fd['node'][_0x25c4bf(0xef)]=_0x5f50e4,_0x5e64fd['node'][_0x25c4bf(0x8a)]=_0x5d9643,_0x3648a8[_0x25c4bf(0x14e)](_0x23639f[_0x25c4bf(0x108)](_0x35ddb3,_0x242e18,_0x21ec3d,_0x5e64fd,_0x3c0fb9)),_0x5e64fd[_0x25c4bf(0x11f)][_0x25c4bf(0xef)]=_0x15a371,_0x5e64fd['node'][_0x25c4bf(0x8a)]=_0x4d6eb0;};}[_0x2f92c7(0x108)](_0x2fc716,_0x3827fa,_0x8dd404,_0x43c133,_0x4822cd){var _0x1f540a=_0x2f92c7,_0x1ccb8f=this;_0x4822cd||(_0x4822cd=function(_0x2a25f8,_0x2b24cd){return _0x2a25f8[_0x2b24cd];});var _0x4b19dd=_0x8dd404[_0x1f540a(0x135)](),_0x4f42da=_0x43c133['expressionsToEvaluate']||{},_0x40263c=_0x43c133[_0x1f540a(0x98)],_0x151d97=_0x43c133[_0x1f540a(0x102)];try{var _0x53f93a=this[_0x1f540a(0x142)](_0x2fc716),_0x36b7d2=_0x4b19dd;_0x53f93a&&_0x36b7d2[0x0]==='\\x27'&&(_0x36b7d2=_0x36b7d2[_0x1f540a(0x148)](0x1,_0x36b7d2[_0x1f540a(0x14b)]-0x2));var _0x2305c6=_0x43c133[_0x1f540a(0x156)]=_0x4f42da[_0x1f540a(0x90)+_0x36b7d2];_0x2305c6&&(_0x43c133[_0x1f540a(0x98)]=_0x43c133[_0x1f540a(0x98)]+0x1),_0x43c133[_0x1f540a(0x102)]=!!_0x2305c6;var _0x49da71=typeof _0x8dd404==_0x1f540a(0xc4),_0xf550a7={'name':_0x49da71||_0x53f93a?_0x4b19dd:this[_0x1f540a(0x6c)](_0x4b19dd)};if(_0x49da71&&(_0xf550a7[_0x1f540a(0xc4)]=!0x0),!(_0x3827fa===_0x1f540a(0x95)||_0x3827fa===_0x1f540a(0x139))){var _0x29fbe4=this[_0x1f540a(0x140)](_0x2fc716,_0x8dd404);if(_0x29fbe4&&(_0x29fbe4['set']&&(_0xf550a7[_0x1f540a(0xf0)]=!0x0),_0x29fbe4[_0x1f540a(0x133)]&&!_0x2305c6&&!_0x43c133[_0x1f540a(0x154)]))return _0xf550a7[_0x1f540a(0xae)]=!0x0,this[_0x1f540a(0x81)](_0xf550a7,_0x43c133),_0xf550a7;}var _0x1c68c2;try{_0x1c68c2=_0x4822cd(_0x2fc716,_0x8dd404);}catch(_0x2ae09d){return _0xf550a7={'name':_0x4b19dd,'type':_0x1f540a(0xbd),'error':_0x2ae09d[_0x1f540a(0x150)]},this[_0x1f540a(0x81)](_0xf550a7,_0x43c133),_0xf550a7;}var _0x3b1098=this[_0x1f540a(0x122)](_0x1c68c2),_0x140982=this[_0x1f540a(0x14c)](_0x3b1098);if(_0xf550a7[_0x1f540a(0x11d)]=_0x3b1098,_0x140982)this[_0x1f540a(0x81)](_0xf550a7,_0x43c133,_0x1c68c2,function(){var _0x3b6179=_0x1f540a;_0xf550a7['value']=_0x1c68c2[_0x3b6179(0xcc)](),!_0x2305c6&&_0x1ccb8f[_0x3b6179(0x76)](_0x3b1098,_0xf550a7,_0x43c133,{});});else{var _0x3b1ae8=_0x43c133[_0x1f540a(0xb9)]&&_0x43c133['level']<_0x43c133[_0x1f540a(0x134)]&&_0x43c133['autoExpandPreviousObjects'][_0x1f540a(0x13f)](_0x1c68c2)<0x0&&_0x3b1098!=='function'&&_0x43c133['autoExpandPropertyCount']<_0x43c133[_0x1f540a(0xc7)];_0x3b1ae8||_0x43c133[_0x1f540a(0xf7)]<_0x40263c||_0x2305c6?(this[_0x1f540a(0xdc)](_0xf550a7,_0x1c68c2,_0x43c133,_0x2305c6||{}),this[_0x1f540a(0xb4)](_0x1c68c2,_0xf550a7)):this[_0x1f540a(0x81)](_0xf550a7,_0x43c133,_0x1c68c2,function(){var _0x27269f=_0x1f540a;_0x3b1098==='null'||_0x3b1098===_0x27269f(0xd2)||(delete _0xf550a7[_0x27269f(0xbe)],_0xf550a7[_0x27269f(0x106)]=!0x0);});}return _0xf550a7;}finally{_0x43c133[_0x1f540a(0x156)]=_0x4f42da,_0x43c133[_0x1f540a(0x98)]=_0x40263c,_0x43c133[_0x1f540a(0x102)]=_0x151d97;}}['_capIfString'](_0x2b97e9,_0x4f2e4e,_0x40a0ac,_0x8ec7a9){var _0x347524=_0x2f92c7,_0x471652=_0x8ec7a9[_0x347524(0x145)]||_0x40a0ac[_0x347524(0x145)];if((_0x2b97e9==='string'||_0x2b97e9===_0x347524(0x131))&&_0x4f2e4e['value']){let _0x315b88=_0x4f2e4e[_0x347524(0xbe)]['length'];_0x40a0ac[_0x347524(0xc0)]+=_0x315b88,_0x40a0ac[_0x347524(0xc0)]>_0x40a0ac[_0x347524(0xde)]?(_0x4f2e4e[_0x347524(0x106)]='',delete _0x4f2e4e[_0x347524(0xbe)]):_0x315b88>_0x471652&&(_0x4f2e4e['capped']=_0x4f2e4e[_0x347524(0xbe)][_0x347524(0x148)](0x0,_0x471652),delete _0x4f2e4e['value']);}}['_isMap'](_0x584613){var _0x26ace0=_0x2f92c7;return!!(_0x584613&&_0x3c2606[_0x26ace0(0x71)]&&this[_0x26ace0(0x123)](_0x584613)===_0x26ace0(0x13c)&&_0x584613[_0x26ace0(0x12c)]);}[_0x2f92c7(0x6c)](_0x4a0482){var _0x6ab27e=_0x2f92c7;if(_0x4a0482['match'](/^\\d+$/))return _0x4a0482;var _0x456e20;try{_0x456e20=JSON[_0x6ab27e(0xe2)](''+_0x4a0482);}catch{_0x456e20='\\x22'+this[_0x6ab27e(0x123)](_0x4a0482)+'\\x22';}return _0x456e20[_0x6ab27e(0xbc)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x456e20=_0x456e20[_0x6ab27e(0x148)](0x1,_0x456e20[_0x6ab27e(0x14b)]-0x2):_0x456e20=_0x456e20[_0x6ab27e(0x121)](/'/g,'\\x5c\\x27')[_0x6ab27e(0x121)](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x456e20;}[_0x2f92c7(0x81)](_0xa324a8,_0x1099b6,_0x43debf,_0x4759e4){var _0x16c0b1=_0x2f92c7;this[_0x16c0b1(0x14a)](_0xa324a8,_0x1099b6),_0x4759e4&&_0x4759e4(),this[_0x16c0b1(0xb4)](_0x43debf,_0xa324a8),this[_0x16c0b1(0x117)](_0xa324a8,_0x1099b6);}[_0x2f92c7(0x14a)](_0xa46c22,_0x4752fc){var _0x43ee93=_0x2f92c7;this[_0x43ee93(0x72)](_0xa46c22,_0x4752fc),this['_setNodeQueryPath'](_0xa46c22,_0x4752fc),this[_0x43ee93(0x138)](_0xa46c22,_0x4752fc),this[_0x43ee93(0x132)](_0xa46c22,_0x4752fc);}[_0x2f92c7(0x72)](_0x3a442b,_0x11cb15){}['_setNodeQueryPath'](_0x294d14,_0x14a801){}[_0x2f92c7(0x128)](_0x48ce00,_0x49f8a7){}[_0x2f92c7(0xb6)](_0x4837a9){var _0x1efcd4=_0x2f92c7;return _0x4837a9===this[_0x1efcd4(0xe6)];}['_treeNodePropertiesAfterFullValue'](_0x161bbb,_0x2c32b3){var _0x545e2b=_0x2f92c7;this['_setNodeLabel'](_0x161bbb,_0x2c32b3),this[_0x545e2b(0xa2)](_0x161bbb),_0x2c32b3[_0x545e2b(0xf8)]&&this[_0x545e2b(0x94)](_0x161bbb),this[_0x545e2b(0xfb)](_0x161bbb,_0x2c32b3),this[_0x545e2b(0xa3)](_0x161bbb,_0x2c32b3),this['_cleanNode'](_0x161bbb);}[_0x2f92c7(0xb4)](_0x296802,_0x477724){var _0x4d390c=_0x2f92c7;let _0x36867a;try{_0x3c2606[_0x4d390c(0x7f)]&&(_0x36867a=_0x3c2606[_0x4d390c(0x7f)]['error'],_0x3c2606[_0x4d390c(0x7f)]['error']=function(){}),_0x296802&&typeof _0x296802[_0x4d390c(0x14b)]==_0x4d390c(0x78)&&(_0x477724[_0x4d390c(0x14b)]=_0x296802[_0x4d390c(0x14b)]);}catch{}finally{_0x36867a&&(_0x3c2606[_0x4d390c(0x7f)][_0x4d390c(0xb3)]=_0x36867a);}if(_0x477724[_0x4d390c(0x11d)]==='number'||_0x477724[_0x4d390c(0x11d)]===_0x4d390c(0xf2)){if(isNaN(_0x477724[_0x4d390c(0xbe)]))_0x477724[_0x4d390c(0xba)]=!0x0,delete _0x477724['value'];else switch(_0x477724[_0x4d390c(0xbe)]){case Number[_0x4d390c(0xdb)]:_0x477724[_0x4d390c(0x152)]=!0x0,delete _0x477724[_0x4d390c(0xbe)];break;case Number[_0x4d390c(0xe4)]:_0x477724[_0x4d390c(0x12e)]=!0x0,delete _0x477724['value'];break;case 0x0:this['_isNegativeZero'](_0x477724['value'])&&(_0x477724[_0x4d390c(0x6f)]=!0x0);break;}}else _0x477724['type']===_0x4d390c(0xbb)&&typeof _0x296802[_0x4d390c(0xe9)]==_0x4d390c(0x129)&&_0x296802[_0x4d390c(0xe9)]&&_0x477724[_0x4d390c(0xe9)]&&_0x296802[_0x4d390c(0xe9)]!==_0x477724[_0x4d390c(0xe9)]&&(_0x477724[_0x4d390c(0x88)]=_0x296802[_0x4d390c(0xe9)]);}['_isNegativeZero'](_0x2162a2){return 0x1/_0x2162a2===Number['NEGATIVE_INFINITY'];}[_0x2f92c7(0x94)](_0xb909d0){var _0x34c441=_0x2f92c7;!_0xb909d0[_0x34c441(0x80)]||!_0xb909d0[_0x34c441(0x80)][_0x34c441(0x14b)]||_0xb909d0[_0x34c441(0x11d)]===_0x34c441(0x95)||_0xb909d0[_0x34c441(0x11d)]===_0x34c441(0x71)||_0xb909d0[_0x34c441(0x11d)]==='Set'||_0xb909d0['props']['sort'](function(_0xe6a6a5,_0x422706){var _0x5c0790=_0x34c441,_0x2a27fa=_0xe6a6a5[_0x5c0790(0xe9)][_0x5c0790(0x89)](),_0x5c88bc=_0x422706['name'][_0x5c0790(0x89)]();return _0x2a27fa<_0x5c88bc?-0x1:_0x2a27fa>_0x5c88bc?0x1:0x0;});}[_0x2f92c7(0xfb)](_0x5b5ae4,_0xbcfc22){var _0x2c8b1b=_0x2f92c7;if(!(_0xbcfc22[_0x2c8b1b(0xd7)]||!_0x5b5ae4[_0x2c8b1b(0x80)]||!_0x5b5ae4[_0x2c8b1b(0x80)][_0x2c8b1b(0x14b)])){for(var _0x4c5b9f=[],_0x1e8598=[],_0x287b17=0x0,_0x4691da=_0x5b5ae4['props'][_0x2c8b1b(0x14b)];_0x287b17<_0x4691da;_0x287b17++){var _0x39ea01=_0x5b5ae4[_0x2c8b1b(0x80)][_0x287b17];_0x39ea01[_0x2c8b1b(0x11d)]===_0x2c8b1b(0xbb)?_0x4c5b9f[_0x2c8b1b(0x14e)](_0x39ea01):_0x1e8598['push'](_0x39ea01);}if(!(!_0x1e8598['length']||_0x4c5b9f[_0x2c8b1b(0x14b)]<=0x1)){_0x5b5ae4[_0x2c8b1b(0x80)]=_0x1e8598;var _0x156dc4={'functionsNode':!0x0,'props':_0x4c5b9f};this[_0x2c8b1b(0x72)](_0x156dc4,_0xbcfc22),this['_setNodeLabel'](_0x156dc4,_0xbcfc22),this[_0x2c8b1b(0xa2)](_0x156dc4),this[_0x2c8b1b(0x132)](_0x156dc4,_0xbcfc22),_0x156dc4['id']+='\\x20f',_0x5b5ae4[_0x2c8b1b(0x80)][_0x2c8b1b(0x11c)](_0x156dc4);}}}[_0x2f92c7(0xa3)](_0x432a2f,_0x1085da){}['_setNodeExpandableState'](_0x3ecd17){}[_0x2f92c7(0x85)](_0x3ace93){var _0x590203=_0x2f92c7;return Array[_0x590203(0x73)](_0x3ace93)||typeof _0x3ace93==_0x590203(0x146)&&this[_0x590203(0x123)](_0x3ace93)===_0x590203(0xcb);}['_setNodePermissions'](_0x3dc295,_0x11fea3){}['_cleanNode'](_0x2e29af){var _0x2500c8=_0x2f92c7;delete _0x2e29af[_0x2500c8(0xbf)],delete _0x2e29af[_0x2500c8(0x109)],delete _0x2e29af[_0x2500c8(0xac)];}['_setNodeExpressionPath'](_0x5692f8,_0x5a882d){}}let _0x245e5c=new _0x17945c(),_0x29d18c={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0xe67755={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x16869a(_0x4a916c,_0x2af6f6,_0x56a4a0,_0x564a08,_0x580e89,_0x10ce5e){var _0x33443c=_0x2f92c7;let _0x55f448,_0x5290d5;try{_0x5290d5=_0x17725e(),_0x55f448=_0x8cb16c[_0x2af6f6],!_0x55f448||_0x5290d5-_0x55f448['ts']>0x1f4&&_0x55f448[_0x33443c(0x7c)]&&_0x55f448['time']/_0x55f448[_0x33443c(0x7c)]<0x64?(_0x8cb16c[_0x2af6f6]=_0x55f448={'count':0x0,'time':0x0,'ts':_0x5290d5},_0x8cb16c[_0x33443c(0x7b)]={}):_0x5290d5-_0x8cb16c[_0x33443c(0x7b)]['ts']>0x32&&_0x8cb16c[_0x33443c(0x7b)]['count']&&_0x8cb16c[_0x33443c(0x7b)]['time']/_0x8cb16c[_0x33443c(0x7b)]['count']<0x64&&(_0x8cb16c[_0x33443c(0x7b)]={});let _0x465d3a=[],_0x29b846=_0x55f448[_0x33443c(0x6d)]||_0x8cb16c[_0x33443c(0x7b)][_0x33443c(0x6d)]?_0xe67755:_0x29d18c,_0x1efc86=_0x47aa0f=>{var _0x12cf5d=_0x33443c;let _0x580c7e={};return _0x580c7e['props']=_0x47aa0f[_0x12cf5d(0x80)],_0x580c7e[_0x12cf5d(0x8d)]=_0x47aa0f[_0x12cf5d(0x8d)],_0x580c7e[_0x12cf5d(0x145)]=_0x47aa0f[_0x12cf5d(0x145)],_0x580c7e[_0x12cf5d(0xde)]=_0x47aa0f[_0x12cf5d(0xde)],_0x580c7e[_0x12cf5d(0xc7)]=_0x47aa0f[_0x12cf5d(0xc7)],_0x580c7e['autoExpandMaxDepth']=_0x47aa0f[_0x12cf5d(0x134)],_0x580c7e[_0x12cf5d(0xf8)]=!0x1,_0x580c7e[_0x12cf5d(0xd7)]=!_0x3997e6,_0x580c7e[_0x12cf5d(0x98)]=0x1,_0x580c7e['level']=0x0,_0x580c7e['expId']=_0x12cf5d(0x10e),_0x580c7e['rootExpression']=_0x12cf5d(0x9b),_0x580c7e['autoExpand']=!0x0,_0x580c7e[_0x12cf5d(0x9d)]=[],_0x580c7e['autoExpandPropertyCount']=0x0,_0x580c7e['resolveGetters']=!0x0,_0x580c7e[_0x12cf5d(0xc0)]=0x0,_0x580c7e[_0x12cf5d(0x11f)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x580c7e;};for(var _0x5be3ad=0x0;_0x5be3ad<_0x580e89[_0x33443c(0x14b)];_0x5be3ad++)_0x465d3a[_0x33443c(0x14e)](_0x245e5c['serialize']({'timeNode':_0x4a916c===_0x33443c(0xed)||void 0x0},_0x580e89[_0x5be3ad],_0x1efc86(_0x29b846),{}));if(_0x4a916c==='trace'){let _0x319deb=Error[_0x33443c(0x12a)];try{Error[_0x33443c(0x12a)]=0x1/0x0,_0x465d3a[_0x33443c(0x14e)](_0x245e5c[_0x33443c(0xdc)]({'stackNode':!0x0},new Error()[_0x33443c(0x124)],_0x1efc86(_0x29b846),{'strLength':0x1/0x0}));}finally{Error['stackTraceLimit']=_0x319deb;}}return{'method':_0x33443c(0x11e),'version':_0x471469,'args':[{'ts':_0x56a4a0,'session':_0x564a08,'args':_0x465d3a,'id':_0x2af6f6,'context':_0x10ce5e}]};}catch(_0x96564d){return{'method':_0x33443c(0x11e),'version':_0x471469,'args':[{'ts':_0x56a4a0,'session':_0x564a08,'args':[{'type':_0x33443c(0xbd),'error':_0x96564d&&_0x96564d['message']}],'id':_0x2af6f6,'context':_0x10ce5e}]};}finally{try{if(_0x55f448&&_0x5290d5){let _0x2533ba=_0x17725e();_0x55f448['count']++,_0x55f448[_0x33443c(0xed)]+=_0x3e3eab(_0x5290d5,_0x2533ba),_0x55f448['ts']=_0x2533ba,_0x8cb16c['hits']['count']++,_0x8cb16c['hits'][_0x33443c(0xed)]+=_0x3e3eab(_0x5290d5,_0x2533ba),_0x8cb16c[_0x33443c(0x7b)]['ts']=_0x2533ba,(_0x55f448[_0x33443c(0x7c)]>0x32||_0x55f448[_0x33443c(0xed)]>0x64)&&(_0x55f448['reduceLimits']=!0x0),(_0x8cb16c[_0x33443c(0x7b)][_0x33443c(0x7c)]>0x3e8||_0x8cb16c[_0x33443c(0x7b)][_0x33443c(0xed)]>0x12c)&&(_0x8cb16c['hits']['reduceLimits']=!0x0);}}catch{}}}return _0x16869a;}((_0x2ec62d,_0x190513,_0x48d872,_0xed62cc,_0x1ed0ab,_0x1466da,_0x4fa494,_0x4de063,_0x276b24,_0x56f9a5)=>{var _0x56ce66=_0x125cef;if(_0x2ec62d[_0x56ce66(0xea)])return _0x2ec62d[_0x56ce66(0xea)];if(!J(_0x2ec62d,_0x4de063,_0x1ed0ab))return _0x2ec62d['_console_ninja']={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x2ec62d[_0x56ce66(0xea)];let _0x2dc759=W(_0x2ec62d),_0x4f733a=_0x2dc759[_0x56ce66(0x13e)],_0x29e1f4=_0x2dc759[_0x56ce66(0x74)],_0x2ac978=_0x2dc759[_0x56ce66(0x75)],_0x4983da={'hits':{},'ts':{}},_0x2a0004=Y(_0x2ec62d,_0x276b24,_0x4983da,_0x1466da),_0x20a5b9=_0x3b1c72=>{_0x4983da['ts'][_0x3b1c72]=_0x29e1f4();},_0xa8a1c2=(_0x256a71,_0x3623a5)=>{var _0x42fc20=_0x56ce66;let _0x19d10b=_0x4983da['ts'][_0x3623a5];if(delete _0x4983da['ts'][_0x3623a5],_0x19d10b){let _0xabf274=_0x4f733a(_0x19d10b,_0x29e1f4());_0x28fb2e(_0x2a0004(_0x42fc20(0xed),_0x256a71,_0x2ac978(),_0x475214,[_0xabf274],_0x3623a5));}},_0xe086ae=_0x1bb3b9=>_0x29b6dc=>{var _0x53541c=_0x56ce66;try{_0x20a5b9(_0x29b6dc),_0x1bb3b9(_0x29b6dc);}finally{_0x2ec62d[_0x53541c(0x7f)]['time']=_0x1bb3b9;}},_0x5ea34f=_0x4e2472=>_0x5a7f52=>{var _0x538079=_0x56ce66;try{let [_0x41f708,_0x47a2c9]=_0x5a7f52[_0x538079(0xdd)](_0x538079(0xf1));_0xa8a1c2(_0x47a2c9,_0x41f708),_0x4e2472(_0x41f708);}finally{_0x2ec62d[_0x538079(0x7f)][_0x538079(0xd6)]=_0x4e2472;}},_0x279342=_0x1f5a6c=>(_0x1ed0ab===_0x56ce66(0xf9)&&_0x2ec62d[_0x56ce66(0x10b)]&&_0x1f5a6c?.[_0x56ce66(0xb7)]?.['length']&&(_0x1f5a6c[_0x56ce66(0xb7)][0x0][_0x56ce66(0x10b)]=_0x2ec62d[_0x56ce66(0x10b)]),_0x1f5a6c);_0x2ec62d[_0x56ce66(0xea)]={'consoleLog':(_0x35f43e,_0x40a0c0)=>{var _0x5222f7=_0x56ce66;_0x2ec62d[_0x5222f7(0x7f)][_0x5222f7(0x11e)][_0x5222f7(0xe9)]!==_0x5222f7(0xad)&&_0x28fb2e(_0x2a0004(_0x5222f7(0x11e),_0x35f43e,_0x2ac978(),_0x475214,_0x40a0c0));},'consoleTrace':(_0x2e073b,_0x41d626)=>{var _0x26903a=_0x56ce66;_0x2ec62d['console']['log'][_0x26903a(0xe9)]!==_0x26903a(0x8b)&&_0x28fb2e(_0x279342(_0x2a0004(_0x26903a(0xd8),_0x2e073b,_0x2ac978(),_0x475214,_0x41d626)));},'consoleTime':_0x4e5104=>{_0x20a5b9(_0x4e5104);},'consoleTimeEnd':(_0x38a3d1,_0x16f96f)=>{_0xa8a1c2(_0x16f96f,_0x38a3d1);},'autoLog':(_0x4af100,_0x201431)=>{var _0x97d965=_0x56ce66;_0x28fb2e(_0x2a0004(_0x97d965(0x11e),_0x201431,_0x2ac978(),_0x475214,[_0x4af100]));},'autoLogMany':(_0x2e7d38,_0x52d51a)=>{var _0x1fc92c=_0x56ce66;_0x28fb2e(_0x2a0004(_0x1fc92c(0x11e),_0x2e7d38,_0x2ac978(),_0x475214,_0x52d51a));},'autoTrace':(_0x311ff9,_0x39a565)=>{var _0x29a458=_0x56ce66;_0x28fb2e(_0x279342(_0x2a0004(_0x29a458(0xd8),_0x39a565,_0x2ac978(),_0x475214,[_0x311ff9])));},'autoTraceMany':(_0x52e317,_0x490000)=>{var _0x14837f=_0x56ce66;_0x28fb2e(_0x279342(_0x2a0004(_0x14837f(0xd8),_0x52e317,_0x2ac978(),_0x475214,_0x490000)));},'autoTime':(_0x4ac686,_0x386535,_0x165f00)=>{_0x20a5b9(_0x165f00);},'autoTimeEnd':(_0x4785b5,_0x4ea0a8,_0x480a7b)=>{_0xa8a1c2(_0x4ea0a8,_0x480a7b);},'coverage':_0x47cbc7=>{var _0x34e7fe=_0x56ce66;_0x28fb2e({'method':_0x34e7fe(0x151),'version':_0x1466da,'args':[{'id':_0x47cbc7}]});}};let _0x28fb2e=X(_0x2ec62d,_0x190513,_0x48d872,_0xed62cc,_0x1ed0ab,_0x56f9a5),_0x475214=_0x2ec62d['_console_ninja_session'];return _0x2ec62d[_0x56ce66(0xea)];})(globalThis,_0x125cef(0x155),_0x125cef(0xda),\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.305\\\\node_modules\",_0x125cef(0x147),_0x125cef(0x126),_0x125cef(0x137),[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],_0x125cef(0x79),'');");
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