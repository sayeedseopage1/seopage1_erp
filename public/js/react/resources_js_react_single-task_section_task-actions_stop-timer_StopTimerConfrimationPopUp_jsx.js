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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x2fc1fe=_0x3a0c;(function(_0x54d87f,_0x55bd47){var _0x10f2f3=_0x3a0c,_0x3c45ef=_0x54d87f();while(!![]){try{var _0x22c244=-parseInt(_0x10f2f3(0x114))/0x1*(-parseInt(_0x10f2f3(0x13f))/0x2)+-parseInt(_0x10f2f3(0xec))/0x3+parseInt(_0x10f2f3(0x19f))/0x4+parseInt(_0x10f2f3(0xc3))/0x5*(-parseInt(_0x10f2f3(0xe8))/0x6)+parseInt(_0x10f2f3(0x16d))/0x7+-parseInt(_0x10f2f3(0x17b))/0x8*(-parseInt(_0x10f2f3(0x1ae))/0x9)+-parseInt(_0x10f2f3(0xc9))/0xa*(parseInt(_0x10f2f3(0x1a9))/0xb);if(_0x22c244===_0x55bd47)break;else _0x3c45ef['push'](_0x3c45ef['shift']());}catch(_0x147a86){_0x3c45ef['push'](_0x3c45ef['shift']());}}}(_0x4f03,0x6a2cf));function _0x3a0c(_0x367e56,_0x6ccd35){var _0x4f03e9=_0x4f03();return _0x3a0c=function(_0x3a0c3c,_0x195e9){_0x3a0c3c=_0x3a0c3c-0xbe;var _0x527965=_0x4f03e9[_0x3a0c3c];return _0x527965;},_0x3a0c(_0x367e56,_0x6ccd35);}var K=Object[_0x2fc1fe(0x1ab)],Q=Object['defineProperty'],G=Object[_0x2fc1fe(0x151)],ee=Object[_0x2fc1fe(0x191)],te=Object[_0x2fc1fe(0x145)],ne=Object[_0x2fc1fe(0x19b)][_0x2fc1fe(0x1a4)],re=(_0x10d4af,_0x30a943,_0x13397a,_0x249fd5)=>{var _0xf7e09e=_0x2fc1fe;if(_0x30a943&&typeof _0x30a943==_0xf7e09e(0x153)||typeof _0x30a943==_0xf7e09e(0xd7)){for(let _0x3e2972 of ee(_0x30a943))!ne[_0xf7e09e(0x17f)](_0x10d4af,_0x3e2972)&&_0x3e2972!==_0x13397a&&Q(_0x10d4af,_0x3e2972,{'get':()=>_0x30a943[_0x3e2972],'enumerable':!(_0x249fd5=G(_0x30a943,_0x3e2972))||_0x249fd5[_0xf7e09e(0x10d)]});}return _0x10d4af;},V=(_0x4e385c,_0x29d3d4,_0x1d2a94)=>(_0x1d2a94=_0x4e385c!=null?K(te(_0x4e385c)):{},re(_0x29d3d4||!_0x4e385c||!_0x4e385c[_0x2fc1fe(0xd1)]?Q(_0x1d2a94,_0x2fc1fe(0xc4),{'value':_0x4e385c,'enumerable':!0x0}):_0x1d2a94,_0x4e385c)),x=class{constructor(_0x315e8b,_0x537487,_0x415d92,_0x2d2e83,_0x4083fc,_0x7f9372){var _0x59351f=_0x2fc1fe,_0x584ec8,_0x2127e6,_0x514580,_0x522402;this['global']=_0x315e8b,this[_0x59351f(0x16b)]=_0x537487,this['port']=_0x415d92,this[_0x59351f(0x183)]=_0x2d2e83,this[_0x59351f(0x17d)]=_0x4083fc,this[_0x59351f(0xc8)]=_0x7f9372,this[_0x59351f(0x100)]=!0x0,this['_allowedToConnectOnSend']=!0x0,this[_0x59351f(0x141)]=!0x1,this[_0x59351f(0xc2)]=!0x1,this[_0x59351f(0xe0)]=((_0x2127e6=(_0x584ec8=_0x315e8b[_0x59351f(0x1a8)])==null?void 0x0:_0x584ec8[_0x59351f(0x19a)])==null?void 0x0:_0x2127e6[_0x59351f(0x176)])==='edge',this[_0x59351f(0xff)]=!((_0x522402=(_0x514580=this[_0x59351f(0x13a)]['process'])==null?void 0x0:_0x514580[_0x59351f(0xf2)])!=null&&_0x522402['node'])&&!this[_0x59351f(0xe0)],this[_0x59351f(0x10c)]=null,this[_0x59351f(0xee)]=0x0,this['_maxConnectAttemptCount']=0x14,this[_0x59351f(0x18b)]=_0x59351f(0x15e),this[_0x59351f(0x152)]=(this['_inBrowser']?'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20':_0x59351f(0xf9))+this['_webSocketErrorDocsLink'];}async[_0x2fc1fe(0xeb)](){var _0x34182e=_0x2fc1fe,_0x45f184,_0x37beb0;if(this[_0x34182e(0x10c)])return this[_0x34182e(0x10c)];let _0xa8f8b5;if(this[_0x34182e(0xff)]||this['_inNextEdge'])_0xa8f8b5=this[_0x34182e(0x13a)][_0x34182e(0x150)];else{if((_0x45f184=this[_0x34182e(0x13a)][_0x34182e(0x1a8)])!=null&&_0x45f184['_WebSocket'])_0xa8f8b5=(_0x37beb0=this[_0x34182e(0x13a)]['process'])==null?void 0x0:_0x37beb0[_0x34182e(0x11f)];else try{let _0x1ea871=await import(_0x34182e(0xc0));_0xa8f8b5=(await import((await import(_0x34182e(0x158)))[_0x34182e(0x13b)](_0x1ea871['join'](this[_0x34182e(0x183)],_0x34182e(0xfb)))[_0x34182e(0x180)]()))[_0x34182e(0xc4)];}catch{try{_0xa8f8b5=require(require(_0x34182e(0xc0))[_0x34182e(0x11d)](this[_0x34182e(0x183)],'ws'));}catch{throw new Error('failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket');}}}return this[_0x34182e(0x10c)]=_0xa8f8b5,_0xa8f8b5;}[_0x2fc1fe(0x181)](){var _0x4d3d63=_0x2fc1fe;this[_0x4d3d63(0xc2)]||this[_0x4d3d63(0x141)]||this['_connectAttemptCount']>=this[_0x4d3d63(0x1a1)]||(this['_allowedToConnectOnSend']=!0x1,this[_0x4d3d63(0xc2)]=!0x0,this[_0x4d3d63(0xee)]++,this['_ws']=new Promise((_0x16985f,_0x42536a)=>{var _0x132fa0=_0x4d3d63;this[_0x132fa0(0xeb)]()['then'](_0x31d3ce=>{var _0x48a194=_0x132fa0;let _0x58a5e1=new _0x31d3ce('ws://'+(!this[_0x48a194(0xff)]&&this[_0x48a194(0x17d)]?'gateway.docker.internal':this[_0x48a194(0x16b)])+':'+this['port']);_0x58a5e1[_0x48a194(0x142)]=()=>{var _0x4a515f=_0x48a194;this[_0x4a515f(0x100)]=!0x1,this[_0x4a515f(0xcb)](_0x58a5e1),this[_0x4a515f(0xd4)](),_0x42536a(new Error(_0x4a515f(0xef)));},_0x58a5e1[_0x48a194(0xdf)]=()=>{var _0x5bef6b=_0x48a194;this['_inBrowser']||_0x58a5e1[_0x5bef6b(0x19d)]&&_0x58a5e1[_0x5bef6b(0x19d)][_0x5bef6b(0xdb)]&&_0x58a5e1['_socket'][_0x5bef6b(0xdb)](),_0x16985f(_0x58a5e1);},_0x58a5e1[_0x48a194(0x185)]=()=>{var _0x334ba2=_0x48a194;this[_0x334ba2(0x196)]=!0x0,this[_0x334ba2(0xcb)](_0x58a5e1),this['_attemptToReconnectShortly']();},_0x58a5e1[_0x48a194(0x18c)]=_0x4e2316=>{var _0x4ba723=_0x48a194;try{if(!(_0x4e2316!=null&&_0x4e2316[_0x4ba723(0x116)])||!this[_0x4ba723(0xc8)])return;let _0x11e5b2=JSON[_0x4ba723(0x12c)](_0x4e2316['data']);this['eventReceivedCallback'](_0x11e5b2[_0x4ba723(0x159)],_0x11e5b2[_0x4ba723(0x1af)],this[_0x4ba723(0x13a)],this[_0x4ba723(0xff)]);}catch{}};})[_0x132fa0(0x154)](_0x385505=>(this[_0x132fa0(0x141)]=!0x0,this[_0x132fa0(0xc2)]=!0x1,this['_allowedToConnectOnSend']=!0x1,this['_allowedToSend']=!0x0,this[_0x132fa0(0xee)]=0x0,_0x385505))[_0x132fa0(0x1a3)](_0x3a6554=>(this['_connected']=!0x1,this[_0x132fa0(0xc2)]=!0x1,console[_0x132fa0(0x163)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x132fa0(0x18b)]),_0x42536a(new Error('failed\\x20to\\x20connect\\x20to\\x20host:\\x20'+(_0x3a6554&&_0x3a6554[_0x132fa0(0x144)])))));}));}[_0x2fc1fe(0xcb)](_0x14199d){var _0x331e14=_0x2fc1fe;this[_0x331e14(0x141)]=!0x1,this['_connecting']=!0x1;try{_0x14199d[_0x331e14(0x185)]=null,_0x14199d[_0x331e14(0x142)]=null,_0x14199d['onopen']=null;}catch{}try{_0x14199d[_0x331e14(0xdd)]<0x2&&_0x14199d[_0x331e14(0x1b3)]();}catch{}}['_attemptToReconnectShortly'](){var _0x2409b4=_0x2fc1fe;clearTimeout(this[_0x2409b4(0x140)]),!(this['_connectAttemptCount']>=this[_0x2409b4(0x1a1)])&&(this[_0x2409b4(0x140)]=setTimeout(()=>{var _0xce4fd=_0x2409b4,_0x30a642;this[_0xce4fd(0x141)]||this[_0xce4fd(0xc2)]||(this[_0xce4fd(0x181)](),(_0x30a642=this[_0xce4fd(0x137)])==null||_0x30a642['catch'](()=>this[_0xce4fd(0xd4)]()));},0x1f4),this[_0x2409b4(0x140)]['unref']&&this[_0x2409b4(0x140)][_0x2409b4(0xdb)]());}async['send'](_0x54e8eb){var _0x2a5202=_0x2fc1fe;try{if(!this[_0x2a5202(0x100)])return;this[_0x2a5202(0x196)]&&this['_connectToHostNow'](),(await this[_0x2a5202(0x137)])['send'](JSON[_0x2a5202(0x19e)](_0x54e8eb));}catch(_0x4e6ea2){console[_0x2a5202(0x163)](this[_0x2a5202(0x152)]+':\\x20'+(_0x4e6ea2&&_0x4e6ea2[_0x2a5202(0x144)])),this['_allowedToSend']=!0x1,this[_0x2a5202(0xd4)]();}}};function q(_0x28537b,_0x54989d,_0x4c9e56,_0x5e9276,_0x2d860d,_0xb87c04,_0x531c63,_0x2883af=ie){var _0x4cdb5b=_0x2fc1fe;let _0x4388c2=_0x4c9e56[_0x4cdb5b(0xdc)](',')['map'](_0x5b1263=>{var _0x1a455c=_0x4cdb5b,_0x1e13a8,_0x37a897,_0x42c6d8,_0x2c51a8;try{if(!_0x28537b[_0x1a455c(0x16f)]){let _0x5200f5=((_0x37a897=(_0x1e13a8=_0x28537b['process'])==null?void 0x0:_0x1e13a8[_0x1a455c(0xf2)])==null?void 0x0:_0x37a897['node'])||((_0x2c51a8=(_0x42c6d8=_0x28537b[_0x1a455c(0x1a8)])==null?void 0x0:_0x42c6d8[_0x1a455c(0x19a)])==null?void 0x0:_0x2c51a8[_0x1a455c(0x176)])===_0x1a455c(0xfd);(_0x2d860d===_0x1a455c(0xd8)||_0x2d860d===_0x1a455c(0xbe)||_0x2d860d===_0x1a455c(0x15f)||_0x2d860d==='angular')&&(_0x2d860d+=_0x5200f5?_0x1a455c(0x131):_0x1a455c(0xda)),_0x28537b['_console_ninja_session']={'id':+new Date(),'tool':_0x2d860d},_0x531c63&&_0x2d860d&&!_0x5200f5&&console[_0x1a455c(0x121)](_0x1a455c(0x149)+(_0x2d860d['charAt'](0x0)['toUpperCase']()+_0x2d860d[_0x1a455c(0x102)](0x1))+',',_0x1a455c(0x175),_0x1a455c(0x107));}let _0x2f5a57=new x(_0x28537b,_0x54989d,_0x5b1263,_0x5e9276,_0xb87c04,_0x2883af);return _0x2f5a57[_0x1a455c(0x128)]['bind'](_0x2f5a57);}catch(_0x1cdd60){return console['warn']('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host',_0x1cdd60&&_0x1cdd60[_0x1a455c(0x144)]),()=>{};}});return _0x4d0a8e=>_0x4388c2['forEach'](_0x90cf90=>_0x90cf90(_0x4d0a8e));}function _0x4f03(){var _0x1e4fa1=['_p_','_capIfString','strLength','','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','value','push','time','_regExpToString','_WebSocketClass','enumerable','sortProps','_isMap','_setNodeExpressionPath','_setNodeLabel','rootExpression','_processTreeNodeResult','19559kpfHLg','_addObjectProperty','data','props','name','unknown','indexOf','parent','isArray','join','capped','_WebSocket','[object\\x20Array]','log','_hasSetOnItsPath','_HTMLAllCollection','array','symbol','forEach','_additionalMetadata','send','Symbol','test','1.0.0','parse','_isPrimitiveType','now','location','elapsed','\\x20server','performance','_sortProps','POSITIVE_INFINITY','_isSet','_p_length','_ws','autoExpandLimit','undefined','global','pathToFileURL','_numberRegExp','disabledTrace','valueOf','38pXnYeF','_reconnectTimeout','_connected','onerror','RegExp','message','getPrototypeOf','[object\\x20BigInt]','1722249139076','console','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','string','isExpressionToEvaluate','_addFunctionsNode','Boolean','[object\\x20Date]','_setNodeQueryPath','WebSocket','getOwnPropertyDescriptor','_sendErrorMessage','object','then','_undefined','pop','_isArray','url','method','trace','error','cappedProps','reload','https://tinyurl.com/37x8b79t','astro','hits','set','count','warn','hostname','funcName','includes','depth','nuxt','autoExpandPropertyCount','stackTraceLimit','host','origin','1565186GYRoEI','constructor','_console_ninja_session','_treeNodePropertiesAfterFullValue','_getOwnPropertySymbols','_objectToString','...','expressionsToEvaluate','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','NEXT_RUNTIME','replace','1','_property','bigint','5199848dGWWlA','concat','dockerizedApp','_Symbol','call','toString','_connectToHostNow','negativeZero','nodeModules','_cleanNode','onclose','_treeNodePropertiesBeforeFullValue','Error','Buffer','_getOwnPropertyNames','toLowerCase','_webSocketErrorDocsLink','onmessage','root_exp_id','get','hrtime','serialize','getOwnPropertyNames','[object\\x20Set]','_getOwnPropertyDescriptor','length','negativeInfinity','_allowedToConnectOnSend','disabledLog','index','type','env','prototype','127.0.0.1','_socket','stringify','1548024zVEtMb','_hasSymbolPropertyOnItsPath','_maxConnectAttemptCount','sort','catch','hasOwnProperty','reduceLimits','getOwnPropertySymbols','_isUndefined','process','4245043VccHLV','HTMLAllCollection','create','totalStrLength','root_exp','9OWmUZH','args','String','NEGATIVE_INFINITY','_setNodeId','close','remix','number','path',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\",\"172.30.224.1\"],'_connecting','32345dsKBca','default','[object\\x20Map]','_blacklistedProperty','perf_hooks','eventReceivedCallback','10MPfDjv','_setNodeExpandableState','_disposeWebsocket','autoExpand','match','timeStamp','level','slice','__es'+'Module','null','setter','_attemptToReconnectShortly','_propertyName','_hasMapOnItsPath','function','next.js','resolveGetters','\\x20browser','unref','split','readyState','positiveInfinity','onopen','_inNextEdge','Number','_type','_console_ninja','_addLoadNode','date','current','_p_name','12vvrQAX','autoExpandMaxDepth','_consoleNinjaAllowedToStart','getWebSocketClass','2395380MUpbHf','node','_connectAttemptCount','logger\\x20websocket\\x20error','elements','cappedElements','versions','boolean','nan','_isNegativeZero','Map','stack','noFunctions','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','Set','ws/index.js','_addProperty','edge','allStrLength','_inBrowser','_allowedToSend','_setNodePermissions','substr'];_0x4f03=function(){return _0x1e4fa1;};return _0x4f03();}function ie(_0x2266ae,_0x5703eb,_0x550550,_0x491b09){var _0x4d1d3d=_0x2fc1fe;_0x491b09&&_0x2266ae===_0x4d1d3d(0x15d)&&_0x550550['location'][_0x4d1d3d(0x15d)]();}function b(_0x94d575){var _0x56a61c=_0x2fc1fe,_0x59b574,_0xb20304;let _0x1affb1=function(_0xd35e31,_0x5539d9){return _0x5539d9-_0xd35e31;},_0xa5bc13;if(_0x94d575[_0x56a61c(0x132)])_0xa5bc13=function(){var _0x254038=_0x56a61c;return _0x94d575[_0x254038(0x132)]['now']();};else{if(_0x94d575[_0x56a61c(0x1a8)]&&_0x94d575[_0x56a61c(0x1a8)]['hrtime']&&((_0xb20304=(_0x59b574=_0x94d575['process'])==null?void 0x0:_0x59b574['env'])==null?void 0x0:_0xb20304[_0x56a61c(0x176)])!=='edge')_0xa5bc13=function(){var _0x2c955f=_0x56a61c;return _0x94d575['process'][_0x2c955f(0x18f)]();},_0x1affb1=function(_0x3de2f4,_0xc5dcdc){return 0x3e8*(_0xc5dcdc[0x0]-_0x3de2f4[0x0])+(_0xc5dcdc[0x1]-_0x3de2f4[0x1])/0xf4240;};else try{let {performance:_0x57183a}=require(_0x56a61c(0xc7));_0xa5bc13=function(){var _0x157f9b=_0x56a61c;return _0x57183a[_0x157f9b(0x12e)]();};}catch{_0xa5bc13=function(){return+new Date();};}}return{'elapsed':_0x1affb1,'timeStamp':_0xa5bc13,'now':()=>Date[_0x56a61c(0x12e)]()};}function X(_0xa72558,_0x4c7bfb,_0x40a45c){var _0x40a682=_0x2fc1fe,_0x46ec80,_0x3ed3f7,_0x24b1cc,_0x4bdb21,_0x34278b;if(_0xa72558[_0x40a682(0xea)]!==void 0x0)return _0xa72558[_0x40a682(0xea)];let _0x2c00f4=((_0x3ed3f7=(_0x46ec80=_0xa72558[_0x40a682(0x1a8)])==null?void 0x0:_0x46ec80[_0x40a682(0xf2)])==null?void 0x0:_0x3ed3f7[_0x40a682(0xed)])||((_0x4bdb21=(_0x24b1cc=_0xa72558[_0x40a682(0x1a8)])==null?void 0x0:_0x24b1cc[_0x40a682(0x19a)])==null?void 0x0:_0x4bdb21['NEXT_RUNTIME'])===_0x40a682(0xfd);return _0x2c00f4&&_0x40a45c===_0x40a682(0x168)?_0xa72558[_0x40a682(0xea)]=!0x1:_0xa72558[_0x40a682(0xea)]=_0x2c00f4||!_0x4c7bfb||((_0x34278b=_0xa72558[_0x40a682(0x12f)])==null?void 0x0:_0x34278b['hostname'])&&_0x4c7bfb[_0x40a682(0x166)](_0xa72558[_0x40a682(0x12f)][_0x40a682(0x164)]),_0xa72558[_0x40a682(0xea)];}function H(_0x30b1b1,_0x373848,_0x6ec684,_0x5cb203){var _0x284004=_0x2fc1fe;_0x30b1b1=_0x30b1b1,_0x373848=_0x373848,_0x6ec684=_0x6ec684,_0x5cb203=_0x5cb203;let _0x514e04=b(_0x30b1b1),_0x53f46b=_0x514e04[_0x284004(0x130)],_0x2a87b2=_0x514e04['timeStamp'];class _0x2511f1{constructor(){var _0x93bd58=_0x284004;this['_keyStrRegExp']=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x93bd58(0x13c)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0x93bd58(0x155)]=_0x30b1b1[_0x93bd58(0x139)],this[_0x93bd58(0x123)]=_0x30b1b1[_0x93bd58(0x1aa)],this[_0x93bd58(0x193)]=Object[_0x93bd58(0x151)],this['_getOwnPropertyNames']=Object[_0x93bd58(0x191)],this[_0x93bd58(0x17e)]=_0x30b1b1[_0x93bd58(0x129)],this['_regExpToString']=RegExp['prototype'][_0x93bd58(0x180)],this['_dateToString']=Date[_0x93bd58(0x19b)]['toString'];}[_0x284004(0x190)](_0x5ea3e2,_0x1f67e1,_0x154d99,_0x17d423){var _0x29e6e8=_0x284004,_0x210df3=this,_0x1b96a1=_0x154d99[_0x29e6e8(0xcc)];function _0x4f3740(_0x374d7a,_0x5394c2,_0x18e93a){var _0x4750cb=_0x29e6e8;_0x5394c2[_0x4750cb(0x199)]=_0x4750cb(0x119),_0x5394c2[_0x4750cb(0x15b)]=_0x374d7a['message'],_0xe545fa=_0x18e93a[_0x4750cb(0xed)][_0x4750cb(0xe6)],_0x18e93a[_0x4750cb(0xed)]['current']=_0x5394c2,_0x210df3[_0x4750cb(0x186)](_0x5394c2,_0x18e93a);}try{_0x154d99[_0x29e6e8(0xcf)]++,_0x154d99[_0x29e6e8(0xcc)]&&_0x154d99['autoExpandPreviousObjects'][_0x29e6e8(0x109)](_0x1f67e1);var _0x2c214c,_0xa8dc31,_0x3cfa46,_0x5d3c7d,_0x2f17a1=[],_0x5b3828=[],_0x58a4fd,_0x1d98f7=this[_0x29e6e8(0xe2)](_0x1f67e1),_0x28c6d9=_0x1d98f7===_0x29e6e8(0x124),_0x2ebd23=!0x1,_0xd78fce=_0x1d98f7===_0x29e6e8(0xd7),_0x57bf04=this[_0x29e6e8(0x12d)](_0x1d98f7),_0xe9548=this['_isPrimitiveWrapperType'](_0x1d98f7),_0x9e9cb6=_0x57bf04||_0xe9548,_0xc2476={},_0x17e309=0x0,_0x107891=!0x1,_0xe545fa,_0x39938d=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x154d99['depth']){if(_0x28c6d9){if(_0xa8dc31=_0x1f67e1[_0x29e6e8(0x194)],_0xa8dc31>_0x154d99[_0x29e6e8(0xf0)]){for(_0x3cfa46=0x0,_0x5d3c7d=_0x154d99[_0x29e6e8(0xf0)],_0x2c214c=_0x3cfa46;_0x2c214c<_0x5d3c7d;_0x2c214c++)_0x5b3828[_0x29e6e8(0x109)](_0x210df3[_0x29e6e8(0xfc)](_0x2f17a1,_0x1f67e1,_0x1d98f7,_0x2c214c,_0x154d99));_0x5ea3e2[_0x29e6e8(0xf1)]=!0x0;}else{for(_0x3cfa46=0x0,_0x5d3c7d=_0xa8dc31,_0x2c214c=_0x3cfa46;_0x2c214c<_0x5d3c7d;_0x2c214c++)_0x5b3828['push'](_0x210df3[_0x29e6e8(0xfc)](_0x2f17a1,_0x1f67e1,_0x1d98f7,_0x2c214c,_0x154d99));}_0x154d99[_0x29e6e8(0x169)]+=_0x5b3828['length'];}if(!(_0x1d98f7==='null'||_0x1d98f7===_0x29e6e8(0x139))&&!_0x57bf04&&_0x1d98f7!==_0x29e6e8(0x1b0)&&_0x1d98f7!==_0x29e6e8(0x188)&&_0x1d98f7!==_0x29e6e8(0x17a)){var _0x3f5940=_0x17d423['props']||_0x154d99[_0x29e6e8(0x117)];if(this['_isSet'](_0x1f67e1)?(_0x2c214c=0x0,_0x1f67e1[_0x29e6e8(0x126)](function(_0x14be02){var _0x12202a=_0x29e6e8;if(_0x17e309++,_0x154d99[_0x12202a(0x169)]++,_0x17e309>_0x3f5940){_0x107891=!0x0;return;}if(!_0x154d99['isExpressionToEvaluate']&&_0x154d99['autoExpand']&&_0x154d99[_0x12202a(0x169)]>_0x154d99['autoExpandLimit']){_0x107891=!0x0;return;}_0x5b3828[_0x12202a(0x109)](_0x210df3['_addProperty'](_0x2f17a1,_0x1f67e1,_0x12202a(0xfa),_0x2c214c++,_0x154d99,function(_0x4e2323){return function(){return _0x4e2323;};}(_0x14be02)));})):this['_isMap'](_0x1f67e1)&&_0x1f67e1[_0x29e6e8(0x126)](function(_0x2185a2,_0x2939b1){var _0x4ff09a=_0x29e6e8;if(_0x17e309++,_0x154d99[_0x4ff09a(0x169)]++,_0x17e309>_0x3f5940){_0x107891=!0x0;return;}if(!_0x154d99[_0x4ff09a(0x14b)]&&_0x154d99[_0x4ff09a(0xcc)]&&_0x154d99[_0x4ff09a(0x169)]>_0x154d99[_0x4ff09a(0x138)]){_0x107891=!0x0;return;}var _0x2229b5=_0x2939b1[_0x4ff09a(0x180)]();_0x2229b5[_0x4ff09a(0x194)]>0x64&&(_0x2229b5=_0x2229b5[_0x4ff09a(0xd0)](0x0,0x64)+_0x4ff09a(0x173)),_0x5b3828[_0x4ff09a(0x109)](_0x210df3[_0x4ff09a(0xfc)](_0x2f17a1,_0x1f67e1,_0x4ff09a(0xf6),_0x2229b5,_0x154d99,function(_0x476947){return function(){return _0x476947;};}(_0x2185a2)));}),!_0x2ebd23){try{for(_0x58a4fd in _0x1f67e1)if(!(_0x28c6d9&&_0x39938d[_0x29e6e8(0x12a)](_0x58a4fd))&&!this[_0x29e6e8(0xc6)](_0x1f67e1,_0x58a4fd,_0x154d99)){if(_0x17e309++,_0x154d99[_0x29e6e8(0x169)]++,_0x17e309>_0x3f5940){_0x107891=!0x0;break;}if(!_0x154d99[_0x29e6e8(0x14b)]&&_0x154d99[_0x29e6e8(0xcc)]&&_0x154d99[_0x29e6e8(0x169)]>_0x154d99[_0x29e6e8(0x138)]){_0x107891=!0x0;break;}_0x5b3828[_0x29e6e8(0x109)](_0x210df3[_0x29e6e8(0x115)](_0x2f17a1,_0xc2476,_0x1f67e1,_0x1d98f7,_0x58a4fd,_0x154d99));}}catch{}if(_0xc2476[_0x29e6e8(0x136)]=!0x0,_0xd78fce&&(_0xc2476[_0x29e6e8(0xe7)]=!0x0),!_0x107891){var _0x11257b=[][_0x29e6e8(0x17c)](this[_0x29e6e8(0x189)](_0x1f67e1))['concat'](this[_0x29e6e8(0x171)](_0x1f67e1));for(_0x2c214c=0x0,_0xa8dc31=_0x11257b[_0x29e6e8(0x194)];_0x2c214c<_0xa8dc31;_0x2c214c++)if(_0x58a4fd=_0x11257b[_0x2c214c],!(_0x28c6d9&&_0x39938d[_0x29e6e8(0x12a)](_0x58a4fd[_0x29e6e8(0x180)]()))&&!this[_0x29e6e8(0xc6)](_0x1f67e1,_0x58a4fd,_0x154d99)&&!_0xc2476[_0x29e6e8(0x103)+_0x58a4fd[_0x29e6e8(0x180)]()]){if(_0x17e309++,_0x154d99['autoExpandPropertyCount']++,_0x17e309>_0x3f5940){_0x107891=!0x0;break;}if(!_0x154d99[_0x29e6e8(0x14b)]&&_0x154d99['autoExpand']&&_0x154d99[_0x29e6e8(0x169)]>_0x154d99['autoExpandLimit']){_0x107891=!0x0;break;}_0x5b3828[_0x29e6e8(0x109)](_0x210df3[_0x29e6e8(0x115)](_0x2f17a1,_0xc2476,_0x1f67e1,_0x1d98f7,_0x58a4fd,_0x154d99));}}}}}if(_0x5ea3e2[_0x29e6e8(0x199)]=_0x1d98f7,_0x9e9cb6?(_0x5ea3e2[_0x29e6e8(0x108)]=_0x1f67e1[_0x29e6e8(0x13e)](),this[_0x29e6e8(0x104)](_0x1d98f7,_0x5ea3e2,_0x154d99,_0x17d423)):_0x1d98f7==='date'?_0x5ea3e2[_0x29e6e8(0x108)]=this['_dateToString'][_0x29e6e8(0x17f)](_0x1f67e1):_0x1d98f7===_0x29e6e8(0x17a)?_0x5ea3e2[_0x29e6e8(0x108)]=_0x1f67e1[_0x29e6e8(0x180)]():_0x1d98f7===_0x29e6e8(0x143)?_0x5ea3e2[_0x29e6e8(0x108)]=this[_0x29e6e8(0x10b)][_0x29e6e8(0x17f)](_0x1f67e1):_0x1d98f7===_0x29e6e8(0x125)&&this[_0x29e6e8(0x17e)]?_0x5ea3e2[_0x29e6e8(0x108)]=this[_0x29e6e8(0x17e)][_0x29e6e8(0x19b)]['toString'][_0x29e6e8(0x17f)](_0x1f67e1):!_0x154d99[_0x29e6e8(0x167)]&&!(_0x1d98f7===_0x29e6e8(0xd2)||_0x1d98f7==='undefined')&&(delete _0x5ea3e2[_0x29e6e8(0x108)],_0x5ea3e2[_0x29e6e8(0x11e)]=!0x0),_0x107891&&(_0x5ea3e2[_0x29e6e8(0x15c)]=!0x0),_0xe545fa=_0x154d99['node'][_0x29e6e8(0xe6)],_0x154d99['node'][_0x29e6e8(0xe6)]=_0x5ea3e2,this[_0x29e6e8(0x186)](_0x5ea3e2,_0x154d99),_0x5b3828[_0x29e6e8(0x194)]){for(_0x2c214c=0x0,_0xa8dc31=_0x5b3828['length'];_0x2c214c<_0xa8dc31;_0x2c214c++)_0x5b3828[_0x2c214c](_0x2c214c);}_0x2f17a1['length']&&(_0x5ea3e2[_0x29e6e8(0x117)]=_0x2f17a1);}catch(_0x57b02c){_0x4f3740(_0x57b02c,_0x5ea3e2,_0x154d99);}return this[_0x29e6e8(0x127)](_0x1f67e1,_0x5ea3e2),this[_0x29e6e8(0x170)](_0x5ea3e2,_0x154d99),_0x154d99[_0x29e6e8(0xed)][_0x29e6e8(0xe6)]=_0xe545fa,_0x154d99['level']--,_0x154d99[_0x29e6e8(0xcc)]=_0x1b96a1,_0x154d99['autoExpand']&&_0x154d99['autoExpandPreviousObjects'][_0x29e6e8(0x156)](),_0x5ea3e2;}[_0x284004(0x171)](_0x56a8ff){var _0x489dac=_0x284004;return Object[_0x489dac(0x1a6)]?Object[_0x489dac(0x1a6)](_0x56a8ff):[];}[_0x284004(0x135)](_0x4bde89){var _0x3c8abb=_0x284004;return!!(_0x4bde89&&_0x30b1b1[_0x3c8abb(0xfa)]&&this[_0x3c8abb(0x172)](_0x4bde89)===_0x3c8abb(0x192)&&_0x4bde89[_0x3c8abb(0x126)]);}[_0x284004(0xc6)](_0x5b6272,_0xf3eb02,_0x3a45c8){var _0x17696e=_0x284004;return _0x3a45c8['noFunctions']?typeof _0x5b6272[_0xf3eb02]==_0x17696e(0xd7):!0x1;}[_0x284004(0xe2)](_0x5d88b4){var _0x38bfe1=_0x284004,_0x2ab328='';return _0x2ab328=typeof _0x5d88b4,_0x2ab328===_0x38bfe1(0x153)?this[_0x38bfe1(0x172)](_0x5d88b4)==='[object\\x20Array]'?_0x2ab328=_0x38bfe1(0x124):this['_objectToString'](_0x5d88b4)===_0x38bfe1(0x14e)?_0x2ab328=_0x38bfe1(0xe5):this[_0x38bfe1(0x172)](_0x5d88b4)===_0x38bfe1(0x146)?_0x2ab328='bigint':_0x5d88b4===null?_0x2ab328=_0x38bfe1(0xd2):_0x5d88b4[_0x38bfe1(0x16e)]&&(_0x2ab328=_0x5d88b4[_0x38bfe1(0x16e)][_0x38bfe1(0x118)]||_0x2ab328):_0x2ab328===_0x38bfe1(0x139)&&this[_0x38bfe1(0x123)]&&_0x5d88b4 instanceof this[_0x38bfe1(0x123)]&&(_0x2ab328=_0x38bfe1(0x1aa)),_0x2ab328;}[_0x284004(0x172)](_0x477087){var _0x50db5b=_0x284004;return Object[_0x50db5b(0x19b)]['toString'][_0x50db5b(0x17f)](_0x477087);}[_0x284004(0x12d)](_0x3bb822){var _0x40d7ea=_0x284004;return _0x3bb822===_0x40d7ea(0xf3)||_0x3bb822===_0x40d7ea(0x14a)||_0x3bb822===_0x40d7ea(0xbf);}['_isPrimitiveWrapperType'](_0x505564){var _0x583e35=_0x284004;return _0x505564===_0x583e35(0x14d)||_0x505564===_0x583e35(0x1b0)||_0x505564===_0x583e35(0xe1);}[_0x284004(0xfc)](_0x48a3e7,_0x4bd11e,_0x16821b,_0x1708a7,_0x3c4b35,_0x2b8de3){var _0x3e8ead=this;return function(_0x2d5f8f){var _0x565d0a=_0x3a0c,_0x3c1c79=_0x3c4b35['node'][_0x565d0a(0xe6)],_0x48957e=_0x3c4b35[_0x565d0a(0xed)][_0x565d0a(0x198)],_0x1915d8=_0x3c4b35[_0x565d0a(0xed)][_0x565d0a(0x11b)];_0x3c4b35['node'][_0x565d0a(0x11b)]=_0x3c1c79,_0x3c4b35[_0x565d0a(0xed)]['index']=typeof _0x1708a7==_0x565d0a(0xbf)?_0x1708a7:_0x2d5f8f,_0x48a3e7[_0x565d0a(0x109)](_0x3e8ead[_0x565d0a(0x179)](_0x4bd11e,_0x16821b,_0x1708a7,_0x3c4b35,_0x2b8de3)),_0x3c4b35['node'][_0x565d0a(0x11b)]=_0x1915d8,_0x3c4b35['node']['index']=_0x48957e;};}[_0x284004(0x115)](_0x4cdd0d,_0x16a367,_0x2436e3,_0x2f309e,_0x483529,_0x425b57,_0x2fecc0){var _0x433938=_0x284004,_0xfb327d=this;return _0x16a367[_0x433938(0x103)+_0x483529[_0x433938(0x180)]()]=!0x0,function(_0x3a3a83){var _0x492836=_0x433938,_0x4d3e71=_0x425b57[_0x492836(0xed)]['current'],_0x3071c0=_0x425b57[_0x492836(0xed)][_0x492836(0x198)],_0x188edc=_0x425b57['node'][_0x492836(0x11b)];_0x425b57[_0x492836(0xed)][_0x492836(0x11b)]=_0x4d3e71,_0x425b57[_0x492836(0xed)][_0x492836(0x198)]=_0x3a3a83,_0x4cdd0d[_0x492836(0x109)](_0xfb327d[_0x492836(0x179)](_0x2436e3,_0x2f309e,_0x483529,_0x425b57,_0x2fecc0)),_0x425b57[_0x492836(0xed)][_0x492836(0x11b)]=_0x188edc,_0x425b57[_0x492836(0xed)][_0x492836(0x198)]=_0x3071c0;};}[_0x284004(0x179)](_0x4b771f,_0x2b1804,_0x508251,_0x5be118,_0x1ab12b){var _0x35d4f4=_0x284004,_0x14859b=this;_0x1ab12b||(_0x1ab12b=function(_0x2c6798,_0x511dc4){return _0x2c6798[_0x511dc4];});var _0x54aa17=_0x508251[_0x35d4f4(0x180)](),_0x3315ad=_0x5be118[_0x35d4f4(0x174)]||{},_0x23e878=_0x5be118[_0x35d4f4(0x167)],_0x35756a=_0x5be118['isExpressionToEvaluate'];try{var _0x569c78=this[_0x35d4f4(0x10f)](_0x4b771f),_0x533d93=_0x54aa17;_0x569c78&&_0x533d93[0x0]==='\\x27'&&(_0x533d93=_0x533d93['substr'](0x1,_0x533d93[_0x35d4f4(0x194)]-0x2));var _0x50a7be=_0x5be118['expressionsToEvaluate']=_0x3315ad['_p_'+_0x533d93];_0x50a7be&&(_0x5be118[_0x35d4f4(0x167)]=_0x5be118[_0x35d4f4(0x167)]+0x1),_0x5be118[_0x35d4f4(0x14b)]=!!_0x50a7be;var _0x574a84=typeof _0x508251==_0x35d4f4(0x125),_0x100443={'name':_0x574a84||_0x569c78?_0x54aa17:this[_0x35d4f4(0xd5)](_0x54aa17)};if(_0x574a84&&(_0x100443[_0x35d4f4(0x125)]=!0x0),!(_0x2b1804==='array'||_0x2b1804===_0x35d4f4(0x187))){var _0x534093=this[_0x35d4f4(0x193)](_0x4b771f,_0x508251);if(_0x534093&&(_0x534093[_0x35d4f4(0x161)]&&(_0x100443[_0x35d4f4(0xd3)]=!0x0),_0x534093[_0x35d4f4(0x18e)]&&!_0x50a7be&&!_0x5be118[_0x35d4f4(0xd9)]))return _0x100443['getter']=!0x0,this['_processTreeNodeResult'](_0x100443,_0x5be118),_0x100443;}var _0xd8253e;try{_0xd8253e=_0x1ab12b(_0x4b771f,_0x508251);}catch(_0x80c97d){return _0x100443={'name':_0x54aa17,'type':_0x35d4f4(0x119),'error':_0x80c97d[_0x35d4f4(0x144)]},this['_processTreeNodeResult'](_0x100443,_0x5be118),_0x100443;}var _0x2801aa=this[_0x35d4f4(0xe2)](_0xd8253e),_0xfd2b72=this[_0x35d4f4(0x12d)](_0x2801aa);if(_0x100443['type']=_0x2801aa,_0xfd2b72)this['_processTreeNodeResult'](_0x100443,_0x5be118,_0xd8253e,function(){var _0x4de8e0=_0x35d4f4;_0x100443['value']=_0xd8253e['valueOf'](),!_0x50a7be&&_0x14859b[_0x4de8e0(0x104)](_0x2801aa,_0x100443,_0x5be118,{});});else{var _0x1b7612=_0x5be118['autoExpand']&&_0x5be118[_0x35d4f4(0xcf)]<_0x5be118[_0x35d4f4(0xe9)]&&_0x5be118['autoExpandPreviousObjects'][_0x35d4f4(0x11a)](_0xd8253e)<0x0&&_0x2801aa!=='function'&&_0x5be118[_0x35d4f4(0x169)]<_0x5be118['autoExpandLimit'];_0x1b7612||_0x5be118[_0x35d4f4(0xcf)]<_0x23e878||_0x50a7be?(this[_0x35d4f4(0x190)](_0x100443,_0xd8253e,_0x5be118,_0x50a7be||{}),this[_0x35d4f4(0x127)](_0xd8253e,_0x100443)):this[_0x35d4f4(0x113)](_0x100443,_0x5be118,_0xd8253e,function(){var _0x55c8ce=_0x35d4f4;_0x2801aa==='null'||_0x2801aa===_0x55c8ce(0x139)||(delete _0x100443['value'],_0x100443[_0x55c8ce(0x11e)]=!0x0);});}return _0x100443;}finally{_0x5be118[_0x35d4f4(0x174)]=_0x3315ad,_0x5be118[_0x35d4f4(0x167)]=_0x23e878,_0x5be118[_0x35d4f4(0x14b)]=_0x35756a;}}[_0x284004(0x104)](_0x1fd688,_0x5de22f,_0x25d445,_0x39bd6a){var _0x4c7686=_0x284004,_0x29f732=_0x39bd6a['strLength']||_0x25d445[_0x4c7686(0x105)];if((_0x1fd688===_0x4c7686(0x14a)||_0x1fd688===_0x4c7686(0x1b0))&&_0x5de22f[_0x4c7686(0x108)]){let _0x1231c6=_0x5de22f[_0x4c7686(0x108)][_0x4c7686(0x194)];_0x25d445['allStrLength']+=_0x1231c6,_0x25d445[_0x4c7686(0xfe)]>_0x25d445['totalStrLength']?(_0x5de22f[_0x4c7686(0x11e)]='',delete _0x5de22f['value']):_0x1231c6>_0x29f732&&(_0x5de22f[_0x4c7686(0x11e)]=_0x5de22f['value'][_0x4c7686(0x102)](0x0,_0x29f732),delete _0x5de22f[_0x4c7686(0x108)]);}}[_0x284004(0x10f)](_0x22f3e2){var _0x5c39f0=_0x284004;return!!(_0x22f3e2&&_0x30b1b1[_0x5c39f0(0xf6)]&&this[_0x5c39f0(0x172)](_0x22f3e2)===_0x5c39f0(0xc5)&&_0x22f3e2[_0x5c39f0(0x126)]);}[_0x284004(0xd5)](_0x4673b0){var _0x3032e2=_0x284004;if(_0x4673b0[_0x3032e2(0xcd)](/^\\d+$/))return _0x4673b0;var _0x2bf586;try{_0x2bf586=JSON[_0x3032e2(0x19e)](''+_0x4673b0);}catch{_0x2bf586='\\x22'+this[_0x3032e2(0x172)](_0x4673b0)+'\\x22';}return _0x2bf586[_0x3032e2(0xcd)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x2bf586=_0x2bf586[_0x3032e2(0x102)](0x1,_0x2bf586['length']-0x2):_0x2bf586=_0x2bf586[_0x3032e2(0x177)](/'/g,'\\x5c\\x27')[_0x3032e2(0x177)](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x2bf586;}['_processTreeNodeResult'](_0x3ddcf2,_0x1010f7,_0x15ce14,_0x28dc42){var _0x301b48=_0x284004;this[_0x301b48(0x186)](_0x3ddcf2,_0x1010f7),_0x28dc42&&_0x28dc42(),this[_0x301b48(0x127)](_0x15ce14,_0x3ddcf2),this[_0x301b48(0x170)](_0x3ddcf2,_0x1010f7);}[_0x284004(0x186)](_0x599eb4,_0x4c41e4){var _0x540268=_0x284004;this['_setNodeId'](_0x599eb4,_0x4c41e4),this[_0x540268(0x14f)](_0x599eb4,_0x4c41e4),this[_0x540268(0x110)](_0x599eb4,_0x4c41e4),this[_0x540268(0x101)](_0x599eb4,_0x4c41e4);}['_setNodeId'](_0x278ebb,_0x328e8a){}['_setNodeQueryPath'](_0x2f7a03,_0x353e54){}['_setNodeLabel'](_0x20d80c,_0x5267ee){}[_0x284004(0x1a7)](_0x3713d7){var _0x515865=_0x284004;return _0x3713d7===this[_0x515865(0x155)];}[_0x284004(0x170)](_0x134d04,_0x5ca722){var _0x9f459c=_0x284004;this[_0x9f459c(0x111)](_0x134d04,_0x5ca722),this['_setNodeExpandableState'](_0x134d04),_0x5ca722[_0x9f459c(0x10e)]&&this[_0x9f459c(0x133)](_0x134d04),this[_0x9f459c(0x14c)](_0x134d04,_0x5ca722),this['_addLoadNode'](_0x134d04,_0x5ca722),this[_0x9f459c(0x184)](_0x134d04);}[_0x284004(0x127)](_0x3e6eac,_0x2f547e){var _0x3bce23=_0x284004;let _0x54a1b1;try{_0x30b1b1[_0x3bce23(0x148)]&&(_0x54a1b1=_0x30b1b1[_0x3bce23(0x148)][_0x3bce23(0x15b)],_0x30b1b1[_0x3bce23(0x148)][_0x3bce23(0x15b)]=function(){}),_0x3e6eac&&typeof _0x3e6eac[_0x3bce23(0x194)]==_0x3bce23(0xbf)&&(_0x2f547e['length']=_0x3e6eac['length']);}catch{}finally{_0x54a1b1&&(_0x30b1b1[_0x3bce23(0x148)][_0x3bce23(0x15b)]=_0x54a1b1);}if(_0x2f547e[_0x3bce23(0x199)]==='number'||_0x2f547e[_0x3bce23(0x199)]===_0x3bce23(0xe1)){if(isNaN(_0x2f547e[_0x3bce23(0x108)]))_0x2f547e[_0x3bce23(0xf4)]=!0x0,delete _0x2f547e[_0x3bce23(0x108)];else switch(_0x2f547e[_0x3bce23(0x108)]){case Number[_0x3bce23(0x134)]:_0x2f547e[_0x3bce23(0xde)]=!0x0,delete _0x2f547e[_0x3bce23(0x108)];break;case Number['NEGATIVE_INFINITY']:_0x2f547e[_0x3bce23(0x195)]=!0x0,delete _0x2f547e[_0x3bce23(0x108)];break;case 0x0:this[_0x3bce23(0xf5)](_0x2f547e['value'])&&(_0x2f547e[_0x3bce23(0x182)]=!0x0);break;}}else _0x2f547e[_0x3bce23(0x199)]===_0x3bce23(0xd7)&&typeof _0x3e6eac['name']==_0x3bce23(0x14a)&&_0x3e6eac[_0x3bce23(0x118)]&&_0x2f547e[_0x3bce23(0x118)]&&_0x3e6eac[_0x3bce23(0x118)]!==_0x2f547e[_0x3bce23(0x118)]&&(_0x2f547e[_0x3bce23(0x165)]=_0x3e6eac[_0x3bce23(0x118)]);}[_0x284004(0xf5)](_0x229506){var _0x4b9fcc=_0x284004;return 0x1/_0x229506===Number[_0x4b9fcc(0x1b1)];}[_0x284004(0x133)](_0x54264a){var _0x3216f3=_0x284004;!_0x54264a[_0x3216f3(0x117)]||!_0x54264a[_0x3216f3(0x117)]['length']||_0x54264a[_0x3216f3(0x199)]===_0x3216f3(0x124)||_0x54264a[_0x3216f3(0x199)]==='Map'||_0x54264a['type']==='Set'||_0x54264a[_0x3216f3(0x117)][_0x3216f3(0x1a2)](function(_0x43a884,_0x4de0cb){var _0x31afc1=_0x3216f3,_0x21cc06=_0x43a884[_0x31afc1(0x118)][_0x31afc1(0x18a)](),_0x524654=_0x4de0cb[_0x31afc1(0x118)][_0x31afc1(0x18a)]();return _0x21cc06<_0x524654?-0x1:_0x21cc06>_0x524654?0x1:0x0;});}[_0x284004(0x14c)](_0x372dbc,_0x57ebb1){var _0x4592fb=_0x284004;if(!(_0x57ebb1[_0x4592fb(0xf8)]||!_0x372dbc[_0x4592fb(0x117)]||!_0x372dbc['props'][_0x4592fb(0x194)])){for(var _0x4faa82=[],_0x464f3c=[],_0xbe2560=0x0,_0x3a6e64=_0x372dbc[_0x4592fb(0x117)][_0x4592fb(0x194)];_0xbe2560<_0x3a6e64;_0xbe2560++){var _0x1787ce=_0x372dbc['props'][_0xbe2560];_0x1787ce[_0x4592fb(0x199)]===_0x4592fb(0xd7)?_0x4faa82[_0x4592fb(0x109)](_0x1787ce):_0x464f3c[_0x4592fb(0x109)](_0x1787ce);}if(!(!_0x464f3c[_0x4592fb(0x194)]||_0x4faa82[_0x4592fb(0x194)]<=0x1)){_0x372dbc[_0x4592fb(0x117)]=_0x464f3c;var _0x51f783={'functionsNode':!0x0,'props':_0x4faa82};this[_0x4592fb(0x1b2)](_0x51f783,_0x57ebb1),this[_0x4592fb(0x111)](_0x51f783,_0x57ebb1),this[_0x4592fb(0xca)](_0x51f783),this[_0x4592fb(0x101)](_0x51f783,_0x57ebb1),_0x51f783['id']+='\\x20f',_0x372dbc[_0x4592fb(0x117)]['unshift'](_0x51f783);}}}[_0x284004(0xe4)](_0x92e0d7,_0xf36c7c){}[_0x284004(0xca)](_0xfd61f3){}[_0x284004(0x157)](_0x50f03e){var _0x1b72a1=_0x284004;return Array[_0x1b72a1(0x11c)](_0x50f03e)||typeof _0x50f03e==_0x1b72a1(0x153)&&this[_0x1b72a1(0x172)](_0x50f03e)===_0x1b72a1(0x120);}['_setNodePermissions'](_0x435918,_0x462755){}[_0x284004(0x184)](_0x386b3f){var _0x3456fd=_0x284004;delete _0x386b3f[_0x3456fd(0x1a0)],delete _0x386b3f[_0x3456fd(0x122)],delete _0x386b3f[_0x3456fd(0xd6)];}['_setNodeExpressionPath'](_0x1b4e08,_0x80f359){}}let _0x2b5e4c=new _0x2511f1(),_0x5c9f98={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x58ee1c={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x5a2b85(_0x367b74,_0x545559,_0x14618f,_0x14d4e3,_0x579a35,_0xf4010c){var _0x42b2e9=_0x284004;let _0xed63fb,_0x51bb6b;try{_0x51bb6b=_0x2a87b2(),_0xed63fb=_0x6ec684[_0x545559],!_0xed63fb||_0x51bb6b-_0xed63fb['ts']>0x1f4&&_0xed63fb[_0x42b2e9(0x162)]&&_0xed63fb[_0x42b2e9(0x10a)]/_0xed63fb[_0x42b2e9(0x162)]<0x64?(_0x6ec684[_0x545559]=_0xed63fb={'count':0x0,'time':0x0,'ts':_0x51bb6b},_0x6ec684[_0x42b2e9(0x160)]={}):_0x51bb6b-_0x6ec684['hits']['ts']>0x32&&_0x6ec684[_0x42b2e9(0x160)][_0x42b2e9(0x162)]&&_0x6ec684[_0x42b2e9(0x160)][_0x42b2e9(0x10a)]/_0x6ec684['hits'][_0x42b2e9(0x162)]<0x64&&(_0x6ec684['hits']={});let _0x3e7475=[],_0x5426ba=_0xed63fb[_0x42b2e9(0x1a5)]||_0x6ec684[_0x42b2e9(0x160)][_0x42b2e9(0x1a5)]?_0x58ee1c:_0x5c9f98,_0x49f9cf=_0x9e4318=>{var _0x1880a6=_0x42b2e9;let _0x46e22a={};return _0x46e22a[_0x1880a6(0x117)]=_0x9e4318['props'],_0x46e22a['elements']=_0x9e4318[_0x1880a6(0xf0)],_0x46e22a[_0x1880a6(0x105)]=_0x9e4318[_0x1880a6(0x105)],_0x46e22a['totalStrLength']=_0x9e4318[_0x1880a6(0x1ac)],_0x46e22a[_0x1880a6(0x138)]=_0x9e4318['autoExpandLimit'],_0x46e22a[_0x1880a6(0xe9)]=_0x9e4318['autoExpandMaxDepth'],_0x46e22a['sortProps']=!0x1,_0x46e22a[_0x1880a6(0xf8)]=!_0x373848,_0x46e22a[_0x1880a6(0x167)]=0x1,_0x46e22a[_0x1880a6(0xcf)]=0x0,_0x46e22a['expId']=_0x1880a6(0x18d),_0x46e22a[_0x1880a6(0x112)]=_0x1880a6(0x1ad),_0x46e22a[_0x1880a6(0xcc)]=!0x0,_0x46e22a['autoExpandPreviousObjects']=[],_0x46e22a[_0x1880a6(0x169)]=0x0,_0x46e22a[_0x1880a6(0xd9)]=!0x0,_0x46e22a[_0x1880a6(0xfe)]=0x0,_0x46e22a[_0x1880a6(0xed)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x46e22a;};for(var _0x28883c=0x0;_0x28883c<_0x579a35['length'];_0x28883c++)_0x3e7475[_0x42b2e9(0x109)](_0x2b5e4c['serialize']({'timeNode':_0x367b74===_0x42b2e9(0x10a)||void 0x0},_0x579a35[_0x28883c],_0x49f9cf(_0x5426ba),{}));if(_0x367b74===_0x42b2e9(0x15a)){let _0x525302=Error['stackTraceLimit'];try{Error['stackTraceLimit']=0x1/0x0,_0x3e7475[_0x42b2e9(0x109)](_0x2b5e4c[_0x42b2e9(0x190)]({'stackNode':!0x0},new Error()[_0x42b2e9(0xf7)],_0x49f9cf(_0x5426ba),{'strLength':0x1/0x0}));}finally{Error[_0x42b2e9(0x16a)]=_0x525302;}}return{'method':_0x42b2e9(0x121),'version':_0x5cb203,'args':[{'ts':_0x14618f,'session':_0x14d4e3,'args':_0x3e7475,'id':_0x545559,'context':_0xf4010c}]};}catch(_0x5cd2a4){return{'method':_0x42b2e9(0x121),'version':_0x5cb203,'args':[{'ts':_0x14618f,'session':_0x14d4e3,'args':[{'type':_0x42b2e9(0x119),'error':_0x5cd2a4&&_0x5cd2a4['message']}],'id':_0x545559,'context':_0xf4010c}]};}finally{try{if(_0xed63fb&&_0x51bb6b){let _0x12a6a7=_0x2a87b2();_0xed63fb[_0x42b2e9(0x162)]++,_0xed63fb[_0x42b2e9(0x10a)]+=_0x53f46b(_0x51bb6b,_0x12a6a7),_0xed63fb['ts']=_0x12a6a7,_0x6ec684[_0x42b2e9(0x160)][_0x42b2e9(0x162)]++,_0x6ec684['hits'][_0x42b2e9(0x10a)]+=_0x53f46b(_0x51bb6b,_0x12a6a7),_0x6ec684['hits']['ts']=_0x12a6a7,(_0xed63fb[_0x42b2e9(0x162)]>0x32||_0xed63fb[_0x42b2e9(0x10a)]>0x64)&&(_0xed63fb[_0x42b2e9(0x1a5)]=!0x0),(_0x6ec684[_0x42b2e9(0x160)][_0x42b2e9(0x162)]>0x3e8||_0x6ec684['hits']['time']>0x12c)&&(_0x6ec684['hits']['reduceLimits']=!0x0);}}catch{}}}return _0x5a2b85;}((_0x5bcb14,_0x2aae84,_0xb8c56,_0x2d6e2d,_0xd4659e,_0x2644ef,_0x236889,_0x58ba1c,_0x4d73d1,_0x1cb32d,_0x21e45e)=>{var _0x5b23aa=_0x2fc1fe;if(_0x5bcb14['_console_ninja'])return _0x5bcb14[_0x5b23aa(0xe3)];if(!X(_0x5bcb14,_0x58ba1c,_0xd4659e))return _0x5bcb14[_0x5b23aa(0xe3)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x5bcb14[_0x5b23aa(0xe3)];let _0x562ef1=b(_0x5bcb14),_0x3581b7=_0x562ef1[_0x5b23aa(0x130)],_0x4ce459=_0x562ef1[_0x5b23aa(0xce)],_0x21eed3=_0x562ef1[_0x5b23aa(0x12e)],_0x5cb1d3={'hits':{},'ts':{}},_0x85469b=H(_0x5bcb14,_0x4d73d1,_0x5cb1d3,_0x2644ef),_0x367de0=_0x527d5e=>{_0x5cb1d3['ts'][_0x527d5e]=_0x4ce459();},_0x5e6aa1=(_0xe9078b,_0x1f2f18)=>{let _0x4e7fd1=_0x5cb1d3['ts'][_0x1f2f18];if(delete _0x5cb1d3['ts'][_0x1f2f18],_0x4e7fd1){let _0x943002=_0x3581b7(_0x4e7fd1,_0x4ce459());_0x159fce(_0x85469b('time',_0xe9078b,_0x21eed3(),_0x4f1d30,[_0x943002],_0x1f2f18));}},_0x455e63=_0x80de4c=>{var _0x33b436=_0x5b23aa,_0x592686;return _0xd4659e===_0x33b436(0xd8)&&_0x5bcb14[_0x33b436(0x16c)]&&((_0x592686=_0x80de4c==null?void 0x0:_0x80de4c[_0x33b436(0x1af)])==null?void 0x0:_0x592686[_0x33b436(0x194)])&&(_0x80de4c[_0x33b436(0x1af)][0x0][_0x33b436(0x16c)]=_0x5bcb14['origin']),_0x80de4c;};_0x5bcb14[_0x5b23aa(0xe3)]={'consoleLog':(_0x4c1843,_0x5396ff)=>{var _0x5a39ac=_0x5b23aa;_0x5bcb14[_0x5a39ac(0x148)][_0x5a39ac(0x121)][_0x5a39ac(0x118)]!==_0x5a39ac(0x197)&&_0x159fce(_0x85469b(_0x5a39ac(0x121),_0x4c1843,_0x21eed3(),_0x4f1d30,_0x5396ff));},'consoleTrace':(_0x1508e4,_0x320dfe)=>{var _0x5185bc=_0x5b23aa;_0x5bcb14[_0x5185bc(0x148)][_0x5185bc(0x121)][_0x5185bc(0x118)]!==_0x5185bc(0x13d)&&_0x159fce(_0x455e63(_0x85469b(_0x5185bc(0x15a),_0x1508e4,_0x21eed3(),_0x4f1d30,_0x320dfe)));},'consoleTime':_0x178af2=>{_0x367de0(_0x178af2);},'consoleTimeEnd':(_0x43956a,_0x524e07)=>{_0x5e6aa1(_0x524e07,_0x43956a);},'autoLog':(_0x5d5b60,_0x1a1221)=>{var _0x2e0cb4=_0x5b23aa;_0x159fce(_0x85469b(_0x2e0cb4(0x121),_0x1a1221,_0x21eed3(),_0x4f1d30,[_0x5d5b60]));},'autoLogMany':(_0x31b7ca,_0x35bce4)=>{var _0x108090=_0x5b23aa;_0x159fce(_0x85469b(_0x108090(0x121),_0x31b7ca,_0x21eed3(),_0x4f1d30,_0x35bce4));},'autoTrace':(_0x465285,_0x492122)=>{var _0x52744a=_0x5b23aa;_0x159fce(_0x455e63(_0x85469b(_0x52744a(0x15a),_0x492122,_0x21eed3(),_0x4f1d30,[_0x465285])));},'autoTraceMany':(_0x3ee62d,_0x97d13f)=>{_0x159fce(_0x455e63(_0x85469b('trace',_0x3ee62d,_0x21eed3(),_0x4f1d30,_0x97d13f)));},'autoTime':(_0x5c684c,_0x3d8782,_0x33a635)=>{_0x367de0(_0x33a635);},'autoTimeEnd':(_0x435a57,_0x1e0339,_0x5cd53d)=>{_0x5e6aa1(_0x1e0339,_0x5cd53d);},'coverage':_0x10f609=>{_0x159fce({'method':'coverage','version':_0x2644ef,'args':[{'id':_0x10f609}]});}};let _0x159fce=q(_0x5bcb14,_0x2aae84,_0xb8c56,_0x2d6e2d,_0xd4659e,_0x1cb32d,_0x21e45e),_0x4f1d30=_0x5bcb14[_0x5b23aa(0x16f)];return _0x5bcb14[_0x5b23aa(0xe3)];})(globalThis,_0x2fc1fe(0x19c),'49717',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.332\\\\node_modules\",'webpack',_0x2fc1fe(0x12b),_0x2fc1fe(0x147),_0x2fc1fe(0xc1),_0x2fc1fe(0x106),'',_0x2fc1fe(0x178));");
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