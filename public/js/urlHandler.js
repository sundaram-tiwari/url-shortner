function deleteUrl(shortId) {
    if(confirm("Are you sure you want to delete this url")){
        fetch(`/url/deleteUrl/${shortId}`,{
            method : 'DELETE',
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data =>{
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

function deleteAllUrl(){
    if(confirm('Are you sure you wants to delete all urls')){
        fetch('/url/deleteAllUrl',{
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
            }
        })
        .then(response => response.json())
        .then(data =>{
            if(data.success === true){
                alert('All urls deleted successfully');
                location.reload();
            } else{
                alert('Error : ' + data.message);
            }
        })
        .catch(error =>{
            alert("There was an error deleting the URL.")
        })
    }
}