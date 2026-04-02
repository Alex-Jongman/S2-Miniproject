const form = document.querySelector('#kassa-form');

form.addEventListener('submit', loginHandler);

function loginHandler(event) {
    event.preventDefault();

    console.log('Form submitted');

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Form data:', data);

    // validate the form data and get JWT token from the backend

    fetch('./api/authentication', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = '401.html';
            }
            throw new Error('Authentication failed');
        }
        return response.json();
    })
    .then(token => {
        // Store the JWT token in localStorage or sessionStorage
        localStorage.setItem('jwtToken', token.token);
        window.location.href = 'navigate.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}