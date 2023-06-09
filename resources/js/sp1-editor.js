
class SP1Editor {
    constructor(props){ 
        this.targetId = props;
        this.init = this.init.bind(this);
        this.toolbar = this.toolbar.bind(this);
        this.getTextNodes = this.getTextNodes.bind(this);
        this.boldButton= this.boldButton.bind(this);
    }


    getTextNodes(range) { 

        const textNodes = [];
        const walker = document.createTreeWalker(
          range.commonAncestorContainer,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );
      
        let currentNode = range.startContainer;
        while (currentNode) {
          if (range.startContainer === range.endContainer) {
            if (currentNode === range.startContainer) {
              const startIndex = range.startOffset;
              const endIndex = range.endOffset;
              const nodeText = currentNode.textContent;
              const textNode = document.createTextNode(nodeText.substring(startIndex, endIndex));
              textNodes.push(textNode);
            }
            break;
          }
      
          if (currentNode === range.startContainer) {
            const startIndex = range.startOffset;
            const nodeText = currentNode.textContent;
            const textNode = document.createTextNode(nodeText.substring(startIndex));
            textNodes.push(textNode);
          } else if (currentNode === range.endContainer) {
            const endIndex = range.endOffset;
            const nodeText = currentNode.textContent;
            const textNode = document.createTextNode(nodeText.substring(0, endIndex));
            textNodes.push(textNode);
          } else {
            textNodes.push(currentNode);
          }
      
          currentNode = walker.nextNode();
        }
      
        return textNodes;
      }



      getSelectionWithinNode(node) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const commonAncestor = range.commonAncestorContainer;
        console.log({commonAncestor, node})
      
        if (node.contains(commonAncestor)) { 
            return range; 
        }
      
