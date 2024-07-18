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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';function _0x4e05(_0x132df1,_0x570c7e){var _0x11147b=_0x1114();return _0x4e05=function(_0x4e05d9,_0x5d0d6c){_0x4e05d9=_0x4e05d9-0xcc;var _0x43c5d9=_0x11147b[_0x4e05d9];return _0x43c5d9;},_0x4e05(_0x132df1,_0x570c7e);}var _0x22af76=_0x4e05;(function(_0x46abcf,_0x158daf){var _0x32d3b=_0x4e05,_0x20b9bd=_0x46abcf();while(!![]){try{var _0x175512=-parseInt(_0x32d3b(0xd8))/0x1*(parseInt(_0x32d3b(0x139))/0x2)+-parseInt(_0x32d3b(0x19a))/0x3*(-parseInt(_0x32d3b(0xce))/0x4)+-parseInt(_0x32d3b(0x131))/0x5*(-parseInt(_0x32d3b(0x121))/0x6)+-parseInt(_0x32d3b(0xdf))/0x7+-parseInt(_0x32d3b(0x180))/0x8+-parseInt(_0x32d3b(0xdd))/0x9+parseInt(_0x32d3b(0x19f))/0xa;if(_0x175512===_0x158daf)break;else _0x20b9bd['push'](_0x20b9bd['shift']());}catch(_0x5a88dd){_0x20b9bd['push'](_0x20b9bd['shift']());}}}(_0x1114,0xc8578));function _0x1114(){var _0x346005=['_setNodeExpressionPath','error','args','prototype','String','_treeNodePropertiesAfterFullValue','_inNextEdge','port','_isPrimitiveWrapperType','hrtime','_setNodeId','log','_property','_addProperty','_inBrowser','_setNodePermissions','Buffer','type','_p_','_disposeWebsocket','dockerizedApp','getOwnPropertyDescriptor','array','_addLoadNode','[object\\x20BigInt]','_ws','constructor','url','pathToFileURL','indexOf','console','ws/index.js','location','_numberRegExp','[object\\x20Map]','concat','_console_ninja_session','message','catch','_isMap','hits','_isArray','value','hasOwnProperty','_isUndefined','_undefined','number','unshift','match','object','_hasSymbolPropertyOnItsPath','480lUDrpb','autoExpandPropertyCount','charAt','_addObjectProperty','NEXT_RUNTIME','getPrototypeOf','_isNegativeZero','autoExpandLimit','parent','autoExpandMaxDepth','_isSet','remix','_Symbol','nodeModules','replace','_sortProps','63100AoWTqZ','trace','call','test','unknown','_connecting','global','path','283748KWBEiW',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'index','_getOwnPropertyDescriptor','Error','_dateToString','_capIfString','capped','_p_length','current','nuxt','toLowerCase','_HTMLAllCollection','_connected','defineProperty','isExpressionToEvaluate','name','_WebSocket','send','positiveInfinity','origin','_getOwnPropertySymbols','_blacklistedProperty','join','_hasMapOnItsPath','then','depth','process','data','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','expressionsToEvaluate','_setNodeExpandableState','onmessage','_treeNodePropertiesBeforeFullValue','_getOwnPropertyNames','null','parse','function','versions','getWebSocketClass','_webSocketErrorDocsLink','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_cleanNode','props','_connectToHostNow','length','totalStrLength','_propertyName','_isPrimitiveType','_console_ninja','date','elapsed','coverage','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','boolean','root_exp','POSITIVE_INFINITY','allStrLength','stringify','_socket','Map','undefined','_type','level','timeStamp','_setNodeLabel','1.0.0','_consoleNinjaAllowedToStart','count','map','12843192jWoaUE','_reconnectTimeout','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','substr','noFunctions','Symbol','eventReceivedCallback','next.js','warn','','edge','sort','toUpperCase','hostname','forEach','_addFunctionsNode','default','strLength','create','_maxConnectAttemptCount','node','rootExpression','resolveGetters','root_exp_id','_sendErrorMessage','_setNodeQueryPath','90822aTNqIn','gateway.docker.internal','_regExpToString','toString','webpack','31927630hHIxKQ','env','[object\\x20Set]','stack','Number','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','1721124045737','ws://','now','49864','performance','[object\\x20Array]','_allowedToConnectOnSend','serialize','symbol','astro','pop','_objectToString','cappedElements','_quotedRegExp','autoExpandPreviousObjects','time','valueOf','reduceLimits','elements','_additionalMetadata','getter','push','_processTreeNodeResult','bigint','200agxRhV','angular','https://tinyurl.com/37x8b79t','set','host','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','HTMLAllCollection','reload','_p_name','stackTraceLimit','3vhIqtx','sortProps','_keyStrRegExp','string','[object\\x20Date]','13141908tlsOku','autoExpand','9829610bfJFBs','onerror','setter','negativeInfinity','Set',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.329\\\\node_modules\",'getOwnPropertyNames','NEGATIVE_INFINITY','_allowedToSend','onclose','unref','_WebSocketClass','\\x20server','_attemptToReconnectShortly','_connectAttemptCount'];_0x1114=function(){return _0x346005;};return _0x1114();}var K=Object[_0x22af76(0x192)],Q=Object[_0x22af76(0x147)],G=Object[_0x22af76(0x103)],ee=Object['getOwnPropertyNames'],te=Object[_0x22af76(0x126)],ne=Object[_0x22af76(0xf1)][_0x22af76(0x119)],re=(_0x362494,_0x245a80,_0x13a0f4,_0x22676e)=>{var _0x1dffc7=_0x22af76;if(_0x245a80&&typeof _0x245a80==_0x1dffc7(0x11f)||typeof _0x245a80==_0x1dffc7(0x15f)){for(let _0xe1431e of ee(_0x245a80))!ne[_0x1dffc7(0x133)](_0x362494,_0xe1431e)&&_0xe1431e!==_0x13a0f4&&Q(_0x362494,_0xe1431e,{'get':()=>_0x245a80[_0xe1431e],'enumerable':!(_0x22676e=G(_0x245a80,_0xe1431e))||_0x22676e['enumerable']});}return _0x362494;},V=(_0x20378b,_0x7f3231,_0x558141)=>(_0x558141=_0x20378b!=null?K(te(_0x20378b)):{},re(_0x7f3231||!_0x20378b||!_0x20378b['__es'+'Module']?Q(_0x558141,_0x22af76(0x190),{'value':_0x20378b,'enumerable':!0x0}):_0x558141,_0x20378b)),x=class{constructor(_0x1609f5,_0x403768,_0x3c6fa3,_0x287500,_0x241c39,_0x51be42){var _0xdc2d51=_0x22af76,_0x191cdb,_0x177410,_0x2a65ea,_0x2db354;this[_0xdc2d51(0x137)]=_0x1609f5,this[_0xdc2d51(0xd2)]=_0x403768,this[_0xdc2d51(0xf5)]=_0x3c6fa3,this['nodeModules']=_0x287500,this['dockerizedApp']=_0x241c39,this['eventReceivedCallback']=_0x51be42,this[_0xdc2d51(0xe7)]=!0x0,this[_0xdc2d51(0x1ab)]=!0x0,this[_0xdc2d51(0x146)]=!0x1,this['_connecting']=!0x1,this['_inNextEdge']=((_0x177410=(_0x191cdb=_0x1609f5['process'])==null?void 0x0:_0x191cdb[_0xdc2d51(0x1a0)])==null?void 0x0:_0x177410['NEXT_RUNTIME'])===_0xdc2d51(0x18a),this[_0xdc2d51(0xfc)]=!((_0x2db354=(_0x2a65ea=this['global'][_0xdc2d51(0x154)])==null?void 0x0:_0x2a65ea[_0xdc2d51(0x160)])!=null&&_0x2db354[_0xdc2d51(0x194)])&&!this[_0xdc2d51(0xf4)],this['_WebSocketClass']=null,this[_0xdc2d51(0xed)]=0x0,this[_0xdc2d51(0x193)]=0x14,this['_webSocketErrorDocsLink']=_0xdc2d51(0xd0),this[_0xdc2d51(0x198)]=(this[_0xdc2d51(0xfc)]?_0xdc2d51(0x157):_0xdc2d51(0x163))+this[_0xdc2d51(0x162)];}async[_0x22af76(0x161)](){var _0xd06aea=_0x22af76,_0x1dacad,_0x46068c;if(this[_0xd06aea(0xea)])return this[_0xd06aea(0xea)];let _0x387d62;if(this[_0xd06aea(0xfc)]||this['_inNextEdge'])_0x387d62=this['global']['WebSocket'];else{if((_0x1dacad=this[_0xd06aea(0x137)][_0xd06aea(0x154)])!=null&&_0x1dacad[_0xd06aea(0x14a)])_0x387d62=(_0x46068c=this[_0xd06aea(0x137)][_0xd06aea(0x154)])==null?void 0x0:_0x46068c[_0xd06aea(0x14a)];else try{let _0xf81d39=await import(_0xd06aea(0x138));_0x387d62=(await import((await import(_0xd06aea(0x109)))[_0xd06aea(0x10a)](_0xf81d39['join'](this[_0xd06aea(0x12e)],_0xd06aea(0x10d)))[_0xd06aea(0x19d)]()))[_0xd06aea(0x190)];}catch{try{_0x387d62=require(require(_0xd06aea(0x138))[_0xd06aea(0x150)](this[_0xd06aea(0x12e)],'ws'));}catch{throw new Error(_0xd06aea(0xd3));}}}return this[_0xd06aea(0xea)]=_0x387d62,_0x387d62;}[_0x22af76(0x166)](){var _0x141e7f=_0x22af76;this['_connecting']||this['_connected']||this['_connectAttemptCount']>=this[_0x141e7f(0x193)]||(this['_allowedToConnectOnSend']=!0x1,this['_connecting']=!0x0,this['_connectAttemptCount']++,this[_0x141e7f(0x107)]=new Promise((_0x51617e,_0x3f827d)=>{var _0x4e9b50=_0x141e7f;this[_0x4e9b50(0x161)]()[_0x4e9b50(0x152)](_0x2d0aa9=>{var _0x3caaeb=_0x4e9b50;let _0x2332f1=new _0x2d0aa9(_0x3caaeb(0x1a6)+(!this[_0x3caaeb(0xfc)]&&this[_0x3caaeb(0x102)]?_0x3caaeb(0x19b):this[_0x3caaeb(0xd2)])+':'+this[_0x3caaeb(0xf5)]);_0x2332f1[_0x3caaeb(0xe0)]=()=>{var _0x32c573=_0x3caaeb;this[_0x32c573(0xe7)]=!0x1,this[_0x32c573(0x101)](_0x2332f1),this[_0x32c573(0xec)](),_0x3f827d(new Error('logger\\x20websocket\\x20error'));},_0x2332f1['onopen']=()=>{var _0x45f81d=_0x3caaeb;this[_0x45f81d(0xfc)]||_0x2332f1[_0x45f81d(0x175)]&&_0x2332f1['_socket'][_0x45f81d(0xe9)]&&_0x2332f1[_0x45f81d(0x175)][_0x45f81d(0xe9)](),_0x51617e(_0x2332f1);},_0x2332f1[_0x3caaeb(0xe8)]=()=>{var _0x33d119=_0x3caaeb;this[_0x33d119(0x1ab)]=!0x0,this['_disposeWebsocket'](_0x2332f1),this[_0x33d119(0xec)]();},_0x2332f1[_0x3caaeb(0x15a)]=_0x2cc25f=>{var _0x589ea6=_0x3caaeb;try{if(!(_0x2cc25f!=null&&_0x2cc25f[_0x589ea6(0x155)])||!this[_0x589ea6(0x186)])return;let _0x21cb85=JSON[_0x589ea6(0x15e)](_0x2cc25f['data']);this[_0x589ea6(0x186)](_0x21cb85['method'],_0x21cb85[_0x589ea6(0xf0)],this[_0x589ea6(0x137)],this[_0x589ea6(0xfc)]);}catch{}};})['then'](_0x5a890f=>(this['_connected']=!0x0,this[_0x4e9b50(0x136)]=!0x1,this[_0x4e9b50(0x1ab)]=!0x1,this['_allowedToSend']=!0x0,this[_0x4e9b50(0xed)]=0x0,_0x5a890f))[_0x4e9b50(0x114)](_0x23e9d1=>(this[_0x4e9b50(0x146)]=!0x1,this['_connecting']=!0x1,console[_0x4e9b50(0x188)](_0x4e9b50(0x182)+this[_0x4e9b50(0x162)]),_0x3f827d(new Error(_0x4e9b50(0x16f)+(_0x23e9d1&&_0x23e9d1['message'])))));}));}[_0x22af76(0x101)](_0x25a1d0){var _0x3dd193=_0x22af76;this[_0x3dd193(0x146)]=!0x1,this[_0x3dd193(0x136)]=!0x1;try{_0x25a1d0[_0x3dd193(0xe8)]=null,_0x25a1d0['onerror']=null,_0x25a1d0['onopen']=null;}catch{}try{_0x25a1d0['readyState']<0x2&&_0x25a1d0['close']();}catch{}}[_0x22af76(0xec)](){var _0xcb2554=_0x22af76;clearTimeout(this[_0xcb2554(0x181)]),!(this[_0xcb2554(0xed)]>=this[_0xcb2554(0x193)])&&(this[_0xcb2554(0x181)]=setTimeout(()=>{var _0x50e8ea=_0xcb2554,_0x4bf527;this[_0x50e8ea(0x146)]||this[_0x50e8ea(0x136)]||(this[_0x50e8ea(0x166)](),(_0x4bf527=this[_0x50e8ea(0x107)])==null||_0x4bf527[_0x50e8ea(0x114)](()=>this[_0x50e8ea(0xec)]()));},0x1f4),this['_reconnectTimeout'][_0xcb2554(0xe9)]&&this[_0xcb2554(0x181)][_0xcb2554(0xe9)]());}async[_0x22af76(0x14b)](_0x57ba25){var _0x4a02a6=_0x22af76;try{if(!this[_0x4a02a6(0xe7)])return;this[_0x4a02a6(0x1ab)]&&this[_0x4a02a6(0x166)](),(await this['_ws'])['send'](JSON[_0x4a02a6(0x174)](_0x57ba25));}catch(_0x2a794b){console['warn'](this['_sendErrorMessage']+':\\x20'+(_0x2a794b&&_0x2a794b[_0x4a02a6(0x113)])),this['_allowedToSend']=!0x1,this[_0x4a02a6(0xec)]();}}};function q(_0x1b0074,_0xf2179c,_0x20dcdd,_0x4f2195,_0x59797e,_0x545e3a,_0x41a8b2,_0x434706=ie){var _0x26ffa9=_0x22af76;let _0x535257=_0x20dcdd['split'](',')[_0x26ffa9(0x17f)](_0x2683dd=>{var _0x9074a=_0x26ffa9,_0x683eaf,_0x1c8259,_0x14c9d1,_0x14b5d4;try{if(!_0x1b0074[_0x9074a(0x112)]){let _0x2c0baf=((_0x1c8259=(_0x683eaf=_0x1b0074[_0x9074a(0x154)])==null?void 0x0:_0x683eaf['versions'])==null?void 0x0:_0x1c8259[_0x9074a(0x194)])||((_0x14b5d4=(_0x14c9d1=_0x1b0074['process'])==null?void 0x0:_0x14c9d1[_0x9074a(0x1a0)])==null?void 0x0:_0x14b5d4[_0x9074a(0x125)])===_0x9074a(0x18a);(_0x59797e==='next.js'||_0x59797e===_0x9074a(0x12c)||_0x59797e===_0x9074a(0x1ae)||_0x59797e===_0x9074a(0xcf))&&(_0x59797e+=_0x2c0baf?_0x9074a(0xeb):'\\x20browser'),_0x1b0074[_0x9074a(0x112)]={'id':+new Date(),'tool':_0x59797e},_0x41a8b2&&_0x59797e&&!_0x2c0baf&&console['log']('%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20'+(_0x59797e[_0x9074a(0x123)](0x0)[_0x9074a(0x18c)]()+_0x59797e['substr'](0x1))+',','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)',_0x9074a(0x156));}let _0xdde93e=new x(_0x1b0074,_0xf2179c,_0x2683dd,_0x4f2195,_0x545e3a,_0x434706);return _0xdde93e[_0x9074a(0x14b)]['bind'](_0xdde93e);}catch(_0x4d46a5){return console[_0x9074a(0x188)](_0x9074a(0x1a4),_0x4d46a5&&_0x4d46a5[_0x9074a(0x113)]),()=>{};}});return _0x41baff=>_0x535257['forEach'](_0x484f68=>_0x484f68(_0x41baff));}function ie(_0x53ab10,_0x4d955a,_0x54799a,_0x45c75e){var _0x18af27=_0x22af76;_0x45c75e&&_0x53ab10===_0x18af27(0xd5)&&_0x54799a['location'][_0x18af27(0xd5)]();}function b(_0x1ee67e){var _0x487661=_0x22af76,_0x359973,_0x2e668e;let _0x431568=function(_0xd14001,_0x4ddd77){return _0x4ddd77-_0xd14001;},_0x148c83;if(_0x1ee67e[_0x487661(0x1a9)])_0x148c83=function(){var _0x39231c=_0x487661;return _0x1ee67e[_0x39231c(0x1a9)][_0x39231c(0x1a7)]();};else{if(_0x1ee67e[_0x487661(0x154)]&&_0x1ee67e[_0x487661(0x154)][_0x487661(0xf7)]&&((_0x2e668e=(_0x359973=_0x1ee67e['process'])==null?void 0x0:_0x359973[_0x487661(0x1a0)])==null?void 0x0:_0x2e668e[_0x487661(0x125)])!==_0x487661(0x18a))_0x148c83=function(){var _0x16d4b2=_0x487661;return _0x1ee67e[_0x16d4b2(0x154)][_0x16d4b2(0xf7)]();},_0x431568=function(_0x399d81,_0x4aac79){return 0x3e8*(_0x4aac79[0x0]-_0x399d81[0x0])+(_0x4aac79[0x1]-_0x399d81[0x1])/0xf4240;};else try{let {performance:_0x440a1a}=require('perf_hooks');_0x148c83=function(){var _0x3436ff=_0x487661;return _0x440a1a[_0x3436ff(0x1a7)]();};}catch{_0x148c83=function(){return+new Date();};}}return{'elapsed':_0x431568,'timeStamp':_0x148c83,'now':()=>Date[_0x487661(0x1a7)]()};}function X(_0x3ee271,_0x39c88a,_0x445304){var _0x49ba7e=_0x22af76,_0x1d76db,_0x44b452,_0x4ca6ff,_0x440ab9,_0x508d34;if(_0x3ee271[_0x49ba7e(0x17d)]!==void 0x0)return _0x3ee271[_0x49ba7e(0x17d)];let _0x55e15c=((_0x44b452=(_0x1d76db=_0x3ee271[_0x49ba7e(0x154)])==null?void 0x0:_0x1d76db[_0x49ba7e(0x160)])==null?void 0x0:_0x44b452[_0x49ba7e(0x194)])||((_0x440ab9=(_0x4ca6ff=_0x3ee271['process'])==null?void 0x0:_0x4ca6ff[_0x49ba7e(0x1a0)])==null?void 0x0:_0x440ab9[_0x49ba7e(0x125)])===_0x49ba7e(0x18a);return _0x55e15c&&_0x445304===_0x49ba7e(0x143)?_0x3ee271['_consoleNinjaAllowedToStart']=!0x1:_0x3ee271[_0x49ba7e(0x17d)]=_0x55e15c||!_0x39c88a||((_0x508d34=_0x3ee271['location'])==null?void 0x0:_0x508d34[_0x49ba7e(0x18d)])&&_0x39c88a['includes'](_0x3ee271[_0x49ba7e(0x10e)][_0x49ba7e(0x18d)]),_0x3ee271[_0x49ba7e(0x17d)];}function H(_0x3e0a99,_0x5b4f2b,_0x5e09b5,_0x495f21){var _0x2ae0f7=_0x22af76;_0x3e0a99=_0x3e0a99,_0x5b4f2b=_0x5b4f2b,_0x5e09b5=_0x5e09b5,_0x495f21=_0x495f21;let _0x1bb9bf=b(_0x3e0a99),_0x23ae99=_0x1bb9bf[_0x2ae0f7(0x16d)],_0x399dfb=_0x1bb9bf[_0x2ae0f7(0x17a)];class _0x493c05{constructor(){var _0x417330=_0x2ae0f7;this[_0x417330(0xda)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x417330(0x10f)]=/^(0|[1-9][0-9]*)$/,this[_0x417330(0x1b2)]=/'([^\\\\']|\\\\')*'/,this[_0x417330(0x11b)]=_0x3e0a99['undefined'],this[_0x417330(0x145)]=_0x3e0a99[_0x417330(0xd4)],this['_getOwnPropertyDescriptor']=Object[_0x417330(0x103)],this[_0x417330(0x15c)]=Object[_0x417330(0xe5)],this[_0x417330(0x12d)]=_0x3e0a99[_0x417330(0x185)],this[_0x417330(0x19c)]=RegExp[_0x417330(0xf1)][_0x417330(0x19d)],this[_0x417330(0x13e)]=Date['prototype'][_0x417330(0x19d)];}[_0x2ae0f7(0x1ac)](_0xc46a6f,_0x15f39a,_0x4da51d,_0x4085fa){var _0x267db2=_0x2ae0f7,_0x5048df=this,_0x13f1a7=_0x4da51d[_0x267db2(0xde)];function _0x2f6e21(_0xc9b0aa,_0x4725d0,_0x2f5f1a){var _0x240248=_0x267db2;_0x4725d0[_0x240248(0xff)]=_0x240248(0x135),_0x4725d0[_0x240248(0xef)]=_0xc9b0aa[_0x240248(0x113)],_0x168456=_0x2f5f1a[_0x240248(0x194)]['current'],_0x2f5f1a[_0x240248(0x194)][_0x240248(0x142)]=_0x4725d0,_0x5048df['_treeNodePropertiesBeforeFullValue'](_0x4725d0,_0x2f5f1a);}try{_0x4da51d['level']++,_0x4da51d[_0x267db2(0xde)]&&_0x4da51d['autoExpandPreviousObjects'][_0x267db2(0x1ba)](_0x15f39a);var _0x13cc79,_0x5092eb,_0x273a8b,_0x2c8b10,_0x1b7ff=[],_0x3ba1f5=[],_0x42725b,_0x1ed74b=this[_0x267db2(0x178)](_0x15f39a),_0x4087a2=_0x1ed74b===_0x267db2(0x104),_0xbc59c7=!0x1,_0x48e880=_0x1ed74b===_0x267db2(0x15f),_0x3d796a=this[_0x267db2(0x16a)](_0x1ed74b),_0x3565d1=this[_0x267db2(0xf6)](_0x1ed74b),_0x52c868=_0x3d796a||_0x3565d1,_0x5518dd={},_0x288fbf=0x0,_0x5063ec=!0x1,_0x168456,_0x295739=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x4da51d['depth']){if(_0x4087a2){if(_0x5092eb=_0x15f39a['length'],_0x5092eb>_0x4da51d[_0x267db2(0x1b7)]){for(_0x273a8b=0x0,_0x2c8b10=_0x4da51d[_0x267db2(0x1b7)],_0x13cc79=_0x273a8b;_0x13cc79<_0x2c8b10;_0x13cc79++)_0x3ba1f5[_0x267db2(0x1ba)](_0x5048df['_addProperty'](_0x1b7ff,_0x15f39a,_0x1ed74b,_0x13cc79,_0x4da51d));_0xc46a6f[_0x267db2(0x1b1)]=!0x0;}else{for(_0x273a8b=0x0,_0x2c8b10=_0x5092eb,_0x13cc79=_0x273a8b;_0x13cc79<_0x2c8b10;_0x13cc79++)_0x3ba1f5['push'](_0x5048df[_0x267db2(0xfb)](_0x1b7ff,_0x15f39a,_0x1ed74b,_0x13cc79,_0x4da51d));}_0x4da51d['autoExpandPropertyCount']+=_0x3ba1f5[_0x267db2(0x167)];}if(!(_0x1ed74b==='null'||_0x1ed74b==='undefined')&&!_0x3d796a&&_0x1ed74b!=='String'&&_0x1ed74b!==_0x267db2(0xfe)&&_0x1ed74b!==_0x267db2(0xcd)){var _0x5c308b=_0x4085fa['props']||_0x4da51d[_0x267db2(0x165)];if(this[_0x267db2(0x12b)](_0x15f39a)?(_0x13cc79=0x0,_0x15f39a[_0x267db2(0x18e)](function(_0x34a7b8){var _0x279df8=_0x267db2;if(_0x288fbf++,_0x4da51d['autoExpandPropertyCount']++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;return;}if(!_0x4da51d[_0x279df8(0x148)]&&_0x4da51d[_0x279df8(0xde)]&&_0x4da51d[_0x279df8(0x122)]>_0x4da51d[_0x279df8(0x128)]){_0x5063ec=!0x0;return;}_0x3ba1f5[_0x279df8(0x1ba)](_0x5048df[_0x279df8(0xfb)](_0x1b7ff,_0x15f39a,_0x279df8(0xe3),_0x13cc79++,_0x4da51d,function(_0x4b17d8){return function(){return _0x4b17d8;};}(_0x34a7b8)));})):this[_0x267db2(0x115)](_0x15f39a)&&_0x15f39a['forEach'](function(_0x1d475b,_0x2281bc){var _0x4a3939=_0x267db2;if(_0x288fbf++,_0x4da51d[_0x4a3939(0x122)]++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;return;}if(!_0x4da51d['isExpressionToEvaluate']&&_0x4da51d[_0x4a3939(0xde)]&&_0x4da51d[_0x4a3939(0x122)]>_0x4da51d[_0x4a3939(0x128)]){_0x5063ec=!0x0;return;}var _0x30809b=_0x2281bc[_0x4a3939(0x19d)]();_0x30809b[_0x4a3939(0x167)]>0x64&&(_0x30809b=_0x30809b['slice'](0x0,0x64)+'...'),_0x3ba1f5[_0x4a3939(0x1ba)](_0x5048df[_0x4a3939(0xfb)](_0x1b7ff,_0x15f39a,_0x4a3939(0x176),_0x30809b,_0x4da51d,function(_0x3b6d54){return function(){return _0x3b6d54;};}(_0x1d475b)));}),!_0xbc59c7){try{for(_0x42725b in _0x15f39a)if(!(_0x4087a2&&_0x295739[_0x267db2(0x134)](_0x42725b))&&!this[_0x267db2(0x14f)](_0x15f39a,_0x42725b,_0x4da51d)){if(_0x288fbf++,_0x4da51d[_0x267db2(0x122)]++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;break;}if(!_0x4da51d['isExpressionToEvaluate']&&_0x4da51d[_0x267db2(0xde)]&&_0x4da51d[_0x267db2(0x122)]>_0x4da51d['autoExpandLimit']){_0x5063ec=!0x0;break;}_0x3ba1f5[_0x267db2(0x1ba)](_0x5048df[_0x267db2(0x124)](_0x1b7ff,_0x5518dd,_0x15f39a,_0x1ed74b,_0x42725b,_0x4da51d));}}catch{}if(_0x5518dd[_0x267db2(0x141)]=!0x0,_0x48e880&&(_0x5518dd[_0x267db2(0xd6)]=!0x0),!_0x5063ec){var _0x143943=[]['concat'](this[_0x267db2(0x15c)](_0x15f39a))[_0x267db2(0x111)](this['_getOwnPropertySymbols'](_0x15f39a));for(_0x13cc79=0x0,_0x5092eb=_0x143943[_0x267db2(0x167)];_0x13cc79<_0x5092eb;_0x13cc79++)if(_0x42725b=_0x143943[_0x13cc79],!(_0x4087a2&&_0x295739[_0x267db2(0x134)](_0x42725b[_0x267db2(0x19d)]()))&&!this['_blacklistedProperty'](_0x15f39a,_0x42725b,_0x4da51d)&&!_0x5518dd[_0x267db2(0x100)+_0x42725b[_0x267db2(0x19d)]()]){if(_0x288fbf++,_0x4da51d[_0x267db2(0x122)]++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;break;}if(!_0x4da51d[_0x267db2(0x148)]&&_0x4da51d[_0x267db2(0xde)]&&_0x4da51d[_0x267db2(0x122)]>_0x4da51d[_0x267db2(0x128)]){_0x5063ec=!0x0;break;}_0x3ba1f5['push'](_0x5048df[_0x267db2(0x124)](_0x1b7ff,_0x5518dd,_0x15f39a,_0x1ed74b,_0x42725b,_0x4da51d));}}}}}if(_0xc46a6f[_0x267db2(0xff)]=_0x1ed74b,_0x52c868?(_0xc46a6f[_0x267db2(0x118)]=_0x15f39a['valueOf'](),this['_capIfString'](_0x1ed74b,_0xc46a6f,_0x4da51d,_0x4085fa)):_0x1ed74b===_0x267db2(0x16c)?_0xc46a6f[_0x267db2(0x118)]=this['_dateToString'][_0x267db2(0x133)](_0x15f39a):_0x1ed74b===_0x267db2(0xcd)?_0xc46a6f[_0x267db2(0x118)]=_0x15f39a['toString']():_0x1ed74b==='RegExp'?_0xc46a6f['value']=this[_0x267db2(0x19c)][_0x267db2(0x133)](_0x15f39a):_0x1ed74b==='symbol'&&this[_0x267db2(0x12d)]?_0xc46a6f[_0x267db2(0x118)]=this['_Symbol'][_0x267db2(0xf1)][_0x267db2(0x19d)][_0x267db2(0x133)](_0x15f39a):!_0x4da51d[_0x267db2(0x153)]&&!(_0x1ed74b===_0x267db2(0x15d)||_0x1ed74b===_0x267db2(0x177))&&(delete _0xc46a6f['value'],_0xc46a6f[_0x267db2(0x140)]=!0x0),_0x5063ec&&(_0xc46a6f['cappedProps']=!0x0),_0x168456=_0x4da51d[_0x267db2(0x194)][_0x267db2(0x142)],_0x4da51d[_0x267db2(0x194)][_0x267db2(0x142)]=_0xc46a6f,this[_0x267db2(0x15b)](_0xc46a6f,_0x4da51d),_0x3ba1f5['length']){for(_0x13cc79=0x0,_0x5092eb=_0x3ba1f5[_0x267db2(0x167)];_0x13cc79<_0x5092eb;_0x13cc79++)_0x3ba1f5[_0x13cc79](_0x13cc79);}_0x1b7ff[_0x267db2(0x167)]&&(_0xc46a6f[_0x267db2(0x165)]=_0x1b7ff);}catch(_0x4e79c7){_0x2f6e21(_0x4e79c7,_0xc46a6f,_0x4da51d);}return this[_0x267db2(0x1b8)](_0x15f39a,_0xc46a6f),this[_0x267db2(0xf3)](_0xc46a6f,_0x4da51d),_0x4da51d[_0x267db2(0x194)][_0x267db2(0x142)]=_0x168456,_0x4da51d[_0x267db2(0x179)]--,_0x4da51d[_0x267db2(0xde)]=_0x13f1a7,_0x4da51d[_0x267db2(0xde)]&&_0x4da51d['autoExpandPreviousObjects'][_0x267db2(0x1af)](),_0xc46a6f;}[_0x2ae0f7(0x14e)](_0x674423){return Object['getOwnPropertySymbols']?Object['getOwnPropertySymbols'](_0x674423):[];}[_0x2ae0f7(0x12b)](_0x500002){var _0x5b615f=_0x2ae0f7;return!!(_0x500002&&_0x3e0a99[_0x5b615f(0xe3)]&&this[_0x5b615f(0x1b0)](_0x500002)===_0x5b615f(0x1a1)&&_0x500002['forEach']);}['_blacklistedProperty'](_0x4e6570,_0x3590e6,_0x5ad7dc){var _0x428d63=_0x2ae0f7;return _0x5ad7dc[_0x428d63(0x184)]?typeof _0x4e6570[_0x3590e6]==_0x428d63(0x15f):!0x1;}[_0x2ae0f7(0x178)](_0x75d84b){var _0x657c98=_0x2ae0f7,_0x1c400c='';return _0x1c400c=typeof _0x75d84b,_0x1c400c===_0x657c98(0x11f)?this[_0x657c98(0x1b0)](_0x75d84b)===_0x657c98(0x1aa)?_0x1c400c='array':this['_objectToString'](_0x75d84b)===_0x657c98(0xdc)?_0x1c400c=_0x657c98(0x16c):this[_0x657c98(0x1b0)](_0x75d84b)===_0x657c98(0x106)?_0x1c400c=_0x657c98(0xcd):_0x75d84b===null?_0x1c400c=_0x657c98(0x15d):_0x75d84b[_0x657c98(0x108)]&&(_0x1c400c=_0x75d84b[_0x657c98(0x108)][_0x657c98(0x149)]||_0x1c400c):_0x1c400c==='undefined'&&this[_0x657c98(0x145)]&&_0x75d84b instanceof this[_0x657c98(0x145)]&&(_0x1c400c='HTMLAllCollection'),_0x1c400c;}[_0x2ae0f7(0x1b0)](_0x559a38){var _0x5ab8ba=_0x2ae0f7;return Object['prototype']['toString'][_0x5ab8ba(0x133)](_0x559a38);}[_0x2ae0f7(0x16a)](_0xaccb6f){var _0x70a587=_0x2ae0f7;return _0xaccb6f===_0x70a587(0x170)||_0xaccb6f===_0x70a587(0xdb)||_0xaccb6f===_0x70a587(0x11c);}[_0x2ae0f7(0xf6)](_0x3e5474){var _0x41e848=_0x2ae0f7;return _0x3e5474==='Boolean'||_0x3e5474===_0x41e848(0xf2)||_0x3e5474==='Number';}[_0x2ae0f7(0xfb)](_0xecb58c,_0x3db704,_0x3ab8fb,_0x5f0c81,_0x377739,_0x2dcdc6){var _0x515882=this;return function(_0x2657ed){var _0x4a4214=_0x4e05,_0x5be757=_0x377739[_0x4a4214(0x194)][_0x4a4214(0x142)],_0x567054=_0x377739[_0x4a4214(0x194)][_0x4a4214(0x13b)],_0x19b367=_0x377739[_0x4a4214(0x194)]['parent'];_0x377739[_0x4a4214(0x194)][_0x4a4214(0x129)]=_0x5be757,_0x377739[_0x4a4214(0x194)][_0x4a4214(0x13b)]=typeof _0x5f0c81=='number'?_0x5f0c81:_0x2657ed,_0xecb58c[_0x4a4214(0x1ba)](_0x515882[_0x4a4214(0xfa)](_0x3db704,_0x3ab8fb,_0x5f0c81,_0x377739,_0x2dcdc6)),_0x377739[_0x4a4214(0x194)][_0x4a4214(0x129)]=_0x19b367,_0x377739['node'][_0x4a4214(0x13b)]=_0x567054;};}['_addObjectProperty'](_0x1516be,_0x59d7e3,_0x105f8f,_0x454f0d,_0x400e43,_0x6290e2,_0x40ff4e){var _0x6580bc=_0x2ae0f7,_0x989a80=this;return _0x59d7e3[_0x6580bc(0x100)+_0x400e43[_0x6580bc(0x19d)]()]=!0x0,function(_0x29514a){var _0x16e6f2=_0x6580bc,_0x5656a0=_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x142)],_0x526425=_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x13b)],_0x3ca127=_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x129)];_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x129)]=_0x5656a0,_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x13b)]=_0x29514a,_0x1516be[_0x16e6f2(0x1ba)](_0x989a80[_0x16e6f2(0xfa)](_0x105f8f,_0x454f0d,_0x400e43,_0x6290e2,_0x40ff4e)),_0x6290e2['node'][_0x16e6f2(0x129)]=_0x3ca127,_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x13b)]=_0x526425;};}[_0x2ae0f7(0xfa)](_0x171671,_0x4a5594,_0x54e4b2,_0x1f8c32,_0x40e0bb){var _0x5ca991=_0x2ae0f7,_0x450190=this;_0x40e0bb||(_0x40e0bb=function(_0x1ff14c,_0x1bb6ad){return _0x1ff14c[_0x1bb6ad];});var _0x41fccd=_0x54e4b2[_0x5ca991(0x19d)](),_0x1e1bb8=_0x1f8c32[_0x5ca991(0x158)]||{},_0x3442cc=_0x1f8c32[_0x5ca991(0x153)],_0x50ca90=_0x1f8c32[_0x5ca991(0x148)];try{var _0x583667=this[_0x5ca991(0x115)](_0x171671),_0x656a4f=_0x41fccd;_0x583667&&_0x656a4f[0x0]==='\\x27'&&(_0x656a4f=_0x656a4f['substr'](0x1,_0x656a4f[_0x5ca991(0x167)]-0x2));var _0x1b9e86=_0x1f8c32[_0x5ca991(0x158)]=_0x1e1bb8[_0x5ca991(0x100)+_0x656a4f];_0x1b9e86&&(_0x1f8c32[_0x5ca991(0x153)]=_0x1f8c32[_0x5ca991(0x153)]+0x1),_0x1f8c32['isExpressionToEvaluate']=!!_0x1b9e86;var _0x54749e=typeof _0x54e4b2==_0x5ca991(0x1ad),_0x8fbb35={'name':_0x54749e||_0x583667?_0x41fccd:this[_0x5ca991(0x169)](_0x41fccd)};if(_0x54749e&&(_0x8fbb35[_0x5ca991(0x1ad)]=!0x0),!(_0x4a5594===_0x5ca991(0x104)||_0x4a5594===_0x5ca991(0x13d))){var _0x38fb0f=this[_0x5ca991(0x13c)](_0x171671,_0x54e4b2);if(_0x38fb0f&&(_0x38fb0f[_0x5ca991(0xd1)]&&(_0x8fbb35[_0x5ca991(0xe1)]=!0x0),_0x38fb0f['get']&&!_0x1b9e86&&!_0x1f8c32[_0x5ca991(0x196)]))return _0x8fbb35[_0x5ca991(0x1b9)]=!0x0,this['_processTreeNodeResult'](_0x8fbb35,_0x1f8c32),_0x8fbb35;}var _0x901e2;try{_0x901e2=_0x40e0bb(_0x171671,_0x54e4b2);}catch(_0x2c48ec){return _0x8fbb35={'name':_0x41fccd,'type':_0x5ca991(0x135),'error':_0x2c48ec[_0x5ca991(0x113)]},this['_processTreeNodeResult'](_0x8fbb35,_0x1f8c32),_0x8fbb35;}var _0xd57be4=this[_0x5ca991(0x178)](_0x901e2),_0x405b35=this[_0x5ca991(0x16a)](_0xd57be4);if(_0x8fbb35[_0x5ca991(0xff)]=_0xd57be4,_0x405b35)this[_0x5ca991(0xcc)](_0x8fbb35,_0x1f8c32,_0x901e2,function(){var _0x3cb586=_0x5ca991;_0x8fbb35[_0x3cb586(0x118)]=_0x901e2[_0x3cb586(0x1b5)](),!_0x1b9e86&&_0x450190[_0x3cb586(0x13f)](_0xd57be4,_0x8fbb35,_0x1f8c32,{});});else{var _0x2c66f2=_0x1f8c32[_0x5ca991(0xde)]&&_0x1f8c32['level']<_0x1f8c32[_0x5ca991(0x12a)]&&_0x1f8c32[_0x5ca991(0x1b3)][_0x5ca991(0x10b)](_0x901e2)<0x0&&_0xd57be4!==_0x5ca991(0x15f)&&_0x1f8c32[_0x5ca991(0x122)]<_0x1f8c32[_0x5ca991(0x128)];_0x2c66f2||_0x1f8c32[_0x5ca991(0x179)]<_0x3442cc||_0x1b9e86?(this[_0x5ca991(0x1ac)](_0x8fbb35,_0x901e2,_0x1f8c32,_0x1b9e86||{}),this[_0x5ca991(0x1b8)](_0x901e2,_0x8fbb35)):this[_0x5ca991(0xcc)](_0x8fbb35,_0x1f8c32,_0x901e2,function(){var _0x5a8167=_0x5ca991;_0xd57be4===_0x5a8167(0x15d)||_0xd57be4==='undefined'||(delete _0x8fbb35[_0x5a8167(0x118)],_0x8fbb35[_0x5a8167(0x140)]=!0x0);});}return _0x8fbb35;}finally{_0x1f8c32[_0x5ca991(0x158)]=_0x1e1bb8,_0x1f8c32[_0x5ca991(0x153)]=_0x3442cc,_0x1f8c32[_0x5ca991(0x148)]=_0x50ca90;}}[_0x2ae0f7(0x13f)](_0x3a39a1,_0x39458d,_0x2ee68d,_0x1ede52){var _0x327e63=_0x2ae0f7,_0x3ce583=_0x1ede52[_0x327e63(0x191)]||_0x2ee68d[_0x327e63(0x191)];if((_0x3a39a1===_0x327e63(0xdb)||_0x3a39a1==='String')&&_0x39458d['value']){let _0x31f715=_0x39458d[_0x327e63(0x118)][_0x327e63(0x167)];_0x2ee68d[_0x327e63(0x173)]+=_0x31f715,_0x2ee68d[_0x327e63(0x173)]>_0x2ee68d[_0x327e63(0x168)]?(_0x39458d[_0x327e63(0x140)]='',delete _0x39458d[_0x327e63(0x118)]):_0x31f715>_0x3ce583&&(_0x39458d[_0x327e63(0x140)]=_0x39458d[_0x327e63(0x118)][_0x327e63(0x183)](0x0,_0x3ce583),delete _0x39458d[_0x327e63(0x118)]);}}['_isMap'](_0x5aadf1){var _0x4f2bda=_0x2ae0f7;return!!(_0x5aadf1&&_0x3e0a99[_0x4f2bda(0x176)]&&this[_0x4f2bda(0x1b0)](_0x5aadf1)===_0x4f2bda(0x110)&&_0x5aadf1[_0x4f2bda(0x18e)]);}['_propertyName'](_0x1eb36d){var _0x5eca8e=_0x2ae0f7;if(_0x1eb36d[_0x5eca8e(0x11e)](/^\\d+$/))return _0x1eb36d;var _0x4f5f2d;try{_0x4f5f2d=JSON[_0x5eca8e(0x174)](''+_0x1eb36d);}catch{_0x4f5f2d='\\x22'+this[_0x5eca8e(0x1b0)](_0x1eb36d)+'\\x22';}return _0x4f5f2d[_0x5eca8e(0x11e)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x4f5f2d=_0x4f5f2d[_0x5eca8e(0x183)](0x1,_0x4f5f2d['length']-0x2):_0x4f5f2d=_0x4f5f2d[_0x5eca8e(0x12f)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')[_0x5eca8e(0x12f)](/(^\"|\"$)/g,'\\x27'),_0x4f5f2d;}[_0x2ae0f7(0xcc)](_0xff2cc6,_0x853c86,_0x357eaf,_0x10c85e){var _0x1b05eb=_0x2ae0f7;this['_treeNodePropertiesBeforeFullValue'](_0xff2cc6,_0x853c86),_0x10c85e&&_0x10c85e(),this[_0x1b05eb(0x1b8)](_0x357eaf,_0xff2cc6),this[_0x1b05eb(0xf3)](_0xff2cc6,_0x853c86);}['_treeNodePropertiesBeforeFullValue'](_0x38a6a2,_0x1b904f){var _0x490c99=_0x2ae0f7;this[_0x490c99(0xf8)](_0x38a6a2,_0x1b904f),this[_0x490c99(0x199)](_0x38a6a2,_0x1b904f),this[_0x490c99(0xee)](_0x38a6a2,_0x1b904f),this[_0x490c99(0xfd)](_0x38a6a2,_0x1b904f);}['_setNodeId'](_0x5ece5c,_0xc3fb04){}[_0x2ae0f7(0x199)](_0x25bfff,_0x28ff9f){}[_0x2ae0f7(0x17b)](_0x5c7716,_0xb28a43){}[_0x2ae0f7(0x11a)](_0x410fef){var _0x5d6c26=_0x2ae0f7;return _0x410fef===this[_0x5d6c26(0x11b)];}[_0x2ae0f7(0xf3)](_0x21f10d,_0x4956fc){var _0x30f9a6=_0x2ae0f7;this[_0x30f9a6(0x17b)](_0x21f10d,_0x4956fc),this['_setNodeExpandableState'](_0x21f10d),_0x4956fc[_0x30f9a6(0xd9)]&&this[_0x30f9a6(0x130)](_0x21f10d),this[_0x30f9a6(0x18f)](_0x21f10d,_0x4956fc),this[_0x30f9a6(0x105)](_0x21f10d,_0x4956fc),this[_0x30f9a6(0x164)](_0x21f10d);}[_0x2ae0f7(0x1b8)](_0x7ee09,_0x40dfaf){var _0x558b19=_0x2ae0f7;let _0x48c935;try{_0x3e0a99['console']&&(_0x48c935=_0x3e0a99['console'][_0x558b19(0xef)],_0x3e0a99[_0x558b19(0x10c)][_0x558b19(0xef)]=function(){}),_0x7ee09&&typeof _0x7ee09[_0x558b19(0x167)]==_0x558b19(0x11c)&&(_0x40dfaf[_0x558b19(0x167)]=_0x7ee09[_0x558b19(0x167)]);}catch{}finally{_0x48c935&&(_0x3e0a99['console']['error']=_0x48c935);}if(_0x40dfaf['type']===_0x558b19(0x11c)||_0x40dfaf[_0x558b19(0xff)]===_0x558b19(0x1a3)){if(isNaN(_0x40dfaf[_0x558b19(0x118)]))_0x40dfaf['nan']=!0x0,delete _0x40dfaf['value'];else switch(_0x40dfaf[_0x558b19(0x118)]){case Number[_0x558b19(0x172)]:_0x40dfaf[_0x558b19(0x14c)]=!0x0,delete _0x40dfaf['value'];break;case Number[_0x558b19(0xe6)]:_0x40dfaf[_0x558b19(0xe2)]=!0x0,delete _0x40dfaf[_0x558b19(0x118)];break;case 0x0:this['_isNegativeZero'](_0x40dfaf[_0x558b19(0x118)])&&(_0x40dfaf['negativeZero']=!0x0);break;}}else _0x40dfaf[_0x558b19(0xff)]===_0x558b19(0x15f)&&typeof _0x7ee09[_0x558b19(0x149)]==_0x558b19(0xdb)&&_0x7ee09['name']&&_0x40dfaf[_0x558b19(0x149)]&&_0x7ee09['name']!==_0x40dfaf[_0x558b19(0x149)]&&(_0x40dfaf['funcName']=_0x7ee09[_0x558b19(0x149)]);}[_0x2ae0f7(0x127)](_0x2e584f){var _0x3285ef=_0x2ae0f7;return 0x1/_0x2e584f===Number[_0x3285ef(0xe6)];}[_0x2ae0f7(0x130)](_0x5bc381){var _0x41c501=_0x2ae0f7;!_0x5bc381[_0x41c501(0x165)]||!_0x5bc381['props'][_0x41c501(0x167)]||_0x5bc381[_0x41c501(0xff)]===_0x41c501(0x104)||_0x5bc381[_0x41c501(0xff)]===_0x41c501(0x176)||_0x5bc381['type']===_0x41c501(0xe3)||_0x5bc381[_0x41c501(0x165)][_0x41c501(0x18b)](function(_0x2fdba5,_0x243e14){var _0x372df0=_0x41c501,_0x3ac36e=_0x2fdba5[_0x372df0(0x149)][_0x372df0(0x144)](),_0x5e70ac=_0x243e14[_0x372df0(0x149)][_0x372df0(0x144)]();return _0x3ac36e<_0x5e70ac?-0x1:_0x3ac36e>_0x5e70ac?0x1:0x0;});}[_0x2ae0f7(0x18f)](_0x3662fc,_0x2f4456){var _0x78a313=_0x2ae0f7;if(!(_0x2f4456[_0x78a313(0x184)]||!_0x3662fc[_0x78a313(0x165)]||!_0x3662fc[_0x78a313(0x165)][_0x78a313(0x167)])){for(var _0x236dd2=[],_0x49717e=[],_0x5b293e=0x0,_0xab9236=_0x3662fc[_0x78a313(0x165)][_0x78a313(0x167)];_0x5b293e<_0xab9236;_0x5b293e++){var _0x3ee38b=_0x3662fc['props'][_0x5b293e];_0x3ee38b[_0x78a313(0xff)]===_0x78a313(0x15f)?_0x236dd2[_0x78a313(0x1ba)](_0x3ee38b):_0x49717e['push'](_0x3ee38b);}if(!(!_0x49717e['length']||_0x236dd2[_0x78a313(0x167)]<=0x1)){_0x3662fc[_0x78a313(0x165)]=_0x49717e;var _0x59f594={'functionsNode':!0x0,'props':_0x236dd2};this['_setNodeId'](_0x59f594,_0x2f4456),this[_0x78a313(0x17b)](_0x59f594,_0x2f4456),this[_0x78a313(0x159)](_0x59f594),this[_0x78a313(0xfd)](_0x59f594,_0x2f4456),_0x59f594['id']+='\\x20f',_0x3662fc['props'][_0x78a313(0x11d)](_0x59f594);}}}[_0x2ae0f7(0x105)](_0x4434c1,_0x465f40){}[_0x2ae0f7(0x159)](_0x29b6da){}[_0x2ae0f7(0x117)](_0x2637de){var _0x198c5d=_0x2ae0f7;return Array['isArray'](_0x2637de)||typeof _0x2637de==_0x198c5d(0x11f)&&this['_objectToString'](_0x2637de)===_0x198c5d(0x1aa);}[_0x2ae0f7(0xfd)](_0x5a0473,_0x59a7cc){}['_cleanNode'](_0x5ea263){var _0xdd0ae5=_0x2ae0f7;delete _0x5ea263[_0xdd0ae5(0x120)],delete _0x5ea263['_hasSetOnItsPath'],delete _0x5ea263[_0xdd0ae5(0x151)];}[_0x2ae0f7(0xee)](_0x598858,_0x3caac1){}}let _0x611b8e=new _0x493c05(),_0x48e9ea={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x28df38={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x357de1(_0x2dfd68,_0x244908,_0x212b7d,_0x348d4d,_0x37fc39,_0xf37c4f){var _0xc76bbd=_0x2ae0f7;let _0x232745,_0x2e006a;try{_0x2e006a=_0x399dfb(),_0x232745=_0x5e09b5[_0x244908],!_0x232745||_0x2e006a-_0x232745['ts']>0x1f4&&_0x232745[_0xc76bbd(0x17e)]&&_0x232745[_0xc76bbd(0x1b4)]/_0x232745['count']<0x64?(_0x5e09b5[_0x244908]=_0x232745={'count':0x0,'time':0x0,'ts':_0x2e006a},_0x5e09b5[_0xc76bbd(0x116)]={}):_0x2e006a-_0x5e09b5[_0xc76bbd(0x116)]['ts']>0x32&&_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x17e)]&&_0x5e09b5[_0xc76bbd(0x116)]['time']/_0x5e09b5['hits'][_0xc76bbd(0x17e)]<0x64&&(_0x5e09b5[_0xc76bbd(0x116)]={});let _0x103c37=[],_0x19a920=_0x232745[_0xc76bbd(0x1b6)]||_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x1b6)]?_0x28df38:_0x48e9ea,_0x266396=_0x478299=>{var _0x338e13=_0xc76bbd;let _0x3fc31a={};return _0x3fc31a[_0x338e13(0x165)]=_0x478299[_0x338e13(0x165)],_0x3fc31a[_0x338e13(0x1b7)]=_0x478299[_0x338e13(0x1b7)],_0x3fc31a[_0x338e13(0x191)]=_0x478299[_0x338e13(0x191)],_0x3fc31a[_0x338e13(0x168)]=_0x478299[_0x338e13(0x168)],_0x3fc31a[_0x338e13(0x128)]=_0x478299['autoExpandLimit'],_0x3fc31a[_0x338e13(0x12a)]=_0x478299[_0x338e13(0x12a)],_0x3fc31a['sortProps']=!0x1,_0x3fc31a[_0x338e13(0x184)]=!_0x5b4f2b,_0x3fc31a[_0x338e13(0x153)]=0x1,_0x3fc31a['level']=0x0,_0x3fc31a['expId']=_0x338e13(0x197),_0x3fc31a[_0x338e13(0x195)]=_0x338e13(0x171),_0x3fc31a[_0x338e13(0xde)]=!0x0,_0x3fc31a[_0x338e13(0x1b3)]=[],_0x3fc31a[_0x338e13(0x122)]=0x0,_0x3fc31a[_0x338e13(0x196)]=!0x0,_0x3fc31a[_0x338e13(0x173)]=0x0,_0x3fc31a['node']={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x3fc31a;};for(var _0x49e990=0x0;_0x49e990<_0x37fc39[_0xc76bbd(0x167)];_0x49e990++)_0x103c37[_0xc76bbd(0x1ba)](_0x611b8e['serialize']({'timeNode':_0x2dfd68==='time'||void 0x0},_0x37fc39[_0x49e990],_0x266396(_0x19a920),{}));if(_0x2dfd68==='trace'){let _0x5c882e=Error[_0xc76bbd(0xd7)];try{Error[_0xc76bbd(0xd7)]=0x1/0x0,_0x103c37[_0xc76bbd(0x1ba)](_0x611b8e[_0xc76bbd(0x1ac)]({'stackNode':!0x0},new Error()[_0xc76bbd(0x1a2)],_0x266396(_0x19a920),{'strLength':0x1/0x0}));}finally{Error[_0xc76bbd(0xd7)]=_0x5c882e;}}return{'method':_0xc76bbd(0xf9),'version':_0x495f21,'args':[{'ts':_0x212b7d,'session':_0x348d4d,'args':_0x103c37,'id':_0x244908,'context':_0xf37c4f}]};}catch(_0xbd00f9){return{'method':_0xc76bbd(0xf9),'version':_0x495f21,'args':[{'ts':_0x212b7d,'session':_0x348d4d,'args':[{'type':_0xc76bbd(0x135),'error':_0xbd00f9&&_0xbd00f9[_0xc76bbd(0x113)]}],'id':_0x244908,'context':_0xf37c4f}]};}finally{try{if(_0x232745&&_0x2e006a){let _0xd289e6=_0x399dfb();_0x232745[_0xc76bbd(0x17e)]++,_0x232745[_0xc76bbd(0x1b4)]+=_0x23ae99(_0x2e006a,_0xd289e6),_0x232745['ts']=_0xd289e6,_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x17e)]++,_0x5e09b5[_0xc76bbd(0x116)]['time']+=_0x23ae99(_0x2e006a,_0xd289e6),_0x5e09b5['hits']['ts']=_0xd289e6,(_0x232745[_0xc76bbd(0x17e)]>0x32||_0x232745[_0xc76bbd(0x1b4)]>0x64)&&(_0x232745[_0xc76bbd(0x1b6)]=!0x0),(_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x17e)]>0x3e8||_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x1b4)]>0x12c)&&(_0x5e09b5['hits']['reduceLimits']=!0x0);}}catch{}}}return _0x357de1;}((_0xe39406,_0x12f4af,_0x453c88,_0x41365b,_0xc3559e,_0xdce0af,_0x33c738,_0x26605a,_0x543a92,_0x5f076a,_0x5844c8)=>{var _0x3348a8=_0x22af76;if(_0xe39406[_0x3348a8(0x16b)])return _0xe39406['_console_ninja'];if(!X(_0xe39406,_0x26605a,_0xc3559e))return _0xe39406[_0x3348a8(0x16b)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0xe39406[_0x3348a8(0x16b)];let _0x3599bc=b(_0xe39406),_0x7e6c5c=_0x3599bc['elapsed'],_0x369f46=_0x3599bc['timeStamp'],_0x165423=_0x3599bc['now'],_0x1e8be2={'hits':{},'ts':{}},_0x5d1787=H(_0xe39406,_0x543a92,_0x1e8be2,_0xdce0af),_0x1f0dca=_0x5411c4=>{_0x1e8be2['ts'][_0x5411c4]=_0x369f46();},_0x137155=(_0x29df21,_0x92cd06)=>{let _0x211b5e=_0x1e8be2['ts'][_0x92cd06];if(delete _0x1e8be2['ts'][_0x92cd06],_0x211b5e){let _0x25b30=_0x7e6c5c(_0x211b5e,_0x369f46());_0x230ae2(_0x5d1787('time',_0x29df21,_0x165423(),_0x2638dc,[_0x25b30],_0x92cd06));}},_0x26da5f=_0x21b4f5=>{var _0x4fe62f=_0x3348a8,_0x574fa5;return _0xc3559e===_0x4fe62f(0x187)&&_0xe39406[_0x4fe62f(0x14d)]&&((_0x574fa5=_0x21b4f5==null?void 0x0:_0x21b4f5[_0x4fe62f(0xf0)])==null?void 0x0:_0x574fa5[_0x4fe62f(0x167)])&&(_0x21b4f5[_0x4fe62f(0xf0)][0x0]['origin']=_0xe39406[_0x4fe62f(0x14d)]),_0x21b4f5;};_0xe39406[_0x3348a8(0x16b)]={'consoleLog':(_0x581e6b,_0x5c928c)=>{var _0x341716=_0x3348a8;_0xe39406[_0x341716(0x10c)][_0x341716(0xf9)]['name']!=='disabledLog'&&_0x230ae2(_0x5d1787('log',_0x581e6b,_0x165423(),_0x2638dc,_0x5c928c));},'consoleTrace':(_0x4aca16,_0xfebfc6)=>{var _0x1a169f=_0x3348a8;_0xe39406[_0x1a169f(0x10c)][_0x1a169f(0xf9)][_0x1a169f(0x149)]!=='disabledTrace'&&_0x230ae2(_0x26da5f(_0x5d1787(_0x1a169f(0x132),_0x4aca16,_0x165423(),_0x2638dc,_0xfebfc6)));},'consoleTime':_0x10b89d=>{_0x1f0dca(_0x10b89d);},'consoleTimeEnd':(_0xc2cdf8,_0x448e82)=>{_0x137155(_0x448e82,_0xc2cdf8);},'autoLog':(_0x58dacd,_0x3cb101)=>{var _0x4266a6=_0x3348a8;_0x230ae2(_0x5d1787(_0x4266a6(0xf9),_0x3cb101,_0x165423(),_0x2638dc,[_0x58dacd]));},'autoLogMany':(_0xea83fe,_0x1fdecb)=>{_0x230ae2(_0x5d1787('log',_0xea83fe,_0x165423(),_0x2638dc,_0x1fdecb));},'autoTrace':(_0x130829,_0x1b5197)=>{var _0x52cc80=_0x3348a8;_0x230ae2(_0x26da5f(_0x5d1787(_0x52cc80(0x132),_0x1b5197,_0x165423(),_0x2638dc,[_0x130829])));},'autoTraceMany':(_0x5a09f5,_0x18939b)=>{var _0x3f44ce=_0x3348a8;_0x230ae2(_0x26da5f(_0x5d1787(_0x3f44ce(0x132),_0x5a09f5,_0x165423(),_0x2638dc,_0x18939b)));},'autoTime':(_0xcf495c,_0x1cce05,_0x396811)=>{_0x1f0dca(_0x396811);},'autoTimeEnd':(_0x5738d5,_0x5b3b6d,_0x3d8db4)=>{_0x137155(_0x5b3b6d,_0x3d8db4);},'coverage':_0x41793b=>{var _0x1fb997=_0x3348a8;_0x230ae2({'method':_0x1fb997(0x16e),'version':_0xdce0af,'args':[{'id':_0x41793b}]});}};let _0x230ae2=q(_0xe39406,_0x12f4af,_0x453c88,_0x41365b,_0xc3559e,_0x5f076a,_0x5844c8),_0x2638dc=_0xe39406[_0x3348a8(0x112)];return _0xe39406['_console_ninja'];})(globalThis,'127.0.0.1',_0x22af76(0x1a8),_0x22af76(0xe4),_0x22af76(0x19e),_0x22af76(0x17c),_0x22af76(0x1a5),_0x22af76(0x13a),_0x22af76(0x189),'','1');");
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