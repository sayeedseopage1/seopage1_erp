"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_tasks_pages_Subtasks_jsx"],{

/***/ "./resources/js/react/tasks/components/SubTaskExportButton.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/react/tasks/components/SubTaskExportButton.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_data_export__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-data-export */ "./node_modules/react-data-export/dist/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _utils_dateController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/dateController */ "./resources/js/react/utils/dateController.js");
/* harmony import */ var _global_Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../global/Loader */ "./resources/js/react/global/Loader.jsx");
/* harmony import */ var _services_api_tasksApiSlice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/api/tasksApiSlice */ "./resources/js/react/services/api/tasksApiSlice.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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












var ExcelFile = react_data_export__WEBPACK_IMPORTED_MODULE_3__["default"].ExcelFile;
var ExcelSheet = react_data_export__WEBPACK_IMPORTED_MODULE_3__["default"].ExcelFile.ExcelSheet;
var SubTaskExportButton = function SubTaskExportButton(_ref) {
  var filter = _ref.filter;
  var compareDate = new _utils_dateController__WEBPACK_IMPORTED_MODULE_5__.CompareDate();
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isRender = _React$useState2[0],
    setIsRender = _React$useState2[1];
  var queryObject = lodash__WEBPACK_IMPORTED_MODULE_4___default().pickBy(filter !== null && filter !== void 0 ? filter : {}, Boolean);
  var query = new URLSearchParams(queryObject).toString();
  var _useExportSubTasksMut = (0,_services_api_tasksApiSlice__WEBPACK_IMPORTED_MODULE_7__.useExportSubTasksMutation)(),
    _useExportSubTasksMut2 = _slicedToArray(_useExportSubTasksMut, 2),
    getSubTaskData = _useExportSubTasksMut2[0],
    _useExportSubTasksMut3 = _useExportSubTasksMut2[1],
    data = _useExportSubTasksMut3.data,
    isLoading = _useExportSubTasksMut3.isLoading;
  var Tasks = data === null || data === void 0 ? void 0 : data.tasks;

  // console.log("filter", filter);
  // console.log(" task", Tasks);

  // get deals
  var getData = function getData(deals) {
    var rows = [];
    lodash__WEBPACK_IMPORTED_MODULE_4___default().forEach(deals, function (d) {
      var _d$heading, _d$perent_task_headin, _d$subtasks_timer_act, _d$milestone_title, _d$deliverable_title, _d$project_name, _d$client_name, _d$pm_id_name, _dueDate, _ref2, _d$subtasks_hours_log, _d$added_by_name, _d$assigned_to_name, _d$column_name;
      var fieldStyle = {
        alignment: {
          wrapText: true,
          vertical: "center",
          horizontal: "center"
        }
      };
      var statusStyle = function statusStyle(row) {
        if (row.column_name === "Submitted Task for Client Approval") {
          return {
            font: {
              color: {
                rgb: "FF84D6"
              },
              bold: true
            }
          };
        } else if (row.column_name === "To Do") {
          return {
            font: {
              color: {
                rgb: "F5C71F"
              },
              bold: true
            }
          };
        } else if (row.column_name === "Doing") {
          return {
            font: {
              color: {
                rgb: "31A0F4"
              },
              bold: true
            }
          };
        } else if (row.column_name === "Awaiting Client Approval") {
          return {
            font: {
              color: {
                rgb: "0e0bc2"
              },
              bold: true
            }
          };
        } else {
          return {
            font: {
              color: {
                rgb: "f01616"
              },
              bold: true
            }
          };
        }
      };
      var dueDate = function dueDate(d) {
        var date = d === null || d === void 0 ? void 0 : d.due_date;
        var currentDate = compareDate.dayjs();
        if (compareDate.isSame(currentDate, date)) {
          date = "Today";
        }
        date = date === "Today" ? date : dayjs__WEBPACK_IMPORTED_MODULE_2___default()(date).format("DD-MM-YYYY");
        return date;
      };
      var approveStyle = function approveStyle(d) {
        if (dayjs__WEBPACK_IMPORTED_MODULE_2___default()(d === null || d === void 0 ? void 0 : d.task_approval_date).isValid()) {
          return {
            font: {
              color: {
                rgb: "050000"
              },
              bold: true
            }
          };
        } else {
          return {
            font: {
              color: {
                rgb: "fdae1a"
              }
            }
          };
        }
      };
      var row = [{
        value: (_d$heading = d === null || d === void 0 ? void 0 : d.heading) !== null && _d$heading !== void 0 ? _d$heading : "--",
        style: fieldStyle
      }, {
        value: (_d$perent_task_headin = d === null || d === void 0 ? void 0 : d.perent_task_heading) !== null && _d$perent_task_headin !== void 0 ? _d$perent_task_headin : "--",
        style: fieldStyle
      }, {
        value: (_d$subtasks_timer_act = d === null || d === void 0 ? void 0 : d.subtasks_timer_active) !== null && _d$subtasks_timer_act !== void 0 ? _d$subtasks_timer_act : "--",
        style: _objectSpread({}, fieldStyle)
      }, {
        value: (_d$milestone_title = d === null || d === void 0 ? void 0 : d.milestone_title) !== null && _d$milestone_title !== void 0 ? _d$milestone_title : "--",
        style: fieldStyle
      }, {
        value: (_d$deliverable_title = d === null || d === void 0 ? void 0 : d.deliverable_title) !== null && _d$deliverable_title !== void 0 ? _d$deliverable_title : "--",
        style: fieldStyle
      }, {
        value: (_d$project_name = d === null || d === void 0 ? void 0 : d.project_name) !== null && _d$project_name !== void 0 ? _d$project_name : "--",
        style: fieldStyle
      }, {
        value: (_d$client_name = d === null || d === void 0 ? void 0 : d.client_name) !== null && _d$client_name !== void 0 ? _d$client_name : "--",
        style: fieldStyle
      }, {
        value: (_d$pm_id_name = d === null || d === void 0 ? void 0 : d.pm_id_name) !== null && _d$pm_id_name !== void 0 ? _d$pm_id_name : "--",
        style: fieldStyle
      }, {
        value: dayjs__WEBPACK_IMPORTED_MODULE_2___default()(d === null || d === void 0 ? void 0 : d.creation_date).isValid() ? dayjs__WEBPACK_IMPORTED_MODULE_2___default()(d === null || d === void 0 ? void 0 : d.creation_date).format("DD-MM-YYYY") : "--",
        style: _objectSpread({}, fieldStyle)
      }, {
        value: (_dueDate = dueDate(d)) !== null && _dueDate !== void 0 ? _dueDate : "--",
        style: fieldStyle
      }, {
        value: dayjs__WEBPACK_IMPORTED_MODULE_2___default()(data === null || data === void 0 ? void 0 : data.task_approval_date).isValid() ? dayjs__WEBPACK_IMPORTED_MODULE_2___default()(data === null || data === void 0 ? void 0 : data.task_approval_date).format("DD-MM-YYYY") : "--",
        style: _objectSpread({}, fieldStyle)
      }, {
        value: dayjs__WEBPACK_IMPORTED_MODULE_2___default()(d === null || d === void 0 ? void 0 : d.completion_date).isValid() ? dayjs__WEBPACK_IMPORTED_MODULE_2___default()(d === null || d === void 0 ? void 0 : d.completion_date).format("DD-MM-YYYY") : "--",
        style: _objectSpread({}, fieldStyle)
      }, {
        value: dayjs__WEBPACK_IMPORTED_MODULE_2___default()(d === null || d === void 0 ? void 0 : d.task_submission_date).isValid() ? dayjs__WEBPACK_IMPORTED_MODULE_2___default()(d === null || d === void 0 ? void 0 : d.task_submission_date).format("DD-MM-YYYY") : "--",
        style: _objectSpread({}, fieldStyle)
      }, {
        value: dayjs__WEBPACK_IMPORTED_MODULE_2___default()(d === null || d === void 0 ? void 0 : d.task_approval_date).isValid() ? dayjs__WEBPACK_IMPORTED_MODULE_2___default()(d === null || d === void 0 ? void 0 : d.task_approval_date).format("DD-MM-YYYY") : "Not Completed Yet",
        style: _objectSpread(_objectSpread({}, fieldStyle), approveStyle(d))
      }, {
        value: (_ref2 = "".concat(d === null || d === void 0 ? void 0 : d.estimate_hours, " hrs ").concat(d === null || d === void 0 ? void 0 : d.estimate_minutes, " mins")) !== null && _ref2 !== void 0 ? _ref2 : "--",
        style: _objectSpread({}, fieldStyle)
      }, {
        value: (_d$subtasks_hours_log = d === null || d === void 0 ? void 0 : d.subtasks_hours_logged) !== null && _d$subtasks_hours_log !== void 0 ? _d$subtasks_hours_log : "--",
        style: _objectSpread({}, fieldStyle)
      }, {
        value: (_d$added_by_name = d === null || d === void 0 ? void 0 : d.added_by_name) !== null && _d$added_by_name !== void 0 ? _d$added_by_name : "--",
        style: _objectSpread({}, fieldStyle)
      }, {
        value: (_d$assigned_to_name = d === null || d === void 0 ? void 0 : d.assigned_to_name) !== null && _d$assigned_to_name !== void 0 ? _d$assigned_to_name : "--",
        style: _objectSpread({}, fieldStyle)
      }, {
        value: (_d$column_name = d === null || d === void 0 ? void 0 : d.column_name) !== null && _d$column_name !== void 0 ? _d$column_name : "--",
        style: _objectSpread(_objectSpread({}, fieldStyle), statusStyle(d))
      }];
      rows.push(row);
    });
    return rows;
  };

  // columns
  var columns = [{
    title: "Subtask",
    width: {
      wpx: 150
    }
  }, {
    title: "Parent Task",
    width: {
      wpx: 150
    }
  }, {
    title: "Timer Status"
  }, {
    title: "Milestone",
    width: {
      wpx: 150
    }
  }, {
    title: "Deliverable",
    width: {
      wpx: 150
    }
  }, {
    title: "Project",
    width: {
      wpx: 150
    }
  }, {
    title: "Client"
  }, {
    title: "Project Manager",
    width: {
      wpx: 100
    }
  }, {
    title: "Creation Date"
  }, {
    title: "Due Date"
  }, {
    title: "Started Date"
  }, {
    title: "Completion Date"
  }, {
    title: "Submission Date"
  }, {
    title: "Approved On",
    width: {
      wpx: 100
    }
  }, {
    title: "Estimated Time"
  }, {
    title: "Hours Logged"
  }, {
    title: "Assigned By"
  }, {
    title: "Assigned To"
  }, {
    title: "Task Status",
    width: {
      wpx: 150
    }
  }];

  // multi data set
  var multiDataSet = [{
    columns: [{
      title: "Filter"
    }, {
      title: "Date"
    }, {
      title: "Project Manager"
    }, {
      title: "Client"
    }, {
      title: "Assign By"
    }, {
      title: "Assign To"
    }, {
      title: "status"
    }, {
      title: "Date Filter By"
    }],
    data: [[{
      value: "--"
    }, {
      value: "".concat(dayjs__WEBPACK_IMPORTED_MODULE_2___default()(filter === null || filter === void 0 ? void 0 : filter.start_date).format("MMM-DD-YYYY"), " to ").concat(dayjs__WEBPACK_IMPORTED_MODULE_2___default()(filter === null || filter === void 0 ? void 0 : filter.end_date).format("MMM-DD-YYYY")),
      style: {
        font: {
          bold: true
        }
      }
    }, {
      value: filter === null || filter === void 0 ? void 0 : filter.pm_name
    }, {
      value: filter === null || filter === void 0 ? void 0 : filter.client_name
    }, {
      value: filter === null || filter === void 0 ? void 0 : filter.assignee_by_name
    }, {
      value: filter === null || filter === void 0 ? void 0 : filter.assignee_to_name
    }, {
      value: filter === null || filter === void 0 ? void 0 : filter.status_name
    }, {
      value: filter === null || filter === void 0 ? void 0 : filter.date_filter_by
    }]]
  }, {
    xSteps: 0,
    ySteps: 2,
    columns: columns,
    data: getData(Tasks)
  }];
  var handleRender = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setIsRender(false);
            _context.next = 3;
            return getSubTaskData(query).unwrap();
          case 3:
            setIsRender(true);
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleRender() {
      return _ref3.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(ExportButton, {
      onClick: handleRender,
      children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], {
          title: "Processing..."
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("i", {
          className: "fa-solid fa-download"
        }), " Export To Excel"]
      })
    }), isRender && !isLoading && (Tasks === null || Tasks === void 0 ? void 0 : Tasks.length) > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(ExcelFile, {
      filename: "SubTask_table",
      hideElement: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(ExcelSheet, {
        dataSet: multiDataSet,
        name: " Subtask table"
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubTaskExportButton);
var ExportButton = styled_components__WEBPACK_IMPORTED_MODULE_9__["default"].button(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    width: 140px;\n    padding: 6px 10px;\n    border-radius: 3px;\n    display: flex;\n    align-items: center;\n    margin-left: 10px;\n    margin-bottom: 5px;\n\n    /* color: #DAF7A6; */\n    color: #000;\n    background-color: #c4de95;\n    gap: 8px;\n"])));

/***/ }),

/***/ "./resources/js/react/tasks/components/SubtaskTableColumns.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/react/tasks/components/SubtaskTableColumns.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubTasksTableColumns: () => (/* binding */ SubTasksTableColumns)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Person__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Person */ "./resources/js/react/tasks/components/Person.jsx");
/* harmony import */ var _table_ExpandTask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./table/ExpandTask */ "./resources/js/react/tasks/components/table/ExpandTask.jsx");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var _ReportButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ReportButton */ "./resources/js/react/tasks/components/ReportButton.jsx");
/* harmony import */ var _utils_dateController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/dateController */ "./resources/js/react/utils/dateController.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Timer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Timer */ "./resources/js/react/tasks/components/Timer.jsx");
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Dropdown */ "./resources/js/react/tasks/components/Dropdown.jsx");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Button */ "./resources/js/react/tasks/components/Button.jsx");
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Modal */ "./resources/js/react/tasks/components/Modal.jsx");
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Loader */ "./resources/js/react/tasks/components/Loader.jsx");
/* harmony import */ var _services_features_tasksSlice__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../services/features/tasksSlice */ "./resources/js/react/services/features/tasksSlice.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _global_Switch__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../global/Switch */ "./resources/js/react/global/Switch.jsx");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }












