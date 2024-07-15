"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_TimeLogTable_pages_TaskWiseTable_jsx"],{

/***/ "./resources/js/react/TimeLogTable/components/TaskWiseLogTable.jsx":
/*!*************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TaskWiseLogTable.jsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useLocalStorage.js");
/* harmony import */ var _DragHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DragHeader */ "./resources/js/react/TimeLogTable/components/DragHeader.jsx");
/* harmony import */ var _TableFooter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TableFooter */ "./resources/js/react/TimeLogTable/components/TableFooter.jsx");
/* harmony import */ var _TaskWiseTableLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TaskWiseTableLoader */ "./resources/js/react/TimeLogTable/components/TaskWiseTableLoader.jsx");
/* harmony import */ var _data_table_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data-table.css */ "./resources/js/react/TimeLogTable/components/data-table.css");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
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








var DataTable = function DataTable(_ref) {
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
  var _useLocalStorage = (0,react_use__WEBPACK_IMPORTED_MODULE_6__["default"])(tableName),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    value = _useLocalStorage2[0],
    setValue = _useLocalStorage2[1];

  // get columns keys
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (value !== null && value !== void 0 && value.columnOrders) {
      setColumnOrder(value === null || value === void 0 ? void 0 : value.columnOrders);
    } else {
      var column_ids = _.map(columns, "id");
      setColumnOrder(_toConsumableArray(column_ids));
    }
  }, []);
  var _columns = _.sortBy(columns, function (item) {
    return _.indexOf(columnOrder, item.id);
  });

  // render row
  var renderRow = function renderRow(data) {
    var rows = [];
    if (data) {
      var _iterator = _createForOfIteratorHelper(data),
        _step;
      try {
        var _loop = function _loop() {
          var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];
          value === null || value === void 0 || value.map(function (item, index) {
            var className = value.length === index + 1 ? "sp1_tlr_td f-14 sp1_tlr_td_border" : "sp1_tlr_td f-14";
            rows.push( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("tr", {
                className: "sp1_tlr_tr",
                children: _.map(_columns, function (col) {
                  if (col.group) {
                    return index === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
                      children: col.cell({
                        row: item,
                        rowSpan: _.size(value)
                      })
                    }, col.id);
                  } else {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
                      children: col.cell({
                        row: item,
                        className: "".concat(className, " sp1_drag_col_").concat(col === null || col === void 0 ? void 0 : col.id)
                      })
                    }, col.id);
                  }
                })
              })
            }, item.uuid));
          });
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return rows;
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "p-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "position-relative sp1_tlr_tbl_wrapper",
        style: {
          height: height
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("table", {
          className: "sp1_tlr_table",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("thead", {
            className: "sp1_tlr_thead",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("tr", {
              className: "sp1_tlr_tr",
              children: _.map(_columns, function (column) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_DragHeader__WEBPACK_IMPORTED_MODULE_1__["default"], {
                  className: "sp1_tlr_th",
                  column: column,
                  columns: _columns,
                  onSort: function onSort() {},
                  onDrop: setColumnOrder,
                  order: columnOrder,
                  tableName: tableName,
                  storeOnLocalStore: function storeOnLocalStore(columns) {
                    return setValue(_objectSpread(_objectSpread({}, value), {}, {
                      columnOrders: columns
                    }));
                  }
                }, column.id);
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tbody", {
            className: "sp1_tlr_tbody",
            children: [!isLoading && renderRow(data), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_TaskWiseTableLoader__WEBPACK_IMPORTED_MODULE_3__["default"], {})]
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_TableFooter__WEBPACK_IMPORTED_MODULE_2__["default"], {
        onPaginate: onPaginate,
        perpageData: perpageData,
        totalEntry: totalEntry,
        currentPage: currentPage,
        handlePerPageData: handlePerPageData
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataTable);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/TaskWiseLogTableColumn.jsx":
/*!*******************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TaskWiseLogTableColumn.jsx ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskWiseTableColumn: () => (/* binding */ TaskWiseTableColumn)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserRender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserRender */ "./resources/js/react/TimeLogTable/components/UserRender.jsx");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var TaskWiseTableColumn = [{
  id: 'task_id',
  header: 'Task',
  className: '',
  group: true,
  sorted: false,
  cell: function cell(_ref) {
    var row = _ref.row,
      col = _ref.col,
      _ref$rowSpan = _ref.rowSpan,
      rowSpan = _ref$rowSpan === void 0 ? 1 : _ref$rowSpan;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "sp1_tlr_td sp1_tlr_td_border sp1_drag_col_".concat(col === null || col === void 0 ? void 0 : col.id, " sp1_tlr_td_marged ").concat(rowSpan ? "sp1_tlr_td_hover-disable" : ""),
      rowSpan: rowSpan,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        href: "/account/tasks/".concat(row === null || row === void 0 ? void 0 : row.task_id),
        children: row === null || row === void 0 ? void 0 : row.task_name
      })
    });
  }
}, {
  id: 'project_id',
  header: 'Project Name',
  className: '',
  group: true,
  sorted: false,
  sortAccessor: 'project_id',
  cell: function cell(_ref2) {
    var row = _ref2.row,
      col = _ref2.col,
      _ref2$rowSpan = _ref2.rowSpan,
      rowSpan = _ref2$rowSpan === void 0 ? 1 : _ref2$rowSpan;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "sp1_tlr_td sp1_tlr_td_border sp1_drag_col_".concat(col === null || col === void 0 ? void 0 : col.id, " sp1_tlr_td_marged ").concat(rowSpan ? "sp1_tlr_td_hover-disable" : ""),
      rowSpan: rowSpan,
      children: row !== null && row !== void 0 && row.is_independent ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        children: row === null || row === void 0 ? void 0 : row.project_name
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
        href: "/account/tasks/".concat(row === null || row === void 0 ? void 0 : row.task_id),
        children: row === null || row === void 0 ? void 0 : row.project_name
      })
    });
  }
}, {
  id: 'pm_id',
  header: 'Project Manager',
  className: '',
  group: true,
  sorted: false,
  sortAccessor: 'pm_id',
  cell: function cell(_ref3) {
    var row = _ref3.row,
      col = _ref3.col,
      _ref3$rowSpan = _ref3.rowSpan,
      rowSpan = _ref3$rowSpan === void 0 ? 1 : _ref3$rowSpan;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "sp1_tlr_td sp1_tlr_td_border sp1_drag_col_".concat(col === null || col === void 0 ? void 0 : col.id, " sp1_tlr_td_marged ").concat(rowSpan ? "sp1_tlr_td_hover-disable" : ""),
      rowSpan: rowSpan,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_UserRender__WEBPACK_IMPORTED_MODULE_1__["default"], {
        name: row === null || row === void 0 ? void 0 : row.pm_name,
        profileUrl: "/account/employees/".concat(row === null || row === void 0 ? void 0 : row.pm_id),
        image: row === null || row === void 0 ? void 0 : row.pm_image,
        role: row === null || row === void 0 ? void 0 : row.pm_roles,
        id: row === null || row === void 0 ? void 0 : row.pm_id
      })
    });
  }
}, {
  id: 'client_id',
  header: 'Client Name',
  className: '',
  group: true,
  sorted: false,
  sortAccessor: 'client_id',
  cell: function cell(_ref4) {
    var row = _ref4.row,
      col = _ref4.col,
      _ref4$rowSpan = _ref4.rowSpan,
      rowSpan = _ref4$rowSpan === void 0 ? 1 : _ref4$rowSpan;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: "sp1_tlr_td sp1_tlr_td_border  sp1_drag_col_".concat(col === null || col === void 0 ? void 0 : col.id, " sp1_tlr_td_marged ").concat(rowSpan ? "sp1_tlr_td_hover-disable" : ""),
      rowSpan: rowSpan,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_UserRender__WEBPACK_IMPORTED_MODULE_1__["default"], {
        name: row === null || row === void 0 ? void 0 : row.client_name,
        profileUrl: "/account/clients/".concat(row === null || row === void 0 ? void 0 : row.client_id),
        image: row === null || row === void 0 ? void 0 : row.client_image,
        role: row !== null && row !== void 0 && row.is_independent ? "" : "Freelancer.com",
        roleLink: row === null || row === void 0 ? void 0 : row.client_from,
        id: row === null || row === void 0 ? void 0 : row.client_id
      })
    });
  }
}, {
  id: 'employee_id',
  header: 'Employee Name',
  className: '',
  sorted: true,
  group: false,
  sortAccessor: '',
  cell: function cell(_ref5) {
    var row = _ref5.row,
      col = _ref5.col,
      className = _ref5.className,
      rowSpan = _ref5.rowSpan;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      rowSpan: rowSpan,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_UserRender__WEBPACK_IMPORTED_MODULE_1__["default"], {
        name: row === null || row === void 0 ? void 0 : row.employee_name,
        profileUrl: "/account/employees/".concat(row === null || row === void 0 ? void 0 : row.employee_id),
        image: row === null || row === void 0 ? void 0 : row.employee_image,
        role: row === null || row === void 0 ? void 0 : row.employee_roles,
        id: row === null || row === void 0 ? void 0 : row.employee_id
      })
    });
  }
}, {
  id: 'start_time',
  header: 'Start Time',
  className: '',
  sorted: false,
  group: false,
  cell: function cell(_ref6) {
    var row = _ref6.row,
      className = _ref6.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
      className: className,
      children: [dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.start_time).format('MMM DD, YYYY'), " ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), "at ", dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.start_time).format('hh:mm A')]
    });
  }
}, {
  id: 'end_time',
  header: 'End Time',
  className: '',
  sorted: false,
  group: false,
  cell: function cell(_ref7) {
    var row = _ref7.row,
      className = _ref7.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      children: row !== null && row !== void 0 && row.end_time ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(row === null || row === void 0 ? void 0 : row.end_time).format('MMM DD, YYYY [at] hh:mm A') : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "text-success",
        children: "Active"
      })
    });
  }
}, {
  id: 'total_track_time',
  header: 'Total Track Time',
  className: '',
  sorted: false,
  group: false,
  cell: function cell(_ref8) {
    var row = _ref8.row,
      className = _ref8.className;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("td", {
      className: className,
      children: row !== null && row !== void 0 && row.total_minutes ? (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_2__.convertTime)(row === null || row === void 0 ? void 0 : row.total_minutes) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
        className: "text-danger",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
          className: "fa-solid fa-chevron-left mr-1",
          style: {
            fontSize: "10px"
          }
        }), "1 min"]
      })
    });
  }
}];

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/TaskWiseTableLoader.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TaskWiseTableLoader.jsx ***!
  \****************************************************************************/
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
var TaskWiseTimeLogTableLoader = function TaskWiseTimeLogTableLoader() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
      className: "sp1_tlr_tr",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 3,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "250px"
        }), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 3,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "200px"
        }), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 3,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 3,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
      })]
    }), lodash__WEBPACK_IMPORTED_MODULE_2___default().times(2, function (index) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
        className: "sp1_tlr_tr",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        })]
      }, index);
    }), lodash__WEBPACK_IMPORTED_MODULE_2___default().times(2, function (index) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
        className: "sp1_tlr_tr",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "180px"
          }), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "200px"
          }), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        })]
      }, index);
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
      className: "sp1_tlr_tr",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 2,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "180px"
        }), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 2,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "200px"
        }), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 2,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        rowSpan: 2,
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
        className: "sp1_tlr_td",
        children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
      })]
    }), lodash__WEBPACK_IMPORTED_MODULE_2___default().times(1, function (index) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
        className: "sp1_tlr_tr",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        })]
      }, index);
    }), lodash__WEBPACK_IMPORTED_MODULE_2___default().times(3, function (index) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("tr", {
        className: "sp1_tlr_tr",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "180px"
          }), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
            width: "200px"
          }), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PersonLoader, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("td", {
          className: "sp1_tlr_td",
          children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {}), " "]
        })]
      }, index);
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskWiseTimeLogTableLoader);

