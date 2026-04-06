# QuerySelector

De voornaamste taak van JavaScript in de frontend is het interacteren met de DOM (Document Object Model), wat de representatie is van de HTML structuur van onze pagina in de browser. Om met elementen in de DOM te kunnen interacteren, moeten we deze eerst selecteren. Hiervoor gebruiken we de `querySelector` en `querySelectorAll` methoden, die ons in staat stellen om elementen te selecteren op basis van CSS selectors.

Neem de body van onze HTML van de kassa pagina (index.html)

```html
<body>
  <header>
    <h1>De HUfteling</h1>
  </header>
  <footer>
    <p>&copy; 2026 HU-S2.</p>
  </footer>
  <main>
    <img class="kassa" src="./images/kassa.jpg" alt="kassa">
    <form id="kassa-form">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Login</button>
    </form>
  </main>
</body>
```

Deze html geeft ons een aantal elementen waar we in onze JavaScript code wellicht mee willen interacteren, te weten de beide input velden, de login button, dan wel de form in zijn geheel. Maar we zouden ook kunnen besluiten om met andere onderdelen van deze pagina te interacteren, zoals het vervangen van de afbeelding van de kassa op het moment dat er op de login button wordt geklikt, of het aanpassen van de tekst in de header of footer. 
Om dit te kunnen doen, moeten we deze elementen eerst selecteren in onze JavaScript code.

> [!NOTE]
>
> JavaScript kent meerdere manieren om elementen uit de DOM te selecteren. In het verleden werd hiervoor vaak gebruik gemaakt van functies zoals `getElementById`, `getElementsByClassName`, of `getElementsByTagName`. Deze functies zijn echter vrij beperkt in hun mogelijkheden en kunnen leiden tot onoverzichtelijke code, vooral als we complexe selecties moeten maken.

De modernere en krachtigere manier om elementen te selecteren is door gebruik te maken van de [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) en [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) methoden. Deze methoden maken gebruik van CSS selectors, waardoor we veel flexibeler kunnen zijn in het selecteren van elementen, alsook dat we zo een consistente manier hebben om elementen te selecteren, ongeacht of we nu een element willen selecteren op basis van zijn id, class, tag, of een combinatie daarvan.

De `querySelector` is een methode die we kunnen aanroepen vanuit een specifiek element, of vanuit het `document` object. Het `document` object is de representatie van de hele HTML pagina in de browser, en door de `querySelector` aan te roepen vanuit het `document` object kunnen we elementen selecteren uit de hele pagina. 

We zouden dus de afbeelding van de kassa op basis van zijn class kunnen selecteren, gezien er maar één element met deze class op de pagina staat:

```javascript
const kassaImage = document.querySelector('.kassa');
```

Of alle input velden op basis van hun tag kunnen selecteren:

```javascript
const inputFields = document.querySelectorAll('input');
```

Maar we zouden ook een specfiek element kunnen selecteren op basis van een combinatie van selectors, zoals de button die zich binnen het form element bevindt:

```javascript
const loginButton = document.querySelector('form button[type="submit"]');
```

Voor onze kassa pagina is het echter het echter voldoende om het form element zelf te selecteren, dit omdat we een event listener op het form element willen zetten, zodat we kunnen reageren op het moment dat er op de login button wordt geklikt. We kunnen dit doen door het form element te selecteren op basis van zijn id:

```javascript
const form = document.querySelector('#kassa-form');
```

---

[:arrow_left: JS - Import/Export & File Structure](./Import-Export.md) | [:house: README](./README.md) | [JS - EventListeners :arrow_right:](./EventListener.md)