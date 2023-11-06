

const phoneNumberInputField = document.querySelectorAll('.tel_input');


phoneNumberInputField.forEach(element => {
    const selectInput = element.querySelector(`select`);
    const inputField = element.querySelector(`input[type="tel"]`)

    const targetId = inputField.getAttribute('id');

    element.addEventListener('click', event => {
        console.log(event)
    })

    console.log(targetId);
})
