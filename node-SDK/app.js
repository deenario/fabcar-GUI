'use strict';

//get libraries
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

//create express web-app
const app = express();
const invoke = require('./blockchain/invokeNetwork');
const query = require('./blockchain/queryNetwork');
var _time = "T00:00:00Z";

//declare port
var port = process.env.PORT || 8000;
if (process.env.VCAP_APPLICATION) {
  port = process.env.PORT;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//run app on port
app.listen(port, function () {
  console.log('app running on port: %d', port);
});

//-------------------------------------------------------------
//----------------------  GET API'S    -----------------------
//-------------------------------------------------------------

app.get('/api/queryAllCars',async function (req,res){

    var request = {
      chaincodeId: 'fabcar',
      fcn: 'queryAllCars',
      args: [
      ]
    };
    let response = await query.invokeQuery(request);
    if (response) {
        if(response.status == 200)
            res.status(response.status).send(JSON.parse(response.message));
        else
            res.status(response.status).send({ message: response.message });
    }});

app.post('/api/CreateCar',async function (req,res){

    console.log("POST API CALLED", req.body);

    var request = {
        chaincodeId: 'fabcar',
        fcn: 'createCar',
        args: [
            req.body.carid,
            req.body.carmake,
            req.body.carmodel,
            req.body.carcolor,
            req.body.carowner
        ]
    };
    let response = await invoke.invokeCreate(request);
    if (response) {
        if(response.status == 200)
            res.status(response.status).send({ message: "The Campaign with ID: "+req.body.campaign_ID+ " is stored in the blockchain with " +response.message  });
        else
            res.status(response.status).send(response.message);
    }
});