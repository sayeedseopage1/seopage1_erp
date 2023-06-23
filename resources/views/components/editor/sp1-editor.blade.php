 
<style>
    .sp1_editor{
        border: 1px solid #d4d4d4;
    }

    .sp1_toolbar{
        width: 100%;
        background: #f1f1f1; 
        display: flex;
        align-items: center; 
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        padding: 3px;
    }
    
    .sp1_toolbar-btn{ 
        padding: 6px 10px; 
        height: 32px;
        width: fit-content;
        display: flex;
        align-items: center;
        justify-content: center; 
    }

    .sp1_toolbar-btn > i{
        font-size: 14px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        pointer-events: none;
    }

    .sp1_editor_content{
        min-height: 100px;
        height: 100%;
    }

    .sp1_toolbar-dd{
        position: relative;
    }

    .sp1_toolbar-dd.sp1_toolbar-btn {
        padding: 0;
    }

    .sp1_toolbar-dd--toggle{ 
        width: fit-content;
        padding: 6px 10px; 
        height: 32px;
        width: fit-content;
        border-right: 1px solid #e7e7e7;
    }
 
    .sp1_toolbar-dd--toggle > i{font-size: 12px}

    .sp1_toolbar-dd--toggle:hover,
    .sp1_toolbar-btn:hover{
        background: #e7e7e7;
        cursor: pointer;
    }

    .sp1_toolbar-dd--toggle.active{
        background: #e7e7e7; 
    }


    .sp1_toolbar-dd--menu{ 
        background: #fff;
        border-radius: 6px;
        position: absolute;
        top: 100%;
        left: 0;
        -ms-flex-direction: column;
        flex-direction: column; 
        display: none;    
        width: 150px;
        box-shadow: 0px 3px 3px rgba(0,0,0,.2);
    }

    .sp1_toolbar-dd--menu.show{
        display: flex;
    }

    .sp1_toolbar-dd--item{
        height: 32px;
        width: 100%;
        padding-inline: 10px;
        display: flex;
        align-items: center;
        font-size: 12px;
        text-align: left;
        justify-content: flex-start;
    }

    .sp1_toolbar-dd--item:hover{
        background: #e9ebec;
        cursor: pointer;
    }

    .sp1_toolbar-dd--item h1{
        font-size: 16px;
        margin: 0;
        padding: 0;
        font-weight: bold;
    }

    .sp1_toolbar-dd--item h2{
        font-size: 15px;
        margin: 0;
        padding: 0;
        font-weight: bold;
    }

    .sp1_toolbar-dd--item h3{
        font-size: 14px;
        margin: 0;
        padding: 0;
        font-weight: bold;
    }

    .sp1_toolbar-dd--item h4{
        font-size: 13px;
        margin: 0;
        padding: 0;
        font-weight: bold;
    }

    .sp1_toolbar-dd--item h5{
        font-size: 12px;
        margin: 0;
        padding: 0;
        font-weight: bold;
    }

    .sp1_toolbar-dd--item h6{
        font-size: 11px;
        margin: 0;
        padding: 0;
        font-weight: bold;
    }


    

    .sp1_editor_content{
        padding: 10px;
        overflow-y: auto;
    }

    .sp1_div{
        width: 1px;
        margin-inline: 10px;
        height: 28px;
        background-color: #e7e7e7;
    }

</style>


@props([
    'id'
])

    <div {{ $attributes->merge(['class' => 'sp1_editor'])}}>
        <div class="sp1_toolbar">
            <div class="sp1_toolbar-dd toolbar-head-btn">
                <div class="sp1_toolbar-dd--toggle" > Aa <i class="bi bi-chevron-expand"></i> </div>
                <ul class="sp1_toolbar-dd--menu">
                    <li class="sp1_toolbar-btn sp1_toolbar-dd--item" data-commaan="normal" > Normal </li>
                    <li class="sp1_toolbar-btn sp1_toolbar-dd--item" data-commaan="h1" > <h1>Heading 1 (h1) </h1> </li>
                    <li class="sp1_toolbar-btn sp1_toolbar-dd--item" data-commaan="h2" > <h2> Heading 2 (h2) </h2> </li>
                    <li class="sp1_toolbar-btn sp1_toolbar-dd--item" data-commaan="h3" > <h3> Heading 3 (h3) </h3> </li>
                    <li class="sp1_toolbar-btn sp1_toolbar-dd--item" data-commaan="h4" > <h4>Heading 4 (h4) </h4> </li>
                    <li class="sp1_toolbar-btn sp1_toolbar-dd--item" data-commaan="h5" > <h5> Heading 5 (h5) </h5> </li>
                    <li class="sp1_toolbar-btn sp1_toolbar-dd--item" data-commaan="h6" > <h6> Heading 6 (h6) </h6> </li>
                </ul>
            </div>
 
            <div class="sp1_toolbar-btn" data-command="bold"> <i class="fa-solid fa-bold"></i> </div> 
            <div class="sp1_toolbar-btn" data-command="italic"> <i class="fa-solid fa-italic"></i> </div> 
            <div class="sp1_toolbar-btn" data-command="link"> <i class="fa-solid fa-link"></i> </div> 
            <div class="sp1_toolbar-btn" data-command="image"> <i class="fa-regular fa-image"></i> </div> 
            <div class="sp1_toolbar-btn" data-command="code"> <i class="fa-solid fa-code"></i> </div>  
            <div class="sp1_div"></div>
            <div class="sp1_toolbar-btn" data-command="ul-list"> <i class="fa-solid fa-list-ul"></i> </div>  
            <div class="sp1_toolbar-btn" data-command="ol-list"> <i class="fa-solid fa-list-ol"></i> </div> 
            <div class="sp1_div"></div> 
            <div class="sp1_toolbar-btn" data-command="align-left"> <i class="fa-solid fa-align-left"></i> </div>   
            <div class="sp1_toolbar-btn" data-command="align-center"> <i class="fa-solid fa-align-center"></i> </div>  
            <div class="sp1_toolbar-btn" data-command="align-right"> <i class="fa-solid fa-align-right"></i> </div>  
            <div class="sp1_div"></div>  
            <div class="sp1_toolbar-btn" data-command="emoji"> <i class="fa-regular fa-face-smile"></i> </div> 
            <div class="sp1_toolbar-btn" data-command="quote"> <i class="fa-solid fa-quote-left"></i> </div> 
            
            

        </div>
        <div class="sp1_editor_content" contenteditable="true">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
        </div>
      </div>


