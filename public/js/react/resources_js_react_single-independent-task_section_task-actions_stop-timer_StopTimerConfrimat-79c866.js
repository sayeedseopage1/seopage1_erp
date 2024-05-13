"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_single-independent-task_section_task-actions_stop-timer_StopTimerConfrimat-79c866"],{

/***/ "./resources/js/react/single-independent-task/components/DurationTimer.jsx":
/*!*********************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/components/DurationTimer.jsx ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


// duration time


var DurationTime = function DurationTime(_ref) {
  var durations = _ref.durations,
    setDurations = _ref.setDurations,
    id = _ref.id,
    startTime = _ref.startTime,
    endTime = _ref.endTime,
    onRemove = _ref.onRemove;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(startTime),
    _useState2 = _slicedToArray(_useState, 2),
    start = _useState2[0],
    setStart = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(endTime),
    _useState4 = _slicedToArray(_useState3, 2),
    end = _useState4[0],
    setEnd = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    window.$("#timepicker1".concat(id)).timepicker("setTime", startTime).on("changeTime.timepicker", function (e) {
      e.preventDefault();
      setStart(e.target.value);
    });
    window.$("#timepicker5".concat(id)).timepicker("setTime", endTime).on("changeTime.timepicker", function (e) {
      e.preventDefault();
      setEnd(e.target.value);
    });
  }, []);
  var _start = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return start;
  }, [start]);
  var _end = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return end;
  }, [end]);

  // time duration
  var handleSelectTimeDuration = function handleSelectTimeDuration(value, id) {
    var arr = durations.map(function (d) {
      return d.id === id ? _objectSpread(_objectSpread({}, value), {}, {
        id: id
      }) : d;
    });
    setDurations(arr);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    handleSelectTimeDuration({
      start: _start,
      end: _end
    }, id);
  }, [_start, _end]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "position-relative row mt-2",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "col-5 input-group bootstrap-timepicker timepicker d-flex flex-column",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
        id: "timepicker1".concat(id),
        className: "form-control w-100 py-2",
        "data-minute-step": "1",
        "data-modal-backdrop": "false",
        type: "text"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "col-5 input-group bootstrap-timepicker timepicker d-flex flex-column",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
        id: "timepicker5".concat(id),
        className: "form-control w-100 py-2",
        "data-minute-step": "1",
        "data-modal-backdrop": "false",
        type: "text"
      })
    }), (durations === null || durations === void 0 ? void 0 : durations.length) > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "col-2",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
        className: "sp1_remove-time-duration px-2",
        onClick: function onClick(e) {
          return onRemove(e, id);
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("i", {
          className: "fa-solid fa-trash-can"
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DurationTime);

/***/ }),

/***/ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/StopTimerConfrimationPopUp.jsx":
/*!*******************************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/task-actions/stop-timer/StopTimerConfrimationPopUp.jsx ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _options_OptionOne__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options/OptionOne */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionOne.jsx");
/* harmony import */ var _options_OptionTwo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./options/OptionTwo */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionTwo.jsx");
/* harmony import */ var _options_OptionThree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options/OptionThree */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionThree.jsx");
/* harmony import */ var _options_OptionFour__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./options/OptionFour */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionFour.jsx");
/* harmony import */ var _options_OptionFive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./options/OptionFive */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionFive.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-independent-task/components/Button.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _options_OptionSix__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./options/OptionSix */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionSix.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

















