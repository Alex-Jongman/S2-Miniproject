// Deze code definieert een loginHandler functie die wordt aangeroepen wanneer het login-formulier wordt ingediend.
function loginHandler(event) {
    // Voorkom dat het formulier de pagina herlaadt bij het indienen.
    event.preventDefault();

    // Zet het formulierdata om in een JSON object
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Normaal zou je de fetch in een aparte service plaatsen, maar voor deze demo is het hier prima.

    // Stuur een POST verzoek naar de backend om te authenticeren met de opgegeven gebruikersnaam en wachtwoord.
    fetch('./api/authentication', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        // Als de response niet ok is, controleer of het een 401 status is en redirect naar de 401 pagina, anders gooi een fout.
        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = '401.html';
            }
            throw new Error('Authentication failed');
        }
        // Als de response ok is, parse de JSON en return het token.
        return response.json();
    })
    // Als het token succesvol is ontvangen, sla het JWT token op in localStorage en redirect naar de navigate pagina.
    .then((token) => {
        // Store the JWT token in localStorage or sessionStorage
        localStorage.setItem('jwtToken', token.JWT);
        window.location.href = 'navigate.html';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// ============================================================================================================================
// Omdat de onderstaande code buiten de loginHandler functie staat, wordt deze direct uitgevoerd wanneer het script wordt geladen.

// Vind het login-formulier element in de DOM en voeg een submit event listener toe,
// die de loginHandler functie aanroept wanneer het formulier wordt ingediend.
const form = document.querySelector('#kassa-form');
form.addEventListener('submit', loginHandler);
