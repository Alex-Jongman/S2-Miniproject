# QuerySelector

TODO: DOM uitleggen, en dat we elementen eerst moeten selecteren voordat we er iets mee kunnen doen. 

```html
<body>
  <header>
    <h1>De HUfteling</h1>
  </header>
  <footer>
    <p>&copy; 2026 HU-S2.</p>
  </footer>
  <main>
    <img id="kassa" src="./images/kassa.jpg" alt="kassa">
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

JavaScript kent meerdere manieren om elementen uit de DOM te selecteren. In het verleden werd hiervoor vaak gebruik gemaakt van functies zoals `getElementById`, `getElementsByClassName`, of `getElementsByTagName`. Deze functies zijn echter vrij beperkt in hun mogelijkheden en kunnen leiden tot onoverzichtelijke code, vooral als we complexe selecties moeten maken.

De modernere en krachtigere manier om elementen te selecteren is door gebruik te maken van de [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) en [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) methoden. Deze methoden maken gebruik van CSS selectors, waardoor we veel flexibeler kunnen zijn in het selecteren van elementen, alsook dat we zo een consistente manier hebben om elementen te selecteren, ongeacht of we nu een element willen selecteren op basis van zijn id, class, tag, of een combinatie daarvan.

```javascript
const form = document.querySelector('#kassa-form');
```
