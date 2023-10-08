// sign up function to create new user and return to homepage
const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // make sure that all fields are filled in
    if (username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: { 'Content-Type': 'application/json' },
        });

        // return to homepage on successful signup
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert('Signup failed')
        }
    }
};

// add even listener for signup form submit button
document
.querySelector('.signupForm')
.addEventListener('submit', signupFormHandler);