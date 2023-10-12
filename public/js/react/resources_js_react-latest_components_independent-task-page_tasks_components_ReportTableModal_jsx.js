"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react-latest_components_independent-task-page_tasks_components_ReportTableModal_jsx"],{

/***/ "./resources/js/react-latest/components/independent-task-page/tasks/components/ReportResolveButton.jsx":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/react-latest/components/independent-task-page/tasks/components/ReportResolveButton.jsx ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button */ "./resources/js/react-latest/components/independent-task-page/tasks/components/Button.jsx");
/* harmony import */ var _SubmitButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SubmitButton */ "./resources/js/react-latest/components/independent-task-page/tasks/components/SubmitButton.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Modal */ "./resources/js/react-latest/components/independent-task-page/tasks/components/Modal.jsx");
/* harmony import */ var _ui_ckeditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../ui/ckeditor */ "./resources/js/react-latest/ui/ckeditor/index.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



// import { useResolveReportMutation } from "../../services/api/tasksApiSlice";



// import { useDispatch } from "react-redux";
// import { updateReportStatus } from "../../services/features/tasksSlice";


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
  // const [resolveReport, { isLoading }] = useResolveReportMutation();

  // const dispatch = useDispatch();

  // test variable
  var isLoading = false;
  var handleModal = function handleModal(e) {
    setIsOpen(true);
  };
  var close = function close() {
    return setIsOpen(false);
  };
  var isTopManagement = lodash__WEBPACK_IMPORTED_MODULE_3___default().includes([1], (_window = window) === null || _window === void 0 || (_window = _window.Laravel) === null || _window === void 0 || (_window = _window.user) === null || _window === void 0 ? void 0 : _window.role_id);
  var onSubmit = function onSubmit(type) {
    var data = {
      status: type,
      report_id: row === null || row === void 0 ? void 0 : row.id,
      admin_comment: comment
    };
    if (comment) {
      // resolveReport(data)
      //     .unwrap()
      //     .then((res) => {
      //         if (res.status === 200) {
      //             dispatch(
      //                 updateReportStatus({ id: row?.id, status: type })
      //             );
      //             const body = document.getElementById("body");
      //             body.style.cursor = "default";
      //             close();
      //         }
      //     });
    }
  };
  var handleEditor = function handleEditor(e, editor) {
    var data = editor.getData();
    setComment(data);
  };
  var variant = (row === null || row === void 0 ? void 0 : row.status) === "approved" ? "success" : "tertiary";
  var title = (row === null || row === void 0 ? void 0 : row.status) === "approved" ? "Resoved" : (row === null || row === void 0 ? void 0 : row.status) === "pending" ? "Resove" : lodash__WEBPACK_IMPORTED_MODULE_3___default().startCase(row === null || row === void 0 ? void 0 : row.status);
  var badge = (row === null || row === void 0 ? void 0 : row.status) === "pending" ? "badge-primary" : (row === null || row === void 0 ? void 0 : row.status) === "approved" ? "badge-success" : "badge-warning";
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    children: [!isTopManagement && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
      className: "badge ".concat(badge),
      children: row === null || row === void 0 ? void 0 : row.status
    }), isTopManagement && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
        onClick: function onClick() {
          return (row === null || row === void 0 ? void 0 : row.status) === "pending" && handleModal();
        },
        variant: variant,
        className: (row === null || row === void 0 ? void 0 : row.status) === "denied" ? "sp1_tasks_tbl_report_btn" : "",
        children: title
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Modal__WEBPACK_IMPORTED_MODULE_4__["default"], {
          isOpen: isOpen,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "sp1_modal-content-wrapper",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "sp1_modal-panel",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "sp1_modal-head",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "sp1_modal-title pl-2",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
                    children: "Report Details"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
                  onClick: close,
                  "aria-label": "ModalClose",
                  variant: "tertiary",
                  className: "sp1_modal-close",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                    className: "fa-solid fa-xmark"
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "sp1_modal-body p-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "ck-editor-holder",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ui_ckeditor__WEBPACK_IMPORTED_MODULE_5__["default"], {
                    onChange: handleEditor,
                    placeholder: "Write your comment here!"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "mt-3 d-flex align-items-center justify-content-end py-4",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    className: "ml-auto d-flex align-items-center w-fit",
                    style: {
                      gap: "10px"
                    },
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_SubmitButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
                      variant: "success",
                      title: "Approve & Close",
                      onClick: function onClick() {
                        return onSubmit("approved");
                      },
                      isLoading: isLoading,
                      className: "ml-auto mr-2"
                    }), !isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_SubmitButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
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

