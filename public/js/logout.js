// logout function to log out user and return to homepage
const logoutHandler = async () => {
    const response = await fetch('/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    });

    // return to homepage on successful logout
    if (response.ok) {
        document.location.replace('./');
    }
    else {
        alert('Logout failed');
    }
};

// add event listener to logout button
document
.querySelector('#logout')
.addEventListener('click', logoutHandler);