var StopTimerConfrimationPopUp = function StopTimerConfrimationPopUp(_ref) {
  var _window;
  var handleTemporarilyStopTimer = _ref.handleTemporarilyStopTimer,
    close = _ref.close;
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_9__.useSelector)(function (s) {
      return s.subTask;
    }),
    task = _useSelector.task,
    lessTrackModalFor = _useSelector.lessTrackModalFor,
    lessTrackDate = _useSelector.lessTrackDate;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    optionId = _React$useState2[0],
    setOptionId = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    closingToday = _React$useState4[0],
    setClosingToday = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(''),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    trackHours = _React$useState6[0],
    setTrackHours = _React$useState6[1];
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(''),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    trackMinutes = _React$useState8[0],
    setTrackMinutes = _React$useState8[1];
  var loggedUser = new _utils_user_details__WEBPACK_IMPORTED_MODULE_8__.User((_window = window) === null || _window === void 0 || (_window = _window.Laravel) === null || _window === void 0 ? void 0 : _window.user);
  var _useStoreStopTrackTim = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_7__.useStoreStopTrackTimerMutation)(),
    _useStoreStopTrackTim2 = _slicedToArray(_useStoreStopTrackTim, 2),
    storeStopTrackTimer = _useStoreStopTrackTim2[0],
    isSubmitting = _useStoreStopTrackTim2[1].isLoading;
  var _useGetUserTrackTimeQ = (0,_services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_7__.useGetUserTrackTimeQuery)("".concat(loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.getId(), "?date=").concat(dayjs__WEBPACK_IMPORTED_MODULE_11___default()(lessTrackDate).format('YYYY-MM-DD'))),
    trackTime = _useGetUserTrackTimeQ.data,
    isFetching = _useGetUserTrackTimeQ.isFetching;
  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_14__.useNavigate)();
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    if (!isFetching && trackTime) {
      var m = Math.abs(trackTime.target_time - (trackTime === null || trackTime === void 0 ? void 0 : trackTime.tracked_times));
      var h = Math.floor(m / 60);
      m = m % 60;
      setTrackHours(h);
      setTrackMinutes(m);
    }
  }, [trackTime, isFetching]);
  var handleSubmitForm = function handleSubmitForm(data) {
    var date = lessTrackDate === 'Today' ? dayjs__WEBPACK_IMPORTED_MODULE_11___default()().format('YYYY-MM-DD') : dayjs__WEBPACK_IMPORTED_MODULE_11___default()(lessTrackDate).format(date);
    storeStopTrackTimer(_objectSpread(_objectSpread({}, data), {}, {
      date: date,
      task_id: task === null || task === void 0 ? void 0 : task.id,
      user_id: loggedUser.id
    })).unwrap().then(function (res) {
      handleTemporarilyStopTimer();
    })["catch"](function (err) {
      var _console;
      return (/* eslint-disable */(_console = console).log.apply(_console, _toConsumableArray(oo_oo("1771283420_56_22_56_38_4", err)))
      );
    })["finally"](function () {
      navigate("?modal=daily-submission&data_type=today");
      close();
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
    className: "sp1_single_task--modal-panel",
    style: {
      transition: ".4s"
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
      className: "border-bottom pb-2 px-3 d-flex align-items-center justify-content-between",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
        className: "font-weight-bold f-16",
        children: lessTrackModalFor === "STOP_TIMER" ? 'Stop Timer' : "Start Timer"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
        variant: "tertiary",
        onClick: close,
        className: "",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("i", {
          className: "fa-solid fa-xmark"
        })
      })]
    }), !closingToday && lessTrackModalFor === "STOP_TIMER" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
      className: "py-2 px-4",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("h3", {
        className: "mb-3 text-center",
        children: "Are you closing for the day?"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
        className: "sp1_conf--button-group",
        style: {
          gap: "10px",
          height: "fit-content"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("button", {
          onClick: function onClick() {
            return setClosingToday(true);
          },
          className: "",
          children: "Yes"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("button", {
          onClick: handleTemporarilyStopTimer,
          className: "",
          children: ["No, I am temporarily ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("br", {}), " stopping the tracker"]
        })]
      })]
    }), lessTrackModalFor == "START_TIMER" || lessTrackModalFor === "STOP_TIMER" && closingToday ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
      className: "sp1_single_task--modal-body sp1_single_task-modal-body-options p-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
        className: "alert alert-warning",
        children: isFetching ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_10__.Placeholder, {
            width: "80%",
            height: 14,
            className: "mb-1"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_10__.Placeholder, {
            width: "100%",
            height: 14,
            className: "mb-1"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_10__.Placeholder, {
            width: "60%",
            height: 14
          })]
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: ["Your tracked time for ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("span", {
            className: "font-weight-bold",
            children: lessTrackDate
          }), " is ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("span", {
            className: "font-weight-bold",
            children: [Math.floor((trackTime === null || trackTime === void 0 ? void 0 : trackTime.tracked_times) / 60), " hours"]
          }), " and ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("span", {
            className: "font-weight-bold",
            children: [Math.floor((trackTime === null || trackTime === void 0 ? void 0 : trackTime.tracked_times) % 60), " minutes."]
          }), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("br", {}), " Your minimum tracked hours should have been ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("span", {
            className: "font-weight-bold",
            children: [" ", (trackTime === null || trackTime === void 0 ? void 0 : trackTime.target_time) / 60, " hours "]
          }), " and ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("span", {
            className: "font-weight-bold",
            children: [" ", (trackTime === null || trackTime === void 0 ? void 0 : trackTime.target_time) % 60, " minutes"]
          }), ", ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("br", {}), "and it is ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("span", {
            className: "font-weight-bold text-danger",
            children: [" ", trackHours, " hours "]
          }), " and ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("span", {
            className: "font-weight-bold text-danger",
            children: [" ", trackMinutes, " minutes "]
          }), " less."]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
        className: "sp1_stop-button-confirmation-option",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("h6", {
          children: "Why is that?"
        }), isFetching ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
            className: "confirmation--options",
            style: {
              width: 350
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_10__.Placeholder, {
              width: "80%",
              height: 14,
              className: "mb-1"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_10__.Placeholder, {
              width: "80%",
              height: 14,
              className: "mb-1"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_10__.Placeholder, {
              width: "60%",
              height: 14,
              className: "mb-1"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_10__.Placeholder, {
              width: "70%",
              height: 14,
              className: "mb-1"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_10__.Placeholder, {
              width: "60%",
              height: 14
            })]
          })
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
          className: "confirmation--options",
          children: optionId ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
            children: [optionId === "option-1" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_options_OptionOne__WEBPACK_IMPORTED_MODULE_1__["default"], {
              id: "option-1",
              onChecked: setOptionId,
              onSubmit: handleSubmitForm,
              isSubmitting: isSubmitting,
              checked: optionId === "option-1"
            }), optionId === "option-2" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_options_OptionTwo__WEBPACK_IMPORTED_MODULE_2__["default"], {
              id: "option-2",
              onChecked: setOptionId,
              onSubmit: handleSubmitForm,
              isSubmitting: isSubmitting,
              checked: optionId === "option-2"
            }), optionId === "option-3" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_options_OptionThree__WEBPACK_IMPORTED_MODULE_3__["default"], {
              id: "option-3",
              onSubmit: handleSubmitForm,
              isSubmitting: isSubmitting,
              onChecked: setOptionId,
              checked: optionId === "option-3"
            }), optionId === "option-4" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_options_OptionFour__WEBPACK_IMPORTED_MODULE_4__["default"], {
              id: "option-4",
              onChecked: setOptionId,
              onSubmit: handleSubmitForm,
              isSubmitting: isSubmitting,
              checked: optionId === "option-4"
            }), optionId === "option-5" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_options_OptionFive__WEBPACK_IMPORTED_MODULE_5__["default"], {
              id: "option-5",
              onChecked: setOptionId,
              onSubmit: handleSubmitForm,
              isSubmitting: isSubmitting,
              checked: optionId === "option-5"
            }), optionId === "option-6" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_options_OptionSix__WEBPACK_IMPORTED_MODULE_12__["default"], {
              id: "option-6",
              onChecked: setOptionId,
              onSubmit: handleSubmitForm,
              isSubmitting: isSubmitting,
              checked: optionId === "option-6"
            })]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_options_OptionOne__WEBPACK_IMPORTED_MODULE_1__["default"], {
              id: "option-1",
              onChecked: setOptionId,
              onSubmit: handleSubmitForm,
              isSubmitting: isSubmitting,
              checked: optionId === "option-1"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_options_OptionTwo__WEBPACK_IMPORTED_MODULE_2__["default"], {
              id: "option-2",
              onChecked: setOptionId,
              onSubmit: handleSubmitForm,
              isSubmitting: isSubmitting,
              checked: optionId === "option-2"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_options_OptionThree__WEBPACK_IMPORTED_MODULE_3__["default"], {
              id: "option-3",
              onChecked: setOptionId,
              onSubmit: handleSubmitForm,
              isSubmitting: isSubmitting,
              checked: optionId === "option-3"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_options_OptionFour__WEBPACK_IMPORTED_MODULE_4__["default"], {
              id: "option-4",
              onChecked: setOptionId,
              onSubmit: handleSubmitForm,
              isSubmitting: isSubmitting,
              checked: optionId === "option-4"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_options_OptionFive__WEBPACK_IMPORTED_MODULE_5__["default"], {
              id: "option-5",
              onChecked: setOptionId,
              onSubmit: handleSubmitForm,
              isSubmitting: isSubmitting,
              checked: optionId === "option-5"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_options_OptionSix__WEBPACK_IMPORTED_MODULE_12__["default"], {
              id: "option-6",
              onChecked: setOptionId,
              onSubmit: handleSubmitForm,
              isSubmitting: isSubmitting,
              checked: optionId === "option-6"
            })]
          })
        }), !optionId && closingToday && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)("div", {
          className: "mt-3 d-flex align-items-center",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
            onClick: function onClick() {
              return setClosingToday(false);
            },
            variant: "tertiary",
            className: "ml-auto",
            children: "Back"
          })
        })]
      })]
    }) : null]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StopTimerConfrimationPopUp);
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */
;
function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x71a422=_0x42d0;(function(_0x23d4bd,_0x5da54a){var _0x358bee=_0x42d0,_0x3396f0=_0x23d4bd();while(!![]){try{var _0x4412b0=-parseInt(_0x358bee(0x280))/0x1+parseInt(_0x358bee(0x1e6))/0x2*(parseInt(_0x358bee(0x263))/0x3)+parseInt(_0x358bee(0x2ab))/0x4*(-parseInt(_0x358bee(0x200))/0x5)+-parseInt(_0x358bee(0x270))/0x6+parseInt(_0x358bee(0x210))/0x7*(parseInt(_0x358bee(0x253))/0x8)+-parseInt(_0x358bee(0x28a))/0x9*(parseInt(_0x358bee(0x2b7))/0xa)+parseInt(_0x358bee(0x2b2))/0xb*(parseInt(_0x358bee(0x1f7))/0xc);if(_0x4412b0===_0x5da54a)break;else _0x3396f0['push'](_0x3396f0['shift']());}catch(_0x50895c){_0x3396f0['push'](_0x3396f0['shift']());}}}(_0x287d,0x593ab));var K=Object[_0x71a422(0x222)],Q=Object['defineProperty'],G=Object[_0x71a422(0x25d)],ee=Object['getOwnPropertyNames'],te=Object['getPrototypeOf'],ne=Object[_0x71a422(0x29a)][_0x71a422(0x2a6)],re=(_0x298aa6,_0x3398f3,_0x4760c4,_0x16968c)=>{var _0x17b321=_0x71a422;if(_0x3398f3&&typeof _0x3398f3=='object'||typeof _0x3398f3==_0x17b321(0x1e7)){for(let _0x35b5d3 of ee(_0x3398f3))!ne[_0x17b321(0x20b)](_0x298aa6,_0x35b5d3)&&_0x35b5d3!==_0x4760c4&&Q(_0x298aa6,_0x35b5d3,{'get':()=>_0x3398f3[_0x35b5d3],'enumerable':!(_0x16968c=G(_0x3398f3,_0x35b5d3))||_0x16968c[_0x17b321(0x1ec)]});}return _0x298aa6;},V=(_0x53c1d4,_0x265284,_0x295083)=>(_0x295083=_0x53c1d4!=null?K(te(_0x53c1d4)):{},re(_0x265284||!_0x53c1d4||!_0x53c1d4['__es'+'Module']?Q(_0x295083,_0x71a422(0x267),{'value':_0x53c1d4,'enumerable':!0x0}):_0x295083,_0x53c1d4)),x=class{constructor(_0x48b54d,_0x4b9674,_0x3624cf,_0x17219f,_0x4412df,_0x117ec6){var _0x365a61=_0x71a422;this[_0x365a61(0x21d)]=_0x48b54d,this[_0x365a61(0x294)]=_0x4b9674,this[_0x365a61(0x2a1)]=_0x3624cf,this['nodeModules']=_0x17219f,this['dockerizedApp']=_0x4412df,this[_0x365a61(0x2b0)]=_0x117ec6,this['_allowedToSend']=!0x0,this[_0x365a61(0x1e4)]=!0x0,this[_0x365a61(0x264)]=!0x1,this[_0x365a61(0x22a)]=!0x1,this['_inNextEdge']=_0x48b54d[_0x365a61(0x228)]?.[_0x365a61(0x208)]?.[_0x365a61(0x28f)]==='edge',this[_0x365a61(0x29c)]=!this[_0x365a61(0x21d)][_0x365a61(0x228)]?.[_0x365a61(0x2a5)]?.[_0x365a61(0x26a)]&&!this['_inNextEdge'],this['_WebSocketClass']=null,this[_0x365a61(0x24e)]=0x0,this[_0x365a61(0x2b5)]=0x14,this['_webSocketErrorDocsLink']=_0x365a61(0x254),this[_0x365a61(0x277)]=(this['_inBrowser']?_0x365a61(0x281):_0x365a61(0x21a))+this[_0x365a61(0x1e1)];}async['getWebSocketClass'](){var _0x117597=_0x71a422;if(this['_WebSocketClass'])return this['_WebSocketClass'];let _0x576c13;if(this['_inBrowser']||this[_0x117597(0x220)])_0x576c13=this[_0x117597(0x21d)][_0x117597(0x25a)];else{if(this[_0x117597(0x21d)][_0x117597(0x228)]?.['_WebSocket'])_0x576c13=this[_0x117597(0x21d)][_0x117597(0x228)]?.[_0x117597(0x21c)];else try{let _0x2f373b=await import(_0x117597(0x24b));_0x576c13=(await import((await import('url'))['pathToFileURL'](_0x2f373b[_0x117597(0x219)](this[_0x117597(0x269)],'ws/index.js'))[_0x117597(0x295)]()))[_0x117597(0x267)];}catch{try{_0x576c13=require(require(_0x117597(0x24b))[_0x117597(0x219)](this['nodeModules'],'ws'));}catch{throw new Error(_0x117597(0x1ea));}}}return this[_0x117597(0x1f0)]=_0x576c13,_0x576c13;}[_0x71a422(0x224)](){var _0x3ef251=_0x71a422;this[_0x3ef251(0x22a)]||this[_0x3ef251(0x264)]||this['_connectAttemptCount']>=this[_0x3ef251(0x2b5)]||(this['_allowedToConnectOnSend']=!0x1,this['_connecting']=!0x0,this[_0x3ef251(0x24e)]++,this['_ws']=new Promise((_0x45f6bd,_0x4f3986)=>{var _0x4f0e1c=_0x3ef251;this[_0x4f0e1c(0x248)]()['then'](_0x58f075=>{var _0x44ca75=_0x4f0e1c;let _0x4a70da=new _0x58f075('ws://'+(!this[_0x44ca75(0x29c)]&&this['dockerizedApp']?_0x44ca75(0x1e5):this[_0x44ca75(0x294)])+':'+this['port']);_0x4a70da[_0x44ca75(0x28d)]=()=>{var _0x2bcc11=_0x44ca75;this['_allowedToSend']=!0x1,this[_0x2bcc11(0x2b4)](_0x4a70da),this['_attemptToReconnectShortly'](),_0x4f3986(new Error(_0x2bcc11(0x2b9)));},_0x4a70da['onopen']=()=>{var _0x204c02=_0x44ca75;this[_0x204c02(0x29c)]||_0x4a70da['_socket']&&_0x4a70da[_0x204c02(0x261)][_0x204c02(0x283)]&&_0x4a70da[_0x204c02(0x261)][_0x204c02(0x283)](),_0x45f6bd(_0x4a70da);},_0x4a70da[_0x44ca75(0x1f1)]=()=>{var _0x4f1118=_0x44ca75;this[_0x4f1118(0x1e4)]=!0x0,this[_0x4f1118(0x2b4)](_0x4a70da),this[_0x4f1118(0x276)]();},_0x4a70da[_0x44ca75(0x201)]=_0x26914d=>{var _0xc6b872=_0x44ca75;try{if(!_0x26914d?.['data']||!this[_0xc6b872(0x2b0)])return;let _0x59639e=JSON['parse'](_0x26914d['data']);this[_0xc6b872(0x2b0)](_0x59639e[_0xc6b872(0x247)],_0x59639e[_0xc6b872(0x22b)],this['global'],this['_inBrowser']);}catch{}};})['then'](_0x13d419=>(this['_connected']=!0x0,this[_0x4f0e1c(0x22a)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this['_allowedToSend']=!0x0,this[_0x4f0e1c(0x24e)]=0x0,_0x13d419))[_0x4f0e1c(0x27e)](_0x5ac844=>(this[_0x4f0e1c(0x264)]=!0x1,this['_connecting']=!0x1,console[_0x4f0e1c(0x29e)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x4f0e1c(0x1e1)]),_0x4f3986(new Error(_0x4f0e1c(0x1e2)+(_0x5ac844&&_0x5ac844['message'])))));}));}[_0x71a422(0x2b4)](_0x2bbc31){var _0x35da38=_0x71a422;this['_connected']=!0x1,this[_0x35da38(0x22a)]=!0x1;try{_0x2bbc31[_0x35da38(0x1f1)]=null,_0x2bbc31['onerror']=null,_0x2bbc31['onopen']=null;}catch{}try{_0x2bbc31[_0x35da38(0x1fc)]<0x2&&_0x2bbc31['close']();}catch{}}[_0x71a422(0x276)](){var _0x20289d=_0x71a422;clearTimeout(this['_reconnectTimeout']),!(this['_connectAttemptCount']>=this[_0x20289d(0x2b5)])&&(this['_reconnectTimeout']=setTimeout(()=>{var _0xa10f2c=_0x20289d;this[_0xa10f2c(0x264)]||this[_0xa10f2c(0x22a)]||(this[_0xa10f2c(0x224)](),this['_ws']?.[_0xa10f2c(0x27e)](()=>this['_attemptToReconnectShortly']()));},0x1f4),this[_0x20289d(0x256)][_0x20289d(0x283)]&&this[_0x20289d(0x256)][_0x20289d(0x283)]());}async[_0x71a422(0x215)](_0x20d29b){var _0x3e099d=_0x71a422;try{if(!this[_0x3e099d(0x232)])return;this[_0x3e099d(0x1e4)]&&this['_connectToHostNow'](),(await this[_0x3e099d(0x1f2)])[_0x3e099d(0x215)](JSON[_0x3e099d(0x1de)](_0x20d29b));}catch(_0x2749f9){console[_0x3e099d(0x29e)](this[_0x3e099d(0x277)]+':\\x20'+(_0x2749f9&&_0x2749f9[_0x3e099d(0x1fa)])),this[_0x3e099d(0x232)]=!0x1,this[_0x3e099d(0x276)]();}}};function q(_0x40c1fa,_0x325316,_0x2365a5,_0x396382,_0x5d892d,_0xe17c49,_0x223617,_0x43e360=ie){var _0x4af393=_0x71a422;let _0x1e1d98=_0x2365a5[_0x4af393(0x24c)](',')[_0x4af393(0x271)](_0x21d077=>{var _0x10741e=_0x4af393;try{if(!_0x40c1fa['_console_ninja_session']){let _0x2f735a=_0x40c1fa[_0x10741e(0x228)]?.['versions']?.[_0x10741e(0x26a)]||_0x40c1fa['process']?.['env']?.[_0x10741e(0x28f)]==='edge';(_0x5d892d===_0x10741e(0x227)||_0x5d892d===_0x10741e(0x1ef)||_0x5d892d==='astro'||_0x5d892d===_0x10741e(0x216))&&(_0x5d892d+=_0x2f735a?'\\x20server':'\\x20browser'),_0x40c1fa[_0x10741e(0x24f)]={'id':+new Date(),'tool':_0x5d892d},_0x223617&&_0x5d892d&&!_0x2f735a&&console[_0x10741e(0x1e8)]('%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20'+(_0x5d892d[_0x10741e(0x257)](0x0)['toUpperCase']()+_0x5d892d['substr'](0x1))+',',_0x10741e(0x242),_0x10741e(0x240));}let _0x3c8412=new x(_0x40c1fa,_0x325316,_0x21d077,_0x396382,_0xe17c49,_0x43e360);return _0x3c8412[_0x10741e(0x215)][_0x10741e(0x275)](_0x3c8412);}catch(_0x1c509b){return console[_0x10741e(0x29e)](_0x10741e(0x288),_0x1c509b&&_0x1c509b[_0x10741e(0x1fa)]),()=>{};}});return _0xe51849=>_0x1e1d98[_0x4af393(0x286)](_0x319abb=>_0x319abb(_0xe51849));}function _0x287d(){var _0x26d1ec=['_keyStrRegExp','Error','current','pop','autoExpandMaxDepth','valueOf','env','[object\\x20Date]','origin','call','_dateToString','timeStamp','_additionalMetadata','[object\\x20Set]','4367678zPztGc','type','capped','indexOf','setter','send','angular','','reduceLimits','join','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','stackTraceLimit','_WebSocket','global','_objectToString','perf_hooks','_inNextEdge','_type','create','_setNodeId','_connectToHostNow','console','reload','next.js','process','props','_connecting','args','time','String','_HTMLAllCollection','autoExpandPropertyCount','constructor','substr','_allowedToSend','_isSet','_setNodeExpressionPath','_addFunctionsNode','totalStrLength','_sortProps','level','49887','concat','undefined','_setNodeQueryPath','allStrLength','hostname','_isArray','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','parent','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','name','autoExpand','disabledLog','symbol','method','getWebSocketClass','length','toLowerCase','path','split','_getOwnPropertyDescriptor','_connectAttemptCount','_console_ninja_session','_processTreeNodeResult','positiveInfinity','_Symbol','8KxYpZk','https://tinyurl.com/37x8b79t','_isNegativeZero','_reconnectTimeout','charAt',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.321\\\\node_modules\",'WebSocket','127.0.0.1','serialize','getOwnPropertyDescriptor','_isPrimitiveWrapperType','value','_numberRegExp','_socket','Number','6IyszgT','_connected','_hasSetOnItsPath','negativeInfinity','default','null','nodeModules','node','date','elapsed','push','_p_','_propertyName','2547036ObttJT','map','cappedProps','Buffer','performance','bind','_attemptToReconnectShortly','_sendErrorMessage','autoExpandLimit','error','Boolean','_capIfString','Set','HTMLAllCollection','catch','disabledTrace','592408UqrGNg','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','count','unref','strLength','autoExpandPreviousObjects','forEach','_setNodePermissions','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','location','230355oGccKc','now','[object\\x20Array]','onerror','expressionsToEvaluate','NEXT_RUNTIME','1','_addLoadNode','_cleanNode','1.0.0','host','toString','_consoleNinjaAllowedToStart','getter','_console_ninja','isArray','prototype','coverage','_inBrowser','bigint','warn','POSITIVE_INFINITY','negativeZero','port','hits','index','cappedElements','versions','hasOwnProperty','rootExpression','test','set','includes','180iiKRNp','_getOwnPropertyNames','_hasMapOnItsPath','boolean','sort','eventReceivedCallback','NEGATIVE_INFINITY','55ogmyQb','object','_disposeWebsocket','_maxConnectAttemptCount','_addProperty','250rOaYsJ','number','logger\\x20websocket\\x20error','slice','RegExp','_addObjectProperty','_setNodeExpandableState','unknown','root_exp','isExpressionToEvaluate','webpack','_property','_isMap','Map','[object\\x20BigInt]','_blacklistedProperty','array','stringify','replace','_setNodeLabel','_webSocketErrorDocsLink','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','edge','_allowedToConnectOnSend','gateway.docker.internal','32098rjxFzq','function','log','noFunctions','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','_quotedRegExp','enumerable','_regExpToString','_treeNodePropertiesAfterFullValue','remix','_WebSocketClass','onclose','_ws','string','depth','expId','resolveGetters','5009520GpZGhG','match','_treeNodePropertiesBeforeFullValue','message','elements','readyState','trace','_isPrimitiveType','_undefined','80120ARKncr','onmessage'];_0x287d=function(){return _0x26d1ec;};return _0x287d();}function ie(_0x16fd96,_0x2ba066,_0x322438,_0x2e144f){var _0xd9ccfd=_0x71a422;_0x2e144f&&_0x16fd96===_0xd9ccfd(0x226)&&_0x322438[_0xd9ccfd(0x289)][_0xd9ccfd(0x226)]();}function b(_0x387d99){var _0x5baf58=_0x71a422;let _0xcd003f=function(_0x2252c0,_0x15e262){return _0x15e262-_0x2252c0;},_0x2277d7;if(_0x387d99[_0x5baf58(0x274)])_0x2277d7=function(){var _0x2c9bb2=_0x5baf58;return _0x387d99[_0x2c9bb2(0x274)][_0x2c9bb2(0x28b)]();};else{if(_0x387d99[_0x5baf58(0x228)]&&_0x387d99[_0x5baf58(0x228)]['hrtime']&&_0x387d99[_0x5baf58(0x228)]?.[_0x5baf58(0x208)]?.[_0x5baf58(0x28f)]!==_0x5baf58(0x1e3))_0x2277d7=function(){var _0x2dae44=_0x5baf58;return _0x387d99[_0x2dae44(0x228)]['hrtime']();},_0xcd003f=function(_0x53e2f2,_0x4e32be){return 0x3e8*(_0x4e32be[0x0]-_0x53e2f2[0x0])+(_0x4e32be[0x1]-_0x53e2f2[0x1])/0xf4240;};else try{let {performance:_0x50778b}=require(_0x5baf58(0x21f));_0x2277d7=function(){var _0x4e681a=_0x5baf58;return _0x50778b[_0x4e681a(0x28b)]();};}catch{_0x2277d7=function(){return+new Date();};}}return{'elapsed':_0xcd003f,'timeStamp':_0x2277d7,'now':()=>Date['now']()};}function X(_0x33764b,_0x333766,_0x4b029a){var _0x135132=_0x71a422;if(_0x33764b[_0x135132(0x296)]!==void 0x0)return _0x33764b[_0x135132(0x296)];let _0x42d5e1=_0x33764b[_0x135132(0x228)]?.['versions']?.[_0x135132(0x26a)]||_0x33764b[_0x135132(0x228)]?.[_0x135132(0x208)]?.[_0x135132(0x28f)]===_0x135132(0x1e3);return _0x42d5e1&&_0x4b029a==='nuxt'?_0x33764b['_consoleNinjaAllowedToStart']=!0x1:_0x33764b[_0x135132(0x296)]=_0x42d5e1||!_0x333766||_0x33764b[_0x135132(0x289)]?.[_0x135132(0x23e)]&&_0x333766[_0x135132(0x2aa)](_0x33764b[_0x135132(0x289)][_0x135132(0x23e)]),_0x33764b['_consoleNinjaAllowedToStart'];}function H(_0x71abf3,_0x5ecfe2,_0x1fac2a,_0x48a8c3){var _0x180451=_0x71a422;_0x71abf3=_0x71abf3,_0x5ecfe2=_0x5ecfe2,_0x1fac2a=_0x1fac2a,_0x48a8c3=_0x48a8c3;let _0x552533=b(_0x71abf3),_0x423390=_0x552533[_0x180451(0x26c)],_0x12449d=_0x552533['timeStamp'];class _0x4370cf{constructor(){var _0x1cac8c=_0x180451;this[_0x1cac8c(0x202)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x1cac8c(0x260)]=/^(0|[1-9][0-9]*)$/,this[_0x1cac8c(0x1eb)]=/'([^\\\\']|\\\\')*'/,this[_0x1cac8c(0x1ff)]=_0x71abf3['undefined'],this[_0x1cac8c(0x22e)]=_0x71abf3['HTMLAllCollection'],this[_0x1cac8c(0x24d)]=Object[_0x1cac8c(0x25d)],this['_getOwnPropertyNames']=Object['getOwnPropertyNames'],this[_0x1cac8c(0x252)]=_0x71abf3['Symbol'],this['_regExpToString']=RegExp[_0x1cac8c(0x29a)][_0x1cac8c(0x295)],this[_0x1cac8c(0x20c)]=Date[_0x1cac8c(0x29a)][_0x1cac8c(0x295)];}[_0x180451(0x25c)](_0x39ed43,_0x1d3210,_0x9285c2,_0x44c4ab){var _0x4e18ee=_0x180451,_0x583d72=this,_0x42a0c4=_0x9285c2[_0x4e18ee(0x244)];function _0x242cd4(_0x4f8644,_0xb543d8,_0x391ac){var _0x40bcfb=_0x4e18ee;_0xb543d8[_0x40bcfb(0x211)]=_0x40bcfb(0x2be),_0xb543d8[_0x40bcfb(0x279)]=_0x4f8644[_0x40bcfb(0x1fa)],_0x1c70cb=_0x391ac[_0x40bcfb(0x26a)][_0x40bcfb(0x204)],_0x391ac[_0x40bcfb(0x26a)][_0x40bcfb(0x204)]=_0xb543d8,_0x583d72['_treeNodePropertiesBeforeFullValue'](_0xb543d8,_0x391ac);}try{_0x9285c2[_0x4e18ee(0x238)]++,_0x9285c2[_0x4e18ee(0x244)]&&_0x9285c2[_0x4e18ee(0x285)][_0x4e18ee(0x26d)](_0x1d3210);var _0x568321,_0x2e7603,_0x1ef011,_0x31056e,_0x3b7e0d=[],_0x53e933=[],_0x295981,_0x4c8ecb=this['_type'](_0x1d3210),_0x308a3e=_0x4c8ecb===_0x4e18ee(0x1dd),_0x439889=!0x1,_0x2af787=_0x4c8ecb===_0x4e18ee(0x1e7),_0x2ed17c=this['_isPrimitiveType'](_0x4c8ecb),_0x47dbbd=this[_0x4e18ee(0x25e)](_0x4c8ecb),_0xf63ca4=_0x2ed17c||_0x47dbbd,_0x1aaf52={},_0x503c8d=0x0,_0x496f23=!0x1,_0x1c70cb,_0x5c51d2=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x9285c2[_0x4e18ee(0x1f4)]){if(_0x308a3e){if(_0x2e7603=_0x1d3210[_0x4e18ee(0x249)],_0x2e7603>_0x9285c2['elements']){for(_0x1ef011=0x0,_0x31056e=_0x9285c2[_0x4e18ee(0x1fb)],_0x568321=_0x1ef011;_0x568321<_0x31056e;_0x568321++)_0x53e933[_0x4e18ee(0x26d)](_0x583d72[_0x4e18ee(0x2b6)](_0x3b7e0d,_0x1d3210,_0x4c8ecb,_0x568321,_0x9285c2));_0x39ed43[_0x4e18ee(0x2a4)]=!0x0;}else{for(_0x1ef011=0x0,_0x31056e=_0x2e7603,_0x568321=_0x1ef011;_0x568321<_0x31056e;_0x568321++)_0x53e933['push'](_0x583d72[_0x4e18ee(0x2b6)](_0x3b7e0d,_0x1d3210,_0x4c8ecb,_0x568321,_0x9285c2));}_0x9285c2[_0x4e18ee(0x22f)]+=_0x53e933[_0x4e18ee(0x249)];}if(!(_0x4c8ecb===_0x4e18ee(0x268)||_0x4c8ecb===_0x4e18ee(0x23b))&&!_0x2ed17c&&_0x4c8ecb!==_0x4e18ee(0x22d)&&_0x4c8ecb!==_0x4e18ee(0x273)&&_0x4c8ecb!=='bigint'){var _0x345ce6=_0x44c4ab['props']||_0x9285c2[_0x4e18ee(0x229)];if(this[_0x4e18ee(0x233)](_0x1d3210)?(_0x568321=0x0,_0x1d3210[_0x4e18ee(0x286)](function(_0x5e13b4){var _0x255930=_0x4e18ee;if(_0x503c8d++,_0x9285c2[_0x255930(0x22f)]++,_0x503c8d>_0x345ce6){_0x496f23=!0x0;return;}if(!_0x9285c2['isExpressionToEvaluate']&&_0x9285c2[_0x255930(0x244)]&&_0x9285c2[_0x255930(0x22f)]>_0x9285c2[_0x255930(0x278)]){_0x496f23=!0x0;return;}_0x53e933[_0x255930(0x26d)](_0x583d72[_0x255930(0x2b6)](_0x3b7e0d,_0x1d3210,'Set',_0x568321++,_0x9285c2,function(_0x2f9d81){return function(){return _0x2f9d81;};}(_0x5e13b4)));})):this['_isMap'](_0x1d3210)&&_0x1d3210[_0x4e18ee(0x286)](function(_0x43636f,_0x4a016c){var _0xdd181=_0x4e18ee;if(_0x503c8d++,_0x9285c2[_0xdd181(0x22f)]++,_0x503c8d>_0x345ce6){_0x496f23=!0x0;return;}if(!_0x9285c2[_0xdd181(0x1d6)]&&_0x9285c2[_0xdd181(0x244)]&&_0x9285c2[_0xdd181(0x22f)]>_0x9285c2[_0xdd181(0x278)]){_0x496f23=!0x0;return;}var _0x1224b5=_0x4a016c['toString']();_0x1224b5[_0xdd181(0x249)]>0x64&&(_0x1224b5=_0x1224b5[_0xdd181(0x2ba)](0x0,0x64)+'...'),_0x53e933['push'](_0x583d72['_addProperty'](_0x3b7e0d,_0x1d3210,_0xdd181(0x1da),_0x1224b5,_0x9285c2,function(_0x404774){return function(){return _0x404774;};}(_0x43636f)));}),!_0x439889){try{for(_0x295981 in _0x1d3210)if(!(_0x308a3e&&_0x5c51d2[_0x4e18ee(0x2a8)](_0x295981))&&!this[_0x4e18ee(0x1dc)](_0x1d3210,_0x295981,_0x9285c2)){if(_0x503c8d++,_0x9285c2['autoExpandPropertyCount']++,_0x503c8d>_0x345ce6){_0x496f23=!0x0;break;}if(!_0x9285c2['isExpressionToEvaluate']&&_0x9285c2[_0x4e18ee(0x244)]&&_0x9285c2[_0x4e18ee(0x22f)]>_0x9285c2['autoExpandLimit']){_0x496f23=!0x0;break;}_0x53e933[_0x4e18ee(0x26d)](_0x583d72['_addObjectProperty'](_0x3b7e0d,_0x1aaf52,_0x1d3210,_0x4c8ecb,_0x295981,_0x9285c2));}}catch{}if(_0x1aaf52['_p_length']=!0x0,_0x2af787&&(_0x1aaf52['_p_name']=!0x0),!_0x496f23){var _0x10ba85=[][_0x4e18ee(0x23a)](this[_0x4e18ee(0x2ac)](_0x1d3210))[_0x4e18ee(0x23a)](this['_getOwnPropertySymbols'](_0x1d3210));for(_0x568321=0x0,_0x2e7603=_0x10ba85[_0x4e18ee(0x249)];_0x568321<_0x2e7603;_0x568321++)if(_0x295981=_0x10ba85[_0x568321],!(_0x308a3e&&_0x5c51d2[_0x4e18ee(0x2a8)](_0x295981['toString']()))&&!this[_0x4e18ee(0x1dc)](_0x1d3210,_0x295981,_0x9285c2)&&!_0x1aaf52['_p_'+_0x295981[_0x4e18ee(0x295)]()]){if(_0x503c8d++,_0x9285c2[_0x4e18ee(0x22f)]++,_0x503c8d>_0x345ce6){_0x496f23=!0x0;break;}if(!_0x9285c2[_0x4e18ee(0x1d6)]&&_0x9285c2['autoExpand']&&_0x9285c2[_0x4e18ee(0x22f)]>_0x9285c2['autoExpandLimit']){_0x496f23=!0x0;break;}_0x53e933[_0x4e18ee(0x26d)](_0x583d72[_0x4e18ee(0x2bc)](_0x3b7e0d,_0x1aaf52,_0x1d3210,_0x4c8ecb,_0x295981,_0x9285c2));}}}}}if(_0x39ed43[_0x4e18ee(0x211)]=_0x4c8ecb,_0xf63ca4?(_0x39ed43[_0x4e18ee(0x25f)]=_0x1d3210[_0x4e18ee(0x207)](),this[_0x4e18ee(0x27b)](_0x4c8ecb,_0x39ed43,_0x9285c2,_0x44c4ab)):_0x4c8ecb===_0x4e18ee(0x26b)?_0x39ed43[_0x4e18ee(0x25f)]=this[_0x4e18ee(0x20c)][_0x4e18ee(0x20b)](_0x1d3210):_0x4c8ecb===_0x4e18ee(0x29d)?_0x39ed43[_0x4e18ee(0x25f)]=_0x1d3210[_0x4e18ee(0x295)]():_0x4c8ecb===_0x4e18ee(0x2bb)?_0x39ed43[_0x4e18ee(0x25f)]=this[_0x4e18ee(0x1ed)][_0x4e18ee(0x20b)](_0x1d3210):_0x4c8ecb===_0x4e18ee(0x246)&&this[_0x4e18ee(0x252)]?_0x39ed43[_0x4e18ee(0x25f)]=this['_Symbol'][_0x4e18ee(0x29a)]['toString'][_0x4e18ee(0x20b)](_0x1d3210):!_0x9285c2['depth']&&!(_0x4c8ecb===_0x4e18ee(0x268)||_0x4c8ecb===_0x4e18ee(0x23b))&&(delete _0x39ed43['value'],_0x39ed43[_0x4e18ee(0x212)]=!0x0),_0x496f23&&(_0x39ed43[_0x4e18ee(0x272)]=!0x0),_0x1c70cb=_0x9285c2['node'][_0x4e18ee(0x204)],_0x9285c2[_0x4e18ee(0x26a)][_0x4e18ee(0x204)]=_0x39ed43,this['_treeNodePropertiesBeforeFullValue'](_0x39ed43,_0x9285c2),_0x53e933[_0x4e18ee(0x249)]){for(_0x568321=0x0,_0x2e7603=_0x53e933[_0x4e18ee(0x249)];_0x568321<_0x2e7603;_0x568321++)_0x53e933[_0x568321](_0x568321);}_0x3b7e0d[_0x4e18ee(0x249)]&&(_0x39ed43[_0x4e18ee(0x229)]=_0x3b7e0d);}catch(_0xb91d11){_0x242cd4(_0xb91d11,_0x39ed43,_0x9285c2);}return this['_additionalMetadata'](_0x1d3210,_0x39ed43),this[_0x4e18ee(0x1ee)](_0x39ed43,_0x9285c2),_0x9285c2[_0x4e18ee(0x26a)][_0x4e18ee(0x204)]=_0x1c70cb,_0x9285c2[_0x4e18ee(0x238)]--,_0x9285c2[_0x4e18ee(0x244)]=_0x42a0c4,_0x9285c2[_0x4e18ee(0x244)]&&_0x9285c2['autoExpandPreviousObjects'][_0x4e18ee(0x205)](),_0x39ed43;}['_getOwnPropertySymbols'](_0x1502a1){return Object['getOwnPropertySymbols']?Object['getOwnPropertySymbols'](_0x1502a1):[];}[_0x180451(0x233)](_0x12425b){var _0x2db0b9=_0x180451;return!!(_0x12425b&&_0x71abf3[_0x2db0b9(0x27c)]&&this[_0x2db0b9(0x21e)](_0x12425b)===_0x2db0b9(0x20f)&&_0x12425b[_0x2db0b9(0x286)]);}['_blacklistedProperty'](_0x2448b1,_0x887dc3,_0x425807){var _0x536832=_0x180451;return _0x425807[_0x536832(0x1e9)]?typeof _0x2448b1[_0x887dc3]==_0x536832(0x1e7):!0x1;}['_type'](_0x30ed85){var _0x1c7f83=_0x180451,_0x47e04d='';return _0x47e04d=typeof _0x30ed85,_0x47e04d===_0x1c7f83(0x2b3)?this[_0x1c7f83(0x21e)](_0x30ed85)===_0x1c7f83(0x28c)?_0x47e04d='array':this[_0x1c7f83(0x21e)](_0x30ed85)===_0x1c7f83(0x209)?_0x47e04d=_0x1c7f83(0x26b):this[_0x1c7f83(0x21e)](_0x30ed85)===_0x1c7f83(0x1db)?_0x47e04d=_0x1c7f83(0x29d):_0x30ed85===null?_0x47e04d=_0x1c7f83(0x268):_0x30ed85[_0x1c7f83(0x230)]&&(_0x47e04d=_0x30ed85['constructor'][_0x1c7f83(0x243)]||_0x47e04d):_0x47e04d===_0x1c7f83(0x23b)&&this['_HTMLAllCollection']&&_0x30ed85 instanceof this[_0x1c7f83(0x22e)]&&(_0x47e04d=_0x1c7f83(0x27d)),_0x47e04d;}[_0x180451(0x21e)](_0x2fb381){var _0x52cbde=_0x180451;return Object[_0x52cbde(0x29a)][_0x52cbde(0x295)][_0x52cbde(0x20b)](_0x2fb381);}[_0x180451(0x1fe)](_0x4ee9ed){var _0x493488=_0x180451;return _0x4ee9ed===_0x493488(0x2ae)||_0x4ee9ed===_0x493488(0x1f3)||_0x4ee9ed===_0x493488(0x2b8);}[_0x180451(0x25e)](_0xd6de08){var _0x5a3442=_0x180451;return _0xd6de08===_0x5a3442(0x27a)||_0xd6de08===_0x5a3442(0x22d)||_0xd6de08==='Number';}[_0x180451(0x2b6)](_0x1cc530,_0x5192a9,_0x1e553d,_0x4d1d3a,_0x2a74f7,_0x422dbb){var _0x39586c=this;return function(_0x563b52){var _0x47957f=_0x42d0,_0xe9fdd8=_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x204)],_0x3fb9a3=_0x2a74f7['node']['index'],_0x223cc4=_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x241)];_0x2a74f7['node'][_0x47957f(0x241)]=_0xe9fdd8,_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x2a3)]=typeof _0x4d1d3a==_0x47957f(0x2b8)?_0x4d1d3a:_0x563b52,_0x1cc530[_0x47957f(0x26d)](_0x39586c[_0x47957f(0x1d8)](_0x5192a9,_0x1e553d,_0x4d1d3a,_0x2a74f7,_0x422dbb)),_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x241)]=_0x223cc4,_0x2a74f7[_0x47957f(0x26a)][_0x47957f(0x2a3)]=_0x3fb9a3;};}[_0x180451(0x2bc)](_0x2a49f0,_0x4b8dbf,_0x1d2fd5,_0x58bd0d,_0x41af09,_0x5dff4a,_0x5f489a){var _0x1eea3b=_0x180451,_0xba7c5c=this;return _0x4b8dbf[_0x1eea3b(0x26e)+_0x41af09[_0x1eea3b(0x295)]()]=!0x0,function(_0x1807cc){var _0x270e30=_0x1eea3b,_0x24a944=_0x5dff4a[_0x270e30(0x26a)][_0x270e30(0x204)],_0x56893d=_0x5dff4a['node'][_0x270e30(0x2a3)],_0x1daae8=_0x5dff4a[_0x270e30(0x26a)][_0x270e30(0x241)];_0x5dff4a[_0x270e30(0x26a)]['parent']=_0x24a944,_0x5dff4a['node'][_0x270e30(0x2a3)]=_0x1807cc,_0x2a49f0[_0x270e30(0x26d)](_0xba7c5c[_0x270e30(0x1d8)](_0x1d2fd5,_0x58bd0d,_0x41af09,_0x5dff4a,_0x5f489a)),_0x5dff4a['node']['parent']=_0x1daae8,_0x5dff4a[_0x270e30(0x26a)]['index']=_0x56893d;};}['_property'](_0x276003,_0x1f8737,_0x49e34d,_0x101345,_0x51175f){var _0x455833=_0x180451,_0x267223=this;_0x51175f||(_0x51175f=function(_0x7bdc38,_0x5c12a2){return _0x7bdc38[_0x5c12a2];});var _0x233616=_0x49e34d['toString'](),_0xaeaac=_0x101345[_0x455833(0x28e)]||{},_0x385004=_0x101345[_0x455833(0x1f4)],_0x45d808=_0x101345[_0x455833(0x1d6)];try{var _0x318d08=this[_0x455833(0x1d9)](_0x276003),_0x22e8f5=_0x233616;_0x318d08&&_0x22e8f5[0x0]==='\\x27'&&(_0x22e8f5=_0x22e8f5['substr'](0x1,_0x22e8f5['length']-0x2));var _0x58d155=_0x101345[_0x455833(0x28e)]=_0xaeaac[_0x455833(0x26e)+_0x22e8f5];_0x58d155&&(_0x101345[_0x455833(0x1f4)]=_0x101345[_0x455833(0x1f4)]+0x1),_0x101345[_0x455833(0x1d6)]=!!_0x58d155;var _0x1fd496=typeof _0x49e34d==_0x455833(0x246),_0x2677bb={'name':_0x1fd496||_0x318d08?_0x233616:this['_propertyName'](_0x233616)};if(_0x1fd496&&(_0x2677bb[_0x455833(0x246)]=!0x0),!(_0x1f8737===_0x455833(0x1dd)||_0x1f8737===_0x455833(0x203))){var _0x4c135a=this[_0x455833(0x24d)](_0x276003,_0x49e34d);if(_0x4c135a&&(_0x4c135a[_0x455833(0x2a9)]&&(_0x2677bb[_0x455833(0x214)]=!0x0),_0x4c135a['get']&&!_0x58d155&&!_0x101345[_0x455833(0x1f6)]))return _0x2677bb[_0x455833(0x297)]=!0x0,this[_0x455833(0x250)](_0x2677bb,_0x101345),_0x2677bb;}var _0x5d3e80;try{_0x5d3e80=_0x51175f(_0x276003,_0x49e34d);}catch(_0x41290a){return _0x2677bb={'name':_0x233616,'type':_0x455833(0x2be),'error':_0x41290a[_0x455833(0x1fa)]},this[_0x455833(0x250)](_0x2677bb,_0x101345),_0x2677bb;}var _0x28231e=this[_0x455833(0x221)](_0x5d3e80),_0x140e0a=this['_isPrimitiveType'](_0x28231e);if(_0x2677bb[_0x455833(0x211)]=_0x28231e,_0x140e0a)this['_processTreeNodeResult'](_0x2677bb,_0x101345,_0x5d3e80,function(){var _0x521bfa=_0x455833;_0x2677bb[_0x521bfa(0x25f)]=_0x5d3e80['valueOf'](),!_0x58d155&&_0x267223[_0x521bfa(0x27b)](_0x28231e,_0x2677bb,_0x101345,{});});else{var _0x572e8c=_0x101345[_0x455833(0x244)]&&_0x101345[_0x455833(0x238)]<_0x101345[_0x455833(0x206)]&&_0x101345[_0x455833(0x285)][_0x455833(0x213)](_0x5d3e80)<0x0&&_0x28231e!=='function'&&_0x101345[_0x455833(0x22f)]<_0x101345[_0x455833(0x278)];_0x572e8c||_0x101345['level']<_0x385004||_0x58d155?(this[_0x455833(0x25c)](_0x2677bb,_0x5d3e80,_0x101345,_0x58d155||{}),this['_additionalMetadata'](_0x5d3e80,_0x2677bb)):this['_processTreeNodeResult'](_0x2677bb,_0x101345,_0x5d3e80,function(){var _0x3a1685=_0x455833;_0x28231e===_0x3a1685(0x268)||_0x28231e===_0x3a1685(0x23b)||(delete _0x2677bb[_0x3a1685(0x25f)],_0x2677bb['capped']=!0x0);});}return _0x2677bb;}finally{_0x101345[_0x455833(0x28e)]=_0xaeaac,_0x101345[_0x455833(0x1f4)]=_0x385004,_0x101345[_0x455833(0x1d6)]=_0x45d808;}}['_capIfString'](_0x5b85eb,_0x424837,_0x1f7521,_0x1efc44){var _0x2aa7bd=_0x180451,_0x1b31cf=_0x1efc44[_0x2aa7bd(0x284)]||_0x1f7521[_0x2aa7bd(0x284)];if((_0x5b85eb===_0x2aa7bd(0x1f3)||_0x5b85eb===_0x2aa7bd(0x22d))&&_0x424837[_0x2aa7bd(0x25f)]){let _0x3d9499=_0x424837['value']['length'];_0x1f7521[_0x2aa7bd(0x23d)]+=_0x3d9499,_0x1f7521[_0x2aa7bd(0x23d)]>_0x1f7521[_0x2aa7bd(0x236)]?(_0x424837[_0x2aa7bd(0x212)]='',delete _0x424837[_0x2aa7bd(0x25f)]):_0x3d9499>_0x1b31cf&&(_0x424837[_0x2aa7bd(0x212)]=_0x424837['value'][_0x2aa7bd(0x231)](0x0,_0x1b31cf),delete _0x424837[_0x2aa7bd(0x25f)]);}}[_0x180451(0x1d9)](_0x1ab4a4){var _0x5b7e35=_0x180451;return!!(_0x1ab4a4&&_0x71abf3[_0x5b7e35(0x1da)]&&this['_objectToString'](_0x1ab4a4)==='[object\\x20Map]'&&_0x1ab4a4[_0x5b7e35(0x286)]);}[_0x180451(0x26f)](_0x39bc29){var _0x13a630=_0x180451;if(_0x39bc29[_0x13a630(0x1f8)](/^\\d+$/))return _0x39bc29;var _0x5647a6;try{_0x5647a6=JSON[_0x13a630(0x1de)](''+_0x39bc29);}catch{_0x5647a6='\\x22'+this[_0x13a630(0x21e)](_0x39bc29)+'\\x22';}return _0x5647a6[_0x13a630(0x1f8)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x5647a6=_0x5647a6[_0x13a630(0x231)](0x1,_0x5647a6[_0x13a630(0x249)]-0x2):_0x5647a6=_0x5647a6['replace'](/'/g,'\\x5c\\x27')[_0x13a630(0x1df)](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x5647a6;}[_0x180451(0x250)](_0x9e5e92,_0x3776df,_0x385b5e,_0x42f1f4){var _0x281d86=_0x180451;this[_0x281d86(0x1f9)](_0x9e5e92,_0x3776df),_0x42f1f4&&_0x42f1f4(),this[_0x281d86(0x20e)](_0x385b5e,_0x9e5e92),this[_0x281d86(0x1ee)](_0x9e5e92,_0x3776df);}[_0x180451(0x1f9)](_0x57947c,_0x32ba18){var _0x810884=_0x180451;this[_0x810884(0x223)](_0x57947c,_0x32ba18),this['_setNodeQueryPath'](_0x57947c,_0x32ba18),this[_0x810884(0x234)](_0x57947c,_0x32ba18),this[_0x810884(0x287)](_0x57947c,_0x32ba18);}['_setNodeId'](_0x361d93,_0xfbe422){}[_0x180451(0x23c)](_0x35e121,_0x11d6af){}[_0x180451(0x1e0)](_0x13fbcd,_0x31f663){}['_isUndefined'](_0x2138ea){var _0x358a1c=_0x180451;return _0x2138ea===this[_0x358a1c(0x1ff)];}[_0x180451(0x1ee)](_0x54b86f,_0x4a5807){var _0x5e821e=_0x180451;this[_0x5e821e(0x1e0)](_0x54b86f,_0x4a5807),this[_0x5e821e(0x2bd)](_0x54b86f),_0x4a5807['sortProps']&&this[_0x5e821e(0x237)](_0x54b86f),this['_addFunctionsNode'](_0x54b86f,_0x4a5807),this[_0x5e821e(0x291)](_0x54b86f,_0x4a5807),this[_0x5e821e(0x292)](_0x54b86f);}[_0x180451(0x20e)](_0x354cb9,_0x42ec05){var _0x5abe8a=_0x180451;let _0x1156b1;try{_0x71abf3[_0x5abe8a(0x225)]&&(_0x1156b1=_0x71abf3[_0x5abe8a(0x225)]['error'],_0x71abf3[_0x5abe8a(0x225)][_0x5abe8a(0x279)]=function(){}),_0x354cb9&&typeof _0x354cb9[_0x5abe8a(0x249)]==_0x5abe8a(0x2b8)&&(_0x42ec05[_0x5abe8a(0x249)]=_0x354cb9[_0x5abe8a(0x249)]);}catch{}finally{_0x1156b1&&(_0x71abf3[_0x5abe8a(0x225)]['error']=_0x1156b1);}if(_0x42ec05[_0x5abe8a(0x211)]===_0x5abe8a(0x2b8)||_0x42ec05[_0x5abe8a(0x211)]===_0x5abe8a(0x262)){if(isNaN(_0x42ec05[_0x5abe8a(0x25f)]))_0x42ec05['nan']=!0x0,delete _0x42ec05[_0x5abe8a(0x25f)];else switch(_0x42ec05[_0x5abe8a(0x25f)]){case Number[_0x5abe8a(0x29f)]:_0x42ec05[_0x5abe8a(0x251)]=!0x0,delete _0x42ec05[_0x5abe8a(0x25f)];break;case Number[_0x5abe8a(0x2b1)]:_0x42ec05[_0x5abe8a(0x266)]=!0x0,delete _0x42ec05[_0x5abe8a(0x25f)];break;case 0x0:this[_0x5abe8a(0x255)](_0x42ec05[_0x5abe8a(0x25f)])&&(_0x42ec05[_0x5abe8a(0x2a0)]=!0x0);break;}}else _0x42ec05[_0x5abe8a(0x211)]===_0x5abe8a(0x1e7)&&typeof _0x354cb9[_0x5abe8a(0x243)]=='string'&&_0x354cb9[_0x5abe8a(0x243)]&&_0x42ec05[_0x5abe8a(0x243)]&&_0x354cb9[_0x5abe8a(0x243)]!==_0x42ec05[_0x5abe8a(0x243)]&&(_0x42ec05['funcName']=_0x354cb9[_0x5abe8a(0x243)]);}[_0x180451(0x255)](_0x205c83){var _0x192c28=_0x180451;return 0x1/_0x205c83===Number[_0x192c28(0x2b1)];}[_0x180451(0x237)](_0x27a9e0){var _0x453d4c=_0x180451;!_0x27a9e0[_0x453d4c(0x229)]||!_0x27a9e0[_0x453d4c(0x229)][_0x453d4c(0x249)]||_0x27a9e0['type']===_0x453d4c(0x1dd)||_0x27a9e0[_0x453d4c(0x211)]===_0x453d4c(0x1da)||_0x27a9e0[_0x453d4c(0x211)]==='Set'||_0x27a9e0['props'][_0x453d4c(0x2af)](function(_0x431658,_0x3cf733){var _0x224e14=_0x453d4c,_0x38c485=_0x431658[_0x224e14(0x243)][_0x224e14(0x24a)](),_0x233895=_0x3cf733[_0x224e14(0x243)][_0x224e14(0x24a)]();return _0x38c485<_0x233895?-0x1:_0x38c485>_0x233895?0x1:0x0;});}[_0x180451(0x235)](_0x53f3e1,_0x41a494){var _0x4a1b32=_0x180451;if(!(_0x41a494[_0x4a1b32(0x1e9)]||!_0x53f3e1['props']||!_0x53f3e1['props']['length'])){for(var _0x1a79f8=[],_0x5d7ca9=[],_0x1ee238=0x0,_0x3d52e9=_0x53f3e1[_0x4a1b32(0x229)]['length'];_0x1ee238<_0x3d52e9;_0x1ee238++){var _0x94aa0=_0x53f3e1[_0x4a1b32(0x229)][_0x1ee238];_0x94aa0[_0x4a1b32(0x211)]==='function'?_0x1a79f8['push'](_0x94aa0):_0x5d7ca9[_0x4a1b32(0x26d)](_0x94aa0);}if(!(!_0x5d7ca9[_0x4a1b32(0x249)]||_0x1a79f8[_0x4a1b32(0x249)]<=0x1)){_0x53f3e1[_0x4a1b32(0x229)]=_0x5d7ca9;var _0x48e6ae={'functionsNode':!0x0,'props':_0x1a79f8};this[_0x4a1b32(0x223)](_0x48e6ae,_0x41a494),this[_0x4a1b32(0x1e0)](_0x48e6ae,_0x41a494),this[_0x4a1b32(0x2bd)](_0x48e6ae),this['_setNodePermissions'](_0x48e6ae,_0x41a494),_0x48e6ae['id']+='\\x20f',_0x53f3e1[_0x4a1b32(0x229)]['unshift'](_0x48e6ae);}}}[_0x180451(0x291)](_0x5a4de4,_0x378c61){}['_setNodeExpandableState'](_0x53fb3c){}[_0x180451(0x23f)](_0x2c2342){var _0x3708d6=_0x180451;return Array[_0x3708d6(0x299)](_0x2c2342)||typeof _0x2c2342==_0x3708d6(0x2b3)&&this[_0x3708d6(0x21e)](_0x2c2342)==='[object\\x20Array]';}[_0x180451(0x287)](_0x4b676a,_0x45baff){}[_0x180451(0x292)](_0x17a0e1){var _0x3ccdf0=_0x180451;delete _0x17a0e1['_hasSymbolPropertyOnItsPath'],delete _0x17a0e1[_0x3ccdf0(0x265)],delete _0x17a0e1[_0x3ccdf0(0x2ad)];}[_0x180451(0x234)](_0x1a4445,_0x35b488){}}let _0xe8b592=new _0x4370cf(),_0x4c5306={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x3b5b43={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x4ad045(_0x44176d,_0x17d852,_0x1032e5,_0x58f488,_0x566c9b,_0x2e1a7d){var _0x3eae3c=_0x180451;let _0x20c0b6,_0x58836e;try{_0x58836e=_0x12449d(),_0x20c0b6=_0x1fac2a[_0x17d852],!_0x20c0b6||_0x58836e-_0x20c0b6['ts']>0x1f4&&_0x20c0b6[_0x3eae3c(0x282)]&&_0x20c0b6[_0x3eae3c(0x22c)]/_0x20c0b6[_0x3eae3c(0x282)]<0x64?(_0x1fac2a[_0x17d852]=_0x20c0b6={'count':0x0,'time':0x0,'ts':_0x58836e},_0x1fac2a[_0x3eae3c(0x2a2)]={}):_0x58836e-_0x1fac2a[_0x3eae3c(0x2a2)]['ts']>0x32&&_0x1fac2a['hits'][_0x3eae3c(0x282)]&&_0x1fac2a[_0x3eae3c(0x2a2)][_0x3eae3c(0x22c)]/_0x1fac2a['hits'][_0x3eae3c(0x282)]<0x64&&(_0x1fac2a[_0x3eae3c(0x2a2)]={});let _0x407495=[],_0x207013=_0x20c0b6[_0x3eae3c(0x218)]||_0x1fac2a[_0x3eae3c(0x2a2)]['reduceLimits']?_0x3b5b43:_0x4c5306,_0x576857=_0xa82e75=>{var _0x387aa2=_0x3eae3c;let _0x4a3f6d={};return _0x4a3f6d[_0x387aa2(0x229)]=_0xa82e75[_0x387aa2(0x229)],_0x4a3f6d[_0x387aa2(0x1fb)]=_0xa82e75[_0x387aa2(0x1fb)],_0x4a3f6d[_0x387aa2(0x284)]=_0xa82e75[_0x387aa2(0x284)],_0x4a3f6d[_0x387aa2(0x236)]=_0xa82e75[_0x387aa2(0x236)],_0x4a3f6d['autoExpandLimit']=_0xa82e75[_0x387aa2(0x278)],_0x4a3f6d[_0x387aa2(0x206)]=_0xa82e75['autoExpandMaxDepth'],_0x4a3f6d['sortProps']=!0x1,_0x4a3f6d[_0x387aa2(0x1e9)]=!_0x5ecfe2,_0x4a3f6d[_0x387aa2(0x1f4)]=0x1,_0x4a3f6d[_0x387aa2(0x238)]=0x0,_0x4a3f6d[_0x387aa2(0x1f5)]='root_exp_id',_0x4a3f6d[_0x387aa2(0x2a7)]=_0x387aa2(0x1d5),_0x4a3f6d[_0x387aa2(0x244)]=!0x0,_0x4a3f6d['autoExpandPreviousObjects']=[],_0x4a3f6d[_0x387aa2(0x22f)]=0x0,_0x4a3f6d['resolveGetters']=!0x0,_0x4a3f6d['allStrLength']=0x0,_0x4a3f6d[_0x387aa2(0x26a)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x4a3f6d;};for(var _0xae1718=0x0;_0xae1718<_0x566c9b[_0x3eae3c(0x249)];_0xae1718++)_0x407495[_0x3eae3c(0x26d)](_0xe8b592[_0x3eae3c(0x25c)]({'timeNode':_0x44176d==='time'||void 0x0},_0x566c9b[_0xae1718],_0x576857(_0x207013),{}));if(_0x44176d===_0x3eae3c(0x1fd)){let _0x48ed5b=Error[_0x3eae3c(0x21b)];try{Error[_0x3eae3c(0x21b)]=0x1/0x0,_0x407495['push'](_0xe8b592[_0x3eae3c(0x25c)]({'stackNode':!0x0},new Error()['stack'],_0x576857(_0x207013),{'strLength':0x1/0x0}));}finally{Error[_0x3eae3c(0x21b)]=_0x48ed5b;}}return{'method':_0x3eae3c(0x1e8),'version':_0x48a8c3,'args':[{'ts':_0x1032e5,'session':_0x58f488,'args':_0x407495,'id':_0x17d852,'context':_0x2e1a7d}]};}catch(_0x7448a9){return{'method':'log','version':_0x48a8c3,'args':[{'ts':_0x1032e5,'session':_0x58f488,'args':[{'type':'unknown','error':_0x7448a9&&_0x7448a9['message']}],'id':_0x17d852,'context':_0x2e1a7d}]};}finally{try{if(_0x20c0b6&&_0x58836e){let _0x10571a=_0x12449d();_0x20c0b6[_0x3eae3c(0x282)]++,_0x20c0b6[_0x3eae3c(0x22c)]+=_0x423390(_0x58836e,_0x10571a),_0x20c0b6['ts']=_0x10571a,_0x1fac2a['hits'][_0x3eae3c(0x282)]++,_0x1fac2a['hits']['time']+=_0x423390(_0x58836e,_0x10571a),_0x1fac2a[_0x3eae3c(0x2a2)]['ts']=_0x10571a,(_0x20c0b6[_0x3eae3c(0x282)]>0x32||_0x20c0b6['time']>0x64)&&(_0x20c0b6[_0x3eae3c(0x218)]=!0x0),(_0x1fac2a[_0x3eae3c(0x2a2)]['count']>0x3e8||_0x1fac2a[_0x3eae3c(0x2a2)][_0x3eae3c(0x22c)]>0x12c)&&(_0x1fac2a[_0x3eae3c(0x2a2)][_0x3eae3c(0x218)]=!0x0);}}catch{}}}return _0x4ad045;}function _0x42d0(_0x21bc93,_0x3055e6){var _0x287de3=_0x287d();return _0x42d0=function(_0x42d071,_0x5b5660){_0x42d071=_0x42d071-0x1d5;var _0xf68319=_0x287de3[_0x42d071];return _0xf68319;},_0x42d0(_0x21bc93,_0x3055e6);}((_0x56b8af,_0x37299b,_0x300dd9,_0x28edb1,_0x164663,_0x23b8f7,_0x241bfb,_0x368cff,_0x442aa1,_0x36f949,_0x1b9513)=>{var _0x50f5d4=_0x71a422;if(_0x56b8af[_0x50f5d4(0x298)])return _0x56b8af[_0x50f5d4(0x298)];if(!X(_0x56b8af,_0x368cff,_0x164663))return _0x56b8af[_0x50f5d4(0x298)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x56b8af[_0x50f5d4(0x298)];let _0x5a483d=b(_0x56b8af),_0x42d893=_0x5a483d[_0x50f5d4(0x26c)],_0x5245ac=_0x5a483d[_0x50f5d4(0x20d)],_0x7e4936=_0x5a483d[_0x50f5d4(0x28b)],_0x17c92d={'hits':{},'ts':{}},_0x5ed942=H(_0x56b8af,_0x442aa1,_0x17c92d,_0x23b8f7),_0x2cd489=_0x5918fc=>{_0x17c92d['ts'][_0x5918fc]=_0x5245ac();},_0x3ae26a=(_0x2174e4,_0x1eae29)=>{var _0x41ba2d=_0x50f5d4;let _0x2adbcd=_0x17c92d['ts'][_0x1eae29];if(delete _0x17c92d['ts'][_0x1eae29],_0x2adbcd){let _0xbd7cd7=_0x42d893(_0x2adbcd,_0x5245ac());_0x26c7e9(_0x5ed942(_0x41ba2d(0x22c),_0x2174e4,_0x7e4936(),_0x2bc6a2,[_0xbd7cd7],_0x1eae29));}},_0x269384=_0x2d7fb6=>(_0x164663==='next.js'&&_0x56b8af[_0x50f5d4(0x20a)]&&_0x2d7fb6?.[_0x50f5d4(0x22b)]?.['length']&&(_0x2d7fb6[_0x50f5d4(0x22b)][0x0][_0x50f5d4(0x20a)]=_0x56b8af['origin']),_0x2d7fb6);_0x56b8af[_0x50f5d4(0x298)]={'consoleLog':(_0x343f40,_0x1fe2cd)=>{var _0x519be7=_0x50f5d4;_0x56b8af[_0x519be7(0x225)][_0x519be7(0x1e8)]['name']!==_0x519be7(0x245)&&_0x26c7e9(_0x5ed942(_0x519be7(0x1e8),_0x343f40,_0x7e4936(),_0x2bc6a2,_0x1fe2cd));},'consoleTrace':(_0x57c878,_0x1c82f7)=>{var _0x1672e5=_0x50f5d4;_0x56b8af[_0x1672e5(0x225)]['log']['name']!==_0x1672e5(0x27f)&&_0x26c7e9(_0x269384(_0x5ed942(_0x1672e5(0x1fd),_0x57c878,_0x7e4936(),_0x2bc6a2,_0x1c82f7)));},'consoleTime':_0x9aa6c5=>{_0x2cd489(_0x9aa6c5);},'consoleTimeEnd':(_0x4f6d42,_0x10d4ed)=>{_0x3ae26a(_0x10d4ed,_0x4f6d42);},'autoLog':(_0x5ca931,_0x12554a)=>{_0x26c7e9(_0x5ed942('log',_0x12554a,_0x7e4936(),_0x2bc6a2,[_0x5ca931]));},'autoLogMany':(_0x30042d,_0x907286)=>{_0x26c7e9(_0x5ed942('log',_0x30042d,_0x7e4936(),_0x2bc6a2,_0x907286));},'autoTrace':(_0x3e89f1,_0x431b53)=>{var _0x50db82=_0x50f5d4;_0x26c7e9(_0x269384(_0x5ed942(_0x50db82(0x1fd),_0x431b53,_0x7e4936(),_0x2bc6a2,[_0x3e89f1])));},'autoTraceMany':(_0x39f295,_0x304e64)=>{var _0x4c63a3=_0x50f5d4;_0x26c7e9(_0x269384(_0x5ed942(_0x4c63a3(0x1fd),_0x39f295,_0x7e4936(),_0x2bc6a2,_0x304e64)));},'autoTime':(_0x5bc97b,_0x1eca40,_0x26c2ad)=>{_0x2cd489(_0x26c2ad);},'autoTimeEnd':(_0x3c73d1,_0x2ac6e7,_0x22edcf)=>{_0x3ae26a(_0x2ac6e7,_0x22edcf);},'coverage':_0x4ba328=>{var _0x21d466=_0x50f5d4;_0x26c7e9({'method':_0x21d466(0x29b),'version':_0x23b8f7,'args':[{'id':_0x4ba328}]});}};let _0x26c7e9=q(_0x56b8af,_0x37299b,_0x300dd9,_0x28edb1,_0x164663,_0x36f949,_0x1b9513),_0x2bc6a2=_0x56b8af[_0x50f5d4(0x24f)];return _0x56b8af[_0x50f5d4(0x298)];})(globalThis,_0x71a422(0x25b),_0x71a422(0x239),_0x71a422(0x259),_0x71a422(0x1d7),_0x71a422(0x293),'1715593732636',_0x71a422(0x258),'',_0x71a422(0x217),_0x71a422(0x290));");
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

/***/ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/DidNotWorkForAFewHours.jsx":
/*!***********************************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/DidNotWorkForAFewHours.jsx ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-independent-task/components/Button.jsx");
/* harmony import */ var _components_DurationTimer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/DurationTimer */ "./resources/js/react/single-independent-task/components/DurationTimer.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
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







var DidNotWorkForAFewHours = function DidNotWorkForAFewHours(_ref) {
  var id = _ref.id,
    onChecked = _ref.onChecked,
    checked = _ref.checked,
    parentReason = _ref.parentReason,
    onSubmit = _ref.onSubmit,
    isSubmitting = _ref.isSubmitting;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([{
      start: "00:00 AM",
      end: "00:00 AM",
      id: 'de2sew'
    }]),
    _useState2 = _slicedToArray(_useState, 2),
    durations = _useState2[0],
    setDurations = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    comment = _useState4[0],
    setComment = _useState4[1];
  var uniqueId = Math.random().toString(6).slice(2);
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];

  // handle change
  var handleOnChange = function handleOnChange(e) {
    if (e.target.checked) {
      onChecked(id);
    } else {
      onChecked(null);
    }
  };

  // handle editor change
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };
  function onRemove(e, id) {
    e.preventDefault();
    var filtered = durations.filter(function (d) {
      return d.id !== id;
    });
    setDurations(_toConsumableArray(filtered));
  }
  var isValid = function isValid() {
    var errCount = 0;
    var err = new Object();
    if (comment === '') {
      errCount++;
      err.comment = 'Please explain the reason why you came late!';
    }
    setError(err);
    return !errCount;
  };

  // handle submit
  var handleSubmittion = function handleSubmittion(e) {
    e.preventDefault();
    var data = {
      reason_for_less_tracked_hours_a_day_task: parentReason,
      durations: JSON.stringify(durations),
      child_reason: "I didn't work for a few hours in between",
      comment: comment
    };
    if (isValid()) {
      onSubmit(data);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fillup the all required fields!",
        showConfirmButton: true
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "--option-item",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "d-flex align-items-center",
        style: {
          gap: "10px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
          type: "checkbox",
          style: {
            cursor: "pointer"
          },
          checked: checked,
          onChange: handleOnChange
        }), "I didn't work for a few hours in between"]
      }), checked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "pl-3 my-3 bg-white",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
          className: "font-weight-bold",
          children: ["Select an approximate time here. ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
            children: "*"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "col-5 input-group bootstrap-timepicker timepicker d-flex flex-column",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              htmlFor: "",
              className: "d-block",
              children: "From:"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "col-5 input-group bootstrap-timepicker timepicker d-flex flex-column",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              htmlFor: "",
              className: "d-block",
              children: "To"
            })
          })]
        }), durations === null || durations === void 0 ? void 0 : durations.map(function (d) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_DurationTimer__WEBPACK_IMPORTED_MODULE_3__["default"], {
            id: d.id,
            onRemove: onRemove,
            startTime: d.start,
            endTime: d.end,
            durations: durations,
            setDurations: setDurations
          }, d.id);
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
          className: "mt-2 d-flex align-items-center bg-transparent",
          style: {
            gap: "10px"
          },
          onClick: function onClick() {
            setDurations(function (prev) {
              return [].concat(_toConsumableArray(prev), [{
                id: uniqueId,
                start: "00:00 AM",
                end: "00:00 AM"
              }]);
            });
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
            className: "fa-solid fa-circle-plus"
          }), "Add New Time"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "mt-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
            className: "font-weight-bold",
            children: ["Write your comments here.", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
              children: "*"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "ck-editor-holder stop-timer-options",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onChange: handleEditorChange
            })
          }), (error === null || error === void 0 ? void 0 : error.comment) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "f-14",
            style: {
              color: 'red'
            },
            children: error === null || error === void 0 ? void 0 : error.comment
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            variant: "tertiary",
            onClick: function onClick() {
              return onChecked(null);
            },
            className: "ml-auto mr-2",
            children: "Back"
          }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onClick: handleSubmittion,
            className: "",
            children: "Submit"
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "cursor-processing",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "spinner-border text-white",
              role: "status",
              style: {
                width: "18px",
                height: "18px"
              }
            }), "Processing..."]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DidNotWorkForAFewHours);

