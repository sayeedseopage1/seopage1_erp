"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_react_single-independent-task_section_sub-task_preview_SubmittedWorkItem_jsx"],{

/***/ "./resources/js/react/single-independent-task/section/sub-task/preview/SubmittedTaskViewModal.jsx":
/*!********************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/sub-task/preview/SubmittedTaskViewModal.jsx ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Modal */ "./resources/js/react/single-independent-task/components/Modal.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/react/single-independent-task/components/Button.jsx");
/* harmony import */ var _file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../file-upload/FileUploader */ "./resources/js/react/file-upload/FileUploader.jsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _global_Avatar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../global/Avatar */ "./resources/js/react/global/Avatar.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");








var SubmittedTaskViewModal = function SubmittedTaskViewModal(_ref) {
  var _sub$submittedLinkes;
  var isOpen = _ref.isOpen,
    close = _ref.close,
    submittedTask = _ref.submittedTask,
    user = _ref.user,
    isLoading = _ref.isLoading;
  var sub = submittedTask;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Modal__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: "d-flex align-items-center justify-content-center",
      isOpen: isOpen,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "sp1-subtask-form --modal-panel --modal-submitted sp1-sumittion_task_modal-view",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
            className: "sp1-subtask-form --modal-panel-header",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "d-flex align-items-center",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h6", {
                children: "Submitted Task "
              }), isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "spinner-border text-dark ml-2",
                role: "status",
                style: {
                  width: "16px",
                  height: "16px",
                  border: "0.14em solid rgba(0, 0, 0, .25)",
                  borderRightColor: "transparent"
                }
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
              "aria-label": "close-modal",
              className: "_close-modal",
              onClick: close,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("i", {
                className: "fa-solid fa-xmark"
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "sp1-subtask-form --modal-panel-body --modal-submitted-body",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
              className: "mt-3 d-flex flex-column",
              style: {
                gap: "10px"
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  className: "fs-14 font-weight-bold d-block mb-3",
                  style: {
                    color: "#767581"
                  },
                  children: "Submitted By"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                  className: "d-flex align-items-center",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_global_Avatar__WEBPACK_IMPORTED_MODULE_5__["default"], {
                      type: "circle",
                      src: user === null || user === void 0 ? void 0 : user.avatar,
                      alt: user === null || user === void 0 ? void 0 : user.name,
                      name: user === null || user === void 0 ? void 0 : user.name
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                    className: "d-flex flex-column px-2",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
                      className: "text-underline text-primary",
                      href: user === null || user === void 0 ? void 0 : user.profile,
                      style: {
                        color: "#767581"
                      },
                      children: user === null || user === void 0 ? void 0 : user.name
                    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
                      className: "d-block",
                      style: {
                        color: "#767581"
                      },
                      children: [sub === null || sub === void 0 ? void 0 : sub.getSubmittionDate(), " at", " ", sub === null || sub === void 0 ? void 0 : sub.getSubmittionDate("hh:mm a")]
                    })]
                  })]
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "d-flex flex-column mt-3",
                style: {
                  gap: "10px"
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  className: "d-block fs-14 font-weight-bold",
                  style: {
                    color: "#767581"
                  },
                  children: "Links"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("ul", {
                  style: {
                    listStyle: "unset",
                    marginLeft: "30px"
                  },
                  children: sub === null || sub === void 0 || (_sub$submittedLinkes = sub.submittedLinkes) === null || _sub$submittedLinkes === void 0 ? void 0 : _sub$submittedLinkes.map(function (link, i) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("li", {
                      style: {
                        listStyle: "unset"
                      },
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("a", {
                        href: link,
                        className: "hover-underline text-primary",
                        target: "_blank",
                        children: link
                      })
                    }, "".concat(link, "-").concat(i));
                  })
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "mt-2 mt-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  className: "d-block fs-12 font-weight-bold mb-2",
                  style: {
                    color: "#767581"
                  },
                  children: "Description"
                }), sub !== null && sub !== void 0 && sub.explaination ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                  className: "sp1_ck_content",
                  dangerouslySetInnerHTML: {
                    __html: sub === null || sub === void 0 ? void 0 : sub.explaination
                  }
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  style: {
                    color: "rgb(180, 188, 196)"
                  },
                  children: "No description is available"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
                className: "mt-3",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  className: "d-block fs-12 font-weight-bold mb-2",
                  style: {
                    color: "#767581"
                  },
                  children: "Attached Files"
                }), lodash__WEBPACK_IMPORTED_MODULE_4___default().size(sub === null || sub === void 0 ? void 0 : sub.attaches) > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_3__["default"], {
                  children: lodash__WEBPACK_IMPORTED_MODULE_4___default().map(sub === null || sub === void 0 ? void 0 : sub.attaches, function (file, index) {
                    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_file_upload_FileUploader__WEBPACK_IMPORTED_MODULE_3__["default"].Preview, {
                      fileName: file,
                      downloadAble: true,
                      deleteAble: false,
                      downloadUrl: "/storage/TaskSubmission/".concat(file),
                      previewUrl: "/storage/TaskSubmission/".concat(file),
                      fileType: lodash__WEBPACK_IMPORTED_MODULE_4___default().includes(["png", "jpg", "jpeg", "gif", "svg"], lodash__WEBPACK_IMPORTED_MODULE_4___default().last(lodash__WEBPACK_IMPORTED_MODULE_4___default().split(file, '.'))) ? 'images' : 'others',
                      ext: ""
                    }, "".concat(file, "_").concat(index));
                  })
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  className: "",
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

