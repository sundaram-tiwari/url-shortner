function generateUrl() {
    const showUrl = document.getElementById('generatedUrl');
    const urlToShorten = document.getElementById('urlInput').value;
    fetch('/url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlToShorten })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === true) {
                showUrl.innerHTML = data.message;
                mainUrl = data.message;
                document.getElementById('url-container').style.visibility = "visible";
            } else {
                showUrl.innerHTML = data.message;
            }
        })
        .catch(error => {
            console.log(error)
            alert('There was an error in generating url.', error);
        })
}

function copyUrl() {
    const urlToCopy = document.getElementById('generatedUrl').innerText;

    if (urlToCopy != "") {
        navigator.clipboard.writeText(urlToCopy)
            .then(() => {
                alert('URL copied to clipboard!');
            })
            .catch((error) => {
                alert('Failed to copy the URL.');
            });
    } else {
        alert('No URL to copy.');
    }
}

function deleteUrl(shortId) {
    if (confirm("Are you sure you want to delete this url")) {
        fetch(`/url/deleteUrl/${shortId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    alert('URL deleted successfully');
                    location.reload();
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                alert('There was an error deleting the URL.');
            });
    }
}

function deleteAllUrl() {
    if (confirm('Are you sure you wants to delete all urls')) {
        fetch('/url/deleteAllUrl', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    alert('All urls deleted successfully');
                    location.reload();
                } else {
                    alert('Error : ' + data.message);
                }
            })
            .catch(error => {
                alert("There was an error deleting the URL.")
            })
    }
}

