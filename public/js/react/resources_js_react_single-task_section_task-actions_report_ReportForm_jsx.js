"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_single-task_section_task-actions_report_ReportForm_jsx"],{

/***/ "./resources/js/react/single-task/section/task-actions/report/ReportForm.jsx":
/*!***********************************************************************************!*\
  !*** ./resources/js/react/single-task/section/task-actions/report/ReportForm.jsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @headlessui/react */ "./node_modules/@headlessui/react/dist/components/listbox/listbox.js");
/* harmony import */ var react_icons_hi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-icons/hi */ "./node_modules/react-icons/hi/index.esm.js");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-task/components/Button.jsx");
/* harmony import */ var _components_SubmitButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/SubmitButton */ "./resources/js/react/single-task/components/SubmitButton.jsx");
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../ckeditor */ "./resources/js/react/ckeditor/index.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var reports = [{
  id: 1,
  name: "Project Manager/Lead Developer Is Making Me Do Their Work Without Top Managements’ Authorization"
}, {
  id: 2,
  name: "Need Further Clarification From Lead Developer/Project Manager"
}];
var ReportForm = function ReportForm(_ref) {
  var close = _ref.close;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState2 = _slicedToArray(_useState, 2),
    reason = _useState2[0],
    setReason = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    _useState4 = _slicedToArray(_useState3, 2),
    person = _useState4[0],
    setPerson = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    comment = _useState6[0],
    setComment = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    previousNotedIssue = _useState8[0],
    setPreviousNotedIssue = _useState8[1];
  var onSubmit = function onSubmit(e) {
    e.preventDefault();
    var data = {
      reason: reason,
      person: person,
      comment: comment,
      previousNotedIssue: previousNotedIssue
    };
    console.log(data);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("form", {
      className: "px-3",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: "Select Reason for report"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "position-relative w-100 mb-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Listbox, {
            value: reason,
            onChange: setReason,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Listbox.Button, {
              className: "w-100 bg-white py-2 pl-2 pr-1 border text-left d-flex align-items-center justify-content-between",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                className: "mr-auto",
                children: (reason === null || reason === void 0 ? void 0 : reason.name) || "Select Reason for report."
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_icons_hi__WEBPACK_IMPORTED_MODULE_6__.HiOutlineSelector, {
                className: "f-16"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Listbox.Options, {
              className: "position-absolute bg-white p-2 shadow w-100",
              style: {
                zIndex: 10,
                maxHeight: "350px",
                overflowY: "auto"
              },
              children: reports === null || reports === void 0 ? void 0 : reports.map(function (report) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Listbox.Option, {
                  value: report,
                  className: function className(_ref2) {
                    var selected = _ref2.selected,
                      active = _ref2.active;
                    return selected ? "task-selection-list-option selected" : active ? "task-selection-list-option active" : "task-selection-list-option";
                  },
                  children: report === null || report === void 0 ? void 0 : report.name
                }, report.id);
              })
            })]
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: "Responsible Person"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "position-relative w-100 mb-3",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Listbox, {
            value: person,
            onChange: setPerson,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Listbox.Button, {
              className: "w-100 bg-white py-2 pl-2 pr-1 border text-left d-flex align-items-center justify-content-between",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                className: "mr-auto",
                children: (reason === null || reason === void 0 ? void 0 : reason.name) || "Select Responsible Person."
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_icons_hi__WEBPACK_IMPORTED_MODULE_6__.HiOutlineSelector, {
                className: "f-16"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Listbox.Options, {
              className: "position-absolute bg-white p-2 shadow w-100",
              style: {
                zIndex: 10,
                maxHeight: "350px",
                overflowY: "auto"
              },
              children: reports === null || reports === void 0 ? void 0 : reports.map(function (report) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_headlessui_react__WEBPACK_IMPORTED_MODULE_5__.Listbox.Option, {
                  value: report,
                  className: function className(_ref3) {
                    var selected = _ref3.selected,
                      active = _ref3.active;
                    return selected ? "task-selection-list-option selected" : active ? "task-selection-list-option active" : "task-selection-list-option";
                  },
                  children: report === null || report === void 0 ? void 0 : report.name
                }, report.id);
              })
            })]
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
          htmlFor: "editor",
          className: "font-weight-bold",
          children: "Briefly describe the problem here..."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "ck-editor-holder",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_3__["default"], {
            onChange: function onChange(e, editor) {
              var data = editor.getData();
              setComment(data);
            }
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "form-group",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
          htmlFor: "",
          className: "font-weight-bold",
          children: "Did you report the same issue previously?"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "form-check form-check-inline",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
              className: "form-check-input",
              type: "radio",
              name: "inlineRadioOptions",
              id: "inlineRadio1",
              value: "yes",
              onChange: function onChange(e) {
                return setPreviousNotedIssue(e.target.value);
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              className: "form-check-label",
              htmlFor: "inlineRadio1",
              children: "Yes"
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "form-check form-check-inline",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
              className: "form-check-input",
              type: "radio",
              name: "inlineRadioOptions",
              id: "inlineRadio2",
              value: "no",
              onChange: function onChange(e) {
                return setPreviousNotedIssue(e.target.value);
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
              className: "form-check-label",
              htmlFor: "inlineRadio2",
              children: "No"
            })]
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "my-3 d-flex align-items-center",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_1__["default"], {
          variant: "tertiary",
          onClick: close,
          className: "ml-auto mr-2",
          children: "Close"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_SubmitButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
          onClick: onSubmit,
          isLoading: false,
          title: "Report"
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReportForm);

/***/ })

}]);
//# sourceMappingURL=resources_js_react_single-task_section_task-actions_report_ReportForm_jsx.js.map