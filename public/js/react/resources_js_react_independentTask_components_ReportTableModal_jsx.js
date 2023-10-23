"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_independentTask_components_ReportTableModal_jsx"],{

/***/ "./resources/js/react/independentTask/components/ReportResolveButton.jsx":
/*!*******************************************************************************!*\
  !*** ./resources/js/react/independentTask/components/ReportResolveButton.jsx ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global/Modal */ "./resources/js/react/global/Modal.jsx");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Button */ "./resources/js/react/independentTask/components/Button.jsx");
/* harmony import */ var _ckeditor_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ckeditor/index */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var _SubmitButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SubmitButton */ "./resources/js/react/independentTask/components/SubmitButton.jsx");
/* harmony import */ var _services_api_tasksApiSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/api/tasksApiSlice */ "./resources/js/react/services/api/tasksApiSlice.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _services_features_tasksSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/features/tasksSlice */ "./resources/js/react/services/features/tasksSlice.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var ReportResoveButton = function ReportResoveButton(_ref) {
  var _window;
  var row = _ref.row;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isOpen = _React$useState2[0],
    setIsOpen = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    search = _React$useState4[0],
    setSearch = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(""),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    comment = _React$useState6[0],
    setComment = _React$useState6[1];
  var _useResolveReportMuta = (0,_services_api_tasksApiSlice__WEBPACK_IMPORTED_MODULE_5__.useResolveReportMutation)(),
    _useResolveReportMuta2 = _slicedToArray(_useResolveReportMuta, 2),
    resolveReport = _useResolveReportMuta2[0],
    isLoading = _useResolveReportMuta2[1].isLoading;
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_7__.useDispatch)();
  var handleModal = function handleModal(e) {
    setIsOpen(true);
  };
  var close = function close() {
    return setIsOpen(false);
  };
  var isTopManagement = lodash__WEBPACK_IMPORTED_MODULE_6___default().includes([1], (_window = window) === null || _window === void 0 || (_window = _window.Laravel) === null || _window === void 0 || (_window = _window.user) === null || _window === void 0 ? void 0 : _window.role_id);
  var onSubmit = function onSubmit(type) {
    var data = {
      status: type,
      report_id: row === null || row === void 0 ? void 0 : row.id,
      admin_comment: comment
    };
    if (comment) {
      resolveReport(data).unwrap().then(function (res) {
        if (res.status === 200) {
          dispatch((0,_services_features_tasksSlice__WEBPACK_IMPORTED_MODULE_8__.updateReportStatus)({
            id: row === null || row === void 0 ? void 0 : row.id,
            status: type
          }));
          var body = document.getElementById("body");
          body.style.cursor = "default";
          close();
        }
      });
    }
  };
  var handleEditor = function handleEditor(e, editor) {
    var data = editor.getData();
    setComment(data);
  };
  var variant = (row === null || row === void 0 ? void 0 : row.status) === "approved" ? "success" : "tertiary";
  var title = (row === null || row === void 0 ? void 0 : row.status) === "approved" ? "Resoved" : (row === null || row === void 0 ? void 0 : row.status) === "pending" ? "Resove" : lodash__WEBPACK_IMPORTED_MODULE_6___default().startCase(row === null || row === void 0 ? void 0 : row.status);
  var badge = (row === null || row === void 0 ? void 0 : row.status) === "pending" ? "badge-primary" : (row === null || row === void 0 ? void 0 : row.status) === "approved" ? "badge-success" : "badge-warning";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    children: [!isTopManagement && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("span", {
      className: "badge ".concat(badge),
      children: row === null || row === void 0 ? void 0 : row.status
    }), isTopManagement && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
        onClick: function onClick() {
          return (row === null || row === void 0 ? void 0 : row.status) === "pending" && handleModal();
        },
        variant: variant,
        className: (row === null || row === void 0 ? void 0 : row.status) === "denied" ? "sp1_tasks_tbl_report_btn" : "",
        children: title
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_global_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
          isOpen: isOpen,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
            className: "sp1_modal-content-wrapper",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
              className: "sp1_modal-panel",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                className: "sp1_modal-head",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
                  className: "sp1_modal-title pl-2",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("strong", {
                    children: "Report Details"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                  onClick: close,
                  "aria-label": "ModalClose",
                  variant: "tertiary",
                  className: "sp1_modal-close",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("i", {
                    className: "fa-solid fa-xmark"
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                className: "sp1_modal-body p-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
                  className: "ck-editor-holder",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_ckeditor_index__WEBPACK_IMPORTED_MODULE_3__["default"], {
                    onChange: handleEditor,
                    placeholder: "Write your comment here!"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
                  className: "mt-3 d-flex align-items-center justify-content-end py-4",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
                    className: "ml-auto d-flex align-items-center w-fit",
                    style: {
                      gap: "10px"
                    },
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_SubmitButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
                      variant: "success",
                      title: "Approve & Close",
                      onClick: function onClick() {
                        return onSubmit("approved");
                      },
                      isLoading: isLoading,
                      className: "ml-auto mr-2"
                    }), !isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_SubmitButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
                      title: "Deny & Close",
                      onClick: function onClick() {
                        return onSubmit("denied");
                      },
                      isLoading: isLoading,
                      className: "deny_button"
                    })]
                  })
                })]
              })]
            })
          })
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReportResoveButton);

/***/ }),

/***/ "./resources/js/react/independentTask/components/ReportTableModal.jsx":
/*!****************************************************************************!*\
  !*** ./resources/js/react/independentTask/components/ReportTableModal.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/react-table/build/lib/index.mjs");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/table-core/build/lib/index.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _table_DragableColumnHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./table/DragableColumnHeader */ "./resources/js/react/independentTask/components/table/DragableColumnHeader.jsx");
/* harmony import */ var _demo_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./demo.json */ "./resources/js/react/independentTask/components/demo.json");
/* harmony import */ var _Person__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Person */ "./resources/js/react/independentTask/components/Person.jsx");
/* harmony import */ var _ReportResolveButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReportResolveButton */ "./resources/js/react/independentTask/components/ReportResolveButton.jsx");
/* harmony import */ var _loader_ReportTableLoder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loader/ReportTableLoder */ "./resources/js/react/independentTask/components/loader/ReportTableLoder.jsx");
/* harmony import */ var _global_EmptyTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../global/EmptyTable */ "./resources/js/react/global/EmptyTable.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
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










// columns model