/***/ "./resources/js/react-latest/components/independent-task-page/tasks/components/ReportTableModal.jsx":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/react-latest/components/independent-task-page/tasks/components/ReportTableModal.jsx ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/react-table/build/lib/index.mjs");
/* harmony import */ var _tanstack_react_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/react-table */ "./node_modules/@tanstack/table-core/build/lib/index.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _table_DragableColumnHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./table/DragableColumnHeader */ "./resources/js/react-latest/components/independent-task-page/tasks/components/table/DragableColumnHeader.jsx");
/* harmony import */ var _demo_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./demo.json */ "./resources/js/react-latest/components/independent-task-page/tasks/components/demo.json");
/* harmony import */ var _Person__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Person */ "./resources/js/react-latest/components/independent-task-page/tasks/components/Person.jsx");
/* harmony import */ var _ReportResolveButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ReportResolveButton */ "./resources/js/react-latest/components/independent-task-page/tasks/components/ReportResolveButton.jsx");
/* harmony import */ var _loader_ReportTableLoder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loader/ReportTableLoder */ "./resources/js/react-latest/components/independent-task-page/tasks/components/loader/ReportTableLoder.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ui_marge_table_EmptyTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../ui/marge-table/EmptyTable */ "./resources/js/react-latest/ui/marge-table/EmptyTable.jsx");
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
  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_0___default().useState(lodash__WEBPACK_IMPORTED_MODULE_6___default().map(columns, "id")),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    columnOrder = _React$useState10[0],
    setColumnOrder = _React$useState10[1];
  var resetColumnsOrder = function resetColumnsOrder() {
    return setColumnOrder(lodash__WEBPACK_IMPORTED_MODULE_6___default().map(columns, "id"));
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
    }), !isLoading && lodash__WEBPACK_IMPORTED_MODULE_6___default().size(data) === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_ui_marge_table_EmptyTable__WEBPACK_IMPORTED_MODULE_7__["default"], {})]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReportTableModal);

/***/ }),

/***/ "./resources/js/react-latest/components/independent-task-page/tasks/components/loader/ReportTableLoder.jsx":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/react-latest/components/independent-task-page/tasks/components/loader/ReportTableLoder.jsx ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReportTableLoder)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../ui/Placeholder */ "./resources/js/react-latest/ui/Placeholder.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");




function ReportTableLoder() {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default().times(5, function (item) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("tr", {
      className: "sp1_tasks_tr",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
        className: "sp1_tasks_td",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "50px",
          height: "14px",
          className: "mb-1"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
        className: "sp1_tasks_td d-flex align-items-center",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "24px",
          height: "24px",
          type: "circle",
          className: "mb-1 mr-2"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "80px",
          height: "13px",
          className: "mb-1"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
        className: "sp1_tasks_td d-flex align-items-center",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "24px",
          height: "24px",
          type: "circle",
          className: "mb-1 mr-2"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "80px",
          height: "13px",
          className: "mb-1"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
        className: "sp1_tasks_td",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "100%",
          height: "13px",
          className: "mb-1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "60%",
          height: "13px",
          className: "mb-1"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("td", {
        className: "sp1_tasks_td",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "100%",
          height: "13px",
          className: "mb-1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "100%",
          height: "13px",
          className: "mb-1"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "40%",
          height: "13px",
          className: "mb-1"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
        className: "sp1_tasks_td",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "80px",
          height: "13px",
          className: "mb-1"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
        className: "sp1_tasks_td",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "80px",
          height: "20px",
          className: "mb-1"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("td", {
        className: "sp1_tasks_td",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ui_Placeholder__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
          width: "80px",
          height: "20px",
          className: "mb-1"
        })
      })]
    }, item);
  });
}

/***/ })

}]);
//# sourceMappingURL=resources_js_react-latest_components_independent-task-page_tasks_components_ReportTableModal_jsx.js.map