# Reading Forms

We hebben gezien dat we met `querySelector` elementen kunnen selecteren uit onze HTML, en dat we met `addEventListener` kunnen luisteren naar events die plaatsvinden op die elementen. 
We zouden dus ervoor kunnen kiezen om een 'change' event listener te zetten op elk van de input velden in ons form, zodat we kunnen reageren op het moment dat er iets wordt ingevuld in die velden. Maar dat is niet heel efficiënt, en bovendien willen we eigenlijk pas reageren op het moment dat het hele formulier is ingediend, en niet al op het moment dat er iets wordt ingevuld in een van de velden.

Dat is de reden waarom we in plaats van een 'change' event listener op de input velden, een 'submit' event listener op het form element zelf zetten. Op die manier kunnen we reageren op het moment dat het formulier wordt ingediend.

De uitdaging nu is om de data vanuit het formulier op te halen. Ook hier zouden we dan ervoor kunnen kiezen om elk input veld apart te selecteren en de waarde daarvan op te halen, maar ook dat is niet heel efficiënt, vooral als we veel input velden hebben. Gelukkig biedt JavaScript hier een handige oplossing voor in de vorm van het `FormData` object.
Deze `FormData` constructor kan worden aangeroepen met een form element als argument, en dan zal het automatisch alle input velden binnen dat form element selecteren en de data daarvan ophalen, en het zal die data opslaan in een soort van map structuur, waarbij de keys de namen van de input velden zijn (zoals gedefinieerd in het `name` attribuut van de input elementen), en de values de waarden zijn die door de gebruiker zijn ingevuld in die input velden.
Omdat we echter liever met een gewoon JavaScript object werken in plaats van met een `FormData` object, kunnen we gebruik maken van de `Object.fromEntries` methode, die een array van key-value pairs omzet in een gewoon JavaScript object. En omdat het `FormData` object een `entries()` methode heeft die een iterator teruggeeft van key-value pairs, kunnen we die direct doorgeven aan de `Object.fromEntries` methode om zo een gewoon JavaScript object te krijgen met de data uit ons formulier.

```javascript
function loginHandler(event) {
    // Voorkom dat het formulier de pagina herlaadt bij het indienen.
    event.preventDefault();

    // Zet het formulierdata om in een JSON object
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    ...
}

const form = document.querySelector('#kassa-form');
form.addEventListener('submit', loginHandler);
```

```html
<form id="kassa-form">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    <br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    <br>
    <button type="submit">Login</button>
</form>
```

Dus als we in ons formulier een username van "Ron" en een password van "supersecretpassword" invullen, dan zal het `data` object er als volgt uitzien:

```json
{
    "username": "Ron",
    "password": "supersecretpassword"
}
```

---

[:arrow_left: JS - EventListeners](./EventListener.md) | [:house: README](./README.md) | [JS - REST Fetch API en Promises :arrow_right:](./Fetch-Promises.md)