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
    return (0, eval)("globalThis._console_ninja") || (0, eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x578e2a=_0x1eb0;(function(_0x25c92b,_0x45d188){var _0x479d96=_0x1eb0,_0x18e352=_0x25c92b();while(!![]){try{var _0x13f159=-parseInt(_0x479d96(0x23f))/0x1*(parseInt(_0x479d96(0x211))/0x2)+parseInt(_0x479d96(0x228))/0x3*(-parseInt(_0x479d96(0x1fd))/0x4)+parseInt(_0x479d96(0x29a))/0x5+parseInt(_0x479d96(0x22e))/0x6+parseInt(_0x479d96(0x297))/0x7*(parseInt(_0x479d96(0x29c))/0x8)+parseInt(_0x479d96(0x2a2))/0x9*(parseInt(_0x479d96(0x261))/0xa)+-parseInt(_0x479d96(0x1eb))/0xb*(parseInt(_0x479d96(0x1e1))/0xc);if(_0x13f159===_0x45d188)break;else _0x18e352['push'](_0x18e352['shift']());}catch(_0x90fea1){_0x18e352['push'](_0x18e352['shift']());}}}(_0x345f,0x38703));var K=Object['create'],Q=Object['defineProperty'],G=Object[_0x578e2a(0x1e8)],ee=Object['getOwnPropertyNames'],te=Object[_0x578e2a(0x1e2)],ne=Object[_0x578e2a(0x1c4)][_0x578e2a(0x293)],re=(_0x43b901,_0x43bc06,_0x1f2d7c,_0x2fb9f6)=>{var _0x1b547a=_0x578e2a;if(_0x43bc06&&typeof _0x43bc06==_0x1b547a(0x2b0)||typeof _0x43bc06==_0x1b547a(0x213)){for(let _0x5bcbcc of ee(_0x43bc06))!ne['call'](_0x43b901,_0x5bcbcc)&&_0x5bcbcc!==_0x1f2d7c&&Q(_0x43b901,_0x5bcbcc,{'get':()=>_0x43bc06[_0x5bcbcc],'enumerable':!(_0x2fb9f6=G(_0x43bc06,_0x5bcbcc))||_0x2fb9f6[_0x1b547a(0x218)]});}return _0x43b901;},V=(_0x462cb1,_0x2b564b,_0x1e70ed)=>(_0x1e70ed=_0x462cb1!=null?K(te(_0x462cb1)):{},re(_0x2b564b||!_0x462cb1||!_0x462cb1[_0x578e2a(0x1e4)]?Q(_0x1e70ed,'default',{'value':_0x462cb1,'enumerable':!0x0}):_0x1e70ed,_0x462cb1)),x=class{constructor(_0x54dcdf,_0x5036dd,_0x2b1848,_0x20ca5f,_0x252e30,_0x44b74e){var _0x36116d=_0x578e2a,_0xbc7777,_0x2d79d6,_0x5ccafa,_0x26b452;this[_0x36116d(0x274)]=_0x54dcdf,this[_0x36116d(0x24b)]=_0x5036dd,this[_0x36116d(0x1fc)]=_0x2b1848,this[_0x36116d(0x2aa)]=_0x20ca5f,this[_0x36116d(0x20d)]=_0x252e30,this[_0x36116d(0x29e)]=_0x44b74e,this[_0x36116d(0x24a)]=!0x0,this[_0x36116d(0x1dd)]=!0x0,this[_0x36116d(0x23d)]=!0x1,this['_connecting']=!0x1,this[_0x36116d(0x220)]=((_0x2d79d6=(_0xbc7777=_0x54dcdf[_0x36116d(0x21c)])==null?void 0x0:_0xbc7777['env'])==null?void 0x0:_0x2d79d6['NEXT_RUNTIME'])===_0x36116d(0x1e5),this[_0x36116d(0x271)]=!((_0x26b452=(_0x5ccafa=this['global']['process'])==null?void 0x0:_0x5ccafa['versions'])!=null&&_0x26b452[_0x36116d(0x24d)])&&!this[_0x36116d(0x220)],this[_0x36116d(0x206)]=null,this[_0x36116d(0x255)]=0x0,this[_0x36116d(0x1d3)]=0x14,this[_0x36116d(0x236)]='https://tinyurl.com/37x8b79t',this['_sendErrorMessage']=(this[_0x36116d(0x271)]?_0x36116d(0x207):_0x36116d(0x20e))+this[_0x36116d(0x236)];}async[_0x578e2a(0x291)](){var _0x1e840a=_0x578e2a,_0x333dc9,_0x45198d;if(this[_0x1e840a(0x206)])return this[_0x1e840a(0x206)];let _0xcc23f;if(this[_0x1e840a(0x271)]||this[_0x1e840a(0x220)])_0xcc23f=this['global']['WebSocket'];else{if((_0x333dc9=this[_0x1e840a(0x274)]['process'])!=null&&_0x333dc9['_WebSocket'])_0xcc23f=(_0x45198d=this['global'][_0x1e840a(0x21c)])==null?void 0x0:_0x45198d[_0x1e840a(0x210)];else try{let _0x38717b=await import(_0x1e840a(0x289));_0xcc23f=(await import((await import('url'))['pathToFileURL'](_0x38717b[_0x1e840a(0x204)](this[_0x1e840a(0x2aa)],_0x1e840a(0x1f2)))[_0x1e840a(0x224)]()))[_0x1e840a(0x200)];}catch{try{_0xcc23f=require(require(_0x1e840a(0x289))[_0x1e840a(0x204)](this['nodeModules'],'ws'));}catch{throw new Error(_0x1e840a(0x24e));}}}return this[_0x1e840a(0x206)]=_0xcc23f,_0xcc23f;}[_0x578e2a(0x20a)](){var _0xb12eab=_0x578e2a;this[_0xb12eab(0x2ae)]||this['_connected']||this[_0xb12eab(0x255)]>=this[_0xb12eab(0x1d3)]||(this['_allowedToConnectOnSend']=!0x1,this[_0xb12eab(0x2ae)]=!0x0,this['_connectAttemptCount']++,this['_ws']=new Promise((_0x2bc56a,_0x47d47f)=>{var _0xaba3e1=_0xb12eab;this[_0xaba3e1(0x291)]()[_0xaba3e1(0x202)](_0x145d9a=>{var _0x27af0b=_0xaba3e1;let _0x32a333=new _0x145d9a(_0x27af0b(0x288)+(!this['_inBrowser']&&this[_0x27af0b(0x20d)]?_0x27af0b(0x1fe):this[_0x27af0b(0x24b)])+':'+this[_0x27af0b(0x1fc)]);_0x32a333[_0x27af0b(0x2ac)]=()=>{var _0x501743=_0x27af0b;this[_0x501743(0x24a)]=!0x1,this[_0x501743(0x298)](_0x32a333),this[_0x501743(0x258)](),_0x47d47f(new Error('logger\\x20websocket\\x20error'));},_0x32a333[_0x27af0b(0x264)]=()=>{var _0x3f5ab4=_0x27af0b;this[_0x3f5ab4(0x271)]||_0x32a333['_socket']&&_0x32a333[_0x3f5ab4(0x1ce)][_0x3f5ab4(0x25e)]&&_0x32a333[_0x3f5ab4(0x1ce)][_0x3f5ab4(0x25e)](),_0x2bc56a(_0x32a333);},_0x32a333[_0x27af0b(0x209)]=()=>{var _0x45f624=_0x27af0b;this[_0x45f624(0x1dd)]=!0x0,this[_0x45f624(0x298)](_0x32a333),this[_0x45f624(0x258)]();},_0x32a333[_0x27af0b(0x1fa)]=_0x176016=>{var _0x6a695e=_0x27af0b;try{if(!(_0x176016!=null&&_0x176016[_0x6a695e(0x235)])||!this[_0x6a695e(0x29e)])return;let _0x1709d9=JSON[_0x6a695e(0x283)](_0x176016[_0x6a695e(0x235)]);this['eventReceivedCallback'](_0x1709d9['method'],_0x1709d9[_0x6a695e(0x265)],this[_0x6a695e(0x274)],this[_0x6a695e(0x271)]);}catch{}};})['then'](_0xbbe96=>(this['_connected']=!0x0,this['_connecting']=!0x1,this['_allowedToConnectOnSend']=!0x1,this[_0xaba3e1(0x24a)]=!0x0,this[_0xaba3e1(0x255)]=0x0,_0xbbe96))['catch'](_0x2b00a7=>(this[_0xaba3e1(0x23d)]=!0x1,this[_0xaba3e1(0x2ae)]=!0x1,console['warn'](_0xaba3e1(0x214)+this[_0xaba3e1(0x236)]),_0x47d47f(new Error(_0xaba3e1(0x281)+(_0x2b00a7&&_0x2b00a7['message'])))));}));}[_0x578e2a(0x298)](_0x56096f){var _0x5ea0dd=_0x578e2a;this['_connected']=!0x1,this['_connecting']=!0x1;try{_0x56096f[_0x5ea0dd(0x209)]=null,_0x56096f[_0x5ea0dd(0x2ac)]=null,_0x56096f[_0x5ea0dd(0x264)]=null;}catch{}try{_0x56096f[_0x5ea0dd(0x245)]<0x2&&_0x56096f['close']();}catch{}}[_0x578e2a(0x258)](){var _0x4c1912=_0x578e2a;clearTimeout(this[_0x4c1912(0x1d9)]),!(this[_0x4c1912(0x255)]>=this[_0x4c1912(0x1d3)])&&(this[_0x4c1912(0x1d9)]=setTimeout(()=>{var _0x29bf5a=_0x4c1912,_0x1a3dd8;this['_connected']||this[_0x29bf5a(0x2ae)]||(this[_0x29bf5a(0x20a)](),(_0x1a3dd8=this[_0x29bf5a(0x27e)])==null||_0x1a3dd8[_0x29bf5a(0x2ad)](()=>this[_0x29bf5a(0x258)]()));},0x1f4),this[_0x4c1912(0x1d9)][_0x4c1912(0x25e)]&&this['_reconnectTimeout'][_0x4c1912(0x25e)]());}async['send'](_0x18d513){var _0x5d94af=_0x578e2a;try{if(!this[_0x5d94af(0x24a)])return;this['_allowedToConnectOnSend']&&this[_0x5d94af(0x20a)](),(await this['_ws'])[_0x5d94af(0x247)](JSON['stringify'](_0x18d513));}catch(_0xbed769){console[_0x5d94af(0x29b)](this[_0x5d94af(0x234)]+':\\x20'+(_0xbed769&&_0xbed769[_0x5d94af(0x1c6)])),this[_0x5d94af(0x24a)]=!0x1,this[_0x5d94af(0x258)]();}}};function q(_0x3065a1,_0x269f51,_0x2dde02,_0x260765,_0x41b844,_0x2789ef,_0x2583ae,_0x5e7bd7=ie){var _0x2553b9=_0x578e2a;let _0x285def=_0x2dde02[_0x2553b9(0x223)](',')['map'](_0x2b28f0=>{var _0x125bd5=_0x2553b9,_0x9f8c86,_0x1e871f,_0x5922d9,_0x47c6e7;try{if(!_0x3065a1[_0x125bd5(0x21a)]){let _0x24b436=((_0x1e871f=(_0x9f8c86=_0x3065a1[_0x125bd5(0x21c)])==null?void 0x0:_0x9f8c86[_0x125bd5(0x287)])==null?void 0x0:_0x1e871f['node'])||((_0x47c6e7=(_0x5922d9=_0x3065a1[_0x125bd5(0x21c)])==null?void 0x0:_0x5922d9[_0x125bd5(0x22a)])==null?void 0x0:_0x47c6e7[_0x125bd5(0x2a1)])==='edge';(_0x41b844===_0x125bd5(0x1f7)||_0x41b844==='remix'||_0x41b844===_0x125bd5(0x1fb)||_0x41b844==='angular')&&(_0x41b844+=_0x24b436?_0x125bd5(0x2b3):_0x125bd5(0x2a7)),_0x3065a1['_console_ninja_session']={'id':+new Date(),'tool':_0x41b844},_0x2583ae&&_0x41b844&&!_0x24b436&&console[_0x125bd5(0x26f)](_0x125bd5(0x241)+(_0x41b844[_0x125bd5(0x294)](0x0)[_0x125bd5(0x238)]()+_0x41b844[_0x125bd5(0x233)](0x1))+',',_0x125bd5(0x250),_0x125bd5(0x1ca));}let _0x355bda=new x(_0x3065a1,_0x269f51,_0x2b28f0,_0x260765,_0x2789ef,_0x5e7bd7);return _0x355bda[_0x125bd5(0x247)][_0x125bd5(0x1f1)](_0x355bda);}catch(_0x257eed){return console['warn'](_0x125bd5(0x212),_0x257eed&&_0x257eed[_0x125bd5(0x1c6)]),()=>{};}});return _0x80f31b=>_0x285def[_0x2553b9(0x2af)](_0x42e048=>_0x42e048(_0x80f31b));}function ie(_0x2801d9,_0x14e132,_0x5b5fa8,_0x2dd967){_0x2dd967&&_0x2801d9==='reload'&&_0x5b5fa8['location']['reload']();}function _0x1eb0(_0x1885ed,_0x553f30){var _0x345fd0=_0x345f();return _0x1eb0=function(_0x1eb0e2,_0x12a97e){_0x1eb0e2=_0x1eb0e2-0x1c4;var _0x122aa9=_0x345fd0[_0x1eb0e2];return _0x122aa9;},_0x1eb0(_0x1885ed,_0x553f30);}function b(_0xc6a9a3){var _0x4373fa=_0x578e2a,_0x3d4a81,_0x223bad;let _0x285e16=function(_0x58dee3,_0x1a47e6){return _0x1a47e6-_0x58dee3;},_0x290e05;if(_0xc6a9a3[_0x4373fa(0x273)])_0x290e05=function(){return _0xc6a9a3['performance']['now']();};else{if(_0xc6a9a3[_0x4373fa(0x21c)]&&_0xc6a9a3['process'][_0x4373fa(0x263)]&&((_0x223bad=(_0x3d4a81=_0xc6a9a3[_0x4373fa(0x21c)])==null?void 0x0:_0x3d4a81[_0x4373fa(0x22a)])==null?void 0x0:_0x223bad[_0x4373fa(0x2a1)])!==_0x4373fa(0x1e5))_0x290e05=function(){var _0x30097f=_0x4373fa;return _0xc6a9a3[_0x30097f(0x21c)][_0x30097f(0x263)]();},_0x285e16=function(_0x451b6d,_0x1be724){return 0x3e8*(_0x1be724[0x0]-_0x451b6d[0x0])+(_0x1be724[0x1]-_0x451b6d[0x1])/0xf4240;};else try{let {performance:_0x4c7b19}=require(_0x4373fa(0x1e7));_0x290e05=function(){var _0x32dd35=_0x4373fa;return _0x4c7b19[_0x32dd35(0x27a)]();};}catch{_0x290e05=function(){return+new Date();};}}return{'elapsed':_0x285e16,'timeStamp':_0x290e05,'now':()=>Date['now']()};}function X(_0x9caebe,_0x1879f2,_0xf159fc){var _0x6f66b9=_0x578e2a,_0x157092,_0x4db7ca,_0x5925dd,_0x2d8caa,_0x3acfb9;if(_0x9caebe[_0x6f66b9(0x28b)]!==void 0x0)return _0x9caebe[_0x6f66b9(0x28b)];let _0x4e3f85=((_0x4db7ca=(_0x157092=_0x9caebe[_0x6f66b9(0x21c)])==null?void 0x0:_0x157092[_0x6f66b9(0x287)])==null?void 0x0:_0x4db7ca[_0x6f66b9(0x24d)])||((_0x2d8caa=(_0x5925dd=_0x9caebe['process'])==null?void 0x0:_0x5925dd[_0x6f66b9(0x22a)])==null?void 0x0:_0x2d8caa['NEXT_RUNTIME'])==='edge';return _0x4e3f85&&_0xf159fc===_0x6f66b9(0x1db)?_0x9caebe['_consoleNinjaAllowedToStart']=!0x1:_0x9caebe[_0x6f66b9(0x28b)]=_0x4e3f85||!_0x1879f2||((_0x3acfb9=_0x9caebe[_0x6f66b9(0x24c)])==null?void 0x0:_0x3acfb9[_0x6f66b9(0x237)])&&_0x1879f2[_0x6f66b9(0x290)](_0x9caebe[_0x6f66b9(0x24c)][_0x6f66b9(0x237)]),_0x9caebe[_0x6f66b9(0x28b)];}function H(_0x2d6544,_0x31042d,_0x23472b,_0x52c704){var _0x5bfe86=_0x578e2a;_0x2d6544=_0x2d6544,_0x31042d=_0x31042d,_0x23472b=_0x23472b,_0x52c704=_0x52c704;let _0x498533=b(_0x2d6544),_0x1240bf=_0x498533['elapsed'],_0x1d3aa8=_0x498533[_0x5bfe86(0x2a0)];class _0x365c3f{constructor(){var _0x53f077=_0x5bfe86;this[_0x53f077(0x1d0)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this['_numberRegExp']=/^(0|[1-9][0-9]*)$/,this[_0x53f077(0x282)]=/'([^\\\\']|\\\\')*'/,this[_0x53f077(0x2a9)]=_0x2d6544[_0x53f077(0x262)],this[_0x53f077(0x268)]=_0x2d6544[_0x53f077(0x279)],this['_getOwnPropertyDescriptor']=Object[_0x53f077(0x1e8)],this[_0x53f077(0x260)]=Object[_0x53f077(0x219)],this[_0x53f077(0x22f)]=_0x2d6544[_0x53f077(0x1f6)],this['_regExpToString']=RegExp['prototype'][_0x53f077(0x224)],this[_0x53f077(0x240)]=Date[_0x53f077(0x1c4)][_0x53f077(0x224)];}['serialize'](_0x7340a,_0x2e8be4,_0x327052,_0x46a6ff){var _0x448458=_0x5bfe86,_0x160b0a=this,_0x2634a2=_0x327052[_0x448458(0x25b)];function _0x499464(_0x113c78,_0x5451c1,_0x5778b3){var _0x48a84f=_0x448458;_0x5451c1['type']=_0x48a84f(0x22b),_0x5451c1[_0x48a84f(0x286)]=_0x113c78[_0x48a84f(0x1c6)],_0x31e1e8=_0x5778b3['node'][_0x48a84f(0x296)],_0x5778b3[_0x48a84f(0x24d)][_0x48a84f(0x296)]=_0x5451c1,_0x160b0a['_treeNodePropertiesBeforeFullValue'](_0x5451c1,_0x5778b3);}try{_0x327052['level']++,_0x327052['autoExpand']&&_0x327052['autoExpandPreviousObjects'][_0x448458(0x1cc)](_0x2e8be4);var _0x40b033,_0x329ffb,_0x3aab41,_0x34da2c,_0x2aa7b0=[],_0x94df9f=[],_0x1b0221,_0xcb43dc=this[_0x448458(0x292)](_0x2e8be4),_0x5bad83=_0xcb43dc==='array',_0x166be6=!0x1,_0x103ee3=_0xcb43dc===_0x448458(0x213),_0xa19b66=this[_0x448458(0x239)](_0xcb43dc),_0x13615e=this[_0x448458(0x1d4)](_0xcb43dc),_0x3ad163=_0xa19b66||_0x13615e,_0x2ac12d={},_0x221533=0x0,_0x5366a2=!0x1,_0x31e1e8,_0x23feec=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x327052[_0x448458(0x295)]){if(_0x5bad83){if(_0x329ffb=_0x2e8be4[_0x448458(0x229)],_0x329ffb>_0x327052[_0x448458(0x2a3)]){for(_0x3aab41=0x0,_0x34da2c=_0x327052[_0x448458(0x2a3)],_0x40b033=_0x3aab41;_0x40b033<_0x34da2c;_0x40b033++)_0x94df9f[_0x448458(0x1cc)](_0x160b0a['_addProperty'](_0x2aa7b0,_0x2e8be4,_0xcb43dc,_0x40b033,_0x327052));_0x7340a[_0x448458(0x276)]=!0x0;}else{for(_0x3aab41=0x0,_0x34da2c=_0x329ffb,_0x40b033=_0x3aab41;_0x40b033<_0x34da2c;_0x40b033++)_0x94df9f[_0x448458(0x1cc)](_0x160b0a[_0x448458(0x243)](_0x2aa7b0,_0x2e8be4,_0xcb43dc,_0x40b033,_0x327052));}_0x327052['autoExpandPropertyCount']+=_0x94df9f[_0x448458(0x229)];}if(!(_0xcb43dc===_0x448458(0x284)||_0xcb43dc===_0x448458(0x262))&&!_0xa19b66&&_0xcb43dc!=='String'&&_0xcb43dc!==_0x448458(0x26c)&&_0xcb43dc!==_0x448458(0x1e3)){var _0x40db64=_0x46a6ff[_0x448458(0x1d1)]||_0x327052[_0x448458(0x1d1)];if(this[_0x448458(0x28f)](_0x2e8be4)?(_0x40b033=0x0,_0x2e8be4[_0x448458(0x2af)](function(_0x303a5b){var _0xc13ec4=_0x448458;if(_0x221533++,_0x327052[_0xc13ec4(0x23b)]++,_0x221533>_0x40db64){_0x5366a2=!0x0;return;}if(!_0x327052['isExpressionToEvaluate']&&_0x327052['autoExpand']&&_0x327052[_0xc13ec4(0x23b)]>_0x327052[_0xc13ec4(0x221)]){_0x5366a2=!0x0;return;}_0x94df9f[_0xc13ec4(0x1cc)](_0x160b0a[_0xc13ec4(0x243)](_0x2aa7b0,_0x2e8be4,_0xc13ec4(0x1d5),_0x40b033++,_0x327052,function(_0x141fa8){return function(){return _0x141fa8;};}(_0x303a5b)));})):this[_0x448458(0x215)](_0x2e8be4)&&_0x2e8be4[_0x448458(0x2af)](function(_0x3bc90c,_0x1f2dc2){var _0x1b3bdd=_0x448458;if(_0x221533++,_0x327052['autoExpandPropertyCount']++,_0x221533>_0x40db64){_0x5366a2=!0x0;return;}if(!_0x327052[_0x1b3bdd(0x1c5)]&&_0x327052[_0x1b3bdd(0x25b)]&&_0x327052[_0x1b3bdd(0x23b)]>_0x327052['autoExpandLimit']){_0x5366a2=!0x0;return;}var _0x4e8a3a=_0x1f2dc2['toString']();_0x4e8a3a[_0x1b3bdd(0x229)]>0x64&&(_0x4e8a3a=_0x4e8a3a[_0x1b3bdd(0x226)](0x0,0x64)+_0x1b3bdd(0x1f5)),_0x94df9f['push'](_0x160b0a[_0x1b3bdd(0x243)](_0x2aa7b0,_0x2e8be4,_0x1b3bdd(0x1e0),_0x4e8a3a,_0x327052,function(_0x3ba18d){return function(){return _0x3ba18d;};}(_0x3bc90c)));}),!_0x166be6){try{for(_0x1b0221 in _0x2e8be4)if(!(_0x5bad83&&_0x23feec[_0x448458(0x1f4)](_0x1b0221))&&!this['_blacklistedProperty'](_0x2e8be4,_0x1b0221,_0x327052)){if(_0x221533++,_0x327052[_0x448458(0x23b)]++,_0x221533>_0x40db64){_0x5366a2=!0x0;break;}if(!_0x327052[_0x448458(0x1c5)]&&_0x327052[_0x448458(0x25b)]&&_0x327052[_0x448458(0x23b)]>_0x327052['autoExpandLimit']){_0x5366a2=!0x0;break;}_0x94df9f[_0x448458(0x1cc)](_0x160b0a[_0x448458(0x20c)](_0x2aa7b0,_0x2ac12d,_0x2e8be4,_0xcb43dc,_0x1b0221,_0x327052));}}catch{}if(_0x2ac12d[_0x448458(0x21f)]=!0x0,_0x103ee3&&(_0x2ac12d[_0x448458(0x23c)]=!0x0),!_0x5366a2){var _0x4e554c=[][_0x448458(0x25a)](this['_getOwnPropertyNames'](_0x2e8be4))[_0x448458(0x25a)](this['_getOwnPropertySymbols'](_0x2e8be4));for(_0x40b033=0x0,_0x329ffb=_0x4e554c[_0x448458(0x229)];_0x40b033<_0x329ffb;_0x40b033++)if(_0x1b0221=_0x4e554c[_0x40b033],!(_0x5bad83&&_0x23feec['test'](_0x1b0221[_0x448458(0x224)]()))&&!this[_0x448458(0x1ef)](_0x2e8be4,_0x1b0221,_0x327052)&&!_0x2ac12d[_0x448458(0x1c8)+_0x1b0221['toString']()]){if(_0x221533++,_0x327052[_0x448458(0x23b)]++,_0x221533>_0x40db64){_0x5366a2=!0x0;break;}if(!_0x327052[_0x448458(0x1c5)]&&_0x327052['autoExpand']&&_0x327052[_0x448458(0x23b)]>_0x327052[_0x448458(0x221)]){_0x5366a2=!0x0;break;}_0x94df9f[_0x448458(0x1cc)](_0x160b0a['_addObjectProperty'](_0x2aa7b0,_0x2ac12d,_0x2e8be4,_0xcb43dc,_0x1b0221,_0x327052));}}}}}if(_0x7340a[_0x448458(0x285)]=_0xcb43dc,_0x3ad163?(_0x7340a[_0x448458(0x1ed)]=_0x2e8be4[_0x448458(0x23a)](),this[_0x448458(0x27f)](_0xcb43dc,_0x7340a,_0x327052,_0x46a6ff)):_0xcb43dc==='date'?_0x7340a['value']=this[_0x448458(0x240)][_0x448458(0x222)](_0x2e8be4):_0xcb43dc===_0x448458(0x1e3)?_0x7340a[_0x448458(0x1ed)]=_0x2e8be4[_0x448458(0x224)]():_0xcb43dc===_0x448458(0x256)?_0x7340a[_0x448458(0x1ed)]=this['_regExpToString']['call'](_0x2e8be4):_0xcb43dc===_0x448458(0x272)&&this[_0x448458(0x22f)]?_0x7340a[_0x448458(0x1ed)]=this[_0x448458(0x22f)]['prototype'][_0x448458(0x224)][_0x448458(0x222)](_0x2e8be4):!_0x327052[_0x448458(0x295)]&&!(_0xcb43dc===_0x448458(0x284)||_0xcb43dc===_0x448458(0x262))&&(delete _0x7340a['value'],_0x7340a[_0x448458(0x201)]=!0x0),_0x5366a2&&(_0x7340a['cappedProps']=!0x0),_0x31e1e8=_0x327052[_0x448458(0x24d)]['current'],_0x327052[_0x448458(0x24d)][_0x448458(0x296)]=_0x7340a,this['_treeNodePropertiesBeforeFullValue'](_0x7340a,_0x327052),_0x94df9f['length']){for(_0x40b033=0x0,_0x329ffb=_0x94df9f[_0x448458(0x229)];_0x40b033<_0x329ffb;_0x40b033++)_0x94df9f[_0x40b033](_0x40b033);}_0x2aa7b0['length']&&(_0x7340a[_0x448458(0x1d1)]=_0x2aa7b0);}catch(_0xd7cd3e){_0x499464(_0xd7cd3e,_0x7340a,_0x327052);}return this[_0x448458(0x26b)](_0x2e8be4,_0x7340a),this[_0x448458(0x1c7)](_0x7340a,_0x327052),_0x327052[_0x448458(0x24d)]['current']=_0x31e1e8,_0x327052[_0x448458(0x251)]--,_0x327052[_0x448458(0x25b)]=_0x2634a2,_0x327052[_0x448458(0x25b)]&&_0x327052[_0x448458(0x25f)][_0x448458(0x24f)](),_0x7340a;}['_getOwnPropertySymbols'](_0x1fae1c){var _0x169a39=_0x5bfe86;return Object[_0x169a39(0x28e)]?Object[_0x169a39(0x28e)](_0x1fae1c):[];}[_0x5bfe86(0x28f)](_0x382139){var _0x252123=_0x5bfe86;return!!(_0x382139&&_0x2d6544['Set']&&this[_0x252123(0x257)](_0x382139)===_0x252123(0x1cd)&&_0x382139[_0x252123(0x2af)]);}['_blacklistedProperty'](_0x50a8ea,_0x375822,_0x9cbb0b){var _0x280600=_0x5bfe86;return _0x9cbb0b[_0x280600(0x1cb)]?typeof _0x50a8ea[_0x375822]==_0x280600(0x213):!0x1;}[_0x5bfe86(0x292)](_0x134de8){var _0x3c325b=_0x5bfe86,_0xbfb60f='';return _0xbfb60f=typeof _0x134de8,_0xbfb60f==='object'?this[_0x3c325b(0x257)](_0x134de8)===_0x3c325b(0x1c9)?_0xbfb60f=_0x3c325b(0x2ab):this[_0x3c325b(0x257)](_0x134de8)==='[object\\x20Date]'?_0xbfb60f='date':this[_0x3c325b(0x257)](_0x134de8)===_0x3c325b(0x20b)?_0xbfb60f='bigint':_0x134de8===null?_0xbfb60f=_0x3c325b(0x284):_0x134de8[_0x3c325b(0x26e)]&&(_0xbfb60f=_0x134de8[_0x3c325b(0x26e)][_0x3c325b(0x278)]||_0xbfb60f):_0xbfb60f===_0x3c325b(0x262)&&this[_0x3c325b(0x268)]&&_0x134de8 instanceof this[_0x3c325b(0x268)]&&(_0xbfb60f=_0x3c325b(0x279)),_0xbfb60f;}['_objectToString'](_0xeb0f5b){var _0x316467=_0x5bfe86;return Object['prototype'][_0x316467(0x224)][_0x316467(0x222)](_0xeb0f5b);}[_0x5bfe86(0x239)](_0x3ffc68){var _0x49546e=_0x5bfe86;return _0x3ffc68===_0x49546e(0x29f)||_0x3ffc68===_0x49546e(0x1f8)||_0x3ffc68===_0x49546e(0x217);}[_0x5bfe86(0x1d4)](_0x1077d8){var _0x295ba1=_0x5bfe86;return _0x1077d8==='Boolean'||_0x1077d8===_0x295ba1(0x203)||_0x1077d8===_0x295ba1(0x26d);}[_0x5bfe86(0x243)](_0x4ac575,_0x125a96,_0x112f41,_0x4b555e,_0x56944c,_0x17836f){var _0x3dbfbc=this;return function(_0xc8ae20){var _0x17f82e=_0x1eb0,_0xa455bb=_0x56944c[_0x17f82e(0x24d)]['current'],_0x2a93e9=_0x56944c[_0x17f82e(0x24d)]['index'],_0x8969f7=_0x56944c[_0x17f82e(0x24d)][_0x17f82e(0x1cf)];_0x56944c['node'][_0x17f82e(0x1cf)]=_0xa455bb,_0x56944c[_0x17f82e(0x24d)][_0x17f82e(0x254)]=typeof _0x4b555e=='number'?_0x4b555e:_0xc8ae20,_0x4ac575[_0x17f82e(0x1cc)](_0x3dbfbc['_property'](_0x125a96,_0x112f41,_0x4b555e,_0x56944c,_0x17836f)),_0x56944c[_0x17f82e(0x24d)]['parent']=_0x8969f7,_0x56944c[_0x17f82e(0x24d)][_0x17f82e(0x254)]=_0x2a93e9;};}[_0x5bfe86(0x20c)](_0x22824c,_0x2c4de7,_0x1a348c,_0x593555,_0x5d7ee4,_0x3491d6,_0xcc32ec){var _0x5d620c=this;return _0x2c4de7['_p_'+_0x5d7ee4['toString']()]=!0x0,function(_0x31d7b6){var _0x1a80dc=_0x1eb0,_0xedb4f2=_0x3491d6[_0x1a80dc(0x24d)][_0x1a80dc(0x296)],_0x8a4f42=_0x3491d6[_0x1a80dc(0x24d)][_0x1a80dc(0x254)],_0x564a0c=_0x3491d6[_0x1a80dc(0x24d)][_0x1a80dc(0x1cf)];_0x3491d6[_0x1a80dc(0x24d)][_0x1a80dc(0x1cf)]=_0xedb4f2,_0x3491d6[_0x1a80dc(0x24d)][_0x1a80dc(0x254)]=_0x31d7b6,_0x22824c[_0x1a80dc(0x1cc)](_0x5d620c['_property'](_0x1a348c,_0x593555,_0x5d7ee4,_0x3491d6,_0xcc32ec)),_0x3491d6[_0x1a80dc(0x24d)]['parent']=_0x564a0c,_0x3491d6['node'][_0x1a80dc(0x254)]=_0x8a4f42;};}['_property'](_0x2780bf,_0x2bedbe,_0x1cfded,_0xf1f4f1,_0x454d6a){var _0x56039a=_0x5bfe86,_0x5c899d=this;_0x454d6a||(_0x454d6a=function(_0x494702,_0x41c159){return _0x494702[_0x41c159];});var _0x146801=_0x1cfded['toString'](),_0x138375=_0xf1f4f1['expressionsToEvaluate']||{},_0x106079=_0xf1f4f1['depth'],_0x36d23f=_0xf1f4f1['isExpressionToEvaluate'];try{var _0x2b5120=this[_0x56039a(0x215)](_0x2780bf),_0x1e959d=_0x146801;_0x2b5120&&_0x1e959d[0x0]==='\\x27'&&(_0x1e959d=_0x1e959d[_0x56039a(0x233)](0x1,_0x1e959d['length']-0x2));var _0x3fbae9=_0xf1f4f1['expressionsToEvaluate']=_0x138375[_0x56039a(0x1c8)+_0x1e959d];_0x3fbae9&&(_0xf1f4f1['depth']=_0xf1f4f1[_0x56039a(0x295)]+0x1),_0xf1f4f1[_0x56039a(0x1c5)]=!!_0x3fbae9;var _0x6a5596=typeof _0x1cfded==_0x56039a(0x272),_0x3dadeb={'name':_0x6a5596||_0x2b5120?_0x146801:this[_0x56039a(0x1ee)](_0x146801)};if(_0x6a5596&&(_0x3dadeb[_0x56039a(0x272)]=!0x0),!(_0x2bedbe===_0x56039a(0x2ab)||_0x2bedbe===_0x56039a(0x248))){var _0x4db49a=this[_0x56039a(0x299)](_0x2780bf,_0x1cfded);if(_0x4db49a&&(_0x4db49a[_0x56039a(0x1d2)]&&(_0x3dadeb['setter']=!0x0),_0x4db49a[_0x56039a(0x2a5)]&&!_0x3fbae9&&!_0xf1f4f1[_0x56039a(0x27b)]))return _0x3dadeb['getter']=!0x0,this[_0x56039a(0x225)](_0x3dadeb,_0xf1f4f1),_0x3dadeb;}var _0x1fa18e;try{_0x1fa18e=_0x454d6a(_0x2780bf,_0x1cfded);}catch(_0x67fc0e){return _0x3dadeb={'name':_0x146801,'type':_0x56039a(0x22b),'error':_0x67fc0e['message']},this[_0x56039a(0x225)](_0x3dadeb,_0xf1f4f1),_0x3dadeb;}var _0x20a543=this['_type'](_0x1fa18e),_0xc5945f=this[_0x56039a(0x239)](_0x20a543);if(_0x3dadeb['type']=_0x20a543,_0xc5945f)this[_0x56039a(0x225)](_0x3dadeb,_0xf1f4f1,_0x1fa18e,function(){var _0x419c66=_0x56039a;_0x3dadeb['value']=_0x1fa18e[_0x419c66(0x23a)](),!_0x3fbae9&&_0x5c899d[_0x419c66(0x27f)](_0x20a543,_0x3dadeb,_0xf1f4f1,{});});else{var _0xfeb1fe=_0xf1f4f1['autoExpand']&&_0xf1f4f1[_0x56039a(0x251)]<_0xf1f4f1[_0x56039a(0x21b)]&&_0xf1f4f1[_0x56039a(0x25f)][_0x56039a(0x1ea)](_0x1fa18e)<0x0&&_0x20a543!==_0x56039a(0x213)&&_0xf1f4f1[_0x56039a(0x23b)]<_0xf1f4f1[_0x56039a(0x221)];_0xfeb1fe||_0xf1f4f1[_0x56039a(0x251)]<_0x106079||_0x3fbae9?(this[_0x56039a(0x28c)](_0x3dadeb,_0x1fa18e,_0xf1f4f1,_0x3fbae9||{}),this[_0x56039a(0x26b)](_0x1fa18e,_0x3dadeb)):this['_processTreeNodeResult'](_0x3dadeb,_0xf1f4f1,_0x1fa18e,function(){var _0x519828=_0x56039a;_0x20a543===_0x519828(0x284)||_0x20a543===_0x519828(0x262)||(delete _0x3dadeb[_0x519828(0x1ed)],_0x3dadeb[_0x519828(0x201)]=!0x0);});}return _0x3dadeb;}finally{_0xf1f4f1[_0x56039a(0x29d)]=_0x138375,_0xf1f4f1['depth']=_0x106079,_0xf1f4f1[_0x56039a(0x1c5)]=_0x36d23f;}}[_0x5bfe86(0x27f)](_0x38d38c,_0x110038,_0x593d2d,_0x8fc325){var _0x5d50bc=_0x5bfe86,_0x348ec5=_0x8fc325[_0x5d50bc(0x26a)]||_0x593d2d[_0x5d50bc(0x26a)];if((_0x38d38c==='string'||_0x38d38c===_0x5d50bc(0x203))&&_0x110038[_0x5d50bc(0x1ed)]){let _0x36b631=_0x110038[_0x5d50bc(0x1ed)][_0x5d50bc(0x229)];_0x593d2d[_0x5d50bc(0x267)]+=_0x36b631,_0x593d2d[_0x5d50bc(0x267)]>_0x593d2d[_0x5d50bc(0x208)]?(_0x110038[_0x5d50bc(0x201)]='',delete _0x110038[_0x5d50bc(0x1ed)]):_0x36b631>_0x348ec5&&(_0x110038['capped']=_0x110038['value']['substr'](0x0,_0x348ec5),delete _0x110038[_0x5d50bc(0x1ed)]);}}[_0x5bfe86(0x215)](_0x3ee382){var _0x3765ac=_0x5bfe86;return!!(_0x3ee382&&_0x2d6544[_0x3765ac(0x1e0)]&&this[_0x3765ac(0x257)](_0x3ee382)===_0x3765ac(0x1e9)&&_0x3ee382[_0x3765ac(0x2af)]);}[_0x5bfe86(0x1ee)](_0x3f8395){var _0x399dcb=_0x5bfe86;if(_0x3f8395[_0x399dcb(0x25c)](/^\\d+$/))return _0x3f8395;var _0x315e4b;try{_0x315e4b=JSON[_0x399dcb(0x1da)](''+_0x3f8395);}catch{_0x315e4b='\\x22'+this[_0x399dcb(0x257)](_0x3f8395)+'\\x22';}return _0x315e4b['match'](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x315e4b=_0x315e4b[_0x399dcb(0x233)](0x1,_0x315e4b[_0x399dcb(0x229)]-0x2):_0x315e4b=_0x315e4b[_0x399dcb(0x2a8)](/'/g,'\\x5c\\x27')['replace'](/\\\\\"/g,'\\x22')[_0x399dcb(0x2a8)](/(^\"|\"$)/g,'\\x27'),_0x315e4b;}[_0x5bfe86(0x225)](_0x3da7a0,_0x7ace53,_0x1e34a5,_0x5cb48b){var _0x126008=_0x5bfe86;this[_0x126008(0x1d6)](_0x3da7a0,_0x7ace53),_0x5cb48b&&_0x5cb48b(),this[_0x126008(0x26b)](_0x1e34a5,_0x3da7a0),this[_0x126008(0x1c7)](_0x3da7a0,_0x7ace53);}[_0x5bfe86(0x1d6)](_0x388b3a,_0x2eff80){var _0x14526d=_0x5bfe86;this[_0x14526d(0x23e)](_0x388b3a,_0x2eff80),this[_0x14526d(0x266)](_0x388b3a,_0x2eff80),this[_0x14526d(0x1e6)](_0x388b3a,_0x2eff80),this[_0x14526d(0x28a)](_0x388b3a,_0x2eff80);}[_0x5bfe86(0x23e)](_0x27af3a,_0x227161){}[_0x5bfe86(0x266)](_0x2bc9d0,_0x26af78){}['_setNodeLabel'](_0x430601,_0x28f708){}[_0x5bfe86(0x205)](_0x462abc){var _0xe4ffc3=_0x5bfe86;return _0x462abc===this[_0xe4ffc3(0x2a9)];}[_0x5bfe86(0x1c7)](_0x3ebaaf,_0x4ae2f6){var _0xf397a5=_0x5bfe86;this[_0xf397a5(0x259)](_0x3ebaaf,_0x4ae2f6),this['_setNodeExpandableState'](_0x3ebaaf),_0x4ae2f6[_0xf397a5(0x1ff)]&&this[_0xf397a5(0x1dc)](_0x3ebaaf),this[_0xf397a5(0x2b1)](_0x3ebaaf,_0x4ae2f6),this[_0xf397a5(0x22c)](_0x3ebaaf,_0x4ae2f6),this[_0xf397a5(0x22d)](_0x3ebaaf);}[_0x5bfe86(0x26b)](_0x5d1221,_0x2ebcf7){var _0x5c5e59=_0x5bfe86;let _0x3d6658;try{_0x2d6544[_0x5c5e59(0x2a4)]&&(_0x3d6658=_0x2d6544['console'][_0x5c5e59(0x286)],_0x2d6544[_0x5c5e59(0x2a4)][_0x5c5e59(0x286)]=function(){}),_0x5d1221&&typeof _0x5d1221[_0x5c5e59(0x229)]==_0x5c5e59(0x217)&&(_0x2ebcf7[_0x5c5e59(0x229)]=_0x5d1221['length']);}catch{}finally{_0x3d6658&&(_0x2d6544[_0x5c5e59(0x2a4)][_0x5c5e59(0x286)]=_0x3d6658);}if(_0x2ebcf7[_0x5c5e59(0x285)]===_0x5c5e59(0x217)||_0x2ebcf7[_0x5c5e59(0x285)]===_0x5c5e59(0x26d)){if(isNaN(_0x2ebcf7['value']))_0x2ebcf7[_0x5c5e59(0x27c)]=!0x0,delete _0x2ebcf7[_0x5c5e59(0x1ed)];else switch(_0x2ebcf7[_0x5c5e59(0x1ed)]){case Number[_0x5c5e59(0x269)]:_0x2ebcf7['positiveInfinity']=!0x0,delete _0x2ebcf7['value'];break;case Number[_0x5c5e59(0x1f9)]:_0x2ebcf7['negativeInfinity']=!0x0,delete _0x2ebcf7[_0x5c5e59(0x1ed)];break;case 0x0:this[_0x5c5e59(0x27d)](_0x2ebcf7[_0x5c5e59(0x1ed)])&&(_0x2ebcf7[_0x5c5e59(0x244)]=!0x0);break;}}else _0x2ebcf7[_0x5c5e59(0x285)]===_0x5c5e59(0x213)&&typeof _0x5d1221[_0x5c5e59(0x278)]==_0x5c5e59(0x1f8)&&_0x5d1221[_0x5c5e59(0x278)]&&_0x2ebcf7[_0x5c5e59(0x278)]&&_0x5d1221[_0x5c5e59(0x278)]!==_0x2ebcf7[_0x5c5e59(0x278)]&&(_0x2ebcf7[_0x5c5e59(0x21e)]=_0x5d1221[_0x5c5e59(0x278)]);}[_0x5bfe86(0x27d)](_0x5c44ab){var _0x47b21d=_0x5bfe86;return 0x1/_0x5c44ab===Number[_0x47b21d(0x1f9)];}[_0x5bfe86(0x1dc)](_0x2703b2){var _0xd712e4=_0x5bfe86;!_0x2703b2[_0xd712e4(0x1d1)]||!_0x2703b2[_0xd712e4(0x1d1)]['length']||_0x2703b2[_0xd712e4(0x285)]===_0xd712e4(0x2ab)||_0x2703b2[_0xd712e4(0x285)]==='Map'||_0x2703b2['type']===_0xd712e4(0x1d5)||_0x2703b2['props']['sort'](function(_0x1857de,_0x41d5cc){var _0x574c4d=_0xd712e4,_0x1e8dfc=_0x1857de[_0x574c4d(0x278)][_0x574c4d(0x1f3)](),_0x273904=_0x41d5cc[_0x574c4d(0x278)][_0x574c4d(0x1f3)]();return _0x1e8dfc<_0x273904?-0x1:_0x1e8dfc>_0x273904?0x1:0x0;});}[_0x5bfe86(0x2b1)](_0x11c24d,_0x2ceb53){var _0x390d09=_0x5bfe86;if(!(_0x2ceb53[_0x390d09(0x1cb)]||!_0x11c24d['props']||!_0x11c24d[_0x390d09(0x1d1)]['length'])){for(var _0x414d3d=[],_0x1d0bf1=[],_0xb7edab=0x0,_0x1aa8a2=_0x11c24d[_0x390d09(0x1d1)]['length'];_0xb7edab<_0x1aa8a2;_0xb7edab++){var _0xafea7=_0x11c24d[_0x390d09(0x1d1)][_0xb7edab];_0xafea7[_0x390d09(0x285)]===_0x390d09(0x213)?_0x414d3d[_0x390d09(0x1cc)](_0xafea7):_0x1d0bf1['push'](_0xafea7);}if(!(!_0x1d0bf1[_0x390d09(0x229)]||_0x414d3d[_0x390d09(0x229)]<=0x1)){_0x11c24d[_0x390d09(0x1d1)]=_0x1d0bf1;var _0x3ce7d6={'functionsNode':!0x0,'props':_0x414d3d};this[_0x390d09(0x23e)](_0x3ce7d6,_0x2ceb53),this[_0x390d09(0x259)](_0x3ce7d6,_0x2ceb53),this[_0x390d09(0x242)](_0x3ce7d6),this[_0x390d09(0x28a)](_0x3ce7d6,_0x2ceb53),_0x3ce7d6['id']+='\\x20f',_0x11c24d[_0x390d09(0x1d1)][_0x390d09(0x1f0)](_0x3ce7d6);}}}[_0x5bfe86(0x22c)](_0x5e739f,_0x45407a){}[_0x5bfe86(0x242)](_0x27bee1){}[_0x5bfe86(0x246)](_0x329770){var _0xe8ad6e=_0x5bfe86;return Array[_0xe8ad6e(0x20f)](_0x329770)||typeof _0x329770==_0xe8ad6e(0x2b0)&&this[_0xe8ad6e(0x257)](_0x329770)===_0xe8ad6e(0x1c9);}[_0x5bfe86(0x28a)](_0x787970,_0x2084de){}[_0x5bfe86(0x22d)](_0x3dff96){var _0x1a15e3=_0x5bfe86;delete _0x3dff96['_hasSymbolPropertyOnItsPath'],delete _0x3dff96[_0x1a15e3(0x232)],delete _0x3dff96['_hasMapOnItsPath'];}[_0x5bfe86(0x1e6)](_0x2d5682,_0x1c57f0){}}let _0x3ce7f4=new _0x365c3f(),_0x35a933={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x51fbad={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x1c2993(_0x490cd9,_0x32710d,_0x31b88c,_0x29a7fd,_0x4ff3a8,_0x12f7f2){var _0x161159=_0x5bfe86;let _0x11cd3a,_0x6587df;try{_0x6587df=_0x1d3aa8(),_0x11cd3a=_0x23472b[_0x32710d],!_0x11cd3a||_0x6587df-_0x11cd3a['ts']>0x1f4&&_0x11cd3a[_0x161159(0x1d8)]&&_0x11cd3a[_0x161159(0x21d)]/_0x11cd3a['count']<0x64?(_0x23472b[_0x32710d]=_0x11cd3a={'count':0x0,'time':0x0,'ts':_0x6587df},_0x23472b[_0x161159(0x270)]={}):_0x6587df-_0x23472b[_0x161159(0x270)]['ts']>0x32&&_0x23472b['hits'][_0x161159(0x1d8)]&&_0x23472b['hits']['time']/_0x23472b[_0x161159(0x270)][_0x161159(0x1d8)]<0x64&&(_0x23472b['hits']={});let _0x3a6703=[],_0x32b84f=_0x11cd3a[_0x161159(0x280)]||_0x23472b[_0x161159(0x270)][_0x161159(0x280)]?_0x51fbad:_0x35a933,_0xb6451d=_0x290f86=>{var _0x23f6d0=_0x161159;let _0x4eb512={};return _0x4eb512[_0x23f6d0(0x1d1)]=_0x290f86[_0x23f6d0(0x1d1)],_0x4eb512[_0x23f6d0(0x2a3)]=_0x290f86['elements'],_0x4eb512[_0x23f6d0(0x26a)]=_0x290f86['strLength'],_0x4eb512['totalStrLength']=_0x290f86[_0x23f6d0(0x208)],_0x4eb512[_0x23f6d0(0x221)]=_0x290f86[_0x23f6d0(0x221)],_0x4eb512['autoExpandMaxDepth']=_0x290f86[_0x23f6d0(0x21b)],_0x4eb512[_0x23f6d0(0x1ff)]=!0x1,_0x4eb512[_0x23f6d0(0x1cb)]=!_0x31042d,_0x4eb512[_0x23f6d0(0x295)]=0x1,_0x4eb512['level']=0x0,_0x4eb512[_0x23f6d0(0x2a6)]=_0x23f6d0(0x275),_0x4eb512[_0x23f6d0(0x230)]=_0x23f6d0(0x1ec),_0x4eb512[_0x23f6d0(0x25b)]=!0x0,_0x4eb512[_0x23f6d0(0x25f)]=[],_0x4eb512[_0x23f6d0(0x23b)]=0x0,_0x4eb512[_0x23f6d0(0x27b)]=!0x0,_0x4eb512[_0x23f6d0(0x267)]=0x0,_0x4eb512['node']={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x4eb512;};for(var _0x30089d=0x0;_0x30089d<_0x4ff3a8[_0x161159(0x229)];_0x30089d++)_0x3a6703[_0x161159(0x1cc)](_0x3ce7f4[_0x161159(0x28c)]({'timeNode':_0x490cd9===_0x161159(0x21d)||void 0x0},_0x4ff3a8[_0x30089d],_0xb6451d(_0x32b84f),{}));if(_0x490cd9===_0x161159(0x2b2)){let _0x216ae4=Error[_0x161159(0x253)];try{Error[_0x161159(0x253)]=0x1/0x0,_0x3a6703[_0x161159(0x1cc)](_0x3ce7f4['serialize']({'stackNode':!0x0},new Error()['stack'],_0xb6451d(_0x32b84f),{'strLength':0x1/0x0}));}finally{Error[_0x161159(0x253)]=_0x216ae4;}}return{'method':_0x161159(0x26f),'version':_0x52c704,'args':[{'ts':_0x31b88c,'session':_0x29a7fd,'args':_0x3a6703,'id':_0x32710d,'context':_0x12f7f2}]};}catch(_0x249385){return{'method':_0x161159(0x26f),'version':_0x52c704,'args':[{'ts':_0x31b88c,'session':_0x29a7fd,'args':[{'type':_0x161159(0x22b),'error':_0x249385&&_0x249385[_0x161159(0x1c6)]}],'id':_0x32710d,'context':_0x12f7f2}]};}finally{try{if(_0x11cd3a&&_0x6587df){let _0x2ea20d=_0x1d3aa8();_0x11cd3a[_0x161159(0x1d8)]++,_0x11cd3a[_0x161159(0x21d)]+=_0x1240bf(_0x6587df,_0x2ea20d),_0x11cd3a['ts']=_0x2ea20d,_0x23472b[_0x161159(0x270)]['count']++,_0x23472b[_0x161159(0x270)][_0x161159(0x21d)]+=_0x1240bf(_0x6587df,_0x2ea20d),_0x23472b[_0x161159(0x270)]['ts']=_0x2ea20d,(_0x11cd3a['count']>0x32||_0x11cd3a['time']>0x64)&&(_0x11cd3a[_0x161159(0x280)]=!0x0),(_0x23472b[_0x161159(0x270)][_0x161159(0x1d8)]>0x3e8||_0x23472b['hits']['time']>0x12c)&&(_0x23472b[_0x161159(0x270)][_0x161159(0x280)]=!0x0);}}catch{}}}return _0x1c2993;}function _0x345f(){var _0xf1e565=['...','Symbol','next.js','string','NEGATIVE_INFINITY','onmessage','astro','port','426136eFTZOj','gateway.docker.internal','sortProps','default','capped','then','String','join','_isUndefined','_WebSocketClass','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20','totalStrLength','onclose','_connectToHostNow','[object\\x20BigInt]','_addObjectProperty','dockerizedApp','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','isArray','_WebSocket','680710nxUyMs','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','function','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','_isMap','_console_ninja','number','enumerable','getOwnPropertyNames','_console_ninja_session','autoExpandMaxDepth','process','time','funcName','_p_length','_inNextEdge','autoExpandLimit','call','split','toString','_processTreeNodeResult','slice','disabledLog','9ZMsnwd','length','env','unknown','_addLoadNode','_cleanNode','232566KyYDEE','_Symbol','rootExpression','1718103197574','_hasSetOnItsPath','substr','_sendErrorMessage','data','_webSocketErrorDocsLink','hostname','toUpperCase','_isPrimitiveType','valueOf','autoExpandPropertyCount','_p_name','_connected','_setNodeId','1ZwhbXi','_dateToString','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','_setNodeExpandableState','_addProperty','negativeZero','readyState','_isArray','send','Error','elapsed','_allowedToSend','host','location','node','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','pop','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)','level','49864','stackTraceLimit','index','_connectAttemptCount','RegExp','_objectToString','_attemptToReconnectShortly','_setNodeLabel','concat','autoExpand','match','origin','unref','autoExpandPreviousObjects','_getOwnPropertyNames','10zBaGdv','undefined','hrtime','onopen','args','_setNodeQueryPath','allStrLength','_HTMLAllCollection','POSITIVE_INFINITY','strLength','_additionalMetadata','Buffer','Number','constructor','log','hits','_inBrowser','symbol','performance','global','root_exp_id','cappedElements','1.0.0','name','HTMLAllCollection','now','resolveGetters','nan','_isNegativeZero','_ws','_capIfString','reduceLimits','failed\\x20to\\x20connect\\x20to\\x20host:\\x20','_quotedRegExp','parse','null','type','error','versions','ws://','path','_setNodePermissions','_consoleNinjaAllowedToStart','serialize',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"SEO-PC-056\",\"172.27.27.88\",\"172.30.224.1\"],'getOwnPropertySymbols','_isSet','includes','getWebSocketClass','_type','hasOwnProperty','charAt','depth','current','4662yKEqZN','_disposeWebsocket','_getOwnPropertyDescriptor','1506900ZwsaeT','warn','4720vcNjOL','expressionsToEvaluate','eventReceivedCallback','boolean','timeStamp','NEXT_RUNTIME','3517794IgbPoO','elements','console','get','expId','\\x20browser','replace','_undefined','nodeModules','array','onerror','catch','_connecting','forEach','object','_addFunctionsNode','trace','\\x20server','prototype','isExpressionToEvaluate','message','_treeNodePropertiesAfterFullValue','_p_','[object\\x20Array]','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','noFunctions','push','[object\\x20Set]','_socket','parent','_keyStrRegExp','props','set','_maxConnectAttemptCount','_isPrimitiveWrapperType','Set','_treeNodePropertiesBeforeFullValue','','count','_reconnectTimeout','stringify','nuxt','_sortProps','_allowedToConnectOnSend','',\"c:\\\\Users\\\\Mahfujar Rahman\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.324\\\\node_modules\",'Map','12koQaJu','getPrototypeOf','bigint','__es'+'Module','edge','_setNodeExpressionPath','perf_hooks','getOwnPropertyDescriptor','[object\\x20Map]','indexOf','2561009SClEPN','root_exp','value','_propertyName','_blacklistedProperty','unshift','bind','ws/index.js','toLowerCase','test'];_0x345f=function(){return _0xf1e565;};return _0x345f();}((_0x188d62,_0x583ca9,_0x4daaef,_0x403be0,_0x7546ed,_0x1e0f4a,_0x19ab3b,_0x4f5e3a,_0x134985,_0x31c96f,_0x24b6bc)=>{var _0xba1f0d=_0x578e2a;if(_0x188d62[_0xba1f0d(0x216)])return _0x188d62['_console_ninja'];if(!X(_0x188d62,_0x4f5e3a,_0x7546ed))return _0x188d62['_console_ninja']={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0x188d62[_0xba1f0d(0x216)];let _0x5c931a=b(_0x188d62),_0x51d854=_0x5c931a[_0xba1f0d(0x249)],_0x45e8c3=_0x5c931a[_0xba1f0d(0x2a0)],_0x30e7c0=_0x5c931a[_0xba1f0d(0x27a)],_0x2e4195={'hits':{},'ts':{}},_0x2668e2=H(_0x188d62,_0x134985,_0x2e4195,_0x1e0f4a),_0x307792=_0xd04593=>{_0x2e4195['ts'][_0xd04593]=_0x45e8c3();},_0x2973b2=(_0x135778,_0x16b446)=>{let _0x5c5cbc=_0x2e4195['ts'][_0x16b446];if(delete _0x2e4195['ts'][_0x16b446],_0x5c5cbc){let _0x151baf=_0x51d854(_0x5c5cbc,_0x45e8c3());_0x3487b9(_0x2668e2('time',_0x135778,_0x30e7c0(),_0x18fea1,[_0x151baf],_0x16b446));}},_0x5241ef=_0xdf16d7=>{var _0x3b5147=_0xba1f0d,_0x29d373;return _0x7546ed===_0x3b5147(0x1f7)&&_0x188d62[_0x3b5147(0x25d)]&&((_0x29d373=_0xdf16d7==null?void 0x0:_0xdf16d7['args'])==null?void 0x0:_0x29d373[_0x3b5147(0x229)])&&(_0xdf16d7[_0x3b5147(0x265)][0x0][_0x3b5147(0x25d)]=_0x188d62[_0x3b5147(0x25d)]),_0xdf16d7;};_0x188d62[_0xba1f0d(0x216)]={'consoleLog':(_0x4900c,_0x1e84f4)=>{var _0x43f9cd=_0xba1f0d;_0x188d62[_0x43f9cd(0x2a4)][_0x43f9cd(0x26f)][_0x43f9cd(0x278)]!==_0x43f9cd(0x227)&&_0x3487b9(_0x2668e2(_0x43f9cd(0x26f),_0x4900c,_0x30e7c0(),_0x18fea1,_0x1e84f4));},'consoleTrace':(_0x4a2fe8,_0x4ca5d1)=>{var _0x13a1e8=_0xba1f0d;_0x188d62[_0x13a1e8(0x2a4)][_0x13a1e8(0x26f)][_0x13a1e8(0x278)]!=='disabledTrace'&&_0x3487b9(_0x5241ef(_0x2668e2(_0x13a1e8(0x2b2),_0x4a2fe8,_0x30e7c0(),_0x18fea1,_0x4ca5d1)));},'consoleTime':_0x4f4199=>{_0x307792(_0x4f4199);},'consoleTimeEnd':(_0x1fee29,_0x36d028)=>{_0x2973b2(_0x36d028,_0x1fee29);},'autoLog':(_0xde27ec,_0x4de85e)=>{_0x3487b9(_0x2668e2('log',_0x4de85e,_0x30e7c0(),_0x18fea1,[_0xde27ec]));},'autoLogMany':(_0x1c3294,_0x291fea)=>{var _0x2e6791=_0xba1f0d;_0x3487b9(_0x2668e2(_0x2e6791(0x26f),_0x1c3294,_0x30e7c0(),_0x18fea1,_0x291fea));},'autoTrace':(_0x38fd83,_0x489817)=>{var _0x1cd2cf=_0xba1f0d;_0x3487b9(_0x5241ef(_0x2668e2(_0x1cd2cf(0x2b2),_0x489817,_0x30e7c0(),_0x18fea1,[_0x38fd83])));},'autoTraceMany':(_0x4aa1ce,_0x2366ba)=>{var _0x4f9a03=_0xba1f0d;_0x3487b9(_0x5241ef(_0x2668e2(_0x4f9a03(0x2b2),_0x4aa1ce,_0x30e7c0(),_0x18fea1,_0x2366ba)));},'autoTime':(_0x5aa46a,_0x54da06,_0x33a2f0)=>{_0x307792(_0x33a2f0);},'autoTimeEnd':(_0x2eb72f,_0x5d44c8,_0x1e616b)=>{_0x2973b2(_0x5d44c8,_0x1e616b);},'coverage':_0x1d2f41=>{_0x3487b9({'method':'coverage','version':_0x1e0f4a,'args':[{'id':_0x1d2f41}]});}};let _0x3487b9=q(_0x188d62,_0x583ca9,_0x4daaef,_0x403be0,_0x7546ed,_0x31c96f,_0x24b6bc),_0x18fea1=_0x188d62[_0xba1f0d(0x21a)];return _0x188d62[_0xba1f0d(0x216)];})(globalThis,'127.0.0.1',_0x578e2a(0x252),_0x578e2a(0x1df),'webpack',_0x578e2a(0x277),_0x578e2a(0x231),_0x578e2a(0x28d),_0x578e2a(0x1d7),_0x578e2a(0x1de),'1');");
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