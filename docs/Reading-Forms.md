# Reading Forms

TODO:

```javascript
function loginHandler(event) {
    // Voorkom dat het formulier de pagina herlaadt bij het indienen.
    event.preventDefault();

    // Zet het formulierdata om in een JSON object
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    ...
}
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

```json
{
    "username": "johndoe",
    "password": "supersecretpassword"
}
```