/***/ }),

/***/ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/LateExplanationOption.jsx":
/*!**********************************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/LateExplanationOption.jsx ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-independent-task/components/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var LateExplainationOption = function LateExplainationOption(_ref) {
  var id = _ref.id,
    onChecked = _ref.onChecked,
    checked = _ref.checked,
    parentReason = _ref.parentReason,
    onSubmit = _ref.onSubmit,
    isSubmitting = _ref.isSubmitting,
    lessTrackDate = _ref.lessTrackDate;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    comment = _useState2[0],
    setComment = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("08:00 AM"),
    _useState4 = _slicedToArray(_useState3, 2),
    duratonStart = _useState4[0],
    setDurationStart = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("05:00 PM"),
    _useState6 = _slicedToArray(_useState5, 2),
    durationEnd = _useState6[0],
    setDurationEnd = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    error = _useState8[0],
    setError = _useState8[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // start time
    window.$("#timepicker1").timepicker("setTime", duratonStart).on("changeTime.timepicker", function (e) {
      setDurationStart(e.target.value);
    });

    // end time
    window.$("#timepicker2").timepicker("setTime", durationEnd).on("changeTime.timepicker", function (e) {
      setDurationEnd(e.target.value);
    });
  }, [checked]);
  var handleOnChange = function handleOnChange(e) {
    if (e.target.checked) {
      onChecked(id);
    } else onChecked(null);
  };

  // handle comment
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };
  var isValid = function isValid() {
    var errCount = 0;
    var err = new Object();
    if (comment === '') {
      errCount++;
      err.comment = 'Please explain the reason why you came late!';
    }
    setError(err);
    return !errCount;
  };

  // handle submission
  var handleSubmittion = function handleSubmittion(e) {
    e.preventDefault();
    var data = {
      reason_for_less_tracked_hours_a_day_task: parentReason,
      child_reason: "I came late",
      durations: JSON.stringify([{
        id: 'de2sew',
        start: duratonStart,
        end: durationEnd
      }]),
      comment: comment
    };
    if (isValid()) {
      onSubmit(data);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fillup the all required fields!",
        showConfirmButton: true
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "--option-item",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "d-flex align-items-center",
        style: {
          gap: "10px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
          type: "checkbox",
          id: "ICameLate",
          style: {
            cursor: "pointer"
          },
          checked: checked,
          onChange: handleOnChange
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
          htmlFor: "ICameLate",
          className: "p-0 m-0",
          children: "I came late"
        })]
      }), checked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "pl-3 my-3 bg-white",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
          className: "font-weight-bold",
          children: ["Select the delay time here ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("sup", {
            children: "*"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "col-6 input-group bootstrap-timepicker timepicker d-flex flex-column",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
              htmlFor: "",
              className: "d-block",
              children: "From:"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
              id: "timepicker1",
              className: "form-control w-100 py-2",
              "data-minute-step": "1",
              "data-modal-backdrop": "false",
              type: "text"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "col-6 input-group bootstrap-timepicker timepicker d-flex flex-column",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
              htmlFor: "",
              className: "d-block",
              children: "To"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
              id: "timepicker2",
              className: "form-control w-100 py-2",
              "data-minute-step": "1",
              "data-modal-backdrop": "false",
              type: "text"
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "mt-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
            className: "font-weight-bold",
            children: ["Explain the reason of being late ", lessTrackDate, " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("sup", {
              children: "*"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "ck-editor-holder stop-timer-options",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onChange: handleEditorChange
            })
          }), (error === null || error === void 0 ? void 0 : error.comment) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "f-14",
            style: {
              color: 'red'
            },
            children: error === null || error === void 0 ? void 0 : error.comment
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            variant: "tertiary",
            onClick: function onClick() {
              return onChecked(null);
            },
            className: "ml-auto mr-2",
            children: "Back"
          }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onClick: handleSubmittion,
            className: "",
            children: "Submit"
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "cursor-processing",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "spinner-border text-white",
              role: "status",
              style: {
                width: "18px",
                height: "18px"
              }
            }), "Processing..."]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LateExplainationOption);

/***/ }),

