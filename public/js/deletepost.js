// get post id from endpoint params
const postId = window.location.toString.split('/')[
    // post id is the last item after a slash
    window.location.toString.split('/').length-1
];

// function to delete the post
const deletePostFormHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
    });

    // return to homepage if delete is successful
    if (response.ok) {
        document.location.replace('/');
    }
    else {
        alert('Delete Post failed')
    }
};

// add event listener for delete post button
document
.querySelector('#delete-post')
.addEventListener('submit', deletePostFormHandler);