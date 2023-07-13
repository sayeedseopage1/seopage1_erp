"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_single-task_section_sub-task_preview_SubmittedTaskViewModal_jsx"],{

/***/ "./resources/js/components/single-task/section/sub-task/preview/SubmittedTaskViewModal.jsx":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/single-task/section/sub-task/preview/SubmittedTaskViewModal.jsx ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Modal */ "./resources/js/components/single-task/components/Modal.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/components/single-task/components/Button.jsx");
/* harmony import */ var _file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../file-upload/FileUploader */ "./resources/js/components/file-upload/FileUploader.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






var SubmittedTaskViewModal = function SubmittedTaskViewModal(_ref) {
  var _sub$submittedLinkes, _sub$attach, _sub$attach2;
  var isOpen = _ref.isOpen,
    close = _ref.close,
    submittedTask = _ref.submittedTask,
    user = _ref.user,
    isLoading = _ref.isLoading;
  var sub = submittedTask;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: "d-flex align-items-center justify-content-center",
      isOpen: isOpen,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "sp1-subtask-form --modal-panel --modal-submitted sp1-sumittion_task_modal-view",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "sp1-subtask-form --modal-panel-header",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "d-flex align-items-center",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h6", {
                children: "Submitted Task "
              }), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "spinner-border text-dark ml-2",
                role: "status",
                style: {
                  width: "16px",
                  height: "16px",
                  border: "0.14em solid rgba(0, 0, 0, .25)",
                  borderRightColor: "transparent"
                }
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
              "aria-label": "close-modal",
              className: "_close-modal",
              onClick: close,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
                className: "fa-solid fa-xmark"
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: "sp1-subtask-form --modal-panel-body --modal-submitted-body",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "mt-3 d-flex flex-column",
              style: {
                gap: "10px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "fs-14 font-weight-bold d-block mb-3",
                  style: {
                    color: "#767581"
                  },
                  children: "Submitted By"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  className: "d-flex align-items-center",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                      src: user === null || user === void 0 ? void 0 : user.getAvatar(),
                      alt: user === null || user === void 0 ? void 0 : user.getName(),
                      width: 32,
                      height: 32,
                      className: "rounded-circle"
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                    className: "d-flex flex-column px-2",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
                      className: "text-underline text-primary",
                      href: user === null || user === void 0 ? void 0 : user.getUserLink(),
                      style: {
                        color: "#767581"
                      },
                      children: user === null || user === void 0 ? void 0 : user.getName()
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
                      className: "d-block",
                      style: {
                        color: "#767581"
                      },
                      children: [sub === null || sub === void 0 ? void 0 : sub.getSubmittionDate(), " at", " ", sub === null || sub === void 0 ? void 0 : sub.getSubmittionDate("hh:mm a")]
                    })]
                  })]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "d-flex flex-column mt-3",
                style: {
                  gap: "10px"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "d-block fs-14 font-weight-bold",
                  style: {
                    color: "#767581"
                  },
                  children: "Links"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("ul", {
                  style: {
                    listStyle: "unset",
                    marginLeft: "30px"
                  },
                  children: sub === null || sub === void 0 ? void 0 : (_sub$submittedLinkes = sub.submittedLinkes) === null || _sub$submittedLinkes === void 0 ? void 0 : _sub$submittedLinkes.map(function (link, i) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("li", {
                      style: {
                        listStyle: "unset"
                      },
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
                        href: link,
                        className: "hover-underline text-primary",
                        target: "_blank",
                        children: link
                      })
                    }, "".concat(link, "-").concat(i));
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "mt-2 mt-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "d-block fs-12 font-weight-bold mb-2",
                  style: {
                    color: "#767581"
                  },
                  children: "Description"
                }), sub !== null && sub !== void 0 && sub.explaination ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                  className: "sp1_ck_content",
                  dangerouslySetInnerHTML: {
                    __html: sub === null || sub === void 0 ? void 0 : sub.explaination
                  }
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  style: {
                    color: "rgb(180, 188, 196)"
                  },
                  children: "No description is available"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "mt-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  className: "d-block fs-12 font-weight-bold mb-2",
                  style: {
                    color: "#767581"
                  },
                  children: "Attached Files"
                }), (sub === null || sub === void 0 ? void 0 : (_sub$attach = sub.attach) === null || _sub$attach === void 0 ? void 0 : _sub$attach.length) > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_3__["default"], {
                  children: sub === null || sub === void 0 ? void 0 : (_sub$attach2 = sub.attach) === null || _sub$attach2 === void 0 ? void 0 : _sub$attach2.map(function (file) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_3__["default"].Preview, {
                      fileName: file === null || file === void 0 ? void 0 : file.name,
                      downloadAble: true,
                      deleteAble: false,
                      downloadUrl: file === null || file === void 0 ? void 0 : file.url,
                      previewUrl: file === null || file === void 0 ? void 0 : file.url,
                      fileType: file === null || file === void 0 ? void 0 : file.type,
                      ext: ""
                    }, file === null || file === void 0 ? void 0 : file.name);
                  })
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  style: {
                    color: "rgb(180, 188, 196)"
                  },
                  children: "No Attachment is available"
                })]
              })]
            })
          })]
        })
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmittedTaskViewModal);

/***/ })

}]);
//# sourceMappingURL=resources_js_components_single-task_section_sub-task_preview_SubmittedTaskViewModal_jsx.js.map