/***/ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/LeaveExplanationOption.jsx":
/*!***********************************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/LeaveExplanationOption.jsx ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-independent-task/components/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var LeaveExplainationOption = function LeaveExplainationOption(_ref) {
  var id = _ref.id,
    onChecked = _ref.onChecked,
    checked = _ref.checked,
    parentReason = _ref.parentReason,
    onSubmit = _ref.onSubmit,
    isSubmitting = _ref.isSubmitting,
    lessTrackDate = _ref.lessTrackDate;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    leavePeriod = _useState2[0],
    setLeavePeriod = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    comment = _useState4[0],
    setComment = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("08:00 AM"),
    _useState6 = _slicedToArray(_useState5, 2),
    duratonStart = _useState6[0],
    setDurationStart = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("05:00 PM"),
    _useState8 = _slicedToArray(_useState7, 2),
    durationEnd = _useState8[0],
    setDurationEnd = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    error = _useState10[0],
    setError = _useState10[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // start time
    window.$("#timepicker1").timepicker("setTime", duratonStart).on("changeTime.timepicker", function (e) {
      setDurationStart(e.target.value);
    });

    // end time
    window.$("#timepicker2").timepicker("setTime", durationEnd).on("changeTime.timepicker", function (e) {
      setDurationEnd(e.target.value);
      // console.log(e.timeStamp)
    });
  }, [checked]);
  var handleOnChange = function handleOnChange(e) {
    if (e.target.checked) {
      onChecked(id);
    } else onChecked(null);
  };

  // handle comment
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };
  var isValid = function isValid() {
    var errCount = 0;
    var err = new Object();
    if (leavePeriod === '') {
      errCount++;
      err.leavePeriod = "Select the approximate time!";
    }
    if (comment === '') {
      errCount++;
      err.comment = 'Please explain the reason of your leave!';
    }
    setError(err);
    return !errCount;
  };

  // handle submission
  var handleSubmittion = function handleSubmittion(e) {
    e.preventDefault();
    var data = {
      reason_for_less_tracked_hours_a_day_task: parentReason,
      child_reason: "I had half day of leave ".concat(lessTrackDate),
      durations: JSON.stringify([{
        id: 'de2sew',
        start: duratonStart,
        end: durationEnd
      }]),
      comment: comment,
      leave_period: leavePeriod
    };
    if (isValid()) {
      onSubmit(data);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fillup the all required fields!",
        showConfirmButton: true
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "--option-item",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "d-flex align-items-center",
        style: {
          gap: "10px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
          type: "checkbox",
          id: "IHadHalfDayOfLeaveToday",
          style: {
            cursor: "pointer"
          },
          checked: checked,
          onChange: handleOnChange
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
          htmlFor: "IHadHalfDayOfLeaveToday",
          className: "m-0 p-0",
          children: ["I had half day of leave ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("strong", {
            children: lessTrackDate
          })]
        })]
      }), checked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "pl-3 my-3 bg-white",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
          className: "font-weight-bold",
          children: ["Select an approximate time here ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("sup", {
            children: "*"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "d-flex align-items-center",
          style: {
            gap: "10px"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
            htmlFor: "",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
              type: "radio",
              name: "period",
              value: "First Half",
              style: {
                cursor: "pointer"
              },
              onChange: function onChange(e) {
                return setLeavePeriod(e.target.value);
              }
            }), " ", "First Half"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
            htmlFor: "",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
              type: "radio",
              name: "period",
              value: "Second Half",
              style: {
                cursor: "pointer"
              },
              onChange: function onChange(e) {
                return setLeavePeriod(e.target.value);
              }
            }), " ", "Second Half"]
          })]
        }), (error === null || error === void 0 ? void 0 : error.leavePeriod) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "f-14",
          style: {
            color: 'red'
          },
          children: error === null || error === void 0 ? void 0 : error.leavePeriod
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "col-6 input-group bootstrap-timepicker timepicker d-flex flex-column",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
              htmlFor: "",
              className: "d-block",
              children: "From:"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
              id: "timepicker1",
              className: "form-control w-100 py-2",
              "data-minute-step": "1",
              "data-modal-backdrop": "false",
              type: "text"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "col-6 input-group bootstrap-timepicker timepicker d-flex flex-column",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
              htmlFor: "",
              className: "d-block",
              children: "To"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
              id: "timepicker2",
              className: "form-control w-100 py-2",
              "data-minute-step": "1",
              "data-modal-backdrop": "false",
              type: "text"
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "mt-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
            className: "font-weight-bold",
            children: ["Explain the reason of your leave ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("sup", {
              children: "*"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "ck-editor-holder stop-timer-options",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onChange: handleEditorChange
            })
          }), (error === null || error === void 0 ? void 0 : error.comment) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "f-14",
            style: {
              color: 'red'
            },
            children: error === null || error === void 0 ? void 0 : error.comment
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            variant: "tertiary",
            onClick: function onClick() {
              return onChecked(null);
            },
            className: "ml-auto mr-2",
            children: "Back"
          }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onClick: handleSubmittion,
            className: "",
            children: "Submit"
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "cursor-processing",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "spinner-border text-white",
              role: "status",
              style: {
                width: "18px",
                height: "18px"
              }
            }), "Processing..."]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LeaveExplainationOption);

/***/ }),

