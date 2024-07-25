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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x4fa3d0=_0xfb3c;(function(_0x530cc0,_0x24d354){var _0x57c805=_0xfb3c,_0x493ad0=_0x530cc0();while(!![]){try{var _0x86f2da=parseInt(_0x57c805(0x1d6))/0x1*(parseInt(_0x57c805(0x20f))/0x2)+parseInt(_0x57c805(0x19c))/0x3+-parseInt(_0x57c805(0x156))/0x4+-parseInt(_0x57c805(0x1f9))/0x5*(-parseInt(_0x57c805(0x186))/0x6)+parseInt(_0x57c805(0x1d3))/0x7+-parseInt(_0x57c805(0x15a))/0x8*(parseInt(_0x57c805(0x14e))/0x9)+-parseInt(_0x57c805(0x16e))/0xa*(parseInt(_0x57c805(0x176))/0xb);if(_0x86f2da===_0x24d354)break;else _0x493ad0['push'](_0x493ad0['shift']());}catch(_0x23c406){_0x493ad0['push'](_0x493ad0['shift']());}}}(_0x18f8,0x491d2));var K=Object[_0x4fa3d0(0x1bc)],Q=Object[_0x4fa3d0(0x162)],G=Object['getOwnPropertyDescriptor'],ee=Object[_0x4fa3d0(0x164)],te=Object[_0x4fa3d0(0x1f6)],ne=Object[_0x4fa3d0(0x19e)]['hasOwnProperty'],re=(_0x3f5500,_0x561e31,_0x4c5259,_0x9b482f)=>{var _0x2bdc4f=_0x4fa3d0;if(_0x561e31&&typeof _0x561e31==_0x2bdc4f(0x1be)||typeof _0x561e31==_0x2bdc4f(0x1eb)){for(let _0x539f9d of ee(_0x561e31))!ne[_0x2bdc4f(0x1fd)](_0x3f5500,_0x539f9d)&&_0x539f9d!==_0x4c5259&&Q(_0x3f5500,_0x539f9d,{'get':()=>_0x561e31[_0x539f9d],'enumerable':!(_0x9b482f=G(_0x561e31,_0x539f9d))||_0x9b482f[_0x2bdc4f(0x1fe)]});}return _0x3f5500;},V=(_0x7dc175,_0x51f1ba,_0x442285)=>(_0x442285=_0x7dc175!=null?K(te(_0x7dc175)):{},re(_0x51f1ba||!_0x7dc175||!_0x7dc175[_0x4fa3d0(0x153)]?Q(_0x442285,_0x4fa3d0(0x222),{'value':_0x7dc175,'enumerable':!0x0}):_0x442285,_0x7dc175)),x=class{constructor(_0x1c3164,_0x5a3170,_0xb69899,_0x4b2abd,_0x27db32,_0x1f7e42){var _0x337d0b=_0x4fa3d0,_0x46c72,_0x30656c,_0x19bfe6,_0x44c137;this[_0x337d0b(0x159)]=_0x1c3164,this['host']=_0x5a3170,this[_0x337d0b(0x20a)]=_0xb69899,this[_0x337d0b(0x181)]=_0x4b2abd,this[_0x337d0b(0x1b7)]=_0x27db32,this['eventReceivedCallback']=_0x1f7e42,this[_0x337d0b(0x16b)]=!0x0,this[_0x337d0b(0x16a)]=!0x0,this['_connected']=!0x1,this['_connecting']=!0x1,this[_0x337d0b(0x1b0)]=((_0x30656c=(_0x46c72=_0x1c3164[_0x337d0b(0x214)])==null?void 0x0:_0x46c72['env'])==null?void 0x0:_0x30656c[_0x337d0b(0x22b)])===_0x337d0b(0x239),this[_0x337d0b(0x1c2)]=!((_0x44c137=(_0x19bfe6=this[_0x337d0b(0x159)][_0x337d0b(0x214)])==null?void 0x0:_0x19bfe6[_0x337d0b(0x1b6)])!=null&&_0x44c137[_0x337d0b(0x229)])&&!this[_0x337d0b(0x1b0)],this[_0x337d0b(0x21f)]=null,this[_0x337d0b(0x184)]=0x0,this[_0x337d0b(0x1f1)]=0x14,this['_webSocketErrorDocsLink']=_0x337d0b(0x155),this[_0x337d0b(0x211)]=(this[_0x337d0b(0x1c2)]?'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20':_0x337d0b(0x1ff))+this['_webSocketErrorDocsLink'];}async[_0x4fa3d0(0x1b9)](){var _0x4b2340=_0x4fa3d0,_0x693348,_0x47a6bb;if(this[_0x4b2340(0x21f)])return this['_WebSocketClass'];let _0x2d7bb5;if(this[_0x4b2340(0x1c2)]||this[_0x4b2340(0x1b0)])_0x2d7bb5=this[_0x4b2340(0x159)][_0x4b2340(0x1cf)];else{if((_0x693348=this['global'][_0x4b2340(0x214)])!=null&&_0x693348['_WebSocket'])_0x2d7bb5=(_0x47a6bb=this[_0x4b2340(0x159)][_0x4b2340(0x214)])==null?void 0x0:_0x47a6bb[_0x4b2340(0x213)];else try{let _0xe5ec1b=await import(_0x4b2340(0x1c9));_0x2d7bb5=(await import((await import(_0x4b2340(0x1b2)))[_0x4b2340(0x15c)](_0xe5ec1b[_0x4b2340(0x188)](this[_0x4b2340(0x181)],_0x4b2340(0x225)))[_0x4b2340(0x1e4)]()))[_0x4b2340(0x222)];}catch{try{_0x2d7bb5=require(require(_0x4b2340(0x1c9))[_0x4b2340(0x188)](this['nodeModules'],'ws'));}catch{throw new Error(_0x4b2340(0x232));}}}return this[_0x4b2340(0x21f)]=_0x2d7bb5,_0x2d7bb5;}[_0x4fa3d0(0x1bd)](){var _0x50e2a0=_0x4fa3d0;this[_0x50e2a0(0x20e)]||this[_0x50e2a0(0x238)]||this[_0x50e2a0(0x184)]>=this[_0x50e2a0(0x1f1)]||(this['_allowedToConnectOnSend']=!0x1,this[_0x50e2a0(0x20e)]=!0x0,this[_0x50e2a0(0x184)]++,this[_0x50e2a0(0x1c8)]=new Promise((_0xca6c4a,_0x3c2e73)=>{var _0x17938c=_0x50e2a0;this[_0x17938c(0x1b9)]()['then'](_0x390343=>{var _0x4f50d0=_0x17938c;let _0x2b29ca=new _0x390343(_0x4f50d0(0x205)+(!this[_0x4f50d0(0x1c2)]&&this['dockerizedApp']?'gateway.docker.internal':this['host'])+':'+this[_0x4f50d0(0x20a)]);_0x2b29ca[_0x4f50d0(0x1ae)]=()=>{var _0x11a07c=_0x4f50d0;this[_0x11a07c(0x16b)]=!0x1,this['_disposeWebsocket'](_0x2b29ca),this[_0x11a07c(0x1ce)](),_0x3c2e73(new Error(_0x11a07c(0x1ec)));},_0x2b29ca[_0x4f50d0(0x208)]=()=>{var _0x266237=_0x4f50d0;this[_0x266237(0x1c2)]||_0x2b29ca[_0x266237(0x23a)]&&_0x2b29ca[_0x266237(0x23a)][_0x266237(0x237)]&&_0x2b29ca['_socket'][_0x266237(0x237)](),_0xca6c4a(_0x2b29ca);},_0x2b29ca[_0x4f50d0(0x18c)]=()=>{var _0x3db93a=_0x4f50d0;this[_0x3db93a(0x16a)]=!0x0,this[_0x3db93a(0x152)](_0x2b29ca),this[_0x3db93a(0x1ce)]();},_0x2b29ca['onmessage']=_0x1ce2eb=>{var _0xe08b2a=_0x4f50d0;try{if(!(_0x1ce2eb!=null&&_0x1ce2eb['data'])||!this[_0xe08b2a(0x195)])return;let _0x5009ca=JSON[_0xe08b2a(0x1d8)](_0x1ce2eb['data']);this[_0xe08b2a(0x195)](_0x5009ca[_0xe08b2a(0x17f)],_0x5009ca['args'],this[_0xe08b2a(0x159)],this[_0xe08b2a(0x1c2)]);}catch{}};})[_0x17938c(0x191)](_0x3ed56b=>(this[_0x17938c(0x238)]=!0x0,this['_connecting']=!0x1,this[_0x17938c(0x16a)]=!0x1,this['_allowedToSend']=!0x0,this[_0x17938c(0x184)]=0x0,_0x3ed56b))[_0x17938c(0x1f5)](_0x139565=>(this[_0x17938c(0x238)]=!0x1,this[_0x17938c(0x20e)]=!0x1,console[_0x17938c(0x1e9)](_0x17938c(0x14c)+this[_0x17938c(0x21d)]),_0x3c2e73(new Error('failed\\x20to\\x20connect\\x20to\\x20host:\\x20'+(_0x139565&&_0x139565['message'])))));}));}[_0x4fa3d0(0x152)](_0x4a3250){var _0x129708=_0x4fa3d0;this[_0x129708(0x238)]=!0x1,this['_connecting']=!0x1;try{_0x4a3250[_0x129708(0x18c)]=null,_0x4a3250[_0x129708(0x1ae)]=null,_0x4a3250[_0x129708(0x208)]=null;}catch{}try{_0x4a3250[_0x129708(0x1ab)]<0x2&&_0x4a3250[_0x129708(0x1b8)]();}catch{}}[_0x4fa3d0(0x1ce)](){var _0x5a0d1b=_0x4fa3d0;clearTimeout(this['_reconnectTimeout']),!(this[_0x5a0d1b(0x184)]>=this['_maxConnectAttemptCount'])&&(this[_0x5a0d1b(0x212)]=setTimeout(()=>{var _0x131efc=_0x5a0d1b,_0x28d27b;this[_0x131efc(0x238)]||this[_0x131efc(0x20e)]||(this[_0x131efc(0x1bd)](),(_0x28d27b=this['_ws'])==null||_0x28d27b[_0x131efc(0x1f5)](()=>this[_0x131efc(0x1ce)]()));},0x1f4),this[_0x5a0d1b(0x212)]['unref']&&this[_0x5a0d1b(0x212)]['unref']());}async[_0x4fa3d0(0x196)](_0xac4ea1){var _0x34056e=_0x4fa3d0;try{if(!this[_0x34056e(0x16b)])return;this[_0x34056e(0x16a)]&&this[_0x34056e(0x1bd)](),(await this[_0x34056e(0x1c8)])[_0x34056e(0x196)](JSON[_0x34056e(0x1ba)](_0xac4ea1));}catch(_0x165db6){console['warn'](this[_0x34056e(0x211)]+':\\x20'+(_0x165db6&&_0x165db6[_0x34056e(0x20c)])),this['_allowedToSend']=!0x1,this['_attemptToReconnectShortly']();}}};function _0x18f8(){var _0x569baa=['node','_hasSetOnItsPath','NEXT_RUNTIME','RegExp','args','undefined','\\x20server','1721873371085','_quotedRegExp','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','time','serialize','1','hrtime','unref','_connected','edge','_socket','127.0.0.1','pop','isArray','_addFunctionsNode','HTMLAllCollection','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','_type','5028012zfXUbt','_console_ninja_session','console','isExpressionToEvaluate','_disposeWebsocket','__es'+'Module','indexOf','https://tinyurl.com/37x8b79t','558856CCdCGL','test','push','global','8WCNKeB','log','pathToFileURL','noFunctions','includes','_p_','_HTMLAllCollection','String','defineProperty','_hasSymbolPropertyOnItsPath','getOwnPropertyNames','current','substr','_property','length',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.330\\\\node_modules\",'_allowedToConnectOnSend','_allowedToSend','negativeZero','_sortProps','10BLHfJY','_isPrimitiveType','symbol','_setNodeExpressionPath','unknown','constructor','bigint','Map','2701226zDKdJj','Buffer','_setNodeId','negativeInfinity','strLength','expressionsToEvaluate','Error','_isPrimitiveWrapperType','hostname','method','capped','nodeModules','_regExpToString','_isMap','_connectAttemptCount','slice','14598AVVyzP','_treeNodePropertiesAfterFullValue','join','getOwnPropertyDescriptor','_isUndefined','_numberRegExp','onclose','funcName','nuxt','perf_hooks','location','then','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','autoExpandLimit','autoExpandMaxDepth','eventReceivedCallback','send','toUpperCase','toLowerCase','value','depth','date','1208133VwLfjo','root_exp','prototype','[object\\x20Date]','_p_name','autoExpand','level','_setNodeLabel','','_console_ninja','totalStrLength','_getOwnPropertySymbols','type','Set','_capIfString','readyState','trace','array','onerror','boolean','_inNextEdge','_getOwnPropertyNames','url','_dateToString','_isSet','_hasMapOnItsPath','versions','dockerizedApp','close','getWebSocketClass','stringify','[object\\x20Array]','create','_connectToHostNow','object','','_setNodeQueryPath','getter','_inBrowser','_objectToString','origin','_addLoadNode','Number','_getOwnPropertyDescriptor','_ws','path','stackTraceLimit','get','webpack','number','_attemptToReconnectShortly','WebSocket','_propertyName','cappedElements','elements','114681cijVMW','match','sortProps','1LvZsnS','1.0.0','parse','elapsed','_isNegativeZero','reduceLimits','valueOf','string','sort','_blacklistedProperty','_keyStrRegExp','_addObjectProperty','reload','_additionalMetadata','toString','_addProperty','disabledTrace','allStrLength','resolveGetters','warn','split','function','logger\\x20websocket\\x20error','autoExpandPreviousObjects','replace','_consoleNinjaAllowedToStart','count','_maxConnectAttemptCount',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\",\"172.30.224.1\"],'POSITIVE_INFINITY','NEGATIVE_INFINITY','catch','getPrototypeOf','name','forEach','1135ukfHvd','props','root_exp_id','cappedProps','call','enumerable','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','getOwnPropertySymbols','angular','_undefined','[object\\x20BigInt]','remix','ws://','_treeNodePropertiesBeforeFullValue','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','onopen','bind','port','timeStamp','message','error','_connecting','544074VUBQjB','env','_sendErrorMessage','_reconnectTimeout','_WebSocket','process','hits','_p_length','_cleanNode','_Symbol','disabledLog','autoExpandPropertyCount','next.js','parent','_webSocketErrorDocsLink','_setNodePermissions','_WebSocketClass','_processTreeNodeResult','index','default','null','_setNodeExpandableState','ws/index.js','performance','rootExpression','now'];_0x18f8=function(){return _0x569baa;};return _0x18f8();}function _0xfb3c(_0x445a57,_0x441cd9){var _0x18f8b6=_0x18f8();return _0xfb3c=function(_0xfb3ceb,_0x566626){_0xfb3ceb=_0xfb3ceb-0x149;var _0xdade73=_0x18f8b6[_0xfb3ceb];return _0xdade73;},_0xfb3c(_0x445a57,_0x441cd9);}function q(_0x4234b8,_0x35165f,_0x42ceaa,_0x4d724a,_0x1b08fb,_0x32079a,_0x434ed4,_0x545806=ie){var _0x36caba=_0x4fa3d0;let _0xff3e6=_0x42ceaa[_0x36caba(0x1ea)](',')['map'](_0x596171=>{var _0x17450f=_0x36caba,_0x5d83ae,_0x4cfbbb,_0x5cec77,_0x553125;try{if(!_0x4234b8[_0x17450f(0x14f)]){let _0x3ccb92=((_0x4cfbbb=(_0x5d83ae=_0x4234b8[_0x17450f(0x214)])==null?void 0x0:_0x5d83ae['versions'])==null?void 0x0:_0x4cfbbb[_0x17450f(0x229)])||((_0x553125=(_0x5cec77=_0x4234b8[_0x17450f(0x214)])==null?void 0x0:_0x5cec77[_0x17450f(0x210)])==null?void 0x0:_0x553125['NEXT_RUNTIME'])===_0x17450f(0x239);(_0x1b08fb===_0x17450f(0x21b)||_0x1b08fb===_0x17450f(0x204)||_0x1b08fb==='astro'||_0x1b08fb===_0x17450f(0x201))&&(_0x1b08fb+=_0x3ccb92?_0x17450f(0x22f):'\\x20browser'),_0x4234b8['_console_ninja_session']={'id':+new Date(),'tool':_0x1b08fb},_0x434ed4&&_0x1b08fb&&!_0x3ccb92&&console[_0x17450f(0x15b)](_0x17450f(0x207)+(_0x1b08fb['charAt'](0x0)[_0x17450f(0x197)]()+_0x1b08fb['substr'](0x1))+',','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.');}let _0x17d22a=new x(_0x4234b8,_0x35165f,_0x596171,_0x4d724a,_0x32079a,_0x545806);return _0x17d22a[_0x17450f(0x196)][_0x17450f(0x209)](_0x17d22a);}catch(_0x4dd10e){return console['warn'](_0x17450f(0x192),_0x4dd10e&&_0x4dd10e['message']),()=>{};}});return _0x2d3d05=>_0xff3e6[_0x36caba(0x1f8)](_0x35ffdb=>_0x35ffdb(_0x2d3d05));}function ie(_0xbac8b0,_0x25273e,_0x15f06d,_0x2db5b4){var _0x336509=_0x4fa3d0;_0x2db5b4&&_0xbac8b0===_0x336509(0x1e2)&&_0x15f06d['location'][_0x336509(0x1e2)]();}function b(_0x99edf0){var _0x1ff0a5=_0x4fa3d0,_0x11ad6b,_0x12bf0f;let _0x2364e8=function(_0x5e4cc,_0x123d76){return _0x123d76-_0x5e4cc;},_0x3318a1;if(_0x99edf0[_0x1ff0a5(0x226)])_0x3318a1=function(){var _0x4db854=_0x1ff0a5;return _0x99edf0[_0x4db854(0x226)]['now']();};else{if(_0x99edf0['process']&&_0x99edf0[_0x1ff0a5(0x214)]['hrtime']&&((_0x12bf0f=(_0x11ad6b=_0x99edf0['process'])==null?void 0x0:_0x11ad6b['env'])==null?void 0x0:_0x12bf0f[_0x1ff0a5(0x22b)])!==_0x1ff0a5(0x239))_0x3318a1=function(){var _0x41feed=_0x1ff0a5;return _0x99edf0[_0x41feed(0x214)][_0x41feed(0x236)]();},_0x2364e8=function(_0x25e8e1,_0x5cb2bc){return 0x3e8*(_0x5cb2bc[0x0]-_0x25e8e1[0x0])+(_0x5cb2bc[0x1]-_0x25e8e1[0x1])/0xf4240;};else try{let {performance:_0x61effb}=require(_0x1ff0a5(0x18f));_0x3318a1=function(){return _0x61effb['now']();};}catch{_0x3318a1=function(){return+new Date();};}}return{'elapsed':_0x2364e8,'timeStamp':_0x3318a1,'now':()=>Date[_0x1ff0a5(0x228)]()};}function X(_0x1d105e,_0x2b31fe,_0x2cc636){var _0x5ecd72=_0x4fa3d0,_0x533071,_0x1cdaad,_0x56797f,_0x1a3ca7,_0x4fac19;if(_0x1d105e[_0x5ecd72(0x1ef)]!==void 0x0)return _0x1d105e[_0x5ecd72(0x1ef)];let _0x344948=((_0x1cdaad=(_0x533071=_0x1d105e['process'])==null?void 0x0:_0x533071[_0x5ecd72(0x1b6)])==null?void 0x0:_0x1cdaad[_0x5ecd72(0x229)])||((_0x1a3ca7=(_0x56797f=_0x1d105e[_0x5ecd72(0x214)])==null?void 0x0:_0x56797f[_0x5ecd72(0x210)])==null?void 0x0:_0x1a3ca7[_0x5ecd72(0x22b)])===_0x5ecd72(0x239);return _0x344948&&_0x2cc636===_0x5ecd72(0x18e)?_0x1d105e['_consoleNinjaAllowedToStart']=!0x1:_0x1d105e[_0x5ecd72(0x1ef)]=_0x344948||!_0x2b31fe||((_0x4fac19=_0x1d105e[_0x5ecd72(0x190)])==null?void 0x0:_0x4fac19['hostname'])&&_0x2b31fe[_0x5ecd72(0x15e)](_0x1d105e[_0x5ecd72(0x190)][_0x5ecd72(0x17e)]),_0x1d105e[_0x5ecd72(0x1ef)];}function H(_0x2b62fa,_0x5dac04,_0x15abda,_0x1de705){var _0x158963=_0x4fa3d0;_0x2b62fa=_0x2b62fa,_0x5dac04=_0x5dac04,_0x15abda=_0x15abda,_0x1de705=_0x1de705;let _0xb763c3=b(_0x2b62fa),_0x550a2a=_0xb763c3[_0x158963(0x1d9)],_0x2d001b=_0xb763c3[_0x158963(0x20b)];class _0x1732d4{constructor(){var _0x2af2cf=_0x158963;this[_0x2af2cf(0x1e0)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x2af2cf(0x18b)]=/^(0|[1-9][0-9]*)$/,this[_0x2af2cf(0x231)]=/'([^\\\\']|\\\\')*'/,this['_undefined']=_0x2b62fa['undefined'],this[_0x2af2cf(0x160)]=_0x2b62fa['HTMLAllCollection'],this[_0x2af2cf(0x1c7)]=Object[_0x2af2cf(0x189)],this[_0x2af2cf(0x1b1)]=Object['getOwnPropertyNames'],this[_0x2af2cf(0x218)]=_0x2b62fa['Symbol'],this[_0x2af2cf(0x182)]=RegExp[_0x2af2cf(0x19e)]['toString'],this['_dateToString']=Date[_0x2af2cf(0x19e)][_0x2af2cf(0x1e4)];}['serialize'](_0x1e21c9,_0xa1773a,_0x530dfe,_0x19b7f1){var _0x215ada=_0x158963,_0x17d3ac=this,_0x56ecd2=_0x530dfe[_0x215ada(0x1a1)];function _0x2fc8be(_0x26a178,_0x300632,_0x5000e3){var _0x2e0c96=_0x215ada;_0x300632[_0x2e0c96(0x1a8)]=_0x2e0c96(0x172),_0x300632[_0x2e0c96(0x20d)]=_0x26a178['message'],_0x43cd5a=_0x5000e3[_0x2e0c96(0x229)]['current'],_0x5000e3[_0x2e0c96(0x229)][_0x2e0c96(0x165)]=_0x300632,_0x17d3ac[_0x2e0c96(0x206)](_0x300632,_0x5000e3);}try{_0x530dfe[_0x215ada(0x1a2)]++,_0x530dfe[_0x215ada(0x1a1)]&&_0x530dfe[_0x215ada(0x1ed)][_0x215ada(0x158)](_0xa1773a);var _0x58961f,_0x2645f4,_0x28a0e8,_0x91f482,_0x5d02bb=[],_0x415696=[],_0x154e1f,_0x1cb7c8=this[_0x215ada(0x14d)](_0xa1773a),_0x69c111=_0x1cb7c8===_0x215ada(0x1ad),_0x38839a=!0x1,_0x5b0104=_0x1cb7c8===_0x215ada(0x1eb),_0x4b62fe=this[_0x215ada(0x16f)](_0x1cb7c8),_0x38273e=this['_isPrimitiveWrapperType'](_0x1cb7c8),_0x29f8a9=_0x4b62fe||_0x38273e,_0x5a2bb3={},_0x274559=0x0,_0x15801c=!0x1,_0x43cd5a,_0x3e3fc0=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x530dfe[_0x215ada(0x19a)]){if(_0x69c111){if(_0x2645f4=_0xa1773a[_0x215ada(0x168)],_0x2645f4>_0x530dfe[_0x215ada(0x1d2)]){for(_0x28a0e8=0x0,_0x91f482=_0x530dfe[_0x215ada(0x1d2)],_0x58961f=_0x28a0e8;_0x58961f<_0x91f482;_0x58961f++)_0x415696[_0x215ada(0x158)](_0x17d3ac['_addProperty'](_0x5d02bb,_0xa1773a,_0x1cb7c8,_0x58961f,_0x530dfe));_0x1e21c9[_0x215ada(0x1d1)]=!0x0;}else{for(_0x28a0e8=0x0,_0x91f482=_0x2645f4,_0x58961f=_0x28a0e8;_0x58961f<_0x91f482;_0x58961f++)_0x415696[_0x215ada(0x158)](_0x17d3ac[_0x215ada(0x1e5)](_0x5d02bb,_0xa1773a,_0x1cb7c8,_0x58961f,_0x530dfe));}_0x530dfe[_0x215ada(0x21a)]+=_0x415696[_0x215ada(0x168)];}if(!(_0x1cb7c8==='null'||_0x1cb7c8===_0x215ada(0x22e))&&!_0x4b62fe&&_0x1cb7c8!==_0x215ada(0x161)&&_0x1cb7c8!==_0x215ada(0x177)&&_0x1cb7c8!=='bigint'){var _0xdf311e=_0x19b7f1[_0x215ada(0x1fa)]||_0x530dfe[_0x215ada(0x1fa)];if(this[_0x215ada(0x1b4)](_0xa1773a)?(_0x58961f=0x0,_0xa1773a[_0x215ada(0x1f8)](function(_0x171682){var _0x5a7556=_0x215ada;if(_0x274559++,_0x530dfe[_0x5a7556(0x21a)]++,_0x274559>_0xdf311e){_0x15801c=!0x0;return;}if(!_0x530dfe['isExpressionToEvaluate']&&_0x530dfe[_0x5a7556(0x1a1)]&&_0x530dfe[_0x5a7556(0x21a)]>_0x530dfe[_0x5a7556(0x193)]){_0x15801c=!0x0;return;}_0x415696[_0x5a7556(0x158)](_0x17d3ac[_0x5a7556(0x1e5)](_0x5d02bb,_0xa1773a,'Set',_0x58961f++,_0x530dfe,function(_0x3eba17){return function(){return _0x3eba17;};}(_0x171682)));})):this[_0x215ada(0x183)](_0xa1773a)&&_0xa1773a[_0x215ada(0x1f8)](function(_0x1334c2,_0x75635e){var _0x5a014e=_0x215ada;if(_0x274559++,_0x530dfe['autoExpandPropertyCount']++,_0x274559>_0xdf311e){_0x15801c=!0x0;return;}if(!_0x530dfe[_0x5a014e(0x151)]&&_0x530dfe['autoExpand']&&_0x530dfe[_0x5a014e(0x21a)]>_0x530dfe[_0x5a014e(0x193)]){_0x15801c=!0x0;return;}var _0x4abdbb=_0x75635e['toString']();_0x4abdbb['length']>0x64&&(_0x4abdbb=_0x4abdbb[_0x5a014e(0x185)](0x0,0x64)+'...'),_0x415696[_0x5a014e(0x158)](_0x17d3ac[_0x5a014e(0x1e5)](_0x5d02bb,_0xa1773a,'Map',_0x4abdbb,_0x530dfe,function(_0x1c4c77){return function(){return _0x1c4c77;};}(_0x1334c2)));}),!_0x38839a){try{for(_0x154e1f in _0xa1773a)if(!(_0x69c111&&_0x3e3fc0[_0x215ada(0x157)](_0x154e1f))&&!this[_0x215ada(0x1df)](_0xa1773a,_0x154e1f,_0x530dfe)){if(_0x274559++,_0x530dfe[_0x215ada(0x21a)]++,_0x274559>_0xdf311e){_0x15801c=!0x0;break;}if(!_0x530dfe['isExpressionToEvaluate']&&_0x530dfe['autoExpand']&&_0x530dfe[_0x215ada(0x21a)]>_0x530dfe['autoExpandLimit']){_0x15801c=!0x0;break;}_0x415696[_0x215ada(0x158)](_0x17d3ac[_0x215ada(0x1e1)](_0x5d02bb,_0x5a2bb3,_0xa1773a,_0x1cb7c8,_0x154e1f,_0x530dfe));}}catch{}if(_0x5a2bb3[_0x215ada(0x216)]=!0x0,_0x5b0104&&(_0x5a2bb3[_0x215ada(0x1a0)]=!0x0),!_0x15801c){var _0x3c2b11=[]['concat'](this[_0x215ada(0x1b1)](_0xa1773a))['concat'](this[_0x215ada(0x1a7)](_0xa1773a));for(_0x58961f=0x0,_0x2645f4=_0x3c2b11[_0x215ada(0x168)];_0x58961f<_0x2645f4;_0x58961f++)if(_0x154e1f=_0x3c2b11[_0x58961f],!(_0x69c111&&_0x3e3fc0[_0x215ada(0x157)](_0x154e1f[_0x215ada(0x1e4)]()))&&!this[_0x215ada(0x1df)](_0xa1773a,_0x154e1f,_0x530dfe)&&!_0x5a2bb3[_0x215ada(0x15f)+_0x154e1f[_0x215ada(0x1e4)]()]){if(_0x274559++,_0x530dfe[_0x215ada(0x21a)]++,_0x274559>_0xdf311e){_0x15801c=!0x0;break;}if(!_0x530dfe['isExpressionToEvaluate']&&_0x530dfe[_0x215ada(0x1a1)]&&_0x530dfe[_0x215ada(0x21a)]>_0x530dfe[_0x215ada(0x193)]){_0x15801c=!0x0;break;}_0x415696[_0x215ada(0x158)](_0x17d3ac[_0x215ada(0x1e1)](_0x5d02bb,_0x5a2bb3,_0xa1773a,_0x1cb7c8,_0x154e1f,_0x530dfe));}}}}}if(_0x1e21c9[_0x215ada(0x1a8)]=_0x1cb7c8,_0x29f8a9?(_0x1e21c9['value']=_0xa1773a[_0x215ada(0x1dc)](),this[_0x215ada(0x1aa)](_0x1cb7c8,_0x1e21c9,_0x530dfe,_0x19b7f1)):_0x1cb7c8==='date'?_0x1e21c9[_0x215ada(0x199)]=this[_0x215ada(0x1b3)][_0x215ada(0x1fd)](_0xa1773a):_0x1cb7c8===_0x215ada(0x174)?_0x1e21c9[_0x215ada(0x199)]=_0xa1773a[_0x215ada(0x1e4)]():_0x1cb7c8===_0x215ada(0x22c)?_0x1e21c9[_0x215ada(0x199)]=this[_0x215ada(0x182)][_0x215ada(0x1fd)](_0xa1773a):_0x1cb7c8===_0x215ada(0x170)&&this[_0x215ada(0x218)]?_0x1e21c9[_0x215ada(0x199)]=this[_0x215ada(0x218)][_0x215ada(0x19e)][_0x215ada(0x1e4)][_0x215ada(0x1fd)](_0xa1773a):!_0x530dfe[_0x215ada(0x19a)]&&!(_0x1cb7c8===_0x215ada(0x223)||_0x1cb7c8===_0x215ada(0x22e))&&(delete _0x1e21c9[_0x215ada(0x199)],_0x1e21c9['capped']=!0x0),_0x15801c&&(_0x1e21c9[_0x215ada(0x1fc)]=!0x0),_0x43cd5a=_0x530dfe[_0x215ada(0x229)]['current'],_0x530dfe[_0x215ada(0x229)][_0x215ada(0x165)]=_0x1e21c9,this[_0x215ada(0x206)](_0x1e21c9,_0x530dfe),_0x415696[_0x215ada(0x168)]){for(_0x58961f=0x0,_0x2645f4=_0x415696['length'];_0x58961f<_0x2645f4;_0x58961f++)_0x415696[_0x58961f](_0x58961f);}_0x5d02bb[_0x215ada(0x168)]&&(_0x1e21c9[_0x215ada(0x1fa)]=_0x5d02bb);}catch(_0xb92ec5){_0x2fc8be(_0xb92ec5,_0x1e21c9,_0x530dfe);}return this['_additionalMetadata'](_0xa1773a,_0x1e21c9),this[_0x215ada(0x187)](_0x1e21c9,_0x530dfe),_0x530dfe[_0x215ada(0x229)][_0x215ada(0x165)]=_0x43cd5a,_0x530dfe[_0x215ada(0x1a2)]--,_0x530dfe['autoExpand']=_0x56ecd2,_0x530dfe[_0x215ada(0x1a1)]&&_0x530dfe[_0x215ada(0x1ed)][_0x215ada(0x23c)](),_0x1e21c9;}[_0x158963(0x1a7)](_0x1b9549){var _0x2bd5c5=_0x158963;return Object[_0x2bd5c5(0x200)]?Object[_0x2bd5c5(0x200)](_0x1b9549):[];}['_isSet'](_0x5246a9){var _0xb9d08b=_0x158963;return!!(_0x5246a9&&_0x2b62fa['Set']&&this[_0xb9d08b(0x1c3)](_0x5246a9)==='[object\\x20Set]'&&_0x5246a9[_0xb9d08b(0x1f8)]);}[_0x158963(0x1df)](_0x2674ed,_0x2170f8,_0xb0fcda){var _0x4ee38e=_0x158963;return _0xb0fcda[_0x4ee38e(0x15d)]?typeof _0x2674ed[_0x2170f8]==_0x4ee38e(0x1eb):!0x1;}[_0x158963(0x14d)](_0x440dcb){var _0x65f50f=_0x158963,_0x1fca42='';return _0x1fca42=typeof _0x440dcb,_0x1fca42==='object'?this[_0x65f50f(0x1c3)](_0x440dcb)==='[object\\x20Array]'?_0x1fca42=_0x65f50f(0x1ad):this['_objectToString'](_0x440dcb)===_0x65f50f(0x19f)?_0x1fca42=_0x65f50f(0x19b):this[_0x65f50f(0x1c3)](_0x440dcb)===_0x65f50f(0x203)?_0x1fca42=_0x65f50f(0x174):_0x440dcb===null?_0x1fca42=_0x65f50f(0x223):_0x440dcb[_0x65f50f(0x173)]&&(_0x1fca42=_0x440dcb[_0x65f50f(0x173)][_0x65f50f(0x1f7)]||_0x1fca42):_0x1fca42===_0x65f50f(0x22e)&&this['_HTMLAllCollection']&&_0x440dcb instanceof this[_0x65f50f(0x160)]&&(_0x1fca42=_0x65f50f(0x14b)),_0x1fca42;}['_objectToString'](_0x552ff8){var _0x36f83f=_0x158963;return Object[_0x36f83f(0x19e)][_0x36f83f(0x1e4)][_0x36f83f(0x1fd)](_0x552ff8);}[_0x158963(0x16f)](_0x3492e2){var _0x437a32=_0x158963;return _0x3492e2===_0x437a32(0x1af)||_0x3492e2===_0x437a32(0x1dd)||_0x3492e2===_0x437a32(0x1cd);}[_0x158963(0x17d)](_0x43898b){var _0x3a0902=_0x158963;return _0x43898b==='Boolean'||_0x43898b===_0x3a0902(0x161)||_0x43898b===_0x3a0902(0x1c6);}[_0x158963(0x1e5)](_0x148b1d,_0x2df3c7,_0x2a0ded,_0x42fda0,_0x373709,_0x974381){var _0x2e68bb=this;return function(_0x184aa7){var _0xad2588=_0xfb3c,_0x487616=_0x373709[_0xad2588(0x229)][_0xad2588(0x165)],_0x3afdd8=_0x373709[_0xad2588(0x229)][_0xad2588(0x221)],_0x51be2b=_0x373709[_0xad2588(0x229)][_0xad2588(0x21c)];_0x373709[_0xad2588(0x229)][_0xad2588(0x21c)]=_0x487616,_0x373709['node'][_0xad2588(0x221)]=typeof _0x42fda0=='number'?_0x42fda0:_0x184aa7,_0x148b1d[_0xad2588(0x158)](_0x2e68bb[_0xad2588(0x167)](_0x2df3c7,_0x2a0ded,_0x42fda0,_0x373709,_0x974381)),_0x373709[_0xad2588(0x229)]['parent']=_0x51be2b,_0x373709[_0xad2588(0x229)][_0xad2588(0x221)]=_0x3afdd8;};}[_0x158963(0x1e1)](_0x16014d,_0x479f78,_0x1233b6,_0x198ba8,_0x414f95,_0x968db4,_0x2b3b15){var _0x425ce1=_0x158963,_0x1574fd=this;return _0x479f78[_0x425ce1(0x15f)+_0x414f95[_0x425ce1(0x1e4)]()]=!0x0,function(_0xac2b2){var _0x58a2c0=_0x425ce1,_0x257873=_0x968db4[_0x58a2c0(0x229)][_0x58a2c0(0x165)],_0x225397=_0x968db4['node'][_0x58a2c0(0x221)],_0x4322b5=_0x968db4[_0x58a2c0(0x229)][_0x58a2c0(0x21c)];_0x968db4['node']['parent']=_0x257873,_0x968db4[_0x58a2c0(0x229)][_0x58a2c0(0x221)]=_0xac2b2,_0x16014d[_0x58a2c0(0x158)](_0x1574fd[_0x58a2c0(0x167)](_0x1233b6,_0x198ba8,_0x414f95,_0x968db4,_0x2b3b15)),_0x968db4['node']['parent']=_0x4322b5,_0x968db4[_0x58a2c0(0x229)]['index']=_0x225397;};}['_property'](_0x245567,_0x5a6e62,_0x4b7e04,_0x27d6d4,_0x2dbb03){var _0x7b00f3=_0x158963,_0x47db77=this;_0x2dbb03||(_0x2dbb03=function(_0x35941e,_0x538d71){return _0x35941e[_0x538d71];});var _0x46c695=_0x4b7e04[_0x7b00f3(0x1e4)](),_0x12cbf5=_0x27d6d4[_0x7b00f3(0x17b)]||{},_0x247c41=_0x27d6d4[_0x7b00f3(0x19a)],_0x1fa15f=_0x27d6d4['isExpressionToEvaluate'];try{var _0x5461c2=this[_0x7b00f3(0x183)](_0x245567),_0x4e4028=_0x46c695;_0x5461c2&&_0x4e4028[0x0]==='\\x27'&&(_0x4e4028=_0x4e4028[_0x7b00f3(0x166)](0x1,_0x4e4028['length']-0x2));var _0xb087e4=_0x27d6d4[_0x7b00f3(0x17b)]=_0x12cbf5[_0x7b00f3(0x15f)+_0x4e4028];_0xb087e4&&(_0x27d6d4[_0x7b00f3(0x19a)]=_0x27d6d4[_0x7b00f3(0x19a)]+0x1),_0x27d6d4['isExpressionToEvaluate']=!!_0xb087e4;var _0x12272a=typeof _0x4b7e04==_0x7b00f3(0x170),_0x47d3f9={'name':_0x12272a||_0x5461c2?_0x46c695:this[_0x7b00f3(0x1d0)](_0x46c695)};if(_0x12272a&&(_0x47d3f9[_0x7b00f3(0x170)]=!0x0),!(_0x5a6e62===_0x7b00f3(0x1ad)||_0x5a6e62===_0x7b00f3(0x17c))){var _0x165134=this[_0x7b00f3(0x1c7)](_0x245567,_0x4b7e04);if(_0x165134&&(_0x165134['set']&&(_0x47d3f9['setter']=!0x0),_0x165134[_0x7b00f3(0x1cb)]&&!_0xb087e4&&!_0x27d6d4[_0x7b00f3(0x1e8)]))return _0x47d3f9[_0x7b00f3(0x1c1)]=!0x0,this['_processTreeNodeResult'](_0x47d3f9,_0x27d6d4),_0x47d3f9;}var _0x4b594b;try{_0x4b594b=_0x2dbb03(_0x245567,_0x4b7e04);}catch(_0x59e508){return _0x47d3f9={'name':_0x46c695,'type':_0x7b00f3(0x172),'error':_0x59e508[_0x7b00f3(0x20c)]},this['_processTreeNodeResult'](_0x47d3f9,_0x27d6d4),_0x47d3f9;}var _0x85df9f=this[_0x7b00f3(0x14d)](_0x4b594b),_0x436cba=this['_isPrimitiveType'](_0x85df9f);if(_0x47d3f9['type']=_0x85df9f,_0x436cba)this[_0x7b00f3(0x220)](_0x47d3f9,_0x27d6d4,_0x4b594b,function(){var _0x5300e9=_0x7b00f3;_0x47d3f9[_0x5300e9(0x199)]=_0x4b594b[_0x5300e9(0x1dc)](),!_0xb087e4&&_0x47db77[_0x5300e9(0x1aa)](_0x85df9f,_0x47d3f9,_0x27d6d4,{});});else{var _0x40c18f=_0x27d6d4[_0x7b00f3(0x1a1)]&&_0x27d6d4[_0x7b00f3(0x1a2)]<_0x27d6d4[_0x7b00f3(0x194)]&&_0x27d6d4[_0x7b00f3(0x1ed)][_0x7b00f3(0x154)](_0x4b594b)<0x0&&_0x85df9f!=='function'&&_0x27d6d4[_0x7b00f3(0x21a)]<_0x27d6d4['autoExpandLimit'];_0x40c18f||_0x27d6d4[_0x7b00f3(0x1a2)]<_0x247c41||_0xb087e4?(this[_0x7b00f3(0x234)](_0x47d3f9,_0x4b594b,_0x27d6d4,_0xb087e4||{}),this[_0x7b00f3(0x1e3)](_0x4b594b,_0x47d3f9)):this[_0x7b00f3(0x220)](_0x47d3f9,_0x27d6d4,_0x4b594b,function(){var _0x2e167b=_0x7b00f3;_0x85df9f===_0x2e167b(0x223)||_0x85df9f===_0x2e167b(0x22e)||(delete _0x47d3f9[_0x2e167b(0x199)],_0x47d3f9[_0x2e167b(0x180)]=!0x0);});}return _0x47d3f9;}finally{_0x27d6d4[_0x7b00f3(0x17b)]=_0x12cbf5,_0x27d6d4['depth']=_0x247c41,_0x27d6d4[_0x7b00f3(0x151)]=_0x1fa15f;}}[_0x158963(0x1aa)](_0x642ba5,_0x4d7c99,_0x347fc7,_0x3d4c46){var _0x5cad7e=_0x158963,_0x276a58=_0x3d4c46['strLength']||_0x347fc7[_0x5cad7e(0x17a)];if((_0x642ba5===_0x5cad7e(0x1dd)||_0x642ba5===_0x5cad7e(0x161))&&_0x4d7c99[_0x5cad7e(0x199)]){let _0x44d596=_0x4d7c99['value'][_0x5cad7e(0x168)];_0x347fc7[_0x5cad7e(0x1e7)]+=_0x44d596,_0x347fc7[_0x5cad7e(0x1e7)]>_0x347fc7[_0x5cad7e(0x1a6)]?(_0x4d7c99[_0x5cad7e(0x180)]='',delete _0x4d7c99[_0x5cad7e(0x199)]):_0x44d596>_0x276a58&&(_0x4d7c99[_0x5cad7e(0x180)]=_0x4d7c99[_0x5cad7e(0x199)][_0x5cad7e(0x166)](0x0,_0x276a58),delete _0x4d7c99[_0x5cad7e(0x199)]);}}[_0x158963(0x183)](_0x3c1722){var _0x3a294a=_0x158963;return!!(_0x3c1722&&_0x2b62fa[_0x3a294a(0x175)]&&this[_0x3a294a(0x1c3)](_0x3c1722)==='[object\\x20Map]'&&_0x3c1722['forEach']);}[_0x158963(0x1d0)](_0x5c2789){var _0x5d6836=_0x158963;if(_0x5c2789[_0x5d6836(0x1d4)](/^\\d+$/))return _0x5c2789;var _0x28eb56;try{_0x28eb56=JSON[_0x5d6836(0x1ba)](''+_0x5c2789);}catch{_0x28eb56='\\x22'+this[_0x5d6836(0x1c3)](_0x5c2789)+'\\x22';}return _0x28eb56[_0x5d6836(0x1d4)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x28eb56=_0x28eb56[_0x5d6836(0x166)](0x1,_0x28eb56['length']-0x2):_0x28eb56=_0x28eb56[_0x5d6836(0x1ee)](/'/g,'\\x5c\\x27')[_0x5d6836(0x1ee)](/\\\\\"/g,'\\x22')[_0x5d6836(0x1ee)](/(^\"|\"$)/g,'\\x27'),_0x28eb56;}[_0x158963(0x220)](_0x443d37,_0x4db72d,_0x50fd8b,_0x3a672d){var _0x48a7a9=_0x158963;this[_0x48a7a9(0x206)](_0x443d37,_0x4db72d),_0x3a672d&&_0x3a672d(),this[_0x48a7a9(0x1e3)](_0x50fd8b,_0x443d37),this[_0x48a7a9(0x187)](_0x443d37,_0x4db72d);}['_treeNodePropertiesBeforeFullValue'](_0x312cfa,_0xf0c9a1){var _0x3bba41=_0x158963;this[_0x3bba41(0x178)](_0x312cfa,_0xf0c9a1),this[_0x3bba41(0x1c0)](_0x312cfa,_0xf0c9a1),this[_0x3bba41(0x171)](_0x312cfa,_0xf0c9a1),this[_0x3bba41(0x21e)](_0x312cfa,_0xf0c9a1);}[_0x158963(0x178)](_0x440b13,_0x21e445){}[_0x158963(0x1c0)](_0x74210b,_0xe1eb6f){}[_0x158963(0x1a3)](_0x5b0b8a,_0x47f8c8){}[_0x158963(0x18a)](_0xd5b76d){var _0x4bf3b1=_0x158963;return _0xd5b76d===this[_0x4bf3b1(0x202)];}[_0x158963(0x187)](_0x455d5f,_0xf11c1b){var _0x1a1317=_0x158963;this[_0x1a1317(0x1a3)](_0x455d5f,_0xf11c1b),this[_0x1a1317(0x224)](_0x455d5f),_0xf11c1b['sortProps']&&this[_0x1a1317(0x16d)](_0x455d5f),this[_0x1a1317(0x14a)](_0x455d5f,_0xf11c1b),this[_0x1a1317(0x1c5)](_0x455d5f,_0xf11c1b),this[_0x1a1317(0x217)](_0x455d5f);}[_0x158963(0x1e3)](_0x422803,_0x38754a){var _0x340f91=_0x158963;let _0x186c72;try{_0x2b62fa['console']&&(_0x186c72=_0x2b62fa[_0x340f91(0x150)]['error'],_0x2b62fa[_0x340f91(0x150)][_0x340f91(0x20d)]=function(){}),_0x422803&&typeof _0x422803['length']==_0x340f91(0x1cd)&&(_0x38754a['length']=_0x422803['length']);}catch{}finally{_0x186c72&&(_0x2b62fa['console'][_0x340f91(0x20d)]=_0x186c72);}if(_0x38754a[_0x340f91(0x1a8)]===_0x340f91(0x1cd)||_0x38754a[_0x340f91(0x1a8)]===_0x340f91(0x1c6)){if(isNaN(_0x38754a[_0x340f91(0x199)]))_0x38754a['nan']=!0x0,delete _0x38754a[_0x340f91(0x199)];else switch(_0x38754a['value']){case Number[_0x340f91(0x1f3)]:_0x38754a['positiveInfinity']=!0x0,delete _0x38754a[_0x340f91(0x199)];break;case Number[_0x340f91(0x1f4)]:_0x38754a[_0x340f91(0x179)]=!0x0,delete _0x38754a[_0x340f91(0x199)];break;case 0x0:this['_isNegativeZero'](_0x38754a[_0x340f91(0x199)])&&(_0x38754a[_0x340f91(0x16c)]=!0x0);break;}}else _0x38754a[_0x340f91(0x1a8)]===_0x340f91(0x1eb)&&typeof _0x422803[_0x340f91(0x1f7)]==_0x340f91(0x1dd)&&_0x422803[_0x340f91(0x1f7)]&&_0x38754a['name']&&_0x422803['name']!==_0x38754a['name']&&(_0x38754a[_0x340f91(0x18d)]=_0x422803[_0x340f91(0x1f7)]);}[_0x158963(0x1da)](_0xfefd2c){var _0x373bc7=_0x158963;return 0x1/_0xfefd2c===Number[_0x373bc7(0x1f4)];}[_0x158963(0x16d)](_0x344e21){var _0x527c78=_0x158963;!_0x344e21['props']||!_0x344e21[_0x527c78(0x1fa)][_0x527c78(0x168)]||_0x344e21[_0x527c78(0x1a8)]===_0x527c78(0x1ad)||_0x344e21['type']===_0x527c78(0x175)||_0x344e21[_0x527c78(0x1a8)]===_0x527c78(0x1a9)||_0x344e21['props'][_0x527c78(0x1de)](function(_0x47a33e,_0x3a15ad){var _0x2b5489=_0x527c78,_0x74521e=_0x47a33e[_0x2b5489(0x1f7)][_0x2b5489(0x198)](),_0x4606b6=_0x3a15ad[_0x2b5489(0x1f7)]['toLowerCase']();return _0x74521e<_0x4606b6?-0x1:_0x74521e>_0x4606b6?0x1:0x0;});}[_0x158963(0x14a)](_0x3b17f6,_0x1351a6){var _0x44cb2b=_0x158963;if(!(_0x1351a6[_0x44cb2b(0x15d)]||!_0x3b17f6[_0x44cb2b(0x1fa)]||!_0x3b17f6[_0x44cb2b(0x1fa)]['length'])){for(var _0x5e521d=[],_0x1a3598=[],_0x3ff4f4=0x0,_0x473514=_0x3b17f6[_0x44cb2b(0x1fa)]['length'];_0x3ff4f4<_0x473514;_0x3ff4f4++){var _0x42efbe=_0x3b17f6[_0x44cb2b(0x1fa)][_0x3ff4f4];_0x42efbe['type']===_0x44cb2b(0x1eb)?_0x5e521d[_0x44cb2b(0x158)](_0x42efbe):_0x1a3598['push'](_0x42efbe);}if(!(!_0x1a3598[_0x44cb2b(0x168)]||_0x5e521d[_0x44cb2b(0x168)]<=0x1)){_0x3b17f6[_0x44cb2b(0x1fa)]=_0x1a3598;var _0x43c31e={'functionsNode':!0x0,'props':_0x5e521d};this[_0x44cb2b(0x178)](_0x43c31e,_0x1351a6),this[_0x44cb2b(0x1a3)](_0x43c31e,_0x1351a6),this[_0x44cb2b(0x224)](_0x43c31e),this[_0x44cb2b(0x21e)](_0x43c31e,_0x1351a6),_0x43c31e['id']+='\\x20f',_0x3b17f6[_0x44cb2b(0x1fa)]['unshift'](_0x43c31e);}}}[_0x158963(0x1c5)](_0x1d6d3f,_0x2f6534){}[_0x158963(0x224)](_0x238d9d){}['_isArray'](_0x53831b){var _0x3e3fa3=_0x158963;return Array[_0x3e3fa3(0x149)](_0x53831b)||typeof _0x53831b==_0x3e3fa3(0x1be)&&this[_0x3e3fa3(0x1c3)](_0x53831b)===_0x3e3fa3(0x1bb);}[_0x158963(0x21e)](_0x1a77f0,_0x359cb1){}[_0x158963(0x217)](_0x263a5a){var _0x2a2097=_0x158963;delete _0x263a5a[_0x2a2097(0x163)],delete _0x263a5a[_0x2a2097(0x22a)],delete _0x263a5a[_0x2a2097(0x1b5)];}[_0x158963(0x171)](_0x3fd0f4,_0x1b270a){}}let _0x5c9942=new _0x1732d4(),_0x4184aa={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x2e0003={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x23e1d4(_0x188def,_0x22fede,_0x496ef6,_0x3723a4,_0x3f81ac,_0x33233b){var _0xcb9f08=_0x158963;let _0x51b9da,_0x55ab27;try{_0x55ab27=_0x2d001b(),_0x51b9da=_0x15abda[_0x22fede],!_0x51b9da||_0x55ab27-_0x51b9da['ts']>0x1f4&&_0x51b9da[_0xcb9f08(0x1f0)]&&_0x51b9da[_0xcb9f08(0x233)]/_0x51b9da['count']<0x64?(_0x15abda[_0x22fede]=_0x51b9da={'count':0x0,'time':0x0,'ts':_0x55ab27},_0x15abda['hits']={}):_0x55ab27-_0x15abda['hits']['ts']>0x32&&_0x15abda['hits']['count']&&_0x15abda[_0xcb9f08(0x215)][_0xcb9f08(0x233)]/_0x15abda[_0xcb9f08(0x215)][_0xcb9f08(0x1f0)]<0x64&&(_0x15abda[_0xcb9f08(0x215)]={});let _0x1d9eb7=[],_0x18cd28=_0x51b9da[_0xcb9f08(0x1db)]||_0x15abda[_0xcb9f08(0x215)][_0xcb9f08(0x1db)]?_0x2e0003:_0x4184aa,_0x3a5981=_0x2ef48c=>{var _0x247571=_0xcb9f08;let _0x35679f={};return _0x35679f[_0x247571(0x1fa)]=_0x2ef48c['props'],_0x35679f[_0x247571(0x1d2)]=_0x2ef48c[_0x247571(0x1d2)],_0x35679f[_0x247571(0x17a)]=_0x2ef48c[_0x247571(0x17a)],_0x35679f[_0x247571(0x1a6)]=_0x2ef48c['totalStrLength'],_0x35679f[_0x247571(0x193)]=_0x2ef48c[_0x247571(0x193)],_0x35679f[_0x247571(0x194)]=_0x2ef48c[_0x247571(0x194)],_0x35679f[_0x247571(0x1d5)]=!0x1,_0x35679f[_0x247571(0x15d)]=!_0x5dac04,_0x35679f[_0x247571(0x19a)]=0x1,_0x35679f[_0x247571(0x1a2)]=0x0,_0x35679f['expId']=_0x247571(0x1fb),_0x35679f[_0x247571(0x227)]=_0x247571(0x19d),_0x35679f['autoExpand']=!0x0,_0x35679f[_0x247571(0x1ed)]=[],_0x35679f[_0x247571(0x21a)]=0x0,_0x35679f[_0x247571(0x1e8)]=!0x0,_0x35679f[_0x247571(0x1e7)]=0x0,_0x35679f[_0x247571(0x229)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x35679f;};for(var _0xffb06e=0x0;_0xffb06e<_0x3f81ac[_0xcb9f08(0x168)];_0xffb06e++)_0x1d9eb7[_0xcb9f08(0x158)](_0x5c9942[_0xcb9f08(0x234)]({'timeNode':_0x188def==='time'||void 0x0},_0x3f81ac[_0xffb06e],_0x3a5981(_0x18cd28),{}));if(_0x188def===_0xcb9f08(0x1ac)){let _0x232567=Error['stackTraceLimit'];try{Error['stackTraceLimit']=0x1/0x0,_0x1d9eb7[_0xcb9f08(0x158)](_0x5c9942[_0xcb9f08(0x234)]({'stackNode':!0x0},new Error()['stack'],_0x3a5981(_0x18cd28),{'strLength':0x1/0x0}));}finally{Error[_0xcb9f08(0x1ca)]=_0x232567;}}return{'method':'log','version':_0x1de705,'args':[{'ts':_0x496ef6,'session':_0x3723a4,'args':_0x1d9eb7,'id':_0x22fede,'context':_0x33233b}]};}catch(_0x2bb960){return{'method':'log','version':_0x1de705,'args':[{'ts':_0x496ef6,'session':_0x3723a4,'args':[{'type':_0xcb9f08(0x172),'error':_0x2bb960&&_0x2bb960[_0xcb9f08(0x20c)]}],'id':_0x22fede,'context':_0x33233b}]};}finally{try{if(_0x51b9da&&_0x55ab27){let _0x36170d=_0x2d001b();_0x51b9da[_0xcb9f08(0x1f0)]++,_0x51b9da[_0xcb9f08(0x233)]+=_0x550a2a(_0x55ab27,_0x36170d),_0x51b9da['ts']=_0x36170d,_0x15abda['hits']['count']++,_0x15abda[_0xcb9f08(0x215)][_0xcb9f08(0x233)]+=_0x550a2a(_0x55ab27,_0x36170d),_0x15abda[_0xcb9f08(0x215)]['ts']=_0x36170d,(_0x51b9da[_0xcb9f08(0x1f0)]>0x32||_0x51b9da[_0xcb9f08(0x233)]>0x64)&&(_0x51b9da['reduceLimits']=!0x0),(_0x15abda[_0xcb9f08(0x215)][_0xcb9f08(0x1f0)]>0x3e8||_0x15abda[_0xcb9f08(0x215)][_0xcb9f08(0x233)]>0x12c)&&(_0x15abda[_0xcb9f08(0x215)][_0xcb9f08(0x1db)]=!0x0);}}catch{}}}return _0x23e1d4;}((_0x3b82ec,_0x6d9806,_0x35b73d,_0x3ab734,_0x17d9a5,_0x418dc0,_0x265648,_0x557e77,_0x3ea8ed,_0x3e082b,_0x530d7)=>{var _0x3bd3f2=_0x4fa3d0;if(_0x3b82ec[_0x3bd3f2(0x1a5)])return _0x3b82ec['_console_ninja'];if(!X(_0x3b82ec,_0x557e77,_0x17d9a5))return _0x3b82ec[_0x3bd3f2(0x1a5)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x3b82ec[_0x3bd3f2(0x1a5)];let _0x461685=b(_0x3b82ec),_0x1fe886=_0x461685[_0x3bd3f2(0x1d9)],_0x4e2fb7=_0x461685[_0x3bd3f2(0x20b)],_0x431883=_0x461685[_0x3bd3f2(0x228)],_0x272a7d={'hits':{},'ts':{}},_0x1ae88d=H(_0x3b82ec,_0x3ea8ed,_0x272a7d,_0x418dc0),_0x1bce09=_0x3f26c1=>{_0x272a7d['ts'][_0x3f26c1]=_0x4e2fb7();},_0x291948=(_0x16230e,_0x3cbe2f)=>{var _0x5b6d9c=_0x3bd3f2;let _0x2b4033=_0x272a7d['ts'][_0x3cbe2f];if(delete _0x272a7d['ts'][_0x3cbe2f],_0x2b4033){let _0x3534ee=_0x1fe886(_0x2b4033,_0x4e2fb7());_0x25f47c(_0x1ae88d(_0x5b6d9c(0x233),_0x16230e,_0x431883(),_0xd28630,[_0x3534ee],_0x3cbe2f));}},_0x2d880f=_0x17f78f=>{var _0x47f89f=_0x3bd3f2,_0x2a0241;return _0x17d9a5===_0x47f89f(0x21b)&&_0x3b82ec[_0x47f89f(0x1c4)]&&((_0x2a0241=_0x17f78f==null?void 0x0:_0x17f78f[_0x47f89f(0x22d)])==null?void 0x0:_0x2a0241[_0x47f89f(0x168)])&&(_0x17f78f[_0x47f89f(0x22d)][0x0][_0x47f89f(0x1c4)]=_0x3b82ec[_0x47f89f(0x1c4)]),_0x17f78f;};_0x3b82ec['_console_ninja']={'consoleLog':(_0x597c74,_0x1c0ea6)=>{var _0x3d7b66=_0x3bd3f2;_0x3b82ec['console'][_0x3d7b66(0x15b)][_0x3d7b66(0x1f7)]!==_0x3d7b66(0x219)&&_0x25f47c(_0x1ae88d('log',_0x597c74,_0x431883(),_0xd28630,_0x1c0ea6));},'consoleTrace':(_0x685762,_0x1d857b)=>{var _0x10cf33=_0x3bd3f2;_0x3b82ec['console'][_0x10cf33(0x15b)][_0x10cf33(0x1f7)]!==_0x10cf33(0x1e6)&&_0x25f47c(_0x2d880f(_0x1ae88d('trace',_0x685762,_0x431883(),_0xd28630,_0x1d857b)));},'consoleTime':_0x43abff=>{_0x1bce09(_0x43abff);},'consoleTimeEnd':(_0x2101b8,_0x5dcdb5)=>{_0x291948(_0x5dcdb5,_0x2101b8);},'autoLog':(_0x38f143,_0x5d5626)=>{var _0x30f958=_0x3bd3f2;_0x25f47c(_0x1ae88d(_0x30f958(0x15b),_0x5d5626,_0x431883(),_0xd28630,[_0x38f143]));},'autoLogMany':(_0x57b222,_0x1d7f21)=>{_0x25f47c(_0x1ae88d('log',_0x57b222,_0x431883(),_0xd28630,_0x1d7f21));},'autoTrace':(_0x1be96b,_0x19389b)=>{var _0x26aa97=_0x3bd3f2;_0x25f47c(_0x2d880f(_0x1ae88d(_0x26aa97(0x1ac),_0x19389b,_0x431883(),_0xd28630,[_0x1be96b])));},'autoTraceMany':(_0x2a050a,_0x2a7fd2)=>{_0x25f47c(_0x2d880f(_0x1ae88d('trace',_0x2a050a,_0x431883(),_0xd28630,_0x2a7fd2)));},'autoTime':(_0x46cf09,_0xf8bcad,_0x3eb055)=>{_0x1bce09(_0x3eb055);},'autoTimeEnd':(_0x2ab2d2,_0x12e5f4,_0x38b18e)=>{_0x291948(_0x12e5f4,_0x38b18e);},'coverage':_0x186c7c=>{_0x25f47c({'method':'coverage','version':_0x418dc0,'args':[{'id':_0x186c7c}]});}};let _0x25f47c=q(_0x3b82ec,_0x6d9806,_0x35b73d,_0x3ab734,_0x17d9a5,_0x3e082b,_0x530d7),_0xd28630=_0x3b82ec[_0x3bd3f2(0x14f)];return _0x3b82ec[_0x3bd3f2(0x1a5)];})(globalThis,_0x4fa3d0(0x23b),'49864',_0x4fa3d0(0x169),_0x4fa3d0(0x1cc),_0x4fa3d0(0x1d7),_0x4fa3d0(0x230),_0x4fa3d0(0x1f2),_0x4fa3d0(0x1a4),_0x4fa3d0(0x1bf),_0x4fa3d0(0x235));");
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