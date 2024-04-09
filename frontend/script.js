document.addEventListener('DOMContentLoaded', function () {
    const allUsersBtn = document.getElementById('allUsersBtn');
    const userInfoContainer = document.getElementById('userInfoContainer');

    allUsersBtn.addEventListener('click', async function () {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    });

    function displayUsers(users) {
        userInfoContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>City</th>
                        <th>Company</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
        const tbody = userInfoContainer.querySelector('tbody');
        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.website}</td>
                <td>${user.address.city}</td>
                <td>${user.company.name}</td>
                <td><button class="addUserBtn">Add</button></td>
            `;
            tbody.appendChild(tr);
        });
    }
});
