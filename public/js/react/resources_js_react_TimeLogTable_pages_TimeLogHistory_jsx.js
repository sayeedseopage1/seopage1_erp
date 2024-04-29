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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';function _0x529c(){var _0x3751e3=['_isNegativeZero','[object\\x20Set]','elements','data','warn','node','nodeModules','_connectToHostNow','disabledLog','_addFunctionsNode','_Symbol','_hasSetOnItsPath','autoExpand','pop','autoExpandMaxDepth','923252GYgSsW','_getOwnPropertyDescriptor','constructor','onclose','Number','_dateToString','_setNodeExpandableState','level','1uupNAI','current','autoExpandPropertyCount','null','_undefined','date','astro','root_exp_id','_WebSocketClass','','match','_setNodeQueryPath','_type','stringify','HTMLAllCollection','default','_consoleNinjaAllowedToStart','unref','strLength','edge','[object\\x20BigInt]','2261qMknhZ','_ws','hits','resolveGetters','reload','1273','positiveInfinity','log','isExpressionToEvaluate','message','call','unshift','next.js','hasOwnProperty','forEach','console','port','__es'+'Module','1.0.0','Set','process','onerror','timeStamp','array','_allowedToConnectOnSend','\\x20server','negativeZero','performance','pathToFileURL','function','webpack','Map','_HTMLAllCollection','ws://','_sendErrorMessage','rootExpression','_isPrimitiveWrapperType','_blacklistedProperty','_inNextEdge','coverage','...','error','_addProperty','String','Error','serialize','_console_ninja','_setNodeId','_isMap','_treeNodePropertiesAfterFullValue','origin','onopen','_socket','toString','valueOf','global','_disposeWebsocket','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','gateway.docker.internal','catch','isArray','_regExpToString','_connected','_getOwnPropertySymbols','nan','_inBrowser','getOwnPropertyDescriptor','Symbol','_reconnectTimeout','_propertyName','WebSocket','bind','parent','getOwnPropertySymbols','_webSocketErrorDocsLink','_isPrimitiveType','4763870QUkLlN','map','bigint','_setNodeExpressionPath','type','_p_length','depth','1','symbol','negativeInfinity','_property','name','versions','_quotedRegExp','_additionalMetadata','expressionsToEvaluate','env','close','value','boolean','disabledTrace','sortProps','_attemptToReconnectShortly','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','funcName','slice','_connecting','NEXT_RUNTIME','_processTreeNodeResult','stackTraceLimit','location','_isUndefined','_objectToString','_treeNodePropertiesBeforeFullValue','_sortProps','_cleanNode','allStrLength','time','9CGteka','now','','totalStrLength','_setNodePermissions','defineProperty','replace','_allowedToSend','root_exp','number','706474gqdjJi','trace','test','_getOwnPropertyNames','eventReceivedCallback','readyState','278640nzsHid','hostname','string','undefined','noFunctions','count','length','index','_addLoadNode','_connectAttemptCount','_p_name','angular','[object\\x20Array]','remix','host','send','object','_maxConnectAttemptCount','_console_ninja_session','prototype','path','logger\\x20websocket\\x20error','58143EOJORT','getOwnPropertyNames','props','nuxt','92njsIxP','_setNodeLabel','then','_addObjectProperty','_hasMapOnItsPath','split','includes','url','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-061\",\"172.27.27.79\"],'args','NEGATIVE_INFINITY','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','869465DlPHHu','_p_','toLowerCase','unknown','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','dockerizedApp','elapsed','reduceLimits','autoExpandPreviousObjects','4240RoClAj','autoExpandLimit','_WebSocket','substr','push','concat','_capIfString','join','enumerable','set','_isSet'];_0x529c=function(){return _0x3751e3;};return _0x529c();}var _0x4cf959=_0x5db4;function _0x5db4(_0x21a3d3,_0x54b201){var _0x529c5c=_0x529c();return _0x5db4=function(_0x5db48a,_0x3721fc){_0x5db48a=_0x5db48a-0x80;var _0x4880a5=_0x529c5c[_0x5db48a];return _0x4880a5;},_0x5db4(_0x21a3d3,_0x54b201);}(function(_0x520666,_0x1147e4){var _0x23eb01=_0x5db4,_0x30cdfb=_0x520666();while(!![]){try{var _0x3433bb=parseInt(_0x23eb01(0xff))/0x1*(-parseInt(_0x23eb01(0xa7))/0x2)+parseInt(_0x23eb01(0xc3))/0x3*(parseInt(_0x23eb01(0xc7))/0x4)+-parseInt(_0x23eb01(0xd4))/0x5+-parseInt(_0x23eb01(0xad))/0x6+parseInt(_0x23eb01(0x114))/0x7*(-parseInt(_0x23eb01(0xdd))/0x8)+-parseInt(_0x23eb01(0x9d))/0x9*(-parseInt(_0x23eb01(0x160))/0xa)+parseInt(_0x23eb01(0xf7))/0xb;if(_0x3433bb===_0x1147e4)break;else _0x30cdfb['push'](_0x30cdfb['shift']());}catch(_0x281cbc){_0x30cdfb['push'](_0x30cdfb['shift']());}}}(_0x529c,0x3fcca));var K=Object['create'],Q=Object[_0x4cf959(0xa2)],G=Object[_0x4cf959(0x156)],ee=Object[_0x4cf959(0xc4)],te=Object['getPrototypeOf'],ne=Object[_0x4cf959(0xc0)][_0x4cf959(0x121)],re=(_0x115def,_0x532c4a,_0xc77198,_0x2a6ce2)=>{var _0x467f91=_0x4cf959;if(_0x532c4a&&typeof _0x532c4a==_0x467f91(0xbd)||typeof _0x532c4a==_0x467f91(0x131)){for(let _0x33d6dc of ee(_0x532c4a))!ne[_0x467f91(0x11e)](_0x115def,_0x33d6dc)&&_0x33d6dc!==_0xc77198&&Q(_0x115def,_0x33d6dc,{'get':()=>_0x532c4a[_0x33d6dc],'enumerable':!(_0x2a6ce2=G(_0x532c4a,_0x33d6dc))||_0x2a6ce2[_0x467f91(0xe5)]});}return _0x115def;},V=(_0x2840ad,_0x25514c,_0x3e2e4a)=>(_0x3e2e4a=_0x2840ad!=null?K(te(_0x2840ad)):{},re(_0x25514c||!_0x2840ad||!_0x2840ad[_0x4cf959(0x125)]?Q(_0x3e2e4a,_0x4cf959(0x10e),{'value':_0x2840ad,'enumerable':!0x0}):_0x3e2e4a,_0x2840ad)),x=class{constructor(_0x35a1b1,_0x1fccfe,_0x5f1d3b,_0xa1568b,_0x1081a3,_0x3e8d2f){var _0xe4f172=_0x4cf959;this['global']=_0x35a1b1,this['host']=_0x1fccfe,this[_0xe4f172(0x124)]=_0x5f1d3b,this['nodeModules']=_0xa1568b,this['dockerizedApp']=_0x1081a3,this[_0xe4f172(0xab)]=_0x3e8d2f,this[_0xe4f172(0xa4)]=!0x0,this[_0xe4f172(0x12c)]=!0x0,this['_connected']=!0x1,this['_connecting']=!0x1,this[_0xe4f172(0x13a)]=_0x35a1b1['process']?.[_0xe4f172(0x87)]?.[_0xe4f172(0x92)]===_0xe4f172(0x112),this[_0xe4f172(0x155)]=!this['global'][_0xe4f172(0x128)]?.['versions']?.[_0xe4f172(0xed)]&&!this[_0xe4f172(0x13a)],this[_0xe4f172(0x107)]=null,this[_0xe4f172(0xb6)]=0x0,this[_0xe4f172(0xbe)]=0x14,this[_0xe4f172(0x15e)]='https://tinyurl.com/37x8b79t',this[_0xe4f172(0x136)]=(this[_0xe4f172(0x155)]?_0xe4f172(0xd8):_0xe4f172(0xcf))+this[_0xe4f172(0x15e)];}async['getWebSocketClass'](){var _0x59ffac=_0x4cf959;if(this[_0x59ffac(0x107)])return this[_0x59ffac(0x107)];let _0x5a7ccf;if(this['_inBrowser']||this[_0x59ffac(0x13a)])_0x5a7ccf=this[_0x59ffac(0x14b)][_0x59ffac(0x15a)];else{if(this[_0x59ffac(0x14b)]['process']?.[_0x59ffac(0xdf)])_0x5a7ccf=this['global'][_0x59ffac(0x128)]?.['_WebSocket'];else try{let _0x4d748c=await import(_0x59ffac(0xc1));_0x5a7ccf=(await import((await import(_0x59ffac(0xce)))[_0x59ffac(0x130)](_0x4d748c[_0x59ffac(0xe4)](this[_0x59ffac(0xee)],'ws/index.js'))[_0x59ffac(0x149)]()))[_0x59ffac(0x10e)];}catch{try{_0x5a7ccf=require(require(_0x59ffac(0xc1))['join'](this[_0x59ffac(0xee)],'ws'));}catch{throw new Error('failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket');}}}return this[_0x59ffac(0x107)]=_0x5a7ccf,_0x5a7ccf;}[_0x4cf959(0xef)](){var _0x412da7=_0x4cf959;this[_0x412da7(0x91)]||this[_0x412da7(0x152)]||this[_0x412da7(0xb6)]>=this[_0x412da7(0xbe)]||(this['_allowedToConnectOnSend']=!0x1,this[_0x412da7(0x91)]=!0x0,this[_0x412da7(0xb6)]++,this[_0x412da7(0x115)]=new Promise((_0x81ac52,_0x4de734)=>{var _0x108536=_0x412da7;this['getWebSocketClass']()[_0x108536(0xc9)](_0x5470c0=>{var _0x5e632f=_0x108536;let _0x41f14b=new _0x5470c0(_0x5e632f(0x135)+(!this[_0x5e632f(0x155)]&&this[_0x5e632f(0xd9)]?_0x5e632f(0x14e):this[_0x5e632f(0xbb)])+':'+this[_0x5e632f(0x124)]);_0x41f14b[_0x5e632f(0x129)]=()=>{var _0x3cefb5=_0x5e632f;this[_0x3cefb5(0xa4)]=!0x1,this[_0x3cefb5(0x14c)](_0x41f14b),this['_attemptToReconnectShortly'](),_0x4de734(new Error(_0x3cefb5(0xc2)));},_0x41f14b[_0x5e632f(0x147)]=()=>{var _0x4d9a4a=_0x5e632f;this[_0x4d9a4a(0x155)]||_0x41f14b[_0x4d9a4a(0x148)]&&_0x41f14b[_0x4d9a4a(0x148)][_0x4d9a4a(0x110)]&&_0x41f14b[_0x4d9a4a(0x148)][_0x4d9a4a(0x110)](),_0x81ac52(_0x41f14b);},_0x41f14b[_0x5e632f(0xfa)]=()=>{var _0x5de1f8=_0x5e632f;this['_allowedToConnectOnSend']=!0x0,this['_disposeWebsocket'](_0x41f14b),this[_0x5de1f8(0x8d)]();},_0x41f14b['onmessage']=_0x5cf3f4=>{var _0x518521=_0x5e632f;try{if(!_0x5cf3f4?.[_0x518521(0xeb)]||!this[_0x518521(0xab)])return;let _0x3bc418=JSON['parse'](_0x5cf3f4['data']);this['eventReceivedCallback'](_0x3bc418['method'],_0x3bc418['args'],this[_0x518521(0x14b)],this[_0x518521(0x155)]);}catch{}};})['then'](_0x44e37e=>(this[_0x108536(0x152)]=!0x0,this['_connecting']=!0x1,this[_0x108536(0x12c)]=!0x1,this[_0x108536(0xa4)]=!0x0,this[_0x108536(0xb6)]=0x0,_0x44e37e))[_0x108536(0x14f)](_0x4341a5=>(this['_connected']=!0x1,this[_0x108536(0x91)]=!0x1,console[_0x108536(0xec)](_0x108536(0x14d)+this[_0x108536(0x15e)]),_0x4de734(new Error('failed\\x20to\\x20connect\\x20to\\x20host:\\x20'+(_0x4341a5&&_0x4341a5['message'])))));}));}[_0x4cf959(0x14c)](_0x4ad725){var _0x417929=_0x4cf959;this[_0x417929(0x152)]=!0x1,this[_0x417929(0x91)]=!0x1;try{_0x4ad725['onclose']=null,_0x4ad725['onerror']=null,_0x4ad725[_0x417929(0x147)]=null;}catch{}try{_0x4ad725[_0x417929(0xac)]<0x2&&_0x4ad725[_0x417929(0x88)]();}catch{}}['_attemptToReconnectShortly'](){var _0x1f4459=_0x4cf959;clearTimeout(this[_0x1f4459(0x158)]),!(this[_0x1f4459(0xb6)]>=this[_0x1f4459(0xbe)])&&(this[_0x1f4459(0x158)]=setTimeout(()=>{var _0xffe835=_0x1f4459;this['_connected']||this[_0xffe835(0x91)]||(this['_connectToHostNow'](),this[_0xffe835(0x115)]?.['catch'](()=>this[_0xffe835(0x8d)]()));},0x1f4),this[_0x1f4459(0x158)][_0x1f4459(0x110)]&&this[_0x1f4459(0x158)][_0x1f4459(0x110)]());}async[_0x4cf959(0xbc)](_0x34c975){var _0x2a1e57=_0x4cf959;try{if(!this['_allowedToSend'])return;this[_0x2a1e57(0x12c)]&&this[_0x2a1e57(0xef)](),(await this[_0x2a1e57(0x115)])[_0x2a1e57(0xbc)](JSON[_0x2a1e57(0x10c)](_0x34c975));}catch(_0x4fe125){console['warn'](this[_0x2a1e57(0x136)]+':\\x20'+(_0x4fe125&&_0x4fe125[_0x2a1e57(0x11d)])),this[_0x2a1e57(0xa4)]=!0x1,this[_0x2a1e57(0x8d)]();}}};function q(_0x5838af,_0x324af0,_0x5b91a1,_0x488ecf,_0x4906df,_0x1cc356,_0x38ae65,_0x564df1=ie){var _0x17eefa=_0x4cf959;let _0x3b3794=_0x5b91a1[_0x17eefa(0xcc)](',')[_0x17eefa(0x161)](_0x2578c1=>{var _0x5d1bef=_0x17eefa;try{if(!_0x5838af['_console_ninja_session']){let _0x3a561d=_0x5838af['process']?.[_0x5d1bef(0x83)]?.[_0x5d1bef(0xed)]||_0x5838af[_0x5d1bef(0x128)]?.['env']?.[_0x5d1bef(0x92)]===_0x5d1bef(0x112);(_0x4906df===_0x5d1bef(0x120)||_0x4906df===_0x5d1bef(0xba)||_0x4906df===_0x5d1bef(0x105)||_0x4906df===_0x5d1bef(0xb8))&&(_0x4906df+=_0x3a561d?_0x5d1bef(0x12d):'\\x20browser'),_0x5838af[_0x5d1bef(0xbf)]={'id':+new Date(),'tool':_0x4906df},_0x38ae65&&_0x4906df&&!_0x3a561d&&console['log'](_0x5d1bef(0x8e)+(_0x4906df['charAt'](0x0)['toUpperCase']()+_0x4906df[_0x5d1bef(0xe0)](0x1))+',','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.');}let _0x3c6d53=new x(_0x5838af,_0x324af0,_0x2578c1,_0x488ecf,_0x1cc356,_0x564df1);return _0x3c6d53['send'][_0x5d1bef(0x15b)](_0x3c6d53);}catch(_0x1aa9de){return console[_0x5d1bef(0xec)](_0x5d1bef(0xd3),_0x1aa9de&&_0x1aa9de[_0x5d1bef(0x11d)]),()=>{};}});return _0x2c1dbd=>_0x3b3794[_0x17eefa(0x122)](_0xb40c02=>_0xb40c02(_0x2c1dbd));}function ie(_0xd462e5,_0x1a1f72,_0x17e005,_0x1902c7){var _0x4f541d=_0x4cf959;_0x1902c7&&_0xd462e5===_0x4f541d(0x118)&&_0x17e005['location'][_0x4f541d(0x118)]();}function b(_0x2c83cb){var _0x5b655f=_0x4cf959;let _0x43cc27=function(_0x3a668f,_0x2e0260){return _0x2e0260-_0x3a668f;},_0x53bba0;if(_0x2c83cb[_0x5b655f(0x12f)])_0x53bba0=function(){var _0x24c1f2=_0x5b655f;return _0x2c83cb[_0x24c1f2(0x12f)][_0x24c1f2(0x9e)]();};else{if(_0x2c83cb[_0x5b655f(0x128)]&&_0x2c83cb['process']['hrtime']&&_0x2c83cb[_0x5b655f(0x128)]?.[_0x5b655f(0x87)]?.[_0x5b655f(0x92)]!=='edge')_0x53bba0=function(){var _0x5d296d=_0x5b655f;return _0x2c83cb[_0x5d296d(0x128)]['hrtime']();},_0x43cc27=function(_0x5dea5d,_0x434669){return 0x3e8*(_0x434669[0x0]-_0x5dea5d[0x0])+(_0x434669[0x1]-_0x5dea5d[0x1])/0xf4240;};else try{let {performance:_0x1a26e5}=require('perf_hooks');_0x53bba0=function(){return _0x1a26e5['now']();};}catch{_0x53bba0=function(){return+new Date();};}}return{'elapsed':_0x43cc27,'timeStamp':_0x53bba0,'now':()=>Date[_0x5b655f(0x9e)]()};}function X(_0x2fc7b0,_0x15f6b1,_0x2b90bd){var _0x1ebc6c=_0x4cf959;if(_0x2fc7b0[_0x1ebc6c(0x10f)]!==void 0x0)return _0x2fc7b0[_0x1ebc6c(0x10f)];let _0x4e081c=_0x2fc7b0[_0x1ebc6c(0x128)]?.['versions']?.[_0x1ebc6c(0xed)]||_0x2fc7b0[_0x1ebc6c(0x128)]?.[_0x1ebc6c(0x87)]?.[_0x1ebc6c(0x92)]===_0x1ebc6c(0x112);return _0x4e081c&&_0x2b90bd===_0x1ebc6c(0xc6)?_0x2fc7b0['_consoleNinjaAllowedToStart']=!0x1:_0x2fc7b0[_0x1ebc6c(0x10f)]=_0x4e081c||!_0x15f6b1||_0x2fc7b0['location']?.[_0x1ebc6c(0xae)]&&_0x15f6b1[_0x1ebc6c(0xcd)](_0x2fc7b0[_0x1ebc6c(0x95)][_0x1ebc6c(0xae)]),_0x2fc7b0[_0x1ebc6c(0x10f)];}function H(_0x4c2cad,_0x5963b0,_0x5d4da7,_0x5b5693){var _0x16cdf0=_0x4cf959;_0x4c2cad=_0x4c2cad,_0x5963b0=_0x5963b0,_0x5d4da7=_0x5d4da7,_0x5b5693=_0x5b5693;let _0x23024f=b(_0x4c2cad),_0x1bfbd7=_0x23024f['elapsed'],_0x1f6faa=_0x23024f[_0x16cdf0(0x12a)];class _0x370987{constructor(){var _0x606e41=_0x16cdf0;this['_keyStrRegExp']=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this[_0x606e41(0x84)]=/'([^\\\\']|\\\\')*'/,this[_0x606e41(0x103)]=_0x4c2cad['undefined'],this[_0x606e41(0x134)]=_0x4c2cad[_0x606e41(0x10d)],this[_0x606e41(0xf8)]=Object[_0x606e41(0x156)],this[_0x606e41(0xaa)]=Object[_0x606e41(0xc4)],this[_0x606e41(0xf2)]=_0x4c2cad[_0x606e41(0x157)],this[_0x606e41(0x151)]=RegExp[_0x606e41(0xc0)][_0x606e41(0x149)],this['_dateToString']=Date[_0x606e41(0xc0)][_0x606e41(0x149)];}[_0x16cdf0(0x141)](_0x30cdbf,_0x472c40,_0x50de8c,_0x340b6c){var _0x21b5b0=_0x16cdf0,_0x160506=this,_0x34bb00=_0x50de8c[_0x21b5b0(0xf4)];function _0x2fe4f8(_0x3a4f83,_0x4d9c4b,_0x53063f){var _0xe3f1eb=_0x21b5b0;_0x4d9c4b[_0xe3f1eb(0x164)]='unknown',_0x4d9c4b[_0xe3f1eb(0x13d)]=_0x3a4f83['message'],_0x4098d9=_0x53063f[_0xe3f1eb(0xed)]['current'],_0x53063f['node'][_0xe3f1eb(0x100)]=_0x4d9c4b,_0x160506[_0xe3f1eb(0x98)](_0x4d9c4b,_0x53063f);}try{_0x50de8c[_0x21b5b0(0xfe)]++,_0x50de8c[_0x21b5b0(0xf4)]&&_0x50de8c[_0x21b5b0(0xdc)][_0x21b5b0(0xe1)](_0x472c40);var _0xd67285,_0x477b1b,_0x35b685,_0x421303,_0x3cfbed=[],_0x2dd685=[],_0x41330d,_0x369395=this[_0x21b5b0(0x10b)](_0x472c40),_0x31f427=_0x369395===_0x21b5b0(0x12b),_0x26aa54=!0x1,_0x541664=_0x369395===_0x21b5b0(0x131),_0x5b0b89=this[_0x21b5b0(0x15f)](_0x369395),_0xc14d03=this[_0x21b5b0(0x138)](_0x369395),_0x5f3a55=_0x5b0b89||_0xc14d03,_0x3faea5={},_0x5dec58=0x0,_0x3b084a=!0x1,_0x4098d9,_0x1bd102=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x50de8c[_0x21b5b0(0x166)]){if(_0x31f427){if(_0x477b1b=_0x472c40[_0x21b5b0(0xb3)],_0x477b1b>_0x50de8c[_0x21b5b0(0xea)]){for(_0x35b685=0x0,_0x421303=_0x50de8c[_0x21b5b0(0xea)],_0xd67285=_0x35b685;_0xd67285<_0x421303;_0xd67285++)_0x2dd685[_0x21b5b0(0xe1)](_0x160506[_0x21b5b0(0x13e)](_0x3cfbed,_0x472c40,_0x369395,_0xd67285,_0x50de8c));_0x30cdbf['cappedElements']=!0x0;}else{for(_0x35b685=0x0,_0x421303=_0x477b1b,_0xd67285=_0x35b685;_0xd67285<_0x421303;_0xd67285++)_0x2dd685[_0x21b5b0(0xe1)](_0x160506[_0x21b5b0(0x13e)](_0x3cfbed,_0x472c40,_0x369395,_0xd67285,_0x50de8c));}_0x50de8c[_0x21b5b0(0x101)]+=_0x2dd685[_0x21b5b0(0xb3)];}if(!(_0x369395==='null'||_0x369395===_0x21b5b0(0xb0))&&!_0x5b0b89&&_0x369395!==_0x21b5b0(0x13f)&&_0x369395!=='Buffer'&&_0x369395!==_0x21b5b0(0x162)){var _0x5dd60a=_0x340b6c[_0x21b5b0(0xc5)]||_0x50de8c[_0x21b5b0(0xc5)];if(this[_0x21b5b0(0xe7)](_0x472c40)?(_0xd67285=0x0,_0x472c40[_0x21b5b0(0x122)](function(_0x14ae96){var _0x12b28b=_0x21b5b0;if(_0x5dec58++,_0x50de8c[_0x12b28b(0x101)]++,_0x5dec58>_0x5dd60a){_0x3b084a=!0x0;return;}if(!_0x50de8c[_0x12b28b(0x11c)]&&_0x50de8c[_0x12b28b(0xf4)]&&_0x50de8c[_0x12b28b(0x101)]>_0x50de8c[_0x12b28b(0xde)]){_0x3b084a=!0x0;return;}_0x2dd685[_0x12b28b(0xe1)](_0x160506[_0x12b28b(0x13e)](_0x3cfbed,_0x472c40,_0x12b28b(0x127),_0xd67285++,_0x50de8c,function(_0x5b67f7){return function(){return _0x5b67f7;};}(_0x14ae96)));})):this[_0x21b5b0(0x144)](_0x472c40)&&_0x472c40[_0x21b5b0(0x122)](function(_0x4048d9,_0x2a8381){var _0xb0b6b0=_0x21b5b0;if(_0x5dec58++,_0x50de8c['autoExpandPropertyCount']++,_0x5dec58>_0x5dd60a){_0x3b084a=!0x0;return;}if(!_0x50de8c[_0xb0b6b0(0x11c)]&&_0x50de8c[_0xb0b6b0(0xf4)]&&_0x50de8c[_0xb0b6b0(0x101)]>_0x50de8c[_0xb0b6b0(0xde)]){_0x3b084a=!0x0;return;}var _0x14c4cf=_0x2a8381['toString']();_0x14c4cf[_0xb0b6b0(0xb3)]>0x64&&(_0x14c4cf=_0x14c4cf[_0xb0b6b0(0x90)](0x0,0x64)+_0xb0b6b0(0x13c)),_0x2dd685['push'](_0x160506['_addProperty'](_0x3cfbed,_0x472c40,'Map',_0x14c4cf,_0x50de8c,function(_0x4bff58){return function(){return _0x4bff58;};}(_0x4048d9)));}),!_0x26aa54){try{for(_0x41330d in _0x472c40)if(!(_0x31f427&&_0x1bd102[_0x21b5b0(0xa9)](_0x41330d))&&!this[_0x21b5b0(0x139)](_0x472c40,_0x41330d,_0x50de8c)){if(_0x5dec58++,_0x50de8c[_0x21b5b0(0x101)]++,_0x5dec58>_0x5dd60a){_0x3b084a=!0x0;break;}if(!_0x50de8c[_0x21b5b0(0x11c)]&&_0x50de8c[_0x21b5b0(0xf4)]&&_0x50de8c['autoExpandPropertyCount']>_0x50de8c[_0x21b5b0(0xde)]){_0x3b084a=!0x0;break;}_0x2dd685['push'](_0x160506[_0x21b5b0(0xca)](_0x3cfbed,_0x3faea5,_0x472c40,_0x369395,_0x41330d,_0x50de8c));}}catch{}if(_0x3faea5[_0x21b5b0(0x165)]=!0x0,_0x541664&&(_0x3faea5[_0x21b5b0(0xb7)]=!0x0),!_0x3b084a){var _0xd854f1=[][_0x21b5b0(0xe2)](this[_0x21b5b0(0xaa)](_0x472c40))[_0x21b5b0(0xe2)](this[_0x21b5b0(0x153)](_0x472c40));for(_0xd67285=0x0,_0x477b1b=_0xd854f1['length'];_0xd67285<_0x477b1b;_0xd67285++)if(_0x41330d=_0xd854f1[_0xd67285],!(_0x31f427&&_0x1bd102[_0x21b5b0(0xa9)](_0x41330d[_0x21b5b0(0x149)]()))&&!this[_0x21b5b0(0x139)](_0x472c40,_0x41330d,_0x50de8c)&&!_0x3faea5['_p_'+_0x41330d[_0x21b5b0(0x149)]()]){if(_0x5dec58++,_0x50de8c[_0x21b5b0(0x101)]++,_0x5dec58>_0x5dd60a){_0x3b084a=!0x0;break;}if(!_0x50de8c[_0x21b5b0(0x11c)]&&_0x50de8c[_0x21b5b0(0xf4)]&&_0x50de8c[_0x21b5b0(0x101)]>_0x50de8c['autoExpandLimit']){_0x3b084a=!0x0;break;}_0x2dd685[_0x21b5b0(0xe1)](_0x160506[_0x21b5b0(0xca)](_0x3cfbed,_0x3faea5,_0x472c40,_0x369395,_0x41330d,_0x50de8c));}}}}}if(_0x30cdbf['type']=_0x369395,_0x5f3a55?(_0x30cdbf[_0x21b5b0(0x89)]=_0x472c40[_0x21b5b0(0x14a)](),this[_0x21b5b0(0xe3)](_0x369395,_0x30cdbf,_0x50de8c,_0x340b6c)):_0x369395===_0x21b5b0(0x104)?_0x30cdbf[_0x21b5b0(0x89)]=this[_0x21b5b0(0xfc)]['call'](_0x472c40):_0x369395===_0x21b5b0(0x162)?_0x30cdbf[_0x21b5b0(0x89)]=_0x472c40[_0x21b5b0(0x149)]():_0x369395==='RegExp'?_0x30cdbf[_0x21b5b0(0x89)]=this['_regExpToString'][_0x21b5b0(0x11e)](_0x472c40):_0x369395===_0x21b5b0(0x168)&&this[_0x21b5b0(0xf2)]?_0x30cdbf[_0x21b5b0(0x89)]=this[_0x21b5b0(0xf2)][_0x21b5b0(0xc0)][_0x21b5b0(0x149)][_0x21b5b0(0x11e)](_0x472c40):!_0x50de8c[_0x21b5b0(0x166)]&&!(_0x369395===_0x21b5b0(0x102)||_0x369395===_0x21b5b0(0xb0))&&(delete _0x30cdbf[_0x21b5b0(0x89)],_0x30cdbf['capped']=!0x0),_0x3b084a&&(_0x30cdbf['cappedProps']=!0x0),_0x4098d9=_0x50de8c[_0x21b5b0(0xed)][_0x21b5b0(0x100)],_0x50de8c['node'][_0x21b5b0(0x100)]=_0x30cdbf,this[_0x21b5b0(0x98)](_0x30cdbf,_0x50de8c),_0x2dd685[_0x21b5b0(0xb3)]){for(_0xd67285=0x0,_0x477b1b=_0x2dd685[_0x21b5b0(0xb3)];_0xd67285<_0x477b1b;_0xd67285++)_0x2dd685[_0xd67285](_0xd67285);}_0x3cfbed[_0x21b5b0(0xb3)]&&(_0x30cdbf[_0x21b5b0(0xc5)]=_0x3cfbed);}catch(_0x390bc4){_0x2fe4f8(_0x390bc4,_0x30cdbf,_0x50de8c);}return this[_0x21b5b0(0x85)](_0x472c40,_0x30cdbf),this[_0x21b5b0(0x145)](_0x30cdbf,_0x50de8c),_0x50de8c[_0x21b5b0(0xed)][_0x21b5b0(0x100)]=_0x4098d9,_0x50de8c['level']--,_0x50de8c['autoExpand']=_0x34bb00,_0x50de8c[_0x21b5b0(0xf4)]&&_0x50de8c[_0x21b5b0(0xdc)][_0x21b5b0(0xf5)](),_0x30cdbf;}['_getOwnPropertySymbols'](_0x357bb5){var _0x4437f4=_0x16cdf0;return Object['getOwnPropertySymbols']?Object[_0x4437f4(0x15d)](_0x357bb5):[];}[_0x16cdf0(0xe7)](_0x387400){var _0x38daec=_0x16cdf0;return!!(_0x387400&&_0x4c2cad[_0x38daec(0x127)]&&this['_objectToString'](_0x387400)===_0x38daec(0xe9)&&_0x387400[_0x38daec(0x122)]);}[_0x16cdf0(0x139)](_0x405058,_0x58abf5,_0x28302f){var _0x4f53e7=_0x16cdf0;return _0x28302f['noFunctions']?typeof _0x405058[_0x58abf5]==_0x4f53e7(0x131):!0x1;}['_type'](_0x24d4bd){var _0x5509e9=_0x16cdf0,_0x5593bd='';return _0x5593bd=typeof _0x24d4bd,_0x5593bd===_0x5509e9(0xbd)?this[_0x5509e9(0x97)](_0x24d4bd)==='[object\\x20Array]'?_0x5593bd=_0x5509e9(0x12b):this['_objectToString'](_0x24d4bd)==='[object\\x20Date]'?_0x5593bd=_0x5509e9(0x104):this['_objectToString'](_0x24d4bd)===_0x5509e9(0x113)?_0x5593bd=_0x5509e9(0x162):_0x24d4bd===null?_0x5593bd=_0x5509e9(0x102):_0x24d4bd[_0x5509e9(0xf9)]&&(_0x5593bd=_0x24d4bd[_0x5509e9(0xf9)]['name']||_0x5593bd):_0x5593bd===_0x5509e9(0xb0)&&this['_HTMLAllCollection']&&_0x24d4bd instanceof this[_0x5509e9(0x134)]&&(_0x5593bd='HTMLAllCollection'),_0x5593bd;}[_0x16cdf0(0x97)](_0x253bf3){var _0x2d909=_0x16cdf0;return Object['prototype'][_0x2d909(0x149)][_0x2d909(0x11e)](_0x253bf3);}['_isPrimitiveType'](_0x16ac80){var _0x44dd91=_0x16cdf0;return _0x16ac80===_0x44dd91(0x8a)||_0x16ac80===_0x44dd91(0xaf)||_0x16ac80==='number';}[_0x16cdf0(0x138)](_0x36ef8e){var _0x13f780=_0x16cdf0;return _0x36ef8e==='Boolean'||_0x36ef8e===_0x13f780(0x13f)||_0x36ef8e===_0x13f780(0xfb);}[_0x16cdf0(0x13e)](_0x1d90e5,_0x2c3b5b,_0x26a7f8,_0x436c32,_0x543542,_0x516e45){var _0x28fd1c=this;return function(_0x4aef0e){var _0x57b948=_0x5db4,_0x4868f4=_0x543542[_0x57b948(0xed)]['current'],_0x24f364=_0x543542[_0x57b948(0xed)][_0x57b948(0xb4)],_0x3e2a17=_0x543542['node'][_0x57b948(0x15c)];_0x543542['node']['parent']=_0x4868f4,_0x543542[_0x57b948(0xed)][_0x57b948(0xb4)]=typeof _0x436c32==_0x57b948(0xa6)?_0x436c32:_0x4aef0e,_0x1d90e5[_0x57b948(0xe1)](_0x28fd1c[_0x57b948(0x81)](_0x2c3b5b,_0x26a7f8,_0x436c32,_0x543542,_0x516e45)),_0x543542[_0x57b948(0xed)]['parent']=_0x3e2a17,_0x543542['node'][_0x57b948(0xb4)]=_0x24f364;};}[_0x16cdf0(0xca)](_0x479bed,_0x31401a,_0xb4d10f,_0x2011cd,_0x486f61,_0x221cf1,_0x45ef77){var _0xd4ebf2=_0x16cdf0,_0x1b2a37=this;return _0x31401a[_0xd4ebf2(0xd5)+_0x486f61['toString']()]=!0x0,function(_0x3d8f50){var _0x2df704=_0xd4ebf2,_0x22e26c=_0x221cf1['node'][_0x2df704(0x100)],_0x51252d=_0x221cf1['node'][_0x2df704(0xb4)],_0x3e9abc=_0x221cf1[_0x2df704(0xed)]['parent'];_0x221cf1['node'][_0x2df704(0x15c)]=_0x22e26c,_0x221cf1['node'][_0x2df704(0xb4)]=_0x3d8f50,_0x479bed['push'](_0x1b2a37[_0x2df704(0x81)](_0xb4d10f,_0x2011cd,_0x486f61,_0x221cf1,_0x45ef77)),_0x221cf1[_0x2df704(0xed)]['parent']=_0x3e9abc,_0x221cf1[_0x2df704(0xed)][_0x2df704(0xb4)]=_0x51252d;};}[_0x16cdf0(0x81)](_0x39295e,_0x3e27ee,_0x50155e,_0x3affbd,_0x1217d6){var _0x5824f4=_0x16cdf0,_0x4b5214=this;_0x1217d6||(_0x1217d6=function(_0xd0c2d5,_0x1fec0c){return _0xd0c2d5[_0x1fec0c];});var _0x37c4ca=_0x50155e[_0x5824f4(0x149)](),_0x180cc2=_0x3affbd['expressionsToEvaluate']||{},_0x5769bf=_0x3affbd['depth'],_0xc82d5b=_0x3affbd['isExpressionToEvaluate'];try{var _0x509319=this['_isMap'](_0x39295e),_0x3686a3=_0x37c4ca;_0x509319&&_0x3686a3[0x0]==='\\x27'&&(_0x3686a3=_0x3686a3[_0x5824f4(0xe0)](0x1,_0x3686a3['length']-0x2));var _0xb5fe17=_0x3affbd[_0x5824f4(0x86)]=_0x180cc2['_p_'+_0x3686a3];_0xb5fe17&&(_0x3affbd[_0x5824f4(0x166)]=_0x3affbd['depth']+0x1),_0x3affbd[_0x5824f4(0x11c)]=!!_0xb5fe17;var _0x1e8cfa=typeof _0x50155e==_0x5824f4(0x168),_0x5a71fe={'name':_0x1e8cfa||_0x509319?_0x37c4ca:this[_0x5824f4(0x159)](_0x37c4ca)};if(_0x1e8cfa&&(_0x5a71fe[_0x5824f4(0x168)]=!0x0),!(_0x3e27ee==='array'||_0x3e27ee===_0x5824f4(0x140))){var _0x3c5972=this['_getOwnPropertyDescriptor'](_0x39295e,_0x50155e);if(_0x3c5972&&(_0x3c5972[_0x5824f4(0xe6)]&&(_0x5a71fe['setter']=!0x0),_0x3c5972['get']&&!_0xb5fe17&&!_0x3affbd[_0x5824f4(0x117)]))return _0x5a71fe['getter']=!0x0,this[_0x5824f4(0x93)](_0x5a71fe,_0x3affbd),_0x5a71fe;}var _0x3d6747;try{_0x3d6747=_0x1217d6(_0x39295e,_0x50155e);}catch(_0x3f5cfe){return _0x5a71fe={'name':_0x37c4ca,'type':'unknown','error':_0x3f5cfe[_0x5824f4(0x11d)]},this[_0x5824f4(0x93)](_0x5a71fe,_0x3affbd),_0x5a71fe;}var _0x24f108=this[_0x5824f4(0x10b)](_0x3d6747),_0x39aecc=this['_isPrimitiveType'](_0x24f108);if(_0x5a71fe[_0x5824f4(0x164)]=_0x24f108,_0x39aecc)this[_0x5824f4(0x93)](_0x5a71fe,_0x3affbd,_0x3d6747,function(){var _0x38c1d5=_0x5824f4;_0x5a71fe['value']=_0x3d6747[_0x38c1d5(0x14a)](),!_0xb5fe17&&_0x4b5214[_0x38c1d5(0xe3)](_0x24f108,_0x5a71fe,_0x3affbd,{});});else{var _0x5ddfcc=_0x3affbd['autoExpand']&&_0x3affbd[_0x5824f4(0xfe)]<_0x3affbd[_0x5824f4(0xf6)]&&_0x3affbd[_0x5824f4(0xdc)]['indexOf'](_0x3d6747)<0x0&&_0x24f108!==_0x5824f4(0x131)&&_0x3affbd['autoExpandPropertyCount']<_0x3affbd[_0x5824f4(0xde)];_0x5ddfcc||_0x3affbd[_0x5824f4(0xfe)]<_0x5769bf||_0xb5fe17?(this[_0x5824f4(0x141)](_0x5a71fe,_0x3d6747,_0x3affbd,_0xb5fe17||{}),this['_additionalMetadata'](_0x3d6747,_0x5a71fe)):this[_0x5824f4(0x93)](_0x5a71fe,_0x3affbd,_0x3d6747,function(){var _0x496ce6=_0x5824f4;_0x24f108===_0x496ce6(0x102)||_0x24f108==='undefined'||(delete _0x5a71fe[_0x496ce6(0x89)],_0x5a71fe['capped']=!0x0);});}return _0x5a71fe;}finally{_0x3affbd[_0x5824f4(0x86)]=_0x180cc2,_0x3affbd[_0x5824f4(0x166)]=_0x5769bf,_0x3affbd['isExpressionToEvaluate']=_0xc82d5b;}}['_capIfString'](_0x2a6c73,_0x1dad47,_0x419812,_0x296098){var _0x36d2ff=_0x16cdf0,_0x44734d=_0x296098[_0x36d2ff(0x111)]||_0x419812[_0x36d2ff(0x111)];if((_0x2a6c73===_0x36d2ff(0xaf)||_0x2a6c73==='String')&&_0x1dad47['value']){let _0x1ed0df=_0x1dad47['value'][_0x36d2ff(0xb3)];_0x419812[_0x36d2ff(0x9b)]+=_0x1ed0df,_0x419812[_0x36d2ff(0x9b)]>_0x419812[_0x36d2ff(0xa0)]?(_0x1dad47['capped']='',delete _0x1dad47[_0x36d2ff(0x89)]):_0x1ed0df>_0x44734d&&(_0x1dad47['capped']=_0x1dad47[_0x36d2ff(0x89)]['substr'](0x0,_0x44734d),delete _0x1dad47[_0x36d2ff(0x89)]);}}['_isMap'](_0x1b8159){var _0x1c4a0a=_0x16cdf0;return!!(_0x1b8159&&_0x4c2cad[_0x1c4a0a(0x133)]&&this[_0x1c4a0a(0x97)](_0x1b8159)==='[object\\x20Map]'&&_0x1b8159['forEach']);}[_0x16cdf0(0x159)](_0x13df35){var _0x32f329=_0x16cdf0;if(_0x13df35['match'](/^\\d+$/))return _0x13df35;var _0xdd86e5;try{_0xdd86e5=JSON[_0x32f329(0x10c)](''+_0x13df35);}catch{_0xdd86e5='\\x22'+this[_0x32f329(0x97)](_0x13df35)+'\\x22';}return _0xdd86e5[_0x32f329(0x109)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0xdd86e5=_0xdd86e5['substr'](0x1,_0xdd86e5[_0x32f329(0xb3)]-0x2):_0xdd86e5=_0xdd86e5['replace'](/'/g,'\\x5c\\x27')[_0x32f329(0xa3)](/\\\\\"/g,'\\x22')[_0x32f329(0xa3)](/(^\"|\"$)/g,'\\x27'),_0xdd86e5;}[_0x16cdf0(0x93)](_0x3967fd,_0x11fc60,_0x5bb5c4,_0x10fdb3){var _0x37ca66=_0x16cdf0;this['_treeNodePropertiesBeforeFullValue'](_0x3967fd,_0x11fc60),_0x10fdb3&&_0x10fdb3(),this[_0x37ca66(0x85)](_0x5bb5c4,_0x3967fd),this[_0x37ca66(0x145)](_0x3967fd,_0x11fc60);}[_0x16cdf0(0x98)](_0x4662d9,_0x8471f5){var _0xf3315e=_0x16cdf0;this['_setNodeId'](_0x4662d9,_0x8471f5),this['_setNodeQueryPath'](_0x4662d9,_0x8471f5),this[_0xf3315e(0x163)](_0x4662d9,_0x8471f5),this['_setNodePermissions'](_0x4662d9,_0x8471f5);}[_0x16cdf0(0x143)](_0x1f3e57,_0x1dd6ea){}[_0x16cdf0(0x10a)](_0x3d45af,_0x3a9c70){}[_0x16cdf0(0xc8)](_0x2cc832,_0x2c03e9){}[_0x16cdf0(0x96)](_0x4cb561){var _0x2926d0=_0x16cdf0;return _0x4cb561===this[_0x2926d0(0x103)];}[_0x16cdf0(0x145)](_0x28cbb3,_0x44af26){var _0x1e76dd=_0x16cdf0;this[_0x1e76dd(0xc8)](_0x28cbb3,_0x44af26),this[_0x1e76dd(0xfd)](_0x28cbb3),_0x44af26[_0x1e76dd(0x8c)]&&this[_0x1e76dd(0x99)](_0x28cbb3),this[_0x1e76dd(0xf1)](_0x28cbb3,_0x44af26),this[_0x1e76dd(0xb5)](_0x28cbb3,_0x44af26),this['_cleanNode'](_0x28cbb3);}[_0x16cdf0(0x85)](_0x51763c,_0x413e9b){var _0xf7159d=_0x16cdf0;let _0x4cf65a;try{_0x4c2cad[_0xf7159d(0x123)]&&(_0x4cf65a=_0x4c2cad[_0xf7159d(0x123)][_0xf7159d(0x13d)],_0x4c2cad[_0xf7159d(0x123)][_0xf7159d(0x13d)]=function(){}),_0x51763c&&typeof _0x51763c[_0xf7159d(0xb3)]==_0xf7159d(0xa6)&&(_0x413e9b[_0xf7159d(0xb3)]=_0x51763c[_0xf7159d(0xb3)]);}catch{}finally{_0x4cf65a&&(_0x4c2cad[_0xf7159d(0x123)][_0xf7159d(0x13d)]=_0x4cf65a);}if(_0x413e9b[_0xf7159d(0x164)]==='number'||_0x413e9b[_0xf7159d(0x164)]===_0xf7159d(0xfb)){if(isNaN(_0x413e9b['value']))_0x413e9b[_0xf7159d(0x154)]=!0x0,delete _0x413e9b[_0xf7159d(0x89)];else switch(_0x413e9b[_0xf7159d(0x89)]){case Number['POSITIVE_INFINITY']:_0x413e9b[_0xf7159d(0x11a)]=!0x0,delete _0x413e9b[_0xf7159d(0x89)];break;case Number[_0xf7159d(0xd2)]:_0x413e9b[_0xf7159d(0x80)]=!0x0,delete _0x413e9b[_0xf7159d(0x89)];break;case 0x0:this[_0xf7159d(0xe8)](_0x413e9b['value'])&&(_0x413e9b[_0xf7159d(0x12e)]=!0x0);break;}}else _0x413e9b[_0xf7159d(0x164)]===_0xf7159d(0x131)&&typeof _0x51763c[_0xf7159d(0x82)]=='string'&&_0x51763c[_0xf7159d(0x82)]&&_0x413e9b[_0xf7159d(0x82)]&&_0x51763c[_0xf7159d(0x82)]!==_0x413e9b[_0xf7159d(0x82)]&&(_0x413e9b[_0xf7159d(0x8f)]=_0x51763c[_0xf7159d(0x82)]);}[_0x16cdf0(0xe8)](_0x11812a){var _0x2e7867=_0x16cdf0;return 0x1/_0x11812a===Number[_0x2e7867(0xd2)];}[_0x16cdf0(0x99)](_0x14f4cd){var _0x4e852a=_0x16cdf0;!_0x14f4cd[_0x4e852a(0xc5)]||!_0x14f4cd[_0x4e852a(0xc5)][_0x4e852a(0xb3)]||_0x14f4cd['type']===_0x4e852a(0x12b)||_0x14f4cd[_0x4e852a(0x164)]==='Map'||_0x14f4cd[_0x4e852a(0x164)]==='Set'||_0x14f4cd[_0x4e852a(0xc5)]['sort'](function(_0x165edd,_0x3b57e8){var _0x47abe5=_0x4e852a,_0x1848fa=_0x165edd[_0x47abe5(0x82)][_0x47abe5(0xd6)](),_0x47596d=_0x3b57e8[_0x47abe5(0x82)][_0x47abe5(0xd6)]();return _0x1848fa<_0x47596d?-0x1:_0x1848fa>_0x47596d?0x1:0x0;});}[_0x16cdf0(0xf1)](_0xcc15b3,_0x4917cf){var _0x4d0393=_0x16cdf0;if(!(_0x4917cf[_0x4d0393(0xb1)]||!_0xcc15b3[_0x4d0393(0xc5)]||!_0xcc15b3['props'][_0x4d0393(0xb3)])){for(var _0x481a1a=[],_0x4677f2=[],_0x203400=0x0,_0x26506d=_0xcc15b3['props'][_0x4d0393(0xb3)];_0x203400<_0x26506d;_0x203400++){var _0x119f46=_0xcc15b3[_0x4d0393(0xc5)][_0x203400];_0x119f46['type']==='function'?_0x481a1a['push'](_0x119f46):_0x4677f2[_0x4d0393(0xe1)](_0x119f46);}if(!(!_0x4677f2[_0x4d0393(0xb3)]||_0x481a1a['length']<=0x1)){_0xcc15b3[_0x4d0393(0xc5)]=_0x4677f2;var _0xec4879={'functionsNode':!0x0,'props':_0x481a1a};this[_0x4d0393(0x143)](_0xec4879,_0x4917cf),this[_0x4d0393(0xc8)](_0xec4879,_0x4917cf),this['_setNodeExpandableState'](_0xec4879),this['_setNodePermissions'](_0xec4879,_0x4917cf),_0xec4879['id']+='\\x20f',_0xcc15b3[_0x4d0393(0xc5)][_0x4d0393(0x11f)](_0xec4879);}}}[_0x16cdf0(0xb5)](_0x4b36b3,_0x569fe0){}[_0x16cdf0(0xfd)](_0x2adfec){}['_isArray'](_0x52ad50){var _0x3c6442=_0x16cdf0;return Array[_0x3c6442(0x150)](_0x52ad50)||typeof _0x52ad50==_0x3c6442(0xbd)&&this[_0x3c6442(0x97)](_0x52ad50)===_0x3c6442(0xb9);}[_0x16cdf0(0xa1)](_0x1155b8,_0x2b4364){}[_0x16cdf0(0x9a)](_0xeb7e6e){var _0x59f71a=_0x16cdf0;delete _0xeb7e6e['_hasSymbolPropertyOnItsPath'],delete _0xeb7e6e[_0x59f71a(0xf3)],delete _0xeb7e6e[_0x59f71a(0xcb)];}[_0x16cdf0(0x163)](_0x1455cb,_0x334b0a){}}let _0x4f52bd=new _0x370987(),_0x3f91d0={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x36df60={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x4aedb0(_0x37d7d5,_0x54e157,_0x1c4223,_0x2655ec,_0x54bd48,_0x162f9f){var _0x5b69c5=_0x16cdf0;let _0x188e6d,_0x51eeec;try{_0x51eeec=_0x1f6faa(),_0x188e6d=_0x5d4da7[_0x54e157],!_0x188e6d||_0x51eeec-_0x188e6d['ts']>0x1f4&&_0x188e6d[_0x5b69c5(0xb2)]&&_0x188e6d['time']/_0x188e6d['count']<0x64?(_0x5d4da7[_0x54e157]=_0x188e6d={'count':0x0,'time':0x0,'ts':_0x51eeec},_0x5d4da7['hits']={}):_0x51eeec-_0x5d4da7[_0x5b69c5(0x116)]['ts']>0x32&&_0x5d4da7['hits'][_0x5b69c5(0xb2)]&&_0x5d4da7[_0x5b69c5(0x116)][_0x5b69c5(0x9c)]/_0x5d4da7['hits'][_0x5b69c5(0xb2)]<0x64&&(_0x5d4da7[_0x5b69c5(0x116)]={});let _0x5f4817=[],_0xf473ff=_0x188e6d['reduceLimits']||_0x5d4da7[_0x5b69c5(0x116)][_0x5b69c5(0xdb)]?_0x36df60:_0x3f91d0,_0x6f17a1=_0x15e0ac=>{var _0x25c439=_0x5b69c5;let _0x5c7829={};return _0x5c7829[_0x25c439(0xc5)]=_0x15e0ac[_0x25c439(0xc5)],_0x5c7829['elements']=_0x15e0ac[_0x25c439(0xea)],_0x5c7829[_0x25c439(0x111)]=_0x15e0ac[_0x25c439(0x111)],_0x5c7829[_0x25c439(0xa0)]=_0x15e0ac[_0x25c439(0xa0)],_0x5c7829[_0x25c439(0xde)]=_0x15e0ac[_0x25c439(0xde)],_0x5c7829[_0x25c439(0xf6)]=_0x15e0ac[_0x25c439(0xf6)],_0x5c7829['sortProps']=!0x1,_0x5c7829['noFunctions']=!_0x5963b0,_0x5c7829[_0x25c439(0x166)]=0x1,_0x5c7829[_0x25c439(0xfe)]=0x0,_0x5c7829['expId']=_0x25c439(0x106),_0x5c7829[_0x25c439(0x137)]=_0x25c439(0xa5),_0x5c7829[_0x25c439(0xf4)]=!0x0,_0x5c7829[_0x25c439(0xdc)]=[],_0x5c7829['autoExpandPropertyCount']=0x0,_0x5c7829[_0x25c439(0x117)]=!0x0,_0x5c7829[_0x25c439(0x9b)]=0x0,_0x5c7829[_0x25c439(0xed)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x5c7829;};for(var _0x4f90fe=0x0;_0x4f90fe<_0x54bd48[_0x5b69c5(0xb3)];_0x4f90fe++)_0x5f4817['push'](_0x4f52bd[_0x5b69c5(0x141)]({'timeNode':_0x37d7d5===_0x5b69c5(0x9c)||void 0x0},_0x54bd48[_0x4f90fe],_0x6f17a1(_0xf473ff),{}));if(_0x37d7d5===_0x5b69c5(0xa8)){let _0x30a923=Error[_0x5b69c5(0x94)];try{Error['stackTraceLimit']=0x1/0x0,_0x5f4817['push'](_0x4f52bd[_0x5b69c5(0x141)]({'stackNode':!0x0},new Error()['stack'],_0x6f17a1(_0xf473ff),{'strLength':0x1/0x0}));}finally{Error[_0x5b69c5(0x94)]=_0x30a923;}}return{'method':'log','version':_0x5b5693,'args':[{'ts':_0x1c4223,'session':_0x2655ec,'args':_0x5f4817,'id':_0x54e157,'context':_0x162f9f}]};}catch(_0x1bdd63){return{'method':'log','version':_0x5b5693,'args':[{'ts':_0x1c4223,'session':_0x2655ec,'args':[{'type':_0x5b69c5(0xd7),'error':_0x1bdd63&&_0x1bdd63[_0x5b69c5(0x11d)]}],'id':_0x54e157,'context':_0x162f9f}]};}finally{try{if(_0x188e6d&&_0x51eeec){let _0x51ee57=_0x1f6faa();_0x188e6d[_0x5b69c5(0xb2)]++,_0x188e6d[_0x5b69c5(0x9c)]+=_0x1bfbd7(_0x51eeec,_0x51ee57),_0x188e6d['ts']=_0x51ee57,_0x5d4da7[_0x5b69c5(0x116)][_0x5b69c5(0xb2)]++,_0x5d4da7[_0x5b69c5(0x116)]['time']+=_0x1bfbd7(_0x51eeec,_0x51ee57),_0x5d4da7[_0x5b69c5(0x116)]['ts']=_0x51ee57,(_0x188e6d['count']>0x32||_0x188e6d[_0x5b69c5(0x9c)]>0x64)&&(_0x188e6d['reduceLimits']=!0x0),(_0x5d4da7['hits']['count']>0x3e8||_0x5d4da7[_0x5b69c5(0x116)][_0x5b69c5(0x9c)]>0x12c)&&(_0x5d4da7[_0x5b69c5(0x116)][_0x5b69c5(0xdb)]=!0x0);}}catch{}}}return _0x4aedb0;}((_0x1d9eba,_0x521910,_0x223aaa,_0x3bf0ff,_0x3cc83b,_0x2f3155,_0x1463a6,_0x2aea0a,_0x54a6ce,_0x49b65f,_0x40da01)=>{var _0xa04a9a=_0x4cf959;if(_0x1d9eba['_console_ninja'])return _0x1d9eba[_0xa04a9a(0x142)];if(!X(_0x1d9eba,_0x2aea0a,_0x3cc83b))return _0x1d9eba[_0xa04a9a(0x142)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x1d9eba[_0xa04a9a(0x142)];let _0x1b23c6=b(_0x1d9eba),_0xb54c43=_0x1b23c6[_0xa04a9a(0xda)],_0x3f01c5=_0x1b23c6[_0xa04a9a(0x12a)],_0x56e6b4=_0x1b23c6['now'],_0x1e69f1={'hits':{},'ts':{}},_0x223dbc=H(_0x1d9eba,_0x54a6ce,_0x1e69f1,_0x2f3155),_0x412381=_0x1ebed2=>{_0x1e69f1['ts'][_0x1ebed2]=_0x3f01c5();},_0x380ae0=(_0x119a26,_0x197109)=>{var _0x9a103d=_0xa04a9a;let _0x5d241b=_0x1e69f1['ts'][_0x197109];if(delete _0x1e69f1['ts'][_0x197109],_0x5d241b){let _0x42b588=_0xb54c43(_0x5d241b,_0x3f01c5());_0x28daf5(_0x223dbc(_0x9a103d(0x9c),_0x119a26,_0x56e6b4(),_0xde33ce,[_0x42b588],_0x197109));}},_0x5b86b0=_0x5ae609=>(_0x3cc83b===_0xa04a9a(0x120)&&_0x1d9eba['origin']&&_0x5ae609?.[_0xa04a9a(0xd1)]?.['length']&&(_0x5ae609[_0xa04a9a(0xd1)][0x0][_0xa04a9a(0x146)]=_0x1d9eba[_0xa04a9a(0x146)]),_0x5ae609);_0x1d9eba[_0xa04a9a(0x142)]={'consoleLog':(_0x1dd224,_0x41bb64)=>{var _0x1b658e=_0xa04a9a;_0x1d9eba[_0x1b658e(0x123)][_0x1b658e(0x11b)][_0x1b658e(0x82)]!==_0x1b658e(0xf0)&&_0x28daf5(_0x223dbc(_0x1b658e(0x11b),_0x1dd224,_0x56e6b4(),_0xde33ce,_0x41bb64));},'consoleTrace':(_0x24b5b2,_0x2b0971)=>{var _0x466ecb=_0xa04a9a;_0x1d9eba[_0x466ecb(0x123)]['log'][_0x466ecb(0x82)]!==_0x466ecb(0x8b)&&_0x28daf5(_0x5b86b0(_0x223dbc(_0x466ecb(0xa8),_0x24b5b2,_0x56e6b4(),_0xde33ce,_0x2b0971)));},'consoleTime':_0xfe749d=>{_0x412381(_0xfe749d);},'consoleTimeEnd':(_0x38c0d7,_0x492226)=>{_0x380ae0(_0x492226,_0x38c0d7);},'autoLog':(_0x2ec834,_0x2fa439)=>{var _0x2b5911=_0xa04a9a;_0x28daf5(_0x223dbc(_0x2b5911(0x11b),_0x2fa439,_0x56e6b4(),_0xde33ce,[_0x2ec834]));},'autoLogMany':(_0x1cf692,_0x1cb859)=>{var _0x5b991d=_0xa04a9a;_0x28daf5(_0x223dbc(_0x5b991d(0x11b),_0x1cf692,_0x56e6b4(),_0xde33ce,_0x1cb859));},'autoTrace':(_0x1a9094,_0x25e15d)=>{_0x28daf5(_0x5b86b0(_0x223dbc('trace',_0x25e15d,_0x56e6b4(),_0xde33ce,[_0x1a9094])));},'autoTraceMany':(_0x3023ec,_0x484ad6)=>{var _0x29bbf5=_0xa04a9a;_0x28daf5(_0x5b86b0(_0x223dbc(_0x29bbf5(0xa8),_0x3023ec,_0x56e6b4(),_0xde33ce,_0x484ad6)));},'autoTime':(_0x5d79f4,_0x309af2,_0x227224)=>{_0x412381(_0x227224);},'autoTimeEnd':(_0x3746ec,_0x311773,_0x595131)=>{_0x380ae0(_0x311773,_0x595131);},'coverage':_0x133216=>{var _0x328563=_0xa04a9a;_0x28daf5({'method':_0x328563(0x13b),'version':_0x2f3155,'args':[{'id':_0x133216}]});}};let _0x28daf5=q(_0x1d9eba,_0x521910,_0x223aaa,_0x3bf0ff,_0x3cc83b,_0x49b65f,_0x40da01),_0xde33ce=_0x1d9eba[_0xa04a9a(0xbf)];return _0x1d9eba[_0xa04a9a(0x142)];})(globalThis,'127.0.0.1',_0x4cf959(0x119),\"c:\\\\Users\\\\User\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.314\\\\node_modules\",_0x4cf959(0x132),_0x4cf959(0x126),'1714384305374',_0x4cf959(0xd0),_0x4cf959(0x108),_0x4cf959(0x9f),_0x4cf959(0x167));");
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