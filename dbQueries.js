const pool = require('./dbConnection');

const getAddress = (req, res) => {
    // console.log(req.body.name);
    const address = req.body.name;
    pool.query("SELECT * FROM networks.address WHERE postcode = " + "'" +address+ "'", (err, result) => {
        // if records are available, return successful status else, return unsuccessful message
        console.log(result.rows);
        if(result.rows.length > 0){
            res.status(201).json(result.rows);
        } else {
            res.status(200).json(result.rows);
        }
    });
}

module.exports = {
    getAddress
}