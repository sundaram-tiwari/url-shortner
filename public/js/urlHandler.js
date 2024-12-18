function deleteUrl(shortId) {
    if(confirm("Are you sure you want to delete this url")){
        fetch(`http://localhost:8000/url/deleteUrl/${shortId}`,{
            method : 'DELETE',
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data =>{
            if (data.message === 'URL deleted successfully') {
                alert('URL deleted successfully');
                location.reload();  
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error deleting the URL.');
        });
    }
}