/***/ }),

/***/ "./resources/js/react/single-independent-task/section/sub-task/preview/SubmittedWorkItem.jsx":
/*!***************************************************************************************************!*\
  !*** ./resources/js/react/single-independent-task/section/sub-task/preview/SubmittedWorkItem.jsx ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_single_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/single-task */ "./resources/js/react/utils/single-task.js");
/* harmony import */ var _SubmittedTaskViewModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SubmittedTaskViewModal */ "./resources/js/react/single-independent-task/section/sub-task/preview/SubmittedTaskViewModal.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var SubmittedWorkItem = function SubmittedWorkItem(_ref) {
  var data = _ref.data,
    isLoading = _ref.isLoading;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    showModal = _useState2[0],
    setShowModal = _useState2[1];
  var sub = new _utils_single_task__WEBPACK_IMPORTED_MODULE_1__.SubmittedWork(data);
  var user = sub === null || sub === void 0 ? void 0 : sub.user;

  // toggle modal
  var toggleModal = function toggleModal(e) {
    e.preventDefault();
    setShowModal(!showModal);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "d-flex align-items-center justify-content-between sp1_task_modal-view_item py-2",
      styte: {
        gap: "16px",
        fontSize: "14px"
      },
      onClick: function onClick() {
        return setShowModal(true);
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("a", {
          href: "/account/tasks/".concat(sub === null || sub === void 0 ? void 0 : sub.id),
          onClick: function onClick(e) {
            return e.stopPropagation();
          },
          className: "hover-underline text-primary",
          children: ["Task#", sub === null || sub === void 0 ? void 0 : sub.id]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("span", {
          children: [" (", sub === null || sub === void 0 ? void 0 : sub.submittionNo, ") submitted by "]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
          href: user === null || user === void 0 ? void 0 : user.profile,
          onClick: function onClick(e) {
            return e.stopPropagation();
          },
          className: "hover-underline text-primary",
          children: user === null || user === void 0 ? void 0 : user.name
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        children: [sub === null || sub === void 0 ? void 0 : sub.getSubmittionDate(), " at", " ", sub === null || sub === void 0 ? void 0 : sub.getSubmittionDate("hh:mm a")]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "d-flex align-items-center",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("a", {
          className: "mr-2 py-2 sp1_task_righ_action_btn",
          onClick: toggleModal,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
            className: "fa-regular fa-eye"
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_SubmittedTaskViewModal__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isOpen: showModal,
      close: function close() {
        return setShowModal(false);
      },
      submittedTask: sub,
      user: user,
      isLoading: isLoading
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubmittedWorkItem);

/***/ })

}]);
//# sourceMappingURL=resources_js_react_single-independent-task_section_sub-task_preview_SubmittedWorkItem_jsx.js.map