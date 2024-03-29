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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x27946a=_0x43d3;(function(_0x3cfd7c,_0x2746a3){var _0xef6198=_0x43d3,_0x3ef566=_0x3cfd7c();while(!![]){try{var _0x2597ba=-parseInt(_0xef6198(0x200))/0x1+parseInt(_0xef6198(0x197))/0x2*(-parseInt(_0xef6198(0x1d2))/0x3)+-parseInt(_0xef6198(0x210))/0x4*(parseInt(_0xef6198(0x215))/0x5)+parseInt(_0xef6198(0x1a1))/0x6+parseInt(_0xef6198(0x1cd))/0x7*(parseInt(_0xef6198(0x1a5))/0x8)+parseInt(_0xef6198(0x1d4))/0x9*(parseInt(_0xef6198(0x247))/0xa)+-parseInt(_0xef6198(0x1a9))/0xb*(-parseInt(_0xef6198(0x1b5))/0xc);if(_0x2597ba===_0x2746a3)break;else _0x3ef566['push'](_0x3ef566['shift']());}catch(_0x4ddc0d){_0x3ef566['push'](_0x3ef566['shift']());}}}(_0x58c0,0xb2bdf));var j=Object['create'],H=Object[_0x27946a(0x1a3)],G=Object[_0x27946a(0x1c4)],ee=Object[_0x27946a(0x1a6)],te=Object['getPrototypeOf'],ne=Object['prototype']['hasOwnProperty'],re=(_0xfb4b22,_0x3917af,_0x1bde47,_0x5a1a00)=>{var _0x35bb77=_0x27946a;if(_0x3917af&&typeof _0x3917af==_0x35bb77(0x230)||typeof _0x3917af==_0x35bb77(0x19d)){for(let _0x1f61fb of ee(_0x3917af))!ne[_0x35bb77(0x1f4)](_0xfb4b22,_0x1f61fb)&&_0x1f61fb!==_0x1bde47&&H(_0xfb4b22,_0x1f61fb,{'get':()=>_0x3917af[_0x1f61fb],'enumerable':!(_0x5a1a00=G(_0x3917af,_0x1f61fb))||_0x5a1a00[_0x35bb77(0x233)]});}return _0xfb4b22;},x=(_0x3e1c62,_0x334ff8,_0x5f3859)=>(_0x5f3859=_0x3e1c62!=null?j(te(_0x3e1c62)):{},re(_0x334ff8||!_0x3e1c62||!_0x3e1c62[_0x27946a(0x1d8)]?H(_0x5f3859,'default',{'value':_0x3e1c62,'enumerable':!0x0}):_0x5f3859,_0x3e1c62)),X=class{constructor(_0x135d80,_0x55279c,_0x5f414c,_0x53a062,_0x36ab61){var _0x34de76=_0x27946a;this['global']=_0x135d80,this[_0x34de76(0x245)]=_0x55279c,this[_0x34de76(0x221)]=_0x5f414c,this['nodeModules']=_0x53a062,this['dockerizedApp']=_0x36ab61,this['_allowedToSend']=!0x0,this[_0x34de76(0x21b)]=!0x0,this[_0x34de76(0x240)]=!0x1,this[_0x34de76(0x1d3)]=!0x1,this['_inNextEdge']=_0x135d80['process']?.[_0x34de76(0x1ec)]?.['NEXT_RUNTIME']===_0x34de76(0x1db),this[_0x34de76(0x216)]=!this[_0x34de76(0x22a)]['process']?.[_0x34de76(0x229)]?.[_0x34de76(0x24b)]&&!this[_0x34de76(0x1e7)],this[_0x34de76(0x187)]=null,this[_0x34de76(0x1c1)]=0x0,this['_maxConnectAttemptCount']=0x14,this['_webSocketErrorDocsLink']='https://tinyurl.com/37x8b79t',this['_sendErrorMessage']=(this[_0x34de76(0x216)]?_0x34de76(0x226):_0x34de76(0x22e))+this[_0x34de76(0x25d)];}async['getWebSocketClass'](){var _0x4a0f91=_0x27946a;if(this['_WebSocketClass'])return this['_WebSocketClass'];let _0x19cf0b;if(this['_inBrowser']||this[_0x4a0f91(0x1e7)])_0x19cf0b=this[_0x4a0f91(0x22a)][_0x4a0f91(0x21a)];else{if(this['global']['process']?.[_0x4a0f91(0x1f7)])_0x19cf0b=this[_0x4a0f91(0x22a)][_0x4a0f91(0x251)]?.['_WebSocket'];else try{let _0x1d7155=await import(_0x4a0f91(0x24e));_0x19cf0b=(await import((await import(_0x4a0f91(0x24a)))[_0x4a0f91(0x267)](_0x1d7155[_0x4a0f91(0x23d)](this[_0x4a0f91(0x19f)],_0x4a0f91(0x236)))[_0x4a0f91(0x18e)]()))[_0x4a0f91(0x22c)];}catch{try{_0x19cf0b=require(require(_0x4a0f91(0x24e))[_0x4a0f91(0x23d)](this['nodeModules'],'ws'));}catch{throw new Error(_0x4a0f91(0x25b));}}}return this[_0x4a0f91(0x187)]=_0x19cf0b,_0x19cf0b;}[_0x27946a(0x196)](){var _0x5ade4d=_0x27946a;this[_0x5ade4d(0x1d3)]||this[_0x5ade4d(0x240)]||this[_0x5ade4d(0x1c1)]>=this[_0x5ade4d(0x257)]||(this['_allowedToConnectOnSend']=!0x1,this[_0x5ade4d(0x1d3)]=!0x0,this['_connectAttemptCount']++,this[_0x5ade4d(0x1b3)]=new Promise((_0x1e1983,_0x9544eb)=>{var _0x4cc1d5=_0x5ade4d;this['getWebSocketClass']()['then'](_0xfcfa60=>{var _0x5994b6=_0x43d3;let _0x2f7e57=new _0xfcfa60(_0x5994b6(0x19e)+(!this[_0x5994b6(0x216)]&&this[_0x5994b6(0x26d)]?_0x5994b6(0x191):this[_0x5994b6(0x245)])+':'+this[_0x5994b6(0x221)]);_0x2f7e57[_0x5994b6(0x263)]=()=>{var _0x2455b7=_0x5994b6;this[_0x2455b7(0x249)]=!0x1,this['_disposeWebsocket'](_0x2f7e57),this[_0x2455b7(0x204)](),_0x9544eb(new Error(_0x2455b7(0x1e8)));},_0x2f7e57[_0x5994b6(0x1e4)]=()=>{var _0x4e91d2=_0x5994b6;this[_0x4e91d2(0x216)]||_0x2f7e57[_0x4e91d2(0x18f)]&&_0x2f7e57['_socket'][_0x4e91d2(0x1f2)]&&_0x2f7e57['_socket']['unref'](),_0x1e1983(_0x2f7e57);},_0x2f7e57[_0x5994b6(0x1ad)]=()=>{var _0x442088=_0x5994b6;this[_0x442088(0x21b)]=!0x0,this['_disposeWebsocket'](_0x2f7e57),this[_0x442088(0x204)]();},_0x2f7e57[_0x5994b6(0x212)]=_0x6215a8=>{var _0x43e511=_0x5994b6;try{_0x6215a8&&_0x6215a8['data']&&this['_inBrowser']&&JSON[_0x43e511(0x1ce)](_0x6215a8[_0x43e511(0x203)])['method']==='reload'&&this[_0x43e511(0x22a)][_0x43e511(0x1f5)]['reload']();}catch{}};})[_0x4cc1d5(0x186)](_0xdca6e8=>(this[_0x4cc1d5(0x240)]=!0x0,this[_0x4cc1d5(0x1d3)]=!0x1,this[_0x4cc1d5(0x21b)]=!0x1,this['_allowedToSend']=!0x0,this[_0x4cc1d5(0x1c1)]=0x0,_0xdca6e8))[_0x4cc1d5(0x1e0)](_0x1d6e9d=>(this[_0x4cc1d5(0x240)]=!0x1,this[_0x4cc1d5(0x1d3)]=!0x1,console['warn'](_0x4cc1d5(0x1cc)+this[_0x4cc1d5(0x25d)]),_0x9544eb(new Error(_0x4cc1d5(0x20f)+(_0x1d6e9d&&_0x1d6e9d['message'])))));}));}[_0x27946a(0x244)](_0x41a7da){var _0x4a9d83=_0x27946a;this[_0x4a9d83(0x240)]=!0x1,this[_0x4a9d83(0x1d3)]=!0x1;try{_0x41a7da['onclose']=null,_0x41a7da['onerror']=null,_0x41a7da[_0x4a9d83(0x1e4)]=null;}catch{}try{_0x41a7da[_0x4a9d83(0x21c)]<0x2&&_0x41a7da[_0x4a9d83(0x1c9)]();}catch{}}[_0x27946a(0x204)](){var _0x51dd41=_0x27946a;clearTimeout(this[_0x51dd41(0x239)]),!(this[_0x51dd41(0x1c1)]>=this[_0x51dd41(0x257)])&&(this['_reconnectTimeout']=setTimeout(()=>{var _0x43b8aa=_0x51dd41;this[_0x43b8aa(0x240)]||this['_connecting']||(this[_0x43b8aa(0x196)](),this[_0x43b8aa(0x1b3)]?.['catch'](()=>this['_attemptToReconnectShortly']()));},0x1f4),this['_reconnectTimeout']['unref']&&this[_0x51dd41(0x239)][_0x51dd41(0x1f2)]());}async[_0x27946a(0x1ca)](_0x3963b6){var _0x326b59=_0x27946a;try{if(!this[_0x326b59(0x249)])return;this[_0x326b59(0x21b)]&&this['_connectToHostNow'](),(await this[_0x326b59(0x1b3)])['send'](JSON['stringify'](_0x3963b6));}catch(_0x5a4b08){console[_0x326b59(0x222)](this['_sendErrorMessage']+':\\x20'+(_0x5a4b08&&_0x5a4b08[_0x326b59(0x223)])),this[_0x326b59(0x249)]=!0x1,this['_attemptToReconnectShortly']();}}};function b(_0x25f593,_0x463924,_0x3fb3fe,_0x1cf7b0,_0x1f19e7,_0x1e9598){var _0x2f66be=_0x27946a;let _0x11b74d=_0x3fb3fe[_0x2f66be(0x253)](',')[_0x2f66be(0x268)](_0x16077f=>{var _0x167ea6=_0x2f66be;try{_0x25f593[_0x167ea6(0x20e)]||((_0x1f19e7===_0x167ea6(0x21f)||_0x1f19e7===_0x167ea6(0x1d1)||_0x1f19e7==='astro'||_0x1f19e7==='angular')&&(_0x1f19e7+=!_0x25f593[_0x167ea6(0x251)]?.[_0x167ea6(0x229)]?.[_0x167ea6(0x24b)]&&_0x25f593[_0x167ea6(0x251)]?.[_0x167ea6(0x1ec)]?.[_0x167ea6(0x1a8)]!==_0x167ea6(0x1db)?_0x167ea6(0x246):_0x167ea6(0x1bb)),_0x25f593[_0x167ea6(0x20e)]={'id':+new Date(),'tool':_0x1f19e7});let _0x4f79f6=new X(_0x25f593,_0x463924,_0x16077f,_0x1cf7b0,_0x1e9598);return _0x4f79f6[_0x167ea6(0x1ca)][_0x167ea6(0x19b)](_0x4f79f6);}catch(_0xa64cb8){return console['warn'](_0x167ea6(0x19c),_0xa64cb8&&_0xa64cb8['message']),()=>{};}});return _0x16f5b2=>_0x11b74d[_0x2f66be(0x23a)](_0x11538b=>_0x11538b(_0x16f5b2));}function _0x58c0(){var _0x966b26=['logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','266VCqJiE','parse','RegExp','totalStrLength','remix','1178472ItqioX','_connecting','23382RinChl','String','hrtime','capped','__es'+'Module','positiveInfinity','concat','edge','[object\\x20Map]','match','now','Map','catch','_p_name','console','string','onopen','_objectToString','error','_inNextEdge','logger\\x20websocket\\x20error','nan','_getOwnPropertySymbols','unshift','env','_isPrimitiveType','_numberRegExp','unknown','symbol','127.0.0.1','unref','_sortProps','call','location','name','_WebSocket','_undefined','timeStamp','funcName','root_exp','_setNodeQueryPath','elements','_p_length','_addProperty','795357HmKpdp','coverage','_additionalMetadata','data','_attemptToReconnectShortly','strLength','hostname','HTMLAllCollection','','NEGATIVE_INFINITY','log','level','push','cappedElements','_console_ninja_session','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','44MRWzxJ','_treeNodePropertiesBeforeFullValue','onmessage','reduceLimits','hits','581935idoRWY','_inBrowser','trace','length','root_exp_id','WebSocket','_allowedToConnectOnSend','readyState','rootExpression','elapsed','next.js','POSITIVE_INFINITY','port','warn','message','_getOwnPropertyDescriptor','sort','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','Boolean','isExpressionToEvaluate','versions','global','pop','default','toLowerCase','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_isNegativeZero','object','negativeZero','stringify','enumerable','_console_ninja','time','ws/index.js','_setNodePermissions','_isUndefined','_reconnectTimeout','forEach','array','null','join','replace','undefined','_connected','_quotedRegExp','_propertyName','stackTraceLimit','_disposeWebsocket','host','\\x20browser','4950wMwxrR','_isMap','_allowedToSend','url','node','cappedProps','_isSet','path','setter','_treeNodePropertiesAfterFullValue','process','[object\\x20Date]','split','1711702262396','Number','timeEnd','_maxConnectAttemptCount','constructor','date','_capIfString','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','prototype','_webSocketErrorDocsLink','_p_','_setNodeId','includes','49812','autoExpand','onerror',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'Symbol','noFunctions','pathToFileURL','map','_addFunctionsNode','_consoleNinjaAllowedToStart','index','stack','dockerizedApp','disabledLog','value','get','_property','_type','then','_WebSocketClass','webpack','_Symbol','props','_setNodeExpandableState','count','performance','toString','_socket','depth','gateway.docker.internal','perf_hooks','autoExpandLimit','_getOwnPropertyNames','negativeInfinity','_connectToHostNow','4qbmFPV','_regExpToString','_setNodeLabel','getOwnPropertySymbols','bind','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','function','ws://','nodeModules','resolveGetters','6977604jsQkuf','_processTreeNodeResult','defineProperty','disabledTrace','226632kCugTN','getOwnPropertyNames','indexOf','NEXT_RUNTIME','747373uNSzML','[object\\x20Array]','parent','_setNodeExpressionPath','onclose','number','bigint',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.296\\\\node_modules\",'current','1.0.0','_ws','serialize','12bvJBCr','Set','_isPrimitiveWrapperType','getter','_cleanNode','sortProps','\\x20server','[object\\x20Set]','_addLoadNode','autoExpandPropertyCount','type','autoExpandMaxDepth','_connectAttemptCount','_hasSymbolPropertyOnItsPath','autoExpandPreviousObjects','getOwnPropertyDescriptor','expressionsToEvaluate','allStrLength','_blacklistedProperty','_HTMLAllCollection','close','send','substr'];_0x58c0=function(){return _0x966b26;};return _0x58c0();}function W(_0x39208c){var _0x2885fd=_0x27946a;let _0x3a767e=function(_0xd5f78f,_0x57294){return _0x57294-_0xd5f78f;},_0x4d25b4;if(_0x39208c[_0x2885fd(0x18d)])_0x4d25b4=function(){var _0x55b713=_0x2885fd;return _0x39208c[_0x55b713(0x18d)][_0x55b713(0x1de)]();};else{if(_0x39208c[_0x2885fd(0x251)]&&_0x39208c['process'][_0x2885fd(0x1d6)]&&_0x39208c[_0x2885fd(0x251)]?.['env']?.[_0x2885fd(0x1a8)]!==_0x2885fd(0x1db))_0x4d25b4=function(){var _0x8cdf4=_0x2885fd;return _0x39208c[_0x8cdf4(0x251)][_0x8cdf4(0x1d6)]();},_0x3a767e=function(_0x32dea8,_0x13553c){return 0x3e8*(_0x13553c[0x0]-_0x32dea8[0x0])+(_0x13553c[0x1]-_0x32dea8[0x1])/0xf4240;};else try{let {performance:_0x34bef1}=require(_0x2885fd(0x192));_0x4d25b4=function(){var _0x3f5695=_0x2885fd;return _0x34bef1[_0x3f5695(0x1de)]();};}catch{_0x4d25b4=function(){return+new Date();};}}return{'elapsed':_0x3a767e,'timeStamp':_0x4d25b4,'now':()=>Date[_0x2885fd(0x1de)]()};}function J(_0x56563b,_0x5eb609,_0x4f8442){var _0x556fe9=_0x27946a;if(_0x56563b['_consoleNinjaAllowedToStart']!==void 0x0)return _0x56563b['_consoleNinjaAllowedToStart'];let _0x47023b=_0x56563b[_0x556fe9(0x251)]?.['versions']?.[_0x556fe9(0x24b)]||_0x56563b[_0x556fe9(0x251)]?.[_0x556fe9(0x1ec)]?.[_0x556fe9(0x1a8)]==='edge';return _0x47023b&&_0x4f8442==='nuxt'?_0x56563b[_0x556fe9(0x26a)]=!0x1:_0x56563b[_0x556fe9(0x26a)]=_0x47023b||!_0x5eb609||_0x56563b[_0x556fe9(0x1f5)]?.[_0x556fe9(0x206)]&&_0x5eb609[_0x556fe9(0x260)](_0x56563b[_0x556fe9(0x1f5)][_0x556fe9(0x206)]),_0x56563b[_0x556fe9(0x26a)];}function _0x43d3(_0x5de56b,_0x42520c){var _0x58c092=_0x58c0();return _0x43d3=function(_0x43d341,_0x39a811){_0x43d341=_0x43d341-0x183;var _0x4a0504=_0x58c092[_0x43d341];return _0x4a0504;},_0x43d3(_0x5de56b,_0x42520c);}function Y(_0x4c5d88,_0x49721c,_0x1d9c0f,_0x27cd18){var _0x5116a1=_0x27946a;_0x4c5d88=_0x4c5d88,_0x49721c=_0x49721c,_0x1d9c0f=_0x1d9c0f,_0x27cd18=_0x27cd18;let _0x392b85=W(_0x4c5d88),_0x381473=_0x392b85[_0x5116a1(0x21e)],_0x5dcc77=_0x392b85[_0x5116a1(0x1f9)];class _0x434f58{constructor(){var _0x568c7f=_0x5116a1;this['_keyStrRegExp']=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x568c7f(0x1ee)]=/^(0|[1-9][0-9]*)$/,this[_0x568c7f(0x241)]=/'([^\\\\']|\\\\')*'/,this[_0x568c7f(0x1f8)]=_0x4c5d88['undefined'],this[_0x568c7f(0x1c8)]=_0x4c5d88[_0x568c7f(0x207)],this[_0x568c7f(0x224)]=Object[_0x568c7f(0x1c4)],this['_getOwnPropertyNames']=Object['getOwnPropertyNames'],this['_Symbol']=_0x4c5d88[_0x568c7f(0x265)],this['_regExpToString']=RegExp['prototype'][_0x568c7f(0x18e)],this['_dateToString']=Date['prototype'][_0x568c7f(0x18e)];}[_0x5116a1(0x1b4)](_0x21d605,_0x3bd565,_0x56f430,_0x197fb0){var _0x580e0d=_0x5116a1,_0x3aa5db=this,_0x567a2a=_0x56f430[_0x580e0d(0x262)];function _0x3f8a27(_0x42bd7d,_0x2aa998,_0x389f74){var _0x548c3a=_0x580e0d;_0x2aa998['type']=_0x548c3a(0x1ef),_0x2aa998['error']=_0x42bd7d[_0x548c3a(0x223)],_0x3e689f=_0x389f74['node'][_0x548c3a(0x1b1)],_0x389f74['node']['current']=_0x2aa998,_0x3aa5db[_0x548c3a(0x211)](_0x2aa998,_0x389f74);}try{_0x56f430[_0x580e0d(0x20b)]++,_0x56f430[_0x580e0d(0x262)]&&_0x56f430[_0x580e0d(0x1c3)][_0x580e0d(0x20c)](_0x3bd565);var _0x58f987,_0x381ac5,_0x127872,_0x1c6c0a,_0x43bf67=[],_0x4c03ce=[],_0x57c97f,_0x14e690=this['_type'](_0x3bd565),_0x21a2cf=_0x14e690===_0x580e0d(0x23b),_0x4240e6=!0x1,_0x4bca52=_0x14e690===_0x580e0d(0x19d),_0x44b8aa=this[_0x580e0d(0x1ed)](_0x14e690),_0x17a4c3=this[_0x580e0d(0x1b7)](_0x14e690),_0x335f37=_0x44b8aa||_0x17a4c3,_0x1b1eff={},_0x12af4d=0x0,_0x3129c4=!0x1,_0x3e689f,_0x180b86=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x56f430[_0x580e0d(0x190)]){if(_0x21a2cf){if(_0x381ac5=_0x3bd565[_0x580e0d(0x218)],_0x381ac5>_0x56f430['elements']){for(_0x127872=0x0,_0x1c6c0a=_0x56f430[_0x580e0d(0x1fd)],_0x58f987=_0x127872;_0x58f987<_0x1c6c0a;_0x58f987++)_0x4c03ce[_0x580e0d(0x20c)](_0x3aa5db[_0x580e0d(0x1ff)](_0x43bf67,_0x3bd565,_0x14e690,_0x58f987,_0x56f430));_0x21d605[_0x580e0d(0x20d)]=!0x0;}else{for(_0x127872=0x0,_0x1c6c0a=_0x381ac5,_0x58f987=_0x127872;_0x58f987<_0x1c6c0a;_0x58f987++)_0x4c03ce[_0x580e0d(0x20c)](_0x3aa5db['_addProperty'](_0x43bf67,_0x3bd565,_0x14e690,_0x58f987,_0x56f430));}_0x56f430[_0x580e0d(0x1be)]+=_0x4c03ce[_0x580e0d(0x218)];}if(!(_0x14e690===_0x580e0d(0x23c)||_0x14e690==='undefined')&&!_0x44b8aa&&_0x14e690!==_0x580e0d(0x1d5)&&_0x14e690!=='Buffer'&&_0x14e690!==_0x580e0d(0x1af)){var _0x5c0258=_0x197fb0[_0x580e0d(0x18a)]||_0x56f430['props'];if(this['_isSet'](_0x3bd565)?(_0x58f987=0x0,_0x3bd565[_0x580e0d(0x23a)](function(_0x224bac){var _0x2d45c7=_0x580e0d;if(_0x12af4d++,_0x56f430[_0x2d45c7(0x1be)]++,_0x12af4d>_0x5c0258){_0x3129c4=!0x0;return;}if(!_0x56f430[_0x2d45c7(0x228)]&&_0x56f430[_0x2d45c7(0x262)]&&_0x56f430[_0x2d45c7(0x1be)]>_0x56f430[_0x2d45c7(0x193)]){_0x3129c4=!0x0;return;}_0x4c03ce[_0x2d45c7(0x20c)](_0x3aa5db[_0x2d45c7(0x1ff)](_0x43bf67,_0x3bd565,_0x2d45c7(0x1b6),_0x58f987++,_0x56f430,function(_0x5151ce){return function(){return _0x5151ce;};}(_0x224bac)));})):this['_isMap'](_0x3bd565)&&_0x3bd565[_0x580e0d(0x23a)](function(_0x5e1c3f,_0x16bf27){var _0x2c9dae=_0x580e0d;if(_0x12af4d++,_0x56f430[_0x2c9dae(0x1be)]++,_0x12af4d>_0x5c0258){_0x3129c4=!0x0;return;}if(!_0x56f430[_0x2c9dae(0x228)]&&_0x56f430[_0x2c9dae(0x262)]&&_0x56f430[_0x2c9dae(0x1be)]>_0x56f430[_0x2c9dae(0x193)]){_0x3129c4=!0x0;return;}var _0x39aedd=_0x16bf27[_0x2c9dae(0x18e)]();_0x39aedd[_0x2c9dae(0x218)]>0x64&&(_0x39aedd=_0x39aedd['slice'](0x0,0x64)+'...'),_0x4c03ce[_0x2c9dae(0x20c)](_0x3aa5db[_0x2c9dae(0x1ff)](_0x43bf67,_0x3bd565,_0x2c9dae(0x1df),_0x39aedd,_0x56f430,function(_0x47a6a8){return function(){return _0x47a6a8;};}(_0x5e1c3f)));}),!_0x4240e6){try{for(_0x57c97f in _0x3bd565)if(!(_0x21a2cf&&_0x180b86['test'](_0x57c97f))&&!this[_0x580e0d(0x1c7)](_0x3bd565,_0x57c97f,_0x56f430)){if(_0x12af4d++,_0x56f430[_0x580e0d(0x1be)]++,_0x12af4d>_0x5c0258){_0x3129c4=!0x0;break;}if(!_0x56f430[_0x580e0d(0x228)]&&_0x56f430[_0x580e0d(0x262)]&&_0x56f430[_0x580e0d(0x1be)]>_0x56f430[_0x580e0d(0x193)]){_0x3129c4=!0x0;break;}_0x4c03ce[_0x580e0d(0x20c)](_0x3aa5db['_addObjectProperty'](_0x43bf67,_0x1b1eff,_0x3bd565,_0x14e690,_0x57c97f,_0x56f430));}}catch{}if(_0x1b1eff[_0x580e0d(0x1fe)]=!0x0,_0x4bca52&&(_0x1b1eff[_0x580e0d(0x1e1)]=!0x0),!_0x3129c4){var _0x56c4c2=[][_0x580e0d(0x1da)](this[_0x580e0d(0x194)](_0x3bd565))[_0x580e0d(0x1da)](this[_0x580e0d(0x1ea)](_0x3bd565));for(_0x58f987=0x0,_0x381ac5=_0x56c4c2[_0x580e0d(0x218)];_0x58f987<_0x381ac5;_0x58f987++)if(_0x57c97f=_0x56c4c2[_0x58f987],!(_0x21a2cf&&_0x180b86['test'](_0x57c97f[_0x580e0d(0x18e)]()))&&!this['_blacklistedProperty'](_0x3bd565,_0x57c97f,_0x56f430)&&!_0x1b1eff[_0x580e0d(0x25e)+_0x57c97f[_0x580e0d(0x18e)]()]){if(_0x12af4d++,_0x56f430[_0x580e0d(0x1be)]++,_0x12af4d>_0x5c0258){_0x3129c4=!0x0;break;}if(!_0x56f430['isExpressionToEvaluate']&&_0x56f430['autoExpand']&&_0x56f430[_0x580e0d(0x1be)]>_0x56f430[_0x580e0d(0x193)]){_0x3129c4=!0x0;break;}_0x4c03ce['push'](_0x3aa5db['_addObjectProperty'](_0x43bf67,_0x1b1eff,_0x3bd565,_0x14e690,_0x57c97f,_0x56f430));}}}}}if(_0x21d605['type']=_0x14e690,_0x335f37?(_0x21d605[_0x580e0d(0x26f)]=_0x3bd565['valueOf'](),this['_capIfString'](_0x14e690,_0x21d605,_0x56f430,_0x197fb0)):_0x14e690===_0x580e0d(0x259)?_0x21d605[_0x580e0d(0x26f)]=this['_dateToString'][_0x580e0d(0x1f4)](_0x3bd565):_0x14e690==='bigint'?_0x21d605[_0x580e0d(0x26f)]=_0x3bd565[_0x580e0d(0x18e)]():_0x14e690===_0x580e0d(0x1cf)?_0x21d605[_0x580e0d(0x26f)]=this[_0x580e0d(0x198)][_0x580e0d(0x1f4)](_0x3bd565):_0x14e690===_0x580e0d(0x1f0)&&this[_0x580e0d(0x189)]?_0x21d605[_0x580e0d(0x26f)]=this[_0x580e0d(0x189)][_0x580e0d(0x25c)][_0x580e0d(0x18e)]['call'](_0x3bd565):!_0x56f430['depth']&&!(_0x14e690==='null'||_0x14e690==='undefined')&&(delete _0x21d605[_0x580e0d(0x26f)],_0x21d605['capped']=!0x0),_0x3129c4&&(_0x21d605[_0x580e0d(0x24c)]=!0x0),_0x3e689f=_0x56f430[_0x580e0d(0x24b)][_0x580e0d(0x1b1)],_0x56f430[_0x580e0d(0x24b)][_0x580e0d(0x1b1)]=_0x21d605,this[_0x580e0d(0x211)](_0x21d605,_0x56f430),_0x4c03ce[_0x580e0d(0x218)]){for(_0x58f987=0x0,_0x381ac5=_0x4c03ce[_0x580e0d(0x218)];_0x58f987<_0x381ac5;_0x58f987++)_0x4c03ce[_0x58f987](_0x58f987);}_0x43bf67[_0x580e0d(0x218)]&&(_0x21d605[_0x580e0d(0x18a)]=_0x43bf67);}catch(_0x44c5b0){_0x3f8a27(_0x44c5b0,_0x21d605,_0x56f430);}return this[_0x580e0d(0x202)](_0x3bd565,_0x21d605),this['_treeNodePropertiesAfterFullValue'](_0x21d605,_0x56f430),_0x56f430[_0x580e0d(0x24b)][_0x580e0d(0x1b1)]=_0x3e689f,_0x56f430[_0x580e0d(0x20b)]--,_0x56f430['autoExpand']=_0x567a2a,_0x56f430['autoExpand']&&_0x56f430[_0x580e0d(0x1c3)][_0x580e0d(0x22b)](),_0x21d605;}[_0x5116a1(0x1ea)](_0x1d2efb){var _0xceb0fa=_0x5116a1;return Object[_0xceb0fa(0x19a)]?Object[_0xceb0fa(0x19a)](_0x1d2efb):[];}[_0x5116a1(0x24d)](_0xef5c9b){var _0x5e0e76=_0x5116a1;return!!(_0xef5c9b&&_0x4c5d88[_0x5e0e76(0x1b6)]&&this[_0x5e0e76(0x1e5)](_0xef5c9b)===_0x5e0e76(0x1bc)&&_0xef5c9b[_0x5e0e76(0x23a)]);}[_0x5116a1(0x1c7)](_0x505e67,_0x349a39,_0x3d8a34){var _0x3cfac4=_0x5116a1;return _0x3d8a34[_0x3cfac4(0x266)]?typeof _0x505e67[_0x349a39]==_0x3cfac4(0x19d):!0x1;}[_0x5116a1(0x185)](_0x2e9881){var _0x53d0a6=_0x5116a1,_0x221ded='';return _0x221ded=typeof _0x2e9881,_0x221ded===_0x53d0a6(0x230)?this[_0x53d0a6(0x1e5)](_0x2e9881)===_0x53d0a6(0x1aa)?_0x221ded=_0x53d0a6(0x23b):this[_0x53d0a6(0x1e5)](_0x2e9881)===_0x53d0a6(0x252)?_0x221ded=_0x53d0a6(0x259):this['_objectToString'](_0x2e9881)==='[object\\x20BigInt]'?_0x221ded='bigint':_0x2e9881===null?_0x221ded='null':_0x2e9881['constructor']&&(_0x221ded=_0x2e9881[_0x53d0a6(0x258)][_0x53d0a6(0x1f6)]||_0x221ded):_0x221ded===_0x53d0a6(0x23f)&&this[_0x53d0a6(0x1c8)]&&_0x2e9881 instanceof this[_0x53d0a6(0x1c8)]&&(_0x221ded=_0x53d0a6(0x207)),_0x221ded;}[_0x5116a1(0x1e5)](_0x228b62){var _0x4f4f4d=_0x5116a1;return Object['prototype'][_0x4f4f4d(0x18e)]['call'](_0x228b62);}['_isPrimitiveType'](_0x46b8f8){var _0x410112=_0x5116a1;return _0x46b8f8==='boolean'||_0x46b8f8===_0x410112(0x1e3)||_0x46b8f8===_0x410112(0x1ae);}[_0x5116a1(0x1b7)](_0x2936bb){var _0x34f025=_0x5116a1;return _0x2936bb===_0x34f025(0x227)||_0x2936bb===_0x34f025(0x1d5)||_0x2936bb===_0x34f025(0x255);}[_0x5116a1(0x1ff)](_0x4c6488,_0x34f9ba,_0x228262,_0x1ee559,_0x4cb867,_0xda1ee2){var _0x57237f=this;return function(_0x396db4){var _0x55d784=_0x43d3,_0x459746=_0x4cb867[_0x55d784(0x24b)]['current'],_0x105426=_0x4cb867[_0x55d784(0x24b)][_0x55d784(0x26b)],_0x1f6702=_0x4cb867['node'][_0x55d784(0x1ab)];_0x4cb867[_0x55d784(0x24b)][_0x55d784(0x1ab)]=_0x459746,_0x4cb867[_0x55d784(0x24b)][_0x55d784(0x26b)]=typeof _0x1ee559==_0x55d784(0x1ae)?_0x1ee559:_0x396db4,_0x4c6488[_0x55d784(0x20c)](_0x57237f[_0x55d784(0x184)](_0x34f9ba,_0x228262,_0x1ee559,_0x4cb867,_0xda1ee2)),_0x4cb867['node'][_0x55d784(0x1ab)]=_0x1f6702,_0x4cb867['node'][_0x55d784(0x26b)]=_0x105426;};}['_addObjectProperty'](_0x2d5e21,_0x1c0928,_0x3e78be,_0x3a694e,_0x2fcafb,_0x5439cc,_0x22285b){var _0x2e5016=_0x5116a1,_0x4fa967=this;return _0x1c0928[_0x2e5016(0x25e)+_0x2fcafb[_0x2e5016(0x18e)]()]=!0x0,function(_0x6e728a){var _0x476202=_0x2e5016,_0xfb3a11=_0x5439cc[_0x476202(0x24b)][_0x476202(0x1b1)],_0x38bf0b=_0x5439cc[_0x476202(0x24b)]['index'],_0x890d15=_0x5439cc[_0x476202(0x24b)]['parent'];_0x5439cc[_0x476202(0x24b)][_0x476202(0x1ab)]=_0xfb3a11,_0x5439cc[_0x476202(0x24b)][_0x476202(0x26b)]=_0x6e728a,_0x2d5e21[_0x476202(0x20c)](_0x4fa967[_0x476202(0x184)](_0x3e78be,_0x3a694e,_0x2fcafb,_0x5439cc,_0x22285b)),_0x5439cc['node'][_0x476202(0x1ab)]=_0x890d15,_0x5439cc[_0x476202(0x24b)][_0x476202(0x26b)]=_0x38bf0b;};}[_0x5116a1(0x184)](_0x1b859a,_0x5090d1,_0x32dee6,_0x1ba10b,_0x52c798){var _0x3d8d14=_0x5116a1,_0x4fc0be=this;_0x52c798||(_0x52c798=function(_0x46408c,_0x16d947){return _0x46408c[_0x16d947];});var _0x37605d=_0x32dee6[_0x3d8d14(0x18e)](),_0x3a03c7=_0x1ba10b[_0x3d8d14(0x1c5)]||{},_0x502b18=_0x1ba10b[_0x3d8d14(0x190)],_0x2addf7=_0x1ba10b[_0x3d8d14(0x228)];try{var _0x407676=this[_0x3d8d14(0x248)](_0x1b859a),_0x1092ea=_0x37605d;_0x407676&&_0x1092ea[0x0]==='\\x27'&&(_0x1092ea=_0x1092ea[_0x3d8d14(0x1cb)](0x1,_0x1092ea[_0x3d8d14(0x218)]-0x2));var _0x2b0930=_0x1ba10b[_0x3d8d14(0x1c5)]=_0x3a03c7['_p_'+_0x1092ea];_0x2b0930&&(_0x1ba10b['depth']=_0x1ba10b[_0x3d8d14(0x190)]+0x1),_0x1ba10b[_0x3d8d14(0x228)]=!!_0x2b0930;var _0x27bc63=typeof _0x32dee6=='symbol',_0x4c22b5={'name':_0x27bc63||_0x407676?_0x37605d:this['_propertyName'](_0x37605d)};if(_0x27bc63&&(_0x4c22b5[_0x3d8d14(0x1f0)]=!0x0),!(_0x5090d1===_0x3d8d14(0x23b)||_0x5090d1==='Error')){var _0x5992f3=this['_getOwnPropertyDescriptor'](_0x1b859a,_0x32dee6);if(_0x5992f3&&(_0x5992f3['set']&&(_0x4c22b5[_0x3d8d14(0x24f)]=!0x0),_0x5992f3[_0x3d8d14(0x183)]&&!_0x2b0930&&!_0x1ba10b[_0x3d8d14(0x1a0)]))return _0x4c22b5[_0x3d8d14(0x1b8)]=!0x0,this[_0x3d8d14(0x1a2)](_0x4c22b5,_0x1ba10b),_0x4c22b5;}var _0x33006e;try{_0x33006e=_0x52c798(_0x1b859a,_0x32dee6);}catch(_0x3ec208){return _0x4c22b5={'name':_0x37605d,'type':_0x3d8d14(0x1ef),'error':_0x3ec208['message']},this['_processTreeNodeResult'](_0x4c22b5,_0x1ba10b),_0x4c22b5;}var _0x242c9f=this[_0x3d8d14(0x185)](_0x33006e),_0x51b6af=this[_0x3d8d14(0x1ed)](_0x242c9f);if(_0x4c22b5['type']=_0x242c9f,_0x51b6af)this[_0x3d8d14(0x1a2)](_0x4c22b5,_0x1ba10b,_0x33006e,function(){var _0x1a1845=_0x3d8d14;_0x4c22b5[_0x1a1845(0x26f)]=_0x33006e['valueOf'](),!_0x2b0930&&_0x4fc0be[_0x1a1845(0x25a)](_0x242c9f,_0x4c22b5,_0x1ba10b,{});});else{var _0x43f374=_0x1ba10b[_0x3d8d14(0x262)]&&_0x1ba10b[_0x3d8d14(0x20b)]<_0x1ba10b[_0x3d8d14(0x1c0)]&&_0x1ba10b[_0x3d8d14(0x1c3)][_0x3d8d14(0x1a7)](_0x33006e)<0x0&&_0x242c9f!==_0x3d8d14(0x19d)&&_0x1ba10b['autoExpandPropertyCount']<_0x1ba10b[_0x3d8d14(0x193)];_0x43f374||_0x1ba10b[_0x3d8d14(0x20b)]<_0x502b18||_0x2b0930?(this[_0x3d8d14(0x1b4)](_0x4c22b5,_0x33006e,_0x1ba10b,_0x2b0930||{}),this[_0x3d8d14(0x202)](_0x33006e,_0x4c22b5)):this[_0x3d8d14(0x1a2)](_0x4c22b5,_0x1ba10b,_0x33006e,function(){var _0xc322fb=_0x3d8d14;_0x242c9f===_0xc322fb(0x23c)||_0x242c9f===_0xc322fb(0x23f)||(delete _0x4c22b5[_0xc322fb(0x26f)],_0x4c22b5[_0xc322fb(0x1d7)]=!0x0);});}return _0x4c22b5;}finally{_0x1ba10b['expressionsToEvaluate']=_0x3a03c7,_0x1ba10b['depth']=_0x502b18,_0x1ba10b[_0x3d8d14(0x228)]=_0x2addf7;}}[_0x5116a1(0x25a)](_0x564f46,_0x303944,_0x450e7e,_0x3d9b2c){var _0xd62433=_0x5116a1,_0x4df558=_0x3d9b2c[_0xd62433(0x205)]||_0x450e7e['strLength'];if((_0x564f46===_0xd62433(0x1e3)||_0x564f46==='String')&&_0x303944[_0xd62433(0x26f)]){let _0x5e909b=_0x303944[_0xd62433(0x26f)][_0xd62433(0x218)];_0x450e7e[_0xd62433(0x1c6)]+=_0x5e909b,_0x450e7e[_0xd62433(0x1c6)]>_0x450e7e[_0xd62433(0x1d0)]?(_0x303944['capped']='',delete _0x303944['value']):_0x5e909b>_0x4df558&&(_0x303944['capped']=_0x303944[_0xd62433(0x26f)][_0xd62433(0x1cb)](0x0,_0x4df558),delete _0x303944[_0xd62433(0x26f)]);}}['_isMap'](_0x202f14){var _0x144376=_0x5116a1;return!!(_0x202f14&&_0x4c5d88[_0x144376(0x1df)]&&this['_objectToString'](_0x202f14)===_0x144376(0x1dc)&&_0x202f14['forEach']);}[_0x5116a1(0x242)](_0x424f64){var _0x99c597=_0x5116a1;if(_0x424f64['match'](/^\\d+$/))return _0x424f64;var _0xe78492;try{_0xe78492=JSON[_0x99c597(0x232)](''+_0x424f64);}catch{_0xe78492='\\x22'+this[_0x99c597(0x1e5)](_0x424f64)+'\\x22';}return _0xe78492[_0x99c597(0x1dd)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0xe78492=_0xe78492[_0x99c597(0x1cb)](0x1,_0xe78492['length']-0x2):_0xe78492=_0xe78492[_0x99c597(0x23e)](/'/g,'\\x5c\\x27')[_0x99c597(0x23e)](/\\\\\"/g,'\\x22')[_0x99c597(0x23e)](/(^\"|\"$)/g,'\\x27'),_0xe78492;}['_processTreeNodeResult'](_0xf030e5,_0x5eae96,_0x410ef9,_0x69cfd6){var _0x25ffc2=_0x5116a1;this[_0x25ffc2(0x211)](_0xf030e5,_0x5eae96),_0x69cfd6&&_0x69cfd6(),this[_0x25ffc2(0x202)](_0x410ef9,_0xf030e5),this[_0x25ffc2(0x250)](_0xf030e5,_0x5eae96);}['_treeNodePropertiesBeforeFullValue'](_0x41588f,_0x3bccce){var _0x3dafcd=_0x5116a1;this[_0x3dafcd(0x25f)](_0x41588f,_0x3bccce),this[_0x3dafcd(0x1fc)](_0x41588f,_0x3bccce),this[_0x3dafcd(0x1ac)](_0x41588f,_0x3bccce),this[_0x3dafcd(0x237)](_0x41588f,_0x3bccce);}[_0x5116a1(0x25f)](_0x239141,_0x26dce4){}[_0x5116a1(0x1fc)](_0x1e64b4,_0x40e14f){}[_0x5116a1(0x199)](_0x1d2957,_0x77fc70){}[_0x5116a1(0x238)](_0x220d18){var _0xda625f=_0x5116a1;return _0x220d18===this[_0xda625f(0x1f8)];}[_0x5116a1(0x250)](_0x4c01c2,_0x4dead1){var _0x5b837b=_0x5116a1;this[_0x5b837b(0x199)](_0x4c01c2,_0x4dead1),this[_0x5b837b(0x18b)](_0x4c01c2),_0x4dead1[_0x5b837b(0x1ba)]&&this[_0x5b837b(0x1f3)](_0x4c01c2),this[_0x5b837b(0x269)](_0x4c01c2,_0x4dead1),this[_0x5b837b(0x1bd)](_0x4c01c2,_0x4dead1),this[_0x5b837b(0x1b9)](_0x4c01c2);}['_additionalMetadata'](_0x43e279,_0x33a140){var _0x3b409e=_0x5116a1;let _0x425109;try{_0x4c5d88[_0x3b409e(0x1e2)]&&(_0x425109=_0x4c5d88['console'][_0x3b409e(0x1e6)],_0x4c5d88[_0x3b409e(0x1e2)][_0x3b409e(0x1e6)]=function(){}),_0x43e279&&typeof _0x43e279[_0x3b409e(0x218)]==_0x3b409e(0x1ae)&&(_0x33a140[_0x3b409e(0x218)]=_0x43e279[_0x3b409e(0x218)]);}catch{}finally{_0x425109&&(_0x4c5d88[_0x3b409e(0x1e2)]['error']=_0x425109);}if(_0x33a140[_0x3b409e(0x1bf)]===_0x3b409e(0x1ae)||_0x33a140[_0x3b409e(0x1bf)]===_0x3b409e(0x255)){if(isNaN(_0x33a140['value']))_0x33a140[_0x3b409e(0x1e9)]=!0x0,delete _0x33a140[_0x3b409e(0x26f)];else switch(_0x33a140[_0x3b409e(0x26f)]){case Number[_0x3b409e(0x220)]:_0x33a140[_0x3b409e(0x1d9)]=!0x0,delete _0x33a140[_0x3b409e(0x26f)];break;case Number[_0x3b409e(0x209)]:_0x33a140[_0x3b409e(0x195)]=!0x0,delete _0x33a140['value'];break;case 0x0:this[_0x3b409e(0x22f)](_0x33a140[_0x3b409e(0x26f)])&&(_0x33a140[_0x3b409e(0x231)]=!0x0);break;}}else _0x33a140['type']==='function'&&typeof _0x43e279[_0x3b409e(0x1f6)]==_0x3b409e(0x1e3)&&_0x43e279[_0x3b409e(0x1f6)]&&_0x33a140[_0x3b409e(0x1f6)]&&_0x43e279['name']!==_0x33a140['name']&&(_0x33a140[_0x3b409e(0x1fa)]=_0x43e279[_0x3b409e(0x1f6)]);}[_0x5116a1(0x22f)](_0x3717f6){var _0x430a0c=_0x5116a1;return 0x1/_0x3717f6===Number[_0x430a0c(0x209)];}['_sortProps'](_0x1fa6c1){var _0x458083=_0x5116a1;!_0x1fa6c1[_0x458083(0x18a)]||!_0x1fa6c1[_0x458083(0x18a)]['length']||_0x1fa6c1[_0x458083(0x1bf)]===_0x458083(0x23b)||_0x1fa6c1[_0x458083(0x1bf)]===_0x458083(0x1df)||_0x1fa6c1[_0x458083(0x1bf)]===_0x458083(0x1b6)||_0x1fa6c1[_0x458083(0x18a)][_0x458083(0x225)](function(_0x34a653,_0x20096e){var _0x1f576c=_0x458083,_0x3edf0d=_0x34a653['name'][_0x1f576c(0x22d)](),_0x9923b4=_0x20096e[_0x1f576c(0x1f6)]['toLowerCase']();return _0x3edf0d<_0x9923b4?-0x1:_0x3edf0d>_0x9923b4?0x1:0x0;});}['_addFunctionsNode'](_0x40ad2a,_0x42f81b){var _0x2846cf=_0x5116a1;if(!(_0x42f81b[_0x2846cf(0x266)]||!_0x40ad2a[_0x2846cf(0x18a)]||!_0x40ad2a[_0x2846cf(0x18a)]['length'])){for(var _0x52c491=[],_0x272b4c=[],_0x4fa893=0x0,_0x2a4e69=_0x40ad2a[_0x2846cf(0x18a)][_0x2846cf(0x218)];_0x4fa893<_0x2a4e69;_0x4fa893++){var _0x1b894b=_0x40ad2a[_0x2846cf(0x18a)][_0x4fa893];_0x1b894b[_0x2846cf(0x1bf)]===_0x2846cf(0x19d)?_0x52c491[_0x2846cf(0x20c)](_0x1b894b):_0x272b4c[_0x2846cf(0x20c)](_0x1b894b);}if(!(!_0x272b4c['length']||_0x52c491['length']<=0x1)){_0x40ad2a['props']=_0x272b4c;var _0x572436={'functionsNode':!0x0,'props':_0x52c491};this[_0x2846cf(0x25f)](_0x572436,_0x42f81b),this[_0x2846cf(0x199)](_0x572436,_0x42f81b),this[_0x2846cf(0x18b)](_0x572436),this[_0x2846cf(0x237)](_0x572436,_0x42f81b),_0x572436['id']+='\\x20f',_0x40ad2a[_0x2846cf(0x18a)][_0x2846cf(0x1eb)](_0x572436);}}}[_0x5116a1(0x1bd)](_0x11509f,_0x12b1c8){}[_0x5116a1(0x18b)](_0x4412ad){}['_isArray'](_0x481f1f){var _0x56e4a7=_0x5116a1;return Array['isArray'](_0x481f1f)||typeof _0x481f1f==_0x56e4a7(0x230)&&this[_0x56e4a7(0x1e5)](_0x481f1f)===_0x56e4a7(0x1aa);}['_setNodePermissions'](_0x148734,_0xb4b74e){}[_0x5116a1(0x1b9)](_0x4402a0){var _0x49197f=_0x5116a1;delete _0x4402a0[_0x49197f(0x1c2)],delete _0x4402a0['_hasSetOnItsPath'],delete _0x4402a0['_hasMapOnItsPath'];}['_setNodeExpressionPath'](_0x5533fe,_0x30f991){}}let _0xd8ec20=new _0x434f58(),_0x10a434={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x16b05f={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x5a1c28(_0x17fdf0,_0x34bac0,_0xaaf01d,_0x2bb8ba,_0x23f807,_0xf10145){var _0x26170b=_0x5116a1;let _0x8fc35b,_0x26e908;try{_0x26e908=_0x5dcc77(),_0x8fc35b=_0x1d9c0f[_0x34bac0],!_0x8fc35b||_0x26e908-_0x8fc35b['ts']>0x1f4&&_0x8fc35b[_0x26170b(0x18c)]&&_0x8fc35b[_0x26170b(0x235)]/_0x8fc35b[_0x26170b(0x18c)]<0x64?(_0x1d9c0f[_0x34bac0]=_0x8fc35b={'count':0x0,'time':0x0,'ts':_0x26e908},_0x1d9c0f[_0x26170b(0x214)]={}):_0x26e908-_0x1d9c0f[_0x26170b(0x214)]['ts']>0x32&&_0x1d9c0f[_0x26170b(0x214)]['count']&&_0x1d9c0f[_0x26170b(0x214)][_0x26170b(0x235)]/_0x1d9c0f[_0x26170b(0x214)]['count']<0x64&&(_0x1d9c0f['hits']={});let _0x26c188=[],_0x296cc4=_0x8fc35b[_0x26170b(0x213)]||_0x1d9c0f[_0x26170b(0x214)]['reduceLimits']?_0x16b05f:_0x10a434,_0x343e27=_0x42db96=>{var _0x1004ae=_0x26170b;let _0x4d331d={};return _0x4d331d['props']=_0x42db96[_0x1004ae(0x18a)],_0x4d331d[_0x1004ae(0x1fd)]=_0x42db96['elements'],_0x4d331d[_0x1004ae(0x205)]=_0x42db96[_0x1004ae(0x205)],_0x4d331d['totalStrLength']=_0x42db96[_0x1004ae(0x1d0)],_0x4d331d[_0x1004ae(0x193)]=_0x42db96[_0x1004ae(0x193)],_0x4d331d[_0x1004ae(0x1c0)]=_0x42db96['autoExpandMaxDepth'],_0x4d331d['sortProps']=!0x1,_0x4d331d[_0x1004ae(0x266)]=!_0x49721c,_0x4d331d[_0x1004ae(0x190)]=0x1,_0x4d331d['level']=0x0,_0x4d331d['expId']=_0x1004ae(0x219),_0x4d331d[_0x1004ae(0x21d)]=_0x1004ae(0x1fb),_0x4d331d['autoExpand']=!0x0,_0x4d331d[_0x1004ae(0x1c3)]=[],_0x4d331d['autoExpandPropertyCount']=0x0,_0x4d331d['resolveGetters']=!0x0,_0x4d331d['allStrLength']=0x0,_0x4d331d['node']={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x4d331d;};for(var _0x2d749e=0x0;_0x2d749e<_0x23f807['length'];_0x2d749e++)_0x26c188[_0x26170b(0x20c)](_0xd8ec20[_0x26170b(0x1b4)]({'timeNode':_0x17fdf0===_0x26170b(0x235)||void 0x0},_0x23f807[_0x2d749e],_0x343e27(_0x296cc4),{}));if(_0x17fdf0===_0x26170b(0x217)){let _0x4a0067=Error[_0x26170b(0x243)];try{Error[_0x26170b(0x243)]=0x1/0x0,_0x26c188[_0x26170b(0x20c)](_0xd8ec20['serialize']({'stackNode':!0x0},new Error()[_0x26170b(0x26c)],_0x343e27(_0x296cc4),{'strLength':0x1/0x0}));}finally{Error[_0x26170b(0x243)]=_0x4a0067;}}return{'method':_0x26170b(0x20a),'version':_0x27cd18,'args':[{'ts':_0xaaf01d,'session':_0x2bb8ba,'args':_0x26c188,'id':_0x34bac0,'context':_0xf10145}]};}catch(_0x1b8cee){return{'method':_0x26170b(0x20a),'version':_0x27cd18,'args':[{'ts':_0xaaf01d,'session':_0x2bb8ba,'args':[{'type':_0x26170b(0x1ef),'error':_0x1b8cee&&_0x1b8cee[_0x26170b(0x223)]}],'id':_0x34bac0,'context':_0xf10145}]};}finally{try{if(_0x8fc35b&&_0x26e908){let _0x4cdfdf=_0x5dcc77();_0x8fc35b['count']++,_0x8fc35b[_0x26170b(0x235)]+=_0x381473(_0x26e908,_0x4cdfdf),_0x8fc35b['ts']=_0x4cdfdf,_0x1d9c0f[_0x26170b(0x214)]['count']++,_0x1d9c0f[_0x26170b(0x214)][_0x26170b(0x235)]+=_0x381473(_0x26e908,_0x4cdfdf),_0x1d9c0f[_0x26170b(0x214)]['ts']=_0x4cdfdf,(_0x8fc35b[_0x26170b(0x18c)]>0x32||_0x8fc35b[_0x26170b(0x235)]>0x64)&&(_0x8fc35b[_0x26170b(0x213)]=!0x0),(_0x1d9c0f[_0x26170b(0x214)][_0x26170b(0x18c)]>0x3e8||_0x1d9c0f['hits'][_0x26170b(0x235)]>0x12c)&&(_0x1d9c0f[_0x26170b(0x214)][_0x26170b(0x213)]=!0x0);}}catch{}}}return _0x5a1c28;}((_0x426497,_0x1c4c17,_0x338f37,_0x2f1ff3,_0x34469a,_0x3ec360,_0x409b71,_0x4b0695,_0x557f25,_0x1c6b12)=>{var _0x4aca28=_0x27946a;if(_0x426497[_0x4aca28(0x234)])return _0x426497[_0x4aca28(0x234)];if(!J(_0x426497,_0x4b0695,_0x34469a))return _0x426497[_0x4aca28(0x234)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x426497['_console_ninja'];let _0x52ca4d=W(_0x426497),_0x24a275=_0x52ca4d[_0x4aca28(0x21e)],_0x308b0a=_0x52ca4d['timeStamp'],_0x288e5f=_0x52ca4d[_0x4aca28(0x1de)],_0x56240d={'hits':{},'ts':{}},_0xce5edc=Y(_0x426497,_0x557f25,_0x56240d,_0x3ec360),_0x507323=_0x23d977=>{_0x56240d['ts'][_0x23d977]=_0x308b0a();},_0x2ab67f=(_0x179cd6,_0x3d5a71)=>{let _0x52d9a6=_0x56240d['ts'][_0x3d5a71];if(delete _0x56240d['ts'][_0x3d5a71],_0x52d9a6){let _0x422c62=_0x24a275(_0x52d9a6,_0x308b0a());_0x304040(_0xce5edc('time',_0x179cd6,_0x288e5f(),_0x3708aa,[_0x422c62],_0x3d5a71));}},_0x2b9dcf=_0x4abb50=>_0xc3710=>{var _0x337607=_0x4aca28;try{_0x507323(_0xc3710),_0x4abb50(_0xc3710);}finally{_0x426497[_0x337607(0x1e2)]['time']=_0x4abb50;}},_0x2a8834=_0x16838c=>_0x59710d=>{var _0x385aa1=_0x4aca28;try{let [_0x398c4f,_0x5e9caf]=_0x59710d[_0x385aa1(0x253)](':logPointId:');_0x2ab67f(_0x5e9caf,_0x398c4f),_0x16838c(_0x398c4f);}finally{_0x426497[_0x385aa1(0x1e2)][_0x385aa1(0x256)]=_0x16838c;}};_0x426497[_0x4aca28(0x234)]={'consoleLog':(_0x451f83,_0x150514)=>{var _0x38083f=_0x4aca28;_0x426497[_0x38083f(0x1e2)][_0x38083f(0x20a)]['name']!==_0x38083f(0x26e)&&_0x304040(_0xce5edc('log',_0x451f83,_0x288e5f(),_0x3708aa,_0x150514));},'consoleTrace':(_0x422a9c,_0x552a39)=>{var _0x151413=_0x4aca28;_0x426497['console'][_0x151413(0x20a)][_0x151413(0x1f6)]!==_0x151413(0x1a4)&&_0x304040(_0xce5edc('trace',_0x422a9c,_0x288e5f(),_0x3708aa,_0x552a39));},'consoleTime':()=>{var _0x18d293=_0x4aca28;_0x426497[_0x18d293(0x1e2)][_0x18d293(0x235)]=_0x2b9dcf(_0x426497['console'][_0x18d293(0x235)]);},'consoleTimeEnd':()=>{var _0x347a45=_0x4aca28;_0x426497[_0x347a45(0x1e2)][_0x347a45(0x256)]=_0x2a8834(_0x426497['console'][_0x347a45(0x256)]);},'autoLog':(_0x4ea92b,_0x3f8d45)=>{var _0xd68aed=_0x4aca28;_0x304040(_0xce5edc(_0xd68aed(0x20a),_0x3f8d45,_0x288e5f(),_0x3708aa,[_0x4ea92b]));},'autoLogMany':(_0x5085f8,_0x4863b3)=>{_0x304040(_0xce5edc('log',_0x5085f8,_0x288e5f(),_0x3708aa,_0x4863b3));},'autoTrace':(_0x800e62,_0x13e617)=>{var _0x3b3478=_0x4aca28;_0x304040(_0xce5edc(_0x3b3478(0x217),_0x13e617,_0x288e5f(),_0x3708aa,[_0x800e62]));},'autoTraceMany':(_0x26d858,_0xf09cdb)=>{var _0x1d9d33=_0x4aca28;_0x304040(_0xce5edc(_0x1d9d33(0x217),_0x26d858,_0x288e5f(),_0x3708aa,_0xf09cdb));},'autoTime':(_0x259368,_0xecd22b,_0x16ee6f)=>{_0x507323(_0x16ee6f);},'autoTimeEnd':(_0x3c29e9,_0x2946ad,_0x745419)=>{_0x2ab67f(_0x2946ad,_0x745419);},'coverage':_0x363ec7=>{var _0x106e40=_0x4aca28;_0x304040({'method':_0x106e40(0x201),'version':_0x3ec360,'args':[{'id':_0x363ec7}]});}};let _0x304040=b(_0x426497,_0x1c4c17,_0x338f37,_0x2f1ff3,_0x34469a,_0x1c6b12),_0x3708aa=_0x426497['_console_ninja_session'];return _0x426497[_0x4aca28(0x234)];})(globalThis,_0x27946a(0x1f1),_0x27946a(0x261),_0x27946a(0x1b0),_0x27946a(0x188),_0x27946a(0x1b2),_0x27946a(0x254),_0x27946a(0x264),_0x27946a(0x208),'');");
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