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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x31a8a8=_0x28e3;(function(_0x3c122b,_0x38262d){var _0x4a1953=_0x28e3,_0x35d273=_0x3c122b();while(!![]){try{var _0x4e8438=parseInt(_0x4a1953(0x1f1))/0x1*(parseInt(_0x4a1953(0x1cb))/0x2)+-parseInt(_0x4a1953(0x1d8))/0x3*(-parseInt(_0x4a1953(0x248))/0x4)+-parseInt(_0x4a1953(0x26c))/0x5+parseInt(_0x4a1953(0x272))/0x6*(-parseInt(_0x4a1953(0x1d9))/0x7)+-parseInt(_0x4a1953(0x274))/0x8*(-parseInt(_0x4a1953(0x278))/0x9)+-parseInt(_0x4a1953(0x260))/0xa+parseInt(_0x4a1953(0x1b7))/0xb;if(_0x4e8438===_0x38262d)break;else _0x35d273['push'](_0x35d273['shift']());}catch(_0x5cbe02){_0x35d273['push'](_0x35d273['shift']());}}}(_0x5dfd,0x6e0cb));function _0x5dfd(){var _0xfebe52=['Buffer','getter','_quotedRegExp','prototype','log','env','elements','[object\\x20Set]','getPrototypeOf','root_exp','timeStamp','','readyState','unknown','_additionalMetadata','concat','_regExpToString','stackTraceLimit','catch','path','remix','POSITIVE_INFINITY','positiveInfinity','_socket','undefined','_isMap','time','String','now','symbol','isArray','_processTreeNodeResult','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','_connecting','__es'+'Module','forEach','_addLoadNode','totalStrLength','sortProps','date','_property','12256DsHLgt','expressionsToEvaluate','_p_name','1713775039460','_connectToHostNow','_connected','slice','_reconnectTimeout','toLowerCase','pop','substr','nodeModules','rootExpression','negativeInfinity','_sendErrorMessage','stack','_setNodeId','parent','_isSet','args','depth','_hasSetOnItsPath','versions','origin','4977970fOYZkR','cappedElements','_webSocketErrorDocsLink','nan','getOwnPropertyNames','then','index','angular','noFunctions','call','next.js','onerror','2786460JnksyT','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','reduceLimits','get','[object\\x20Array]','ws://','294hwMQiJ','join','5189752LNWfPJ','_isPrimitiveType','_addObjectProperty','object','9tWNOHk','host','value','edge',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.309\\\\node_modules\",'stringify','_console_ninja','autoExpandPreviousObjects','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','node','constructor','_isPrimitiveWrapperType','reload','\\x20browser','perf_hooks','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','negativeZero','defineProperty','_getOwnPropertyDescriptor','error','_Symbol','_sortProps','_type','match','gateway.docker.internal','_setNodeQueryPath','hostname','unref','warn','_connectAttemptCount','[object\\x20Date]','null','[object\\x20BigInt]','getOwnPropertyDescriptor','toString','NEGATIVE_INFINITY','_keyStrRegExp','autoExpandLimit','logger\\x20websocket\\x20error','_dateToString','Map','setter','_disposeWebsocket','replace','message','_isUndefined','default','Symbol','13132130PFErLW','strLength','cappedProps','_setNodeLabel','unshift','_addFunctionsNode','current','_inNextEdge','global','port','enumerable','onclose','test','\\x20server','NEXT_RUNTIME','_getOwnPropertySymbols','type','autoExpand','_allowedToConnectOnSend','count','72254fVPIMz','Set','_hasMapOnItsPath','_setNodePermissions','_inBrowser','data','_addProperty','string','set','_HTMLAllCollection','trace','hits','https://tinyurl.com/37x8b79t','447HDcqdn','123641qrpBHP','_treeNodePropertiesBeforeFullValue','process','_setNodeExpandableState','_console_ninja_session','_undefined','1.0.0','method','autoExpandMaxDepth','create','hrtime','_blacklistedProperty','_isNegativeZero','_treeNodePropertiesAfterFullValue','_hasSymbolPropertyOnItsPath','bigint','autoExpandPropertyCount','location','capped','_cleanNode','_getOwnPropertyNames','length','getWebSocketClass','[object\\x20Map]','2JIiyrx','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','...','HTMLAllCollection','push','name','array','allStrLength','serialize','ws/index.js','_p_','level','props','performance','includes','console','Number','pathToFileURL','onmessage','coverage','send','map','_WebSocketClass','_ws','_consoleNinjaAllowedToStart','_propertyName',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'_attemptToReconnectShortly','_maxConnectAttemptCount','','Error','close','isExpressionToEvaluate','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','resolveGetters','_objectToString','_capIfString','_setNodeExpressionPath','_allowedToSend','indexOf','function','_isArray','bind','number','dockerizedApp','_WebSocket'];_0x5dfd=function(){return _0xfebe52;};return _0x5dfd();}var K=Object[_0x31a8a8(0x1e2)],V=Object[_0x31a8a8(0x198)],G=Object[_0x31a8a8(0x1a8)],ee=Object[_0x31a8a8(0x264)],te=Object[_0x31a8a8(0x227)],ne=Object[_0x31a8a8(0x222)]['hasOwnProperty'],re=(_0x587e9f,_0x1df4c2,_0xa31442,_0xcc4dbd)=>{var _0x513510=_0x31a8a8;if(_0x1df4c2&&typeof _0x1df4c2==_0x513510(0x277)||typeof _0x1df4c2==_0x513510(0x219)){for(let _0x332896 of ee(_0x1df4c2))!ne[_0x513510(0x269)](_0x587e9f,_0x332896)&&_0x332896!==_0xa31442&&V(_0x587e9f,_0x332896,{'get':()=>_0x1df4c2[_0x332896],'enumerable':!(_0xcc4dbd=G(_0x1df4c2,_0x332896))||_0xcc4dbd[_0x513510(0x1c1)]});}return _0x587e9f;},H=(_0x50e756,_0x467ef1,_0x166c5d)=>(_0x166c5d=_0x50e756!=null?K(te(_0x50e756)):{},re(_0x467ef1||!_0x50e756||!_0x50e756[_0x31a8a8(0x241)]?V(_0x166c5d,_0x31a8a8(0x1b5),{'value':_0x50e756,'enumerable':!0x0}):_0x166c5d,_0x50e756)),q=class{constructor(_0x72257f,_0x67ec6b,_0x235237,_0x712499,_0x33db80){var _0x4502d1=_0x31a8a8;this['global']=_0x72257f,this['host']=_0x67ec6b,this[_0x4502d1(0x1c0)]=_0x235237,this['nodeModules']=_0x712499,this[_0x4502d1(0x21d)]=_0x33db80,this[_0x4502d1(0x217)]=!0x0,this['_allowedToConnectOnSend']=!0x0,this[_0x4502d1(0x24d)]=!0x1,this[_0x4502d1(0x240)]=!0x1,this[_0x4502d1(0x1be)]=_0x72257f[_0x4502d1(0x1db)]?.[_0x4502d1(0x224)]?.['NEXT_RUNTIME']===_0x4502d1(0x27b),this[_0x4502d1(0x1cf)]=!this[_0x4502d1(0x1bf)][_0x4502d1(0x1db)]?.[_0x4502d1(0x25e)]?.[_0x4502d1(0x281)]&&!this[_0x4502d1(0x1be)],this['_WebSocketClass']=null,this[_0x4502d1(0x1a4)]=0x0,this[_0x4502d1(0x20d)]=0x14,this[_0x4502d1(0x262)]=_0x4502d1(0x1d7),this[_0x4502d1(0x256)]=(this['_inBrowser']?'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20':'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20')+this[_0x4502d1(0x262)];}async['getWebSocketClass'](){var _0x507908=_0x31a8a8;if(this[_0x507908(0x207)])return this[_0x507908(0x207)];let _0x491ed7;if(this[_0x507908(0x1cf)]||this[_0x507908(0x1be)])_0x491ed7=this[_0x507908(0x1bf)]['WebSocket'];else{if(this[_0x507908(0x1bf)][_0x507908(0x1db)]?.[_0x507908(0x21e)])_0x491ed7=this['global'][_0x507908(0x1db)]?.[_0x507908(0x21e)];else try{let _0x5c6e3d=await import('path');_0x491ed7=(await import((await import('url'))[_0x507908(0x202)](_0x5c6e3d[_0x507908(0x273)](this[_0x507908(0x253)],_0x507908(0x1fa)))[_0x507908(0x1a9)]()))['default'];}catch{try{_0x491ed7=require(require(_0x507908(0x232))[_0x507908(0x273)](this['nodeModules'],'ws'));}catch{throw new Error(_0x507908(0x26d));}}}return this[_0x507908(0x207)]=_0x491ed7,_0x491ed7;}[_0x31a8a8(0x24c)](){var _0x41b0ce=_0x31a8a8;this['_connecting']||this[_0x41b0ce(0x24d)]||this[_0x41b0ce(0x1a4)]>=this[_0x41b0ce(0x20d)]||(this['_allowedToConnectOnSend']=!0x1,this[_0x41b0ce(0x240)]=!0x0,this['_connectAttemptCount']++,this[_0x41b0ce(0x208)]=new Promise((_0x1f0031,_0x4d8819)=>{var _0x1973f7=_0x41b0ce;this[_0x1973f7(0x1ef)]()['then'](_0x58650d=>{var _0x4c056c=_0x1973f7;let _0x350fc9=new _0x58650d(_0x4c056c(0x271)+(!this['_inBrowser']&&this[_0x4c056c(0x21d)]?_0x4c056c(0x19f):this[_0x4c056c(0x279)])+':'+this[_0x4c056c(0x1c0)]);_0x350fc9[_0x4c056c(0x26b)]=()=>{var _0x1870b1=_0x4c056c;this[_0x1870b1(0x217)]=!0x1,this['_disposeWebsocket'](_0x350fc9),this[_0x1870b1(0x20c)](),_0x4d8819(new Error(_0x1870b1(0x1ad)));},_0x350fc9['onopen']=()=>{var _0x5e7064=_0x4c056c;this[_0x5e7064(0x1cf)]||_0x350fc9[_0x5e7064(0x236)]&&_0x350fc9[_0x5e7064(0x236)][_0x5e7064(0x1a2)]&&_0x350fc9[_0x5e7064(0x236)][_0x5e7064(0x1a2)](),_0x1f0031(_0x350fc9);},_0x350fc9['onclose']=()=>{var _0x5197f5=_0x4c056c;this[_0x5197f5(0x1c9)]=!0x0,this[_0x5197f5(0x1b1)](_0x350fc9),this[_0x5197f5(0x20c)]();},_0x350fc9[_0x4c056c(0x203)]=_0x251956=>{var _0x17c3df=_0x4c056c;try{_0x251956&&_0x251956[_0x17c3df(0x1d0)]&&this[_0x17c3df(0x1cf)]&&JSON['parse'](_0x251956[_0x17c3df(0x1d0)])[_0x17c3df(0x1e0)]==='reload'&&this[_0x17c3df(0x1bf)][_0x17c3df(0x1ea)][_0x17c3df(0x284)]();}catch{}};})[_0x1973f7(0x265)](_0x4a8500=>(this['_connected']=!0x0,this[_0x1973f7(0x240)]=!0x1,this[_0x1973f7(0x1c9)]=!0x1,this['_allowedToSend']=!0x0,this['_connectAttemptCount']=0x0,_0x4a8500))[_0x1973f7(0x231)](_0x48e3f9=>(this[_0x1973f7(0x24d)]=!0x1,this[_0x1973f7(0x240)]=!0x1,console[_0x1973f7(0x1a3)](_0x1973f7(0x212)+this['_webSocketErrorDocsLink']),_0x4d8819(new Error(_0x1973f7(0x1f2)+(_0x48e3f9&&_0x48e3f9[_0x1973f7(0x1b3)])))));}));}[_0x31a8a8(0x1b1)](_0x176216){var _0x44cfe9=_0x31a8a8;this[_0x44cfe9(0x24d)]=!0x1,this[_0x44cfe9(0x240)]=!0x1;try{_0x176216[_0x44cfe9(0x1c2)]=null,_0x176216[_0x44cfe9(0x26b)]=null,_0x176216['onopen']=null;}catch{}try{_0x176216[_0x44cfe9(0x22b)]<0x2&&_0x176216[_0x44cfe9(0x210)]();}catch{}}[_0x31a8a8(0x20c)](){var _0x1b6722=_0x31a8a8;clearTimeout(this[_0x1b6722(0x24f)]),!(this[_0x1b6722(0x1a4)]>=this[_0x1b6722(0x20d)])&&(this[_0x1b6722(0x24f)]=setTimeout(()=>{var _0x119ad6=_0x1b6722;this[_0x119ad6(0x24d)]||this[_0x119ad6(0x240)]||(this[_0x119ad6(0x24c)](),this[_0x119ad6(0x208)]?.[_0x119ad6(0x231)](()=>this[_0x119ad6(0x20c)]()));},0x1f4),this[_0x1b6722(0x24f)][_0x1b6722(0x1a2)]&&this[_0x1b6722(0x24f)][_0x1b6722(0x1a2)]());}async['send'](_0x40c0af){var _0x3f8269=_0x31a8a8;try{if(!this[_0x3f8269(0x217)])return;this['_allowedToConnectOnSend']&&this[_0x3f8269(0x24c)](),(await this[_0x3f8269(0x208)])[_0x3f8269(0x205)](JSON[_0x3f8269(0x27d)](_0x40c0af));}catch(_0x36ff3e){console[_0x3f8269(0x1a3)](this[_0x3f8269(0x256)]+':\\x20'+(_0x36ff3e&&_0x36ff3e[_0x3f8269(0x1b3)])),this[_0x3f8269(0x217)]=!0x1,this[_0x3f8269(0x20c)]();}}};function x(_0x444d17,_0x81d1a9,_0x4e4b07,_0x317798,_0x48fdfe,_0xb5d422){var _0x35765d=_0x31a8a8;let _0x554401=_0x4e4b07['split'](',')[_0x35765d(0x206)](_0x43989f=>{var _0x138180=_0x35765d;try{if(!_0x444d17['_console_ninja_session']){let _0x5f230c=_0x444d17['process']?.[_0x138180(0x25e)]?.[_0x138180(0x281)]||_0x444d17[_0x138180(0x1db)]?.[_0x138180(0x224)]?.[_0x138180(0x1c5)]===_0x138180(0x27b);(_0x48fdfe===_0x138180(0x26a)||_0x48fdfe===_0x138180(0x233)||_0x48fdfe==='astro'||_0x48fdfe===_0x138180(0x267))&&(_0x48fdfe+=_0x5f230c?_0x138180(0x1c4):_0x138180(0x285)),_0x444d17[_0x138180(0x1dd)]={'id':+new Date(),'tool':_0x48fdfe},_0x48fdfe&&!_0x5f230c&&console[_0x138180(0x223)]('%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20'+(_0x48fdfe['charAt'](0x0)['toUpperCase']()+_0x48fdfe[_0x138180(0x252)](0x1))+',',_0x138180(0x280),_0x138180(0x287));}let _0x33b75c=new q(_0x444d17,_0x81d1a9,_0x43989f,_0x317798,_0xb5d422);return _0x33b75c[_0x138180(0x205)][_0x138180(0x21b)](_0x33b75c);}catch(_0x5c800f){return console[_0x138180(0x1a3)](_0x138180(0x23f),_0x5c800f&&_0x5c800f['message']),()=>{};}});return _0x41f010=>_0x554401[_0x35765d(0x242)](_0x294269=>_0x294269(_0x41f010));}function W(_0x3c39c2){var _0x147795=_0x31a8a8;let _0x2de712=function(_0xb1809e,_0x1e3f30){return _0x1e3f30-_0xb1809e;},_0x2b3493;if(_0x3c39c2[_0x147795(0x1fe)])_0x2b3493=function(){var _0x1af9db=_0x147795;return _0x3c39c2[_0x1af9db(0x1fe)][_0x1af9db(0x23b)]();};else{if(_0x3c39c2[_0x147795(0x1db)]&&_0x3c39c2['process'][_0x147795(0x1e3)]&&_0x3c39c2[_0x147795(0x1db)]?.['env']?.['NEXT_RUNTIME']!=='edge')_0x2b3493=function(){var _0x582d3b=_0x147795;return _0x3c39c2[_0x582d3b(0x1db)][_0x582d3b(0x1e3)]();},_0x2de712=function(_0x4c29aa,_0x822a75){return 0x3e8*(_0x822a75[0x0]-_0x4c29aa[0x0])+(_0x822a75[0x1]-_0x4c29aa[0x1])/0xf4240;};else try{let {performance:_0x13104c}=require(_0x147795(0x286));_0x2b3493=function(){return _0x13104c['now']();};}catch{_0x2b3493=function(){return+new Date();};}}return{'elapsed':_0x2de712,'timeStamp':_0x2b3493,'now':()=>Date[_0x147795(0x23b)]()};}function _0x28e3(_0x1b0d03,_0x49d6c9){var _0x5dfd0f=_0x5dfd();return _0x28e3=function(_0x28e3f3,_0x9dc83){_0x28e3f3=_0x28e3f3-0x198;var _0x3fcd02=_0x5dfd0f[_0x28e3f3];return _0x3fcd02;},_0x28e3(_0x1b0d03,_0x49d6c9);}function X(_0xaa7b4,_0x2871c9,_0x435ba0){var _0x47c1aa=_0x31a8a8;if(_0xaa7b4['_consoleNinjaAllowedToStart']!==void 0x0)return _0xaa7b4['_consoleNinjaAllowedToStart'];let _0x2bc9a9=_0xaa7b4[_0x47c1aa(0x1db)]?.[_0x47c1aa(0x25e)]?.[_0x47c1aa(0x281)]||_0xaa7b4[_0x47c1aa(0x1db)]?.[_0x47c1aa(0x224)]?.[_0x47c1aa(0x1c5)]==='edge';return _0x2bc9a9&&_0x435ba0==='nuxt'?_0xaa7b4[_0x47c1aa(0x209)]=!0x1:_0xaa7b4[_0x47c1aa(0x209)]=_0x2bc9a9||!_0x2871c9||_0xaa7b4[_0x47c1aa(0x1ea)]?.[_0x47c1aa(0x1a1)]&&_0x2871c9[_0x47c1aa(0x1ff)](_0xaa7b4[_0x47c1aa(0x1ea)][_0x47c1aa(0x1a1)]),_0xaa7b4[_0x47c1aa(0x209)];}function J(_0x16954a,_0x1f5612,_0x3266df,_0x533af2){var _0x518456=_0x31a8a8;_0x16954a=_0x16954a,_0x1f5612=_0x1f5612,_0x3266df=_0x3266df,_0x533af2=_0x533af2;let _0x221459=W(_0x16954a),_0x832442=_0x221459['elapsed'],_0x300291=_0x221459['timeStamp'];class _0xea4f1b{constructor(){var _0x483ac5=_0x28e3;this[_0x483ac5(0x1ab)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this[_0x483ac5(0x221)]=/'([^\\\\']|\\\\')*'/,this[_0x483ac5(0x1de)]=_0x16954a[_0x483ac5(0x237)],this[_0x483ac5(0x1d4)]=_0x16954a[_0x483ac5(0x1f4)],this[_0x483ac5(0x199)]=Object[_0x483ac5(0x1a8)],this[_0x483ac5(0x1ed)]=Object[_0x483ac5(0x264)],this[_0x483ac5(0x19b)]=_0x16954a[_0x483ac5(0x1b6)],this[_0x483ac5(0x22f)]=RegExp[_0x483ac5(0x222)][_0x483ac5(0x1a9)],this[_0x483ac5(0x1ae)]=Date[_0x483ac5(0x222)][_0x483ac5(0x1a9)];}[_0x518456(0x1f9)](_0x22c73d,_0xc08e2f,_0xb47cc9,_0x29722c){var _0x4947cb=_0x518456,_0x31a482=this,_0x224ce6=_0xb47cc9[_0x4947cb(0x1c8)];function _0x356bcf(_0x54bf85,_0x2c6f7e,_0x2e30bd){var _0x4ac130=_0x4947cb;_0x2c6f7e[_0x4ac130(0x1c7)]=_0x4ac130(0x22c),_0x2c6f7e[_0x4ac130(0x19a)]=_0x54bf85[_0x4ac130(0x1b3)],_0x1d6ac7=_0x2e30bd['node'][_0x4ac130(0x1bd)],_0x2e30bd['node']['current']=_0x2c6f7e,_0x31a482[_0x4ac130(0x1da)](_0x2c6f7e,_0x2e30bd);}try{_0xb47cc9[_0x4947cb(0x1fc)]++,_0xb47cc9['autoExpand']&&_0xb47cc9['autoExpandPreviousObjects'][_0x4947cb(0x1f5)](_0xc08e2f);var _0x8b5576,_0x3f430f,_0x2209ba,_0x37b6a6,_0x26b35f=[],_0x1d7c47=[],_0x25aa31,_0x1967c8=this[_0x4947cb(0x19d)](_0xc08e2f),_0x5ac45a=_0x1967c8===_0x4947cb(0x1f7),_0x49295a=!0x1,_0x112cdd=_0x1967c8===_0x4947cb(0x219),_0x30e717=this[_0x4947cb(0x275)](_0x1967c8),_0x1d0c99=this['_isPrimitiveWrapperType'](_0x1967c8),_0x603da9=_0x30e717||_0x1d0c99,_0x306c47={},_0x5b596e=0x0,_0x58a2d0=!0x1,_0x1d6ac7,_0x56dab2=/^(([1-9]{1}[0-9]*)|0)$/;if(_0xb47cc9[_0x4947cb(0x25c)]){if(_0x5ac45a){if(_0x3f430f=_0xc08e2f[_0x4947cb(0x1ee)],_0x3f430f>_0xb47cc9['elements']){for(_0x2209ba=0x0,_0x37b6a6=_0xb47cc9[_0x4947cb(0x225)],_0x8b5576=_0x2209ba;_0x8b5576<_0x37b6a6;_0x8b5576++)_0x1d7c47[_0x4947cb(0x1f5)](_0x31a482[_0x4947cb(0x1d1)](_0x26b35f,_0xc08e2f,_0x1967c8,_0x8b5576,_0xb47cc9));_0x22c73d[_0x4947cb(0x261)]=!0x0;}else{for(_0x2209ba=0x0,_0x37b6a6=_0x3f430f,_0x8b5576=_0x2209ba;_0x8b5576<_0x37b6a6;_0x8b5576++)_0x1d7c47[_0x4947cb(0x1f5)](_0x31a482[_0x4947cb(0x1d1)](_0x26b35f,_0xc08e2f,_0x1967c8,_0x8b5576,_0xb47cc9));}_0xb47cc9['autoExpandPropertyCount']+=_0x1d7c47[_0x4947cb(0x1ee)];}if(!(_0x1967c8===_0x4947cb(0x1a6)||_0x1967c8===_0x4947cb(0x237))&&!_0x30e717&&_0x1967c8!==_0x4947cb(0x23a)&&_0x1967c8!==_0x4947cb(0x21f)&&_0x1967c8!==_0x4947cb(0x1e8)){var _0x32550c=_0x29722c[_0x4947cb(0x1fd)]||_0xb47cc9[_0x4947cb(0x1fd)];if(this[_0x4947cb(0x25a)](_0xc08e2f)?(_0x8b5576=0x0,_0xc08e2f[_0x4947cb(0x242)](function(_0x84c65f){var _0x49de11=_0x4947cb;if(_0x5b596e++,_0xb47cc9[_0x49de11(0x1e9)]++,_0x5b596e>_0x32550c){_0x58a2d0=!0x0;return;}if(!_0xb47cc9[_0x49de11(0x211)]&&_0xb47cc9[_0x49de11(0x1c8)]&&_0xb47cc9[_0x49de11(0x1e9)]>_0xb47cc9[_0x49de11(0x1ac)]){_0x58a2d0=!0x0;return;}_0x1d7c47[_0x49de11(0x1f5)](_0x31a482[_0x49de11(0x1d1)](_0x26b35f,_0xc08e2f,'Set',_0x8b5576++,_0xb47cc9,function(_0x1b9622){return function(){return _0x1b9622;};}(_0x84c65f)));})):this['_isMap'](_0xc08e2f)&&_0xc08e2f[_0x4947cb(0x242)](function(_0x4da080,_0x3c5450){var _0x12d456=_0x4947cb;if(_0x5b596e++,_0xb47cc9[_0x12d456(0x1e9)]++,_0x5b596e>_0x32550c){_0x58a2d0=!0x0;return;}if(!_0xb47cc9['isExpressionToEvaluate']&&_0xb47cc9[_0x12d456(0x1c8)]&&_0xb47cc9[_0x12d456(0x1e9)]>_0xb47cc9[_0x12d456(0x1ac)]){_0x58a2d0=!0x0;return;}var _0x2e8dce=_0x3c5450[_0x12d456(0x1a9)]();_0x2e8dce[_0x12d456(0x1ee)]>0x64&&(_0x2e8dce=_0x2e8dce[_0x12d456(0x24e)](0x0,0x64)+_0x12d456(0x1f3)),_0x1d7c47[_0x12d456(0x1f5)](_0x31a482[_0x12d456(0x1d1)](_0x26b35f,_0xc08e2f,_0x12d456(0x1af),_0x2e8dce,_0xb47cc9,function(_0x18e45d){return function(){return _0x18e45d;};}(_0x4da080)));}),!_0x49295a){try{for(_0x25aa31 in _0xc08e2f)if(!(_0x5ac45a&&_0x56dab2['test'](_0x25aa31))&&!this[_0x4947cb(0x1e4)](_0xc08e2f,_0x25aa31,_0xb47cc9)){if(_0x5b596e++,_0xb47cc9[_0x4947cb(0x1e9)]++,_0x5b596e>_0x32550c){_0x58a2d0=!0x0;break;}if(!_0xb47cc9[_0x4947cb(0x211)]&&_0xb47cc9[_0x4947cb(0x1c8)]&&_0xb47cc9[_0x4947cb(0x1e9)]>_0xb47cc9['autoExpandLimit']){_0x58a2d0=!0x0;break;}_0x1d7c47['push'](_0x31a482[_0x4947cb(0x276)](_0x26b35f,_0x306c47,_0xc08e2f,_0x1967c8,_0x25aa31,_0xb47cc9));}}catch{}if(_0x306c47['_p_length']=!0x0,_0x112cdd&&(_0x306c47[_0x4947cb(0x24a)]=!0x0),!_0x58a2d0){var _0x3a464a=[][_0x4947cb(0x22e)](this[_0x4947cb(0x1ed)](_0xc08e2f))[_0x4947cb(0x22e)](this[_0x4947cb(0x1c6)](_0xc08e2f));for(_0x8b5576=0x0,_0x3f430f=_0x3a464a['length'];_0x8b5576<_0x3f430f;_0x8b5576++)if(_0x25aa31=_0x3a464a[_0x8b5576],!(_0x5ac45a&&_0x56dab2[_0x4947cb(0x1c3)](_0x25aa31[_0x4947cb(0x1a9)]()))&&!this[_0x4947cb(0x1e4)](_0xc08e2f,_0x25aa31,_0xb47cc9)&&!_0x306c47['_p_'+_0x25aa31['toString']()]){if(_0x5b596e++,_0xb47cc9[_0x4947cb(0x1e9)]++,_0x5b596e>_0x32550c){_0x58a2d0=!0x0;break;}if(!_0xb47cc9[_0x4947cb(0x211)]&&_0xb47cc9[_0x4947cb(0x1c8)]&&_0xb47cc9[_0x4947cb(0x1e9)]>_0xb47cc9[_0x4947cb(0x1ac)]){_0x58a2d0=!0x0;break;}_0x1d7c47[_0x4947cb(0x1f5)](_0x31a482['_addObjectProperty'](_0x26b35f,_0x306c47,_0xc08e2f,_0x1967c8,_0x25aa31,_0xb47cc9));}}}}}if(_0x22c73d[_0x4947cb(0x1c7)]=_0x1967c8,_0x603da9?(_0x22c73d['value']=_0xc08e2f['valueOf'](),this[_0x4947cb(0x215)](_0x1967c8,_0x22c73d,_0xb47cc9,_0x29722c)):_0x1967c8===_0x4947cb(0x246)?_0x22c73d['value']=this[_0x4947cb(0x1ae)]['call'](_0xc08e2f):_0x1967c8==='bigint'?_0x22c73d[_0x4947cb(0x27a)]=_0xc08e2f['toString']():_0x1967c8==='RegExp'?_0x22c73d['value']=this['_regExpToString']['call'](_0xc08e2f):_0x1967c8==='symbol'&&this[_0x4947cb(0x19b)]?_0x22c73d[_0x4947cb(0x27a)]=this[_0x4947cb(0x19b)][_0x4947cb(0x222)][_0x4947cb(0x1a9)][_0x4947cb(0x269)](_0xc08e2f):!_0xb47cc9[_0x4947cb(0x25c)]&&!(_0x1967c8===_0x4947cb(0x1a6)||_0x1967c8==='undefined')&&(delete _0x22c73d[_0x4947cb(0x27a)],_0x22c73d['capped']=!0x0),_0x58a2d0&&(_0x22c73d[_0x4947cb(0x1b9)]=!0x0),_0x1d6ac7=_0xb47cc9[_0x4947cb(0x281)][_0x4947cb(0x1bd)],_0xb47cc9[_0x4947cb(0x281)]['current']=_0x22c73d,this[_0x4947cb(0x1da)](_0x22c73d,_0xb47cc9),_0x1d7c47[_0x4947cb(0x1ee)]){for(_0x8b5576=0x0,_0x3f430f=_0x1d7c47[_0x4947cb(0x1ee)];_0x8b5576<_0x3f430f;_0x8b5576++)_0x1d7c47[_0x8b5576](_0x8b5576);}_0x26b35f[_0x4947cb(0x1ee)]&&(_0x22c73d[_0x4947cb(0x1fd)]=_0x26b35f);}catch(_0xf7dede){_0x356bcf(_0xf7dede,_0x22c73d,_0xb47cc9);}return this[_0x4947cb(0x22d)](_0xc08e2f,_0x22c73d),this[_0x4947cb(0x1e6)](_0x22c73d,_0xb47cc9),_0xb47cc9['node']['current']=_0x1d6ac7,_0xb47cc9['level']--,_0xb47cc9[_0x4947cb(0x1c8)]=_0x224ce6,_0xb47cc9[_0x4947cb(0x1c8)]&&_0xb47cc9[_0x4947cb(0x27f)][_0x4947cb(0x251)](),_0x22c73d;}[_0x518456(0x1c6)](_0x2ba372){return Object['getOwnPropertySymbols']?Object['getOwnPropertySymbols'](_0x2ba372):[];}[_0x518456(0x25a)](_0x2d91d1){var _0x27c09b=_0x518456;return!!(_0x2d91d1&&_0x16954a['Set']&&this[_0x27c09b(0x214)](_0x2d91d1)===_0x27c09b(0x226)&&_0x2d91d1[_0x27c09b(0x242)]);}[_0x518456(0x1e4)](_0x47f7dd,_0x3f8241,_0x5e9e62){var _0xcc31e4=_0x518456;return _0x5e9e62[_0xcc31e4(0x268)]?typeof _0x47f7dd[_0x3f8241]==_0xcc31e4(0x219):!0x1;}[_0x518456(0x19d)](_0x211efa){var _0xd03d9d=_0x518456,_0x25c71c='';return _0x25c71c=typeof _0x211efa,_0x25c71c===_0xd03d9d(0x277)?this[_0xd03d9d(0x214)](_0x211efa)==='[object\\x20Array]'?_0x25c71c=_0xd03d9d(0x1f7):this[_0xd03d9d(0x214)](_0x211efa)===_0xd03d9d(0x1a5)?_0x25c71c=_0xd03d9d(0x246):this[_0xd03d9d(0x214)](_0x211efa)===_0xd03d9d(0x1a7)?_0x25c71c='bigint':_0x211efa===null?_0x25c71c='null':_0x211efa[_0xd03d9d(0x282)]&&(_0x25c71c=_0x211efa['constructor']['name']||_0x25c71c):_0x25c71c===_0xd03d9d(0x237)&&this[_0xd03d9d(0x1d4)]&&_0x211efa instanceof this[_0xd03d9d(0x1d4)]&&(_0x25c71c=_0xd03d9d(0x1f4)),_0x25c71c;}[_0x518456(0x214)](_0x2e481d){var _0x762a04=_0x518456;return Object[_0x762a04(0x222)][_0x762a04(0x1a9)][_0x762a04(0x269)](_0x2e481d);}[_0x518456(0x275)](_0x49c85d){var _0x367423=_0x518456;return _0x49c85d==='boolean'||_0x49c85d===_0x367423(0x1d2)||_0x49c85d===_0x367423(0x21c);}[_0x518456(0x283)](_0x5a5e6b){var _0x4a59a4=_0x518456;return _0x5a5e6b==='Boolean'||_0x5a5e6b===_0x4a59a4(0x23a)||_0x5a5e6b===_0x4a59a4(0x201);}[_0x518456(0x1d1)](_0x4d6d49,_0x51262f,_0x581005,_0x156558,_0x4452a4,_0x29318c){var _0x2f23aa=this;return function(_0x5ddd36){var _0x42578b=_0x28e3,_0x5e74b1=_0x4452a4[_0x42578b(0x281)][_0x42578b(0x1bd)],_0x4bcbdb=_0x4452a4[_0x42578b(0x281)][_0x42578b(0x266)],_0x2031e6=_0x4452a4[_0x42578b(0x281)][_0x42578b(0x259)];_0x4452a4[_0x42578b(0x281)][_0x42578b(0x259)]=_0x5e74b1,_0x4452a4[_0x42578b(0x281)]['index']=typeof _0x156558==_0x42578b(0x21c)?_0x156558:_0x5ddd36,_0x4d6d49['push'](_0x2f23aa[_0x42578b(0x247)](_0x51262f,_0x581005,_0x156558,_0x4452a4,_0x29318c)),_0x4452a4['node'][_0x42578b(0x259)]=_0x2031e6,_0x4452a4[_0x42578b(0x281)][_0x42578b(0x266)]=_0x4bcbdb;};}[_0x518456(0x276)](_0x225584,_0x403846,_0x24ac31,_0x2f48ba,_0x31bea6,_0x13a248,_0x39beeb){var _0x5498bf=_0x518456,_0x22d458=this;return _0x403846[_0x5498bf(0x1fb)+_0x31bea6[_0x5498bf(0x1a9)]()]=!0x0,function(_0x2a083a){var _0x15009c=_0x5498bf,_0x47539a=_0x13a248[_0x15009c(0x281)][_0x15009c(0x1bd)],_0x524d17=_0x13a248[_0x15009c(0x281)][_0x15009c(0x266)],_0x37a30a=_0x13a248[_0x15009c(0x281)][_0x15009c(0x259)];_0x13a248[_0x15009c(0x281)]['parent']=_0x47539a,_0x13a248[_0x15009c(0x281)][_0x15009c(0x266)]=_0x2a083a,_0x225584[_0x15009c(0x1f5)](_0x22d458[_0x15009c(0x247)](_0x24ac31,_0x2f48ba,_0x31bea6,_0x13a248,_0x39beeb)),_0x13a248['node'][_0x15009c(0x259)]=_0x37a30a,_0x13a248[_0x15009c(0x281)][_0x15009c(0x266)]=_0x524d17;};}[_0x518456(0x247)](_0x59a51f,_0x2139eb,_0x30b503,_0x21abe9,_0x21869f){var _0x376cdb=_0x518456,_0x34e7fb=this;_0x21869f||(_0x21869f=function(_0x5d01ec,_0x55b49d){return _0x5d01ec[_0x55b49d];});var _0xf0ccad=_0x30b503[_0x376cdb(0x1a9)](),_0x131c42=_0x21abe9[_0x376cdb(0x249)]||{},_0x5423a6=_0x21abe9['depth'],_0x500b30=_0x21abe9['isExpressionToEvaluate'];try{var _0x56dc70=this[_0x376cdb(0x238)](_0x59a51f),_0x4981bf=_0xf0ccad;_0x56dc70&&_0x4981bf[0x0]==='\\x27'&&(_0x4981bf=_0x4981bf[_0x376cdb(0x252)](0x1,_0x4981bf[_0x376cdb(0x1ee)]-0x2));var _0x3480b6=_0x21abe9[_0x376cdb(0x249)]=_0x131c42[_0x376cdb(0x1fb)+_0x4981bf];_0x3480b6&&(_0x21abe9[_0x376cdb(0x25c)]=_0x21abe9[_0x376cdb(0x25c)]+0x1),_0x21abe9[_0x376cdb(0x211)]=!!_0x3480b6;var _0x20abbe=typeof _0x30b503==_0x376cdb(0x23c),_0xfeb9ef={'name':_0x20abbe||_0x56dc70?_0xf0ccad:this[_0x376cdb(0x20a)](_0xf0ccad)};if(_0x20abbe&&(_0xfeb9ef[_0x376cdb(0x23c)]=!0x0),!(_0x2139eb==='array'||_0x2139eb===_0x376cdb(0x20f))){var _0x7d5f77=this[_0x376cdb(0x199)](_0x59a51f,_0x30b503);if(_0x7d5f77&&(_0x7d5f77[_0x376cdb(0x1d3)]&&(_0xfeb9ef[_0x376cdb(0x1b0)]=!0x0),_0x7d5f77[_0x376cdb(0x26f)]&&!_0x3480b6&&!_0x21abe9[_0x376cdb(0x213)]))return _0xfeb9ef[_0x376cdb(0x220)]=!0x0,this[_0x376cdb(0x23e)](_0xfeb9ef,_0x21abe9),_0xfeb9ef;}var _0x1fd6a2;try{_0x1fd6a2=_0x21869f(_0x59a51f,_0x30b503);}catch(_0x1db60c){return _0xfeb9ef={'name':_0xf0ccad,'type':'unknown','error':_0x1db60c[_0x376cdb(0x1b3)]},this['_processTreeNodeResult'](_0xfeb9ef,_0x21abe9),_0xfeb9ef;}var _0x1e3386=this[_0x376cdb(0x19d)](_0x1fd6a2),_0x2ecb32=this[_0x376cdb(0x275)](_0x1e3386);if(_0xfeb9ef[_0x376cdb(0x1c7)]=_0x1e3386,_0x2ecb32)this[_0x376cdb(0x23e)](_0xfeb9ef,_0x21abe9,_0x1fd6a2,function(){var _0x1c3507=_0x376cdb;_0xfeb9ef[_0x1c3507(0x27a)]=_0x1fd6a2['valueOf'](),!_0x3480b6&&_0x34e7fb['_capIfString'](_0x1e3386,_0xfeb9ef,_0x21abe9,{});});else{var _0x286c8a=_0x21abe9[_0x376cdb(0x1c8)]&&_0x21abe9[_0x376cdb(0x1fc)]<_0x21abe9[_0x376cdb(0x1e1)]&&_0x21abe9[_0x376cdb(0x27f)][_0x376cdb(0x218)](_0x1fd6a2)<0x0&&_0x1e3386!=='function'&&_0x21abe9['autoExpandPropertyCount']<_0x21abe9[_0x376cdb(0x1ac)];_0x286c8a||_0x21abe9[_0x376cdb(0x1fc)]<_0x5423a6||_0x3480b6?(this[_0x376cdb(0x1f9)](_0xfeb9ef,_0x1fd6a2,_0x21abe9,_0x3480b6||{}),this[_0x376cdb(0x22d)](_0x1fd6a2,_0xfeb9ef)):this[_0x376cdb(0x23e)](_0xfeb9ef,_0x21abe9,_0x1fd6a2,function(){var _0x432b9d=_0x376cdb;_0x1e3386==='null'||_0x1e3386===_0x432b9d(0x237)||(delete _0xfeb9ef[_0x432b9d(0x27a)],_0xfeb9ef[_0x432b9d(0x1eb)]=!0x0);});}return _0xfeb9ef;}finally{_0x21abe9[_0x376cdb(0x249)]=_0x131c42,_0x21abe9[_0x376cdb(0x25c)]=_0x5423a6,_0x21abe9[_0x376cdb(0x211)]=_0x500b30;}}['_capIfString'](_0x59a33b,_0x10c7cf,_0xdb369d,_0x2bd4e6){var _0xb7aa63=_0x518456,_0x4dabe5=_0x2bd4e6[_0xb7aa63(0x1b8)]||_0xdb369d[_0xb7aa63(0x1b8)];if((_0x59a33b===_0xb7aa63(0x1d2)||_0x59a33b===_0xb7aa63(0x23a))&&_0x10c7cf[_0xb7aa63(0x27a)]){let _0x4f3a86=_0x10c7cf[_0xb7aa63(0x27a)][_0xb7aa63(0x1ee)];_0xdb369d[_0xb7aa63(0x1f8)]+=_0x4f3a86,_0xdb369d[_0xb7aa63(0x1f8)]>_0xdb369d[_0xb7aa63(0x244)]?(_0x10c7cf[_0xb7aa63(0x1eb)]='',delete _0x10c7cf[_0xb7aa63(0x27a)]):_0x4f3a86>_0x4dabe5&&(_0x10c7cf[_0xb7aa63(0x1eb)]=_0x10c7cf[_0xb7aa63(0x27a)][_0xb7aa63(0x252)](0x0,_0x4dabe5),delete _0x10c7cf[_0xb7aa63(0x27a)]);}}[_0x518456(0x238)](_0x1dbea6){var _0x1affba=_0x518456;return!!(_0x1dbea6&&_0x16954a[_0x1affba(0x1af)]&&this[_0x1affba(0x214)](_0x1dbea6)===_0x1affba(0x1f0)&&_0x1dbea6['forEach']);}[_0x518456(0x20a)](_0x4004f4){var _0xd85a2=_0x518456;if(_0x4004f4[_0xd85a2(0x19e)](/^\\d+$/))return _0x4004f4;var _0x1ad931;try{_0x1ad931=JSON[_0xd85a2(0x27d)](''+_0x4004f4);}catch{_0x1ad931='\\x22'+this['_objectToString'](_0x4004f4)+'\\x22';}return _0x1ad931[_0xd85a2(0x19e)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x1ad931=_0x1ad931[_0xd85a2(0x252)](0x1,_0x1ad931[_0xd85a2(0x1ee)]-0x2):_0x1ad931=_0x1ad931[_0xd85a2(0x1b2)](/'/g,'\\x5c\\x27')[_0xd85a2(0x1b2)](/\\\\\"/g,'\\x22')[_0xd85a2(0x1b2)](/(^\"|\"$)/g,'\\x27'),_0x1ad931;}[_0x518456(0x23e)](_0x179678,_0x480571,_0x3c2dd0,_0x39d5c6){var _0x4489e4=_0x518456;this[_0x4489e4(0x1da)](_0x179678,_0x480571),_0x39d5c6&&_0x39d5c6(),this[_0x4489e4(0x22d)](_0x3c2dd0,_0x179678),this[_0x4489e4(0x1e6)](_0x179678,_0x480571);}['_treeNodePropertiesBeforeFullValue'](_0x10502e,_0x4df1f5){var _0x1ac46d=_0x518456;this['_setNodeId'](_0x10502e,_0x4df1f5),this['_setNodeQueryPath'](_0x10502e,_0x4df1f5),this[_0x1ac46d(0x216)](_0x10502e,_0x4df1f5),this[_0x1ac46d(0x1ce)](_0x10502e,_0x4df1f5);}[_0x518456(0x258)](_0x42bafc,_0x1570d9){}[_0x518456(0x1a0)](_0x166187,_0x3a517d){}[_0x518456(0x1ba)](_0x34ae97,_0xaf7ef7){}[_0x518456(0x1b4)](_0x3e5160){var _0x4e745a=_0x518456;return _0x3e5160===this[_0x4e745a(0x1de)];}[_0x518456(0x1e6)](_0x3c4157,_0x14edec){var _0x55c8fb=_0x518456;this['_setNodeLabel'](_0x3c4157,_0x14edec),this[_0x55c8fb(0x1dc)](_0x3c4157),_0x14edec[_0x55c8fb(0x245)]&&this[_0x55c8fb(0x19c)](_0x3c4157),this[_0x55c8fb(0x1bc)](_0x3c4157,_0x14edec),this['_addLoadNode'](_0x3c4157,_0x14edec),this[_0x55c8fb(0x1ec)](_0x3c4157);}[_0x518456(0x22d)](_0x3afce5,_0x2581c3){var _0x268d15=_0x518456;let _0x5a62a6;try{_0x16954a[_0x268d15(0x200)]&&(_0x5a62a6=_0x16954a[_0x268d15(0x200)]['error'],_0x16954a[_0x268d15(0x200)][_0x268d15(0x19a)]=function(){}),_0x3afce5&&typeof _0x3afce5['length']==_0x268d15(0x21c)&&(_0x2581c3[_0x268d15(0x1ee)]=_0x3afce5[_0x268d15(0x1ee)]);}catch{}finally{_0x5a62a6&&(_0x16954a['console'][_0x268d15(0x19a)]=_0x5a62a6);}if(_0x2581c3[_0x268d15(0x1c7)]===_0x268d15(0x21c)||_0x2581c3[_0x268d15(0x1c7)]===_0x268d15(0x201)){if(isNaN(_0x2581c3[_0x268d15(0x27a)]))_0x2581c3[_0x268d15(0x263)]=!0x0,delete _0x2581c3[_0x268d15(0x27a)];else switch(_0x2581c3[_0x268d15(0x27a)]){case Number[_0x268d15(0x234)]:_0x2581c3[_0x268d15(0x235)]=!0x0,delete _0x2581c3['value'];break;case Number[_0x268d15(0x1aa)]:_0x2581c3[_0x268d15(0x255)]=!0x0,delete _0x2581c3[_0x268d15(0x27a)];break;case 0x0:this[_0x268d15(0x1e5)](_0x2581c3['value'])&&(_0x2581c3[_0x268d15(0x288)]=!0x0);break;}}else _0x2581c3['type']==='function'&&typeof _0x3afce5['name']==_0x268d15(0x1d2)&&_0x3afce5[_0x268d15(0x1f6)]&&_0x2581c3[_0x268d15(0x1f6)]&&_0x3afce5[_0x268d15(0x1f6)]!==_0x2581c3[_0x268d15(0x1f6)]&&(_0x2581c3['funcName']=_0x3afce5[_0x268d15(0x1f6)]);}['_isNegativeZero'](_0x2b5c48){var _0x410438=_0x518456;return 0x1/_0x2b5c48===Number[_0x410438(0x1aa)];}['_sortProps'](_0x55487c){var _0x42fa9c=_0x518456;!_0x55487c[_0x42fa9c(0x1fd)]||!_0x55487c[_0x42fa9c(0x1fd)][_0x42fa9c(0x1ee)]||_0x55487c['type']===_0x42fa9c(0x1f7)||_0x55487c[_0x42fa9c(0x1c7)]===_0x42fa9c(0x1af)||_0x55487c[_0x42fa9c(0x1c7)]===_0x42fa9c(0x1cc)||_0x55487c['props']['sort'](function(_0x4764cb,_0x2199c1){var _0x9e742e=_0x42fa9c,_0xf0d320=_0x4764cb['name'][_0x9e742e(0x250)](),_0x9f7bb=_0x2199c1[_0x9e742e(0x1f6)][_0x9e742e(0x250)]();return _0xf0d320<_0x9f7bb?-0x1:_0xf0d320>_0x9f7bb?0x1:0x0;});}[_0x518456(0x1bc)](_0xb80aae,_0x46f425){var _0x2ccb4b=_0x518456;if(!(_0x46f425[_0x2ccb4b(0x268)]||!_0xb80aae[_0x2ccb4b(0x1fd)]||!_0xb80aae[_0x2ccb4b(0x1fd)][_0x2ccb4b(0x1ee)])){for(var _0x26441a=[],_0x1f9eed=[],_0x54e320=0x0,_0x3f58d8=_0xb80aae['props'][_0x2ccb4b(0x1ee)];_0x54e320<_0x3f58d8;_0x54e320++){var _0x425ae1=_0xb80aae[_0x2ccb4b(0x1fd)][_0x54e320];_0x425ae1[_0x2ccb4b(0x1c7)]===_0x2ccb4b(0x219)?_0x26441a[_0x2ccb4b(0x1f5)](_0x425ae1):_0x1f9eed[_0x2ccb4b(0x1f5)](_0x425ae1);}if(!(!_0x1f9eed[_0x2ccb4b(0x1ee)]||_0x26441a[_0x2ccb4b(0x1ee)]<=0x1)){_0xb80aae[_0x2ccb4b(0x1fd)]=_0x1f9eed;var _0x5e7f51={'functionsNode':!0x0,'props':_0x26441a};this[_0x2ccb4b(0x258)](_0x5e7f51,_0x46f425),this[_0x2ccb4b(0x1ba)](_0x5e7f51,_0x46f425),this[_0x2ccb4b(0x1dc)](_0x5e7f51),this[_0x2ccb4b(0x1ce)](_0x5e7f51,_0x46f425),_0x5e7f51['id']+='\\x20f',_0xb80aae[_0x2ccb4b(0x1fd)][_0x2ccb4b(0x1bb)](_0x5e7f51);}}}[_0x518456(0x243)](_0x45fd4b,_0x20e4c3){}[_0x518456(0x1dc)](_0x32c12a){}[_0x518456(0x21a)](_0x42dac3){var _0x3b9d67=_0x518456;return Array[_0x3b9d67(0x23d)](_0x42dac3)||typeof _0x42dac3==_0x3b9d67(0x277)&&this[_0x3b9d67(0x214)](_0x42dac3)===_0x3b9d67(0x270);}[_0x518456(0x1ce)](_0x20d6ff,_0x23dfeb){}[_0x518456(0x1ec)](_0x463e0f){var _0x4fefff=_0x518456;delete _0x463e0f[_0x4fefff(0x1e7)],delete _0x463e0f[_0x4fefff(0x25d)],delete _0x463e0f[_0x4fefff(0x1cd)];}['_setNodeExpressionPath'](_0x39ee6a,_0x410b06){}}let _0x321960=new _0xea4f1b(),_0x2856db={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x449fff={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x4ceff0(_0x2c3a5d,_0x405569,_0x42c915,_0xe9df2,_0x3efdd9,_0x37259f){var _0x171030=_0x518456;let _0x3b3146,_0x1a1c87;try{_0x1a1c87=_0x300291(),_0x3b3146=_0x3266df[_0x405569],!_0x3b3146||_0x1a1c87-_0x3b3146['ts']>0x1f4&&_0x3b3146[_0x171030(0x1ca)]&&_0x3b3146['time']/_0x3b3146[_0x171030(0x1ca)]<0x64?(_0x3266df[_0x405569]=_0x3b3146={'count':0x0,'time':0x0,'ts':_0x1a1c87},_0x3266df['hits']={}):_0x1a1c87-_0x3266df['hits']['ts']>0x32&&_0x3266df[_0x171030(0x1d6)][_0x171030(0x1ca)]&&_0x3266df['hits'][_0x171030(0x239)]/_0x3266df[_0x171030(0x1d6)][_0x171030(0x1ca)]<0x64&&(_0x3266df[_0x171030(0x1d6)]={});let _0x988b15=[],_0x326fd1=_0x3b3146['reduceLimits']||_0x3266df['hits'][_0x171030(0x26e)]?_0x449fff:_0x2856db,_0x2d50a7=_0x26a5dc=>{var _0xe4e38c=_0x171030;let _0xbf8637={};return _0xbf8637[_0xe4e38c(0x1fd)]=_0x26a5dc[_0xe4e38c(0x1fd)],_0xbf8637[_0xe4e38c(0x225)]=_0x26a5dc[_0xe4e38c(0x225)],_0xbf8637[_0xe4e38c(0x1b8)]=_0x26a5dc[_0xe4e38c(0x1b8)],_0xbf8637[_0xe4e38c(0x244)]=_0x26a5dc[_0xe4e38c(0x244)],_0xbf8637[_0xe4e38c(0x1ac)]=_0x26a5dc[_0xe4e38c(0x1ac)],_0xbf8637[_0xe4e38c(0x1e1)]=_0x26a5dc[_0xe4e38c(0x1e1)],_0xbf8637[_0xe4e38c(0x245)]=!0x1,_0xbf8637[_0xe4e38c(0x268)]=!_0x1f5612,_0xbf8637[_0xe4e38c(0x25c)]=0x1,_0xbf8637['level']=0x0,_0xbf8637['expId']='root_exp_id',_0xbf8637[_0xe4e38c(0x254)]=_0xe4e38c(0x228),_0xbf8637[_0xe4e38c(0x1c8)]=!0x0,_0xbf8637[_0xe4e38c(0x27f)]=[],_0xbf8637['autoExpandPropertyCount']=0x0,_0xbf8637[_0xe4e38c(0x213)]=!0x0,_0xbf8637['allStrLength']=0x0,_0xbf8637[_0xe4e38c(0x281)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0xbf8637;};for(var _0x4d76ac=0x0;_0x4d76ac<_0x3efdd9[_0x171030(0x1ee)];_0x4d76ac++)_0x988b15[_0x171030(0x1f5)](_0x321960[_0x171030(0x1f9)]({'timeNode':_0x2c3a5d==='time'||void 0x0},_0x3efdd9[_0x4d76ac],_0x2d50a7(_0x326fd1),{}));if(_0x2c3a5d===_0x171030(0x1d5)){let _0x5aee45=Error[_0x171030(0x230)];try{Error[_0x171030(0x230)]=0x1/0x0,_0x988b15[_0x171030(0x1f5)](_0x321960[_0x171030(0x1f9)]({'stackNode':!0x0},new Error()[_0x171030(0x257)],_0x2d50a7(_0x326fd1),{'strLength':0x1/0x0}));}finally{Error[_0x171030(0x230)]=_0x5aee45;}}return{'method':'log','version':_0x533af2,'args':[{'ts':_0x42c915,'session':_0xe9df2,'args':_0x988b15,'id':_0x405569,'context':_0x37259f}]};}catch(_0x1adcd8){return{'method':'log','version':_0x533af2,'args':[{'ts':_0x42c915,'session':_0xe9df2,'args':[{'type':'unknown','error':_0x1adcd8&&_0x1adcd8[_0x171030(0x1b3)]}],'id':_0x405569,'context':_0x37259f}]};}finally{try{if(_0x3b3146&&_0x1a1c87){let _0x24f12b=_0x300291();_0x3b3146['count']++,_0x3b3146['time']+=_0x832442(_0x1a1c87,_0x24f12b),_0x3b3146['ts']=_0x24f12b,_0x3266df[_0x171030(0x1d6)][_0x171030(0x1ca)]++,_0x3266df[_0x171030(0x1d6)]['time']+=_0x832442(_0x1a1c87,_0x24f12b),_0x3266df[_0x171030(0x1d6)]['ts']=_0x24f12b,(_0x3b3146[_0x171030(0x1ca)]>0x32||_0x3b3146[_0x171030(0x239)]>0x64)&&(_0x3b3146[_0x171030(0x26e)]=!0x0),(_0x3266df[_0x171030(0x1d6)]['count']>0x3e8||_0x3266df[_0x171030(0x1d6)]['time']>0x12c)&&(_0x3266df[_0x171030(0x1d6)][_0x171030(0x26e)]=!0x0);}}catch{}}}return _0x4ceff0;}((_0x44e88c,_0x5a2423,_0x2c9905,_0x23aac5,_0x2dfd84,_0x1edac5,_0x5f3284,_0xef61e6,_0x4801c1,_0x4a1d8b)=>{var _0x5959b2=_0x31a8a8;if(_0x44e88c['_console_ninja'])return _0x44e88c['_console_ninja'];if(!X(_0x44e88c,_0xef61e6,_0x2dfd84))return _0x44e88c[_0x5959b2(0x27e)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x44e88c[_0x5959b2(0x27e)];let _0x22ba47=W(_0x44e88c),_0x4624c5=_0x22ba47['elapsed'],_0x51454c=_0x22ba47[_0x5959b2(0x229)],_0x3d1f9d=_0x22ba47[_0x5959b2(0x23b)],_0x43f4d0={'hits':{},'ts':{}},_0x5dcf32=J(_0x44e88c,_0x4801c1,_0x43f4d0,_0x1edac5),_0x2da564=_0x758e1d=>{_0x43f4d0['ts'][_0x758e1d]=_0x51454c();},_0x4e3ac2=(_0x33f4ff,_0x40dda2)=>{var _0x2358f9=_0x5959b2;let _0x521992=_0x43f4d0['ts'][_0x40dda2];if(delete _0x43f4d0['ts'][_0x40dda2],_0x521992){let _0x45835d=_0x4624c5(_0x521992,_0x51454c());_0x506c1c(_0x5dcf32(_0x2358f9(0x239),_0x33f4ff,_0x3d1f9d(),_0x342c50,[_0x45835d],_0x40dda2));}},_0x4a949f=_0x1c8e59=>(_0x2dfd84===_0x5959b2(0x26a)&&_0x44e88c[_0x5959b2(0x25f)]&&_0x1c8e59?.[_0x5959b2(0x25b)]?.[_0x5959b2(0x1ee)]&&(_0x1c8e59[_0x5959b2(0x25b)][0x0][_0x5959b2(0x25f)]=_0x44e88c[_0x5959b2(0x25f)]),_0x1c8e59);_0x44e88c[_0x5959b2(0x27e)]={'consoleLog':(_0x31d8d4,_0x5b20f5)=>{var _0x11722a=_0x5959b2;_0x44e88c['console'][_0x11722a(0x223)][_0x11722a(0x1f6)]!=='disabledLog'&&_0x506c1c(_0x5dcf32('log',_0x31d8d4,_0x3d1f9d(),_0x342c50,_0x5b20f5));},'consoleTrace':(_0x118b4d,_0x4b12e1)=>{var _0x54656c=_0x5959b2;_0x44e88c['console']['log']['name']!=='disabledTrace'&&_0x506c1c(_0x4a949f(_0x5dcf32(_0x54656c(0x1d5),_0x118b4d,_0x3d1f9d(),_0x342c50,_0x4b12e1)));},'consoleTime':_0x3fbe54=>{_0x2da564(_0x3fbe54);},'consoleTimeEnd':(_0xf52498,_0x69d004)=>{_0x4e3ac2(_0x69d004,_0xf52498);},'autoLog':(_0x139d6a,_0x9d5993)=>{var _0x2853da=_0x5959b2;_0x506c1c(_0x5dcf32(_0x2853da(0x223),_0x9d5993,_0x3d1f9d(),_0x342c50,[_0x139d6a]));},'autoLogMany':(_0x1581aa,_0x4abf30)=>{var _0x1113bd=_0x5959b2;_0x506c1c(_0x5dcf32(_0x1113bd(0x223),_0x1581aa,_0x3d1f9d(),_0x342c50,_0x4abf30));},'autoTrace':(_0x27c5bc,_0x4f712a)=>{var _0x55ed5b=_0x5959b2;_0x506c1c(_0x4a949f(_0x5dcf32(_0x55ed5b(0x1d5),_0x4f712a,_0x3d1f9d(),_0x342c50,[_0x27c5bc])));},'autoTraceMany':(_0x6254bf,_0x3aeeec)=>{var _0x3e6028=_0x5959b2;_0x506c1c(_0x4a949f(_0x5dcf32(_0x3e6028(0x1d5),_0x6254bf,_0x3d1f9d(),_0x342c50,_0x3aeeec)));},'autoTime':(_0x50d777,_0x45de2d,_0x130595)=>{_0x2da564(_0x130595);},'autoTimeEnd':(_0x48da2c,_0x3deda8,_0xa37cba)=>{_0x4e3ac2(_0x3deda8,_0xa37cba);},'coverage':_0x350d7d=>{var _0x3e9570=_0x5959b2;_0x506c1c({'method':_0x3e9570(0x204),'version':_0x1edac5,'args':[{'id':_0x350d7d}]});}};let _0x506c1c=x(_0x44e88c,_0x5a2423,_0x2c9905,_0x23aac5,_0x2dfd84,_0x4a1d8b),_0x342c50=_0x44e88c['_console_ninja_session'];return _0x44e88c[_0x5959b2(0x27e)];})(globalThis,'127.0.0.1','49841',_0x31a8a8(0x27c),'webpack',_0x31a8a8(0x1df),_0x31a8a8(0x24b),_0x31a8a8(0x20b),_0x31a8a8(0x22a),_0x31a8a8(0x20e));");
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