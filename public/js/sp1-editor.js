/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./resources/js/sp1-editor.js ***!
  \************************************/
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var SP1Editor = /*#__PURE__*/function () {
  function SP1Editor(props) {
    _classCallCheck(this, SP1Editor);
    this.targetId = props;
    this.init = this.init.bind(this);
    this.toolbar = this.toolbar.bind(this);
    this.getTextNodes = this.getTextNodes.bind(this);
    this.boldButton = this.boldButton.bind(this);
  }
  _createClass(SP1Editor, [{
    key: "getTextNodes",
    value: function getTextNodes(range) {
      var textNodes = [];
      var walker = document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, null, false);
      var currentNode = range.startContainer;
      while (currentNode) {
        if (range.startContainer === range.endContainer) {
          if (currentNode === range.startContainer) {
            var startIndex = range.startOffset;
            var endIndex = range.endOffset;
            var nodeText = currentNode.textContent;
            var textNode = document.createTextNode(nodeText.substring(startIndex, endIndex));
            textNodes.push(textNode);
          }
          break;
        }
        if (currentNode === range.startContainer) {
          var _startIndex = range.startOffset;
          var _nodeText = currentNode.textContent;
          var _textNode = document.createTextNode(_nodeText.substring(_startIndex));
          textNodes.push(_textNode);
        } else if (currentNode === range.endContainer) {
          var _endIndex = range.endOffset;
          var _nodeText2 = currentNode.textContent;
          var _textNode2 = document.createTextNode(_nodeText2.substring(0, _endIndex));
          textNodes.push(_textNode2);
        } else {
          textNodes.push(currentNode);
        }
        currentNode = walker.nextNode();
      }
      return textNodes;
    }
  }, {
    key: "getSelectionWithinNode",
    value: function getSelectionWithinNode(node) {
      var selection = window.getSelection();
      var range = selection.getRangeAt(0);
      var commonAncestor = range.commonAncestorContainer;
      console.log({
        commonAncestor: commonAncestor,
        node: node
      });
      if (node.contains(commonAncestor)) {
        return range;
      }

      // The selection is not within the provided node
      return null;
    }

    // bold text
  }, {
    key: "boldButton",
    value: function boldButton(editAbleContainer) {
      var boldBtn = document.createElement('button');
      boldBtn.classList.add('sp1_editor-toolbar--btn');
      // boldBtn.classList.add('active');
      // icons
      var icon = document.createElement('i');
      icon.classList.add('fa-solid');
      icon.classList.add('fa-bold');
      var getTextNodes = this.getTextNodes;
      var getSelectionWithinNode = this.getSelectionWithinNode;

      // is selected
      function isSelectionBold(range) {
        var textNodes = getTextNodes(range);
        var _iterator = _createForOfIteratorHelper(textNodes),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var node = _step.value;
            var parentNode = node.parentNode;
            if (parentNode && parentNode.nodeType === Node.ELEMENT_NODE && (parentNode.tagName === 'B' || parentNode.style.fontWeight === 'bold')) {
              return true;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return false;
      }
      function removeBoldFormatting(range) {
        var textNodes = getTextNodes(range);
        var _iterator2 = _createForOfIteratorHelper(textNodes),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var node = _step2.value;
            var parentNode = node.parentNode;
            console.log({
              parentNode: parentNode
            });
            if (parentNode && parentNode.tagName === 'B') {
              var parentClone = parentNode.cloneNode(false);
              console.log({
                parentClone: parentClone
              });
              while (parentNode.firstChild) {
                parentClone.appendChild(parentNode.firstChild);
              }
              parentNode.parentNode.replaceChild(parentClone, parentNode);
            } else if (parentNode && parentNode.style.fontWeight === 'bold') {
              parentNode.style.fontWeight = 'normal';
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      // click handle
      boldBtn.addEventListener('click', function () {
        var range = getSelectionWithinNode(editAbleContainer);
        if (!range) return;
        if (!isSelectionBold(range)) {
          boldBtn.classList.add('active');
          var boldElement = document.createElement('b');
          boldElement.textContent = range.toString();
          range.deleteContents();
          range.insertNode(boldElement);
        } else {
          removeBoldFormatting(range);
          boldBtn.classList.remove('active');
        }
      });
      boldBtn.append(icon);
      return boldBtn;
    }

    // heading text dropdown
  }, {
    key: "headingText",
    value: function headingText() {
      var dropdown = document.createElement('div');

      // add some closes
      dropdown.classList.add('sp1_editor-dropdown');

      // toggle
      var toggle = document.createElement('div');
      toggle.classList.add('sp1_editor-dropdown--toggle');
      toggle.innerHTML = "\n            <i class=\"fa-solid fa-heading\"></i>\n            <i class=\"fa-solid fa-caret-down\"></i>\n        ";
      var list = [{
        id: 'normal',
        name: "Normal"
      }, {
        id: 'h1',
        name: "Heading 1 (h1)"
      }, {
        id: 'h2',
        name: "Heading 2 (h2)"
      }, {
        id: 'h3',
        name: "Heading 3 (h3)"
      }, {
        id: 'h4',
        name: 'Heading 4 (h4)'
      }, {
        id: 'h5',
        name: 'Heading 5 (h5)'
      }, {
        id: 'h6',
        name: 'Heading 6 (h6)'
      }];

      // render li list
      listItem = function listItem(_ref) {
        var id = _ref.id,
          name = _ref.name;
        var li = document.createElement('li');
        li.classList.add('sp1_editor-dropdown--menu-item');
        li.classList.add(id);
        li.innerText = name;
        return li;
      };
      var ul = document.createElement('ul');
      ul.classList.add('sp1_editor-dropdown--menu');
      ul.setAttribute('tab-index', 0);
      list.map(function (i) {
        return ul.append(listItem(i));
      });
      toggle.addEventListener('click', function () {
        ul.classList.toggle('show');
        toggle.classList.add('active');
        var outsideClickListener = function outsideClickListener(event) {
          if (!dropdown.contains(event.target)) {
            ul.classList.remove('show');
            toggle.classList.remove('active');
            window.removeEventListener('mousedown', outsideClickListener);
          }
        };
        window.addEventListener('mousedown', outsideClickListener);
      });

      // append
      dropdown.append(toggle);
      dropdown.append(ul);
      return dropdown;
    }

    // italic
  }, {
    key: "italicButton",
    value: function italicButton() {
      var italicBtn = document.createElement('button');
      italicBtn.classList.add('sp1_editor-toolbar--btn');

      // icons
      var icon = document.createElement('i');
      icon.classList.add('fa-solid');
      icon.classList.add('fa-italic');

      // click handle
      italicBtn.addEventListener('click', function () {
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        var italicElement = document.createElement('i');
        italicElement.textContent = range.toString();
        range.deleteContents();
        range.insertNode(italicElement);
      });
      italicBtn.append(icon);
      return italicBtn;
    }

    // link 
  }, {
    key: "linkButton",
    value: function linkButton() {
      var linkBtn = document.createElement('button');
      linkBtn.classList.add('sp1_editor-toolbar--btn');

      // icons
      var icon = document.createElement('i');
      icon.classList.add('fa-solid');
      icon.classList.add('fa-link');
      linkBtn.append(icon);
      return linkBtn;
    }

    // image 
  }, {
    key: "imageButton",
    value: function imageButton() {
      var imageBtn = document.createElement('button');
      imageBtn.classList.add('sp1_editor-toolbar--btn');

      // icons
      var icon = document.createElement('i');
      icon.classList.add('fa-solid');
      icon.classList.add('fa-image');
      imageBtn.append(icon);
      return imageBtn;
    }

    // code  
  }, {
    key: "codeButton",
    value: function codeButton() {
      var codeButton = document.createElement('button');
      codeButton.classList.add('sp1_editor-toolbar--btn');

      // icons
      var icon = document.createElement('i');
      icon.classList.add('fa-solid');
      icon.classList.add('fa-code');
      codeButton.append(icon);
      return codeButton;
    }

    // quote  
  }, {
    key: "quoteButton",
    value: function quoteButton() {
      var quoteBtn = document.createElement('button');
      quoteBtn.classList.add('sp1_editor-toolbar--btn');

      // icons
      var icon = document.createElement('i');
      icon.classList.add('fa-solid');
      icon.classList.add('fa-quote-left');
      quoteBtn.append(icon);
      return quoteBtn;
    }
  }, {
    key: "leftAlignButton",
    value:
    // align   
    function leftAlignButton() {
      var alignBtn = document.createElement('button');
      alignBtn.classList.add('sp1_editor-toolbar--btn');

      // icons
      var icon = document.createElement('i');
      icon.classList.add('fa-solid');
      icon.classList.add('fa-align-left');
      alignBtn.append(icon);
      return alignBtn;
    }
  }, {
    key: "centerAlignButton",
    value: function centerAlignButton() {
      var alignBtn = document.createElement('button');
      alignBtn.classList.add('sp1_editor-toolbar--btn');

      // icons
      var icon = document.createElement('i');
      icon.classList.add('fa-solid');
      icon.classList.add('fa-align-center');
      alignBtn.append(icon);
      return alignBtn;
    }
  }, {
    key: "rightAlignButton",
    value: function rightAlignButton() {
      var alignBtn = document.createElement('button');
      alignBtn.classList.add('sp1_editor-toolbar--btn');

      // icons
      var icon = document.createElement('i');
      icon.classList.add('fa-solid');
      icon.classList.add('fa-align-right');
      alignBtn.append(icon);
      return alignBtn;
    }
  }, {
    key: "emojiButton",
    value:
    // emoji
    function emojiButton() {
      var emojiBtn = document.createElement('button');
      emojiBtn.classList.add('sp1_editor-toolbar--btn');

      // icons
      var icon = document.createElement('i');
      icon.classList.add('fa-regular');
      icon.classList.add('fa-face-smile');
      emojiBtn.append(icon);
      return emojiBtn;
    }

    // list
  }, {
    key: "orderListButton",
    value: function orderListButton() {
      var orderListBtn = document.createElement('button');
      orderListBtn.classList.add('sp1_editor-toolbar--btn');

      // icons
      var icon = document.createElement('i');
      icon.classList.add('fa-solid');
      icon.classList.add('fa-list-ol');
      orderListBtn.append(icon);
      return orderListBtn;
    }
  }, {
    key: "unOrderListButton",
    value: function unOrderListButton() {
      var unOrderListBtn = document.createElement('button');
      unOrderListBtn.classList.add('sp1_editor-toolbar--btn');

      // icons
      var icon = document.createElement('i');
      icon.classList.add('fa-solid');
      icon.classList.add('fa-list-ul');
      unOrderListBtn.append(icon);
      return unOrderListBtn;
    }
  }, {
    key: "toolbar",
    value:
    // toolbar 
    function toolbar(editAbleContainer) {
      var toolbarWrapper = document.createElement('div');
      // class
      toolbarWrapper.classList.add('sp1_editor-toolbar');
      function divider() {
        var divider = document.createElement('div');
        divider.classList.add('sp1_editor-toolbar--div');
        toolbarWrapper.append(divider);
      }
      var boldButton = this.boldButton(editAbleContainer);
      var header = this.headingText();
      var italic = this.italicButton();
      var linkBtn = this.linkButton();
      var image = this.imageButton();
      var code = this.codeButton();
      var quote = this.quoteButton();
      var leftAlignBtn = this.leftAlignButton();
      var rightAlignBtn = this.rightAlignButton();
      var centerAlignBtn = this.centerAlignButton();
      var emojiBtn = this.emojiButton();
      var olList = this.orderListButton();
      var ulList = this.unOrderListButton();

      // append
      toolbarWrapper.append(header);
      divider();
      toolbarWrapper.append(boldButton);
      toolbarWrapper.append(italic);
      toolbarWrapper.append(linkBtn);
      toolbarWrapper.append(image);
      divider();
      toolbarWrapper.append(olList);
      toolbarWrapper.append(ulList);
      divider();
      toolbarWrapper.append(leftAlignBtn);
      toolbarWrapper.append(centerAlignBtn);
      toolbarWrapper.append(rightAlignBtn);
      divider();
      toolbarWrapper.append(code);
      toolbarWrapper.append(quote);
      toolbarWrapper.append(emojiBtn);
      return toolbarWrapper;
    }
  }, {
    key: "init",
    value: function init(_ref2) {
      var defaultValue = _ref2.defaultValue;
      // create a text area 
      var container = document.querySelector("#".concat(this.targetId));
      var name = container.getAttribute('name');
      console.log(name);
      container.classList.add('sp1_editor');
      var textArea = document.createElement('textarea');
      textArea.classList.add('sp1_editor--textarea');
      textArea.setAttribute('name', name);
      textArea.innerHTML = defaultValue;
      textArea.setAttribute('style', 'height:0;display:none');

      // create editable container
      var editAbleContainer = document.createElement('div');
      editAbleContainer.setAttribute('contenteditable', true);
      editAbleContainer.classList.add('sp1_editor--content');
      if (defaultValue) {
        editAbleContainer.innerHTML = "<p>".concat(defaultValue, "</p>");
      }
      editAbleContainer.addEventListener('input', function (e) {
        var updatedContent = e.target.innerHTML;
        console.log('Content changed:', updatedContent);
      });
      var toolbar = this.toolbar(editAbleContainer);
      container.appendChild(toolbar);
      container.appendChild(textArea);
      container.appendChild(editAbleContainer);
    }
  }]);
  return SP1Editor;
}();
window.SP1Editor = SP1Editor;
/******/ })()
;
//# sourceMappingURL=sp1-editor.js.map