var ReportForm = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.lazy(function () {
  return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ../../single-task/section/task-actions/report/ReportForm */ "./resources/js/react/single-task/section/task-actions/report/ReportForm.jsx"));
});









var compareDate = new _utils_dateController__WEBPACK_IMPORTED_MODULE_6__.CompareDate();
var SubTasksTableColumns = [{
  id: "expend",
  header: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
    className: "mx-2",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
      children: "#"
    })
  }),
  cell: function cell(_ref) {
    var row = _ref.row;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
      className: "mx-2",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
        children: row.index + 1
      })
    });
  }
}, {
  id: "task",
  header: "Task",
  accessorFn: function accessorFn(row) {
    return "".concat(row.id).concat(row.heading);
  },
  cell: function cell(_ref2) {
    var row = _ref2.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("abbr", {
      title: data === null || data === void 0 ? void 0 : data.heading,
      style: {
        textDecoration: "none"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
        className: "d-flex align-items-center",
        style: {
          gap: "10px"
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("a", {
          href: "/account/tasks/".concat(data === null || data === void 0 ? void 0 : data.id),
          className: "hover-underline multine-ellipsis",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("span", {
            style: {
              color: "#3366CC"
            },
            children: [data === null || data === void 0 ? void 0 : data.heading, " "]
          }), " "]
        })
      })
    });
  }
}, {
  id: "timer_status",
  header: "Timer Status",
  accessorKey: "subtasks_timer_active",
  cell: function cell(_ref3) {
    var row = _ref3.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    var count = data === null || data === void 0 ? void 0 : data.subtasks_timer_active;
    var subtaskCount = lodash__WEBPACK_IMPORTED_MODULE_7___default().size(data === null || data === void 0 ? void 0 : data.subtasks_count);
    var isActive = count > 0;
    var serverTime = 0;
    var localTime = 0;
    var timer = 0;
    if (data !== null && data !== void 0 && data.start_time && lodash__WEBPACK_IMPORTED_MODULE_7___default().isNull(data === null || data === void 0 ? void 0 : data.end_time)) {
      serverTime = compareDate.dayjs(data === null || data === void 0 ? void 0 : data.start_time).unix();
      localTime = compareDate.dayjs().unix();
      timer = localTime - serverTime;
    }
    var clockIsRunning = (data === null || data === void 0 ? void 0 : data.start_time) && lodash__WEBPACK_IMPORTED_MODULE_7___default().isNull(data === null || data === void 0 ? void 0 : data.end_time);
    var color = isActive || clockIsRunning ? "#54B688" : "#DCDEE1";
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
      style: {
        color: color
      },
      className: "d-flex align-items-center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
        className: "fa-solid fa-stopwatch f-18"
      }), row.parentId === undefined && subtaskCount === 0 && !clockIsRunning && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        className: "ml-2",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
          children: count
        })
      }), clockIsRunning && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        className: "ml-1 badge badge-primary text-white",
        style: {
          fontSize: "11px"
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Timer__WEBPACK_IMPORTED_MODULE_8__["default"], {
          time: timer,
          run: clockIsRunning
        })
      })]
    });
  }
}, {
  id: "milestone",
  header: "Milestone",
  accessorKey: "milestone_title",
  cell: function cell(_ref4) {
    var row = _ref4.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("abbr", {
      title: data === null || data === void 0 ? void 0 : data.milestone_title,
      style: {
        textDecoration: "none"
      },
      children: data !== null && data !== void 0 && data.milestone_title ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        className: "multine-ellipsis word-break",
        children: data === null || data === void 0 ? void 0 : data.milestone_title
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        style: {
          fontWeight: "bold",
          color: "gray"
        },
        children: "N/A"
      })
    });
  }
}, {
  id: "deliverable",
  header: "Deliverable",
  accessorKey: "deliverable_title",
  cell: function cell(_ref5) {
    var row = _ref5.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("abbr", {
      title: data === null || data === void 0 ? void 0 : data.deliverable_title,
      style: {
        textDecoration: "none"
      },
      children: data !== null && data !== void 0 && data.deliverable_title ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        className: "multine-ellipsis word-break",
        children: data === null || data === void 0 ? void 0 : data.deliverable_title
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        style: {
          fontWeight: "bold",
          color: "gray"
        },
        children: "N/A"
      })
    });
  }
}, {
  id: "project",
  header: "Project",
  accessorFn: function accessorFn(row) {
    return "".concat(row.project_id).concat(row.project_name);
  },
  cell: function cell(_ref6) {
    var row = _ref6.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("abbr", {
      title: data === null || data === void 0 ? void 0 : data.project_name,
      style: {
        textDecoration: "none"
      },
      children: data !== null && data !== void 0 && data.project_name ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("a", {
        href: "/account/projects/".concat(data === null || data === void 0 ? void 0 : data.project_id),
        className: "multine-ellipsis",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
          style: {
            color: "#3366CC"
          },
          children: data === null || data === void 0 ? void 0 : data.project_name
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
        style: {
          fontWeight: "bold",
          color: "gray"
        },
        children: "N/A"
      })
    });
  }
}, {
  id: "client",
  header: "Client",
  accessorKey: "client_name",
  cell: function cell(_ref7) {
    var row = _ref7.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    var clientSelection = function clientSelection() {
      var client = {
        url: null,
        name: null,
        avatar: null
      };
      if (data.client_id) {
        client.url = "/account/clients/".concat(data.client_id);
        client.name = data.client_name;
        client.avatar = data.client_avatar;
      } else if (data.ind_client_id) {
        client.url = "/account/clients/".concat(data.ind_client_id);
        client.name = data.ind_existing_client_name;
        client.avatar = null;
      } else {
        client.url = "";
        client.name = data.ind_client_name;
        client.avatar = null;
      }
      return _objectSpread({}, client);
    };

    // console.log(clientSelection());
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Person__WEBPACK_IMPORTED_MODULE_2__["default"], {
        url: clientSelection().url,
        avatar: clientSelection().avatar,
        name: clientSelection().name
      })
    });
  }
}, {
  id: "project_manager",
  header: "Project Manager",
  accessorKey: "pm_id_name",
  cell: function cell(_ref8) {
    var row = _ref8.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return data !== null && data !== void 0 && data.project_manager_id ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Person__WEBPACK_IMPORTED_MODULE_2__["default"], {
      url: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.project_manager_id),
      name: data === null || data === void 0 ? void 0 : data.pm_id_name,
      avatar: data === null || data === void 0 ? void 0 : data.pm_id_avatar
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
      style: {
        fontWeight: "bold",
        color: "gray"
      },
      children: "N/A"
    });
  }
}, {
  id: "creation_date",
  header: "Creation Date",
  accessorKey: "creation_date",
  cell: function cell(_ref9) {
    var row = _ref9.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
      children: data === null || data === void 0 ? void 0 : data.creation_date
    });
  }
}, {
  id: "due_date",
  header: "Due Date",
  accessorFn: function accessorFn(row) {
    return row !== null && row !== void 0 && row.due_date ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.due_date).format("DD-MM-YYYY") : "--";
  },
  cell: function cell(_ref10) {
    var _date;
    var row = _ref10.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    var date = data === null || data === void 0 ? void 0 : data.due_date;
    var currentDate = compareDate.dayjs();
    var color = "";
    if (compareDate.isSame(currentDate, date)) {
      date = "Today";
      color = "red";
    } else if (compareDate.isAfter(currentDate, date)) {
      color = "red";
    }
    date = date === "Today" ? date : dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format("DD-MM-YYYY");
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
      style: {
        color: color
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
        children: (_date = date) !== null && _date !== void 0 ? _date : "--"
      })
    });
  }
}, {
  id: "start_date",
  header: "Started Date",
  accessorFn: function accessorFn(row) {
    return "".concat(row !== null && row !== void 0 && row.start_date ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.start_date).format("DD-MM-YYYY") : "--");
  },
  cell: function cell(_ref11) {
    var row = _ref11.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
      children: data !== null && data !== void 0 && data.start_date ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.start_date).format("DD-MM-YYYY"), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {})]
      }) : "--"
    });
  }
}, {
  id: "completion_date",
  header: "Completion Date",
  accessorFn: function accessorFn(row) {
    return "".concat(row !== null && row !== void 0 && row.completion_date ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.completion_date).format("DD-MM-YYYY") : "--");
  },
  cell: function cell(_ref12) {
    var row = _ref12.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
      children: Number(data === null || data === void 0 ? void 0 : data.board_column_id) === 4 ? (data === null || data === void 0 ? void 0 : data.completion_date) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.completion_date).format("DD-MM-YYYY"), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {})]
      }) : "--"
    });
  }
}, {
  id: "submission_data",
  header: "Submission Date",
  accessorFn: function accessorFn(row) {
    return "".concat(row !== null && row !== void 0 && row.task_submission_date ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.task_submission_date).format("DD-MM-YYYY") : "--");
  },
  cell: function cell(_ref13) {
    var row = _ref13.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("strong", {
      children: data !== null && data !== void 0 && data.task_submission_date ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_submission_date).format("DD-MM-YYYY"), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_submission_date).format("hh:mm A"), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {})]
      }) : "--"
    });
  }
},
// 4, 8, 9, // boardColumn iD
{
  id: "approved_on",
  header: "Approved On",
  accessorFn: function accessorFn(row) {
    return "".concat(row !== null && row !== void 0 && row.task_approval_date ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.task_approval_date).format("DD-MM-YYYY") : "Not Completed Yet!");
  },
  cell: function cell(_ref14) {
    var row = _ref14.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    // return(
    //   <strong>
    //     {data?.task_approval_date ? (
    //       <>
    //         {dayjs(data?.task_approval_date).format('DD-MM-YYYY')}
    //       </>
    //     ): <span className='badge text-white word-break' style={{background: '#f5c308'}}>Not Completed Yet!</span>}
    //   </strong>
    // )
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_16__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_16__["default"].Case, {
        condition: (data === null || data === void 0 ? void 0 : data.task_approval_date) && lodash__WEBPACK_IMPORTED_MODULE_7___default().includes([4, 8, 9], data === null || data === void 0 ? void 0 : data.board_column_id),
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_approval_date).format("DD-MM-YYYY"), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_approval_date).format("hh:mm A")]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_global_Switch__WEBPACK_IMPORTED_MODULE_16__["default"].Case, {
        condition: !(data !== null && data !== void 0 && data.task_approval_date) && (data === null || data === void 0 ? void 0 : data.task_updated_at) && lodash__WEBPACK_IMPORTED_MODULE_7___default().includes([4, 8, 9], data === null || data === void 0 ? void 0 : data.board_column_id),
        children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_updated_at).format("DD-MM-YYYY"), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {}), dayjs__WEBPACK_IMPORTED_MODULE_0___default()(data === null || data === void 0 ? void 0 : data.task_updated_at).format("hh:mm A"), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {})]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_16__["default"].Case, {
        condition: !lodash__WEBPACK_IMPORTED_MODULE_7___default().includes([4, 8, 9], data === null || data === void 0 ? void 0 : data.board_column_id),
        children: "--"
      })]
    });
  }
}, {
  id: "estimated_time",
  header: "Estimated Time",
  accessorFn: function accessorFn(row) {
    return Number(row === null || row === void 0 ? void 0 : row.estimate_hours) * 60 + Number(row === null || row === void 0 ? void 0 : row.estimate_minutes);
  },
  cell: function cell(_ref15) {
    var _data$estimate_hours, _data$estimate_minute;
    var row = _ref15.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
      children: [(_data$estimate_hours = data === null || data === void 0 ? void 0 : data.estimate_hours) !== null && _data$estimate_hours !== void 0 ? _data$estimate_hours : 0, " hrs ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("br", {}), (_data$estimate_minute = data === null || data === void 0 ? void 0 : data.estimate_minutes) !== null && _data$estimate_minute !== void 0 ? _data$estimate_minute : 0, " mins"]
    });
  }
}, {
  id: "hours_logged",
  header: "Hours Logged",
  accessorKey: "subtasks_hours_logged",
  cell: function cell(_ref16) {
    var row = _ref16.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
      children: (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_4__.convertTime)(data === null || data === void 0 ? void 0 : data.subtasks_hours_logged)
    });
  }
}, {
  id: "assigned_by",
  header: "Assigned By",
  accessorKey: "added_by_name",
  cell: function cell(_ref17) {
    var row = _ref17.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Person__WEBPACK_IMPORTED_MODULE_2__["default"], {
      url: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.added_by),
      avatar: data === null || data === void 0 ? void 0 : data.added_by_avatar,
      name: data === null || data === void 0 ? void 0 : data.added_by_name
    });
  }
}, {
  id: "assigned_to",
  header: "Assigned To",
  accessorKey: "assigned_to_name",
  cell: function cell(_ref18) {
    var row = _ref18.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Person__WEBPACK_IMPORTED_MODULE_2__["default"], {
      url: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.assigned_to_id),
      avatar: data === null || data === void 0 ? void 0 : data.assigned_to_avatar,
      name: data === null || data === void 0 ? void 0 : data.assigned_to_name
    });
  }
}, {
  id: "status",
  header: "Task Status",
  accessorKey: "column_name",
  cell: function cell(_ref19) {
    var row = _ref19.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
      className: "badge text-white",
      style: {
        background: data === null || data === void 0 ? void 0 : data.label_color
      },
      children: data === null || data === void 0 ? void 0 : data.column_name
    });
  }
},
// {
//   id: 'progress',
//   header: 'Progress',
//   cell: ({row}) => {
//     const data = row?.original;
//     const count = Number(data?.subtasks_count);
//     const completed = Number(data?.subtasks_completed_count);
//     let bg = 'bg-transparent';
//     let percent = 0;

