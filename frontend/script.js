document.addEventListener('DOMContentLoaded', () => {
    const allUsersBtn = document.getElementById('all-users-btn');
    const usersContainer = document.getElementById('users-container');
  
    allUsersBtn.addEventListener('click', async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        populateUsersTable(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    });
  
    // Function to populate the users table with fetched data
    function populateUsersTable(users) {
      usersContainer.innerHTML = ''; // Clear previous data
  
      // Create a table element
      const table = document.createElement('table');
      table.classList.add('user-table');
  
      // Create table header
      const tableHeader = document.createElement('thead');
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Website</th>
        <th>City</th>
        <th>Company</th>
        <th>Action</th>
      `;
      tableHeader.appendChild(headerRow);
      table.appendChild(tableHeader);
  
      // Create table body
      const tableBody = document.createElement('tbody');
      users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.phone}</td>
          <td>${user.website}</td>
          <td>${user.address.city}</td>
          <td>${user.company.name}</td>
          <td><button class="toggle-btn" data-userid="${user.id}">Add</button></td>
        `;
  
        const toggleBtn = row.querySelector('.toggle-btn');
        toggleBtn.addEventListener('click', async () => {
          const userId = toggleBtn.getAttribute('data-userid');
  
          try {
            // Implementing point 4: Add user and change button text to "Open"
            const addUserResponse = await fetch('http://localhost:3000/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            });
            const addUserResult = await addUserResponse.json();
            alert('User added successfully!'); // Implementing point 5: Alert message
            toggleBtn.textContent = 'Open'; // Implementing point 4: Change button text
  
            // Update window location to navigate to the post page
            toggleBtn.addEventListener('click', async () => {
              window.location.href = `./post.html?userId=${userId}`;
            });
          } catch (error) {
            console.error('Error adding user:', error);
          }
        });
  
        tableBody.appendChild(row);
      });
  
      table.appendChild(tableBody);
      usersContainer.appendChild(table);
    }
  });
  