/***/ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/LeavingEarlyExplainationOption.jsx":
/*!*******************************************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/LeavingEarlyExplainationOption.jsx ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-independent-task/components/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var LeavingEarlyExplainationOption = function LeavingEarlyExplainationOption(_ref) {
  var id = _ref.id,
    onChecked = _ref.onChecked,
    checked = _ref.checked,
    parentReason = _ref.parentReason,
    onSubmit = _ref.onSubmit,
    isSubmitting = _ref.isSubmitting,
    lessTrackDate = _ref.lessTrackDate;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    comment = _useState2[0],
    setComment = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("08:00 AM"),
    _useState4 = _slicedToArray(_useState3, 2),
    duratonStart = _useState4[0],
    setDurationStart = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("05:00 PM"),
    _useState6 = _slicedToArray(_useState5, 2),
    durationEnd = _useState6[0],
    setDurationEnd = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    error = _useState8[0],
    setError = _useState8[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // start time
    window.$("#timepicker1").timepicker("setTime", duratonStart).on("changeTime.timepicker", function (e) {
      setDurationStart(e.target.value);
    });

    // end time
    window.$("#timepicker2").timepicker("setTime", durationEnd).on("changeTime.timepicker", function (e) {
      setDurationEnd(e.target.value);
    });
  }, [checked]);
  var handleOnChange = function handleOnChange(e) {
    if (e.target.checked) {
      onChecked(id);
    } else onChecked(null);
  };

  // handle comment
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };
  var isValid = function isValid() {
    var errCount = 0;
    var err = new Object();
    if (comment === '') {
      errCount++;
      err.comment = 'Please explain the reason why you came late!';
    }
    setError(err);
    return !errCount;
  };

  // handle submission
  var handleSubmittion = function handleSubmittion(e) {
    e.preventDefault();
    var data = {
      reason_for_less_tracked_hours_a_day_task: parentReason,
      child_reason: "I am leaving early",
      durations: JSON.stringify([{
        id: 'de2sew',
        start: duratonStart,
        end: durationEnd
      }]),
      comment: comment
    };
    if (isValid()) {
      onSubmit(data);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fillup the all required fields!",
        showConfirmButton: true
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "--option-item",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "d-flex align-items-center",
        style: {
          gap: "10px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
          type: "checkbox",
          id: "IAmLeavingEarly",
          style: {
            cursor: "pointer"
          },
          checked: checked,
          onChange: handleOnChange
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
          htmlFor: "IAmLeavingEarly",
          className: "m-0 p-0",
          children: "I am leaving early"
        })]
      }), checked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "pl-3 my-3 bg-white",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
          className: "font-weight-bold",
          children: ["Select the time here ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("sup", {
            children: "*"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "col-6 input-group bootstrap-timepicker timepicker d-flex flex-column",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
              htmlFor: "",
              className: "d-block",
              children: "From:"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
              id: "timepicker1",
              className: "form-control w-100 py-2",
              "data-minute-step": "1",
              "data-modal-backdrop": "false",
              type: "text"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "col-6 input-group bootstrap-timepicker timepicker d-flex flex-column",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
              htmlFor: "",
              className: "d-block",
              children: "To"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
              id: "timepicker2",
              className: "form-control w-100 py-2",
              "data-minute-step": "1",
              "data-modal-backdrop": "false",
              type: "text"
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "mt-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
            className: "font-weight-bold",
            children: ["Explain the reason why you are leaving early on ", lessTrackDate, " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("sup", {
              children: "*"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "ck-editor-holder stop-timer-options",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onChange: handleEditorChange
            })
          }), (error === null || error === void 0 ? void 0 : error.comment) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "f-14",
            style: {
              color: 'red'
            },
            children: error === null || error === void 0 ? void 0 : error.comment
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            variant: "tertiary",
            onClick: function onClick() {
              return onChecked(null);
            },
            className: "ml-auto mr-2",
            children: "Back"
          }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onClick: handleSubmittion,
            className: "",
            children: "Submit"
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "cursor-processing",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "spinner-border text-white",
              role: "status",
              style: {
                width: "18px",
                height: "18px"
              }
            }), "Processing..."]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LeavingEarlyExplainationOption);

/***/ }),

