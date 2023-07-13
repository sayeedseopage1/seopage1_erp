"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_single-task_section_task-actions_Revision_RevisionModal_jsx"],{

/***/ "./resources/js/components/single-task/section/task-actions/Revision/RevisionModal.jsx":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/single-task/section/task-actions/Revision/RevisionModal.jsx ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ckeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../ckeditor */ "./resources/js/components/ckeditor/index.jsx");
/* harmony import */ var _components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Button */ "./resources/js/components/single-task/components/Button.jsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/useClickAway.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var RevisionModal = function RevisionModal(_ref) {
  var isOpen = _ref.isOpen,
    close = _ref.close,
    onSubmitForm = _ref.onSubmitForm,
    _ref$isSubmitting = _ref.isSubmitting,
    isSubmitting = _ref$isSubmitting === void 0 ? false : _ref$isSubmitting,
    task = _ref.task;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    reason = _useState2[0],
    setReason = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    reasonError = _useState4[0],
    setReasonError = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    comment = _useState6[0],
    setComment = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    commentError = _useState8[0],
    setCommentError = _useState8[1];
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // outside click
  (0,react_use__WEBPACK_IMPORTED_MODULE_4__["default"])(ref, close);

  // radio button change
  var handleChange = function handleChange(e) {
    e.preventDefault();
    setReason(e.target.value);
  };

  // editor change text 
  var hanldeEditorTextChange = function hanldeEditorTextChange(editor) {
    var data = editor.getData();
    setComment(data);
  };

  // validation
  var validate = function validate() {
    var errorCount = 0;
    if (!comment || comment === "") {
      errorCount++;
      setCommentError('You have to explain the revision in details, so that lead developer/developer can understand where they need to work.');
    }
    if (!reason) {
      errorCount++;
      setCommentError('You have to select a reason from below options');
    }
    return errorCount === 0;
  };

  // handle submiton
  var handleSubmition = function handleSubmition(e) {
    e.preventDefault();
    var data = {
      task_id: task === null || task === void 0 ? void 0 : task.id,
      reason: reason,
      comment: comment
    };
    if (validate) {
      console.log(data);
    } else {
      console.log('Your forgot to fillup some requried fields');
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      ref: ref,
      className: "sp1_single_task--modal-panel",
      style: {
        maxWidth: "550px"
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "border-bottom pb-2 px-3 mb-3 d-flex align-items-center justify-content-between",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "font-weight-bold f-14",
          children: ["Revision - Task: ", task === null || task === void 0 ? void 0 : task.id, "#", (task === null || task === void 0 ? void 0 : task.title) || (task === null || task === void 0 ? void 0 : task.heading)]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
          onClick: close,
          className: "",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("i", {
            className: "fa-solid fa-xmark"
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("form", {
        className: "px-3",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
            htmlFor: "",
            className: "font-weight-bold",
            children: ["Select Reason for Revision", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("sup", {
              className: "f-16",
              children: "*"
            }), " :"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "px-3",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              className: "form-check d-flex align-items-start mb-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
                className: "form-check-input mr-2",
                type: "radio",
                name: "exampleRadios",
                id: "exampleRadios1",
                required: true,
                value: "Task Has Revision Because Requirements Are\r Not Fullfilled Accordiong To My Instructions",
                style: {
                  width: "16px",
                  height: "16px",
                  marginTop: "3px"
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
                className: "form-check-label",
                htmlFor: "exampleRadios1",
                style: {
                  marginBottom: "3px"
                },
                children: "Task Has Revision Because Requirements Are Not Fullfilled Accordiong To My Instructions"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              className: "form-check d-flex align-items-start mb-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
                className: "form-check-input mr-2",
                type: "radio",
                name: "exampleRadios",
                id: "exampleRadios2",
                required: true,
                value: "Task Has Revision Because I Have Customized\r Previous Instructions",
                style: {
                  width: "16px",
                  height: "16px",
                  marginTop: "3px"
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
                className: "form-check-label",
                htmlFor: "exampleRadios2",
                style: {
                  marginBottom: "3px"
                },
                children: "Task Has Revision Because I Have Customized Previous Instructions"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              className: "form-check d-flex align-items-start mb-2",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("input", {
                className: "form-check-input mr-2",
                type: "radio",
                name: "exampleRadios",
                id: "exampleRadios3",
                required: true,
                value: "Task Has Revision Because I Have Added\r Additional Instructions To Previous\r Instructions",
                style: {
                  width: "16px",
                  height: "16px",
                  marginTop: "3px"
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
                className: "form-check-label mb-1",
                htmlFor: "exampleRadios3",
                style: {
                  marginBottom: "3px"
                },
                children: "Task Has Revision Because I Have Added Additional Instructions To Previous Instructions"
              })]
            })]
          }), reasonError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("small", {
            id: "emailHelp",
            className: "form-text text-danger",
            children: reasonError
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "form-group",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("label", {
            htmlFor: "",
            className: "font-weight-bold",
            children: ["Explain or Comment", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("sup", {
              className: "f-16",
              children: "*"
            }), " :"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
            className: "ck-editor-holder",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ckeditor__WEBPACK_IMPORTED_MODULE_1__["default"], {
              onChange: hanldeEditorTextChange
            })
          }), commentError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("small", {
            id: "emailHelp",
            className: "form-text text-danger",
            children: commentError
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "mt-3 d-flex align-items-center",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
              onClick: close,
              variant: "tertiary",
              className: "ml-auto mr-2",
              children: "Close"
            }), !isSubmitting ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                onClick: handleSubmition,
                children: "Submit"
              })
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
                className: "cursor-processing",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                  className: "spinner-border text-white",
                  role: "status",
                  style: {
                    width: "18px",
                    height: "18px"
                  }
                }), " ", "Processing..."]
              })
            })]
          })
        })]
      })]
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RevisionModal);

/***/ })

}]);
//# sourceMappingURL=resources_js_components_single-task_section_task-actions_Revision_RevisionModal_jsx.js.map