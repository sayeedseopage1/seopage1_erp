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

/***/ })

}]);
//# sourceMappingURL=resources_js_react_tasks_pages_Subtasks_jsx.js.map