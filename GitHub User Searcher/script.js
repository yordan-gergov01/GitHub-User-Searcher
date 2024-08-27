
const searchBtn = document.getElementById('searchBtn');
const input = document.getElementById('searchInput');
const messageDiv = document.getElementById('message');
const linkBtn = document.getElementById('link');

const baseUrl = 'https://api.github.com/users';

linkBtn.style.display = 'none';

searchBtn.addEventListener('click', () => {
    const username = input.value.trim();
    if (username) {
        fetch(`${baseUrl}/${username}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('User not found!');
                }
                return res.json();
            })
            .then((data) => {
                const username = data.login;
                const profileUrl = `https://github.com/${username}`;
                messageDiv.innerHTML = `
                    User "${username}" found!
                    <a href="${profileUrl}" target="_blank" class="profile-button">Go to profile on GitHub</a>
                `;
                messageDiv.style.color = 'green';
            })
            .catch((err) => {
                messageDiv.innerHTML = 'User not found. Please try again.';
                messageDiv.style.color = 'red';
            });
    } else {
        messageDiv.innerHTML = 'Please enter a username.';
        messageDiv.style.color = 'orange';
    }
});

