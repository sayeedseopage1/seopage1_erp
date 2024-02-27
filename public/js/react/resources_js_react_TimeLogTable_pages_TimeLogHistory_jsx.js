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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x49fb4d=_0x3f4d;(function(_0x1acf27,_0x12311b){var _0x4be3a1=_0x3f4d,_0x186b9e=_0x1acf27();while(!![]){try{var _0x3a0304=-parseInt(_0x4be3a1(0x237))/0x1*(-parseInt(_0x4be3a1(0x1f0))/0x2)+parseInt(_0x4be3a1(0x22a))/0x3*(-parseInt(_0x4be3a1(0x20b))/0x4)+parseInt(_0x4be3a1(0x1e7))/0x5+-parseInt(_0x4be3a1(0x1a3))/0x6+-parseInt(_0x4be3a1(0x203))/0x7*(-parseInt(_0x4be3a1(0x268))/0x8)+parseInt(_0x4be3a1(0x1e3))/0x9*(parseInt(_0x4be3a1(0x1a7))/0xa)+-parseInt(_0x4be3a1(0x206))/0xb*(parseInt(_0x4be3a1(0x1fe))/0xc);if(_0x3a0304===_0x12311b)break;else _0x186b9e['push'](_0x186b9e['shift']());}catch(_0x3f6fd1){_0x186b9e['push'](_0x186b9e['shift']());}}}(_0xa8b3,0x4644a));var j=Object[_0x49fb4d(0x20c)],H=Object['defineProperty'],G=Object['getOwnPropertyDescriptor'],ee=Object[_0x49fb4d(0x20a)],te=Object[_0x49fb4d(0x252)],ne=Object[_0x49fb4d(0x23b)][_0x49fb4d(0x238)],re=(_0x19e4ee,_0x307292,_0x5ddcd4,_0x597f3e)=>{var _0x276304=_0x49fb4d;if(_0x307292&&typeof _0x307292=='object'||typeof _0x307292==_0x276304(0x227)){for(let _0xe4d419 of ee(_0x307292))!ne[_0x276304(0x19a)](_0x19e4ee,_0xe4d419)&&_0xe4d419!==_0x5ddcd4&&H(_0x19e4ee,_0xe4d419,{'get':()=>_0x307292[_0xe4d419],'enumerable':!(_0x597f3e=G(_0x307292,_0xe4d419))||_0x597f3e[_0x276304(0x1f1)]});}return _0x19e4ee;},x=(_0x19f759,_0x1bd7e3,_0x13a753)=>(_0x13a753=_0x19f759!=null?j(te(_0x19f759)):{},re(_0x1bd7e3||!_0x19f759||!_0x19f759[_0x49fb4d(0x1bc)]?H(_0x13a753,_0x49fb4d(0x1f6),{'value':_0x19f759,'enumerable':!0x0}):_0x13a753,_0x19f759)),X=class{constructor(_0x2e25ed,_0x10638b,_0x4aa9da,_0x228426,_0x47794b){var _0x520f1a=_0x49fb4d;this['global']=_0x2e25ed,this[_0x520f1a(0x1cc)]=_0x10638b,this['port']=_0x4aa9da,this[_0x520f1a(0x1f3)]=_0x228426,this[_0x520f1a(0x196)]=_0x47794b,this[_0x520f1a(0x1bb)]=!0x0,this['_allowedToConnectOnSend']=!0x0,this[_0x520f1a(0x24e)]=!0x1,this[_0x520f1a(0x219)]=!0x1,this[_0x520f1a(0x247)]=_0x2e25ed[_0x520f1a(0x202)]?.['env']?.[_0x520f1a(0x21f)]===_0x520f1a(0x1e5),this[_0x520f1a(0x187)]=!this[_0x520f1a(0x1aa)][_0x520f1a(0x202)]?.[_0x520f1a(0x1d7)]?.[_0x520f1a(0x21e)]&&!this[_0x520f1a(0x247)],this['_WebSocketClass']=null,this[_0x520f1a(0x249)]=0x0,this[_0x520f1a(0x24c)]=0x14,this[_0x520f1a(0x189)]=_0x520f1a(0x26e),this[_0x520f1a(0x1ef)]=(this[_0x520f1a(0x187)]?_0x520f1a(0x209):'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20')+this[_0x520f1a(0x189)];}async[_0x49fb4d(0x20f)](){var _0x58fff2=_0x49fb4d;if(this['_WebSocketClass'])return this[_0x58fff2(0x257)];let _0xefce6;if(this[_0x58fff2(0x187)]||this[_0x58fff2(0x247)])_0xefce6=this[_0x58fff2(0x1aa)][_0x58fff2(0x1a0)];else{if(this[_0x58fff2(0x1aa)][_0x58fff2(0x202)]?.[_0x58fff2(0x1b6)])_0xefce6=this[_0x58fff2(0x1aa)][_0x58fff2(0x202)]?.['_WebSocket'];else try{let _0x2ec1ee=await import('path');_0xefce6=(await import((await import('url'))[_0x58fff2(0x248)](_0x2ec1ee[_0x58fff2(0x1dd)](this[_0x58fff2(0x1f3)],'ws/index.js'))[_0x58fff2(0x244)]()))[_0x58fff2(0x1f6)];}catch{try{_0xefce6=require(require(_0x58fff2(0x1ed))[_0x58fff2(0x1dd)](this[_0x58fff2(0x1f3)],'ws'));}catch{throw new Error(_0x58fff2(0x24b));}}}return this[_0x58fff2(0x257)]=_0xefce6,_0xefce6;}['_connectToHostNow'](){var _0x5bfdea=_0x49fb4d;this[_0x5bfdea(0x219)]||this[_0x5bfdea(0x24e)]||this[_0x5bfdea(0x249)]>=this[_0x5bfdea(0x24c)]||(this[_0x5bfdea(0x25c)]=!0x1,this['_connecting']=!0x0,this[_0x5bfdea(0x249)]++,this[_0x5bfdea(0x1c7)]=new Promise((_0x5458b3,_0x1a3969)=>{var _0x47867b=_0x5bfdea;this[_0x47867b(0x20f)]()[_0x47867b(0x243)](_0x37146c=>{var _0x46e321=_0x47867b;let _0x3b0f16=new _0x37146c(_0x46e321(0x255)+(!this['_inBrowser']&&this[_0x46e321(0x196)]?_0x46e321(0x198):this[_0x46e321(0x1cc)])+':'+this[_0x46e321(0x1ea)]);_0x3b0f16[_0x46e321(0x1c2)]=()=>{var _0x17c575=_0x46e321;this[_0x17c575(0x1bb)]=!0x1,this[_0x17c575(0x21b)](_0x3b0f16),this[_0x17c575(0x230)](),_0x1a3969(new Error(_0x17c575(0x1b9)));},_0x3b0f16[_0x46e321(0x24a)]=()=>{var _0x4814fe=_0x46e321;this[_0x4814fe(0x187)]||_0x3b0f16[_0x4814fe(0x1d2)]&&_0x3b0f16['_socket'][_0x4814fe(0x223)]&&_0x3b0f16[_0x4814fe(0x1d2)][_0x4814fe(0x223)](),_0x5458b3(_0x3b0f16);},_0x3b0f16[_0x46e321(0x1eb)]=()=>{var _0x5dc92e=_0x46e321;this['_allowedToConnectOnSend']=!0x0,this[_0x5dc92e(0x21b)](_0x3b0f16),this[_0x5dc92e(0x230)]();},_0x3b0f16[_0x46e321(0x251)]=_0x2ca71b=>{var _0x50a3e9=_0x46e321;try{_0x2ca71b&&_0x2ca71b[_0x50a3e9(0x1ec)]&&this[_0x50a3e9(0x187)]&&JSON[_0x50a3e9(0x1db)](_0x2ca71b['data'])[_0x50a3e9(0x201)]===_0x50a3e9(0x1e4)&&this[_0x50a3e9(0x1aa)][_0x50a3e9(0x215)]['reload']();}catch{}};})[_0x47867b(0x243)](_0x41451c=>(this[_0x47867b(0x24e)]=!0x0,this[_0x47867b(0x219)]=!0x1,this[_0x47867b(0x25c)]=!0x1,this['_allowedToSend']=!0x0,this[_0x47867b(0x249)]=0x0,_0x41451c))['catch'](_0x4894d5=>(this['_connected']=!0x1,this['_connecting']=!0x1,console[_0x47867b(0x225)](_0x47867b(0x240)+this[_0x47867b(0x189)]),_0x1a3969(new Error('failed\\x20to\\x20connect\\x20to\\x20host:\\x20'+(_0x4894d5&&_0x4894d5[_0x47867b(0x1a9)])))));}));}[_0x49fb4d(0x21b)](_0x5c7c3d){var _0x1d9e5=_0x49fb4d;this[_0x1d9e5(0x24e)]=!0x1,this[_0x1d9e5(0x219)]=!0x1;try{_0x5c7c3d[_0x1d9e5(0x1eb)]=null,_0x5c7c3d['onerror']=null,_0x5c7c3d[_0x1d9e5(0x24a)]=null;}catch{}try{_0x5c7c3d[_0x1d9e5(0x193)]<0x2&&_0x5c7c3d[_0x1d9e5(0x25e)]();}catch{}}[_0x49fb4d(0x230)](){var _0x36144e=_0x49fb4d;clearTimeout(this['_reconnectTimeout']),!(this['_connectAttemptCount']>=this['_maxConnectAttemptCount'])&&(this[_0x36144e(0x1c9)]=setTimeout(()=>{var _0x47905e=_0x36144e;this['_connected']||this[_0x47905e(0x219)]||(this['_connectToHostNow'](),this[_0x47905e(0x1c7)]?.[_0x47905e(0x220)](()=>this['_attemptToReconnectShortly']()));},0x1f4),this[_0x36144e(0x1c9)][_0x36144e(0x223)]&&this[_0x36144e(0x1c9)]['unref']());}async[_0x49fb4d(0x1fb)](_0x2e3f38){var _0xa77768=_0x49fb4d;try{if(!this[_0xa77768(0x1bb)])return;this[_0xa77768(0x25c)]&&this[_0xa77768(0x1d9)](),(await this[_0xa77768(0x1c7)])[_0xa77768(0x1fb)](JSON['stringify'](_0x2e3f38));}catch(_0x5779df){console[_0xa77768(0x225)](this[_0xa77768(0x1ef)]+':\\x20'+(_0x5779df&&_0x5779df[_0xa77768(0x1a9)])),this[_0xa77768(0x1bb)]=!0x1,this[_0xa77768(0x230)]();}}};function b(_0x179cf7,_0x3d1613,_0x2867e6,_0x250dec,_0x5bfd42,_0x177690){var _0x589f00=_0x49fb4d;let _0x5b60de=_0x2867e6[_0x589f00(0x1e2)](',')['map'](_0x3f1c14=>{var _0x4513ce=_0x589f00;try{_0x179cf7['_console_ninja_session']||((_0x5bfd42==='next.js'||_0x5bfd42===_0x4513ce(0x1f8)||_0x5bfd42===_0x4513ce(0x1de)||_0x5bfd42===_0x4513ce(0x1ad))&&(_0x5bfd42+=!_0x179cf7[_0x4513ce(0x202)]?.[_0x4513ce(0x1d7)]?.[_0x4513ce(0x21e)]&&_0x179cf7[_0x4513ce(0x202)]?.[_0x4513ce(0x1fc)]?.[_0x4513ce(0x21f)]!==_0x4513ce(0x1e5)?'\\x20browser':_0x4513ce(0x259)),_0x179cf7[_0x4513ce(0x24d)]={'id':+new Date(),'tool':_0x5bfd42});let _0x16b5bb=new X(_0x179cf7,_0x3d1613,_0x3f1c14,_0x250dec,_0x177690);return _0x16b5bb[_0x4513ce(0x1fb)][_0x4513ce(0x1c0)](_0x16b5bb);}catch(_0x5d5a7d){return console[_0x4513ce(0x225)](_0x4513ce(0x1ca),_0x5d5a7d&&_0x5d5a7d[_0x4513ce(0x1a9)]),()=>{};}});return _0x34bf18=>_0x5b60de[_0x589f00(0x1b7)](_0x20ade0=>_0x20ade0(_0x34bf18));}function _0x3f4d(_0x4207f7,_0x16c298){var _0xa8b363=_0xa8b3();return _0x3f4d=function(_0x3f4ddd,_0x1d981a){_0x3f4ddd=_0x3f4ddd-0x185;var _0x3292a4=_0xa8b363[_0x3f4ddd];return _0x3292a4;},_0x3f4d(_0x4207f7,_0x16c298);}function W(_0x2db0ba){var _0x253c03=_0x49fb4d;let _0x481b52=function(_0x2fb3f1,_0xfce8fd){return _0xfce8fd-_0x2fb3f1;},_0x3b89e6;if(_0x2db0ba[_0x253c03(0x1cd)])_0x3b89e6=function(){var _0x3f1522=_0x253c03;return _0x2db0ba[_0x3f1522(0x1cd)][_0x3f1522(0x1cb)]();};else{if(_0x2db0ba[_0x253c03(0x202)]&&_0x2db0ba['process'][_0x253c03(0x256)]&&_0x2db0ba[_0x253c03(0x202)]?.[_0x253c03(0x1fc)]?.[_0x253c03(0x21f)]!=='edge')_0x3b89e6=function(){var _0x326d61=_0x253c03;return _0x2db0ba[_0x326d61(0x202)][_0x326d61(0x256)]();},_0x481b52=function(_0x2245c6,_0x494066){return 0x3e8*(_0x494066[0x0]-_0x2245c6[0x0])+(_0x494066[0x1]-_0x2245c6[0x1])/0xf4240;};else try{let {performance:_0x7fc435}=require('perf_hooks');_0x3b89e6=function(){var _0x25bad1=_0x253c03;return _0x7fc435[_0x25bad1(0x1cb)]();};}catch{_0x3b89e6=function(){return+new Date();};}}return{'elapsed':_0x481b52,'timeStamp':_0x3b89e6,'now':()=>Date['now']()};}function _0xa8b3(){var _0x48b6bb=['getOwnPropertyNames','5144stCSqN','create','_setNodeQueryPath','_consoleNinjaAllowedToStart','getWebSocketClass','_isMap','depth','[object\\x20Set]','autoExpandMaxDepth','symbol','location','_isNegativeZero','push','stackTraceLimit','_connecting','_Symbol','_disposeWebsocket','_processTreeNodeResult','value','node','NEXT_RUNTIME','catch','[object\\x20BigInt]','expressionsToEvaluate','unref','time','warn','elements','function','type','_property','27raOYgR','allStrLength','strLength','Set','object','totalStrLength','_attemptToReconnectShortly','length','autoExpandPreviousObjects','noFunctions','_regExpToString','nuxt','autoExpandLimit','5EfjEQL','hasOwnProperty','HTMLAllCollection','timeEnd','prototype','_propertyName','concat','console','_keyStrRegExp','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','negativeInfinity','boolean','then','toString','parent','slice','_inNextEdge','pathToFileURL','_connectAttemptCount','onopen','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','_maxConnectAttemptCount','_console_ninja_session','_connected','cappedProps','_cleanNode','onmessage','getPrototypeOf','stack','toLowerCase','ws://','hrtime','_WebSocketClass','_p_name','\\x20server','_type','null','_allowedToConnectOnSend','_getOwnPropertyNames','close','log','valueOf','getOwnPropertySymbols','error','String','index','_capIfString','root_exp_id','_treeNodePropertiesBeforeFullValue','113704JDUAAU','_undefined','number','_hasMapOnItsPath','_blacklistedProperty','127.0.0.1','https://tinyurl.com/37x8b79t','_quotedRegExp','_p_length','_inBrowser','_addObjectProperty','_webSocketErrorDocsLink','_numberRegExp','webpack','substr',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.289\\\\node_modules\",'_isSet','[object\\x20Map]','match','','_setNodeLabel','readyState','level','','dockerizedApp','reduceLimits','gateway.docker.internal','_console_ninja','call','string','Map','58439','undefined','_objectToString','WebSocket','_getOwnPropertySymbols','elapsed','1956048quYmFa','autoExpand','unknown','_dateToString','1180LvzpFP','Error','message','global','Buffer','rootExpression','angular','sortProps','capped','replace','serialize','unshift','_isArray','date','_p_','_WebSocket','forEach','_additionalMetadata','logger\\x20websocket\\x20error','1709027467268','_allowedToSend','__es'+'Module','_getOwnPropertyDescriptor','_setNodePermissions','_isPrimitiveWrapperType','bind','get','onerror','_isPrimitiveType','autoExpandPropertyCount','_HTMLAllCollection','bigint','_ws','_treeNodePropertiesAfterFullValue','_reconnectTimeout','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','now','host','performance','nan','_setNodeId','count','trace','_socket','[object\\x20Array]','negativeZero','RegExp','Boolean','versions','set','_connectToHostNow','test','parse','_addLoadNode','join','astro','Number','setter','[object\\x20Date]','split','37629eZIXEu','reload','edge','cappedElements','931905LapKax','_sortProps','props','port','onclose','data','path',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'_sendErrorMessage','115286mvsVVa','enumerable','getter','nodeModules','_addFunctionsNode','hits','default','constructor','remix','_setNodeExpandableState','includes','send','env','array','12nbkufu','_addProperty','isExpressionToEvaluate','method','process','161pyeWYe','stringify','current','7363983dacdXO','name','_setNodeExpressionPath','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20'];_0xa8b3=function(){return _0x48b6bb;};return _0xa8b3();}function J(_0x54fd95,_0x150aad,_0x3e378a){var _0x555256=_0x49fb4d;if(_0x54fd95[_0x555256(0x20e)]!==void 0x0)return _0x54fd95[_0x555256(0x20e)];let _0x133aa9=_0x54fd95[_0x555256(0x202)]?.['versions']?.[_0x555256(0x21e)]||_0x54fd95[_0x555256(0x202)]?.[_0x555256(0x1fc)]?.[_0x555256(0x21f)]===_0x555256(0x1e5);return _0x133aa9&&_0x3e378a===_0x555256(0x235)?_0x54fd95['_consoleNinjaAllowedToStart']=!0x1:_0x54fd95['_consoleNinjaAllowedToStart']=_0x133aa9||!_0x150aad||_0x54fd95[_0x555256(0x215)]?.['hostname']&&_0x150aad[_0x555256(0x1fa)](_0x54fd95[_0x555256(0x215)]['hostname']),_0x54fd95[_0x555256(0x20e)];}function Y(_0x52ead8,_0x488bad,_0x1c6742,_0x593e90){var _0x59ed02=_0x49fb4d;_0x52ead8=_0x52ead8,_0x488bad=_0x488bad,_0x1c6742=_0x1c6742,_0x593e90=_0x593e90;let _0x162e99=W(_0x52ead8),_0x4f7dfd=_0x162e99['elapsed'],_0x523b6a=_0x162e99['timeStamp'];class _0x5402cc{constructor(){var _0x48baff=_0x3f4d;this[_0x48baff(0x23f)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x48baff(0x18a)]=/^(0|[1-9][0-9]*)$/,this[_0x48baff(0x185)]=/'([^\\\\']|\\\\')*'/,this['_undefined']=_0x52ead8['undefined'],this[_0x48baff(0x1c5)]=_0x52ead8[_0x48baff(0x239)],this[_0x48baff(0x1bd)]=Object['getOwnPropertyDescriptor'],this['_getOwnPropertyNames']=Object[_0x48baff(0x20a)],this[_0x48baff(0x21a)]=_0x52ead8['Symbol'],this[_0x48baff(0x234)]=RegExp[_0x48baff(0x23b)][_0x48baff(0x244)],this['_dateToString']=Date['prototype']['toString'];}['serialize'](_0x3716dc,_0x42b252,_0x312a4a,_0x19a23e){var _0x3f39eb=_0x3f4d,_0x1095fb=this,_0x50f7d4=_0x312a4a['autoExpand'];function _0x543af4(_0x1b9ee9,_0x6e0cac,_0xafbc9e){var _0xac3fef=_0x3f4d;_0x6e0cac['type']=_0xac3fef(0x1a5),_0x6e0cac[_0xac3fef(0x262)]=_0x1b9ee9[_0xac3fef(0x1a9)],_0x2953a6=_0xafbc9e[_0xac3fef(0x21e)][_0xac3fef(0x205)],_0xafbc9e[_0xac3fef(0x21e)][_0xac3fef(0x205)]=_0x6e0cac,_0x1095fb[_0xac3fef(0x267)](_0x6e0cac,_0xafbc9e);}try{_0x312a4a[_0x3f39eb(0x194)]++,_0x312a4a[_0x3f39eb(0x1a4)]&&_0x312a4a[_0x3f39eb(0x232)][_0x3f39eb(0x217)](_0x42b252);var _0x3d7ff9,_0x3059e2,_0x2f29b7,_0x32acc0,_0x55e3f9=[],_0x300a89=[],_0x1d094d,_0x3459b6=this[_0x3f39eb(0x25a)](_0x42b252),_0x61b33c=_0x3459b6==='array',_0x466d79=!0x1,_0x549262=_0x3459b6==='function',_0xde1723=this[_0x3f39eb(0x1c3)](_0x3459b6),_0x1a0a1d=this[_0x3f39eb(0x1bf)](_0x3459b6),_0x59d471=_0xde1723||_0x1a0a1d,_0x1a7aaa={},_0x5391b1=0x0,_0x2bb1ef=!0x1,_0x2953a6,_0x1532bc=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x312a4a[_0x3f39eb(0x211)]){if(_0x61b33c){if(_0x3059e2=_0x42b252[_0x3f39eb(0x231)],_0x3059e2>_0x312a4a[_0x3f39eb(0x226)]){for(_0x2f29b7=0x0,_0x32acc0=_0x312a4a[_0x3f39eb(0x226)],_0x3d7ff9=_0x2f29b7;_0x3d7ff9<_0x32acc0;_0x3d7ff9++)_0x300a89[_0x3f39eb(0x217)](_0x1095fb[_0x3f39eb(0x1ff)](_0x55e3f9,_0x42b252,_0x3459b6,_0x3d7ff9,_0x312a4a));_0x3716dc[_0x3f39eb(0x1e6)]=!0x0;}else{for(_0x2f29b7=0x0,_0x32acc0=_0x3059e2,_0x3d7ff9=_0x2f29b7;_0x3d7ff9<_0x32acc0;_0x3d7ff9++)_0x300a89[_0x3f39eb(0x217)](_0x1095fb[_0x3f39eb(0x1ff)](_0x55e3f9,_0x42b252,_0x3459b6,_0x3d7ff9,_0x312a4a));}_0x312a4a[_0x3f39eb(0x1c4)]+=_0x300a89[_0x3f39eb(0x231)];}if(!(_0x3459b6===_0x3f39eb(0x25b)||_0x3459b6===_0x3f39eb(0x19e))&&!_0xde1723&&_0x3459b6!==_0x3f39eb(0x263)&&_0x3459b6!==_0x3f39eb(0x1ab)&&_0x3459b6!==_0x3f39eb(0x1c6)){var _0x7b31a6=_0x19a23e[_0x3f39eb(0x1e9)]||_0x312a4a[_0x3f39eb(0x1e9)];if(this[_0x3f39eb(0x18e)](_0x42b252)?(_0x3d7ff9=0x0,_0x42b252[_0x3f39eb(0x1b7)](function(_0x389511){var _0x46c7e2=_0x3f39eb;if(_0x5391b1++,_0x312a4a['autoExpandPropertyCount']++,_0x5391b1>_0x7b31a6){_0x2bb1ef=!0x0;return;}if(!_0x312a4a[_0x46c7e2(0x200)]&&_0x312a4a[_0x46c7e2(0x1a4)]&&_0x312a4a[_0x46c7e2(0x1c4)]>_0x312a4a[_0x46c7e2(0x236)]){_0x2bb1ef=!0x0;return;}_0x300a89[_0x46c7e2(0x217)](_0x1095fb[_0x46c7e2(0x1ff)](_0x55e3f9,_0x42b252,'Set',_0x3d7ff9++,_0x312a4a,function(_0x12376d){return function(){return _0x12376d;};}(_0x389511)));})):this['_isMap'](_0x42b252)&&_0x42b252[_0x3f39eb(0x1b7)](function(_0x113116,_0x1d77f9){var _0x36ac1c=_0x3f39eb;if(_0x5391b1++,_0x312a4a['autoExpandPropertyCount']++,_0x5391b1>_0x7b31a6){_0x2bb1ef=!0x0;return;}if(!_0x312a4a[_0x36ac1c(0x200)]&&_0x312a4a[_0x36ac1c(0x1a4)]&&_0x312a4a[_0x36ac1c(0x1c4)]>_0x312a4a[_0x36ac1c(0x236)]){_0x2bb1ef=!0x0;return;}var _0x3c19c8=_0x1d77f9[_0x36ac1c(0x244)]();_0x3c19c8[_0x36ac1c(0x231)]>0x64&&(_0x3c19c8=_0x3c19c8[_0x36ac1c(0x246)](0x0,0x64)+'...'),_0x300a89[_0x36ac1c(0x217)](_0x1095fb[_0x36ac1c(0x1ff)](_0x55e3f9,_0x42b252,_0x36ac1c(0x19c),_0x3c19c8,_0x312a4a,function(_0x3755b7){return function(){return _0x3755b7;};}(_0x113116)));}),!_0x466d79){try{for(_0x1d094d in _0x42b252)if(!(_0x61b33c&&_0x1532bc[_0x3f39eb(0x1da)](_0x1d094d))&&!this[_0x3f39eb(0x26c)](_0x42b252,_0x1d094d,_0x312a4a)){if(_0x5391b1++,_0x312a4a['autoExpandPropertyCount']++,_0x5391b1>_0x7b31a6){_0x2bb1ef=!0x0;break;}if(!_0x312a4a['isExpressionToEvaluate']&&_0x312a4a[_0x3f39eb(0x1a4)]&&_0x312a4a[_0x3f39eb(0x1c4)]>_0x312a4a['autoExpandLimit']){_0x2bb1ef=!0x0;break;}_0x300a89['push'](_0x1095fb[_0x3f39eb(0x188)](_0x55e3f9,_0x1a7aaa,_0x42b252,_0x3459b6,_0x1d094d,_0x312a4a));}}catch{}if(_0x1a7aaa[_0x3f39eb(0x186)]=!0x0,_0x549262&&(_0x1a7aaa[_0x3f39eb(0x258)]=!0x0),!_0x2bb1ef){var _0x23e773=[][_0x3f39eb(0x23d)](this[_0x3f39eb(0x25d)](_0x42b252))[_0x3f39eb(0x23d)](this[_0x3f39eb(0x1a1)](_0x42b252));for(_0x3d7ff9=0x0,_0x3059e2=_0x23e773[_0x3f39eb(0x231)];_0x3d7ff9<_0x3059e2;_0x3d7ff9++)if(_0x1d094d=_0x23e773[_0x3d7ff9],!(_0x61b33c&&_0x1532bc['test'](_0x1d094d[_0x3f39eb(0x244)]()))&&!this['_blacklistedProperty'](_0x42b252,_0x1d094d,_0x312a4a)&&!_0x1a7aaa[_0x3f39eb(0x1b5)+_0x1d094d[_0x3f39eb(0x244)]()]){if(_0x5391b1++,_0x312a4a[_0x3f39eb(0x1c4)]++,_0x5391b1>_0x7b31a6){_0x2bb1ef=!0x0;break;}if(!_0x312a4a[_0x3f39eb(0x200)]&&_0x312a4a[_0x3f39eb(0x1a4)]&&_0x312a4a['autoExpandPropertyCount']>_0x312a4a[_0x3f39eb(0x236)]){_0x2bb1ef=!0x0;break;}_0x300a89[_0x3f39eb(0x217)](_0x1095fb[_0x3f39eb(0x188)](_0x55e3f9,_0x1a7aaa,_0x42b252,_0x3459b6,_0x1d094d,_0x312a4a));}}}}}if(_0x3716dc[_0x3f39eb(0x228)]=_0x3459b6,_0x59d471?(_0x3716dc[_0x3f39eb(0x21d)]=_0x42b252[_0x3f39eb(0x260)](),this[_0x3f39eb(0x265)](_0x3459b6,_0x3716dc,_0x312a4a,_0x19a23e)):_0x3459b6===_0x3f39eb(0x1b4)?_0x3716dc[_0x3f39eb(0x21d)]=this[_0x3f39eb(0x1a6)]['call'](_0x42b252):_0x3459b6===_0x3f39eb(0x1c6)?_0x3716dc[_0x3f39eb(0x21d)]=_0x42b252[_0x3f39eb(0x244)]():_0x3459b6===_0x3f39eb(0x1d5)?_0x3716dc[_0x3f39eb(0x21d)]=this[_0x3f39eb(0x234)]['call'](_0x42b252):_0x3459b6===_0x3f39eb(0x214)&&this[_0x3f39eb(0x21a)]?_0x3716dc[_0x3f39eb(0x21d)]=this['_Symbol']['prototype']['toString'][_0x3f39eb(0x19a)](_0x42b252):!_0x312a4a[_0x3f39eb(0x211)]&&!(_0x3459b6==='null'||_0x3459b6===_0x3f39eb(0x19e))&&(delete _0x3716dc[_0x3f39eb(0x21d)],_0x3716dc[_0x3f39eb(0x1af)]=!0x0),_0x2bb1ef&&(_0x3716dc[_0x3f39eb(0x24f)]=!0x0),_0x2953a6=_0x312a4a[_0x3f39eb(0x21e)][_0x3f39eb(0x205)],_0x312a4a[_0x3f39eb(0x21e)][_0x3f39eb(0x205)]=_0x3716dc,this['_treeNodePropertiesBeforeFullValue'](_0x3716dc,_0x312a4a),_0x300a89[_0x3f39eb(0x231)]){for(_0x3d7ff9=0x0,_0x3059e2=_0x300a89[_0x3f39eb(0x231)];_0x3d7ff9<_0x3059e2;_0x3d7ff9++)_0x300a89[_0x3d7ff9](_0x3d7ff9);}_0x55e3f9[_0x3f39eb(0x231)]&&(_0x3716dc[_0x3f39eb(0x1e9)]=_0x55e3f9);}catch(_0x1458df){_0x543af4(_0x1458df,_0x3716dc,_0x312a4a);}return this['_additionalMetadata'](_0x42b252,_0x3716dc),this[_0x3f39eb(0x1c8)](_0x3716dc,_0x312a4a),_0x312a4a[_0x3f39eb(0x21e)][_0x3f39eb(0x205)]=_0x2953a6,_0x312a4a[_0x3f39eb(0x194)]--,_0x312a4a[_0x3f39eb(0x1a4)]=_0x50f7d4,_0x312a4a[_0x3f39eb(0x1a4)]&&_0x312a4a[_0x3f39eb(0x232)]['pop'](),_0x3716dc;}[_0x59ed02(0x1a1)](_0x48e43d){var _0x37989b=_0x59ed02;return Object[_0x37989b(0x261)]?Object[_0x37989b(0x261)](_0x48e43d):[];}[_0x59ed02(0x18e)](_0x5eed41){var _0x50aae4=_0x59ed02;return!!(_0x5eed41&&_0x52ead8[_0x50aae4(0x22d)]&&this['_objectToString'](_0x5eed41)===_0x50aae4(0x212)&&_0x5eed41[_0x50aae4(0x1b7)]);}[_0x59ed02(0x26c)](_0x43ea5c,_0x547c7c,_0x12c9ea){var _0x545f1b=_0x59ed02;return _0x12c9ea[_0x545f1b(0x233)]?typeof _0x43ea5c[_0x547c7c]==_0x545f1b(0x227):!0x1;}['_type'](_0x2fa91f){var _0x33d161=_0x59ed02,_0x50fc90='';return _0x50fc90=typeof _0x2fa91f,_0x50fc90===_0x33d161(0x22e)?this[_0x33d161(0x19f)](_0x2fa91f)===_0x33d161(0x1d3)?_0x50fc90=_0x33d161(0x1fd):this['_objectToString'](_0x2fa91f)===_0x33d161(0x1e1)?_0x50fc90=_0x33d161(0x1b4):this[_0x33d161(0x19f)](_0x2fa91f)===_0x33d161(0x221)?_0x50fc90=_0x33d161(0x1c6):_0x2fa91f===null?_0x50fc90=_0x33d161(0x25b):_0x2fa91f[_0x33d161(0x1f7)]&&(_0x50fc90=_0x2fa91f[_0x33d161(0x1f7)][_0x33d161(0x207)]||_0x50fc90):_0x50fc90==='undefined'&&this[_0x33d161(0x1c5)]&&_0x2fa91f instanceof this[_0x33d161(0x1c5)]&&(_0x50fc90=_0x33d161(0x239)),_0x50fc90;}[_0x59ed02(0x19f)](_0x4677c8){var _0x36deba=_0x59ed02;return Object[_0x36deba(0x23b)][_0x36deba(0x244)][_0x36deba(0x19a)](_0x4677c8);}[_0x59ed02(0x1c3)](_0x2553af){var _0x36485b=_0x59ed02;return _0x2553af===_0x36485b(0x242)||_0x2553af===_0x36485b(0x19b)||_0x2553af==='number';}[_0x59ed02(0x1bf)](_0x3689a8){var _0x5762f0=_0x59ed02;return _0x3689a8===_0x5762f0(0x1d6)||_0x3689a8===_0x5762f0(0x263)||_0x3689a8===_0x5762f0(0x1df);}[_0x59ed02(0x1ff)](_0x25f0de,_0x328f09,_0x47c53f,_0x37002d,_0x49f21c,_0x521c90){var _0x409b17=this;return function(_0x168fc9){var _0x5eaaf1=_0x3f4d,_0x14b1d5=_0x49f21c[_0x5eaaf1(0x21e)]['current'],_0x31c4d1=_0x49f21c[_0x5eaaf1(0x21e)]['index'],_0x1e7d12=_0x49f21c['node']['parent'];_0x49f21c[_0x5eaaf1(0x21e)][_0x5eaaf1(0x245)]=_0x14b1d5,_0x49f21c[_0x5eaaf1(0x21e)][_0x5eaaf1(0x264)]=typeof _0x37002d==_0x5eaaf1(0x26a)?_0x37002d:_0x168fc9,_0x25f0de['push'](_0x409b17[_0x5eaaf1(0x229)](_0x328f09,_0x47c53f,_0x37002d,_0x49f21c,_0x521c90)),_0x49f21c[_0x5eaaf1(0x21e)]['parent']=_0x1e7d12,_0x49f21c[_0x5eaaf1(0x21e)][_0x5eaaf1(0x264)]=_0x31c4d1;};}[_0x59ed02(0x188)](_0x41aa81,_0x1c7f86,_0x311f4d,_0x26014b,_0x1c7967,_0x577642,_0x5981a6){var _0x13f414=_0x59ed02,_0xe8b123=this;return _0x1c7f86[_0x13f414(0x1b5)+_0x1c7967[_0x13f414(0x244)]()]=!0x0,function(_0x3411f4){var _0x40672b=_0x13f414,_0x17180a=_0x577642[_0x40672b(0x21e)][_0x40672b(0x205)],_0x3da467=_0x577642[_0x40672b(0x21e)][_0x40672b(0x264)],_0x3b5746=_0x577642[_0x40672b(0x21e)][_0x40672b(0x245)];_0x577642[_0x40672b(0x21e)][_0x40672b(0x245)]=_0x17180a,_0x577642[_0x40672b(0x21e)][_0x40672b(0x264)]=_0x3411f4,_0x41aa81['push'](_0xe8b123[_0x40672b(0x229)](_0x311f4d,_0x26014b,_0x1c7967,_0x577642,_0x5981a6)),_0x577642[_0x40672b(0x21e)][_0x40672b(0x245)]=_0x3b5746,_0x577642[_0x40672b(0x21e)][_0x40672b(0x264)]=_0x3da467;};}[_0x59ed02(0x229)](_0x1fe10f,_0x3e26b4,_0xcbc90a,_0x30ba01,_0x4f8e0a){var _0x32ffe9=_0x59ed02,_0x1350ab=this;_0x4f8e0a||(_0x4f8e0a=function(_0x17ba27,_0x275ad6){return _0x17ba27[_0x275ad6];});var _0x3104eb=_0xcbc90a[_0x32ffe9(0x244)](),_0x399b04=_0x30ba01[_0x32ffe9(0x222)]||{},_0x23f998=_0x30ba01[_0x32ffe9(0x211)],_0x1c7153=_0x30ba01['isExpressionToEvaluate'];try{var _0x113b54=this[_0x32ffe9(0x210)](_0x1fe10f),_0x4d0792=_0x3104eb;_0x113b54&&_0x4d0792[0x0]==='\\x27'&&(_0x4d0792=_0x4d0792['substr'](0x1,_0x4d0792[_0x32ffe9(0x231)]-0x2));var _0xcebf6a=_0x30ba01[_0x32ffe9(0x222)]=_0x399b04[_0x32ffe9(0x1b5)+_0x4d0792];_0xcebf6a&&(_0x30ba01[_0x32ffe9(0x211)]=_0x30ba01['depth']+0x1),_0x30ba01['isExpressionToEvaluate']=!!_0xcebf6a;var _0x4430a0=typeof _0xcbc90a=='symbol',_0x5b6464={'name':_0x4430a0||_0x113b54?_0x3104eb:this[_0x32ffe9(0x23c)](_0x3104eb)};if(_0x4430a0&&(_0x5b6464[_0x32ffe9(0x214)]=!0x0),!(_0x3e26b4===_0x32ffe9(0x1fd)||_0x3e26b4===_0x32ffe9(0x1a8))){var _0x36c5ab=this[_0x32ffe9(0x1bd)](_0x1fe10f,_0xcbc90a);if(_0x36c5ab&&(_0x36c5ab[_0x32ffe9(0x1d8)]&&(_0x5b6464[_0x32ffe9(0x1e0)]=!0x0),_0x36c5ab[_0x32ffe9(0x1c1)]&&!_0xcebf6a&&!_0x30ba01['resolveGetters']))return _0x5b6464[_0x32ffe9(0x1f2)]=!0x0,this[_0x32ffe9(0x21c)](_0x5b6464,_0x30ba01),_0x5b6464;}var _0x409c28;try{_0x409c28=_0x4f8e0a(_0x1fe10f,_0xcbc90a);}catch(_0x29bf72){return _0x5b6464={'name':_0x3104eb,'type':_0x32ffe9(0x1a5),'error':_0x29bf72[_0x32ffe9(0x1a9)]},this['_processTreeNodeResult'](_0x5b6464,_0x30ba01),_0x5b6464;}var _0x58cabb=this[_0x32ffe9(0x25a)](_0x409c28),_0x50c021=this['_isPrimitiveType'](_0x58cabb);if(_0x5b6464[_0x32ffe9(0x228)]=_0x58cabb,_0x50c021)this['_processTreeNodeResult'](_0x5b6464,_0x30ba01,_0x409c28,function(){var _0x526428=_0x32ffe9;_0x5b6464[_0x526428(0x21d)]=_0x409c28['valueOf'](),!_0xcebf6a&&_0x1350ab[_0x526428(0x265)](_0x58cabb,_0x5b6464,_0x30ba01,{});});else{var _0xc0102=_0x30ba01['autoExpand']&&_0x30ba01[_0x32ffe9(0x194)]<_0x30ba01[_0x32ffe9(0x213)]&&_0x30ba01['autoExpandPreviousObjects']['indexOf'](_0x409c28)<0x0&&_0x58cabb!==_0x32ffe9(0x227)&&_0x30ba01[_0x32ffe9(0x1c4)]<_0x30ba01[_0x32ffe9(0x236)];_0xc0102||_0x30ba01[_0x32ffe9(0x194)]<_0x23f998||_0xcebf6a?(this[_0x32ffe9(0x1b1)](_0x5b6464,_0x409c28,_0x30ba01,_0xcebf6a||{}),this['_additionalMetadata'](_0x409c28,_0x5b6464)):this[_0x32ffe9(0x21c)](_0x5b6464,_0x30ba01,_0x409c28,function(){var _0x523ae7=_0x32ffe9;_0x58cabb===_0x523ae7(0x25b)||_0x58cabb===_0x523ae7(0x19e)||(delete _0x5b6464[_0x523ae7(0x21d)],_0x5b6464[_0x523ae7(0x1af)]=!0x0);});}return _0x5b6464;}finally{_0x30ba01[_0x32ffe9(0x222)]=_0x399b04,_0x30ba01['depth']=_0x23f998,_0x30ba01[_0x32ffe9(0x200)]=_0x1c7153;}}[_0x59ed02(0x265)](_0x3eef25,_0x84db6f,_0x10550d,_0x428813){var _0x225042=_0x59ed02,_0x59c62a=_0x428813[_0x225042(0x22c)]||_0x10550d[_0x225042(0x22c)];if((_0x3eef25===_0x225042(0x19b)||_0x3eef25===_0x225042(0x263))&&_0x84db6f[_0x225042(0x21d)]){let _0x801e17=_0x84db6f['value']['length'];_0x10550d[_0x225042(0x22b)]+=_0x801e17,_0x10550d[_0x225042(0x22b)]>_0x10550d[_0x225042(0x22f)]?(_0x84db6f[_0x225042(0x1af)]='',delete _0x84db6f[_0x225042(0x21d)]):_0x801e17>_0x59c62a&&(_0x84db6f[_0x225042(0x1af)]=_0x84db6f[_0x225042(0x21d)]['substr'](0x0,_0x59c62a),delete _0x84db6f[_0x225042(0x21d)]);}}[_0x59ed02(0x210)](_0x6bf6fa){var _0x48ea70=_0x59ed02;return!!(_0x6bf6fa&&_0x52ead8[_0x48ea70(0x19c)]&&this[_0x48ea70(0x19f)](_0x6bf6fa)===_0x48ea70(0x18f)&&_0x6bf6fa['forEach']);}['_propertyName'](_0xd5fa1d){var _0x235bdf=_0x59ed02;if(_0xd5fa1d[_0x235bdf(0x190)](/^\\d+$/))return _0xd5fa1d;var _0x50be6f;try{_0x50be6f=JSON[_0x235bdf(0x204)](''+_0xd5fa1d);}catch{_0x50be6f='\\x22'+this[_0x235bdf(0x19f)](_0xd5fa1d)+'\\x22';}return _0x50be6f[_0x235bdf(0x190)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x50be6f=_0x50be6f[_0x235bdf(0x18c)](0x1,_0x50be6f[_0x235bdf(0x231)]-0x2):_0x50be6f=_0x50be6f[_0x235bdf(0x1b0)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x50be6f;}[_0x59ed02(0x21c)](_0x1576d5,_0x3ad3fb,_0x582215,_0x4dbd3a){var _0x278397=_0x59ed02;this[_0x278397(0x267)](_0x1576d5,_0x3ad3fb),_0x4dbd3a&&_0x4dbd3a(),this[_0x278397(0x1b8)](_0x582215,_0x1576d5),this[_0x278397(0x1c8)](_0x1576d5,_0x3ad3fb);}[_0x59ed02(0x267)](_0x2cc14c,_0x4bc3cc){var _0x557e08=_0x59ed02;this[_0x557e08(0x1cf)](_0x2cc14c,_0x4bc3cc),this[_0x557e08(0x20d)](_0x2cc14c,_0x4bc3cc),this[_0x557e08(0x208)](_0x2cc14c,_0x4bc3cc),this[_0x557e08(0x1be)](_0x2cc14c,_0x4bc3cc);}[_0x59ed02(0x1cf)](_0x13bf9a,_0x36221e){}['_setNodeQueryPath'](_0x46a402,_0x59b4ec){}['_setNodeLabel'](_0x4be1bf,_0x53f6f5){}['_isUndefined'](_0x3c4f93){var _0x36f3fd=_0x59ed02;return _0x3c4f93===this[_0x36f3fd(0x269)];}[_0x59ed02(0x1c8)](_0x1710a6,_0x3f678a){var _0x24bd27=_0x59ed02;this['_setNodeLabel'](_0x1710a6,_0x3f678a),this[_0x24bd27(0x1f9)](_0x1710a6),_0x3f678a[_0x24bd27(0x1ae)]&&this[_0x24bd27(0x1e8)](_0x1710a6),this[_0x24bd27(0x1f4)](_0x1710a6,_0x3f678a),this[_0x24bd27(0x1dc)](_0x1710a6,_0x3f678a),this[_0x24bd27(0x250)](_0x1710a6);}['_additionalMetadata'](_0x5c7c62,_0x4c51a3){var _0x1f411e=_0x59ed02;let _0x2bdd3f;try{_0x52ead8[_0x1f411e(0x23e)]&&(_0x2bdd3f=_0x52ead8[_0x1f411e(0x23e)]['error'],_0x52ead8[_0x1f411e(0x23e)]['error']=function(){}),_0x5c7c62&&typeof _0x5c7c62[_0x1f411e(0x231)]==_0x1f411e(0x26a)&&(_0x4c51a3[_0x1f411e(0x231)]=_0x5c7c62[_0x1f411e(0x231)]);}catch{}finally{_0x2bdd3f&&(_0x52ead8[_0x1f411e(0x23e)][_0x1f411e(0x262)]=_0x2bdd3f);}if(_0x4c51a3[_0x1f411e(0x228)]===_0x1f411e(0x26a)||_0x4c51a3['type']===_0x1f411e(0x1df)){if(isNaN(_0x4c51a3[_0x1f411e(0x21d)]))_0x4c51a3[_0x1f411e(0x1ce)]=!0x0,delete _0x4c51a3['value'];else switch(_0x4c51a3[_0x1f411e(0x21d)]){case Number['POSITIVE_INFINITY']:_0x4c51a3['positiveInfinity']=!0x0,delete _0x4c51a3['value'];break;case Number['NEGATIVE_INFINITY']:_0x4c51a3[_0x1f411e(0x241)]=!0x0,delete _0x4c51a3['value'];break;case 0x0:this[_0x1f411e(0x216)](_0x4c51a3[_0x1f411e(0x21d)])&&(_0x4c51a3[_0x1f411e(0x1d4)]=!0x0);break;}}else _0x4c51a3['type']===_0x1f411e(0x227)&&typeof _0x5c7c62[_0x1f411e(0x207)]=='string'&&_0x5c7c62[_0x1f411e(0x207)]&&_0x4c51a3[_0x1f411e(0x207)]&&_0x5c7c62[_0x1f411e(0x207)]!==_0x4c51a3['name']&&(_0x4c51a3['funcName']=_0x5c7c62[_0x1f411e(0x207)]);}['_isNegativeZero'](_0x3edf20){return 0x1/_0x3edf20===Number['NEGATIVE_INFINITY'];}['_sortProps'](_0x2c1ca7){var _0x4e6de1=_0x59ed02;!_0x2c1ca7[_0x4e6de1(0x1e9)]||!_0x2c1ca7[_0x4e6de1(0x1e9)][_0x4e6de1(0x231)]||_0x2c1ca7['type']===_0x4e6de1(0x1fd)||_0x2c1ca7[_0x4e6de1(0x228)]===_0x4e6de1(0x19c)||_0x2c1ca7[_0x4e6de1(0x228)]===_0x4e6de1(0x22d)||_0x2c1ca7[_0x4e6de1(0x1e9)]['sort'](function(_0x48acb5,_0x4dc490){var _0x5cb219=_0x4e6de1,_0x49b532=_0x48acb5['name'][_0x5cb219(0x254)](),_0x599cf3=_0x4dc490['name'][_0x5cb219(0x254)]();return _0x49b532<_0x599cf3?-0x1:_0x49b532>_0x599cf3?0x1:0x0;});}[_0x59ed02(0x1f4)](_0x56fd6d,_0xe19b40){var _0x22c24a=_0x59ed02;if(!(_0xe19b40[_0x22c24a(0x233)]||!_0x56fd6d[_0x22c24a(0x1e9)]||!_0x56fd6d['props'][_0x22c24a(0x231)])){for(var _0x3912ba=[],_0x2eb732=[],_0x4889c5=0x0,_0x1bcf08=_0x56fd6d[_0x22c24a(0x1e9)][_0x22c24a(0x231)];_0x4889c5<_0x1bcf08;_0x4889c5++){var _0x3f04a8=_0x56fd6d[_0x22c24a(0x1e9)][_0x4889c5];_0x3f04a8[_0x22c24a(0x228)]===_0x22c24a(0x227)?_0x3912ba[_0x22c24a(0x217)](_0x3f04a8):_0x2eb732['push'](_0x3f04a8);}if(!(!_0x2eb732['length']||_0x3912ba[_0x22c24a(0x231)]<=0x1)){_0x56fd6d[_0x22c24a(0x1e9)]=_0x2eb732;var _0xf7cce1={'functionsNode':!0x0,'props':_0x3912ba};this[_0x22c24a(0x1cf)](_0xf7cce1,_0xe19b40),this[_0x22c24a(0x192)](_0xf7cce1,_0xe19b40),this[_0x22c24a(0x1f9)](_0xf7cce1),this['_setNodePermissions'](_0xf7cce1,_0xe19b40),_0xf7cce1['id']+='\\x20f',_0x56fd6d[_0x22c24a(0x1e9)][_0x22c24a(0x1b2)](_0xf7cce1);}}}[_0x59ed02(0x1dc)](_0x52f693,_0x439baf){}[_0x59ed02(0x1f9)](_0x1d169f){}[_0x59ed02(0x1b3)](_0x163fe9){var _0x555a59=_0x59ed02;return Array['isArray'](_0x163fe9)||typeof _0x163fe9==_0x555a59(0x22e)&&this['_objectToString'](_0x163fe9)==='[object\\x20Array]';}[_0x59ed02(0x1be)](_0x35f57d,_0x209198){}['_cleanNode'](_0x57cb19){var _0x5357de=_0x59ed02;delete _0x57cb19['_hasSymbolPropertyOnItsPath'],delete _0x57cb19['_hasSetOnItsPath'],delete _0x57cb19[_0x5357de(0x26b)];}[_0x59ed02(0x208)](_0x2d261b,_0x1b5255){}}let _0x3e5085=new _0x5402cc(),_0x2afba0={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x259076={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x4ebc79(_0x450cd1,_0x5a1759,_0xf26d46,_0x28b3ec,_0x1173d3,_0xa39da9){var _0xa64412=_0x59ed02;let _0x468409,_0x56f8b0;try{_0x56f8b0=_0x523b6a(),_0x468409=_0x1c6742[_0x5a1759],!_0x468409||_0x56f8b0-_0x468409['ts']>0x1f4&&_0x468409[_0xa64412(0x1d0)]&&_0x468409[_0xa64412(0x224)]/_0x468409[_0xa64412(0x1d0)]<0x64?(_0x1c6742[_0x5a1759]=_0x468409={'count':0x0,'time':0x0,'ts':_0x56f8b0},_0x1c6742[_0xa64412(0x1f5)]={}):_0x56f8b0-_0x1c6742[_0xa64412(0x1f5)]['ts']>0x32&&_0x1c6742[_0xa64412(0x1f5)][_0xa64412(0x1d0)]&&_0x1c6742[_0xa64412(0x1f5)][_0xa64412(0x224)]/_0x1c6742['hits'][_0xa64412(0x1d0)]<0x64&&(_0x1c6742[_0xa64412(0x1f5)]={});let _0x1e7805=[],_0x4365d5=_0x468409[_0xa64412(0x197)]||_0x1c6742['hits'][_0xa64412(0x197)]?_0x259076:_0x2afba0,_0x192577=_0x4a8ff7=>{var _0x4c6205=_0xa64412;let _0x1d3fe4={};return _0x1d3fe4[_0x4c6205(0x1e9)]=_0x4a8ff7[_0x4c6205(0x1e9)],_0x1d3fe4[_0x4c6205(0x226)]=_0x4a8ff7[_0x4c6205(0x226)],_0x1d3fe4[_0x4c6205(0x22c)]=_0x4a8ff7[_0x4c6205(0x22c)],_0x1d3fe4[_0x4c6205(0x22f)]=_0x4a8ff7[_0x4c6205(0x22f)],_0x1d3fe4[_0x4c6205(0x236)]=_0x4a8ff7[_0x4c6205(0x236)],_0x1d3fe4[_0x4c6205(0x213)]=_0x4a8ff7[_0x4c6205(0x213)],_0x1d3fe4['sortProps']=!0x1,_0x1d3fe4['noFunctions']=!_0x488bad,_0x1d3fe4[_0x4c6205(0x211)]=0x1,_0x1d3fe4[_0x4c6205(0x194)]=0x0,_0x1d3fe4['expId']=_0x4c6205(0x266),_0x1d3fe4[_0x4c6205(0x1ac)]='root_exp',_0x1d3fe4[_0x4c6205(0x1a4)]=!0x0,_0x1d3fe4[_0x4c6205(0x232)]=[],_0x1d3fe4[_0x4c6205(0x1c4)]=0x0,_0x1d3fe4['resolveGetters']=!0x0,_0x1d3fe4[_0x4c6205(0x22b)]=0x0,_0x1d3fe4[_0x4c6205(0x21e)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x1d3fe4;};for(var _0x186f57=0x0;_0x186f57<_0x1173d3['length'];_0x186f57++)_0x1e7805[_0xa64412(0x217)](_0x3e5085[_0xa64412(0x1b1)]({'timeNode':_0x450cd1===_0xa64412(0x224)||void 0x0},_0x1173d3[_0x186f57],_0x192577(_0x4365d5),{}));if(_0x450cd1===_0xa64412(0x1d1)){let _0x3914f0=Error['stackTraceLimit'];try{Error[_0xa64412(0x218)]=0x1/0x0,_0x1e7805[_0xa64412(0x217)](_0x3e5085[_0xa64412(0x1b1)]({'stackNode':!0x0},new Error()[_0xa64412(0x253)],_0x192577(_0x4365d5),{'strLength':0x1/0x0}));}finally{Error['stackTraceLimit']=_0x3914f0;}}return{'method':_0xa64412(0x25f),'version':_0x593e90,'args':[{'ts':_0xf26d46,'session':_0x28b3ec,'args':_0x1e7805,'id':_0x5a1759,'context':_0xa39da9}]};}catch(_0x101027){return{'method':_0xa64412(0x25f),'version':_0x593e90,'args':[{'ts':_0xf26d46,'session':_0x28b3ec,'args':[{'type':_0xa64412(0x1a5),'error':_0x101027&&_0x101027[_0xa64412(0x1a9)]}],'id':_0x5a1759,'context':_0xa39da9}]};}finally{try{if(_0x468409&&_0x56f8b0){let _0x115a65=_0x523b6a();_0x468409[_0xa64412(0x1d0)]++,_0x468409['time']+=_0x4f7dfd(_0x56f8b0,_0x115a65),_0x468409['ts']=_0x115a65,_0x1c6742[_0xa64412(0x1f5)][_0xa64412(0x1d0)]++,_0x1c6742['hits'][_0xa64412(0x224)]+=_0x4f7dfd(_0x56f8b0,_0x115a65),_0x1c6742['hits']['ts']=_0x115a65,(_0x468409[_0xa64412(0x1d0)]>0x32||_0x468409[_0xa64412(0x224)]>0x64)&&(_0x468409[_0xa64412(0x197)]=!0x0),(_0x1c6742['hits'][_0xa64412(0x1d0)]>0x3e8||_0x1c6742[_0xa64412(0x1f5)][_0xa64412(0x224)]>0x12c)&&(_0x1c6742[_0xa64412(0x1f5)][_0xa64412(0x197)]=!0x0);}}catch{}}}return _0x4ebc79;}((_0x38628b,_0x1f03cc,_0x2aa4e5,_0xf0b36c,_0x29597c,_0x4852cd,_0xf3b8bd,_0x326d0f,_0x11152c,_0x173079)=>{var _0x3d1755=_0x49fb4d;if(_0x38628b['_console_ninja'])return _0x38628b[_0x3d1755(0x199)];if(!J(_0x38628b,_0x326d0f,_0x29597c))return _0x38628b[_0x3d1755(0x199)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x38628b[_0x3d1755(0x199)];let _0xdacf90=W(_0x38628b),_0x20fe7a=_0xdacf90[_0x3d1755(0x1a2)],_0x5eb7d1=_0xdacf90['timeStamp'],_0x114d0b=_0xdacf90[_0x3d1755(0x1cb)],_0x7694f5={'hits':{},'ts':{}},_0x1764d8=Y(_0x38628b,_0x11152c,_0x7694f5,_0x4852cd),_0x178886=_0x207530=>{_0x7694f5['ts'][_0x207530]=_0x5eb7d1();},_0x11f474=(_0x700a86,_0x29b86d)=>{var _0x2cbef3=_0x3d1755;let _0x30e3a0=_0x7694f5['ts'][_0x29b86d];if(delete _0x7694f5['ts'][_0x29b86d],_0x30e3a0){let _0x56d048=_0x20fe7a(_0x30e3a0,_0x5eb7d1());_0x17d9cf(_0x1764d8(_0x2cbef3(0x224),_0x700a86,_0x114d0b(),_0x138b24,[_0x56d048],_0x29b86d));}},_0x56a592=_0x2e2c32=>_0x36556b=>{var _0x5b3d79=_0x3d1755;try{_0x178886(_0x36556b),_0x2e2c32(_0x36556b);}finally{_0x38628b[_0x5b3d79(0x23e)][_0x5b3d79(0x224)]=_0x2e2c32;}},_0x842d19=_0x27b330=>_0x5d7d00=>{var _0x4bbd9d=_0x3d1755;try{let [_0x202e29,_0x23f73b]=_0x5d7d00[_0x4bbd9d(0x1e2)](':logPointId:');_0x11f474(_0x23f73b,_0x202e29),_0x27b330(_0x202e29);}finally{_0x38628b[_0x4bbd9d(0x23e)]['timeEnd']=_0x27b330;}};_0x38628b['_console_ninja']={'consoleLog':(_0x25cb35,_0xd40039)=>{var _0x48c878=_0x3d1755;_0x38628b[_0x48c878(0x23e)][_0x48c878(0x25f)][_0x48c878(0x207)]!=='disabledLog'&&_0x17d9cf(_0x1764d8(_0x48c878(0x25f),_0x25cb35,_0x114d0b(),_0x138b24,_0xd40039));},'consoleTrace':(_0x3398a9,_0x4514fc)=>{var _0x835e28=_0x3d1755;_0x38628b[_0x835e28(0x23e)]['log'][_0x835e28(0x207)]!=='disabledTrace'&&_0x17d9cf(_0x1764d8(_0x835e28(0x1d1),_0x3398a9,_0x114d0b(),_0x138b24,_0x4514fc));},'consoleTime':()=>{var _0x4b3354=_0x3d1755;_0x38628b[_0x4b3354(0x23e)][_0x4b3354(0x224)]=_0x56a592(_0x38628b['console'][_0x4b3354(0x224)]);},'consoleTimeEnd':()=>{var _0x410270=_0x3d1755;_0x38628b[_0x410270(0x23e)]['timeEnd']=_0x842d19(_0x38628b[_0x410270(0x23e)][_0x410270(0x23a)]);},'autoLog':(_0x29f36a,_0x14ab8c)=>{_0x17d9cf(_0x1764d8('log',_0x14ab8c,_0x114d0b(),_0x138b24,[_0x29f36a]));},'autoLogMany':(_0x7308ae,_0x468fe0)=>{var _0x46173b=_0x3d1755;_0x17d9cf(_0x1764d8(_0x46173b(0x25f),_0x7308ae,_0x114d0b(),_0x138b24,_0x468fe0));},'autoTrace':(_0x1cc2f0,_0x351e00)=>{var _0xe4fcf6=_0x3d1755;_0x17d9cf(_0x1764d8(_0xe4fcf6(0x1d1),_0x351e00,_0x114d0b(),_0x138b24,[_0x1cc2f0]));},'autoTraceMany':(_0x4c7a1c,_0x2db2d1)=>{var _0x1f9984=_0x3d1755;_0x17d9cf(_0x1764d8(_0x1f9984(0x1d1),_0x4c7a1c,_0x114d0b(),_0x138b24,_0x2db2d1));},'autoTime':(_0x4897a0,_0x114719,_0x2819bd)=>{_0x178886(_0x2819bd);},'autoTimeEnd':(_0x25206b,_0x7ac882,_0x573aea)=>{_0x11f474(_0x7ac882,_0x573aea);},'coverage':_0x59fc26=>{_0x17d9cf({'method':'coverage','version':_0x4852cd,'args':[{'id':_0x59fc26}]});}};let _0x17d9cf=b(_0x38628b,_0x1f03cc,_0x2aa4e5,_0xf0b36c,_0x29597c,_0x173079),_0x138b24=_0x38628b[_0x3d1755(0x24d)];return _0x38628b['_console_ninja'];})(globalThis,_0x49fb4d(0x26d),_0x49fb4d(0x19d),_0x49fb4d(0x18d),_0x49fb4d(0x18b),'1.0.0',_0x49fb4d(0x1ba),_0x49fb4d(0x1ee),_0x49fb4d(0x191),_0x49fb4d(0x195));");
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