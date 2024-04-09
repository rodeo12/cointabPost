document.addEventListener('DOMContentLoaded', () => {
    const userId = getUserIdFromURL(); // Function to extract userId from URL
    
    // Fetch user posts and display in tabular form
    fetchUserPosts(userId)
        .then(posts => {
            displayPosts(posts);
        })
        .catch(error => {
            console.error('Error fetching user posts:', error);
        });

    // Add event listener for Bulk Add button
    const bulkAddBtn = document.getElementById('bulkAddBtn');
    bulkAddBtn.addEventListener('click', async () => {
        try {
            const addedCount = await addPostsToDatabase(userId);
            if (addedCount > 0) {
                alert(`${addedCount} post(s) added successfully!`);
                bulkAddBtn.style.display = 'none';
                const downloadExcelBtn = document.getElementById('downloadExcelBtn');
                downloadExcelBtn.style.display = 'block';
            } else {
                alert('No new posts to add.');
            }
        } catch (error) {
            console.error('Error adding posts to database:', error);
            alert('Error adding posts to database.');
        }
    });

    // Add event listener for Download In Excel button
    const downloadExcelBtn = document.getElementById('downloadExcelBtn');
    downloadExcelBtn.addEventListener('click', () => {
        alert('Download Excel feature will be implemented soon.');
    });
});

// Function to extract userId from URL
function getUserIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('userId');
}

// Function to fetch user posts from API
async function fetchUserPosts(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const data = await response.json();
    return data;
}

// Function to display posts in tabular form
function displayPosts(posts) {
    const postContainer = document.getElementById('postContainer');
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const headers = ['Title', 'Body'];
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    posts.forEach(post => {
        const row = table.insertRow();
        const titleCell = row.insertCell();
        titleCell.textContent = post.title;
        const bodyCell = row.insertCell();
        bodyCell.textContent = post.body;
    });

    postContainer.appendChild(table);
}

// Function to add posts to the database
async function addPostsToDatabase(userId) {
    const posts = await fetchUserPosts(userId);
    let addedCount = 0;
    await Promise.all(posts.map(async (post) => {
        // Check if post already exists in database by title and body
        const existingPost = await checkExistingPost(post.title, post.body);
        if (!existingPost) {
            await addPostToDatabase(post.title, post.body, userId);
            addedCount++;
        }
    }));
    return addedCount;
}

// Function to check if a post already exists in the database
async function checkExistingPost(title, body) {
    const existingPost = await fetch('/api/posts/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body })
    });
    const data = await existingPost.json();
    return data.exists;
}

// Function to add a post to the database
async function addPostToDatabase(title, body, userId) {
    await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body, userId })
    });
}