/***/ }),

/***/ "./resources/js/react/TimeLogTable/components/TimeLogTableFilterBar.jsx":
/*!******************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/components/TimeLogTableFilterBar.jsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TimeLogTableFilterBar)
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
/* harmony import */ var _services_api_FilterBarOptionsApiSlice__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/api/FilterBarOptionsApiSlice */ "./resources/js/react/services/api/FilterBarOptionsApiSlice.js");
/* harmony import */ var _ProjectFilter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ProjectFilter */ "./resources/js/react/TimeLogTable/components/ProjectFilter.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
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










// import PersonFilterItem from './ProjectFilter';



function TimeLogTableFilterBar(_ref) {
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
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0__.useState('in progress'),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    status = _React$useState6[0],
    setStatus = _React$useState6[1];

  // employee
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    selectedEmployeeId = _React$useState8[0],
    setSelectedEmployeeId = _React$useState8[1];
  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    selectedPMId = _React$useState10[0],
    setSelectedPMId = _React$useState10[1];
  var _React$useState11 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    selectedClientId = _React$useState12[0],
    setSelectedClientId = _React$useState12[1];
  var _React$useState13 = react__WEBPACK_IMPORTED_MODULE_0__.useState(null),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    selectedProject = _React$useState14[0],
    setSelectedProject = _React$useState14[1];
  var logged_user = (_window = window) === null || _window === void 0 || (_window = _window.Laravel) === null || _window === void 0 ? void 0 : _window.user;
  var top_management = [1, 6, 4, 8].includes(Number(logged_user === null || logged_user === void 0 ? void 0 : logged_user.role_id));

  // fetch all users
  var _useLazyGetAllUsersQu = (0,_services_api_userSliceApi__WEBPACK_IMPORTED_MODULE_4__.useLazyGetAllUsersQuery)('', {
      skip: users.length
    }),
    _useLazyGetAllUsersQu2 = _slicedToArray(_useLazyGetAllUsersQu, 2),
    getAllUsers = _useLazyGetAllUsersQu2[0],
    userIsFetching = _useLazyGetAllUsersQu2[1].isFetching;
  var _useGetProjectsOption = (0,_services_api_FilterBarOptionsApiSlice__WEBPACK_IMPORTED_MODULE_9__.useGetProjectsOptionsQuery)(''),
    getProjectsOptions = _useGetProjectsOption.data,
    isFetching = _useGetProjectsOption.isFetching;
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
  var _selectedClientId = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return selectedClientId;
  }, [selectedClientId]);
  var _selectedPMId = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return selectedPMId;
  }, [selectedPMId]);
  var _status = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return status;
  }, [status]);
  var _selectedProject = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function () {
    return selectedProject;
  }, [selectedProject]);
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
        pm_id: _selectedPMId,
        client_id: _selectedClientId,
        status: _status,
        project_id: _selectedProject ? _selectedProject.id : null
      });
    }
  }, [_selectedClientId, _selectedEmployeeId, _selectedPMId, _status, _selectedProject, _startDate, _endDate]);
  var handleStatusFilter = function handleStatusFilter(status) {
    if (status) {
      setStatus(status);
    } else {
      setStatus(null);
    }
  };
  var handleDateFilter = function handleDateFilter(s, e) {};
  var handleProjectFilter = function handleProjectFilter(e, data) {
    if (data) {
      setSelectedProject(data);
    } else {
      setSelectedProject(null);
    }
  };
  var handleEmployeeFilter = function handleEmployeeFilter(e, data) {
    e.preventDefault();
    if (data) {
      setSelectedEmployeeId(data.id);
    } else {
      setSelectedEmployeeId(null);
    }
  };
  var handlePMFilter = function handlePMFilter(e, data) {
    e.preventDefault();
    if (data) {
      setSelectedPMId(data.id);
    } else {
      setSelectedPMId(null);
    }
  };
  var handleClientFilter = function handleClientFilter(e, data) {
    e.preventDefault();
    if (data) {
      setSelectedClientId(data.id);
    } else {
      setSelectedClientId(null);
    }
  };
  content = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
    className: "d-flex flex-wrap bg-white p-1",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
      className: "border-right pr-1",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_JqueryDateRangePicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
        startDate: startDate,
        setStartDate: setStartDate,
        endDate: endDate,
        setEndDate: setEndDate,
        onApply: handleDateFilter
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_PersonFilter__WEBPACK_IMPORTED_MODULE_3__["default"], {
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
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_PersonFilter__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: "Project Manager",
      items: users ? _toConsumableArray(users === null || users === void 0 ? void 0 : users.filter(function (user) {
        return user.role_id && Number(user.role_id) === 4;
      })) : [],
      selected: selectedPMId ? users === null || users === void 0 ? void 0 : users.find(function (u) {
        return Number(u.id) === selectedPMId;
      }) : null,
      isLoading: userIsFetching,
      onSelect: handlePMFilter
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_PersonFilter__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: "Client",
      items: users ? _toConsumableArray(users === null || users === void 0 ? void 0 : users.filter(function (user) {
        return !user.role_id;
      })) : [],
      selected: selectedClientId ? users === null || users === void 0 ? void 0 : users.find(function (u) {
        return Number(u.id) === selectedClientId;
      }) : null,
      isLoading: userIsFetching,
      onSelect: handleClientFilter
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_ProjectFilter__WEBPACK_IMPORTED_MODULE_10__["default"], {
      title: "Project",
      items: getProjectsOptions ? _toConsumableArray(getProjectsOptions) : [],
      isLoading: isFetching,
      selected: selectedProject,
      onSelect: handleProjectFilter
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_FilterBarItem__WEBPACK_IMPORTED_MODULE_7__["default"], {
      title: "Status",
      items: ["finished", "canceled", "in progress", "partially finished", "under review"],
      selected: status,
      isLoading: false,
      onSelect: handleStatusFilter
    })]
  });
  if (!content) {
    return null;
  }
  return /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal(content, document.getElementById('timeLogTableFilterBar'));
}

/***/ }),

/***/ "./resources/js/react/TimeLogTable/export/excel/ExportTaskWiseTableDataToExcel.jsx":
/*!*****************************************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/export/excel/ExportTaskWiseTableDataToExcel.jsx ***!
  \*****************************************************************************************/
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }





var ExcelFile = react_data_export__WEBPACK_IMPORTED_MODULE_2__["default"].ExcelFile;
var ExcelSheet = react_data_export__WEBPACK_IMPORTED_MODULE_2__["default"].ExcelFile.ExcelSheet;
var ExportTaskWiseTableDataToExcel = function ExportTaskWiseTableDataToExcel(_ref) {
  var _console;
  var data = _ref.data,
    button = _ref.button,
    filter = _ref.filter,
    filename = _ref.filename;
  var fieldStyle = {
    alignment: {
      wrapText: true,
      vertical: "center",
      horizontal: "top"
    }
  };

  /* eslint-disable */
  (_console = console).log.apply(_console, _toConsumableArray(oo_oo("1720749639_18_4_18_29_4", "data", data)));
  // get data
  var getData = function getData(data) {
    var rows = [];
    lodash__WEBPACK_IMPORTED_MODULE_3___default().forEach(data, function (d) {
      var _d$task_name, _d$project_name, _d$pm_name, _d$client_name, _d$employee_name, _d$start_time, _d$end_time, _d$hours;
      var row = [{
        value: (_d$task_name = d["task_name"]) !== null && _d$task_name !== void 0 ? _d$task_name : "--",
        style: fieldStyle
      }, {
        value: (_d$project_name = d["project_name"]) !== null && _d$project_name !== void 0 ? _d$project_name : "--",
        style: fieldStyle
      }, {
        value: (_d$pm_name = d["pm_name"]) !== null && _d$pm_name !== void 0 ? _d$pm_name : "--",
        style: fieldStyle
      }, {
        value: (_d$client_name = d["client_name"]) !== null && _d$client_name !== void 0 ? _d$client_name : "--",
        style: fieldStyle
      }, {
        value: (_d$employee_name = d["employee_name"]) !== null && _d$employee_name !== void 0 ? _d$employee_name : "--",
        style: fieldStyle
      }, {
        value: (_d$start_time = d["start_time"]) !== null && _d$start_time !== void 0 ? _d$start_time : "--",
        style: fieldStyle
      }, {
        value: (_d$end_time = d["end_time"]) !== null && _d$end_time !== void 0 ? _d$end_time : "active",
        style: _objectSpread(_objectSpread({}, fieldStyle), {}, {
          font: {
            color: d["end_time"] ? {
              rgb: "00000000"
            } : {
              rgb: "FF00AA00"
            }
          }
        })
      }, {
        value: (_d$hours = d["hours"]) !== null && _d$hours !== void 0 ? _d$hours : "--",
        style: fieldStyle
      }];
      rows.push(row);
    });
    return rows;
  };

  // columns
  var columns = [{
    title: "Task Name",
    width: {
      wpx: 300
    }
  }, {
    title: "Project Name",
    width: {
      wpx: 300
    }
  }, {
    title: "Project Manager",
    width: {
      wpx: 200
    }
  }, {
    title: "Client Name",
    width: {
      wpx: 200
    }
  }, {
    title: "Employee Name",
    width: {
      wpx: 200
    }
  }, {
    title: "Start Time",
    width: {
      wpx: 200
    }
  }, {
    title: "End Time",
    width: {
      wpx: 200
    }
  }, {
    title: "Total Track Time",
    width: {
      wpx: 200
    }
  }];

  // multi data set
  var multiDataSet = [{
    columns: [{
      title: "Filter"
    }, {
      title: "Date"
    }, {
      title: "Status"
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
      value: lodash__WEBPACK_IMPORTED_MODULE_3___default().startCase(filter === null || filter === void 0 ? void 0 : filter.status),
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ExcelFile, {
    filename: filename,
    element: button,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ExcelSheet, {
      dataSet: multiDataSet,
      name: filename
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExportTaskWiseTableDataToExcel);
/* istanbul ignore next */ /* c8 ignore start */ /* eslint-disable */
;
function oo_cm() {
  try {
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';function _0x4e05(_0x132df1,_0x570c7e){var _0x11147b=_0x1114();return _0x4e05=function(_0x4e05d9,_0x5d0d6c){_0x4e05d9=_0x4e05d9-0xcc;var _0x43c5d9=_0x11147b[_0x4e05d9];return _0x43c5d9;},_0x4e05(_0x132df1,_0x570c7e);}var _0x22af76=_0x4e05;(function(_0x46abcf,_0x158daf){var _0x32d3b=_0x4e05,_0x20b9bd=_0x46abcf();while(!![]){try{var _0x175512=-parseInt(_0x32d3b(0xd8))/0x1*(parseInt(_0x32d3b(0x139))/0x2)+-parseInt(_0x32d3b(0x19a))/0x3*(-parseInt(_0x32d3b(0xce))/0x4)+-parseInt(_0x32d3b(0x131))/0x5*(-parseInt(_0x32d3b(0x121))/0x6)+-parseInt(_0x32d3b(0xdf))/0x7+-parseInt(_0x32d3b(0x180))/0x8+-parseInt(_0x32d3b(0xdd))/0x9+parseInt(_0x32d3b(0x19f))/0xa;if(_0x175512===_0x158daf)break;else _0x20b9bd['push'](_0x20b9bd['shift']());}catch(_0x5a88dd){_0x20b9bd['push'](_0x20b9bd['shift']());}}}(_0x1114,0xc8578));function _0x1114(){var _0x346005=['_setNodeExpressionPath','error','args','prototype','String','_treeNodePropertiesAfterFullValue','_inNextEdge','port','_isPrimitiveWrapperType','hrtime','_setNodeId','log','_property','_addProperty','_inBrowser','_setNodePermissions','Buffer','type','_p_','_disposeWebsocket','dockerizedApp','getOwnPropertyDescriptor','array','_addLoadNode','[object\\x20BigInt]','_ws','constructor','url','pathToFileURL','indexOf','console','ws/index.js','location','_numberRegExp','[object\\x20Map]','concat','_console_ninja_session','message','catch','_isMap','hits','_isArray','value','hasOwnProperty','_isUndefined','_undefined','number','unshift','match','object','_hasSymbolPropertyOnItsPath','480lUDrpb','autoExpandPropertyCount','charAt','_addObjectProperty','NEXT_RUNTIME','getPrototypeOf','_isNegativeZero','autoExpandLimit','parent','autoExpandMaxDepth','_isSet','remix','_Symbol','nodeModules','replace','_sortProps','63100AoWTqZ','trace','call','test','unknown','_connecting','global','path','283748KWBEiW',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\"],'index','_getOwnPropertyDescriptor','Error','_dateToString','_capIfString','capped','_p_length','current','nuxt','toLowerCase','_HTMLAllCollection','_connected','defineProperty','isExpressionToEvaluate','name','_WebSocket','send','positiveInfinity','origin','_getOwnPropertySymbols','_blacklistedProperty','join','_hasMapOnItsPath','then','depth','process','data','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','expressionsToEvaluate','_setNodeExpandableState','onmessage','_treeNodePropertiesBeforeFullValue','_getOwnPropertyNames','null','parse','function','versions','getWebSocketClass','_webSocketErrorDocsLink','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','_cleanNode','props','_connectToHostNow','length','totalStrLength','_propertyName','_isPrimitiveType','_console_ninja','date','elapsed','coverage','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','boolean','root_exp','POSITIVE_INFINITY','allStrLength','stringify','_socket','Map','undefined','_type','level','timeStamp','_setNodeLabel','1.0.0','_consoleNinjaAllowedToStart','count','map','12843192jWoaUE','_reconnectTimeout','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','substr','noFunctions','Symbol','eventReceivedCallback','next.js','warn','','edge','sort','toUpperCase','hostname','forEach','_addFunctionsNode','default','strLength','create','_maxConnectAttemptCount','node','rootExpression','resolveGetters','root_exp_id','_sendErrorMessage','_setNodeQueryPath','90822aTNqIn','gateway.docker.internal','_regExpToString','toString','webpack','31927630hHIxKQ','env','[object\\x20Set]','stack','Number','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','1721013041632','ws://','now','49864','performance','[object\\x20Array]','_allowedToConnectOnSend','serialize','symbol','astro','pop','_objectToString','cappedElements','_quotedRegExp','autoExpandPreviousObjects','time','valueOf','reduceLimits','elements','_additionalMetadata','getter','push','_processTreeNodeResult','bigint','200agxRhV','angular','https://tinyurl.com/37x8b79t','set','host','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','HTMLAllCollection','reload','_p_name','stackTraceLimit','3vhIqtx','sortProps','_keyStrRegExp','string','[object\\x20Date]','13141908tlsOku','autoExpand','9829610bfJFBs','onerror','setter','negativeInfinity','Set',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.329\\\\node_modules\",'getOwnPropertyNames','NEGATIVE_INFINITY','_allowedToSend','onclose','unref','_WebSocketClass','\\x20server','_attemptToReconnectShortly','_connectAttemptCount'];_0x1114=function(){return _0x346005;};return _0x1114();}var K=Object[_0x22af76(0x192)],Q=Object[_0x22af76(0x147)],G=Object[_0x22af76(0x103)],ee=Object['getOwnPropertyNames'],te=Object[_0x22af76(0x126)],ne=Object[_0x22af76(0xf1)][_0x22af76(0x119)],re=(_0x362494,_0x245a80,_0x13a0f4,_0x22676e)=>{var _0x1dffc7=_0x22af76;if(_0x245a80&&typeof _0x245a80==_0x1dffc7(0x11f)||typeof _0x245a80==_0x1dffc7(0x15f)){for(let _0xe1431e of ee(_0x245a80))!ne[_0x1dffc7(0x133)](_0x362494,_0xe1431e)&&_0xe1431e!==_0x13a0f4&&Q(_0x362494,_0xe1431e,{'get':()=>_0x245a80[_0xe1431e],'enumerable':!(_0x22676e=G(_0x245a80,_0xe1431e))||_0x22676e['enumerable']});}return _0x362494;},V=(_0x20378b,_0x7f3231,_0x558141)=>(_0x558141=_0x20378b!=null?K(te(_0x20378b)):{},re(_0x7f3231||!_0x20378b||!_0x20378b['__es'+'Module']?Q(_0x558141,_0x22af76(0x190),{'value':_0x20378b,'enumerable':!0x0}):_0x558141,_0x20378b)),x=class{constructor(_0x1609f5,_0x403768,_0x3c6fa3,_0x287500,_0x241c39,_0x51be42){var _0xdc2d51=_0x22af76,_0x191cdb,_0x177410,_0x2a65ea,_0x2db354;this[_0xdc2d51(0x137)]=_0x1609f5,this[_0xdc2d51(0xd2)]=_0x403768,this[_0xdc2d51(0xf5)]=_0x3c6fa3,this['nodeModules']=_0x287500,this['dockerizedApp']=_0x241c39,this['eventReceivedCallback']=_0x51be42,this[_0xdc2d51(0xe7)]=!0x0,this[_0xdc2d51(0x1ab)]=!0x0,this[_0xdc2d51(0x146)]=!0x1,this['_connecting']=!0x1,this['_inNextEdge']=((_0x177410=(_0x191cdb=_0x1609f5['process'])==null?void 0x0:_0x191cdb[_0xdc2d51(0x1a0)])==null?void 0x0:_0x177410['NEXT_RUNTIME'])===_0xdc2d51(0x18a),this[_0xdc2d51(0xfc)]=!((_0x2db354=(_0x2a65ea=this['global'][_0xdc2d51(0x154)])==null?void 0x0:_0x2a65ea[_0xdc2d51(0x160)])!=null&&_0x2db354[_0xdc2d51(0x194)])&&!this[_0xdc2d51(0xf4)],this['_WebSocketClass']=null,this[_0xdc2d51(0xed)]=0x0,this[_0xdc2d51(0x193)]=0x14,this['_webSocketErrorDocsLink']=_0xdc2d51(0xd0),this[_0xdc2d51(0x198)]=(this[_0xdc2d51(0xfc)]?_0xdc2d51(0x157):_0xdc2d51(0x163))+this[_0xdc2d51(0x162)];}async[_0x22af76(0x161)](){var _0xd06aea=_0x22af76,_0x1dacad,_0x46068c;if(this[_0xd06aea(0xea)])return this[_0xd06aea(0xea)];let _0x387d62;if(this[_0xd06aea(0xfc)]||this['_inNextEdge'])_0x387d62=this['global']['WebSocket'];else{if((_0x1dacad=this[_0xd06aea(0x137)][_0xd06aea(0x154)])!=null&&_0x1dacad[_0xd06aea(0x14a)])_0x387d62=(_0x46068c=this[_0xd06aea(0x137)][_0xd06aea(0x154)])==null?void 0x0:_0x46068c[_0xd06aea(0x14a)];else try{let _0xf81d39=await import(_0xd06aea(0x138));_0x387d62=(await import((await import(_0xd06aea(0x109)))[_0xd06aea(0x10a)](_0xf81d39['join'](this[_0xd06aea(0x12e)],_0xd06aea(0x10d)))[_0xd06aea(0x19d)]()))[_0xd06aea(0x190)];}catch{try{_0x387d62=require(require(_0xd06aea(0x138))[_0xd06aea(0x150)](this[_0xd06aea(0x12e)],'ws'));}catch{throw new Error(_0xd06aea(0xd3));}}}return this[_0xd06aea(0xea)]=_0x387d62,_0x387d62;}[_0x22af76(0x166)](){var _0x141e7f=_0x22af76;this['_connecting']||this['_connected']||this['_connectAttemptCount']>=this[_0x141e7f(0x193)]||(this['_allowedToConnectOnSend']=!0x1,this['_connecting']=!0x0,this['_connectAttemptCount']++,this[_0x141e7f(0x107)]=new Promise((_0x51617e,_0x3f827d)=>{var _0x4e9b50=_0x141e7f;this[_0x4e9b50(0x161)]()[_0x4e9b50(0x152)](_0x2d0aa9=>{var _0x3caaeb=_0x4e9b50;let _0x2332f1=new _0x2d0aa9(_0x3caaeb(0x1a6)+(!this[_0x3caaeb(0xfc)]&&this[_0x3caaeb(0x102)]?_0x3caaeb(0x19b):this[_0x3caaeb(0xd2)])+':'+this[_0x3caaeb(0xf5)]);_0x2332f1[_0x3caaeb(0xe0)]=()=>{var _0x32c573=_0x3caaeb;this[_0x32c573(0xe7)]=!0x1,this[_0x32c573(0x101)](_0x2332f1),this[_0x32c573(0xec)](),_0x3f827d(new Error('logger\\x20websocket\\x20error'));},_0x2332f1['onopen']=()=>{var _0x45f81d=_0x3caaeb;this[_0x45f81d(0xfc)]||_0x2332f1[_0x45f81d(0x175)]&&_0x2332f1['_socket'][_0x45f81d(0xe9)]&&_0x2332f1[_0x45f81d(0x175)][_0x45f81d(0xe9)](),_0x51617e(_0x2332f1);},_0x2332f1[_0x3caaeb(0xe8)]=()=>{var _0x33d119=_0x3caaeb;this[_0x33d119(0x1ab)]=!0x0,this['_disposeWebsocket'](_0x2332f1),this[_0x33d119(0xec)]();},_0x2332f1[_0x3caaeb(0x15a)]=_0x2cc25f=>{var _0x589ea6=_0x3caaeb;try{if(!(_0x2cc25f!=null&&_0x2cc25f[_0x589ea6(0x155)])||!this[_0x589ea6(0x186)])return;let _0x21cb85=JSON[_0x589ea6(0x15e)](_0x2cc25f['data']);this[_0x589ea6(0x186)](_0x21cb85['method'],_0x21cb85[_0x589ea6(0xf0)],this[_0x589ea6(0x137)],this[_0x589ea6(0xfc)]);}catch{}};})['then'](_0x5a890f=>(this['_connected']=!0x0,this[_0x4e9b50(0x136)]=!0x1,this[_0x4e9b50(0x1ab)]=!0x1,this['_allowedToSend']=!0x0,this[_0x4e9b50(0xed)]=0x0,_0x5a890f))[_0x4e9b50(0x114)](_0x23e9d1=>(this[_0x4e9b50(0x146)]=!0x1,this['_connecting']=!0x1,console[_0x4e9b50(0x188)](_0x4e9b50(0x182)+this[_0x4e9b50(0x162)]),_0x3f827d(new Error(_0x4e9b50(0x16f)+(_0x23e9d1&&_0x23e9d1['message'])))));}));}[_0x22af76(0x101)](_0x25a1d0){var _0x3dd193=_0x22af76;this[_0x3dd193(0x146)]=!0x1,this[_0x3dd193(0x136)]=!0x1;try{_0x25a1d0[_0x3dd193(0xe8)]=null,_0x25a1d0['onerror']=null,_0x25a1d0['onopen']=null;}catch{}try{_0x25a1d0['readyState']<0x2&&_0x25a1d0['close']();}catch{}}[_0x22af76(0xec)](){var _0xcb2554=_0x22af76;clearTimeout(this[_0xcb2554(0x181)]),!(this[_0xcb2554(0xed)]>=this[_0xcb2554(0x193)])&&(this[_0xcb2554(0x181)]=setTimeout(()=>{var _0x50e8ea=_0xcb2554,_0x4bf527;this[_0x50e8ea(0x146)]||this[_0x50e8ea(0x136)]||(this[_0x50e8ea(0x166)](),(_0x4bf527=this[_0x50e8ea(0x107)])==null||_0x4bf527[_0x50e8ea(0x114)](()=>this[_0x50e8ea(0xec)]()));},0x1f4),this['_reconnectTimeout'][_0xcb2554(0xe9)]&&this[_0xcb2554(0x181)][_0xcb2554(0xe9)]());}async[_0x22af76(0x14b)](_0x57ba25){var _0x4a02a6=_0x22af76;try{if(!this[_0x4a02a6(0xe7)])return;this[_0x4a02a6(0x1ab)]&&this[_0x4a02a6(0x166)](),(await this['_ws'])['send'](JSON[_0x4a02a6(0x174)](_0x57ba25));}catch(_0x2a794b){console['warn'](this['_sendErrorMessage']+':\\x20'+(_0x2a794b&&_0x2a794b[_0x4a02a6(0x113)])),this['_allowedToSend']=!0x1,this[_0x4a02a6(0xec)]();}}};function q(_0x1b0074,_0xf2179c,_0x20dcdd,_0x4f2195,_0x59797e,_0x545e3a,_0x41a8b2,_0x434706=ie){var _0x26ffa9=_0x22af76;let _0x535257=_0x20dcdd['split'](',')[_0x26ffa9(0x17f)](_0x2683dd=>{var _0x9074a=_0x26ffa9,_0x683eaf,_0x1c8259,_0x14c9d1,_0x14b5d4;try{if(!_0x1b0074[_0x9074a(0x112)]){let _0x2c0baf=((_0x1c8259=(_0x683eaf=_0x1b0074[_0x9074a(0x154)])==null?void 0x0:_0x683eaf['versions'])==null?void 0x0:_0x1c8259[_0x9074a(0x194)])||((_0x14b5d4=(_0x14c9d1=_0x1b0074['process'])==null?void 0x0:_0x14c9d1[_0x9074a(0x1a0)])==null?void 0x0:_0x14b5d4[_0x9074a(0x125)])===_0x9074a(0x18a);(_0x59797e==='next.js'||_0x59797e===_0x9074a(0x12c)||_0x59797e===_0x9074a(0x1ae)||_0x59797e===_0x9074a(0xcf))&&(_0x59797e+=_0x2c0baf?_0x9074a(0xeb):'\\x20browser'),_0x1b0074[_0x9074a(0x112)]={'id':+new Date(),'tool':_0x59797e},_0x41a8b2&&_0x59797e&&!_0x2c0baf&&console['log']('%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20'+(_0x59797e[_0x9074a(0x123)](0x0)[_0x9074a(0x18c)]()+_0x59797e['substr'](0x1))+',','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)',_0x9074a(0x156));}let _0xdde93e=new x(_0x1b0074,_0xf2179c,_0x2683dd,_0x4f2195,_0x545e3a,_0x434706);return _0xdde93e[_0x9074a(0x14b)]['bind'](_0xdde93e);}catch(_0x4d46a5){return console[_0x9074a(0x188)](_0x9074a(0x1a4),_0x4d46a5&&_0x4d46a5[_0x9074a(0x113)]),()=>{};}});return _0x41baff=>_0x535257['forEach'](_0x484f68=>_0x484f68(_0x41baff));}function ie(_0x53ab10,_0x4d955a,_0x54799a,_0x45c75e){var _0x18af27=_0x22af76;_0x45c75e&&_0x53ab10===_0x18af27(0xd5)&&_0x54799a['location'][_0x18af27(0xd5)]();}function b(_0x1ee67e){var _0x487661=_0x22af76,_0x359973,_0x2e668e;let _0x431568=function(_0xd14001,_0x4ddd77){return _0x4ddd77-_0xd14001;},_0x148c83;if(_0x1ee67e[_0x487661(0x1a9)])_0x148c83=function(){var _0x39231c=_0x487661;return _0x1ee67e[_0x39231c(0x1a9)][_0x39231c(0x1a7)]();};else{if(_0x1ee67e[_0x487661(0x154)]&&_0x1ee67e[_0x487661(0x154)][_0x487661(0xf7)]&&((_0x2e668e=(_0x359973=_0x1ee67e['process'])==null?void 0x0:_0x359973[_0x487661(0x1a0)])==null?void 0x0:_0x2e668e[_0x487661(0x125)])!==_0x487661(0x18a))_0x148c83=function(){var _0x16d4b2=_0x487661;return _0x1ee67e[_0x16d4b2(0x154)][_0x16d4b2(0xf7)]();},_0x431568=function(_0x399d81,_0x4aac79){return 0x3e8*(_0x4aac79[0x0]-_0x399d81[0x0])+(_0x4aac79[0x1]-_0x399d81[0x1])/0xf4240;};else try{let {performance:_0x440a1a}=require('perf_hooks');_0x148c83=function(){var _0x3436ff=_0x487661;return _0x440a1a[_0x3436ff(0x1a7)]();};}catch{_0x148c83=function(){return+new Date();};}}return{'elapsed':_0x431568,'timeStamp':_0x148c83,'now':()=>Date[_0x487661(0x1a7)]()};}function X(_0x3ee271,_0x39c88a,_0x445304){var _0x49ba7e=_0x22af76,_0x1d76db,_0x44b452,_0x4ca6ff,_0x440ab9,_0x508d34;if(_0x3ee271[_0x49ba7e(0x17d)]!==void 0x0)return _0x3ee271[_0x49ba7e(0x17d)];let _0x55e15c=((_0x44b452=(_0x1d76db=_0x3ee271[_0x49ba7e(0x154)])==null?void 0x0:_0x1d76db[_0x49ba7e(0x160)])==null?void 0x0:_0x44b452[_0x49ba7e(0x194)])||((_0x440ab9=(_0x4ca6ff=_0x3ee271['process'])==null?void 0x0:_0x4ca6ff[_0x49ba7e(0x1a0)])==null?void 0x0:_0x440ab9[_0x49ba7e(0x125)])===_0x49ba7e(0x18a);return _0x55e15c&&_0x445304===_0x49ba7e(0x143)?_0x3ee271['_consoleNinjaAllowedToStart']=!0x1:_0x3ee271[_0x49ba7e(0x17d)]=_0x55e15c||!_0x39c88a||((_0x508d34=_0x3ee271['location'])==null?void 0x0:_0x508d34[_0x49ba7e(0x18d)])&&_0x39c88a['includes'](_0x3ee271[_0x49ba7e(0x10e)][_0x49ba7e(0x18d)]),_0x3ee271[_0x49ba7e(0x17d)];}function H(_0x3e0a99,_0x5b4f2b,_0x5e09b5,_0x495f21){var _0x2ae0f7=_0x22af76;_0x3e0a99=_0x3e0a99,_0x5b4f2b=_0x5b4f2b,_0x5e09b5=_0x5e09b5,_0x495f21=_0x495f21;let _0x1bb9bf=b(_0x3e0a99),_0x23ae99=_0x1bb9bf[_0x2ae0f7(0x16d)],_0x399dfb=_0x1bb9bf[_0x2ae0f7(0x17a)];class _0x493c05{constructor(){var _0x417330=_0x2ae0f7;this[_0x417330(0xda)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x417330(0x10f)]=/^(0|[1-9][0-9]*)$/,this[_0x417330(0x1b2)]=/'([^\\\\']|\\\\')*'/,this[_0x417330(0x11b)]=_0x3e0a99['undefined'],this[_0x417330(0x145)]=_0x3e0a99[_0x417330(0xd4)],this['_getOwnPropertyDescriptor']=Object[_0x417330(0x103)],this[_0x417330(0x15c)]=Object[_0x417330(0xe5)],this[_0x417330(0x12d)]=_0x3e0a99[_0x417330(0x185)],this[_0x417330(0x19c)]=RegExp[_0x417330(0xf1)][_0x417330(0x19d)],this[_0x417330(0x13e)]=Date['prototype'][_0x417330(0x19d)];}[_0x2ae0f7(0x1ac)](_0xc46a6f,_0x15f39a,_0x4da51d,_0x4085fa){var _0x267db2=_0x2ae0f7,_0x5048df=this,_0x13f1a7=_0x4da51d[_0x267db2(0xde)];function _0x2f6e21(_0xc9b0aa,_0x4725d0,_0x2f5f1a){var _0x240248=_0x267db2;_0x4725d0[_0x240248(0xff)]=_0x240248(0x135),_0x4725d0[_0x240248(0xef)]=_0xc9b0aa[_0x240248(0x113)],_0x168456=_0x2f5f1a[_0x240248(0x194)]['current'],_0x2f5f1a[_0x240248(0x194)][_0x240248(0x142)]=_0x4725d0,_0x5048df['_treeNodePropertiesBeforeFullValue'](_0x4725d0,_0x2f5f1a);}try{_0x4da51d['level']++,_0x4da51d[_0x267db2(0xde)]&&_0x4da51d['autoExpandPreviousObjects'][_0x267db2(0x1ba)](_0x15f39a);var _0x13cc79,_0x5092eb,_0x273a8b,_0x2c8b10,_0x1b7ff=[],_0x3ba1f5=[],_0x42725b,_0x1ed74b=this[_0x267db2(0x178)](_0x15f39a),_0x4087a2=_0x1ed74b===_0x267db2(0x104),_0xbc59c7=!0x1,_0x48e880=_0x1ed74b===_0x267db2(0x15f),_0x3d796a=this[_0x267db2(0x16a)](_0x1ed74b),_0x3565d1=this[_0x267db2(0xf6)](_0x1ed74b),_0x52c868=_0x3d796a||_0x3565d1,_0x5518dd={},_0x288fbf=0x0,_0x5063ec=!0x1,_0x168456,_0x295739=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x4da51d['depth']){if(_0x4087a2){if(_0x5092eb=_0x15f39a['length'],_0x5092eb>_0x4da51d[_0x267db2(0x1b7)]){for(_0x273a8b=0x0,_0x2c8b10=_0x4da51d[_0x267db2(0x1b7)],_0x13cc79=_0x273a8b;_0x13cc79<_0x2c8b10;_0x13cc79++)_0x3ba1f5[_0x267db2(0x1ba)](_0x5048df['_addProperty'](_0x1b7ff,_0x15f39a,_0x1ed74b,_0x13cc79,_0x4da51d));_0xc46a6f[_0x267db2(0x1b1)]=!0x0;}else{for(_0x273a8b=0x0,_0x2c8b10=_0x5092eb,_0x13cc79=_0x273a8b;_0x13cc79<_0x2c8b10;_0x13cc79++)_0x3ba1f5['push'](_0x5048df[_0x267db2(0xfb)](_0x1b7ff,_0x15f39a,_0x1ed74b,_0x13cc79,_0x4da51d));}_0x4da51d['autoExpandPropertyCount']+=_0x3ba1f5[_0x267db2(0x167)];}if(!(_0x1ed74b==='null'||_0x1ed74b==='undefined')&&!_0x3d796a&&_0x1ed74b!=='String'&&_0x1ed74b!==_0x267db2(0xfe)&&_0x1ed74b!==_0x267db2(0xcd)){var _0x5c308b=_0x4085fa['props']||_0x4da51d[_0x267db2(0x165)];if(this[_0x267db2(0x12b)](_0x15f39a)?(_0x13cc79=0x0,_0x15f39a[_0x267db2(0x18e)](function(_0x34a7b8){var _0x279df8=_0x267db2;if(_0x288fbf++,_0x4da51d['autoExpandPropertyCount']++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;return;}if(!_0x4da51d[_0x279df8(0x148)]&&_0x4da51d[_0x279df8(0xde)]&&_0x4da51d[_0x279df8(0x122)]>_0x4da51d[_0x279df8(0x128)]){_0x5063ec=!0x0;return;}_0x3ba1f5[_0x279df8(0x1ba)](_0x5048df[_0x279df8(0xfb)](_0x1b7ff,_0x15f39a,_0x279df8(0xe3),_0x13cc79++,_0x4da51d,function(_0x4b17d8){return function(){return _0x4b17d8;};}(_0x34a7b8)));})):this[_0x267db2(0x115)](_0x15f39a)&&_0x15f39a['forEach'](function(_0x1d475b,_0x2281bc){var _0x4a3939=_0x267db2;if(_0x288fbf++,_0x4da51d[_0x4a3939(0x122)]++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;return;}if(!_0x4da51d['isExpressionToEvaluate']&&_0x4da51d[_0x4a3939(0xde)]&&_0x4da51d[_0x4a3939(0x122)]>_0x4da51d[_0x4a3939(0x128)]){_0x5063ec=!0x0;return;}var _0x30809b=_0x2281bc[_0x4a3939(0x19d)]();_0x30809b[_0x4a3939(0x167)]>0x64&&(_0x30809b=_0x30809b['slice'](0x0,0x64)+'...'),_0x3ba1f5[_0x4a3939(0x1ba)](_0x5048df[_0x4a3939(0xfb)](_0x1b7ff,_0x15f39a,_0x4a3939(0x176),_0x30809b,_0x4da51d,function(_0x3b6d54){return function(){return _0x3b6d54;};}(_0x1d475b)));}),!_0xbc59c7){try{for(_0x42725b in _0x15f39a)if(!(_0x4087a2&&_0x295739[_0x267db2(0x134)](_0x42725b))&&!this[_0x267db2(0x14f)](_0x15f39a,_0x42725b,_0x4da51d)){if(_0x288fbf++,_0x4da51d[_0x267db2(0x122)]++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;break;}if(!_0x4da51d['isExpressionToEvaluate']&&_0x4da51d[_0x267db2(0xde)]&&_0x4da51d[_0x267db2(0x122)]>_0x4da51d['autoExpandLimit']){_0x5063ec=!0x0;break;}_0x3ba1f5[_0x267db2(0x1ba)](_0x5048df[_0x267db2(0x124)](_0x1b7ff,_0x5518dd,_0x15f39a,_0x1ed74b,_0x42725b,_0x4da51d));}}catch{}if(_0x5518dd[_0x267db2(0x141)]=!0x0,_0x48e880&&(_0x5518dd[_0x267db2(0xd6)]=!0x0),!_0x5063ec){var _0x143943=[]['concat'](this[_0x267db2(0x15c)](_0x15f39a))[_0x267db2(0x111)](this['_getOwnPropertySymbols'](_0x15f39a));for(_0x13cc79=0x0,_0x5092eb=_0x143943[_0x267db2(0x167)];_0x13cc79<_0x5092eb;_0x13cc79++)if(_0x42725b=_0x143943[_0x13cc79],!(_0x4087a2&&_0x295739[_0x267db2(0x134)](_0x42725b[_0x267db2(0x19d)]()))&&!this['_blacklistedProperty'](_0x15f39a,_0x42725b,_0x4da51d)&&!_0x5518dd[_0x267db2(0x100)+_0x42725b[_0x267db2(0x19d)]()]){if(_0x288fbf++,_0x4da51d[_0x267db2(0x122)]++,_0x288fbf>_0x5c308b){_0x5063ec=!0x0;break;}if(!_0x4da51d[_0x267db2(0x148)]&&_0x4da51d[_0x267db2(0xde)]&&_0x4da51d[_0x267db2(0x122)]>_0x4da51d[_0x267db2(0x128)]){_0x5063ec=!0x0;break;}_0x3ba1f5['push'](_0x5048df[_0x267db2(0x124)](_0x1b7ff,_0x5518dd,_0x15f39a,_0x1ed74b,_0x42725b,_0x4da51d));}}}}}if(_0xc46a6f[_0x267db2(0xff)]=_0x1ed74b,_0x52c868?(_0xc46a6f[_0x267db2(0x118)]=_0x15f39a['valueOf'](),this['_capIfString'](_0x1ed74b,_0xc46a6f,_0x4da51d,_0x4085fa)):_0x1ed74b===_0x267db2(0x16c)?_0xc46a6f[_0x267db2(0x118)]=this['_dateToString'][_0x267db2(0x133)](_0x15f39a):_0x1ed74b===_0x267db2(0xcd)?_0xc46a6f[_0x267db2(0x118)]=_0x15f39a['toString']():_0x1ed74b==='RegExp'?_0xc46a6f['value']=this[_0x267db2(0x19c)][_0x267db2(0x133)](_0x15f39a):_0x1ed74b==='symbol'&&this[_0x267db2(0x12d)]?_0xc46a6f[_0x267db2(0x118)]=this['_Symbol'][_0x267db2(0xf1)][_0x267db2(0x19d)][_0x267db2(0x133)](_0x15f39a):!_0x4da51d[_0x267db2(0x153)]&&!(_0x1ed74b===_0x267db2(0x15d)||_0x1ed74b===_0x267db2(0x177))&&(delete _0xc46a6f['value'],_0xc46a6f[_0x267db2(0x140)]=!0x0),_0x5063ec&&(_0xc46a6f['cappedProps']=!0x0),_0x168456=_0x4da51d[_0x267db2(0x194)][_0x267db2(0x142)],_0x4da51d[_0x267db2(0x194)][_0x267db2(0x142)]=_0xc46a6f,this[_0x267db2(0x15b)](_0xc46a6f,_0x4da51d),_0x3ba1f5['length']){for(_0x13cc79=0x0,_0x5092eb=_0x3ba1f5[_0x267db2(0x167)];_0x13cc79<_0x5092eb;_0x13cc79++)_0x3ba1f5[_0x13cc79](_0x13cc79);}_0x1b7ff[_0x267db2(0x167)]&&(_0xc46a6f[_0x267db2(0x165)]=_0x1b7ff);}catch(_0x4e79c7){_0x2f6e21(_0x4e79c7,_0xc46a6f,_0x4da51d);}return this[_0x267db2(0x1b8)](_0x15f39a,_0xc46a6f),this[_0x267db2(0xf3)](_0xc46a6f,_0x4da51d),_0x4da51d[_0x267db2(0x194)][_0x267db2(0x142)]=_0x168456,_0x4da51d[_0x267db2(0x179)]--,_0x4da51d[_0x267db2(0xde)]=_0x13f1a7,_0x4da51d[_0x267db2(0xde)]&&_0x4da51d['autoExpandPreviousObjects'][_0x267db2(0x1af)](),_0xc46a6f;}[_0x2ae0f7(0x14e)](_0x674423){return Object['getOwnPropertySymbols']?Object['getOwnPropertySymbols'](_0x674423):[];}[_0x2ae0f7(0x12b)](_0x500002){var _0x5b615f=_0x2ae0f7;return!!(_0x500002&&_0x3e0a99[_0x5b615f(0xe3)]&&this[_0x5b615f(0x1b0)](_0x500002)===_0x5b615f(0x1a1)&&_0x500002['forEach']);}['_blacklistedProperty'](_0x4e6570,_0x3590e6,_0x5ad7dc){var _0x428d63=_0x2ae0f7;return _0x5ad7dc[_0x428d63(0x184)]?typeof _0x4e6570[_0x3590e6]==_0x428d63(0x15f):!0x1;}[_0x2ae0f7(0x178)](_0x75d84b){var _0x657c98=_0x2ae0f7,_0x1c400c='';return _0x1c400c=typeof _0x75d84b,_0x1c400c===_0x657c98(0x11f)?this[_0x657c98(0x1b0)](_0x75d84b)===_0x657c98(0x1aa)?_0x1c400c='array':this['_objectToString'](_0x75d84b)===_0x657c98(0xdc)?_0x1c400c=_0x657c98(0x16c):this[_0x657c98(0x1b0)](_0x75d84b)===_0x657c98(0x106)?_0x1c400c=_0x657c98(0xcd):_0x75d84b===null?_0x1c400c=_0x657c98(0x15d):_0x75d84b[_0x657c98(0x108)]&&(_0x1c400c=_0x75d84b[_0x657c98(0x108)][_0x657c98(0x149)]||_0x1c400c):_0x1c400c==='undefined'&&this[_0x657c98(0x145)]&&_0x75d84b instanceof this[_0x657c98(0x145)]&&(_0x1c400c='HTMLAllCollection'),_0x1c400c;}[_0x2ae0f7(0x1b0)](_0x559a38){var _0x5ab8ba=_0x2ae0f7;return Object['prototype']['toString'][_0x5ab8ba(0x133)](_0x559a38);}[_0x2ae0f7(0x16a)](_0xaccb6f){var _0x70a587=_0x2ae0f7;return _0xaccb6f===_0x70a587(0x170)||_0xaccb6f===_0x70a587(0xdb)||_0xaccb6f===_0x70a587(0x11c);}[_0x2ae0f7(0xf6)](_0x3e5474){var _0x41e848=_0x2ae0f7;return _0x3e5474==='Boolean'||_0x3e5474===_0x41e848(0xf2)||_0x3e5474==='Number';}[_0x2ae0f7(0xfb)](_0xecb58c,_0x3db704,_0x3ab8fb,_0x5f0c81,_0x377739,_0x2dcdc6){var _0x515882=this;return function(_0x2657ed){var _0x4a4214=_0x4e05,_0x5be757=_0x377739[_0x4a4214(0x194)][_0x4a4214(0x142)],_0x567054=_0x377739[_0x4a4214(0x194)][_0x4a4214(0x13b)],_0x19b367=_0x377739[_0x4a4214(0x194)]['parent'];_0x377739[_0x4a4214(0x194)][_0x4a4214(0x129)]=_0x5be757,_0x377739[_0x4a4214(0x194)][_0x4a4214(0x13b)]=typeof _0x5f0c81=='number'?_0x5f0c81:_0x2657ed,_0xecb58c[_0x4a4214(0x1ba)](_0x515882[_0x4a4214(0xfa)](_0x3db704,_0x3ab8fb,_0x5f0c81,_0x377739,_0x2dcdc6)),_0x377739[_0x4a4214(0x194)][_0x4a4214(0x129)]=_0x19b367,_0x377739['node'][_0x4a4214(0x13b)]=_0x567054;};}['_addObjectProperty'](_0x1516be,_0x59d7e3,_0x105f8f,_0x454f0d,_0x400e43,_0x6290e2,_0x40ff4e){var _0x6580bc=_0x2ae0f7,_0x989a80=this;return _0x59d7e3[_0x6580bc(0x100)+_0x400e43[_0x6580bc(0x19d)]()]=!0x0,function(_0x29514a){var _0x16e6f2=_0x6580bc,_0x5656a0=_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x142)],_0x526425=_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x13b)],_0x3ca127=_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x129)];_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x129)]=_0x5656a0,_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x13b)]=_0x29514a,_0x1516be[_0x16e6f2(0x1ba)](_0x989a80[_0x16e6f2(0xfa)](_0x105f8f,_0x454f0d,_0x400e43,_0x6290e2,_0x40ff4e)),_0x6290e2['node'][_0x16e6f2(0x129)]=_0x3ca127,_0x6290e2[_0x16e6f2(0x194)][_0x16e6f2(0x13b)]=_0x526425;};}[_0x2ae0f7(0xfa)](_0x171671,_0x4a5594,_0x54e4b2,_0x1f8c32,_0x40e0bb){var _0x5ca991=_0x2ae0f7,_0x450190=this;_0x40e0bb||(_0x40e0bb=function(_0x1ff14c,_0x1bb6ad){return _0x1ff14c[_0x1bb6ad];});var _0x41fccd=_0x54e4b2[_0x5ca991(0x19d)](),_0x1e1bb8=_0x1f8c32[_0x5ca991(0x158)]||{},_0x3442cc=_0x1f8c32[_0x5ca991(0x153)],_0x50ca90=_0x1f8c32[_0x5ca991(0x148)];try{var _0x583667=this[_0x5ca991(0x115)](_0x171671),_0x656a4f=_0x41fccd;_0x583667&&_0x656a4f[0x0]==='\\x27'&&(_0x656a4f=_0x656a4f['substr'](0x1,_0x656a4f[_0x5ca991(0x167)]-0x2));var _0x1b9e86=_0x1f8c32[_0x5ca991(0x158)]=_0x1e1bb8[_0x5ca991(0x100)+_0x656a4f];_0x1b9e86&&(_0x1f8c32[_0x5ca991(0x153)]=_0x1f8c32[_0x5ca991(0x153)]+0x1),_0x1f8c32['isExpressionToEvaluate']=!!_0x1b9e86;var _0x54749e=typeof _0x54e4b2==_0x5ca991(0x1ad),_0x8fbb35={'name':_0x54749e||_0x583667?_0x41fccd:this[_0x5ca991(0x169)](_0x41fccd)};if(_0x54749e&&(_0x8fbb35[_0x5ca991(0x1ad)]=!0x0),!(_0x4a5594===_0x5ca991(0x104)||_0x4a5594===_0x5ca991(0x13d))){var _0x38fb0f=this[_0x5ca991(0x13c)](_0x171671,_0x54e4b2);if(_0x38fb0f&&(_0x38fb0f[_0x5ca991(0xd1)]&&(_0x8fbb35[_0x5ca991(0xe1)]=!0x0),_0x38fb0f['get']&&!_0x1b9e86&&!_0x1f8c32[_0x5ca991(0x196)]))return _0x8fbb35[_0x5ca991(0x1b9)]=!0x0,this['_processTreeNodeResult'](_0x8fbb35,_0x1f8c32),_0x8fbb35;}var _0x901e2;try{_0x901e2=_0x40e0bb(_0x171671,_0x54e4b2);}catch(_0x2c48ec){return _0x8fbb35={'name':_0x41fccd,'type':_0x5ca991(0x135),'error':_0x2c48ec[_0x5ca991(0x113)]},this['_processTreeNodeResult'](_0x8fbb35,_0x1f8c32),_0x8fbb35;}var _0xd57be4=this[_0x5ca991(0x178)](_0x901e2),_0x405b35=this[_0x5ca991(0x16a)](_0xd57be4);if(_0x8fbb35[_0x5ca991(0xff)]=_0xd57be4,_0x405b35)this[_0x5ca991(0xcc)](_0x8fbb35,_0x1f8c32,_0x901e2,function(){var _0x3cb586=_0x5ca991;_0x8fbb35[_0x3cb586(0x118)]=_0x901e2[_0x3cb586(0x1b5)](),!_0x1b9e86&&_0x450190[_0x3cb586(0x13f)](_0xd57be4,_0x8fbb35,_0x1f8c32,{});});else{var _0x2c66f2=_0x1f8c32[_0x5ca991(0xde)]&&_0x1f8c32['level']<_0x1f8c32[_0x5ca991(0x12a)]&&_0x1f8c32[_0x5ca991(0x1b3)][_0x5ca991(0x10b)](_0x901e2)<0x0&&_0xd57be4!==_0x5ca991(0x15f)&&_0x1f8c32[_0x5ca991(0x122)]<_0x1f8c32[_0x5ca991(0x128)];_0x2c66f2||_0x1f8c32[_0x5ca991(0x179)]<_0x3442cc||_0x1b9e86?(this[_0x5ca991(0x1ac)](_0x8fbb35,_0x901e2,_0x1f8c32,_0x1b9e86||{}),this[_0x5ca991(0x1b8)](_0x901e2,_0x8fbb35)):this[_0x5ca991(0xcc)](_0x8fbb35,_0x1f8c32,_0x901e2,function(){var _0x5a8167=_0x5ca991;_0xd57be4===_0x5a8167(0x15d)||_0xd57be4==='undefined'||(delete _0x8fbb35[_0x5a8167(0x118)],_0x8fbb35[_0x5a8167(0x140)]=!0x0);});}return _0x8fbb35;}finally{_0x1f8c32[_0x5ca991(0x158)]=_0x1e1bb8,_0x1f8c32[_0x5ca991(0x153)]=_0x3442cc,_0x1f8c32[_0x5ca991(0x148)]=_0x50ca90;}}[_0x2ae0f7(0x13f)](_0x3a39a1,_0x39458d,_0x2ee68d,_0x1ede52){var _0x327e63=_0x2ae0f7,_0x3ce583=_0x1ede52[_0x327e63(0x191)]||_0x2ee68d[_0x327e63(0x191)];if((_0x3a39a1===_0x327e63(0xdb)||_0x3a39a1==='String')&&_0x39458d['value']){let _0x31f715=_0x39458d[_0x327e63(0x118)][_0x327e63(0x167)];_0x2ee68d[_0x327e63(0x173)]+=_0x31f715,_0x2ee68d[_0x327e63(0x173)]>_0x2ee68d[_0x327e63(0x168)]?(_0x39458d[_0x327e63(0x140)]='',delete _0x39458d[_0x327e63(0x118)]):_0x31f715>_0x3ce583&&(_0x39458d[_0x327e63(0x140)]=_0x39458d[_0x327e63(0x118)][_0x327e63(0x183)](0x0,_0x3ce583),delete _0x39458d[_0x327e63(0x118)]);}}['_isMap'](_0x5aadf1){var _0x4f2bda=_0x2ae0f7;return!!(_0x5aadf1&&_0x3e0a99[_0x4f2bda(0x176)]&&this[_0x4f2bda(0x1b0)](_0x5aadf1)===_0x4f2bda(0x110)&&_0x5aadf1[_0x4f2bda(0x18e)]);}['_propertyName'](_0x1eb36d){var _0x5eca8e=_0x2ae0f7;if(_0x1eb36d[_0x5eca8e(0x11e)](/^\\d+$/))return _0x1eb36d;var _0x4f5f2d;try{_0x4f5f2d=JSON[_0x5eca8e(0x174)](''+_0x1eb36d);}catch{_0x4f5f2d='\\x22'+this[_0x5eca8e(0x1b0)](_0x1eb36d)+'\\x22';}return _0x4f5f2d[_0x5eca8e(0x11e)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x4f5f2d=_0x4f5f2d[_0x5eca8e(0x183)](0x1,_0x4f5f2d['length']-0x2):_0x4f5f2d=_0x4f5f2d[_0x5eca8e(0x12f)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')[_0x5eca8e(0x12f)](/(^\"|\"$)/g,'\\x27'),_0x4f5f2d;}[_0x2ae0f7(0xcc)](_0xff2cc6,_0x853c86,_0x357eaf,_0x10c85e){var _0x1b05eb=_0x2ae0f7;this['_treeNodePropertiesBeforeFullValue'](_0xff2cc6,_0x853c86),_0x10c85e&&_0x10c85e(),this[_0x1b05eb(0x1b8)](_0x357eaf,_0xff2cc6),this[_0x1b05eb(0xf3)](_0xff2cc6,_0x853c86);}['_treeNodePropertiesBeforeFullValue'](_0x38a6a2,_0x1b904f){var _0x490c99=_0x2ae0f7;this[_0x490c99(0xf8)](_0x38a6a2,_0x1b904f),this[_0x490c99(0x199)](_0x38a6a2,_0x1b904f),this[_0x490c99(0xee)](_0x38a6a2,_0x1b904f),this[_0x490c99(0xfd)](_0x38a6a2,_0x1b904f);}['_setNodeId'](_0x5ece5c,_0xc3fb04){}[_0x2ae0f7(0x199)](_0x25bfff,_0x28ff9f){}[_0x2ae0f7(0x17b)](_0x5c7716,_0xb28a43){}[_0x2ae0f7(0x11a)](_0x410fef){var _0x5d6c26=_0x2ae0f7;return _0x410fef===this[_0x5d6c26(0x11b)];}[_0x2ae0f7(0xf3)](_0x21f10d,_0x4956fc){var _0x30f9a6=_0x2ae0f7;this[_0x30f9a6(0x17b)](_0x21f10d,_0x4956fc),this['_setNodeExpandableState'](_0x21f10d),_0x4956fc[_0x30f9a6(0xd9)]&&this[_0x30f9a6(0x130)](_0x21f10d),this[_0x30f9a6(0x18f)](_0x21f10d,_0x4956fc),this[_0x30f9a6(0x105)](_0x21f10d,_0x4956fc),this[_0x30f9a6(0x164)](_0x21f10d);}[_0x2ae0f7(0x1b8)](_0x7ee09,_0x40dfaf){var _0x558b19=_0x2ae0f7;let _0x48c935;try{_0x3e0a99['console']&&(_0x48c935=_0x3e0a99['console'][_0x558b19(0xef)],_0x3e0a99[_0x558b19(0x10c)][_0x558b19(0xef)]=function(){}),_0x7ee09&&typeof _0x7ee09[_0x558b19(0x167)]==_0x558b19(0x11c)&&(_0x40dfaf[_0x558b19(0x167)]=_0x7ee09[_0x558b19(0x167)]);}catch{}finally{_0x48c935&&(_0x3e0a99['console']['error']=_0x48c935);}if(_0x40dfaf['type']===_0x558b19(0x11c)||_0x40dfaf[_0x558b19(0xff)]===_0x558b19(0x1a3)){if(isNaN(_0x40dfaf[_0x558b19(0x118)]))_0x40dfaf['nan']=!0x0,delete _0x40dfaf['value'];else switch(_0x40dfaf[_0x558b19(0x118)]){case Number[_0x558b19(0x172)]:_0x40dfaf[_0x558b19(0x14c)]=!0x0,delete _0x40dfaf['value'];break;case Number[_0x558b19(0xe6)]:_0x40dfaf[_0x558b19(0xe2)]=!0x0,delete _0x40dfaf[_0x558b19(0x118)];break;case 0x0:this['_isNegativeZero'](_0x40dfaf[_0x558b19(0x118)])&&(_0x40dfaf['negativeZero']=!0x0);break;}}else _0x40dfaf[_0x558b19(0xff)]===_0x558b19(0x15f)&&typeof _0x7ee09[_0x558b19(0x149)]==_0x558b19(0xdb)&&_0x7ee09['name']&&_0x40dfaf[_0x558b19(0x149)]&&_0x7ee09['name']!==_0x40dfaf[_0x558b19(0x149)]&&(_0x40dfaf['funcName']=_0x7ee09[_0x558b19(0x149)]);}[_0x2ae0f7(0x127)](_0x2e584f){var _0x3285ef=_0x2ae0f7;return 0x1/_0x2e584f===Number[_0x3285ef(0xe6)];}[_0x2ae0f7(0x130)](_0x5bc381){var _0x41c501=_0x2ae0f7;!_0x5bc381[_0x41c501(0x165)]||!_0x5bc381['props'][_0x41c501(0x167)]||_0x5bc381[_0x41c501(0xff)]===_0x41c501(0x104)||_0x5bc381[_0x41c501(0xff)]===_0x41c501(0x176)||_0x5bc381['type']===_0x41c501(0xe3)||_0x5bc381[_0x41c501(0x165)][_0x41c501(0x18b)](function(_0x2fdba5,_0x243e14){var _0x372df0=_0x41c501,_0x3ac36e=_0x2fdba5[_0x372df0(0x149)][_0x372df0(0x144)](),_0x5e70ac=_0x243e14[_0x372df0(0x149)][_0x372df0(0x144)]();return _0x3ac36e<_0x5e70ac?-0x1:_0x3ac36e>_0x5e70ac?0x1:0x0;});}[_0x2ae0f7(0x18f)](_0x3662fc,_0x2f4456){var _0x78a313=_0x2ae0f7;if(!(_0x2f4456[_0x78a313(0x184)]||!_0x3662fc[_0x78a313(0x165)]||!_0x3662fc[_0x78a313(0x165)][_0x78a313(0x167)])){for(var _0x236dd2=[],_0x49717e=[],_0x5b293e=0x0,_0xab9236=_0x3662fc[_0x78a313(0x165)][_0x78a313(0x167)];_0x5b293e<_0xab9236;_0x5b293e++){var _0x3ee38b=_0x3662fc['props'][_0x5b293e];_0x3ee38b[_0x78a313(0xff)]===_0x78a313(0x15f)?_0x236dd2[_0x78a313(0x1ba)](_0x3ee38b):_0x49717e['push'](_0x3ee38b);}if(!(!_0x49717e['length']||_0x236dd2[_0x78a313(0x167)]<=0x1)){_0x3662fc[_0x78a313(0x165)]=_0x49717e;var _0x59f594={'functionsNode':!0x0,'props':_0x236dd2};this['_setNodeId'](_0x59f594,_0x2f4456),this[_0x78a313(0x17b)](_0x59f594,_0x2f4456),this[_0x78a313(0x159)](_0x59f594),this[_0x78a313(0xfd)](_0x59f594,_0x2f4456),_0x59f594['id']+='\\x20f',_0x3662fc['props'][_0x78a313(0x11d)](_0x59f594);}}}[_0x2ae0f7(0x105)](_0x4434c1,_0x465f40){}[_0x2ae0f7(0x159)](_0x29b6da){}[_0x2ae0f7(0x117)](_0x2637de){var _0x198c5d=_0x2ae0f7;return Array['isArray'](_0x2637de)||typeof _0x2637de==_0x198c5d(0x11f)&&this['_objectToString'](_0x2637de)===_0x198c5d(0x1aa);}[_0x2ae0f7(0xfd)](_0x5a0473,_0x59a7cc){}['_cleanNode'](_0x5ea263){var _0xdd0ae5=_0x2ae0f7;delete _0x5ea263[_0xdd0ae5(0x120)],delete _0x5ea263['_hasSetOnItsPath'],delete _0x5ea263[_0xdd0ae5(0x151)];}[_0x2ae0f7(0xee)](_0x598858,_0x3caac1){}}let _0x611b8e=new _0x493c05(),_0x48e9ea={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x28df38={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x357de1(_0x2dfd68,_0x244908,_0x212b7d,_0x348d4d,_0x37fc39,_0xf37c4f){var _0xc76bbd=_0x2ae0f7;let _0x232745,_0x2e006a;try{_0x2e006a=_0x399dfb(),_0x232745=_0x5e09b5[_0x244908],!_0x232745||_0x2e006a-_0x232745['ts']>0x1f4&&_0x232745[_0xc76bbd(0x17e)]&&_0x232745[_0xc76bbd(0x1b4)]/_0x232745['count']<0x64?(_0x5e09b5[_0x244908]=_0x232745={'count':0x0,'time':0x0,'ts':_0x2e006a},_0x5e09b5[_0xc76bbd(0x116)]={}):_0x2e006a-_0x5e09b5[_0xc76bbd(0x116)]['ts']>0x32&&_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x17e)]&&_0x5e09b5[_0xc76bbd(0x116)]['time']/_0x5e09b5['hits'][_0xc76bbd(0x17e)]<0x64&&(_0x5e09b5[_0xc76bbd(0x116)]={});let _0x103c37=[],_0x19a920=_0x232745[_0xc76bbd(0x1b6)]||_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x1b6)]?_0x28df38:_0x48e9ea,_0x266396=_0x478299=>{var _0x338e13=_0xc76bbd;let _0x3fc31a={};return _0x3fc31a[_0x338e13(0x165)]=_0x478299[_0x338e13(0x165)],_0x3fc31a[_0x338e13(0x1b7)]=_0x478299[_0x338e13(0x1b7)],_0x3fc31a[_0x338e13(0x191)]=_0x478299[_0x338e13(0x191)],_0x3fc31a[_0x338e13(0x168)]=_0x478299[_0x338e13(0x168)],_0x3fc31a[_0x338e13(0x128)]=_0x478299['autoExpandLimit'],_0x3fc31a[_0x338e13(0x12a)]=_0x478299[_0x338e13(0x12a)],_0x3fc31a['sortProps']=!0x1,_0x3fc31a[_0x338e13(0x184)]=!_0x5b4f2b,_0x3fc31a[_0x338e13(0x153)]=0x1,_0x3fc31a['level']=0x0,_0x3fc31a['expId']=_0x338e13(0x197),_0x3fc31a[_0x338e13(0x195)]=_0x338e13(0x171),_0x3fc31a[_0x338e13(0xde)]=!0x0,_0x3fc31a[_0x338e13(0x1b3)]=[],_0x3fc31a[_0x338e13(0x122)]=0x0,_0x3fc31a[_0x338e13(0x196)]=!0x0,_0x3fc31a[_0x338e13(0x173)]=0x0,_0x3fc31a['node']={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x3fc31a;};for(var _0x49e990=0x0;_0x49e990<_0x37fc39[_0xc76bbd(0x167)];_0x49e990++)_0x103c37[_0xc76bbd(0x1ba)](_0x611b8e['serialize']({'timeNode':_0x2dfd68==='time'||void 0x0},_0x37fc39[_0x49e990],_0x266396(_0x19a920),{}));if(_0x2dfd68==='trace'){let _0x5c882e=Error[_0xc76bbd(0xd7)];try{Error[_0xc76bbd(0xd7)]=0x1/0x0,_0x103c37[_0xc76bbd(0x1ba)](_0x611b8e[_0xc76bbd(0x1ac)]({'stackNode':!0x0},new Error()[_0xc76bbd(0x1a2)],_0x266396(_0x19a920),{'strLength':0x1/0x0}));}finally{Error[_0xc76bbd(0xd7)]=_0x5c882e;}}return{'method':_0xc76bbd(0xf9),'version':_0x495f21,'args':[{'ts':_0x212b7d,'session':_0x348d4d,'args':_0x103c37,'id':_0x244908,'context':_0xf37c4f}]};}catch(_0xbd00f9){return{'method':_0xc76bbd(0xf9),'version':_0x495f21,'args':[{'ts':_0x212b7d,'session':_0x348d4d,'args':[{'type':_0xc76bbd(0x135),'error':_0xbd00f9&&_0xbd00f9[_0xc76bbd(0x113)]}],'id':_0x244908,'context':_0xf37c4f}]};}finally{try{if(_0x232745&&_0x2e006a){let _0xd289e6=_0x399dfb();_0x232745[_0xc76bbd(0x17e)]++,_0x232745[_0xc76bbd(0x1b4)]+=_0x23ae99(_0x2e006a,_0xd289e6),_0x232745['ts']=_0xd289e6,_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x17e)]++,_0x5e09b5[_0xc76bbd(0x116)]['time']+=_0x23ae99(_0x2e006a,_0xd289e6),_0x5e09b5['hits']['ts']=_0xd289e6,(_0x232745[_0xc76bbd(0x17e)]>0x32||_0x232745[_0xc76bbd(0x1b4)]>0x64)&&(_0x232745[_0xc76bbd(0x1b6)]=!0x0),(_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x17e)]>0x3e8||_0x5e09b5[_0xc76bbd(0x116)][_0xc76bbd(0x1b4)]>0x12c)&&(_0x5e09b5['hits']['reduceLimits']=!0x0);}}catch{}}}return _0x357de1;}((_0xe39406,_0x12f4af,_0x453c88,_0x41365b,_0xc3559e,_0xdce0af,_0x33c738,_0x26605a,_0x543a92,_0x5f076a,_0x5844c8)=>{var _0x3348a8=_0x22af76;if(_0xe39406[_0x3348a8(0x16b)])return _0xe39406['_console_ninja'];if(!X(_0xe39406,_0x26605a,_0xc3559e))return _0xe39406[_0x3348a8(0x16b)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0xe39406[_0x3348a8(0x16b)];let _0x3599bc=b(_0xe39406),_0x7e6c5c=_0x3599bc['elapsed'],_0x369f46=_0x3599bc['timeStamp'],_0x165423=_0x3599bc['now'],_0x1e8be2={'hits':{},'ts':{}},_0x5d1787=H(_0xe39406,_0x543a92,_0x1e8be2,_0xdce0af),_0x1f0dca=_0x5411c4=>{_0x1e8be2['ts'][_0x5411c4]=_0x369f46();},_0x137155=(_0x29df21,_0x92cd06)=>{let _0x211b5e=_0x1e8be2['ts'][_0x92cd06];if(delete _0x1e8be2['ts'][_0x92cd06],_0x211b5e){let _0x25b30=_0x7e6c5c(_0x211b5e,_0x369f46());_0x230ae2(_0x5d1787('time',_0x29df21,_0x165423(),_0x2638dc,[_0x25b30],_0x92cd06));}},_0x26da5f=_0x21b4f5=>{var _0x4fe62f=_0x3348a8,_0x574fa5;return _0xc3559e===_0x4fe62f(0x187)&&_0xe39406[_0x4fe62f(0x14d)]&&((_0x574fa5=_0x21b4f5==null?void 0x0:_0x21b4f5[_0x4fe62f(0xf0)])==null?void 0x0:_0x574fa5[_0x4fe62f(0x167)])&&(_0x21b4f5[_0x4fe62f(0xf0)][0x0]['origin']=_0xe39406[_0x4fe62f(0x14d)]),_0x21b4f5;};_0xe39406[_0x3348a8(0x16b)]={'consoleLog':(_0x581e6b,_0x5c928c)=>{var _0x341716=_0x3348a8;_0xe39406[_0x341716(0x10c)][_0x341716(0xf9)]['name']!=='disabledLog'&&_0x230ae2(_0x5d1787('log',_0x581e6b,_0x165423(),_0x2638dc,_0x5c928c));},'consoleTrace':(_0x4aca16,_0xfebfc6)=>{var _0x1a169f=_0x3348a8;_0xe39406[_0x1a169f(0x10c)][_0x1a169f(0xf9)][_0x1a169f(0x149)]!=='disabledTrace'&&_0x230ae2(_0x26da5f(_0x5d1787(_0x1a169f(0x132),_0x4aca16,_0x165423(),_0x2638dc,_0xfebfc6)));},'consoleTime':_0x10b89d=>{_0x1f0dca(_0x10b89d);},'consoleTimeEnd':(_0xc2cdf8,_0x448e82)=>{_0x137155(_0x448e82,_0xc2cdf8);},'autoLog':(_0x58dacd,_0x3cb101)=>{var _0x4266a6=_0x3348a8;_0x230ae2(_0x5d1787(_0x4266a6(0xf9),_0x3cb101,_0x165423(),_0x2638dc,[_0x58dacd]));},'autoLogMany':(_0xea83fe,_0x1fdecb)=>{_0x230ae2(_0x5d1787('log',_0xea83fe,_0x165423(),_0x2638dc,_0x1fdecb));},'autoTrace':(_0x130829,_0x1b5197)=>{var _0x52cc80=_0x3348a8;_0x230ae2(_0x26da5f(_0x5d1787(_0x52cc80(0x132),_0x1b5197,_0x165423(),_0x2638dc,[_0x130829])));},'autoTraceMany':(_0x5a09f5,_0x18939b)=>{var _0x3f44ce=_0x3348a8;_0x230ae2(_0x26da5f(_0x5d1787(_0x3f44ce(0x132),_0x5a09f5,_0x165423(),_0x2638dc,_0x18939b)));},'autoTime':(_0xcf495c,_0x1cce05,_0x396811)=>{_0x1f0dca(_0x396811);},'autoTimeEnd':(_0x5738d5,_0x5b3b6d,_0x3d8db4)=>{_0x137155(_0x5b3b6d,_0x3d8db4);},'coverage':_0x41793b=>{var _0x1fb997=_0x3348a8;_0x230ae2({'method':_0x1fb997(0x16e),'version':_0xdce0af,'args':[{'id':_0x41793b}]});}};let _0x230ae2=q(_0xe39406,_0x12f4af,_0x453c88,_0x41365b,_0xc3559e,_0x5f076a,_0x5844c8),_0x2638dc=_0xe39406[_0x3348a8(0x112)];return _0xe39406['_console_ninja'];})(globalThis,'127.0.0.1',_0x22af76(0x1a8),_0x22af76(0xe4),_0x22af76(0x19e),_0x22af76(0x17c),_0x22af76(0x1a5),_0x22af76(0x13a),_0x22af76(0x189),'','1');");
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

/***/ "./resources/js/react/TimeLogTable/pages/TaskWiseTable.jsx":
/*!*****************************************************************!*\
  !*** ./resources/js/react/TimeLogTable/pages/TaskWiseTable.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _global_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../global/Loader */ "./resources/js/react/global/Loader.jsx");
/* harmony import */ var _services_api_timeLogTableApiSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api/timeLogTableApiSlice */ "./resources/js/react/services/api/timeLogTableApiSlice.js");
/* harmony import */ var _utils_converTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/converTime */ "./resources/js/react/utils/converTime.js");
/* harmony import */ var _utils_paginate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/paginate */ "./resources/js/react/utils/paginate.js");
/* harmony import */ var _components_RefreshButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/RefreshButton */ "./resources/js/react/TimeLogTable/components/RefreshButton.jsx");
/* harmony import */ var _components_Tabbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Tabbar */ "./resources/js/react/TimeLogTable/components/Tabbar.jsx");
/* harmony import */ var _components_TaskWiseLogTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/TaskWiseLogTable */ "./resources/js/react/TimeLogTable/components/TaskWiseLogTable.jsx");
/* harmony import */ var _components_TaskWiseLogTableColumn__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/TaskWiseLogTableColumn */ "./resources/js/react/TimeLogTable/components/TaskWiseLogTableColumn.jsx");
/* harmony import */ var _components_TimeLogTableFilterBar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/TimeLogTableFilterBar */ "./resources/js/react/TimeLogTable/components/TimeLogTableFilterBar.jsx");
/* harmony import */ var _components_ExportToExcel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/ExportToExcel */ "./resources/js/react/TimeLogTable/components/ExportToExcel.jsx");
/* harmony import */ var _export_excel_ExportTaskWiseTableDataToExcel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../export/excel/ExportTaskWiseTableDataToExcel */ "./resources/js/react/TimeLogTable/export/excel/ExportTaskWiseTableDataToExcel.jsx");
/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../hooks/useAuth */ "./resources/js/react/hooks/useAuth.jsx");
/* harmony import */ var _global_Switch__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../global/Switch */ "./resources/js/react/global/Switch.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
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

















