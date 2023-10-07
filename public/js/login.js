// login function to log in user and return to homepage
const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    // makes sure all fields are filled in
    if (username && password) {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });

        // return to homepage on successful login
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert('Login failed')
        }
    }
};

// add event listener to login form submit button
document
.querySelector('loginForm')
.addEventListener('sumbit', loginFormHandler);