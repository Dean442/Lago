
//imports
const express = require('express');
const mongoose = require('mongoose');
var Excel = require('exceljs');
const path = require('path');
const app = express();
const plan = require('./scripts/generatePlan');
const hbs = require('express-handlebars');
var assert= require('assert');



// const planFiller = require('./scripts/planFiller');
var month="";
const logger = require('./scripts/logger');

//a happy little logger
//uncomment to enable
//app.use(logger);
 
app.engine('hbs', hbs({extname:'hbs', defaultLayout: 'layout', layoutsDir:__dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Initialise bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//simple index direction
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use('/api/workers', require('./routes/api/workers'));

// //form to generate new worker
app.get('/worker.html', (req, res)=>{
    var mongoDB = 'mongodb://127.0.0.1/Lago';

    mongoose.connect(mongoDB, { useNewUrlParser: true });

    //Get the default connection
    var db = mongoose.connection;

    var resultArray = [];
    var cursor = db.collection('workermodels').find();

    cursor.forEach(function(doc, err){
       
        resultArray.push(doc);
    },function(){
        db.close();
        res.render('workers', {title: 'workers', items: resultArray});
    });

    // res.sendFile(path.join(__dirname, 'public','workers.html'));
});
app.get('/newWorker.html', (req, res)=>{

    res.render('newWorker');
   
});

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