<script>





    // 
    const dropdown = document.querySelectorAll('.sp1_toolbar-dd');
    dropdown.forEach(element => {
       let toggle = element.querySelector('.sp1_toolbar-dd--toggle');
       let menu = element.querySelector('.sp1_toolbar-dd--menu');

       toggle.addEventListener('click', () => {
            menu.classList.toggle('show');
            toggle.classList.toggle('active');
            window.addEventListener('mousedown', e => {
                menu.classList.remove('show');
                toggle.classList.remove('active');

                window.removeEventListener('mousedown', e => {
                menu.classList.remove('show');
            })
            })
       });
    });



    // editor 

    function insertAction(command){
        if(command === 'bold'){

        }
    }


    // controle toolbar
    const editor = document.querySelectorAll('.sp1_editor');
    
    editor.forEach(el => {
        const toolbar => el.querySelector('.sp1_toolbar');
        const tools = toolbar.querySelectorAll('sp1_toolbar-btn');


        toolbarItems.forEach(el => {
            el.addEventListener('click', (e) => {
                const command = e.target.dataset.command;
                insertAction(command);
            })
        })
    })

    


// $(document).ready(function() {
//   $('.sp1_toolbar-dd').each(function() {
//     const dropdownMenu = $(this).children('.sp1_toolbar-dd--menu');
//     const toggleButton = $(this).children('.sp1_toolbar-dd--toggle');

//     toggleButton.on('click', function(e) {
//       dropdownMenu.toggleClass('show');
//       e.stopPropagation();
//     });
//   });

//   $(document).on('click', function(event) {
//     alert('click')
//     const dropdownMenus = $('.sp1_toolbar-dd--menu');

//     // Check if the clicked element is outside all dropdown menus
//     if (!dropdownMenus.is(event.target) && dropdownMenus.has(event.target).length === 0) {
//       dropdownMenus.removeClass('show');
//     }
//   });
// });



//         $(document).ready(function() {
//     const editor = document.querySelector('.content');

//     $('.sp1_toolbar-btn').click(function() {
//         const command = $(this).data('command');
//         let value = null;

//         if (command === 'font') {
//         value = $('.toolbar-select').val();
//         }

//         const selection = window.getSelection();
//         const range = selection.getRangeAt(0);

//         switch (command) {
//         case 'link':
//             const url = prompt('Enter the URL:');
//             const linkElement = document.createElement('a');
//             linkElement.href = url;
//             linkElement.textContent = range.toString();
//             range.deleteContents();
//             range.insertNode(linkElement);
//             break;
//         case 'image':
//             const imageUrl = prompt('Enter the image URL:');
//             const imageElement = document.createElement('img');
//             imageElement.src = imageUrl;
//             range.insertNode(imageElement);
//             break;
//         case 'video':
//             const videoUrl = prompt('Enter the video URL:');
//             const videoElement = document.createElement('video');
//             videoElement.src = videoUrl;
//             videoElement.controls = true;
//             range.insertNode(videoElement);
//             break;
//         case 'file':
//             // Handle file upload logic here
//             break;
//         case 'heading':
//             const headingElement = document.createElement('h2');
//             headingElement.textContent = range.toString();
//             range.deleteContents();
//             range.insertNode(headingElement);
//             break;
//         case 'font':
//             document.execCommand('styleWithCSS', false, true);
//             document.execCommand('fontName', false, value);
//             break;
//         case 'list':
//             const listElement = document.createElement('ul');
//             const listItem = document.createElement('li');
//             listItem.textContent = 'New List Item';
//             listElement.appendChild(listItem);
//             range.insertNode(listElement);
//             break;
//         case 'bold':
//             const boldElement = document.createElement('b');
//             boldElement.textContent = range.toString();
//             range.deleteContents();
//             range.insertNode(boldElement);
//             break;
//         case 'italic':
//             const italicElement = document.createElement('i');
//             italicElement.textContent = range.toString();
//             range.deleteContents();
//             range.insertNode(italicElement);
//             break;
//         default:
//             break;
//         }

//     })

//     selection.removeAllRanges();
    
// })


// $(document).ready(function(){
//     console.log($('.content').val())
// })
</script>