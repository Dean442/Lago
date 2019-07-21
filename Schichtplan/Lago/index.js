
//imports
var Excel = require('exceljs');
const express = require('express');
const path = require('path');
const app = express();
const plan = require('./scripts/generatePlan');


// const planFiller = require('./scripts/planFiller');
var month="";
const logger = require('./scripts/logger');

//a happy little logger
//uncomment to enable
//app.use(logger);

//Initialise bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//simple index direction
app.get('/index.html', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//form to generate new worker
app.get('/newWorker.html', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public','newWorker.html'));
});

app.use('/api/workers', require('./routes/api/workers'))

//download the plan
app.get('/download', (req,res)=>{
    //send the plan with the right month as name
    res.download('plan.xlsx', month+'.xlsx');
});

//generate plan and make it ready for download
app.get('/plan/:date', function (req, res) {
    //preinitialize plan with date and header
    plan.saveDate(req.params.date);
    
    //redirect to download page to give file time to generate
    res.sendFile(path.join(__dirname, 'public','download.html'));
    //set the variable month to ensure the downloaded file has the right name (last genereated month)
    month= plan.month(req.params.date);

});




var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log('server started on port:', PORT); });
