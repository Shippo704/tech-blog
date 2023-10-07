// new post function to create a new post from the new post form
const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#newpost-title').value.trim();
    const content = document.querySelector('#newpost-content').value.trim();

    // makes sure fields are filled in
    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: {'Content-Type': 'application/json'}
        });

        // return to homepage if post creation is successful
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert('New Post creation failed');
        }
    }
};

// add event listener for new post form
document
.querySelector('.newPostForm')
.addEventListener('submit', newPostFormHandler);