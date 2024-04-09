document.addEventListener('DOMContentLoaded', function () {
    const bulkAddBtn = document.getElementById('bulkAddBtn');
    const downloadExcelBtn = document.getElementById('downloadExcelBtn');
    const postContainer = document.getElementById('postContainer');
    
    bulkAddBtn.addEventListener('click', async function () {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const posts = await response.json();
            displayPosts(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    });

    function displayPosts(posts) {
        postContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
        const tbody = postContainer.querySelector('tbody');
        posts.forEach(post => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${post.userId}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    downloadExcelBtn.addEventListener('click', function () {
        // Logic to handle downloading posts in Excel format
        console.log('Download Excel button clicked!');
    });
});
