# Fetch and Promises

TODO: Fetch uitleggen en aangeven dat het een Promise teruggeeft.

TODO: Network diagram toevoegen om de asynchrone aard van fetch te illustreren, en de verschillende scenario's die kunnen optreden bij een fetch request, zoals een succesvolle response, een response met een foutstatus, of een netwerkfout.

```javascript
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
```

TODO: Fetch in de service, en consequentie voor de part file die gebruik ervan wil maken.

TODO: Async/Await als alternatief voor .then en .catch, en dat het eigenlijk net zo werkt maar dan met een andere syntax die sommigen misschien makkelijker vinden om te lezen. En dat je bij async/await nog steeds try/catch moet gebruiken om fouten af te handelen. Async/await is echter geen vervanging voor Promises, maar een syntactische suiker er bovenop, dus onder de motorkap werkt het nog steeds met Promises. En het is dan ook erg belangrijk om Promises goed te begrijpen, ook als je async/await gebruikt, omdat je nog steeds te maken hebt met dezelfde asynchrone aard van JavaScript en de manier waarop het omgaat met asynchrone operaties.
Voorbeeld van wat er kan gebeuren als je async/await niet begrijpt... Als ook dat er in frameworks vaak gebruik gemaakt wordt van lifecycle hooks, die echter zelf niet async mogen zijn in verband met race conditions. Het gebruik van async/await is dan ook niet altijd mogelijk, en dan moet je alsnog terugvallen op .then en .catch, dus het is belangrijk om beide manieren te begrijpen en te kunnen gebruiken.

TODO: Ander issue is dat onze login-form.js nu best ingewikkeld is, omdat die meerdere taken heeft, waaronder taken die niks met de weergave te maken hebben, maar met de communicatie met de backend, en dat we die beter kunnen scheiden door gebruik te maken van een service class die verantwoordelijk is voor de communicatie met de backend, en dat we die class dan kunnen gebruiken in onze login-form.js, zodat die zich alleen hoeft bezig te houden met de weergave en het afhandelen van user input, en dat we dan ook makkelijker kunnen switchen naar een andere manier van communiceren met de backend als dat nodig is, zonder dat we onze login-form.js hoeven aan te passen. En dat we dan ook makkelijker kunnen testen, omdat we dan de service class kunnen mocken in onze tests, zodat we niet afhankelijk zijn van een werkende backend om onze login-form.js te kunnen testen.