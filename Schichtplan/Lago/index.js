
//imports
const express = require('express');
const path = require('path');
const app = express();
const plan = require('./scripts/generatePlan');
var month="";
const logger = require('./scripts/logger');


// app.use(express.static(path.join(__dirname, 'public')));


//a happy little logger
//uncomment to enable
//app.use(logger);

//simple index direction
app.get('/index.html', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//form to generate new worker
app.get('/newWorker.html', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public','newWorker.html'));
});

//download the plan
app.get('/download', (req,res)=>{
    //send the plan with the right month as name
    res.download('plan.xlsx', month+'.xlsx');
});

//generate plan and make it ready for download
app.get('/plan/:date', function (req, res) {

    plan.saveDate(req.params.date);
    //redirect to download page to give file time to generate
    res.sendFile(path.join(__dirname, 'public','download.html'));
    //set the variable month to ensure the downloaded file has the right name
    month= plan.month(req.params.date);
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log('server started on port:', PORT); });
