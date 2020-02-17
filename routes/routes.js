var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
    console.log("INFO: " + "Route request recieved: \n" + JSON.stringify(req.body));

    let reply = {
        "RequestID": 123,
        "TimeStamp": 1562411774,
        "Valid Until": 1562441774,

        "Trip": {
            "TripID": "DB-AR-0815",
            "ToalTime": 15200,
            "StartTime": 1562451774,
            "EndTime": 1562466974,
            "TotalPath": {
                "type": "LineString / GEOJSON",
                "coordinates": [[30, 10], [10, 30], [40, 40]]
            },
            "Transfers": 2,
            "TotalPrice": 251.50,
            "Connection": {
                "ConnectionID": "DB-RE-272-84214423",
                "TransportType": "Train",
                "Description": "DB-RE-272",
                "ToalTime": "5200",
                "Price": "201.00",
                "StartTime": 1562451774,
                "EndTime": 1562466974,
                "Path": {
                    "type": "LineString / GEOJSON",
                    "coordinates": [[30, 10], [10, 30]]
                },

                "Connection": {
                    "ConnectionID": "BayerReisen213-23",
                    "TransportType": "Bus",
                    "Description": "Bayer Reisen Linie 27",
                    "ToalTime": "10000",
                    "Price": "50.50",
                    "StartTime": 1562451774,
                    "EndTime": 1562466974,
                    "Path": {
                        "type": "LineString / GEOJSON",
                        "coordinates": [[10, 30], [40, 40]]
                    }
                }
            }
        }
    };
    res.status(200).json(reply);
});

module.exports = router;