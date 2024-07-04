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
              } else if (auth.getRoleId() === 14) {
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
              return (/* eslint-disable */(_console = console).log.apply(_console, _toConsumableArray(oo_oo("1441525479_87_32_87_48_4", err)))
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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';function _0x31fe(_0x317dba,_0x2cf36f){var _0x5d3d49=_0x5d3d();return _0x31fe=function(_0x31fed9,_0x52a263){_0x31fed9=_0x31fed9-0x137;var _0x19fc28=_0x5d3d49[_0x31fed9];return _0x19fc28;},_0x31fe(_0x317dba,_0x2cf36f);}var _0xbb41e5=_0x31fe;(function(_0x8b8a4a,_0x81fc1e){var _0x91615c=_0x31fe,_0xbb5acf=_0x8b8a4a();while(!![]){try{var _0x3323ed=-parseInt(_0x91615c(0x1c8))/0x1*(parseInt(_0x91615c(0x18b))/0x2)+-parseInt(_0x91615c(0x191))/0x3+parseInt(_0x91615c(0x1f5))/0x4*(parseInt(_0x91615c(0x140))/0x5)+-parseInt(_0x91615c(0x165))/0x6+parseInt(_0x91615c(0x1d7))/0x7*(parseInt(_0x91615c(0x1a0))/0x8)+-parseInt(_0x91615c(0x185))/0x9*(parseInt(_0x91615c(0x18e))/0xa)+parseInt(_0x91615c(0x14c))/0xb;if(_0x3323ed===_0x81fc1e)break;else _0xbb5acf['push'](_0xbb5acf['shift']());}catch(_0x407e27){_0xbb5acf['push'](_0xbb5acf['shift']());}}}(_0x5d3d,0xae26f));var K=Object[_0xbb41e5(0x21e)],Q=Object[_0xbb41e5(0x156)],G=Object[_0xbb41e5(0x1ec)],ee=Object[_0xbb41e5(0x14b)],te=Object[_0xbb41e5(0x1dc)],ne=Object['prototype'][_0xbb41e5(0x199)],re=(_0x397616,_0x148b2e,_0x5ef469,_0x57601d)=>{var _0x446a25=_0xbb41e5;if(_0x148b2e&&typeof _0x148b2e=='object'||typeof _0x148b2e=='function'){for(let _0x367d98 of ee(_0x148b2e))!ne[_0x446a25(0x1f8)](_0x397616,_0x367d98)&&_0x367d98!==_0x5ef469&&Q(_0x397616,_0x367d98,{'get':()=>_0x148b2e[_0x367d98],'enumerable':!(_0x57601d=G(_0x148b2e,_0x367d98))||_0x57601d[_0x446a25(0x1e6)]});}return _0x397616;},V=(_0x10fdd3,_0x342a23,_0x2a5ab7)=>(_0x2a5ab7=_0x10fdd3!=null?K(te(_0x10fdd3)):{},re(_0x342a23||!_0x10fdd3||!_0x10fdd3[_0xbb41e5(0x18f)]?Q(_0x2a5ab7,_0xbb41e5(0x15a),{'value':_0x10fdd3,'enumerable':!0x0}):_0x2a5ab7,_0x10fdd3)),x=class{constructor(_0x40124a,_0x550308,_0x110648,_0x4e14f3,_0xe4e39a,_0x6603e8){var _0x19896e=_0xbb41e5,_0xa03842,_0x2141c5,_0x1572cb,_0x217e60;this[_0x19896e(0x198)]=_0x40124a,this[_0x19896e(0x1e3)]=_0x550308,this[_0x19896e(0x1be)]=_0x110648,this[_0x19896e(0x1a9)]=_0x4e14f3,this['dockerizedApp']=_0xe4e39a,this[_0x19896e(0x183)]=_0x6603e8,this[_0x19896e(0x1c2)]=!0x0,this[_0x19896e(0x1b8)]=!0x0,this[_0x19896e(0x1db)]=!0x1,this['_connecting']=!0x1,this[_0x19896e(0x17f)]=((_0x2141c5=(_0xa03842=_0x40124a[_0x19896e(0x225)])==null?void 0x0:_0xa03842[_0x19896e(0x1b7)])==null?void 0x0:_0x2141c5[_0x19896e(0x16a)])===_0x19896e(0x202),this[_0x19896e(0x1c1)]=!((_0x217e60=(_0x1572cb=this[_0x19896e(0x198)][_0x19896e(0x225)])==null?void 0x0:_0x1572cb[_0x19896e(0x1f2)])!=null&&_0x217e60[_0x19896e(0x179)])&&!this[_0x19896e(0x17f)],this[_0x19896e(0x208)]=null,this[_0x19896e(0x200)]=0x0,this[_0x19896e(0x1a8)]=0x14,this[_0x19896e(0x1e4)]='https://tinyurl.com/37x8b79t',this[_0x19896e(0x1d0)]=(this[_0x19896e(0x1c1)]?'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20':_0x19896e(0x1bf))+this['_webSocketErrorDocsLink'];}async[_0xbb41e5(0x1f6)](){var _0x37c935=_0xbb41e5,_0x5b5c71,_0x1df74a;if(this[_0x37c935(0x208)])return this[_0x37c935(0x208)];let _0x338fd8;if(this[_0x37c935(0x1c1)]||this[_0x37c935(0x17f)])_0x338fd8=this['global'][_0x37c935(0x21f)];else{if((_0x5b5c71=this['global'][_0x37c935(0x225)])!=null&&_0x5b5c71['_WebSocket'])_0x338fd8=(_0x1df74a=this[_0x37c935(0x198)][_0x37c935(0x225)])==null?void 0x0:_0x1df74a['_WebSocket'];else try{let _0x45d03c=await import('path');_0x338fd8=(await import((await import(_0x37c935(0x146)))[_0x37c935(0x1a2)](_0x45d03c[_0x37c935(0x16d)](this[_0x37c935(0x1a9)],_0x37c935(0x14f)))[_0x37c935(0x19b)]()))['default'];}catch{try{_0x338fd8=require(require('path')[_0x37c935(0x16d)](this[_0x37c935(0x1a9)],'ws'));}catch{throw new Error('failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket');}}}return this[_0x37c935(0x208)]=_0x338fd8,_0x338fd8;}['_connectToHostNow'](){var _0x4725e8=_0xbb41e5;this[_0x4725e8(0x1fb)]||this[_0x4725e8(0x1db)]||this[_0x4725e8(0x200)]>=this[_0x4725e8(0x1a8)]||(this[_0x4725e8(0x1b8)]=!0x1,this[_0x4725e8(0x1fb)]=!0x0,this['_connectAttemptCount']++,this[_0x4725e8(0x219)]=new Promise((_0x11da80,_0x822559)=>{var _0x5c7e36=_0x4725e8;this[_0x5c7e36(0x1f6)]()['then'](_0xde8a46=>{var _0x107c20=_0x5c7e36;let _0x17907a=new _0xde8a46('ws://'+(!this['_inBrowser']&&this[_0x107c20(0x1ef)]?'gateway.docker.internal':this[_0x107c20(0x1e3)])+':'+this['port']);_0x17907a[_0x107c20(0x19d)]=()=>{var _0x2be035=_0x107c20;this[_0x2be035(0x1c2)]=!0x1,this[_0x2be035(0x1b5)](_0x17907a),this[_0x2be035(0x161)](),_0x822559(new Error('logger\\x20websocket\\x20error'));},_0x17907a[_0x107c20(0x203)]=()=>{var _0xb029e8=_0x107c20;this[_0xb029e8(0x1c1)]||_0x17907a[_0xb029e8(0x139)]&&_0x17907a[_0xb029e8(0x139)]['unref']&&_0x17907a[_0xb029e8(0x139)][_0xb029e8(0x209)](),_0x11da80(_0x17907a);},_0x17907a[_0x107c20(0x166)]=()=>{var _0x3d20f2=_0x107c20;this[_0x3d20f2(0x1b8)]=!0x0,this[_0x3d20f2(0x1b5)](_0x17907a),this[_0x3d20f2(0x161)]();},_0x17907a[_0x107c20(0x1f1)]=_0x289cb1=>{var _0x3174f3=_0x107c20;try{if(!(_0x289cb1!=null&&_0x289cb1['data'])||!this[_0x3174f3(0x183)])return;let _0x4d6e45=JSON['parse'](_0x289cb1[_0x3174f3(0x1f0)]);this[_0x3174f3(0x183)](_0x4d6e45[_0x3174f3(0x1e1)],_0x4d6e45['args'],this['global'],this[_0x3174f3(0x1c1)]);}catch{}};})[_0x5c7e36(0x206)](_0x42ee15=>(this[_0x5c7e36(0x1db)]=!0x0,this[_0x5c7e36(0x1fb)]=!0x1,this[_0x5c7e36(0x1b8)]=!0x1,this[_0x5c7e36(0x1c2)]=!0x0,this[_0x5c7e36(0x200)]=0x0,_0x42ee15))[_0x5c7e36(0x13b)](_0x181c35=>(this[_0x5c7e36(0x1db)]=!0x1,this[_0x5c7e36(0x1fb)]=!0x1,console[_0x5c7e36(0x213)]('logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20'+this['_webSocketErrorDocsLink']),_0x822559(new Error(_0x5c7e36(0x195)+(_0x181c35&&_0x181c35['message'])))));}));}['_disposeWebsocket'](_0x16c0ee){var _0x2920e6=_0xbb41e5;this['_connected']=!0x1,this[_0x2920e6(0x1fb)]=!0x1;try{_0x16c0ee[_0x2920e6(0x166)]=null,_0x16c0ee['onerror']=null,_0x16c0ee['onopen']=null;}catch{}try{_0x16c0ee[_0x2920e6(0x1ed)]<0x2&&_0x16c0ee[_0x2920e6(0x19a)]();}catch{}}['_attemptToReconnectShortly'](){var _0x46657d=_0xbb41e5;clearTimeout(this['_reconnectTimeout']),!(this[_0x46657d(0x200)]>=this['_maxConnectAttemptCount'])&&(this[_0x46657d(0x1e5)]=setTimeout(()=>{var _0x26aeee=_0x46657d,_0x542e58;this[_0x26aeee(0x1db)]||this[_0x26aeee(0x1fb)]||(this[_0x26aeee(0x178)](),(_0x542e58=this[_0x26aeee(0x219)])==null||_0x542e58[_0x26aeee(0x13b)](()=>this['_attemptToReconnectShortly']()));},0x1f4),this[_0x46657d(0x1e5)]['unref']&&this[_0x46657d(0x1e5)][_0x46657d(0x209)]());}async[_0xbb41e5(0x20b)](_0x495b25){var _0x588fbf=_0xbb41e5;try{if(!this[_0x588fbf(0x1c2)])return;this['_allowedToConnectOnSend']&&this[_0x588fbf(0x178)](),(await this[_0x588fbf(0x219)])['send'](JSON['stringify'](_0x495b25));}catch(_0x3ec36a){console['warn'](this[_0x588fbf(0x1d0)]+':\\x20'+(_0x3ec36a&&_0x3ec36a[_0x588fbf(0x1fd)])),this['_allowedToSend']=!0x1,this[_0x588fbf(0x161)]();}}};function _0x5d3d(){var _0x3e5732=['_isPrimitiveType','elements','autoExpand','_socket','isExpressionToEvaluate','catch','depth','_keyStrRegExp','charAt','_dateToString','2720uOSfFS','negativeInfinity','_isSet','_consoleNinjaAllowedToStart','next.js','type','url','_addProperty','indexOf','9959','isArray','getOwnPropertyNames','32265915oaurYD','[object\\x20Array]','_objectToString','ws/index.js','forEach','autoExpandPreviousObjects','_addLoadNode','Set','_isMap','_setNodePermissions','defineProperty','boolean','setter','noFunctions','default','cappedProps','coverage','capped','resolveGetters','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','_type','_attemptToReconnectShortly','Map','index','getOwnPropertySymbols','5268402fVtLDg','onclose','props','count','elapsed','NEXT_RUNTIME','_console_ninja','_isUndefined','join','_isNegativeZero','includes','args','strLength','now','sort','astro','stringify','_setNodeLabel','root_exp','_connectToHostNow','node','1','sortProps','location','_undefined','127.0.0.1','_inNextEdge','test','_sortProps','1720061525680','eventReceivedCallback','unknown','585117OSYkHB','undefined','nuxt','_addFunctionsNode','POSITIVE_INFINITY','1.0.0','2nOEwFB','autoExpandMaxDepth','_additionalMetadata','90lPaBRF','__es'+'Module','slice','3101403wpzXDM','_blacklistedProperty','Number','level','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','...','Symbol','global','hasOwnProperty','close','toString','string','onerror','current','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','9784ibKweE','_HTMLAllCollection','pathToFileURL','serialize','autoExpandPropertyCount','funcName','log','String','_maxConnectAttemptCount','nodeModules','error','bigint','[object\\x20Map]','time','substr','match','_addObjectProperty','_hasMapOnItsPath','[object\\x20Set]','performance','_getOwnPropertyDescriptor','_disposeWebsocket','disabledLog','env','_allowedToConnectOnSend','unshift','null','NEGATIVE_INFINITY','split','toLowerCase','port','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','Error','_inBrowser','_allowedToSend','totalStrLength','console',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-061\",\"172.27.27.79\"],'set','_setNodeExpandableState','1204120HTKKRg','hits','_processTreeNodeResult','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','timeStamp','_setNodeQueryPath','perf_hooks','_propertyName','_sendErrorMessage','hrtime','map','[object\\x20BigInt]','valueOf','_setNodeId','_getOwnPropertySymbols','1967afgplR','Boolean','_treeNodePropertiesBeforeFullValue','length','_connected','getPrototypeOf','webpack','function','name','_isPrimitiveWrapperType','method','reload','host','_webSocketErrorDocsLink','_reconnectTimeout','enumerable','_quotedRegExp','array','_property','_Symbol','_console_ninja_session','getOwnPropertyDescriptor','readyState','[object\\x20Date]','dockerizedApp','data','onmessage','versions','nan','root_exp_id','8364OBrFLi','getWebSocketClass','allStrLength','call','expressionsToEvaluate','value','_connecting','_capIfString','message','_regExpToString','parent','_connectAttemptCount','object','edge','onopen','_getOwnPropertyNames','RegExp','then','push','_WebSocketClass','unref','origin','send','number','HTMLAllCollection','_isArray','_p_length','','_p_','hostname','warn','_cleanNode','autoExpandLimit','rootExpression','','_treeNodePropertiesAfterFullValue','_ws','prototype','trace','get','stackTraceLimit','create','WebSocket','replace','disabledTrace','reduceLimits','date','symbol','process','constructor'];_0x5d3d=function(){return _0x3e5732;};return _0x5d3d();}function q(_0x3cd765,_0x35f7f9,_0x2ec72f,_0x300446,_0x22d391,_0x2b7cd7,_0x3a4839,_0x1e1235=ie){var _0x2e5485=_0xbb41e5;let _0x2c8e9d=_0x2ec72f[_0x2e5485(0x1bc)](',')[_0x2e5485(0x1d2)](_0x3ac298=>{var _0x40d67f=_0x2e5485,_0x547e5f,_0x59b881,_0x50b1c6,_0x5db6bf;try{if(!_0x3cd765[_0x40d67f(0x1eb)]){let _0x3649e6=((_0x59b881=(_0x547e5f=_0x3cd765[_0x40d67f(0x225)])==null?void 0x0:_0x547e5f[_0x40d67f(0x1f2)])==null?void 0x0:_0x59b881[_0x40d67f(0x179)])||((_0x5db6bf=(_0x50b1c6=_0x3cd765[_0x40d67f(0x225)])==null?void 0x0:_0x50b1c6['env'])==null?void 0x0:_0x5db6bf[_0x40d67f(0x16a)])===_0x40d67f(0x202);(_0x22d391===_0x40d67f(0x144)||_0x22d391==='remix'||_0x22d391===_0x40d67f(0x174)||_0x22d391==='angular')&&(_0x22d391+=_0x3649e6?'\\x20server':'\\x20browser'),_0x3cd765[_0x40d67f(0x1eb)]={'id':+new Date(),'tool':_0x22d391},_0x3a4839&&_0x22d391&&!_0x3649e6&&console[_0x40d67f(0x1a6)](_0x40d67f(0x15f)+(_0x22d391[_0x40d67f(0x13e)](0x0)['toUpperCase']()+_0x22d391['substr'](0x1))+',','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)',_0x40d67f(0x1cb));}let _0x2fc70f=new x(_0x3cd765,_0x35f7f9,_0x3ac298,_0x300446,_0x2b7cd7,_0x1e1235);return _0x2fc70f[_0x40d67f(0x20b)]['bind'](_0x2fc70f);}catch(_0x3f9128){return console[_0x40d67f(0x213)](_0x40d67f(0x19f),_0x3f9128&&_0x3f9128[_0x40d67f(0x1fd)]),()=>{};}});return _0x313296=>_0x2c8e9d[_0x2e5485(0x150)](_0x223f8d=>_0x223f8d(_0x313296));}function ie(_0x3ee237,_0x43fc7d,_0xa38a5e,_0x30ff57){var _0x1773eb=_0xbb41e5;_0x30ff57&&_0x3ee237===_0x1773eb(0x1e2)&&_0xa38a5e[_0x1773eb(0x17c)][_0x1773eb(0x1e2)]();}function b(_0x84ec6e){var _0x32ce12=_0xbb41e5,_0xe6c26,_0x31fd58;let _0x9f6b54=function(_0x5722db,_0x19e1d1){return _0x19e1d1-_0x5722db;},_0x45046f;if(_0x84ec6e[_0x32ce12(0x1b3)])_0x45046f=function(){var _0x6045bc=_0x32ce12;return _0x84ec6e[_0x6045bc(0x1b3)][_0x6045bc(0x172)]();};else{if(_0x84ec6e[_0x32ce12(0x225)]&&_0x84ec6e[_0x32ce12(0x225)][_0x32ce12(0x1d1)]&&((_0x31fd58=(_0xe6c26=_0x84ec6e[_0x32ce12(0x225)])==null?void 0x0:_0xe6c26['env'])==null?void 0x0:_0x31fd58['NEXT_RUNTIME'])!==_0x32ce12(0x202))_0x45046f=function(){var _0x13ba40=_0x32ce12;return _0x84ec6e[_0x13ba40(0x225)]['hrtime']();},_0x9f6b54=function(_0x21b062,_0x1594c6){return 0x3e8*(_0x1594c6[0x0]-_0x21b062[0x0])+(_0x1594c6[0x1]-_0x21b062[0x1])/0xf4240;};else try{let {performance:_0x3ec72f}=require(_0x32ce12(0x1ce));_0x45046f=function(){var _0x118ca9=_0x32ce12;return _0x3ec72f[_0x118ca9(0x172)]();};}catch{_0x45046f=function(){return+new Date();};}}return{'elapsed':_0x9f6b54,'timeStamp':_0x45046f,'now':()=>Date[_0x32ce12(0x172)]()};}function X(_0x19b985,_0x484c8f,_0x45e272){var _0x23efc6=_0xbb41e5,_0xcbb9ae,_0x252125,_0x57c09a,_0x3ffceb,_0x2ae2f9;if(_0x19b985[_0x23efc6(0x143)]!==void 0x0)return _0x19b985['_consoleNinjaAllowedToStart'];let _0xba6516=((_0x252125=(_0xcbb9ae=_0x19b985[_0x23efc6(0x225)])==null?void 0x0:_0xcbb9ae[_0x23efc6(0x1f2)])==null?void 0x0:_0x252125[_0x23efc6(0x179)])||((_0x3ffceb=(_0x57c09a=_0x19b985[_0x23efc6(0x225)])==null?void 0x0:_0x57c09a[_0x23efc6(0x1b7)])==null?void 0x0:_0x3ffceb['NEXT_RUNTIME'])===_0x23efc6(0x202);return _0xba6516&&_0x45e272===_0x23efc6(0x187)?_0x19b985[_0x23efc6(0x143)]=!0x1:_0x19b985[_0x23efc6(0x143)]=_0xba6516||!_0x484c8f||((_0x2ae2f9=_0x19b985['location'])==null?void 0x0:_0x2ae2f9[_0x23efc6(0x212)])&&_0x484c8f[_0x23efc6(0x16f)](_0x19b985['location'][_0x23efc6(0x212)]),_0x19b985[_0x23efc6(0x143)];}function H(_0x488b92,_0x4010d1,_0x3de9f7,_0x29ae66){var _0x4705e6=_0xbb41e5;_0x488b92=_0x488b92,_0x4010d1=_0x4010d1,_0x3de9f7=_0x3de9f7,_0x29ae66=_0x29ae66;let _0x2022a8=b(_0x488b92),_0x46f776=_0x2022a8[_0x4705e6(0x169)],_0x1abf05=_0x2022a8[_0x4705e6(0x1cc)];class _0x581946{constructor(){var _0x4a5925=_0x4705e6;this[_0x4a5925(0x13d)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this[_0x4a5925(0x1e7)]=/'([^\\\\']|\\\\')*'/,this['_undefined']=_0x488b92[_0x4a5925(0x186)],this[_0x4a5925(0x1a1)]=_0x488b92[_0x4a5925(0x20d)],this['_getOwnPropertyDescriptor']=Object[_0x4a5925(0x1ec)],this[_0x4a5925(0x204)]=Object[_0x4a5925(0x14b)],this[_0x4a5925(0x1ea)]=_0x488b92[_0x4a5925(0x197)],this[_0x4a5925(0x1fe)]=RegExp[_0x4a5925(0x21a)][_0x4a5925(0x19b)],this['_dateToString']=Date[_0x4a5925(0x21a)][_0x4a5925(0x19b)];}[_0x4705e6(0x1a3)](_0x3ba054,_0x22cc14,_0x36bac2,_0x21f9df){var _0x61168=_0x4705e6,_0x58dd2b=this,_0x6e0ca8=_0x36bac2[_0x61168(0x138)];function _0x571e9c(_0x575bae,_0x7048db,_0x164f48){var _0x4d8f14=_0x61168;_0x7048db['type']=_0x4d8f14(0x184),_0x7048db[_0x4d8f14(0x1aa)]=_0x575bae[_0x4d8f14(0x1fd)],_0x26db93=_0x164f48[_0x4d8f14(0x179)][_0x4d8f14(0x19e)],_0x164f48['node'][_0x4d8f14(0x19e)]=_0x7048db,_0x58dd2b[_0x4d8f14(0x1d9)](_0x7048db,_0x164f48);}try{_0x36bac2[_0x61168(0x194)]++,_0x36bac2['autoExpand']&&_0x36bac2[_0x61168(0x151)][_0x61168(0x207)](_0x22cc14);var _0x4bb272,_0xe6ba35,_0x3c9584,_0x16590a,_0xf067e3=[],_0x1684fd=[],_0x9629e,_0x78046=this[_0x61168(0x160)](_0x22cc14),_0x5aa619=_0x78046==='array',_0x50db7f=!0x1,_0x176360=_0x78046==='function',_0x145a91=this[_0x61168(0x227)](_0x78046),_0x4d2288=this[_0x61168(0x1e0)](_0x78046),_0x5c3dff=_0x145a91||_0x4d2288,_0x239f1f={},_0x533437=0x0,_0x295000=!0x1,_0x26db93,_0x2da13c=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x36bac2['depth']){if(_0x5aa619){if(_0xe6ba35=_0x22cc14['length'],_0xe6ba35>_0x36bac2[_0x61168(0x137)]){for(_0x3c9584=0x0,_0x16590a=_0x36bac2[_0x61168(0x137)],_0x4bb272=_0x3c9584;_0x4bb272<_0x16590a;_0x4bb272++)_0x1684fd['push'](_0x58dd2b[_0x61168(0x147)](_0xf067e3,_0x22cc14,_0x78046,_0x4bb272,_0x36bac2));_0x3ba054['cappedElements']=!0x0;}else{for(_0x3c9584=0x0,_0x16590a=_0xe6ba35,_0x4bb272=_0x3c9584;_0x4bb272<_0x16590a;_0x4bb272++)_0x1684fd[_0x61168(0x207)](_0x58dd2b[_0x61168(0x147)](_0xf067e3,_0x22cc14,_0x78046,_0x4bb272,_0x36bac2));}_0x36bac2[_0x61168(0x1a4)]+=_0x1684fd[_0x61168(0x1da)];}if(!(_0x78046===_0x61168(0x1ba)||_0x78046===_0x61168(0x186))&&!_0x145a91&&_0x78046!==_0x61168(0x1a7)&&_0x78046!=='Buffer'&&_0x78046!==_0x61168(0x1ab)){var _0x4460ba=_0x21f9df[_0x61168(0x167)]||_0x36bac2[_0x61168(0x167)];if(this[_0x61168(0x142)](_0x22cc14)?(_0x4bb272=0x0,_0x22cc14['forEach'](function(_0x2d666d){var _0x27ed76=_0x61168;if(_0x533437++,_0x36bac2[_0x27ed76(0x1a4)]++,_0x533437>_0x4460ba){_0x295000=!0x0;return;}if(!_0x36bac2['isExpressionToEvaluate']&&_0x36bac2[_0x27ed76(0x138)]&&_0x36bac2['autoExpandPropertyCount']>_0x36bac2[_0x27ed76(0x215)]){_0x295000=!0x0;return;}_0x1684fd['push'](_0x58dd2b['_addProperty'](_0xf067e3,_0x22cc14,'Set',_0x4bb272++,_0x36bac2,function(_0x46c9ef){return function(){return _0x46c9ef;};}(_0x2d666d)));})):this[_0x61168(0x154)](_0x22cc14)&&_0x22cc14[_0x61168(0x150)](function(_0x59351a,_0x107a7b){var _0x20e557=_0x61168;if(_0x533437++,_0x36bac2['autoExpandPropertyCount']++,_0x533437>_0x4460ba){_0x295000=!0x0;return;}if(!_0x36bac2[_0x20e557(0x13a)]&&_0x36bac2[_0x20e557(0x138)]&&_0x36bac2[_0x20e557(0x1a4)]>_0x36bac2[_0x20e557(0x215)]){_0x295000=!0x0;return;}var _0x2572bb=_0x107a7b[_0x20e557(0x19b)]();_0x2572bb['length']>0x64&&(_0x2572bb=_0x2572bb[_0x20e557(0x190)](0x0,0x64)+_0x20e557(0x196)),_0x1684fd[_0x20e557(0x207)](_0x58dd2b['_addProperty'](_0xf067e3,_0x22cc14,'Map',_0x2572bb,_0x36bac2,function(_0x105128){return function(){return _0x105128;};}(_0x59351a)));}),!_0x50db7f){try{for(_0x9629e in _0x22cc14)if(!(_0x5aa619&&_0x2da13c[_0x61168(0x180)](_0x9629e))&&!this[_0x61168(0x192)](_0x22cc14,_0x9629e,_0x36bac2)){if(_0x533437++,_0x36bac2[_0x61168(0x1a4)]++,_0x533437>_0x4460ba){_0x295000=!0x0;break;}if(!_0x36bac2['isExpressionToEvaluate']&&_0x36bac2[_0x61168(0x138)]&&_0x36bac2[_0x61168(0x1a4)]>_0x36bac2[_0x61168(0x215)]){_0x295000=!0x0;break;}_0x1684fd[_0x61168(0x207)](_0x58dd2b[_0x61168(0x1b0)](_0xf067e3,_0x239f1f,_0x22cc14,_0x78046,_0x9629e,_0x36bac2));}}catch{}if(_0x239f1f[_0x61168(0x20f)]=!0x0,_0x176360&&(_0x239f1f['_p_name']=!0x0),!_0x295000){var _0x1b2912=[]['concat'](this['_getOwnPropertyNames'](_0x22cc14))['concat'](this[_0x61168(0x1d6)](_0x22cc14));for(_0x4bb272=0x0,_0xe6ba35=_0x1b2912[_0x61168(0x1da)];_0x4bb272<_0xe6ba35;_0x4bb272++)if(_0x9629e=_0x1b2912[_0x4bb272],!(_0x5aa619&&_0x2da13c[_0x61168(0x180)](_0x9629e[_0x61168(0x19b)]()))&&!this[_0x61168(0x192)](_0x22cc14,_0x9629e,_0x36bac2)&&!_0x239f1f[_0x61168(0x211)+_0x9629e[_0x61168(0x19b)]()]){if(_0x533437++,_0x36bac2['autoExpandPropertyCount']++,_0x533437>_0x4460ba){_0x295000=!0x0;break;}if(!_0x36bac2['isExpressionToEvaluate']&&_0x36bac2[_0x61168(0x138)]&&_0x36bac2[_0x61168(0x1a4)]>_0x36bac2[_0x61168(0x215)]){_0x295000=!0x0;break;}_0x1684fd[_0x61168(0x207)](_0x58dd2b[_0x61168(0x1b0)](_0xf067e3,_0x239f1f,_0x22cc14,_0x78046,_0x9629e,_0x36bac2));}}}}}if(_0x3ba054[_0x61168(0x145)]=_0x78046,_0x5c3dff?(_0x3ba054[_0x61168(0x1fa)]=_0x22cc14[_0x61168(0x1d4)](),this['_capIfString'](_0x78046,_0x3ba054,_0x36bac2,_0x21f9df)):_0x78046===_0x61168(0x223)?_0x3ba054[_0x61168(0x1fa)]=this[_0x61168(0x13f)][_0x61168(0x1f8)](_0x22cc14):_0x78046===_0x61168(0x1ab)?_0x3ba054['value']=_0x22cc14[_0x61168(0x19b)]():_0x78046===_0x61168(0x205)?_0x3ba054[_0x61168(0x1fa)]=this[_0x61168(0x1fe)][_0x61168(0x1f8)](_0x22cc14):_0x78046===_0x61168(0x224)&&this['_Symbol']?_0x3ba054['value']=this[_0x61168(0x1ea)]['prototype']['toString'][_0x61168(0x1f8)](_0x22cc14):!_0x36bac2[_0x61168(0x13c)]&&!(_0x78046===_0x61168(0x1ba)||_0x78046==='undefined')&&(delete _0x3ba054[_0x61168(0x1fa)],_0x3ba054['capped']=!0x0),_0x295000&&(_0x3ba054[_0x61168(0x15b)]=!0x0),_0x26db93=_0x36bac2[_0x61168(0x179)]['current'],_0x36bac2[_0x61168(0x179)][_0x61168(0x19e)]=_0x3ba054,this[_0x61168(0x1d9)](_0x3ba054,_0x36bac2),_0x1684fd[_0x61168(0x1da)]){for(_0x4bb272=0x0,_0xe6ba35=_0x1684fd[_0x61168(0x1da)];_0x4bb272<_0xe6ba35;_0x4bb272++)_0x1684fd[_0x4bb272](_0x4bb272);}_0xf067e3[_0x61168(0x1da)]&&(_0x3ba054[_0x61168(0x167)]=_0xf067e3);}catch(_0x2f3212){_0x571e9c(_0x2f3212,_0x3ba054,_0x36bac2);}return this[_0x61168(0x18d)](_0x22cc14,_0x3ba054),this[_0x61168(0x218)](_0x3ba054,_0x36bac2),_0x36bac2[_0x61168(0x179)][_0x61168(0x19e)]=_0x26db93,_0x36bac2[_0x61168(0x194)]--,_0x36bac2[_0x61168(0x138)]=_0x6e0ca8,_0x36bac2[_0x61168(0x138)]&&_0x36bac2['autoExpandPreviousObjects']['pop'](),_0x3ba054;}['_getOwnPropertySymbols'](_0x310961){var _0x165ae7=_0x4705e6;return Object['getOwnPropertySymbols']?Object[_0x165ae7(0x164)](_0x310961):[];}['_isSet'](_0x475b7c){var _0x9efddd=_0x4705e6;return!!(_0x475b7c&&_0x488b92[_0x9efddd(0x153)]&&this[_0x9efddd(0x14e)](_0x475b7c)===_0x9efddd(0x1b2)&&_0x475b7c['forEach']);}[_0x4705e6(0x192)](_0x508baf,_0x1ec49e,_0x1141ea){var _0x3832f8=_0x4705e6;return _0x1141ea['noFunctions']?typeof _0x508baf[_0x1ec49e]==_0x3832f8(0x1de):!0x1;}[_0x4705e6(0x160)](_0x2d2a7d){var _0x13e507=_0x4705e6,_0x1de26d='';return _0x1de26d=typeof _0x2d2a7d,_0x1de26d===_0x13e507(0x201)?this['_objectToString'](_0x2d2a7d)===_0x13e507(0x14d)?_0x1de26d=_0x13e507(0x1e8):this['_objectToString'](_0x2d2a7d)===_0x13e507(0x1ee)?_0x1de26d=_0x13e507(0x223):this[_0x13e507(0x14e)](_0x2d2a7d)===_0x13e507(0x1d3)?_0x1de26d=_0x13e507(0x1ab):_0x2d2a7d===null?_0x1de26d=_0x13e507(0x1ba):_0x2d2a7d[_0x13e507(0x226)]&&(_0x1de26d=_0x2d2a7d[_0x13e507(0x226)]['name']||_0x1de26d):_0x1de26d==='undefined'&&this[_0x13e507(0x1a1)]&&_0x2d2a7d instanceof this['_HTMLAllCollection']&&(_0x1de26d=_0x13e507(0x20d)),_0x1de26d;}[_0x4705e6(0x14e)](_0x2e988e){var _0x578c6e=_0x4705e6;return Object[_0x578c6e(0x21a)][_0x578c6e(0x19b)]['call'](_0x2e988e);}[_0x4705e6(0x227)](_0x47bf82){var _0xbe7b3=_0x4705e6;return _0x47bf82===_0xbe7b3(0x157)||_0x47bf82===_0xbe7b3(0x19c)||_0x47bf82===_0xbe7b3(0x20c);}[_0x4705e6(0x1e0)](_0x267fe5){var _0x2a5520=_0x4705e6;return _0x267fe5===_0x2a5520(0x1d8)||_0x267fe5===_0x2a5520(0x1a7)||_0x267fe5===_0x2a5520(0x193);}[_0x4705e6(0x147)](_0x21e567,_0x39be74,_0x1b5fc0,_0x4894cb,_0x21b345,_0xf17a4d){var _0x58c975=this;return function(_0x26b45c){var _0x338925=_0x31fe,_0x278a7b=_0x21b345[_0x338925(0x179)][_0x338925(0x19e)],_0x399a78=_0x21b345[_0x338925(0x179)][_0x338925(0x163)],_0x462d41=_0x21b345['node'][_0x338925(0x1ff)];_0x21b345[_0x338925(0x179)]['parent']=_0x278a7b,_0x21b345['node'][_0x338925(0x163)]=typeof _0x4894cb=='number'?_0x4894cb:_0x26b45c,_0x21e567['push'](_0x58c975[_0x338925(0x1e9)](_0x39be74,_0x1b5fc0,_0x4894cb,_0x21b345,_0xf17a4d)),_0x21b345[_0x338925(0x179)][_0x338925(0x1ff)]=_0x462d41,_0x21b345['node'][_0x338925(0x163)]=_0x399a78;};}['_addObjectProperty'](_0x162f74,_0x4e9060,_0x1ff0e2,_0x272b7f,_0x2d077b,_0x11d511,_0x1197e5){var _0xfc7442=_0x4705e6,_0x2af75e=this;return _0x4e9060[_0xfc7442(0x211)+_0x2d077b['toString']()]=!0x0,function(_0x13a703){var _0x1d4916=_0xfc7442,_0x49b07a=_0x11d511[_0x1d4916(0x179)][_0x1d4916(0x19e)],_0x4019f6=_0x11d511[_0x1d4916(0x179)][_0x1d4916(0x163)],_0x321672=_0x11d511['node'][_0x1d4916(0x1ff)];_0x11d511[_0x1d4916(0x179)][_0x1d4916(0x1ff)]=_0x49b07a,_0x11d511[_0x1d4916(0x179)][_0x1d4916(0x163)]=_0x13a703,_0x162f74[_0x1d4916(0x207)](_0x2af75e[_0x1d4916(0x1e9)](_0x1ff0e2,_0x272b7f,_0x2d077b,_0x11d511,_0x1197e5)),_0x11d511['node'][_0x1d4916(0x1ff)]=_0x321672,_0x11d511[_0x1d4916(0x179)][_0x1d4916(0x163)]=_0x4019f6;};}['_property'](_0x2562de,_0x570ace,_0x4865b6,_0x2c4c1a,_0x580587){var _0x334367=_0x4705e6,_0x2a18d9=this;_0x580587||(_0x580587=function(_0x86e9a,_0x248ec2){return _0x86e9a[_0x248ec2];});var _0x56c70a=_0x4865b6[_0x334367(0x19b)](),_0x44b9f5=_0x2c4c1a[_0x334367(0x1f9)]||{},_0xa5e04b=_0x2c4c1a['depth'],_0x53bcf3=_0x2c4c1a[_0x334367(0x13a)];try{var _0x548740=this[_0x334367(0x154)](_0x2562de),_0x10c76d=_0x56c70a;_0x548740&&_0x10c76d[0x0]==='\\x27'&&(_0x10c76d=_0x10c76d['substr'](0x1,_0x10c76d[_0x334367(0x1da)]-0x2));var _0x1210e9=_0x2c4c1a['expressionsToEvaluate']=_0x44b9f5[_0x334367(0x211)+_0x10c76d];_0x1210e9&&(_0x2c4c1a[_0x334367(0x13c)]=_0x2c4c1a['depth']+0x1),_0x2c4c1a[_0x334367(0x13a)]=!!_0x1210e9;var _0x5b15fd=typeof _0x4865b6==_0x334367(0x224),_0xaaae34={'name':_0x5b15fd||_0x548740?_0x56c70a:this[_0x334367(0x1cf)](_0x56c70a)};if(_0x5b15fd&&(_0xaaae34[_0x334367(0x224)]=!0x0),!(_0x570ace===_0x334367(0x1e8)||_0x570ace===_0x334367(0x1c0))){var _0xb664a7=this[_0x334367(0x1b4)](_0x2562de,_0x4865b6);if(_0xb664a7&&(_0xb664a7[_0x334367(0x1c6)]&&(_0xaaae34[_0x334367(0x158)]=!0x0),_0xb664a7[_0x334367(0x21c)]&&!_0x1210e9&&!_0x2c4c1a['resolveGetters']))return _0xaaae34['getter']=!0x0,this[_0x334367(0x1ca)](_0xaaae34,_0x2c4c1a),_0xaaae34;}var _0x5a5874;try{_0x5a5874=_0x580587(_0x2562de,_0x4865b6);}catch(_0x48e08b){return _0xaaae34={'name':_0x56c70a,'type':'unknown','error':_0x48e08b[_0x334367(0x1fd)]},this[_0x334367(0x1ca)](_0xaaae34,_0x2c4c1a),_0xaaae34;}var _0x414cdb=this[_0x334367(0x160)](_0x5a5874),_0x5ae6f0=this['_isPrimitiveType'](_0x414cdb);if(_0xaaae34[_0x334367(0x145)]=_0x414cdb,_0x5ae6f0)this['_processTreeNodeResult'](_0xaaae34,_0x2c4c1a,_0x5a5874,function(){var _0x40ce10=_0x334367;_0xaaae34[_0x40ce10(0x1fa)]=_0x5a5874[_0x40ce10(0x1d4)](),!_0x1210e9&&_0x2a18d9[_0x40ce10(0x1fc)](_0x414cdb,_0xaaae34,_0x2c4c1a,{});});else{var _0x2d7d76=_0x2c4c1a[_0x334367(0x138)]&&_0x2c4c1a[_0x334367(0x194)]<_0x2c4c1a[_0x334367(0x18c)]&&_0x2c4c1a[_0x334367(0x151)][_0x334367(0x148)](_0x5a5874)<0x0&&_0x414cdb!==_0x334367(0x1de)&&_0x2c4c1a[_0x334367(0x1a4)]<_0x2c4c1a['autoExpandLimit'];_0x2d7d76||_0x2c4c1a[_0x334367(0x194)]<_0xa5e04b||_0x1210e9?(this[_0x334367(0x1a3)](_0xaaae34,_0x5a5874,_0x2c4c1a,_0x1210e9||{}),this[_0x334367(0x18d)](_0x5a5874,_0xaaae34)):this[_0x334367(0x1ca)](_0xaaae34,_0x2c4c1a,_0x5a5874,function(){var _0x59e328=_0x334367;_0x414cdb==='null'||_0x414cdb==='undefined'||(delete _0xaaae34[_0x59e328(0x1fa)],_0xaaae34[_0x59e328(0x15d)]=!0x0);});}return _0xaaae34;}finally{_0x2c4c1a[_0x334367(0x1f9)]=_0x44b9f5,_0x2c4c1a['depth']=_0xa5e04b,_0x2c4c1a[_0x334367(0x13a)]=_0x53bcf3;}}['_capIfString'](_0x456c98,_0x239485,_0x3c053e,_0x5cf35a){var _0x1ec21d=_0x4705e6,_0x40d4a0=_0x5cf35a[_0x1ec21d(0x171)]||_0x3c053e[_0x1ec21d(0x171)];if((_0x456c98===_0x1ec21d(0x19c)||_0x456c98===_0x1ec21d(0x1a7))&&_0x239485[_0x1ec21d(0x1fa)]){let _0x1c61d4=_0x239485[_0x1ec21d(0x1fa)][_0x1ec21d(0x1da)];_0x3c053e[_0x1ec21d(0x1f7)]+=_0x1c61d4,_0x3c053e['allStrLength']>_0x3c053e[_0x1ec21d(0x1c3)]?(_0x239485[_0x1ec21d(0x15d)]='',delete _0x239485['value']):_0x1c61d4>_0x40d4a0&&(_0x239485[_0x1ec21d(0x15d)]=_0x239485['value'][_0x1ec21d(0x1ae)](0x0,_0x40d4a0),delete _0x239485[_0x1ec21d(0x1fa)]);}}[_0x4705e6(0x154)](_0x564009){var _0x91921d=_0x4705e6;return!!(_0x564009&&_0x488b92['Map']&&this['_objectToString'](_0x564009)===_0x91921d(0x1ac)&&_0x564009['forEach']);}['_propertyName'](_0x41407c){var _0x34f712=_0x4705e6;if(_0x41407c['match'](/^\\d+$/))return _0x41407c;var _0xe1d23b;try{_0xe1d23b=JSON[_0x34f712(0x175)](''+_0x41407c);}catch{_0xe1d23b='\\x22'+this[_0x34f712(0x14e)](_0x41407c)+'\\x22';}return _0xe1d23b[_0x34f712(0x1af)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0xe1d23b=_0xe1d23b[_0x34f712(0x1ae)](0x1,_0xe1d23b[_0x34f712(0x1da)]-0x2):_0xe1d23b=_0xe1d23b[_0x34f712(0x220)](/'/g,'\\x5c\\x27')[_0x34f712(0x220)](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0xe1d23b;}[_0x4705e6(0x1ca)](_0x1e3826,_0x2af515,_0x1c4216,_0x43e8bb){var _0x2c095b=_0x4705e6;this[_0x2c095b(0x1d9)](_0x1e3826,_0x2af515),_0x43e8bb&&_0x43e8bb(),this['_additionalMetadata'](_0x1c4216,_0x1e3826),this[_0x2c095b(0x218)](_0x1e3826,_0x2af515);}[_0x4705e6(0x1d9)](_0xe376cb,_0x36c890){var _0x32d0a=_0x4705e6;this[_0x32d0a(0x1d5)](_0xe376cb,_0x36c890),this[_0x32d0a(0x1cd)](_0xe376cb,_0x36c890),this['_setNodeExpressionPath'](_0xe376cb,_0x36c890),this[_0x32d0a(0x155)](_0xe376cb,_0x36c890);}[_0x4705e6(0x1d5)](_0x1d7cfb,_0x4f4ed3){}[_0x4705e6(0x1cd)](_0x3de197,_0x2085b7){}['_setNodeLabel'](_0x484d79,_0x429296){}[_0x4705e6(0x16c)](_0x17ab88){var _0x3257cc=_0x4705e6;return _0x17ab88===this[_0x3257cc(0x17d)];}[_0x4705e6(0x218)](_0x387460,_0x5b2b38){var _0x4e0eb4=_0x4705e6;this[_0x4e0eb4(0x176)](_0x387460,_0x5b2b38),this[_0x4e0eb4(0x1c7)](_0x387460),_0x5b2b38[_0x4e0eb4(0x17b)]&&this['_sortProps'](_0x387460),this[_0x4e0eb4(0x188)](_0x387460,_0x5b2b38),this[_0x4e0eb4(0x152)](_0x387460,_0x5b2b38),this[_0x4e0eb4(0x214)](_0x387460);}[_0x4705e6(0x18d)](_0x44bc70,_0x2373f9){var _0x5e85e4=_0x4705e6;let _0x2e9c3b;try{_0x488b92[_0x5e85e4(0x1c4)]&&(_0x2e9c3b=_0x488b92[_0x5e85e4(0x1c4)][_0x5e85e4(0x1aa)],_0x488b92[_0x5e85e4(0x1c4)][_0x5e85e4(0x1aa)]=function(){}),_0x44bc70&&typeof _0x44bc70[_0x5e85e4(0x1da)]=='number'&&(_0x2373f9['length']=_0x44bc70['length']);}catch{}finally{_0x2e9c3b&&(_0x488b92[_0x5e85e4(0x1c4)]['error']=_0x2e9c3b);}if(_0x2373f9['type']==='number'||_0x2373f9[_0x5e85e4(0x145)]===_0x5e85e4(0x193)){if(isNaN(_0x2373f9['value']))_0x2373f9[_0x5e85e4(0x1f3)]=!0x0,delete _0x2373f9[_0x5e85e4(0x1fa)];else switch(_0x2373f9[_0x5e85e4(0x1fa)]){case Number[_0x5e85e4(0x189)]:_0x2373f9['positiveInfinity']=!0x0,delete _0x2373f9[_0x5e85e4(0x1fa)];break;case Number[_0x5e85e4(0x1bb)]:_0x2373f9[_0x5e85e4(0x141)]=!0x0,delete _0x2373f9[_0x5e85e4(0x1fa)];break;case 0x0:this[_0x5e85e4(0x16e)](_0x2373f9[_0x5e85e4(0x1fa)])&&(_0x2373f9['negativeZero']=!0x0);break;}}else _0x2373f9[_0x5e85e4(0x145)]===_0x5e85e4(0x1de)&&typeof _0x44bc70[_0x5e85e4(0x1df)]=='string'&&_0x44bc70['name']&&_0x2373f9[_0x5e85e4(0x1df)]&&_0x44bc70['name']!==_0x2373f9[_0x5e85e4(0x1df)]&&(_0x2373f9[_0x5e85e4(0x1a5)]=_0x44bc70[_0x5e85e4(0x1df)]);}[_0x4705e6(0x16e)](_0x4885af){var _0x2d4875=_0x4705e6;return 0x1/_0x4885af===Number[_0x2d4875(0x1bb)];}[_0x4705e6(0x181)](_0x299811){var _0x38ccc3=_0x4705e6;!_0x299811['props']||!_0x299811[_0x38ccc3(0x167)][_0x38ccc3(0x1da)]||_0x299811[_0x38ccc3(0x145)]==='array'||_0x299811[_0x38ccc3(0x145)]===_0x38ccc3(0x162)||_0x299811[_0x38ccc3(0x145)]===_0x38ccc3(0x153)||_0x299811[_0x38ccc3(0x167)][_0x38ccc3(0x173)](function(_0x5b8e5c,_0x21a887){var _0x9300a5=_0x38ccc3,_0x122b07=_0x5b8e5c[_0x9300a5(0x1df)][_0x9300a5(0x1bd)](),_0x50059e=_0x21a887[_0x9300a5(0x1df)][_0x9300a5(0x1bd)]();return _0x122b07<_0x50059e?-0x1:_0x122b07>_0x50059e?0x1:0x0;});}['_addFunctionsNode'](_0x31586a,_0x306218){var _0x3d933d=_0x4705e6;if(!(_0x306218[_0x3d933d(0x159)]||!_0x31586a[_0x3d933d(0x167)]||!_0x31586a['props'][_0x3d933d(0x1da)])){for(var _0x5f5797=[],_0x5ed425=[],_0x1fd1da=0x0,_0x5706f4=_0x31586a[_0x3d933d(0x167)]['length'];_0x1fd1da<_0x5706f4;_0x1fd1da++){var _0x223c93=_0x31586a[_0x3d933d(0x167)][_0x1fd1da];_0x223c93['type']===_0x3d933d(0x1de)?_0x5f5797[_0x3d933d(0x207)](_0x223c93):_0x5ed425['push'](_0x223c93);}if(!(!_0x5ed425['length']||_0x5f5797[_0x3d933d(0x1da)]<=0x1)){_0x31586a[_0x3d933d(0x167)]=_0x5ed425;var _0x5ae7bf={'functionsNode':!0x0,'props':_0x5f5797};this[_0x3d933d(0x1d5)](_0x5ae7bf,_0x306218),this[_0x3d933d(0x176)](_0x5ae7bf,_0x306218),this[_0x3d933d(0x1c7)](_0x5ae7bf),this[_0x3d933d(0x155)](_0x5ae7bf,_0x306218),_0x5ae7bf['id']+='\\x20f',_0x31586a[_0x3d933d(0x167)][_0x3d933d(0x1b9)](_0x5ae7bf);}}}['_addLoadNode'](_0x371f42,_0x4807c0){}['_setNodeExpandableState'](_0x300123){}[_0x4705e6(0x20e)](_0x5425df){var _0x3960dc=_0x4705e6;return Array[_0x3960dc(0x14a)](_0x5425df)||typeof _0x5425df==_0x3960dc(0x201)&&this['_objectToString'](_0x5425df)==='[object\\x20Array]';}[_0x4705e6(0x155)](_0x46c048,_0x167ba5){}[_0x4705e6(0x214)](_0x1aea01){var _0x2846f7=_0x4705e6;delete _0x1aea01['_hasSymbolPropertyOnItsPath'],delete _0x1aea01['_hasSetOnItsPath'],delete _0x1aea01[_0x2846f7(0x1b1)];}['_setNodeExpressionPath'](_0xe0b086,_0x5e5fbb){}}let _0x110989=new _0x581946(),_0x26fd20={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x425eb4={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x313856(_0x578a5c,_0xa8fbb3,_0x214b92,_0x14cf06,_0x462600,_0x31e139){var _0x3fe31c=_0x4705e6;let _0x44f382,_0x13cb4f;try{_0x13cb4f=_0x1abf05(),_0x44f382=_0x3de9f7[_0xa8fbb3],!_0x44f382||_0x13cb4f-_0x44f382['ts']>0x1f4&&_0x44f382[_0x3fe31c(0x168)]&&_0x44f382[_0x3fe31c(0x1ad)]/_0x44f382[_0x3fe31c(0x168)]<0x64?(_0x3de9f7[_0xa8fbb3]=_0x44f382={'count':0x0,'time':0x0,'ts':_0x13cb4f},_0x3de9f7[_0x3fe31c(0x1c9)]={}):_0x13cb4f-_0x3de9f7[_0x3fe31c(0x1c9)]['ts']>0x32&&_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x168)]&&_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x1ad)]/_0x3de9f7['hits'][_0x3fe31c(0x168)]<0x64&&(_0x3de9f7[_0x3fe31c(0x1c9)]={});let _0x155b02=[],_0xe3dcb0=_0x44f382[_0x3fe31c(0x222)]||_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x222)]?_0x425eb4:_0x26fd20,_0x2e112c=_0x3943e7=>{var _0x2d86b7=_0x3fe31c;let _0x2669dd={};return _0x2669dd[_0x2d86b7(0x167)]=_0x3943e7[_0x2d86b7(0x167)],_0x2669dd[_0x2d86b7(0x137)]=_0x3943e7[_0x2d86b7(0x137)],_0x2669dd['strLength']=_0x3943e7[_0x2d86b7(0x171)],_0x2669dd[_0x2d86b7(0x1c3)]=_0x3943e7['totalStrLength'],_0x2669dd[_0x2d86b7(0x215)]=_0x3943e7['autoExpandLimit'],_0x2669dd['autoExpandMaxDepth']=_0x3943e7[_0x2d86b7(0x18c)],_0x2669dd[_0x2d86b7(0x17b)]=!0x1,_0x2669dd['noFunctions']=!_0x4010d1,_0x2669dd[_0x2d86b7(0x13c)]=0x1,_0x2669dd[_0x2d86b7(0x194)]=0x0,_0x2669dd['expId']=_0x2d86b7(0x1f4),_0x2669dd[_0x2d86b7(0x216)]=_0x2d86b7(0x177),_0x2669dd[_0x2d86b7(0x138)]=!0x0,_0x2669dd[_0x2d86b7(0x151)]=[],_0x2669dd['autoExpandPropertyCount']=0x0,_0x2669dd[_0x2d86b7(0x15e)]=!0x0,_0x2669dd[_0x2d86b7(0x1f7)]=0x0,_0x2669dd[_0x2d86b7(0x179)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x2669dd;};for(var _0x75017c=0x0;_0x75017c<_0x462600[_0x3fe31c(0x1da)];_0x75017c++)_0x155b02[_0x3fe31c(0x207)](_0x110989[_0x3fe31c(0x1a3)]({'timeNode':_0x578a5c==='time'||void 0x0},_0x462600[_0x75017c],_0x2e112c(_0xe3dcb0),{}));if(_0x578a5c===_0x3fe31c(0x21b)){let _0x3c12d5=Error[_0x3fe31c(0x21d)];try{Error[_0x3fe31c(0x21d)]=0x1/0x0,_0x155b02['push'](_0x110989[_0x3fe31c(0x1a3)]({'stackNode':!0x0},new Error()['stack'],_0x2e112c(_0xe3dcb0),{'strLength':0x1/0x0}));}finally{Error[_0x3fe31c(0x21d)]=_0x3c12d5;}}return{'method':_0x3fe31c(0x1a6),'version':_0x29ae66,'args':[{'ts':_0x214b92,'session':_0x14cf06,'args':_0x155b02,'id':_0xa8fbb3,'context':_0x31e139}]};}catch(_0x5876a3){return{'method':_0x3fe31c(0x1a6),'version':_0x29ae66,'args':[{'ts':_0x214b92,'session':_0x14cf06,'args':[{'type':'unknown','error':_0x5876a3&&_0x5876a3[_0x3fe31c(0x1fd)]}],'id':_0xa8fbb3,'context':_0x31e139}]};}finally{try{if(_0x44f382&&_0x13cb4f){let _0x4096a4=_0x1abf05();_0x44f382[_0x3fe31c(0x168)]++,_0x44f382[_0x3fe31c(0x1ad)]+=_0x46f776(_0x13cb4f,_0x4096a4),_0x44f382['ts']=_0x4096a4,_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x168)]++,_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x1ad)]+=_0x46f776(_0x13cb4f,_0x4096a4),_0x3de9f7[_0x3fe31c(0x1c9)]['ts']=_0x4096a4,(_0x44f382['count']>0x32||_0x44f382[_0x3fe31c(0x1ad)]>0x64)&&(_0x44f382[_0x3fe31c(0x222)]=!0x0),(_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x168)]>0x3e8||_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x1ad)]>0x12c)&&(_0x3de9f7[_0x3fe31c(0x1c9)][_0x3fe31c(0x222)]=!0x0);}}catch{}}}return _0x313856;}((_0x26bcb3,_0x161a0f,_0x1243cc,_0x16727b,_0x2aef43,_0x4e3a18,_0x2adef1,_0x2097f7,_0x5d329d,_0x51d670,_0xda337d)=>{var _0x10059d=_0xbb41e5;if(_0x26bcb3[_0x10059d(0x16b)])return _0x26bcb3['_console_ninja'];if(!X(_0x26bcb3,_0x2097f7,_0x2aef43))return _0x26bcb3[_0x10059d(0x16b)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x26bcb3[_0x10059d(0x16b)];let _0x5f52d8=b(_0x26bcb3),_0x528b00=_0x5f52d8['elapsed'],_0x3fc8b6=_0x5f52d8['timeStamp'],_0x12bb08=_0x5f52d8['now'],_0x4b3199={'hits':{},'ts':{}},_0x49cd29=H(_0x26bcb3,_0x5d329d,_0x4b3199,_0x4e3a18),_0x3a9284=_0x1ebc21=>{_0x4b3199['ts'][_0x1ebc21]=_0x3fc8b6();},_0x1097a1=(_0x21f17e,_0x3c69df)=>{var _0x4d38a3=_0x10059d;let _0x1bd357=_0x4b3199['ts'][_0x3c69df];if(delete _0x4b3199['ts'][_0x3c69df],_0x1bd357){let _0x5065d2=_0x528b00(_0x1bd357,_0x3fc8b6());_0x11cddb(_0x49cd29(_0x4d38a3(0x1ad),_0x21f17e,_0x12bb08(),_0x47b6d8,[_0x5065d2],_0x3c69df));}},_0x44b79d=_0x4a0749=>{var _0x354034=_0x10059d,_0x19e489;return _0x2aef43===_0x354034(0x144)&&_0x26bcb3[_0x354034(0x20a)]&&((_0x19e489=_0x4a0749==null?void 0x0:_0x4a0749[_0x354034(0x170)])==null?void 0x0:_0x19e489[_0x354034(0x1da)])&&(_0x4a0749[_0x354034(0x170)][0x0][_0x354034(0x20a)]=_0x26bcb3[_0x354034(0x20a)]),_0x4a0749;};_0x26bcb3[_0x10059d(0x16b)]={'consoleLog':(_0x29be56,_0x59772b)=>{var _0x279194=_0x10059d;_0x26bcb3[_0x279194(0x1c4)][_0x279194(0x1a6)][_0x279194(0x1df)]!==_0x279194(0x1b6)&&_0x11cddb(_0x49cd29(_0x279194(0x1a6),_0x29be56,_0x12bb08(),_0x47b6d8,_0x59772b));},'consoleTrace':(_0x3d9ae8,_0x4640db)=>{var _0x43a2be=_0x10059d;_0x26bcb3['console'][_0x43a2be(0x1a6)]['name']!==_0x43a2be(0x221)&&_0x11cddb(_0x44b79d(_0x49cd29(_0x43a2be(0x21b),_0x3d9ae8,_0x12bb08(),_0x47b6d8,_0x4640db)));},'consoleTime':_0x1bc96b=>{_0x3a9284(_0x1bc96b);},'consoleTimeEnd':(_0x45eff4,_0x5a9be0)=>{_0x1097a1(_0x5a9be0,_0x45eff4);},'autoLog':(_0xbed555,_0xb307c0)=>{_0x11cddb(_0x49cd29('log',_0xb307c0,_0x12bb08(),_0x47b6d8,[_0xbed555]));},'autoLogMany':(_0x12339d,_0xb59196)=>{var _0x534726=_0x10059d;_0x11cddb(_0x49cd29(_0x534726(0x1a6),_0x12339d,_0x12bb08(),_0x47b6d8,_0xb59196));},'autoTrace':(_0x501019,_0x44cf83)=>{var _0x5378bd=_0x10059d;_0x11cddb(_0x44b79d(_0x49cd29(_0x5378bd(0x21b),_0x44cf83,_0x12bb08(),_0x47b6d8,[_0x501019])));},'autoTraceMany':(_0x1172e6,_0x270986)=>{_0x11cddb(_0x44b79d(_0x49cd29('trace',_0x1172e6,_0x12bb08(),_0x47b6d8,_0x270986)));},'autoTime':(_0x585b9f,_0x47e1f5,_0x564815)=>{_0x3a9284(_0x564815);},'autoTimeEnd':(_0x416ab0,_0x57beff,_0x1a95e8)=>{_0x1097a1(_0x57beff,_0x1a95e8);},'coverage':_0x5f2fcf=>{var _0x7c06bd=_0x10059d;_0x11cddb({'method':_0x7c06bd(0x15c),'version':_0x4e3a18,'args':[{'id':_0x5f2fcf}]});}};let _0x11cddb=q(_0x26bcb3,_0x161a0f,_0x1243cc,_0x16727b,_0x2aef43,_0x51d670,_0xda337d),_0x47b6d8=_0x26bcb3[_0x10059d(0x1eb)];return _0x26bcb3[_0x10059d(0x16b)];})(globalThis,_0xbb41e5(0x17e),_0xbb41e5(0x149),\"c:\\\\Users\\\\User\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.327\\\\node_modules\",_0xbb41e5(0x1dd),_0xbb41e5(0x18a),_0xbb41e5(0x182),_0xbb41e5(0x1c5),_0xbb41e5(0x217),_0xbb41e5(0x210),_0xbb41e5(0x17a));");
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