var ReportTableModal = function ReportTableModal(_ref) {
  var _ref$reports = _ref.reports,
    reports = _ref$reports === void 0 ? [] : _ref$reports,
    task = _ref.task,
    search = _ref.search,
    _ref$tableName = _ref.tableName,
    tableName = _ref$tableName === void 0 ? "sp1-table" : _ref$tableName,
    _ref$isLoading = _ref.isLoading,
    isLoading = _ref$isLoading === void 0 ? true : _ref$isLoading;
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(_toConsumableArray(reports)),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    data = _React$useState2[0],
    setData = _React$useState2[1];
  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_0___default().useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    sorting = _React$useState4[0],
    setSorting = _React$useState4[1];
  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_0___default().useState({
      pageIndex: 0,
      pageSize: 10
    }),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    _React$useState6$ = _React$useState6[0],
    pageIndex = _React$useState6$.pageIndex,
    pageSize = _React$useState6$.pageSize,
    setPagination = _React$useState6[1];

  //
  var defaultColumns = react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(function () {
    return [{
      id: "serial_no",
      header: "Serial No.",
      accessorKey: "id",
      cell: function cell(info) {
        return info.getValue();
      }
    }, {
      id: "report_issuer",
      header: "Report Issuer",
      cell: function cell(_ref2) {
        var row = _ref2.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Person__WEBPACK_IMPORTED_MODULE_3__["default"], {
            url: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.added_by),
            name: data === null || data === void 0 ? void 0 : data.report_issue_added_by,
            avatar: data === null || data === void 0 ? void 0 : data.report_issue_added_by_avatar
          })
        });
      }
    }, {
      id: "accountable_individual",
      header: "Accountable Individual",
      cell: function cell(_ref3) {
        var row = _ref3.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Person__WEBPACK_IMPORTED_MODULE_3__["default"], {
            url: "/account/employees/".concat(data === null || data === void 0 ? void 0 : data.person),
            name: data === null || data === void 0 ? void 0 : data.responsible_person_name,
            avatar: data === null || data === void 0 ? void 0 : data.responsible_person_avatar
          })
        });
      }
    }, {
      id: "report_reason",
      header: "Report Reason",
      cell: function cell(_ref4) {
        var row = _ref4.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          children: data === null || data === void 0 ? void 0 : data.reason
        });
      }
    }, {
      id: "report_reason_details",
      header: "Report Reason Details",
      cell: function cell(_ref5) {
        var row = _ref5.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "sp1_ck_content",
          dangerouslySetInnerHTML: {
            __html: data === null || data === void 0 ? void 0 : data.comment
          }
        });
      }
    }, {
      id: "pre_reported",
      header: "Previously Reported",
      cell: function cell(_ref6) {
        var row = _ref6.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          children: data === null || data === void 0 ? void 0 : data.previousNotedIssue
        });
      }
    }, {
      id: "action",
      header: "Action",
      cell: function cell(_ref7) {
        var row = _ref7.row;
        var data = row === null || row === void 0 ? void 0 : row.original;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ReportResolveButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
          row: data
        });
      }
    }];
  });

  // columns
  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(_toConsumableArray(defaultColumns)),
    _React$useState8 = _slicedToArray(_React$useState7, 1),
    columns = _React$useState8[0];
  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(lodash__WEBPACK_IMPORTED_MODULE_7___default().map(columns, "id")),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    columnOrder = _React$useState10[0],
    setColumnOrder = _React$useState10[1];
  var resetColumnsOrder = function resetColumnsOrder() {
    return setColumnOrder(lodash__WEBPACK_IMPORTED_MODULE_7___default().map(columns, "id"));
  };
  var pagination = react__WEBPACK_IMPORTED_MODULE_0___default().useMemo(function () {
    return {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
  }, [pageIndex, pageSize]);
  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {
    setData(_toConsumableArray(reports));
  }, [reports]);
  var table = (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_9__.useReactTable)({
    data: data,
    columns: columns,
    state: {
      sorting: sorting,
      columnOrder: columnOrder,
      pagination: pagination,
      tableName: tableName,
      globalFilter: search
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.getCoreRowModel)(),
    getPaginationRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.getPaginationRowModel)(),
    getFilteredRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.getFilteredRowModel)(),
    getSortedRowModel: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__.getSortedRowModel)()
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: "sp1_tasks_table_wrapper sp1_tasks_report_table_wrapper",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("table", {
      className: "sp1_tasks_table sp1_tasks_report_table",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("thead", {
        className: "sp1_tasks_thead",
        children: table.getHeaderGroups().map(function (headerGroup) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("tr", {
            className: "sp1_tasks_tr",
            children: headerGroup.headers.map(function (header) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_table_DragableColumnHeader__WEBPACK_IMPORTED_MODULE_1__.DragableColumnHeader, {
                header: header,
                table: table,
                className: "sp1_tasks_report_th"
              }, header.id);
            })
          }, headerGroup.id);
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("tbody", {
        className: "sp1_tasks_tbody",
        children: [isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_loader_ReportTableLoder__WEBPACK_IMPORTED_MODULE_5__["default"], {}), !isLoading && table.getRowModel().rows.map(function (row) {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("tr", {
            className: "sp1_tasks_tr",
            children: row.getVisibleCells().map(function (cell) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("td", {
                className: "px-2 sp1_tasks_td sp1_tasks_report_td",
                children: (0,_tanstack_react_table__WEBPACK_IMPORTED_MODULE_9__.flexRender)(cell.column.columnDef.cell, cell.getContext())
              }, cell.id);
            })
          }, row.id);
        })]
      })]
    }), !isLoading && lodash__WEBPACK_IMPORTED_MODULE_7___default().size(data) === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_global_EmptyTable__WEBPACK_IMPORTED_MODULE_6__["default"], {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReportTableModal);

/***/ }),

/***/ "./resources/js/react/independentTask/components/loader/ReportTableLoder.jsx":
/*!***********************************************************************************!*\
  !*** ./resources/js/react/independentTask/components/loader/ReportTableLoder.jsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReportTableLoder)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_Placeholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../global/Placeholder */ "./resources/js/react/global/Placeholder.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




function ReportTableLoder() {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default().times(5, function (item) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("tr", {
      className: "sp1_tasks_tr",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
        className: "sp1_tasks_td",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "50px",
          height: "14px",
          className: "mb-1"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
        className: "sp1_tasks_td d-flex align-items-center",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "24px",
          height: "24px",
          type: "circle",
          className: "mb-1 mr-2"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "80px",
          height: "13px",
          className: "mb-1"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
        className: "sp1_tasks_td d-flex align-items-center",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "24px",
          height: "24px",
          type: "circle",
          className: "mb-1 mr-2"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "80px",
          height: "13px",
          className: "mb-1"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
        className: "sp1_tasks_td",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "100%",
          height: "13px",
          className: "mb-1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "60%",
          height: "13px",
          className: "mb-1"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
        className: "sp1_tasks_td",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "100%",
          height: "13px",
          className: "mb-1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "100%",
          height: "13px",
          className: "mb-1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "40%",
          height: "13px",
          className: "mb-1"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
        className: "sp1_tasks_td",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "80px",
          height: "13px",
          className: "mb-1"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
        className: "sp1_tasks_td",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "80px",
          height: "20px",
          className: "mb-1"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
        className: "sp1_tasks_td",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_global_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "80px",
          height: "20px",
          className: "mb-1"
        })
      })]
    }, item);
  });
}

