// get post id from endpoint params
const postId = parseInt(window.location.pathname.split('/').pop());
console.log(postId);

// update post function
const updatePostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#edit-title').value.trim();
    const content = document.querySelector('#edit-content').value.trim();

    // makes sure all fields have been filled
    if (title && content) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({title, content}),
            headers: { 'Content-Type': 'application/json' },
        });

        // return to homepage if update is successful
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert('Edit Post failed')
        }
    }
};

// add event listener to update button
document
.querySelector('#update-post')
.addEventListener('click', updatePostFormHandler);