/***/ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionFive.jsx":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionFive.jsx ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-independent-task/components/Button.jsx");
/* harmony import */ var _components_DurationTimer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/DurationTimer */ "./resources/js/react/single-independent-task/components/DurationTimer.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
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






var DeveloperTaskSelectionMenu = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_single-independent-task_section_task-actions_stop-timer_options_DevloperTa-ba6ff7").then(__webpack_require__.bind(__webpack_require__, /*! ./DevloperTaskSelectionMenu */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/DevloperTaskSelectionMenu.jsx"));
});
var OptionFive = function OptionFive(_ref) {
  var id = _ref.id,
    onChecked = _ref.onChecked,
    checked = _ref.checked,
    onSubmit = _ref.onSubmit,
    isSubmitting = _ref.isSubmitting;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    task = _useState2[0],
    setTask = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([{
      start: "00:00 AM",
      end: "00:00 AM",
      id: "de2sew"
    }]),
    _useState4 = _slicedToArray(_useState3, 2),
    durations = _useState4[0],
    setDurations = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  var uniqueId = Math.random().toString(6).slice(2);

  // handle input change
  var handleOnChange = function handleOnChange(e) {
    e.target.checked ? onChecked(id) : onChecked(null);
  };
  function onRemove(e, id) {
    e.preventDefault();
    var filtered = durations.filter(function (d) {
      return d.id !== id;
    });
    setDurations(_toConsumableArray(filtered));
  }
  var isValid = function isValid() {
    var errCount = 0;
    var err = new Object();
    if (!task) {
      err.task = "Select the task you forgot to track hours!";
      errCount++;
    }
    setError(err);
    return !errCount;
  };
  // handle submittion
  var handleSubmittion = function handleSubmittion() {
    var data = {
      reason_for_less_tracked_hours_a_day_task: 'I forgot to track hours.',
      forgot_to_track_task_id: task === null || task === void 0 ? void 0 : task.id,
      durations: JSON.stringify(durations)
    };
    if (isValid()) {
      onSubmit(data);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fillup the all required fields!",
        showConfirmButton: true
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: checked ? "--option-item mt-3" : "--option-item",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "d-flex align-items-center",
        style: {
          gap: "10px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
          type: "checkbox",
          style: {
            cursor: "pointer"
          },
          checked: checked,
          onChange: handleOnChange
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: checked ? "font-weight-bold" : "",
          children: "I forgot to track hours."
        })]
      }), checked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "pl-3 my-3 bg-white",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "mt-3 mb-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "mb-1 text-dark",
            children: "Select the task you forgot to track hours"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "position-relative",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
              fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "w-100 bg-white py-2 pl-2 pr-1 mb-3 border d-flex align-items-center justify-content-between",
                children: "Loading..."
              }),
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(DeveloperTaskSelectionMenu, {
                task: task,
                setTask: setTask
              })
            })
          }), (error === null || error === void 0 ? void 0 : error.task) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "f-14",
            style: {
              color: 'red'
            },
            children: error === null || error === void 0 ? void 0 : error.task
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "w-100 pb-2",
            children: "Select an approximate time here"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "row",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "col-5 input-group bootstrap-timepicker timepicker d-flex flex-column",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
                htmlFor: "",
                className: "d-block",
                children: "From:"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "col-5 input-group bootstrap-timepicker timepicker d-flex flex-column",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
                htmlFor: "",
                className: "d-block",
                children: "To"
              })
            })]
          }), durations === null || durations === void 0 ? void 0 : durations.map(function (d) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_DurationTimer__WEBPACK_IMPORTED_MODULE_2__["default"], {
              id: d.id,
              onRemove: onRemove,
              startTime: d.start,
              endTime: d.end,
              durations: durations,
              setDurations: setDurations
            }, d.id);
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
            className: "mt-2 d-flex align-items-center bg-transparent",
            style: {
              gap: "10px"
            },
            onClick: function onClick() {
              setDurations(function (prev) {
                return [].concat(_toConsumableArray(prev), [{
                  id: uniqueId,
                  start: "00:00 AM",
                  end: "00:00 AM"
                }]);
              });
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
              className: "fa-solid fa-circle-plus"
            }), "Add New Time"]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
            variant: "tertiary",
            onClick: function onClick() {
              return onChecked(null);
            },
            className: "ml-auto mr-2",
            children: "Back"
          }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
            onClick: handleSubmittion,
            className: "",
            children: "Submit"
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
            className: "cursor-processing",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "spinner-border text-white",
              role: "status",
              style: {
                width: "18px",
                height: "18px"
              }
            }), "Processing..."]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OptionFive);