//     if(count > 0){percent = (completed / count) * 100;}
//     else{percent = Number(data?.board_column_id)=== 4 ? 100 : 0;}

//     if(percent === 100){
//       bg = 'bg-success'
//     }else if(percent < 100 && percent >= 75){
//       bg = 'bg-info';
//     }else if( percent < 75 && percent >= 25){
//       bg = 'bg-warning'
//     }else bg='bg-danger'

//     return(
//       <div>
//         <div className="progress" style={{height: '16px'}}>
//             <div
//               className={`progress-bar progress-bar-striped progress-bar-animated ${bg}`}
//               role="progressbar"
//               style={{width: `${percent}%`}}
//               aria-valuenow="10"
//               aria-valuemin="0"
//               aria-valuemax="100"
//             >{Math.floor(percent)}%</div>
//         </div>
//       </div>
//     )
//   }
// },
{
  id: "report",
  header: "Report",
  cell: function cell(_ref20) {
    var row = _ref20.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_ReportButton__WEBPACK_IMPORTED_MODULE_5__["default"], {
      row: data
    });
  }
}, {
  id: "action",
  header: "Action",
  cell: function cell(_ref21) {
    var row = _ref21.row;
    var data = row === null || row === void 0 ? void 0 : row.original;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(ActionDropdown, {
      row: data
    });
  }
}];

// Action Dropdown
var ActionDropdown = function ActionDropdown(_ref22) {
  var row = _ref22.row;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1__.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    reportModalOpen = _React$useState2[0],
    setReportModalOpen = _React$useState2[1];
  var singleTask = new _utils_single_task__WEBPACK_IMPORTED_MODULE_11__.SingleTask(row);
  var close = function close() {
    return setReportModalOpen(false);
  };
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_15__.useSelector)(function (s) {
      return s.tasks;
    }),
    subtasks = _useSelector.subtasks;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_15__.useDispatch)();
  // handle report
  var handleReport = function handleReport() {
    // find the index of current task
    var _index = lodash__WEBPACK_IMPORTED_MODULE_7___default().findIndex(subtasks, {
      id: row === null || row === void 0 ? void 0 : row.id
    });
    // create new instance of this row with updated report count;
    var instance = _toConsumableArray(subtasks);
    instance[_index] = _objectSpread(_objectSpread({}, row), {}, {
      subtasks_reports_count: Number(row.subtasks_reports_count) + 1
    });
    dispatch((0,_services_features_tasksSlice__WEBPACK_IMPORTED_MODULE_14__.storeSubTasks)({
      subtasks: _toConsumableArray(instance)
    }));
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_Dropdown__WEBPACK_IMPORTED_MODULE_9__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Dropdown__WEBPACK_IMPORTED_MODULE_9__["default"].Toggle, {
        icon: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
          variant: "tertiary",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
            className: "fa-solid fa-ellipsis-vertical"
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Dropdown__WEBPACK_IMPORTED_MODULE_9__["default"].Menu, {
        placement: "bottom-end",
        className: "py-2 sp1_tasks_tbl_action_dd_menu",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_Dropdown__WEBPACK_IMPORTED_MODULE_9__["default"].Item, {
          onClick: function onClick() {
            return setReportModalOpen(true);
          },
          className: "sp1_tasks_tbl_del",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
            className: "fa-solid fa-bug mr-2"
          }), " Report"]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Modal__WEBPACK_IMPORTED_MODULE_12__["default"], {
      isOpen: reportModalOpen,
      className: "sp1_single_task--modal",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
        className: "sp1_single_task--modal-panerl-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
          className: "sp1_single_task--modal-panel task-report-form--modal-panel",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
            className: "border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
              className: "font-weight-bold f-14",
              children: ["Task#", row === null || row === void 0 ? void 0 : row.id, " : Report"]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_10__["default"], {
              onClick: close,
              className: "",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
                className: "fa-solid fa-xmark"
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
            fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
              className: "py-3 d-flex align-items-center justify-content-center",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_Loader__WEBPACK_IMPORTED_MODULE_13__["default"], {})
            }),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(ReportForm, {
              task: singleTask,
              close: close,
              onSuccess: handleReport
            })
          })]
        })
      })
    })]
  });
};

/***/ }),

/***/ "./resources/js/react/tasks/pages/Subtasks.jsx":
/*!*****************************************************!*\
  !*** ./resources/js/react/tasks/pages/Subtasks.jsx ***!
  \*****************************************************/
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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _global_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../global/Button */ "./resources/js/react/global/Button.jsx");
/* harmony import */ var _global_Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../global/Loader */ "./resources/js/react/global/Loader.jsx");
/* harmony import */ var _services_api_tasksApiSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/api/tasksApiSlice */ "./resources/js/react/services/api/tasksApiSlice.js");
/* harmony import */ var _services_features_tasksSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/features/tasksSlice */ "./resources/js/react/services/features/tasksSlice.js");
/* harmony import */ var _utils_user_details__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/user-details */ "./resources/js/react/utils/user-details.js");
/* harmony import */ var _components_Filter_bar_FilterContainer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Filter-bar/FilterContainer */ "./resources/js/react/tasks/components/Filter-bar/FilterContainer.jsx");
/* harmony import */ var _components_Filter_bar_Filterbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Filter-bar/Filterbar */ "./resources/js/react/tasks/components/Filter-bar/Filterbar.jsx");
/* harmony import */ var _components_PrimaryPageAuthorizationTable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/PrimaryPageAuthorizationTable */ "./resources/js/react/tasks/components/PrimaryPageAuthorizationTable.jsx");
/* harmony import */ var _components_Searchbox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/Searchbox */ "./resources/js/react/tasks/components/Searchbox.jsx");
/* harmony import */ var _components_SubtaskTable__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/SubtaskTable */ "./resources/js/react/tasks/components/SubtaskTable.jsx");
/* harmony import */ var _components_SubtaskTableColumns__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/SubtaskTableColumns */ "./resources/js/react/tasks/components/SubtaskTableColumns.jsx");
/* harmony import */ var _components_Tabbar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/Tabbar */ "./resources/js/react/tasks/components/Tabbar.jsx");
/* harmony import */ var _components_table_TableFilter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/table/TableFilter */ "./resources/js/react/tasks/components/table/TableFilter.jsx");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../constant */ "./resources/js/react/tasks/constant.js");
/* harmony import */ var _components_SubTaskExportButton__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../components/SubTaskExportButton */ "./resources/js/react/tasks/components/SubTaskExportButton.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




















// current user


