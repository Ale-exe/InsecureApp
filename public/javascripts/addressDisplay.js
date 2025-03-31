
async function getAddress(searchTerm){
    let term = document.getElementById(searchTerm).value.replace(' ','').toUpperCase().trim();

    console.log("Entered search term: " + term)

    console.log("does it?")
    console.log(!term.includes('OR'))

    let typeObj = {name:term};

    let json = JSON.stringify(typeObj);
    // console.log(json)

    let bannedWord = false;
    const operators = ['CREATE', 'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'ALL', 'AND', 'ANY', 'BETWEEN',
        'EXISTS','IN','LIKE', 'NOT', 'OR', 'SOME', '--']

    for (let i = 0; i < operators.length; i++) {
        if (term.includes(operators[i])) {
            bannedWord = true;
        }
    }

    if (bannedWord === false){

        console.log("in")

        return fetch('/getAddress', {
            method: 'POST',
            body: json,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then((response) => {
                if (response.length > 0) {

                    console.log("success")
                    console.log(response[0])

                    // set table title
                    document.getElementById('abvTblTxt').innerText = 'Search Results';


                    // if the addressList element doesnt exist, create it (the ele holding the table)
                    if (!document.getElementById('addressList')) {
                        console.log("addresslist doesnt exists");
                        $('#mainContent').append('<table id="addressList"> </table>');
                    }

                    // If the datatable already exists, destroy it
                    if ($.fn.DataTable.isDataTable('#addressList')) {
                        console.log("is DataTable")
                        let table = $('#addressList').DataTable();
                        table.destroy();
                    }

                    // Create array of data for the table
                    let tableData = [];
                    for (let i = 0; i < response.length; i++) {
                        tableData.push({
                            House_number: response[i].houseno, Address: response[i].address,
                            City: response[i].city, County: response[i].county, Postcode: response[i].postcode
                        });
                    }

                    console.log("table data")
                    console.log(tableData)

                    // Create the Datatable containing data from the array above
                    let addressTable = $('#addressList').DataTable({
                        data: tableData,
                        columns: [
                            {data: 'House_number', title: 'House Number'},
                            {data: 'Address', title: 'Address'},
                            {data: 'City', title: 'City'},
                            {data: 'County', title: 'County'},
                            {data: 'Postcode', title: 'Postcode'}
                        ]
                    });


                } else {
                    // If table exists, destroy it and the element it sits in
                    if ($.fn.DataTable.isDataTable('#addressList')) {
                        console.log("is DataTable")
                        let table = $('#addressList').DataTable();
                        table.clear();
                        table.destroy();
                        $('#addressList').remove();
                        document.getElementById('abvTblTxt').innerText = 'No Results Found';
                    } else {
                        document.getElementById('abvTblTxt').innerText = 'No Results Found';
                    }
                }
            })
    } else {
        console.log("try again")
        document.getElementById('abvTblTxt').innerText = 'Please try another postcode';
    }
}