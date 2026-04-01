const form = document.querySelector('#kassa-form');

form.addEventListener('submit', loginHandler);

function loginHandler(event) {
    event.preventDefault();

    console.log('Form submitted');

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Form data:', data);

    // validate the form data and get JWT token from the backend

    // For now, we will just redirect to the location.html page
    window.location.href = 'navigate.html';
}