var auth = new _utils_user_details__WEBPACK_IMPORTED_MODULE_7__.User(window.Laravel.user);
var Subtasks = function Subtasks() {
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(function (s) {
      return s.tasks;
    }),
    tasks = _useSelector.tasks;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    filter = _React$useState2[0],
    setFilter = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_1___default().useState(""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    search = _React$useState4[0],
    setSearch = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_1___default().useState(new Object((0,_constant__WEBPACK_IMPORTED_MODULE_16__.defaultColumnVisibility)(auth))),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    columnVisibility = _React$useState6[0],
    setColumnVisibility = _React$useState6[1];

  // api function
  var _useLazyGetAllSubtask = (0,_services_api_tasksApiSlice__WEBPACK_IMPORTED_MODULE_5__.useLazyGetAllSubtaskQuery)(),
    _useLazyGetAllSubtask2 = _slicedToArray(_useLazyGetAllSubtask, 2),
    getAllSubtask = _useLazyGetAllSubtask2[0],
    isFetching = _useLazyGetAllSubtask2[1].isFetching;
  var _useCheckUnAuthorized = (0,_services_api_tasksApiSlice__WEBPACK_IMPORTED_MODULE_5__.useCheckUnAuthorizedTaskTypeQuery)(),
    unAuthorizedType = _useCheckUnAuthorized.data;
  var _useSearchParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_19__.useSearchParams)(),
    _useSearchParams2 = _slicedToArray(_useSearchParams, 2),
    searchParams = _useSearchParams2[0],
    setSearchParams = _useSearchParams2[1];
  var onFilter = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(filter) {
      var queryObject, queryString;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            queryObject = lodash__WEBPACK_IMPORTED_MODULE_0___default().pickBy(filter, Boolean);
            queryString = new URLSearchParams(queryObject).toString();
            setFilter(queryObject);
            if (!(filter !== null && filter !== void 0 && filter.start_date && filter !== null && filter !== void 0 && filter.end_date)) {
              _context.next = 6;
              break;
            }
            _context.next = 6;
            return getAllSubtask("".concat(queryString)).unwrap().then(function (res) {
              var _data = res === null || res === void 0 ? void 0 : res.tasks;
              if (auth.getRoleId() === 4) {
                _data = lodash__WEBPACK_IMPORTED_MODULE_0___default().filter(res.tasks, function (d) {
                  return Number(d.project_manager_id) === auth.getId();
                });
              } else if (auth.getRoleId() === 6) {
                _data = lodash__WEBPACK_IMPORTED_MODULE_0___default().filter(res.tasks, function (d) {
                  return Number(d.added_by) === auth.getId();
                });
              } else if (auth.isHasRolePermission(13)) {
                _data = lodash__WEBPACK_IMPORTED_MODULE_0___default().filter(res.tasks, function (d) {
                  return Number(d.added_by) === auth.getId();
                });
              } else if (auth.getRoleId() === 9 || auth.getRoleId() === 10) {
                _data = lodash__WEBPACK_IMPORTED_MODULE_0___default().filter(res.tasks, function (d) {
                  return Number(d.assigned_to_id) === auth.getId();
                });
              } else if (lodash__WEBPACK_IMPORTED_MODULE_0___default().includes([14, 15, 16, 17], auth.getRoleId())) {
                _data = lodash__WEBPACK_IMPORTED_MODULE_0___default().filter(res.tasks, function (d) {
                  return Number(d.assigned_to_id) === auth.getId();
                });
              }
              var data = lodash__WEBPACK_IMPORTED_MODULE_0___default().orderBy(_data, "due_date", "desc");
              dispatch((0,_services_features_tasksSlice__WEBPACK_IMPORTED_MODULE_6__.storeSubTasks)({
                subtasks: data
              }));
            })["catch"](function (err) {
              var _console;
              return (/* eslint-disable */(_console = console).log.apply(_console, _toConsumableArray(oo_oo("3616266003_87_32_87_48_4", err)))
              );
            });
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function onFilter(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  // handle refresh button
  var onRefreshButtonClick = function onRefreshButtonClick(e) {
    e.preventDefault();
    onFilter(filter);
  };
  // let tableColumns = SubTasksTableColumns;

  var handleFilterColumns = function handleFilterColumns() {
    var tableColumns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var role = arguments.length > 1 ? arguments[1] : undefined;
    var newTableColumns;
    if (role === 5) {
      // console.log('if',{role});
      newTableColumns = tableColumns.filter(function (d) {
        return d.id !== "action" && d.id !== "milestone" && d.id !== "deliverable" && d.id !== "project" && d.id !== "assigned_to";
      });
    } else {
      // console.log('else',{role});
      newTableColumns = tableColumns.filter(function (d) {
        return d.id !== "action";
      });
    }
    return newTableColumns;
  };

  // fetch table data
  var fetchTasksTypeData = function fetchTasksTypeData() {
    searchParams.set("modal", "primary_task_authorization");
    searchParams.set("show", "pending");
    setSearchParams(searchParams);
  };
  var isProjectManager = auth.getRoleId() === 4 ? true : false;
  var primaryPageButton = isProjectManager ? "Primary Page [Awaiting Authorization]" : "Primary Page [Need Authorization]";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_Filter_bar_FilterContainer__WEBPACK_IMPORTED_MODULE_8__["default"], {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_Filter_bar_Filterbar__WEBPACK_IMPORTED_MODULE_9__["default"], {
        onFilter: onFilter,
        page: "subtasks"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
      className: "sp1_tlr_container",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
        className: "sp1_tlr_tbl_container",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
          className: "mb-3 d-flex align-items-center flex-wrap justify-content-between",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_Tabbar__WEBPACK_IMPORTED_MODULE_14__["default"], {}), lodash__WEBPACK_IMPORTED_MODULE_0___default().includes([1, 8], auth === null || auth === void 0 ? void 0 : auth.getRoleId()) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_global_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
            onClick: fetchTasksTypeData,
            className: "sp1_tlr_tab active ml-2 mb-2 text-white",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("i", {
              className: "fa-solid fa-hourglass-half"
            }), primaryPageButton, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("span", {
              className: "badge badge-light",
              children: unAuthorizedType === null || unAuthorizedType === void 0 ? void 0 : unAuthorizedType.task_types
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_SubTaskExportButton__WEBPACK_IMPORTED_MODULE_17__["default"], {
              filter: filter
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "ml-auto mr-2",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_global_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
              onClick: onRefreshButtonClick,
              children: isFetching ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_global_Loader__WEBPACK_IMPORTED_MODULE_4__["default"], {
                title: "Loading...",
                borderRightColor: "white"
              }) : "Refresh"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            style: {
              maxWidth: "300px"
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_Searchbox__WEBPACK_IMPORTED_MODULE_11__["default"], {
              value: search,
              onChange: setSearch
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            className: "ml-2",
            style: {
              marginTop: "2px"
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_table_TableFilter__WEBPACK_IMPORTED_MODULE_15__["default"], {
              tableName: "subTaskTable",
              columns: handleFilterColumns(_components_SubtaskTableColumns__WEBPACK_IMPORTED_MODULE_13__.SubTasksTableColumns, auth === null || auth === void 0 ? void 0 : auth.getRoleId()),
              columnVisibility: columnVisibility,
              setColumnVisibility: setColumnVisibility
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_SubtaskTable__WEBPACK_IMPORTED_MODULE_12__["default"], {
          isLoading: isFetching,
          filter: filter,
          tableName: "subTaskTable",
          search: search,
          reportPermission: [1, 8, 5],
          columnVisibility: columnVisibility,
          setColumnVisibility: setColumnVisibility,
          tableColumns: handleFilterColumns(_components_SubtaskTableColumns__WEBPACK_IMPORTED_MODULE_13__.SubTasksTableColumns, auth === null || auth === void 0 ? void 0 : auth.getRoleId())
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_PrimaryPageAuthorizationTable__WEBPACK_IMPORTED_MODULE_10__["default"], {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Subtasks);
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */
;
function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x56c922=_0x3b3b;function _0x3724(){var _0x452956=['default','performance','getOwnPropertySymbols','totalStrLength','toString','error','_p_name','edge','expId','valueOf','unknown','onclose','getWebSocketClass','_dateToString','','hasOwnProperty','capped','reduceLimits','noFunctions','elapsed','_isArray','hostname','set','autoExpandMaxDepth','funcName','path','_isNegativeZero','_cleanNode','21HbYcbi','_propertyName','2691chkCSw','message','serialize','_HTMLAllCollection','props','toUpperCase','[object\\x20Set]','','root_exp','value','_objectToString','setter','__es'+'Module','logger\\x20websocket\\x20error','allStrLength','1111bHnbpv','_treeNodePropertiesAfterFullValue','perf_hooks','call','cappedProps','toLowerCase','_sortProps','NEGATIVE_INFINITY','name','_addProperty','[object\\x20Date]','NEXT_RUNTIME','count','port','_setNodeExpressionPath','enumerable','_socket','onerror','22764FhTwCC','61340mRPwQL','\\x20server','_addLoadNode','date','autoExpandPreviousObjects','_inBrowser','expressionsToEvaluate','time','symbol','warn','onmessage','RegExp','_numberRegExp','readyState','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_hasSetOnItsPath','_sendErrorMessage','bigint','type','sortProps','_ws','_setNodePermissions','autoExpandPropertyCount','_hasSymbolPropertyOnItsPath','_isUndefined','_keyStrRegExp','eventReceivedCallback','then','astro','_WebSocketClass','_additionalMetadata','bind','pathToFileURL','_getOwnPropertyDescriptor','pop','level','method','dockerizedApp','nuxt','coverage','current','args','7298MsGDKO','substr','trace',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.333\\\\node_modules\",'1','_type','host','_undefined','_setNodeLabel','autoExpand','\\x20browser','node','_allowedToConnectOnSend','_p_','_hasMapOnItsPath','HTMLAllCollection','unref','17AKcVHJ','_blacklistedProperty','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','_addObjectProperty','number','stringify','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','_getOwnPropertySymbols','positiveInfinity','...','_connecting','prototype','Map','_addFunctionsNode','24tBozSC','autoExpandLimit','1722404191806','data','Buffer','location','disabledTrace','url','send','resolveGetters','_allowedToSend','strLength','env','test','_isPrimitiveType','close','forEach','hits','map','_disposeWebsocket','hrtime','_processTreeNodeResult','[object\\x20Map]','console','_isPrimitiveWrapperType','stackTraceLimit','null','global','timeStamp','string','_connected','replace','catch','Number','getter','10CEfuEn','depth','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','sort','_webSocketErrorDocsLink','get','_maxConnectAttemptCount','index','_setNodeId','stack','getPrototypeOf','6CfPYzO','nan','_regExpToString','undefined','now','_console_ninja_session','getOwnPropertyNames','log','_isSet','parent','isExpressionToEvaluate','_reconnectTimeout','121910MFdrSP','_console_ninja','getOwnPropertyDescriptor','9254zBoMab','reload','process','168248AszMMW','elements','array','_getOwnPropertyNames','isArray','onopen','_Symbol','Symbol','Set','defineProperty','push','next.js','49717','function','versions','String','negativeInfinity','_connectToHostNow','disabledLog','rootExpression','negativeZero','split','length','_setNodeQueryPath','_property','_isMap','concat','_WebSocket','angular','_connectAttemptCount','indexOf','charAt','nodeModules','_attemptToReconnectShortly','_setNodeExpandableState','origin','object','ws://','_consoleNinjaAllowedToStart','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','WebSocket','remix',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'_treeNodePropertiesBeforeFullValue','1070748hIRGCa','constructor','_capIfString','gateway.docker.internal','_inNextEdge'];_0x3724=function(){return _0x452956;};return _0x3724();}(function(_0x3b2e75,_0x100eef){var _0xaae758=_0x3b3b,_0x39a003=_0x3b2e75();while(!![]){try{var _0x213834=-parseInt(_0xaae758(0x29a))/0x1*(parseInt(_0xaae758(0x289))/0x2)+parseInt(_0xaae758(0x2d6))/0x3*(-parseInt(_0xaae758(0x25f))/0x4)+parseInt(_0xaae758(0x1e8))/0x5*(parseInt(_0xaae758(0x2a8))/0x6)+-parseInt(_0xaae758(0x23b))/0x7*(parseInt(_0xaae758(0x1ee))/0x8)+parseInt(_0xaae758(0x21a))/0x9*(parseInt(_0xaae758(0x2cb))/0xa)+parseInt(_0xaae758(0x24c))/0xb*(parseInt(_0xaae758(0x25e))/0xc)+parseInt(_0xaae758(0x23d))/0xd*(-parseInt(_0xaae758(0x1eb))/0xe);if(_0x213834===_0x100eef)break;else _0x39a003['push'](_0x39a003['shift']());}catch(_0x19d61e){_0x39a003['push'](_0x39a003['shift']());}}}(_0x3724,0x1c312));function _0x3b3b(_0xa5dd9b,_0x1fc6e7){var _0x37245e=_0x3724();return _0x3b3b=function(_0x3b3b1d,_0x3d24fd){_0x3b3b1d=_0x3b3b1d-0x1e3;var _0x474789=_0x37245e[_0x3b3b1d];return _0x474789;},_0x3b3b(_0xa5dd9b,_0x1fc6e7);}var K=Object['create'],Q=Object[_0x56c922(0x1f7)],G=Object[_0x56c922(0x1ea)],ee=Object[_0x56c922(0x2dc)],te=Object[_0x56c922(0x2d5)],ne=Object['prototype'][_0x56c922(0x22e)],re=(_0x1648d2,_0x564d56,_0x234acc,_0x5da36c)=>{var _0x3ca27e=_0x56c922;if(_0x564d56&&typeof _0x564d56==_0x3ca27e(0x212)||typeof _0x564d56==_0x3ca27e(0x1fb)){for(let _0x312ec2 of ee(_0x564d56))!ne['call'](_0x1648d2,_0x312ec2)&&_0x312ec2!==_0x234acc&&Q(_0x1648d2,_0x312ec2,{'get':()=>_0x564d56[_0x312ec2],'enumerable':!(_0x5da36c=G(_0x564d56,_0x312ec2))||_0x5da36c[_0x3ca27e(0x25b)]});}return _0x1648d2;},V=(_0xacd33,_0x2ce21e,_0x24be20)=>(_0x24be20=_0xacd33!=null?K(te(_0xacd33)):{},re(_0x2ce21e||!_0xacd33||!_0xacd33[_0x56c922(0x249)]?Q(_0x24be20,_0x56c922(0x21f),{'value':_0xacd33,'enumerable':!0x0}):_0x24be20,_0xacd33)),x=class{constructor(_0x205320,_0x10ea65,_0x34e838,_0x454d2d,_0x40c019,_0x4eedd9){var _0x1bc9ba=_0x56c922,_0x3b5bf5,_0x2cd30b,_0x365841,_0x101bf4;this[_0x1bc9ba(0x2c3)]=_0x205320,this[_0x1bc9ba(0x28f)]=_0x10ea65,this['port']=_0x34e838,this[_0x1bc9ba(0x20e)]=_0x454d2d,this[_0x1bc9ba(0x284)]=_0x40c019,this[_0x1bc9ba(0x279)]=_0x4eedd9,this[_0x1bc9ba(0x2b2)]=!0x0,this['_allowedToConnectOnSend']=!0x0,this[_0x1bc9ba(0x2c6)]=!0x1,this[_0x1bc9ba(0x2a4)]=!0x1,this[_0x1bc9ba(0x21e)]=((_0x2cd30b=(_0x3b5bf5=_0x205320[_0x1bc9ba(0x1ed)])==null?void 0x0:_0x3b5bf5[_0x1bc9ba(0x2b4)])==null?void 0x0:_0x2cd30b[_0x1bc9ba(0x257)])==='edge',this[_0x1bc9ba(0x264)]=!((_0x101bf4=(_0x365841=this[_0x1bc9ba(0x2c3)][_0x1bc9ba(0x1ed)])==null?void 0x0:_0x365841[_0x1bc9ba(0x1fc)])!=null&&_0x101bf4['node'])&&!this[_0x1bc9ba(0x21e)],this[_0x1bc9ba(0x27c)]=null,this['_connectAttemptCount']=0x0,this[_0x1bc9ba(0x2d1)]=0x14,this[_0x1bc9ba(0x2cf)]='https://tinyurl.com/37x8b79t',this['_sendErrorMessage']=(this[_0x1bc9ba(0x264)]?_0x1bc9ba(0x29c):_0x1bc9ba(0x26d))+this[_0x1bc9ba(0x2cf)];}async['getWebSocketClass'](){var _0x4471e7=_0x56c922,_0x5a8fa0,_0x134343;if(this[_0x4471e7(0x27c)])return this[_0x4471e7(0x27c)];let _0x21ed31;if(this['_inBrowser']||this[_0x4471e7(0x21e)])_0x21ed31=this[_0x4471e7(0x2c3)][_0x4471e7(0x216)];else{if((_0x5a8fa0=this['global'][_0x4471e7(0x1ed)])!=null&&_0x5a8fa0[_0x4471e7(0x209)])_0x21ed31=(_0x134343=this[_0x4471e7(0x2c3)][_0x4471e7(0x1ed)])==null?void 0x0:_0x134343[_0x4471e7(0x209)];else try{let _0x527bf0=await import('path');_0x21ed31=(await import((await import(_0x4471e7(0x2af)))[_0x4471e7(0x27f)](_0x527bf0['join'](this[_0x4471e7(0x20e)],'ws/index.js'))[_0x4471e7(0x223)]()))[_0x4471e7(0x21f)];}catch{try{_0x21ed31=require(require(_0x4471e7(0x238))['join'](this[_0x4471e7(0x20e)],'ws'));}catch{throw new Error('failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket');}}}return this['_WebSocketClass']=_0x21ed31,_0x21ed31;}[_0x56c922(0x1ff)](){var _0x245f66=_0x56c922;this[_0x245f66(0x2a4)]||this[_0x245f66(0x2c6)]||this[_0x245f66(0x20b)]>=this[_0x245f66(0x2d1)]||(this['_allowedToConnectOnSend']=!0x1,this[_0x245f66(0x2a4)]=!0x0,this['_connectAttemptCount']++,this[_0x245f66(0x273)]=new Promise((_0xb8e14b,_0xbb343)=>{var _0x1823e9=_0x245f66;this[_0x1823e9(0x22b)]()[_0x1823e9(0x27a)](_0x260908=>{var _0x337f7b=_0x1823e9;let _0x343294=new _0x260908(_0x337f7b(0x213)+(!this[_0x337f7b(0x264)]&&this[_0x337f7b(0x284)]?_0x337f7b(0x21d):this['host'])+':'+this[_0x337f7b(0x259)]);_0x343294[_0x337f7b(0x25d)]=()=>{var _0x3737d5=_0x337f7b;this[_0x3737d5(0x2b2)]=!0x1,this[_0x3737d5(0x2bb)](_0x343294),this[_0x3737d5(0x20f)](),_0xbb343(new Error(_0x3737d5(0x24a)));},_0x343294[_0x337f7b(0x1f3)]=()=>{var _0x457f56=_0x337f7b;this[_0x457f56(0x264)]||_0x343294['_socket']&&_0x343294['_socket'][_0x457f56(0x299)]&&_0x343294[_0x457f56(0x25c)][_0x457f56(0x299)](),_0xb8e14b(_0x343294);},_0x343294[_0x337f7b(0x22a)]=()=>{var _0x23b861=_0x337f7b;this[_0x23b861(0x295)]=!0x0,this[_0x23b861(0x2bb)](_0x343294),this[_0x23b861(0x20f)]();},_0x343294[_0x337f7b(0x269)]=_0x43ba5d=>{var _0x240c42=_0x337f7b;try{if(!(_0x43ba5d!=null&&_0x43ba5d[_0x240c42(0x2ab)])||!this[_0x240c42(0x279)])return;let _0x4ba88e=JSON['parse'](_0x43ba5d[_0x240c42(0x2ab)]);this[_0x240c42(0x279)](_0x4ba88e[_0x240c42(0x283)],_0x4ba88e['args'],this['global'],this[_0x240c42(0x264)]);}catch{}};})[_0x1823e9(0x27a)](_0x443b92=>(this[_0x1823e9(0x2c6)]=!0x0,this['_connecting']=!0x1,this[_0x1823e9(0x295)]=!0x1,this[_0x1823e9(0x2b2)]=!0x0,this[_0x1823e9(0x20b)]=0x0,_0x443b92))['catch'](_0x1b7f09=>(this[_0x1823e9(0x2c6)]=!0x1,this['_connecting']=!0x1,console[_0x1823e9(0x268)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this[_0x1823e9(0x2cf)]),_0xbb343(new Error(_0x1823e9(0x2cd)+(_0x1b7f09&&_0x1b7f09['message'])))));}));}[_0x56c922(0x2bb)](_0x46c93f){var _0x48f3d8=_0x56c922;this[_0x48f3d8(0x2c6)]=!0x1,this['_connecting']=!0x1;try{_0x46c93f[_0x48f3d8(0x22a)]=null,_0x46c93f[_0x48f3d8(0x25d)]=null,_0x46c93f[_0x48f3d8(0x1f3)]=null;}catch{}try{_0x46c93f[_0x48f3d8(0x26c)]<0x2&&_0x46c93f[_0x48f3d8(0x2b7)]();}catch{}}[_0x56c922(0x20f)](){var _0x8bd8cf=_0x56c922;clearTimeout(this['_reconnectTimeout']),!(this['_connectAttemptCount']>=this[_0x8bd8cf(0x2d1)])&&(this['_reconnectTimeout']=setTimeout(()=>{var _0x108b4=_0x8bd8cf,_0x25b436;this[_0x108b4(0x2c6)]||this[_0x108b4(0x2a4)]||(this[_0x108b4(0x1ff)](),(_0x25b436=this[_0x108b4(0x273)])==null||_0x25b436[_0x108b4(0x2c8)](()=>this[_0x108b4(0x20f)]()));},0x1f4),this[_0x8bd8cf(0x1e7)][_0x8bd8cf(0x299)]&&this[_0x8bd8cf(0x1e7)][_0x8bd8cf(0x299)]());}async[_0x56c922(0x2b0)](_0x572f8a){var _0x4d8305=_0x56c922;try{if(!this[_0x4d8305(0x2b2)])return;this[_0x4d8305(0x295)]&&this['_connectToHostNow'](),(await this[_0x4d8305(0x273)])[_0x4d8305(0x2b0)](JSON[_0x4d8305(0x29f)](_0x572f8a));}catch(_0x58e704){console['warn'](this[_0x4d8305(0x26f)]+':\\x20'+(_0x58e704&&_0x58e704[_0x4d8305(0x23e)])),this['_allowedToSend']=!0x1,this[_0x4d8305(0x20f)]();}}};function q(_0x17bd1a,_0x58b458,_0x1c19fa,_0x12f945,_0x54be69,_0x3c3b0c,_0x499c56,_0x31081b=ie){var _0x1641dd=_0x56c922;let _0xb38646=_0x1c19fa[_0x1641dd(0x203)](',')[_0x1641dd(0x2ba)](_0x4b50d9=>{var _0x2195a2=_0x1641dd,_0x1aff5c,_0x26da47,_0x2d4c39,_0x1ba2b8;try{if(!_0x17bd1a['_console_ninja_session']){let _0x130c77=((_0x26da47=(_0x1aff5c=_0x17bd1a[_0x2195a2(0x1ed)])==null?void 0x0:_0x1aff5c[_0x2195a2(0x1fc)])==null?void 0x0:_0x26da47[_0x2195a2(0x294)])||((_0x1ba2b8=(_0x2d4c39=_0x17bd1a[_0x2195a2(0x1ed)])==null?void 0x0:_0x2d4c39[_0x2195a2(0x2b4)])==null?void 0x0:_0x1ba2b8[_0x2195a2(0x257)])==='edge';(_0x54be69===_0x2195a2(0x1f9)||_0x54be69===_0x2195a2(0x217)||_0x54be69===_0x2195a2(0x27b)||_0x54be69===_0x2195a2(0x20a))&&(_0x54be69+=_0x130c77?_0x2195a2(0x260):_0x2195a2(0x293)),_0x17bd1a[_0x2195a2(0x2db)]={'id':+new Date(),'tool':_0x54be69},_0x499c56&&_0x54be69&&!_0x130c77&&console[_0x2195a2(0x1e3)](_0x2195a2(0x215)+(_0x54be69[_0x2195a2(0x20d)](0x0)[_0x2195a2(0x242)]()+_0x54be69['substr'](0x1))+',','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)',_0x2195a2(0x2a0));}let _0x4ba1cc=new x(_0x17bd1a,_0x58b458,_0x4b50d9,_0x12f945,_0x3c3b0c,_0x31081b);return _0x4ba1cc[_0x2195a2(0x2b0)][_0x2195a2(0x27e)](_0x4ba1cc);}catch(_0x59f9f4){return console[_0x2195a2(0x268)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host',_0x59f9f4&&_0x59f9f4[_0x2195a2(0x23e)]),()=>{};}});return _0x1a1675=>_0xb38646[_0x1641dd(0x2b8)](_0x1cf109=>_0x1cf109(_0x1a1675));}function ie(_0x590047,_0xf0409d,_0x3f99bf,_0xdf4b64){var _0x2eea14=_0x56c922;_0xdf4b64&&_0x590047===_0x2eea14(0x1ec)&&_0x3f99bf['location'][_0x2eea14(0x1ec)]();}function b(_0x3a4e3e){var _0x3d75e9=_0x56c922,_0xe6e3e0,_0x39c1b2;let _0x5537b6=function(_0x895c6d,_0x5f092b){return _0x5f092b-_0x895c6d;},_0x5bb5f0;if(_0x3a4e3e[_0x3d75e9(0x220)])_0x5bb5f0=function(){var _0x4d5deb=_0x3d75e9;return _0x3a4e3e[_0x4d5deb(0x220)]['now']();};else{if(_0x3a4e3e[_0x3d75e9(0x1ed)]&&_0x3a4e3e[_0x3d75e9(0x1ed)][_0x3d75e9(0x2bc)]&&((_0x39c1b2=(_0xe6e3e0=_0x3a4e3e[_0x3d75e9(0x1ed)])==null?void 0x0:_0xe6e3e0['env'])==null?void 0x0:_0x39c1b2[_0x3d75e9(0x257)])!=='edge')_0x5bb5f0=function(){return _0x3a4e3e['process']['hrtime']();},_0x5537b6=function(_0x597c1e,_0x28d2e7){return 0x3e8*(_0x28d2e7[0x0]-_0x597c1e[0x0])+(_0x28d2e7[0x1]-_0x597c1e[0x1])/0xf4240;};else try{let {performance:_0x79ef46}=require(_0x3d75e9(0x24e));_0x5bb5f0=function(){var _0x1fc306=_0x3d75e9;return _0x79ef46[_0x1fc306(0x2da)]();};}catch{_0x5bb5f0=function(){return+new Date();};}}return{'elapsed':_0x5537b6,'timeStamp':_0x5bb5f0,'now':()=>Date['now']()};}function X(_0x339b3b,_0x5efa14,_0x5738d7){var _0x5048e5=_0x56c922,_0x148843,_0x3facf7,_0xbb5221,_0x12f32b,_0x421ffb;if(_0x339b3b[_0x5048e5(0x214)]!==void 0x0)return _0x339b3b['_consoleNinjaAllowedToStart'];let _0x150bc8=((_0x3facf7=(_0x148843=_0x339b3b[_0x5048e5(0x1ed)])==null?void 0x0:_0x148843[_0x5048e5(0x1fc)])==null?void 0x0:_0x3facf7['node'])||((_0x12f32b=(_0xbb5221=_0x339b3b[_0x5048e5(0x1ed)])==null?void 0x0:_0xbb5221['env'])==null?void 0x0:_0x12f32b[_0x5048e5(0x257)])===_0x5048e5(0x226);return _0x150bc8&&_0x5738d7===_0x5048e5(0x285)?_0x339b3b[_0x5048e5(0x214)]=!0x1:_0x339b3b[_0x5048e5(0x214)]=_0x150bc8||!_0x5efa14||((_0x421ffb=_0x339b3b[_0x5048e5(0x2ad)])==null?void 0x0:_0x421ffb[_0x5048e5(0x234)])&&_0x5efa14['includes'](_0x339b3b[_0x5048e5(0x2ad)][_0x5048e5(0x234)]),_0x339b3b[_0x5048e5(0x214)];}function H(_0x4c4abf,_0x5f4d5b,_0x4fb570,_0xd186fc){var _0x2aa996=_0x56c922;_0x4c4abf=_0x4c4abf,_0x5f4d5b=_0x5f4d5b,_0x4fb570=_0x4fb570,_0xd186fc=_0xd186fc;let _0x474813=b(_0x4c4abf),_0x1ac05c=_0x474813[_0x2aa996(0x232)],_0x4cbcec=_0x474813[_0x2aa996(0x2c4)];class _0x108064{constructor(){var _0x25579d=_0x2aa996;this[_0x25579d(0x278)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x25579d(0x26b)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0x25579d(0x290)]=_0x4c4abf[_0x25579d(0x2d9)],this[_0x25579d(0x240)]=_0x4c4abf[_0x25579d(0x298)],this[_0x25579d(0x280)]=Object['getOwnPropertyDescriptor'],this[_0x25579d(0x1f1)]=Object['getOwnPropertyNames'],this['_Symbol']=_0x4c4abf[_0x25579d(0x1f5)],this[_0x25579d(0x2d8)]=RegExp[_0x25579d(0x2a5)]['toString'],this[_0x25579d(0x22c)]=Date[_0x25579d(0x2a5)][_0x25579d(0x223)];}[_0x2aa996(0x23f)](_0x6662ff,_0x4e89cb,_0x3e27b4,_0x45ba5e){var _0x1b3004=_0x2aa996,_0x49945b=this,_0x13d07c=_0x3e27b4[_0x1b3004(0x292)];function _0x52181a(_0x3099b0,_0x312272,_0x5ee119){var _0x46ce11=_0x1b3004;_0x312272['type']=_0x46ce11(0x229),_0x312272['error']=_0x3099b0[_0x46ce11(0x23e)],_0x232efd=_0x5ee119[_0x46ce11(0x294)]['current'],_0x5ee119['node'][_0x46ce11(0x287)]=_0x312272,_0x49945b['_treeNodePropertiesBeforeFullValue'](_0x312272,_0x5ee119);}try{_0x3e27b4[_0x1b3004(0x282)]++,_0x3e27b4[_0x1b3004(0x292)]&&_0x3e27b4['autoExpandPreviousObjects'][_0x1b3004(0x1f8)](_0x4e89cb);var _0x5ed6a3,_0x30ad8c,_0x1d45cd,_0x2162a6,_0x4a37bc=[],_0x22eee1=[],_0x4e6283,_0x5854ca=this['_type'](_0x4e89cb),_0x210782=_0x5854ca===_0x1b3004(0x1f0),_0x334395=!0x1,_0x31e9cc=_0x5854ca===_0x1b3004(0x1fb),_0x27d99f=this['_isPrimitiveType'](_0x5854ca),_0x1f86f6=this[_0x1b3004(0x2c0)](_0x5854ca),_0x1b9b8d=_0x27d99f||_0x1f86f6,_0xffa004={},_0x4136c2=0x0,_0x1f02fb=!0x1,_0x232efd,_0x58fc0c=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x3e27b4[_0x1b3004(0x2cc)]){if(_0x210782){if(_0x30ad8c=_0x4e89cb['length'],_0x30ad8c>_0x3e27b4['elements']){for(_0x1d45cd=0x0,_0x2162a6=_0x3e27b4[_0x1b3004(0x1ef)],_0x5ed6a3=_0x1d45cd;_0x5ed6a3<_0x2162a6;_0x5ed6a3++)_0x22eee1[_0x1b3004(0x1f8)](_0x49945b[_0x1b3004(0x255)](_0x4a37bc,_0x4e89cb,_0x5854ca,_0x5ed6a3,_0x3e27b4));_0x6662ff['cappedElements']=!0x0;}else{for(_0x1d45cd=0x0,_0x2162a6=_0x30ad8c,_0x5ed6a3=_0x1d45cd;_0x5ed6a3<_0x2162a6;_0x5ed6a3++)_0x22eee1[_0x1b3004(0x1f8)](_0x49945b['_addProperty'](_0x4a37bc,_0x4e89cb,_0x5854ca,_0x5ed6a3,_0x3e27b4));}_0x3e27b4['autoExpandPropertyCount']+=_0x22eee1[_0x1b3004(0x204)];}if(!(_0x5854ca===_0x1b3004(0x2c2)||_0x5854ca===_0x1b3004(0x2d9))&&!_0x27d99f&&_0x5854ca!==_0x1b3004(0x1fd)&&_0x5854ca!==_0x1b3004(0x2ac)&&_0x5854ca!==_0x1b3004(0x270)){var _0x40bf98=_0x45ba5e[_0x1b3004(0x241)]||_0x3e27b4[_0x1b3004(0x241)];if(this[_0x1b3004(0x1e4)](_0x4e89cb)?(_0x5ed6a3=0x0,_0x4e89cb[_0x1b3004(0x2b8)](function(_0x4e4dc6){var _0x21e8bb=_0x1b3004;if(_0x4136c2++,_0x3e27b4[_0x21e8bb(0x275)]++,_0x4136c2>_0x40bf98){_0x1f02fb=!0x0;return;}if(!_0x3e27b4[_0x21e8bb(0x1e6)]&&_0x3e27b4[_0x21e8bb(0x292)]&&_0x3e27b4['autoExpandPropertyCount']>_0x3e27b4['autoExpandLimit']){_0x1f02fb=!0x0;return;}_0x22eee1[_0x21e8bb(0x1f8)](_0x49945b[_0x21e8bb(0x255)](_0x4a37bc,_0x4e89cb,_0x21e8bb(0x1f6),_0x5ed6a3++,_0x3e27b4,function(_0x4ebc43){return function(){return _0x4ebc43;};}(_0x4e4dc6)));})):this[_0x1b3004(0x207)](_0x4e89cb)&&_0x4e89cb[_0x1b3004(0x2b8)](function(_0x21dea7,_0x12aff4){var _0x5ddb0d=_0x1b3004;if(_0x4136c2++,_0x3e27b4[_0x5ddb0d(0x275)]++,_0x4136c2>_0x40bf98){_0x1f02fb=!0x0;return;}if(!_0x3e27b4[_0x5ddb0d(0x1e6)]&&_0x3e27b4[_0x5ddb0d(0x292)]&&_0x3e27b4['autoExpandPropertyCount']>_0x3e27b4[_0x5ddb0d(0x2a9)]){_0x1f02fb=!0x0;return;}var _0x1580c5=_0x12aff4[_0x5ddb0d(0x223)]();_0x1580c5['length']>0x64&&(_0x1580c5=_0x1580c5['slice'](0x0,0x64)+_0x5ddb0d(0x2a3)),_0x22eee1['push'](_0x49945b['_addProperty'](_0x4a37bc,_0x4e89cb,_0x5ddb0d(0x2a6),_0x1580c5,_0x3e27b4,function(_0x39f255){return function(){return _0x39f255;};}(_0x21dea7)));}),!_0x334395){try{for(_0x4e6283 in _0x4e89cb)if(!(_0x210782&&_0x58fc0c[_0x1b3004(0x2b5)](_0x4e6283))&&!this[_0x1b3004(0x29b)](_0x4e89cb,_0x4e6283,_0x3e27b4)){if(_0x4136c2++,_0x3e27b4[_0x1b3004(0x275)]++,_0x4136c2>_0x40bf98){_0x1f02fb=!0x0;break;}if(!_0x3e27b4[_0x1b3004(0x1e6)]&&_0x3e27b4[_0x1b3004(0x292)]&&_0x3e27b4[_0x1b3004(0x275)]>_0x3e27b4[_0x1b3004(0x2a9)]){_0x1f02fb=!0x0;break;}_0x22eee1[_0x1b3004(0x1f8)](_0x49945b[_0x1b3004(0x29d)](_0x4a37bc,_0xffa004,_0x4e89cb,_0x5854ca,_0x4e6283,_0x3e27b4));}}catch{}if(_0xffa004['_p_length']=!0x0,_0x31e9cc&&(_0xffa004[_0x1b3004(0x225)]=!0x0),!_0x1f02fb){var _0x3269da=[][_0x1b3004(0x208)](this[_0x1b3004(0x1f1)](_0x4e89cb))[_0x1b3004(0x208)](this[_0x1b3004(0x2a1)](_0x4e89cb));for(_0x5ed6a3=0x0,_0x30ad8c=_0x3269da[_0x1b3004(0x204)];_0x5ed6a3<_0x30ad8c;_0x5ed6a3++)if(_0x4e6283=_0x3269da[_0x5ed6a3],!(_0x210782&&_0x58fc0c[_0x1b3004(0x2b5)](_0x4e6283[_0x1b3004(0x223)]()))&&!this[_0x1b3004(0x29b)](_0x4e89cb,_0x4e6283,_0x3e27b4)&&!_0xffa004['_p_'+_0x4e6283['toString']()]){if(_0x4136c2++,_0x3e27b4['autoExpandPropertyCount']++,_0x4136c2>_0x40bf98){_0x1f02fb=!0x0;break;}if(!_0x3e27b4['isExpressionToEvaluate']&&_0x3e27b4[_0x1b3004(0x292)]&&_0x3e27b4['autoExpandPropertyCount']>_0x3e27b4[_0x1b3004(0x2a9)]){_0x1f02fb=!0x0;break;}_0x22eee1['push'](_0x49945b[_0x1b3004(0x29d)](_0x4a37bc,_0xffa004,_0x4e89cb,_0x5854ca,_0x4e6283,_0x3e27b4));}}}}}if(_0x6662ff[_0x1b3004(0x271)]=_0x5854ca,_0x1b9b8d?(_0x6662ff['value']=_0x4e89cb[_0x1b3004(0x228)](),this[_0x1b3004(0x21c)](_0x5854ca,_0x6662ff,_0x3e27b4,_0x45ba5e)):_0x5854ca===_0x1b3004(0x262)?_0x6662ff[_0x1b3004(0x246)]=this[_0x1b3004(0x22c)]['call'](_0x4e89cb):_0x5854ca===_0x1b3004(0x270)?_0x6662ff[_0x1b3004(0x246)]=_0x4e89cb['toString']():_0x5854ca===_0x1b3004(0x26a)?_0x6662ff[_0x1b3004(0x246)]=this[_0x1b3004(0x2d8)][_0x1b3004(0x24f)](_0x4e89cb):_0x5854ca===_0x1b3004(0x267)&&this[_0x1b3004(0x1f4)]?_0x6662ff[_0x1b3004(0x246)]=this['_Symbol'][_0x1b3004(0x2a5)][_0x1b3004(0x223)]['call'](_0x4e89cb):!_0x3e27b4['depth']&&!(_0x5854ca===_0x1b3004(0x2c2)||_0x5854ca==='undefined')&&(delete _0x6662ff[_0x1b3004(0x246)],_0x6662ff[_0x1b3004(0x22f)]=!0x0),_0x1f02fb&&(_0x6662ff[_0x1b3004(0x250)]=!0x0),_0x232efd=_0x3e27b4[_0x1b3004(0x294)][_0x1b3004(0x287)],_0x3e27b4['node'][_0x1b3004(0x287)]=_0x6662ff,this[_0x1b3004(0x219)](_0x6662ff,_0x3e27b4),_0x22eee1[_0x1b3004(0x204)]){for(_0x5ed6a3=0x0,_0x30ad8c=_0x22eee1[_0x1b3004(0x204)];_0x5ed6a3<_0x30ad8c;_0x5ed6a3++)_0x22eee1[_0x5ed6a3](_0x5ed6a3);}_0x4a37bc[_0x1b3004(0x204)]&&(_0x6662ff[_0x1b3004(0x241)]=_0x4a37bc);}catch(_0x22ab22){_0x52181a(_0x22ab22,_0x6662ff,_0x3e27b4);}return this[_0x1b3004(0x27d)](_0x4e89cb,_0x6662ff),this['_treeNodePropertiesAfterFullValue'](_0x6662ff,_0x3e27b4),_0x3e27b4['node']['current']=_0x232efd,_0x3e27b4['level']--,_0x3e27b4[_0x1b3004(0x292)]=_0x13d07c,_0x3e27b4[_0x1b3004(0x292)]&&_0x3e27b4['autoExpandPreviousObjects'][_0x1b3004(0x281)](),_0x6662ff;}[_0x2aa996(0x2a1)](_0x18e844){var _0x39487e=_0x2aa996;return Object[_0x39487e(0x221)]?Object[_0x39487e(0x221)](_0x18e844):[];}[_0x2aa996(0x1e4)](_0x5d2595){var _0x2d861a=_0x2aa996;return!!(_0x5d2595&&_0x4c4abf[_0x2d861a(0x1f6)]&&this['_objectToString'](_0x5d2595)===_0x2d861a(0x243)&&_0x5d2595[_0x2d861a(0x2b8)]);}[_0x2aa996(0x29b)](_0x1c858a,_0xdea40,_0x1acb4e){var _0xdb824=_0x2aa996;return _0x1acb4e[_0xdb824(0x231)]?typeof _0x1c858a[_0xdea40]==_0xdb824(0x1fb):!0x1;}['_type'](_0x26fa30){var _0x497158=_0x2aa996,_0x247bb8='';return _0x247bb8=typeof _0x26fa30,_0x247bb8===_0x497158(0x212)?this['_objectToString'](_0x26fa30)==='[object\\x20Array]'?_0x247bb8=_0x497158(0x1f0):this[_0x497158(0x247)](_0x26fa30)===_0x497158(0x256)?_0x247bb8=_0x497158(0x262):this[_0x497158(0x247)](_0x26fa30)==='[object\\x20BigInt]'?_0x247bb8=_0x497158(0x270):_0x26fa30===null?_0x247bb8='null':_0x26fa30['constructor']&&(_0x247bb8=_0x26fa30[_0x497158(0x21b)][_0x497158(0x254)]||_0x247bb8):_0x247bb8==='undefined'&&this['_HTMLAllCollection']&&_0x26fa30 instanceof this[_0x497158(0x240)]&&(_0x247bb8='HTMLAllCollection'),_0x247bb8;}[_0x2aa996(0x247)](_0x1e5629){var _0x44a087=_0x2aa996;return Object[_0x44a087(0x2a5)][_0x44a087(0x223)]['call'](_0x1e5629);}[_0x2aa996(0x2b6)](_0x34ef4a){return _0x34ef4a==='boolean'||_0x34ef4a==='string'||_0x34ef4a==='number';}['_isPrimitiveWrapperType'](_0x3ba480){var _0x943ac8=_0x2aa996;return _0x3ba480==='Boolean'||_0x3ba480==='String'||_0x3ba480===_0x943ac8(0x2c9);}[_0x2aa996(0x255)](_0x5c575e,_0x5e9063,_0x2a5b0d,_0x4e4808,_0x167cba,_0x42595f){var _0xf1b72c=this;return function(_0x3e5425){var _0x50a36a=_0x3b3b,_0x1712b5=_0x167cba[_0x50a36a(0x294)]['current'],_0x509f70=_0x167cba[_0x50a36a(0x294)][_0x50a36a(0x2d2)],_0x35683a=_0x167cba[_0x50a36a(0x294)]['parent'];_0x167cba[_0x50a36a(0x294)][_0x50a36a(0x1e5)]=_0x1712b5,_0x167cba['node'][_0x50a36a(0x2d2)]=typeof _0x4e4808==_0x50a36a(0x29e)?_0x4e4808:_0x3e5425,_0x5c575e[_0x50a36a(0x1f8)](_0xf1b72c[_0x50a36a(0x206)](_0x5e9063,_0x2a5b0d,_0x4e4808,_0x167cba,_0x42595f)),_0x167cba['node'][_0x50a36a(0x1e5)]=_0x35683a,_0x167cba[_0x50a36a(0x294)][_0x50a36a(0x2d2)]=_0x509f70;};}[_0x2aa996(0x29d)](_0x2c1d76,_0x57f004,_0x4fef64,_0x2af40a,_0xdc8558,_0xf70408,_0x4ec593){var _0x7a6ab7=_0x2aa996,_0x5c8714=this;return _0x57f004[_0x7a6ab7(0x296)+_0xdc8558['toString']()]=!0x0,function(_0xf61cb3){var _0x3fec7=_0x7a6ab7,_0x32e0af=_0xf70408[_0x3fec7(0x294)]['current'],_0x107512=_0xf70408[_0x3fec7(0x294)][_0x3fec7(0x2d2)],_0xd05bb4=_0xf70408['node']['parent'];_0xf70408[_0x3fec7(0x294)][_0x3fec7(0x1e5)]=_0x32e0af,_0xf70408['node'][_0x3fec7(0x2d2)]=_0xf61cb3,_0x2c1d76[_0x3fec7(0x1f8)](_0x5c8714[_0x3fec7(0x206)](_0x4fef64,_0x2af40a,_0xdc8558,_0xf70408,_0x4ec593)),_0xf70408['node'][_0x3fec7(0x1e5)]=_0xd05bb4,_0xf70408[_0x3fec7(0x294)][_0x3fec7(0x2d2)]=_0x107512;};}[_0x2aa996(0x206)](_0x50a44e,_0x58d8b6,_0x438a1c,_0x245b3f,_0x52207a){var _0x5e8a72=_0x2aa996,_0x4cb1d5=this;_0x52207a||(_0x52207a=function(_0x1b5bfd,_0x4e22eb){return _0x1b5bfd[_0x4e22eb];});var _0x84fc43=_0x438a1c['toString'](),_0x429c49=_0x245b3f['expressionsToEvaluate']||{},_0x2e99c2=_0x245b3f[_0x5e8a72(0x2cc)],_0x10b300=_0x245b3f[_0x5e8a72(0x1e6)];try{var _0x79ea6c=this['_isMap'](_0x50a44e),_0x3126c0=_0x84fc43;_0x79ea6c&&_0x3126c0[0x0]==='\\x27'&&(_0x3126c0=_0x3126c0[_0x5e8a72(0x28a)](0x1,_0x3126c0[_0x5e8a72(0x204)]-0x2));var _0x5131d5=_0x245b3f[_0x5e8a72(0x265)]=_0x429c49['_p_'+_0x3126c0];_0x5131d5&&(_0x245b3f[_0x5e8a72(0x2cc)]=_0x245b3f['depth']+0x1),_0x245b3f[_0x5e8a72(0x1e6)]=!!_0x5131d5;var _0x4f05fa=typeof _0x438a1c==_0x5e8a72(0x267),_0x43e85f={'name':_0x4f05fa||_0x79ea6c?_0x84fc43:this[_0x5e8a72(0x23c)](_0x84fc43)};if(_0x4f05fa&&(_0x43e85f[_0x5e8a72(0x267)]=!0x0),!(_0x58d8b6==='array'||_0x58d8b6==='Error')){var _0xab02ef=this['_getOwnPropertyDescriptor'](_0x50a44e,_0x438a1c);if(_0xab02ef&&(_0xab02ef[_0x5e8a72(0x235)]&&(_0x43e85f[_0x5e8a72(0x248)]=!0x0),_0xab02ef[_0x5e8a72(0x2d0)]&&!_0x5131d5&&!_0x245b3f[_0x5e8a72(0x2b1)]))return _0x43e85f[_0x5e8a72(0x2ca)]=!0x0,this[_0x5e8a72(0x2bd)](_0x43e85f,_0x245b3f),_0x43e85f;}var _0x47cc93;try{_0x47cc93=_0x52207a(_0x50a44e,_0x438a1c);}catch(_0x4d8119){return _0x43e85f={'name':_0x84fc43,'type':_0x5e8a72(0x229),'error':_0x4d8119[_0x5e8a72(0x23e)]},this[_0x5e8a72(0x2bd)](_0x43e85f,_0x245b3f),_0x43e85f;}var _0x4b725b=this[_0x5e8a72(0x28e)](_0x47cc93),_0x355d64=this[_0x5e8a72(0x2b6)](_0x4b725b);if(_0x43e85f[_0x5e8a72(0x271)]=_0x4b725b,_0x355d64)this[_0x5e8a72(0x2bd)](_0x43e85f,_0x245b3f,_0x47cc93,function(){var _0x56215c=_0x5e8a72;_0x43e85f[_0x56215c(0x246)]=_0x47cc93['valueOf'](),!_0x5131d5&&_0x4cb1d5[_0x56215c(0x21c)](_0x4b725b,_0x43e85f,_0x245b3f,{});});else{var _0x507903=_0x245b3f['autoExpand']&&_0x245b3f[_0x5e8a72(0x282)]<_0x245b3f[_0x5e8a72(0x236)]&&_0x245b3f[_0x5e8a72(0x263)][_0x5e8a72(0x20c)](_0x47cc93)<0x0&&_0x4b725b!==_0x5e8a72(0x1fb)&&_0x245b3f['autoExpandPropertyCount']<_0x245b3f[_0x5e8a72(0x2a9)];_0x507903||_0x245b3f[_0x5e8a72(0x282)]<_0x2e99c2||_0x5131d5?(this['serialize'](_0x43e85f,_0x47cc93,_0x245b3f,_0x5131d5||{}),this['_additionalMetadata'](_0x47cc93,_0x43e85f)):this[_0x5e8a72(0x2bd)](_0x43e85f,_0x245b3f,_0x47cc93,function(){var _0x3522e7=_0x5e8a72;_0x4b725b===_0x3522e7(0x2c2)||_0x4b725b===_0x3522e7(0x2d9)||(delete _0x43e85f['value'],_0x43e85f['capped']=!0x0);});}return _0x43e85f;}finally{_0x245b3f[_0x5e8a72(0x265)]=_0x429c49,_0x245b3f[_0x5e8a72(0x2cc)]=_0x2e99c2,_0x245b3f[_0x5e8a72(0x1e6)]=_0x10b300;}}[_0x2aa996(0x21c)](_0x53baf8,_0x2b7f5e,_0x44e2eb,_0x103772){var _0x1b88c9=_0x2aa996,_0x6a632b=_0x103772[_0x1b88c9(0x2b3)]||_0x44e2eb[_0x1b88c9(0x2b3)];if((_0x53baf8==='string'||_0x53baf8===_0x1b88c9(0x1fd))&&_0x2b7f5e['value']){let _0x447dc7=_0x2b7f5e[_0x1b88c9(0x246)][_0x1b88c9(0x204)];_0x44e2eb[_0x1b88c9(0x24b)]+=_0x447dc7,_0x44e2eb[_0x1b88c9(0x24b)]>_0x44e2eb[_0x1b88c9(0x222)]?(_0x2b7f5e['capped']='',delete _0x2b7f5e[_0x1b88c9(0x246)]):_0x447dc7>_0x6a632b&&(_0x2b7f5e['capped']=_0x2b7f5e['value'][_0x1b88c9(0x28a)](0x0,_0x6a632b),delete _0x2b7f5e[_0x1b88c9(0x246)]);}}[_0x2aa996(0x207)](_0x546a01){var _0x30c5b9=_0x2aa996;return!!(_0x546a01&&_0x4c4abf[_0x30c5b9(0x2a6)]&&this['_objectToString'](_0x546a01)===_0x30c5b9(0x2be)&&_0x546a01[_0x30c5b9(0x2b8)]);}[_0x2aa996(0x23c)](_0x5c084b){var _0x351ae0=_0x2aa996;if(_0x5c084b['match'](/^\\d+$/))return _0x5c084b;var _0x1ccca1;try{_0x1ccca1=JSON[_0x351ae0(0x29f)](''+_0x5c084b);}catch{_0x1ccca1='\\x22'+this['_objectToString'](_0x5c084b)+'\\x22';}return _0x1ccca1['match'](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x1ccca1=_0x1ccca1['substr'](0x1,_0x1ccca1[_0x351ae0(0x204)]-0x2):_0x1ccca1=_0x1ccca1[_0x351ae0(0x2c7)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')[_0x351ae0(0x2c7)](/(^\"|\"$)/g,'\\x27'),_0x1ccca1;}[_0x2aa996(0x2bd)](_0x279611,_0x4965ad,_0x3e9453,_0x32ee5c){var _0x4def28=_0x2aa996;this[_0x4def28(0x219)](_0x279611,_0x4965ad),_0x32ee5c&&_0x32ee5c(),this['_additionalMetadata'](_0x3e9453,_0x279611),this['_treeNodePropertiesAfterFullValue'](_0x279611,_0x4965ad);}[_0x2aa996(0x219)](_0x4f82da,_0x35f604){var _0xbdd0d6=_0x2aa996;this[_0xbdd0d6(0x2d3)](_0x4f82da,_0x35f604),this[_0xbdd0d6(0x205)](_0x4f82da,_0x35f604),this[_0xbdd0d6(0x25a)](_0x4f82da,_0x35f604),this[_0xbdd0d6(0x274)](_0x4f82da,_0x35f604);}[_0x2aa996(0x2d3)](_0x58bd6e,_0x43323a){}[_0x2aa996(0x205)](_0x1ce6c1,_0x534a90){}[_0x2aa996(0x291)](_0x39d62d,_0x369185){}[_0x2aa996(0x277)](_0x59968b){var _0x546ae1=_0x2aa996;return _0x59968b===this[_0x546ae1(0x290)];}[_0x2aa996(0x24d)](_0x1e21db,_0x721af6){var _0x29921d=_0x2aa996;this[_0x29921d(0x291)](_0x1e21db,_0x721af6),this[_0x29921d(0x210)](_0x1e21db),_0x721af6['sortProps']&&this[_0x29921d(0x252)](_0x1e21db),this[_0x29921d(0x2a7)](_0x1e21db,_0x721af6),this['_addLoadNode'](_0x1e21db,_0x721af6),this[_0x29921d(0x23a)](_0x1e21db);}[_0x2aa996(0x27d)](_0x198ccf,_0xcfd433){var _0x3aabf4=_0x2aa996;let _0x3d4d9e;try{_0x4c4abf[_0x3aabf4(0x2bf)]&&(_0x3d4d9e=_0x4c4abf[_0x3aabf4(0x2bf)][_0x3aabf4(0x224)],_0x4c4abf[_0x3aabf4(0x2bf)][_0x3aabf4(0x224)]=function(){}),_0x198ccf&&typeof _0x198ccf[_0x3aabf4(0x204)]=='number'&&(_0xcfd433[_0x3aabf4(0x204)]=_0x198ccf[_0x3aabf4(0x204)]);}catch{}finally{_0x3d4d9e&&(_0x4c4abf[_0x3aabf4(0x2bf)][_0x3aabf4(0x224)]=_0x3d4d9e);}if(_0xcfd433[_0x3aabf4(0x271)]===_0x3aabf4(0x29e)||_0xcfd433['type']==='Number'){if(isNaN(_0xcfd433[_0x3aabf4(0x246)]))_0xcfd433[_0x3aabf4(0x2d7)]=!0x0,delete _0xcfd433['value'];else switch(_0xcfd433['value']){case Number['POSITIVE_INFINITY']:_0xcfd433[_0x3aabf4(0x2a2)]=!0x0,delete _0xcfd433[_0x3aabf4(0x246)];break;case Number[_0x3aabf4(0x253)]:_0xcfd433[_0x3aabf4(0x1fe)]=!0x0,delete _0xcfd433[_0x3aabf4(0x246)];break;case 0x0:this[_0x3aabf4(0x239)](_0xcfd433[_0x3aabf4(0x246)])&&(_0xcfd433[_0x3aabf4(0x202)]=!0x0);break;}}else _0xcfd433[_0x3aabf4(0x271)]==='function'&&typeof _0x198ccf[_0x3aabf4(0x254)]==_0x3aabf4(0x2c5)&&_0x198ccf[_0x3aabf4(0x254)]&&_0xcfd433[_0x3aabf4(0x254)]&&_0x198ccf['name']!==_0xcfd433[_0x3aabf4(0x254)]&&(_0xcfd433[_0x3aabf4(0x237)]=_0x198ccf[_0x3aabf4(0x254)]);}['_isNegativeZero'](_0x4e9ba4){return 0x1/_0x4e9ba4===Number['NEGATIVE_INFINITY'];}['_sortProps'](_0x4a7bc5){var _0x4022ea=_0x2aa996;!_0x4a7bc5[_0x4022ea(0x241)]||!_0x4a7bc5[_0x4022ea(0x241)][_0x4022ea(0x204)]||_0x4a7bc5[_0x4022ea(0x271)]===_0x4022ea(0x1f0)||_0x4a7bc5[_0x4022ea(0x271)]==='Map'||_0x4a7bc5[_0x4022ea(0x271)]===_0x4022ea(0x1f6)||_0x4a7bc5['props'][_0x4022ea(0x2ce)](function(_0x1bbef5,_0x1b167a){var _0x148adf=_0x4022ea,_0x4e2aa1=_0x1bbef5[_0x148adf(0x254)][_0x148adf(0x251)](),_0x1936ce=_0x1b167a[_0x148adf(0x254)][_0x148adf(0x251)]();return _0x4e2aa1<_0x1936ce?-0x1:_0x4e2aa1>_0x1936ce?0x1:0x0;});}['_addFunctionsNode'](_0x444f3c,_0x26b0b8){var _0x3e82ac=_0x2aa996;if(!(_0x26b0b8['noFunctions']||!_0x444f3c[_0x3e82ac(0x241)]||!_0x444f3c['props']['length'])){for(var _0x1f0497=[],_0x274f24=[],_0x10e055=0x0,_0x3be9a1=_0x444f3c[_0x3e82ac(0x241)][_0x3e82ac(0x204)];_0x10e055<_0x3be9a1;_0x10e055++){var _0x3eb15a=_0x444f3c[_0x3e82ac(0x241)][_0x10e055];_0x3eb15a[_0x3e82ac(0x271)]===_0x3e82ac(0x1fb)?_0x1f0497['push'](_0x3eb15a):_0x274f24['push'](_0x3eb15a);}if(!(!_0x274f24[_0x3e82ac(0x204)]||_0x1f0497['length']<=0x1)){_0x444f3c[_0x3e82ac(0x241)]=_0x274f24;var _0x334441={'functionsNode':!0x0,'props':_0x1f0497};this[_0x3e82ac(0x2d3)](_0x334441,_0x26b0b8),this[_0x3e82ac(0x291)](_0x334441,_0x26b0b8),this[_0x3e82ac(0x210)](_0x334441),this[_0x3e82ac(0x274)](_0x334441,_0x26b0b8),_0x334441['id']+='\\x20f',_0x444f3c[_0x3e82ac(0x241)]['unshift'](_0x334441);}}}[_0x2aa996(0x261)](_0x3d12b6,_0x131e00){}['_setNodeExpandableState'](_0x14b669){}[_0x2aa996(0x233)](_0x57a09d){var _0x2549de=_0x2aa996;return Array[_0x2549de(0x1f2)](_0x57a09d)||typeof _0x57a09d==_0x2549de(0x212)&&this['_objectToString'](_0x57a09d)==='[object\\x20Array]';}[_0x2aa996(0x274)](_0x11b45a,_0x10d591){}[_0x2aa996(0x23a)](_0x1e290f){var _0xe8d511=_0x2aa996;delete _0x1e290f[_0xe8d511(0x276)],delete _0x1e290f[_0xe8d511(0x26e)],delete _0x1e290f[_0xe8d511(0x297)];}[_0x2aa996(0x25a)](_0x17a883,_0x57ad42){}}let _0x21f4f2=new _0x108064(),_0x2d5033={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x4fb984={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x4078d4(_0x165397,_0x388b31,_0x578543,_0x53a38a,_0x4d70bb,_0x4c9c62){var _0x574dab=_0x2aa996;let _0x40a684,_0x1a3c68;try{_0x1a3c68=_0x4cbcec(),_0x40a684=_0x4fb570[_0x388b31],!_0x40a684||_0x1a3c68-_0x40a684['ts']>0x1f4&&_0x40a684[_0x574dab(0x258)]&&_0x40a684[_0x574dab(0x266)]/_0x40a684[_0x574dab(0x258)]<0x64?(_0x4fb570[_0x388b31]=_0x40a684={'count':0x0,'time':0x0,'ts':_0x1a3c68},_0x4fb570[_0x574dab(0x2b9)]={}):_0x1a3c68-_0x4fb570[_0x574dab(0x2b9)]['ts']>0x32&&_0x4fb570[_0x574dab(0x2b9)][_0x574dab(0x258)]&&_0x4fb570[_0x574dab(0x2b9)][_0x574dab(0x266)]/_0x4fb570[_0x574dab(0x2b9)][_0x574dab(0x258)]<0x64&&(_0x4fb570[_0x574dab(0x2b9)]={});let _0x13694b=[],_0x3fb0a1=_0x40a684[_0x574dab(0x230)]||_0x4fb570[_0x574dab(0x2b9)][_0x574dab(0x230)]?_0x4fb984:_0x2d5033,_0x3da449=_0x46ea86=>{var _0x1c251a=_0x574dab;let _0x1315be={};return _0x1315be['props']=_0x46ea86[_0x1c251a(0x241)],_0x1315be['elements']=_0x46ea86[_0x1c251a(0x1ef)],_0x1315be[_0x1c251a(0x2b3)]=_0x46ea86[_0x1c251a(0x2b3)],_0x1315be['totalStrLength']=_0x46ea86[_0x1c251a(0x222)],_0x1315be[_0x1c251a(0x2a9)]=_0x46ea86['autoExpandLimit'],_0x1315be[_0x1c251a(0x236)]=_0x46ea86[_0x1c251a(0x236)],_0x1315be[_0x1c251a(0x272)]=!0x1,_0x1315be[_0x1c251a(0x231)]=!_0x5f4d5b,_0x1315be[_0x1c251a(0x2cc)]=0x1,_0x1315be[_0x1c251a(0x282)]=0x0,_0x1315be[_0x1c251a(0x227)]='root_exp_id',_0x1315be[_0x1c251a(0x201)]=_0x1c251a(0x245),_0x1315be[_0x1c251a(0x292)]=!0x0,_0x1315be[_0x1c251a(0x263)]=[],_0x1315be[_0x1c251a(0x275)]=0x0,_0x1315be[_0x1c251a(0x2b1)]=!0x0,_0x1315be[_0x1c251a(0x24b)]=0x0,_0x1315be[_0x1c251a(0x294)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x1315be;};for(var _0x55471d=0x0;_0x55471d<_0x4d70bb[_0x574dab(0x204)];_0x55471d++)_0x13694b[_0x574dab(0x1f8)](_0x21f4f2[_0x574dab(0x23f)]({'timeNode':_0x165397===_0x574dab(0x266)||void 0x0},_0x4d70bb[_0x55471d],_0x3da449(_0x3fb0a1),{}));if(_0x165397===_0x574dab(0x28b)){let _0x335318=Error[_0x574dab(0x2c1)];try{Error[_0x574dab(0x2c1)]=0x1/0x0,_0x13694b[_0x574dab(0x1f8)](_0x21f4f2[_0x574dab(0x23f)]({'stackNode':!0x0},new Error()[_0x574dab(0x2d4)],_0x3da449(_0x3fb0a1),{'strLength':0x1/0x0}));}finally{Error[_0x574dab(0x2c1)]=_0x335318;}}return{'method':'log','version':_0xd186fc,'args':[{'ts':_0x578543,'session':_0x53a38a,'args':_0x13694b,'id':_0x388b31,'context':_0x4c9c62}]};}catch(_0x121f0c){return{'method':_0x574dab(0x1e3),'version':_0xd186fc,'args':[{'ts':_0x578543,'session':_0x53a38a,'args':[{'type':'unknown','error':_0x121f0c&&_0x121f0c[_0x574dab(0x23e)]}],'id':_0x388b31,'context':_0x4c9c62}]};}finally{try{if(_0x40a684&&_0x1a3c68){let _0xfb3e07=_0x4cbcec();_0x40a684['count']++,_0x40a684['time']+=_0x1ac05c(_0x1a3c68,_0xfb3e07),_0x40a684['ts']=_0xfb3e07,_0x4fb570[_0x574dab(0x2b9)][_0x574dab(0x258)]++,_0x4fb570['hits'][_0x574dab(0x266)]+=_0x1ac05c(_0x1a3c68,_0xfb3e07),_0x4fb570[_0x574dab(0x2b9)]['ts']=_0xfb3e07,(_0x40a684[_0x574dab(0x258)]>0x32||_0x40a684['time']>0x64)&&(_0x40a684[_0x574dab(0x230)]=!0x0),(_0x4fb570[_0x574dab(0x2b9)]['count']>0x3e8||_0x4fb570[_0x574dab(0x2b9)]['time']>0x12c)&&(_0x4fb570[_0x574dab(0x2b9)][_0x574dab(0x230)]=!0x0);}}catch{}}}return _0x4078d4;}((_0x1bc240,_0x587fa5,_0x115d4d,_0x2e86b0,_0x5979fc,_0x285b10,_0x1cd90c,_0xd18e44,_0x359b94,_0x236b9c,_0x5b8c4e)=>{var _0x182bfb=_0x56c922;if(_0x1bc240[_0x182bfb(0x1e9)])return _0x1bc240[_0x182bfb(0x1e9)];if(!X(_0x1bc240,_0xd18e44,_0x5979fc))return _0x1bc240['_console_ninja']={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x1bc240[_0x182bfb(0x1e9)];let _0x541303=b(_0x1bc240),_0x467f54=_0x541303['elapsed'],_0x8d6c78=_0x541303['timeStamp'],_0x1e74be=_0x541303[_0x182bfb(0x2da)],_0x37c7fa={'hits':{},'ts':{}},_0x352b13=H(_0x1bc240,_0x359b94,_0x37c7fa,_0x285b10),_0x44bd89=_0x29c382=>{_0x37c7fa['ts'][_0x29c382]=_0x8d6c78();},_0xb5c5dd=(_0x5e67d4,_0x52e328)=>{var _0x1b3d2c=_0x182bfb;let _0x495942=_0x37c7fa['ts'][_0x52e328];if(delete _0x37c7fa['ts'][_0x52e328],_0x495942){let _0x46aae6=_0x467f54(_0x495942,_0x8d6c78());_0x3fb1c2(_0x352b13(_0x1b3d2c(0x266),_0x5e67d4,_0x1e74be(),_0x5d76e0,[_0x46aae6],_0x52e328));}},_0x529e90=_0x566d9c=>{var _0x257592=_0x182bfb,_0x5e4ff7;return _0x5979fc==='next.js'&&_0x1bc240[_0x257592(0x211)]&&((_0x5e4ff7=_0x566d9c==null?void 0x0:_0x566d9c[_0x257592(0x288)])==null?void 0x0:_0x5e4ff7[_0x257592(0x204)])&&(_0x566d9c[_0x257592(0x288)][0x0][_0x257592(0x211)]=_0x1bc240['origin']),_0x566d9c;};_0x1bc240[_0x182bfb(0x1e9)]={'consoleLog':(_0x423533,_0x700b02)=>{var _0x481dcb=_0x182bfb;_0x1bc240[_0x481dcb(0x2bf)][_0x481dcb(0x1e3)][_0x481dcb(0x254)]!==_0x481dcb(0x200)&&_0x3fb1c2(_0x352b13('log',_0x423533,_0x1e74be(),_0x5d76e0,_0x700b02));},'consoleTrace':(_0x451592,_0x42df36)=>{var _0x3dde74=_0x182bfb;_0x1bc240['console']['log'][_0x3dde74(0x254)]!==_0x3dde74(0x2ae)&&_0x3fb1c2(_0x529e90(_0x352b13(_0x3dde74(0x28b),_0x451592,_0x1e74be(),_0x5d76e0,_0x42df36)));},'consoleTime':_0x11f338=>{_0x44bd89(_0x11f338);},'consoleTimeEnd':(_0x1fcefb,_0x3fdac2)=>{_0xb5c5dd(_0x3fdac2,_0x1fcefb);},'autoLog':(_0x969633,_0x2d774c)=>{_0x3fb1c2(_0x352b13('log',_0x2d774c,_0x1e74be(),_0x5d76e0,[_0x969633]));},'autoLogMany':(_0x125b5d,_0x1223c0)=>{var _0x4f386b=_0x182bfb;_0x3fb1c2(_0x352b13(_0x4f386b(0x1e3),_0x125b5d,_0x1e74be(),_0x5d76e0,_0x1223c0));},'autoTrace':(_0x1eff13,_0x1eee3f)=>{_0x3fb1c2(_0x529e90(_0x352b13('trace',_0x1eee3f,_0x1e74be(),_0x5d76e0,[_0x1eff13])));},'autoTraceMany':(_0x19f883,_0x2fab40)=>{var _0x514fce=_0x182bfb;_0x3fb1c2(_0x529e90(_0x352b13(_0x514fce(0x28b),_0x19f883,_0x1e74be(),_0x5d76e0,_0x2fab40)));},'autoTime':(_0x1a7f82,_0x5c829c,_0x17c4f8)=>{_0x44bd89(_0x17c4f8);},'autoTimeEnd':(_0x5a7040,_0x33de4f,_0x36c8ab)=>{_0xb5c5dd(_0x33de4f,_0x36c8ab);},'coverage':_0x45e47b=>{var _0x42a44e=_0x182bfb;_0x3fb1c2({'method':_0x42a44e(0x286),'version':_0x285b10,'args':[{'id':_0x45e47b}]});}};let _0x3fb1c2=q(_0x1bc240,_0x587fa5,_0x115d4d,_0x2e86b0,_0x5979fc,_0x236b9c,_0x5b8c4e),_0x5d76e0=_0x1bc240['_console_ninja_session'];return _0x1bc240[_0x182bfb(0x1e9)];})(globalThis,'127.0.0.1',_0x56c922(0x1fa),_0x56c922(0x28c),'webpack','1.0.0',_0x56c922(0x2aa),_0x56c922(0x218),_0x56c922(0x22d),_0x56c922(0x244),_0x56c922(0x28d));");
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

/***/ })

}]);
//# sourceMappingURL=resources_js_react_tasks_pages_Subtasks_jsx.js.map