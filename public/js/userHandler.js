const logout = document.getElementById('logout-btn');

const userLogout = () => {
    if (confirm("Do you really wants to log-out")){
        fetch('/logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    alert(data.message);
                    window.location.href = '/login';
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                alert('There was an error in log out.');
            });
    }
}

logout.addEventListener("click", userLogout); 