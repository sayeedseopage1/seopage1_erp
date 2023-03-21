

// Make the card draggable

let card = document.querySelector('.timer-card');
let isDragging = false;
let currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;
let minimizeBtn = document.querySelector('.minimize-btn');

card.addEventListener('mousedown', dragStart);
card.addEventListener('mouseup', dragEnd);
card.addEventListener('mousemove', drag);
card.addEventListener('mouseleave', dragEnd);

card.addEventListener('touchstart', dragStart);
card.addEventListener('touchend', dragEnd);
card.addEventListener('touchmove', drag);

// minimizeBtn.addEventListener('click', minimizeCard);
minimizeBtn.addEventListener('mousedown', minimizeCard);
minimizeBtn.addEventListener('touchstart', minimizeCard);

function dragStart(e) {
    if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
        isDragging = true; // Set isDragging to true on mobile devices
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (e.target === card || card.contains(e.target)) {
            e.preventDefault();
            isDragging = true;
        }
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();

        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, card);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

function minimizeCard() {
    card.classList.toggle('minimized');
    let icon = document.getElementById('handelButton');
    if (card.classList.contains('minimized')) {
        icon.classList.remove('fa-minimize');
        icon.classList.add('fa-expand-arrows-alt');
    } else {
        icon.classList.remove('fa-expand-arrows-alt');
        icon.classList.add('fa-minimize');
    }
    if ($('.timer-card').hasClass('minimized')) {
        status = 'off';
    } else {
        status = 'on';
    }

    setTranslate(-10, -10, card);

    $.ajax({
        type:"GET",
        cache:false,
        url:"/update/timer/box/set/"+status,
        success: function(data) {
        }
    });
}