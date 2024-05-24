"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_single-task_section_sub-task_preview_Comments_jsx"],{

/***/ "./resources/js/react/single-task/section/sub-task/preview/Comments.jsx":
/*!******************************************************************************!*\
  !*** ./resources/js/react/single-task/section/sub-task/preview/Comments.jsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Loader */ "./resources/js/react/single-task/components/Loader.jsx");
/* harmony import */ var _comments_CommentSendBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../comments/CommentSendBox */ "./resources/js/react/single-task/section/comments/CommentSendBox.jsx");
/* harmony import */ var _comments_InnerComment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../comments/InnerComment */ "./resources/js/react/single-task/section/comments/InnerComment.jsx");
/* harmony import */ var _services_api_TaskCommentApiSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/api/TaskCommentApiSlice */ "./resources/js/react/services/api/TaskCommentApiSlice.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");







var Comments = function Comments(_ref) {
  var task = _ref.task,
    onCommentPost = _ref.onCommentPost;
  var _useGetTaskCommentsQu = (0,_services_api_TaskCommentApiSlice__WEBPACK_IMPORTED_MODULE_4__.useGetTaskCommentsQuery)(task === null || task === void 0 ? void 0 : task.id, {
      skip: !(task !== null && task !== void 0 && task.id)
    }),
    comments = _useGetTaskCommentsQu.data,
    isLoading = _useGetTaskCommentsQu.isLoading;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "d-flex flex-column",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_comments_CommentSendBox__WEBPACK_IMPORTED_MODULE_2__["default"], {
        task: task,
        onCommentPost: onCommentPost
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "sp1_task_comment_list mt-4 ",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "font-weight-bold pb-3",
          children: "Comments: "
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "sp1_task_comment_list_items",
          style: {
            maxHeight: "500px"
          },
          children: [isLoading && (comments === null || comments === void 0 ? void 0 : comments.length) === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Loader__WEBPACK_IMPORTED_MODULE_1__["default"], {}), lodash__WEBPACK_IMPORTED_MODULE_5___default().size(comments) > 0 && lodash__WEBPACK_IMPORTED_MODULE_5___default().map(lodash__WEBPACK_IMPORTED_MODULE_5___default().orderBy(comments, "id", "desc"), function (comment) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_comments_InnerComment__WEBPACK_IMPORTED_MODULE_3__["default"], {
              comment: comment
            }, comment.id);
          })]
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comments);

/***/ })

}]);
//# sourceMappingURL=resources_js_react_single-task_section_sub-task_preview_Comments_jsx.js.map