//get postId from window params
const postId = parseInt(window.location.pathname.split('/').pop());

// function for new comment form
const newCommentFormHandler = async (event) => {
    event.preventDefault();

    // //get post_id to attach comment
    // const postId = parseInt(window.location.pathname.split('/').pop());

    const content = document.querySelector('#new-comment').value.trim();

    // makes sure all fields are filled
    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({content: content, post_id: postId}),
            headers: { 'Content-Type': 'application/json' },
        });

        // return to homepage if new comment posted successfully
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert('New comment failed to post')
        }
    }
};

// add event listener to comment form submit button
document
.querySelector('.comment-form')
.addEventListener('submit', newCommentFormHandler);