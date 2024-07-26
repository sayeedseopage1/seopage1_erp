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
      return console.log(err);
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
<<<<<<< HEAD
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */
;
function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';function _0x3c8e(){var _0x5eeb9b=['enumerable','data','_connected','_dateToString','node','_console_ninja','stringify','setter','_p_name','close','versions','1','2246YTkSzy','unknown','Map','logger\\x20websocket\\x20error','replace','_isSet','message','default','_webSocketErrorDocsLink','[object\\x20Date]','isExpressionToEvaluate','_setNodePermissions','index','1235','name','hits','undefined','expId','array','_addLoadNode','_p_','forEach','disabledTrace','push','_reconnectTimeout','location','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','_console_ninja_session','trace','_hasMapOnItsPath','\\x20browser','nodeModules','Number','1720499754064','Buffer','process','warn','origin','_property','_treeNodePropertiesBeforeFullValue','cappedElements','Boolean','_getOwnPropertyDescriptor','allStrLength','send','edge','_setNodeExpandableState','substr','_isArray','_socket','4049394rDwCpX','1598338DyRbTf','perf_hooks','bind','null','port','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','autoExpandPropertyCount','_connectToHostNow','autoExpand','[object\\x20Map]','1.0.0','_connecting','expressionsToEvaluate','[object\\x20Set]','getOwnPropertyDescriptor','_isNegativeZero','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','_processTreeNodeResult','62877710gpOMMo','type','valueOf','args','angular','now','_disposeWebsocket',\"c:\\\\Users\\\\User\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.328\\\\node_modules\",'_consoleNinjaAllowedToStart','_type','noFunctions','_isPrimitiveWrapperType','_cleanNode','5TLFOxY','log','props','onerror','_sendErrorMessage','dockerizedApp','_objectToString','_ws','cappedProps','time','eventReceivedCallback','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','positiveInfinity','Error','object','bigint','4313468GWUqUW','_keyStrRegExp','webpack','toString','onopen','value','_isUndefined','_WebSocketClass','reload','stack','length','depth','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','strLength','concat','includes','root_exp_id','hasOwnProperty','toLowerCase','gateway.docker.internal','_setNodeLabel','host','_getOwnPropertySymbols','nuxt','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','Set','_blacklistedProperty','_allowedToSend','5056956DiHpNd','prototype','_addObjectProperty','_setNodeId','onmessage','get','remix','join','url','date','_hasSymbolPropertyOnItsPath','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','_isMap','_numberRegExp','create','reduceLimits','_allowedToConnectOnSend','_sortProps','String','timeStamp','parse','console','nan','onclose','_capIfString','then','capped','WebSocket','_maxConnectAttemptCount','call','string','current','elapsed','performance','_attemptToReconnectShortly','rootExpression','autoExpandLimit','elements','number','_getOwnPropertyNames','autoExpandMaxDepth','9477TCaZxo','coverage','parent','_inNextEdge','_hasSetOnItsPath','10744kSmWZW','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','getOwnPropertySymbols','charAt','NEXT_RUNTIME','global','_treeNodePropertiesAfterFullValue','POSITIVE_INFINITY','getWebSocketClass','_undefined','[object\\x20Array]','sortProps','resolveGetters','_Symbol','_regExpToString','match','autoExpandPreviousObjects','stackTraceLimit','root_exp','unref','map','_WebSocket','env','__es'+'Module','_addProperty','127.0.0.1','boolean','getter','symbol','catch','function','count','_setNodeQueryPath','isArray','hostname','indexOf','set','...','negativeZero','negativeInfinity','disabledLog','_connectAttemptCount','_additionalMetadata','sort','serialize','path','test','NEGATIVE_INFINITY','https://tinyurl.com/37x8b79t','toUpperCase','totalStrLength','level','_isPrimitiveType','313HzvltY','_inBrowser','error','defineProperty','readyState','_HTMLAllCollection'];_0x3c8e=function(){return _0x5eeb9b;};return _0x3c8e();}var _0x10c22d=_0x1805;(function(_0x32a14e,_0x1fd815){var _0x45803d=_0x1805,_0x2a2af1=_0x32a14e();while(!![]){try{var _0x460fb4=-parseInt(_0x45803d(0x134))/0x1*(parseInt(_0x45803d(0x146))/0x2)+-parseInt(_0x45803d(0x1c4))/0x3+-parseInt(_0x45803d(0x1a8))/0x4+parseInt(_0x45803d(0x198))/0x5*(-parseInt(_0x45803d(0x178))/0x6)+-parseInt(_0x45803d(0x179))/0x7+-parseInt(_0x45803d(0xff))/0x8*(parseInt(_0x45803d(0xfa))/0x9)+parseInt(_0x45803d(0x18b))/0xa;if(_0x460fb4===_0x1fd815)break;else _0x2a2af1['push'](_0x2a2af1['shift']());}catch(_0x4f9400){_0x2a2af1['push'](_0x2a2af1['shift']());}}}(_0x3c8e,0xd0b39));var K=Object[_0x10c22d(0x1d2)],Q=Object[_0x10c22d(0x137)],G=Object[_0x10c22d(0x187)],ee=Object['getOwnPropertyNames'],te=Object['getPrototypeOf'],ne=Object[_0x10c22d(0x1c5)][_0x10c22d(0x1b9)],re=(_0x2a6a41,_0x1b92ce,_0x5d8ee7,_0x1151bc)=>{var _0x543deb=_0x10c22d;if(_0x1b92ce&&typeof _0x1b92ce==_0x543deb(0x1a6)||typeof _0x1b92ce==_0x543deb(0x11d)){for(let _0x3fd2f3 of ee(_0x1b92ce))!ne[_0x543deb(0x1e1)](_0x2a6a41,_0x3fd2f3)&&_0x3fd2f3!==_0x5d8ee7&&Q(_0x2a6a41,_0x3fd2f3,{'get':()=>_0x1b92ce[_0x3fd2f3],'enumerable':!(_0x1151bc=G(_0x1b92ce,_0x3fd2f3))||_0x1151bc[_0x543deb(0x13a)]});}return _0x2a6a41;},V=(_0x3393bc,_0x44aabf,_0x2f13a6)=>(_0x2f13a6=_0x3393bc!=null?K(te(_0x3393bc)):{},re(_0x44aabf||!_0x3393bc||!_0x3393bc[_0x10c22d(0x116)]?Q(_0x2f13a6,_0x10c22d(0x14d),{'value':_0x3393bc,'enumerable':!0x0}):_0x2f13a6,_0x3393bc)),x=class{constructor(_0x3a7b88,_0x8b2068,_0x59912a,_0x1466bf,_0x2a4aaa,_0x15f176){var _0x202f8b=_0x10c22d,_0xbedb22,_0x54de73,_0x1d020d,_0x1db0a9;this[_0x202f8b(0x104)]=_0x3a7b88,this[_0x202f8b(0x1bd)]=_0x8b2068,this[_0x202f8b(0x17d)]=_0x59912a,this['nodeModules']=_0x1466bf,this[_0x202f8b(0x19d)]=_0x2a4aaa,this['eventReceivedCallback']=_0x15f176,this['_allowedToSend']=!0x0,this[_0x202f8b(0x1d4)]=!0x0,this[_0x202f8b(0x13c)]=!0x1,this['_connecting']=!0x1,this['_inNextEdge']=((_0x54de73=(_0xbedb22=_0x3a7b88[_0x202f8b(0x169)])==null?void 0x0:_0xbedb22[_0x202f8b(0x115)])==null?void 0x0:_0x54de73[_0x202f8b(0x103)])==='edge',this['_inBrowser']=!((_0x1db0a9=(_0x1d020d=this[_0x202f8b(0x104)]['process'])==null?void 0x0:_0x1d020d[_0x202f8b(0x144)])!=null&&_0x1db0a9[_0x202f8b(0x13e)])&&!this[_0x202f8b(0xfd)],this[_0x202f8b(0x1af)]=null,this[_0x202f8b(0x128)]=0x0,this[_0x202f8b(0x1e0)]=0x14,this[_0x202f8b(0x14e)]=_0x202f8b(0x12f),this[_0x202f8b(0x19c)]=(this['_inBrowser']?'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20':_0x202f8b(0x1b4))+this['_webSocketErrorDocsLink'];}async[_0x10c22d(0x107)](){var _0x3d023b=_0x10c22d,_0x5b1226,_0x9b2c5d;if(this[_0x3d023b(0x1af)])return this['_WebSocketClass'];let _0x2a0e08;if(this[_0x3d023b(0x135)]||this[_0x3d023b(0xfd)])_0x2a0e08=this[_0x3d023b(0x104)][_0x3d023b(0x1df)];else{if((_0x5b1226=this['global'][_0x3d023b(0x169)])!=null&&_0x5b1226[_0x3d023b(0x114)])_0x2a0e08=(_0x9b2c5d=this['global'][_0x3d023b(0x169)])==null?void 0x0:_0x9b2c5d[_0x3d023b(0x114)];else try{let _0x49ad2c=await import(_0x3d023b(0x12c));_0x2a0e08=(await import((await import(_0x3d023b(0x1cc)))['pathToFileURL'](_0x49ad2c[_0x3d023b(0x1cb)](this['nodeModules'],'ws/index.js'))[_0x3d023b(0x1ab)]()))['default'];}catch{try{_0x2a0e08=require(require(_0x3d023b(0x12c))['join'](this[_0x3d023b(0x165)],'ws'));}catch{throw new Error(_0x3d023b(0x160));}}}return this[_0x3d023b(0x1af)]=_0x2a0e08,_0x2a0e08;}[_0x10c22d(0x180)](){var _0x341fa9=_0x10c22d;this['_connecting']||this[_0x341fa9(0x13c)]||this[_0x341fa9(0x128)]>=this[_0x341fa9(0x1e0)]||(this[_0x341fa9(0x1d4)]=!0x1,this[_0x341fa9(0x184)]=!0x0,this[_0x341fa9(0x128)]++,this['_ws']=new Promise((_0x114229,_0x2d84e0)=>{var _0x4010ee=_0x341fa9;this[_0x4010ee(0x107)]()['then'](_0x3ec4ce=>{var _0x40a740=_0x4010ee;let _0x5357be=new _0x3ec4ce('ws://'+(!this[_0x40a740(0x135)]&&this['dockerizedApp']?_0x40a740(0x1bb):this[_0x40a740(0x1bd)])+':'+this[_0x40a740(0x17d)]);_0x5357be[_0x40a740(0x19b)]=()=>{var _0x3159e2=_0x40a740;this[_0x3159e2(0x1c3)]=!0x1,this['_disposeWebsocket'](_0x5357be),this[_0x3159e2(0x1e6)](),_0x2d84e0(new Error(_0x3159e2(0x149)));},_0x5357be[_0x40a740(0x1ac)]=()=>{var _0x3c5554=_0x40a740;this[_0x3c5554(0x135)]||_0x5357be[_0x3c5554(0x177)]&&_0x5357be[_0x3c5554(0x177)][_0x3c5554(0x112)]&&_0x5357be[_0x3c5554(0x177)][_0x3c5554(0x112)](),_0x114229(_0x5357be);},_0x5357be[_0x40a740(0x1db)]=()=>{var _0x56e9a1=_0x40a740;this[_0x56e9a1(0x1d4)]=!0x0,this[_0x56e9a1(0x191)](_0x5357be),this[_0x56e9a1(0x1e6)]();},_0x5357be[_0x40a740(0x1c8)]=_0x34598b=>{var _0xa75ca0=_0x40a740;try{if(!(_0x34598b!=null&&_0x34598b[_0xa75ca0(0x13b)])||!this['eventReceivedCallback'])return;let _0x47fbce=JSON[_0xa75ca0(0x1d8)](_0x34598b[_0xa75ca0(0x13b)]);this[_0xa75ca0(0x1a2)](_0x47fbce['method'],_0x47fbce[_0xa75ca0(0x18e)],this[_0xa75ca0(0x104)],this[_0xa75ca0(0x135)]);}catch{}};})[_0x4010ee(0x1dd)](_0x302eda=>(this['_connected']=!0x0,this[_0x4010ee(0x184)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this['_allowedToSend']=!0x0,this[_0x4010ee(0x128)]=0x0,_0x302eda))[_0x4010ee(0x11c)](_0xe61e54=>(this[_0x4010ee(0x13c)]=!0x1,this['_connecting']=!0x1,console['warn'](_0x4010ee(0x17e)+this['_webSocketErrorDocsLink']),_0x2d84e0(new Error(_0x4010ee(0x1cf)+(_0xe61e54&&_0xe61e54[_0x4010ee(0x14c)])))));}));}[_0x10c22d(0x191)](_0x380045){var _0x5e6394=_0x10c22d;this[_0x5e6394(0x13c)]=!0x1,this[_0x5e6394(0x184)]=!0x1;try{_0x380045[_0x5e6394(0x1db)]=null,_0x380045[_0x5e6394(0x19b)]=null,_0x380045[_0x5e6394(0x1ac)]=null;}catch{}try{_0x380045[_0x5e6394(0x138)]<0x2&&_0x380045[_0x5e6394(0x143)]();}catch{}}[_0x10c22d(0x1e6)](){var _0x1f46e4=_0x10c22d;clearTimeout(this[_0x1f46e4(0x15e)]),!(this[_0x1f46e4(0x128)]>=this['_maxConnectAttemptCount'])&&(this['_reconnectTimeout']=setTimeout(()=>{var _0x17606b=_0x1f46e4,_0x37f12a;this[_0x17606b(0x13c)]||this[_0x17606b(0x184)]||(this[_0x17606b(0x180)](),(_0x37f12a=this[_0x17606b(0x19f)])==null||_0x37f12a[_0x17606b(0x11c)](()=>this[_0x17606b(0x1e6)]()));},0x1f4),this[_0x1f46e4(0x15e)][_0x1f46e4(0x112)]&&this['_reconnectTimeout']['unref']());}async[_0x10c22d(0x172)](_0x277bff){var _0x2f2b3b=_0x10c22d;try{if(!this[_0x2f2b3b(0x1c3)])return;this[_0x2f2b3b(0x1d4)]&&this[_0x2f2b3b(0x180)](),(await this[_0x2f2b3b(0x19f)])[_0x2f2b3b(0x172)](JSON[_0x2f2b3b(0x140)](_0x277bff));}catch(_0x35bbd1){console['warn'](this[_0x2f2b3b(0x19c)]+':\\x20'+(_0x35bbd1&&_0x35bbd1[_0x2f2b3b(0x14c)])),this[_0x2f2b3b(0x1c3)]=!0x1,this[_0x2f2b3b(0x1e6)]();}}};function q(_0x1ff642,_0x2f4032,_0x2369ed,_0x4496ce,_0x346955,_0x56f140,_0x153f83,_0x3feba7=ie){var _0x39bbb5=_0x10c22d;let _0x319a61=_0x2369ed['split'](',')[_0x39bbb5(0x113)](_0x3aa21f=>{var _0x239ca4=_0x39bbb5,_0x279977,_0x44d7d6,_0x455e14,_0x3b4519;try{if(!_0x1ff642[_0x239ca4(0x161)]){let _0x19b69c=((_0x44d7d6=(_0x279977=_0x1ff642['process'])==null?void 0x0:_0x279977['versions'])==null?void 0x0:_0x44d7d6[_0x239ca4(0x13e)])||((_0x3b4519=(_0x455e14=_0x1ff642[_0x239ca4(0x169)])==null?void 0x0:_0x455e14['env'])==null?void 0x0:_0x3b4519[_0x239ca4(0x103)])==='edge';(_0x346955==='next.js'||_0x346955===_0x239ca4(0x1ca)||_0x346955==='astro'||_0x346955===_0x239ca4(0x18f))&&(_0x346955+=_0x19b69c?'\\x20server':_0x239ca4(0x164)),_0x1ff642[_0x239ca4(0x161)]={'id':+new Date(),'tool':_0x346955},_0x153f83&&_0x346955&&!_0x19b69c&&console['log'](_0x239ca4(0x189)+(_0x346955[_0x239ca4(0x102)](0x0)[_0x239ca4(0x130)]()+_0x346955[_0x239ca4(0x175)](0x1))+',',_0x239ca4(0x100),_0x239ca4(0x1c0));}let _0x47def7=new x(_0x1ff642,_0x2f4032,_0x3aa21f,_0x4496ce,_0x56f140,_0x3feba7);return _0x47def7[_0x239ca4(0x172)][_0x239ca4(0x17b)](_0x47def7);}catch(_0x127f96){return console[_0x239ca4(0x16a)](_0x239ca4(0x1a3),_0x127f96&&_0x127f96[_0x239ca4(0x14c)]),()=>{};}});return _0x42bcef=>_0x319a61[_0x39bbb5(0x15b)](_0x1df573=>_0x1df573(_0x42bcef));}function ie(_0x4f6759,_0x16b305,_0x2d8f0f,_0x1c9f76){var _0x2787da=_0x10c22d;_0x1c9f76&&_0x4f6759===_0x2787da(0x1b0)&&_0x2d8f0f[_0x2787da(0x15f)][_0x2787da(0x1b0)]();}function b(_0x53a834){var _0x338573=_0x10c22d,_0x2b52b3,_0x312871;let _0x27c463=function(_0x451910,_0x355ecc){return _0x355ecc-_0x451910;},_0x241bb1;if(_0x53a834[_0x338573(0x1e5)])_0x241bb1=function(){var _0x25dfa6=_0x338573;return _0x53a834[_0x25dfa6(0x1e5)][_0x25dfa6(0x190)]();};else{if(_0x53a834[_0x338573(0x169)]&&_0x53a834[_0x338573(0x169)]['hrtime']&&((_0x312871=(_0x2b52b3=_0x53a834[_0x338573(0x169)])==null?void 0x0:_0x2b52b3[_0x338573(0x115)])==null?void 0x0:_0x312871[_0x338573(0x103)])!==_0x338573(0x173))_0x241bb1=function(){var _0x29a8d7=_0x338573;return _0x53a834[_0x29a8d7(0x169)]['hrtime']();},_0x27c463=function(_0x403ce6,_0x5d18ee){return 0x3e8*(_0x5d18ee[0x0]-_0x403ce6[0x0])+(_0x5d18ee[0x1]-_0x403ce6[0x1])/0xf4240;};else try{let {performance:_0x20aa35}=require(_0x338573(0x17a));_0x241bb1=function(){return _0x20aa35['now']();};}catch{_0x241bb1=function(){return+new Date();};}}return{'elapsed':_0x27c463,'timeStamp':_0x241bb1,'now':()=>Date['now']()};}function X(_0x141aef,_0x11387a,_0x3d28c8){var _0x390496=_0x10c22d,_0x650777,_0x37c7c1,_0x378534,_0x2e7f0c,_0x408d44;if(_0x141aef[_0x390496(0x193)]!==void 0x0)return _0x141aef[_0x390496(0x193)];let _0xfb5e0e=((_0x37c7c1=(_0x650777=_0x141aef[_0x390496(0x169)])==null?void 0x0:_0x650777[_0x390496(0x144)])==null?void 0x0:_0x37c7c1[_0x390496(0x13e)])||((_0x2e7f0c=(_0x378534=_0x141aef[_0x390496(0x169)])==null?void 0x0:_0x378534[_0x390496(0x115)])==null?void 0x0:_0x2e7f0c['NEXT_RUNTIME'])===_0x390496(0x173);return _0xfb5e0e&&_0x3d28c8===_0x390496(0x1bf)?_0x141aef[_0x390496(0x193)]=!0x1:_0x141aef[_0x390496(0x193)]=_0xfb5e0e||!_0x11387a||((_0x408d44=_0x141aef[_0x390496(0x15f)])==null?void 0x0:_0x408d44[_0x390496(0x121)])&&_0x11387a[_0x390496(0x1b7)](_0x141aef[_0x390496(0x15f)][_0x390496(0x121)]),_0x141aef['_consoleNinjaAllowedToStart'];}function H(_0x3426ce,_0x5778aa,_0x47b4a3,_0x12d0f9){var _0x31b1af=_0x10c22d;_0x3426ce=_0x3426ce,_0x5778aa=_0x5778aa,_0x47b4a3=_0x47b4a3,_0x12d0f9=_0x12d0f9;let _0x152038=b(_0x3426ce),_0x454b9c=_0x152038[_0x31b1af(0x1e4)],_0x27c00b=_0x152038['timeStamp'];class _0x47b72c{constructor(){var _0x5a7b11=_0x31b1af;this[_0x5a7b11(0x1a9)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x5a7b11(0x1d1)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0x5a7b11(0x108)]=_0x3426ce[_0x5a7b11(0x156)],this[_0x5a7b11(0x139)]=_0x3426ce['HTMLAllCollection'],this['_getOwnPropertyDescriptor']=Object[_0x5a7b11(0x187)],this['_getOwnPropertyNames']=Object['getOwnPropertyNames'],this[_0x5a7b11(0x10c)]=_0x3426ce['Symbol'],this['_regExpToString']=RegExp[_0x5a7b11(0x1c5)][_0x5a7b11(0x1ab)],this[_0x5a7b11(0x13d)]=Date[_0x5a7b11(0x1c5)]['toString'];}['serialize'](_0x110f7d,_0x2398ab,_0x10d048,_0x189694){var _0x39a5ed=_0x31b1af,_0x217d3a=this,_0x1b94db=_0x10d048[_0x39a5ed(0x181)];function _0x320e61(_0x506279,_0x1aee1b,_0x2f71b6){var _0x2e76cb=_0x39a5ed;_0x1aee1b[_0x2e76cb(0x18c)]=_0x2e76cb(0x147),_0x1aee1b[_0x2e76cb(0x136)]=_0x506279[_0x2e76cb(0x14c)],_0x5dafc9=_0x2f71b6['node'][_0x2e76cb(0x1e3)],_0x2f71b6[_0x2e76cb(0x13e)][_0x2e76cb(0x1e3)]=_0x1aee1b,_0x217d3a[_0x2e76cb(0x16d)](_0x1aee1b,_0x2f71b6);}try{_0x10d048['level']++,_0x10d048[_0x39a5ed(0x181)]&&_0x10d048['autoExpandPreviousObjects'][_0x39a5ed(0x15d)](_0x2398ab);var _0x45f9f6,_0x1551bc,_0x54fea1,_0x776ec8,_0x406967=[],_0x536934=[],_0x25372d,_0x4c0119=this[_0x39a5ed(0x194)](_0x2398ab),_0x1eaf82=_0x4c0119===_0x39a5ed(0x158),_0x17c26c=!0x1,_0x20a2dd=_0x4c0119===_0x39a5ed(0x11d),_0x5f4307=this[_0x39a5ed(0x133)](_0x4c0119),_0x2e1c61=this['_isPrimitiveWrapperType'](_0x4c0119),_0x3d4bd8=_0x5f4307||_0x2e1c61,_0x30d389={},_0x211ffb=0x0,_0x36976c=!0x1,_0x5dafc9,_0x407aea=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x10d048[_0x39a5ed(0x1b3)]){if(_0x1eaf82){if(_0x1551bc=_0x2398ab[_0x39a5ed(0x1b2)],_0x1551bc>_0x10d048[_0x39a5ed(0x1e9)]){for(_0x54fea1=0x0,_0x776ec8=_0x10d048[_0x39a5ed(0x1e9)],_0x45f9f6=_0x54fea1;_0x45f9f6<_0x776ec8;_0x45f9f6++)_0x536934[_0x39a5ed(0x15d)](_0x217d3a[_0x39a5ed(0x117)](_0x406967,_0x2398ab,_0x4c0119,_0x45f9f6,_0x10d048));_0x110f7d[_0x39a5ed(0x16e)]=!0x0;}else{for(_0x54fea1=0x0,_0x776ec8=_0x1551bc,_0x45f9f6=_0x54fea1;_0x45f9f6<_0x776ec8;_0x45f9f6++)_0x536934['push'](_0x217d3a['_addProperty'](_0x406967,_0x2398ab,_0x4c0119,_0x45f9f6,_0x10d048));}_0x10d048[_0x39a5ed(0x17f)]+=_0x536934[_0x39a5ed(0x1b2)];}if(!(_0x4c0119===_0x39a5ed(0x17c)||_0x4c0119===_0x39a5ed(0x156))&&!_0x5f4307&&_0x4c0119!==_0x39a5ed(0x1d6)&&_0x4c0119!==_0x39a5ed(0x168)&&_0x4c0119!==_0x39a5ed(0x1a7)){var _0x4d1499=_0x189694[_0x39a5ed(0x19a)]||_0x10d048[_0x39a5ed(0x19a)];if(this[_0x39a5ed(0x14b)](_0x2398ab)?(_0x45f9f6=0x0,_0x2398ab[_0x39a5ed(0x15b)](function(_0x330a53){var _0x4e0751=_0x39a5ed;if(_0x211ffb++,_0x10d048[_0x4e0751(0x17f)]++,_0x211ffb>_0x4d1499){_0x36976c=!0x0;return;}if(!_0x10d048['isExpressionToEvaluate']&&_0x10d048[_0x4e0751(0x181)]&&_0x10d048[_0x4e0751(0x17f)]>_0x10d048['autoExpandLimit']){_0x36976c=!0x0;return;}_0x536934[_0x4e0751(0x15d)](_0x217d3a[_0x4e0751(0x117)](_0x406967,_0x2398ab,_0x4e0751(0x1c1),_0x45f9f6++,_0x10d048,function(_0x23f77c){return function(){return _0x23f77c;};}(_0x330a53)));})):this[_0x39a5ed(0x1d0)](_0x2398ab)&&_0x2398ab['forEach'](function(_0x53cd87,_0x53a22a){var _0x41cf05=_0x39a5ed;if(_0x211ffb++,_0x10d048[_0x41cf05(0x17f)]++,_0x211ffb>_0x4d1499){_0x36976c=!0x0;return;}if(!_0x10d048['isExpressionToEvaluate']&&_0x10d048[_0x41cf05(0x181)]&&_0x10d048[_0x41cf05(0x17f)]>_0x10d048['autoExpandLimit']){_0x36976c=!0x0;return;}var _0x4bd6ab=_0x53a22a[_0x41cf05(0x1ab)]();_0x4bd6ab[_0x41cf05(0x1b2)]>0x64&&(_0x4bd6ab=_0x4bd6ab['slice'](0x0,0x64)+_0x41cf05(0x124)),_0x536934[_0x41cf05(0x15d)](_0x217d3a[_0x41cf05(0x117)](_0x406967,_0x2398ab,'Map',_0x4bd6ab,_0x10d048,function(_0xd47d84){return function(){return _0xd47d84;};}(_0x53cd87)));}),!_0x17c26c){try{for(_0x25372d in _0x2398ab)if(!(_0x1eaf82&&_0x407aea[_0x39a5ed(0x12d)](_0x25372d))&&!this[_0x39a5ed(0x1c2)](_0x2398ab,_0x25372d,_0x10d048)){if(_0x211ffb++,_0x10d048[_0x39a5ed(0x17f)]++,_0x211ffb>_0x4d1499){_0x36976c=!0x0;break;}if(!_0x10d048['isExpressionToEvaluate']&&_0x10d048[_0x39a5ed(0x181)]&&_0x10d048['autoExpandPropertyCount']>_0x10d048[_0x39a5ed(0x1e8)]){_0x36976c=!0x0;break;}_0x536934[_0x39a5ed(0x15d)](_0x217d3a['_addObjectProperty'](_0x406967,_0x30d389,_0x2398ab,_0x4c0119,_0x25372d,_0x10d048));}}catch{}if(_0x30d389['_p_length']=!0x0,_0x20a2dd&&(_0x30d389[_0x39a5ed(0x142)]=!0x0),!_0x36976c){var _0x41effa=[]['concat'](this[_0x39a5ed(0xf8)](_0x2398ab))[_0x39a5ed(0x1b6)](this[_0x39a5ed(0x1be)](_0x2398ab));for(_0x45f9f6=0x0,_0x1551bc=_0x41effa['length'];_0x45f9f6<_0x1551bc;_0x45f9f6++)if(_0x25372d=_0x41effa[_0x45f9f6],!(_0x1eaf82&&_0x407aea[_0x39a5ed(0x12d)](_0x25372d[_0x39a5ed(0x1ab)]()))&&!this[_0x39a5ed(0x1c2)](_0x2398ab,_0x25372d,_0x10d048)&&!_0x30d389[_0x39a5ed(0x15a)+_0x25372d[_0x39a5ed(0x1ab)]()]){if(_0x211ffb++,_0x10d048[_0x39a5ed(0x17f)]++,_0x211ffb>_0x4d1499){_0x36976c=!0x0;break;}if(!_0x10d048[_0x39a5ed(0x150)]&&_0x10d048['autoExpand']&&_0x10d048[_0x39a5ed(0x17f)]>_0x10d048[_0x39a5ed(0x1e8)]){_0x36976c=!0x0;break;}_0x536934[_0x39a5ed(0x15d)](_0x217d3a[_0x39a5ed(0x1c6)](_0x406967,_0x30d389,_0x2398ab,_0x4c0119,_0x25372d,_0x10d048));}}}}}if(_0x110f7d[_0x39a5ed(0x18c)]=_0x4c0119,_0x3d4bd8?(_0x110f7d[_0x39a5ed(0x1ad)]=_0x2398ab[_0x39a5ed(0x18d)](),this[_0x39a5ed(0x1dc)](_0x4c0119,_0x110f7d,_0x10d048,_0x189694)):_0x4c0119===_0x39a5ed(0x1cd)?_0x110f7d[_0x39a5ed(0x1ad)]=this[_0x39a5ed(0x13d)][_0x39a5ed(0x1e1)](_0x2398ab):_0x4c0119===_0x39a5ed(0x1a7)?_0x110f7d[_0x39a5ed(0x1ad)]=_0x2398ab['toString']():_0x4c0119==='RegExp'?_0x110f7d[_0x39a5ed(0x1ad)]=this[_0x39a5ed(0x10d)][_0x39a5ed(0x1e1)](_0x2398ab):_0x4c0119==='symbol'&&this[_0x39a5ed(0x10c)]?_0x110f7d[_0x39a5ed(0x1ad)]=this[_0x39a5ed(0x10c)][_0x39a5ed(0x1c5)][_0x39a5ed(0x1ab)][_0x39a5ed(0x1e1)](_0x2398ab):!_0x10d048[_0x39a5ed(0x1b3)]&&!(_0x4c0119===_0x39a5ed(0x17c)||_0x4c0119===_0x39a5ed(0x156))&&(delete _0x110f7d[_0x39a5ed(0x1ad)],_0x110f7d[_0x39a5ed(0x1de)]=!0x0),_0x36976c&&(_0x110f7d[_0x39a5ed(0x1a0)]=!0x0),_0x5dafc9=_0x10d048[_0x39a5ed(0x13e)]['current'],_0x10d048[_0x39a5ed(0x13e)]['current']=_0x110f7d,this[_0x39a5ed(0x16d)](_0x110f7d,_0x10d048),_0x536934[_0x39a5ed(0x1b2)]){for(_0x45f9f6=0x0,_0x1551bc=_0x536934[_0x39a5ed(0x1b2)];_0x45f9f6<_0x1551bc;_0x45f9f6++)_0x536934[_0x45f9f6](_0x45f9f6);}_0x406967[_0x39a5ed(0x1b2)]&&(_0x110f7d[_0x39a5ed(0x19a)]=_0x406967);}catch(_0x2c1ea6){_0x320e61(_0x2c1ea6,_0x110f7d,_0x10d048);}return this[_0x39a5ed(0x129)](_0x2398ab,_0x110f7d),this[_0x39a5ed(0x105)](_0x110f7d,_0x10d048),_0x10d048[_0x39a5ed(0x13e)][_0x39a5ed(0x1e3)]=_0x5dafc9,_0x10d048[_0x39a5ed(0x132)]--,_0x10d048[_0x39a5ed(0x181)]=_0x1b94db,_0x10d048['autoExpand']&&_0x10d048[_0x39a5ed(0x10f)]['pop'](),_0x110f7d;}[_0x31b1af(0x1be)](_0xd4f5d8){var _0x5c9f82=_0x31b1af;return Object[_0x5c9f82(0x101)]?Object[_0x5c9f82(0x101)](_0xd4f5d8):[];}[_0x31b1af(0x14b)](_0x3cfa3d){var _0xb5004d=_0x31b1af;return!!(_0x3cfa3d&&_0x3426ce[_0xb5004d(0x1c1)]&&this[_0xb5004d(0x19e)](_0x3cfa3d)===_0xb5004d(0x186)&&_0x3cfa3d[_0xb5004d(0x15b)]);}[_0x31b1af(0x1c2)](_0x4a78fe,_0x4e5f2b,_0x20a046){var _0x411ee8=_0x31b1af;return _0x20a046[_0x411ee8(0x195)]?typeof _0x4a78fe[_0x4e5f2b]=='function':!0x1;}[_0x31b1af(0x194)](_0xd7ce82){var _0x2221d4=_0x31b1af,_0x4690ac='';return _0x4690ac=typeof _0xd7ce82,_0x4690ac===_0x2221d4(0x1a6)?this[_0x2221d4(0x19e)](_0xd7ce82)===_0x2221d4(0x109)?_0x4690ac=_0x2221d4(0x158):this[_0x2221d4(0x19e)](_0xd7ce82)===_0x2221d4(0x14f)?_0x4690ac=_0x2221d4(0x1cd):this[_0x2221d4(0x19e)](_0xd7ce82)==='[object\\x20BigInt]'?_0x4690ac='bigint':_0xd7ce82===null?_0x4690ac=_0x2221d4(0x17c):_0xd7ce82['constructor']&&(_0x4690ac=_0xd7ce82['constructor'][_0x2221d4(0x154)]||_0x4690ac):_0x4690ac==='undefined'&&this[_0x2221d4(0x139)]&&_0xd7ce82 instanceof this[_0x2221d4(0x139)]&&(_0x4690ac='HTMLAllCollection'),_0x4690ac;}[_0x31b1af(0x19e)](_0x2318eb){var _0x13ffd6=_0x31b1af;return Object[_0x13ffd6(0x1c5)][_0x13ffd6(0x1ab)][_0x13ffd6(0x1e1)](_0x2318eb);}[_0x31b1af(0x133)](_0x493467){var _0x15d855=_0x31b1af;return _0x493467===_0x15d855(0x119)||_0x493467===_0x15d855(0x1e2)||_0x493467===_0x15d855(0xf7);}[_0x31b1af(0x196)](_0xe0822){var _0x3c7245=_0x31b1af;return _0xe0822===_0x3c7245(0x16f)||_0xe0822===_0x3c7245(0x1d6)||_0xe0822===_0x3c7245(0x166);}[_0x31b1af(0x117)](_0x4d8bf5,_0x47c5db,_0x4b8ee1,_0x2e3f76,_0x8a2ac9,_0x444dff){var _0x4bf700=this;return function(_0xfe5354){var _0x3005ea=_0x1805,_0xc3cb89=_0x8a2ac9[_0x3005ea(0x13e)][_0x3005ea(0x1e3)],_0x44d37e=_0x8a2ac9['node'][_0x3005ea(0x152)],_0xb8a1e4=_0x8a2ac9[_0x3005ea(0x13e)][_0x3005ea(0xfc)];_0x8a2ac9[_0x3005ea(0x13e)][_0x3005ea(0xfc)]=_0xc3cb89,_0x8a2ac9['node'][_0x3005ea(0x152)]=typeof _0x2e3f76=='number'?_0x2e3f76:_0xfe5354,_0x4d8bf5['push'](_0x4bf700[_0x3005ea(0x16c)](_0x47c5db,_0x4b8ee1,_0x2e3f76,_0x8a2ac9,_0x444dff)),_0x8a2ac9['node'][_0x3005ea(0xfc)]=_0xb8a1e4,_0x8a2ac9[_0x3005ea(0x13e)][_0x3005ea(0x152)]=_0x44d37e;};}[_0x31b1af(0x1c6)](_0x5be1bf,_0xeb08bb,_0x1c6b63,_0xc24dfe,_0x1a5ca0,_0x37720b,_0x5c3867){var _0x212bd0=_0x31b1af,_0x272b60=this;return _0xeb08bb[_0x212bd0(0x15a)+_0x1a5ca0[_0x212bd0(0x1ab)]()]=!0x0,function(_0x39a661){var _0x477e4c=_0x212bd0,_0x58f8a3=_0x37720b[_0x477e4c(0x13e)]['current'],_0x25069a=_0x37720b['node'][_0x477e4c(0x152)],_0x4435b3=_0x37720b[_0x477e4c(0x13e)]['parent'];_0x37720b[_0x477e4c(0x13e)][_0x477e4c(0xfc)]=_0x58f8a3,_0x37720b[_0x477e4c(0x13e)][_0x477e4c(0x152)]=_0x39a661,_0x5be1bf['push'](_0x272b60[_0x477e4c(0x16c)](_0x1c6b63,_0xc24dfe,_0x1a5ca0,_0x37720b,_0x5c3867)),_0x37720b[_0x477e4c(0x13e)][_0x477e4c(0xfc)]=_0x4435b3,_0x37720b[_0x477e4c(0x13e)]['index']=_0x25069a;};}[_0x31b1af(0x16c)](_0x1ee2b0,_0x18d148,_0xa70f4b,_0x29faef,_0x1ab228){var _0x24a159=_0x31b1af,_0x482694=this;_0x1ab228||(_0x1ab228=function(_0x326f7a,_0x5a2692){return _0x326f7a[_0x5a2692];});var _0x463946=_0xa70f4b['toString'](),_0x55f0ff=_0x29faef['expressionsToEvaluate']||{},_0x59f140=_0x29faef[_0x24a159(0x1b3)],_0x37661b=_0x29faef[_0x24a159(0x150)];try{var _0x5de697=this[_0x24a159(0x1d0)](_0x1ee2b0),_0x4bb10=_0x463946;_0x5de697&&_0x4bb10[0x0]==='\\x27'&&(_0x4bb10=_0x4bb10[_0x24a159(0x175)](0x1,_0x4bb10[_0x24a159(0x1b2)]-0x2));var _0x5d6e15=_0x29faef[_0x24a159(0x185)]=_0x55f0ff[_0x24a159(0x15a)+_0x4bb10];_0x5d6e15&&(_0x29faef['depth']=_0x29faef['depth']+0x1),_0x29faef['isExpressionToEvaluate']=!!_0x5d6e15;var _0x7749d4=typeof _0xa70f4b=='symbol',_0x6fc64b={'name':_0x7749d4||_0x5de697?_0x463946:this['_propertyName'](_0x463946)};if(_0x7749d4&&(_0x6fc64b[_0x24a159(0x11b)]=!0x0),!(_0x18d148===_0x24a159(0x158)||_0x18d148===_0x24a159(0x1a5))){var _0x124367=this[_0x24a159(0x170)](_0x1ee2b0,_0xa70f4b);if(_0x124367&&(_0x124367[_0x24a159(0x123)]&&(_0x6fc64b[_0x24a159(0x141)]=!0x0),_0x124367[_0x24a159(0x1c9)]&&!_0x5d6e15&&!_0x29faef[_0x24a159(0x10b)]))return _0x6fc64b[_0x24a159(0x11a)]=!0x0,this[_0x24a159(0x18a)](_0x6fc64b,_0x29faef),_0x6fc64b;}var _0x427fbb;try{_0x427fbb=_0x1ab228(_0x1ee2b0,_0xa70f4b);}catch(_0x1d39d2){return _0x6fc64b={'name':_0x463946,'type':_0x24a159(0x147),'error':_0x1d39d2[_0x24a159(0x14c)]},this['_processTreeNodeResult'](_0x6fc64b,_0x29faef),_0x6fc64b;}var _0xd196f8=this[_0x24a159(0x194)](_0x427fbb),_0x56e361=this[_0x24a159(0x133)](_0xd196f8);if(_0x6fc64b[_0x24a159(0x18c)]=_0xd196f8,_0x56e361)this['_processTreeNodeResult'](_0x6fc64b,_0x29faef,_0x427fbb,function(){var _0x11ad14=_0x24a159;_0x6fc64b[_0x11ad14(0x1ad)]=_0x427fbb[_0x11ad14(0x18d)](),!_0x5d6e15&&_0x482694[_0x11ad14(0x1dc)](_0xd196f8,_0x6fc64b,_0x29faef,{});});else{var _0x145347=_0x29faef['autoExpand']&&_0x29faef[_0x24a159(0x132)]<_0x29faef[_0x24a159(0xf9)]&&_0x29faef[_0x24a159(0x10f)][_0x24a159(0x122)](_0x427fbb)<0x0&&_0xd196f8!==_0x24a159(0x11d)&&_0x29faef['autoExpandPropertyCount']<_0x29faef[_0x24a159(0x1e8)];_0x145347||_0x29faef[_0x24a159(0x132)]<_0x59f140||_0x5d6e15?(this[_0x24a159(0x12b)](_0x6fc64b,_0x427fbb,_0x29faef,_0x5d6e15||{}),this[_0x24a159(0x129)](_0x427fbb,_0x6fc64b)):this[_0x24a159(0x18a)](_0x6fc64b,_0x29faef,_0x427fbb,function(){var _0x4b2e10=_0x24a159;_0xd196f8===_0x4b2e10(0x17c)||_0xd196f8==='undefined'||(delete _0x6fc64b[_0x4b2e10(0x1ad)],_0x6fc64b[_0x4b2e10(0x1de)]=!0x0);});}return _0x6fc64b;}finally{_0x29faef[_0x24a159(0x185)]=_0x55f0ff,_0x29faef['depth']=_0x59f140,_0x29faef[_0x24a159(0x150)]=_0x37661b;}}[_0x31b1af(0x1dc)](_0x30e5fa,_0xfd0e81,_0x5d2d99,_0x2802c1){var _0x440d14=_0x31b1af,_0x11ad12=_0x2802c1[_0x440d14(0x1b5)]||_0x5d2d99[_0x440d14(0x1b5)];if((_0x30e5fa==='string'||_0x30e5fa===_0x440d14(0x1d6))&&_0xfd0e81[_0x440d14(0x1ad)]){let _0x264d67=_0xfd0e81['value'][_0x440d14(0x1b2)];_0x5d2d99[_0x440d14(0x171)]+=_0x264d67,_0x5d2d99[_0x440d14(0x171)]>_0x5d2d99[_0x440d14(0x131)]?(_0xfd0e81[_0x440d14(0x1de)]='',delete _0xfd0e81[_0x440d14(0x1ad)]):_0x264d67>_0x11ad12&&(_0xfd0e81[_0x440d14(0x1de)]=_0xfd0e81[_0x440d14(0x1ad)][_0x440d14(0x175)](0x0,_0x11ad12),delete _0xfd0e81[_0x440d14(0x1ad)]);}}['_isMap'](_0x3efb7b){var _0x2a88c4=_0x31b1af;return!!(_0x3efb7b&&_0x3426ce[_0x2a88c4(0x148)]&&this[_0x2a88c4(0x19e)](_0x3efb7b)===_0x2a88c4(0x182)&&_0x3efb7b[_0x2a88c4(0x15b)]);}['_propertyName'](_0x521367){var _0x1756b3=_0x31b1af;if(_0x521367[_0x1756b3(0x10e)](/^\\d+$/))return _0x521367;var _0x12e9b8;try{_0x12e9b8=JSON[_0x1756b3(0x140)](''+_0x521367);}catch{_0x12e9b8='\\x22'+this[_0x1756b3(0x19e)](_0x521367)+'\\x22';}return _0x12e9b8['match'](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x12e9b8=_0x12e9b8[_0x1756b3(0x175)](0x1,_0x12e9b8[_0x1756b3(0x1b2)]-0x2):_0x12e9b8=_0x12e9b8[_0x1756b3(0x14a)](/'/g,'\\x5c\\x27')[_0x1756b3(0x14a)](/\\\\\"/g,'\\x22')[_0x1756b3(0x14a)](/(^\"|\"$)/g,'\\x27'),_0x12e9b8;}[_0x31b1af(0x18a)](_0x2a17b7,_0x1fdc41,_0x16e150,_0x3df533){var _0x40924b=_0x31b1af;this['_treeNodePropertiesBeforeFullValue'](_0x2a17b7,_0x1fdc41),_0x3df533&&_0x3df533(),this[_0x40924b(0x129)](_0x16e150,_0x2a17b7),this['_treeNodePropertiesAfterFullValue'](_0x2a17b7,_0x1fdc41);}['_treeNodePropertiesBeforeFullValue'](_0x5d6459,_0x1697fb){var _0xba03e4=_0x31b1af;this[_0xba03e4(0x1c7)](_0x5d6459,_0x1697fb),this[_0xba03e4(0x11f)](_0x5d6459,_0x1697fb),this['_setNodeExpressionPath'](_0x5d6459,_0x1697fb),this[_0xba03e4(0x151)](_0x5d6459,_0x1697fb);}['_setNodeId'](_0x50a65d,_0x2f87f8){}['_setNodeQueryPath'](_0x24470f,_0x50e4c0){}[_0x31b1af(0x1bc)](_0x466aca,_0x5930e3){}[_0x31b1af(0x1ae)](_0x1ed5e8){return _0x1ed5e8===this['_undefined'];}[_0x31b1af(0x105)](_0x4d0da0,_0x21a710){var _0x159cee=_0x31b1af;this['_setNodeLabel'](_0x4d0da0,_0x21a710),this['_setNodeExpandableState'](_0x4d0da0),_0x21a710[_0x159cee(0x10a)]&&this[_0x159cee(0x1d5)](_0x4d0da0),this['_addFunctionsNode'](_0x4d0da0,_0x21a710),this[_0x159cee(0x159)](_0x4d0da0,_0x21a710),this[_0x159cee(0x197)](_0x4d0da0);}[_0x31b1af(0x129)](_0x5e326d,_0x18f38a){var _0x47e188=_0x31b1af;let _0x4b755e;try{_0x3426ce[_0x47e188(0x1d9)]&&(_0x4b755e=_0x3426ce[_0x47e188(0x1d9)][_0x47e188(0x136)],_0x3426ce[_0x47e188(0x1d9)][_0x47e188(0x136)]=function(){}),_0x5e326d&&typeof _0x5e326d[_0x47e188(0x1b2)]==_0x47e188(0xf7)&&(_0x18f38a[_0x47e188(0x1b2)]=_0x5e326d[_0x47e188(0x1b2)]);}catch{}finally{_0x4b755e&&(_0x3426ce[_0x47e188(0x1d9)][_0x47e188(0x136)]=_0x4b755e);}if(_0x18f38a[_0x47e188(0x18c)]===_0x47e188(0xf7)||_0x18f38a[_0x47e188(0x18c)]===_0x47e188(0x166)){if(isNaN(_0x18f38a[_0x47e188(0x1ad)]))_0x18f38a[_0x47e188(0x1da)]=!0x0,delete _0x18f38a[_0x47e188(0x1ad)];else switch(_0x18f38a['value']){case Number[_0x47e188(0x106)]:_0x18f38a[_0x47e188(0x1a4)]=!0x0,delete _0x18f38a['value'];break;case Number[_0x47e188(0x12e)]:_0x18f38a[_0x47e188(0x126)]=!0x0,delete _0x18f38a[_0x47e188(0x1ad)];break;case 0x0:this[_0x47e188(0x188)](_0x18f38a[_0x47e188(0x1ad)])&&(_0x18f38a[_0x47e188(0x125)]=!0x0);break;}}else _0x18f38a['type']===_0x47e188(0x11d)&&typeof _0x5e326d[_0x47e188(0x154)]==_0x47e188(0x1e2)&&_0x5e326d[_0x47e188(0x154)]&&_0x18f38a[_0x47e188(0x154)]&&_0x5e326d[_0x47e188(0x154)]!==_0x18f38a[_0x47e188(0x154)]&&(_0x18f38a['funcName']=_0x5e326d[_0x47e188(0x154)]);}[_0x31b1af(0x188)](_0x344e46){var _0x4e840d=_0x31b1af;return 0x1/_0x344e46===Number[_0x4e840d(0x12e)];}[_0x31b1af(0x1d5)](_0x2e5c89){var _0x592a8e=_0x31b1af;!_0x2e5c89[_0x592a8e(0x19a)]||!_0x2e5c89[_0x592a8e(0x19a)][_0x592a8e(0x1b2)]||_0x2e5c89[_0x592a8e(0x18c)]===_0x592a8e(0x158)||_0x2e5c89[_0x592a8e(0x18c)]===_0x592a8e(0x148)||_0x2e5c89[_0x592a8e(0x18c)]===_0x592a8e(0x1c1)||_0x2e5c89[_0x592a8e(0x19a)][_0x592a8e(0x12a)](function(_0x41396a,_0x3695dd){var _0x1cc1af=_0x592a8e,_0x5ebfc6=_0x41396a[_0x1cc1af(0x154)][_0x1cc1af(0x1ba)](),_0x17eaa1=_0x3695dd[_0x1cc1af(0x154)][_0x1cc1af(0x1ba)]();return _0x5ebfc6<_0x17eaa1?-0x1:_0x5ebfc6>_0x17eaa1?0x1:0x0;});}['_addFunctionsNode'](_0x4dfa47,_0x272493){var _0x535228=_0x31b1af;if(!(_0x272493['noFunctions']||!_0x4dfa47[_0x535228(0x19a)]||!_0x4dfa47[_0x535228(0x19a)][_0x535228(0x1b2)])){for(var _0x407f8c=[],_0x39ed19=[],_0x828b4f=0x0,_0x247b5d=_0x4dfa47['props']['length'];_0x828b4f<_0x247b5d;_0x828b4f++){var _0x24feb0=_0x4dfa47['props'][_0x828b4f];_0x24feb0[_0x535228(0x18c)]===_0x535228(0x11d)?_0x407f8c[_0x535228(0x15d)](_0x24feb0):_0x39ed19[_0x535228(0x15d)](_0x24feb0);}if(!(!_0x39ed19[_0x535228(0x1b2)]||_0x407f8c[_0x535228(0x1b2)]<=0x1)){_0x4dfa47[_0x535228(0x19a)]=_0x39ed19;var _0x5f2cbc={'functionsNode':!0x0,'props':_0x407f8c};this[_0x535228(0x1c7)](_0x5f2cbc,_0x272493),this[_0x535228(0x1bc)](_0x5f2cbc,_0x272493),this[_0x535228(0x174)](_0x5f2cbc),this['_setNodePermissions'](_0x5f2cbc,_0x272493),_0x5f2cbc['id']+='\\x20f',_0x4dfa47[_0x535228(0x19a)]['unshift'](_0x5f2cbc);}}}[_0x31b1af(0x159)](_0x9cbe5c,_0x2bd6a3){}[_0x31b1af(0x174)](_0x465a6c){}[_0x31b1af(0x176)](_0x285444){var _0x277b78=_0x31b1af;return Array[_0x277b78(0x120)](_0x285444)||typeof _0x285444==_0x277b78(0x1a6)&&this['_objectToString'](_0x285444)===_0x277b78(0x109);}[_0x31b1af(0x151)](_0x3619ca,_0x4b7d27){}[_0x31b1af(0x197)](_0x403239){var _0x2e55ea=_0x31b1af;delete _0x403239[_0x2e55ea(0x1ce)],delete _0x403239[_0x2e55ea(0xfe)],delete _0x403239[_0x2e55ea(0x163)];}['_setNodeExpressionPath'](_0x453723,_0xaada07){}}let _0x18ccc4=new _0x47b72c(),_0x1dceca={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x1f3b36={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x6abbc5(_0x176395,_0xcbe616,_0x2c48c4,_0x5d9fe0,_0x4abf5c,_0x235907){var _0x3dd1f7=_0x31b1af;let _0x4ab57b,_0x106dfb;try{_0x106dfb=_0x27c00b(),_0x4ab57b=_0x47b4a3[_0xcbe616],!_0x4ab57b||_0x106dfb-_0x4ab57b['ts']>0x1f4&&_0x4ab57b[_0x3dd1f7(0x11e)]&&_0x4ab57b[_0x3dd1f7(0x1a1)]/_0x4ab57b[_0x3dd1f7(0x11e)]<0x64?(_0x47b4a3[_0xcbe616]=_0x4ab57b={'count':0x0,'time':0x0,'ts':_0x106dfb},_0x47b4a3[_0x3dd1f7(0x155)]={}):_0x106dfb-_0x47b4a3['hits']['ts']>0x32&&_0x47b4a3[_0x3dd1f7(0x155)][_0x3dd1f7(0x11e)]&&_0x47b4a3['hits']['time']/_0x47b4a3[_0x3dd1f7(0x155)]['count']<0x64&&(_0x47b4a3[_0x3dd1f7(0x155)]={});let _0x41a9c0=[],_0x47217a=_0x4ab57b[_0x3dd1f7(0x1d3)]||_0x47b4a3[_0x3dd1f7(0x155)][_0x3dd1f7(0x1d3)]?_0x1f3b36:_0x1dceca,_0x812597=_0x5b9e41=>{var _0x38d60a=_0x3dd1f7;let _0x12f7c6={};return _0x12f7c6[_0x38d60a(0x19a)]=_0x5b9e41['props'],_0x12f7c6['elements']=_0x5b9e41[_0x38d60a(0x1e9)],_0x12f7c6[_0x38d60a(0x1b5)]=_0x5b9e41[_0x38d60a(0x1b5)],_0x12f7c6[_0x38d60a(0x131)]=_0x5b9e41[_0x38d60a(0x131)],_0x12f7c6[_0x38d60a(0x1e8)]=_0x5b9e41['autoExpandLimit'],_0x12f7c6[_0x38d60a(0xf9)]=_0x5b9e41[_0x38d60a(0xf9)],_0x12f7c6[_0x38d60a(0x10a)]=!0x1,_0x12f7c6[_0x38d60a(0x195)]=!_0x5778aa,_0x12f7c6[_0x38d60a(0x1b3)]=0x1,_0x12f7c6[_0x38d60a(0x132)]=0x0,_0x12f7c6[_0x38d60a(0x157)]=_0x38d60a(0x1b8),_0x12f7c6[_0x38d60a(0x1e7)]=_0x38d60a(0x111),_0x12f7c6['autoExpand']=!0x0,_0x12f7c6[_0x38d60a(0x10f)]=[],_0x12f7c6[_0x38d60a(0x17f)]=0x0,_0x12f7c6[_0x38d60a(0x10b)]=!0x0,_0x12f7c6[_0x38d60a(0x171)]=0x0,_0x12f7c6[_0x38d60a(0x13e)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x12f7c6;};for(var _0x2a0618=0x0;_0x2a0618<_0x4abf5c['length'];_0x2a0618++)_0x41a9c0['push'](_0x18ccc4[_0x3dd1f7(0x12b)]({'timeNode':_0x176395===_0x3dd1f7(0x1a1)||void 0x0},_0x4abf5c[_0x2a0618],_0x812597(_0x47217a),{}));if(_0x176395===_0x3dd1f7(0x162)){let _0x20c74d=Error[_0x3dd1f7(0x110)];try{Error[_0x3dd1f7(0x110)]=0x1/0x0,_0x41a9c0[_0x3dd1f7(0x15d)](_0x18ccc4['serialize']({'stackNode':!0x0},new Error()[_0x3dd1f7(0x1b1)],_0x812597(_0x47217a),{'strLength':0x1/0x0}));}finally{Error[_0x3dd1f7(0x110)]=_0x20c74d;}}return{'method':_0x3dd1f7(0x199),'version':_0x12d0f9,'args':[{'ts':_0x2c48c4,'session':_0x5d9fe0,'args':_0x41a9c0,'id':_0xcbe616,'context':_0x235907}]};}catch(_0x4d9b1d){return{'method':_0x3dd1f7(0x199),'version':_0x12d0f9,'args':[{'ts':_0x2c48c4,'session':_0x5d9fe0,'args':[{'type':_0x3dd1f7(0x147),'error':_0x4d9b1d&&_0x4d9b1d['message']}],'id':_0xcbe616,'context':_0x235907}]};}finally{try{if(_0x4ab57b&&_0x106dfb){let _0x555fcf=_0x27c00b();_0x4ab57b['count']++,_0x4ab57b[_0x3dd1f7(0x1a1)]+=_0x454b9c(_0x106dfb,_0x555fcf),_0x4ab57b['ts']=_0x555fcf,_0x47b4a3['hits'][_0x3dd1f7(0x11e)]++,_0x47b4a3[_0x3dd1f7(0x155)][_0x3dd1f7(0x1a1)]+=_0x454b9c(_0x106dfb,_0x555fcf),_0x47b4a3['hits']['ts']=_0x555fcf,(_0x4ab57b[_0x3dd1f7(0x11e)]>0x32||_0x4ab57b['time']>0x64)&&(_0x4ab57b['reduceLimits']=!0x0),(_0x47b4a3[_0x3dd1f7(0x155)][_0x3dd1f7(0x11e)]>0x3e8||_0x47b4a3['hits'][_0x3dd1f7(0x1a1)]>0x12c)&&(_0x47b4a3[_0x3dd1f7(0x155)][_0x3dd1f7(0x1d3)]=!0x0);}}catch{}}}return _0x6abbc5;}function _0x1805(_0x28250a,_0x14b480){var _0x3c8e4d=_0x3c8e();return _0x1805=function(_0x1805c9,_0xca968){_0x1805c9=_0x1805c9-0xf7;var _0x1cddad=_0x3c8e4d[_0x1805c9];return _0x1cddad;},_0x1805(_0x28250a,_0x14b480);}((_0x46169b,_0x5858f9,_0x56773d,_0x2d6e27,_0x293c90,_0x157139,_0xaf8b4f,_0x2c90f5,_0x24e7cc,_0x59fff1,_0x288f47)=>{var _0x87c4ad=_0x10c22d;if(_0x46169b[_0x87c4ad(0x13f)])return _0x46169b[_0x87c4ad(0x13f)];if(!X(_0x46169b,_0x2c90f5,_0x293c90))return _0x46169b[_0x87c4ad(0x13f)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x46169b[_0x87c4ad(0x13f)];let _0x2018cd=b(_0x46169b),_0x555629=_0x2018cd[_0x87c4ad(0x1e4)],_0xa0970=_0x2018cd[_0x87c4ad(0x1d7)],_0x39fe2e=_0x2018cd[_0x87c4ad(0x190)],_0x281350={'hits':{},'ts':{}},_0x1a6de8=H(_0x46169b,_0x24e7cc,_0x281350,_0x157139),_0x203ffb=_0x41f599=>{_0x281350['ts'][_0x41f599]=_0xa0970();},_0x1ad595=(_0x55aabd,_0x289b76)=>{var _0x48d315=_0x87c4ad;let _0x2be956=_0x281350['ts'][_0x289b76];if(delete _0x281350['ts'][_0x289b76],_0x2be956){let _0x323c4f=_0x555629(_0x2be956,_0xa0970());_0x2239dd(_0x1a6de8(_0x48d315(0x1a1),_0x55aabd,_0x39fe2e(),_0x3b944d,[_0x323c4f],_0x289b76));}},_0x406fd7=_0xcd69d8=>{var _0x5391aa=_0x87c4ad,_0x1df9bb;return _0x293c90==='next.js'&&_0x46169b['origin']&&((_0x1df9bb=_0xcd69d8==null?void 0x0:_0xcd69d8[_0x5391aa(0x18e)])==null?void 0x0:_0x1df9bb[_0x5391aa(0x1b2)])&&(_0xcd69d8['args'][0x0][_0x5391aa(0x16b)]=_0x46169b[_0x5391aa(0x16b)]),_0xcd69d8;};_0x46169b[_0x87c4ad(0x13f)]={'consoleLog':(_0x1ea7a4,_0x57464a)=>{var _0x7e49=_0x87c4ad;_0x46169b['console'][_0x7e49(0x199)][_0x7e49(0x154)]!==_0x7e49(0x127)&&_0x2239dd(_0x1a6de8('log',_0x1ea7a4,_0x39fe2e(),_0x3b944d,_0x57464a));},'consoleTrace':(_0x4bf400,_0x257ddb)=>{var _0x3534bf=_0x87c4ad;_0x46169b[_0x3534bf(0x1d9)][_0x3534bf(0x199)]['name']!==_0x3534bf(0x15c)&&_0x2239dd(_0x406fd7(_0x1a6de8(_0x3534bf(0x162),_0x4bf400,_0x39fe2e(),_0x3b944d,_0x257ddb)));},'consoleTime':_0x4d767f=>{_0x203ffb(_0x4d767f);},'consoleTimeEnd':(_0x546502,_0x422124)=>{_0x1ad595(_0x422124,_0x546502);},'autoLog':(_0x21b850,_0x21e9e9)=>{_0x2239dd(_0x1a6de8('log',_0x21e9e9,_0x39fe2e(),_0x3b944d,[_0x21b850]));},'autoLogMany':(_0x4090e4,_0x3e59ea)=>{_0x2239dd(_0x1a6de8('log',_0x4090e4,_0x39fe2e(),_0x3b944d,_0x3e59ea));},'autoTrace':(_0x299872,_0x289f3c)=>{_0x2239dd(_0x406fd7(_0x1a6de8('trace',_0x289f3c,_0x39fe2e(),_0x3b944d,[_0x299872])));},'autoTraceMany':(_0x3b4c0a,_0x1d149e)=>{var _0x255af6=_0x87c4ad;_0x2239dd(_0x406fd7(_0x1a6de8(_0x255af6(0x162),_0x3b4c0a,_0x39fe2e(),_0x3b944d,_0x1d149e)));},'autoTime':(_0x2a3eda,_0x44af2f,_0x3aa9ae)=>{_0x203ffb(_0x3aa9ae);},'autoTimeEnd':(_0x251585,_0x1b87a1,_0x21ade7)=>{_0x1ad595(_0x1b87a1,_0x21ade7);},'coverage':_0x5af090=>{var _0x2aed32=_0x87c4ad;_0x2239dd({'method':_0x2aed32(0xfb),'version':_0x157139,'args':[{'id':_0x5af090}]});}};let _0x2239dd=q(_0x46169b,_0x5858f9,_0x56773d,_0x2d6e27,_0x293c90,_0x59fff1,_0x288f47),_0x3b944d=_0x46169b[_0x87c4ad(0x161)];return _0x46169b[_0x87c4ad(0x13f)];})(globalThis,_0x10c22d(0x118),_0x10c22d(0x153),_0x10c22d(0x192),_0x10c22d(0x1aa),_0x10c22d(0x183),_0x10c22d(0x167),[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-061\",\"172.27.27.79\"],'','',_0x10c22d(0x145));");
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
=======
>>>>>>> aed693ea0995fe68224c7d13b272087e948a897d

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