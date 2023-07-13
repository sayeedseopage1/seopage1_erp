"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_single-task_section_sub-task_preview_SubmittedWork_jsx"],{

/***/ "./resources/js/components/single-task/section/sub-task/preview/SubmittedWork.jsx":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/single-task/section/sub-task/preview/SubmittedWork.jsx ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");



var SubmittedWorkItem = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return __webpack_require__.e(/*! import() */ "resources_js_components_single-task_section_sub-task_preview_SubmittedWorkItem_jsx").then(__webpack_require__.bind(__webpack_require__, /*! ./SubmittedWorkItem */ "./resources/js/components/single-task/section/sub-task/preview/SubmittedWorkItem.jsx"));
});
var SubmittedWork = function SubmittedWork(_ref) {
  var task = _ref.task,
    submittedWork = _ref.submittedWork,
    loading = _ref.loading;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h6", {
      children: "Submitted Work"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "d-flex flex-column",
      style: {
        gap: '10px'
      },
      children: [loading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        children: "Loading..."
      }), submittedWork.length > 0 ? submittedWork.map(function (s) {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
            fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              children: "Loading..."
            }),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SubmittedWorkItem, {
              data: s,
              task: task
            })
          })
        }, s === null || s === void 0 ? void 0 : s.id);
      }) : null]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmittedWork);

/***/ })

}]);
//# sourceMappingURL=resources_js_components_single-task_section_sub-task_preview_SubmittedWork_jsx.js.map