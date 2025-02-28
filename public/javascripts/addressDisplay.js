
async function getAddress(searchTerm){
    let term = document.getElementById(searchTerm).value.replace(' ','').toUpperCase().trim();

    let typeObj = {name:term};

    let json = JSON.stringify(typeObj);
    console.log(json)

    return fetch('/getAddress', {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
        .then((response) => {

            if (response.length > 0){
                console.log("success")
                $('#addressList').empty();

                for (let i = 0; i < response.length; i++){
                    console.log(response[i])
                    $('#addressList').append('<li id="address'+i+'" style="list-style-type: none;"> </li>');
                    document.getElementById('address'+i).innerText = response[i].houseno + ', '
                        + response[i].address + ', ' + response[i].city + ', ' + response[i].county + ', '
                        + response[i].postcode;

                }
            }  else{
                console.log("fail")
                $('#addressList').empty();
                $('#addressList').append('<li id="notFound" style="list-style-type: none;"></li>');
                document.getElementById('notFound').innerText = 'No Results Found';
            }
        })
}