/***/ }),

/***/ "./resources/js/react/independentTask/components/demo.json":
/*!*****************************************************************!*\
  !*** ./resources/js/react/independentTask/components/demo.json ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"id":2263,"task_short_code":"PSEOP1CJYKUY-2263","added_by":"62","project_name":"<a href=\\"https://seopage1erp.website/account/projects/615\\" class=\\"text-darkest-grey\\">UI/UX designer for EdTech website</a>","project_admin":"210","heading":"<div class=\\"media align-items-center\\">\\n                    <div class=\\"media-body\\">\\n                        <div class=\\"row\\">\\n                            <div class=\\"mx-auto mx-sm-0 pb-2 pb-sm-0 align-self-center\\"><a class=\\"openRightModal showSubTask d-flex align-items-center \\" href=\\"https://seopage1erp.website/account/tasks/show-subtask/2263/tableView\\" ><i style=\\"color:#31D2F2;\\" class=\\"fa fa-eye ml-3\\"></i><span class=\\"ml-1\\">1</span></a></div>\\n                            <div class=\\"col-9\\">\\n                                <h5 class=\\"mb-0 f-13 text-darkest-grey\\"><a href=\\"https://seopage1erp.website/account/tasks/2263\\" class=\\"\\">ABCD</a></h5>\\n                                <p class=\\"mb-0\\">   </p>\\n                            </div>\\n                        </div>\\n                    </div>\\n                </div>","clientName":"Rishabh G.","created_by":"Rajat Chakraborty","board_column_id":"2","due_date":"<span style=\\"color:#d50000;\\"><strong>30-07-2023</strong></span>","board_column":"<i class=\\"fa fa-circle mr-1 text-yellow\\"\\n                    style=\\"color: #f5c308\\"></i>To Do","is_private":"0","pinned_task":"0","active_timer_all_count":"0","due_on":"30-07-2023","create_on":"","users":"<div class=\\"position-relative\\"><div class=\\"taskEmployeeImg rounded-circle \\" style=\\"left:  0px\\"><a href=\\"https://seopage1erp.website/account/employees/358\\"><img data-toggle=\\"tooltip\\" data-original-title=\\"Moniruzzaman\\" src=\\"https://www.gravatar.com/avatar/d4f613728b21b0da04359fd10e196e45.png?s=200&d=mp\\"></a></div> </div>","active_timer_all":[],"active_timer":null,"time_logged":[],"user_active_timer":null,"labels":[],"task_users":[{"id":"2556","task_id":"2263","user_id":"358","created_at":null,"updated_at":null}],"check":"<input type=\\"checkbox\\" class=\\"select-table-row\\" id=\\"datatable-row-2263\\"  name=\\"datatable_ids[]\\" value=\\"2263\\" onclick=\\"dataTableRowCheck(2263)\\">","action":"<div class=\\"task_view\\">\\n                <div class=\\"dropdown\\">\\n                    <a class=\\"task_view_more d-flex align-items-center justify-content-center dropdown-toggle\\" type=\\"link\\"\\n                        id=\\"dropdownMenuLink-2263\\" data-toggle=\\"dropdown\\" aria-haspopup=\\"true\\" aria-expanded=\\"false\\">\\n                        <i class=\\"icon-options-vertical icons\\"></i>\\n                    </a>\\n                    <div class=\\"dropdown-menu dropdown-menu-right\\" aria-labelledby=\\"dropdownMenuLink-2263\\" tabindex=\\"0\\"><a href=\\"https://seopage1erp.website/account/tasks/2263\\" class=\\"dropdown-item openRightModal\\"><i class=\\"fa fa-eye mr-2\\"></i>View</a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/2263/edit\\">\\n                            <i class=\\"fa fa-edit mr-2\\"></i>\\n                            Edit\\n                        </a><a class=\\"dropdown-item delete-table-row\\" href=\\"javascript:;\\" data-user-id=\\"2263\\">\\n                            <i class=\\"fa fa-trash mr-2\\"></i>\\n                            Delete\\n                        </a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/create?duplicate_task=2263\\">\\n                            <i class=\\"fa fa-clone\\"></i>\\n                            Duplicate\\n                        </a></div>\\n                </div>\\n            </div>","short_code":"PSEOP1CJYKUY-2263","timer_action":"<i class=\\"fa-solid fa-circle-stop\\" style=\\"color:red;\\"></i> No active tasks","created_at":"28-07-2023 (04:07:42 PM)","name":"Moniruzzaman","timer":null,"task":"ABCD","timeLogged":"0 hrs ","status":"To Do","client_name":"Rishabh G.","progress":"<div class=\\"progress\\" style=\\"height: 15px;\\">\\n                    <div class=\\"progress-bar f-12 bg-danger\\" role=\\"progressbar\\" style=\\"width: 0%;\\" aria-valuenow=\\"0\\" aria-valuemin=\\"0\\" aria-valuemax=\\"100\\">0%</div>\\n                </div>","estimate_time":"8 hrs 0 mins","DT_RowId":"row-2263","subtasks":[{"id":2250,"task_short_code":"PSEOP1KPX8EB-2250","added_by":"210","project_name":"<a href=\\"https://seopage1erp.website/account/projects/514\\" class=\\"text-darkest-grey\\">BMGF Website Design</a>","project_admin":"210","heading":"<div class=\\"media align-items-center\\">\\n                    <div class=\\"media-body\\">\\n                        <div class=\\"row\\">\\n                            <div class=\\"mx-auto mx-sm-0 pb-2 pb-sm-0 align-self-center\\"><a class=\\"openRightModal showSubTask d-flex align-items-center \\" href=\\"https://seopage1erp.website/account/tasks/show-subtask/2250/tableView\\" ><i style=\\"color:#31D2F2;\\" class=\\"fa fa-eye ml-3\\"></i><span class=\\"ml-1\\">1</span></a></div>\\n                            <div class=\\"col-9\\">\\n                                <h5 class=\\"mb-0 f-13 text-darkest-grey\\"><a href=\\"https://seopage1erp.website/account/tasks/2250\\" class=\\"\\">Catering Services Page</a></h5>\\n                                <p class=\\"mb-0\\">   </p>\\n                            </div>\\n                        </div>\\n                    </div>\\n                </div>","clientName":"Ferrermarie07","created_by":"Farhan Rahman","board_column_id":"2","due_date":"<span style=\\"color:#d50000;\\"><strong>28-07-2023</strong></span>","board_column":"<i class=\\"fa fa-circle mr-1 text-yellow\\"\\n                    style=\\"color: #f5c308\\"></i>To Do","is_private":"0","pinned_task":"0","active_timer_all_count":"0","due_on":"28-07-2023","create_on":"","users":"<div class=\\"position-relative\\"><div class=\\"taskEmployeeImg rounded-circle \\" style=\\"left:  0px\\"><a href=\\"https://seopage1erp.website/account/employees/358\\"><img data-toggle=\\"tooltip\\" data-original-title=\\"Moniruzzaman\\" src=\\"https://www.gravatar.com/avatar/d4f613728b21b0da04359fd10e196e45.png?s=200&d=mp\\"></a></div> </div>","active_timer_all":[],"active_timer":null,"time_logged":[],"user_active_timer":null,"labels":[],"task_users":[{"id":"2542","task_id":"2250","user_id":"358","created_at":null,"updated_at":null}],"check":"<input type=\\"checkbox\\" class=\\"select-table-row\\" id=\\"datatable-row-2250\\"  name=\\"datatable_ids[]\\" value=\\"2250\\" onclick=\\"dataTableRowCheck(2250)\\">","action":"<div class=\\"task_view\\">\\n                <div class=\\"dropdown\\">\\n                    <a class=\\"task_view_more d-flex align-items-center justify-content-center dropdown-toggle\\" type=\\"link\\"\\n                        id=\\"dropdownMenuLink-2250\\" data-toggle=\\"dropdown\\" aria-haspopup=\\"true\\" aria-expanded=\\"false\\">\\n                        <i class=\\"icon-options-vertical icons\\"></i>\\n                    </a>\\n                    <div class=\\"dropdown-menu dropdown-menu-right\\" aria-labelledby=\\"dropdownMenuLink-2250\\" tabindex=\\"0\\"><a href=\\"https://seopage1erp.website/account/tasks/2250\\" class=\\"dropdown-item openRightModal\\"><i class=\\"fa fa-eye mr-2\\"></i>View</a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/2250/edit\\">\\n                            <i class=\\"fa fa-edit mr-2\\"></i>\\n                            Edit\\n                        </a><a class=\\"dropdown-item delete-table-row\\" href=\\"javascript:;\\" data-user-id=\\"2250\\">\\n                            <i class=\\"fa fa-trash mr-2\\"></i>\\n                            Delete\\n                        </a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/create?duplicate_task=2250\\">\\n                            <i class=\\"fa fa-clone\\"></i>\\n                            Duplicate\\n                        </a></div>\\n                </div>\\n            </div>","short_code":"PSEOP1KPX8EB-2250","timer_action":"<i class=\\"fa-solid fa-circle-stop\\" style=\\"color:red;\\"></i> No active tasks","created_at":"27-07-2023 (06:18:39 AM)","name":"Moniruzzaman","timer":null,"task":"Catering Services Page","timeLogged":"0 hrs 44 mins","status":"To Do","client_name":"ferrermarie07","progress":"<div class=\\"progress\\" style=\\"height: 15px;\\">\\n                    <div class=\\"progress-bar f-12 bg-danger\\" role=\\"progressbar\\" style=\\"width: 0%;\\" aria-valuenow=\\"0\\" aria-valuemin=\\"0\\" aria-valuemax=\\"100\\">0%</div>\\n                </div>","estimate_time":"1 hrs 0 mins","DT_RowId":"row-2250"},{"id":2247,"task_short_code":"PSEOP1WO7ZJ8-2247","added_by":"210","project_name":"<a href=\\"https://seopage1erp.website/account/projects/596\\" class=\\"text-darkest-grey\\">Hotel presentation website</a>","project_admin":"210","heading":"<div class=\\"media align-items-center\\">\\n                    <div class=\\"media-body\\">\\n                        <div class=\\"row\\">\\n                            <div class=\\"mx-auto mx-sm-0 pb-2 pb-sm-0 align-self-center\\"><a class=\\"openRightModal showSubTask d-flex align-items-center \\" href=\\"https://seopage1erp.website/account/tasks/show-subtask/2247/tableView\\" ><i style=\\"color:#31D2F2;\\" class=\\"fa fa-eye ml-3\\"></i><span class=\\"ml-1\\">1</span></a></div>\\n                            <div class=\\"col-9\\">\\n                                <h5 class=\\"mb-0 f-13 text-darkest-grey\\"><a href=\\"https://seopage1erp.website/account/tasks/2247\\" class=\\"\\">Bar & Gallery and Gallery Inner</a></h5>\\n                                <p class=\\"mb-0\\">   </p>\\n                            </div>\\n                        </div>\\n                    </div>\\n                </div>","clientName":"Michail M.","created_by":"Farhan Rahman","board_column_id":"2","due_date":"<span style=\\"color:#d50000;\\"><strong>27-07-2023</strong></span>","board_column":"<i class=\\"fa fa-circle mr-1 text-yellow\\"\\n                    style=\\"color: #f5c308\\"></i>To Do","is_private":"0","pinned_task":"0","active_timer_all_count":"0","due_on":"27-07-2023","create_on":"","users":"<div class=\\"position-relative\\"><div class=\\"taskEmployeeImg rounded-circle \\" style=\\"left:  0px\\"><a href=\\"https://seopage1erp.website/account/employees/358\\"><img data-toggle=\\"tooltip\\" data-original-title=\\"Moniruzzaman\\" src=\\"https://www.gravatar.com/avatar/d4f613728b21b0da04359fd10e196e45.png?s=200&d=mp\\"></a></div> </div>","active_timer_all":[],"active_timer":null,"time_logged":[],"user_active_timer":null,"labels":[],"task_users":[{"id":"2538","task_id":"2247","user_id":"358","created_at":null,"updated_at":null}],"check":"<input type=\\"checkbox\\" class=\\"select-table-row\\" id=\\"datatable-row-2247\\"  name=\\"datatable_ids[]\\" value=\\"2247\\" onclick=\\"dataTableRowCheck(2247)\\">","action":"<div class=\\"task_view\\">\\n                <div class=\\"dropdown\\">\\n                    <a class=\\"task_view_more d-flex align-items-center justify-content-center dropdown-toggle\\" type=\\"link\\"\\n                        id=\\"dropdownMenuLink-2247\\" data-toggle=\\"dropdown\\" aria-haspopup=\\"true\\" aria-expanded=\\"false\\">\\n                        <i class=\\"icon-options-vertical icons\\"></i>\\n                    </a>\\n                    <div class=\\"dropdown-menu dropdown-menu-right\\" aria-labelledby=\\"dropdownMenuLink-2247\\" tabindex=\\"0\\"><a href=\\"https://seopage1erp.website/account/tasks/2247\\" class=\\"dropdown-item openRightModal\\"><i class=\\"fa fa-eye mr-2\\"></i>View</a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/2247/edit\\">\\n                            <i class=\\"fa fa-edit mr-2\\"></i>\\n                            Edit\\n                        </a><a class=\\"dropdown-item delete-table-row\\" href=\\"javascript:;\\" data-user-id=\\"2247\\">\\n                            <i class=\\"fa fa-trash mr-2\\"></i>\\n                            Delete\\n                        </a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/create?duplicate_task=2247\\">\\n                            <i class=\\"fa fa-clone\\"></i>\\n                            Duplicate\\n                        </a></div>\\n                </div>\\n            </div>","short_code":"PSEOP1WO7ZJ8-2247","timer_action":"<i class=\\"fa-solid fa-circle-stop\\" style=\\"color:red;\\"></i> No active tasks","created_at":"27-07-2023 (05:19:06 AM)","name":"Moniruzzaman","timer":null,"task":"Bar &amp; Gallery and Gallery Inner","timeLogged":"14 hrs 11 mins","status":"To Do","client_name":"Michail M.","progress":"<div class=\\"progress\\" style=\\"height: 15px;\\">\\n                    <div class=\\"progress-bar f-12 bg-danger\\" role=\\"progressbar\\" style=\\"width: 0%;\\" aria-valuenow=\\"0\\" aria-valuemin=\\"0\\" aria-valuemax=\\"100\\">0%</div>\\n                </div>","estimate_time":"3 hrs 0 mins","DT_RowId":"row-2247"}]},{"id":2259,"task_short_code":"PSEOP1M3XEJV-2259","added_by":"209","project_name":"<a href=\\"https://seopage1erp.website/account/projects/577\\" class=\\"text-darkest-grey\\">Looking for a Shopify progamming and design expertopify themes and can provide deisgn assistance</a>","project_admin":"209","heading":"<div class=\\"media align-items-center\\">\\n                    <div class=\\"media-body\\">\\n                        <div class=\\"row\\">\\n                            <div class=\\"mx-auto mx-sm-0 pb-2 pb-sm-0 align-self-center\\"><a class=\\"openRightModal showSubTask d-flex align-items-center disabled\\" href=\\"https://seopage1erp.website/account/tasks/show-subtask/2259/tableView\\" ><i style=\\"color:#31D2F2;\\" class=\\"fa fa-eye ml-3\\"></i><span class=\\"ml-1\\">0</span></a></div>\\n                            <div class=\\"col-9\\">\\n                                <h5 class=\\"mb-0 f-13 text-darkest-grey\\"><a href=\\"https://seopage1erp.website/account/tasks/2259\\" class=\\"\\">Shop page</a></h5>\\n                                <p class=\\"mb-0\\">   </p>\\n                            </div>\\n                        </div>\\n                    </div>\\n                </div>","clientName":"Chase C.","created_by":"Dinar M Islam","board_column_id":"2","due_date":"<span >02-08-2023</span>","board_column":"<i class=\\"fa fa-circle mr-1 text-yellow\\"\\n                    style=\\"color: #f5c308\\"></i>To Do","is_private":"0","pinned_task":"0","active_timer_all_count":"0","due_on":"02-08-2023","create_on":"","users":"<div class=\\"position-relative\\"><div class=\\"taskEmployeeImg rounded-circle \\" style=\\"left:  0px\\"><a href=\\"https://seopage1erp.website/account/employees/358\\"><img data-toggle=\\"tooltip\\" data-original-title=\\"Moniruzzaman\\" src=\\"https://www.gravatar.com/avatar/d4f613728b21b0da04359fd10e196e45.png?s=200&d=mp\\"></a></div> </div>","active_timer_all":[],"active_timer":null,"time_logged":[],"user_active_timer":null,"labels":[],"task_users":[{"id":"2552","task_id":"2259","user_id":"358","created_at":null,"updated_at":null}],"check":"<input type=\\"checkbox\\" class=\\"select-table-row\\" id=\\"datatable-row-2259\\"  name=\\"datatable_ids[]\\" value=\\"2259\\" onclick=\\"dataTableRowCheck(2259)\\">","action":"<div class=\\"task_view\\">\\n                <div class=\\"dropdown\\">\\n                    <a class=\\"task_view_more d-flex align-items-center justify-content-center dropdown-toggle\\" type=\\"link\\"\\n                        id=\\"dropdownMenuLink-2259\\" data-toggle=\\"dropdown\\" aria-haspopup=\\"true\\" aria-expanded=\\"false\\">\\n                        <i class=\\"icon-options-vertical icons\\"></i>\\n                    </a>\\n                    <div class=\\"dropdown-menu dropdown-menu-right\\" aria-labelledby=\\"dropdownMenuLink-2259\\" tabindex=\\"0\\"><a href=\\"https://seopage1erp.website/account/tasks/2259\\" class=\\"dropdown-item openRightModal\\"><i class=\\"fa fa-eye mr-2\\"></i>View</a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/2259/edit\\">\\n                            <i class=\\"fa fa-edit mr-2\\"></i>\\n                            Edit\\n                        </a><a class=\\"dropdown-item delete-table-row\\" href=\\"javascript:;\\" data-user-id=\\"2259\\">\\n                            <i class=\\"fa fa-trash mr-2\\"></i>\\n                            Delete\\n                        </a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/create?duplicate_task=2259\\">\\n                            <i class=\\"fa fa-clone\\"></i>\\n                            Duplicate\\n                        </a></div>\\n                </div>\\n            </div>","short_code":"PSEOP1M3XEJV-2259","timer_action":"<i class=\\"fa-solid fa-circle-stop\\" style=\\"color:red;\\"></i> No active tasks","created_at":"28-07-2023 (05:13:47 AM)","name":"Moniruzzaman","timer":null,"task":"Shop page","timeLogged":"0 hrs ","status":"To Do","client_name":"Chase C.","progress":"<div class=\\"progress\\" style=\\"height: 15px;\\">\\n                    <div class=\\"progress-bar f-12 bg-danger\\" role=\\"progressbar\\" style=\\"width: 0%;\\" aria-valuenow=\\"0\\" aria-valuemin=\\"0\\" aria-valuemax=\\"100\\">0%</div>\\n                </div>","estimate_time":"6 hrs 0 mins","DT_RowId":"row-2259","subtasks":[{"id":2258,"task_short_code":"PSEOP1M3XEJV-2258","added_by":"209","project_name":"<a href=\\"https://seopage1erp.website/account/projects/577\\" class=\\"text-darkest-grey\\">Looking for a Shopify progamming and design expertopify themes and can provide deisgn assistance</a>","project_admin":"209","heading":"<div class=\\"media align-items-center\\">\\n                    <div class=\\"media-body\\">\\n                        <div class=\\"row\\">\\n                            <div class=\\"mx-auto mx-sm-0 pb-2 pb-sm-0 align-self-center\\"><a class=\\"openRightModal showSubTask d-flex align-items-center disabled\\" href=\\"https://seopage1erp.website/account/tasks/show-subtask/2258/tableView\\" ><i style=\\"color:#31D2F2;\\" class=\\"fa fa-eye ml-3\\"></i><span class=\\"ml-1\\">0</span></a></div>\\n                            <div class=\\"col-9\\">\\n                                <h5 class=\\"mb-0 f-13 text-darkest-grey\\"><a href=\\"https://seopage1erp.website/account/tasks/2258\\" class=\\"\\">Other pages</a></h5>\\n                                <p class=\\"mb-0\\">   </p>\\n                            </div>\\n                        </div>\\n                    </div>\\n                </div>","clientName":"Chase C.","created_by":"Dinar M Islam","board_column_id":"2","due_date":"<span style=\\"color:#ef5350;\\">Today</span>","board_column":"<i class=\\"fa fa-circle mr-1 text-yellow\\"\\n                    style=\\"color: #f5c308\\"></i>To Do","is_private":"0","pinned_task":"0","active_timer_all_count":"0","due_on":"31-07-2023","create_on":"","users":"<div class=\\"position-relative\\"><div class=\\"taskEmployeeImg rounded-circle \\" style=\\"left:  0px\\"><a href=\\"https://seopage1erp.website/account/employees/358\\"><img data-toggle=\\"tooltip\\" data-original-title=\\"Moniruzzaman\\" src=\\"https://www.gravatar.com/avatar/d4f613728b21b0da04359fd10e196e45.png?s=200&d=mp\\"></a></div> </div>","active_timer_all":[],"active_timer":null,"time_logged":[],"user_active_timer":null,"labels":[],"task_users":[{"id":"2551","task_id":"2258","user_id":"358","created_at":null,"updated_at":null}],"check":"<input type=\\"checkbox\\" class=\\"select-table-row\\" id=\\"datatable-row-2258\\"  name=\\"datatable_ids[]\\" value=\\"2258\\" onclick=\\"dataTableRowCheck(2258)\\">","action":"<div class=\\"task_view\\">\\n                <div class=\\"dropdown\\">\\n                    <a class=\\"task_view_more d-flex align-items-center justify-content-center dropdown-toggle\\" type=\\"link\\"\\n                        id=\\"dropdownMenuLink-2258\\" data-toggle=\\"dropdown\\" aria-haspopup=\\"true\\" aria-expanded=\\"false\\">\\n                        <i class=\\"icon-options-vertical icons\\"></i>\\n                    </a>\\n                    <div class=\\"dropdown-menu dropdown-menu-right\\" aria-labelledby=\\"dropdownMenuLink-2258\\" tabindex=\\"0\\"><a href=\\"https://seopage1erp.website/account/tasks/2258\\" class=\\"dropdown-item openRightModal\\"><i class=\\"fa fa-eye mr-2\\"></i>View</a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/2258/edit\\">\\n                            <i class=\\"fa fa-edit mr-2\\"></i>\\n                            Edit\\n                        </a><a class=\\"dropdown-item delete-table-row\\" href=\\"javascript:;\\" data-user-id=\\"2258\\">\\n                            <i class=\\"fa fa-trash mr-2\\"></i>\\n                            Delete\\n                        </a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/create?duplicate_task=2258\\">\\n                            <i class=\\"fa fa-clone\\"></i>\\n                            Duplicate\\n                        </a></div>\\n                </div>\\n            </div>","short_code":"PSEOP1M3XEJV-2258","timer_action":"<i class=\\"fa-solid fa-circle-stop\\" style=\\"color:red;\\"></i> No active tasks","created_at":"28-07-2023 (05:11:40 AM)","name":"Moniruzzaman","timer":null,"task":"Other pages","timeLogged":"0 hrs ","status":"To Do","client_name":"Chase C.","progress":"<div class=\\"progress\\" style=\\"height: 15px;\\">\\n                    <div class=\\"progress-bar f-12 bg-danger\\" role=\\"progressbar\\" style=\\"width: 0%;\\" aria-valuenow=\\"0\\" aria-valuemin=\\"0\\" aria-valuemax=\\"100\\">0%</div>\\n                </div>","estimate_time":"12 hrs 0 mins","DT_RowId":"row-2258"}]},{"id":2262,"task_short_code":"PSEOP1CJVBMU-2262","added_by":"245","project_name":"<a href=\\"https://seopage1erp.website/account/projects/549\\" class=\\"text-darkest-grey\\">5-6 page wordpress informative website</a>","project_admin":"245","heading":"<div class=\\"media align-items-center\\">\\n                    <div class=\\"media-body\\">\\n                        <div class=\\"row\\">\\n                            <div class=\\"mx-auto mx-sm-0 pb-2 pb-sm-0 align-self-center\\"><a class=\\"openRightModal showSubTask d-flex align-items-center \\" href=\\"https://seopage1erp.website/account/tasks/show-subtask/2262/tableView\\" ><i style=\\"color:#31D2F2;\\" class=\\"fa fa-eye ml-3\\"></i><span class=\\"ml-1\\">1</span></a></div>\\n                            <div class=\\"col-9\\">\\n                                <h5 class=\\"mb-0 f-13 text-darkest-grey\\"><a href=\\"https://seopage1erp.website/account/tasks/2262\\" class=\\"\\">Products Page</a></h5>\\n                                <p class=\\"mb-0\\">   </p>\\n                            </div>\\n                        </div>\\n                    </div>\\n                </div>","clientName":"Mazen A.","created_by":"Mohammad Fazle Rabbi","board_column_id":"2","due_date":"<span style=\\"color:#d50000;\\"><strong>28-07-2023</strong></span>","board_column":"<i class=\\"fa fa-circle mr-1 text-yellow\\"\\n                    style=\\"color: #f5c308\\"></i>To Do","is_private":"0","pinned_task":"0","active_timer_all_count":"0","due_on":"28-07-2023","create_on":"","users":"<div class=\\"position-relative\\"><div class=\\"taskEmployeeImg rounded-circle \\" style=\\"left:  0px\\"><a href=\\"https://seopage1erp.website/account/employees/358\\"><img data-toggle=\\"tooltip\\" data-original-title=\\"Moniruzzaman\\" src=\\"https://www.gravatar.com/avatar/d4f613728b21b0da04359fd10e196e45.png?s=200&d=mp\\"></a></div> </div>","active_timer_all":[],"active_timer":null,"time_logged":[],"user_active_timer":null,"labels":[],"task_users":[{"id":"2555","task_id":"2262","user_id":"358","created_at":null,"updated_at":null}],"check":"<input type=\\"checkbox\\" class=\\"select-table-row\\" id=\\"datatable-row-2262\\"  name=\\"datatable_ids[]\\" value=\\"2262\\" onclick=\\"dataTableRowCheck(2262)\\">","action":"<div class=\\"task_view\\">\\n                <div class=\\"dropdown\\">\\n                    <a class=\\"task_view_more d-flex align-items-center justify-content-center dropdown-toggle\\" type=\\"link\\"\\n                        id=\\"dropdownMenuLink-2262\\" data-toggle=\\"dropdown\\" aria-haspopup=\\"true\\" aria-expanded=\\"false\\">\\n                        <i class=\\"icon-options-vertical icons\\"></i>\\n                    </a>\\n                    <div class=\\"dropdown-menu dropdown-menu-right\\" aria-labelledby=\\"dropdownMenuLink-2262\\" tabindex=\\"0\\"><a href=\\"https://seopage1erp.website/account/tasks/2262\\" class=\\"dropdown-item openRightModal\\"><i class=\\"fa fa-eye mr-2\\"></i>View</a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/2262/edit\\">\\n                            <i class=\\"fa fa-edit mr-2\\"></i>\\n                            Edit\\n                        </a><a class=\\"dropdown-item delete-table-row\\" href=\\"javascript:;\\" data-user-id=\\"2262\\">\\n                            <i class=\\"fa fa-trash mr-2\\"></i>\\n                            Delete\\n                        </a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/create?duplicate_task=2262\\">\\n                            <i class=\\"fa fa-clone\\"></i>\\n                            Duplicate\\n                        </a></div>\\n                </div>\\n            </div>","short_code":"PSEOP1CJVBMU-2262","timer_action":"<i class=\\"fa-solid fa-circle-stop\\" style=\\"color:red;\\"></i> No active tasks","created_at":"28-07-2023 (05:32:45 AM)","name":"Moniruzzaman","timer":null,"task":"Products Page","timeLogged":"0 hrs ","status":"To Do","client_name":"Mazen A.","progress":"<div class=\\"progress\\" style=\\"height: 15px;\\">\\n                    <div class=\\"progress-bar f-12 bg-danger\\" role=\\"progressbar\\" style=\\"width: 0%;\\" aria-valuenow=\\"0\\" aria-valuemin=\\"0\\" aria-valuemax=\\"100\\">0%</div>\\n                </div>","estimate_time":"3 hrs 0 mins","DT_RowId":"row-2262"},{"id":2256,"task_short_code":"PSEOP1IQPYSG-2256","added_by":"210","project_name":"<a href=\\"https://seopage1erp.website/account/projects/614\\" class=\\"text-darkest-grey\\">2nd Project</a>","project_admin":"210","heading":"<div class=\\"media align-items-center\\">\\n                    <div class=\\"media-body\\">\\n                        <div class=\\"row\\">\\n                            <div class=\\"mx-auto mx-sm-0 pb-2 pb-sm-0 align-self-center\\"><a class=\\"openRightModal showSubTask d-flex align-items-center \\" href=\\"https://seopage1erp.website/account/tasks/show-subtask/2256/tableView\\" ><i style=\\"color:#31D2F2;\\" class=\\"fa fa-eye ml-3\\"></i><span class=\\"ml-1\\">1</span></a></div>\\n                            <div class=\\"col-9\\">\\n                                <h5 class=\\"mb-0 f-13 text-darkest-grey\\"><a href=\\"https://seopage1erp.website/account/tasks/2256\\" class=\\"\\">Revision</a></h5>\\n                                <p class=\\"mb-0\\">   </p>\\n                            </div>\\n                        </div>\\n                    </div>\\n                </div>","clientName":"Aaron A.","created_by":"Farhan Rahman","board_column_id":"2","due_date":"<span style=\\"color:#d50000;\\"><strong>28-07-2023</strong></span>","board_column":"<i class=\\"fa fa-circle mr-1 text-yellow\\"\\n                    style=\\"color: #f5c308\\"></i>To Do","is_private":"0","pinned_task":"0","active_timer_all_count":"0","due_on":"28-07-2023","create_on":"","users":"<div class=\\"position-relative\\"><div class=\\"taskEmployeeImg rounded-circle \\" style=\\"left:  0px\\"><a href=\\"https://seopage1erp.website/account/employees/358\\"><img data-toggle=\\"tooltip\\" data-original-title=\\"Moniruzzaman\\" src=\\"https://www.gravatar.com/avatar/d4f613728b21b0da04359fd10e196e45.png?s=200&d=mp\\"></a></div> </div>","active_timer_all":[],"active_timer":null,"time_logged":[],"user_active_timer":null,"labels":[],"task_users":[{"id":"2549","task_id":"2256","user_id":"358","created_at":null,"updated_at":null}],"check":"<input type=\\"checkbox\\" class=\\"select-table-row\\" id=\\"datatable-row-2256\\"  name=\\"datatable_ids[]\\" value=\\"2256\\" onclick=\\"dataTableRowCheck(2256)\\">","action":"<div class=\\"task_view\\">\\n                <div class=\\"dropdown\\">\\n                    <a class=\\"task_view_more d-flex align-items-center justify-content-center dropdown-toggle\\" type=\\"link\\"\\n                        id=\\"dropdownMenuLink-2256\\" data-toggle=\\"dropdown\\" aria-haspopup=\\"true\\" aria-expanded=\\"false\\">\\n                        <i class=\\"icon-options-vertical icons\\"></i>\\n                    </a>\\n                    <div class=\\"dropdown-menu dropdown-menu-right\\" aria-labelledby=\\"dropdownMenuLink-2256\\" tabindex=\\"0\\"><a href=\\"https://seopage1erp.website/account/tasks/2256\\" class=\\"dropdown-item openRightModal\\"><i class=\\"fa fa-eye mr-2\\"></i>View</a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/2256/edit\\">\\n                            <i class=\\"fa fa-edit mr-2\\"></i>\\n                            Edit\\n                        </a><a class=\\"dropdown-item delete-table-row\\" href=\\"javascript:;\\" data-user-id=\\"2256\\">\\n                            <i class=\\"fa fa-trash mr-2\\"></i>\\n                            Delete\\n                        </a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/create?duplicate_task=2256\\">\\n                            <i class=\\"fa fa-clone\\"></i>\\n                            Duplicate\\n                        </a></div>\\n                </div>\\n            </div>","short_code":"PSEOP1IQPYSG-2256","timer_action":"<i class=\\"fa-solid fa-circle-stop\\" style=\\"color:red;\\"></i> No active tasks","created_at":"28-07-2023 (04:30:26 AM)","name":"Moniruzzaman","timer":null,"task":"Revision","timeLogged":"0 hrs ","status":"To Do","client_name":"Aaron A.","progress":"<div class=\\"progress\\" style=\\"height: 15px;\\">\\n                    <div class=\\"progress-bar f-12 bg-danger\\" role=\\"progressbar\\" style=\\"width: 0%;\\" aria-valuenow=\\"0\\" aria-valuemin=\\"0\\" aria-valuemax=\\"100\\">0%</div>\\n                </div>","estimate_time":"1 hrs 0 mins","DT_RowId":"row-2256","subtasks":[{"id":2252,"task_short_code":"PSEOP1IZFLHC-2252","added_by":"210","project_name":"<a href=\\"https://seopage1erp.website/account/projects/581\\" class=\\"text-darkest-grey\\">Wordpress - Show business locations by zip code and radius</a>","project_admin":"210","heading":"<div class=\\"media align-items-center\\">\\n                    <div class=\\"media-body\\">\\n                        <div class=\\"row\\">\\n                            <div class=\\"mx-auto mx-sm-0 pb-2 pb-sm-0 align-self-center\\"><a class=\\"openRightModal showSubTask d-flex align-items-center disabled\\" href=\\"https://seopage1erp.website/account/tasks/show-subtask/2252/tableView\\" ><i style=\\"color:#31D2F2;\\" class=\\"fa fa-eye ml-3\\"></i><span class=\\"ml-1\\">0</span></a></div>\\n                            <div class=\\"col-9\\">\\n                                <h5 class=\\"mb-0 f-13 text-darkest-grey\\"><a href=\\"https://seopage1erp.website/account/tasks/2252\\" class=\\"\\">Revision</a></h5>\\n                                <p class=\\"mb-0\\">   </p>\\n                            </div>\\n                        </div>\\n                    </div>\\n                </div>","clientName":"Joe B.","created_by":"Farhan Rahman","board_column_id":"2","due_date":"<span style=\\"color:#d50000;\\"><strong>27-07-2023</strong></span>","board_column":"<i class=\\"fa fa-circle mr-1 text-yellow\\"\\n                    style=\\"color: #f5c308\\"></i>To Do","is_private":"0","pinned_task":"0","active_timer_all_count":"0","due_on":"27-07-2023","create_on":"","users":"<div class=\\"position-relative\\"><div class=\\"taskEmployeeImg rounded-circle \\" style=\\"left:  0px\\"><a href=\\"https://seopage1erp.website/account/employees/358\\"><img data-toggle=\\"tooltip\\" data-original-title=\\"Moniruzzaman\\" src=\\"https://www.gravatar.com/avatar/d4f613728b21b0da04359fd10e196e45.png?s=200&d=mp\\"></a></div> </div>","active_timer_all":[],"active_timer":null,"time_logged":[],"user_active_timer":null,"labels":[],"task_users":[{"id":"2544","task_id":"2252","user_id":"358","created_at":null,"updated_at":null}],"check":"<input type=\\"checkbox\\" class=\\"select-table-row\\" id=\\"datatable-row-2252\\"  name=\\"datatable_ids[]\\" value=\\"2252\\" onclick=\\"dataTableRowCheck(2252)\\">","action":"<div class=\\"task_view\\">\\n                <div class=\\"dropdown\\">\\n                    <a class=\\"task_view_more d-flex align-items-center justify-content-center dropdown-toggle\\" type=\\"link\\"\\n                        id=\\"dropdownMenuLink-2252\\" data-toggle=\\"dropdown\\" aria-haspopup=\\"true\\" aria-expanded=\\"false\\">\\n                        <i class=\\"icon-options-vertical icons\\"></i>\\n                    </a>\\n                    <div class=\\"dropdown-menu dropdown-menu-right\\" aria-labelledby=\\"dropdownMenuLink-2252\\" tabindex=\\"0\\"><a href=\\"https://seopage1erp.website/account/tasks/2252\\" class=\\"dropdown-item openRightModal\\"><i class=\\"fa fa-eye mr-2\\"></i>View</a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/2252/edit\\">\\n                            <i class=\\"fa fa-edit mr-2\\"></i>\\n                            Edit\\n                        </a><a class=\\"dropdown-item delete-table-row\\" href=\\"javascript:;\\" data-user-id=\\"2252\\">\\n                            <i class=\\"fa fa-trash mr-2\\"></i>\\n                            Delete\\n                        </a><a class=\\"dropdown-item openRightModal\\" href=\\"https://seopage1erp.website/account/tasks/create?duplicate_task=2252\\">\\n                            <i class=\\"fa fa-clone\\"></i>\\n                            Duplicate\\n                        </a></div>\\n                </div>\\n            </div>","short_code":"PSEOP1IZFLHC-2252","timer_action":"<i class=\\"fa-solid fa-circle-stop\\" style=\\"color:red;\\"></i> No active tasks","created_at":"27-07-2023 (07:30:53 AM)","name":"Moniruzzaman","timer":null,"task":"Revision","timeLogged":"0 hrs ","status":"To Do","client_name":"Joe B.","progress":"<div class=\\"progress\\" style=\\"height: 15px;\\">\\n                    <div class=\\"progress-bar f-12 bg-danger\\" role=\\"progressbar\\" style=\\"width: 0%;\\" aria-valuenow=\\"0\\" aria-valuemin=\\"0\\" aria-valuemax=\\"100\\">0%</div>\\n                </div>","estimate_time":"3 hrs 0 mins","DT_RowId":"row-2252"}]}]');

/***/ })

}]);
//# sourceMappingURL=resources_js_react_independentTask_components_ReportTableModal_jsx.js.map