var TaskWiseLogReport = function TaskWiseLogReport() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    data = _useState2[0],
    setData = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(10),
    _useState4 = _slicedToArray(_useState3, 2),
    perPageData = _useState4[0],
    setParPageData = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1),
    _useState6 = _slicedToArray(_useState5, 2),
    currentPage = _useState6[0],
    setCurrentPage = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    renderData = _useState8[0],
    setRenderData = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState10 = _slicedToArray(_useState9, 2),
    sortConfig = _useState10[0],
    setSortConfig = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState12 = _slicedToArray(_useState11, 2),
    trackedTime = _useState12[0],
    setTrackedTime = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    filter = _useState14[0],
    setFilter = _useState14[1];
  var _useGetTaskWiseDataMu = (0,_services_api_timeLogTableApiSlice__WEBPACK_IMPORTED_MODULE_3__.useGetTaskWiseDataMutation)(),
    _useGetTaskWiseDataMu2 = _slicedToArray(_useGetTaskWiseDataMu, 2),
    getTaskWiseData = _useGetTaskWiseDataMu2[0],
    isLoading = _useGetTaskWiseDataMu2[1].isLoading;

  // current user
  var auth = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_13__.useAuth)();

  // handle data
  var handleData = function handleData(data, currentPage, perPageData) {
    var paginated = (0,_utils_paginate__WEBPACK_IMPORTED_MODULE_5__.paginate)(data, currentPage, perPageData);
    var grouped = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.groupBy)(paginated, 'task_id');
    var sorted = Object.entries(grouped).sort(function (_ref, _ref2) {
      var _ref3 = _slicedToArray(_ref, 1),
        keyA = _ref3[0];
      var _ref4 = _slicedToArray(_ref2, 1),
        keyB = _ref4[0];
      return keyB - keyA;
    });
    setRenderData(_toConsumableArray(sorted));
  };

  // handle fetch data
  var handleFetchData = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(filter) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            setFilter(filter);
            _context.next = 3;
            return getTaskWiseData(filter).unwrap().then(function (res) {
              setCurrentPage(1);
              var sortedData = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.orderBy)(res === null || res === void 0 ? void 0 : res.data, ["task_id"], ["desc"]);
              handleData(sortedData, 1, perPageData);
              setData(sortedData);
              var totalTrackTime = _.sumBy(sortedData, function (d) {
                return Number(d.total_minutes);
              });
              setTrackedTime(totalTrackTime);
            });
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleFetchData(_x) {
      return _ref5.apply(this, arguments);
    };
  }();

  // data sort handle
  var handleSorting = function handleSorting(sort) {
    var sortData = lodash__WEBPACK_IMPORTED_MODULE_0__.orderBy.apply(void 0, [data].concat(_toConsumableArray(sort)));
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
    className: "sp1_tlr_container",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_components_TimeLogTableFilterBar__WEBPACK_IMPORTED_MODULE_10__["default"], {
      onFilter: handleFetchData
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
      className: "sp1_tlr_tbl_container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "d-flex align-items-center justify-content-between mb-2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_components_Tabbar__WEBPACK_IMPORTED_MODULE_7__["default"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          className: "d-flex align-items-center",
          style: {
            gap: '10px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_components_RefreshButton__WEBPACK_IMPORTED_MODULE_6__.RefreshButton, {
            onClick: handleRefresh,
            isLoading: isLoading,
            children: isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_global_Loader__WEBPACK_IMPORTED_MODULE_2__["default"], {
              title: "Refreshing...",
              borderRightColor: "white"
            }) : 'Refresh'
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_14__["default"], {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_global_Switch__WEBPACK_IMPORTED_MODULE_14__["default"].Case, {
              condition: auth.getRoleId() === 1,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_export_excel_ExportTaskWiseTableDataToExcel__WEBPACK_IMPORTED_MODULE_12__["default"], {
                data: data,
                filter: filter,
                button: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)(_components_ExportToExcel__WEBPACK_IMPORTED_MODULE_11__.ExportToExcel, {
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("i", {
                    className: "fa-solid fa-download"
                  }), "Export to Excel"]
                }),
                filename: "task_wise_table_".concat(filter === null || filter === void 0 ? void 0 : filter.start_date, "_to_").concat(filter === null || filter === void 0 ? void 0 : filter.end_date)
              })
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
        className: " w-100 d-flex flex-wrap justify-center align-items-center",
        style: {
          gap: '10px'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("span", {
          className: "mx-auto",
          children: ["Total Tracked Time: ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("strong", {
            children: (0,_utils_converTime__WEBPACK_IMPORTED_MODULE_4__.convertTime)(trackedTime)
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_components_TaskWiseLogTable__WEBPACK_IMPORTED_MODULE_8__["default"], {
        data: renderData,
        columns: _components_TaskWiseLogTableColumn__WEBPACK_IMPORTED_MODULE_9__.TaskWiseTableColumn,
        tableName: "task_timelog_report",
        onSort: handleSorting,
        height: "calc(100vh - 370px)",
        onPaginate: handlePagination,
        perpageData: perPageData,
        handlePerPageData: handlePerPageData,
        currentPage: currentPage,
        totalEntry: data.length,
        isLoading: isLoading
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskWiseLogReport);

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
//# sourceMappingURL=resources_js_react_TimeLogTable_pages_TaskWiseTable_jsx.js.map