        // The selection is not within the provided node
        return null;
      }
    

    // bold text
    boldButton(editAbleContainer){
        const boldBtn = document.createElement('button');   
        boldBtn.classList.add('sp1_editor-toolbar--btn');
        // boldBtn.classList.add('active');
        // icons
        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-bold');

        const getTextNodes = this.getTextNodes;

       const getSelectionWithinNode = this.getSelectionWithinNode;
        

        
        // is selected
        function isSelectionBold(range) {
            const textNodes = getTextNodes(range); 
            
            for (const node of textNodes) {
              const parentNode = node.parentNode;
              if (parentNode && parentNode.nodeType === Node.ELEMENT_NODE && (parentNode.tagName === 'B' || parentNode.style.fontWeight === 'bold')) {
                return true;
              }
            }
            
            return false;
        }

        function removeBoldFormatting(range) {
            const textNodes = getTextNodes(range);
            
            for (const node of textNodes) {
              const parentNode = node.parentNode;
              console.log({parentNode})
              if (parentNode && parentNode.tagName === 'B') {
                const parentClone = parentNode.cloneNode(false);
                console.log({parentClone})
                while (parentNode.firstChild) {
                  parentClone.appendChild(parentNode.firstChild);
                }


                parentNode.parentNode.replaceChild(parentClone, parentNode);

                
              } else if (parentNode && parentNode.style.fontWeight === 'bold') {
                parentNode.style.fontWeight = 'normal';
              }
            }
          }
          


        // click handle
        boldBtn.addEventListener('click', () => {
            const range = getSelectionWithinNode(editAbleContainer);
            if(!range) return; 

            if(!isSelectionBold(range)){
                boldBtn.classList.add('active')
                const boldElement = document.createElement('b');
                boldElement.textContent = range.toString();

                range.deleteContents();
                range.insertNode(boldElement);

            }else{
                removeBoldFormatting(range);  
                boldBtn.classList.remove('active');
            }  

            
        })

        boldBtn.append(icon);
        return boldBtn;
    }


    // heading text dropdown
    headingText(){
        const dropdown = document.createElement('div');

        // add some closes
        dropdown.classList.add('sp1_editor-dropdown');


        // toggle
        const toggle = document.createElement('div');
        toggle.classList.add('sp1_editor-dropdown--toggle');
        toggle.innerHTML = `
            <i class="fa-solid fa-heading"></i>
            <i class="fa-solid fa-caret-down"></i>
        `

        const list = [
            {id: 'normal', name: "Normal"},
            {id: 'h1', name: "Heading 1 (h1)"},
            {id: 'h2', name: "Heading 2 (h2)"},
            {id: 'h3', name: "Heading 3 (h3)"},
            {id: 'h4', name: 'Heading 4 (h4)'},
            {id: 'h5', name: 'Heading 5 (h5)'},
            {id: 'h6', name: 'Heading 6 (h6)'},
        ];


        // render li list
        listItem = ({id, name}) => {
            const li = document.createElement('li');
            li.classList.add('sp1_editor-dropdown--menu-item');
            li.classList.add(id);
            li.innerText = name;

            return li;
        }

        const ul = document.createElement('ul');
        ul.classList.add('sp1_editor-dropdown--menu');
        ul.setAttribute('tab-index', 0);

        list.map(i => ul.append(listItem(i)));


        toggle.addEventListener('click', () => {
            ul.classList.toggle('show');
            toggle.classList.add('active');

            const outsideClickListener = (event) => {
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
    italicButton(){
        const italicBtn = document.createElement('button');   
        italicBtn.classList.add('sp1_editor-toolbar--btn')


        // icons
        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-italic');

        // click handle
        italicBtn.addEventListener('click', () => {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);

            const italicElement = document.createElement('i');
            italicElement.textContent = range.toString();

            range.deleteContents();
            range.insertNode(italicElement);
        })


        italicBtn.append(icon);
        return italicBtn;
    }


    // link 
    linkButton(){
        const linkBtn = document.createElement('button');   
        linkBtn.classList.add('sp1_editor-toolbar--btn')


        // icons
        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-link');


        linkBtn.append(icon);
        return linkBtn;
    }


     // image 
     imageButton(){
        const imageBtn = document.createElement('button');   
        imageBtn.classList.add('sp1_editor-toolbar--btn')


        // icons
        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-image');


        imageBtn.append(icon);
        return imageBtn;
    }


    // code  
    codeButton(){
       const codeButton = document.createElement('button');   
       codeButton.classList.add('sp1_editor-toolbar--btn')


       // icons
       const icon = document.createElement('i');
       icon.classList.add('fa-solid');
       icon.classList.add('fa-code');


       codeButton.append(icon);
       return codeButton;
   }

       // quote  
    quoteButton(){
        const quoteBtn = document.createElement('button');   
        quoteBtn.classList.add('sp1_editor-toolbar--btn')
 
 
        // icons
        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-quote-left');
 
 
        quoteBtn.append(icon);
        return quoteBtn;
    };


    // align   
    leftAlignButton(){
        const alignBtn = document.createElement('button');   
        alignBtn.classList.add('sp1_editor-toolbar--btn')
 
 
        // icons
        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-align-left');
 
 
        alignBtn.append(icon);
        return alignBtn;
    };


    centerAlignButton(){
        const alignBtn = document.createElement('button');   
        alignBtn.classList.add('sp1_editor-toolbar--btn')
 
 
        // icons
        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-align-center');
 
 
        alignBtn.append(icon);
        return alignBtn;
    };

    rightAlignButton(){
        const alignBtn = document.createElement('button');   
        alignBtn.classList.add('sp1_editor-toolbar--btn')
 
 
        // icons
        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-align-right');
 
 
        alignBtn.append(icon);
        return alignBtn;
    };


    // emoji
    emojiButton (){ 
        const emojiBtn = document.createElement('button');   
        emojiBtn.classList.add('sp1_editor-toolbar--btn')
    
    
        // icons
        const icon = document.createElement('i');
        icon.classList.add('fa-regular');
        icon.classList.add('fa-face-smile');
    
    
        emojiBtn.append(icon);
        return emojiBtn; 
    }

    // list
    orderListButton(){
        const orderListBtn = document.createElement('button');   
        orderListBtn.classList.add('sp1_editor-toolbar--btn')
    
    
        // icons
        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-list-ol');
    
    
        orderListBtn.append(icon);
        return orderListBtn;         
    };

    unOrderListButton(){
        const unOrderListBtn = document.createElement('button');   
        unOrderListBtn.classList.add('sp1_editor-toolbar--btn')
    
    
        // icons
        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-list-ul');
    
    
        unOrderListBtn.append(icon);
        return unOrderListBtn;         
    };


    // toolbar 
    toolbar(editAbleContainer){
        const toolbarWrapper = document.createElement('div');
        // class
        toolbarWrapper.classList.add('sp1_editor-toolbar'); 

        function divider(){
            const divider = document.createElement('div');
            divider.classList.add('sp1_editor-toolbar--div'); 

            toolbarWrapper.append(divider);
        }


        const boldButton = this.boldButton(editAbleContainer); 
        const header = this.headingText();
        const italic = this.italicButton();
        const linkBtn = this.linkButton();
        const image = this.imageButton();
        const code= this.codeButton();
        const quote= this.quoteButton();
        const leftAlignBtn = this.leftAlignButton();
        const rightAlignBtn = this.rightAlignButton();
        const centerAlignBtn = this.centerAlignButton();
        const emojiBtn = this.emojiButton();
        const olList = this.orderListButton();
        const ulList = this.unOrderListButton();


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


    
    init({defaultValue}){
        // create a text area 
        const container = document.querySelector(`#${this.targetId}`);
        const name = container.getAttribute('name');
        console.log(name)
        container.classList.add('sp1_editor')

        const textArea = document.createElement('textarea');
        textArea.classList.add('sp1_editor--textarea');
        textArea.setAttribute('name', name);
        textArea.innerHTML = defaultValue;
        textArea.setAttribute('style', 'height:0;display:none');


        // create editable container
        const editAbleContainer = document.createElement('div');
        editAbleContainer.setAttribute('contenteditable', true);
        editAbleContainer.classList.add('sp1_editor--content');

        if(defaultValue){
            editAbleContainer.innerHTML = `<p>${defaultValue}</p>`;
        }


        editAbleContainer.addEventListener('input', e => {
            const updatedContent = e.target.innerHTML;
        

            console.log('Content changed:', updatedContent);
        })

        
        
        const toolbar = this.toolbar(editAbleContainer);

        container.appendChild(toolbar)
        container.appendChild(textArea);
        container.appendChild(editAbleContainer);
        
    }



}

window.SP1Editor = SP1Editor;