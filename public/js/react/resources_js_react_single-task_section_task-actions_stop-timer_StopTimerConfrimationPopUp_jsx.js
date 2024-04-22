"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_single-task_section_task-actions_stop-timer_StopTimerConfrimationPopUp_jsx"],{

/***/ "./resources/js/react/single-task/components/DurationTimer.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/react/single-task/components/DurationTimer.jsx ***!
  \*********************************************************************/
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

/***/ "./resources/js/react/single-task/section/task-actions/stop-timer/StopTimerConfrimationPopUp.jsx":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/stop-timer/StopTimerConfrimationPopUp.jsx ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _options_OptionOne__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options/OptionOne */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionOne.jsx");
/* harmony import */ var _options_OptionTwo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./options/OptionTwo */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionTwo.jsx");
/* harmony import */ var _options_OptionThree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options/OptionThree */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionThree.jsx");
/* harmony import */ var _options_OptionFour__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./options/OptionFour */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionFour.jsx");
/* harmony import */ var _options_OptionFive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./options/OptionFive */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionFive.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _services_api_SingleTaskPageApi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../services/api/SingleTaskPageApi */ "./resources/js/react/services/api/SingleTaskPageApi.js");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _options_OptionSix__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./options/OptionSix */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionSix.jsx");
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
      return (/* eslint-disable */(_console = console).log.apply(_console, _toConsumableArray(oo_oo("1637561646_55_22_55_38_4", err)))
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
            children: [" ", Math.floor((trackTime === null || trackTime === void 0 ? void 0 : trackTime.target_time) / 60), " hours "]
          }), " and ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("span", {
            className: "font-weight-bold",
            children: [" ", Math.floor((trackTime === null || trackTime === void 0 ? void 0 : trackTime.target_time) % 60), " minutes"]
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

/***/ "./resources/js/react/single-task/section/task-actions/stop-timer/options/DidNotWorkForAFewHours.jsx":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/stop-timer/options/DidNotWorkForAFewHours.jsx ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_DurationTimer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/DurationTimer */ "./resources/js/react/single-task/components/DurationTimer.jsx");
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

/***/ "./resources/js/react/single-task/section/task-actions/stop-timer/options/LateExplanationOption.jsx":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/stop-timer/options/LateExplanationOption.jsx ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
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

/***/ "./resources/js/react/single-task/section/task-actions/stop-timer/options/LeaveExplanationOption.jsx":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/stop-timer/options/LeaveExplanationOption.jsx ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var LeaveExplanationOption = function LeaveExplanationOption(_ref) {
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
  var handleSubmission = function handleSubmission(e) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LeaveExplanationOption);

/***/ }),

/***/ "./resources/js/react/single-task/section/task-actions/stop-timer/options/LeavingEarlyExplainationOption.jsx":
/*!*******************************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/stop-timer/options/LeavingEarlyExplainationOption.jsx ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
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

/***/ "./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionFive.jsx":
/*!***********************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionFive.jsx ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_DurationTimer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/DurationTimer */ "./resources/js/react/single-task/components/DurationTimer.jsx");
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
  return __webpack_require__.e(/*! import() */ "resources_js_react_single-task_section_task-actions_stop-timer_options_DevloperTaskSelectionM-ebd809").then(__webpack_require__.bind(__webpack_require__, /*! ./DevloperTaskSelectionMenu */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/DevloperTaskSelectionMenu.jsx"));
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

/***/ "./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionFour.jsx":
/*!***********************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionFour.jsx ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var ProjectSelectionList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_single-task_section_task-actions_stop-timer_options_ProjectSelectionList_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ./ProjectSelectionList */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/ProjectSelectionList.jsx"));
});
var UserSelectionList = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./UserSelectionList */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/UserSelectionList.jsx"));
});
var DeveloperTaskSelectionMenu = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_react_single-task_section_task-actions_stop-timer_options_DevloperTaskSelectionM-ebd809").then(__webpack_require__.bind(__webpack_require__, /*! ./DevloperTaskSelectionMenu */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/DevloperTaskSelectionMenu.jsx"));
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
  var isValid = function isValid() {
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
    if (activeProjectDropdown && !task) {
      err.task = "You have to pick an option.";
      errCount++;
    }
    setError(err);
    return !errCount;
  };

  // handle submission
  var handleSubmission = function handleSubmission(e) {
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
      related_to_any_project: task ? "yes" : "no",
      task_id: task ? task.id : task,
      responsible: responsible,
      client: client
    };
    if (isValid()) {
      onSubmit(data);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fill up the all required fields!",
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
              children: ["Was This Related To Any Task? ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("sup", {
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
            })]
          }), activeProjectDropdown && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              htmlFor: "",
              children: "Select the task"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "position-relative",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
                fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "w-100 bg-white py-2 pl-2 pr-1 mb-3 border d-flex align-items-center justify-content-between",
                  children: "Loading..."
                }),
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(DeveloperTaskSelectionMenu, {
                  task: task,
                  setTask: setTask
                })
              })
            }), (error === null || error === void 0 ? void 0 : error.task) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: "f-14",
              style: {
                color: 'red'
              },
              children: error === null || error === void 0 ? void 0 : error.task
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
            onClick: handleSubmission,
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

/***/ "./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionOne.jsx":
/*!**********************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionOne.jsx ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_DurationTimer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/DurationTimer */ "./resources/js/react/single-task/components/DurationTimer.jsx");
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

/***/ "./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionSix.jsx":
/*!**********************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionSix.jsx ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_DurationTimer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/DurationTimer */ "./resources/js/react/single-task/components/DurationTimer.jsx");
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

/***/ "./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionThree.jsx":
/*!************************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionThree.jsx ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LeaveExplanationOption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LeaveExplanationOption */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/LeaveExplanationOption.jsx");
/* harmony import */ var _LateExplanationOption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LateExplanationOption */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/LateExplanationOption.jsx");
/* harmony import */ var _LeavingEarlyExplainationOption__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LeavingEarlyExplainationOption */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/LeavingEarlyExplainationOption.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _DidNotWorkForAFewHours__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DidNotWorkForAFewHours */ "./resources/js/react/single-task/section/task-actions/stop-timer/options/DidNotWorkForAFewHours.jsx");
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

/***/ "./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionTwo.jsx":
/*!**********************************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/stop-timer/options/OptionTwo.jsx ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
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
//# sourceMappingURL=resources_js_react_single-task_section_task-actions_stop-timer_StopTimerConfrimationPopUp_jsx.js.map