/***/ }),

/***/ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionFour.jsx":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionFour.jsx ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-independent-task/components/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var ProjectSelectionList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_single-independent-task_section_task-actions_stop-timer_options_ProjectSel-35ef76").then(__webpack_require__.bind(__webpack_require__, /*! ./ProjectSelectionList */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/ProjectSelectionList.jsx"));
});
var UserSelectionList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_single-independent-task_section_task-actions_stop-timer_options_UserSelect-e9d5b6").then(__webpack_require__.bind(__webpack_require__, /*! ./UserSelectionList */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/UserSelectionList.jsx"));
});
var OptionFour = function OptionFour(_ref) {
  var _window;
  var id = _ref.id,
    onChecked = _ref.onChecked,
    checked = _ref.checked,
    onSubmit = _ref.onSubmit,
    isSubmitting = _ref.isSubmitting;
  // form data
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    person = _useState2[0],
    setPerson = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    client = _useState4[0],
    setClient = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    project = _useState6[0],
    setProject = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    responsible = _useState8[0],
    setResponsible = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState10 = _slicedToArray(_useState9, 2),
    task = _useState10[0],
    setTask = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(undefined),
    _useState12 = _slicedToArray(_useState11, 2),
    isSystemGlitch = _useState12[0],
    setIsSystemGlitch = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(undefined),
    _useState14 = _slicedToArray(_useState13, 2),
    isOutsideERP = _useState14[0],
    setIsOutsideERP = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState16 = _slicedToArray(_useState15, 2),
    comment = _useState16[0],
    setComment = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("08:00 AM"),
    _useState18 = _slicedToArray(_useState17, 2),
    durationStart = _useState18[0],
    setDurationStart = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("05:00 PM"),
    _useState20 = _slicedToArray(_useState19, 2),
    durationEnd = _useState20[0],
    setDurationEnd = _useState20[1];
  // end form data

  var loggedUser = new _utils_user_details__WEBPACK_IMPORTED_MODULE_2__.User((_window = window) === null || _window === void 0 || (_window = _window.Laravel) === null || _window === void 0 ? void 0 : _window.user);
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState22 = _slicedToArray(_useState21, 2),
    error = _useState22[0],
    setError = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState24 = _slicedToArray(_useState23, 2),
    activeResponsiblePersonDropdown = _useState24[0],
    setActiveResponsiblePersonDropdown = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState26 = _slicedToArray(_useState25, 2),
    activeProjectDropdown = _useState26[0],
    setActiveProjectDropdown = _useState26[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    // start time
    window.$("#timepicker1").timepicker("setTime", durationStart).on("changeTime.timepicker", function (e) {
      setDurationStart(e.target.value);
    });

    // end time
    window.$("#timepicker2").timepicker("setTime", durationEnd).on("changeTime.timepicker", function (e) {
      setDurationEnd(e.target.value);
    });
  }, [checked]);
  var handleOnChange = function handleOnChange(e) {
    if (e.target.checked) {
      onChecked(id);
    } else {
      onChecked(null);
      setPerson(null);
      setProject(null);
      setIsOutsideERP(undefined);
      setIsSystemGlitch(undefined);
      setComment('');
      setError(null);
    }
    ;
  };

  // handle comment
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };

  // handle responsible person
  var handleResponsiblePersonMySelf = function handleResponsiblePersonMySelf() {
    setPerson({
      id: loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.id,
      name: loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.name,
      image_url: loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.getAvatar()
    });
    setActiveResponsiblePersonDropdown(false);
    setIsSystemGlitch(false);
    setIsOutsideERP(false);
  };

  // validation
  var isVaild = function isVaild() {
    var errCount = 0;
    var err = new Object();
    if (comment === '') {
      err.comment = "Please explain the reason!";
      errCount++;
    }
    if (isOutsideERP === undefined && isSystemGlitch === undefined && !person) {
      err.reason = "Please selected responsible person/system!";
      errCount++;
    }
    if (activeResponsiblePersonDropdown && !person && !client) {
      err.responsiblePerson = "Please select who is responsible!";
      errCount++;
    }

    // if(!isOutsideERP && !project){
    //     err.project = "You have to pick an option.";
    //     errCount++;
    // }
    if (activeProjectDropdown && !project) {
      err.project = "You have to pick an option.";
      errCount++;
    }
    setError(err);
    return !errCount;
  };

  // handle submission
  var handleSubmittion = function handleSubmittion(e) {
    var _person$id;
    e.preventDefault();
    var data = {
      reason_for_less_tracked_hours_a_day_task: "I couldn't log hours.",
      durations: JSON.stringify([{
        id: 'de2sew',
        start: durationStart,
        end: durationEnd
      }]),
      comment: comment,
      responsible_person: isSystemGlitch ? 'Systems technical glitch' : isOutsideERP ? 'Outside ERP Project' : (loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.getId()) === Number(person === null || person === void 0 ? void 0 : person.id) ? "Due to MySelf" : "Due to Another Person",
      responsible_person_id: (_person$id = person === null || person === void 0 ? void 0 : person.id) !== null && _person$id !== void 0 ? _person$id : null,
      related_to_any_project: project ? "yes" : "no",
      project_id: project ? project.id : project,
      responsible: responsible,
      client: client
    };
    if (isVaild()) {
      onSubmit(data);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fillup the all required fields!",
        showConfirmButton: true
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "--option-item",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "d-flex align-items-center",
        style: {
          gap: "10px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
          type: "checkbox",
          style: {
            cursor: "pointer"
          },
          checked: checked,
          onChange: handleOnChange
        }), "I couldn't log hours."]
      }), checked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "pl-3 my-3 bg-white",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "mt-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
            className: "font-weight-bold",
            children: ["Explain the reason here ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
              children: "*"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "ck-editor-holder stop-timer-options",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onChange: handleEditorChange
            })
          }), (error === null || error === void 0 ? void 0 : error.comment) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "f-14",
            style: {
              color: 'red'
            },
            children: error === null || error === void 0 ? void 0 : error.comment
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "mt-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "mb-2 font-weight-bold",
            children: ["Select The Reason ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
              style: {
                color: 'red'
              },
              children: "*"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "d-flex flex-wrap align-items-center w-100",
            style: {
              gap: "10px"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
              htmlFor: "due-to-myself",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "radio",
                id: "due-to-myself",
                value: "Due to myself",
                name: "responsive-person",
                onChange: function onChange(e) {
                  handleResponsiblePersonMySelf(e);
                  setResponsible(e.target.value);
                }
              }), " ", "Due to myself"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
              htmlFor: "due-to-another-person",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "radio",
                id: "due-to-another-person",
                value: "Due to another person",
                name: "responsive-person",
                onChange: function onChange(e) {
                  setActiveResponsiblePersonDropdown(e.target.checked);
                  setPerson(null);
                  setIsSystemGlitch(false);
                  setIsOutsideERP(false);
                  setResponsible(e.target.value);
                }
              }), " ", "Due to another person"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
              htmlFor: "system-technical-glich",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "radio",
                id: "system-technical-glich",
                value: "Systems technical glitch",
                name: "responsive-person",
                onChange: function onChange(e) {
                  setIsSystemGlitch(true);
                  setIsOutsideERP(false);
                  setActiveResponsiblePersonDropdown(false);
                  setPerson(null);
                  setResponsible(e.target.value);
                }
              }), " ", "Systems technical glitch"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
              htmlFor: "outside-erp-project",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                type: "radio",
                id: "outside-erp-project",
                value: "Outside ERP project",
                name: "responsive-person",
                onChange: function onChange(e) {
                  setIsOutsideERP(true);
                  setIsSystemGlitch(false);
                  setActiveResponsiblePersonDropdown(e.target.checked);
                  setPerson(null);
                  setResponsible(e.target.value);
                }
              }), " ", "Outside ERP project"]
            })]
          }), (error === null || error === void 0 ? void 0 : error.reason) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "f-14",
            style: {
              color: 'red'
            },
            children: error === null || error === void 0 ? void 0 : error.reason
          })]
        }), activeResponsiblePersonDropdown && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
            htmlFor: "",
            children: "Select the person due to whom you couldn't log hours"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
            fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "w-100 bg-white py-2 pl-2 pr-1 mb-3 border d-flex align-items-center justify-content-between",
              children: "Loading..."
            }),
            children: isOutsideERP ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
              value: client,
              onChange: function onChange(e) {
                return setClient(e.target.value);
              },
              className: "w-100 bg-white py-2 pl-2 pr-1 border d-flex align-items-center justify-content-between"
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(UserSelectionList, {
              person: person,
              setPerson: setPerson,
              filter: ""
            })
          }), (error === null || error === void 0 ? void 0 : error.responsiblePerson) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "f-14",
            style: {
              color: 'red'
            },
            children: error === null || error === void 0 ? void 0 : error.responsiblePerson
          })]
        }), !isOutsideERP && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "mt-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "mb-2 font-weight-bold",
              children: ["Was This Related To Any Project? ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
                style: {
                  color: 'red'
                },
                children: "*"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "d-flex align-items-center w-100",
              style: {
                gap: "10px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
                htmlFor: "yes",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                  type: "radio",
                  id: "yes",
                  value: "Yes",
                  name: "relative-project",
                  onChange: function onChange(e) {
                    setActiveProjectDropdown(e.target.checked);
                  }
                }), " ", "Yes"]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("label", {
                htmlFor: "no",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                  type: "radio",
                  id: "no",
                  value: "No",
                  name: "relative-project",
                  onChange: function onChange(e) {
                    setActiveProjectDropdown(false);
                  }
                }), " ", "No"]
              })]
            }), (error === null || error === void 0 ? void 0 : error.project) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "f-14",
              style: {
                color: 'red'
              },
              children: error === null || error === void 0 ? void 0 : error.project
            })]
          }), activeProjectDropdown && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              htmlFor: "",
              children: "Select the project"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
              fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "w-100 bg-white py-2 pl-2 pr-1 mb-3 border d-flex align-items-center justify-content-between",
                children: "Loading..."
              }),
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ProjectSelectionList, {
                project: project,
                setProject: setProject
              })
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
            htmlFor: "",
            className: "mt-3 font-weight-bold",
            children: "Select an approximate time here"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "row",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "col-6 input-group bootstrap-timepicker timepicker d-flex flex-column",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                htmlFor: "",
                className: "d-block",
                children: " From: "
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                id: "timepicker1",
                className: "form-control w-100 py-2",
                "data-minute-step": "1",
                "data-modal-backdrop": "false",
                type: "text"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "col-6 input-group bootstrap-timepicker timepicker d-flex flex-column",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                htmlFor: "",
                className: "d-block",
                children: "To:  "
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
                id: "timepicker2",
                className: "form-control w-100 py-2",
                "data-minute-step": "1",
                "data-modal-backdrop": "false",
                type: "text"
              })]
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
            variant: "tertiary",
            onClick: function onClick() {
              return onChecked(null);
            },
            className: "ml-auto mr-2",
            children: "Back"
          }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
            onClick: handleSubmittion,
            className: "",
            children: "Submit"
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
            className: "cursor-processing",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "spinner-border text-white",
              role: "status",
              style: {
                width: "18px",
                height: "18px"
              }
            }), "Processing..."]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OptionFour);

/***/ }),

/***/ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionOne.jsx":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionOne.jsx ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-independent-task/components/Button.jsx");
/* harmony import */ var _components_DurationTimer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/DurationTimer */ "./resources/js/react/single-independent-task/components/DurationTimer.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
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





// option one



var OptionOne = function OptionOne(_ref) {
  var id = _ref.id,
    onChecked = _ref.onChecked,
    checked = _ref.checked,
    onSubmit = _ref.onSubmit,
    isSubmitting = _ref.isSubmitting;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([{
      start: "00:00 AM",
      end: "00:00 AM",
      id: 'de2sew'
    }]),
    _useState2 = _slicedToArray(_useState, 2),
    durations = _useState2[0],
    setDurations = _useState2[1];
  var uniqueId = Math.random().toString(6).slice(2);
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    error = _useState4[0],
    setError = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    comment = _useState6[0],
    setComment = _useState6[1];

  // handle change
  var handleOnChange = function handleOnChange(e) {
    if (e.target.checked) {
      onChecked(id);
    } else {
      onChecked(null);
    }
  };
  function onRemove(e, id) {
    e.preventDefault();
    var filtered = durations.filter(function (d) {
      return d.id !== id;
    });
    setDurations(_toConsumableArray(filtered));
  }

  // handle editor change
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };

  // handle submit
  var handleSubmittion = function handleSubmittion(e) {
    e.preventDefault();
    var data = {
      reason_for_less_tracked_hours_a_day_task: "I did not have enough work to do.",
      durations: JSON.stringify(durations),
      comment: comment
    };
    if (comment === '') {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fillup the all required fields!",
        showConfirmButton: true
      });
      return setError({
        comment: 'Please explaine the reason here!'
      });
    }
    onSubmit(data);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "--option-item",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "d-flex align-items-center",
        style: {
          gap: "10px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
          type: "checkbox",
          style: {
            cursor: "pointer"
          },
          checked: checked,
          onChange: handleOnChange
        }), "I did not have enough work to do."]
      }), checked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "pl-3 my-3 bg-white",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "col-5 input-group bootstrap-timepicker timepicker d-flex flex-column",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              htmlFor: "",
              className: "d-block",
              children: "From:"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "col-5 input-group bootstrap-timepicker timepicker d-flex flex-column",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              htmlFor: "",
              className: "d-block",
              children: "To"
            })
          })]
        }), durations === null || durations === void 0 ? void 0 : durations.map(function (d) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_DurationTimer__WEBPACK_IMPORTED_MODULE_3__["default"], {
            id: d.id,
            onRemove: onRemove,
            startTime: d.start,
            endTime: d.end,
            durations: durations,
            setDurations: setDurations
          }, d.id);
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
          className: "mt-2 d-flex align-items-center bg-transparent",
          style: {
            gap: "10px"
          },
          onClick: function onClick() {
            setDurations(function (prev) {
              return [].concat(_toConsumableArray(prev), [{
                id: uniqueId,
                start: "00:00 AM",
                end: "00:00 AM"
              }]);
            });
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
            className: "fa-solid fa-circle-plus"
          }), "Add New Time"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "mt-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h6", {
            children: "Write your comments here."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "ck-editor-holder stop-timer-options",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onChange: handleEditorChange
            })
          }), (error === null || error === void 0 ? void 0 : error.comment) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "f-14",
            style: {
              color: 'red'
            },
            children: error === null || error === void 0 ? void 0 : error.comment
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            variant: "tertiary",
            onClick: function onClick() {
              return onChecked(null);
            },
            className: "ml-auto mr-2",
            children: "Back"
          }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onClick: handleSubmittion,
            className: "",
            children: "Submit"
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "cursor-processing",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "spinner-border text-white",
              role: "status",
              style: {
                width: "18px",
                height: "18px"
              }
            }), "Processing..."]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OptionOne);

/***/ }),

/***/ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionSix.jsx":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionSix.jsx ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-independent-task/components/Button.jsx");
/* harmony import */ var _components_DurationTimer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/DurationTimer */ "./resources/js/react/single-independent-task/components/DurationTimer.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
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





// option one



var OptionSix = function OptionSix(_ref) {
  var id = _ref.id,
    onChecked = _ref.onChecked,
    checked = _ref.checked,
    onSubmit = _ref.onSubmit,
    isSubmitting = _ref.isSubmitting;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([{
      start: "00:00 AM",
      end: "00:00 AM",
      id: 'de2sew'
    }]),
    _useState2 = _slicedToArray(_useState, 2),
    durations = _useState2[0],
    setDurations = _useState2[1];
  var uniqueId = Math.random().toString(6).slice(2);
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    comment = _useState4[0],
    setComment = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];

  // handle change
  var handleOnChange = function handleOnChange(e) {
    if (e.target.checked) {
      onChecked(id);
    } else {
      onChecked(null);
    }
  };
  function onRemove(e, id) {
    e.preventDefault();
    var filtered = durations.filter(function (d) {
      return d.id !== id;
    });
    setDurations(_toConsumableArray(filtered));
  }

  // handle editor change
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };
  var isValid = function isValid() {
    var errCount = 0;
    var err = new Object();
    if (comment === '') {
      err.comment = 'Please explaine the reason here!';
      errCount++;
    }
    setError(err);
    return !errCount;
  };
  // handle submit
  var handleSubmittion = function handleSubmittion(e) {
    e.preventDefault();
    var data = {
      reason_for_less_tracked_hours_a_day_task: "In the morning, I had to wait for work before I could start.",
      durations: JSON.stringify(durations),
      comment: comment
    };
    if (isValid()) {
      onSubmit(data);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fillup the all required fields!",
        showConfirmButton: true
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "--option-item",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "d-flex align-items-center",
        style: {
          gap: "10px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
          type: "checkbox",
          style: {
            cursor: "pointer"
          },
          checked: checked,
          onChange: handleOnChange
        }), "In the morning, I had to wait for work before I could start."]
      }), checked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "pl-3 my-3 bg-white",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "row",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "col-5 input-group bootstrap-timepicker timepicker d-flex flex-column",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              htmlFor: "",
              className: "d-block",
              children: "From:"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "col-5 input-group bootstrap-timepicker timepicker d-flex flex-column",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              htmlFor: "",
              className: "d-block",
              children: "To"
            })
          })]
        }), durations === null || durations === void 0 ? void 0 : durations.map(function (d) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_DurationTimer__WEBPACK_IMPORTED_MODULE_3__["default"], {
            id: d.id,
            onRemove: onRemove,
            startTime: d.start,
            endTime: d.end,
            durations: durations,
            setDurations: setDurations
          }, d.id);
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
          className: "mt-2 d-flex align-items-center bg-transparent",
          style: {
            gap: "10px"
          },
          onClick: function onClick() {
            setDurations(function (prev) {
              return [].concat(_toConsumableArray(prev), [{
                id: uniqueId,
                start: "00:00 AM",
                end: "00:00 AM"
              }]);
            });
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
            className: "fa-solid fa-circle-plus"
          }), "Add New Time"]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "mt-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h6", {
            children: "Write your comments here."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "ck-editor-holder stop-timer-options",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onChange: handleEditorChange
            })
          }), (error === null || error === void 0 ? void 0 : error.comment) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "f-14",
            style: {
              color: 'red'
            },
            children: error === null || error === void 0 ? void 0 : error.comment
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            variant: "tertiary",
            onClick: function onClick() {
              return onChecked(null);
            },
            className: "ml-auto mr-2",
            children: "Back"
          }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onClick: handleSubmittion,
            className: "",
            children: "Submit"
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "cursor-processing",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "spinner-border text-white",
              role: "status",
              style: {
                width: "18px",
                height: "18px"
              }
            }), "Processing..."]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OptionSix);

/***/ }),

/***/ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionThree.jsx":
/*!************************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionThree.jsx ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LeaveExplanationOption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LeaveExplanationOption */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/LeaveExplanationOption.jsx");
/* harmony import */ var _LateExplanationOption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LateExplanationOption */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/LateExplanationOption.jsx");
/* harmony import */ var _LeavingEarlyExplainationOption__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LeavingEarlyExplainationOption */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/LeavingEarlyExplainationOption.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-independent-task/components/Button.jsx");
/* harmony import */ var _DidNotWorkForAFewHours__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DidNotWorkForAFewHours */ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/DidNotWorkForAFewHours.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var OptionThree = function OptionThree(_ref) {
  var id = _ref.id,
    onChecked = _ref.onChecked,
    checked = _ref.checked,
    onSubmit = _ref.onSubmit,
    isSubmitting = _ref.isSubmitting;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    selectedOption = _useState2[0],
    setSelectedOption = _useState2[1];
  var _checked = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return checked;
  }, [checked]);
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useSelector)(function (s) {
      return s.subTask;
    }),
    lessTrackDate = _useSelector.lessTrackDate;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (_checked) {
      window.$("#timepicker1").timepicker();
      window.$("#timepicker2").timepicker();
    }
  }, [_checked]);
  var handleOnChange = function handleOnChange(e) {
    if (e.target.checked) {
      onChecked(id);
    } else onChecked(null);
  };
  var parentReason = "I was present less hours at work ".concat(lessTrackDate, " ");
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      className: checked ? "--option-item mt-3" : "--option-item",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "d-flex align-items-center",
        style: {
          gap: "10px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("input", {
          type: "checkbox",
          style: {
            cursor: "pointer"
          },
          checked: checked,
          onChange: handleOnChange
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("span", {
          className: checked ? "font-weight-bold" : "",
          children: ["I was present less hours at work ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("strong", {
            children: [" ", lessTrackDate, " "]
          })]
        })]
      }), checked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "d-flex flex-column pl-4 mt-2",
        style: {
          gap: "10px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_LeaveExplanationOption__WEBPACK_IMPORTED_MODULE_1__["default"], {
          id: "half-leave-option",
          onChecked: setSelectedOption,
          onSubmit: onSubmit,
          isSubmitting: isSubmitting,
          checked: selectedOption === "half-leave-option",
          parentReason: parentReason,
          lessTrackDate: lessTrackDate
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_LateExplanationOption__WEBPACK_IMPORTED_MODULE_2__["default"], {
          id: "late-option",
          onChecked: setSelectedOption,
          onSubmit: onSubmit,
          isSubmitting: isSubmitting,
          checked: selectedOption === "late-option",
          parentReason: parentReason,
          lessTrackDate: lessTrackDate
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_LeavingEarlyExplainationOption__WEBPACK_IMPORTED_MODULE_3__["default"], {
          id: "leaving-early-option",
          onChecked: setSelectedOption,
          onSubmit: onSubmit,
          isSubmitting: isSubmitting,
          checked: selectedOption === "leaving-early-option",
          parentReason: parentReason,
          lessTrackDate: lessTrackDate
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_DidNotWorkForAFewHours__WEBPACK_IMPORTED_MODULE_5__["default"], {
          id: "did-not-work-few-hours",
          onChecked: setSelectedOption,
          onSubmit: onSubmit,
          isSubmitting: isSubmitting,
          checked: selectedOption === "did-not-work-few-hours",
          parentReason: parentReason,
          lessTrackDate: lessTrackDate
        })]
      }), checked && !selectedOption && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
        className: "mt-3 d-flex align-items-center",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
          variant: "tertiary",
          onClick: function onClick() {
            return onChecked(null);
          },
          className: "ml-auto",
          children: "Back"
        })
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OptionThree);

/***/ }),

/***/ "./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionTwo.jsx":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/task-actions/stop-timer/options/OptionTwo.jsx ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-independent-task/components/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var OptionTwo = function OptionTwo(_ref) {
  var id = _ref.id,
    onChecked = _ref.onChecked,
    checked = _ref.checked,
    onSubmit = _ref.onSubmit,
    isSubmitting = _ref.isSubmitting;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    transitionHours = _useState2[0],
    setTransitionHours = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    transitionMinutes = _useState4[0],
    setTransitionMinutes = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    comment = _useState6[0],
    setComment = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    error = _useState8[0],
    setError = _useState8[1];
  var handleOnChange = function handleOnChange(e) {
    if (e.target.checked) {
      onChecked(id);
    } else onChecked(null);
  };

  // handle comment
  var handleEditorChange = function handleEditorChange(e, editor) {
    var data = editor.getData();
    setComment(data);
  };
  var isValid = function isValid() {
    var errCount = 0;
    var err = new Object();
    if (comment === '') {
      err.comment = 'Please explaine the reason here..';
      errCount++;
    }
    if (Number(transitionHours) + Number(transitionMinutes) === 0) {
      err.transition = "Write approximate time here!";
      errCount++;
    }
    setError(err);
    return !errCount;
  };

  // handle submission
  var handleSubmission = function handleSubmission(e) {
    e.preventDefault();
    var data = {
      reason_for_less_tracked_hours_a_day_task: "During transition from one task to another, I had to wait for a while.",
      transition_hours: Number(transitionHours),
      transition_minutes: Number(transitionMinutes),
      comment: comment
    };
    if (isValid()) {
      onSubmit(data);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fillup the all required fields!",
        showConfirmButton: true
      });
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "--option-item",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "d-flex align-items-start",
        style: {
          gap: "10px"
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
          type: "checkbox",
          style: {
            cursor: "pointer",
            marginTop: "3px"
          },
          checked: checked,
          onChange: handleOnChange
        }), "During transition from one task to another, I had to wait for a while."]
      }), checked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "pl-3 my-3 bg-white",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "mt-2 mb-2 font-weight-bold",
            children: "Enter an approximate time here:"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "row",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              className: "col-6 input-group bootstrap-timepicker timepicker d-flex flex-column",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
                htmlFor: "transitionHours",
                className: "d-block",
                children: [" ", "Hours", " "]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
                id: "transitionHours",
                className: "form-control w-100 py-2",
                type: "number",
                value: transitionHours,
                onChange: function onChange(e) {
                  return setTransitionHours(e.target.value);
                }
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              className: "col-6 input-group bootstrap-timepicker timepicker d-flex flex-column",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
                htmlFor: "transitionMinutes",
                className: "d-block",
                children: [" ", "Minutes", " "]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
                id: "transitionMinutes",
                className: "form-control w-100 py-2",
                type: "number",
                value: transitionMinutes,
                onChange: function onChange(e) {
                  return setTransitionMinutes(e.target.value);
                }
              })]
            })]
          }), (error === null || error === void 0 ? void 0 : error.transition) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "f-14",
            style: {
              color: 'red'
            },
            children: error === null || error === void 0 ? void 0 : error.transition
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "mt-3",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h6", {
            children: "Write your comments here."
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "ck-editor-holder stop-timer-options",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onChange: handleEditorChange
            })
          }), (error === null || error === void 0 ? void 0 : error.comment) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "f-14",
            style: {
              color: 'red'
            },
            children: error === null || error === void 0 ? void 0 : error.comment
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "mt-3 d-flex align-items-center",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            variant: "tertiary",
            onClick: function onClick() {
              return onChecked(null);
            },
            className: "ml-auto mr-2",
            children: "Back"
          }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            onClick: handleSubmission,
            className: "",
            children: "Submit"
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
            className: "cursor-processing",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "spinner-border text-white",
              role: "status",
              style: {
                width: "18px",
                height: "18px"
              }
            }), "Processing..."]
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OptionTwo);

/***/ })

}]);
//# sourceMappingURL=resources_js_react_single-independent-task_section_task-actions_stop-timer_StopTimerConfrimat-79c866.js.map